const fs = require('fs');
const path = require('path');

const toolsPath = path.join(__dirname, '..', 'src', 'data', 'allTools.json');
console.log('Đang đọc tệp dữ liệu:', toolsPath);

const tools = JSON.parse(fs.readFileSync(toolsPath, 'utf8'));
console.log(`Tổng số công cụ trong hệ thống: ${tools.length}`);

// Định nghĩa README tùy chỉnh đặc biệt cho các kho lưu trữ trọng điểm
const customReadmes = {
  'vibecoding-skill-dev-lifecycle': `# Kỹ Năng VibeCoding Chuẩn: Quy Trình Phát Triển Phần Mềm Có Sự Hỗ Trợ Của Trí Tuệ Nhân Tạo

> Bộ quy chuẩn kỹ thuật và kỹ năng phát triển phần mềm chuẩn mực cho AI Coding Assistant (Antigravity & Claude Code), định nghĩa 13 giai đoạn phát triển phần mềm chặt chẽ từ ý tưởng đến bảo trì.

## 1. Tổng Quan Dự Án
VibeCoding Skill là bộ kỹ năng hệ thống hướng dẫn trí tuệ nhân tạo và lập trình viên tuân thủ nghiêm ngặt quy trình kỹ nghệ phần mềm chuyên nghiệp. Bộ kỹ năng xóa bỏ hoàn toàn tình trạng lập trình tự phát, mã nguồn rác hoặc thiếu kiểm soát khi ứng dụng AI vào dự án thực tế.

## 2. Nguyên Tắc Cốt Lõi Bắt Buộc
1. **Nguyên tắc giao tiếp và hành văn:** Không viết tắt, không viết rườm rà, tập trung trực tiếp vào giải pháp kỹ thuật, không tự bổ sung ghi chú không cần thiết, sử dụng 100% tiếng Việt chuẩn.
2. **Nguyên tắc định danh tệp:** Đánh số thứ tự 2 chữ số (\`01_...\`, \`02_...\`), toàn bộ nội dung bằng tiếng Việt, duy trì tệp mục lục \`index.md\`.
3. **Phân định vai trò:** Con người quyết định mục đích và nghiệp vụ; AI hỗ trợ phương pháp và thực thi. AI tuyệt đối không tự ý thay đổi quyết định nghiệp vụ đã phê duyệt.
4. **Không suy đoán:** Khi thiếu dữ liệu hoặc yêu cầu mâu thuẫn, AI phải dừng lại, chỉ rõ vấn đề, đề xuất phương án và chờ con người phê duyệt.
5. **Không phá vỡ dự án và không xóa chức năng:** Không phá vỡ API, cơ sở dữ liệu, giao diện; không xóa bỏ mã nguồn nếu không có yêu cầu rõ ràng.
6. **Không tự ý phát sinh chức năng:** Chỉ thực hiện đúng phạm vi được duyệt. Khi có ý tưởng mới, chỉ dừng ở mức đề xuất.
7. **Xây dựng từng bước nhỏ - Xác minh - Tiếp tục:** Chia nhỏ nhiệm vụ: Sản phẩm -> Phân hệ -> Tính năng -> Nhiệm vụ. Hoàn thành kiểm thử và nghiệm thu từng bước.
8. **Điều kiện hoàn thành:** Phải đáp ứng đủ 10 tiêu chí: Yêu cầu + Nghiệp vụ + Mã nguồn + Kiểm thử + Bảo mật + Triển khai + Bảo trì + Rà soát + Nghiệm thu + Cập nhật tài liệu.

## 3. Quy Trình 13 Giai Đoạn VibeCode Chuẩn
- **Giai đoạn 01:** Xác định ý tưởng (\`01_TONG_QUAN_DU_AN.md\`)
- **Giai đoạn 02:** Xác định phạm vi (\`02_PHAM_VI_DU_AN.md\`)
- **Giai đoạn 03:** Phân tích nghiệp vụ (\`03_YEU_CAU_NGHIEP_VU.md\`, \`04_QUY_TAC_NGHIEP_VU.md\`, \`05_VAI_TRO_NGUOI_DUNG.md\`, \`06_LUONG_NGHIEP_VU.md\`)
- **Giai đoạn 04:** Đặc tả yêu cầu (\`07_YEU_CAU_CHUC_NANG.md\`, \`08_TIEU_CHI_NGHIEM_THU.md\`)
- **Giai đoạn 05:** Thiết kế hệ thống (\`09_KIEN_TRUC_HE_THONG.md\`, \`10_CONG_NGHE_SU_DUNG.md\`)
- **Giai đoạn 06:** Thiết kế giao diện (\`11_DAC_TA_GIAO_DIEN.md\`, \`12_QUY_CHUAN_THIET_KE.md\`)
- **Giai đoạn 07:** Thiết kế dữ liệu và API (\`13_CO_SO_DU_LIEU.md\`, \`14_DAC_TA_API.md\`)
- **Giai đoạn 08:** Chuẩn bị môi trường AI (\`15_QUY_TAC_PHAT_TRIEN_AI.md\`, \`16_CHI_DAN_HE_THONG_AI.md\`)
- **Giai đoạn 09:** Xây dựng theo module
- **Giai đoạn 10:** Kiểm thử và kiểm soát chất lượng (\`17_KE_HOACH_KIEM_THU.md\`, \`18_KICH_BAN_KIEM_THU.md\`)
- **Giai đoạn 11:** Bảo mật hệ thống (\`19_AN_TOAN_BAO_MAT.md\`)
- **Giai đoạn 12:** Triển khai phát hành (\`20_QUY_TRINH_TRIEN_KHAI.md\`, \`22_LICH_SU_THAY_DOI.md\`)
- **Giai đoạn 13:** Vận hành và bảo trì (\`21_KE_HOACH_BAO_TRI.md\`)

## 4. Hướng Dẫn Cài Đặt
### Cài đặt cho Claude Code:
Sao chép tệp \`SKILL.md\` vào thư mục cấu hình kỹ năng cá nhân:
\`\`\`bash
mkdir -p ~/.claude/skills/vibecoding
cp SKILL.md ~/.claude/skills/vibecoding/SKILL.md
\`\`\`

### Cài đặt cho Antigravity:
Đặt tệp cấu hình vào \`~/.gemini/antigravity/builtin/skills/vibecoding/SKILL.md\` hoặc thư mục plugin vòng đời phát triển phần mềm.

## 5. Giấy Phép & Tác Giả
- **Tác giả:** vinhngtienmdb-ui & Cộng đồng AI HUB VN
- **Giấy phép:** MIT License
`,

  'mads-lorentzen-ai-job-search': `# AI Job Search: Khung Tự Động Hóa Tìm Kiếm Việc Làm Toàn Diện Bằng Claude Code

> Bộ công cụ AI tự động hóa toàn bộ quy trình tìm kiếm việc làm, tối ưu hóa hồ sơ và chuẩn bị phỏng vấn, chạy cục bộ trên máy tính cá nhân bằng Claude Code với hơn 60.000 lượt yêu thích trên GitHub.

## 1. Giới Thiệu Dự Án
Dự án được xây dựng bởi Mads Lorentzen, một nhà địa vật lý tại Đan Mạch sau khi bị cắt giảm vị trí vào cuối năm 2025. Anh đã tự phát triển khung ứng dụng này để điều hành chiến dịch tìm việc của chính mình. Kết quả thực tế:
- Tự động tạo 69 bộ hồ sơ ứng tuyển (CV và Cover Letter) được thiết kế riêng biệt cho từng vị trí.
- Đạt 20 buổi phỏng vấn tuyển dụng trực tiếp.
- Ký kết hợp đồng thành công và hiện đang làm việc với vai trò Kỹ sư AI.

## 2. Các Khẩu Lệnh Cốt Lõi Của Hệ Thống
- \`/setup\`: Thiết lập hồ sơ năng lực cá nhân từ CV hiện có, hồ sơ LinkedIn hoặc qua phỏng vấn vấn đáp nhanh.
- \`/scrape\`: Tự động quét và thu thập dữ liệu từ các cổng tuyển dụng, lọc bỏ tin tuyển dụng trùng lặp và chấm điểm mức độ phù hợp.
- \`/apply\`: Đánh giá mức độ khớp kỹ năng và tự động soạn thảo hồ sơ CV, thư xin việc cá nhân hóa cho từng tin tuyển dụng.
- \`Phản biện độc lập\`: Tác tử AI thứ hai đóng vai chuyên gia tuyển dụng, nghiên cứu văn hóa công ty và phản biện bản nháp trước khi xuất bản.
- \`Biên dịch tài liệu\`: Tự động biên dịch tệp PDF, kiểm tra lỗi dàn trang và kiểm tra độ tương thích với hệ thống lọc hồ sơ tự động (ATS).
- \`/interview\`: Chuẩn bị tài liệu ôn tập và câu hỏi tình huống theo từng vòng phỏng vấn, hỗ trợ phỏng vấn thử có chấm điểm.
- \`/rank\`, \`/outcome\`, \`/upskill\`: Đánh giá năng lực hàng loạt, theo dõi trạng thái phản hồi và xác định khoảng trống kỹ năng cần học thêm.
- \`/add-portal\`: Bổ sung cổng thông tin việc làm mới phù hợp với từng quốc gia hoặc thị trường mục tiêu.

## 3. Hướng Dẫn Cài Đặt & Sử Dụng
### Yêu cầu tiên quyết:
- Đã cài đặt Claude Code trên hệ thống máy tính cục bộ.
- Tài khoản Claude có gói đăng ký Pro/Max/Team hoặc có hạn mức sử dụng API Claude.
- Node.js phiên bản từ 18 trở lên và môi trường biên dịch tệp PDF (typst hoặc pandoc).

### Các bước cài đặt:
\`\`\`bash
# 1. Sao chép mã nguồn về máy cục bộ
git clone https://github.com/MadsLorentzen/ai-job-search.git
cd ai-job-search

# 2. Khởi tạo cấu hình hồ sơ cá nhân
claude
/setup
\`\`\`

## 4. Lưu Ý Quan Trọng Về Bảo Mật
Dữ liệu cá nhân, thông tin liên lạc và kinh nghiệm làm việc rất nhạy cảm. Do đó, khuyến nghị người dùng tạo kho lưu trữ riêng tư (Private Repository) khi fork dự án để bảo đảm dữ liệu của mình không bị công khai trên Internet.

## 5. Giấy Phép & Bản Quyền
- **Tác giả:** Mads Lorentzen
- **Giấy phép:** MIT License
`,

  'paperclipai-paperclip': `# Paperclip: Ứng Dụng Mã Nguồn Mở Quản Lý Tác Tử Trí Tuệ Nhân Tạo Doanh Nghiệp

> Nền tảng trung tâm giúp quản lý, giám sát và điều phối các tác tử AI làm việc trong môi trường thực tế tại doanh nghiệp.

## 1. Giới Thiệu Dự Án
Paperclip là một ứng dụng mã nguồn mở giải quyết bài toán quản trị các tác tử trí tuệ nhân tạo (AI Agents). Khi số lượng tác tử AI tăng lên trong quy trình vận hành doanh nghiệp, việc theo dõi trạng thái, phân quyền, kiểm soát chi phí và giám sát hiệu quả làm việc trở nên cấp thiết. Paperclip đóng vai trò như bảng điều khiển tập trung cho toàn bộ lực lượng tác tử AI của tổ chức.

## 2. Tính Năng Nổi Bật
- **Quản lý danh mục tác tử tập trung:** Đăng ký, kích hoạt, tạm dừng hoặc thu hồi quyền truy cập của từng tác tử một cách trực quan.
- **Giám sát hoạt động thời gian thực:** Ghi nhật ký thực thi (audit log), theo dõi số lượng token tiêu thụ và chi phí phát sinh theo từng phòng ban.
- **Phân quyền và bảo mật nâng cao:** Kiểm soát quyền đọc, ghi, gọi công cụ (tool calling) và truy cập cơ sở dữ liệu của từng tác tử.
- **Khả năng tương thích mở rộng:** Kết nối liền mạch với các mô hình và framework phổ biến như Claude Code, OpenAI Swarm, LangChain, AutoGen và các mô hình cục bộ.

## 3. Hướng Dẫn Cài Đặt
### Khởi chạy bằng Docker Compose:
\`\`\`bash
git clone https://github.com/paperclipai/paperclip.git
cd paperclip
docker compose up -d
\`\`\`
Sau khi khởi chạy thành công, truy cập giao diện quản trị tại địa chỉ: \`http://localhost:3000\`.

## 4. Giấy Phép Bản Quyền
- **Tác giả:** Paperclip AI Team
- **Giấy phép:** Apache 2.0 / MIT
`,

  'vercel-labs-find-skills': `# Find Skills: Kỹ Năng Tìm Kiếm Và Khám Phá Công Cụ Tự Động Cho Claude Code

> Tiện ích mở rộng cho phép lập trình viên tìm kiếm, khảo sát và tích hợp kỹ năng (skills), máy chủ MCP và lệnh tắt tự động từ hệ sinh thái mã nguồn mở.

## 1. Giới Thiệu Dự Án
Find Skills được phát triển bởi Vercel Labs nhằm đơn giản hóa quy trình tìm kiếm và cài đặt các kỹ năng mở rộng cho Claude Code và các môi trường AI coding. Thay vì phải tự tìm kiếm thủ công trên GitHub, công cụ cho phép tra cứu bằng ngôn ngữ tự nhiên ngay trong cửa sổ dòng lệnh.

## 2. Các Tính Năng Chính
- **Tìm kiếm thông minh theo mục đích:** Nhập nhu cầu (ví dụ: "công cụ hỗ trợ Docker", "kỹ năng tối ưu hóa SQL") và hệ thống sẽ tự động đề xuất danh sách kỹ năng phù hợp nhất.
- **Cài đặt chỉ với một câu lệnh:** Tự động tải về và cấu hình tệp \`SKILL.md\` vào đúng vị trí quy định của Claude Code hoặc Antigravity.
- **Kiểm định nguồn gốc và an toàn:** Kiểm tra độ tin cậy của kho lưu trữ, số sao GitHub và giấy phép trước khi người dùng chấp thuận cài đặt.

## 3. Cách Sử Dụng
Khởi chạy câu lệnh tìm kiếm trong giao diện Claude Code:
\`\`\`bash
find-skills search "vietnamese mcp"
find-skills install <skill-name>
\`\`\`

## 4. Giấy Phép Bản Quyền
- **Tác giả:** Vercel Labs
- **Giấy phép:** MIT License
`,

  'aihub-vn-smart-mcp-gateway': `# AI HUB VN Smart MCP Gateway: Cổng Điều Phối Máy Chủ MCP Thông Minh & Bảo Mật

> Cổng kết nối và điều phối máy chủ giao thức ngữ cảnh mô hình (Model Context Protocol - MCP) thông minh, hỗ trợ bảo mật đa lớp và định tuyến ngữ cảnh tối ưu cho thị trường Việt Nam.

## 1. Giới Thiệu
AI HUB VN Smart MCP Gateway là giải pháp máy chủ MCP trung tâm do Hệ sinh thái AI HUB VN phát triển. Cổng giúp các trợ lý AI (như Antigravity, Claude Desktop, Cursor) kết nối và khai thác đồng thời hàng chục công cụ dữ liệu (PostgreSQL, Filesystem, Puppeteer, GitHub, API Tra cứu doanh nghiệp Việt Nam) mà không gây quá tải ngữ cảnh (context window).

## 2. Tính Năng Bảo Mật Vượt Trội
- **Xác thực khóa bảo mật (API Key Authentication):** Mọi yêu cầu gọi công cụ đều phải được xác thực thông qua khóa bảo mật \`aihub_sec_live_...\`.
- **Phân quyền vai trò và phạm vi:** Chỉ cho phép thực thi các lệnh đọc/ghi trên các tài nguyên được ủy quyền rõ ràng.
- **Bộ đệm thông minh và định tuyến tối ưu:** Chỉ kích hoạt các công cụ có liên quan trực tiếp đến câu hỏi của người dùng, tiết kiệm tới 70% lượng token tiêu thụ.
- **Ghi nhật ký kiểm toán (Audit Trail):** Toàn bộ các thao tác gọi công cụ, thời gian thực thi và trạng thái đều được lưu trữ phục vụ rà soát an ninh.

## 3. Hướng Dẫn Cấu Hình Tích Hợp
\`\`\`json
{
  "mcpServers": {
    "aihub-vn-smart-gateway": {
      "command": "node",
      "args": ["src/mcp-gateway/server.js"],
      "env": {
        "AIHUB_API_KEY": "aihub_sec_live_vn_production_key_2026",
        "AIHUB_REGION": "asia-southeast1",
        "NODE_ENV": "production"
      }
    }
  }
}
\`\`\`

## 4. Giấy Phép Bản Quyền
- **Tác giả:** Ban Công Nghệ Hệ Sinh Thái AI HUB VN
- **Giấy phép:** MIT License
`
};

// Hàm tạo README Markdown tiếng Việt chuẩn mực cho bất kỳ công cụ nào
function generateReadmeForTool(tool) {
  // Nếu có README tùy chỉnh đặc biệt, sử dụng ngay
  if (customReadmes[tool.id]) {
    return customReadmes[tool.id].trim();
  }

  const featuresList = (tool.featuresVi || [])
    .map(f => `- **${f}**`)
    .join('\n');

  const samplePromptsList = (tool.samplePromptsVi || [])
    .map((p, idx) => `${idx + 1}. \`"${p}"\``)
    .join('\n');

  const configsMarkdown = (tool.configs || [])
    .map(c => `### Cấu hình cho ${c.platformName} (${c.platform})
${c.cliCommand ? `**Lệnh cài đặt tự động:**\n\`\`\`bash\n${c.cliCommand}\n\`\`\`\n` : ''}
**Mẫu cấu hình JSON:**
\`\`\`json
${c.jsonConfig}
\`\`\`
`)
    .join('\n');

  const prosList = (tool.prosVi || [
    'Mã nguồn mở minh bạch, dễ dàng tích hợp và mở rộng.',
    'Tuân thủ chuẩn mực giao tiếp và cấu trúc phần mềm hiện đại.',
    'Tài liệu và hướng dẫn sử dụng tiếng Việt chi tiết, rõ ràng.',
    'Cộng đồng nhà phát triển đông đảo, liên tục được cập nhật.'
  ]).map(p => `- ✅ ${p}`).join('\n');

  const consList = (tool.consVi || [
    'Yêu cầu môi trường thực thi (Node.js/Python/Docker) phù hợp.',
    'Một số dịch vụ bên ngoài có thể yêu cầu khóa truy cập (API Key) riêng biệt.'
  ]).map(c => `- ⚠️ ${c}`).join('\n');

  const platformsFormatted = (tool.platforms || ['web'])
    .map(p => `\`${p}\``)
    .join(', ');

  const md = `# ${tool.name}

> **${tool.summaryVi || 'Tài nguyên công nghệ trí tuệ nhân tạo chuyên dụng.'}**

## 1. Giới Thiệu & Mục Đích Giải Quyết
${tool.purposeVi || tool.summaryVi || 'Công cụ hỗ trợ phát triển phần mềm và tự động hóa tác vụ trí tuệ nhân tạo.'}

- **Loại hình thành phần:** ${tool.typeNameVi || tool.toolType}
- **Lĩnh vực chuyên môn:** ${tool.categoryNameVi || tool.category}
- **Tác giả / Nhà phát triển:** ${tool.authorName || 'Cộng đồng mã nguồn mở'}
- **Giấy phép bản quyền:** ${tool.license || 'MIT License'}
- **Nền tảng hỗ trợ:** ${platformsFormatted}
- **Kho lưu trữ chính thức:** [${tool.sourceUrl}](${tool.sourceUrl})
- **Thị trường tối ưu:** ${tool.isVietnamMarket ? 'Thị trường Việt Nam & Quốc tế' : 'Thị trường Toàn cầu'}

---

## 2. Tính Năng Nổi Bật
${featuresList || '- Cung cấp giao diện kết nối tiêu chuẩn, dễ dàng tùy biến.\n- Đảm bảo hiệu năng ổn định và tính an toàn cao.'}

---

## 3. Hướng Dẫn Cài Đặt & Thiết Lập Môi Trường
${tool.installGuideVi || 'Bước 1: Kiểm tra môi trường thực thi cục bộ.\nBước 2: Tải về mã nguồn từ kho lưu trữ chính thức.\nBước 3: Cài đặt các gói phụ thuộc cần thiết.\nBước 4: Kiểm tra và kích hoạt công cụ.'}

---

## 4. Hướng Dẫn Sử Dụng & Kịch Bản Thực Tế
${tool.usageGuideVi || 'Sử dụng công cụ thông qua giao diện dòng lệnh (CLI), cấu hình MCP hoặc gọi API trực tiếp theo quy chuẩn kỹ thuật.'}

### Các Câu Lệnh / Lời Nhắc (Prompts) Mẫu Bằng Tiếng Việt
${samplePromptsList || '1. "Hướng dẫn tôi cách tích hợp và sử dụng công cụ này trong dự án thực tế."'}

---

## 5. Mẫu Cấu Hình Tích Hợp Hệ Thống
${configsMarkdown || 'Chưa có cấu hình mẫu cụ thể.'}

---

## 6. Đánh Giá Kỹ Thuật
### Ưu Điểm
${prosList}

### Giới Hạn & Điểm Cần Lưu Ý
${consList}

---

## 7. Giấy Phép & Bản Quyền
Tài nguyên được phân phối theo giấy phép **${tool.license || 'MIT'}**. Mọi quyền sở hữu trí tuệ thuộc về tác giả **${tool.authorName}**.

*Bộ tài liệu README kỹ thuật này được biên soạn và chuẩn hóa tiếng Việt bởi Hệ sinh thái AI HUB VN.*
`;

  return md.trim();
}

// Tiến hành cập nhật toàn bộ 2.221 công cụ
let updatedCount = 0;
for (const tool of tools) {
  tool.readmeVi = generateReadmeForTool(tool);
  updatedCount++;
}

console.log(`Đã tạo và cập nhật thành công README tiếng Việt cho ${updatedCount} / ${tools.length} công cụ.`);

// Lưu lại file allTools.json
fs.writeFileSync(toolsPath, JSON.stringify(tools, null, 2), 'utf8');
console.log('Đã ghi đè tệp src/data/allTools.json thành công!');
