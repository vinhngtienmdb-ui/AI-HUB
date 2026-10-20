import React from 'react';
import { Code2, Megaphone, BarChart3, Settings2, ChevronRight, Sparkles } from 'lucide-react';
import { Category } from '../types';

interface BrowseByNeedsProps {
  onSelectCategory: (category: Category) => void;
}

export const BrowseByNeeds: React.FC<BrowseByNeedsProps> = ({ onSelectCategory }) => {
  const needs = [
    {
      id: 'coding' as Category,
      title: 'Phát triển phần mềm',
      description: 'Code, debug, quản lý dự án...',
      icon: Code2,
      bgColor: 'bg-purple-50 dark:bg-purple-950/40',
      iconColor: 'text-purple-600 dark:text-purple-400',
      borderColor: 'border-purple-100 dark:border-purple-900/40',
    },
    {
      id: 'content' as Category,
      title: 'Marketing & nội dung',
      description: 'Viết bài, thiết kế, sáng tạo...',
      icon: Megaphone,
      bgColor: 'bg-rose-50 dark:bg-rose-950/40',
      iconColor: 'text-rose-600 dark:text-rose-400',
      borderColor: 'border-rose-100 dark:border-rose-900/40',
    },
    {
      id: 'database' as Category,
      title: 'Phân tích dữ liệu',
      description: 'Xử lý, trực quan hóa, báo cáo...',
      icon: BarChart3,
      bgColor: 'bg-blue-50 dark:bg-blue-950/40',
      iconColor: 'text-blue-600 dark:text-blue-400',
      borderColor: 'border-blue-100 dark:border-blue-900/40',
    },
    {
      id: 'automation' as Category,
      title: 'Tự động hóa quy trình',
      description: 'Tiết kiệm thời gian, tăng năng suất...',
      icon: Settings2,
      bgColor: 'bg-amber-50 dark:bg-amber-950/40',
      iconColor: 'text-amber-600 dark:text-amber-400',
      borderColor: 'border-amber-100 dark:border-amber-900/40',
    },
  ];

  const handleClick = (catId: Category) => {
    onSelectCategory(catId);
    const browseElement = document.getElementById('browse-section');
    if (browseElement) {
      browseElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Chọn theo nhu cầu
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Tìm kiếm giải pháp AI phù hợp nhất với mục tiêu công việc của bạn
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {needs.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => handleClick(item.id)}
              className="group flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-700 transition-all cursor-pointer"
            >
              <div className="flex items-center space-x-3.5">
                <div className={`w-11 h-11 rounded-xl ${item.bgColor} border ${item.borderColor} flex items-center justify-center shrink-0`}>
                  <Icon className={`w-5 h-5 ${item.iconColor}`} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="p-1 rounded-full text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-1 transition-all shrink-0">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
