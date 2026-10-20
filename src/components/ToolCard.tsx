import React from 'react';
import { ExternalLink, Star, ArrowRight, Database, GitPullRequest, FolderTree, Search, Brain, Globe, Sparkles, Box } from 'lucide-react';
import { AITool } from '../types';

interface ToolCardProps {
  tool: AITool;
  onSelect: (tool: AITool) => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, onSelect }) => {
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Database': return <Database className="w-5 h-5" />;
      case 'GitPullRequest': return <GitPullRequest className="w-5 h-5" />;
      case 'FolderTree': return <FolderTree className="w-5 h-5" />;
      case 'Search': return <Search className="w-5 h-5" />;
      case 'Brain': return <Brain className="w-5 h-5" />;
      case 'Globe': return <Globe className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      default: return <Box className="w-5 h-5" />;
    }
  };

  return (
    <div className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700/60 transition-all overflow-hidden">
      {/* Phần đầu thẻ: Biểu tượng & Nhãn */}
      <div className="p-5 pb-3">
        <div className="flex items-start justify-between mb-3">
          <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform">
            {renderIcon(tool.icon)}
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              {tool.typeNameVi}
            </span>
          </div>
        </div>

        {/* Tên công cụ và Tác giả */}
        <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
          {tool.name}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-2.5">
          Bởi <span className="font-medium text-slate-700 dark:text-slate-300">{tool.authorName}</span>
        </p>

        {/* Tóm tắt công dụng tiếng Việt */}
        <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
          {tool.summaryVi}
        </p>
      </div>

      {/* Nền tảng hỗ trợ */}
      <div className="px-5 py-2.5 flex flex-wrap gap-1.5 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50">
        {tool.platforms.map((p) => {
          let label = 'Web';
          if (p === 'claude_desktop') label = 'Claude Desktop';
          if (p === 'antigravity') label = 'Antigravity';
          if (p === 'cursor') label = 'Cursor';
          return (
            <span key={p} className="text-[11px] px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-mono">
              {label}
            </span>
          );
        })}
      </div>

      {/* Chân thẻ: Nguồn liên kết chính thức & Nút xem chi tiết */}
      <div className="mt-auto px-5 py-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
        <a
          href={tool.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
          title="Mở liên kết nguồn chính thức trong tab mới"
        >
          <span>Nguồn gốc</span>
          <ExternalLink className="w-3 h-3 ml-1" />
        </a>

        <button
          onClick={() => onSelect(tool)}
          className="inline-flex items-center space-x-1 font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        >
          <span>Chi tiết & Cài đặt</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
