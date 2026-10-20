import React from 'react';
import { ExternalLink, Star, ArrowRight, Database, GitPullRequest, FolderTree, Search, Brain, Globe, Sparkles, Box } from 'lucide-react';
import { AITool } from '../types';

interface ToolCardProps {
  tool: AITool;
  onSelect: (tool: AITool) => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, onSelect }) => {
  const [hasImgError, setHasImgError] = React.useState(false);

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Database': return <Database className="w-4 h-4" />;
      case 'GitPullRequest': return <GitPullRequest className="w-4 h-4" />;
      case 'FolderTree': return <FolderTree className="w-4 h-4" />;
      case 'Search': return <Search className="w-4 h-4" />;
      case 'Brain': return <Brain className="w-4 h-4" />;
      case 'Globe': return <Globe className="w-4 h-4" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4" />;
      default: return <Box className="w-4 h-4" />;
    }
  };

  // Xác định xem repo có ảnh demo thực tế hợp lệ hay không
  const validImageUrl = React.useMemo(() => {
    if (tool.demoImages && Array.isArray(tool.demoImages) && tool.demoImages.length > 0) {
      for (const item of tool.demoImages) {
        const u = typeof item === 'string' ? item : item?.url;
        if (typeof u === 'string' && u.trim().length > 0 && !u.includes('placeholder')) {
          return u.trim();
        }
      }
    }
    if (typeof tool.imageUrl === 'string' && tool.imageUrl.trim().length > 0 && !tool.imageUrl.includes('placeholder')) {
      return tool.imageUrl.trim();
    }
    return null;
  }, [tool.demoImages, tool.imageUrl]);

  const showImage = Boolean(validImageUrl) && !hasImgError;

  return (
    <div 
      onClick={() => onSelect(tool)}
      className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg hover:border-blue-400 dark:hover:border-blue-600 transition-all overflow-hidden cursor-pointer"
    >
      {/* Khối Ảnh Demo thực tế (Chỉ hiển thị khi có ảnh demo thật và tải thành công, không để khung ảnh trống) */}
      {showImage && validImageUrl ? (
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 dark:bg-slate-850 border-b border-slate-100 dark:border-slate-800">
          <img
            src={validImageUrl}
            alt={tool.name}
            loading="lazy"
            onError={() => setHasImgError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

          {/* Nhãn loại hình & Số sao đánh giá trên ảnh */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
            <span className="text-[11px] px-2.5 py-0.5 rounded-full font-bold backdrop-blur-md bg-slate-900/80 text-white shadow-sm border border-white/10">
              {tool.typeNameVi}
            </span>
            {tool.stars ? (
              <span className="text-[11px] px-2 py-0.5 rounded-full font-bold backdrop-blur-md bg-amber-500/90 text-white shadow-sm flex items-center space-x-1">
                <Star className="w-3 h-3 fill-current" />
                <span>{tool.stars >= 1000 ? `${(tool.stars / 1000).toFixed(1)}k` : tool.stars}</span>
              </span>
            ) : null}
          </div>
        </div>
      ) : null}

      {/* Phần thân thẻ */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Hàng nhãn loại hình & số sao khi thẻ không có ảnh demo (hiển thị tinh gọn, không để khoảng trống ảnh) */}
        {!showImage && (
          <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-slate-100 dark:border-slate-800/80">
            <span className="text-[11px] px-2.5 py-0.5 rounded-full font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-900/50">
              {tool.typeNameVi}
            </span>
            {tool.stars ? (
              <span className="text-[11px] px-2 py-0.5 rounded-full font-bold bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900 flex items-center space-x-1">
                <Star className="w-3 h-3 fill-current" />
                <span>{tool.stars >= 1000 ? `${(tool.stars / 1000).toFixed(1)}k` : tool.stars}</span>
              </span>
            ) : null}
          </div>
        )}

        <div className="flex items-center space-x-2 mb-1.5">
          <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
            {renderIcon(tool.icon)}
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
            {tool.name}
          </h3>
        </div>

        <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2">
          Bởi <span className="font-medium text-slate-700 dark:text-slate-300">{tool.authorName}</span>
        </p>

        {/* Tóm tắt công dụng tiếng Việt */}
        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-3">
          {tool.summaryVi}
        </p>

        {/* Nền tảng hỗ trợ */}
        <div className="mt-auto pt-2.5 flex flex-wrap gap-1 border-t border-slate-100 dark:border-slate-800">
          {tool.platforms.map((p) => {
            let label = 'Web';
            if (p === 'claude_desktop') label = 'Claude';
            if (p === 'antigravity') label = 'Antigravity';
            if (p === 'cursor') label = 'Cursor';
            return (
              <span key={p} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-mono">
                {label}
              </span>
            );
          })}
        </div>
      </div>

      {/* Chân thẻ: Nguồn liên kết chính thức & Nút xem chi tiết */}
      <div className="px-4 py-2.5 bg-slate-50/70 dark:bg-slate-850/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
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

        <div className="inline-flex items-center space-x-1 font-semibold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
          <span>Xem & Cài đặt</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );
};
