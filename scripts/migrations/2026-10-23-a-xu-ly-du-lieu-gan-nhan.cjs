#!/usr/bin/env node
/**
 * Xử lý các bản ghi đã gắn nhãn bởi scripts/validate-data.cjs (nhiệm vụ CL-05b, phần A).
 * Chạy lại nhiều lần cho cùng kết quả. Không xóa bản ghi khỏi tệp: công cụ không tồn tại được chuyển
 * sang trạng thái `rejected` kèm lý do trong `reviewNote` (ẩn khỏi danh sách, có thể khôi phục).
 *
 * Quy tắc:
 * 1. Sửa liên kết nguồn sai đã xác minh thủ công (repo đọc được, README khớp tên công cụ), và sửa
 *    đường dẫn cũ trong repo đã sắp xếp lại thư mục (chỉ khi đường dẫn mới có thật trên nhánh mặc định).
 * 2. Ẩn công cụ có nguồn không tồn tại.
 * 3. Ẩn công cụ có nguồn chỉ là trang chủ (không phải repo) mà gói cài đặt không tồn tại:
 *    MCP server/SDK được mô tả không có thật.
 * 4. Công cụ có repo GitHub thật nhưng câu lệnh cài đặt dùng gói npm không tồn tại: giữ công cụ,
 *    bỏ các cấu hình cài đặt chứa gói không tồn tại.
 * 5. Nhiều bản ghi cùng một liên kết nguồn (URL đầy đủ): giữ một bản ghi chuẩn, ẩn các bản ghi trùng.
 * 6. Thành phần của kho davila7/claude-code-templates: thay câu lệnh bịa (`agy skill add`, `claude plugin add`,
 *    `claude hook add`...) bằng câu lệnh thật của CLI `claude-code-templates`; cấu hình JSON lấy từ chính tệp
 *    thành phần (MCP, setting, hook) hoặc mô tả câu lệnh và tệp đích (agent, command, skill).
 *    Cờ và thư mục đích đã xác minh trong cli-tool/bin/create-claude-config.js và cli-tool/src/index.js.
 * 7. Công cụ còn lại bị bỏ hết câu lệnh bịa ở quy tắc 4: thay bằng câu lệnh cài đặt chép từ README chính thức.
 *
 * Thứ tự chạy:
 *   node scripts/migrations/2026-10-23-a-xu-ly-du-lieu-gan-nhan.cjs     (sửa liên kết)
 *   npm run data:validate -- --online --write                          (kiểm định lại)
 *   node scripts/migrations/2026-10-23-a-xu-ly-du-lieu-gan-nhan.cjs     (áp dụng quy tắc 2 đến 5)
 */
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const DATA_FILE = path.join(__dirname, '..', '..', 'src', 'data', 'allTools.json');
const INTENTS_FILE = path.join(__dirname, '..', '..', 'mcp-gateway', 'core-intents.json');

// Đã xác minh ngày 2026-10-23 bằng git ls-remote và đọc README của repo đích
const SOURCE_URL_FIXES = {
  'vn2-mvg7tycz-ip0o': { sourceUrl: 'https://github.com/undertheseanlp/underthesea' },
  'vn-repo-zalopay-official-sdk': { sourceUrl: 'https://github.com/zalopay-oss/zalopay-nodejs', authorName: 'ZaloPay OSS (zalopay-oss)' },
  'mcpmarket-1857': { sourceUrl: 'https://github.com/morluto/rea' },
  'claude-context-semantic-search-mcp': { sourceUrl: 'https://github.com/zilliztech/claude-context' },
  'claude-command-suite-119': { sourceUrl: 'https://github.com/qdhenry/Claude-Command-Suite' },
  'claude-squad-swarm-sdk': { sourceUrl: 'https://github.com/smtg-ai/claude-squad' },
  'claude-flow-code-orchestrator': { sourceUrl: 'https://github.com/ruvnet/claude-flow' },
  'cc-usage-cost-analyzer-cli': { sourceUrl: 'https://github.com/ryoppippi/ccusage' },
  // microsoft/playwright là khung kiểm thử; MCP server nằm ở repo riêng
  'playwright-browser-mcp-server': { sourceUrl: 'https://github.com/microsoft/playwright-mcp' }
};

// Câu lệnh cài đặt chép từ README chính thức của từng repo (đọc ngày 2026-10-23)
const mcp = (name, server) => JSON.stringify({ mcpServers: { [name]: server } }, null, 2);
const steps = (caiDat, nguon) => JSON.stringify({ caiDat, nguon }, null, 2);
const CLAUDE_CODE = { platform: 'claude_code', platformName: 'Claude Code' };
const DESKTOP = { platform: 'claude_desktop', platformName: 'Claude Desktop' };
const TERMINAL = { platform: 'web', platformName: 'Dòng lệnh (Terminal)' };
const README_INSTALLS = {
  'claude-context-semantic-search-mcp': [{ ...CLAUDE_CODE,
    cliCommand: 'claude mcp add claude-context -e OPENAI_API_KEY=sk-your-openai-api-key -e MILVUS_ADDRESS=your-zilliz-cloud-public-endpoint -e MILVUS_TOKEN=your-zilliz-cloud-api-key -- npx @zilliz/claude-context-mcp@latest',
    jsonConfig: mcp('claude-context', { command: 'npx', args: ['@zilliz/claude-context-mcp@latest'], env: { OPENAI_API_KEY: 'sk-your-openai-api-key', MILVUS_ADDRESS: 'your-zilliz-cloud-public-endpoint', MILVUS_TOKEN: 'your-zilliz-cloud-api-key' } }) }],
  'claude-command-suite-119': [{ ...CLAUDE_CODE, cliCommand: 'git clone https://github.com/qdhenry/Claude-Command-Suite.git',
    jsonConfig: steps(['git clone https://github.com/qdhenry/Claude-Command-Suite.git', 'Làm theo mục cài đặt trong README của repo'], 'https://github.com/qdhenry/Claude-Command-Suite') }],
  'claude-squad-swarm-sdk': [{ ...TERMINAL, cliCommand: 'brew install claude-squad',
    jsonConfig: steps(['brew install claude-squad', 'hoặc: curl -fsSL https://raw.githubusercontent.com/smtg-ai/claude-squad/main/install.sh | bash'], 'https://github.com/smtg-ai/claude-squad') }],
  'cc-usage-cost-analyzer-cli': [{ ...TERMINAL, cliCommand: 'npx ccusage@latest',
    jsonConfig: steps(['npx ccusage@latest'], 'https://github.com/ryoppippi/ccusage') }],
  'sqlite-mcp-database-server': [{ ...DESKTOP, cliCommand: 'docker run --rm -i -v mcp-test:/mcp mcp/sqlite --db-path /mcp/test.db',
    jsonConfig: mcp('sqlite', { command: 'docker', args: ['run', '--rm', '-i', '-v', 'mcp-test:/mcp', 'mcp/sqlite', '--db-path', '/mcp/test.db'] }) }],
  'playwright-browser-mcp-server': [{ ...CLAUDE_CODE, cliCommand: 'claude mcp add playwright npx @playwright/mcp@latest',
    jsonConfig: mcp('playwright', { command: 'npx', args: ['@playwright/mcp@latest'] }) }],
  'vn2-mvg7tycz-89od': [{ ...TERMINAL, cliCommand: 'brew install --cask exo',
    jsonConfig: steps(['brew install --cask exo', 'hoặc cài từ mã nguồn: git clone https://github.com/exo-explore/exo'], 'https://github.com/exo-explore/exo') }],
  'vn2-mvg7tycz-iyh0': [{ ...TERMINAL, cliCommand: 'uv pip install vllm',
    jsonConfig: steps(['uv pip install vllm'], 'https://github.com/vllm-project/vllm') }],
  'wf-mvg7kr48-ppn8': [{ ...TERMINAL, cliCommand: 'docker compose up -d',
    jsonConfig: steps(['Tải tệp docker-compose theo hướng dẫn trong README', 'docker compose up -d'], 'https://github.com/labring/FastGPT') }],
  'wf-mvg7kr48-wfti': [{ ...TERMINAL, cliCommand: 'docker run -it --rm --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n',
    jsonConfig: steps(['docker run -it --rm --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n'], 'https://github.com/n8n-io/n8n') }],
  'ext2-mvg75xvo-9g47': [{ ...TERMINAL, cliCommand: 'git clone https://github.com/deepseek-ai/DeepSeek-V3.git',
    jsonConfig: steps(['git clone https://github.com/deepseek-ai/DeepSeek-V3.git', 'cd DeepSeek-V3/inference', 'pip install -r requirements.txt'], 'https://github.com/deepseek-ai/DeepSeek-V3') }],
  'ext2-mvg75xvo-xyb2': [{ ...TERMINAL, cliCommand: 'pip install comfy-cli',
    jsonConfig: steps(['pip install comfy-cli', 'comfy install'], 'https://github.com/comfyanonymous/ComfyUI') }],
  'ext-mvg74gxr-1uel': [{ ...TERMINAL, cliCommand: 'pip install mem0ai',
    jsonConfig: steps(['pip install mem0ai', 'hoặc: npm install mem0ai'], 'https://github.com/mem0ai/mem0') }],
  'ext-mvg74gxr-88om': [{ ...TERMINAL, cliCommand: 'git clone https://github.com/infiniflow/ragflow.git',
    jsonConfig: steps(['git clone https://github.com/infiniflow/ragflow.git', 'cd ragflow/docker', 'docker compose -f docker-compose.yml up -d'], 'https://github.com/infiniflow/ragflow') }],
  'ext-mvg74gxr-m3pv': [{ ...TERMINAL, cliCommand: 'curl -fsSL https://ollama.com/install.sh | sh',
    jsonConfig: steps(['curl -fsSL https://ollama.com/install.sh | sh', 'ollama run gemma4'], 'https://github.com/ollama/ollama') }],
  'ext-mvg74gxr-ji4y': [{ ...TERMINAL, cliCommand: 'npm install hanhchinhvn',
    jsonConfig: steps(['npm install hanhchinhvn'], 'https://github.com/madnh/hanhchinhvn') }],
  'mcpmarket-1858': [{ ...CLAUDE_CODE, cliCommand: '/plugin install superpowers@claude-plugins-official',
    jsonConfig: steps(['Trong Claude Code: /plugin install superpowers@claude-plugins-official'], 'https://github.com/obra/superpowers') }],
  'mcpmarket-1860': [{ ...CLAUDE_CODE, cliCommand: 'npx -y ruflo@latest mcp start',
    jsonConfig: mcp('ruflo', { command: 'npx', args: ['-y', 'ruflo@latest', 'mcp', 'start'] }) }],
  'mcpmarket-1861': [{ ...TERMINAL, cliCommand: 'npm install -g @fission-ai/openspec@latest',
    jsonConfig: steps(['npm install -g @fission-ai/openspec@latest'], 'https://github.com/Fission-AI/openspec') }],
  'mcpmarket-1862': [{ ...CLAUDE_CODE, cliCommand: 'npx ctx7 setup --claude',
    jsonConfig: mcp('context7', { url: 'https://mcp.context7.com/mcp' }) }],
  'vinai-phogpt-bridge': [{ ...TERMINAL, cliCommand: 'pip install transformers',
    jsonConfig: steps(['pip install transformers', 'Nạp mô hình "vinai/PhoGPT-4B-Chat" bằng AutoModelForCausalLM.from_pretrained(..., trust_remote_code=True)'], 'https://github.com/VinAIResearch/PhoGPT') }]
};

// Repo đã sắp xếp lại thư mục: [mẫu URL cũ, hàm sinh URL mới từ đường dẫn cũ, repo chứa URL mới]
const PATH_RELOCATIONS = [
  {
    // Thành phần chuyển từ <loại>/... sang cli-tool/components/<loại>/...
    match: /^https:\/\/github\.com\/davila7\/claude-code-templates\/tree\/main\/(.+)$/i,
    repo: 'davila7/claude-code-templates',
    newPath: (p) => `cli-tool/components/${p}`
  },
  {
    // Các server tham chiếu đã ngừng phát triển được chuyển sang repo lưu trữ
    match: /^https:\/\/github\.com\/modelcontextprotocol\/servers\/tree\/main\/(src\/.+)$/i,
    repo: 'modelcontextprotocol/servers-archived',
    newPath: (p) => p
  }
];

function listRepoPaths(repo) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'aihub-tree-'));
  try {
    const env = { ...process.env, GIT_TERMINAL_PROMPT: '0' };
    execFileSync('git', ['clone', '-q', '--depth', '1', '--filter=blob:none', '--no-checkout', `https://github.com/${repo}`, dir], { env, stdio: 'ignore' });
    const out = execFileSync('git', ['-C', dir, 'ls-tree', '-r', '-t', '--name-only', 'HEAD'], { env, maxBuffer: 256 * 1024 * 1024 });
    return new Set(out.toString().split('\n').filter(Boolean));
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

// Đọc nội dung các tệp JSON của thành phần (MCP, setting, hook) bằng sparse checkout
function readTemplateComponentJson() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'aihub-cct-'));
  try {
    const env = { ...process.env, GIT_TERMINAL_PROMPT: '0' };
    const git = (...a) => execFileSync('git', a, { env, maxBuffer: 256 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] });
    git('clone', '-q', '--depth', '1', '--filter=blob:none', '--sparse', 'https://github.com/davila7/claude-code-templates', dir);
    git('-C', dir, 'sparse-checkout', 'set', 'cli-tool/components/mcps', 'cli-tool/components/settings', 'cli-tool/components/hooks');
    const files = new Map();
    const walk = (rel) => {
      for (const entry of fs.readdirSync(path.join(dir, rel), { withFileTypes: true })) {
        const child = `${rel}/${entry.name}`;
        if (entry.isDirectory()) walk(child);
        else if (entry.name.endsWith('.json')) files.set(child, fs.readFileSync(path.join(dir, child), 'utf-8'));
      }
    };
    for (const kind of ['mcps', 'settings', 'hooks']) walk(`cli-tool/components/${kind}`);
    return files;
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

const TEMPLATES_RE = /^https:\/\/github\.com\/davila7\/claude-code-templates\/tree\/main\/cli-tool\/components\/(agents|commands|mcps|settings|hooks|skills)\/(.+?)(\.json|\.md)?$/;

const REJECT_PREFIX = '[Kiểm định dữ liệu 2026-10-23]';
const githubRepoKey = (url) => {
  const m = /^https?:\/\/github\.com\/([^/\s]+)\/([^/\s#?]+)/i.exec(String(url || ''));
  return m ? `${m[1]}/${m[2].replace(/\.git$/, '')}`.toLowerCase() : null;
};
const normalizeUrl = (u) => String(u || '').trim().toLowerCase().replace(/\.git$/, '').replace(/[#?].*$/, '').replace(/\/+$/, '');
const isPublished = (t) => t.status === 'published' || !t.status;
const reject = (tool, reason) => {
  tool.status = 'rejected';
  tool.reviewNote = `${REJECT_PREFIX} ${reason}`;
};

const tools = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
const intentTargets = new Set(JSON.parse(fs.readFileSync(INTENTS_FILE, 'utf-8')).map(i => i.targetToolId));
const stats = { urlFixed: 0, rejectedSourceMissing: 0, rejectedFabricated: 0, rejectedDuplicate: 0, configsStripped: 0, toolsStripped: 0 };

// Liên kết đã sửa phải được kiểm định lại; đến lúc đó không áp dụng quy tắc "nguồn không tồn tại"
const markRelinked = (tool) => {
  if (tool.verification) tool.verification.sourceStatus = 'unknown';
  stats.urlFixed++;
};

// 1. Sửa liên kết nguồn
for (const tool of tools) {
  const fix = SOURCE_URL_FIXES[tool.id];
  if (fix && tool.sourceUrl !== fix.sourceUrl) {
    Object.assign(tool, fix);
    markRelinked(tool);
  }
}
for (const relocation of PATH_RELOCATIONS) {
  const candidates = tools.filter(t => relocation.match.test(t.sourceUrl || ''));
  if (candidates.length === 0) continue;
  const paths = listRepoPaths(relocation.repo);
  for (const tool of candidates) {
    const oldPath = relocation.match.exec(tool.sourceUrl)[1].replace(/\/+$/, '');
    const newPath = relocation.newPath(oldPath);
    if (paths.has(newPath)) {
      tool.sourceUrl = `https://github.com/${relocation.repo}/tree/main/${newPath}`;
      markRelinked(tool);
    }
  }
}

for (const tool of tools) {
  if (!isPublished(tool) || !tool.verification) continue;
  const v = tool.verification;
  const isRepo = Boolean(githubRepoKey(tool.sourceUrl));

  // 2. Nguồn không tồn tại
  if (v.sourceStatus === 'missing') {
    reject(tool, `Liên kết nguồn ${tool.sourceUrl} không tồn tại.`);
    stats.rejectedSourceMissing++;
    continue;
  }
  // 3. Nguồn là trang chủ, gói cài đặt không tồn tại
  if (!isRepo && v.missingPackages.length > 0) {
    reject(tool, `Gói cài đặt ${v.missingPackages.join(', ')} không tồn tại trên npm và nguồn chỉ là trang chủ ${tool.sourceUrl}, không có mã nguồn của công cụ được mô tả.`);
    stats.rejectedFabricated++;
    continue;
  }
  // 4. Repo thật, câu lệnh cài đặt dùng gói không tồn tại.
  // Thành phần claude-code-templates do quy tắc 6 quản lý: cấu hình lấy nguyên từ tệp gốc, nếu tệp gốc
  // tham chiếu gói không tồn tại thì giữ nguyên và để giao diện cảnh báo.
  if (isRepo && v.missingPackages.length > 0 && !TEMPLATES_RE.test(tool.sourceUrl)) {
    const before = (tool.configs || []).length;
    tool.configs = (tool.configs || []).filter(cfg => {
      const text = `${cfg.cliCommand || ''} ${cfg.jsonConfig || ''}`.toLowerCase();
      return !v.missingPackages.some(p => text.includes(p));
    });
    if (tool.configs.length < before) {
      stats.configsStripped += before - tool.configs.length;
      stats.toolsStripped++;
    }
  }
}

// 5. Trùng lặp theo liên kết nguồn đầy đủ (một repo có thể chứa nhiều thành phần ở các đường dẫn khác nhau)
const byUrl = new Map();
for (const tool of tools) {
  const key = normalizeUrl(tool.sourceUrl);
  if (!key || !isPublished(tool)) continue;
  byUrl.set(key, [...(byUrl.get(key) || []), tool]);
}
for (const group of byUrl.values()) {
  // Trang chủ dùng chung cho nhiều dịch vụ khác nhau (cổng dịch vụ công, doanh nghiệp) không phải trùng lặp
  if (!githubRepoKey(group[0].sourceUrl)) continue;
  if (group.length < 2) continue;
  // Bản ghi chuẩn: đích của bộ định tuyến, sau đó bản ghi có nhiều cấu hình hợp lệ nhất, sau đó bản ghi đứng trước
  const score = (t) => (intentTargets.has(t.id) ? 1000 : 0) + (t.configs || []).length * 10 - group.indexOf(t);
  const canonical = [...group].sort((a, b) => score(b) - score(a))[0];
  for (const tool of group) {
    if (tool === canonical) continue;
    reject(tool, `Trùng lặp với "${canonical.name}" (${canonical.id}) cùng nguồn ${canonical.sourceUrl}.`);
    stats.rejectedDuplicate++;
  }
}

// 6. Câu lệnh và cấu hình thật cho thành phần claude-code-templates
const COMPONENT_FLAGS = { agents: 'agent', commands: 'command', mcps: 'mcp', settings: 'setting', hooks: 'hook', skills: 'skill' };
const templateTools = tools.filter(t => isPublished(t) && TEMPLATES_RE.test(t.sourceUrl || ''));
if (templateTools.length) {
  const componentFiles = readTemplateComponentJson();
  for (const tool of templateTools) {
    const [, kind, name, ext] = TEMPLATES_RE.exec(tool.sourceUrl);
    const baseName = name.split('/').pop();
    const cliCommand = `npx claude-code-templates@latest --${COMPONENT_FLAGS[kind]} ${name} --yes`;
    let jsonConfig;
    if (ext === '.json') {
      const raw = componentFiles.get(`cli-tool/components/${kind}/${name}.json`);
      if (raw === undefined) continue;
      jsonConfig = JSON.stringify(JSON.parse(raw), null, 2);
    } else {
      const target = { agents: `.claude/agents/${baseName}.md`, commands: `.claude/commands/${baseName}.md`, skills: `.claude/skills/${baseName}/SKILL.md` }[kind];
      jsonConfig = JSON.stringify({ caiDat: cliCommand, tepDich: target, nguon: tool.sourceUrl }, null, 2);
    }
    const configs = [{ platform: 'claude_code', platformName: 'Claude Code', cliCommand, jsonConfig }];
    if (JSON.stringify(tool.configs) !== JSON.stringify(configs)) {
      tool.configs = configs;
      tool.platforms = ['claude_code'];
      stats.templateConfigsRebuilt = (stats.templateConfigsRebuilt || 0) + 1;
    }
  }
}

// 7. Câu lệnh cài đặt từ README chính thức cho công cụ không còn cấu hình
for (const tool of tools) {
  const configs = README_INSTALLS[tool.id];
  if (!configs || !isPublished(tool) || (tool.configs || []).length > 0) continue;
  tool.configs = configs;
  tool.platforms = [...new Set(configs.map(c => c.platform))];
  stats.readmeInstallsAdded = (stats.readmeInstallsAdded || 0) + 1;
}

fs.writeFileSync(DATA_FILE, JSON.stringify(tools, null, 2), 'utf-8');
console.log(stats);
console.log(`Còn hiển thị: ${tools.filter(isPublished).length}/${tools.length} công cụ`);
const hiddenTargets = tools.filter(t => intentTargets.has(t.id) && !isPublished(t)).map(t => t.id);
if (hiddenTargets.length) console.log('Đích bộ định tuyến bị ẩn:', hiddenTargets);
