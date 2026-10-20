import { Collection, GuideArticle } from '../types';

export const INITIAL_COLLECTIONS: Collection[] = [
  {
    id: 'col-lap-trinh-hang-dau',
    name: 'Top Công Cụ Lập Trình & Tác Tử Kỹ Sư AI',
    description: 'Tuyển tập các công cụ lập trình, MCP servers và tác tử tự động hóa phát triển phần mềm được đánh giá cao nhất.',
    toolIds: ['github-browser-use-agent', 'github-openhands-agent', 'github-vietnam-vietocr-tool'],
    isPublic: true,
    createdAt: '2026-10-18',
  },
  {
    id: 'col-he-sinh-thai-viet-nam',
    name: '🇻🇳 Bộ Sưu Tập AI & Dịch Vụ Số Việt Nam',
    description: 'Các giải pháp AI bản địa, cổng thanh toán VietQR, xử lý ngôn ngữ tiếng Việt UnderTheSea và kết nối hành chính.',
    toolIds: ['github-vietnam-vietocr-tool', 'github-vietnam-underthesea-nlp', 'github-vietnam-phobert-lm', 'github-gitlab-tra-cuu-phat-nguoi-api'],
    isPublic: true,
    createdAt: '2026-10-19',
  },
  {
    id: 'col-tu-dong-hoa-quy-trinh',
    name: 'Tự Động Hóa & Workflow Doanh Nghiệp',
    description: 'Các nền tảng điều phối luồng công việc RAG, kết nối cơ sở dữ liệu và tích hợp API mạnh mẽ.',
    toolIds: ['github-dify-workflow-orchestrator', 'github-browser-use-agent'],
    isPublic: true,
    createdAt: '2026-10-20',
  },
];

export const INITIAL_GUIDES: GuideArticle[] = [
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
