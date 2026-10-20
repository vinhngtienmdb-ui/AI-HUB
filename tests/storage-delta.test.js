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
