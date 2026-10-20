# 05. Vai Trò Người Dùng: Hệ Thống Quản Lý Và Tra Cứu Công Cụ Trí Tuệ Nhân Tạo

---

## 1. Mục Đích
Tài liệu này xác định các nhóm người dùng trong hệ thống, phạm vi trách nhiệm và ma trận phân quyền chi tiết cho từng vai trò.

---

## 2. Danh Sách Các Vai Trò Người Dùng

### 2.1. Khách vãng lai (Guest)
- **Định danh**: Người dùng truy cập hệ thống nhưng chưa đăng nhập tài khoản.
- **Mục tiêu**: Tìm kiếm, tra cứu thông tin công cụ, đọc hướng dẫn và lấy cấu hình về sử dụng.
- **Quyền hạn**:
  - Xem danh sách công cụ ở trạng thái "Đã xuất bản".
  - Sử dụng thanh tìm kiếm và bộ lọc đa tiêu chí.
  - Xem trang chi tiết công cụ (nguồn, công dụng, hướng dẫn cài đặt và sử dụng bằng tiếng Việt).
  - Sử dụng tính năng "Sao chép cấu hình một chạm" và sao chép câu lệnh dòng lệnh.

### 2.2. Thành viên đóng góp (Contributor)
- **Định danh**: Người dùng đã tạo tài khoản và đăng nhập vào hệ thống.
- **Mục tiêu**: Khai thác tài nguyên và chia sẻ các công cụ AI, máy chủ MCP mới cho cộng đồng.
- **Quyền hạn**:
  - Toàn bộ quyền hạn của Khách vãng lai.
  - Tạo mới và gửi đề xuất công cụ (chuyển vào hàng đợi chờ duyệt).
  - Quản lý danh sách các công cụ do chính mình đã đóng góp.
  - Chỉnh sửa nội dung đề xuất khi đang ở trạng thái Bản nháp (Draft) hoặc Bị từ chối (Rejected).
  - Nhận thông báo khi đề xuất được phê duyệt hoặc bị từ chối kèm lý do.

### 2.3. Quản trị viên hệ thống (Administrator)
- **Định danh**: Người quản lý có đặc quyền cao nhất trong hệ thống.
- **Mục tiêu**: Đảm bảo chất lượng dữ liệu, kiểm soát an toàn thông tin và vận hành nền tảng.
- **Quyền hạn**:
  - Toàn bộ quyền hạn của Thành viên đóng góp.
  - Phê duyệt hoặc từ chối các đề xuất công cụ từ thành viên.
  - Trực tiếp tạo mới, chỉnh sửa nội dung (bản dịch tiếng Việt, cấu hình) của bất kỳ công cụ nào.
  - Thay đổi trạng thái công cụ (Xuất bản, Tạm ẩn, Xóa).
  - Quản lý danh mục lĩnh vực và nền tảng tương thích.
  - Kích hoạt tiến trình kiểm tra tính khả dụng của liên kết nguồn (Link Health Check).
  - Quản lý danh sách tài khoản người dùng trong hệ thống.

---

## 3. Ma Trận Phân Quyền Chi Tiết (RBAC Matrix)

| Chức Năng / Nghiệp Vụ | Khách Vãng Lai (Guest) | Thành Viên (Contributor) | Quản Trị Viên (Administrator) |
| :--- | :---: | :---: | :---: |
| Xem danh mục công cụ đã xuất bản | Cho phép | Cho phép | Cho phép |
| Tìm kiếm và lọc công cụ | Cho phép | Cho phép | Cho phép |
| Xem chi tiết công cụ (4 phần) | Cho phép | Cho phép | Cho phép |
| Sao chép cấu hình một chạm | Cho phép | Cho phép | Cho phép |
| Gửi đề xuất công cụ mới | Không | Cho phép | Cho phép |
| Xem danh sách công cụ cá nhân gửi | Không | Cho phép | Cho phép |
| Chỉnh sửa đề xuất của chính mình | Không | Cho phép (khi Draft/Rejected) | Cho phép |
| Phê duyệt / Từ chối công cụ | Không | Không | Cho phép |
| Chỉnh sửa bất kỳ công cụ nào | Không | Không | Cho phép |
| Tạm ẩn / Xóa công cụ | Không | Không | Cho phép |
| Quản lý danh mục và nền tảng | Không | Không | Cho phép |
| Quản lý người dùng hệ thống | Không | Không | Cho phép |
| Kích hoạt kiểm tra liên kết nguồn | Không | Không | Cho phép |
