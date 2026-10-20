# 15. Quy Tắc Phát Triển Dành Cho Trí Tuệ Nhân Tạo

---

## 1. Mục Đích
Tài liệu này xác định các nguyên tắc, kỷ luật kỹ thuật và giới hạn hành vi bắt buộc mà mọi tác tử trí tuệ nhân tạo (AI Agent) phải tuân thủ nghiêm ngặt trong suốt quá trình viết mã nguồn và bảo trì dự án này.

---

## 2. Kỷ Luật Viết Mã Nguồn (Code Standards)

1. **Ngôn ngữ và Bình luận mã nguồn**:
   - Tên biến, hàm, lớp và kiểu dữ liệu tuân theo chuẩn tiếng Anh quốc tế (ví dụ: `ToolCard`, `formatConfigJson`).
   - Toàn bộ lời giải thích, ghi chú nội bộ (Comments) và chuỗi văn bản giao diện người dùng bắt buộc phải bằng **tiếng Việt có dấu chuẩn hóa**, rõ nghĩa và không viết tắt.
2. **Kiểm soát kiểu dữ liệu tĩnh (Type-Safety)**:
   - Nghiêm cấm sử dụng kiểu dữ liệu `any`. Mọi thực thể, tham số hàm và phản hồi API đều phải được định nghĩa kiểu cụ thể bằng giao diện (`interface`) hoặc kiểu (`type`) trong TypeScript.
3. **Xử lý lỗi toàn diện**:
   - Không được bỏ trống các khối bắt lỗi (`catch (err) {}`).
   - Mọi lỗi phải được ghi nhận (Log) rõ ràng và trả về thông điệp tiếng Việt thân thiện cho người dùng cuối.

---

## 3. Quy Tắc Bắt Buộc Về Dữ Liệu Nghiệp Vụ

1. **Tuân thủ quy tắc 4 khối thông tin**:
   - Khi tạo mã nguồn giao diện, API hoặc bộ dữ liệu mẫu (Seed Data), tuyệt đối không để xảy ra trường hợp công cụ thiếu 1 trong 4 khối:
     - Nguồn dẫn liên kết chính thức (`source_url`).
     - Mô tả công dụng bằng tiếng Việt (`purpose_vi`).
     - Hướng dẫn cài đặt bằng tiếng Việt (`install_guide_vi`).
     - Hướng dẫn sử dụng bằng tiếng Việt (`usage_guide_vi`).
2. **Bảo toàn chức năng sao chép một chạm**:
   - Khi chỉnh sửa thành phần hiển thị mã cấu hình, phải bảo đảm logic sao chép Clipboard hoạt động an toàn, có bẫy lỗi khi trình duyệt không hỗ trợ quyền ghi Clipboard.

---

## 4. Kỷ Luật Thay Đổi Và Phòng Tránh Phá Vỡ (Safety Guardrails)

1. **Không tự ý suy đoán**:
   - Nếu gặp tình huống nghiệp vụ chưa rõ hoặc có điểm mâu thuẫn trong tài liệu, trí tuệ nhân tạo phải dừng lại, báo cáo vấn đề và xin ý kiến con người.
2. **Không xóa chức năng hoặc tệp tin**:
   - Tuyệt đối không xóa bất kỳ tệp tài liệu từ `01` đến `22` hoặc các thành phần đã xây dựng nếu không có yêu cầu bằng văn bản rõ ràng từ người dùng.
3. **Cập nhật tài liệu song hành**:
   - Mỗi khi triển khai thêm một tính năng hoặc điều chỉnh lược đồ dữ liệu, bắt buộc phải cập nhật đồng bộ các tệp tài liệu liên quan (`13_CO_SO_DU_LIEU.md`, `14_DAC_TA_API.md`, `21_NHAT_KY_DU_AN.md`, `22_DANH_MUC_KIEM_TRA.md`).
