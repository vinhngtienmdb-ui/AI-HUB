/**
 * Điểm truy cập tầng dữ liệu cho backend và công cụ build của frontend.
 * data/allTools.json là nguồn dữ liệu công cụ duy nhất; các tầng khác không tự ghép đường dẫn tới tệp này.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DATABASE_DIR = path.dirname(fileURLToPath(import.meta.url));

/** Đường dẫn tuyệt đối tới kho dữ liệu công cụ. Ghi đè bằng biến môi trường AIHUB_TOOLS_FILE (ví dụ khi triển khai riêng). */
export const TOOLS_FILE = process.env.AIHUB_TOOLS_FILE
  ? path.resolve(process.env.AIHUB_TOOLS_FILE)
  : path.join(DATABASE_DIR, 'data', 'allTools.json');

/** Đọc toàn bộ danh sách công cụ từ kho dữ liệu. */
export function loadTools() {
  return JSON.parse(fs.readFileSync(TOOLS_FILE, 'utf-8'));
}
