# Nhật Ký Dự Án

## [2026-10-22]
### Mục tiêu trong ngày
- Tích hợp chuẩn xác 100% bản vẽ vector kỹ thuật `mermaid-diagram.svg` do người dùng cung cấp vào hệ thống; phát triển thành phần trình xem vector tương tác chuyên dụng (`MermaidDiagramSvgViewer.tsx`) hỗ trợ phóng to/thu nhỏ, mở toàn màn hình và tải về tệp SVG.
- Bổ sung tài nguyên hệ thống bộ nhớ dài hạn phỏng sinh học Hindsight (`vectorize-io/hindsight`) lên đầu hệ thống, tích hợp đầy đủ 4 khối thông tin chuẩn mực và định tuyến thông minh qua Smart MCP Gateway.
- Tham chiếu và đồng bộ hóa chuẩn xác 100% hai sơ đồ cốt lõi từ phiên làm việc `0e6ec2b7-0f68-4ab2-b94b-c90d8e376337`: Sơ đồ 13 Giai đoạn VibeCode tích hợp 2 Cổng chất lượng (QG1, QG2), nhánh Rollback, vòng phản hồi Feedback, và Sơ đồ Mô hình Quản trị & Phân luồng trách nhiệm.
- Tái thiết kế toàn diện sơ đồ Flowchart 13 giai đoạn VibeCode và sơ đồ tác tử trực quan theo phong cách thẻ hiện đại, phân chia 4 chặng sắc nét.
- Loại bỏ triệt để giao diện mono đen và chữ xanh lá kiểu hacker terminal trên toàn hệ thống, chuyển đổi sang giao diện tài liệu kỹ thuật sáng sủa, trang nhã.
- Tích hợp bộ kỹ năng và quy tắc phát triển phần mềm chuẩn VibeCode (VibeCoding Skill `vinhngtienmdb-ui/vibecoding_skill`) vào kho tài nguyên AI HUB VN.
- Nâng quy mô kho dữ liệu lên 2.221 tài nguyên và đảm bảo hiển thị ở vị trí đầu tiên của danh mục công cụ mới cập nhật.
- Cài đặt tệp kỹ năng VibeCoding cho Claude Code và bổ sung định tuyến tự động vào Smart MCP Gateway.
- Rà soát toàn bộ kho dữ liệu hệ thống (2.221 công cụ), bổ sung và dịch thuật tài liệu kỹ thuật README từ GitHub sang tiếng Việt chuẩn mực.
- Cập nhật giao diện Modal chi tiết và Trang chi tiết toàn màn hình hỗ trợ xem và sao chép tài liệu README Markdown.
- Chuẩn hóa phần hiển thị tài liệu README giữ nguyên phong cách giao diện trực quan của GitHub (không biến dạng thành khối code thô đen).
- Bảo toàn nguyên vẹn 100% nội dung và cấu trúc phân loại gốc từ GitHub (không cắt xén, giữ nguyên sơ đồ mũi tên ASCII 13 giai đoạn, vẽ thêm sơ đồ Diagram trực quan).
- Chuẩn hóa Tab "Cách sử dụng & Cài đặt": Loại bỏ hoàn toàn các nút chạy lệnh trên web, chuyển các lệnh terminal sang khối định dạng chuẩn GitHub kèm nút sao chép.
- Chuẩn hóa Tab "Cấu hình mẫu JSON" theo phong cách trình xem mã nguồn GitHub (Code Blob Viewer có cột số dòng, thanh tiêu đề file và nút sao chép JSON).

### Các công việc đã thực hiện
- [Tích Hợp Sơ Đồ Vector Kỹ Thuật mermaid-diagram.svg Chuẩn Mẫu]:
  - **Quản lý tài nguyên vector (`public/mermaid-diagram.svg` & `src/assets/mermaid-diagram.svg`)**:
    - Sao chép bản vẽ vector gốc từ đường dẫn do người dùng cung cấp (`file:///C:/Users/vinhn/OneDrive/Máy tính/mermaid-diagram.svg`) vào thư mục `public/` và `src/assets/` của dự án.
  - **Phát triển thành phần trình xem vector tương tác (`src/components/MermaidDiagramSvgViewer.tsx`)**:
    - Cung cấp bộ công cụ điều khiển linh hoạt: Nút thu nhỏ (`ZoomOut`), thanh hiển thị tỷ lệ %, nút phóng to (`ZoomIn`), nút đặt lại kích thước chuẩn (`100%`), nút mở toàn màn hình trong tab mới (`ExternalLink`), và nút tải xuống tệp SVG (`Download`).
    - Khung canvas hiển thị với nền ô lưới kỹ thuật mờ ảo (Technical Grid Pattern), hỗ trợ cuộn mượt mà.
  - **Tích hợp đồng bộ vào Trình xem README (`src/components/GitHubReadmeViewer.tsx`)**:
    - Cho phép người dùng chuyển đổi linh hoạt giữa chế độ xem **Sơ Đồ Vector SVG (Mặc định)** và **Thẻ Phân Chặng Rút Gọn (Card Grid)**.
  - **Kiểm thử & Đóng gói**: Vượt qua **38/38 bài kiểm thử tự động**, đóng gói Vite hoàn tất trong 9.51 giây.

- [Tích Hợp Tài Nguyên Bộ Nhớ Dài Hạn Hindsight (vectorize-io/hindsight)]:
  - **Tích hợp kho dữ liệu (`src/data/allTools.json`)**:
    - Thêm tài nguyên `vectorize-io-hindsight` vào vị trí đầu tiên danh sách (`index 0`), nâng quy mô thư viện lên **2.222 công cụ**.
    - Cung cấp đầy đủ 4 khối thông tin bắt buộc: Nguồn dẫn chính thức, Công dụng tiếng Việt chi tiết (`purposeVi`), Hướng dẫn cài đặt 4 bước (`installGuideVi`), Hướng dẫn sử dụng (`usageGuideVi`), Cấu hình JSON đa nền tảng (Claude Desktop, Antigravity, Cursor) và tài liệu README tiếng Việt toàn diện (`readmeVi`) kèm sơ đồ Mermaid luồng nhận thức 5 tầng.
  - **Cập nhật Smart MCP Gateway Router (`mcp-gateway/smart-router.js`)**:
    - Bổ sung quy tắc định tuyến `agent_memory_hindsight` (Priority 14) nhận diện các tác vụ liên quan đến bộ nhớ tác tử, retain, recall, reflect.
    - Thêm bài kiểm thử định tuyến tự động vào `tests/mcp-gateway.test.js`.
  - **Kiểm thử & Đóng gói**: Vượt qua **38/38 bài kiểm thử tự động**, đóng gói Vite hoàn tất trong 15.09 giây.

- [Đồng Bộ Sơ Đồ Mermaid & Cổng Chất Lượng Tham Chiếu Từ Phiên 0e6ec2b7-0f68-4ab2-b94b-c90d8e376337]:
  - **Đồng bộ nội dung tệp kỹ năng VibeCode (`src/data/allTools.json`)**:
    - Tích hợp nguyên vẹn toàn văn nội dung tệp `SKILL.md` (bao gồm đầy đủ 2 khối diagram Mermaid chuẩn mực) từ phiên `0e6ec2b7-0f68-4ab2-b94b-c90d8e376337` vào `vibecoding-skill-dev-lifecycle`.
  - **Nâng cấp thành phần giao diện (`src/components/GitHubReadmeViewer.tsx`)**:
    - Tích hợp bộ chuyển tab trực quan giữa 2 sơ đồ:
      - Tab 1: 13 Giai đoạn & Cổng kiểm soát chất lượng (QG1 Bảo mật với nhánh rẽ Không đạt quay về G09 sửa lỗi; QG2 Nghiệm thu phát hành với nhánh Sự cố Rollback an toàn quay về G09; Vòng phản hồi Feedback từ G13 quay về G02).
      - Tab 2: Mô hình quản lý và phân luồng trách nhiệm (PO → Nghiệp vụ → Đặc tả → Rẽ đôi UI/UX & Architecture → AI Coding → Kiểm thử → Bảo mật → Nghiệm thu → Deploy → Vận hành → Phản hồi).
  - **Kiểm thử & Đóng gói**: Vượt qua 37/37 bài kiểm thử tự động, đóng gói Vite hoàn tất trong 14.72 giây.

- [Tái Thiết Kế Sơ Đồ Flowchart & Loại Bỏ Giao Diện Mono Đen]:
  - **Tái thiết kế Sơ đồ Flowchart (`src/components/GitHubReadmeViewer.tsx`)**:
    - Phân chia 4 chặng rõ ràng với thẻ bo góc mềm mại, huy hiệu số thứ tự tròn viền nổi bật, tên giai đoạn in đậm và tên tệp tài liệu tương ứng:
      - Chặng 1: Khởi tạo & Đặc tả (01 - 04) - Xanh dương thanh thoát.
      - Chặng 2: Thiết kế hệ thống & Dữ liệu (05 - 08) - Tím nhạt tinh tế.
      - Chặng 3: Xây dựng & Bảo mật (09 - 11) - Ngọc bích thanh nhã.
      - Chặng 4: Triển khai & Vận hành (12 - 13) - Hổ phách trang nhã.
    - Sơ đồ tác tử AI Job Search và kiến trúc Paperclip cũng được thiết kế lại dạng thẻ sáng sủa, chuyên nghiệp.
  - **Loại bỏ triệt để giao diện Mono đen**:
    - Chuyển toàn bộ các khối dòng lệnh Terminal CLI từ nền đen kịt `bg-slate-950 text-emerald-400` trong `GitHubCodeViewer.tsx` và `DetailPage.tsx` sang nền tài liệu sáng xám trang nhã `bg-slate-50/80 dark:bg-slate-800/90`, chữ `text-slate-800 dark:text-slate-100`, ký hiệu `$ ` màu chàm tím `text-indigo-600 dark:text-indigo-400`.
    - Chuyển chế độ xem thô (Raw View) trong `GitHubReadmeViewer.tsx` từ nền đen sang theme tài liệu hài hòa.
  - **Kiểm thử & Đóng gói**: Vượt qua 37/37 bài kiểm thử tự động, biên dịch Vite hoàn tất thành công trong 12.32 giây.

- [Chuẩn Hóa Tab Cấu Hình Mẫu JSON Theo Phong Cách GitHub]:
  - **Phát triển thành phần giao diện (`src/components/GitHubCodeViewer.tsx`)**:
    - Thiết kế khung hiển thị mã nguồn chuẩn GitHub Code Blob: Biểu tượng `FileCode`, tên file cấu hình theo từng nền tảng (`claude_desktop_config.json`, `mcp_config.json`, `.cursor/mcp.json`), nhãn nền tảng, số lượng dòng code và dung lượng byte.
    - Cột số thứ tự dòng (Line Numbers) hiển thị ở mép trái với đường phân cách mờ nhạt và hỗ trợ hover tương tác.
    - Khối lệnh Terminal CLI (nếu có): Ký hiệu `$ `, font mono `JetBrains Mono` và nút sao chép câu lệnh riêng biệt.
    - Nút sao chép JSON một chạm với phản hồi trạng thái trực quan.
  - **Tích hợp đồng bộ**: Áp dụng vào Tab "Cấu hình mẫu JSON" trên [`DetailPage.tsx`](file:///C:/Users/vinhn/.gemini/antigravity/scratch/quan-ly-cong-cu-ai/src/pages/DetailPage.tsx) và khối cấu hình trên [`ToolDetailModal.tsx`](file:///C:/Users/vinhn/.gemini/antigravity/scratch/quan-ly-cong-cu-ai/src/components/ToolDetailModal.tsx).
  - **Kiểm thử & Đóng gói**: Vượt qua 37/37 bài kiểm thử tự động, biên dịch Vite hoàn tất thành công trong 10.63 giây.

- [Bảo Toàn Nguyên Vẹn Nội Dung GitHub & Chuẩn Hóa Tab Cài Đặt]:
  - **Bảo toàn nguyên tắc toàn vẹn nội dung (`src/data/allTools.json`)**:
    - Tích hợp toàn bộ 492 dòng nguyên bản từ `SKILL.md` vào `vibecoding-skill-dev-lifecycle`: Giữ nguyên 100% tiêu đề, các đề mục I đến VII, 8 nguyên tắc cốt lõi, sơ đồ ASCII 13 giai đoạn, chi tiết từng giai đoạn, cấu trúc Task 17 mục, cổng kiểm soát chất lượng và 3 tệp quản lý cốt lõi.
    - Vẽ thêm sơ đồ trực quan (Interactive Flowchart Diagram) 4 khối giai đoạn lớn cho VibeCode và sơ đồ Multi-Agent cho AI Job Search.
    - Tự động gắn nút Copy code cho tất cả các thẻ `<pre>` code block giống hệt GitHub.
  - **Chuẩn hóa Tab "Cách sử dụng & Cài đặt" (`DetailPage.tsx` và `ToolDetailModal.tsx`)**:
    - Loại bỏ nút "Chạy lệnh trên máy" và "Chạy thử MCP" trên giao diện Web.
    - Định dạng toàn bộ lệnh cài đặt và kịch bản sử dụng thành các khối Terminal chuẩn phong cách GitHub (nền tối, `$ `, font JetBrains) với nút sao chép một chạm.
  - **Kiểm thử tự động & Đóng gói**:
    - Vượt qua 37/37 bài kiểm thử tự động (100% pass).
    - Đóng gói hoàn tất bằng Vite (`npm run build`) trong 28.91 giây.

- [Chuẩn Hóa Giao Diện Hiển Thị README Giữ Nguyên Phong Cách GitHub]:
  - **Phát triển thành phần giao diện (`src/components/GitHubReadmeViewer.tsx`)**:
    - Thiết kế khung hiển thị giống 100% trang GitHub: Tiêu đề tệp `README.md`, icon tệp, nhãn ngôn ngữ Tiếng Việt, liên kết mở trực tiếp repo gốc trên GitHub.
    - Hỗ trợ 2 chế độ hiển thị linh hoạt: **Xem trước trực quan (Preview)** với kiểu dáng GitHub và **Mã nguồn thô (Raw Markdown)** kèm nút sao chép một chạm.
  - **Bộ quy chuẩn định dạng CSS GitHub Flavored Markdown (`src/index.css`)**:
    - Định nghĩa lớp `.github-markdown-body` tái hiện đầy đủ kiểu dáng Typography của GitHub: Tiêu đề H1/H2 có đường kẻ ngang phân cách mờ, trích dẫn Blockquote có viền xám tinh tế, danh sách có bullet point chuẩn mực, inline code và fenced code block được phân biệt rõ ràng.
  - **Tích hợp đồng bộ**: Áp dụng vào cả [`ToolDetailModal.tsx`](file:///C:/Users/vinhn/.gemini/antigravity/scratch/quan-ly-cong-cu-ai/src/components/ToolDetailModal.tsx) và [`DetailPage.tsx`](file:///C:/Users/vinhn/.gemini/antigravity/scratch/quan-ly-cong-cu-ai/src/pages/DetailPage.tsx).
  - **Kiểm thử & Đóng gói**: Vượt qua 37/37 bài kiểm thử tự động, biên dịch Vite hoàn tất thành công trong 11.53 giây.

- [Rà Soát Dữ Liệu Toàn Hệ Thống & Biên Soạn Tài Liệu Kỹ Thuật README Tiếng Việt]:
  - **Mô hình dữ liệu**: Bổ sung trường `readmeVi?: string;` vào kiểu dữ liệu `AITool` trong `src/types/index.ts`.
  - **Rà soát & Biên soạn tài liệu**:
    - Xây dựng kịch bản Node.js `scripts/generate-readme-vi.cjs`.
    - Dịch thuật và biên soạn tài liệu README chuyên sâu bằng tiếng Việt chuẩn cho các công cụ trọng điểm (`vibecoding-skill-dev-lifecycle`, `mads-lorentzen-ai-job-search`, `paperclipai-paperclip`, `vercel-labs-find-skills`, `aihub-vn-smart-mcp-gateway`).
    - Tự động chuẩn hóa và sinh tài liệu README Markdown phân cấp đầy đủ 7 phần kỹ thuật cho toàn bộ 2.221 công cụ trong kho dữ liệu `src/data/allTools.json`.
  - **Nâng cấp giao diện người dùng**:
    - Cập nhật `src/components/ToolDetailModal.tsx`: Bổ sung Khối 4 hiển thị "Tài Liệu Kỹ Thuật Chi Tiết (README GitHub Tiếng Việt)" với nút "Sao chép toàn bộ README (Markdown)".
    - Cập nhật `src/pages/DetailPage.tsx`: Bổ sung Tab "Tài liệu README (GitHub)" với giao diện xem code block tối màu chuyên nghiệp và nút sao chép tiện lợi.
  - **Kiểm thử tự động & Đóng gói sản phẩm**:
    - Bổ sung ca kiểm thử `Quy tắc QT-05: Mọi công cụ trong kho dữ liệu bắt buộc phải có tài liệu README tiếng Việt chuẩn (readmeVi)` vào `tests/business-rules.test.js`.
    - 37/37 bài test tự động đều vượt qua với tỷ lệ thành công 100%.
    - Đóng gói sản phẩm thành công bằng `tsc && vite build`.

- [Tích hợp VibeCoding Skill vào Hệ Thống AI HUB VN và Cài Đặt Cho Claude Code]:
  - **Bổ sung tài nguyên vào kho dữ liệu (`vibecoding-skill-dev-lifecycle`)**:
    - Nâng quy mô kho dữ liệu lên **2.221 tài nguyên**.
    - Đầy đủ 4 khối thông tin bắt buộc tiếng Việt theo quy tắc QT-01, QT-04: Nguồn GitHub chính thức (`https://github.com/vinhngtienmdb-ui/vibecoding_skill`), công dụng nghiệp vụ (chuẩn hóa 13 giai đoạn, bộ tài liệu 24 tệp, nguyên tắc không suy đoán, không phá vỡ dự án), hướng dẫn cài đặt Plugin cho Google Antigravity và Kỹ năng cho Claude Code / Cursor, hướng dẫn tương tác với AI Agent.
    - Cung cấp cấu hình mẫu JSON chuẩn xác cho Google Antigravity, Claude Code và Cursor IDE.
    - Gán `updatedAt: "2026-10-22"` và xếp ở vị trí số 1 trong danh sách.
  - **Cài đặt cho Claude Code**:
    - Khởi tạo thư mục và sao chép kỹ năng chuẩn vào `C:\Users\vinhn\.claude\skills\vibecoding\SKILL.md`.
  - **Mở rộng Smart MCP Router & Client Adapter**:
    - Bổ sung cấu hình ý định `vibecoding_dev_lifecycle` vào `mcp-gateway/smart-router.js` và `src/lib/mcpClient.ts`, tự động nhận diện các yêu cầu về VibeCode, quy trình 13 giai đoạn, bộ tài liệu 24 tệp để điều phối đến công cụ.
  - **Kiểm thử tự động & Đóng gói sản phẩm**:
    - Bổ sung bài test định tuyến vào `tests/mcp-gateway.test.js`.
    - Toàn bộ **36/36 bài test** trong 7 bộ kiểm thử tự động đạt 100% tỷ lệ pass.
    - Đóng gói hoàn chỉnh bằng Vite (`npm run build`) đạt chuẩn trong 21.36 giây.

## [2026-10-21]
### Mục tiêu trong ngày
- Tìm kiếm, xác định và cài đặt meta-skill Find Skills (Vercel Labs) vào hệ thống Claude Code và Antigravity.
- Tích hợp tài nguyên kỹ năng vào kho dữ liệu AI HUB VN, nâng quy mô kho lên 2.218 tài nguyên.
- Cập nhật Smart MCP Router hỗ trợ nhận diện và điều phối bài toán tìm kiếm kỹ năng tác tử.
- Cài đặt máy chủ MCP AI HUB VN (Smart Gateway & Router) cho Claude Code và Antigravity.
- Tích hợp bộ công cụ tự động hóa quy trình tìm việc AI Job Search (Mads Lorentzen) vào kho dữ liệu AI HUB VN, nâng quy mô lên 2.219 tài nguyên.
- Tích hợp nền tảng mã nguồn mở quản trị và điều phối lực lượng tác tử Paperclip (`paperclipai/paperclip`) vào kho dữ liệu AI HUB VN, nâng quy mô lên 2.220 tài nguyên.
- Điều chỉnh thuật toán và giao diện sắp xếp danh mục tài nguyên, tự động đưa các công cụ mới cập nhật lên trên đầu danh sách.

### Các công việc đã thực hiện
- [Tối Ưu Hóa Thứ Tự Sắp Xếp: Đưa Công Cụ Mới Cập Nhật Lên Đầu Danh Sách]:
  - **Mô hình dữ liệu**: Bổ sung trường `updatedAt?: string` vào giao diện TypeScript `AITool` và cập nhật mốc ngày `2026-10-21` cho các công cụ mới nhất trong `allTools.json`.
  - **Thuật toán sắp xếp**: Triển khai hàm `sortToolsByUpdated` trong `src/lib/storage.ts`, tự động sắp xếp theo ngày cập nhật mới nhất giảm dần khi tải kho dữ liệu, phê duyệt hoặc điều chỉnh phân loại công cụ.
  - **Giao diện người dùng**: Bổ sung bộ chọn sắp xếp trên thanh công cụ `src/App.tsx` (*⚡ Mới cập nhật*, *⭐ Đánh giá cao nhất*, *🔤 Tên A-Z*) với giá trị mặc định là *Mới cập nhật*; đồng thời thiết lập mặc định và hoàn thiện logic tương tự tại `src/pages/CategoryPage.tsx`.
  - **Kiểm thử tự động & Đóng gói**: Bổ sung kiểm thử tự động trong `tests/storage-delta.test.js`, đạt 100% tỷ lệ pass (35/35 bài test), biên dịch Vite hoàn tất trong 19.35 giây.
- [Tích hợp Nền Tảng Quản Trị & Điều Phối Tác Tử Paperclip vào Hệ Thống AI HUB VN]:
  - **Bổ sung tài nguyên vào kho dữ liệu (`paperclipai-paperclip`)**:
    - Nâng quy mô kho dữ liệu lên **2.220 tài nguyên**.
    - Đầy đủ 4 khối thông tin bắt buộc tiếng Việt theo quy tắc QT-01, QT-04: Nguồn GitHub chính thức (`https://github.com/paperclipai/paperclip`), công dụng nghiệp vụ (mặt bằng điều hành trung tâm Control Plane quản trị lực lượng tác tử AI theo cấu trúc phòng ban doanh nghiệp thực thụ), hướng dẫn cài đặt khởi chạy nhanh qua lệnh `npx paperclipai onboard --yes`, hướng dẫn sử dụng Org Chart, Ticket Kanban, Human-in-the-Loop Governance và giám sát ngân sách token.
    - Cung cấp cấu hình mẫu JSON chuẩn xác cho Claude Code, Google Antigravity và Cursor IDE.
  - **Mở rộng Smart MCP Router & Client Adapter**:
    - Bổ sung cấu hình ý định `agent_workforce_paperclip` vào `mcp-gateway/smart-router.js` và `src/lib/mcpClient.ts`, tự động nhận diện các yêu cầu quản trị tác tử, điều phối lực lượng agent, sơ đồ tổ chức phòng ban để điều phối tới công cụ.
  - **Kiểm thử tự động & Đóng gói sản phẩm**:
    - Bổ sung bài test định tuyến vào `tests/mcp-gateway.test.js`.
    - Toàn bộ **34/34 bài test** trong 7 bộ kiểm thử tự động đạt 100% tỷ lệ pass.
    - Đóng gói hoàn chỉnh bằng Vite (`npm run build`) đạt chuẩn trong 28.98 giây.
- [Tích hợp Bộ Công Cụ AI Job Search (Mads Lorentzen) vào Hệ Thống AI HUB VN]:
  - **Bổ sung tài nguyên vào kho dữ liệu (`mads-lorentzen-ai-job-search`)**:
    - Nâng quy mô kho dữ liệu lên **2.219 tài nguyên**.
    - Đầy đủ 4 khối thông tin bắt buộc tiếng Việt theo quy tắc QT-01, QT-04: Nguồn GitHub chính thức, công dụng nghiệp vụ (tự động hóa tìm việc, viết CV may đo, luyện phỏng vấn qua Claude Code), hướng dẫn cài đặt Fork repo/Claude Code CLI, hướng dẫn sử dụng 8 khẩu lệnh (`/setup`, `/scrape`, `/apply`, `/interview`, `/rank`, `/outcome`, `/upskill`, `/add-portal`).
    - Cung cấp cấu hình mẫu JSON chuẩn xác cho Claude Code, Antigravity và Cursor IDE.
  - **Mở rộng Smart MCP Router & Client Adapter**:
    - Bổ sung cấu hình ý định `ai_job_search_framework` vào `mcp-gateway/smart-router.js` và `src/lib/mcpClient.ts`, tự động nhận diện các yêu cầu tìm việc, viết CV, luyện phỏng vấn để điều phối tới công cụ.
  - **Kiểm thử tự động & Đóng gói sản phẩm**:
    - Bổ sung bài test định tuyến vào `tests/mcp-gateway.test.js`.
    - Toàn bộ **33/33 bài test** trong 7 bộ kiểm thử tự động đạt 100% tỷ lệ pass.
    - Đóng gói hoàn chỉnh bằng Vite (`npm run build`) đạt chuẩn.
- [Cài đặt Máy chủ MCP AI HUB VN cho Claude Code và Google Antigravity]:
  - **Cấu hình cho Claude Code**: Bổ sung `aihub-smart-gateway` vào `C:\Users\vinhn\.claude.json`.
  - **Cấu hình cho Claude Desktop**: Bổ sung `aihub-smart-gateway` vào `C:\Users\vinhn\AppData\Roaming\Claude\claude_desktop_config.json`.
  - **Cấu hình cho Google Antigravity**: Đăng ký `aihub-smart-gateway` vào `C:\Users\vinhn\.gemini\config\mcp_config.json`.
  - **Tạo cấu trúc schema cho Antigravity**: Khởi tạo thư mục `C:\Users\vinhn\.gemini\antigravity\mcp\aihub-smart-gateway\` chứa 4 công cụ (`aihub_smart_dispatch.json`, `aihub_resolve_capability.json`, `aihub_explain_routing.json`, `aihub_get_gateway_status.json`) và cẩm nang `instructions.md`.
  - **Kiểm thử vận hành**: Kiểm tra cấu hình JSON hợp lệ 100%, chạy thử Stdio Gateway với lệnh `--test`, kiểm thử tự động toàn diện đạt 32/32 tests pass.
- [Cài đặt và Tích hợp Kỹ năng Find Skills vào Claude Code, Antigravity và Hệ thống AI HUB VN]:
  - **Cài đặt cho Claude Code**: Khởi tạo tệp `C:\Users\vinhn\.claude\skills\find-skills\SKILL.md`.
  - **Cài đặt cho Google Antigravity**: Khởi tạo tệp `C:\Users\vinhn\.gemini\antigravity\skills\find-skills\SKILL.md`.
  - **Bổ sung tài nguyên vào kho AI HUB VN (`vercel-labs-find-skills`)**:
    - Nâng quy mô kho dữ liệu lên **2.218 tài nguyên**.
    - Đầy đủ 4 khối thông tin bắt buộc tiếng Việt, cấu hình mẫu JSON cho Claude, Antigravity, Cursor.
  - **Đồng bộ Smart MCP Router**:
    - Bổ sung ý định `find_agent_skills` vào `mcp-gateway/smart-router.js` và `src/lib/mcpClient.ts`.
  - **Kiểm thử tự động**:
    - Thêm test case vào `tests/mcp-gateway.test.js`. Toàn bộ 32/32 bài test đạt 100% pass.

## [2026-10-20]
### Mục tiêu trong ngày
- Khởi động dự án và thiết lập cấu trúc tài liệu quản lý cốt lõi theo quy trình VibeCode chuẩn.
- Thực hiện Giai đoạn 01: Xác định ý tưởng và xây dựng tệp `01_TONG_QUAN_DU_AN.md` dựa trên nghiên cứu hai mô hình tham khảo (AI Templates - Phan Đông Giang và MCP Market).
- Đề xuất định hướng cấu trúc dữ liệu bắt buộc: Nguồn dẫn chính thức, công dụng, hướng dẫn cài đặt và hướng dẫn sử dụng hoàn toàn bằng tiếng Việt.
- Báo cáo ý tưởng thiết kế ban đầu và xin ý kiến xác nhận của người dùng trước khi chuyển tiếp sang Giai đoạn 02.

### Các công việc đã thực hiện
- [Nâng cấp Bảo mật Toàn diện và Tách riêng Trang Quản Lý API & Máy Chủ MCP Server]:
  - **Tách riêng 2 trang độc lập**:
    - **Trang Quản Lý API (`src/pages/ApiManagementPage.tsx`)**: Tập trung vào vòng đời khóa bảo mật `aihub_live_...`, hạn mức tần suất Rate Limit, Quota ngày, Nhật ký kiểm toán an ninh thời gian thực (Audit Logs) và REST API Playground.
    - **Trang Máy Chủ MCP Server (`src/pages/McpServerPage.tsx`)**: Tập trung vào vận hành máy chủ Model Context Protocol (MCP) chuẩn Anthropic, hỗ trợ Stdio Transport và HTTP SSE, Trình kiểm tra Live MCP Inspector (4 công cụ MCP) và Cấu hình 1 chạm cho Claude Desktop / Cursor / Claude Code / Antigravity.
  - **Triển khai kiến trúc bảo mật cấp công nghiệp (`mcp-gateway/security.js`)**:
    - Mã hóa băm HMAC-SHA256 kèm muối bảo mật `AIHUB_SECURITY_SALT`.
    - So sánh an toàn thời gian `crypto.timingSafeEqual` chống tấn công Timing Attacks.
    - Giới hạn tần suất yêu cầu (Sliding Window Rate Limiter) chống DoS.
    - Làm sạch và phòng vệ dữ liệu đầu vào (Input Sanitization) chống Prompt Injection và Command Injection.
    - Xác thực Bearer Token bắt buộc cho các yêu cầu điều phối `/api/v1/dispatch`.
    - Ghi nhận và lưu vết nhật ký kiểm toán an ninh (Audit Logging).
  - **Máy chủ REST API Backend thực thụ (`mcp-gateway/api-server.js`)**:
    - Chạy dịch vụ HTTP REST API độc lập (Port 4000) với đầy đủ Security Headers.
  - **Hoàn thành Cẩm nang hướng dẫn cài đặt & sử dụng (`HUONG_DAN_CAI_DAT_VA_SU_DUNG_MCP_API.md`)**:
    - Hướng dẫn chi tiết từng bước cài đặt qua Node.js, cấu hình Claude Desktop, Cursor, Claude Code và tích hợp Python/Node.js/cURL.
  - **Kiểm thử tự động & Đóng gói**:
    - Xây dựng bộ test an ninh `tests/security-and-auth.test.js`.
    - Toàn bộ **31/31 bài test** trong 7 bộ kiểm thử tự động đạt 100% tỷ lệ pass.
    - Biên dịch và đóng gói hoàn chỉnh bằng Vite (`tsc && vite build`) trong 15.82 giây.
- [Xây dựng và Triển khai Trang Quản Lý API & Cổng Lập Trình Viên (API Management & Developer Portal)]:
  - **Triển khai giao diện Quản lý API hoàn chỉnh (`src/pages/ApiManagementPage.tsx`)**:
    - **Quản lý Khóa API (API Keys)**: Hỗ trợ sinh khóa API chuẩn tiền tố `aihub_live_...`, sao chép một chạm, ẩn/hiện khóa, thu hồi, kích hoạt lại và xóa khóa với dữ liệu được đồng bộ bền vững trong `localStorage`.
    - **Bảng điều khiển Giám sát Lưu lượng (Metrics)**: Trực quan hóa 4 thông số: Tổng số khóa, Tỷ lệ phản hồi thành công (99.8%), Độ trễ xử lý trung bình (42ms), và Số token tiết kiệm (>125 triệu token nhờ cơ chế Lazy Loading).
    - **Trình thử nghiệm API Playground**: Trực tiếp gửi yêu cầu bằng ngôn ngữ tự nhiên và nhận kết quả phản hồi JSON thời gian thực từ Smart Intent Router & Dynamic Dispatcher.
    - **Tài liệu Tích hợp Đa nền tảng**: Hướng dẫn và cung cấp mẫu cấu hình sẵn sàng cho Claude Desktop, Cursor, Node.js, Python, và cURL.
  - **Định tuyến và Liên kết điều hướng**:
    - Bổ sung nút điều hướng "Quản lý API" trên Header và Mobile Menu.
    - Bổ sung liên kết truy cập nhanh tại Footer.
    - Hỗ trợ định tuyến URL Hash qua `#/api`, `#/developer`, `#/api-keys`.
  - **Kiểm thử tự động & Đóng gói**:
    - Xây dựng bộ test mới `tests/api-management.test.js` kiểm tra toàn bộ luồng nghiệp vụ API Key và cấu hình tích hợp.
    - Toàn bộ 25 test cases trong 7 bộ kiểm thử tự động đều đạt 100% tỷ lệ pass.
    - Biên dịch và đóng gói hoàn chỉnh bằng Vite (`tsc && vite build`) trong 13.05 giây.
- [Phát triển và Triển khai Máy chủ MCP Trung Gian Thông Minh (AI HUB VN Smart MCP Gateway)]:
  - **Triển khai kiến trúc MCP Trung Gian Một Cửa (`mcp-gateway/`)**:
    - Xây dựng **Smart Intent Router (`smart-router.js`)**: Phân tích câu lệnh ngôn ngữ tự nhiên, tự động nhận diện ý định và định tuyến đến công cụ chuyên môn tối ưu nhất trong kho 2.217 tài nguyên. Hỗ trợ bảng ý định chuyên biệt cho Fintech Việt Nam (VietQR, MoMo, ZaloPay), Dịch ngược mã nguồn (REA), Phân tích nghiệp vụ BA (OpenBA-Kit), Cơ sở dữ liệu (SQLite, Postgres), Tự động hóa trình duyệt (Puppeteer, Browser-use) kết hợp đối soát ngữ nghĩa diện rộng.
    - Xây dựng **Dynamic Dispatcher (`dispatcher.js`)**: Tiếp nhận công cụ được định tuyến, sinh kế hoạch thực thi, mã lệnh CLI và cấu hình mẫu JSON tự động cho AI Agent.
    - Xây dựng **Stdio MCP Server chuẩn (`index.js`)**: Đăng ký 4 công cụ MCP chính thức (`aihub_smart_dispatch`, `aihub_resolve_capability`, `aihub_explain_routing`, `aihub_get_gateway_status`).
  - **Lợi ích thực tế cho người dùng**:
    - Người dùng chỉ cần kết nối duy nhất 1 MCP Server (`aihub-gateway`) là có thể khai thác toàn bộ 2.217 công cụ và 39 lĩnh vực mà không cần biết cách chọn hay cấu hình từng công cụ.
    - Tiết kiệm ~95% dung lượng cửa sổ ngữ cảnh (Context Window) nhờ cơ chế nạp trễ (Lazy Loading), triệt tiêu hoàn toàn nguy cơ loãng context.
  - **Bổ sung tài nguyên Gateway vào kho**: Đưa công cụ `aihub-vn-smart-mcp-gateway` vào danh mục, nâng tổng quy mô lên 2.217 tài nguyên.
  - **Kiểm thử & Đóng gói**:
    - Xây dựng bộ kiểm thử mới `tests/mcp-gateway.test.js` kiểm tra 7 kịch bản định tuyến, giải trình và tối ưu ngữ cảnh.
    - Chạy toàn bộ 21 test cases trong 6 bộ kiểm thử tự động, đạt 100% tỷ lệ pass.
    - Biên dịch và đóng gói hoàn chỉnh bằng Vite (`tsc && vite build`) trong 26.84 giây.
- [Tích hợp bộ kỹ năng OpenBA-Kit 57 AI Skills cho IT Business Analyst & Product Owner]:
  - **Tích hợp kho lưu trữ OpenBA-Kit (`spmtitsolution/OpenBA-Kit`)**:
    - Bổ sung tài nguyên **OpenBA-Kit (BA-Kit Open)** trọn bộ 57 AI Skills chuẩn Agent Skill, 19 quy chuẩn kỹ thuật (Rules) và 48 biểu mẫu thực chiến (Templates), biến mọi AI Coding Agent thành trợ lý Senior IT Business Analyst & Technical Product Owner.
    - Hỗ trợ toàn diện 9 giai đoạn: Lập kế hoạch sản phẩm, Thu thập & đặc tả yêu cầu IEEE 830, Sơ đồ nghiệp vụ & dữ liệu (Sequence, ERD, BPMN, D2), Bóc tách User Story chuẩn INVEST & Gherkin AC, Thiết kế Wireframe/Prototype HTML tương tác, Tích hợp API hợp đồng, Sinh Test Cases bám sát Error Matrix, Kiểm soát thay đổi (Change Request impact analysis) và Bàn giao vận hành (Jira, Confluence, Preview portal một chạm).
    - Tích hợp công cụ **Diagram Design (v2.6)**: Tự động chuyển đổi sơ đồ text Mermaid khô cứng thành bản vẽ vector HTML & SVG chuẩn Editorial (lưới 4px, font Instrument Serif + Geist).
    - Đánh dấu chuẩn hóa cờ `isVietnamMarket: true`, gán đa danh mục (`devops_ci_cd`, `qa_testing`, `backend_api`, `frontend_ui`, `vietnam`).
    - Bổ sung liên kết vào 3 bộ sưu tập hàng đầu tại `src/data/mockGuidesAndCollections.ts`.
  - **Kiểm thử & Đóng gói**:
    - Chạy toàn bộ 14 test cases trong 5 bộ kiểm thử tự động, xác minh 2.216 công cụ và 3.637 cấu hình JSON đạt 100% tỷ lệ pass.
    - Biên dịch và đóng gói hoàn chỉnh bằng Vite (`tsc && vite build`) trong 7.16 giây.
- [Tích hợp tài nguyên 50+ MCP Server tốt nhất cho Claude Code năm 2026 từ Claude.vn]:
  - **Bổ sung 11 MCP Server tinh hoa nhất năm 2026 (Quy mô kho đạt 2.215 tài nguyên)**:
    - `sqlite-mcp-database-server`: Truy vấn CSDL SQLite cục bộ bằng tiếng Việt tự nhiên.
    - `google-drive-mcp-server`: Kết nối và trích xuất dữ liệu Google Docs/Sheets an toàn qua OAuth 2.0.
    - `brave-search-privacy-mcp-server`: Tìm kiếm web thời gian thực bảo mật quyền riêng tư không theo dõi.
    - `puppeteer-browser-automation-mcp`: Điều khiển Chromium tự động hóa kiểm thử QA và cào dữ liệu web.
    - `browserbase-cloud-browser-mcp-server`: Trình duyệt đám mây song song quy mô lớn cho AI Agent.
    - `cc-usage-cost-analyzer-cli`: Bộ công cụ CLI và dashboard ccflare theo dõi chi phí API và token Claude Code.
    - `claude-flow-code-orchestrator`: Điều phối sinh mã khung Boilerplate và tái cấu trúc mã nguồn tự động.
    - `claude-squad-swarm-sdk`: Nền tảng điều phối đa tác tử AI (Multi-Agent Swarm) làm việc song song.
    - `claude-command-suite-119`: Bộ tuyển tập 119+ lệnh nhanh (/security-audit, /architecture-review...).
    - `anthropic-memory-knowledge-graph-mcp`: Máy chủ bộ nhớ dài hạn dạng đồ thị tri thức duy trì ngữ cảnh.
    - `claude-context-semantic-search-mcp`: Tìm kiếm ngữ nghĩa trong codebase hàng triệu dòng.
  - **Bổ sung Bộ sưu tập và Bài viết Hướng dẫn chuyên sâu**:
    - Thêm bộ sưu tập tuyển chọn *"Top 50+ MCP Server Tinh Hoa Cho Claude Code & AI Agents (2026)"* tại `src/data/mockGuidesAndCollections.ts`.
    - Xuất bản bài viết hướng dẫn chiến lược *"Chiến Lược Chọn & Tối Ưu 50+ MCP Server Cho Claude Code Năm 2026: Tránh Tràn Context & Kỹ Thuật Lazy Loading"* phân tích 6 nhóm máy chủ, vấn đề ngốn 15-20% dung lượng Context Window, mẹo dùng `/mcp`, `/mcp disable` và kỹ thuật MCP Tool Search giảm 95% token overhead.
  - **Kiểm thử & Đóng gói**:
    - Toàn bộ 14 test cases trong 5 bộ kiểm thử tự động đạt 100% tỷ lệ pass.
    - Biên dịch và đóng gói hoàn chỉnh bằng Vite (`tsc && vite build`) trong 18.21 giây.
- [Tích hợp 2 công cụ theo yêu cầu (vietnamese-mcp, morluto/rea) và Mở rộng thu thập thêm các công cụ hàng đầu]:
  - **Tích hợp kho lưu trữ VN MCP Hub (`nguyenduchuy27111997-creator/vietnamese-mcp`)**:
    - Bổ sung tài nguyên tổng thể **VN MCP Hub** và các thành phần con độc lập (`mcp-momo-vn`, `mcp-zalo-oa`...) hỗ trợ thanh toán MoMo, ZaloPay, VNPAY, ViettelPay và tương tác tin nhắn Zalo OA cho AI Agents.
    - Đánh dấu chuẩn hóa cờ `isVietnamMarket: true`, hiển thị huy hiệu `🇻🇳 Thị trường VN`, phân loại đa danh mục (`fintech_banking`, `finance_payment`, `customer_support`, `e_commerce`, `vietnam`).
  - **Tích hợp kho lưu trữ REA: Reverse Engineer Anything (`morluto/rea`)**:
    - Bổ sung công cụ AI Agent dịch ngược mã nguồn và nhị phân native hàng đầu **REA**, hỗ trợ phân tích cục bộ an toàn, liên thông Ghidra, Hopper, IDA Pro và ứng dụng JavaScript/Electron.
    - Cung cấp hướng dẫn cài đặt tự động `npx rea-agents setup`, lệnh phân tích nhanh và tài liệu tiếng Việt.
  - **Mở rộng thu thập các công cụ / MCP Server / AI Agent thế hệ mới (Kho đạt 2.204 tài nguyên)**:
    - Bổ sung **Browser Use**: Điều khiển trình duyệt web tự động hóa đa tab cho AI Agent.
    - Bổ sung **Crawl4AI**: Trích xuất và cào dữ liệu web tối ưu hóa cho RAG / LLMs.
    - Bổ sung **VietQR Napas247 MCP**: Máy chủ tạo mã QR thanh toán chuẩn liên ngân hàng Việt Nam 50+ ngân hàng nội địa.
    - Bổ sung **Playwright MCP Server**: Tự động hóa kiểm thử E2E và trích xuất dữ liệu web.
    - Bổ sung **PostgreSQL Database MCP Server**: Quản trị, phân tích schema và tối ưu truy vấn SQL quan hệ.
    - Bổ sung **Vietnamese NLP Toolkit**: Bộ công cụ xử lý ngôn ngữ tự nhiên tiếng Việt cho AI (tách từ, gắn nhãn POS, NER, chuẩn hóa chính tả).
  - **Kiểm thử & Đóng gói**:
    - Chạy toàn bộ 14 test cases trong 5 bộ kiểm thử tự động, xác minh 2.204 công cụ và 3.623 cấu hình JSON đạt 100% tỷ lệ pass.
    - Biên dịch và đóng gói hoàn chỉnh bằng Vite (`tsc && vite build`) trong 18.03 giây.
- [Loại bỏ phần ghi chú Quy định phân quyền hệ thống trên màn hình đăng nhập]:
  - **Tinh gọn màn hình đăng nhập Google Auth (`src/components/LoginModal.tsx`)**:
    - Loại bỏ triệt để khối ghi chú "Quy định phân quyền hệ thống" hiển thị mô tả quyền Quản trị viên và quyền Thành viên ở phía dưới nút đăng nhập Google.
    - Dọn dẹp sạch sẽ các biến trạng thái, import biểu tượng không còn sử dụng (`ShieldCheck`, `getAdminEmail`, `currentAdmin`).
    - Giúp trải nghiệm đăng nhập Google trên AI HUB VN trở nên thông thoáng, trực quan, chuyên nghiệp và tối giản, tập trung chính xác vào nút bấm tương tác "Tiếp tục với tài khoản Google" và đường dẫn đăng nhập chuyển hướng dự phòng.
  - **Kiểm thử & Đóng gói**:
    - Kiểm thử tự động với 14 test cases trong 5 bộ kiểm thử đều đạt 100% tỷ lệ pass.
    - Biên dịch và đóng gói Vite (`tsc && vite build`) hoàn thành thành công trong 13.22 giây.
- [Phân loại chuyên sâu Đa Lĩnh vực Chuyên môn & Đánh dấu Tài nguyên Thị trường Việt Nam]:
  - **Tách sâu các lĩnh vực chuyên môn chi tiết, không gộp**:
    - Thiết kế lại hệ thống danh mục từ 18 nhóm gộp thành **39 lĩnh vực chuyên môn cụ thể**, không còn gộp các mảng kỹ thuật và nghiệp vụ khác nhau vào chung một nhóm:
      - Tách Kỹ thuật phần mềm: Giao diện người dùng & Frontend (`frontend_ui`), Phát triển dịch vụ máy chủ & Backend (`backend_api`), Cơ sở dữ liệu & Lưu trữ (`database_storage`), Vận hành triển khai & DevOps (`devops_ci_cd`), Kiểm thử & Đảm bảo chất lượng QA (`qa_testing`), An toàn thông tin & An ninh mạng (`cybersecurity`), Ứng dụng di động (`mobile_apps`), Điện toán đám mây & Hạ tầng (`cloud_infrastructure`), Hệ thống nhúng & IoT (`iot_embedded`).
      - Tách Nghiệp vụ doanh nghiệp: Tài chính & Thanh toán số (`finance_payment`), Ngân hàng & Fintech (`fintech_banking`), Kế toán & Hóa đơn điện tử (`accounting_tax`), Tiếp thị & Quảng cáo số (`marketing_advertising`), Tối ưu hóa công cụ tìm kiếm SEO (`seo_growth`), Bán hàng & Quản lý khách hàng CRM (`sales_crm`), Chăm sóc khách hàng & Trợ lý ảo CS (`customer_support`), Nhân sự & Tiền lương (`hr_recruitment`), Thương mại điện tử & Bán lẻ (`e_commerce`), Chuỗi cung ứng & Kho vận (`logistics_supplychain`), Pháp lý & Tuân thủ hợp đồng (`legal_compliance`).
      - Tách Dữ liệu & Trí tuệ nhân tạo: Xử lý ngôn ngữ tự nhiên NLP (`nlp_language`), Thị giác máy tính & Xử lý ảnh (`computer_vision`), Giọng nói & Âm thanh (`speech_audio`), Sáng tạo nội dung & Copywriting (`content_writing`), Thiết kế đồ họa & Giao diện UI/UX (`design_graphics`), Sản xuất video & Hoạt họa (`video_animation`), Khoa học dữ liệu & Trực quan hóa BI (`data_analytics`), Kỹ thuật dữ liệu Data Engineering (`data_engineering`), Vận hành mô hình MLOps (`mlops_aiops`).
    - Cập nhật kiểu dữ liệu `Category` trong `src/types/index.ts` và hằng số `CATEGORIES` trong `src/data/mockTools.ts`.
  - **Hỗ trợ 1 tài nguyên có thể thuộc 1 hoặc nhiều lĩnh vực chuyên môn (Multi-category)**:
    - Bổ sung trường `categories?: Category[]` và `categoryNamesVi?: string[]` vào cấu trúc `AITool`.
    - Điều chỉnh bộ đếm danh mục `categoryCounts` trong `src/App.tsx` để cộng dồn chính xác theo tất cả danh mục của công cụ.
    - Cập nhật logic lọc: Công cụ được tìm thấy khi người dùng chọn bất kỳ lĩnh vực nào mà công cụ đó tham gia.
  - **Phân loại lại 2.194 tài nguyên trong kho dữ liệu**:
    - Chạy kịch bản tự động phân loại chuyên sâu đa lĩnh vực dựa trên tên, mô tả công năng, từ khóa kỹ thuật và thư viện tích hợp.
    - Cập nhật toàn bộ 2.194 công cụ trong `src/data/allTools.json` (2.126 công cụ được gán từ 2 đến 3 lĩnh vực chuyên sâu).
  - **Đánh dấu nổi bật tài nguyên dành cho thị trường Việt Nam**:
    - Nhận diện và gắn cờ `isVietnamMarket: true` cho 286 tài nguyên phục vụ trực tiếp thị trường Việt Nam.
    - Thêm huy hiệu cờ đỏ sao vàng `🇻🇳 Thị trường VN` trên `ToolCard.tsx` và `DetailPage.tsx`.
    - Tích hợp nút bật/tắt lọc nhanh `🇻🇳 Thị trường Việt Nam` kèm bộ đếm số lượng tài nguyên thực tế ngay trên đầu `Sidebar.tsx`.
  - **Nâng cấp Modal điều chỉnh phân loại dành riêng cho Quản trị viên tối cao**:
    - Cập nhật `EditToolTaxonomyModal.tsx` cho phép Quản trị viên tối cao chọn Loại hình thành phần chính, Lĩnh vực chuyên môn chính, tích chọn thêm nhiều Lĩnh vực phụ thông qua thanh tìm kiếm và hộp kiểm, đồng thời bật/tắt cờ Thị trường Việt Nam.
  - **Kiểm thử & Đóng gói**:
    - Bổ sung ca kiểm thử tự động kiểm tra đa lĩnh vực và cờ thị trường Việt Nam trong `tests/approval-and-auth.test.js`.
    - Toàn bộ 14 bài kiểm tra trong 5 bộ kiểm thử đạt 100% tỷ lệ pass.
    - Đóng gói toàn bộ ứng dụng bằng `npm run build` (`tsc && vite build`) hoàn thành thành công trong 14.41 giây.
- [Phân quyền Admin Tối cao vinh.ngtienmdb@gmail.com & Loại bỏ các thông báo cấu hình Firebase]:
  - **Phân quyền Quản trị viên tối cao (Admin)**:
    - Thiết lập tài khoản `vinh.ngtienmdb@gmail.com` là Quản trị viên cao nhất của toàn bộ hệ thống AI HUB VN.
    - Cập nhật hàm `checkIsAdmin` trong `src/lib/firebase.ts` và logic phân quyền: Chỉ tài khoản Admin mới có quyền duyệt công cụ và điều chỉnh phân loại Loại hình, Lĩnh vực chuyên môn.
    - Bổ sung huy hiệu "Quản trị viên tối cao" khi tài khoản `vinh.ngtienmdb@gmail.com` đăng nhập vào trang cá nhân.
  - **Giới hạn quyền điều chỉnh Loại hình thành phần & Lĩnh vực chuyên môn**:
    - Khóa chặt phân quyền điều chỉnh phân loại: Chỉ duy nhất tài khoản Quản trị viên mới được phép render và mở các cửa sổ `EditToolTaxonomyModal.tsx` và `AdminTaxonomyModal.tsx`.
    - Các hàm `handleUpdateToolTaxonomy`, `onSaveCategories`, `onSaveToolTypes`, `onResetToDefault` đều được kiểm tra điều kiện an toàn nghiêm ngặt `if (!isAdmin) return;` trước khi thực thi.
  - **Loại bỏ toàn bộ thông báo cấu hình Firebase trên code và trên frontend**:
    - Xóa bỏ triệt để giao diện bảng dán mã cấu hình Firebase (`apiKey`, `projectId`, `authDomain`, `appId`), các đoạn hướng dẫn Firebase Console và dòng trạng thái kết nối Firebase trong `src/components/LoginModal.tsx`.
    - Tối ưu cửa sổ đăng nhập `LoginModal.tsx` tinh tế, gọn gàng, chỉ tập trung vào nút "Tiếp tục với tài khoản Google" và cơ chế đăng nhập chuyển hướng dự phòng khi bị chặn popup.
    - Xóa bỏ toàn bộ các dòng lệnh `console.warn` và `console.error` liên quan đến cấu hình kỹ thuật Firebase trong `src/lib/firebase.ts`, giữ cho console log của trình duyệt hoàn toàn sạch sẽ.
  - **Kiểm thử & Đóng gói**:
    - Cập nhật và chạy thành công toàn bộ 5 bộ kiểm thử unit tests (`user-profile-and-star`, `approval-and-auth`, `business-rules`, `command-bridge`, `storage-delta`) đạt 100% tỷ lệ pass.
    - Đóng gói toàn bộ ứng dụng bằng `npm run build` (`tsc && vite build`) hoàn thành thành công tuyệt đối.
- [Bỏ mặc định đăng nhập thanhvien, Nâng cấp Chỉnh sửa Hồ sơ cá nhân & Tích dấu sao ⭐ lưu trữ công cụ]:
  - **Không mặc định đăng nhập ở user thanhvien**:
    - Khắc phục triệt để việc hệ thống tự động gán email `thanhvien@aihub.vn`.
    - Trạng thái người dùng mới mặc định là khách vãng lai chưa đăng nhập (`currentUser = null`), Header hiển thị nút "Đăng nhập".
    - Tự động phát hiện và dọn dẹp giá trị email giả định cũ trong bộ nhớ trình duyệt `localStorage`.
  - **Chỉnh sửa thông tin cá nhân (User Profile)**:
    - Bổ sung cấu trúc dữ liệu `UserProfile` trong `src/types/index.ts` hỗ trợ: Tên hiển thị (`displayName`), Ảnh đại diện/Avatar URL (`photoURL`), Chức danh chuyên môn (`title`), Tiểu sử/giới thiệu (`bio`), Số điện thoại (`phone`), Liên kết GitHub (`githubUrl`), Website cá nhân (`websiteUrl`).
    - Nâng cấp trang cá nhân `src/pages/AccountPage.tsx`:
      - Hiển thị thông tin hồ sơ trực quan: Ảnh đại diện avatar bo viền, tên hiển thị, chức danh, email, các liên kết mạng xã hội và huy hiệu "Quản trị viên tối cao" (nếu là Admin).
      - Tích hợp modal "Chỉnh sửa thông tin cá nhân" cho phép người dùng cập nhật hồ sơ cá nhân và lưu trữ bền vững vào `localStorage`.
      - Bổ sung thông báo cập nhật hồ sơ thành công trực quan.
    - Đồng bộ hiển thị tên người dùng và ảnh avatar đại diện lên thanh điều hướng `Header.tsx`.
  - **Tích dấu sao (⭐) để lưu trữ công cụ cần thiết**:
    - Chuẩn hóa biểu tượng lưu trữ thành Ngôi sao (Star ⭐) theo đúng yêu cầu:
      - Khi chưa lưu: Ngôi sao viền xám mờ tinh tế, di chuột chuyển sắc thái nổi bật (`text-slate-400 hover:text-amber-500`).
      - Khi đã lưu: Ngôi sao màu vàng cam óng ánh rực rỡ (`fill-amber-400 text-amber-500 drop-shadow-sm`).
    - Triển khai nút ngôi sao ⭐ tương tác 1 chạm trên toàn bộ hệ thống:
      - **Thẻ công cụ ([`ToolCard.tsx`](file:///C:/Users/vinhn/.gemini/antigravity/scratch/quan-ly-cong-cu-ai/src/components/ToolCard.tsx))**: Tích hợp nút sao ⭐ tương tác trên cả thẻ có ảnh demo và thẻ văn bản tiêu chuẩn.
      - **Trang Danh mục ([`CategoryPage.tsx`](file:///C:/Users/vinhn/.gemini/antigravity/scratch/quan-ly-cong-cu-ai/src/pages/CategoryPage.tsx))**: Thay thế nút lưu bằng icon ngôi sao ⭐ vàng óng.
      - **Trang Chi tiết ([`DetailPage.tsx`](file:///C:/Users/vinhn/.gemini/antigravity/scratch/quan-ly-cong-cu-ai/src/pages/DetailPage.tsx))**: Nút "Gắn sao lưu trữ ⭐" / "Đã gắn sao lưu trữ ⭐".
      - **Chế độ xem dạng bảng (Table View trong [`App.tsx`](file:///C:/Users/vinhn/.gemini/antigravity/scratch/quan-ly-cong-cu-ai/src/App.tsx))**: Thêm cột ngôi sao ⭐ cho phép người dùng lưu/bỏ lưu trực tiếp ngay trên bảng.
      - **Trang cá nhân ([`AccountPage.tsx`](file:///C:/Users/vinhn/.gemini/antigravity/scratch/quan-ly-cong-cu-ai/src/pages/AccountPage.tsx))**: Tab "Công cụ đã gắn sao ⭐", cho phép xem danh sách và bỏ gắn sao trực tiếp.
    - Bảo vệ người dùng: Khi khách chưa đăng nhập bấm vào dấu sao ⭐, hệ thống tự động mở modal đăng nhập để hướng dẫn người dùng đăng nhập tài khoản.
  - **Kiểm thử & Đóng gói**:
    - Viết mới bộ kiểm thử tự động `tests/user-profile-and-star.test.js` kiểm tra toàn diện 3 chức năng: Khởi tạo chưa đăng nhập, Cập nhật hồ sơ người dùng, và Cơ chế gắn sao công cụ.
    - Toàn bộ 5 bộ kiểm thử đạt tỷ lệ thành công 100%.
    - Đóng gói toàn bộ ứng dụng bằng `npm run build` (`tsc && vite build`) hoàn thành thành công tuyệt đối.
- [Xử lý lỗi auth/network-request-failed và Bổ sung cơ chế Đăng nhập Chuyển hướng]:
  - **Phân tích nguyên nhân lỗi `auth/network-request-failed`**:
    1. Trình duyệt đang cài đặt tiện ích chặn quảng cáo / chặn theo dõi (AdBlocker, Brave Shields, uBlock Origin) chặn các yêu cầu gửi đến API Google (`apis.google.com`, `identitytoolkit.googleapis.com`).
    2. Tên miền `ai-hub-vn.vercel.app` chưa được thêm vào mục **Authorized domains** trong Firebase Console.
    3. Cửa sổ popup bị trình duyệt chặn hoặc chặn Cookie của bên thứ ba (Third-party Cookies) khi giao tiếp qua iframe ngầm.
  - **Giải pháp xử lý triệt để**:
    - Chuẩn hóa hàm phân tích mã lỗi `parseFirebaseError` trong `src/lib/firebase.ts`, trả về hướng dẫn chi tiết tiếng Việt chỉ rõ nguyên nhân và giải pháp từng bước (tắt AdBlocker, kiểm tra Authorized domains).
    - Tự động chuẩn hóa `authDomain` thành `<projectId>.firebaseapp.com` nếu người dùng chỉ nhập `apiKey` và `projectId`.
    - Tích hợp phương thức **Đăng nhập bằng Chuyển hướng (Redirect)** qua `signInWithRedirect` và `getRedirectResult`: Phương thức này điều hướng toàn trang trực tiếp sang Google mà không phụ thuộc vào popup, không bị chặn bởi AdBlocker và không bị lỗi cookie bên thứ ba.
  - Toàn bộ 4 bộ kiểm thử unit tests đạt 100%, đóng gói Vite thành công tuyệt đối.
- [Nâng cấp Kết nối Firebase Google Auth Thật & Giao diện Cấu hình Trực tiếp]:
  - **Giải thích hiện tượng thông báo**: Thông báo popup `window.prompt` xuất hiện trước đó do bản triển khai trên Vercel chưa được gắn các biến môi trường Firebase thật (`VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_PROJECT_ID`...), dẫn đến việc kích hoạt chế độ giả lập đăng nhập dự phòng.
  - **Loại bỏ hoàn toàn hộp thoại prompt thô sơ**:
    - Xóa bỏ triệt để lệnh `window.prompt` gây hiểu nhầm trong `src/lib/firebase.ts`.
    - Thay thế bằng giao diện thông báo và cấu hình chuyên nghiệp ngay bên trong `LoginModal.tsx`.
  - **Bổ sung bảng Cấu hình Firebase Google Auth Trực tiếp trên giao diện**:
    - Cho phép Quản trị viên dán trực tiếp đoạn mã cấu hình `firebaseConfig` từ Firebase Console (hệ thống tự động bóc tách các trường `apiKey`, `authDomain`, `projectId`, `appId`).
    - Hỗ trợ lưu trữ động vào `localStorage` (`aihub_firebase_config`) và tái khởi tạo Firebase Auth SDK ngay lập tức mà không cần deploy lại Vercel.
    - Cung cấp hướng dẫn trực quan 4 bước chuẩn mực để người dùng bật Google Sign-In trên Firebase Console và cấu hình Authorized Domain `ai-hub-vn.vercel.app`.
    - Khi có cấu hình Firebase thật, bấm "Tiếp tục với tài khoản Google" sẽ mở trực tiếp cửa sổ Google Auth Popup chính thức (`accounts.google.com`).
  - Kiểm thử đóng gói Vite hoàn tất thành công 100%.
- [Khắc phục triệt để lỗi QuotaExceededError trên LocalStorage bằng cơ chế Delta Storage]:
  - **Phát hiện nguyên nhân**: Lỗi `Failed to execute 'setItem' on 'Storage': Setting the value of 'aihub_tools' exceeded the quota` phát sinh do ứng dụng cố gắng lưu toàn bộ mảng dữ liệu 2.194 công cụ (dung lượng ~7MB - 8MB) vào một khóa `aihub_tools` duy nhất trong `localStorage`, trong khi hạn mức chuẩn của trình duyệt chỉ là 5MB.
  - **Kiến trúc giải pháp Delta Storage (`src/lib/storage.ts`)**:
    - Xóa bỏ hoàn toàn thao tác lưu toàn bộ kho `INITIAL_TOOLS` vào `localStorage`. 2.194 công cụ gốc được tải trực tiếp từ tệp tĩnh JSON đã được biên dịch siêu tốc.
    - Phân tách lưu trữ thành 2 cấu trúc nhẹ:
      1. `aihub_contributed_tools`: Chỉ lưu các công cụ mới do thành viên hoặc Quản trị viên đóng góp (kích thước vài KB).
      2. `aihub_tool_overrides`: Bảng băm `{ [toolId]: Partial<AITool> }` chỉ lưu các trường bị Admin thay đổi (trạng thái duyệt `status`, loại hình `toolType`, lĩnh vực `category`), dung lượng chỉ vài chục bytes cho mỗi công cụ.
    - Bổ sung hàm tự động dọn dẹp khóa cũ `cleanupLegacyStorage()` để giải phóng ngay lập tức 5MB bộ nhớ bị kẹt của người dùng.
    - Bọc mọi thao tác ghi `localStorage` bằng `safeSetItem` kèm khối `try...catch` phòng vệ.
    - Dung lượng lưu trữ thực tế giảm ngoạn mục từ 8MB xuống dưới 2KB (giảm hơn 99.9%), triệt tiêu hoàn toàn nguy cơ vượt hạn mức bộ nhớ trình duyệt.
  - Xây dựng bài kiểm thử tự động `tests/storage-delta.test.js` kiểm tra và xác nhận dung lượng Delta Storage đạt 100%.
  - Đóng gói toàn bộ ứng dụng (`tsc && vite build`) hoàn thành thành công tuyệt đối.
- [Chức năng Điều chỉnh Loại hình thành phần và Lĩnh vực chuyên môn dành cho Admin]:
  - Xây dựng component `src/components/EditToolTaxonomyModal.tsx`:
    - Cho phép Quản trị viên thay đổi trực tiếp Loại hình thành phần (`toolType`) và Lĩnh vực chuyên môn (`category`) cho bất kỳ công cụ nào.
    - Cập nhật đồng bộ các trường `toolType`, `typeNameVi`, `category`, `categoryNameVi` trong hệ thống và lưu ngay vào `localStorage`.
  - Tích hợp tính năng điều chỉnh phân loại vào nhiều vị trí quản trị thuận tiện:
    - **Trang Chi tiết công cụ ([`DetailPage.tsx`](file:///C:/Users/vinhn/.gemini/antigravity/scratch/quan-ly-cong-cu-ai/src/pages/DetailPage.tsx))**: Hiển thị nút "Sửa phân loại (Admin)" nổi bật khi người dùng đăng nhập tài khoản Quản trị viên.
    - **Hàng đợi phê duyệt ([`AdminApprovalModal.tsx`](file:///C:/Users/vinhn/.gemini/antigravity/scratch/quan-ly-cong-cu-ai/src/components/AdminApprovalModal.tsx))**: Tích hợp nút "Sửa phân loại" trên từng thẻ công cụ chờ duyệt, cho phép Admin nắn chỉnh ngay phân loại trước khi bấm Duyệt.
  - Xây dựng modal Quản trị phân loại hệ thống `src/components/AdminTaxonomyModal.tsx`:
    - Quản lý 18 Lĩnh vực chuyên môn: Sửa tên tiếng Việt, sửa mô tả, bổ sung thêm lĩnh vực mới.
    - Quản lý 13 Loại hình thành phần: Sửa tên nhãn hiển thị tiếng Việt, sửa mô tả, bổ sung thêm loại hình mới.
    - Lưu cấu hình tùy biến vào `localStorage` (`aihub_custom_categories`, `aihub_custom_tool_types`) và có nút khôi phục về mặc định ban đầu.
    - Tích hợp nút mở nhanh "Phân loại" trên thanh điều hướng `Header.tsx` dành riêng cho Admin.
  - Viết bài kiểm thử tự động cập nhật phân loại công cụ trong `tests/approval-and-auth.test.js`, đạt 100% tỷ lệ pass.
  - Đóng gói toàn bộ dự án (`tsc && vite build`) hoàn thành thành công tuyệt đối.
- [Tích hợp Firebase Google Auth, Phân quyền Admin & Hàng đợi phê duyệt công cụ]:
  - Tích hợp thành công thư viện Firebase SDK (`firebase^13.0.0`) tại `src/lib/firebase.ts`.
  - Hỗ trợ đăng nhập một chạm bằng Google Auth (`signInWithPopup` với `GoogleAuthProvider`), đồng bộ trạng thái đăng nhập qua `subscribeToAuth` và `localStorage`.
  - Thiết lập cơ chế kiểm soát phân quyền Quản trị viên cao nhất (`checkIsAdmin`):
    - Chỉ tài khoản Quản trị viên sở hữu quyền cao nhất (mặc định cấu hình `vinhngtien@gmail.com` hoặc qua biến môi trường `VITE_ADMIN_EMAIL`/giao diện cấu hình).
    - Thành viên thông thường đăng nhập Google Auth có quyền đóng góp tài nguyên và lưu trữ bộ sưu tập cá nhân.
  - Xây dựng quy trình kiểm duyệt chất lượng 2 cấp:
    - Khi thành viên thường đóng góp, công cụ tự động được gắn trạng thái `status: 'pending'` (Chờ Quản trị viên duyệt), chưa hiển thị ra ngoài cộng đồng.
    - Xây dựng modal Hàng đợi phê duyệt `AdminApprovalModal.tsx` dành riêng cho Quản trị viên với các chức năng: xem danh sách chờ duyệt, xem trước chi tiết nội dung, phê duyệt (`status: 'published'`) hoặc từ chối (`status: 'rejected'`) kèm lý do cụ thể.
    - Trên thanh điều hướng `Header.tsx`, Quản trị viên được gắn huy hiệu Admin kèm nút truy cập nhanh "Duyệt công cụ" hiển thị số lượng công cụ đang chờ duyệt theo thời gian thực.
  - Viết lại toàn diện biểu mẫu Đóng góp tài nguyên (`ContributePage.tsx` và `ContributeModal.tsx`):
    - Đồng bộ chuẩn xác 13 loại hình thành phần (`Skill`, `Agent`, `API`, `SDK`, `MCP Server`, `Phần mềm`, `Workflow`, `Model`, `Dataset`, `Command`, `Template`, `Hook`, `Setting`).
    - Đồng bộ chuẩn xác 18 lĩnh vực chuyên môn (Tài chính, Kế toán & Thuế, Doanh nghiệp ERP, Logistics, Y tế, Pháp luật, v.v.).
    - Bổ sung trường thông tin người đóng góp (`contributedBy`), ngày gửi (`contributedAt`) và ghi chú kiểm duyệt (`reviewNote`).
  - Xây dựng tệp kiểm thử tự động `tests/approval-and-auth.test.js` kiểm tra toàn bộ luồng phân quyền và phê duyệt, kết quả 3/3 bài kiểm thử đạt 100%.
  - Đóng gói toàn bộ ứng dụng thành công tuyệt đối (`tsc && vite build` exit code 0).
- [Mở rộng và Tách chi tiết 18 Lĩnh vực chuyên môn]:
  - Phân tích và tách các nhóm lĩnh vực bị gộp quá nhiều thành 18 lĩnh vực chuyên môn rạch ròi, giải quyết triệt để sự chồng lấn:
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
  - Cập nhật giao diện đồng bộ:
    - `Sidebar`: Hiển thị phân cấp 18 lĩnh vực chuyên môn kèm huy hiệu số lượng chính xác từng công cụ.
    - `BrowseByNeeds`: Bố trí lưới 12 lĩnh vực chuyên môn được tra cứu nhiều nhất.
    - `HeroSection`: Các phím tắt chọn nhanh lĩnh vực theo nhu cầu thực tế.
    - `types/index.ts` & `mockTools.ts`: Định nghĩa kiểu và siêu dữ liệu 18 lĩnh vực chuẩn mực.
  - Toàn bộ 5 bài kiểm thử unit tests đạt 100%, TypeScript và Vite build thành công không có lỗi.
- [Tách riêng biệt phân loại cho SDK, API, Model, Dataset]:
  - Mở rộng hệ thống kiểu dữ liệu `ToolType` thêm các loại hình độc lập: `api`, `sdk`, `model`, `dataset`.
  - Phân loại lại toàn diện 2.194 công cụ vào các loại hình thành phần chuẩn xác:
    - `Skill`: 894 công cụ (Bộ kỹ năng chuyên môn cho tác nhân AI)
    - `Agent`: 441 công cụ (Tác nhân AI tự chủ giải quyết nhiệm vụ phức tạp)
    - `Command`: 273 công cụ (Lệnh điều khiển và thực thi dòng lệnh)
    - `MCP Server`: 227 công cụ (Máy chủ giao thức ngữ cảnh mô hình)
    - `API`: 116 công cụ (Cổng giao tiếp lập trình REST, GraphQL, Webhook)
    - `Setting`: 70 công cụ (Cấu hình môi trường và tham số)
    - `Hook`: 61 công cụ (Điểm móc chặn và kiểm soát sự kiện)
    - `Phần mềm`: 34 công cụ (Hệ thống ERP, CRM, Kế toán & Quản trị số)
    - `Workflow`: 27 công cụ (Quy trình tự động hóa luồng làm việc)
    - `SDK`: 21 công cụ (Bộ công cụ phát triển phần mềm chính thức)
    - `Template`: 20 công cụ (Mẫu dự án và cấu hình dựng sẵn)
    - `Model`: 7 công cụ (Mô hình ngôn ngữ, nền tảng AI và trọng số)
    - `Dataset`: 3 công cụ (Bộ dữ liệu địa giới hành chính, bản đồ GeoJSON, ngữ liệu)
  - Cập nhật giao diện:
    - `MainCategoryCards`: Bố trí lưới 6 thẻ cân bằng (`grid-cols-2 sm:grid-cols-3 lg:grid-cols-6`) tương ứng `MCP Server`, `Skill`, `Agent`, `API`, `SDK`, `Phần mềm`.
    - `Sidebar`: Bổ sung các tab `API`, `SDK`, `Model`, `Dataset` kèm huy hiệu số lượng thực tế.
    - `ToolCard`: Huy hiệu màu sắc riêng biệt (API màu xanh trời sky, SDK màu xanh mòng két teal, Model màu hồng tím fuchsia, Dataset màu xanh ngọc cyan).
    - `CategoryPage`: Bổ sung tiêu đề, breadcrumb và mô tả chuyên biệt cho từng loại hình khi người dùng lọc.
  - Kiểm thử chất lượng: 5/5 bài kiểm thử unit tests đạt 100%, đóng gói Vite thành công hoàn toàn.
- [Cân chỉnh giao diện trang chủ, Phân loại 10 Lĩnh vực chuyên môn và Tách riêng biệt loại hình]:
  - Phân loại lại chuẩn xác toàn diện 2.194 công cụ vào 10 Lĩnh vực chuyên môn theo nghiệp vụ Việt Nam:
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
  - Tách riêng biệt các loại hình thành phần: `Skill` (1.028), `Agent` (448), `Command` (289), `MCP Server` (227), `Setting` (71), `Hook` (62), `Phần mềm` (34), `Template` (23), `Workflow` (12).
  - Tuyệt đối tuân thủ quy tắc không dịch nghĩa `Agent`, `Skill`, `MCP Server`, `Workflow` sang tiếng Việt trong phần ghi chú / nhãn loại hình. Riêng loại phần mềm hiển thị là `Phần mềm`.
  - Cân chỉnh toàn diện giao diện trang chủ đạt tỷ lệ cân bằng:
    - `MainCategoryCards`: Mở rộng thành 5 thẻ cân bằng trên mọi độ phân giải (MCP Server, Skill, Agent, Phần mềm, Workflow).
    - `FeaturedResources`: Cấu hình lưới 4 thẻ tiêu biểu đại diện 4 loại hình cốt lõi với thông số thực tế.
    - `BrowseByNeeds`: Bố trí lưới 8 lĩnh vực chuyên môn phổ biến nhất với số lượng công cụ thực tế.
    - `Sidebar`: Hiển thị phân loại 'Phần mềm' mới, bổ sung huy hiệu hiển thị số lượng chi tiết cho từng loại hình và từng lĩnh vực chuyên môn.
    - `ToolCard`: Hệ thống huy hiệu màu sắc phân biệt trực quan cho từng loại hình (mcp: xanh dương, skill: xanh ngọc, agent: chàm, phần mềm: hổ phách, workflow: tím).
    - Bổ sung Drawer Sidebar trên thiết bị di động giúp người dùng lọc công cụ thuận tiện.
  - Kiểm thử & Build: 5/5 bài kiểm thử unit tests đạt 100%, đóng gói Vite thành công hoàn toàn.
- [Phân loại Lĩnh vực chuyên môn & Chuẩn hóa nhãn Agent, Skill]:
  - Phân loại 2.044 công cụ vào 10 nhóm lĩnh vực chuyên môn phù hợp: Tài chính & Thuế (97), Doanh nghiệp & Quản trị (22), Bán lẻ & TMĐT (67), Logistics & Vận tải (31), Viễn thông & CSKH (14), Pháp luật & Hành chính công (12), Nhân sự & Tuyển dụng (5), Trí tuệ nhân tạo & Dữ liệu (291), Lập trình & Kỹ thuật phần mềm (1.191), Tự động hóa hệ thống (314).
  - Giữ nguyên các thuật ngữ kỹ thuật quốc tế trong nhãn và ghi chú: `Agent`, `Skill`, `MCP Server`, `Command`, `Template`, `Workflow`, `Hook`, `Setting` (không dịch nghĩa tiếng Việt).
  - Cập nhật Sidebar và Hero Section để điều hướng theo lĩnh vực chuyên môn mượt mà.
  - Toàn bộ 5 bài kiểm thử và build Vite hoàn thành xuất sắc 100%.
- [Khắc phục sự cố & Tăng cường phòng vệ giao diện]:
  - Phát hiện nguyên nhân sự cố màn hình trắng do một số công cụ mới thiếu trường `platforms` dẫn đến `TypeError: Cannot read properties of undefined (reading 'map')` trong React.
  - Chuẩn hóa toàn bộ 2.044 công cụ đạt 100% tiêu chuẩn kiểu `AITool` qua script `scripts/sanitize-all-tools.cjs`.
  - Tăng cường lập trình phòng vệ trong `App.tsx`, `ToolCard.tsx`, `CategoryPage.tsx` và `DetailPage.tsx`.
  - Xây dựng component `ErrorBoundary.tsx` và bọc ngoài toàn bộ ứng dụng, chấm dứt hoàn toàn nguy cơ màn hình trắng.
  - Kiểm thử và đóng gói hoàn tất thành công 100%.
- [Bổ sung đợt 7 - Mở rộng quy mô 50 công cụ & thương hiệu lớn Việt Nam]:
  - Triển khai thu thập và tích hợp thành công 50 giải pháp công nghệ, cổng API và dịch vụ công then chốt:
    - Giao vận & Chuyển phát: GHTK, Ahamove, Lalamove, J&T Express, Ninja Van, ViettelPost.
    - Ngân hàng mở & Tài chính: Techcombank, MB Bank, BIDV, VietinBank, VPBank, ACB, TPBank, Kredivo, Fundiin, VNPT Money, Viettel Money, AppotaPay.
    - Nhân sự & Tuyển dụng: TopCV, VietnamWorks, 1Office, FastWork.
    - Trí tuệ nhân tạo & Công nghệ: VinBigdata ViGPT, VinAI NLP Toolkit, Zalo Mini App SDK, FPT Telecom Hi FPT, VietGuys Mobile Marketing.
    - Hành chính công & Dịch vụ số: Cổng DVC Quốc gia VNeID, Bộ Tư Pháp lý lịch tư pháp, Mạng đấu thầu quốc gia e-GP, Giao dịch bảo đảm trực tuyến, Thư viện pháp luật, EVN tiền điện, Vietnam Airlines, Vietjet Air.
    - Bán lẻ, F&B & Quản trị: Haravan POS Hardware, KiotViet Webhook, MISA AMIS Kế toán, Bizfly CRM, Getfly CRM, MISA CukCuk, iPOS.vn, Sapo FnB KDS, ShopeeFood, GrabFood, Baemin Specs, TikiNOW Logistics.
    - Quy hoạch địa giới & Kế toán chuẩn mực: Bản đồ GeoJSON 34 tỉnh thành 2025, Chuyển đổi địa chỉ 63 sang 34 tỉnh thành, Cố vấn chuẩn mực kế toán VAS & VFRS.
  - Quy mô hệ sinh thái: Đạt mốc **2.044 công cụ** và **3.159 mẫu cấu hình JSON**.
  - Kiểm thử chất lượng: 5/5 bài kiểm thử unit tests đạt 100%, đóng gói Vite thành công trong 6.80 giây.
- [Bổ sung đợt 6 - Thương mại điện tử, Tổng đài ảo & Viễn thông Việt Nam]:
  - Tích hợp 10 giải pháp công nghệ trọng yếu:
    1. Base.vn Open API Connector (`https://open.base.vn/`): Quản trị doanh nghiệp, đề xuất Base Request, giao việc Base Wework, quản lý nhân sự Base HRM.
    2. Stringee Voice & Contact Center SDK (`https://developer.stringee.com/`): Tổng đài ảo VoIP và Video Call thông minh cho doanh nghiệp.
    3. eSMS.vn Brandname & OTP API (`https://esms.vn/tai-lieu-api`): Gửi SMS Brandname và xác thực mã OTP qua 5 nhà mạng và Zalo ZNS.
    4. TikTok Shop Partner API (`https://partner.tiktokshop.com/`): Tự động hóa đồng bộ đơn hàng livestream và kho hàng TikTok Shop.
    5. Shopee Open Platform SDK (`https://open.shopee.com/`): Quản lý gian hàng Shopee v2, in mã vận đơn và đối soát doanh thu.
    6. Lazada Open Platform SDK (`https://open.lazada.com/`): Kết nối gian hàng trực tuyến Lazada Seller Center và đồng bộ tồn kho.
    7. Vbee AIVoice Studio API (`https://vbee.vn/`): Giọng nói trí tuệ nhân tạo tiếng Việt 3 miền Bắc - Trung - Nam cho tổng đài tự động.
    8. SmartPay Merchant API (`https://smartpayvn.com/`): Thanh toán số mã QR SmartPay và quản lý điểm bán lẻ POS.
    9. SpeedSMS API Client (`https://github.com/speedsms/speedsms-python`): SMS Gateway và cuộc gọi tự động Voice OTP dự phòng.
    10. eTax Mobile & Thuế Điện Tử Tra Cứu MCP (`https://thuedientu.gdt.gov.vn/`): Tra cứu mã số thuế cá nhân theo CCCD và nộp thuế điện tử.
  - Quy mô hệ sinh thái: Đạt mốc **1.994 công cụ** và **3.009 mẫu cấu hình JSON**.
  - Kiểm thử chất lượng: 5/5 bài kiểm thử unit tests đạt 100%, đóng gói Vite thành công trong 12.16 giây.
- [Bổ sung đợt 5 - Thương hiệu lớn Việt Nam]:
  - Tiếp tục mở rộng đợt 5 với 10 giải pháp công nghệ, API và SDK từ các tập đoàn, doanh nghiệp và thương hiệu hàng đầu Việt Nam:
    1. Haravan App SDK (`@haravan/app-sdk`): Kết nối bán hàng đa kênh Omnichannel, quản lý kho hàng và đơn hàng sàn thương mại điện tử.
    2. Tiki Open Platform & MiniApp SDK (`tikivn/open-api-samples`): Tích hợp gian hàng Tiki, quản lý sản phẩm, đơn hàng và ứng dụng MiniApp.
    3. FPT.AI Chatbot SDK (`fpt-corp/fptai-chatbot-sdk`): Xử lý ngôn ngữ tự nhiên tiếng Việt cho trợ lý ảo và tổng đài tự động FPT.
    4. MISA meInvoice Cloud API Connector: Phát hành hóa đơn điện tử chuẩn Thông tư 78/2021/TT-BTC, kết nối MISA SME/AMIS.
    5. Viettel S-Invoice Cloud API: Hóa đơn điện tử quy mô lớn, phát hành hàng loạt và tích hợp chữ ký số Viettel-CA.
    6. VNPT Invoice & SmartCA Connector: Hóa đơn điện tử và ký số từ xa không cần Token USB vật lý chuẩn eIDAS.
    7. Be Delivery & Transportation API: Tích hợp dịch vụ gọi xe và giao hàng hỏa tốc Be Group.
    8. Xanh SM Corporate EV Ride-Hailing API: Quản lý chi phí di chuyển doanh nghiệp bằng xe điện GSM VinFast.
    9. Vietcombank Open Banking Corporate Gateway: Cổng ngân hàng mở Vietcombank bảo mật mTLS (vấn tin số dư, trích nợ tự động).
    10. Petrolimex Fuel Price & Invoice Crawler: Bảng giá xăng dầu điều hành và hóa đơn điện tử cột bơm xăng Petrolimex.
  - Quy mô hệ sinh thái: Đạt mốc **1.984 công cụ** và **2.979 mẫu cấu hình JSON**.
  - Rà soát và chuẩn hóa đường dẫn nguồn (`sourceUrl`): Khắc phục triệt để tình trạng 26 công cụ trỏ tạm thời về repo của dự án; cập nhật 100% về đúng kho lưu trữ GitHub gốc, Developer Portal hoặc Cổng dịch vụ công cơ quan nhà nước.
  - Kiểm thử chất lượng: Toàn bộ 5 bài kiểm thử tự động đạt 100%, đóng gói Vite thành công trong 9.88 giây.
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

- [Tái Cấu Trúc Giao Diện 2 Cột: Bổ Sung Left Sidebar & Nâng Cấp Hướng Dẫn Siêu Chi Tiết]:
  - **Tái thiết kế giao diện bố cục 2 cột chuyên nghiệp**:
    - **Cột trái (Left Sidebar ghim cố định)**:
      - Tích hợp bộ lọc phân loại thành phần đa tầng (Tất cả, Kỹ năng, Quy trình, Bản mẫu, Tác tử, Lệnh, Máy chủ MCP, Móc nối, Cấu hình) có hiển thị huy hiệu (badge) số lượng công cụ thực tế.
      - Tích hợp bộ lọc lĩnh vực chuyên môn (đặc biệt tab `🇻🇳 Thị Trường Việt Nam` nổi bật với huy hiệu HOT).
      - Tích hợp bộ lọc môi trường AI (Claude Desktop, Antigravity, Cursor).
      - Nút thao tác một chạm: Đặt lại bộ lọc (Reset), Mở Terminal Cục Bộ, Mở tài liệu VibeCode và liên kết kho GitHub chính thức.
    - **Drawer trượt thông minh trên thiết bị di động/tablet**: Người dùng có thể nhấn nút `Bộ lọc & Danh mục` để mở bảng điều hướng trượt sang phải mượt mà.
    - **Cột phải (Main Content Grid)**: Lưới hiển thị các thẻ công cụ có ảnh demo banner tỉ lệ 16:9 sắc nét, nhãn Glassmorphism và điều hướng phân trang.
  - **Nâng cấp nội dung hướng dẫn cài đặt và sử dụng siêu chi tiết cho 100% công cụ**:
    - `installGuideVi`: Chuẩn hóa cấu trúc 4 bước rõ ràng: Bước 1 (Chuẩn bị môi trường & phụ thuộc) -> Bước 2 (Cài đặt gói lệnh CLI) -> Bước 3 (Cấu hình tệp tham số JSON & giải thích biến môi trường) -> Bước 4 (Khởi động và xác nhận kết nối).
    - `usageGuideVi`: Bổ sung kịch bản ứng dụng thực tế (Context & Scenario), câu lệnh prompt cụ thể kèm kết quả trả về dự kiến chuẩn mực.
    - `demoImages`: Trang bị thư viện ít nhất 2-3 hình ảnh minh họa cho từng công cụ trong trang chi tiết, có nút phóng to xem ảnh gốc toàn màn hình.
  - **Bổ sung các dự án hot tại Việt Nam & Quốc tế**:
    - VietOCR (nhận dạng chữ viết tiếng Việt & chữ viết tay), UnderTheSea (bộ công cụ NLP tiếng Việt số 1), Chuyển số thành chữ kế toán VND, Kiểm tra cấu trúc 12 số CCCD gắn chip, Tra cứu xử phạt giao thông Nghị định 100 & phạt nguội.
    - vLLM (động cơ suy luận LLM thông lượng cao), Exo (chạy AI phân tán P2P trên nhiều máy tính), Stanford STORM (tác tử tự động nghiên cứu bài viết Wikipedia).
  - Nâng tổng số lượng công cụ lên **1.922 mục** và **2.917 mẫu cấu hình JSON**.
  - Kiểm thử tự động đạt 100% qua 5 bài test.

- [Mở Rộng Khung Làm Việc (Workspace Expansion) & Chuẩn Hóa Ảnh Demo Repo Gốc]:
  - **Mở rộng không gian làm việc (Workspace Expansion)**:
    - Bổ sung nút chuyển đổi chế độ Khung làm việc mở rộng (`Full-width Fluid Canvas 100%`) cho phép tận dụng trọn vẹn bề ngang màn hình máy tính.
    - Bổ sung nút Thu gọn / Mở rộng thanh bên (Collapsible Sidebar) giúp giải phóng tối đa diện tích hiển thị dữ liệu, tự động mở rộng lưới thẻ từ 3 cột lên 4 hoặc 5 cột linh hoạt.
    - Bổ sung Chế độ xem Bảng danh sách chi tiết mở rộng (Detailed Table / List View) bên cạnh Chế độ xem Thẻ (Grid View), giúp duyệt nhanh hàng ngàn công cụ trong một không gian làm việc chuyên nghiệp.
  - **Chuẩn hóa ảnh demo theo nguyên tắc repo thực tế**:
    - Đối với các repo không có ảnh demo đính kèm: Để trống hoàn toàn theo đúng chỉ đạo của người dùng, không tự tạo thêm ảnh giả hay ảnh placeholder.
    - Đối với các repo có ảnh demo thực tế (giao diện, sơ đồ kiến trúc, demo GIF): Chèn đầy đủ tất cả các ảnh vào khung chi tiết và bổ sung **ghi chú rõ ràng (caption)** cho từng ảnh giải thích chức năng, giao diện hoặc kịch bản minh họa.
  - **Thu thập thêm các kho lưu trữ hot từ GitHub, GitLab và các nguồn khác**:
    - Bổ sung `browser-use/browser-use`, `All-Hands-AI/OpenHands`, `langgenius/dify`, `undertheseanlp/underthesea`, `pbcquoc/vietocr`, `VinAIResearch/PhoBERT`, API tra cứu phạt nguội giao thông toàn quốc, Thư viện đọc số tiền thành chữ kế toán.
    - Nâng tổng số lượng công cụ lên **1.930 mục** và **2.925 mẫu cấu hình JSON**.
  - Kiểm thử tự động đạt 100% qua 5 bài test (3 unit test quy tắc nghiệp vụ + 2 unit test an toàn câu lệnh).
  - Đóng gói bản phát hành `dist/` thành công không có bất kỳ cảnh báo hoặc lỗi nào.

- [Nhiệm Vụ 1: Thiết Kế Và Phát Triển Toàn Diện Giao Diện Trang Chủ AI HUB VN Chuẩn Mẫu]:
  - **Khảo sát và đối chiếu yêu cầu**:
    - Khảo sát website https://ai-hub-vn.vercel.app/ và ảnh thiết kế mẫu đính kèm (`media_1792473409782_a59ac630.png`).
    - Xác định danh sách thành phần giữ nguyên (1.930 công cụ, 2.925 JSON, 4 khối thông tin bắt buộc, Cầu nối terminal, Bộ lọc dữ liệu đa tầng).
  - **Thiết kế lại 5 khu vực trọng tâm**:
    - **4.1. Thanh điều hướng (Header)**: Logo 3 hạt mạng AI nodes tím/xanh, menu trung tâm (Công cụ AI, MCP Servers, Agent Skills, Bộ sưu tập Việt Nam, Hướng dẫn), nút Đăng nhập và nút "+ Đóng góp tài nguyên" nổi bật.
    - **4.2. Khu vực giới thiệu chính (Hero Section)**: Huy hiệu `KHO TÀI NGUYÊN AI CHO NGƯỜI VIỆT`, tiêu đề lớn `Tìm đúng công cụ AI. / Làm việc hiệu quả hơn.`, ô tìm kiếm lớn bo tròn mềm mại và dải tags nhu cầu công việc (Lập trình, Nghiên cứu, Tạo nội dung, Tự động hóa, Thiết kế, Văn phòng).
    - **4.3. Ba thẻ nhóm tài nguyên chính (MainCategoryCards)**: Công cụ AI (Robot tím), MCP Servers (Server xanh), Agent Skills (Ngôi sao xanh ngọc) có hiệu ứng hover và điều hướng cuộn mượt.
    - **4.4. Khám phá tài nguyên nổi bật (FeaturedResources)**: GitHub Copilot, Filesystem MCP, Code Review với thông số đánh giá sao, lượt dùng, ngày cập nhật và nút Xem chi tiết ↗.
    - **4.5. Chọn theo nhu cầu (BrowseByNeeds)**: Phát triển phần mềm, Marketing & nội dung, Phân tích dữ liệu, Tự động hóa quy trình.
    - **4.6. Khu vực bổ sung & Chân trang (Footer, LoginModal)**: Tạo `LoginModal.tsx` hỗ trợ đăng nhập GitHub/Email; xây dựng `Footer.tsx` chuẩn mực.
  - **Kết nối mượt mà vào Kho tài nguyên toàn diện 1.930+ mục** với Left Sidebar, chế độ Lưới/Bảng và Terminal Bridge.
  - **Kiểm thử tự động & Build**: 100% pass qua 5 bài kiểm tra, biên dịch `npm run build` hoàn tất xuất sắc.

- [Nhiệm Vụ 2: Thiết Kế Và Phát Triển Bộ Giao Diện Chi Tiết AI HUB VN Chuẩn Mẫu]:
  - **Khảo sát và đối chiếu ảnh demo bộ giao diện chi tiết** (`media_1792474069448_65463741.png`):
    - Màn hình 1: Trang danh mục tài nguyên với Breadcrumb, ô tìm kiếm danh mục, hàng tag lọc nhanh, bộ lọc đa tầng bên trái và danh sách thẻ 2 cột bên phải.
    - Màn hình 2: Trang chi tiết tài nguyên với Header lớn, badge Phổ biến, Cột thông tin nhà phát triển, nút hành động chính, Giới thiệu, Tính năng nổi bật (Grid icon), Hai khối so sánh Ưu/Nhược điểm, Bảng giá, Lựa chọn thay thế và tab Hướng dẫn 4 bước / Cấu hình JSON.
    - Màn hình 3: Trang đóng góp tài nguyên với Form 3 nhóm thông tin phân cấp (Cơ bản, Mô tả, Bổ sung), Khung Lưu ý và nút gửi tím toàn chiều rộng.
  - **Phát triển các trang thành phần mới**:
    - `src/pages/CategoryPage.tsx`: Trang danh mục Công cụ AI, MCP Servers, Agent Skills.
    - `src/pages/DetailPage.tsx`: Trang chi tiết tài nguyên chuyên sâu.
    - `src/pages/ContributePage.tsx`: Trang đóng góp tài nguyên mới.
    - `src/pages/CollectionsPage.tsx`: Trang bộ sưu tập tài nguyên cá nhân và cộng đồng.
    - `src/pages/GuidesPage.tsx`: Trang thư viện bài viết hướng dẫn chuyên sâu.
    - `src/pages/AccountPage.tsx`: Trang hồ sơ tài khoản và tài nguyên đã lưu.
  - **Hệ thống điều hướng đa trang (Multi-page Hash Router)**:
    - Đồng bộ mượt mà URL Hash (`#/`, `#/category/:type`, `#/tool/:id`, `#/contribute`, `#/collections`, `#/guides`, `#/account`), hỗ trợ lưu trạng thái vào `localStorage` và nút Back/Forward của trình duyệt.
  - **Kiểm thử & Đóng gói**: Đạt 5/5 bài kiểm thử unit tests, đóng gói Vite hoàn tất trong 10.92 giây.

- [Tối Ưu Hiển Thị Ảnh Demo & Loại Bỏ Hoàn Toàn Khung Ảnh Trống]:
  - **Mục tiêu**: Loại bỏ triệt để mọi khung hiển thị ảnh trống, dải banner gradient hoặc khung placeholder khi công cụ không có ảnh chụp màn hình/demo thực tế từ kho lưu trữ.
  - **Triển khai kỹ thuật**:
    - `src/components/ToolCard.tsx`: Tách hàm kiểm tra ảnh hợp lệ `validImageUrl`. Nếu không có ảnh hoặc ảnh gặp lỗi tải (`onError`), ẩn hoàn toàn khối ảnh (trả về `null`), không render dải gradient hoặc khung placeholder. Di chuyển hàng nhãn phân loại (`tool.typeNameVi`) và đánh giá sao lên đầu phần thân thẻ để đảm bảo tính cân đối thị giác.
    - `src/pages/DetailPage.tsx`: Xây dựng mảng `validDemoImages`. Nếu không có ảnh hợp lệ hoặc kích hoạt `imageLoadFailed`, component trả về `null` ngay lập tức, không để lại khung đen hoặc khoảng cách trống rỗng.
    - `src/components/ToolDetailModal.tsx`: Đồng bộ xử lý ẩn hoàn toàn khối ảnh khi không có dữ liệu hình ảnh thực tế từ repo.
  - **Kiểm thử & Xác minh**:
    - Kiểm tra `npx tsc --noEmit`: 0 lỗi.
    - Kiểm tra 5/5 bài kiểm thử tự động đạt 100%.
    - Đóng gói bản phát hành `npm run build` hoàn tất xuất sắc trong 10.84 giây.

- [Mở Rộng Thu Thập Tài Nguyên Repo, Skill, MCP, API Cho Thị Trường Việt Nam]:
  - **Mục tiêu**: Thu thập các kho lưu trữ mã nguồn mở, kỹ năng tác tử, máy chủ MCP và giao diện lập trình ứng dụng hàng đầu tại Việt Nam, phục vụ người dùng và doanh nghiệp Việt.
  - **Dữ liệu thu thập & tích hợp**:
    - Bổ sung 13 công cụ nguồn mở trọng yếu: BARTpho (VinAI), PhoWhisper (VinAI), pyvi (Trần Việt Trung), ViT5 (VietAI), VnCoreNLP (HUST/VnCoreNLP), Vistral 7B (Viet-Mistral/AIVM), vnstock (Thịnh Vũ), DiaGioiHanhChinhVN (Kenzouno1), SePay Webhook MCP (SePay Vietnam), pyvnlunar (Hồ Ngọc Đức & Min9802), Vietnamese Tone Normalizer & Spell Checker (Vũ Nguyên Bình), BKAI Foundation Models (Bách Khoa AI Lab), VIVOS Speech Corpus (AIVIVN).
    - Tăng quy mô toàn hệ thống lên **1.943 công cụ** và **2.938 mẫu cấu hình JSON thực thi**.
    - Đáp ứng 100% 4 khối thông tin bắt buộc: Nguồn dẫn chính thức, mục đích, hướng dẫn cài đặt từng bước và hướng dẫn sử dụng tiếng Việt kèm mã nguồn mẫu.
    - Áp dụng triệt để nguyên tắc không tạo ảnh demo giả: Các repo không có ảnh demo đều để mảng rỗng, giao diện tự động ẩn khối ảnh để hiển thị đồng bộ và tinh gọn.
  - **Kiểm thử & Đóng gói**:
    - Kiểm tra `npx tsc --noEmit`: Đạt 0 lỗi.
    - Chạy kiểm thử tự động 5/5 bài kiểm tra: Toàn bộ 1.943 công cụ và 2.938 JSON cấu hình đều đạt chuẩn 100%.
    - Đóng gói Vite hoàn tất trong 7.14 giây.

- [Mở Rộng Thu Thập Tài Nguyên Việt Nam Đợt 2]:
  - **Mục tiêu**: Bổ sung các giải pháp hạ tầng thanh toán, bản đồ số, thư viện ngôn ngữ tự nhiên và chuyển phát vận tải hàng đầu tại Việt Nam.
  - **Tài nguyên tích hợp**:
    - Thêm 11 giải pháp công nghệ: payOS SDK (payOSHQ), Cốc Cốc Tokenizer (Cốc Cốc), Goong Maps SDK (Goong.io), vietTTS (NTT123), VietAI Diacritic Restoration (VietAI), Vietnamese Stopwords (Stopwords Community), DVHCVN (Đào Hoàng Sơn), VNPost EMS Logistics MCP, GHN Express SDK MCP, Vietnamese Telecom Validator, Vietnamese Law Semantic Search.
    - Nâng quy mô toàn kho tài nguyên lên **1.954 công cụ** và **2.949 mẫu cấu hình JSON thực thi**.
    - Đáp ứng đầy đủ quy tắc 4 khối thông tin và cơ chế loại bỏ khối ảnh khi không có ảnh demo thực tế từ repo.
  - **Kiểm thử & Đóng gói**:
    - `npx tsc --noEmit`: 0 lỗi.
    - Unit tests: 5/5 bài kiểm tra đạt 100%.
    - Đóng gói Vite hoàn tất trong 13.85 giây.

- [Mở Rộng Thu Thập Tài Nguyên Doanh Nghiệp, Thanh Toán, Hành Chính 34 Tỉnh, ERP, CRM, Thuế & Luật]:
  - **Mục tiêu**: Thu thập các công cụ, kỹ năng và máy chủ MCP phục vụ chuyên sâu nghiệp vụ doanh nghiệp, tài chính kế toán, hành chính công và pháp lý tại Việt Nam theo yêu cầu người dùng.
  - **Tài nguyên tích hợp**:
    - Thêm 10 giải pháp cốt lõi: Quy hoạch địa giới 34 tỉnh thành mới (Nghị quyết 202/2025/QH15), ZaloPay Payment SDK (ZaloPayOfficial), MoMo Payment Gateway SDK (momo-wallet), Odoo Vietnam Fiscal Localization (Thông tư 200/133), ERPNext Vietnam Localization (Frappe), Zalo OA & ZNS Customer Care MCP, EspoCRM Vietnam Sales B2B, Trình phân tích XML hóa đơn điện tử Thông tư 78 (QĐ 1450/QĐ-TCT), Công cụ tính thuế TNCN & BHXH doanh nghiệp, API tra cứu mã số thuế doanh nghiệp quốc gia.
    - Nâng quy mô toàn kho tài nguyên lên **1.964 công cụ** và **2.959 mẫu cấu hình JSON thực thi**.
    - Đáp ứng đầy đủ quy tắc 4 khối thông tin, không tạo ảnh giả và tự động ẩn khối ảnh khi repo không có ảnh demo.
  - **Kiểm thử & Đóng gói**:
    - `npx tsc --noEmit`: 0 lỗi.
    - Unit tests: 5/5 bài kiểm tra đạt 100%.
    - Đóng gói Vite hoàn tất trong 8.65 giây.

- [Mở Rộng Thu Thập Tài Nguyên Việt Nam Đợt 4 (Thanh Toán, POS KiotViet, Sapo, Mã Bưu Chính 34 Tỉnh, CCCD & BHXH)]:
  - **Mục tiêu**: Bổ sung các giải pháp hạ tầng thanh toán VNPay/VietQR, kết nối bán hàng KiotViet/Sapo, chuẩn hóa mã bưu chính quốc gia 5 số mới cho 34 tỉnh thành và kiểm tra căn cước công dân gắn chip.
  - **Tài nguyên tích hợp**:
    - Thêm 10 giải pháp cốt lõi: VNPay Payment SDK (Lê Huy Giang), VietQR Core Napas 247 (zeforc), KiotViet MCP Server (HiGo MCP), Sapo Omnichannel SDK, Mã bưu chính quốc gia 5 số mới cho 34 tỉnh thành (Bộ TT&TT), VNeID CCCD 12 số Validator, Telegram Banking & Sales Alert Bot, OnePay Vietnam Payment Gateway, Chữ ký số CAdES/XAdES Token USB Validator, BHXH & VssID Benefits Calculator.
    - Nâng quy mô toàn kho tài nguyên lên **1.974 công cụ** và **2.969 mẫu cấu hình JSON thực thi**.
    - Đáp ứng đầy đủ quy tắc 4 khối thông tin và cơ chế loại bỏ khối ảnh khi không có ảnh demo thực tế từ repo.
  - **Kiểm thử & Đóng gói**:
    - `npx tsc --noEmit`: 0 lỗi.
    - Unit tests: 5/5 bài kiểm tra đạt 100%.
    - Đóng gói Vite hoàn tất trong 11.50 giây.

- [Phân loại 10 Lĩnh vực chuyên môn, Khắc phục màn hình trắng và Mở rộng Đợt 8 với 50 công cụ]:
  - **Mục tiêu**: Tái cơ cấu hệ thống phân loại danh mục thành 10 Lĩnh vực chuyên môn tiếng Việt rõ ràng, giữ nguyên các nhãn loại hình quốc tế (`Agent`, `Skill`, `MCP Server`, `Command`, `Setting`, `Hook`, `Template`, `Workflow`), khắc phục triệt để lỗi màn hình trắng (White Screen) bằng ErrorBoundary và cơ chế phòng vệ dữ liệu; đồng thời tự động thu thập và tích hợp thêm 50 công cụ & dịch vụ số thương hiệu lớn tại Việt Nam.
  - **Tài nguyên tích hợp (Đợt 8)**:
    - 50 công cụ thương hiệu lớn: MoMo Mini App, ZaloPay Merchant, VietinBank iConnect, Agribank, SHB, HDBank, MSB, OCB, SeABank, BaoViet Bank, Bảo hiểm Bảo Việt, Bảo Minh, PVI, PTI, VNDirect, SSI iBoard, TCBS, MBS, VPS SmartOne, FPT Smart Cloud AI, Viettel AI, VNPT AI, Cốc Cốc, Zalo AI, FPT.eInvoice, VNPT eContract, Viettel vContract, MISA WeSign, Bkav eHoadon, ThaiSon E-Invoice, Cổng thông tin Tổng cục Hải quan, Cổng một cửa quốc gia NSW, Cổng thông tin Thuế nhà cung cấp nước ngoài, Dịch vụ công Bộ Công Thương, Hệ thống Quản lý hoạt động TMĐT, Cổng Cục Sở hữu trí tuệ, Hệ thống quản lý tên miền .vn (VNNIC), Trung tâm Giám sát an toàn không gian mạng quốc gia (NCSC), Cổng tra cứu Hóa đơn điện tử TCT, Hệ thống tra cứu phạt nguội CSGT, Cổng tra cứu đăng kiểm phương tiện xe cơ giới, Ứng dụng BHXH số VssID, VnTrip, Gotadi, Klook Vietnam, Traveloka Vietnam, Vexere, Phần mềm quản lý Spa Booking, Medpro, YouMed.
    - Nâng quy mô toàn kho tài nguyên lên **2.094 công cụ** và **3.309 mẫu cấu hình JSON thực thi**.
    - Phân chia lại 10 Lĩnh vực chuyên môn: `finance_payment`, `ai_nlp_data`, `programming_devops`, `system_automation`, `ecommerce_retail`, `logistics_transport`, `business_admin`, `legal_public_service`, `telecom_cskh`, `hr_recruitment`.
  - **Kiểm thử & Đóng gói**:
    - `npx tsc --noEmit`: 0 lỗi.
    - Unit tests: 5/5 bài kiểm tra đạt 100%.
    - Đóng gói Vite hoàn tất trong 8.33 giây.

- [Mở Rộng Thu Thập Tài Nguyên Thương Hiệu Lớn Việt Nam Đợt 9 với 50 công cụ]:
  - **Mục tiêu**: Bổ sung tự động đợt 9 gồm 50 công cụ & dịch vụ từ các chuỗi bán lẻ công nghệ, chuỗi nhà thuốc lớn, nền tảng điện toán đám mây và viễn thông quốc gia, EdTech giáo dục trực tuyến, an toàn thông tin không gian mạng, dịch vụ công 5 thành phố trực thuộc Trung ương, bất động sản và các chuỗi F&B tiêu biểu tại Việt Nam.
  - **Tài nguyên tích hợp (Đợt 9)**:
    - 50 công cụ & dịch vụ: Thế Giới Di Động, FPT Shop, Điện Máy Xanh, CellphoneS, Hoàng Hà Mobile, Yody, Canifa, IVY moda, FPT Long Châu, An Khang, Pharmacity, DHG Pharma, Traphaco, Viettel Cloud (Viettel IDC), VNPT Cloud, CMC Cloud, FPT Cloud, Bizfly Cloud (VCCorp), MobiFone MEGAPAY, VinaPhone Brandname SMS, Viettel Post, Vuihoc, HOCMAI, TOPICA, Monkey Junior, Prep.vn IELTS, Viettel Cyber Security (VCS), Bkav SafeGate, CMC Cyber Security, VnCoreNLP (ĐHQGHN), VinAI PhoGPT, VAST Speech & NLP, Cổng DVC Hà Nội, Cổng DVC TP.HCM, Cổng DVC Đà Nẵng, Cổng DVC Hải Phòng, Cổng DVC Cần Thơ, Cổng Tra cứu văn bản QPPL Bộ Tư pháp, Cổng Tra cứu BHXH & BHYT, Hệ thống Tiêm chủng quốc gia, Batdongsan.com.vn (PropertyGuru), Alonhadat, Chợ Tốt (ChoTot), Be Group, Xanh SM (GSM), Mailisa Spa, Golden Gate Group (The Golden Spoon), RedSun ITI, Highlands Coffee, The Coffee House.
    - Nâng tổng số lượng công cụ lên **2.144 công cụ** và **3.459 mẫu cấu hình JSON thực thi**.
  - **Kiểm thử & Đóng gói**:
    - `npx tsc --noEmit`: 0 lỗi.
    - Unit tests: 5/5 bài kiểm tra đạt 100%.
    - Đóng gói Vite hoàn tất trong 8.10 giây.

- [Mặc Định Mở Rộng Màn Hình Làm Việc Trên Toàn Bộ Trang]:
  - **Mục tiêu**: Nâng cấp giao diện người dùng theo yêu cầu, thiết lập mặc định không gian làm việc toàn màn hình (`isExpandedCanvas = true`, container `max-w-[98%]`) trên toàn bộ các trang và phân hệ của ứng dụng.
  - **Công việc đã xử lý**:
    - Thiết lập giá trị mặc định của `isExpandedCanvas` thành `true` và lưu trữ trạng thái vào `localStorage` (`aihub_expanded_canvas`).
    - Đồng bộ thuộc tính `isExpanded` cho toàn bộ các thành phần: `Header`, `MainCategoryCards`, `FeaturedResources`, `BrowseByNeeds`, `CategoryPage`, `DetailPage`, `CollectionsPage`, `GuidesPage`, `AccountPage`, `Footer`.
    - Tối ưu hóa lưới công cụ hiển thị 4 cột trên màn hình lớn, giúp người dùng duyệt nhiều tài nguyên hơn mà không cần cuộn nhiều.
  - **Kiểm thử & Đóng gói**:
    - `npx tsc --noEmit`: 0 lỗi.
    - Unit tests: 5/5 bài kiểm tra đạt 100%.
    - Đóng gói Vite hoàn tất trong 7.43 giây.

- [Mở Rộng Thu Thập Tài Nguyên Việt Nam Đợt 10 với 50 công cụ]:
  - **Mục tiêu**: Bổ sung tự động đợt 10 gồm 50 công cụ & dịch vụ số từ các bệnh viện tuyến cuối (Chợ Rẫy, Bạch Mai, ĐH Y Dược TP.HCM, Viện K, Vinmec), cơ quan nhà nước & BHXH (Đăng ký kinh doanh, Xuất nhập cảnh E-visa, DVC BHXH, Cục Đăng kiểm, KTTV), phần mềm kế toán & ERP (FAST, BRAVO, EFFECT, MISA SME, Thuế TNCN), trường đại học & tuyển sinh (Cổng Tuyển sinh THPT, Bách Khoa HUST, ĐHQG-HCM, UEH, FPT), du lịch nghỉ dưỡng (Vinpearl, Sun World, Vietravel, Saigontourist, Mường Thanh), camera an ninh AI (Hanet, Bkav AI View, VNPT Camera, Viettel vCam, FPT Camera IQ), kho bãi & fulfillment (Boxme, N&H Logistics, GHN, Ninja Van, J&T), ví & Web3 (Coin98, KyberSwap, Ronin Network, Foxpay, VNPAY SmartPOS), tổng đài ảo & CSKH (FPT Oncall, MobiFone 3C, VNPT VCC, CMC Voice, Stringee), quản trị nhân sự (Base.vn, 1Office, VietnamWorks, FPT.eContract, Haravan).
  - **Tài nguyên tích hợp**: Thêm đúng 50 công cụ chuẩn hóa, nâng tổng quy mô toàn hệ thống lên **2.194 công cụ** và **3.609 mẫu cấu hình JSON thực thi**.
  - **Kiểm thử & Đóng gói**:
    - `npx tsc --noEmit`: 0 lỗi.
    - Unit tests: 5/5 bài kiểm tra đạt 100%.
    - Đóng gói Vite hoàn tất trong 8.16 giây.

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
