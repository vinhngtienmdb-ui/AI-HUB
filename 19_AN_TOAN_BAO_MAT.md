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
   - Điểm cuối `/dispatch` bắt buộc Bearer token, giới hạn tần suất theo từng khóa và hạn mức số lượt mỗi ngày (`dailyQuota`, theo ngày UTC).
   - Tham số tạo khóa được kiểm tra kiểu và giới hạn (tên ≤ 100 ký tự, 1–1.000 yêu cầu/phút, 1–1.000.000 lượt/ngày, 1–3.650 ngày); sai thì trả 400.
   - Lỗi nội bộ không trả chi tiết cho máy khách; nhật ký kiểm toán không lưu nội dung câu hỏi.
   - Trang Quản lý API gọi thẳng máy chủ bằng khóa admin người dùng nhập, chỉ giữ khóa trong bộ nhớ của trang; không còn sinh khóa trong trình duyệt hay hiển thị kết quả giả khi máy chủ không chạy.
   - Mặc định lắng nghe trên `127.0.0.1`. CORS chỉ cho phép nguồn `localhost` hoặc danh sách `AIHUB_ALLOWED_ORIGINS`; yêu cầu từ nguồn lạ bị từ chối với mã 403.
   - `X-Forwarded-For` chỉ được tin cậy khi đặt `AIHUB_TRUST_PROXY=1`.
   - Kiểm thử: `tests/api-server-security.test.js`, `tests/security-and-auth.test.js`.

5. **Lưu trữ dùng chung và quyền quản trị phía máy chủ (Firestore)** — bật bằng `VITE_FIRESTORE_ENABLED=true`:
   - Quyền quản trị được máy chủ xác minh qua quy tắc bảo mật `firestore.rules`: người dùng là quản trị viên khi tồn tại tài liệu `admins/{uid}`. Không ai ghi được vào `admins` từ ứng dụng; quản trị viên được thêm thủ công trong Firebase Console.
   - Đóng góp (`contributions`): khách chỉ đọc công cụ đã duyệt; thành viên gửi đóng góp ở trạng thái chờ duyệt với đúng `uid` và email trong token, chỉ sửa được đóng góp chờ duyệt của mình và không tự đổi trạng thái; chỉ quản trị viên duyệt, từ chối, xóa. Danh sách trường và độ dài được kiểm tra; liên kết nguồn bắt buộc `https://`.
   - Điều chỉnh công cụ (`toolOverrides`): ai cũng đọc, chỉ quản trị viên ghi và chỉ các trường trạng thái, ghi chú, phân loại.
   - Mọi đường dẫn khác bị từ chối.
   - Kiểm thử: `tests/rules/firestore-rules.test.js` chạy trên Firestore Emulator (`npm run test:rules`, có trong CI), gồm các trường hợp tự cấp quyền admin, mạo danh, tự duyệt, sửa bài người khác.

6. **Quản lý bí mật**:
   - Tệp `.env` và `.env.*` (trừ `.env.example`) bị loại khỏi kho mã. Cấu hình Firebase phía trình duyệt là thông tin công khai theo thiết kế của Firebase.

---

## 3. Hạn Chế Đã Biết (Chưa Triển Khai)

| Mã | Hạn chế | Ảnh hưởng | Hướng xử lý |
|---|---|---|---|
| HC-01 | Khi **chưa** bật `VITE_FIRESTORE_ENABLED`, vai trò quản trị viên trên giao diện vẫn xác định bằng so sánh email phía trình duyệt (`src/lib/firebase.ts`), có thể bị ghi đè qua `localStorage`. | Chỉ ảnh hưởng dữ liệu cục bộ của chính người dùng. | Triển khai `firestore.rules`, tạo tài liệu `admins/{uid}`, bật `VITE_FIRESTORE_ENABLED=true` (mục 5.3 của `20_QUY_TRINH_TRIEN_KHAI.md`). |
| HC-02 | Luồng giao diện với Firestore (đăng nhập Google, gửi, duyệt) chưa được kiểm thử tự động đầu-cuối; chỉ quy tắc bảo mật được kiểm thử trên emulator. | Lỗi giao diện không làm lộ dữ liệu vì máy chủ vẫn áp dụng quy tắc bảo mật. | Kiểm tra thủ công sau khi bật trên dự án Firebase thật. |
| HC-03 | Gói `firebase` phụ thuộc `@grpc/grpc-js` có lỗ hổng mức cao theo `npm audit`; chưa có bản vá từ nhà phát triển. | Không khai thác được vì hệ thống không dùng Firestore. | Cập nhật `firebase` khi có bản vá. |
