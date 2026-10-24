import { spawn, exec } from 'node:child_process';
import crypto from 'node:crypto';
import os from 'node:os';

// Lưu trữ các tiến trình đang thực thi để hỗ trợ dừng tiến trình theo yêu cầu
const activeProcesses = new Map();

// Mã phiên ngẫu nhiên sinh mỗi lần khởi động máy chủ, được nhúng vào trang qua thẻ meta.
// Trang web khác nguồn không đọc được mã này nên không thể gọi cầu nối.
export const BRIDGE_TOKEN = crypto.randomBytes(32).toString('hex');
export const BRIDGE_TOKEN_HEADER = 'x-aihub-bridge-token';

// Danh sách trắng chương trình và ràng buộc tham số cho từng chương trình.
// Chỉ kiểm tra tên chương trình là không đủ: "node -e", "python -c", "git -c" đều chạy được mã tùy ý.
const COMMAND_RULES = {
  npx: {},
  npm: {},
  claude: { forbiddenArgs: [/^--dangerously-skip-permissions$/i] },
  uv: {},
  uvx: {},
  agy: {},
  git: {
    allowedSubcommands: ['clone', 'status', 'log', 'diff', 'branch', '--version', 'version'],
    forbiddenArgs: [/^-c$/, /^--config/i, /^--upload-pack/i, /^-u$/, /^--receive-pack/i, /^--exec/i, /^--template/i, /^ext::/i]
  },
  node: { allowedSubcommands: ['-v', '--version'], maxArgs: 1 },
  python: { allowedSubcommands: ['-V', '--version'], maxArgs: 1 },
  echo: {},
  dir: {},
  ls: {},
  where: {}
};

export const ALLOWED_COMMAND_PREFIXES = Object.keys(COMMAND_RULES);

// Ký tự điều khiển shell không được phép xuất hiện ở bất kỳ đâu (kể cả trong dấu nháy)
const FORBIDDEN_CHARS = /[;&|`$<>(){}\[\]*?!%^~\r\n\t'#]/;

/**
 * Tách câu lệnh thành mảng tham số, hỗ trợ dấu nháy kép đơn giản.
 * @param {string} command
 * @returns {string[] | null} null nếu dấu nháy không cân bằng
 */
export function tokenizeCommand(command) {
  const tokens = [];
  let current = '';
  let inQuotes = false;
  let hasToken = false;
  for (const ch of command) {
    if (ch === '"') {
      inQuotes = !inQuotes;
      hasToken = true;
    } else if (ch === ' ' && !inQuotes) {
      if (hasToken) tokens.push(current);
      current = '';
      hasToken = false;
    } else {
      current += ch;
      hasToken = true;
    }
  }
  if (inQuotes) return null;
  if (hasToken) tokens.push(current);
  return tokens;
}

/**
 * Kiểm tra tính an toàn của câu lệnh trước khi thực thi
 * @param {string} rawCommand 
 * @returns {{ safe: boolean, reason?: string, bin?: string, args?: string[] }}
 */
export function validateCommand(rawCommand) {
  if (!rawCommand || typeof rawCommand !== 'string') {
    return { safe: false, reason: 'Câu lệnh không được để trống.' };
  }

  const trimmed = rawCommand.trim();
  if (trimmed.length === 0) {
    return { safe: false, reason: 'Câu lệnh không có nội dung.' };
  }
  if (trimmed.length > 500) {
    return { safe: false, reason: 'Câu lệnh quá dài.' };
  }

  if (FORBIDDEN_CHARS.test(trimmed)) {
    return {
      safe: false,
      reason: 'Lệnh bị từ chối do chứa ký tự điều khiển shell (; & | ` $ < > ( ) ...). Mỗi lần chỉ chạy một lệnh đơn.'
    };
  }

  const tokens = tokenizeCommand(trimmed);
  if (!tokens || tokens.length === 0) {
    return { safe: false, reason: 'Dấu nháy kép không cân bằng.' };
  }

  const [bin, ...args] = tokens;
  const rule = COMMAND_RULES[bin.toLowerCase()];
  if (!rule || !/^[a-z]+$/i.test(bin)) {
    return { 
      safe: false, 
      reason: `Chương trình [${bin}] không nằm trong danh sách trắng an toàn. Chỉ cho phép: ${ALLOWED_COMMAND_PREFIXES.join(', ')}` 
    };
  }

  if (rule.maxArgs !== undefined && args.length > rule.maxArgs) {
    return { safe: false, reason: `Chương trình [${bin}] chỉ được phép chạy với tối đa ${rule.maxArgs} tham số.` };
  }
  if (rule.allowedSubcommands && (args.length === 0 || !rule.allowedSubcommands.includes(args[0]))) {
    return {
      safe: false,
      reason: `Với [${bin}], chỉ cho phép: ${rule.allowedSubcommands.join(', ')}.`
    };
  }
  if (rule.forbiddenArgs) {
    const blocked = args.find(arg => rule.forbiddenArgs.some(p => p.test(arg)));
    if (blocked) {
      return { safe: false, reason: `Tham số [${blocked}] bị cấm với [${bin}].` };
    }
  }

  return { safe: true, bin: bin.toLowerCase(), args };
}

/**
 * Kiểm tra yêu cầu đến từ chính trang AI Hub trên máy cục bộ.
 * Chặn: trang web khác nguồn (CSRF), tấn công DNS rebinding, truy cập từ mạng LAN.
 * @returns {string | null} lý do từ chối, hoặc null nếu hợp lệ
 */
export function verifyBridgeRequest(req) {
  const isLoopbackHost = (value) => {
    if (!value) return false;
    const hostname = value.replace(/:\d+$/, '').replace(/^\[|\]$/g, '').toLowerCase();
    return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1';
  };

  const remote = req.socket?.remoteAddress || '';
  if (!['127.0.0.1', '::1', '::ffff:127.0.0.1'].includes(remote)) {
    return 'Cầu nối chỉ chấp nhận kết nối từ máy cục bộ.';
  }
  if (!isLoopbackHost(req.headers.host)) {
    return 'Tiêu đề Host không hợp lệ.';
  }
  const origin = req.headers.origin;
  if (origin) {
    let originHost = '';
    try {
      originHost = new URL(origin).host;
    } catch (_) {
      return 'Tiêu đề Origin không hợp lệ.';
    }
    if (originHost !== req.headers.host || !isLoopbackHost(originHost)) {
      return 'Yêu cầu đến từ nguồn không được phép.';
    }
  }
  const token = req.headers[BRIDGE_TOKEN_HEADER];
  if (typeof token !== 'string' || token.length !== BRIDGE_TOKEN.length ||
      !crypto.timingSafeEqual(Buffer.from(token), Buffer.from(BRIDGE_TOKEN))) {
    return 'Thiếu hoặc sai mã phiên cầu nối.';
  }
  return null;
}

function rejectRequest(res, reason) {
  res.writeHead(403, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify({ success: false, error: reason }));
}

/**
 * Xử lý yêu cầu POST /api/execute-command với giao thức truyền luồng dữ liệu (SSE)
 */
export function handleExecuteCommand(req, res) {
  const rejection = verifyBridgeRequest(req);
  if (rejection) {
    rejectRequest(res, rejection);
    return;
  }

  res.writeHead(200, {
    'Content-Type': 'text/event-stream; charset=utf-8',
    'Cache-Control': 'no-cache, no-transform',
    'Connection': 'keep-alive'
  });

  const sendEvent = (data) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  let body = '';
  req.on('data', chunk => {
    body += chunk;
  });

  req.on('end', () => {
    try {
      const parsed = JSON.parse(body || '{}');
      const command = parsed.command;

      const validation = validateCommand(command);
      if (!validation.safe) {
        sendEvent({
          type: 'error',
          error: validation.reason || 'Lệnh không hợp lệ.'
        });
        res.end();
        return;
      }

      sendEvent({
        type: 'start',
        command: command.trim(),
        timestamp: new Date().toISOString()
      });

      // Trên POSIX chạy trực tiếp không qua shell. Trên Windows, npx/npm là tệp .cmd nên cần shell;
      // điều này an toàn vì validateCommand đã loại bỏ toàn bộ ký tự điều khiển shell.
      const isWindows = process.platform === 'win32';
      const child = spawn(
        validation.bin,
        isWindows ? validation.args.map(arg => (arg.includes(' ') ? `"${arg}"` : arg)) : validation.args,
        {
          shell: isWindows,
          detached: !isWindows,
          cwd: process.cwd(),
          env: { ...process.env, FORCE_COLOR: '1' }
        }
      );

      if (!child.pid) {
        sendEvent({
          type: 'error',
          error: 'Không thể khởi động tiến trình con trên hệ điều hành.'
        });
        res.end();
        return;
      }

      const pid = child.pid;
      activeProcesses.set(pid, child);

      sendEvent({
        type: 'pid',
        pid: pid
      });

      child.stdout.on('data', data => {
        sendEvent({
          type: 'stdout',
          text: data.toString('utf-8')
        });
      });

      child.stderr.on('data', data => {
        sendEvent({
          type: 'stderr',
          text: data.toString('utf-8')
        });
      });

      // Đặt timeout 120 giây
      const timeoutId = setTimeout(() => {
        if (activeProcesses.has(pid)) {
          sendEvent({
            type: 'stderr',
            text: '\n[Cảnh báo]: Tiến trình đã vượt quá thời gian tối đa (120 giây) và tự động bị hủy để bảo vệ tài nguyên.\n'
          });
          killChildProcess(pid);
        }
      }, 120000);

      child.on('close', (code, signal) => {
        clearTimeout(timeoutId);
        activeProcesses.delete(pid);
        sendEvent({
          type: 'exit',
          code: code,
          signal: signal
        });
        res.end();
      });

      child.on('error', err => {
        clearTimeout(timeoutId);
        activeProcesses.delete(pid);
        sendEvent({
          type: 'error',
          error: `Lỗi thực thi: ${err.message}`
        });
        res.end();
      });

      // Nếu client ngắt kết nối trình duyệt trước khi tiến trình kết thúc.
      // Dùng res thay vì req: sự kiện 'close' của req phát ra ngay khi đọc xong thân yêu cầu.
      res.on('close', () => {
        if (res.writableEnded) return;
        clearTimeout(timeoutId);
        if (activeProcesses.has(pid)) {
          killChildProcess(pid);
        }
      });

    } catch (err) {
      sendEvent({
        type: 'error',
        error: `Dữ liệu yêu cầu không hợp lệ: ${err.message}`
      });
      res.end();
    }
  });
}

/**
 * Hủy tiến trình con an toàn trên Windows và POSIX
 */
export function killChildProcess(pid) {
  const child = activeProcesses.get(pid);
  if (!child) return false;

  try {
    if (process.platform === 'win32') {
      exec(`taskkill /pid ${pid} /T /F`);
    } else {
      process.kill(-pid, 'SIGKILL');
    }
  } catch (err) {
    try {
      child.kill('SIGKILL');
    } catch (_) {}
  }
  activeProcesses.delete(pid);
  return true;
}

/**
 * Xử lý yêu cầu POST /api/kill-command
 */
export function handleKillCommand(req, res) {
  const rejection = verifyBridgeRequest(req);
  if (rejection) {
    rejectRequest(res, rejection);
    return;
  }

  let body = '';
  req.on('data', chunk => {
    body += chunk;
  });
  req.on('end', () => {
    try {
      const parsed = JSON.parse(body || '{}');
      const pid = parsed.pid;
      if (!pid) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Thiếu mã tiến trình pid.' }));
        return;
      }

      const killed = killChildProcess(Number(pid));
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, killed }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: err.message }));
    }
  });
}

/**
 * Xử lý yêu cầu GET /api/system-status
 */
export function handleSystemStatus(req, res) {
  const rejection = verifyBridgeRequest(req);
  if (rejection) {
    rejectRequest(res, rejection);
    return;
  }

  res.writeHead(200, { 
    'Content-Type': 'application/json; charset=utf-8'
  });

  res.end(JSON.stringify({
    success: true,
    platform: process.platform,
    arch: process.arch,
    nodeVersion: process.version,
    activeProcessesCount: activeProcesses.size,
    allowedPrefixes: ALLOWED_COMMAND_PREFIXES
  }));
}
