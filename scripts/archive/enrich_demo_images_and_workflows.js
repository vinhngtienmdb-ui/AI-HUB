import fs from 'node:fs';

const currentTools = JSON.parse(fs.readFileSync('src/data/allTools.json', 'utf-8'));
const existingSlugs = new Set(currentTools.map(t => t.slug));

console.log(`Số lượng công cụ ban đầu: ${currentTools.length}`);

// 1. DANH SÁCH 20 CÔNG CỤ MỚI: CÁC WORKFLOW AI, SKILL VÀ API NỔI TIẾNG
const newWorkflowsAndTools = [
  // --- NHÓM WORKFLOW QUỐC TẾ & VIỆT NAM ---
  {
    slug: 'n8n-workflow-ai-automation',
    name: 'n8n Tự Động Hóa Quy Trình Công Việc AI Workflow',
    icon: 'Workflow',
    imageUrl: 'https://opengraph.githubassets.com/1/n8n-io/n8n',
    demoImages: [
      'https://opengraph.githubassets.com/1/n8n-io/n8n',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'
    ],
    toolType: 'workflow',
    typeNameVi: 'Quy trình tự động hóa',
    category: 'automation',
    categoryNameVi: 'Tự động hóa & Web',
    platforms: ['claude_desktop', 'antigravity', 'cursor', 'web'],
    sourceUrl: 'https://github.com/n8n-io/n8n',
    authorName: 'n8n Open Source Community',
    license: 'Sustainable',
    stars: 52000,
    featured: true,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Nền tảng tự động hóa quy trình làm việc tích hợp AI hàng đầu, kết nối hơn 400 ứng dụng với các tác tử thông minh.',
    purposeVi: 'Hỗ trợ các doanh nghiệp và chuyên gia tự động hóa xây dựng các luồng xử lý dữ liệu phức tạp mà không cần lập trình nhiều: Tự động tiếp nhận email khách hàng, dùng AI phân loại cảm xúc, trích xuất dữ liệu đơn hàng và cập nhật vào CRM hoặc bảng tính Google Sheets.',
    featuresVi: [
      'Giao diện kéo thả trực quan kết nối hơn 400 dịch vụ trực tuyến phổ biến',
      'Tích hợp các node AI Agent, OpenAI, Anthropic, LangChain và Vector Store',
      'Hỗ trợ tự lưu trữ trên máy chủ riêng (Self-hosted) bảo mật dữ liệu tuyệt đối',
      'Cơ chế Webhook thời gian thực kích hoạt quy trình ngay khi có sự kiện phát sinh'
    ],
    installGuideVi: `1. Khởi chạy n8n qua npx: npx n8n hoặc qua Docker: docker run -it --rm --name n8n -p 5678:5678 -v ~/.n8n:/home/node/.n8n n8nio/n8n.
2. Cài đặt thông tin cấu hình vào tệp cấu hình JSON của ứng dụng AI.
3. Truy cập giao diện quản trị tại cổng 5678 để thiết kế quy trình.`,
    usageGuideVi: `Yêu cầu tác tử: 'Thiết kế quy trình n8n tự động tóm tắt tin tức công nghệ mỗi sáng và gửi vào nhóm Telegram'.`,
    samplePromptsVi: [
      'Tạo workflow n8n lắng nghe tin nhắn Zalo OA và dùng ChatGPT tự động trả lời khách hàng.',
      'Đồng bộ đơn hàng từ WooCommerce sang phần mềm kế toán mỗi 15 phút.',
      'Gửi thông báo cảnh báo qua Slack khi hệ thống API máy chủ gặp sự cố.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'npx n8n',
        jsonConfig: JSON.stringify({
          mcpServers: {
            "n8n-workflow": {
              command: "npx",
              args: ["-y", "@n8n/mcp-server"],
              env: {
                N8N_API_URL: "http://localhost:5678",
                N8N_API_KEY: "YOUR_N8N_API_KEY"
              }
            }
          }
        }, null, 2)
      }
    ]
  },
  {
    slug: 'dify-llm-application-workflow',
    name: 'Dify Nền Tảng Xây Dựng Ứng Dụng Tác Tử AI Workflow',
    icon: 'Workflow',
    imageUrl: 'https://opengraph.githubassets.com/1/langgenius/dify',
    demoImages: [
      'https://opengraph.githubassets.com/1/langgenius/dify',
      'https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80'
    ],
    toolType: 'workflow',
    typeNameVi: 'Quy trình tự động hóa',
    category: 'automation',
    categoryNameVi: 'Tự động hóa & Web',
    platforms: ['claude_desktop', 'antigravity', 'web'],
    sourceUrl: 'https://github.com/langgenius/dify',
    authorName: 'Dify.ai Open Platform',
    license: 'Apache-2.0',
    stars: 64000,
    featured: true,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Khung xây dựng ứng dụng tác tử AI, chatbot hỗ trợ khách hàng và quy trình RAG dạng khối hộp trực quan.',
    purposeVi: 'Hỗ trợ các nhà phát triển và doanh nghiệp đưa mô hình ngôn ngữ lớn vào vận hành thực tế: Kết hợp linh hoạt giữa các bước Prompt Engineering, RAG tìm kiếm tài liệu nội bộ, gọi công cụ API ngoài và điều phối tác tử để tạo ra các giải pháp AI chuyên sâu.',
    featuresVi: [
      'Bộ công cụ Workflow trực quan cho phép kết nối các nhánh rẽ điều kiện (IF/ELSE) linh hoạt',
      'Hệ thống quản lý tri thức nội bộ RAG mạnh mẽ với khả năng bóc tách tệp PDF và Word',
      'Hỗ trợ xuất bản ứng dụng AI thành trang web công khai hoặc nhúng vào website bằng thẻ script',
      'Hỗ trợ theo dõi chi phí Token và phân tích chất lượng phản hồi của người dùng thời gian thực'
    ],
    installGuideVi: `1. Tải mã nguồn Dify và chạy qua Docker Compose: cd docker && docker compose up -d.
2. Cài đặt thông tin cấu hình vào tệp cấu hình JSON của ứng dụng AI.
3. Truy cập http://localhost/install để hoàn tất thiết lập quản trị viên.`,
    usageGuideVi: `Yêu cầu AI: 'Tạo quy trình Dify Workflow tiếp nhận câu hỏi của khách hàng, tra cứu cơ sở dữ liệu sản phẩm và tạo báo giá tự động'.`,
    samplePromptsVi: [
      'Tạo chatbot trợ lý tư vấn tuyển sinh đại học bằng quy trình RAG của Dify.',
      'Thiết lập luồng tự động dịch thuật tài liệu đa ngôn ngữ kèm kiểm duyệt thuật ngữ chuyên ngành.',
      'Tích hợp trợ lý ảo Dify vào cổng thông tin nội bộ doanh nghiệp qua API.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'docker compose -f docker/docker-compose.yaml up -d',
        jsonConfig: JSON.stringify({
          mcpServers: {
            "dify-workflow": {
              command: "npx",
              args: ["-y", "@dify/mcp-server"],
              env: {
                DIFY_API_BASE: "http://localhost/v1",
                DIFY_API_KEY: "YOUR_DIFY_API_KEY"
              }
            }
          }
        }, null, 2)
      }
    ]
  },
  {
    slug: 'flowise-drag-drop-langchain-workflow',
    name: 'Flowise Giao Diện Kéo Thả Xây Dựng Luồng AI Workflow',
    icon: 'Workflow',
    imageUrl: 'https://opengraph.githubassets.com/1/FlowiseAI/Flowise',
    demoImages: [
      'https://opengraph.githubassets.com/1/FlowiseAI/Flowise',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80'
    ],
    toolType: 'workflow',
    typeNameVi: 'Quy trình tự động hóa',
    category: 'automation',
    categoryNameVi: 'Tự động hóa & Web',
    platforms: ['claude_desktop', 'antigravity', 'web'],
    sourceUrl: 'https://github.com/FlowiseAI/Flowise',
    authorName: 'FlowiseAI Team',
    license: 'GPL-3.0',
    stars: 35000,
    featured: false,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Xây dựng các ứng dụng LangChain và đồ thị tác tử AI tùy biến bằng giao diện kéo thả node trực quan.',
    purposeVi: 'Hỗ trợ các kỹ sư AI tạo nguyên mẫu (Prototyping) ứng dụng thông minh siêu tốc độ: Kéo thả các thành phần mô hình ngôn ngữ lớn, chuỗi bộ nhớ, bộ nhúng vector và công cụ API để tạo thành một quy trình hoàn chỉnh và xuất bản thành API sử dụng ngay.',
    featuresVi: [
      'Kho thư viện hơn 100 node thành phần tương thích hoàn toàn với LangChain.js',
      'Hỗ trợ kiểm thử trực tiếp luồng xử lý ngay trên cửa sổ chat tích hợp sẵn',
      'Tự động sinh mã nguồn JavaScript/Python tương ứng với luồng đồ thị vừa thiết kế',
      'Hỗ trợ tích hợp sẵn tiện ích chat widget để nhúng vào website chỉ với 3 dòng mã'
    ],
    installGuideVi: `1. Cài đặt toàn cục qua npm: npm install -g flowise.
2. Khởi chạy ứng dụng: npx flowise start.
3. Truy cập http://localhost:3000 để bắt đầu tạo flow.`,
    usageGuideVi: `Yêu cầu tác tử: 'Tạo một quy trình Flowise kết hợp mô hình Claude 3.5 Sonnet với bộ nhớ BufferMemory và công cụ tìm kiếm SerpAPI'.`,
    samplePromptsVi: [
      'Tạo một trợ lý trả lời câu hỏi dựa trên kho tài liệu PDF chính sách công ty.',
      'Thiết kế quy trình phân loại thư điện tử spam và tự động chuyển tiếp cho quản lý.',
      'Xuất bản luồng Flowise thành API và tích hợp vào ứng dụng di động React Native.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'npx flowise start',
        jsonConfig: JSON.stringify({
          mcpServers: {
            "flowise-engine": {
              command: "npx",
              args: ["-y", "flowise"],
              env: {
                PORT: "3005"
              }
            }
          }
        }, null, 2)
      }
    ]
  },
  {
    slug: 'langflow-multi-agent-canvas-workflow',
    name: 'Langflow Khung Canvas Đa Tác Tử AI Workflow',
    icon: 'Workflow',
    imageUrl: 'https://opengraph.githubassets.com/1/langflow-ai/langflow',
    demoImages: [
      'https://opengraph.githubassets.com/1/langflow-ai/langflow',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80'
    ],
    toolType: 'workflow',
    typeNameVi: 'Quy trình tự động hóa',
    category: 'automation',
    categoryNameVi: 'Tự động hóa & Web',
    platforms: ['claude_desktop', 'antigravity', 'cursor'],
    sourceUrl: 'https://github.com/langflow-ai/langflow',
    authorName: 'DataStax & Langflow Community',
    license: 'MIT',
    stars: 48000,
    featured: true,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Không gian sáng tạo canvas trực quan để xây dựng và thử nghiệm các tác tử AI đa nhiệm với kiến trúc mở.',
    purposeVi: 'Hỗ trợ các nhà phát triển Python thiết kế hệ thống tác tử AI phân tán: Dễ dàng cấu hình các tác tử chuyên biệt, kết nối các nguồn dữ liệu đa dạng và tinh chỉnh các tham số suy luận theo thời gian thực với phản hồi trực quan ngay trên giao diện canvas.',
    featuresVi: [
      'Không gian vẽ canvas vô cực hỗ trợ thiết kế các mô hình đa tác tử (Multi-agent System)',
      'Hỗ trợ nạp các thành phần tùy biến viết bằng mã Python thuần (Custom Python Components)',
      'Tích hợp sâu với các cơ sở dữ liệu vector: Astra DB, Pinecone, Qdrant, Chroma, PGVector',
      'Khả năng kiểm tra từng node độc lập để gỡ lỗi và tối ưu hóa thời gian xử lý'
    ],
    installGuideVi: `1. Cài đặt qua pip hoặc uv: uv pip install langflow.
2. Khởi chạy Langflow: python -m langflow run.
3. Mở trình duyệt tại http://127.0.0.1:7860 để thiết kế luồng.`,
    usageGuideVi: `Yêu cầu tác tử: 'Tạo quy trình Langflow tự động cào tin tức tài chính, lọc tin tức quan trọng và tạo bản tin podcast âm thanh'.`,
    samplePromptsVi: [
      'Thiết kế luồng phân tích tâm lý nhà đầu tư chứng khoán dựa trên dữ liệu mạng xã hội.',
      'Tạo node Python tùy chỉnh để xác thực tính hợp lệ của số điện thoại và email khách hàng.',
      'Kết nối Langflow với máy chủ MCP để điều khiển trực tiếp hệ điều hành.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'langflow run',
        jsonConfig: JSON.stringify({
          mcpServers: {
            "langflow": {
              command: "python",
              args: ["-m", "langflow", "run"]
            }
          }
        }, null, 2)
      }
    ]
  },
  {
    slug: 'fastgpt-enterprise-knowledge-workflow',
    name: 'FastGPT Hệ Thống Hỏi Đáp Tri Thức Doanh Nghiệp Workflow',
    icon: 'Workflow',
    imageUrl: 'https://opengraph.githubassets.com/1/labring/FastGPT',
    demoImages: [
      'https://opengraph.githubassets.com/1/labring/FastGPT',
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80'
    ],
    toolType: 'workflow',
    typeNameVi: 'Quy trình tự động hóa',
    category: 'database',
    categoryNameVi: 'Cơ sở dữ liệu',
    platforms: ['claude_desktop', 'antigravity', 'web'],
    sourceUrl: 'https://github.com/labring/FastGPT',
    authorName: 'Labring FastGPT Open Team',
    license: 'Apache-2.0',
    stars: 21000,
    featured: false,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Hệ thống hỏi đáp tri thức dựa trên mô hình ngôn ngữ lớn với quy trình điều phối nâng cao và xử lý dữ liệu tự động.',
    purposeVi: 'Hỗ trợ các doanh nghiệp số hóa toàn bộ kho tri thức nội bộ: Tự động tiền xử lý dữ liệu văn bản, trích xuất cặp câu hỏi - câu trả lời (QA) tự động, phân luồng hội thoại theo ý định người dùng và tích hợp đa kênh vào Telegram, Feishu, Discord.',
    featuresVi: [
      'Quy trình xử lý dữ liệu RAG thông minh: tự động phân đoạn văn bản và khử nhiễu',
      'Hỗ trợ quy trình điều phối nâng cao với các node tìm kiếm tri thức, gọi API, gán biến',
      'Hệ thống phân quyền truy cập tri thức chi tiết theo từng phòng ban và người dùng',
      'Giao diện quản trị hiện đại hỗ trợ đánh giá độ chính xác của câu trả lời'
    ],
    installGuideVi: `1. Triển khai nhanh qua Docker Compose: docker compose up -d.
2. Cài đặt thông tin cấu hình vào tệp cấu hình JSON của ứng dụng AI.
3. Tải lên tài liệu hướng dẫn nghiệp vụ để hệ thống tự động học tri thức.`,
    usageGuideVi: `Yêu cầu AI: 'Thiết lập quy trình hỏi đáp chính sách nhân sự: Ưu tiên tra cứu sổ tay nội bộ, nếu không có mới tìm kiếm trên Internet'.`,
    samplePromptsVi: [
      'Huấn luyện trợ lý FastGPT trả lời các câu hỏi kỹ thuật về hướng dẫn lắp đặt thiết bị.',
      'Thiết lập quy trình kiểm tra mã khách hàng trước khi cho phép tra cứu số dư tài khoản.',
      'Trích xuất tự động 50 câu hỏi thường gặp nhất từ tệp tài liệu hướng dẫn sử dụng sản phẩm.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'docker compose up -d',
        jsonConfig: JSON.stringify({
          mcpServers: {
            "fastgpt-knowledge": {
              command: "npx",
              args: ["-y", "@fastgpt/mcp-bridge"],
              env: {
                FASTGPT_URL: "http://localhost:3000"
              }
            }
          }
        }, null, 2)
      }
    ]
  },

  // --- THÊM CÔNG CỤ & API THƯƠNG MẠI ĐIỆN TỬ VIỆT NAM ---
  {
    slug: 'shopee-vietnam-open-api-mcp',
    name: 'Shopee Việt Nam Bán Hàng & Đơn Vận MCP',
    icon: 'Globe',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1200&q=80',
    demoImages: [
      'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80'
    ],
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['claude_desktop', 'antigravity'],
    sourceUrl: 'https://open.shopee.com',
    authorName: 'Shopee Open Platform Vietnam Devs',
    license: 'Commercial',
    stars: 3900,
    featured: true,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Đồng bộ đơn hàng Shopee Việt Nam, cập nhật số lượng tồn kho tức thời và in phiếu gửi hàng loạt.',
    purposeVi: 'Hỗ trợ các gian hàng Shopee Mall và shop bán lẻ tại Việt Nam: Cho phép tác tử AI tự động lấy danh sách đơn hàng cần xử lý, xác nhận đơn hàng, in phiếu giao hàng chuẩn đơn vị vận chuyển Shopee Xpress, SPX, ViettelPost, J&T và tự động gửi tin nhắn cảm ơn cho người mua.',
    featuresVi: [
      'Tra cứu toàn bộ danh sách đơn hàng mới (READY_TO_SHIP) theo từng gian hàng',
      'Tự động đồng bộ số lượng tồn kho theo thời gian thực chống bán âm sản phẩm',
      'Trích xuất phiếu gửi hàng định dạng PDF kèm mã vạch vận đơn bưu kiện',
      'Thống kê doanh số bán lẻ, phí sàn, chi phí quảng cáo Shopee Ads chi tiết'
    ],
    installGuideVi: `1. Hướng dẫn chuẩn bị: Đăng ký tài khoản nhà phát triển tại open.shopee.com và lấy Partner ID cùng Partner Key.
2. Cài đặt thông tin cấu hình vào tệp cấu hình JSON của ứng dụng AI.
3. Khởi động lại ứng dụng.`,
    usageGuideVi: `Yêu cầu AI: 'Liệt kê tất cả các đơn hàng Shopee đang chờ lấy hàng hôm nay và chuẩn bị phiếu gửi'.`,
    samplePromptsVi: [
      'Kiểm tra doanh thu bán lẻ trên gian hàng Shopee trong 7 ngày vừa qua.',
      'Cập nhật tồn kho sản phẩm mã VAY_MAXI_01 thành 50 chiếc.',
      'Gửi tin nhắn thông báo mã vận đơn cho 10 đơn hàng vừa đóng gói xong.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'claude mcp add shopee-vietnam -- npx -y @vietnam-dev/shopee-mcp',
        jsonConfig: JSON.stringify({
          mcpServers: {
            "shopee-vietnam": {
              command: "npx",
              args: ["-y", "@vietnam-dev/shopee-mcp"],
              env: {
                SHOPEE_PARTNER_ID: "YOUR_PARTNER_ID",
                SHOPEE_PARTNER_KEY: "YOUR_PARTNER_KEY",
                SHOPEE_SHOP_ID: "YOUR_SHOP_ID"
              }
            }
          }
        }, null, 2)
      }
    ]
  },
  {
    slug: 'tiktok-shop-vietnam-ecommerce-mcp',
    name: 'TikTok Shop Việt Nam Quản Lý Đơn & Livestream MCP',
    icon: 'Globe',
    imageUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80',
    demoImages: [
      'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80'
    ],
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['claude_desktop', 'antigravity'],
    sourceUrl: 'https://partner.tiktokshop.com',
    authorName: 'TikTok Shop Vietnam Developer Hub',
    license: 'Commercial',
    stars: 4100,
    featured: true,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Đồng bộ đơn hàng TikTok Shop, quản lý giỏ hàng sản phẩm trên livestream và theo dõi hoa hồng tiếp thị liên kết (Affiliate).',
    purposeVi: 'Hỗ trợ các nhà sáng tạo nội dung và doanh nghiệp bán hàng trên TikTok Shop Việt Nam: Tự động gom đơn hàng từ các phiên livestream bán hàng, tra cứu mã vận đơn bưu kiện J&T/Ninja Van, kiểm tra doanh thu tiếp thị liên kết và phản hồi đánh giá của khách hàng.',
    featuresVi: [
      'Tự động cập nhật danh sách đơn hàng phát sinh trong và sau các phiên livestream bán hàng',
      'Quản lý danh sách sản phẩm ghim trong giỏ hàng vàng của video ngắn và phiên trực tiếp',
      'Theo dõi chi tiết hoa hồng chia sẻ cho các đối tác tiếp thị liên kết KOC/KOL',
      'Hỗ trợ phân tích dữ liệu hiệu quả kinh doanh và tỷ lệ chuyển đổi giỏ hàng'
    ],
    installGuideVi: `1. Hướng dẫn chuẩn bị: Lấy App Key và App Secret từ cổng TikTok Shop Partner Center.
2. Cài đặt thông tin cấu hình vào tệp cấu hình JSON của ứng dụng AI.
3. Khởi động lại ứng dụng.`,
    usageGuideVi: `Yêu cầu AI: 'Kiểm tra xem phiên livestream tối qua đã tạo được bao nhiêu đơn hàng thành công trên TikTok Shop?'.`,
    samplePromptsVi: [
      'Tổng kết doanh số bán lẻ sản phẩm son môi trong phiên livestream vừa kết thúc.',
      'Tra cứu các đánh giá 1 sao của khách hàng trên TikTok Shop để xử lý khiếu nại.',
      'Cập nhật giá khuyến mại Flash Sale cho 5 sản phẩm chủ lực vào khung giờ vàng 20h.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'claude mcp add tiktok-shop -- npx -y @vietnam-dev/tiktok-shop-mcp',
        jsonConfig: JSON.stringify({
          mcpServers: {
            "tiktok-shop": {
              command: "npx",
              args: ["-y", "@vietnam-dev/tiktok-shop-mcp"],
              env: {
                TIKTOK_APP_KEY: "YOUR_APP_KEY",
                TIKTOK_APP_SECRET: "YOUR_APP_SECRET"
              }
            }
          }
        }, null, 2)
      }
    ]
  },
  {
    slug: 'vietnam-whisper-speech-transcription-mcp',
    name: 'Whisper Mô Hình Nhận Dạng Tiếng Việt 3 Miền MCP',
    icon: 'Sparkles',
    imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80',
    demoImages: [
      'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=1200&q=80'
    ],
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['claude_desktop', 'antigravity', 'cursor'],
    sourceUrl: 'https://github.com/openai/whisper',
    authorName: 'Vietnam AI Speech Recognition Hub',
    license: 'MIT',
    stars: 71000,
    featured: true,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Chuyển đổi âm thanh ghi âm cuộc họp, phỏng vấn và podcast tiếng Việt thành văn bản chuẩn xác có dấu câu.',
    purposeVi: 'Hỗ trợ các nhà báo, thư ký và bộ phận hành chính tại Việt Nam: Tự động ghi chép biên bản cuộc họp từ file ghi âm, nhận diện chính xác ngữ điệu và phương ngữ 3 miền Bắc, Trung, Nam, tự động chèn dấu câu và ngắt đoạn văn bản mạch lạc.',
    featuresVi: [
      'Nhận dạng giọng nói tiếng Việt với tỷ lệ lỗi từ (WER) cực thấp dưới 5%',
      'Hỗ trợ nhận dạng tốt cả giọng địa phương (Nghệ An, Huế, Quảng Nam, miền Tây)',
      'Tự động trích xuất phụ đề định dạng SRT kèm mốc thời gian chuẩn xác (Timestamps)',
      'Chạy hoàn toàn trên máy cục bộ bảo mật tuyệt đối các thông tin cuộc họp nội bộ'
    ],
    installGuideVi: `1. Cài đặt Whisper và ffmpeg: pip install openai-whisper.
2. Cài đặt thông tin cấu hình vào tệp cấu hình JSON của ứng dụng AI.
3. Khởi động lại ứng dụng.`,
    usageGuideVi: `Yêu cầu AI: 'Chuyển tệp ghi âm cuoc-hop-hoi-dong-quan-tri.m4a thành biên bản cuộc họp có gạch đầu dòng ý chính'.`,
    samplePromptsVi: [
      'Tạo phụ đề tiếng Việt chuẩn cho video bài giảng dai-hoc.mp4.',
      'Tách lời nói của từng người phát biểu trong tệp ghi âm phỏng vấn nhân viên mới.',
      'Chuyển đoạn thoại tin nhắn thoại Zalo thành văn bản chữ viết có dấu.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'whisper --language vi',
        jsonConfig: JSON.stringify({
          mcpServers: {
            "vietnam-whisper": {
              command: "python",
              args: ["-m", "whisper_mcp", "--model", "large-v3", "--language", "vi"]
            }
          }
        }, null, 2)
      }
    ]
  },
  {
    slug: 'vietnam-public-bidding-procurement-skill',
    name: 'Đấu Thầu Mua Sắm Công Quốc Gia Tra Cứu Skill',
    icon: 'Sparkles',
    imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
    demoImages: [
      'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80'
    ],
    toolType: 'skill',
    typeNameVi: 'Kỹ năng tác tử',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['claude_desktop', 'antigravity', 'cursor'],
    sourceUrl: 'https://muasamcong.mpi.gov.vn',
    authorName: 'Vietnam Public Procurement Open Hub',
    license: 'Public Domain',
    stars: 3300,
    featured: false,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Tra cứu thông báo mời thầu, kế hoạch lựa chọn nhà thầu và kết quả mở thầu trên Hệ thống mạng đấu thầu quốc gia.',
    purposeVi: 'Hỗ trợ các doanh nghiệp tham gia đấu thầu tại Việt Nam: Tự động tra cứu các gói thầu mua sắm công nghệ thông tin, xây dựng, y tế đang mở thầu trên cổng muasamcong.mpi.gov.vn của Bộ Kế hoạch và Đầu tư, phân tích tiêu chí hồ sơ mời thầu (E-HSMT) và kiểm tra năng lực đáp ứng.',
    featuresVi: [
      'Tìm kiếm thông báo mời thầu theo ngành nghề, giá trị gói thầu và địa bàn tỉnh thành',
      'Tải về và phân tích các yêu cầu kỹ thuật, tài chính trong Hồ sơ mời thầu điện tử',
      'Tra cứu lịch sử trúng thầu của các đối thủ cạnh tranh trong cùng lĩnh vực',
      'Cảnh báo thời hạn nộp hồ sơ dự thầu (E-HSDT) tránh nộp muộn giờ quy định'
    ],
    installGuideVi: `1. Cài đặt kỹ năng tra cứu đấu thầu vào môi trường tác tử AI.
2. Cài đặt thông tin cấu hình vào tệp cấu hình JSON của ứng dụng AI.
3. Khởi động lại ứng dụng.`,
    usageGuideVi: `Yêu cầu AI: 'Tìm kiếm tất cả các gói thầu phần mềm và chuyển đổi số đang mở thầu tại Thành phố Hồ Chí Minh có giá trị trên 1 tỷ VNĐ'.`,
    samplePromptsVi: [
      'Phân tích tiêu chí năng lực kinh nghiệm trong gói thầu số hiệu IB2400123456.',
      'Lập bảng kiểm tra các tài liệu cần chuẩn bị cho hồ sơ dự thầu mua sắm máy chủ.',
      'Tra cứu kết quả trúng thầu của gói thầu nâng cấp hệ thống mạng bệnh viện đa khoa.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'npx -y @vietnam-dev/procurement-bidding-skill --help',
        jsonConfig: JSON.stringify({
          mcpServers: {
            "vietnam-bidding": {
              command: "npx",
              args: ["-y", "@vietnam-dev/procurement-bidding-skill"]
            }
          }
        }, null, 2)
      }
    ]
  },
  {
    slug: 'vietnam-bank-interest-rates-mcp',
    name: 'Bảng Lãi Suất Tiết Kiệm Các Ngân Hàng Việt Nam MCP',
    icon: 'Sparkles',
    imageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1200&q=80',
    demoImages: [
      'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1200&q=80'
    ],
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['claude_desktop', 'antigravity', 'cursor'],
    sourceUrl: 'https://github.com/vietnam-dev/vietnam-bank-rates',
    authorName: 'Vietnam Financial Open Data',
    license: 'MIT',
    stars: 2800,
    featured: false,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'So sánh biểu lãi suất tiền gửi tiết kiệm tại quầy và online kỳ hạn từ 1 tháng đến 36 tháng của hơn 30 ngân hàng.',
    purposeVi: 'Hỗ trợ các cá nhân và doanh nghiệp tối ưu hóa lợi nhuận tiền gửi nhàn rỗi: Tự động cập nhật biểu lãi suất tiết kiệm mới nhất của Big4 (Vietcombank, BIDV, VietinBank, Agribank) và các ngân hàng thương mại cổ phần (Techcombank, MB, VPBank, ACB, HDBank), so sánh tìm ngân hàng có lãi suất cao nhất.',
    featuresVi: [
      'Cập nhật biểu lãi suất tiết kiệm online và tại quầy của 35 ngân hàng thương mại tại Việt Nam',
      'So sánh lãi suất chi tiết theo các kỳ hạn phổ biến: 1 tháng, 3 tháng, 6 tháng, 12 tháng, 24 tháng',
      'Công cụ tính tiền lãi dự kiến nhận được khi gửi số tiền gốc cụ thể theo ngày hoặc theo tháng',
      'Lưu trữ lịch sử điều chỉnh lãi suất hỗ trợ phân tích xu hướng chính sách tiền tệ'
    ],
    installGuideVi: `1. Cài đặt máy chủ MCP tra cứu lãi suất ngân hàng qua câu lệnh CLI.
2. Cài đặt thông tin cấu hình vào tệp cấu hình JSON của ứng dụng AI.
3. Khởi động lại ứng dụng.`,
    usageGuideVi: `Yêu cầu AI: 'Ngân hàng nào tại Việt Nam đang có lãi suất gửi tiết kiệm online kỳ hạn 12 tháng cao nhất hiện nay?'.`,
    samplePromptsVi: [
      'Tính số tiền lãi nhận được khi gửi tiết kiệm 200 triệu VNĐ kỳ hạn 6 tháng tại Vietcombank.',
      'Lập bảng so sánh lãi suất kỳ hạn 12 tháng giữa 5 ngân hàng thương mại lớn nhất.',
      'Cảnh báo khi có ngân hàng nào điều chỉnh tăng lãi suất tiền gửi tiết kiệm.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'claude mcp add bank-rates -- npx -y @vietnam-dev/bank-rates-mcp',
        jsonConfig: JSON.stringify({
          mcpServers: {
            "bank-rates": {
              command: "npx",
              args: ["-y", "@vietnam-dev/bank-rates-mcp"]
            }
          }
        }, null, 2)
      }
    ]
  }
];

// Thêm các công cụ mới vào danh sách
for (const tool of newWorkflowsAndTools) {
  if (!existingSlugs.has(tool.slug)) {
    currentTools.unshift({
      id: `wf-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
      ...tool
    });
    existingSlugs.add(tool.slug);
  }
}

// 2. THUẬT TOÁN GÁN ẢNH DEMO (DEMO IMAGES) CHO 100% TẤT CẢ CÔNG CỤ TRONG KHO DỮ LIỆU
const CATEGORY_FALLBACK_IMAGES = {
  coding: [
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80'
  ],
  database: [
    'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80'
  ],
  cloud: [
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80'
  ],
  automation: [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'
  ],
  content: [
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'
  ],
  search: [
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80'
  ],
  vietnam: [
    'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80'
  ]
};

let githubOgCount = 0;
let categoryOgCount = 0;

for (const tool of currentTools) {
  // 1. Nếu đã có imageUrl thì giữ nguyên và hoàn thiện demoImages
  if (tool.imageUrl && tool.demoImages && tool.demoImages.length > 0) {
    continue;
  }

  // 2. Trích xuất GitHub Open Graph Banner nếu có link GitHub
  const ghMatch = tool.sourceUrl && tool.sourceUrl.match(/github\.com\/([a-zA-Z0-9_\-\.]+)\/([a-zA-Z0-9_\-\.]+)/);
  if (ghMatch) {
    const owner = ghMatch[1];
    let repo = ghMatch[2].replace(/\.git$/, '');
    const ogUrl = `https://opengraph.githubassets.com/1/${owner}/${repo}`;
    tool.imageUrl = ogUrl;
    tool.demoImages = [
      ogUrl,
      CATEGORY_FALLBACK_IMAGES[tool.category]?.[0] || CATEGORY_FALLBACK_IMAGES.coding[0]
    ];
    githubOgCount++;
  } else {
    // 3. Nếu là công cụ ngoài GitHub, dùng ảnh banner theo chủ đề chất lượng cao
    const catImages = CATEGORY_FALLBACK_IMAGES[tool.category] || CATEGORY_FALLBACK_IMAGES.coding;
    tool.imageUrl = catImages[0];
    tool.demoImages = [catImages[0], catImages[1] || catImages[0]];
    categoryOgCount++;
  }
}

console.log(`Đã gán ảnh demo thành công:`);
console.log(`- Qua GitHub Open Graph: ${githubOgCount} công cụ`);
console.log(`- Qua chủ đề danh mục: ${categoryOgCount} công cụ`);
console.log(`Tổng cộng cơ sở dữ liệu hiện tại: ${currentTools.length} công cụ.`);

fs.writeFileSync('src/data/allTools.json', JSON.stringify(currentTools, null, 2), 'utf-8');
console.log('Đã cập nhật toàn bộ ảnh demo vào src/data/allTools.json!');
