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

// CÁC TRANG TRONG BỘ GIAO DIỆN CHI TIẾT AI HUB VN
import { CategoryPage } from './pages/CategoryPage';
import { DetailPage } from './pages/DetailPage';
import { ContributePage } from './pages/ContributePage';
import { CollectionsPage } from './pages/CollectionsPage';
import { GuidesPage } from './pages/GuidesPage';
import { AccountPage } from './pages/AccountPage';

import { INITIAL_TOOLS, CATEGORIES } from './data/mockTools';
import { INITIAL_COLLECTIONS, INITIAL_GUIDES } from './data/mockGuidesAndCollections';
import { AITool, Category, Platform, ToolType, Collection, GuideArticle, PageRoute } from './types';
import { 
  SearchX, ChevronLeft, ChevronRight, Layers, Sparkles, Cpu, Terminal, Brain, 
  FolderGit2, Wrench, Workflow, SlidersHorizontal, X, LayoutGrid, List, 
  Maximize2, Minimize2, PanelLeftClose, PanelLeft, Star, ExternalLink, ArrowRight 
} from 'lucide-react';

const PAGE_SIZE = 24;

export const App: React.FC = () => {
  // Dữ liệu cốt lõi
  const [tools, setTools] = useState<AITool[]>(INITIAL_TOOLS);
  const [collections, setCollections] = useState<Collection[]>(() => {
    const saved = localStorage.getItem('aihub_collections');
    return saved ? JSON.parse(saved) : INITIAL_COLLECTIONS;
  });
  const [guides] = useState<GuideArticle[]>(INITIAL_GUIDES);
  const [savedToolIds, setSavedToolIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('aihub_saved_tool_ids');
    return saved ? JSON.parse(saved) : ['github-openhands-agent', 'github-browser-use-agent', 'github-vietnam-vietocr-tool'];
  });

  // Quản lý định tuyến trang hiện tại (Trang chủ, Danh mục, Chi tiết, Đóng góp, Bộ sưu tập, Hướng dẫn, Tài khoản)
  const [currentRoute, setCurrentRoute] = useState<PageRoute>({ name: 'home' });

  // Bộ lọc trang chủ
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | 'all'>('all');
  const [selectedType, setSelectedType] = useState<ToolType | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedModalTool, setSelectedModalTool] = useState<AITool | null>(null);

  // Trạng thái modal và tài khoản
  const [isContributeOpen, setIsContributeOpen] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(() => {
    return localStorage.getItem('aihub_user') || 'thanhvien@aihub.vn';
  });

  // Giao diện và Terminal
  const [darkMode, setDarkMode] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [pendingTerminalCommand, setPendingTerminalCommand] = useState<string | null>(null);
  const [isExpandedCanvas, setIsExpandedCanvas] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Lưu trạng thái vào localStorage
  useEffect(() => {
    localStorage.setItem('aihub_saved_tool_ids', JSON.stringify(savedToolIds));
  }, [savedToolIds]);

  useEffect(() => {
    localStorage.setItem('aihub_collections', JSON.stringify(collections));
  }, [collections]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // ĐỒNG BỘ ĐỊNH TUYẾN URL HASH VỚI BROWSER
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash || hash === '/') {
        setCurrentRoute({ name: 'home' });
      } else if (hash.startsWith('/category/')) {
        const type = hash.replace('/category/', '') as ToolType;
        setCurrentRoute({ name: 'category', toolType: type });
      } else if (hash.startsWith('/tool/')) {
        const toolId = hash.replace('/tool/', '');
        setCurrentRoute({ name: 'detail', toolId });
      } else if (hash === '/contribute') {
        setCurrentRoute({ name: 'contribute' });
      } else if (hash === '/collections') {
        setCurrentRoute({ name: 'collections' });
      } else if (hash === '/guides') {
        setCurrentRoute({ name: 'guides' });
      } else if (hash === '/account') {
        setCurrentRoute({ name: 'account' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Xử lý lần đầu khi tải trang

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Hàm chuyển route và cập nhật URL Hash
  const navigateTo = (route: PageRoute) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    switch (route.name) {
      case 'home':
        window.location.hash = '/';
        break;
      case 'category':
        window.location.hash = `/category/${route.toolType}`;
        break;
      case 'detail':
        window.location.hash = `/tool/${route.toolId}`;
        break;
      case 'contribute':
        window.location.hash = '/contribute';
        break;
      case 'collections':
        window.location.hash = '/collections';
        break;
      case 'guides':
        window.location.hash = '/guides';
        break;
      case 'account':
        window.location.hash = '/account';
        break;
    }
  };

  const handleToggleSaveTool = (toolId: string) => {
    setSavedToolIds((prev) => 
      prev.includes(toolId) ? prev.filter((id) => id !== toolId) : [...prev, toolId]
    );
  };

  const handleCreateCollection = (name: string, description: string, isPublic: boolean) => {
    const newCol: Collection = {
      id: `col-${Date.now()}`,
      name,
      description,
      toolIds: [],
      isPublic,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setCollections([newCol, ...collections]);
  };

  const handleDeleteCollection = (collectionId: string) => {
    setCollections(collections.filter((c) => c.id !== collectionId));
  };

  const handleExecuteCommand = (command: string) => {
    setPendingTerminalCommand(command);
    setIsTerminalOpen(true);
  };

  const handleAddNewTool = (newTool: AITool) => {
    setTools([newTool, ...tools]);
  };

  // Thống kê số lượng từng loại hình
  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = { all: tools.length };
    for (const t of tools) {
      counts[t.toolType] = (counts[t.toolType] || 0) + 1;
    }
    return counts;
  }, [tools]);

  // Bộ lọc danh mục trang chủ
  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        (tool.name || '').toLowerCase().includes(q) ||
        (tool.summaryVi || '').toLowerCase().includes(q) ||
        (tool.purposeVi || '').toLowerCase().includes(q) ||
        (tool.authorName || '').toLowerCase().includes(q);

      const matchCategory = selectedCategory === 'all' || tool.category === selectedCategory;
      const matchType = selectedType === 'all' || tool.toolType === selectedType;
      const matchPlatform = selectedPlatform === 'all' || (tool.platforms || []).includes(selectedPlatform);

      return matchQuery && matchCategory && matchType && matchPlatform;
    });
  }, [tools, searchQuery, selectedCategory, selectedType, selectedPlatform]);

  const totalPages = Math.ceil(filteredTools.length / PAGE_SIZE) || 1;
  const paginatedTools = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredTools.slice(start, start + PAGE_SIZE);
  }, [filteredTools, currentPage]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedPlatform('all');
    setSelectedType('all');
    setCurrentPage(1);
    setIsMobileSidebarOpen(false);
  };

  // Danh sách công cụ đã lưu
  const savedToolsList = useMemo(() => {
    return tools.filter((t) => savedToolIds.includes(t.id));
  }, [tools, savedToolIds]);

  // Tìm công cụ chi tiết khi route là 'detail'
  const currentDetailTool = useMemo(() => {
    if (currentRoute.name === 'detail') {
      return tools.find((t) => t.id === currentRoute.toolId || t.slug === currentRoute.toolId) || tools[0];
    }
    return null;
  }, [currentRoute, tools]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* THANH ĐIỀU HƯỚNG DÙNG CHUNG TOÀN HỆ THỐNG */}
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenContribute={() => navigateTo({ name: 'contribute' })}
        onOpenDocs={() => navigateTo({ name: 'guides' })}
        onOpenLogin={() => {
          if (currentUser) {
            navigateTo({ name: 'account' });
          } else {
            setIsLoginOpen(true);
          }
        }}
        currentUser={currentUser}
        onSelectType={(type) => navigateTo({ name: 'category', toolType: type })}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          navigateTo({ name: 'home' });
          setTimeout(() => {
            const el = document.getElementById('browse-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
        onToggleTerminal={() => setIsTerminalOpen(!isTerminalOpen)}
        isTerminalOpen={isTerminalOpen}
        toolCount={tools.length}
      />

      {/* RENDER NỘI DUNG THEO ĐỊNH TUYẾN TRANG */}
      
      {/* TRANG 1: TRANG DANH MỤC TÀI NGUYÊN (CATEGORY PAGE) */}
      {currentRoute.name === 'category' && (
        <CategoryPage
          toolType={currentRoute.toolType}
          tools={tools}
          onSelectTool={(tool) => navigateTo({ name: 'detail', toolId: tool.id })}
          onNavigateHome={() => navigateTo({ name: 'home' })}
          savedToolIds={savedToolIds}
          onToggleSaveTool={handleToggleSaveTool}
        />
      )}

      {/* TRANG 2: TRANG CHI TIẾT TÀI NGUYÊN (DETAIL PAGE CHUẨN MẪU) */}
      {currentRoute.name === 'detail' && currentDetailTool && (
        <DetailPage
          tool={currentDetailTool}
          allTools={tools}
          onNavigateHome={() => navigateTo({ name: 'home' })}
          onNavigateCategory={() => navigateTo({ name: 'category', toolType: currentDetailTool.toolType })}
          onSelectAlternative={(alt) => navigateTo({ name: 'detail', toolId: alt.id })}
          onExecuteCommand={handleExecuteCommand}
          isSaved={savedToolIds.includes(currentDetailTool.id)}
          onToggleSave={() => handleToggleSaveTool(currentDetailTool.id)}
        />
      )}

      {/* TRANG 3: TRANG ĐÓNG GÓP TÀI NGUYÊN (CONTRIBUTE PAGE CHUẨN MẪU) */}
      {currentRoute.name === 'contribute' && (
        <ContributePage
          onNavigateHome={() => navigateTo({ name: 'home' })}
          onSubmitSuccess={(newTool) => {
            handleAddNewTool(newTool);
            navigateTo({ name: 'detail', toolId: newTool.id });
          }}
        />
      )}

      {/* TRANG 4: TRANG BỘ SƯU TẬP (COLLECTIONS PAGE) */}
      {currentRoute.name === 'collections' && (
        <CollectionsPage
          collections={collections}
          tools={tools}
          onNavigateHome={() => navigateTo({ name: 'home' })}
          onSelectTool={(tool) => navigateTo({ name: 'detail', toolId: tool.id })}
          onCreateCollection={handleCreateCollection}
          onDeleteCollection={handleDeleteCollection}
        />
      )}

      {/* TRANG 5: TRANG THƯ VIỆN HƯỚNG DẪN (GUIDES PAGE) */}
      {currentRoute.name === 'guides' && (
        <GuidesPage
          guides={guides}
          onNavigateHome={() => navigateTo({ name: 'home' })}
          onOpenDocsModal={() => setIsDocsOpen(true)}
        />
      )}

      {/* TRANG 6: TRANG HỒ SƠ TÀI KHOẢN & TÀI NGUYÊN ĐÃ LƯU (ACCOUNT PAGE) */}
      {currentRoute.name === 'account' && (
        <AccountPage
          currentUser={currentUser}
          savedTools={savedToolsList}
          userCollections={collections}
          onNavigateHome={() => navigateTo({ name: 'home' })}
          onSelectTool={(tool) => navigateTo({ name: 'detail', toolId: tool.id })}
          onOpenContribute={() => navigateTo({ name: 'contribute' })}
          onLogout={() => {
            setCurrentUser(null);
            localStorage.removeItem('aihub_user');
            navigateTo({ name: 'home' });
          }}
        />
      )}

      {/* TRANG CHỦ: HIỂN THỊ KHI ROUTE LÀ 'HOME' */}
      {currentRoute.name === 'home' && (
        <>
          {/* HERO SECTION CHUẨN SAAS */}
          <HeroSection
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={(cat) => {
              setSelectedCategory(cat);
              const el = document.getElementById('browse-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onSearchSubmit={() => {
              const el = document.getElementById('browse-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          {/* 3 THẺ NHÓM TÀI NGUYÊN CHÍNH */}
          <MainCategoryCards
            onSelectType={(type) => navigateTo({ name: 'category', toolType: type })}
          />

          {/* KHÁM PHÁ TÀI NGUYÊN NỔI BẬT */}
          <FeaturedResources
            tools={tools}
            onSelectTool={(tool) => navigateTo({ name: 'detail', toolId: tool.id })}
            onViewAll={() => navigateTo({ name: 'category', toolType: 'all' })}
          />

          {/* CHỌN THEO NHU CẦU CÔNG VIỆC */}
          <BrowseByNeeds
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              const el = document.getElementById('browse-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          {/* KHU VỰC KHÁM PHÁ TOÀN BỘ 1.930+ CÔNG CỤ VỚI SIDEBAR */}
          <div id="browse-section" className="pt-6">
            <div className={`flex-1 w-full mx-auto px-3 sm:px-6 lg:px-8 py-6 flex gap-6 relative items-start transition-all duration-300 ${
              isExpandedCanvas ? 'max-w-[98%]' : 'max-w-7xl'
            }`}>
              
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

              <main className="flex-1 min-w-0 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="flex items-center space-x-2.5">
                    <button
                      onClick={() => setIsMobileSidebarOpen(true)}
                      className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
                    >
                      <SlidersHorizontal className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                      className="hidden lg:flex p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 items-center space-x-1"
                      title={isSidebarCollapsed ? "Mở rộng thanh bên" : "Thu gọn thanh bên"}
                    >
                      {isSidebarCollapsed ? <PanelLeft className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
                    </button>

                    <div>
                      <div className="flex items-center space-x-2">
                        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                          Kho Tài Nguyên & Thành Phần AI
                        </h2>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-bold">
                          {filteredTools.length.toLocaleString()} mục
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 hidden sm:block">
                        Tra cứu, cấu hình và sử dụng công cụ AI kèm hướng dẫn chuẩn 4 bước tiếng Việt
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2.5 text-xs shrink-0">
                    <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-1.5 rounded-lg transition-all ${
                          viewMode === 'grid'
                            ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm font-semibold'
                            : 'text-slate-500'
                        }`}
                      >
                        <LayoutGrid className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setViewMode('table')}
                        className={`p-1.5 rounded-lg transition-all ${
                          viewMode === 'table'
                            ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm font-semibold'
                            : 'text-slate-500'
                        }`}
                      >
                        <List className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => setIsExpandedCanvas(!isExpandedCanvas)}
                      className={`p-2 rounded-xl border transition-all flex items-center space-x-1.5 ${
                        isExpandedCanvas
                          ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-300 text-indigo-600 font-bold'
                          : 'bg-white dark:bg-slate-800 border-slate-200 text-slate-700'
                      }`}
                    >
                      {isExpandedCanvas ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                      <span className="hidden md:inline">{isExpandedCanvas ? 'Thu gọn' : 'Mở rộng khung'}</span>
                    </button>
                  </div>
                </div>

                {paginatedTools.length > 0 ? (
                  <>
                    {viewMode === 'grid' ? (
                      <div className={`grid grid-cols-1 md:grid-cols-2 gap-5 mb-8 ${
                        isExpandedCanvas ? 'xl:grid-cols-3 2xl:grid-cols-4' : 'xl:grid-cols-3'
                      }`}>
                        {paginatedTools.map((tool) => (
                          <ToolCard
                            key={tool.id}
                            tool={tool}
                            onSelect={(t) => navigateTo({ name: 'detail', toolId: t.id })}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm mb-8">
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 dark:bg-slate-850/80 border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                              <tr>
                                <th className="py-3.5 px-4">Tên Công Cụ</th>
                                <th className="py-3.5 px-3">Loại hình</th>
                                <th className="py-3.5 px-3">Lĩnh vực</th>
                                <th className="py-3.5 px-3">Đánh giá</th>
                                <th className="py-3.5 px-4 text-right">Thao tác</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                              {paginatedTools.map((tool) => (
                                <tr 
                                  key={tool.id}
                                  onClick={() => navigateTo({ name: 'detail', toolId: tool.id })}
                                  className="hover:bg-slate-50/80 dark:hover:bg-slate-850/50 cursor-pointer"
                                >
                                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                                    {tool.name}
                                  </td>
                                  <td className="py-3.5 px-3">
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                      {tool.typeNameVi}
                                    </span>
                                  </td>
                                  <td className="py-3.5 px-3 text-xs text-slate-600 dark:text-slate-400">
                                    {tool.categoryNameVi}
                                  </td>
                                  <td className="py-3.5 px-3">
                                    <span className="text-xs font-bold text-amber-500 flex items-center space-x-1">
                                      <Star className="w-3.5 h-3.5 fill-current" />
                                      <span>{tool.stars || 4.8}</span>
                                    </span>
                                  </td>
                                  <td className="py-3.5 px-4 text-right">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        navigateTo({ name: 'detail', toolId: tool.id });
                                      }}
                                      className="px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-600 text-xs font-bold"
                                    >
                                      Chi tiết
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {totalPages > 1 && (
                      <div className="flex items-center justify-center space-x-2 py-6 border-t border-slate-200 dark:border-slate-800">
                        <button
                          onClick={() => {
                            setCurrentPage(Math.max(1, currentPage - 1));
                            const el = document.getElementById('browse-section');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }}
                          disabled={currentPage === 1}
                          className="px-3.5 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border text-slate-700 dark:text-slate-300 disabled:opacity-40"
                        >
                          Trang trước
                        </button>
                        <span className="text-xs text-slate-500">
                          {currentPage} / {totalPages}
                        </span>
                        <button
                          onClick={() => {
                            setCurrentPage(Math.min(totalPages, currentPage + 1));
                            const el = document.getElementById('browse-section');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }}
                          disabled={currentPage === totalPages}
                          className="px-3.5 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border text-slate-700 dark:text-slate-300 disabled:opacity-40"
                        >
                          Trang sau
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="bg-white dark:bg-slate-900 rounded-2xl border p-12 text-center">
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
                      Không tìm thấy công cụ phù hợp
                    </p>
                    <button
                      onClick={handleResetFilters}
                      className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-medium text-xs"
                    >
                      Đặt lại bộ lọc
                    </button>
                  </div>
                )}
              </main>
            </div>
          </div>
        </>
      )}

      {/* CHÂN TRANG */}
      <Footer
        onOpenDocs={() => navigateTo({ name: 'guides' })}
        onOpenContribute={() => navigateTo({ name: 'contribute' })}
        onSelectType={(type) => navigateTo({ name: 'category', toolType: type })}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          navigateTo({ name: 'home' });
          setTimeout(() => {
            const el = document.getElementById('browse-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
      />

      {/* CÁC MODAL HỆ THỐNG */}
      <DevLifecycleModal
        isOpen={isDocsOpen}
        onClose={() => setIsDocsOpen(false)}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={(email) => {
          setCurrentUser(email);
          localStorage.setItem('aihub_user', email);
        }}
      />

      <TerminalDrawer
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        pendingCommand={pendingTerminalCommand}
        onClearPendingCommand={() => setPendingTerminalCommand(null)}
      />

    </div>
  );
};
