#!/usr/bin/env node
/**
 * Bổ sung 3 tài nguyên theo yêu cầu ngày 24-10-2026:
 *   - tung1998/agent-office  (đội tác tử AI chạy trên máy, nhận việc qua chat, duyệt diff trước khi áp dụng)
 *   - gitroomhq/postiz-app   (quản lý, lên lịch và phân tích bài đăng mạng xã hội, tự lưu trữ)
 *   - HeyPuter/everything    (bộ ứng dụng mã nguồn mở thay thế phần mềm thương mại)
 *
 * Mọi mô tả, câu lệnh, cổng, tài khoản mặc định lấy từ README (và docker-compose.yaml của Postiz)
 * trong repo gốc tại thời điểm thêm; không có số sao (workflow cap-nhat-so-sao.yml sẽ lấy số thật).
 * Repo "HeyPuter/everythingc" trong yêu cầu không tồn tại (git ls-remote báo không tìm thấy), không thêm.
 *
 * Chạy lại an toàn: bản ghi đã có (cùng id) được ghi đè bằng nội dung dưới đây.
 * Sau khi chạy: npm run data:validate -- --online --write để gắn kết quả kiểm định.
 */
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../../src/data/allTools.json');
const TODAY = '2026-10-24';

const CATEGORY_NAMES = {
  rpa_workflow_automation: 'Tự động hóa quy trình & RPA (Automation)',
  devops_cicd: 'DevOps & Tự động hóa CI/CD',
  customer_support: 'Chăm sóc khách hàng & Trợ lý ảo CS',
  content_writing: 'Sáng tạo nội dung & Biên tập',
  seo_growth: 'Tối ưu hóa công cụ tìm kiếm SEO',
  generative_ai_multimedia: 'Sinh nội dung & Đa phương tiện (Generative AI)',
  office_digital_docs: 'Văn phòng số & Quản lý văn bản điện tử',
  accounting_finance: 'Kế toán doanh nghiệp & Báo cáo tài chính',
  erp_enterprise: 'Quản trị tổng thể doanh nghiệp (ERP)'
};

const TYPE_NAMES = {
  agent: 'Nền tảng tác tử (Agent Platform)',
  software: 'Phần mềm'
};

const PLATFORM_NAMES = {
  web: 'Dòng lệnh (Terminal)'
};

const PLATFORM_LABELS = { web: 'web', claude_code: 'claude_code' };

const TOOLS = [
  {
    id: 'tung1998-agent-office',
    name: 'agent-office — Văn Phòng AI Chạy Trên Máy: Đội Tác Tử Nhận Việc Qua Chat, Duyệt Diff Trước Khi Áp Dụng',
    icon: 'Layers',
    toolType: 'agent',
    categories: ['rpa_workflow_automation', 'devops_cicd', 'customer_support'],
    platforms: ['claude_code', 'web'],
    sourceUrl: 'https://github.com/tung1998/agent-office',
    websiteUrl: 'https://tung1998.github.io/agent-office/guide/vi.html',
    authorName: 'tung1998',
    license: 'Mã nguồn mở (MIT)',
    pricingModel: 'open_source',
    pricingText: 'Miễn phí mã nguồn mở (MIT); dùng tài khoản AI sẵn có của bạn (Claude Code, Codex hoặc khóa API)',
    languages: ['Tiếng Việt', 'Tiếng Anh'],
    tagline: 'Văn phòng AI của riêng bạn: một đội agent AI chạy trên máy bạn, nhận việc qua chat, và chỉ hỏi bạn khi cần duyệt.',
    summaryVi:
      'Biến các tài khoản AI bạn đang có (Claude Code, Codex, API Anthropic/OpenAI hoặc hơn 18 nhà cung cấp tương thích) thành một "văn phòng" gồm nhiều tác tử: mỗi dự án có trưởng nhóm, kỹ sư, QA, reviewer làm việc qua chat, mỗi tác tử sửa mã trong git worktree riêng và trả về diff để người dùng duyệt. Chạy cục bộ bằng một tệp Go cùng dashboard Nuxt, dữ liệu lưu trong SQLite trên máy. Giao diện có tiếng Việt.',
    purposeVi:
      'Giải quyết việc công cụ AI viết mã chỉ làm được từng cuộc chat riêng lẻ, trong khi công việc thật gồm nhiều repo, máy chủ dev cần giám sát, kế hoạch tuần, tin nhắn Discord, webhook. agent-office cho phép giao việc cho cả đội tác tử, đặt quyền theo từng hành động (đọc, sửa, chạy lệnh, git push, khởi động lại container) và chỉ áp dụng thay đổi sau khi người dùng duyệt.',
    featuresVi: [
      'Chat với cả đội tác tử: @tên để kéo tác tử vào nhóm, gọi /skill, đính kèm ảnh/PDF/log, tìm lại chat cũ',
      'Mô hình đội Solo, Team, Council (biểu quyết + phủ quyết) hoặc tự tạo; workflow /handoff, /advisor, /council, /feature',
      'Duyệt trước khi áp dụng: mỗi chat có git worktree riêng; diff, hành động và thay đổi cấu hình chờ Approve / Reject / Skip',
      'Vận hành: nhận diện lệnh dự án, chạy/dừng/tự khởi động lại như pm2, log trực tiếp, CPU/RAM/cổng, docker compose',
      'Tự động hóa: lịch cron theo múi giờ, webhook, tin nhắn Discord/Telegram; chạy script miễn phí và chỉ gọi AI khi thất bại',
      'Burn: tác tử tự tìm và làm việc trong dự án, mỗi việc một worktree, tạm dừng/tiếp tục được',
      'Cổng MCP chung: quản lý máy chủ MCP (HTTP, stdio, OAuth) và chuyển cho mọi AI với quyền theo từng công cụ và nhật ký gọi',
      'Chi phí & giới hạn: ghi chi phí từng lần gọi AI, ngân sách ngày theo văn phòng/dự án/automation, kết nối dự phòng'
    ],
    requirementsVi:
      'git và ít nhất một tài khoản AI (Claude Code / Codex CLI đã đăng nhập, hoặc khóa API). Script `scripts/install.sh` tự kiểm tra và cài Go ≥ 1.27, Node 22, pnpm nếu thiếu (vào `~/.local`, không cần sudo). Chạy trên macOS và Linux; Windows dùng `scripts\\install.ps1` (tự cài WSL2 + Ubuntu).',
    installSteps: [
      'Tải mã nguồn: `git clone https://github.com/tung1998/agent-office.git && cd agent-office`.',
      'Cài công cụ và đóng gói: `scripts/install.sh` (tạo `bin/office` và dashboard). Muốn cài xong chạy luôn: `scripts/install.sh --run`.',
      'Khởi chạy: `./bin/office run` (API cổng 8787, dashboard http://localhost:2704).',
      'Mở http://localhost:2704, đăng nhập `admin` / `admin`; văn phòng yêu cầu đặt email và mật khẩu riêng ngay lập tức.',
      'Chạy như dịch vụ cùng phiên đăng nhập: `./bin/office service install --now` (LaunchAgent trên macOS, systemd user unit trên Linux).',
      'Hoặc dùng Docker: `cp .env.example .env` rồi `docker compose up -d --build`.'
    ],
    cliCommand: 'git clone https://github.com/tung1998/agent-office.git && cd agent-office && scripts/install.sh --run',
    usageSteps: [
      'Trên trang Overview, vào **AI connections** để thêm Claude Code, Codex hoặc khóa API và bấm kiểm tra kết nối.',
      'Vào **Projects** để thêm thư mục, clone một git URL, hoặc tạo trợ lý không gắn thư mục.',
      'Chọn **Starter pack** (Solo / Team / Council) hoặc dùng *Set up with AI* để tác tử đọc repo và đề xuất đội.',
      'Mở **Chat** của dự án và giao việc đầu tiên; duyệt các thẻ diff/hành động bằng Approve / Reject / Skip.',
      'Dữ liệu nằm ở `~/.agent-office`; dùng `office init --local` trong repo để lưu vào `<repo>/.office`.'
    ],
    samplePromptsVi: [
      'Thêm kênh Zalo OA bên cạnh Telegram cho văn phòng',
      'Sửa lỗi đăng nhập ở dự án web, chạy test rồi gửi diff cho tôi duyệt',
      'Lập kế hoạch tuần cho dự án từ các issue đang mở',
      'Mỗi sáng 8 giờ chạy build, chỉ gọi AI phân tích khi build lỗi'
    ],
    prosVi: [
      'Mọi thay đổi của tác tử nằm trong worktree riêng và phải được duyệt trước khi áp dụng',
      'Dùng tài khoản AI sẵn có, dữ liệu nằm trên máy (SQLite), giao diện tiếng Việt',
      'Một cổng MCP chung với quyền theo từng công cụ và nhật ký gọi'
    ],
    consVi: [
      'Cần cài Go, Node 22, pnpm (script tự cài) và tự vận hành trên máy hoặc máy chủ riêng',
      'Tài khoản mặc định admin / admin phải được đổi ngay sau lần đăng nhập đầu'
    ]
  },
  {
    id: 'gitroomhq-postiz-app',
    name: 'Postiz — Nền Tảng Quản Lý, Lên Lịch & Phân Tích Bài Đăng Mạng Xã Hội Mã Nguồn Mở (Tự Lưu Trữ)',
    icon: 'Globe',
    toolType: 'software',
    categories: ['content_writing', 'seo_growth', 'rpa_workflow_automation'],
    platforms: ['web'],
    sourceUrl: 'https://github.com/gitroomhq/postiz-app',
    websiteUrl: 'https://postiz.com',
    authorName: 'Gitroom (gitroomhq)',
    license: 'Mã nguồn mở (AGPL-3.0)',
    pricingModel: 'open_source',
    pricingText: 'Bản tự lưu trữ miễn phí (AGPL-3.0, tự trả chi phí hạ tầng); Postiz Cloud thu phí theo gói, dùng thử 7 ngày',
    languages: ['Tiếng Anh'],
    tagline: 'Postiz is a social media management platform for scheduling, automating, and analyzing your content.',
    summaryVi:
      'Nền tảng quản lý mạng xã hội để lên lịch, tự động hóa và phân tích bài đăng trên Instagram, YouTube, LinkedIn, Reddit, TikTok, Facebook, Pinterest, Threads, X, Slack, Discord, Mastodon, Bluesky, Dribbble. Có trợ lý AI tạo nội dung, cộng tác nhóm, API công khai, webhook và kết nối với tác tử AI qua MCP. Bản mã nguồn mở tự lưu trữ có cùng tính năng với bản Cloud.',
    purposeVi:
      'Hỗ trợ đội nội dung và doanh nghiệp lên lịch bài đăng cho nhiều kênh mạng xã hội từ một nơi, đo hiệu quả bằng phân tích, mời thành viên cùng bình luận và duyệt bài, và tự động hóa qua API với N8N, Make.com, Zapier. Bản tự lưu trữ giữ dữ liệu trên máy chủ riêng, không giới hạn kênh, bài đăng và thành viên.',
    featuresVi: [
      'Lên lịch bài đăng cho nhiều mạng xã hội, xem theo lịch, đăng chéo, bài lặp lại, bình luận và độ trễ',
      'Phân tích hiệu quả bài đăng (bản tự lưu trữ cần ứng dụng nhà phát triển có quyền analytics)',
      'Cộng tác nhóm: mời thành viên bình luận, duyệt và lên lịch bài',
      'AI Copilot, sinh ảnh và video bằng AI (bản tự lưu trữ dùng khóa OpenAI hoặc nhà cung cấp khác của bạn)',
      'API công khai, webhook, SDK Node.js (@postiz/node), node N8N, tích hợp Make.com',
      'Kết nối tác tử AI: MCP, CLI, Claude, ChatGPT, Codex, Cursor trỏ tới máy chủ của bạn',
      'Tự động đăng từ RSS, nhóm khách hàng, chữ ký, bộ bài đăng (sets)'
    ],
    requirementsVi:
      'Docker và Docker Compose (hoặc Coolify / Railway / VPS). Mỗi mạng xã hội cần tạo ứng dụng nhà phát triển riêng và qua bước duyệt của nền tảng (Meta, YouTube, TikTok có thể mất vài tuần), rồi điền khóa vào biến môi trường.',
    installSteps: [
      'Tải mã nguồn: `git clone https://github.com/gitroomhq/postiz-app.git && cd postiz-app`.',
      'Mở `docker-compose.yaml`, đổi `JWT_SECRET` thành chuỗi ngẫu nhiên riêng; điền khóa ứng dụng của các mạng xã hội cần dùng (ví dụ `LINKEDIN_CLIENT_ID`, `LINKEDIN_CLIENT_SECRET`) và `OPENAI_API_KEY` nếu dùng tính năng AI.',
      'Khởi chạy: `docker compose up -d` (gồm Postiz, PostgreSQL, Redis và Temporal).',
      'Mở http://localhost:4007 (giá trị `MAIN_URL` mặc định) và tạo tài khoản.',
      'Hướng dẫn triển khai đầy đủ: https://docs.postiz.com/quickstart.'
    ],
    cliCommand: 'git clone https://github.com/gitroomhq/postiz-app.git && cd postiz-app && docker compose up -d',
    usageSteps: [
      'Kết nối các kênh mạng xã hội đã cấu hình khóa ứng dụng.',
      'Soạn bài (có thể dùng AI Copilot), chọn kênh và thời điểm đăng trên lịch.',
      'Mời thành viên vào nhóm để bình luận, duyệt và lên lịch bài.',
      'Xem phân tích hiệu quả bài đăng; tự động hóa qua Public API (https://docs.postiz.com/public-api), webhook hoặc N8N/Make.com.'
    ],
    samplePromptsVi: [
      'Lên lịch bài giới thiệu sản phẩm mới đăng đồng thời lên LinkedIn, Facebook và X lúc 9 giờ sáng thứ Hai',
      'Tạo chuỗi bài đăng hằng tuần từ nguồn RSS blog của công ty',
      'Dùng API Postiz từ quy trình N8N để đăng bài khi có bài blog mới'
    ],
    prosVi: [
      'Bản tự lưu trữ không giới hạn kênh, bài đăng, thành viên và không khóa tính năng',
      'Hỗ trợ nhiều mạng xã hội, có API công khai, webhook và kết nối tác tử AI qua MCP'
    ],
    consVi: [
      'Tự lưu trữ phải tự tạo ứng dụng nhà phát triển cho từng mạng xã hội và chờ duyệt',
      'Cần vận hành PostgreSQL, Redis, Temporal, tự cập nhật và sao lưu',
      'Giấy phép AGPL-3.0: sửa đổi và cung cấp qua mạng phải công bố mã nguồn'
    ]
  },
  {
    id: 'heyputer-everything',
    name: 'Everything (Puter) — Bộ 51 Ứng Dụng Mã Nguồn Mở Thay Thế Phần Mềm Thương Mại: Văn Phòng, Sáng Tạo, Kỹ Thuật, Tài Chính',
    icon: 'Box',
    toolType: 'software',
    categories: ['office_digital_docs', 'generative_ai_multimedia', 'accounting_finance', 'erp_enterprise'],
    platforms: ['web'],
    sourceUrl: 'https://github.com/HeyPuter/everything',
    websiteUrl: '',
    authorName: 'Puter Technologies Inc.',
    license: 'Mã nguồn mở (MIT)',
    pricingModel: 'open_source',
    pricingText: 'Miễn phí mã nguồn mở (MIT)',
    languages: ['Tiếng Anh'],
    tagline: 'The world’s software. Rebuilt, open-sourced, and MIT-licensed.',
    summaryVi:
      'Dự án Everything của Puter xây lại từ đầu và mở mã các phần mềm thương mại phổ biến, gom trong một kho mã gồm 51 ứng dụng: văn phòng (bảng tính, văn bản, trình chiếu, PDF, ghi chú), cộng tác (họp, chat nhóm, email, lịch, ký số), sáng tạo (ảnh, video, vector, âm thanh, nhạc, 3D), kỹ thuật (CAD, mạch điện, thiết kế công trình), năng suất, tài chính, kinh doanh (CRM, help desk, POS, kho, tuyển dụng), công cụ lập trình (API Client) và trò chơi.',
    purposeVi:
      'Cung cấp các ứng dụng thay thế miễn phí, mã nguồn mở cho phần mềm thương mại như Microsoft Office, Slack, Photoshop, AutoCAD, QuickBooks, Salesforce, Postman. Doanh nghiệp và nhà phát triển có thể tự chạy, sửa đổi và phát triển tiếp từng ứng dụng theo giấy phép MIT.',
    featuresVi: [
      'Văn phòng: Spreadsheet, Documents, Presentation, Whiteboard, PDF, Notes, Records (thay Excel, Word, PowerPoint, Miro, Acrobat, OneNote, Airtable)',
      'Cộng tác: Meetings, Teamchat, Email, Contacts, Calendar, Signatures (thay Zoom, Slack, Gmail, DocuSign)',
      'Sáng tạo: Photo Studio, Video Studio, Vector Studio, Audio Studio, Music Studio, 3D Studio (thay Photoshop, Premiere Pro, Illustrator, FL Studio, Maya)',
      'Kỹ thuật: CAD, Parametric, Circuits, Building Design (thay AutoCAD, SolidWorks, Altium Designer, Revit)',
      'Năng suất: Tasks, Projects, Wiki, Time Tracking, Surveys (thay Todoist, Trello, Notion, Toggl, SurveyMonkey)',
      'Tài chính: Accounting, Invoicing, Expenses, Cap Table (thay QuickBooks, FreshBooks, Expensify, Carta)',
      'Kinh doanh: CRM, Help Desk, Contracts, Point of Sale, Inventory, Assets, Hiring, Shifts, Childcare, Field Service, Legal, Fleet, Property Management',
      'Công cụ lập trình: API Client (thay Postman, Insomnia, Hoppscotch); trò chơi: Chess, Backgammon, Checkers, Solitaire, Sudoku'
    ],
    requirementsVi: 'Node.js 22.12 trở lên.',
    installSteps: [
      'Tải mã nguồn: `git clone https://github.com/HeyPuter/everything.git`.',
      'Vào thư mục ứng dụng cần chạy trong `src/` (ví dụ `cd everything/src/spreadsheet`).',
      'Cài gói: `npm install`.',
      'Chạy bản phát triển: `npm run dev`.'
    ],
    cliCommand: 'git clone https://github.com/HeyPuter/everything.git && cd everything/src/spreadsheet && npm install && npm run dev',
    usageSteps: [
      'Mỗi ứng dụng là một thư mục riêng trong `src/` (ví dụ `spreadsheet`, `documents`, `cad`, `accounting`, `api-client`); chạy từng ứng dụng độc lập theo các bước cài đặt.',
      'Bảng ứng dụng trong README liệt kê ứng dụng thương mại tương ứng và liên kết bản chạy thử trên các tên miền puter.com (ví dụ https://spreadsheet.puter.com/).',
      'Sửa đổi và phân phối lại theo giấy phép MIT; thư viện bên thứ ba giữ giấy phép riêng.'
    ],
    samplePromptsVi: [
      'Chạy ứng dụng Spreadsheet của dự án Everything trên máy để thay Excel',
      'Tìm ứng dụng mã nguồn mở thay thế Postman trong dự án Everything',
      'Tùy biến ứng dụng Invoicing của Everything cho hóa đơn doanh nghiệp'
    ],
    prosVi: [
      'Một kho mã MIT với 51 ứng dụng, mỗi ứng dụng chạy độc lập bằng npm',
      'Có bản chạy thử trực tuyến cho nhiều ứng dụng'
    ],
    consVi: [
      'Không phải công cụ AI: là bộ ứng dụng văn phòng và nghiệp vụ mã nguồn mở',
      'Mỗi ứng dụng phải cài và chạy riêng; độ hoàn thiện so với phần mềm thương mại cần tự đánh giá'
    ]
  }
];

function buildConfig(tool) {
  return [{
    platform: 'web',
    platformName: PLATFORM_NAMES.web,
    cliCommand: tool.cliCommand,
    jsonConfig: JSON.stringify({ caiDat: [tool.cliCommand], nguon: tool.sourceUrl }, null, 2)
  }];
}

function installGuide(tool) {
  return [`Yêu cầu: ${tool.requirementsVi}`, ...tool.installSteps.map((s, i) => `Bước ${i + 1}: ${s}`)].join('\n');
}

function usageGuide(tool) {
  return tool.usageSteps.map((s, i) => `Bước ${i + 1}: ${s}`).join('\n');
}

function readme(tool) {
  const typeName = TYPE_NAMES[tool.toolType];
  return `# ${tool.name}

> ${tool.tagline}

---

## 1. Giới Thiệu & Mục Đích Giải Quyết
${tool.purposeVi}

- **Loại hình thành phần:** ${typeName}
- **Lĩnh vực chuyên môn:** ${CATEGORY_NAMES[tool.categories[0]]}
- **Tác giả / Nhà phát triển:** ${tool.authorName}
- **Giấy phép bản quyền:** ${tool.license}
- **Nền tảng hỗ trợ:** ${tool.platforms.map(p => '`' + PLATFORM_LABELS[p] + '`').join(', ')}
- **Kho lưu trữ chính thức:** [${tool.sourceUrl}](${tool.sourceUrl})
- **Thị trường tối ưu:** Thị trường Toàn cầu

---

## 2. Tính Năng Nổi Bật
${tool.featuresVi.map(f => `- **${f}**`).join('\n')}

---

## 3. Hướng Dẫn Cài Đặt & Thiết Lập Môi Trường
### Cài đặt cho Dòng lệnh (Terminal):
\`\`\`bash
${tool.cliCommand}
\`\`\`

${installGuide(tool)}

---

## 4. Hướng Dẫn Sử Dụng
${usageGuide(tool)}

---

## 5. Ví Dụ Yêu Cầu Mẫu
${tool.samplePromptsVi.map(p => `- "${p}"`).join('\n')}
`;
}

function toRecord(tool) {
  return {
    id: tool.id,
    slug: tool.id,
    name: tool.name,
    icon: tool.icon,
    imageUrl: '',
    demoImages: [],
    toolType: tool.toolType,
    typeNameVi: TYPE_NAMES[tool.toolType],
    category: tool.categories[0],
    categoryNameVi: CATEGORY_NAMES[tool.categories[0]],
    categories: tool.categories,
    categoryNamesVi: tool.categories.map(c => CATEGORY_NAMES[c]),
    isVietnamMarket: false,
    platforms: tool.platforms,
    sourceUrl: tool.sourceUrl,
    websiteUrl: tool.websiteUrl,
    authorName: tool.authorName,
    license: tool.license,
    summaryVi: tool.summaryVi,
    purposeVi: tool.purposeVi,
    featuresVi: tool.featuresVi,
    installGuideVi: installGuide(tool),
    usageGuideVi: usageGuide(tool),
    samplePromptsVi: tool.samplePromptsVi,
    configs: buildConfig(tool),
    status: 'published',
    linkHealth: 'unchecked',
    pricingModel: tool.pricingModel,
    pricingText: tool.pricingText,
    prosVi: tool.prosVi,
    consVi: tool.consVi,
    languages: tool.languages,
    updatedAt: TODAY,
    readmeVi: readme(tool)
  };
}

const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
let added = 0;
let updated = 0;
for (const tool of TOOLS) {
  const record = toRecord(tool);
  const index = data.findIndex(t => t.id === record.id);
  if (index >= 0) {
    // Giữ kết quả kiểm định và số sao đã có; nội dung lấy lại từ định nghĩa trên
    const { verification, stars } = data[index];
    data[index] = { ...record, ...(verification ? { verification, linkHealth: data[index].linkHealth } : {}), ...(stars !== undefined ? { stars } : {}) };
    updated++;
  } else {
    data.push(record);
    added++;
  }
}
fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
console.log(`Thêm mới ${added}, cập nhật ${updated} tài nguyên.`);
