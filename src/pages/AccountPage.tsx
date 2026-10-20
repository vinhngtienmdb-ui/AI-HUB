import React, { useState } from 'react';
import { ChevronRight, User, Bookmark, Folder, LogOut, ArrowRight, Star, Plus } from 'lucide-react';
import { AITool, Collection } from '../types';

interface AccountPageProps {
  currentUser: string | null;
  savedTools: AITool[];
  userCollections: Collection[];
  onNavigateHome: () => void;
  onSelectTool: (tool: AITool) => void;
  onOpenContribute: () => void;
  onLogout: () => void;
  isExpanded?: boolean;
}

export const AccountPage: React.FC<AccountPageProps> = ({
  currentUser,
  savedTools,
  userCollections,
  onNavigateHome,
  onSelectTool,
  onOpenContribute,
  onLogout,
  isExpanded = true,
}) => {
  const [activeTab, setActiveTab] = useState<'saved' | 'collections'>('saved');

  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors pb-20">
      
      {/* BREADCRUMB */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 py-3.5 transition-colors">
        <div className={`w-full mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${isExpanded ? 'max-w-[98%]' : 'max-w-6xl'}`}>
          <nav className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <button onClick={onNavigateHome} className="hover:text-indigo-600 transition-colors">
              Trang chủ
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-900 dark:text-white font-semibold">
              Hồ sơ tài khoản
            </span>
          </nav>
        </div>
      </div>

      <div className={`w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8 transition-all duration-300 ${isExpanded ? 'max-w-[98%]' : 'max-w-6xl'}`}>
        
        {/* CARD HỒ SƠ NGƯỜI DÙNG */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-extrabold text-2xl shadow-sm">
              <User className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                {currentUser ? currentUser.split('@')[0] : 'Thành viên AI HUB'}
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {currentUser || 'Chưa đăng nhập'} • Thành viên cộng đồng AI Việt Nam
              </p>
              <div className="flex items-center space-x-3 mt-2 text-xs">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  {savedTools.length} tài nguyên đã lưu
                </span>
                <span>•</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  {userCollections.length} bộ sưu tập
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenContribute}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all flex items-center space-x-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Đóng góp mới</span>
            </button>
            <button
              onClick={onLogout}
              className="px-4 py-2 rounded-xl border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 hover:bg-rose-50 text-xs font-bold transition-all flex items-center space-x-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>

        {/* TABS HỒ SƠ */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 space-x-8 text-sm font-bold">
          <button
            onClick={() => setActiveTab('saved')}
            className={`pb-3 border-b-2 transition-colors flex items-center space-x-2 ${
              activeTab === 'saved'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>Tài nguyên đã lưu ({savedTools.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('collections')}
            className={`pb-3 border-b-2 transition-colors flex items-center space-x-2 ${
              activeTab === 'collections'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Folder className="w-4 h-4" />
            <span>Bộ sưu tập ({userCollections.length})</span>
          </button>
        </div>

        {/* NỘI DUNG TABS */}
        {activeTab === 'saved' && (
          <div>
            {savedTools.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {savedTools.map((tool) => (
                  <div
                    key={tool.id}
                    onClick={() => onSelectTool(tool)}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-400 transition-all cursor-pointer flex flex-col justify-between shadow-sm group"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-indigo-600 block mb-1">
                        {tool.typeNameVi}
                      </span>
                      <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 line-clamp-1">
                        {tool.name}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                        {tool.summaryVi}
                      </p>
                    </div>

                    <div className="pt-3 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-indigo-600">
                      <span className="text-amber-500 flex items-center space-x-1">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{tool.stars || 4.8}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <span>Chi tiết</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-12 text-center space-y-3">
                <Bookmark className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                  Chưa có tài nguyên nào được lưu
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Khi khám phá các công cụ AI, hãy nhấn biểu tượng Lưu để lưu vào danh sách tiện tra cứu sau này.
                </p>
                <button
                  onClick={onNavigateHome}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs"
                >
                  Khám phá tài nguyên ngay
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'collections' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {userCollections.map((col) => (
              <div key={col.id} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
                <h4 className="font-bold text-base text-slate-900 dark:text-white">
                  {col.name}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-2">
                  {col.description}
                </p>
                <span className="text-[11px] font-bold text-indigo-600 block pt-2">
                  {col.toolIds.length} tài nguyên
                </span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
