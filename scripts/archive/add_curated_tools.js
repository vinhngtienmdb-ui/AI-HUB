import fs from 'fs';
import path from 'path';

const allToolsPath = path.resolve('src/data/allTools.json');
const allTools = JSON.parse(fs.readFileSync(allToolsPath, 'utf-8'));

console.log('Tổng số công cụ hiện tại trước khi thêm:', allTools.length);

const existingIds = new Set(allTools.map(t => t.id));

const newTools = [
  // 1. REPO 1: nguyenduchuy27111997-creator/vietnamese-mcp (VN MCP Hub Tổng thể)
  {
    id: "vn-mcp-hub-fintech-messaging",
    slug: "vn-mcp-hub-fintech-messaging",
    name: "VN MCP Hub - Bộ Máy Chủ MCP Thanh Toán & Nhắn Tin Hàng Đầu Việt Nam (MoMo, ZaloPay, VNPAY, Zalo OA)",
    icon: "Layers",
    imageUrl: "https://raw.githubusercontent.com/nguyenduchuy27111997-creator/vietnamese-mcp/main/assets/demo.gif",
    demoImages: [],
    toolType: "mcp",
    typeNameVi: "MCP Server",
    category: "fintech_banking",
    categoryNameVi: "Công nghệ tài chính & Ngân hàng",
    categories: ["fintech_banking", "finance_payment", "customer_support", "e_commerce", "vietnam"],
    categoryNamesVi: [
      "Công nghệ tài chính & Ngân hàng",
      "Tài chính, Ngân hàng & Thanh toán",
      "Chăm sóc khách hàng & Trợ lý ảo CS",
      "Thương mại điện tử & Bán lẻ",
      "Tài nguyên & Giải pháp Việt Nam"
    ],
    isVietnamMarket: true,
    platforms: ["claude_desktop", "antigravity", "cursor"],
    sourceUrl: "https://github.com/nguyenduchuy27111997-creator/vietnamese-mcp",
    authorName: "Nguyễn Đức Huy (nguyenduchuy27111997-creator)",
    license: "Mã nguồn mở (MIT)",
    summaryVi: "Bộ sưu tập máy chủ Model Context Protocol (MCP) đầu tiên dành riêng cho các cổng thanh toán điện tử và nền tảng nhắn tin tại Việt Nam. Cho phép Claude Code, Cursor và AI Agents tương tác trực tiếp với MoMo, ZaloPay, VNPAY, ViettelPay và Zalo Official Account mà không cần viết mã SDK thủ công.",
    purposeVi: "Tích hợp liền mạch hệ sinh thái thanh toán và tương tác khách hàng nội địa Việt Nam vào các trợ lý trí tuệ nhân tạo. AI Agent có thể tự động tạo liên kết thanh toán MoMo/VNPAY/ZaloPay, kiểm tra trạng thái giao dịch ngân hàng, gửi thông báo chăm sóc khách hàng qua Zalo OA và xử lý hoàn tiền một cách tự động, an toàn.",
    featuresVi: [
      "Bao gồm 5 máy chủ MCP chuyên biệt với 18 công cụ API chuẩn hóa sẵn sàng sử dụng",
      "Hỗ trợ chế độ giả lập Sandbox ngoại tuyến giúp kiểm thử an toàn mà không cần thông tin tài khoản thật",
      "Cung cấp cổng API quản lý tập trung trên Cloudflare Workers không cần duy trì máy chủ",
      "Phân phối độc lập qua hệ sinh thái gói npm dưới định danh phạm vi @vn-mcp",
      "Tương thích bản địa với Claude Desktop, Claude Code, Cursor IDE và Antigravity",
      "Cơ chế ký số HMAC thống nhất và chuẩn hóa thông điệp lỗi song ngữ Việt - Anh"
    ],
    installGuideVi: "### Hướng dẫn cài đặt và tích hợp VN MCP Hub:\n\n1. **Cài đặt gói máy chủ MCP thông qua npm**:\n   ```bash\n   npm install -g @vn-mcp/mcp-momo-vn @vn-mcp/mcp-zalopay-vn @vn-mcp/mcp-vnpay @vn-mcp/mcp-zalo-oa\n   ```\n\n2. **Khai báo cấu hình máy chủ MCP** vào tệp `.mcp.json` hoặc cấu hình Claude Desktop:\n   ```json\n   {\n     \"mcpServers\": {\n       \"momo-vn\": {\n         \"command\": \"mcp-momo-vn\",\n         \"env\": {\n           \"MOMO_SANDBOX\": \"true\",\n           \"MOMO_PARTNER_CODE\": \"MOMOBKUN20180529\",\n           \"MOMO_ACCESS_KEY\": \"klm05TvNBzhg7h7j\",\n           \"MOMO_SECRET_KEY\": \"at67qH6mk8w5Y1nAyMoYKMWACiEi2bsa\"\n         }\n       }\n     }\n   }\n   ```\n\n3. **Khởi động lại trợ lý AI** (Claude Code hoặc Claude Desktop) để nhận diện danh mục 18 công cụ thanh toán và nhắn tin Việt Nam.",
    usageGuideVi: "### Hướng dẫn sử dụng VN MCP Hub trong các tác vụ trợ lý AI:\n\nSau khi cấu hình, bạn có thể ra lệnh trực tiếp bằng tiếng Việt tự nhiên cho AI Agent:\n\n- *\"Tạo đơn thanh toán MoMo trị giá 50.000 VNĐ cho đơn hàng đặt hoa tươi #DH-9921\"*\n- *\"Tra cứu trạng thái giao dịch mã MoMo #17382910 xem khách hàng đã chuyển tiền thành công chưa\"*\n- *\"Gửi tin nhắn chăm sóc khách hàng qua Zalo Official Account thông báo lịch hẹn bảo hành máy tính xách tay\"*\n- *\"Tạo đường dẫn thanh toán qua cổng VNPAY kèm mã QR Napas247 cho hợp đồng dịch vụ số 88\"*",
    samplePromptsVi: [
      "Tạo một giao dịch thanh toán MoMo thử nghiệm giá trị 100.000 VNĐ trong môi trường sandbox",
      "Kiểm tra xem đơn hàng ORD-2026-VN trên ZaloPay đã được khách hàng thanh toán hay chưa",
      "Soạn và gửi thông báo lịch giao hàng cho khách hàng qua Zalo OA với mã định danh người dùng"
    ],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop / Claude Code",
        cliCommand: "npm install -g @vn-mcp/mcp-momo-vn",
        jsonConfig: JSON.stringify({
          mcpServers: {
            "momo-vn": {
              command: "mcp-momo-vn",
              env: {
                MOMO_SANDBOX: "true",
                MOMO_PARTNER_CODE: "MOMOBKUN20180529",
                MOMO_ACCESS_KEY: "klm05TvNBzhg7h7j",
                MOMO_SECRET_KEY: "at67qH6mk8w5Y1nAyMoYKMWACiEi2bsa"
              }
            },
            "zalopay-vn": {
              command: "mcp-zalopay-vn",
              env: {
                ZALOPAY_SANDBOX: "true",
                ZALOPAY_APP_ID: "2554",
                ZALOPAY_KEY1: "sdngKKJmqEMzvhQFRvyqTtxvgvfytvED"
              }
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        platformName: "Google Antigravity",
        cliCommand: "agy mcp add momo-vn --command mcp-momo-vn",
        jsonConfig: JSON.stringify({
          mcpServers: {
            "momo-vn": {
              command: "mcp-momo-vn",
              env: {
                MOMO_SANDBOX: "true"
              }
            }
          }
        }, null, 2)
      },
      {
        platform: "cursor",
        platformName: "Cursor IDE",
        cliCommand: "npm install -g @vn-mcp/mcp-vnpay",
        jsonConfig: JSON.stringify({
          mcpServers: {
            "vnpay-vn": {
              command: "mcp-vnpay",
              env: {
                VNPAY_SANDBOX: "true"
              }
            }
          }
        }, null, 2)
      }
    ],
    verified: true,
    rating: 4.9,
    usageCount: 890,
    tags: ["vietnam", "mcp", "momo", "zalopay", "vnpay", "zalo-oa", "fintech", "payment", "viettelpay"]
  },

  // 1.1 VN MCP MoMo Thành phần chi tiết
  {
    id: "vn-mcp-momo-payment",
    slug: "vn-mcp-momo-payment",
    name: "VN MCP MoMo - Máy Chủ MCP Tích Hợp Thanh Toán Ví Điện Tử MoMo Cho AI Agents",
    icon: "Sparkles",
    imageUrl: "",
    demoImages: [],
    toolType: "mcp",
    typeNameVi: "MCP Server",
    category: "fintech_banking",
    categoryNameVi: "Công nghệ tài chính & Ngân hàng",
    categories: ["fintech_banking", "finance_payment", "e_commerce", "vietnam"],
    categoryNamesVi: ["Công nghệ tài chính & Ngân hàng", "Tài chính, Ngân hàng & Thanh toán", "Thương mại điện tử & Bán lẻ", "Tài nguyên & Giải pháp Việt Nam"],
    isVietnamMarket: true,
    platforms: ["claude_desktop", "antigravity", "cursor"],
    sourceUrl: "https://www.npmjs.com/package/@vn-mcp/mcp-momo-vn",
    authorName: "Nguyễn Đức Huy (@vn-mcp)",
    license: "Mã nguồn mở (MIT)",
    summaryVi: "Máy chủ Model Context Protocol chuyên biệt cho cổng thanh toán Ví MoMo. Cung cấp 4 công cụ thiết yếu: khởi tạo giao dịch thanh toán MoMo, tra cứu tình trạng đơn hàng, yêu cầu hoàn tiền và kiểm tra tính hợp lệ của gói tin thông báo thanh toán tức thời IPN.",
    purposeVi: "Cho phép các trợ lý AI bán hàng, nhân viên ảo và hệ sinh thái bot tự động hóa toàn bộ quy trình thu tiền qua Ví MoMo, xác thực biên nhận điện tử và xử lý hoàn trả tiền cho khách hàng một cách minh bạch.",
    featuresVi: [
      "4 công cụ tích hợp sẵn: create_payment, query_payment, refund_payment, validate_ipn",
      "Tương thích cơ chế ký số HMAC SHA256 chính thức theo tài liệu kỹ thuật của MoMo",
      "Chế độ Sandbox hoạt động độc lập không cần đăng ký tài khoản doanh nghiệp thực tế",
      "Hỗ trợ cả môi trường dòng lệnh CLI lẫn chế độ chạy ngầm làm dịch vụ cho AI Editor"
    ],
    installGuideVi: "### Hướng dẫn cài đặt @vn-mcp/mcp-momo-vn:\n\n```bash\nnpm install -g @vn-mcp/mcp-momo-vn\n```\n\nCấu hình trong tệp `.mcp.json` hoặc cấu hình Claude Desktop.",
    usageGuideVi: "### Sử dụng công cụ MoMo trong Claude Code:\n\nYêu cầu trợ lý AI: *\"Hãy tạo một mã thanh toán MoMo cho đơn hàng trị giá 250.000 VNĐ với nội dung 'Thanh toán khóa học lập trình'\"*.",
    samplePromptsVi: [
      "Khởi tạo giao dịch MoMo 50.000đ cho khách hàng Nguyễn Văn A",
      "Tra cứu giao dịch MoMo số tham chiếu MOMO_TEST_12345"
    ],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npm install -g @vn-mcp/mcp-momo-vn",
        jsonConfig: JSON.stringify({
          mcpServers: {
            "momo-vn": {
              command: "mcp-momo-vn",
              env: {
                MOMO_SANDBOX: "true"
              }
            }
          }
        }, null, 2)
      }
    ],
    verified: true,
    rating: 4.9,
    usageCount: 650,
    tags: ["momo", "vietnam", "payment", "mcp", "fintech"]
  },

  // 1.2 VN MCP Zalo OA Thành phần chi tiết
  {
    id: "vn-mcp-zalo-oa-messaging",
    slug: "vn-mcp-zalo-oa-messaging",
    name: "VN MCP Zalo OA - Máy Chủ MCP Tương Tác Zalo Official Account Cho AI Agents",
    icon: "Sparkles",
    imageUrl: "",
    demoImages: [],
    toolType: "mcp",
    typeNameVi: "MCP Server",
    category: "customer_support",
    categoryNameVi: "Chăm sóc khách hàng & Trợ lý ảo CS",
    categories: ["customer_support", "marketing_advertising", "sales_crm", "vietnam"],
    categoryNamesVi: ["Chăm sóc khách hàng & Trợ lý ảo CS", "Tiếp thị số & Quảng cáo", "Bán hàng & Quản lý khách hàng CRM", "Tài nguyên & Giải pháp Việt Nam"],
    isVietnamMarket: true,
    platforms: ["claude_desktop", "antigravity", "cursor"],
    sourceUrl: "https://www.npmjs.com/package/@vn-mcp/mcp-zalo-oa",
    authorName: "Nguyễn Đức Huy (@vn-mcp)",
    license: "Mã nguồn mở (MIT)",
    summaryVi: "Máy chủ Model Context Protocol tương tác với nền tảng Zalo Official Account (OA). Giúp AI Agent tự động gửi tin nhắn chăm sóc khách hàng, tra cứu hồ sơ người quan tâm, liệt kê danh sách người theo dõi và tự động làm mới mã xác thực truy cập Token.",
    purposeVi: "Tự động hóa hoàn toàn kênh giao tiếp khách hàng phổ biến nhất Việt Nam (Zalo), kết nối trợ lý AI chăm sóc khách hàng vào trang Zalo Doanh nghiệp để phản hồi và gửi thông báo cá nhân hóa kịp thời.",
    featuresVi: [
      "Hỗ trợ gửi tin nhắn tư vấn và tin nhắn giao dịch chuẩn quy định Zalo OA",
      "Truy vấn thông tin người dùng và danh sách người quan tâm trang Zalo OA",
      "Tự động quản lý chu kỳ sống của Access Token và Refresh Token",
      "Đóng gói độc lập qua gói npm @vn-mcp/mcp-zalo-oa"
    ],
    installGuideVi: "### Hướng dẫn cài đặt @vn-mcp/mcp-zalo-oa:\n\n```bash\nnpm install -g @vn-mcp/mcp-zalo-oa\n```",
    usageGuideVi: "### Sử dụng trong Claude Code hoặc Antigravity:\n\n*\"Gửi tin nhắn xác nhận đơn hàng thành công đến số điện thoại/Zalo ID của khách hàng thông qua Zalo OA\"*.",
    samplePromptsVi: [
      "Tra cứu danh sách người theo dõi trang Zalo OA của công ty",
      "Gửi tin nhắn chào mừng kèm mã giảm giá cho thành viên mới qua Zalo OA"
    ],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npm install -g @vn-mcp/mcp-zalo-oa",
        jsonConfig: JSON.stringify({
          mcpServers: {
            "zalo-oa": {
              command: "mcp-zalo-oa",
              env: {
                ZALO_OA_APP_ID: "your_app_id",
                ZALO_OA_SECRET_KEY: "your_secret_key"
              }
            }
          }
        }, null, 2)
      }
    ],
    verified: true,
    rating: 4.8,
    usageCount: 540,
    tags: ["zalo", "zalo-oa", "vietnam", "customer-support", "mcp"]
  },

  // 2. REPO 2: morluto/rea (Reverse Engineer Anything)
  {
    id: "morluto-rea-reverse-engineer-anything",
    slug: "morluto-rea-reverse-engineer-anything",
    name: "REA (Reverse Engineer Anything) - Bộ Công Cụ Dịch Ngược Mã Nguồn Và Nhị Phân Cho AI Agents",
    icon: "Terminal",
    imageUrl: "https://raw.githubusercontent.com/morluto/rea/main/docs/assets/rea-hopper-analysis.png",
    demoImages: [],
    toolType: "agent",
    typeNameVi: "Agent",
    category: "cybersecurity",
    categoryNameVi: "An toàn thông tin & An ninh mạng",
    categories: ["cybersecurity", "qa_testing", "backend_api", "devops_ci_cd"],
    categoryNamesVi: [
      "An toàn thông tin & An ninh mạng",
      "Kiểm thử & Đảm bảo chất lượng QA",
      "Backend & Kiến trúc API",
      "Vận hành triển khai & DevOps"
    ],
    isVietnamMarket: false,
    platforms: ["claude_desktop", "antigravity", "cursor"],
    sourceUrl: "https://github.com/morluto/rea",
    authorName: "Renato Losio (morluto)",
    license: "Mã nguồn mở (MIT)",
    summaryVi: "Bộ công cụ Model Context Protocol (MCP) và AI Agent chuyên sâu cho kỹ thuật dịch ngược (Reverse Engineering) toàn diện: từ phân tích hành vi ứng dụng tầng cao xuống tận mức mã máy nhị phân bản địa (Native Binaries). Tích hợp sâu cùng Ghidra, Hopper, IDA Pro và hỗ trợ dịch ngược ứng dụng JavaScript/Electron.",
    purposeVi: "Cho phép các trợ lý AI lập trình kiểm tra trực tiếp mã máy, file thực thi đóng nguồn, gói ứng dụng Electron và các thư viện liên kết động trên máy cục bộ để hiểu rõ cơ chế hoạt động thực tế, trích xuất cấu trúc dữ liệu và tái tạo tính năng mà không cần suy đoán.",
    featuresVi: [
      "Giao diện chuẩn MCP và dòng lệnh CLI mạnh mẽ kết nối trực tiếp vào Claude Code, Cursor, Gemini CLI và Antigravity",
      "Phân tích hoàn toàn cục bộ trên máy trạm cá nhân, không tải tệp nhị phân hoặc mã nguồn lên bất kỳ dịch vụ đám mây nào",
      "Cung cấp bằng chứng thực tế dạng có cấu trúc bao gồm đồ thị quan hệ hàm, chuỗi ký tự, hạn chế và các vùng chưa xác định",
      "Phân tích ứng dụng JavaScript, gói Electron và tệp lưu trữ .asar tĩnh tức thì không cần cài đặt phần mềm bên ngoài phức tạp",
      "Kết nối liên thông với các công cụ dịch ngược chuyên nghiệp hàng đầu thế giới: Ghidra, Hopper Disassembler và IDA Pro",
      "Có sẵn tài liệu hướng dẫn và hỗ trợ ngôn ngữ tiếng Việt chính thức tại trang chủ dự án (rea.tools/vi)"
    ],
    installGuideVi: "### Hướng dẫn cài đặt REA (Reverse Engineer Anything):\n\n1. **Thiết lập tự động cho mọi AI Agent trên máy trạm**:\n   ```bash\n   npx rea-agents setup\n   ```\n   *Lệnh này sẽ tự động phát hiện các cấu hình của Claude Code, Claude Desktop, Cursor và sao lưu trước khi ghi nhận cấu hình REA.*\n\n2. **Phân tích nhanh cấu trúc ứng dụng JavaScript/Electron**:\n   ```bash\n   npx -y rea-agents@latest analyze-javascript-application ./path-to-app --json\n   ```\n\n3. **Cấu hình thủ công vào tệp cấu hình MCP** (`claude_desktop_config.json` hoặc `.mcp.json`):\n   ```json\n   {\n     \"mcpServers\": {\n       \"rea\": {\n         \"command\": \"npx\",\n         \"args\": [\"-y\", \"rea-agents@latest\", \"mcp\"]\n       }\n     }\n   }\n   ```",
    usageGuideVi: "### Hướng dẫn sử dụng REA trong quy trình dịch ngược phần mềm:\n\nKhi REA đã được nạp vào AI Agent, bạn có thể chỉ định phân tích các tệp tin thực thi hoặc ứng dụng:\n\n1. **Phân tích cấu trúc module của ứng dụng Electron**:\n   Ra lệnh cho AI: *\"Hãy phân tích tệp bundle main.js của ứng dụng trong thư mục dist và vẽ đồ thị các API bí mật mà nó gọi đến máy chủ\"*.\n\n2. **Kiểm tra mã nhị phân với Ghidra / Hopper**:\n   Ra lệnh cho AI: *\"Sử dụng công cụ REA để kiểm tra hàm kiểm tra bản quyền mã máy trong file binary libsecurity.dylib và giải thích thuật toán sinh mã xác thực\"*.\n\n3. **Đánh giá an toàn thông tin và lỗ hổng phần mềm**:\n   AI Agent sẽ kết hợp thông tin trích xuất từ REA để xác định các lỗ hổng tràn bộ nhớ đệm, chuỗi mã hóa cứng hoặc thông tin nhạy cảm rò rỉ trong file thực thi.",
    samplePromptsVi: [
      "Sử dụng REA phân tích gói ứng dụng Electron để tìm tất cả các endpoint API nội bộ",
      "Dịch ngược tệp nhị phân native và giải thích luồng thực thi của hàm kiểm tra xác thực",
      "Trích xuất tất cả các chuỗi chuỗi ký tự và bảng biểu tượng hàm từ file binary ứng dụng"
    ],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npx rea-agents setup",
        jsonConfig: JSON.stringify({
          mcpServers: {
            "rea": {
              command: "npx",
              args: ["-y", "rea-agents@latest", "mcp"]
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        platformName: "Google Antigravity",
        cliCommand: "agy mcp add rea --command \"npx -y rea-agents@latest mcp\"",
        jsonConfig: JSON.stringify({
          mcpServers: {
            "rea": {
              command: "npx",
              args: ["-y", "rea-agents@latest", "mcp"]
            }
          }
        }, null, 2)
      },
      {
        platform: "cursor",
        platformName: "Cursor IDE",
        cliCommand: "npx -y rea-agents@latest mcp",
        jsonConfig: JSON.stringify({
          mcpServers: {
            "rea": {
              command: "npx",
              args: ["-y", "rea-agents@latest", "mcp"]
            }
          }
        }, null, 2)
      }
    ],
    verified: true,
    rating: 4.95,
    usageCount: 1420,
    tags: ["reverse-engineering", "binary-analysis", "mcp", "ghidra", "security", "cybersecurity", "electron"]
  },

  // 3. CÔNG CỤ MỚI 3: Browser Use - Tự động hóa trình duyệt web cho AI
  {
    id: "browser-use-ai-agent",
    slug: "browser-use-ai-agent",
    name: "Browser Use - Nền Tảng Điều Khiển Trình Duyệt Web Tự Động Hóa Dành Riêng Cho AI Agents",
    icon: "Globe",
    imageUrl: "",
    demoImages: [],
    toolType: "agent",
    typeNameVi: "Agent",
    category: "qa_testing",
    categoryNameVi: "Kiểm thử & Đảm bảo chất lượng QA",
    categories: ["qa_testing", "frontend_ui", "data_analytics", "devops_ci_cd"],
    categoryNamesVi: ["Kiểm thử & Đảm bảo chất lượng QA", "Giao diện người dùng & Frontend", "Khoa học dữ liệu & Trực quan hóa BI", "Vận hành triển khai & DevOps"],
    isVietnamMarket: false,
    platforms: ["claude_desktop", "antigravity", "cursor"],
    sourceUrl: "https://github.com/browser-use/browser-use",
    authorName: "Browser Use Team",
    license: "Mã nguồn mở (MIT)",
    summaryVi: "Thư viện mã nguồn mở cho phép các mô hình ngôn ngữ lớn (LLM) và AI Agent tương tác trực tiếp với bất kỳ trang web nào thông qua trình duyệt thực tế: nhấp chuột, nhập liệu, trích xuất dữ liệu, giải mã captcha và điều hướng đa tab.",
    purposeVi: "Tự động hóa các tác vụ thao tác trên website phức tạp như đặt vé máy bay, đăng bài trên mạng xã hội, thu thập dữ liệu giá cả từ các sàn thương mại điện tử và kiểm thử luồng người dùng End-to-End.",
    featuresVi: [
      "Hỗ trợ quan sát giao diện web bằng thị giác máy tính và phân tích cây DOM thông minh",
      "Điều hướng đa tab, quản lý cookie và duy trì phiên đăng nhập trình duyệt",
      "Tích hợp hoàn hảo với LangChain, LlamaIndex và các mô hình GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro"
    ],
    installGuideVi: "### Cài đặt Browser Use bằng Python:\n\n```bash\npip install browser-use playwright\nplaywright install\n```",
    usageGuideVi: "### Ví dụ mã Python chạy AI Agent với Browser Use:\n\n```python\nfrom langchain_openai import ChatOpenAI\nfrom browser_use import Agent\nimport asyncio\n\nasync def main():\n    agent = Agent(\n        task=\"Truy cập trang vnexpress.net và tìm 3 tin tức công nghệ mới nhất\",\n        llm=ChatOpenAI(model=\"gpt-4o\"),\n    )\n    result = await agent.run()\n    print(result)\n\nasyncio.run(main())\n```",
    samplePromptsVi: [
      "Mở trình duyệt, truy cập trang thương mại điện tử và so sánh giá iPhone 16",
      "Tự động điền biểu mẫu khảo sát trực tuyến từ file danh sách khách hàng"
    ],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "pip install browser-use",
        jsonConfig: JSON.stringify({
          pythonPackage: "browser-use",
          requirements: ["browser-use", "playwright"]
        }, null, 2)
      }
    ],
    verified: true,
    rating: 4.9,
    usageCount: 2300,
    tags: ["browser-automation", "agent", "playwright", "scraping", "testing"]
  },

  // 4. CÔNG CỤ MỚI 4: Crawl4AI - Công cụ cào dữ liệu web tối ưu hóa cho AI / LLM
  {
    id: "crawl4ai-web-crawler-llm",
    slug: "crawl4ai-web-crawler-llm",
    name: "Crawl4AI - Bộ Trích Xuất & Cào Dữ Liệu Web Mã Nguồn Mở Tối Ưu Cho LLMs",
    icon: "Database",
    imageUrl: "",
    demoImages: [],
    toolType: "skill",
    typeNameVi: "Skill",
    category: "data_engineering",
    categoryNameVi: "Kỹ thuật dữ liệu & Đường ống",
    categories: ["data_engineering", "nlp_language", "data_analytics"],
    categoryNamesVi: ["Kỹ thuật dữ liệu & Đường ống", "Xử lý ngôn ngữ tự nhiên NLP", "Khoa học dữ liệu & Trực quan hóa BI"],
    isVietnamMarket: false,
    platforms: ["claude_desktop", "antigravity", "cursor"],
    sourceUrl: "https://github.com/unclecode/crawl4ai",
    authorName: "unclecode",
    license: "Mã nguồn mở (Apache-2.0)",
    summaryVi: "Trình thu thập dữ liệu web (Web Crawler) bất đồng bộ cực nhanh, chuyển đổi mã nguồn HTML từ các trang web hiện đại thành định dạng Markdown hoặc JSON sạch, loại bỏ hoàn toàn mã rác và tối ưu 100% cho cửa sổ ngữ cảnh LLM.",
    purposeVi: "Chuẩn bị tập dữ liệu huấn luyện và truy xuất ngữ cảnh cho các hệ thống RAG (Retrieval-Augmented Generation), chuyển đổi tài liệu web thành kiến thức có cấu trúc phục vụ AI Agent.",
    featuresVi: [
      "Tốc độ xử lý siêu nhanh với kiến trúc asyncio và hỗ trợ cào dữ liệu song song hàng trăm trang cùng lúc",
      "Tự động trích xuất nội dung chính xác dưới định dạng Markdown chuẩn, loại bỏ quảng cáo và menu thừa",
      "Hỗ trợ thực thi JavaScript, cuộn trang vô tận và chụp ảnh chụp màn hình bài viết"
    ],
    installGuideVi: "### Hướng dẫn cài đặt Crawl4AI:\n\n```bash\npip install -U crawl4ai\ncrawl4ai-setup\n```",
    usageGuideVi: "### Sử dụng Crawl4AI trong Python:\n\n```python\nimport asyncio\nfrom crawl4ai import AsyncWebCrawler\n\nasync def main():\n    async with AsyncWebCrawler(verbose=True) as crawler:\n        result = await crawler.arun(url=\"https://example.com\")\n        print(result.markdown)\n\nasyncio.run(main())\n```",
    samplePromptsVi: [
      "Thu thập toàn bộ tài liệu hướng dẫn API của thư viện và chuyển đổi thành markdown sạch cho RAG",
      "Cào nội dung 50 bài viết tin tức và trích xuất bảng biểu số liệu kinh tế"
    ],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "pip install crawl4ai",
        jsonConfig: JSON.stringify({
          pythonPackage: "crawl4ai"
        }, null, 2)
      }
    ],
    verified: true,
    rating: 4.88,
    usageCount: 1950,
    tags: ["crawler", "rag", "markdown", "llm", "scraping"]
  },

  // 5. CÔNG CỤ MỚI 5: VietQR Generator MCP Server (Thị trường VN)
  {
    id: "vietqr-generator-napas247-mcp",
    slug: "vietqr-generator-napas247-mcp",
    name: "VietQR Napas247 MCP - Máy Chủ Tạo Mã Thanh Toán VietQR Chuẩn Ngân Hàng Cho AI Agents",
    icon: "Sparkles",
    imageUrl: "",
    demoImages: [],
    toolType: "mcp",
    typeNameVi: "MCP Server",
    category: "fintech_banking",
    categoryNameVi: "Công nghệ tài chính & Ngân hàng",
    categories: ["fintech_banking", "finance_payment", "accounting_tax", "vietnam"],
    categoryNamesVi: ["Công nghệ tài chính & Ngân hàng", "Tài chính, Ngân hàng & Thanh toán", "Kế toán & Hóa đơn điện tử", "Tài nguyên & Giải pháp Việt Nam"],
    isVietnamMarket: true,
    platforms: ["claude_desktop", "antigravity", "cursor"],
    sourceUrl: "https://vietqr.net/",
    authorName: "Cộng đồng AI & Fintech Việt Nam",
    license: "Mã nguồn mở (MIT)",
    summaryVi: "Máy chủ Model Context Protocol chuyên biệt để tạo mã QR thanh toán chuẩn liên ngân hàng VietQR (Napas 247). Hỗ trợ tra cứu mã định danh ngân hàng (BIN code), kiểm tra số tài khoản và tạo mã QR động kèm số tiền và nội dung chuyển khoản tự động.",
    purposeVi: "Tích hợp vào các trợ lý hóa đơn, phần mềm kế toán và chatbot bán hàng để tạo tức thời mã QR chuyển khoản ngân hàng không thu phí trung gian cho khách hàng tại Việt Nam.",
    featuresVi: [
      "Hỗ trợ 50+ ngân hàng tại Việt Nam (Vietcombank, Techcombank, MB Bank, ACB, BIDV, VPBank...)",
      "Sinh mã QR động với số tiền và nội dung chuyển khoản chính xác tuyệt đối",
      "Tạo ảnh QR dạng Base64 hoặc URL hiển thị trực tiếp trong cuộc hội thoại của AI"
    ],
    installGuideVi: "### Cài đặt VietQR MCP Server:\n\n```bash\nnpm install -g @vietqr/mcp-server\n```",
    usageGuideVi: "### Khẩu lệnh mẫu trong Claude Desktop:\n\n*\"Hãy tạo mã VietQR thanh toán 1.250.000 VNĐ vào tài khoản Techcombank số 19033888888888 với nội dung 'Thanh toán tiền hosting tháng 10'\"*.",
    samplePromptsVi: [
      "Tạo mã chuyển khoản VietQR cho ngân hàng Vietcombank số tài khoản 0071000123456 số tiền 500.000đ",
      "Liệt kê mã định danh BIN và tên viết tắt của toàn bộ các ngân hàng Việt Nam hỗ trợ VietQR"
    ],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npm install -g @vietqr/mcp-server",
        jsonConfig: JSON.stringify({
          mcpServers: {
            "vietqr": {
              command: "npx",
              args: ["-y", "@vietqr/mcp-server"]
            }
          }
        }, null, 2)
      }
    ],
    verified: true,
    rating: 4.92,
    usageCount: 1120,
    tags: ["vietqr", "napas247", "vietnam", "payment", "banking", "mcp"]
  },

  // 6. CÔNG CỤ MỚI 6: Playwright MCP Server - Tự động hóa kiểm thử E2E và trích xuất dữ liệu
  {
    id: "playwright-browser-mcp-server",
    slug: "playwright-browser-mcp-server",
    name: "Playwright MCP Server - Máy Chủ Điều Khiển Trình Duyệt & Kiểm Thử E2E Toàn Diện",
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
    sourceUrl: "https://github.com/microsoft/playwright",
    authorName: "Microsoft / MCP Community",
    license: "Mã nguồn mở (Apache-2.0)",
    summaryVi: "Máy chủ MCP chuẩn hóa cung cấp khả năng điều khiển trình duyệt Chromium, Firefox, WebKit không đầu (Headless) hoặc có giao diện. Cho phép AI thực hiện chụp ảnh màn hình, kiểm tra lỗi giao diện console và thực thi kịch bản kiểm thử hồi quy.",
    purposeVi: "Hỗ trợ các lập trình viên và chuyên viên kiểm thử tự động hóa việc tái hiện lỗi trên giao diện web, kiểm tra độ tương thích đa trình duyệt và xác nhận các tính năng web hoạt động trơn tru sau mỗi lần thay đổi mã nguồn.",
    featuresVi: [
      "Cung cấp các công cụ: navigate, screenshot, click, fill, evaluate_script, inspect_elements",
      "Ghi lại nhật ký mạng Network và lỗi Console để AI phân tích nguyên nhân gốc",
      "Tương thích sâu với các quy trình CI/CD và hỗ trợ lưu vết video quá trình chạy test"
    ],
    installGuideVi: "### Cài đặt Playwright MCP Server:\n\n```bash\nnpx -y @modelcontextprotocol/server-puppeteer\n```",
    usageGuideVi: "### Khởi động trong cấu hình MCP của Claude hoặc Antigravity:\n\n*\"Mở trang chủ ứng dụng localhost:3000, kiểm tra xem nút 'Đăng nhập' có hiển thị đúng màu và chụp ảnh màn hình lại cho tôi\"*.",
    samplePromptsVi: [
      "Truy cập website của tôi, mở menu di động và kiểm tra xem có phần tử nào bị tràn màn hình không",
      "Tự động điền form đăng ký thành viên mới và báo cáo mã phản hồi của máy chủ"
    ],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npx -y @automata/playwright-mcp",
        jsonConfig: JSON.stringify({
          mcpServers: {
            "playwright": {
              command: "npx",
              args: ["-y", "@automata/playwright-mcp"]
            }
          }
        }, null, 2)
      }
    ],
    verified: true,
    rating: 4.85,
    usageCount: 1670,
    tags: ["playwright", "mcp", "testing", "browser", "qa", "e2e"]
  },

  // 7. CÔNG CỤ MỚI 7: PostgreSQL MCP Server
  {
    id: "postgresql-database-mcp-server",
    slug: "postgresql-database-mcp-server",
    name: "PostgreSQL Database MCP - Máy Chủ Quản Trị & Truy Vấn Cơ Sở Dữ Liệu Quan Hệ Cho AI",
    icon: "Database",
    imageUrl: "",
    demoImages: [],
    toolType: "mcp",
    typeNameVi: "MCP Server",
    category: "database_storage",
    categoryNameVi: "Cơ sở dữ liệu & Lưu trữ dữ liệu",
    categories: ["database_storage", "backend_api", "data_engineering"],
    categoryNamesVi: ["Cơ sở dữ liệu & Lưu trữ dữ liệu", "Backend & Kiến trúc API", "Kỹ thuật dữ liệu & Đường ống"],
    isVietnamMarket: false,
    platforms: ["claude_desktop", "antigravity", "cursor"],
    sourceUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/postgres",
    authorName: "Anthropic / MCP Reference",
    license: "Mã nguồn mở (MIT)",
    summaryVi: "Máy chủ MCP chuẩn chính thức từ tổ chức Model Context Protocol kết nối an toàn với cơ sở dữ liệu PostgreSQL. Cho phép AI Agent tự động đọc lược đồ bảng, phân tích chỉ mục (Indexes) và thực thi các câu lệnh truy vấn dữ liệu SQL tối ưu.",
    purposeVi: "Giúp lập trình viên tra cứu dữ liệu, thiết kế lược đồ bảng cơ sở dữ liệu, tối ưu hóa các câu truy vấn chậm và phân tích dữ liệu nghiệp vụ theo thời gian thực mà không cần rời khỏi màn hình IDE.",
    featuresVi: [
      "Truy vấn schema đầy đủ: danh sách bảng, cột, khóa ngoại, ràng buộc và chỉ mục",
      "Thực thi câu truy vấn SQL an toàn với quyền đọc chỉ định (Read-only mode)",
      "Giải thích kế hoạch thực thi câu lệnh truy vấn (EXPLAIN ANALYZE) để tư vấn tối ưu hiệu năng"
    ],
    installGuideVi: "### Cài đặt PostgreSQL MCP Server:\n\n```bash\nnpx -y @modelcontextprotocol/server-postgres postgresql://user:password@localhost:5432/mydb\n```",
    usageGuideVi: "### Yêu cầu AI Agent kiểm tra cơ sở dữ liệu:\n\n*\"Hãy đọc lược đồ cơ sở dữ liệu của tôi và viết câu lệnh truy vấn tìm top 10 khách hàng có tổng giá trị đơn hàng cao nhất trong tháng này\"*.",
    samplePromptsVi: [
      "Xem cấu trúc bảng users và orders rồi tạo chỉ mục composite thích hợp",
      "Phân tích nguyên nhân câu lệnh SELECT * FROM transactions bị chậm và đề xuất cách tối ưu"
    ],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npx -y @modelcontextprotocol/server-postgres",
        jsonConfig: JSON.stringify({
          mcpServers: {
            "postgres": {
              command: "npx",
              args: [
                "-y",
                "@modelcontextprotocol/server-postgres",
                "postgresql://postgres:password@localhost:5432/aihub_production"
              ]
            }
          }
        }, null, 2)
      }
    ],
    verified: true,
    rating: 4.94,
    usageCount: 3100,
    tags: ["postgres", "database", "sql", "mcp", "backend"]
  },

  // 8. CÔNG CỤ MỚI 8: Vietnamese NLP Toolkit MCP (Thị trường VN)
  {
    id: "vietnamese-nlp-toolkit-ai-mcp",
    slug: "vietnamese-nlp-toolkit-ai-mcp",
    name: "Vietnamese NLP Toolkit - Bộ Công Cụ Xử Lý Ngôn Ngữ Tự Nhiên Tiếng Việt Cho AI Agents",
    icon: "Brain",
    imageUrl: "",
    demoImages: [],
    toolType: "skill",
    typeNameVi: "Skill",
    category: "nlp_language",
    categoryNameVi: "Xử lý ngôn ngữ tự nhiên NLP",
    categories: ["nlp_language", "content_writing", "vietnam"],
    categoryNamesVi: ["Xử lý ngôn ngữ tự nhiên NLP", "Sáng tạo nội dung & Biên tập", "Tài nguyên & Giải pháp Việt Nam"],
    isVietnamMarket: true,
    platforms: ["claude_desktop", "antigravity", "cursor"],
    sourceUrl: "https://github.com/undertheseanlp/underthesea",
    authorName: "Underthesea / AI HUB VN Community",
    license: "Mã nguồn mở (GPL-3.0 / MIT)",
    summaryVi: "Bộ công cụ chuyên sâu về xử lý ngôn ngữ tự nhiên tiếng Việt cho AI Agents: tách từ (Word Segmentation), gắn nhãn từ loại (POS Tagging), nhận dạng thực thể có tên (NER), chuẩn hóa chính tả và phân tích cảm xúc (Sentiment Analysis) văn bản tiếng Việt.",
    purposeVi: "Giải quyết triệt để các thách thức đặc thù của ngôn ngữ tiếng Việt (từ ghép, dấu câu, từ lóng vùng miền) khi đưa vào các đường ống huấn luyện mô hình ngôn ngữ hoặc xây dựng hệ thống chatbot chăm sóc khách hàng tại Việt Nam.",
    featuresVi: [
      "Thuật toán tách từ tiếng Việt đạt độ chính xác cao dựa trên mô hình học sâu và từ điển tiếng Việt chuẩn",
      "Nhận diện thực thể tiếng Việt: tên người, địa danh các tỉnh thành Việt Nam, tổ chức, ngày tháng",
      "Chuẩn hóa dấu thanh tiếng Việt theo chuẩn mới và sửa lỗi gõ sai telex tự động"
    ],
    installGuideVi: "### Cài đặt gói thư viện Python:\n\n```bash\npip install underthesea pyvi\n```",
    usageGuideVi: "### Sử dụng trong Python script hoặc Agent:\n\n```python\nfrom underthesea import word_tokenize, pos_tag, ner\n\nvan_ban = \"Hôm nay tôi đi ăn phở tại phố cổ Hà Nội rất ngon.\"\nprint(\"Tách từ:\", word_tokenize(van_ban))\nprint(\"Thực thể:\", ner(van_ban))\n```",
    samplePromptsVi: [
      "Chuẩn hóa chính tả và đặt dấu thanh tiếng Việt cho đoạn văn bản người dùng nhập sai",
      "Trích xuất tất cả các tên công ty và địa chỉ tại Việt Nam trong tài liệu hợp đồng"
    ],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "pip install underthesea",
        jsonConfig: JSON.stringify({
          pythonPackage: "underthesea",
          skills: ["word_segmentation", "pos_tagging", "ner", "sentiment"]
        }, null, 2)
      }
    ],
    verified: true,
    rating: 4.86,
    usageCount: 880,
    tags: ["nlp", "vietnamese", "underthesea", "ner", "vietnam", "language"]
  }
];

let addedCount = 0;
for (const tool of newTools) {
  if (!existingIds.has(tool.id)) {
    allTools.unshift(tool); // Đưa công cụ mới lên đầu danh sách để người dùng thấy ngay
    existingIds.add(tool.id);
    addedCount++;
    console.log(`+ Đã thêm công cụ: [${tool.id}] - ${tool.name}`);
  } else {
    // Cập nhật công cụ nếu đã có
    const idx = allTools.findIndex(t => t.id === tool.id);
    allTools[idx] = { ...allTools[idx], ...tool };
    console.log(`~ Đã cập nhật công cụ: [${tool.id}] - ${tool.name}`);
  }
}

fs.writeFileSync(allToolsPath, JSON.stringify(allTools, null, 2), 'utf-8');
console.log(`\nHoàn thành! Đã thêm mới ${addedCount} công cụ chất lượng cao.`);
console.log('Tổng số công cụ hiện tại sau khi thêm:', allTools.length);
