#!/usr/bin/env node

/**
 * AI HUB VN — Smart MCP Gateway & Router (Máy Chủ MCP Trung Gian)
 * 
 * Đóng vai trò làm cổng kết nối duy nhất (Single Point of Entry) cho mọi AI Agent.
 * Tiếp nhận ý định, chọn công cụ phù hợp trong kho dữ liệu và trả về hướng dẫn cài đặt của riêng công cụ đó,
 * thay vì nạp toàn bộ kho vào cửa sổ ngữ cảnh của tác tử.
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { routeTask, getPublishedTools, CORE_INTENTS } from './smart-router.js';
import { dispatchTask } from './dispatcher.js';
import { sanitizeInput } from './security.js';
import { GATEWAY_VERSION, buildCapabilityResult, buildExplanationResult, buildStatusResult } from '@aihub/shared/gateway-core.js';
import { startApiServer } from './api-server.js';

// Khởi tạo máy chủ MCP
const server = new McpServer({
  name: 'aihub-vn-mcp-gateway',
  version: GATEWAY_VERSION
});

const jsonContent = (data, isError = false) => ({
  ...(isError ? { isError: true } : {}),
  content: [{ type: 'text', text: JSON.stringify(data, null, 2) }]
});

// Làm sạch đầu vào cho mọi công cụ nhận văn bản; trả về null nếu an toàn, hoặc phản hồi lỗi
function rejectUnsafe(sanitized) {
  if (sanitized.safe) return null;
  return jsonContent({
    status: 'SECURITY_ALERT',
    error: sanitized.error,
    message: 'Yêu cầu bị từ chối do vi phạm quy chuẩn an toàn bảo mật hệ thống AI HUB VN.'
  }, true);
}

// Tool 1: aihub_smart_dispatch — Nhận bài toán và trả về công cụ phù hợp kèm hướng dẫn cài đặt
server.tool(
  'aihub_smart_dispatch',
  `Tiếp nhận yêu cầu công việc tự nhiên, phân tích ý định và chọn công cụ AI hoặc máy chủ MCP phù hợp nhất trong kho ${getPublishedTools().length.toLocaleString('vi-VN')} tài nguyên AI HUB VN. Khi không đủ tin cậy, trả về NO_CONFIDENT_MATCH kèm danh sách gợi ý.`,
  {
    task_description: z.string().describe('Mô tả chi tiết bài toán, nghiệp vụ hoặc tính năng cần thực hiện (Ví dụ: "Tạo đơn hàng thanh toán MoMo 100k", "Dịch ngược file nhị phân native", "Viết bản SRS IEEE 830", "Tạo mã VietQR Napas247")'),
    parameters: z.record(z.string(), z.any()).optional().describe('Các tham số bổ sung tùy chọn cho bài toán')
  },
  async ({ task_description, parameters = {} }) => {
    const sanitized = sanitizeInput(task_description);
    const rejected = rejectUnsafe(sanitized);
    if (rejected) return rejected;
    const routingResult = routeTask(sanitized.sanitizedText);
    return jsonContent(dispatchTask(routingResult, sanitized.sanitizedText, parameters));
  }
);

// Tool 2: aihub_resolve_capability — Kiểm tra năng lực nghiệp vụ
server.tool(
  'aihub_resolve_capability',
  'Tra cứu xem AI HUB VN có công cụ hỗ trợ mảng nghiệp vụ cụ thể hay không (Ví dụ: "fintech việt nam", "dịch ngược binary", "business analyst", "tự động hóa trình duyệt", "quản trị cơ sở dữ liệu").',
  {
    capability_query: z.string().describe('Tên lĩnh vực, từ khóa hoặc công nghệ cần kiểm tra')
  },
  async ({ capability_query }) => {
    const sanitized = sanitizeInput(capability_query);
    const rejected = rejectUnsafe(sanitized);
    if (rejected) return rejected;
    return jsonContent(buildCapabilityResult(sanitized.sanitizedText, routeTask(sanitized.sanitizedText)));
  }
);

// Tool 3: aihub_explain_routing — Minh bạch hóa quyết định định tuyến
server.tool(
  'aihub_explain_routing',
  'Giải trình lý do và thuật toán định tuyến của MCP Gateway khi chọn (hoặc không chọn được) công cụ cho yêu cầu của người dùng.',
  {
    task_description: z.string().describe('Bài toán cần phân tích lý do định tuyến')
  },
  async ({ task_description }) => {
    const sanitized = sanitizeInput(task_description);
    const rejected = rejectUnsafe(sanitized);
    if (rejected) return rejected;
    return jsonContent(buildExplanationResult(sanitized.sanitizedText, routeTask(sanitized.sanitizedText)));
  }
);

// Tool 4: aihub_get_gateway_status — Trạng thái Gateway, số liệu tính trực tiếp từ kho dữ liệu
server.tool(
  'aihub_get_gateway_status',
  'Báo cáo trạng thái MCP Gateway: số công cụ đang điều phối, số công cụ thị trường Việt Nam, số lĩnh vực và các nhóm ý định chuyên biệt.',
  {},
  async () => jsonContent(buildStatusResult(getPublishedTools(), CORE_INTENTS, 'Model Context Protocol (JSON-RPC 2.0 / stdio)'))
);

// Khởi chạy máy chủ
async function main() {
  const args = process.argv.slice(2);

  // Chế độ chạy thử nghiệm qua dòng lệnh CLI
  if (args.includes('--test') || args.includes('-t')) {
    console.log('--- KHỞI ĐỘNG KIỂM TRA AI HUB VN MCP GATEWAY ---');
    const sampleQuery = args.find(a => !a.startsWith('-')) || 'Tạo mã thanh toán VietQR ngân hàng Techcombank 500k';
    console.log(`Bài toán mẫu: "${sampleQuery}"\n`);

    const sanitized = sanitizeInput(sampleQuery);
    const result = routeTask(sanitized.sanitizedText);
    const dispatched = dispatchTask(result, sanitized.sanitizedText);
    console.log(JSON.stringify(dispatched, null, 2));
    process.exit(0);
  }

  // Chế độ khởi chạy REST API Server độc lập hoặc song song
  if (args.includes('--serve') || args.includes('-s')) {
    const portIndex = args.indexOf('--port');
    const customPort = portIndex !== -1 && args[portIndex + 1] ? parseInt(args[portIndex + 1], 10) : 4000;
    await startApiServer(customPort);
    return;
  }

  // Chế độ Stdio MCP Server chuẩn cho Claude Desktop, Cursor, Antigravity
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error('Lỗi khi vận hành AI HUB VN MCP Gateway:', err);
  process.exit(1);
});
