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
  assert.equal(resVietQr.matchedTool.id, 'vietqr-generator-napas247-mcp');
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
  assert.equal(resBa.matchedTool.id, 'spmtitsolution-openba-kit-57-ai-skills');
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
  assert.equal(dispatched.dispatchedTool.id, 'vietqr-generator-napas247-mcp');
  assert.ok(dispatched.executionPlan.quickCliCommand);
  assert.ok(dispatched.executionPlan.sampleJsonConfig);
  assert.equal(dispatched.contextOptimization.status, 'ACTIVE');
  assert.equal(dispatched.contextOptimization.tokenSavedRatio, '~95%');
});

test('Kiểm tra Smart MCP Router: Xử lý ngoại lệ đầu vào rỗng hoặc không hợp lệ', () => {
  const emptyRes = routeTask('');
  assert.equal(emptyRes.success, false);
  assert.equal(emptyRes.matchedTool, null);

  const nullRes = routeTask(null);
  assert.equal(nullRes.success, false);
});
