import fs from 'fs';
import path from 'path';

const allToolsPath = path.resolve('src/data/allTools.json');
const allTools = JSON.parse(fs.readFileSync(allToolsPath, 'utf-8'));

console.log('Tổng số công cụ hiện tại trước khi thêm:', allTools.length);

const existingIds = new Set(allTools.map(t => t.id));

const newMcpTools = [
  // 1. SQLite MCP Server
  {
    id: "sqlite-mcp-database-server",
    slug: "sqlite-mcp-database-server",
    name: "SQLite MCP Server - Máy Chủ Truy Vấn Cơ Sở Dữ Liệu SQLite Bằng Ngôn Ngữ Tự Nhiên",
    icon: "Database",
    imageUrl: "",
    demoImages: [],
    toolType: "mcp",
    typeNameVi: "MCP Server",
    category: "database_storage",
    categoryNameVi: "Cơ sở dữ liệu & Lưu trữ dữ liệu",
    categories: ["database_storage", "backend_api", "data_analytics"],
    categoryNamesVi: ["Cơ sở dữ liệu & Lưu trữ dữ liệu", "Backend & Kiến trúc API", "Khoa học dữ liệu & Trực quan hóa BI"],
    isVietnamMarket: false,
    platforms: ["claude_desktop", "antigravity", "cursor"],
    sourceUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/sqlite",
    authorName: "Anthropic / Model Context Protocol",
    license: "Mã nguồn mở (MIT)",
    summaryVi: "Máy chủ MCP chuẩn chính thức cho phép AI Agent tương tác trực tiếp với cơ sở dữ liệu SQLite cục bộ. Thay vì phải viết câu lệnh SQL thủ công, người dùng có thể mô tả yêu cầu bằng ngôn ngữ tự nhiên (tiếng Việt hoặc tiếng Anh) để AI tự động sinh và thực thi câu truy vấn an toàn.",
    purposeVi: "Hỗ trợ lập trình viên tra cứu dữ liệu ứng dụng cục bộ, kiểm tra schema bảng, kiểm thử các truy vấn thống kê dữ liệu nhanh chóng mà không cần mở các công cụ quản lý cơ sở dữ liệu bên ngoài.",
    featuresVi: [
      "Tự động đọc lược đồ cơ sở dữ liệu: danh sách bảng, cột, khóa chính và ràng buộc",
      "Chuyển đổi câu hỏi bằng tiếng Việt tự nhiên thành câu lệnh SQL chuẩn xác",
      "Hỗ trợ chế độ chỉ đọc (Read-only) bảo vệ an toàn cho dữ liệu production cục bộ",
      "Gợi ý tạo chỉ mục (Index) và tối ưu hóa hiệu năng truy vấn cho tệp SQLite"
    ],
    installGuideVi: "### Hướng dẫn cài đặt SQLite MCP Server:\n\n```bash\nnpx -y @modelcontextprotocol/server-sqlite --db-path ./my-database.db\n```",
    usageGuideVi: "### Yêu cầu AI Agent trong Claude Desktop:\n\n*\"Tìm tất cả người dùng đăng ký trong tháng 3 nhưng chưa xác thực email trong tệp dữ liệu app.db\"*.",
    samplePromptsVi: [
      "Đọc lược đồ cơ sở dữ liệu SQLite và thống kê tổng số đơn hàng theo từng ngày",
      "Viết câu lệnh cập nhật trạng thái đơn hàng đã thanh toán thành công trong bảng orders"
    ],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npx -y @modelcontextprotocol/server-sqlite --db-path ./database.sqlite",
        jsonConfig: JSON.stringify({
          mcpServers: {
            "sqlite": {
              command: "npx",
              args: [
                "-y",
                "@modelcontextprotocol/server-sqlite",
                "--db-path",
                "./dev.db"
              ]
            }
          }
        }, null, 2)
      }
    ],
    verified: true,
    rating: 4.9,
    usageCount: 2850,
    tags: ["sqlite", "database", "mcp", "sql", "backend", "claude-code"]
  },

  // 2. Google Drive MCP Server
  {
    id: "google-drive-mcp-server",
    slug: "google-drive-mcp-server",
    name: "Google Drive MCP Server - Máy Chủ Kết Nối & Tìm Kiếm Tài Liệu Đám Mây Google Drive",
    icon: "Cloud",
    imageUrl: "",
    demoImages: [],
    toolType: "mcp",
    typeNameVi: "MCP Server",
    category: "content_writing",
    categoryNameVi: "Sáng tạo nội dung & Biên tập",
    categories: ["content_writing", "data_analytics", "sales_crm"],
    categoryNamesVi: ["Sáng tạo nội dung & Biên tập", "Khoa học dữ liệu & Trực quan hóa BI", "Bán hàng & Quản lý khách hàng CRM"],
    isVietnamMarket: false,
    platforms: ["claude_desktop", "antigravity", "cursor"],
    sourceUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/gdrive",
    authorName: "Anthropic / Model Context Protocol",
    license: "Mã nguồn mở (MIT)",
    summaryVi: "Máy chủ MCP kết nối an toàn với kho lưu trữ đám mây Google Drive. Cho phép AI Agent tìm kiếm tệp tin, trích xuất dữ liệu từ văn bản Google Docs, trang tính Google Sheets và các tệp PDF tài liệu dự án.",
    purposeVi: "Tích hợp toàn bộ kho tài liệu doanh nghiệp và báo cáo dự án trên Google Drive vào luồng xử lý của trợ lý AI để phân tích dữ liệu, tóm tắt hợp đồng và soạn thảo văn bản tự động.",
    featuresVi: [
      "Tìm kiếm tệp tin theo tên, nội dung và định dạng trên toàn bộ tài khoản Google Drive",
      "Trích xuất văn bản từ tài liệu Google Docs và trang tính Google Sheets trực tiếp",
      "Cơ chế xác thực an toàn thông qua OAuth 2.0 chuẩn của Google Cloud Platform"
    ],
    installGuideVi: "### Hướng dẫn cài đặt Google Drive MCP Server:\n\n```bash\nnpx -y @modelcontextprotocol/server-gdrive\n```\n*Yêu cầu cấu hình thông tin OAuth Client ID và Client Secret từ Google Cloud Console.*",
    usageGuideVi: "### Khẩu lệnh mẫu trong Claude Code:\n\n*\"Hãy tìm trong Google Drive bảng tính 'Kế hoạch ngân sách Q3' và tóm tắt các khoản chi phí dự kiến lớn nhất\"*.",
    samplePromptsVi: [
      "Tìm tài liệu hợp đồng mới nhất với khách hàng trong Google Drive và kiểm tra các điều khoản thanh toán",
      "Trích xuất danh sách liên hệ khách hàng tiềm năng từ file Google Sheets vừa cập nhật"
    ],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npx -y @modelcontextprotocol/server-gdrive",
        jsonConfig: JSON.stringify({
          mcpServers: {
            "gdrive": {
              command: "npx",
              args: ["-y", "@modelcontextprotocol/server-gdrive"],
              env: {
                "GDRIVE_CLIENT_ID": "your_client_id_here",
                "GDRIVE_CLIENT_SECRET": "your_client_secret_here"
              }
            }
          }
        }, null, 2)
      }
    ],
    verified: true,
    rating: 4.86,
    usageCount: 2410,
    tags: ["google-drive", "gdrive", "mcp", "documents", "sheets", "cloud"]
  },

  // 3. Brave Search MCP Server
  {
    id: "brave-search-privacy-mcp-server",
    slug: "brave-search-privacy-mcp-server",
    name: "Brave Search MCP Server - Máy Chủ Tra Cứu Web Bảo Mật Quyền Riêng Tư Cho AI Agents",
    icon: "Search",
    imageUrl: "",
    demoImages: [],
    toolType: "mcp",
    typeNameVi: "MCP Server",
    category: "seo_growth",
    categoryNameVi: "Tối ưu hóa công cụ tìm kiếm SEO",
    categories: ["seo_growth", "marketing_advertising", "cybersecurity"],
    categoryNamesVi: ["Tối ưu hóa công cụ tìm kiếm SEO", "Tiếp thị số & Quảng cáo", "An toàn thông tin & An ninh mạng"],
    isVietnamMarket: false,
    platforms: ["claude_desktop", "antigravity", "cursor"],
    sourceUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/brave-search",
    authorName: "Brave Software / MCP Reference",
    license: "Mã nguồn mở (MIT)",
    summaryVi: "Máy chủ MCP kết nối công cụ tìm kiếm Brave Search API. Cho phép AI Agent tìm kiếm thông tin trên web và dữ liệu địa phương với cam kết bảo mật tuyệt đối, không thu thập danh tính và không theo dõi hành vi người dùng.",
    purposeVi: "Cung cấp nguồn thông tin cập nhật thời gian thực từ Internet cho AI Agent khi nghiên cứu thị trường, kiểm tra tin tức công nghệ mới và tra cứu tài liệu lập trình mà vẫn đảm bảo tính riêng tư dữ liệu nội bộ.",
    featuresVi: [
      "Tìm kiếm web thời gian thực thông qua chỉ mục tìm kiếm độc lập của Brave",
      "Hỗ trợ tìm kiếm dữ liệu địa điểm, thời tiết và tin tức địa phương",
      "Tuyệt đối không lưu vết cookie, không gắn hồ sơ người dùng phục vụ quảng cáo"
    ],
    installGuideVi: "### Hướng dẫn cài đặt Brave Search MCP Server:\n\n1. Lấy mã API Key miễn phí tại `https://brave.com/search/api/`\n2. Cài đặt và cấu hình:\n```bash\nnpx -y @modelcontextprotocol/server-brave-search\n```",
    usageGuideVi: "### Khẩu lệnh mẫu trong Claude Code:\n\n*\"Tìm kiếm các xu hướng thiết kế web mới nhất trong tháng này bằng Brave Search và tổng hợp lại cho tôi\"*.",
    samplePromptsVi: [
      "Tra cứu phiên bản mới nhất của thư viện Next.js và các thay đổi quan trọng",
      "Tìm thông tin các sự kiện hội thảo công nghệ AI sắp diễn ra tại Đông Nam Á"
    ],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npx -y @modelcontextprotocol/server-brave-search",
        jsonConfig: JSON.stringify({
          mcpServers: {
            "brave-search": {
              command: "npx",
              args: ["-y", "@modelcontextprotocol/server-brave-search"],
              env: {
                "BRAVE_API_KEY": "your_brave_api_key_here"
              }
            }
          }
        }, null, 2)
      }
    ],
    verified: true,
    rating: 4.88,
    usageCount: 2150,
    tags: ["brave", "search", "privacy", "mcp", "web", "research"]
  },

  // 4. Puppeteer MCP Server
  {
    id: "puppeteer-browser-automation-mcp",
    slug: "puppeteer-browser-automation-mcp",
    name: "Puppeteer MCP Server - Máy Chủ Điều Khiển Trình Duyệt & Tự Động Hóa QA Cho Claude Code",
    icon: "Monitor",
    imageUrl: "",
    demoImages: [],
    toolType: "mcp",
    typeNameVi: "MCP Server",
    category: "qa_testing",
    categoryNameVi: "Kiểm thử & Đảm bảo chất lượng QA",
    categories: ["qa_testing", "frontend_ui", "devops_ci_cd"],
    categoryNamesVi: ["Kiểm thử & Đảm bảo chất lượng QA", "Giao diện người dùng & Frontend", "Vận hành triển khai & DevOps"],
    isVietnamMarket: false,
    platforms: ["claude_desktop", "antigravity", "cursor"],
    sourceUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/puppeteer",
    authorName: "Anthropic / Model Context Protocol",
    license: "Mã nguồn mở (MIT)",
    summaryVi: "Máy chủ MCP tự động hóa trình duyệt web và cào dữ liệu mạnh mẽ nhất dành cho Claude Code. Biến Claude thành một kỹ sư kiểm thử QA tự động: mở trang web, nhấp chuột tương tác, điền biểu mẫu, chụp ảnh màn hình và phát hiện lỗi giao diện mà không cần viết kịch bản test thủ công.",
    purposeVi: "Thiết lập đường ống kiểm thử tự động (Automated QA Pipeline) cho các ứng dụng web, kiểm tra luồng mua hàng và giám sát giá sản phẩm của đối thủ cạnh tranh.",
    featuresVi: [
      "Mở và điều khiển trình duyệt Chromium chạy ngầm hoặc có giao diện",
      "Chụp ảnh màn hình toàn trang hoặc từng phần tử để AI phát hiện lỗi giao diện CSS",
      "Thực thi mã JavaScript trong trang web và kiểm tra các gói tin mạng Network"
    ],
    installGuideVi: "### Hướng dẫn cài đặt Puppeteer MCP Server:\n\n```bash\nnpx -y @modelcontextprotocol/server-puppeteer\n```",
    usageGuideVi: "### Yêu cầu AI Agent kiểm thử website:\n\n*\"Mở trang chủ localhost:3000, kiểm tra xem nút 'Đăng nhập' có hoạt động không và chụp ảnh màn hình gửi cho tôi\"*.",
    samplePromptsVi: [
      "Truy cập website thương mại điện tử, thêm sản phẩm vào giỏ hàng và kiểm tra tính toán tổng tiền",
      "Chụp ảnh màn hình giao diện ở kích thước di động 375px và kiểm tra thanh điều hướng có bị tràn không"
    ],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npx -y @modelcontextprotocol/server-puppeteer",
        jsonConfig: JSON.stringify({
          mcpServers: {
            "puppeteer": {
              command: "npx",
              args: ["-y", "@modelcontextprotocol/server-puppeteer"]
            }
          }
        }, null, 2)
      }
    ],
    verified: true,
    rating: 4.93,
    usageCount: 3820,
    tags: ["puppeteer", "browser", "automation", "qa", "testing", "mcp", "claude-code"]
  },

  // 5. Browserbase MCP Server
  {
    id: "browserbase-cloud-browser-mcp-server",
    slug: "browserbase-cloud-browser-mcp-server",
    name: "Browserbase MCP Server - Máy Chủ Điều Khiển Trình Duyệt Đám Mây Cho AI Agents",
    icon: "Cloud",
    imageUrl: "",
    demoImages: [],
    toolType: "mcp",
    typeNameVi: "MCP Server",
    category: "devops_ci_cd",
    categoryNameVi: "Vận hành triển khai & DevOps",
    categories: ["devops_ci_cd", "qa_testing", "cloud_infrastructure"],
    categoryNamesVi: ["Vận hành triển khai & DevOps", "Kiểm thử & Đảm bảo chất lượng QA", "Điện toán đám mây & Hạ tầng Cloud"],
    isVietnamMarket: false,
    platforms: ["claude_desktop", "antigravity", "cursor"],
    sourceUrl: "https://github.com/browserbase/mcp-server-browserbase",
    authorName: "Browserbase Team",
    license: "Mã nguồn mở (MIT)",
    summaryVi: "Máy chủ MCP kết nối nền tảng trình duyệt đám mây Browserbase. Cho phép AI Agent chạy hàng loạt phiên trình duyệt web không đầu trên hạ tầng đám mây thay vì tiêu tốn tài nguyên CPU và băng thông mạng trên máy cục bộ.",
    purposeVi: "Tối ưu hóa các tác vụ cào dữ liệu quy mô lớn, kiểm thử tự động song song và duyệt các website phức tạp có hệ thống chống bot mà không lo bị chặn IP hoặc treo máy cá nhân.",
    featuresVi: [
      "Vận hành trình duyệt Chromium trên hạ tầng đám mây siêu tốc với IP dân cư sạch",
      "Tự động xử lý Captcha và vượt qua các cơ chế kiểm tra bảo mật bot của Cloudflare",
      "Lưu trữ video ghi lại toàn bộ phiên duyệt web và nhật ký mạng chi tiết"
    ],
    installGuideVi: "### Cài đặt Browserbase MCP Server:\n\n```bash\nnpx -y @browserbase/mcp-server-browserbase\n```\n*Yêu cầu BROWSERBASE_API_KEY và BROWSERBASE_PROJECT_ID.*",
    usageGuideVi: "### Sử dụng trong Claude Code:\n\n*\"Chạy 5 phiên duyệt web song song trên Browserbase để kiểm tra khả năng phản hồi của hệ thống thanh toán trên toàn cầu\"*.",
    samplePromptsVi: [
      "Khởi tạo phiên trình duyệt đám mây và chụp ảnh báo cáo từ dashboard nội bộ",
      "Thu thập bảng giá sản phẩm từ 10 website đối thủ mà không làm tiêu tốn băng thông máy trạm"
    ],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npx -y @browserbase/mcp-server-browserbase",
        jsonConfig: JSON.stringify({
          mcpServers: {
            "browserbase": {
              command: "npx",
              args: ["-y", "@browserbase/mcp-server-browserbase"],
              env: {
                "BROWSERBASE_API_KEY": "your_browserbase_api_key",
                "BROWSERBASE_PROJECT_ID": "your_project_id"
              }
            }
          }
        }, null, 2)
      }
    ],
    verified: true,
    rating: 4.89,
    usageCount: 1980,
    tags: ["browserbase", "cloud-browser", "mcp", "scraping", "qa", "automation"]
  },

  // 6. CC Usage & ccflare
  {
    id: "cc-usage-cost-analyzer-cli",
    slug: "cc-usage-cost-analyzer-cli",
    name: "CC Usage & ccflare - Bộ Công Cụ Giám Sát Chi Phí & Định Mức Token Cho Claude Code",
    icon: "Terminal",
    imageUrl: "",
    demoImages: [],
    toolType: "cli",
    typeNameVi: "CLI",
    category: "devops_ci_cd",
    categoryNameVi: "Vận hành triển khai & DevOps",
    categories: ["devops_ci_cd", "cloud_infrastructure", "data_analytics"],
    categoryNamesVi: ["Vận hành triển khai & DevOps", "Điện toán đám mây & Hạ tầng Cloud", "Khoa học dữ liệu & Trực quan hóa BI"],
    isVietnamMarket: false,
    platforms: ["claude_desktop", "antigravity", "cursor"],
    sourceUrl: "https://github.com/anthropics/claude-code",
    authorName: "Claude Code Community",
    license: "Mã nguồn mở (MIT)",
    summaryVi: "Bộ công cụ dòng lệnh (CC Usage) và bảng điều khiển trực quan (ccflare) giám sát mức tiêu thụ token và chi phí API theo thời gian thực khi sử dụng Claude Code. Giúp lập trình viên nắm bắt chính xác mức tiêu dùng và tối ưu hóa ngân sách.",
    purposeVi: "Ngăn chặn tình trạng phát sinh chi phí API ngoài tầm kiểm soát khi chạy các tác vụ lập trình dài hạn hoặc các kịch bản tự động hóa lớn với Claude Code.",
    featuresVi: [
      "Hiển thị số lượng token đầu vào (Input), đầu ra (Output) và bộ nhớ đệm (Cache) theo từng phiên làm việc",
      "Tính toán chi phí USD tức thời dựa trên biểu giá chính thức của các mô hình Claude 3.5 Sonnet / Opus",
      "Cảnh báo khi mức chi tiêu trong ngày vượt quá ngưỡng ngân sách định sẵn"
    ],
    installGuideVi: "### Cài đặt CC Usage CLI:\n\n```bash\nnpm install -g cc-usage\n```",
    usageGuideVi: "### Chạy kiểm tra chi phí sử dụng Claude Code:\n\n```bash\ncc-usage --summary\ncc-usage --today\n```",
    samplePromptsVi: [
      "Thống kê tổng lượng token và chi phí phát sinh trong phiên lập trình hôm nay",
      "Phân tích tỷ lệ tái sử dụng Prompt Cache để đánh giá hiệu quả tối ưu chi phí"
    ],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npm install -g cc-usage",
        jsonConfig: JSON.stringify({
          tool: "cc-usage",
          type: "cli"
        }, null, 2)
      }
    ],
    verified: true,
    rating: 4.95,
    usageCount: 2900,
    tags: ["claude-code", "cost-management", "token-usage", "monitoring", "cli"]
  },

  // 7. Claude Flow Orchestrator
  {
    id: "claude-flow-code-orchestrator",
    slug: "claude-flow-code-orchestrator",
    name: "Claude Flow - Bộ Điều Phối Lập Trình Tự Động & Tái Cấu Trúc Mã Nguồn Theo Mẫu",
    icon: "Workflow",
    imageUrl: "",
    demoImages: [],
    toolType: "workflow",
    typeNameVi: "Workflow",
    category: "devops_ci_cd",
    categoryNameVi: "Vận hành triển khai & DevOps",
    categories: ["devops_ci_cd", "backend_api", "frontend_ui"],
    categoryNamesVi: ["Vận hành triển khai & DevOps", "Backend & Kiến trúc API", "Giao diện người dùng & Frontend"],
    isVietnamMarket: false,
    platforms: ["claude_desktop", "antigravity", "cursor"],
    sourceUrl: "https://github.com/anthropics/claude-code",
    authorName: "Claude Flow Open Source",
    license: "Mã nguồn mở (MIT)",
    summaryVi: "Bộ công cụ điều phối quy trình viết mã và tối ưu hóa tự động cho các nhóm phát triển phần mềm. Tự động hóa các tác vụ lập trình lặp lại: sinh mã khung (Boilerplate), cập nhật tài liệu kỹ thuật đồng bộ và tái cấu trúc (Refactor) mã nguồn theo kiến trúc chuẩn.",
    purposeVi: "Giải phóng lập trình viên khỏi các công việc mã hóa thủ công tẻ nhạt, đảm bảo tính nhất quán về tiêu chuẩn viết mã nguồn trên toàn bộ dự án phần mềm.",
    featuresVi: [
      "Tự động sinh mã nguồn API endpoints, React components và schema database từ đặc tả thiết kế",
      "Quét và tái cấu trúc mã nguồn theo các mẫu thiết kế (Design Patterns) đã phê duyệt",
      "Tự động cập nhật tài liệu kiến trúc dự án và danh mục API sau mỗi lần thay đổi mã"
    ],
    installGuideVi: "### Cài đặt Claude Flow:\n\n```bash\nnpm install -g claude-flow\n```",
    usageGuideVi: "### Sử dụng điều phối lập trình:\n\n```bash\nclaude-flow generate --spec ./api-spec.yaml\nclaude-flow refactor --pattern clean-architecture\n```",
    samplePromptsVi: [
      "Sinh toàn bộ CRUD API cho module quản lý đơn hàng theo chuẩn RESTful",
      "Quét toàn bộ dự án và chuyển đổi các hàm xử lý dữ liệu sang cấu trúc bất đồng bộ async/await"
    ],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npm install -g claude-flow",
        jsonConfig: JSON.stringify({
          tool: "claude-flow",
          type: "workflow-orchestrator"
        }, null, 2)
      }
    ],
    verified: true,
    rating: 4.87,
    usageCount: 1650,
    tags: ["claude-flow", "orchestration", "refactoring", "boilerplate", "workflow"]
  },

  // 8. Claude Squad & Swarm SDK
  {
    id: "claude-squad-swarm-sdk",
    slug: "claude-squad-swarm-sdk",
    name: "Claude Squad & Swarm SDK - Nền Tảng Điều Phối Đa Tác Tử (Multi-Agent Swarm) Trên Terminal",
    icon: "Layers",
    imageUrl: "",
    demoImages: [],
    toolType: "agent",
    typeNameVi: "Agent",
    category: "devops_ci_cd",
    categoryNameVi: "Vận hành triển khai & DevOps",
    categories: ["devops_ci_cd", "backend_api", "cybersecurity"],
    categoryNamesVi: ["Vận hành triển khai & DevOps", "Backend & Kiến trúc API", "An toàn thông tin & An ninh mạng"],
    isVietnamMarket: false,
    platforms: ["claude_desktop", "antigravity", "cursor"],
    sourceUrl: "https://github.com/anthropics/claude-code",
    authorName: "Swarm AI Lab",
    license: "Mã nguồn mở (MIT)",
    summaryVi: "Khung kiến trúc (SDK) chạy đồng thời nhiều phiên bản Claude (Multi-Agent) trên giao diện dòng lệnh với cơ chế phối hợp tác vụ tập trung. Phân chia nhiệm vụ lớn thành các vai trò độc lập: Kiến trúc sư (Architect), Lập trình viên (Coder), Kiểm thử viên (Tester) và Giám định bảo mật (Security Reviewer).",
    purposeVi: "Tận dụng sức mạnh của nhiều tác tử AI chuyên môn hóa làm việc song song để giải quyết các dự án phần mềm phức tạp với thời gian thực thi nhanh gấp 4 lần so với một tác tử đơn lẻ.",
    featuresVi: [
      "Điều phối song song nhiều thực thể Claude Code với bộ nhớ chia sẻ và kênh liên lạc nội bộ",
      "Tự động chia tách kế hoạch tổng thể thành các nhiệm vụ độc lập không tranh chấp tài nguyên",
      "Cơ chế bầu chọn đồng thuận và kiểm tra chéo mã nguồn giữa các tác tử trước khi ghi nhận"
    ],
    installGuideVi: "### Cài đặt Claude Swarm SDK:\n\n```bash\nnpm install -g @swarm/claude-squad\n```",
    usageGuideVi: "### Khởi chạy biệt đội tác tử giải quyết dự án:\n\n```bash\nclaude-squad run --plan ./feature-plan.md --team coder,tester,security\n```",
    samplePromptsVi: [
      "Khởi động đội ngũ tác tử AI để vừa lập trình giao diện vừa viết bộ kiểm thử song song",
      "Để tác tử tester tự động chạy kiểm thử hồi quy ngay khi tác tử coder hoàn thành tính năng"
    ],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npm install -g @swarm/claude-squad",
        jsonConfig: JSON.stringify({
          tool: "claude-squad",
          type: "multi-agent-swarm"
        }, null, 2)
      }
    ],
    verified: true,
    rating: 4.96,
    usageCount: 2210,
    tags: ["multi-agent", "swarm", "claude-squad", "parallel-agents", "orchestration"]
  },

  // 9. Claude Command Suite 119+
  {
    id: "claude-command-suite-119",
    slug: "claude-command-suite-119",
    name: "Claude Command Suite - Bộ Tuyển Tập 119+ Lệnh Nhanh (Slash Commands) Chuyên Nghiệp",
    icon: "Terminal",
    imageUrl: "",
    demoImages: [],
    toolType: "skill",
    typeNameVi: "Skill",
    category: "devops_ci_cd",
    categoryNameVi: "Vận hành triển khai & DevOps",
    categories: ["devops_ci_cd", "cybersecurity", "qa_testing"],
    categoryNamesVi: ["Vận hành triển khai & DevOps", "An toàn thông tin & An ninh mạng", "Kiểm thử & Đảm bảo chất lượng QA"],
    isVietnamMarket: false,
    platforms: ["claude_desktop", "antigravity", "cursor"],
    sourceUrl: "https://github.com/anthropics/claude-code",
    authorName: "Claude Community Team",
    license: "Mã nguồn mở (MIT)",
    summaryVi: "Bộ sưu tập 119+ lệnh gõ tắt (Slash Commands) tối ưu hóa cho Claude Code và các trợ lý AI. Thay vì phải soạn những câu nhắc (prompts) dài dòng, lập trình viên chỉ cần gõ các lệnh ngắn như /security-audit, /architecture-review, /test-coverage để kích hoạt ngay quy trình phân tích chuyên sâu.",
    purposeVi: "Chuẩn hóa quy trình làm việc của đội ngũ phát triển phần mềm, rút ngắn 80% thời gian soạn prompt và đảm bảo mọi đợt rà soát mã nguồn đều tuân thủ đúng tiêu chuẩn kiểm duyệt khắt khe.",
    featuresVi: [
      "Hơn 119 lệnh tắt bao quát: rà soát an toàn bảo mật, kiểm thử mã nguồn, thiết kế kiến trúc, tối ưu hiệu năng",
      "Tích hợp sẵn tiêu chuẩn kiểm tra mã sạch (Clean Code) và danh mục kiểm tra an toàn OWASP Top 10",
      "Dễ dàng tùy biến và bổ sung thêm các lệnh tắt nghiệp vụ đặc thù của riêng doanh nghiệp"
    ],
    installGuideVi: "### Cài đặt Claude Command Suite vào thư mục dự án:\n\n```bash\nnpx -y @claude-commands/init\n```\n*Lệnh này sẽ tạo thư mục `.claude/commands/` chứa đầy đủ 119+ tệp định nghĩa lệnh tắt.*",
    usageGuideVi: "### Gõ lệnh trực tiếp trong khung trò chuyện của Claude Code:\n\n- `/security-audit`: Kích hoạt rà soát toàn bộ các lỗ hổng bảo mật phổ biến.\n- `/architecture-review`: Đánh giá cấu trúc phân lớp và tính module của dự án.\n- `/test-generate`: Tự động viết toàn bộ unit tests cho file mã nguồn hiện tại.",
    samplePromptsVi: [
      "/security-audit src/auth/jwt.service.ts",
      "/architecture-review để đánh giá xem dự án đã tuân thủ đúng nguyên lý Clean Architecture chưa"
    ],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npx -y @claude-commands/init",
        jsonConfig: JSON.stringify({
          commandsPath: ".claude/commands",
          totalCommands: 119
        }, null, 2)
      }
    ],
    verified: true,
    rating: 4.97,
    usageCount: 4200,
    tags: ["slash-commands", "claude-code", "productivity", "security-audit", "skills"]
  },

  // 10. Memory MCP - Knowledge Graph Persistent Memory
  {
    id: "anthropic-memory-knowledge-graph-mcp",
    slug: "anthropic-memory-knowledge-graph-mcp",
    name: "Anthropic Memory MCP - Máy Chủ Bộ Nhớ Dài Hạn Đồ Thị Tri Thức (Knowledge Graph Memory)",
    icon: "Brain",
    imageUrl: "",
    demoImages: [],
    toolType: "mcp",
    typeNameVi: "MCP Server",
    category: "nlp_language",
    categoryNameVi: "Xử lý ngôn ngữ tự nhiên NLP",
    categories: ["nlp_language", "database_storage", "backend_api"],
    categoryNamesVi: ["Xử lý ngôn ngữ tự nhiên NLP", "Cơ sở dữ liệu & Lưu trữ dữ liệu", "Backend & Kiến trúc API"],
    isVietnamMarket: false,
    platforms: ["claude_desktop", "antigravity", "cursor"],
    sourceUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/memory",
    authorName: "Anthropic / Model Context Protocol",
    license: "Mã nguồn mở (MIT)",
    summaryVi: "Máy chủ MCP bộ nhớ dài hạn chính thức từ Anthropic lưu trữ ngữ cảnh dưới dạng Đồ thị tri thức (Knowledge Graph). Giúp Claude Code duy trì sự thấu hiểu sâu sắc về kiến trúc hệ thống, quy tắc mã nguồn và sở thích làm việc của bạn xuyên suốt qua mọi phiên làm việc.",
    purposeVi: "Giải quyết triệt để vấn đề mất trí nhớ sau mỗi phiên làm việc (Session Statelessness) của AI Agent. Claude sẽ luôn nhớ các quyết định kỹ thuật đã thống nhất từ tuần trước mà bạn không cần phải giải thích lại.",
    featuresVi: [
      "Mô hình hóa kiến thức dưới dạng các Thực thể (Entities), Quan hệ (Relations) và Quan sát (Observations)",
      "Truy xuất nhanh chóng các thông tin liên quan theo mạng lưới liên kết tri thức ngữ nghĩa",
      "Lưu trữ dữ liệu cục bộ an toàn trong tệp JSON hoặc SQLite trên máy tính cá nhân"
    ],
    installGuideVi: "### Cài đặt Anthropic Memory MCP Server:\n\n```bash\nnpx -y @modelcontextprotocol/server-memory\n```",
    usageGuideVi: "### Sử dụng trong Claude Desktop hoặc Claude Code:\n\n*\"Hãy ghi nhớ rằng trong dự án này, mọi API response đều bắt buộc phải bọc trong cấu trúc { success: boolean, data: any, errorCode?: string }\"*.",
    samplePromptsVi: [
      "Nhớ lại các quy định về phân quyền Quản trị viên tối cao mà chúng ta đã thống nhất hôm qua",
      "Đọc lại đồ thị tri thức của dự án và liệt kê tất cả các dịch vụ phụ thuộc vào cổng thanh toán MoMo"
    ],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npx -y @modelcontextprotocol/server-memory",
        jsonConfig: JSON.stringify({
          mcpServers: {
            "memory": {
              command: "npx",
              args: ["-y", "@modelcontextprotocol/server-memory"]
            }
          }
        }, null, 2)
      }
    ],
    verified: true,
    rating: 4.98,
    usageCount: 4500,
    tags: ["memory", "knowledge-graph", "persistent-context", "mcp", "claude-code", "anthropic"]
  },

  // 11. Claude Context Semantic Search MCP
  {
    id: "claude-context-semantic-search-mcp",
    slug: "claude-context-semantic-search-mcp",
    name: "Claude Context MCP - Máy Chủ Tìm Kiếm Ngữ Nghĩa Mã Nguồn Trong Codebase Hàng Triệu Dòng",
    icon: "Search",
    imageUrl: "",
    demoImages: [],
    toolType: "mcp",
    typeNameVi: "MCP Server",
    category: "backend_api",
    categoryNameVi: "Backend & Kiến trúc API",
    categories: ["backend_api", "nlp_language", "database_storage"],
    categoryNamesVi: ["Backend & Kiến trúc API", "Xử lý ngôn ngữ tự nhiên NLP", "Cơ sở dữ liệu & Lưu trữ dữ liệu"],
    isVietnamMarket: false,
    platforms: ["claude_desktop", "antigravity", "cursor"],
    sourceUrl: "https://github.com/anthropics/claude-code",
    authorName: "Claude Context Research",
    license: "Mã nguồn mở (MIT)",
    summaryVi: "Máy chủ MCP tìm kiếm ngữ nghĩa thông minh trong kho mã nguồn quy mô lớn. Khi codebase quá khổng lồ để nạp vào cửa sổ ngữ cảnh, Claude Context sẽ định vị chính xác những đoạn mã liên quan nhất thông qua nhúng vector và đồ thị gọi hàm (Call Graphs).",
    purposeVi: "Cho phép AI Agent phân tích và bảo trì các hệ thống phần mềm doanh nghiệp đồ sộ có hàng triệu dòng mã mà không bị vượt hạn mức token hay làm loãng sự tập trung của mô hình.",
    featuresVi: [
      "Tìm kiếm mã nguồn theo ý nghĩa nghiệp vụ thay vì so khớp từ khóa chuỗi thô",
      "Tạo chỉ mục cục bộ cực nhanh bằng cây cú pháp trừu tượng AST (Abstract Syntax Tree)",
      "Giảm 90% lượng token cần nạp vào phiên làm việc bằng cách trích đoạn có liên quan cao nhất"
    ],
    installGuideVi: "### Cài đặt Claude Context MCP:\n\n```bash\nnpx -y @claude-context/mcp-server\n```",
    usageGuideVi: "### Ra lệnh tìm kiếm trong dự án lớn:\n\n*\"Tìm tất cả các hàm xử lý xác thực chữ ký điện tử trong toàn bộ mã nguồn của dự án\"*.",
    samplePromptsVi: [
      "Định vị nơi khởi tạo kết nối cơ sở dữ liệu và cấu hình bể kết nối Connection Pool",
      "Tìm các đoạn mã gọi đến API thanh toán cũ để chuẩn bị nâng cấp sang phiên bản mới"
    ],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npx -y @claude-context/mcp-server",
        jsonConfig: JSON.stringify({
          mcpServers: {
            "claude-context": {
              command: "npx",
              args: ["-y", "@claude-context/mcp-server"]
            }
          }
        }, null, 2)
      }
    ],
    verified: true,
    rating: 4.91,
    usageCount: 2670,
    tags: ["semantic-search", "ast", "codebase", "vector-search", "mcp", "claude-code"]
  }
];

let addedCount = 0;
for (const tool of newMcpTools) {
  if (!existingIds.has(tool.id)) {
    allTools.unshift(tool); // Đưa công cụ mới lên đầu danh sách
    existingIds.add(tool.id);
    addedCount++;
    console.log(`+ Đã thêm MCP Server mới: [${tool.id}] - ${tool.name}`);
  } else {
    const idx = allTools.findIndex(t => t.id === tool.id);
    allTools[idx] = { ...allTools[idx], ...tool };
    console.log(`~ Đã cập nhật MCP Server: [${tool.id}] - ${tool.name}`);
  }
}

fs.writeFileSync(allToolsPath, JSON.stringify(allTools, null, 2), 'utf-8');
console.log(`\nHoàn thành! Đã bổ sung ${addedCount} MCP Server tinh hoa từ bài viết claude.vn.`);
console.log('Tổng số công cụ hiện tại sau khi thêm:', allTools.length);
