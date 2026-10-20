import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { MainCategoryCards } from './components/MainCategoryCards';
import { FeaturedResources } from './components/FeaturedResources';
import { BrowseByNeeds } from './components/BrowseByNeeds';
import { ToolCard } from './components/ToolCard';
import { ToolDetailModal } from './components/ToolDetailModal';
import { ContributeModal } from './components/ContributeModal';
import { AdminApprovalModal } from './components/AdminApprovalModal';
import { EditToolTaxonomyModal } from './components/EditToolTaxonomyModal';
import { AdminTaxonomyModal } from './components/AdminTaxonomyModal';
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
import { ApiManagementPage } from './pages/ApiManagementPage';

import { INITIAL_TOOLS, CATEGORIES } from './data/mockTools';
import { INITIAL_COLLECTIONS, INITIAL_GUIDES } from './data/mockGuidesAndCollections';
import { DEFAULT_TOOL_TYPES, ToolTypeInfo, getToolTypeNameVi, getCategoryNameVi } from './data/taxonomy';
import { AITool, Category, CategoryInfo, Platform, ToolType, Collection, GuideArticle, PageRoute, UserProfile } from './types';
import { subscribeToAuth, checkIsAdmin } from './lib/firebase';
import { loadAllTools, saveContributedTool, saveToolOverride, cleanupLegacyStorage } from './lib/storage';
import { 
  SearchX, ChevronLeft, ChevronRight, Layers, Sparkles, Cpu, Terminal, Brain, 
  FolderGit2, Wrench, Workflow, SlidersHorizontal, X, LayoutGrid, List, 
  Maximize2, Minimize2, PanelLeftClose, PanelLeft, Star, ExternalLink, ArrowRight 
} from 'lucide-react';

const PAGE_SIZE = 24;

export const App: React.FC = () => {
  // Dữ liệu cốt lõi: Khởi tạo an toàn kết hợp INITIAL_TOOLS với các công cụ đóng góp & ghi đè phân loại (tránh tràn quota localStorage)
  const [tools, setTools] = useState<AITool[]>(() => loadAllTools());

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
  const [onlyVietnamMarket, setOnlyVietnamMarket] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedModalTool, setSelectedModalTool] = useState<AITool | null>(null);

  // Trạng thái modal và tài khoản
  const [isContributeOpen, setIsContributeOpen] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAdminApprovalOpen, setIsAdminApprovalOpen] = useState(false);

  // Quản lý Loại hình thành phần và Lĩnh vực chuyên môn (Quyền Admin)
  const [isTaxonomyManagerOpen, setIsTaxonomyManagerOpen] = useState(false);
  const [editingTaxonomyTool, setEditingTaxonomyTool] = useState<AITool | null>(null);

  const [categories, setCategories] = useState<CategoryInfo[]>(() => {
    const saved = localStorage.getItem('aihub_custom_categories');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error('Lỗi khi đọc categories từ localStorage:', e);
      }
    }
    return CATEGORIES;
  });

  const [toolTypes, setToolTypes] = useState<ToolTypeInfo[]>(() => {
    const saved = localStorage.getItem('aihub_custom_tool_types');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error('Lỗi khi đọc toolTypes từ localStorage:', e);
      }
    }
    return DEFAULT_TOOL_TYPES;
  });

  const [currentUser, setCurrentUser] = useState<string | null>(() => {
    const saved = localStorage.getItem('aihub_user');
    if (!saved || saved === 'thanhvien@aihub.vn') {
      localStorage.removeItem('aihub_user');
      return null;
    }
    return saved;
  });

  // Hồ sơ thông tin người dùng cá nhân (Tên hiển thị, Chức danh, Tiểu sử, Avatar...)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('aihub_user_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Lỗi khi đọc profile người dùng:', e);
      }
    }
    return null;
  });

  // Quản trị viên cao nhất
  const [isAdmin, setIsAdmin] = useState<boolean>(() => checkIsAdmin(currentUser));

  // Giao diện và Terminal
  const [darkMode, setDarkMode] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [pendingTerminalCommand, setPendingTerminalCommand] = useState<string | null>(null);

  // Mặc định mở rộng màn hình làm việc trên toàn bộ trang (Full-Width Workspace Canvas)
  const [isExpandedCanvas, setIsExpandedCanvas] = useState<boolean>(() => {
    const saved = localStorage.getItem('aihub_expanded_canvas');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Lắng nghe trạng thái đăng nhập Firebase Google Auth
  useEffect(() => {
    const unsubscribe = subscribeToAuth((firebaseUser) => {
      if (firebaseUser?.email) {
        setCurrentUser(firebaseUser.email);
        localStorage.setItem('aihub_user', firebaseUser.email);

        setUserProfile((prev) => {
          if (prev && prev.email === firebaseUser.email) return prev;
          const initialProfile: UserProfile = {
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || firebaseUser.email.split('@')[0],
            photoURL: firebaseUser.photoURL || undefined,
            title: prev?.title || 'Chuyên gia AI & Phần mềm',
            bio: prev?.bio || 'Thành viên đam mê khám phá và xây dựng ứng dụng trí tuệ nhân tạo.',
            phone: prev?.phone || '',
            githubUrl: prev?.githubUrl || '',
            websiteUrl: prev?.websiteUrl || '',
          };
          localStorage.setItem('aihub_user_profile', JSON.stringify(initialProfile));
          return initialProfile;
        });
      }
    });
    return () => unsubscribe();
  }, []);

  // Đồng bộ userProfile vào localStorage khi thay đổi
  useEffect(() => {
    if (userProfile) {
      localStorage.setItem('aihub_user_profile', JSON.stringify(userProfile));
    }
  }, [userProfile]);

  // Cập nhật quyền Admin mỗi khi currentUser thay đổi
  useEffect(() => {
    setIsAdmin(checkIsAdmin(currentUser));
  }, [currentUser]);

  // Tự động dọn dẹp khóa cũ aihub_tools để giải phóng quota localStorage
  useEffect(() => {
    cleanupLegacyStorage();
  }, []);

  // Lưu trạng thái vào localStorage
  useEffect(() => {
    localStorage.setItem('aihub_expanded_canvas', JSON.stringify(isExpandedCanvas));
  }, [isExpandedCanvas]);

  useEffect(() => {
    localStorage.setItem('aihub_custom_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('aihub_custom_tool_types', JSON.stringify(toolTypes));
  }, [toolTypes]);

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
      } else if (hash === '/api' || hash === '/developer' || hash === '/api-keys') {
        setCurrentRoute({ name: 'api' });
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
      case 'api':
        window.location.hash = '/api';
        break;
    }
  };

  const handleToggleSaveTool = (toolId: string) => {
    if (!currentUser) {
      setIsLoginOpen(true);
      return;
    }
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

  // Phân tách danh sách công cụ: Đã phát hành (Published) và Chờ duyệt (Pending)
  const publishedTools = useMemo(() => {
    return tools.filter((t) => t.status === 'published' || !t.status);
  }, [tools]);

  const pendingTools = useMemo(() => {
    return tools.filter((t) => t.status === 'pending');
  }, [tools]);

  // Xử lý thêm công cụ mới: Admin duyệt ngay, Thành viên thường chuyển vào hàng đợi pending
  const handleAddNewTool = (newTool: AITool) => {
    const isOwner = checkIsAdmin(currentUser);
    const toolToAdd: AITool = {
      ...newTool,
      status: isOwner ? (newTool.status || 'published') : 'pending',
      contributedBy: currentUser || 'Thành viên ẩn danh',
      contributedAt: new Date().toISOString().split('T')[0],
      reviewNote: isOwner ? 'Đã được Quản trị viên phê duyệt trực tiếp' : 'Đang chờ Quản trị viên kiểm duyệt',
    };
    setTools((prev) => [toolToAdd, ...prev]);
    saveContributedTool(toolToAdd);
  };

  // Phê duyệt công cụ từ hàng đợi kiểm duyệt (dành riêng cho Quản trị viên)
  const handleApproveTool = (toolId: string) => {
    const updateData = {
      status: 'published' as const,
      reviewNote: 'Đã được Quản trị viên AI HUB VN phê duyệt chính thức',
    };
    setTools((prev) =>
      prev.map((t) => (t.id === toolId ? { ...t, ...updateData } : t))
    );
    saveToolOverride(toolId, updateData);
  };

  // Từ chối công cụ với lý do cụ thể (dành riêng cho Quản trị viên)
  const handleRejectTool = (toolId: string, reason?: string) => {
    const updateData = {
      status: 'rejected' as const,
      reviewNote: reason || 'Chưa đáp ứng đầy đủ tiêu chuẩn kiểm duyệt của AI HUB VN',
    };
    setTools((prev) =>
      prev.map((t) => (t.id === toolId ? { ...t, ...updateData } : t))
    );
    saveToolOverride(toolId, updateData);
  };

  // Điều chỉnh Loại hình thành phần và Lĩnh vực chuyên môn (Chỉ duy nhất tài khoản Quản trị viên tối cao)
  const handleUpdateToolTaxonomy = (
    toolId: string, 
    newType: ToolType, 
    newCategory: Category,
    newCategories?: Category[],
    isVn?: boolean
  ) => {
    if (!isAdmin) {
      alert('Chỉ duy nhất tài khoản Quản trị viên tối cao mới có quyền điều chỉnh Loại hình thành phần và Lĩnh vực chuyên môn!');
      return;
    }
    const newTypeNameVi = getToolTypeNameVi(newType, toolTypes);
    const newCategoryNameVi = getCategoryNameVi(newCategory, categories);
    const cats = newCategories && newCategories.length > 0 ? newCategories : [newCategory];
    const catNamesVi = cats.map((c) => getCategoryNameVi(c, categories));

    const updateData = {
      toolType: newType,
      typeNameVi: newTypeNameVi,
      category: newCategory,
      categoryNameVi: newCategoryNameVi,
      categories: cats,
      categoryNamesVi: catNamesVi,
      isVietnamMarket: isVn !== undefined ? isVn : cats.includes('vietnam'),
    };

    setTools((prev) =>
      prev.map((t) => (t.id === toolId ? { ...t, ...updateData } : t))
    );
    saveToolOverride(toolId, updateData);
  };

  // Thống kê số lượng từng loại hình (chỉ tính công cụ đã phát hành công khai)
  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = { all: publishedTools.length };
    for (const t of publishedTools) {
      counts[t.toolType] = (counts[t.toolType] || 0) + 1;
    }
    return counts;
  }, [publishedTools]);

  // Thống kê số lượng tài nguyên dành riêng hoặc hỗ trợ thị trường Việt Nam
  const vietnamCount = useMemo(() => {
    return publishedTools.filter(
      (t) => Boolean(t.isVietnamMarket || t.category === 'vietnam' || (Array.isArray(t.categories) && t.categories.includes('vietnam')))
    ).length;
  }, [publishedTools]);

  // Thống kê số lượng từng lĩnh vực chuyên môn (chỉ tính công cụ đã phát hành công khai, hỗ trợ đa lĩnh vực)
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: publishedTools.length };
    for (const t of publishedTools) {
      const toolCats = new Set<string>();
      if (t.category) toolCats.add(t.category);
      if (Array.isArray(t.categories)) {
        t.categories.forEach((c) => toolCats.add(c));
      }
      toolCats.forEach((cat) => {
        counts[cat] = (counts[cat] || 0) + 1;
      });
    }
    return counts;
  }, [publishedTools]);

  // Bộ lọc danh mục trang chủ (chỉ lọc trên các công cụ đã được phát hành)
  const filteredTools = useMemo(() => {
    return publishedTools.filter((tool) => {
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        (tool.name || '').toLowerCase().includes(q) ||
        (tool.summaryVi || '').toLowerCase().includes(q) ||
        (tool.purposeVi || '').toLowerCase().includes(q) ||
        (tool.authorName || '').toLowerCase().includes(q);

      const matchCategory =
        selectedCategory === 'all' ||
        tool.category === selectedCategory ||
        (Array.isArray(tool.categories) && tool.categories.includes(selectedCategory)) ||
        (selectedCategory === 'vietnam' && (tool.isVietnamMarket || tool.category === 'vietnam' || tool.categories?.includes('vietnam')));

      const isVn = Boolean(tool.isVietnamMarket || tool.category === 'vietnam' || (Array.isArray(tool.categories) && tool.categories.includes('vietnam')));
      const matchVietnamMarket = !onlyVietnamMarket || isVn;

      const matchType = selectedType === 'all' || tool.toolType === selectedType;
      const matchPlatform = selectedPlatform === 'all' || (tool.platforms || []).includes(selectedPlatform);

      return matchQuery && matchCategory && matchType && matchPlatform && matchVietnamMarket;
    });
  }, [publishedTools, searchQuery, selectedCategory, selectedType, selectedPlatform, onlyVietnamMarket]);

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
    setOnlyVietnamMarket(false);
    setCurrentPage(1);
    setIsMobileSidebarOpen(false);
  };

  // Danh sách công cụ đã lưu
  const savedToolsList = useMemo(() => {
    return publishedTools.filter((t) => savedToolIds.includes(t.id));
  }, [publishedTools, savedToolIds]);

  // Tìm công cụ chi tiết khi route là 'detail' (cho phép tìm cả trong tools đầy đủ để Admin có thể xem trước)
  const currentDetailTool = useMemo(() => {
    if (currentRoute.name === 'detail') {
      return tools.find((t) => t.id === currentRoute.toolId || t.slug === currentRoute.toolId) || publishedTools[0];
    }
    return null;
  }, [currentRoute, tools, publishedTools]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* THANH ĐIỀU HƯỚNG DÙNG CHUNG TOÀN HỆ THỐNG */}
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenContribute={() => navigateTo({ name: 'contribute' })}
        onOpenDocs={() => navigateTo({ name: 'guides' })}
        onOpenApiManagement={() => navigateTo({ name: 'api' })}
        onOpenLogin={() => {
          if (currentUser) {
            navigateTo({ name: 'account' });
          } else {
            setIsLoginOpen(true);
          }
        }}
        currentUser={currentUser}
        userDisplayName={userProfile?.displayName}
        userPhotoURL={userProfile?.photoURL}
        isAdmin={isAdmin}
        pendingCount={pendingTools.length}
        onOpenAdminApproval={() => setIsAdminApprovalOpen(true)}
        onOpenTaxonomyManager={() => setIsTaxonomyManagerOpen(true)}
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
        toolCount={publishedTools.length}
        isExpanded={isExpandedCanvas}
      />

      {/* RENDER NỘI DUNG THEO ĐỊNH TUYẾN TRANG */}
      
      {/* TRANG 1: TRANG DANH MỤC TÀI NGUYÊN (CATEGORY PAGE) */}
      {currentRoute.name === 'category' && (
        <CategoryPage
          toolType={currentRoute.toolType}
          tools={publishedTools}
          onSelectTool={(tool) => navigateTo({ name: 'detail', toolId: tool.id })}
          onNavigateHome={() => navigateTo({ name: 'home' })}
          savedToolIds={savedToolIds}
          onToggleSaveTool={handleToggleSaveTool}
          isExpanded={isExpandedCanvas}
        />
      )}

      {/* TRANG 2: TRANG CHI TIẾT TÀI NGUYÊN (DETAIL PAGE CHUẨN MẪU) */}
      {currentRoute.name === 'detail' && currentDetailTool && (
        <DetailPage
          tool={currentDetailTool}
          allTools={publishedTools}
          onNavigateHome={() => navigateTo({ name: 'home' })}
          onNavigateCategory={() => navigateTo({ name: 'category', toolType: currentDetailTool.toolType })}
          onSelectAlternative={(alt) => navigateTo({ name: 'detail', toolId: alt.id })}
          onExecuteCommand={handleExecuteCommand}
          isSaved={savedToolIds.includes(currentDetailTool.id)}
          onToggleSave={() => handleToggleSaveTool(currentDetailTool.id)}
          isExpanded={isExpandedCanvas}
          isAdmin={isAdmin}
          onOpenEditTaxonomy={(tool) => setEditingTaxonomyTool(tool)}
        />
      )}

      {/* TRANG 3: TRANG ĐÓNG GÓP TÀI NGUYÊN (CONTRIBUTE PAGE CHUẨN MẪU) */}
      {currentRoute.name === 'contribute' && (
        <ContributePage
          onNavigateHome={() => navigateTo({ name: 'home' })}
          currentUserEmail={currentUser}
          isAdmin={isAdmin}
          onSubmitSuccess={(newTool) => {
            handleAddNewTool(newTool);
            if (isAdmin) {
              navigateTo({ name: 'detail', toolId: newTool.id });
            } else {
              navigateTo({ name: 'home' });
            }
          }}
        />
      )}

      {/* TRANG 4: TRANG BỘ SƯU TẬP (COLLECTIONS PAGE) */}
      {currentRoute.name === 'collections' && (
        <CollectionsPage
          collections={collections}
          tools={publishedTools}
          onNavigateHome={() => navigateTo({ name: 'home' })}
          onSelectTool={(tool) => navigateTo({ name: 'detail', toolId: tool.id })}
          onCreateCollection={handleCreateCollection}
          onDeleteCollection={handleDeleteCollection}
          isExpanded={isExpandedCanvas}
        />
      )}

      {/* TRANG 5: TRANG THƯ VIỆN HƯỚNG DẪN (GUIDES PAGE) */}
      {currentRoute.name === 'guides' && (
        <GuidesPage
          guides={guides}
          onNavigateHome={() => navigateTo({ name: 'home' })}
          onOpenDocsModal={() => setIsDocsOpen(true)}
          isExpanded={isExpandedCanvas}
        />
      )}

      {/* TRANG 6: TRANG HỒ SƠ TÀI KHOẢN & TÀI NGUYÊN ĐÃ LƯU (ACCOUNT PAGE) */}
      {currentRoute.name === 'account' && (
        <AccountPage
          currentUser={currentUser}
          userProfile={userProfile}
          onUpdateProfile={(updated) => {
            setUserProfile(updated);
            localStorage.setItem('aihub_user_profile', JSON.stringify(updated));
          }}
          savedTools={savedToolsList}
          userCollections={collections}
          onNavigateHome={() => navigateTo({ name: 'home' })}
          onSelectTool={(tool) => navigateTo({ name: 'detail', toolId: tool.id })}
          onToggleSaveTool={handleToggleSaveTool}
          onOpenContribute={() => navigateTo({ name: 'contribute' })}
          onLogout={() => {
            setCurrentUser(null);
            setUserProfile(null);
            localStorage.removeItem('aihub_user');
            localStorage.removeItem('aihub_user_profile');
            navigateTo({ name: 'home' });
          }}
          isExpanded={isExpandedCanvas}
        />
      )}

      {/* TRANG 7: TRANG QUẢN LÝ API & CỔNG LẬP TRÌNH VIÊN (DEVELOPER PORTAL) */}
      {currentRoute.name === 'api' && (
        <ApiManagementPage
          onNavigateHome={() => navigateTo({ name: 'home' })}
          isExpanded={isExpandedCanvas}
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
            isExpanded={isExpandedCanvas}
          />

          {/* KHÁM PHÁ TÀI NGUYÊN NỔI BẬT */}
          <FeaturedResources
            tools={publishedTools}
            onSelectTool={(tool) => navigateTo({ name: 'detail', toolId: tool.id })}
            onViewAll={() => navigateTo({ name: 'category', toolType: 'all' })}
            isExpanded={isExpandedCanvas}
          />

          {/* CHỌN THEO NHU CẦU CÔNG VIỆC */}
          <BrowseByNeeds
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              const el = document.getElementById('browse-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            isExpanded={isExpandedCanvas}
          />

          {/* KHU VỰC KHÁM PHÁ TOÀN BỘ CÔNG CỤ VỚI SIDEBAR */}
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
                    onlyVietnamMarket={onlyVietnamMarket}
                    setOnlyVietnamMarket={setOnlyVietnamMarket}
                    typeCounts={typeCounts}
                    categoryCounts={categoryCounts}
                    categories={categories}
                    totalTools={publishedTools.length}
                    vietnamCount={vietnamCount}
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
                            isSaved={savedToolIds.includes(tool.id)}
                            onToggleSave={() => handleToggleSaveTool(tool.id)}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm mb-8">
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 dark:bg-slate-850/80 border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                              <tr>
                                <th className="py-3.5 px-3 w-12 text-center">Lưu</th>
                                <th className="py-3.5 px-4">Tên Công Cụ</th>
                                <th className="py-3.5 px-3">Loại hình</th>
                                <th className="py-3.5 px-3">Lĩnh vực</th>
                                <th className="py-3.5 px-3">Đánh giá</th>
                                <th className="py-3.5 px-4 text-right">Thao tác</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                              {paginatedTools.map((tool) => {
                                const isSaved = savedToolIds.includes(tool.id);
                                return (
                                  <tr 
                                    key={tool.id}
                                    onClick={() => navigateTo({ name: 'detail', toolId: tool.id })}
                                    className="hover:bg-slate-50/80 dark:hover:bg-slate-850/50 cursor-pointer"
                                  >
                                    <td className="py-3.5 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                                      <button
                                        type="button"
                                        onClick={() => handleToggleSaveTool(tool.id)}
                                        className="p-1 rounded-lg transition-transform hover:scale-125 active:scale-95"
                                        title={isSaved ? "Bỏ gắn sao lưu trữ" : "Gắn sao để lưu trữ công cụ"}
                                      >
                                        <Star className={`w-4 h-4 ${isSaved ? 'fill-amber-400 text-amber-500' : 'text-slate-300 dark:text-slate-600 hover:text-amber-500'}`} />
                                      </button>
                                    </td>
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
                                        className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 text-xs font-bold hover:bg-indigo-100 transition-colors"
                                      >
                                        Chi tiết
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
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
        onOpenApiManagement={() => navigateTo({ name: 'api' })}
        onSelectType={(type) => navigateTo({ name: 'category', toolType: type })}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          navigateTo({ name: 'home' });
          setTimeout(() => {
            const el = document.getElementById('browse-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
        isExpanded={isExpandedCanvas}
      />

      {/* Drawer Sidebar cho màn hình di động */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          <div className="relative w-4/5 max-w-xs bg-white dark:bg-slate-900 h-full z-10 shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
              <span className="font-bold text-sm text-slate-900 dark:text-white">Bộ lọc tìm kiếm</span>
              <button 
                onClick={() => setIsMobileSidebarOpen(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
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
                onlyVietnamMarket={onlyVietnamMarket}
                setOnlyVietnamMarket={(v) => { setOnlyVietnamMarket(v); setIsMobileSidebarOpen(false); }}
                typeCounts={typeCounts}
                categoryCounts={categoryCounts}
                categories={categories}
                totalTools={publishedTools.length}
                vietnamCount={vietnamCount}
                onOpenDocs={() => { setIsMobileSidebarOpen(false); setIsDocsOpen(true); }}
                onOpenTerminal={() => { setIsMobileSidebarOpen(false); setIsTerminalOpen(true); }}
                onResetFilters={() => { handleResetFilters(); setIsMobileSidebarOpen(false); }}
              />
            </div>
          </div>
        </div>
      )}

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

      {/* Modal Hàng đợi phê duyệt (Dành riêng cho Quản trị viên cao nhất) */}
      <AdminApprovalModal
        isOpen={isAdminApprovalOpen}
        onClose={() => setIsAdminApprovalOpen(false)}
        pendingTools={pendingTools}
        onApproveTool={handleApproveTool}
        onRejectTool={handleRejectTool}
        onPreviewTool={(tool) => setSelectedModalTool(tool)}
        onEditTaxonomy={(tool) => setEditingTaxonomyTool(tool)}
      />

      {/* Modal Điều chỉnh Loại hình thành phần và Lĩnh vực chuyên môn cho một công cụ cụ thể (Chỉ duy nhất Quản trị viên) */}
      {isAdmin && (
        <EditToolTaxonomyModal
          isOpen={editingTaxonomyTool !== null}
          onClose={() => setEditingTaxonomyTool(null)}
          tool={editingTaxonomyTool}
          onSave={handleUpdateToolTaxonomy}
          customTypes={toolTypes}
          customCategories={categories}
        />
      )}

      {/* Modal Quản trị Phân loại hệ thống - Taxonomy Manager (Chỉ duy nhất Quản trị viên) */}
      {isAdmin && (
        <AdminTaxonomyModal
          isOpen={isTaxonomyManagerOpen}
          onClose={() => setIsTaxonomyManagerOpen(false)}
          categories={categories}
          toolTypes={toolTypes}
          onSaveCategories={(newCats) => {
            if (!isAdmin) return;
            setCategories(newCats);
          }}
          onSaveToolTypes={(newTypes) => {
            if (!isAdmin) return;
            setToolTypes(newTypes);
          }}
          onResetToDefault={() => {
            if (!isAdmin) return;
            setCategories(CATEGORIES);
            setToolTypes(DEFAULT_TOOL_TYPES);
            localStorage.removeItem('aihub_custom_categories');
            localStorage.removeItem('aihub_custom_tool_types');
          }}
        />
      )}

      {/* Modal xem nhanh chi tiết công cụ */}
      <ToolDetailModal
        tool={selectedModalTool}
        onClose={() => setSelectedModalTool(null)}
        onExecuteCommand={handleExecuteCommand}
      />

      {/* Modal đóng góp nhanh */}
      <ContributeModal
        isOpen={isContributeOpen}
        onClose={() => setIsContributeOpen(false)}
        currentUserEmail={currentUser}
        isAdmin={isAdmin}
        onSubmit={(newTool) => {
          handleAddNewTool(newTool);
          setIsContributeOpen(false);
          if (isAdmin) {
            navigateTo({ name: 'detail', toolId: newTool.id });
          }
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
