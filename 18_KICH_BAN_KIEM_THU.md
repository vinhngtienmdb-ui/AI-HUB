# 18. Kịch Bản Kiểm Thử: Hệ Thống Quản Lý Và Tra Cứu Công Cụ Trí Tuệ Nhân Tạo

---

## 1. Mục Đích
Tài liệu này cung cấp danh sách các trường hợp kiểm thử (Test Cases) chi tiết với các bước thực hiện, dữ liệu thử nghiệm và kết quả kỳ vọng cụ thể để đội ngũ kiểm thử hoặc kiểm thử tự động xác minh chất lượng hệ thống.

---

## 2. Danh Sách Trường Hợp Kiểm Thử Trọng Yếu

| Mã Kịch Bản | Tên Trường Hợp Kiểm Thử | Các Bước Thực Hiện | Dữ Liệu Thử Nghiệm | Kết Quả Kỳ Vọng |
| :--- | :--- | :--- | :--- | :--- |
| **TC-01** | Tìm kiếm công cụ với từ khóa tiếng Việt không dấu | 1. Vào trang chủ.<br>2. Nhập từ khóa vào ô tìm kiếm. | Từ khóa: `co so du lieu` | Hệ thống lọc ra đúng các công cụ liên quan như "SQLite MCP Server", "PostgreSQL MCP". |
| **TC-02** | Xem chi tiết kiểm tra đủ 4 khối thông tin | 1. Nhấn vào thẻ công cụ bất kỳ.<br>2. Quan sát trang chi tiết. | Công cụ: `SQLite MCP Server` | Hiển thị đủ 4 khối: (1) Nguồn GitHub; (2) Công dụng tiếng Việt; (3) Cài đặt tiếng Việt; (4) Hướng dẫn dùng tiếng Việt. |
| **TC-03** | Sao chép cấu hình một chạm cho Claude Desktop | 1. Vào chi tiết công cụ.<br>2. Chọn tab Claude Desktop.<br>3. Nhấn "Sao chép cấu hình". | Thao tác nhấp chuột | Đoạn mã JSON sạch được đưa vào Clipboard; Nút chuyển trạng thái "Đã sao chép!" trong 2 giây. |
| **TC-04** | Chặn gửi đề xuất công cụ khi thiếu 1 trong 4 khối | 1. Đăng nhập.<br>2. Mở form đóng góp.<br>3. Bỏ trống trường "Hướng dẫn sử dụng".<br>4. Nhấn "Gửi đề xuất". | Form thiếu `usage_guide_vi` | Hệ thống báo lỗi ngay tại trường bỏ trống, ngăn chặn gửi form và không tạo bản ghi mới. |
| **TC-05** | Chặn gửi cấu hình JSON sai cú pháp | 1. Mở form đóng góp.<br>2. Nhập cấu hình JSON thiếu dấu ngoặc nhọn. | Cấu hình lỗi cú pháp | Hệ thống phát hiện lỗi cú pháp JSON và thông báo vị trí lỗi cụ thể bằng tiếng Việt. |
| **TC-06** | Quản trị viên phê duyệt công cụ thành công | 1. Đăng nhập quyền Admin.<br>2. Mở hàng đợi duyệt.<br>3. Nhấn "Phê duyệt". | Bản ghi đang ở trạng thái `Pending` | Trạng thái chuyển thành `Published`; Công cụ ngay lập tức hiển thị trên trang chủ công cộng. |
| **TC-07** | Quản trị viên từ chối công cụ bắt buộc nhập lý do | 1. Mở đề xuất đang chờ.<br>2. Nhấn "Từ chối" mà không nhập lý do. | Ô lý do bỏ trống | Hệ thống cảnh báo bắt buộc nhập lý do từ chối (tối thiểu 10 ký tự). |
| **TC-08** | Kiểm tra liên kết nguồn bị gãy (404) | 1. Kích hoạt tính năng kiểm tra liên kết.<br>2. Hệ thống kiểm tra URL nguồn không tồn tại. | URL giả định trả về lỗi 404 | Hệ thống gắn nhãn cảnh báo "Liên kết bị lỗi" trong bảng quản trị. |
