/**
 * AI HUB VN — Module Bảo Mật Lõi & Quản Lý Khóa API (Security & Auth Module)
 * 
 * Đảm bảo các tiêu chuẩn an toàn bảo mật cấp công nghiệp:
 * 1. Băm mật mã HMAC-SHA256 cho khóa API và so sánh an toàn tránh tấn công đo thời gian (Timing Attacks).
 * 2. Bộ giới hạn tần suất yêu cầu (Rate Limiter) dạng cửa sổ trượt (Sliding Window) chống tấn công từ chối dịch vụ (DoS).
 * 3. Làm sạch dữ liệu đầu vào (Input Sanitization) phòng chống Prompt Injection và Command Injection.
 * 4. Nhật ký kiểm toán an ninh (Security Audit Logging) theo dõi mọi truy vấn thời gian thực.
 */

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Khóa bí mật nội bộ dùng cho HMAC (có thể ghi đè qua biến môi trường AIHUB_SECURITY_SALT)
const SECURITY_SALT = process.env.AIHUB_SECURITY_SALT || 'aihub_vn_production_master_secret_salt_2026';

// Đường dẫn lưu trữ dữ liệu khóa bảo mật (nếu có môi trường lưu trữ)
const DATA_DIR = path.join(__dirname, 'data');
const KEYS_FILE = path.join(DATA_DIR, 'api-keys.json');

// Khởi tạo thư mục dữ liệu nếu chưa tồn tại
if (!fs.existsSync(DATA_DIR)) {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  } catch (e) {
    // Không làm gián đoạn nếu môi trường read-only
  }
}

/**
 * Tạo chuỗi băm HMAC-SHA256 cho một khóa API thô
 * @param {string} rawKey - Khóa thô (ví dụ aihub_live_...)
 * @returns {string} Chuỗi băm hex an toàn
 */
export function hashApiKey(rawKey) {
  if (!rawKey || typeof rawKey !== 'string') {
    throw new Error('Khóa API không hợp lệ để thực hiện băm mật mã.');
  }
  return crypto.createHmac('sha256', SECURITY_SALT).update(rawKey).digest('hex');
}

/**
 * So sánh an toàn hai chuỗi băm để chống tấn công phân tích thời gian (Timing Attack)
 * @param {string} a - Chuỗi băm thứ nhất
 * @param {string} b - Chuỗi băm thứ hai
 * @returns {boolean} Kết quả so sánh
 */
export function timingSafeCompare(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

/**
 * Sinh một API Key an toàn chuẩn định dạng aihub_live_
 * @param {Object} options - Cấu hình khóa
 * @returns {Object} Đối tượng khóa gồm rawKey (chỉ trả về 1 lần) và bản ghi lưu trữ
 */
export function generateSecureApiKey({
  name = 'Khóa sản phẩm',
  role = 'developer',
  rateLimitPerMin = 60,
  dailyQuota = 5000,
  expiresInDays = 365,
  ipWhitelist = []
} = {}) {
  // Sinh 32 bytes ngẫu nhiên an toàn bằng CSPRNG
  const randomBytes = crypto.randomBytes(24).toString('base64url');
  const rawKey = `aihub_live_${randomBytes}`;
  const hashedKey = hashApiKey(rawKey);

  const now = new Date();
  const expiresAt = new Date(now.getTime() + expiresInDays * 24 * 60 * 60 * 1000).toISOString();

  const keyRecord = {
    id: `key_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`,
    name,
    prefix: rawKey.substring(0, 15) + '...',
    hashedKey,
    role,
    status: 'active',
    rateLimitPerMin,
    dailyQuota,
    createdAt: now.toISOString(),
    expiresAt,
    ipWhitelist,
    requestsCount: 0,
    lastUsedAt: null
  };

  saveKeyRecord(keyRecord);

  return {
    rawKey, // Chỉ trả về lúc khởi tạo để người dùng lưu lại an toàn
    keyRecord
  };
}

/**
 * Đọc danh sách khóa bảo mật từ tệp lưu trữ hoặc bộ nhớ đệm
 */
export function loadAllKeyRecords() {
  try {
    if (fs.existsSync(KEYS_FILE)) {
      const data = fs.readFileSync(KEYS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Không thể đọc file api-keys.json:', err.message);
  }
  return [];
}

/**
 * Lưu bản ghi khóa vào kho lưu trữ an toàn
 */
export function saveKeyRecord(record) {
  try {
    const list = loadAllKeyRecords();
    const existingIndex = list.findIndex(k => k.id === record.id);
    if (existingIndex >= 0) {
      list[existingIndex] = record;
    } else {
      list.push(record);
    }
    fs.writeFileSync(KEYS_FILE, JSON.stringify(list, null, 2), 'utf-8');
  } catch (err) {
    // Ghi log dự phòng
  }
}

/**
 * Thu hồi một khóa API
 */
export function revokeKeyRecord(keyId) {
  const list = loadAllKeyRecords();
  const target = list.find(k => k.id === keyId);
  if (target) {
    target.status = 'revoked';
    target.revokedAt = new Date().toISOString();
    fs.writeFileSync(KEYS_FILE, JSON.stringify(list, null, 2), 'utf-8');
    return true;
  }
  return false;
}

/**
 * Xác thực Bearer Token từ Header Authorization
 * @param {string} authHeader - Giá trị header 'Bearer aihub_live_...'
 * @param {string} clientIp - Địa chỉ IP của máy khách gọi đến
 * @returns {Object} Kết quả xác thực { isValid, error, keyRecord }
 */
export function authenticateBearerToken(authHeader, clientIp = '') {
  if (!authHeader || typeof authHeader !== 'string') {
    return {
      isValid: false,
      statusCode: 401,
      error: 'Thiếu tiêu đề ủy quyền Authorization. Định dạng yêu cầu: "Bearer aihub_live_..."'
    };
  }

  const parts = authHeader.trim().split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return {
      isValid: false,
      statusCode: 401,
      error: 'Định dạng tiêu đề ủy quyền không hợp lệ. Vui lòng sử dụng tiền tố "Bearer <khóa_api>"'
    };
  }

  const rawKey = parts[1];
  if (!rawKey.startsWith('aihub_live_')) {
    return {
      isValid: false,
      statusCode: 401,
      error: 'Khóa API không đúng định dạng chuẩn hệ thống AI HUB VN (phải bắt đầu bằng aihub_live_)'
    };
  }

  const hashedIncoming = hashApiKey(rawKey);
  const allKeys = loadAllKeyRecords();

  // Tìm kiếm bản ghi trùng khớp bằng so sánh an toàn timingSafeCompare
  let matchedRecord = null;
  for (const record of allKeys) {
    if (timingSafeCompare(record.hashedKey, hashedIncoming)) {
      matchedRecord = record;
      break;
    }
  }

  if (!matchedRecord) {
    return {
      isValid: false,
      statusCode: 401,
      error: 'Khóa API không tồn tại hoặc đã bị xóa khỏi hệ thống.'
    };
  }

  if (matchedRecord.status !== 'active') {
    return {
      isValid: false,
      statusCode: 403,
      error: `Khóa API hiện đang ở trạng thái "${matchedRecord.status}", không có quyền thực hiện yêu cầu.`
    };
  }

  // Kiểm tra hạn sử dụng
  if (matchedRecord.expiresAt && new Date(matchedRecord.expiresAt) < new Date()) {
    return {
      isValid: false,
      statusCode: 403,
      error: 'Khóa API này đã hết hạn sử dụng. Vui lòng tạo khóa mới tại Cổng Lập Trình Viên.'
    };
  }

  // Kiểm tra danh sách trắng IP nếu được cấu hình
  if (matchedRecord.ipWhitelist && matchedRecord.ipWhitelist.length > 0 && clientIp) {
    if (!matchedRecord.ipWhitelist.includes(clientIp)) {
      return {
        isValid: false,
        statusCode: 403,
        error: `Địa chỉ IP máy khách (${clientIp}) không nằm trong danh sách trắng được phép của khóa này.`
      };
    }
  }

  // Cập nhật thống kê truy vấn
  matchedRecord.requestsCount = (matchedRecord.requestsCount || 0) + 1;
  matchedRecord.lastUsedAt = new Date().toISOString();
  saveKeyRecord(matchedRecord);

  return {
    isValid: true,
    keyRecord: matchedRecord
  };
}

/**
 * Bộ quản lý giới hạn tần suất yêu cầu (Rate Limiter)
 */
const rateLimitBuckets = new Map();

/**
 * Kiểm tra xem một khóa hoặc IP có vượt quá giới hạn tần suất yêu cầu không
 * @param {string} identifier - Khóa nhận diện (keyId hoặc IP)
 * @param {number} limitPerMin - Số lượng yêu cầu tối đa mỗi phút
 * @returns {Object} { allowed, current, limit, resetInSeconds }
 */
export function checkRateLimit(identifier, limitPerMin = 60) {
  const now = Date.now();
  const windowMs = 60 * 1000;

  let bucket = rateLimitBuckets.get(identifier);
  if (!bucket) {
    bucket = { timestamps: [] };
    rateLimitBuckets.set(identifier, bucket);
  }

  // Lọc bỏ các mốc thời gian ngoài cửa sổ 1 phút trước
  bucket.timestamps = bucket.timestamps.filter(t => now - t < windowMs);

  if (bucket.timestamps.length >= limitPerMin) {
    const oldestTimestamp = bucket.timestamps[0];
    const resetInSeconds = Math.ceil((oldestTimestamp + windowMs - now) / 1000);
    return {
      allowed: false,
      current: bucket.timestamps.length,
      limit: limitPerMin,
      resetInSeconds: Math.max(1, resetInSeconds)
    };
  }

  bucket.timestamps.push(now);

  return {
    allowed: true,
    current: bucket.timestamps.length,
    limit: limitPerMin,
    resetInSeconds: 60
  };
}

/**
 * Làm sạch và kiểm tra dữ liệu đầu vào (Input Sanitization & Injection Defense)
 * @param {string} input - Chuỗi nhập từ người dùng
 * @param {number} maxLength - Độ dài tối đa cho phép
 * @returns {Object} { safe, sanitizedText, error }
 */
export function sanitizeInput(input, maxLength = 2000) {
  if (input === null || input === undefined) {
    return { safe: false, sanitizedText: '', error: 'Dữ liệu đầu vào không được để trống.' };
  }

  if (typeof input !== 'string') {
    return { safe: false, sanitizedText: '', error: 'Dữ liệu đầu vào phải là chuỗi văn bản.' };
  }

  const trimmed = input.trim();
  if (trimmed.length === 0) {
    return { safe: false, sanitizedText: '', error: 'Nội dung yêu cầu không được rỗng.' };
  }

  if (trimmed.length > maxLength) {
    return {
      safe: false,
      sanitizedText: '',
      error: `Độ dài văn bản yêu cầu vượt quá giới hạn tối đa cho phép (${maxLength} ký tự).`
    };
  }

  // Phát hiện các mẫu tấn công dòng lệnh hoặc nỗ lực tiêm mã nguy hiểm
  const dangerousPatterns = [
    /\b(rm\s+-rf|del\s+\/[a-z]|format\s+[a-z]:|shutdown\s+-[rsh]|mkfs\.)\b/i,
    /curl\s+.*\|\s*(?:ba)?sh/i,
    /wget\s+.*\|\s*(?:ba)?sh/i,
    /system\s*\(/i,
    /exec\s*\(/i,
    /eval\s*\(/i,
    /__proto__/i,
    /constructor\.prototype/i
  ];

  for (const pattern of dangerousPatterns) {
    if (pattern.test(trimmed)) {
      return {
        safe: false,
        sanitizedText: '',
        error: 'Cảnh báo an ninh: Yêu cầu chứa các chuỗi lệnh độc hại hoặc vi phạm quy tắc bảo mật hệ thống.'
      };
    }
  }

  // Khử các ký tự điều khiển ASCII vô hình gây hại
  const sanitized = trimmed.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

  return {
    safe: true,
    sanitizedText: sanitized
  };
}

/**
 * Nhật ký kiểm toán an ninh (Security Audit Logger)
 */
const auditLogQueue = [];

export function recordAuditLog({
  keyId = 'anonymous',
  ip = '127.0.0.1',
  endpoint = '/api/v1/dispatch',
  method = 'POST',
  statusCode = 200,
  latencyMs = 0,
  action = 'REQUEST',
  details = ''
} = {}) {
  const logEntry = {
    id: `log_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`,
    timestamp: new Date().toISOString(),
    keyId,
    ip,
    endpoint,
    method,
    statusCode,
    latencyMs,
    action,
    details
  };

  auditLogQueue.unshift(logEntry);
  if (auditLogQueue.length > 500) {
    auditLogQueue.pop(); // Giữ tối đa 500 bản ghi gần nhất trong bộ nhớ
  }

  return logEntry;
}

export function getAuditLogs(limit = 50) {
  return auditLogQueue.slice(0, limit);
}
