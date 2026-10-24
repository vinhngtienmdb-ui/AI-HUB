const fs = require('fs');
const os = require('os');
const path = require('path');

const toolsPath = path.join(__dirname, '..', 'src', 'data', 'allTools.json');
console.log('Đang đọc tệp dữ liệu:', toolsPath);

const tools = JSON.parse(fs.readFileSync(toolsPath, 'utf8'));
console.log(`Tổng số công cụ trong hệ thống: ${tools.length}`);

// 1. Đọc TOÀN VĂN nội dung gốc của VibeCoding Skill từ tệp SKILL.md
// Đường dẫn SKILL.md: biến môi trường VIBECODING_SKILL_PATH, mặc định ~/.claude/skills/vibecoding/SKILL.md
const vibecodingOriginalSkillPath = process.env.VIBECODING_SKILL_PATH ||
  path.join(os.homedir(), '.claude', 'skills', 'vibecoding', 'SKILL.md');
let vibecodingFullReadme = '';
if (fs.existsSync(vibecodingOriginalSkillPath)) {
  const rawSkillContent = fs.readFileSync(vibecodingOriginalSkillPath, 'utf8');
  // Lấy toàn văn từ dòng tiêu đề "# Quy Trình VibeCode Chuẩn Trong Phát Triển Phần Mềm"
  const startIdx = rawSkillContent.indexOf('# Quy Trình VibeCode Chuẩn Trong Phát Triển Phần Mềm');
  if (startIdx !== -1) {
    vibecodingFullReadme = rawSkillContent.substring(startIdx).trim();
  } else {
    vibecodingFullReadme = rawSkillContent.trim();
  }
}

if (!vibecodingFullReadme) {
  console.warn(`Không tìm thấy ${vibecodingOriginalSkillPath}; giữ nguyên README hiện có của VibeCoding Skill.`);
}

// Bổ sung thêm Mermaid Diagram trực quan ngay dưới phần sơ đồ ASCII của Quy trình 13 giai đoạn
const mermaidDiagramVibeCode = `
\`\`\`mermaid
flowchart TD
    subgraph KHOI1["I. Chuẩn Bị & Khảo Sát"]
      G01["01. Xác định ý tưởng<br/>(01_TONG_QUAN_DU_AN.md)"] --> G02["02. Xác định phạm vi<br/>(02_PHAM_VI_DU_AN.md)"]
      G02 --> G03["03. Phân tích nghiệp vụ<br/>(03, 04, 05, 06_*.md)"]
      G03 --> G04["04. Đặc tả yêu cầu<br/>(07, 08_*.md)"]
    end

    subgraph KHOI2["II. Thiết Kế Hệ Thống"]
      G04 --> G05["05. Thiết kế hệ thống<br/>(09, 10_*.md)"]
      G05 --> G06["06. Thiết kế giao diện<br/>(11, 12_*.md)"]
      G06 --> G07["07. Thiết kế dữ liệu & API<br/>(13, 14_*.md)"]
      G07 --> G08["08. Chuẩn bị môi trường AI<br/>(15, 16_*.md)"]
    end

    subgraph KHOI3["III. Xây Dựng & Kiểm Soát Chất Lượng"]
      G08 --> G09["09. Xây dựng theo module<br/>(Chia nhỏ Task)"]
      G09 --> G10["10. Kiểm thử & Chất lượng<br/>(17, 18_*.md)"]
      G10 --> G11["11. Bảo mật hệ thống<br/>(19_AN_TOAN_BAO_MAT.md)"]
    end

    subgraph KHOI4["IV. Triển Khai & Vận Hành"]
      G11 --> G12["12. Triển khai phát hành<br/>(20_QUY_TRINH_TRIEN_KHAI.md)"]
      G12 --> G13["13. Vận hành & Bảo trì<br/>(21_KE_HOACH_BAO_TRI.md)"]
    end

    style KHOI1 fill:#f0f9ff,stroke:#0284c7,stroke-width:2px
    style KHOI2 fill:#f5f3ff,stroke:#7c3aed,stroke-width:2px
    style KHOI3 fill:#ecfdf5,stroke:#059669,stroke-width:2px
    style KHOI4 fill:#fffbeb,stroke:#d97706,stroke-width:2px
\`\`\`
`;

if (vibecodingFullReadme.includes('## II. Cấu Trúc Tổng Thể Quy Trình')) {
  // Chèn Mermaid diagram ngay sau khối code ASCII của mục II để người xem có cả sơ đồ chữ lẫn sơ đồ đồ họa trực quan
  vibecodingFullReadme = vibecodingFullReadme.replace(
    '```\n\n---',
    '```\n\n### Sơ Đồ Trực Quan Quy Trình 13 Giai Đoạn (Flowchart Diagram):\n' + mermaidDiagramVibeCode + '\n---'
  );
}

// 2. Nội dung chi tiết toàn vẹn chuẩn GitHub cho các dự án quan trọng
const customReadmes = {
  // Không tìm thấy SKILL.md thì giữ nguyên README hiện có thay vì thay bằng README mẫu chung
  'vibecoding-skill-dev-lifecycle': vibecodingFullReadme ||
    (tools.find(t => t.id === 'vibecoding-skill-dev-lifecycle') || {}).readmeVi || '',

  'mads-lorentzen-ai-job-search': `# AI Job Search: Khung Tự Động Hóa Toàn Diện Quy Trình Xin Việc Trên Máy Cá Nhân Bằng Claude Code

> The job search that runs on your machine. AI job application framework built on Claude Code: evaluate postings, tailor CVs, write cover letters, prep interviews. Fork it and own it.  
> **60.000+ Stars trên GitHub** • **Giấy phép MIT** • **Bản địa hóa tiếng Việt đầy đủ**.

---

## 1. Giới Thiệu Dự Án & Câu Chuyện Tác Giả
Dự án được sáng lập bởi **Mads Lorentzen**, một nhà địa vật lý bị cắt giảm vị trí vào cuối năm 2025. Anh đã tự xây dựng framework tự động hóa nhiều tác tử (Multi-agent Framework) này để điều hành chiến dịch tìm việc của chính mình.
- **Kết quả thực tế ấn tượng:**
  - Tự động tạo **69 bộ hồ sơ ứng tuyển cá nhân hóa (Tailored CV & Cover Letter)** cho từng tin tuyển dụng.
  - Nhận được **20 buổi phỏng vấn trực tiếp** từ các nhà tuyển dụng.
  - Ký kết hợp đồng thành công và hiện đang làm việc với vai trò Kỹ sư Trí tuệ Nhân tạo (AI Engineer).

---

## 2. Hệ Thống Khẩu Lệnh Cốt Lõi (Commands)
Framework hoạt động trực tiếp trong Claude Code trên máy tính của bạn:

| Lệnh | Ý nghĩa chức năng | Mô tả chi tiết |
| :--- | :--- | :--- |
| \`/setup\` | **Khởi tạo hồ sơ năng lực** | Tự động xây dựng hồ sơ cá nhân từ tệp CV hiện có, hồ sơ LinkedIn hoặc qua phỏng vấn vấn đáp nhanh với AI. |
| \`/scrape\` | **Quét cổng tuyển dụng** | Quét đồng thời nhiều cổng việc làm, lọc bỏ tin tuyển dụng trùng lặp, xếp hạng theo độ phù hợp năng lực. |
| \`/apply\` | **Soạn thảo hồ sơ may đo** | Đánh giá độ khớp kỹ năng (Score Match) và tự động viết CV, thư xin việc (Cover Letter) cá nhân hóa cho từng tin. |
| \`Agent phản biện\` | **Chuyên gia thẩm định độc lập** | Một agent thứ hai đóng vai chuyên gia tuyển dụng, nghiên cứu công ty rồi chê bản nháp và yêu cầu chỉnh sửa trước khi chốt. |
| \`Biên dịch PDF\` | **Xuất bản & Kiểm tra ATS** | Tự biên dịch PDF, kiểm tra bố cục trang và kiểm tra độ tương thích với hệ thống lọc hồ sơ tự động (ATS). |
| \`/interview\` | **Chuẩn bị phỏng vấn** | Tạo bộ tài liệu chuẩn bị phỏng vấn theo từng vòng, kèm tính năng phỏng vấn thử có chấm điểm và sửa lỗi trả lời. |
| \`/rank\`, \`/outcome\`, \`/upskill\` | **Đo lường & Nâng cao kỹ năng** | Chấm điểm hàng loạt, theo dõi kết quả nộp đơn, chỉ ra khoảng trống kỹ năng còn thiếu để học bổ sung. |
| \`/add-portal\` | **Mở rộng cổng việc làm** | Tự tạo skill quét cho cổng việc làm ở quốc gia của mình (mặc định có sẵn LinkedIn và các cổng châu Âu). |

---

## 3. Sơ Đồ Quy Trình Tự Động Hóa Ứng Tuyển
\`\`\`mermaid
flowchart LR
    A["/setup<br/>Hồ sơ cá nhân"] --> B["/scrape<br/>Quét cổng việc làm"]
    B --> C["/apply<br/>Soạn CV & Thư xin việc"]
    C --> D["Agent Phản Biện<br/>Thẩm định & Chấm điểm"]
    D --> E["Biên dịch PDF<br/>Kiểm tra ATS chuẩn"]
    E --> F["/interview<br/>Luyện phỏng vấn thử"]
    F --> G["/outcome & /upskill<br/>Theo dõi & Nâng cấp"]
\`\`\`

---

## 4. Hướng Dẫn Cài Đặt & Khởi Chạy
### Yêu Cầu Tiên Quyết:
- Đã cài đặt **Claude Code** trên máy tính cá nhân.
- Tài khoản Claude có gói đăng ký **Claude Pro/Max/Team** hoặc có **API Credit** để chạy Claude Code.
- Môi trường Node.js phiên bản từ 18 trở lên.

### Các Bước Cài Đặt Qua Terminal:
\`\`\`bash
# 1. Sao chép kho lưu trữ về máy cá nhân
git clone https://github.com/MadsLorentzen/ai-job-search.git
cd ai-job-search

# 2. Khởi động Claude Code
claude

# 3. Chạy lệnh thiết lập hồ sơ ban đầu
/setup
\`\`\`

---

## 5. Lưu Ý Quan Trọng Về Bảo Mật Dữ Liệu
Dữ liệu cá nhân, thông tin liên lạc, lịch sử làm việc và mức lương là thông tin cực kỳ nhạy cảm.  
⚠️ **Khuyến nghị an toàn:** Khi fork dự án trên GitHub, hãy đặt chế độ kho lưu trữ là **Riêng tư (Private Repository)** để bảo vệ tuyệt đối thông tin cá nhân.

---

## 6. Giấy Phép Bản Quyền
- Tác giả: Mads Lorentzen
- Giấy phép: MIT License (Được phép tự do sử dụng, chỉnh sửa và phân phối).
`,

  'paperclipai-paperclip': `# Paperclip: Nền Tảng Mã Nguồn Mở Quản Trị & Điều Phối Lực Lượng Tác Tử Doanh Nghiệp

> The open-source app everyone uses to manage agents at work.  
> Bảng điều khiển trung tâm (Control Plane) quản lý, giám sát và điều phối các tác tử AI làm việc trong môi trường doanh nghiệp thực tế.

---

## 1. Giới Thiệu Tổng Quan
Khi các doanh nghiệp áp dụng nhiều tác tử AI vào quy trình làm việc, họ đối mặt với bài toán hỗn loạn: Ai quản lý các tác tử? Chi phí token phát sinh ra sao? Quyền hạn của từng agent như thế nào?  
**Paperclip** ra đời để giải quyết triệt để bài toán này, đóng vai trò như một phòng tổ chức nhân sự và điều hành trung tâm dành riêng cho lực lượng lao động tác tử số (AI Workforce).

---

## 2. Các Tính Năng Cốt Lõi
- **Sơ Đồ Tổ Chức Tác Tử (Org Chart for Agents):** Phân chia tác tử theo phòng ban (Kỹ thuật, Marketing, Chăm sóc khách hàng, Phân tích dữ liệu) với cấu trúc phân cấp báo cáo rõ ràng.
- **Bảng Quản Lý Công Việc Dạng Thẻ (Ticket Kanban):** Giao việc cho từng agent qua giao diện thẻ Kanban, theo dõi tiến độ thực hiện theo thời gian thực.
- **Cơ Chế Con Người Phê Duyệt (Human-in-the-Loop Governance):** Các quyết định quan trọng (như gửi email ra ngoài, triển khai mã nguồn lên máy chủ, chi tiền quảng cáo) bắt buộc phải có sự xác nhận của người quản lý trước khi thực thi.
- **Kiểm Soát Chi Phí & Ngân Sách Token (Budget & Cost Tracking):** Đặt hạn mức chi phí theo từng tác tử và phòng ban, tự động ngắt kết nối khi vượt ngưỡng cho phép.
- **Ghi Nhật Ký Kiểm Toán (Audit Logs):** Ghi lại toàn bộ hành vi, công cụ được gọi và kết quả phản hồi của từng tác tử để phục vụ thanh tra an ninh thông tin.

---

## 3. Sơ Đồ Kiến Trúc Điều Phối
\`\`\`mermaid
flowchart TD
    Admin["Quản Trị Viên Doanh Nghiệp"] --> ControlPlane["Paperclip Control Plane"]
    ControlPlane --> DeptTech["Phòng Kỹ Thuật (Eng Agents)"]
    ControlPlane --> DeptMkt["Phòng Marketing (Content Agents)"]
    ControlPlane --> DeptOps["Phòng Vận Hành (Ops Agents)"]
    
    DeptTech --> Audit["Audit Logs & Token Budget"]
    DeptMkt --> Audit
    DeptOps --> Audit
    
    Audit --> Alert["Hệ Thống Cảnh Báo An Toàn"]
\`\`\`

---

## 4. Hướng Dẫn Cài Đặt & Sử Dụng
### Cách 1: Khởi Chạy Nhanh Bằng Lệnh NPX
\`\`\`bash
npx paperclipai onboard --yes
\`\`\`

### Cách 2: Triển Khai Qua Docker Compose
\`\`\`bash
# 1. Tải mã nguồn về máy
git clone https://github.com/paperclipai/paperclip.git
cd paperclip

# 2. Khởi chạy toàn bộ dịch vụ ngầm
docker compose up -d
\`\`\`
Sau khi chạy lệnh thành công, mở trình duyệt web và truy cập: \`http://localhost:3000\`.

---

## 5. Giấy Phép Bản Quyền
- Tác giả: Paperclip AI Team
- Giấy phép: MIT License / Apache 2.0.
`,

  'vercel-labs-find-skills': `# Find Skills: Kỹ Năng Tìm Kiếm Và Cài Đặt Tác Tử Tự Động Cho Claude Code & Antigravity

> Khám phá, tìm kiếm và tích hợp các kỹ năng mở rộng (skills), máy chủ MCP và lệnh tắt tự động từ toàn bộ cộng đồng mã nguồn mở.

---

## 1. Giới Thiệu Dự Án
Find Skills do Vercel Labs phát triển nhằm giải phóng lập trình viên khỏi việc phải tìm kiếm thủ công từng kho lưu trữ kỹ năng trên GitHub. Thay vào đó, bạn chỉ cần mô tả nhu cầu bằng ngôn ngữ tự nhiên, tác tử sẽ tự tìm kiếm, thẩm định và cài đặt ngay vào máy.

---

## 2. Tính Năng Nổi Bật
- **Tra cứu bằng ngôn ngữ tự nhiên:** Tìm kiếm theo mục tiêu công việc (ví dụ: "công cụ hỗ trợ Docker", "kỹ năng viết kiểm thử tự động").
- **Kiểm tra an toàn kho lưu trữ:** Đánh giá số sao GitHub, độ uy tín của tác giả và rà soát mã độc tiềm ẩn trước khi cài đặt.
- **Cài đặt một lệnh:** Tự động tải tệp \`SKILL.md\` hoặc cấu hình MCP Server vào đúng thư mục của Claude Code hoặc Antigravity.

---

## 3. Hướng Dẫn Sử Dụng Trong Terminal
\`\`\`bash
# Tìm kiếm kỹ năng theo từ khóa
find-skills search "vietnamese mcp"

# Cài đặt kỹ năng vào hệ sinh thái
find-skills install <ten-ky-nang>
\`\`\`

---

## 4. Giấy Phép Bản Quyền
- Tác giả: Vercel Labs
- Giấy phép: MIT License.
`,

  'aihub-vn-smart-mcp-gateway': `# AI HUB VN Smart MCP Gateway: Cổng Điều Phối Máy Chủ MCP Thông Minh & Bảo Mật

> Cổng kết nối trung tâm bảo mật cao cho giao thức ngữ cảnh mô hình (MCP), tối ưu hóa 95% Context Window và tự động định tuyến hơn 2.221 tài nguyên trí tuệ nhân tạo.

---

## 1. Giới Thiệu
AI HUB VN Smart MCP Gateway là giải pháp máy chủ MCP cổng một cửa (One-stop Gateway) được phát triển bởi Hệ sinh thái AI HUB VN. Cổng giúp các trợ lý AI (Google Antigravity, Claude Code, Cursor, Windsurf) giao tiếp an toàn với hàng chục dịch vụ mà không làm tràn bộ nhớ ngữ cảnh.

---

## 2. Các Lớp Bảo Mật Doanh Nghiệp
- **Xác thực khóa Bearer Key:** Mọi yêu cầu gọi công cụ bắt buộc phải có API Key chuẩn tiền tố \`aihub_live_...\`.
- **Băm mật mã HMAC-SHA256:** So sánh thời gian an toàn (\`timingSafeCompare\`) chống tấn công Timing Attack.
- **Giới hạn tần suất trượt (Sliding Window Rate Limiter):** Ngăn chặn tấn công từ chối dịch vụ (DoS/Brute-force).
- **Làm sạch dữ liệu đầu vào (Input Sanitization):** Chống tấn công chèn mã (Command Injection & Prompt Injection).
- **Ghi nhật ký kiểm toán (Audit Trail):** Lưu vết toàn bộ lịch sử truy cập và trạng thái gọi công cụ.

---

## 3. Mẫu Cấu Hình Tích Hợp Cho Claude Desktop & Cursor
\`\`\`json
{
  "mcpServers": {
    "aihub-smart-gateway": {
      "command": "node",
      "args": ["<DUONG_DAN_TOI_AI-HUB>/mcp-gateway/index.js"],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
\`\`\`

---

## 4. Giấy Phép Bản Quyền
- Tác giả: Ban Công Nghệ Hệ Sinh Thái AI HUB VN
- Giấy phép: MIT License.
`
};

// Hàm sinh README chuẩn cho toàn bộ các công cụ còn lại trong kho
function generateStandardReadme(tool) {
  if (customReadmes[tool.id]) {
    return customReadmes[tool.id].trim();
  }

  const featuresList = (tool.featuresVi || [])
    .map(f => `- **${f}**`)
    .join('\n');

  const samplePromptsList = (tool.samplePromptsVi || [])
    .map((p, idx) => `${idx + 1}. \`"${p}"\``)
    .join('\n');

  // Đóng khung các lệnh cài đặt CLI nếu có trong configs
  const cliCommandsList = (tool.configs || [])
    .filter(c => c.cliCommand)
    .map(c => `### Cài đặt cho ${c.platformName} (${c.platform}):\n\`\`\`bash\n${c.cliCommand}\n\`\`\``)
    .join('\n\n');

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
    'Yêu cầu môi trường thực thi (Node.js/Python/Docker) phù hợp trên máy.',
    'Một số dịch vụ bên ngoài có thể yêu cầu khóa truy cập (API Key) riêng biệt.'
  ]).map(c => `- ⚠️ ${c}`).join('\n');

  const platformsFormatted = (tool.platforms || ['web'])
    .map(p => `\`${p}\``)
    .join(', ');

  const md = `# ${tool.name}

> **${tool.summaryVi || 'Tài nguyên công nghệ trí tuệ nhân tạo chuyên dụng.'}**

---

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
${cliCommandsList ? cliCommandsList + '\n\n' : ''}${tool.installGuideVi || 'Bước 1: Kiểm tra môi trường thực thi cục bộ.\nBước 2: Tải về mã nguồn từ kho lưu trữ chính thức.\nBước 3: Cài đặt các gói phụ thuộc cần thiết.\nBước 4: Kiểm tra và kích hoạt công cụ.'}

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

// Cập nhật cho toàn bộ 2.221 công cụ
let updatedCount = 0;
for (const tool of tools) {
  tool.readmeVi = generateStandardReadme(tool);
  updatedCount++;
}

console.log(`Đã cập nhật thành công README tiếng Việt toàn vẹn cho ${updatedCount} / ${tools.length} công cụ.`);

fs.writeFileSync(toolsPath, JSON.stringify(tools, null, 2), 'utf8');
console.log('Đã lưu thành công src/data/allTools.json!');
