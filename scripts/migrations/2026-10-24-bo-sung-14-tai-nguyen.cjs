#!/usr/bin/env node
/**
 * Bổ sung 14 tài nguyên còn thiếu trong kho (yêu cầu "tìm thêm các tài nguyên thích hợp", 24-10-2026).
 *
 * Dữ kiện (mô tả, lệnh cài, cấu hình JSON, giấy phép, ưu/nhược điểm) nằm trong
 * scripts/migrations/data/2026-10-24-tai-nguyen-tu-readme.json, trích từ README và LICENSE của từng repo;
 * trường sourceEvidence ghi dòng README chứa từng câu lệnh để truy vết.
 * Tệp này chỉ thêm phần do AI HUB quyết định: mã, tên tiếng Việt, lĩnh vực, nền tảng, nhãn giấy phép ngắn.
 *
 * Không thêm makenotion/notion-mcp-server: README ghi dự án không còn được bảo trì, khuyên dùng Remote Notion MCP.
 * Chạy lại an toàn: bản ghi cùng id được cập nhật, giữ kết quả kiểm định và số sao đã có.
 */
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../../src/data/allTools.json');
const FACTS_FILE = path.join(__dirname, 'data/2026-10-24-tai-nguyen-tu-readme.json');
const TODAY = '2026-10-24';

const CATEGORY_NAMES = {
  devops_cicd: 'DevOps & Tự động hóa CI/CD',
  backend_api: 'Backend & Kiến trúc API',
  frontend_ui: 'Frontend & Giao diện người dùng',
  cybersecurity_security: 'An toàn thông tin & Bảo mật (Security)',
  database_sql_nosql: 'Cơ sở dữ liệu SQL & NoSQL',
  database: 'Cơ sở dữ liệu & Quản lý tri thức',
  qa_testing: 'Kiểm thử phần mềm & QA/QC',
  office_digital_docs: 'Văn phòng số & Quản lý văn bản điện tử',
  generative_ai_multimedia: 'Sinh nội dung & Đa phương tiện (Generative AI)',
  data_engineering: 'Kỹ thuật dữ liệu & Đường ống ETL',
  vector_rag: 'Dữ liệu Vector & Tìm kiếm tri thức (RAG)',
  computer_vision: 'Thị giác máy tính & Xử lý ảnh (Vision & OCR)',
  nlp_llm: 'Xử lý ngôn ngữ tự nhiên & Mô hình LLM',
  rpa_workflow_automation: 'Tự động hóa quy trình & RPA (Automation)'
};

const TYPE_NAMES = {
  mcp: 'MCP Server',
  agent: 'Nền tảng tác tử (Agent Platform)',
  skill: 'Skill',
  software: 'Phần mềm',
  sdk: 'SDK'
};

const TERMINAL = { platform: 'web', platformName: 'Dòng lệnh (Terminal)' };

// Phần do AI HUB quyết định cho từng repo
const META = {
  'github/github-mcp-server': {
    id: 'github-github-mcp-server',
    name: 'GitHub MCP Server — Máy Chủ MCP Chính Thức Của GitHub: Kho Mã, Issue, Pull Request, Actions',
    icon: 'GitPullRequest',
    categories: ['devops_cicd', 'backend_api', 'cybersecurity_security'],
    platforms: ['claude_code', 'claude_desktop', 'cursor', 'web'],
    license: 'Mã nguồn mở (MIT)',
    pricingModel: 'free',
    pricingText: 'Miễn phí mã nguồn mở (MIT); cần tài khoản GitHub',
    configs: (f) => [
      { platform: 'claude_code', platformName: 'Claude Code', cliCommand: f.cliCommand },
      { platform: 'web', platformName: 'VS Code (máy chủ từ xa của GitHub)', jsonConfig: f.mcpJson }
    ]
  },
  'supabase-community/supabase-mcp': {
    id: 'supabase-community-supabase-mcp',
    name: 'Supabase MCP Server — Kết Nối Trợ Lý AI Với Dự Án Supabase: Bảng, Cấu Hình, Truy Vấn Dữ Liệu',
    icon: 'Database',
    categories: ['database_sql_nosql', 'backend_api'],
    platforms: ['claude_code', 'cursor', 'web'],
    license: 'Mã nguồn mở (Apache-2.0)',
    pricingModel: 'free',
    pricingText: 'Miễn phí mã nguồn mở (Apache-2.0); cần tài khoản và dự án Supabase',
    configs: (f) => [{ platform: 'claude_code', platformName: 'MCP client (máy chủ HTTP của Supabase)', jsonConfig: f.mcpJson }]
  },
  'oraios/serena': {
    id: 'oraios-serena',
    name: 'Serena — Bộ Công Cụ Lập Trình Cho Tác Tử AI: Truy Xuất & Chỉnh Sửa Mã Theo Ký Hiệu Qua MCP',
    icon: 'Code2',
    categories: ['backend_api', 'frontend_ui', 'devops_cicd'],
    platforms: ['claude_code', 'claude_desktop', 'cursor', 'web'],
    license: 'Mã nguồn mở (GPL-3.0-or-later; SolidLSP theo MIT)',
    pricingModel: 'free',
    pricingText: 'Miễn phí mã nguồn mở; backend JetBrains plugin trả phí (tùy chọn)'
  },
  'modelcontextprotocol/inspector': {
    id: 'modelcontextprotocol-inspector',
    name: 'MCP Inspector — Công Cụ Kiểm Tra & Gỡ Lỗi Máy Chủ MCP (Giao Diện Web, CLI, TUI)',
    icon: 'Search',
    categories: ['qa_testing', 'backend_api'],
    platforms: ['web'],
    license: 'Mã nguồn mở (đang chuyển từ MIT sang Apache-2.0)',
    pricingModel: 'free',
    pricingText: 'Miễn phí mã nguồn mở'
  },
  'anthropics/skills': {
    id: 'anthropics-skills',
    name: 'Anthropic Agent Skills — Kho Skill Chính Thức Cho Claude: Tài Liệu docx/pdf/pptx/xlsx, Thiết Kế, Kỹ Thuật',
    icon: 'Sparkles',
    categories: ['office_digital_docs', 'generative_ai_multimedia', 'backend_api'],
    platforms: ['claude_code', 'web'],
    license: 'Hỗn hợp: phần lớn Apache-2.0; skill docx/pdf/pptx/xlsx là mã công khai, độc quyền',
    pricingModel: 'free',
    pricingText: 'Miễn phí trong Claude Code; trên Claude.ai dành cho gói trả phí',
    configs: (f) => [{ platform: 'claude_code', platformName: 'Claude Code', cliCommand: f.cliCommand }]
  },
  'anthropics/claude-code': {
    id: 'anthropics-claude-code',
    name: 'Claude Code — Tác Tử Lập Trình Của Anthropic Chạy Trong Terminal, IDE Và GitHub',
    icon: 'Terminal',
    categories: ['backend_api', 'frontend_ui', 'devops_cicd'],
    platforms: ['claude_code', 'web'],
    license: 'Độc quyền (theo Điều khoản Dịch vụ Thương mại của Anthropic)',
    pricingText: 'Sử dụng theo Điều khoản Dịch vụ Thương mại của Anthropic'
  },
  'openai/codex': {
    id: 'openai-codex',
    name: 'Codex CLI — Tác Tử Lập Trình Của OpenAI Chạy Cục Bộ Trong Terminal',
    icon: 'Terminal',
    categories: ['backend_api', 'frontend_ui', 'devops_cicd'],
    platforms: ['web'],
    license: 'Mã nguồn mở (Apache-2.0)',
    pricingModel: 'free',
    pricingText: 'Mã nguồn mở (Apache-2.0); cần gói ChatGPT Plus/Pro/Business/Edu/Enterprise hoặc OpenAI API key'
  },
  'google-gemini/gemini-cli': {
    id: 'google-gemini-gemini-cli',
    name: 'Gemini CLI — Tác Tử AI Mã Nguồn Mở Của Google Trong Terminal',
    icon: 'Terminal',
    categories: ['backend_api', 'frontend_ui', 'devops_cicd'],
    platforms: ['web'],
    license: 'Mã nguồn mở (Apache-2.0)',
    pricingModel: 'free',
    pricingText: 'Mã nguồn mở (Apache-2.0); cần tài khoản Google, Gemini API key hoặc Vertex AI'
  },
  'microsoft/markitdown': {
    id: 'microsoft-markitdown',
    name: 'MarkItDown — Chuyển PDF, Word, Excel, PowerPoint, Ảnh, Âm Thanh Sang Markdown Cho LLM',
    icon: 'FolderTree',
    categories: ['office_digital_docs', 'data_engineering', 'vector_rag'],
    platforms: ['web'],
    license: 'Mã nguồn mở (MIT)',
    pricingModel: 'free',
    pricingText: 'Miễn phí mã nguồn mở (MIT)'
  },
  'docling-project/docling': {
    id: 'docling-project-docling',
    name: 'Docling — Phân Tích & Chuyển Đổi Tài Liệu (PDF, DOCX, PPTX, Ảnh) Thành Dữ Liệu Cho AI',
    icon: 'FolderTree',
    categories: ['office_digital_docs', 'computer_vision', 'vector_rag'],
    platforms: ['web'],
    license: 'Mã nguồn mở (MIT)',
    pricingModel: 'free',
    pricingText: 'Miễn phí mã nguồn mở (MIT)'
  },
  'openai/openai-agents-python': {
    id: 'openai-openai-agents-python',
    name: 'OpenAI Agents SDK (Python) — Khung Xây Dựng Quy Trình Đa Tác Tử',
    icon: 'Workflow',
    categories: ['nlp_llm', 'backend_api', 'rpa_workflow_automation'],
    platforms: ['web'],
    license: 'Mã nguồn mở (MIT)',
    pricingModel: 'free',
    pricingText: 'Miễn phí mã nguồn mở (MIT); chi phí gọi mô hình tính theo nhà cung cấp'
  },
  'pydantic/pydantic-ai': {
    id: 'pydantic-pydantic-ai',
    name: 'Pydantic AI — Khung Xây Dựng Tác Tử AI Bằng Python Kiểm Soát Kiểu Dữ Liệu',
    icon: 'Workflow',
    categories: ['nlp_llm', 'backend_api'],
    platforms: ['web'],
    license: 'Mã nguồn mở (MIT)',
    pricingModel: 'free',
    pricingText: 'Miễn phí mã nguồn mở (MIT); chi phí gọi mô hình tính theo nhà cung cấp'
  },
  'open-webui/open-webui': {
    id: 'open-webui-open-webui',
    name: 'Open WebUI — Giao Diện AI Tự Lưu Trữ Cho Ollama Và API Tương Thích OpenAI',
    icon: 'Globe',
    categories: ['nlp_llm', 'generative_ai_multimedia', 'vector_rag'],
    platforms: ['web'],
    license: 'Open WebUI License (BSD-3 kèm điều khoản giữ thương hiệu)',
    pricingModel: 'free',
    pricingText: 'Miễn phí tự lưu trữ; giữ thương hiệu "Open WebUI" khi vượt 50 người dùng/30 ngày nếu không có giấy phép doanh nghiệp'
  },
  'getzep/graphiti': {
    id: 'getzep-graphiti',
    name: 'Graphiti — Đồ Thị Ngữ Cảnh Theo Thời Gian Làm Bộ Nhớ Cho Tác Tử AI',
    icon: 'Brain',
    categories: ['vector_rag', 'database', 'nlp_llm'],
    platforms: ['cursor', 'web'],
    license: 'Mã nguồn mở (Apache-2.0)',
    pricingModel: 'free',
    pricingText: 'Miễn phí mã nguồn mở (Apache-2.0); cần cơ sở dữ liệu đồ thị và khóa API của LLM',
    configs: (f) => [
      { ...TERMINAL, cliCommand: f.cliCommand },
      { platform: 'cursor', platformName: 'Cursor (MCP server Graphiti chạy HTTP)', jsonConfig: f.mcpJson }
    ]
  }
};

const PLATFORM_LABELS = { web: 'web', claude_code: 'claude_code', claude_desktop: 'claude_desktop', cursor: 'cursor' };

// Cấu hình mặc định: tóm tắt lệnh cài cho dòng lệnh (định dạng caiDat/nguon như các bản ghi khác)
function buildConfigs(fact, meta, sourceUrl) {
  const raw = meta.configs ? meta.configs(fact) : [{ ...TERMINAL, cliCommand: fact.cliCommand }];
  return raw.map((c) => {
    const config = { platform: c.platform, platformName: c.platformName };
    if (c.cliCommand) config.cliCommand = c.cliCommand;
    config.jsonConfig = c.jsonConfig || JSON.stringify({ caiDat: [c.cliCommand], nguon: sourceUrl }, null, 2);
    JSON.parse(config.jsonConfig); // dừng nếu JSON không hợp lệ
    return config;
  });
}

const installGuide = (f) =>
  [f.requirementsVi ? `Yêu cầu: ${f.requirementsVi}` : null, ...f.installStepsVi.map((s, i) => `Bước ${i + 1}: ${s}`)].filter(Boolean).join('\n');
const usageGuide = (f) => f.usageStepsVi.map((s, i) => `Bước ${i + 1}: ${s}`).join('\n');

function readme(record, fact) {
  const commands = record.configs.filter((c) => c.cliCommand).map((c) => c.cliCommand);
  return `# ${record.name}

> ${fact.taglineEn}

---

## 1. Giới Thiệu & Mục Đích Giải Quyết
${fact.summaryVi}

${fact.purposeVi}

- **Loại hình thành phần:** ${record.typeNameVi}
- **Lĩnh vực chuyên môn:** ${record.categoryNameVi}
- **Tác giả / Nhà phát triển:** ${record.authorName}
- **Giấy phép bản quyền:** ${record.license}
- **Nền tảng hỗ trợ:** ${record.platforms.map((p) => '`' + PLATFORM_LABELS[p] + '`').join(', ')}
- **Kho lưu trữ chính thức:** [${record.sourceUrl}](${record.sourceUrl})
- **Thị trường tối ưu:** Thị trường Toàn cầu

---

## 2. Tính Năng Nổi Bật
${fact.featuresVi.map((f) => `- **${f}**`).join('\n')}

---

## 3. Hướng Dẫn Cài Đặt & Thiết Lập Môi Trường
${commands.length ? `### Cài đặt cho Dòng lệnh (Terminal):\n\`\`\`bash\n${commands[0]}\n\`\`\`\n\n` : ''}${record.installGuideVi}

---

## 4. Hướng Dẫn Sử Dụng
${record.usageGuideVi}

---

## 5. Ví Dụ Yêu Cầu Mẫu
${fact.samplePromptsVi.map((p) => `- "${p}"`).join('\n')}
`;
}

function toRecord(fact) {
  const meta = META[fact.repo];
  if (!meta) throw new Error(`Thiếu META cho ${fact.repo}`);
  const sourceUrl = `https://github.com/${fact.repo}`;
  const record = {
    id: meta.id,
    slug: meta.id,
    name: meta.name,
    icon: meta.icon,
    imageUrl: '',
    demoImages: [],
    toolType: fact.toolType,
    typeNameVi: TYPE_NAMES[fact.toolType],
    category: meta.categories[0],
    categoryNameVi: CATEGORY_NAMES[meta.categories[0]],
    categories: meta.categories,
    categoryNamesVi: meta.categories.map((c) => CATEGORY_NAMES[c]),
    isVietnamMarket: false,
    platforms: meta.platforms,
    sourceUrl,
    websiteUrl: fact.websiteUrl || '',
    authorName: fact.authorName,
    license: meta.license,
    summaryVi: fact.summaryVi,
    purposeVi: fact.purposeVi,
    featuresVi: fact.featuresVi,
    installGuideVi: installGuide(fact),
    usageGuideVi: usageGuide(fact),
    samplePromptsVi: fact.samplePromptsVi,
    configs: buildConfigs(fact, meta, sourceUrl),
    status: 'published',
    linkHealth: 'unchecked',
    ...(meta.pricingModel ? { pricingModel: meta.pricingModel } : {}),
    pricingText: meta.pricingText,
    prosVi: fact.prosVi,
    consVi: fact.consVi,
    languages: ['Tiếng Anh'],
    updatedAt: TODAY
  };
  for (const key of ['categoryNameVi', 'typeNameVi']) {
    if (!record[key]) throw new Error(`${fact.repo}: thiếu ${key}`);
  }
  record.readmeVi = readme(record, fact);
  return record;
}

const facts = JSON.parse(fs.readFileSync(FACTS_FILE, 'utf-8'));
const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
let added = 0;
let updated = 0;
for (const fact of facts) {
  const record = toRecord(fact);
  const duplicate = data.find((t) => t.id !== record.id && (t.sourceUrl || '').replace(/\/$/, '').toLowerCase() === record.sourceUrl.toLowerCase());
  if (duplicate) throw new Error(`${fact.repo} đã có trong kho (${duplicate.id})`);
  const index = data.findIndex((t) => t.id === record.id);
  if (index >= 0) {
    const { verification, stars, linkHealth } = data[index];
    data[index] = { ...record, ...(verification ? { verification, linkHealth } : {}), ...(stars !== undefined ? { stars } : {}) };
    updated++;
  } else {
    data.push(record);
    added++;
  }
}
fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
console.log(`Thêm mới ${added}, cập nhật ${updated} tài nguyên.`);
