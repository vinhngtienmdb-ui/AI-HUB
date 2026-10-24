import { createRequire } from 'node:module';
import { loadTools } from '@aihub/database';
import { routeQuery } from '@aihub/shared/gateway-core.js';

const require = createRequire(import.meta.url);

// Kho dữ liệu công cụ AI HUB VN được đọc qua tầng dữ liệu (@aihub/database)
let cachedTools = null;
let cachedPublished = null;

export function getAllTools() {
  if (!cachedTools) {
    try {
      cachedTools = loadTools();
    } catch (e) {
      console.error('Lỗi khi đọc allTools.json trong smart-router:', e);
      cachedTools = [];
    }
  }
  return cachedTools;
}

// Công cụ đang hiển thị (bỏ qua công cụ bị ẩn do không xác minh được hoặc trùng lặp)
export function getPublishedTools() {
  if (!cachedPublished) cachedPublished = getAllTools().filter(t => t.status === 'published' || !t.status);
  return cachedPublished;
}

// Bảng ánh xạ ý định chuyên biệt (Core Intent Profiles), dùng chung với giao diện web
export const CORE_INTENTS = require('@aihub/shared/core-intents.json');

/**
 * Phân tích ý định người dùng và định tuyến đến công cụ phù hợp nhất.
 * Thuật toán nằm ở gateway-core.js, dùng chung với giao diện web.
 * @param {string} taskDescription Câu lệnh / bài toán nghiệp vụ người dùng yêu cầu
 * @returns {object} Kết quả định tuyến
 */
export function routeTask(taskDescription) {
  return routeQuery(taskDescription, getPublishedTools(), CORE_INTENTS);
}
