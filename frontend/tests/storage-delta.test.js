import test from 'node:test';
import assert from 'node:assert/strict';

// Mô phỏng bộ nhớ Delta Storage
const memoryStore = {};

function safeSetItem(key, val) {
  memoryStore[key] = val;
}

function getContributedTools() {
  const raw = memoryStore['aihub_contributed_tools'];
  return raw ? JSON.parse(raw) : [];
}

function getToolOverrides() {
  const raw = memoryStore['aihub_tool_overrides'];
  return raw ? JSON.parse(raw) : {};
}

function saveContributedTool(newTool) {
  const list = getContributedTools();
  safeSetItem('aihub_contributed_tools', JSON.stringify([newTool, ...list]));
}

function saveToolOverride(toolId, overrideData) {
  const overrides = getToolOverrides();
  overrides[toolId] = { ...(overrides[toolId] || {}), ...overrideData };
  safeSetItem('aihub_tool_overrides', JSON.stringify(overrides));
}

function loadAllTools(initialTools) {
  const contributed = getContributedTools();
  const overrides = getToolOverrides();

  const combined = [...contributed, ...initialTools];
  return combined.map((t) => {
    if (overrides[t.id]) {
      return { ...t, ...overrides[t.id] };
    }
    return t;
  });
}

test('Kiểm tra cơ chế Delta Storage: Không lưu toàn bộ 2.000+ công cụ, dung lượng cực nhỏ', () => {
  const initialTools = [
    { id: 'tool-001', name: 'Công cụ 1', toolType: 'mcp', category: 'software_development', status: 'published' },
    { id: 'tool-002', name: 'Công cụ 2', toolType: 'skill', category: 'finance_payment', status: 'published' },
  ];

  // 1. Kiểm tra không có key 'aihub_tools' khổng lồ
  assert.equal(memoryStore['aihub_tools'], undefined, 'Tuyệt đối không lưu toàn bộ kho vào aihub_tools');

  // 2. Thêm một công cụ đóng góp mới
  const newContributed = {
    id: 'tool-new-001',
    name: 'Công cụ đóng góp mới',
    toolType: 'agent',
    category: 'accounting_tax',
    status: 'pending',
  };
  saveContributedTool(newContributed);

  // 3. Admin sửa phân loại công cụ tool-001 sang 'sdk' và 'finance_payment'
  saveToolOverride('tool-001', {
    toolType: 'sdk',
    category: 'finance_payment',
    reviewNote: 'Đã cập nhật phân loại chuẩn',
  });

  // 4. Admin duyệt công cụ tool-new-001
  saveToolOverride('tool-new-001', {
    status: 'published',
  });

  // 5. Nạp lại toàn bộ công cụ
  const loaded = loadAllTools(initialTools);

  assert.equal(loaded.length, 3, 'Tổng số công cụ phải là 3 (1 đóng góp + 2 ban đầu)');

  const tool001 = loaded.find((t) => t.id === 'tool-001');
  assert.equal(tool001.toolType, 'sdk', 'Ghi đè toolType phải có hiệu lực');
  assert.equal(tool001.category, 'finance_payment', 'Ghi đè category phải có hiệu lực');

  const toolNew = loaded.find((t) => t.id === 'tool-new-001');
  assert.equal(toolNew.status, 'published', 'Ghi đè status sang published phải có hiệu lực');

  // Kiểm tra kích thước lưu trữ: chỉ mất vài trăm bytes thay vì 7MB
  const totalStoredBytes = JSON.stringify(memoryStore).length;
  assert.ok(totalStoredBytes < 2000, `Dung lượng lưu trữ thực tế (${totalStoredBytes} bytes) phải dưới 2KB`);
});

test('Kiểm tra cơ chế Sắp xếp: Tự động đưa công cụ mới cập nhật / đóng góp lên đầu danh sách', () => {
  const tools = [
    { id: 'old-001', name: 'Công cụ cũ', updatedAt: '2026-10-10' },
    { id: 'no-date', name: 'Công cụ không có ngày' },
    { id: 'new-001', name: 'Công cụ mới 1', updatedAt: '2026-10-21' },
    { id: 'new-002', name: 'Công cụ mới 2', contributedAt: '2026-10-20' },
  ];

  function sortToolsByUpdated(toolList) {
    return [...toolList].sort((a, b) => {
      const dateA = a.updatedAt || a.contributedAt || '';
      const dateB = b.updatedAt || b.contributedAt || '';
      if (dateA && dateB) {
        const cmp = dateB.localeCompare(dateA);
        if (cmp !== 0) return cmp;
      }
      if (dateA && !dateB) return -1;
      if (!dateA && dateB) return 1;
      return 0;
    });
  }

  const sorted = sortToolsByUpdated(tools);
  assert.equal(sorted[0].id, 'new-001', 'Công cụ cập nhật ngày 2026-10-21 phải đứng đầu');
  assert.equal(sorted[1].id, 'new-002', 'Công cụ cập nhật ngày 2026-10-20 phải đứng thứ hai');
  assert.equal(sorted[2].id, 'old-001', 'Công cụ cập nhật ngày 2026-10-10 phải đứng thứ ba');
  assert.equal(sorted[3].id, 'no-date', 'Công cụ không có ngày cập nhật phải đứng cuối');
});
