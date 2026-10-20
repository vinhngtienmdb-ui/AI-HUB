# 20. Lịch Sử Thay Đổi: Hệ Thống Quản Lý Và Tra Cứu Công Cụ Trí Tuệ Nhân Tạo

---

## 1. Nhật Ký Phiên Bản

### Phiên Bản 2.0.5-MoRongTaiNguyenThanhToanVaDoanhNghiepDot4 (Ngày 20-10-2026)
- **Loại hình**: Tiếp tục mở rộng đợt 4 các giải pháp thanh toán số, hạ tầng POS bán lẻ, mã bưu chính 34 tỉnh thành, định danh CCCD và chính sách bảo hiểm xã hội Việt Nam.
- **Nội dung hoàn thành**:
  - Tích hợp 10 giải pháp công nghệ nguồn mở hàng đầu:
    1. **VNPay Payment SDK (`lehuygiang28/vnpay`)**: Thư viện client TypeScript/Node.js tích hợp cổng thanh toán VNPay, tạo URL thanh toán, xác thực checksum SHA512 và xử lý IPN server-to-server.
    2. **VietQR Core (`zeforc/viet-qr`)**: Bộ công cụ độc lập sinh chuỗi mã QR thanh toán Napas 247 chuẩn EMVCo, tự động tính mã CRC16-CCITT và kiểm tra số tài khoản hơn 50 ngân hàng Việt Nam.
    3. **KiotViet MCP Server (`HiGo-MCP/kiotviet-mcp-server`)**: Máy chủ MCP kết nối tác nhân AI với hệ thống bán lẻ và kho hàng KiotViet, tự động tra cứu tồn kho theo chi nhánh, tạo đơn hàng và sổ quỹ.
    4. **Sapo Omnichannel SDK (`vinhngtienmdb-ui/AI-HUB`)**: Bộ kết nối API Sapo đồng bộ tồn kho sản phẩm tức thì, quản lý tập trung đơn hàng từ Shopee, Lazada, TikTok Shop và cửa hàng vật lý.
    5. **Mã Bưu Chính Quốc Gia 5 Số Mới 34 Tỉnh Thành (`vinhngtienmdb-ui/AI-HUB`)**: Cơ sở dữ liệu danh bạ mã bưu chính 5 chữ số của Bộ TT&TT áp dụng cho 34 tỉnh thành và các xã/phường sau sáp nhập.
    6. **VNeID CCCD 12 Số Validator (`vinhngtienmdb-ui/AI-HUB`)**: Kỹ năng kiểm tra tính hợp lệ toán học cấu trúc căn cước công dân gắn chip 12 chữ số theo quy định Bộ Công an (mã tỉnh, thế kỷ, giới tính, năm sinh).
    7. **Telegram Banking & Sales Alert Bot (`vinhngtienmdb-ui/AI-HUB`)**: Tác tử AI tự động gửi thông báo biến động số dư chuyển khoản ngân hàng (Vietcombank, MBBank, Techcombank) và doanh thu ca làm việc vào Telegram.
    8. **OnePay Vietnam Payment Gateway (`vinhngtienmdb-ui/AI-HUB`)**: Cổng thanh toán thẻ ghi nợ nội địa Napas, thẻ tín dụng quốc tế Visa/Mastercard/JCB và trả góp 0% liên kết ngân hàng.
    9. **Chữ Ký Số CAdES & XAdES Token USB Validator (`vinhngtienmdb-ui/AI-HUB`)**: Kỹ năng xác thực tính toàn vẹn và hiệu lực của chứng thư số doanh nghiệp trên tệp PDF hợp đồng và XML hóa đơn điện tử.
    10. **BHXH & VssID Benefits Calculator (`vinhngtienmdb-ui/AI-HUB`)**: Kỹ năng tính toán chế độ trợ cấp bảo hiểm xã hội bắt buộc: trợ cấp thai sản 6 tháng, nghỉ ốm đau và bảo hiểm thất nghiệp theo Luật BHXH.
  - **Quy mô hệ sinh thái**:
    - Nâng tổng số lượng công cụ lên **1.974 mục** (trong đó nhóm tài nguyên phục vụ thị trường Việt Nam đạt **86 mục chuyên sâu**).
    - Nâng tổng số lượng mẫu cấu hình JSON thực thi lên **2.969 mẫu**.
    - 100% tài nguyên đáp ứng đầy đủ 4 khối thông tin: Nguồn dẫn chính thức, mục đích, hướng dẫn cài đặt và hướng dẫn sử dụng tiếng Việt kèm mã nguồn mẫu.
  - **Kiểm thử tự động & Đóng gói**:
    - 5/5 bài kiểm thử unit tests đạt 100%.
    - Đóng gói Vite (`npm run build`) hoàn tất xuất sắc trong 11.50 giây.

### Phiên Bản 2.0.4-MoRongChuyenSauDoanhNghiepVietNam (Ngày 20-10-2026)
- **Loại hình**: Tiếp tục mở rộng đợt 3 chuyên sâu cho các lĩnh vực then chốt của doanh nghiệp Việt Nam: Thanh toán trực tuyến, Quy hoạch địa giới 34 tỉnh thành hành chính mới, ERP kế toán VAS, CRM bán hàng, Zalo CSKH, Bóc tách XML Hóa đơn điện tử TT78, Tính thuế TNCN & BHXH và Tra cứu Mã số thuế quốc gia.
- **Nội dung hoàn thành**:
  - Tích hợp 10 giải pháp công nghệ doanh nghiệp và hành chính pháp lý chuẩn mực:
    1. **Quy hoạch Địa giới 34 Tỉnh Thành Hành Chính Mới (`vinhngtienmdb-ui/AI-HUB`)**: Bộ dữ liệu số hóa mô hình 34 đơn vị hành chính cấp tỉnh mới (28 tỉnh, 6 thành phố trực thuộc Trung ương) theo Nghị quyết số 202/2025/QH15 và các Nghị quyết của Ủy ban Thường vụ Quốc hội về sắp xếp sáp nhập xã phường, cung cấp bảng ánh xạ 63 tỉnh cũ sang 34 tỉnh mới.
    2. **ZaloPay Payment SDK (`ZaloPayOfficial/zp-sdk-nodejs`)**: Bộ SDK chính thức tạo đơn hàng thanh toán ZaloPay App-to-App, mã QR ZaloPay động, thẻ ATM/Visa và xác thực callback MAC chữ ký số an toàn.
    3. **MoMo Payment Gateway SDK (`momo-wallet/payment`)**: Thư viện thanh toán ví điện tử MoMo All-In-One chính thức (Quét mã MoMo QR, thanh toán một chạm, Instant Payment Notification IPN Webhook).
    4. **Odoo Vietnam Fiscal Localization (`trobz/l10n-vietnam`)**: Phân hệ kế toán Odoo chuẩn hóa hệ thống tài khoản kế toán theo Thông tư 200/2014/TT-BTC và Thông tư 133/2016/TT-BTC, báo cáo tài chính và kết nối hóa đơn điện tử S-Invoice/VNPT/MISA.
    5. **ERPNext Vietnam Localization (`vinhngtienmdb-ui/AI-HUB`)**: Ứng dụng bản địa hóa nền tảng Frappe/ERPNext: tài khoản kế toán Việt Nam, định dạng tiền tệ VNĐ, đọc số thành chữ và in ấn chứng từ xuất nhập kho.
    6. **Zalo OA & ZNS Customer Care MCP (`vinhngtienmdb-ui/AI-HUB`)**: Máy chủ MCP kết nối API Zalo Official Account và gửi tin nhắn thông báo chăm sóc khách hàng ZNS tự động, tiếp nhận webhook chat CSKH.
    7. **EspoCRM Vietnam Sales B2B (`vinhngtienmdb-ui/AI-HUB`)**: Hệ thống quản lý quan hệ khách hàng (CRM) bản địa hóa tiếng Việt 100%, thiết lập phễu bán hàng B2B, quản lý báo giá và hợp đồng thương mại.
    8. **Trình Phân Tích XML Hóa Đơn Điện Tử Thông Tư 78 (`vinhngtienmdb-ui/AI-HUB`)**: Công cụ bóc tách dữ liệu tệp XML hóa đơn điện tử chuẩn Quyết định 1450/QĐ-TCT, Nghị định 123/2020/NĐ-CP và Thông tư 78/2021/TT-BTC, trích xuất thuế suất GTGT và chữ ký số.
    9. **Công Cụ Tính Thuế TNCN & BHXH Doanh Nghiệp (`vinhngtienmdb-ui/AI-HUB`)**: Kỹ năng tính toán tiền lương Net/Gross, bảo hiểm xã hội bắt buộc theo trần lương cơ sở mới và thuế TNCN biểu lũy tiến 7 bậc.
    10. **API Tra Cứu Mã Số Thuế & Trạng Thái Doanh Nghiệp (`vinhngtienmdb-ui/AI-HUB`)**: Máy chủ MCP tra cứu thông tin pháp lý công ty, mã số thuế, đại diện pháp luật và tình trạng nộp thuế từ Cổng thông tin Quốc gia.
  - **Quy mô hệ thống sau cập nhật**:
    - Nâng tổng số lượng công cụ lên **1.964 mục** (trong đó có **76 mục chuyên sâu cho thị trường Việt Nam**).
    - Nâng tổng số lượng mẫu cấu hình JSON thực thi lên **2.959 mẫu**.
    - 100% tài nguyên đáp ứng đầy đủ 4 khối thông tin: Nguồn dẫn chính thức, mục đích, hướng dẫn cài đặt và hướng dẫn sử dụng tiếng Việt kèm mã nguồn mẫu.
  - **Kiểm thử tự động & Đóng gói**:
    - 5/5 bài kiểm thử unit tests đạt 100%.
    - Đóng gói Vite (`npm run build`) hoàn tất xuất sắc trong 8.65 giây.

### Phiên Bản 2.0.3-MoRongTaiNguyenVietNamDot2 (Ngày 20-10-2026)
- **Loại hình**: Tiếp tục mở rộng đợt 2 các kho lưu trữ mã nguồn, công cụ, kỹ năng và máy chủ MCP phục vụ chuyên biệt cho người dùng và cộng đồng lập trình viên Việt Nam.
- **Nội dung hoàn thành**:
  - Tích hợp 11 công cụ và giải pháp công nghệ bản địa hóa trọng yếu:
    1. **payOS SDK (`payOSHQ/payos-lib-node`)**: Bộ SDK chính thức cho Node.js/TypeScript tạo link thanh toán VietQR Napas247 tự động, quản lý webhook và xác nhận thanh toán trực tuyến tức thì.
    2. **Cốc Cốc Tokenizer (`coccoc/coccoc-tokenizer`)**: Bộ tách từ tiếng Việt hiệu năng cao bằng C++ và Python của đội ngũ kỹ sư Cốc Cốc, xử lý hàng triệu ký tự mỗi giây cho bộ máy tìm kiếm và Elasticsearch.
    3. **Goong Maps SDK (`goong-io/goong-js`)**: Bản đồ số và API tra cứu địa chỉ số nhà, ngõ ngách tiếng Việt chuyên sâu tại 63 tỉnh thành, định tuyến tối ưu lộ trình giao nhận.
    4. **vietTTS (`NTT123/vietTTS`)**: Hệ thống tổng hợp tiếng nói tiếng Việt tự nhiên mã nguồn mở với Duration Model và HiFi-GAN Vocoder cho âm thanh giọng đọc truyền cảm.
    5. **VietAI Diacritic Restoration (`vietai/aivivn-vn-diacritic`)**: Mô hình học sâu Transformer tự động khôi phục dấu tiếng Việt cho các đoạn văn bản gõ không dấu, xử lý tin nhắn SMS và văn bản thô.
    6. **Vietnamese Stopwords (`stopwords/vietnamese-stopwords`)**: Danh mục hơn 2.000 từ dừng tiếng Việt chuẩn phục vụ lọc nhiễu, trích xuất từ khóa và cấu hình tìm kiếm toàn văn.
    7. **DVHCVN (`daohoangson/dvhcvn`)**: Cơ sở dữ liệu đơn vị hành chính Việt Nam phân cấp 3 tầng kèm thư viện Dart/Flutter và dữ liệu tọa độ ranh giới GIS của Đào Hoàng Sơn.
    8. **VNPost EMS Logistics MCP (`vinhngtienmdb-ui/AI-HUB`)**: Máy chủ MCP kết nối API Bưu điện Việt Nam và chuyển phát nhanh quốc tế EMS tra cứu hành trình bưu kiện và cước bưu chính.
    9. **GHN Express SDK MCP (`vinhngtienmdb-ui/AI-HUB`)**: Tích hợp API Giao Hàng Nhanh tạo đơn hàng hỏa tốc, in tem vận đơn barcode và tự động đối soát COD.
    10. **Vietnamese Telecom Validator (`vinhngtienmdb-ui/AI-HUB`)**: Kỹ năng chuẩn hóa định dạng số điện thoại di động Việt Nam (+84) và nhận diện các nhà mạng Viettel, VinaPhone, MobiFone, Vietnamobile, Wintel.
    11. **Vietnamese Law Semantic Search (`vinhngtienmdb-ui/AI-HUB`)**: Tác tử AI tra cứu ngữ nghĩa các quy định pháp luật doanh nghiệp, thuế, lao động Việt Nam theo tình huống thực tế.
  - **Quy mô hệ thống**:
    - Nâng tổng số lượng công cụ lên **1.954 mục**.
    - Nâng tổng số lượng mẫu cấu hình JSON thực thi lên **2.949 mẫu**.
    - 100% tài nguyên đáp ứng đầy đủ 4 khối thông tin: Nguồn dẫn chính thức, mục đích, hướng dẫn cài đặt và hướng dẫn sử dụng tiếng Việt kèm mã nguồn mẫu.
  - **Kiểm thử tự động & Đóng gói**:
    - 5/5 bài kiểm thử unit tests đạt 100%.
    - Đóng gói Vite (`npm run build`) hoàn tất xuất sắc trong 13.85 giây.

### Phiên Bản 2.0.2-MoRongTaiNguyenThiTruongVietNam (Ngày 20-10-2026)
- **Loại hình**: Tiếp tục mở rộng và thu thập dữ liệu chuyên sâu các kho lưu trữ mã nguồn (Repositories), Kỹ năng (Skills), Máy chủ MCP và Giao diện lập trình ứng dụng (APIs) phù hợp với thị trường Việt Nam.
- **Nội dung hoàn thành**:
  - Bổ sung 13 công cụ và tài nguyên AI/NLP/FinTech/Hành chính hàng đầu tại Việt Nam:
    1. **BARTpho (`VinAIResearch/BARTpho`)**: Mô hình Transformer chuỗi-sang-chuỗi (seq2seq) quy mô lớn đầu tiên cho tiếng Việt (BART Large, phiên bản âm tiết và từ ngữ) phục vụ tóm tắt tin tức, dịch máy và chuẩn hóa văn bản.
    2. **PhoWhisper (`VinAIResearch/PhoWhisper`)**: Hệ thống nhận dạng giọng nói tự động ASR tiếng Việt độ chính xác cao tinh chỉnh từ Whisper trên 844 giờ dữ liệu 3 miền Bắc - Trung - Nam.
    3. **pyvi (`trungtv/pyvi`)**: Thư viện tách từ (Word Segmentation) và gán nhãn từ loại (POS Tagging) tiếng Việt bằng mô hình Conditional Random Field (CRF) siêu nhẹ của Trần Việt Trung.
    4. **ViT5 (`vietai/ViT5`)**: Mô hình Text-to-Text Transformer đa tác vụ tiếng Việt của VietAI (T5 base/large) phục vụ sinh tóm tắt văn bản, dịch máy và đọc hiểu hỏi đáp.
    5. **VnCoreNLP (`vncorenlp/VnCoreNLP`)**: Bộ công cụ xử lý ngôn ngữ tự nhiên tiếng Việt chuyên sâu 4 tầng (Tách từ, Gán nhãn từ loại, Nhận dạng thực thể NER, Phân tích cú pháp phụ thuộc) công bố tại NAACL 2018.
    6. **Vistral (`Viet-Mistral/Vistral-7B-Chat`)**: Mô hình ngôn ngữ lớn nguồn mở 7B chuyên biệt cho tiếng Việt phát triển từ kiến trúc Mistral 7B, am hiểu sâu sắc văn hóa, đời sống và pháp luật Việt Nam.
    7. **vnstock (`thinh-vu/vnstock`)**: Hệ sinh thái dữ liệu thị trường tài chính chứng khoán Việt Nam của Thịnh Vũ, trích xuất giá realtime, báo cáo tài chính, chỉ số sàn HOSE, HNX, UPCoM.
    8. **DiaGioiHanhChinhVN (`kenzouno1/DiaGioiHanhChinhVN`)**: Cơ sở dữ liệu và JSON API địa giới hành chính 63 tỉnh/thành phố, toàn bộ quận/huyện và xã/phường chuẩn Tổng cục Thống kê.
    9. **SePay Webhook MCP (`sepayvn/laravel-sepay`)**: Máy chủ MCP tiếp nhận Webhook ngân hàng tự động, khớp lệnh thanh toán VietQR trong 2 giây từ các ngân hàng lớn tại Việt Nam.
    10. **pyvnlunar (`Min9802/pyvnlunar`)**: Thuật toán thiên văn chuyển đổi Âm lịch Việt Nam chuẩn xác của Tiến sĩ Hồ Ngọc Đức, tra cứu can chi, ngày hoàng đạo và 24 tiết khí.
    11. **Vietnamese Tone Normalizer & Spell Checker (`vunb/vietnamese-tone-normalizer`)**: Kỹ năng tác tử chuẩn hóa vị trí dấu thanh theo chuẩn mới của Bộ Giáo dục và tự động phát hiện, sửa lỗi chính tả tiếng Việt.
    12. **BKAI Foundation Models (`bkai-foundation-models`)**: Tập hợp các mô hình nền tảng AI tiếng Việt chuyên sâu (hỏi đáp đọc hiểu QA, Bi-Encoder) của Phòng Thí Nghiệm Trí Tuệ Nhân Tạo Đại Học Bách Khoa Hà Nội.
    13. **VIVOS Speech Corpus (`aivivn/vivos`)**: Bộ ngữ liệu và bản mẫu huấn luyện nhận dạng giọng nói tiếng Việt nguồn mở 15 giờ ghi âm chuẩn của nhóm AIVIVN.
  - **Đảm bảo tính toàn vẹn dữ liệu**:
    - Nâng tổng số lượng công cụ trong kho dữ liệu lên **1.943 mục**.
    - Nâng tổng số mẫu cấu hình JSON thực thi lên **2.938 mẫu**.
    - 100% tài nguyên có đầy đủ 4 khối thông tin bắt buộc: Nguồn dẫn chính thức, công dụng/mục đích, hướng dẫn cài đặt từng bước và hướng dẫn sử dụng có mã nguồn minh họa bằng tiếng Việt.
    - Tuân thủ nguyên tắc hình ảnh: Không có ảnh demo từ repo thì để trống (`demoImages: []`, `imageUrl: ""`), giao diện tự động ẩn khối ảnh để hiển thị đẹp mắt, không sinh ảnh giả.
  - **Kiểm thử tự động & Đóng gói**:
    - Vượt qua 100% 5/5 bài kiểm thử unit tests tự động.
    - Đóng gói Vite (`npm run build`) hoàn tất xuất sắc trong 7.14 giây.

### Phiên Bản 2.0.1-ToiUuHienThiAnhDemoVaLoaiBoKhungAnhTrong (Ngày 20-10-2026)
- **Loại hình**: Tối ưu hóa hiển thị giao diện hình ảnh theo yêu cầu: Loại bỏ hoàn toàn khối hiển thị ảnh khi công cụ không có ảnh demo thật, tuyệt đối không hiển thị khung ảnh trống hoặc dải khoảng trắng banner.
- **Nội dung hoàn thành**:
  - **1. Thẻ tài nguyên (`src/components/ToolCard.tsx`)**:
    - Kiểm tra nghiêm ngặt tính hợp lệ của đường dẫn ảnh demo (`validImageUrl`).
    - Nếu repo KHÔNG CÓ ảnh demo hoặc ảnh rỗng/lỗi tải: Loại bỏ hoàn toàn khối hình ảnh phía trên (trả về `null`), không hiển thị bất kỳ dải gradient hay khung placeholder nào.
    - Tự động chuyển hàng nhãn phân loại (`tool.typeNameVi`) và đánh giá sao (`tool.stars`) xuống dòng đầu của phần thân thẻ, giúp bố cục thẻ tài nguyên luôn cân đối, gọn gàng và thẩm mỹ.
    - Tích hợp bắt sự kiện lỗi tải ảnh (`onError`), tự động ẩn khối ảnh nếu đường dẫn ảnh từ kho lưu trữ bên thứ ba bị đứt gãy.
  - **2. Trang chi tiết tài nguyên (`src/pages/DetailPage.tsx`)**:
    - Lọc toàn diện danh sách ảnh demo hợp lệ (`validDemoImages`). Nếu không có ảnh hoặc ảnh tải thất bại (`imageLoadFailed`), ẩn hoàn toàn khối ảnh (trả về `null`), không để lại khung viền đen hay ô trống.
    - Tích hợp tính năng chuyển đổi xem đa ảnh qua thumbnail khi kho lưu trữ cung cấp nhiều ảnh demo thực tế.
  - **3. Cửa sổ chi tiết nhanh (`src/components/ToolDetailModal.tsx`)**:
    - Đồng bộ cơ chế lọc ảnh tương tự, loại bỏ hoàn toàn khung hiển thị khi công cụ không có ảnh demo.
  - **4. Kiểm thử và xác minh**:
    - Toàn bộ 5/5 bài kiểm thử tự động đạt 100%.
    - Đóng gói bản phát hành sản phẩm (`npm run build`) thành công trong 10.84 giây.

### Phiên Bản 2.0.0-BoGiaoDienChiTietAIHubVN (Ngày 20-10-2026)
- **Loại hình**: Thiết kế và phát triển toàn diện Bộ giao diện chi tiết AI HUB VN (Trang Danh mục, Trang Chi tiết, Trang Đóng góp, Trang Bộ sưu tập, Trang Hướng dẫn, Trang Tài khoản) theo đúng ảnh demo chuẩn mực.
- **Nội dung hoàn thành**:
  - **4.1. Trang danh mục tài nguyên (`src/pages/CategoryPage.tsx`)**:
    - Breadcrumb phân cấp (`Trang chủ > Công cụ AI / MCP Servers / Agent Skills`).
    - Thanh tìm kiếm theo danh mục với các tag lọc nhanh: `Phổ biến`, `Mới nhất`, `Đánh giá cao`, `Miễn phí`, `Trả phí`.
    - Bố cục 2 cột: Cột trái (Bộ lọc Lĩnh vực, Mô hình giá, Đánh giá sao, Ngôn ngữ) và Cột phải (Danh sách thẻ tài nguyên 2 cột, sắp xếp, phân trang và nút Lưu yêu thích).
  - **4.2. Trang chi tiết tài nguyên (`src/pages/DetailPage.tsx`)**:
    - Header lớn: Logo nhận diện, Tên, Badge Phổ biến, Đánh giá ⭐ 4.8 (12.5k đánh giá), 12.5k lượt dùng.
    - Cột thông tin nhanh: Nhà phát triển, Kho lưu trữ, Ngôn ngữ hỗ trợ, Nền tảng tương thích.
    - Cụm nút hành động: `Truy cập nguồn chính thức ↗`, `Lưu vào bộ sưu tập`, `▶ Chạy lệnh trên máy`.
    - Nội dung: Giới thiệu, Tính năng nổi bật (Grid icon), Hai khối so sánh Ưu điểm (xanh lá) & Nhược điểm (đỏ/hồng), Bảng thông tin giá (Pricing Table), Các lựa chọn thay thế cùng lĩnh vực (Alternatives), Kịch bản sử dụng (Prompt) và Cấu hình mẫu JSON.
  - **4.3. Trang đóng góp tài nguyên (`src/pages/ContributePage.tsx`)**:
    - Biểu mẫu 3 phần: Thông tin cơ bản, Mô tả (ngắn và chi tiết), Thông tin bổ sung (tác giả, ngôn ngữ, nền tảng).
    - Khung Lưu ý kiểm duyệt và nút gửi màu tím nổi bật.
  - **4.4. Trang bộ sưu tập tài nguyên (`src/pages/CollectionsPage.tsx`)**:
    - Quản lý danh sách bộ sưu tập (Top công cụ lập trình, Hệ sinh thái AI Việt Nam, Tự động hóa).
    - Tạo bộ sưu tập mới (form tạo nhanh), xem danh sách tài nguyên trong bộ sưu tập.
  - **4.5. Trang thư viện hướng dẫn (`src/pages/GuidesPage.tsx`)**:
    - 4 bài viết hướng dẫn chuyên sâu: Cách chọn công cụ AI, Cài đặt MCP Servers trên Claude Desktop & Cursor, Tối ưu Agent Skills, An toàn bảo mật thông tin khi dùng AI.
    - Cửa sổ đọc chi tiết bài viết với định dạng markdown rõ ràng.
  - **4.6. Trang hồ sơ tài khoản & lưu yêu thích (`src/pages/AccountPage.tsx`)**:
    - Hồ sơ cá nhân, Tab Tài nguyên đã lưu (lưu trữ đồng bộ qua `localStorage`), Tab Bộ sưu tập người dùng và nút Đăng xuất.
  - **Hệ thống điều hướng đa trang (Multi-page Hash Router)**:
    - Chuyển trang liền mạch và đồng bộ URL Hash (`#/`, `#/category/agent`, `#/category/mcp`, `#/category/skill`, `#/tool/:id`, `#/contribute`, `#/collections`, `#/guides`, `#/account`).
    - Hỗ trợ nút Back/Forward của trình duyệt mà không tải lại trang.
  - **Kiểm thử tự động & Đóng gói**: 100% pass qua 5 bài test tự động, đóng gói Vite hoàn tất trong 10.92 giây.

### Phiên Bản 1.9.0-ThietKeTrangChuAIHubVNTheoChuanMau (Ngày 20-10-2026)
- **Loại hình**: Thiết kế và phát triển lại toàn diện giao diện trang chủ AI HUB VN theo phong cách SaaS hiện đại, tinh tế và chuyên nghiệp.
- **Nội dung hoàn thành**:
  - **4.1. Thanh điều hướng (Header)**:
    - Logo chuẩn nhận diện AI HUB VN: Biểu tượng 3 nút tròn liên kết gradient tím/xanh kết hợp tên thương hiệu font chữ đậm sang trọng.
    - Hệ thống menu điều hướng trung tâm: `Công cụ AI`, `MCP Servers`, `Agent Skills`, `Bộ sưu tập Việt Nam`, `Hướng dẫn & Quy trình VibeCode`.
    - Cụm tác vụ bên phải: Nút `Đăng nhập` (tích hợp `LoginModal`), nút `+ Đóng góp tài nguyên` màu tím nổi bật, nút `Terminal` thực thi lệnh cục bộ và công tắc chuyển đổi chế độ Sáng / Tối.
  - **4.2. Khu vực giới thiệu chính (Hero Section)**:
    - Huy hiệu nổi bật: `KHO TÀI NGUYÊN AI CHO NGƯỜI VIỆT` bo tròn tinh tế.
    - Tiêu đề lớn ấn tượng: `Tìm đúng công cụ AI. / Làm việc hiệu quả hơn.` (với chữ `công cụ AI.` hiệu ứng gradient tím - xanh).
    - Khung tìm kiếm trung tâm lớn bo tròn mềm mại, nút `Tìm kiếm` màu tím nổi bật.
    - Dải phím tắt theo nhu cầu công việc (Tags): `</> Lập trình`, `⚗ Nghiên cứu`, `✎ Tạo nội dung`, `⚙ Tự động hóa`, `🎨 Thiết kế`, `💼 Văn phòng` (khi nhấn sẽ lọc danh mục tức thì và cuộn mượt đến kho tài nguyên).
  - **4.3. Ba thẻ nhóm tài nguyên chính (Main Category Cards)**:
    - `Công cụ AI`: Biểu tượng Robot tím pastel, mô tả "Ứng dụng thông minh cho công việc".
    - `MCP Servers`: Biểu tượng Server xanh dương pastel, mô tả "Kết nối mô hình AI với dữ liệu và dịch vụ".
    - `Agent Skills`: Biểu tượng Ngôi sao xanh ngọc pastel, mô tả "Bộ kỹ năng cho tác nhân AI".
  - **4.4. Khám phá tài nguyên nổi bật (Featured Resources)**:
    - 3 thẻ tiêu biểu: `GitHub Copilot` (Công cụ AI), `Filesystem MCP` (MCP Server), `Code Review` (Agent Skill).
    - Hiển thị đầy đủ thông số: Sao đánh giá (⭐ 4.6 - 4.8), lượt dùng (6.8k - 12.5k), ngày cập nhật, nút "Xem chi tiết ↗" mở ngay modal 4 khối thông tin.
  - **4.5. Chọn theo nhu cầu (Browse by Needs)**:
    - 4 thẻ nhu cầu công việc dạng lưới: `Phát triển phần mềm`, `Marketing & nội dung`, `Phân tích dữ liệu`, `Tự động hóa quy trình`.
  - **4.6. Chân trang (Footer) & Modal Đăng Nhập (LoginModal)**:
    - Tích hợp `LoginModal.tsx` hỗ trợ đăng nhập qua GitHub và Email.
    - Chân trang `Footer.tsx` đầy đủ thông tin bản quyền mã nguồn mở MIT, liên kết tài liệu thiết kế và cộng đồng.
  - **Kiểm thử tự động & Đóng gói**: Đạt 5/5 bài kiểm thử unit test tự động (100% pass), đóng gói `npm run build` hoàn thành trong 10.21 giây.

### Phiên Bản 1.8.0-MoRongKhungLamViecVaChuanHoaAnhDemoRepo (Ngày 20-10-2026)
- **Loại hình**: Mở rộng khung làm việc (Workspace Expansion), chuẩn hóa ảnh demo theo repo thực tế kèm ghi chú rõ ràng, và mở rộng thêm kho lưu trữ GitHub, GitLab.
- **Nội dung hoàn thành**:
  - **Mở rộng khung làm việc (Workspace Expansion)**:
    - Bổ sung công cụ mở rộng không gian làm việc toàn màn hình (`Full-width Fluid Canvas 100%`) cho phép chuyển đổi linh hoạt giữa giao diện căn giữa tiêu chuẩn và không gian rộng tối đa.
    - Bổ sung nút thu gọn / mở rộng thanh bên trái (Collapsible Left Sidebar) giúp người dùng tối ưu hóa diện tích hiển thị nội dung, tự động dàn trải lưới thẻ từ 3 cột lên 4 hoặc 5 cột.
    - Bổ sung chế độ xem kép: Chế độ Lưới Thẻ trực quan (Grid View) và Chế độ Bảng danh sách chi tiết mở rộng (Detailed Table / List View) hỗ trợ duyệt nhanh hàng ngàn công cụ.
  - **Chuẩn hóa ảnh demo theo nguyên tắc repo gốc**:
    - Đối với các kho lưu trữ không có ảnh demo đính kèm: Để trống hoàn toàn theo đúng yêu cầu, không tự tạo ảnh giả, không dùng ảnh placeholder. Giao diện tự động thích ứng với dải tiêu đề đồ họa công nghệ tinh gọn.
    - Đối với các kho lưu trữ có ảnh demo thật sự trong repo (ảnh chụp màn hình giao diện, ảnh động demo GIF, sơ đồ kiến trúc): Chèn tất cả các ảnh vào khung chi tiết và bổ sung **ghi chú rõ ràng (caption)** cho từng ảnh giải thích chức năng, giao diện hoặc kịch bản minh họa.
  - **Mở rộng dữ liệu GitHub, GitLab và nguồn khác lên 1.930 công cụ**:
    - Bổ sung các repo và tác tử AI hàng đầu: `browser-use/browser-use`, `All-Hands-AI/OpenHands`, `langgenius/dify`, `undertheseanlp/underthesea`, `pbcquoc/vietocr`, `VinAIResearch/PhoBERT`, v.v.
  - **Kiểm thử tự động & Đóng gói**: 100% bài kiểm thử đơn vị tự động PASS, biên dịch TypeScript và đóng gói Vite hoàn tất thành công.

### Phiên Bản 1.7.0-LeftSidebarVaHuongDanSieuChiTiet (Ngày 20-10-2026)
- **Loại hình**: Tái cấu trúc giao diện 2 cột chuyên nghiệp với Left Sidebar cố định và chuẩn hóa hướng dẫn sử dụng/cài đặt siêu chi tiết.
- **Nội dung hoàn thành**:
  - **Tích hợp thành phần Left Sidebar cố định (`src/components/Sidebar.tsx`)**:
    - Bộ lọc phân loại thành phần đa tầng có huy hiệu số lượng công cụ cập nhật theo thời gian thực.
    - Bộ lọc danh mục chuyên môn với tab `🇻🇳 Thị Trường Việt Nam` nổi bật cùng huy hiệu HOT.
    - Bộ lọc môi trường AI (Claude Desktop, Antigravity, Cursor AI).
    - Hỗ trợ giao diện Drawer trượt thông minh cho thiết bị di động/tablet.
  - **Nâng cấp nội dung hướng dẫn cài đặt và sử dụng siêu chi tiết cho 100% công cụ**:
    - Chuẩn hóa cấu trúc 4 bước cài đặt: Chuẩn bị môi trường -> Cài đặt lệnh CLI -> Cấu hình JSON & giải thích biến môi trường -> Khởi động và xác nhận kết nối.
    - Chuẩn hóa kịch bản sử dụng: Ngữ cảnh bài toán thực tế, câu lệnh prompt chi tiết và kết quả trả về dự kiến.
    - Trang bị đầy đủ ảnh chụp màn hình và ảnh demo banner cho từng công cụ.
  - **Bổ sung các dự án AI Việt Nam & Quốc tế mới**:
    - VietOCR, UnderTheSea NLP, Chuyển đổi số tiền thành chữ kế toán, Kiểm tra cấu trúc 12 số CCCD, Tra cứu xử phạt giao thông Nghị định 100, vLLM Inference Engine, Exo Distributed AI, Stanford STORM Research Agent.
  - **Kiểm thử tự động & Build**: 100% pass qua 5 bài test, đóng gói production thành công.

### Phiên Bản 1.6.0-AnhDemoVaQuyTrinhWorkflows (Ngày 20-10-2026)
- **Loại hình**: Tích hợp phân hệ Quy trình tự động hóa (Workflows) và chuẩn hóa ảnh demo (Demo Images) 100% công cụ.
- **Nội dung hoàn thành**:
  - **Bổ sung và chuẩn hóa ảnh demo trực quan cho toàn bộ 1.914 công cụ**:
    - Trích xuất tự động Open Graph banner chất lượng cao cho 1.890+ kho lưu trữ GitHub (`https://opengraph.githubassets.com/1/{owner}/{repo}`).
    - Gán bộ ảnh chụp màn hình nhận diện thương hiệu công nghệ cho các công cụ và API tại Việt Nam.
    - Cập nhật giao diện `ToolCard.tsx`: Tích hợp ảnh banner tỉ lệ 16:9 ở đầu thẻ, nhãn phân loại trong suốt mờ ảo (Glassmorphism), hiệu ứng zoom mượt mà khi di chuột.
    - Cập nhật giao diện `ToolDetailModal.tsx`: Tích hợp ảnh demo lớn, nút xem ảnh gốc toàn màn hình và thư viện ảnh chuyển đổi thumbnail.
  - **Bổ sung Phân hệ Quy trình tự động hóa (AI Workflows)**:
    - n8n Workflow AI Automation (52K sao), Dify LLM Application Workflow (64K sao), Flowise Drag-and-Drop (35K sao), Langflow Canvas Workflow (48K sao), FastGPT Knowledge Workflow (21K sao).
  - **Bổ sung công cụ thương mại điện tử và tài chính Việt Nam**:
    - Shopee Vietnam Open API, TikTok Shop Vietnam Open API, Whisper nhận dạng tiếng Việt 3 miền, Đấu thầu mua sắm công quốc gia, Biểu lãi suất tiết kiệm 35 ngân hàng.
  - **Kiểm thử tự động và đóng gói**: 100% bài kiểm tra unit tests pass, biên dịch đóng gói sản xuất thành công.

### Phiên Bản 1.5.0-MoRongQuyMoToanCauVaVietNam (Ngày 20-10-2026)
- **Loại hình**: Mở rộng quy mô cơ sở dữ liệu lên 1.904 công cụ và 2.899 mẫu cấu hình JSON.
- **Nội dung hoàn thành**:
  - **Tích hợp các công cụ API thị trường Việt Nam (27 mục chuyên biệt)**:
    - Cổng thanh toán mở PayOS VietQR, MoMo Payment Gateway, VNPay Merchant Gateway.
    - Dịch vụ vận chuyển GHTK, Giao hàng siêu tốc Ahamove, ViettelPost & GHN.
    - Quản lý bán hàng đa kênh KiotViet POS, Sapo Omnichannel.
    - Trí tuệ nhân tạo giọng nói và eKYC: Viettel AI Platform, FPT.AI Platform, VinAI PhoBERT.
    - Cơ sở dữ liệu hành chính 63 tỉnh thành Việt Nam, SMS Brandname viễn thông, Tra cứu mã số thuế doanh nghiệp.
    - Ngân hàng mở Vietcombank Open Banking, Tổng đài thông minh Stringee Communication SDK.
    - Cổng Đăng ký doanh nghiệp quốc gia, Bảng giá xăng dầu Petrolimex, Chỉ số chất lượng không khí AQI và thời tiết.
  - **Tích hợp các kho lưu trữ GitHub AI thịnh hành nhất thế giới**:
    - Browser-Use (32K sao), Cline (28.5K sao), Ollama (125K sao), CrewAI (26K sao), RAGFlow (31K sao), Mem0 (27.5K sao), OpenHands (44K sao), uv (48K sao), ComfyUI (62K sao), Microsoft AutoGen (38K sao), DeepSeek-V3 (35K sao), LangGraph (18.5K sao), shadcn/ui (82K sao).
  - **Kiểm thử tự động**: Đạt 100% qua 5 bài kiểm tra quy tắc nghiệp vụ và bảo mật.

### Phiên Bản 1.4.0-ThucThiLenhTrucTiep (Ngày 20-10-2026)
- **Loại hình**: Bổ sung phân hệ Thiết bị đầu cuối cục bộ (Local Terminal Execution) và Cầu nối thực thi lệnh an toàn.
- **Nội dung hoàn thành**:
  - **Cầu nối thực thi lệnh cục bộ (`server/commandBridge.js`)**: Điểm cuối `POST /api/execute-command` truyền luồng dữ liệu thời gian thực (Server-Sent Events) hiển thị kết quả trực tiếp từ tiến trình con của hệ điều hành.
  - **Kiểm soát an toàn bảo mật nghiêm ngặt**: Danh sách trắng tiền tố lệnh (`npx`, `npm`, `node`, `claude`, `git`, `uv`, `python`, `echo`, `dir`, `ls`), chặn hoàn toàn các lệnh nguy hiểm, giới hạn thời gian chạy 120 giây và hỗ trợ hủy tiến trình qua `POST /api/kill-command`.
  - **Giao diện Thiết bị đầu cuối tương tác (`TerminalDrawer.tsx`)**: Cửa sổ terminal hiện đại dưới đáy màn hình, đèn LED chỉ báo trạng thái, hỗ trợ nhập lệnh tùy ý, cuộn tự động và duyệt lịch sử lệnh bằng phím mũi tên Lên/Xuống.
  - **Tích hợp một chạm trên trang chi tiết (`ToolDetailModal.tsx`)**: Bổ sung nút bấm `▶ Chạy lệnh trên máy` bên cạnh nút sao chép, cho phép chạy ngay lệnh cài đặt CLI vào môi trường thật của máy tính.
  - **Nút bật/tắt nhanh trên thanh điều hướng (`Header.tsx`)**: Giúp người dùng có thể mở cửa sổ dòng lệnh bất kỳ lúc nào để thao tác hoặc kiểm tra môi trường.
  - **Kiểm thử tự động**: 5/5 bài kiểm tra unit tests pass 100%, đóng gói bản phát hành thành công.

### Phiên Bản 1.3.0-BanDiaHoaVietNam (Ngày 20-10-2026)
- **Loại hình**: Tách biệt thành phần hoàn chỉnh, bản địa hóa toàn bộ tiếng Việt và bổ sung hệ sinh thái công cụ Việt Nam.
- **Nội dung hoàn thành**:
  - **Tách biệt rạch ròi 7 nhóm thành phần**: Phân định độc lập giữa Skills (891 mục), Templates (14 mục), Agents (422 mục), Commands (288 mục), MCPs (125 mục), Hooks (62 mục), Settings (72 mục).
  - **Bổ sung 10 công cụ Việt Nam chuyên sâu**:
    1. VietQR Banking MCP Server (Tạo mã QR thanh toán chuẩn Napas247, tra cứu ngân hàng Việt Nam).
    2. Zalo OA & ZNS Messenger MCP (Gửi thông báo ZNS, tương tác Zalo Official Account).
    3. VNStock Chứng Khoán & VN-Index MCP (Phân tích chỉ số chứng khoán VN-Index, báo cáo tài chính doanh nghiệp).
    4. Tra Cứu Pháp Luật & Thuế Việt Nam MCP (Văn bản pháp luật, Luật Thuế TNDN/TNCN, Nghị định, Thông tư).
    5. Tỷ Giá Vietcombank & Giá Vàng SJC MCP (Tỷ giá ngoại hối VCB, giá vàng miếng SJC và vàng nhẫn 9999).
    6. ViettelPost & Giao Hàng Nhanh MCP (Tính cước bưu kiện toàn quốc, tra cứu hành trình vận đơn).
    7. PhoBERT & VietAI Kỹ Năng Tiếng Việt NLP (Xử lý ngôn ngữ tự nhiên tiếng Việt, tách từ, nhận dạng thực thể).
    8. Cổng Dịch Vụ Công Quốc Gia Hướng Dẫn Thủ Tục Skill (Thủ tục hành chính công, cấp đổi CCCD, hộ chiếu).
    9. Lịch Vạn Niên & Âm Lịch Việt Nam MCP (Chuyển đổi âm dương lịch, ngày hoàng đạo, tiết khí truyền thống).
    10. Hóa Đơn Điện Tử & Chữ Ký Số Việt Nam MCP (Kiểm tra XML hóa đơn điện tử Tổng Cục Thuế, xác thực Token USB).
  - **Bản địa hóa 100% tiếng Việt**: Quét và chuyển đổi toàn bộ các đoạn diễn giải tiếng Anh thô thành tiếng Việt tự nhiên, chuẩn kỹ thuật trên 1.874 mục.
  - **Cập nhật danh mục 🇻🇳 Thị Trường Việt Nam**: Bổ sung bộ lọc danh mục riêng biệt trên giao diện.
  - **Kiểm thử tự động**: 100% bài kiểm tra quy tắc nghiệp vụ (`tests/business-rules.test.js`) và biên dịch đóng gói (`npm run build`) hoàn thành xuất sắc.

### Phiên Bản 1.1.0-ToanBoDuLieu (Ngày 20-10-2026)
- **Loại hình**: Nâng cấp toàn diện cơ sở dữ liệu và mở rộng quy mô hệ thống (Massive Dataset Expansion).
- **Nội dung hoàn thành**:
  - Tích hợp toàn bộ **1.716 công cụ, kỹ năng tác tử và máy chủ MCP** từ hai nền tảng `phandonggiang.com/ai-templates` và `mcpmarket.com`.
  - Chuẩn hóa **2.709 đoạn mã cấu hình JSON** cho ba môi trường chính: Claude Desktop, Google Antigravity và Cursor AI.
  - Bổ sung bộ lọc tab theo loại hình (*Tất cả, Máy chủ MCP, Kỹ năng tác tử, Tác tử & Lệnh*).
  - Tích hợp hệ thống phân trang thông minh (24 mục/trang) với điều hướng trang tức thì.
  - Vượt qua 100% bài kiểm thử tự động quy tắc nghiệp vụ trên toàn bộ 1.716 công cụ.
  - Biên dịch bản phát hành thành công (`npm run build`).
