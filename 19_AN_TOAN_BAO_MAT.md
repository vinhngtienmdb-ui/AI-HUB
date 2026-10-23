# 19. An Toàn Bảo Mật: Hệ Thống Quản Lý Và Tra Cứu Công Cụ Trí Tuệ Nhân Tạo

---

## 1. Mục Đích
Tài liệu này xác định các chính sách an toàn thông tin, kiểm soát rủi ro bảo mật và phương án bảo vệ dữ liệu cho toàn bộ hệ thống. Mỗi biện pháp ghi rõ trạng thái thực tế và kiểm thử chứng minh. Biện pháp chưa có trong mã nguồn được liệt kê riêng tại mục 3, không được mô tả như đã hoàn thành.

---

## 2. Các Biện Pháp Bảo Mật Đã Triển Khai

1. **Bảo vệ liên kết nguồn**:
   - Liên kết ngoài được mở với `rel="noopener noreferrer" target="_blank"` để ngăn tấn công chiếm quyền cửa sổ (Tabnabbing).

2. **Phòng chống tấn công tiêm mã (XSS)**:
   - Nội dung văn bản được React tự động mã hóa ký tự đặc biệt khi hiển thị.
   - Nội dung README (Markdown của bên thứ ba) được chuyển sang HTML bằng `marked`, sau đó làm sạch bằng `DOMPurify` trước khi hiển thị (`src/components/GitHubReadmeViewer.tsx`). Thẻ `<script>`, thuộc tính `on*` và liên kết `javascript:` bị loại bỏ.

3. **Cầu nối thực thi lệnh cục bộ (`server/commandBridge.js`)**:
   - **Chỉ chạy trong máy chủ phát triển**: Cầu nối gắn vào `npm run dev`, không tồn tại trong bản đóng gói. Máy chủ phát triển chỉ lắng nghe trên `127.0.0.1`.
   - **Kiểm tra nguồn yêu cầu**: Mọi yêu cầu phải thỏa mãn đồng thời: kết nối từ địa chỉ loopback, tiêu đề `Host` là `localhost`/`127.0.0.1`/`::1` (chống DNS rebinding), tiêu đề `Origin` (nếu có) trùng với chính trang AI Hub (chống CSRF), và tiêu đề `X-AIHub-Bridge-Token` khớp mã phiên ngẫu nhiên sinh mỗi lần khởi động. Mã phiên được nhúng vào trang qua thẻ meta; trang web khác nguồn không đọc được.
   - **Không chạy qua shell**: Câu lệnh được tách thành mảng tham số và chạy trực tiếp (`shell: false` trên POSIX). Mọi ký tự điều khiển shell (`; & | \` $ < > ( ) { } [ ] * ? ! % ^ ~ ' #`, xuống dòng) bị từ chối, nên mỗi lần chỉ chạy được một lệnh đơn.
   - **Danh sách trắng chương trình kèm ràng buộc tham số**: `npx`, `npm`, `claude`, `agy`, `uv`, `uvx`, `echo`, `dir`, `ls`, `where`; `git` chỉ với `clone`, `status`, `log`, `diff`, `branch`, `--version` và cấm `-c`, `--config`, `--upload-pack`, `--exec`, `ext::`; `node` và `python` chỉ được kiểm tra phiên bản; `claude` cấm `--dangerously-skip-permissions`.
   - **Không tự chạy lệnh**: Lệnh truyền từ trang chi tiết công cụ chỉ được điền sẵn vào ô nhập; người dùng phải tự kiểm tra và bấm Chạy.
   - **Giới hạn thời gian**: Mỗi tiến trình tối đa 120 giây, quá hạn bị hủy. Người dùng có thể dừng tiến trình bất kỳ lúc nào.
   - **Rủi ro còn lại được chấp nhận**: `npx`, `npm`, `uvx` có thể tải và chạy gói bất kỳ từ kho công khai. Đây là chức năng cốt lõi (cài đặt công cụ); biện pháp kiểm soát là người dùng tự xác nhận câu lệnh trước khi chạy.
   - Kiểm thử: `tests/command-bridge.test.js`.

4. **Cổng REST API Gateway (`mcp-gateway/api-server.js`)**:
   - Khóa API sinh bằng CSPRNG, chỉ lưu chuỗi băm HMAC-SHA256, so sánh bằng `timingSafeEqual`.
   - Muối HMAC lấy từ `AIHUB_SECURITY_SALT` hoặc tự sinh ngẫu nhiên và lưu tại `mcp-gateway/data/.security-salt`. Thư mục `mcp-gateway/data/` không được đưa lên kho mã.
   - Điểm cuối quản trị (`/stats`, `/keys`, `/keys/generate`, `/keys/revoke`, `/audit-logs`) bắt buộc khóa có vai trò `admin` và bị giới hạn 30 yêu cầu/phút/IP. Vai trò khi tạo khóa chỉ nhận `developer` hoặc `admin`.
   - Điểm cuối `/dispatch` bắt buộc Bearer token, giới hạn tần suất theo từng khóa.
   - Mặc định lắng nghe trên `127.0.0.1`. CORS chỉ cho phép nguồn `localhost` hoặc danh sách `AIHUB_ALLOWED_ORIGINS`; yêu cầu từ nguồn lạ bị từ chối với mã 403.
   - `X-Forwarded-For` chỉ được tin cậy khi đặt `AIHUB_TRUST_PROXY=1`.
   - Kiểm thử: `tests/api-server-security.test.js`, `tests/security-and-auth.test.js`.

5. **Quản lý bí mật**:
   - Tệp `.env` và `.env.*` (trừ `.env.example`) bị loại khỏi kho mã. Cấu hình Firebase phía trình duyệt là thông tin công khai theo thiết kế của Firebase.

---

## 3. Hạn Chế Đã Biết (Chưa Triển Khai)

| Mã | Hạn chế | Ảnh hưởng | Hướng xử lý |
|---|---|---|---|
| HC-01 | Vai trò quản trị viên trên giao diện web được xác định bằng so sánh email phía trình duyệt (`src/lib/firebase.ts`), có thể bị ghi đè qua `localStorage`. | Chỉ ảnh hưởng dữ liệu cục bộ của chính người dùng vì chưa có máy chủ lưu trữ dùng chung. | Khi có máy chủ lưu trữ, xác minh vai trò bằng Firebase Custom Claims hoặc quy tắc bảo mật phía máy chủ. |
| HC-02 | Chưa có quy trình kiểm duyệt phía máy chủ; dữ liệu đóng góp lưu trong `localStorage`. | Không có dữ liệu dùng chung để bảo vệ. | Thiết kế cùng HC-01. |
| HC-03 | Gói `firebase` phụ thuộc `@grpc/grpc-js` có lỗ hổng mức cao theo `npm audit`; chưa có bản vá từ nhà phát triển. | Không khai thác được vì hệ thống không dùng Firestore. | Cập nhật `firebase` khi có bản vá. |
