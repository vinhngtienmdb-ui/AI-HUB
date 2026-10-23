# 16. Chỉ Dẫn Hệ Thống Dành Cho Trí Tuệ Nhân Tạo

---

## 1. Ngữ Cảnh Dự Án (Project Context)
Dự án là ứng dụng Web quản lý và tra cứu các công cụ trí tuệ nhân tạo, máy chủ MCP và kỹ năng tác tử. Dự án giải quyết rào cản thông tin phân mảnh và thiếu tài liệu tiếng Việt tại thị trường Việt Nam.

---

## 2. Cấu Trúc Thư Mục Dự Án Định Hướng

```
quan-ly-cong-cu-ai/
├── index.md                      # Mục lục bộ tài liệu thiết kế (Cốt lõi)
├── 01_TONG_QUAN_DU_AN.md         # Giai đoạn 01: Ý tưởng dự án
├── 02_PHAM_VI_DU_AN.md           # Giai đoạn 02: Phạm vi phát triển
├── 03_YEU_CAU_NGHIEP_VU.md       # Giai đoạn 03: Yêu cầu nghiệp vụ
├── 04_QUY_TAC_NGHIEP_VU.md       # Giai đoạn 03: Quy tắc nghiệp vụ
├── 05_VAI_TRO_NGUOI_DUNG.md      # Giai đoạn 03: Vai trò người dùng
├── 06_LUONG_NGHIEP_VU.md         # Giai đoạn 03: Luồng nghiệp vụ
├── 07_YEU_CAU_CHUC_NANG.md       # Giai đoạn 04: Yêu cầu chức năng
├── 08_TIEU_CHI_NGHIEM_THU.md     # Giai đoạn 04: Tiêu chí nghiệm thu
├── 09_KIEN_TRUC_HE_THONG.md      # Giai đoạn 05: Kiến trúc hệ thống
├── 10_CONG_NGHE_SU_DUNG.md       # Giai đoạn 05: Công nghệ sử dụng
├── 11_DAC_TA_GIAO_DIEN.md        # Giai đoạn 06: Đặc tả giao diện
├── 12_QUY_CHUAN_THIET_KE.md      # Giai đoạn 06: Quy chuẩn thiết kế
├── 13_CO_SO_DU_LIEU.md           # Giai đoạn 07: Cơ sở dữ liệu
├── 14_DAC_TA_API.md              # Giai đoạn 07: Đặc tả API
├── 15_QUY_TAC_PHAT_TRIEN_AI.md   # Giai đoạn 08: Quy tắc phát triển AI
├── 16_CHI_DAN_HE_THONG_AI.md     # Giai đoạn 08: Chỉ dẫn hệ thống AI
├── 17_KE_HOACH_KIEM_THU.md       # Giai đoạn 10: Kế hoạch kiểm thử
├── 18_KICH_BAN_KIEM_THU.md       # Giai đoạn 10: Kịch bản kiểm thử
├── 19_AN_TOAN_BAO_MAT.md         # Giai đoạn 11: An toàn bảo mật
├── 20_QUY_TRINH_TRIEN_KHAI.md    # Giai đoạn 12: Quy trình triển khai
├── 21_KE_HOACH_BAO_TRI.md        # Giai đoạn 13: Kế hoạch bảo trì
├── 22_LICH_SU_THAY_DOI.md        # Giai đoạn 12: Lịch sử thay đổi
├── 23_NHAT_KY_DU_AN.md           # Tệp quản lý nhật ký theo ngày
├── 24_DANH_MUC_KIEM_TRA.md       # Tệp quản lý tiến độ kiểm tra
├── .github/workflows/ci.yml      # Kiểm tra liên tục (CI)
├── server/                       # Cầu nối thực thi lệnh cục bộ (gắn vào máy chủ phát triển Vite)
├── mcp-gateway/                  # Máy chủ MCP (stdio) và cổng REST API
├── scripts/                      # Kịch bản xử lý dữ liệu
├── src/                          # Mã nguồn giao diện React + Vite
│   ├── components/               # Các thành phần giao diện tái sử dụng
│   ├── pages/                    # Các trang màn hình
│   ├── lib/                      # Các hàm tiện ích, định tuyến ý định, Firebase
│   ├── data/                     # Kho dữ liệu công cụ (allTools.json)
│   └── types/                    # Định nghĩa kiểu dữ liệu TypeScript
└── tests/                        # Các tệp kịch bản kiểm thử tự động (node --test)
```

---

## 3. Quy Trình Làm Việc Chuẩn Cho Từng Nhiệm Vụ (Task Workflow)

Khi nhận bất kỳ nhiệm vụ lập trình nào, trí tuệ nhân tạo phải thực thi nghiêm túc theo 7 bước:
1. **Đọc tài liệu đặc tả**: Tra cứu các tệp `03`, `04`, `07`, `08`, `13`, `14` để nắm chắc yêu cầu và ràng buộc.
2. **Xác nhận phạm vi**: Đảm bảo không làm vượt quá nội dung nhiệm vụ được giao.
3. **Thiết kế giải pháp**: Xác định rõ các thành phần cần viết mới hoặc sửa đổi.
4. **Viết mã nguồn**: Triển khai mã nguồn sạch, an toàn kiểu dữ liệu, bắt lỗi đầy đủ.
5. **Kiểm thử xác minh**: Chạy thử nghiệm và xác nhận mọi tiêu chí nghiệm thu đều đạt 100%.
6. **Cập nhật danh mục kiểm tra**: Đánh dấu hoàn thành trong tệp `24_DANH_MUC_KIEM_TRA.md`.
7. **Ghi nhật ký hoạt động**: Cập nhật tóm tắt công việc vào tệp `23_NHAT_KY_DU_AN.md`.
