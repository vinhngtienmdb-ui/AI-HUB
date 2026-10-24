import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { requestHandler } from '../api-server.js';
import { getAllTools, getPublishedTools } from '../smart-router.js';

const startServer = () => new Promise(resolve => {
  const server = http.createServer(requestHandler);
  server.listen(0, '127.0.0.1', () => resolve(server));
});

const get = async (server, path) => {
  const { port } = server.address();
  const res = await fetch(`http://127.0.0.1:${port}${path}`);
  return { status: res.status, json: await res.json() };
};

test('API Tools 01: Phân trang trả đúng meta và không trùng bản ghi giữa các trang', async () => {
  const server = await startServer();
  try {
    const first = await get(server, '/api/v1/tools?limit=5&page=1');
    const second = await get(server, '/api/v1/tools?limit=5&page=2');
    assert.equal(first.status, 200);
    assert.equal(first.json.success, true);
    assert.equal(first.json.meta.total, getPublishedTools().length);
    assert.equal(first.json.meta.limit, 5);
    assert.equal(first.json.meta.totalPages, Math.ceil(getPublishedTools().length / 5));
    assert.equal(first.json.tools.length, 5);
    const ids = new Set(first.json.tools.map(t => t.id));
    for (const t of second.json.tools) assert.ok(!ids.has(t.id), `Trùng bản ghi giữa trang 1 và 2: ${t.id}`);
    // Mặc định 20 bản ghi mỗi trang
    const dflt = await get(server, '/api/v1/tools');
    assert.equal(dflt.json.meta.limit, 20);
    assert.equal(dflt.json.tools.length, 20);
  } finally {
    server.close();
  }
});

test('API Tools 02: Lọc theo loại công cụ, nền tảng và thị trường Việt Nam', async () => {
  const server = await startServer();
  try {
    const mcp = await get(server, '/api/v1/tools?tool_type=mcp&limit=100');
    assert.ok(mcp.json.meta.total > 0);
    for (const t of mcp.json.tools) assert.equal(t.toolType, 'mcp');

    const vn = await get(server, '/api/v1/tools?vietnam=1&limit=100');
    assert.equal(vn.json.meta.total, getPublishedTools().filter(t => t.isVietnamMarket).length);
    for (const t of vn.json.tools) assert.equal(t.isVietnamMarket, true);

    const cursor = await get(server, '/api/v1/tools?platform=cursor&limit=100');
    assert.ok(cursor.json.meta.total > 0);
  } finally {
    server.close();
  }
});

test('API Tools 03: Chi tiết công cụ đang hiển thị, công cụ ẩn và mã không tồn tại trả 404', async () => {
  const server = await startServer();
  try {
    const published = getPublishedTools()[0];
    const detail = await get(server, `/api/v1/tools/${encodeURIComponent(published.id)}`);
    assert.equal(detail.status, 200);
    assert.equal(detail.json.data.id, published.id);
    assert.ok(Array.isArray(detail.json.data.configs), 'Chi tiết phải có cấu hình mẫu');

    const hidden = getAllTools().find(t => t.status === 'rejected');
    assert.ok(hidden, 'Dữ liệu kiểm thử cần có công cụ đã ẩn');
    const hiddenRes = await get(server, `/api/v1/tools/${encodeURIComponent(hidden.id)}`);
    assert.equal(hiddenRes.status, 404);
    assert.equal(hiddenRes.json.code, 'TOOL_NOT_FOUND');

    const missing = await get(server, '/api/v1/tools/khong-ton-tai-123');
    assert.equal(missing.status, 404);
  } finally {
    server.close();
  }
});

test('API Tools 04: Tham số phân trang sai trả 400', async () => {
  const server = await startServer();
  try {
    for (const qs of ['limit=0', 'limit=101', 'page=-1', 'page=abc']) {
      const res = await get(server, `/api/v1/tools?${qs}`);
      assert.equal(res.status, 400, qs);
      assert.equal(res.json.code, 'INVALID_QUERY');
    }
  } finally {
    server.close();
  }
});
