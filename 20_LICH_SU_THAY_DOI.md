# 20. Lịch Sử Thay Đổi: Hệ Thống Quản Lý Và Tra Cứu Công Cụ Trí Tuệ Nhân Tạo

---

## 1. Nhật Ký Phiên Bản

### Phiên Bản 1.8.0-MoRongKhungLamViecVaChuanHoaAnhDemoRepo (Ngày 20-10-2026)
- **Loại hình**: Mở rộng khung làm việc (Workspace Expansion), chuẩn hóa ảnh demo theo repo thực tế kèm ghi chú rõ ràng, và mở rộng thêm kho lưu trữ GitHub, GitLab.
- **Nội dung hoàn thành**:
  - **Mở rộng khung làm việc (Workspace Expansion)**:
    - Bổ sung công cụ mở rộng không gian làm việc toàn màn hình (`Full-width Fluid Canvas 100%`) cho phép chuyển đổi linh hoạt giữa giao diện căn giữa tiêu chuẩn và không gian rộng tối đa.
    - Bổ sung nút thu gọn / mở rộng thanh bên trái (Collapsible Left Sidebar) giúp người dùng tối ưu hóa diện tích hiển thị nội dung, tự động dàn trải lưới thẻ từ 3 cột lên 4 hoặc 5 cột.
    - Bổ sung chế độ xem kép: Chế độ Lưới Thẻ trực quan (Grid View) và Chế độ Bảng danh sách chi tiết mở rộng (Detailed Table / List View) hỗ trợ duyệt nhanh hàng ngàn công cụ.
  - **Chuẩn hóa ảnh demo theo nguyên tắc repo gốc**:
    - Đối với các kho lưu trữ không có ảnh demo đính kèm: Để trống hoàn toàn theo đúng yêu cầu, không tự tạo ảnh giả, không dùng ảnh placeholder. Giao diện tự động thích ứng với dải tiêu đề đồ họa công nghệ tinh gọn.
    - Đối với các kho lưu trữ có ảnh demo thật sự trong repo (ảnh chụp màn hình giao diện, ảnh động demo GIF, sơ đồ kiến trúc): Chèn tất cả các ảnh vào khung chi tiết và bổ sung **ghi chú rõ ràng (caption)** cho từng ảnh giải thích chức năng, giao diện hoặc kịch bản minh họa.
  - **Mở rộng dữ liệu GitHub, GitLab và nguồn khác lên 1.930 công cụ**:
    - Bổ sung các repo và tác tử AI hàng đầu: `browser-use/browser-use`, `All-Hands-AI/OpenHands`, `langgenius/dify`, `undertheseanlp/underthesea`, `pbcquoc/vietocr`, `VinAIResearch/PhoBERT`, v.v.
  - **Kiểm thử tự động & Đóng gói**: 100% bài kiểm thử đơn vị tự động PASS, biên dịch TypeScript và đóng gói Vite hoàn tất thành công.

### Phiên Bản 1.7.0-LeftSidebarVaHuongDanSieuChiTiet (Ngày 20-10-2026)
- **Loại hình**: Tái cấu trúc giao diện 2 cột chuyên nghiệp với Left Sidebar cố định và chuẩn hóa hướng dẫn sử dụng/cài đặt siêu chi tiết.
- **Nội dung hoàn thành**:
  - **Tích hợp thành phần Left Sidebar cố định (`src/components/Sidebar.tsx`)**:
    - Bộ lọc phân loại thành phần đa tầng có huy hiệu số lượng công cụ cập nhật theo thời gian thực.
    - Bộ lọc danh mục chuyên môn với tab `🇻🇳 Thị Trường Việt Nam` nổi bật cùng huy hiệu HOT.
    - Bộ lọc môi trường AI (Claude Desktop, Antigravity, Cursor AI).
    - Hỗ trợ giao diện Drawer trượt thông minh cho thiết bị di động/tablet.
  - **Nâng cấp nội dung hướng dẫn cài đặt và sử dụng siêu chi tiết cho 100% công cụ**:
    - Chuẩn hóa cấu trúc 4 bước cài đặt: Chuẩn bị môi trường -> Cài đặt lệnh CLI -> Cấu hình JSON & giải thích biến môi trường -> Khởi động và xác nhận kết nối.
    - Chuẩn hóa kịch bản sử dụng: Ngữ cảnh bài toán thực tế, câu lệnh prompt chi tiết và kết quả trả về dự kiến.
    - Trang bị đầy đủ ảnh chụp màn hình và ảnh demo banner cho từng công cụ.
  - **Bổ sung các dự án AI Việt Nam & Quốc tế mới**:
    - VietOCR, UnderTheSea NLP, Chuyển đổi số tiền thành chữ kế toán, Kiểm tra cấu trúc 12 số CCCD, Tra cứu xử phạt giao thông Nghị định 100, vLLM Inference Engine, Exo Distributed AI, Stanford STORM Research Agent.
  - **Kiểm thử tự động & Build**: 100% pass qua 5 bài test, đóng gói production thành công.

### Phiên Bản 1.6.0-AnhDemoVaQuyTrinhWorkflows (Ngày 20-10-2026)
- **Loại hình**: Tích hợp phân hệ Quy trình tự động hóa (Workflows) và chuẩn hóa ảnh demo (Demo Images) 100% công cụ.
- **Nội dung hoàn thành**:
  - **Bổ sung và chuẩn hóa ảnh demo trực quan cho toàn bộ 1.914 công cụ**:
    - Trích xuất tự động Open Graph banner chất lượng cao cho 1.890+ kho lưu trữ GitHub (`https://opengraph.githubassets.com/1/{owner}/{repo}`).
    - Gán bộ ảnh chụp màn hình nhận diện thương hiệu công nghệ cho các công cụ và API tại Việt Nam.
    - Cập nhật giao diện `ToolCard.tsx`: Tích hợp ảnh banner tỉ lệ 16:9 ở đầu thẻ, nhãn phân loại trong suốt mờ ảo (Glassmorphism), hiệu ứng zoom mượt mà khi di chuột.
    - Cập nhật giao diện `ToolDetailModal.tsx`: Tích hợp ảnh demo lớn, nút xem ảnh gốc toàn màn hình và thư viện ảnh chuyển đổi thumbnail.
  - **Bổ sung Phân hệ Quy trình tự động hóa (AI Workflows)**:
    - n8n Workflow AI Automation (52K sao), Dify LLM Application Workflow (64K sao), Flowise Drag-and-Drop (35K sao), Langflow Canvas Workflow (48K sao), FastGPT Knowledge Workflow (21K sao).
  - **Bổ sung công cụ thương mại điện tử và tài chính Việt Nam**:
    - Shopee Vietnam Open API, TikTok Shop Vietnam Open API, Whisper nhận dạng tiếng Việt 3 miền, Đấu thầu mua sắm công quốc gia, Biểu lãi suất tiết kiệm 35 ngân hàng.
  - **Kiểm thử tự động và đóng gói**: 100% bài kiểm tra unit tests pass, biên dịch đóng gói sản xuất thành công.

### Phiên Bản 1.5.0-MoRongQuyMoToanCauVaVietNam (Ngày 20-10-2026)
- **Loại hình**: Mở rộng quy mô cơ sở dữ liệu lên 1.904 công cụ và 2.899 mẫu cấu hình JSON.
- **Nội dung hoàn thành**:
  - **Tích hợp các công cụ API thị trường Việt Nam (27 mục chuyên biệt)**:
    - Cổng thanh toán mở PayOS VietQR, MoMo Payment Gateway, VNPay Merchant Gateway.
    - Dịch vụ vận chuyển GHTK, Giao hàng siêu tốc Ahamove, ViettelPost & GHN.
    - Quản lý bán hàng đa kênh KiotViet POS, Sapo Omnichannel.
    - Trí tuệ nhân tạo giọng nói và eKYC: Viettel AI Platform, FPT.AI Platform, VinAI PhoBERT.
    - Cơ sở dữ liệu hành chính 63 tỉnh thành Việt Nam, SMS Brandname viễn thông, Tra cứu mã số thuế doanh nghiệp.
    - Ngân hàng mở Vietcombank Open Banking, Tổng đài thông minh Stringee Communication SDK.
    - Cổng Đăng ký doanh nghiệp quốc gia, Bảng giá xăng dầu Petrolimex, Chỉ số chất lượng không khí AQI và thời tiết.
  - **Tích hợp các kho lưu trữ GitHub AI thịnh hành nhất thế giới**:
    - Browser-Use (32K sao), Cline (28.5K sao), Ollama (125K sao), CrewAI (26K sao), RAGFlow (31K sao), Mem0 (27.5K sao), OpenHands (44K sao), uv (48K sao), ComfyUI (62K sao), Microsoft AutoGen (38K sao), DeepSeek-V3 (35K sao), LangGraph (18.5K sao), shadcn/ui (82K sao).
  - **Kiểm thử tự động**: Đạt 100% qua 5 bài kiểm tra quy tắc nghiệp vụ và bảo mật.

### Phiên Bản 1.4.0-ThucThiLenhTrucTiep (Ngày 20-10-2026)
- **Loại hình**: Bổ sung phân hệ Thiết bị đầu cuối cục bộ (Local Terminal Execution) và Cầu nối thực thi lệnh an toàn.
- **Nội dung hoàn thành**:
  - **Cầu nối thực thi lệnh cục bộ (`server/commandBridge.js`)**: Điểm cuối `POST /api/execute-command` truyền luồng dữ liệu thời gian thực (Server-Sent Events) hiển thị kết quả trực tiếp từ tiến trình con của hệ điều hành.
  - **Kiểm soát an toàn bảo mật nghiêm ngặt**: Danh sách trắng tiền tố lệnh (`npx`, `npm`, `node`, `claude`, `git`, `uv`, `python`, `echo`, `dir`, `ls`), chặn hoàn toàn các lệnh nguy hiểm, giới hạn thời gian chạy 120 giây và hỗ trợ hủy tiến trình qua `POST /api/kill-command`.
  - **Giao diện Thiết bị đầu cuối tương tác (`TerminalDrawer.tsx`)**: Cửa sổ terminal hiện đại dưới đáy màn hình, đèn LED chỉ báo trạng thái, hỗ trợ nhập lệnh tùy ý, cuộn tự động và duyệt lịch sử lệnh bằng phím mũi tên Lên/Xuống.
  - **Tích hợp một chạm trên trang chi tiết (`ToolDetailModal.tsx`)**: Bổ sung nút bấm `▶ Chạy lệnh trên máy` bên cạnh nút sao chép, cho phép chạy ngay lệnh cài đặt CLI vào môi trường thật của máy tính.
  - **Nút bật/tắt nhanh trên thanh điều hướng (`Header.tsx`)**: Giúp người dùng có thể mở cửa sổ dòng lệnh bất kỳ lúc nào để thao tác hoặc kiểm tra môi trường.
  - **Kiểm thử tự động**: 5/5 bài kiểm tra unit tests pass 100%, đóng gói bản phát hành thành công.

### Phiên Bản 1.3.0-BanDiaHoaVietNam (Ngày 20-10-2026)
- **Loại hình**: Tách biệt thành phần hoàn chỉnh, bản địa hóa toàn bộ tiếng Việt và bổ sung hệ sinh thái công cụ Việt Nam.
- **Nội dung hoàn thành**:
  - **Tách biệt rạch ròi 7 nhóm thành phần**: Phân định độc lập giữa Skills (891 mục), Templates (14 mục), Agents (422 mục), Commands (288 mục), MCPs (125 mục), Hooks (62 mục), Settings (72 mục).
  - **Bổ sung 10 công cụ Việt Nam chuyên sâu**:
    1. VietQR Banking MCP Server (Tạo mã QR thanh toán chuẩn Napas247, tra cứu ngân hàng Việt Nam).
    2. Zalo OA & ZNS Messenger MCP (Gửi thông báo ZNS, tương tác Zalo Official Account).
    3. VNStock Chứng Khoán & VN-Index MCP (Phân tích chỉ số chứng khoán VN-Index, báo cáo tài chính doanh nghiệp).
    4. Tra Cứu Pháp Luật & Thuế Việt Nam MCP (Văn bản pháp luật, Luật Thuế TNDN/TNCN, Nghị định, Thông tư).
    5. Tỷ Giá Vietcombank & Giá Vàng SJC MCP (Tỷ giá ngoại hối VCB, giá vàng miếng SJC và vàng nhẫn 9999).
    6. ViettelPost & Giao Hàng Nhanh MCP (Tính cước bưu kiện toàn quốc, tra cứu hành trình vận đơn).
    7. PhoBERT & VietAI Kỹ Năng Tiếng Việt NLP (Xử lý ngôn ngữ tự nhiên tiếng Việt, tách từ, nhận dạng thực thể).
    8. Cổng Dịch Vụ Công Quốc Gia Hướng Dẫn Thủ Tục Skill (Thủ tục hành chính công, cấp đổi CCCD, hộ chiếu).
    9. Lịch Vạn Niên & Âm Lịch Việt Nam MCP (Chuyển đổi âm dương lịch, ngày hoàng đạo, tiết khí truyền thống).
    10. Hóa Đơn Điện Tử & Chữ Ký Số Việt Nam MCP (Kiểm tra XML hóa đơn điện tử Tổng Cục Thuế, xác thực Token USB).
  - **Bản địa hóa 100% tiếng Việt**: Quét và chuyển đổi toàn bộ các đoạn diễn giải tiếng Anh thô thành tiếng Việt tự nhiên, chuẩn kỹ thuật trên 1.874 mục.
  - **Cập nhật danh mục 🇻🇳 Thị Trường Việt Nam**: Bổ sung bộ lọc danh mục riêng biệt trên giao diện.
  - **Kiểm thử tự động**: 100% bài kiểm tra quy tắc nghiệp vụ (`tests/business-rules.test.js`) và biên dịch đóng gói (`npm run build`) hoàn thành xuất sắc.

### Phiên Bản 1.1.0-ToanBoDuLieu (Ngày 20-10-2026)
- **Loại hình**: Nâng cấp toàn diện cơ sở dữ liệu và mở rộng quy mô hệ thống (Massive Dataset Expansion).
- **Nội dung hoàn thành**:
  - Tích hợp toàn bộ **1.716 công cụ, kỹ năng tác tử và máy chủ MCP** từ hai nền tảng `phandonggiang.com/ai-templates` và `mcpmarket.com`.
  - Chuẩn hóa **2.709 đoạn mã cấu hình JSON** cho ba môi trường chính: Claude Desktop, Google Antigravity và Cursor AI.
  - Bổ sung bộ lọc tab theo loại hình (*Tất cả, Máy chủ MCP, Kỹ năng tác tử, Tác tử & Lệnh*).
  - Tích hợp hệ thống phân trang thông minh (24 mục/trang) với điều hướng trang tức thì.
  - Vượt qua 100% bài kiểm thử tự động quy tắc nghiệp vụ trên toàn bộ 1.716 công cụ.
  - Biên dịch bản phát hành thành công (`npm run build`).
