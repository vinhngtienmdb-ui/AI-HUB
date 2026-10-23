import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { requestHandler } from '../mcp-gateway/api-server.js';
import { generateSecureApiKey } from '../mcp-gateway/security.js';

const startServer = () => new Promise(resolve => {
  const server = http.createServer(requestHandler);
  server.listen(0, '127.0.0.1', () => resolve(server));
});

const call = async (server, method, path, { headers = {}, body } = {}) => {
  const { port } = server.address();
  const res = await fetch(`http://127.0.0.1:${port}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', ...headers },
    body: body ? JSON.stringify(body) : undefined
  });
  return { status: res.status, headers: res.headers, json: await res.json() };
};

test('API Gateway 01: Điểm cuối quản trị từ chối yêu cầu không có khóa admin', async () => {
  const server = await startServer();
  try {
    const { rawKey: developerKey } = generateSecureApiKey({ name: 'Khóa Developer', role: 'developer' });
    const adminRoutes = [
      ['GET', '/api/v1/stats'],
      ['GET', '/api/v1/keys'],
      ['POST', '/api/v1/keys/generate'],
      ['POST', '/api/v1/keys/revoke'],
      ['GET', '/api/v1/audit-logs']
    ];

    for (const [method, path] of adminRoutes) {
      const anonymous = await call(server, method, path, { body: method === 'POST' ? { role: 'admin' } : undefined });
      assert.equal(anonymous.status, 401, `${method} ${path} phải yêu cầu xác thực`);

      const developer = await call(server, method, path, {
        headers: { Authorization: `Bearer ${developerKey}` },
        body: method === 'POST' ? { role: 'admin' } : undefined
      });
      assert.equal(developer.status, 403, `${method} ${path} phải yêu cầu vai trò admin`);
    }
  } finally {
    server.close();
  }
});

test('API Gateway 02: Khóa admin tạo được khóa mới; vai trò lạ hoặc giới hạn sai bị từ chối', async () => {
  const server = await startServer();
  try {
    const { rawKey: adminKey } = generateSecureApiKey({ name: 'Khóa Admin', role: 'admin' });
    const auth = { Authorization: `Bearer ${adminKey}` };

    const created = await call(server, 'POST', '/api/v1/keys/generate', { headers: auth, body: { name: 'Khóa Mới' } });
    assert.equal(created.status, 201);
    assert.equal(created.json.keyRecord.role, 'developer');
    assert.equal(created.json.keyRecord.rateLimitPerMin, 60);
    assert.equal(created.json.keyRecord.dailyQuota, 5000);

    for (const body of [
      { name: 'Khóa Mới', role: 'superuser' },
      { name: 'Khóa Mới', rateLimitPerMin: -5 },
      { name: 'Khóa Mới', rateLimitPerMin: 1e9 },
      { name: 'Khóa Mới', dailyQuota: 'nhiều' },
      { name: 'x'.repeat(101) },
      { name: '   ' }
    ]) {
      const rejected = await call(server, 'POST', '/api/v1/keys/generate', { headers: auth, body });
      assert.equal(rejected.status, 400, JSON.stringify(body));
      assert.equal(rejected.json.code, 'INVALID_KEY_OPTIONS');
    }
  } finally {
    server.close();
  }
});

test('API Gateway 03: CORS chỉ cho phép nguồn localhost, chặn trang web lạ', async () => {
  const server = await startServer();
  try {
    const local = await call(server, 'GET', '/api/v1/health', { headers: { Origin: 'http://localhost:3000' } });
    assert.equal(local.status, 200);
    assert.equal(local.headers.get('access-control-allow-origin'), 'http://localhost:3000');

    const foreign = await call(server, 'GET', '/api/v1/health', { headers: { Origin: 'https://trang-doc-hai.example' } });
    assert.equal(foreign.status, 403);
    assert.equal(foreign.headers.get('access-control-allow-origin'), null);
  } finally {
    server.close();
  }
});

test('API Gateway 04: Khởi động qua node index.js --serve vẫn tạo khóa admin đầu tiên', async () => {
  const { spawn } = await import('node:child_process');
  const fs = await import('node:fs');
  const os = await import('node:os');
  const path = await import('node:path');
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'aihub-serve-'));
  const child = spawn(process.execPath, ['mcp-gateway/index.js', '--serve', '--port', '0'], {
    env: { ...process.env, AIHUB_DATA_DIR: dataDir },
    stdio: ['ignore', 'pipe', 'pipe']
  });
  let output = '';
  child.stdout.on('data', d => { output += d; });
  child.stderr.on('data', d => { output += d; });
  try {
    const deadline = Date.now() + 15000;
    while (!/aihub_live_/.test(output) && Date.now() < deadline) {
      await new Promise(r => setTimeout(r, 100));
    }
    assert.match(output, /aihub_live_[A-Za-z0-9_-]+/, `Không thấy khóa admin được in ra:\n${output}`);
    const keys = JSON.parse(fs.readFileSync(path.join(dataDir, 'api-keys.json'), 'utf-8'));
    assert.ok(keys.some(k => k.role === 'admin' && k.status === 'active'));
  } finally {
    child.kill();
  }
});

test('API Gateway 05: Danh mục công cụ công khai không chứa công cụ đã ẩn (rejected)', async () => {
  const { getAllTools } = await import('../mcp-gateway/smart-router.js');
  const hiddenIds = new Set(getAllTools().filter(t => t.status === 'rejected').map(t => t.id));
  assert.ok(hiddenIds.size > 0, 'Dữ liệu kiểm thử cần có công cụ đã ẩn');
  const server = await startServer();
  try {
    const health = await call(server, 'GET', '/api/v1/health');
    const publishedCount = getAllTools().length - hiddenIds.size;
    assert.equal(health.json.totalToolsAvailable, publishedCount);
    for (const q of ['openba', 'vietqr', '']) {
      const list = await call(server, 'GET', `/api/v1/tools?q=${q}`);
      for (const tool of list.json.tools) {
        assert.ok(!hiddenIds.has(tool.id), `/api/v1/tools trả về công cụ đã ẩn: ${tool.id}`);
      }
    }
  } finally {
    server.close();
  }
});

test('API Gateway 06: Hạn mức ngày (dailyQuota) được áp dụng cho /dispatch', async () => {
  const server = await startServer();
  try {
    const { rawKey } = generateSecureApiKey({ name: 'Khóa Hạn Mức', role: 'developer', dailyQuota: 2 });
    const auth = { Authorization: `Bearer ${rawKey}` };
    const body = { query: 'Tạo mã VietQR 500k' };
    assert.equal((await call(server, 'POST', '/api/v1/dispatch', { headers: auth, body })).status, 200);
    assert.equal((await call(server, 'POST', '/api/v1/dispatch', { headers: auth, body })).status, 200);
    const third = await call(server, 'POST', '/api/v1/dispatch', { headers: auth, body });
    assert.equal(third.status, 429);
    assert.equal(third.json.code, 'DAILY_QUOTA_EXCEEDED');
  } finally {
    server.close();
  }
});

test('API Gateway 07: /stats chỉ trả số liệu đo được; nhật ký không lưu nội dung câu hỏi', async () => {
  const server = await startServer();
  try {
    const { rawKey: adminKey } = generateSecureApiKey({ name: 'Khóa Admin Số Liệu', role: 'admin' });
    const { rawKey: devKey } = generateSecureApiKey({ name: 'Khóa Dev Số Liệu', role: 'developer' });
    const secretQuery = 'Tạo mã VietQR cho Nguyễn Văn A số tài khoản 0123456789';
    await call(server, 'POST', '/api/v1/dispatch', { headers: { Authorization: `Bearer ${devKey}` }, body: { query: secretQuery } });

    const stats = await call(server, 'GET', '/api/v1/stats', { headers: { Authorization: `Bearer ${adminKey}` } });
    assert.equal(stats.status, 200);
    for (const removed of ['uptimePercentage', 'estimatedTokensSaved']) assert.equal(stats.json[removed], undefined);
    assert.ok(stats.json.latencySampleSize >= 1);
    assert.equal(typeof stats.json.averageLatencyMs, 'number');
    assert.ok(stats.json.categoriesSupported > 0 && stats.json.categoriesSupported < 39);

    const logs = await call(server, 'GET', '/api/v1/audit-logs', { headers: { Authorization: `Bearer ${adminKey}` } });
    assert.doesNotMatch(JSON.stringify(logs.json), /Nguyễn Văn A|0123456789/);
  } finally {
    server.close();
  }
});

test('API Gateway 08: Thân JSON sai trả 400; lỗi không lộ chi tiết nội bộ', async () => {
  const server = await startServer();
  try {
    const { rawKey: adminKey } = generateSecureApiKey({ name: 'Khóa Admin JSON', role: 'admin' });
    const { port } = server.address();
    const res = await fetch(`http://127.0.0.1:${port}/api/v1/keys/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminKey}` },
      body: '{ không phải json'
    });
    assert.equal(res.status, 400);
    assert.equal((await res.json()).code, 'INVALID_BODY');
  } finally {
    server.close();
  }
});

test('API Gateway 09: Trả lời yêu cầu truy cập mạng riêng (Private Network Access) cho nguồn được phép', async () => {
  const server = await startServer();
  try {
    const { port } = server.address();
    const preflight = await fetch(`http://127.0.0.1:${port}/api/v1/health`, {
      method: 'OPTIONS',
      headers: { Origin: 'http://localhost:5173', 'Access-Control-Request-Private-Network': 'true' }
    });
    assert.equal(preflight.status, 204);
    assert.equal(preflight.headers.get('access-control-allow-private-network'), 'true');
  } finally {
    server.close();
  }
});
