import React from 'react';
import { ExternalLink, Star, ArrowRight, Database, GitPullRequest, FolderTree, Search, Brain, Globe, Sparkles, Box } from 'lucide-react';
import { AITool } from '../types';
import { formatStars, getVerifiedStars } from '../lib/verification';

interface ToolCardProps {
  tool: AITool;
  onSelect: (tool: AITool) => void;
  isSaved?: boolean;
  onToggleSave?: (toolId: string) => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, onSelect, isSaved = false, onToggleSave }) => {
  const verifiedStars = getVerifiedStars(tool);
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

  const getBadgeColorClass = (toolType: string) => {
    switch (toolType) {
      case 'mcp':
        return 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200/80 dark:border-blue-900/50';
      case 'skill':
        return 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-900/50';
      case 'agent':
        return 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200/80 dark:border-indigo-900/50';
      case 'api':
        return 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border-sky-200/80 dark:border-sky-900/50';
      case 'sdk':
        return 'bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border-teal-200/80 dark:border-teal-900/50';
      case 'software':
        return 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200/80 dark:border-amber-900/50';
      case 'workflow':
        return 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200/80 dark:border-purple-900/50';
      case 'model':
        return 'bg-fuchsia-50 dark:bg-fuchsia-950/60 text-fuchsia-700 dark:text-fuchsia-300 border-fuchsia-200/80 dark:border-fuchsia-900/50';
      case 'dataset':
        return 'bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border-cyan-200/80 dark:border-cyan-900/50';
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

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

          {/* Nhãn loại hình & Số sao đánh giá + Nút gắn sao lưu trữ trên ảnh */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
            <div className="flex items-center space-x-1.5 flex-wrap gap-y-1">
              <span className="text-[11px] px-2.5 py-0.5 rounded-full font-bold backdrop-blur-md bg-slate-900/80 text-white shadow-sm border border-white/10">
                {tool.typeNameVi}
              </span>
              {tool.isVietnamMarket && (
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold backdrop-blur-md bg-rose-600/90 text-white shadow-sm flex items-center space-x-1 border border-rose-400/40">
                  <span>🇻🇳 Thị trường VN</span>
                </span>
              )}
            </div>
            <div className="flex items-center space-x-1.5 pointer-events-auto">
              {verifiedStars !== null ? (
                <span className="text-[11px] px-2 py-0.5 rounded-full font-bold backdrop-blur-md bg-amber-500/90 text-white shadow-sm flex items-center space-x-1">
                  <Star className="w-3 h-3 fill-current" />
                  <span>{formatStars(verifiedStars)}</span>
                </span>
              ) : null}
              {onToggleSave && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSave(tool.id);
                  }}
                  className={`p-1 rounded-full backdrop-blur-md transition-transform hover:scale-110 active:scale-95 shadow-sm border ${
                    isSaved
                      ? 'bg-amber-400 text-slate-900 border-amber-300'
                      : 'bg-slate-900/70 text-slate-200 border-white/20 hover:text-amber-300'
                  }`}
                  title={isSaved ? "Đã gắn sao lưu trữ (Bấm để bỏ lưu)" : "Gắn sao để lưu trữ công cụ"}
                >
                  <Star className={`w-3.5 h-3.5 ${isSaved ? 'fill-current text-slate-950' : ''}`} />
                </button>
              )}
            </div>
          </div>
        </div>
      ) : null}

      {/* Phần thân thẻ */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Hàng nhãn loại hình, cờ VN & số sao khi thẻ không có ảnh demo */}
        {!showImage && (
          <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-slate-100 dark:border-slate-800/80">
            <div className="flex items-center space-x-1.5 flex-wrap gap-y-1">
              <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold border ${getBadgeColorClass(tool.toolType)}`}>
                {tool.typeNameVi}
              </span>
              {tool.isVietnamMarket && (
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-rose-50 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-200 dark:border-rose-800 flex items-center space-x-1">
                  <span>🇻🇳 Thị trường VN</span>
                </span>
              )}
            </div>
            <div className="flex items-center space-x-1.5">
              {verifiedStars !== null ? (
                <span className="text-[11px] px-2 py-0.5 rounded-full font-bold bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900 flex items-center space-x-1">
                  <Star className="w-3 h-3 fill-current" />
                  <span>{formatStars(verifiedStars)}</span>
                </span>
              ) : null}
              {onToggleSave && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSave(tool.id);
                  }}
                  className={`p-1 rounded-lg border transition-all hover:scale-110 active:scale-95 ${
                    isSaved
                      ? 'bg-amber-50 dark:bg-amber-950/80 border-amber-300 dark:border-amber-700 text-amber-500 shadow-xs'
                      : 'border-slate-200 dark:border-slate-700 text-slate-400 hover:text-amber-500 hover:border-amber-300'
                  }`}
                  title={isSaved ? "Đã gắn sao lưu trữ (Bấm để bỏ lưu)" : "Gắn sao để lưu trữ công cụ"}
                >
                  <Star className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-400 text-amber-500' : ''}`} />
                </button>
              )}
            </div>
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
        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-2.5">
          {tool.summaryVi}
        </p>

        {/* Danh sách các Lĩnh vực chuyên môn mà tài nguyên thuộc về */}
        <div className="flex flex-wrap items-center gap-1 mb-3">
          <span className="text-[10px] px-2 py-0.5 rounded-md font-medium bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/40">
            {tool.categoryNameVi}
          </span>
          {(tool.categoryNamesVi || [])
            .filter((c) => c !== tool.categoryNameVi && c !== '🇻🇳 Thị Trường Việt Nam')
            .slice(0, 2)
            .map((cName, idx) => (
              <span key={idx} className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/60">
                {cName}
              </span>
            ))}
          {(tool.categories || []).filter(c => c !== 'vietnam').length > 3 && (
            <span className="text-[10px] px-1 py-0.5 rounded text-slate-400 font-semibold" title={(tool.categoryNamesVi || []).join(', ')}>
              +{(tool.categories || []).filter(c => c !== 'vietnam').length - 3}
            </span>
          )}
        </div>

        {/* Nền tảng hỗ trợ */}
        <div className="mt-auto pt-2.5 flex flex-wrap gap-1 border-t border-slate-100 dark:border-slate-800">
          {(tool.platforms || []).map((p) => {
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
