# 21. Kế Hoạch Bảo Trì: Hệ Thống Quản Lý Và Tra Cứu Công Cụ Trí Tuệ Nhân Tạo

---

## 1. Mục Đích
Tài liệu này quy định việc giám sát, ghi nhật ký, sao lưu, xử lý sự cố và bảo trì định kỳ. Mỗi mục ghi rõ hiện trạng thực tế; hạng mục chưa triển khai được liệt kê tại mục 7.

---

## 2. Giám Sát (Monitoring)

| Đối tượng | Cách kiểm tra | Hiện trạng |
|---|---|---|
| Cổng REST API | `GET /api/v1/health` (không cần xác thực) trả về trạng thái, thời gian hoạt động, số công cụ. | Đã có điểm cuối; chưa có công cụ gọi định kỳ và cảnh báo. |
| Thống kê sử dụng API | `GET /api/v1/stats` (cần khóa admin): số khóa hoạt động, số yêu cầu. | Đã có. |
| Giao diện web | Kiểm tra sau phát hành theo mục 5.1 của `20_QUY_TRINH_TRIEN_KHAI.md`. | Thủ công. |
| Chất lượng mã nguồn | CI chạy trên mỗi pull request và mỗi lần đẩy lên `main`. | Đã có. |

---

## 3. Ghi Nhật Ký (Logging)

- Cổng REST API ghi nhật ký kiểm toán (thời điểm, IP, mã khóa, điểm cuối, mã trạng thái, độ trễ, hành động) trong bộ nhớ, tối đa 500 bản ghi gần nhất; xem qua `GET /api/v1/audit-logs` (cần khóa admin). Nhật ký mất khi khởi động lại tiến trình.
- Không ghi khóa API thô, mật khẩu hay dữ liệu cá nhân vào nhật ký.
- Lỗi máy chủ được ghi với hành động `INTERNAL_ERROR`.

---

## 4. Sao Lưu Và Phục Hồi (Backup & Recovery)

| Dữ liệu | Vị trí | Sao lưu | Phục hồi |
|---|---|---|---|
| Mã nguồn, tài liệu, kho dữ liệu công cụ (`src/data/allTools.json`) | Kho GitHub | Lịch sử git là bản sao lưu. | `git checkout` / `git revert`. |
| Khóa API và salt của Cổng REST API | `mcp-gateway/data/` (ngoài kho mã) | Sao chép thư mục trước mỗi lần nâng cấp và định kỳ hằng tuần. Tệp `.security-salt` phải được sao lưu cùng `api-keys.json`, thiếu salt thì toàn bộ khóa mất hiệu lực. | Chép lại thư mục, khởi động lại tiến trình. |
| Dữ liệu người dùng trên giao diện web (đóng góp, đánh dấu, hồ sơ) | `localStorage` của trình duyệt từng người dùng | Không có sao lưu phía máy chủ. | Không phục hồi được khi người dùng xóa dữ liệu trình duyệt. |

---

## 5. Quy Trình Xử Lý Sự Cố

1. **Tiếp nhận**: ghi nhận hiện tượng, thời điểm, thành phần bị ảnh hưởng vào `23_NHAT_KY_DU_AN.md`.
2. **Khoanh vùng**: xác định thành phần (giao diện web, Cổng REST API, máy chủ MCP) và commit phát hành gần nhất.
3. **Khắc phục tạm thời**: quay lui theo mục 6 của `20_QUY_TRINH_TRIEN_KHAI.md` nếu sự cố do phát hành mới.
4. **Sửa lỗi gốc**: tạo nhiệm vụ trong `24_DANH_MUC_KIEM_TRA.md`, sửa kèm kiểm thử tái hiện lỗi, đi qua CI.
5. **Báo cáo**: ghi nguyên nhân gốc rễ và biện pháp phòng ngừa vào `23_NHAT_KY_DU_AN.md`.

Sự cố bảo mật (ví dụ lộ khóa API): thu hồi khóa qua `POST /api/v1/keys/revoke`, tạo khóa mới, kiểm tra nhật ký kiểm toán, cập nhật `19_AN_TOAN_BAO_MAT.md`.

---

## 6. Bảo Trì Định Kỳ

| Tần suất | Công việc |
|---|---|
| Mỗi pull request | CI: kiểm thử, kiểm tra kiểu, đóng gói. |
| Hằng tuần (tự động) | Workflow `.github/workflows/cap-nhat-so-sao.yml` (thứ Hai 02:17 UTC): kiểm định trực tuyến, lấy số sao thật từ GitHub API, mở pull request `tu-dong/cap-nhat-so-sao` khi dữ liệu thay đổi; quản trị viên xem các công cụ chuyển sang `broken` rồi hợp nhất. |
| Hằng tuần | Sao lưu `mcp-gateway/data/`. Chạy `npm audit --omit=dev`, ghi nhận lỗ hổng mới vào `19_AN_TOAN_BAO_MAT.md`. |
| Hằng tháng | Cập nhật gói phụ thuộc (`npm outdated`), chạy lại CI. Chạy `npm run data:validate` để kiểm tra chất lượng kho dữ liệu công cụ. |
| Hằng quý | Rà soát khóa API không sử dụng hoặc sắp hết hạn, thu hồi khóa thừa. Rà soát lại `19_AN_TOAN_BAO_MAT.md`. |

---

## 7. Hạn Chế Đã Biết

| Mã | Hạn chế | Hướng xử lý |
|---|---|---|
| BT-01 | Chưa có công cụ giám sát gọi `/api/v1/health` định kỳ và gửi cảnh báo. | Dùng dịch vụ giám sát thời gian hoạt động hoặc tác vụ định kỳ gọi điểm cuối sức khỏe. |
| BT-02 | Nhật ký kiểm toán chỉ lưu trong bộ nhớ. | Ghi thêm ra tệp hoặc hệ thống nhật ký tập trung khi triển khai cho nhiều người dùng. |
| BT-03 | Khi chưa bật Firestore, dữ liệu đóng góp chỉ nằm trong trình duyệt. Khi bật, cần sao lưu Firestore (xuất định kỳ bằng `gcloud firestore export` hoặc bật Point-in-time Recovery). | Mục 5.3 của `20_QUY_TRINH_TRIEN_KHAI.md`. |
