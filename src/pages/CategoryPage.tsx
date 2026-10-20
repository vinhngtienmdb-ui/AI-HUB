import React, { useState, useMemo } from 'react';
import { 
  Search, X, Star, ArrowRight, ChevronRight, Bookmark, Filter, SlidersHorizontal, 
  RotateCcw, Check, Sparkles, Bot, Server, Folder, Code2, Globe, Cpu, Box 
} from 'lucide-react';
import { AITool, ToolType, Category, PricingModel } from '../types';

interface CategoryPageProps {
  toolType: ToolType | 'all';
  tools: AITool[];
  onSelectTool: (tool: AITool) => void;
  onNavigateHome: () => void;
  savedToolIds: string[];
  onToggleSaveTool: (toolId: string) => void;
  isExpanded?: boolean;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  toolType,
  tools,
  onSelectTool,
  onNavigateHome,
  savedToolIds,
  onToggleSaveTool,
  isExpanded = true,
}) => {
  // Lọc theo loại hình trang danh mục
  const baseTools = useMemo(() => {
    if (toolType === 'all') return tools;
    return tools.filter((t) => t.toolType === toolType);
  }, [tools, toolType]);

  // Bộ lọc nội bộ trang danh mục
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedQuickTag, setSelectedQuickTag] = useState<'all' | 'popular' | 'latest' | 'top_rated' | 'free' | 'paid'>('all');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [selectedPricing, setSelectedPricing] = useState<PricingModel>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [selectedLanguage, setSelectedLanguage] = useState<'all' | 'vi' | 'en'>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'newest'>('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const PAGE_SIZE = 12;

  // Lấy tiêu đề và mô tả phù hợp cho trang danh mục
  const pageMeta = useMemo(() => {
    switch (toolType) {
      case 'mcp':
        return {
          title: 'Khám phá MCP Server',
          crumb: 'MCP Server',
          desc: 'Kết nối mô hình AI với tệp tin, cơ sở dữ liệu và các dịch vụ trực tuyến qua giao thức Model Context Protocol.',
        };
      case 'skill':
        return {
          title: 'Khám phá Skill',
          crumb: 'Skill',
          desc: 'Trang bị bộ kỹ năng, chỉ dẫn chuyên môn và năng lực thực thi cho các tác nhân trí tuệ nhân tạo.',
        };
      case 'agent':
        return {
          title: 'Khám phá Agent',
          crumb: 'Agent',
          desc: 'Các tác nhân trí tuệ nhân tạo tự chủ giải quyết tác vụ phức tạp và phối hợp luồng công việc thông minh.',
        };
      case 'api':
        return {
          title: 'Khám phá Cổng API',
          crumb: 'API',
          desc: 'Giao diện lập trình ứng dụng REST, GraphQL và Webhook kết nối dữ liệu và hệ thống dịch vụ trực tiếp.',
        };
      case 'sdk':
        return {
          title: 'Khám phá Bộ công cụ SDK',
          crumb: 'SDK',
          desc: 'Bộ công cụ phát triển phần mềm chính thức từ các nền tảng công nghệ, cổng thanh toán và dịch vụ số.',
        };
      case 'software':
        return {
          title: 'Khám phá Phần mềm doanh nghiệp',
          crumb: 'Phần mềm',
          desc: 'Hệ thống ERP, CRM, phần mềm kế toán, quản trị nhân sự và cổng dịch vụ công chuẩn hóa cho tổ chức.',
        };
      case 'workflow':
        return {
          title: 'Khám phá Workflow tự động',
          crumb: 'Workflow',
          desc: 'Quy trình tự động hóa luồng làm việc tích hợp đa nền tảng giúp tối ưu hóa năng suất hoạt động.',
        };
      case 'model':
        return {
          title: 'Khám phá Model AI',
          crumb: 'Model',
          desc: 'Các mô hình ngôn ngữ lớn, mô hình nền tảng và trọng số AI chuyên sâu phục vụ nghiên cứu và ứng dụng.',
        };
      case 'dataset':
        return {
          title: 'Khám phá Dataset',
          crumb: 'Dataset',
          desc: 'Các bộ dữ liệu địa giới hành chính, bản đồ GeoJSON và ngữ liệu huấn luyện chất lượng cao.',
        };
      default:
        return {
          title: 'Khám phá công cụ AI',
          crumb: 'Công cụ AI',
          desc: 'Tìm kiếm, khám phá và sử dụng các công cụ AI hữu ích nhất cho công việc và học tập.',
        };
    }
  }, [toolType]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedQuickTag('all');
    setSelectedCategory('all');
    setSelectedPricing('all');
    setMinRating(0);
    setSelectedLanguage('all');
    setCurrentPage(1);
  };

  // Thống kê số lượng theo danh mục thực tế
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: baseTools.length };
    for (const t of baseTools) {
      counts[t.category] = (counts[t.category] || 0) + 1;
    }
    return counts;
  }, [baseTools]);

  // Lọc và sắp xếp danh sách tài nguyên
  const filteredTools = useMemo(() => {
    return baseTools.filter((t) => {
      // Tìm kiếm từ khóa
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        (t.name || '').toLowerCase().includes(q) ||
        (t.summaryVi || '').toLowerCase().includes(q) ||
        (t.authorName || '').toLowerCase().includes(q);

      // Lọc danh mục
      const matchCategory = selectedCategory === 'all' || t.category === selectedCategory;

      // Lọc mô hình giá
      let matchPricing = true;
      if (selectedPricing === 'free') {
        matchPricing = (t.license || '').toLowerCase().includes('mit') || (t.license || '').toLowerCase().includes('apache') || (t.pricingModel === 'free');
      } else if (selectedPricing === 'paid') {
        matchPricing = t.pricingModel === 'paid';
      }

      // Lọc theo tag nhanh
      let matchQuickTag = true;
      if (selectedQuickTag === 'free') {
        matchQuickTag = (t.license || '').toLowerCase().includes('mit') || (t.license || '').toLowerCase().includes('apache');
      } else if (selectedQuickTag === 'top_rated') {
        matchQuickTag = (t.stars || 0) >= 4.5 || (t.stars || 0) >= 1000;
      }

      // Lọc đánh giá tối thiểu
      const matchRating = !minRating || (t.stars || 0) >= minRating || (t.stars || 0) >= 500;

      return matchQuery && matchCategory && matchPricing && matchQuickTag && matchRating;
    }).sort((a, b) => {
      if (sortBy === 'rating') return (b.stars || 0) - (a.stars || 0);
      return (b.stars || 0) - (a.stars || 0);
    });
  }, [baseTools, searchQuery, selectedCategory, selectedPricing, selectedQuickTag, minRating, sortBy]);

  // Phân trang
  const totalPages = Math.ceil(filteredTools.length / PAGE_SIZE) || 1;
  const paginatedTools = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredTools.slice(start, start + PAGE_SIZE);
  }, [filteredTools, currentPage]);

  const renderIcon = (tool: AITool) => {
    if (tool.icon === 'Database') return <Server className="w-5 h-5 text-blue-600" />;
    if (tool.icon === 'Brain') return <Bot className="w-5 h-5 text-indigo-600" />;
    if (tool.icon === 'FolderTree') return <Folder className="w-5 h-5 text-emerald-600" />;
    if (tool.icon === 'Globe') return <Globe className="w-5 h-5 text-cyan-600" />;
    return <Sparkles className="w-5 h-5 text-purple-600" />;
  };

  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors pb-16">
      
      {/* KHU VỰC ĐẦU TRANG & THANH TÌM KIẾM THEO DANH MỤC */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 pt-6 pb-8 transition-colors">
        <div className={`w-full mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${isExpanded ? 'max-w-[98%]' : 'max-w-7xl'}`}>
          
          {/* Breadcrumb phân cấp */}
          <nav className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 mb-4 font-medium">
            <button onClick={onNavigateHome} className="hover:text-indigo-600 transition-colors">
              Trang chủ
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-900 dark:text-white font-semibold">
              {pageMeta.crumb}
            </span>
          </nav>

          {/* Tiêu đề & mô tả danh mục */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight mb-2">
            {pageMeta.title}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed mb-6">
            {pageMeta.desc}
          </p>

          {/* Ô tìm kiếm theo danh mục với nút tím nổi bật */}
          <div className="max-w-3xl relative mb-4">
            <div className="relative flex items-center p-1.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 shadow-sm focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/10">
              <Search className="w-5 h-5 ml-3.5 text-slate-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Nhập tên công cụ, mô tả hoặc từ khóa..."
                className="w-full px-3 py-2.5 bg-transparent text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 mr-2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setCurrentPage(1)}
                className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-indigo-600/20 shrink-0 transition-colors"
              >
                Tìm kiếm
              </button>
            </div>
          </div>

          {/* Hàng tag lọc nhanh (Phổ biến, Mới nhất, Đánh giá cao, Miễn phí, Trả phí) */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'Tất cả' },
              { id: 'popular', label: 'Phổ biến' },
              { id: 'latest', label: 'Mới nhất' },
              { id: 'top_rated', label: 'Đánh giá cao' },
              { id: 'free', label: 'Miễn phí' },
              { id: 'paid', label: 'Trả phí' },
            ].map((tag) => (
              <button
                key={tag.id}
                onClick={() => {
                  setSelectedQuickTag(tag.id as any);
                  setCurrentPage(1);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  selectedQuickTag === tag.id
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-300'
                }`}
              >
                {tag.label}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* BỐ CỤC 2 CỘT: CỘT TRÁI (BỘ LỌC) + CỘT PHẢI (DANH SÁCH TÀI NGUYÊN) */}
      <div className={`w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8 items-start transition-all duration-300 ${isExpanded ? 'max-w-[98%]' : 'max-w-7xl'}`}>
        
        {/* CỘT TRÁI: BỘ LỌC CHI TIẾT (FILTER SIDEBAR) */}
        <aside className="hidden lg:block w-64 shrink-0 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <span className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center space-x-1.5">
              <Filter className="w-4 h-4 text-indigo-600" />
              <span>Bộ lọc</span>
            </span>
            <button
              onClick={handleResetFilters}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center space-x-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Đặt lại</span>
            </button>
          </div>

          {/* Nhóm Danh mục */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2.5">
              Lĩnh vực ứng dụng
            </h4>
            <div className="space-y-1.5 text-xs">
              {[
                { id: 'all' as Category | 'all', label: 'Tất cả' },
                { id: 'coding' as Category, label: 'Lập trình & phát triển' },
                { id: 'content' as Category, label: 'Viết & sáng tạo nội dung' },
                { id: 'database' as Category, label: 'Phân tích dữ liệu' },
                { id: 'automation' as Category, label: 'Tự động hóa quy trình' },
                { id: 'search' as Category, label: 'Nghiên cứu & tìm kiếm' },
                { id: 'vietnam' as Category, label: '🇻🇳 Thị trường Việt Nam' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setCurrentPage(1);
                  }}
                  className={`w-full flex items-center justify-between py-1.5 px-2.5 rounded-lg transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="truncate">{cat.label}</span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {categoryCounts[cat.id] || 0}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Nhóm Mô hình giá */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2.5">
              Mô hình giá
            </h4>
            <div className="space-y-1.5 text-xs">
              {[
                { id: 'all', label: 'Tất cả' },
                { id: 'free', label: 'Miễn phí mã nguồn mở' },
                { id: 'paid', label: 'Trả phí dịch vụ' },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setSelectedPricing(p.id as any);
                    setCurrentPage(1);
                  }}
                  className={`w-full flex items-center justify-between py-1.5 px-2.5 rounded-lg transition-colors ${
                    selectedPricing === p.id
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{p.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Nhóm Đánh giá sao */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2.5">
              Đánh giá chất lượng
            </h4>
            <div className="space-y-1.5 text-xs">
              {[
                { rating: 0, label: 'Tất cả đánh giá' },
                { rating: 4.5, label: '⭐ 4.5 sao trở lên' },
                { rating: 4.0, label: '⭐ 4.0 sao trở lên' },
              ].map((r) => (
                <button
                  key={r.rating}
                  onClick={() => {
                    setMinRating(r.rating);
                    setCurrentPage(1);
                  }}
                  className={`w-full flex items-center justify-between py-1.5 px-2.5 rounded-lg transition-colors ${
                    minRating === r.rating
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{r.label}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setCurrentPage(1)}
            className="w-full py-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 text-indigo-600 dark:text-indigo-300 font-bold text-xs transition-colors border border-indigo-200 dark:border-indigo-800"
          >
            Áp dụng bộ lọc
          </button>
        </aside>

        {/* CỘT PHẢI: KẾT QUẢ DANH SÁCH TÀI NGUYÊN (RESOURCE GRID) */}
        <main className="flex-1 min-w-0">
          
          {/* Thanh tiêu đề kết quả & Sắp xếp */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>
              <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Hiển thị <strong>{filteredTools.length > 0 ? (currentPage - 1) * PAGE_SIZE + 1 : 0}</strong> -{' '}
                <strong>{Math.min(currentPage * PAGE_SIZE, filteredTools.length)}</strong> trong{' '}
                <strong>{filteredTools.length.toLocaleString()}</strong> kết quả
              </span>
            </div>

            <div className="flex items-center space-x-2 text-xs">
              <span className="text-slate-400">Sắp xếp:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none"
              >
                <option value="popular">Phổ biến nhất</option>
                <option value="rating">Đánh giá cao nhất</option>
              </select>
            </div>
          </div>

          {/* Lưới thẻ sản phẩm 2 cột giống hình ảnh demo */}
          {paginatedTools.length > 0 ? (
            <>
              <div className={`grid gap-5 mb-8 ${isExpanded ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'}`}>
                {paginatedTools.map((tool) => {
                  const isSaved = savedToolIds.includes(tool.id);
                  return (
                    <div
                      key={tool.id}
                      onClick={() => onSelectTool(tool)}
                      className="group flex flex-col justify-between p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-700 transition-all cursor-pointer relative"
                    >
                      <div>
                        {/* Header thẻ: Logo vuông bo góc + Tên + Badge danh mục + Nút lưu yêu thích */}
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800 flex items-center justify-center shrink-0">
                              {renderIcon(tool)}
                            </div>
                            <div>
                              <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                                {tool.name}
                              </h3>
                              <div className="flex items-center space-x-2 mt-0.5">
                                <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
                                  {tool.categoryNameVi}
                                </span>
                                <span className="text-slate-300">•</span>
                                <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400">
                                  {tool.license.includes('MIT') ? 'Miễn phí' : 'Mã nguồn mở'}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Nút lưu vào bộ sưu tập */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleSaveTool(tool.id);
                            }}
                            className={`p-1.5 rounded-lg border transition-colors ${
                              isSaved
                                ? 'bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-950 dark:border-indigo-800 dark:text-indigo-400'
                                : 'border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                            title={isSaved ? "Bỏ lưu tài nguyên" : "Lưu vào bộ sưu tập"}
                          >
                            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                          </button>
                        </div>

                        {/* Mô tả ngắn 2 dòng */}
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-2 min-h-[32px]">
                          {tool.summaryVi}
                        </p>
                      </div>

                      {/* Footer thẻ: Đánh giá sao, giá và nút Chi tiết -> */}
                      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-3">
                          <span className="font-bold text-amber-500 flex items-center space-x-1">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span>{tool.stars ? (tool.stars >= 1000 ? `${(tool.stars / 1000).toFixed(1)}k` : tool.stars) : '4.8'}</span>
                          </span>
                          <span className="text-[11px] text-slate-400">
                            {tool.license.includes('MIT') ? 'Miễn phí' : 'Mã nguồn mở'}
                          </span>
                        </div>

                        <div className="inline-flex items-center space-x-1 font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-0.5 transition-transform">
                          <span>Chi tiết</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Phân trang */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center space-x-2 py-6 border-t border-slate-200 dark:border-slate-800">
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNum = i + 1;
                      const isActive = currentPage === pageNum;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => {
                            setCurrentPage(pageNum);
                            window.scrollTo({ top: 300, behavior: 'smooth' });
                          }}
                          className={`w-9 h-9 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                            isActive
                              ? 'bg-indigo-600 text-white shadow-sm font-bold'
                              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center">
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
                Không tìm thấy kết quả phù hợp
              </p>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
              >
                Đặt lại bộ lọc
              </button>
            </div>
          )}

        </main>
      </div>

    </div>
  );
};
