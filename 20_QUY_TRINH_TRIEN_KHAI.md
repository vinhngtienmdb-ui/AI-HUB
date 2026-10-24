# 20. Quy Trình Triển Khai: Hệ Thống Quản Lý Và Tra Cứu Công Cụ Trí Tuệ Nhân Tạo

---

## 1. Mục Đích
Tài liệu này quy định cách đóng gói, kiểm tra, cấu hình môi trường và phát hành ba thành phần của hệ thống, cùng phương án quay lui khi phát hành lỗi.

---

## 2. Các Thành Phần Triển Khai

| Thành phần | Mã nguồn | Lệnh chạy | Đầu ra / Cổng |
|---|---|---|---|
| Giao diện web (trang tĩnh) | `frontend/` (`src/`, `public/`, `index.html`) | `npm run build` | Thư mục `frontend/dist/` (HTML, CSS, JavaScript tĩnh, `tool-details/*.json`), triển khai trên Vercel (dự án `ai-hub`, cấu hình trong `vercel.json`) |
| Máy chủ MCP (stdio) | `backend/index.js` | `npm run mcp:stdio` | Chạy dưới dạng tiến trình con của Claude Desktop, Cursor, Claude Code |
| Cổng REST API | `backend/api-server.js` | `npm run mcp:api` | `http://127.0.0.1:4000` (mặc định) |
| Cầu nối lệnh cục bộ | `frontend/dev-server/commandBridge.js` | Tự gắn vào `npm run dev` | Chỉ có trong máy chủ phát triển, **không** có trong `frontend/dist/` |
| Tầng dữ liệu | `database/` (`data/allTools.json`, `firestore.rules`, `scripts/`) | `npm run data:validate`, `npm run test:rules` | Kho dữ liệu được frontend đóng gói lúc build và backend đọc lúc chạy qua `@aihub/database`; quy tắc Firestore triển khai bằng Firebase CLI |

---

## 3. Điều Kiện Trước Khi Phát Hành (Cổng Chất Lượng)

Mọi thay đổi phải vượt qua quy trình kiểm tra liên tục `.github/workflows/ci.yml`, chạy tự động khi mở pull request và khi đẩy lên nhánh `main`:

1. `npm ci`: cài đặt đúng phiên bản trong `package-lock.json`.
2. `npm test`: toàn bộ kiểm thử tự động của `database`, `backend`, `frontend` đạt (dữ liệu khóa API được ghi vào thư mục tạm).
3. `npm run typecheck`: không có lỗi kiểu TypeScript ở frontend.
4. `npm run build`: đóng gói frontend thành công.
5. `npm run test:rules`: kiểm thử quy tắc bảo mật Firestore trên emulator (job riêng, cần Java).

Không hợp nhất (merge) vào `main` khi CI chưa đạt. Thay đổi liên quan bảo mật phải cập nhật `19_AN_TOAN_BAO_MAT.md` và có kiểm thử tương ứng.

---

## 4. Cấu Hình Môi Trường

- Giao diện web: biến `VITE_FIREBASE_*`, `VITE_ADMIN_EMAIL`, `VITE_FIRESTORE_ENABLED` (xem `frontend/.env.example`; khi chạy cục bộ đặt trong `frontend/.env`). Các biến `VITE_*` được nhúng vào JavaScript tĩnh nên **không** được chứa bí mật.
- Cổng REST API: `AIHUB_API_HOST`, `AIHUB_API_PORT`, `AIHUB_SECURITY_SALT`, `AIHUB_ALLOWED_ORIGINS`, `AIHUB_TRUST_PROXY`, `AIHUB_TOOLS_FILE` (xem `backend/.env.example` và `19_AN_TOAN_BAO_MAT.md`; backend không tự đọc tệp `.env`, đặt trong môi trường của tiến trình).
- Tệp `.env` không được đưa lên kho mã. Thư mục `backend/data/` (khóa API, salt) là dữ liệu vận hành, không được đưa lên kho mã.

---

## 5. Các Bước Phát Hành

### 5.1. Giao diện web (Vercel)
Kho mã được kết nối với Vercel qua ứng dụng GitHub:
- Mỗi pull request có một bản xem trước (Preview) riêng; đường dẫn được Vercel đăng trong bình luận của pull request.
- Hợp nhất vào `main` sẽ tự động đóng gói và triển khai bản chính thức (Production). Lệnh cài đặt, lệnh build (`npm run build -w @aihub/frontend`) và thư mục đầu ra (`frontend/dist`) được khai báo trong `vercel.json` ở thư mục gốc.

Các bước:
1. Mở pull request, chờ CI đạt và kiểm tra bản xem trước của Vercel.
2. Cập nhật phiên bản và mô tả thay đổi trong `22_LICH_SU_THAY_DOI.md`.
3. Hợp nhất vào `main`; Vercel tự triển khai.
4. Kiểm tra sau phát hành (Smoke Test): mở trang chủ, tìm kiếm một công cụ, mở trang chi tiết, mở tab README và tab Sơ đồ; không có lỗi trong bảng điều khiển trình duyệt.

### 5.2. Cổng REST API
1. Trên máy chủ: `git pull`, `npm ci`.
2. Khởi động lại tiến trình `npm run mcp:api` (qua trình quản lý tiến trình như `systemd` hoặc `pm2`).
3. Kiểm tra sức khỏe: `curl http://127.0.0.1:4000/api/v1/health` trả về `"status": "HEALTHY"`.
4. Khi mở ra mạng: đặt máy chủ sau reverse proxy HTTPS, đặt `AIHUB_API_HOST=0.0.0.0`, `AIHUB_TRUST_PROXY=1`, `AIHUB_ALLOWED_ORIGINS=<tên miền giao diện>`.

### 5.3. Lưu trữ dùng chung trên Firestore (tùy chọn)
Mặc định đóng góp và phê duyệt chỉ lưu trong trình duyệt. Để dùng chung và xác minh quyền quản trị phía máy chủ:
1. Trong Firebase Console của dự án đang dùng cho đăng nhập: tạo cơ sở dữ liệu **Cloud Firestore**.
2. Triển khai quy tắc bảo mật từ thư mục `database/` (nơi có `firebase.json` và `firestore.rules`): `cd database && npx firebase deploy --only firestore:rules --project <mã-dự-án>` (cần đăng nhập `npx firebase login`).
3. Đăng nhập AI Hub bằng tài khoản Google của quản trị viên một lần, lấy **UID** tại Firebase Console → Authentication → Users.
4. Firestore → tạo collection `admins`, tài liệu có mã đúng bằng UID đó (nội dung tùy ý, ví dụ trường `email`).
5. Trên Vercel (Settings → Environment Variables) thêm `VITE_FIRESTORE_ENABLED=true` cho môi trường Production, rồi triển khai lại.
6. Kiểm tra: tài khoản thành viên gửi đóng góp → thấy trong hàng đợi của quản trị viên → duyệt → khách nhìn thấy công cụ.

Quay lui: xóa biến `VITE_FIRESTORE_ENABLED` và triển khai lại; dữ liệu trên Firestore được giữ nguyên.

### 5.4. Máy chủ MCP (stdio)
Người dùng cập nhật bằng `git pull` và khởi động lại ứng dụng tác tử AI (Claude Desktop, Cursor). Không có tiến trình máy chủ cần triển khai.


### 5.5. Cập nhật số sao và kiểm định dữ liệu tự động
- Workflow `.github/workflows/cap-nhat-so-sao.yml` chạy hằng tuần hoặc chạy tay (tab Actions → "Cập nhật số sao và kiểm định dữ liệu" → Run workflow).
- Số sao chỉ gán cho công cụ trỏ tới gốc repo GitHub; thành phần nằm trong một repo lớn không mang số sao của cả repo.
- Điều kiện một lần: Settings → Actions → General → Workflow permissions → bật **Allow GitHub Actions to create and approve pull requests**.
- Pull request do workflow tạo được kích hoạt CI bằng `workflow_dispatch` để đáp ứng kiểm tra bắt buộc `kiem-tra` của nhánh `main`.

---

## 6. Phương Án Quay Lui (Rollback)

| Thành phần | Cách quay lui |
|---|---|
| Giao diện web | Trên bảng điều khiển Vercel, chọn bản triển khai chính thức trước đó và dùng chức năng quay lui tức thì (Instant Rollback / Promote to Production). Sau đó `git revert` commit lỗi trên `main`. |
| Cổng REST API | `git checkout <commit trước>`, `npm ci`, khởi động lại tiến trình. Dữ liệu `backend/data/` không bị ảnh hưởng vì nằm ngoài kho mã. |
| Mã nguồn | `git revert <commit lỗi>` trên `main`, đi qua CI như thay đổi thông thường. Không viết lại lịch sử nhánh `main`. |

Trước khi nâng cấp Cổng REST API, sao lưu thư mục `backend/data/` (xem `21_KE_HOACH_BAO_TRI.md`).

---

## 7. Hạn Chế Đã Biết

| Mã | Hạn chế | Hướng xử lý |
|---|---|---|
| TK-01 | Vercel triển khai `main` độc lập với CI; nếu đẩy thẳng lên `main` mà CI lỗi, bản lỗi vẫn được triển khai. | Bật bảo vệ nhánh `main` trên GitHub (Settings → Branches): bắt buộc pull request và bắt buộc kiểm tra `kiem-tra` đạt trước khi hợp nhất. |
| TK-02 | Gói JavaScript chính có kích thước lớn do nhúng toàn bộ kho dữ liệu công cụ. | Nhiệm vụ CL-04 trong `24_DANH_MUC_KIEM_TRA.md`. |
