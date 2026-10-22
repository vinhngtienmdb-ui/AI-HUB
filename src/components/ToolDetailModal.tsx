import React, { useState, useEffect, useMemo } from 'react';
import { 
  X, ExternalLink, Copy, Check, ShieldCheck, Terminal, Code2, 
  BookOpen, MessageSquareQuote, Layers, Sparkles, Image as ImageIcon, 
  Maximize2, GitBranch 
} from 'lucide-react';
import { AITool, ConfigTemplate } from '../types';
import { GitHubReadmeViewer } from './GitHubReadmeViewer';
import { GitHubCodeViewer } from './GitHubCodeViewer';
import { VisualDiagramViewer } from './VisualDiagramViewer';

interface ToolDetailModalProps {
  tool: AITool | null;
  onClose: () => void;
  onExecuteCommand?: (command: string) => void;
}

export const ToolDetailModal: React.FC<ToolDetailModalProps> = ({ tool, onClose }) => {
  if (!tool) return null;

  const [modalTab, setModalTab] = useState<'overview' | 'diagram' | 'setup' | 'usage' | 'readme'>('overview');
  const [activePlatformTab, setActivePlatformTab] = useState<number>(0);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [copiedPromptIndex, setCopiedPromptIndex] = useState<number | null>(null);
  const [imageLoadFailed, setImageLoadFailed] = useState<boolean>(false);

  useEffect(() => {
    setModalTab('overview');
    setActivePlatformTab(0);
    setActiveImageIndex(0);
    setImageLoadFailed(false);
  }, [tool?.id]);

  // Lọc danh sách ảnh demo hợp lệ từ repo
  const validDemoImages = useMemo(() => {
    const list: { url: string; caption: string }[] = [];
    if (tool.demoImages && Array.isArray(tool.demoImages)) {
      tool.demoImages.forEach((img) => {
        const u = typeof img === 'string' ? img : img?.url;
        const cap = typeof img === 'object' && img?.caption ? img.caption : `Ảnh minh họa tính năng và giao diện thực tế của ${tool.name}.`;
        if (typeof u === 'string' && u.trim().length > 0 && !u.includes('placeholder')) {
          list.push({ url: u.trim(), caption: cap });
        }
      });
    }
    if (list.length === 0 && typeof tool.imageUrl === 'string' && tool.imageUrl.trim().length > 0 && !tool.imageUrl.includes('placeholder')) {
      list.push({
        url: tool.imageUrl.trim(),
        caption: `Ảnh minh họa tính năng và giao diện thực tế của ${tool.name}.`
      });
    }
    return list;
  }, [tool.demoImages, tool.imageUrl, tool.name]);

  const currentConfig: ConfigTemplate | undefined = tool.configs[activePlatformTab] || tool.configs[0];

  const handleCopyPrompt = (prompt: string, index: number) => {
    navigator.clipboard.writeText(prompt);
    setCopiedPromptIndex(index);
    setTimeout(() => setCopiedPromptIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div 
        className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Thanh tiêu đề Modal */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center space-x-3">
            <span className="text-xs px-2.5 py-1 rounded-full font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
              {tool.typeNameVi}
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500">•</span>
            <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
              Lĩnh vực: {tool.categoryNameVi}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Đóng cửa sổ"
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* THANH TABS ĐIỀU HƯỚNG CHÍNH CỦA MODAL (SƠ ĐỒ TRỰC QUAN ĐƯỢC TÁCH THÀNH 1 TAB RIÊNG) */}
        <div className="flex items-center space-x-2 sm:space-x-4 px-6 pt-3 pb-2 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-850/60 overflow-x-auto text-xs sm:text-sm font-bold shrink-0">
          <button
            onClick={() => setModalTab('overview')}
            className={`pb-2.5 border-b-2 transition-all flex items-center space-x-1.5 shrink-0 ${
              modalTab === 'overview'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Tổng quan</span>
          </button>

          <button
            onClick={() => setModalTab('diagram')}
            className={`pb-2.5 border-b-2 transition-all flex items-center space-x-1.5 shrink-0 ${
              modalTab === 'diagram'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <GitBranch className="w-4 h-4" />
            <span>Sơ đồ trực quan</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
              Vector SVG
            </span>
          </button>

          <button
            onClick={() => setModalTab('setup')}
            className={`pb-2.5 border-b-2 transition-all flex items-center space-x-1.5 shrink-0 ${
              modalTab === 'setup'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Cài đặt &amp; Cấu hình ({tool.configs.length})</span>
          </button>

          <button
            onClick={() => setModalTab('usage')}
            className={`pb-2.5 border-b-2 transition-all flex items-center space-x-1.5 shrink-0 ${
              modalTab === 'usage'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <MessageSquareQuote className="w-4 h-4" />
            <span>Câu lệnh &amp; Hướng dẫn</span>
          </button>

          {tool.readmeVi && (
            <button
              onClick={() => setModalTab('readme')}
              className={`pb-2.5 border-b-2 transition-all flex items-center space-x-1.5 shrink-0 ${
                modalTab === 'readme'
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>Tài liệu README (GitHub)</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300">
                Tiếng Việt
              </span>
            </button>
          )}
        </div>

        {/* Nội dung chi tiết theo từng Tab */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          
          {/* TAB 1: TỔNG QUAN */}
          {modalTab === 'overview' && (
            <div className="space-y-6 animate-fadeIn">
              {/* KHỐI ẢNH MINH HỌA / DEMO TRỰC QUAN */}
              {(() => {
                if (validDemoImages.length === 0 || imageLoadFailed) return null;

                const currentItem = validDemoImages[activeImageIndex] || validDemoImages[0];
                const currentUrl = currentItem.url;
                const currentCaption = currentItem.caption;

                return (
                  <div>
                    <div className="relative aspect-[21/9] sm:aspect-[2.4/1] w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-md group">
                      <img
                        src={currentUrl}
                        alt={tool.name}
                        onError={() => setImageLoadFailed(true)}
                        className="w-full h-full object-cover object-center transition-all duration-300"
                      />
                      <a
                        href={currentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute top-3 right-3 flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-white text-xs font-semibold backdrop-blur-md shadow-lg opacity-90 hover:opacity-100 transition-opacity"
                        title="Mở ảnh gốc trong tab mới"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Xem ảnh gốc</span>
                      </a>
                    </div>

                    <div className="mt-2.5 px-4 py-2.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 flex items-start space-x-2 text-xs">
                      <span className="font-bold text-indigo-700 dark:text-indigo-300 shrink-0">
                        Ghi chú ảnh {validDemoImages.length > 1 ? `(${activeImageIndex + 1}/${validDemoImages.length})` : ''}:
                      </span>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                        {currentCaption}
                      </p>
                    </div>

                    {validDemoImages.length > 1 && (
                      <div className="flex items-center space-x-2.5 mt-3 overflow-x-auto pb-1">
                        {validDemoImages.map((imgItem, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setActiveImageIndex(idx);
                              setImageLoadFailed(false);
                            }}
                            className={`relative w-20 h-12 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                              activeImageIndex === idx
                                ? 'border-indigo-600 ring-2 ring-indigo-500/30 scale-105'
                                : 'border-slate-200 dark:border-slate-800 opacity-60 hover:opacity-100'
                            }`}
                          >
                            <img src={imgItem.url} alt={`demo-${idx}`} className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Thông tin chính thức */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {tool.name}
                  </h2>
                  <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <span>Tác giả: <strong className="text-slate-700 dark:text-slate-300 font-medium">{tool.authorName}</strong></span>
                    <span>•</span>
                    <span>Giấy phép: <span className="font-mono">{tool.license}</span></span>
                    {tool.stars && (
                      <>
                        <span>•</span>
                        <span>Đánh giá: <strong>{tool.stars.toLocaleString()}</strong> sao</span>
                      </>
                    )}
                    <span className="inline-flex items-center text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                      Đã kiểm duyệt nguồn
                    </span>
                  </div>
                </div>

                <a
                  href={tool.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-sm font-semibold shadow-sm transition-all shrink-0"
                >
                  <span>Kho mã nguồn chính thức</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* Công dụng & Bài toán giải quyết */}
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-2">
                  Bài toán và giá trị mang lại:
                </h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                  {tool.purposeVi}
                </p>
              </div>

              {/* Tính năng nổi bật */}
              <div className="bg-slate-50 dark:bg-slate-850 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                  Các tính năng nổi bật:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-700 dark:text-slate-300">
                  {(tool.featuresVi || []).map((f, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <span className="text-indigo-500 font-bold">•</span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SƠ ĐỒ TRỰC QUAN (DIAGRAM VECTOR SVG & THẺ PHÂN CHẶNG) */}
          {modalTab === 'diagram' && (
            <div className="space-y-4 animate-fadeIn">
              <VisualDiagramViewer 
                toolId={tool.id} 
                toolName={tool.name} 
                markdown={tool.readmeVi} 
              />
            </div>
          )}

          {/* TAB 3: CÀI ĐẶT & CẤU HÌNH */}
          {modalTab === 'setup' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Hướng Dẫn Cài Đặt Môi Trường:
                </h4>
                <div className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                  {tool.installGuideVi}
                </div>
              </div>

              {/* Bộ chọn nền tảng cấu hình */}
              <div className="space-y-3">
                <div className="flex items-center space-x-1.5 overflow-x-auto pb-1">
                  {(tool.configs || []).map((cfg, idx) => (
                    <button
                      key={cfg.platform}
                      onClick={() => setActivePlatformTab(idx)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-xs ${
                        activePlatformTab === idx
                          ? 'bg-indigo-600 text-white shadow-indigo-500/20'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {cfg.platformName}
                    </button>
                  ))}
                </div>

                {currentConfig && (
                  <GitHubCodeViewer 
                    code={currentConfig.jsonConfig}
                    fileName={
                      currentConfig.platform === 'claude_desktop' ? 'claude_desktop_config.json' :
                      currentConfig.platform === 'antigravity' ? 'mcp_config.json' :
                      currentConfig.platform === 'cursor' ? '.cursor/mcp.json' :
                      currentConfig.platform === 'windsurf' ? 'mcp_config.json' : 'config.json'
                    }
                    platformName={currentConfig.platformName}
                    cliCommand={currentConfig.cliCommand}
                  />
                )}
              </div>
            </div>
          )}

          {/* TAB 4: CÂU LỆNH & HƯỚNG DẪN */}
          {modalTab === 'usage' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Hướng Dẫn Thao Tác &amp; Vận Hành:
                </h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {tool.usageGuideVi}
                </p>
              </div>

              <div className="space-y-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Câu lệnh (Prompts) gợi ý bằng tiếng Việt:
                </span>
                {(tool.samplePromptsVi || []).map((prompt, pIdx) => {
                  const isCopied = copiedPromptIndex === pIdx;
                  return (
                    <div
                      key={pIdx}
                      className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-xs sm:text-sm text-slate-700 dark:text-slate-200"
                    >
                      <div className="flex items-start space-x-2.5 pr-3">
                        <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span className="italic">"{prompt}"</span>
                      </div>
                      <button
                        onClick={() => handleCopyPrompt(prompt, pIdx)}
                        className="shrink-0 flex items-center space-x-1 px-2.5 py-1 rounded-md bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600 text-xs font-semibold text-slate-600 dark:text-slate-200 transition-colors"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{isCopied ? 'Đã chép' : 'Chép'}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 5: TÀI LIỆU README (GITHUB) - HOÀN TOÀN KHÔNG BỊ XEN LẪN SƠ ĐỒ */}
          {modalTab === 'readme' && tool.readmeVi && (
            <div className="space-y-4 animate-fadeIn">
              <GitHubReadmeViewer 
                markdown={tool.readmeVi} 
                sourceUrl={tool.sourceUrl} 
                fileName="README.md"
                toolId={tool.id}
                toolName={tool.name}
              />
            </div>
          )}

        </div>

        {/* Chân Modal */}
        <div className="sticky bottom-0 z-10 px-6 py-3.5 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Định dạng theo tiêu chuẩn tài liệu VibeCode 12 giai đoạn</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
          >
            Đóng cửa sổ
          </button>
        </div>
      </div>
    </div>
  );
};
