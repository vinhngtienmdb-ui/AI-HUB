# 10. Danh Mục Công Nghệ Sử Dụng: Hệ Thống Quản Lý Và Tra Cứu Công Cụ Trí Tuệ Nhân Tạo

---

## 1. Mục Đích
Tài liệu này xác định danh mục các công nghệ, ngôn ngữ lập trình, khung phát triển, thư viện và công cụ được lựa chọn để phát triển và vận hành hệ thống.

---

## 2. Danh Mục Công Nghệ Chi Tiết

| Thành Phần | Công Nghệ / Thư Viện Lựa Chọn | Phiên Bản Định Hướng | Lý Do Lựa Chọn |
| :--- | :--- | :--- | :--- |
| **Ngôn ngữ lập trình** | TypeScript | 5.x | Kiểm soát kiểu dữ liệu tĩnh nghiêm ngặt, giảm thiểu lỗi lúc thực thi, nâng cao chất lượng mã nguồn. |
| **Khung phát triển toàn diện** | Next.js (App Router) / React | 15.x / 19.x | Hỗ trợ kết xuất phía máy chủ (SSR) tối ưu cho SEO, hiệu năng cao, định tuyến tệp tin trực quan. |
| **Thiết kế giao diện & Kiểu dáng** | Tailwind CSS | 4.x | Xây dựng giao diện nhanh, linh hoạt, hỗ trợ thiết kế đáp ứng (Responsive) và chế độ sáng/tối chuẩn mực. |
| **Thư viện biểu tượng** | Lucide React | Bản mới nhất | Bộ biểu tượng giao diện phong phú, nhẹ, đồng bộ và hiển thị sắc nét. |
| **Lớp ánh xạ cơ sở dữ liệu (ORM)** | Prisma hoặc Drizzle ORM | Bản ổn định | Hỗ trợ an toàn kiểu dữ liệu (Type-safe), quản lý di chuyển lược đồ (Migrations) rõ ràng, truy vấn nhanh. |
| **Cơ sở dữ liệu lưu trữ** | SQLite (môi trường cục bộ) / PostgreSQL (môi trường sản phẩm) | Bản mới nhất | Gọn nhẹ, không phụ thuộc dịch vụ ngoài khi phát triển; chuyển đổi sang PostgreSQL mượt mà khi triển khai thực tế. |
| **Kiểm tra tính hợp lệ dữ liệu** | Zod | 3.x | Xác thực lược đồ dữ liệu chặt chẽ cho cả yêu cầu phía máy khách và phản hồi phía máy chủ. |
| **Kiểm thử tự động** | Vitest & Playwright | Bản ổn định | Thực hiện kiểm thử đơn vị (Unit Test) và kiểm thử luồng người dùng toàn diện (End-to-End Test). |
| **Đóng gói và Triển khai** | Docker & Docker Compose | Bản ổn định | Đóng gói môi trường đồng nhất, triển khai độc lập và nhanh chóng trên mọi hạ tầng máy chủ. |

---

## 3. Tiêu Chuẩn Viết Mã Nguồn Và Quy Ước Kỹ Thuật

1. **Quy tắc đặt tên**:
   - Tên biến và hàm: `camelCase` (ví dụ: `fetchToolDetail`, `copyConfigToClipboard`).
   - Tên kiểu dữ liệu và thành phần giao diện: `PascalCase` (ví dụ: `ToolCard`, `ConfigViewer`).
   - Tên tệp tin giao diện: `PascalCase` hoặc `kebab-case` đồng nhất theo phân tầng.
2. **Quy tắc xử lý bất đồng bộ**:
   - Sử dụng cú pháp `async / await` chuẩn mực kết hợp khối xử lý ngoại lệ `try ... catch` tại tất cả các điểm giao tiếp dữ liệu.
3. **Bảo mật và biến môi trường**:
   - Toàn bộ tham số cấu hình nhạy cảm được quản lý qua tệp `.env`, tuyệt đối không ghi cố định thông tin bí mật vào mã nguồn.
