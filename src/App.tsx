import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ToolCard } from './components/ToolCard';
import { ToolDetailModal } from './components/ToolDetailModal';
import { ContributeModal } from './components/ContributeModal';
import { DevLifecycleModal } from './components/DevLifecycleModal';
import { TerminalDrawer } from './components/TerminalDrawer';
import { INITIAL_TOOLS, CATEGORIES } from './data/mockTools';
import { AITool, Category, Platform, ToolType } from './types';
import { SearchX, ChevronLeft, ChevronRight, Layers, Sparkles, Cpu, Terminal, Brain, FolderGit2, Wrench, Workflow } from 'lucide-react';

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
  const [pendingTerminalCommand, setPendingTerminalCommand] = useState<string | null>(null);

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

      {/* Khu vực danh mục và nội dung chính */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Hàng 1: Tabs phân loại rạch ròi giữa Template, Skill, Agent, Command, MCP, Hook, Setting */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Phân loại công cụ & thành phần (Tách biệt rõ ràng):
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {toolTypeTabs.map((tab) => {
              const isSelected = selectedType === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedType(tab.id)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-500/30'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-850'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.name}</span>
                  <span className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected
                      ? 'bg-blue-700 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Hàng 2: Thanh lọc theo lĩnh vực chuyên môn */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-2xl text-xs sm:text-sm font-medium transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {cat.nameVi}
              </button>
            );
          })}
        </div>

        {/* Tiêu đề danh mục, số lượng kết quả và phân trang nhanh */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center space-x-2">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
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

          <div className="flex items-center space-x-3 text-xs">
            {(searchQuery || selectedCategory !== 'all' || selectedPlatform !== 'all' || selectedType !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedPlatform('all');
                  setSelectedType('all');
                }}
                className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Đặt lại bộ lọc
              </button>
            )}

            {filteredTools.length > 0 && (
              <span className="text-slate-500 dark:text-slate-400">
                Hiển thị trang <strong>{currentPage}</strong> / {totalPages}
              </span>
            )}
          </div>
        </div>

        {/* Lưới hiển thị các thẻ công cụ */}
        {paginatedTools.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
                  <span>Trang trước</span>
                </button>

                <div className="flex items-center space-x-1">
                  {/* Hiển thị số trang */}
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum = i + 1;
                    if (currentPage > 3 && totalPages > 5) {
                      pageNum = currentPage - 2 + i;
                      if (pageNum > totalPages) pageNum = totalPages - (4 - i);
                    }
                    const isCurrent = pageNum === currentPage;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-9 h-9 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                          isCurrent
                            ? 'bg-blue-600 text-white'
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
                  <span>Trang sau</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        ) : (
          /* Trạng thái rỗng (Empty State) */
          <div className="text-center py-16 px-4 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mx-auto mb-4">
              <SearchX className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Không tìm thấy công cụ phù hợp
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
              Không có mục nào khớp với từ khóa "{searchQuery}" hoặc các bộ lọc đã chọn. Hãy thử tìm bằng từ khóa khác hoặc đóng góp công cụ mới.
            </p>
            <div className="flex items-center justify-center space-x-3">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedPlatform('all');
                  setSelectedType('all');
                }}
                className="px-4 py-2 rounded-xl text-sm font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
              >
                Đặt lại bộ lọc
              </button>
              <button
                onClick={() => setIsContributeOpen(true)}
                className="px-4 py-2 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700"
              >
                Đóng góp công cụ
              </button>
            </div>
          </div>
        )}
      </main>

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
