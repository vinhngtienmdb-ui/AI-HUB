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
 * Khởi tạo danh sách công cụ hoàn chỉnh:
 * INITIAL_TOOLS (2.194 công cụ sẵn có) + Công cụ đóng góp mới + Các ghi đè phân loại/phê duyệt của Admin
 */
export function loadAllTools(): AITool[] {
  // Dọn dẹp key cũ trước nếu còn tồn tại
  cleanupLegacyStorage();

  const contributed = getContributedTools();
  const overrides = getToolOverrides();

  // Tạo set các ID công cụ đóng góp để tránh trùng lặp
  const contributedMap = new Map<string, AITool>();
  contributed.forEach((t) => contributedMap.set(t.id, t));

  // Gộp danh sách: công cụ đóng góp mới đặt ở đầu
  const combined: AITool[] = [...contributed];
  for (const tool of INITIAL_TOOLS) {
    if (!contributedMap.has(tool.id)) {
      combined.push(tool);
    }
  }

  // Áp dụng các thay đổi ghi đè (status, toolType, category...)
  return combined.map((tool) => {
    const override = overrides[tool.id];
    if (override) {
      return { ...tool, ...override };
    }
    return tool;
  });
}

/**
 * Lưu một công cụ mới vào danh sách đóng góp
 */
export function saveContributedTool(newTool: AITool): void {
  const current = getContributedTools();
  const updated = [newTool, ...current.filter((t) => t.id !== newTool.id)];
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
  };
  safeSetItem(OVERRIDES_KEY, JSON.stringify(currentOverrides));
}
