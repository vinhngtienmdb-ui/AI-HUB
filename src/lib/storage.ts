import { AITool } from '../types';
import { INITIAL_TOOLS } from '../data/mockTools';

const CONTRIBUTED_KEY = 'aihub_contributed_tools';
const OVERRIDES_KEY = 'aihub_tool_overrides';
const LEGACY_TOOLS_KEY = 'aihub_tools';

/**
 * Ghi dữ liệu vào localStorage an toàn với try...catch
 */
export function safeSetItem(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.warn(`[Storage] Không thể ghi vào localStorage cho khóa "${key}":`, error);
    return false;
  }
}

/**
 * Tự động dọn dẹp khóa cũ 'aihub_tools' nếu đang chiếm quota
 */
export function cleanupLegacyStorage(): void {
  try {
    if (localStorage.getItem(LEGACY_TOOLS_KEY)) {
      localStorage.removeItem(LEGACY_TOOLS_KEY);
      console.info('[Storage] Đã dọn dẹp bộ nhớ khóa cũ aihub_tools để giải phóng dung lượng.');
    }
  } catch (e) {
    // bỏ qua lỗi nếu incognito
  }
}

/**
 * Lấy danh sách công cụ do người dùng đóng góp
 */
export function getContributedTools(): AITool[] {
  try {
    const raw = localStorage.getItem(CONTRIBUTED_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.warn('[Storage] Lỗi khi đọc công cụ đóng góp:', e);
  }
  return [];
}

/**
 * Lấy bảng đối tượng ghi đè phân loại hoặc trạng thái của Admin
 */
export function getToolOverrides(): Record<string, Partial<AITool>> {
  try {
    const raw = localStorage.getItem(OVERRIDES_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') return parsed;
    }
  } catch (e) {
    console.warn('[Storage] Lỗi khi đọc ghi đè phân loại:', e);
  }
  return {};
}

/**
 * Sắp xếp danh sách công cụ: đưa công cụ mới cập nhật / đóng góp lên trên đầu danh sách
 */
export function sortToolsByUpdated(toolList: AITool[]): AITool[] {
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

/**
 * Gộp kho dữ liệu gốc với công cụ đóng góp và điều chỉnh của quản trị viên
 * (dùng cho cả localStorage và lưu trữ dùng chung trên Firestore), sắp xếp công cụ mới cập nhật lên đầu.
 */
export function mergeTools(
  base: AITool[],
  contributed: AITool[],
  overrides: Record<string, Partial<AITool>>
): AITool[] {
  const contributedIds = new Set(contributed.map((t) => t.id));
  const combined: AITool[] = [...contributed, ...base.filter((tool) => !contributedIds.has(tool.id))];
  const mapped = combined.map((tool) => (overrides[tool.id] ? { ...tool, ...overrides[tool.id] } : tool));
  return sortToolsByUpdated(mapped);
}

/**
 * Khởi tạo danh sách công cụ từ localStorage:
 * kho dữ liệu gốc + công cụ đóng góp + điều chỉnh phân loại/phê duyệt của quản trị viên.
 */
export function loadAllTools(): AITool[] {
  // Dọn dẹp key cũ trước nếu còn tồn tại
  cleanupLegacyStorage();
  return mergeTools(INITIAL_TOOLS, getContributedTools(), getToolOverrides());
}

/**
 * Lưu một công cụ mới vào danh sách đóng góp
 */
export function saveContributedTool(newTool: AITool): void {
  const current = getContributedTools();
  const today = new Date().toISOString().split('T')[0];
  const toolWithTimestamp: AITool = {
    ...newTool,
    updatedAt: newTool.updatedAt || today,
    contributedAt: newTool.contributedAt || today,
  };
  const updated = [toolWithTimestamp, ...current.filter((t) => t.id !== newTool.id)];
  safeSetItem(CONTRIBUTED_KEY, JSON.stringify(updated));
}

/**
 * Lưu các thay đổi ghi đè của Admin (phân loại, phê duyệt, từ chối)
 */
export function saveToolOverride(toolId: string, overrideData: Partial<AITool>): void {
  const currentOverrides = getToolOverrides();
  currentOverrides[toolId] = {
    ...(currentOverrides[toolId] || {}),
    ...overrideData,
    updatedAt: new Date().toISOString().split('T')[0],
  };
  safeSetItem(OVERRIDES_KEY, JSON.stringify(currentOverrides));
}
