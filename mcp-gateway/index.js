#!/usr/bin/env node

/**
 * AI HUB VN — Smart MCP Gateway & Router (Máy Chủ MCP Trung Gian)
 * 
 * Đóng vai trò làm cổng kết nối duy nhất (Single Point of Entry) cho mọi AI Agent.
 * Tự động tiếp nhận ý định, định tuyến thông minh đến 2.216+ công cụ trong kho dữ liệu,
 * tối ưu hóa 95% cửa sổ ngữ cảnh (Context Window) và loại bỏ hoàn toàn việc phải cấu hình thủ công.
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { routeTask, getAllTools } from './smart-router.js';
import { dispatchTask } from './dispatcher.js';

// Khởi tạo máy chủ MCP
const server = new McpServer({
  name: 'aihub-vn-mcp-gateway',
  version: '2.0.0'
});

// Tool 1: aihub_smart_dispatch — Nhận bài toán và tự động điều phối thực thi
server.tool(
  'aihub_smart_dispatch',
  'Tiếp nhận yêu cầu công việc tự nhiên từ người dùng, tự động phân tích ý định và định tuyến đến công cụ AI hoặc máy chủ MCP chuyên trách phù hợp nhất trong kho 2.216 tài nguyên AI HUB VN.',
  {
    task_description: z.string().describe('Mô tả chi tiết bài toán, nghiệp vụ hoặc tính năng cần thực hiện (Ví dụ: "Tạo đơn hàng thanh toán MoMo 100k", "Dịch ngược file nhị phân native", "Viết bản SRS IEEE 830", "Tạo mã VietQR Napas247")'),
    parameters: z.record(z.any()).optional().describe('Các tham số bổ sung tùy chọn cho bài toán')
  },
  async ({ task_description, parameters = {} }) => {
    const routingResult = routeTask(task_description);
    const dispatchResult = dispatchTask(routingResult, task_description, parameters);

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(dispatchResult, null, 2)
        }
      ]
    };
  }
);

// Tool 2: aihub_resolve_capability — Kiểm tra năng lực nghiệp vụ
server.tool(
  'aihub_resolve_capability',
  'Tra cứu xem AI HUB VN có khả năng hỗ trợ mảng nghiệp vụ cụ thể hay không (Ví dụ: "fintech việt nam", "dịch ngược binary", "business analyst", "tự động hóa trình duyệt", "quản trị cơ sở dữ liệu").',
  {
    capability_query: z.string().describe('Tên lĩnh vực, từ khóa hoặc công nghệ cần kiểm tra')
  },
  async ({ capability_query }) => {
    const routingResult = routeTask(capability_query);
    const tool = routingResult.matchedTool;

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            query: capability_query,
            supported: Boolean(tool),
            confidence: Math.round(routingResult.confidence * 100) + '%',
            recommendedTool: tool ? {
              id: tool.id,
              name: tool.name,
              categoryNameVi: tool.categoryNameVi,
              isVietnamMarket: Boolean(tool.isVietnamMarket),
              officialUrl: tool.sourceUrl
            } : null,
            reasoningVi: routingResult.reasoningVi
          }, null, 2)
        }
      ]
    };
  }
);

// Tool 3: aihub_explain_routing — Minh bạch hóa quyết định định tuyến
server.tool(
  'aihub_explain_routing',
  'Giải trình chi tiết lý do và thuật toán định tuyến của MCP Gateway khi chọn một công cụ cụ thể cho yêu cầu của người dùng.',
  {
    task_description: z.string().describe('Bài toán cần phân tích lý do định tuyến')
  },
  async ({ task_description }) => {
    const routingResult = routeTask(task_description);

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            taskDescription: task_description,
            routingStrategy: routingResult.strategy,
            confidenceScore: routingResult.confidence,
            intentIdentified: routingResult.intentId,
            matchedTool: routingResult.matchedTool ? {
              id: routingResult.matchedTool.id,
              name: routingResult.matchedTool.name,
              category: routingResult.matchedTool.categoryNameVi
            } : null,
            fullExplanationVi: routingResult.reasoningVi
          }, null, 2)
        }
      ]
    };
  }
);

// Tool 4: aihub_get_gateway_status — Trạng thái Gateway & Thống kê tối ưu hóa
server.tool(
  'aihub_get_gateway_status',
  'Báo cáo trạng thái hoạt động của MCP Gateway: số lượng tài nguyên sẵn sàng điều phối, số lượng công cụ Việt Nam và thống kê tiết kiệm Context Window.',
  {},
  async () => {
    const tools = getAllTools();
    const vnTools = tools.filter(t => t.isVietnamMarket || t.category === 'vietnam');

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            status: 'ONLINE',
            serverName: 'AI HUB VN Smart MCP Gateway',
            version: '2.0.0',
            protocol: 'Model Context Protocol (JSON-RPC 2.0 / stdio)',
            totalManagedTools: tools.length,
            vietnamMarketTools: vnTools.length,
            categoriesCount: 39,
            contextWindowSavings: 'Tiết kiệm tới ~95% token so với việc nạp thủ công toàn bộ công cụ vào Agent',
            routingCapabilities: [
              'Fintech & Cổng thanh toán Việt Nam (MoMo, ZaloPay, VNPAY, VietQR Napas 247)',
              'Kỹ thuật dịch ngược mã nguồn & Binary Native (REA, Ghidra, Hopper, IDA Pro)',
              'Bộ kỹ năng phân tích nghiệp vụ toàn diện (OpenBA-Kit 57 Skills, IEEE 830, INVEST, Gherkin)',
              'Tự động hóa trình duyệt & Kiểm thử QA (Puppeteer, Browser Use, Playwright)',
              'Quản trị cơ sở dữ liệu quan hệ (PostgreSQL, SQLite)',
              'Bộ công cụ xử lý ngôn ngữ tự nhiên tiếng Việt (NLP UnderTheSea)',
              'Giám sát chi phí API & Token Claude Code (CC Usage, ccflare)'
            ]
          }, null, 2)
        }
      ]
    };
  }
);

// Khởi chạy máy chủ
async function main() {
  const args = process.argv.slice(2);

  // Chế độ chạy thử nghiệm qua dòng lệnh CLI
  if (args.includes('--test') || args.includes('-t')) {
    console.log('--- KHỞI ĐỘNG KIỂM TRA AI HUB VN MCP GATEWAY ---');
    const sampleQuery = args.find(a => !a.startsWith('-')) || 'Tạo mã thanh toán VietQR ngân hàng Techcombank 500k';
    console.log(`Bài toán mẫu: "${sampleQuery}"\n`);

    const result = routeTask(sampleQuery);
    const dispatched = dispatchTask(result, sampleQuery);
    console.log(JSON.stringify(dispatched, null, 2));
    process.exit(0);
  }

  // Chế độ Stdio MCP Server chuẩn cho Claude Desktop, Cursor, Antigravity
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error('Lỗi khi vận hành AI HUB VN MCP Gateway:', err);
  process.exit(1);
});
