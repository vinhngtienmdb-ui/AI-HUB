import React, { useState, useEffect, useMemo } from 'react';
import { X, ExternalLink, Copy, Check, ShieldCheck, Terminal, Code2, BookOpen, MessageSquareQuote, Layers, Sparkles, Play, Image as ImageIcon, Maximize2 } from 'lucide-react';
import { AITool, ConfigTemplate } from '../types';

interface ToolDetailModalProps {
  tool: AITool | null;
  onClose: () => void;
  onExecuteCommand?: (command: string) => void;
}

export const ToolDetailModal: React.FC<ToolDetailModalProps> = ({ tool, onClose, onExecuteCommand }) => {
  if (!tool) return null;

  const [activeTab, setActiveTab] = useState<number>(0);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [copiedConfig, setCopiedConfig] = useState<boolean>(false);
  const [copiedCli, setCopiedCli] = useState<boolean>(false);
  const [copiedPromptIndex, setCopiedPromptIndex] = useState<number | null>(null);
  const [imageLoadFailed, setImageLoadFailed] = useState<boolean>(false);

  useEffect(() => {
    setActiveTab(0);
    setActiveImageIndex(0);
    setImageLoadFailed(false);
  }, [tool?.id]);

  // Lọc danh sách ảnh demo hợp lệ từ repo (loại bỏ hoàn toàn nếu rỗng, không có ảnh hoặc ảnh lỗi)
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

  const currentConfig: ConfigTemplate | undefined = tool.configs[activeTab] || tool.configs[0];

  const handleCopyConfig = () => {
    if (!currentConfig) return;
    navigator.clipboard.writeText(currentConfig.jsonConfig);
    setCopiedConfig(true);
    setTimeout(() => setCopiedConfig(false), 2000);
  };

  const handleCopyCli = () => {
    if (!currentConfig?.cliCommand) return;
    navigator.clipboard.writeText(currentConfig.cliCommand);
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

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
            <span className="text-xs px-2.5 py-1 rounded-full font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
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

        {/* Nội dung chi tiết cuộn được */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 divide-y divide-slate-100 dark:divide-slate-800">
          
          {/* KHỐI ẢNH MINH HỌA / DEMO TRỰC QUAN (Chỉ hiển thị nếu repo có ảnh demo thật và tải thành công, loại bỏ hoàn toàn nếu không có) */}
          {(() => {
            if (validDemoImages.length === 0 || imageLoadFailed) return null;

            const currentItem = validDemoImages[activeImageIndex] || validDemoImages[0];
            const currentUrl = currentItem.url;
            const currentCaption = currentItem.caption;

            return (
              <div className="pt-0">
                <div className="relative aspect-[21/9] sm:aspect-[2.4/1] w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-md group">
                  <img
                    src={currentUrl}
                    alt={tool.name}
                    onError={() => setImageLoadFailed(true)}
                    className="w-full h-full object-cover object-center transition-all duration-300"
                  />
                  
                  {/* Nút xem ảnh kích thước thật trong tab mới */}
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

                {/* Khung ghi chú rõ ràng cho từng ảnh demo */}
                <div className="mt-2.5 px-4 py-2.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 flex items-start space-x-2 text-xs">
                  <span className="font-bold text-blue-700 dark:text-blue-300 shrink-0">
                    Ghi chú ảnh {validDemoImages.length > 1 ? `(${activeImageIndex + 1}/${validDemoImages.length})` : ''}:
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    {currentCaption}
                  </p>
                </div>

                {/* Danh sách thumbnail thu nhỏ nếu có nhiều ảnh demo */}
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
                            ? 'border-blue-600 ring-2 ring-blue-500/30 scale-105'
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

          {/* KHỐI 1: NGUỒN GỐC VÀ THÔNG TIN CHÍNH THỨC */}
          <div className="pt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
                  <span className="inline-flex items-center text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                    Đã kiểm duyệt nguồn
                  </span>
                </div>
              </div>

              {/* Nút bấm dẫn liên kết nguồn chính thức bắt buộc */}
              <a
                href={tool.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-sm font-semibold shadow-sm transition-all"
              >
                <span>Kho mã nguồn chính thức</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* KHỐI 2: CÔNG DỤNG VÀ GIẢI PHÁP TIẾNG VIỆT */}
          <div className="pt-6">
            <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-bold text-base mb-3">
              <BookOpen className="w-5 h-5" />
              <span>1. Công Dụng & Bài Toán Giải Quyết</span>
            </div>
            
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base mb-4">
              {tool.purposeVi}
            </p>

            <div className="bg-slate-50 dark:bg-slate-850 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Các tính năng nổi bật:
              </h4>
              <ul className="space-y-1.5 text-sm text-slate-600 dark:text-slate-300">
                {tool.featuresVi.map((f, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-blue-500 mr-2 font-bold">•</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* KHỐI 3: HƯỚNG DẪN CÀI ĐẶT & CẤU HÌNH MỘT CHẠM */}
          <div className="pt-6">
            <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-bold text-base mb-3">
              <Terminal className="w-5 h-5" />
              <span>2. Hướng Dẫn Cài Đặt & Cấu Hình Môi Trường</span>
            </div>

            <div className="text-sm text-slate-700 dark:text-slate-300 mb-4 whitespace-pre-line leading-relaxed">
              {tool.installGuideVi}
            </div>

            {/* Các tab chọn môi trường cấu hình */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-inner">
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/80 border-b border-slate-800">
                <div className="flex items-center space-x-1">
                  {tool.configs.map((cfg, idx) => (
                    <button
                      key={cfg.platform}
                      onClick={() => setActiveTab(idx)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        activeTab === idx
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                      }`}
                    >
                      {cfg.platformName}
                    </button>
                  ))}
                </div>

                <span className="text-[11px] text-slate-400 font-mono">
                  Định dạng JSON
                </span>
              </div>

              {/* Lệnh chạy dòng lệnh nhanh nếu có */}
              {currentConfig?.cliCommand ? (
                <div className="px-4 py-3 bg-slate-900/60 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
                  <div className="flex items-center space-x-2 overflow-x-auto text-emerald-400 pr-2">
                    <span className="text-slate-500 select-none">$</span>
                    <span>{currentConfig.cliCommand}</span>
                  </div>
                  <div className="flex items-center space-x-2 shrink-0">
                    {onExecuteCommand && (
                      <button
                        onClick={() => onExecuteCommand(currentConfig.cliCommand!)}
                        className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition-colors shadow-sm active:scale-95"
                        title="Thực thi câu lệnh trực tiếp trên máy tính qua Terminal cục bộ"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Chạy lệnh trên máy</span>
                      </button>
                    )}
                    <button
                      onClick={handleCopyCli}
                      className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
                    >
                      {copiedCli ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCli ? 'Đã sao chép' : 'Sao chép'}</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Gợi ý lệnh khởi chạy nhanh nếu là máy chủ MCP */
                tool.toolType === 'mcp' && onExecuteCommand && (
                  <div className="px-4 py-2.5 bg-slate-900/60 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">
                      Gợi ý kiểm tra máy chủ: <code className="text-emerald-400 font-bold">npx -y {tool.slug.replace(/-mcp$/, '')} --help</code>
                    </span>
                    <button
                      onClick={() => onExecuteCommand(`npx -y ${tool.slug.replace(/-mcp$/, '')} --help`)}
                      className="flex items-center space-x-1 px-2.5 py-1 rounded bg-emerald-600/80 hover:bg-emerald-600 text-white text-xs transition-colors"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Chạy thử MCP</span>
                    </button>
                  </div>
                )
              )}

              {/* Khối hiển thị mã JSON cấu hình mẫu */}
              <div className="relative p-4">
                <button
                  onClick={handleCopyConfig}
                  className="absolute top-3 right-3 z-10 flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md transition-all active:scale-95"
                >
                  {copiedConfig ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Đã sao chép cấu hình!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Sao chép cấu hình</span>
                    </>
                  )}
                </button>

                <pre className="text-xs sm:text-sm text-slate-200 overflow-x-auto leading-relaxed font-mono pt-6">
                  <code>{currentConfig?.jsonConfig}</code>
                </pre>
              </div>
            </div>
          </div>

          {/* KHỐI 4: HƯỚNG DẪN SỬ DỤNG VÀ KỊCH BẢN MẪU TIẾNG VIỆT */}
          <div className="pt-6">
            <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-bold text-base mb-3">
              <MessageSquareQuote className="w-5 h-5" />
              <span>3. Hướng Dẫn Sử Dụng & Câu Lệnh Mẫu</span>
            </div>

            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              {tool.usageGuideVi}
            </p>

            <div className="space-y-2.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Câu lệnh (Prompts) gợi ý bằng tiếng Việt:
              </span>
              {tool.samplePromptsVi.map((prompt, pIdx) => {
                const isCopied = copiedPromptIndex === pIdx;
                return (
                  <div
                    key={pIdx}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-xs sm:text-sm text-slate-700 dark:text-slate-200"
                  >
                    <div className="flex items-start space-x-2 pr-3">
                      <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span className="italic">"{prompt}"</span>
                    </div>
                    <button
                      onClick={() => handleCopyPrompt(prompt, pIdx)}
                      className="shrink-0 flex items-center space-x-1 px-2.5 py-1 rounded-md bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600 text-xs font-medium text-slate-600 dark:text-slate-200 transition-colors"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCopied ? 'Đã chép' : 'Chép'}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

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
