# Mục Lục Bộ Tài Liệu Thiết Kế

Hệ thống tài liệu thiết kế và đặc tả kỹ thuật cho dự án **Nền tảng Quản lý và Tra cứu Công cụ Trí tuệ Nhân tạo (AI Hub / AI Tools Directory)**. Toàn bộ các tài liệu được đánh số thứ tự hai chữ số và mô tả chi tiết bằng tiếng Việt theo quy trình VibeCode chuẩn.

---

## I. Tổng Quan Và Phạm Vi
- [01. Tổng quan dự án](01_TONG_QUAN_DU_AN.md): Bối cảnh hình thành, mục tiêu sản phẩm, đối tượng người dùng và giá trị cốt lõi.
- [02. Phạm vi phát triển](02_PHAM_VI_DU_AN.md): Phân định phạm vi thực hiện (In-Scope) và phạm vi chưa thực hiện (Out-of-Scope).

## II. Phân Tích Nghiệp Vụ
- [03. Yêu cầu nghiệp vụ](03_YEU_CAU_NGHIEP_VU.md): Đặc tả chi tiết các luồng nghiệp vụ quản lý, tìm kiếm và đóng góp công cụ.
- [04. Quy tắc nghiệp vụ](04_QUY_TAC_NGHIEP_VU.md): Các điều kiện, ràng buộc về dữ liệu nguồn, ngôn ngữ và trạng thái kiểm duyệt.
- [05. Vai trò người dùng](05_VAI_TRO_NGUOI_DUNG.md): Phân quyền người dùng khách, thành viên đóng góp và quản trị viên hệ thống.
- [06. Luồng nghiệp vụ](06_LUONG_NGHIEP_VU.md): Sơ đồ quy trình tra cứu, sao chép cấu hình, đóng góp và duyệt công cụ.

## III. Đặc Tả Kỹ Thuật Và Yêu Cầu
- [07. Yêu cầu chức năng](07_YEU_CAU_CHUC_NANG.md): Đặc tả chức năng chi tiết cho từng phân hệ màn hình.
- [08. Tiêu chí nghiệm thu](08_TIEU_CHI_NGHIEM_THU.md): Tiêu chuẩn và điều kiện nghiệm thu cho từng tính năng.

## IV. Thiết Kế Kiến Trúc Và Hệ Thống
- [09. Kiến trúc hệ thống](09_KIEN_TRUC_HE_THONG.md): Thiết kế kiến trúc tổng thể, mô hình phân tầng và phương án triển khai.
- [10. Công nghệ sử dụng](10_CONG_NGHE_SU_DUNG.md): Danh mục công nghệ, ngôn ngữ lập trình, khung phát triển và thư viện.

## V. Thiết Kế Giao Diện
- [11. Đặc tả giao diện](11_DAC_TA_GIAO_DIEN.md): Danh sách màn hình, bố cục trực quan và luồng điều hướng người dùng.
- [12. Quy chuẩn thiết kế](12_QUY_CHUAN_THIET_KE.md): Hệ thống màu sắc, kiểu chữ và các thành phần giao diện dùng chung.

## VI. Thiết Kế Dữ Liệu Và Giao Diện Lập Trình Ứng Dụng (API)
- [13. Cơ sở dữ liệu](13_CO_SO_DU_LIEU.md): Cấu trúc bảng dữ liệu, trường thông tin và ràng buộc toàn vẹn.
- [14. Đặc tả API](14_DAC_TA_API.md): Danh sách các điểm cuối (Endpoints), tham số gửi đi và định dạng phản hồi.

## VII. Kiểm Thử Và An Toàn Bảo Mật
- [15. Quy tắc phát triển AI](15_QUY_TAC_PHAT_TRIEN_AI.md): Quy tắc phát triển và kỷ luật kỹ thuật dành cho trí tuệ nhân tạo.
- [16. Chỉ dẫn hệ thống AI](16_CHI_DAN_HE_THONG_AI.md): Ngữ cảnh hệ thống và hướng dẫn thực thi cho trí tuệ nhân tạo.
- [17. Kế hoạch kiểm thử](17_KE_HOACH_KIEM_THU.md): Chiến lược và các giai đoạn kiểm thử hệ thống.
- [18. Kịch bản kiểm thử](18_KICH_BAN_KIEM_THU.md): Danh sách các trường hợp kiểm thử chi tiết.
- [19. An toàn bảo mật](19_AN_TOAN_BAO_MAT.md): Cơ chế xác thực, phân quyền và bảo vệ dữ liệu.

## VIII. Vận Hành Và Quản Lý Dự Án
- [20. Lịch sử thay đổi](20_LICH_SU_THAY_DOI.md): Nhật ký các phiên bản và thay đổi mã nguồn.
- [21. Nhật ký dự án](21_NHAT_KY_DU_AN.md): Nhật ký hoạt động chi tiết theo từng ngày làm việc.
- [22. Danh mục kiểm tra](22_DANH_MUC_KIEM_TRA.md): Bảng theo dõi tiến độ công việc và trạng thái nghiệm thu.
- [Hướng dẫn cài đặt & sử dụng MCP Server & API Gateway](HUONG_DAN_CAI_DAT_VA_SU_DUNG_MCP_API.md): Cẩm nang chi tiết thiết lập Stdio MCP Server cho Claude Desktop/Cursor và Cổng REST API có xác thực Bearer token.
