import React, { useState } from 'react';
import { Plus, Moon, Sun, BookOpen, Terminal, Menu, X, User, ShieldCheck } from 'lucide-react';
import { ToolType, Category } from '../types';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  onOpenContribute: () => void;
  onOpenDocs: () => void;
  onOpenLogin: () => void;
  currentUser?: string | null;
  isAdmin?: boolean;
  pendingCount?: number;
  onOpenAdminApproval?: () => void;
  onSelectType?: (type: ToolType | 'all') => void;
  onSelectCategory?: (category: Category | 'all') => void;
  onToggleTerminal?: () => void;
  isTerminalOpen?: boolean;
  toolCount: number;
  isExpanded?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  setDarkMode,
  onOpenContribute,
  onOpenDocs,
  onOpenLogin,
  currentUser,
  isAdmin = false,
  pendingCount = 0,
  onOpenAdminApproval,
  onSelectType,
  onSelectCategory,
  onToggleTerminal,
  isTerminalOpen,
  toolCount,
  isExpanded = true,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (action: () => void) => {
    action();
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md transition-colors">
      <div className={`w-full mx-auto px-4 sm:px-6 lg:px-8 h-18 py-3 flex items-center justify-between transition-all duration-300 ${isExpanded ? 'max-w-[98%]' : 'max-w-7xl'}`}>
        
        {/* LOGO VÀ TÊN THƯƠNG HIỆU: AI HUB VN */}
        <div 
          className="flex items-center space-x-3 cursor-pointer select-none shrink-0" 
          onClick={() => {
            if (onSelectType) onSelectType('all');
            if (onSelectCategory) onSelectCategory('all');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          {/* Biểu tượng 3 bong bóng tròn liên kết đặc trưng của AI HUB VN */}
          <div className="relative flex items-center justify-center w-9 h-9">
            <span className="absolute w-3.5 h-3.5 rounded-full bg-indigo-600 top-0 left-0 shadow-sm" />
            <span className="absolute w-4 h-4 rounded-full bg-purple-500 bottom-0 left-1 shadow-sm" />
            <span className="absolute w-3 h-3 rounded-full bg-blue-500 top-2 right-0 shadow-sm" />
            <span className="absolute w-1.5 h-1.5 rounded-full bg-indigo-400 bottom-1 right-2.5" />
          </div>

          <div className="flex items-center space-x-1.5">
            <span className="font-extrabold text-xl tracking-tight text-slate-950 dark:text-white font-sans">
              AI HUB <span className="text-indigo-600 dark:text-indigo-400">VN</span>
            </span>
          </div>
        </div>

        {/* MENU ĐIỀU HƯỚNG TRUNG TÂM (DESKTOP) */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-700 dark:text-slate-200">
          <button
            onClick={() => {
              if (onSelectType) onSelectType('agent');
              const el = document.getElementById('browse-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            Công cụ AI
          </button>

          <button
            onClick={() => {
              if (onSelectType) onSelectType('mcp');
              const el = document.getElementById('browse-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            MCP Servers
          </button>

          <button
            onClick={() => {
              if (onSelectType) onSelectType('skill');
              const el = document.getElementById('browse-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            Agent Skills
          </button>

          <button
            onClick={() => {
              if (onSelectCategory) onSelectCategory('vietnam');
              const el = document.getElementById('browse-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center space-x-1"
          >
            <span>Bộ sưu tập</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-rose-100 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400 font-bold">
              VN
            </span>
          </button>

          <button
            onClick={onOpenDocs}
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center space-x-1"
          >
            <BookOpen className="w-3.5 h-3.5 mr-0.5 text-slate-400" />
            <span>Hướng dẫn</span>
          </button>
        </nav>

        {/* NHÓM TÁC VỤ BÊN PHẢI */}
        <div className="flex items-center space-x-3">
          
          {/* Nút Terminal thực thi lệnh cục bộ */}
          {onToggleTerminal && (
            <button
              onClick={onToggleTerminal}
              className={`hidden sm:flex items-center text-xs font-semibold px-2.5 py-1.5 rounded-xl transition-all border ${
                isTerminalOpen
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title="Mở Cửa sổ Thực thi lệnh CLI cục bộ"
            >
              <Terminal className="w-3.5 h-3.5 mr-1 text-emerald-500" />
              <span>Terminal</span>
            </button>
          )}

          {/* Nút Hàng đợi phê duyệt dành riêng cho Quản trị viên (Admin) */}
          {isAdmin && onOpenAdminApproval && (
            <button
              onClick={onOpenAdminApproval}
              className="relative flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-600/50 text-xs sm:text-sm font-semibold transition-all shadow-sm"
              title="Mở Hàng đợi phê duyệt công cụ từ thành viên"
            >
              <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span className="hidden sm:inline">Duyệt công cụ</span>
              {pendingCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-amber-600 text-white text-[11px] font-bold">
                  {pendingCount}
                </span>
              )}
            </button>
          )}

          {/* Nút Đăng nhập / Trạng thái người dùng */}
          <button
            onClick={onOpenLogin}
            className="flex items-center text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 px-2 py-1.5 transition-colors"
          >
            {currentUser ? (
              <span className="flex items-center space-x-1.5 text-indigo-600 dark:text-indigo-400">
                <User className="w-4 h-4" />
                <span className="max-w-[100px] truncate">{currentUser.split('@')[0]}</span>
                {isAdmin && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 font-bold uppercase tracking-wider">
                    Admin
                  </span>
                )}
              </span>
            ) : (
              <span>Đăng nhập</span>
            )}
          </button>

          {/* Nút Đóng góp tài nguyên (Phong cách nổi bật giống ảnh demo) */}
          <button
            onClick={onOpenContribute}
            className="inline-flex items-center space-x-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>Đóng góp tài nguyên</span>
          </button>

          {/* Nút chuyển đổi giao diện sáng/tối */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Chuyển chế độ sáng tối"
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Nút Menu trên thiết bị di động */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* MENU ĐIỀU HƯỚNG TRÊN THIẾT BỊ DI ĐỘNG (MOBILE MENU) */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-4 space-y-3 animate-fadeIn">
          <button
            onClick={() => handleNavClick(() => {
              if (onSelectType) onSelectType('agent');
              const el = document.getElementById('browse-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            })}
            className="block w-full text-left py-2 px-3 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Công cụ AI
          </button>
          <button
            onClick={() => handleNavClick(() => {
              if (onSelectType) onSelectType('mcp');
              const el = document.getElementById('browse-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            })}
            className="block w-full text-left py-2 px-3 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            MCP Servers
          </button>
          <button
            onClick={() => handleNavClick(() => {
              if (onSelectType) onSelectType('skill');
              const el = document.getElementById('browse-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            })}
            className="block w-full text-left py-2 px-3 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Agent Skills
          </button>
          <button
            onClick={() => handleNavClick(() => {
              if (onSelectCategory) onSelectCategory('vietnam');
              const el = document.getElementById('browse-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            })}
            className="block w-full text-left py-2 px-3 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between"
          >
            <span>Bộ sưu tập Việt Nam</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-100 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400 font-bold">
              HOT
            </span>
          </button>
          <button
            onClick={() => handleNavClick(onOpenDocs)}
            className="block w-full text-left py-2 px-3 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Hướng dẫn & Quy trình VibeCode
          </button>
        </div>
      )}
    </header>
  );
};
