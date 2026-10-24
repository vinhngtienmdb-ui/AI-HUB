import React, { useState } from 'react';
import { 
  ChevronRight, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  Sparkles, 
  Send,
  Clock,
  ShieldCheck,
  Code2,
  FileText,
  Wrench,
  MessageSquare
} from 'lucide-react';
import { AITool, Category, ToolType, Platform } from '../types';
import { CATEGORIES } from '../data/mockTools';

interface ContributePageProps {
  onNavigateHome: () => void;
  onSubmitSuccess: (tool: AITool) => void;
  currentUserEmail?: string | null;
  isAdmin?: boolean;
}

export const ContributePage: React.FC<ContributePageProps> = ({
  onNavigateHome,
  onSubmitSuccess,
  currentUserEmail,
  isAdmin = false,
}) => {
  const [name, setName] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [toolType, setToolType] = useState<ToolType>('agent');
  const [category, setCategory] = useState<Category>('software_development');
  const [pricingModel, setPricingModel] = useState<'free' | 'freemium' | 'paid'>('free');
  const [summaryVi, setSummaryVi] = useState('');
  const [purposeVi, setPurposeVi] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [installGuideVi, setInstallGuideVi] = useState('');
  const [usageGuideVi, setUsageGuideVi] = useState('');
  const [samplePrompt, setSamplePrompt] = useState('');
  const [jsonConfig, setJsonConfig] = useState('{\n  "mcpServers": {\n    "example": {\n      "command": "npx",\n      "args": ["-y", "example-tool"]\n    }\n  }\n}');
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(['claude_desktop', 'antigravity', 'cursor']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 13 Loại hình thành phần chuẩn hóa
  const toolTypeOptions: { value: ToolType; label: string }[] = [
    { value: 'skill', label: 'Skill (Bộ kỹ năng tác nhân AI)' },
    { value: 'agent', label: 'Agent (Tác nhân AI tự chủ)' },
    { value: 'api', label: 'API (Cổng giao tiếp lập trình & Webhook)' },
    { value: 'sdk', label: 'SDK (Bộ công cụ phát triển phần mềm)' },
    { value: 'mcp', label: 'MCP Server (Giao thức ngữ cảnh mô hình)' },
    { value: 'software', label: 'Phần mềm (Hệ thống ERP, CRM, Kế toán số)' },
    { value: 'workflow', label: 'Workflow (Quy trình tự động hóa luồng)' },
    { value: 'model', label: 'Model (Mô hình ngôn ngữ lớn, AI weights)' },
    { value: 'dataset', label: 'Dataset (Bộ dữ liệu số & ranh giới GeoJSON)' },
    { value: 'command', label: 'Command (Lệnh điều khiển dòng lệnh)' },
    { value: 'template', label: 'Template (Mẫu cấu trúc khởi tạo sẵn)' },
    { value: 'hook', label: 'Hook (Điểm móc chặn kiểm soát sự kiện)' },
    { value: 'setting', label: 'Setting (Cấu hình tham số môi trường)' },
  ];

  // 18 Lĩnh vực chuyên môn chi tiết
  const availableCategories = CATEGORIES.filter((c) => c.id !== 'all' && c.id !== 'vietnam');

  const togglePlatform = (p: Platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(p) ? (prev.length > 1 ? prev.filter((item) => item !== p) : prev) : [...prev, p]
    );
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Vui lòng nhập tên công cụ / tài nguyên.';
    if (!sourceUrl.trim() || !sourceUrl.startsWith('https://')) {
      errs.sourceUrl = 'Khối 1: Nguồn dẫn chính thức phải là URL an toàn bắt đầu bằng https:// (GitHub, GitLab hoặc Trang chủ).';
    }
    if (!purposeVi.trim() || purposeVi.trim().length < 30) {
      errs.purposeVi = 'Khối 2: Công dụng tiếng Việt chi tiết bắt buộc có độ dài tối thiểu 30 ký tự.';
    }
    if (!installGuideVi.trim()) {
      errs.installGuideVi = 'Khối 3: Vui lòng nhập hướng dẫn cài đặt từng bước bằng tiếng Việt.';
    }
    try {
      JSON.parse(jsonConfig);
    } catch {
      errs.jsonConfig = 'Khối 3: Cấu hình mẫu phải là chuỗi JSON hợp lệ.';
    }
    if (!usageGuideVi.trim()) {
      errs.usageGuideVi = 'Khối 4: Vui lòng nhập hướng dẫn sử dụng và kịch bản thực tế bằng tiếng Việt.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const typeMeta = toolTypeOptions.find((t) => t.value === toolType);
    const catMeta = availableCategories.find((c) => c.id === category);

    setTimeout(() => {
      // Nếu là Admin thì có thể duyệt ngay, nếu là thành viên thì bắt buộc pending chờ duyệt
      const initialStatus = isAdmin ? 'published' : 'pending';

      const newTool: AITool = {
        id: `contrib-${Date.now()}`,
        slug: name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''),
        name: name.trim(),
        icon: 'Sparkles',
        toolType,
        typeNameVi: typeMeta ? typeMeta.label.split(' ')[0] : 'Công cụ',
        category,
        categoryNameVi: catMeta ? catMeta.nameVi : 'Lĩnh vực công nghệ',
        platforms: selectedPlatforms,
        sourceUrl: sourceUrl.trim(),
        authorName: authorName.trim() || (currentUserEmail ? currentUserEmail.split('@')[0] : 'Cộng đồng đóng góp'),
        license: 'MIT',
        summaryVi: summaryVi.trim() || purposeVi.slice(0, 120) + '...',
        purposeVi: purposeVi.trim(),
        featuresVi: [
          'Hỗ trợ tích hợp đa nền tảng và môi trường phát triển tiêu chuẩn.',
          'Đáp ứng quy chuẩn dữ liệu 4 khối thông tin tiếng Việt hoàn chỉnh.'
        ],
        installGuideVi: installGuideVi.trim(),
        usageGuideVi: usageGuideVi.trim(),
        samplePromptsVi: samplePrompt.trim() ? [samplePrompt.trim()] : [`Sử dụng ${name} để tối ưu hóa công việc.`],
        configs: selectedPlatforms.map((p) => ({
          platform: p,
          platformName: p.toUpperCase(),
          cliCommand: `npm install ${name.toLowerCase().replace(/\s+/g, '-')}`,
          jsonConfig: jsonConfig.trim(),
        })),
        status: initialStatus,
        contributedBy: currentUserEmail || 'Thành viên ẩn danh',
        contributedAt: new Date().toISOString().split('T')[0],
        stars: 5.0,
        featured: false,
        linkHealth: 'unchecked',
        pricingModel,
      };

      onSubmitSuccess(newTool);
      setIsSubmitting(false);
      setSubmittedSuccess(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors pb-20">
      
      {/* THANH BREADCRUMB */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 py-3.5 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <button onClick={onNavigateHome} className="hover:text-indigo-600 transition-colors">
              Trang chủ
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-900 dark:text-white font-semibold">
              Đóng góp tài nguyên
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* TIÊU ĐỀ TRANG */}
        <div className="mb-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>QUY TRÌNH DUYỆT BÀI CHUẨN MỰC</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight mb-2">
            Đóng góp tài nguyên công nghệ
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Chia sẻ các công cụ AI, MCP Server, Skill, API, SDK hoặc phần mềm hữu ích. Mọi đóng góp từ thành viên sẽ được gửi vào hàng đợi xét duyệt và xuất bản chính thức sau khi Quản trị viên thẩm định.
          </p>
        </div>

        {submittedSuccess ? (
          <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm text-center space-y-4 animate-fadeIn">
            {isAdmin ? (
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
            ) : (
              <Clock className="w-16 h-16 text-amber-500 mx-auto animate-pulse" />
            )}
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {isAdmin ? 'Đã xuất bản thành công!' : 'Đã gửi đóng góp thành công!'}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
              {isAdmin ? (
                <>Tài nguyên <strong>{name}</strong> đã được Quản trị viên xuất bản trực tiếp lên hệ thống AI-HUB.</>
              ) : (
                <>
                  Tài nguyên <strong>{name}</strong> đã được chuyển vào <strong>Hàng đợi chờ phê duyệt</strong>. Quản trị viên tối cao sẽ xem xét và phê duyệt trước khi công cụ hiển thị công khai trên hệ thống.
                </>
              )}
            </p>
            <div className="pt-4 flex items-center justify-center space-x-4">
              <button
                onClick={() => {
                  setSubmittedSuccess(false);
                  setName('');
                  setSourceUrl('');
                  setPurposeVi('');
                  setSummaryVi('');
                  setInstallGuideVi('');
                  setUsageGuideVi('');
                }}
                className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                Đóng góp thêm công cụ khác
              </button>
              <button
                onClick={onNavigateHome}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md"
              >
                Về trang chủ khám phá
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-8">
            
            {/* THÔNG BÁO VỀ QUYỀN DUYỆT */}
            <div className="flex items-start space-x-3 p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-900/40 text-xs text-indigo-900 dark:text-indigo-200">
              <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Cơ chế phê duyệt:</span>{' '}
                {isAdmin ? (
                  <span className="text-emerald-700 dark:text-emerald-300 font-semibold">
                    Bạn đang đăng nhập với tư cách Quản trị viên (Admin). Công cụ của bạn sẽ được phê duyệt và xuất bản ngay lập tức.
                  </span>
                ) : (
                  <span>
                    Bạn đang đóng góp với tư cách Thành viên ({currentUserEmail || 'Khách'}). Công cụ sau khi gửi sẽ có trạng thái <strong>Chờ duyệt (Pending)</strong> và cần Quản trị viên thẩm duyệt trước khi xuất hiện trên AI-HUB.
                  </span>
                )}
              </div>
            </div>

            {/* KHỐI 1: TÊN & NGUỒN DẪN CHÍNH THỨC */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                <Code2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  Khối 1: Định danh & Nguồn dẫn chính thức
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Tên tài nguyên / công cụ <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ví dụ: VietQR Payment SDK, Filesystem MCP..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                  {errors.name && <p className="text-rose-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Tác giả / Đơn vị phát triển
                  </label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="Ví dụ: ZaloPay Team, FPT AI, Cộng đồng VN..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 text-slate-900 dark:text-white text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Đường dẫn nguồn chính thức (URL) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="url"
                  required
                  value={sourceUrl}
                  onChange={(e) => setSourceUrl(e.target.value)}
                  placeholder="https://github.com/... hoặc https://..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Bắt buộc là đường dẫn an toàn bắt đầu bằng https:// dẫn đến kho lưu trữ GitHub, GitLab hoặc cổng tài liệu chính thống.
                </span>
                {errors.sourceUrl && <p className="text-rose-500 text-xs mt-1">{errors.sourceUrl}</p>}
              </div>

              {/* PHÂN LOẠI: 13 LOẠI HÌNH & 18 LĨNH VỰC CHUYÊN MÔN */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Loại hình thành phần (13 loại hình) <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={toolType}
                    onChange={(e) => setToolType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 text-slate-900 dark:text-white text-sm focus:outline-none font-medium"
                  >
                    {toolTypeOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Lĩnh vực chuyên môn (18 lĩnh vực) <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 text-slate-900 dark:text-white text-sm focus:outline-none font-medium"
                  >
                    {availableCategories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.nameVi}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* NỀN TẢNG HỖ TRỢ */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Môi trường AI hỗ trợ <span className="text-rose-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'claude_desktop' as Platform, name: 'Claude Desktop' },
                    { id: 'antigravity' as Platform, name: 'Antigravity IDE' },
                    { id: 'cursor' as Platform, name: 'Cursor AI' },
                    { id: 'windsurf' as Platform, name: 'Windsurf' },
                    { id: 'web' as Platform, name: 'Web Browser / Cloud' },
                  ].map((p) => {
                    const isChecked = selectedPlatforms.includes(p.id);
                    return (
                      <button
                        type="button"
                        key={p.id}
                        onClick={() => togglePlatform(p.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                          isChecked
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                            : 'bg-white dark:bg-slate-850 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:border-slate-400'
                        }`}
                      >
                        {p.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* KHỐI 2: CÔNG DỤNG TIẾNG VIỆT CHI TIẾT */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  Khối 2: Công dụng & Tóm tắt tiếng Việt
                </h3>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Tóm tắt nhanh (1 - 2 câu)
                </label>
                <input
                  type="text"
                  value={summaryVi}
                  onChange={(e) => setSummaryVi(e.target.value)}
                  placeholder="Mô tả súc tích công dụng nổi bật nhất..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 text-slate-900 dark:text-white text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Công dụng chi tiết tiếng Việt <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={purposeVi}
                  onChange={(e) => setPurposeVi(e.target.value)}
                  placeholder="Nêu rõ bài toán nghiệp vụ công cụ giải quyết, các tính năng cốt lõi và lợi ích mang lại cho người dùng Việt Nam (tối thiểu 30 ký tự)..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
                {errors.purposeVi && <p className="text-rose-500 text-xs mt-1">{errors.purposeVi}</p>}
              </div>
            </div>

            {/* KHỐI 3: HƯỚNG DẪN CÀI ĐẶT & CẤU HÌNH JSON MẪU */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                <Wrench className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  Khối 3: Hướng dẫn cài đặt & Cấu hình JSON mẫu
                </h3>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Hướng dẫn cài đặt từng bước tiếng Việt <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={installGuideVi}
                  onChange={(e) => setInstallGuideVi(e.target.value)}
                  placeholder="Bước 1: Chuẩn bị môi trường Node.js / Python&#10;Bước 2: Cài đặt gói lệnh qua npm hoặc pip&#10;Bước 3: Sao chép tệp cấu hình JSON&#10;Bước 4: Khởi động lại ứng dụng và kiểm tra"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 text-slate-900 dark:text-white text-sm focus:outline-none"
                />
                {errors.installGuideVi && <p className="text-rose-500 text-xs mt-1">{errors.installGuideVi}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Cấu hình mẫu định dạng JSON <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={jsonConfig}
                  onChange={(e) => setJsonConfig(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-900 text-emerald-400 font-mono text-xs focus:outline-none"
                />
                {errors.jsonConfig && <p className="text-rose-500 text-xs mt-1">{errors.jsonConfig}</p>}
              </div>
            </div>

            {/* KHỐI 4: HƯỚNG DẪN SỬ DỤNG & KỊCH BẢN THỰC TẾ */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                <MessageSquare className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  Khối 4: Hướng dẫn sử dụng & Kịch bản thực tế
                </h3>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Hướng dẫn sử dụng chi tiết tiếng Việt <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={usageGuideVi}
                  onChange={(e) => setUsageGuideVi(e.target.value)}
                  placeholder="Kịch bản sử dụng thực tế: Cách đưa câu lệnh prompt vào hệ thống, các đối số truyền vào và kết quả đầu ra mong đợi..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 text-slate-900 dark:text-white text-sm focus:outline-none"
                />
                {errors.usageGuideVi && <p className="text-rose-500 text-xs mt-1">{errors.usageGuideVi}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Câu lệnh mẫu (Prompt gợi ý)
                </label>
                <input
                  type="text"
                  value={samplePrompt}
                  onChange={(e) => setSamplePrompt(e.target.value)}
                  placeholder="Ví dụ: Hãy phân tích hóa đơn điện tử và xuất kết quả kế toán..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 text-slate-900 dark:text-white text-sm focus:outline-none"
                />
              </div>
            </div>

            {/* NÚT GỬI ĐÓNG GÓP */}
            <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={onNavigateHome}
                className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                Hủy bỏ
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center space-x-2 px-7 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md hover:shadow-indigo-500/20 active:scale-[0.99] disabled:opacity-50 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Đang gửi tiếp nhận...' : isAdmin ? 'Xuất bản công cụ ngay' : 'Gửi đóng góp (Chờ duyệt)'}</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
