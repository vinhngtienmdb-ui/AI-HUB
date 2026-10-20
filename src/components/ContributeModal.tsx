import React, { useState } from 'react';
import { X, Send, AlertCircle, CheckCircle2, Link2, FileText, Wrench, MessageSquare } from 'lucide-react';
import { AITool, Category, Platform, ToolType } from '../types';

interface ContributeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newTool: AITool) => void;
}

export const ContributeModal: React.FC<ContributeModalProps> = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [toolType, setToolType] = useState<ToolType>('mcp');
  const [category, setCategory] = useState<Category>('coding');
  const [sourceUrl, setSourceUrl] = useState('');
  const [purposeVi, setPurposeVi] = useState('');
  const [installGuideVi, setInstallGuideVi] = useState('');
  const [jsonConfig, setJsonConfig] = useState('{\n  "mcpServers": {\n    "example": {\n      "command": "npx",\n      "args": ["-y", "my-mcp-server"]\n    }\n  }\n}');
  const [usageGuideVi, setUsageGuideVi] = useState('');
  const [samplePrompt, setSamplePrompt] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Ràng buộc 4 thông tin bắt buộc
    if (!name.trim()) {
      setErrorMsg('Vui lòng nhập tên công cụ.');
      return;
    }
    if (!sourceUrl.trim() || !sourceUrl.startsWith('https://')) {
      setErrorMsg('Khối 1: Nguồn dẫn chính thức phải là đường dẫn URL an toàn bắt đầu bằng https://');
      return;
    }
    if (!purposeVi.trim() || purposeVi.trim().length < 30) {
      setErrorMsg('Khối 2: Công dụng tiếng Việt phải có độ dài tối thiểu 30 ký tự để người dùng hiểu rõ bài toán.');
      return;
    }
    if (!installGuideVi.trim()) {
      setErrorMsg('Khối 3: Vui lòng nhập hướng dẫn cài đặt từng bước bằng tiếng Việt.');
      return;
    }
    // Kiểm tra cú pháp JSON cấu hình
    try {
      JSON.parse(jsonConfig);
    } catch {
      setErrorMsg('Khối 3: Cấu hình mẫu phải là chuỗi định dạng JSON hợp lệ.');
      return;
    }
    if (!usageGuideVi.trim()) {
      setErrorMsg('Khối 4: Vui lòng nhập hướng dẫn sử dụng và cách kích hoạt bằng tiếng Việt.');
      return;
    }

    const newTool: AITool = {
      id: `tool-${Date.now()}`,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: name.trim(),
      icon: 'Sparkles',
      toolType,
      typeNameVi: toolType === 'mcp' ? 'Máy chủ MCP' : toolType === 'skill' ? 'Kỹ Năng Tác Tử' : 'Bản Mẫu Tác Tử',
      category,
      categoryNameVi: category === 'coding' ? 'Lập trình & Git' : category === 'database' ? 'Cơ sở dữ liệu' : category === 'automation' ? 'Tự động hóa & Web' : category === 'search' ? 'Tìm kiếm thông tin' : 'Hệ thống & Đám mây',
      platforms: ['claude_desktop', 'antigravity'],
      sourceUrl: sourceUrl.trim(),
      authorName: authorName.trim() || 'Cộng đồng đóng góp',
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
      status: 'published',
      stars: 1,
      linkHealth: 'healthy',
      featured: false,
    };

    onSubmit(newTool);
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div 
        className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Đóng Góp Công Cụ AI Mới
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Yêu cầu bắt buộc đầy đủ 4 khối thông tin theo quy chuẩn VibeCode
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-900 flex items-start space-x-2 text-xs text-red-600 dark:text-red-400">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900 flex items-center space-x-2 text-xs text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Đã thêm công cụ thành công vào danh mục công khai!</span>
            </div>
          )}

          {/* Nhóm cơ bản */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Tên công cụ *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ví dụ: PostgreSQL MCP Server"
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Tác giả / Tổ chức phát triển
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Ví dụ: Model Context Protocol Org"
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Loại hình
              </label>
              <select
                value={toolType}
                onChange={(e) => setToolType(e.target.value as ToolType)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="mcp">Máy chủ MCP (Model Context Protocol)</option>
                <option value="skill">Kỹ Năng Tác Tử (Agent Skill)</option>
                <option value="template">Bản Mẫu Tác Tử (Agent Template)</option>
                <option value="web_tool">Công Cụ Web Trực Tuyến</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Lĩnh vực chuyên môn
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="coding">Lập trình & Git</option>
                <option value="database">Cơ sở dữ liệu</option>
                <option value="cloud">Đám mây & Hệ thống</option>
                <option value="automation">Tự động hóa & Web</option>
                <option value="content">Viết lách & Bộ nhớ</option>
                <option value="search">Tìm kiếm thông tin</option>
              </select>
            </div>
          </div>

          {/* KHỐI 1: NGUỒN GỐC CHÍNH THỨC */}
          <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/80 dark:border-blue-900/60">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-blue-700 dark:text-blue-300 uppercase mb-2">
              <Link2 className="w-4 h-4" />
              <span>Khối 1: Nguồn Dẫn Chính Thức (Bắt buộc)</span>
            </div>
            <input
              type="url"
              required
              value={sourceUrl}
              onChange={(e) => setSourceUrl(e.target.value)}
              placeholder="https://github.com/org/repo (Bắt buộc URL chính thức bắt đầu bằng https://)"
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-xs"
            />
          </div>

          {/* KHỐI 2: CÔNG DỤNG BẰNG TIẾNG VIỆT */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase mb-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>Khối 2: Công Dụng & Bài Toán Giải Quyết (Tiếng Việt)</span>
            </div>
            <textarea
              required
              rows={3}
              value={purposeVi}
              onChange={(e) => setPurposeVi(e.target.value)}
              placeholder="Giải thích chi tiết bằng tiếng Việt về công dụng, tính năng nổi bật và bài toán mà công cụ này giải quyết..."
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* KHỐI 3: HƯỚNG DẪN CÀI ĐẶT & CẤU HÌNH JSON */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase mb-2">
              <Wrench className="w-4 h-4 text-blue-600" />
              <span>Khối 3: Hướng Dẫn Cài Đặt & Cấu Hình JSON (Tiếng Việt)</span>
            </div>
            <textarea
              required
              rows={2}
              value={installGuideVi}
              onChange={(e) => setInstallGuideVi(e.target.value)}
              placeholder="Các bước chuẩn bị môi trường và cài đặt từng bước bằng tiếng Việt..."
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
            />

            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
              Đoạn mã cấu hình JSON mẫu:
            </label>
            <textarea
              required
              rows={4}
              value={jsonConfig}
              onChange={(e) => setJsonConfig(e.target.value)}
              className="w-full px-3.5 py-2 text-xs font-mono rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-900 text-emerald-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* KHỐI 4: HƯỚNG DẪN SỬ DỤNG VÀ CÂU LỆNH MẪU */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase mb-2">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              <span>Khối 4: Hướng Dẫn Sử Dụng & Câu Lệnh Mẫu (Tiếng Việt)</span>
            </div>
            <textarea
              required
              rows={2}
              value={usageGuideVi}
              onChange={(e) => setUsageGuideVi(e.target.value)}
              placeholder="Cách gọi và tình huống sử dụng thực tế bằng tiếng Việt..."
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
            />

            <input
              type="text"
              value={samplePrompt}
              onChange={(e) => setSamplePrompt(e.target.value)}
              placeholder="Câu lệnh mẫu (Prompt) gợi ý bằng tiếng Việt..."
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="flex items-center space-x-1.5 px-5 py-2 rounded-xl text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
            >
              <Send className="w-4 h-4" />
              <span>Gửi công cụ</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
