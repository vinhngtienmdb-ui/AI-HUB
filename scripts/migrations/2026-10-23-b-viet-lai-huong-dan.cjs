#!/usr/bin/env node
/**
 * Viết lại hướng dẫn cài đặt và sử dụng dạng mẫu (nhiệm vụ CL-05b, phần B).
 * Chạy lại nhiều lần cho cùng kết quả. Xử lý công cụ đang hiển thị thuộc kho template hoặc có trong README_GUIDES
 * (luôn sinh lại để mọi cải tiến của bộ sinh được áp dụng đồng nhất).
 *
 * 1. Thành phần của davila7/claude-code-templates: sinh hướng dẫn từ chính tệp thành phần
 *    (frontmatter của agent/command/skill, cấu hình JSON của MCP/hook/setting).
 * 2. Các dự án khác: hướng dẫn và câu lệnh chép từ README chính thức (đọc ngày 2026-10-23).
 * 3. Bỏ cấu hình dùng lệnh `agy` khi README của nguồn không có hướng dẫn tương ứng (giữ cho dự án AI HUB của chủ dự án).
 * 4. README hiển thị (readmeVi) có cấu trúc sinh tự động: sinh lại mục 3 (cài đặt), 4 (sử dụng), 5 (cấu hình)
 *    từ configs, installGuideVi, usageGuideVi, samplePromptsVi để không còn mâu thuẫn với các tab khác.
 *
 * Sau khi chạy: npm run data:validate -- --online --write
 */
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const DATA_FILE = path.join(__dirname, '..', '..', 'src', 'data', 'allTools.json');
const TEMPLATES_RE = /^https:\/\/github\.com\/davila7\/claude-code-templates\/tree\/main\/cli-tool\/components\/(agents|commands|mcps|settings|hooks|skills)\/(.+?)(\.json|\.md)?$/;
const COMPONENT_FLAGS = { agents: 'agent', commands: 'command', mcps: 'mcp', settings: 'setting', hooks: 'hook', skills: 'skill' };

const isPublished = (t) => t.status === 'published' || !t.status;
const code = (s) => `\`${s}\``;

// ---------------------------------------------------------------------------
// Đọc tệp thành phần
// ---------------------------------------------------------------------------
function readComponents() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'aihub-cct-'));
  try {
    const env = { ...process.env, GIT_TERMINAL_PROMPT: '0' };
    const git = (...a) => execFileSync('git', a, { env, maxBuffer: 256 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] });
    git('clone', '-q', '--depth', '1', '--filter=blob:none', '--sparse', 'https://github.com/davila7/claude-code-templates', dir);
    git('-C', dir, 'sparse-checkout', 'set', 'cli-tool/components');
    const files = new Map();
    const walk = (rel) => {
      for (const entry of fs.readdirSync(path.join(dir, rel), { withFileTypes: true })) {
        const child = `${rel}/${entry.name}`;
        if (entry.isDirectory()) walk(child);
        else if (/\.(md|json)$/.test(entry.name)) files.set(child, fs.readFileSync(path.join(dir, child), 'utf-8'));
      }
    };
    walk('cli-tool/components');
    return files;
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

// Frontmatter YAML đơn giản: khóa: giá trị trên một dòng (giá trị có thể nằm trong dấu nháy)
function parseFrontmatter(text) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text);
  const fields = {};
  if (!m) return fields;
  for (const line of m[1].split(/\r?\n/)) {
    const kv = /^([A-Za-z][\w-]*):\s*(.*)$/.exec(line);
    if (!kv) continue;
    let value = kv[2].trim();
    if (/^".*"$/.test(value)) {
      try { value = JSON.parse(value); } catch (_) { value = value.slice(1, -1); }
    } else if (/^'.*'$/.test(value)) {
      value = value.slice(1, -1).replace(/''/g, "'");
    }
    fields[kv[1]] = value;
  }
  return fields;
}

// Mô tả gốc: bỏ phần ví dụ, gộp khoảng trắng, giới hạn độ dài theo câu
function cleanDescription(desc) {
  let text = String(desc || '').split(/<example>/i)[0].replace(/\\n/g, ' ').replace(/\s+/g, ' ').trim();
  // Câu cuối kết thúc bằng dấu hai chấm dẫn vào phần ví dụ đã bị bỏ: lược câu đó
  if (text.endsWith(':')) {
    const lastEnd = Math.max(text.lastIndexOf('. '), text.lastIndexOf('! '), text.lastIndexOf('? '));
    if (lastEnd > 0) text = text.slice(0, lastEnd + 1);
  }
  if (text.length > 420) {
    const cut = text.slice(0, 420);
    const end = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('. '));
    text = end > 120 ? cut.slice(0, end + 1) : `${cut.trim()}…`;
  }
  return text;
}

const RUNTIME_REQUIREMENTS = {
  npx: 'Node.js (để chạy npx)', node: 'Node.js', uvx: 'uv (cung cấp lệnh uvx)', uv: 'uv',
  docker: 'Docker', python: 'Python', python3: 'Python 3', bash: 'bash', jq: 'jq'
};
const isPlaceholder = (v) => typeof v === 'string' && (/^</.test(v) || /your[-_ ]|YOUR_|api[-_]?key$|xxx/i.test(v) || v === '');

function guideForComponent(kind, name, content) {
  const baseName = name.split('/').pop();
  const cmd = `npx claude-code-templates@latest --${COMPONENT_FLAGS[kind]} ${name} --yes`;
  const install = ['Yêu cầu: Claude Code và Node.js (để chạy npx).', 'Bước 1: Mở terminal tại thư mục gốc của dự án.', `Bước 2: Chạy ${code(cmd)}.`];
  const usage = [];
  let original = '';

  if (kind === 'agents' || kind === 'commands' || kind === 'skills') {
    const fm = parseFrontmatter(content);
    original = cleanDescription(fm.description);
    if (kind === 'agents') {
      install.push(`Bước 3: Lệnh tạo tệp ${code(`.claude/agents/${baseName}.md`)} chứa chỉ dẫn hệ thống của tác tử. Mở Claude Code trong thư mục dự án để sử dụng.`);
      usage.push(`Claude Code tự giao việc cho tác tử ${code(fm.name || baseName)} khi yêu cầu của bạn khớp với mô tả của tác tử. Có thể gọi trực tiếp, ví dụ: "Dùng tác tử ${fm.name || baseName} để …". Xem và quản lý danh sách tác tử bằng lệnh ${code('/agents')}.`);
      if (fm.tools) usage.push(`Công cụ tác tử được phép dùng: ${fm.tools}.`);
      if (fm.model) usage.push(`Mô hình chỉ định trong tệp tác tử: ${fm.model}.`);
    } else if (kind === 'commands') {
      install.push(`Bước 3: Lệnh tạo tệp ${code(`.claude/commands/${baseName}.md`)}. Mở Claude Code trong thư mục dự án để sử dụng.`);
      const hint = fm['argument-hint'] ? ` ${fm['argument-hint']}` : '';
      usage.push(`Trong Claude Code, gõ ${code(`/${baseName}${hint}`)} để chạy lệnh.`);
      if (fm['allowed-tools']) usage.push(`Công cụ lệnh được phép dùng: ${fm['allowed-tools']}.`);
    } else {
      install.push(`Bước 3: Lệnh tạo tệp ${code(`.claude/skills/${baseName}/SKILL.md`)}. Mở Claude Code trong thư mục dự án để sử dụng.`);
      usage.push(`Claude Code đọc mô tả trong SKILL.md và tự nạp kỹ năng ${code(fm.name || baseName)} khi yêu cầu của bạn phù hợp. Có thể yêu cầu trực tiếp, ví dụ: "Dùng kỹ năng ${fm.name || baseName} để …".`);
    }
  } else {
    const json = JSON.parse(content);
    const serverDescriptions = Object.values(json.mcpServers || {}).map(sv => sv && sv.description).filter(Boolean);
    original = cleanDescription(json.description || serverDescriptions[0]);
    if (kind === 'mcps') {
      const servers = Object.entries(json.mcpServers || {});
      const requirements = new Set();
      const envVars = [];
      for (const [, server] of servers) {
        if (server.command && RUNTIME_REQUIREMENTS[server.command]) requirements.add(RUNTIME_REQUIREMENTS[server.command]);
        for (const [key, value] of Object.entries(server.env || {})) if (isPlaceholder(value)) envVars.push(key);
      }
      if (requirements.size) install[0] = `Yêu cầu: Claude Code, Node.js (để chạy npx) và ${[...requirements].filter(r => !r.startsWith('Node.js')).join(', ') || 'Node.js'}.`.replace(' và Node.js.', '.');
      install.push(`Bước 3: Lệnh ghi cấu hình máy chủ ${servers.map(([n]) => code(n)).join(', ')} vào tệp ${code('.mcp.json')} của dự án (gộp nếu tệp đã có).`);
      if (envVars.length) install.push(`Bước 4: Mở ${code('.mcp.json')} và điền giá trị thật cho biến môi trường: ${envVars.map(code).join(', ')}.`);
      install.push(`Bước ${envVars.length ? 5 : 4}: Khởi động lại Claude Code, kiểm tra kết nối bằng lệnh ${code('/mcp')}.`);
      usage.push(`Sau khi kết nối, Claude Code dùng các công cụ do máy chủ MCP ${servers.map(([n]) => code(n)).join(', ')} cung cấp khi yêu cầu của bạn cần đến.`);
      for (const [n, server] of servers) {
        const run = server.url ? `kết nối từ xa tới ${server.url}` : `chạy lệnh ${code([server.command, ...(server.args || [])].join(' '))}`;
        usage.push(`Máy chủ ${code(n)}: ${run}.`);
      }
    } else {
      install.push(`Bước 3: Lệnh gộp cấu hình vào tệp cài đặt của Claude Code; chọn ${code('~/.claude/settings.json')} (áp dụng cho mọi dự án) hoặc ${code('.claude/settings.json')} (chỉ dự án này) khi được hỏi.`);
      if (kind === 'hooks') {
        const requirements = new Set();
        for (const [event, entries] of Object.entries(json.hooks || {})) {
          for (const entry of entries || []) {
            const matcher = entry.matcher ? ` (điều kiện khớp: ${code(entry.matcher)})` : '';
            usage.push(`Hook chạy tự động ở sự kiện ${code(event)}${matcher}.`);
            for (const hook of entry.hooks || []) {
              const first = String(hook.command || '').trim().split(/\s+/)[0];
              if (RUNTIME_REQUIREMENTS[first]) requirements.add(RUNTIME_REQUIREMENTS[first]);
            }
          }
        }
        if (requirements.size) install.push(`Lệnh của hook cần có sẵn: ${[...requirements].join(', ')}.`);
        install.push('Bước 4: Khởi động lại Claude Code để hook có hiệu lực. Xem các hook đang bật bằng lệnh `/hooks`.');
      } else {
        const keys = Object.keys(json).filter(k => k !== 'description');
        const placeholders = [];
        const collect = (obj, prefix) => {
          for (const [k, v] of Object.entries(obj || {})) {
            if (v && typeof v === 'object' && !Array.isArray(v)) collect(v, `${prefix}${k}.`);
            else if (isPlaceholder(v)) placeholders.push(`${prefix}${k}`);
          }
        };
        collect(json, '');
        if (placeholders.length) install.push(`Bước 4: Thay giá trị mẫu bằng giá trị thật cho: ${placeholders.map(code).join(', ')}.`);
        install.push(`Bước ${placeholders.length ? 5 : 4}: Khởi động lại Claude Code để cấu hình có hiệu lực.`);
        usage.push(`Cấu hình đặt các mục: ${keys.map(code).join(', ')}. Sau khi khởi động lại, Claude Code áp dụng các giá trị này cho mọi phiên làm việc thuộc phạm vi đã chọn.`);
      }
    }
  }
  if (original) usage.push(`Mô tả gốc của tác giả (tiếng Anh): ${original}`);
  return { installGuideVi: install.join('\n'), usageGuideVi: usage.join('\n') };
}

// ---------------------------------------------------------------------------
// Dự án khác: chép từ README chính thức
// ---------------------------------------------------------------------------
const mcp = (name, server) => JSON.stringify({ mcpServers: { [name]: server } }, null, 2);
const steps = (caiDat, nguon) => JSON.stringify({ caiDat, nguon }, null, 2);
const CC = { platform: 'claude_code', platformName: 'Claude Code' };
const DESKTOP = { platform: 'claude_desktop', platformName: 'Claude Desktop' };
const TERM = { platform: 'web', platformName: 'Dòng lệnh (Terminal)' };
const gh = (repo) => `https://github.com/${repo}`;
const termTool = (repo, cmds, install, usage) => ({
  configs: [{ ...TERM, cliCommand: cmds[0], jsonConfig: steps(cmds, gh(repo)) }], install, usage
});

const README_GUIDES = {
  'wf-mvg7kr48-fxdt': termTool('openai/whisper', ['pip install -U openai-whisper', 'whisper audio.mp3 --language Vietnamese'],
    ['Yêu cầu: Python và ffmpeg (ví dụ cài bằng `brew install ffmpeg` hoặc trình quản lý gói của hệ điều hành).', 'Bước 1: Chạy `pip install -U openai-whisper`.'],
    ['Chuyển giọng nói tiếng Việt thành văn bản: `whisper audio.mp3 --language Vietnamese`.', 'Chọn mô hình bằng tham số `--model` (ví dụ `--model turbo`). Có thể gọi từ Python qua `whisper.load_model(...)` và `model.transcribe(...)`.']),
  'wf-mvg7kr48-ppn8': termTool('labring/FastGPT', ['docker compose up -d'],
    ['Yêu cầu: Docker và Docker Compose.', 'Bước 1: Tải tệp docker-compose theo hướng dẫn triển khai trong README của repo.', 'Bước 2: Chạy `docker compose up -d` trong thư mục chứa tệp.'],
    ['Mở giao diện web của FastGPT trên cổng được cấu hình trong tệp docker-compose để tạo ứng dụng hỏi đáp và kho tri thức.']),
  'wf-mvg7kr48-81bo': termTool('langflow-ai/langflow', ['uv pip install langflow -U', 'uv run langflow run'],
    ['Yêu cầu: Python và uv.', 'Bước 1: Chạy `uv pip install langflow -U`.', 'Hoặc chạy bằng Docker: `docker run -p 7860:7860 langflowai/langflow:latest`.'],
    ['Khởi động bằng `uv run langflow run`, mở http://127.0.0.1:7860 để thiết kế luồng tác tử bằng giao diện kéo thả.']),
  'wf-mvg7kr48-0zss': termTool('FlowiseAI/Flowise', ['npm install -g flowise', 'npx flowise start'],
    ['Yêu cầu: Node.js.', 'Bước 1: Chạy `npm install -g flowise`.'],
    ['Khởi động bằng `npx flowise start`, mở http://localhost:3000 để xây dựng luồng LLM bằng giao diện kéo thả.']),
  'wf-mvg7kr48-wfti': termTool('n8n-io/n8n', ['docker run -it --rm --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n'],
    ['Yêu cầu: Docker (hoặc Node.js để chạy `npx n8n`).', 'Bước 1: Chạy `docker run -it --rm --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n`.'],
    ['Mở http://localhost:5678 để tạo quy trình tự động hóa; dữ liệu được lưu trong volume `n8n_data`.']),
  'ext2-mvg75xvo-3cpf': termTool('shadcn-ui/ui', ['npx shadcn@latest init', 'npx shadcn@latest add button'],
    ['Yêu cầu: Node.js và một dự án React (Next.js, Vite...).', 'Bước 1: Trong thư mục dự án, chạy `npx shadcn@latest init`.'],
    ['Thêm thành phần giao diện vào dự án, ví dụ `npx shadcn@latest add button`; mã nguồn thành phần được chép vào dự án để tùy biến. Tài liệu: https://ui.shadcn.com/docs.']),
  'ext2-mvg75xvo-lxme': termTool('langchain-ai/langgraph', ['pip install -U langgraph'],
    ['Yêu cầu: Python.', 'Bước 1: Chạy `pip install -U langgraph`.'],
    ['Xây dựng tác tử có trạng thái bằng cách định nghĩa đồ thị (StateGraph) gồm các nút và cạnh trong mã Python; xem ví dụ trong README của repo.']),
  'ext2-mvg75xvo-9g47': termTool('deepseek-ai/DeepSeek-V3', ['git clone https://github.com/deepseek-ai/DeepSeek-V3.git', 'cd DeepSeek-V3/inference', 'pip install -r requirements.txt'],
    ['Yêu cầu: Python và GPU đủ bộ nhớ để chạy mô hình.', 'Bước 1: `git clone https://github.com/deepseek-ai/DeepSeek-V3.git`.', 'Bước 2: `cd DeepSeek-V3/inference` rồi `pip install -r requirements.txt`.'],
    ['Tải trọng số mô hình từ Hugging Face và chạy suy luận theo mục "How to Run Locally" trong README (hỗ trợ SGLang, vLLM, LMDeploy...).']),
  'ext2-mvg75xvo-x08e': termTool('microsoft/autogen', ['pip install -U "autogen-agentchat" "autogen-ext[openai]"'],
    ['Yêu cầu: Python.', 'Bước 1: Chạy `pip install -U "autogen-agentchat" "autogen-ext[openai]"`.', 'Giao diện không cần lập trình: `pip install -U "autogenstudio"`.'],
    ['Tạo hệ thống đa tác tử bằng các lớp như AssistantAgent trong mã Python; cần khóa API của nhà cung cấp mô hình (ví dụ OpenAI).']),
  'ext2-mvg75xvo-xyb2': termTool('comfyanonymous/ComfyUI', ['pip install comfy-cli', 'comfy install'],
    ['Yêu cầu: Python và GPU (khuyến nghị).', 'Bước 1: `pip install comfy-cli`.', 'Bước 2: `comfy install`.'],
    ['Khởi động bằng `comfy launch`, mở giao diện web để dựng quy trình sinh ảnh bằng các nút.']),
  'ext-mvg74gxr-uhtb': termTool('astral-sh/uv', ['curl -LsSf https://astral.sh/uv/install.sh | sh'],
    ['Bước 1: Chạy `curl -LsSf https://astral.sh/uv/install.sh | sh` (macOS, Linux) hoặc `pip install uv`.'],
    ['Quản lý dự án Python: `uv init`, thêm thư viện bằng `uv add requests`, chạy công cụ không cần cài đặt bằng `uvx`.']),
  'ext-mvg74gxr-1uel': termTool('mem0ai/mem0', ['pip install mem0ai'],
    ['Yêu cầu: Python (hoặc Node.js: `npm install mem0ai`).', 'Bước 1: Chạy `pip install mem0ai`.'],
    ['Tạo bộ nhớ dài hạn cho tác tử bằng lớp `Memory` trong mã Python: thêm (`add`) và tìm kiếm (`search`) ký ức theo người dùng.']),
  'ext-mvg74gxr-88om': termTool('infiniflow/ragflow', ['git clone https://github.com/infiniflow/ragflow.git', 'cd ragflow/docker', 'docker compose -f docker-compose.yml up -d'],
    ['Yêu cầu: Docker 24 trở lên và Docker Compose 2.26 trở lên.', 'Bước 1: `git clone https://github.com/infiniflow/ragflow.git`.', 'Bước 2: `cd ragflow/docker` rồi `docker compose -f docker-compose.yml up -d`.'],
    ['Mở giao diện web của RAGFlow để tải tài liệu lên kho tri thức và tạo trợ lý hỏi đáp dựa trên tài liệu.']),
  'ext-mvg74gxr-3ywv': { configs: [{ ...CC, cliCommand: '/plugin marketplace add crewAIInc/skills', jsonConfig: steps(['/plugin marketplace add crewAIInc/skills', '/plugin install crewai-skills@crewai-plugins'], gh('crewAIInc/crewAI')) },
    { ...TERM, cliCommand: 'uv tool install crewai', jsonConfig: steps(['curl -LsSf https://astral.sh/uv/install.sh | sh', 'uv tool install crewai'], gh('crewAIInc/crewAI')) }],
    install: ['Yêu cầu: Python và uv.', 'Bước 1: Cài uv: `curl -LsSf https://astral.sh/uv/install.sh | sh`.', 'Bước 2: Cài CrewAI CLI: `uv tool install crewai`.', 'Kỹ năng cho Claude Code: `/plugin marketplace add crewAIInc/skills` rồi `/plugin install crewai-skills@crewai-plugins`.'],
    usage: ['Tạo dự án đa tác tử bằng `crewai create crew <tên>`, chạy bằng `crewai run`. Các tác tử và nhiệm vụ được khai báo trong tệp cấu hình của dự án.'] },
  'ext-mvg74gxr-m3pv': termTool('ollama/ollama', ['curl -fsSL https://ollama.com/install.sh | sh'],
    ['Bước 1: Linux: `curl -fsSL https://ollama.com/install.sh | sh`; macOS và Windows: tải bộ cài từ https://ollama.com.'],
    ['Chạy mô hình cục bộ, ví dụ `ollama run gemma4`. Gọi từ Python bằng thư viện `ollama` (`pip install ollama`) hoặc qua REST API tại http://localhost:11434.']),
  'ext-mvg74gxr-4vsb': termTool('cline/cline', ['npm i -g cline'],
    ['Yêu cầu: Node.js.', 'Bước 1: Chạy `npm i -g cline` (hoặc cài phần mở rộng Cline trong VS Code).'],
    ['Chạy `cline` trong thư mục dự án để giao nhiệm vụ lập trình cho tác tử; tác tử đề xuất thay đổi và chờ bạn duyệt.']),
  'ext-mvg74gxr-ji4y': termTool('madnh/hanhchinhvn', ['npm install hanhchinhvn'],
    ['Yêu cầu: Node.js.', 'Bước 1: Chạy `npm install hanhchinhvn`.'],
    ['Nạp dữ liệu đơn vị hành chính Việt Nam (tỉnh, huyện, xã) từ gói trong mã JavaScript; xem cấu trúc dữ liệu trong README của repo.']),
  'skill-311': { configs: [{ ...CC, cliCommand: 'npx @workorai/agent-kit install --agent claude', jsonConfig: steps(['npx @workorai/agent-kit install --agent claude'], gh('work0r-ai/agent-kit')) }],
    install: ['Yêu cầu: Node.js.', 'Bước 1: Chạy `npx @workorai/agent-kit install --agent claude` (thay `claude` bằng `codex` hoặc `opencode` cho tác tử khác).'],
    usage: ['Sau khi cài, mở Claude Code; các kỹ năng của bộ công cụ được nạp tự động khi yêu cầu phù hợp.'] },
  'skill-480': { configs: [{ ...CC, cliCommand: '/plugin marketplace add internet-court/internet-court-skill', jsonConfig: steps(['/plugin marketplace add internet-court/internet-court-skill', '/plugin install internet-court@internet-court'], gh('internet-court/internet-court-skill')) }],
    install: ['Bước 1: Trong Claude Code: `/plugin marketplace add internet-court/internet-court-skill`.', 'Bước 2: `/plugin install internet-court@internet-court`.', 'Cách khác: `git clone https://github.com/internet-court/internet-court-skill ~/.claude/skills/internet-court`.'],
    usage: ['Claude Code tự nạp kỹ năng khi yêu cầu của bạn phù hợp với mô tả của kỹ năng.'] },
  'skill-677': { configs: [{ ...CC, cliCommand: 'git clone https://github.com/conorbronsdon/avoid-ai-writing ~/.claude/skills/avoid-ai-writing', jsonConfig: steps(['git clone https://github.com/conorbronsdon/avoid-ai-writing ~/.claude/skills/avoid-ai-writing'], gh('conorbronsdon/avoid-ai-writing')) }],
    install: ['Bước 1: `git clone https://github.com/conorbronsdon/avoid-ai-writing ~/.claude/skills/avoid-ai-writing`.', 'Cách khác trong Claude Code: `/plugin marketplace add conorbronsdon/avoid-ai-writing` rồi `/plugin install avoid-ai-writing@conorbronsdon-skills`.'],
    usage: ['Yêu cầu Claude rà soát hoặc viết lại văn bản; kỹ năng giúp loại bỏ các mẫu câu dễ nhận ra là do AI viết.'] },
  'skill-938': termTool('ManimCommunity/manim', ['pip install manim'],
    ['Yêu cầu: Python, ffmpeg và (tùy chọn) LaTeX; xem https://docs.manim.community/en/stable/installation.html.', 'Bước 1: Chạy `pip install manim` (hoặc `uv add manim`).'],
    ['Viết lớp Scene trong tệp Python rồi dựng video bằng `manim -pql tep.py TenScene`.']),
  'skill-939': termTool('motion-canvas/motion-canvas', ['npm init @motion-canvas@latest'],
    ['Yêu cầu: Node.js.', 'Bước 1: Chạy `npm init @motion-canvas@latest` để tạo dự án mới.'],
    ['Viết hoạt cảnh bằng TypeScript trong thư mục `src/scenes`, xem trước bằng `npm start` trong dự án.']),
  'skill-940': { configs: [{ ...CC, cliCommand: 'npx skills add remotion-dev/skills', jsonConfig: steps(['npx skills add remotion-dev/skills'], gh('remotion-dev/skills')) }],
    install: ['Yêu cầu: Node.js.', 'Bước 1: Chạy `npx skills add remotion-dev/skills`.'],
    usage: ['Yêu cầu Claude tạo hoặc chỉnh sửa video bằng Remotion; kỹ năng cung cấp hướng dẫn chuyên biệt cho thư viện này.'] },
  'mcpmarket-1852': { configs: [{ ...DESKTOP, cliCommand: 'npx -y firecrawl-mcp', jsonConfig: mcp('firecrawl-mcp', { command: 'npx', args: ['-y', 'firecrawl-mcp'], env: { FIRECRAWL_API_KEY: 'fc-YOUR_API_KEY' } }) }],
    install: ['Yêu cầu: Node.js và khóa API Firecrawl.', 'Bước 1: Thêm cấu hình JSON bên dưới vào tệp cấu hình MCP của ứng dụng.', 'Bước 2: Thay `fc-YOUR_API_KEY` bằng khóa thật, khởi động lại ứng dụng.'],
    usage: ['Tác tử dùng các công cụ của Firecrawl để thu thập và trích xuất nội dung trang web khi yêu cầu cần đến.'] },
  'mcpmarket-1853': { configs: [{ ...DESKTOP, cliCommand: '', jsonConfig: mcp('browserbase', { type: 'http', url: 'https://mcp.browserbase.com/mcp' }) }],
    install: ['Bước 1: Thêm cấu hình JSON bên dưới (máy chủ từ xa https://mcp.browserbase.com/mcp) vào tệp cấu hình MCP của ứng dụng.', 'Ứng dụng không hỗ trợ kết nối HTTP: dùng `npx mcp-remote https://mcp.browserbase.com/mcp` làm lệnh của máy chủ.'],
    usage: ['Tác tử điều khiển trình duyệt trên đám mây Browserbase (mở trang, thao tác, chụp màn hình) khi yêu cầu cần đến.'] },
  'mcpmarket-1854': { configs: [{ ...DESKTOP, cliCommand: 'uvx elevenlabs-mcp', jsonConfig: mcp('ElevenLabs', { command: 'uvx', args: ['elevenlabs-mcp'], env: { ELEVENLABS_API_KEY: '<insert-your-api-key-here>' } }) }],
    install: ['Yêu cầu: uv (lệnh uvx) và khóa API ElevenLabs.', 'Bước 1: Thêm cấu hình JSON bên dưới vào tệp cấu hình MCP của ứng dụng.', 'Bước 2: Điền `ELEVENLABS_API_KEY`, khởi động lại ứng dụng.'],
    usage: ['Tác tử chuyển văn bản thành giọng nói, nhân bản giọng và xử lý âm thanh qua API ElevenLabs.'] },
  'mcpmarket-1855': { configs: [{ ...CC, cliCommand: 'claude plugin install exa@claude-plugins-official', jsonConfig: mcp('exa', { type: 'streamable-http', url: 'https://mcp.exa.ai/mcp' }) }],
    install: ['Claude Code: `claude plugin install exa@claude-plugins-official`.', 'Ứng dụng khác: thêm cấu hình JSON bên dưới (máy chủ từ xa https://mcp.exa.ai/mcp).'],
    usage: ['Tác tử tìm kiếm web và đọc nội dung trang bằng Exa khi yêu cầu cần thông tin mới.'] },
  'mcpmarket-1856': { configs: [{ ...CC, cliCommand: 'claude mcp add --transport http tavily https://mcp.tavily.com/mcp/?tavilyApiKey=<your-api-key>', jsonConfig: mcp('tavily-mcp', { command: 'npx', args: ['-y', 'tavily-mcp@latest'], env: { TAVILY_API_KEY: '<your-api-key>' } }) }],
    install: ['Yêu cầu: khóa API Tavily.', 'Claude Code: `claude mcp add --transport http tavily https://mcp.tavily.com/mcp/?tavilyApiKey=<your-api-key>`.', 'Chạy cục bộ: dùng cấu hình JSON bên dưới (`npx -y tavily-mcp@latest`).'],
    usage: ['Tác tử tìm kiếm và trích xuất nội dung web bằng Tavily khi yêu cầu cần thông tin mới.'] },
  'mcpmarket-1858': { configs: null,
    install: ['Bước 1: Trong Claude Code, chạy `/plugin install superpowers@claude-plugins-official`.', 'Cách khác: `/plugin marketplace add obra/superpowers-marketplace` rồi cài từ kho đó.'],
    usage: ['Bộ kỹ năng được Claude Code tự nạp theo tình huống (lập kế hoạch, kiểm thử, gỡ lỗi...); xem danh sách kỹ năng trong README của repo.'] },
  'mcpmarket-1860': { configs: null,
    install: ['Yêu cầu: Node.js.', 'Bước 1: Khởi tạo: `npx ruflo@latest init wizard`.', 'Bước 2: Chạy máy chủ MCP: `npx -y ruflo@latest mcp start` (hoặc dùng cấu hình JSON bên dưới).'],
    usage: ['Điều phối nhiều tác tử cho Claude Code thông qua các công cụ MCP do Ruflo cung cấp; xem các chế độ trong README của repo.'] },
  'mcpmarket-1861': { configs: null,
    install: ['Yêu cầu: Node.js.', 'Bước 1: Chạy `npm install -g @fission-ai/openspec@latest` (hoặc `brew install openspec`).'],
    usage: ['Chạy `openspec init` trong dự án để quản lý đặc tả và đề xuất thay đổi cho tác tử lập trình.'] },
  'mcpmarket-1862': { configs: null,
    install: ['Yêu cầu: Node.js 22.13 trở lên.', 'Bước 1: Chạy `npx ctx7 setup --claude` (chọn chế độ CLI + Skills hoặc MCP khi được hỏi).', 'Cấu hình MCP thủ công: máy chủ từ xa https://mcp.context7.com/mcp (cấu hình JSON bên dưới).'],
    usage: ['Thêm "use context7" vào yêu cầu để tác tử lấy tài liệu mới nhất của thư viện thay vì dựa vào kiến thức cũ.'] }
};

// ---------------------------------------------------------------------------
const tools = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
const stats = { componentGuides: 0, readmeGuides: 0, missingComponentFile: 0 };
const pending = tools.filter(t => isPublished(t) && t.verification &&
  (TEMPLATES_RE.test(t.sourceUrl || '') || README_GUIDES[t.id]));

if (pending.some(t => TEMPLATES_RE.test(t.sourceUrl || ''))) {
  const files = readComponents();
  for (const tool of pending) {
    const m = TEMPLATES_RE.exec(tool.sourceUrl || '');
    if (!m) continue;
    const [, kind, name, ext] = m;
    const file = ext ? `cli-tool/components/${kind}/${name}${ext}` : `cli-tool/components/${kind}/${name}/SKILL.md`;
    const content = files.get(file);
    if (content === undefined) { stats.missingComponentFile++; continue; }
    Object.assign(tool, guideForComponent(kind, name, content));
    tool.verification.guideIsTemplate = false;
    stats.componentGuides++;
  }
}

for (const tool of pending) {
  const guide = README_GUIDES[tool.id];
  if (!guide) continue;
  if (guide.configs) {
    tool.configs = guide.configs;
    tool.platforms = [...new Set(guide.configs.map(c => c.platform))];
  }
  tool.installGuideVi = guide.install.join('\n');
  tool.usageGuideVi = [...guide.usage, `Tài liệu gốc: ${tool.sourceUrl}`].join('\n');
  tool.verification.guideIsTemplate = false;
  stats.readmeGuides++;
}

// 3. Lệnh `agy ...` không có trong README của nguồn (đã kiểm tra morluto/rea, vietnamese-mcp, kyberswap)
const KEEP_AGY = new Set(['aihub-vn-smart-mcp-gateway']);
for (const tool of tools) {
  if (!isPublished(tool) || KEEP_AGY.has(tool.id)) continue;
  const kept = (tool.configs || []).filter(c => !/^agy\s/.test(String(c.cliCommand || '').trim()));
  if (kept.length && kept.length < (tool.configs || []).length) {
    tool.configs = kept;
    tool.platforms = [...new Set(kept.map(c => c.platform))];
    stats.agyRemoved = (stats.agyRemoved || 0) + 1;
  }
}

// 4. Đồng bộ mục 3-5 của README sinh tự động với dữ liệu hiện tại
const README_START = '\n## 3. Hướng Dẫn Cài Đặt & Thiết Lập Môi Trường';
const README_END = '\n## 6. ';
const fence = (lang, body) => ['```' + lang, body, '```'].join('\n');
function readmeSections(tool) {
  const configs = tool.configs || [];
  const install = ['## 3. Hướng Dẫn Cài Đặt & Thiết Lập Môi Trường'];
  for (const cfg of configs.filter(c => c.cliCommand)) install.push(`### Cài đặt cho ${cfg.platformName}:`, fence('bash', cfg.cliCommand), '');
  install.push(tool.installGuideVi || '');
  const usage = ['## 4. Hướng Dẫn Sử Dụng & Kịch Bản Thực Tế', tool.usageGuideVi || ''];
  const prompts = Array.isArray(tool.samplePromptsVi) ? tool.samplePromptsVi.filter(Boolean) : [];
  if (prompts.length) usage.push('', '### Các Câu Lệnh / Lời Nhắc (Prompts) Mẫu Bằng Tiếng Việt', ...prompts.map((p, i) => `${i + 1}. \`"${p}"\``));
  const config = ['## 5. Mẫu Cấu Hình Tích Hợp Hệ Thống'];
  for (const cfg of configs) {
    config.push(`### Cấu hình cho ${cfg.platformName}`);
    if (cfg.cliCommand) config.push('**Lệnh cài đặt:**', fence('bash', cfg.cliCommand), '');
    config.push('**Mẫu cấu hình JSON:**', fence('json', cfg.jsonConfig), '');
  }
  return ['', install.join('\n'), '', '---', '', usage.join('\n'), '', '---', '', config.join('\n'), '', '---', ''].join('\n');
}
for (const tool of tools) {
  if (!isPublished(tool) || typeof tool.readmeVi !== 'string') continue;
  const start = tool.readmeVi.indexOf(README_START);
  const end = tool.readmeVi.indexOf(README_END, start + 1);
  if (start === -1 || end === -1) continue;
  const updated = tool.readmeVi.slice(0, start) + readmeSections(tool) + tool.readmeVi.slice(end);
  if (updated !== tool.readmeVi) {
    tool.readmeVi = updated;
    stats.readmeSynced = (stats.readmeSynced || 0) + 1;
  }
}

fs.writeFileSync(DATA_FILE, JSON.stringify(tools, null, 2), 'utf-8');
const remaining = tools.filter(t => isPublished(t) && t.verification && t.verification.guideIsTemplate);
console.log(stats);
console.log(`Còn hướng dẫn dạng mẫu: ${remaining.length}`, remaining.map(t => t.id));
