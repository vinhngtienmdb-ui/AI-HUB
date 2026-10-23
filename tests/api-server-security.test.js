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

test('API Gateway 02: Khóa admin được tạo khóa mới, vai trò lạ bị hạ về developer', async () => {
  const server = await startServer();
  try {
    const { rawKey: adminKey } = generateSecureApiKey({ name: 'Khóa Admin', role: 'admin' });
    const created = await call(server, 'POST', '/api/v1/keys/generate', {
      headers: { Authorization: `Bearer ${adminKey}` },
      body: { name: 'Khóa Mới', role: 'superuser' }
    });
    assert.equal(created.status, 201);
    assert.equal(created.json.keyRecord.role, 'developer');
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
