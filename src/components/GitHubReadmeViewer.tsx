import React, { useState, useMemo, useRef, useEffect } from 'react';
import { marked } from 'marked';
import { 
  FileText, Copy, Check, ExternalLink, Code2, Eye, GitBranch, 
  ArrowRight, ArrowDown, Layers, Compass, Layout, Cpu, ShieldCheck, 
  Rocket, Server, CheckCircle2, AlertTriangle, RotateCcw, RefreshCw,
  Users, UserCheck, ShieldAlert
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
  const [vibeDiagramTab, setVibeDiagramTab] = useState<'stages' | 'governance'>('stages');
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

      {/* SƠ ĐỒ TRỰC QUAN FLOWCHART CHUẨN VIBECODE TỪ PHIÊN LÀM VIỆC CỐT LÕI (GIAO DIỆN SÁNG, TINH TẾ) */}
      {viewMode === 'preview' && isVibeCoding && (
        <div className="m-6 sm:m-8 p-6 sm:p-7 rounded-3xl bg-slate-50/80 dark:bg-slate-850/60 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          
          {/* Header của Flowchart */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-3">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <GitBranch className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                  Sơ Đồ Trực Quan VibeCode Chuẩn Mực
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Chu trình phát triển phần mềm chuẩn mực, tích hợp cổng kiểm soát chất lượng và phân luồng trách nhiệm
                </p>
              </div>
            </div>

            {/* Bộ chuyển đổi giữa 2 sơ đồ cốt lõi */}
            <div className="flex items-center bg-slate-200/80 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setVibeDiagramTab('stages')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  vibeDiagramTab === 'stages'
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>13 Giai Đoạn & Cổng Chất Lượng</span>
              </button>
              <button
                type="button"
                onClick={() => setVibeDiagramTab('governance')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  vibeDiagramTab === 'governance'
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Mô Hình Quản Lý & Trách Nhiệm</span>
              </button>
            </div>
          </div>

          {/* SƠ ĐỒ 1: 13 GIAI ĐOẠN VÀ CÁC CỔNG KIỂM SOÁT CHẤT LƯỢNG (QUALITY GATES) */}
          {vibeDiagramTab === 'stages' && (
            <div className="space-y-5 animate-fadeIn">
              
              {/* CHẶNG 1: KHỞI TẠO & PHÂN TÍCH */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-blue-200/80 dark:border-blue-900/40 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 flex items-center justify-center text-xs font-black">
                      I
                    </span>
                    <span className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider">
                      Giai Đoạn 1: Khởi Tạo Và Phân Tích
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">Giai đoạn 01 → 04</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  {[
                    { step: '01', name: 'Xác định ý tưởng', file: '01_TONG_QUAN_DU_AN.md' },
                    { step: '02', name: 'Xác định phạm vi', file: '02_PHAM_VI_DU_AN.md', hasFeedback: true },
                    { step: '03', name: 'Phân tích nghiệp vụ', file: '03-06_LUONG_NGHIEP_VU.md' },
                    { step: '04', name: 'Đặc tả yêu cầu & Nghiệm thu', file: '07_YEU_CAU & 08_NGHIEM_THU.md' }
                  ].map((item, idx) => (
                    <div key={idx} className="relative p-3 rounded-xl bg-slate-50/70 dark:bg-slate-850 border border-slate-200/60 dark:border-slate-800 hover:border-blue-300 transition-all">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-2">
                          <span className="w-5 h-5 rounded-md bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                            {item.step}
                          </span>
                          <span className="font-bold text-xs text-slate-800 dark:text-slate-100">
                            {item.name}
                          </span>
                        </div>
                        {item.hasFeedback && (
                          <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800" title="Điểm tiếp nhận yêu cầu phản hồi từ vận hành">
                            Điểm phản hồi
                          </span>
                        )}
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

              {/* CHẶNG 2: THIẾT KẾ KỸ THUẬT VÀ DỮ LIỆU */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-purple-200/80 dark:border-purple-900/40 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 flex items-center justify-center text-xs font-black">
                      II
                    </span>
                    <span className="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider">
                      Giai Đoạn 2: Thiết Kế Kỹ Thuật Và Dữ Liệu
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">Giai đoạn 05 → 08</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  {[
                    { step: '05', name: 'Thiết kế hệ thống & Công nghệ', file: '09_KIEN_TRUC & 10_CONG_NGHE.md' },
                    { step: '06', name: 'Thiết kế giao diện (UI/UX)', file: '11_GIAO_DIEN & 12_QUY_CHUAN.md' },
                    { step: '07', name: 'Thiết kế cơ sở dữ liệu & API', file: '13_CO_SO_DU_LIEU & 14_API.md' },
                    { step: '08', name: 'Chuẩn bị môi trường AI', file: '15, 16, index.md, 23, 24' }
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

              {/* CHẶNG 3: XÂY DỰNG VÀ KIỂM THỬ */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-200/80 dark:border-emerald-900/40 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-xs font-black">
                      III
                    </span>
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
                      Giai Đoạn 3: Xây Dựng Và Kiểm Thử Từng Bước Nhỏ
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">Giai đoạn 09 → 10</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="relative p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-850 border border-slate-200/60 dark:border-slate-800 hover:border-emerald-300 transition-all">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center space-x-2">
                        <span className="w-5 h-5 rounded-md bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                          09
                        </span>
                        <span className="font-bold text-xs text-slate-800 dark:text-slate-100">
                          Xây dựng theo từng nhiệm vụ nhỏ (Module)
                        </span>
                      </div>
                      <span className="text-[9px] font-semibold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                        Điểm sửa lỗi & Rollback
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 block">
                      Mã nguồn • Migration • Kiểm thử đơn vị (Unit Test)
                    </span>
                  </div>

                  <div className="relative p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-850 border border-slate-200/60 dark:border-slate-800 hover:border-emerald-300 transition-all">
                    <div className="flex items-center space-x-2 mb-1.5">
                      <span className="w-5 h-5 rounded-md bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                        10
                      </span>
                      <span className="font-bold text-xs text-slate-800 dark:text-slate-100">
                        Kiểm thử đa tầng và hồi quy
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 block">
                      17_KE_HOACH_KIEM_THU.md • 18_KICH_BAN_KIEM_THU.md
                    </span>
                  </div>
                </div>
              </div>

              {/* Mũi tên chuyển tiếp */}
              <div className="flex justify-center text-slate-400">
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </div>

              {/* CHẶNG 4: BẢO MẬT, TRIỂN KHAI VÀ BẢO TRÌ (KÈM 2 CỔNG CHẤT LƯỢNG VÀ NHÁNH ROLLBACK) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-rose-200/80 dark:border-rose-900/40 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 flex items-center justify-center text-xs font-black">
                      IV
                    </span>
                    <span className="text-xs font-bold text-rose-700 dark:text-rose-300 uppercase tracking-wider">
                      Giai Đoạn 4: Bảo Mật, Triển Khai & Bảo Trì (Kèm Cổng Chất Lượng)
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">Giai đoạn 11 → 13</span>
                </div>

                <div className="space-y-3.5">
                  
                  {/* Bước 11: Bảo mật */}
                  <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-850 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <span className="w-5 h-5 rounded-md bg-rose-600 text-white flex items-center justify-center text-[10px] font-bold">
                        11
                      </span>
                      <div>
                        <span className="font-bold text-xs text-slate-800 dark:text-slate-100 block">
                          11. Bảo mật hệ thống - Security
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          Xác thực • Phân quyền • Mã hóa dữ liệu • Quét lỗ hổng (19_AN_TOAN_BAO_MAT.md)
                        </span>
                      </div>
                    </div>
                    <ArrowDown className="w-4 h-4 text-slate-400 hidden sm:block" />
                  </div>

                  {/* CỔNG KIỂM TRA BẢO MẬT QG1 (HÌNH THOI / QUYẾT ĐỊNH) */}
                  <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-300/80 dark:border-amber-800 flex flex-col md:flex-row md:items-center justify-between gap-2.5 text-xs">
                    <div className="flex items-center space-x-2">
                      <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                      <span className="font-bold text-amber-900 dark:text-amber-200">
                        Cổng Kiểm Tra Bảo Mật (QG1): Đạt chuẩn không có lỗ hổng?
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border border-rose-200 text-[11px] font-semibold">
                        <RotateCcw className="w-3 h-3" />
                        <span>Không đạt → Quay về Giai đoạn 09</span>
                      </span>
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 text-[11px] font-semibold">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Đạt chuẩn → Chuyển sang 12</span>
                      </span>
                    </div>
                  </div>

                  {/* Bước 12: Triển khai phát hành */}
                  <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-850 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <span className="w-5 h-5 rounded-md bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold">
                        12
                      </span>
                      <div>
                        <span className="font-bold text-xs text-slate-800 dark:text-slate-100 block">
                          12. Triển khai phát hành - Deploy
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          Đóng gói Build • Cấu hình môi trường • CI/CD • Rollback Plan (20_QUY_TRINH_TRIEN_KHAI.md)
                        </span>
                      </div>
                    </div>
                    <ArrowDown className="w-4 h-4 text-slate-400 hidden sm:block" />
                  </div>

                  {/* CỔNG NGHIỆM THU PHÁT HÀNH QG2 (HÌNH THOI / QUYẾT ĐỊNH) */}
                  <div className="p-3 rounded-xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-300/80 dark:border-purple-800 flex flex-col md:flex-row md:items-center justify-between gap-2.5 text-xs">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                      <span className="font-bold text-purple-900 dark:text-purple-200">
                        Cổng Nghiệm Thu Phát Hành (QG2): Vượt qua Smoke Test & Kiểm tra sức khỏe?
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border border-rose-200 text-[11px] font-semibold" title="Kích hoạt Rollback về phiên bản an toàn rồi quay lại sửa tại G09">
                        <RotateCcw className="w-3 h-3" />
                        <span>Sự cố → Rollback an toàn → Về G09</span>
                      </span>
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 text-[11px] font-semibold">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Thành công → Chuyển sang 13</span>
                      </span>
                    </div>
                  </div>

                  {/* Bước 13: Vận hành và bảo trì */}
                  <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-850 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <span className="w-5 h-5 rounded-md bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                        13
                      </span>
                      <div>
                        <span className="font-bold text-xs text-slate-800 dark:text-slate-100 block">
                          13. Vận hành và bảo trì - Maintenance
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          Giám sát Monitoring • Ghi log tập trung • Sao lưu Backup định kỳ (21_KE_HOACH_BAO_TRI.md)
                        </span>
                      </div>
                    </div>
                    <span className="text-emerald-600 text-xs font-bold hidden sm:inline-block">Đang vận hành</span>
                  </div>

                  {/* VÒNG LẶP PHẢN HỒI (FEEDBACK LOOP) */}
                  <div className="p-3 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <RefreshCw className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300">
                        <strong className="text-blue-700 dark:text-blue-300 font-bold">Vòng Lặp Phản Hồi (Feedback):</strong> Yêu cầu phát sinh mới hoặc phản hồi lỗi vận hành
                      </span>
                    </div>
                    <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-blue-700 dark:text-blue-300">
                      <span>Quay lại Giai đoạn 02 (Xác định phạm vi)</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>

                </div>
              </div>

            </div>
          )}

          {/* SƠ ĐỒ 2: MÔ HÌNH QUẢN LÝ VÀ PHÂN LUỒNG TRÁCH NHIỆM (GOVERNANCE WORKFLOW) */}
          {vibeDiagramTab === 'governance' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-indigo-200/80 dark:border-indigo-900/40 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <UserCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">
                      Mô Hình Quản Trị Trách Nhiệm: Con Người Quyết Định & AI Thực Thi
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">10 Điểm Chuyển Tiếp Khép Kín</span>
                </div>

                {/* Luồng trách nhiệm theo từng nút bước */}
                <div className="flex flex-col space-y-2 text-xs">
                  
                  {/* Cấp độ 1: Khởi nguồn */}
                  <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 flex items-center justify-between">
                    <span className="font-bold text-indigo-900 dark:text-indigo-200">
                      1. Chủ sở hữu sản phẩm (Product Owner)
                    </span>
                    <span className="text-[11px] text-slate-500">Đưa ra định hướng & bài toán kinh doanh</span>
                  </div>

                  <div className="flex justify-center text-slate-400">
                    <ArrowDown className="w-3.5 h-3.5" />
                  </div>

                  {/* Cấp độ 2: Nghiệp vụ */}
                  <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 flex items-center justify-between">
                    <span className="font-bold text-blue-900 dark:text-blue-200">
                      2. Yêu cầu nghiệp vụ (Business Requirements - BR)
                    </span>
                    <span className="text-[11px] text-slate-500">Mô hình hóa quy trình, quy tắc & vai trò người dùng</span>
                  </div>

                  <div className="flex justify-center text-slate-400">
                    <ArrowDown className="w-3.5 h-3.5" />
                  </div>

                  {/* Cấp độ 3: Đặc tả */}
                  <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 flex items-center justify-between">
                    <span className="font-bold text-purple-900 dark:text-purple-200">
                      3. Đặc tả kỹ thuật (Specification)
                    </span>
                    <span className="text-[11px] text-slate-500">Tiêu chí nghiệm thu & yêu cầu chức năng</span>
                  </div>

                  <div className="flex justify-center text-slate-400">
                    <ArrowDown className="w-3.5 h-3.5" />
                  </div>

                  {/* Cấp độ 4: Rẽ đôi song song Thiết kế UI và Kiến trúc */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <span className="font-bold text-slate-800 dark:text-slate-100 block">
                        4a. Thiết kế giao diện (UI/UX)
                      </span>
                      <span className="text-[10px] text-slate-500">Bố cục màn hình, luồng điều hướng</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <span className="font-bold text-slate-800 dark:text-slate-100 block">
                        4b. Thiết kế kiến trúc (Architecture)
                      </span>
                      <span className="text-[10px] text-slate-500">Mô hình dữ liệu, công nghệ, API</span>
                    </div>
                  </div>

                  <div className="flex justify-center text-slate-400">
                    <ArrowDown className="w-3.5 h-3.5" />
                  </div>

                  {/* Cấp độ 5: Lập trình AI */}
                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 flex items-center justify-between">
                    <span className="font-bold text-emerald-900 dark:text-emerald-200">
                      5. Lập trình mã nguồn (AI Coding theo từng Task nhỏ)
                    </span>
                    <span className="text-[11px] text-slate-500">Không suy đoán, tuân thủ nghiêm ngặt đặc tả</span>
                  </div>

                  <div className="flex justify-center text-slate-400">
                    <ArrowDown className="w-3.5 h-3.5" />
                  </div>

                  {/* Cấp độ 6: Kiểm thử & Bảo mật */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                      <span className="font-bold text-slate-800 dark:text-slate-200 block">6. Kiểm thử (Testing)</span>
                      <span className="text-[10px] text-slate-500">Đa tầng & hồi quy</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                      <span className="font-bold text-slate-800 dark:text-slate-200 block">7. Bảo mật (Security)</span>
                      <span className="text-[10px] text-slate-500">Quét lỗ hổng, phân quyền</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                      <span className="font-bold text-slate-800 dark:text-slate-200 block">8. Rà soát & Nghiệm thu</span>
                      <span className="text-[10px] text-slate-500">Con người phê duyệt</span>
                    </div>
                  </div>

                  <div className="flex justify-center text-slate-400">
                    <ArrowDown className="w-3.5 h-3.5" />
                  </div>

                  {/* Cấp độ 7: Phát hành & Vận hành */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
                      <span className="font-bold text-amber-900 dark:text-amber-200 block">
                        9. Triển khai phát hành (Deploy)
                      </span>
                      <span className="text-[10px] text-slate-500">CI/CD, kiểm tra sức khỏe, phương án rollback</span>
                    </div>
                    <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800">
                      <span className="font-bold text-teal-900 dark:text-teal-200 block">
                        10. Vận hành và bảo trì (Maintenance)
                      </span>
                      <span className="text-[10px] text-slate-500">Giám sát hiệu năng, nhật ký tập trung, sao lưu</span>
                    </div>
                  </div>

                  <div className="flex justify-center text-slate-400">
                    <ArrowDown className="w-3.5 h-3.5" />
                  </div>

                  {/* Cấp độ 8: Vòng lặp cải tiến quay lại BR */}
                  <div className="p-3 rounded-xl bg-blue-100/60 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700 flex items-center justify-between">
                    <span className="font-bold text-blue-900 dark:text-blue-100 flex items-center space-x-1.5">
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Phản hồi và cải tiến (Feedback Loop)</span>
                    </span>
                    <span className="text-[11px] font-semibold text-blue-700 dark:text-blue-300">
                      Quay trở lại Bước 2: Yêu cầu nghiệp vụ (Business Requirements)
                    </span>
                  </div>

                </div>
              </div>
            </div>
          )}

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
