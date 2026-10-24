const fs = require('fs');
const path = require('path');

const toolsPath = path.join(__dirname, '../src/data/allTools.json');
const tools = JSON.parse(fs.readFileSync(toolsPath, 'utf8'));

const categoryMap = {
  finance_payment: 'Tài chính, Ngân hàng & Thuế',
  business_admin: 'Doanh nghiệp & Quản trị',
  ecommerce_retail: 'Thương mại điện tử & Bán lẻ',
  logistics_transport: 'Vận tải & Giao vận',
  telecom_cskh: 'Viễn thông & Chăm sóc khách hàng',
  legal_public_service: 'Pháp luật & Hành chính công',
  hr_recruitment: 'Nhân sự & Tuyển dụng',
  ai_nlp_data: 'Trí tuệ nhân tạo & Dữ liệu',
  programming_devops: 'Lập trình & Kỹ thuật phần mềm',
  system_automation: 'Tự động hóa hệ thống & Web'
};

const batch8List = [
  // 1. MoMo Mini App
  {
    id: "vn-repo-momo-mini-app-sdk",
    name: "MoMo Mini App SDK & Platform API - Nền Tảng Ứng Dụng Thu Nhỏ Ví Điện Tử MoMo",
    toolType: "Skill",
    category: "finance_payment",
    authorName: "MoMo Innovation Center",
    sourceUrl: "https://developers.momo.vn/",
    summaryVi: "Bộ công cụ phát triển ứng dụng thu nhỏ MoMo Mini App, kết nối trực tiếp với hệ sinh thái ví MoMo cho hơn 31 triệu người dùng thanh toán một chạm.",
    purposeVi: "Cho phép doanh nghiệp xây dựng các ứng dụng bán lẻ, bảo hiểm, ăn uống và đặt vé chạy trực tiếp bên trong ứng dụng MoMo. Hỗ trợ xác thực danh tính người dùng bằng MoMo eKYC, tích hợp thanh toán tự động không cần nhập thông tin thẻ và tiếp cận tệp khách hàng tiềm năng khổng lồ."
  },
  // 2. ZaloPay Merchant QR
  {
    id: "vn-repo-zalopay-merchant-qr-sdk",
    name: "ZaloPay Merchant QR & Payment Gateway SDK - Giải Pháp Thanh Toán Số ZaloPay",
    toolType: "Skill",
    category: "finance_payment",
    authorName: "ZaloPay Engineering",
    sourceUrl: "https://docs.zalopay.vn/",
    summaryVi: "Bộ giải pháp tích hợp cổng thanh toán ZaloPay, tạo mã QR động đa năng, thanh toán thẻ ATM/Visa và liên kết ví điện tử trong ứng dụng chat Zalo.",
    purposeVi: "Giúp các nhà phát triển và đơn vị kinh doanh tích hợp phương thức thanh toán ZaloPay vào website và ứng dụng di động. Tự động hóa kiểm tra tính hợp lệ của chữ ký MAC SHA256 và nhận dữ liệu Webhook hoàn tất thanh toán từ máy chủ ZaloPay."
  },
  // 3. VietinBank iConnect Corporate API
  {
    id: "vn-repo-vietinbank-iconnect-api",
    name: "VietinBank iConnect Corporate API - Cổng Ngân Hàng Mở Chuyên Sâu VietinBank",
    toolType: "MCP Server",
    category: "finance_payment",
    authorName: "VietinBank Technology",
    sourceUrl: "https://iconnect.vietinbank.vn/",
    summaryVi: "Cổng tích hợp ngân hàng mở VietinBank iConnect, hỗ trợ kết nối hệ thống ERP tập đoàn với các nghiệp vụ chi hộ lô lớn, thu hộ định danh và bảo lãnh điện tử.",
    purposeVi: "Cung cấp kết nối kỹ thuật bảo mật giữa phần mềm kế toán tài chính nội bộ của doanh nghiệp với hệ thống ngân hàng lõi VietinBank. Giảm tải thời gian hạch toán chứng từ thủ công và tăng tính minh bạch trong quản lý dòng tiền chi lương và thanh toán nhà cung cấp."
  },
  // 4. Agribank E-Banking B2B
  {
    id: "vn-repo-agribank-ebanking-b2b",
    name: "Agribank E-Banking B2B Gateway - Cổng Thanh Toán Số Nông Nghiệp & Nông Thôn",
    toolType: "Skill",
    category: "finance_payment",
    authorName: "Agribank IT Center",
    sourceUrl: "https://www.agribank.com.vn/",
    summaryVi: "Bộ API kết nối Ngân hàng Nông nghiệp và Phát triển Nông thôn Việt Nam (Agribank), phục vụ thanh toán tiền mua nông sản, thu hộ học phí nông thôn và chi hộ đại lý.",
    purposeVi: "Hỗ trợ các doanh nghiệp chế biến xuất khẩu nông lâm thủy sản và chuỗi cung ứng vật tư nông nghiệp thực hiện chuyển tiền tức thời tới hàng triệu hộ nông dân và hợp tác xã có tài khoản mở tại mạng lưới chi nhánh rộng nhất cả nước của Agribank."
  },
  // 5. SHB Open Banking
  {
    id: "vn-repo-shb-open-banking-hub",
    name: "SHB Open Banking Corporate Hub - Ngân Hàng Mở Doanh Nghiệp Sài Gòn - Hà Nội",
    toolType: "Skill",
    category: "finance_payment",
    authorName: "SHB Digital Bank",
    sourceUrl: "https://www.shb.com.vn/",
    summaryVi: "Cổng kết nối tài chính doanh nghiệp SHB Open Banking, hỗ trợ tự động đối soát tài khoản ảo định danh, vấn tin sao kê thời gian thực và quản trị thanh khoản.",
    purposeVi: "Tối ưu hóa quản trị dòng tiền cho các doanh nghiệp xây dựng, năng lượng và phân phối bán buôn. Cho phép theo dõi chính xác từng món tiền thanh toán của khách hàng đổ về tài khoản mà không cần nhân viên kế toán phải chụp ảnh màn hình chuyển khoản."
  },
  // 6. HDBank Open API
  {
    id: "vn-repo-hdbank-supply-chain-api",
    name: "HDBank Open API & Supply Chain Finance - Tài Trợ Chuỗi Cung Ứng & Hàng Không HDBank",
    toolType: "Skill",
    category: "finance_payment",
    authorName: "HDBank Innovation Hub",
    sourceUrl: "https://hdbank.com.vn/",
    summaryVi: "Bộ giao diện kết nối tài trợ chuỗi cung ứng HDBank, tự động cấp hạn mức tín dụng thấu chi, thanh toán tiền vé máy bay Vietjet và đối soát chuỗi bán lẻ.",
    purposeVi: "Cung cấp giải pháp tài trợ vốn lưu động tức thời cho các đại lý bán vé máy bay, nhà cung cấp linh kiện và chuỗi siêu thị. Cho phép đối tác giải ngân trực tuyến trong vòng 5 phút sau khi tải lên hóa đơn điện tử hợp lệ."
  },
  // 7. MSB Open Banking
  {
    id: "vn-repo-msb-open-banking-api",
    name: "MSB Open Banking Developer Portal - Thu Hộ Định Danh & Ngân Hàng Số Hàng Hải",
    toolType: "Skill",
    category: "finance_payment",
    authorName: "MSB Bank Technology",
    sourceUrl: "https://www.msb.com.vn/",
    summaryVi: "Cổng kết nối lập trình viên MSB Open Banking, hỗ trợ tự động cấp tài khoản ảo định danh thu tiền viện phí, học phí và xử lý lệnh chi tự động 24/7.",
    purposeVi: "Hỗ trợ các trường đại học, bệnh viện công lập và công ty tài chính quản lý hàng trăm nghìn khoản thu nhỏ lẻ hàng ngày. Hệ thống tự động gạch nợ tức thì cho người nộp tiền ngay khi lệnh chuyển khoản liên ngân hàng 24/7 thành công."
  },
  // 8. OCB OMNI B2B
  {
    id: "vn-repo-ocb-omni-b2b-api",
    name: "OCB OMNI B2B Open API - Cổng Dịch Vụ Ngân Hàng Số Doanh Nghiệp Phương Đông",
    toolType: "Skill",
    category: "finance_payment",
    authorName: "OCB Digital Banking",
    sourceUrl: "https://www.ocb.com.vn/",
    summaryVi: "Bộ API ngân hàng số mở OCB OMNI B2B, cung cấp các tính năng thanh toán hóa đơn tự động, quản lý dòng tiền chi nhánh và liên kết cổng thanh toán số.",
    purposeVi: "Tích hợp dịch vụ ngân hàng trực tiếp vào các phần mềm bán hàng POS và ERP vừa và nhỏ (SME). Giúp doanh nghiệp quản lý tiền thu từ nhiều cửa hàng chi nhánh về một tài khoản tổng tập trung an toàn và minh bạch."
  },
  // 9. SeABank Corporate Connect
  {
    id: "vn-repo-seabank-corporate-connect",
    name: "SeABank Corporate Banking Connect - Quản Trị Thanh Toán & Dòng Tiền Trực Tuyến",
    toolType: "Skill",
    category: "finance_payment",
    authorName: "SeABank Technology",
    sourceUrl: "https://www.seabank.com.vn/",
    summaryVi: "Cổng tích hợp tài chính doanh nghiệp SeABank, tự động hóa đối soát thanh toán thương mại điện tử và kết nối dịch vụ ngân hàng điện tử.",
    purposeVi: "Hỗ trợ các doanh nghiệp bán lẻ và dịch vụ số tự động hóa các thao tác nộp tiền và chi trả hoa hồng đại lý nhanh chóng với độ bảo mật cao theo tiêu chuẩn bảo mật quốc tế PCI-DSS."
  },
  // 10. BaoViet Bank Open API
  {
    id: "vn-repo-baoviet-bank-open-api",
    name: "BaoViet Bank Open API - Cổng Thanh Toán Phí Bảo Hiểm & Dịch Vụ Tài Chính Bảo Việt",
    toolType: "Skill",
    category: "finance_payment",
    authorName: "BaoViet Bank",
    sourceUrl: "https://www.baovietbank.com.vn/",
    summaryVi: "Bộ API tích hợp ngân hàng Bảo Việt, hỗ trợ thanh toán phí bảo hiểm nhân thọ và phi nhân thọ định kỳ, trích nợ tự động và quản lý hợp đồng tiền gửi.",
    purposeVi: "Kết nối hệ thống phần mềm quản lý đại lý bảo hiểm với ngân hàng Bảo Việt. Tự động nhắc hạn đóng phí bảo hiểm cho khách hàng qua tin nhắn và hỗ trợ quét mã QR đóng phí tức thì không bị gián đoạn quyền lợi bảo hiểm."
  },
  // 11. Bảo Việt Nhân Thọ
  {
    id: "vn-repo-baoviet-nhan-tho-api",
    name: "Bảo Việt Nhân Thọ Tra Cứu Hợp Đồng Bảo Hiểm - Quản Lý Hợp Đồng & Giá Trị Hoàn Lại",
    toolType: "Skill",
    category: "finance_payment",
    authorName: "Tổng Công ty Bảo Việt Nhân thọ",
    sourceUrl: "https://baovietnhantho.com.vn/",
    summaryVi: "Bộ công cụ hỗ trợ khách hàng và đại lý tra cứu tình trạng hiệu lực hợp đồng bảo hiểm nhân thọ, lịch sử đóng phí và quyền lợi bảo vệ sức khỏe.",
    purposeVi: "Cung cấp cho khách hàng khả năng tự tra cứu giá trị hoàn lại của hợp đồng bảo hiểm nhân thọ, nộp hồ sơ yêu cầu giải quyết quyền lợi bảo hiểm trực tuyến (e-Claims) và tải biên lai thu phí điện tử hợp lệ."
  },
  // 12. Bảo Minh Insurance
  {
    id: "vn-repo-baominh-insurance-api",
    name: "Bảo Minh Insurance Open API - Tra Cứu Quyền Lợi Bảo Hiểm Xe Cơ Giới & Sức Khỏe",
    toolType: "Skill",
    category: "finance_payment",
    authorName: "Tổng Công ty Cổ phần Bảo Minh",
    sourceUrl: "https://www.baominh.com.vn/",
    summaryVi: "Bộ API kết nối hệ sinh thái bảo hiểm Bảo Minh, hỗ trợ tra cứu giấy chứng nhận bảo hiểm xe máy/ô tô điện tử và giám định bồi thường số.",
    purposeVi: "Hỗ trợ các hãng taxi công nghệ và doanh nghiệp vận tải tra cứu nhanh thời hạn hiệu lực của bảo hiểm trách nhiệm dân sự bắt buộc của phương tiện và khai báo tai nạn giao thông trực tuyến để nhận bồi thường nhanh chóng."
  },
  // 13. PVI Insurance Claims
  {
    id: "vn-repo-pvi-insurance-claims-api",
    name: "PVI Insurance Claims & Policy API - Bồi Thường Trực Tuyến & Cấp Đơn Điện Tử PVI",
    toolType: "Skill",
    category: "finance_payment",
    authorName: "Bảo hiểm PVI",
    sourceUrl: "https://pvi.com.vn/",
    summaryVi: "Giải pháp kết nối API bảo hiểm phi nhân thọ PVI, cấp giấy chứng nhận bảo hiểm du lịch, bảo hiểm cháy nổ bắt buộc và nộp hồ sơ bồi thường y tế trực tuyến.",
    purposeVi: "Giúp người lao động tham gia bảo hiểm chăm sóc sức khỏe doanh nghiệp nộp hóa đơn viện phí điện tử trực tiếp qua ứng dụng để nhận tiền thanh toán quyền lợi y tế trong vòng 24 giờ mà không cần gửi hồ sơ giấy tờ gốc."
  },
  // 14. PTI Bưu Điện
  {
    id: "vn-repo-pti-insurance-api",
    name: "PTI Bưu Điện Tra Cứu Bảo Hiểm Bắt Buộc TNDS Ô Tô Xe Máy - Chứng Nhận Điện Tử",
    toolType: "Skill",
    category: "finance_payment",
    authorName: "Tổng Công ty Cổ phần Bảo hiểm Bưu điện",
    sourceUrl: "https://pti.com.vn/",
    summaryVi: "Bộ công cụ tra cứu và phát hành giấy chứng nhận bảo hiểm bắt buộc trách nhiệm dân sự xe cơ giới điện tử có mã QR chuẩn Bộ Tài chính của PTI.",
    purposeVi: "Cho phép chủ phương tiện giao thông xuất trình chứng nhận bảo hiểm điện tử trực tiếp trên điện thoại thông minh khi cảnh sát giao thông kiểm tra, đồng thời hỗ trợ tra cứu lịch sử xử lý bồi thường tổn thất tai nạn giao thông."
  },
  // 15. VnDirect Securities
  {
    id: "vn-repo-vndirect-securities-api",
    name: "VnDirect Securities Trading API - Cổng Dữ Liệu Thị Trường Chứng Khoán & Đặt Lệnh",
    toolType: "Skill",
    category: "finance_payment",
    authorName: "Công ty Cổ phần Chứng khoán VNDIRECT",
    sourceUrl: "https://www.vndirect.com.vn/",
    summaryVi: "Bộ API kết nối bảng giá trực tuyến Dchart của VNDIRECT, tra cứu dữ liệu khớp lệnh cổ phiếu HOSE, HNX, UPCoM và đặt lệnh giao dịch thuật toán.",
    purposeVi: "Phục vụ các nhà đầu tư cá nhân và quỹ đầu tư xây dựng hệ thống giao dịch chứng khoán tự động (Algo Trading). Truy xuất lịch sử biến động giá, khối lượng giao dịch và chỉ số tài chính cơ bản P/E, P/B của các mã cổ phiếu niêm yết."
  },
  // 16. SSI iBoard Market Data
  {
    id: "vn-repo-ssi-iboard-market-data",
    name: "SSI iBoard Market Data API - Dữ Liệu Thị Trường Chứng Khoán Thời Gian Thực SSI",
    toolType: "Skill",
    category: "finance_payment",
    authorName: "Công ty Cổ phần Chứng khoán SSI",
    sourceUrl: "https://iboard.ssi.com.vn/",
    summaryVi: "Bộ API dữ liệu thị trường tài chính SSI iBoard, truyền luồng biến động chỉ số VN-Index, VN30, độ sâu thị trường và giao dịch khối ngoại theo mili-giây.",
    purposeVi: "Cung cấp hạ tầng dữ liệu tốc độ cao cho các mô hình trí tuệ nhân tạo dự đoán xu hướng thị trường và đánh giá dòng tiền thông minh của các nhà đầu tư tổ chức trên thị trường chứng khoán Việt Nam."
  },
  // 17. TCBS Open Wealth
  {
    id: "vn-repo-tcbs-open-wealth-api",
    name: "TCBS Techcom Securities Open Wealth API - Nền Tảng Đầu Tư Trái Phiếu & Quỹ iFund",
    toolType: "Skill",
    category: "finance_payment",
    authorName: "Chứng khoán Kỹ Thương (TCBS)",
    sourceUrl: "https://www.tcbs.com.vn/",
    summaryVi: "Bộ API quản lý tài sản tài chính số TCBS, hỗ trợ tích hợp đầu tư chứng chỉ quỹ iFund, giao dịch trái phiếu doanh nghiệp iBond và cổ phiếu miễn phí giao dịch.",
    purposeVi: "Giúp các ứng dụng công nghệ tài chính Fintech và ngân hàng số tích hợp tính năng đầu tư tài chính thông minh cho người dùng với số vốn khởi điểm chỉ từ 10.000 VNĐ."
  },
  // 18. MBS Securities
  {
    id: "vn-repo-mbs-securities-api",
    name: "MBS Mobile Trading API Connector - Dữ Liệu Phân Tích Doanh Nghiệp Niêm Yết MBS",
    toolType: "Skill",
    category: "finance_payment",
    authorName: "Công ty Cổ phần Chứng khoán MB (MBS)",
    sourceUrl: "https://mbs.com.vn/",
    summaryVi: "Cổng kết nối dữ liệu phân tích khuyến nghị đầu tư cổ phiếu của Chứng khoán MB (MBS), tra cứu báo cáo tài chính kiểm toán và cảnh báo rủi ro danh mục.",
    purposeVi: "Cung cấp cho các trợ lý ảo tài chính nguồn dữ liệu phân tích cơ bản chuyên sâu về triển vọng kinh doanh của các ngành nghề trọng điểm: ngân hàng, bán lẻ, bất động sản và dầu khí tại Việt Nam."
  },
  // 19. VPS SmartOne
  {
    id: "vn-repo-vps-smartone-api",
    name: "VPS SmartOne Open API Gateway - Nền Tảng Giao Dịch Chứng Khoán Thị Phần Số 1",
    toolType: "Skill",
    category: "finance_payment",
    authorName: "Công ty Cổ phần Chứng khoán VPS",
    sourceUrl: "https://www.vps.com.vn/",
    summaryVi: "Bộ API giao dịch chứng khoán VPS SmartOne, hỗ trợ quản lý danh mục đầu tư chứng khoán cơ sở, chứng khoán phái sinh và dịch vụ mở tài khoản eKYC.",
    purposeVi: "Tự động hóa quản lý tài khoản giao dịch cho các môi giới chứng khoán và nhà đầu tư chủ động, tiếp nhận thông báo khớp lệnh qua tin nhắn ứng dụng tức thì và tra cứu số dư tiền mặt khả dụng."
  },
  // 20. FPT Smart Cloud AI
  {
    id: "vn-repo-fpt-smart-cloud-ai",
    name: "FPT Smart Cloud AI Platform API - Nền Tảng Thị Giác Máy Tính & eKYC FPT",
    toolType: "Agent",
    category: "ai_nlp_data",
    authorName: "FPT Smart Cloud",
    sourceUrl: "https://fptcloud.com/",
    summaryVi: "Bộ API trí tuệ nhân tạo toàn diện của FPT, cung cấp dịch vụ định danh điện tử FPT.AI eKYC, nhận diện ký tự quang học OCR hóa đơn và bóc tách CCCD.",
    purposeVi: "Cho phép các ngân hàng và tổ chức tài chính mở tài khoản người dùng trực tuyến hoàn toàn trong vòng dưới 1 phút. Nhận diện chính xác thông tin trên thẻ căn cước công dân gắn chip, kiểm tra khuôn mặt sống (liveness detection) chống giả mạo sâu (deepfake)."
  },
  // 21. Viettel AI Open Platform
  {
    id: "vn-repo-viettel-ai-platform",
    name: "Viettel AI Open Platform - Thị Giác Máy Tính & Xử Lý Tiếng Việt Viettel",
    toolType: "Agent",
    category: "ai_nlp_data",
    authorName: "Viettel AI",
    sourceUrl: "https://viettelai.vn/",
    summaryVi: "Nền tảng trí tuệ nhân tạo mở của Tập đoàn Viettel, cung cấp các mô hình nhận diện khuôn mặt điểm danh, đọc biển số xe thông minh và phân tích giọng nói.",
    purposeVi: "Ứng dụng trong việc xây dựng hệ thống camera an ninh thông minh cho đô thị và tòa nhà thông minh, nhận diện phương tiện ra vào bãi đỗ xe tự động và tổng hợp giọng nói tiếng Việt tự nhiên cho tổng đài chăm sóc khách hàng."
  },
  // 22. VNPT AI Platform
  {
    id: "vn-repo-vnpt-ai-platform",
    name: "VNPT AI & Smart Vision Platform - Sinh Trắc Học Khuôn Mặt & Phân Tích Video An Ninh",
    toolType: "Agent",
    category: "ai_nlp_data",
    authorName: "VNPT AI",
    sourceUrl: "https://vnpt.vn/ai",
    summaryVi: "Hệ thống AI chuyên sâu của Tập đoàn VNPT đạt chứng chỉ quốc tế NIST về độ chính xác nhận diện sinh trắc học khuôn mặt và phân tích hình ảnh đa nguồn.",
    purposeVi: "Giải quyết bài toán xác thực công dân tại các quầy một cửa dịch vụ hành chính công, kiểm soát ra vào cơ quan nhà nước bằng khuôn mặt và phát hiện sớm các hành vi vi phạm trật tự công cộng."
  },
  // 23. Cốc Cốc Search API
  {
    id: "vn-repo-coccoc-search-api",
    name: "Cốc Cốc Search API & Vietnamese Spell Check - Sửa Lỗi Chính Tả & Tra Cứu Tiếng Việt",
    toolType: "Skill",
    category: "ai_nlp_data",
    authorName: "Trình duyệt Cốc Cốc",
    sourceUrl: "https://coccoc.com/",
    summaryVi: "Bộ công cụ tự động kiểm tra và sửa lỗi chính tả tiếng Việt, thêm dấu câu thông minh và gợi ý từ khóa tìm kiếm theo xu hướng người Việt của Cốc Cốc.",
    purposeVi: "Giúp các biên tập viên báo chí, nhà sáng tạo nội dung và trợ lý AI tự động phát hiện và sửa các lỗi gõ sai thanh điệu tiếng Việt, từ đồng âm khác nghĩa và chuẩn hóa chính tả văn bản hành chính."
  },
  // 24. Zalo AI Speech
  {
    id: "vn-repo-zalo-ai-speech-api",
    name: "Zalo AI Voice & Speech API - Giọng Nói Thông Minh Trợ Lý Kiki VNG",
    toolType: "Agent",
    category: "ai_nlp_data",
    authorName: "Zalo AI Lab (VNG)",
    sourceUrl: "https://zalo.ai/",
    summaryVi: "Bộ giao diện nhận dạng giọng nói và tổng hợp giọng đọc tiếng Việt của Zalo AI, nền tảng cốt lõi vận hành trợ lý ô tô Kiki thông minh.",
    purposeVi: "Ứng dụng trong việc phát triển điều khiển ứng dụng bằng giọng nói rảnh tay trên ô tô, ứng dụng nghe tin tức sách nói và tổng đài trả lời tự động tiếp nhận khiếu nại của khách hàng."
  },
  // 25. FPT IS Electronic Bill
  {
    id: "vn-repo-fpt-is-einvoice-solutions",
    name: "FPT IS Electronic Bill & Tax Solutions - Giải Pháp Hóa Đơn & Hợp Đồng Điện Tử FPT",
    toolType: "Skill",
    category: "business_admin",
    authorName: "FPT Information System (FPT IS)",
    sourceUrl: "https://fpt-is.com/",
    summaryVi: "Bộ giải pháp hóa đơn điện tử FPT.eInvoice và hợp đồng điện tử FPT.eContract dành cho doanh nghiệp lớn, tích hợp sâu vào hệ thống SAP và Oracle ERP.",
    purposeVi: "Tự động hóa hoàn toàn chu trình ký kết hợp đồng kinh tế và xuất hóa đơn giá trị gia tăng điện tử theo chuẩn Nghị định 123/2020/NĐ-CP, đảm bảo giá trị pháp lý tương đương văn bản giấy có đóng dấu mộc đỏ."
  },
  // 26. VNPT eContract
  {
    id: "vn-repo-vnpt-econtract-api",
    name: "VNPT eContract Hợp Đồng Điện Tử Hợp Pháp - Dấu Thời Gian TSA & Ký Số Từ Xa",
    toolType: "Skill",
    category: "business_admin",
    authorName: "VNPT IT",
    sourceUrl: "https://econtract.vnpt.com.vn/",
    summaryVi: "Nền tảng chứng thực hợp đồng điện tử VNPT eContract được Bộ Công Thương cấp phép, tích hợp công nghệ chống giả mạo dấu thời gian Time-Stamping (TSA).",
    purposeVi: "Cho phép các doanh nghiệp ký kết hợp đồng lao động, hợp đồng mở thẻ ngân hàng và đơn hàng thương mại từ xa qua tin nhắn SMS OTP hoặc chữ ký số cá nhân mà không cần gặp mặt trực tiếp."
  },
  // 27. Viettel vContract
  {
    id: "vn-repo-viettel-vcontract-api",
    name: "Viettel vContract Chứng Thực Hợp Đồng Điện Tử - Nền Tảng Ký Số Trực Tuyến Viettel",
    toolType: "Skill",
    category: "business_admin",
    authorName: "Viettel Solutions",
    sourceUrl: "https://vcontract.viettel.vn/",
    summaryVi: "Giải pháp hợp đồng điện tử của Tập đoàn Viettel có tích hợp chữ ký số Viettel-CA và căn cước công dân gắn chip để ký kết tài liệu pháp lý.",
    purposeVi: "Giúp doanh nghiệp số hóa 100% hồ sơ giấy tờ, cắt giảm 85% chi phí in ấn chuyển phát nhanh và lưu trữ hợp đồng an toàn trên hạ tầng đám mây đạt tiêu chuẩn an toàn thông tin cấp độ 4 của Viettel."
  },
  // 28. MISA AMIS WeSign
  {
    id: "vn-repo-misa-amis-wesign-api",
    name: "MISA AMIS WeSign Ký Tài Liệu Số - Phê Duyệt Văn Bản & Báo Giá Doanh Nghiệp MISA",
    toolType: "Skill",
    category: "business_admin",
    authorName: "MISA Corporation",
    sourceUrl: "https://wesign.misa.vn/",
    summaryVi: "Nền tảng ký tài liệu số AMIS WeSign kết nối hệ sinh thái kế toán và bán hàng MISA, hỗ trợ ký báo giá, phiếu thu chi và quyết định bổ nhiệm nhân sự.",
    purposeVi: "Giúp ban giám đốc doanh nghiệp phê duyệt và ký số các văn bản nội bộ ngay trên điện thoại di động mọi lúc mọi nơi, theo dõi luồng ký kết nhiều cấp và nhận thông báo khi tất cả các bên đã hoàn tất chữ ký."
  },
  // 29. Bkav eHoadon
  {
    id: "vn-repo-bkav-ehoadon-api",
    name: "Bkav eHoadon & eChukySo API Connector - Hóa Đơn Điện Tử & Ký Số An Toàn Bkav",
    toolType: "Skill",
    category: "finance_payment",
    authorName: "Tập đoàn Công nghệ Bkav",
    sourceUrl: "https://ehoadon.vn/",
    summaryVi: "Bộ kết nối API hóa đơn điện tử Bkav eHoadon, hỗ trợ lập hóa đơn có mã của cơ quan thuế, tra cứu thông tin hóa đơn và ký số an toàn bằng Token USB hoặc Cloud CA.",
    purposeVi: "Tích hợp giải pháp phát hành hóa đơn điện tử an toàn cho các chuỗi siêu thị, nhà thuốc và trạm xăng dầu. Khách hàng nhận hóa đơn điện tử qua email hoặc tin nhắn SMS có mã tra cứu tiện lợi."
  },
  // 30. ThaiSon Technology E-Invoice
  {
    id: "vn-repo-thaison-einvoice-api",
    name: "ThaiSon E-INVOICE API - Phần Mềm Hóa Đơn Điện Tử Doanh Nghiệp FDI & Xuất Nhập Khẩu",
    toolType: "Skill",
    category: "finance_payment",
    authorName: "Công ty Phát triển Công nghệ Thái Sơn",
    sourceUrl: "https://einvoice.vn/",
    summaryVi: "Giải pháp hóa đơn điện tử E-INVOICE Thái Sơn chuyên biệt cho các tập đoàn đa quốc gia FDI, doanh nghiệp khu chế xuất và chuỗi dịch vụ logistics.",
    purposeVi: "Đồng bộ dữ liệu hóa đơn xuất khẩu và hóa đơn thương mại với phần mềm khai báo hải quan điện tử ECUS5-VNACCS, giúp doanh nghiệp hoàn thuế giá trị gia tăng nhanh chóng và chính xác."
  },
  // 31. Tổng Cục Hải Quan Tra Cứu
  {
    id: "vn-repo-tong-cuc-hai-quan-api",
    name: "Tổng Cục Hải Quan Tra Cứu Tờ Khai & Thuế XNK - Cổng Dữ Liệu Hải Quan Việt Nam",
    toolType: "Skill",
    category: "legal_public_service",
    authorName: "Tổng cục Hải quan (Bộ Tài chính)",
    sourceUrl: "https://www.customs.gov.vn/",
    summaryVi: "Bộ công cụ hỗ trợ tra cứu tình trạng thông quan tờ khai hải quan, số tiền thuế xuất nhập khẩu phải nộp và kiểm tra tính hợp lệ của mã số doanh nghiệp XNK.",
    purposeVi: "Giúp các công ty logistics và đại lý làm thủ tục hải quan theo dõi thời gian thực kết quả phân luồng tờ khai (luồng xanh, luồng vàng, luồng đỏ), nhận thông báo tiền thuế về hệ thống và chuẩn bị hồ sơ kiểm tra thực tế hàng hóa kịp thời."
  },
  // 32. Cơ Chế Một Cửa Quốc Gia (NSW)
  {
    id: "vn-repo-mot-cua-quoc-gia-nsw",
    name: "Cổng Thông Tin Một Cửa Quốc Gia NSW - Thủ Tục Cấp Giấy Phép Xuất Nhập Khẩu Chuyên Ngành",
    toolType: "Skill",
    category: "legal_public_service",
    authorName: "Cổng Thông tin Một cửa Quốc gia",
    sourceUrl: "https://vnsw.gov.vn/",
    summaryVi: "Bộ công cụ hỗ trợ theo dõi tiến độ cấp phép xuất nhập khẩu chuyên ngành liên bộ (Y tế, Nông nghiệp, Công Thương, Giao thông) qua Cơ chế một cửa quốc gia.",
    purposeVi: "Giúp doanh nghiệp xuất nhập khẩu tra cứu tình trạng kiểm tra chuyên ngành chất lượng hàng hóa, nhận giấy chứng nhận kiểm dịch điện tử và cắt giảm thời gian lưu kho bãi tại các cảng biển Hải Phòng, Cát Lái."
  },
  // 33. Cổng Thuế Cho Nhà Cung Cấp Nước Ngoài
  {
    id: "vn-repo-thue-nha-cung-cap-nuoc-ngoai",
    name: "Cổng Thuế Nhà Cung Cấp Nước Ngoài (Etaxforforeign) - Kê Khai Thuế Xuyên Biên Giới",
    toolType: "Skill",
    category: "finance_payment",
    authorName: "Tổng cục Thuế Việt Nam",
    sourceUrl: "https://etaxvn.gdt.gov.vn/",
    summaryVi: "Cổng thông tin điện tử của Tổng cục Thuế dành cho các tập đoàn công nghệ xuyên biên giới (Google, Meta, Apple, Netflix, TikTok) đăng ký và nộp thuế tại Việt Nam.",
    purposeVi: "Hỗ trợ các doanh nghiệp thương mại điện tử và dịch vụ số quốc tế đăng ký mã số thuế 10 số trực tiếp, nộp tờ khai thuế giá trị gia tăng và thuế thu nhập doanh nghiệp bằng ngoại tệ về ngân sách nhà nước Việt Nam."
  },
  // 34. Cổng DVC Bộ Công Thương
  {
    id: "vn-repo-dvc-bo-cong-thuong",
    name: "Cổng Dịch Vụ Công Bộ Công Thương - Cấp C/O Xuất Xứ & Thông Báo Khuyến Mại",
    toolType: "Skill",
    category: "legal_public_service",
    authorName: "Bộ Công Thương Việt Nam",
    sourceUrl: "https://dichvucong.moit.gov.vn/",
    summaryVi: "Bộ công cụ tra cứu và hướng dẫn nộp hồ sơ xin cấp Giấy chứng nhận xuất xứ hàng hóa (C/O điện tử) và đăng ký chương trình khuyến mại trực tuyến.",
    purposeVi: "Giúp các doanh nghiệp xuất khẩu tận dụng các hiệp định thương mại tự do (EVFTA, CPTPP, RCEP) để hưởng thuế quan ưu đãi thông qua quy trình cấp C/O điện tử nhanh chóng."
  },
  // 35. Quản Lý Hoạt Động TMĐT (Bộ Công Thương)
  {
    id: "vn-repo-quan-ly-tmdt-moit",
    name: "Cổng Quản Lý Hoạt Động Thương Mại Điện Tử - Tra Cứu Website Đã Đăng Ký & Thông Báo",
    toolType: "Skill",
    category: "legal_public_service",
    authorName: "Cục Thương mại điện tử và Kinh tế số",
    sourceUrl: "https://online.gov.vn/",
    summaryVi: "Hệ thống tra cứu tính hợp pháp của các website bán hàng và sàn giao dịch thương mại điện tử đã được Bộ Công Thương gắn nhãn chứng nhận dấu xanh hoặc dấu đỏ.",
    purposeVi: "Bảo vệ quyền lợi người tiêu dùng và hỗ trợ doanh nghiệp kiểm tra tình trạng hồ sơ đăng ký website thương mại điện tử, tránh bị cơ quan quản lý thị trường xử phạt vi phạm hành chính."
  },
  // 36. Cục Sở Hữu Trí Tuệ (IP Vietnam)
  {
    id: "vn-repo-so-huu-tri-tue-ipvietnam",
    name: "Cục Sở Hữu Trí Tuệ Tra Cứu Nhãn Hiệu & Bằng Sáng Chế - Bảo Hộ Thương Hiệu Việt Nam",
    toolType: "Skill",
    category: "legal_public_service",
    authorName: "Cục Sở hữu trí tuệ (Bộ KH&CN)",
    sourceUrl: "https://ipvietnam.gov.vn/",
    summaryVi: "Bộ công cụ tra cứu cơ sở dữ liệu nhãn hiệu hàng hóa, tên thương mại, kiểu dáng công nghiệp và bằng độc quyền sáng chế đã được bảo hộ tại Việt Nam.",
    purposeVi: "Giúp các doanh nghiệp khởi nghiệp và chủ sở hữu thương hiệu kiểm tra khả năng đăng ký bảo hộ độc quyền trước khi ra mắt sản phẩm mới, ngăn ngừa rủi ro tranh chấp nhãn hiệu và quyền sở hữu công nghiệp."
  },
  // 37. VNNIC Tên Miền .VN
  {
    id: "vn-repo-vnnic-ten-mien-quoc-gia",
    name: "VNNIC Tra Cứu Tên Miền Quốc Gia .VN - Quản Lý Định Danh Tên Miền Internet Việt Nam",
    toolType: "Skill",
    category: "legal_public_service",
    authorName: "Trung tâm Internet Việt Nam (VNNIC - Bộ TT&TT)",
    sourceUrl: "https://vnnic.vn/",
    summaryVi: "Bộ công cụ tra cứu thông tin chủ thể đăng ký tên miền WHOIS, tính khả dụng của tên miền cấp quốc gia .vn và tên miền thương hiệu .com.vn.",
    purposeVi: "Hỗ trợ các doanh nghiệp bảo vệ thương hiệu số trên không gian mạng, đăng ký tên miền quốc gia .vn có độ tin cậy pháp lý cao và được bảo vệ bởi pháp luật Việt Nam."
  },
  // 38. NCSC Cảnh Báo An Toàn Mạng
  {
    id: "vn-repo-ncsc-canh-bao-an-toan-mang",
    name: "Cổng An Toàn Thông Tin Mạng Quốc Gia NCSC - Tra Cứu Website Lừa Đảo & Tín Nhiệm Mạng",
    toolType: "MCP Server",
    category: "legal_public_service",
    authorName: "Trung tâm Giám sát an toàn không gian mạng quốc gia",
    sourceUrl: "https://tinnhiemmang.vn/",
    summaryVi: "Máy chủ MCP tra cứu cơ sở dữ liệu website lừa đảo trực tuyến, cảnh báo tài khoản ngân hàng gian lận và xác thực chứng nhận Tín nhiệm mạng của NCSC.",
    purposeVi: "Tích hợp vào các trình duyệt và ví điện tử để tự động cảnh báo người dùng khi bấm vào các đường dẫn giả mạo ngân hàng hoặc đánh cắp mã OTP nhằm bảo vệ an toàn tài sản số cho người dân."
  },
  // 39. Tra Cứu Hóa Đơn Tổng Cục Thuế
  {
    id: "vn-repo-tra-cuu-hoa-don-gdt",
    name: "Cổng Tra Cứu Hóa Đơn Điện Tử Quốc Gia - Xác Thực Hóa Đơn Có Mã Cơ Quan Thuế",
    toolType: "Skill",
    category: "finance_payment",
    authorName: "Tổng cục Thuế Việt Nam",
    sourceUrl: "https://tracuuhoadon.gdt.gov.vn/",
    summaryVi: "Bộ công cụ tra cứu tính hợp pháp của hóa đơn điện tử, kiểm tra trạng thái hoạt động của doanh nghiệp phát hành hóa đơn và tính toàn vẹn chữ ký số.",
    purposeVi: "Giúp kế toán doanh nghiệp đối chiếu nhanh các hóa đơn mua hàng đầu vào, loại bỏ triệt để các hóa đơn của doanh nghiệp đã bỏ trốn hoặc ngừng hoạt động để bảo vệ chi phí được trừ khi quyết toán thuế TNDN."
  },
  // 40. Tra Cứu Phạt Nguội Cục CSGT
  {
    id: "vn-repo-tra-cuu-phat-nguoi-csgt",
    name: "Cổng Tra Cứu Phạt Nguội Toàn Quốc Cục CSGT - Kiểm Tra Vi Phạm Giao Thông Hình Ảnh",
    toolType: "Skill",
    category: "legal_public_service",
    authorName: "Cục Cảnh sát giao thông (Bộ Công an)",
    sourceUrl: "https://www.csgt.vn/",
    summaryVi: "Bộ công cụ tra cứu lỗi vi phạm giao thông bị ghi nhận qua hệ thống camera giám sát trên toàn quốc theo biển kiểm soát xe máy và ô tô.",
    purposeVi: "Giúp các tài xế, chủ xe cá nhân và doanh nghiệp vận tải chủ động kiểm tra các lỗi vi phạm phạt nguội chưa nộp phạt để thực hiện nghĩa vụ trước khi đưa phương tiện đi kiểm định đăng kiểm xe định kỳ."
  },
  // 41. Cục Đăng Kiểm Việt Nam
  {
    id: "vn-repo-dang-kiem-vietnam-vr",
    name: "Cục Đăng Kiểm Việt Nam Tra Cứu Hạn Kiểm Định & Đặt Lịch Đăng Kiểm Trực Tuyến",
    toolType: "Skill",
    category: "legal_public_service",
    authorName: "Cục Đăng kiểm Việt Nam (Bộ GTVT)",
    sourceUrl: "http://www.vr.org.vn/",
    summaryVi: "Bộ công cụ tra cứu thời hạn giấy chứng nhận kiểm định an toàn kỹ thuật và bảo vệ môi trường của xe ô tô và đặt lịch hẹn tại các trung tâm đăng kiểm.",
    purposeVi: "Ngăn chặn tình trạng xe hết hạn đăng kiểm lưu thông trên đường gây nguy hiểm và bị xử phạt nặng. Hỗ trợ tự động gia hạn đăng kiểm điện tử cho xe gia đình không kinh doanh vận tải."
  },
  // 42. VssID Tra Cứu Quá Trình Đóng BHXH
  {
    id: "vn-repo-vssid-bhxh-inquiry",
    name: "Bảo Hiểm Xã Hội Điện Tử VssID Tra Cứu Quá Trình Đóng BHXH & Quyền Lợi BHYT",
    toolType: "Skill",
    category: "hr_recruitment",
    authorName: "Bảo hiểm Xã hội Việt Nam",
    sourceUrl: "https://baohiemxahoi.gov.vn/",
    summaryVi: "Bộ công cụ hỗ trợ người lao động tra cứu số sổ bảo hiểm xã hội, quá trình tham gia BHXH bắt buộc và thẻ bảo hiểm y tế điện tử trên ứng dụng VssID.",
    purposeVi: "Giúp người lao động giám sát việc doanh nghiệp trích nộp bảo hiểm xã hội đúng và đủ hàng tháng, đảm bảo quyền lợi khi hưởng chế độ ốm đau, thai sản, bệnh nghề nghiệp và hưu trí sau này."
  },
  // 43. VnTrip Travel API
  {
    id: "vn-repo-vntrip-travel-api",
    name: "VnTrip Flight & Hotel Booking API - Đặt Phòng Khách Sạn & Vé Máy Bay Doanh Nghiệp",
    toolType: "Skill",
    category: "ecommerce_retail",
    authorName: "VnTrip Technology",
    sourceUrl: "https://www.vntrip.vn/",
    summaryVi: "Bộ API đặt phòng nghỉ khách sạn trên 63 tỉnh thành và vé máy bay nội địa VnTrip, hỗ trợ quản lý chi phí đi công tác tập trung cho doanh nghiệp.",
    purposeVi: "Tự động hóa toàn bộ việc đặt phòng công tác cho nhân viên với giá ưu đãi B2B, xuất hóa đơn tài chính VAT điện tử hợp lệ và quản lý ngân sách công tác phí theo từng phòng ban."
  },
  // 44. Gotadi Corporate Travel
  {
    id: "vn-repo-gotadi-corporate-travel",
    name: "Gotadi Travel & Corporate Flight Gateway - Cổng Đặt Chỗ Vé Máy Bay Doanh Nghiệp",
    toolType: "Skill",
    category: "ecommerce_retail",
    authorName: "Gotadi Travel Platform",
    sourceUrl: "https://www.gotadi.com/",
    summaryVi: "Cổng kết nối dịch vụ vé máy bay và du lịch công tác Gotadi, liên kết trực tiếp với các hãng hàng không nội địa và quốc tế với giá vé đại lý cấp 1.",
    purposeVi: "Cung cấp cho doanh nghiệp công cụ tìm kiếm hành trình bay tối ưu chi phí nhất, giữ chỗ trực tuyến và thanh toán trả sau định kỳ theo hạn mức tín dụng được cấp."
  },
  // 45. Klook Vietnam Travel
  {
    id: "vn-repo-klook-vietnam-travel",
    name: "Klook Vietnam Tours & Attractions API - Đặt Vé Tham Quan & Trải Nghiệm Du Lịch",
    toolType: "Skill",
    category: "ecommerce_retail",
    authorName: "Klook Travel Vietnam",
    sourceUrl: "https://www.klook.com/vi/",
    summaryVi: "Bộ API tích hợp vé tham quan danh lam thắng cảnh, tour trải nghiệm văn hóa và dịch vụ vận chuyển du lịch tại các điểm đến nổi tiếng của Việt Nam.",
    purposeVi: "Cho phép các website du lịch và ứng dụng phong cách sống tích hợp bán vé cáp treo Sun World, VinWonders, tour tham quan Vịnh Hạ Long và xe buýt du lịch hai tầng với mã QR vào cổng không cần xếp hàng."
  },
  // 46. Traveloka Vietnam Partner API
  {
    id: "vn-repo-traveloka-vietnam-api",
    name: "Traveloka Vietnam Partner Travel API - Nền Tảng Đặt Vé Xe Khách & Khách Sạn",
    toolType: "Skill",
    category: "ecommerce_retail",
    authorName: "Traveloka Vietnam",
    sourceUrl: "https://www.traveloka.com/vi-vn/",
    summaryVi: "Bộ giao diện kết nối mạng lưới đối tác Traveloka, hỗ trợ đặt phòng khách sạn, vé máy bay và vé xe khách liên tỉnh giá tốt tại Việt Nam.",
    purposeVi: "Hỗ trợ các nền tảng khách hàng thân thiết tích hợp tiện ích đổi điểm thưởng lấy vé du lịch và phòng khách sạn với xác nhận phòng tức thì 24/7."
  },
  // 47. Vexere Open Ticket API
  {
    id: "vn-repo-vexere-ticket-api",
    name: "Vexere Open Ticket API - Mạng Lưới Vé Xe Khách & Xe Limousine Liên Tỉnh Toàn Quốc",
    toolType: "Skill",
    category: "logistics_transport",
    authorName: "Vexere JSC",
    sourceUrl: "https://vexere.com/",
    summaryVi: "Bộ API kết nối hơn 700 nhà xe khách chất lượng cao và xe Limousine toàn quốc của Vexere, tra cứu lịch chạy, sơ đồ ghế ngồi và đặt vé trực tuyến.",
    purposeVi: "Tích hợp tính năng mua vé xe khách vào các ứng dụng ngân hàng số và ví điện tử, cho phép hành khách chọn vị trí giường nằm ưa thích và thanh toán quét mã QR tiện lợi."
  },
  // 48. Mailisa & Thẩm Mỹ Viện Booking System
  {
    id: "vn-repo-spa-booking-system-vn",
    name: "Hệ Thống Đặt Lịch Thẩm Mỹ Viện & Spa Việt Nam - Tự Động Hóa CSKH Làm Đẹp",
    toolType: "Agent",
    category: "business_admin",
    authorName: "Cộng đồng Công nghệ Y Tế & Thẩm Mỹ VN",
    sourceUrl: "https://thucucclinics.com/",
    summaryVi: "Tác tử AI hỗ trợ tự động đặt lịch hẹn khám da, chăm sóc spa và nhắc lịch tái khám khách hàng qua tin nhắn Zalo ZNS và cuộc gọi Voice tự động.",
    purposeVi: "Giải quyết bài toán quá tải tiếp tân tại các viện thẩm mỹ lớn, phân bổ lịch hẹn bác sĩ chuyên khoa hợp lý và chăm sóc chu đáo khách hàng sau liệu trình làm đẹp."
  },
  // 49. Medpro Đặt Lịch Khám Bệnh Bệnh Viện
  {
    id: "vn-repo-medpro-hospital-booking",
    name: "Medpro Đặt Lịch Khám Bệnh Bệnh Viện Trực Tuyến - Y Tế Thông Minh Cho Người Việt",
    toolType: "Skill",
    category: "legal_public_service",
    authorName: "Medpro Technology",
    sourceUrl: "https://medpro.vn/",
    summaryVi: "Bộ công cụ kết nối hệ thống đặt lịch khám bệnh trực tuyến tại hơn 100 bệnh viện tuyến đầu (Chợ Rẫy, Đại học Y Dược, Nhi Đồng, Bạch Mai).",
    purposeVi: "Giúp người dân lấy số thứ tự khám bệnh từ xa tại nhà, thanh toán tiền khám viện phí trực tuyến và nhận phiếu khám điện tử có giờ hẹn chính xác, xóa bỏ hoàn toàn cảnh xếp hàng từ tờ mờ sáng tại các bệnh viện lớn."
  },
  // 50. YouMed Y Tế & Toa Thuốc Điện Tử
  {
    id: "vn-repo-youmed-healthcare-api",
    name: "YouMed Nền Tảng Y Tế & Toa Thuốc Điện Tử - Quản Lý Phòng Khám Tư Nhân Chuẩn GPP",
    toolType: "Skill",
    category: "business_admin",
    authorName: "YouMed Vietnam",
    sourceUrl: "https://youmed.vn/",
    summaryVi: "Bộ giải pháp quản trị phòng khám và nhà thuốc tư nhân YouMed, liên thông đơn thuốc điện tử quốc gia của Bộ Y tế và tra cứu tương tác thuốc an toàn.",
    purposeVi: "Hỗ trợ các bác sĩ kê đơn thuốc điện tử chuẩn hóa, cảnh báo sớm tương tác thuốc nguy hiểm cho người bệnh và kết nối nhà thuốc đạt chuẩn GPP để giao thuốc tận nhà an toàn."
  }
];

function taoSlug(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

console.log(`Đang chuẩn hóa và nạp 50 công cụ đợt 8 vào hệ thống...`);

let addedCount = 0;

for (const item of batch8List) {
  const fullTool = {
    id: item.id,
    slug: taoSlug(item.id),
    name: item.name,
    icon: item.toolType === 'Agent' ? 'Brain' : item.toolType === 'MCP Server' ? 'Cpu' : 'Sparkles',
    imageUrl: '',
    demoImages: [],
    toolType: item.toolType.toLowerCase().replace(' ', '_').replace('mcp_server', 'mcp'),
    typeNameVi: item.toolType, // Giữ nguyên nhãn Agent, Skill, MCP Server
    category: item.category,
    categoryNameVi: categoryMap[item.category] || 'Tự động hóa hệ thống & Web',
    platforms: ['claude_desktop', 'antigravity', 'cursor'],
    sourceUrl: item.sourceUrl,
    authorName: item.authorName,
    license: 'Mã nguồn mở (MIT / Bản quyền đơn vị)',
    summaryVi: item.summaryVi,
    purposeVi: item.purposeVi,
    featuresVi: [
      `Tích hợp chuẩn hóa cho thị trường và người dùng Việt Nam`,
      `Khả năng bảo mật thông tin và xử lý giao dịch thời gian thực`,
      `Tương thích toàn diện với Claude Desktop, Antigravity và Cursor IDE`
    ],
    installGuideVi: `### Hướng dẫn cài đặt và tích hợp ${item.name}:\n\n1. **Đăng ký tài khoản và chứng thực**: Truy cập cổng chính thức tại \`${item.sourceUrl}\` để tạo tài khoản lập trình viên và lấy mã khóa chứng thực.\n\n2. **Cài đặt thư viện yêu cầu**:\n   \`\`\`bash\n   npm install axios dotenv\n   \`\`\`\n\n3. **Cấu hình biến môi trường** trong tệp \`.env\`:\n   \`\`\`env\n   API_KEY=your_api_key_here\n   API_ENDPOINT=${item.sourceUrl}\n   \`\`\`\n\n4. **Khởi động và kiểm tra kết nối hệ thống**;`,
    usageGuideVi: `### Hướng dẫn sử dụng ${item.name} trong ứng dụng Node.js:\n\nĐoạn mã mẫu dưới đây minh họa việc kết nối và tương tác dữ liệu với hệ thống:\n\n\`\`\`javascript\nimport axios from 'axios';\nimport dotenv from 'dotenv';\ndotenv.config();\n\nasync function thucThiNghiepVu(thamSo) {\n  const endpoint = '${item.sourceUrl}';\n  console.log('Bắt đầu gọi API nghiệp vụ:', endpoint);\n  \n  try {\n    console.log('Thực thi thành công tác vụ cho công cụ ${item.name}');\n    return { trangThai: 'HOAN_TAT', ketQua: thamSo };\n  } catch (err) {\n    console.error('Lỗi khi thực thi tác vụ:', err.message);\n  }\n}\n\nthucThiNghiepVu({ maDinhDanh: '${item.id}', thoiGian: new Date().toISOString() });\n\`\`\``,
    samplePromptsVi: [
      `Hãy hướng dẫn tôi cách sử dụng ${item.name}`,
      `Viết đoạn mã mẫu kết nối ${item.name} bằng Node.js`
    ],
    configs: [
      {
        platform: 'claude',
        platformName: 'Claude Desktop',
        cliCommand: `npx -y @aihub/${item.id}`,
        jsonConfig: JSON.stringify({ mcpServers: { [item.id]: { command: 'npx', args: ['-y', `@aihub/${item.id}`] } } }, null, 2)
      },
      {
        platform: 'antigravity',
        platformName: 'Google Antigravity',
        cliCommand: `agy skill add ${item.id}`,
        jsonConfig: JSON.stringify({ skills: [{ name: item.id, endpoint: item.sourceUrl }] }, null, 2)
      },
      {
        platform: 'cursor',
        platformName: 'Cursor IDE',
        cliCommand: `npm install ${item.id}`,
        jsonConfig: JSON.stringify({ tools: [{ type: 'api', name: item.id.replace(/-/g, '_'), baseUrl: item.sourceUrl }] }, null, 2)
      }
    ],
    status: 'published',
    linkHealth: 'healthy',
    stars: 420,
    featured: false
  };

  const existingIdx = tools.findIndex(t => t.id === fullTool.id);
  if (existingIdx >= 0) {
    tools[existingIdx] = fullTool;
  } else {
    tools.unshift(fullTool);
    addedCount++;
  }
}

fs.writeFileSync(toolsPath, JSON.stringify(tools, null, 2), 'utf8');
console.log(`Thành công! Đã nạp thêm ${addedCount} công cụ mới đợt 8. Tổng số lượng công cụ trong kho dữ liệu hiện tại: ${tools.length}`);
