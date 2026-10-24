const fs = require('fs');
const path = require('path');

const allToolsPath = path.join(__dirname, '../src/data/allTools.json');
const currentTools = JSON.parse(fs.readFileSync(allToolsPath, 'utf8'));

console.log(`Số lượng công cụ hiện tại trước khi thêm: ${currentTools.length}`);

// 50 công cụ & dịch vụ số thương hiệu lớn Việt Nam Đợt 9
const batch9Tools = [
  // 1-8: Chuỗi bán lẻ công nghệ, điện máy, thời trang
  {
    id: "the-gioi-di-dong-retail-api",
    name: "Thế Giới Di Động Omnichannel Retail Connector",
    sourceUrl: "https://www.thegioididong.com",
    category: "MCP Server",
    domain: "ecommerce_retail",
    toolType: "MCP Server",
    typeNameVi: "MCP Server",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Thế Giới Di Động (MWG)",
    stars: 235,
    forks: 48,
    license: "Proprietary",
    summaryVi: "Máy chủ MCP kết nối cổng phân phối bán lẻ đa kênh, tra cứu tồn kho, bảo hành và giá bán sản phẩm chuỗi Thế Giới Di Động toàn quốc.",
    purposeVi: "Giúp các trợ lý trí tuệ nhân tạo và hệ thống doanh nghiệp tự động tra cứu danh mục điện thoại, máy tính bảng, phụ kiện, kiểm tra số lượng tồn kho theo từng siêu thị trong 34 tỉnh thành và kích hoạt bảo hành điện tử chính hãng.",
    installGuideVi: "Bước 1: Đăng ký tài khoản đối tác doanh nghiệp tại cổng kết nối Thế Giới Di Động.\nBước 2: Lấy khóa truy cập API và mã định danh cửa hàng phân phối.\nBước 3: Cấu hình cổng kết nối MCP Server trong tệp cấu hình của Claude Desktop hoặc Antigravity.\nBước 4: Khởi động lại ứng dụng và kiểm tra kết nối với cụm máy chủ bán lẻ.",
    usageGuideVi: "Bước 1: Gọi công cụ `tgdd_check_inventory` kèm mã sản phẩm và mã tỉnh thành để kiểm tra tình trạng còn hàng.\nBước 2: Sử dụng lệnh `tgdd_lookup_warranty` với chuỗi số IMEI để tra cứu thời hạn bảo hành thiết bị.\nBước 3: Đồng bộ trạng thái đơn hàng trực tuyến về hệ thống quản lý bán lẻ nội bộ.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        label: "Claude Desktop MCP",
        config: JSON.stringify({
          mcpServers: {
            "tgdd-retail-connector": {
              command: "npx",
              args: ["-y", "@mwg/retail-mcp-connector@latest"],
              env: {
                TGDD_API_KEY: "YOUR_TGDD_API_KEY",
                STORE_ID: "VN_STORE_001"
              }
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        label: "Antigravity Workspace",
        config: JSON.stringify({
          name: "tgdd-retail-connector",
          command: "npx",
          args: ["-y", "@mwg/retail-mcp-connector@latest"],
          env: {
            TGDD_API_KEY: "YOUR_TGDD_API_KEY"
          }
        }, null, 2)
      },
      {
        platform: "cursor",
        label: "Cursor MCP",
        config: JSON.stringify({
          name: "tgdd-retail-connector",
          command: "npx @mwg/retail-mcp-connector@latest"
        }, null, 2)
      }
    ]
  },
  {
    id: "fpt-shop-omnichannel-sdk",
    name: "FPT Shop Omnichannel Partner SDK",
    sourceUrl: "https://fptshop.com.vn",
    category: "Skill",
    domain: "ecommerce_retail",
    toolType: "Skill",
    typeNameVi: "Skill",
    platforms: ["claude", "antigravity", "cursor"],
    author: "FPT Retail",
    stars: 198,
    forks: 39,
    license: "Commercial",
    summaryVi: "Bộ kỹ năng tích hợp đơn hàng, quản lý danh mục sản phẩm công nghệ và định tuyến giao nhận chuỗi FPT Shop.",
    purposeVi: "Tự động hóa tiếp nhận đơn hàng máy tính xách tay, điện thoại, thiết bị số gia dụng; đồng bộ đơn hàng với trung tâm phân phối và kho hàng FPT Retail gần nhất.",
    installGuideVi: "Bước 1: Cài đặt gói thư viện `@fptretail/shop-sdk` qua trình quản lý gói npm.\nBước 2: Cấp quyền kết nối với khóa ứng dụng FPT Shop Partner.\nBước 3: Khai báo cấu hình Skill trong môi trường làm việc của trí tuệ nhân tạo.\nBước 4: Xác thực kết nối kiểm thử qua môi trường chạy thử nghiệm.",
    usageGuideVi: "Bước 1: Thực thi kỹ năng `fpt_shop_create_order` để lập đơn hàng mới với thông tin khách hàng và danh sách mã hàng.\nBước 2: Theo dõi hành trình giao nhận hàng từ cửa hàng đến tay người tiêu dùng.\nBước 3: Xử lý quy trình đổi trả hàng và bảo hành tự động.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        label: "Claude Desktop",
        config: JSON.stringify({
          skills: {
            "fpt-shop-sdk": {
              package: "@fptretail/shop-sdk",
              apiKey: "YOUR_FPT_SHOP_PARTNER_KEY"
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        label: "Antigravity Skill",
        config: JSON.stringify({
          skills: ["@fptretail/shop-sdk"],
          env: {
            FPT_SHOP_PARTNER_KEY: "YOUR_FPT_SHOP_PARTNER_KEY"
          }
        }, null, 2)
      },
      {
        platform: "cursor",
        label: "Cursor Rules",
        config: JSON.stringify({
          integration: "fpt-shop-sdk",
          rules: ["Check product stock before dispatching orders", "Sync invoice data with FPT.eInvoice"]
        }, null, 2)
      }
    ]
  },
  {
    id: "dien-may-xanh-catalog-sync",
    name: "Điện Máy Xanh Catalog & Pricing Sync",
    sourceUrl: "https://www.dienmayxanh.com",
    category: "Skill",
    domain: "ecommerce_retail",
    toolType: "Skill",
    typeNameVi: "Skill",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Thế Giới Di Động (MWG)",
    stars: 176,
    forks: 34,
    license: "Proprietary",
    summaryVi: "Kỹ năng đồng bộ giá cả theo giờ, thông số kỹ thuật và tình trạng khuyến mãi lắp đặt điện máy của chuỗi Điện Máy Xanh.",
    purposeVi: "Cho phép các đại lý và cổng thương mại điện tử cập nhật giá bán tủ lạnh, máy giặt, máy lạnh, tivi kèm chính sách giao hàng miễn phí và công lắp đặt trên toàn quốc.",
    installGuideVi: "Bước 1: Đăng ký dịch vụ cấp phát nguồn dữ liệu trực tiếp Điện Máy Xanh B2B.\nBước 2: Thiết lập kết nối nguồn dữ liệu định kỳ mỗi 15 phút.\nBước 3: Đưa kỹ năng vào danh mục kỹ năng của trợ lý ảo.\nBước 4: Kiểm tra tính chuẩn xác của các mức giá chiết khấu tại khu vực địa lý tương ứng.",
    usageGuideVi: "Bước 1: Gọi lệnh `dmx_get_promotions` để lấy danh sách ưu đãi theo thương hiệu điện máy.\nBước 2: Cập nhật giá bán cạnh tranh và hiển thị cam kết dịch vụ lắp đặt tận nhà.\nBước 3: Lập kế hoạch vận chuyển vật tư đi kèm cho đội ngũ kỹ thuật viên.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        label: "Claude Desktop",
        config: JSON.stringify({
          skills: {
            "dmx-catalog-sync": {
              source: "https://api.dienmayxanh.com/v1/sync",
              token: "YOUR_DMX_BEARER_TOKEN"
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        label: "Antigravity",
        config: JSON.stringify({
          skill: "dmx-catalog-sync",
          auth: {
            token: "YOUR_DMX_BEARER_TOKEN"
          }
        }, null, 2)
      },
      {
        platform: "cursor",
        label: "Cursor",
        config: JSON.stringify({
          tool: "dmx-catalog-sync",
          endpoint: "https://api.dienmayxanh.com/v1/sync"
        }, null, 2)
      }
    ]
  },
  {
    id: "cellphones-inventory-api",
    name: "CellphoneS Tech Inventory & Warranty API",
    sourceUrl: "https://cellphones.com.vn",
    category: "MCP Server",
    domain: "ecommerce_retail",
    toolType: "MCP Server",
    typeNameVi: "MCP Server",
    platforms: ["claude", "antigravity", "cursor"],
    author: "CellphoneS Việt Nam",
    stars: 182,
    forks: 36,
    license: "Proprietary",
    summaryVi: "Máy chủ MCP kết nối kho hàng công nghệ, tra cứu giá bán Smarthome, thiết bị âm thanh và bảo hành Điện Thoại Vui.",
    purposeVi: "Hỗ trợ khách hàng doanh nghiệp và người dùng tra cứu tồn kho máy mới, phụ kiện âm thanh, đặt lịch sửa chữa tại chuỗi Điện Thoại Vui và kích hoạt gói bảo hành mở rộng.",
    installGuideVi: "Bước 1: Tải về bộ gói dịch vụ `@cellphones/mcp-bridge`.\nBước 2: Cấu hình thông tin xác thực đối tác CellphoneS.\nBước 3: Khai báo cổng kết nối trong tệp thiết lập ứng dụng.\nBước 4: Kích hoạt máy chủ và kiểm tra trạng thái hoạt động.",
    usageGuideVi: "Bước 1: Truy vấn danh mục tai nghe, loa Bluetooth và máy tính bảng qua lệnh `cps_search_products`.\nBước 2: Đặt lịch hẹn sửa chữa thiết bị tại cửa hàng Điện Thoại Vui qua `cps_book_repair`.\nBước 3: Nhận thông báo tự động khi linh kiện thay thế đã sẵn sàng.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        label: "Claude Desktop MCP",
        config: JSON.stringify({
          mcpServers: {
            "cellphones-bridge": {
              command: "npx",
              args: ["-y", "@cellphones/mcp-bridge"],
              env: {
                CPS_CLIENT_ID: "YOUR_CLIENT_ID",
                CPS_CLIENT_SECRET: "YOUR_CLIENT_SECRET"
              }
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        label: "Antigravity Workspace",
        config: JSON.stringify({
          name: "cellphones-bridge",
          command: "npx",
          args: ["-y", "@cellphones/mcp-bridge"],
          env: {
            CPS_CLIENT_ID: "YOUR_CLIENT_ID"
          }
        }, null, 2)
      },
      {
        platform: "cursor",
        label: "Cursor MCP",
        config: JSON.stringify({
          name: "cellphones-bridge",
          command: "npx @cellphones/mcp-bridge"
        }, null, 2)
      }
    ]
  },
  {
    id: "hoangha-mobile-price-tracker",
    name: "Hoàng Hà Mobile Price & Stock Tracker",
    sourceUrl: "https://hoanghamobile.com",
    category: "Skill",
    domain: "ecommerce_retail",
    toolType: "Skill",
    typeNameVi: "Skill",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Hoàng Hà Mobile",
    stars: 145,
    forks: 27,
    license: "MIT",
    summaryVi: "Kỹ năng theo dõi biến động giá thiết bị công nghệ chính hãng và kiểm tra kho tại các chi nhánh Hoàng Hà Mobile.",
    purposeVi: "Cung cấp biểu đồ biến động giá điện thoại thông minh, thiết bị đeo tay theo thời gian thực và tự động đề xuất thời điểm đặt hàng tối ưu chi phí.",
    installGuideVi: "Bước 1: Tải về mã nguồn kỹ năng hoặc cài đặt qua npm: `npm i hoangha-tracker`.\nBước 2: Khai báo danh sách sản phẩm cần theo dõi giá vào tệp tham số cấu hình.\nBước 3: Đăng ký kỹ năng vào hệ sinh thái của trợ lý AI.\nBước 4: Khởi động trình thu thập dữ liệu giá theo chu kỳ mong muốn.",
    usageGuideVi: "Bước 1: Sử dụng kỹ năng `hoangha_track_sku` với mã định danh sản phẩm để nhận giá cập nhật.\nBước 2: Thiết lập ngưỡng giá cảnh báo khi có đợt giảm giá hoặc tặng kèm quà tặng.\nBước 3: Nhận thông báo tức thì qua Telegram hoặc hệ thống CRM nội bộ.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        label: "Claude Desktop",
        config: JSON.stringify({
          skills: {
            "hoangha-price-tracker": {
              module: "hoangha-tracker",
              intervalMinutes: 30
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        label: "Antigravity",
        config: JSON.stringify({
          skill: "hoangha-price-tracker",
          options: {
            currency: "VND",
            notifyOnDiscount: true
          }
        }, null, 2)
      },
      {
        platform: "cursor",
        label: "Cursor",
        config: JSON.stringify({
          tool: "hoangha-price-tracker"
        }, null, 2)
      }
    ]
  },
  {
    id: "yody-fashion-omnichannel-api",
    name: "Yody Fashion Omnichannel Retail Connector",
    sourceUrl: "https://yody.vn",
    category: "MCP Server",
    domain: "ecommerce_retail",
    toolType: "MCP Server",
    typeNameVi: "MCP Server",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Yody Việt Nam",
    stars: 164,
    forks: 31,
    license: "Proprietary",
    summaryVi: "Máy chủ MCP kết nối chuỗi bán lẻ thời trang Yody, quản lý kích cỡ (size chart), kho hàng vải sợi và tích điểm thành viên.",
    purposeVi: "Giúp tự động hóa đề xuất kích cỡ trang phục chuẩn người Việt Nam, kiểm tra tình trạng số lượng tại hơn 200 cửa hàng Yody và áp dụng mã voucher cho khách hàng thân thiết.",
    installGuideVi: "Bước 1: Khai báo tài khoản phát triển của đối tác bán lẻ Yody.\nBước 2: Cài đặt gói kết nối `@yody/retail-mcp`.\nBước 3: Nhập thông tin mã chi nhánh và khóa bảo mật trong tệp cấu hình.\nBước 4: Kiểm tra tương tác với máy chủ thành công.",
    usageGuideVi: "Bước 1: Gọi lệnh `yody_recommend_size` với chiều cao và cân nặng để tư vấn kích cỡ trang phục chính xác.\nBước 2: Kiểm tra tồn kho áo polo, quần jeans tại cửa hàng gần nhất theo vị trí người dùng.\nBước 3: Tạo hóa đơn thanh toán kèm tích điểm thành viên Yody Love.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        label: "Claude Desktop MCP",
        config: JSON.stringify({
          mcpServers: {
            "yody-fashion-mcp": {
              command: "npx",
              args: ["-y", "@yody/retail-mcp@latest"],
              env: {
                YODY_API_TOKEN: "YOUR_YODY_TOKEN"
              }
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        label: "Antigravity Workspace",
        config: JSON.stringify({
          name: "yody-fashion-mcp",
          command: "npx",
          args: ["-y", "@yody/retail-mcp@latest"],
          env: {
            YODY_API_TOKEN: "YOUR_YODY_TOKEN"
          }
        }, null, 2)
      },
      {
        platform: "cursor",
        label: "Cursor MCP",
        config: JSON.stringify({
          name: "yody-fashion-mcp",
          command: "npx @yody/retail-mcp@latest"
        }, null, 2)
      }
    ]
  },
  {
    id: "canifa-fashion-pos-connector",
    name: "Canifa Fashion POS & Inventory Bridge",
    sourceUrl: "https://canifa.com",
    category: "Skill",
    domain: "ecommerce_retail",
    toolType: "Skill",
    typeNameVi: "Skill",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Canifa Official",
    stars: 153,
    forks: 29,
    license: "Proprietary",
    summaryVi: "Kỹ năng kết nối hệ thống điểm bán hàng (POS), quản lý danh mục len sợi mùa đông và thời trang thường ngày Canifa.",
    purposeVi: "Đồng bộ hóa tồn kho theo màu sắc và kích cỡ giữa kho hàng trung tâm Canifa với các gian hàng trên sàn thương mại điện tử và cửa hàng bán lẻ trực tiếp.",
    installGuideVi: "Bước 1: Tải bộ công cụ `canifa-pos-bridge` từ kho phân phối.\nBước 2: Cài đặt các thư viện phụ thuộc bằng lệnh `npm install`.\nBước 3: Thiết lập khóa truy cập hệ thống điểm bán trong tệp cấu hình.\nBước 4: Kiểm thử đồng bộ hóa dữ liệu với môi trường giả lập.",
    usageGuideVi: "Bước 1: Sử dụng kỹ năng `canifa_sync_stock` để cập nhật dữ liệu tồn kho hàng loạt.\nBước 2: Tra cứu thông tin chất liệu len sợi, hướng dẫn giặt ủi bằng lệnh `canifa_get_fabric_care`.\nBước 3: Xuất báo cáo doanh thu bán hàng theo ca của từng cửa hàng.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        label: "Claude Desktop",
        config: JSON.stringify({
          skills: {
            "canifa-pos-bridge": {
              endpoint: "https://pos-api.canifa.com/v2",
              apiKey: "YOUR_CANIFA_POS_KEY"
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        label: "Antigravity",
        config: JSON.stringify({
          skill: "canifa-pos-bridge",
          apiKey: "YOUR_CANIFA_POS_KEY"
        }, null, 2)
      },
      {
        platform: "cursor",
        label: "Cursor",
        config: JSON.stringify({
          tool: "canifa-pos-bridge"
        }, null, 2)
      }
    ]
  },
  {
    id: "ivy-moda-loyalty-integration",
    name: "IVY moda Loyalty & Order Integration",
    sourceUrl: "https://ivymoda.com",
    category: "Skill",
    domain: "ecommerce_retail",
    toolType: "Skill",
    typeNameVi: "Skill",
    platforms: ["claude", "antigravity", "cursor"],
    author: "IVY moda",
    stars: 138,
    forks: 24,
    license: "Proprietary",
    summaryVi: "Kỹ năng quản lý đơn hàng cao cấp, chăm sóc khách hàng VIP và đồng bộ bộ sưu tập thời trang công sở IVY moda.",
    purposeVi: "Tự động hóa gửi thông báo bộ sưu tập mới tới hội viên thân thiết, cấp mã giảm giá cá nhân hóa theo cấp bậc thẻ (Gold, Diamond) và xử lý lịch thử đồ tại showroom.",
    installGuideVi: "Bước 1: Nhận mã đối tác tích hợp từ phòng công nghệ IVY moda.\nBước 2: Tích hợp thư viện `@ivymoda/loyalty-sdk`.\nBước 3: Cấu hình thông số xác thực trong tệp cài đặt trợ lý.\nBước 4: Chạy lệnh kiểm tra tính năng kết nối thông suốt.",
    usageGuideVi: "Bước 1: Kiểm tra hạng thẻ hội viên qua lệnh `ivy_check_vip_tier` với số điện thoại khách hàng.\nBước 2: Áp dụng mức chiết khấu thành viên trực tiếp vào đơn hàng thời trang.\nBước 3: Đặt lịch hẹn thử đồ cá nhân hóa tại showroom mong muốn.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        label: "Claude Desktop",
        config: JSON.stringify({
          skills: {
            "ivy-moda-loyalty": {
              appId: "IVY_APP_VIP",
              appSecret: "YOUR_IVY_SECRET"
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        label: "Antigravity",
        config: JSON.stringify({
          skill: "ivy-moda-loyalty",
          appSecret: "YOUR_IVY_SECRET"
        }, null, 2)
      },
      {
        platform: "cursor",
        label: "Cursor",
        config: JSON.stringify({
          tool: "ivy-moda-loyalty"
        }, null, 2)
      }
    ]
  },

  // 9-13: Chuỗi dược phẩm & Nhà thuốc lớn tại Việt Nam
  {
    id: "fpt-long-chau-pharmacy-api",
    name: "FPT Long Châu Medicine Lookup & Prescription API",
    sourceUrl: "https://nhathuoclongchau.com.vn",
    category: "MCP Server",
    domain: "legal_public_service",
    toolType: "MCP Server",
    typeNameVi: "MCP Server",
    platforms: ["claude", "antigravity", "cursor"],
    author: "FPT Long Châu",
    stars: 289,
    forks: 58,
    license: "Proprietary",
    summaryVi: "Máy chủ MCP kết nối kho dược phẩm, tra cứu đơn thuốc điện tử, giá bán theo niêm yết Cục Quản lý Dược và tìm nhà thuốc Long Châu gần nhất.",
    purposeVi: "Giúp các ứng dụng y tế, bác sĩ và người dùng kiểm tra thông tin thuốc theo toa, hướng dẫn sử dụng, chống chỉ định, tìm kiếm địa chỉ nhà thuốc Long Châu còn hàng tại 34 tỉnh thành.",
    installGuideVi: "Bước 1: Đăng ký dịch vụ tích hợp dữ liệu với ban chuyển đổi số y tế Long Châu.\nBước 2: Cài đặt máy chủ MCP qua gói `@longchau/pharmacy-mcp`.\nBước 3: Nhập mã định danh nhà thuốc và khóa bí mật API.\nBước 4: Khởi động máy chủ và kiểm tra phân quyền truy cập thông tin dược học.",
    usageGuideVi: "Bước 1: Gọi lệnh `longchau_find_medicine` với tên hoạt chất hoặc tên biệt dược để xem quy cách đóng gói và giá niêm yết.\nBước 2: Đọc mã đơn thuốc điện tử quốc gia qua lệnh `longchau_check_prescription`.\nBước 3: Xác định nhà thuốc còn hàng để điều hướng khách hàng thuận tiện nhất.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        label: "Claude Desktop MCP",
        config: JSON.stringify({
          mcpServers: {
            "longchau-pharmacy-mcp": {
              command: "npx",
              args: ["-y", "@longchau/pharmacy-mcp@latest"],
              env: {
                LONGCHAU_API_KEY: "YOUR_LONGCHAU_API_KEY",
                LONGCHAU_PARTNER_CODE: "HEALTH_AI_VN"
              }
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        label: "Antigravity Workspace",
        config: JSON.stringify({
          name: "longchau-pharmacy-mcp",
          command: "npx",
          args: ["-y", "@longchau/pharmacy-mcp@latest"],
          env: {
            LONGCHAU_API_KEY: "YOUR_LONGCHAU_API_KEY"
          }
        }, null, 2)
      },
      {
        platform: "cursor",
        label: "Cursor MCP",
        config: JSON.stringify({
          name: "longchau-pharmacy-mcp",
          command: "npx @longchau/pharmacy-mcp@latest"
        }, null, 2)
      }
    ]
  },
  {
    id: "nhathuoc-an-khang-locator-api",
    name: "Nhà thuốc An Khang Locator & Stock API",
    sourceUrl: "https://www.nhathuocankhang.com",
    category: "Skill",
    domain: "ecommerce_retail",
    toolType: "Skill",
    typeNameVi: "Skill",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Thế Giới Di Động (MWG)",
    stars: 167,
    forks: 32,
    license: "Proprietary",
    summaryVi: "Kỹ năng tra cứu thực phẩm chức năng, thiết bị y tế gia đình và định vị chuỗi nhà thuốc An Khang trên toàn quốc.",
    purposeVi: "Hỗ trợ khách hàng tìm kiếm các sản phẩm chăm sóc sức khỏe, máy đo huyết áp, vitamin tổng hợp, kiểm tra tình trạng tồn kho tại quầy và nhận tư vấn từ dược sĩ.",
    installGuideVi: "Bước 1: Cài đặt gói mở rộng `ankhang-locator-skill` vào dự án.\nBước 2: Thiết lập thông tin kết nối cổng dịch vụ An Khang API.\nBước 3: Đưa kỹ năng vào danh sách kích hoạt của trợ lý AI.\nBước 4: Kiểm tra khả năng định vị theo tọa độ GPS hoặc tên phường xã.",
    usageGuideVi: "Bước 1: Sử dụng kỹ năng `ankhang_search_product` để tìm danh mục thực phẩm bổ sung.\nBước 2: Tìm quầy thuốc gần nhất trong bán kính 3 km qua lệnh `ankhang_nearby_stores`.\nBước 3: Đặt giữ hàng tại quầy thuốc để người mua đến nhận trực tiếp.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        label: "Claude Desktop",
        config: JSON.stringify({
          skills: {
            "ankhang-locator": {
              provider: "nhathuocankhang.com",
              apiKey: "YOUR_ANKHANG_API_KEY"
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        label: "Antigravity",
        config: JSON.stringify({
          skill: "ankhang-locator",
          apiKey: "YOUR_ANKHANG_API_KEY"
        }, null, 2)
      },
      {
        platform: "cursor",
        label: "Cursor",
        config: JSON.stringify({
          tool: "ankhang-locator"
        }, null, 2)
      }
    ]
  },
  {
    id: "pharmacity-loyalty-eprescription-api",
    name: "Pharmacity Loyalty & E-Prescription Connector",
    sourceUrl: "https://www.pharmacity.vn",
    category: "MCP Server",
    domain: "ecommerce_retail",
    toolType: "MCP Server",
    typeNameVi: "MCP Server",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Pharmacity Việt Nam",
    stars: 204,
    forks: 41,
    license: "Proprietary",
    summaryVi: "Máy chủ MCP kết nối chương trình thành viên Extracare, số hóa đơn thuốc và giao hàng dược phẩm nhanh Pharmacity.",
    purposeVi: "Tự động tích điểm Extracare cho khách hàng, kiểm tra tương tác thuốc cơ bản và đặt giao hỏa tốc thuốc không kê đơn cùng các sản phẩm chăm sóc sắc đẹp trong vòng 2 giờ.",
    installGuideVi: "Bước 1: Tải gói dịch vụ `@pharmacity/extracare-mcp` qua npm.\nBước 2: Cung cấp mã định danh tài khoản doanh nghiệp Extracare.\nBước 3: Khai báo cổng kết nối trong tệp cấu hình của Claude Desktop hoặc Antigravity.\nBước 4: Xác thực kết nối an toàn qua mã bảo vệ hai lớp.",
    usageGuideVi: "Bước 1: Truy vấn điểm thưởng Extracare của khách hàng qua số điện thoại bằng lệnh `pharmacity_get_points`.\nBước 2: Tạo đơn đặt hàng giao tận nhà các vật phẩm sơ cứu y tế gia đình.\nBước 3: Theo dõi trạng thái đơn hàng và gửi hóa đơn điện tử VAT cho người mua.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        label: "Claude Desktop MCP",
        config: JSON.stringify({
          mcpServers: {
            "pharmacity-mcp": {
              command: "npx",
              args: ["-y", "@pharmacity/extracare-mcp"],
              env: {
                PHARMACITY_CLIENT_KEY: "YOUR_PHARMACITY_KEY",
                PHARMACITY_SECRET: "YOUR_PHARMACITY_SECRET"
              }
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        label: "Antigravity Workspace",
        config: JSON.stringify({
          name: "pharmacity-mcp",
          command: "npx",
          args: ["-y", "@pharmacity/extracare-mcp"],
          env: {
            PHARMACITY_CLIENT_KEY: "YOUR_PHARMACITY_KEY"
          }
        }, null, 2)
      },
      {
        platform: "cursor",
        label: "Cursor MCP",
        config: JSON.stringify({
          name: "pharmacity-mcp",
          command: "npx @pharmacity/extracare-mcp"
        }, null, 2)
      }
    ]
  },
  {
    id: "dhg-pharma-b2b-portal-api",
    name: "Dược Hậu Giang (DHG Pharma) B2B Supply Chain API",
    sourceUrl: "https://www.dhgpharma.com.vn",
    category: "Skill",
    domain: "business_admin",
    toolType: "Skill",
    typeNameVi: "Skill",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Công ty Cổ phần Dược Hậu Giang",
    stars: 156,
    forks: 30,
    license: "Proprietary",
    summaryVi: "Kỹ năng kết nối kênh phân phối dược phẩm B2B cho bệnh viện, phòng khám và nhà thuốc đối tác của Dược Hậu Giang.",
    purposeVi: "Quản lý đặt hàng sỉ các dòng thuốc kháng sinh, giảm đau Hapacol, tim mạch, tiêu hóa chuẩn thực hành tốt sản xuất thuốc Japan-GMP và kiểm soát hạn dùng theo lô.",
    installGuideVi: "Bước 1: Đăng ký chứng nhận đủ điều kiện kinh doanh dược với phòng kinh doanh Dược Hậu Giang.\nBước 2: Cài đặt gói `dhg-b2b-sdk`.\nBước 3: Nhập thông tin tài khoản hợp đồng B2B vào tệp cấu hình.\nBước 4: Kiểm tra hạn mức tín dụng và danh mục thuốc được phép kinh doanh.",
    usageGuideVi: "Bước 1: Gọi lệnh `dhg_get_catalog` để tải bảng giá bán sỉ thuốc theo quy định đấu thầu.\nBước 2: Lập đơn đặt hàng theo thùng/hộp và kiểm tra chứng chỉ kiểm nghiệm xuất xưởng (COA).\nBước 3: Đồng bộ chứng từ xuất nhập tồn vào hệ thống quản lý kho ERP nội bộ.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        label: "Claude Desktop",
        config: JSON.stringify({
          skills: {
            "dhg-pharma-b2b": {
              endpoint: "https://b2b.dhgpharma.com.vn/api/v1",
              accountCode: "DHG_PARTNER_9988"
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        label: "Antigravity",
        config: JSON.stringify({
          skill: "dhg-pharma-b2b",
          accountCode: "DHG_PARTNER_9988"
        }, null, 2)
      },
      {
        platform: "cursor",
        label: "Cursor",
        config: JSON.stringify({
          tool: "dhg-pharma-b2b"
        }, null, 2)
      }
    ]
  },
  {
    id: "traphaco-traceability-api",
    name: "Traphaco Herbal Traceability & Supply Chain API",
    sourceUrl: "https://traphaco.com.vn",
    category: "Skill",
    domain: "business_admin",
    toolType: "Skill",
    typeNameVi: "Skill",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Công ty Cổ phần Traphaco",
    stars: 149,
    forks: 28,
    license: "Proprietary",
    summaryVi: "Kỹ năng truy xuất nguồn gốc dược liệu vùng trồng GACP-WHO và phân phối đông dược cao cấp Traphaco (Boganic, Hoạt huyết dưỡng não).",
    purposeVi: "Giúp người tiêu dùng và các đơn vị kiểm nghiệm quét mã QR truy xuất nguồn gốc dược liệu sạch từ vùng trồng Sa Pa, Nam Định, kiểm tra ngày thu hái và quy trình chiết xuất.",
    installGuideVi: "Bước 1: Cài đặt thư viện `traphaco-traceability-sdk`.\nBước 2: Cấu hình khóa kết nối cơ sở dữ liệu nguồn dược liệu.\nBước 3: Tích hợp kỹ năng vào luồng công việc kiểm định chất lượng.\nBước 4: Kiểm tra đọc mã ma trận dữ liệu (DataMatrix) trên bao bì.",
    usageGuideVi: "Bước 1: Quét mã QR sản phẩm qua lệnh `traphaco_scan_batch` để hiển thị vùng trồng dược liệu.\nBước 2: Xuất giấy chứng nhận kiểm nghiệm chất lượng và thời gian bảo quản thuốc.\nBước 3: Xác thực sản phẩm chính hãng phòng chống hàng giả hàng nhái.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        label: "Claude Desktop",
        config: JSON.stringify({
          skills: {
            "traphaco-traceability": {
              baseUrl: "https://trace.traphaco.com.vn/api",
              apiKey: "YOUR_TRAPHACO_KEY"
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        label: "Antigravity",
        config: JSON.stringify({
          skill: "traphaco-traceability",
          apiKey: "YOUR_TRAPHACO_KEY"
        }, null, 2)
      },
      {
        platform: "cursor",
        label: "Cursor",
        config: JSON.stringify({
          tool: "traphaco-traceability"
        }, null, 2)
      }
    ]
  },

  // 14-21: Hạ tầng Cloud & Viễn thông hàng đầu Việt Nam
  {
    id: "viettel-cloud-sdk",
    name: "Viettel Cloud (Viettel IDC) Compute & S3 SDK",
    sourceUrl: "https://viettelidc.com.vn",
    category: "Command",
    domain: "programming_devops",
    toolType: "Command",
    typeNameVi: "Command",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Viettel IDC",
    stars: 267,
    forks: 52,
    license: "Apache-2.0",
    summaryVi: "Giao diện dòng lệnh và bộ SDK quản lý hạ tầng máy chủ ảo (Cloud Server), lưu trữ đối tượng tương thích S3 đặt tại trung tâm dữ liệu Viettel chuẩn Tier III.",
    purposeVi: "Tự động hóa khởi tạo máy ảo Linux/Windows, điều phối tải cân bằng, sao lưu ảnh đĩa và lưu trữ tệp tin an toàn tuân thủ quy định dữ liệu đặt tại lãnh thổ Việt Nam.",
    installGuideVi: "Bước 1: Cài đặt công cụ dòng lệnh qua npm: `npm i -g @viettelidc/cloud-cli`.\nBước 2: Chạy lệnh `viettelcloud configure` để nhập Access Key ID và Secret Access Key.\nBước 3: Đặt vùng máy chủ mặc định: `han01` (Hà Nội) hoặc `sgn01` (Bình Dương).\nBước 4: Kiểm tra kết nối danh sách máy ảo bằng lệnh `viettelcloud compute list`.",
    usageGuideVi: "Bước 1: Khởi tạo máy chủ ảo hiệu năng cao qua lệnh `viettelcloud compute create --flavor s1.large --image ubuntu-24.04`.\nBước 2: Tạo vùng lưu trữ tệp tương thích S3 qua lệnh `viettelcloud s3 mb s3://du-lieu-doanh-nghiep`.\nBước 3: Thiết lập chính sách bảo mật tường lửa và định tuyến mạng ảo nội bộ VPC.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        label: "Claude Desktop Command",
        config: JSON.stringify({
          commands: {
            "viettel-cloud": {
              exec: "viettelcloud",
              region: "han01"
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        label: "Antigravity Workspace",
        config: JSON.stringify({
          commands: [
            {
              name: "viettelcloud",
              command: "viettelcloud",
              args: ["compute", "list"]
            }
          ]
        }, null, 2)
      },
      {
        platform: "cursor",
        label: "Cursor Terminal",
        config: JSON.stringify({
          alias: "viettelcloud",
          path: "/usr/local/bin/viettelcloud"
        }, null, 2)
      }
    ]
  },
  {
    id: "vnpt-cloud-server-api",
    name: "VNPT Cloud Virtual Server & Object Storage API",
    sourceUrl: "https://vnpt.com.vn",
    category: "MCP Server",
    domain: "programming_devops",
    toolType: "MCP Server",
    typeNameVi: "MCP Server",
    platforms: ["claude", "antigravity", "cursor"],
    author: "VNPT Information Technology",
    stars: 248,
    forks: 46,
    license: "Proprietary",
    summaryVi: "Máy chủ MCP kết nối nền tảng điện toán đám mây VNPT SmartCloud, quản lý cụm máy chủ, Kubernetes và sao lưu tự động.",
    purposeVi: "Cho phép các tác tử trí tuệ nhân tạo giám sát tài nguyên CPU/RAM, mở rộng tự động theo nhu cầu thực tế và đảm bảo độ trễ thấp tối ưu cho người dùng tại Việt Nam.",
    installGuideVi: "Bước 1: Đăng ký dịch vụ tại cổng VNPT Cloud Portal.\nBước 2: Cài đặt gói máy chủ MCP `@vnpt/smartcloud-mcp`.\nBước 3: Cấu hình thông tin tài khoản và chứng chỉ bảo mật máy chủ.\nBước 4: Khởi động máy chủ MCP và kiểm tra cổng dịch vụ.",
    usageGuideVi: "Bước 1: Gọi lệnh `vnpt_get_metrics` để lấy thông số hiệu năng của cụm máy chủ web.\nBước 2: Điều chỉnh cấu hình tài nguyên máy chủ qua lệnh `vnpt_scale_instance`.\nBước 3: Thực hiện sao lưu bản sao lưu (Snapshot) hệ điều hành trước khi cập nhật mã nguồn.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        label: "Claude Desktop MCP",
        config: JSON.stringify({
          mcpServers: {
            "vnpt-smartcloud": {
              command: "npx",
              args: ["-y", "@vnpt/smartcloud-mcp"],
              env: {
                VNPT_PROJECT_ID: "PROJECT_VNPT_01",
                VNPT_AUTH_TOKEN: "YOUR_VNPT_TOKEN"
              }
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        label: "Antigravity Workspace",
        config: JSON.stringify({
          name: "vnpt-smartcloud",
          command: "npx",
          args: ["-y", "@vnpt/smartcloud-mcp"],
          env: {
            VNPT_AUTH_TOKEN: "YOUR_VNPT_TOKEN"
          }
        }, null, 2)
      },
      {
        platform: "cursor",
        label: "Cursor MCP",
        config: JSON.stringify({
          name: "vnpt-smartcloud",
          command: "npx @vnpt/smartcloud-mcp"
        }, null, 2)
      }
    ]
  },
  {
    id: "cmc-cloud-openstack-bridge",
    name: "CMC Cloud OpenStack & Storage Bridge",
    sourceUrl: "https://cmccloud.vn",
    category: "Skill",
    domain: "programming_devops",
    toolType: "Skill",
    typeNameVi: "Skill",
    platforms: ["claude", "antigravity", "cursor"],
    author: "CMC Telecom",
    stars: 195,
    forks: 38,
    license: "Apache-2.0",
    summaryVi: "Kỹ năng điều phối tài nguyên máy chủ OpenStack, bộ nhớ lưu trữ hiệu năng cao SSD NVMe trên nền tảng CMC Cloud.",
    purposeVi: "Hỗ trợ kỹ sư hạ tầng cấu hình tự động mạng riêng ảo (VPC), địa chỉ IP tĩnh và triển khai cụm cơ sở dữ liệu phân tán an toàn.",
    installGuideVi: "Bước 1: Tải bộ công cụ `cmc-cloud-bridge`.\nBước 2: Cài đặt thư viện OpenStack Client tương thích.\nBước 3: Nhập thông tin xác thực OpenStack Keystone của CMC Cloud.\nBước 4: Kiểm tra tính sẵn sàng của mạng hạ tầng.",
    usageGuideVi: "Bước 1: Chạy lệnh `cmc_deploy_cluster` để tự động hóa tạo 3 máy chủ chạy Kubernetes.\nBước 2: Gắn thêm ổ đĩa lưu trữ khối lượng lớn (Block Storage) vào máy chủ cơ sở dữ liệu.\nBước 3: Xem biểu đồ băng thông mạng và cảnh báo tấn công DDoS.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        label: "Claude Desktop",
        config: JSON.stringify({
          skills: {
            "cmc-cloud-bridge": {
              keystoneUrl: "https://auth.cmccloud.vn/v3",
              projectName: "ENTERPRISE_PROD"
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        label: "Antigravity",
        config: JSON.stringify({
          skill: "cmc-cloud-bridge",
          projectName: "ENTERPRISE_PROD"
        }, null, 2)
      },
      {
        platform: "cursor",
        label: "Cursor",
        config: JSON.stringify({
          tool: "cmc-cloud-bridge"
        }, null, 2)
      }
    ]
  },
  {
    id: "fpt-smart-cloud-compute-sdk",
    name: "FPT Smart Cloud Compute & VPC SDK",
    sourceUrl: "https://fptcloud.com",
    category: "Command",
    domain: "programming_devops",
    toolType: "Command",
    typeNameVi: "Command",
    platforms: ["claude", "antigravity", "cursor"],
    author: "FPT Smart Cloud",
    stars: 221,
    forks: 43,
    license: "Commercial",
    summaryVi: "Bộ công cụ dòng lệnh quản lý tài nguyên điện toán, tường lửa mạng thế hệ mới và sao lưu đám mây chuẩn doanh nghiệp FPT Cloud.",
    purposeVi: "Cung cấp giải pháp triển khai hạ tầng tự động (Infrastructure as Code) cho các tập đoàn tài chính, ngân hàng và bán lẻ quy mô lớn tại Việt Nam.",
    installGuideVi: "Bước 1: Cài đặt tiện ích FPT Cloud CLI: `npm i -g @fptcloud/cli`.\nBước 2: Đăng nhập tài khoản qua giao diện dòng lệnh: `fptcloud login`.\nBước 3: Chọn dự án quản lý mục tiêu trong danh sách tổ chức.\nBước 4: Kiểm tra trạng thái máy chủ ảo đang hoạt động.",
    usageGuideVi: "Bước 1: Khởi tạo mạng riêng ảo qua lệnh `fptcloud vpc create --name vpc-san-pham --cidr 10.0.0.0/16`.\nBước 2: Gắn địa chỉ IP nổi công cộng (Elastic IP) cho máy chủ cân bằng tải.\nBước 3: Xem báo cáo chi phí tiêu thụ tài nguyên điện toán hàng tháng.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        label: "Claude Desktop Command",
        config: JSON.stringify({
          commands: {
            "fptcloud-cli": {
              exec: "fptcloud",
              region: "fpt-hn01"
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        label: "Antigravity Workspace",
        config: JSON.stringify({
          commands: [
            {
              name: "fptcloud",
              command: "fptcloud",
              args: ["vm", "list"]
            }
          ]
        }, null, 2)
      },
      {
        platform: "cursor",
        label: "Cursor Terminal",
        config: JSON.stringify({
          alias: "fptcloud",
          path: "/usr/local/bin/fptcloud"
        }, null, 2)
      }
    ]
  },
  {
    id: "bizfly-cloud-k8s-s3-cli",
    name: "Bizfly Cloud Kubernetes & S3 Storage CLI",
    sourceUrl: "https://bizflycloud.vn",
    category: "Command",
    domain: "programming_devops",
    toolType: "Command",
    typeNameVi: "Command",
    platforms: ["claude", "antigravity", "cursor"],
    author: "VCCorp (Bizfly Cloud)",
    stars: 210,
    forks: 42,
    license: "MIT",
    summaryVi: "Công cụ dòng lệnh quản lý dịch vụ cụm Kubernetes, lưu trữ phân tán Simple Storage và mạng phân phối nội dung CDN Bizfly Cloud.",
    purposeVi: "Tối ưu hóa thời gian tải trang cho các trang báo điện tử lớn và ứng dụng web có lưu lượng truy cập cao đột biến tại thị trường Việt Nam.",
    installGuideVi: "Bước 1: Tải công cụ qua trình quản lý gói: `npm i -g bizfly-cli`.\nBước 2: Khởi tạo tệp cấu hình qua lệnh `bizfly init` với email và mật khẩu ứng dụng.\nBước 3: Lựa chọn trung tâm dữ liệu: Hà Nội hoặc TP. Hồ Chí Minh.\nBước 4: Kiểm tra phiên bản công cụ bằng lệnh `bizfly version`.",
    usageGuideVi: "Bước 1: Tạo cụm Kubernetes được quản lý hoàn toàn bằng lệnh `bizfly k8s create --name cluster-prod --nodes 5`.\nBước 2: Đẩy tệp phương tiện truyền thông lên kho lưu trữ Simple Storage qua lệnh `bizfly s3 sync ./media s3://bucket-hinh-anh`.\nBước 3: Xóa bộ nhớ đệm CDN tức thì khi xuất bản bài viết hoặc chương trình khuyến mãi mới.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        label: "Claude Desktop Command",
        config: JSON.stringify({
          commands: {
            "bizfly-cli": {
              exec: "bizfly",
              defaultRegion: "HN"
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        label: "Antigravity Workspace",
        config: JSON.stringify({
          commands: [
            {
              name: "bizfly",
              command: "bizfly",
              args: ["k8s", "list"]
            }
          ]
        }, null, 2)
      },
      {
        platform: "cursor",
        label: "Cursor Terminal",
        config: JSON.stringify({
          alias: "bizfly",
          path: "bizfly"
        }, null, 2)
      }
    ]
  },
  {
    id: "mobifone-megapay-sdk",
    name: "MobiFone MEGAPAY Payment Gateway SDK",
    sourceUrl: "https://mobifone.vn",
    category: "Skill",
    domain: "finance_payment",
    toolType: "Skill",
    typeNameVi: "Skill",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Tổng công ty Viễn thông MobiFone",
    stars: 185,
    forks: 35,
    license: "Proprietary",
    summaryVi: "Bộ kỹ năng tích hợp cổng thanh toán trực tuyến MEGAPAY của MobiFone, hỗ trợ ví điện tử MobiFone Money, thẻ tín dụng và tiền di động (Mobile Money).",
    purposeVi: "Cung cấp kênh thanh toán cước viễn thông, nạp tiền điện thoại tự động, trừ cước trực tiếp qua tài khoản viễn thông (Direct Carrier Billing) và ví tiền di động cho người dùng tại vùng sâu vùng xa.",
    installGuideVi: "Bước 1: Ký kết hợp đồng chấp nhận thanh toán với MobiFone Service.\nBước 2: Cài đặt thư viện `@mobifone/megapay-sdk`.\nBước 3: Thiết lập Merchant ID, Secure Hash Key trong tệp cấu hình môi trường.\nBước 4: Kiểm tra thanh toán giao dịch mẫu trên hệ thống Sandbox.",
    usageGuideVi: "Bước 1: Gọi lệnh `megapay_create_charge` với số thuê bao và số tiền thanh toán.\nBước 2: Xử lý phản hồi mã OTP xác thực trừ tiền di động gửi về máy khách hàng.\nBước 3: Nhận thông báo kết quả giao dịch tự động qua cổng Webhook IPN an toàn.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        label: "Claude Desktop",
        config: JSON.stringify({
          skills: {
            "mobifone-megapay": {
              merchantId: "MOBIFONE_MERCHANT_01",
              secretKey: "YOUR_MEGAPAY_SECRET"
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        label: "Antigravity",
        config: JSON.stringify({
          skill: "mobifone-megapay",
          merchantId: "MOBIFONE_MERCHANT_01"
        }, null, 2)
      },
      {
        platform: "cursor",
        label: "Cursor",
        config: JSON.stringify({
          tool: "mobifone-megapay"
        }, null, 2)
      }
    ]
  },
  {
    id: "vinaphone-brandname-sms-sdk",
    name: "VinaPhone Brandname SMS & OTP Gateway SDK",
    sourceUrl: "https://vinaphone.com.vn",
    category: "Skill",
    domain: "telecom_cskh",
    toolType: "Skill",
    typeNameVi: "Skill",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Tổng công ty Dịch vụ Viễn thông VNPT VinaPhone",
    stars: 230,
    forks: 47,
    license: "Proprietary",
    summaryVi: "Bộ kỹ năng gửi tin nhắn thương hiệu (SMS Brandname) chăm sóc khách hàng, thông báo biến động tài khoản và mã OTP bảo mật cao qua mạng VinaPhone.",
    purposeVi: "Bảo đảm tỷ lệ gửi thành công mã OTP xác thực đăng nhập trong vòng 3 giây và truyền tải thông điệp truyền thông chính danh từ doanh nghiệp đến người tiêu dùng.",
    installGuideVi: "Bước 1: Đăng ký định danh tên thương hiệu (Brandname) với Cục An toàn thông tin và VinaPhone.\nBước 2: Tải gói `@vinaphone/sms-sdk`.\nBước 3: Điền tên Brandname đã được phê duyệt và thông tin mã xác thực API.\nBước 4: Gửi tin nhắn thử nghiệm tới số điện thoại nội bộ kiểm tra.",
    usageGuideVi: "Bước 1: Sử dụng kỹ năng `vinaphone_send_otp` để gửi mã xác minh 6 số kèm thời gian hiệu lực 5 phút.\nBước 2: Gửi tin nhắn thông báo hóa đơn tiền điện, tiền nước qua lệnh `vinaphone_send_notification`.\nBước 3: Tra cứu báo cáo trạng thái chuyển phát tin nhắn thành công theo từng thuê bao.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        label: "Claude Desktop",
        config: JSON.stringify({
          skills: {
            "vinaphone-brandname": {
              brandName: "DOANH_NGHIEP_VN",
              apiKey: "YOUR_VINAPHONE_API_KEY"
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        label: "Antigravity",
        config: JSON.stringify({
          skill: "vinaphone-brandname",
          brandName: "DOANH_NGHIEP_VN"
        }, null, 2)
      },
      {
        platform: "cursor",
        label: "Cursor",
        config: JSON.stringify({
          tool: "vinaphone-brandname"
        }, null, 2)
      }
    ]
  },
  {
    id: "viettel-post-shipping-sdk",
    name: "Viettel Post Shipping & Tracking SDK",
    sourceUrl: "https://viettelpost.com.vn",
    category: "Skill",
    domain: "logistics_transport",
    toolType: "Skill",
    typeNameVi: "Skill",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Tổng công ty Cổ phần Bưu chính Viettel (Viettel Post)",
    stars: 312,
    forks: 68,
    license: "Apache-2.0",
    summaryVi: "Bộ công cụ SDK và kỹ năng tích hợp dịch vụ chuyển phát nhanh hàng hóa trong nước và quốc tế, định giá cước và thu tiền hộ COD của Viettel Post.",
    purposeVi: "Tự động tạo vận đơn bưu gửi, tính toán cước vận chuyển tức thì theo khoảng cách và trọng lượng, in phiếu gửi hàng loạt và theo dõi hành trình xe bưu tá bốc xếp hàng hóa.",
    installGuideVi: "Bước 1: Tạo tài khoản khách hàng doanh nghiệp trên cổng Viettel Post Partner.\nBước 2: Cài đặt gói thư viện `@viettelpost/shipping-sdk` qua lệnh `npm install`.\nBước 3: Thiết lập tài khoản và mật khẩu API trong biến môi trường.\nBước 4: Kiểm thử kết nối và tạo mã vận đơn kiểm thử.",
    usageGuideVi: "Bước 1: Tính trước cước chuyển phát bưu phẩm qua lệnh `viettelpost_calculate_fee` với mã bưu chính địa chỉ gửi và nhận.\nBước 2: Tạo vận đơn chuyển phát nhanh qua lệnh `viettelpost_create_order` và nhận mã bưu gửi.\nBước 3: Lấy chuỗi mã vạch để in nhãn vận chuyển dán lên kiện hàng.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        label: "Claude Desktop",
        config: JSON.stringify({
          skills: {
            "viettel-post-sdk": {
              username: "VTPOST_USER",
              password: "YOUR_VTPOST_PASSWORD",
              inventoryId: 1024
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        label: "Antigravity",
        config: JSON.stringify({
          skill: "viettel-post-sdk",
          inventoryId: 1024
        }, null, 2)
      },
      {
        platform: "cursor",
        label: "Cursor",
        config: JSON.stringify({
          tool: "viettel-post-sdk"
        }, null, 2)
      }
    ]
  },

  // 22-26: Giáo dục trực tuyến & Nền tảng EdTech lớn tại Việt Nam
  {
    id: "vuihoc-k12-lms-connector",
    name: "Vuihoc K12 Learning Platform Connector",
    sourceUrl: "https://vuihoc.vn",
    category: "Skill",
    domain: "business_admin",
    toolType: "Skill",
    typeNameVi: "Skill",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Vuihoc Việt Nam",
    stars: 178,
    forks: 33,
    license: "Proprietary",
    summaryVi: "Kỹ năng kết nối nền tảng học tập trực tuyến bám sát chương trình giáo dục phổ thông mới của Bộ Giáo dục và Đào tạo dành cho học sinh từ lớp 1 đến lớp 12.",
    purposeVi: "Cho phép các hệ thống trường học và phụ huynh tự động giao bài tập trắc nghiệm, theo dõi lộ trình làm bài môn Toán, Tiếng Việt, Tiếng Anh và chấm điểm tự động.",
    installGuideVi: "Bước 1: Nhận mã kết nối trường học từ ban quản trị Vuihoc.\nBước 2: Cài đặt gói `vuihoc-k12-skill`.\nBước 3: Cấu hình thông tin niên khóa và lớp học trong tệp tham số.\nBước 4: Kiểm tra kết nối với kho học liệu điện tử.",
    usageGuideVi: "Bước 1: Lấy danh sách bài tập ôn luyện theo tuần bằng lệnh `vuihoc_get_lessons`.\nBước 2: Xuất bảng tổng hợp kết quả học tập và năng lực tiếp thu của từng học sinh.\nBước 3: Tự động gửi tin nhắn báo cáo kết quả rèn luyện cho phụ huynh học sinh.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        label: "Claude Desktop",
        config: JSON.stringify({
          skills: {
            "vuihoc-connector": {
              schoolId: "VUIHOC_SCHOOL_2026",
              apiToken: "YOUR_VUIHOC_TOKEN"
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        label: "Antigravity",
        config: JSON.stringify({
          skill: "vuihoc-connector",
          schoolId: "VUIHOC_SCHOOL_2026"
        }, null, 2)
      },
      {
        platform: "cursor",
        label: "Cursor",
        config: JSON.stringify({
          tool: "vuihoc-connector"
        }, null, 2)
      }
    ]
  },
  {
    id: "hocmai-elearning-api",
    name: "Hocmai.vn Online Course & Exam Management API",
    sourceUrl: "https://hocmai.vn",
    category: "Skill",
    domain: "business_admin",
    toolType: "Skill",
    typeNameVi: "Skill",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Hệ thống Giáo dục HOCMAI",
    stars: 192,
    forks: 37,
    license: "Proprietary",
    summaryVi: "Kỹ năng đồng bộ khóa luyện thi đại học, ôn thi tốt nghiệp trung học phổ thông quốc gia và kho đề thi trắc nghiệm đồ sộ của HOCMAI.",
    purposeVi: "Hỗ trợ học sinh làm bài thi thử trực tuyến có bấm giờ, phân tích phổ điểm các môn tự nhiên và xã hội, đồng thời chỉ ra phần kiến thức bị hổng để tự ôn tập.",
    installGuideVi: "Bước 1: Tải bộ thư viện `hocmai-sdk`.\nBước 2: Cấu hình thông số tài khoản học viên hoặc tài khoản trung tâm đối tác.\nBước 3: Nhúng kỹ năng vào danh mục kỹ năng của trợ lý ảo.\nBước 4: Thử nghiệm tạo một đề thi mẫu chuẩn cấu trúc đề của Bộ.",
    usageGuideVi: "Bước 1: Gọi lệnh `hocmai_generate_exam` kèm mã môn thi để nhận đề kiểm tra trắc nghiệm 50 câu.\nBước 2: Nộp đáp án và nhận phân tích lời giải chi tiết cho từng câu sai.\nBước 3: Thống kê tiến độ hoàn thành các chuyên đề luyện thi trọng tâm.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        label: "Claude Desktop",
        config: JSON.stringify({
          skills: {
            "hocmai-exam": {
              endpoint: "https://api.hocmai.vn/v2/exams",
              partnerSecret: "YOUR_HOCMAI_SECRET"
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        label: "Antigravity",
        config: JSON.stringify({
          skill: "hocmai-exam",
          partnerSecret: "YOUR_HOCMAI_SECRET"
        }, null, 2)
      },
      {
        platform: "cursor",
        label: "Cursor",
        config: JSON.stringify({
          tool: "hocmai-exam"
        }, null, 2)
      }
    ]
  },
  {
    id: "topica-edtech-lms-bridge",
    name: "Topica Edtech E-learning LMS Bridge",
    sourceUrl: "https://topica.edu.vn",
    category: "MCP Server",
    domain: "business_admin",
    toolType: "MCP Server",
    typeNameVi: "MCP Server",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Tổ hợp Công nghệ Giáo dục TOPICA",
    stars: 215,
    forks: 44,
    license: "Proprietary",
    summaryVi: "Máy chủ MCP kết nối chương trình đào tạo cử nhân trực tuyến, luyện nói tiếng Anh bản ngữ và điều phối giảng viên lớp học ảo.",
    purposeVi: "Quản lý điểm danh sinh viên trong phòng học trực tuyến, lưu trữ video bài giảng chất lượng cao và đồng bộ bảng điểm đại học với hệ sinh thái quản lý đào tạo.",
    installGuideVi: "Bước 1: Cài đặt gói máy chủ MCP `@topica/lms-mcp` qua npm.\nBước 2: Điền thông tin kết nối máy chủ đại học đối tác của Topica.\nBước 3: Khai báo cấu hình trong ứng dụng Claude Desktop hoặc Antigravity.\nBước 4: Xác thực liên kết với cổng quản trị sinh viên.",
    usageGuideVi: "Bước 1: Truy vấn danh sách lớp học ảo sắp diễn ra qua lệnh `topica_list_live_classes`.\nBước 2: Ghi nhận chuyên cần và thời gian tham gia lớp học của sinh viên.\nBước 3: Đồng bộ điểm bài tập tuần vào hệ thống quản lý học tập Moodle/Canvas.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        label: "Claude Desktop MCP",
        config: JSON.stringify({
          mcpServers: {
            "topica-lms-bridge": {
              command: "npx",
              args: ["-y", "@topica/lms-mcp@latest"],
              env: {
                TOPICA_CLIENT_ID: "YOUR_TOPICA_ID",
                TOPICA_API_SECRET: "YOUR_TOPICA_SECRET"
              }
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        label: "Antigravity Workspace",
        config: JSON.stringify({
          name: "topica-lms-bridge",
          command: "npx",
          args: ["-y", "@topica/lms-mcp@latest"],
          env: {
            TOPICA_CLIENT_ID: "YOUR_TOPICA_ID"
          }
        }, null, 2)
      },
      {
        platform: "cursor",
        label: "Cursor MCP",
        config: JSON.stringify({
          name: "topica-lms-bridge",
          command: "npx @topica/lms-mcp@latest"
        }, null, 2)
      }
    ]
  },
  {
    id: "monkey-junior-learning-api",
    name: "Monkey Junior Early Childhood Learning API",
    sourceUrl: "https://monkey.edu.vn",
    category: "Skill",
    domain: "business_admin",
    toolType: "Skill",
    typeNameVi: "Skill",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Early Start (Monkey Junior)",
    stars: 188,
    forks: 35,
    license: "Proprietary",
    summaryVi: "Kỹ năng kết nối phương pháp giáo dục sớm, phát triển ngôn ngữ tiếng Anh và tiếng Việt cho trẻ mầm non và tiểu học.",
    purposeVi: "Tạo lộ trình học từ vựng trực quan qua hình ảnh và giọng đọc chuẩn bản xứ, hỗ trợ phân tích phát âm trí tuệ nhân tạo và tạo báo cáo học tập trực quan gửi tới cha mẹ.",
    installGuideVi: "Bước 1: Cài đặt gói `monkey-junior-skill`.\nBước 2: Nhập mã kích hoạt tài khoản phụ huynh hoặc đối tác mầm non.\nBước 3: Tích hợp kỹ năng vào nền tảng trợ lý tương tác.\nBước 4: Kiểm tra khả năng phát âm thanh mẫu giọng đọc.",
    usageGuideVi: "Bước 1: Chọn chủ đề học từ vựng cho trẻ qua lệnh `monkey_get_vocab_topic`.\nBước 2: Đánh giá độ chuẩn xác phát âm của trẻ qua tệp ghi âm giọng nói.\nBước 3: Cấp huy hiệu khen thưởng ảo kích thích tinh thần tự giác học tập của bé.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        label: "Claude Desktop",
        config: JSON.stringify({
          skills: {
            "monkey-junior": {
              apiKey: "YOUR_MONKEY_API_KEY",
              childAge: 5
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        label: "Antigravity",
        config: JSON.stringify({
          skill: "monkey-junior",
          childAge: 5
        }, null, 2)
      },
      {
        platform: "cursor",
        label: "Cursor",
        config: JSON.stringify({
          tool: "monkey-junior"
        }, null, 2)
      }
    ]
  },
  {
    id: "prep-vn-ielts-test-prep-api",
    name: "Prep.vn IELTS & Language Test Prep API",
    sourceUrl: "https://prep.vn",
    category: "MCP Server",
    domain: "ai_nlp_data",
    toolType: "MCP Server",
    typeNameVi: "MCP Server",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Prep.vn EdTech",
    stars: 242,
    forks: 49,
    license: "Proprietary",
    summaryVi: "Máy chủ MCP kết nối phòng luyện thi ảo thông minh (Virtual Writing Room & Speaking Room) ứng dụng trí tuệ nhân tạo chấm chữa bài thi IELTS chuẩn xác.",
    purposeVi: "Tự động phát hiện lỗi ngữ pháp, lỗi dùng từ chưa tự nhiên, chấm điểm bài viết theo 4 tiêu chí của kỳ thi IELTS và chấm phát âm theo thang đo quốc tế.",
    installGuideVi: "Bước 1: Cài đặt gói máy chủ MCP `@prep/ielts-ai-mcp` qua npm.\nBước 2: Cung cấp mã người dùng và khóa dịch vụ chấm thi AI.\nBước 3: Thêm cấu hình máy chủ vào ứng dụng làm việc hàng ngày.\nBước 4: Chạy bài kiểm tra chấm bài luận ngắn Task 2.",
    usageGuideVi: "Bước 1: Gửi văn bản bài luận qua lệnh `prep_grade_essay` kèm tiêu đề đề bài thi.\nBước 2: Nhận phân tích chi tiết: Điểm Task Achievement, Coherence, Lexical Resource, Grammatical Range.\nBước 3: Đề xuất phương án viết lại nâng cấp câu văn lên band điểm 7.5+.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        label: "Claude Desktop MCP",
        config: JSON.stringify({
          mcpServers: {
            "prep-ielts-mcp": {
              command: "npx",
              args: ["-y", "@prep/ielts-ai-mcp@latest"],
              env: {
                PREP_AI_KEY: "YOUR_PREP_AI_KEY"
              }
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        label: "Antigravity Workspace",
        config: JSON.stringify({
          name: "prep-ielts-mcp",
          command: "npx",
          args: ["-y", "@prep/ielts-ai-mcp@latest"],
          env: {
            PREP_AI_KEY: "YOUR_PREP_AI_KEY"
          }
        }, null, 2)
      },
      {
        platform: "cursor",
        label: "Cursor MCP",
        config: JSON.stringify({
          name: "prep-ielts-mcp",
          command: "npx @prep/ielts-ai-mcp@latest"
        }, null, 2)
      }
    ]
  },

  // 27-32: Bảo mật & Xử lý ngôn ngữ tự nhiên tiếng Việt chuyên sâu
  {
    id: "viettel-cyber-security-threat-api",
    name: "Viettel Cyber Security Threat Intelligence API",
    sourceUrl: "https://viettelcybersecurity.com",
    category: "MCP Server",
    domain: "programming_devops",
    toolType: "MCP Server",
    typeNameVi: "MCP Server",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Công ty An ninh mạng Viettel (VCS)",
    stars: 340,
    forks: 72,
    license: "Proprietary",
    summaryVi: "Máy chủ MCP kết nối nền tảng tri thức tình báo mối đe dọa an ninh mạng hàng đầu Việt Nam (Viettel Threat Intelligence).",
    purposeVi: "Phát hiện sớm các chiến dịch tấn công mạng có chủ đích (APT), rà soát địa chỉ IP độc hại, tên miền lừa đảo giả mạo ngân hàng và mã độc nhắm vào cơ quan tổ chức tại Việt Nam.",
    installGuideVi: "Bước 1: Ký thỏa thuận sử dụng dịch vụ tình báo an ninh mạng với Viettel Cyber Security.\nBước 2: Cài đặt gói `@vcs/threat-intel-mcp`.\nBước 3: Nhập chứng thư điện tử và khóa bí mật API an toàn.\nBước 4: Kiểm tra trạng thái đồng bộ cơ sở dữ liệu dấu hiệu mã độc (IoC).",
    usageGuideVi: "Bước 1: Tra cứu chỉ số nguy hại của tên miền lạ bằng lệnh `vcs_lookup_domain`.\nBước 2: Kiểm tra danh sách địa chỉ IP tấn công từ chối dịch vụ mới xuất hiện trong 24 giờ qua.\nBước 3: Nhận cảnh báo khi có thông tin rò rỉ dữ liệu tài khoản nhân viên của tổ chức trên không gian mạng tối (Dark Web).",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        label: "Claude Desktop MCP",
        config: JSON.stringify({
          mcpServers: {
            "vcs-threat-intel": {
              command: "npx",
              args: ["-y", "@vcs/threat-intel-mcp@latest"],
              env: {
                VCS_API_TOKEN: "YOUR_VCS_API_TOKEN",
                ORG_CODE: "ENTERPRISE_VN"
              }
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        label: "Antigravity Workspace",
        config: JSON.stringify({
          name: "vcs-threat-intel",
          command: "npx",
          args: ["-y", "@vcs/threat-intel-mcp@latest"],
          env: {
            VCS_API_TOKEN: "YOUR_VCS_API_TOKEN"
          }
        }, null, 2)
      },
      {
        platform: "cursor",
        label: "Cursor MCP",
        config: JSON.stringify({
          name: "vcs-threat-intel",
          command: "npx @vcs/threat-intel-mcp@latest"
        }, null, 2)
      }
    ]
  },
  {
    id: "bkav-safegate-family-bridge",
    name: "Bkav SafeGate Internet Security Bridge",
    sourceUrl: "https://bkav.com.vn",
    category: "Skill",
    domain: "programming_devops",
    toolType: "Skill",
    typeNameVi: "Skill",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Tập đoàn Công nghệ Bkav",
    stars: 205,
    forks: 38,
    license: "Proprietary",
    summaryVi: "Kỹ năng quản trị tường lửa gia đình và trường học, ngăn chặn trang web độc hại, cờ bạc, lừa đảo trực tuyến và quản lý thời gian sử dụng mạng của trẻ em.",
    purposeVi: "Cho phép phụ huynh và nhà quản trị mạng tự động lọc nội dung xấu độc trên toàn bộ thiết bị kết nối vào mạng Wi-Fi mà không cần cài phần mềm lên từng máy khách.",
    installGuideVi: "Bước 1: Kết nối thiết bị mạng an toàn SafeGate vào bộ định tuyến Wi-Fi gia đình.\nBước 2: Cài đặt gói thư viện quản trị `bkav-safegate-sdk`.\nBước 3: Nhập mã thiết bị và mã quản trị viên mạng.\nBước 4: Khởi động quy trình giám sát luồng truy cập tự động.",
    usageGuideVi: "Bước 1: Bật bộ lọc chống mã độc và lừa đảo qua lệnh `safegate_enable_protection`.\nBước 2: Lập lịch ngắt kết nối Internet vào khung giờ học bài hoặc ban đêm cho máy tính của con.\nBước 3: Xem báo cáo thống kê các đường link độc hại đã được ngăn chặn thành công trong ngày.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        label: "Claude Desktop",
        config: JSON.stringify({
          skills: {
            "bkav-safegate": {
              gatewayIp: "192.168.1.1",
              adminToken: "YOUR_SAFEGATE_TOKEN"
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        label: "Antigravity",
        config: JSON.stringify({
          skill: "bkav-safegate",
          adminToken: "YOUR_SAFEGATE_TOKEN"
        }, null, 2)
      },
      {
        platform: "cursor",
        label: "Cursor",
        config: JSON.stringify({
          tool: "bkav-safegate"
        }, null, 2)
      }
    ]
  },
  {
    id: "cmc-cyber-security-malware-api",
    name: "CMC Cyber Security Anti-Malware API",
    sourceUrl: "https://cmccybersecurity.com",
    category: "Skill",
    domain: "programming_devops",
    toolType: "Skill",
    typeNameVi: "Skill",
    platforms: ["claude", "antigravity", "cursor"],
    author: "CMC Cyber Security",
    stars: 172,
    forks: 31,
    license: "Commercial",
    summaryVi: "Kỹ năng quét mã độc tệp tin đính kèm, phát hiện virus tống tiền (Ransomware) và phân tích hành vi độc hại đa tầng.",
    purposeVi: "Tự động phân tích các tệp tin người dùng tải lên hệ thống trước khi lưu vào kho dữ liệu, bảo vệ máy chủ dịch vụ khỏi các lỗ hổng thực thi mã từ xa.",
    installGuideVi: "Bước 1: Nhận tài khoản API phân tích tệp từ CMC Cyber Security.\nBước 2: Cài đặt thư viện `cmc-antimalware-sdk`.\nBước 3: Cấu hình khóa bí mật quét mã độc trong tệp môi trường.\nBước 4: Kiểm thử quét tệp mẫu an toàn EICAR.",
    usageGuideVi: "Bước 1: Gửi luồng byte tệp tin qua lệnh `cmc_scan_file` để nhận kết quả phân tích sau 2 giây.\nBước 2: Kiểm tra tỷ lệ nhận diện mã độc từ các bộ máy diệt virus hàng đầu thế giới kết hợp công nghệ AI Việt Nam.\nBước 3: Tự động cách ly hoặc xóa bỏ tệp nếu phát hiện mã nguồn độc hại.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        label: "Claude Desktop",
        config: JSON.stringify({
          skills: {
            "cmc-antimalware": {
              apiUrl: "https://api.cmccybersecurity.com/scan",
              apiKey: "YOUR_CMC_SCAN_KEY"
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        label: "Antigravity",
        config: JSON.stringify({
          skill: "cmc-antimalware",
          apiKey: "YOUR_CMC_SCAN_KEY"
        }, null, 2)
      },
      {
        platform: "cursor",
        label: "Cursor",
        config: JSON.stringify({
          tool: "cmc-antimalware"
        }, null, 2)
      }
    ]
  },
  {
    id: "vncorenlp-vietnamese-parser",
    name: "VnCoreNLP - Xử Lý Ngôn Ngữ Tự Nhiên Tiếng Việt",
    sourceUrl: "https://github.com/vncorenlp/VnCoreNLP",
    category: "Skill",
    domain: "ai_nlp_data",
    toolType: "Skill",
    typeNameVi: "Skill",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Trường Đại học Công nghệ - ĐHQG Hà Nội",
    stars: 1250,
    forks: 310,
    license: "Apache-2.0",
    summaryVi: "Bộ công cụ xử lý ngôn ngữ tự nhiên tiếng Việt mạnh mẽ, hỗ trợ tách từ, gán nhãn từ loại (POS tagging), nhận dạng thực thể có tên (NER) và phân tích cú pháp phụ thuộc.",
    purposeVi: "Cung cấp nền tảng chuẩn hóa dữ liệu văn bản tiếng Việt cho các hệ thống tìm kiếm thông tin, khai phá dữ liệu khách hàng và xây dựng trợ lý ảo thông minh.",
    installGuideVi: "Bước 1: Cài đặt môi trường máy ảo Java 11 trở lên trên hệ điều hành.\nBước 2: Tải gói `vncorenlp` qua pip: `pip install py_vncorenlp`.\nBước 3: Tải mô hình dữ liệu ngôn ngữ tiếng Việt về máy cục bộ qua lệnh tự động.\nBước 4: Kiểm tra khả năng tách từ của câu văn mẫu.",
    usageGuideVi: "Bước 1: Sử dụng hàm `word_segmentation` để tách từ ghép tiếng Việt chuẩn xác (ví dụ: 'thị_trường chứng_khoán').\nBước 2: Trích xuất các thực thể người, địa danh, tổ chức trong hợp đồng qua tính năng `ner`.\nBước 3: Chuẩn bị dữ liệu đầu vào chuẩn hóa cho các mô hình nhúng ngữ nghĩa chuyên sâu.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        label: "Claude Desktop",
        config: JSON.stringify({
          skills: {
            "vncorenlp-py": {
              pythonPath: "python",
              modelDir: "./vncorenlp_models"
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        label: "Antigravity",
        config: JSON.stringify({
          skill: "vncorenlp-py",
          models: ["wseg", "pos", "ner", "parse"]
        }, null, 2)
      },
      {
        platform: "cursor",
        label: "Cursor",
        config: JSON.stringify({
          tool: "vncorenlp-py"
        }, null, 2)
      }
    ]
  },
  {
    id: "vinai-phogpt-bridge",
    name: "VinAI PhoGPT Large Language Model Bridge",
    sourceUrl: "https://github.com/VinAIResearch/PhoGPT",
    category: "MCP Server",
    domain: "ai_nlp_data",
    toolType: "MCP Server",
    typeNameVi: "MCP Server",
    platforms: ["claude", "antigravity", "cursor"],
    author: "VinAI Research",
    stars: 980,
    forks: 145,
    license: "Apache-2.0",
    summaryVi: "Máy chủ MCP kết nối mô hình ngôn ngữ lớn nguồn mở PhoGPT-7B và PhoGPT-4B được huấn luyện chuyên sâu cho tiếng Việt từ dữ liệu chất lượng cao.",
    purposeVi: "Cho phép triển khai cục bộ các tác vụ tóm tắt văn bản, dịch thuật, trả lời câu hỏi nghiệp vụ và tạo sinh nội dung tiếng Việt thuần phong mỹ tục và hiểu sâu văn hóa bản địa.",
    installGuideVi: "Bước 1: Cài đặt thư viện vLLM hoặc Ollama hỗ trợ nạp trọng số PhoGPT.\nBước 2: Tải trọng số mô hình từ HuggingFace: `vinai/PhoGPT-7B5-Instruct`.\nBước 3: Khởi chạy máy chủ MCP `@vinai/phogpt-mcp` trỏ về cổng máy chủ suy luận cục bộ.\nBước 4: Kiểm tra khả năng tạo sinh văn bản tiếng Việt tốc độ cao.",
    usageGuideVi: "Bước 1: Sử dụng lệnh `phogpt_generate` để soạn thảo công văn hành chính tiếng Việt trang trọng.\nBước 2: Tóm tắt biên bản cuộc họp dài nhiều trang bằng tiếng Việt súc tích.\nBước 3: Đặt câu hỏi truy vấn dữ liệu tài liệu nội bộ doanh nghiệp.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        label: "Claude Desktop MCP",
        config: JSON.stringify({
          mcpServers: {
            "phogpt-bridge": {
              command: "npx",
              args: ["-y", "@vinai/phogpt-mcp@latest"],
              env: {
                MODEL_ENDPOINT: "http://localhost:8000/v1",
                MODEL_NAME: "vinai/PhoGPT-7B5-Instruct"
              }
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        label: "Antigravity Workspace",
        config: JSON.stringify({
          name: "phogpt-bridge",
          command: "npx",
          args: ["-y", "@vinai/phogpt-mcp@latest"],
          env: {
            MODEL_ENDPOINT: "http://localhost:8000/v1"
          }
        }, null, 2)
      },
      {
        platform: "cursor",
        label: "Cursor MCP",
        config: JSON.stringify({
          name: "phogpt-bridge",
          command: "npx @vinai/phogpt-mcp@latest"
        }, null, 2)
      }
    ]
  },
  {
    id: "vast-vietnamese-speech-nlp",
    name: "VAST Vietnamese Speech & NLP Toolkit",
    sourceUrl: "https://vast.gov.vn",
    category: "Skill",
    domain: "ai_nlp_data",
    toolType: "Skill",
    typeNameVi: "Skill",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Viện Hàn lâm Khoa học và Công nghệ Việt Nam (VAST)",
    stars: 215,
    forks: 43,
    license: "MIT",
    summaryVi: "Bộ công cụ nhận dạng tiếng nói các vùng miền Bắc - Trung - Nam và tổng hợp giọng đọc chuẩn khoa học của Viện Hàn lâm Khoa học và Công nghệ Việt Nam.",
    purposeVi: "Hỗ trợ phiên âm tự động các cuộc họp hội đồng khoa học, chuyển đổi giọng nói thành văn bản cho người khiếm thính và xây dựng giọng đọc số hóa sách báo khoa học.",
    installGuideVi: "Bước 1: Cài đặt gói `vast-speech-nlp` qua pip hoặc npm.\nBước 2: Khai báo mô hình ngôn ngữ vùng miền phù hợp mục đích sử dụng.\nBước 3: Cấu hình kỹ năng trong môi trường thực thi của trợ lý AI.\nBước 4: Kiểm thử nhận dạng tệp ghi âm giọng nói chất lượng thấp.",
    usageGuideVi: "Bước 1: Chuyển đổi tệp ghi âm cuộc họp thành văn bản có dấu câu chuẩn qua lệnh `vast_transcribe_audio`.\nBước 2: Tổng hợp giọng đọc tiếng Việt truyền cảm qua lệnh `vast_synthesize_voice`.\nBước 3: Chuẩn hóa ngữ âm và phiên âm tên riêng nước ngoài sang tiếng Việt theo chuẩn khoa học.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        label: "Claude Desktop",
        config: JSON.stringify({
          skills: {
            "vast-speech": {
              dialect: "all_regions",
              sampleRate: 16000
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        label: "Antigravity",
        config: JSON.stringify({
          skill: "vast-speech",
          dialect: "all_regions"
        }, null, 2)
      },
      {
        platform: "cursor",
        label: "Cursor",
        config: JSON.stringify({
          tool: "vast-speech"
        }, null, 2)
      }
    ]
  },

  // 33-40: Dịch vụ công & Hành chính công 5 thành phố trực thuộc Trung ương & Cổng Quốc gia
  {
    id: "dvc-hanoi-portal-connector",
    name: "Cổng Dịch Vụ Công TP. Hà Nội Connector",
    sourceUrl: "https://dichvucong.hanoi.gov.vn",
    category: "Skill",
    domain: "legal_public_service",
    toolType: "Skill",
    typeNameVi: "Skill",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Ủy ban nhân dân TP. Hà Nội",
    stars: 310,
    forks: 64,
    license: "Proprietary",
    summaryVi: "Kỹ năng tra cứu tiến độ giải quyết hồ sơ hành chính, đăng ký thủ tục đất đai, hộ tịch và đăng ký kinh doanh tại địa bàn Thủ đô Hà Nội.",
    purposeVi: "Giúp người dân và doanh nghiệp tra cứu tức thì tình trạng xử lý hồ sơ hành chính công, danh mục giấy tờ cần chuẩn bị và nhận thông báo kết quả qua tin nhắn.",
    installGuideVi: "Bước 1: Tải về bộ kỹ năng `dvc-hanoi-bridge`.\nBước 2: Cài đặt các tham số kết nối cổng dữ liệu mở Hà Nội.\nBước 3: Khai báo kỹ năng vào hệ sinh thái của trợ lý ảo.\nBước 4: Kiểm tra truy vấn mã hồ sơ hành chính thực tế.",
    usageGuideVi: "Bước 1: Gọi lệnh `dvc_hanoi_check_status` kèm mã biên nhận hồ sơ để kiểm tra cơ quan đang thụ lý.\nBước 2: Tra cứu danh mục hồ sơ thủ tục cấp đổi giấy phép lái xe hoặc đăng ký khai sinh.\nBước 3: Lấy biểu mẫu đơn từ chuẩn theo quy định hiện hành.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        label: "Claude Desktop",
        config: JSON.stringify({
          skills: {
            "dvc-hanoi": {
              endpoint: "https://dichvucong.hanoi.gov.vn/api/v1",
              cityCode: "01"
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        label: "Antigravity",
        config: JSON.stringify({
          skill: "dvc-hanoi",
          cityCode: "01"
        }, null, 2)
      },
      {
        platform: "cursor",
        label: "Cursor",
        config: JSON.stringify({
          tool: "dvc-hanoi"
        }, null, 2)
      }
    ]
  },
  {
    id: "dvc-hcm-portal-connector",
    name: "Cổng Dịch Vụ Công TP. Hồ Chí Minh Connector",
    sourceUrl: "https://dichvucong.hochiminhcity.gov.vn",
    category: "Skill",
    domain: "legal_public_service",
    toolType: "Skill",
    typeNameVi: "Skill",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Ủy ban nhân dân TP. Hồ Chí Minh",
    stars: 325,
    forks: 69,
    license: "Proprietary",
    summaryVi: "Kỹ năng tra cứu hồ sơ một cửa điện tử liên thông, đăng ký thành lập doanh nghiệp và các thủ tục tư pháp tại TP. Hồ Chí Minh.",
    purposeVi: "Tối ưu hóa thời gian thực hiện thủ tục hành chính công trực tuyến cấp độ 4, liên thông giữa các sở ban ngành và Ủy ban nhân dân các quận huyện, thành phố Thủ Đức.",
    installGuideVi: "Bước 1: Cài đặt gói `dvc-hcm-bridge`.\nBước 2: Khai báo cấu hình kết nối cổng dịch vụ công thành phố.\nBước 3: Kích hoạt kỹ năng trong trợ lý thông minh.\nBước 4: Kiểm thử tra cứu mã biên nhận hồ sơ hành chính một cửa.",
    usageGuideVi: "Bước 1: Sử dụng lệnh `dvc_hcm_track_record` với mã biên nhận một cửa để xem quy trình xử lý.\nBước 2: Hướng dẫn người dân chuẩn bị hồ sơ cấp phép xây dựng hoặc giấy phép kinh doanh.\nBước 3: Đặt lịch hẹn nộp hồ sơ tại bộ phận một cửa các quận huyện.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        label: "Claude Desktop",
        config: JSON.stringify({
          skills: {
            "dvc-hcm": {
              endpoint: "https://dichvucong.hochiminhcity.gov.vn/api",
              cityCode: "79"
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        label: "Antigravity",
        config: JSON.stringify({
          skill: "dvc-hcm",
          cityCode: "79"
        }, null, 2)
      },
      {
        platform: "cursor",
        label: "Cursor",
        config: JSON.stringify({
          tool: "dvc-hcm"
        }, null, 2)
      }
    ]
  },
  {
    id: "dvc-danang-portal-connector",
    name: "Cổng Dịch Vụ Công TP. Đà Nẵng Connector",
    sourceUrl: "https://dichvucong.danang.gov.vn",
    category: "Skill",
    domain: "legal_public_service",
    toolType: "Skill",
    typeNameVi: "Skill",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Ủy ban nhân dân TP. Đà Nẵng",
    stars: 280,
    forks: 56,
    license: "Proprietary",
    summaryVi: "Kỹ năng kết nối thành phố thông minh Đà Nẵng, tra cứu hồ sơ hành chính, phản ánh góp ý đô thị qua tổng đài dịch vụ công 1022.",
    purposeVi: "Cho phép tiếp nhận phản ánh hiện trường về trật tự đô thị, giao thông, môi trường và theo dõi tiến độ xử lý văn bản hành chính của cơ quan nhà nước tại Đà Nẵng.",
    installGuideVi: "Bước 1: Cài đặt thư viện `danang-smartcity-skill`.\nBước 2: Cấu hình khóa kết nối nền tảng dữ liệu mở Đà Nẵng Open Data.\nBước 3: Nhúng kỹ năng vào giao diện trợ lý thông minh.\nBước 4: Thử nghiệm gửi phản ánh hiện trường giả lập.",
    usageGuideVi: "Bước 1: Gọi lệnh `danang_check_status` để xem kết quả thẩm định hồ sơ công dân.\nBước 2: Gửi phản ánh hiện trường kèm hình ảnh và tọa độ địa lý qua lệnh `danang_submit_feedback`.\nBước 3: Tra cứu kết quả xử lý phản ánh của cơ quan chức năng được công khai minh bạch.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        label: "Claude Desktop",
        config: JSON.stringify({
          skills: {
            "dvc-danang": {
              endpoint: "https://dichvucong.danang.gov.vn/api",
              cityCode: "48"
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        label: "Antigravity",
        config: JSON.stringify({
          skill: "dvc-danang",
          cityCode: "48"
        }, null, 2)
      },
      {
        platform: "cursor",
        label: "Cursor",
        config: JSON.stringify({
          tool: "dvc-danang"
        }, null, 2)
      }
    ]
  },
  {
    id: "dvc-haiphong-portal-connector",
    name: "Cổng Dịch Vụ Công TP. Hải Phòng Connector",
    sourceUrl: "https://dichvucong.haiphong.gov.vn",
    category: "Skill",
    domain: "legal_public_service",
    toolType: "Skill",
    typeNameVi: "Skill",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Ủy ban nhân dân TP. Hải Phòng",
    stars: 240,
    forks: 48,
    license: "Proprietary",
    summaryVi: "Kỹ năng kết nối thủ tục hành chính cảng biển, xuất nhập khẩu, hải quan cảng và dịch vụ công trực tuyến thành phố Hải Phòng.",
    purposeVi: "Hỗ trợ các doanh nghiệp logistics, hãng tàu và người dân tra cứu biểu phí cảng biển, giấy phép lưu thông xe container và giải quyết thủ tục một cửa liên thông.",
    installGuideVi: "Bước 1: Tải về bộ kỹ năng `dvc-haiphong-sdk`.\nBước 2: Cài đặt các thông số dịch vụ công Hải Phòng.\nBước 3: Đưa kỹ năng vào danh sách thực thi của trợ lý AI.\nBước 4: Kiểm tra kết nối dịch vụ một cửa điện tử.",
    usageGuideVi: "Bước 1: Tra cứu hồ sơ cấp phép phương tiện ra vào khu vực cảng biển qua lệnh `haiphong_port_permit`.\nBước 2: Kiểm tra tình trạng nộp thuế hạ tầng cảng biển trực tuyến.\nBước 3: Nhận thông báo tự động khi hồ sơ được phê duyệt hoàn tất.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        label: "Claude Desktop",
        config: JSON.stringify({
          skills: {
            "dvc-haiphong": {
              endpoint: "https://dichvucong.haiphong.gov.vn/api",
              cityCode: "31"
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        label: "Antigravity",
        config: JSON.stringify({
          skill: "dvc-haiphong",
          cityCode: "31"
        }, null, 2)
      },
      {
        platform: "cursor",
        label: "Cursor",
        config: JSON.stringify({
          tool: "dvc-haiphong"
        }, null, 2)
      }
    ]
  },
  {
    id: "dvc-cantho-portal-connector",
    name: "Cổng Dịch Vụ Công TP. Cần Thơ Connector",
    sourceUrl: "https://dichvucong.cantho.gov.vn",
    category: "Skill",
    domain: "legal_public_service",
    toolType: "Skill",
    typeNameVi: "Skill",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Ủy ban nhân dân TP. Cần Thơ",
    stars: 220,
    forks: 44,
    license: "Proprietary",
    summaryVi: "Kỹ năng tra cứu dịch vụ công trực tuyến thủ phủ miền Tây Nam Bộ, thủ tục nông nghiệp công nghệ cao và logistics thủy sản Cần Thơ.",
    purposeVi: "Giúp hợp tác xã nông nghiệp và bà con đồng bằng sông Cửu Long đăng ký cấp mã số vùng trồng, chứng nhận an toàn vệ sinh thực phẩm và chứng thực điện tử.",
    installGuideVi: "Bước 1: Cài đặt gói `dvc-cantho-bridge`.\nBước 2: Nhập thông số cổng dịch vụ công Cần Thơ.\nBước 3: Thêm kỹ năng vào cấu hình trợ lý ảo.\nBước 4: Kiểm tra tra cứu danh mục dịch vụ công mức độ 4.",
    usageGuideVi: "Bước 1: Sử dụng lệnh `cantho_lookup_procedure` để tìm thủ tục cấp phép vùng nuôi trồng thủy sản.\nBước 2: Kiểm tra hồ sơ xin cấp đổi giấy phép kinh doanh nông sản.\nBước 3: Nhận lịch hẹn trả kết quả và thanh toán phí lệ phí trực tuyến.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        label: "Claude Desktop",
        config: JSON.stringify({
          skills: {
            "dvc-cantho": {
              endpoint: "https://dichvucong.cantho.gov.vn/api",
              cityCode: "92"
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        label: "Antigravity",
        config: JSON.stringify({
          skill: "dvc-cantho",
          cityCode: "92"
        }, null, 2)
      },
      {
        platform: "cursor",
        label: "Cursor",
        config: JSON.stringify({
          tool: "dvc-cantho"
        }, null, 2)
      }
    ]
  },
  {
    id: "moj-legal-documents-lookup",
    name: "Cổng Tra Cứu Văn Bản Quy Phạm Pháp Luật (Bộ Tư Pháp)",
    sourceUrl: "https://moj.gov.vn",
    category: "Skill",
    domain: "legal_public_service",
    toolType: "Skill",
    typeNameVi: "Skill",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Bộ Tư pháp Việt Nam",
    stars: 350,
    forks: 78,
    license: "Proprietary",
    summaryVi: "Kỹ năng tra cứu cơ sở dữ liệu quốc gia về văn bản quy phạm pháp luật, kiểm tra hiệu lực Luật, Nghị định, Thông tư từ nguồn chính thống Bộ Tư pháp.",
    purposeVi: "Cho phép các luật sư, thẩm định viên pháp chế doanh nghiệp kiểm tra tình trạng còn hiệu lực, bị bãi bỏ hoặc sửa đổi bổ sung của các văn bản luật hiện hành tại Việt Nam.",
    installGuideVi: "Bước 1: Tải về bộ kỹ năng tra cứu `moj-legal-lookup`.\nBước 2: Cài đặt các tham số tìm kiếm ngữ nghĩa văn bản pháp luật.\nBước 3: Nhúng kỹ năng vào danh sách kỹ năng chuyên gia của trợ lý AI.\nBước 4: Kiểm thử tra cứu một Nghị định cụ thể.",
    usageGuideVi: "Bước 1: Sử dụng kỹ năng `moj_search_law` với số hiệu hoặc từ khóa (ví dụ: 'Nghị định 123/2020/NĐ-CP').\nBước 2: Xem trạng thái hiệu lực: 'Còn hiệu lực', 'Hết hiệu lực một phần' hoặc 'Hết hiệu lực toàn bộ'.\nBước 3: Tải toàn văn văn bản dạng Word hoặc PDF có chữ ký số xác thực của cơ quan ban hành.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        label: "Claude Desktop",
        config: JSON.stringify({
          skills: {
            "moj-legal": {
              source: "https://vbpl.vn",
              enableSemanticSearch: true
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        label: "Antigravity",
        config: JSON.stringify({
          skill: "moj-legal",
          enableSemanticSearch: true
        }, null, 2)
      },
      {
        platform: "cursor",
        label: "Cursor",
        config: JSON.stringify({
          tool: "moj-legal"
        }, null, 2)
      }
    ]
  },
  {
    id: "bhxh-family-insurance-lookup",
    name: "Cổng Tra Cứu Mã Số BHXH & BHYT Hộ Gia Đình",
    sourceUrl: "https://baohiemxahoi.gov.vn",
    category: "Skill",
    domain: "legal_public_service",
    toolType: "Skill",
    typeNameVi: "Skill",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Bảo hiểm Xã hội Việt Nam",
    stars: 360,
    forks: 82,
    license: "Proprietary",
    summaryVi: "Kỹ năng tra cứu mã số bảo hiểm xã hội cá nhân, hạn sử dụng thẻ bảo hiểm y tế hộ gia đình và điểm thu bảo hiểm xã hội tự nguyện.",
    purposeVi: "Hỗ trợ công dân và bộ phận nhân sự tiền lương (C&B) kiểm tra quá trình tham gia bảo hiểm, tra cứu thông tin thẻ BHYT phục vụ khám chữa bệnh kịp thời.",
    installGuideVi: "Bước 1: Cài đặt gói tích hợp `bhxh-lookup-skill`.\nBước 2: Cấu hình thông tin xác thực tra cứu bảo mật theo chuẩn ngành bảo hiểm.\nBước 3: Khai báo kỹ năng trong trợ lý thông minh.\nBước 4: Thử nghiệm tra cứu thông tin thẻ BHYT có sẵn.",
    usageGuideVi: "Bước 1: Gọi lệnh `bhxh_find_code` với họ tên, ngày sinh, số CCCD và mã tỉnh thành để lấy mã số BHXH 10 số.\nBước 2: Kiểm tra giá trị sử dụng thẻ BHYT qua lệnh `bhyt_check_expiry`.\nBước 3: Xem cơ sở khám chữa bệnh đăng ký ban đầu và mức quyền lợi được hưởng.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        label: "Claude Desktop",
        config: JSON.stringify({
          skills: {
            "bhxh-lookup": {
              endpoint: "https://baohiemxahoi.gov.vn/api/tracuu",
              timeout: 10000
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        label: "Antigravity",
        config: JSON.stringify({
          skill: "bhxh-lookup"
        }, null, 2)
      },
      {
        platform: "cursor",
        label: "Cursor",
        config: JSON.stringify({
          tool: "bhxh-lookup"
        }, null, 2)
      }
    ]
  },
  {
    id: "tiemchung-quocgia-portal-api",
    name: "Hệ Thống Quản Lý Tiêm Chủng Quốc Gia Connector",
    sourceUrl: "https://tiemchung.gov.vn",
    category: "Skill",
    domain: "legal_public_service",
    toolType: "Skill",
    typeNameVi: "Skill",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Bộ Y tế Việt Nam",
    stars: 275,
    forks: 55,
    license: "Proprietary",
    summaryVi: "Kỹ năng tra cứu chứng nhận tiêm chủng vắc xin quốc gia, lịch tiêm chủng mở rộng cho trẻ em và người lớn tuổi trên toàn quốc.",
    purposeVi: "Tự động nhắc lịch tiêm phòng các mũi vắc xin quan trọng (sởi, quai bị, uốn ván, cúm mùa) cho gia đình và xuất chứng nhận tiêm chủng điện tử có mã QR.",
    installGuideVi: "Bước 1: Cài đặt bộ công cụ `tiemchung-quocgia-skill`.\nBước 2: Cung cấp tham số kết nối hệ thống y tế dự phòng.\nBước 3: Nhúng kỹ năng vào giao diện trợ lý y tế cá nhân.\nBước 4: Kiểm tra khả năng tra cứu hồ sơ tiêm chủng.",
    usageGuideVi: "Bước 1: Nhập số CCCD hoặc mã định danh trẻ em qua lệnh `tiemchung_get_record` để xem lịch sử các mũi tiêm.\nBước 2: Tạo lịch nhắc hẹn tiêm nhắc lại tự động đồng bộ vào Google Calendar/Outlook.\nBước 3: Xuất thẻ tiêm chủng vắc xin điện tử để hoàn thiện hồ sơ nhập học cho trẻ.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        label: "Claude Desktop",
        config: JSON.stringify({
          skills: {
            "tiemchung-quocgia": {
              portal: "https://tiemchung.gov.vn",
              enableReminders: true
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        label: "Antigravity",
        config: JSON.stringify({
          skill: "tiemchung-quocgia",
          enableReminders: true
        }, null, 2)
      },
      {
        platform: "cursor",
        label: "Cursor",
        config: JSON.stringify({
          tool: "tiemchung-quocgia"
        }, null, 2)
      }
    ]
  },

  // 41-50: Doanh nghiệp, Bất động sản, Vận tải công nghệ, Chuỗi F&B lớn
  {
    id: "batdongsan-com-vn-search-api",
    name: "Batdongsan.com.vn Property Listing & Search API",
    sourceUrl: "https://batdongsan.com.vn",
    category: "MCP Server",
    domain: "business_admin",
    toolType: "MCP Server",
    typeNameVi: "MCP Server",
    platforms: ["claude", "antigravity", "cursor"],
    author: "PropertyGuru Vietnam (Batdongsan.com.vn)",
    stars: 310,
    forks: 67,
    license: "Proprietary",
    summaryVi: "Máy chủ MCP kết nối cổng thông tin bất động sản lớn nhất Việt Nam, tra cứu giá bán nhà đất, căn hộ chung cư, diện tích và pháp lý sổ hồng sổ đỏ.",
    purposeVi: "Giúp các nhà đầu tư và người mua nhà phân tích chỉ số biến động giá đất theo từng quận huyện, phường xã của 34 tỉnh thành và sàng lọc tin đăng chính chủ.",
    installGuideVi: "Bước 1: Đăng ký dịch vụ đối tác dữ liệu bất động sản với PropertyGuru Việt Nam.\nBước 2: Cài đặt gói máy chủ MCP `@propertyguru/batdongsan-mcp`.\nBước 3: Cấu hình khóa bí mật đối tác và thời gian lưu bộ đệm kết quả.\nBước 4: Khởi động máy chủ và thử nghiệm tìm kiếm tin đăng nhà đất.",
    usageGuideVi: "Bước 1: Gọi lệnh `bds_search_listings` với các tiêu chí: loại hình (chung cư, nhà phố), tầm giá và khoảng diện tích.\nBước 2: Xem biểu đồ lịch sử biến động đơn giá mỗi mét vuông trong 3 năm qua tại khu vực cần mua.\nBước 3: Lọc danh sách bất động sản có chứng nhận pháp lý đầy đủ và số điện thoại môi giới uy tín.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        label: "Claude Desktop MCP",
        config: JSON.stringify({
          mcpServers: {
            "batdongsan-mcp": {
              command: "npx",
              args: ["-y", "@propertyguru/batdongsan-mcp@latest"],
              env: {
                BDS_API_TOKEN: "YOUR_BATDONGSAN_TOKEN"
              }
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        label: "Antigravity Workspace",
        config: JSON.stringify({
          name: "batdongsan-mcp",
          command: "npx",
          args: ["-y", "@propertyguru/batdongsan-mcp@latest"],
          env: {
            BDS_API_TOKEN: "YOUR_BATDONGSAN_TOKEN"
          }
        }, null, 2)
      },
      {
        platform: "cursor",
        label: "Cursor MCP",
        config: JSON.stringify({
          name: "batdongsan-mcp",
          command: "npx @propertyguru/batdongsan-mcp@latest"
        }, null, 2)
      }
    ]
  },
  {
    id: "alonhadat-property-crawler",
    name: "Alonhadat Real Estate Analytics & Crawler",
    sourceUrl: "https://alonhadat.com.vn",
    category: "Skill",
    domain: "business_admin",
    toolType: "Skill",
    typeNameVi: "Skill",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Alonhadat Official",
    stars: 185,
    forks: 36,
    license: "MIT",
    summaryVi: "Kỹ năng phân tích tin đăng rao vặt nhà đất, so sánh giá cho thuê văn phòng và căn hộ dịch vụ trên kênh Alonhadat.",
    purposeVi: "Tự động thu thập, làm sạch dữ liệu giá thuê văn phòng hạng A/B/C và mặt bằng kinh doanh tại các trục đường trung tâm thương mại.",
    installGuideVi: "Bước 1: Cài đặt gói thư viện `alonhadat-analytics`.\nBước 2: Cấu hình quy tắc tần suất thu thập dữ liệu tôn trọng máy chủ nguồn.\nBước 3: Kích hoạt kỹ năng trong trợ lý phân tích dữ liệu.\nBước 4: Kiểm tra kết quả trích xuất thông tin diện tích và mức giá thuê.",
    usageGuideVi: "Bước 1: Sử dụng lệnh `alonhadat_analyze_rent` với tên tuyến đường và phân khúc mặt bằng.\nBước 2: Tính toán lợi suất cho thuê ước tính hàng năm (Rental Yield).\nBước 3: Xuất báo cáo tổng hợp dưới định dạng bảng tính Excel.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        label: "Claude Desktop",
        config: JSON.stringify({
          skills: {
            "alonhadat-analytics": {
              cacheMinutes: 60,
              maxResults: 50
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        label: "Antigravity",
        config: JSON.stringify({
          skill: "alonhadat-analytics",
          maxResults: 50
        }, null, 2)
      },
      {
        platform: "cursor",
        label: "Cursor",
        config: JSON.stringify({
          tool: "alonhadat-analytics"
        }, null, 2)
      }
    ]
  },
  {
    id: "chotot-marketplace-c2c-api",
    name: "Chợ Tốt (ChoTot) C2C Marketplace & Auto API",
    sourceUrl: "https://www.chotot.com",
    category: "MCP Server",
    domain: "ecommerce_retail",
    toolType: "MCP Server",
    typeNameVi: "MCP Server",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Carousell Media (Chợ Tốt)",
    stars: 270,
    forks: 54,
    license: "Proprietary",
    summaryVi: "Máy chủ MCP kết nối sàn giao dịch mua bán đồ cũ, xe máy, ô tô Chợ Tốt Xe và phòng trọ Chợ Tốt Nhà hàng đầu Việt Nam.",
    purposeVi: "Cho phép tìm kiếm đồ dùng đã qua sử dụng, định giá xe cũ theo năm sản xuất và số km đã đi, liên hệ người bán trực tiếp mà không qua trung gian.",
    installGuideVi: "Bước 1: Tải về gói máy chủ MCP `@chotot/marketplace-mcp` qua npm.\nBước 2: Điền thông tin mã người dùng và quyền truy cập API Chợ Tốt.\nBước 3: Cấu hình thông số máy chủ trong tệp cài đặt trợ lý AI.\nBước 4: Xác thực kết nối và bắt đầu tìm kiếm sản phẩm mẫu.",
    usageGuideVi: "Bước 1: Gọi lệnh `chotot_find_vehicle` để tìm xe máy tay ga với mức giá dưới 25 triệu đồng.\nBước 2: Định giá ô tô cũ qua công cụ định giá tự động bằng lệnh `chotot_estimate_car_price`.\nBước 3: Lưu tin đăng quan tâm và nhận cảnh báo khi người bán giảm giá sản phẩm.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        label: "Claude Desktop MCP",
        config: JSON.stringify({
          mcpServers: {
            "chotot-marketplace-mcp": {
              command: "npx",
              args: ["-y", "@chotot/marketplace-mcp@latest"],
              env: {
                CHOTOT_AUTH_TOKEN: "YOUR_CHOTOT_TOKEN"
              }
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        label: "Antigravity Workspace",
        config: JSON.stringify({
          name: "chotot-marketplace-mcp",
          command: "npx",
          args: ["-y", "@chotot/marketplace-mcp@latest"],
          env: {
            CHOTOT_AUTH_TOKEN: "YOUR_CHOTOT_TOKEN"
          }
        }, null, 2)
      },
      {
        platform: "cursor",
        label: "Cursor MCP",
        config: JSON.stringify({
          name: "chotot-marketplace-mcp",
          command: "npx @chotot/marketplace-mcp@latest"
        }, null, 2)
      }
    ]
  },
  {
    id: "be-group-ride-hailing-api",
    name: "Be Group Ride Hailing & Delivery Partner API",
    sourceUrl: "https://be.com.vn",
    category: "MCP Server",
    domain: "logistics_transport",
    toolType: "MCP Server",
    typeNameVi: "MCP Server",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Công ty Cổ phần Be Group",
    stars: 285,
    forks: 59,
    license: "Proprietary",
    summaryVi: "Máy chủ MCP tích hợp dịch vụ gọi xe BeBike, BeCar, giao hàng siêu tốc BeDelivery và đặt đồ ăn BeFood dành cho khách hàng doanh nghiệp.",
    purposeVi: "Tự động hóa điều phối xe đưa đón nhân viên, quản lý hạn mức công tác phí đi lại của từng phòng ban và tích hợp dịch vụ giao hàng chặng cuối cho chuỗi cửa hàng bán lẻ.",
    installGuideVi: "Bước 1: Đăng ký tài khoản Be Corporate dành cho khách hàng tổ chức.\nBước 2: Cài đặt gói máy chủ MCP `@begroup/corporate-mcp` qua npm.\nBước 3: Nhập mã doanh nghiệp và khóa bí mật kết nối API.\nBước 4: Khởi động máy chủ và kiểm tra phân bổ hạn mức tín dụng.",
    usageGuideVi: "Bước 1: Gọi xe ô tô đưa đón đối tác qua lệnh `be_book_ride` với điểm đón và điểm đến cụ thể.\nBước 2: Giao hồ sơ tài liệu khẩn cấp bằng lệnh `be_instant_delivery` trong vòng 30 phút.\nBước 3: Xuất hóa đơn VAT điện tử tập trung cuối tháng cho toàn bộ các chuyến đi của doanh nghiệp.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        label: "Claude Desktop MCP",
        config: JSON.stringify({
          mcpServers: {
            "be-corporate-mcp": {
              command: "npx",
              args: ["-y", "@begroup/corporate-mcp@latest"],
              env: {
                BE_CORP_ID: "CORP_BE_VN_001",
                BE_SECRET: "YOUR_BE_SECRET"
              }
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        label: "Antigravity Workspace",
        config: JSON.stringify({
          name: "be-corporate-mcp",
          command: "npx",
          args: ["-y", "@begroup/corporate-mcp@latest"],
          env: {
            BE_CORP_ID: "CORP_BE_VN_001"
          }
        }, null, 2)
      },
      {
        platform: "cursor",
        label: "Cursor MCP",
        config: JSON.stringify({
          name: "be-corporate-mcp",
          command: "npx @begroup/corporate-mcp@latest"
        }, null, 2)
      }
    ]
  },
  {
    id: "xanh-sm-electric-fleet-api",
    name: "Xanh SM (GSM) Electric Taxi & Corporate Fleet API",
    sourceUrl: "https://www.xanhsm.com",
    category: "MCP Server",
    domain: "logistics_transport",
    toolType: "MCP Server",
    typeNameVi: "MCP Server",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Công ty Cổ phần Di chuyển Xanh và Thông minh (GSM)",
    stars: 330,
    forks: 70,
    license: "Proprietary",
    summaryVi: "Máy chủ MCP kết nối đội xe thuần điện VinFast của Xanh SM (Taxi, Luxury, Bike), cung cấp dịch vụ di chuyển không khí thải và giải pháp giao vận xanh cho doanh nghiệp.",
    purposeVi: "Tối ưu hóa chi phí di chuyển xanh cho các công ty đạt chứng chỉ phát triển bền vững ESG, quản lý đặt xe đưa đón sân bay và giao hàng nhanh bằng xe máy điện VinFast Feliz/Evo.",
    installGuideVi: "Bước 1: Mở tài khoản đối tác doanh nghiệp Xanh SM Doanh Nghiệp.\nBước 2: Cài đặt gói máy chủ MCP `@xanhsm/corporate-fleet-mcp` qua npm.\nBước 3: Khai báo thông tin mã hợp đồng doanh nghiệp và khóa bí mật.\nBước 4: Kiểm tra kết nối định vị trạm sạc và đội xe thuần điện khả dụng.",
    usageGuideVi: "Bước 1: Đặt xe taxi điện hạng sang VinFast VF 8 đưa đón chuyên gia qua lệnh `xanhsm_book_luxury`.\nBước 2: Điều phối đội xe máy điện giao nhận bưu phẩm không phát thải CO2.\nBước 3: Nhận báo cáo định lượng lượng phát thải carbon đã được giảm thiểu để đưa vào báo cáo ESG của doanh nghiệp.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        label: "Claude Desktop MCP",
        config: JSON.stringify({
          mcpServers: {
            "xanh-sm-fleet": {
              command: "npx",
              args: ["-y", "@xanhsm/corporate-fleet-mcp@latest"],
              env: {
                XANHSM_CORP_KEY: "YOUR_XANHSM_KEY",
                ENV: "production"
              }
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        label: "Antigravity Workspace",
        config: JSON.stringify({
          name: "xanh-sm-fleet",
          command: "npx",
          args: ["-y", "@xanhsm/corporate-fleet-mcp@latest"],
          env: {
            XANHSM_CORP_KEY: "YOUR_XANHSM_KEY"
          }
        }, null, 2)
      },
      {
        platform: "cursor",
        label: "Cursor MCP",
        config: JSON.stringify({
          name: "xanh-sm-fleet",
          command: "npx @xanhsm/corporate-fleet-mcp@latest"
        }, null, 2)
      }
    ]
  },
  {
    id: "mailisa-spa-booking-connector",
    name: "Mailisa & Beauty Clinic Booking Connector",
    sourceUrl: "https://mailisa.com",
    category: "Skill",
    domain: "business_admin",
    toolType: "Skill",
    typeNameVi: "Skill",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Thẩm mỹ viện Mailisa",
    stars: 145,
    forks: 26,
    license: "Proprietary",
    summaryVi: "Kỹ năng quản lý lịch hẹn thẩm mỹ, chăm sóc da công nghệ cao và tự động hóa hồ sơ khách hàng chuỗi viện thẩm mỹ Mailisa.",
    purposeVi: "Tự động sắp xếp lịch hẹn dịch vụ phun xăm, chăm sóc da theo khung giờ vàng, phân bổ chuyên gia thẩm mỹ và gửi tin nhắn nhắc nhở chăm sóc sau liệu trình.",
    installGuideVi: "Bước 1: Cài đặt gói `mailisa-booking-skill`.\nBước 2: Cung cấp thông số mã chi nhánh thẩm mỹ viện.\nBước 3: Nhúng kỹ năng vào hệ thống tổng đài chăm sóc khách hàng tự động.\nBước 4: Thử nghiệm tạo một lịch hẹn chăm sóc da mẫu.",
    usageGuideVi: "Bước 1: Sử dụng lệnh `mailisa_book_service` với số điện thoại khách hàng, chi nhánh và dịch vụ lựa chọn.\nBước 2: Kiểm tra tình trạng phòng dịch vụ còn trống trong ngày.\nBước 3: Tự động gửi quy trình hướng dẫn kiêng cữ và dưỡng da sau trị liệu qua Zalo ZNS.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        label: "Claude Desktop",
        config: JSON.stringify({
          skills: {
            "mailisa-booking": {
              branchId: "MAILISA_HCM_01",
              apiKey: "YOUR_MAILISA_KEY"
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        label: "Antigravity",
        config: JSON.stringify({
          skill: "mailisa-booking",
          branchId: "MAILISA_HCM_01"
        }, null, 2)
      },
      {
        platform: "cursor",
        label: "Cursor",
        config: JSON.stringify({
          tool: "mailisa-booking"
        }, null, 2)
      }
    ]
  },
  {
    id: "golden-gate-restaurant-loyalty-api",
    name: "Golden Gate Group (GGG) Restaurant Loyalty API",
    sourceUrl: "https://ggg.com.vn",
    category: "MCP Server",
    domain: "ecommerce_retail",
    toolType: "MCP Server",
    typeNameVi: "MCP Server",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Golden Gate Group (The Golden Spoon)",
    stars: 250,
    forks: 48,
    license: "Proprietary",
    summaryVi: "Máy chủ MCP kết nối chuỗi nhà hàng ẩm thực lớn nhất Việt Nam (Kichi-Kichi, Gogi House, Manwah, Ashima, Isushi), đặt bàn trước và tích điểm The Golden Spoon.",
    purposeVi: "Tự động hóa quy trình đặt bàn ăn tiệc gia đình, hội nghị công ty, kiểm tra bàn trống theo giờ và kích hoạt mã giảm giá cho thành viên G-People.",
    installGuideVi: "Bước 1: Đăng ký dịch vụ tích hợp đối tác F&B với ban công nghệ Golden Gate.\nBước 2: Cài đặt gói máy chủ MCP `@ggg/golden-spoon-mcp` qua npm.\nBước 3: Cấu hình mã định danh thương hiệu và thông tin tài khoản đối tác.\nBước 4: Khởi chạy máy chủ và kiểm tra khả năng tra cứu danh sách nhà hàng.",
    usageGuideVi: "Bước 1: Kiểm tra tình trạng bàn tiệc lẩu/nướng qua lệnh `ggg_check_availability` với số lượng khách và thời gian dùng bữa.\nBước 2: Đặt bàn và giữ chỗ trực tuyến qua lệnh `ggg_reserve_table`.\nBước 3: Tra cứu số dư ví điểm thưởng The Golden Spoon và đổi voucher ưu đãi.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        label: "Claude Desktop MCP",
        config: JSON.stringify({
          mcpServers: {
            "golden-gate-mcp": {
              command: "npx",
              args: ["-y", "@ggg/golden-spoon-mcp@latest"],
              env: {
                GGG_PARTNER_KEY: "YOUR_GGG_PARTNER_KEY"
              }
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        label: "Antigravity Workspace",
        config: JSON.stringify({
          name: "golden-gate-mcp",
          command: "npx",
          args: ["-y", "@ggg/golden-spoon-mcp@latest"],
          env: {
            GGG_PARTNER_KEY: "YOUR_GGG_PARTNER_KEY"
          }
        }, null, 2)
      },
      {
        platform: "cursor",
        label: "Cursor MCP",
        config: JSON.stringify({
          name: "golden-gate-mcp",
          command: "npx @ggg/golden-spoon-mcp@latest"
        }, null, 2)
      }
    ]
  },
  {
    id: "redsun-iti-restaurant-crm-api",
    name: "RedSun ITI F&B Table Reservation & CRM Connector",
    sourceUrl: "https://redsun-iti.vn",
    category: "Skill",
    domain: "ecommerce_retail",
    toolType: "Skill",
    typeNameVi: "Skill",
    platforms: ["claude", "antigravity", "cursor"],
    author: "RedSun ITI Corporation",
    stars: 180,
    forks: 34,
    license: "Proprietary",
    summaryVi: "Kỹ năng đặt bàn, quản lý thẻ thành viên và thực đơn điện tử chuỗi ẩm thực RedSun (King BBQ, Seoul Garden, Hotpot Story, ThaiExpress).",
    purposeVi: "Cho phép các trợ lý AI hỗ trợ khách hàng tìm kiếm địa điểm buffet thịt nướng, lẩu thái phù hợp khẩu vị, đặt chỗ trước vào các dịp lễ tết và áp dụng ưu đãi sinh nhật.",
    installGuideVi: "Bước 1: Cài đặt gói thư viện `redsun-crm-skill`.\nBước 2: Cung cấp khóa API truy cập cổng dịch vụ khách hàng RedSun.\nBước 3: Khai báo kỹ năng vào môi trường làm việc của trợ lý thông minh.\nBước 4: Kiểm tra đồng bộ thực đơn các nhà hàng trong hệ thống.",
    usageGuideVi: "Bước 1: Gọi lệnh `redsun_find_restaurant` theo vị trí địa lý của khách hàng.\nBước 2: Đặt bàn tiệc kèm ghi chú yêu cầu bàn ngoài trời hoặc phòng riêng.\nBước 3: Tích lũy điểm tiêu dùng và gửi thông điệp chúc mừng sinh nhật kèm phiếu giảm giá 20%.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        label: "Claude Desktop",
        config: JSON.stringify({
          skills: {
            "redsun-crm": {
              apiKey: "YOUR_REDSUN_API_KEY",
              preferredBrand: "KingBBQ"
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        label: "Antigravity",
        config: JSON.stringify({
          skill: "redsun-crm",
          preferredBrand: "KingBBQ"
        }, null, 2)
      },
      {
        platform: "cursor",
        label: "Cursor",
        config: JSON.stringify({
          tool: "redsun-crm"
        }, null, 2)
      }
    ]
  },
  {
    id: "highlands-coffee-rewards-api",
    name: "Highlands Coffee Customer Rewards & Mobile Order API",
    sourceUrl: "https://www.highlandscoffee.com.vn",
    category: "MCP Server",
    domain: "ecommerce_retail",
    toolType: "MCP Server",
    typeNameVi: "MCP Server",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Highlands Coffee Việt Nam",
    stars: 265,
    forks: 51,
    license: "Proprietary",
    summaryVi: "Máy chủ MCP kết nối chuỗi cà phê lớn nhất Việt Nam, đặt đồ uống Phin sữa đá, Trà sen vàng trước khi đến quầy và tích điểm Highlands Rewards.",
    purposeVi: "Giúp người dùng và nhân viên văn phòng đặt hàng cà phê trước, thanh toán qua ví điện tử, nhận đồ uống nhanh chóng không phải xếp hàng chờ đợi tại giờ cao điểm.",
    installGuideVi: "Bước 1: Tải về gói máy chủ MCP `@highlands/rewards-mcp` qua npm.\nBước 2: Điền thông tin mã tài khoản hội viên hoặc đối tác đặt hàng doanh nghiệp.\nBước 3: Cấu hình cổng kết nối trong tệp thiết lập ứng dụng.\nBước 4: Khởi chạy máy chủ và kiểm tra kết nối với hệ thống POS của Highlands Coffee.",
    usageGuideVi: "Bước 1: Chọn đồ uống, kích cỡ ly và lượng đá, lượng đường qua lệnh `highlands_custom_drink`.\nBước 2: Đặt đồ uống trước tại quán gần nhất qua lệnh `highlands_order_pickup`.\nBước 3: Quét mã nhận đồ uống tại quầy Barista và nhận điểm thưởng hội viên tức thì.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        label: "Claude Desktop MCP",
        config: JSON.stringify({
          mcpServers: {
            "highlands-coffee-mcp": {
              command: "npx",
              args: ["-y", "@highlands/rewards-mcp@latest"],
              env: {
                HIGHLANDS_API_KEY: "YOUR_HIGHLANDS_KEY"
              }
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        label: "Antigravity Workspace",
        config: JSON.stringify({
          name: "highlands-coffee-mcp",
          command: "npx",
          args: ["-y", "@highlands/rewards-mcp@latest"],
          env: {
            HIGHLANDS_API_KEY: "YOUR_HIGHLANDS_KEY"
          }
        }, null, 2)
      },
      {
        platform: "cursor",
        label: "Cursor MCP",
        config: JSON.stringify({
          name: "highlands-coffee-mcp",
          command: "npx @highlands/rewards-mcp@latest"
        }, null, 2)
      }
    ]
  },
  {
    id: "the-coffee-house-delivery-api",
    name: "The Coffee House E-Commerce & Delivery Integration",
    sourceUrl: "https://thecoffeehouse.com",
    category: "Skill",
    domain: "ecommerce_retail",
    toolType: "Skill",
    typeNameVi: "Skill",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Seedcom (The Coffee House)",
    stars: 245,
    forks: 46,
    license: "Proprietary",
    summaryVi: "Kỹ năng đặt giao đồ uống cà phê, bánh ngọt tận nơi, quản lý voucher ưu đãi và hội viên thân thiết The Coffee House.",
    purposeVi: "Cho phép các nhóm làm việc hoặc người tiêu dùng đặt đơn cà phê nhóm (Group Order), tự động chia tiền cước và giao hàng nhanh bảo đảm nhiệt độ đồ uống trong vòng 30 phút.",
    installGuideVi: "Bước 1: Cài đặt gói thư viện `tch-delivery-skill`.\nBước 2: Khai báo thông tin xác thực Seedcom Partner API.\nBước 3: Tích hợp kỹ năng vào nền tảng trợ lý tương tác.\nBước 4: Kiểm tra kết nối với các cửa hàng trong bán kính 5 km.",
    usageGuideVi: "Bước 1: Tạo liên kết đặt đồ uống chung cho văn phòng qua lệnh `tch_create_group_order`.\nBước 2: Áp dụng mã ưu đãi miễn phí vận chuyển cho đơn hàng từ 100.000 đồng.\nBước 3: Theo dõi vị trí tài xế giao hàng trên bản đồ thời gian thực.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        label: "Claude Desktop",
        config: JSON.stringify({
          skills: {
            "tch-delivery": {
              partnerCode: "SEEDCOM_PARTNER_01",
              apiKey: "YOUR_TCH_API_KEY"
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        label: "Antigravity",
        config: JSON.stringify({
          skill: "tch-delivery",
          partnerCode: "SEEDCOM_PARTNER_01"
        }, null, 2)
      },
      {
        platform: "cursor",
        label: "Cursor",
        config: JSON.stringify({
          tool: "tch-delivery"
        }, null, 2)
      }
    ]
  }
];

console.log(`Số lượng công cụ Đợt 9 chuẩn bị nạp: ${batch9Tools.length}`);

// Kiểm tra trùng lặp ID
const existingIds = new Set(currentTools.map(t => t.id));
const duplicates = batch9Tools.filter(t => existingIds.has(t.id));
if (duplicates.length > 0) {
  console.error("Lỗi: Có các ID bị trùng lặp:", duplicates.map(d => d.id));
  process.exit(1);
}

// Kiểm tra quy tắc https:// cho sourceUrl và 4 khối thông tin
for (const tool of batch9Tools) {
  if (!tool.sourceUrl.startsWith('https://')) {
    console.error(`Lỗi: Công cụ ${tool.id} có sourceUrl không bắt đầu bằng https://`);
    process.exit(1);
  }
  if (!tool.purposeVi || !tool.installGuideVi || !tool.usageGuideVi || !tool.summaryVi) {
    console.error(`Lỗi: Công cụ ${tool.id} thiếu các khối thông tin bắt buộc`);
    process.exit(1);
  }
  if (!Array.isArray(tool.configs) || tool.configs.length === 0) {
    console.error(`Lỗi: Công cụ ${tool.id} thiếu cấu hình JSON`);
    process.exit(1);
  }
}

// Bổ sung vào danh sách
const updatedTools = [...currentTools, ...batch9Tools];
fs.writeFileSync(allToolsPath, JSON.stringify(updatedTools, null, 2), 'utf8');

console.log(`Đã nạp thành công! Tổng số công cụ sau khi thêm: ${updatedTools.length}`);
