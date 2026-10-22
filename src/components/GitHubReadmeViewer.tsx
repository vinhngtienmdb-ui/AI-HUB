import React, { useState, useMemo, useRef, useEffect } from 'react';
import { marked } from 'marked';
import { 
  FileText, Copy, Check, ExternalLink, Code2, Eye, GitBranch, 
  ArrowRight, ArrowDown, Layers, Compass, Layout, Cpu, ShieldCheck, 
  Rocket, Server, CheckCircle2 
} from 'lucide-react';

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

  // Nhận diện tài nguyên đặc thù
  const isVibeCoding = useMemo(() => {
    return markdown.includes('01. Xác định ý tưởng') && markdown.includes('13. Vận hành');
  }, [markdown]);

  const isJobSearch = useMemo(() => {
    return markdown.includes('/setup') && markdown.includes('/scrape') && markdown.includes('/apply');
  }, [markdown]);

  const isPaperclip = useMemo(() => {
    return markdown.includes('Paperclip') && markdown.includes('Control Plane');
  }, [markdown]);

  // Tự động gắn nút Copy chuẩn phong cách GitHub cho tất cả các thẻ <pre> code block (giao diện sáng thanh lịch)
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

      {/* SƠ ĐỒ TRỰC QUAN FLOWCHART 13 GIAI ĐOẠN VIBECODE HIỆN ĐẠI (GIAO DIỆN SÁNG, TINH TẾ) */}
      {viewMode === 'preview' && isVibeCoding && (
        <div className="m-6 sm:m-8 p-6 sm:p-7 rounded-3xl bg-slate-50/80 dark:bg-slate-850/60 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          
          {/* Header của Flowchart */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-2">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <GitBranch className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                  Sơ Đồ Trực Quan: Quy Trình VibeCode 13 Giai Đoạn Chuẩn Mực
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Chu trình phát triển phần mềm khép kín từ ý tưởng ban đầu đến vận hành & bảo trì liên tục
                </p>
              </div>
            </div>

            <span className="self-start sm:self-auto px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200/80 dark:border-indigo-800">
              4 Chặng • 13 Giai Đoạn
            </span>
          </div>

          {/* Luồng 4 Chặng Lớn Nối Tiếp Nhau */}
          <div className="space-y-5">
            
            {/* CHẶNG 1: KHỞI TẠO & ĐẶC TẢ */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-blue-200/80 dark:border-blue-900/40 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 flex items-center justify-center text-xs font-black">
                    I
                  </span>
                  <span className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider">
                    Chặng 1: Khởi Tạo Ý Tưởng & Đặc Tả Nghiệp Vụ
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">Giai đoạn 01 → 04</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {[
                  { step: '01', name: 'Xác định ý tưởng', file: '01_TONG_QUAN_DU_AN.md' },
                  { step: '02', name: 'Xác định phạm vi', file: '02_PHAM_VI_DU_AN.md' },
                  { step: '03', name: 'Phân tích nghiệp vụ', file: '03-06_NGHIEP_VU.md' },
                  { step: '04', name: 'Đặc tả yêu cầu', file: '07-08_YEU_CAU.md' }
                ].map((item, idx) => (
                  <div key={idx} className="relative p-3 rounded-xl bg-slate-50/70 dark:bg-slate-850 border border-slate-200/60 dark:border-slate-800 hover:border-blue-300 transition-all">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="w-5 h-5 rounded-md bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                        {item.step}
                      </span>
                      <span className="font-bold text-xs text-slate-800 dark:text-slate-100">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 block truncate">
                      {item.file}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mũi tên chuyển tiếp */}
            <div className="flex justify-center text-slate-400">
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </div>

            {/* CHẶNG 2: THIẾT KẾ HỆ THỐNG */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-purple-200/80 dark:border-purple-900/40 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 flex items-center justify-center text-xs font-black">
                    II
                  </span>
                  <span className="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider">
                    Chặng 2: Thiết Kế Kiến Trúc, Dữ Liệu & Môi Trường AI
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">Giai đoạn 05 → 08</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {[
                  { step: '05', name: 'Thiết kế hệ thống', file: '09-10_KIEN_TRUC.md' },
                  { step: '06', name: 'Thiết kế giao diện', file: '11-12_GIAO_DIEN.md' },
                  { step: '07', name: 'Thiết kế dữ liệu & API', file: '13-14_DATA_API.md' },
                  { step: '08', name: 'Chuẩn bị môi trường AI', file: '15-16_MOI_TRUONG.md' }
                ].map((item, idx) => (
                  <div key={idx} className="relative p-3 rounded-xl bg-slate-50/70 dark:bg-slate-850 border border-slate-200/60 dark:border-slate-800 hover:border-purple-300 transition-all">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="w-5 h-5 rounded-md bg-purple-600 text-white flex items-center justify-center text-[10px] font-bold">
                        {item.step}
                      </span>
                      <span className="font-bold text-xs text-slate-800 dark:text-slate-100">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 block truncate">
                      {item.file}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mũi tên chuyển tiếp */}
            <div className="flex justify-center text-slate-400">
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </div>

            {/* CHẶNG 3: XÂY DỰNG THEO MODULE & BẢO MẬT */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-200/80 dark:border-emerald-900/40 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-xs font-black">
                    III
                  </span>
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
                    Chặng 3: Xây Dựng Từng Bước Nhỏ, Kiểm Thử & Bảo Mật
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">Giai đoạn 09 → 11</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { step: '09', name: 'Xây dựng theo module', file: 'Chia nhỏ nhiệm vụ (Task)' },
                  { step: '10', name: 'Kiểm thử chất lượng', file: '17-18_KIEM_THU.md' },
                  { step: '11', name: 'Bảo mật hệ thống', file: '19_AN_TOAN_BAO_MAT.md' }
                ].map((item, idx) => (
                  <div key={idx} className="relative p-3 rounded-xl bg-slate-50/70 dark:bg-slate-850 border border-slate-200/60 dark:border-slate-800 hover:border-emerald-300 transition-all">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="w-5 h-5 rounded-md bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                        {item.step}
                      </span>
                      <span className="font-bold text-xs text-slate-800 dark:text-slate-100">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 block truncate">
                      {item.file}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mũi tên chuyển tiếp */}
            <div className="flex justify-center text-slate-400">
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </div>

            {/* CHẶNG 4: TRIỂN KHAI & VẬN HÀNH */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-amber-200/80 dark:border-amber-900/40 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 flex items-center justify-center text-xs font-black">
                    IV
                  </span>
                  <span className="text-xs font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider">
                    Chặng 4: Triển Khai Phát Hành, Vận Hành & Bảo Trì Định Kỳ
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">Giai đoạn 12 → 13</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { step: '12', name: 'Triển khai phát hành', file: '20_QUY_TRINH_TRIEN_KHAI.md' },
                  { step: '13', name: 'Vận hành và bảo trì', file: '21_KE_HOACH_BAO_TRI.md' }
                ].map((item, idx) => (
                  <div key={idx} className="relative p-3 rounded-xl bg-slate-50/70 dark:bg-slate-850 border border-slate-200/60 dark:border-slate-800 hover:border-amber-300 transition-all">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="w-5 h-5 rounded-md bg-amber-600 text-white flex items-center justify-center text-[10px] font-bold">
                        {item.step}
                      </span>
                      <span className="font-bold text-xs text-slate-800 dark:text-slate-100">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 block truncate">
                      {item.file}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* SƠ ĐỒ TRỰC QUAN CHO AI JOB SEARCH (GIAO DIỆN SÁNG THANH LỊCH) */}
      {viewMode === 'preview' && isJobSearch && (
        <div className="m-6 sm:m-8 p-6 rounded-3xl bg-slate-50/80 dark:bg-slate-850/60 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Rocket className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Sơ Đồ Quy Trình Tự Động Hóa Ứng Tuyển Đa Tác Tử (Multi-Agent Workflow)
              </h3>
              <p className="text-xs text-slate-500">Chuỗi phối hợp tác tử từ quét tin đến luyện phỏng vấn</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs font-semibold">
              <span className="text-indigo-600 font-mono font-bold mr-1.5">1.</span>
              <span>/setup (Hồ sơ)</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            <div className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs font-semibold">
              <span className="text-indigo-600 font-mono font-bold mr-1.5">2.</span>
              <span>/scrape (Quét tin)</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            <div className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs font-semibold">
              <span className="text-indigo-600 font-mono font-bold mr-1.5">3.</span>
              <span>/apply (May đo CV)</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            <div className="px-3.5 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 shadow-xs font-bold">
              <span>Agent Phản Biện (Thẩm định)</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            <div className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs font-semibold">
              <span>Biên dịch PDF & ATS</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            <div className="px-3.5 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 shadow-xs font-bold">
              <span>/interview (Luyện phỏng vấn)</span>
            </div>
          </div>
        </div>
      )}

      {/* NỘI DUNG README HIỂN THỊ CHUẨN GITHUB (GIAO DIỆN SÁNG THANH LỊCH) */}
      <div className="p-6 sm:p-8 lg:p-10 overflow-x-auto">
        {viewMode === 'preview' ? (
          <div 
            ref={containerRef}
            className="github-markdown-body text-slate-900 dark:text-slate-100"
            dangerouslySetInnerHTML={{ __html: htmlContent }} 
          />
        ) : (
          <div className="p-4 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed font-mono">
            {markdown}
          </div>
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
