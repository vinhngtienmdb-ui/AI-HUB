import React, { useState } from 'react';
import { X, Send, AlertCircle, CheckCircle2, Clock, ShieldCheck, Code2, FileText, Wrench, MessageSquare } from 'lucide-react';
import { AITool, Category, Platform, ToolType } from '../types';
import { CATEGORIES } from '../data/mockTools';

interface ContributeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newTool: AITool) => void;
  currentUserEmail?: string | null;
  isAdmin?: boolean;
}

export const ContributeModal: React.FC<ContributeModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  currentUserEmail,
  isAdmin = false,
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [toolType, setToolType] = useState<ToolType>('agent');
  const [category, setCategory] = useState<Category>('software_development');
  const [sourceUrl, setSourceUrl] = useState('');
  const [purposeVi, setPurposeVi] = useState('');
  const [installGuideVi, setInstallGuideVi] = useState('');
  const [jsonConfig, setJsonConfig] = useState('{\n  "mcpServers": {\n    "example": {\n      "command": "npx",\n      "args": ["-y", "my-tool"]\n    }\n  }\n}');
  const [usageGuideVi, setUsageGuideVi] = useState('');
  const [samplePrompt, setSamplePrompt] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  // 13 Loại hình thành phần
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

  const availableCategories = CATEGORIES.filter((c) => c.id !== 'all' && c.id !== 'vietnam');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Vui lòng nhập tên công cụ.');
      return;
    }
    if (!sourceUrl.trim() || !sourceUrl.startsWith('https://')) {
      setErrorMsg('Khối 1: Nguồn dẫn chính thức phải là URL an toàn bắt đầu bằng https://');
      return;
    }
    if (!purposeVi.trim() || purposeVi.trim().length < 30) {
      setErrorMsg('Khối 2: Công dụng tiếng Việt phải có độ dài tối thiểu 30 ký tự.');
      return;
    }
    if (!installGuideVi.trim()) {
      setErrorMsg('Khối 3: Vui lòng nhập hướng dẫn cài đặt từng bước bằng tiếng Việt.');
      return;
    }
    try {
      JSON.parse(jsonConfig);
    } catch {
      setErrorMsg('Khối 3: Cấu hình mẫu phải là chuỗi định dạng JSON hợp lệ.');
      return;
    }
    if (!usageGuideVi.trim()) {
      setErrorMsg('Khối 4: Vui lòng nhập hướng dẫn sử dụng và kịch bản bằng tiếng Việt.');
      return;
    }

    const typeMeta = toolTypeOptions.find((t) => t.value === toolType);
    const catMeta = availableCategories.find((c) => c.id === category);
    const initialStatus = isAdmin ? 'published' : 'pending';

    const newTool: AITool = {
      id: `tool-${Date.now()}`,
      slug: name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''),
      name: name.trim(),
      icon: 'Sparkles',
      toolType,
      typeNameVi: typeMeta ? typeMeta.label.split(' ')[0] : 'Công cụ',
      category,
      categoryNameVi: catMeta ? catMeta.nameVi : 'Lĩnh vực công nghệ',
      platforms: ['claude_desktop', 'antigravity', 'cursor'],
      sourceUrl: sourceUrl.trim(),
      authorName: authorName.trim() || (currentUserEmail ? currentUserEmail.split('@')[0] : 'Cộng đồng đóng góp'),
      license: 'MIT',
      summaryVi: purposeVi.slice(0, 100) + '...',
      purposeVi: purposeVi.trim(),
      featuresVi: [
        'Hỗ trợ tích hợp nhanh vào môi trường AI thông dụng.',
        'Được đóng góp và thẩm định bởi cộng đồng người dùng Việt Nam.'
      ],
      installGuideVi: installGuideVi.trim(),
      usageGuideVi: usageGuideVi.trim(),
      samplePromptsVi: samplePrompt.trim() ? [samplePrompt.trim()] : ['Hãy hướng dẫn tôi cách sử dụng công cụ này.'],
      configs: [
        {
          platform: 'claude_desktop',
          platformName: 'Claude Desktop',
          jsonConfig: jsonConfig.trim(),
        },
        {
          platform: 'antigravity',
          platformName: 'Google Antigravity',
          jsonConfig: jsonConfig.trim(),
        }
      ],
      status: initialStatus,
      contributedBy: currentUserEmail || 'Thành viên ẩn danh',
      contributedAt: new Date().toISOString().split('T')[0],
      stars: 5.0,
      linkHealth: 'unchecked',
      featured: false,
    };

    onSubmit(newTool);
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      onClose();
    }, 1600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Đóng góp tài nguyên cho AI HUB VN
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {isAdmin ? 'Quản trị viên xuất bản trực tiếp tài nguyên lên kho chung' : 'Công cụ của thành viên sẽ được đưa vào hàng đợi chờ Quản trị viên duyệt'}
            </p>
          </div>

          {successMsg ? (
            <div className="py-10 text-center space-y-3">
              {isAdmin ? (
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
              ) : (
                <Clock className="w-12 h-12 text-amber-500 mx-auto animate-pulse" />
              )}
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {isAdmin ? 'Đã xuất bản thành công!' : 'Đã gửi đóng góp vào hàng đợi duyệt!'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                {isAdmin 
                  ? 'Công cụ đã được xuất bản và hiển thị ngay trên AI-HUB.' 
                  : 'Cảm ơn bạn! Quản trị viên tối cao sẽ thẩm định nội dung trước khi đưa lên hệ thống.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {errorMsg && (
                <div className="flex items-start space-x-2 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/40 text-rose-700 dark:text-rose-300 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* KHỐI 1 */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Khối 1: Định danh & Nguồn dẫn
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Tên tài nguyên <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Tên công cụ, API, SDK..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 text-slate-900 dark:text-white text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Tác giả / Nhóm phát triển
                    </label>
                    <input
                      type="text"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      placeholder="Tác giả hoặc đơn vị..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 text-slate-900 dark:text-white text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Nguồn dẫn chính thức (URL) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="url"
                    required
                    value={sourceUrl}
                    onChange={(e) => setSourceUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 text-slate-900 dark:text-white text-xs focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Loại hình thành phần (13 loại) <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={toolType}
                      onChange={(e) => setToolType(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 text-slate-900 dark:text-white text-xs focus:outline-none"
                    >
                      {toolTypeOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Lĩnh vực chuyên môn (18 lĩnh vực) <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 text-slate-900 dark:text-white text-xs focus:outline-none"
                    >
                      {availableCategories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.nameVi}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* KHỐI 2 */}
              <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Khối 2: Công dụng tiếng Việt chi tiết
                </span>
                <div>
                  <textarea
                    required
                    rows={2}
                    value={purposeVi}
                    onChange={(e) => setPurposeVi(e.target.value)}
                    placeholder="Mô tả công dụng và bài toán giải quyết (tối thiểu 30 ký tự)..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 text-slate-900 dark:text-white text-xs focus:outline-none"
                  />
                </div>
              </div>

              {/* KHỐI 3 */}
              <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Khối 3: Cài đặt & Cấu hình JSON
                </span>
                <div>
                  <textarea
                    required
                    rows={2}
                    value={installGuideVi}
                    onChange={(e) => setInstallGuideVi(e.target.value)}
                    placeholder="Hướng dẫn cài đặt từng bước..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 text-slate-900 dark:text-white text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <textarea
                    required
                    rows={3}
                    value={jsonConfig}
                    onChange={(e) => setJsonConfig(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-900 text-emerald-400 font-mono text-[11px] focus:outline-none"
                  />
                </div>
              </div>

              {/* KHỐI 4 */}
              <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                  Khối 4: Hướng dẫn sử dụng
                </span>
                <div>
                  <textarea
                    required
                    rows={2}
                    value={usageGuideVi}
                    onChange={(e) => setUsageGuideVi(e.target.value)}
                    placeholder="Kịch bản sử dụng thực tế..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 text-slate-900 dark:text-white text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end space-x-2.5">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md transition-all flex items-center space-x-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isAdmin ? 'Xuất bản ngay' : 'Gửi đóng góp (Chờ duyệt)'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
