import React, { useState, useMemo, useRef, useEffect } from 'react';
import { marked } from 'marked';
import { FileText, Copy, Check, ExternalLink, Code2, Eye, GitBranch, ArrowRight, CheckCircle2, Shield, Rocket, Layers } from 'lucide-react';

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
  const [copiedAll, setCopiedAll] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Cấu hình marked để sinh HTML an toàn và đúng chuẩn GitHub Flavored Markdown
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

  // Nhận diện xem tài nguyên có cần hiển thị sơ đồ Diagram trực quan đặc thù hay không
  const isVibeCoding = useMemo(() => {
    return markdown.includes('01. Xác định ý tưởng') && markdown.includes('13. Vận hành');
  }, [markdown]);

  const isJobSearch = useMemo(() => {
    return markdown.includes('/setup') && markdown.includes('/scrape') && markdown.includes('/apply');
  }, [markdown]);

  const isPaperclip = useMemo(() => {
    return markdown.includes('Paperclip') && markdown.includes('Control Plane');
  }, [markdown]);

  // Tự động gắn nút Copy chuẩn phong cách GitHub cho tất cả các thẻ <pre> code block
  useEffect(() => {
    if (!containerRef.current || viewMode !== 'preview') return;

    const preElements = containerRef.current.querySelectorAll('pre');
    preElements.forEach((pre) => {
      // Tránh gắn trùng lặp nếu đã có nút copy
      if (pre.querySelector('.github-code-copy-btn')) return;

      pre.classList.add('relative', 'group');

      const btn = document.createElement('button');
      btn.className = 'github-code-copy-btn absolute top-2.5 right-2.5 p-1.5 rounded-md bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-700 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-xs transition-all flex items-center space-x-1 text-xs opacity-75 group-hover:opacity-100';
      btn.title = 'Sao chép đoạn mã (Copy code)';
      btn.innerHTML = `
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
        </svg>
      `;

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const codeElement = pre.querySelector('code');
        const textToCopy = codeElement ? codeElement.innerText : pre.innerText;
        navigator.clipboard.writeText(textToCopy);

        btn.innerHTML = `
          <svg class="w-3.5 h-3.5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        `;
        setTimeout(() => {
          btn.innerHTML = `
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
            </svg>
          `;
        }, 2000);
      });

      pre.appendChild(btn);
    });
  }, [htmlContent, viewMode]);

  const handleCopyAll = () => {
    if (!markdown) return;
    navigator.clipboard.writeText(markdown);
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

      {/* SƠ ĐỒ TRỰC QUAN DIAGRAM (VẼ THÊM ĐỂ DỄ HIỂU HƠN THEO YÊU CẦU NGƯỜI DÙNG) */}
      {viewMode === 'preview' && isVibeCoding && (
        <div className="m-6 sm:m-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-indigo-50/70 via-blue-50/40 to-slate-50 dark:from-slate-850 dark:via-indigo-950/20 dark:to-slate-900 border border-indigo-100 dark:border-indigo-900/40 shadow-xs">
          <div className="flex items-center space-x-2 text-indigo-700 dark:text-indigo-300 font-bold text-sm mb-4">
            <GitBranch className="w-4 h-4" />
            <span>Sơ Đồ Trực Quan: Quy Trình VibeCode 13 Giai Đoạn Chuẩn Mực</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Nhóm 1: Khảo sát & Ý tưởng */}
            <div className="p-3.5 rounded-xl bg-white/90 dark:bg-slate-800/90 border border-blue-200 dark:border-blue-900/60 shadow-xs space-y-2">
              <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block border-b pb-1">
                I. Khảo Sát & Yêu Cầu
              </span>
              <ul className="text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
                <li className="font-semibold flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span>01. Xác định ý tưởng</span>
                </li>
                <li className="font-semibold flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span>02. Xác định phạm vi</span>
                </li>
                <li className="font-semibold flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span>03. Phân tích nghiệp vụ</span>
                </li>
                <li className="font-semibold flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span>04. Đặc tả yêu cầu</span>
                </li>
              </ul>
            </div>

            {/* Nhóm 2: Thiết kế hệ thống */}
            <div className="p-3.5 rounded-xl bg-white/90 dark:bg-slate-800/90 border border-purple-200 dark:border-purple-900/60 shadow-xs space-y-2">
              <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider block border-b pb-1">
                II. Thiết Kế Hệ Thống
              </span>
              <ul className="text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
                <li className="font-semibold flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  <span>05. Thiết kế hệ thống</span>
                </li>
                <li className="font-semibold flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  <span>06. Thiết kế giao diện</span>
                </li>
                <li className="font-semibold flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  <span>07. Thiết kế dữ liệu & API</span>
                </li>
                <li className="font-semibold flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  <span>08. Chuẩn bị môi trường AI</span>
                </li>
              </ul>
            </div>

            {/* Nhóm 3: Xây dựng & Kiểm thử */}
            <div className="p-3.5 rounded-xl bg-white/90 dark:bg-slate-800/90 border border-emerald-200 dark:border-emerald-900/60 shadow-xs space-y-2">
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block border-b pb-1">
                III. Xây Dựng & Bảo Mật
              </span>
              <ul className="text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
                <li className="font-semibold flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>09. Xây dựng theo module</span>
                </li>
                <li className="font-semibold flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>10. Kiểm thử chất lượng</span>
                </li>
                <li className="font-semibold flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>11. Bảo mật hệ thống</span>
                </li>
              </ul>
            </div>

            {/* Nhóm 4: Triển khai & Bảo trì */}
            <div className="p-3.5 rounded-xl bg-white/90 dark:bg-slate-800/90 border border-amber-200 dark:border-amber-900/60 shadow-xs space-y-2">
              <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block border-b pb-1">
                IV. Triển Khai & Vận Hành
              </span>
              <ul className="text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
                <li className="font-semibold flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>12. Triển khai phát hành</span>
                </li>
                <li className="font-semibold flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>13. Vận hành & bảo trì</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* SƠ ĐỒ TRỰC QUAN CHO AI JOB SEARCH NẾU CÓ */}
      {viewMode === 'preview' && isJobSearch && (
        <div className="m-6 sm:m-8 p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center space-x-2 text-indigo-700 dark:text-indigo-300 font-bold text-sm mb-3">
            <Rocket className="w-4 h-4" />
            <span>Sơ Đồ Tự Động Hóa Quy Trình Ứng Tuyển Nhiều Tác Tử (Multi-Agent Workflow)</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border font-mono font-semibold">/setup (Hồ sơ)</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border font-mono font-semibold">/scrape (Quét tin)</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border font-mono font-semibold">/apply (May đo CV)</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 font-bold border border-indigo-200">Agent Phản Biện</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border font-mono font-semibold">Biên dịch PDF & ATS</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 font-bold border border-emerald-200">/interview (Phỏng vấn)</span>
          </div>
        </div>
      )}

      {/* NỘI DUNG README HIỂN THỊ CHUẨN GITHUB */}
      <div className="p-6 sm:p-8 lg:p-10 overflow-x-auto">
        {viewMode === 'preview' ? (
          <div 
            ref={containerRef}
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
