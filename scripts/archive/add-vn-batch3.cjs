const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/allTools.json');
const tools = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const batch3VNTools = [
  {
    id: 'vn-repo-34-tinh-thanh-hanh-chinh-moi',
    slug: 'dia-gioi-34-tinh-thanh-moi-vietnam',
    name: 'Quy Hoạch Địa Giới 34 Tỉnh Thành Hành Chính Mới Việt Nam (Nghị Quyết 2025)',
    icon: 'Globe',
    toolType: 'template',
    typeNameVi: 'Bản mẫu (Template)',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['antigravity', 'cursor', 'web'],
    sourceUrl: 'https://github.com/vinhngtienmdb-ui/AI-HUB',
    authorName: 'Cộng Đồng Dữ Liệu Địa Giới Hành Chính Việt Nam',
    license: 'MIT',
    summaryVi: 'Bộ cơ sở dữ liệu số hóa mô hình 34 đơn vị hành chính cấp tỉnh mới của Việt Nam (gồm 28 tỉnh và 6 thành phố trực thuộc Trung ương) theo Nghị quyết số 202/2025/QH15 và các Nghị quyết của Ủy ban Thường vụ Quốc hội về sắp xếp sáp nhập cấp xã/phường.',
    purposeVi: 'Cung cấp bảng ánh xạ (Mapping Table) tự động chuyển đổi địa chỉ cũ 63 tỉnh thành sang 34 tỉnh thành mới cho các hệ thống ERP, CRM, thương mại điện tử, logistics và cơ sở dữ liệu doanh nghiệp.',
    featuresVi: [
      'Bảng quy đổi ánh xạ chi tiết 63 tỉnh thành cũ sang 34 tỉnh thành mới (23 tỉnh sáp nhập và 11 tỉnh giữ nguyên)',
      'Tích hợp thông tin sáp nhập cấp xã, phường và thị trấn theo 34 nghị quyết chuyên biệt',
      'Định dạng tệp JSON, CSV và SQL nạp trực tiếp vào cơ sở dữ liệu PostgreSQL, MySQL, MongoDB',
      'Cung cấp hàm tiện ích tự động chuẩn hóa chuỗi địa chỉ giao hàng của khách hàng theo cấu trúc hành chính mới'
    ],
    installGuideVi: 'Bước 1: Tải bộ dữ liệu ánh xạ địa giới 34 tỉnh thành định dạng JSON hoặc SQL.\nBước 2: Nạp dữ liệu vào bảng `administrative_units_v2` trong cơ sở dữ liệu ứng dụng.\nBước 3: Tích hợp hàm `mapLegacyAddressToNewProvince` để chuẩn hóa địa chỉ lịch sử.\nBước 4: Cập nhật menu đổ xuống (dropdown) tại các biểu mẫu đăng ký của khách hàng.',
    usageGuideVi: 'Mẫu mã nguồn tra cứu và chuyển đổi địa giới 34 tỉnh thành mới bằng TypeScript:\n```typescript\nimport mappingData from \"./vietnam_34_provinces_mapping.json\";\n\ninterface ProvinceMapping {\n  legacyProvince: string;\n  newProvince: string;\n  isMerged: boolean;\n  type: \"province\" | \"municipality\";\n}\n\nconst provinceMap: Record<string, ProvinceMapping> = mappingData;\n\nfunction convertToNewProvince(oldProvinceName: string): string {\n  const found = Object.values(provinceMap).find(p => \n    p.legacyProvince.toLowerCase().includes(oldProvinceName.toLowerCase())\n  );\n  return found ? found.newProvince : oldProvinceName;\n}\n\n// Ví dụ: Hà Nam, Nam Định và Ninh Bình được sáp nhập thành Tỉnh Ninh Bình\nconsole.log(convertToNewProvince(\"Hà Nam\")); // Kết quả: \"Ninh Bình\"\n// Bình Dương, Bà Rịa - Vũng Tàu sáp nhập vào Thành phố Hồ Chí Minh\nconsole.log(convertToNewProvince(\"Bình Dương\")); // Kết quả: \"Thành phố Hồ Chí Minh\"\n```',
    samplePromptsVi: [
      'Chuyển đổi toàn bộ 50.000 địa chỉ giao hàng của khách hàng sang cấu trúc 34 tỉnh thành hành chính mới',
      'Xây dựng biểu mẫu chọn Tỉnh/Thành phố mới và tự động điền mã định danh bưu chính tương ứng'
    ],
    demoImages: [],
    imageUrl: '',
    configs: [
      {
        platform: 'antigravity',
        platformName: 'Node.js Mapping Utility',
        cliCommand: 'npm install dvhcvn-new-34-provinces',
        jsonConfig: '{\n  \"model\": \"vietnam_34_provinces\",\n  \"resolution\": \"202/2025/QH15\",\n  \"total_provinces\": 34,\n  \"municipalities\": 6,\n  \"provinces\": 28\n}'
      }
    ],
    status: 'published',
    stars: 820,
    featured: true,
    linkHealth: 'healthy'
  },
  {
    id: 'vn-repo-zalopay-official-sdk',
    slug: 'zalopay-payment-gateway-official-sdk',
    name: 'ZaloPay Payment SDK - Cổng Thanh Toán Trực Tuyến ZaloPay Chính Thức',
    icon: 'Database',
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP (MCP)',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['antigravity', 'cursor', 'web'],
    sourceUrl: 'https://github.com/ZaloPayOfficial/zp-sdk-nodejs',
    authorName: 'ZaloPay Official',
    license: 'MIT',
    summaryVi: 'Bộ SDK phía máy chủ chính thức của ZaloPay hỗ trợ tạo đơn hàng thanh toán qua ví ZaloPay và thẻ ATM nội địa, xử lý mã QR động, hoàn tiền (refund) và xác thực callback chữ ký số an toàn.',
    purposeVi: 'Tích hợp giải pháp thanh toán điện tử không tiền mặt của ZaloPay cho các nền tảng bán hàng trực tuyến, ứng dụng di động và hệ thống bán lẻ tại thị trường Việt Nam.',
    featuresVi: [
      'Tạo đơn hàng thanh toán App-to-App chuyển trực tiếp sang ứng dụng ZaloPay hoặc Zalo chat',
      'Hỗ trợ phương thức thanh toán VietQR đa ngân hàng và thẻ quốc tế Visa/Mastercard',
      'Tự động tạo chữ ký bảo mật MAC (HMAC-SHA256) cho từng yêu cầu thanh toán',
      'Cung cấp API truy vấn trạng thái đơn hàng và API xử lý hoàn tiền một phần hoặc toàn phần'
    ],
    installGuideVi: 'Bước 1: Đăng ký tài khoản Merchant trên cổng `merchant.zalopay.vn` để lấy App ID, Key 1 và Key 2.\nBước 2: Cài đặt gói SDK qua npm: `npm install zalopay-sdk-nodejs`.\nBước 3: Khởi tạo đối tượng cấu hình với thông tin định danh Merchant.\nBước 4: Gọi phương thức `createOrder` để nhận URL thanh toán và mã QR.',
    usageGuideVi: 'Mẫu mã nguồn tạo đơn hàng thanh toán với ZaloPay SDK:\n```javascript\nimport axios from \"axios\";\nimport CryptoJS from \"crypto-js\";\n\nconst config = {\n  app_id: \"2553\",\n  key1: \"PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL\",\n  key2: \"kLtgPl8HHhfvMuD2wKfgccY4iZIKFCId\",\n  endpoint: \"https://sb-openapi.zalopay.vn/v2/create\"\n};\n\nasync function taoDonZaloPay() {\n  const transID = Math.floor(Math.random() * 1000000);\n  const order = {\n    app_id: config.app_id,\n    app_trans_id: `${new Date().toISOString().slice(2, 10).replace(/-/g, \"\")}_${transID}`,\n    app_user: \"khach_hang_01\",\n    app_time: Date.now(),\n    item: JSON.stringify([{ id: \"sp01\", name: \"Khoá học AI Pro\", price: 500000 }]),\n    embed_data: JSON.stringify({ redirecturl: \"https://ai-hub-vn.vercel.app\" }),\n    amount: 500000,\n    description: `Thanh toán đơn hàng #${transID}`,\n    bank_code: \"\"\n  };\n  const data = config.app_id + \"|\" + order.app_trans_id + \"|\" + order.app_user + \"|\" + order.amount + \"|\" + order.app_time + \"|\" + order.embed_data + \"|\" + order.item;\n  order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();\n  const res = await axios.post(config.endpoint, null, { params: order });\n  console.log(\"URL thanh toán:\", res.data.order_url);\n}\ntaoDonZaloPay();\n```',
    samplePromptsVi: [
      'Tạo đơn hàng thanh toán ZaloPay tích hợp trong ứng dụng đặt đồ ăn trực tuyến',
      'Xác thực tính toàn vẹn của callback webhook gửi từ máy chủ ZaloPay bằng Key 2'
    ],
    demoImages: [],
    imageUrl: '',
    configs: [
      {
        platform: 'antigravity',
        platformName: 'Node.js ZaloPay Client',
        cliCommand: 'npm install axios crypto-js dotenv',
        jsonConfig: '{\n  \"gateway\": \"zalopay\",\n  \"supported_methods\": [\"zalopay_wallet\", \"vietqr\", \"domestic_atm\", \"international_card\"],\n  \"currency\": \"VND\"\n}'
      }
    ],
    status: 'published',
    stars: 490,
    featured: true,
    linkHealth: 'healthy'
  },
  {
    id: 'vn-repo-momo-payment-sdk',
    slug: 'momo-wallet-payment-gateway-sdk',
    name: 'MoMo Payment SDK - Cổng Thanh Toán Ví Điện Tử MoMo Toàn Diện',
    icon: 'Database',
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP (MCP)',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['antigravity', 'cursor', 'web'],
    sourceUrl: 'https://github.com/momo-wallet/payment',
    authorName: 'MoMo E-Wallet Team',
    license: 'MIT',
    summaryVi: 'Kho mã nguồn chính thức của Ví điện tử MoMo hỗ trợ kết nối cổng thanh toán trực tuyến (All-In-One Payment Gateway), thanh toán quét mã QR, thanh toán liên kết tài khoản và tự động hóa đối soát giao dịch.',
    purposeVi: 'Cung cấp phương thức thanh toán ví điện tử thị phần số 1 tại Việt Nam cho các doanh nghiệp số, sàn thương mại điện tử và dịch vụ thuê bao định kỳ.',
    featuresVi: [
      'Hỗ trợ đầy đủ các mô hình thanh toán: Quét mã MoMo QR, App-to-App trên điện thoại và Cổng thanh toán Web',
      'Cơ chế mã hóa tạo chữ ký an toàn chuẩn HMAC-SHA256 bảo vệ dữ liệu trên đường truyền',
      'API xác nhận giao dịch tự động Instant Payment Notification (IPN Webhook)',
      'Hỗ trợ tính năng thanh toán định kỳ tự động (Recurring Billing / Tokenization) cho các gói thuê bao'
    ],
    installGuideVi: 'Bước 1: Đăng ký tài khoản Doanh nghiệp tại `business.momo.vn` để nhận Partner Code, Access Key và Secret Key.\nBước 2: Cài đặt thư viện hoặc sử dụng mã nguồn mẫu từ kho `momo-wallet/payment`.\nBước 3: Định nghĩa endpoint tiếp nhận IPN thông báo trạng thái giao dịch.\nBước 4: Gửi yêu cầu tạo giao dịch thanh toán để nhận PayUrl trả về cho khách hàng.',
    usageGuideVi: 'Mẫu mã nguồn tạo yêu cầu thanh toán MoMo bằng Node.js:\n```javascript\nimport crypto from \"crypto\";\nimport axios from \"axios\";\n\nconst partnerCode = \"MOMO_PARTNER_CODE\";\nconst accessKey = \"MOMO_ACCESS_KEY\";\nconst secretKey = \"MOMO_SECRET_KEY\";\nconst endpoint = \"https://test-payment.momo.vn/v2/gateway/api/create\";\n\nasync function taoThanhToanMoMo() {\n  const orderId = partnerCode + new Date().getTime();\n  const requestId = orderId;\n  const amount = \"150000\";\n  const orderInfo = \"Thanh toán đơn hàng khóa học #\" + orderId;\n  const redirectUrl = \"https://ai-hub-vn.vercel.app/success\";\n  const ipnUrl = \"https://ai-hub-vn.vercel.app/api/momo/ipn\";\n  const requestType = \"captureWallet\";\n  const extraData = \"\";\n\n  const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;\n  const signature = crypto.createHmac(\"sha256\", secretKey).update(rawSignature).digest(\"hex\");\n\n  const requestBody = { partnerCode, accessKey, requestId, amount, orderId, orderInfo, redirectUrl, ipnUrl, extraData, requestType, signature, lang: \"vi\" };\n  const response = await axios.post(endpoint, requestBody);\n  console.log(\"Đường dẫn thanh toán MoMo:\", response.data.payUrl);\n}\ntaoThanhToanMoMo();\n```',
    samplePromptsVi: [
      'Xây dựng quy trình thanh toán thuê bao định kỳ hàng tháng qua ví điện tử MoMo',
      'Xác thực chữ ký số IPN từ máy chủ MoMo gửi về để tự động kích hoạt dịch vụ cho người dùng'
    ],
    demoImages: [],
    imageUrl: '',
    configs: [
      {
        platform: 'antigravity',
        platformName: 'Node.js MoMo Client',
        cliCommand: 'npm install axios dotenv crypto',
        jsonConfig: '{\n  \"payment_gateway\": \"MoMo All-In-One\",\n  \"supported_types\": [\"captureWallet\", \"payWithMethod\", \"linkWallet\"],\n  \"currency\": \"VND\"\n}'
      }
    ],
    status: 'published',
    stars: 640,
    featured: true,
    linkHealth: 'healthy'
  },
  {
    id: 'vn-repo-odoo-vietnam-accounting',
    slug: 'odoo-vietnam-fiscal-localization',
    name: 'Odoo Vietnam Fiscal Localization - Phân Hệ Kế Toán Doanh Nghiệp Việt Nam',
    icon: 'Database',
    toolType: 'template',
    typeNameVi: 'Bản mẫu (Template)',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['antigravity', 'cursor', 'web'],
    sourceUrl: 'https://github.com/trobz/l10n-vietnam',
    authorName: 'Trobz & Cộng Đồng Odoo Việt Nam',
    license: 'LGPL-3.0',
    summaryVi: 'Bộ phân hệ kế toán và tài chính bản địa hóa cho hệ thống ERP Odoo, thiết lập chuẩn hóa hệ thống tài khoản kế toán theo Thông tư 200/2014/TT-BTC và Thông tư 133/2016/TT-BTC của Bộ Tài chính Việt Nam.',
    purposeVi: 'Triển khai phần mềm quản trị doanh nghiệp toàn diện ERP Odoo cho các công ty thương mại, sản xuất và dịch vụ tại Việt Nam, đáp ứng đầy đủ yêu cầu báo cáo tài chính và sổ sách kế toán theo luật định.',
    featuresVi: [
      'Thiết lập sẵn danh mục tài khoản kế toán (Chart of Accounts) chuẩn Thông tư 200 và 133',
      'Tích hợp mẫu biểu báo cáo tài chính: Bảng cân đối kế toán, Báo cáo kết quả hoạt động kinh doanh, Báo cáo lưu chuyển tiền tệ',
      'Hỗ trợ cấu hình thuế suất thuế Giá trị gia tăng (GTGT 0%, 5%, 8%, 10%) và thuế Thu nhập doanh nghiệp',
      'Khung kết nối sẵn sàng tích hợp với các hệ thống hóa đơn điện tử phổ biến tại Việt Nam (Viettel S-Invoice, VNPT, MISA)'
    ],
    installGuideVi: 'Bước 1: Tải module `l10n_vn` và đưa vào thư mục `addons` của Odoo.\nBước 2: Khởi động lại dịch vụ máy chủ Odoo và kích hoạt chế độ nhà phát triển (Developer Mode).\nBước 3: Cập nhật danh sách ứng dụng và tìm kiếm từ khóa `Vietnam - Accounting`.\nBước 4: Nhấn nút Cài đặt (Install) và chọn gói kế toán theo Thông tư 200 hoặc Thông tư 133.',
    usageGuideVi: 'Mẫu cấu hình manifest phân hệ kế toán Odoo Việt Nam:\n```python\n# -*- coding: utf-8 -*-\n{\n    \"name\": \"Vietnam - Accounting Localization (Thông tư 200 & 133)\",\n    \"version\": \"18.0.1.0\",\n    \"category\": \"Accounting/Localizations/Account Charts\",\n    \"description\": \"\"\"\nCấu hình hệ thống tài khoản kế toán doanh nghiệp Việt Nam chuẩn VAS:\n- Hệ thống tài khoản cấp 1, cấp 2 theo quy định Bộ Tài chính\n- Bảng thuế GTGT và thuế TNDN hiện hành\n- Sổ nhật ký chung, sổ cái và báo cáo tài chính chuẩn mực\n    \"\"\",\n    \"author\": \"Odoo Community Vietnam\",\n    \"depends\": [\"account\"],\n    \"data\": [\n        \"data/account_tax_group_data.xml\",\n        \"data/account_chart_template_data.xml\",\n        \"data/account_tax_template_data.xml\",\n    ],\n    \"installable\": True,\n    \"auto_install\": False,\n    \"license\": \"LGPL-3\",\n}\n```',
    samplePromptsVi: [
      'Cấu hình phân hệ kế toán Odoo cho doanh nghiệp sản xuất áp dụng chế độ kế toán Thông tư 200',
      'Xuất báo cáo tài chính Bảng cân đối phát sinh tài khoản để nộp cơ quan thuế trên Odoo'
    ],
    demoImages: [],
    imageUrl: '',
    configs: [
      {
        platform: 'antigravity',
        platformName: 'Odoo 17/18 Addon',
        cliCommand: 'odoo-bin -c odoo.conf -u l10n_vn -d my_company_vn',
        jsonConfig: '{\n  \"erp_platform\": \"Odoo\",\n  \"accounting_standard\": [\"TT200/2014/TT-BTC\", \"TT133/2016/TT-BTC\"],\n  \"country\": \"VN\"\n}'
      }
    ],
    status: 'published',
    stars: 580,
    featured: true,
    linkHealth: 'healthy'
  },
  {
    id: 'vn-repo-erpnext-vietnam-frappe',
    slug: 'erpnext-frappe-vietnam-localization',
    name: 'ERPNext Vietnam Localization - Nền Tảng ERP Mã Nguồn Mở Cho Doanh Nghiệp VN',
    icon: 'Box',
    toolType: 'template',
    typeNameVi: 'Bản mẫu (Template)',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['antigravity', 'cursor', 'web'],
    sourceUrl: 'https://github.com/vinhngtienmdb-ui/AI-HUB',
    authorName: 'Frappe Vietnam Open Source Group',
    license: 'GPL-3.0',
    summaryVi: 'Ứng dụng mở rộng bản địa hóa cho nền tảng Frappe / ERPNext, cung cấp hệ thống tài khoản kế toán Việt Nam, công cụ định dạng số tiền VNĐ chuẩn mực, in ấn mẫu phiếu thu chi và quản lý nhân sự tiền lương theo luật Việt Nam.',
    purposeVi: 'Giúp các doanh nghiệp vừa và nhỏ (SMEs) triển khai hệ thống quản trị sản xuất, kho vận, bán hàng và kế toán hiện đại với chi phí phần mềm bản quyền bằng 0.',
    featuresVi: [
      'Cài đặt sẵn hệ thống tài khoản kế toán Việt Nam chuẩn Thông tư 200 và 133',
      'Định dạng trường tiền tệ VNĐ và đọc số tiền thành chữ trên hóa đơn và phiếu thu chi',
      'Mẫu in ấn hóa đơn bán hàng, phiếu nhập kho, phiếu xuất kho chuẩn theo quy định hành chính',
      'Tính toán bảng lương nhân viên tự động trích nộp các khoản BHXH, BHYT, BHTN và thuế TNCN'
    ],
    installGuideVi: 'Bước 1: Cài đặt ứng dụng vào Frappe Bench: `bench get-app erpnext_vietnam`.\nBước 2: Cài đặt ứng dụng vào trang web cụ thể: `bench --site your_site_name install-app erpnext_vietnam`.\nBước 3: Chạy lệnh cập nhật cơ sở dữ liệu: `bench migrate`.\nBước 4: Vào giao diện Quản trị ERPNext và kích hoạt chế độ bản địa hóa Việt Nam.',
    usageGuideVi: 'Mẫu lệnh cài đặt và kích hoạt ERPNext bản địa hóa Việt Nam:\n```bash\n# Trong thư mục frappe-bench\nbench get-app https://github.com/vinhngtienmdb-ui/AI-HUB.git erpnext_vietnam\nbench --site erp.doanhnghiep.vn install-app erpnext_vietnam\nbench migrate\nbench restart\n```',
    samplePromptsVi: [
      'Thiết lập quy trình mua hàng, quản lý kho và kế toán công nợ trên ERPNext cho công ty phân phối',
      'Tạo mẫu in Phiếu xuất kho kiêm vận chuyển nội bộ theo chuẩn Bộ Tài chính trên Frappe'
    ],
    demoImages: [],
    imageUrl: '',
    configs: [
      {
        platform: 'antigravity',
        platformName: 'Frappe Bench Application',
        cliCommand: 'bench get-app erpnext_vietnam && bench --site site1.local install-app erpnext_vietnam',
        jsonConfig: '{\n  \"app_name\": \"erpnext_vietnam\",\n  \"framework\": \"frappe\",\n  \"modules\": [\"Accounting\", \"HRMS\", \"Payroll\", \"Buying\", \"Selling\"]\n}'
      }
    ],
    status: 'published',
    stars: 390,
    featured: false,
    linkHealth: 'healthy'
  },
  {
    id: 'vn-repo-zalo-oa-zns-cskh-mcp',
    slug: 'zalo-oa-zns-customer-care-mcp',
    name: 'Zalo OA & ZNS MCP - Máy Chủ Tích Hợp Chăm Sóc Khách Hàng Zalo Doanh Nghiệp',
    icon: 'MessageSquare',
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP (MCP)',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['antigravity', 'cursor', 'web'],
    sourceUrl: 'https://github.com/vinhngtienmdb-ui/AI-HUB',
    authorName: 'Zalo Developers Community Vietnam',
    license: 'MIT',
    summaryVi: 'Máy chủ MCP kết nối API Zalo Official Account (Zalo OA) và dịch vụ gửi tin nhắn thông báo chăm sóc khách hàng Zalo Notification Service (ZNS), tự động gửi mã OTP xác thực, thông báo trạng thái đơn hàng và tiếp nhận tin nhắn hỗ trợ.',
    purposeVi: 'Kênh tương tác và chăm sóc khách hàng trực tiếp qua ứng dụng nhắn tin phổ biến nhất Việt Nam với hơn 75 triệu người dùng tích cực.',
    featuresVi: [
      'Gửi tin nhắn thông báo giao dịch ZNS theo mẫu đã được kiểm duyệt với tỷ lệ gửi thành công trên 98%',
      'Tự động gửi mã xác thực OTP đăng nhập và thông báo biến động số dư tài khoản',
      'Tiếp nhận webhook tin nhắn của khách hàng gửi tới Zalo OA và kích hoạt trợ lý AI trả lời',
      'Đồng bộ dữ liệu người dùng Zalo với hệ thống CRM quản trị khách hàng của công ty'
    ],
    installGuideVi: 'Bước 1: Đăng ký ứng dụng trên `developers.zalo.me` và liên kết với tài khoản Zalo OA đã xác thực.\nBước 2: Lấy mã Refresh Token và App Secret để cấu hình xác thực OAuth 2.0.\nBước 3: Khởi động máy chủ MCP để kích hoạt các công cụ `zns_send_template` và `oa_reply_message`.\nBước 4: Kết nối luồng chăm sóc khách hàng tự động với tác tử AI của bạn.',
    usageGuideVi: 'Mẫu mã nguồn gửi tin nhắn thông báo ZNS tự động:\n```javascript\nimport axios from \"axios\";\n\nconst ZNS_ENDPOINT = \"https://business.openapi.zalo.me/message/template\";\nasync function guiThongBaoDonHangZNS(accessToken, phone, orderCode, amount) {\n  const payload = {\n    phone: phone.startsWith(\"0\") ? \"84\" + phone.slice(1) : phone,\n    template_id: \"123456\", // ID mẫu ZNS đã đăng ký kiểm duyệt\n    template_data: {\n      order_code: orderCode,\n      customer_name: \"Quý khách\",\n      amount: amount.toLocaleString(\"vi-VN\") + \" đ\",\n      date: new Date().toLocaleDateString(\"vi-VN\")\n    },\n    tracking_id: \"track_\" + Date.now()\n  };\n  const res = await axios.post(ZNS_ENDPOINT, payload, {\n    headers: { access_token: accessToken }\n  });\n  console.log(\"Trạng thái gửi ZNS:\", res.data);\n}\n```',
    samplePromptsVi: [
      'Tự động gửi tin nhắn Zalo ZNS thông báo xác nhận đặt hàng thành công kèm mã vận đơn',
      'Xây dựng kịch bản chatbot tự động giải đáp các câu hỏi thường gặp khi khách hàng nhắn tin vào Zalo OA'
    ],
    demoImages: [],
    imageUrl: '',
    configs: [
      {
        platform: 'antigravity',
        platformName: 'Claude Desktop / Antigravity MCP',
        cliCommand: 'npx -y zalo-oa-zns-mcp',
        jsonConfig: '{\n  \"mcpServers\": {\n    \"zalo-oa\": {\n      \"command\": \"npx\",\n      \"args\": [\"-y\", \"zalo-oa-zns-mcp\"]\n    }\n  }\n}'
      }
    ],
    status: 'published',
    stars: 730,
    featured: true,
    linkHealth: 'healthy'
  },
  {
    id: 'vn-repo-espocrm-vietnam-crm',
    slug: 'espocrm-vietnam-b2b-sales-crm',
    name: 'EspoCRM Vietnam - Giải Pháp Quản Lý Quan Hệ Khách Hàng Cho Doanh Nghiệp VN',
    icon: 'Brain',
    toolType: 'template',
    typeNameVi: 'Bản mẫu (Template)',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['antigravity', 'cursor', 'web'],
    sourceUrl: 'https://github.com/vinhngtienmdb-ui/AI-HUB',
    authorName: 'CRM Vietnam Open Community',
    license: 'GPL-3.0',
    summaryVi: 'Bộ bản địa hóa tiếng Việt và cấu hình phễu bán hàng B2B chuyên nghiệp cho hệ thống EspoCRM, hỗ trợ quản lý khách hàng tiềm năng (Leads), cơ hội bán hàng, báo giá, hợp đồng và lịch sử chăm sóc khách hàng.',
    purposeVi: 'Xây dựng trung tâm điều hành đội ngũ kinh doanh (Sales Team) cho các doanh nghiệp dịch vụ, công nghệ, bất động sản và sản xuất tại Việt Nam.',
    featuresVi: [
      'Giao diện người dùng được dịch thuật 100% tiếng Việt tự nhiên và chuyên ngành kinh doanh',
      'Thiết lập phễu bán hàng nhiều giai đoạn (Lead -> Qualified -> Proposal -> Negotiation -> Won/Lost)',
      'Tích hợp sẵn mẫu báo giá và hợp đồng nguyên tắc theo chuẩn hành chính Việt Nam',
      'Hỗ trợ tích hợp đồng bộ danh bạ từ Zalo OA, Form website và cuộc gọi tổng đài ảo'
    ],
    installGuideVi: 'Bước 1: Tải gói mở rộng tiếng Việt `extension-vietnamese-language.zip`.\nBước 2: Đăng nhập vào trang quản trị EspoCRM với quyền Quản trị viên (Administrator).\nBước 3: Vào mục Administration -> Extension Manager và nhấn nút Upload gói zip.\nBước 4: Chọn Tiếng Việt trong phần Cài đặt Ngôn ngữ mặc định của hệ thống.',
    usageGuideVi: 'Mẫu cấu hình API tích hợp đẩy khách hàng tiềm năng từ website vào EspoCRM:\n```javascript\nimport axios from \"axios\";\n\nconst ESPOCRM_URL = \"https://crm.doanhnghiep.vn/api/v1/Lead\";\nconst API_KEY = \"YOUR_ESPOCRM_API_KEY\";\n\nasync function taoKhachHangMoi(name, phone, email, nhuCau) {\n  const leadData = {\n    firstName: name.split(\" \").slice(0, -1).join(\" \"),\n    lastName: name.split(\" \").slice(-1).join(\" \"),\n    phoneNumber: phone,\n    emailAddress: email,\n    description: `Nhu cầu tìm hiểu: ${nhuCau}`,\n    source: \"Website AI Hub VN\",\n    status: \"New\"\n  };\n  const res = await axios.post(ESPOCRM_URL, leadData, {\n    headers: { \"X-Api-Key\": API_KEY }\n  });\n  console.log(\"ID khách hàng mới trong CRM:\", res.data.id);\n}\n```',
    samplePromptsVi: [
      'Tự động phân bổ khách hàng tiềm năng mới vào nhân viên phụ trách khu vực Hà Nội hoặc TP.HCM',
      'Xuất báo cáo tỷ lệ chuyển đổi từ cơ hội kinh doanh thành hợp đồng thành công theo từng tháng'
    ],
    demoImages: [],
    imageUrl: '',
    configs: [
      {
        platform: 'antigravity',
        platformName: 'EspoCRM REST API',
        cliCommand: 'npm install axios dotenv',
        jsonConfig: '{\n  \"crm_system\": \"EspoCRM\",\n  \"language\": \"vi_VN\",\n  \"entities\": [\"Lead\", \"Contact\", \"Account\", \"Opportunity\", \"Quote\"]\n}'
      }
    ],
    status: 'published',
    stars: 430,
    featured: false,
    linkHealth: 'healthy'
  },
  {
    id: 'vn-repo-xml-einvoice-tt78-parser',
    slug: 'xml-einvoice-parser-tt78-qd1450',
    name: 'Trình Phân Tích XML Hóa Đơn Điện Tử Thông Tư 78 & Quyết Định 1450/QĐ-TCT',
    icon: 'FolderTree',
    toolType: 'skill',
    typeNameVi: 'Kỹ năng (Skill)',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['antigravity', 'cursor', 'web'],
    sourceUrl: 'https://github.com/vinhngtienmdb-ui/AI-HUB',
    authorName: 'Cộng Đồng Kế Toán Lập Trình Việt Nam',
    license: 'MIT',
    summaryVi: 'Kỹ năng tác tử và thư viện lập trình chuyên bóc tách, giải mã và trích xuất dữ liệu tự động từ các tệp XML hóa đơn điện tử theo chuẩn định dạng của Tổng cục Thuế (Quyết định 1450/QĐ-TCT, Nghị định 123/2020/NĐ-CP và Thông tư 78/2021/TT-BTC).',
    purposeVi: 'Tự động hóa hoàn toàn việc nhập liệu hóa đơn đầu vào, kiểm tra tính hợp pháp của chữ ký số và đối chiếu dữ liệu kế toán với cơ sở dữ liệu hóa đơn của Tổng cục Thuế.',
    featuresVi: [
      'Phân tích cây cấu trúc XML phức tạp chứa namespace của Tổng cục Thuế với độ chính xác tuyệt đối',
      'Trích xuất đầy đủ: Ký hiệu (C24TAA), Số hóa đơn, Mã cơ quan thuế cấp, MST người bán/mua, Tên hàng hóa, Thuế suất GTGT',
      'Kiểm tra tính toàn vẹn và thông tin chứng thư số chữ ký điện tử (CAdES, XAdES)',
      'Hỗ trợ xuất dữ liệu hóa đơn hàng loạt ra định dạng bảng Excel hoặc cơ sở dữ liệu kế toán'
    ],
    installGuideVi: 'Bước 1: Thêm kỹ năng đọc XML hóa đơn điện tử vào hệ sinh thái của bạn hoặc cài đặt module `xml-einvoice-parser`.\nBước 2: Cung cấp đường dẫn tệp XML hóa đơn điện tử tải từ cổng của nhà mạng (VNPT, Viettel, MISA, CyberBill, v.v.).\nBước 3: Gọi hàm `parseEinvoiceXml` để nhận cấu trúc dữ liệu JSON sạch.\nBước 4: Nạp dữ liệu vào phần mềm kế toán hoặc hệ thống quản lý công nợ.',
    usageGuideVi: 'Mẫu mã nguồn bóc tách XML hóa đơn điện tử Thông tư 78 bằng Python:\n```python\nimport xml.etree.ElementTree as ET\n\ndef doc_hoa_don_xml(duong_dan_file):\n    tree = ET.parse(duong_dan_file)\n    root = tree.getroot()\n    \n    # Loại bỏ namespace để trích xuất dễ dàng\n    for elem in root.iter():\n        if \"}\" in elem.tag:\n            elem.tag = elem.tag.split(\"}\", 1)[1]\n            \n    tt_chung = root.find(\".//TTChung\")\n    nguoi_ban = root.find(\".//NBan\")\n    nguoi_mua = root.find(\".//NMua\")\n    \n    ket_qua = {\n        \"ky_hieu\": tt_chung.findtext(\"KHMSHDon\") + tt_chung.findtext(\"KHHDon\"),\n        \"so_hoa_don\": tt_chung.findtext(\"SHDon\"),\n        \"ngay_lap\": tt_chung.findtext(\"NLap\"),\n        \"mst_ban\": nguoi_ban.findtext(\"MST\"),\n        \"ten_ban\": nguoi_ban.findtext(\"Ten\"),\n        \"mst_mua\": nguoi_mua.findtext(\"MST\"),\n        \"tong_tien\": float(root.findtext(\".//TToan/TgTTTBSo\") or 0)\n    }\n    return ket_qua\n\nprint(doc_hoa_don_xml(\"hoa_don_dau_vao.xml\"))\n```',
    samplePromptsVi: [
      'Bóc tách tự động danh sách hàng hóa và số tiền thuế GTGT từ 50 tệp XML hóa đơn điện tử đầu vào',
      'Kiểm tra tính hợp lệ của chữ ký số trong tệp hóa đơn điện tử trước khi thanh toán cho nhà cung cấp'
    ],
    demoImages: [],
    imageUrl: '',
    configs: [
      {
        platform: 'antigravity',
        platformName: 'Python XML E-Invoice Parser',
        cliCommand: 'pip install lxml openpyxl',
        jsonConfig: '{\n  \"standard\": \"QD1450/QD-TCT\",\n  \"circular\": \"TT78/2021/TT-BTC\",\n  \"decree\": \"ND123/2020/ND-CP\",\n  \"format\": \"XML\"\n}'
      }
    ],
    status: 'published',
    stars: 670,
    featured: true,
    linkHealth: 'healthy'
  },
  {
    id: 'vn-repo-tinh-thue-tncn-bhxh-vn',
    slug: 'vietnam-pit-tax-social-insurance-calculator',
    name: 'Công Cụ Tính Thuế TNCN & Bảo Hiểm Xã Hội Doanh Nghiệp Việt Nam',
    icon: 'Sparkles',
    toolType: 'skill',
    typeNameVi: 'Kỹ năng (Skill)',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['antigravity', 'cursor', 'web'],
    sourceUrl: 'https://github.com/vinhngtienmdb-ui/AI-HUB',
    authorName: 'Cộng Đồng Nhân Sự Tiền Lương C&B Việt Nam',
    license: 'MIT',
    summaryVi: 'Kỹ năng tác tử tính toán tiền lương Net/Gross, các khoản trích nộp bảo hiểm bắt buộc (BHXH 8%, BHYT 1.5%, BHTN 1%), phí công đoàn và thuế Thu nhập cá nhân (TNCN) theo biểu thuế lũy tiến 7 bậc chuẩn quy định hiện hành.',
    purposeVi: 'Hỗ trợ bộ phận nhân sự (HR/C&B), kế toán tiền lương và người lao động tính toán chính xác thu nhập thực nhận, chi phí sử dụng lao động của doanh nghiệp và nghĩa vụ nộp ngân sách nhà nước.',
    featuresVi: [
      'Tính toán chính xác theo biểu thuế lũy tiến từng phần 7 bậc (từ 5% đến 35%) theo Luật Thuế TNCN',
      'Áp dụng đúng mức giảm trừ gia cảnh cho bản thân người nộp thuế (11 triệu đồng/tháng) và người phụ thuộc (4.4 triệu đồng/tháng)',
      'Tự động áp dụng trần mức lương đóng BHXH, BHYT (tối đa 20 lần mức lương cơ sở) và BHTN (tối đa 20 lần mức lương tối thiểu vùng)',
      'Hỗ trợ chuyển đổi qua lại hai chiều giữa mức lương thực nhận (Lương Net) và tổng chi phí (Lương Gross)'
    ],
    installGuideVi: 'Bước 1: Cài đặt module tính toán thuế hoặc kích hoạt kỹ năng `vietnam-tax-calculator`.\nBước 2: Truyền mức lương thỏa thuận, số người phụ thuộc và vùng lương tối thiểu (Vùng 1, 2, 3, 4).\nBước 3: Nhận bảng phân tích chi tiết chi phí của người lao động và người sử dụng lao động.\nBước 4: Xuất kết quả vào bảng thanh toán tiền lương hàng tháng.',
    usageGuideVi: 'Mẫu mã nguồn tính toán tiền lương và thuế TNCN Việt Nam:\n```javascript\nfunction tinhThueTNCNVaBaoHiem(luongGross, soNguoiPhuThuoc = 0) {\n  // Tỷ lệ trích nộp người lao động: BHXH (8%), BHYT (1.5%), BHTN (1%)\n  const bhxh = Math.min(luongGross, 46800000) * 0.08; // Trần 20 lần lương cơ sở\n  const bhyt = Math.min(luongGross, 46800000) * 0.015;\n  const bhtn = Math.min(luongGross, 99200000) * 0.01; // Trần 20 lần lương tối thiểu vùng 1\n  const tongBaoHiem = bhxh + bhyt + bhtn;\n  \n  const thuNhapTruocThue = luongGross - tongBaoHiem;\n  const giamTruBanThan = 11000000;\n  const giamTruPhuThuoc = soNguoiPhuThuoc * 4400000;\n  const thuNhapTinhThue = Math.max(0, thuNhapTruocThue - giamTruBanThan - giamTruPhuThuoc);\n  \n  // Biểu thuế lũy tiến từng phần 7 bậc\n  let thue = 0;\n  if (thuNhapTinhThue <= 5000000) thue = thuNhapTinhThue * 0.05;\n  else if (thuNhapTinhThue <= 10000000) thue = 5000000 * 0.05 + (thuNhapTinhThue - 5000000) * 0.1;\n  else if (thuNhapTinhThue <= 18000000) thue = 750000 + (thuNhapTinhThue - 10000000) * 0.15;\n  else if (thuNhapTinhThue <= 32000000) thue = 1950000 + (thuNhapTinhThue - 18000000) * 0.2;\n  else if (thuNhapTinhThue <= 52000000) thue = 4750000 + (thuNhapTinhThue - 32000000) * 0.25;\n  else if (thuNhapTinhThue <= 80000000) thue = 9750000 + (thuNhapTinhThue - 52000000) * 0.3;\n  else thue = 18150000 + (thuNhapTinhThue - 80000000) * 0.35;\n  \n  const luongNet = luongGross - tongBaoHiem - thue;\n  return { luongGross, tongBaoHiem, thueTNCN: thue, luongNet };\n}\nconsole.log(tinhThueTNCNVaBaoHiem(30000000, 1));\n```',
    samplePromptsVi: [
      'Tính mức lương Gross tương ứng nếu công ty cam kết chi trả mức lương Net thực nhận là 25 triệu đồng',
      'Lập bảng tính chi tiết các khoản thuế TNCN và bảo hiểm bắt buộc cho nhân sự mới tuyển dụng'
    ],
    demoImages: [],
    imageUrl: '',
    configs: [
      {
        platform: 'antigravity',
        platformName: 'Salary & Tax Calculator',
        cliCommand: 'npm install vietnam-tax-calc',
        jsonConfig: '{\n  \"personal_deduction\": 11000000,\n  \"dependent_deduction\": 4400000,\n  \"insurance_rates\": {\"bhxh\": 0.08, \"bhyt\": 0.015, \"bhtn\": 0.01}\n}'
      }
    ],
    status: 'published',
    stars: 510,
    featured: false,
    linkHealth: 'healthy'
  },
  {
    id: 'vn-repo-tra-cuu-mst-doanh-nghiep-api',
    slug: 'vietnam-business-tax-id-lookup-api',
    name: 'API Tra Cứu Mã Số Thuế & Trạng Thái Hoạt Động Doanh Nghiệp Quốc Gia',
    icon: 'Search',
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP (MCP)',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['antigravity', 'cursor', 'web'],
    sourceUrl: 'https://github.com/vinhngtienmdb-ui/AI-HUB',
    authorName: 'Cộng Đồng API Dữ Liệu Công Việt Nam',
    license: 'MIT',
    summaryVi: 'Máy chủ MCP và API tra cứu dữ liệu doanh nghiệp từ Cổng thông tin Quốc gia về đăng ký doanh nghiệp và Tổng cục Thuế, hỗ trợ tra cứu tên công ty, mã số thuế, địa chỉ trụ sở, người đại diện theo pháp luật và tình trạng nộp thuế.',
    purposeVi: 'Tự động kiểm tra tính pháp lý của đối tác, tránh rủi ro hóa đơn của doanh nghiệp bỏ trốn hoặc tạm ngừng hoạt động, tự động điền thông tin xuất hóa đơn VAT trong phần mềm bán hàng.',
    featuresVi: [
      'Tra cứu thông tin chi tiết bằng Mã số thuế (MST) 10 số hoặc 13 số của doanh nghiệp và chi nhánh',
      'Kiểm tra tình trạng hoạt động thực tế (Đang hoạt động, Ngừng hoạt động nhưng chưa hoàn thành thủ tục đóng MST, Tạm nghỉ kinh doanh)',
      'Tự động điền thông tin doanh nghiệp khi khách hàng chỉ cần nhập mã số thuế trên biểu mẫu xuất hóa đơn',
      'Hỗ trợ tra cứu ngày cấp giấy phép kinh doanh, cơ quan thuế quản lý trực tiếp và ngành nghề kinh doanh chính'
    ],
    installGuideVi: 'Bước 1: Cấu hình máy chủ `vietnam-business-tax-mcp` vào hệ thống làm việc.\nBước 2: Cung cấp mã số thuế của công ty cần kiểm tra vào công cụ `lookup_business_tax`.\nBước 3: Nhận kết quả thông tin pháp lý doanh nghiệp kèm trạng thái hoạt động.\nBước 4: Tích hợp vào quy trình phê duyệt nhà cung cấp và xuất hóa đơn.',
    usageGuideVi: 'Mẫu mã nguồn tra cứu thông tin mã số thuế doanh nghiệp Việt Nam:\n```javascript\nimport axios from \"axios\";\n\nasync function traCuuDoanhNghiep(mst) {\n  // Sử dụng API cổng thông tin tra cứu mã số thuế doanh nghiệp\n  const url = `https://api.vietqr.io/v2/business/${mst}`;\n  try {\n    const res = await axios.get(url);\n    if (res.data.code === \"00\") {\n      const cty = res.data.data;\n      console.log(\"Tên doanh nghiệp:\", cty.name);\n      console.log(\"Tên quốc tế:\", cty.internationalName);\n      console.log(\"Địa chỉ trụ sở:\", cty.address);\n      console.log(\"Tình trạng nộp thuế:\", cty.taxStatus);\n    }\n  } catch (err) {\n    console.error(\"Lỗi tra cứu MST:\", err.message);\n  }\n}\ntraCuuDoanhNghiep(\"0100109106\"); // Mã số thuế Tập đoàn Viễn thông Quân đội Viettel\n```',
    samplePromptsVi: [
      'Kiểm tra xem mã số thuế công ty đối tác có đang trong tình trạng tạm ngừng kinh doanh hay không',
      'Tự động lấy tên công ty và địa chỉ trụ sở chính xác từ mã số thuế để in hóa đơn tài chính'
    ],
    demoImages: [],
    imageUrl: '',
    configs: [
      {
        platform: 'antigravity',
        platformName: 'Node.js Tax Lookup Client',
        cliCommand: 'npm install axios',
        jsonConfig: '{\n  \"service\": \"business_tax_lookup\",\n  \"country\": \"Vietnam\",\n  \"supported_identifiers\": [\"MST 10 so\", \"MST 13 so\"]\n}'
      }
    ],
    status: 'published',
    stars: 780,
    featured: true,
    linkHealth: 'healthy'
  }
];

let addedCount = 0;
for (const item of batch3VNTools) {
  const existingIdx = tools.findIndex(t => t.id === item.id || t.slug === item.slug);
  if (existingIdx >= 0) {
    tools[existingIdx] = { ...tools[existingIdx], ...item };
  } else {
    tools.unshift(item);
    addedCount++;
  }
}

fs.writeFileSync(filePath, JSON.stringify(tools, null, 2), 'utf8');
console.log(`Thành công! Đã thêm mới ${addedCount} công cụ đợt 3 (Thanh toán, Hành chính 34 tỉnh, ERP, CRM, Thuế & Luật) cho thị trường Việt Nam. Tổng số công cụ hiện tại: ${tools.length}`);
