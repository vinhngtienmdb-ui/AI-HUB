/**
 * Bộ điều phối thực thi trung gian (AI HUB Dynamic Dispatcher)
 * Tạo gói phản hồi gồm công cụ được chọn, lệnh cài và cấu hình mẫu lấy từ kho dữ liệu đã kiểm định.
 */

import { getPublishedTools } from './smart-router.js';
import { buildDispatchResult } from './gateway-core.js';

export function dispatchTask(routingResult, taskDescription, userParameters = {}) {
  if (!routingResult) {
    return { status: 'ROUTING_FAILED', message: 'Không thể định tuyến bài toán đến công cụ phù hợp.' };
  }
  return buildDispatchResult(routingResult, getPublishedTools().length);
}
