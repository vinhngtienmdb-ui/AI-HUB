import React, { useState, useMemo, useRef, useEffect } from 'react';
import { marked } from 'marked';
import { 
  FileText, Copy, Check, ExternalLink, Code2, Eye, GitBranch, 
  ArrowRight, ArrowDown, Layers, Compass, Layout, Cpu, ShieldCheck, 
  Rocket, Server, CheckCircle2, AlertTriangle, RotateCcw, RefreshCw,
  Users, UserCheck, ShieldAlert, Sparkles, Image as ImageIcon,
  Brain, Workflow, Boxes, HardDrive, Filter, Activity, Compass as CompassIcon
} from 'lucide-react';
import { MermaidDiagramSvgViewer } from './MermaidDiagramSvgViewer';

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
  toolId,
  toolName
}) => {
  const [viewMode, setViewMode] = useState<'preview' | 'raw'>('preview');
  
  // Tab chuyển đổi riêng cho VibeCoding
  const [vibeDiagramTab, setVibeDiagramTab] = useState<'stages' | 'governance'>('stages');
  
  // Chế độ xem sơ đồ chung (SVG chuẩn Mermaid vs Dạng thẻ Card Grid)
  const [diagramViewMode, setDiagramViewMode] = useState<'svg' | 'cards'>('svg');
  
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
    return toolId === 'vibecoding-skill-dev-lifecycle' || 
      (markdown.includes('01. Xác định ý tưởng') && markdown.includes('13. Vận hành'));
  }, [toolId, markdown]);

  const isHindsight = useMemo(() => {
    return toolId === 'vectorize-io-hindsight' || 
      markdown.includes('Hindsight') || 
      markdown.includes('Agent Memory That Learns');
  }, [toolId, markdown]);

  const isJobSearch = useMemo(() => {
    return toolId === 'mads-lorentzen-ai-job-search' || 
      (markdown.includes('/setup') && markdown.includes('/scrape') && markdown.includes('/apply'));
  }, [toolId, markdown]);

  const isPaperclip = useMemo(() => {
    return toolId === 'paperclipai-paperclip' || 
      (markdown.includes('Paperclip') && markdown.includes('Control Plane'));
  }, [toolId, markdown]);

  const isSmartGateway = useMemo(() => {
    return toolId === 'aihub-vn-smart-mcp-gateway' || 
      markdown.includes('Smart MCP Gateway') || 
      markdown.includes('mcp-gateway');
  }, [toolId, markdown]);

  const isFindSkills = useMemo(() => {
    return toolId === 'vercel-labs-find-skills' || 
      markdown.includes('Find Skills') || 
      markdown.includes('find-skills');
  }, [toolId, markdown]);

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
          {toolName && (
            <span className="hidden md:inline-block text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate max-w-[280px]">
              • {toolName}
            </span>
          )}
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

      {/* 1. SƠ ĐỒ TRỰC QUAN CHO VIBECODING SKILL (13 GIAI ĐOẠN & CỔNG CHẤT LƯỢNG) */}
      {viewMode === 'preview' && isVibeCoding && (
        <div className="m-6 sm:m-8 p-6 sm:p-7 rounded-3xl bg-slate-50/80 dark:bg-slate-850/60 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
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

          {vibeDiagramTab === 'stages' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex flex-wrap items-center justify-between gap-2 p-1.5 rounded-xl bg-slate-100/90 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
                <div className="flex items-center space-x-2 pl-2 text-slate-700 dark:text-slate-300 font-medium">
                  <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Chế độ trực quan hóa:</span>
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    type="button"
                    onClick={() => setDiagramViewMode('svg')}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
                      diagramViewMode === 'svg'
                        ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Sơ Đồ Vector SVG (Chuẩn Mẫu Mermaid)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDiagramViewMode('cards')}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
                      diagramViewMode === 'cards'
                        ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Thẻ Phân Chặng Rút Gọn (Card Grid)</span>
                  </button>
                </div>
              </div>

              {diagramViewMode === 'svg' ? (
                <MermaidDiagramSvgViewer 
                  svgUrl="/mermaid-diagram.svg"
                  title="Sơ Đồ Quy Trình VibeCode 13 Giai Đoạn & Cổng Chất Lượng"
                  subtitle="Chu trình phát triển phần mềm chuẩn mực, tích hợp cổng kiểm soát chất lượng và phương án quay lui"
                  downloadFileName="vibecode-lifecycle-diagram.svg"
                  stageCountText="13 Giai đoạn & 2 Cổng kiểm soát"
                />
              ) : (
                <div className="space-y-4 animate-fadeIn text-xs">
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-900/40">
                    <span className="font-bold text-blue-700 dark:text-blue-300 block mb-1">GIAI ĐOẠN 1: KHỞI TẠO VÀ PHÂN TÍCH (01 → 04)</span>
                    <span className="text-slate-500">Xác định ý tưởng • Xác định phạm vi • Phân tích nghiệp vụ • Đặc tả yêu cầu & Tiêu chí nghiệm thu</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900/40">
                    <span className="font-bold text-purple-700 dark:text-purple-300 block mb-1">GIAI ĐOẠN 2: THIẾT KẾ KỸ THUẬT VÀ DỮ LIỆU (05 → 08)</span>
                    <span className="text-slate-500">Thiết kế hệ thống & công nghệ • Thiết kế giao diện • Thiết kế cơ sở dữ liệu & API • Môi trường AI</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/40">
                    <span className="font-bold text-emerald-700 dark:text-emerald-300 block mb-1">GIAI ĐOẠN 3: XÂY DỰNG VÀ KIỂM THỬ (09 → 10)</span>
                    <span className="text-slate-500">Xây dựng theo từng Task nhỏ • Kiểm thử đa tầng và hồi quy</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/40">
                    <span className="font-bold text-rose-700 dark:text-rose-300 block mb-1">GIAI ĐOẠN 4: BẢO MẬT, TRIỂN KHAI VÀ BẢO TRÌ (11 → 13)</span>
                    <span className="text-slate-500">Bảo mật hệ thống • Cổng QG1 • Triển khai phát hành (Deploy) • Cổng QG2 • Rollback • Vận hành & Bảo trì</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {vibeDiagramTab === 'governance' && (
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 animate-fadeIn text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/60">
                  <span className="font-bold text-indigo-700 dark:text-indigo-300 block mb-2">TRÁCH NHIỆM CỦA CON NGƯỜI (HUMAN)</span>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Quyết định mục tiêu, phạm vi sản phẩm, quy tắc nghiệp vụ, quyền hạn người dùng và phê duyệt các cổng chất lượng.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60">
                  <span className="font-bold text-emerald-700 dark:text-emerald-300 block mb-2">TRÁCH NHIỆM CỦA TRÍ TUỆ NHÂN TẠO (AI)</span>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Hỗ trợ phân tích, đề xuất giải pháp, lập trình mã nguồn sạch, kiểm thử đa tầng và lập tài liệu kỹ thuật chi tiết.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. SƠ ĐỒ TRỰC QUAN CHO HINDSIGHT (BỘ NHỚ DÀI HẠN PHỎNG SINH HỌC 5 TẦNG) */}
      {viewMode === 'preview' && isHindsight && (
        <div className="m-6 sm:m-8 p-6 sm:p-7 rounded-3xl bg-slate-50/80 dark:bg-slate-850/60 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-3">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <Brain className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                  Kiến Trúc Nhận Thức 5 Tầng Phỏng Sinh Học Hindsight
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Chu trình tiếp nhận (Retain) → Lưu trữ 3 lớp → Truy hồi đa chiều (Recall) → Tự suy ngẫm (Reflect)
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1 p-1 bg-slate-200/80 dark:bg-slate-800 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setDiagramViewMode('svg')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  diagramViewMode === 'svg'
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Sơ Đồ Vector SVG</span>
              </button>
              <button
                type="button"
                onClick={() => setDiagramViewMode('cards')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  diagramViewMode === 'cards'
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Thẻ Rút Gọn</span>
              </button>
            </div>
          </div>

          {diagramViewMode === 'svg' ? (
            <MermaidDiagramSvgViewer 
              svgUrl="/hindsight-diagram.svg"
              title="Kiến Trúc Bộ Nhớ Phỏng Sinh Học Hindsight Cho Tác Tử AI"
              subtitle="Quy trình 5 tầng: Tiếp nhận (Retain) → Lưu trữ 3 lớp → Truy hồi đa chiều (Recall) → Tự suy ngẫm (Reflect)"
              downloadFileName="hindsight-architecture-diagram.svg"
              stageCountText="5 Tầng Nhận Thức Phỏng Sinh Học"
            />
          ) : (
            <div className="space-y-4 animate-fadeIn text-xs">
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-slate-800 dark:text-slate-100 block mb-1">TẦNG 1: DÒNG TƯƠNG TÁC ĐẦU VÀO</span>
                <span className="text-slate-500">Hội thoại người dùng • Hành động tác tử • Phản hồi môi trường & runtime logs</span>
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-900/40">
                <span className="font-bold text-indigo-700 dark:text-indigo-300 block mb-1">TẦNG 2: ĐỘNG CƠ TIẾP NHẬN (RETAIN ENGINE)</span>
                <span className="text-slate-500">Trích xuất quan sát • Lọc nhiễu & khử trùng bảo mật • Chấm điểm tầm quan trọng (Salience 0.0 - 1.0)</span>
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-900/40">
                <span className="font-bold text-blue-700 dark:text-blue-300 block mb-1">TẦNG 3: LƯU TRỮ PHỎNG SINH HỌC 3 LỚP</span>
                <span className="text-slate-500">Semantic Facts (Sự thật bất biến) • Episodic Memory (Ký ức sự kiện & lịch sử lỗi) • World View (Thế giới quan & sở thích)</span>
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/40">
                <span className="font-bold text-amber-700 dark:text-amber-300 block mb-1">TẦNG 4: ĐỘNG CƠ TRUY HỒI ĐA CHIỀU (RECALL ENGINE)</span>
                <span className="text-slate-500">Cân bằng 4 trọng số: Độ mới (Recency) + Tương đồng ngữ nghĩa (Relevance) + Tầm quan trọng + Tần suất củng cố</span>
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/40">
                <span className="font-bold text-emerald-700 dark:text-emerald-300 block mb-1">TẦNG 5: TỰ SUY NGẪM & TIẾN HÓA (REFLECT ENGINE)</span>
                <span className="text-slate-500">Tự suy ngẫm sau nhiệm vụ • Củng cố kinh nghiệm tốt & làm mờ thông tin suy thoái • Tối ưu hóa hành động tương lai</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. SƠ ĐỒ TRỰC QUAN CHO AI JOB SEARCH (6 BƯỚC TỰ ĐỘNG HÓA PIPELINE) */}
      {viewMode === 'preview' && isJobSearch && (
        <div className="m-6 sm:m-8 p-6 sm:p-7 rounded-3xl bg-slate-50/80 dark:bg-slate-850/60 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-3">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <Rocket className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                  Quy Trình Tự Động Hóa Săn Việc Đa Tác Tử (AI Job Search Pipeline)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Chuỗi phối hợp tác tử 6 bước: /setup → /scrape → /apply & Critic Agent → Biên dịch ATS → /interview → /rank
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1 p-1 bg-slate-200/80 dark:bg-slate-800 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setDiagramViewMode('svg')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  diagramViewMode === 'svg'
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Sơ Đồ Vector SVG</span>
              </button>
              <button
                type="button"
                onClick={() => setDiagramViewMode('cards')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  diagramViewMode === 'cards'
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Thẻ Rút Gọn</span>
              </button>
            </div>
          </div>

          {diagramViewMode === 'svg' ? (
            <MermaidDiagramSvgViewer 
              svgUrl="/job-search-diagram.svg"
              title="Quy Trình Săn Việc Tự Động Hóa Đa Tác Tử (AI Job Search)"
              subtitle="Chuỗi 6 bước khép kín tích hợp Critic Agent và Cổng kiểm soát chất lượng chuẩn ATS"
              downloadFileName="ai-job-search-pipeline-diagram.svg"
              stageCountText="6 Bước Khép Kín & 2 Cổng Thẩm Định"
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 animate-fadeIn text-xs">
              <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-indigo-600 dark:text-indigo-400 block mb-1">1. /setup (Hồ sơ)</span>
                <span className="text-slate-500">Nạp CV gốc, kỹ năng cốt lõi & tiêu chí vị trí mục tiêu</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-indigo-600 dark:text-indigo-400 block mb-1">2. /scrape (Quét tin)</span>
                <span className="text-slate-500">Thu thập và bóc tách cấu trúc yêu cầu JD đa nền tảng</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-indigo-600 dark:text-indigo-400 block mb-1">3. /apply & Critic Agent</span>
                <span className="text-slate-500">May đo CV, tạo Cover Letter và thẩm định phản biện</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-indigo-600 dark:text-indigo-400 block mb-1">4. Biên dịch PDF & ATS</span>
                <span className="text-slate-500">Xuất PDF chuẩn máy quét ATS đạt điểm tương thích ≥ 85%</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-indigo-600 dark:text-indigo-400 block mb-1">5. /interview (Mô phỏng)</span>
                <span className="text-slate-500">Huấn luyện phỏng vấn 1-1 với câu trả lời chuẩn khung STAR</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-indigo-600 dark:text-indigo-400 block mb-1">6. /rank (Theo dõi)</span>
                <span className="text-slate-500">Xếp hạng cơ hội tiềm năng & quản lý toàn bộ vòng tuyển dụng</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. SƠ ĐỒ TRỰC QUAN CHO PAPERCLIP (QUẢN TRỊ TÁC TỬ DOANH NGHIỆP) */}
      {viewMode === 'preview' && isPaperclip && (
        <div className="m-6 sm:m-8 p-6 sm:p-7 rounded-3xl bg-slate-50/80 dark:bg-slate-850/60 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-3">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <Boxes className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                  Kiến Trúc Quản Trị & Điều Phối Lực Lượng Tác Tử Paperclip
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Mặt phẳng điều khiển (Control Plane), sơ đồ phân cấp tổ chức, kiểm soát ngân sách & Human Approval Gate
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1 p-1 bg-slate-200/80 dark:bg-slate-800 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setDiagramViewMode('svg')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  diagramViewMode === 'svg'
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Sơ Đồ Vector SVG</span>
              </button>
              <button
                type="button"
                onClick={() => setDiagramViewMode('cards')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  diagramViewMode === 'cards'
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Thẻ Rút Gọn</span>
              </button>
            </div>
          </div>

          {diagramViewMode === 'svg' ? (
            <MermaidDiagramSvgViewer 
              svgUrl="/paperclip-diagram.svg"
              title="Kiến Trúc Quản Trị & Điều Phối Tác Tử Doanh Nghiệp Paperclip"
              subtitle="Mặt phẳng điều khiển (Control Plane), sơ đồ phân cấp tổ chức, kiểm soát ngân sách thời gian thực & Human Approval Gate"
              downloadFileName="paperclip-agent-governance-diagram.svg"
              stageCountText="5 Tầng Quản Trị & Cổng Phê Duyệt Con Người"
            />
          ) : (
            <div className="space-y-4 animate-fadeIn text-xs">
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-slate-800 dark:text-slate-100 block mb-1">TẦNG 1: QUẢN TRỊ CON NGƯỜI (HUMAN GOVERNANCE)</span>
                <span className="text-slate-500">Ban điều hành con người thiết lập mục tiêu chiến lược, hạn mức chi phí và ngân sách tối đa</span>
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-900/40">
                <span className="font-bold text-indigo-700 dark:text-indigo-300 block mb-1">TẦNG 2: MẶT PHẲNG ĐIỀU KHIỂN (CONTROL PLANE)</span>
                <span className="text-slate-500">Sơ đồ tổ chức phân cấp (Agent Org Chart) • Điều phối hàng đợi nhiệm vụ • Kiểm soát ngân sách thời gian thực</span>
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-900/40">
                <span className="font-bold text-blue-700 dark:text-blue-300 block mb-1">TẦNG 3: BIỆT ĐỘI TÁC TỬ THỰC THI (AGENT WORKFORCE)</span>
                <span className="text-slate-500">Planner Agent (Kế hoạch) • Coder Agent (Lập trình) • QA & Test Agent (Kiểm thử) • Security Agent (Bảo mật)</span>
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/40">
                <span className="font-bold text-rose-700 dark:text-rose-300 block mb-1">TẦNG 4: GIÁM SÁT AN TOÀN & CỔNG PHÊ DUYỆT CON NGƯỜI</span>
                <span className="text-slate-500">Cổng kiểm soát rủi ro QG1 • Human Approval Gate khi vượt hạn mức • Nhật ký kiểm toán bất biến (Immutable Audit Trail)</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 5. SƠ ĐỒ TRỰC QUAN CHO SMART MCP GATEWAY */}
      {viewMode === 'preview' && isSmartGateway && (
        <div className="m-6 sm:m-8 p-6 sm:p-7 rounded-3xl bg-slate-50/80 dark:bg-slate-850/60 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-3">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <Server className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                  Kiến Trúc AI HUB VN Smart MCP Gateway
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Cơ chế phân loại ý định, định tuyến thông minh & nén 95% Context Window qua giao thức Model Context Protocol
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1 p-1 bg-slate-200/80 dark:bg-slate-800 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setDiagramViewMode('svg')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  diagramViewMode === 'svg'
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Sơ Đồ Vector SVG</span>
              </button>
              <button
                type="button"
                onClick={() => setDiagramViewMode('cards')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  diagramViewMode === 'cards'
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Thẻ Rút Gọn</span>
              </button>
            </div>
          </div>

          {diagramViewMode === 'svg' ? (
            <MermaidDiagramSvgViewer 
              svgUrl="/smart-gateway-diagram.svg"
              title="Kiến Trúc Máy Chủ Trung Gian AI HUB VN Smart MCP Gateway"
              subtitle="Cơ chế phân loại ý định, định tuyến thông minh & nén ngữ cảnh tiết kiệm 95% Context Window"
              downloadFileName="smart-mcp-gateway-diagram.svg"
              stageCountText="4 Tầng Định Tuyến & Tối Ưu Ngữ Cảnh"
            />
          ) : (
            <div className="space-y-4 animate-fadeIn text-xs">
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-slate-800 dark:text-slate-100 block mb-1">TẦNG 1: TIẾP NHẬN YÊU CẦU TỪ TÁC TỬ (AGENT INTERACTION)</span>
                <span className="text-slate-500">Nhận lời gọi từ Antigravity, Claude Code, Cursor, Windsurf và bóc tách ngữ cảnh mục tiêu</span>
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-900/40">
                <span className="font-bold text-indigo-700 dark:text-indigo-300 block mb-1">TẦNG 2: PHÂN LOẠI Ý ĐỊNH & ĐỊNH TUYẾN THÔNG MINH</span>
                <span className="text-slate-500">Phân loại nhu cầu năng lực: Database, Filesystem & Git, Bộ nhớ dài hạn (Hindsight), Thanh toán VN</span>
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/40">
                <span className="font-bold text-emerald-700 dark:text-emerald-300 block mb-1">TẦNG 3: BỘ NÉN NGỮ CẢNH 95% (CONTEXT WINDOW OPTIMIZER)</span>
                <span className="text-slate-500">Cắt tỉa lược đồ (Schema Pruning) • Nạp động theo nhu cầu • Giảm từ 150.000 Tokens xuống chỉ còn 3.500 Tokens</span>
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-900/40">
                <span className="font-bold text-blue-700 dark:text-blue-300 block mb-1">TẦNG 4: THỰC THI & TỔNG HỢP KẾT QUẢ</span>
                <span className="text-slate-500">Thực thi chuẩn JSON-RPC qua Stdio / SSE / WebSockets • Cô đọng kết quả và phản hồi trực tiếp cho tác tử</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 6. SƠ ĐỒ TRỰC QUAN CHO FIND SKILLS */}
      {viewMode === 'preview' && isFindSkills && (
        <div className="m-6 sm:m-8 p-6 sm:p-7 rounded-3xl bg-slate-50/80 dark:bg-slate-850/60 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-3">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <Workflow className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                  Quy Trình Khám Phá & Nạp Động Kỹ Năng Tác Tử (Find Skills Pipeline)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Tự động phát hiện khoảng trống kỹ năng từ Prompt, đối sánh vector ngữ nghĩa, kiểm định an toàn và tiêm động
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1 p-1 bg-slate-200/80 dark:bg-slate-800 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setDiagramViewMode('svg')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  diagramViewMode === 'svg'
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Sơ Đồ Vector SVG</span>
              </button>
              <button
                type="button"
                onClick={() => setDiagramViewMode('cards')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  diagramViewMode === 'cards'
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Thẻ Rút Gọn</span>
              </button>
            </div>
          </div>

          {diagramViewMode === 'svg' ? (
            <MermaidDiagramSvgViewer 
              svgUrl="/find-skills-diagram.svg"
              title="Quy Trình Khám Phá & Nạp Động Kỹ Năng Tác Tử (Find Skills)"
              subtitle="Khám phá kỹ năng tự động từ Prompt người dùng, kiểm định an toàn và nạp tức thì vào ngữ cảnh tác tử"
              downloadFileName="find-skills-pipeline-diagram.svg"
              stageCountText="4 Tầng Khám Phá & Nạp Tức Thì"
            />
          ) : (
            <div className="space-y-4 animate-fadeIn text-xs">
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-slate-800 dark:text-slate-100 block mb-1">TẦNG 1: NHẬN DIỆN KHOẢNG TRỐNG KỸ NĂNG</span>
                <span className="text-slate-500">Phân tích Prompt & nhận diện nhu cầu chuyên môn chưa có trong cấu hình hiện tại</span>
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-900/40">
                <span className="font-bold text-indigo-700 dark:text-indigo-300 block mb-1">TẦNG 2: TÌM KIẾM NGỮ NGHĨA TRONG KHO SKILLS</span>
                <span className="text-slate-500">Truy vấn chỉ mục hơn 200+ bộ kỹ năng toàn cầu và đối sánh vector độ tương đồng</span>
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/40">
                <span className="font-bold text-amber-700 dark:text-amber-300 block mb-1">TẦNG 3: CỔNG KIỂM SOÁT AN TOÀN QG1</span>
                <span className="text-slate-500">Kiểm tra mã độc, quyền hạn truy cập tài nguyên và tính hợp lệ của giấy phép mã nguồn mở</span>
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/40">
                <span className="font-bold text-emerald-700 dark:text-emerald-300 block mb-1">TẦNG 4: NẠP ĐỘNG & KÍCH HOẠT VÀO TÁC TỬ</span>
                <span className="text-slate-500">Tiêm chỉ dẫn SKILL.md vào System Prompt và nạp tức thì công cụ mà không cần khởi động lại</span>
              </div>
            </div>
          )}
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
