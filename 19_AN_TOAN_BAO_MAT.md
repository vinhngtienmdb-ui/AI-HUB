# 19. An Toàn Bảo Mật: Hệ Thống Quản Lý Và Tra Cứu Công Cụ Trí Tuệ Nhân Tạo

---

## 1. Mục Đích
Tài liệu này xác định các chính sách an toàn thông tin, kiểm soát rủi ro bảo mật và phương án bảo vệ dữ liệu cho toàn bộ hệ thống.

---

## 2. Các Biện Pháp Bảo Mật Trọng Yếu

1. **Bảo vệ liên kết nguồn và phòng chống phần mềm độc hại**:
   - Mọi liên kết mã nguồn ngoài đều được mở qua thuộc tính bảo mật `rel="noopener noreferrer" target="_blank"` để ngăn chặn tấn công chiếm quyền điều khiển cửa sổ duyệt web (Tabnabbing).
   - Chỉ cho phép liên kết sử dụng giao thức an toàn `https://`.
   - Cơ chế kiểm duyệt nghiêm ngặt từ Quản trị viên trước khi bất kỳ công cụ nào được xuất bản công khai.
2. **Phòng chống tấn công tiêm mã (XSS - Cross-Site Scripting)**:
   - Toàn bộ nội dung mô tả, hướng dẫn bằng tiếng Việt và cấu hình JSON do người dùng nhập vào đều được làm sạch (Sanitize) và mã hóa ký tự đặc biệt trước khi hiển thị trên giao diện người dùng.
3. **Phân quyền và bảo vệ điểm cuối (Endpoint Protection)**:
   - Các điểm cuối API quản trị (phê duyệt, chỉnh sửa, kiểm tra liên kết) bắt buộc phải có mã thông báo phiên làm việc (Session / JWT Token) hợp lệ và được xác minh vai trò Quản trị viên tại tầng trung gian (Middleware).
4. **Giới hạn tần suất yêu cầu (Rate Limiting)**:
   - Áp dụng cơ chế giới hạn tần suất gửi yêu cầu đối với các API tìm kiếm và API gửi đề xuất để ngăn ngừa tấn công từ chối dịch vụ (DDoS) và thu thập dữ liệu tự động trái phép (Scraping).
5. **Chính sách an toàn cho Cầu nối thực thi lệnh cục bộ (Local Command Execution Bridge)**:
   - **Giới hạn phạm vi mạng (Loopback Interface Only)**: Chỉ chấp nhận các kết nối xuất phát từ máy cục bộ (`localhost` / `127.0.0.1`), từ chối toàn bộ kết nối từ mạng bên ngoài.
   - **Danh sách trắng tiền tố lệnh (Command Whitelist)**: Chỉ cho phép các tiền tố lệnh được định nghĩa rõ ràng phục vụ cài đặt và kiểm tra công cụ AI: `npx`, `npm`, `node`, `claude`, `git`, `uv`, `uvx`, `python`, `echo`, `dir`, `ls`.
   - **Chặn các lệnh nguy hiểm (Blacklist Enforcement)**: Cấm tuyệt đối các lệnh can thiệp hệ thống tệp và cấu hình sâu như `rm -rf`, `del /f`, `format`, `shutdown`, `taskkill`, `reg delete`, `powershell -enc`.
   - **Giới hạn thời gian sống (Process Timeout)**: Mỗi lệnh thực thi tối đa không quá 120 giây. Nếu vượt quá thời gian quy định, hệ thống tự động ngắt tiến trình (SIGTERM / SIGKILL).
   - **Kiểm soát hủy tiến trình (Process Cancellation)**: Cung cấp API cho phép người dùng dừng tức thì tiến trình con đang chạy nếu phát hiện sự cố.
