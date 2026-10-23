/**
 * Kiểm thử máy chủ MCP qua giao thức thật: khởi chạy mcp-gateway/index.js (stdio),
 * gửi JSON-RPC initialize, tools/list, tools/call như Claude Desktop / Claude Code.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { getPublishedTools, CORE_INTENTS } from '../mcp-gateway/smart-router.js';

const SERVER = fileURLToPath(new URL('../mcp-gateway/index.js', import.meta.url));

function startServer() {
  const child = spawn(process.execPath, [SERVER], { env: process.env, stdio: ['pipe', 'pipe', 'pipe'] });
  const pending = new Map();
  let buffer = '';
  child.stdout.on('data', chunk => {
    buffer += chunk;
    let newline;
    while ((newline = buffer.indexOf('\n')) >= 0) {
      const line = buffer.slice(0, newline).trim();
      buffer = buffer.slice(newline + 1);
      if (!line) continue;
      const message = JSON.parse(line);
      if (message.id !== undefined && pending.has(message.id)) {
        pending.get(message.id)(message);
        pending.delete(message.id);
      }
    }
  });
  let nextId = 1;
  const request = (method, params = {}) => new Promise((resolve, reject) => {
    const id = nextId++;
    const timer = setTimeout(() => reject(new Error(`Hết thời gian chờ ${method}`)), 15000);
    pending.set(id, message => { clearTimeout(timer); resolve(message); });
    child.stdin.write(JSON.stringify({ jsonrpc: '2.0', id, method, params }) + '\n');
  });
  const notify = (method, params = {}) => child.stdin.write(JSON.stringify({ jsonrpc: '2.0', method, params }) + '\n');
  return { child, request, notify };
}

const callTool = async (server, name, args = {}) => {
  const response = await server.request('tools/call', { name, arguments: args });
  assert.equal(response.error, undefined, JSON.stringify(response.error));
  return { isError: Boolean(response.result.isError), data: JSON.parse(response.result.content[0].text) };
};

test('Máy chủ MCP stdio: bắt tay, liệt kê 4 công cụ và trả kết quả đúng dữ liệu', async (t) => {
  const server = startServer();
  t.after(() => server.child.kill());

  const init = await server.request('initialize', {
    protocolVersion: '2025-06-18',
    capabilities: {},
    clientInfo: { name: 'aihub-test', version: '1.0.0' }
  });
  assert.equal(init.result.serverInfo.name, 'aihub-vn-mcp-gateway');
  server.notify('notifications/initialized');

  const list = await server.request('tools/list');
  assert.deepEqual(list.result.tools.map(tool => tool.name).sort(), [
    'aihub_explain_routing', 'aihub_get_gateway_status', 'aihub_resolve_capability', 'aihub_smart_dispatch'
  ]);

  const dispatch = await callTool(server, 'aihub_smart_dispatch', { task_description: 'Tạo mã VietQR 500k' });
  assert.equal(dispatch.data.status, 'DISPATCH_SUCCESS');
  assert.equal(dispatch.data.dispatchedTool.id, 'vn-repo-vietqr-emvco-core');

  const noMatch = await callTool(server, 'aihub_smart_dispatch', { task_description: 'viết bài thơ về mùa thu' });
  assert.equal(noMatch.data.status, 'NO_CONFIDENT_MATCH');
  assert.ok(noMatch.data.suggestions.length > 0);

  // Số liệu trạng thái tính từ kho dữ liệu, không ghi cứng
  const published = getPublishedTools();
  const status = await callTool(server, 'aihub_get_gateway_status');
  assert.equal(status.data.totalManagedTools, published.length);
  assert.equal(status.data.categoriesCount, new Set(published.map(tool => tool.category).filter(Boolean)).size);
  const publishedIds = new Set(published.map(tool => tool.id));
  assert.ok(status.data.routingCapabilities.length > 0);
  assert.ok(status.data.routingCapabilities.length <= CORE_INTENTS.length);
  for (const capability of status.data.routingCapabilities) assert.ok(publishedIds.has(capability.toolId));
  assert.doesNotMatch(JSON.stringify(status.data), /95%/);

  // Mọi công cụ nhận văn bản đều làm sạch đầu vào
  for (const [name, key] of [['aihub_resolve_capability', 'capability_query'], ['aihub_explain_routing', 'task_description']]) {
    const rejected = await callTool(server, name, { [key]: 'chạy rm -rf / giúp tôi' });
    assert.equal(rejected.isError, true, name);
    assert.equal(rejected.data.status, 'SECURITY_ALERT');
  }
});
