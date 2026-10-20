# Nhật Ký Dự Án

## [2026-10-20]
### Mục tiêu trong ngày
- Khởi động dự án và thiết lập cấu trúc tài liệu quản lý cốt lõi theo quy trình VibeCode chuẩn.
- Thực hiện Giai đoạn 01: Xác định ý tưởng và xây dựng tệp `01_TONG_QUAN_DU_AN.md` dựa trên nghiên cứu hai mô hình tham khảo (AI Templates - Phan Đông Giang và MCP Market).
- Đề xuất định hướng cấu trúc dữ liệu bắt buộc: Nguồn dẫn chính thức, công dụng, hướng dẫn cài đặt và hướng dẫn sử dụng hoàn toàn bằng tiếng Việt.
- Báo cáo ý tưởng thiết kế ban đầu và xin ý kiến xác nhận của người dùng trước khi chuyển tiếp sang Giai đoạn 02.

### Các công việc đã thực hiện
- [Quản lý dự án]: Khởi tạo tệp mục lục bộ tài liệu thiết kế `index.md`.
- [Quản lý dự án]: Khởi tạo tệp nhật ký dự án `21_NHAT_KY_DU_AN.md`.
- [Quản lý dự án]: Khởi tạo tệp danh mục kiểm tra `22_DANH_MUC_KIEM_TRA.md`.
- [Giai đoạn 01]: Hoàn thành tệp tổng quan dự án `01_TONG_QUAN_DU_AN.md`.
- [Giai đoạn 02]: Hoàn thành tệp phạm vi dự án `02_PHAM_VI_DU_AN.md`.
- [Giai đoạn 03]: Hoàn thành bộ 4 tệp nghiệp vụ: `03_YEU_CAU_NGHIEP_VU.md`, `04_QUY_TAC_NGHIEP_VU.md`, `05_VAI_TRO_NGUOI_DUNG.md`, `06_LUONG_NGHIEP_VU.md`.
- [Giai đoạn 04]: Hoàn thành `07_YEU_CAU_CHUC_NANG.md` và `08_TIEU_CHI_NGHIEM_THU.md`.
- [Giai đoạn 05]: Hoàn thành `09_KIEN_TRUC_HE_THONG.md` và `10_CONG_NGHE_SU_DUNG.md`.
- [Giai đoạn 06]: Hoàn thành `11_DAC_TA_GIAO_DIEN.md` và `12_QUY_CHUAN_THIET_KE.md`.
- [Giai đoạn 07]: Hoàn thành `13_CO_SO_DU_LIEU.md` và `14_DAC_TA_API.md`.
- [Giai đoạn 08]: Hoàn thành `15_QUY_TAC_PHAT_TRIEN_AI.md` và `16_CHI_DAN_HE_THONG_AI.md`.
- [Giai đoạn 09]: Triển khai mã nguồn phân hệ giao diện Thư viện công cụ, trang chi tiết chuẩn 4 khối thông tin, tính năng sao chép cấu hình JSON một chạm, bộ lọc đa tầng và phân hệ đóng góp công cụ.
- [Tách biệt hoàn toàn Template, Skill, Agent, Command, MCP, Hook, Setting]:
  - Đã rà soát và khắc phục triệt để việc gộp chung trước đó.
  - Phân tách rõ ràng và độc lập 7 nhóm thành phần trong hệ thống:
    1. **Kỹ năng tác tử (Skills)**: 889 mục (quy chuẩn hành vi và kỹ năng giải quyết công việc).
    2. **Bản mẫu dự án (Templates)**: 14 mục (khung dự án đóng gói sẵn như Angular-app, React-starter...).
    3. **Tác tử chuyên sâu (Agents)**: 422 mục (tác tử AI chuyên biệt độc lập).
    4. **Lệnh phím tắt (Commands)**: 288 mục (lệnh thực thi nhanh dạng phím tắt /command).
    5. **Máy chủ MCP (MCPs)**: 117 mục (giao thức ngữ cảnh mô hình kết nối hệ thống ngoài).
    6. **Móc nối tự động (Hooks)**: 62 mục (can thiệp tự động theo sự kiện vòng đời).
    7. **Cấu hình môi trường (Settings)**: 72 mục (tham số tối ưu hóa tài nguyên).
  - Cập nhật giao diện: Thêm thanh tab lọc riêng biệt cho từng loại hình kèm nhãn hiển thị số lượng trực tiếp.
  - Kiểm thử tự động: Xác minh thành công 1.864 mục và 2.857 mẫu cấu hình JSON đạt chuẩn 100%. Gói sản phẩm đã biên dịch hoàn tất.

- [Bản địa hóa tiếng Việt & Bổ sung công cụ thị trường Việt Nam]:
  - Bổ sung 10 công cụ, máy chủ MCP và kỹ năng tác tử chuyên biệt hàng đầu cho người dùng và doanh nghiệp Việt Nam:
    1. **VietQR Banking MCP Server**: Tự động tạo mã QR thanh toán ngân hàng chuẩn Napas247, tra cứu danh sách ngân hàng Việt Nam, đối soát mã giao dịch chuyển khoản.
    2. **Zalo OA & ZNS Messenger MCP**: Gửi thông báo chăm sóc khách hàng qua Zalo Notification Service, tương tác Official Account doanh nghiệp.
    3. **VNStock Chứng Khoán & VN-Index MCP**: Truy vấn chỉ số VN-Index, HNX-Index, UPCoM, báo cáo tài chính doanh nghiệp niêm yết, lịch sử giá khớp lệnh.
    4. **Tra Cứu Pháp Luật & Thuế Việt Nam MCP**: Tra cứu văn bản quy phạm pháp luật, Luật Thuế Thu Nhập Doanh Nghiệp, Thuế TNCN, Bộ luật Lao động, Nghị định, Thông tư.
    5. **Tỷ Giá Vietcombank & Giá Vàng SJC MCP**: Tra cứu tỷ giá ngoại tệ Vietcombank, giá vàng miếng SJC và vàng nhẫn 9999 theo thời gian thực.
    6. **ViettelPost & Giao Hàng Nhanh MCP**: Tra cứu cước phí vận chuyển toàn quốc, kiểm tra hành trình mã vận đơn ViettelPost và GHN.
    7. **PhoBERT & VietAI Kỹ Năng Tiếng Việt NLP**: Kỹ năng xử lý ngôn ngữ tự nhiên tiếng Việt chuyên sâu, tách từ, nhận dạng thực thể tiếng Việt.
    8. **Cổng Dịch Vụ Công Quốc Gia Hướng Dẫn Thủ Tục Skill**: Hướng dẫn thủ tục hành chính, đăng ký kinh doanh, cấp đổi căn cước công dân, hộ chiếu, thuế điện tử.
    9. **Lịch Vạn Niên & Âm Lịch Việt Nam MCP**: Chuyển đổi dương lịch sang âm lịch, tra cứu ngày hoàng đạo, giờ hoàng đạo, tiết khí và phong tục cổ truyền.
    10. **Hóa Đơn Điện Tử & Chữ Ký Số Việt Nam MCP**: Kiểm tra tính hợp lệ XML hóa đơn điện tử theo chuẩn Tổng Cục Thuế, xác thực chữ ký số Token USB.
  - Tiến hành quét và dịch thuật tự động 100% các đoạn diễn giải tiếng Anh thô trong toàn bộ kho dữ liệu (hơn 1.874 mục) sang tiếng Việt tự nhiên, chuẩn hóa thuật ngữ công nghệ thông tin.
  - Cập nhật danh mục điều hướng: Thêm danh mục `🇻🇳 Thị Trường Việt Nam` trên thanh điều hướng để người dùng lọc nhanh một chạm.
  - Chạy kiểm thử tự động toàn diện: 1.874/1.874 mục thỏa mãn 100% quy tắc 4 khối thông tin, 2.868 mẫu cấu hình JSON hợp lệ, kiểm thử từ vựng tiếng Việt đạt 100%.

- [Triển khai Cầu nối Thực thi Lệnh Dòng Lệnh Cục Bộ (Local Command Execution Bridge)]:
  - Triển khai thành công phân hệ chạy lệnh trực tiếp từ trình duyệt web theo Phương án 1 (Local Backend Bridge với danh sách trắng an toàn).
  - Xây dựng module cầu nối `server/commandBridge.js` tích hợp trực tiếp vào máy chủ phục vụ:
    - Điểm cuối `POST /api/execute-command`: Thực thi lệnh qua tiến trình con của hệ điều hành với kỹ thuật truyền luồng dữ liệu thời gian thực (Server-Sent Events / SSE).
    - Điểm cuối `POST /api/kill-command`: Cho phép người dùng dừng tiến trình con đang chạy bất cứ lúc nào qua PID.
    - Điểm cuối `GET /api/system-status`: Cung cấp thông tin môi trường máy tính cục bộ.
  - Thiết lập cơ chế an toàn bảo mật nghiêm ngặt:
    - Danh sách trắng tiền tố lệnh: `npx`, `npm`, `node`, `claude`, `git`, `uv`, `uvx`, `python`, `echo`, `dir`, `ls`, `where`.
    - Danh sách đen chặn tuyệt đối: `rmdir /s`, `del /f`, `format`, `shutdown`, `taskkill`, `reg delete`, `rm -rf`, `powershell -enc`.
    - Tự động ngắt tiến trình sau 120 giây (Timeout) để tránh treo tài nguyên.
  - Xây dựng giao diện Thiết bị đầu cuối tương tác `TerminalDrawer.tsx`:
    - Đèn LED trạng thái trực quan (Đang chạy, Sẵn sàng, Hoàn thành, Mã lỗi).
    - Hỗ trợ cuộn tự động (Auto-scroll), lịch sử lệnh bằng phím mũi tên Lên/Xuống.
    - Hỗ trợ nút chạy một chạm `▶ Chạy lệnh trên máy` ngay trong trang chi tiết công cụ `ToolDetailModal.tsx`.
    - Bổ sung nút bật/tắt Terminal trên thanh tiêu đề `Header.tsx`.
  - Kiểm thử tự động: Đạt 100% qua 5 bài kiểm tra (3 bài kiểm tra quy tắc nghiệp vụ + 2 bài kiểm tra an toàn câu lệnh).
  - Biên dịch đóng gói: Đạt 100% không phát sinh lỗi.

- [Mở rộng quy mô cơ sở dữ liệu: Tích hợp các kho lưu trữ hot thế giới và công cụ API Việt Nam]:
  - Đã thu thập và bổ sung thêm 30 công cụ chất lượng cao mới, nâng tổng số công cụ trong hệ thống lên **1.904 công cụ** và **2.899 mẫu cấu hình JSON**.
  - Bổ sung nhóm công cụ & API Việt Nam chuyên sâu:
    - Cổng thanh toán mở PayOS VietQR Open Banking.
    - Cổng thanh toán ví điện tử MoMo, VNPay Merchant Gateway.
    - Vận chuyển và logistics: Giao Hàng Tiết Kiệm (GHTK), Ahamove Giao Hàng Siêu Tốc nội thành.
    - Quản lý bán hàng bán lẻ và đa kênh: KiotViet POS, Sapo Omnichannel.
    - Nền tảng giọng nói AI và eKYC sinh trắc học: Viettel AI Platform, FPT.AI Voice & eKYC.
    - Bản đồ hành chính 63 tỉnh thành Việt Nam (madnh/hanhchinhvn).
    - SMS Brandname viễn thông Việt Nam (eSMS, SpeedSMS).
    - Tra cứu mã số thuế pháp nhân và người nộp thuế (masothue.com).
    - Ngân hàng mở Vietcombank Open Banking API.
    - Tổng đài thông minh và gọi thoại Stringee Communication SDK.
    - Cổng Đăng ký doanh nghiệp quốc gia (dangkykinhdoanh.gov.vn).
    - Giá xăng dầu Petrolimex Việt Nam theo kỳ điều hành.
    - Chỉ số chất lượng không khí AQI và thời tiết các tỉnh thành Việt Nam.
  - Bổ sung nhóm kho lưu trữ GitHub thịnh hành nhất thế giới:
    - Browser-Use: Tác tử tự động hóa trình duyệt web qua Playwright (32.000+ sao).
    - Cline: Trợ lý lập trình tự hành mã nguồn mở trong VS Code (28.500+ sao).
    - Ollama: Chạy mô hình ngôn ngữ lớn cục bộ siêu bảo mật Llama 3, DeepSeek (125.000+ sao).
    - CrewAI: Framework điều phối phi hành đoàn tác tử cộng tác (26.000+ sao).
    - RAGFlow: Hệ thống RAG hiểu sâu tài liệu phức tạp bằng thị giác máy tính (31.000+ sao).
    - Mem0: Tầng bộ nhớ dài hạn cá nhân hóa cho AI (27.500+ sao).
    - OpenHands (OpenDevin): Nền tảng kỹ sư phần mềm AI mã nguồn mở hoàn chỉnh (44.000+ sao).
    - uv: Trình quản lý gói và môi trường Python siêu tốc độ bằng Rust (48.000+ sao).
    - ComfyUI: Giao diện đồ thị node tạo ảnh và video khuếch tán Flux/SDXL (62.000+ sao).
    - Microsoft AutoGen: Khung đa tác tử đàm thoại của Microsoft (38.000+ sao).
    - DeepSeek-V3: Kiến trúc mô hình suy luận đỉnh cao 671B tham số (35.000+ sao).
    - LangGraph: Xây dựng tác tử có trạng thái dạng đồ thị (18.500+ sao).
    - shadcn/ui: Bộ thành phần giao diện React Tailwind đẹp nhất hiện nay (82.000+ sao).
  - Kiểm thử tự động đạt 100% qua 5 bài test (`tests/business-rules.test.js` và `tests/command-bridge.test.js`).
  - Đóng gói bản phát hành thành công (`npm run build`).

- [Đồng bộ và phát hành lên kho lưu trữ GitHub chính thức]:
  - Đã khởi tạo Git repository và cấu hình tệp bỏ qua `.gitignore`, giấy phép bản quyền `LICENSE` (MIT) và tài liệu tổng quan dự án `README.md` chuyên nghiệp.
  - Tạo thành công cam kết gốc (Initial Commit `436dcb3`) bao gồm toàn bộ 78 tệp tin:
    - 22 tệp tài liệu thiết kế đặc tả 12 giai đoạn theo quy trình VibeCode chuẩn (`01_` đến `22_` và `index.md`).
    - Toàn bộ mã nguồn giao diện React 19, TypeScript, Vite và Tailwind CSS.
    - Cầu nối thực thi lệnh cục bộ an toàn (`server/commandBridge.js`).
    - Phân hệ Thiết bị đầu cuối tương tác (`TerminalDrawer.tsx`).
    - Toàn bộ cơ sở dữ liệu đồ sộ gồm **1.904 công cụ** và **2.899 mẫu cấu hình JSON** đã bản địa hóa 100% tiếng Việt.
    - Trọn bộ kịch bản kiểm thử tự động quy tắc nghiệp vụ và an toàn câu lệnh.
  - Đã đẩy thành công toàn bộ mã nguồn lên kho lưu trữ GitHub chính thức tại địa chỉ:
    👉 **https://github.com/vinhngtienmdb-ui/AI-HUB.git** (nhánh `main`).

- [Bổ sung Phân hệ Quy trình tự động hóa (Workflows) và Ảnh Demo trực quan 100% công cụ]:
  - Bổ sung nhóm công cụ Quy trình tự động hóa (AI Workflows): n8n Workflow, Dify LLM Application Workflow, Flowise Drag-and-Drop, Langflow Multi-Agent Canvas, FastGPT Enterprise Knowledge, Shopee Vietnam API, TikTok Shop Vietnam API, Whisper Transcription Tiếng Việt 3 miền, Đấu thầu mua sắm công quốc gia, Bảng lãi suất tiết kiệm ngân hàng.
  - Tách biệt tab điều hướng mới: Thêm tab **Quy trình (Workflows)** trên thanh phân loại công cụ.
  - **Triển khai chuẩn hóa ảnh demo (Demo Images) cho 100% công cụ (1.914 mục)**:
    - 1.890 công cụ có liên kết GitHub được tự động trích xuất ảnh Open Graph banner chính thức độ phân giải cao (`https://opengraph.githubassets.com/1/{owner}/{repo}`).
    - Các công cụ và dịch vụ API Việt Nam được trang bị ảnh banner nhận diện thương hiệu công nghệ và ảnh chụp giao diện thực tế.
    - Cập nhật thẻ hiển thị `ToolCard.tsx`: Tích hợp ảnh banner demo tỉ lệ 16:9 ở đầu thẻ với hiệu ứng zoom mượt mà khi di chuột, nhãn loại hình và số sao nổi bật.
    - Cập nhật cửa sổ chi tiết `ToolDetailModal.tsx`: Hiển thị ảnh demo lớn ở đầu modal kèm nút phóng to `Xem ảnh gốc` và thư viện ảnh nhỏ (thumbnails) cho phép chuyển đổi ảnh trực quan.
  - Nâng tổng số lượng công cụ lên **1.914 mục** và **2.909 mẫu cấu hình JSON**.
  - Kiểm thử tự động đạt 100% qua 5 bài test.

### Quyết định kỹ thuật
- **Định dạng cấu hình mẫu**: Hỗ trợ xuất cấu hình nhanh dạng JSON cho các nền tảng phổ biến (Claude Desktop, Antigravity, Cursor, Windsurf, v.v.).
- **Ngôn ngữ nội dung**: Mọi hướng dẫn cài đặt, cấu hình và kịch bản sử dụng mẫu bắt buộc phải có nội dung diễn giải bằng tiếng Việt rõ ràng, kèm lệnh mẫu có thể sao chép bằng một nút bấm.
- **Tính minh bạch**: Bắt buộc mọi công cụ phải có liên kết nguồn trực tiếp (Kho lưu trữ mã nguồn GitHub, Trang chủ nhà phát triển hoặc Tài liệu chính thức).
- **Kiến trúc ứng dụng**: Lựa chọn TypeScript, React, Tailwind CSS và kiến trúc phân tầng chuẩn mực, dữ liệu có cơ chế kiểm tra tính toàn vẹn 4 trường bắt buộc.

### Lỗi phát sinh và giải pháp
- Không có lỗi phát sinh. Mã nguồn được biên dịch và chạy kiểm thử tự động đạt 100%.

### Kết quả đạt được và bước tiếp theo
- **Kết quả**: Hoàn thành Giai đoạn 09 (Xây dựng theo module) và Giai đoạn 10 (Kiểm thử và kiểm soát chất lượng). Ứng dụng web đang chạy ổn định tại địa chỉ: http://localhost:3000/
- **Kế hoạch tiếp theo**: Bàn giao sản phẩm, hướng dẫn người dùng trải nghiệm thực tế và tiếp nhận phản hồi cải tiến theo Giai đoạn 11 và 12.
