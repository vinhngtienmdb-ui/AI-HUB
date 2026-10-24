// Kiểm thử quy tắc bảo mật Firestore (firestore.rules) trên Firestore Emulator.
// Chạy: npm run test:rules
import test, { before, after, beforeEach } from 'node:test';
import { readFileSync } from 'node:fs';
import {
  initializeTestEnvironment,
  assertSucceeds,
  assertFails
} from '@firebase/rules-unit-testing';
import { doc, getDoc, setDoc, updateDoc, deleteDoc, collection, getDocs, query, where } from 'firebase/firestore';

let env;

const ADMIN = { uid: 'admin-uid', email: 'admin@example.com' };
const ALICE = { uid: 'alice-uid', email: 'alice@example.com' };
const BOB = { uid: 'bob-uid', email: 'bob@example.com' };

const db = (user) => (user
  ? env.authenticatedContext(user.uid, { email: user.email }).firestore()
  : env.unauthenticatedContext().firestore());

const contribution = (id, user, extra = {}) => ({
  id,
  name: 'Công cụ thử nghiệm',
  sourceUrl: 'https://github.com/example/tool',
  summaryVi: 'Mô tả ngắn',
  status: 'pending',
  contributedBy: user.email,
  contributedByUid: user.uid,
  ...extra
});

before(async () => {
  env = await initializeTestEnvironment({
    projectId: 'aihub-rules-test',
    firestore: { rules: readFileSync(new URL('../../firestore.rules', import.meta.url), 'utf-8') }
  });
});

after(async () => {
  await env.cleanup();
});

beforeEach(async () => {
  await env.clearFirestore();
  await env.withSecurityRulesDisabled(async (ctx) => {
    const admin = ctx.firestore();
    await setDoc(doc(admin, 'admins', ADMIN.uid), { email: ADMIN.email });
    await setDoc(doc(admin, 'contributions', 'published-1'), contribution('published-1', ALICE, { status: 'published' }));
    await setDoc(doc(admin, 'contributions', 'pending-alice'), contribution('pending-alice', ALICE));
  });
});

test('Quản trị viên: không ai tự cấp quyền admin, kể cả người đã đăng nhập', async () => {
  await assertFails(setDoc(doc(db(ALICE), 'admins', ALICE.uid), { email: ALICE.email }));
  await assertFails(setDoc(doc(db(ADMIN), 'admins', BOB.uid), { email: BOB.email }));
  await assertFails(setDoc(doc(db(null), 'admins', 'x'), {}));
});

test('Quản trị viên: chỉ đọc được vai trò của chính mình', async () => {
  await assertSucceeds(getDoc(doc(db(ADMIN), 'admins', ADMIN.uid)));
  await assertSucceeds(getDoc(doc(db(ALICE), 'admins', ALICE.uid)));
  await assertFails(getDoc(doc(db(ALICE), 'admins', ADMIN.uid)));
  await assertFails(getDocs(collection(db(ALICE), 'admins')));
});

test('Đóng góp: khách chỉ đọc công cụ đã duyệt', async () => {
  await assertSucceeds(getDoc(doc(db(null), 'contributions', 'published-1')));
  await assertFails(getDoc(doc(db(null), 'contributions', 'pending-alice')));
  await assertSucceeds(getDocs(query(collection(db(null), 'contributions'), where('status', '==', 'published'))));
  await assertFails(getDocs(collection(db(null), 'contributions')));
});

test('Đóng góp: người gửi đọc được bài chờ duyệt của mình, người khác thì không', async () => {
  await assertSucceeds(getDoc(doc(db(ALICE), 'contributions', 'pending-alice')));
  await assertFails(getDoc(doc(db(BOB), 'contributions', 'pending-alice')));
  await assertSucceeds(getDocs(query(collection(db(ALICE), 'contributions'), where('contributedByUid', '==', ALICE.uid))));
  await assertSucceeds(getDoc(doc(db(ADMIN), 'contributions', 'pending-alice')));
  await assertSucceeds(getDocs(collection(db(ADMIN), 'contributions')));
});

test('Đóng góp: thành viên gửi được bài ở trạng thái chờ duyệt với đúng danh tính', async () => {
  await assertSucceeds(setDoc(doc(db(BOB), 'contributions', 'bob-1'), contribution('bob-1', BOB)));
});

test('Đóng góp: chặn khách gửi, tự duyệt, mạo danh, sai mã, thêm trường lạ, liên kết không an toàn', async () => {
  await assertFails(setDoc(doc(db(null), 'contributions', 'anon-1'), contribution('anon-1', BOB)));
  await assertFails(setDoc(doc(db(BOB), 'contributions', 'bob-2'), contribution('bob-2', BOB, { status: 'published' })));
  await assertFails(setDoc(doc(db(BOB), 'contributions', 'bob-3'), contribution('bob-3', ALICE)));
  await assertFails(setDoc(doc(db(BOB), 'contributions', 'bob-4'), { ...contribution('bob-4', BOB), contributedBy: ALICE.email }));
  await assertFails(setDoc(doc(db(BOB), 'contributions', 'bob-5'), contribution('khac-ma', BOB)));
  await assertFails(setDoc(doc(db(BOB), 'contributions', 'bob-6'), contribution('bob-6', BOB, { isAdmin: true })));
  await assertFails(setDoc(doc(db(BOB), 'contributions', 'bob-7'), contribution('bob-7', BOB, { sourceUrl: 'javascript:alert(1)' })));
  await assertFails(setDoc(doc(db(BOB), 'contributions', 'bob-8'), contribution('bob-8', BOB, { name: 'x'.repeat(201) })));
});

test('Đóng góp: người gửi sửa bài chờ duyệt nhưng không tự duyệt; người khác không sửa được', async () => {
  await assertSucceeds(updateDoc(doc(db(ALICE), 'contributions', 'pending-alice'), { summaryVi: 'Mô tả đã sửa' }));
  await assertFails(updateDoc(doc(db(ALICE), 'contributions', 'pending-alice'), { status: 'published' }));
  await assertFails(updateDoc(doc(db(ALICE), 'contributions', 'pending-alice'), { contributedByUid: BOB.uid }));
  await assertFails(updateDoc(doc(db(BOB), 'contributions', 'pending-alice'), { summaryVi: 'Phá hoại' }));
  await assertFails(updateDoc(doc(db(ALICE), 'contributions', 'published-1'), { summaryVi: 'Sửa sau khi duyệt' }));
});

test('Đóng góp: chỉ quản trị viên duyệt, từ chối và xóa', async () => {
  await assertSucceeds(updateDoc(doc(db(ADMIN), 'contributions', 'pending-alice'), { status: 'published', reviewNote: 'Đã duyệt' }));
  await assertFails(deleteDoc(doc(db(ALICE), 'contributions', 'published-1')));
  await assertSucceeds(deleteDoc(doc(db(ADMIN), 'contributions', 'published-1')));
});

test('Điều chỉnh công cụ: ai cũng đọc, chỉ quản trị viên ghi đúng các trường cho phép', async () => {
  await assertSucceeds(getDoc(doc(db(null), 'toolOverrides', 'mcp-1')));
  await assertFails(setDoc(doc(db(ALICE), 'toolOverrides', 'mcp-1'), { status: 'rejected' }));
  await assertSucceeds(setDoc(doc(db(ADMIN), 'toolOverrides', 'mcp-1'), { status: 'rejected', reviewNote: 'Ẩn' }));
  await assertFails(setDoc(doc(db(ADMIN), 'toolOverrides', 'mcp-2'), { sourceUrl: 'https://doc-hai.example' }));
});

test('Đường dẫn khác: bị từ chối', async () => {
  await assertFails(setDoc(doc(db(ADMIN), 'users', ALICE.uid), { role: 'admin' }));
  await assertFails(getDoc(doc(db(ADMIN), 'secrets', 'x')));
});
