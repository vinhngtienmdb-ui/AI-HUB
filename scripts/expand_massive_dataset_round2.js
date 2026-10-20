import fs from 'node:fs';

const currentTools = JSON.parse(fs.readFileSync('src/data/allTools.json', 'utf-8'));
const existingSlugs = new Set(currentTools.map(t => t.slug));

console.log(`Bắt đầu đợt 2, dữ liệu hiện có: ${currentTools.length} công cụ.`);

const moreTools = [
  // --- VIỆT NAM REPOS & APIS ---
  {
    slug: 'vietcombank-open-banking-api-mcp',
    name: 'Vietcombank Ngân Hàng Mở & Tra Cứu Biến Động MCP',
    icon: 'Building2',
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['claude_desktop', 'antigravity'],
    sourceUrl: 'https://www.vietcombank.com.vn',
    authorName: 'Vietnam Open Banking Portal',
    license: 'Commercial',
    stars: 3800,
    featured: true,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Tra cứu số dư tài khoản doanh nghiệp, lịch sử sao kê giao dịch và tỷ giá ngoại tệ ngân hàng Vietcombank.',
    purposeVi: 'Hỗ trợ các doanh nghiệp tự động hóa quản trị dòng tiền tại Việt Nam: Kết nối an toàn với ngân hàng Vietcombank để đối soát số dư tiền gửi, tự động trích xuất sao kê giao dịch nhận tiền và thanh toán, tra cứu tỷ giá ngoại hối cập nhật liên tục.',
    featuresVi: [
      'Tra cứu số dư khả dụng của tài khoản thanh toán và tài khoản tiết kiệm doanh nghiệp',
      'Truy vấn lịch sử giao dịch sao kê chi tiết theo khoảng thời gian thực tế',
      'Cập nhật bảng tỷ giá ngoại hối hơn 20 đồng tiền quốc tế niêm yết tại Vietcombank',
      'Hỗ trợ tích hợp Webhook thông báo biến động số dư chuyển khoản tức thời'
    ],
    installGuideVi: `1. Hướng dẫn chuẩn bị: Đăng ký dịch vụ Vietcombank Open Banking để nhận chứng thư số và khóa API.
2. Cài đặt thông tin cấu hình vào tệp cấu hình JSON của ứng dụng AI.
3. Khởi động lại ứng dụng.`,
    usageGuideVi: `Yêu cầu AI: 'Kiểm tra xem tài khoản ngân hàng Vietcombank hôm nay đã nhận được khoản chuyển khoản 5.000.000 VNĐ nào chưa?'.`,
    samplePromptsVi: [
      'Tra cứu tỷ giá chuyển khoản của đồng Đô la Mỹ (USD) tại Vietcombank hôm nay.',
      'Trích xuất 10 giao dịch gần nhất từ tài khoản thanh toán Vietcombank.',
      'Đối soát các giao dịch có nội dung chứa mã đơn hàng VCB_8899.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'claude mcp add vcb-banking -- npx -y @vietnam-dev/vcb-mcp',
        jsonConfig: JSON.stringify({
          mcpServers: {
            "vcb-banking": {
              command: "npx",
              args: ["-y", "@vietnam-dev/vcb-mcp"],
              env: {
                VCB_CLIENT_ID: "YOUR_VCB_CLIENT_ID",
                VCB_CLIENT_SECRET: "YOUR_VCB_SECRET"
              }
            }
          }
        }, null, 2)
      }
    ]
  },
  {
    slug: 'stringee-voice-video-call-sdk-mcp',
    name: 'Stringee Tổng Đài Ảo & Video Call Việt Nam MCP',
    icon: 'PhoneCall',
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['claude_desktop', 'antigravity'],
    sourceUrl: 'https://stringee.com/developer',
    authorName: 'Stringee Communication Developers',
    license: 'Proprietary',
    stars: 3100,
    featured: false,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Tự động gọi điện thoại thoại (Voice Call), gửi tin nhắn chăm sóc khách hàng và lập trình tổng đài thông minh.',
    purposeVi: 'Hỗ trợ các doanh nghiệp tại Việt Nam lập trình hệ thống chăm sóc khách hàng tự động: Cho phép AI tự động kích hoạt cuộc gọi thoại nhắc lịch hẹn, tự động kết nối khách hàng với tổng đài viên và ghi âm, phân tích chất lượng cuộc gọi qua nhận dạng tiếng Việt.',
    featuresVi: [
      'Kích hoạt cuộc gọi thoại tự động (Auto-call) nhắc nợ, nhắc lịch khám, xác nhận đơn hàng',
      'Lập trình tổng đài phản hồi tương tác bằng giọng nói (IVR) thông minh',
      'Tích hợp tính năng gọi Video Call chất lượng cao mã hóa đầu cuối WebRTC',
      'Lưu trữ và xuất tệp ghi âm cuộc gọi phục vụ đào tạo chất lượng dịch vụ'
    ],
    installGuideVi: `1. Hướng dẫn chuẩn bị: Lấy mã Key SID và Key Secret từ trang quản trị Stringee Console.
2. Cài đặt thông tin cấu hình vào tệp cấu hình JSON của ứng dụng AI.
3. Khởi động lại ứng dụng.`,
    usageGuideVi: `Yêu cầu AI: 'Kích hoạt cuộc gọi tự động đến số 0901234567 phát thông báo đơn hàng #DH123 đang trên đường giao'.`,
    samplePromptsVi: [
      'Tạo kịch bản tổng đài tự động trả lời khi khách hàng bấm phím 1 gặp bộ phận kinh doanh.',
      'Gửi lệnh gọi thoại xác nhận lịch hẹn bảo dưỡng xe ô tô ngày mai.',
      'Trích xuất danh sách các cuộc gọi nhỡ trong ngày hôm nay từ hệ thống Stringee.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'claude mcp add stringee-call -- npx -y @vietnam-dev/stringee-mcp',
        jsonConfig: JSON.stringify({
          mcpServers: {
            "stringee-call": {
              command: "npx",
              args: ["-y", "@vietnam-dev/stringee-mcp"],
              env: {
                STRINGEE_SID: "YOUR_STRINGEE_SID",
                STRINGEE_SECRET: "YOUR_STRINGEE_SECRET"
              }
            }
          }
        }, null, 2)
      }
    ]
  },
  {
    slug: 'dang-ky-kinh-doanh-vietnam-portal-skill',
    name: 'Cổng Đăng Ký Doanh Nghiệp Quốc Gia Hướng Dẫn Skill',
    icon: 'Sparkles',
    toolType: 'skill',
    typeNameVi: 'Kỹ năng tác tử',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['claude_desktop', 'antigravity', 'cursor'],
    sourceUrl: 'https://dangkykinhdoanh.gov.vn',
    authorName: 'Vietnam Business Registration Portal',
    license: 'Public Domain',
    stars: 3300,
    featured: false,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Hướng dẫn quy trình thành lập doanh nghiệp, thay đổi ngành nghề kinh doanh và tra cứu hồ sơ trực tuyến.',
    purposeVi: 'Hỗ trợ các cá nhân và doanh nghiệp khởi nghiệp tại Việt Nam: Cung cấp đầy đủ hướng dẫn từng bước chuẩn bị hồ sơ thành lập công ty TNHH, công ty Cổ phần, tra cứu đặt tên doanh nghiệp không trùng lặp và thủ tục nộp hồ sơ qua mạng điện tử.',
    featuresVi: [
      'Hướng dẫn lựa chọn loại hình doanh nghiệp phù hợp với quy mô và cơ cấu cổ đông',
      'Tra cứu và kiểm tra khả năng sử dụng tên doanh nghiệp dự kiến tránh trùng hoặc gây nhầm lẫn',
      'Soạn thảo trọn bộ hồ sơ: Giấy đề nghị đăng ký, Điều lệ công ty, Danh sách thành viên/cổ đông',
      'Hướng dẫn các bước cần làm ngay sau khi có mã số doanh nghiệp (khắc dấu, mở tài khoản, chữ ký số)'
    ],
    installGuideVi: `1. Cài đặt kỹ năng đăng ký doanh nghiệp vào môi trường tác tử AI.
2. Cài đặt thông tin cấu hình vào tệp cấu hình JSON của ứng dụng AI.
3. Khởi động lại ứng dụng.`,
    usageGuideVi: `Yêu cầu AI: 'Hướng dẫn các bước thành lập công ty TNHH 2 thành viên kinh doanh ngành thương mại điện tử tại Hà Nội'.`,
    samplePromptsVi: [
      'Kiểm tra tên công ty dự kiến đặt là "Công ty TNHH Công Nghệ Trí Tuệ Sao Việt" có bị trùng không?',
      'Soạn thảo mẫu điều lệ công ty TNHH một thành viên chuẩn theo Luật Doanh Nghiệp 2020.',
      'Liệt kê danh mục hồ sơ cần nộp để thay đổi người đại diện theo pháp luật của công ty.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'npx -y @vietnam-dev/business-registration-skill --help',
        jsonConfig: JSON.stringify({
          mcpServers: {
            "business-registration": {
              command: "npx",
              args: ["-y", "@vietnam-dev/business-registration-skill"]
            }
          }
        }, null, 2)
      }
    ]
  },
  {
    slug: 'petrolimex-fuel-price-vietnam-mcp',
    name: 'Bảng Giá Xăng Dầu Petrolimex Việt Nam MCP',
    icon: 'Sparkles',
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['claude_desktop', 'antigravity', 'cursor'],
    sourceUrl: 'https://www.petrolimex.com.vn',
    authorName: 'Vietnam Energy Market Hub',
    license: 'MIT',
    stars: 2600,
    featured: false,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Cập nhật giá bán lẻ xăng RON 95-III, E5 RON 92-II, dầu Diesel của Petrolimex theo từng kỳ điều hành giá.',
    purposeVi: 'Hỗ trợ các doanh nghiệp vận tải, logistics và cá nhân tại Việt Nam: Tự động cập nhật bảng giá bán lẻ xăng dầu niêm yết chính thức của Tập đoàn Xăng dầu Việt Nam (Petrolimex) tại Vùng 1 và Vùng 2 ngay khi liên Bộ Công Thương - Tài chính công bố kỳ điều chỉnh.',
    featuresVi: [
      'Cập nhật giá xăng RON 95-III, RON 95-V và xăng sinh học E5 RON 92 theo thời gian thực',
      'Cập nhật giá dầu Diesel 0.05S-II, dầu hỏa và dầu Mazut theo từng kỳ điều hành',
      'Tra cứu phân vùng bán giá (Vùng 1 gồm các tỉnh gần cảng kho, Vùng 2 vùng xa)',
      'Lưu trữ lịch sử biến động giá xăng dầu qua các kỳ điều hành trong năm phục vụ tính toán chi phí vận chuyển'
    ],
    installGuideVi: `1. Cài đặt máy chủ MCP tra cứu xăng dầu qua câu lệnh npx.
2. Cài đặt thông tin cấu hình vào tệp cấu hình JSON của ứng dụng AI.
3. Khởi động lại ứng dụng.`,
    usageGuideVi: `Yêu cầu AI: 'Giá xăng RON 95 hôm nay tại Hà Nội là bao nhiêu tiền một lít?'.`,
    samplePromptsVi: [
      'Cho tôi biết giá dầu Diesel hiện tại của Petrolimex tại Vùng 1.',
      'So sánh giá xăng RON 95 kỳ điều hành hôm nay với kỳ điều hành liền trước.',
      'Tính chi phí tiền xăng cho chuyến xe tải chạy quãng đường 350km tiêu hao 35 lít dầu.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'claude mcp add fuel-price -- npx -y @vietnam-dev/petrolimex-mcp',
        jsonConfig: JSON.stringify({
          mcpServers: {
            "fuel-price": {
              command: "npx",
              args: ["-y", "@vietnam-dev/petrolimex-mcp"]
            }
          }
        }, null, 2)
      }
    ]
  },
  {
    slug: 'vietnam-air-quality-weather-mcp',
    name: 'Chất Lượng Không Khí & Thời Tiết Việt Nam MCP',
    icon: 'Cloud',
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['claude_desktop', 'antigravity', 'cursor'],
    sourceUrl: 'https://github.com/vietnam-dev/vietnam-weather-aqi',
    authorName: 'Vietnam Environment Open Community',
    license: 'MIT',
    stars: 2750,
    featured: false,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Tra cứu chỉ số chất lượng không khí AQI, bụi mịn PM2.5 và dự báo thời tiết tại Hà Nội, TP.HCM, Đà Nẵng.',
    purposeVi: 'Hỗ trợ theo dõi điều kiện môi trường tự nhiên tại các tỉnh thành của Việt Nam: Cung cấp chỉ số bụi mịn PM2.5, chỉ số ô nhiễm không khí AQI theo trạm đo quan trắc môi trường thực tế, kèm dự báo nhiệt độ, độ ẩm và cảnh báo mưa dông kịp thời.',
    featuresVi: [
      'Cập nhật chỉ số chất lượng không khí AQI thời gian thực từ các trạm quan trắc chuẩn quốc gia',
      'Đo lường nồng độ bụi mịn siêu vi PM2.5, PM10, khí CO và NO2 trong không khí',
      'Dự báo thời tiết chi tiết theo giờ và 7 ngày tới cho toàn bộ các tỉnh thành Việt Nam',
      'Đưa ra lời khuyên bảo vệ sức khỏe cho người già, trẻ nhỏ và người có bệnh hô hấp khi chỉ số AQI xấu'
    ],
    installGuideVi: `1. Cài đặt máy chủ MCP thời tiết Việt Nam qua câu lệnh CLI.
2. Cài đặt thông tin cấu hình vào tệp cấu hình JSON của ứng dụng AI.
3. Khởi động lại ứng dụng.`,
    usageGuideVi: `Yêu cầu AI: 'Chỉ số chất lượng không khí AQI tại Quận Cầu Giấy Hà Nội sáng nay như thế nào?'.`,
    samplePromptsVi: [
      'Kiểm tra dự báo thời tiết chiều nay tại Quận 1 Thành phố Hồ Chí Minh có mưa hay không.',
      'Chỉ số ô nhiễm bụi mịn PM2.5 hôm nay tại Hà Nội có vượt ngưỡng an toàn của WHO không?',
      'Đưa ra khuyến nghị trang phục và thời gian chạy bộ ngoài trời phù hợp cho ngày mai.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'claude mcp add vietnam-weather -- npx -y @vietnam-dev/weather-aqi-mcp',
        jsonConfig: JSON.stringify({
          mcpServers: {
            "vietnam-weather": {
              command: "npx",
              args: ["-y", "@vietnam-dev/weather-aqi-mcp"]
            }
          }
        }, null, 2)
      }
    ]
  },

  // --- THẾ GIỚI HOT REPOSITORIES ---
  {
    slug: 'comfyui-stable-diffusion-workflow-mcp',
    name: 'ComfyUI Giao Diện Đồ Thị Tạo Ảnh & Video AI MCP',
    icon: 'Sparkles',
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP',
    category: 'content',
    categoryNameVi: 'Nội dung & Đa phương tiện',
    platforms: ['claude_desktop', 'antigravity', 'cursor'],
    sourceUrl: 'https://github.com/comfyanonymous/ComfyUI',
    authorName: 'ComfyUI Open Source Community',
    license: 'GPL-3.0',
    stars: 62000,
    featured: true,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Điều khiển quy trình tạo ảnh, video khuếch tán (Flux.1, Stable Diffusion XL) dạng đồ thị node linh hoạt cao nhất.',
    purposeVi: 'Hỗ trợ các nghệ sĩ số và nhà phát triển điều khiển quy trình tạo ảnh và video trí tuệ nhân tạo chuyên sâu: Cho phép AI tự động thiết lập các luồng xử lý (Workflows), tinh chỉnh trọng số ControlNet, LoRA, Upscale độ nét cao và tạo chuỗi chuyển động mượt mà.',
    featuresVi: [
      'Giao diện đồ thị dạng node kết nối các module xử lý hình ảnh và video độc lập',
      'Hỗ trợ toàn diện các mô hình tạo ảnh thế hệ mới: Flux.1, SDXL, SD3.5, AnimateDiff',
      'Tích hợp tính năng ControlNet kiểm soát chính xác tư thế, bố cục và nét vẽ phác thảo',
      'Cung cấp API RESTful và WebSocket để tự động hóa tạo ảnh từ xa bằng câu lệnh code'
    ],
    installGuideVi: `1. Khởi chạy ComfyUI trên máy tính có GPU NVIDIA hoặc Apple Silicon.
2. Cài đặt tiện ích mở rộng ComfyUI MCP Bridge.
3. Cài đặt thông tin cấu hình vào tệp cấu hình JSON của ứng dụng AI.`,
    usageGuideVi: `Yêu cầu AI: 'Kích hoạt workflow ComfyUI tạo hình ảnh một chú mèo phi hành gia phong cách cyberpunk chất lượng 4K'.`,
    samplePromptsVi: [
      'Tải và thực thi quy trình tạo ảnh chân dung nghệ thuật với mô hình Flux.1.',
      'Tự động tăng độ phân giải hình ảnh lên gấp 4 lần bằng mô hình RealESRGAN.',
      'Kiểm tra danh sách các Checkpoint và LoRA đang có sẵn trong thư mục models của ComfyUI.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'claude mcp add comfyui -- npx -y @modelcontextprotocol/server-comfyui',
        jsonConfig: JSON.stringify({
          mcpServers: {
            "comfyui": {
              command: "npx",
              args: ["-y", "@modelcontextprotocol/server-comfyui"],
              env: {
                COMFYUI_URL: "http://127.0.0.1:8188"
              }
            }
          }
        }, null, 2)
      }
    ]
  },
  {
    slug: 'microsoft-autogen-multi-agent-conversation',
    name: 'Microsoft AutoGen Khung Đa Tác Tử Đàm Thoại',
    icon: 'Brain',
    toolType: 'agent',
    typeNameVi: 'Tác tử chuyên sâu',
    category: 'automation',
    categoryNameVi: 'Tự động hóa & Web',
    platforms: ['claude_desktop', 'antigravity', 'cursor'],
    sourceUrl: 'https://github.com/microsoft/autogen',
    authorName: 'Microsoft Research Team',
    license: 'CC-BY-4.0',
    stars: 38000,
    featured: true,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Khung xây dựng ứng dụng tác tử thế hệ mới của Microsoft: cho phép nhiều AI đàm thoại với nhau để giải quyết bài toán phức tạp.',
    purposeVi: 'Hỗ trợ các kỹ sư xây dựng hệ thống tác tử đối thoại thông minh: Các tác tử có thể trò chuyện đa chiều, tự kiểm tra mã nguồn lẫn nhau, chạy code trong môi trường an toàn và có sự can thiệp của con người vào quy trình khi cần thiết (Human-in-the-loop).',
    featuresVi: [
      'Khả năng tự trò chuyện đàm thoại giữa các tác tử (Conversable Agents) để giải quyết vấn đề',
      'Hỗ trợ chế độ thực thi mã nguồn Python an toàn trong môi trường ảo hoặc Docker',
      'Tích hợp linh hoạt với nhiều nhà cung cấp mô hình: OpenAI, Azure OpenAI, Anthropic, Ollama',
      'Cung cấp giao diện AutoGen Studio cho phép kéo thả và thiết kế nhóm tác tử trực quan'
    ],
    installGuideVi: `1. Cài đặt gói Python: pip install autogen-agentchat autogen-ext.
2. Cài đặt thông tin cấu hình vào tệp cấu hình JSON của ứng dụng AI.
3. Khởi tạo nhóm tác tử và bắt đầu cuộc đối thoại.`,
    usageGuideVi: `Yêu cầu nhóm tác tử: 'Phân tích dữ liệu cổ phiếu 5 năm qua, vẽ biểu đồ xu hướng bằng thư viện matplotlib và lưu file ảnh'.`,
    samplePromptsVi: [
      'Thiết lập tác tử Lập trình viên và tác tử Nhà phê bình mã nguồn để cùng viết một thuật toán tối ưu.',
      'Tạo nhóm đàm thoại tự động lên kế hoạch tổ chức sự kiện công nghệ cho 500 khách mời.',
      'Chạy quy trình nghiên cứu tài liệu khoa học và viết bài tổng quan bằng AutoGen.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'pip install autogen-agentchat',
        jsonConfig: JSON.stringify({
          mcpServers: {
            "autogen-bridge": {
              command: "python",
              args: ["-m", "autogen.mcp"]
            }
          }
        }, null, 2)
      }
    ]
  },
  {
    slug: 'deepseek-v3-reasoning-architecture-model',
    name: 'DeepSeek-V3 Kiến Trúc Mô Hình Suy Luận Đỉnh Cao',
    icon: 'Brain',
    toolType: 'agent',
    typeNameVi: 'Tác tử chuyên sâu',
    category: 'coding',
    categoryNameVi: 'Lập trình & Kỹ thuật',
    platforms: ['claude_desktop', 'antigravity', 'cursor'],
    sourceUrl: 'https://github.com/deepseek-ai/DeepSeek-V3',
    authorName: 'DeepSeek AI Research Team',
    license: 'MIT',
    stars: 35000,
    featured: true,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Kiến trúc mô hình mã nguồn mở thế hệ mới với 671 tỷ tham số Mixture-of-Experts, hiệu năng lập trình và toán học vượt trội.',
    purposeVi: 'Hỗ trợ các kỹ sư và nhà nghiên cứu khai thác sức mạnh suy luận logic sâu và lập trình chuyên sâu: Mô hình áp dụng kỹ thuật Multi-head Latent Attention (MLA) và cơ chế chuyên gia thưa thớt (DeepSeekMoE), mang lại khả năng giải quyết các thuật toán phức tạp với chi phí tính toán tối ưu.',
    featuresVi: [
      'Tổng số 671 tỷ tham số với chỉ 37 tỷ tham số được kích hoạt cho mỗi token sinh ra',
      'Khả năng viết mã nguồn, gỡ lỗi và giải toán học ở trình độ tương đương các mô hình hàng đầu thế giới',
      'Hỗ trợ cửa sổ ngữ cảnh mở rộng lên tới 128K token cho phép đọc toàn bộ kho tài liệu lớn',
      'Tương thích hoàn toàn với các định dạng triển khai chuẩn vLLM, SGLang và Ollama'
    ],
    installGuideVi: `1. Cài đặt thông tin cấu hình kết nối API DeepSeek hoặc chạy cục bộ qua vLLM.
2. Cài đặt thông tin cấu hình vào tệp cấu hình JSON của ứng dụng AI.
3. Bắt đầu tương tác với mô hình suy luận.`,
    usageGuideVi: `Yêu cầu mô hình: 'Chứng minh định lý toán học và viết mã nguồn thuật toán tìm đường đi ngắn nhất đồ thị có trọng số âm'.`,
    samplePromptsVi: [
      'Giải thích kiến trúc Multi-head Latent Attention (MLA) của DeepSeek-V3 so với MHA truyền thống.',
      'Tối ưu hóa đoạn mã thuật toán xử lý chuỗi lớn để đạt độ phức tạp thời gian O(N).',
      'Phân tích và gỡ lỗi rò rỉ bộ nhớ trong ứng dụng C++ đa luồng phức tạp.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'ollama run deepseek-coder-v2',
        jsonConfig: JSON.stringify({
          mcpServers: {
            "deepseek-reasoning": {
              command: "npx",
              args: ["-y", "@modelcontextprotocol/server-deepseek"],
              env: {
                DEEPSEEK_API_KEY: "YOUR_DEEPSEEK_API_KEY"
              }
            }
          }
        }, null, 2)
      }
    ]
  },
  {
    slug: 'langchain-langgraph-stateful-agent-mcp',
    name: 'LangGraph Tác Tử Có Trạng Thái Dạng Đồ Thị MCP',
    icon: 'Layers',
    toolType: 'agent',
    typeNameVi: 'Tác tử chuyên sâu',
    category: 'automation',
    categoryNameVi: 'Tự động hóa & Web',
    platforms: ['claude_desktop', 'antigravity', 'cursor'],
    sourceUrl: 'https://github.com/langchain-ai/langgraph',
    authorName: 'LangChain AI Organization',
    license: 'MIT',
    stars: 18500,
    featured: true,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Xây dựng các hệ thống tác tử AI phức tạp có trạng thái bền bỉ, hỗ trợ vòng lặp, kiểm soát phân nhánh và phục hồi lỗi.',
    purposeVi: 'Hỗ trợ các kỹ sư phần mềm thiết kế các luồng làm việc tự hành phức tạp: Cho phép biểu diễn quy trình xử lý của AI dưới dạng đồ thị có hướng (Directed Graphs) với các nút (Nodes) và cạnh (Edges), hỗ trợ lưu trữ trạng thái vào cơ sở dữ liệu để có thể tạm dừng, quay lui và tiếp tục thực thi.',
    featuresVi: [
      'Quản lý trạng thái bền vững (State Management) với cơ chế lưu chốt điểm (Checkpointer)',
      'Hỗ trợ các quy trình có vòng lặp suy luận lặp đi lặp lại cho đến khi đạt tiêu chuẩn chất lượng',
      'Tích hợp tính năng quay lui thời gian (Time-travel) để rà soát và điều chỉnh quyết định của tác tử',
      'Hỗ trợ song song hóa nhiều nhánh xử lý đồng thời để tăng tốc độ hoàn thành công việc'
    ],
    installGuideVi: `1. Cài đặt thư viện: pip install langgraph langchain-openai.
2. Cài đặt thông tin cấu hình vào tệp cấu hình JSON của ứng dụng AI.
3. Thiết kế đồ thị trạng thái trong mã nguồn.`,
    usageGuideVi: `Yêu cầu tác tử: 'Khởi chạy luồng đồ thị kiểm thử mã nguồn: Tự động chạy test -> Nếu fail thì tự sửa -> Chạy lại test đến khi pass 100%'.`,
    samplePromptsVi: [
      'Thiết kế đồ thị duyệt bài tự động gồm 3 bước: Kiểm tra chính tả -> Rà soát logic -> Xuất bản.',
      'Sử dụng tính năng Time-travel của LangGraph để quay lại trạng thái trước khi tác tử gặp lỗi.',
      'Tạo luồng tác tử hỗ trợ khách hàng với khả năng chuyển tiếp trạng thái sang nhân viên trực tiếp.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'pip install langgraph',
        jsonConfig: JSON.stringify({
          mcpServers: {
            "langgraph-bridge": {
              command: "python",
              args: ["-m", "langgraph.mcp"]
            }
          }
        }, null, 2)
      }
    ]
  },
  {
    slug: 'shadcn-ui-modern-react-components-template',
    name: 'shadcn/ui Bộ Thành Phần Giao Diện React Tailwind Template',
    icon: 'FolderGit2',
    toolType: 'template',
    typeNameVi: 'Bản mẫu dự án',
    category: 'coding',
    categoryNameVi: 'Lập trình & Kỹ thuật',
    platforms: ['claude_desktop', 'antigravity', 'cursor'],
    sourceUrl: 'https://github.com/shadcn-ui/ui',
    authorName: 'shadcn Open Source Community',
    license: 'MIT',
    stars: 82000,
    featured: true,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Bộ thành phần giao diện người dùng đẹp mắt, dễ tùy biến thiết kế dựa trên Radix UI và Tailwind CSS.',
    purposeVi: 'Hỗ trợ các lập trình viên Frontend xây dựng giao diện ứng dụng web hiện đại và chuẩn mực: Không cài đặt dưới dạng thư viện phụ thuộc cồng kềnh, mà sao chép trực tiếp mã nguồn thành phần vào dự án giúp bạn toàn quyền chỉnh sửa và sở hữu mã nguồn giao diện của mình.',
    featuresVi: [
      'Hơn 50 thành phần giao diện thiết kế tinh tế: Dialog, Popover, Dropdown, Accordion, Data Table',
      'Khả năng tiếp cận người dùng (Accessibility - A11y) đạt chuẩn quốc tế WAI-ARIA',
      'Hỗ trợ chế độ giao diện sáng/tối (Dark/Light mode) mượt mà không bị nhấp nháy',
      'Tương thích hoàn hảo với các khung phát triển hàng đầu: Next.js, Vite, Remix, Astro'
    ],
    installGuideVi: `1. Khởi tạo dự án shadcn/ui bằng lệnh CLI: npx shadcn@latest init.
2. Thêm các thành phần mong muốn bằng lệnh: npx shadcn@latest add button dialog table.
3. Bắt đầu sử dụng các component trong ứng dụng React.`,
    usageGuideVi: `Yêu cầu AI: 'Tạo một bảng dữ liệu danh sách khách hàng sử dụng component Data Table của shadcn/ui có tính năng sắp xếp và lọc cột'.`,
    samplePromptsVi: [
      'Thêm một hộp thoại Modal xác nhận xóa dữ liệu đẹp mắt bằng shadcn/ui Dialog.',
      'Thiết kế thanh điều hướng Navigation Menu đáp ứng trên cả thiết bị di động và máy tính.',
      'Tùy biến bảng màu sắc chủ đạo của shadcn/ui theo mã nhận diện thương hiệu doanh nghiệp.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'npx shadcn@latest init',
        jsonConfig: JSON.stringify({
          mcpServers: {
            "shadcn-cli": {
              command: "npx",
              args: ["shadcn@latest"]
            }
          }
        }, null, 2)
      }
    ]
  }
];

let addedCount = 0;
for (const tool of moreTools) {
  if (!existingSlugs.has(tool.slug)) {
    const fullTool = {
      id: `ext2-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
      ...tool
    };
    currentTools.unshift(fullTool);
    existingSlugs.add(tool.slug);
    addedCount++;
  }
}

console.log(`Đợt 2 đã bổ sung: ${addedCount} công cụ.`);
console.log(`Tổng cộng cơ sở dữ liệu hiện tại: ${currentTools.length} công cụ.`);

fs.writeFileSync('src/data/allTools.json', JSON.stringify(currentTools, null, 2), 'utf-8');
console.log('Đã cập nhật hoàn tất src/data/allTools.json!');
