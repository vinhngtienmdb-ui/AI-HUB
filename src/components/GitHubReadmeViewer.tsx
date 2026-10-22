import React, { useState, useMemo } from 'react';
import { marked } from 'marked';
import { FileText, Copy, Check, ExternalLink, Code2, Eye } from 'lucide-react';

interface GitHubReadmeViewerProps {
  markdown: string;
  sourceUrl?: string;
  fileName?: string;
}

export const GitHubReadmeViewer: React.FC<GitHubReadmeViewerProps> = ({
  markdown,
  sourceUrl,
  fileName = 'README.md'
}) => {
  const [viewMode, setViewMode] = useState<'preview' | 'raw'>('preview');
  const [copied, setCopied] = useState(false);

  // Cấu hình marked để sinh HTML an toàn và đúng quy chuẩn GitHub
  const htmlContent = useMemo(() => {
    if (!markdown) return '';
    try {
      return marked.parse(markdown, {
        gfm: true,
        breaks: true
      }) as string;
    } catch (e) {
      console.error('Lỗi phân tích cú pháp Markdown:', e);
      return `<p>${markdown}</p>`;
    }
  }, [markdown]);

  const handleCopy = () => {
    if (!markdown) return;
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border border-slate-200/90 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs transition-colors">
      
      {/* THANH TIÊU ĐỀ HỘP README CHUẨN GITHUB */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 select-none">
        <div className="flex items-center space-x-2.5">
          <FileText className="w-4 h-4 text-slate-500 dark:text-slate-400" />
          <span className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-mono tracking-tight">
            {fileName}
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60">
            Tiếng Việt
          </span>
        </div>

        {/* CÁC THAO TÁC CÔNG CỤ */}
        <div className="flex items-center space-x-2">
          {/* Nút chuyển đổi Preview / Raw */}
          <div className="flex items-center bg-slate-200/70 dark:bg-slate-800 p-0.5 rounded-lg text-xs font-semibold">
            <button
              type="button"
              onClick={() => setViewMode('preview')}
              className={`flex items-center space-x-1 px-2.5 py-1 rounded-md transition-all ${
                viewMode === 'preview'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Xem trước định dạng hiển thị"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Xem trước</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('raw')}
              className={`flex items-center space-x-1 px-2.5 py-1 rounded-md transition-all ${
                viewMode === 'raw'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Xem mã nguồn Markdown thô"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mã nguồn thô</span>
            </button>
          </div>

          {/* Nút Sao chép */}
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-xs transition-colors"
            title="Sao chép toàn bộ mã nguồn Markdown"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">Đã chép!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Sao chép</span>
              </>
            )}
          </button>

          {/* Nút xem kho lưu trữ GitHub gốc nếu có */}
          {sourceUrl && (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              title="Mở kho lưu trữ GitHub chính thức"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          )}
        </div>
      </div>

      {/* NỘI DUNG README HIỂN THỊ CHUẨN GITHUB */}
      <div className="p-6 sm:p-8 lg:p-10 overflow-x-auto">
        {viewMode === 'preview' ? (
          <div 
            className="github-markdown-body text-slate-900 dark:text-slate-100"
            dangerouslySetInnerHTML={{ __html: htmlContent }} 
          />
        ) : (
          <pre className="font-mono text-xs sm:text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <code>{markdown}</code>
          </pre>
        )}
      </div>

      {/* CHÂN KHUNG THÔNG TIN GITHUB */}
      <div className="px-6 py-2.5 bg-slate-50/70 dark:bg-slate-850/60 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
        <span>Hiển thị theo chuẩn giao diện tài liệu GitHub Flavored Markdown (GFM)</span>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="hover:text-indigo-600 transition-colors"
        >
          Lên đầu trang ↑
        </button>
      </div>

    </div>
  );
};
