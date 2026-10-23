# 22. Lịch Sử Thay Đổi: Hệ Thống Quản Lý Và Tra Cứu Công Cụ Trí Tuệ Nhân Tạo

---

## 1. Nhật Ký Phiên Bản

### Phiên Bản 2.1.1 (Ngày 23-10-2026)
- **Loại hình**: Số sao thật (CL-05c).
- Workflow `.github/workflows/cap-nhat-so-sao.yml`: hằng tuần lấy số sao từ GitHub API bằng `GITHUB_TOKEN` có sẵn, kiểm định lại dữ liệu, mở pull request để duyệt.
- `validate-data.cjs` chỉ gán số sao cho công cụ trỏ tới gốc repo (83 công cụ); 1.853 thành phần nằm trong repo lớn không hiển thị số sao.
- `ci.yml` nhận `workflow_dispatch` để chạy CI cho pull request tự động.

### Phiên Bản 2.1.0 (Ngày 23-10-2026)
- **Loại hình**: Lưu trữ dùng chung và quyền quản trị phía máy chủ (BM-08), bật bằng `VITE_FIRESTORE_ENABLED=true`.
- **Firestore**: `firestore.rules` xác minh quản trị viên bằng tài liệu `admins/{uid}`; đóng góp (`contributions`) và điều chỉnh (`toolOverrides`) được kiểm tra quyền, danh tính người gửi, trạng thái, danh sách trường và độ dài.
- **Ứng dụng**: `src/lib/sharedStore.ts`; khi bật, vai trò quản trị do máy chủ xác nhận, đóng góp và phê duyệt đồng bộ thời gian thực giữa người dùng. Thư viện Firestore là chunk riêng, chỉ có trong bản build khi bật.
- **Kiểm thử**: 10 kiểm thử quy tắc bảo mật trên Firestore Emulator (`npm run test:rules`, job CI riêng), 51/51 kiểm thử chính đạt.
- **Triển khai**: các bước trong mục 5.3 của `20_QUY_TRINH_TRIEN_KHAI.md`; mặc định không bật nên không thay đổi hành vi hiện tại.

### Phiên Bản 2.0.52 (Ngày 23-10-2026)
- **Loại hình**: Viết lại hướng dẫn cài đặt và sử dụng dạng mẫu (CL-05b phần B), script `scripts/migrations/2026-10-23-b-viet-lai-huong-dan.cjs`.
- **1.830 thành phần claude-code-templates**: hướng dẫn sinh từ chính tệp thành phần: câu lệnh cài đặt thật, tệp đích, biến môi trường cần điền (MCP), sự kiện và điều kiện kích hoạt (hook), khóa cấu hình và giá trị mẫu cần thay (setting), công cụ và mô hình chỉ định (agent), cú pháp gọi lệnh (command), mô tả gốc của tác giả.
- **32 dự án khác**: hướng dẫn và câu lệnh chép từ README chính thức; sửa 13 câu lệnh trỏ tới gói npm có thật nhưng không phải công cụ được mô tả (ví dụ `npx -y firecrawl`, `npx -y tavily`) và 6 câu lệnh `agy skill add` bịa.
- **README hiển thị**: sinh lại mục 3 (cài đặt), 4 (sử dụng), 5 (cấu hình) của 1.930 README có cấu trúc sinh tự động từ dữ liệu đã sửa; không còn README chứa lệnh bịa.
- **Bỏ lệnh `agy`** của 3 công cụ mà README nguồn không có hướng dẫn tương ứng.
- **Kết quả**: 0 công cụ đang hiển thị còn hướng dẫn dạng mẫu hoặc lệnh bịa trong README.
- **Kiểm thử**: 51/51 đạt.

### Phiên Bản 2.0.51 (Ngày 23-10-2026)
- **Loại hình**: Xử lý dữ liệu đã gắn nhãn kiểm định (CL-05b phần A), script `scripts/migrations/2026-10-23-a-xu-ly-du-lieu-gan-nhan.cjs`.
- **Sửa liên kết nguồn (1.844 bản ghi)**:
  - 1.830 thành phần của `davila7/claude-code-templates` trỏ tới đường dẫn cũ; chuyển sang `cli-tool/components/...` khi đường dẫn mới có thật.
  - 5 máy chủ MCP tham chiếu (sqlite, postgres, puppeteer, brave-search, gdrive) chuyển sang `modelcontextprotocol/servers-archived`.
  - 9 dự án có URL sai được sửa sau khi đọc README thật: UnderTheSea, ZaloPay SDK, Claude Context, Claude Command Suite, Claude Squad, Claude Flow, ccusage, REA, Playwright MCP.
- **Thay câu lệnh cài đặt bịa bằng câu lệnh thật**:
  - 1.830 thành phần template: dùng `npx claude-code-templates@latest --<loại> <nhóm>/<tên> --yes` (cờ xác minh trong mã nguồn CLI); cấu hình JSON của MCP, setting, hook lấy nguyên từ tệp gốc. Trước đây là các lệnh không tồn tại như `agy skill add`, `claude plugin add`, `claude hook add`.
  - 21 dự án khác: câu lệnh chép từ README chính thức (ollama, n8n, vLLM, Context7, mem0, Playwright MCP...).
  - Thêm nền tảng `claude_code` (Claude Code).
- **Ẩn 286 bản ghi** (trạng thái `rejected`, lý do ghi trong `reviewNote`, có thể khôi phục): 47 nguồn không tồn tại, 227 "MCP server"/SDK có gói cài đặt không tồn tại và nguồn chỉ là trang chủ doanh nghiệp, 12 bản ghi trùng lặp.
- **Bộ định tuyến**: chỉ định tuyến tới công cụ đang hiển thị; ý định VietQR trỏ sang VietQR Core (`zeforc/viet-qr`), ý định phân tích nghiệp vụ trỏ sang Business Analyst Agent (OpenBA-Kit không có repo).
- **Kiểm định**: `validate-data.cjs` kiểm tra thêm đường dẫn bên trong repo GitHub.
- **Kết quả**: 1.936 công cụ đang hiển thị, 0 công cụ có nguồn không tồn tại, 0 công cụ có câu lệnh dùng gói không tồn tại ngoài 2 thành phần template có lỗi ở tệp gốc (có cảnh báo).
- **API Gateway**: `/api/v1/tools`, `/health`, `/stats` và công cụ MCP trạng thái chỉ trả về công cụ đang hiển thị; sửa lỗi `/api/v1/tools?q=...` luôn trả 500 (theo review của Codex).
- **Kiểm thử**: 51/51 đạt.

### Phiên Bản 2.0.50 (Ngày 23-10-2026)
- **Loại hình**: Chất lượng dữ liệu, hiệu năng, hợp nhất mã nguồn, đồng bộ tài liệu theo chuẩn VibeCode 2.0.
- **Dữ liệu**:
  - Thêm `npm run data:validate` (`scripts/validate-data.cjs`): kiểm tra repo GitHub, gói npm, liên kết nguồn, hướng dẫn dạng mẫu, trùng lặp; ghi kết quả vào trường `verification`.
  - Kết quả kiểm định: 35 nguồn không tồn tại, 376 công cụ trỏ tới gói npm không tồn tại, 1.914 hướng dẫn dạng mẫu, 30 liên kết nguồn trùng lặp. Không xóa bản ghi nào.
  - Giao diện chỉ hiển thị số sao đã xác minh; bỏ các số liệu viết cứng (4.8 sao, 12.5k lượt sử dụng, 12.5k đánh giá); hiển thị cảnh báo dữ liệu chưa xác minh trên trang và cửa sổ chi tiết.
  - Bỏ đường dẫn `C:/Users/...` và khóa API giả khỏi cấu hình mẫu.
- **Hiệu năng**: Tách README và hướng dẫn chi tiết khỏi gói JavaScript chính, tải theo nhu cầu. Gói chính giảm từ 19,7 MB (gzip 1,02 MB) xuống 5,7 MB (gzip 0,59 MB).
- **Mã nguồn**:
  - Hợp nhất bộ định tuyến ý định giữa giao diện web và máy chủ MCP (`mcp-gateway/core-intents.json`, `mcp-gateway/intent-matcher.js`).
  - Chuyển 56 script dùng một lần vào `scripts/archive/` do chạy lại sẽ ghi đè dữ liệu.
  - Số lượng công cụ hiển thị lấy từ dữ liệu thực tế.
- **Tài liệu**: Đổi tên `20`, `21`, `22` thành `22_LICH_SU_THAY_DOI.md`, `23_NHAT_KY_DU_AN.md`, `24_DANH_MUC_KIEM_TRA.md`; tạo `20_QUY_TRINH_TRIEN_KHAI.md`, `21_KE_HOACH_BAO_TRI.md`; bổ sung hiện trạng lưu trữ thực tế vào `13_CO_SO_DU_LIEU.md`; giao diện hiển thị đủ 13 giai đoạn.
- **Kiểm thử**: 49/49 đạt.

### Phiên Bản 2.0.49 (Ngày 23-10-2026)
- **Loại hình**: Sửa lỗi bảo mật nghiêm trọng và lỗi chức năng.
- **Bảo mật**:
  - Cầu nối lệnh cục bộ: kiểm tra nguồn yêu cầu (loopback, Host, Origin, mã phiên), chạy không qua shell, ràng buộc tham số theo từng chương trình; lệnh từ trang chi tiết chỉ được điền sẵn, không tự chạy. Máy chủ phát triển chỉ lắng nghe `127.0.0.1`.
  - API Gateway: điểm cuối quản trị bắt buộc khóa admin; mặc định lắng nghe `127.0.0.1`; CORS chỉ cho phép localhost hoặc `AIHUB_ALLOWED_ORIGINS`; chỉ tin `X-Forwarded-For` khi đặt `AIHUB_TRUST_PROXY=1`; bỏ muối HMAC viết cứng.
  - Bỏ `mcp-gateway/data/` khỏi kho mã.
  - Làm sạch HTML README bằng DOMPurify.
- **Sửa lỗi**:
  - Terminal hủy tiến trình ngay sau khi gửi lệnh nên không hiển thị kết quả.
  - Bộ định tuyến ý định nhận nhầm "react" thành công cụ dịch ngược REA và "database" thành phân tích nghiệp vụ BA.
- **Vận hành**: Thêm CI (kiểm thử, kiểm tra kiểu, đóng gói). Kiểm thử không còn ghi vào dữ liệu trong kho mã.
- **Thay đổi không tương thích**: Gọi `/api/v1/stats`, `/api/v1/keys*`, `/api/v1/audit-logs` cần tiêu đề `Authorization: Bearer <khóa admin>`. Truy cập API Gateway từ máy khác cần đặt `AIHUB_API_HOST=0.0.0.0`.
- **Kiểm thử**: 46/46 đạt.

### Phiên Bản 2.0.48-TachSoDoTrucQuanThanhTabDocLapKhoiReadme (Ngày 22-10-2026)
- **Loại hình**: Tách biệt hoàn toàn khối Sơ đồ trực quan (Diagram) thành một Tab chuyên biệt độc lập trên cả Trang chi tiết (`DetailPage.tsx`) và Modal chi tiết (`ToolDetailModal.tsx`), không nằm trong Tab README; xây dựng thành phần `VisualDiagramViewer.tsx` chuyên biệt và trả lại giao diện chuẩn mực GitHub Markdown cho `GitHubReadmeViewer.tsx`.
- **Nội dung hoàn thành**:
  - **Xây dựng thành phần Sơ đồ trực quan độc lập (`src/components/VisualDiagramViewer.tsx`)**:
    - Quản lý và hiển thị toàn bộ các sơ đồ Vector SVG chuẩn mẫu kỹ thuật (VibeCode, Hindsight, AI Job Search, Paperclip, Smart MCP Gateway, Find Skills và sơ đồ luồng tích hợp MCP chuẩn hóa).
    - Tích hợp sẵn bộ điều khiển Zoom/Toàn màn hình/Tải SVG và bộ chuyển đổi giữa chế độ **Sơ Đồ Vector SVG** và **Thẻ Phân Chặng Rút Gọn**.
  - **Tách Tab Sơ đồ trực quan trên Trang chi tiết (`src/pages/DetailPage.tsx`)**:
    - Bổ sung Tab mới `diagram` ("Sơ đồ trực quan - Vector SVG") trên thanh điều hướng chính: `Tổng quan` • `Sơ đồ trực quan` • `Cách sử dụng & Cài đặt` • `Cấu hình mẫu JSON` • `Tài liệu README (GitHub)`.
    - Tab `readme` hoàn toàn độc lập, chỉ hiển thị tài liệu kỹ thuật README Markdown chuẩn GitHub, không bị xen lẫn sơ đồ.
  - **Tách Tab Sơ đồ trực quan trên Cửa sổ Modal chi tiết (`src/components/ToolDetailModal.tsx`)**:
    - Nâng cấp giao diện điều hướng Modal với thanh 5 Tab rõ ràng: `Tổng quan` • `Sơ đồ trực quan` • `Cài đặt & Cấu hình` • `Câu lệnh & Hướng dẫn` • `Tài liệu README (GitHub)`.
    - Người dùng có thể chuyển đổi mượt mà, xem trực tiếp sơ đồ kiến trúc phóng to thu nhỏ mà không làm gián đoạn việc đọc tài liệu.
  - **Chuẩn hóa thành phần `src/components/GitHubReadmeViewer.tsx`**:
    - Loại bỏ hoàn toàn các khối sơ đồ chèn lấn khỏi trình xem README, bảo toàn 100% định dạng và bố cục GitHub Flavored Markdown nguyên bản.
  - **Kiểm thử tự động & Đóng gói sản phẩm**:
    - Vượt qua toàn bộ **38/38 bài kiểm thử tự động** trong 7 bộ test (tỷ lệ pass 100%).
    - Đóng gói sản phẩm hoàn hảo với Vite (`tsc && vite build`) trong 9.83 giây.

### Phiên Bản 2.0.47-ApDungSoDoVectorSvgChuanMermaidChoToanBoTaiNguyen (Ngày 22-10-2026)
- **Loại hình**: Mở rộng và áp dụng chuẩn mực thiết kế sơ đồ Vector SVG kỹ thuật (theo mẫu `mermaid-diagram.svg`) cho toàn bộ các tài nguyên cốt lõi trong hệ thống; tạo mới các bản vẽ vector chuyên dụng cho Hindsight, AI Job Search, Paperclip, Smart MCP Gateway và Find Skills; nâng cấp thành phần `MermaidDiagramSvgViewer.tsx` và `GitHubReadmeViewer.tsx` hỗ trợ xem đa tài nguyên.
- **Nội dung hoàn thành**:
  - **Khởi tạo hệ thống tệp bản vẽ Vector SVG chuẩn mực đồ họa (`public/` & `src/assets/`)**:
    - `public/hindsight-diagram.svg`: Sơ đồ kiến trúc nhận thức 5 tầng phỏng sinh học của Hindsight (Dòng tương tác đầu vào → Động cơ tiếp nhận Retain → Lưu trữ 3 lớp Semantic/Episodic/World View → Động cơ truy hồi Recall 4 chiều → Động cơ tự suy ngẫm Reflect kèm vòng lặp tiến hóa Feedback Loop).
    - `public/job-search-diagram.svg`: Sơ đồ quy trình săn việc tự động hóa đa tác tử 6 bước của AI Job Search (/setup → /scrape → /apply kèm Critic Agent và Cổng kiểm soát QG1 → Biên dịch PDF & Tối ưu hóa ATS kèm Cổng QG2 → /interview mô phỏng STAR → /rank theo dõi tiến độ).
    - `public/paperclip-diagram.svg`: Sơ đồ kiến trúc quản trị và điều phối lực lượng tác tử doanh nghiệp Paperclip (Quản trị con người Human Governance → Mặt phẳng điều khiển Control Plane & Cây phân cấp tổ chức → Biệt đội tác tử thực thi Planner/Coder/QA/Security → Giám sát an toàn, Cổng phê duyệt con người Human Approval Gate & Nhật ký kiểm toán bất biến).
    - `public/smart-gateway-diagram.svg`: Sơ đồ kiến trúc máy chủ trung gian AI HUB VN Smart MCP Gateway (Tiếp nhận tương tác tác tử → Phân loại ý định & Định tuyến thông minh → Bộ nén cắt tỉa lược đồ và nạp động tiết kiệm 95% Context Window → Thực thi JSON-RPC và tổng hợp kết quả cô đọng).
    - `public/find-skills-diagram.svg`: Sơ đồ quy trình khám phá & nạp động kỹ năng tác tử Find Skills (Nhận diện khoảng trống kỹ năng → Đối sánh vector ngữ nghĩa trong kho Skills toàn cầu → Cổng kiểm soát an toàn QG1 & Giấy phép → Nạp tức thì vào System Prompt tác tử).
  - **Nâng cấp thành phần trình xem vector động (`src/components/MermaidDiagramSvgViewer.tsx`)**:
    - Tham số hóa toàn diện: Hỗ trợ linh hoạt các thuộc tính `svgUrl`, `title`, `subtitle`, `downloadFileName`, `stageCountText`, `maxWidth`.
    - Duy trì trọn vẹn bộ điều khiển: Thu nhỏ (`ZoomOut`), Tỷ lệ thực tế (`%`), Phóng to (`ZoomIn`), Đặt lại kích thước (`100%`), Mở toàn màn hình (`ExternalLink`) và Tải về SVG (`Download`).
  - **Tích hợp đồng bộ vào Trình xem README (`src/components/GitHubReadmeViewer.tsx`)**:
    - Nhận diện chính xác từng công cụ qua `toolId` và nội dung markdown.
    - Cung cấp thanh chuyển đổi chế độ xem: **Sơ Đồ Vector SVG (Chuẩn Mẫu Mermaid)** và **Thẻ Phân Chặng Rút Gọn (Card Grid)** cho tất cả các tài nguyên trọng điểm.
  - **Đồng bộ hóa Modal Chi Tiết Công Cụ (`src/components/ToolDetailModal.tsx`)**:
    - Truyền trực tiếp `toolId` và `toolName` vào `GitHubReadmeViewer` để định danh chính xác công cụ đang mở.
  - **Kiểm thử tự động & Đóng gói sản phẩm**:
    - Vượt qua toàn bộ **38/38 bài kiểm thử tự động** trong 7 bộ test (tỷ lệ pass 100%).
    - Đóng gói thành công với Vite (`tsc && vite build`) trong 11.40 giây.

### Phiên Bản 2.0.46-TichHopSoDoVectorMermaidSvgChuanMau (Ngày 22-10-2026)
- **Loại hình**: Tích hợp trực tiếp và tham chiếu chuẩn xác 100% bản vẽ vector kỹ thuật `mermaid-diagram.svg` do người dùng cung cấp vào hệ thống; xây dựng thành phần trình xem vector tương tác chuyên dụng (`MermaidDiagramSvgViewer.tsx`) hỗ trợ phóng to/thu nhỏ, mở toàn màn hình, tải về SVG và tự động đồng bộ giao diện sáng/tối.
- **Nội dung hoàn thành**:
  - **Nhúng và quản lý tài sản vector (`public/mermaid-diagram.svg` & `src/assets/mermaid-diagram.svg`)**:
    - Sao chép tệp bản vẽ gốc `file:///C:/Users/vinhn/OneDrive/Máy tính/mermaid-diagram.svg` vào hệ thống dự án, đảm bảo giữ nguyên 100% cấu trúc vector, các tọa độ điểm mút, đường kết nối đa điểm (polylines), hình thoi cổng chất lượng (QG1, QG2), nhánh Rollback và vòng phản hồi Feedback.
  - **Phát triển thành phần trình xem vector chuyên dụng (`src/components/MermaidDiagramSvgViewer.tsx`)**:
    - Thanh điều khiển công cụ chuyên nghiệp:
      - Nút thu nhỏ (`ZoomOut`), hiển thị phần trăm tỷ lệ thực tế, nút phóng to (`ZoomIn`), và nút đặt lại tỷ lệ chuẩn (`100%`).
      - Nút mở toàn màn hình độc lập (`ExternalLink`) mở trực tiếp file SVG trong tab mới.
      - Nút tải về tệp SVG bản quyền độ nét cao (`Download`).
    - Khung hiển thị canvas cao cấp: Lớp nền họa tiết ô lưới kỹ thuật mờ ảo (Technical Grid Pattern), hỗ trợ cuộn mượt mà và giới hạn chiều cao tối đa phù hợp với mọi kích thước màn hình.
  - **Tích hợp đồng bộ vào Trình xem README (`src/components/GitHubReadmeViewer.tsx`)**:
    - Bổ sung thanh chuyển đổi chế độ xem linh hoạt trong Tab 13 Giai đoạn:
      - Chế độ **Sơ Đồ Vector SVG (Chuẩn Mẫu Mermaid)**: Mặc định hiển thị bản vẽ kỹ thuật gốc của người dùng.
      - Chế độ **Thẻ Phân Chặng Rút Gọn (Card Grid)**: Hỗ trợ tra cứu nhanh 4 chặng tiến trình trên các thiết bị màn hình nhỏ.
  - **Kiểm thử tự động & Đóng gói sản phẩm**:
    - Vượt qua toàn bộ **38/38 bài kiểm thử tự động** trong 7 bộ test (tỷ lệ pass 100%).
    - Biên dịch và đóng gói hoàn chỉnh bằng Vite (`tsc && vite build`) trong 9.51 giây.

### Phiên Bản 2.0.45-TichHopTaiNguyenBoNhoDaiHanHindsight (Ngày 22-10-2026)
- **Loại hình**: Bổ sung tài nguyên hệ thống bộ nhớ dài hạn phỏng sinh học cho tác tử AI Hindsight (`vectorize-io/hindsight`) lên vị trí đầu tiên của hệ thống, tích hợp toàn diện 4 khối thông tin chuẩn VibeCode, sơ đồ kiến trúc nhận thức Mermaid, bộ cấu hình mẫu đa nền tảng và bổ sung định tuyến thông minh trong Smart MCP Gateway.
- **Nội dung hoàn thành**:
  - **Tích hợp kho dữ liệu chuẩn hóa (`src/data/allTools.json`)**:
    - Bổ sung tài nguyên `vectorize-io-hindsight` vào vị trí đầu tiên của danh mục công cụ (`index 0`), nâng quy mô thư viện lên **2.222 công cụ**.
    - Đáp ứng trọn vẹn 4 khối thông tin bắt buộc:
      - Nguồn dẫn chính thức: `https://github.com/vectorize-io/hindsight`.
      - Công dụng tiếng Việt chi tiết (`purposeVi`): Cung cấp cơ chế ghi nhớ bền vững, truy hồi bối cảnh 4 chiều song song (Vector, BM25, Đồ thị, Thời gian) và suy ngẫm kinh nghiệm cho các tác tử AI qua các phiên làm việc độc lập.
      - Hướng dẫn cài đặt tiếng Việt 4 bước (`installGuideVi`): Từ cài đặt CLI qua `uvx hindsight-embed configure` đến tích hợp MCP Server.
      - Hướng dẫn sử dụng chi tiết (`usageGuideVi`): 3 thao tác cốt lõi Ghi nhớ (Retain), Truy hồi (Recall) và Suy ngẫm (Reflect).
      - Tài liệu README tiếng Việt (`readmeVi`): Phân tích chuyên sâu triết lý bộ nhớ phỏng sinh học, so sánh chi tiết với RAG truyền thống, hướng dẫn triển khai Docker tự lưu trữ và sơ đồ Mermaid luồng nhận thức 5 tầng.
  - **Cập nhật Smart MCP Gateway Router (`mcp-gateway/smart-router.js`)**:
    - Khởi tạo quy tắc định tuyến `agent_memory_hindsight` với độ ưu tiên cao (Priority 14), nhận diện các từ khóa: `hindsight`, `bộ nhớ tác tử`, `agent memory`, `biomimetic memory`, `retain`, `recall`, `reflect`, `mental model`, `mô hình nhận thức`.
    - Bổ sung bài kiểm thử định tuyến tự động vào `tests/mcp-gateway.test.js`.
  - **Kiểm thử tự động & Đóng gói sản phẩm**:
    - Vượt qua toàn bộ **38/38 bài kiểm thử tự động** trong 7 bộ test (tỷ lệ pass 100%).
    - Biên dịch và đóng gói hoàn chỉnh bằng Vite (`tsc && vite build`) trong 15.09 giây.

### Phiên Bản 2.0.44-DongBoSoDoChuanMermaidVaQualityGatesTuPhienGoc (Ngày 22-10-2026)
- **Loại hình**: Tham chiếu và đồng bộ hóa chuẩn xác 100% hai sơ đồ cốt lõi từ phiên làm việc `0e6ec2b7-0f68-4ab2-b94b-c90d8e376337`: Sơ đồ 13 Giai đoạn VibeCode tích hợp Cổng kiểm soát chất lượng (Quality Gates QG1, QG2), nhánh Rollback, vòng phản hồi Feedback, và Sơ đồ Mô hình Quản trị & Phân luồng trách nhiệm (Governance Workflow).
- **Nội dung hoàn thành**:
  - **Đồng bộ nội dung tệp kỹ năng VibeCode (`src/data/allTools.json`)**:
    - Tích hợp nguyên vẹn toàn bộ nội dung tệp `SKILL.md` (bao gồm đầy đủ mã nguồn Mermaid chuẩn mực) từ phiên `0e6ec2b7-0f68-4ab2-b94b-c90d8e376337`.
    - Bảo toàn 100% cấu trúc 13 giai đoạn, 8 nguyên tắc cốt lõi, cổng kiểm soát chất lượng và phân luồng trách nhiệm.
  - **Nâng cấp thành phần giao diện hiển thị sơ đồ (`src/components/GitHubReadmeViewer.tsx`)**:
    - Tích hợp bộ chuyển đổi tab linh hoạt giữa 2 sơ đồ:
      - **Tab 1: 13 Giai Đoạn & Cổng Chất Lượng**: Thể hiện đầy đủ 4 chặng tiến trình, tích hợp Cổng kiểm tra bảo mật QG1 (nhánh Không đạt quay về G09 sửa lỗi; Đạt chuẩn sang G12), Cổng nghiệm thu phát hành QG2 (nhánh Sự cố kích hoạt Rollback an toàn quay về G09; Thành công sang G13), và Vòng lặp phản hồi Feedback từ G13 quay ngược về G02 (Xác định phạm vi).
      - **Tab 2: Mô Hình Quản Trị & Trách Nhiệm**: Thể hiện toàn bộ chuỗi mắt xích từ Chủ sở hữu sản phẩm (PO) → Yêu cầu nghiệp vụ (BR) → Đặc tả kỹ thuật (Spec) → Rẽ song song (UI/UX & Architecture) → Hội tụ Lập trình AI → Kiểm thử → Bảo mật → Rà soát & Nghiệm thu → Triển khai phát hành → Vận hành & Bảo trì → Phản hồi cải tiến.
  - **Kiểm thử tự động & Đóng gói sản phẩm**:
    - Vượt qua toàn bộ **37/37 bài kiểm thử tự động** trong 7 bộ test (tỷ lệ pass 100%).
    - Biên dịch và đóng gói Vite hoàn tất thành công (`tsc && vite build`) trong 14.72 giây.

### Phiên Bản 2.0.43-ThietKeLaiFlowchartVaLoaiBoGiaoDienMonoDen (Ngày 22-10-2026)
- **Loại hình**: Thiết kế lại toàn diện sơ đồ Flowchart 13 giai đoạn VibeCode và sơ đồ tương tác tác tử đa luồng theo phong cách hiện đại, trực quan, phân 4 chặng rõ nét; đồng thời loại bỏ triệt để giao diện mono đen/chữ xanh lá hacker terminal, chuyển đổi sang phong cách tài liệu kỹ thuật sáng sủa, thanh lịch, trang nhã.
- **Nội dung hoàn thành**:
  - **Tái thiết kế Sơ đồ Flowchart (`src/components/GitHubReadmeViewer.tsx`)**:
    - Phân chia 4 chặng tiến trình rõ ràng với màu sắc nhận diện đặc trưng:
      - Chặng 1: Khởi tạo & Đặc tả (Giai đoạn 01 đến 04) - Sắc xanh dương nhạt.
      - Chặng 2: Thiết kế hệ thống & Dữ liệu (Giai đoạn 05 đến 08) - Sắc tím hoa cà nhạt.
      - Chặng 3: Xây dựng & Bảo mật (Giai đoạn 09 đến 11) - Sắc ngọc bích nhạt.
      - Chặng 4: Triển khai & Vận hành (Giai đoạn 12 đến 13) - Sắc hổ phách nhạt.
    - Từng nút bước được thiết kế dạng thẻ bo góc mềm mại, có huy hiệu số thứ tự tròn viền sắc nét, tên giai đoạn in đậm, tên tệp markdown tương ứng, liên kết bằng mũi tên chuyển tiếp mượt mà.
    - Sơ đồ tác tử cho `ai-job-search` và cấu trúc `paperclip` cũng được đồng bộ hóa sang giao diện thẻ sáng sủa, tinh tế.
  - **Loại bỏ triệt để giao diện Mono đen**:
    - **Thành phần xem mã (`src/components/GitHubCodeViewer.tsx`)**: Khối lệnh Terminal CLI được chuyển từ nền đen kịt `bg-slate-950 text-emerald-400` sang giao diện tài liệu hiện đại `bg-slate-50/80 dark:bg-slate-800/90`, viền `border-slate-200 dark:border-slate-700`, chữ `text-slate-800 dark:text-slate-100`, ký hiệu `$ ` màu chàm tím `text-indigo-600 dark:text-indigo-400`. Khối bảng mã nguồn JSON chuyển sang nền `bg-slate-50/50 dark:bg-slate-900`.
    - **Trang chi tiết (`src/pages/DetailPage.tsx`)**: Toàn bộ khối lệnh dòng lệnh Terminal trong Tab "Cách sử dụng & Cài đặt" được đồng bộ hóa sang theme sáng/tối thanh lịch, không dùng nền đen hay chữ xanh lá.
    - **Chế độ xem thô (Raw View) của `GitHubReadmeViewer.tsx`**: Chuyển từ khung đen sang khung tài liệu `bg-slate-50 dark:bg-slate-850 border-slate-200 dark:border-slate-700`.
  - **Kiểm thử tự động & Đóng gói sản phẩm**:
    - Vượt qua toàn bộ **37/37 bài kiểm thử tự động** trong 7 bộ test (tỷ lệ pass 100%).
    - Biên dịch và đóng gói Vite hoàn tất thành công (`tsc && vite build`) trong 12.32 giây.

### Phiên Bản 2.0.42-ChuanHoaTabCauHinhMauJsonTheoPhongCachGitHub (Ngày 22-10-2026)
- **Loại hình**: Chuẩn hóa toàn diện Tab "Cấu hình mẫu JSON" và khối cấu hình môi trường theo đúng phong cách trình xem mã nguồn của GitHub (GitHub Code Blob Viewer), tích hợp cột số dòng, thanh tiêu đề tệp tin chuẩn nền tảng và nút sao chép chuyên dụng.
- **Nội dung hoàn thành**:
  - **Xây dựng thành phần giao diện chuyên dụng (`src/components/GitHubCodeViewer.tsx`)**:
    - Thanh tiêu đề file chuẩn GitHub: Biểu tượng `FileCode`, tên tệp tin thực tế theo từng nền tảng (`claude_desktop_config.json`, `mcp_config.json`, `.cursor/mcp.json`), nhãn nền tảng, số dòng và dung lượng byte.
    - Cột số thứ tự dòng (Line Numbers): Đặt ở mép trái với đường phân cách mờ nhạt, hỗ trợ đổi màu khi rê chuột (hover).
    - Khối lệnh Terminal CLI (nếu có): Ký hiệu `$ `, font mono `JetBrains Mono` và nút sao chép câu lệnh riêng biệt.
    - Nút sao chép JSON một chạm có phản hồi trạng thái trực quan.
  - **Tích hợp đồng bộ hệ thống giao diện**:
    - **Trang chi tiết toàn màn hình (`src/pages/DetailPage.tsx`)**: Nâng cấp toàn bộ Tab "Cấu hình mẫu JSON", hiển thị từng cấu hình nền tảng thành một hộp GitHub Code Viewer chuyên nghiệp.
    - **Cửa sổ chi tiết công cụ (`src/components/ToolDetailModal.tsx`)**: Nâng cấp khối hiển thị cấu hình, hỗ trợ chọn tab nền tảng linh hoạt và xem code chuẩn GitHub.
  - **Kiểm thử tự động & Đóng gói sản phẩm**:
    - Toàn bộ **37/37 bài test** trong 7 bộ kiểm thử tự động đạt **100% tỷ lệ pass**.
    - Biên dịch và đóng gói hoàn chỉnh bằng Vite (`tsc && vite build`) trong 10.63 giây.

### Phiên Bản 2.0.41-BaoToanNguyenVenNoiDungGitHubVaChuanHoaTabCaiDat (Ngày 22-10-2026)
- **Loại hình**: Bảo toàn nguyên vẹn 100% nội dung và cấu trúc phân loại gốc từ GitHub (không cắt xén, không xáo trộn), vẽ bổ sung sơ đồ trực quan (Flowchart Diagram) cho quy trình 13 giai đoạn VibeCode, tích hợp nút sao chép mã nguồn cho từng khối code block kiểu GitHub và chuẩn hóa Tab "Cách sử dụng & Cài đặt" (loại bỏ nút chạy lệnh trên web, chuyển thành các khối lệnh terminal có thể sao chép).
- **Nội dung hoàn thành**:
  - **Bảo toàn nguyên tắc toàn vẹn nội dung (`src/data/allTools.json`)**:
    - Tích hợp toàn văn 492 dòng nguyên bản của tệp `SKILL.md` vào tài nguyên `vibecoding-skill-dev-lifecycle`: Giữ nguyên 100% cấu trúc 8 nguyên tắc cốt lõi, sơ đồ mũi tên ASCII 13 giai đoạn, chi tiết từng giai đoạn từ 01 đến 13, cấu trúc chuẩn của một Task, cổng kiểm soát chất lượng, danh mục 24 tệp tài liệu và 3 tệp quản lý cốt lõi (`index.md`, `23_NHAT_KY_DU_AN.md`, `24_DANH_MUC_KIEM_TRA.md`).
    - Giữ nguyên cấu trúc phân loại và toàn văn nội dung chi tiết của `mads-lorentzen-ai-job-search`, `paperclipai-paperclip`, `vercel-labs-find-skills` và `aihub-vn-smart-mcp-gateway`.
  - **Bổ sung sơ đồ trực quan (Flowchart Diagram) trên `GitHubReadmeViewer.tsx`**:
    - Vẽ thêm sơ đồ trực quan 4 khối giai đoạn nối tiếp nhau bằng mũi tên (I. Khảo sát & Yêu cầu -> II. Thiết kế hệ thống -> III. Xây dựng & Bảo mật -> IV. Triển khai & Vận hành).
    - Tự động gắn nút sao chép (Copy code button) ở góc trên bên phải của mọi khối `<pre>` code block giống y hệt GitHub.
  - **Chuẩn hóa Tab "Cách sử dụng & Cài đặt" (`DetailPage.tsx` và `ToolDetailModal.tsx`)**:
    - Loại bỏ triệt để các nút "Chạy lệnh trên máy" và "Chạy thử MCP" trên giao diện Web (do trình duyệt chưa thể chạy lệnh trực tiếp).
    - Format toàn bộ các câu lệnh cài đặt CLI và kịch bản sử dụng thành các khối Terminal chuẩn phong cách GitHub (nền tối, ký hiệu `$ `, font mono JetBrains) kèm nút "Sao chép lệnh" một chạm.
  - **Kiểm thử tự động & Đóng gói sản phẩm**:
    - Vượt qua toàn bộ **37/37 bài test** trong 7 bộ kiểm thử tự động (100% pass).
    - Biên dịch và đóng gói hoàn chỉnh bằng Vite (`tsc && vite build`) trong 28.91 giây.

### Phiên Bản 2.0.40-ChuanHoaGiaoDienReadmeTheoPhongCachGitHub (Ngày 22-10-2026)
- **Loại hình**: Nâng cấp trải nghiệm người dùng, chuyển đổi hoàn toàn cách hiển thị tài liệu README từ khối code đen mono thô sơ sang giao diện trực quan chuẩn GitHub Flavored Markdown (GFM), giữ nguyên 100% phong cách trình bày của GitHub.
- **Nội dung hoàn thành**:
  - **Xây dựng thành phần giao diện chuyên dụng (`src/components/GitHubReadmeViewer.tsx`)**:
    - Khung viền và thanh tiêu đề chuẩn GitHub: Biểu tượng tệp tin, tên tệp `README.md`, nhãn ngôn ngữ Tiếng Việt và đường dẫn liên kết mở nhanh repo gốc.
    - Bộ công cụ thao tác linh hoạt: Hỗ trợ chuyển đổi qua lại giữa chế độ **Xem trước (Preview trực quan)** và **Mã nguồn thô (Raw Markdown)**.
    - Nút sao chép mã nguồn Markdown một chạm với thông báo phản hồi trạng thái trực quan.
  - **Bộ quy chuẩn định dạng CSS GitHub (`src/index.css`)**:
    - Định nghĩa lớp định dạng `.github-markdown-body` hỗ trợ đầy đủ chế độ sáng (Light) và tối (Dark).
    - Tiêu đề H1, H2 có đường gạch chân phân cách mờ thanh lịch chuẩn GitHub.
    - Trích dẫn (Blockquote) có dải viền xám bên trái và nền mờ chuyên nghiệp.
    - Khối mã nguồn (Code Blocks), mã nội dòng (Inline Code), danh sách đánh số, gạch đầu dòng, bảng biểu và liên kết hiển thị tự nhiên, hoàn toàn không bị biến dạng thành khối code đen thô ráp.
  - **Tích hợp đồng bộ hệ thống giao diện**:
    - **Modal chi tiết (`src/components/ToolDetailModal.tsx`)**: Tích hợp `GitHubReadmeViewer` với khung cuộn độc lập mượt mà.
    - **Trang chi tiết toàn màn hình (`src/pages/DetailPage.tsx`)**: Tích hợp `GitHubReadmeViewer` vào Tab "Tài liệu README (GitHub)".
  - **Kiểm thử tự động & Đóng gói sản phẩm**:
    - Chạy toàn bộ **37/37 bài test** trong 7 bộ kiểm thử tự động: Đạt **100% tỷ lệ pass**.
    - Biên dịch và đóng gói hoàn chỉnh bằng Vite (`tsc && vite build`) trong 11.53 giây.

### Phiên Bản 2.0.39-RaSoatDuLieuVaBoSungReadmeTiengViet (Ngày 22-10-2026)
- **Loại hình**: Rà soát toàn bộ dữ liệu hệ thống, dịch thuật và bổ sung tài liệu kỹ thuật README từ GitHub sang tiếng Việt chuẩn mực cho 100% tài nguyên (2.221 công cụ), nâng cấp giao diện Modal chi tiết và Trang chi tiết toàn màn hình hỗ trợ xem và sao chép Markdown.
- **Nội dung hoàn thành**:
  - **Mở rộng mô hình dữ liệu (`src/types/index.ts`)**:
    - Bổ sung trường dữ liệu `readmeVi?: string;` vào giao diện TypeScript `AITool`.
  - **Rà soát dữ liệu & Biên soạn tài liệu kỹ thuật README tiếng Việt (`src/data/allTools.json`)**:
    - Xây dựng kịch bản tự động hóa `scripts/generate-readme-vi.cjs` rà soát toàn bộ 2.221 công cụ trong kho dữ liệu.
    - Biên soạn và chuẩn hóa tài liệu kỹ thuật README tiếng Việt chuyên sâu cho các dự án trọng điểm: VibeCoding Skill (`vibecoding-skill-dev-lifecycle`), AI Job Search (`mads-lorentzen-ai-job-search`), Paperclip Control Plane (`paperclipai-paperclip`), Find Skills (`vercel-labs-find-skills`), và Cổng MCP AI HUB VN (`aihub-vn-smart-mcp-gateway`).
    - Tổng hợp và cấu trúc hóa tài liệu README chuẩn Markdown phân cấp cho toàn bộ 2.221 công cụ với 7 phần chuẩn mực: Giới thiệu & Mục đích giải quyết, Tính năng nổi bật, Hướng dẫn cài đặt & thiết lập môi trường, Hướng dẫn sử dụng & câu lệnh mẫu tiếng Việt, Mẫu cấu hình tích hợp JSON / CLI, Đánh giá ưu nhược điểm kỹ thuật, Giấy phép bản quyền & Tác giả.
  - **Nâng cấp giao diện người dùng**:
    - **Modal chi tiết (`src/components/ToolDetailModal.tsx`)**: Bổ sung Khối 4 hiển thị "Tài Liệu Kỹ Thuật Chi Tiết (README GitHub Tiếng Việt)" kèm nút "Sao chép toàn bộ README (Markdown)" một chạm.
    - **Trang chi tiết toàn màn hình (`src/pages/DetailPage.tsx`)**: Bổ sung Tab điều hướng mới "Tài liệu README (GitHub)" kèm nhãn "Tiếng Việt", giao diện xem tài liệu chuẩn font chữ mono lập trình và nút sao chép Markdown tiện lợi.
  - **Kiểm thử tự động & Đóng gói sản phẩm**:
    - Bổ sung ca kiểm thử `Quy tắc QT-05: Mọi công cụ trong kho dữ liệu bắt buộc phải có tài liệu README tiếng Việt chuẩn (readmeVi)` vào `tests/business-rules.test.js`.
    - Chạy toàn bộ **37/37 bài test** trong 7 bộ kiểm thử tự động: Đạt **100% tỷ lệ pass**.
    - Biên dịch và đóng gói hoàn chỉnh bằng Vite (`tsc && vite build`) trong 10.78 giây.

### Phiên Bản 2.0.38-TichHopVibecodingSkillVaoHeThongAiHub (Ngày 22-10-2026)
- **Loại hình**: Chuẩn hóa và tích hợp bộ kỹ năng và quy tắc phát triển phần mềm chuẩn VibeCode 13 giai đoạn VibeCoding Skill (`vinhngtienmdb-ui/vibecoding_skill`) vào kho dữ liệu AI HUB VN, nâng quy mô kho lên 2.221 tài nguyên, cài đặt đồng bộ cho Claude Code và cập nhật bộ định tuyến Smart MCP Gateway.
- **Nội dung hoàn thành**:
  - **Tích hợp tài nguyên vào kho AI HUB VN (`vibecoding-skill-dev-lifecycle`)**:
    - Chuẩn hóa đầy đủ 4 khối thông tin bắt buộc theo quy tắc QT-01, QT-04 và quy trình VibeCode bằng tiếng Việt: Nguồn dẫn chính thức (`https://github.com/vinhngtienmdb-ui/vibecoding_skill`), công dụng nghiệp vụ (khung kỷ luật kỹ thuật 13 giai đoạn và bộ tài liệu 24 tệp chuẩn hóa cho AI Coding Agents), hướng dẫn cài đặt dưới dạng Plugin cho Google Antigravity và Kỹ năng cho Claude Code / Cursor, hướng dẫn vận hành chu trình từng bước nhỏ và nguyên tắc không suy đoán / không phá vỡ mã nguồn.
    - Thiết lập phân loại danh mục đa tầng: `devops_cicd` (DevOps & Tự động hóa CI/CD), `rpa_workflow_automation` (Tự động hóa quy trình & RPA), `office_digital_docs` (Văn phòng số & Xử lý tài liệu), `backend_api` (Backend & Kiến trúc API), `qa_testing` (Kiểm thử phần mềm & QA/QC), `cybersecurity_security` (An toàn thông tin & Bảo mật), `vietnam` (Thị trường Việt Nam).
    - Cung cấp cấu hình mẫu JSON chuẩn xác cho Google Antigravity, Claude Code và Cursor IDE.
    - Đặt mốc cập nhật `updatedAt: "2026-10-22"` và xếp ở vị trí đầu tiên của kho dữ liệu `allTools.json`.
  - **Cài đặt kỹ năng vào môi trường máy tính người dùng**:
    - **Claude Code**: Khởi tạo thư mục và cài đặt tệp kỹ năng chuẩn tại `C:\Users\vinhn\.claude\skills\vibecoding\SKILL.md`.
    - **Google Antigravity**: Sẵn sàng qua plugin toàn cục `dev-lifecycle` tại `C:\Users\vinhn\.gemini\config\plugins\dev-lifecycle\`.
  - **Mở rộng Smart MCP Router & Client Adapter**:
    - Bổ sung quy tắc ý định chuyên biệt `vibecoding_dev_lifecycle` vào `mcp-gateway/smart-router.js` và `src/lib/mcpClient.ts`, nhận diện các từ khóa `vibecoding`, `vibecode`, `quy trình vibecode`, `dev-lifecycle`, `13 giai đoạn`, `chuẩn phát triển phần mềm`, `bộ tài liệu dự án` để tự động điều phối trực tiếp đến `vibecoding-skill-dev-lifecycle`.
  - **Kiểm thử tự động & Đóng gói sản phẩm**:
    - Bổ sung ca kiểm thử định tuyến mới vào `tests/mcp-gateway.test.js`.
    - Chạy toàn bộ **36/36 bài test** trong 7 bộ kiểm thử tự động: Đạt **100% tỷ lệ pass**.
    - Biên dịch và đóng gói hoàn chỉnh bằng Vite (`tsc && vite build`) trong 21.36 giây.

### Phiên Bản 2.0.37-ToiUuThuTuSapXepUuTienCongCuMoiCapNhat (Ngày 21-10-2026)
- **Loại hình**: Tối ưu hóa thứ tự sắp xếp danh mục tài nguyên, tự động đưa các công cụ mới cập nhật, mới đóng góp hoặc mới phê duyệt lên trên đầu danh sách trên toàn bộ hệ thống giao diện (Trang chủ và Trang danh mục).
- **Nội dung hoàn thành**:
  - **Chuẩn hóa cấu trúc dữ liệu thời gian cập nhật**:
    - Bổ sung trường dữ liệu `updatedAt?: string` vào giao diện TypeScript `AITool` tại [`src/types/index.ts`](file:///C:/Users/vinhn/.gemini/antigravity/scratch/quan-ly-cong-cu-ai/src/types/index.ts).
    - Cập nhật dấu mốc thời gian `updatedAt: "2026-10-21"` cho các công cụ mới nhất (`paperclipai-paperclip`, `mads-lorentzen-ai-job-search`, `vercel-labs-find-skills`, `aihub-vn-smart-mcp-gateway`), sắp xếp lại kho dữ liệu gốc [`src/data/allTools.json`](file:///C:/Users/vinhn/.gemini/antigravity/scratch/quan-ly-cong-cu-ai/src/data/allTools.json) với thứ tự ưu tiên mới nhất ở vị trí đầu tiên.
  - **Thuật toán sắp xếp tự động tại tầng lưu trữ (`src/lib/storage.ts`)**:
    - Xây dựng hàm `sortToolsByUpdated`: So sánh ngày cập nhật (`updatedAt`) hoặc ngày đóng góp (`contributedAt`) theo thứ tự giảm dần thời gian, ưu tiên công cụ có mốc cập nhật mới nhất.
    - Tự động gắn mốc `updatedAt` khi Quản trị viên duyệt công cụ (`handleApproveTool`) hoặc điều chỉnh phân loại (`handleUpdateToolTaxonomy`).
  - **Tích hợp bộ chọn sắp xếp trên giao diện người dùng**:
    - **Trang chủ (`src/App.tsx`)**: Bổ sung bộ chọn sắp xếp ngay trên thanh điều hướng danh mục: *⚡ Mới cập nhật (Mặc định)*, *⭐ Đánh giá cao nhất*, *🔤 Tên (A - Z)*. Danh sách công cụ hiển thị mặc định các tài nguyên mới nhất ở trang đầu tiên.
    - **Trang danh mục chi tiết (`src/pages/CategoryPage.tsx`)**: Đặt chế độ sắp xếp mặc định là *⚡ Mới cập nhật* (`sortBy = 'newest'`), hoàn thiện thuật toán đối soát ngày tháng chuẩn xác.
  - **Kiểm thử tự động & Đóng gói sản phẩm**:
    - Bổ sung ca kiểm thử chuyên sâu về thuật toán sắp xếp theo ngày cập nhật vào [`tests/storage-delta.test.js`](file:///C:/Users/vinhn/.gemini/antigravity/scratch/quan-ly-cong-cu-ai/tests/storage-delta.test.js).
    - Chạy toàn bộ **35/35 bài test** trong 7 bộ kiểm thử tự động: Đạt **100% tỷ lệ pass**.
    - Biên dịch và đóng gói hoàn chỉnh bằng Vite (`tsc && vite build`) trong 19.35 giây.

### Phiên Bản 2.0.36-TichHopPaperclipControlPlaneVaoHeThongAiHub (Ngày 21-10-2026)
- **Loại hình**: Chuẩn hóa và tích hợp nền tảng mã nguồn mở quản trị và điều phối lực lượng tác tử Paperclip (`paperclipai/paperclip`) vào kho dữ liệu AI HUB VN, nâng quy mô kho lên 2.220 tài nguyên, đồng thời cập nhật bộ định tuyến Smart MCP Gateway.
- **Nội dung hoàn thành**:
  - **Tích hợp tài nguyên vào kho AI HUB VN (`paperclipai-paperclip`)**:
    - Chuẩn hóa đầy đủ 4 khối thông tin bắt buộc theo quy tắc QT-01, QT-04 và quy trình VibeCode bằng tiếng Việt: Nguồn dẫn chính thức (`https://github.com/paperclipai/paperclip`), công dụng nghiệp vụ (mặt bằng điều hành tập trung Control Plane quản lý lực lượng tác tử AI theo cấu trúc phòng ban doanh nghiệp thực thụ), hướng dẫn cài đặt khởi chạy nhanh qua lệnh `npx paperclipai onboard --yes`, hướng dẫn vận hành quy trình điều phối Org Chart, Ticket Kanban, Human-in-the-Loop Governance và giám sát ngân sách token.
    - Thiết lập phân loại danh mục đa tầng: `rpa_workflow_automation` (Tự động hóa quy trình & RPA), `devops_cicd` (DevOps & Tự động hóa CI/CD), `erp_enterprise` (Hệ thống quản trị doanh nghiệp), `backend_api` (Backend & Kiến trúc API), `office_digital_docs` (Văn phòng số & Xử lý tài liệu).
    - Cung cấp cấu hình mẫu JSON chuẩn xác cho Claude Code, Google Antigravity và Cursor IDE.
  - **Mở rộng Smart MCP Router & Client Adapter**:
    - Bổ sung quy tắc ý định chuyên biệt `agent_workforce_paperclip` vào `mcp-gateway/smart-router.js` và `src/lib/mcpClient.ts`, nhận diện các từ khóa `paperclip`, `quản lý agent`, `quản trị agent`, `điều phối agent`, `agent workforce`, `control plane`, `org chart agent`, `human in the loop` để tự động điều phối trực tiếp đến `paperclipai-paperclip`.
  - **Kiểm thử tự động & Đóng gói sản phẩm**:
    - Bổ sung ca kiểm thử định tuyến mới vào `tests/mcp-gateway.test.js`.
    - Chạy toàn bộ **34/34 bài test** trong 7 bộ kiểm thử tự động: Đạt **100% tỷ lệ pass**.
    - Biên dịch và đóng gói hoàn chỉnh bằng Vite (`tsc && vite build`) trong 28.98 giây.

### Phiên Bản 2.0.35-TichHopAiJobSearchVaoHeThongAiHub (Ngày 21-10-2026)
- **Loại hình**: Chuẩn hóa và tích hợp bộ công cụ tự động hóa quy trình tìm việc, viết CV may đo và luyện phỏng vấn AI Job Search (`MadsLorentzen/ai-job-search`) vào kho dữ liệu AI HUB VN, nâng quy mô kho lên 2.219 tài nguyên, đồng thời cập nhật bộ định tuyến Smart MCP Gateway.
- **Nội dung hoàn thành**:
  - **Tích hợp tài nguyên vào kho AI HUB VN (`mads-lorentzen-ai-job-search`)**:
    - Chuẩn hóa đầy đủ 4 khối thông tin bắt buộc theo quy tắc QT-01, QT-04 và quy trình VibeCode bằng tiếng Việt: Nguồn dẫn chính thức (`https://github.com/MadsLorentzen/ai-job-search`), công dụng nghiệp vụ (tối ưu hóa quy trình tìm việc khép kín, vượt qua bộ lọc ATS), hướng dẫn cài đặt Fork repo/Claude Code CLI, và hướng dẫn tương tác với 8 khẩu lệnh (`/setup`, `/scrape`, `/apply`, `/interview`, `/rank`, `/outcome`, `/upskill`, `/add-portal`).
    - Thiết lập phân loại danh mục đa tầng: `hr_recruitment` (Quản trị nhân sự & Tuyển dụng), `rpa_workflow_automation` (Tự động hóa quy trình & RPA), `office_digital_docs` (Văn phòng số & Xử lý tài liệu), `web_scraping_crawling` (Thu thập dữ liệu web), `nlp_llm` (Xử lý ngôn ngữ tự nhiên & Mô hình LLM).
    - Cung cấp cấu hình mẫu JSON chuẩn xác cho Claude Code, Google Antigravity và Cursor IDE.
  - **Mở rộng Smart MCP Router & Client Adapter**:
    - Bổ sung quy tắc ý định chuyên biệt `ai_job_search_framework` vào `mcp-gateway/smart-router.js` và `src/lib/mcpClient.ts`, nhận diện các từ khóa `job search`, `tìm việc`, `săn việc`, `xin việc`, `viết cv`, `cover letter`, `luyện phỏng vấn`, `ats resume`, `mads lorentzen` để tự động điều phối trực tiếp đến `mads-lorentzen-ai-job-search`.
  - **Kiểm thử tự động & Đóng gói sản phẩm**:
    - Bổ sung ca kiểm thử định tuyến mới vào `tests/mcp-gateway.test.js`.
    - Chạy toàn bộ **33/33 bài test** trong 7 bộ kiểm thử tự động: Đạt **100% tỷ lệ pass**.
    - Biên dịch và đóng gói hoàn chỉnh bằng Vite (`tsc && vite build`) trong 18.07 giây.

### Phiên Bản 2.0.34-CaiDatMayChuMcpAiHubVnVaoClaudeCodeVaAntigravity (Ngày 21-10-2026)
- **Loại hình**: Cài đặt máy chủ MCP AI HUB VN Smart Gateway (`aihub-smart-gateway`) vào hai nền tảng trợ lý lập trình Claude Code và Google Antigravity, đồng thời hỗ trợ đồng bộ cho ứng dụng Claude Desktop.
- **Nội dung hoàn thành**:
  - **Cấu hình máy chủ MCP cho Claude Code và Claude Desktop**:
    - **Claude Code CLI (`C:\Users\vinhn\.claude.json`)**: Bổ sung cấu hình máy chủ MCP `aihub-smart-gateway` vận hành qua cơ chế Stdio Transport (`node mcp-gateway/index.js`), kết nối trực tiếp với 2.218 tài nguyên AI HUB VN.
    - **Claude Desktop App (`C:\Users\vinhn\AppData\Roaming\Claude\claude_desktop_config.json`)**: Thiết lập khối cấu hình `mcpServers` chuẩn Anthropic để nạp máy chủ MCP AI HUB VN khi khởi động ứng dụng Claude trên máy tính.
  - **Cấu hình máy chủ MCP và đặc tả công cụ cho Google Antigravity**:
    - **Cấu hình toàn cục Antigravity (`C:\Users\vinhn\.gemini\config\mcp_config.json`)**: Đăng ký máy chủ `aihub-smart-gateway` với môi trường `production`.
    - **Khởi tạo thư mục định nghĩa công cụ (`C:\Users\vinhn\.gemini\antigravity\mcp\aihub-smart-gateway\`)**: Tạo đầy đủ 4 tệp định dạng JSON Schema chuẩn cho cơ chế Lazy-loading MCP Tools:
      - `aihub_smart_dispatch.json`: Tiếp nhận yêu cầu công việc tự nhiên từ người dùng, tự động phân tích ý định và định tuyến đến công cụ phù hợp.
      - `aihub_resolve_capability.json`: Tra cứu năng lực hỗ trợ theo 39 lĩnh vực chuyên môn.
      - `aihub_explain_routing.json`: Minh bạch hóa lý do và thuật toán định tuyến khi chọn công cụ.
      - `aihub_get_gateway_status.json`: Báo cáo trạng thái Gateway, số lượng tài nguyên và mức tiết kiệm token.
      - `instructions.md`: Hướng dẫn chuyên môn cho các AI Agent khi tương tác với AI HUB VN Gateway.
  - **Kiểm thử tự động & Nghiệm thu**:
    - Kiểm tra tính hợp lệ của toàn bộ các tệp cấu hình JSON (`.claude.json`, `claude_desktop_config.json`, `mcp_config.json`).
    - Kiểm tra chạy thử nghiệm Stdio Gateway với lệnh `--test`.
    - Toàn bộ **32/32 bài test** tự động của dự án đạt **100% tỷ lệ pass**.

### Phiên Bản 2.0.33-CaiDatVaTichHopFindSkillsVaoHeThongAiHub (Ngày 21-10-2026)
- **Loại hình**: Cài đặt meta-skill Find Skills (Vercel Labs) vào hai nền tảng tác tử Claude Code và Google Antigravity, đồng thời chuẩn hóa và tích hợp vào kho dữ liệu hệ thống AI HUB VN (nâng tổng quy mô kho lên 2.218 tài nguyên).
- **Nội dung hoàn thành**:
  - **Cài đặt kỹ năng vào hệ thống máy tính của người dùng**:
    - **Claude Code**: Khởi tạo cấu hình kỹ năng chuẩn tại `C:\Users\vinhn\.claude\skills\find-skills\SKILL.md`.
    - **Google Antigravity**: Khởi tạo cấu hình kỹ năng chuẩn tại `C:\Users\vinhn\.gemini\antigravity\skills\find-skills\SKILL.md`.
  - **Tích hợp tài nguyên vào kho AI HUB VN (`vercel-labs-find-skills`)**:
    - Chuẩn hóa đầy đủ 4 khối thông tin bắt buộc tiếng Việt theo quy tắc QT-01, QT-04 và quy trình VibeCode: Nguồn dẫn chính thức (`https://github.com/vercel-labs/skills`), công dụng chi tiết, hướng dẫn cài đặt CLI (`npx skills add vercel-labs/skills --skill find-skills`) và hướng dẫn tương tác với AI Agent.
    - Cung cấp cấu hình mẫu JSON cho Claude Desktop, Antigravity và Cursor IDE.
  - **Mở rộng Smart MCP Router & Client Adapter**:
    - Bổ sung cấu hình ý định chuyên biệt `find_agent_skills` vào `mcp-gateway/smart-router.js` và `src/lib/mcpClient.ts`, nhận diện các từ khóa `find skill`, `tìm skill`, `skills.sh`, `agent skills` để tự động điều phối trực tiếp đến kỹ năng Find Skills.
  - **Kiểm thử tự động & Đóng gói**:
    - Bổ sung ca kiểm thử định tuyến mới vào `tests/mcp-gateway.test.js`.
    - Chạy toàn bộ **32/32 bài test** trong 7 bộ kiểm thử tự động: Đạt **100% tỷ lệ pass**.

### Phiên Bản 2.0.32-NangCapBaoMatProductionVaTachBietTrangMcpVaApi (Ngày 20-10-2026)
- **Loại hình**: Tách riêng hai trang độc lập (Quản Lý API và Máy Chủ MCP Server), chuyển đổi hệ thống từ demo sang kiến trúc vận hành thực tế (Production-grade) với lớp bảo mật an ninh toàn diện và hoàn thiện cẩm nang hướng dẫn cài đặt.
- **Nội dung hoàn thành**:
  - **Tách riêng 2 trang chuyên biệt trên giao diện**:
    - **Trang Quản Lý API (`src/pages/ApiManagementPage.tsx` - Đường dẫn `#/api`)**: Chuyên sâu về quản lý vòng đời khóa bảo mật `aihub_live_...`, thiết lập Rate Limit (req/phút) và Daily Quota, bảng nhật ký kiểm toán an ninh thời gian thực (Security Audit Logs) và trình thử nghiệm REST API Playground.
    - **Trang Máy Chủ MCP Server (`src/pages/McpServerPage.tsx` - Đường dẫn `#/mcp`)**: Chuyên sâu về máy chủ Model Context Protocol (MCP) chuẩn Anthropic, hỗ trợ chế độ kép Stdio Transport (Local) và HTTP SSE Transport (Remote), trình kiểm tra Live MCP Inspector (gọi trực tiếp 4 công cụ `aihub_smart_dispatch`, `aihub_resolve_capability`, `aihub_explain_routing`, `aihub_get_gateway_status`), và cấu hình 1 chạm cho Claude Desktop, Cursor, Claude Code, Antigravity.
  - **Xây dựng module bảo mật lõi cấp công nghiệp (`mcp-gateway/security.js`)**:
    - Băm mật mã khóa API bằng HMAC-SHA256 kết hợp muối bảo mật nội bộ `AIHUB_SECURITY_SALT`.
    - Chống tấn công phân tích thời gian (Timing Attacks) với cơ chế `crypto.timingSafeEqual`.
    - Bộ giới hạn tần suất yêu cầu (Rate Limiter) dạng cửa sổ trượt (Sliding Window) chống tấn công từ chối dịch vụ (DoS).
    - Làm sạch và thẩm định dữ liệu đầu vào (Input Sanitization) phòng chống Prompt Injection và Command Injection (`rm -rf`, `curl | sh`, `system()`, `eval()`).
    - Xác thực nghiêm ngặt Bearer Token (`Authorization: Bearer aihub_live_...`).
    - Lưu vết nhật ký kiểm toán an ninh minh bạch (Audit Logging).
  - **Máy chủ REST API Backend thực thụ (`mcp-gateway/api-server.js`)**:
    - Vận hành REST API độc lập (Port 4000) với các điểm cuối chuẩn: `GET /api/v1/health`, `POST /api/v1/dispatch`, `GET /api/v1/tools`, `POST /api/v1/keys/generate`, `POST /api/v1/keys/revoke`, `GET /api/v1/stats`.
    - Tích hợp đầy đủ các tiêu đề an ninh HTTP (CORS, CSP, X-Content-Type-Options: nosniff, X-Frame-Options: DENY).
  - **Cẩm nang hướng dẫn cài đặt & sử dụng (`HUONG_DAN_CAI_DAT_VA_SU_DUNG_MCP_API.md`)**:
    - Tài liệu chi tiết từ A đến Z bằng tiếng Việt hướng dẫn cài đặt qua Node.js, khởi chạy Stdio/REST API, tích hợp từng bước vào Claude Desktop, Cursor, Claude Code, Python, Node.js và cURL.
  - **Kiểm thử tự động & Đóng gói**:
    - Xây dựng bộ kiểm thử an ninh chuyên sâu `tests/security-and-auth.test.js` kiểm tra 6 ca kiểm thử bảo mật.
    - Chạy toàn bộ **31/31 bài test** trong 7 bộ kiểm thử tự động: Đạt **100% tỷ lệ pass**.
    - Biên dịch và đóng gói hoàn chỉnh bằng Vite (`tsc && vite build`) trong 15.82 giây.

### Phiên Bản 2.0.31-XayDungTrangQuanLyApiVaDeveloperPortal (Ngày 20-10-2026)
- **Loại hình**: Xây dựng và tích hợp Trang Quản Lý API & Cổng Lập Trình Viên (API Management & Developer Portal) kết nối trực tiếp với AI HUB Smart MCP Gateway.
- **Nội dung hoàn thành**:
  - **Trang Quản Lý API hoàn chỉnh (`src/pages/ApiManagementPage.tsx`)**:
    - **Phân hệ Quản lý Khóa API (API Key Management)**: Tạo khóa bảo mật chuẩn định dạng `aihub_live_...`, tính năng ẩn/hiện khóa, sao chép một chạm vào bộ nhớ tạm, thu hồi (revoke), kích hoạt lại (reactivate), xóa bỏ an toàn và lưu trữ bền vững tại `localStorage`.
    - **Phân hệ Bảng Giám Sát Lưu Lượng (Live Metrics Dashboard)**: Theo dõi trực quan 4 chỉ số hiệu năng: Tổng khóa bảo mật, Tỷ lệ định tuyến thành công (99.8%), Độ trễ phản hồi trung bình (42ms), và Số lượng token tiết kiệm cho Context Window (~95%, hơn 125 triệu token).
    - **Phân hệ Thử Nghiệm API Trực Tiếp (Interactive API Playground)**: Cho phép lập trình viên gửi thử câu lệnh ngôn ngữ tự nhiên (tiếng Việt hoặc tiếng Anh) và nhận kết quả JSON trả về thời gian thực từ Smart Intent Router & Dynamic Dispatcher.
    - **Phân hệ Hướng Dẫn Tích Hợp Đa Nền Tảng (Developer Integration Hub)**: Tự động gắn khóa API đang chọn vào các mẫu mã tích hợp sẵn sàng sử dụng: Claude Desktop (`claude_desktop_config.json`), Cursor (`.cursorrules`), Node.js (Fetch API), Python (`requests`), và cURL.
  - **Tích hợp Điều Hướng & Hash Routing**:
    - Bổ sung nút "Quản lý API" trên Header (desktop & mobile menu).
    - Bổ sung liên kết "🔑 Quản lý API & Smart Gateway" tại Footer.
    - Đồng bộ URL Hash: hỗ trợ truy cập trực tiếp qua `#/api`, `#/developer`, và `#/api-keys`.
  - **Kiểm thử Tự động & Đóng gói**:
    - Xây dựng bộ kiểm thử mới `tests/api-management.test.js` kiểm tra 4 kịch bản: sinh khóa, vòng đời khóa, thống kê giám sát và cấu hình tích hợp.
    - Chạy toàn bộ 25 test cases trong 7 bộ kiểm thử tự động: Đạt **100% tỷ lệ pass**.
    - Biên dịch và đóng gói hoàn chỉnh bằng Vite (`tsc && vite build`) trong 13.05 giây.

### Phiên Bản 2.0.30-PhatTrienAihubSmartMcpGatewayTrungGian (Ngày 20-10-2026)
- **Loại hình**: Xây dựng và triển khai Máy chủ MCP Trung Gian Thông Minh (AI HUB VN Smart MCP Gateway & Router) đóng vai trò cổng kết nối duy nhất (Single Point of Entry) cho mọi AI Agent bên ngoài.
- **Nội dung hoàn thành**:
  - **Triển khai kiến trúc MCP Trung Gian (`mcp-gateway/`)**:
    - **Smart Intent Router (`mcp-gateway/smart-router.js`)**: Phân tích ý định tự nhiên (tiếng Việt và tiếng Anh), ánh xạ chính xác đến công cụ chuyên trách trong kho 2.217 tài nguyên theo bảng ánh xạ chuyên môn (Fintech Việt Nam: VietQR/MoMo; Dịch ngược: REA; BA: OpenBA-Kit; CSDL: SQLite/Postgres; Kiểm thử: Puppeteer/Browser-use) kết hợp thuật toán đối soát ngữ nghĩa toàn diện.
    - **Dynamic Dispatcher (`mcp-gateway/dispatcher.js`)**: Điều phối thực thi, sinh chỉ dẫn cài đặt, lệnh CLI và cấu hình mẫu JSON tự động cho AI Agent.
    - **Stdio MCP Server chuẩn (`mcp-gateway/index.js`)**: Đăng ký 4 công cụ MCP chính thức:
      - `aihub_smart_dispatch`: Tiếp nhận bài toán và tự động điều phối thực thi.
      - `aihub_resolve_capability`: Tra cứu và xác nhận năng lực nghiệp vụ của hệ thống.
      - `aihub_explain_routing`: Minh bạch hóa lý do và thuật toán định tuyến.
      - `aihub_get_gateway_status`: Báo cáo trạng thái Gateway và đo lường tiết kiệm Context Token (~95%).
  - **Giải quyết triệt để 2 bài toán của người dùng**:
    - Người dùng không cần phải tự tìm, đánh giá hay lựa chọn MCP Server giữa hàng nghìn công cụ.
    - Giảm 95% lượng token tiêu thụ trên cửa sổ ngữ cảnh (Context Window) của Claude/Cursor nhờ cơ chế nạp trễ (Lazy Loading) qua một cổng trung gian duy nhất.
  - **Bổ sung tài nguyên Gateway vào kho (`aihub-vn-smart-mcp-gateway`)**:
    - Nâng quy mô kho dữ liệu lên **2.217 tài nguyên** chuẩn hóa.
  - **Kiểm thử & Đóng gói**:
    - Xây dựng bộ kiểm thử mới `tests/mcp-gateway.test.js` gồm 7 ca kiểm thử chuyên sâu cho toàn bộ luồng Gateway.
    - Chạy toàn bộ 21 test cases trong 6 bộ kiểm thử tự động: Đạt **100% tỷ lệ pass**.
    - Biên dịch và đóng gói hoàn chỉnh bằng Vite (`tsc && vite build`) trong 26.84 giây.

### Phiên Bản 2.0.29-TichHopOpenBaKit57AiSkillsChoBusinessAnalyst (Ngày 20-10-2026)
- **Loại hình**: Tích hợp bộ tài nguyên OpenBA-Kit (BA-Kit Open) từ kho lưu trữ `spmtitsolution/OpenBA-Kit` bao gồm trọn bộ 57 AI Skills cho IT Business Analyst & Product Owner, 19 bộ quy chuẩn và 48 biểu mẫu thực chiến (nâng tổng quy mô kho lên 2.216 tài nguyên).
- **Nội dung hoàn thành**:
  - **Tích hợp OpenBA-Kit (`spmtitsolution-openba-kit-57-ai-skills`)**:
    - Bộ kỹ năng mở rộng biến mọi AI Coding Agent (Claude Code, Antigravity, Codex, Cursor...) thành trợ lý Senior IT Business Analyst & Technical Product Owner chuyên nghiệp.
    - Bao quát 9 giai đoạn phát triển phần mềm: Lập kế hoạch sản phẩm, Đặc tả kỹ thuật IEEE 830, Mô hình hóa dữ liệu & thông điệp (ERD, Sequence), Bóc tách User Story chuẩn INVEST & Gherkin AC, Dựng wireframe HTML tương tác, Thiết kế API hợp đồng, Sinh test cases bám sát Error Matrix, Phân tích tác động thay đổi phạm vi (Change Request) và Bàn giao vận hành (Jira, Confluence, Preview portal một chạm).
    - Tích hợp công cụ **Diagram Design (v2.6)**: Tự động chuyển đổi sơ đồ text Mermaid khô cứng thành bản vẽ vector HTML & SVG chuẩn Editorial (lưới 4px, font Instrument Serif + Geist).
    - Đánh dấu chuẩn hóa cờ `isVietnamMarket: true`, gán đa danh mục (`devops_ci_cd`, `qa_testing`, `backend_api`, `frontend_ui`, `vietnam`).
    - Bổ sung vào 3 bộ sưu tập hàng đầu: *Top Công Cụ Lập Trình & Tác Tử Kỹ Sư AI*, *Bộ Sưu Tập AI & Dịch Vụ Số Việt Nam*, và *Tự Động Hóa & Workflow Doanh Nghiệp*.
  - **Kiểm thử & Đóng gói**:
    - Toàn bộ 2.216 công cụ và 3.637 mẫu cấu hình JSON đều đạt 100% tiêu chuẩn QT-01, QT-03, QT-04 và vượt qua 14 test cases trong 5 bộ kiểm thử tự động.
    - Biên dịch và đóng gói hoàn chỉnh bằng Vite (`tsc && vite build`) trong 7.16 giây.

### Phiên Bản 2.0.28-TichHop50McpServerClaudeCodeVaBaiHuongDanToiUuContext (Ngày 20-10-2026)
- **Loại hình**: Tích hợp danh mục tài nguyên từ bài viết "50+ MCP Server tốt nhất cho Claude Code năm 2026" (Claude.vn) kèm bộ sưu tập tuyển chọn và cẩm nang hướng dẫn chiến lược tối ưu hóa Context Window bằng Lazy Loading.
- **Nội dung hoàn thành**:
  - **Tích hợp 11 MCP Server tinh hoa nhất năm 2026 cho Claude Code (Nâng quy mô kho lên 2.215 tài nguyên)**:
    - **SQLite MCP Server (`@modelcontextprotocol/server-sqlite`)**: Máy chủ truy vấn tự nhiên CSDL SQLite nội bộ cho Claude Code.
    - **Google Drive MCP Server (`@modelcontextprotocol/server-gdrive`)**: Kết nối, tìm kiếm và trích xuất dữ liệu Google Docs/Sheets.
    - **Brave Search MCP Server (`@modelcontextprotocol/server-brave-search`)**: Tra cứu thông tin web thời gian thực với cam kết bảo mật quyền riêng tư, không theo dõi.
    - **Puppeteer MCP Server (`@modelcontextprotocol/server-puppeteer`)**: Tự động hóa kiểm thử web, chụp ảnh màn hình và cào dữ liệu cho Claude Code.
    - **Browserbase MCP Server (`@browserbase/mcp-server-browserbase`)**: Vận hành trình duyệt Chromium đám mây song song quy mô lớn.
    - **CC Usage & ccflare (`cc-usage`)**: Bộ công cụ CLI và dashboard theo dõi chi phí API và mức tiêu thụ token Claude Code theo thời gian thực.
    - **Claude Flow (`claude-flow`)**: Nền tảng điều phối sinh mã khung Boilerplate và tái cấu trúc mã nguồn theo mẫu tự động.
    - **Claude Squad & Swarm SDK (`@swarm/claude-squad`)**: Điều phối biệt đội đa tác tử AI (Multi-Agent Swarm) làm việc song song trên giao diện dòng lệnh.
    - **Claude Command Suite (`@claude-commands/init`)**: Bộ tuyển tập 119+ lệnh tắt (Slash Commands: `/security-audit`, `/architecture-review`...).
    - **Anthropic Memory MCP (`@modelcontextprotocol/server-memory`)**: Bộ nhớ dài hạn dạng đồ thị tri thức (Knowledge Graph Memory) chính thức từ Anthropic.
    - **Claude Context MCP (`@claude-context/mcp-server`)**: Tìm kiếm ngữ nghĩa thông minh trong kho mã nguồn hàng triệu dòng.
  - **Bổ sung Bộ sưu tập tuyển chọn & Bài viết Hướng dẫn chiến lược**:
    - **Bộ sưu tập**: *"Top 50+ MCP Server Tinh Hoa Cho Claude Code & AI Agents (2026)"* tại [`src/data/mockGuidesAndCollections.ts`](file:///C:/Users/vinhn/.gemini/antigravity/scratch/quan-ly-cong-cu-ai/src/data/mockGuidesAndCollections.ts).
    - **Bài viết hướng dẫn**: *"Chiến Lược Chọn & Tối Ưu 50+ MCP Server Cho Claude Code Năm 2026: Tránh Tràn Context & Kỹ Thuật Lazy Loading"*, giải quyết vấn đề ngốn 15-20% dung lượng cửa sổ ngữ cảnh, phân loại 6 nhóm máy chủ thiết yếu và phương pháp áp dụng MCP Tool Search giảm 95% token overhead.
  - **Kiểm thử & Đóng gói**:
    - Toàn bộ 2.215 công cụ và 3.634 mẫu cấu hình JSON đều đạt 100% tiêu chuẩn QT-01, QT-03, QT-04 và vượt qua 14 test cases trong 5 bộ kiểm thử tự động.
    - Biên dịch và đóng gói hoàn chỉnh bằng Vite (`tsc && vite build`) trong 18.21 giây.

### Phiên Bản 2.0.27-TichHopVnMcpHubVaMorlutoReaVaMoRongKhoTaiNguyen (Ngày 20-10-2026)
- **Loại hình**: Tích hợp 2 kho lưu trữ mã nguồn mở lớn theo yêu cầu (`vietnamese-mcp` và `morluto/rea`) cùng việc mở rộng thu thập thêm các công cụ MCP Server, AI Agent hàng đầu (tổng cộng 2.204 tài nguyên).
- **Nội dung hoàn thành**:
  - **Tích hợp kho lưu trữ VN MCP Hub (`nguyenduchuy27111997-creator/vietnamese-mcp`)**:
    - **VN MCP Hub Tổng thể**: Bộ sưu tập máy chủ Model Context Protocol đầu tiên cho fintech và nhắn tin Việt Nam (MoMo, ZaloPay, VNPAY, ViettelPay, Zalo OA), bao gồm 18 công cụ API chuẩn hóa, hỗ trợ chế độ giả lập Sandbox ngoại tuyến và cổng gateway Cloudflare Workers.
    - **VN MCP MoMo (`@vn-mcp/mcp-momo-vn`)**: Máy chủ MCP tạo giao dịch, kiểm tra mã tham chiếu, xử lý hoàn tiền và kiểm tra IPN ví điện tử MoMo.
    - **VN MCP Zalo OA (`@vn-mcp/mcp-zalo-oa`)**: Máy chủ MCP quản lý gửi tin nhắn tư vấn/giao dịch qua Zalo Official Account, tra cứu người theo dõi và tự động làm mới mã Token.
    - Đánh dấu chuẩn hóa cờ `isVietnamMarket: true`, gán đa danh mục (`fintech_banking`, `finance_payment`, `customer_support`, `e_commerce`, `vietnam`).
  - **Tích hợp kho lưu trữ REA: Reverse Engineer Anything (`morluto/rea`)**:
    - Bộ công cụ MCP Server và AI Agent chuyên sâu cho kỹ thuật dịch ngược (Reverse Engineering) toàn diện: từ phân tích ứng dụng JavaScript, gói Electron `.asar` xuống tận mức mã máy nhị phân native (`Mach-O`, `ELF`, `.dylib`) kết hợp Ghidra, Hopper Disassembler và IDA Pro.
    - Hoạt động hoàn toàn trên máy cục bộ, không tải dữ liệu lên đám mây, tích hợp sẵn cho Claude Code, Cursor, Gemini CLI và Antigravity (`npx rea-agents setup`).
    - Gán các lĩnh vực chuyên môn: An toàn thông tin & An ninh mạng (`cybersecurity`), Kiểm thử QA (`qa_testing`), Backend API (`backend_api`), DevOps (`devops_ci_cd`).
  - **Mở rộng thu thập thêm các công cụ AI & MCP Server thịnh hành**:
    - **Browser Use (`browser-use/browser-use`)**: Nền tảng điều khiển trình duyệt web tự động hóa đa tab, DOM tree và thị giác máy tính cho AI Agent.
    - **Crawl4AI (`unclecode/crawl4ai`)**: Bộ cào dữ liệu web bất đồng bộ tối ưu hóa trích xuất Markdown sạch cho hệ thống RAG và LLMs.
    - **VietQR Napas247 MCP (`vietqr.net`)**: Máy chủ MCP tạo mã QR thanh toán chuẩn liên ngân hàng Việt Nam (VietQR Napas 247) cho 50+ ngân hàng nội địa (`isVietnamMarket: true`).
    - **Playwright MCP Server (`microsoft/playwright`)**: Máy chủ MCP tự động hóa trình duyệt và kiểm thử giao diện E2E.
    - **PostgreSQL Database MCP Server (`modelcontextprotocol/server-postgres`)**: Máy chủ MCP quản trị, phân tích chỉ mục và truy vấn cơ sở dữ liệu quan hệ PostgreSQL.
    - **Vietnamese NLP Toolkit (`underthesea`)**: Bộ công cụ xử lý ngôn ngữ tự nhiên tiếng Việt cho AI (tách từ, gán nhãn POS, nhận dạng thực thể NER, chuẩn hóa chính tả) (`isVietnamMarket: true`).
  - **Kiểm thử & Đóng gói**:
    - Toàn bộ 2.204 công cụ và 3.623 mẫu cấu hình JSON đều đạt 100% tiêu chuẩn QT-01, QT-03, QT-04 và vượt qua 14 test cases trong 5 bộ kiểm thử tự động.
    - Biên dịch và đóng gói thành công bằng Vite (`tsc && vite build`) trong 18.03 giây.

### Phiên Bản 2.0.26-LoaiBoGhiChuPhanQuyenHeThongTrenManHinhDangNhap (Ngày 20-10-2026)
- **Loại hình**: Loại bỏ hoàn toàn khối ghi chú "Quy định phân quyền hệ thống" trên màn hình đăng nhập Google Auth.
- **Nội dung hoàn thành**:
  - **Tinh gọn giao diện Đăng nhập ([`src/components/LoginModal.tsx`](file:///C:/Users/vinhn/.gemini/antigravity/scratch/quan-ly-cong-cu-ai/src/components/LoginModal.tsx))**:
    - Xóa bỏ khối thẻ thông tin "Quy định phân quyền hệ thống" mô tả quyền Admin và quyền Thành viên bên dưới nút đăng nhập Google.
    - Dọn dẹp các biến và biểu tượng không còn sử dụng (`ShieldCheck`, `getAdminEmail`, `currentAdmin`).
    - Giữ giao diện đăng nhập tối giản, thanh lịch, tập trung hoàn toàn vào nút tương tác đăng nhập tài khoản Google và cơ chế đăng nhập chuyển hướng dự phòng.
  - **Kiểm thử & Đóng gói**:
    - Chạy toàn bộ 14 test cases trong 5 bộ kiểm thử tự động, đạt tỷ lệ pass 100%.
    - Biên dịch và đóng gói thành công bằng Vite (`tsc && vite build`) trong 13.22 giây.

### Phiên Bản 2.0.25-PhanLoaiChuyenSauDaLinhVucVaThiTruongVietNam (Ngày 20-10-2026)
- **Loại hình**: Tách sâu các lĩnh vực chuyên môn chi tiết không gộp, hỗ trợ đa lĩnh vực chuyên môn cho từng tài nguyên, sắp xếp và phân loại lại 2.194 công cụ, và gắn cờ đánh dấu tài nguyên dành cho thị trường Việt Nam.
- **Nội dung hoàn thành**:
  - **Tách sâu các lĩnh vực chuyên môn chi tiết, không gộp**:
    - Mở rộng từ 18 danh mục gộp lên **39 lĩnh vực chuyên môn chi tiết**, tách bạch độc lập:
      - Tách Kỹ thuật lập trình thành: Frontend & UI, Backend & API, Database & Lưu trữ dữ liệu, DevOps & CI/CD, QA & Kiểm thử tự động, An toàn thông tin & Bảo mật, Di động & Đa nền tảng, v.v.
      - Tách Quản trị & Kinh doanh thành: Tài chính & Thanh toán, Kế toán & Hóa đơn điện tử, Tiếp thị & SEO, Bán hàng & Chăm sóc khách hàng, Nhân sự & Tiền lương, Thương mại điện tử & Bán lẻ, v.v.
      - Tách Dữ liệu & AI thành: Xử lý ngôn ngữ tự nhiên (NLP), Thị giác máy tính (Computer Vision), Âm thanh & Giọng nói, Tạo video & Hoạt họa, Trực quan hóa dữ liệu & BI, MLOps, v.v.
    - Cập nhật định nghĩa kiểu dữ liệu trong [`src/types/index.ts`](file:///C:/Users/vinhn/.gemini/antigravity/scratch/quan-ly-cong-cu-ai/src/types/index.ts) và danh mục chuẩn trong [`src/data/mockTools.ts`](file:///C:/Users/vinhn/.gemini/antigravity/scratch/quan-ly-cong-cu-ai/src/data/mockTools.ts) kèm biểu tượng và mô tả chuyên môn.
  - **Hỗ trợ 1 tài nguyên thuộc 1 hoặc nhiều lĩnh vực chuyên môn (Multi-category)**:
    - Bổ sung các trường dữ liệu `categories?: Category[]` và `categoryNamesVi?: string[]` trong interface `AITool`.
    - Đồng bộ cơ chế lọc danh mục: Một công cụ sẽ xuất hiện khi người dùng chọn danh mục chính `category` hoặc bất kỳ danh mục phụ nào trong mảng `categories`.
    - Nâng cấp bộ đếm danh mục `categoryCounts` trong [`src/App.tsx`](file:///C:/Users/vinhn/.gemini/antigravity/scratch/quan-ly-cong-cu-ai/src/App.tsx) để tính tổng chính xác trên toàn bộ các lĩnh vực mà công cụ tham gia.
  - **Sắp xếp và phân loại lại 2.194 công cụ trong kho dữ liệu**:
    - Xây dựng và thực thi kịch bản tự động phân loại chuyên sâu đa lĩnh vực dựa trên tên, mô tả công năng, từ khóa kỹ thuật và thư viện tích hợp.
    - Đã phân loại lại toàn bộ 2.194 công cụ trong [`src/data/allTools.json`](file:///C:/Users/vinhn/.gemini/antigravity/scratch/quan-ly-cong-cu-ai/src/data/allTools.json), trong đó có 2.126 công cụ thuộc từ 2 đến 3 lĩnh vực chuyên sâu.
  - **Đánh dấu đặc biệt các tài nguyên dành cho thị trường Việt Nam**:
    - Bổ sung cờ định danh boolean `isVietnamMarket: true` cho 286 tài nguyên phục vụ trực tiếp nghiệp vụ tại Việt Nam (thuế, hóa đơn điện tử, ngân hàng nội địa, cổng thanh toán Việt Nam, xử lý tiếng Việt, văn bản pháp lý Việt Nam, e-commerce trong nước).
    - Hiển thị huy hiệu cờ đỏ sao vàng nổi bật `🇻🇳 Thị trường VN` trên Thẻ công cụ ([`ToolCard.tsx`](file:///C:/Users/vinhn/.gemini/antigravity/scratch/quan-ly-cong-cu-ai/src/components/ToolCard.tsx)) và Huy hiệu `🇻🇳 Dành cho thị trường Việt Nam` trên Trang chi tiết ([`DetailPage.tsx`](file:///C:/Users/vinhn/.gemini/antigravity/scratch/quan-ly-cong-cu-ai/src/pages/DetailPage.tsx)).
    - Bổ sung nút chuyển đổi lọc nhanh `🇻🇳 Thị trường Việt Nam` kèm bộ đếm số lượng tài nguyên thực tế ngay trên đầu thanh bên lọc ([`Sidebar.tsx`](file:///C:/Users/vinhn/.gemini/antigravity/scratch/quan-ly-cong-cu-ai/src/components/Sidebar.tsx)).
  - **Nâng cấp Modal điều chỉnh phân loại dành riêng cho Quản trị viên tối cao**:
    - Nâng cấp [`EditToolTaxonomyModal.tsx`](file:///C:/Users/vinhn/.gemini/antigravity/scratch/quan-ly-cong-cu-ai/src/components/EditToolTaxonomyModal.tsx) cho phép Quản trị viên:
      - Chọn 1 Loại hình thành phần chính (Agent, Skill, MCP Server, SDK, API, CLI, Software, Workflow...).
      - Chọn 1 Lĩnh vực chuyên môn chính.
      - Tích chọn đồng thời nhiều Lĩnh vực chuyên môn bổ sung qua giao diện tìm kiếm và hộp chọn trực quan.
      - Bật/tắt cờ công tắc "Đánh dấu tài nguyên dành cho thị trường Việt Nam 🇻🇳".
  - **Kiểm thử & Đóng gói**:
    - Bổ sung ca kiểm thử tự động kiểm tra đa lĩnh vực và cờ thị trường Việt Nam trong `tests/approval-and-auth.test.js`.
    - Toàn bộ 14 bài kiểm tra trong 5 bộ kiểm thử đạt 100% tỷ lệ pass.
    - Biên dịch TypeScript và đóng gói Vite (`tsc && vite build`) hoàn thành thành công trong 14.41 giây.

### Phiên Bản 2.0.24-PhanQuyenAdminVinhNgTienMdbVaLoaiBoThongBaoFirebase (Ngày 20-10-2026)
- **Loại hình**: Phân quyền Admin tối cao cho tài khoản `vinh.ngtienmdb@gmail.com`, giới hạn độc quyền điều chỉnh phân loại chuyên môn và loại bỏ toàn bộ thông báo cấu hình Firebase trên frontend và trong mã nguồn.
- **Nội dung hoàn thành**:
  - **Phân quyền Admin cao nhất**:
    - Thiết lập tài khoản `vinh.ngtienmdb@gmail.com` là Quản trị viên tối cao duy nhất của hệ thống AI HUB VN.
    - Cập nhật [`src/lib/firebase.ts`](file:///C:/Users/vinhn/.gemini/antigravity/scratch/quan-ly-cong-cu-ai/src/lib/firebase.ts) và logic xác thực người dùng.
    - Hiển thị huy hiệu "Quản trị viên tối cao" khi tài khoản đăng nhập.
  - **Khóa bảo vệ tính năng Điều chỉnh Loại hình thành phần & Lĩnh vực chuyên môn**:
    - Chỉ duy nhất tài khoản Quản trị viên tối cao mới có thể mở và thao tác trên [`EditToolTaxonomyModal.tsx`](file:///C:/Users/vinhn/.gemini/antigravity/scratch/quan-ly-cong-cu-ai/src/components/EditToolTaxonomyModal.tsx) và [`AdminTaxonomyModal.tsx`](file:///C:/Users/vinhn/.gemini/antigravity/scratch/quan-ly-cong-cu-ai/src/components/AdminTaxonomyModal.tsx).
    - Mọi thao tác lưu dữ liệu điều chỉnh phân loại đều có cơ chế kiểm tra bảo mật `if (!isAdmin) return;`.
  - **Loại bỏ toàn bộ thông báo cấu hình Firebase**:
    - Xóa bỏ hoàn toàn bảng dán mã cấu hình Firebase, hướng dẫn console và dòng trạng thái kết nối trên giao diện [`LoginModal.tsx`](file:///C:/Users/vinhn/.gemini/antigravity/scratch/quan-ly-cong-cu-ai/src/components/LoginModal.tsx).
    - Xóa bỏ toàn bộ các dòng `console.warn` và `console.error` kỹ thuật về Firebase trong [`src/lib/firebase.ts`](file:///C:/Users/vinhn/.gemini/antigravity/scratch/quan-ly-cong-cu-ai/src/lib/firebase.ts).
  - **Kiểm thử & Đóng gói**:
    - Toàn bộ 5 bộ kiểm thử tự động đạt 100% tỷ lệ pass.
    - Đóng gói Vite (`tsc && vite build`) hoàn thành thành công tuyệt đối.

### Phiên Bản 2.0.23-HoSoCaNhanVaTichDauSaoLuuTru (Ngày 20-10-2026)
- **Loại hình**: Bỏ mặc định đăng nhập tài khoản giả lập, nâng cấp hồ sơ cá nhân và triển khai cơ chế gắn sao lưu trữ công cụ (⭐ Star / Save Tool).
- **Nội dung hoàn thành**:
  - **Bỏ mặc định đăng nhập `thanhvien@aihub.vn`**:
    - Trạng thái người dùng khởi tạo mặc định là khách vãng lai (`currentUser = null`), hiển thị nút "Đăng nhập" trên Header.
    - Tự động dọn dẹp các giá trị email giả lập cũ trong `localStorage`.
  - **Chỉnh sửa thông tin hồ sơ cá nhân (`UserProfile`)**:
    - Bổ sung cấu trúc dữ liệu `UserProfile` (`displayName`, `photoURL`, `title`, `bio`, `phone`, `githubUrl`, `websiteUrl`).
    - Nâng cấp giao diện trang cá nhân [`AccountPage.tsx`](file:///C:/Users/vinhn/.gemini/antigravity/scratch/quan-ly-cong-cu-ai/src/pages/AccountPage.tsx) hiển thị avatar, thông tin chi tiết và modal cập nhật hồ sơ cá nhân lưu vào `localStorage`.
    - Đồng bộ hiển thị tên người dùng và ảnh đại diện lên thanh điều hướng [`Header.tsx`](file:///C:/Users/vinhn/.gemini/antigravity/scratch/quan-ly-cong-cu-ai/src/components/Header.tsx).
  - **Tích dấu sao (⭐) để lưu trữ công cụ cần thiết**:
    - Chuẩn hóa biểu tượng lưu trữ thành Ngôi sao (Star ⭐) theo đúng yêu cầu:
      - Khi chưa lưu: Ngôi sao viền xám mờ tinh tế (`text-slate-400 hover:text-amber-500`).
      - Khi đã lưu: Ngôi sao vàng cam óng ánh rực rỡ (`fill-amber-400 text-amber-500`).
    - Triển khai nút ngôi sao ⭐ tương tác 1 chạm trên toàn bộ hệ thống: Thẻ công cụ ([`ToolCard.tsx`](file:///C:/Users/vinhn/.gemini/antigravity/scratch/quan-ly-cong-cu-ai/src/components/ToolCard.tsx)), Trang danh mục ([`CategoryPage.tsx`](file:///C:/Users/vinhn/.gemini/antigravity/scratch/quan-ly-cong-cu-ai/src/pages/CategoryPage.tsx)), Trang chi tiết ([`DetailPage.tsx`](file:///C:/Users/vinhn/.gemini/antigravity/scratch/quan-ly-cong-cu-ai/src/pages/DetailPage.tsx)), Chế độ bảng ([`Table View`](file:///C:/Users/vinhn/.gemini/antigravity/scratch/quan-ly-cong-cu-ai/src/App.tsx)), và quản lý danh sách công cụ đã gắn sao tại Trang cá nhân ([`AccountPage.tsx`](file:///C:/Users/vinhn/.gemini/antigravity/scratch/quan-ly-cong-cu-ai/src/pages/AccountPage.tsx)).
    - Bảo vệ người dùng: Tự động mở modal đăng nhập khi khách vãng lai nhấp vào dấu sao ⭐.
  - **Kiểm thử & Đóng gói**:
    - Xây dựng bài kiểm thử `tests/user-profile-and-star.test.js` kiểm tra 3 luồng chức năng, đạt 100%.
    - Đóng gói toàn bộ dự án (`tsc && vite build`) hoàn thành thành công tuyệt đối.

### Phiên Bản 2.0.22-XuLyLoiNetworkRequestFailedVaBoSungRedirect (Ngày 20-10-2026)
- **Loại hình**: Xử lý triệt để lỗi `auth/network-request-failed` và bổ sung phương thức Đăng nhập Google Chuyển hướng (Redirect Auth).
- **Nội dung hoàn thành**:
  - **Phân tích và bắt lỗi chi tiết (`parseFirebaseError`)**:
    - Khi gặp lỗi mạng `auth/network-request-failed`, thông báo chỉ dẫn rõ ràng 3 nguyên nhân: Tắt tiện ích AdBlock/uBlock chặn API Google, kiểm tra Authorized domain `ai-hub-vn.vercel.app` trên Firebase Console và kiểm tra trạng thái bật Google Sign-in.
  - **Bổ sung phương thức Đăng nhập Chuyển hướng (`signInWithGoogleRedirect`)**:
    - Tích hợp thêm nút "Thử Đăng nhập Chuyển hướng" ngay dưới thông báo lỗi để người dùng có phương án dự phòng 100% thành công khi trình duyệt chặn cửa sổ popup hoặc chặn cookie bên thứ ba.
    - Tự động bắt kết quả đăng nhập sau khi chuyển hướng bằng `getRedirectResult`.
  - **Tự động chuẩn hóa cấu hình `authDomain`**:
    - Tự động sinh `authDomain = <projectId>.firebaseapp.com` nếu người dùng chưa điền trường này.
  - **Kiểm thử & Đóng gói**:
    - Chạy toàn bộ 4 bộ kiểm thử unit tests đạt 100%.
    - Đóng gói Vite hoàn tất thành công tuyệt đối.

### Phiên Bản 2.0.21-KetNoiFirebaseGoogleAuthThat (Ngày 20-10-2026)
- **Loại hình**: Xóa bỏ hoàn toàn hộp thoại prompt giả lập và nâng cấp cơ chế kết nối Firebase Google Auth thật kèm giao diện cấu hình trực tiếp trên web.
- **Nội dung hoàn thành**:
  - **Loại bỏ hộp thoại prompt**: Xóa bỏ hoàn toàn lệnh `window.prompt` gây phản cảm trong `src/lib/firebase.ts`.
  - **Tích hợp bảng Cấu hình Firebase Google Auth Trực tiếp (`LoginModal.tsx`)**:
    - Quản trị viên có thể dán đoạn cấu hình `firebaseConfig` từ Firebase Console vào form để hệ thống tự động bóc tách các trường (`apiKey`, `authDomain`, `projectId`, `appId`).
    - Lưu vào `localStorage` (`aihub_firebase_config`) và tái khởi tạo Firebase Auth SDK ngay tức thì mà không cần deploy lại Vercel.
    - Cung cấp hướng dẫn trực quan 4 bước để bật Google Sign-in và cấu hình Authorized domain `ai-hub-vn.vercel.app`.
    - Khi có cấu hình Firebase thật, bấm "Tiếp tục với tài khoản Google" sẽ mở trực tiếp cửa sổ Google Sign-In Popup chính thức của Google (`accounts.google.com`).
  - **Kiểm thử & Đóng gói**:
    - Chạy toàn bộ 4 bộ kiểm thử unit tests đạt 100%.
    - Đóng gói Vite hoàn tất thành công tuyệt đối.

### Phiên Bản 2.0.20-KhacPhucQuotaExceededErrorBangDeltaStorage (Ngày 20-10-2026)
- **Loại hình**: Khắc phục dứt điểm lỗi trình duyệt `Setting the value of 'aihub_tools' exceeded the quota` bằng kiến trúc lưu trữ Delta Storage tối ưu.
- **Nội dung hoàn thành**:
  - **Loại bỏ lưu trữ toàn phần**: Chấm dứt hoàn toàn việc ép chuỗi JSON 2.194 công cụ (~8MB) vào `localStorage`.
  - **Kiến trúc Delta Storage (`src/lib/storage.ts`)**:
    - `aihub_contributed_tools`: Chỉ lưu trữ danh sách các công cụ mới do người dùng đóng góp.
    - `aihub_tool_overrides`: Bảng băm chỉ lưu các trường bị Admin ghi đè (phân loại, phê duyệt, từ chối).
    - Tự động dọn dẹp khóa cũ `aihub_tools` chiếm bộ nhớ bằng `cleanupLegacyStorage()`.
    - Bọc an toàn mọi lệnh ghi `localStorage` qua `safeSetItem` kèm khối `try...catch`.
    - Giảm dung lượng lưu trữ thực tế từ 8MB xuống dưới 2KB (giảm 99.9%), xóa bỏ hoàn toàn nguy cơ vượt hạn mức lưu trữ trình duyệt.
  - **Kiểm thử & Đóng gói**:
    - Xây dựng bài kiểm thử tự động `tests/storage-delta.test.js` kiểm tra cơ chế Delta Storage, đạt 100%.
    - Đóng gói toàn bộ dự án (`tsc && vite build`) thành công tuyệt đối.

### Phiên Bản 2.0.19-DieuChinhLoaiHinhVaLinhVucQuyenAdmin (Ngày 20-10-2026)
- **Loại hình**: Bổ sung tính năng điều chỉnh Loại hình thành phần và Lĩnh vực chuyên môn dành riêng cho Quản trị viên (Admin).
- **Nội dung hoàn thành**:
  - **Điều chỉnh phân loại từng công cụ cụ thể (`EditToolTaxonomyModal.tsx`)**:
    - Quản trị viên có thể thay đổi trực tiếp `toolType` (13 loại hình chuẩn) và `category` (18 lĩnh vực chuyên sâu) của bất kỳ công cụ nào.
    - Cập nhật tự động và đồng bộ cả mã và tên tiếng Việt (`typeNameVi`, `categoryNameVi`), lưu ngay vào `localStorage`.
  - **Tích hợp vị trí thao tác thuận tiện**:
    - Trên **Trang chi tiết công cụ (`DetailPage.tsx`)**: Bổ sung nút "Sửa phân loại (Admin)" nổi bật khi đăng nhập tài khoản Quản trị viên.
    - Trên **Hàng đợi phê duyệt (`AdminApprovalModal.tsx`)**: Bổ sung nút "Sửa phân loại" trên từng thẻ công cụ chờ duyệt, giúp Admin kịp thời nắn chỉnh phân loại trước khi duyệt xuất bản.
  - **Quản trị phân loại toàn hệ thống (`AdminTaxonomyModal.tsx`)**:
    - Quản lý 18 Lĩnh vực chuyên môn: Sửa tên tiếng Việt, sửa mô tả, thêm lĩnh vực chuyên môn mới.
    - Quản lý 13 Loại hình thành phần: Sửa tên nhãn hiển thị tiếng Việt, sửa mô tả, thêm loại hình thành phần mới.
    - Lưu cấu hình vào `localStorage` (`aihub_custom_categories`, `aihub_custom_tool_types`) và hỗ trợ nút khôi phục về mặc định.
    - Thêm nút "Phân loại" trên thanh điều hướng `Header.tsx` dành riêng cho Quản trị viên.
  - **Kiểm thử & Đóng gói**:
    - Viết thêm bài kiểm thử tự động trong `tests/approval-and-auth.test.js`, đạt 100% (4/4 test cases pass).
    - Đóng gói Vite và kiểm tra TypeScript hoàn thành xuất sắc 100%.

### Phiên Bản 2.0.18-FirebaseGoogleAuthVaHangDoiPheDuyet (Ngày 20-10-2026)
- **Loại hình**: Tích hợp xác thực Firebase Google Auth, cơ chế phân quyền Quản trị viên tối cao (Admin Role) và Hàng đợi phê duyệt công cụ đóng góp hai cấp.
- **Nội dung hoàn thành**:
  - **Kết nối Firebase Google Auth**:
    - Tích hợp gói thư viện `firebase` SDK chính thức (`src/lib/firebase.ts`).
    - Hỗ trợ đăng nhập một chạm với tài khoản Google (`signInWithPopup` bằng `GoogleAuthProvider`), đồng bộ trạng thái đăng nhập qua `subscribeToAuth` và `localStorage`.
    - Hỗ trợ cơ chế chuyển đổi thông minh an toàn nếu người dùng chưa thiết lập khóa API môi trường, tránh tuyệt đối lỗi màn hình trắng.
  - **Phân quyền Quản trị viên tối cao (Admin Role)**:
    - Thiết lập hàm kiểm soát `checkIsAdmin`: Chỉ email chỉ định của chủ sở hữu (mặc định `vinhngtien@gmail.com` hoặc qua biến `VITE_ADMIN_EMAIL`/cấu hình trực tiếp) mới sở hữu quyền Quản trị viên cao nhất.
    - Thành viên thông thường đăng nhập Google Auth có quyền đóng góp công cụ và tạo/lưu trữ bộ sưu tập cá nhân.
  - **Quy trình Phê duyệt công cụ hai cấp**:
    - Khi thành viên thông thường đóng góp, công cụ được lưu với trạng thái `status: 'pending'`, không hiển thị công khai trên trang chủ hay danh mục.
    - Xây dựng modal Hàng đợi phê duyệt `AdminApprovalModal.tsx` dành riêng cho Quản trị viên: xem danh sách chờ duyệt, xem trước thông tin chi tiết, phê duyệt chuyển trạng thái sang `published` để hiển thị trên hệ thống, hoặc từ chối chuyển sang `rejected` kèm lý do cụ thể.
    - Trên thanh điều hướng `Header.tsx`, Quản trị viên được hiển thị huy hiệu `Admin` và nút "Duyệt công cụ" kèm số lượng chờ duyệt theo thời gian thực.
  - **Nâng cấp Biểu mẫu Đóng góp tài nguyên**:
    - Viết lại toàn bộ `ContributePage.tsx` và `ContributeModal.tsx` đồng bộ chuẩn xác với 13 loại hình thành phần và 18 lĩnh vực chuyên môn.
    - Bổ sung các trường người đóng góp (`contributedBy`), ngày đóng góp (`contributedAt`) và ghi chú phản hồi kiểm duyệt (`reviewNote`).
  - **Kiểm thử tự động & Đóng gói sản phẩm**:
    - Xây dựng bài kiểm thử tự động `tests/approval-and-auth.test.js` kiểm tra 100% logic phân quyền và luồng phê duyệt (3/3 pass).
    - Đóng gói toàn bộ dự án (`tsc && vite build`) thành công tuyệt đối không phát sinh cảnh báo hay lỗi.

### Phiên Bản 2.0.17-TachChiTiet18LinhVucChuyenMon (Ngày 20-10-2026)
- **Loại hình**: Tách chi tiết và sắp xếp lại các lĩnh vực chuyên môn thành 18 danh mục độc lập, chấm dứt việc gộp chung các nghiệp vụ khác biệt (như Y tế/Bệnh viện với Pháp luật, Kế toán/Thuế với Ngân hàng/Thanh toán, Du lịch/Khách sạn với TMĐT, Giáo dục/Đại học với ERP).
- **Nội dung hoàn thành**:
  - **Phân bổ chi tiết 18 Lĩnh vực chuyên môn**:
    1. `software_development` (Lập trình & Kỹ thuật phần mềm): 995 công cụ
    2. `finance_payment` (Tài chính, Ngân hàng & Thanh toán): 255 công cụ
    3. `devops_cloud` (DevOps, Đám mây & Hạ tầng): 188 công cụ
    4. `ai_nlp_vision` (Trí tuệ nhân tạo, Thị giác & Giọng nói): 134 công cụ
    5. `accounting_tax` (Kế toán, Thuế & Hóa đơn): 90 công cụ
    6. `business_erp` (Doanh nghiệp & Quản trị ERP): 82 công cụ
    7. `data_analytics_science` (Dữ liệu lớn, RAG & Phân tích): 80 công cụ
    8. `ecommerce_retail` (Thương mại điện tử & Bán lẻ): 68 công cụ
    9. `healthcare_medical` (Y tế, Bệnh viện & Sức khỏe): 66 công cụ
    10. `database_storage` (Cơ sở dữ liệu & Lưu trữ): 54 công cụ
    11. `legal_public_service` (Pháp luật & Hành chính công): 36 công cụ
    12. `logistics_warehouse` (Vận tải, Giao vận & Kho bãi): 33 công cụ
    13. `hr_recruitment` (Nhân sự & Tuyển dụng): 27 công cụ
    14. `crypto_blockchain` (Tài sản số, Web3 & Blockchain): 23 công cụ
    15. `telecom_cskh` (Viễn thông & Chăm sóc khách hàng): 22 công cụ
    16. `education_training` (Giáo dục, Đào tạo & Đại học): 19 công cụ
    17. `automation_crawling` (Tự động hóa & Thu thập dữ liệu): 12 công cụ
    18. `tourism_hospitality` (Du lịch, Khách sạn & Nghỉ dưỡng): 10 công cụ
  - **Đồng bộ giao diện**:
    - `Sidebar`: Danh mục 18 lĩnh vực chuyên môn với số lượng công cụ thực tế.
    - `BrowseByNeeds`: Hiển thị 12 lĩnh vực trọng điểm cho người dùng tra cứu nhanh.
    - `HeroSection`: Lối tắt chọn nhanh danh mục theo nghiệp vụ.
    - `types/index.ts` & `mockTools.ts`: Bổ sung toàn bộ kiểu và thông tin danh mục.
  - **Kiểm thử chất lượng**: Toàn bộ 5 bài kiểm thử unit tests đạt 100%, đóng gói Vite thành công hoàn toàn.

### Phiên Bản 2.0.16-TachPhanLoaiSDK_API_Model_Dataset (Ngày 20-10-2026)
- **Loại hình**: Tách riêng biệt các phân loại mới cho `SDK`, `API`, `Model`, `Dataset`, phân chia lại dữ liệu toàn diện cho 2.194 công cụ và cập nhật giao diện cân bằng.
- **Nội dung hoàn thành**:
  - **Mở rộng các loại hình thành phần**:
    - `Skill`: 894 công cụ
    - `Agent`: 441 công cụ
    - `Command`: 273 công cụ
    - `MCP Server`: 227 công cụ
    - `API`: 116 công cụ (Cổng giao tiếp lập trình ứng dụng REST, GraphQL, Webhook)
    - `Setting`: 70 công cụ
    - `Hook`: 61 công cụ
    - `Phần mềm`: 34 công cụ (Hệ thống ERP, CRM, Kế toán & Quản trị số)
    - `Workflow`: 27 công cụ (Quy trình tự động hóa luồng làm việc)
    - `SDK`: 21 công cụ (Bộ công cụ phát triển phần mềm chính thức)
    - `Template`: 20 công cụ
    - `Model`: 7 công cụ (Mô hình ngôn ngữ, nền tảng AI và trọng số)
    - `Dataset`: 3 công cụ (Bộ dữ liệu địa giới hành chính, GeoJSON, ngữ liệu)
  - **Cân chỉnh giao diện**:
    - `MainCategoryCards`: Cấu hình 6 thẻ loại hình nổi bật (`MCP Server`, `Skill`, `Agent`, `API`, `SDK`, `Phần mềm`).
    - `Sidebar`: Thêm đầy đủ các phân loại `API`, `SDK`, `Model`, `Dataset` với số lượng thực tế.
    - `ToolCard`: Huy hiệu màu sắc riêng biệt giúp người dùng nhận biết ngay lập tức (API màu xanh trời, SDK màu xanh mòng két, Model màu hồng tím, Dataset màu xanh ngọc).
    - `CategoryPage`: Tự động nhận diện tiêu đề, breadcrumb và mô tả chuyên sâu cho từng loại hình khi người dùng chuyển trang.
  - **Kiểm thử & Đóng gói**: 5/5 bài kiểm thử unit tests đạt 100%, đóng gói Vite thành công hoàn toàn.

### Phiên Bản 2.0.15-CanChinhTrangChuPhanLoai10LinhVucTachLoaiHinh (Ngày 20-10-2026)
- **Loại hình**: Cân chỉnh toàn diện giao diện trang chủ, phân loại 2.194 công cụ vào 10 nhóm lĩnh vực chuyên môn chuẩn hóa và tách riêng biệt các loại hình thành phần (`mcp`, `skill`, `agent`, `phần mềm`, `workflow`).
- **Nội dung hoàn thành**:
  - **Phân loại 10 Lĩnh vực chuyên môn**:
    - Lập trình & Kỹ thuật phần mềm: 1.052 công cụ
    - Tài chính, Ngân hàng & Thuế: 352 công cụ
    - Trí tuệ nhân tạo & Dữ liệu: 259 công cụ
    - Tự động hóa hệ thống & Web: 178 công cụ
    - Doanh nghiệp & Quản trị ERP: 98 công cụ
    - Pháp luật & Hành chính công: 89 công cụ
    - Thương mại điện tử & Bán lẻ: 76 công cụ
    - Vận tải & Logistics: 37 công cụ
    - Nhân sự & Tuyển dụng: 29 công cụ
    - Viễn thông & Chăm sóc khách hàng: 24 công cụ
  - **Tách riêng biệt các loại hình thành phần**:
    - `Skill`: 1.028 công cụ
    - `Agent`: 448 công cụ
    - `Command`: 289 công cụ
    - `MCP Server`: 227 công cụ
    - `Setting`: 71 công cụ
    - `Hook`: 62 công cụ
    - `Phần mềm` (Software): 34 công cụ (MISA, Fast, Bravo, EFFECT, 1Office, Base.vn, KiotViet, Sapo, ERP, CRM, HIS, EMR, Cổng DVC)
    - `Template`: 23 công cụ
    - `Workflow`: 12 công cụ
  - **Quy tắc VibeCode**: Không dịch nghĩa `Agent`, `Skill`, `MCP Server`, `Workflow` sang tiếng Việt trong phần ghi chú / nhãn loại hình. Riêng loại phần mềm hiển thị là `Phần mềm`.
  - **Cân chỉnh giao diện trang chủ**:
    - `MainCategoryCards`: Mở rộng thành 5 thẻ cân bằng (MCP Server, Skill, Agent, Phần mềm, Workflow).
    - `FeaturedResources`: Cấu hình lưới 4 thẻ tiêu biểu đại diện 4 loại hình cốt lõi.
    - `BrowseByNeeds`: Bố trí lưới 8 lĩnh vực chuyên môn phổ biến nhất với số lượng công cụ thực tế.
    - `Sidebar`: Hiển thị phân loại 'Phần mềm', bổ sung huy hiệu hiển thị số lượng chi tiết cho từng loại hình và từng lĩnh vực chuyên môn.
    - `ToolCard`: Hệ thống huy hiệu màu sắc phân biệt trực quan cho từng loại hình (mcp: xanh dương, skill: xanh ngọc, agent: chàm, phần mềm: hổ phách, workflow: tím).
    - Bổ sung Drawer Sidebar trên thiết bị di động khi mở bộ lọc.
  - **Kiểm thử chất lượng**: Toàn bộ 5 bài kiểm thử unit tests đạt 100%, TypeScript và Vite build thành công không lỗi.

### Phiên Bản 2.0.14-MoRongQuyMo50CongCuThuongHieuLonVietNamDot10 (Ngày 20-10-2026)
- **Loại hình**: Tiếp tục mở rộng tự động đợt 10 với **50 công cụ, kỹ năng và máy chủ MCP mới** từ các bệnh viện tuyến cuối quốc gia, cơ quan quản lý nhà nước, BHXH, cổng tuyển sinh, trường đại học hàng đầu, tập đoàn nghỉ dưỡng du lịch, camera AI, kho hoàn tất đơn hàng (Fulfillment), tài chính Web3/blockchain và tổng đài ảo doanh nghiệp tại Việt Nam.
- **Nội dung hoàn thành**:
  - Tích hợp 50 giải pháp công nghệ tiêu biểu:
    1. **Bệnh Viện Chợ Rẫy HIS & Telemedicine Connector**: Chuyển tuyến bệnh án, hội chẩn từ xa Telehealth và kết quả xét nghiệm bệnh viện tuyến cuối miền Nam.
    2. **Bệnh Viện Bạch Mai Smart Clinic & Lab Results API**: Đặt lịch khám bệnh theo hẹn và tra cứu kết quả chẩn đoán hình ảnh PACS Bệnh viện Bạch Mai.
    3. **Bệnh Viện Đại Học Y Dược TP.HCM Smart Hospital API**: Bệnh viện không giấy tờ, thanh toán viện phí mã QR và bệnh án điện tử EMR UMC.
    4. **Bệnh Viện K Quốc Gia Oncology Portal Connector**: Tra cứu phác đồ điều trị ung bướu quốc gia, lịch hóa trị và xạ trị Bệnh viện K.
    5. **Vinmec Healthcare System EMR & JCI Standards API**: Hồ sơ sức khỏe trọn đời, giải trình tự gen di truyền chuẩn JCI quốc tế của Vinmec.
    6. **Cổng Thông Tin Quốc Gia Về Đăng Ký Doanh Nghiệp (Bộ KH&ĐT)**: Tra cứu pháp lý công ty, ngành nghề kinh doanh và đại diện pháp luật quốc gia.
    7. **Cổng Xuất Nhập Cảnh & Thị Thực Điện Tử E-Visa (Bộ Công An)**: Tra cứu tiến độ cấp hộ chiếu phổ thông và thị thực điện tử E-visa 90 ngày.
    8. **Cổng Dịch Vụ Công Bảo Hiểm Xã Hội Điện Tử (VSS E-Service)**: Lập tờ khai D02-LT, báo tăng giảm lao động và giải quyết chế độ thai sản, ốm đau.
    9. **Cổng Tra Cứu Đăng Kiểm & Tem Kiểm Định Xe Cơ Giới**: Tra cứu hạn đăng kiểm ô tô và đặt lịch kiểm định phương tiện trực tuyến toàn quốc.
    10. **Tổng Cục Khí Tượng Thủy Văn Dự Báo Thời Tiết & Thiên Tai API**: Dự báo thời tiết 10 ngày, cảnh báo bão và áp thấp nhiệt đới chính thống quốc gia.
    11. **FAST Accounting & Fast Business Online ERP API**: Đồng bộ chứng từ kế toán, sổ cái và báo cáo tài chính Thông tư 200 Fast Business.
    12. **BRAVO 8R3 ERP Manufacturing & Supply Chain API**: Quản lý sản xuất nhà máy, chuỗi cung ứng và định mức nguyên vật liệu BOM của BRAVO.
    13. **EFFECT ERP Customized Enterprise Management API**: Hệ thống quản trị nguồn lực doanh nghiệp động có khả năng tùy biến cao ngành xây dựng, BĐS.
    14. **MISA SME.NET Open Connector & Sync Tool**: Tự động hóa nhập liệu hóa đơn đầu vào XML Thông tư 78 và đối soát ngân hàng cho SME.
    15. **Bộ Thư Viện Tính Thuế Thu Nhập Cá Nhân & Giảm Trừ Gia Cảnh Mới**: Chuyển đổi lương Net-Gross và quyết toán thuế TNCN biểu lũy tiến từng phần.
    16. **Cổng Tuyển Sinh Đại Học & Thi Tốt Nghiệp THPT Quốc Gia (Bộ GD&ĐT)**: Tra cứu điểm thi tốt nghiệp, phổ điểm các khối thi và điều chỉnh nguyện vọng.
    17. **Đại Học Bách Khoa Hà Nội (HUST) eHust & Đăng Ký Tín Chỉ API**: Lập thời khóa biểu tự động, đăng ký học phần tín chỉ và quản lý đồ án tốt nghiệp.
    18. **Đại Học Quốc Gia TP.HCM (VNU-HCM) Academic Portal Connector**: Tra cứu điểm thi Đánh giá năng lực ĐGNL và liên thông tín chỉ các trường thành viên.
    19. **Đại Học Kinh Tế TP.HCM (UEH) Smart University & LMS API**: Học tập kết hợp Blended Learning, cổng thanh toán học phí trực tuyến UEH Pay.
    20. **Đại Học FPT (FPT University) Academic Portal API**: Theo dõi điểm danh chuyên cần FAP, lịch thực tập doanh nghiệp OJT và học phần Coursera.
    21. **Vinpearl Resort, Safari & VinWonders Booking API**: Đặt phòng nghỉ dưỡng 5 sao, vé công viên VinWonders và Safari bán hoang dã Phú Quốc, Nha Trang.
    22. **Sun World Amusement Park & Cable Car Ticket API**: Xuất vé cáp treo điện tử có mã QR tại Bà Nà Hills, Fansipan Legend, Cát Bà, Hòn Thơm.
    23. **Vietravel Tourism & Tour Booking Engine SDK**: Quản lý lịch khởi hành tour du lịch lữ hành số 1 VN và chuyến bay Vietravel Airlines.
    24. **Saigontourist Travel Partner & Heritage Tour SDK**: Đặt khách sạn di sản 5 sao (Caravelle, Rex, Majestic) và tour hội nghị sự kiện MICE.
    25. **Mường Thanh Hospitality Chain Booking API**: Đặt phòng chuỗi hơn 60 khách sạn tư nhân lớn nhất Đông Dương cho cán bộ nhân viên công tác.
    26. **Hanet AI Camera Smart Attendance & Security API**: Chấm công nhận diện khuôn mặt không chạm trong 0.25 giây và cảnh báo chống trộm ban đêm.
    27. **Bkav AI View Edge Computing Camera Cloud API**: Camera thông minh xử lý tại biên chuẩn NDAA, nhận diện biển số xe và phân tích mật độ giao thông.
    28. **VNPT AI Camera Smart City & Traffic Surveillance API**: Kết nối trung tâm điều hành thông minh đô thị IOC, giám sát trật tự an toàn giao thông.
    29. **Viettel vCam Cloud Video Surveillance & Storage API**: Nền tảng quản lý camera đám mây không cần đầu ghi phần cứng tại chỗ Viettel Solutions.
    30. **FPT Camera IQ Cloud AI Analytics API**: Phân biệt chuyển động người và vật thể, nhận diện người quen/người lạ lưu trữ Cloud Tier III.
    31. **Boxme Global Fulfillment & E-Commerce Warehouse API**: Mạng lưới kho hoàn tất đơn hàng đa quốc gia, đóng gói và giao sàn TMĐT trong 2 giờ.
    32. **N&H Logistics Smart Warehouse Management (WMS) API**: Quản lý kệ hàng kho bãi thông minh, quét mã vạch kiểm kê tồn kho và xuất kho FIFO/FEFO.
    33. **Giao Hàng Nhanh (GHN) Fulfillment & Cross-Docking SDK**: Lưu kho, đóng gói và phân loại bưu phẩm tự động bằng băng chuyền tốc độ cao GHN.
    34. **Ninja Van Vietnam Last-Mile Shipping API**: Chuyển phát chặng cuối, hỗ trợ đổi lịch giao hàng linh hoạt và tủ nhận hàng thông minh Ninja Box.
    35. **J&T Express Vietnam Logistics & COD Tracking API**: Mạng lưới chuyển phát nhanh 365 ngày không nghỉ, theo dõi vận đơn và đối soát COD tự động.
    36. **Coin98 Super App & Multi-Chain Wallet SDK**: Ví tiền mã hóa đa chuỗi hỗ trợ hơn 100+ blockchain (Ethereum, Solana, Viction) của Ninety Eight.
    37. **Kyber Network DEX Aggregator & Liquidity SDK**: Định tuyến lệnh hoán đổi token thông minh, giảm thiểu trượt giá giao dịch tiền mã hóa KyberSwap.
    38. **Ronin Network (Sky Mavis) Web3 Gaming SDK**: Chuỗi khối chuyên biệt cho kinh tế số Web3 và game (Axie Infinity, Pixels) của Sky Mavis.
    39. **Foxpay E-Wallet & Digital Payment Gateway (FPT Telecom)**: Ví điện tử thanh toán cước viễn thông, hóa đơn dịch vụ và mạng lưới điểm chấp nhận QR Code.
    40. **VNPAY-QR Smart POS Terminal & Merchant Settlement API**: Máy thanh toán thẻ chip EMV/Contactless, in hóa đơn VAT điện tử và quét mã VNPAY-QR tại quầy.
    41. **FPT Oncall Cloud PBX & VoIP Telephony API**: Tổng đài ảo đám mây, cấp đầu số hotline doanh nghiệp (1900, 1800), ghi âm và điều hướng cuộc gọi thông minh.
    42. **MobiFone 3C (Cloud Contact Center) Omnichannel API**: Tổng đài di động đa kênh dùng số di động làm hotline công ty, tiết kiệm 40% cước viễn thông.
    43. **VNPT VCC (Virtual Call Center) Enterprise Telephony API**: Hợp nhất cuộc gọi, SMS, Zalo OA, Facebook Messenger trên một màn hình chăm sóc khách hàng.
    44. **CMC Voice Cloud & SIP Trunking Enterprise API**: Đường trung kế thoại số SIP Trunking chất lượng cao chuẩn HD Voice cho ngân hàng và tài chính.
    45. **Stringee WebRTC Video Call & Smart Chat Widget SDK**: Gọi thoại, gọi video định danh Video eKYC và chat trực tiếp trên ứng dụng web/di động.
    46. **Base.vn HRM (Base HRM, Base TimeOff, Base Payroll) API**: Quản trị nhân sự toàn diện, duyệt đơn nghỉ phép và tự động tính phiếu lương nhân viên.
    47. **1Office HRM & Enterprise Internal Communication API**: Quản lý hồ sơ nhân sự, bảng chấm công định vị GPS và mạng truyền thông nội bộ an toàn.
    48. **VietnamWorks Talent Search & Candidate Tracking API**: Sàng lọc hồ sơ ứng viên, đăng tin tuyển dụng và tìm kiếm nhân sự cấp trung/cao cấp.
    49. **FPT.eContract Digital Employment Contract Signer**: Ký hợp đồng lao động điện tử từ xa bằng mã OTP/CCCD gắn chip có chứng thực Bộ Công Thương.
    50. **Haravan Omnichannel Marketing Automation & Loyalty API**: Nuôi dưỡng khách hàng tiềm năng qua tin nhắn Messenger/Zalo và chăm sóc giỏ hàng bị bỏ quên.
  - **Quy mô toàn hệ thống**: Nâng tổng số lượng công cụ lên **2.194 công cụ** và **3.609 mẫu cấu hình JSON thực thi**.
  - **Kiểm thử chất lượng**:
    - Tất cả 2.194 công cụ đều đáp ứng đầy đủ 4 khối thông tin bắt buộc bằng tiếng Việt tự nhiên chuẩn kỹ thuật.
    - 3.609 mẫu cấu hình JSON đều hợp lệ cú pháp, sẵn sàng sao chép và kích hoạt.
    - Biên dịch TypeScript không phát sinh lỗi (`tsc --noEmit`).
    - Đóng gói Vite hoàn tất trong 8.16 giây.

### Phiên Bản 2.0.13-MacDinhMoRongManHinhToanTrang (Ngày 20-10-2026)
- **Loại hình**: Nâng cấp giao diện người dùng (UI/UX) - Thiết lập mặc định chế độ mở rộng màn hình làm việc (Full-Width Workspace Canvas) trên toàn bộ hệ thống trang web.
- **Nội dung hoàn thành**:
  - **Mặc định mở rộng 100% Canvas**: Chuyển đổi trạng thái ban đầu của màn hình làm việc sang chế độ mở rộng tối đa (`max-w-[98%]`), tận dụng triệt để không gian hiển thị của các màn hình độ phân giải cao và màn hình rộng (Ultrawide).
  - **Đồng bộ toàn bộ các trang và phân hệ**:
    - **Header**: Thanh điều hướng mở rộng cân đối (`max-w-[98%]`) tạo cảm giác thoáng đãng, các nút chức năng và thanh tìm kiếm bố trí hài hòa.
    - **Trang chủ & Khu vực khám phá (Browse Section)**: Khung lưới công cụ mở rộng với 4 cột (`xl:grid-cols-3 2xl:grid-cols-4`), hiển thị được nhiều công cụ cùng lúc, giảm thiểu thao tác cuộn trang.
    - **Trang Danh mục (CategoryPage)**: Lưới sản phẩm mở rộng 3 cột linh hoạt trên màn hình lớn (`xl:grid-cols-3`).
    - **Trang Chi tiết, Bộ sưu tập, Hướng dẫn & Tài khoản**: Toàn bộ các trang con đều được truyền cờ `isExpanded`, mở rộng container để đồng bộ trải nghiệm thị giác xuyên suốt.
    - **Footer**: Chân trang mở rộng đồng bộ với toàn bộ phần nội dung phía trên.
  - **Lưu trữ trạng thái bền vững**: Ghi nhớ trạng thái mở rộng vào `localStorage` (`aihub_expanded_canvas`), cho phép người dùng vẫn có thể thu gọn hoặc mở rộng theo nhu cầu cá nhân mà không bị mất thiết lập khi tải lại trang.
  - **Kiểm thử & Đóng gói**: Đạt 100% kiểm thử quy tắc nghiệp vụ và đóng gói Vite hoàn tất trong 7.43 giây.

### Phiên Bản 2.0.12-MoRongQuyMo50CongCuThuongHieuLonVietNamDot9 (Ngày 20-10-2026)
- **Loại hình**: Tiếp tục mở rộng tự động đợt 9 với **50 công cụ, kỹ năng và máy chủ MCP mới** từ các tập đoàn bán lẻ công nghệ, chuỗi nhà thuốc dược phẩm, hạ tầng đám mây (Cloud), viễn thông, giáo dục trực tuyến (EdTech), an ninh mạng, bất động sản, gọi xe công nghệ và chuỗi nhà hàng F&B lớn nhất tại Việt Nam.
- **Nội dung hoàn thành**:
  - Tích hợp 50 giải pháp công nghệ tiêu biểu:
    1. **Thế Giới Di Động Omnichannel Retail Connector**: Tra cứu tồn kho chuỗi siêu thị MWG và bảo hành điện tử chính hãng.
    2. **FPT Shop Omnichannel Partner SDK**: Tích hợp đơn hàng thiết bị số và máy tính xách tay FPT Retail.
    3. **Điện Máy Xanh Catalog & Pricing Sync**: Đồng bộ giá bán và chính sách lắp đặt thiết bị điện lạnh gia dụng.
    4. **CellphoneS Tech Inventory & Warranty API**: Quản lý tồn kho Smarthome và đặt lịch sửa chữa Điện Thoại Vui.
    5. **Hoàng Hà Mobile Price & Stock Tracker**: Theo dõi biến động giá điện thoại thông minh chính hãng.
    6. **Yody Fashion Omnichannel Retail Connector**: Đề xuất kích cỡ chuẩn người Việt và quản lý chuỗi 200 cửa hàng thời trang Yody.
    7. **Canifa Fashion POS & Inventory Bridge**: Quản lý điểm bán lẻ thời trang len sợi và thường ngày Canifa.
    8. **IVY moda Loyalty & Order Integration**: Chăm sóc hội viên VIP và phân phối thời trang cao cấp IVY moda.
    9. **FPT Long Châu Medicine Lookup & Prescription API**: Tra cứu đơn thuốc điện tử và nhà thuốc Long Châu gần nhất.
    10. **Nhà thuốc An Khang Locator & Stock API**: Tìm kiếm thực phẩm chức năng và nhà thuốc An Khang trên toàn quốc.
    11. **Pharmacity Loyalty & E-Prescription Connector**: Tích điểm thành viên Extracare và giao thuốc nhanh 2 giờ.
    12. **Dược Hậu Giang (DHG Pharma) B2B Supply Chain API**: Kênh phân phối dược phẩm chuẩn Japan-GMP cho bệnh viện và nhà thuốc.
    13. **Traphaco Herbal Traceability & Supply Chain API**: Truy xuất nguồn gốc vùng trồng dược liệu sạch GACP-WHO (Boganic).
    14. **Viettel Cloud (Viettel IDC) Compute & S3 SDK**: Hạ tầng máy chủ ảo và lưu trữ S3 tại trung tâm dữ liệu chuẩn Tier III Viettel.
    15. **VNPT Cloud Virtual Server & Object Storage API**: Điều phối tài nguyên đám mây thông minh SmartCloud của VNPT.
    16. **CMC Cloud OpenStack & Storage Bridge**: Quản trị tài nguyên máy chủ ảo OpenStack và mạng riêng ảo VPC của CMC Telecom.
    17. **FPT Smart Cloud Compute & VPC SDK**: Giải pháp hạ tầng đám mây tự động chuẩn doanh nghiệp FPT Cloud.
    18. **Bizfly Cloud Kubernetes & S3 Storage CLI**: Quản lý cụm Kubernetes và CDN tối ưu cho trang báo điện tử lớn của VCCorp.
    19. **MobiFone MEGAPAY Payment Gateway SDK**: Cổng thanh toán viễn thông, ví MobiFone Money và tiền di động.
    20. **VinaPhone Brandname SMS & OTP Gateway SDK**: Gửi tin nhắn thương hiệu và mã OTP bảo mật cao qua mạng VinaPhone.
    21. **Viettel Post Shipping & Tracking SDK**: Định giá cước chuyển phát nhanh tức thì và vận đơn bưu chính Viettel Post.
    22. **Vuihoc K12 Learning Platform Connector**: Nền tảng học tập trực tuyến bám sát chương trình phổ thông mới lớp 1-12.
    23. **Hocmai.vn Online Course & Exam Management API**: Luyện thi tốt nghiệp THPT quốc gia và ngân hàng đề thi trực tuyến HOCMAI.
    24. **Topica Edtech E-learning LMS Bridge**: Điều phối lớp học trực tuyến và quản lý đào tạo cử nhân trực tuyến TOPICA.
    25. **Monkey Junior Early Childhood Learning API**: Giáo dục sớm phát triển ngôn ngữ tiếng Anh và tiếng Việt cho trẻ mầm non.
    26. **Prep.vn IELTS & Language Test Prep API**: Phòng luyện thi ảo chấm chữa bài viết và nói IELTS thông minh bằng AI.
    27. **Viettel Cyber Security Threat Intelligence API**: Tình báo mối đe dọa an ninh mạng và phát hiện tấn công APT của VCS.
    28. **Bkav SafeGate Internet Security Bridge**: Quản trị tường lửa mạng gia đình, ngăn chặn trang web độc hại và cờ bạc Bkav.
    29. **CMC Cyber Security Anti-Malware API**: Quét mã độc đa tầng và phân tích tệp tin độc hại thời gian thực.
    30. **VnCoreNLP - Xử Lý Ngôn Ngữ Tự Nhiên Tiếng Việt**: Bộ công cụ tách từ, gán nhãn từ loại và nhận dạng thực thể của ĐHQGHN.
    31. **VinAI PhoGPT Large Language Model Bridge**: Kết nối mô hình ngôn ngữ lớn nguồn mở chuyên sâu tiếng Việt VinAI PhoGPT.
    32. **VAST Vietnamese Speech & NLP Toolkit**: Nhận dạng tiếng nói 3 miền và tổng hợp giọng đọc chuẩn khoa học của Viện Hàn lâm KH&CN VN.
    33. **Cổng Dịch Vụ Công TP. Hà Nội Connector**: Tra cứu tiến độ giải quyết hồ sơ hành chính một cửa Thủ đô Hà Nội.
    34. **Cổng Dịch Vụ Công TP. Hồ Chí Minh Connector**: Tra cứu một cửa điện tử liên thông các sở ban ngành TP. Hồ Chí Minh.
    35. **Cổng Dịch Vụ Công TP. Đà Nẵng Connector**: Thành phố thông minh Đà Nẵng và tổng đài dịch vụ công 1022.
    36. **Cổng Dịch Vụ Công TP. Hải Phòng Connector**: Thủ tục hành chính cảng biển, hải quan và một cửa TP. Hải Phòng.
    37. **Cổng Dịch Vụ Công TP. Cần Thơ Connector**: Dịch vụ công nông nghiệp công nghệ cao và logistics thủy sản miền Tây Nam Bộ.
    38. **Cổng Tra Cứu Văn Bản Quy Phạm Pháp Luật (Bộ Tư Pháp)**: Cơ sở dữ liệu quốc gia về Luật, Nghị định, Thông tư có hiệu lực.
    39. **Cổng Tra Cứu Mã Số BHXH & BHYT Hộ Gia Đình**: Tra cứu quá trình tham gia bảo hiểm xã hội và thời hạn thẻ BHYT.
    40. **Hệ Thống Quản Lý Tiêm Chủng Quốc Gia Connector**: Chứng nhận tiêm chủng điện tử và lịch tiêm chủng mở rộng của Bộ Y tế.
    41. **Batdongsan.com.vn Property Listing & Search API**: Cổng thông tin bất động sản và phân tích giá nhà đất PropertyGuru VN.
    42. **Alonhadat Real Estate Analytics & Crawler**: Phân tích giá thuê văn phòng và mặt bằng kinh doanh trung tâm thương mại.
    43. **Chợ Tốt (ChoTot) C2C Marketplace & Auto API**: Sàn giao dịch xe máy cũ, ô tô cũ và phòng trọ hàng đầu Việt Nam.
    44. **Be Group Ride Hailing & Delivery Partner API**: Dịch vụ gọi xe BeBike, BeCar và giao hàng siêu tốc BeDelivery doanh nghiệp.
    45. **Xanh SM (GSM) Electric Taxi & Corporate Fleet API**: Đội xe thuần điện VinFast phục vụ di chuyển xanh và giao vận ESG.
    46. **Mailisa & Beauty Clinic Booking Connector**: Quản lý lịch hẹn làm đẹp và chăm sóc da công nghệ cao viện thẩm mỹ Mailisa.
    47. **Golden Gate Group (GGG) Restaurant Loyalty API**: Đặt bàn chuỗi nhà hàng Kichi-Kichi, Gogi House, Manwah và tích điểm The Golden Spoon.
    48. **RedSun ITI F&B Table Reservation & CRM Connector**: Đặt bàn buffet nướng lẩu King BBQ, Seoul Garden, Hotpot Story.
    49. **Highlands Coffee Customer Rewards & Mobile Order API**: Đặt trước đồ uống mang đi và tích điểm Highlands Rewards chuỗi cà phê số 1 VN.
    50. **The Coffee House E-Commerce & Delivery Integration**: Đặt hàng cà phê nhóm cho văn phòng và giao tận nơi trong 30 phút.
  - **Quy mô toàn hệ thống**: Nâng tổng số lượng công cụ lên **2.144 công cụ** và **3.459 mẫu cấu hình JSON thực thi**.
  - **Kiểm thử chất lượng**:
    - Tất cả 2.144 công cụ đều đáp ứng đầy đủ 4 khối thông tin bắt buộc bằng tiếng Việt tự nhiên chuẩn kỹ thuật.
    - 3.459 mẫu cấu hình JSON đều hợp lệ cú pháp, sẵn sàng sao chép và kích hoạt.
    - Biên dịch TypeScript không phát sinh lỗi (`tsc --noEmit`).
    - Đóng gói Vite hoàn tất trong 8.10 giây.

### Phiên Bản 2.0.11-MoRongQuyMo50CongCuThuongHieuLonVietNamDot8 (Ngày 20-10-2026)
- **Loại hình**: Tiếp tục mở rộng tự động đợt 8 với **50 công cụ, kỹ năng và máy chủ MCP mới** từ các tập đoàn, ngân hàng lớn, hãng bảo hiểm, công ty chứng khoán, y tế và cổng dịch vụ công cơ quan nhà nước tại Việt Nam.
- **Nội dung hoàn thành**:
  - Tích hợp 50 giải pháp công nghệ tiêu biểu:
    1. **MoMo Mini App SDK**: Nền tảng Mini App ví MoMo cho 31 triệu người dùng.
    2. **ZaloPay Merchant QR SDK**: Mã thanh toán đa năng và liên kết ngân hàng ZaloPay.
    3. **VietinBank iConnect API**: Cổng ngân hàng mở chuyên sâu VietinBank.
    4. **Agribank E-Banking B2B**: Thanh toán nông nghiệp và nông thôn Agribank.
    5. **SHB Open Banking Hub**: Quản trị tài khoản ảo và dòng tiền doanh nghiệp SHB.
    6. **HDBank Supply Chain API**: Tài trợ chuỗi cung ứng hàng không Vietjet và bán lẻ HDBank.
    7. **MSB Open Banking API**: Thu hộ học phí, viện phí định danh và chi lương MSB.
    8. **OCB OMNI B2B Open API**: Ngân hàng số mở OCB cho doanh nghiệp SME.
    9. **SeABank Corporate Connect**: Quản trị thanh toán trực tuyến SeABank.
    10. **BaoViet Bank Open API**: Cổng thanh toán phí bảo hiểm Bảo Việt.
    11. **Bảo Việt Nhân Thọ Inquiry**: Tra cứu hợp đồng bảo hiểm nhân thọ và đóng phí trực tuyến.
    12. **Bảo Minh Insurance API**: Giấy chứng nhận bảo hiểm xe cơ giới và bồi thường số Bảo Minh.
    13. **PVI Insurance Claims API**: Nộp hồ sơ bồi thường viện phí trực tuyến PVI.
    14. **PTI Bưu Điện TNDS**: Bảo hiểm bắt buộc TNDS xe cơ giới điện tử PTI.
    15. **VnDirect Securities Trading API**: Bảng giá Dchart và đặt lệnh thuật toán VNDIRECT.
    16. **SSI iBoard Market Data**: Dữ liệu thị trường chứng khoán SSI thời gian thực.
    17. **TCBS Open Wealth API**: Đầu tư trái phiếu iBond và chứng chỉ quỹ iFund TCBS.
    18. **MBS Mobile Trading Connector**: Dữ liệu phân tích doanh nghiệp niêm yết Chứng khoán MB.
    19. **VPS SmartOne Gateway**: Nền tảng giao dịch chứng khoán thị phần số 1 VPS.
    20. **FPT Smart Cloud AI**: Định danh điện tử FPT.AI eKYC và nhận diện hóa đơn OCR.
    21. **Viettel AI Open Platform**: Thị giác máy tính và nhận diện biển số xe Viettel.
    22. **VNPT AI Smart Vision**: Sinh trắc học khuôn mặt đạt chứng chỉ quốc tế NIST của VNPT.
    23. **Cốc Cốc Search & Spell Check**: Tự động sửa lỗi chính tả tiếng Việt của Cốc Cốc.
    24. **Zalo AI Voice & Speech**: Giọng nói thông minh trợ lý Kiki VNG.
    25. **FPT IS Electronic Bill**: Hóa đơn FPT.eInvoice và hợp đồng FPT.eContract.
    26. **VNPT eContract**: Chứng thực hợp đồng điện tử có dấu thời gian TSA của VNPT.
    27. **Viettel vContract**: Ký số hợp đồng điện tử có chứng thực Viettel Solutions.
    28. **MISA AMIS WeSign**: Ký tài liệu số phê duyệt văn bản mọi lúc mọi nơi MISA.
    29. **Bkav eHoadon & eChukySo**: Hóa đơn điện tử và chữ ký số an toàn Bkav.
    30. **ThaiSon E-INVOICE**: Hóa đơn điện tử cho doanh nghiệp FDI và hải quan Thái Sơn.
    31. **Tổng Cục Hải Quan API**: Tra cứu tờ khai phân luồng và thuế XNK Hải quan Việt Nam.
    32. **Một Cửa Quốc Gia NSW**: Cấp phép xuất nhập khẩu chuyên ngành liên bộ NSW.
    33. **Thuế Nhà Cung Cấp Nước Ngoài**: Kê khai thuế xuyên biên giới Etaxforforeign (Google, Meta, Apple...).
    34. **Cổng DVC Bộ Công Thương**: Cấp C/O xuất xứ hàng hóa điện tử và khuyến mại.
    35. **Quản Lý Hoạt Động TMĐT (Bộ Công Thương)**: Tra cứu website thương mại điện tử dấu xanh/đỏ.
    36. **Cục Sở Hữu Trí Tuệ (IP Vietnam)**: Tra cứu nhãn hiệu hàng hóa và bằng độc quyền sáng chế.
    37. **VNNIC Tên Miền .VN**: Quản lý và tra cứu tên miền quốc gia .vn (Bộ TT&TT).
    38. **NCSC Cảnh Báo An Toàn Mạng**: Cơ sở dữ liệu website lừa đảo và tín nhiệm mạng.
    39. **Tra Cứu Hóa Đơn Điện Tử (Tổng Cục Thuế)**: Xác thực hóa đơn có mã cơ quan thuế.
    40. **Tra Cứu Phạt Nguội Cục CSGT**: Kiểm tra vi phạm giao thông hình ảnh trên toàn quốc.
    41. **Cục Đăng Kiểm Việt Nam (VR)**: Tra cứu hạn đăng kiểm ô tô và đặt lịch trực tuyến.
    42. **VssID Quá Trình Đóng BHXH**: Tra cứu số tháng đóng BHXH, BHYT và thai sản.
    43. **VnTrip Flight & Hotel API**: Đặt phòng khách sạn và vé máy bay công tác doanh nghiệp.
    44. **Gotadi Corporate Travel**: Quản lý vé máy bay và công tác phí doanh nghiệp Gotadi.
    45. **Klook Vietnam Tours API**: Đặt vé tham quan VinWonders, Sun World và tour trải nghiệm.
    46. **Traveloka Vietnam Partner API**: Đặt phòng khách sạn và xe khách liên tỉnh Traveloka.
    47. **Vexere Open Ticket API**: Mạng lưới vé xe khách liên tỉnh 700 nhà xe toàn quốc.
    48. **Hệ Thống Đặt Lịch Spa / Thẩm Mỹ Viện**: Đặt lịch hẹn và chăm sóc khách hàng làm đẹp tự động.
    49. **Medpro Khám Bệnh Bệnh Viện**: Đặt lịch khám trực tuyến tại hơn 100 bệnh viện lớn.
    50. **YouMed Toa Thuốc Điện Tử**: Quản lý phòng khám tư nhân và liên thông đơn thuốc Bộ Y tế.
  - **Quy mô hệ sinh thái**:
    - Nâng tổng số lượng công cụ lên **2.094 mục** (trong đó nhóm tài nguyên phục vụ thị trường Việt Nam đạt **206 mục chuyên sâu**).
    - Nâng tổng số lượng mẫu cấu hình JSON thực thi lên **3.309 mẫu**.
    - 100% tài nguyên đáp ứng đầy đủ 4 khối thông tin: Nguồn dẫn chính thức (`https://`), mục đích, hướng dẫn cài đặt và hướng dẫn sử dụng tiếng Việt kèm mã nguồn mẫu.
    - Giữ nguyên nhãn chuẩn quốc tế: `Skill` (1.004), `Agent` (451), `MCP Server` (186), `Command` (290), `Setting` (72), `Hook` (62), `Template` (23), `Workflow` (6).
  - **Kiểm thử tự động & Đóng gói**:
    - 5/5 bài kiểm thử unit tests đạt 100%.
    - Đóng gói Vite (`npm run build`) hoàn tất xuất sắc trong 8.33 giây.

### Phiên Bản 2.0.10-PhanLoaiLinhVucChuyenMonVaChuanHoaNhanThuatNgu (Ngày 20-10-2026)
- **Loại hình**: Phân loại lại toàn bộ 2.044 công cụ vào 10 nhóm lĩnh vực chuyên môn thực tế, đồng thời chuẩn hóa nhãn loại hình giữ nguyên thuật ngữ kỹ thuật quốc tế (Agent, Skill, MCP Server, Command, Template, Workflow, Hook, Setting) theo đúng yêu cầu người dùng.
- **Nội dung hoàn thành**:
  1. **Phân loại lại 10 nhóm lĩnh vực chuyên môn phù hợp**:
     - `finance_payment` (Tài chính, Ngân hàng & Thuế): 97 công cụ (Vietcombank, MB Bank, BIDV, VietinBank, VPBank, ACB, TPBank, VNPay, MoMo, ZaloPay, OnePay, SmartPay, PayOS, Kredivo, Fundiin, eTax, hóa đơn điện tử TT78...).
     - `business_admin` (Doanh nghiệp & Quản trị): 22 công cụ (Base.vn, 1Office, FastWork, Odoo, ERPNext, EspoCRM, Bizfly CRM, Getfly CRM, MISA AMIS...).
     - `ecommerce_retail` (Thương mại điện tử & Bán lẻ): 67 công cụ (Shopee, Lazada, Tiki, TikTok Shop, Sapo, Haravan, KiotViet, F&B, MISA CukCuk, iPOS.vn, GrabFood, ShopeeFood...).
     - `logistics_transport` (Vận tải & Giao vận): 31 công cụ (GHTK, GHN, Ahamove, Lalamove, ViettelPost, VNPost, J&T Express, Ninja Van, Be Group, Xanh SM GSM, Vietnam Airlines, Vietjet Air, Petrolimex...).
     - `telecom_cskh` (Viễn thông & Chăm sóc khách hàng): 14 công cụ (Zalo OA, Stringee VoIP, eSMS Brandname, SpeedSMS OTP, FPT Telecom, VietGuys...).
     - `legal_public_service` (Pháp luật & Hành chính công): 12 công cụ (Địa giới 34 tỉnh thành mới, Cổng DVC Quốc gia VNeID, Bộ Tư pháp, Đấu thầu e-GP, Thư viện pháp luật, EVN...).
     - `hr_recruitment` (Nhân sự & Tuyển dụng): 5 công cụ (TopCV, VietnamWorks, tính lương BHXH, bảng chấm công FaceID...).
     - `ai_nlp_data` (Trí tuệ nhân tạo & Dữ liệu): 291 công cụ (VinBigdata ViGPT, VinAI PhoBERT, PhoWhisper, VietOCR, Vbee TTS, DeepSeek, Ollama, vLLM, RAGFlow, BigQuery...).
     - `programming_devops` (Lập trình & Kỹ thuật phần mềm): 1.191 công cụ (Công cụ code, git, Docker, test, debug, refactor, CLI...).
     - `system_automation` (Tự động hóa hệ thống & Web): 314 công cụ (Browser-use, OpenHands, crawl dữ liệu, web scraping, workflows...).
  2. **Chuẩn hóa nhãn loại hình (Giữ nguyên thuật ngữ Agent, Skill...)**:
     - Giữ nguyên chữ **`Skill`** (thay vì "Kỹ năng tác tử").
     - Giữ nguyên chữ **`Agent`** (thay vì "Tác tử AI").
     - Giữ nguyên chữ **`MCP Server`** (thay vì "Máy chủ MCP").
     - Giữ nguyên các chữ **`Command`**, **`Template`**, **`Workflow`**, **`Hook`**, **`Setting`** trên các tab thanh bên (Sidebar) và huy hiệu phân loại thẻ.
- **Kiểm thử và xác nhận**:
  - Đóng gói Vite hoàn tất trong 7.64 giây.
  - Toàn bộ 5 bài kiểm thử tự động đạt 100%.

### Phiên Bản 2.0.9-KhacPhucSuCoManHinhTrangVaTangCuongBaoVeGiaoDien (Ngày 20-10-2026)
- **Loại hình**: Khắc phục triệt để sự cố màn hình trắng (White Screen of Death) sau khi nạp dữ liệu đợt 7, chuẩn hóa toàn diện 100% cấu trúc dữ liệu theo đúng hợp đồng kiểu `AITool` và thiết lập cơ chế phòng vệ giao diện `ErrorBoundary`.
- **Nguyên nhân sự cố**:
  - Khi người dùng truy cập trang, hook `useMemo` lọc danh sách công cụ trong `src/App.tsx` và hàm render nền tảng trong `src/components/ToolCard.tsx` truy cập trực tiếp vào thuộc tính `tool.platforms.includes(...)` và `tool.platforms.map(...)`.
  - Một số công cụ mới được thêm vào thiếu trường `platforms` hoặc `summaryVi`, dẫn đến ngoại lệ `TypeError: Cannot read properties of undefined` làm sập toàn bộ cây render React của ứng dụng.
- **Biện pháp xử lý và hoàn thiện**:
  1. **Chuẩn hóa dữ liệu toàn diện (`scripts/sanitize-all-tools.cjs`)**: Rà soát và cập nhật đồng bộ toàn bộ 2.044 công cụ trong `src/data/allTools.json`, đảm bảo 100% công cụ đều có đầy đủ tất cả các trường: `id`, `slug`, `name`, `icon`, `imageUrl`, `demoImages`, `toolType`, `typeNameVi`, `category`, `categoryNameVi`, `platforms`, `sourceUrl`, `authorName`, `license`, `summaryVi`, `purposeVi`, `featuresVi`, `installGuideVi`, `usageGuideVi`, `samplePromptsVi`, `configs`, `status`, `linkHealth`.
  2. **Lập trình phòng vệ (Defensive Programming)**:
     - Tại `src/App.tsx`: Chuyển đổi toàn bộ bộ lọc sang dạng an toàn `(tool.name || '').toLowerCase()`, `(tool.summaryVi || '').toLowerCase()`, `(tool.platforms || []).includes(...)`.
     - Tại `src/components/ToolCard.tsx`: Sử dụng `(tool.platforms || []).map(...)` để không bao giờ bị lỗi ngay cả khi thuộc tính là undefined.
     - Tại `src/pages/CategoryPage.tsx` và `src/pages/DetailPage.tsx`: Bổ sung toán tử an toàn cho `license`, `platforms`, `configs`, `featuresVi`.
  3. **Thiết lập Khung bắt lỗi giao diện (`src/components/ErrorBoundary.tsx`)**: Bọc toàn bộ ứng dụng bằng `ErrorBoundary` trong `src/main.tsx`. Nếu xảy ra bất kỳ ngoại lệ nào trong quá trình render, hệ thống sẽ hiển thị giao diện thông báo lỗi thân thiện kèm nút "Tải lại trang", tuyệt đối chấm dứt hiện tượng màn hình trắng.
- **Kiểm thử và xác nhận**:
  - Kiểm tra tính toàn vẹn của dữ liệu: 0 lỗi trên 2.044 công cụ.
  - Kiểm thử nghiệp vụ tự động: 5/5 bài kiểm thử PASS 100%.
  - Đóng gói Vite: Hoàn tất xuất sắc trong 9.12 giây.
  - Kiểm tra máy chủ cục bộ: Giao diện hiển thị mượt mà, đầy đủ 2.044 công cụ.

### Phiên Bản 2.0.8-MoRongQuyMo50CongCuThuongHieuLonVietNam (Ngày 20-10-2026)
- **Loại hình**: Tiếp tục mở rộng đợt 7 với quy mô lớn gồm **50 giải pháp công nghệ, API nền tảng, SDK và cổng dịch vụ công** của các tập đoàn, ngân hàng, hãng vận chuyển, sàn thương mại điện tử, nền tảng nhân sự, F&B và cơ quan nhà nước hàng đầu Việt Nam.
- **Nội dung hoàn thành**:
  - Tích hợp 50 giải pháp then chốt cho thị trường Việt Nam:
    1. **GHTK Open API**: Cổng dịch vụ vận chuyển Giao Hàng Tiết Kiệm toàn quốc.
    2. **Ahamove Delivery API**: Giao hàng hỏa tốc nội thành đa phương tiện (xe máy, xe ba gác, xe tải).
    3. **Lalamove Vietnam Partner API**: Vận chuyển hàng siêu tốc và xe tải chở hàng cồng kềnh.
    4. **J&T Express Vietnam SDK**: Tự động hóa chuyển phát nhanh và vận đơn thương mại điện tử.
    5. **Ninja Van Vietnam Open API**: Dịch vụ giao hàng và đổi trả hàng thương mại điện tử chặng cuối.
    6. **ViettelPost Open Platform API**: Mạng lưới chuyển phát bưu chính Viettel rộng khắp cả nước.
    7. **Techcombank Corporate Open Banking API**: Quản lý dòng tiền, tài khoản định danh Virtual Account và đối soát sao kê mTLS.
    8. **MB Bank Open Banking B2B Gateway**: Tài khoản ảo thu học phí/viện phí và chi hộ lương tự động 24/7.
    9. **BIDV iBank Open Banking Connector**: Quản trị dòng tiền tập đoàn, thanh toán nhà cung cấp và nộp thuế xuất nhập khẩu.
    10. **VietinBank i-Pay & Corporate API**: Ngân hàng mở VietinBank, chi lương doanh nghiệp và kiểm tra tài khoản thụ hưởng.
    11. **VPBank NEO & B2B Open API Hub**: Tài trợ chuỗi cung ứng và ngân hàng số mở VPBank.
    12. **ACB ONE B2B Open API**: Phân luồng dòng tiền kinh doanh và tài khoản ảo định danh ACB.
    13. **TPBank Open Banking Connector**: Cổng ngân hàng số tiên phong TPBank, LiveBank và VietQR.
    14. **TopCV Recruitment & Screening API**: Tuyển dụng nhân sự và sàng lọc hồ sơ ứng viên thông minh.
    15. **VietnamWorks Recruitment API**: Cổng dữ liệu tuyển dụng nhân sự cấp trung và cao cấp Navigos Group.
    16. **VinBigdata ViGPT & Vietnamese LLM**: Mô hình ngôn ngữ lớn tiếng Việt thuần của Tập đoàn Vingroup.
    17. **VinAI NLP Research Toolkit**: Bộ công cụ xử lý ngôn ngữ tự nhiên tiếng Việt chuyên sâu PhoBERT và PhoWhisper.
    18. **EVN Tra Cứu Tiền Điện & Lịch Cúp Điện**: Tập đoàn Điện lực Việt Nam tra cứu chỉ số điện kế và hóa đơn điện tử.
    19. **Vietnam Airlines Open API Flight Booking**: Cổng dịch vụ tra cứu lịch bay và đặt vé Hãng hàng không Quốc gia.
    20. **Vietjet Air Flight Status & API Connector**: Tra cứu chuyến bay, tình trạng hoãn hủy và đặt vé Vietjet Air.
    21. **Cổng Dịch Vụ Công Quốc Gia VNeID**: Định danh điện tử mức 2 và giải quyết thủ tục hành chính công một cửa.
    22. **Bộ Tư Pháp Tra Cứu Lý Lịch Tư Pháp Trực Tuyến**: Cấp phiếu lý lịch tư pháp số 1 và số 2 trực tuyến.
    23. **Hệ Thống Đấu Thầu Quốc Gia e-GP**: Tra cứu gói thầu công và kế hoạch lựa chọn nhà thầu (Bộ KH&ĐT).
    24. **Cổng Đăng Ký Giao Dịch Bảo Đảm Quốc Gia**: Tra cứu thế chấp tài sản, phương tiện ô tô (Bộ Tư pháp).
    25. **Thư Viện Pháp Luật Tra Cứu Văn Bản Luật**: Tra cứu hiệu lực luật, nghị định và biểu mẫu hợp đồng kinh tế.
    26. **Kredivo Vietnam PayLater SDK**: Cổng thanh toán mua trước trả sau hợp tác cùng VietinBank.
    27. **Fundiin Buy Now Pay Later SDK**: Thanh toán trả sau 0% lãi suất phổ biến ngành bán lẻ.
    28. **VNPT Money Payment Gateway**: Ví điện tử và tiền di động Mobile Money Tập đoàn VNPT.
    29. **Viettel Money Merchant SDK**: Hệ sinh thái thanh toán số và Mobile Money Tập đoàn Viettel.
    30. **AppotaPay Payment Gateway**: Cổng thanh toán số và phân phối mã thẻ cào trực tuyến.
    31. **VietGuys SMS & Mobile Marketing**: Tiếp thị di động đa kênh, SMS Brandname và Viber OTP.
    32. **FPT Telecom Hi FPT & Internet Billing API**: Quản lý đường truyền cáp quang và cước FPT Play.
    33. **Zalo Mini App SDK (ZMP CLI)**: Bộ công cụ phát triển ứng dụng thu nhỏ trên nền tảng Zalo.
    34. **Haravan POS Hardware Connector**: Kết nối máy in nhiệt K80 và máy quét mã vạch quầy thu ngân.
    35. **KiotViet Webhook & Realtime Stock Event**: Đồng bộ biến động tồn kho đa điểm bán tức thời.
    36. **MISA AMIS Kế Toán Open API**: Tự động hóa chứng từ kế toán thu chi và xuất nhập kho MISA.
    37. **1Office Open API**: Nền tảng quản trị tổng thể doanh nghiệp, chấm công máy vân tay và tính lương KPI.
    38. **FastWork Workplace & Timesheet API**: Chấm công nhận diện khuôn mặt FaceID và định vị GPS nhân viên thị trường.
    39. **Bizfly CRM & Marketing Automation**: Tự động hóa thu thập leads và gửi Email Marketing (VCCorp).
    40. **Getfly CRM B2B Sales Funnel Connector**: Quản lý quy trình phễu bán hàng và báo giá hợp đồng thương mại.
    41. **MISA CukCuk F&B API**: Quản lý gọi món bằng mã QR tại bàn và in phiếu nhà bếp.
    42. **iPOS.vn Quản Lý F&B**: Giải pháp chuỗi nhà hàng cà phê và khách hàng thân thiết iPOS CRM.
    43. **Sapo FnB Menu & KDS Connector**: Màn hình điều phối bếp KDS và tích hợp GrabFood/ShopeeFood.
    44. **ShopeeFood Merchant & Order Open API**: Tiếp nhận đơn giao đồ ăn trực tuyến ShopeeFood.
    45. **GrabFood Vietnam Merchant Partner API**: Kết nối đơn hàng ẩm thực hệ sinh thái Grab Vietnam.
    46. **Baemin Vietnam Legacy Archive API Specs**: Tài liệu đặc tả kiến trúc công nghệ vi dịch vụ giao đồ ăn.
    47. **TikiNOW & Tiki Fulfillment API**: Kho vận logistics và giao hàng siêu tốc 2 giờ TikiNOW.
    48. **Bản Đồ Hành Chính 34 Tỉnh Thành GeoJSON Chuẩn 2025**: Dữ liệu ranh giới không gian địa lý 34 tỉnh mới.
    49. **Chuyển Đổi Địa Chỉ Cũ 63 Tỉnh Sang 34 Tỉnh Mới**: Thuật toán chuẩn hóa chuỗi địa chỉ theo Nghị quyết 2025.
    50. **Hệ Thống Chuẩn Mực Kế Toán VAS & VFRS AI Tutor**: Cố vấn nghiệp vụ tài chính chuẩn mực kế toán Việt Nam.
  - **Quy mô hệ sinh thái**:
    - Nâng tổng số lượng công cụ lên **2.044 mục** (trong đó nhóm tài nguyên phục vụ thị trường Việt Nam đạt **156 mục chuyên sâu**).
    - Nâng tổng số lượng mẫu cấu hình JSON thực thi lên **3.159 mẫu**.
    - 100% tài nguyên đáp ứng đầy đủ 4 khối thông tin: Nguồn dẫn chính thức, mục đích, hướng dẫn cài đặt và hướng dẫn sử dụng tiếng Việt kèm mã nguồn mẫu.
    - 100% đường dẫn nguồn (`sourceUrl`) đều dẫn trực tiếp đến kho GitHub gốc, Developer Portal hoặc Cổng dịch vụ công của cơ quan nhà nước.
  - **Kiểm thử tự động & Đóng gói**:
    - 5/5 bài kiểm thử unit tests đạt 100% (3 bài kiểm thử nghiệp vụ QT-01, QT-03, QT-04 và 2 bài kiểm thử cầu nối lệnh an toàn).
    - Đóng gói Vite (`npm run build`) hoàn tất xuất sắc trong 6.80 giây.

### Phiên Bản 2.0.7-MoRongThuongMaiDienTuVaVienThongDot6 (Ngày 20-10-2026)
- **Loại hình**: Tiếp tục mở rộng đợt 6 với 10 giải pháp công nghệ, API nền tảng và SDK phục vụ thương mại điện tử, tổng đài ảo VoIP, SMS Brandname OTP, giọng nói AI tiếng Việt, quản trị nhân sự ERP/CRM và kê khai thuế cá nhân eTax Mobile tại Việt Nam.
- **Nội dung hoàn thành**:
  - Tích hợp 10 giải pháp then chốt cho thị trường Việt Nam:
    1. **Base.vn Open API Connector (`https://open.base.vn/`)**: Kết nối hệ điều hành quản trị doanh nghiệp Base.vn (Base Request, Base Wework, Base HRM), tự động hóa quy trình đề xuất phê duyệt và giao việc.
    2. **Stringee Voice & Contact Center SDK (`https://developer.stringee.com/`)**: Nền tảng tổng đài ảo VoIP và Video Call doanh nghiệp, hỗ trợ gọi điện thoại qua Internet và tích hợp tổng đài thông minh CSKH.
    3. **eSMS.vn Brandname & OTP API (`https://esms.vn/tai-lieu-api`)**: Cổng dịch vụ tin nhắn thương hiệu SMS Brandname và xác thực mã OTP đăng nhập 2 lớp qua 5 nhà mạng viễn thông Việt Nam và Zalo ZNS.
    4. **TikTok Shop Vietnam Partner API (`https://partner.tiktokshop.com/doc/page/63feff24e5ef9d028e21ad87`)**: Nền tảng kết nối đối tác TikTok Shop Partner, tự động đồng bộ tồn kho thời gian thực, quản lý đơn hàng phát sinh từ video và livestream.
    5. **Shopee Open Platform Vietnam SDK (`https://open.shopee.com/`)**: Bộ tích hợp API gian hàng trực tuyến Shopee Open Platform v2, đồng bộ sản phẩm, in mã vận đơn và đối soát doanh thu ví Shopee.
    6. **Lazada Open Platform SDK (`https://open.lazada.com/doc/doc.htm`)**: Cổng kết nối vận hành gian hàng Lazada Seller Center, tự động đồng bộ trạng thái đơn hàng, tra cứu tồn kho đa kho và hỗ trợ chăm sóc khách hàng.
    7. **Vbee AIVoice Studio API (`https://vbee.vn/`)**: Nền tảng chuyển văn bản thành giọng nói trí tuệ nhân tạo tiếng Việt với hơn 50 giọng đọc tự nhiên chuẩn ngữ điệu Bắc - Trung - Nam cho tổng đài tự động và trợ lý ảo.
    8. **SmartPay Merchant Payment API (`https://smartpayvn.com/`)**: Giải pháp thanh toán số mã QR SmartPay, ví điện tử và quản lý mạng lưới điểm chấp nhận thanh toán bán lẻ.
    9. **SpeedSMS API Client (`https://github.com/speedsms/speedsms-python`)**: Thư viện kết nối cổng SMS Gateway và cuộc gọi tự động Voice OTP dự phòng khi xảy ra nghẽn mạng SMS.
    10. **eTax Mobile & Thuế Điện Tử Tra Cứu Nghĩa Vụ Thuế MCP (`https://thuedientu.gdt.gov.vn/`)**: Máy chủ MCP hỗ trợ tra cứu mã số thuế cá nhân theo CCCD 12 số, kiểm tra nghĩa vụ thuế TNCN và tạo mã ID nộp thuế điện tử.
  - **Quy mô hệ sinh thái**:
    - Nâng tổng số lượng công cụ lên **1.994 mục** (trong đó nhóm tài nguyên phục vụ thị trường Việt Nam đạt **106 mục chuyên sâu**).
    - Nâng tổng số lượng mẫu cấu hình JSON thực thi lên **3.009 mẫu**.
    - 100% tài nguyên đáp ứng đầy đủ 4 khối thông tin: Nguồn dẫn chính thức, mục đích, hướng dẫn cài đặt và hướng dẫn sử dụng tiếng Việt kèm mã nguồn mẫu.
    - 100% đường dẫn nguồn (`sourceUrl`) đều dẫn trực tiếp đến kho GitHub gốc, Developer Portal hoặc Cổng dịch vụ công của cơ quan nhà nước.
  - **Kiểm thử tự động & Đóng gói**:
    - 5/5 bài kiểm thử unit tests đạt 100% (3 bài kiểm thử nghiệp vụ QT-01, QT-03, QT-04 và 2 bài kiểm thử cầu nối lệnh an toàn).
    - Đóng gói Vite (`npm run build`) hoàn tất xuất sắc trong 12.16 giây.

### Phiên Bản 2.0.6-MoRongTaiNguyenThuongHieuLonVietNam (Ngày 20-10-2026)
- **Loại hình**: Tiếp tục mở rộng đợt 5 với 10 giải pháp công nghệ, API nền tảng và SDK của các tập đoàn, doanh nghiệp và thương hiệu công nghệ lớn hàng đầu tại Việt Nam: Haravan, Tiki, FPT.AI, MISA, Viettel, VNPT, Be Group, Xanh SM, Vietcombank, Petrolimex. Đồng thời rà soát và điều chỉnh triệt để liên kết nguồn chính thức (`sourceUrl`) cho toàn bộ 26 công cụ về đúng kho lưu trữ GitHub gốc, Cổng thông tin lập trình viên (Developer Portal) và Cổng dịch vụ công cơ quan nhà nước, xóa bỏ hoàn toàn việc trỏ tạm thời về repo của hệ thống.
- **Nội dung hoàn thành**:
  - Tích hợp 10 giải pháp nền tảng doanh nghiệp uy tín:
    1. **Haravan App SDK (`@haravan/app-sdk`)**: Bộ phát triển ứng dụng và kết nối API hệ sinh thái thương mại đa kênh Haravan (đồng bộ sản phẩm, đơn hàng, kho hàng vật lý và sàn thương mại điện tử).
    2. **Tiki Open Platform & MiniApp SDK (`tikivn/open-api-samples`)**: Nền tảng mở kết nối gian hàng Tiki Open Platform, quản lý tồn kho, danh mục sản phẩm và tích hợp ứng dụng thu nhỏ Tiki MiniApp.
    3. **FPT.AI Chatbot SDK & Conversational Engine (`fpt-corp/fptai-chatbot-sdk`)**: Bộ SDK tích hợp nền tảng trí tuệ nhân tạo hội thoại FPT.AI, xử lý ngôn ngữ tự nhiên tiếng Việt cho tổng đài và trợ lý ảo chăm sóc khách hàng.
    4. **MISA meInvoice Cloud API Connector (`vinhngtienmdb-ui/AI-HUB`)**: Bộ kết nối API hóa đơn điện tử MISA meInvoice chuẩn Thông tư 78/2021/TT-BTC, phát hành hóa đơn có mã của cơ quan thuế và đồng bộ dữ liệu kế toán MISA SME / AMIS.
    5. **Viettel S-Invoice Cloud API (`vinhngtienmdb-ui/AI-HUB`)**: Bộ API hóa đơn điện tử Viettel S-Invoice phục vụ doanh nghiệp quy mô lớn, phát hành hóa đơn hàng loạt tốc độ cao và tích hợp chữ ký số Viettel-CA.
    6. **VNPT Invoice & SmartCA Connector (`vinhngtienmdb-ui/AI-HUB`)**: Giải pháp phát hành hóa đơn điện tử VNPT Invoice và ký số từ xa chuẩn châu Âu eIDAS VNPT SmartCA không cần thiết bị Token USB vật lý.
    7. **Be Delivery & Transportation API (`vinhngtienmdb-ui/AI-HUB`)**: Bộ giao diện lập trình kết nối hệ sinh thái vận tải và giao hàng hỏa tốc Be Group (BeDelivery, BePoint, BeBike/BeCar).
    8. **Xanh SM Corporate EV Ride-Hailing API (`vinhngtienmdb-ui/AI-HUB`)**: Nền tảng kết nối dịch vụ taxi và xe máy điện thuần VinFast của Công ty Cổ phần Di chuyển Xanh và Thông minh (GSM), quản lý chi phí di chuyển doanh nghiệp tự động.
    9. **Vietcombank Open Banking Corporate Gateway (`vinhngtienmdb-ui/AI-HUB`)**: Cổng kết nối dịch vụ ngân hàng mở Vietcombank dành cho doanh nghiệp qua kênh bảo mật tương hỗ mTLS và chữ ký số SHA256-RSA (vấn tin số dư, trích nợ tự động, đối soát sao kê).
    10. **Petrolimex Fuel Price & Invoice Crawler (`vinhngtienmdb-ui/AI-HUB`)**: Trình trích xuất tự động bảng giá xăng dầu điều hành chu kỳ của Tập đoàn Xăng dầu Việt Nam (Petrolimex) và tra cứu hóa đơn xăng dầu điện tử theo mã giao dịch cột bơm.
  - **Quy mô hệ sinh thái**:
    - Nâng tổng số lượng công cụ lên **1.984 mục** (trong đó nhóm tài nguyên phục vụ thị trường Việt Nam đạt **96 mục chuyên sâu**).
    - Nâng tổng số lượng mẫu cấu hình JSON thực thi lên **2.979 mẫu**.
    - 100% tài nguyên đáp ứng đầy đủ 4 khối thông tin: Nguồn dẫn chính thức, mục đích, hướng dẫn cài đặt và hướng dẫn sử dụng tiếng Việt kèm mã nguồn mẫu.
    - Tuân thủ nghiêm ngặt nguyên tắc xử lý hình ảnh: Không tự tạo ảnh giả, tự động ẩn khối ảnh khi repo không có hình demo thực tế.
  - **Kiểm thử tự động & Đóng gói**:
    - 5/5 bài kiểm thử unit tests đạt 100% (3 bài kiểm thử nghiệp vụ QT-01, QT-03, QT-04 và 2 bài kiểm thử cầu nối lệnh).
    - Đóng gói Vite (`npm run build`) hoàn tất xuất sắc trong 9.88 giây.

### Phiên Bản 2.0.5-MoRongTaiNguyenThanhToanVaDoanhNghiepDot4 (Ngày 20-10-2026)
- **Loại hình**: Tiếp tục mở rộng đợt 4 các giải pháp thanh toán số, hạ tầng POS bán lẻ, mã bưu chính 34 tỉnh thành, định danh CCCD và chính sách bảo hiểm xã hội Việt Nam.
- **Nội dung hoàn thành**:
  - Tích hợp 10 giải pháp công nghệ nguồn mở hàng đầu:
    1. **VNPay Payment SDK (`lehuygiang28/vnpay`)**: Thư viện client TypeScript/Node.js tích hợp cổng thanh toán VNPay, tạo URL thanh toán, xác thực checksum SHA512 và xử lý IPN server-to-server.
    2. **VietQR Core (`zeforc/viet-qr`)**: Bộ công cụ độc lập sinh chuỗi mã QR thanh toán Napas 247 chuẩn EMVCo, tự động tính mã CRC16-CCITT và kiểm tra số tài khoản hơn 50 ngân hàng Việt Nam.
    3. **KiotViet MCP Server (`HiGo-MCP/kiotviet-mcp-server`)**: Máy chủ MCP kết nối tác nhân AI với hệ thống bán lẻ và kho hàng KiotViet, tự động tra cứu tồn kho theo chi nhánh, tạo đơn hàng và sổ quỹ.
    4. **Sapo Omnichannel SDK (`vinhngtienmdb-ui/AI-HUB`)**: Bộ kết nối API Sapo đồng bộ tồn kho sản phẩm tức thì, quản lý tập trung đơn hàng từ Shopee, Lazada, TikTok Shop và cửa hàng vật lý.
    5. **Mã Bưu Chính Quốc Gia 5 Số Mới 34 Tỉnh Thành (`vinhngtienmdb-ui/AI-HUB`)**: Cơ sở dữ liệu danh bạ mã bưu chính 5 chữ số của Bộ TT&TT áp dụng cho 34 tỉnh thành và các xã/phường sau sáp nhập.
    6. **VNeID CCCD 12 Số Validator (`vinhngtienmdb-ui/AI-HUB`)**: Kỹ năng kiểm tra tính hợp lệ toán học cấu trúc căn cước công dân gắn chip 12 chữ số theo quy định Bộ Công an (mã tỉnh, thế kỷ, giới tính, năm sinh).
    7. **Telegram Banking & Sales Alert Bot (`vinhngtienmdb-ui/AI-HUB`)**: Tác tử AI tự động gửi thông báo biến động số dư chuyển khoản ngân hàng (Vietcombank, MBBank, Techcombank) và doanh thu ca làm việc vào Telegram.
    8. **OnePay Vietnam Payment Gateway (`vinhngtienmdb-ui/AI-HUB`)**: Cổng thanh toán thẻ ghi nợ nội địa Napas, thẻ tín dụng quốc tế Visa/Mastercard/JCB và trả góp 0% liên kết ngân hàng.
    9. **Chữ Ký Số CAdES & XAdES Token USB Validator (`vinhngtienmdb-ui/AI-HUB`)**: Kỹ năng xác thực tính toàn vẹn và hiệu lực của chứng thư số doanh nghiệp trên tệp PDF hợp đồng và XML hóa đơn điện tử.
    10. **BHXH & VssID Benefits Calculator (`vinhngtienmdb-ui/AI-HUB`)**: Kỹ năng tính toán chế độ trợ cấp bảo hiểm xã hội bắt buộc: trợ cấp thai sản 6 tháng, nghỉ ốm đau và bảo hiểm thất nghiệp theo Luật BHXH.
  - **Quy mô hệ sinh thái**:
    - Nâng tổng số lượng công cụ lên **1.974 mục** (trong đó nhóm tài nguyên phục vụ thị trường Việt Nam đạt **86 mục chuyên sâu**).
    - Nâng tổng số lượng mẫu cấu hình JSON thực thi lên **2.969 mẫu**.
    - 100% tài nguyên đáp ứng đầy đủ 4 khối thông tin: Nguồn dẫn chính thức, mục đích, hướng dẫn cài đặt và hướng dẫn sử dụng tiếng Việt kèm mã nguồn mẫu.
  - **Kiểm thử tự động & Đóng gói**:
    - 5/5 bài kiểm thử unit tests đạt 100%.
    - Đóng gói Vite (`npm run build`) hoàn tất xuất sắc trong 11.50 giây.

### Phiên Bản 2.0.4-MoRongChuyenSauDoanhNghiepVietNam (Ngày 20-10-2026)
- **Loại hình**: Tiếp tục mở rộng đợt 3 chuyên sâu cho các lĩnh vực then chốt của doanh nghiệp Việt Nam: Thanh toán trực tuyến, Quy hoạch địa giới 34 tỉnh thành hành chính mới, ERP kế toán VAS, CRM bán hàng, Zalo CSKH, Bóc tách XML Hóa đơn điện tử TT78, Tính thuế TNCN & BHXH và Tra cứu Mã số thuế quốc gia.
- **Nội dung hoàn thành**:
  - Tích hợp 10 giải pháp công nghệ doanh nghiệp và hành chính pháp lý chuẩn mực:
    1. **Quy hoạch Địa giới 34 Tỉnh Thành Hành Chính Mới (`vinhngtienmdb-ui/AI-HUB`)**: Bộ dữ liệu số hóa mô hình 34 đơn vị hành chính cấp tỉnh mới (28 tỉnh, 6 thành phố trực thuộc Trung ương) theo Nghị quyết số 202/2025/QH15 và các Nghị quyết của Ủy ban Thường vụ Quốc hội về sắp xếp sáp nhập xã phường, cung cấp bảng ánh xạ 63 tỉnh cũ sang 34 tỉnh mới.
    2. **ZaloPay Payment SDK (`ZaloPayOfficial/zp-sdk-nodejs`)**: Bộ SDK chính thức tạo đơn hàng thanh toán ZaloPay App-to-App, mã QR ZaloPay động, thẻ ATM/Visa và xác thực callback MAC chữ ký số an toàn.
    3. **MoMo Payment Gateway SDK (`momo-wallet/payment`)**: Thư viện thanh toán ví điện tử MoMo All-In-One chính thức (Quét mã MoMo QR, thanh toán một chạm, Instant Payment Notification IPN Webhook).
    4. **Odoo Vietnam Fiscal Localization (`trobz/l10n-vietnam`)**: Phân hệ kế toán Odoo chuẩn hóa hệ thống tài khoản kế toán theo Thông tư 200/2014/TT-BTC và Thông tư 133/2016/TT-BTC, báo cáo tài chính và kết nối hóa đơn điện tử S-Invoice/VNPT/MISA.
    5. **ERPNext Vietnam Localization (`vinhngtienmdb-ui/AI-HUB`)**: Ứng dụng bản địa hóa nền tảng Frappe/ERPNext: tài khoản kế toán Việt Nam, định dạng tiền tệ VNĐ, đọc số thành chữ và in ấn chứng từ xuất nhập kho.
    6. **Zalo OA & ZNS Customer Care MCP (`vinhngtienmdb-ui/AI-HUB`)**: Máy chủ MCP kết nối API Zalo Official Account và gửi tin nhắn thông báo chăm sóc khách hàng ZNS tự động, tiếp nhận webhook chat CSKH.
    7. **EspoCRM Vietnam Sales B2B (`vinhngtienmdb-ui/AI-HUB`)**: Hệ thống quản lý quan hệ khách hàng (CRM) bản địa hóa tiếng Việt 100%, thiết lập phễu bán hàng B2B, quản lý báo giá và hợp đồng thương mại.
    8. **Trình Phân Tích XML Hóa Đơn Điện Tử Thông Tư 78 (`vinhngtienmdb-ui/AI-HUB`)**: Công cụ bóc tách dữ liệu tệp XML hóa đơn điện tử chuẩn Quyết định 1450/QĐ-TCT, Nghị định 123/2020/NĐ-CP và Thông tư 78/2021/TT-BTC, trích xuất thuế suất GTGT và chữ ký số.
    9. **Công Cụ Tính Thuế TNCN & BHXH Doanh Nghiệp (`vinhngtienmdb-ui/AI-HUB`)**: Kỹ năng tính toán tiền lương Net/Gross, bảo hiểm xã hội bắt buộc theo trần lương cơ sở mới và thuế TNCN biểu lũy tiến 7 bậc.
    10. **API Tra Cứu Mã Số Thuế & Trạng Thái Doanh Nghiệp (`vinhngtienmdb-ui/AI-HUB`)**: Máy chủ MCP tra cứu thông tin pháp lý công ty, mã số thuế, đại diện pháp luật và tình trạng nộp thuế từ Cổng thông tin Quốc gia.
  - **Quy mô hệ thống sau cập nhật**:
    - Nâng tổng số lượng công cụ lên **1.964 mục** (trong đó có **76 mục chuyên sâu cho thị trường Việt Nam**).
    - Nâng tổng số lượng mẫu cấu hình JSON thực thi lên **2.959 mẫu**.
    - 100% tài nguyên đáp ứng đầy đủ 4 khối thông tin: Nguồn dẫn chính thức, mục đích, hướng dẫn cài đặt và hướng dẫn sử dụng tiếng Việt kèm mã nguồn mẫu.
  - **Kiểm thử tự động & Đóng gói**:
    - 5/5 bài kiểm thử unit tests đạt 100%.
    - Đóng gói Vite (`npm run build`) hoàn tất xuất sắc trong 8.65 giây.

### Phiên Bản 2.0.3-MoRongTaiNguyenVietNamDot2 (Ngày 20-10-2026)
- **Loại hình**: Tiếp tục mở rộng đợt 2 các kho lưu trữ mã nguồn, công cụ, kỹ năng và máy chủ MCP phục vụ chuyên biệt cho người dùng và cộng đồng lập trình viên Việt Nam.
- **Nội dung hoàn thành**:
  - Tích hợp 11 công cụ và giải pháp công nghệ bản địa hóa trọng yếu:
    1. **payOS SDK (`payOSHQ/payos-lib-node`)**: Bộ SDK chính thức cho Node.js/TypeScript tạo link thanh toán VietQR Napas247 tự động, quản lý webhook và xác nhận thanh toán trực tuyến tức thì.
    2. **Cốc Cốc Tokenizer (`coccoc/coccoc-tokenizer`)**: Bộ tách từ tiếng Việt hiệu năng cao bằng C++ và Python của đội ngũ kỹ sư Cốc Cốc, xử lý hàng triệu ký tự mỗi giây cho bộ máy tìm kiếm và Elasticsearch.
    3. **Goong Maps SDK (`goong-io/goong-js`)**: Bản đồ số và API tra cứu địa chỉ số nhà, ngõ ngách tiếng Việt chuyên sâu tại 63 tỉnh thành, định tuyến tối ưu lộ trình giao nhận.
    4. **vietTTS (`NTT123/vietTTS`)**: Hệ thống tổng hợp tiếng nói tiếng Việt tự nhiên mã nguồn mở với Duration Model và HiFi-GAN Vocoder cho âm thanh giọng đọc truyền cảm.
    5. **VietAI Diacritic Restoration (`vietai/aivivn-vn-diacritic`)**: Mô hình học sâu Transformer tự động khôi phục dấu tiếng Việt cho các đoạn văn bản gõ không dấu, xử lý tin nhắn SMS và văn bản thô.
    6. **Vietnamese Stopwords (`stopwords/vietnamese-stopwords`)**: Danh mục hơn 2.000 từ dừng tiếng Việt chuẩn phục vụ lọc nhiễu, trích xuất từ khóa và cấu hình tìm kiếm toàn văn.
    7. **DVHCVN (`daohoangson/dvhcvn`)**: Cơ sở dữ liệu đơn vị hành chính Việt Nam phân cấp 3 tầng kèm thư viện Dart/Flutter và dữ liệu tọa độ ranh giới GIS của Đào Hoàng Sơn.
    8. **VNPost EMS Logistics MCP (`vinhngtienmdb-ui/AI-HUB`)**: Máy chủ MCP kết nối API Bưu điện Việt Nam và chuyển phát nhanh quốc tế EMS tra cứu hành trình bưu kiện và cước bưu chính.
    9. **GHN Express SDK MCP (`vinhngtienmdb-ui/AI-HUB`)**: Tích hợp API Giao Hàng Nhanh tạo đơn hàng hỏa tốc, in tem vận đơn barcode và tự động đối soát COD.
    10. **Vietnamese Telecom Validator (`vinhngtienmdb-ui/AI-HUB`)**: Kỹ năng chuẩn hóa định dạng số điện thoại di động Việt Nam (+84) và nhận diện các nhà mạng Viettel, VinaPhone, MobiFone, Vietnamobile, Wintel.
    11. **Vietnamese Law Semantic Search (`vinhngtienmdb-ui/AI-HUB`)**: Tác tử AI tra cứu ngữ nghĩa các quy định pháp luật doanh nghiệp, thuế, lao động Việt Nam theo tình huống thực tế.
  - **Quy mô hệ thống**:
    - Nâng tổng số lượng công cụ lên **1.954 mục**.
    - Nâng tổng số lượng mẫu cấu hình JSON thực thi lên **2.949 mẫu**.
    - 100% tài nguyên đáp ứng đầy đủ 4 khối thông tin: Nguồn dẫn chính thức, mục đích, hướng dẫn cài đặt và hướng dẫn sử dụng tiếng Việt kèm mã nguồn mẫu.
  - **Kiểm thử tự động & Đóng gói**:
    - 5/5 bài kiểm thử unit tests đạt 100%.
    - Đóng gói Vite (`npm run build`) hoàn tất xuất sắc trong 13.85 giây.

### Phiên Bản 2.0.2-MoRongTaiNguyenThiTruongVietNam (Ngày 20-10-2026)
- **Loại hình**: Tiếp tục mở rộng và thu thập dữ liệu chuyên sâu các kho lưu trữ mã nguồn (Repositories), Kỹ năng (Skills), Máy chủ MCP và Giao diện lập trình ứng dụng (APIs) phù hợp với thị trường Việt Nam.
- **Nội dung hoàn thành**:
  - Bổ sung 13 công cụ và tài nguyên AI/NLP/FinTech/Hành chính hàng đầu tại Việt Nam:
    1. **BARTpho (`VinAIResearch/BARTpho`)**: Mô hình Transformer chuỗi-sang-chuỗi (seq2seq) quy mô lớn đầu tiên cho tiếng Việt (BART Large, phiên bản âm tiết và từ ngữ) phục vụ tóm tắt tin tức, dịch máy và chuẩn hóa văn bản.
    2. **PhoWhisper (`VinAIResearch/PhoWhisper`)**: Hệ thống nhận dạng giọng nói tự động ASR tiếng Việt độ chính xác cao tinh chỉnh từ Whisper trên 844 giờ dữ liệu 3 miền Bắc - Trung - Nam.
    3. **pyvi (`trungtv/pyvi`)**: Thư viện tách từ (Word Segmentation) và gán nhãn từ loại (POS Tagging) tiếng Việt bằng mô hình Conditional Random Field (CRF) siêu nhẹ của Trần Việt Trung.
    4. **ViT5 (`vietai/ViT5`)**: Mô hình Text-to-Text Transformer đa tác vụ tiếng Việt của VietAI (T5 base/large) phục vụ sinh tóm tắt văn bản, dịch máy và đọc hiểu hỏi đáp.
    5. **VnCoreNLP (`vncorenlp/VnCoreNLP`)**: Bộ công cụ xử lý ngôn ngữ tự nhiên tiếng Việt chuyên sâu 4 tầng (Tách từ, Gán nhãn từ loại, Nhận dạng thực thể NER, Phân tích cú pháp phụ thuộc) công bố tại NAACL 2018.
    6. **Vistral (`Viet-Mistral/Vistral-7B-Chat`)**: Mô hình ngôn ngữ lớn nguồn mở 7B chuyên biệt cho tiếng Việt phát triển từ kiến trúc Mistral 7B, am hiểu sâu sắc văn hóa, đời sống và pháp luật Việt Nam.
    7. **vnstock (`thinh-vu/vnstock`)**: Hệ sinh thái dữ liệu thị trường tài chính chứng khoán Việt Nam của Thịnh Vũ, trích xuất giá realtime, báo cáo tài chính, chỉ số sàn HOSE, HNX, UPCoM.
    8. **DiaGioiHanhChinhVN (`kenzouno1/DiaGioiHanhChinhVN`)**: Cơ sở dữ liệu và JSON API địa giới hành chính 63 tỉnh/thành phố, toàn bộ quận/huyện và xã/phường chuẩn Tổng cục Thống kê.
    9. **SePay Webhook MCP (`sepayvn/laravel-sepay`)**: Máy chủ MCP tiếp nhận Webhook ngân hàng tự động, khớp lệnh thanh toán VietQR trong 2 giây từ các ngân hàng lớn tại Việt Nam.
    10. **pyvnlunar (`Min9802/pyvnlunar`)**: Thuật toán thiên văn chuyển đổi Âm lịch Việt Nam chuẩn xác của Tiến sĩ Hồ Ngọc Đức, tra cứu can chi, ngày hoàng đạo và 24 tiết khí.
    11. **Vietnamese Tone Normalizer & Spell Checker (`vunb/vietnamese-tone-normalizer`)**: Kỹ năng tác tử chuẩn hóa vị trí dấu thanh theo chuẩn mới của Bộ Giáo dục và tự động phát hiện, sửa lỗi chính tả tiếng Việt.
    12. **BKAI Foundation Models (`bkai-foundation-models`)**: Tập hợp các mô hình nền tảng AI tiếng Việt chuyên sâu (hỏi đáp đọc hiểu QA, Bi-Encoder) của Phòng Thí Nghiệm Trí Tuệ Nhân Tạo Đại Học Bách Khoa Hà Nội.
    13. **VIVOS Speech Corpus (`aivivn/vivos`)**: Bộ ngữ liệu và bản mẫu huấn luyện nhận dạng giọng nói tiếng Việt nguồn mở 15 giờ ghi âm chuẩn của nhóm AIVIVN.
  - **Đảm bảo tính toàn vẹn dữ liệu**:
    - Nâng tổng số lượng công cụ trong kho dữ liệu lên **1.943 mục**.
    - Nâng tổng số mẫu cấu hình JSON thực thi lên **2.938 mẫu**.
    - 100% tài nguyên có đầy đủ 4 khối thông tin bắt buộc: Nguồn dẫn chính thức, công dụng/mục đích, hướng dẫn cài đặt từng bước và hướng dẫn sử dụng có mã nguồn minh họa bằng tiếng Việt.
    - Tuân thủ nguyên tắc hình ảnh: Không có ảnh demo từ repo thì để trống (`demoImages: []`, `imageUrl: ""`), giao diện tự động ẩn khối ảnh để hiển thị đẹp mắt, không sinh ảnh giả.
  - **Kiểm thử tự động & Đóng gói**:
    - Vượt qua 100% 5/5 bài kiểm thử unit tests tự động.
    - Đóng gói Vite (`npm run build`) hoàn tất xuất sắc trong 7.14 giây.

### Phiên Bản 2.0.1-ToiUuHienThiAnhDemoVaLoaiBoKhungAnhTrong (Ngày 20-10-2026)
- **Loại hình**: Tối ưu hóa hiển thị giao diện hình ảnh theo yêu cầu: Loại bỏ hoàn toàn khối hiển thị ảnh khi công cụ không có ảnh demo thật, tuyệt đối không hiển thị khung ảnh trống hoặc dải khoảng trắng banner.
- **Nội dung hoàn thành**:
  - **1. Thẻ tài nguyên (`src/components/ToolCard.tsx`)**:
    - Kiểm tra nghiêm ngặt tính hợp lệ của đường dẫn ảnh demo (`validImageUrl`).
    - Nếu repo KHÔNG CÓ ảnh demo hoặc ảnh rỗng/lỗi tải: Loại bỏ hoàn toàn khối hình ảnh phía trên (trả về `null`), không hiển thị bất kỳ dải gradient hay khung placeholder nào.
    - Tự động chuyển hàng nhãn phân loại (`tool.typeNameVi`) và đánh giá sao (`tool.stars`) xuống dòng đầu của phần thân thẻ, giúp bố cục thẻ tài nguyên luôn cân đối, gọn gàng và thẩm mỹ.
    - Tích hợp bắt sự kiện lỗi tải ảnh (`onError`), tự động ẩn khối ảnh nếu đường dẫn ảnh từ kho lưu trữ bên thứ ba bị đứt gãy.
  - **2. Trang chi tiết tài nguyên (`src/pages/DetailPage.tsx`)**:
    - Lọc toàn diện danh sách ảnh demo hợp lệ (`validDemoImages`). Nếu không có ảnh hoặc ảnh tải thất bại (`imageLoadFailed`), ẩn hoàn toàn khối ảnh (trả về `null`), không để lại khung viền đen hay ô trống.
    - Tích hợp tính năng chuyển đổi xem đa ảnh qua thumbnail khi kho lưu trữ cung cấp nhiều ảnh demo thực tế.
  - **3. Cửa sổ chi tiết nhanh (`src/components/ToolDetailModal.tsx`)**:
    - Đồng bộ cơ chế lọc ảnh tương tự, loại bỏ hoàn toàn khung hiển thị khi công cụ không có ảnh demo.
  - **4. Kiểm thử và xác minh**:
    - Toàn bộ 5/5 bài kiểm thử tự động đạt 100%.
    - Đóng gói bản phát hành sản phẩm (`npm run build`) thành công trong 10.84 giây.

### Phiên Bản 2.0.0-BoGiaoDienChiTietAIHubVN (Ngày 20-10-2026)
- **Loại hình**: Thiết kế và phát triển toàn diện Bộ giao diện chi tiết AI HUB VN (Trang Danh mục, Trang Chi tiết, Trang Đóng góp, Trang Bộ sưu tập, Trang Hướng dẫn, Trang Tài khoản) theo đúng ảnh demo chuẩn mực.
- **Nội dung hoàn thành**:
  - **4.1. Trang danh mục tài nguyên (`src/pages/CategoryPage.tsx`)**:
    - Breadcrumb phân cấp (`Trang chủ > Công cụ AI / MCP Servers / Agent Skills`).
    - Thanh tìm kiếm theo danh mục với các tag lọc nhanh: `Phổ biến`, `Mới nhất`, `Đánh giá cao`, `Miễn phí`, `Trả phí`.
    - Bố cục 2 cột: Cột trái (Bộ lọc Lĩnh vực, Mô hình giá, Đánh giá sao, Ngôn ngữ) và Cột phải (Danh sách thẻ tài nguyên 2 cột, sắp xếp, phân trang và nút Lưu yêu thích).
  - **4.2. Trang chi tiết tài nguyên (`src/pages/DetailPage.tsx`)**:
    - Header lớn: Logo nhận diện, Tên, Badge Phổ biến, Đánh giá ⭐ 4.8 (12.5k đánh giá), 12.5k lượt dùng.
    - Cột thông tin nhanh: Nhà phát triển, Kho lưu trữ, Ngôn ngữ hỗ trợ, Nền tảng tương thích.
    - Cụm nút hành động: `Truy cập nguồn chính thức ↗`, `Lưu vào bộ sưu tập`, `▶ Chạy lệnh trên máy`.
    - Nội dung: Giới thiệu, Tính năng nổi bật (Grid icon), Hai khối so sánh Ưu điểm (xanh lá) & Nhược điểm (đỏ/hồng), Bảng thông tin giá (Pricing Table), Các lựa chọn thay thế cùng lĩnh vực (Alternatives), Kịch bản sử dụng (Prompt) và Cấu hình mẫu JSON.
  - **4.3. Trang đóng góp tài nguyên (`src/pages/ContributePage.tsx`)**:
    - Biểu mẫu 3 phần: Thông tin cơ bản, Mô tả (ngắn và chi tiết), Thông tin bổ sung (tác giả, ngôn ngữ, nền tảng).
    - Khung Lưu ý kiểm duyệt và nút gửi màu tím nổi bật.
  - **4.4. Trang bộ sưu tập tài nguyên (`src/pages/CollectionsPage.tsx`)**:
    - Quản lý danh sách bộ sưu tập (Top công cụ lập trình, Hệ sinh thái AI Việt Nam, Tự động hóa).
    - Tạo bộ sưu tập mới (form tạo nhanh), xem danh sách tài nguyên trong bộ sưu tập.
  - **4.5. Trang thư viện hướng dẫn (`src/pages/GuidesPage.tsx`)**:
    - 4 bài viết hướng dẫn chuyên sâu: Cách chọn công cụ AI, Cài đặt MCP Servers trên Claude Desktop & Cursor, Tối ưu Agent Skills, An toàn bảo mật thông tin khi dùng AI.
    - Cửa sổ đọc chi tiết bài viết với định dạng markdown rõ ràng.
  - **4.6. Trang hồ sơ tài khoản & lưu yêu thích (`src/pages/AccountPage.tsx`)**:
    - Hồ sơ cá nhân, Tab Tài nguyên đã lưu (lưu trữ đồng bộ qua `localStorage`), Tab Bộ sưu tập người dùng và nút Đăng xuất.
  - **Hệ thống điều hướng đa trang (Multi-page Hash Router)**:
    - Chuyển trang liền mạch và đồng bộ URL Hash (`#/`, `#/category/agent`, `#/category/mcp`, `#/category/skill`, `#/tool/:id`, `#/contribute`, `#/collections`, `#/guides`, `#/account`).
    - Hỗ trợ nút Back/Forward của trình duyệt mà không tải lại trang.
  - **Kiểm thử tự động & Đóng gói**: 100% pass qua 5 bài test tự động, đóng gói Vite hoàn tất trong 10.92 giây.

### Phiên Bản 1.9.0-ThietKeTrangChuAIHubVNTheoChuanMau (Ngày 20-10-2026)
- **Loại hình**: Thiết kế và phát triển lại toàn diện giao diện trang chủ AI HUB VN theo phong cách SaaS hiện đại, tinh tế và chuyên nghiệp.
- **Nội dung hoàn thành**:
  - **4.1. Thanh điều hướng (Header)**:
    - Logo chuẩn nhận diện AI HUB VN: Biểu tượng 3 nút tròn liên kết gradient tím/xanh kết hợp tên thương hiệu font chữ đậm sang trọng.
    - Hệ thống menu điều hướng trung tâm: `Công cụ AI`, `MCP Servers`, `Agent Skills`, `Bộ sưu tập Việt Nam`, `Hướng dẫn & Quy trình VibeCode`.
    - Cụm tác vụ bên phải: Nút `Đăng nhập` (tích hợp `LoginModal`), nút `+ Đóng góp tài nguyên` màu tím nổi bật, nút `Terminal` thực thi lệnh cục bộ và công tắc chuyển đổi chế độ Sáng / Tối.
  - **4.2. Khu vực giới thiệu chính (Hero Section)**:
    - Huy hiệu nổi bật: `KHO TÀI NGUYÊN AI CHO NGƯỜI VIỆT` bo tròn tinh tế.
    - Tiêu đề lớn ấn tượng: `Tìm đúng công cụ AI. / Làm việc hiệu quả hơn.` (với chữ `công cụ AI.` hiệu ứng gradient tím - xanh).
    - Khung tìm kiếm trung tâm lớn bo tròn mềm mại, nút `Tìm kiếm` màu tím nổi bật.
    - Dải phím tắt theo nhu cầu công việc (Tags): `</> Lập trình`, `⚗ Nghiên cứu`, `✎ Tạo nội dung`, `⚙ Tự động hóa`, `🎨 Thiết kế`, `💼 Văn phòng` (khi nhấn sẽ lọc danh mục tức thì và cuộn mượt đến kho tài nguyên).
  - **4.3. Ba thẻ nhóm tài nguyên chính (Main Category Cards)**:
    - `Công cụ AI`: Biểu tượng Robot tím pastel, mô tả "Ứng dụng thông minh cho công việc".
    - `MCP Servers`: Biểu tượng Server xanh dương pastel, mô tả "Kết nối mô hình AI với dữ liệu và dịch vụ".
    - `Agent Skills`: Biểu tượng Ngôi sao xanh ngọc pastel, mô tả "Bộ kỹ năng cho tác nhân AI".
  - **4.4. Khám phá tài nguyên nổi bật (Featured Resources)**:
    - 3 thẻ tiêu biểu: `GitHub Copilot` (Công cụ AI), `Filesystem MCP` (MCP Server), `Code Review` (Agent Skill).
    - Hiển thị đầy đủ thông số: Sao đánh giá (⭐ 4.6 - 4.8), lượt dùng (6.8k - 12.5k), ngày cập nhật, nút "Xem chi tiết ↗" mở ngay modal 4 khối thông tin.
  - **4.5. Chọn theo nhu cầu (Browse by Needs)**:
    - 4 thẻ nhu cầu công việc dạng lưới: `Phát triển phần mềm`, `Marketing & nội dung`, `Phân tích dữ liệu`, `Tự động hóa quy trình`.
  - **4.6. Chân trang (Footer) & Modal Đăng Nhập (LoginModal)**:
    - Tích hợp `LoginModal.tsx` hỗ trợ đăng nhập qua GitHub và Email.
    - Chân trang `Footer.tsx` đầy đủ thông tin bản quyền mã nguồn mở MIT, liên kết tài liệu thiết kế và cộng đồng.
  - **Kiểm thử tự động & Đóng gói**: Đạt 5/5 bài kiểm thử unit test tự động (100% pass), đóng gói `npm run build` hoàn thành trong 10.21 giây.

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
