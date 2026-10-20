import React from 'react';
import { Search, X, CheckCircle2, ShieldCheck, FileCode, Terminal } from 'lucide-react';
import { Platform } from '../types';

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedPlatform: Platform | 'all';
  setSelectedPlatform: (platform: Platform | 'all') => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  setSearchQuery,
  selectedPlatform,
  setSelectedPlatform,
}) => {
  const platforms: { id: Platform | 'all'; name: string }[] = [
    { id: 'all', name: 'Tất cả nền tảng' },
    { id: 'claude_desktop', name: 'Claude Desktop' },
    { id: 'antigravity', name: 'Google Antigravity' },
    { id: 'cursor', name: 'Cursor AI' },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-blue-50/60 via-slate-50 to-slate-50 dark:from-slate-900/60 dark:via-slate-950 dark:to-slate-950 border-b border-slate-200 dark:border-slate-800 pt-10 pb-8 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Nhãn giới thiệu */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60 mb-4">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>Quy chuẩn 4 khối thông tin bắt buộc: Nguồn • Công dụng • Cài đặt • Sử dụng</span>
        </div>

        {/* Tiêu đề chính */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          Kho Công Cụ AI & Máy Chủ MCP
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-300 mb-8 font-normal leading-relaxed">
          Tra cứu, cấu hình và sử dụng các công cụ trí tuệ nhân tạo, máy chủ giao thức ngữ cảnh mô hình (MCP) và kỹ năng tác tử với hướng dẫn <strong className="text-blue-600 dark:text-blue-400 font-semibold">tiếng Việt hoàn chỉnh</strong> và cơ chế sao chép cấu hình một chạm.
        </p>

        {/* Khung tìm kiếm chính */}
        <div className="max-w-2xl mx-auto mb-6 relative">
          <div className="relative flex items-center shadow-lg shadow-blue-500/5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 focus-within:border-blue-500 dark:focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
            <Search className="w-5 h-5 ml-4 text-slate-400 dark:text-slate-500 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm công cụ theo tên, chức năng (ví dụ: sqlite, github, memory, tìm kiếm)..."
              className="w-full px-3 py-3.5 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm sm:text-base focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="mr-3 p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Bộ lọc nền tảng */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mr-1">
            Nền tảng:
          </span>
          {platforms.map((p) => {
            const isSelected = selectedPlatform === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPlatform(p.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700'
                }`}
              >
                {p.name}
              </button>
            );
          })}
        </div>

        {/* 4 Nguyên tắc cốt lõi hiển thị tóm tắt */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto mt-8 pt-6 border-t border-slate-200/60 dark:border-slate-800/60 text-left">
          <div className="flex items-start space-x-2 text-xs text-slate-600 dark:text-slate-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-800 dark:text-slate-200 block">Nguồn dẫn rõ ràng</strong>
              Link GitHub/Docs chính thức
            </div>
          </div>
          <div className="flex items-start space-x-2 text-xs text-slate-600 dark:text-slate-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-800 dark:text-slate-200 block">Công dụng chi tiết</strong>
              Giải thích tiếng Việt dễ hiểu
            </div>
          </div>
          <div className="flex items-start space-x-2 text-xs text-slate-600 dark:text-slate-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-800 dark:text-slate-200 block">Cài đặt một chạm</strong>
              Lệnh CLI & Cấu hình JSON
            </div>
          </div>
          <div className="flex items-start space-x-2 text-xs text-slate-600 dark:text-slate-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-800 dark:text-slate-200 block">Hướng dẫn dùng</strong>
              Kịch bản & Prompts mẫu
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
