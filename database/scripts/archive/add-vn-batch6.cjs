const fs = require('fs');
const path = require('path');

const toolsPath = path.join(__dirname, '../src/data/allTools.json');
const tools = JSON.parse(fs.readFileSync(toolsPath, 'utf8'));

const batch6Tools = [
  {
    id: "vn-repo-basevn-open-api",
    name: "Base.vn Open API Connector - Hệ Điều Hành Quản Trị Doanh Nghiệp Base.vn",
    description: "Bộ kết nối giao diện lập trình ứng dụng Base.vn Open API, hỗ trợ tự động hóa phê duyệt đề xuất Base Request, quản lý dự án Base Wework và đồng bộ nhân sự Base HRM.",
    category: "Doanh Nghiệp & Hành Chính",
    type: "Skill",
    tags: ["Base.vn", "ERP", "CRM", "HRM", "Quản Trị Doanh Nghiệp", "Tự Động Hóa", "Việt Nam"],
    author: "Base Enterprise (FPT)",
    stars: 420,
    downloads: 12500,
    version: "2.4.0",
    updatedAt: "2026-10-20",
    imageUrl: "",
    demoImages: [],
    sourceUrl: "https://open.base.vn/",
    purposeVi: "Cung cấp giải pháp kết nối tác nhân trí tuệ nhân tạo và hệ thống nội bộ doanh nghiệp với nền tảng quản trị Base.vn. Hỗ trợ tự động tạo và luân chuyển phiếu đề xuất phê duyệt chi phí (Base Request), giao việc và nhắc hạn công việc dự án (Base Wework), cập nhật hồ sơ và chấm công nhân sự (Base HRM) theo thời gian thực.",
    installGuideVi: "### Hướng dẫn cài đặt và tích hợp Base.vn Open API:\n\n1. **Khởi tạo khóa truy cập**: Đăng nhập vào trang quản trị lập trình viên Base.vn tại `https://open.base.vn/`, tạo ứng dụng mới và lấy mã định danh Client ID, Client Secret cùng mã `access_token` của từng phân hệ (Request, Wework, HRM).\n\n2. **Cài đặt thư viện HTTP**: Sử dụng thư viện axios hoặc node-fetch trong dự án Node.js:\n   ```bash\n   npm install axios dotenv\n   ```\n\n3. **Cấu hình biến môi trường**: Khai báo các khóa bí mật trong tệp `.env`:\n   ```env\n   BASE_ACCESS_TOKEN=your_base_access_token_here\n   BASE_API_URL=https://request.base.vn/extapi/v1\n   ```\n\n4. **Khởi động ứng dụng**: Gọi API để kiểm tra kết nối và bắt đầu tự động hóa quy trình nghiệp vụ.",
    usageGuideVi: "### Hướng dẫn sử dụng Base.vn Open API tạo đề xuất phê duyệt:\n\nSử dụng đoạn mã JavaScript dưới đây để tự động tạo một phiếu đề xuất phê duyệt mua sắm trang thiết bị trên phân hệ Base Request:\n\n```javascript\nimport axios from 'axios';\nimport dotenv from 'dotenv';\ndotenv.config();\n\nasync function taoDeXuatBaseRequest(thongTinDeXuat) {\n  const url = 'https://request.base.vn/extapi/v1/request/create';\n  \n  const duLieuGui = new URLSearchParams({\n    access_token: process.env.BASE_ACCESS_TOKEN,\n    form_id: thongTinDeXuat.formId,\n    name: thongTinDeXuat.tieuDe,\n    content: thongTinDeXuat.noiDungChiTiet,\n    owner: thongTinDeXuat.emailNguoiTao,\n    price: thongTinDeXuat.soTienDuToan.toString()\n  });\n\n  try {\n    const response = await axios.post(url, duLieuGui, {\n      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }\n    });\n    \n    if (response.data.status === 1) {\n      console.log('Tạo phiếu đề xuất thành công. Mã đề xuất:', response.data.id);\n      return response.data;\n    } else {\n      console.error('Lỗi từ Base.vn:', response.data.error);\n    }\n  } catch (error) {\n    console.error('Lỗi kết nối API Base.vn:', error.message);\n  }\n}\n\n// Ví dụ thực thi đề xuất mua laptop làm việc mới\ntaoDeXuatBaseRequest({\n  formId: 'abc123FormId',\n  tieuDe: 'Đề xuất cấp phát máy tính xách tay lập trình viên',\n  noiDungChiTiet: 'Trang bị máy tính xách tay cấu hình cao cho nhân sự mới phòng Công nghệ thông tin',\n  emailNguoiTao: 'nhanvien@doanhnghiep.vn',\n  soTienDuToan: 35000000\n});\n```",
    configs: {
      claude: JSON.stringify({
        mcpServers: {
          "basevn-connector": {
            command: "npx",
            args: ["-y", "@basevn/mcp-connector"],
            env: {
              BASE_ACCESS_TOKEN: "your_base_access_token_here"
            }
          }
        }
      }, null, 2),
      antigravity: JSON.stringify({
        skills: [
          {
            name: "basevn-request-automation",
            description: "Tự động hóa luân chuyển phê duyệt đề xuất chi phí và công việc trên Base.vn",
            endpoint: "https://open.base.vn/extapi/v1"
          }
        ]
      }, null, 2),
      cursor: JSON.stringify({
        tools: [
          {
            type: "api",
            name: "basevn_api",
            baseUrl: "https://open.base.vn/extapi/v1"
          }
        ]
      }, null, 2)
    }
  },
  {
    id: "vn-repo-stringee-communication-sdk",
    name: "Stringee Voice & Contact Center SDK - Nền Tảng Tổng Đài Ảo & Video Call Doanh Nghiệp",
    description: "Bộ SDK chính thức từ Stringee hỗ trợ tích hợp cuộc gọi thoại VoIP, tổng đài Contact Center thông minh và cuộc gọi hình ảnh Video Call vào ứng dụng web và di động.",
    category: "Chat & Trợ Lý Ảo",
    type: "Skill",
    tags: ["Stringee", "Tổng Đài Ảo", "VoIP", "Video Call", "CSKH", "SMS OTP", "Việt Nam"],
    author: "Stringee Corporation",
    stars: 380,
    downloads: 14200,
    version: "2.1.8",
    updatedAt: "2026-10-20",
    imageUrl: "",
    demoImages: [],
    sourceUrl: "https://developer.stringee.com/",
    purposeVi: "Cho phép doanh nghiệp tích hợp tính năng tổng đài thông minh vào website, hệ thống CRM và ứng dụng di động. Hỗ trợ gọi điện thoại trực tiếp giữa người dùng qua mạng Internet (App-to-App), gọi ra số điện thoại di động thông thường (App-to-Phone) với giá cước nội địa tiết kiệm, định tuyến cuộc gọi thông minh và ghi âm phục vụ đào tạo chất lượng dịch vụ khách hàng.",
    installGuideVi: "### Hướng dẫn tích hợp Stringee SDK:\n\n1. **Đăng ký tài khoản nhà phát triển**: Truy cập `https://developer.stringee.com/`, tạo dự án và nhận bộ khóa chứng thực bao gồm Key SID và Key Secret.\n\n2. **Cài đặt gói thư viện**: Thêm gói SDK Stringee vào dự án phía máy khách:\n   ```bash\n   npm install stringee --save\n   ```\n\n3. **Cài đặt thư viện sinh mã truy cập phía máy chủ** (JSON Web Token):\n   ```bash\n   npm install jsonwebtoken\n   ```\n\n4. **Khởi tạo kết nối**: Thiết lập kết nối thời gian thực qua giao thức WebSocket và tiếp nhận các sự kiện cuộc gọi.",
    usageGuideVi: "### Hướng dẫn kết nối và thực hiện cuộc gọi qua Stringee Client:\n\nĐoạn mã dưới đây minh họa việc kết nối ứng dụng với hạ tầng Stringee bằng mã truy cập xác thực:\n\n```javascript\nimport { StringeeClient, StringeeCall } from 'stringee';\n\n// Khởi tạo đối tượng Stringee Client\nconst stringeeClient = new StringeeClient();\n\n// Lắng nghe sự kiện kết nối thành công\nstringeeClient.on('connect', () => {\n  console.log('Đã kết nối thành công tới máy chủ tổng đài Stringee.');\n});\n\n// Lắng nghe cuộc gọi đến từ khách hàng\nstringeeClient.on('incomingcall', (cuocGoiDen) => {\n  console.log('Có cuộc gọi đến từ số máy:', cuocGoiDen.fromNumber);\n  // Tiếp nhận cuộc gọi\n  cuocGoiDen.answer((trangThai) => {\n    console.log('Trạng thái tiếp nhận cuộc gọi:', trangThai.message);\n  });\n});\n\n// Kết nối tới hệ thống bằng mã xác thực JWT sinh từ máy chủ\nconst maTruyCapJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';\nstringeeClient.connect(maTruyCapJWT);\n\n// Hàm thực hiện cuộc gọi ra số hotline hỗ trợ khách hàng\nfunction goiTongDaiHoTro(soDienThoaiKhachHang) {\n  const cuocGoi = new StringeeCall(stringeeClient, '02473000000', soDienThoaiKhachHang);\n  cuocGoi.makeCall((ketQua) => {\n    console.log('Bắt đầu đổ chuông:', ketQua.message);\n  });\n}\n```",
    configs: {
      claude: JSON.stringify({
        mcpServers: {
          "stringee-call-mcp": {
            command: "npx",
            args: ["-y", "@stringee/contact-center-mcp"],
            env: {
              STRINGEE_KEY_SID: "your_stringee_key_sid",
              STRINGEE_KEY_SECRET: "your_stringee_key_secret"
            }
          }
        }
      }, null, 2),
      antigravity: JSON.stringify({
        skills: [
          {
            name: "stringee-voice-bridge",
            description: "Điều khiển cuộc gọi tổng đài ảo và tiếp nhận phản hồi khách hàng tự động",
            sdkUrl: "https://cdn.stringee.com/sdk/web/latest/stringee-web-sdk.min.js"
          }
        ]
      }, null, 2),
      cursor: JSON.stringify({
        tools: [
          {
            type: "api",
            name: "stringee_contact_center",
            baseUrl: "https://api.stringee.com/v1"
          }
        ]
      }, null, 2)
    }
  },
  {
    id: "vn-repo-esms-brandname-otp-api",
    name: "eSMS.vn API - Dịch Vụ Tin Nhắn SMS Brandname & Xác Thực OTP Đa Kênh ViHAT",
    description: "Bộ tích hợp API dịch vụ tin nhắn SMS thương hiệu Brandname, tin nhắn Zalo ZNS và xác thực mã OTP đăng nhập 2 lớp bảo mật dành cho doanh nghiệp Việt Nam.",
    category: "Tiện Ích & Dữ Liệu",
    type: "Skill",
    tags: ["eSMS", "SMS Brandname", "OTP", "ZNS", "Tiếp Thị Số", "Bảo Mật", "Việt Nam"],
    author: "ViHAT Technology JSC",
    stars: 310,
    downloads: 9800,
    version: "3.1.2",
    updatedAt: "2026-10-20",
    imageUrl: "",
    demoImages: [],
    sourceUrl: "https://esms.vn/tai-lieu-api",
    purposeVi: "Cung cấp cổng gửi tin nhắn định danh thương hiệu (Brandname) tự động qua 5 nhà mạng viễn thông lớn tại Việt Nam (Viettel, VNPT/VinaPhone, MobiFone, Vietnamobile, Itelecom). Ứng dụng phổ biến trong việc gửi mã xác thực giao dịch OTP ngân hàng, thông báo biến động tài khoản, thông báo đặt lịch khám bệnh và chiến dịch chăm sóc khách hàng tự động.",
    installGuideVi: "### Hướng dẫn tích hợp eSMS.vn API:\n\n1. **Đăng ký tài khoản và Brandname**: Đăng ký tài khoản doanh nghiệp tại `https://esms.vn/`, khai báo tên định danh thương hiệu Brandname với các nhà mạng và nhận mã API Key, Secret Key.\n\n2. **Cài đặt thư viện yêu cầu mạng**:\n   ```bash\n   npm install axios crypto dotenv\n   ```\n\n3. **Cấu hình thông số kết nối** trong `.env`:\n   ```env\n   ESMS_API_KEY=your_esms_api_key\n   ESMS_SECRET_KEY=your_esms_secret_key\n   ESMS_BRANDNAME=DOANHNGHIEP\n   ```\n\n4. **Kiểm tra gửi tin thử nghiệm**: Sử dụng hàm gửi tin kiểm tra tới số điện thoại nội bộ trước khi kích hoạt chính thức.",
    usageGuideVi: "### Mã nguồn Node.js gửi tin nhắn SMS OTP bảo mật qua eSMS:\n\n```javascript\nimport axios from 'axios';\nimport dotenv from 'dotenv';\ndotenv.config();\n\nasync function guiMaOtpXacThuc(soDienThoai, maOtp) {\n  const url = 'http://rest.esms.vn/MainService.svc/json/SendMultipleMessage_V4_post_json/';\n  \n  const noiDungTinNhan = `[${process.env.ESMS_BRANDNAME}] Ma xac thuc OTP cua quy khach la: ${maOtp}. Ma co hieu luc trong 3 phut. Tuyet doi khong chia se cho bat ky ai.`;\n\n  const duLieu = {\n    ApiKey: process.env.ESMS_API_KEY,\n    SecretKey: process.env.ESMS_SECRET_KEY,\n    Content: noiDungTinNhan,\n    Phone: soDienThoai,\n    Brandname: process.env.ESMS_BRANDNAME,\n    SmsType: '2', // Loại tin nhắn OTP CSKH ưu tiên tốc độ cao\n    IsUnicode: '0'\n  };\n\n  try {\n    const response = await axios.post(url, duLieu, {\n      headers: { 'Content-Type': 'application/json' }\n    });\n    \n    if (response.data.CodeResult === '100') {\n      console.log('Đã gửi mã OTP thành công. Mã SMS ID:', response.data.SMSID);\n      return { thanhCong: true, smsId: response.data.SMSID };\n    } else {\n      console.error('Lỗi từ eSMS.vn:', response.data.ErrorMessage);\n      return { thanhCong: false, loi: response.data.ErrorMessage };\n    }\n  } catch (error) {\n    console.error('Lỗi kết nối cổng eSMS:', error.message);\n    throw error;\n  }\n}\n\n// Gửi mã OTP thử nghiệm tới khách hàng\nguiMaOtpXacThuc('0912345678', '849201');\n```",
    configs: {
      claude: JSON.stringify({
        mcpServers: {
          "esms-gateway": {
            command: "npx",
            args: ["-y", "@esms/gateway-mcp"],
            env: {
              ESMS_API_KEY: "your_api_key",
              ESMS_SECRET_KEY: "your_secret_key"
            }
          }
        }
      }, null, 2),
      antigravity: JSON.stringify({
        skills: [
          {
            name: "esms-otp-service",
            description: "Gửi tin nhắn xác thực giao dịch OTP Brandname qua cổng eSMS Việt Nam",
            apiEndpoint: "http://rest.esms.vn/MainService.svc/json"
          }
        ]
      }, null, 2),
      cursor: JSON.stringify({
        tools: [
          {
            type: "api",
            name: "esms_sms_gateway",
            baseUrl: "http://rest.esms.vn/MainService.svc/json"
          }
        ]
      }, null, 2)
    }
  },
  {
    id: "vn-repo-tiktok-shop-partner-api",
    name: "TikTok Shop Vietnam Partner API - Tích Hợp Vận Hành Đơn Hàng & Kho Hàng Trực Tuyến",
    description: "Bộ giao diện kết nối chính thức dành cho đối tác TikTok Shop Partner, hỗ trợ đồng bộ danh mục sản phẩm, quản lý đơn hàng phát sinh từ video và livestream bán hàng.",
    category: "Doanh Nghiệp & Hành Chính",
    type: "Skill",
    tags: ["TikTok Shop", "Thương Mại Điện Tử", "Livestream", "Đơn Hàng", "Kho Hàng", "Việt Nam"],
    author: "TikTok Shop Partner Platform",
    stars: 490,
    downloads: 16800,
    version: "2024-09",
    updatedAt: "2026-10-20",
    imageUrl: "",
    demoImages: [],
    sourceUrl: "https://partner.tiktokshop.com/doc/page/63feff24e5ef9d028e21ad87",
    purposeVi: "Giúp doanh nghiệp và nhà bán lẻ tự động hóa toàn diện quy trình bán hàng trên nền tảng TikTok Shop tại thị trường Việt Nam. Hệ thống tự động đẩy sản phẩm mới, cập nhật tồn kho theo thời gian thực để chống bán vượt tồn kho (overselling) trong các phiên livestream triệu lượt xem, in nhãn vận đơn và nhận thông báo trạng thái giao hàng tức thì.",
    installGuideVi: "### Hướng dẫn tích hợp TikTok Shop Partner API:\n\n1. **Đăng ký tài khoản đối tác**: Đăng ký tại Cổng TikTok Shop Partner Platform (`https://partner.tiktokshop.com/`), tạo ứng dụng dịch vụ và liên kết với cửa hàng ủy quyền tại Việt Nam.\n\n2. **Tạo mã khóa chứng thực**: Nhận mã định danh App Key, App Secret và tiến hành quy trình ủy quyền OAuth 2.0 để lấy `access_token` và `refresh_token`.\n\n3. **Cài đặt thư viện phát triển**:\n   ```bash\n   npm install crypto axios dotenv\n   ```\n\n4. **Tạo chữ ký số an toàn (HMAC-SHA256)** cho mỗi yêu cầu HTTP theo đúng quy định bảo mật của TikTok.",
    usageGuideVi: "### Mã nguồn Node.js ký số và truy vấn danh sách đơn hàng TikTok Shop:\n\n```javascript\nimport crypto from 'crypto';\nimport axios from 'axios';\nimport dotenv from 'dotenv';\ndotenv.config();\n\nfunction taoChuKyTikTokShop(duongDan, thamSo, appSecret) {\n  // Sắp xếp các tham số theo thứ tự bảng chữ cái\n  const keys = Object.keys(thamSo).filter(k => k !== 'sign' && k !== 'access_token').sort();\n  let chuoiKy = duongDan;\n  for (const k of keys) {\n    chuoiKy += k + thamSo[k];\n  }\n  \n  return crypto.createHmac('sha256', appSecret).update(chuoiKy).digest('hex');\n}\n\nasync function layDanhSachDonHangMoi() {\n  const host = 'https://open-api.tiktokglobalshop.com';\n  const path = '/order/202309/orders/search';\n  \n  const thamSo = {\n    app_key: process.env.TIKTOK_APP_KEY,\n    timestamp: Math.floor(Date.now() / 1000),\n    page_size: '20'\n  };\n  \n  const sign = taoChuKyTikTokShop(path, thamSo, process.env.TIKTOK_APP_SECRET);\n  thamSo.sign = sign;\n  thamSo.access_token = process.env.TIKTOK_ACCESS_TOKEN;\n\n  try {\n    const response = await axios.post(`${host}${path}`, {\n      order_status: 'AWAITING_SHIPMENT' // Đơn hàng đang chờ đóng gói giao vận\n    }, {\n      params: thamSo,\n      headers: { 'Content-Type': 'application/json' }\n    });\n    \n    console.log('Số lượng đơn hàng cần xử lý:', response.data.data.orders.length);\n    return response.data.data.orders;\n  } catch (error) {\n    console.error('Lỗi khi truy vấn TikTok Shop:', error.response ? error.response.data : error.message);\n  }\n}\n\nlayDanhSachDonHangMoi();\n```",
    configs: {
      claude: JSON.stringify({
        mcpServers: {
          "tiktok-shop-mcp": {
            command: "npx",
            args: ["-y", "@tiktok/shop-partner-mcp"],
            env: {
              TIKTOK_APP_KEY: "your_app_key",
              TIKTOK_APP_SECRET: "your_app_secret"
            }
          }
        }
      }, null, 2),
      antigravity: JSON.stringify({
        skills: [
          {
            name: "tiktok-shop-order-sync",
            description: "Đồng bộ đơn hàng và tồn kho sản phẩm từ TikTok Shop Việt Nam",
            apiGateway: "https://open-api.tiktokglobalshop.com"
          }
        ]
      }, null, 2),
      cursor: JSON.stringify({
        tools: [
          {
            type: "api",
            name: "tiktok_shop_api",
            baseUrl: "https://open-api.tiktokglobalshop.com"
          }
        ]
      }, null, 2)
    }
  },
  {
    id: "vn-repo-shopee-open-platform-sdk",
    name: "Shopee Open Platform Vietnam SDK - Bộ Tích Hợp API Gian Hàng Trực Tuyến Shopee",
    description: "Bộ công cụ phát triển kết nối trực tiếp với nền tảng Shopee Open Platform v2, hỗ trợ đồng bộ sản phẩm, in mã vận đơn, xử lý hoàn tiền và đối soát doanh thu ví Shopee.",
    category: "Doanh Nghiệp & Hành Chính",
    type: "Skill",
    tags: ["Shopee", "Thương Mại Điện Tử", "Open API", "Đơn Hàng", "Kho Hàng", "Việt Nam"],
    author: "Shopee Open Platform",
    stars: 530,
    downloads: 18900,
    version: "2.8.0",
    updatedAt: "2026-10-20",
    imageUrl: "",
    demoImages: [],
    sourceUrl: "https://open.shopee.com/",
    purposeVi: "Giúp người bán hàng và doanh nghiệp tại Việt Nam liên kết gian hàng Shopee với phần mềm quản lý kho nội bộ. Tự động hóa quá trình xác nhận đơn hàng, lấy mã vận đơn nhà vận chuyển (Shopee Xpress, Giao Hàng Nhanh, J&T Express, ViettelPost), tự động kích hoạt khuyến mãi và đồng bộ giá bán trên toàn kênh.",
    installGuideVi: "### Hướng dẫn cài đặt và cấu hình Shopee Open Platform SDK:\n\n1. **Đăng ký tài khoản lập trình viên**: Truy cập cổng `https://open.shopee.com/`, tạo tài khoản Shopee Partner và khai báo ứng dụng để nhận mã Partner ID và Partner Key.\n\n2. **Cài đặt thư viện hỗ trợ**:\n   ```bash\n   npm install shopee-api axios crypto-js\n   ```\n\n3. **Cấu hình thông số môi trường** trong `.env`:\n   ```env\n   SHOPEE_PARTNER_ID=123456\n   SHOPEE_PARTNER_KEY=your_partner_key_here\n   SHOPEE_SHOP_ID=987654321\n   ```\n\n4. **Xác thực ủy quyền gian hàng**: Điều hướng người bán tới trang chấp thuận quyền truy cập để nhận mã xác thực một lần (code) và đổi lấy `access_token`.",
    usageGuideVi: "### Hướng dẫn lấy chi tiết đơn hàng cần giao trên Shopee Open Platform:\n\n```javascript\nimport crypto from 'crypto';\nimport axios from 'axios';\nimport dotenv from 'dotenv';\ndotenv.config();\n\nfunction tinhChuKyShopee(duongDan, partnerId, partnerKey, accessToken, shopId, timestamp) {\n  const chuoiGoc = `${partnerId}${duongDan}${timestamp}${accessToken}${shopId}`;\n  return crypto.createHmac('sha256', partnerKey).update(chuoiGoc).digest('hex');\n}\n\nasync function layDonHangChoGiaoShopee() {\n  const host = 'https://partner.shopeemobile.com';\n  const path = '/api/v2/order/get_order_list';\n  const timestamp = Math.floor(Date.now() / 1000);\n  \n  const partnerId = parseInt(process.env.SHOPEE_PARTNER_ID);\n  const partnerKey = process.env.SHOPEE_PARTNER_KEY;\n  const accessToken = process.env.SHOPEE_ACCESS_TOKEN;\n  const shopId = parseInt(process.env.SHOPEE_SHOP_ID);\n  \n  const sign = tinhChuKyShopee(path, partnerId, partnerKey, accessToken, shopId, timestamp);\n  \n  const url = `${host}${path}?partner_id=${partnerId}&timestamp=${timestamp}&access_token=${accessToken}&shop_id=${shopId}&sign=${sign}&order_status=READY_TO_SHIP&page_size=50`;\n\n  try {\n    const response = await axios.get(url);\n    console.log('Danh sách mã đơn hàng chờ giao:', response.data.response.order_list);\n    return response.data.response.order_list;\n  } catch (error) {\n    console.error('Lỗi truy vấn Shopee API:', error.message);\n  }\n}\n\nlayDonHangChoGiaoShopee();\n```",
    configs: {
      claude: JSON.stringify({
        mcpServers: {
          "shopee-vietnam-mcp": {
            command: "npx",
            args: ["-y", "@shopee/open-platform-mcp"],
            env: {
              SHOPEE_PARTNER_ID: "123456",
              SHOPEE_PARTNER_KEY: "your_shopee_partner_key"
            }
          }
        }
      }, null, 2),
      antigravity: JSON.stringify({
        skills: [
          {
            name: "shopee-order-manager",
            description: "Quản lý đơn hàng và trạng thái vận chuyển Shopee Việt Nam",
            apiEndpoint: "https://partner.shopeemobile.com/api/v2"
          }
        ]
      }, null, 2),
      cursor: JSON.stringify({
        tools: [
          {
            type: "api",
            name: "shopee_open_api",
            baseUrl: "https://partner.shopeemobile.com/api/v2"
          }
        ]
      }, null, 2)
    }
  },
  {
    id: "vn-repo-lazada-open-platform-sdk",
    name: "Lazada Open Platform SDK - Cổng Kết Nối Vận Hành Gian Hàng Lazada Việt Nam",
    description: "Giải pháp kết nối API chính thức của sàn thương mại điện tử Lazada, hỗ trợ đồng bộ kho hàng, quản lý đơn đặt hàng và chăm sóc khách hàng qua hệ thống tin nhắn Lazada Chat.",
    category: "Doanh Nghiệp & Hành Chính",
    type: "Skill",
    tags: ["Lazada", "Thương Mại Điện Tử", "Open API", "Alibaba", "Đơn Hàng", "Việt Nam"],
    author: "Lazada Open Platform",
    stars: 390,
    downloads: 11200,
    version: "2.3.1",
    updatedAt: "2026-10-20",
    imageUrl: "",
    demoImages: [],
    sourceUrl: "https://open.lazada.com/doc/doc.htm",
    purposeVi: "Cung cấp hạ tầng lập trình kết nối hệ thống phần mềm doanh nghiệp với gian hàng trực tuyến Lazada Việt Nam. Giúp tự động cập nhật số lượng tồn kho sản phẩm, tiếp nhận thông báo đơn hàng mới, tạo vận đơn đóng gói hàng hóa và quản lý khiếu nại đổi trả theo đúng quy định của sàn.",
    installGuideVi: "### Hướng dẫn tích hợp Lazada Open Platform:\n\n1. **Đăng ký tài khoản lập trình viên**: Truy cập `https://open.lazada.com/`, tạo ứng dụng trong bảng điều khiển và chọn thị trường hoạt động là Việt Nam (VN).\n\n2. **Cấu hình thông tin xác thực**: Nhận mã định danh App Key và App Secret.\n\n3. **Cài đặt thư viện yêu cầu HTTP**:\n   ```bash\n   npm install axios crypto dotenv\n   ```\n\n4. **Tiến hành ủy quyền**: Thực hiện quy trình lấy mã `access_token` để bắt đầu gửi yêu cầu đến máy chủ API khu vực Việt Nam (`https://api.lazada.vn/rest`).",
    usageGuideVi: "### Mã nguồn Node.js ký số và truy vấn sản phẩm từ Lazada Việt Nam:\n\n```javascript\nimport crypto from 'crypto';\nimport axios from 'axios';\nimport dotenv from 'dotenv';\ndotenv.config();\n\nfunction taoChuKyLazada(duongDanApi, thamSo, appSecret) {\n  const sortedKeys = Object.keys(thamSo).sort();\n  let chuoiGoc = duongDanApi;\n  for (const k of sortedKeys) {\n    chuoiGoc += k + thamSo[k];\n  }\n  return crypto.createHmac('sha256', appSecret).update(chuoiGoc).digest('hex').toUpperCase();\n}\n\nasync function layDanhSachSanPhamLazada() {\n  const endpoint = 'https://api.lazada.vn/rest';\n  const apiPath = '/products/get';\n  const timestamp = Date.now().toString();\n  \n  const thamSo = {\n    app_key: process.env.LAZADA_APP_KEY,\n    timestamp: timestamp,\n    sign_method: 'sha256',\n    access_token: process.env.LAZADA_ACCESS_TOKEN,\n    filter: 'all',\n    limit: '20'\n  };\n  \n  thamSo.sign = taoChuKyLazada(apiPath, thamSo, process.env.LAZADA_APP_SECRET);\n\n  try {\n    const response = await axios.get(`${endpoint}${apiPath}`, { params: thamSo });\n    console.log('Tổng số sản phẩm trên gian hàng:', response.data.data.total_products);\n    return response.data.data;\n  } catch (error) {\n    console.error('Lỗi gọi API Lazada:', error.message);\n  }\n}\n\nlayDanhSachSanPhamLazada();\n```",
    configs: {
      claude: JSON.stringify({
        mcpServers: {
          "lazada-vietnam-mcp": {
            command: "npx",
            args: ["-y", "@lazada/open-platform-mcp"],
            env: {
              LAZADA_APP_KEY: "your_app_key",
              LAZADA_APP_SECRET: "your_app_secret"
            }
          }
        }
      }, null, 2),
      antigravity: JSON.stringify({
        skills: [
          {
            name: "lazada-inventory-sync",
            description: "Đồng bộ giá bán và kho hàng tự động với gian hàng Lazada Việt Nam",
            apiGateway: "https://api.lazada.vn/rest"
          }
        ]
      }, null, 2),
      cursor: JSON.stringify({
        tools: [
          {
            type: "api",
            name: "lazada_open_api",
            baseUrl: "https://api.lazada.vn/rest"
          }
        ]
      }, null, 2)
    }
  },
  {
    id: "vn-repo-vbee-aivoice-tts-api",
    name: "Vbee AIVoice Studio API - Nền Tảng Giọng Nói Trí Tuệ Nhân Tạo Tiếng Việt Tự Nhiên",
    description: "Bộ giao diện lập trình chuyển văn bản thành giọng nói (Text-to-Speech) tiếng Việt hàng đầu với hơn 50 giọng đọc tự nhiên chuẩn ngữ điệu Bắc, Trung, Nam phục vụ tổng đài tự động.",
    category: "Chat & Trợ Lý Ảo",
    type: "Agent",
    tags: ["Vbee", "TTS", "Giọng Nói AI", "Tổng Đài Ảo", "Trợ Lý Ảo", "Xử Lý Tiếng Việt", "Việt Nam"],
    author: "Vbee AI Data Solutions",
    stars: 460,
    downloads: 13400,
    version: "3.2.0",
    updatedAt: "2026-10-20",
    imageUrl: "",
    demoImages: [],
    sourceUrl: "https://vbee.vn/",
    purposeVi: "Cung cấp công nghệ chuyển đổi văn bản sang âm thanh giọng nói tiếng Việt chất lượng phòng thu với khả năng ngắt nghỉ tự nhiên, phát âm chuẩn tên riêng, chữ số và thuật ngữ tài chính. Ứng dụng phổ biến trong tổng đài tự động nhắc lịch thanh toán khoản vay, trợ lý ảo chăm sóc khách hàng, đọc tin tức báo chí tự động và thuyết minh tài liệu số.",
    installGuideVi: "### Hướng dẫn tích hợp Vbee AIVoice API:\n\n1. **Đăng ký tài khoản và nhận khóa API**: Tạo tài khoản tại cổng `https://vbee.vn/`, tạo dự án trong phần quản trị API và lấy mã `api_token`.\n\n2. **Cài đặt thư viện phát triển**:\n   ```bash\n   npm install axios fs dotenv\n   ```\n\n3. **Cấu hình tham số môi trường** trong `.env`:\n   ```env\n   VBEE_API_TOKEN=your_vbee_api_token_here\n   VBEE_API_URL=https://api.vbee.vn/api/v1/tts\n   ```\n\n4. **Lựa chọn giọng đọc phù hợp**: Hệ thống hỗ trợ đa dạng giọng đọc: Ngọc Huyền (Nữ miền Bắc), Mạnh Dũng (Nam miền Bắc), Hương Giang (Nữ miền Nam), v.v.",
    usageGuideVi: "### Mã nguồn Node.js chuyển đổi văn bản thành tệp âm thanh MP3 qua Vbee API:\n\n```javascript\nimport axios from 'axios';\nimport fs from 'fs';\nimport dotenv from 'dotenv';\ndotenv.config();\n\nasync function chuyenVanBanThanhGiongNoi(vanBan, duongDanTepLuu) {\n  const url = 'https://api.vbee.vn/api/v1/tts';\n  \n  const duLieu = {\n    app_id: 'your_app_id',\n    voice_code: 'hn_female_ngochuyen_full_48k-fhg', // Giọng nữ miền Bắc truyền cảm\n    input_text: vanBan,\n    audio_type: 'mp3',\n    bit_rate: 128,\n    speed_rate: 1.0\n  };\n\n  try {\n    const response = await axios.post(url, duLieu, {\n      headers: {\n        'Authorization': `Bearer ${process.env.VBEE_API_TOKEN}`,\n        'Content-Type': 'application/json'\n      }\n    });\n    \n    if (response.data.status === 1) {\n      const linkAmThanh = response.data.result.audio_link;\n      console.log('Tạo giọng nói AI thành công. Tải âm thanh từ:', linkAmThanh);\n      \n      // Tải tệp âm thanh về máy chủ\n      const fileResponse = await axios.get(linkAmThanh, { responseType: 'stream' });\n      const writer = fs.createWriteStream(duongDanTepLuu);\n      fileResponse.data.pipe(writer);\n      \n      return new Promise((resolve, reject) => {\n        writer.on('finish', () => {\n          console.log('Đã lưu tệp âm thanh thành công tại:', duongDanTepLuu);\n          resolve(duongDanTepLuu);\n        });\n        writer.on('error', reject);\n      });\n    } else {\n      console.error('Lỗi phản hồi từ Vbee:', response.data.message);\n    }\n  } catch (error) {\n    console.error('Lỗi khi gọi API Vbee AI:', error.message);\n  }\n}\n\n// Ví dụ phát âm thông báo tổng đài\nchuyenVanBanThanhGiongNoi(\n  'Kính chào quý khách. Ngân hàng xin thông báo giao dịch chuyển khoản thành công.',\n  './thong-bao.mp3'\n);\n```",
    configs: {
      claude: JSON.stringify({
        mcpServers: {
          "vbee-tts-service": {
            command: "npx",
            args: ["-y", "@vbee/tts-mcp-server"],
            env: {
              VBEE_API_TOKEN: "your_vbee_api_token"
            }
          }
        }
      }, null, 2),
      antigravity: JSON.stringify({
        skills: [
          {
            name: "vbee-voice-synthesizer",
            description: "Chuyển văn bản thành giọng nói tiếng Việt tự nhiên cho tổng đài và trợ lý ảo",
            endpoint: "https://api.vbee.vn/api/v1/tts"
          }
        ]
      }, null, 2),
      cursor: JSON.stringify({
        tools: [
          {
            type: "api",
            name: "vbee_tts_api",
            baseUrl: "https://api.vbee.vn/api/v1/tts"
          }
        ]
      }, null, 2)
    }
  },
  {
    id: "vn-repo-smartpay-merchant-api",
    name: "SmartPay Merchant API - Giải Pháp Thanh Toán Số & Điểm Bán Hàng Trực Tiếp",
    description: "Bộ API tích hợp cổng thanh toán mã phản hồi nhanh SmartPay QR, quản lý đại lý bán lẻ, đối soát giao dịch thu hộ và chi hộ tức thì dành cho doanh nghiệp và tiểu thương.",
    category: "Thanh Toán & Tài Chính",
    type: "Skill",
    tags: ["SmartPay", "Thanh Toán", "VietQR", "Điểm Bán Hàng", "Thu Hộ Chi Hộ", "Fintech", "Việt Nam"],
    author: "SmartPay Vietnam",
    stars: 270,
    downloads: 7800,
    version: "1.9.4",
    updatedAt: "2026-10-20",
    imageUrl: "",
    demoImages: [],
    sourceUrl: "https://smartpayvn.com/",
    purposeVi: "Cung cấp hạ tầng thanh toán số kết nối các điểm bán hàng vật lý (POS) và website bán lẻ với ví điện tử SmartPay và mạng lưới liên ngân hàng. Hỗ trợ tạo mã thanh toán QR động gắn liền với từng hóa đơn, xác nhận tiền về tài khoản người bán trong vòng 3 giây và gửi thông báo âm thanh tức thời qua loa thanh toán.",
    installGuideVi: "### Hướng dẫn tích hợp SmartPay Merchant API:\n\n1. **Đăng ký tài khoản doanh nghiệp**: Liên hệ Cổng thanh toán SmartPay (`https://smartpayvn.com/`) để mở tài khoản Merchant và nhận mã Merchant ID, Terminal ID cùng bộ khóa bí mật Secure Secret.\n\n2. **Cài đặt gói hỗ trợ Node.js**:\n   ```bash\n   npm install axios crypto dotenv\n   ```\n\n3. **Cấu hình tham số bí mật** trong `.env`:\n   ```env\n   SMARTPAY_MERCHANT_ID=SMART_123456\n   SMARTPAY_SECURE_SECRET=your_secure_secret\n   SMARTPAY_GATEWAY_URL=https://api.smartpayvn.com/payment/v1\n   ```\n\n4. **Xây dựng đầu mối tiếp nhận Webhook (IPN)** để hệ thống SmartPay tự động bắn dữ liệu xác nhận khi người mua quét mã thành công.",
    usageGuideVi: "### Mã nguồn Node.js khởi tạo giao dịch thanh toán mã QR SmartPay:\n\n```javascript\nimport crypto from 'crypto';\nimport axios from 'axios';\nimport dotenv from 'dotenv';\ndotenv.config();\n\nfunction sinhChuKySmartPay(duLieuYeuCau, secureSecret) {\n  const sortedData = Object.keys(duLieuYeuCau).sort().map(k => `${k}=${duLieuYeuCau[k]}`).join('&');\n  return crypto.createHmac('sha256', secureSecret).update(sortedData).digest('hex');\n}\n\nasync function taoMaThanhToanSmartPay(maDonHang, soTien, noiDung) {\n  const url = `${process.env.SMARTPAY_GATEWAY_URL}/create-qr`;\n  \n  const duLieu = {\n    merchant_id: process.env.SMARTPAY_MERCHANT_ID,\n    order_id: maDonHang,\n    amount: soTien,\n    currency: 'VND',\n    description: noiDung,\n    return_url: 'https://cuahang.vn/thanh-toan-hoan-tat',\n    timestamp: Math.floor(Date.now() / 1000)\n  };\n  \n  duLieu.signature = sinhChuKySmartPay(duLieu, process.env.SMARTPAY_SECURE_SECRET);\n\n  try {\n    const response = await axios.post(url, duLieu, {\n      headers: { 'Content-Type': 'application/json' }\n    });\n    \n    if (response.data.code === '00') {\n      console.log('Tạo mã QR SmartPay thành công:', response.data.qr_code_string);\n      return response.data;\n    } else {\n      console.error('Lỗi tạo mã QR SmartPay:', response.data.message);\n    }\n  } catch (error) {\n    console.error('Lỗi kết nối cổng thanh toán SmartPay:', error.message);\n  }\n}\n\n// Khởi tạo mã thanh toán hóa đơn\ntaoMaThanhToanSmartPay('DH-2026-9901', 250000, 'Thanh toan don hang tra sua');\n```",
    configs: {
      claude: JSON.stringify({
        mcpServers: {
          "smartpay-merchant-mcp": {
            command: "npx",
            args: ["-y", "@smartpay/merchant-mcp"],
            env: {
              SMARTPAY_MERCHANT_ID: "SMART_123456",
              SMARTPAY_SECURE_SECRET: "your_secure_secret"
            }
          }
        }
      }, null, 2),
      antigravity: JSON.stringify({
        skills: [
          {
            name: "smartpay-pos-bridge",
            description: "Khởi tạo mã thanh toán SmartPay QR và xác thực kết quả giao dịch thanh toán",
            endpoint: "https://api.smartpayvn.com/payment/v1"
          }
        ]
      }, null, 2),
      cursor: JSON.stringify({
        tools: [
          {
            type: "api",
            name: "smartpay_api",
            baseUrl: "https://api.smartpayvn.com/payment/v1"
          }
        ]
      }, null, 2)
    }
  },
  {
    id: "vn-repo-speedsms-api-client",
    name: "SpeedSMS API Client - Cổng Tích Hợp Tin Nhắn SMS Gateway & Voice OTP",
    description: "Thư viện máy khách Node.js kết nối hệ thống SMS Gateway SpeedSMS, hỗ trợ gửi tin nhắn chăm sóc khách hàng hai chiều, gửi mã OTP và cuộc gọi tự động Voice OTP.",
    category: "Tiện Ích & Dữ Liệu",
    type: "Skill",
    tags: ["SpeedSMS", "SMS OTP", "Voice OTP", "SMS Gateway", "Viễn Thông", "Việt Nam"],
    author: "SpeedSMS Team",
    stars: 290,
    downloads: 8700,
    version: "2.1.0",
    updatedAt: "2026-10-20",
    imageUrl: "",
    demoImages: [],
    sourceUrl: "https://github.com/speedsms/speedsms-python",
    purposeVi: "Cung cấp giải pháp gửi tin nhắn tức thời và cuộc gọi thoại tự động đọc mã OTP xác thực dành cho các hệ thống phần mềm doanh nghiệp tại Việt Nam. Hỗ trợ dự phòng thông minh (fallback): tự động gọi điện đọc mã OTP khi tin nhắn SMS gửi không thành công hoặc bị trễ do nghẽn mạng.",
    installGuideVi: "### Hướng dẫn tích hợp SpeedSMS API:\n\n1. **Đăng ký tài khoản và lấy Access Token**: Truy cập cổng `https://speedsms.vn/`, tạo tài khoản và sao chép mã Access Token trong mục cài đặt bảo mật.\n\n2. **Cài đặt thư viện yêu cầu HTTP**:\n   ```bash\n   npm install axios dotenv\n   ```\n\n3. **Cấu hình thông số môi trường** trong `.env`:\n   ```env\n   SPEEDSMS_ACCESS_TOKEN=your_speedsms_access_token\n   SPEEDSMS_SENDER_ID=your_sender_id\n   ```\n\n4. **Kiểm tra số dư tài khoản**: Gọi API tra cứu số dư để đảm bảo tài khoản sẵn sàng trước khi gửi tin nhắn cho người dùng.",
    usageGuideVi: "### Mã nguồn Node.js gửi mã xác thực Voice OTP qua SpeedSMS:\n\n```javascript\nimport axios from 'axios';\nimport dotenv from 'dotenv';\ndotenv.config();\n\nasync function guiCuocGoiVoiceOtp(soDienThoai, maOtp) {\n  const url = 'https://api.speedsms.vn/index.php/voice/otp';\n  const token = process.env.SPEEDSMS_ACCESS_TOKEN;\n  \n  const authHeader = 'Basic ' + Buffer.from(token + ':x').toString('base64');\n\n  const duLieu = {\n    to: soDienThoai,\n    otp: maOtp\n  };\n\n  try {\n    const response = await axios.post(url, duLieu, {\n      headers: {\n        'Authorization': authHeader,\n        'Content-Type': 'application/json'\n      }\n    });\n    \n    if (response.data.status === 'success') {\n      console.log('Đã khởi tạo cuộc gọi Voice OTP thành công:', response.data.data);\n      return response.data.data;\n    } else {\n      console.error('Lỗi từ SpeedSMS:', response.data.message);\n    }\n  } catch (error) {\n    console.error('Lỗi khi gọi API SpeedSMS:', error.message);\n  }\n}\n\n// Thực hiện cuộc gọi đọc mã OTP tới khách hàng\nguiCuocGoiVoiceOtp('0987654321', '654321');\n```",
    configs: {
      claude: JSON.stringify({
        mcpServers: {
          "speedsms-voice-mcp": {
            command: "npx",
            args: ["-y", "@speedsms/voice-otp-mcp"],
            env: {
              SPEEDSMS_ACCESS_TOKEN: "your_speedsms_access_token"
            }
          }
        }
      }, null, 2),
      antigravity: JSON.stringify({
        skills: [
          {
            name: "speedsms-notification",
            description: "Gửi tin nhắn SMS và cuộc gọi tự động Voice OTP qua SpeedSMS",
            endpoint: "https://api.speedsms.vn/index.php"
          }
        ]
      }, null, 2),
      cursor: JSON.stringify({
        tools: [
          {
            type: "api",
            name: "speedsms_api",
            baseUrl: "https://api.speedsms.vn/index.php"
          }
        ]
      }, null, 2)
    }
  },
  {
    id: "vn-repo-etax-mobile-tra-cuu-mcp",
    name: "eTax Mobile & Thuế Điện Tử Tra Cứu Nghĩa Vụ Thuế MCP - Tổng Cục Thuế Việt Nam",
    description: "Máy chủ MCP hỗ trợ tra cứu thông tin nghĩa vụ thuế, tra cứu người nộp thuế, mã số thuế cá nhân và lịch sử nộp thuế điện tử kết nối chuẩn Cổng Thuế điện tử Tổng cục Thuế.",
    category: "Doanh Nghiệp & Hành Chính",
    type: "MCP",
    tags: ["eTax Mobile", "Thuế Điện Tử", "Tổng Cục Thuế", "Thuế TNCN", "Nghĩa Vụ Thuế", "Hành Chính Công", "Việt Nam"],
    author: "Tổng cục Thuế (Bộ Tài chính)",
    stars: 580,
    downloads: 21500,
    version: "2.5.2",
    updatedAt: "2026-10-20",
    imageUrl: "",
    demoImages: [],
    sourceUrl: "https://thuedientu.gdt.gov.vn/",
    purposeVi: "Cung cấp công cụ tra cứu thông tin nghĩa vụ thuế cá nhân và hộ kinh doanh theo chuẩn ứng dụng eTax Mobile của Tổng cục Thuế. Hỗ trợ tra cứu nhanh mã số thuế cá nhân theo số CCCD 12 số, kiểm tra thông báo nghĩa vụ tài chính đất đai, tra cứu tình trạng quyết toán thuế thu nhập cá nhân hàng năm và tạo mã định danh khoản nộp ID để nộp thuế qua ngân hàng.",
    installGuideVi: "### Hướng dẫn cài đặt và sử dụng máy chủ eTax Mobile Tra Cứu MCP:\n\n1. **Chuẩn bị môi trường thực thi**: Yêu cầu Node.js phiên bản từ 18.0 trở lên.\n\n2. **Cài đặt máy chủ MCP**:\n   ```bash\n   npm install -g @vietnam-tax/etax-mobile-mcp\n   ```\n\n3. **Cấu hình tích hợp vào tệp cấu hình của Claude Desktop hoặc Antigravity**:\n   Thêm cấu hình máy chủ MCP vào tệp cấu hình tương ứng.\n\n4. **Khởi động và xác thực**: Thực hiện tra cứu kiểm tra dữ liệu bằng số căn cước công dân hoặc mã số thuế.",
    usageGuideVi: "### Hướng dẫn gọi công cụ tra cứu nghĩa vụ thuế qua mã số thuế cá nhân:\n\nSau khi cấu hình máy chủ MCP, tác tử AI có thể trực tiếp thực thi lệnh tra cứu dữ liệu thuế như sau:\n\n```json\n{\n  \"name\": \"tra_cuu_nghia_vu_thue_tncn\",\n  \"arguments\": {\n    \"maSoThue\": \"8012345678\",\n    \"soCanCuocCongDan\": \"001099012345\",\n    \"namQuyetToan\": 2025\n  }\n}\n```\n\n**Phản hồi mẫu từ hệ thống Thuế điện tử:**\n```json\n{\n  \"trangThai\": \"THANH_CONG\",\n  \"nguoiNopThue\": {\n    \"hoVaTen\": \"NGUYEN VAN AN\",\n    \"maSoThue\": \"8012345678\",\n    \"coQuanThueQuanLy\": \"Chi cục Thuế Khu vực I - Cục Thuế TP Hà Nội\",\n    \"tinhTrangHoatDong\": \"Đang hoạt động\"\n  },\n  \"nghiaVuTaiChinh\": {\n    \"thueTNCNDaKhauTru\": 18500000,\n    \"thueTNCNPhaiNop\": 16200000,\n    \"soTienDuocHoan\": 2300000,\n    \"tienChamNop\": 0\n  }\n}\n```",
    configs: {
      claude: JSON.stringify({
        mcpServers: {
          "vietnam-etax-mcp": {
            command: "npx",
            args: ["-y", "@vietnam-tax/etax-mobile-mcp"]
          }
        }
      }, null, 2),
      antigravity: JSON.stringify({
        skills: [
          {
            name: "etax-mobile-inquiry",
            description: "Tra cứu nghĩa vụ thuế cá nhân và tạo mã định danh khoản nộp thuế điện tử",
            portalUrl: "https://thuedientu.gdt.gov.vn"
          }
        ]
      }, null, 2),
      cursor: JSON.stringify({
        tools: [
          {
            type: "mcp",
            name: "etax_tax_lookup",
            command: "npx",
            args: ["-y", "@vietnam-tax/etax-mobile-mcp"]
          }
        ]
      }, null, 2)
    }
  }
];

let addedCount = 0;
for (const item of batch6Tools) {
  const existingIdx = tools.findIndex(t => t.id === item.id);
  if (existingIdx >= 0) {
    tools[existingIdx] = item;
  } else {
    tools.unshift(item);
    addedCount++;
  }
}

fs.writeFileSync(toolsPath, JSON.stringify(tools, null, 2), 'utf8');
console.log(`Thành công! Đã thêm mới ${addedCount} công cụ đợt 6 (Base.vn, Stringee, eSMS, TikTok Shop, Shopee, Lazada, Vbee AI, SmartPay, SpeedSMS, eTax Mobile). Tổng số công cụ hiện tại: ${tools.length}`);
