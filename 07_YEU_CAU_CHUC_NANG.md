# 07. Yêu Cầu Chức Năng: Hệ Thống Quản Lý Và Tra Cứu Công Cụ Trí Tuệ Nhân Tạo

---

## 1. Giới Thiệu
Tài liệu này chi tiết hóa toàn bộ các chức năng của hệ thống dưới góc độ kỹ thuật, làm cơ sở chính xác để triển khai mã nguồn và thiết lập kịch bản kiểm thử.

---

## 2. Phân Hệ 01: Tra Cứu Và Khám Phá Công Cụ (Discovery Module)

### 2.1. Chức năng CN-01: Hiển thị Thư viện công cụ
- **Mã chức năng**: `CN-01`
- **Tên chức năng**: Hiển thị danh sách công cụ dạng lưới và phân trang
- **Mục đích**: Giúp người dùng lướt xem các công cụ trí tuệ nhân tạo được đề xuất.
- **Người sử dụng**: Tất cả người dùng (Khách, Thành viên, Quản trị viên).
- **Điều kiện tiên quyết**: Không có.
- **Dữ liệu đầu vào**: Trang hiện tại, số lượng mục trên mỗi trang (mặc định 12), tiêu chí sắp xếp (Mới nhất, Xem nhiều nhất, Đánh giá cao nhất).
- **Quy trình xử lý**:
  1. Hệ thống truy vấn các bản ghi công cụ có trạng thái `Published`.
  2. Sắp xếp theo tiêu chí người dùng lựa chọn.
  3. Trả về danh sách thẻ công cụ gồm: Tên, Biểu tượng, Nhãn loại hình (MCP Server, Agent, Skill), Nhãn nền tảng, Tóm tắt công dụng ngắn gọn, Tên tác giả, Nút xem chi tiết.
- **Kết quả đầu ra**: Danh sách thẻ công cụ trực quan kèm thanh phân trang.
- **Trường hợp ngoại lệ**: Nếu cơ sở dữ liệu chưa có công cụ nào, hiển thị giao diện trạng thái rỗng thân thiện.

### 2.2. Chức năng CN-02: Tìm kiếm tức thời và Lọc đa tiêu chí
- **Mã chức năng**: `CN-02`
- **Tên chức năng**: Tìm kiếm theo từ khóa và lọc danh mục đa tầng
- **Mục đích**: Định vị nhanh công cụ phù hợp với từ khóa hoặc nền tảng cụ thể.
- **Người sử dụng**: Tất cả người dùng.
- **Điều kiện tiên quyết**: Không có.
- **Dữ liệu đầu vào**: Chuỗi từ khóa tìm kiếm, mảng danh mục được chọn, mảng nền tảng được chọn.
- **Quy trình xử lý**:
  1. Tiếp nhận thao tác gõ phím với kỹ thuật giảm tải tần suất (Debounce 300ms).
  2. Lọc danh sách công cụ có tên, tóm tắt hoặc từ khóa trùng khớp (không phân biệt chữ hoa, chữ thường và có hỗ trợ tiếng Việt có dấu).
  3. Kết hợp điều kiện giao (AND) với các bộ lọc nền tảng và danh mục được chọn.
  4. Cập nhật lại danh sách hiển thị tức thì mà không cần tải lại toàn bộ trang.
- **Kết quả đầu ra**: Danh sách công cụ thỏa mãn đồng thời các điều kiện tìm kiếm và lọc.

---

## 3. Phân Hệ 02: Chi Tiết Công Cụ Và Khai Thác Cấu Hình (Tool Detail Module)

### 3.1. Chức năng CN-03: Xem trang chi tiết chuẩn hóa 4 khối thông tin
- **Mã chức năng**: `CN-03`
- **Tên chức năng**: Hiển thị thông tin chi tiết công cụ
- **Mục đích**: Cung cấp đầy đủ tài liệu nguồn, công dụng, cách cài và cách dùng bằng tiếng Việt.
- **Người sử dụng**: Tất cả người dùng.
- **Điều kiện tiên quyết**: Công cụ phải ở trạng thái `Published` (hoặc Quản trị viên đang xem trước).
- **Dữ liệu đầu vào**: Mã định danh (Slug hoặc ID) của công cụ trên đường dẫn URL.
- **Quy trình xử lý**:
  1. Hệ thống tìm kiếm công cụ theo mã định danh.
  2. Nếu không tìm thấy hoặc công cụ chưa xuất bản (đối với khách), chuyển hướng về trang báo lỗi 404.
  3. Hiển thị trang chi tiết được chia thành 4 khối trực quan:
     - **Khối 1: Nguồn gốc**: Hiển thị tác giả, giấy phép, nút liên kết mở tab mới tới GitHub/Trang chủ chính thức kèm biểu tượng bảo đảm an toàn.
     - **Khối 2: Công dụng**: Trình bày rõ ràng bài toán giải quyết, tính năng nổi bật bằng tiếng Việt.
     - **Khối 3: Hướng dẫn cài đặt**: Tab chuyển đổi giữa các nền tảng (Claude Desktop, Antigravity, Cursor...), hiển thị lệnh cài đặt và đoạn mã JSON cấu hình.
     - **Khối 4: Hướng dẫn sử dụng**: Kịch bản thực hành mẫu, câu lệnh prompt tiếng Việt gợi ý.
- **Kết quả đầu ra**: Trang giao diện chi tiết đầy đủ, rõ ràng và mạch lạc.

### 3.2. Chức năng CN-04: Sao chép cấu hình một chạm (One-Click Copy)
- **Mã chức năng**: `CN-04`
- **Tên chức năng**: Sao chép đoạn mã cấu hình JSON vào bộ nhớ tạm
- **Mục đích**: Hỗ trợ người dùng sao chép nhanh cấu hình chuẩn xác vào tệp cấu hình của họ.
- **Người sử dụng**: Tất cả người dùng.
- **Điều kiện tiên quyết**: Đang ở trang chi tiết công cụ.
- **Dữ liệu đầu vào**: Thao tác nhấn nút "Sao chép cấu hình" tại tab môi trường tương ứng.
- **Quy trình xử lý**:
  1. Lấy dữ liệu cấu hình JSON đã định dạng chuẩn tương ứng với môi trường đang chọn.
  2. Gọi giao diện lập trình trình duyệt `navigator.clipboard.writeText()`.
  3. Đổi trạng thái nút bấm thành biểu tượng tích xanh kèm dòng chữ "Đã sao chép!" trong 2 giây.
- **Kết quả đầu ra**: Dữ liệu cấu hình nằm trong bộ nhớ tạm của người dùng, sẵn sàng dán (`Ctrl + V`).

---

## 4. Phân Hệ 03: Đóng Góp Công Cụ (Contribution Module)

### 4.1. Chức năng CN-05: Gửi đề xuất công cụ mới
- **Mã chức năng**: `CN-05`
- **Tên chức năng**: Tiếp nhận đề xuất công cụ từ người dùng
- **Mục đích**: Cho phép cộng đồng đóng góp dữ liệu công cụ mới.
- **Người sử dụng**: Thành viên đã đăng nhập và Quản trị viên.
- **Điều kiện tiên quyết**: Đã xác thực tài khoản.
- **Dữ liệu đầu vào**:
  - Tên công cụ, Nhãn loại hình, Danh sách nền tảng hỗ trợ.
  - Đường dẫn liên kết nguồn chính thức (`source_url`).
  - Văn bản mô tả công dụng bằng tiếng Việt (`purpose_vi`).
  - Hướng dẫn cài đặt bằng tiếng Việt (`install_guide_vi`).
  - Cấu hình JSON mẫu (`config_template`).
  - Hướng dẫn sử dụng bằng tiếng Việt (`usage_guide_vi`).
- **Quy trình xử lý**:
  1. Kiểm tra tính hợp lệ của dữ liệu (bắt buộc có đủ 4 khối thông tin, URL hợp lệ, cú pháp JSON hợp lệ).
  2. Lưu vào cơ sở dữ liệu với trạng thái `Pending`.
  3. Gửi thông báo xác nhận đã tiếp nhận thành công cho người đóng góp.
- **Kết quả đầu ra**: Bản ghi đề xuất mới trong hàng đợi chờ duyệt.

---

## 5. Phân Hệ 04: Quản Trị Và Kiểm Duyệt (Admin Portal)

### 5.1. Chức năng CN-06: Phê duyệt và Quản lý xuất bản
- **Mã chức năng**: `CN-06`
- **Tên chức năng**: Kiểm duyệt, chỉnh sửa và xuất bản công cụ
- **Mục đích**: Quản trị viên kiểm soát chất lượng nội dung trước khi công bố.
- **Người sử dụng**: Quản trị viên.
- **Điều kiện tiên quyết**: Đăng nhập với quyền Quản trị viên.
- **Dữ liệu đầu vào**: Quyết định duyệt (Phê duyệt / Từ chối kèm lý do / Chỉnh sửa nội dung).
- **Quy trình xử lý**:
  1. Quản trị viên xem trước nội dung, có thể chỉnh sửa trực tiếp câu từ tiếng Việt hoặc định dạng cấu hình nếu cần chuẩn hóa thêm.
  2. Nhấn "Phê duyệt": Hệ thống cập nhật trạng thái thành `Published`, công cụ ngay lập tức xuất hiện trên thư viện công khai.
  3. Nhấn "Từ chối": Hệ thống cập nhật trạng thái thành `Rejected` và ghi nhận lý do để người gửi xem lại.
- **Kết quả đầu ra**: Công cụ được xuất bản hoặc trả về cho người gửi.

### 5.2. Chức năng CN-07: Kiểm tra tình trạng liên kết nguồn (Link Health Monitor)
- **Mã chức năng**: `CN-07`
- **Tên chức năng**: Tự động phát hiện liên kết ngoài bị gãy
- **Mục đích**: Đảm bảo nguồn dẫn của các công cụ luôn hoạt động.
- **Người sử dụng**: Hệ thống (chạy ngầm) hoặc Quản trị viên kích hoạt thủ công.
- **Quy trình xử lý**:
  1. Gửi truy vấn kiểm tra tới danh sách URL nguồn của các công cụ đang xuất bản.
  2. Ghi nhận mã phản hồi HTTP. Nếu mã trả về thuộc nhóm lỗi (404, 500) hoặc quá thời gian phản hồi, ghi nhận trạng thái liên kết là `Broken`.
  3. Hiển thị danh sách cảnh báo trong bảng quản trị để Quản trị viên kịp thời cập nhật liên kết mới hoặc tạm ẩn công cụ.

---

## 6. Phân Hệ 05: Thiết Bị Đầu Cuối Cục Bộ & Thực Thi Lệnh (Local Terminal Execution Module)

### 6.1. Chức năng CN-09: Thực thi lệnh dòng lệnh trực tiếp trên máy cục bộ
- **Mã chức năng**: `CN-09`
- **Tên chức năng**: Cửa sổ dòng lệnh tương tác và thực thi lệnh cài đặt một chạm
- **Mục đích**: Cho phép người dùng chạy trực tiếp các lệnh CLI (`claude mcp add`, `npx -y ...`, `npm install`, `git clone`) trên máy tính thông qua cầu nối dịch vụ cục bộ và theo dõi tiến trình thực thi trực tiếp trên giao diện web.
- **Người sử dụng**: Tất cả người dùng đang sử dụng trên máy tính cá nhân.
- **Dữ liệu đầu vào**: Lệnh dòng lệnh hợp lệ (nằm trong danh sách trắng an toàn).
- **Quy trình xử lý**:
  1. Người dùng bấm nút "Chạy lệnh trên máy" tại trang chi tiết công cụ, hoặc tự nhập lệnh vào cửa sổ Terminal cục bộ.
  2. Giao diện mở cửa sổ Thiết bị đầu cuối (Terminal Drawer), gửi yêu cầu thực thi tới máy chủ phụ trợ cục bộ (`POST /api/execute-command`).
  3. Máy chủ kiểm tra danh sách trắng an toàn. Nếu an toàn, khởi tạo tiến trình con (`child_process.spawn`) và truyền luồng kết quả (`stdout`, `stderr`, `exitCode`) về giao diện qua kết nối trực tiếp.
  4. Giao diện hiển thị trực quan theo thời gian thực: màu sắc chuẩn terminal, tự động cuộn dòng, hiển thị trạng thái đang chạy hoặc hoàn thành.
  5. Cung cấp nút "Hủy tiến trình" cho phép người dùng dừng tức thì lệnh nếu bị treo hoặc mất nhiều thời gian.
- **Kết quả đầu ra**: Kết quả thực thi của lệnh trên môi trường hệ điều hành thật của người dùng được hiển thị đầy đủ trên màn hình.
