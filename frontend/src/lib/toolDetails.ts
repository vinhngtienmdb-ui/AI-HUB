import { useEffect, useState } from 'react';
import { AITool } from '../types';

// Các trường tải theo nhu cầu, phải khớp với DETAIL_FIELDS trong dev-server/toolDataSplit.js
const DETAIL_FIELDS = ['readmeVi', 'installGuideVi', 'usageGuideVi', 'samplePromptsVi'] as const;
type ToolDetailFields = Partial<Pick<AITool, (typeof DETAIL_FIELDS)[number]>>;

const detailCache = new Map<string, Promise<ToolDetailFields>>();

const hasAllDetails = (tool: AITool) => DETAIL_FIELDS.every((field) => tool[field] !== undefined);

export function loadToolDetails(id: string): Promise<ToolDetailFields> {
  let pending = detailCache.get(id);
  if (!pending) {
    pending = fetch(`${import.meta.env.BASE_URL}tool-details/${encodeURIComponent(id)}.json`)
      .then((res) => (res.ok ? res.json() : {}))
      .catch(() => {
        detailCache.delete(id);
        return {};
      });
    detailCache.set(id, pending);
  }
  return pending;
}

/**
 * Trả về công cụ kèm các trường chi tiết (README, hướng dẫn, câu lệnh mẫu) được tải theo nhu cầu.
 * Trong lúc chờ tải, các trường này mang giá trị rỗng để giao diện hiển thị an toàn.
 * Giá trị đã có trên công cụ (ví dụ công cụ do người dùng đóng góp) được giữ nguyên.
 */
export function useToolDetails<T extends AITool | null | undefined>(tool: T): T {
  const [details, setDetails] = useState<{ id: string; fields: ToolDetailFields } | null>(null);
  const id = tool?.id;
  const needsFetch = Boolean(tool && !hasAllDetails(tool));

  useEffect(() => {
    if (!id || !needsFetch) return;
    let cancelled = false;
    loadToolDetails(id).then((fields) => {
      if (!cancelled) setDetails({ id, fields });
    });
    return () => {
      cancelled = true;
    };
  }, [id, needsFetch]);

  if (!tool || !needsFetch) return tool;
  const loaded = details && details.id === id ? details.fields : {};
  // Danh sách công cụ trong gói chính không có các trường chi tiết dù kiểu AITool khai báo bắt buộc
  const defaults: ToolDetailFields = { installGuideVi: '', usageGuideVi: '', samplePromptsVi: [] };
  return Object.assign({}, defaults, loaded, tool) as T;
}
