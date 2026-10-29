import { AITool } from '../types';

// Thời điểm cập nhật gần nhất của công cụ: ngày muộn nhất giữa lần push thật của repo GitHub,
// ngày thêm/sửa dữ liệu trong kho và ngày gửi đóng góp. Nhờ vậy công cụ vừa thêm vào kho hôm nay
// vẫn đứng đầu dù repo của nó đã lâu không push.
export const getLastUpdated = (tool: Pick<AITool, 'repoPushedAt' | 'updatedAt' | 'contributedAt'>): string => {
  let latest = '';
  let latestTime = -Infinity;
  for (const date of [tool.repoPushedAt, tool.updatedAt, tool.contributedAt]) {
    const time = date ? Date.parse(date) : NaN;
    if (!Number.isNaN(time) && time > latestTime) {
      latest = date as string;
      latestTime = time;
    }
  }
  return latest;
};

// So sánh để đưa công cụ mới cập nhật lên đầu; công cụ không có ngày nằm cuối danh sách
export const compareByLastUpdatedDesc = (a: AITool, b: AITool): number => {
  const dateA = getLastUpdated(a);
  const dateB = getLastUpdated(b);
  if (dateA && dateB) return Date.parse(dateB) - Date.parse(dateA);
  if (dateA) return -1;
  if (dateB) return 1;
  return 0;
};

const DAY_MS = 24 * 60 * 60 * 1000;

// Hiển thị khoảng thời gian tương đối bằng tiếng Việt, ví dụ "Hôm nay", "3 ngày trước"
export const formatRelativeVi = (isoDate: string, now: number = Date.now()): string => {
  const time = Date.parse(isoDate);
  if (Number.isNaN(time)) return '';
  const days = Math.floor((now - time) / DAY_MS);
  if (days <= 0) return 'Hôm nay';
  if (days === 1) return 'Hôm qua';
  if (days < 7) return `${days} ngày trước`;
  if (days < 30) return `${Math.floor(days / 7)} tuần trước`;
  if (days < 365) return `${Math.floor(days / 30)} tháng trước`;
  return `${Math.floor(days / 365)} năm trước`;
};
