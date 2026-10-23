#!/usr/bin/env node
/**
 * Kiểm định chất lượng kho dữ liệu công cụ (src/data/allTools.json).
 *
 * Cách dùng:
 *   node scripts/validate-data.cjs             Kiểm tra ngoại tuyến, in báo cáo
 *   node scripts/validate-data.cjs --online    Thêm kiểm tra mạng: repo GitHub tồn tại, gói npm tồn tại,
 *                                              liên kết trang chủ phản hồi
 *   node scripts/validate-data.cjs --online --write
 *                                              Ghi kết quả vào trường `verification`, cập nhật `linkHealth`
 *   GITHUB_TOKEN=... node scripts/validate-data.cjs --online --write
 *                                              Lấy thêm số sao thật từ GitHub API, đánh dấu starsVerified
 *
 * Nguyên tắc: không xóa bản ghi nào. Bản ghi không xác minh được chỉ bị gắn nhãn.
 * Báo cáo chi tiết được ghi ra scripts/data-validation-report.json.
 */
const fs = require('node:fs');
const path = require('node:path');
const { execFile } = require('node:child_process');

const DATA_FILE = path.join(__dirname, '..', 'src', 'data', 'allTools.json');
const REPORT_FILE = path.join(__dirname, 'data-validation-report.json');
const args = new Set(process.argv.slice(2));
const ONLINE = args.has('--online');
const WRITE = args.has('--write');
const CONCURRENCY = 8;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';

// Mở đầu của hai mẫu hướng dẫn sinh tự động, chỉ thay tên công cụ
const TEMPLATE_PREFIXES = {
  installGuideVi: 'Bước 1 (Chuẩn bị môi trường): Kiểm tra máy tính đã cài đặt sẵn Node.js',
  usageGuideVi: 'Kịch bản mẫu: Áp dụng trong quy trình phát triển và vận hành hệ thống thông tin.'
};
const REQUIRED_FIELDS = ['id', 'name', 'sourceUrl', 'summaryVi', 'installGuideVi', 'usageGuideVi'];

const normalizeUrl = (u) => String(u || '').trim().toLowerCase().replace(/\.git$/, '').replace(/[#?].*$/, '').replace(/\/+$/, '');

function parseGithubRepo(url) {
  const m = /^https?:\/\/github\.com\/([^/\s]+)\/([^/\s#?]+)/i.exec(String(url || ''));
  if (!m) return null;
  return { owner: m[1], repo: m[2].replace(/\.git$/, '') };
}

// Tên gói npm hợp lệ: @scope/ten hoặc ten, bỏ hậu tố phiên bản @latest, @1.2.3
function cleanPackageName(raw) {
  if (!raw || raw.startsWith('-') || raw.startsWith('.') || raw.includes('/') && !raw.startsWith('@')) return null;
  let name = raw.replace(/^["']|["']$/g, '');
  const at = name.lastIndexOf('@');
  if (at > 0) name = name.slice(0, at);
  return /^(@[a-z0-9][\w.-]*\/)?[a-z0-9][\w.-]*$/i.test(name) ? name.toLowerCase() : null;
}

function extractNpmPackages(tool) {
  const packages = new Set();
  const fromCommand = (cmd) => {
    const tokens = String(cmd || '').split(/\s+/);
    for (let i = 0; i < tokens.length; i++) {
      const t = tokens[i].replace(/^["']/, '');
      if (t === 'npx') {
        let j = i + 1;
        while (j < tokens.length && tokens[j].startsWith('-')) j++;
        const name = cleanPackageName(tokens[j]);
        if (name) packages.add(name);
      }
      if (t === 'npm' && /^(install|i|add)$/.test(tokens[i + 1] || '')) {
        for (let j = i + 2; j < tokens.length && !/^(&&|;|\|)/.test(tokens[j]); j++) {
          const name = cleanPackageName(tokens[j]);
          if (name) packages.add(name);
        }
      }
    }
  };
  for (const cfg of tool.configs || []) {
    fromCommand(cfg.cliCommand);
    try {
      const servers = JSON.parse(cfg.jsonConfig || '{}').mcpServers || {};
      for (const server of Object.values(servers)) {
        if (server && server.command === 'npx' && Array.isArray(server.args)) {
          const name = cleanPackageName(server.args.find(a => !String(a).startsWith('-')));
          if (name) packages.add(name);
        }
      }
    } catch (_) { /* jsonConfig không phải JSON hợp lệ: bỏ qua */ }
  }
  return [...packages];
}

async function runPool(items, worker) {
  const results = new Map();
  let index = 0;
  let done = 0;
  const runners = Array.from({ length: Math.min(CONCURRENCY, items.length) }, async () => {
    while (index < items.length) {
      const item = items[index++];
      results.set(item, await worker(item));
      done++;
      if (done % 100 === 0) process.stderr.write(`  ... ${done}/${items.length}\n`);
    }
  });
  await Promise.all(runners);
  return results;
}

// Repo GitHub công khai tồn tại khi git ls-remote đọc được HEAD (không cần token, không tốn hạn mức API)
function githubRepoExists({ owner, repo }) {
  return new Promise(resolve => {
    execFile('git', ['ls-remote', `https://github.com/${owner}/${repo}`, 'HEAD'],
      { timeout: 30000, env: { ...process.env, GIT_TERMINAL_PROMPT: '0' } },
      (err, stdout) => resolve(!err && stdout.trim().length > 0 ? 'ok' : (err && err.killed ? 'unknown' : 'missing')));
  });
}

async function npmPackageExists(name) {
  try {
    const res = await fetch(`https://registry.npmjs.org/${name.replace('/', '%2f')}`, { method: 'GET', signal: AbortSignal.timeout(15000) });
    if (res.status === 200) return 'ok';
    if (res.status === 404) return 'missing';
    return 'unknown';
  } catch (_) {
    return 'unknown';
  }
}

// Dùng curl để tôn trọng cấu hình proxy (HTTPS_PROXY) của môi trường. Chỉ kết luận "missing" khi máy chủ
// trả lời rõ ràng 404/410; lỗi mạng, bị chặn, hết thời gian chờ đều là "unknown" (không kết luận được).
function urlReachable(url) {
  return new Promise(resolve => {
    execFile('curl', ['-s', '-o', '/dev/null', '-L', '--max-time', '20', '-A', 'Mozilla/5.0 (AI-HUB link checker)', '-w', '%{http_code}', url],
      { timeout: 30000 },
      (_err, stdout) => {
        const status = Number(String(stdout).trim());
        if (status >= 200 && status < 400) resolve('ok');
        else if (status === 404 || status === 410) resolve('missing');
        else resolve('unknown');
      });
  });
}

async function githubStars({ owner, repo }) {
  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, 'User-Agent': 'AI-HUB-validator' },
      signal: AbortSignal.timeout(15000)
    });
    if (!res.ok) return null;
    const body = await res.json();
    return typeof body.stargazers_count === 'number' ? body.stargazers_count : null;
  } catch (_) {
    return null;
  }
}

async function main() {
  const tools = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  const report = { checkedAt: new Date().toISOString(), online: ONLINE, total: tools.length, issues: {} };
  const addIssue = (type, entry) => { (report.issues[type] = report.issues[type] || []).push(entry); };

  // 1. Kiểm tra ngoại tuyến
  const idCount = new Map();
  const urlOwners = new Map();
  for (const t of tools) {
    idCount.set(t.id, (idCount.get(t.id) || 0) + 1);
    const key = normalizeUrl(t.sourceUrl);
    if (key) urlOwners.set(key, [...(urlOwners.get(key) || []), t.id]);
    for (const f of REQUIRED_FIELDS) {
      if (!t[f] || String(t[f]).trim().length === 0) addIssue('missingField', { id: t.id, field: f });
    }
    if (JSON.stringify(t).includes('C:/Users/')) addIssue('localPath', { id: t.id });
  }
  for (const [id, n] of idCount) if (n > 1) addIssue('duplicateId', { id, count: n });
  for (const [url, ids] of urlOwners) if (ids.length > 1) addIssue('duplicateSourceUrl', { url, ids });

  const templateGuide = new Map(tools.map(t => [t.id,
    Object.entries(TEMPLATE_PREFIXES).some(([f, prefix]) => String(t[f] || '').startsWith(prefix))]));
  for (const t of tools) if (templateGuide.get(t.id)) addIssue('templateGuide', { id: t.id });

  // 2. Kiểm tra trực tuyến
  const sourceStatus = new Map();
  const missingPackagesByTool = new Map();
  const starsByTool = new Map();
  if (ONLINE) {
    const repoKeys = [...new Set(tools.map(t => parseGithubRepo(t.sourceUrl)).filter(Boolean).map(r => `${r.owner}/${r.repo}`))];
    process.stderr.write(`Kiểm tra ${repoKeys.length} repo GitHub...\n`);
    const repoResults = await runPool(repoKeys, key => {
      const [owner, repo] = key.split('/');
      return githubRepoExists({ owner, repo });
    });

    const otherUrls = [...new Set(tools.filter(t => t.sourceUrl && !parseGithubRepo(t.sourceUrl)).map(t => t.sourceUrl))];
    process.stderr.write(`Kiểm tra ${otherUrls.length} liên kết không phải GitHub...\n`);
    const urlResults = await runPool(otherUrls, urlReachable);

    for (const t of tools) {
      const gh = parseGithubRepo(t.sourceUrl);
      sourceStatus.set(t.id, gh ? repoResults.get(`${gh.owner}/${gh.repo}`) : (t.sourceUrl ? urlResults.get(t.sourceUrl) : 'missing'));
      if (sourceStatus.get(t.id) === 'missing') addIssue('sourceMissing', { id: t.id, sourceUrl: t.sourceUrl });
    }

    const packagesByTool = new Map(tools.map(t => [t.id, extractNpmPackages(t)]));
    const allPackages = [...new Set([...packagesByTool.values()].flat())];
    process.stderr.write(`Kiểm tra ${allPackages.length} gói npm...\n`);
    const pkgResults = await runPool(allPackages, npmPackageExists);
    for (const t of tools) {
      const missing = packagesByTool.get(t.id).filter(p => pkgResults.get(p) === 'missing');
      missingPackagesByTool.set(t.id, missing);
      if (missing.length) addIssue('npmPackageMissing', { id: t.id, packages: missing });
    }

    if (GITHUB_TOKEN) {
      const okRepos = repoKeys.filter(k => repoResults.get(k) === 'ok');
      process.stderr.write(`Lấy số sao thật của ${okRepos.length} repo từ GitHub API...\n`);
      const starResults = await runPool(okRepos, key => {
        const [owner, repo] = key.split('/');
        return githubStars({ owner, repo });
      });
      for (const t of tools) {
        const gh = parseGithubRepo(t.sourceUrl);
        const stars = gh ? starResults.get(`${gh.owner}/${gh.repo}`) : null;
        if (typeof stars === 'number') starsByTool.set(t.id, stars);
      }
    }
  }

  // 3. Tổng hợp
  report.summary = Object.fromEntries(Object.entries(report.issues).map(([k, v]) => [k, v.length]));
  fs.writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2) + '\n', 'utf-8');

  console.log(`Kho dữ liệu: ${tools.length} công cụ`);
  for (const [type, count] of Object.entries(report.summary)) console.log(`  - ${type}: ${count}`);
  console.log(`Báo cáo chi tiết: ${path.relative(process.cwd(), REPORT_FILE)}`);

  if (WRITE) {
    if (!ONLINE) {
      console.error('--write cần đi kèm --online.');
      process.exit(1);
    }
    for (const t of tools) {
      const status = sourceStatus.get(t.id) || 'unknown';
      const verifiedStars = starsByTool.get(t.id);
      if (typeof verifiedStars === 'number') t.stars = verifiedStars;
      t.linkHealth = status === 'ok' ? 'healthy' : status === 'missing' ? 'broken' : 'unchecked';
      t.verification = {
        checkedAt: report.checkedAt,
        sourceStatus: status,
        missingPackages: missingPackagesByTool.get(t.id) || [],
        guideIsTemplate: templateGuide.get(t.id),
        starsVerified: typeof verifiedStars === 'number' || Boolean(t.verification && t.verification.starsVerified)
      };
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(tools, null, 2), 'utf-8');
    console.log(`Đã ghi kết quả kiểm định vào ${path.relative(process.cwd(), DATA_FILE)}`);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
