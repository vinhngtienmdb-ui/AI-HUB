import React from 'react';
import { 
  Layers, 
  Sparkles, 
  Workflow, 
  FolderGit2, 
  Brain, 
  Terminal, 
  Cpu, 
  Wrench, 
  Code2, 
  Database, 
  Globe, 
  Search, 
  Cloud, 
  RotateCcw,
  Monitor,
  CheckCircle2,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { ToolType, Category, Platform, CategoryInfo } from '../types';

interface SidebarProps {
  selectedType: ToolType | 'all';
  setSelectedType: (type: ToolType | 'all') => void;
  selectedCategory: Category | 'all';
  setSelectedCategory: (cat: Category | 'all') => void;
  selectedPlatform: Platform | 'all';
  setSelectedPlatform: (plat: Platform | 'all') => void;
  typeCounts: Record<string, number>;
  categories: CategoryInfo[];
  totalTools: number;
  onOpenDocs: () => void;
  onOpenTerminal: () => void;
  onResetFilters: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  selectedType,
  setSelectedType,
  selectedCategory,
  setSelectedCategory,
  selectedPlatform,
  setSelectedPlatform,
  typeCounts,
  categories,
  totalTools,
  onOpenDocs,
  onOpenTerminal,
  onResetFilters
}) => {
  const toolTypeTabs: { id: ToolType | 'all'; name: string; count: number; icon: any }[] = [
    { id: 'all', name: 'Tất cả thành phần', count: typeCounts.all || 0, icon: Layers },
    { id: 'skill', name: 'Kỹ năng (Skills)', count: typeCounts.skill || 0, icon: Sparkles },
    { id: 'workflow', name: 'Quy trình (Workflows)', count: typeCounts.workflow || 0, icon: Workflow },
    { id: 'mcp', name: 'Máy chủ MCP', count: typeCounts.mcp || 0, icon: Cpu },
    { id: 'agent', name: 'Tác tử (Agents)', count: typeCounts.agent || 0, icon: Brain },
    { id: 'command', name: 'Lệnh (Commands)', count: typeCounts.command || 0, icon: Terminal },
    { id: 'template', name: 'Bản mẫu (Templates)', count: typeCounts.template || 0, icon: FolderGit2 },
    { id: 'hook', name: 'Móc nối (Hooks)', count: typeCounts.hook || 0, icon: Wrench },
    { id: 'setting', name: 'Cấu hình (Settings)', count: typeCounts.setting || 0, icon: Wrench },
  ];

  const platforms: { id: Platform | 'all'; name: string; icon: any }[] = [
    { id: 'all', name: 'Tất cả nền tảng', icon: Monitor },
    { id: 'claude_desktop', name: 'Claude Desktop', icon: Monitor },
    { id: 'antigravity', name: 'Antigravity IDE', icon: Monitor },
    { id: 'cursor', name: 'Cursor AI', icon: Monitor },
  ];

  const hasActiveFilters = selectedType !== 'all' || selectedCategory !== 'all' || selectedPlatform !== 'all';

  return (
    <aside className="w-full lg:w-72 shrink-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-full overflow-y-auto p-4 space-y-6 select-none scrollbar-thin">
      {/* Khối thống kê tổng quan & Reset */}
      <div className="bg-slate-50 dark:bg-slate-850 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Kho dữ liệu đã xác thực
          </span>
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center space-x-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              title="Đặt lại toàn bộ các bộ lọc"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Đặt lại</span>
            </button>
          )}
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl font-black text-slate-900 dark:text-white">
            {totalTools.toLocaleString()}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            công cụ chuẩn hóa
          </span>
        </div>
        <div className="mt-2 flex items-center space-x-1.5 text-[11px] text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
          <span>100% tiếng Việt & có ảnh demo</span>
        </div>
      </div>

      {/* NHÓM 1: PHÂN LOẠI THÀNH PHẦN */}
      <div>
        <div className="flex items-center justify-between mb-2.5 px-1">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
            Loại hình thành phần
          </h4>
        </div>
        <div className="space-y-1">
          {toolTypeTabs.map((tab) => {
            const isSelected = selectedType === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedType(tab.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center space-x-2.5 truncate">
                  <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                  <span className="truncate">{tab.name}</span>
                </div>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ml-1.5 shrink-0 ${
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

      {/* NHÓM 2: LĨNH VỰC CHUYÊN MÔN (CATEGORIES) */}
      <div>
        <div className="flex items-center justify-between mb-2.5 px-1">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
            Lĩnh vực chuyên môn
          </h4>
        </div>
        <div className="space-y-1">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const isVietnam = cat.id === 'vietnam';
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm transition-all ${
                  isSelected
                    ? isVietnam
                      ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white font-bold shadow-sm'
                      : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold shadow-sm'
                    : isVietnam
                    ? 'bg-red-50/70 dark:bg-red-950/30 text-red-700 dark:text-red-300 font-semibold border border-red-200 dark:border-red-900/40 hover:bg-red-100 dark:hover:bg-red-900/50'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium'
                }`}
              >
                <span className="truncate">{cat.nameVi}</span>
                {isVietnam && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-400 text-slate-950 font-bold ml-1 shrink-0">
                    HOT
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* NHÓM 3: NỀN TẢNG HỖ TRỢ */}
      <div>
        <div className="flex items-center justify-between mb-2.5 px-1">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
            Môi trường AI
          </h4>
        </div>
        <div className="space-y-1">
          {platforms.map((plat) => {
            const isSelected = selectedPlatform === plat.id;
            return (
              <button
                key={plat.id}
                onClick={() => setSelectedPlatform(plat.id)}
                className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-bold border border-blue-300 dark:border-blue-700'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>{plat.name}</span>
                {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* CHÂN SIDEBAR: TIỆN ÍCH HỆ THỐNG */}
      <div className="mt-auto pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
        <button
          onClick={onOpenTerminal}
          className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold shadow-sm transition-all"
        >
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span>Mở Terminal Cục Bộ</span>
        </button>

        <button
          onClick={onOpenDocs}
          className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium transition-colors"
        >
          <BookOpen className="w-4 h-4 text-blue-500" />
          <span>Tài liệu VibeCode (22 tệp)</span>
        </button>

        <a
          href="https://github.com/vinhngtienmdb-ui/AI-HUB"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center space-x-1.5 py-1.5 text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-mono transition-colors"
        >
          <span>GitHub: vinhngtienmdb-ui/AI-HUB</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </aside>
  );
};
