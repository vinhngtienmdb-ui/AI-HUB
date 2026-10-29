import React from 'react';
import { ArrowRight, ArrowUpRight, Clock, Star, History } from 'lucide-react';
import { AITool } from '../types';
import { formatStars, getVerifiedStars } from '../lib/verification';
import { compareByLastUpdatedDesc, formatRelativeVi, getLastUpdated } from '../lib/recency';

interface RecentlyUpdatedProps {
  tools: AITool[];
  onSelectTool: (tool: AITool) => void;
  onViewAll: () => void;
  isExpanded?: boolean;
  limit?: number;
}

// Mục đầu trang chủ: các repo vừa được cập nhật gần nhất, mới nhất đứng đầu
export const RecentlyUpdated: React.FC<RecentlyUpdatedProps> = ({
  tools,
  onSelectTool,
  onViewAll,
  isExpanded = true,
  limit = 8,
}) => {
  const recentTools = React.useMemo(
    () => tools.filter((t) => getLastUpdated(t)).sort(compareByLastUpdatedDesc).slice(0, limit),
    [tools, limit]
  );

  if (recentTools.length === 0) return null;

  return (
    <section className={`w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 transition-all duration-300 ${isExpanded ? 'max-w-[98%]' : 'max-w-7xl'}`}>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/40 flex items-center justify-center shrink-0">
            <History className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Repo mới cập nhật
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Các công cụ có mã nguồn vừa được cập nhật gần đây nhất
            </p>
          </div>
        </div>

        <button
          onClick={onViewAll}
          className="inline-flex items-center space-x-1 text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors group shrink-0"
        >
          <span>Xem tất cả</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {recentTools.map((tool, idx) => {
          const lastUpdated = getLastUpdated(tool);
          const stars = getVerifiedStars(tool);
          return (
            <button
              key={tool.id}
              type="button"
              onClick={() => onSelectTool(tool)}
              // Trên điện thoại chỉ hiện 4 thẻ đầu để không đẩy nội dung khác xuống quá xa
              className={`${idx >= 4 ? 'hidden sm:flex' : 'flex'} group text-left flex-col justify-between p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-lg hover:border-emerald-300 dark:hover:border-emerald-700 transition-all`}
            >
              <div className="min-w-0 w-full">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="inline-flex items-center gap-1 shrink-0 whitespace-nowrap text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60">
                    <Clock className="w-3 h-3" />
                    {formatRelativeVi(lastUpdated)}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500 truncate">
                    {tool.typeNameVi}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                  {tool.name}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mb-2">{tool.authorName}</p>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2 min-h-[36px]">
                  {tool.summaryVi}
                </p>
              </div>

              <div className="w-full flex items-center justify-between pt-3 mt-3 border-t border-slate-100 dark:border-slate-800/80 text-[11px]">
                {stars !== null ? (
                  <span className="flex items-center gap-1 font-semibold text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    {formatStars(stars)}
                  </span>
                ) : (
                  <span className="text-slate-400 dark:text-slate-500">
                    {new Date(lastUpdated).toLocaleDateString('vi-VN')}
                  </span>
                )}
                <span className="inline-flex items-center gap-1 font-bold text-indigo-600 dark:text-indigo-400">
                  Xem chi tiết
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
