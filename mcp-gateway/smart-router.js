import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { routeQuery } from './gateway-core.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Đọc toàn bộ kho dữ liệu công cụ AI HUB VN
const allToolsPath = path.resolve(__dirname, '../src/data/allTools.json');
let cachedTools = null;
let cachedPublished = null;

export function getAllTools() {
  if (!cachedTools) {
    try {
      const data = fs.readFileSync(allToolsPath, 'utf-8');
      cachedTools = JSON.parse(data);
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
export const CORE_INTENTS = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'core-intents.json'), 'utf-8'));

/**
 * Phân tích ý định người dùng và định tuyến đến công cụ phù hợp nhất.
 * Thuật toán nằm ở gateway-core.js, dùng chung với giao diện web.
 * @param {string} taskDescription Câu lệnh / bài toán nghiệp vụ người dùng yêu cầu
 * @returns {object} Kết quả định tuyến
 */
export function routeTask(taskDescription) {
  return routeQuery(taskDescription, getPublishedTools(), CORE_INTENTS);
}
