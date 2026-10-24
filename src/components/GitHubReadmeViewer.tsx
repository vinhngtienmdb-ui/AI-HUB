import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  FileText, Copy, Check, ExternalLink, Code2, Eye, FolderGit2, Languages, RefreshCw
} from 'lucide-react';
import {
  fetchOriginalReadme,
  HEADING_ID_PREFIX,
  MarkdownBase,
  parseGithubSource,
  renderGithubMarkdown
} from '../lib/githubMarkdown';

interface GitHubReadmeViewerProps {
  markdown: string;
  sourceUrl?: string;
  fileName?: string;
  toolId?: string;
  toolName?: string;
}

export const GitHubReadmeViewer: React.FC<GitHubReadmeViewerProps> = ({
  markdown,
  sourceUrl,
  fileName = 'README.md',
  toolName
}) => {
  const [viewMode, setViewMode] = useState<'preview' | 'raw'>('preview');
  const [copiedAll, setCopiedAll] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Nguồn nội dung: README tiếng Việt của AI HUB hoặc README gốc đọc trực tiếp từ GitHub
  const githubSource = useMemo(() => parseGithubSource(sourceUrl), [sourceUrl]);
  const [contentSource, setContentSource] = useState<'vi' | 'original'>('vi');
  const [original, setOriginal] = useState<
    | { status: 'idle' | 'loading' }
    | { status: 'ready'; markdown: string; base: MarkdownBase; fileUrl: string }
    | { status: 'error'; message: string }
  >({ status: 'idle' });

  useEffect(() => {
    setContentSource('vi');
    setOriginal({ status: 'idle' });
  }, [sourceUrl]);

  const loadOriginal = () => {
    if (!githubSource) return;
    setOriginal({ status: 'loading' });
    fetchOriginalReadme(githubSource)
      .then((result) => setOriginal({ status: 'ready', ...result }))
      .catch((error: Error) => setOriginal({ status: 'error', message: error.message }));
  };

  const showOriginal = () => {
    setContentSource('original');
    if (original.status === 'idle' || original.status === 'error') loadOriginal();
  };

  const activeMarkdown = contentSource === 'original'
    ? (original.status === 'ready' ? original.markdown : '')
    : markdown;

  // README gốc hiển thị đúng như GitHub (xuống dòng đơn không ngắt dòng, ảnh và liên kết tương đối trỏ về repo);
  // README tiếng Việt sinh tự động giữ ngắt dòng đơn
  const htmlContent = useMemo(() => {
    if (contentSource === 'original') {
      return original.status === 'ready' ? renderGithubMarkdown(original.markdown, { base: original.base, breaks: false }) : '';
    }
    return renderGithubMarkdown(markdown, { breaks: true });
  }, [contentSource, original, markdown]);

  // Neo trong README (#muc-luc) cuộn tới tiêu đề thay vì đổi đường dẫn hash của ứng dụng
  const handleContentClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const link = (event.target as HTMLElement).closest('a');
    const href = link?.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    event.preventDefault();
    const target = containerRef.current?.querySelector(`[id="${HEADING_ID_PREFIX}${CSS.escape(decodeURIComponent(href.slice(1)).toLowerCase())}"]`);
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Tự động gắn nút Copy chuẩn phong cách GitHub cho tất cả các thẻ <pre> code block
  useEffect(() => {
    if (!containerRef.current || viewMode !== 'preview') return;

    const preElements = containerRef.current.querySelectorAll('pre');
    preElements.forEach((pre) => {
      if (pre.querySelector('.github-code-copy-btn')) return;

      pre.classList.add('relative', 'group');

      const btn = document.createElement('button');
      btn.className = 'github-code-copy-btn absolute top-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-700 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white border border-slate-200 dark:border-slate-700 shadow-xs transition-all flex items-center space-x-1 text-xs opacity-85 group-hover:opacity-100 font-sans';
      btn.title = 'Sao chép đoạn mã (Copy code)';
      btn.innerHTML = `
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
        </svg>
        <span class="text-[11px] font-medium ml-1">Chép</span>
      `;

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const codeElement = pre.querySelector('code');
        const textToCopy = codeElement ? codeElement.innerText : pre.innerText;
        navigator.clipboard.writeText(textToCopy);

        btn.innerHTML = `
          <svg class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span class="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 ml-1">Đã chép!</span>
        `;
        setTimeout(() => {
          btn.innerHTML = `
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
            </svg>
            <span class="text-[11px] font-medium ml-1">Chép</span>
          `;
        }, 2000);
      });

      pre.appendChild(btn);
    });
  }, [htmlContent, viewMode]);

  const handleCopyAll = () => {
    if (!activeMarkdown) return;
    navigator.clipboard.writeText(activeMarkdown);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
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
            {contentSource === 'original' ? 'Bản gốc GitHub' : 'Tiếng Việt'}
          </span>
          {toolName && (
            <span className="hidden md:inline-block text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate max-w-[280px]">
              • {toolName}
            </span>
          )}
        </div>

        {/* CÁC THAO TÁC CÔNG CỤ */}
        <div className="flex items-center space-x-2">
          {/* Chọn nguồn nội dung: tiếng Việt hoặc README gốc trên GitHub */}
          {githubSource && (
            <div className="flex items-center bg-slate-200/70 dark:bg-slate-800 p-0.5 rounded-lg text-xs font-semibold">
              <button
                type="button"
                onClick={() => setContentSource('vi')}
                className={`flex items-center space-x-1 px-2.5 py-1 rounded-md transition-all ${
                  contentSource === 'vi'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="README tiếng Việt do AI HUB biên soạn"
              >
                <Languages className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Tiếng Việt</span>
              </button>
              <button
                type="button"
                onClick={showOriginal}
                className={`flex items-center space-x-1 px-2.5 py-1 rounded-md transition-all ${
                  contentSource === 'original'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="README gốc đọc trực tiếp từ GitHub, hiển thị như trên GitHub"
              >
                <FolderGit2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Bản gốc GitHub</span>
              </button>
            </div>
          )}

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

          {/* Nút Sao chép toàn bộ README */}
          <button
            type="button"
            onClick={handleCopyAll}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-xs transition-colors"
            title="Sao chép toàn bộ mã nguồn Markdown"
          >
            {copiedAll ? (
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
              href={contentSource === 'original' && original.status === 'ready' ? original.fileUrl : sourceUrl}
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

      {/* NỘI DUNG README HIỂN THỊ CHUẨN GITHUB (KHÔNG BỊ PHA TRỘN SƠ ĐỒ) */}
      <div className="p-6 sm:p-8 lg:p-10 overflow-x-auto">
        {contentSource === 'original' && original.status === 'loading' && (
          <div className="flex items-center justify-center space-x-2 py-16 text-sm text-slate-500">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Đang đọc README từ GitHub...</span>
          </div>
        )}
        {contentSource === 'original' && original.status === 'error' && (
          <div className="py-10 text-center space-y-3 text-sm text-slate-600 dark:text-slate-400">
            <p>{original.message}</p>
            <button type="button" onClick={loadOriginal} className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800">
              Thử lại
            </button>
          </div>
        )}
        {(contentSource === 'vi' || original.status === 'ready') && (viewMode === 'preview' ? (
          <div
            ref={containerRef}
            onClick={handleContentClick}
            className="github-markdown-body"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        ) : (
          <div className="p-4 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed font-mono">
            {activeMarkdown}
          </div>
        ))}
      </div>

      {/* CHÂN KHUNG THÔNG TIN GITHUB */}
      <div className="px-6 py-2.5 bg-slate-50/70 dark:bg-slate-850/60 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
        <span>
          {contentSource === 'original'
            ? 'README gốc đọc trực tiếp từ GitHub, hiển thị như trên GitHub'
            : 'README tiếng Việt do AI HUB biên soạn, hiển thị theo giao diện GitHub'}
        </span>
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
