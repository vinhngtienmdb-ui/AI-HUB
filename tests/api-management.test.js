/**
 * Kiểm thử nghiệp vụ quản lý khóa API trên mã thật của máy chủ (mcp-gateway/security.js).
 * Trước đây tệp này kiểm thử các hàm mô phỏng được định nghĩa ngay trong tệp kiểm thử.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  generateSecureApiKey,
  authenticateBearerToken,
  revokeKeyRecord,
  loadAllKeyRecords,
  validateKeyOptions,
  consumeDailyQuota,
  KEY_LIMITS
} from '../mcp-gateway/security.js';

test('Quản lý API: Khóa sinh bằng CSPRNG, chuẩn tiền tố aihub_live_, không trùng nhau', () => {
  const seen = new Set();
  for (let i = 0; i < 20; i++) {
    const { rawKey, keyRecord } = generateSecureApiKey({ name: `Khóa ${i}` });
    assert.match(rawKey, /^aihub_live_[A-Za-z0-9_-]{32}$/);
    assert.equal(keyRecord.prefix, `${rawKey.slice(0, 15)}...`);
    assert.ok(!seen.has(rawKey));
    seen.add(rawKey);
  }
});

test('Quản lý API: Thu hồi khóa làm xác thực thất bại ngay lập tức', () => {
  const { rawKey, keyRecord } = generateSecureApiKey({ name: 'Khóa Sẽ Thu Hồi' });
  assert.equal(authenticateBearerToken(`Bearer ${rawKey}`).isValid, true);

  assert.equal(revokeKeyRecord(keyRecord.id), true);
  const after = authenticateBearerToken(`Bearer ${rawKey}`);
  assert.equal(after.isValid, false);
  assert.equal(after.statusCode, 403);
  assert.ok(loadAllKeyRecords().find(k => k.id === keyRecord.id).revokedAt);
  assert.equal(revokeKeyRecord('khoa-khong-ton-tai'), false);
});

test('Quản lý API: Kiểm tra tham số tạo khóa theo giới hạn', () => {
  const defaults = validateKeyOptions({});
  assert.equal(defaults.valid, true);
  assert.deepEqual(defaults.options, {
    name: 'Khóa Ứng Dụng Mới', role: 'developer', rateLimitPerMin: 60, dailyQuota: 5000, expiresInDays: 365
  });

  const custom = validateKeyOptions({ name: '  Ứng dụng  ', role: 'admin', rateLimitPerMin: '120', dailyQuota: 100 });
  assert.equal(custom.valid, true);
  assert.equal(custom.options.name, 'Ứng dụng');
  assert.equal(custom.options.rateLimitPerMin, 120);

  const invalid = [
    { role: 'superuser' },
    { name: '' },
    { name: 'x'.repeat(KEY_LIMITS.nameMaxLength + 1) },
    { rateLimitPerMin: 0 },
    { rateLimitPerMin: 1.5 },
    { rateLimitPerMin: KEY_LIMITS.rateLimitPerMin.max + 1 },
    { dailyQuota: -1 },
    { expiresInDays: 99999 }
  ];
  for (const body of invalid) assert.equal(validateKeyOptions(body).valid, false, JSON.stringify(body));
});

test('Quản lý API: Hạn mức ngày đếm theo ngày UTC và đặt lại sang ngày mới', () => {
  const { keyRecord } = generateSecureApiKey({ name: 'Khóa Hạn Mức Ngày', dailyQuota: 3 });
  assert.deepEqual(consumeDailyQuota(keyRecord.id), { allowed: true, used: 1, limit: 3 });
  consumeDailyQuota(keyRecord.id);
  consumeDailyQuota(keyRecord.id);
  assert.equal(consumeDailyQuota(keyRecord.id).allowed, false);

  // Giả lập bản ghi của hôm qua: bộ đếm phải về 0
  const records = loadAllKeyRecords();
  const record = records.find(k => k.id === keyRecord.id);
  assert.equal(record.usageToday, 3);
  record.usageDay = '2000-01-01';
  fs.writeFileSync(path.join(process.env.AIHUB_DATA_DIR, 'api-keys.json'), JSON.stringify(records, null, 2));
  assert.deepEqual(consumeDailyQuota(keyRecord.id), { allowed: true, used: 1, limit: 3 });

  assert.equal(consumeDailyQuota('khoa-khong-ton-tai').allowed, false);
});
