import { Collection, GuideArticle } from '../types';

export const INITIAL_COLLECTIONS: Collection[] = [
  {
    id: 'col-50-mcp-servers-claude-code',
    name: 'Top 50+ MCP Server Tinh Hoa Cho Claude Code & AI Agents (2026)',
    description: 'Bộ sưu tập tuyển chọn các máy chủ Model Context Protocol (MCP) hàng đầu năm 2026 được cộng đồng kiểm chứng: từ CSDL, Git, Quản lý chi phí token đến Tự động hóa trình duyệt và Thanh toán.',
    toolIds: [
      'anthropic-memory-knowledge-graph-mcp',
      'sqlite-mcp-database-server',
      'puppeteer-browser-automation-mcp',
      'claude-command-suite-119',
      'claude-context-semantic-search-mcp',
      'vn-mcp-hub-fintech-messaging',
      'morluto-rea-reverse-engineer-anything'
    ],
    isPublic: true,
    createdAt: '2026-10-20',
  },
  {
    id: 'col-lap-trinh-hang-dau',
    name: 'Top Công Cụ Lập Trình & Tác Tử Kỹ Sư AI',
    description: 'Tuyển tập các công cụ lập trình, MCP servers và tác tử tự động hóa phát triển phần mềm được đánh giá cao nhất.',
    toolIds: ['spmtitsolution-openba-kit-57-ai-skills', 'morluto-rea-reverse-engineer-anything', 'github-browser-use-agent', 'github-openhands-agent'],
    isPublic: true,
    createdAt: '2026-10-18',
  },
  {
    id: 'col-he-sinh-thai-viet-nam',
    name: '🇻🇳 Bộ Sưu Tập AI & Dịch Vụ Số Việt Nam',
    description: 'Các giải pháp AI bản địa, cổng thanh toán VietQR, xử lý ngôn ngữ tiếng Việt UnderTheSea và bộ kỹ năng BA chuyên nghiệp.',
    toolIds: ['spmtitsolution-openba-kit-57-ai-skills', 'vn-mcp-hub-fintech-messaging', 'vietqr-generator-napas247-mcp', 'vietnamese-nlp-toolkit-ai-mcp'],
    isPublic: true,
    createdAt: '2026-10-19',
  },
  {
    id: 'col-tu-dong-hoa-quy-trinh',
    name: 'Tự Động Hóa & Workflow Doanh Nghiệp',
    description: 'Các nền tảng điều phối luồng công việc RAG, kết nối cơ sở dữ liệu và tích hợp API mạnh mẽ.',
    toolIds: ['spmtitsolution-openba-kit-57-ai-skills', 'github-dify-workflow-orchestrator', 'browser-use-ai-agent', 'crawl4ai-web-crawler-llm'],
    isPublic: true,
    createdAt: '2026-10-20',
  },
];

export const INITIAL_GUIDES: GuideArticle[] = [
  {
    id: 'guide-00-50-mcp-server-claude-code-2026',
    slug: '50-mcp-server-tot-nhat-cho-claude-code-2026-toi-uu-context-lazy-loading',
    title: 'Chiến Lược Chọn & Tối Ưu 50+ MCP Server Cho Claude Code Năm 2026: Tránh Tràn Context & Kỹ Thuật Lazy Loading',
    summary: 'Phân tích toàn diện 6 nhóm MCP Server thiết yếu cho Claude Code năm 2026, giải quyết nút thắt ngốn 15-20% dung lượng cửa sổ ngữ cảnh và phương pháp khai thác tính năng MCP Tool Search giảm 95% token overhead.',
    category: 'MCP Servers',
    readTime: '9 phút',
    author: 'Kỹ Sư AI HUB (Tham khảo Claude.vn & ClaudeFa.st)',
    updatedAt: '20-10-2026',
    contentVi: `
### 1. Bối cảnh bùng nổ hệ sinh thái MCP Server năm 2026
Năm 2026, giao thức **Model Context Protocol (MCP)** do Anthropic khởi xướng đã trở thành tiêu chuẩn công nghiệp mở cho mọi tác tử trí tuệ nhân tạo (Claude Code, Cursor, Antigravity, Gemini CLI). Từ một công cụ hỗ trợ viết code đơn thuần, Claude Code đã chuyển mình thành một nền tảng tích hợp toàn diện mọi công cụ phát triển phần mềm: từ quản lý mã nguồn Git, cơ sở dữ liệu nội bộ đến điều khiển trình duyệt và cổng thanh toán.

### 2. Thách thức cốt lõi: Nguy cơ cạn kiệt cửa sổ ngữ cảnh (Context Window)
Khi cài đặt quá nhiều MCP Server mà không có chiến lược quản lý:
- Mỗi máy chủ MCP khi nạp sẽ đưa toàn bộ phần mô tả công cụ (*Tool Definitions*) vào bộ nhớ ngữ cảnh của mô hình.
- Việc kích hoạt 5–6 máy chủ MCP cùng lúc có thể ngốn từ **15% đến 20% tổng dung lượng Context Window**, khiến Claude nhanh chóng bị loãng sự chú ý và giảm độ chính xác khi lập trình.

### 3. Đột phá công nghệ: MCP Tool Search & Kỹ thuật Nạp trễ (Lazy Loading)
- Thay vì nạp toàn bộ tham số của hàng chục công cụ vào ngữ cảnh, tính năng **MCP Tool Search** áp dụng cơ chế nạp trễ (*Lazy Loading*):
  1. Chỉ quét siêu dữ liệu ban đầu (~100 tokens).
  2. Đánh giá mức độ liên quan đối với câu lệnh hiện tại của người dùng.
  3. Chỉ tải định nghĩa chi tiết của công cụ cụ thể khi cần thực thi.
- Cơ chế này giúp **giảm tới 95% lượng token tiêu thụ** cho phần công cụ và nâng tỷ lệ giải quyết chính xác bài toán từ **49% lên 74%**.

### 4. 6 Nhóm MCP Server tinh hoa nhất năm 2026
1. **Nhóm 1: Tích hợp IDE & Môi trường Soạn thảo**:
   - Claude Code Chat (VS Code Extension), Cursor IDE, Cline, Neovim.
2. **Nhóm 2: Hạ tầng lập trình cốt lõi**:
   - \`GitHub MCP Server\`: Quản lý PR, Issue, review code trực tiếp từ terminal.
   - \`PostgreSQL & SQLite MCP\`: Truy vấn cơ sở dữ liệu bằng ngôn ngữ tự nhiên tiếng Việt mà không cần viết SQL thủ công.
   - \`File System MCP\` & \`Git MCP\`: Quản lý tệp tin và so sánh lịch sử commit.
3. **Nhóm 3: Kết nối dịch vụ bên ngoài**:
   - \`Slack MCP\`: Tóm tắt trao đổi và ghi nhận quyết định kỹ thuật trong kênh chat.
   - \`Sentry MCP\`: Phân tích tức thời nguyên nhân các lỗi rò rỉ phổ biến nhất tuần.
   - \`Google Drive MCP\`: Tìm kiếm và trích xuất dữ liệu từ bảng tính, tài liệu Docs.
   - \`Brave Search MCP\`: Tra cứu Internet thời gian thực với cam kết bảo mật quyền riêng tư.
4. **Nhóm 4: Tự động hóa trình duyệt & Kiểm thử QA**:
   - \`Puppeteer MCP\`: Tự động hóa kiểm thử web, chụp ảnh màn hình và phát hiện lỗi giao diện.
   - \`Browserbase MCP\`: Vận hành trình duyệt đám mây song song quy mô lớn.
5. **Nhóm 5: Giám sát chi phí & Điều phối tác vụ**:
   - \`CC Usage\` & \`ccflare\`: Giám sát mức tiêu hao token và chi phí API theo thời gian thực.
   - \`Claude Flow\`: Tự động hóa sinh mã khung Boilerplate và tái cấu trúc mã nguồn.
   - \`Claude Squad & Swarm SDK\`: Điều phối biệt đội đa tác tử AI làm việc song song.
6. **Nhóm 6: Công cụ chuyên sâu**:
   - \`Anthropic Memory MCP\`: Bộ nhớ dài hạn dạng đồ thị tri thức (Knowledge Graph).
   - \`Claude Context MCP\`: Tìm kiếm ngữ nghĩa trong kho mã nguồn hàng triệu dòng.
   - \`Claude Command Suite\`: 119+ lệnh tắt (/security-audit, /architecture-review).

### 5. Lộ trình triển khai tối ưu theo 3 giai đoạn
- **Giai đoạn 1 (Tuần 1) - Thiết lập tối thiểu**: Cài đặt 2–3 máy chủ cốt lõi nhất (GitHub MCP + File System MCP + PostgreSQL/SQLite).
- **Giai đoạn 2 (Tuần 2–4) - Mở rộng theo điểm nghẽn**: Chỉ bổ sung thêm máy chủ khi phát hiện điểm nghẽn cụ thể trong quy trình làm việc hàng ngày.
- **Giai đoạn 3 (Tháng 2 trở đi) - Tối ưu hóa**: Bật chế độ MCP Tool Search, thường xuyên sử dụng lệnh \`/mcp\` để kiểm tra và dùng \`/mcp disable <tên_server>\` tạm dừng các máy chủ không sử dụng để bảo toàn tối đa cửa sổ ngữ cảnh.
    `,
  },
  {
    id: 'guide-01-cach-chon-cong-cu-ai',
    slug: 'cach-tim-va-lua-chon-cong-cu-ai-phu-hop',
    title: 'Cách tìm kiếm và lựa chọn công cụ AI phù hợp nhất cho công việc',
    summary: 'Hướng dẫn phương pháp đánh giá chi phí, tính năng, mức độ bảo mật và khả năng tương thích của các công cụ AI trước khi đưa vào quy trình làm việc.',
    category: 'Tổng quan AI',
    readTime: '6 phút',
    author: 'Ban Biên Tập AI HUB VN',
    updatedAt: '20-10-2026',
    contentVi: `
### 1. Xác định bài toán cốt lõi
Trước khi tìm kiếm công cụ, hãy phân tích rõ ràng:
- Công việc của bạn là xử lý văn bản, lập trình, tạo hình ảnh hay phân tích số liệu?
- Bạn cần công cụ hoạt động độc lập (Web App) hay tích hợp trực tiếp vào trình soạn thảo (Extension/IDE)?

### 2. Tiêu chí đánh giá công cụ AI
- **Chất lượng đầu ra**: Độ chính xác đối với ngữ cảnh tiếng Việt và các yêu cầu chuyên ngành.
- **Mô hình giá**: Miễn phí hoàn toàn, gói dùng thử hay gói thuê bao hàng tháng.
- **Bảo mật dữ liệu**: Nhà phát triển có cam kết không sử dụng dữ liệu người dùng để huấn luyện mô hình hay không?
- **Khả năng tích hợp**: Hỗ trợ xuất API, kết nối qua giao thức ngữ cảnh mô hình (MCP).
    `,
  },
  {
    id: 'guide-02-cai-dat-mcp-server',
    slug: 'huong-dan-cai-dat-va-su-dung-mcp-servers',
    title: 'Hướng dẫn cài đặt và sử dụng MCP Servers trên Claude Desktop & Cursor',
    summary: 'Toàn tập về giao thức Model Context Protocol (MCP), cách cấu hình tệp JSON, cấp quyền truy cập tài nguyên máy cục bộ an toàn.',
    category: 'MCP Servers',
    readTime: '8 phút',
    author: 'Kỹ Sư Hệ Thống AI HUB',
    updatedAt: '20-10-2026',
    contentVi: `
### 1. Giao thức Model Context Protocol là gì?
MCP (Model Context Protocol) là tiêu chuẩn mở cho phép các mô hình ngôn ngữ lớn (LLM) kết nối trực tiếp với dữ liệu cục bộ, cơ sở dữ liệu và các API bên ngoài mà không cần viết mã kết nối riêng lẻ.

### 2. Quy trình cài đặt chuẩn 4 bước
- **Bước 1**: Cài đặt môi trường runtime Node.js hoặc Python.
- **Bước 2**: Mở tệp cấu hình \`claude_desktop_config.json\` trong thư mục cấu hình của Claude Desktop.
- **Bước 3**: Thêm định nghĩa máy chủ MCP vào trường \`mcpServers\`.
- **Bước 4**: Khởi động lại ứng dụng và xác nhận biểu tượng chiếc búa (Tools) xuất hiện ở góc dưới khung trò chuyện.
    `,
  },
  {
    id: 'guide-03-agent-skills-quy-trinh',
    slug: 'su-dung-agent-skills-de-toi-uu-hoa-nang-suat',
    title: 'Cách tận dụng Agent Skills để tự động hóa các tác vụ phức tạp',
    summary: 'Phương pháp xây dựng các gói kỹ năng chuyên biệt cho tác tử AI giải quyết công việc theo quy trình chuẩn mực từng bước.',
    category: 'Agent Skills',
    readTime: '7 phút',
    author: 'Đội Ngũ Nghiên Cứu Tác Tử AI',
    updatedAt: '20-10-2026',
    contentVi: `
### 1. Khái niệm Agent Skills
Agent Skill là một bộ quy tắc và chỉ dẫn được thiết kế chuyên sâu giúp AI hiểu được ngữ cảnh đặc thù, tiêu chuẩn kỹ thuật và các bước nghiệm thu của một nhiệm vụ cụ thể.

### 2. Cấu trúc một Skill chuẩn
- **Mục tiêu**: Định nghĩa rõ ràng nhiệm vụ cần hoàn thành.
- **Đầu vào**: Dữ liệu và tham số cần cung cấp.
- **Quy trình thực thi**: Các bước nhỏ tuần tự kèm điều kiện xác minh trước khi chuyển bước.
- **Tiêu chí nghiệm thu**: Kiểm tra chất lượng và đảm bảo an toàn.
    `,
  },
  {
    id: 'guide-04-an-toan-bao-mat-ai',
    slug: 'cac-luu-y-ve-an-toan-va-bao-mat-khi-dung-ai',
    title: 'Các lưu ý sống còn về an toàn dữ liệu và bảo mật khi ứng dụng AI',
    summary: 'Nguyên tắc bảo vệ khóa truy cập (API Key), phân quyền tối thiểu và bảo mật thông tin nội bộ doanh nghiệp khi tích hợp AI.',
    category: 'An toàn bảo mật',
    readTime: '5 phút',
    author: 'Chuyên Gia An Toàn Thông Tin',
    updatedAt: '20-10-2026',
    contentVi: `
### 1. Tuyệt đối không để lộ khóa bí mật (API Keys)
- Không commit file chứa API key lên GitHub công khai.
- Luôn sử dụng biến môi trường \`.env\` và đưa vào \`.gitignore\`.

### 2. Nguyên tắc cấp quyền tối thiểu (Least Privilege)
- Chỉ cấp quyền đọc (Read-only) cho các thư mục hoặc bảng cơ sở dữ liệu cần thiết.
- Thiết lập danh sách trắng (whitelist) cho các lệnh CLI được phép thực thi.
    `,
  },
];
