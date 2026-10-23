# 20. Quy Trình Triển Khai: Hệ Thống Quản Lý Và Tra Cứu Công Cụ Trí Tuệ Nhân Tạo

---

## 1. Mục Đích
Tài liệu này quy định cách đóng gói, kiểm tra, cấu hình môi trường và phát hành ba thành phần của hệ thống, cùng phương án quay lui khi phát hành lỗi.

---

## 2. Các Thành Phần Triển Khai

| Thành phần | Mã nguồn | Lệnh chạy | Đầu ra / Cổng |
|---|---|---|---|
| Giao diện web (trang tĩnh) | `src/`, `public/`, `index.html` | `npm run build` | Thư mục `dist/` (HTML, CSS, JavaScript tĩnh) |
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

### 5.1. Giao diện web
1. Hợp nhất pull request đã đạt CI vào `main`.
2. Cập nhật phiên bản và mô tả thay đổi trong `22_LICH_SU_THAY_DOI.md`.
3. Đóng gói: `npm ci && npm run build`.
4. Tải thư mục `dist/` lên dịch vụ lưu trữ trang tĩnh. Dự án hiện **chưa cấu hình** dịch vụ lưu trữ cố định (xem mục 7).
5. Kiểm tra sau phát hành (Smoke Test): mở trang chủ, tìm kiếm một công cụ, mở trang chi tiết, mở tab README và tab Sơ đồ; không có lỗi trong bảng điều khiển trình duyệt.

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
| Giao diện web | Tải lại thư mục `dist/` của phiên bản trước (đóng gói lại từ commit trước: `git checkout <commit> && npm ci && npm run build`). |
| Cổng REST API | `git checkout <commit trước>`, `npm ci`, khởi động lại tiến trình. Dữ liệu `mcp-gateway/data/` không bị ảnh hưởng vì nằm ngoài kho mã. |
| Mã nguồn | `git revert <commit lỗi>` trên `main`, đi qua CI như thay đổi thông thường. Không viết lại lịch sử nhánh `main`. |

Trước khi nâng cấp Cổng REST API, sao lưu thư mục `mcp-gateway/data/` (xem `21_KE_HOACH_BAO_TRI.md`).

---

## 7. Hạn Chế Đã Biết

| Mã | Hạn chế | Hướng xử lý |
|---|---|---|
| TK-01 | Chưa có dịch vụ lưu trữ giao diện web cố định và chưa có bước triển khai tự động trong CI. | Chọn dịch vụ lưu trữ trang tĩnh, sau đó thêm bước triển khai vào CI sau khi các bước kiểm tra đạt. |
| TK-02 | Gói JavaScript chính có kích thước lớn do nhúng toàn bộ kho dữ liệu công cụ. | Nhiệm vụ CL-04 trong `24_DANH_MUC_KIEM_TRA.md`. |
