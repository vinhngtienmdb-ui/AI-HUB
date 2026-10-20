# 11. Đặc Tả Giao Diện Người Dùng: Hệ Thống Quản Lý Và Tra Cứu Công Cụ Trí Tuệ Nhân Tạo

---

## 1. Mục Đích
Tài liệu này xác định danh sách các màn hình, cấu trúc bố cục, luồng điều hướng và các trạng thái giao diện trong hệ thống nhằm đảm bảo trải nghiệm người dùng trực quan, khoa học và nhất quán.

---

## 2. Danh Sách Màn Hình Chính

### 2.1. Màn hình MH-01: Trang chủ và Thư viện công cụ
- **Bố cục chính**:
  1. **Thanh đầu trang (Header)**: Logo nhận diện thương hiệu, thanh điều hướng chính (Khám phá, Đóng góp công cụ, Tài liệu hướng dẫn), nút chuyển đổi giao diện sáng/tối và nút đăng nhập/tài khoản.
  2. **Khu vực giới thiệu nổi bật (Hero Section)**: Tiêu đề giới thiệu kho công cụ AI, MCP Server và Agent Skill kèm ô tìm kiếm trung tâm lớn hỗ trợ tìm kiếm tức thời.
  3. **Khu vực bộ lọc bên cạnh hoặc thanh ngang (Filter Bar)**:
     - Nhóm lọc theo loại hình: Tất cả, MCP Server, Agent Skill, Web AI Tool.
     - Nhóm lọc theo nền tảng: Claude Desktop, Antigravity, Cursor, Windsurf.
     - Nhóm lọc theo lĩnh vực: Lập trình, Cơ sở dữ liệu, Đám mây, Tự động hóa, Viết lách.
  4. **Khu vực hiển thị danh mục (Tools Grid)**: Lưới 3 hoặc 4 cột trên máy tính, 2 cột trên máy tính bảng và 1 cột trên điện thoại di động.
  5. **Thẻ công cụ (Tool Card)**: Biểu tượng công cụ, Tên, Tác giả, Nhãn nền tảng, Tóm tắt công dụng ngắn gọn bằng tiếng Việt, Biểu tượng liên kết nguồn GitHub và Nút "Xem chi tiết & Cấu hình".
  6. **Chân trang (Footer)**: Thông tin bản quyền, liên kết điều khoản và ghi nhận nguồn đóng góp cộng đồng.

### 2.2. Màn hình MH-02: Trang chi tiết công cụ (Trọng tâm trải nghiệm)
- **Bố cục 4 khối thông tin bắt buộc**:
  - **Khối 1: Đầu trang thông tin & Nguồn dẫn**:
    - Tên công cụ, Biểu tượng lớn, Nhãn loại hình và Nền tảng hỗ trợ.
    - Nút bấm trực quan mở "Kho mã nguồn chính thức" (GitHub) kèm thuộc tính bảo mật an toàn.
    - Thông tin tác giả, loại giấy phép phần mềm (MIT, Apache 2.0...) và trạng thái liên kết.
  - **Khối 2: Công dụng & Tính năng giải quyết**:
    - Đoạn văn mô tả chi tiết bằng tiếng Việt về bài toán thực tế mà công cụ giải quyết.
    - Danh sách các tính năng và năng lực cốt lõi.
  - **Khối 3: Hướng dẫn cài đặt & Cấu hình một chạm**:
    - Hệ thống các thẻ chuyển đổi môi trường: `Claude Desktop`, `Antigravity`, `Cursor`.
    - Hướng dẫn dòng lệnh cài đặt (Lệnh `npx`, `uvx`, `pip`, `docker`).
    - Hộp hiển thị mã cấu hình JSON với tính năng tô sáng cú pháp.
    - Nút bấm nổi bật **"Sao chép cấu hình"** (kèm hiệu ứng phản hồi đã sao chép).
  - **Khối 4: Hướng dẫn sử dụng & Kịch bản thực tế**:
    - Danh sách các câu lệnh mẫu (Prompts) gợi ý bằng tiếng Việt.
    - Ví dụ đoạn hội thoại mẫu giữa người dùng và tác tử trí tuệ nhân tạo khi công cụ hoạt động.

### 2.3. Màn hình MH-03: Màn hình đóng góp công cụ mới
- **Bố cục chính**:
  - Biểu mẫu trực tuyến với các nhóm trường rõ ràng:
    - Nhóm 1: Thông tin cơ bản (Tên công cụ, Loại hình, Nền tảng, Tác giả).
    - Nhóm 2: Nguồn dẫn chính thức (URL kho mã nguồn, URL tài liệu).
    - Nhóm 3: Mô tả công dụng bằng tiếng Việt.
    - Nhóm 4: Hướng dẫn cài đặt và cấu hình JSON mẫu cho từng môi trường.
    - Nhóm 5: Hướng dẫn sử dụng và câu lệnh mẫu bằng tiếng Việt.
  - Nút kiểm tra thử cú pháp cấu hình JSON.
  - Nút "Gửi đề xuất kiểm duyệt".

### 2.4. Màn hình MH-04: Bảng điều khiển quản trị viên (Admin Portal)
- **Bố cục chính**:
  - Bảng thống kê nhanh: Tổng số công cụ, Công cụ đã xuất bản, Đề xuất đang chờ duyệt, Cảnh báo liên kết lỗi.
  - Danh sách hàng đợi duyệt: Cho phép xem nhanh, biên tập lại bản dịch tiếng Việt, duyệt xuất bản hoặc từ chối kèm lý do.
  - Bảng danh mục công cụ với các thao tác: Chỉnh sửa, Tạm ẩn, Kiểm tra tính khả dụng liên kết nguồn.

---

## 3. Đặc Tả Các Trạng Thái Giao Diện (UI States)

1. **Trạng thái đang tải (Loading State)**:
   - Sử dụng khung xương hiệu ứng sóng mờ (Skeleton Loader) mô phỏng chính xác hình dáng thẻ công cụ và khối văn bản, không dùng vòng xoay che màn hình làm gián đoạn mắt nhìn.
2. **Trạng thái rỗng (Empty State)**:
   - Hiển thị hình minh họa tinh gọn, dòng thông báo "Không tìm thấy công cụ phù hợp với từ khóa của bạn" kèm nút bấm "Xóa bộ lọc".
3. **Trạng thái lỗi (Error State)**:
   - Hiển thị thông báo thân thiện bằng tiếng Việt, hướng dẫn người dùng thử tải lại trang hoặc quay về trang chủ.
4. **Trạng thái phản hồi tức thì (Feedback State)**:
   - Hộp thông báo nhanh (Toast Notification) góc trên màn hình khi sao chép cấu hình thành công hoặc gửi đề xuất thành công.
