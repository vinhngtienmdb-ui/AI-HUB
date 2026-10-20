# 06. Luồng Nghiệp Vụ: Hệ Thống Quản Lý Và Tra Cứu Công Cụ Trí Tuệ Nhân Tạo

---

## 1. Mục Đích
Tài liệu này trực quan hóa các quy trình hoạt động chính trong hệ thống thông qua các sơ đồ luồng nghiệp vụ, xác định điều kiện bắt đầu, các bước xử lý, rẽ nhánh điều kiện và kết quả kết thúc.

---

## 2. Luồng Nghiệp Vụ 01: Tra Cứu Và Sao Chép Cấu Hình Công Cụ

```mermaid
flowchart TD
    A["Bắt đầu: Người dùng truy cập trang chủ"] --> B["Xem danh sách hoặc nhập từ khóa tìm kiếm"]
    B --> C{"Có áp dụng bộ lọc?"}
    C -- "Có" --> D["Chọn nền tảng và lĩnh vực chuyên môn"]
    C -- "Không" --> E["Hệ thống hiển thị danh sách phù hợp"]
    D --> E
    E --> F["Người dùng nhấn chọn một công cụ cụ thể"]
    F --> G["Hiển thị trang chi tiết: Nguồn, Công dụng, Cài đặt, Sử dụng"]
    G --> H{"Người dùng cần sử dụng cấu hình?"}
    H -- "Có" --> I["Chọn môi trường: Claude Desktop / Antigravity / Cursor"]
    I --> J["Nhấn nút 'Sao chép cấu hình' một chạm"]
    J --> K["Hệ thống đưa JSON sạch vào bộ nhớ tạm"]
    K --> L["Dán cấu hình vào môi trường làm việc của người dùng"]
    H -- "Không" --> M["Đọc hướng dẫn hoặc truy cập liên kết nguồn"]
    L --> N["Kết thúc"]
    M --> N
```

---

## 3. Luồng Nghiệp Vụ 02: Đóng Góp Công Cụ Mới Từ Cộng Đồng

```mermaid
flowchart TD
    A["Bắt đầu: Thành viên đăng nhập và mở form đóng góp"] --> B["Nhập tên, danh mục, liên kết nguồn chính thức"]
    B --> C["Nhập mô tả công dụng bằng tiếng Việt"]
    C --> D["Nhập hướng dẫn cài đặt và đoạn mã JSON cấu hình"]
    D --> E["Nhập hướng dẫn sử dụng và kịch bản mẫu bằng tiếng Việt"]
    E --> F["Nhấn 'Gửi đề xuất'"]
    F --> G{"Kiểm tra hợp lệ 4 thông tin bắt buộc?"}
    G -- "Thiếu hoặc sai cú pháp" --> H["Báo lỗi chi tiết tại từng trường, yêu cầu bổ sung"]
    H --> B
    G -- "Hợp lệ" --> I["Lưu bản ghi với trạng thái: Chờ phê duyệt (Pending)"]
    I --> J["Gửi thông báo đến Quản trị viên"]
    J --> K["Kết thúc: Người gửi theo dõi trạng thái trong danh sách cá nhân"]
```

---

## 4. Luồng Nghiệp Vụ 03: Kiểm Duyệt Và Xuất Bản Công Cụ

```mermaid
flowchart TD
    A["Bắt đầu: Quản trị viên truy cập hàng đợi duyệt"] --> B["Mở chi tiết đề xuất công cụ"]
    B --> C["Kiểm tra tính an toàn và tính xác thực của liên kết nguồn"]
    C --> D["Rà soát độ chuẩn xác của bản dịch tiếng Việt và cấu hình"]
    D --> E{"Đạt tiêu chuẩn xuất bản?"}
    E -- "Cần chỉnh sửa nhỏ" --> F["Quản trị viên trực tiếp biên tập lại nội dung tiếng Việt"]
    F --> G["Phê duyệt xuất bản: Chuyển trạng thái sang 'Published'"]
    E -- "Đạt chuẩn ngay" --> G
    E -- "Không đạt chuẩn" --> H["Từ chối duyệt: Chuyển trạng thái sang 'Rejected'"]
    H --> I["Ghi rõ lý do từ chối gửi lại cho người đóng góp"]
    G --> J["Công cụ hiển thị công khai trên Thư viện"]
    I --> K["Kết thúc"]
    J --> K
```

---

## 5. Luồng Nghiệp Vụ 04: Giám Sát Tính Khả Dụng Của Liên Kết Nguồn (Link Health Check)

```mermaid
flowchart TD
    A["Tiến trình định kỳ hoặc Quản trị viên kích hoạt"] --> B["Lấy danh sách các công cụ đang ở trạng thái 'Published'"]
    B --> C["Gửi yêu cầu HTTP HEAD đến source_url của từng công cụ"]
    C --> D{"Mã phản hồi HTTP trả về?"}
    D -- "200 OK" --> E["Cập nhật trạng thái liên kết: Bình thường"]
    D -- "404 Not Found hoặc Timeout" --> F["Gắn cờ cảnh báo: Liên kết gãy vỡ"]
    F --> G["Tạo thông báo trong trang quản trị"]
    G --> H["Quản trị viên xác minh và tạm ẩn (Archived) nếu kho mã nguồn bị xóa"]
    E --> I["Kết thúc chu kỳ kiểm tra"]
    H --> I
```
