import test from 'node:test';
import assert from 'node:assert/strict';
import { routeTask, getAllTools } from '../mcp-gateway/smart-router.js';
import { dispatchTask } from '../mcp-gateway/dispatcher.js';

test('Kiểm tra Smart MCP Router: Đọc toàn bộ kho dữ liệu và khởi tạo thành công', () => {
  const tools = getAllTools();
  assert.ok(Array.isArray(tools), 'Dữ liệu công cụ phải là mảng');
  assert.ok(tools.length >= 2216, 'Kho dữ liệu phải có ít nhất 2.216 công cụ');
});

test('Kiểm tra Smart MCP Router: Định tuyến chính xác nghiệp vụ Thanh toán Việt Nam (VietQR / MoMo)', () => {
  // 1. Thử nghiệm với VietQR
  const resVietQr = routeTask('Tạo mã thanh toán VietQR chuyển khoản ngân hàng Techcombank 500k');
  assert.equal(resVietQr.success, true);
  assert.equal(resVietQr.matchedTool.id, 'vn-repo-vietqr-emvco-core');
  assert.equal(resVietQr.matchedTool.isVietnamMarket, true);
  assert.ok(resVietQr.confidence >= 0.9);

  // 2. Thử nghiệm với MoMo
  const resMomo = routeTask('Tạo link thanh toán qua ví MoMo cho khách mua hàng');
  assert.equal(resMomo.success, true);
  assert.equal(resMomo.matchedTool.id, 'vn-mcp-momo-payment');
  assert.equal(resMomo.matchedTool.isVietnamMarket, true);
});

test('Kiểm tra Smart MCP Router: Định tuyến chính xác nghiệp vụ Dịch ngược mã nguồn (REA)', () => {
  const resRea = routeTask('Dịch ngược file binary native bằng Ghidra và Hopper');
  assert.equal(resRea.success, true);
  assert.equal(resRea.matchedTool.id, 'morluto-rea-reverse-engineer-anything');
  assert.equal(resRea.matchedTool.category, 'cybersecurity');
  assert.ok(resRea.confidence >= 0.9);
});

test('Kiểm tra Smart MCP Router: Định tuyến chính xác nghiệp vụ Phân tích nghiệp vụ BA (OpenBA-Kit)', () => {
  const resBa = routeTask('Viết bản đặc tả yêu cầu kỹ thuật SRS chuẩn IEEE 830 và bóc tách user story INVEST');
  assert.equal(resBa.success, true);
  assert.equal(resBa.matchedTool.id, 'agent-1013');
  assert.ok(resBa.confidence >= 0.9);
});

test('Kiểm tra Smart MCP Router: Định tuyến chính xác nghiệp vụ Tìm kiếm và Cài đặt Agent Skills (Find Skills)', () => {
  const resFindSkill = routeTask('Tìm giúp tôi skill chuyên về tối ưu hóa truy vấn PostgreSQL trên skills.sh');
  assert.equal(resFindSkill.success, true);
  assert.equal(resFindSkill.matchedTool.id, 'vercel-labs-find-skills');
  assert.ok(resFindSkill.confidence >= 0.9);
});

test('Kiểm tra Smart MCP Router: Định tuyến chính xác nghiệp vụ Tự động hóa tìm việc & Viết CV (AI Job Search)', () => {
  const resJob = routeTask('Tự động quét tin tuyển dụng, viết CV may đo và luyện phỏng vấn xin việc với Claude Code');
  assert.equal(resJob.success, true);
  assert.equal(resJob.matchedTool.id, 'mads-lorentzen-ai-job-search');
  assert.ok(resJob.confidence >= 0.9);
});

test('Kiểm tra Smart MCP Router: Định tuyến chính xác nghiệp vụ Quản trị & Điều phối lực lượng Agent (Paperclip)', () => {
  const resPaperclip = routeTask('Quản lý và điều phối biệt đội tác tử Claude Code theo sơ đồ tổ chức phòng ban với Paperclip');
  assert.equal(resPaperclip.success, true);
  assert.equal(resPaperclip.matchedTool.id, 'paperclipai-paperclip');
  assert.ok(resPaperclip.confidence >= 0.9);
});

test('Kiểm tra Smart MCP Router: Định tuyến chính xác nghiệp vụ Quy trình VibeCode (dev-lifecycle)', () => {
  const resVibe = routeTask('Áp dụng quy trình VibeCode 13 giai đoạn và khởi tạo bộ tài liệu chuẩn cho dự án phần mềm');
  assert.equal(resVibe.success, true);
  assert.equal(resVibe.matchedTool.id, 'vibecoding-skill-dev-lifecycle');
  assert.ok(resVibe.confidence >= 0.9);
});

test('Kiểm tra Smart MCP Router: Định tuyến chính xác nghiệp vụ Bộ nhớ tác tử Hindsight (Vectorize Hindsight)', () => {
  const resHindsight = routeTask('Tôi cần bộ nhớ tác tử Hindsight để ghi nhớ retain và truy hồi recall kinh nghiệm qua các phiên');
  assert.equal(resHindsight.success, true);
  assert.equal(resHindsight.matchedTool.id, 'vectorize-io-hindsight');
  assert.ok(resHindsight.confidence >= 0.9);
});

test('Kiểm tra Smart MCP Router: Định tuyến chính xác nghiệp vụ Cơ sở dữ liệu (SQLite & Postgres)', () => {
  const resSqlite = routeTask('Truy vấn tệp cơ sở dữ liệu SQLite cục bộ dev.db bằng ngôn ngữ tự nhiên');
  assert.equal(resSqlite.success, true);
  assert.equal(resSqlite.matchedTool.id, 'sqlite-mcp-database-server');

  const resPg = routeTask('Kiểm tra bảng users trong cơ sở dữ liệu PostgreSQL');
  assert.equal(resPg.success, true);
  assert.equal(resPg.matchedTool.id, 'postgresql-database-mcp-server');
});

test('Kiểm tra Smart MCP Dispatcher: Đóng gói phản hồi, kế hoạch thực thi và tối ưu Context Window', () => {
  const query = 'Tạo mã thanh toán VietQR chuyển khoản ngân hàng 100k';
  const routing = routeTask(query);
  const dispatched = dispatchTask(routing, query);

  assert.equal(dispatched.status, 'DISPATCH_SUCCESS');
  assert.equal(dispatched.gateway.name, 'AI HUB VN Smart MCP Gateway');
  assert.equal(dispatched.dispatchedTool.id, 'vn-repo-vietqr-emvco-core');
  assert.ok(dispatched.executionPlan.quickCliCommand);
  assert.ok(dispatched.executionPlan.sampleJsonConfig);
  assert.match(dispatched.contextNote, /chỉ trả về định nghĩa của công cụ được chọn/);
});

test('Smart MCP Router: không đủ tin cậy thì trả NO_CONFIDENT_MATCH kèm gợi ý, không tự chọn công cụ', () => {
  for (const query of ['viết bài thơ về mùa thu', 'thiết kế logo']) {
    const routing = routeTask(query);
    assert.equal(routing.strategy, 'NO_CONFIDENT_MATCH', query);
    assert.equal(routing.success, false);
    assert.equal(routing.matchedTool, null);
    assert.ok(routing.suggestions.some(s => s.id === 'agent-1013'), 'luôn gợi ý trợ lý làm rõ yêu cầu');

    const dispatched = dispatchTask(routing, query);
    assert.equal(dispatched.status, 'NO_CONFIDENT_MATCH');
    assert.equal(dispatched.dispatchedTool, undefined);
  }
});

test('Smart MCP Router: cụm từ tiếng Việt khớp nguyên cụm ("thiết kế" không khớp "kế toán")', async () => {
  const { scoreTools } = await import('../mcp-gateway/gateway-core.js');
  const tools = [
    { id: 'a', name: 'Phần mềm kế toán doanh nghiệp', summaryVi: '' },
    { id: 'b', name: 'Công cụ thiết kế giao diện', summaryVi: '' },
    { id: 'c', name: 'Bộ thiết kế logo', summaryVi: '' }
  ];
  const ids = scoreTools('thiết kế', tools).map(c => c.tool.id);
  assert.deepEqual(ids.sort(), ['b', 'c']);
});

test('Smart MCP Router: khớp từ khóa trả độ tin cậy dưới mức ý định chuyên biệt và kèm phương án khác', () => {
  const routing = routeTask('helm chart');
  assert.equal(routing.strategy, 'KEYWORD_MATCH');
  assert.ok(routing.confidence <= 0.85);
  assert.match(routing.matchedTool.name, /helm/i);
  assert.ok(Array.isArray(routing.suggestions));
});

test('Smart MCP Dispatcher: không bịa lệnh cài khi công cụ không có cliCommand', async () => {
  const { buildDispatchResult } = await import('../mcp-gateway/gateway-core.js');
  const tool = { id: 'no-cmd-tool', name: 'Công cụ không có lệnh', configs: [] };
  const result = buildDispatchResult({ strategy: 'KEYWORD_MATCH', confidence: 0.7, intentId: 'keyword_match', matchedTool: tool, suggestions: [], reasoningVi: '' }, 1);
  assert.equal(result.executionPlan.quickCliCommand, null);
  assert.equal(result.executionPlan.sampleJsonConfig, null);
});

test('Kiểm tra Smart MCP Router: Xử lý ngoại lệ đầu vào rỗng hoặc không hợp lệ', () => {
  const emptyRes = routeTask('');
  assert.equal(emptyRes.success, false);
  assert.equal(emptyRes.matchedTool, null);

  const nullRes = routeTask(null);
  assert.equal(nullRes.success, false);
});

test('Kiểm tra Smart MCP Router: Từ khóa ngắn chỉ khớp nguyên từ, không khớp chuỗi con', () => {
  assert.notStrictEqual(routeTask('Thiết kế database cho hệ thống đơn hàng').intentId, 'business_analysis');
  assert.notStrictEqual(routeTask('Tạo ứng dụng react mới').intentId, 'reverse_engineering_rea');
  assert.strictEqual(routeTask('Viết user story cho BA').intentId, 'business_analysis');
});

test('Bảng ý định dùng chung: Mọi ý định trỏ tới công cụ có thật, không trùng mã, từ khóa viết thường', async () => {
  const { readFileSync } = await import('node:fs');
  const intents = JSON.parse(readFileSync(new URL('../mcp-gateway/core-intents.json', import.meta.url), 'utf-8'));
  const toolIds = new Set(getAllTools().filter(t => t.status === 'published' || !t.status).map(t => t.id));
  const seen = new Set();
  for (const intent of intents) {
    assert.ok(toolIds.has(intent.targetToolId), `Ý định ${intent.intentId} trỏ tới công cụ không tồn tại hoặc đã bị ẩn: ${intent.targetToolId}`);
    assert.ok(!seen.has(intent.intentId), `Trùng mã ý định ${intent.intentId}`);
    seen.add(intent.intentId);
    for (const kw of intent.keywords) assert.strictEqual(kw, kw.toLowerCase(), `Từ khóa "${kw}" phải viết thường`);
  }
});

test('Bộ so khớp ý định dùng chung: Khớp nguyên từ với từ khóa ngắn, chọn ý định điểm cao nhất', async () => {
  const { matchesKeyword, findBestIntent } = await import('../mcp-gateway/intent-matcher.js');
  assert.strictEqual(matchesKeyword('thiết kế database', 'ba'), false);
  assert.strictEqual(matchesKeyword('viết srs cho ba.', 'ba'), true);
  assert.strictEqual(matchesKeyword('tạo app react', 'rea'), false);
  const intents = [
    { intentId: 'a', targetToolId: 'x', keywords: ['momo'], priority: 5 },
    { intentId: 'b', targetToolId: 'y', keywords: ['momo', 'ví momo'], priority: 1 }
  ];
  assert.strictEqual(findBestIntent('Thanh toán qua ví MoMo', intents).intent.intentId, 'b');
  assert.strictEqual(findBestIntent('không liên quan', intents), null);
});
