# 08. Tiêu Chí Nghiệm Thu: Hệ Thống Quản Lý Và Tra Cứu Công Cụ Trí Tuệ Nhân Tạo

---

## 1. Mục Đích
Tài liệu này xác định các tiêu chí đo lường và điều kiện bắt buộc để nghiệm thu từng chức năng trong hệ thống. Một chức năng chỉ được xác nhận hoàn thành khi đạt 100% các tiêu chí nghiệm thu tương ứng.

---

## 2. Tiêu Chí Nghiệm Thu Chi Tiết Từng Chức Năng

### 2.1. Nghiệm thu CN-01: Hiển thị Thư viện công cụ
- **TN-01.1**: Hệ thống chỉ hiển thị các công cụ có trạng thái `Published` trên giao diện người dùng công cộng.
- **TN-01.2**: Mỗi thẻ công cụ hiển thị rõ ràng: Tên công cụ, Biểu tượng, Nhãn phân loại (MCP Server, Agent, Skill...), Nhãn nền tảng tương thích, Tác giả và đoạn tóm tắt công dụng bằng tiếng Việt không quá 120 ký tự.
- **TN-01.3**: Tốc độ tải và hiển thị danh mục ban đầu dưới 1.5 giây trong điều kiện mạng tiêu chuẩn.
- **TN-01.4**: Phân trang hoạt động chính xác khi số lượng công cụ vượt quá 12 mục trên một trang.

### 2.2. Nghiệm thu CN-02: Tìm kiếm tức thời và Lọc đa tiêu chí
- **TN-02.1**: Tìm kiếm phản hồi tức thời trong vòng 300ms sau khi người dùng ngừng gõ phím.
- **TN-02.2**: Hỗ trợ tìm kiếm không phân biệt chữ hoa, chữ thường và tìm kiếm tiếng Việt có dấu lẫn không dấu (ví dụ: gõ "co so du lieu" vẫn tìm thấy "Cơ sở dữ liệu").
- **TN-02.3**: Khi áp dụng đồng thời cả tìm kiếm từ khóa và lọc danh mục/nền tảng, kết quả trả về phải là tập giao (AND) thỏa mãn toàn bộ các điều kiện.
- **TN-02.4**: Khi không tìm thấy kết quả nào, giao diện hiển thị thông báo rỗng thân thiện và nút "Xóa bộ lọc" để người dùng quay lại danh sách ban đầu.

### 2.3. Nghiệm thu CN-03: Xem trang chi tiết chuẩn hóa 4 khối thông tin
- **TN-03.1**: Trang chi tiết bắt buộc phải có đầy đủ 4 khối thông tin tách biệt:
  1. **Khối nguồn gốc**: Có liên kết mở tab mới dẫn đến URL chính thức (bắt đầu bằng `https://`), hiển thị tên tác giả và loại giấy phép.
  2. **Khối công dụng**: Trình bày bằng tiếng Việt mạch lạc, có cấu trúc danh sách tính năng và bài toán cụ thể.
  3. **Khối hướng dẫn cài đặt**: Có tab chuyển đổi giữa các nền tảng (Claude Desktop, Antigravity, Cursor...), hiển thị câu lệnh dòng lệnh chuẩn và khối mã JSON cấu hình mẫu.
  4. **Khối hướng dẫn sử dụng**: Cung cấp ít nhất một kịch bản hoặc câu lệnh mẫu (Prompt) bằng tiếng Việt.
- **TN-03.2**: Nếu công cụ đang ở trạng thái `Draft` hoặc `Pending`, người dùng khách khi truy cập đường dẫn trực tiếp sẽ nhận thông báo lỗi 404 (Không tìm thấy tài nguyên).

### 2.4. Nghiệm thu CN-04: Sao chép cấu hình một chạm (One-Click Copy)
- **TN-04.1**: Nhấn nút "Sao chép cấu hình" tại tab bất kỳ, nội dung JSON sạch của tab đó phải được sao chép vào Clipboard của hệ điều hành.
- **TN-04.2**: Đoạn mã được dán ra phải là chuỗi JSON chuẩn (đúng cú pháp, thụt lề 2 dấu cách), không lẫn ký tự HTML hoặc ký tự rác.
- **TN-04.3**: Giao diện nút bấm đổi trạng thái thành "Đã sao chép!" trong 2 giây rồi tự động trở lại trạng thái ban đầu.

### 2.5. Nghiệm thu CN-05: Gửi đề xuất công cụ mới
- **TN-05.1**: Biểu mẫu chặn gửi nếu người dùng bỏ trống bất kỳ trường nào trong 4 khối thông tin bắt buộc (Liên kết nguồn, Công dụng tiếng Việt, Cài đặt tiếng Việt, Sử dụng tiếng Việt).
- **TN-05.2**: Kiểm tra cú pháp liên kết nguồn: Bắt buộc phải là định dạng URL hợp lệ và bắt đầu bằng `https://`.
- **TN-05.3**: Kiểm tra cú pháp cấu hình JSON: Hệ thống báo lỗi ngay tại trường nhập nếu cấu hình không phải là JSON hợp lệ.
- **TN-05.4**: Sau khi gửi thành công, bản ghi được lưu với trạng thái `Pending` và hiển thị trong danh sách theo dõi của người đóng góp.

### 2.6. Nghiệm thu CN-06: Phê duyệt và Quản lý xuất bản
- **TN-06.1**: Chỉ tài khoản có vai trò Quản trị viên mới truy cập được giao diện duyệt.
- **TN-06.2**: Quản trị viên có thể chỉnh sửa trực tiếp nội dung văn bản tiếng Việt và cấu hình trước khi phê duyệt.
- **TN-06.3**: Khi Quản trị viên nhấn "Phê duyệt", trạng thái chuyển sang `Published` và công cụ hiển thị ngay trên thư viện công khai.
- **TN-06.4**: Khi Quản trị viên nhấn "Từ chối", hệ thống bắt buộc phải nhập lý do từ chối (tối thiểu 10 ký tự) mới cho phép hoàn tất.

### 2.7. Nghiệm thu CN-07: Kiểm tra tình trạng liên kết nguồn
- **TN-07.1**: Khi kiểm tra, nếu liên kết trả về mã HTTP 200, hệ thống ghi nhận trạng thái liên kết "Khả dụng".
- **TN-07.2**: Nếu liên kết trả về mã lỗi 404 hoặc bị gián đoạn kết nối, hệ thống ghi nhận cảnh báo "Liên kết bị lỗi" trong bảng quản trị để Quản trị viên xử lý.
