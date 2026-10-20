import test from 'node:test';
import assert from 'node:assert/strict';

// Mô phỏng logic phân quyền Admin và phê duyệt công cụ
const DEFAULT_ADMIN_EMAIL = 'vinhngtien@gmail.com';

function checkIsAdmin(email, customAdmin) {
  if (!email) return false;
  const admin = customAdmin || DEFAULT_ADMIN_EMAIL;
  return email.trim().toLowerCase() === admin.trim().toLowerCase();
}

function processContributeTool(toolInput, userEmail, isAdmin) {
  return {
    ...toolInput,
    id: `tool-${Date.now()}`,
    status: isAdmin ? 'published' : 'pending',
    contributedBy: userEmail || 'Thành viên ẩn danh',
    contributedAt: new Date().toISOString().split('T')[0],
    reviewNote: isAdmin ? 'Đã được Quản trị viên duyệt trực tiếp' : 'Đang chờ Quản trị viên kiểm duyệt',
  };
}

function approveTool(toolsList, toolId) {
  return toolsList.map((tool) =>
    tool.id === toolId
      ? { ...tool, status: 'published', reviewNote: 'Đã được Quản trị viên AI HUB VN phê duyệt chính thức' }
      : tool
  );
}

function rejectTool(toolsList, toolId, reason) {
  return toolsList.map((tool) =>
    tool.id === toolId
      ? { ...tool, status: 'rejected', reviewNote: reason || 'Chưa đạt yêu cầu' }
      : tool
  );
}

test('Kiểm tra quyền Admin: Chỉ email Quản trị viên cao nhất mới có quyền Admin', () => {
  assert.equal(checkIsAdmin('vinhngtien@gmail.com'), true, 'Email mặc định phải là Admin');
  assert.equal(checkIsAdmin('VinhNgTien@GMAIL.com'), true, 'Không phân biệt chữ hoa/thường');
  assert.equal(checkIsAdmin('member@aihub.vn'), false, 'Thành viên thường không được có quyền Admin');
  assert.equal(checkIsAdmin(null), false, 'Khách vãng lai chưa đăng nhập không có quyền Admin');
  assert.equal(checkIsAdmin(''), false, 'Chuỗi rỗng không có quyền Admin');
});

test('Kiểm tra luồng đóng góp: Thành viên nộp vào trạng thái Pending, Admin nộp lên Published', () => {
  const sampleTool = {
    name: 'Công cụ thử nghiệm OCR Tiếng Việt',
    toolType: 'skill',
    category: 'fintech_banking',
  };

  // 1. Thành viên thường đóng góp
  const memberTool = processContributeTool(sampleTool, 'member@aihub.vn', false);
  assert.equal(memberTool.status, 'pending', 'Thành viên đóng góp phải ở trạng thái pending');
  assert.equal(memberTool.contributedBy, 'member@aihub.vn');

  // 2. Admin đóng góp
  const adminTool = processContributeTool(sampleTool, 'vinhngtien@gmail.com', true);
  assert.equal(adminTool.status, 'published', 'Admin đóng góp có thể lên published ngay');
});

test('Kiểm tra hàng đợi phê duyệt của Admin: Duyệt công cụ thành công và từ chối công cụ kèm lý do', () => {
  let tools = [
    { id: 'tool-001', name: 'Công cụ A', status: 'pending' },
    { id: 'tool-002', name: 'Công cụ B', status: 'pending' },
  ];

  // Admin phê duyệt tool-001
  tools = approveTool(tools, 'tool-001');
  const tool001 = tools.find((t) => t.id === 'tool-001');
  assert.equal(tool001.status, 'published');
  assert.ok(tool001.reviewNote.includes('phê duyệt'));

  // Admin từ chối tool-002
  tools = rejectTool(tools, 'tool-002', 'Thiếu hướng dẫn sử dụng tiếng Việt');
  const tool002 = tools.find((t) => t.id === 'tool-002');
  assert.equal(tool002.status, 'rejected');
  assert.equal(tool002.reviewNote, 'Thiếu hướng dẫn sử dụng tiếng Việt');

  // Kiểm tra danh sách hiển thị ra trang chủ: chỉ có công cụ status published
  const publishedOnly = tools.filter((t) => t.status === 'published');
  assert.equal(publishedOnly.length, 1);
  assert.equal(publishedOnly[0].id, 'tool-001');
});
