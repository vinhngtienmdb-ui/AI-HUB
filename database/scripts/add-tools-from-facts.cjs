#!/usr/bin/env node
/**
 * Thêm hoặc cập nhật tài nguyên từ tệp dữ kiện đã kiểm tra (định dạng: database/scripts/facts/README.md).
 *   node database/scripts/add-tools-from-facts.cjs database/scripts/facts/<tệp>.json [...]
 *
 * Dữ kiện (mô tả, lệnh cài, cấu hình JSON, giấy phép, ưu/nhược điểm) trích từ README và LICENSE của repo,
 * kèm sourceEvidence ghi dòng README chứa từng câu lệnh. Phần "meta" là quyết định của AI HUB
 * (mã, tên tiếng Việt, lĩnh vực, nền tảng, nhãn giấy phép ngắn).
 * Chạy lại an toàn: bản ghi cùng id được cập nhật, giữ kết quả kiểm định và số sao đã có.
 * Sau khi chạy: npm run data:validate -- --online --write.
 */
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/allTools.json');
const TODAY = new Date().toISOString().slice(0, 10);

const TYPE_NAMES = {
  mcp: 'MCP Server',
  agent: 'Nền tảng tác tử (Agent Platform)',
  skill: 'Skill',
  software: 'Phần mềm',
  sdk: 'SDK',
  model: 'Model',
  dataset: 'Dataset',
  cli: 'CLI',
  api: 'API',
  workflow: 'Workflow'
};

const ICONS = ['Brain', 'Sparkles', 'Terminal', 'Workflow', 'Globe', 'Database', 'Search', 'Code2', 'Layers', 'Box', 'FolderTree', 'GitPullRequest', 'CreditCard', 'Cpu', 'Wrench', 'MessageSquare'];

const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
// Tên lĩnh vực lấy từ chính kho dữ liệu để luôn khớp với giao diện
const CATEGORY_NAMES = Object.fromEntries(data.map((t) => [t.category, t.categoryNameVi]));

function fail(repo, message) {
  throw new Error(`${repo}: ${message}`);
}

function buildConfigs(fact, sourceUrl) {
  const raw = fact.meta.configs && fact.meta.configs.length
    ? fact.meta.configs
    : [{ platform: 'web', platformName: 'Dòng lệnh (Terminal)', cliCommand: fact.cliCommand }];
  return raw.map((c) => {
    const config = { platform: c.platform, platformName: c.platformName };
    if (c.cliCommand) config.cliCommand = c.cliCommand;
    if (!c.cliCommand && !c.jsonConfig) fail(fact.repo, 'cấu hình phải có cliCommand hoặc jsonConfig');
    config.jsonConfig = c.jsonConfig || JSON.stringify({ caiDat: [c.cliCommand], nguon: sourceUrl }, null, 2);
    try {
      JSON.parse(config.jsonConfig);
    } catch {
      fail(fact.repo, 'jsonConfig không phải JSON hợp lệ');
    }
    return config;
  });
}

const installGuide = (f) =>
  [f.requirementsVi ? `Yêu cầu: ${f.requirementsVi}` : null, ...f.installStepsVi.map((s, i) => `Bước ${i + 1}: ${s}`)].filter(Boolean).join('\n');
const usageGuide = (f) => f.usageStepsVi.map((s, i) => `Bước ${i + 1}: ${s}`).join('\n');

function readme(record, fact) {
  const command = record.configs.find((c) => c.cliCommand)?.cliCommand;
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
- **Nền tảng hỗ trợ:** ${record.platforms.map((p) => '`' + p + '`').join(', ')}
- **Kho lưu trữ chính thức:** [${record.sourceUrl}](${record.sourceUrl})
- **Thị trường tối ưu:** ${record.isVietnamMarket ? 'Thị trường Việt Nam' : 'Thị trường Toàn cầu'}

---

## 2. Tính Năng Nổi Bật
${fact.featuresVi.map((f) => `- **${f}**`).join('\n')}

---

## 3. Hướng Dẫn Cài Đặt & Thiết Lập Môi Trường
${command ? `### Cài đặt cho Dòng lệnh (Terminal):\n\`\`\`bash\n${command}\n\`\`\`\n\n` : ''}${record.installGuideVi}

---

## 4. Hướng Dẫn Sử Dụng
${record.usageGuideVi}

---

## 5. Ví Dụ Yêu Cầu Mẫu
${fact.samplePromptsVi.map((p) => `- "${p}"`).join('\n')}
`;
}

function toRecord(fact) {
  const meta = fact.meta || fail(fact.repo, 'thiếu meta');
  const required = ['taglineEn', 'summaryVi', 'purposeVi', 'featuresVi', 'installStepsVi', 'usageStepsVi', 'samplePromptsVi', 'prosVi', 'consVi', 'authorName', 'toolType'];
  for (const key of required) if (!fact[key] || (Array.isArray(fact[key]) && !fact[key].length)) fail(fact.repo, `thiếu ${key}`);
  if (!TYPE_NAMES[fact.toolType]) fail(fact.repo, `toolType không hợp lệ: ${fact.toolType}`);
  for (const c of meta.categories) if (!CATEGORY_NAMES[c]) fail(fact.repo, `lĩnh vực không có trong kho: ${c}`);
  if (!ICONS.includes(meta.icon)) fail(fact.repo, `icon không hợp lệ: ${meta.icon}`);
  if (!/^[a-z0-9-]+$/.test(meta.id)) fail(fact.repo, `id không hợp lệ: ${meta.id}`);

  const sourceUrl = `https://github.com/${fact.repo}`;
  const record = {
    id: meta.id,
    slug: meta.id,
    name: meta.nameVi,
    icon: meta.icon,
    imageUrl: '',
    demoImages: [],
    toolType: fact.toolType,
    typeNameVi: TYPE_NAMES[fact.toolType],
    category: meta.categories[0],
    categoryNameVi: CATEGORY_NAMES[meta.categories[0]],
    categories: meta.categories,
    categoryNamesVi: meta.categories.map((c) => CATEGORY_NAMES[c]),
    isVietnamMarket: Boolean(meta.isVietnamMarket),
    platforms: meta.platforms,
    sourceUrl,
    websiteUrl: fact.websiteUrl || '',
    authorName: fact.authorName,
    license: meta.licenseShort,
    summaryVi: fact.summaryVi,
    purposeVi: fact.purposeVi,
    featuresVi: fact.featuresVi,
    installGuideVi: installGuide(fact),
    usageGuideVi: usageGuide(fact),
    samplePromptsVi: fact.samplePromptsVi,
    configs: buildConfigs(fact, sourceUrl),
    status: 'published',
    linkHealth: 'unchecked',
    ...(meta.pricingModel ? { pricingModel: meta.pricingModel } : {}),
    pricingText: meta.pricingText,
    prosVi: fact.prosVi,
    consVi: fact.consVi,
    languages: meta.languages && meta.languages.length ? meta.languages : ['Tiếng Anh'],
    updatedAt: TODAY
  };
  record.readmeVi = readme(record, fact);
  return record;
}

const files = process.argv.slice(2);
if (!files.length) {
  console.error('Cách dùng: node database/scripts/add-tools-from-facts.cjs <tệp-dữ-kiện.json> [...]');
  process.exit(1);
}
let added = 0;
let updated = 0;
for (const file of files) {
  const facts = JSON.parse(fs.readFileSync(file, 'utf-8'));
  for (const fact of facts) {
    const record = toRecord(fact);
    const duplicate = data.find((t) => t.id !== record.id && (t.sourceUrl || '').replace(/\/$/, '').toLowerCase() === record.sourceUrl.toLowerCase());
    if (duplicate) fail(fact.repo, `đã có trong kho (${duplicate.id})`);
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
}
fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
console.log(`Thêm mới ${added}, cập nhật ${updated} tài nguyên.`);
