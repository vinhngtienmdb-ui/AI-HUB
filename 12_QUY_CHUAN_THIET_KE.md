# 12. Quy Chuẩn Thiết Kế Giao Diện: Hệ Thống Quản Lý Và Tra Cứu Công Cụ Trí Tuệ Nhân Tạo

---

## 1. Mục Đích
Tài liệu này xác định bộ quy chuẩn thiết kế giao diện (Design System) thống nhất cho toàn bộ sản phẩm, đảm bảo tính thẩm mỹ hiện đại, chuyên nghiệp, độ tương phản cao và trải nghiệm người dùng tối ưu.

---

## 2. Bảng Màu Thống Nhất (Color Palette)

Hệ thống hỗ trợ cả hai chế độ sáng (Light Mode) và tối (Dark Mode) với bảng màu trung tính kết hợp điểm nhấn công nghệ:

| Vai Trò Màu | Mã Màu Sáng (Light) | Mã Màu Tối (Dark) | Ứng Dụng |
| :--- | :--- | :--- | :--- |
| **Nền chính (Background)** | `#F8FAFC` (Slate 50) | `#0B0F19` (Slate 950) | Nền tổng thể của toàn trang |
| **Nền bề mặt (Surface / Card)** | `#FFFFFF` (White) | `#1E293B` (Slate 800) | Nền thẻ công cụ, hộp thoại, bảng biểu |
| **Đường viền (Border)** | `#E2E8F0` (Slate 200) | `#334155` (Slate 700) | Viền thẻ, thanh phân cách, khung nhập liệu |
| **Chữ chính (Text Primary)** | `#0F172A` (Slate 900) | `#F8FAFC` (Slate 50) | Tiêu đề chính, tên công cụ, nội dung quan trọng |
| **Chữ phụ (Text Secondary)** | `#475569` (Slate 600) | `#94A3B8` (Slate 400) | Mô tả phụ, tên tác giả, nhãn chú thích |
| **Màu chủ đạo (Primary Accent)** | `#2563EB` (Blue 600) | `#3B82F6` (Blue 500) | Nút bấm chính, liên kết, trạng thái kích hoạt |
| **Màu thành công (Success)** | `#16A34A` (Green 600) | `#22C55E` (Green 500) | Trạng thái sao chép thành công, liên kết an toàn |
| **Màu cảnh báo (Warning)** | `#D97706` (Amber 600) | `#F59E0B` (Amber 500) | Trạng thái chờ phê duyệt, liên kết nghi ngờ |
| **Màu nguy hiểm (Danger)** | `#DC2626` (Red 600) | `#EF4444` (Red 500) | Thông báo lỗi, liên kết bị gãy vỡ, nút xóa |

---

## 3. Kiểu Chữ Và Thứ Bậc Văn Bản (Typography)

- **Họ phông chữ chính**: `Inter`, `Be Vietnam Pro` hoặc phông chữ hệ thống tiêu chuẩn (`system-ui, -apple-system, sans-serif`), hiển thị tiếng Việt dấu thanh sắc nét và chuẩn xác.
- **Phông chữ mã nguồn (Monospace)**: `JetBrains Mono`, `Fira Code` hoặc `monospace` dùng cho các đoạn mã JSON cấu hình và lệnh dòng lệnh.
- **Thứ bậc kích thước văn bản**:
  - Tiêu đề cấp 1 (Page Heading): 30px (Desktop) / 24px (Mobile), đậm (Font-weight: 700).
  - Tiêu đề cấp 2 (Section Heading): 22px / 20px, bán đậm (Font-weight: 600).
  - Tiêu đề thẻ (Card Title): 18px, bán đậm (Font-weight: 600).
  - Văn bản nội dung (Body): 15px / 16px, đều đặn (Font-weight: 400), khoảng cách dòng 1.6.
  - Văn bản chú thích nhỏ (Caption / Badge): 12px / 13px, trung bình (Font-weight: 500).

---

## 4. Thành Phần Giao Diện Chuẩn Hóa (Standard Components)

1. **Khối mã nguồn và Nút sao chép**:
   - Khung nền tối nhẹ với viền tinh tế, tự động đánh số dòng hoặc thụt lề 2 ký tự.
   - Nút "Sao chép" cố định tại góc trên bên phải của hộp mã nguồn, luôn có biểu tượng trực quan kèm nhãn văn bản.
2. **Nhãn phân loại (Badges / Tags)**:
   - Bo góc tròn mềm mại (`rounded-full` hoặc `rounded-md`), chiều cao 24px, chữ nhỏ gọn, màu nền nhạt phối với chữ màu đậm tương ứng.
3. **Thẻ công cụ (Tool Card)**:
   - Bo góc tiêu chuẩn 12px (`rounded-xl`), có hiệu ứng nổi nhẹ khi di chuột qua (`hover:shadow-md`, `transition-all duration-200`).
   - Phân tách rõ ràng giữa phần tóm tắt công dụng tiếng Việt và khu vực hành động (nút xem chi tiết, nguồn GitHub).
