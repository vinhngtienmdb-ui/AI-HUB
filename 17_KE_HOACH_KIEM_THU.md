# 17. Kế Hoạch Kiểm Thử: Hệ Thống Quản Lý Và Tra Cứu Công Cụ Trí Tuệ Nhân Tạo

---

## 1. Mục Đích
Tài liệu này xác định chiến lược, phạm vi, môi trường và các giai đoạn kiểm thử nhằm đảm bảo hệ thống vận hành ổn định, chính xác theo toàn bộ các yêu cầu nghiệp vụ và tiêu chí nghiệm thu đã phê duyệt.

---

## 2. Các Tầng Kiểm Thử Bắt Buộc

1. **Kiểm thử đơn vị (Unit Testing)**:
   - Kiểm tra các hàm logic độc lập: định dạng dữ liệu cấu hình JSON, xử lý chuỗi tìm kiếm tiếng Việt có dấu, kiểm tra tính hợp lệ của đường dẫn URL nguồn.
2. **Kiểm thử tích hợp (Integration Testing)**:
   - Kiểm tra giao tiếp giữa các điểm cuối API và tầng cơ sở dữ liệu: thêm mới công cụ, cập nhật trạng thái phê duyệt, truy vấn danh sách kèm bộ lọc.
3. **Kiểm thử giao diện và trải nghiệm (UI/UX Testing)**:
   - Kiểm tra khả năng tương tác trên các kích thước màn hình (Máy tính, Máy tính bảng, Điện thoại di động).
   - Kiểm tra hoạt động của tính năng sao chép cấu hình một chạm vào bộ nhớ tạm.
4. **Kiểm thử hồi quy (Regression Testing)**:
   - Thực hiện kiểm tra lại toàn bộ hệ thống sau mỗi lần có bản vá hoặc tính năng mới, đảm bảo các chức năng cũ không bị ảnh hưởng tiêu cực.

---

## 3. Điều Kiện Vượt Qua Cổng Kiểm Thử
- 100% các trường hợp kiểm thử chức năng bắt buộc đều đạt kết quả "Thành công".
- Không còn lỗi ở mức độ nghiêm trọng (Blocker hoặc Critical).
- Thời gian phản hồi trung bình của API tìm kiếm và tải trang chi tiết đạt chuẩn dưới 1.5 giây.
