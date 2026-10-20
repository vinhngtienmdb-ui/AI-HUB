# 04. Quy Tắc Nghiệp Vụ: Hệ Thống Quản Lý Và Tra Cứu Công Cụ Trí Tuệ Nhân Tạo

---

## 1. Mục Đích
Tài liệu này xác định các quy tắc, ràng buộc, điều kiện hợp lệ và quy trình chuyển đổi trạng thái bắt buộc phải tuân thủ trong toàn bộ hệ thống.

---

### 2.0. Phân loại loại hình độc lập (Classification Rules)
Hệ thống phân tách rạch ròi 7 loại hình thành phần AI độc lập:
1. **Kỹ năng tác tử (Skill)**: Các bộ quy chuẩn hành vi và phương pháp giải quyết công việc chuyên biệt (ví dụ: TDD, Systematic Debugging).
2. **Bản mẫu dự án (Template)**: Các khung dự án mẫu khởi tạo hoàn chỉnh đóng gói sẵn cấu hình và thư viện (ví dụ: Angular-app, React-starter).
3. **Tác tử chuyên sâu (Agent)**: Tác tử AI độc lập được cấp vai trò, tính cách và chỉ dẫn hệ thống riêng.
4. **Lệnh phím tắt (Command)**: Các lệnh tự động kích hoạt nhanh bằng cú pháp phím tắt `/command`.
5. **Máy chủ MCP (MCP Server)**: Giao thức kết nối ngữ cảnh mô hình với cơ sở dữ liệu và hệ thống bên ngoài.
6. **Móc nối tự động (Hook)**: Móc nối can thiệp tự động theo sự kiện vòng đời phát triển.
7. **Cấu hình môi trường (Setting)**: Tệp cấu hình thông số và tối ưu hóa tài nguyên.

### 2.1. Quy tắc QT-01: Tính toàn vẹn của 4 trường thông tin bắt buộc
- **Nội dung quy tắc**: Mọi công cụ khi được chuyển sang trạng thái "Đã xuất bản" bắt buộc phải có đầy đủ 4 trường thông tin sau:
  1. `source_url`: Liên kết nguồn chính thức (không được để trống, phải có định dạng URL hợp lệ).
  2. `purpose_vi`: Mô tả công dụng bằng tiếng Việt (độ dài tối thiểu 50 ký tự).
  3. `install_guide_vi`: Hướng dẫn cài đặt bằng tiếng Việt (phải có hướng dẫn dòng lệnh hoặc đoạn mã cấu hình JSON).
  4. `usage_guide_vi`: Hướng dẫn sử dụng bằng tiếng Việt (phải có ít nhất một kịch bản hoặc câu lệnh mẫu).
- **Hành vi hệ thống**: Nếu thiếu bất kỳ trường nào trong 4 trường trên, hệ thống ngăn chặn hành động xuất bản và trả về thông báo lỗi chi tiết.

### 2.2. Quy tắc QT-02: Tính hợp lệ và an toàn của liên kết nguồn
- **Nội dung quy tắc**:
  - `source_url` bắt buộc phải sử dụng giao thức an toàn `https://`.
  - Không chấp nhận các liên kết rút gọn (như bit.ly, tinyurl) để tránh rủi ro bảo mật.
  - Khuyến khích liên kết đến các nền tảng lưu trữ mã nguồn uy tín (GitHub, GitLab), kho gói chính thức (npmjs.org, pypi.org, hub.docker.com) hoặc trang chủ chính thức của tác giả.

### 2.3. Quy tắc QT-03: Tính hợp lệ của cấu hình JSON mẫu
- **Nội dung quy tắc**: Các đoạn mã cấu hình cung cấp cho người dùng (cho Claude Desktop, Antigravity, Cursor) bắt buộc phải là chuỗi JSON hợp lệ về mặt cú pháp.
- **Hành vi hệ thống**: Trình soạn thảo và hệ thống lưu trữ phải tự động kiểm tra cú pháp JSON trước khi lưu. Nếu cú pháp sai, hệ thống báo lỗi tại dòng tương ứng.

---

## 3. Quy Tắc Trạng Thái Và Vòng Đời Công Cụ (State Machine)

### 3.1. Các trạng thái của công cụ
Hệ thống quản lý công cụ qua 5 trạng thái duy nhất:
1. **Bản nháp (Draft)**: Công cụ đang được người tạo soạn thảo, chỉ người tạo nhìn thấy.
2. **Chờ phê duyệt (Pending)**: Công cụ đã được gửi lên hệ thống và đang chờ quản trị viên rà soát.
3. **Đã xuất bản (Published)**: Công cụ đã được duyệt, hiển thị công khai trên giao diện tra cứu cho mọi người dùng.
4. **Bị từ chối (Rejected)**: Công cụ không đạt tiêu chuẩn (sai nguồn, thiếu hướng dẫn, mã độc), bị trả về kèm lý do.
5. **Tạm ẩn (Archived)**: Công cụ bị lỗi thời, nguồn bị gãy vỡ hoặc tạm ngừng chia sẻ.

### 3.2. Quy tắc chuyển trạng thái
- Chuyển từ `Draft` sang `Pending`: Do người dùng thực hiện khi đã điền đầy đủ các thông tin bắt buộc.
- Chuyển từ `Pending` sang `Published`: Chỉ có Quản trị viên (Admin) mới có quyền thực hiện sau khi kiểm tra đạt chuẩn.
- Chuyển từ `Pending` sang `Rejected`: Do Quản trị viên thực hiện, bắt buộc phải nhập lý do từ chối.
- Chuyển từ `Published` sang `Archived`: Do Quản trị viên thực hiện khi công cụ không còn khả dụng hoặc liên kết nguồn bị xóa.

---

## 4. Quy Tắc Về Ngôn Ngữ Và Trình Bày

### 4.1. Quy tắc QT-04: Ngôn ngữ nội dung
- **Nội dung quy tắc**:
  - Toàn bộ phần giải thích công dụng, các bước cài đặt và hướng dẫn sử dụng bắt buộc phải viết bằng tiếng Việt chuẩn hóa, rõ ràng, mạch lạc.
  - Các thuật ngữ kỹ thuật chuyên ngành không thể dịch (như: API, JSON, MCP Server, Token, CLI, Framework) được giữ nguyên theo chuẩn quốc tế.
  - Nghiêm cấm sử dụng các bản dịch máy thô sơ, câu chữ lủng củng, vô nghĩa.

### 4.2. Quy tắc QT-05: Định dạng sao chép cấu hình một chạm
- **Nội dung quy tắc**:
  - Dữ liệu đưa vào bộ nhớ tạm khi người dùng nhấn nút sao chép phải là đoạn mã sạch, đã được định dạng chuẩn (thụt lề 2 khoảng trắng).
  - Không kèm theo các ký tự thừa hoặc ký tự điều khiển gây lỗi khi dán vào tệp cấu hình của người dùng.
