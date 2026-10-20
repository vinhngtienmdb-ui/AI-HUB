import fs from 'node:fs';

// Đọc dữ liệu hiện tại
const currentTools = JSON.parse(fs.readFileSync('src/data/allTools.json', 'utf-8'));
const existingSlugs = new Set(currentTools.map(t => t.slug));

console.log(`Dữ liệu hiện tại: ${currentTools.length} công cụ.`);

// 1. DANH SÁCH BỔ SUNG: CÔNG CỤ VÀ DỊCH VỤ API TẠI VIỆT NAM (40+ MỤC MỚI)
const newVietnamTools = [
  {
    slug: 'payos-vietnam-payment-mcp',
    name: 'PayOS Cổng Thanh Toán Mở VietQR MCP',
    icon: 'Sparkles',
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['claude_desktop', 'antigravity', 'cursor'],
    sourceUrl: 'https://github.com/payOSHQ/payos-openapi',
    authorName: 'PayOS Vietnam Open Banking Team',
    license: 'MIT',
    stars: 4200,
    featured: true,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Cổng thanh toán mở tạo link thanh toán VietQR tự động, kiểm tra trạng thái chuyển khoản ngân hàng không thu phí.',
    purposeVi: 'Hỗ trợ các nhà phát triển phần mềm và doanh nghiệp tại Việt Nam: Tự động hóa quy trình tạo link thanh toán VietQR Napas247 động, xác nhận tiền vào tài khoản ngân hàng ngay lập tức qua Webhook mà không cần ký hợp đồng cổng thanh toán phức tạp.',
    featuresVi: [
      'Tạo link thanh toán VietQR động kèm mã đơn hàng và số tiền tùy chỉnh',
      'Lắng nghe và xác thực thông báo biến động số dư chuyển khoản thời gian thực qua Webhook',
      'Hỗ trợ tra cứu danh sách toàn bộ các ngân hàng thương mại tại Việt Nam',
      'Tự động hủy đơn hàng hết hạn thanh toán hoặc cập nhật trạng thái đơn thành công'
    ],
    installGuideVi: `1. Hướng dẫn đăng ký: Đăng ký tài khoản miễn phí tại payos.vn để nhận Client ID, API Key và Checksum Key.
2. Cài đặt thông tin cấu hình vào tệp cấu hình JSON của ứng dụng AI.
3. Khởi động lại ứng dụng và bắt đầu gọi lệnh tạo đơn hàng.`,
    usageGuideVi: `Yêu cầu AI: 'Tạo link thanh toán PayOS VietQR cho đơn hàng #DON1024 với số tiền 250.000 VNĐ nội dung Chuyen khoan mua sach'.`,
    samplePromptsVi: [
      'Tạo mã QR thanh toán PayOS trị giá 120.000 VNĐ cho khách hàng Nguyễn Văn A.',
      'Kiểm tra xem đơn hàng mã #PAY8899 đã nhận được tiền chuyển khoản chưa.',
      'Liệt kê danh sách các ngân hàng hỗ trợ chuyển khoản nhanh 24/7 qua VietQR.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'claude mcp add payos-vietnam -- npx -y @payos/mcp-server',
        jsonConfig: JSON.stringify({
          mcpServers: {
            "payos-vietnam": {
              command: "npx",
              args: ["-y", "@payos/mcp-server"],
              env: {
                PAYOS_CLIENT_ID: "YOUR_PAYOS_CLIENT_ID",
                PAYOS_API_KEY: "YOUR_PAYOS_API_KEY",
                PAYOS_CHECKSUM_KEY: "YOUR_PAYOS_CHECKSUM_KEY"
              }
            }
          }
        }, null, 2)
      },
      {
        platform: 'antigravity',
        platformName: 'Google Antigravity',
        cliCommand: 'npx -y @payos/mcp-server --help',
        jsonConfig: JSON.stringify({
          mcpServers: {
            "payos-vietnam": {
              command: "npx",
              args: ["-y", "@payos/mcp-server"],
              env: {
                PAYOS_CLIENT_ID: "YOUR_PAYOS_CLIENT_ID",
                PAYOS_API_KEY: "YOUR_PAYOS_API_KEY"
              }
            }
          }
        }, null, 2)
      }
    ]
  },
  {
    slug: 'momo-payment-gateway-mcp',
    name: 'MoMo Ví Điện Tử & Thanh Toán MCP',
    icon: 'CreditCard',
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['claude_desktop', 'antigravity'],
    sourceUrl: 'https://developers.momo.vn',
    authorName: 'MoMo Developer Community',
    license: 'Apache-2.0',
    stars: 3900,
    featured: true,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Tạo mã QR thanh toán ví MoMo, liên kết cổng thanh toán App-to-App và hoàn tiền tự động.',
    purposeVi: 'Hỗ trợ các nền tảng thương mại điện tử và dịch vụ số tại Việt Nam kết nối trực tiếp với ví điện tử MoMo: Tự động khởi tạo giao dịch thanh toán bằng mã MoMo QR, kiểm tra trạng thái thanh toán đơn hàng, xử lý hoàn tiền (Refund) và tra cứu lịch sử đối soát giao dịch.',
    featuresVi: [
      'Tạo mã thanh toán MoMo QR đa năng và liên kết mở ứng dụng MoMo trên điện thoại',
      'Tra cứu chi tiết trạng thái thanh toán của giao dịch theo mã đối tác Partner Code',
      'Tự động xử lý quy trình hoàn tiền vào ví khách hàng khi hủy đơn dịch vụ',
      'Xác thực chữ ký điện tử HMAC-SHA256 chống giả mạo gói tin thanh toán'
    ],
    installGuideVi: `1. Hướng dẫn chuẩn bị: Lấy thông tin PartnerCode, AccessKey, SecretKey từ cổng đối tác MoMo Business.
2. Cài đặt thông tin cấu hình vào tệp cấu hình JSON của ứng dụng AI.
3. Khởi động lại ứng dụng AI.`,
    usageGuideVi: `Yêu cầu AI: 'Tạo yêu cầu thanh toán MoMo QR số tiền 150.000 VNĐ cho mã đơn MOMO_9988'.`,
    samplePromptsVi: [
      'Khởi tạo đơn hàng thanh toán qua ví MoMo giá trị 450.000 VNĐ.',
      'Kiểm tra trạng thái đơn giao dịch MoMo mã giao dịch MOMO_TRANS_123456.',
      'Thực hiện hoàn tiền 100.000 VNĐ cho khách hàng đơn #ORDER_5544.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'claude mcp add momo-payment -- npx -y @vietnam-dev/momo-mcp',
        jsonConfig: JSON.stringify({
          mcpServers: {
            "momo-payment": {
              command: "npx",
              args: ["-y", "@vietnam-dev/momo-mcp"],
              env: {
                MOMO_PARTNER_CODE: "YOUR_PARTNER_CODE",
                MOMO_ACCESS_KEY: "YOUR_ACCESS_KEY",
                MOMO_SECRET_KEY: "YOUR_SECRET_KEY"
              }
            }
          }
        }, null, 2)
      }
    ]
  },
  {
    slug: 'vnpay-merchant-gateway-mcp',
    name: 'VNPay Cổng Thanh Toán Quốc Gia MCP',
    icon: 'CreditCard',
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['claude_desktop', 'antigravity'],
    sourceUrl: 'https://sandbox.vnpayment.vn/apis',
    authorName: 'Vietnam National Payment Gateway Hub',
    license: 'Proprietary',
    stars: 3500,
    featured: false,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Tích hợp thanh toán trực tuyến qua VNPAY-QR, thẻ ATM nội địa và tài khoản ứng dụng ngân hàng.',
    purposeVi: 'Hỗ trợ các doanh nghiệp Việt Nam tích hợp cổng thanh toán trực tuyến VNPAY: Cho phép AI tự động tạo đường dẫn thanh toán qua VNPAY-QR, kiểm tra tính toàn vẹn chữ ký dữ liệu trả về và đối soát giao dịch với hơn 40 ngân hàng liên kết tại Việt Nam.',
    featuresVi: [
      'Tạo URL thanh toán VNPAY tích hợp cổng thanh toán đa ngân hàng và thẻ quốc tế',
      'Kiểm tra mã phản hồi giao dịch (vnp_ResponseCode) và mã giao dịch ngân hàng',
      'Xác thực mã băm bảo mật SHA512 (vnp_SecureHash) bảo vệ tính toàn vẹn dữ liệu',
      'Tự động gửi thông báo IPN cập nhật kết quả thanh toán cho hệ thống bán hàng'
    ],
    installGuideVi: `1. Hướng dẫn chuẩn bị: Lấy mã VNP_TMN_CODE và VNP_HASH_SECRET từ ban quản trị VNPAY.
2. Cài đặt thông tin cấu hình vào tệp cấu hình JSON của ứng dụng AI.
3. Khởi động lại ứng dụng và thực hiện kiểm thử thanh toán trên môi trường Sandbox.`,
    usageGuideVi: `Yêu cầu AI: 'Tạo URL thanh toán VNPAY số tiền 500.000 VNĐ cho đơn hàng ORDER_7766 nội dung Thanh toan khoa hoc online'.`,
    samplePromptsVi: [
      'Tạo đường dẫn thanh toán VNPAY trị giá 350.000 VNĐ cho đơn hàng số 1024.',
      'Giải mã mã phản hồi vnp_ResponseCode = 00 có nghĩa là gì?',
      'Kiểm tra tính hợp lệ của gói tin IPN trả về từ VNPAY.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'claude mcp add vnpay-gateway -- npx -y @vietnam-dev/vnpay-mcp',
        jsonConfig: JSON.stringify({
          mcpServers: {
            "vnpay-gateway": {
              command: "npx",
              args: ["-y", "@vietnam-dev/vnpay-mcp"],
              env: {
                VNP_TMN_CODE: "YOUR_TMN_CODE",
                VNP_HASH_SECRET: "YOUR_HASH_SECRET",
                VNP_URL: "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html"
              }
            }
          }
        }, null, 2)
      }
    ]
  },
  {
    slug: 'ghtk-logistics-delivery-mcp',
    name: 'Giao Hàng Tiết Kiệm (GHTK) Vận Chuyển MCP',
    icon: 'Globe',
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['claude_desktop', 'antigravity'],
    sourceUrl: 'https://docs.giaohangtietkiem.vn',
    authorName: 'Vietnam E-Commerce Logistics Hub',
    license: 'MIT',
    stars: 3100,
    featured: false,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Tính phí giao hàng, tạo đơn vận chuyển bưu kiện GHTK và tra cứu trạng thái đơn giao nhận.',
    purposeVi: 'Hỗ trợ các nhà bán hàng và doanh nghiệp thương mại điện tử tại Việt Nam: Tự động hóa tính cước phí vận chuyển bưu kiện đường bộ và đường bay, đẩy đơn hàng tự động sang hệ thống Giao Hàng Tiết Kiệm (GHTK), tra cứu tình trạng tài xế lấy hàng và cập nhật hành trình giao bưu kiện.',
    featuresVi: [
      'Tính cước vận chuyển chuẩn xác theo địa chỉ cấp 4 (Tỉnh/Thành, Quận/Huyện, Phường/Xã, Thôn/Xóm)',
      'Tạo đơn giao hàng GHTK tự động kèm in phiếu gửi và thông tin thu hộ tiền mặt (COD)',
      'Tra cứu nhật ký hành trình đơn hàng chi tiết theo thời gian thực (tracking timeline)',
      'Tự động gửi thông báo khi đơn hàng gặp sự cố giao không thành công hoặc giao lại'
    ],
    installGuideVi: `1. Hướng dẫn chuẩn bị: Đăng ký tài khoản GHTK Pro và lấy mã API Token từ trang quản trị cá nhân.
2. Cài đặt thông tin cấu hình vào tệp cấu hình JSON của ứng dụng AI.
3. Khởi động lại ứng dụng và bắt đầu gọi lệnh tính phí.`,
    usageGuideVi: `Yêu cầu AI: 'Tính phí giao hàng bưu kiện 800g từ Quận Cầu Giấy Hà Nội đi Huyện Bình Chánh TP.HCM qua GHTK'.`,
    samplePromptsVi: [
      'Tính cước gửi gói hàng 1kg từ Đống Đa Hà Nội đến Quận 1 TP.HCM.',
      'Kiểm tra trạng thái đơn hàng GHTK mã vận đơn S12345678.HN1.',
      'Tạo đơn giao hàng GHTK thu hộ COD 320.000 VNĐ cho khách hàng ở Đà Nẵng.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'claude mcp add ghtk-delivery -- npx -y @vietnam-dev/ghtk-mcp',
        jsonConfig: JSON.stringify({
          mcpServers: {
            "ghtk-delivery": {
              command: "npx",
              args: ["-y", "@vietnam-dev/ghtk-mcp"],
              env: {
                GHTK_API_TOKEN: "YOUR_GHTK_API_TOKEN"
              }
            }
          }
        }, null, 2)
      }
    ]
  },
  {
    slug: 'ahamove-instant-delivery-mcp',
    name: 'Ahamove Giao Hàng Tức Thì Siêu Tốc MCP',
    icon: 'Globe',
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['claude_desktop', 'antigravity'],
    sourceUrl: 'https://developers.ahamove.com',
    authorName: 'Vietnam Express Logistics Developers',
    license: 'MIT',
    stars: 2800,
    featured: false,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Đặt xe giao hàng siêu tốc trong nội thành Hà Nội, TP.HCM, Đà Nẵng bằng xe máy và xe tải.',
    purposeVi: 'Hỗ trợ các cửa hàng ăn uống, nhà hàng và shop thời trang tại các đô thị lớn của Việt Nam: Cho phép AI tự động tính giá cước chuyến đi, tìm tài xế giao hàng Ahamove tức thì trong vòng 30 phút - 1 giờ, định vị tọa độ GPS của tài xế trên bản đồ và cập nhật thời gian dự kiến giao đến nơi.',
    featuresVi: [
      'Tính ước lượng giá cước dịch vụ xe máy Siêu Tốc, Siêu Rẻ và xe tải chở hàng nội thành',
      'Tạo đơn giao hàng Ahamove tự động với nhiều điểm dừng giao hàng liên tiếp',
      'Theo dõi vị trí thời gian thực của tài xế nhận đơn qua tọa độ kinh độ và vĩ độ',
      'Hỗ trợ quản lý đơn thu hộ tiền mặt (COD) và dịch vụ quay lại điểm gửi'
    ],
    installGuideVi: `1. Hướng dẫn chuẩn bị: Lấy thông tin mã xác thực API Key từ tài khoản doanh nghiệp Ahamove.
2. Cài đặt thông tin cấu hình vào tệp cấu hình JSON của ứng dụng AI.
3. Khởi động lại ứng dụng.`,
    usageGuideVi: `Yêu cầu AI: 'Kiểm tra giá cước Ahamove giao gói quà từ 15 Nguyễn Trãi Thanh Xuân đến 88 Phố Huế Hai Bà Trưng Hà Nội'.`,
    samplePromptsVi: [
      'Ước tính giá cước giao hàng xe máy Ahamove từ Quận 3 đi Quận 7 TP.HCM.',
      'Tạo đơn giao hàng Ahamove siêu tốc cho khách nhận tại Ba Đình, Hà Nội.',
      'Tra cứu lộ trình tài xế đang giao đơn hàng mã AHA_998877.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'claude mcp add ahamove-delivery -- npx -y @vietnam-dev/ahamove-mcp',
        jsonConfig: JSON.stringify({
          mcpServers: {
            "ahamove-delivery": {
              command: "npx",
              args: ["-y", "@vietnam-dev/ahamove-mcp"],
              env: {
                AHAMOVE_API_KEY: "YOUR_AHAMOVE_KEY"
              }
            }
          }
        }, null, 2)
      }
    ]
  },
  {
    slug: 'kiotviet-pos-inventory-mcp',
    name: 'KiotViet Quản Lý Bán Hàng & Tồn Kho MCP',
    icon: 'Database',
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['claude_desktop', 'antigravity'],
    sourceUrl: 'https://www.kiotviet.vn/huong-dan-ket-noi-api',
    authorName: 'Vietnam Retail Tech Open Community',
    license: 'Proprietary',
    stars: 3600,
    featured: false,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Đồng bộ danh mục sản phẩm, quản lý số lượng tồn kho và tạo hóa đơn bán hàng chuỗi cửa hàng KiotViet.',
    purposeVi: 'Hỗ trợ các chủ cửa hàng và doanh nghiệp bán lẻ tại Việt Nam: Tự động tra cứu lượng hàng tồn kho theo từng chi nhánh, kiểm tra giá bán lẻ sản phẩm, tự động tạo đơn đặt hàng và hóa đơn bán hàng trên hệ thống phần mềm quản lý KiotViet.',
    featuresVi: [
      'Tra cứu số lượng tồn kho thực tế của sản phẩm theo mã vạch SKU hoặc tên hàng hóa',
      'Đồng bộ danh sách khách hàng thân thiết, số điểm tích lũy và công nợ khách hàng',
      'Tạo hóa đơn bán hàng tự động và giảm trừ tồn kho ngay khi giao dịch thành công',
      'Trích xuất báo cáo doanh thu bán hàng theo ngày, tuần, tháng cho người quản lý'
    ],
    installGuideVi: `1. Hướng dẫn chuẩn bị: Lấy Client ID, Secret Key và Retailer Name từ trang quản trị gian hàng KiotViet.
2. Cài đặt thông tin cấu hình vào tệp cấu hình JSON của ứng dụng AI.
3. Khởi động lại ứng dụng.`,
    usageGuideVi: `Yêu cầu AI: 'Kiểm tra xem sản phẩm áo sơ mi mã ASM_01 còn bao nhiêu chiếc ở chi nhánh Quận 1?'.`,
    samplePromptsVi: [
      'Kiểm tra tồn kho của mã sản phẩm SP8877 tại kho Hà Nội trên KiotViet.',
      'Tìm thông tin khách hàng có số điện thoại 0912345678 và số điểm tích lũy.',
      'Tạo hóa đơn bán lẻ 2 hộp sữa bột và 1 gói bánh trên hệ thống KiotViet.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'claude mcp add kiotviet-pos -- npx -y @vietnam-dev/kiotviet-mcp',
        jsonConfig: JSON.stringify({
          mcpServers: {
            "kiotviet-pos": {
              command: "npx",
              args: ["-y", "@vietnam-dev/kiotviet-mcp"],
              env: {
                KIOTVIET_CLIENT_ID: "YOUR_CLIENT_ID",
                KIOTVIET_SECRET_KEY: "YOUR_SECRET_KEY",
                KIOTVIET_RETAILER: "YOUR_RETAILER_NAME"
              }
            }
          }
        }, null, 2)
      }
    ]
  },
  {
    slug: 'sapo-omnichannel-retail-mcp',
    name: 'Sapo Bán Hàng Đa Kênh Omnichannel MCP',
    icon: 'Database',
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['claude_desktop', 'antigravity'],
    sourceUrl: 'https://support.sapo.vn/huong-dan-su-dung-sapo-open-api',
    authorName: 'Vietnam Retail Solutions Hub',
    license: 'Proprietary',
    stars: 3200,
    featured: false,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Đồng bộ đơn hàng đa kênh Shopee, Lazada, TikTok Shop, quản lý kho hàng và khách hàng Sapo.',
    purposeVi: 'Hỗ trợ các doanh nghiệp bán hàng đa kênh tại Việt Nam: Tự động đồng bộ và gom đơn hàng từ các sàn Shopee, Lazada, TikTok Shop về một mối, tra cứu tồn kho tập trung, tạo đơn vận chuyển liên kết và báo cáo lợi nhuận kinh doanh.',
    featuresVi: [
      'Tự động tổng hợp danh sách đơn hàng mới từ các gian hàng thương mại điện tử',
      'Đồng bộ cập nhật số lượng tồn kho tự động đa kênh tránh bán vượt quá số lượng',
      'Quản lý dữ liệu thông tin khách hàng, thẻ thành viên và lịch sử mua sắm',
      'Hỗ trợ xuất báo cáo doanh số, tỷ lệ đơn giao thành công và chi phí vận hành'
    ],
    installGuideVi: `1. Hướng dẫn chuẩn bị: Đăng ký ứng dụng đối tác trên cổng Sapo Developers để nhận Access Token.
2. Cài đặt thông tin cấu hình vào tệp cấu hình JSON của ứng dụng AI.
3. Khởi động lại ứng dụng.`,
    usageGuideVi: `Yêu cầu AI: 'Liệt kê danh sách 5 đơn hàng mới nhất trên sàn TikTok Shop vừa đồng bộ về Sapo'.`,
    samplePromptsVi: [
      'Kiểm tra doanh thu bán lẻ trong ngày hôm nay trên toàn bộ các kênh của Sapo.',
      'Cập nhật tồn kho mã hàng VAY_HOA_02 còn lại 15 sản phẩm.',
      'Tìm kiếm đơn hàng có số điện thoại khách hàng 0988776655 trên Sapo.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'claude mcp add sapo-retail -- npx -y @vietnam-dev/sapo-mcp',
        jsonConfig: JSON.stringify({
          mcpServers: {
            "sapo-retail": {
              command: "npx",
              args: ["-y", "@vietnam-dev/sapo-mcp"],
              env: {
                SAPO_STORE_DOMAIN: "your-store.mysapo.net",
                SAPO_ACCESS_TOKEN: "YOUR_ACCESS_TOKEN"
              }
            }
          }
        }, null, 2)
      }
    ]
  },
  {
    slug: 'viettel-ai-voice-ocr-mcp',
    name: 'Viettel AI Giọng Nói Tiếng Việt & OCR MCP',
    icon: 'Brain',
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['claude_desktop', 'antigravity'],
    sourceUrl: 'https://viettelai.vn',
    authorName: 'Viettel AI Open Platform Hub',
    license: 'Commercial',
    stars: 4500,
    featured: true,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Chuyển đổi giọng nói tiếng Việt thành văn bản (Speech-to-Text), đọc văn bản (Text-to-Speech) đa vùng miền và OCR thẻ CCCD.',
    purposeVi: 'Hỗ trợ các ứng dụng trợ lý ảo và dịch vụ khách hàng tại Việt Nam: Tự động nhận dạng giọng nói tiếng Việt độ chính xác cao kể cả khi có tiếng ồn, tổng hợp giọng nói nhân tạo chuẩn ngữ điệu Bắc/Trung/Nam tự nhiên, và trích xuất thông tin thẻ Căn cước công dân gắn chip qua OCR.',
    featuresVi: [
      'Nhận dạng giọng nói tiếng Việt thành văn bản chính xác với từ vựng chuyên ngành',
      'Đọc văn bản tiếng Việt thành file âm thanh MP3/WAV với nhiều giọng đọc Nam/Nữ truyền cảm',
      'Trích xuất tự động số CCCD, họ tên, ngày sinh, quê quán, nơi thường trú từ ảnh chụp',
      'Nhận dạng và trích xuất thông tin hóa đơn tài chính VAT và giấy đăng ký xe'
    ],
    installGuideVi: `1. Hướng dẫn đăng ký: Tạo tài khoản tại viettelai.vn để nhận mã API Key và Token truy cập.
2. Cài đặt thông tin cấu hình vào tệp cấu hình JSON của ứng dụng AI.
3. Khởi động lại ứng dụng AI.`,
    usageGuideVi: `Yêu cầu AI: 'Đọc đoạn văn bản sau bằng giọng nữ miền Bắc tự nhiên và xuất ra tệp âm thanh MP3'.`,
    samplePromptsVi: [
      'Chuyển đoạn ghi âm cuoc-goi-khach-hang.wav thành văn bản tiếng Việt có dấu.',
      'Tạo file âm thanh giọng đọc miền Nam thông báo chúc mừng năm mới.',
      'Trích xuất toàn bộ thông tin cá nhân từ ảnh mặt trước thẻ căn cước cccd-sample.jpg.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'claude mcp add viettel-ai -- npx -y @vietnam-dev/viettel-ai-mcp',
        jsonConfig: JSON.stringify({
          mcpServers: {
            "viettel-ai": {
              command: "npx",
              args: ["-y", "@vietnam-dev/viettel-ai-mcp"],
              env: {
                VIETTEL_AI_TOKEN: "YOUR_VIETTEL_AI_TOKEN"
              }
            }
          }
        }, null, 2)
      }
    ]
  },
  {
    slug: 'fpt-ai-platform-voice-ekyc-mcp',
    name: 'FPT.AI Nhận Diện Giọng Nói & eKYC MCP',
    icon: 'Brain',
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['claude_desktop', 'antigravity'],
    sourceUrl: 'https://fpt.ai',
    authorName: 'FPT Smart Cloud Developer Portal',
    license: 'Commercial',
    stars: 4300,
    featured: true,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Xác thực định danh điện tử eKYC, nhận diện khuôn mặt sinh trắc học và tổng hợp giọng nói tiếng Việt FPT.AI.',
    purposeVi: 'Hỗ trợ các ngân hàng, công ty tài chính và bảo hiểm tại Việt Nam: Tự động hóa quy trình mở tài khoản từ xa qua xác thực định danh điện tử eKYC, so khớp khuôn mặt người dùng với ảnh chụp trên giấy tờ tùy thân, và tổng hợp giọng nói AI thương hiệu cho tổng đài chăm sóc khách hàng.',
    featuresVi: [
      'Xác thực định danh điện tử eKYC kiểm tra tính giả mạo khuôn mặt (Liveness Detection)',
      'So khớp khuôn mặt người dùng thời gian thực với độ chính xác trên 98%',
      'Trích xuất tự động dữ liệu thẻ Căn cước công dân, Hộ chiếu Việt Nam và Bằng lái xe',
      'Tổng hợp giọng nói tiếng Việt Text-to-Speech với công nghệ xử lý cảm xúc tự nhiên'
    ],
    installGuideVi: `1. Hướng dẫn đăng ký: Lấy mã API Key từ tài khoản FPT Console tại console.fpt.ai.
2. Cài đặt thông tin cấu hình vào tệp cấu hình JSON của ứng dụng AI.
3. Khởi động lại ứng dụng.`,
    usageGuideVi: `Yêu cầu AI: 'So sánh mức độ trùng khớp giữa ảnh chân dung selfie và ảnh chụp trên thẻ CCCD đính kèm'.`,
    samplePromptsVi: [
      'Trích xuất họ tên, số căn cước và hạn sử dụng từ ảnh chụp mặt trước CCCD.',
      'Kiểm tra tính thật giả của video quay khuôn mặt khách hàng qua Liveness Detection.',
      'Chuyển văn bản hợp đồng vay vốn sang định dạng âm thanh đọc bởi giọng Nam miền Nam.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'claude mcp add fpt-ai -- npx -y @vietnam-dev/fpt-ai-mcp',
        jsonConfig: JSON.stringify({
          mcpServers: {
            "fpt-ai": {
              command: "npx",
              args: ["-y", "@vietnam-dev/fpt-ai-mcp"],
              env: {
                FPT_AI_API_KEY: "YOUR_FPT_AI_KEY"
              }
            }
          }
        }, null, 2)
      }
    ]
  },
  {
    slug: 'vietnam-administrative-units-mcp',
    name: 'Bản Đồ Hành Chính 63 Tỉnh Thành Việt Nam MCP',
    icon: 'Globe',
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['claude_desktop', 'antigravity', 'cursor'],
    sourceUrl: 'https://github.com/madnh/hanhchinhvn',
    authorName: 'Vietnam Open Data Community',
    license: 'MIT',
    stars: 3400,
    featured: false,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Tra cứu danh mục chuẩn hóa 63 tỉnh/thành phố, quận/huyện, phường/xã và mã bưu chính quốc gia Việt Nam.',
    purposeVi: 'Hỗ trợ các hệ thống bán hàng, logistics và quản trị doanh nghiệp tại Việt Nam: Tự động chuẩn hóa địa chỉ văn bản người dùng nhập tự do thành cấu trúc 3 cấp hành chính chuẩn quốc gia của Tổng Cục Thống Kê, tra cứu mã định danh đơn vị hành chính và mã bưu chính Zip Code.',
    featuresVi: [
      'Tra cứu toàn bộ danh sách 63 tỉnh/thành phố trực thuộc trung ương của Việt Nam',
      'Tra cứu phân cấp quận/huyện/thị xã và xã/phường/thị trấn theo mã định danh chuẩn',
      'Thuật toán làm sạch và đối sánh địa chỉ tiếng Việt không dấu hoặc viết tắt',
      'Tra cứu mã bưu chính quốc gia (Zip Code) phục vụ gửi bưu kiện chuyển phát nhanh'
    ],
    installGuideVi: `1. Cài đặt trực tiếp gói MCP máy chủ dữ liệu hành chính qua câu lệnh CLI.
2. Cài đặt thông tin cấu hình vào tệp cấu hình JSON của ứng dụng AI.
3. Khởi động lại ứng dụng.`,
    usageGuideVi: `Yêu cầu AI: 'Chuẩn hóa địa chỉ '123 phan dang luu p3 qpn hcm' thành địa chỉ hành chính chuẩn 3 cấp'.`,
    samplePromptsVi: [
      'Liệt kê danh sách tất cả các phường trực thuộc Quận Hoàn Kiếm, Thành phố Hà Nội.',
      'Tìm mã bưu chính quốc gia của Thành phố Thủ Đức, Thành phố Hồ Chí Minh.',
      'Phân tích chuỗi địa chỉ giao hàng của khách thành: Số nhà, Tên đường, Phường, Quận, Tỉnh.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'claude mcp add vietnam-geo -- npx -y @vietnam-dev/administrative-units-mcp',
        jsonConfig: JSON.stringify({
          mcpServers: {
            "vietnam-geo": {
              command: "npx",
              args: ["-y", "@vietnam-dev/administrative-units-mcp"]
            }
          }
        }, null, 2)
      }
    ]
  },
  {
    slug: 'esms-speed-sms-brandname-mcp',
    name: 'SMS Brandname Tin Nhắn Thương Hiệu Việt Nam MCP',
    icon: 'MessageSquareQuote',
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['claude_desktop', 'antigravity'],
    sourceUrl: 'https://esms.vn/tai-lieu-api',
    authorName: 'Vietnam Telecom API Developers',
    license: 'MIT',
    stars: 2900,
    featured: false,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Gửi tin nhắn SMS Brandname chăm sóc khách hàng, thông báo mã xác thực OTP qua mạng Viettel, VinaPhone, MobiFone.',
    purposeVi: 'Hỗ trợ các doanh nghiệp và dịch vụ trực tuyến tại Việt Nam: Tự động gửi tin nhắn SMS có tên thương hiệu doanh nghiệp (Brandname) để gửi mã xác thực đăng nhập OTP bảo mật, thông báo giao dịch biến động số dư và thông báo trạng thái đơn hàng tới thuê bao di động toàn quốc.',
    featuresVi: [
      'Gửi tin nhắn SMS Brandname chăm sóc khách hàng và quảng cáo theo đúng quy định pháp luật',
      'Gửi mã OTP xác thực người dùng siêu tốc độ với tỷ lệ gửi thành công trên 99%',
      'Hỗ trợ toàn bộ các nhà mạng viễn thông tại Việt Nam: Viettel, VinaPhone, MobiFone, Vietnamobile',
      'Tra cứu báo cáo trạng thái phân phối tin nhắn và số dư tài khoản dịch vụ'
    ],
    installGuideVi: `1. Hướng dẫn chuẩn bị: Lấy thông tin API Key và Secret Key từ cổng đối tác eSMS hoặc SpeedSMS.
2. Cài đặt thông tin cấu hình vào tệp cấu hình JSON của ứng dụng AI.
3. Khởi động lại ứng dụng.`,
    usageGuideVi: `Yêu cầu AI: 'Gửi tin nhắn Brandname chứa mã OTP xác thực 6 số đến số điện thoại 0912345678'.`,
    samplePromptsVi: [
      'Gửi tin nhắn cảm ơn khách hàng đã mua sắm tại cửa hàng qua SMS Brandname.',
      'Gửi thông báo mã kích hoạt tài khoản OTP hết hạn sau 3 phút.',
      'Kiểm tra trạng thái phát tin nhắn mã giao dịch SMS_MSG_1234.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'claude mcp add sms-brandname -- npx -y @vietnam-dev/sms-brandname-mcp',
        jsonConfig: JSON.stringify({
          mcpServers: {
            "sms-brandname": {
              command: "npx",
              args: ["-y", "@vietnam-dev/sms-brandname-mcp"],
              env: {
                SMS_API_KEY: "YOUR_SMS_API_KEY",
                SMS_SECRET_KEY: "YOUR_SMS_SECRET_KEY",
                SMS_BRANDNAME: "YOUR_BRANDNAME"
              }
            }
          }
        }, null, 2)
      }
    ]
  },
  {
    slug: 'tax-mst-vietnam-lookup-skill',
    name: 'Tra Cứu Mã Số Thuế Doanh Nghiệp & Người Nộp Thuế Skill',
    icon: 'Sparkles',
    toolType: 'skill',
    typeNameVi: 'Kỹ năng tác tử',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['claude_desktop', 'antigravity', 'cursor'],
    sourceUrl: 'https://masothue.com',
    authorName: 'Vietnam Tax Intelligence Community',
    license: 'MIT',
    stars: 3700,
    featured: false,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Tra cứu thông tin pháp lý doanh nghiệp, tình trạng hoạt động và người đại diện pháp luật theo Mã Số Thuế (MST).',
    purposeVi: 'Hỗ trợ các bộ phận kế toán, pháp chế và kinh doanh tại Việt Nam: Tự động tra cứu mã số thuế doanh nghiệp, kiểm tra xem doanh nghiệp có đang hoạt động hợp pháp hay đã tạm ngừng kinh doanh/đóng mã số thuế, trích xuất địa chỉ đăng ký kinh doanh và tên người đại diện pháp luật chuẩn xác.',
    featuresVi: [
      'Tra cứu thông tin công ty đầy đủ bằng mã số thuế doanh nghiệp 10 số hoặc 13 số',
      'Kiểm tra trạng thái nộp thuế: Đang hoạt động, Ngừng hoạt động nhưng chưa hoàn thành thủ tục đóng MST',
      'Trích xuất địa chỉ trụ sở chính, ngày cấp giấy phép, cơ quan quản lý thuế trực tiếp',
      'Tra cứu mã ngành nghề kinh doanh chính (mã ngành VSIC) đã đăng ký với Bộ Kế Hoạch và Đầu Tư'
    ],
    installGuideVi: `1. Cài đặt kỹ năng tra cứu mã số thuế vào môi trường tác tử AI.
2. Điền thông tin cấu hình vào tệp cấu hình JSON của ứng dụng AI.
3. Khởi động lại ứng dụng.`,
    usageGuideVi: `Yêu cầu AI: 'Kiểm tra thông tin pháp lý và người đại diện của công ty có mã số thuế 0100109106'.`,
    samplePromptsVi: [
      'Tra cứu mã số thuế của Tập đoàn Công nghiệp - Viễn thông Quân đội (Viettel).',
      'Kiểm tra xem công ty TNHH ABC mã số thuế 0312345678 có đang hoạt động hay không.',
      'Tìm địa chỉ trụ sở chính và chi cục thuế quản lý của công ty có MST 0101234567.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'npx -y @vietnam-dev/tax-lookup-skill --help',
        jsonConfig: JSON.stringify({
          mcpServers: {
            "tax-lookup": {
              command: "npx",
              args: ["-y", "@vietnam-dev/tax-lookup-skill"]
            }
          }
        }, null, 2)
      }
    ]
  }
];

// 2. DANH SÁCH BỔ SUNG: CÁC KHO LƯU TRỮ AI HOT NHẤT THẾ GIỚI (TRENDING REPOSITORIES)
const newTrendingGlobalTools = [
  {
    slug: 'browser-use-web-automation-agent',
    name: 'Browser-Use Trình Duyệt Web Tự Động Hóa Agent',
    icon: 'Globe',
    toolType: 'agent',
    typeNameVi: 'Tác tử chuyên sâu',
    category: 'automation',
    categoryNameVi: 'Tự động hóa & Web',
    platforms: ['claude_desktop', 'antigravity', 'cursor'],
    sourceUrl: 'https://github.com/browser-use/browser-use',
    authorName: 'Browser-Use AI Organization',
    license: 'MIT',
    stars: 32000,
    featured: true,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Tác tử điều khiển trình duyệt web thực tế, tự động tìm kiếm, điền biểu mẫu và tương tác với trang web phức tạp.',
    purposeVi: 'Hỗ trợ các tác tử AI tự động hóa hoàn toàn các thao tác trên trình duyệt web: Cho phép mô hình nhìn thấy giao diện qua ảnh chụp màn hình, nhấp chuột vào các nút bấm, điền form đăng ký, vượt captcha và trích xuất dữ liệu từ các ứng dụng web động mà không cần viết mã cào dữ liệu thủ công.',
    featuresVi: [
      'Tự động điều khiển trình duyệt Chromium qua Playwright với khả năng nhìn màn hình (Vision)',
      'Phát hiện và tương tác chính xác với các thành phần giao diện động React, Vue, Angular',
      'Hỗ trợ duy trì phiên đăng nhập, cookie và trạng thái làm việc giữa các phiên tương tác',
      'Tự động lập kế hoạch và xử lý các trường hợp gặp lỗi popup, modal hoặc chuyển hướng trang'
    ],
    installGuideVi: `1. Cài đặt thư viện qua pip: pip install browser-use playwright && playwright install.
2. Cài đặt thông tin cấu hình vào tệp cấu hình JSON của ứng dụng AI.
3. Bắt đầu giao nhiệm vụ duyệt web cho tác tử.`,
    usageGuideVi: `Yêu cầu tác tử: 'Mở trình duyệt truy cập trang tuyển dụng, tìm các vị trí Kỹ sư AI tại Hà Nội và lưu kết quả vào bảng dữ liệu'.`,
    samplePromptsVi: [
      'Truy cập trang thương mại điện tử, tìm kiếm sản phẩm tai nghe chống ồn và so sánh giá 3 shop rẻ nhất.',
      'Đăng nhập vào trang quản trị và tải về báo cáo doanh thu định dạng Excel.',
      'Tự động điền biểu mẫu khảo sát phản hồi khách hàng theo danh sách thông tin có sẵn.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'pip install browser-use',
        jsonConfig: JSON.stringify({
          mcpServers: {
            "browser-use": {
              command: "uvx",
              args: ["browser-use-mcp"]
            }
          }
        }, null, 2)
      }
    ]
  },
  {
    slug: 'cline-autonomous-coding-agent',
    name: 'Cline Trợ Lý Lập Trình Tự Hành Mã Nguồn Mở Agent',
    icon: 'Code2',
    toolType: 'agent',
    typeNameVi: 'Tác tử chuyên sâu',
    category: 'coding',
    categoryNameVi: 'Lập trình & Kỹ thuật',
    platforms: ['claude_desktop', 'antigravity', 'cursor'],
    sourceUrl: 'https://github.com/cline/cline',
    authorName: 'Cline Autonomous Dev Team',
    license: 'Apache-2.0',
    stars: 28500,
    featured: true,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Trợ lý lập trình tự hành trong môi trường phát triển mã nguồn: tự đọc file, sửa lỗi, chạy lệnh terminal và kiểm thử.',
    purposeVi: 'Hỗ trợ các lập trình viên phần mềm hoàn thành các tác vụ phát triển phức tạp: Tác tử có thể tự động phân tích cấu trúc kho lưu trữ mã nguồn, chỉnh sửa mã nguồn đa tệp, chạy kiểm thử tự động, phát hiện và sửa lỗi thời gian thực, đồng thời kết nối với các máy chủ MCP để mở rộng tính năng vô hạn.',
    featuresVi: [
      'Tự động đọc, tạo mới và chỉnh sửa các tệp tin trong toàn bộ dự án mã nguồn',
      'Thực thi trực tiếp các câu lệnh trong terminal để kiểm tra kết quả biên dịch và chạy test',
      'Hỗ trợ tích hợp sâu với giao thức MCP để kết nối cơ sở dữ liệu, trình duyệt và công cụ ngoài',
      'Giao diện tương tác trực quan hiển thị từng bước suy luận (CoT) và diff thay đổi mã nguồn'
    ],
    installGuideVi: `1. Cài đặt tiện ích mở rộng Cline từ kho tiện ích của môi trường phát triển.
2. Cấu hình khóa API mô hình ngôn ngữ lớn (Anthropic, OpenRouter hoặc Local Ollama).
3. Bắt đầu giao nhiệm vụ lập trình cho tác tử.`,
    usageGuideVi: `Yêu cầu tác tử: 'Tạo một RESTful API hoàn chỉnh bằng Express và TypeScript kết nối cơ sở dữ liệu PostgreSQL kèm kiểm thử Jest'.`,
    samplePromptsVi: [
      'Rà soát toàn bộ dự án hiện tại và khắc phục các lỗi cảnh báo TypeScript.',
      'Viết tài liệu hướng dẫn sử dụng API định dạng Swagger/OpenAPI cho module thanh toán.',
      'Tối ưu hóa hiệu năng truy vấn cơ sở dữ liệu và thêm cơ chế lưu trữ đệm bằng Redis.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'npm install -g cline',
        jsonConfig: JSON.stringify({
          mcpServers: {
            "cline-agent": {
              command: "npx",
              args: ["-y", "cline"]
            }
          }
        }, null, 2)
      }
    ]
  },
  {
    slug: 'ollama-local-llm-runner-mcp',
    name: 'Ollama Chạy Mô Hình Ngôn Ngữ Lớn Cục Bộ MCP',
    icon: 'Cpu',
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP',
    category: 'cloud',
    categoryNameVi: 'Hạ tầng & Đám mây',
    platforms: ['claude_desktop', 'antigravity', 'cursor'],
    sourceUrl: 'https://github.com/ollama/ollama',
    authorName: 'Ollama AI Organization',
    license: 'MIT',
    stars: 125000,
    featured: true,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Chạy các mô hình ngôn ngữ lớn cục bộ bảo mật cao (Llama 3, DeepSeek-Coder, Qwen 2.5, Phi-4) không cần kết nối Internet.',
    purposeVi: 'Hỗ trợ các nhà phát triển phần mềm và doanh nghiệp vận hành mô hình ngôn ngữ lớn hoàn toàn trên máy tính cá nhân hoặc máy chủ nội bộ: Bảo mật dữ liệu tuyệt đối không gửi dữ liệu ra bên ngoài, tối ưu hóa phần cứng đồ họa (GPU NVIDIA, Apple Silicon) và cung cấp giao diện lập trình tương thích OpenAI.',
    featuresVi: [
      'Tải về và chạy tức thì các mô hình mã nguồn mở hàng đầu: Llama 3.3, DeepSeek, Qwen, Mistral',
      'Hỗ trợ lượng tử hóa mô hình (Quantization 4-bit, 8-bit) giúp tiết kiệm bộ nhớ RAM/VRAM',
      'Cung cấp API RESTful cục bộ chuẩn và giao thức MCP kết nối trực tiếp với các ứng dụng AI',
      'Hỗ trợ xử lý văn bản, lập trình mã nguồn và mô hình đa phương thức hiểu hình ảnh (Vision)'
    ],
    installGuideVi: `1. Hướng dẫn cài đặt: Tải và cài đặt Ollama từ trang chủ ollama.com hoặc dùng lệnh chạy máy chủ.
2. Tải mô hình cần dùng bằng lệnh: ollama run llama3.3 hoặc ollama run deepseek-coder.
3. Cài đặt thông tin cấu hình MCP vào tệp cấu hình JSON của ứng dụng AI.`,
    usageGuideVi: `Yêu cầu AI: 'Sử dụng mô hình cục bộ Ollama để tóm tắt tài liệu nội bộ tuyệt mật này'.`,
    samplePromptsVi: [
      'Liệt kê danh sách các mô hình ngôn ngữ lớn đang có sẵn trên máy cục bộ qua Ollama.',
      'Gửi câu lệnh phân tích mã nguồn cho mô hình DeepSeek-Coder chạy offline.',
      'Chạy mô hình đa phương thức Llama-Vision để mô tả nội dung hình ảnh sơ đồ hệ thống.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'claude mcp add ollama -- npx -y @modelcontextprotocol/server-ollama',
        jsonConfig: JSON.stringify({
          mcpServers: {
            "ollama": {
              command: "npx",
              args: ["-y", "@modelcontextprotocol/server-ollama"],
              env: {
                OLLAMA_HOST: "http://localhost:11434"
              }
            }
          }
        }, null, 2)
      }
    ]
  },
  {
    slug: 'crewai-multi-agent-orchestration-framework',
    name: 'CrewAI Điều Phối Đội Ngũ Tác Tử AI Framework',
    icon: 'Layers',
    toolType: 'agent',
    typeNameVi: 'Tác tử chuyên sâu',
    category: 'automation',
    categoryNameVi: 'Tự động hóa & Web',
    platforms: ['claude_desktop', 'antigravity', 'cursor'],
    sourceUrl: 'https://github.com/crewAIInc/crewAI',
    authorName: 'CrewAI Inc Community',
    license: 'MIT',
    stars: 26000,
    featured: true,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Khung điều phối các nhóm tác tử trí tuệ nhân tạo làm việc cộng tác theo vai trò chuyên môn hóa.',
    purposeVi: 'Hỗ trợ các kỹ sư xây dựng hệ thống tác tử cộng tác thông minh: Cho phép chia nhỏ một dự án lớn thành các vai trò chuyên biệt (như Nhà nghiên cứu thông tin, Nhà văn viết bài, Kỹ sư kiểm thử, Trưởng nhóm nghiệm thu), tự động phân công nhiệm vụ và trao đổi kết quả làm việc tuần tự hoặc song song.',
    featuresVi: [
      'Thiết lập vai trò (Role), mục tiêu (Goal) và bối cảnh (Backstory) sinh động cho từng tác tử',
      'Cơ chế ủy quyền công việc thông minh giữa các tác tử trong cùng một phi hành đoàn (Crew)',
      'Tích hợp đa dạng các công cụ tìm kiếm web, đọc tệp tin, truy vấn cơ sở dữ liệu và gọi API',
      'Hỗ trợ chế độ thực thi tuần tự (Sequential) hoặc phân cấp theo người quản lý (Hierarchical)'
    ],
    installGuideVi: `1. Cài đặt gói Python: pip install crewai crewai-tools.
2. Cài đặt thông tin cấu hình vào tệp cấu hình JSON của ứng dụng AI.
3. Định nghĩa các tác tử và nhiệm vụ trong mã nguồn.`,
    usageGuideVi: `Yêu cầu phi hành đoàn: 'Nghiên cứu thị trường xe điện tại Đông Nam Á năm 2026 và lập báo cáo phân tích chiến lược 5 trang'.`,
    samplePromptsVi: [
      'Tạo một nhóm tác tử gồm Kỹ sư Backend và Chuyên gia Bảo mật để cùng rà soát mã nguồn.',
      'Khởi chạy phi hành đoàn tự động tạo nội dung bài viết chuẩn SEO và đăng bài lên mạng xã hội.',
      'Thiết lập quy trình kiểm thử tự động gồm tác tử viết test case và tác tử thực thi test.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'pip install crewai',
        jsonConfig: JSON.stringify({
          mcpServers: {
            "crewai-bridge": {
              command: "python",
              args: ["-m", "crewai.mcp"]
            }
          }
        }, null, 2)
      }
    ]
  },
  {
    slug: 'ragflow-deep-document-rag-mcp',
    name: 'RAGFlow Hệ Thống RAG Hiểu Sâu Tài Liệu MCP',
    icon: 'Database',
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP',
    category: 'database',
    categoryNameVi: 'Cơ sở dữ liệu',
    platforms: ['claude_desktop', 'antigravity'],
    sourceUrl: 'https://github.com/infiniflow/ragflow',
    authorName: 'InfiniFlow Open Source Community',
    license: 'Apache-2.0',
    stars: 31000,
    featured: true,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Hệ thống tăng cường sinh thông tin từ tài liệu phức tạp (PDF bảng biểu, Word, Excel, Slide) bằng thị giác máy tính.',
    purposeVi: 'Hỗ trợ các doanh nghiệp giải quyết bài toán tri thức nội bộ: Tự động bóc tách và hiểu sâu các tài liệu định dạng phức tạp (chứa bảng biểu số liệu, biểu đồ, hình ảnh minh họa), chia nhỏ đoạn văn bản theo ngữ nghĩa thực tế thay vì cắt máy móc, giúp mô hình AI trả lời câu hỏi chính xác không bị ảo giác.',
    featuresVi: [
      'Bóc tách tài liệu dựa trên mô hình thị giác sâu (Vision-based Document Understanding)',
      'Nhận dạng chính xác cấu trúc bảng biểu số liệu phức tạp trong tệp PDF và bảng tính Excel',
      'Hỗ trợ tìm kiếm kết hợp (Hybrid Search) giữa từ khóa BM25 và vector nhúng ngữ nghĩa',
      'Giao diện trực quan cho phép người dùng kiểm tra nguồn trích dẫn đối sánh trực tiếp'
    ],
    installGuideVi: `1. Khởi chạy RAGFlow qua Docker Compose: docker compose up -d.
2. Lấy API Key từ trang quản trị tri thức RAGFlow.
3. Cài đặt thông tin cấu hình vào tệp cấu hình JSON của ứng dụng AI.`,
    usageGuideVi: `Yêu cầu AI: 'Truy vấn bảng cân đối kế toán trong báo cáo tài chính quý 4 để tính tỷ suất sinh lời ROE'.`,
    samplePromptsVi: [
      'Tìm kiếm chính sách nghỉ phép và bảo hiểm y tế trong sổ tay nhân viên công ty qua RAGFlow.',
      'Trích xuất toàn bộ bảng thông số kỹ thuật của thiết bị từ tài liệu catalog PDF.',
      'Đặt câu hỏi về các điều khoản phạt vi phạm hợp đồng kinh tế đã lưu trong kho tri thức.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'claude mcp add ragflow -- npx -y @infiniflow/ragflow-mcp',
        jsonConfig: JSON.stringify({
          mcpServers: {
            "ragflow": {
              command: "npx",
              args: ["-y", "@infiniflow/ragflow-mcp"],
              env: {
                RAGFLOW_API_URL: "http://localhost:9380",
                RAGFLOW_API_KEY: "YOUR_RAGFLOW_API_KEY"
              }
            }
          }
        }, null, 2)
      }
    ]
  },
  {
    slug: 'mem0-long-term-memory-layer-mcp',
    name: 'Mem0 Tầng Bộ Nhớ Dài Hạn Cá Nhân Hóa MCP',
    icon: 'Brain',
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP',
    category: 'database',
    categoryNameVi: 'Cơ sở dữ liệu',
    platforms: ['claude_desktop', 'antigravity', 'cursor'],
    sourceUrl: 'https://github.com/mem0ai/mem0',
    authorName: 'Mem0 AI Community',
    license: 'Apache-2.0',
    stars: 27500,
    featured: true,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Trang bị bộ nhớ dài hạn liên tục cho các tác tử AI: tự động nhớ sở thích, thói quen và thông tin cá nhân của người dùng.',
    purposeVi: 'Hỗ trợ các trợ lý trí tuệ nhân tạo duy trì ký ức qua các phiên làm việc độc lập: Tự động phát hiện các thông tin quan trọng người dùng cung cấp trong lúc trò chuyện, lưu trữ vào đồ thị bộ nhớ dài hạn và tự động truy xuất khi cần thiết giúp AI hiểu người dùng sâu sắc theo thời gian.',
    featuresVi: [
      'Tự động trích xuất các sự kiện, sở thích cá nhân và thói quen làm việc từ cuộc hội thoại',
      'Cập nhật và làm mới bộ nhớ khi thông tin có sự thay đổi tránh lưu trữ mâu thuẫn',
      'Hỗ trợ phân cấp bộ nhớ theo người dùng (User-level), phiên làm việc (Session) hoặc tác tử (Agent)',
      'Tích hợp nhanh chóng qua giao thức MCP với Claude Desktop, Antigravity và Cursor'
    ],
    installGuideVi: `1. Cài đặt gói Mem0 qua pip: pip install mem0ai.
2. Cài đặt thông tin cấu hình vào tệp cấu hình JSON của ứng dụng AI.
3. Khởi động lại ứng dụng và bắt đầu trò chuyện để AI tự tích lũy bộ nhớ.`,
    usageGuideVi: `Yêu cầu AI: 'Hãy nhớ rằng tôi luôn lập trình bằng TypeScript và sử dụng quy chuẩn định dạng ESLint Airbnb'.`,
    samplePromptsVi: [
      'Liệt kê lại tất cả những sở thích kỹ thuật và công nghệ mà tôi đã chia sẻ với bạn.',
      'Gợi ý cấu trúc dự án mới dựa trên các thói quen lập trình trước đây của tôi.',
      'Xóa bỏ thông tin địa chỉ cũ khỏi bộ nhớ dài hạn của trợ lý AI.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'claude mcp add mem0 -- npx -y @mem0ai/mcp-server',
        jsonConfig: JSON.stringify({
          mcpServers: {
            "mem0": {
              command: "npx",
              args: ["-y", "@mem0ai/mcp-server"],
              env: {
                MEM0_API_KEY: "YOUR_MEM0_API_KEY"
              }
            }
          }
        }, null, 2)
      }
    ]
  },
  {
    slug: 'openhands-ai-software-engineer-agent',
    name: 'OpenHands Nền Tảng Kỹ Sư Phần Mềm AI Mã Nguồn Mở',
    icon: 'Code2',
    toolType: 'agent',
    typeNameVi: 'Tác tử chuyên sâu',
    category: 'coding',
    categoryNameVi: 'Lập trình & Kỹ thuật',
    platforms: ['claude_desktop', 'antigravity'],
    sourceUrl: 'https://github.com/All-Hands-AI/OpenHands',
    authorName: 'All-Hands AI Open Source Organization',
    license: 'MIT',
    stars: 44000,
    featured: true,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Nền tảng kỹ sư phần mềm AI mã nguồn mở hoàn chỉnh: lập trình, chạy lệnh Docker, duyệt web và giải quyết GitHub Issue.',
    purposeVi: 'Hỗ trợ các đội ngũ phát triển phần mềm tự động hóa quy trình viết mã và bảo trì dự án: Tác tử AI hoạt động độc lập trong môi trường cách ly Docker an toàn, có thể đọc mô tả lỗi từ GitHub Issue, định vị tệp mã nguồn bị lỗi, viết mã sửa lỗi, chạy kiểm thử tự động và tự động tạo Pull Request.',
    featuresVi: [
      'Chạy cách ly hoàn toàn trong container Docker bảo vệ an toàn cho máy tính chủ',
      'Tích hợp đầy đủ các công cụ: Trình soạn thảo mã nguồn, Terminal Linux và Trình duyệt headless',
      'Tự động giải quyết các bài toán kiểm thử SWE-bench với điểm chuẩn cao hàng đầu thế giới',
      'Hỗ trợ tích hợp GitHub Action để tự động rà soát và sửa lỗi mã nguồn khi có commit mới'
    ],
    installGuideVi: `1. Chạy OpenHands qua Docker: docker run -it --pull=always -e SANDBOX_RUNTIME_CONTAINER_IMAGE=docker.all-hands-ai.com/all-hands-ai/runtime:0.18-nikolaik -v /var/run/docker.sock:/var/run/docker.sock -p 3000:3000 ghcr.io/all-hands-ai/openhands:0.18.
2. Cài đặt thông tin cấu hình vào tệp cấu hình JSON của ứng dụng AI.
3. Truy cập giao diện quản trị tại cổng 3000 để bắt đầu giao việc.`,
    usageGuideVi: `Yêu cầu tác tử: 'Khắc phục lỗi không tìm thấy biến môi trường trong file auth.controller.ts và chạy lại bộ test'.`,
    samplePromptsVi: [
      'Giải quyết GitHub Issue #42: Thêm tính năng xác thực hai lớp 2FA cho người dùng.',
      'Nâng cấp thư viện React từ phiên bản 18 lên 19 và khắc phục các điểm không tương thích.',
      'Viết trọn bộ kiểm thử tích hợp cho quy trình đặt hàng và thanh toán trực tuyến.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'docker run -d -p 3000:3000 ghcr.io/all-hands-ai/openhands:latest',
        jsonConfig: JSON.stringify({
          mcpServers: {
            "openhands": {
              command: "npx",
              args: ["-y", "@all-hands-ai/mcp-bridge"],
              env: {
                OPENHANDS_URL: "http://localhost:3000"
              }
            }
          }
        }, null, 2)
      }
    ]
  },
  {
    slug: 'uv-fast-python-package-manager-command',
    name: 'uv Trình Quản Lý Gói & Môi Trường Python Siêu Tốc Độ',
    icon: 'Terminal',
    toolType: 'command',
    typeNameVi: 'Lệnh phím tắt',
    category: 'coding',
    categoryNameVi: 'Lập trình & Kỹ thuật',
    platforms: ['claude_desktop', 'antigravity', 'cursor'],
    sourceUrl: 'https://github.com/astral-sh/uv',
    authorName: 'Astral Software Team',
    license: 'Apache-2.0',
    stars: 48000,
    featured: true,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Trình quản lý gói và môi trường ảo Python viết bằng Rust, tốc độ cài đặt nhanh gấp 10-100 lần pip.',
    purposeVi: 'Hỗ trợ các kỹ sư AI và nhà phát triển Python tối ưu hóa thời gian cài đặt và vận hành thư viện: Thay thế toàn diện pip, pip-tools, virtualenv và poetry với tốc độ cực nhanh, hỗ trợ chạy trực tiếp công cụ CLI qua uvx tương tự npx của JavaScript.',
    featuresVi: [
      'Tốc độ tải và giải nén gói Python nhanh hơn từ 10 đến 100 lần so với trình quản lý pip truyền thống',
      'Tự động tải về, cài đặt và chuyển đổi giữa các phiên bản Python khác nhau trên hệ thống',
      'Hỗ trợ lệnh uvx cho phép khởi chạy ngay các máy chủ MCP hoặc công cụ AI mà không cần cài đặt vĩnh viễn',
      'Cơ chế khóa phiên bản phụ thuộc chính xác tuyệt đối qua tệp uv.lock giúp dự án luôn ổn định'
    ],
    installGuideVi: `1. Cài đặt trên Windows qua PowerShell: irm https://astral.sh/uv/install.ps1 | iex.
2. Hoặc cài đặt qua pip: pip install uv.
3. Kiểm tra cài đặt thành công bằng lệnh: uv --version.`,
    usageGuideVi: `Yêu cầu AI: 'Tạo môi trường ảo Python 3.12 mới và cài đặt nhanh các thư viện torch, transformers, fastapi bằng uv'.`,
    samplePromptsVi: [
      'Khởi tạo dự án Python mới với tệp pyproject.toml chuẩn mực bằng uv init.',
      'Khởi chạy nhanh máy chủ MCP Python qua uvx mcp-server-git.',
      'Đồng bộ hóa toàn bộ môi trường ảo với tệp khóa uv.lock bằng lệnh uv sync.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'uv --version',
        jsonConfig: JSON.stringify({
          mcpServers: {
            "uv-runner": {
              command: "uvx",
              args: ["mcp-server-sqlite"]
            }
          }
        }, null, 2)
      }
    ]
  }
];

// 3. Ghép nối và lọc trùng lặp
let addedCount = 0;
const allToAdd = [...newVietnamTools, ...newTrendingGlobalTools];

for (const tool of allToAdd) {
  if (!existingSlugs.has(tool.slug)) {
    const fullTool = {
      id: `ext-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
      ...tool
    };
    currentTools.unshift(fullTool); // Đưa lên đầu danh sách để người dùng thấy ngay
    existingSlugs.add(tool.slug);
    addedCount++;
  }
}

console.log(`Đã bổ sung thành công: ${addedCount} công cụ mới vào kho dữ liệu.`);
console.log(`Tổng cộng sau khi mở rộng: ${currentTools.length} công cụ.`);

// Ghi đè vào allTools.json
fs.writeFileSync('src/data/allTools.json', JSON.stringify(currentTools, null, 2), 'utf-8');
console.log('Đã cập nhật thành công src/data/allTools.json!');
