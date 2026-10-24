/**
 * Lưu trữ dùng chung trên Firebase Firestore: đóng góp công cụ, phê duyệt và điều chỉnh của quản trị viên.
 * Quyền được kiểm tra phía máy chủ bằng database/firestore.rules (quản trị viên = tồn tại tài liệu admins/{uid}).
 *
 * Bật bằng VITE_FIRESTORE_ENABLED=true sau khi đã triển khai database/firestore.rules
 * (xem 20_QUY_TRINH_TRIEN_KHAI.md). Khi chưa bật, ứng dụng dùng localStorage như trước (src/lib/storage.ts).
 * Thư viện Firestore chỉ được tải khi tính năng được bật.
 */
import { getApps } from 'firebase/app';
import type { Firestore, Unsubscribe } from 'firebase/firestore';
import { AITool } from '../types';
import { auth, initFirebase, isFirebaseConfigured } from './firebase';

export interface SharedUser {
  uid: string;
  email: string;
}

// Trường nội dung được phép gửi lên, phải khớp với validToolContent trong database/firestore.rules
const CONTRIBUTION_FIELDS = [
  'id', 'slug', 'name', 'icon', 'imageUrl', 'demoImages', 'toolType', 'typeNameVi',
  'category', 'categoryNameVi', 'categories', 'categoryNamesVi', 'isVietnamMarket', 'platforms',
  'sourceUrl', 'websiteUrl', 'authorName', 'license', 'summaryVi', 'purposeVi', 'featuresVi',
  'installGuideVi', 'usageGuideVi', 'samplePromptsVi', 'configs', 'version', 'pricingModel',
  'pricingText', 'languages', 'linkHealth', 'status', 'reviewNote', 'contributedBy',
  'contributedByUid', 'contributedAt', 'updatedAt'
] as const;

// Trường quản trị viên được phép điều chỉnh, phải khớp với quy tắc toolOverrides trong database/firestore.rules
const OVERRIDE_FIELDS = [
  'status', 'reviewNote', 'toolType', 'typeNameVi', 'category', 'categoryNameVi',
  'categories', 'categoryNamesVi', 'isVietnamMarket', 'updatedAt'
] as const;

const pick = (source: Record<string, unknown>, fields: readonly string[]) =>
  Object.fromEntries(fields.filter((f) => source[f] !== undefined).map((f) => [f, source[f]]));

export const isSharedStoreEnabled = (): boolean =>
  import.meta.env.VITE_FIRESTORE_ENABLED === 'true' && isFirebaseConfigured();

let firestoreModule: Promise<typeof import('firebase/firestore')> | null = null;
let dbInstance: Firestore | null = null;

async function getDb() {
  firestoreModule = firestoreModule || import('firebase/firestore');
  const fs = await firestoreModule;
  if (!dbInstance) {
    initFirebase();
    const app = getApps()[0];
    if (!app) throw new Error('Firebase chưa được cấu hình.');
    dbInstance = fs.getFirestore(app);
  }
  return { fs, db: dbInstance };
}

/** Vai trò quản trị viên do máy chủ xác nhận (tài liệu admins/{uid} tồn tại). */
export async function fetchAdminRole(uid: string): Promise<boolean> {
  try {
    const { fs, db } = await getDb();
    const snapshot = await fs.getDoc(fs.doc(db, 'admins', uid));
    return snapshot.exists();
  } catch (error) {
    console.warn('[SharedStore] Không đọc được vai trò quản trị viên:', error);
    return false;
  }
}

/**
 * Theo dõi đóng góp và điều chỉnh dùng chung. Quy tắc bảo mật chỉ cho phép:
 * khách đọc đóng góp đã duyệt, thành viên đọc thêm đóng góp của mình, quản trị viên đọc tất cả.
 */
export function subscribeSharedData(
  user: SharedUser | null,
  isAdmin: boolean,
  onChange: (contributions: AITool[], overrides: Record<string, Partial<AITool>>) => void
): () => void {
  const unsubscribers: Unsubscribe[] = [];
  let cancelled = false;
  const contributionSets = new Map<string, Map<string, AITool>>();
  let overrides: Record<string, Partial<AITool>> = {};

  const emit = () => {
    const merged = new Map<string, AITool>();
    for (const set of contributionSets.values()) for (const [id, tool] of set) merged.set(id, tool);
    onChange([...merged.values()], overrides);
  };

  getDb().then(({ fs, db }) => {
    if (cancelled) return;
    const contributions = fs.collection(db, 'contributions');
    const queries: Record<string, ReturnType<typeof fs.query>> = isAdmin
      ? { all: fs.query(contributions) }
      : {
          published: fs.query(contributions, fs.where('status', '==', 'published')),
          ...(user ? { mine: fs.query(contributions, fs.where('contributedByUid', '==', user.uid)) } : {})
        };
    for (const [key, q] of Object.entries(queries)) {
      unsubscribers.push(fs.onSnapshot(q, (snapshot) => {
        contributionSets.set(key, new Map(snapshot.docs.map((d) => [d.id, d.data() as AITool])));
        emit();
      }, (error) => console.warn(`[SharedStore] Lỗi đọc đóng góp (${key}):`, error)));
    }
    unsubscribers.push(fs.onSnapshot(fs.collection(db, 'toolOverrides'), (snapshot) => {
      overrides = Object.fromEntries(snapshot.docs.map((d) => [d.id, d.data() as Partial<AITool>]));
      emit();
    }, (error) => console.warn('[SharedStore] Lỗi đọc điều chỉnh công cụ:', error)));
  }).catch((error) => console.warn('[SharedStore] Không khởi tạo được Firestore:', error));

  return () => {
    cancelled = true;
    unsubscribers.forEach((unsubscribe) => unsubscribe());
  };
}

/** Gửi đóng góp. Thành viên: trạng thái chờ duyệt; quản trị viên có thể đăng trực tiếp. */
export async function submitContribution(tool: AITool, user: SharedUser, isAdmin: boolean): Promise<void> {
  const { fs, db } = await getDb();
  const payload = {
    ...pick(tool as unknown as Record<string, unknown>, CONTRIBUTION_FIELDS),
    status: isAdmin ? tool.status || 'published' : 'pending',
    // Quy tắc bảo mật so khớp với email trong token xác thực, nên dùng nguyên giá trị từ Firebase Auth
    contributedBy: auth?.currentUser?.email || user.email,
    contributedByUid: user.uid
  };
  await fs.setDoc(fs.doc(db, 'contributions', tool.id), payload);
}

/**
 * Quản trị viên duyệt, từ chối hoặc phân loại lại. Công cụ do thành viên đóng góp được cập nhật trực tiếp,
 * công cụ trong kho dữ liệu gốc được ghi thành điều chỉnh (toolOverrides).
 */
export async function saveSharedUpdate(toolId: string, isContribution: boolean, update: Partial<AITool>): Promise<void> {
  const { fs, db } = await getDb();
  const data = pick(update as unknown as Record<string, unknown>, OVERRIDE_FIELDS);
  if (isContribution) {
    await fs.updateDoc(fs.doc(db, 'contributions', toolId), data);
  } else {
    await fs.setDoc(fs.doc(db, 'toolOverrides', toolId), data, { merge: true });
  }
}
