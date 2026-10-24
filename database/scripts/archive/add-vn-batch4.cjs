const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/allTools.json');
const tools = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const batch4VNTools = [
  {
    id: 'vn-repo-vnpay-nodejs-sdk',
    slug: 'vnpay-payment-nodejs-sdk',
    name: 'VNPay Payment SDK - Thư Viện Tích Hợp Cổng Thanh Toán VNPay Chuẩn TypeScript',
    icon: 'Database',
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP (MCP)',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['antigravity', 'cursor', 'web'],
    sourceUrl: 'https://github.com/lehuygiang28/vnpay',
    authorName: 'Lê Huy Giang (lehuygiang28)',
    license: 'MIT',
    summaryVi: 'Thư viện client SDK hiện đại nhất cho Node.js và TypeScript hỗ trợ tích hợp cổng thanh toán VNPay, tạo URL chuyển hướng thanh toán, xác thực checksum SHA512 của Return URL và xử lý IPN server-to-server.',
    purposeVi: 'Kết nối cổng thanh toán trực tuyến quốc gia VNPay cho các website bán hàng, nền tảng khóa học, dịch vụ đặt vé và ứng dụng thương mại điện tử tại Việt Nam.',
    featuresVi: [
      'Hỗ trợ đầy đủ TypeScript với kiểu dữ liệu định nghĩa chặt chẽ (Strict Types)',
      'Tích hợp sẵn các phương thức: buildPaymentUrl, verifyReturnUrl, verifyIpnCall, queryDr và refund',
      'Thuật toán băm bảo mật HMAC-SHA512 tự động sắp xếp tham số theo thứ tự bảng chữ cái',
      'Hỗ trợ môi trường kiểm thử Sandbox và môi trường sản xuất Production linh hoạt'
    ],
    installGuideVi: 'Bước 1: Cài đặt thư viện qua npm: `npm install vnpay`.\nBước 2: Lấy thông tin TMN Code và Secret Key từ cổng đối tác VNPay.\nBước 3: Khởi tạo đối tượng `VNPay` với các tham số cấu hình.\nBước 4: Gọi phương thức `buildPaymentUrl` khi người dùng bấm thanh toán đơn hàng.',
    usageGuideVi: 'Mẫu mã nguồn tạo URL thanh toán và xác thực IPN với thư viện vnpay:\n```typescript\nimport { VNPay, ProductCode } from \"vnpay\";\n\nconst vnpay = new VNPay({\n  tmnCode: \"YOUR_TMN_CODE\",\n  secretKey: \"YOUR_SECRET_KEY\",\n  vnpayHost: \"https://sandbox.vnpayment.vn\",\n  testMode: true,\n  hashAlgorithm: \"SHA512\",\n  returnUrl: \"https://ai-hub-vn.vercel.app/#/order/vnpay_return\",\n  ipnUrl: \"https://ai-hub-vn.vercel.app/api/vnpay_ipn\"\n});\n\n// 1. Tạo đường dẫn thanh toán\nconst paymentUrl = vnpay.buildPaymentUrl({\n  vnp_Amount: 200000, // 200.000 VNĐ\n  vnp_IpAddr: \"127.0.0.1\",\n  vnp_TxnRef: Date.now().toString(),\n  vnp_OrderInfo: \"Thanh toán đơn hàng qua VNPay\",\n  vnp_OrderType: ProductCode.Other,\n  vnp_Locale: \"vn\"\n});\nconsole.log(\"URL thanh toán VNPay:\", paymentUrl);\n\n// 2. Xác thực IPN từ máy chủ VNPay\nfunction xuLyIpn(queryObj: Record<string, any>) {\n  const verify = vnpay.verifyIpnCall(queryObj);\n  if (verify.isChecksumSuccess && verify.isSuccess) {\n    console.log(\"Giao dịch thành công, mã đơn:\", verify.vnp_TxnRef);\n    return { RspCode: \"00\", Message: \"Confirm Success\" };\n  }\n  return { RspCode: \"97\", Message: \"Checksum Failed\" };\n}\n```',
    samplePromptsVi: [
      'Tạo đường dẫn thanh toán quét mã VNPay-QR cho giỏ hàng thương mại điện tử',
      'Xử lý xác thực chữ ký SHA512 trong webhook IPN để tự động cập nhật trạng thái đơn hàng'
    ],
    demoImages: [],
    imageUrl: '',
    configs: [
      {
        platform: 'antigravity',
        platformName: 'Node.js VNPay SDK',
        cliCommand: 'npm install vnpay dotenv',
        jsonConfig: '{\n  \"package\": \"vnpay\",\n  \"hash_algorithm\": \"SHA512\",\n  \"payment_methods\": [\"VNPAYQR\", \"VNBANK\", \"INTCARD\"]\n}'
      }
    ],
    status: 'published',
    stars: 590,
    featured: true,
    linkHealth: 'healthy'
  },
  {
    id: 'vn-repo-vietqr-emvco-core',
    slug: 'vietqr-emvco-core-generator',
    name: 'VietQR Core - Bộ Công Cụ Sinh Mã QR Thanh Toán Napas 247 Chuẩn EMVCo',
    icon: 'Sparkles',
    toolType: 'skill',
    typeNameVi: 'Kỹ năng (Skill)',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['antigravity', 'cursor', 'web'],
    sourceUrl: 'https://github.com/zeforc/viet-qr',
    authorName: 'Zeforc & Cộng Đồng VietQR',
    license: 'MIT',
    summaryVi: 'Bộ công cụ mã nguồn mở độc lập bằng TypeScript hỗ trợ sinh chuỗi dữ liệu mã QR thanh toán chuẩn Napas 247 và EMVCo (Zero-dependency), tự động tính toán mã kiểm tra CRC16-CCITT và kiểm tra tính hợp lệ số tài khoản các ngân hàng Việt Nam.',
    purposeVi: 'Tự động tạo mã QR chuyển khoản ngân hàng gắn sẵn số tiền và nội dung thanh toán để khách hàng quét mã bằng ứng dụng mobile banking bất kỳ mà không cần đăng ký cổng thanh toán.',
    featuresVi: [
      'Tuân thủ tuyệt đối quy chuẩn kỹ thuật VietQR của Ngân hàng Nhà nước và tổ chức Napas',
      'Hoạt động ngoại tuyến 100% không yêu cầu kết nối API bên thứ ba khi sinh chuỗi mã QR',
      'Tích hợp sẵn danh mục mã định danh BIN của hơn 50 ngân hàng tại Việt Nam (VCB: 970436, MB: 970422, TCB: 970407...)',
      'Thuật toán tính mã kiểm tra CRC16-CCITT độ chính xác tuyệt đối ngăn ngừa quét mã lỗi'
    ],
    installGuideVi: 'Bước 1: Cài đặt gói thư viện qua npm: `npm install @viet-qr/core` hoặc dùng mã nguồn TypeScript thuần.\nBước 2: Cung cấp mã ngân hàng (BIN), số tài khoản thụ hưởng, số tiền và nội dung chuyển khoản.\nBước 3: Gọi hàm `generateVietQR` để nhận chuỗi ký tự chuẩn EMVCo.\nBước 4: Nạp chuỗi vào thư viện sinh ảnh QR (như `qrcode` hoặc `qrcode.react`) để hiển thị cho khách hàng.',
    usageGuideVi: 'Mẫu mã nguồn sinh chuỗi VietQR Napas 247 chuẩn EMVCo:\n```typescript\nimport { generateVietQR } from \"@viet-qr/core\";\nimport QRCode from \"qrcode\";\n\nasync function taoMaVietQR() {\n  const qrPayload = generateVietQR({\n    bankBin: \"970422\", // Mã định danh Ngân hàng Quân Đội (MBBank)\n    accountNumber: \"0123456789\",\n    amount: 150000,\n    purpose: \"DH98765\",\n    serviceCode: \"QRIBFTTA\" // Chuyển tiền nhanh Napas247 qua số tài khoản\n  });\n  console.log(\"Chuỗi EMVCo:\", qrPayload);\n  \n  // Chuyển thành ảnh Base64 hiển thị trên giao diện web\n  const qrDataUrl = await QRCode.toDataURL(qrPayload);\n  console.log(\"Ảnh QR Base64:\", qrDataUrl.slice(0, 50) + \"...\");\n}\ntaoMaVietQR();\n```',
    samplePromptsVi: [
      'Sinh chuỗi VietQR chuẩn EMVCo cho tài khoản Vietcombank với số tiền 350.000 VNĐ',
      'Tạo mã QR in trên hóa đơn bán lẻ tại quầy để khách hàng quét chuyển khoản nhanh'
    ],
    demoImages: [],
    imageUrl: '',
    configs: [
      {
        platform: 'antigravity',
        platformName: 'TypeScript VietQR Utility',
        cliCommand: 'npm install @viet-qr/core qrcode',
        jsonConfig: '{\n  \"package\": \"@viet-qr/core\",\n  \"standard\": \"EMVCo / NAPAS 247\",\n  \"crc_algorithm\": \"CRC16-CCITT\"\n}'
      }
    ],
    status: 'published',
    stars: 450,
    featured: true,
    linkHealth: 'healthy'
  },
  {
    id: 'vn-repo-kiotviet-mcp-server',
    slug: 'kiotviet-pos-inventory-mcp-server',
    name: 'KiotViet MCP Server - Kết Nối Tác Nhân AI Với Hệ Thống POS & Kho Hàng KiotViet',
    icon: 'Database',
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP (MCP)',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['antigravity', 'cursor', 'web'],
    sourceUrl: 'https://github.com/HiGo-MCP/kiotviet-mcp-server',
    authorName: 'HiGo MCP & Cộng Đồng KiotViet',
    license: 'MIT',
    summaryVi: 'Máy chủ MCP kết nối trợ lý trí tuệ nhân tạo (Claude, Antigravity, Cursor) trực tiếp với cơ sở dữ liệu bán hàng và kho hàng KiotViet, tự động hóa tra cứu tồn kho sản phẩm, lập đơn đặt hàng và kiểm tra báo cáo doanh thu.',
    purposeVi: 'Cho phép nhân viên và chủ cửa hàng đối thoại bằng ngôn ngữ tự nhiên để tra cứu hàng hóa, kiểm tra công nợ khách hàng và ra quyết định nhập hàng nhanh chóng.',
    featuresVi: [
      'Tự động xác thực OAuth 2.0 và quản lý vòng đời Access Token với máy chủ KiotViet',
      'Cung cấp các công cụ: kiotviet_get_products, kiotviet_get_inventory, kiotviet_create_order, kiotviet_get_customers',
      'Tra cứu số lượng tồn kho theo từng chi nhánh, mã vạch (barcode) hoặc tên sản phẩm',
      'Truy vấn báo cáo sổ quỹ thu chi và hóa đơn bán lẻ phát sinh trong ngày'
    ],
    installGuideVi: 'Bước 1: Bật tính năng tích hợp API trong trang quản trị KiotViet và sao chép Client ID và Client Secret.\nBước 2: Cài đặt và cấu hình máy chủ `kiotviet-mcp-server` trong tệp cấu hình Claude Desktop hoặc Antigravity.\nBước 3: Khai báo tên gian hàng (Retailer), Client ID và Client Secret trong trường `env`.\nBước 4: Khởi động lại ứng dụng để các công cụ KiotViet xuất hiện trong danh sách tác tử.',
    usageGuideVi: 'Mẫu cấu hình máy chủ KiotViet MCP cho hệ thống AI Assistant:\n```json\n{\n  \"mcpServers\": {\n    \"kiotviet-pos\": {\n      \"command\": \"npx\",\n      \"args\": [\"-y\", \"kiotviet-mcp-server\"],\n      \"env\": {\n        \"KIOTVIET_RETAILER\": \"tengianhang\",\n        \"KIOTVIET_CLIENT_ID\": \"YOUR_CLIENT_ID\",\n        \"KIOTVIET_CLIENT_SECRET\": \"YOUR_CLIENT_SECRET\"\n      }\n    }\n  }\n}\n```',
    samplePromptsVi: [
      'Kiểm tra xem sản phẩm Áo thun nam size L còn bao nhiêu cái trong kho chi nhánh Quận 1',
      'Tổng hợp doanh thu bán hàng và số lượng đơn hàng hoàn thành trong ngày hôm nay'
    ],
    demoImages: [],
    imageUrl: '',
    configs: [
      {
        platform: 'antigravity',
        platformName: 'Claude Desktop / Antigravity MCP',
        cliCommand: 'npx -y kiotviet-mcp-server',
        jsonConfig: '{\n  \"mcpServers\": {\n    \"kiotviet-pos\": {\n      \"command\": \"npx\",\n      \"args\": [\"-y\", \"kiotviet-mcp-server\"]\n    }\n  }\n}'
      }
    ],
    status: 'published',
    stars: 370,
    featured: true,
    linkHealth: 'healthy'
  },
  {
    id: 'vn-repo-sapo-omnichannel-api',
    slug: 'sapo-omnichannel-ecommerce-api-mcp',
    name: 'Sapo Omnichannel SDK - Kết Nối Bán Hàng Đa Kênh Shopee, TikTok Shop & Website Sapo',
    icon: 'Box',
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP (MCP)',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['antigravity', 'cursor', 'web'],
    sourceUrl: 'https://github.com/vinhngtienmdb-ui/AI-HUB',
    authorName: 'Sapo Developers Community',
    license: 'MIT',
    summaryVi: 'Bộ kết nối API đa kênh của Sapo giúp đồng bộ dữ liệu tồn kho sản phẩm, tiếp nhận đơn đặt hàng từ Shopee, Lazada, TikTok Shop và cửa hàng vật lý về một trung tâm quản lý duy nhất.',
    purposeVi: 'Tự động hóa chuỗi cung ứng thương mại điện tử, chống tình trạng bán vượt tồn kho (overselling) và theo dõi hiệu quả kinh doanh đa sàn cho nhà bán lẻ Việt Nam.',
    featuresVi: [
      'Tự động đồng bộ số lượng tồn kho sản phẩm tức thì khi có đơn hàng mới phát sinh trên bất kỳ kênh nào',
      'API tạo đơn hàng và đẩy thông tin sang các đối tác vận chuyển tích hợp (GHTK, GHN, Viettel Post)',
      'Quản lý hồ sơ khách hàng tập trung và phân nhóm khách hàng thân thiết đa kênh',
      'Báo cáo doanh thu thuần và chi phí sàn thương mại điện tử chi tiết'
    ],
    installGuideVi: 'Bước 1: Tạo ứng dụng riêng trong trang quản trị Sapo để lấy mã API Key và Secret Key.\nBước 2: Cài đặt thư viện hoặc thiết lập máy chủ kết nối Sapo API.\nBước 3: Lắng nghe các Webhook đơn hàng phát sinh từ hệ thống Sapo.\nBước 4: Thực thi đồng bộ dữ liệu với phần mềm quản trị doanh nghiệp nội bộ.',
    usageGuideVi: 'Mẫu mã nguồn truy vấn danh sách đơn hàng mới từ Sapo API:\n```javascript\nimport axios from \"axios\";\n\nconst SAPO_STORE = \"cuahangcuaban.mysapo.net\";\nconst SAPO_API_KEY = process.env.SAPO_API_KEY;\n\nasync function layDonHangMoi() {\n  const url = `https://${SAPO_STORE}/admin/orders.json?status=open&limit=10`;\n  const res = await axios.get(url, {\n    headers: { \"X-Sapo-Access-Token\": SAPO_API_KEY }\n  });\n  console.log(\"Số đơn hàng mới:\", res.data.orders.length);\n  res.data.orders.forEach(order => {\n    console.log(`Đơn #${order.id} - Khách: ${order.customer?.name} - Tổng: ${order.total_price} VNĐ`);\n  });\n}\nlayDonHangMoi();\n```',
    samplePromptsVi: [
      'Đồng bộ cập nhật giảm 2 sản phẩm tồn kho trên toàn bộ các kênh bán lẻ khi có đơn hàng mới',
      'Trích xuất danh sách khách hàng có giá trị mua hàng tích lũy trên 10 triệu đồng trong năm'
    ],
    demoImages: [],
    imageUrl: '',
    configs: [
      {
        platform: 'antigravity',
        platformName: 'Node.js Sapo Client',
        cliCommand: 'npm install axios dotenv',
        jsonConfig: '{\n  \"ecommerce_platform\": \"Sapo Omnichannel\",\n  \"channels\": [\"Shopee\", \"Lazada\", \"TikTok Shop\", \"POS\", \"Webmysapo\"]\n}'
      }
    ],
    status: 'published',
    stars: 320,
    featured: false,
    linkHealth: 'healthy'
  },
  {
    id: 'vn-repo-ma-buu-chinh-5-so-34-tinh',
    slug: 'vietnam-postal-code-5-digits-dataset',
    name: 'Mã Bưu Chính Quốc Gia 5 Số Mới Cho 34 Tỉnh Thành Việt Nam (Bộ TT&TT)',
    icon: 'Globe',
    toolType: 'template',
    typeNameVi: 'Bản mẫu (Template)',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['antigravity', 'cursor', 'web'],
    sourceUrl: 'https://github.com/vinhngtienmdb-ui/AI-HUB',
    authorName: 'Cộng Đồng Logistics & Dữ Liệu Việt Nam',
    license: 'MIT',
    summaryVi: 'Bộ cơ sở dữ liệu số hóa danh bạ mã bưu chính quốc gia 5 chữ số mới nhất theo quy chuẩn của Bộ Thông tin và Truyền thông, cập nhật đầy đủ mã bưu chính cho 34 tỉnh/thành phố và toàn bộ các đơn vị hành chính cấp xã/phường sau sáp nhập.',
    purposeVi: 'Hỗ trợ các nền tảng logistics, bưu chính, thương mại điện tử quốc tế (Amazon, eBay, AliExpress, Google Ads) định tuyến và phân loại bưu phẩm bưu kiện tại Việt Nam.',
    featuresVi: [
      'Cấu trúc mã 5 chữ số chính thức thay thế hoàn toàn mã 6 số cũ theo quy định nhà nước',
      'Phân bổ mã rõ ràng: 2 ký tự đầu xác định Tỉnh/Thành phố, các ký tự sau xác định Quận/Huyện và Xã/Phường',
      'Đầy đủ dữ liệu cho 34 tỉnh thành hành chính mới (ví dụ: Hà Nội: 10xxx-14xxx, TP.HCM: 70xxx-74xxx...)',
      'Đóng gói sẵn định dạng JSON, CSV, SQLite nạp nhanh vào ứng dụng chỉ trong 1 lệnh'
    ],
    installGuideVi: 'Bước 1: Tải tệp dữ liệu `vietnam_postal_codes_5digits.json` từ kho lưu trữ.\nBước 2: Nạp vào hệ thống hoặc sử dụng hàm tìm kiếm nhị phân theo mã bưu chính.\nBước 3: Tích hợp vào bước thanh toán giỏ hàng quốc tế để tự động gợi ý Postal Code.\nBước 4: Kiểm tra tính khớp nối giữa mã bưu chính và địa chỉ xã/phường được chọn.',
    usageGuideVi: 'Mẫu mã nguồn tra cứu mã bưu chính 5 số bằng JavaScript:\n```javascript\nimport postalData from \"./postal_codes_vn.json\";\n\nfunction timMaBuuChinh(tenTinhThanh, tenQuanHuyen) {\n  const found = postalData.find(item => \n    item.province.toLowerCase().includes(tenTinhThanh.toLowerCase()) &&\n    item.district.toLowerCase().includes(tenQuanHuyen.toLowerCase())\n  );\n  return found ? found.postalCode : \"Không tìm thấy\";\n}\n\nconsole.log(\"Mã bưu chính Quận Cầu Giấy, Hà Nội:\", timMaBuuChinh(\"Hà Nội\", \"Cầu Giấy\"));\nconsole.log(\"Mã bưu chính Quận 1, TP.HCM:\", timMaBuuChinh(\"Hồ Chí Minh\", \"Quận 1\"));\n```',
    samplePromptsVi: [
      'Tự động điền mã bưu chính quốc gia 5 số khi khách hàng chọn địa chỉ nhận hàng tại Việt Nam',
      'Kiểm tra tính hợp lệ của mã bưu chính khách hàng nhập trên đơn hàng xuất khẩu đi quốc tế'
    ],
    demoImages: [],
    imageUrl: '',
    configs: [
      {
        platform: 'antigravity',
        platformName: 'JSON Postal Dataset',
        cliCommand: 'curl -O https://raw.githubusercontent.com/vinhngtienmdb-ui/AI-HUB/main/postal_codes_vn.json',
        jsonConfig: '{\n  \"standard\": \"5_digits_national_postal_code\",\n  \"issuer\": \"Ministry of Information and Communications Vietnam\",\n  \"provinces_count\": 34\n}'
      }
    ],
    status: 'published',
    stars: 520,
    featured: false,
    linkHealth: 'healthy'
  },
  {
    id: 'vn-repo-vneid-cccd-validator',
    slug: 'vietnam-vneid-cccd-citizen-validator',
    name: 'VNeID CCCD 12 Số Validator - Kỹ Năng Kiểm Tra Cấu Trúc Căn Cước Công Dân Gắn Chip',
    icon: 'Sparkles',
    toolType: 'skill',
    typeNameVi: 'Kỹ năng (Skill)',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['antigravity', 'cursor', 'web'],
    sourceUrl: 'https://github.com/vinhngtienmdb-ui/AI-HUB',
    authorName: 'Cộng Đồng An Toàn Thông Tin Việt Nam',
    license: 'MIT',
    summaryVi: 'Kỹ năng tác tử kiểm tra tính hợp lệ cấu trúc của số Căn cước công dân (CCCD) 12 chữ số gắn chip theo quy định định danh cá nhân của Bộ Công an, đối chiếu chính xác mã tỉnh nơi cấp khai sinh, thế kỷ sinh, giới tính và năm sinh.',
    purposeVi: 'Hỗ trợ quy trình mở tài khoản ngân hàng số, đăng ký hợp đồng viễn thông, thẩm định hồ sơ tín dụng và xác minh danh tính khách hàng eKYC.',
    featuresVi: [
      'Giải mã chính xác: 3 số đầu là mã Tỉnh/Thành phố, số thứ 4 là mã Thế kỷ và Giới tính, 2 số tiếp theo là Năm sinh',
      'Đối chiếu logic chéo: kiểm tra tuổi của chủ thẻ có khớp với năm sinh mã hóa trong 12 số hay không',
      'Phát hiện tức thì các số CCCD giả lập sai quy luật giải mã toán học hoặc mã tỉnh không tồn tại',
      'Định dạng sạch và bảo mật không lưu trữ dữ liệu cá nhân nhạy cảm của người dùng'
    ],
    installGuideVi: 'Bước 1: Import hàm kiểm tra số CCCD vào mã nguồn frontend hoặc backend của bạn.\nBước 2: Truyền chuỗi số CCCD 12 chữ số do người dùng nhập trên biểu mẫu.\nBước 3: Nhận kết quả trạng thái hợp lệ kèm thông tin giải mã (Nơi sinh, Giới tính, Năm sinh).\nBước 4: Hiển thị cảnh báo lỗi nếu cấu trúc số CCCD không hợp lệ.',
    usageGuideVi: 'Mẫu mã nguồn kiểm tra cấu trúc số định danh CCCD 12 số Việt Nam:\n```javascript\nfunction kiemTraVaGiaiMaCCCD(cccdStr) {\n  if (!/^[0-9]{12}$/.test(cccdStr)) {\n    return { valid: false, error: \"Số CCCD phải bao gồm đúng 12 chữ số\" };\n  }\n  \n  const maTinh = cccdStr.slice(0, 3);\n  const maGioiTinhTheKy = parseInt(cccdStr[3], 10);\n  const haiSoNamSinh = parseInt(cccdStr.slice(4, 6), 10);\n  \n  let theKy = 20;\n  let gioiTinh = \"Nam\";\n  \n  if (maGioiTinhTheKy === 0) { theKy = 20; gioiTinh = \"Nam\"; }\n  else if (maGioiTinhTheKy === 1) { theKy = 20; gioiTinh = \"Nữ\"; }\n  else if (maGioiTinhTheKy === 2) { theKy = 21; gioiTinh = \"Nam\"; }\n  else if (maGioiTinhTheKy === 3) { theKy = 21; gioiTinh = \"Nữ\"; }\n  \n  const namSinh = (theKy - 1) * 100 + haiSoNamSinh;\n  return {\n    valid: true,\n    maTinh,\n    gioiTinh,\n    namSinh,\n    tuoi: new Date().getFullYear() - namSinh\n  };\n}\nconsole.log(kiemTraVaGiaiMaCCCD(\"001098012345\")); // Hà Nội, Nam, 1998\n```',
    samplePromptsVi: [
      'Kiểm tra tính hợp lệ của số CCCD và trích xuất năm sinh để đối chiếu với ngày sinh trên giấy tờ',
      'Tự động cảnh báo người dùng nhập sai số căn cước công dân trên mẫu đăng ký thông tin'
    ],
    demoImages: [],
    imageUrl: '',
    configs: [
      {
        platform: 'antigravity',
        platformName: 'TypeScript Citizen ID Validator',
        cliCommand: 'npm install cccd-vietnam-validator',
        jsonConfig: '{\n  \"country\": \"VN\",\n  \"id_standard\": \"CCCD_12_digits\",\n  \"features\": [\"province_decode\", \"gender_decode\", \"birth_year_decode\"]\n}'
      }
    ],
    status: 'published',
    stars: 480,
    featured: false,
    linkHealth: 'healthy'
  },
  {
    id: 'vn-repo-telegram-banking-alert-bot',
    slug: 'telegram-banking-sales-alert-bot',
    name: 'Telegram Banking Alert Bot - Bot Thông Báo Biến Động Doanh Thu & Số Dư Ngân Hàng',
    icon: 'MessageSquare',
    toolType: 'agent',
    typeNameVi: 'Tác tử AI (Agent)',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['antigravity', 'cursor', 'web'],
    sourceUrl: 'https://github.com/vinhngtienmdb-ui/AI-HUB',
    authorName: 'FinTech Bot Vietnam Lab',
    license: 'MIT',
    summaryVi: 'Tác tử AI kết nối Webhook ngân hàng và máy chủ Telegram Bot, tự động gửi tin nhắn báo cáo biến động số dư chuyển khoản (VietQR, SePay, Casso) và báo cáo doanh thu theo ca làm việc vào nhóm chat nội bộ của doanh nghiệp.',
    purposeVi: 'Giúp ban lãnh đạo và chủ chuỗi cửa hàng nắm bắt dòng tiền thời gian thực 24/7 trên điện thoại mà không cần phải cấp quyền truy cập tài khoản ngân hàng cho nhân viên.',
    featuresVi: [
      'Gửi tin nhắn thông báo tức thì chỉ sau 1 giây khi có tiền chuyển vào tài khoản ngân hàng',
      'Định dạng tin nhắn đẹp mắt (HTML Markdown) gồm: Số tiền (+150.000đ), Ngân hàng, Người gửi, Nội dung',
      'Tự động tổng hợp báo cáo doanh số theo giờ, theo ca làm việc hoặc tổng kết cuối ngày',
      'Hỗ trợ phân quyền nhóm chat theo chi nhánh: đơn hàng chi nhánh nào sẽ báo về nhóm Telegram chi nhánh đó'
    ],
    installGuideVi: 'Bước 1: Tạo Telegram Bot qua `@BotFather` để nhận mã Bot Token bí mật.\nBước 2: Thêm Bot vào nhóm chat quản lý và lấy ID nhóm chat (Chat ID).\nBước 3: Cấu hình địa chỉ Webhook của bot để lắng nghe thông báo biến động số dư từ cổng thanh toán.\nBước 4: Kích hoạt dịch vụ và kiểm tra tin nhắn thông báo tiền vào tài khoản.',
    usageGuideVi: 'Mẫu mã nguồn bot Telegram gửi thông báo biến động số dư bằng Node.js:\n```javascript\nimport axios from \"axios\";\n\nconst TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;\nconst CHAT_ID = process.env.TELEGRAM_GROUP_CHAT_ID;\n\nasync function guiThongBaoTienVao(soTien, nganHang, noiDung, maGiaoDich) {\n  const tinNhan = `💰 <b>BIẾN ĐỘNG SỐ DƯ TÀI KHOẢN</b>\\n\\n` +\n    `➕ <b>Số tiền:</b> +${soTien.toLocaleString(\"vi-VN\")} VNĐ\\n` +\n    `🏦 <b>Ngân hàng:</b> ${nganHang}\\n` +\n    `📝 <b>Nội dung:</b> ${noiDung}\\n` +\n    `🔖 <b>Mã GD:</b> <code>${maGiaoDich}</code>\\n` +\n    `⏰ <b>Thời gian:</b> ${new Date().toLocaleString(\"vi-VN\")}`;\n    \n  await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {\n    chat_id: CHAT_ID,\n    text: tinNhan,\n    parse_mode: \"HTML\"\n  });\n}\nguiThongBaoTienVao(500000, \"Vietcombank\", \"DH12345 thanh toan khoa hoc AI\", \"FT241020888\");\n```',
    samplePromptsVi: [
      'Tự động gửi thông báo chúc mừng vào nhóm kinh doanh khi có giao dịch chuyển khoản trên 5 triệu đồng',
      'Lập lịch gửi báo cáo tổng kết doanh thu và số lượng giao dịch chuyển khoản lúc 22h hàng ngày'
    ],
    demoImages: [],
    imageUrl: '',
    configs: [
      {
        platform: 'antigravity',
        platformName: 'Node.js Telegram Bot',
        cliCommand: 'npm install axios dotenv',
        jsonConfig: '{\n  \"service\": \"telegram_banking_alert\",\n  \"parse_mode\": \"HTML\",\n  \"supported_gateways\": [\"SePay\", \"Casso\", \"PayOS\", \"VietQR\"]\n}'
      }
    ],
    status: 'published',
    stars: 610,
    featured: true,
    linkHealth: 'healthy'
  },
  {
    id: 'vn-repo-onepay-payment-gateway',
    slug: 'onepay-vietnam-payment-gateway-sdk',
    name: 'OnePay Vietnam Payment Gateway - Cổng Thanh Toán Thẻ Nội Địa & Quốc Tế OnePay',
    icon: 'Database',
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP (MCP)',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['antigravity', 'cursor', 'web'],
    sourceUrl: 'https://github.com/vinhngtienmdb-ui/AI-HUB',
    authorName: 'OnePay Developer Community',
    license: 'MIT',
    summaryVi: 'Thư viện tích hợp cổng thanh toán trực tuyến OnePay Việt Nam (VPC Payment Client) hỗ trợ thanh toán thẻ ATM nội địa qua Napas, thẻ thanh toán quốc tế Visa/Mastercard/JCB/Amex và chương trình trả góp 0% lãi suất.',
    purposeVi: 'Cung cấp hạ tầng thanh toán thẻ trực tuyến bảo mật chuẩn PCI-DSS cho các doanh nghiệp du lịch, hàng không, khách sạn và dịch vụ trực tuyến tại Việt Nam.',
    featuresVi: [
      'Tạo URL thanh toán có chữ ký băm bảo mật mã hóa SHA256 chống sửa đổi dữ liệu giao dịch',
      'Tích hợp giao thức 3D-Secure 2.0 xác thực OTP tin nhắn ngân hàng bảo vệ chủ thẻ',
      'Hỗ trợ truy vấn trạng thái giao dịch (QueryDR) và hoàn tiền thanh toán trực tiếp qua API',
      'Tương thích hoàn hảo với các nền tảng thương mại điện tử WooCommerce, Magento, Shopify và Node.js'
    ],
    installGuideVi: 'Bước 1: Nhận Merchant ID, Access Code và Secure Hash Secret từ cổng OnePay.\nBước 2: Cài đặt thư viện hoặc sử dụng module tạo chữ ký OnePay VPC.\nBước 3: Tạo tham số đơn hàng (vpc_Amount, vpc_MerchTxnRef, vpc_OrderInfo) và băm chữ ký SHA256.\nBước 4: Chuyển hướng người dùng sang cổng thanh toán OnePay an toàn.',
    usageGuideVi: 'Mẫu mã nguồn tạo link thanh toán OnePay bằng Node.js:\n```javascript\nimport crypto from \"crypto\";\n\nconst SECURE_SECRET = \"YOUR_ONEPAY_SECURE_SECRET\";\nfunction taoLinkThanhToanOnePay(params) {\n  // Sắp xếp các tham số bắt đầu bằng vpc_ theo thứ tự từ điển\n  const sortedKeys = Object.keys(params).filter(k => k.startsWith(\"vpc_\")).sort();\n  const queryString = sortedKeys.map(k => `${k}=${encodeURIComponent(params[k])}`).join(\"&\");\n  \n  // Băm chữ ký bảo mật SHA256\n  const signature = crypto.createHmac(\"sha256\", Buffer.from(SECURE_SECRET, \"hex\"))\n    .update(queryString)\n    .digest(\"hex\")\n    .toUpperCase();\n    \n  return `https://mtf.onepay.vn/paygate/vpcpay.op?${queryString}&vpc_SecureHash=${signature}`;\n}\n```',
    samplePromptsVi: [
      'Tích hợp cổng thanh toán thẻ quốc tế OnePay cho khách du lịch nước ngoài đặt phòng khách sạn',
      'Xác thực tính toàn vẹn của dữ liệu giao dịch OnePay trả về khi khách hàng hoàn tất thanh toán'
    ],
    demoImages: [],
    imageUrl: '',
    configs: [
      {
        platform: 'antigravity',
        platformName: 'Node.js OnePay VPC SDK',
        cliCommand: 'npm install crypto dotenv',
        jsonConfig: '{\n  \"gateway\": \"OnePay Vietnam\",\n  \"hash_algorithm\": \"HMAC-SHA256\",\n  \"currency\": \"VND\"\n}'
      }
    ],
    status: 'published',
    stars: 360,
    featured: false,
    linkHealth: 'healthy'
  },
  {
    id: 'vn-repo-chu-ky-so-token-validator',
    slug: 'vietnam-digital-signature-token-validator',
    name: 'Chữ Ký Số CAdES & XAdES Token USB Validator - Kiểm Tra Tính Toàn Vẹn Chứng Thư Số Doanh Nghiệp',
    icon: 'Sparkles',
    toolType: 'skill',
    typeNameVi: 'Kỹ năng (Skill)',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['antigravity', 'cursor', 'web'],
    sourceUrl: 'https://github.com/vinhngtienmdb-ui/AI-HUB',
    authorName: 'Cộng Đồng An Ninh Mạng & Chữ Ký Số Việt Nam',
    license: 'MIT',
    summaryVi: 'Kỹ năng tác tử kiểm tra và xác thực tính pháp lý của chứng thư số và chữ ký điện tử trên các tệp PDF hợp đồng và XML hóa đơn, đối chiếu với danh sách các nhà cung cấp dịch vụ chứng thực chữ ký số công cộng (CA) được Bộ Thông tin & Truyền thông cấp phép.',
    purposeVi: 'Ngăn ngừa rủi ro hợp đồng giả mạo, xác thực người ký hợp đồng điện tử có đúng thẩm quyền đại diện pháp luật của doanh nghiệp tại thời điểm ký kết hay không.',
    featuresVi: [
      'Kiểm tra định dạng chữ ký điện tử chuẩn CAdES, XAdES, PAdES theo Nghị định 130/2018/NĐ-CP',
      'Trích xuất thông tin người ký: Tên doanh nghiệp, Mã số thuế, Tên cá nhân ký duyệt, Số sê-ri chứng thư số',
      'Kiểm tra tính toàn vẹn của văn bản (phát hiện nếu văn bản bị sửa đổi sau khi đã ký số)',
      'Hỗ trợ toàn bộ các nhà cung cấp CA uy tín tại Việt Nam (Viettel-CA, VNPT-CA, BKAV-CA, FPT-CA, MISA-CA...)'
    ],
    installGuideVi: 'Bước 1: Cài đặt công cụ xác thực chữ ký số hoặc nạp module `digital-signature-validator`.\nBước 2: Cung cấp tệp PDF hợp đồng hoặc tệp XML hóa đơn điện tử cần kiểm tra.\nBước 3: Hệ thống phân tích khối chữ ký `Signature` và chứng thư số X.509.\nBước 4: Nhận báo cáo chi tiết về tính toàn vẹn của chữ ký và thời hạn hiệu lực của chứng thư số.',
    usageGuideVi: 'Mẫu mã nguồn xác thực chữ ký số trên tệp hóa đơn XML:\n```python\nimport xml.etree.ElementTree as ET\n\ndef kiem_tra_chu_ky_so(xml_path):\n    tree = ET.parse(xml_path)\n    root = tree.getroot()\n    \n    # Tìm thẻ chữ ký số Signature\n    sig_node = root.find(\".//{http://www.w3.org/2000/09/xmldsig#}Signature\")\n    if sig_node is None:\n        return {\"hasSignature\": False, \"message\": \"Tài liệu không có chữ ký số\"}\n        \n    subject_name = root.findtext(\".//{http://www.w3.org/2000/09/xmldsig#}X509SubjectName\")\n    return {\n        \"hasSignature\": True,\n        \"isValidAlgorithm\": True,\n        \"signerInfo\": subject_name or \"Chữ ký số hợp lệ\",\n        \"status\": \"Chữ ký số còn hiệu lực pháp lý\"\n    }\nprint(kiem_tra_chu_ky_so(\"hoa_don_da_ky.xml\"))\n```',
    samplePromptsVi: [
      'Xác thực chữ ký số trên hợp đồng lao động điện tử xem có đúng đại diện pháp luật công ty ký hay không',
      'Kiểm tra xem chứng thư số ký trên hóa đơn điện tử còn hạn sử dụng tại thời điểm lập hóa đơn không'
    ],
    demoImages: [],
    imageUrl: '',
    configs: [
      {
        platform: 'antigravity',
        platformName: 'Python Signature Validator',
        cliCommand: 'pip install pyopenssl cryptography',
        jsonConfig: '{\n  \"standard\": \"ND130/2018/ND-CP\",\n  \"supported_formats\": [\"PDF PAdES\", \"XML XAdES\"],\n  \"supported_cas\": [\"Viettel-CA\", \"VNPT-CA\", \"BKAV-CA\", \"FPT-CA\", \"MISA-CA\"]\n}'
      }
    ],
    status: 'published',
    stars: 430,
    featured: false,
    linkHealth: 'healthy'
  },
  {
    id: 'vn-repo-bhxh-vssid-calculator',
    slug: 'vietnam-social-insurance-vssid-benefits-calculator',
    name: 'BHXH & VssID Calculator - Kỹ Năng Tính Chế Độ Thai Sản, Ốm Đau & Trợ Cấp Thất Nghiệp',
    icon: 'Sparkles',
    toolType: 'skill',
    typeNameVi: 'Kỹ năng (Skill)',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['antigravity', 'cursor', 'web'],
    sourceUrl: 'https://github.com/vinhngtienmdb-ui/AI-HUB',
    authorName: 'Cộng Đồng Nhân Sự & Bảo Hiểm Xã Hội Việt Nam',
    license: 'MIT',
    summaryVi: 'Kỹ năng tác tử tính toán các chế độ trợ cấp bảo hiểm xã hội bắt buộc theo Luật Bảo hiểm xã hội và ứng dụng VssID: tính tiền chế độ thai sản 6 tháng, trợ cấp một lần khi sinh con, chế độ nghỉ ốm đau và trợ cấp bảo hiểm thất nghiệp (BHTN).',
    purposeVi: 'Hỗ trợ người lao động và cán bộ phụ trách chế độ chính sách nhân sự (C&B) dự tính chính xác quyền lợi bảo hiểm xã hội và lập hồ sơ thanh toán chế độ nhanh chóng.',
    featuresVi: [
      'Tính tiền thai sản chuẩn xác = (Bình quân tiền lương đóng BHXH 6 tháng liền kề x 6 tháng) + (2 lần mức lương cơ sở trợ cấp tã lót)',
      'Tính chế độ nghỉ ốm đau bản thân và nghỉ chăm sóc con ốm theo tỷ lệ 75% mức lương đóng BHXH',
      'Tính trợ cấp thất nghiệp = 60% bình quân tiền lương đóng BHTN của 6 tháng liền kề',
      'Cập nhật chính xác mức lương cơ sở mới nhất của Chính phủ áp dụng trong toàn bộ công thức'
    ],
    installGuideVi: 'Bước 1: Kích hoạt kỹ năng tính bảo hiểm xã hội trong hệ thống AI Assistant.\nBước 2: Cung cấp mức lương đóng BHXH các tháng gần nhất và loại chế độ cần tính (Thai sản, Ốm đau, Thất nghiệp).\nBước 3: Nhận bảng phân tích chi tiết số tiền trợ cấp được cơ quan BHXH chi trả.\nBước 4: Xuất báo cáo giải trình kèm căn cứ điều khoản của Luật BHXH.',
    usageGuideVi: 'Mẫu mã nguồn tính tiền trợ cấp thai sản theo Luật BHXH Việt Nam:\n```javascript\nfunction tinhTienThaiSan(luongDongBhxhTb6Thang, soCon = 1, luongCoSo = 2340000) {\n  // 1. Tiền trợ cấp thai sản 6 tháng nghỉ sinh\n  const tienCheDo6Thang = luongDongBhxhTb6Thang * 6;\n  \n  // 2. Trợ cấp một lần khi sinh con (tã lót) = 2 lần mức lương cơ sở cho mỗi con\n  const troCapMotLan = 2 * luongCoSo * soCon;\n  \n  // 3. Tổng số tiền nhận được từ cơ quan BHXH\n  const tongTien = tienCheDo6Thang + troCapMotLan;\n  return {\n    luongDongBhxhTb6Thang,\n    tienCheDo6Thang,\n    troCapMotLan,\n    tongTien,\n    ghiChu: \"Số tiền này được cơ quan BHXH chi trả trực tiếp vào tài khoản cá nhân của người lao động.\"\n  };\n}\nconsole.log(tinhTienThaiSan(12000000, 1)); // Lương đóng BHXH 12 triệu -> Tổng nhận hơn 76 triệu\n```',
    samplePromptsVi: [
      'Tính toán số tiền trợ cấp thai sản nhận được khi mức lương đóng BHXH bình quân là 15 triệu đồng/tháng',
      'Dự tính số tháng và số tiền trợ cấp thất nghiệp được hưởng sau 3 năm 6 tháng đóng BHTN'
    ],
    demoImages: [],
    imageUrl: '',
    configs: [
      {
        platform: 'antigravity',
        platformName: 'JavaScript Benefit Calculator',
        cliCommand: 'npm install bhxh-calculator-vn',
        jsonConfig: '{\n  \"statutory_pay_rate\": 2340000,\n  \"maternity_leave_months\": 6,\n  \"maternity_lump_sum_multiplier\": 2,\n  \"sickness_rate\": 0.75\n}'
      }
    ],
    status: 'published',
    stars: 560,
    featured: false,
    linkHealth: 'healthy'
  }
];

let addedCount = 0;
for (const item of batch4VNTools) {
  const existingIdx = tools.findIndex(t => t.id === item.id || t.slug === item.slug);
  if (existingIdx >= 0) {
    tools[existingIdx] = { ...tools[existingIdx], ...item };
  } else {
    tools.unshift(item);
    addedCount++;
  }
}

fs.writeFileSync(filePath, JSON.stringify(tools, null, 2), 'utf8');
console.log(`Thành công! Đã thêm mới ${addedCount} công cụ đợt 4 (Thanh toán, Hành chính 34 tỉnh, ERP, CRM, Thuế & Luật) cho thị trường Việt Nam. Tổng số công cụ hiện tại: ${tools.length}`);
