# 03. Yêu Cầu Nghiệp Vụ: Hệ Thống Quản Lý Và Tra Cứu Công Cụ Trí Tuệ Nhân Tạo

---

## 1. Giới Thiệu
Tài liệu này đặc tả toàn bộ các yêu cầu nghiệp vụ của hệ thống, bao gồm các hoạt động quản lý danh mục, tra cứu, hiển thị chi tiết, sao chép cấu hình, đóng góp từ cộng đồng và quy trình phê duyệt công cụ.

---

## 2. Nhóm Nghiệp Vụ Khám Phá Và Tra Cứu (Discovery & Search)

### 2.1. Nghiệp vụ tìm kiếm công cụ
- **Mục đích**: Giúp người dùng nhanh chóng tìm được công cụ phù hợp với nhu cầu công việc.
- **Quy trình thực hiện**:
  1. Người dùng nhập từ khóa tìm kiếm (tên công cụ, tính năng, tên tác giả, công nghệ hỗ trợ).
  2. Hệ thống tìm kiếm theo thời gian thực và trả về danh sách các công cụ phù hợp với từ khóa.
  3. Nếu không có kết quả, hệ thống hiển thị thông báo trạng thái rỗng kèm gợi ý các từ khóa hoặc danh mục phổ biến.

### 2.2. Nghiệp vụ lọc đa tầng
- **Mục đích**: Thu hẹp phạm vi tìm kiếm theo các tiêu chí chuyên sâu.
- **Tiêu chí lọc bắt buộc**:
  - **Phân loại công cụ**: Máy chủ giao thức ngữ cảnh mô hình (MCP Server), Kỹ năng tác tử (Agent Skill), Bản mẫu tác tử (Agent Template), Công cụ Web độc lập.
  - **Nền tảng tương thích**: Claude Code / Claude Desktop, Antigravity, Cursor, Windsurf, Trình duyệt Web.
  - **Lĩnh vực ứng dụng**: Lập trình và kiểm thử phần mềm, Phân tích dữ liệu và cơ sở dữ liệu, Quản trị hệ thống và đám mây, Tự động hóa quy trình, Soạn thảo văn bản và sáng tạo nội dung.
  - **Tính chất cấp phép**: Mã nguồn mở (Open Source), Miễn phí có giới hạn, Thương mại.

---

## 3. Nhóm Nghiệp Vụ Xem Chi Tiết Và Khai Thác Cấu Hình

### 3.1. Nghiệp vụ hiển thị chi tiết công cụ chuẩn hóa
- **Mục đích**: Cung cấp đầy đủ thông tin để người dùng hiểu rõ và ứng dụng được công cụ ngay lập tức.
- **Bắt buộc hiển thị 4 khối thông tin độc lập**:
  1. **Nguồn dẫn chính thức**:
     - Đường dẫn trực tiếp đến kho mã nguồn chính thức (GitHub / GitLab).
     - Đường dẫn trang chủ hoặc cổng tài liệu chính thức của tác giả.
     - Tên tác giả hoặc tổ chức phát triển, giấy phép sử dụng.
  2. **Công dụng và giải pháp**:
     - Diễn giải bằng tiếng Việt rõ ràng về bài toán mà công cụ giải quyết.
     - Danh sách các khả năng nổi bật (Features).
     - Đối tượng người dùng mục tiêu.
  3. **Hướng dẫn cài đặt từng bước**:
     - Điều kiện môi trường tiên quyết (ví dụ: Node.js, Python, Docker).
     - Câu lệnh cài đặt qua dòng lệnh (`npx`, `uvx`, `pip`, `docker run`).
     - Đoạn mã cấu hình JSON mẫu chuẩn hóa cho từng nền tảng tương thích.
  4. **Hướng dẫn sử dụng thực tế**:
     - Các câu lệnh mẫu (Prompts) gợi ý để kích hoạt công cụ trong hội thoại.
     - Ví dụ kịch bản làm việc thực tế bằng tiếng Việt.
     - Các lưu ý khi vận hành và xử lý lỗi thường gặp.

### 3.2. Nghiệp vụ sao chép cấu hình một chạm
- **Mục đích**: Loại bỏ thao tác thủ công dễ gây lỗi cú pháp JSON khi người dùng cấu hình môi trường.
- **Quy trình thực hiện**:
  1. Người dùng chọn môi trường mục tiêu (ví dụ: Claude Desktop, Antigravity, Cursor).
  2. Hệ thống hiển thị đúng đoạn mã cấu hình tương ứng với môi trường đó.
  3. Người dùng nhấn nút "Sao chép cấu hình", hệ thống đưa đoạn mã vào bộ nhớ tạm (Clipboard) và hiển thị thông báo trạng thái sao chép thành công.

---

## 4. Nhóm Nghiệp Vụ Đóng Góp Công Cụ Từ Cộng Đồng

### 4.1. Nghiệp vụ gửi đề xuất công cụ mới
- **Mục đích**: Mở rộng kho dữ liệu thông qua sự chung tay của cộng đồng người dùng.
- **Quy trình thực hiện**:
  1. Thành viên điền biểu mẫu đóng góp gồm: Tên công cụ, Phân loại, Nền tảng, Liên kết nguồn chính thức, Mô tả công dụng bằng tiếng Việt, Hướng dẫn cài đặt bằng tiếng Việt, Đoạn mã cấu hình JSON, Hướng dẫn sử dụng bằng tiếng Việt.
  2. Hệ thống kiểm tra tính hợp lệ của dữ liệu đầu vào.
  3. Nếu hợp lệ, hệ thống ghi nhận bản ghi ở trạng thái "Chờ phê duyệt" (Pending) và gửi thông báo cho quản trị viên.

---

## 5. Nhóm Nghiệp Vụ Quản Trị Và Kiểm Duyệt Nội Dung

### 5.1. Nghiệp vụ kiểm duyệt và xuất bản
- **Mục đích**: Bảo đảm chất lượng dữ liệu và an toàn thông tin trước khi công bố ra cộng đồng.
- **Quy trình thực hiện**:
  1. Quản trị viên truy cập danh sách các đề xuất chờ duyệt.
  2. Quản trị viên kiểm tra tính chính xác của liên kết nguồn (tránh liên kết giả mạo hoặc chứa mã độc).
  3. Quản trị viên rà soát chất lượng bản dịch và diễn giải tiếng Việt, có thể trực tiếp chỉnh sửa nếu cần.
  4. Quản trị viên ra quyết định: Phê duyệt (chuyển sang trạng thái "Đã xuất bản") hoặc Từ chối (ghi rõ lý do phản hồi cho người gửi).

### 5.2. Nghiệp vụ kiểm tra tính khả dụng của liên kết nguồn (Link Health Check)
- **Mục đích**: Đảm bảo các liên kết mã nguồn ngoài luôn tồn tại và không bị gãy vỡ (lỗi 404).
- **Quy trình thực hiện**:
  1. Hệ thống định kỳ kiểm tra mã phản hồi HTTP của các liên kết nguồn.
  2. Nếu liên kết bị lỗi hoặc kho mã nguồn bị xóa/chuyển chế độ riêng tư, hệ thống gắn nhãn cảnh báo để quản trị viên xử lý.
