import { test } from 'node:test';
import assert from 'node:assert';

// Giả lập cơ chế xử lý đăng nhập mặc định (App.tsx)
function getInitialUser(storedUser) {
  if (!storedUser || storedUser === 'thanhvien@aihub.vn') {
    return null;
  }
  return storedUser;
}

// Giả lập cơ chế quản lý hồ sơ người dùng (UserProfile)
function createInitialProfile(email, displayName, photoURL) {
  return {
    email,
    displayName: displayName || email.split('@')[0],
    photoURL: photoURL || undefined,
    title: 'Chuyên gia AI & Phần mềm',
    bio: 'Thành viên đam mê khám phá và xây dựng ứng dụng trí tuệ nhân tạo.',
    phone: '',
    githubUrl: '',
    websiteUrl: '',
  };
}

function updateProfile(existingProfile, updates) {
  return {
    ...existingProfile,
    ...updates,
    email: existingProfile.email, // Không được thay đổi email chính
    displayName: updates.displayName?.trim() || existingProfile.displayName,
  };
}

// Giả lập cơ chế gắn sao công cụ (Starring & Saving)
function toggleSaveTool(currentUser, savedToolIds, toolId) {
  if (!currentUser) {
    return {
      success: false,
      requireLogin: true,
      message: 'Vui lòng đăng nhập để gắn sao ⭐ và lưu trữ công cụ!',
      savedToolIds,
    };
  }

  const isSaved = savedToolIds.includes(toolId);
  const updatedIds = isSaved
    ? savedToolIds.filter((id) => id !== toolId)
    : [...savedToolIds, toolId];

  return {
    success: true,
    requireLogin: false,
    isSaved: !isSaved,
    savedToolIds: updatedIds,
  };
}

test('Kiểm tra không mặc định đăng nhập: Khách truy cập khởi tạo tài khoản là null', () => {
  assert.strictEqual(getInitialUser(null), null);
  assert.strictEqual(getInitialUser(undefined), null);
  // Email giả lập cũ 'thanhvien@aihub.vn' bắt buộc phải bị loại bỏ và trả về null
  assert.strictEqual(getInitialUser('thanhvien@aihub.vn'), null);

  // Người dùng thực tế đã đăng nhập thì giữ nguyên
  assert.strictEqual(getInitialUser('vinhngtien@gmail.com'), 'vinhngtien@gmail.com');
  assert.strictEqual(getInitialUser('user@example.com'), 'user@example.com');
});

test('Kiểm tra hồ sơ cá nhân: Khởi tạo và cập nhật đầy đủ các trường thông tin', () => {
  const profile = createInitialProfile('vinhngtien@gmail.com', 'Vinh Nguyễn', 'https://avatar.url/vinh.jpg');
  assert.strictEqual(profile.email, 'vinhngtien@gmail.com');
  assert.strictEqual(profile.displayName, 'Vinh Nguyễn');
  assert.strictEqual(profile.title, 'Chuyên gia AI & Phần mềm');

  // Cập nhật hồ sơ
  const updated = updateProfile(profile, {
    displayName: 'Nguyễn Tiến Vinh (AI Expert)',
    title: 'Kỹ sư Trí tuệ Nhân tạo Cao cấp',
    bio: 'Chuyên gia phát triển Agentic AI & Hệ thống MCP.',
    phone: '0988123456',
    githubUrl: 'https://github.com/vinhngtienmdb-ui',
    websiteUrl: 'https://vinhnguyen.ai',
  });

  assert.strictEqual(updated.displayName, 'Nguyễn Tiến Vinh (AI Expert)');
  assert.strictEqual(updated.title, 'Kỹ sư Trí tuệ Nhân tạo Cao cấp');
  assert.strictEqual(updated.phone, '0988123456');
  assert.strictEqual(updated.githubUrl, 'https://github.com/vinhngtienmdb-ui');
  assert.strictEqual(updated.websiteUrl, 'https://vinhnguyen.ai');
  assert.strictEqual(updated.email, 'vinhngtien@gmail.com');
});

test('Kiểm tra cơ chế gắn sao lưu trữ (⭐ Star / Save Tool): Bắt buộc đăng nhập và lưu/bỏ lưu chính xác', () => {
  const toolId = 'github-openhands-agent';
  let savedIds = [];

  // Khi chưa đăng nhập (currentUser = null)
  const guestResult = toggleSaveTool(null, savedIds, toolId);
  assert.strictEqual(guestResult.success, false);
  assert.strictEqual(guestResult.requireLogin, true);
  assert.strictEqual(guestResult.savedToolIds.length, 0);

  // Khi đã đăng nhập: Gắn sao lưu trữ công cụ
  const loggedInUser = 'vinhngtien@gmail.com';
  const saveResult = toggleSaveTool(loggedInUser, savedIds, toolId);
  assert.strictEqual(saveResult.success, true);
  assert.strictEqual(saveResult.isSaved, true);
  assert.ok(saveResult.savedToolIds.includes(toolId));

  // Nhấn lại lần 2 để bỏ gắn sao
  const unsaveResult = toggleSaveTool(loggedInUser, saveResult.savedToolIds, toolId);
  assert.strictEqual(unsaveResult.success, true);
  assert.strictEqual(unsaveResult.isSaved, false);
  assert.strictEqual(unsaveResult.savedToolIds.includes(toolId), false);
});
