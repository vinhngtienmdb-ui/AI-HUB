import React, { useState } from 'react';
import { 
  ChevronRight, ExternalLink, Bookmark, Star, Users, Calendar, Check, X, 
  Terminal, Copy, CheckCheck, Play, ArrowUpRight, MessageSquare, ShieldCheck, 
  Sparkles, Layers, Box, Globe, Bot, Server, Folder, Code2, AlertTriangle, Maximize2 
} from 'lucide-react';
import { AITool } from '../types';

interface DetailPageProps {
  tool: AITool;
  allTools: AITool[];
  onNavigateHome: () => void;
  onNavigateCategory: () => void;
  onSelectAlternative: (tool: AITool) => void;
  onExecuteCommand: (command: string) => void;
  isSaved: boolean;
  onToggleSave: () => void;
}

export const DetailPage: React.FC<DetailPageProps> = ({
  tool,
  allTools,
  onNavigateHome,
  onNavigateCategory,
  onSelectAlternative,
  onExecuteCommand,
  isSaved,
  onToggleSave,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'usage' | 'config'>('overview');
  const [copiedConfigIndex, setCopiedConfigIndex] = useState<number | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Tìm các công cụ thay thế cùng danh mục
  const alternatives = React.useMemo(() => {
    return allTools
      .filter((t) => t.id !== tool.id && (t.category === tool.category || t.toolType === tool.toolType))
      .slice(0, 4);
  }, [allTools, tool]);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedConfigIndex(index);
    setTimeout(() => setCopiedConfigIndex(null), 2000);
  };

  const renderIcon = (t: AITool) => {
    if (t.icon === 'Database') return <Server className="w-8 h-8 text-blue-600" />;
    if (t.icon === 'Brain') return <Bot className="w-8 h-8 text-indigo-600" />;
    if (t.icon === 'FolderTree') return <Folder className="w-8 h-8 text-emerald-600" />;
    return <Sparkles className="w-8 h-8 text-purple-600" />;
  };

  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors pb-20">
      
      {/* THANH BREADCRUMB PHÂN CẤP */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 py-3.5 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <button onClick={onNavigateHome} className="hover:text-indigo-600 transition-colors">
              Trang chủ
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <button onClick={onNavigateCategory} className="hover:text-indigo-600 transition-colors">
              {tool.typeNameVi}
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-900 dark:text-white font-semibold truncate max-w-xs">
              {tool.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* KHỐI ĐẦU TRANG: THÔNG TIN TỔNG QUAN & NÚT HÀNH ĐỘNG CHÍNH */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
            
            {/* CỘT TRÁI: LOGO, TÊN, ĐÁNH GIÁ VÀ HÀNH ĐỘNG */}
            <div className="flex-1 space-y-5">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/40 flex items-center justify-center shrink-0 shadow-sm">
                  {renderIcon(tool)}
                </div>
                <div>
                  <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                      {tool.name}
                    </h1>
                    {tool.featured && (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                        Phổ biến
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-2.5 mt-2">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                      {tool.categoryNameVi}
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 font-semibold border border-emerald-200 dark:border-emerald-800">
                      {tool.license.includes('MIT') ? 'Mã nguồn mở (MIT)' : 'Miễn phí sử dụng'}
                    </span>
                  </div>

                  {/* Sao và Lượt dùng */}
                  <div className="flex items-center space-x-4 mt-3 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center space-x-1 font-bold text-amber-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span>{tool.stars ? (tool.stars >= 1000 ? `${(tool.stars / 1000).toFixed(1)}k` : tool.stars) : '4.8'}</span>
                      <span className="text-slate-400 font-normal">({tool.reviewCount || '12.5k đánh giá'})</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <Users className="w-3.5 h-3.5" />
                      <span>{tool.usageCount || '12.5k lượt sử dụng'}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Nút hành động chính */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={tool.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Truy cập nguồn chính thức</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={onToggleSave}
                  className={`inline-flex items-center space-x-2 px-5 py-3 rounded-2xl border font-bold text-sm transition-all ${
                    isSaved
                      ? 'bg-indigo-50 border-indigo-300 text-indigo-700 dark:bg-indigo-950 dark:border-indigo-700 dark:text-indigo-300'
                      : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current text-indigo-600' : ''}`} />
                  <span>{isSaved ? 'Đã lưu vào bộ sưu tập' : 'Lưu vào bộ sưu tập'}</span>
                </button>

                {tool.configs.some((c) => c.cliCommand) && (
                  <button
                    type="button"
                    onClick={() => {
                      const cmd = tool.configs.find((c) => c.cliCommand)?.cliCommand;
                      if (cmd) onExecuteCommand(cmd);
                    }}
                    className="inline-flex items-center space-x-1.5 px-4 py-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 font-bold text-xs transition-colors"
                    title="Chạy lệnh cài đặt an toàn trên máy cục bộ"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Chạy lệnh trên máy</span>
                  </button>
                )}
              </div>
            </div>

            {/* CỘT PHẢI: BẢNG THÔNG TIN NHÀ PHÁT TRIỂN & NỀN TẢNG */}
            <div className="w-full lg:w-72 bg-slate-50 dark:bg-slate-850/60 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 space-y-3 text-xs shrink-0">
              <div>
                <span className="text-slate-400 block mb-0.5">Nhà phát triển / Tác giả</span>
                <strong className="text-slate-800 dark:text-slate-200 font-bold text-sm">
                  {tool.authorName}
                </strong>
              </div>

              <div>
                <span className="text-slate-400 block mb-0.5">Kho lưu trữ chính thức</span>
                <a
                  href={tool.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 dark:text-indigo-400 hover:underline font-mono truncate block"
                >
                  {tool.sourceUrl.replace('https://', '')}
                </a>
              </div>

              <div>
                <span className="text-slate-400 block mb-0.5">Ngôn ngữ hỗ trợ</span>
                <span className="text-slate-700 dark:text-slate-300 font-medium">
                  Tiếng Việt, Tiếng Anh
                </span>
              </div>

              <div>
                <span className="text-slate-400 block mb-0.5">Nền tảng tương thích</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {tool.platforms.map((p) => (
                    <span key={p} className="px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-[10px]">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* KHỐI ẢNH MINH HỌA / DEMO THỰC TẾ TỪ REPO (NẾU CÓ, CÓ GHI CHÚ RÕ RÀNG) */}
        {((tool.demoImages && tool.demoImages.length > 0) || Boolean(tool.imageUrl)) && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-3">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
              Ảnh chụp màn hình & Giao diện thực tế từ kho lưu trữ
            </h3>

            {(() => {
              const currentItem = tool.demoImages && tool.demoImages[activeImageIndex]
                ? tool.demoImages[activeImageIndex]
                : tool.imageUrl;
              const currentUrl = typeof currentItem === 'string' ? currentItem : currentItem?.url || tool.imageUrl || '';
              const currentCaption = typeof currentItem === 'object' && currentItem?.caption
                ? currentItem.caption
                : `Ảnh minh họa tính năng và giao diện thực tế của ${tool.name}.`;

              return (
                <div>
                  <div className="relative aspect-[21/9] sm:aspect-[2.4/1] w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-md">
                    <img src={currentUrl} alt={tool.name} className="w-full h-full object-cover" />
                    <a
                      href={currentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-3 right-3 flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-white text-xs font-semibold backdrop-blur-md"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Xem ảnh gốc</span>
                    </a>
                  </div>

                  <div className="mt-2.5 px-4 py-2.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 flex items-start space-x-2 text-xs">
                    <span className="font-bold text-indigo-700 dark:text-indigo-300 shrink-0">
                      Ghi chú ảnh:
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 font-medium">{currentCaption}</p>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* THANH TABS NỘI DUNG (TỔNG QUAN • CÁCH SỬ DỤNG • CẤU HÌNH JSON) */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 space-x-8 text-sm font-bold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'overview'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Tổng quan
          </button>
          <button
            onClick={() => setActiveTab('usage')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'usage'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Cách sử dụng & Cài đặt
          </button>
          <button
            onClick={() => setActiveTab('config')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'config'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Cấu hình mẫu JSON ({tool.configs.length})
          </button>
        </div>

        {/* NỘI DUNG THEO TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* GIỚI THIỆU & CÔNG DỤNG CHI TIẾT */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                Giới thiệu
              </h2>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {tool.purposeVi}
              </p>
            </div>

            {/* TÍNH NĂNG NỔI BẬT (GRID 6 KHỐI THEO ẢNH DEMO) */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-5">
                Tính năng nổi bật
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tool.featuresVi.map((feature, idx) => (
                  <div key={idx} className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* HAI KHỐI SO SÁNH: ƯU ĐIỂM (XANH) & NHƯỢC ĐIỂM (ĐỎ) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Ưu điểm */}
              <div className="p-6 rounded-3xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/60 space-y-3">
                <div className="flex items-center space-x-2 text-emerald-700 dark:text-emerald-300 font-bold text-sm">
                  <Check className="w-4 h-4" />
                  <span>Ưu điểm</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Mã nguồn mở minh bạch, tự do tùy biến và tích hợp</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Chuẩn hóa giao thức kết nối theo quy chuẩn ngành phần mềm</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Cộng đồng đóng góp lớn, cập nhật thường xuyên</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Đã được kiểm thử và hỗ trợ tiếng Việt đầy đủ</span>
                  </li>
                </ul>
              </div>

              {/* Nhược điểm */}
              <div className="p-6 rounded-3xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-800/60 space-y-3">
                <div className="flex items-center space-x-2 text-rose-700 dark:text-rose-300 font-bold text-sm">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Nhược điểm & Giới hạn</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    <span>Yêu cầu cấu hình môi trường Node.js hoặc Python cục bộ</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    <span>Cần cấp quyền truy cập hệ thống phù hợp để hoạt động</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    <span>Một số API dịch vụ bên ngoài có thể yêu cầu khóa truy cập (API Key)</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* BẢNG THÔNG TIN GIÁ (PRICING TABLE CHUẨN MẪU) */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                Thông tin giá & Giấy phép
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-semibold uppercase">
                    <tr>
                      <th className="py-3 px-4">Gói dịch vụ / Bản quyền</th>
                      <th className="py-3 px-4">Chi phí</th>
                      <th className="py-3 px-4 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                        Cộng đồng (Mã nguồn mở)
                      </td>
                      <td className="py-3 px-4 text-emerald-600 font-bold">
                        Miễn phí vĩnh viễn ({tool.license})
                      </td>
                      <td className="py-3 px-4 text-right">
                        <a
                          href={tool.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 font-bold hover:bg-indigo-100"
                        >
                          Tải về
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                        Hỗ trợ doanh nghiệp
                      </td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                        Theo nhu cầu triển khai
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="text-slate-400">Liên hệ tác giả</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* CÁC LỰA CHỌN THAY THẾ (ALTERNATIVES CAROUSEL) */}
            {alternatives.length > 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                  Các lựa chọn thay thế cùng lĩnh vực
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {alternatives.map((alt) => (
                    <div
                      key={alt.id}
                      onClick={() => onSelectAlternative(alt)}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/60 dark:border-slate-800 hover:border-indigo-400 cursor-pointer transition-all group"
                    >
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors line-clamp-1">
                        {alt.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                        {alt.summaryVi}
                      </p>
                      <div className="flex items-center justify-between mt-3 text-[10px] text-amber-500 font-bold">
                        <span className="flex items-center space-x-0.5">
                          <Star className="w-3 h-3 fill-current" />
                          <span>{alt.stars || '4.8'}</span>
                        </span>
                        <span className="text-indigo-600 group-hover:translate-x-0.5 transition-transform">
                          Xem chi tiết →
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 2: CÁCH SỬ DỤNG VÀ HƯỚNG DẪN CÀI ĐẶT 4 BƯỚC */}
        {activeTab === 'usage' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Hướng dẫn cài đặt 4 bước */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <Terminal className="w-5 h-5 text-indigo-600" />
                <span>Quy trình cài đặt chuẩn hóa 4 bước</span>
              </h2>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed font-sans">
                {tool.installGuideVi}
              </div>
            </div>

            {/* Kịch bản sử dụng thực tế */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-indigo-600" />
                <span>Kịch bản sử dụng & Câu lệnh mẫu (Prompt)</span>
              </h2>
              <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 text-xs sm:text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                {tool.usageGuideVi}
              </div>

              {tool.samplePromptsVi && tool.samplePromptsVi.length > 0 && (
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    Câu lệnh mẫu tham khảo:
                  </span>
                  {tool.samplePromptsVi.map((prompt, idx) => (
                    <div key={idx} className="flex items-start justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
                      <span className="italic text-slate-600 dark:text-slate-300">"{prompt}"</span>
                      <button
                        onClick={() => handleCopy(prompt, 999 + idx)}
                        className="text-indigo-600 hover:text-indigo-700 shrink-0 ml-2"
                        title="Sao chép câu lệnh"
                      >
                        {copiedConfigIndex === 999 + idx ? <CheckCheck className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 3: CẤU HÌNH MẪU JSON VÀ LỆNH CLI */}
        {activeTab === 'config' && (
          <div className="space-y-6 animate-fadeIn">
            {tool.configs.map((config, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">
                    Cấu hình cho {config.platformName}
                  </span>
                  <button
                    onClick={() => handleCopy(config.jsonConfig, idx)}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300 font-bold text-xs transition-colors"
                  >
                    {copiedConfigIndex === idx ? <CheckCheck className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedConfigIndex === idx ? 'Đã sao chép' : 'Sao chép JSON'}</span>
                  </button>
                </div>

                {config.cliCommand && (
                  <div>
                    <span className="text-xs text-slate-400 block mb-1">Lệnh cài đặt CLI:</span>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 text-emerald-400 font-mono text-xs overflow-x-auto">
                      <span>{config.cliCommand}</span>
                      <button
                        onClick={() => onExecuteCommand(config.cliCommand!)}
                        className="ml-3 px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-sans text-xs font-bold hover:bg-emerald-700 shrink-0"
                      >
                        Chạy lệnh
                      </button>
                    </div>
                  </div>
                )}

                <div>
                  <span className="text-xs text-slate-400 block mb-1">Mã cấu hình JSON:</span>
                  <pre className="p-4 rounded-2xl bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto border border-slate-800">
                    <code>{config.jsonConfig}</code>
                  </pre>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
