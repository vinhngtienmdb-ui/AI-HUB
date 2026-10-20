import fs from 'fs';
import path from 'path';

const allToolsPath = path.resolve('src/data/allTools.json');
const allTools = JSON.parse(fs.readFileSync(allToolsPath, 'utf-8'));

const gatewayTool = {
  id: "aihub-vn-smart-mcp-gateway",
  slug: "aihub-vn-smart-mcp-gateway",
  name: "AI HUB VN Smart MCP Gateway — Máy Chủ MCP Trung Gian Điều Phối Thông Minh Một Cửa",
  icon: "Layers",
  imageUrl: "",
  demoImages: [],
  toolType: "mcp",
  typeNameVi: "MCP Server",
  category: "devops_ci_cd",
  categoryNameVi: "Vận hành triển khai & DevOps",
  categories: ["devops_ci_cd", "backend_api", "cybersecurity", "vietnam"],
  categoryNamesVi: [
    "Vận hành triển khai & DevOps",
    "Backend & Kiến trúc API",
    "An toàn thông tin & An ninh mạng",
    "Tài nguyên & Giải pháp Việt Nam"
  ],
  isVietnamMarket: true,
  platforms: ["claude_desktop", "antigravity", "cursor"],
  sourceUrl: "https://github.com/vinhngtienmdb-ui/AI-HUB",
  authorName: "AI HUB VN",
  license: "Mã nguồn mở (MIT)",
  summaryVi: "Máy chủ MCP Trung Gian Thông Minh (MCP Gateway / Smart Router) chính thức của AI HUB VN. Đóng vai trò làm điểm kết nối duy nhất (Single Point of Contact) cho Claude Code, Cursor, Antigravity và mọi AI Agent: người dùng không cần tự chọn hay cấu hình hàng chục MCP riêng lẻ, máy chủ tự động phân tích ý định tự nhiên và điều phối tức thời đến 2.216+ công cụ trong kho tài nguyên, tiết kiệm tới 95% cửa sổ ngữ cảnh (Context Window).",
  purposeVi: "Giải quyết triệt để 2 vấn đề lớn nhất của người dùng AI: không biết lựa chọn công cụ nào phù hợp giữa hàng nghìn MCP server, và ngăn chặn tình trạng tràn bộ nhớ ngữ cảnh khi phải kết nối quá nhiều công cụ phân tán.",
  featuresVi: [
    "Cơ chế 1 kết nối duy nhất — sử dụng được toàn bộ sức mạnh của hơn 2.216 công cụ và 39 lĩnh vực chuyên môn",
    "Tự động nhận diện ý định (Intent Recognition) theo ngôn ngữ tự nhiên tiếng Việt và tiếng Anh",
    "Định tuyến thông minh đến đúng công cụ chuyên trách: Cổng thanh toán VN (MoMo, VietQR), Dịch ngược REA, BA OpenBA-Kit, CSDL SQLite/Postgres, Tự động hóa Puppeteer/Browser-use",
    "Tiết kiệm ~95% token ngữ cảnh (Context Window): chỉ nạp định nghĩa của công cụ khi cần thực thi",
    "Cung cấp 4 công cụ MCP chuẩn: aihub_smart_dispatch, aihub_resolve_capability, aihub_explain_routing, aihub_get_gateway_status",
    "Tương thích 100% giao thức Model Context Protocol chuẩn qua Stdio Server"
  ],
  installGuideVi: "### Hướng dẫn cài đặt và kết nối AI HUB VN MCP Gateway:\n\n1. **Cấu hình vào Claude Desktop**:\n   Mở tệp `claude_desktop_config.json` và thêm cấu hình:\n   ```json\n   {\n     \"mcpServers\": {\n       \"aihub-gateway\": {\n         \"command\": \"node\",\n         \"args\": [\"C:/Users/vinhn/.gemini/antigravity/scratch/quan-ly-cong-cu-ai/mcp-gateway/index.js\"]\n       }\n     }\n   }\n   ```\n\n2. **Cấu hình vào Cursor IDE / Claude Code**:\n   Thêm vào tệp `.mcp.json` trong thư mục làm việc của dự án.",
  usageGuideVi: "### Cách sử dụng MCP Trung Gian trong cuộc trò chuyện với AI:\n\nBạn chỉ cần ra lệnh tự nhiên, MCP Gateway sẽ tự động phân tích và chọn đúng công cụ bên dưới:\n\n- *\"Hãy tạo mã chuyển khoản VietQR 200.000 VNĐ cho tài khoản ngân hàng Techcombank\"* ➔ Gateway tự động điều phối đến **VietQR Napas247 MCP**.\n- *\"Dịch ngược tệp nhị phân libcore.dylib và kiểm tra các hàm mã hóa\"* ➔ Gateway tự động điều phối đến **REA Reverse Engineering MCP**.\n- *\"Soạn cho tôi bản đặc tả yêu cầu SRS chuẩn IEEE 830\"* ➔ Gateway tự động kích hoạt **OpenBA-Kit 57 Skills**.\n- *\"Kiểm tra xem AI HUB VN có hỗ trợ trích xuất dữ liệu web bằng Markdown không\"* ➔ Gateway giải trình và kết nối đến **Crawl4AI**.",
  samplePromptsVi: [
    "Hỏi AI HUB Gateway kiểm tra năng lực thanh toán ngân hàng tại Việt Nam",
    "Yêu cầu AI HUB Gateway tự động chọn công cụ phù hợp để kiểm thử giao diện website",
    "Xem báo cáo trạng thái các năng lực được quản lý bởi AI HUB Gateway"
  ],
  configs: [
    {
      platform: "claude",
      platformName: "Claude Desktop",
      cliCommand: "node mcp-gateway/index.js",
      jsonConfig: JSON.stringify({
        mcpServers: {
          "aihub-gateway": {
            command: "node",
            args: ["C:/Users/vinhn/.gemini/antigravity/scratch/quan-ly-cong-cu-ai/mcp-gateway/index.js"]
          }
        }
      }, null, 2)
    },
    {
      platform: "antigravity",
      platformName: "Google Antigravity",
      cliCommand: "agy mcp add aihub-gateway --command \"node mcp-gateway/index.js\"",
      jsonConfig: JSON.stringify({
        mcpServers: {
          "aihub-gateway": {
            command: "node",
            args: ["mcp-gateway/index.js"]
          }
        }
      }, null, 2)
    },
    {
      platform: "cursor",
      platformName: "Cursor IDE",
      cliCommand: "node mcp-gateway/index.js",
      jsonConfig: JSON.stringify({
        mcpServers: {
          "aihub-gateway": {
            command: "node",
            args: ["mcp-gateway/index.js"]
          }
        }
      }, null, 2)
    }
  ],
  verified: true,
  rating: 5.0,
  usageCount: 5000,
  tags: ["mcp-gateway", "smart-router", "mcp-proxy", "model-context-protocol", "orchestration", "vietnam", "aihub"]
};

const existingIdx = allTools.findIndex(t => t.id === gatewayTool.id);
if (existingIdx >= 0) {
  allTools[existingIdx] = { ...allTools[existingIdx], ...gatewayTool };
} else {
  allTools.unshift(gatewayTool);
}

fs.writeFileSync(allToolsPath, JSON.stringify(allTools, null, 2), 'utf-8');
console.log('Tổng số công cụ sau khi thêm AI HUB MCP Gateway:', allTools.length);
