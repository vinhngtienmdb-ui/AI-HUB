import React, { useState } from 'react';
import { ChevronRight, Upload, CheckCircle2, AlertCircle, Info, Sparkles, Send } from 'lucide-react';
import { AITool, Category, ToolType, Platform } from '../types';

interface ContributePageProps {
  onNavigateHome: () => void;
  onSubmitSuccess: (tool: AITool) => void;
}

export const ContributePage: React.FC<ContributePageProps> = ({
  onNavigateHome,
  onSubmitSuccess,
}) => {
  const [name, setName] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [toolType, setToolType] = useState<ToolType>('agent');
  const [category, setCategory] = useState<Category>('coding');
  const [pricingModel, setPricingModel] = useState<'free' | 'freemium' | 'paid'>('free');
  const [summaryVi, setSummaryVi] = useState('');
  const [purposeVi, setPurposeVi] = useState('');
  const [tags, setTags] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('Tiếng Việt & Tiếng Anh');
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('web');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Vui lòng nhập tên tài nguyên.';
    if (!sourceUrl.trim() || !sourceUrl.startsWith('http')) {
      errs.sourceUrl = 'Vui lòng nhập URL chính thức hợp lệ (bắt đầu bằng http:// hoặc https://).';
    }
    if (!summaryVi.trim()) errs.summaryVi = 'Vui lòng nhập mô tả ngắn gọn.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newTool: AITool = {
        id: `contrib-${Date.now()}`,
        slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        name,
        icon: 'Sparkles',
        toolType,
        typeNameVi: toolType === 'mcp' ? 'Máy chủ MCP' : toolType === 'skill' ? 'Kỹ năng (Skill)' : 'Công cụ AI',
        category,
        categoryNameVi: category === 'coding' ? 'Lập trình & phát triển' : category === 'vietnam' ? 'Thị trường Việt Nam' : 'Tự động hóa',
        platforms: [selectedPlatform],
        sourceUrl,
        authorName: authorName.trim() || 'Cộng đồng đóng góp',
        license: 'MIT',
        summaryVi,
        purposeVi: purposeVi.trim() || summaryVi,
        featuresVi: ['Tự động phân tích và xử lý', 'Tích hợp nhanh chóng', 'Hỗ trợ môi trường tiêu chuẩn'],
        installGuideVi: 'Bước 1: Chuẩn bị môi trường.\nBước 2: Tải mã nguồn hoặc gói thư viện.\nBước 3: Cấu hình biến môi trường.\nBước 4: Khởi động và kiểm tra kết nối.',
        usageGuideVi: 'Kịch bản: Sử dụng câu lệnh tự nhiên để điều khiển công cụ theo yêu cầu công việc.',
        samplePromptsVi: [`Sử dụng ${name} để thực hiện công việc tự động hóa`],
        configs: [
          {
            platform: selectedPlatform,
            platformName: selectedPlatform.toUpperCase(),
            cliCommand: `npm install ${name.toLowerCase().replace(/\s+/g, '-')}`,
            jsonConfig: JSON.stringify({
              tool: name,
              source: sourceUrl,
              type: toolType
            }, null, 2)
          }
        ],
        status: 'published',
        stars: 5.0,
        featured: false,
        linkHealth: 'healthy',
        pricingModel,
        languages: [selectedLanguage]
      };

      onSubmitSuccess(newTool);
      setIsSubmitting(false);
      setSubmittedSuccess(true);
    }, 1200);
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
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight mb-2">
            Đóng góp tài nguyên
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Chia sẻ công cụ AI, MCP Servers hoặc Agent Skills mà bạn biết để cùng xây dựng cộng đồng AI Việt Nam.
          </p>
        </div>

        {submittedSuccess ? (
          <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm text-center space-y-4 animate-fadeIn">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Cảm ơn bạn đã đóng góp tài nguyên!
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
              Tài nguyên <strong>{name}</strong> đã được tiếp nhận thành công vào hệ thống AI HUB VN và hiển thị ngay trên danh mục.
            </p>
            <div className="pt-4 flex items-center justify-center space-x-4">
              <button
                onClick={() => {
                  setSubmittedSuccess(false);
                  setName('');
                  setSourceUrl('');
                  setSummaryVi('');
                }}
                className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50"
              >
                Đóng góp thêm tài nguyên khác
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
            
            {/* NHÓM 1: THÔNG TIN CƠ BẢN */}
            <div className="space-y-4">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
                Thông tin cơ bản
              </h3>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Tên tài nguyên <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nhập tên công cụ, server hoặc skill..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
                {errors.name && <p className="text-rose-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Đường dẫn chính thức <span className="text-rose-500">*</span>
                </label>
                <input
                  type="url"
                  required
                  value={sourceUrl}
                  onChange={(e) => setSourceUrl(e.target.value)}
                  placeholder="https://github.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Vui lòng nhập URL chính thức của tài nguyên (GitHub, GitLab hoặc Website).
                </span>
                {errors.sourceUrl && <p className="text-rose-500 text-xs mt-1">{errors.sourceUrl}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Loại tài nguyên <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={toolType}
                    onChange={(e) => setToolType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 text-slate-900 dark:text-white text-sm focus:outline-none"
                  >
                    <option value="agent">Công cụ AI / Tác tử (Agent)</option>
                    <option value="mcp">Máy chủ MCP Server</option>
                    <option value="skill">Kỹ năng tác nhân (Agent Skill)</option>
                    <option value="workflow">Quy trình tự động hóa (Workflow)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Mô hình giá <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={pricingModel}
                    onChange={(e) => setPricingModel(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 text-slate-900 dark:text-white text-sm focus:outline-none"
                  >
                    <option value="free">Miễn phí hoàn toàn (Mã nguồn mở)</option>
                    <option value="freemium">Có gói miễn phí (Freemium)</option>
                    <option value="paid">Trả phí dịch vụ</option>
                  </select>
                </div>
              </div>
            </div>

            {/* NHÓM 2: MÔ TẢ */}
            <div className="space-y-4">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
                Mô tả
              </h3>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Mô tả ngắn gọn <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-[11px] text-slate-400">{summaryVi.length}/500</span>
                </div>
                <textarea
                  required
                  maxLength={500}
                  rows={2}
                  value={summaryVi}
                  onChange={(e) => setSummaryVi(e.target.value)}
                  placeholder="Giới thiệu ngắn gọn về tài nguyên, công dụng chính..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
                {errors.summaryVi && <p className="text-rose-500 text-xs mt-1">{errors.summaryVi}</p>}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Mô tả chi tiết & Công dụng
                  </label>
                  <span className="text-[11px] text-slate-400">{purposeVi.length}/2000</span>
                </div>
                <textarea
                  maxLength={2000}
                  rows={4}
                  value={purposeVi}
                  onChange={(e) => setPurposeVi(e.target.value)}
                  placeholder="Thông tin chi tiết hơn về tính năng, ưu nhược điểm, hướng dẫn sử dụng..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Thẻ phân loại (Tags)
                </label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Ví dụ: ai, viết nội dung, miễn phí, mcp..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 text-slate-900 dark:text-white text-sm focus:outline-none"
                />
              </div>
            </div>

            {/* NHÓM 3: THÔNG TIN BỔ SUNG */}
            <div className="space-y-4">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
                Thông tin bổ sung
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Nhà phát triển / Tác giả
                  </label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="Tên nhà phát triển hoặc công ty..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 text-slate-900 dark:text-white text-sm focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Ngôn ngữ hỗ trợ
                  </label>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 text-slate-900 dark:text-white text-sm focus:outline-none"
                  >
                    <option value="Tiếng Việt & Tiếng Anh">Tiếng Việt & Tiếng Anh</option>
                    <option value="Tiếng Việt">Thuần Tiếng Việt</option>
                    <option value="Đa ngôn ngữ">Đa ngôn ngữ toàn cầu</option>
                  </select>
                </div>
              </div>
            </div>

            {/* KHUNG LƯU Ý THEO ẢNH DEMO */}
            <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 flex items-start space-x-3 text-xs text-slate-700 dark:text-slate-300">
              <Info className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <strong className="text-indigo-900 dark:text-indigo-200 block font-bold">Lưu ý:</strong>
                <p>• Vui lòng đảm bảo thông tin chính xác và đầy đủ nguồn gốc mã nguồn.</p>
                <p>• Mọi công cụ sẽ được tự động tích hợp và kiểm thử cú pháp JSON an toàn.</p>
                <p>• Thời gian duyệt và đồng bộ hệ thống diễn ra tức thì.</p>
              </div>
            </div>

            {/* NÚT GỬI ĐÓNG GÓP MÀU TÍM */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Đang xử lý đóng góp...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Gửi đóng góp</span>
                </>
              )}
            </button>

          </form>
        )}

      </div>
    </div>
  );
};
