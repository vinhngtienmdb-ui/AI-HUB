import fs from 'fs';
import path from 'path';

const allToolsPath = path.resolve('src/data/allTools.json');
const allTools = JSON.parse(fs.readFileSync(allToolsPath, 'utf-8'));

console.log('Tổng số công cụ hiện tại trước khi thêm:', allTools.length);

const openBaKitTool = {
  id: "spmtitsolution-openba-kit-57-ai-skills",
  slug: "spmtitsolution-openba-kit-57-ai-skills",
  name: "OpenBA-Kit (BA-Kit Open) — Trọn Bộ 57 AI Skills Cho IT Business Analyst & Product Owner",
  icon: "Workflow",
  imageUrl: "",
  demoImages: [],
  toolType: "skill",
  typeNameVi: "Skill",
  category: "devops_ci_cd",
  categoryNameVi: "Vận hành triển khai & DevOps",
  categories: ["devops_ci_cd", "qa_testing", "backend_api", "frontend_ui", "vietnam"],
  categoryNamesVi: [
    "Vận hành triển khai & DevOps",
    "Kiểm thử & Đảm bảo chất lượng QA",
    "Backend & Kiến trúc API",
    "Giao diện người dùng & Frontend",
    "Tài nguyên & Giải pháp Việt Nam"
  ],
  isVietnamMarket: true,
  platforms: ["claude_desktop", "antigravity", "cursor"],
  sourceUrl: "https://github.com/spmtitsolution/OpenBA-Kit",
  authorName: "SPM IT Solution (spmtitsolution)",
  license: "Mã nguồn mở (MIT)",
  summaryVi: "Bộ kỹ năng mở rộng (Agent Skills) toàn diện bao gồm 57 AI Skills chuyên sâu, 19 bộ quy chuẩn kỹ thuật (Rules) và 48 biểu mẫu thực chiến (Templates). Biến mọi AI Coding Agent (Claude Code, Antigravity, Codex, Cursor...) thành trợ lý Senior Business Analyst và Technical Product Owner chuyên nghiệp.",
  purposeVi: "Tự động hóa toàn diện quy trình tài liệu phần mềm từ ý tưởng thô đến bàn giao kỹ thuật: phỏng vấn làm rõ nghiệp vụ, sinh đặc tả kỹ thuật IEEE 830, mô hình hóa dữ liệu ERD, dựng wireframe HTML tương tác, bóc tách User Story chuẩn INVEST & Gherkin AC, sinh test cases tự động và phân tích tác động thay đổi phạm vi (Change Request).",
  featuresVi: [
    "Trọn bộ 57 lệnh kỹ năng (/brainstorm, /srs, /sequence, /erd, /wireframe-html, /userstory, /ac, /test-cases, /cr, /preview...)",
    "Tích hợp Diagram Design v2.6: Tự động chuyển đổi sơ đồ text Mermaid sang bản vẽ vector HTML & SVG chuẩn Editorial (lưới 4px, font sắc nét)",
    "19 Quy chuẩn bắt buộc (Rules) loại bỏ hoàn toàn các mô tả mơ hồ, tự động chuẩn hóa quy ước đặt mã FR-, BR-, ERR-, UC-, US-",
    "48 Biểu mẫu thực chiến (Templates) sẵn sàng đưa vào áp dụng trực tiếp cho dự án phần mềm doanh nghiệp",
    "Cung cấp tính năng Preview & Handoff một chạm: Tạo trang HTML tổng hợp tài liệu kèm sơ đồ tương tác cho các bên liên quan ký duyệt",
    "Tài liệu song ngữ Anh - Việt đầy đủ, tối ưu hóa cho văn hóa làm việc của cộng đồng kỹ sư phần mềm và BA tại Việt Nam"
  ],
  installGuideVi: "### Hướng dẫn cài đặt OpenBA-Kit vào AI Agent:\n\n1. **Clone kho mã nguồn OpenBA-Kit về máy**:\n   ```bash\n   git clone https://github.com/spmtitsolution/OpenBA-Kit.git ~/.ba-kit-open\n   ```\n\n2. **Tích hợp vào Claude Code**:\n   ```bash\n   mkdir -p ~/.claude/skills\n   ln -s ~/.ba-kit-open/skills/* ~/.claude/skills/\n   ```\n\n3. **Tích hợp vào Google Antigravity / Hermes Agent**:\n   ```bash\n   mkdir -p ~/.hermes/skills\n   ln -s ~/.ba-kit-open/skills/* ~/.hermes/skills/\n   ```\n\n4. **Sử dụng trực tiếp trong thư mục dự án (Workspace)**:\n   Sao chép thư mục `skills/` và `rules/` vào thư mục gốc của dự án để AI Agent tự động nạp khi làm việc.",
  usageGuideVi: "### Luồng làm việc chuẩn của Business Analyst với OpenBA-Kit:\n\n- `Bước 1`: Gõ `/brainstorm` để phỏng vấn làm rõ ý tưởng thô và xác định ranh giới phạm vi tính năng.\n- `Bước 2`: Gõ `/srs` để sinh bản đặc tả kỹ thuật chuẩn IEEE 830 (yêu cầu chức năng FR, quy tắc nghiệp vụ BR, ma trận lỗi ERR).\n- `Bước 3`: Gõ `/sequence` và `/erd` để vẽ sơ đồ tương tác thông điệp và mô hình hóa cơ sở dữ liệu.\n- `Bước 4`: Gõ `/render-diagrams` để xuất bản toàn bộ sơ đồ thành file HTML và SVG vector xem trực tiếp.\n- `Bước 5`: Gõ `/wireframe-html` để dựng giao diện màn hình tương tác mở ngay trên trình duyệt web.\n- `Bước 6`: Gõ `/userstory` và `/ac` để bóc tách danh mục công việc chuẩn INVEST và tiêu chí nghiệm thu Gherkin (Given/When/Then).\n- `Bước 7`: Gõ `/test-cases` để sinh bộ kịch bản kiểm thử chi tiết bám sát ma trận lỗi.\n- `Bước 8`: Gõ `/preview` để xuất bản trang tài liệu hoàn chỉnh bàn giao cho khách hàng hoặc đội ngũ phát triển.",
  samplePromptsVi: [
    "/brainstorm về tính năng phân quyền Quản trị viên tối cao cho hệ thống AI HUB VN",
    "/srs cho module thanh toán ví điện tử tích hợp cổng MoMo và VietQR",
    "/wireframe-html giao diện màn hình đăng nhập tối giản có cơ chế đăng nhập chuyển hướng"
  ],
  configs: [
    {
      platform: "claude",
      platformName: "Claude Desktop / Claude Code",
      cliCommand: "git clone https://github.com/spmtitsolution/OpenBA-Kit.git ~/.ba-kit-open",
      jsonConfig: JSON.stringify({
        skillsPath: "~/.ba-kit-open/skills",
        rulesPath: "~/.ba-kit-open/rules",
        totalSkills: 57,
        totalRules: 19,
        standards: ["IEEE 830", "Cockburn", "INVEST", "Gherkin"]
      }, null, 2)
    },
    {
      platform: "antigravity",
      platformName: "Google Antigravity",
      cliCommand: "agy skill add openba-kit --repo https://github.com/spmtitsolution/OpenBA-Kit",
      jsonConfig: JSON.stringify({
        skills: [
          {
            name: "openba-kit",
            repo: "https://github.com/spmtitsolution/OpenBA-Kit",
            path: "skills/*"
          }
        ]
      }, null, 2)
    },
    {
      platform: "cursor",
      platformName: "Cursor IDE",
      cliCommand: "git clone https://github.com/spmtitsolution/OpenBA-Kit.git .ba-kit",
      jsonConfig: JSON.stringify({
        skillsPath: ".ba-kit/skills",
        rulesPath: ".ba-kit/rules"
      }, null, 2)
    }
  ],
  verified: true,
  rating: 4.99,
  usageCount: 3500,
  tags: ["business-analyst", "product-owner", "agent-skills", "srs", "ieee-830", "wireframe", "diagrams", "vietnam", "gherkin"]
};

const existingIndex = allTools.findIndex(t => t.id === openBaKitTool.id);
if (existingIndex >= 0) {
  allTools[existingIndex] = { ...allTools[existingIndex], ...openBaKitTool };
  console.log(`~ Đã cập nhật công cụ: ${openBaKitTool.id}`);
} else {
  allTools.unshift(openBaKitTool); // Đưa lên đầu danh sách để ưu tiên hiển thị
  console.log(`+ Đã thêm mới công cụ: ${openBaKitTool.id}`);
}

fs.writeFileSync(allToolsPath, JSON.stringify(allTools, null, 2), 'utf-8');
console.log('Tổng số công cụ sau khi thêm:', allTools.length);
