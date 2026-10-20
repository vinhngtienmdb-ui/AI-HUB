# 09. Kiến Trúc Hệ Thống: Hệ Thống Quản Lý Và Tra Cứu Công Cụ Trí Tuệ Nhân Tạo

---

## 1. Mục Đích
Tài liệu này xác định kiến trúc tổng thể, mô hình phân tầng, nguyên tắc thiết kế kỹ thuật và giải pháp tích hợp cho hệ thống.

---

## 2. Mô Hình Phân Tầng Kiến Trúc Tổng Thể

Hệ thống được thiết kế theo mô hình kiến trúc phân tầng hiện đại (Layered Architecture), bảo đảm tính tách biệt mối quan tâm (Separation of Concerns), dễ bảo trì và mở rộng:

```mermaid
flowchart TD
    subgraph Presentation_Layer["1. Tầng Trình Diễn (Presentation Layer - Frontend)"]
        UI_Home["Trang Chủ & Thư Viện Thẻ (Cards)"]
        UI_Filter["Bộ Lọc Đa Tầng & Thanh Tìm Kiếm"]
        UI_Detail["Trang Chi Tiết (4 Khối Thông Tin Chuẩn)"]
        UI_Copy["Trình Tạo Cấu Hình & Sao Chép Một Chạm"]
        UI_Admin["Bảng Điều Khiển Quản Trị & Kiểm Duyệt"]
    end

    subgraph Application_Layer["2. Tầng Ứng Dụng & Điều Hướng (Application / API Gateway Layer)"]
        API_Router["Bộ Định Tuyến Yêu Cầu (Route Handlers)"]
        Auth_Middleware["Lớp Trung Gian Xác Thực & Phân Quyền (RBAC)"]
        Validation_Middleware["Lớp Kiểm Tra Hợp Lệ Dữ Liệu & Cú Pháp JSON"]
    end

    subgraph Domain_Service_Layer["3. Tầng Nghiệp Vụ Cốt Lõi (Domain Service Layer)"]
        Tool_Service["Dịch Vụ Quản Lý & Xuất Bản Công Cụ"]
        Search_Service["Dịch Vụ Tìm Kiếm Tức Thời & Lọc Đa Tiêu Chí"]
        Config_Service["Dịch Vụ Chuyển Đổi Định Dạng Cấu Hình (Claude/Antigravity/Cursor)"]
        Health_Service["Dịch Vụ Giám Sát Tính Khả Dụng Liên Kết Nguồn"]
    end

    subgraph Data_Layer["4. Tầng Dữ Liệu & Lưu Trữ (Data Persistence Layer)"]
        DB_Tools["Bảng Công Cụ Trí Tuệ Nhân Tạo (Tools)"]
        DB_Categories["Bảng Danh Mục & Nền Tảng (Categories / Platforms)"]
        DB_Configs["Bảng Mẫu Cấu Hình Môi Trường (Config Templates)"]
        DB_Users["Bảng Người Dùng & Phân Quyền (Users)"]
    end

    Presentation_Layer --> Application_Layer
    Application_Layer --> Domain_Service_Layer
    Domain_Service_Layer --> Data_Layer
```

---

## 3. Các Phân Hệ Kỹ Thuật Chính

### 3.1. Phân hệ Giao diện người dùng (Frontend Web Application)
- **Kiến trúc phát triển**: Xây dựng theo mô hình kết xuất phía máy chủ kết hợp nạp động phía máy khách (SSR / SSG kết hợp Client Hydration) giúp tối ưu hóa công cụ tìm kiếm (SEO) và tải trang cực nhanh.
- **Quản lý trạng thái (State Management)**: Quản lý trạng thái tìm kiếm, lọc danh mục và môi trường cấu hình tại máy khách bằng phản ứng tức thì (Reactive State).

### 3.2. Phân hệ Giao tiếp ứng dụng (API Layer)
- **Chuẩn giao tiếp**: RESTful API chuẩn hóa, định dạng trao đổi dữ liệu duy nhất bằng JSON.
- **Bảo mật và lọc dữ liệu**: Mọi dữ liệu gửi lên đều đi qua lớp kiểm tra hợp lệ nghiêm ngặt, ngăn chặn các cuộc tấn công tiêm mã (XSS, SQL Injection).

### 3.3. Phân hệ Lưu trữ dữ liệu (Database Layer)
- Lưu trữ có cấu trúc với ràng buộc toàn vẹn khóa chính, khóa ngoại và chỉ mục (Indexing) trên các cột tìm kiếm thường xuyên (`slug`, `name`, `status`, `category_id`).

---

## 4. Nguyên Tắc Kiến Trúc Bắt Buộc

1. **Nguyên tắc "Độc lập dữ liệu cấu hình"**: Các đoạn mã cấu hình JSON của từng nền tảng (Claude Desktop, Antigravity, Cursor) được tách biệt rõ ràng, cho phép cập nhật định dạng cấu hình mới mà không làm thay đổi bảng dữ liệu công cụ chính.
2. **Nguyên tắc "An toàn liên kết nguồn"**: Mọi đường dẫn liên kết ngoài đều được mở trong tab mới với thuộc tính bảo mật `rel="noopener noreferrer"`.
3. **Nguyên tắc "Bảo tồn dữ liệu"**: Sử dụng cơ chế xóa mềm (Soft Delete) hoặc trạng thái tạm ẩn (`Archived`), không xóa vật lý các bản ghi công cụ để đảm bảo tính toàn vẹn và lịch sử truy vết.
