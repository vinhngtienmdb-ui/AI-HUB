// Chạy trước mọi tệp kiểm thử (node --import): cô lập dữ liệu khóa API vào thư mục tạm
// để kiểm thử không ghi đè dữ liệu thật trong backend/data/.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

if (!process.env.AIHUB_DATA_DIR) {
  process.env.AIHUB_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), 'aihub-test-'));
}
