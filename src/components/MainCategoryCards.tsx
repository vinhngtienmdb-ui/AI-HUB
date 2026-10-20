import React from 'react';
import { Bot, Server, Sparkles, ChevronRight } from 'lucide-react';
import { ToolType } from '../types';

interface MainCategoryCardsProps {
  onSelectType: (type: ToolType) => void;
}

export const MainCategoryCards: React.FC<MainCategoryCardsProps> = ({ onSelectType }) => {
  const categories = [
    {
      id: 'agent' as ToolType,
      title: 'Công cụ AI',
      description: 'Ứng dụng thông minh cho công việc',
      icon: Bot,
      bgColor: 'bg-indigo-50 dark:bg-indigo-950/40',
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      borderColor: 'border-indigo-100 dark:border-indigo-900/40',
      hoverBorder: 'hover:border-indigo-300 dark:hover:border-indigo-700',
    },
    {
      id: 'mcp' as ToolType,
      title: 'MCP Servers',
      description: 'Kết nối mô hình AI với dữ liệu và dịch vụ',
      icon: Server,
      bgColor: 'bg-blue-50 dark:bg-blue-950/40',
      iconColor: 'text-blue-600 dark:text-blue-400',
      borderColor: 'border-blue-100 dark:border-blue-900/40',
      hoverBorder: 'hover:border-blue-300 dark:hover:border-blue-700',
    },
    {
      id: 'skill' as ToolType,
      title: 'Agent Skills',
      description: 'Bộ kỹ năng cho tác nhân AI',
      icon: Sparkles,
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/40',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      borderColor: 'border-emerald-100 dark:border-emerald-900/40',
      hoverBorder: 'hover:border-emerald-300 dark:hover:border-emerald-700',
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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.id}
              onClick={() => handleClick(cat.id)}
              className={`group flex items-center justify-between p-5 rounded-2xl bg-white dark:bg-slate-900 border ${cat.borderColor} ${cat.hoverBorder} shadow-sm hover:shadow-md transition-all cursor-pointer`}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-xl ${cat.bgColor} flex items-center justify-center shrink-0 border ${cat.borderColor}`}>
                  <Icon className={`w-6 h-6 ${cat.iconColor}`} />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {cat.description}
                  </p>
                </div>
              </div>

              <div className="p-1 rounded-full text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-1 transition-all">
                <ChevronRight className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
