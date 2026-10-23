# AI Hub - Nền Tảng Quản Lý Công Cụ AI, Máy Chủ MCP & Kỹ Năng Tác Tử Chuẩn Hóa

[![Giấy Phép](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Phiên Bản](https://img.shields.io/badge/Phiên_Bản-2.0.52-emerald.svg)](22_LICH_SU_THAY_DOI.md)
[![Quy Trình VibeCode](https://img.shields.io/badge/Quy_Trình-VibeCode_13_Giai_Đoạn-purple.svg)](index.md)
[![Tổng Số Công Cụ](https://img.shields.io/badge/Kho_Dữ_Liệu-1.936_Mục-orange.svg)](#)
[![Khung Làm Việc Mở Rộng](https://img.shields.io/badge/Khung_Làm_Việc-Mở_Rộng_Toàn_Màn_Hình-blueviolet.svg)](#)
[![Giao Diện Linh Hoạt](https://img.shields.io/badge/Giao_Diện-Left_Sidebar_Thu_Gọn-blue.svg)](#)

Hệ thống quản lý, tra cứu và thực thi trực tiếp các công cụ Trí tuệ Nhân tạo (AI Tools), Máy chủ Giao thức Ngữ cảnh Mô hình (MCP Servers), Quy trình tự động hóa (Workflows), Kỹ năng tác tử (Agent Skills), Tác tử chuyên sâu (Agents), Lệnh phím tắt (Commands), Móc nối vòng đời (Hooks), Cấu hình tối ưu (Settings) và Bản mẫu dự án (Templates).

Dự án được xây dựng tuân thủ nghiêm ngặt **Quy trình VibeCode Chuẩn 13 Giai Đoạn** với 100% tài liệu và nội dung bản địa hóa tiếng Việt.

---

## 🌟 Tính Năng Nổi Bật

1. **Kho Dữ Liệu Đã Kiểm Định (1.936 Công Cụ Đang Hiển Thị & 1.960 Cấu Hình)**:
   - Tổng hợp từ các nguồn `davila7/claude-code-templates`, `mcpmarket.com`, `awesome-mcp-servers`, GitHub và các dự án Việt Nam.
   - Mọi công cụ đang hiển thị có liên kết nguồn đã kiểm tra tồn tại và câu lệnh cài đặt không dùng gói npm không tồn tại (`npm run data:validate`). 286 bản ghi không xác minh được hoặc trùng lặp được ẩn kèm lý do (trạng thái `rejected`).
   - Phân loại theo nhóm thành phần (số liệu ngày 2026-10-23):
     - **Kỹ năng tác tử (Skills)**: 862 mục.
     - **Tác tử chuyên sâu (Agents)**: 437 mục.
     - **Lệnh phím tắt (Commands)**: 272 mục.
     - **Máy chủ MCP (MCP Servers)**: 156 mục.
     - **Cấu hình môi trường (Settings)**: 70 mục.
     - **Móc nối tự động (Hooks)**: 61 mục.
     - **API, SDK, phần mềm, mô hình, bản mẫu, quy trình và loại khác**: 78 mục.

2. **Mở Rộng Khung Làm Việc (Workspace Expansion)**:
   - **Chế độ Mở rộng Toàn Màn hình (Full-width Fluid Canvas 100%)**: Chuyển đổi linh hoạt giữa giao diện căn giữa tiêu chuẩn và không gian làm việc rộng mở cực đại.
   - **Thanh bên trái có thể Thu gọn / Mở rộng (Collapsible Left Sidebar)**: Cho phép ẩn thanh điều hướng để giải phóng trọn vẹn màn hình, mở rộng lưới thẻ từ 3 cột lên 4 hoặc 5 cột.
   - **Chế độ hiển thị kép (Dual View Modes)**:
     - *Chế độ Lưới Thẻ (Grid View)*: Trực quan, hiển thị ảnh banner thật hoặc dải tiêu đề đồ họa công nghệ.
     - *Chế độ Bảng danh sách chi tiết (Table / List View)*: Giúp duyệt nhanh hàng ngàn công cụ với đầy đủ thông tin: Biểu tượng, Tên, Loại hình, Lĩnh vực, Số sao đánh giá, Tác giả, Tóm tắt công dụng tiếng Việt và nút Thao tác một chạm.

3. **Chuẩn Hóa Ảnh Demo Theo Repo Thực Tế Kèm Ghi Chú Rõ Ràng**:
   - **Tuân thủ nghiêm ngặt nguyên tắc repo gốc**: Nếu repo không có ảnh demo đính kèm thì để trống hoàn toàn, không tự tạo thêm ảnh giả hay ảnh placeholder.
   - **Chèn tất cả ảnh demo có trong repo**: Đối với các repo có ảnh giao diện, ảnh động demo GIF hoặc sơ đồ kiến trúc, hiển thị toàn bộ trong thư viện ảnh của modal chi tiết kèm **ghi chú rõ ràng (caption)** cho từng ảnh.

4. **Hướng Dẫn Cài Đặt & Sử Dụng Siêu Chi Tiết (100% Công Cụ)**:
   - Hướng dẫn cài đặt chuẩn hóa 4 bước chi tiết: Bước 1 (Chuẩn bị môi trường & phụ thuộc) -> Bước 2 (Cài đặt CLI) -> Bước 3 (Cấu hình JSON & giải thích biến môi trường) -> Bước 4 (Khởi động & kiểm tra).
   - Kịch bản sử dụng thực tế (Context & Scenario) kèm câu lệnh prompt mẫu và kết quả dự kiến trả về chuẩn mực.

3. **Quy Chuẩn Bắt Buộc 4 Khối Thông Tin**:
   - **Nguồn dẫn chính thức**: Mọi công cụ đều liên kết trực tiếp đến kho lưu trữ GitHub hoặc trang nhà phát triển chính chủ.
   - **Công dụng tiếng Việt**: Mô tả chi tiết tính năng và bài toán giải quyết.
   - **Hướng dẫn cài đặt**: Hướng dẫn từng bước cấu hình môi trường.
   - **Hướng dẫn sử dụng**: Kịch bản và các câu lệnh mẫu thực tế bằng tiếng Việt.

3. **Cấu Hình Một Chạm & Xuất Nhanh**:
   - Hỗ trợ xuất cấu hình chuẩn JSON cho: **Claude Desktop**, **Google Antigravity**, **Cursor AI**, **Windsurf**.
   - Sao chép nhanh đoạn cấu hình hoặc câu lệnh cài đặt CLI chỉ với một nút bấm.

4. **Hệ Sinh Thái Dành Riêng Cho Thị Trường Việt Nam (`🇻🇳 Thị Trường Việt Nam`)**:
   - **Cổng thanh toán & Ngân hàng**: PayOS VietQR, MoMo Payment, VNPay Gateway, Vietcombank Open Banking.
   - **Giao vận & Logistics**: ViettelPost, Giao Hàng Nhanh (GHN), Giao Hàng Tiết Kiệm (GHTK), Ahamove.
   - **Bán hàng đa kênh**: KiotViet POS, Sapo Omnichannel.
   - **Trí tuệ nhân tạo & Giọng nói**: VinAI PhoBERT, Viettel AI Open Platform, FPT.AI Voice & eKYC.
   - **Dịch vụ công & Pháp luật**: Tra cứu mã số thuế (masothue.com), Cổng Đăng ký doanh nghiệp quốc gia, vbpl.vn, Dịch vụ công quốc gia, Hóa đơn điện tử XML.
   - **Đời sống & Tiện ích**: Giá xăng dầu Petrolimex, Lịch Vạn Niên & Âm Lịch, Chất lượng không khí AQI & Thời tiết, Bản đồ hành chính 63 tỉnh thành.

5. **Thiết Bị Đầu Cuối Cục Bộ (Interactive Local Terminal)**:
   - Cho phép **chạy lệnh dòng lệnh (CLI) từ giao diện trang web** lên máy tính qua cầu nối cục bộ (`server/commandBridge.js`), chỉ khi chạy `npm run dev`.
   - Chỉ chấp nhận yêu cầu từ chính trang AI Hub trên máy cục bộ (kiểm tra Host, Origin và mã phiên), chặn trang web khác gọi vào.
   - Mỗi lần chạy một lệnh đơn, không qua shell. Chương trình được phép: `npx`, `npm`, `claude`, `agy`, `git` (giới hạn lệnh con), `uv`, `uvx`, `node -v`, `python --version`, `echo`, `dir`, `ls`, `where`. Chi tiết tại `19_AN_TOAN_BAO_MAT.md`.
   - Cơ chế truyền luồng dữ liệu thời gian thực (Server-Sent Events) hiển thị kết quả trực quan.

---

## 🛠️ Công Nghệ Sử Dụng

- **Giao diện người dùng (Frontend)**: React 19, TypeScript, Vite, Tailwind CSS, Lucide Icons.
- **Cầu nối cục bộ (Backend Bridge)**: Node.js, `child_process.spawn` với cơ chế bảo vệ danh sách trắng an toàn, Server-Sent Events (SSE).
- **Kiểm thử tự động**: Node.js Test Runner (`node:test`, `node:assert`).
- **Quy chuẩn kiến trúc**: Tuân thủ bộ quy tắc VibeCode với 24 tệp tài liệu đặc tả 13 giai đoạn.

---

## 🚀 Hướng Dẫn Cài Đặt & Khởi Chạy

### Điều kiện tiên quyết
- Node.js phiên bản 18 trở lên (Khuyến nghị Node.js v20+).
- Trình quản lý gói `npm` hoặc `pnpm`.

### Các bước thực hiện
```bash
# 1. Sao chép kho lưu trữ
git clone https://github.com/vinhngtienmdb-ui/AI-HUB.git
cd AI-HUB

# 2. Cài đặt các gói phụ thuộc
npm install

# 3. Khởi chạy máy chủ phát triển cục bộ
npm run dev

# 4. Mở trình duyệt và truy cập
# http://localhost:3000/
```

### Chạy kiểm thử tự động
```bash
# Chạy toàn bộ kiểm thử (dữ liệu khóa API được ghi vào thư mục tạm, không ảnh hưởng kho mã)
npm test
```

### Kiểm định chất lượng kho dữ liệu
```bash
# Kiểm tra ngoại tuyến: trùng lặp, đường dẫn cục bộ, hướng dẫn dạng mẫu
npm run data:validate
# Kiểm tra trực tuyến (repo GitHub, gói npm, liên kết nguồn) và ghi nhãn verification vào dữ liệu
npm run data:validate -- --online --write
# Lấy thêm số sao thật từ GitHub (giao diện chỉ hiển thị số sao đã xác minh)
GITHUB_TOKEN=<token> npm run data:validate -- --online --write
```

### Đóng gói bản phát hành
```bash
npm run build
```

---

## 📚 Bộ Tài Liệu Thiết Kế VibeCode (24 Tệp Chuẩn Hóa)

Xem chi tiết mục lục tại [index.md](index.md):

- `01_TONG_QUAN_DU_AN.md`: Tổng quan dự án và tầm nhìn.
- `02_PHAM_VI_DU_AN.md`: Xác định phạm vi trong và phạm vi ngoài.
- `03_YEU_CAU_NGHIEP_VU.md`: Phân tích nghiệp vụ cốt lõi.
- `04_QUY_TAC_NGHIEP_VU.md`: Các quy tắc dữ liệu bắt buộc (QT-01 -> QT-04).
- `05_VAI_TRO_NGUOI_DUNG.md`: Xác định vai trò Khách, Thành viên, Quản trị viên.
- `06_LUONG_NGHIEP_VU.md`: Mô hình hóa luồng tra cứu, khai thác và đóng góp.
- `07_YEU_CAU_CHUC_NANG.md`: Đặc tả chi tiết các phân hệ chức năng CN-01 -> CN-09.
- `08_TIEU_CHI_NGHIEM_THU.md`: Bộ tiêu chí nghiệm thu kỹ thuật.
- `09_KIEN_TRUC_HE_THONG.md`: Thiết kế kiến trúc tổng thể.
- `10_CONG_NGHE_SU_DUNG.md`: Danh mục công nghệ lựa chọn.
- `11_DAC_TA_GIAO_DIEN.md`: Bố cục màn hình và thành phần giao diện.
- `12_QUY_CHUAN_THIET_KE.md`: Quy chuẩn màu sắc, phông chữ và thiết kế đáp ứng.
- `13_CO_SO_DU_LIEU.md`: Thiết kế mô hình dữ liệu.
- `14_DAC_TA_API.md`: Đặc tả chi tiết các điểm cuối API và mã lỗi.
- `15_QUY_TAC_PHAT_TRIEN_AI.md`: Quy tắc phát triển cho trí tuệ nhân tạo.
- `16_CHI_DAN_HE_THONG_AI.md`: Chỉ dẫn hệ thống ngữ cảnh dự án.
- `17_KE_HOACH_KIEM_THU.md`: Kế hoạch kiểm thử chất lượng.
- `18_KICH_BAN_KIEM_THU.md`: Kịch bản kiểm thử chi tiết.
- `19_AN_TOAN_BAO_MAT.md`: Chính sách an toàn và bảo mật thực thi lệnh.
- `20_QUY_TRINH_TRIEN_KHAI.md`: Quy trình đóng gói, cấu hình môi trường, CI và phương án quay lui.
- `21_KE_HOACH_BAO_TRI.md`: Kế hoạch giám sát, sao lưu, xử lý sự cố và bảo trì định kỳ.
- `22_LICH_SU_THAY_DOI.md`: Lịch sử các phiên bản phát hành.
- `23_NHAT_KY_DU_AN.md`: Nhật ký phát triển theo từng ngày.
- `24_DANH_MUC_KIEM_TRA.md`: Danh mục kiểm tra tiến độ dự án.

---

## 📄 Giấy Phép
Dự án được phát hành theo giấy phép [MIT License](LICENSE).
