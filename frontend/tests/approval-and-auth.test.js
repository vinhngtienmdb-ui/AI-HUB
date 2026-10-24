import test from 'node:test';
import assert from 'node:assert/strict';

// Mô phỏng logic phân quyền Admin và phê duyệt công cụ
const DEFAULT_ADMIN_EMAIL = 'vinh.ngtienmdb@gmail.com';

function checkIsAdmin(email, customAdmin) {
  if (!email) return false;
  const admin = customAdmin || DEFAULT_ADMIN_EMAIL;
  const normalized = email.trim().toLowerCase();
  return normalized === admin.trim().toLowerCase() || normalized === 'vinhngtien@gmail.com' || normalized === 'admin@aihub.vn';
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
  assert.equal(checkIsAdmin('vinh.ngtienmdb@gmail.com'), true, 'Email vinh.ngtienmdb@gmail.com phải là Admin');
  assert.equal(checkIsAdmin('Vinh.NgTienMdb@GMAIL.COM'), true, 'Không phân biệt chữ hoa/thường');
  assert.equal(checkIsAdmin('vinhngtien@gmail.com'), true, 'Email dự phòng cũng có quyền Admin');
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

test('Kiểm tra điều chỉnh Loại hình thành phần và Lĩnh vực chuyên môn (Admin Taxonomy Update)', () => {
  const initialTool = {
    id: 'tool-test-taxonomy',
    name: 'Thư viện SDK Thanh toán',
    toolType: 'mcp',
    typeNameVi: 'MCP Server',
    category: 'software_development',
    categoryNameVi: 'Lập trình & Kỹ thuật phần mềm',
  };

  // Hàm mô phỏng cập nhật phân loại
  function updateToolTaxonomy(tool, newType, newCategory) {
    const typeNames = {
      sdk: 'SDK',
      mcp: 'MCP Server',
      skill: 'Skill',
      agent: 'Agent',
      api: 'API',
      software: 'Phần mềm',
    };
    const catNames = {
      finance_payment: 'Tài chính, Ngân hàng & Thanh toán',
      accounting_tax: 'Kế toán, Thuế & Hóa đơn',
      software_development: 'Lập trình & Kỹ thuật phần mềm',
    };

    return {
      ...tool,
      toolType: newType,
      typeNameVi: typeNames[newType] || newType,
      category: newCategory,
      categoryNameVi: catNames[newCategory] || newCategory,
    };
  }

  // Admin đổi từ mcp -> sdk và từ software_development -> finance_payment
  const updatedTool = updateToolTaxonomy(initialTool, 'sdk', 'finance_payment');

  assert.equal(updatedTool.toolType, 'sdk', 'Loại hình thành phần phải được cập nhật sang sdk');
  assert.equal(updatedTool.typeNameVi, 'SDK', 'Tên loại hình tiếng Việt phải là SDK');
  assert.equal(updatedTool.category, 'finance_payment', 'Lĩnh vực chuyên môn phải là finance_payment');
  assert.equal(updatedTool.categoryNameVi, 'Tài chính, Ngân hàng & Thanh toán');
});

test('Kiểm tra đa lĩnh vực chuyên môn và đánh dấu thị trường Việt Nam (Multi-category & Vietnam Market)', () => {
  const tool = {
    id: 'vn-fintech-01',
    name: 'Cổng thanh toán MoMo SDK',
    toolType: 'sdk',
    category: 'finance_payment',
    categories: ['finance_payment', 'fintech_banking', 'e_commerce'],
    categoryNamesVi: ['Tài chính, Ngân hàng & Thanh toán', 'Công nghệ tài chính & Ngân hàng', 'Thương mại điện tử & Bán lẻ'],
    isVietnamMarket: true,
    status: 'published'
  };

  // 1. Kiểm tra cờ thị trường Việt Nam
  assert.equal(tool.isVietnamMarket, true, 'Công cụ phải có cờ isVietnamMarket = true');
  assert.equal(tool.categories.length, 3, 'Công cụ phải thuộc 3 lĩnh vực chuyên môn');

  // 2. Logic lọc theo danh mục: lọc theo 'fintech_banking' phải trúng tool này dù category chính là finance_payment
  const matchCategoryFintech =
    tool.category === 'fintech_banking' ||
    (Array.isArray(tool.categories) && tool.categories.includes('fintech_banking'));
  assert.equal(matchCategoryFintech, true, 'Lọc theo danh mục phụ fintech_banking phải khớp');

  // 3. Logic lọc thị trường Việt Nam
  const isVnTool = Boolean(
    tool.isVietnamMarket ||
    tool.category === 'vietnam' ||
    (Array.isArray(tool.categories) && tool.categories.includes('vietnam'))
  );
  assert.equal(isVnTool, true, 'Công cụ phải thỏa mãn điều kiện lọc thị trường Việt Nam');

  // 4. Logic cập nhật đa lĩnh vực của Quản trị viên
  function updateMultiTaxonomy(t, newType, mainCategory, subCategories, isVn) {
    return {
      ...t,
      toolType: newType,
      category: mainCategory,
      categories: subCategories,
      isVietnamMarket: isVn !== undefined ? isVn : subCategories.includes('vietnam')
    };
  }

  const updated = updateMultiTaxonomy(
    tool,
    'mcp',
    'accounting_tax',
    ['accounting_tax', 'finance_payment', 'vietnam'],
    true
  );

  assert.equal(updated.toolType, 'mcp');
  assert.equal(updated.category, 'accounting_tax');
  assert.deepEqual(updated.categories, ['accounting_tax', 'finance_payment', 'vietnam']);
  assert.equal(updated.isVietnamMarket, true);
});

