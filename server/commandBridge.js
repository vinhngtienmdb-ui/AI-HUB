import { spawn, exec } from 'node:child_process';
import os from 'node:os';

// Lưu trữ các tiến trình đang thực thi để hỗ trợ dừng tiến trình theo yêu cầu
const activeProcesses = new Map();

// Danh sách trắng các lệnh được phép thực thi vì mục đích an toàn
const ALLOWED_COMMAND_PREFIXES = [
  'npx',
  'npm',
  'node',
  'claude',
  'git',
  'uv',
  'uvx',
  'python',
  'echo',
  'dir',
  'ls',
  'where'
];

// Danh sách đen các mẫu lệnh nguy hiểm tiềm ẩn phá hoại hệ thống
const FORBIDDEN_PATTERNS = [
  /rmdir\s+[\/\-]s/i,
  /del\s+[\/\-]f/i,
  /\bformat\b/i,
  /\bshutdown\b/i,
  /\breg\s+delete/i,
  /\|\s*(ba)?sh/i,
  /powershell.*-enc/i,
  /rm\s+-rf/i
];

/**
 * Kiểm tra tính an toàn của câu lệnh trước khi thực thi
 * @param {string} rawCommand 
 * @returns {{ safe: boolean, reason?: string }}
 */
export function validateCommand(rawCommand) {
  if (!rawCommand || typeof rawCommand !== 'string') {
    return { safe: false, reason: 'Câu lệnh không được để trống.' };
  }

  const trimmed = rawCommand.trim();
  if (trimmed.length === 0) {
    return { safe: false, reason: 'Câu lệnh không có nội dung.' };
  }

  // Kiểm tra danh sách đen nguy hiểm
  for (const pattern of FORBIDDEN_PATTERNS) {
    if (pattern.test(trimmed)) {
      return { 
        safe: false, 
        reason: 'Lệnh bị từ chối do chứa mẫu cú pháp can thiệp hệ thống nguy hiểm.' 
      };
    }
  }

  // Tách từ đầu tiên để kiểm tra danh sách trắng
  const firstWord = trimmed.split(/[\s|&;]+/)[0].toLowerCase();
  const isAllowed = ALLOWED_COMMAND_PREFIXES.some(prefix => 
    firstWord === prefix || firstWord.endsWith(`/${prefix}`) || firstWord.endsWith(`\\${prefix}`)
  );

  if (!isAllowed) {
    return { 
      safe: false, 
      reason: `Tiền tố lệnh [${firstWord}] không nằm trong danh sách trắng an toàn. Chỉ cho phép các lệnh: ${ALLOWED_COMMAND_PREFIXES.join(', ')}` 
    };
  }

  return { safe: true };
}

/**
 * Xử lý yêu cầu POST /api/execute-command với giao thức truyền luồng dữ liệu (SSE)
 */
export function handleExecuteCommand(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream; charset=utf-8',
    'Cache-Control': 'no-cache, no-transform',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*'
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

      // Khởi tạo tiến trình con qua Shell
      const child = spawn(command.trim(), {
        shell: true,
        cwd: process.cwd(),
        env: { ...process.env, FORCE_COLOR: '1' }
      });

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

      // Nếu client ngắt kết nối trình duyệt
      req.on('close', () => {
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

      const killed = killChildProcess(pid);
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
  res.writeHead(200, { 
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*'
  });

  res.end(JSON.stringify({
    success: true,
    platform: process.platform,
    arch: process.arch,
    nodeVersion: process.version,
    activeProcessesCount: activeProcesses.size,
    allowedPrefixes: ALLOWED_COMMAND_PREFIXES,
    cwd: process.cwd()
  }));
}
