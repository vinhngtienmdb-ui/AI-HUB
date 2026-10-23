import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal as TerminalIcon, 
  X, 
  Square, 
  Play, 
  Trash2, 
  Maximize2, 
  Minimize2, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  ChevronRight,
  ShieldCheck,
  HelpCircle
} from 'lucide-react';

export interface TerminalOutputLine {
  id: string;
  type: 'cmd' | 'stdout' | 'stderr' | 'info' | 'error' | 'success';
  text: string;
  time: string;
}

interface TerminalDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  pendingCommand?: string | null;
  onClearPendingCommand?: () => void;
}

// Mã phiên cầu nối do máy chủ phát triển nhúng vào trang (xem vite.config.ts)
const getBridgeHeaders = (): Record<string, string> => {
  const token = document.querySelector<HTMLMetaElement>('meta[name="aihub-bridge-token"]')?.content || '';
  return { 'Content-Type': 'application/json', 'X-AIHub-Bridge-Token': token };
};

export const TerminalDrawer: React.FC<TerminalDrawerProps> = ({
  isOpen,
  onClose,
  pendingCommand,
  onClearPendingCommand
}) => {
  const [lines, setLines] = useState<TerminalOutputLine[]>([
    {
      id: 'init-1',
      type: 'info',
      text: 'Hệ thống Cầu nối Thiết bị đầu cuối Cục bộ đã sẵn sàng.',
      time: new Date().toLocaleTimeString()
    },
    {
      id: 'init-2',
      type: 'info',
      text: 'Chỉ chấp nhận một lệnh đơn trong danh sách an toàn: npx, npm, claude, agy, git, uv, uvx, node -v, python --version, echo, dir, ls, where.',
      time: new Date().toLocaleTimeString()
    }
  ]);

  const [inputCommand, setInputCommand] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [currentPid, setCurrentPid] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Tự động cuộn xuống dòng cuối cùng khi có dữ liệu mới
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  // Lệnh truyền vào từ bên ngoài (ví dụ từ ToolDetailModal) chỉ được điền sẵn vào ô nhập,
  // người dùng phải tự kiểm tra và bấm Chạy để tránh thực thi gói bên thứ ba ngoài ý muốn.
  useEffect(() => {
    if (isOpen && pendingCommand) {
      setInputCommand(pendingCommand);
      appendLine('info', 'Lệnh đã được điền sẵn. Hãy kiểm tra kỹ nội dung rồi bấm Chạy (hoặc Enter) để thực thi.');
      if (onClearPendingCommand) {
        onClearPendingCommand();
      }
    }
  }, [isOpen, pendingCommand]);

  // Tiêu điểm vào ô nhập khi mở terminal
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  const appendLine = (type: TerminalOutputLine['type'], text: string) => {
    setLines(prev => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random()}`,
        type,
        text,
        time: new Date().toLocaleTimeString()
      }
    ]);
  };

  const runCommand = async (cmdToRun: string) => {
    const trimmed = cmdToRun.trim();
    if (!trimmed || isRunning) return;

    // Lưu vào lịch sử lệnh
    setHistory(prev => [trimmed, ...prev.filter(h => h !== trimmed)]);
    setHistoryIndex(-1);
    setInputCommand('');

    appendLine('cmd', `$ ${trimmed}`);
    setIsRunning(true);
    setCurrentPid(null);

    try {
      const response = await fetch('/api/execute-command', {
        method: 'POST',
        headers: getBridgeHeaders(),
        body: JSON.stringify({ command: trimmed })
      });

      if (!response.ok) {
        const detail = await response.json().catch(() => null);
        throw new Error(detail?.error || `Máy chủ trả về mã lỗi: ${response.status} ${response.statusText}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Trình duyệt không hỗ trợ đọc luồng dữ liệu (ReadableStream).');
      }

      const decoder = new TextDecoder('utf-8');
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const events = buffer.split('\n\n');
        buffer = events.pop() || '';

        for (const event of events) {
          if (!event.startsWith('data: ')) continue;
          try {
            const data = JSON.parse(event.replace(/^data: /, ''));

            if (data.type === 'pid') {
              setCurrentPid(data.pid);
            } else if (data.type === 'stdout') {
              appendLine('stdout', data.text);
            } else if (data.type === 'stderr') {
              appendLine('stderr', data.text);
            } else if (data.type === 'exit') {
              if (data.code === 0) {
                appendLine('success', `[Hoàn thành]: Tiến trình kết thúc thành công (Exit code: 0).`);
              } else {
                appendLine('error', `[Cảnh báo]: Tiến trình kết thúc với mã lỗi: ${data.code}`);
              }
            } else if (data.type === 'error') {
              appendLine('error', `[Lỗi bảo mật hoặc thực thi]: ${data.error}`);
            }
          } catch (_) {
            // Bỏ qua lỗi phân tích chuỗi JSON nếu gói tin bị vỡ
          }
        }
      }
    } catch (err: any) {
      appendLine('error', `[Lỗi kết nối máy chủ]: ${err.message || 'Không thể liên lạc với máy chủ cục bộ.'}`);
    } finally {
      setIsRunning(false);
      setCurrentPid(null);
    }
  };

  const handleStopProcess = async () => {
    if (!currentPid) return;
    try {
      appendLine('info', `Đang gửi tín hiệu dừng tiến trình PID: ${currentPid}...`);
      await fetch('/api/kill-command', {
        method: 'POST',
        headers: getBridgeHeaders(),
        body: JSON.stringify({ pid: currentPid })
      });
      appendLine('error', `[Đã dừng]: Người dùng đã hủy tiến trình PID ${currentPid}.`);
    } catch (err: any) {
      appendLine('error', `Không thể dừng tiến trình: ${err.message}`);
    } finally {
      setIsRunning(false);
      setCurrentPid(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      runCommand(inputCommand);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0 && historyIndex < history.length - 1) {
        const nextIdx = historyIndex + 1;
        setHistoryIndex(nextIdx);
        setInputCommand(history[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const prevIdx = historyIndex - 1;
        setHistoryIndex(prevIdx);
        setInputCommand(history[prevIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputCommand('');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out bg-slate-950 text-slate-100 border-t border-slate-800 shadow-2xl flex flex-col ${
        isExpanded ? 'h-[85vh]' : 'h-96'
      }`}
    >
      {/* Thanh tiêu đề Terminal */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 select-none">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <span className="p-1 rounded bg-blue-600/20 text-blue-400">
              <TerminalIcon className="w-4 h-4" />
            </span>
            <span className="text-sm font-semibold text-slate-200">
              Thiết Bị Đầu Cuối Cục Bộ (Local Command Terminal)
            </span>
          </div>

          {/* Đèn chỉ báo trạng thái */}
          <div className="flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-slate-800/80 text-xs">
            {isRunning ? (
              <>
                <Loader2 className="w-3 h-3 text-amber-400 animate-spin" />
                <span className="text-amber-400 font-medium">Đang chạy (PID: {currentPid || '...'})</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="text-emerald-400 font-medium">Sẵn sàng</span>
              </>
            )}
          </div>

          <div className="hidden sm:flex items-center space-x-1 text-xs text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Danh sách an toàn kích hoạt</span>
          </div>
        </div>

        {/* Các nút hành động trên thanh công cụ */}
        <div className="flex items-center space-x-1.5">
          {isRunning && (
            <button
              onClick={handleStopProcess}
              className="flex items-center space-x-1 px-2.5 py-1 rounded bg-rose-600/90 hover:bg-rose-500 text-white text-xs font-medium transition-colors shadow-sm"
              title="Dừng tiến trình hiện tại"
            >
              <Square className="w-3 h-3 fill-current" />
              <span>Dừng (Kill)</span>
            </button>
          )}

          <button
            onClick={() => setLines([])}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition-colors"
            title="Xóa sạch màn hình"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition-colors"
            title={isExpanded ? 'Thu nhỏ' : 'Mở rộng toàn màn hình'}
          >
            {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded transition-colors ml-1"
            title="Đóng terminal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Màn hình hiển thị nội dung dòng lệnh */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 font-mono text-xs sm:text-[13px] leading-relaxed space-y-1 select-text bg-[#0c1017]"
      >
        {lines.map((l) => {
          if (l.type === 'cmd') {
            return (
              <div key={l.id} className="text-emerald-400 font-bold flex items-start space-x-1 pt-2 pb-0.5 border-t border-slate-900 first:border-0 first:pt-0">
                <ChevronRight className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5" />
                <span className="break-all">{l.text}</span>
              </div>
            );
          }
          if (l.type === 'stdout') {
            return (
              <div key={l.id} className="text-slate-300 whitespace-pre-wrap break-all pl-5">
                {l.text}
              </div>
            );
          }
          if (l.type === 'stderr') {
            return (
              <div key={l.id} className="text-amber-300/90 whitespace-pre-wrap break-all pl-5">
                {l.text}
              </div>
            );
          }
          if (l.type === 'error') {
            return (
              <div key={l.id} className="text-rose-400 font-medium pl-5 flex items-center space-x-1.5 py-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{l.text}</span>
              </div>
            );
          }
          if (l.type === 'success') {
            return (
              <div key={l.id} className="text-emerald-400 font-semibold pl-5 flex items-center space-x-1.5 py-1">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>{l.text}</span>
              </div>
            );
          }
          return (
            <div key={l.id} className="text-slate-500 italic pl-5">
              {l.text}
            </div>
          );
        })}

        {isRunning && (
          <div className="flex items-center space-x-2 text-slate-400 pl-5 pt-1 animate-pulse">
            <span className="w-2 h-3.5 bg-emerald-400 inline-block animate-ping"></span>
            <span className="text-[11px]">Đang thực thi lệnh trên hệ điều hành...</span>
          </div>
        )}
      </div>

      {/* Chân trang: Dòng lệnh nhập tương tác */}
      <div className="px-4 py-2 bg-slate-900 border-t border-slate-800 flex items-center space-x-2">
        <span className="text-emerald-500 font-mono font-bold select-none text-xs sm:text-sm">
          local:~$
        </span>
        <input
          ref={inputRef}
          type="text"
          value={inputCommand}
          onChange={(e) => setInputCommand(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isRunning}
          placeholder={isRunning ? 'Vui lòng chờ tiến trình hoàn tất hoặc bấm Dừng...' : 'Nhập lệnh CLI (ví dụ: node -v, git status, npx -y @modelcontextprotocol/...)...'}
          className="flex-1 bg-transparent border-0 text-slate-100 font-mono text-xs sm:text-sm focus:outline-none focus:ring-0 placeholder:text-slate-600 disabled:opacity-50"
        />

        <div className="flex items-center space-x-2">
          {/* Lệnh mẫu nhanh */}
          <div className="hidden md:flex items-center space-x-1.5">
            <button
              onClick={() => runCommand('node -v')}
              disabled={isRunning}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-400 font-mono disabled:opacity-50"
            >
              node -v
            </button>
            <button
              onClick={() => runCommand('git status')}
              disabled={isRunning}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-400 font-mono disabled:opacity-50"
            >
              git status
            </button>
          </div>

          <button
            onClick={() => runCommand(inputCommand)}
            disabled={isRunning || !inputCommand.trim()}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold disabled:opacity-40 disabled:hover:bg-blue-600 transition-colors"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>Chạy</span>
          </button>
        </div>
      </div>
    </div>
  );
};
