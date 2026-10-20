import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ToolCard } from './components/ToolCard';
import { ToolDetailModal } from './components/ToolDetailModal';
import { ContributeModal } from './components/ContributeModal';
import { DevLifecycleModal } from './components/DevLifecycleModal';
import { TerminalDrawer } from './components/TerminalDrawer';
import { Sidebar } from './components/Sidebar';
import { INITIAL_TOOLS, CATEGORIES } from './data/mockTools';
import { AITool, Category, Platform, ToolType } from './types';
import { SearchX, ChevronLeft, ChevronRight, Layers, Sparkles, Cpu, Terminal, Brain, FolderGit2, Wrench, Workflow, SlidersHorizontal, X } from 'lucide-react';

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
  const [darkMode, setDarkMode] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [pendingTerminalCommand, setPendingTerminalCommand] = useState<string | null>(null);

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
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Đầu trang */}
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenContribute={() => setIsContributeOpen(true)}
        onOpenDocs={() => setIsDocsOpen(true)}
        onToggleTerminal={() => setIsTerminalOpen(!isTerminalOpen)}
        isTerminalOpen={isTerminalOpen}
        toolCount={tools.length}
      />

      {/* Banner & Tìm kiếm trung tâm */}
      <HeroSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedPlatform={selectedPlatform}
        setSelectedPlatform={setSelectedPlatform}
      />

      {/* Bố cục 2 cột chuyên nghiệp: Left Sidebar cố định + Khu vực nội dung công cụ */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex gap-6 relative items-start">
        
        {/* CỘT TRÁI: Left Sidebar trên màn hình máy tính (lg+) */}
        <div className="hidden lg:block sticky top-20 h-[calc(100vh-6rem)] overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
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

        {/* CỘT PHẢI: Toàn bộ nội dung công cụ, phân trang và lưới thẻ */}
        <main className="flex-1 min-w-0">
          
          {/* Thanh tiêu đề danh mục, số lượng kết quả và nút mở bộ lọc trên di động */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center space-x-2.5">
              <button
                onClick={() => setIsMobileSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                title="Mở bảng bộ lọc danh mục"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>

              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {selectedType !== 'all'
                      ? toolTypeTabs.find((t) => t.id === selectedType)?.name
                      : selectedCategory === 'all'
                      ? 'Tất Cả Thành Phần & Công Cụ'
                      : CATEGORIES.find((c) => c.id === selectedCategory)?.nameVi}
                  </h2>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-bold">
                    {filteredTools.length.toLocaleString()} mục
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 hidden sm:block">
                  {selectedCategory === 'vietnam' 
                    ? 'Bộ công cụ, máy chủ MCP và kỹ năng tối ưu hóa riêng cho thị trường Việt Nam'
                    : 'Tra cứu, xem ảnh demo chi tiết và thực thi lệnh cài đặt một chạm'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-xs shrink-0">
              {(searchQuery || selectedCategory !== 'all' || selectedPlatform !== 'all' || selectedType !== 'all') && (
                <button
                  onClick={handleResetFilters}
                  className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Đặt lại bộ lọc
                </button>
              )}

              {filteredTools.length > 0 && (
                <span className="text-slate-500 dark:text-slate-400">
                  Trang <strong>{currentPage}</strong> / {totalPages}
                </span>
              )}
            </div>
          </div>

          {/* Lưới hiển thị các thẻ công cụ có ảnh demo */}
          {paginatedTools.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-8">
                {paginatedTools.map((tool) => (
                  <ToolCard
                    key={tool.id}
                    tool={tool}
                    onSelect={(t) => setSelectedTool(t)}
                  />
                ))}
              </div>

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
                          className={`w-8 h-8 rounded-xl text-xs font-semibold transition-all ${
                            isActive
                              ? 'bg-blue-600 text-white shadow-sm'
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
                    <span className="hidden sm:inline">Trang tiếp</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
              <SearchX className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-1">
                Không tìm thấy công cụ nào
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-5">
                Không có công cụ nào khớp với từ khóa "{searchQuery}" trong bộ lọc hiện tại. Hãy thử tìm từ khóa khác hoặc đặt lại bộ lọc.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow-sm transition-all"
              >
                Đặt lại bộ lọc
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Drawer trượt mở Sidebar trên màn hình di động/tablet (< lg) */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          <div className="relative w-80 max-w-[85vw] h-full bg-white dark:bg-slate-900 shadow-2xl flex flex-col z-10">
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
              <span className="font-bold text-sm text-slate-900 dark:text-white">Bộ lọc & Danh mục</span>
              <button 
                onClick={() => setIsMobileSidebarOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <Sidebar
                selectedType={selectedType}
                setSelectedType={(t) => { setSelectedType(t); setIsMobileSidebarOpen(false); }}
                selectedCategory={selectedCategory}
                setSelectedCategory={(c) => { setSelectedCategory(c); setIsMobileSidebarOpen(false); }}
                selectedPlatform={selectedPlatform}
                setSelectedPlatform={(p) => { setSelectedPlatform(p); setIsMobileSidebarOpen(false); }}
                typeCounts={typeCounts}
                categories={CATEGORIES}
                totalTools={tools.length}
                onOpenDocs={() => { setIsDocsOpen(true); setIsMobileSidebarOpen(false); }}
                onOpenTerminal={() => { setIsTerminalOpen(true); setIsMobileSidebarOpen(false); }}
                onResetFilters={handleResetFilters}
              />
            </div>
          </div>
        </div>
      )}

      {/* Chân trang */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-8 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-700 dark:text-slate-300">AI Hub Việt Nam</span>
            <span>•</span>
            <span>Kho Lưu Trữ 1.900+ Công Cụ AI, MCP, Kỹ Năng & Bản Mẫu Chuẩn Hóa</span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsDocsOpen(true)}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Tài liệu VibeCode (22 tệp)
            </button>
            <a
              href="https://github.com/davila7/claude-code-templates"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Claude Code Templates
            </a>
            <a
              href="https://mcpmarket.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              MCP Market
            </a>
          </div>
        </div>
      </footer>

      {/* Các cửa sổ Modal */}
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

      {/* Cửa sổ Thiết bị đầu cuối thực thi lệnh cục bộ */}
      <TerminalDrawer
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        pendingCommand={pendingTerminalCommand}
        onClearPendingCommand={() => setPendingTerminalCommand(null)}
      />
    </div>
  );
};
