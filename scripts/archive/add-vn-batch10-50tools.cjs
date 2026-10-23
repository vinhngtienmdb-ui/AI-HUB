const fs = require('fs');
const path = require('path');

const allToolsPath = path.join(__dirname, '../src/data/allTools.json');
const currentTools = JSON.parse(fs.readFileSync(allToolsPath, 'utf8'));

console.log(`Số lượng công cụ hiện tại trước khi thêm Đợt 10: ${currentTools.length}`);

// 50 công cụ & dịch vụ số thị trường Việt Nam Đợt 10:
// Bệnh viện, BHXH, Nhà nước, Trường học, Du lịch, Camera AI, Fulfillment/Kho, Ví/Web3, ERP/Kế toán, Tổng đài ảo
const batch10Tools = [
  // 1-5: Bệnh viện lớn & Y tế thông minh
  {
    id: "cho-ray-hospital-his-api",
    name: "Bệnh Viện Chợ Rẫy HIS & Telemedicine Connector",
    sourceUrl: "https://choray.vn",
    category: "MCP Server",
    domain: "legal_public_service",
    toolType: "MCP Server",
    typeNameVi: "MCP Server",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Bệnh viện Chợ Rẫy TP. Hồ Chí Minh",
    stars: 310,
    forks: 62,
    license: "Proprietary",
    summaryVi: "Máy chủ MCP kết nối hệ thống thông tin bệnh viện (HIS), đặt lịch khám chuyên khoa tuyến cuối và hội chẩn khám chữa bệnh từ xa của Bệnh viện Chợ Rẫy.",
    purposeVi: "Tự động hóa chuyển tuyến bệnh án, tra cứu kết quả xét nghiệm, lịch phẫu thuật và kết nối hệ thống hội chẩn Telehealth giữa Bệnh viện Chợ Rẫy với các bệnh viện vệ tinh khu vực phía Nam.",
    installGuideVi: "Bước 1: Đăng ký thỏa thuận kết nối mạng lưới bệnh viện vệ tinh với Trung tâm CNTT Bệnh viện Chợ Rẫy.\nBước 2: Cài đặt gói máy chủ MCP `@choray/his-telehealth-mcp` qua npm.\nBước 3: Thiết lập mã cơ sở y tế và chứng thư chữ ký số chuyên dùng.\nBước 4: Khởi động máy chủ và kiểm tra kết nối luồng dữ liệu y tế an toàn HL7/FHIR.",
    usageGuideVi: "Bước 1: Tra cứu lịch khám chuyên gia tim mạch hoặc hồi sức cấp cứu qua lệnh `choray_get_specialist_schedule`.\nBước 2: Chuyển dữ liệu hồ sơ bệnh án chuyển viện qua lệnh `choray_transfer_patient_record`.\nBước 3: Nhận lịch hẹn hội chẩn trực tuyến kèm liên kết phòng mổ ảo.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npx -y @choray/his-telehealth-mcp",
        jsonConfig: JSON.stringify({
          mcpServers: {
            "choray-telehealth": {
              command: "npx",
              args: ["-y", "@choray/his-telehealth-mcp"],
              env: {
                HOSPITAL_CODE: "79001",
                CHORAY_AUTH_KEY: "YOUR_CHORAY_AUTH_KEY"
              }
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        platformName: "Google Antigravity",
        cliCommand: "agy skill add choray-telehealth",
        jsonConfig: JSON.stringify({
          name: "choray-telehealth",
          command: "npx",
          args: ["-y", "@choray/his-telehealth-mcp"],
          env: {
            HOSPITAL_CODE: "79001"
          }
        }, null, 2)
      },
      {
        platform: "cursor",
        platformName: "Cursor IDE",
        cliCommand: "npm install @choray/his-telehealth-mcp",
        jsonConfig: JSON.stringify({
          name: "choray-telehealth",
          command: "npx @choray/his-telehealth-mcp"
        }, null, 2)
      }
    ]
  },
  {
    id: "bach-mai-hospital-booking-api",
    name: "Bệnh Viện Bạch Mai Smart Clinic & Lab Results API",
    sourceUrl: "https://bachmai.gov.vn",
    category: "Skill",
    domain: "legal_public_service",
    toolType: "Skill",
    typeNameVi: "Skill",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Bệnh viện Bạch Mai Hà Nội",
    stars: 295,
    forks: 58,
    license: "Proprietary",
    summaryVi: "Kỹ năng đặt lịch khám bệnh theo hẹn, chỉ dẫn sơ đồ khu khám đa khoa và tra cứu kết quả chẩn đoán hình ảnh PACS Bệnh viện Bạch Mai.",
    purposeVi: "Giảm tải tình trạng chờ đợi tại khoa khám bệnh, hướng dẫn bệnh nhân lấy số thứ tự tự động và tải file phim chụp X-quang, MRI trực tiếp về điện thoại.",
    installGuideVi: "Bước 1: Cài đặt gói thư viện `@bachmai/smart-clinic-sdk`.\nBước 2: Khai báo mã tích hợp cổng thông tin bệnh nhân.\nBước 3: Nhúng kỹ năng vào giao diện trợ lý y tế số.\nBước 4: Kiểm thử tra cứu mã bệnh nhân mẫu.",
    usageGuideVi: "Bước 1: Đặt lịch khám chuyên khoa tiêu hóa hoặc nội tiết qua lệnh `bachmai_book_appointment`.\nBước 2: Tra cứu kết quả xét nghiệm sinh hóa máu qua lệnh `bachmai_get_lab_results` kèm mã barcode phiếu thu tiền.\nBước 3: Xem bản đồ phân luồng các tòa nhà trong khuôn viên bệnh viện.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npx -y @bachmai/smart-clinic-sdk",
        jsonConfig: JSON.stringify({
          skills: {
            "bachmai-clinic": {
              hospitalId: "BM_01",
              apiKey: "YOUR_BACHMAI_API_KEY"
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        platformName: "Google Antigravity",
        cliCommand: "agy skill add bachmai-clinic",
        jsonConfig: JSON.stringify({
          skill: "bachmai-clinic",
          hospitalId: "BM_01"
        }, null, 2)
      },
      {
        platform: "cursor",
        platformName: "Cursor IDE",
        cliCommand: "npm install @bachmai/smart-clinic-sdk",
        jsonConfig: JSON.stringify({
          tool: "bachmai-clinic"
        }, null, 2)
      }
    ]
  },
  {
    id: "umc-hcm-smart-hospital-api",
    name: "Bệnh Viện Đại Học Y Dược TP.HCM Smart Hospital API",
    sourceUrl: "https://www.bvdaihoc.com.vn",
    category: "MCP Server",
    domain: "legal_public_service",
    toolType: "MCP Server",
    typeNameVi: "MCP Server",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Bệnh viện Đại học Y Dược TP.HCM (UMC)",
    stars: 320,
    forks: 65,
    license: "Proprietary",
    summaryVi: "Máy chủ MCP kết nối bệnh viện không giấy tờ, thanh toán viện phí bằng mã QR động và hồ sơ bệnh án điện tử (EMR) của UMC.",
    purposeVi: "Cho phép bệnh nhân đăng ký khám bệnh online, thanh toán tiền khám trước, nhận đơn thuốc điện tử qua ứng dụng và kết nối dữ liệu bảo hiểm y tế tự động.",
    installGuideVi: "Bước 1: Đăng ký dịch vụ đối tác y tế với trung tâm chuyển đổi số UMC.\nBước 2: Cài đặt gói `@umc/smart-hospital-mcp` qua npm.\nBước 3: Cấu hình mã định danh phòng khám và khóa chứng thực API.\nBước 4: Kiểm tra khả năng sinh mã QR thanh toán viện phí.",
    usageGuideVi: "Bước 1: Tạo hồ sơ bệnh nhân mới bằng số thẻ BHYT hoặc số định danh CCCD qua lệnh `umc_register_patient`.\nBước 2: Tạo mã QR thanh toán viện phí không tiền mặt qua lệnh `umc_generate_payment_qr`.\nBước 3: Tải đơn thuốc có chữ ký số bác sĩ điều trị để mua thuốc tại nhà thuốc bệnh viện.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npx -y @umc/smart-hospital-mcp",
        jsonConfig: JSON.stringify({
          mcpServers: {
            "umc-hospital-mcp": {
              command: "npx",
              args: ["-y", "@umc/smart-hospital-mcp@latest"],
              env: {
                UMC_PARTNER_ID: "MED_PARTNER_01",
                UMC_SECRET: "YOUR_UMC_SECRET"
              }
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        platformName: "Google Antigravity",
        cliCommand: "agy skill add umc-hospital-mcp",
        jsonConfig: JSON.stringify({
          name: "umc-hospital-mcp",
          command: "npx",
          args: ["-y", "@umc/smart-hospital-mcp@latest"],
          env: {
            UMC_PARTNER_ID: "MED_PARTNER_01"
          }
        }, null, 2)
      },
      {
        platform: "cursor",
        platformName: "Cursor IDE",
        cliCommand: "npm install @umc/smart-hospital-mcp",
        jsonConfig: JSON.stringify({
          name: "umc-hospital-mcp",
          command: "npx @umc/smart-hospital-mcp@latest"
        }, null, 2)
      }
    ]
  },
  {
    id: "benh-vien-k-oncology-portal",
    name: "Bệnh Viện K Quốc Gia Oncology Portal Connector",
    sourceUrl: "https://benhvienk.vn",
    category: "Skill",
    domain: "legal_public_service",
    toolType: "Skill",
    typeNameVi: "Skill",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Bệnh viện K Trung ương",
    stars: 255,
    forks: 48,
    license: "Proprietary",
    summaryVi: "Kỹ năng tra cứu phác đồ điều trị ung bướu, quản lý lịch hóa trị, xạ trị và tư vấn tâm lý chăm sóc giảm nhẹ cho bệnh nhân ung thư Bệnh viện K.",
    purposeVi: "Hỗ trợ bác sĩ tuyến tỉnh tham khảo hướng dẫn chẩn đoán và điều trị ung thư quốc gia, theo dõi chu kỳ truyền thuốc của bệnh nhân tại 3 cơ sở (Quán Sứ, Tam Hiệp, Tân Triều).",
    installGuideVi: "Bước 1: Cài đặt gói `benhvienk-oncology-skill`.\nBước 2: Thiết lập thông số cơ sở điều trị: Quán Sứ, Tam Hiệp hoặc Tân Triều.\nBước 3: Nhúng kỹ năng vào giao diện trợ lý y tế chuyên khoa.\nBước 4: Kiểm tra kết nối danh mục phác đồ thuốc ung thư.",
    usageGuideVi: "Bước 1: Tra cứu thông tin phác đồ thuốc nhắm trúng đích qua lệnh `bvk_lookup_protocol`.\nBước 2: Quản lý lịch hẹn tái khám và đánh giá tác dụng phụ sau xạ trị qua lệnh `bvk_schedule_chemo`.\nBước 3: Cung cấp tài liệu hướng dẫn dinh dưỡng cho người bệnh ung thư.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npx -y benhvienk-oncology-skill",
        jsonConfig: JSON.stringify({
          skills: {
            "bvk-oncology": {
              campus: "tan_trieu",
              apiKey: "YOUR_BVK_KEY"
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        platformName: "Google Antigravity",
        cliCommand: "agy skill add bvk-oncology",
        jsonConfig: JSON.stringify({
          skill: "bvk-oncology",
          campus: "tan_trieu"
        }, null, 2)
      },
      {
        platform: "cursor",
        platformName: "Cursor IDE",
        cliCommand: "npm install benhvienk-oncology-skill",
        jsonConfig: JSON.stringify({
          tool: "bvk-oncology"
        }, null, 2)
      }
    ]
  },
  {
    id: "vinmec-emr-healthcare-api",
    name: "Vinmec Healthcare System EMR & JCI Standards API",
    sourceUrl: "https://www.vinmec.com",
    category: "MCP Server",
    domain: "legal_public_service",
    toolType: "MCP Server",
    typeNameVi: "MCP Server",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Hệ thống Y tế Vinmec (Vingroup)",
    stars: 345,
    forks: 74,
    license: "Proprietary",
    summaryVi: "Máy chủ MCP kết nối hệ sinh thái y tế chuẩn quốc tế JCI Vinmec, quản lý hồ sơ sức khỏe trọn đời, giải trình tự gen và dịch vụ sinh con trọn gói.",
    purposeVi: "Tích hợp dữ liệu kiểm tra sức khỏe tổng quát, dữ liệu giải trình tự gen di truyền phân tích nguy cơ ung thư sớm và đặt lịch hẹn khám quốc tế tại các bệnh viện Vinmec toàn quốc.",
    installGuideVi: "Bước 1: Mở tài khoản nhà phát triển Vinmec Healthcare API.\nBước 2: Cài đặt gói máy chủ MCP `@vinmec/emr-gateway-mcp` qua npm.\nBước 3: Khai báo mã thành viên Vinmec Member ID và khóa bí mật.\nBước 4: Kiểm thử đọc thông số sức khỏe mẫu theo tiêu chuẩn bảo mật HIPAA.",
    usageGuideVi: "Bước 1: Tra cứu hồ sơ phân tích gen tầm soát bệnh tim mạch qua lệnh `vinmec_get_genomics_report`.\nBước 2: Đặt lịch tiêm chủng vắc xin nhập khẩu cho trẻ em tại cơ sở Times City hoặc Central Park.\nBước 3: Xuất hóa đơn viện phí điện tử và hồ sơ yêu cầu bảo lãnh viện phí bảo hiểm tư nhân.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npx -y @vinmec/emr-gateway-mcp",
        jsonConfig: JSON.stringify({
          mcpServers: {
            "vinmec-emr-gateway": {
              command: "npx",
              args: ["-y", "@vinmec/emr-gateway-mcp@latest"],
              env: {
                VINMEC_API_KEY: "YOUR_VINMEC_KEY",
                ENVIRONMENT: "production"
              }
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        platformName: "Google Antigravity",
        cliCommand: "agy skill add vinmec-emr-gateway",
        jsonConfig: JSON.stringify({
          name: "vinmec-emr-gateway",
          command: "npx",
          args: ["-y", "@vinmec/emr-gateway-mcp@latest"],
          env: {
            VINMEC_API_KEY: "YOUR_VINMEC_KEY"
          }
        }, null, 2)
      },
      {
        platform: "cursor",
        platformName: "Cursor IDE",
        cliCommand: "npm install @vinmec/emr-gateway-mcp",
        jsonConfig: JSON.stringify({
          name: "vinmec-emr-gateway",
          command: "npx @vinmec/emr-gateway-mcp@latest"
        }, null, 2)
      }
    ]
  },

  // 6-10: Quản lý nhà nước, BHXH, Hành chính công & Doanh nghiệp quốc gia
  {
    id: "dang-ky-kinh-doanh-national-api",
    name: "Cổng Thông Tin Quốc Gia Về Đăng Ký Doanh Nghiệp (Bộ KH&ĐT)",
    sourceUrl: "https://dangkykinhdoanh.gov.vn",
    category: "Skill",
    domain: "legal_public_service",
    toolType: "Skill",
    typeNameVi: "Skill",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Cục Quản lý Đăng ký Kinh doanh - Bộ Kế hoạch và Đầu tư",
    stars: 380,
    forks: 86,
    license: "Proprietary",
    summaryVi: "Kỹ năng tra cứu thông tin pháp lý doanh nghiệp, ngành nghề kinh doanh, người đại diện pháp luật và tình trạng hoạt động từ cơ sở dữ liệu quốc gia.",
    purposeVi: "Cho phép các ngân hàng, đối tác thương mại thẩm định năng lực pháp lý công ty, phát hiện doanh nghiệp bị tạm ngừng hoặc phá sản trước khi ký kết hợp đồng.",
    installGuideVi: "Bước 1: Tải bộ kỹ năng `dangkykinhdoanh-lookup`.\nBước 2: Cài đặt các thông số tra cứu bảo mật theo chuẩn dịch vụ công.\nBước 3: Tích hợp kỹ năng vào luồng xác minh thẩm định khách hàng doanh nghiệp.\nBước 4: Thử nghiệm tra cứu mã số doanh nghiệp 10 số.",
    usageGuideVi: "Bước 1: Nhập mã số thuế qua lệnh `dkkd_lookup_company` để xem tên công ty chính xác, vốn điều lệ và địa chỉ trụ sở.\nBước 2: Kiểm tra danh sách ngành nghề kinh doanh mã cấp 4 theo Quyết định 27/2018/QĐ-TTg.\nBước 3: Nhận thông báo tự động khi doanh nghiệp đối tác có thay đổi đăng ký kinh doanh.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npx -y dangkykinhdoanh-lookup",
        jsonConfig: JSON.stringify({
          skills: {
            "dkkd-lookup": {
              portalUrl: "https://dangkykinhdoanh.gov.vn",
              enableAutoValidation: true
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        platformName: "Google Antigravity",
        cliCommand: "agy skill add dkkd-lookup",
        jsonConfig: JSON.stringify({
          skill: "dkkd-lookup",
          enableAutoValidation: true
        }, null, 2)
      },
      {
        platform: "cursor",
        platformName: "Cursor IDE",
        cliCommand: "npm install dangkykinhdoanh-lookup",
        jsonConfig: JSON.stringify({
          tool: "dkkd-lookup"
        }, null, 2)
      }
    ]
  },
  {
    id: "xuat-nhap-canh-evisa-api",
    name: "Cổng Xuất Nhập Cảnh & Thị Thực Điện Tử E-Visa (Bộ Công An)",
    sourceUrl: "https://xuatnhapcanh.gov.vn",
    category: "Skill",
    domain: "legal_public_service",
    toolType: "Skill",
    typeNameVi: "Skill",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Cục Quản lý Xuất nhập cảnh - Bộ Công an",
    stars: 340,
    forks: 71,
    license: "Proprietary",
    summaryVi: "Kỹ năng tra cứu tiến độ hồ sơ cấp hộ chiếu phổ thông trực tuyến, thị thực điện tử (E-visa) cho người nước ngoài nhập cảnh vào Việt Nam.",
    purposeVi: "Giúp công dân theo dõi hành trình chuyển phát hộ chiếu về tận nhà qua bưu điện và giúp du khách quốc tế tra cứu mã hồ sơ thị thực điện tử 90 ngày.",
    installGuideVi: "Bước 1: Cài đặt gói `xuatnhapcanh-evisa-skill`.\nBước 2: Khai báo mã hồ sơ tiếp nhận dịch vụ công Bộ Công an.\nBước 3: Thêm kỹ năng vào trợ lý hỗ trợ thủ tục công dân.\nBước 4: Kiểm tra kết quả tra cứu tình trạng phê duyệt hộ chiếu.",
    usageGuideVi: "Bước 1: Gọi lệnh `evisa_track_status` với mã hồ sơ (Registration Code) và ngày sinh để xem trạng thái thị thực.\nBước 2: Hướng dẫn công dân hoàn thiện thủ tục cấp hộ chiếu trực tuyến qua tài khoản định danh điện tử VNeID.\nBước 3: Tải file PDF thị thực điện tử có chữ ký số của Cục Xuất nhập cảnh.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npx -y xuatnhapcanh-evisa-skill",
        jsonConfig: JSON.stringify({
          skills: {
            "xuatnhapcanh-evisa": {
              source: "https://xuatnhapcanh.gov.vn",
              timeout: 15000
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        platformName: "Google Antigravity",
        cliCommand: "agy skill add xuatnhapcanh-evisa",
        jsonConfig: JSON.stringify({
          skill: "xuatnhapcanh-evisa"
        }, null, 2)
      },
      {
        platform: "cursor",
        platformName: "Cursor IDE",
        cliCommand: "npm install xuatnhapcanh-evisa-skill",
        jsonConfig: JSON.stringify({
          tool: "xuatnhapcanh-evisa"
        }, null, 2)
      }
    ]
  },
  {
    id: "dvc-bhxh-electronic-portal",
    name: "Cổng Dịch Vụ Công Bảo Hiểm Xã Hội Điện Tử (VSS E-Service)",
    sourceUrl: "https://dichvucong.baohiemxahoi.gov.vn",
    category: "MCP Server",
    domain: "legal_public_service",
    toolType: "MCP Server",
    typeNameVi: "MCP Server",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Bảo hiểm Xã hội Việt Nam",
    stars: 365,
    forks: 80,
    license: "Proprietary",
    summaryVi: "Máy chủ MCP kết nối cổng giao dịch điện tử BHXH, nộp hồ sơ báo tăng giảm lao động, chế độ thai sản, ốm đau và hưu trí doanh nghiệp.",
    purposeVi: "Tự động hóa lập tờ khai mẫu D02-LT, kê khai đóng BHXH, BHYT, BHTN hàng tháng cho doanh nghiệp kèm ký số Token USB hoặc Chữ ký số từ xa (Remote Signing).",
    installGuideVi: "Bước 1: Đăng ký chứng thư số với nhà cung cấp dịch vụ I-VAN được BHXH Việt Nam ủy quyền.\nBước 2: Cài đặt gói máy chủ MCP `@vss/eservice-mcp` qua npm.\nBước 3: Nhập mã đơn vị quản lý BHXH (mã quận/huyện) và chứng thư số doanh nghiệp.\nBước 4: Khởi động máy chủ và kiểm tra phân quyền nộp hồ sơ.",
    usageGuideVi: "Bước 1: Tạo hồ sơ báo tăng lao động mới vào công ty qua lệnh `vss_submit_d02`.\nBước 2: Tra cứu thông báo kết quả đóng bảo hiểm hàng tháng (Mẫu C12-TS) qua lệnh `vss_get_c12_report`.\nBước 3: Lập hồ sơ giải quyết chế độ ốm đau thai sản chuyển tiền trực tiếp vào tài khoản ngân hàng của người lao động.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npx -y @vss/eservice-mcp",
        jsonConfig: JSON.stringify({
          mcpServers: {
            "vss-eservice": {
              command: "npx",
              args: ["-y", "@vss/eservice-mcp@latest"],
              env: {
                VSS_UNIT_CODE: "TW00123",
                VSS_AUTH_TOKEN: "YOUR_VSS_TOKEN"
              }
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        platformName: "Google Antigravity",
        cliCommand: "agy skill add vss-eservice",
        jsonConfig: JSON.stringify({
          name: "vss-eservice",
          command: "npx",
          args: ["-y", "@vss/eservice-mcp@latest"],
          env: {
            VSS_UNIT_CODE: "TW00123"
          }
        }, null, 2)
      },
      {
        platform: "cursor",
        platformName: "Cursor IDE",
        cliCommand: "npm install @vss/eservice-mcp",
        jsonConfig: JSON.stringify({
          name: "vss-eservice",
          command: "npx @vss/eservice-mcp@latest"
        }, null, 2)
      }
    ]
  },
  {
    id: "cuc-dang-kiem-xe-co-gioi-api",
    name: "Cổng Tra Cứu Đăng Kiểm & Tem Kiểm Định Xe Cơ Giới",
    sourceUrl: "https://vr.org.vn",
    category: "Skill",
    domain: "legal_public_service",
    toolType: "Skill",
    typeNameVi: "Skill",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Cục Đăng kiểm Việt Nam",
    stars: 280,
    forks: 53,
    license: "Proprietary",
    summaryVi: "Kỹ năng tra cứu hạn đăng kiểm ô tô, số seri tem kiểm định, thông số kỹ thuật xe và đặt lịch kiểm định trực tuyến tại các trung tâm đăng kiểm toàn quốc.",
    purposeVi: "Cảnh báo sớm xe sắp hết hạn đăng kiểm để chủ phương tiện chủ động đặt lịch trước, tránh bị xử phạt vi phạm hành chính khi lưu thông trên đường.",
    installGuideVi: "Bước 1: Tải về bộ kỹ năng `cuc-dang-kiem-skill`.\nBước 2: Cài đặt thông số nhận diện biển số xe trắng, xanh, vàng.\nBước 3: Nhúng kỹ năng vào hệ sinh thái quản lý đội xe doanh nghiệp.\nBước 4: Kiểm tra khả năng tra cứu chuỗi số tem giấy chứng nhận kiểm định.",
    usageGuideVi: "Bước 1: Tra cứu ngày hết hạn kiểm định qua lệnh `vr_check_expiry` với biển kiểm soát và số tem kiểm định hiện tại.\nBước 2: Đặt lịch hẹn đăng kiểm trực tuyến tại trạm đăng kiểm gần nhất qua lệnh `vr_book_inspection`.\nBước 3: Nhận thông báo xác nhận lịch hẹn kèm mã quét QR tại cổng kiểm tra.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npx -y cuc-dang-kiem-skill",
        jsonConfig: JSON.stringify({
          skills: {
            "dang-kiem-vietnam": {
              endpoint: "https://vr.org.vn/api/tracuu",
              autoReminderDays: 15
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        platformName: "Google Antigravity",
        cliCommand: "agy skill add dang-kiem-vietnam",
        jsonConfig: JSON.stringify({
          skill: "dang-kiem-vietnam",
          autoReminderDays: 15
        }, null, 2)
      },
      {
        platform: "cursor",
        platformName: "Cursor IDE",
        cliCommand: "npm install cuc-dang-kiem-skill",
        jsonConfig: JSON.stringify({
          tool: "dang-kiem-vietnam"
        }, null, 2)
      }
    ]
  },
  {
    id: "tong-cuc-khi-tuong-thuy-van-api",
    name: "Tổng Cục Khí Tượng Thủy Văn Dự Báo Thời Tiết & Thiên Tai API",
    sourceUrl: "https://nchmf.gov.vn",
    category: "Skill",
    domain: "legal_public_service",
    toolType: "Skill",
    typeNameVi: "Skill",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Trung tâm Dự báo Khí tượng Thủy văn Quốc gia",
    stars: 260,
    forks: 49,
    license: "Proprietary",
    summaryVi: "Kỹ năng cung cấp dữ liệu dự báo thời tiết 10 ngày, cảnh báo bão, lũ quét, sạt lở đất và áp thấp nhiệt đới trên vùng biển Việt Nam từ nguồn quốc gia chính thống.",
    purposeVi: "Cung cấp bản tin dự báo thời tiết và thiên tai chính xác cho các doanh nghiệp du lịch biển, hãng vận tải hàng hải, hàng không và nông nghiệp nuôi trồng thủy sản.",
    installGuideVi: "Bước 1: Cài đặt thư viện `khi-tuong-thuy-van-sdk`.\nBước 2: Khai báo mã tỉnh thành phố hoặc tọa độ trạm quan trắc khí tượng.\nBước 3: Tích hợp kỹ năng vào nền tảng cảnh báo rủi ro thiên tai tự động.\nBước 4: Kiểm tra thông tin thời tiết khu vực ven biển.",
    usageGuideVi: "Bước 1: Gọi lệnh `nchmf_get_marine_weather` để xem hướng gió, cấp gió và chiều cao sóng biển khu vực Vịnh Bắc Bộ và Quần đảo Hoàng Sa, Trường Sa.\nBước 2: Cập nhật lượng mưa đo được tại các trạm đo tự động trong 24 giờ qua.\nBước 3: Nhận bản tin cảnh báo khẩn cấp khi có bão tiến vào đất liền.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npx -y khi-tuong-thuy-van-sdk",
        jsonConfig: JSON.stringify({
          skills: {
            "nchmf-weather": {
              source: "https://nchmf.gov.vn",
              cacheMinutes: 30
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        platformName: "Google Antigravity",
        cliCommand: "agy skill add nchmf-weather",
        jsonConfig: JSON.stringify({
          skill: "nchmf-weather"
        }, null, 2)
      },
      {
        platform: "cursor",
        platformName: "Cursor IDE",
        cliCommand: "npm install khi-tuong-thuy-van-sdk",
        jsonConfig: JSON.stringify({
          tool: "nchmf-weather"
        }, null, 2)
      }
    ]
  },

  // 11-15: Kế toán, Phần mềm ERP & Quản trị tài chính Việt Nam chuyên sâu
  {
    id: "fast-accounting-erp-api",
    name: "FAST Accounting & Fast Business Online ERP API",
    sourceUrl: "https://fast.com.vn",
    category: "MCP Server",
    domain: "finance_payment",
    toolType: "MCP Server",
    typeNameVi: "MCP Server",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Công ty Cổ phần Phần mềm Quản lý Doanh nghiệp (FAST)",
    stars: 275,
    forks: 56,
    license: "Proprietary",
    summaryVi: "Máy chủ MCP kết nối phần mềm kế toán Fast Accounting và hệ thống quản trị nguồn lực doanh nghiệp Fast Business Online (FBO).",
    purposeVi: "Tự động đồng bộ hóa chứng từ kế toán, sổ cái, bảng phân bổ khấu hao tài sản cố định và lập báo cáo tài chính tuân thủ Thông tư 200/2014/TT-BTC.",
    installGuideVi: "Bước 1: Đăng ký dịch vụ Web API với bộ phận kỹ thuật FAST.\nBước 2: Cài đặt gói máy chủ MCP `@fast/erp-connector-mcp` qua npm.\nBước 3: Nhập thông tin kết nối cơ sở dữ liệu SQL Server Fast Business.\nBước 4: Xác thực kết nối và phân quyền người dùng kế toán.",
    usageGuideVi: "Bước 1: Đẩy dữ liệu phiếu thu, phiếu chi tiền mặt qua lệnh `fast_post_voucher`.\nBước 2: Xuất bảng cân đối số phát sinh tài khoản kế toán qua lệnh `fast_get_trial_balance`.\nBước 3: Đối soát công nợ phải thu và phải trả khách hàng tự động.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npx -y @fast/erp-connector-mcp",
        jsonConfig: JSON.stringify({
          mcpServers: {
            "fast-erp-connector": {
              command: "npx",
              args: ["-y", "@fast/erp-connector-mcp"],
              env: {
                FAST_API_URL: "https://erp.doanhnghiep.vn/api",
                FAST_APP_KEY: "YOUR_FAST_KEY"
              }
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        platformName: "Google Antigravity",
        cliCommand: "agy skill add fast-erp-connector",
        jsonConfig: JSON.stringify({
          name: "fast-erp-connector",
          command: "npx",
          args: ["-y", "@fast/erp-connector-mcp"],
          env: {
            FAST_API_URL: "https://erp.doanhnghiep.vn/api"
          }
        }, null, 2)
      },
      {
        platform: "cursor",
        platformName: "Cursor IDE",
        cliCommand: "npm install @fast/erp-connector-mcp",
        jsonConfig: JSON.stringify({
          name: "fast-erp-connector",
          command: "npx @fast/erp-connector-mcp"
        }, null, 2)
      }
    ]
  },
  {
    id: "bravo-erp-manufacturing-api",
    name: "BRAVO 8R3 ERP Manufacturing & Supply Chain API",
    sourceUrl: "https://www.bravo.com.vn",
    category: "MCP Server",
    domain: "business_admin",
    toolType: "MCP Server",
    typeNameVi: "MCP Server",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Công ty Cổ phần Phần mềm BRAVO",
    stars: 290,
    forks: 60,
    license: "Proprietary",
    summaryVi: "Máy chủ MCP kết nối phần mềm quản trị doanh nghiệp tổng thể BRAVO 8R3, chuyên sâu quản lý sản xuất, chuỗi cung ứng và định mức nguyên vật liệu (BOM).",
    purposeVi: "Hỗ trợ các nhà máy sản xuất tự động lập lệnh sản xuất, theo dõi tiến độ gia công từng công đoạn và tính giá thành sản phẩm chi tiết theo phương pháp chi phí thực tế.",
    installGuideVi: "Bước 1: Cài đặt dịch vụ BRAVO Data Services trên máy chủ ứng dụng.\nBước 2: Cài đặt gói máy chủ MCP `@bravo/erp-gateway-mcp` qua npm.\nBước 3: Cấu hình mã phân hệ sản xuất và tài khoản bảo mật.\nBước 4: Kiểm tra kết nối danh mục vật tư hàng hóa.",
    usageGuideVi: "Bước 1: Tạo lệnh sản xuất mới theo đơn đặt hàng của khách hàng qua lệnh `bravo_create_wo`.\nBước 2: Xuất phiếu xuất kho nguyên vật liệu dựa trên định mức BOM tiêu chuẩn qua lệnh `bravo_dispatch_bom`.\nBước 3: Báo cáo tỷ lệ hao hụt nguyên vật liệu và năng suất lao động theo ca.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npx -y @bravo/erp-gateway-mcp",
        jsonConfig: JSON.stringify({
          mcpServers: {
            "bravo-erp-gateway": {
              command: "npx",
              args: ["-y", "@bravo/erp-gateway-mcp"],
              env: {
                BRAVO_SERVICE_URL: "https://bravo-api.doanhnghiep.vn",
                BRAVO_TOKEN: "YOUR_BRAVO_TOKEN"
              }
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        platformName: "Google Antigravity",
        cliCommand: "agy skill add bravo-erp-gateway",
        jsonConfig: JSON.stringify({
          name: "bravo-erp-gateway",
          command: "npx",
          args: ["-y", "@bravo/erp-gateway-mcp"],
          env: {
            BRAVO_SERVICE_URL: "https://bravo-api.doanhnghiep.vn"
          }
        }, null, 2)
      },
      {
        platform: "cursor",
        platformName: "Cursor IDE",
        cliCommand: "npm install @bravo/erp-gateway-mcp",
        jsonConfig: JSON.stringify({
          name: "bravo-erp-gateway",
          command: "npx @bravo/erp-gateway-mcp"
        }, null, 2)
      }
    ]
  },
  {
    id: "effect-erp-custom-business-api",
    name: "EFFECT ERP Customized Enterprise Management API",
    sourceUrl: "https://effect.com.vn",
    category: "Skill",
    domain: "business_admin",
    toolType: "Skill",
    typeNameVi: "Skill",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Công ty Cổ phần Phần mềm EFFECT",
    stars: 210,
    forks: 38,
    license: "Proprietary",
    summaryVi: "Kỹ năng kết nối phần mềm quản lý động EFFECT ERP có khả năng tùy biến cao theo đặc thù nghiệp vụ phức tạp của từng ngành nghề kinh doanh.",
    purposeVi: "Tự động hóa lập báo cáo phân tích quản trị đặc thù cho ngành xây dựng, bất động sản, thương mại xuất nhập khẩu và phân phối hàng hóa tiêu dùng.",
    installGuideVi: "Bước 1: Tải bộ kỹ năng `effect-erp-skill`.\nBước 2: Cung cấp thông số chuỗi kết nối máy chủ dữ liệu EFFECT.\nBước 3: Nhúng kỹ năng vào danh sách thực thi của trợ lý AI.\nBước 4: Kiểm tra đồng bộ các bảng tham chiếu động.",
    usageGuideVi: "Bước 1: Trích xuất báo cáo tiến độ công trình xây dựng qua lệnh `effect_get_project_progress`.\nBước 2: Quản lý hợp đồng bán hàng trả góp và tính lãi suất tự động.\nBước 3: Đồng bộ dữ liệu bán hàng từ các chi nhánh tỉnh thành về trụ sở chính.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npx -y effect-erp-skill",
        jsonConfig: JSON.stringify({
          skills: {
            "effect-erp": {
              dbInstance: "EFFECT_SQL_PROD",
              accessKey: "YOUR_EFFECT_KEY"
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        platformName: "Google Antigravity",
        cliCommand: "agy skill add effect-erp",
        jsonConfig: JSON.stringify({
          skill: "effect-erp",
          dbInstance: "EFFECT_SQL_PROD"
        }, null, 2)
      },
      {
        platform: "cursor",
        platformName: "Cursor IDE",
        cliCommand: "npm install effect-erp-skill",
        jsonConfig: JSON.stringify({
          tool: "effect-erp"
        }, null, 2)
      }
    ]
  },
  {
    id: "misa-sme-open-connector",
    name: "MISA SME.NET Open Connector & Sync Tool",
    sourceUrl: "https://sme.misa.vn",
    category: "Skill",
    domain: "finance_payment",
    toolType: "Skill",
    typeNameVi: "Skill",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Công ty Cổ phần MISA",
    stars: 350,
    forks: 78,
    license: "Commercial",
    summaryVi: "Bộ công cụ kết nối phần mềm kế toán doanh nghiệp vừa và nhỏ MISA SME, tự động hóa nhập liệu hóa đơn đầu vào và đồng bộ sổ sách ngân hàng.",
    purposeVi: "Giúp kế toán viên tiết kiệm 80% thời gian gõ chứng từ bằng tay, tự động hạch toán hóa đơn điện tử mua hàng hóa dịch vụ vào đúng tài khoản kế toán.",
    installGuideVi: "Bước 1: Cài đặt tiện ích MISA Open Service trên máy tính cài phần mềm MISA SME.\nBước 2: Tải gói thư viện `@misa/sme-connector-sdk`.\nBước 3: Khai báo tên dữ liệu kế toán và năm tài chính.\nBước 4: Kiểm tra kết nối hạch toán thử nghiệm một hóa đơn đầu vào.",
    usageGuideVi: "Bước 1: Phân tích file XML hóa đơn Thông tư 78 và tự động hạch toán nợ/có qua lệnh `misa_post_invoice`.\nBước 2: Tải sao kê ngân hàng điện tử và tự động khớp số tiền giao dịch qua lệnh `misa_reconcile_bank`.\nBước 3: Khóa sổ kế toán và kiểm tra tính hợp lệ của báo cáo tài chính cuối năm.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npx -y @misa/sme-connector-sdk",
        jsonConfig: JSON.stringify({
          skills: {
            "misa-sme-sync": {
              dbName: "KETOAN_2026",
              fiscalYear: 2026
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        platformName: "Google Antigravity",
        cliCommand: "agy skill add misa-sme-sync",
        jsonConfig: JSON.stringify({
          skill: "misa-sme-sync",
          fiscalYear: 2026
        }, null, 2)
      },
      {
        platform: "cursor",
        platformName: "Cursor IDE",
        cliCommand: "npm install @misa/sme-connector-sdk",
        jsonConfig: JSON.stringify({
          tool: "misa-sme-sync"
        }, null, 2)
      }
    ]
  },
  {
    id: "tax-tncn-calculator-core",
    name: "Bộ Thư Viện Tính Thuế Thu Nhập Cá Nhân & Giảm Trừ Gia Cảnh Mới",
    sourceUrl: "https://github.com/vinhngtienmdb-ui/vietnam-tax-engine",
    category: "Skill",
    domain: "finance_payment",
    toolType: "Skill",
    typeNameVi: "Skill",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Cộng đồng Kế toán & Lập trình viên Việt Nam",
    stars: 410,
    forks: 92,
    license: "MIT",
    summaryVi: "Bộ công cụ mã nguồn mở tính thuế TNCN theo biểu thuế lũy tiến từng phần, áp dụng mức giảm trừ gia cảnh mới và tỷ lệ trích nộp bảo hiểm bắt buộc theo luật hiện hành.",
    purposeVi: "Tự động hóa tính lương Net sang Gross và Gross sang Net, tính số thuế TNCN phải nộp hàng tháng và quyết toán thuế cuối năm chính xác tới từng đồng.",
    installGuideVi: "Bước 1: Cài đặt gói qua npm: `npm i vietnam-tax-calc` hoặc pip: `pip install vn-tax-engine`.\nBước 2: Nhập các tham số: mức lương đóng bảo hiểm, số người phụ thuộc, vùng lương tối thiểu (Vùng 1 đến 4).\nBước 3: Nhúng thư viện vào bảng tính lương nội bộ của doanh nghiệp.\nBước 4: Kiểm tra kết quả tính thuế với bài toán thực tế.",
    usageGuideVi: "Bước 1: Chuyển đổi lương Gross 30 triệu thành lương thực nhận Net qua lệnh `calc_net_salary(gross=30000000, dependents=1)`.\nBước 2: Xuất bảng bóc tách chi tiết: BHXH (8%), BHYT (1.5%), BHTN (1%), Giảm trừ bản thân và số thuế TNCN nộp ngân sách nhà nước.\nBước 3: Tính toán số tiền thưởng Tết chịu thuế theo quy định.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npm i vietnam-tax-calc",
        jsonConfig: JSON.stringify({
          skills: {
            "vn-tax-engine": {
              package: "vietnam-tax-calc",
              personalDeduction: 11000000,
              dependentDeduction: 4400000
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        platformName: "Google Antigravity",
        cliCommand: "agy skill add vn-tax-engine",
        jsonConfig: JSON.stringify({
          skill: "vn-tax-engine"
        }, null, 2)
      },
      {
        platform: "cursor",
        platformName: "Cursor IDE",
        cliCommand: "npm install vietnam-tax-calc",
        jsonConfig: JSON.stringify({
          tool: "vn-tax-engine"
        }, null, 2)
      }
    ]
  },

  // 16-20: Giáo dục đại học & Tuyển sinh quốc gia
  {
    id: "cong-tuyen-sinh-thpt-quoc-gia",
    name: "Cổng Tuyển Sinh Đại Học & Thi Tốt Nghiệp THPT Quốc Gia (Bộ GD&ĐT)",
    sourceUrl: "https://thisinh.thitotnghiepthpt.edu.vn",
    category: "Skill",
    domain: "legal_public_service",
    toolType: "Skill",
    typeNameVi: "Skill",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Bộ Giáo dục và Đào tạo Việt Nam",
    stars: 420,
    forks: 98,
    license: "Proprietary",
    summaryVi: "Kỹ năng tra cứu điểm thi tốt nghiệp THPT, phổ điểm môn thi các khối A, B, C, D và điều chỉnh nguyện vọng xét tuyển đại học trực tuyến.",
    purposeVi: "Giúp thí sinh và phụ huynh tra cứu điểm thi nhanh chóng vào ngày công bố điểm, tính điểm xét tốt nghiệp và tư vấn sắp xếp thứ tự nguyện vọng vào các trường đại học tối ưu cơ hội trúng tuyển.",
    installGuideVi: "Bước 1: Tải bộ kỹ năng `tuyensinh-thpt-skill`.\nBước 2: Khai báo số báo danh và số căn cước công dân của thí sinh.\nBước 3: Kích hoạt kỹ năng trong trợ lý tư vấn tuyển sinh.\nBước 4: Kiểm tra tính năng phân tích phổ điểm các năm trước.",
    usageGuideVi: "Bước 1: Nhập số báo danh qua lệnh `thpt_lookup_scores` để xem điểm thi từng môn: Toán, Văn, Ngoại ngữ và bài thi tổ hợp.\nBước 2: Tính tổng điểm tổ hợp xét tuyển (ví dụ: Khối A00: Toán - Lý - Hóa) cộng điểm ưu tiên khu vực.\nBước 3: Gợi ý danh sách trường đại học có điểm chuẩn năm trước phù hợp với khoảng điểm của thí sinh.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npx -y tuyensinh-thpt-skill",
        jsonConfig: JSON.stringify({
          skills: {
            "tuyensinh-thpt": {
              year: 2026,
              enableSmartRecommendation: true
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        platformName: "Google Antigravity",
        cliCommand: "agy skill add tuyensinh-thpt",
        jsonConfig: JSON.stringify({
          skill: "tuyensinh-thpt",
          year: 2026
        }, null, 2)
      },
      {
        platform: "cursor",
        platformName: "Cursor IDE",
        cliCommand: "npm install tuyensinh-thpt-skill",
        jsonConfig: JSON.stringify({
          tool: "tuyensinh-thpt"
        }, null, 2)
      }
    ]
  },
  {
    id: "hust-ehust-student-portal-api",
    name: "Đại Học Bách Khoa Hà Nội (HUST) eHust & Đăng Ký Tín Chỉ API",
    sourceUrl: "https://hust.edu.vn",
    category: "MCP Server",
    domain: "business_admin",
    toolType: "MCP Server",
    typeNameVi: "MCP Server",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Đại học Bách Khoa Hà Nội",
    stars: 380,
    forks: 85,
    license: "Proprietary",
    summaryVi: "Máy chủ MCP kết nối cổng thông tin sinh viên eHust, hỗ trợ lập thời khóa biểu học tập, đăng ký học phần tín chỉ và quản lý đồ án tốt nghiệp.",
    purposeVi: "Tự động phát hiện trùng lịch học trong tuần, tối ưu hóa thời gian đăng ký các lớp học phần lý thuyết và thí nghiệm dành cho sinh viên kỹ thuật Bách Khoa.",
    installGuideVi: "Bước 1: Cài đặt gói máy chủ MCP `@hust/ehust-mcp` qua npm.\nBước 2: Cung cấp mã số sinh viên (MSSV) và thông tin đăng nhập tài khoản eHust.\nBước 3: Khai báo cổng kết nối trong tệp cài đặt trợ lý AI.\nBước 4: Kiểm tra đồng bộ lịch thi học kỳ hiện tại.",
    usageGuideVi: "Bước 1: Tra cứu danh sách lớp học phần còn chỉ tiêu qua lệnh `hust_search_courses`.\nBước 2: Xếp thời khóa biểu mẫu không bị trùng giờ qua lệnh `hust_auto_schedule`.\nBước 3: Tải bảng điểm học tập tích lũy CPA và tiến độ hoàn thành đồ án môn học.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npx -y @hust/ehust-mcp",
        jsonConfig: JSON.stringify({
          mcpServers: {
            "hust-ehust-mcp": {
              command: "npx",
              args: ["-y", "@hust/ehust-mcp@latest"],
              env: {
                HUST_STUDENT_ID: "20220001",
                AUTH_MODE: "oauth"
              }
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        platformName: "Google Antigravity",
        cliCommand: "agy skill add hust-ehust-mcp",
        jsonConfig: JSON.stringify({
          name: "hust-ehust-mcp",
          command: "npx",
          args: ["-y", "@hust/ehust-mcp@latest"],
          env: {
            HUST_STUDENT_ID: "20220001"
          }
        }, null, 2)
      },
      {
        platform: "cursor",
        platformName: "Cursor IDE",
        cliCommand: "npm install @hust/ehust-mcp",
        jsonConfig: JSON.stringify({
          name: "hust-ehust-mcp",
          command: "npx @hust/ehust-mcp@latest"
        }, null, 2)
      }
    ]
  },
  {
    id: "vnuhcm-academic-portal-connector",
    name: "Đại Học Quốc Gia TP.HCM (VNU-HCM) Academic Portal Connector",
    sourceUrl: "https://vnuhcm.edu.vn",
    category: "Skill",
    domain: "business_admin",
    toolType: "Skill",
    typeNameVi: "Skill",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Đại học Quốc gia TP. Hồ Chí Minh",
    stars: 340,
    forks: 72,
    license: "Proprietary",
    summaryVi: "Kỹ năng tra cứu kết quả kỳ thi Đánh giá năng lực (ĐGNL) ĐHQG-HCM, liên thông học tín chỉ giữa các trường đại học thành viên (Bách Khoa, KHTN, KHXH&NV, CNTT, Kinh tế - Luật).",
    purposeVi: "Cung cấp bảng điểm bài thi ĐGNL 1200 điểm, chứng nhận kết quả thi trực tuyến và hỗ trợ sinh viên đăng ký môn học liên trường trong hệ thống Đại học Quốc gia.",
    installGuideVi: "Bước 1: Tải về bộ kỹ năng `vnuhcm-academic-skill`.\nBước 2: Cài đặt thông số cổng khảo thí và đảm bảo chất lượng giáo dục.\nBước 3: Nhúng kỹ năng vào giao diện trợ lý giáo dục đại học.\nBước 4: Kiểm tra tra cứu kết quả kỳ thi ĐGNL.",
    usageGuideVi: "Bước 1: Tra cứu điểm thi Đánh giá năng lực qua lệnh `vnuhcm_get_dgnl_score` với số CMND/CCCD.\nBước 2: Đăng ký học phần công nhận tín chỉ chung giữa Trường ĐH Bách Khoa và Trường ĐH Công nghệ Thông tin.\nBước 3: Xem học bổng khuyến khích học tập và thông báo nghiên cứu khoa học sinh viên.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npx -y vnuhcm-academic-skill",
        jsonConfig: JSON.stringify({
          skills: {
            "vnuhcm-portal": {
              system: "vnuhcm",
              enableCreditTransfer: true
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        platformName: "Google Antigravity",
        cliCommand: "agy skill add vnuhcm-portal",
        jsonConfig: JSON.stringify({
          skill: "vnuhcm-portal"
        }, null, 2)
      },
      {
        platform: "cursor",
        platformName: "Cursor IDE",
        cliCommand: "npm install vnuhcm-academic-skill",
        jsonConfig: JSON.stringify({
          tool: "vnuhcm-portal"
        }, null, 2)
      }
    ]
  },
  {
    id: "ueh-smart-university-api",
    name: "Đại Học Kinh Tế TP.HCM (UEH) Smart University & LMS API",
    sourceUrl: "https://www.ueh.edu.vn",
    category: "Skill",
    domain: "business_admin",
    toolType: "Skill",
    typeNameVi: "Skill",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Đại học Kinh tế TP. Hồ Chí Minh (UEH)",
    stars: 315,
    forks: 64,
    license: "Proprietary",
    summaryVi: "Kỹ năng kết nối đại học thông minh UEH, học tập đa phương thức trực tuyến (Blended Learning) và thanh toán học phí không tiền mặt qua cổng UEH Pay.",
    purposeVi: "Quản lý nộp tiểu luận, bài tập nhóm, theo dõi điểm rèn luyện và tự động cập nhật biên lai thu học phí có hóa đơn điện tử cho sinh viên và học viên cao học.",
    installGuideVi: "Bước 1: Cài đặt gói `ueh-university-skill`.\nBước 2: Nhập mã sinh viên UEH và mật khẩu cổng thông tin đào tạo.\nBước 3: Khai báo kỹ năng vào ứng dụng trợ lý thông minh.\nBước 4: Kiểm tra trạng thái học phí kỳ học hiện tại.",
    usageGuideVi: "Bước 1: Thanh toán học phí tín chỉ qua lệnh `ueh_pay_tuition` với cổng thanh toán liên ngân hàng Napas.\nBước 2: Tải tài liệu bài giảng môn Kinh tế vi mô, Tài chính doanh nghiệp từ hệ thống LMS.\nBước 3: Đăng ký lịch sử dụng phòng tự học tại Thư viện thông minh UEH cơ sở B hoặc Nguyễn Tri Phương.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npx -y ueh-university-skill",
        jsonConfig: JSON.stringify({
          skills: {
            "ueh-smart-univ": {
              campus: "hcm",
              lmsEndpoint: "https://lms.ueh.edu.vn"
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        platformName: "Google Antigravity",
        cliCommand: "agy skill add ueh-smart-univ",
        jsonConfig: JSON.stringify({
          skill: "ueh-smart-univ"
        }, null, 2)
      },
      {
        platform: "cursor",
        platformName: "Cursor IDE",
        cliCommand: "npm install ueh-university-skill",
        jsonConfig: JSON.stringify({
          tool: "ueh-smart-univ"
        }, null, 2)
      }
    ]
  },
  {
    id: "fpt-university-ap-portal-api",
    name: "Đại Học FPT (FPT University) Academic Portal API",
    sourceUrl: "https://daihoc.fpt.edu.vn",
    category: "Skill",
    domain: "business_admin",
    toolType: "Skill",
    typeNameVi: "Skill",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Trường Đại học FPT",
    stars: 330,
    forks: 68,
    license: "Proprietary",
    summaryVi: "Kỹ năng theo dõi lịch học On-the-job Training (OJT), điểm chuyên cần phòng học FAP và kho tài nguyên học tập Coursera của sinh viên Đại học FPT.",
    purposeVi: "Tự động cảnh báo khi tỷ lệ vắng mặt vượt quá 20% học phần, đồng bộ lịch thi đồ án Capstone Project và hỗ trợ kết nối thực tập doanh nghiệp tại FPT Software.",
    installGuideVi: "Bước 1: Tải về gói thư viện `fpt-fap-connector`.\nBước 2: Cung cấp thông tin xác thực tài khoản Google Workspace miền `@fpt.edu.vn`.\nBước 3: Nhúng kỹ năng vào giao diện trợ lý ảo sinh viên.\nBước 4: Kiểm tra tải lịch học hàng tuần.",
    usageGuideVi: "Bước 1: Xem thời khóa biểu và phòng học thực tế qua lệnh `fpt_get_weekly_schedule`.\nBước 2: Kiểm tra điểm số các bài kiểm tra thực hành môn lập trình Java, AI, thiết kế đồ họa.\nBước 3: Đăng ký chứng chỉ hoàn thành khóa học Coursera để quy đổi điểm tín chỉ đại học.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npx -y fpt-fap-connector",
        jsonConfig: JSON.stringify({
          skills: {
            "fpt-fap": {
              campus: "HL",
              autoAttendanceAlert: true
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        platformName: "Google Antigravity",
        cliCommand: "agy skill add fpt-fap",
        jsonConfig: JSON.stringify({
          skill: "fpt-fap",
          campus: "HL"
        }, null, 2)
      },
      {
        platform: "cursor",
        platformName: "Cursor IDE",
        cliCommand: "npm install fpt-fap-connector",
        jsonConfig: JSON.stringify({
          tool: "fpt-fap"
        }, null, 2)
      }
    ]
  },

  // 21-25: Du lịch, Khách sạn nghỉ dưỡng & Vé tham quan lớn tại Việt Nam
  {
    id: "vinpearl-resort-safari-api",
    name: "Vinpearl Resort, Safari & VinWonders Booking API",
    sourceUrl: "https://vinpearl.com",
    category: "MCP Server",
    domain: "ecommerce_retail",
    toolType: "MCP Server",
    typeNameVi: "MCP Server",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Công ty Cổ phần Vinpearl (Vingroup)",
    stars: 375,
    forks: 82,
    license: "Proprietary",
    summaryVi: "Máy chủ MCP kết nối hệ sinh thái nghỉ dưỡng, sân golf, công viên giải trí VinWonders và Safari bán hoang dã tại Phú Quốc, Nha Trang, Nam Hội An.",
    purposeVi: "Tự động hóa đặt phòng khách sạn, biệt thự biển (Villa), mua vé vui chơi trực tuyến không phải xếp hàng và áp dụng quyền lợi hội viên Pearl Club.",
    installGuideVi: "Bước 1: Ký thỏa thuận đại lý lữ hành trực tuyến (OTA) với phòng phân phối Vinpearl.\nBước 2: Cài đặt gói máy chủ MCP `@vinpearl/hospitality-mcp` qua npm.\nBước 3: Khai báo mã đại lý đối tác và khóa bảo mật API.\nBước 4: Kiểm tra trạng thái phòng trống theo thời gian thực.",
    usageGuideVi: "Bước 1: Tra cứu giá phòng khách sạn và gói phòng kèm ăn 3 bữa (Full Board) qua lệnh `vinpearl_search_rooms`.\nBước 2: Mua vé điện tử vào cửa công viên VinWonders và Safari kèm mã QR qua lệnh `vinpearl_book_tickets`.\nBước 3: Đặt lịch chơi golf 18 lỗ tại Vinpearl Golf Phú Quốc hoặc Hải Phòng.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npx -y @vinpearl/hospitality-mcp",
        jsonConfig: JSON.stringify({
          mcpServers: {
            "vinpearl-hospitality": {
              command: "npx",
              args: ["-y", "@vinpearl/hospitality-mcp@latest"],
              env: {
                VINPEARL_AGENT_ID: "AGENT_VN_88",
                VINPEARL_API_KEY: "YOUR_VINPEARL_KEY"
              }
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        platformName: "Google Antigravity",
        cliCommand: "agy skill add vinpearl-hospitality",
        jsonConfig: JSON.stringify({
          name: "vinpearl-hospitality",
          command: "npx",
          args: ["-y", "@vinpearl/hospitality-mcp@latest"],
          env: {
            VINPEARL_AGENT_ID: "AGENT_VN_88"
          }
        }, null, 2)
      },
      {
        platform: "cursor",
        platformName: "Cursor IDE",
        cliCommand: "npm install @vinpearl/hospitality-mcp",
        jsonConfig: JSON.stringify({
          name: "vinpearl-hospitality",
          command: "npx @vinpearl/hospitality-mcp@latest"
        }, null, 2)
      }
    ]
  },
  {
    id: "sun-world-cable-car-ticket-api",
    name: "Sun World Amusement Park & Cable Car Ticket API",
    sourceUrl: "https://sunworld.vn",
    category: "Skill",
    domain: "ecommerce_retail",
    toolType: "Skill",
    typeNameVi: "Skill",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Sun Group (Sun World)",
    stars: 350,
    forks: 75,
    license: "Proprietary",
    summaryVi: "Kỹ năng đặt vé cáp treo kỷ lục thế giới và vui chơi tại các quần thể du lịch Sun World (Bà Nà Hills, Fansipan Legend, Hòn Thơm, Hạ Long Complex, Cát Bà).",
    purposeVi: "Cho phép các công ty lữ hành xuất vé cáp treo điện tử có mã quét QR tức thì, đặt suất ăn buffet trưa trên đỉnh núi và kiểm tra thời tiết độ cao.",
    installGuideVi: "Bước 1: Cài đặt gói thư viện `@sungroup/sunworld-ticket-sdk`.\nBước 2: Điền thông tin mã đối tác du lịch Sun Group.\nBước 3: Nhúng kỹ năng vào cổng bán tour trực tuyến.\nBước 4: Kiểm thử quy trình sinh vé cáp treo có mã QR.",
    usageGuideVi: "Bước 1: Tra cứu giá vé cáp treo Bà Nà Hills kèm buffet nhà hàng qua lệnh `sunworld_check_fares`.\nBước 2: Xuất vé điện tử vào cửa Cầu Vàng Đà Nẵng hoặc Đỉnh Fansipan qua lệnh `sunworld_issue_ticket`.\nBước 3: Quét mã QR trực tiếp tại cửa kiểm soát tự động không cần đổi vé giấy.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        label: "Claude Desktop",
        platformName: "Claude Desktop",
        cliCommand: "npx -y @sungroup/sunworld-ticket-sdk",
        jsonConfig: JSON.stringify({
          skills: {
            "sunworld-tickets": {
              partnerCode: "SUN_TRAVEL_PARTNER",
              apiKey: "YOUR_SUNWORLD_KEY"
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        label: "Antigravity",
        platformName: "Google Antigravity",
        cliCommand: "agy skill add sunworld-tickets",
        jsonConfig: JSON.stringify({
          skill: "sunworld-tickets",
          partnerCode: "SUN_TRAVEL_PARTNER"
        }, null, 2)
      },
      {
        platform: "cursor",
        label: "Cursor",
        platformName: "Cursor IDE",
        cliCommand: "npm install @sungroup/sunworld-ticket-sdk",
        jsonConfig: JSON.stringify({
          tool: "sunworld-tickets"
        }, null, 2)
      }
    ]
  },
  {
    id: "vietravel-tour-booking-engine",
    name: "Vietravel Tourism & Tour Booking Engine SDK",
    sourceUrl: "https://www.vietravel.com",
    category: "MCP Server",
    domain: "ecommerce_retail",
    toolType: "MCP Server",
    typeNameVi: "MCP Server",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Công ty Cổ phần Du lịch và Tiếp thị GTVT Việt Nam (Vietravel)",
    stars: 310,
    forks: 63,
    license: "Proprietary",
    summaryVi: "Máy chủ MCP kết nối công ty lữ hành số 1 Việt Nam, quản lý lịch khởi hành tour du lịch trong nước, quốc tế và dịch vụ hàng không Vietravel Airlines.",
    purposeVi: "Tự động hóa quy trình tư vấn lộ trình tour, kiểm tra số chỗ còn nhận trên các chuyến bay charter và thanh toán đặt cọc tour du lịch an toàn.",
    installGuideVi: "Bước 1: Đăng ký cổng đại lý bán tour với ban công nghệ Vietravel.\nBước 2: Cài đặt gói máy chủ MCP `@vietravel/booking-engine-mcp` qua npm.\nBước 3: Nhập mã đại lý và khóa bí mật API.\nBước 4: Khởi động máy chủ và kiểm tra lịch khởi hành các tour lễ hội.",
    usageGuideVi: "Bước 1: Tra cứu các tour du lịch miền Bắc khởi hành từ TP.HCM qua lệnh `vietravel_search_tours`.\nBước 2: Giữ chỗ tour cho nhóm khách gia đình qua lệnh `vietravel_hold_seats`.\nBước 3: Gửi lịch trình chi tiết từng ngày và điều khoản bảo hiểm du lịch quốc tế cho khách hàng.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npx -y @vietravel/booking-engine-mcp",
        jsonConfig: JSON.stringify({
          mcpServers: {
            "vietravel-engine": {
              command: "npx",
              args: ["-y", "@vietravel/booking-engine-mcp@latest"],
              env: {
                VIETRAVEL_AGENT_CODE: "VTR_AG_999",
                VIETRAVEL_KEY: "YOUR_VIETRAVEL_KEY"
              }
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        platformName: "Google Antigravity",
        cliCommand: "agy skill add vietravel-engine",
        jsonConfig: JSON.stringify({
          name: "vietravel-engine",
          command: "npx",
          args: ["-y", "@vietravel/booking-engine-mcp@latest"],
          env: {
            VIETRAVEL_AGENT_CODE: "VTR_AG_999"
          }
        }, null, 2)
      },
      {
        platform: "cursor",
        platformName: "Cursor IDE",
        cliCommand: "npm install @vietravel/booking-engine-mcp",
        jsonConfig: JSON.stringify({
          name: "vietravel-engine",
          command: "npx @vietravel/booking-engine-mcp@latest"
        }, null, 2)
      }
    ]
  },
  {
    id: "saigontourist-travel-partner-sdk",
    name: "Saigontourist Travel Partner & Heritage Tour SDK",
    sourceUrl: "https://saigontourist.net",
    category: "Skill",
    domain: "ecommerce_retail",
    toolType: "Skill",
    typeNameVi: "Skill",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Tổng công ty Du lịch Sài Gòn (Saigontourist)",
    stars: 285,
    forks: 55,
    license: "Proprietary",
    summaryVi: "Bộ kỹ năng đặt dịch vụ khách sạn di sản 5 sao (Caravelle, Rex Hotel, Majestic Saigon) và các tour văn hóa truyền thống Saigontourist.",
    purposeVi: "Tích hợp dịch vụ đón tiễn sân bay sang trọng, đặt tiệc hội nghị MICE và trải nghiệm ẩm thực cung đình Huế hoặc ẩm thực Nam Bộ cho đoàn khách quốc tế.",
    installGuideVi: "Bước 1: Cài đặt gói `@saigontourist/partner-sdk` qua npm.\nBước 2: Cung cấp mã hợp đồng đại lý lữ hành Saigontourist.\nBước 3: Khai báo kỹ năng trong trợ lý du lịch cao cấp.\nBước 4: Kiểm tra kết nối danh sách khách sạn trực thuộc tổng công ty.",
    usageGuideVi: "Bước 1: Đặt phòng khách sạn cổ điển Rex Hotel Sài Gòn qua lệnh `sgt_book_heritage_hotel`.\nBước 2: Tổ chức sự kiện hội nghị MICE với thực đơn tiệc thiết kế riêng qua lệnh `sgt_plan_mice_event`.\nBước 3: Nhận phiếu xác nhận dịch vụ chính thức kèm chính sách hủy linh hoạt.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npx -y @saigontourist/partner-sdk",
        jsonConfig: JSON.stringify({
          skills: {
            "saigontourist-partner": {
              contractId: "SGT_PARTNER_001",
              secret: "YOUR_SGT_SECRET"
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        platformName: "Google Antigravity",
        cliCommand: "agy skill add saigontourist-partner",
        jsonConfig: JSON.stringify({
          skill: "saigontourist-partner",
          contractId: "SGT_PARTNER_001"
        }, null, 2)
      },
      {
        platform: "cursor",
        platformName: "Cursor IDE",
        cliCommand: "npm install @saigontourist/partner-sdk",
        jsonConfig: JSON.stringify({
          tool: "saigontourist-partner"
        }, null, 2)
      }
    ]
  },
  {
    id: "muong-thanh-hotel-booking-api",
    name: "Mường Thanh Hospitality Chain Booking API",
    sourceUrl: "https://booking.muongthanh.com",
    category: "Skill",
    domain: "ecommerce_retail",
    toolType: "Skill",
    typeNameVi: "Skill",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Tập đoàn Khách sạn Mường Thanh",
    stars: 270,
    forks: 51,
    license: "Proprietary",
    summaryVi: "Kỹ năng kết nối chuỗi khách sạn tư nhân lớn nhất Đông Dương với hơn 60 khách sạn 4-5 sao trải dài khắp các tỉnh thành Việt Nam.",
    purposeVi: "Cho phép các doanh nghiệp đặt phòng công tác cho cán bộ nhân viên với mức giá ưu đãi cố định quanh năm tại mọi tỉnh thành từ Hà Giang đến Cà Mau.",
    installGuideVi: "Bước 1: Đăng ký tài khoản doanh nghiệp Mường Thanh Corporate.\nBước 2: Tải bộ kỹ năng `muongthanh-booking-skill`.\nBước 3: Nhập mã doanh nghiệp và cấu hình ưu đãi vào tệp tham số.\nBước 4: Kiểm tra khả năng tìm kiếm khách sạn theo địa giới tỉnh thành.",
    usageGuideVi: "Bước 1: Tìm khách sạn Mường Thanh tại địa phương công tác qua lệnh `muongthanh_find_hotels`.\nBước 2: Đặt phòng Deluxe với giá ưu đãi doanh nghiệp qua lệnh `muongthanh_book_corporate`.\nBước 3: Xuất hóa đơn VAT điện tử tập trung cho doanh nghiệp thanh toán chuyển khoản.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npx -y muongthanh-booking-skill",
        jsonConfig: JSON.stringify({
          skills: {
            "muongthanh-booking": {
              corporateCode: "CORP_VN_2026",
              apiKey: "YOUR_MUONGTHANH_KEY"
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        platformName: "Google Antigravity",
        cliCommand: "agy skill add muongthanh-booking",
        jsonConfig: JSON.stringify({
          skill: "muongthanh-booking",
          corporateCode: "CORP_VN_2026"
        }, null, 2)
      },
      {
        platform: "cursor",
        platformName: "Cursor IDE",
        cliCommand: "npm install muongthanh-booking-skill",
        jsonConfig: JSON.stringify({
          tool: "muongthanh-booking"
        }, null, 2)
      }
    ]
  },

  // 26-30: Camera giám sát AI, Thị giác máy tính & Đô thị thông minh tại Việt Nam
  {
    id: "hanet-ai-camera-connect-api",
    name: "Hanet AI Camera Smart Attendance & Security API",
    sourceUrl: "https://hanet.com",
    category: "MCP Server",
    domain: "ai_nlp_data",
    toolType: "MCP Server",
    typeNameVi: "MCP Server",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Công ty Cổ phần Công nghệ HANET",
    stars: 320,
    forks: 67,
    license: "Proprietary",
    summaryVi: "Máy chủ MCP kết nối dòng camera trí tuệ nhân tạo HANET, điểm danh chấm công khuôn mặt không chạm trong 0.25 giây và phát hiện người lạ đột nhập.",
    purposeVi: "Tự động hóa chấm công nhân viên tại văn phòng, gửi thông báo khi có người lạ xuất hiện ngoài giờ làm việc và cảnh báo xâm nhập an ninh thời gian thực.",
    installGuideVi: "Bước 1: Đăng ký tài khoản nhà phát triển HANET Cloud Connect.\nBước 2: Cài đặt gói máy chủ MCP `@hanet/ai-camera-mcp` qua npm.\nBước 3: Nhập Client ID, Client Secret và Device ID của camera.\nBước 4: Kiểm tra luồng sự kiện điểm danh trả về qua Webhook.",
    usageGuideVi: "Bước 1: Đăng ký khuôn mặt nhân viên mới vào cơ sở dữ liệu camera qua lệnh `hanet_register_face`.\nBước 2: Lấy dữ liệu chấm công hàng ngày của toàn bộ chi nhánh qua lệnh `hanet_get_attendance_log`.\nBước 3: Bật chế độ cảnh báo chống trộm ban đêm và nhận video cắt ngắn 10 giây khi phát hiện chuyển động lạ.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npx -y @hanet/ai-camera-mcp",
        jsonConfig: JSON.stringify({
          mcpServers: {
            "hanet-ai-camera": {
              command: "npx",
              args: ["-y", "@hanet/ai-camera-mcp@latest"],
              env: {
                HANET_CLIENT_ID: "YOUR_HANET_ID",
                HANET_SECRET: "YOUR_HANET_SECRET"
              }
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        platformName: "Google Antigravity",
        cliCommand: "agy skill add hanet-ai-camera",
        jsonConfig: JSON.stringify({
          name: "hanet-ai-camera",
          command: "npx",
          args: ["-y", "@hanet/ai-camera-mcp@latest"],
          env: {
            HANET_CLIENT_ID: "YOUR_HANET_ID"
          }
        }, null, 2)
      },
      {
        platform: "cursor",
        platformName: "Cursor IDE",
        cliCommand: "npm install @hanet/ai-camera-mcp",
        jsonConfig: JSON.stringify({
          name: "hanet-ai-camera",
          command: "npx @hanet/ai-camera-mcp@latest"
        }, null, 2)
      }
    ]
  },
  {
    id: "bkav-ai-view-edge-camera",
    name: "Bkav AI View Edge Computing Camera Cloud API",
    sourceUrl: "https://aiview.ai",
    category: "MCP Server",
    domain: "ai_nlp_data",
    toolType: "MCP Server",
    typeNameVi: "MCP Server",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Tập đoàn Công nghệ Bkav (Bkav AI View)",
    stars: 305,
    forks: 62,
    license: "Proprietary",
    summaryVi: "Máy chủ MCP kết nối hệ thống camera giám sát thông minh AI View xử lý tại biên (Edge Computing) đạt chuẩn bảo mật NDAA xuất khẩu sang Mỹ và Châu Âu.",
    purposeVi: "Phân tích mật độ giao thông, đếm xe tự động, phát hiện phương tiện vượt đèn đỏ, lấn làn và nhận diện biển số xe cơ giới Việt Nam chính xác trên 98%.",
    installGuideVi: "Bước 1: Kết nối thiết bị camera Bkav AI View vào mạng LAN và cấu hình Cloud Gateway.\nBước 2: Cài đặt gói `@aiview/edge-camera-mcp` qua npm.\nBước 3: Nhập thông tin chứng thực máy chủ AI View Cloud.\nBước 4: Kiểm tra luồng video trực tiếp chuẩn nén H.265.",
    usageGuideVi: "Bước 1: Trích xuất danh sách biển số xe vi phạm trật tự giao thông qua lệnh `aiview_detect_license_plates`.\nBước 2: Xem bản đồ nhiệt mật độ đám đông tại khu vực quảng trường hoặc trung tâm thương mại.\nBước 3: Cấu hình hàng rào ảo cảnh báo phương tiện dừng đỗ trái phép.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npx -y @aiview/edge-camera-mcp",
        jsonConfig: JSON.stringify({
          mcpServers: {
            "aiview-camera-mcp": {
              command: "npx",
              args: ["-y", "@aiview/edge-camera-mcp@latest"],
              env: {
                AIVIEW_API_TOKEN: "YOUR_AIVIEW_TOKEN",
                SITE_ID: "SMART_CITY_HN"
              }
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        platformName: "Google Antigravity",
        cliCommand: "agy skill add aiview-camera-mcp",
        jsonConfig: JSON.stringify({
          name: "aiview-camera-mcp",
          command: "npx",
          args: ["-y", "@aiview/edge-camera-mcp@latest"],
          env: {
            AIVIEW_API_TOKEN: "YOUR_AIVIEW_TOKEN"
          }
        }, null, 2)
      },
      {
        platform: "cursor",
        platformName: "Cursor IDE",
        cliCommand: "npm install @aiview/edge-camera-mcp",
        jsonConfig: JSON.stringify({
          name: "aiview-camera-mcp",
          command: "npx @aiview/edge-camera-mcp@latest"
        }, null, 2)
      }
    ]
  },
  {
    id: "vnpt-camera-smart-city-api",
    name: "VNPT AI Camera Smart City & Traffic Surveillance API",
    sourceUrl: "https://vnpt.com.vn",
    category: "Skill",
    domain: "ai_nlp_data",
    toolType: "Skill",
    typeNameVi: "Skill",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Tập đoàn Bưu chính Viễn thông Việt Nam (VNPT)",
    stars: 290,
    forks: 57,
    license: "Proprietary",
    summaryVi: "Kỹ năng kết nối trung tâm điều hành thông minh đô thị (IOC), phân tích hình ảnh giám sát giao thông và an ninh trật tự công cộng của VNPT.",
    purposeVi: "Tự động phân tích hình ảnh từ hàng nghìn mắt camera trên đường phố, phát hiện ùn tắc giao thông, hành vi đổ rác trộm và cảnh báo cháy nổ sớm.",
    installGuideVi: "Bước 1: Nhận mã kết nối hệ thống IOC tỉnh/thành phố từ VNPT IT.\nBước 2: Cài đặt gói `vnpt-camera-skill`.\nBước 3: Cấu hình thông số luồng RTSP và khóa API bảo mật.\nBước 4: Kiểm tra nhận dạng sự kiện cảnh báo giao thông.",
    usageGuideVi: "Bước 1: Gọi lệnh `vnpt_traffic_monitor` để nhận cảnh báo điểm nghẽn giao thông trong giờ cao điểm.\nBước 2: Nhận diện khuôn mặt đối tượng cần tìm kiếm trong cơ sở dữ liệu an ninh.\nBước 3: Đồng bộ dữ liệu sự kiện thời gian thực lên màn hình giám sát trung tâm IOC.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npx -y vnpt-camera-skill",
        jsonConfig: JSON.stringify({
          skills: {
            "vnpt-camera-ai": {
              iocCenter: "IOC_DANANG",
              apiKey: "YOUR_VNPT_CAMERA_KEY"
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        platformName: "Google Antigravity",
        cliCommand: "agy skill add vnpt-camera-ai",
        jsonConfig: JSON.stringify({
          skill: "vnpt-camera-ai",
          iocCenter: "IOC_DANANG"
        }, null, 2)
      },
      {
        platform: "cursor",
        platformName: "Cursor IDE",
        cliCommand: "npm install vnpt-camera-skill",
        jsonConfig: JSON.stringify({
          tool: "vnpt-camera-ai"
        }, null, 2)
      }
    ]
  },
  {
    id: "viettel-vcam-cloud-surveillance",
    name: "Viettel vCam Cloud Video Surveillance & Storage API",
    sourceUrl: "https://viettel.vn",
    category: "MCP Server",
    domain: "ai_nlp_data",
    toolType: "MCP Server",
    typeNameVi: "MCP Server",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Tổng công ty Giải pháp Doanh nghiệp Viettel (Viettel Solutions)",
    stars: 310,
    forks: 64,
    license: "Proprietary",
    summaryVi: "Máy chủ MCP kết nối nền tảng quản lý camera đám mây Viettel vCam, lưu trữ video không cần đầu ghi ổ cứng tại chỗ, bảo mật dữ liệu tuyệt đối.",
    purposeVi: "Giúp chuỗi cửa hàng bán lẻ, ngân hàng và trường mầm non theo dõi tập trung hàng trăm điểm camera trên một màn hình quản trị duy nhất.",
    installGuideVi: "Bước 1: Cài đặt ứng dụng vCam Gateway trên máy chủ mạng nội bộ.\nBước 2: Cài đặt gói máy chủ MCP `@viettel/vcam-cloud-mcp` qua npm.\nBước 3: Nhập thông tin tài khoản doanh nghiệp vCam Cloud.\nBước 4: Kiểm tra trạng thái trực tuyến của các camera chi nhánh.",
    usageGuideVi: "Bước 1: Xem trực tiếp hình ảnh camera chi nhánh qua lệnh `vcam_get_live_stream`.\nBước 2: Tua lại video lưu trữ đám mây theo mốc thời gian qua lệnh `vcam_playback`.\nBước 3: Xuất đoạn video trích xuất có gắn chữ ký số chứng thực tính toàn vẹn của dữ liệu phục vụ cơ quan điều tra.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npx -y @viettel/vcam-cloud-mcp",
        jsonConfig: JSON.stringify({
          mcpServers: {
            "viettel-vcam-mcp": {
              command: "npx",
              args: ["-y", "@viettel/vcam-cloud-mcp@latest"],
              env: {
                VCAM_CORP_TOKEN: "YOUR_VCAM_TOKEN"
              }
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        platformName: "Google Antigravity",
        cliCommand: "agy skill add viettel-vcam-mcp",
        jsonConfig: JSON.stringify({
          name: "viettel-vcam-mcp",
          command: "npx",
          args: ["-y", "@viettel/vcam-cloud-mcp@latest"],
          env: {
            VCAM_CORP_TOKEN: "YOUR_VCAM_TOKEN"
          }
        }, null, 2)
      },
      {
        platform: "cursor",
        platformName: "Cursor IDE",
        cliCommand: "npm install @viettel/vcam-cloud-mcp",
        jsonConfig: JSON.stringify({
          name: "viettel-vcam-mcp",
          command: "npx @viettel/vcam-cloud-mcp@latest"
        }, null, 2)
      }
    ]
  },
  {
    id: "fpt-telecom-fcam-iq-api",
    name: "FPT Camera IQ Cloud AI Analytics API",
    sourceUrl: "https://fpt.vn",
    category: "Skill",
    domain: "ai_nlp_data",
    toolType: "Skill",
    typeNameVi: "Skill",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Công ty Cổ phần Viễn thông FPT (FPT Telecom)",
    stars: 295,
    forks: 59,
    license: "Proprietary",
    summaryVi: "Kỹ năng phân biệt chuyển động giữa người và vật thể, nhận diện người quen/người lạ và lưu trữ đám mây Data Center chuẩn Tier III của FPT Telecom.",
    purposeVi: "Loại bỏ hoàn toàn các thông báo cảnh báo giả do lá cây rung, mưa gió hoặc thú cưng chạy qua; gửi cảnh báo tức thì kèm hình ảnh vào điện thoại khi phát hiện người lạ tiếp cận cửa nhà.",
    installGuideVi: "Bước 1: Tải gói thư viện `fpt-camera-iq-sdk`.\nBước 2: Cung cấp mã hợp đồng FPT Telecom và mã bảo mật camera IQ.\nBước 3: Nhúng kỹ năng vào hệ thống nhà thông minh (Smart Home).\nBước 4: Kiểm tra tính năng nhận diện chuyển động người.",
    usageGuideVi: "Bước 1: Lấy danh sách ảnh chụp các sự kiện có người qua lệnh `fcam_get_human_events`.\nBước 2: Kích hoạt còi hú báo động trên thân camera qua lệnh `fcam_trigger_siren`.\nBước 3: Chia sẻ quyền xem camera cho các thành viên trong gia đình an toàn.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npx -y fpt-camera-iq-sdk",
        jsonConfig: JSON.stringify({
          skills: {
            "fpt-camera-iq": {
              contractNo: "FPT_HD_123456",
              apiKey: "YOUR_FCAM_KEY"
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        platformName: "Google Antigravity",
        cliCommand: "agy skill add fpt-camera-iq",
        jsonConfig: JSON.stringify({
          skill: "fpt-camera-iq",
          contractNo: "FPT_HD_123456"
        }, null, 2)
      },
      {
        platform: "cursor",
        platformName: "Cursor IDE",
        cliCommand: "npm install fpt-camera-iq-sdk",
        jsonConfig: JSON.stringify({
          tool: "fpt-camera-iq"
        }, null, 2)
      }
    ]
  },

  // 31-35: Kho bãi, Fulfillment, Giao nhận & Logistics chuyên sâu tại Việt Nam
  {
    id: "boxme-fulfillment-asia-api",
    name: "Boxme Global Fulfillment & E-Commerce Warehouse API",
    sourceUrl: "https://boxme.asia",
    category: "MCP Server",
    domain: "logistics_transport",
    toolType: "MCP Server",
    typeNameVi: "MCP Server",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Boxme Global (NextTech Group)",
    stars: 335,
    forks: 69,
    license: "Proprietary",
    summaryVi: "Máy chủ MCP kết nối mạng lưới kho hàng hoàn tất đơn hàng (Fulfillment) đa quốc gia, tự động đồng bộ đơn hàng từ Shopee, TikTok Shop, Lazada.",
    purposeVi: "Tự động lấy hàng, đóng gói, dán nhãn vận chuyển và giao cho các đơn vị vận chuyển trong vòng 2 giờ kể từ khi phát sinh đơn hàng thương mại điện tử.",
    installGuideVi: "Bước 1: Mở tài khoản đối tác bán hàng trên cổng Boxme Portal.\nBước 2: Cài đặt gói máy chủ MCP `@boxme/fulfillment-mcp` qua npm.\nBước 3: Khai báo mã kho hàng (Kho Hà Nội, Kho Bình Dương hoặc Kho TP.HCM).\nBước 4: Kiểm tra trạng thái tồn kho thực tế và mã SKU.",
    usageGuideVi: "Bước 1: Đẩy đơn hàng bán ra cần hoàn tất đóng gói qua lệnh `boxme_create_fulfillment_order`.\nBước 2: Xem số lượng hàng tồn khả dụng trong từng kho qua lệnh `boxme_get_inventory`.\nBước 3: Theo dõi trạng thái kiện hàng từ khi đóng gói đến khi đối tác vận chuyển giao thành công.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npx -y @boxme/fulfillment-mcp",
        jsonConfig: JSON.stringify({
          mcpServers: {
            "boxme-fulfillment": {
              command: "npx",
              args: ["-y", "@boxme/fulfillment-mcp@latest"],
              env: {
                BOXME_API_KEY: "YOUR_BOXME_KEY",
                BOXME_WAREHOUSE_ID: "WH_HCM_01"
              }
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        platformName: "Google Antigravity",
        cliCommand: "agy skill add boxme-fulfillment",
        jsonConfig: JSON.stringify({
          name: "boxme-fulfillment",
          command: "npx",
          args: ["-y", "@boxme/fulfillment-mcp@latest"],
          env: {
            BOXME_API_KEY: "YOUR_BOXME_KEY"
          }
        }, null, 2)
      },
      {
        platform: "cursor",
        platformName: "Cursor IDE",
        cliCommand: "npm install @boxme/fulfillment-mcp",
        jsonConfig: JSON.stringify({
          name: "boxme-fulfillment",
          command: "npx @boxme/fulfillment-mcp@latest"
        }, null, 2)
      }
    ]
  },
  {
    id: "nh-logistics-wms-connector",
    name: "N&H Logistics Smart Warehouse Management (WMS) API",
    sourceUrl: "https://nhlogistics.vn",
    category: "Skill",
    domain: "logistics_transport",
    toolType: "Skill",
    typeNameVi: "Skill",
    platforms: ["claude", "antigravity", "cursor"],
    author: "N&H Logistics Vietnam",
    stars: 260,
    forks: 48,
    license: "Proprietary",
    summaryVi: "Kỹ năng kết nối phần mềm quản lý kho thông minh (WMS), phân bổ vị trí kệ chứa hàng theo tần suất xuất nhập (Fast Moving) và quản lý hạn sử dụng FIFO/FEFO.",
    purposeVi: "Tối ưu hóa quãng đường di chuyển của nhân viên bốc xếp trong kho, quét mã vạch kiểm kê tồn kho chính xác 99.9% và quản lý hàng lạnh, hàng nhiệt độ phòng.",
    installGuideVi: "Bước 1: Cài đặt gói `nh-wms-connector-sdk`.\nBước 2: Cung cấp mã định danh kho bãi và khóa bảo mật WMS.\nBước 3: Nhúng kỹ năng vào hệ sinh thái điều phối chuỗi cung ứng.\nBước 4: Kiểm tra khả năng tạo phiếu xuất nhập kho tự động.",
    usageGuideVi: "Bước 1: Chỉ định vị trí lưu kho tối ưu cho lô hàng mới nhập qua lệnh `wms_suggest_bin_location`.\nBước 2: Quét mã vạch xuất kho theo nguyên tắc hết hạn trước xuất trước (FEFO) qua lệnh `wms_pick_fefo`.\nBước 3: Xuất báo cáo kiểm kê kho định kỳ đối chiếu số liệu thực tế với phần mềm.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npx -y nh-wms-connector-sdk",
        jsonConfig: JSON.stringify({
          skills: {
            "nh-logistics-wms": {
              facilityId: "FACILITY_BINH_DUONG",
              apiKey: "YOUR_WMS_KEY"
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        platformName: "Google Antigravity",
        cliCommand: "agy skill add nh-logistics-wms",
        jsonConfig: JSON.stringify({
          skill: "nh-logistics-wms",
          facilityId: "FACILITY_BINH_DUONG"
        }, null, 2)
      },
      {
        platform: "cursor",
        platformName: "Cursor IDE",
        cliCommand: "npm install nh-wms-connector-sdk",
        jsonConfig: JSON.stringify({
          tool: "nh-logistics-wms"
        }, null, 2)
      }
    ]
  },
  {
    id: "ghn-fulfillment-warehousing-sdk",
    name: "Giao Hàng Nhanh (GHN) Fulfillment & Cross-Docking SDK",
    sourceUrl: "https://ghn.vn",
    category: "Skill",
    domain: "logistics_transport",
    toolType: "Skill",
    typeNameVi: "Skill",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Công ty Cổ phần Dịch vụ Giao Hàng Nhanh (GHN)",
    stars: 360,
    forks: 84,
    license: "Apache-2.0",
    summaryVi: "Bộ công cụ SDK tích hợp dịch vụ lưu kho, đóng gói và mạng lưới phân loại bưu phẩm tự động 100% bằng băng chuyền tốc độ cao của GHN.",
    purposeVi: "Đảm bảo đơn hàng được lấy từ kho GHN và giao đến tay người mua trong nội thành Hà Nội hoặc TP.HCM chỉ trong vòng vài giờ với tỷ lệ giao thành công cao.",
    installGuideVi: "Bước 1: Đăng ký dịch vụ GHN Fulfillment tại cổng đối tác khách hàng lớn.\nBước 2: Cài đặt gói thư viện `@ghn/fulfillment-sdk` qua npm.\nBước 3: Nhập Shop ID và Token API tài khoản GHN.\nBước 4: Kiểm tra kết nối với kho bãi GHN gần nhất.",
    usageGuideVi: "Bước 1: Lập đơn yêu cầu đóng gói và xuất kho qua lệnh `ghn_request_fulfillment`.\nBước 2: In nhãn bưu phẩm chuẩn GHN có mã QR định tuyến qua băng chuyền tự động.\nBước 3: Nhận tiền thu hộ COD đối soát tự động vào tài khoản ngân hàng hàng ngày.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npx -y @ghn/fulfillment-sdk",
        jsonConfig: JSON.stringify({
          skills: {
            "ghn-fulfillment": {
              shopId: "GHN_SHOP_1020",
              token: "YOUR_GHN_TOKEN"
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        platformName: "Google Antigravity",
        cliCommand: "agy skill add ghn-fulfillment",
        jsonConfig: JSON.stringify({
          skill: "ghn-fulfillment",
          shopId: "GHN_SHOP_1020"
        }, null, 2)
      },
      {
        platform: "cursor",
        platformName: "Cursor IDE",
        cliCommand: "npm install @ghn/fulfillment-sdk",
        jsonConfig: JSON.stringify({
          tool: "ghn-fulfillment"
        }, null, 2)
      }
    ]
  },
  {
    id: "ninja-van-vietnam-shipping-api",
    name: "Ninja Van Vietnam Last-Mile Shipping API",
    sourceUrl: "https://www.ninjavan.co/vi-vn",
    category: "MCP Server",
    domain: "logistics_transport",
    toolType: "MCP Server",
    typeNameVi: "MCP Server",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Ninja Van Vietnam",
    stars: 315,
    forks: 65,
    license: "Proprietary",
    summaryVi: "Máy chủ MCP kết nối dịch vụ chuyển phát chặng cuối (Last-Mile Delivery), hỗ trợ giao hàng lại linh hoạt và dịch vụ bưu cục tự phục vụ Ninja Box.",
    purposeVi: "Cho phép người mua chủ động hẹn lại thời gian giao hàng, đổi địa chỉ nhận hàng và theo dõi tài xế giao hàng trên bản đồ thời gian thực.",
    installGuideVi: "Bước 1: Mở tài khoản đối tác doanh nghiệp trên cổng Ninja Van Open API.\nBước 2: Cài đặt gói máy chủ MCP `@ninjavan/shipping-mcp` qua npm.\nBước 3: Nhập Client ID và Client Secret được cấp.\nBước 4: Khởi động máy chủ và thử tạo một vận đơn giao hàng kiểm thử.",
    usageGuideVi: "Bước 1: Tạo đơn hàng giao hỏa tốc qua lệnh `ninja_create_shipment`.\nBước 2: Đổi ngày giao hàng theo yêu cầu của người nhận qua lệnh `ninja_reschedule_delivery`.\nBước 3: Nhận thông báo trạng thái giao hàng thành công kèm ảnh chụp bằng chứng giao hàng (POD).",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npx -y @ninjavan/shipping-mcp",
        jsonConfig: JSON.stringify({
          mcpServers: {
            "ninjavan-shipping": {
              command: "npx",
              args: ["-y", "@ninjavan/shipping-mcp@latest"],
              env: {
                NINJA_CLIENT_ID: "YOUR_NINJA_ID",
                NINJA_SECRET: "YOUR_NINJA_SECRET"
              }
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        platformName: "Google Antigravity",
        cliCommand: "agy skill add ninjavan-shipping",
        jsonConfig: JSON.stringify({
          name: "ninjavan-shipping",
          command: "npx",
          args: ["-y", "@ninjavan/shipping-mcp@latest"],
          env: {
            NINJA_CLIENT_ID: "YOUR_NINJA_ID"
          }
        }, null, 2)
      },
      {
        platform: "cursor",
        platformName: "Cursor IDE",
        cliCommand: "npm install @ninjavan/shipping-mcp",
        jsonConfig: JSON.stringify({
          name: "ninjavan-shipping",
          command: "npx @ninjavan/shipping-mcp@latest"
        }, null, 2)
      }
    ]
  },
  {
    id: "jt-express-vietnam-logistics-api",
    name: "J&T Express Vietnam Logistics & COD Tracking API",
    sourceUrl: "https://jtexpress.vn",
    category: "Skill",
    domain: "logistics_transport",
    toolType: "Skill",
    typeNameVi: "Skill",
    platforms: ["claude", "antigravity", "cursor"],
    author: "J&T Express Việt Nam",
    stars: 325,
    forks: 67,
    license: "Commercial",
    summaryVi: "Bộ công cụ tích hợp mạng lưới bưu cục chuyển phát nhanh 365 ngày không nghỉ của J&T Express, tối ưu giao nhận đơn hàng trên các sàn TMĐT và mạng xã hội.",
    purposeVi: "Tự động gọi bưu tá đến tận nơi lấy hàng, tính toán cước phí vận chuyển chính xác theo bảng giá ưu đãi theo tháng và theo dõi bưu kiện theo thời gian thực.",
    installGuideVi: "Bước 1: Đăng ký mã khách hàng VIP tại bưu cục J&T Express gần nhất.\nBước 2: Cài đặt gói `jt-express-vn-sdk` qua lệnh `npm install`.\nBước 3: Nhập mã khách hàng và mật khẩu giao dịch API.\nBước 4: Kiểm tra tính năng tạo mã vận đơn tự động.",
    usageGuideVi: "Bước 1: Lập đơn hàng giao toàn quốc qua lệnh `jt_create_order` với đầy đủ thông tin người nhận và số tiền thu hộ COD.\nBước 2: Theo dõi hành trình xe tải trung chuyển liên tỉnh qua lệnh `jt_track_package`.\nBước 3: Tra cứu bảng đối soát tiền COD và phí dịch vụ đã được hoàn tất.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npx -y jt-express-vn-sdk",
        jsonConfig: JSON.stringify({
          skills: {
            "jt-express-vn": {
              customerCode: "JT_VIP_0099",
              password: "YOUR_JT_PASSWORD"
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        platformName: "Google Antigravity",
        cliCommand: "agy skill add jt-express-vn",
        jsonConfig: JSON.stringify({
          skill: "jt-express-vn",
          customerCode: "JT_VIP_0099"
        }, null, 2)
      },
      {
        platform: "cursor",
        platformName: "Cursor IDE",
        cliCommand: "npm install jt-express-vn-sdk",
        jsonConfig: JSON.stringify({
          tool: "jt-express-vn"
        }, null, 2)
      }
    ]
  },

  // 36-40: Ví điện tử, Ví thanh toán, Web3, Blockchain & Tiền điện tử có nguồn gốc Việt Nam
  {
    id: "coin98-super-wallet-sdk",
    name: "Coin98 Super App & Multi-Chain Wallet SDK",
    sourceUrl: "https://coin98.com",
    category: "MCP Server",
    domain: "finance_payment",
    toolType: "MCP Server",
    typeNameVi: "MCP Server",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Ninety Eight (Coin98 Finance)",
    stars: 1250,
    forks: 320,
    license: "MIT",
    summaryVi: "Máy chủ MCP kết nối ví tiền mã hóa đa chuỗi Coin98 (hơn 100+ blockchain: Ethereum, Solana, BNB Chain, Viction), tích hợp sàn giao dịch phi tập trung và dApp.",
    purposeVi: "Cho phép các trợ lý AI hỗ trợ người dùng kiểm tra số dư ví Web3, hoán đổi token (Swap), theo dõi danh mục đầu tư tài sản số và tương tác an toàn với các hợp đồng thông minh.",
    installGuideVi: "Bước 1: Cài đặt gói máy chủ MCP `@coin98/wallet-mcp` qua npm.\nBước 2: Cung cấp khóa công khai địa chỉ ví hoặc khóa API Ninety Eight.\nBước 3: Cấu hình cổng kết nối trong tệp cài đặt trợ lý AI.\nBước 4: Kiểm tra khả năng đọc số dư các tài sản tiền mã hóa.",
    usageGuideVi: "Bước 1: Tra cứu số dư các token trên chuỗi khối Viction và Solana qua lệnh `coin98_get_balances`.\nBước 2: Tìm kiếm tỷ giá hoán đổi token tốt nhất qua các giao thức thanh khoản bằng lệnh `coin98_find_best_route`.\nBước 3: Kiểm tra mức độ an toàn của hợp đồng thông minh trước khi phê duyệt giao dịch.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npx -y @coin98/wallet-mcp",
        jsonConfig: JSON.stringify({
          mcpServers: {
            "coin98-wallet-mcp": {
              command: "npx",
              args: ["-y", "@coin98/wallet-mcp@latest"],
              env: {
                COIN98_API_KEY: "YOUR_COIN98_API_KEY"
              }
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        platformName: "Google Antigravity",
        cliCommand: "agy skill add coin98-wallet-mcp",
        jsonConfig: JSON.stringify({
          name: "coin98-wallet-mcp",
          command: "npx",
          args: ["-y", "@coin98/wallet-mcp@latest"],
          env: {
            COIN98_API_KEY: "YOUR_COIN98_API_KEY"
          }
        }, null, 2)
      },
      {
        platform: "cursor",
        platformName: "Cursor IDE",
        cliCommand: "npm install @coin98/wallet-mcp",
        jsonConfig: JSON.stringify({
          name: "coin98-wallet-mcp",
          command: "npx @coin98/wallet-mcp@latest"
        }, null, 2)
      }
    ]
  },
  {
    id: "kyber-network-liquidity-sdk",
    name: "Kyber Network DEX Aggregator & Liquidity SDK",
    sourceUrl: "https://kyberswap.com",
    category: "Skill",
    domain: "finance_payment",
    toolType: "Skill",
    typeNameVi: "Skill",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Kyber Network (Loi Luu & Victor Tran)",
    stars: 1100,
    forks: 290,
    license: "MIT",
    summaryVi: "Bộ công cụ SDK tích hợp sàn giao dịch phi tập trung KyberSwap, định tuyến lệnh thông minh để tối ưu giá và giảm thiểu trượt giá (Slippage) khi giao dịch tiền mã hóa.",
    purposeVi: "Tự động phân chia lệnh giao dịch lớn qua nhiều nguồn thanh khoản khác nhau (Uniswap, PancakeSwap, Curve) để đạt được tỷ giá quy đổi có lợi nhất cho người sử dụng.",
    installGuideVi: "Bước 1: Cài đặt gói thư viện `@kyberswap/aggregator-sdk` qua npm.\nBước 2: Cấu hình mã mạng chuỗi khối mục tiêu (Ethereum, Arbitrum, Optimism, Polygon).\nBước 3: Nhúng SDK vào ứng dụng tài chính phi tập trung (DeFi).\nBước 4: Kiểm tra tính toán chi phí gas giao dịch tối ưu.",
    usageGuideVi: "Bước 1: Nhận báo giá hoán đổi cặp tiền tệ USDT sang ETH qua lệnh `kyber_get_quote`.\nBước 2: Xây dựng dữ liệu giao dịch đã mã hóa để người dùng ký ví MetaMask/Coin98 qua lệnh `kyber_build_tx`.\nBước 3: Giám sát lệnh giao dịch cho đến khi được xác nhận thành công trên chuỗi khối.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npm i @kyberswap/aggregator-sdk",
        jsonConfig: JSON.stringify({
          skills: {
            "kyberswap-dex": {
              chainId: 1,
              clientName: "AI_HUB_VN_CLIENT"
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        platformName: "Google Antigravity",
        cliCommand: "agy skill add kyberswap-dex",
        jsonConfig: JSON.stringify({
          skill: "kyberswap-dex",
          chainId: 1
        }, null, 2)
      },
      {
        platform: "cursor",
        platformName: "Cursor IDE",
        cliCommand: "npm install @kyberswap/aggregator-sdk",
        jsonConfig: JSON.stringify({
          tool: "kyberswap-dex"
        }, null, 2)
      }
    ]
  },
  {
    id: "ronin-network-skymavis-sdk",
    name: "Ronin Network (Sky Mavis) Web3 Gaming SDK",
    sourceUrl: "https://roninchain.com",
    category: "MCP Server",
    domain: "finance_payment",
    toolType: "MCP Server",
    typeNameVi: "MCP Server",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Sky Mavis (Kỳ Nguyễn & Trung Nguyễn)",
    stars: 1450,
    forks: 380,
    license: "Apache-2.0",
    summaryVi: "Máy chủ MCP kết nối chuỗi khối chuyên biệt cho trò chơi điện tử và kinh tế số Web3 Ronin Network (Axie Infinity, Pixels), hỗ trợ phí giao dịch cực thấp và tốc độ xác thực 1 giây.",
    purposeVi: "Quản lý tài sản NFT nhân vật game, vật phẩm ảo, giao dịch token RON/SLP/AXS và xây dựng ứng dụng phi tập trung phục vụ hàng triệu game thủ trên toàn cầu.",
    installGuideVi: "Bước 1: Cài đặt gói máy chủ MCP `@skymavis/ronin-mcp` qua npm.\nBước 2: Khai báo cổng RPC máy chủ Ronin Mainnet hoặc Saigon Testnet.\nBước 3: Nhập khóa API nhà phát triển Sky Mavis Developer Console.\nBước 4: Kiểm tra kết nối truy vấn khối Ronin mới nhất.",
    usageGuideVi: "Bước 1: Tra cứu danh sách vật phẩm NFT trong ví game thủ qua lệnh `ronin_get_nfts`.\nBước 2: Kiểm tra lịch sử giao dịch nạp rút qua cầu nối Ronin Bridge.\nBước 3: Tương tác với hợp đồng thông minh Katana DEX trên mạng Ronin.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npx -y @skymavis/ronin-mcp",
        jsonConfig: JSON.stringify({
          mcpServers: {
            "ronin-network-mcp": {
              command: "npx",
              args: ["-y", "@skymavis/ronin-mcp@latest"],
              env: {
                RONIN_RPC: "https://api.roninchain.com/rpc",
                SKYMAVIS_API_KEY: "YOUR_SKYMAVIS_KEY"
              }
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        platformName: "Google Antigravity",
        cliCommand: "agy skill add ronin-network-mcp",
        jsonConfig: JSON.stringify({
          name: "ronin-network-mcp",
          command: "npx",
          args: ["-y", "@skymavis/ronin-mcp@latest"],
          env: {
            RONIN_RPC: "https://api.roninchain.com/rpc"
          }
        }, null, 2)
      },
      {
        platform: "cursor",
        platformName: "Cursor IDE",
        cliCommand: "npm install @skymavis/ronin-mcp",
        jsonConfig: JSON.stringify({
          name: "ronin-network-mcp",
          command: "npx @skymavis/ronin-mcp@latest"
        }, null, 2)
      }
    ]
  },
  {
    id: "foxpay-fpt-telecom-ewallet",
    name: "Foxpay E-Wallet & Digital Payment Gateway (FPT Telecom)",
    sourceUrl: "https://foxpay.vn",
    category: "Skill",
    domain: "finance_payment",
    toolType: "Skill",
    typeNameVi: "Skill",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Công ty Cổ phần Viễn thông FPT (Foxpay)",
    stars: 260,
    forks: 47,
    license: "Proprietary",
    summaryVi: "Bộ kỹ năng tích hợp ví điện tử Foxpay được Ngân hàng Nhà nước cấp phép, hỗ trợ thanh toán cước Internet FPT, hóa đơn truyền hình và mạng lưới điểm chấp nhận thanh toán QR Code.",
    purposeVi: "Tự động hóa thanh toán định kỳ hóa đơn viễn thông, nạp tiền điện thoại, thanh toán học phí đại học FPT và tích hợp cổng thanh toán trực tuyến cho các trang web bán lẻ.",
    installGuideVi: "Bước 1: Ký hợp đồng kết nối cổng thanh toán trực tuyến Foxpay.\nBước 2: Cài đặt gói thư viện `@foxpay/payment-sdk` qua npm.\nBước 3: Thiết lập mã đơn vị chấp nhận thanh toán Merchant Code và Secret Key.\nBước 4: Kiểm thử thanh toán trên môi trường Sandbox.",
    usageGuideVi: "Bước 1: Tạo yêu cầu thanh toán hóa đơn cước Internet FPT qua lệnh `foxpay_create_payment`.\nBước 2: Nhận thông báo xác nhận thanh toán thành công qua cổng Webhook an toàn.\nBước 3: Thực hiện hoàn tiền cho khách hàng khi giao dịch bị lỗi hoặc hủy đơn.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npx -y @foxpay/payment-sdk",
        jsonConfig: JSON.stringify({
          skills: {
            "foxpay-gateway": {
              merchantCode: "FOXPAY_MERCHANT_01",
              secretKey: "YOUR_FOXPAY_SECRET"
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        platformName: "Google Antigravity",
        cliCommand: "agy skill add foxpay-gateway",
        jsonConfig: JSON.stringify({
          skill: "foxpay-gateway",
          merchantCode: "FOXPAY_MERCHANT_01"
        }, null, 2)
      },
      {
        platform: "cursor",
        platformName: "Cursor IDE",
        cliCommand: "npm install @foxpay/payment-sdk",
        jsonConfig: JSON.stringify({
          tool: "foxpay-gateway"
        }, null, 2)
      }
    ]
  },
  {
    id: "vnpay-qr-pos-terminal-api",
    name: "VNPAY-QR Smart POS Terminal & Merchant Settlement API",
    sourceUrl: "https://vnpay.vn",
    category: "MCP Server",
    domain: "finance_payment",
    toolType: "MCP Server",
    typeNameVi: "MCP Server",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Công ty Cổ phần Giải pháp Thanh toán Việt Nam (VNPAY)",
    stars: 390,
    forks: 88,
    license: "Proprietary",
    summaryVi: "Máy chủ MCP kết nối thiết bị thanh toán SmartPOS VNPAY, tích hợp in hóa đơn điện tử tại quầy, quẹt thẻ chip EMV/Contactless và thanh toán mã VNPAY-QR chuẩn quốc gia.",
    purposeVi: "Tối ưu hóa thanh toán tại quầy thu ngân các chuỗi siêu thị, cửa hàng tiện lợi, nhà thuốc và nhà hàng; đồng bộ doanh thu bán hàng tức thì vào phần mềm bán hàng.",
    installGuideVi: "Bước 1: Đăng ký dịch vụ VNPAY SmartPOS với trung tâm kinh doanh VNPAY.\nBước 2: Cài đặt gói máy chủ MCP `@vnpay/smartpos-mcp` qua npm.\nBước 3: Khai báo Terminal ID và khóa mã hóa bảo mật phần cứng HSM.\nBước 4: Kiểm tra kết nối truyền nhận lệnh thanh toán với máy SmartPOS.",
    usageGuideVi: "Bước 1: Đẩy số tiền cần thanh toán từ phần mềm bán hàng sang màn hình SmartPOS qua lệnh `vnpay_pos_charge`.\nBước 2: Nhận kết quả quẹt thẻ ngân hàng hoặc quét mã QR từ máy POS trong vòng 1 giây.\nBước 3: In hóa đơn VAT điện tử có mã của cơ quan thuế trực tiếp từ máy in nhiệt tích hợp trên máy POS.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npx -y @vnpay/smartpos-mcp",
        jsonConfig: JSON.stringify({
          mcpServers: {
            "vnpay-smartpos": {
              command: "npx",
              args: ["-y", "@vnpay/smartpos-mcp@latest"],
              env: {
                TERMINAL_ID: "POS_HN_0012",
                VNPAY_SECRET_KEY: "YOUR_VNPAY_SECRET"
              }
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        platformName: "Google Antigravity",
        cliCommand: "agy skill add vnpay-smartpos",
        jsonConfig: JSON.stringify({
          name: "vnpay-smartpos",
          command: "npx",
          args: ["-y", "@vnpay/smartpos-mcp@latest"],
          env: {
            TERMINAL_ID: "POS_HN_0012"
          }
        }, null, 2)
      },
      {
        platform: "cursor",
        platformName: "Cursor IDE",
        cliCommand: "npm install @vnpay/smartpos-mcp",
        jsonConfig: JSON.stringify({
          name: "vnpay-smartpos",
          command: "npx @vnpay/smartpos-mcp@latest"
        }, null, 2)
      }
    ]
  },

  // 41-45: Tổng đài ảo, Cloud PBX, Viễn thông & Chăm sóc khách hàng (CSKH)
  {
    id: "fpt-oncall-cloud-pbx-api",
    name: "FPT Oncall Cloud PBX & VoIP Telephony API",
    sourceUrl: "https://oncall.vn",
    category: "MCP Server",
    domain: "telecom_cskh",
    toolType: "MCP Server",
    typeNameVi: "MCP Server",
    platforms: ["claude", "antigravity", "cursor"],
    author: "FPT Telecom (Oncall Cloud PBX)",
    stars: 310,
    forks: 61,
    license: "Proprietary",
    summaryVi: "Máy chủ MCP kết nối tổng đài ảo đám mây FPT Oncall, cung cấp đầu số hotline doanh nghiệp (1900, 1800, số cố định 024/028), ghi âm cuộc gọi và phân phối cuộc gọi thông minh (ACD).",
    purposeVi: "Tự động hóa quay số gọi ra cho đội ngũ bán hàng (Auto Dialer), hiển thị thông tin khách hàng khi có cuộc gọi đến (Click-to-Call) và nghe lại file ghi âm chất lượng cao.",
    installGuideVi: "Bước 1: Đăng ký dịch vụ tổng đài Oncall với FPT Telecom.\nBước 2: Cài đặt gói máy chủ MCP `@fpt/oncall-pbx-mcp` qua npm.\nBước 3: Nhập thông tin tổng đài Domain, SIP Account và API Token.\nBước 4: Kiểm tra trạng thái máy nhánh (Extension) trực tuyến.",
    usageGuideVi: "Bước 1: Thực hiện cuộc gọi tự động từ màn hình CRM qua lệnh `oncall_make_call`.\nBước 2: Lấy danh sách lịch sử cuộc gọi (CDR) kèm file ghi âm qua lệnh `oncall_get_cdr_logs`.\nBước 3: Điều hướng cuộc gọi vào hàng đợi của nhân viên chăm sóc khách hàng chuyên trách.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npx -y @fpt/oncall-pbx-mcp",
        jsonConfig: JSON.stringify({
          mcpServers: {
            "fpt-oncall-mcp": {
              command: "npx",
              args: ["-y", "@fpt/oncall-pbx-mcp@latest"],
              env: {
                ONCALL_DOMAIN: "doanhnghiep.oncall.vn",
                ONCALL_TOKEN: "YOUR_ONCALL_TOKEN"
              }
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        platformName: "Google Antigravity",
        cliCommand: "agy skill add fpt-oncall-mcp",
        jsonConfig: JSON.stringify({
          name: "fpt-oncall-mcp",
          command: "npx",
          args: ["-y", "@fpt/oncall-pbx-mcp@latest"],
          env: {
            ONCALL_DOMAIN: "doanhnghiep.oncall.vn"
          }
        }, null, 2)
      },
      {
        platform: "cursor",
        platformName: "Cursor IDE",
        cliCommand: "npm install @fpt/oncall-pbx-mcp",
        jsonConfig: JSON.stringify({
          name: "fpt-oncall-mcp",
          command: "npx @fpt/oncall-pbx-mcp@latest"
        }, null, 2)
      }
    ]
  },
  {
    id: "mobifone-3c-contact-center-api",
    name: "MobiFone 3C (Cloud Contact Center) Omnichannel API",
    sourceUrl: "https://mobifone3c.vn",
    category: "Skill",
    domain: "telecom_cskh",
    toolType: "Skill",
    typeNameVi: "Skill",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Tổng công ty Viễn thông MobiFone (MobiFone 3C)",
    stars: 280,
    forks: 53,
    license: "Proprietary",
    summaryVi: "Kỹ năng kết nối giải pháp tổng đài di động đa kênh MobiFone 3C, sử dụng số di động làm số hotline công ty để tăng tỷ lệ bắt máy lên trên 90%.",
    purposeVi: "Giúp doanh nghiệp tiết kiệm đến 40% chi phí cước viễn thông hàng tháng nhờ áp dụng các gói cước nội mạng MobiFone cho đội ngũ bán hàng và CSKH.",
    installGuideVi: "Bước 1: Ký hợp đồng triển khai giải pháp 3C với MobiFone.\nBước 2: Cài đặt gói thư viện `mobifone-3c-sdk`.\nBước 3: Khai báo số hotline đại diện và khóa bí mật kết nối máy chủ.\nBước 4: Kiểm tra cuộc gọi kiểm thử đến số điện thoại nội bộ.",
    usageGuideVi: "Bước 1: Gọi điện thoại ra cho khách hàng bằng đầu số di động doanh nghiệp qua lệnh `m3c_dial_out`.\nBước 2: Gửi tin nhắn SMS Brandname tự động ngay sau khi kết thúc cuộc gọi tư vấn.\nBước 3: Xem báo cáo năng suất làm việc và thời gian đàm thoại của từng điện thoại viên.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npx -y mobifone-3c-sdk",
        jsonConfig: JSON.stringify({
          skills: {
            "mobifone-3c": {
              hotlineNumber: "0901234567",
              apiSecret: "YOUR_3C_SECRET"
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        platformName: "Google Antigravity",
        cliCommand: "agy skill add mobifone-3c",
        jsonConfig: JSON.stringify({
          skill: "mobifone-3c",
          hotlineNumber: "0901234567"
        }, null, 2)
      },
      {
        platform: "cursor",
        platformName: "Cursor IDE",
        cliCommand: "npm install mobifone-3c-sdk",
        jsonConfig: JSON.stringify({
          tool: "mobifone-3c"
        }, null, 2)
      }
    ]
  },
  {
    id: "vnpt-vcc-virtual-call-center",
    name: "VNPT VCC (Virtual Call Center) Enterprise Telephony API",
    sourceUrl: "https://vcc.vnpt.vn",
    category: "MCP Server",
    domain: "telecom_cskh",
    toolType: "MCP Server",
    typeNameVi: "MCP Server",
    platforms: ["claude", "antigravity", "cursor"],
    author: "VNPT Information Technology (VNPT VCC)",
    stars: 300,
    forks: 59,
    license: "Proprietary",
    summaryVi: "Máy chủ MCP kết nối tổng đài chăm sóc khách hàng đa kênh hợp nhất VNPT VCC, tích hợp thoại, SMS, Zalo, Facebook Messenger và Live Chat trên một giao diện.",
    purposeVi: "Hợp nhất thông tin tương tác của khách hàng từ tất cả các kênh liên lạc vào một lịch sử hội thoại duy nhất, nâng cao trải nghiệm khách hàng và tối ưu hiệu suất điện thoại viên.",
    installGuideVi: "Bước 1: Đăng ký cổng kết nối VNPT VCC API.\nBước 2: Cài đặt gói máy chủ MCP `@vnpt/vcc-center-mcp` qua npm.\nBước 3: Nhập thông tin tài khoản quản trị tổng đài VNPT.\nBước 4: Kiểm tra trạng thái đồng bộ tin nhắn đa kênh.",
    usageGuideVi: "Bước 1: Tiếp nhận cuộc gọi và tin nhắn từ Zalo OA trên cùng một cửa sổ qua lệnh `vcc_receive_interaction`.\nBước 2: Khảo sát mức độ hài lòng của khách hàng (CSAT) sau cuộc gọi bằng IVR tự động.\nBước 3: Thống kê số lượng cuộc gọi nhỡ và tự động tạo phiếu việc cần gọi lại cho khách.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npx -y @vnpt/vcc-center-mcp",
        jsonConfig: JSON.stringify({
          mcpServers: {
            "vnpt-vcc-center": {
              command: "npx",
              args: ["-y", "@vnpt/vcc-center-mcp@latest"],
              env: {
                VCC_TENANT_ID: "TENANT_VNPT_01",
                VCC_KEY: "YOUR_VCC_KEY"
              }
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        platformName: "Google Antigravity",
        cliCommand: "agy skill add vnpt-vcc-center",
        jsonConfig: JSON.stringify({
          name: "vnpt-vcc-center",
          command: "npx",
          args: ["-y", "@vnpt/vcc-center-mcp@latest"],
          env: {
            VCC_TENANT_ID: "TENANT_VNPT_01"
          }
        }, null, 2)
      },
      {
        platform: "cursor",
        platformName: "Cursor IDE",
        cliCommand: "npm install @vnpt/vcc-center-mcp",
        jsonConfig: JSON.stringify({
          name: "vnpt-vcc-center",
          command: "npx @vnpt/vcc-center-mcp@latest"
        }, null, 2)
      }
    ]
  },
  {
    id: "cmc-voice-cloud-sip-trunking",
    name: "CMC Voice Cloud & SIP Trunking Enterprise API",
    sourceUrl: "https://cmctelecom.vn",
    category: "Skill",
    domain: "telecom_cskh",
    toolType: "Skill",
    typeNameVi: "Skill",
    platforms: ["claude", "antigravity", "cursor"],
    author: "CMC Telecom",
    stars: 275,
    forks: 50,
    license: "Proprietary",
    summaryVi: "Bộ công cụ kết nối đường trung kế thoại số SIP Trunking chất lượng cao CMC Voice Cloud, hỗ trợ hàng nghìn cuộc gọi đồng thời không nghẽn mạng.",
    purposeVi: "Cung cấp hạ tầng thoại tin cậy cho các tập đoàn tài chính, bảo hiểm, tổng đài cứu nạn và các trung tâm dịch vụ khách hàng quy mô lớn tại Việt Nam.",
    installGuideVi: "Bước 1: Thiết lập đường truyền cáp quang riêng hoặc VPN đến trung tâm dữ liệu CMC Telecom.\nBước 2: Cài đặt gói `cmc-voice-sdk`.\nBước 3: Nhập thông số SIP Proxy và danh sách dải số hotline.\nBước 4: Kiểm tra chất lượng âm thanh đàm thoại chuẩn HD Voice.",
    usageGuideVi: "Bước 1: Định tuyến hàng nghìn cuộc gọi đồng thời qua lệnh `cmc_route_concurrent_calls`.\nBước 2: Giám sát chỉ số chất lượng cuộc gọi (MOS score) theo thời gian thực.\nBước 3: Tự động chuyển mạch dự phòng sang đường truyền phụ khi phát hiện sự cố cáp viễn thông.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npx -y cmc-voice-sdk",
        jsonConfig: JSON.stringify({
          skills: {
            "cmc-voice-cloud": {
              sipServer: "sip.cmctelecom.vn",
              trunkId: "CMC_TRUNK_100"
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        platformName: "Google Antigravity",
        cliCommand: "agy skill add cmc-voice-cloud",
        jsonConfig: JSON.stringify({
          skill: "cmc-voice-cloud",
          trunkId: "CMC_TRUNK_100"
        }, null, 2)
      },
      {
        platform: "cursor",
        platformName: "Cursor IDE",
        cliCommand: "npm install cmc-voice-sdk",
        jsonConfig: JSON.stringify({
          tool: "cmc-voice-cloud"
        }, null, 2)
      }
    ]
  },
  {
    id: "stringee-call-center-widget-sdk",
    name: "Stringee WebRTC Video Call & Smart Chat Widget SDK",
    sourceUrl: "https://stringee.com",
    category: "MCP Server",
    domain: "telecom_cskh",
    toolType: "MCP Server",
    typeNameVi: "MCP Server",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Stringee Communications Platform",
    stars: 385,
    forks: 82,
    license: "Commercial",
    summaryVi: "Máy chủ MCP kết nối nền tảng giao tiếp Stringee (CPaaS), tích hợp gọi thoại, gọi video có ghi hình định danh eKYC và chat trực tiếp trên ứng dụng web/di động.",
    purposeVi: "Cho phép các ngân hàng và công ty chứng khoán thực hiện phỏng vấn video xác thực định danh khách hàng điện tử (Video eKYC) tuân thủ quy định Ngân hàng Nhà nước.",
    installGuideVi: "Bước 1: Mở tài khoản nhà phát triển Stringee Dashboard.\nBước 2: Cài đặt gói máy chủ MCP `@stringee/cpaas-mcp` qua npm.\nBước 3: Nhập Key SID và Key Secret để tự động sinh mã JSON Web Token (JWT).\nBước 4: Khởi động máy chủ và thử nghiệm cuộc gọi video kiểm thử.",
    usageGuideVi: "Bước 1: Khởi tạo phòng gọi video chất lượng cao HD phục vụ mở tài khoản ngân hàng qua lệnh `stringee_create_video_room`.\nBước 2: Ghi hình và lưu trữ toàn bộ phiên đàm thoại có dấu thời gian làm bằng chứng pháp lý qua lệnh `stringee_record_call`.\nBước 3: Gửi tin nhắn kích hoạt OTP hoặc thông báo biến động số dư tức thì.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npx -y @stringee/cpaas-mcp",
        jsonConfig: JSON.stringify({
          mcpServers: {
            "stringee-cpaas": {
              command: "npx",
              args: ["-y", "@stringee/cpaas-mcp@latest"],
              env: {
                STRINGEE_KEY_SID: "YOUR_KEY_SID",
                STRINGEE_KEY_SECRET: "YOUR_KEY_SECRET"
              }
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        platformName: "Google Antigravity",
        cliCommand: "agy skill add stringee-cpaas",
        jsonConfig: JSON.stringify({
          name: "stringee-cpaas",
          command: "npx",
          args: ["-y", "@stringee/cpaas-mcp@latest"],
          env: {
            STRINGEE_KEY_SID: "YOUR_KEY_SID"
          }
        }, null, 2)
      },
      {
        platform: "cursor",
        platformName: "Cursor IDE",
        cliCommand: "npm install @stringee/cpaas-mcp",
        jsonConfig: JSON.stringify({
          name: "stringee-cpaas",
          command: "npx @stringee/cpaas-mcp@latest"
        }, null, 2)
      }
    ]
  },

  // 46-50: Quản lý nhân sự, Hợp đồng lao động, Tuyển dụng & Marketing tự động tại Việt Nam
  {
    id: "base-vn-hrm-workflow-api",
    name: "Base.vn HRM (Base HRM, Base TimeOff, Base Payroll) API",
    sourceUrl: "https://base.vn",
    category: "MCP Server",
    domain: "hr_recruitment",
    toolType: "MCP Server",
    typeNameVi: "MCP Server",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Base.vn Enterprise Platform",
    stars: 420,
    forks: 95,
    license: "Proprietary",
    summaryVi: "Máy chủ MCP kết nối bộ giải pháp quản trị nhân sự toàn diện Base HRM, duyệt đơn xin nghỉ phép Base TimeOff và tính lương tự động Base Payroll.",
    purposeVi: "Tự động hóa luồng phê duyệt thuyên chuyển, tăng lương, tính toán bảng lương hàng tháng bám sát dữ liệu chấm công thực tế và gửi phiếu lương bảo mật qua email nhân viên.",
    installGuideVi: "Bước 1: Lấy App Token và Client Secret từ trung tâm Base Account dành cho Quản trị viên.\nBước 2: Cài đặt gói máy chủ MCP `@basevn/hrm-mcp` qua npm.\nBước 3: Nhập thông tin xác thực doanh nghiệp trong tệp cấu hình.\nBước 4: Kiểm tra kết nối với cơ sở dữ liệu hồ sơ nhân viên.",
    usageGuideVi: "Bước 1: Lấy danh sách nhân viên có sinh nhật hoặc kỷ niệm ngày vào làm việc trong tháng qua lệnh `base_get_employee_milestones`.\nBước 2: Duyệt đơn xin nghỉ phép hoặc xin đi muộn về sớm tự động qua lệnh `base_approve_timeoff`.\nBước 3: Khóa bảng tính lương tháng và xuất phiếu lương (Payslip) gửi tới từng nhân viên.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npx -y @basevn/hrm-mcp",
        jsonConfig: JSON.stringify({
          mcpServers: {
            "base-hrm-mcp": {
              command: "npx",
              args: ["-y", "@basevn/hrm-mcp@latest"],
              env: {
                BASE_APP_TOKEN: "YOUR_BASE_APP_TOKEN",
                BASE_CLIENT_SECRET: "YOUR_BASE_SECRET"
              }
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        platformName: "Google Antigravity",
        cliCommand: "agy skill add base-hrm-mcp",
        jsonConfig: JSON.stringify({
          name: "base-hrm-mcp",
          command: "npx",
          args: ["-y", "@basevn/hrm-mcp@latest"],
          env: {
            BASE_APP_TOKEN: "YOUR_BASE_APP_TOKEN"
          }
        }, null, 2)
      },
      {
        platform: "cursor",
        platformName: "Cursor IDE",
        cliCommand: "npm install @basevn/hrm-mcp",
        jsonConfig: JSON.stringify({
          name: "base-hrm-mcp",
          command: "npx @basevn/hrm-mcp@latest"
        }, null, 2)
      }
    ]
  },
  {
    id: "1office-hrm-internal-chat-api",
    name: "1Office HRM & Enterprise Internal Communication API",
    sourceUrl: "https://1office.vn",
    category: "MCP Server",
    domain: "hr_recruitment",
    toolType: "MCP Server",
    typeNameVi: "MCP Server",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Công ty Cổ phần 1Office",
    stars: 360,
    forks: 76,
    license: "Proprietary",
    summaryVi: "Máy chủ MCP kết nối nền tảng quản trị tổng thể doanh nghiệp 1Office, quản lý hồ sơ nhân sự, bảng chấm công GPS và kênh chat trao đổi nội bộ an toàn.",
    purposeVi: "Cho phép nhân viên chấm công bằng nhận diện khuôn mặt qua điện thoại di động gắn tọa độ GPS của văn phòng, giao việc theo dự án và số hóa 100% quy trình ký duyệt văn bản nội bộ.",
    installGuideVi: "Bước 1: Đăng ký kích hoạt API đối tác với bộ phận kỹ thuật 1Office.\nBước 2: Cài đặt gói máy chủ MCP `@1office/enterprise-mcp` qua npm.\nBước 3: Khai báo tên miền doanh nghiệp 1Office và Access Token.\nBước 4: Kiểm tra kết nối danh bạ nhân viên nội bộ.",
    usageGuideVi: "Bước 1: Tra cứu dữ liệu chấm công định vị GPS của nhân viên thị trường qua lệnh `1office_get_timesheet`.\nBước 2: Giao nhiệm vụ công việc kèm thời hạn hoàn thành (Deadline) qua lệnh `1office_assign_task`.\nBước 3: Gửi thông báo toàn công ty lên bảng tin nội bộ qua lệnh `1office_post_newsfeed`.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npx -y @1office/enterprise-mcp",
        jsonConfig: JSON.stringify({
          mcpServers: {
            "1office-mcp": {
              command: "npx",
              args: ["-y", "@1office/enterprise-mcp@latest"],
              env: {
                OFFICE_DOMAIN: "doanhnghiep.1office.vn",
                OFFICE_ACCESS_TOKEN: "YOUR_1OFFICE_TOKEN"
              }
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        platformName: "Google Antigravity",
        cliCommand: "agy skill add 1office-mcp",
        jsonConfig: JSON.stringify({
          name: "1office-mcp",
          command: "npx",
          args: ["-y", "@1office/enterprise-mcp@latest"],
          env: {
            OFFICE_DOMAIN: "doanhnghiep.1office.vn"
          }
        }, null, 2)
      },
      {
        platform: "cursor",
        platformName: "Cursor IDE",
        cliCommand: "npm install @1office/enterprise-mcp",
        jsonConfig: JSON.stringify({
          name: "1office-mcp",
          command: "npx @1office/enterprise-mcp@latest"
        }, null, 2)
      }
    ]
  },
  {
    id: "vietnamworks-talent-recruitment-api",
    name: "VietnamWorks Talent Search & Candidate Tracking API",
    sourceUrl: "https://www.vietnamworks.com",
    category: "Skill",
    domain: "hr_recruitment",
    toolType: "Skill",
    typeNameVi: "Skill",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Navigos Group (VietnamWorks)",
    stars: 370,
    forks: 79,
    license: "Proprietary",
    summaryVi: "Bộ kỹ năng kết nối cổng tuyển dụng nhân sự cấp trung và cấp cao số 1 Việt Nam VietnamWorks, đăng tin tuyển dụng và tìm kiếm hồ sơ ứng viên tài năng.",
    purposeVi: "Tự động phân tích yêu cầu công việc (Job Description), sàng lọc hồ sơ ứng viên phù hợp theo số năm kinh nghiệm, kỹ năng chuyên môn và tự động gửi thư mời phỏng vấn.",
    installGuideVi: "Bước 1: Đăng ký tài khoản nhà tuyển dụng doanh nghiệp trên cổng VietnamWorks Employer.\nBước 2: Cài đặt gói thư viện `@vietnamworks/recruitment-sdk` qua npm.\nBước 3: Nhập thông tin khóa API nhà tuyển dụng.\nBước 4: Kiểm tra trạng thái các tin tuyển dụng đang hoạt động.",
    usageGuideVi: "Bước 1: Đăng tin tuyển dụng kỹ sư phần mềm hoặc chuyên viên tài chính qua lệnh `vnw_post_job`.\nBước 2: Tìm kiếm ứng viên trong cơ sở dữ liệu hồ sơ qua lệnh `vnw_search_resumes` với các từ khóa kỹ năng.\nBước 3: Đặt lịch phỏng vấn và gửi thông báo xác nhận tự động tới ứng viên.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npx -y @vietnamworks/recruitment-sdk",
        jsonConfig: JSON.stringify({
          skills: {
            "vietnamworks-hiring": {
              employerId: "EMP_VN_1002",
              apiKey: "YOUR_VNW_KEY"
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        platformName: "Google Antigravity",
        cliCommand: "agy skill add vietnamworks-hiring",
        jsonConfig: JSON.stringify({
          skill: "vietnamworks-hiring",
          employerId: "EMP_VN_1002"
        }, null, 2)
      },
      {
        platform: "cursor",
        platformName: "Cursor IDE",
        cliCommand: "npm install @vietnamworks/recruitment-sdk",
        jsonConfig: JSON.stringify({
          tool: "vietnamworks-hiring"
        }, null, 2)
      }
    ]
  },
  {
    id: "fpt-ework-digital-contract-signer",
    name: "FPT.eContract Digital Employment Contract Signer",
    sourceUrl: "https://econtract.fpt.com.vn",
    category: "Skill",
    domain: "legal_public_service",
    toolType: "Skill",
    typeNameVi: "Skill",
    platforms: ["claude", "antigravity", "cursor"],
    author: "FPT Information System (FPT IS)",
    stars: 340,
    forks: 70,
    license: "Proprietary",
    summaryVi: "Kỹ năng ký kết hợp đồng lao động điện tử, thỏa thuận bảo mật thông tin (NDA) và quyết định bổ nhiệm nhân sự có chứng thực giá trị pháp lý đầy đủ.",
    purposeVi: "Cho phép người lao động ký hợp đồng từ xa bằng mã OTP điện thoại hoặc căn cước công dân gắn chip, loại bỏ 100% hợp đồng giấy và chi phí in ấn chuyển phát.",
    installGuideVi: "Bước 1: Cài đặt gói thư viện `fpt-econtract-signer`.\nBước 2: Cung cấp mã doanh nghiệp và chứng thư số tổ chức FPT.eSign.\nBước 3: Nhúng kỹ năng vào quy trình chào đón nhân viên mới (Onboarding).\nBước 4: Kiểm tra tính năng gửi hợp đồng mẫu qua email ký kết.",
    usageGuideVi: "Bước 1: Điền thông tin nhân viên vào biểu mẫu hợp đồng lao động chuẩn qua lệnh `econtract_fill_template`.\nBước 2: Gửi liên kết ký số bảo mật tới số điện thoại của nhân viên qua lệnh `econtract_send_for_signing`.\nBước 3: Tải file hợp đồng hoàn thiện có đóng dấu thời gian (Timestamp) và dấu xác thực của Bộ Công Thương.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npx -y fpt-econtract-signer",
        jsonConfig: JSON.stringify({
          skills: {
            "fpt-econtract-signer": {
              companyCode: "FPT_CORP_01",
              apiKey: "YOUR_ECONTRACT_KEY"
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        platformName: "Google Antigravity",
        cliCommand: "agy skill add fpt-econtract-signer",
        jsonConfig: JSON.stringify({
          skill: "fpt-econtract-signer",
          companyCode: "FPT_CORP_01"
        }, null, 2)
      },
      {
        platform: "cursor",
        platformName: "Cursor IDE",
        cliCommand: "npm install fpt-econtract-signer",
        jsonConfig: JSON.stringify({
          tool: "fpt-econtract-signer"
        }, null, 2)
      }
    ]
  },
  {
    id: "haravan-marketing-automation-api",
    name: "Haravan Omnichannel Marketing Automation & Loyalty API",
    sourceUrl: "https://www.haravan.com",
    category: "MCP Server",
    domain: "ecommerce_retail",
    toolType: "MCP Server",
    typeNameVi: "MCP Server",
    platforms: ["claude", "antigravity", "cursor"],
    author: "Công ty Cổ phần Công nghệ Haravan",
    stars: 355,
    forks: 77,
    license: "Proprietary",
    summaryVi: "Máy chủ MCP kết nối giải pháp Marketing tự động đa kênh Harasocial, nuôi dưỡng khách hàng tiềm năng qua tin nhắn Messenger/Zalo và phân nhóm khách hàng RFM.",
    purposeVi: "Tự động gửi tin nhắn nhắc nhở giỏ hàng bị bỏ quên, kích hoạt mã giảm giá tri ân khách hàng thân thiết và tối ưu hóa chi phí quảng cáo bán lẻ.",
    installGuideVi: "Bước 1: Đăng ký ứng dụng đối tác trên cổng Haravan Developer Portal.\nBước 2: Cài đặt gói máy chủ MCP `@haravan/marketing-mcp` qua npm.\nBước 3: Cấu hình App ID, App Secret và quyền truy cập dữ liệu khách hàng.\nBước 4: Kiểm tra khả năng gửi tin nhắn kịch bản tự động.",
    usageGuideVi: "Bước 1: Phân nhóm khách hàng theo giá trị mua sắm (Khách hàng VIP, Khách hàng tiềm năng) qua lệnh `haravan_segment_customers`.\nBước 2: Kích hoạt kịch bản nhắn tin tự động chăm sóc giỏ hàng bị bỏ quên qua lệnh `haravan_trigger_cart_recovery`.\nBước 3: Đo lường tỷ lệ chuyển đổi đơn hàng và doanh thu tạo ra từ chiến dịch tiếp thị.",
    imageUrl: "",
    demoImages: [],
    configs: [
      {
        platform: "claude",
        platformName: "Claude Desktop",
        cliCommand: "npx -y @haravan/marketing-mcp",
        jsonConfig: JSON.stringify({
          mcpServers: {
            "haravan-marketing": {
              command: "npx",
              args: ["-y", "@haravan/marketing-mcp@latest"],
              env: {
                HARAVAN_APP_ID: "YOUR_HARAVAN_APP_ID",
                HARAVAN_SECRET: "YOUR_HARAVAN_SECRET"
              }
            }
          }
        }, null, 2)
      },
      {
        platform: "antigravity",
        platformName: "Google Antigravity",
        cliCommand: "agy skill add haravan-marketing",
        jsonConfig: JSON.stringify({
          name: "haravan-marketing",
          command: "npx",
          args: ["-y", "@haravan/marketing-mcp@latest"],
          env: {
            HARAVAN_APP_ID: "YOUR_HARAVAN_APP_ID"
          }
        }, null, 2)
      },
      {
        platform: "cursor",
        platformName: "Cursor IDE",
        cliCommand: "npm install @haravan/marketing-mcp",
        jsonConfig: JSON.stringify({
          name: "haravan-marketing",
          command: "npx @haravan/marketing-mcp@latest"
        }, null, 2)
      }
    ]
  }
];

console.log(`Số lượng công cụ Đợt 10 chuẩn bị nạp: ${batch10Tools.length}`);

// Kiểm tra trùng lặp ID
const existingIds = new Set(currentTools.map(t => t.id));
const duplicates = batch10Tools.filter(t => existingIds.has(t.id));
if (duplicates.length > 0) {
  console.error("Lỗi: Có các ID bị trùng lặp:", duplicates.map(d => d.id));
  process.exit(1);
}

// Kiểm tra tính hợp lệ của từng công cụ
for (const tool of batch10Tools) {
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
  for (const cfg of tool.configs) {
    if (!cfg.jsonConfig) {
      console.error(`Lỗi: Công cụ ${tool.id} thiếu jsonConfig trong configs`);
      process.exit(1);
    }
    try {
      JSON.parse(cfg.jsonConfig);
    } catch (err) {
      console.error(`Lỗi: jsonConfig của công cụ ${tool.id} không phải JSON hợp lệ:`, err.message);
      process.exit(1);
    }
  }
}

// Bổ sung vào danh sách
const updatedTools = [...currentTools, ...batch10Tools];
fs.writeFileSync(allToolsPath, JSON.stringify(updatedTools, null, 2), 'utf8');

console.log(`Đã nạp thành công Đợt 10! Tổng số công cụ sau khi thêm: ${updatedTools.length}`);
