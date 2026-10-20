import React from 'react';
import { Cpu, PlusCircle, Moon, Sun, BookOpen, Layers, Terminal } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  onOpenContribute: () => void;
  onOpenDocs: () => void;
  onToggleTerminal?: () => void;
  isTerminalOpen?: boolean;
  toolCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  setDarkMode,
  onOpenContribute,
  onOpenDocs,
  onToggleTerminal,
  isTerminalOpen,
  toolCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo và Tên thương hiệu */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Cpu className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">AI Hub</span>
              <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                Tiếng Việt
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
              Quản lý Công cụ AI & Máy chủ MCP Chuẩn Hóa
            </p>
          </div>
        </div>

        {/* Thanh tác vụ bên phải */}
        <div className="flex items-center space-x-3">
          <div className="hidden md:flex items-center text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
            <Layers className="w-3.5 h-3.5 mr-1.5 text-blue-500" />
            <span>Tổng cộng: <strong className="text-slate-800 dark:text-slate-200 font-semibold">{toolCount}</strong> công cụ</span>
          </div>

          {onToggleTerminal && (
            <button
              onClick={onToggleTerminal}
              className={`flex items-center text-sm font-medium px-3 py-2 rounded-lg transition-colors border ${
                isTerminalOpen
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                  : 'text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title="Bật/Tắt cửa sổ Thiết bị đầu cuối thực thi lệnh cục bộ"
            >
              <Terminal className="w-4 h-4 mr-1.5 text-emerald-500" />
              <span className="hidden sm:inline">Terminal</span>
              <span className="hidden lg:inline ml-1 text-xs opacity-75">Cục Bộ</span>
            </button>
          )}

          <button
            onClick={onOpenDocs}
            className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-lg transition-colors"
          >
            <BookOpen className="w-4 h-4 mr-1.5" />
            <span className="hidden sm:inline">Quy trình VibeCode</span>
          </button>

          <button
            onClick={onOpenContribute}
            className="flex items-center text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 rounded-lg shadow-sm hover:shadow transition-all"
          >
            <PlusCircle className="w-4 h-4 mr-1.5" />
            <span>Đóng góp công cụ</span>
          </button>

          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Chuyển chế độ sáng tối"
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
