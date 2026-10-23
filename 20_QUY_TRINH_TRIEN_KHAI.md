# 20. Quy Trình Triển Khai: Hệ Thống Quản Lý Và Tra Cứu Công Cụ Trí Tuệ Nhân Tạo

---

## 1. Mục Đích
Tài liệu này quy định cách đóng gói, kiểm tra, cấu hình môi trường và phát hành ba thành phần của hệ thống, cùng phương án quay lui khi phát hành lỗi.

---

## 2. Các Thành Phần Triển Khai

| Thành phần | Mã nguồn | Lệnh chạy | Đầu ra / Cổng |
|---|---|---|---|
| Giao diện web (trang tĩnh) | `src/`, `public/`, `index.html` | `npm run build` | Thư mục `dist/` (HTML, CSS, JavaScript tĩnh, `tool-details/*.json`), triển khai trên Vercel (dự án `ai-hub`) |
| Máy chủ MCP (stdio) | `mcp-gateway/index.js` | `npm run mcp:stdio` | Chạy dưới dạng tiến trình con của Claude Desktop, Cursor, Claude Code |
| Cổng REST API | `mcp-gateway/api-server.js` | `npm run mcp:api` | `http://127.0.0.1:4000` (mặc định) |
| Cầu nối lệnh cục bộ | `server/commandBridge.js` | Tự gắn vào `npm run dev` | Chỉ có trong máy chủ phát triển, **không** có trong `dist/` |

---

## 3. Điều Kiện Trước Khi Phát Hành (Cổng Chất Lượng)

Mọi thay đổi phải vượt qua quy trình kiểm tra liên tục `.github/workflows/ci.yml`, chạy tự động khi mở pull request và khi đẩy lên nhánh `main`:

1. `npm ci`: cài đặt đúng phiên bản trong `package-lock.json`.
2. `npm test`: toàn bộ kiểm thử tự động đạt (dữ liệu khóa API được ghi vào thư mục tạm).
3. `npx tsc --noEmit`: không có lỗi kiểu TypeScript.
4. `npx vite build`: đóng gói thành công.

Không hợp nhất (merge) vào `main` khi CI chưa đạt. Thay đổi liên quan bảo mật phải cập nhật `19_AN_TOAN_BAO_MAT.md` và có kiểm thử tương ứng.

---

## 4. Cấu Hình Môi Trường

- Giao diện web: biến `VITE_FIREBASE_*`, `VITE_ADMIN_EMAIL` (xem `.env.example`). Các biến `VITE_*` được nhúng vào JavaScript tĩnh nên **không** được chứa bí mật.
- Cổng REST API: `AIHUB_API_HOST`, `AIHUB_API_PORT`, `AIHUB_SECURITY_SALT`, `AIHUB_ALLOWED_ORIGINS`, `AIHUB_TRUST_PROXY` (xem `.env.example` và `19_AN_TOAN_BAO_MAT.md`).
- Tệp `.env` không được đưa lên kho mã. Thư mục `mcp-gateway/data/` (khóa API, salt) là dữ liệu vận hành, không được đưa lên kho mã.

---

## 5. Các Bước Phát Hành

### 5.1. Giao diện web (Vercel)
Kho mã được kết nối với Vercel qua ứng dụng GitHub:
- Mỗi pull request có một bản xem trước (Preview) riêng; đường dẫn được Vercel đăng trong bình luận của pull request.
- Hợp nhất vào `main` sẽ tự động đóng gói (`npm run build`) và triển khai bản chính thức (Production).

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

### 5.3. Máy chủ MCP (stdio)
Người dùng cập nhật bằng `git pull` và khởi động lại ứng dụng tác tử AI (Claude Desktop, Cursor). Không có tiến trình máy chủ cần triển khai.

---

## 6. Phương Án Quay Lui (Rollback)

| Thành phần | Cách quay lui |
|---|---|
| Giao diện web | Trên bảng điều khiển Vercel, chọn bản triển khai chính thức trước đó và dùng chức năng quay lui tức thì (Instant Rollback / Promote to Production). Sau đó `git revert` commit lỗi trên `main`. |
| Cổng REST API | `git checkout <commit trước>`, `npm ci`, khởi động lại tiến trình. Dữ liệu `mcp-gateway/data/` không bị ảnh hưởng vì nằm ngoài kho mã. |
| Mã nguồn | `git revert <commit lỗi>` trên `main`, đi qua CI như thay đổi thông thường. Không viết lại lịch sử nhánh `main`. |

Trước khi nâng cấp Cổng REST API, sao lưu thư mục `mcp-gateway/data/` (xem `21_KE_HOACH_BAO_TRI.md`).

---

## 7. Hạn Chế Đã Biết

| Mã | Hạn chế | Hướng xử lý |
|---|---|---|
| TK-01 | Vercel triển khai `main` độc lập với CI; nếu đẩy thẳng lên `main` mà CI lỗi, bản lỗi vẫn được triển khai. | Bật bảo vệ nhánh `main` trên GitHub (Settings → Branches): bắt buộc pull request và bắt buộc kiểm tra `kiem-tra` đạt trước khi hợp nhất. |
| TK-02 | Gói JavaScript chính có kích thước lớn do nhúng toàn bộ kho dữ liệu công cụ. | Nhiệm vụ CL-04 trong `24_DANH_MUC_KIEM_TRA.md`. |
