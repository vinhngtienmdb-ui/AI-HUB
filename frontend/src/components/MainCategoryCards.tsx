import React from 'react';
import { Bot, Server, Sparkles, Laptop, Globe, Package, ChevronRight } from 'lucide-react';
import { ToolType } from '../types';

interface MainCategoryCardsProps {
  onSelectType: (type: ToolType) => void;
  isExpanded?: boolean;
}

export const MainCategoryCards: React.FC<MainCategoryCardsProps> = ({ onSelectType, isExpanded = true }) => {
  const categories = [
    {
      id: 'mcp' as ToolType,
      title: 'MCP Server',
      description: 'Giao thức kết nối AI với dữ liệu & công cụ máy tính',
      icon: Server,
      bgColor: 'bg-blue-50 dark:bg-blue-950/40',
      iconColor: 'text-blue-600 dark:text-blue-400',
      borderColor: 'border-blue-100 dark:border-blue-900/40',
      hoverBorder: 'hover:border-blue-300 dark:hover:border-blue-700',
    },
    {
      id: 'skill' as ToolType,
      title: 'Skill',
      description: 'Bộ kỹ năng chuyên môn hướng dẫn tác nhân AI',
      icon: Sparkles,
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/40',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      borderColor: 'border-emerald-100 dark:border-emerald-900/40',
      hoverBorder: 'hover:border-emerald-300 dark:hover:border-emerald-700',
    },
    {
      id: 'agent' as ToolType,
      title: 'Agent',
      description: 'Tác nhân AI tự chủ giải quyết nhiệm vụ phức tạp',
      icon: Bot,
      bgColor: 'bg-indigo-50 dark:bg-indigo-950/40',
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      borderColor: 'border-indigo-100 dark:border-indigo-900/40',
      hoverBorder: 'hover:border-indigo-300 dark:hover:border-indigo-700',
    },
    {
      id: 'api' as ToolType,
      title: 'API',
      description: 'Cổng giao tiếp lập trình và Webhook kết nối hệ thống',
      icon: Globe,
      bgColor: 'bg-sky-50 dark:bg-sky-950/40',
      iconColor: 'text-sky-600 dark:text-sky-400',
      borderColor: 'border-sky-100 dark:border-sky-900/40',
      hoverBorder: 'hover:border-sky-300 dark:hover:border-sky-700',
    },
    {
      id: 'sdk' as ToolType,
      title: 'SDK',
      description: 'Bộ công cụ phát triển phần mềm chính thức đa nền tảng',
      icon: Package,
      bgColor: 'bg-teal-50 dark:bg-teal-950/40',
      iconColor: 'text-teal-600 dark:text-teal-400',
      borderColor: 'border-teal-100 dark:border-teal-900/40',
      hoverBorder: 'hover:border-teal-300 dark:hover:border-teal-700',
    },
    {
      id: 'software' as ToolType,
      title: 'Phần mềm',
      description: 'Hệ thống ERP, CRM, Kế toán & Quản trị số doanh nghiệp',
      icon: Laptop,
      bgColor: 'bg-amber-50 dark:bg-amber-950/40',
      iconColor: 'text-amber-600 dark:text-amber-400',
      borderColor: 'border-amber-100 dark:border-amber-900/40',
      hoverBorder: 'hover:border-amber-300 dark:hover:border-amber-700',
    },
  ];

  const handleClick = (type: ToolType) => {
    onSelectType(type);
    const browseElement = document.getElementById('browse-section');
    if (browseElement) {
      browseElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={`w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 transition-all duration-300 ${isExpanded ? 'max-w-[98%]' : 'max-w-7xl'}`}>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.id}
              onClick={() => handleClick(cat.id)}
              className={`group flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-slate-900 border ${cat.borderColor} ${cat.hoverBorder} shadow-sm hover:shadow-md transition-all cursor-pointer`}
            >
              <div className="flex items-center space-x-2.5 min-w-0">
                <div className={`w-10 h-10 rounded-xl ${cat.bgColor} flex items-center justify-center shrink-0 border ${cat.borderColor}`}>
                  <Icon className={`w-5 h-5 ${cat.iconColor}`} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                    {cat.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                    {cat.description}
                  </p>
                </div>
              </div>

              <div className="p-1 rounded-full text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-1 transition-all shrink-0 ml-1">
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
