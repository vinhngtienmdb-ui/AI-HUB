import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { MainCategoryCards } from './components/MainCategoryCards';
import { FeaturedResources } from './components/FeaturedResources';
import { BrowseByNeeds } from './components/BrowseByNeeds';
import { ToolCard } from './components/ToolCard';
import { ToolDetailModal } from './components/ToolDetailModal';
import { ContributeModal } from './components/ContributeModal';
import { DevLifecycleModal } from './components/DevLifecycleModal';
import { LoginModal } from './components/LoginModal';
import { TerminalDrawer } from './components/TerminalDrawer';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { INITIAL_TOOLS, CATEGORIES } from './data/mockTools';
import { AITool, Category, Platform, ToolType } from './types';
import { 
  SearchX, ChevronLeft, ChevronRight, Layers, Sparkles, Cpu, Terminal, Brain, 
  FolderGit2, Wrench, Workflow, SlidersHorizontal, X, LayoutGrid, List, 
  Maximize2, Minimize2, PanelLeftClose, PanelLeft, Star, ExternalLink, ArrowRight 
} from 'lucide-react';

const PAGE_SIZE = 24;

export const App: React.FC = () => {
  const [tools, setTools] = useState<AITool[]>(INITIAL_TOOLS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | 'all'>('all');
  const [selectedType, setSelectedType] = useState<ToolType | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTool, setSelectedTool] = useState<AITool | null>(null);
  const [isContributeOpen, setIsContributeOpen] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [pendingTerminalCommand, setPendingTerminalCommand] = useState<string | null>(null);

  // Trạng thái mở rộng khung làm việc và chế độ hiển thị
  const [isExpandedCanvas, setIsExpandedCanvas] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedPlatform('all');
    setSelectedType('all');
    setCurrentPage(1);
    setIsMobileSidebarOpen(false);
  };

  const handleExecuteCommand = (command: string) => {
    setPendingTerminalCommand(command);
    setIsTerminalOpen(true);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Đặt lại trang 1 khi thay đổi điều kiện tìm kiếm/lọc
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedPlatform, selectedType]);

  // Thống kê số lượng từng loại hình
  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = { all: tools.length };
    for (const t of tools) {
      counts[t.toolType] = (counts[t.toolType] || 0) + 1;
    }
    return counts;
  }, [tools]);

  // Bộ lọc tìm kiếm và danh mục
  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      // Lọc theo từ khóa (hỗ trợ tiếng Việt không dấu và chữ thường)
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.summaryVi.toLowerCase().includes(q) ||
        tool.purposeVi.toLowerCase().includes(q) ||
        tool.authorName.toLowerCase().includes(q);

      // Lọc theo danh mục
      const matchCategory = selectedCategory === 'all' || tool.category === selectedCategory;

      // Lọc theo loại hình tách biệt hoàn toàn
      const matchType = selectedType === 'all' || tool.toolType === selectedType;

      // Lọc theo nền tảng
      const matchPlatform = selectedPlatform === 'all' || tool.platforms.includes(selectedPlatform);

      return matchQuery && matchCategory && matchType && matchPlatform;
    });
  }, [tools, searchQuery, selectedCategory, selectedType, selectedPlatform]);

  // Phân trang
  const totalPages = Math.ceil(filteredTools.length / PAGE_SIZE) || 1;
  const paginatedTools = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredTools.slice(start, start + PAGE_SIZE);
  }, [filteredTools, currentPage]);

  const handleAddNewTool = (newTool: AITool) => {
    setTools([newTool, ...tools]);
  };

  // Danh sách các tab loại hình tách biệt hoàn toàn
  const toolTypeTabs: { id: ToolType | 'all'; name: string; count: number; icon: any }[] = [
    { id: 'all', name: 'Tất cả', count: typeCounts.all || 0, icon: Layers },
    { id: 'skill', name: 'Kỹ năng (Skills)', count: typeCounts.skill || 0, icon: Sparkles },
    { id: 'workflow', name: 'Quy trình (Workflows)', count: typeCounts.workflow || 0, icon: Workflow },
    { id: 'template', name: 'Bản mẫu (Templates)', count: typeCounts.template || 0, icon: FolderGit2 },
    { id: 'agent', name: 'Tác tử (Agents)', count: typeCounts.agent || 0, icon: Brain },
    { id: 'command', name: 'Lệnh (Commands)', count: typeCounts.command || 0, icon: Terminal },
    { id: 'mcp', name: 'Máy chủ MCP', count: typeCounts.mcp || 0, icon: Cpu },
    { id: 'hook', name: 'Móc nối (Hooks)', count: typeCounts.hook || 0, icon: Wrench },
    { id: 'setting', name: 'Cấu hình (Settings)', count: typeCounts.setting || 0, icon: Wrench },
  ];

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const el = document.getElementById('browse-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToBrowse = () => {
    const el = document.getElementById('browse-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* 4.1: THANH ĐIỀU HƯỚNG CHUẨN MỰC */}
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenContribute={() => setIsContributeOpen(true)}
        onOpenDocs={() => setIsDocsOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
        currentUser={currentUser}
        onSelectType={(type) => {
          setSelectedType(type);
          handleScrollToBrowse();
        }}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          handleScrollToBrowse();
        }}
        onToggleTerminal={() => setIsTerminalOpen(!isTerminalOpen)}
        isTerminalOpen={isTerminalOpen}
        toolCount={tools.length}
      />

      {/* 4.2: KHU VỰC GIỚI THIỆU CHÍNH (HERO SECTION ĐẸP MẮT THEO ẢNH DEMO) */}
      <HeroSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={(cat) => {
          setSelectedCategory(cat);
          handleScrollToBrowse();
        }}
        onSearchSubmit={handleScrollToBrowse}
      />

      {/* 4.3: BA THẺ NHÓM TÀI NGUYÊN CHÍNH (CÔNG CỤ AI • MCP SERVERS • AGENT SKILLS) */}
      <MainCategoryCards
        onSelectType={(type) => {
          setSelectedType(type);
          handleScrollToBrowse();
        }}
      />

      {/* 4.4: KHÁM PHÁ TÀI NGUYÊN NỔI BẬT (GITHUB COPILOT • FILESYSTEM MCP • CODE REVIEW) */}
      <FeaturedResources
        tools={tools}
        onSelectTool={(tool) => setSelectedTool(tool)}
        onViewAll={() => {
          setSelectedType('all');
          setSelectedCategory('all');
          handleScrollToBrowse();
        }}
      />

      {/* 4.5: KHÁM PHÁ THEO NHU CẦU CÔNG VIỆC */}
      <BrowseByNeeds
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          handleScrollToBrowse();
        }}
      />

      {/* PHẦN 4.6 & KHÁM PHÁ TOÀN DIỆN KHO TÀI NGUYÊN AI (1.930+ MỤC) */}
      <div id="browse-section" className="pt-6">
        <div className={`flex-1 w-full mx-auto px-3 sm:px-6 lg:px-8 py-6 flex gap-6 relative items-start transition-all duration-300 ${
          isExpandedCanvas ? 'max-w-[98%]' : 'max-w-7xl'
        }`}>
          
          {/* CỘT TRÁI: Left Sidebar trên màn hình máy tính (lg+) - Có thể thu gọn để mở rộng không gian */}
          {!isSidebarCollapsed && (
            <div className="hidden lg:block sticky top-20 h-[calc(100vh-6rem)] overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 transition-all duration-300 shrink-0">
              <Sidebar
                selectedType={selectedType}
                setSelectedType={setSelectedType}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedPlatform={selectedPlatform}
                setSelectedPlatform={setSelectedPlatform}
                typeCounts={typeCounts}
                categories={CATEGORIES}
                totalTools={tools.length}
                onOpenDocs={() => setIsDocsOpen(true)}
                onOpenTerminal={() => setIsTerminalOpen(true)}
                onResetFilters={handleResetFilters}
              />
            </div>
          )}

          {/* CỘT PHẢI: Toàn bộ nội dung công cụ, phân trang và lưới thẻ / bảng danh sách */}
          <main className="flex-1 min-w-0 transition-all duration-300">
            
            {/* Thanh tiêu đề danh mục, công cụ mở rộng không gian và chuyển đổi chế độ xem */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center space-x-2.5">
                <button
                  onClick={() => setIsMobileSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  title="Mở bảng bộ lọc danh mục"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                </button>

                {/* Nút thu gọn / mở rộng Sidebar trên Desktop */}
                <button
                  onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                  className="hidden lg:flex p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors items-center space-x-1"
                  title={isSidebarCollapsed ? "Mở rộng thanh bên" : "Thu gọn thanh bên để mở rộng không gian"}
                >
                  {isSidebarCollapsed ? <PanelLeft className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
                </button>

                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                      {selectedType !== 'all'
                        ? toolTypeTabs.find((t) => t.id === selectedType)?.name
                        : selectedCategory === 'all'
                        ? 'Kho Tài Nguyên & Thành Phần AI'
                        : CATEGORIES.find((c) => c.id === selectedCategory)?.nameVi}
                    </h2>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-bold">
                      {filteredTools.length.toLocaleString()} mục
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 hidden sm:block">
                    {selectedCategory === 'vietnam' 
                      ? 'Bộ công cụ, máy chủ MCP và kỹ năng tối ưu hóa riêng cho thị trường Việt Nam'
                      : 'Tra cứu, cấu hình và sử dụng công cụ AI kèm hướng dẫn chuẩn 4 bước tiếng Việt'}
                  </p>
                </div>
              </div>

              {/* Bộ công cụ mở rộng khung làm việc và chuyển chế độ xem */}
              <div className="flex items-center space-x-2.5 text-xs shrink-0">
                
                {/* Nút chuyển đổi Lưới Thẻ / Bảng Danh Sách */}
                <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-lg transition-all ${
                      viewMode === 'grid'
                        ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm font-semibold'
                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                    title="Chế độ xem Thẻ (Grid)"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('table')}
                    className={`p-1.5 rounded-lg transition-all ${
                      viewMode === 'table'
                        ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm font-semibold'
                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                    title="Chế độ xem Bảng chi tiết mở rộng (List/Table)"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

                {/* Nút mở rộng toàn màn hình (Canvas Width Toggle) */}
                <button
                  onClick={() => setIsExpandedCanvas(!isExpandedCanvas)}
                  className={`p-2 rounded-xl border transition-all flex items-center space-x-1.5 ${
                    isExpandedCanvas
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-300 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 font-bold'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750'
                  }`}
                  title={isExpandedCanvas ? "Thu gọn về chiều rộng chuẩn" : "Mở rộng khung làm việc toàn màn hình"}
                >
                  {isExpandedCanvas ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  <span className="hidden md:inline">{isExpandedCanvas ? 'Thu gọn' : 'Mở rộng khung'}</span>
                </button>

                {(searchQuery || selectedCategory !== 'all' || selectedPlatform !== 'all' || selectedType !== 'all') && (
                  <button
                    onClick={handleResetFilters}
                    className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline px-1"
                  >
                    Đặt lại
                  </button>
                )}

                {filteredTools.length > 0 && (
                  <span className="text-slate-500 dark:text-slate-400 pl-1 border-l border-slate-200 dark:border-slate-700">
                    Trang <strong>{currentPage}</strong>/{totalPages}
                  </span>
                )}
              </div>
            </div>

            {/* HIỂN THỊ CÔNG CỤ THEO CHẾ ĐỘ ĐƯỢC CHỌN */}
            {paginatedTools.length > 0 ? (
              <>
                {viewMode === 'grid' ? (
                  /* CHẾ ĐỘ 1: LƯỚI THẺ (Hỗ trợ 3 hoặc 4 cột tùy độ rộng khung làm việc) */
                  <div className={`grid grid-cols-1 md:grid-cols-2 gap-5 mb-8 ${
                    isExpandedCanvas ? 'xl:grid-cols-3 2xl:grid-cols-4' : 'xl:grid-cols-3'
                  }`}>
                    {paginatedTools.map((tool) => (
                      <ToolCard
                        key={tool.id}
                        tool={tool}
                        onSelect={(t) => setSelectedTool(t)}
                      />
                    ))}
                  </div>
                ) : (
                  /* CHẾ ĐỘ 2: BẢNG DANH SÁCH CHI TIẾT MỞ RỘNG */
                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm mb-8">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 dark:bg-slate-850/80 border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          <tr>
                            <th className="py-3.5 px-4">Tên Công Cụ / Thành Phần</th>
                            <th className="py-3.5 px-3">Loại hình</th>
                            <th className="py-3.5 px-3">Lĩnh vực</th>
                            <th className="py-3.5 px-3">Đánh giá</th>
                            <th className="py-3.5 px-3">Tác giả</th>
                            <th className="py-3.5 px-4 min-w-[260px]">Tóm tắt công dụng</th>
                            <th className="py-3.5 px-4 text-right">Thao tác</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                          {paginatedTools.map((tool) => (
                            <tr 
                              key={tool.id}
                              onClick={() => setSelectedTool(tool)}
                              className="hover:bg-slate-50/80 dark:hover:bg-slate-850/50 cursor-pointer transition-colors group"
                            >
                              <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                                <div className="flex items-center space-x-2.5">
                                  <span className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/40 text-xs font-mono">
                                    {tool.toolType.substring(0, 3).toUpperCase()}
                                  </span>
                                  <span className="line-clamp-1">{tool.name}</span>
                                </div>
                              </td>
                              <td className="py-3.5 px-3 whitespace-nowrap">
                                <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                                  {tool.typeNameVi}
                                </span>
                              </td>
                              <td className="py-3.5 px-3 whitespace-nowrap text-xs text-slate-600 dark:text-slate-400">
                                {tool.categoryNameVi}
                              </td>
                              <td className="py-3.5 px-3 whitespace-nowrap">
                                {tool.stars ? (
                                  <span className="text-xs font-bold text-amber-500 flex items-center space-x-1">
                                    <Star className="w-3.5 h-3.5 fill-current" />
                                    <span>{tool.stars >= 1000 ? `${(tool.stars / 1000).toFixed(1)}k` : tool.stars}</span>
                                  </span>
                                ) : (
                                  <span className="text-xs text-slate-400">—</span>
                                )}
                              </td>
                              <td className="py-3.5 px-3 whitespace-nowrap text-xs text-slate-500 dark:text-slate-400">
                                {tool.authorName}
                              </td>
                              <td className="py-3.5 px-4 text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                                {tool.summaryVi}
                              </td>
                              <td className="py-3.5 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                                <div className="inline-flex items-center space-x-2">
                                  <a
                                    href={tool.sourceUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                    title="Mở liên kết nguồn chính thức"
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                  </a>
                                  <button
                                    onClick={() => setSelectedTool(tool)}
                                    className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:hover:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 text-xs font-semibold transition-colors"
                                  >
                                    <span>Chi tiết</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Điều hướng phân trang */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center space-x-2 py-6 border-t border-slate-200 dark:border-slate-800">
                    <button
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="flex items-center space-x-1 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span className="hidden sm:inline">Trang trước</span>
                    </button>

                    <div className="flex items-center space-x-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum = i + 1;
                        if (totalPages > 5 && currentPage > 3) {
                          pageNum = currentPage - 2 + i;
                          if (pageNum > totalPages) pageNum = totalPages - 4 + i;
                        }
                        const isActive = currentPage === pageNum;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`w-9 h-9 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                              isActive
                                ? 'bg-indigo-600 text-white shadow-sm font-bold'
                                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="flex items-center space-x-1 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <span className="hidden sm:inline">Trang sau</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            ) : (
              /* Trạng thái không tìm thấy kết quả */
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                  <SearchX className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                  Không tìm thấy công cụ phù hợp
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">
                  Không có mục nào phù hợp với từ khóa <strong className="text-slate-800 dark:text-slate-200">"{searchQuery}"</strong> trong danh mục đã chọn.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm transition-colors"
                >
                  Xóa bộ lọc & Xem tất cả công cụ
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* DRAWER BỘ LỌC CHO THIẾT BỊ DI ĐỘNG */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileSidebarOpen(false)}
          />

          <div className="relative ml-auto w-full max-w-xs bg-white dark:bg-slate-900 h-full shadow-2xl p-4 overflow-y-auto flex flex-col z-10 animate-slideLeft">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-3">
              <span className="font-bold text-sm text-slate-900 dark:text-white">Bộ lọc danh mục</span>
              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <Sidebar
              selectedType={selectedType}
              setSelectedType={(t) => {
                setSelectedType(t);
                setIsMobileSidebarOpen(false);
              }}
              selectedCategory={selectedCategory}
              setSelectedCategory={(c) => {
                setSelectedCategory(c);
                setIsMobileSidebarOpen(false);
              }}
              selectedPlatform={selectedPlatform}
              setSelectedPlatform={(p) => {
                setSelectedPlatform(p);
                setIsMobileSidebarOpen(false);
              }}
              typeCounts={typeCounts}
              categories={CATEGORIES}
              totalTools={tools.length}
              onOpenDocs={() => {
                setIsDocsOpen(true);
                setIsMobileSidebarOpen(false);
              }}
              onOpenTerminal={() => {
                setIsTerminalOpen(true);
                setIsMobileSidebarOpen(false);
              }}
              onResetFilters={handleResetFilters}
            />
          </div>
        </div>
      )}

      {/* 4.6: CHÂN TRANG ĐẦY ĐỦ THÔNG TIN NỀN TẢNG & MÃ NGUỒN MỞ */}
      <Footer
        onOpenDocs={() => setIsDocsOpen(true)}
        onOpenContribute={() => setIsContributeOpen(true)}
        onSelectType={(type) => {
          setSelectedType(type);
          handleScrollToBrowse();
        }}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          handleScrollToBrowse();
        }}
      />

      {/* CÁC CỬA SỔ MODAL THÔNG TIN */}
      <ToolDetailModal
        tool={selectedTool}
        onClose={() => setSelectedTool(null)}
        onExecuteCommand={handleExecuteCommand}
      />

      <ContributeModal
        isOpen={isContributeOpen}
        onClose={() => setIsContributeOpen(false)}
        onSubmit={handleAddNewTool}
      />

      <DevLifecycleModal
        isOpen={isDocsOpen}
        onClose={() => setIsDocsOpen(false)}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={(email) => setCurrentUser(email)}
      />

      {/* CỬA SỔ THIẾT BỊ ĐẦU CUỐI THỰC THI LỆNH CỤC BỘ */}
      <TerminalDrawer
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        pendingCommand={pendingTerminalCommand}
        onClearPendingCommand={() => setPendingTerminalCommand(null)}
      />
    </div>
  );
};
