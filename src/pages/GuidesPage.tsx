import React, { useState } from 'react';
import { ChevronRight, BookOpen, Clock, Calendar, User, ArrowRight, ShieldCheck, Sparkles, Terminal, X } from 'lucide-react';
import { GuideArticle } from '../types';

interface GuidesPageProps {
  guides: GuideArticle[];
  onNavigateHome: () => void;
  onOpenDocsModal: () => void;
}

export const GuidesPage: React.FC<GuidesPageProps> = ({
  guides,
  onNavigateHome,
  onOpenDocsModal,
}) => {
  const [selectedGuide, setSelectedGuide] = useState<GuideArticle | null>(null);

  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors pb-20">
      
      {/* BREADCRUMB */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 py-3.5 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <button onClick={onNavigateHome} className="hover:text-indigo-600 transition-colors">
              Trang chủ
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-900 dark:text-white font-semibold">
              Hướng dẫn & Tiêu chuẩn AI
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* HEADER TRANG */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight mb-2">
              Thư viện hướng dẫn AI
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Kiến thức thực tiễn về lựa chọn công cụ, cài đặt máy chủ MCP, tối ưu tác tử và an toàn thông tin.
            </p>
          </div>

          <button
            onClick={onOpenDocsModal}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 font-bold text-xs shrink-0 self-start sm:self-auto transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            <span>Xem bộ tài liệu VibeCode (01 - 22)</span>
          </button>
        </div>

        {/* LƯỚI BÀI VIẾT HƯỚNG DẪN */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guides.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedGuide(item)}
              className="group p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-700 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="px-2.5 py-0.5 rounded-full font-bold bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900">
                    {item.category}
                  </span>
                  <span className="flex items-center space-x-1 text-slate-400 text-[11px]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{item.readTime}</span>
                  </span>
                </div>

                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug mb-3">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  {item.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">
                  Bởi {item.author}
                </span>

                <div className="inline-flex items-center space-x-1 font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
                  <span>Đọc bài viết</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* MODAL CHI TIẾT BÀI VIẾT HƯỚNG DẪN */}
        {selectedGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
            <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl max-h-[85vh] overflow-y-auto space-y-5">
              
              <button
                onClick={() => setSelectedGuide(null)}
                className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200">
                  {selectedGuide.category}
                </span>
                <h2 className="text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight mt-2">
                  {selectedGuide.title}
                </h2>
                <div className="flex items-center space-x-3 text-xs text-slate-400 mt-2">
                  <span>Tác giả: {selectedGuide.author}</span>
                  <span>•</span>
                  <span>Cập nhật: {selectedGuide.updatedAt}</span>
                  <span>•</span>
                  <span>Thời gian đọc: {selectedGuide.readTime}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 text-xs text-slate-700 dark:text-slate-300 border border-indigo-100 dark:border-indigo-900/40 leading-relaxed font-medium">
                {selectedGuide.summary}
              </div>

              <div className="prose dark:prose-invert text-xs sm:text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4">
                {selectedGuide.contentVi}
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-right">
                <button
                  onClick={() => setSelectedGuide(null)}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs"
                >
                  Đã đọc xong
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
