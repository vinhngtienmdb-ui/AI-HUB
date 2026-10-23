import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, '..', 'src', 'data', 'allTools.json');
const tools = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

const newTool = {
  id: 'vercel-labs-find-skills',
  slug: 'vercel-labs-find-skills',
  name: 'Find Skills (Vercel Labs) — Kỹ Năng Tự Động Khám Phá & Cài Đặt Agent Skills',
  icon: 'Sparkles',
  imageUrl: '',
  demoImages: [],
  toolType: 'skill',
  typeNameVi: 'Kỹ năng tác nhân (Agent Skill)',
  category: 'devops_cicd',
  categoryNameVi: 'Vận hành triển khai & DevOps',
  categories: [
    'devops_cicd',
    'backend_api',
    'rpa_workflow_automation'
  ],
  categoryNamesVi: [
    'DevOps & Tự động hóa CI/CD',
    'Backend & Kiến trúc API',
    'Tự động hóa quy trình (RPA & Workflow)'
  ],
  isVietnamMarket: false,
  platforms: [
    'claude_desktop',
    'antigravity',
    'cursor',
    'web'
  ],
  sourceUrl: 'https://github.com/vercel-labs/skills',
  authorName: 'Vercel Labs',
  license: 'Mã nguồn mở (MIT)',
  summaryVi: 'Meta-skill tiêu chuẩn mã nguồn mở do Vercel Labs phát triển dành cho Claude Code, Antigravity, Cursor và các AI Coding Agent. Kỹ năng này cho phép tác tử AI tự động phát hiện nhu cầu của người dùng, tìm kiếm kỹ năng phù hợp trên kho sinh thái mở skills.sh thông qua lệnh CLI npx skills find, và đề xuất hoặc tự động cài đặt gói kỹ năng cần thiết một cách nhanh chóng.',
  purposeVi: 'Biến AI Coding Agent thành một hệ sinh thái tự mở rộng năng lực thông minh, giúp người dùng không phải mất công tra cứu thủ công mà AI có thể tự động tìm kiếm, đánh giá và cài đặt thêm các kỹ năng chuyên môn từ kho mở skills.sh.',
  featuresVi: [
    'Tự động nhận diện ý định cần mở rộng kỹ năng khi người dùng hỏi các câu hỏi mở rộng',
    'Tích hợp lệnh CLI npx skills find để tra cứu theo thời gian thực trên kho sinh thái kỹ năng mở skills.sh',
    'Hỗ trợ gợi ý và cài đặt một chạm qua lệnh npx skills add cho mọi nền tảng tác tử AI',
    'Tương thích 100% chuẩn định dạng SKILL.md cho Claude Code, Google Antigravity, Cursor và OpenAI Codex',
    'Tự động đánh giá và chọn lọc từ 1 đến 3 kỹ năng tối ưu nhất dựa trên độ tin cậy và ngữ cảnh dự án'
  ],
  installGuideVi: '### Hướng dẫn cài đặt Find Skills cho Claude Code và Antigravity:\n\n1. **Cài đặt tự động qua CLI**:\n   ```bash\n   npx skills add vercel-labs/skills --skill find-skills\n   ```\n\n2. **Cài đặt cho Google Antigravity**:\n   ```bash\n   npx skills add vercel-labs/skills --agent antigravity\n   ```\n\n3. **Cài đặt thủ công qua tệp SKILL.md**:\n   Tạo thư mục và lưu vào `~/.claude/skills/find-skills/SKILL.md` hoặc `~/.gemini/antigravity/skills/find-skills/SKILL.md`.',
  usageGuideVi: '### Cách sử dụng Find Skills trong hội thoại với AI Agent:\n\nNgười dùng chỉ cần hỏi các câu hỏi tự nhiên, tác tử sẽ tự động kích hoạt kỹ năng để tìm kiếm:\n\n- *"Tìm giúp tôi skill để kiểm thử tự động với React và Playwright"*\n- *"Có skill nào chuyên về phân tích dữ liệu BigQuery không?"*\n- *"Khám phá các skill tối ưu hóa hiệu năng Docker container"*\n\nTác tử sẽ chạy lệnh `npx skills find <từ_khóa>` và đưa ra danh sách các gói skill kèm lệnh cài đặt 1 chạm `npx skills add <tên_gói>`.',
  samplePromptsVi: [
    'Tìm cho tôi các skill chuyên về tối ưu hóa truy vấn PostgreSQL',
    'Có skill nào hỗ trợ thiết kế giao diện React Tailwind đẹp không?',
    'Khám phá các kỹ năng DevOps cho Docker và Kubernetes'
  ],
  configs: [
    {
      platform: 'claude_desktop',
      platformName: 'Claude Code & Desktop',
      cliCommand: 'npx skills add vercel-labs/skills --skill find-skills',
      jsonConfig: JSON.stringify({
        skills: ["vercel-labs/skills/find-skills"]
      }, null, 2)
    },
    {
      platform: 'antigravity',
      platformName: 'Google Antigravity',
      cliCommand: 'npx skills add vercel-labs/skills --agent antigravity',
      jsonConfig: JSON.stringify({
        agent: "antigravity",
        skill: "vercel-labs/skills/find-skills"
      }, null, 2)
    },
    {
      platform: 'cursor',
      platformName: 'Cursor IDE',
      cliCommand: 'npx skills add vercel-labs/skills --skill find-skills',
      jsonConfig: JSON.stringify({
        skills: ["vercel-labs/skills/find-skills"]
      }, null, 2)
    }
  ],
  status: 'published',
  linkHealth: 'healthy',
  stars: 1250,
  featured: true,
  pricingModel: 'free',
  pricingText: 'Miễn phí (MIT)',
  prosVi: [
    'Hỗ trợ tra cứu hàng nghìn skill mở trên skills.sh',
    'Cài đặt 1 chạm qua npx không cần tải thủ công',
    'Tương thích chéo giữa Claude Code, Cursor và Antigravity'
  ],
  consVi: [
    'Yêu cầu môi trường có kết nối Internet và đã cài đặt Node.js / npx'
  ],
  languages: ['Tiếng Việt', 'Tiếng Anh'],
  websiteUrl: 'https://skills.sh'
};

const exists = tools.some(t => t.id === newTool.id);
if (!exists) {
  tools.unshift(newTool);
  fs.writeFileSync(filePath, JSON.stringify(tools, null, 2), 'utf-8');
  console.log(`SUCCESS: Đã thêm thành công [${newTool.id}] vào allTools.json. Tổng quy mô kho: ${tools.length}`);
} else {
  console.log('Công cụ đã tồn tại.');
}
