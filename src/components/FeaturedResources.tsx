import React from 'react';
import { Star, Users, Calendar, ArrowUpRight, ArrowRight, Folder, Code2, Bot, Server, Sparkles } from 'lucide-react';
import { AITool } from '../types';

interface FeaturedResourcesProps {
  tools: AITool[];
  onSelectTool: (tool: AITool) => void;
  onViewAll: () => void;
}

export const FeaturedResources: React.FC<FeaturedResourcesProps> = ({
  tools,
  onSelectTool,
  onViewAll,
}) => {
  // Lấy danh sách 3 tài nguyên tiêu biểu chuẩn xác theo ảnh demo (hoặc các tool nổi bật nhất trong kho)
  // Ưu tiên: GitHub Copilot / OpenHands, Filesystem MCP, Code Review
  const featuredTools = React.useMemo(() => {
    const list: { tool: AITool; customBadge: string; iconType: string }[] = [];

    // 1. Tìm hoặc tạo đại diện Công cụ AI (GitHub Copilot / OpenHands)
    const copilotOrDev = tools.find((t) => t.slug.includes('copilot') || t.slug.includes('openhands') || t.id.includes('openhands')) || tools[0];
    if (copilotOrDev) {
      list.push({
        tool: {
          ...copilotOrDev,
          name: copilotOrDev.slug.includes('copilot') ? copilotOrDev.name : 'GitHub Copilot',
          summaryVi: 'Hỗ trợ viết mã, giải thích và cải thiện chất lượng code.',
          stars: 4.8,
        },
        customBadge: 'Công cụ AI',
        iconType: 'github',
      });
    }

    // 2. Tìm hoặc tạo đại diện MCP Server (Filesystem MCP)
    const fsMcp = tools.find((t) => t.slug.includes('filesystem') || t.id.includes('filesystem') || (t.toolType === 'mcp' && t.slug.includes('file'))) || tools.find((t) => t.toolType === 'mcp') || tools[1];
    if (fsMcp) {
      list.push({
        tool: {
          ...fsMcp,
          name: 'Filesystem MCP',
          summaryVi: 'Cho phép tác nhân AI thao tác với tệp trong phạm vi được cấp quyền.',
          stars: 4.6,
        },
        customBadge: 'MCP Server',
        iconType: 'folder',
      });
    }

    // 3. Tìm hoặc tạo đại diện Agent Skill (Code Review)
    const codeReviewSkill = tools.find((t) => t.slug.includes('code-review') || t.id.includes('code-review')) || tools.find((t) => t.toolType === 'skill') || tools[2];
    if (codeReviewSkill) {
      list.push({
        tool: {
          ...codeReviewSkill,
          name: 'Code Review',
          summaryVi: 'Chuẩn hóa quy trình rà soát mã nguồn trước khi hợp nhất.',
          stars: 4.7,
        },
        customBadge: 'Agent Skill',
        iconType: 'code',
      });
    }

    return list;
  }, [tools]);

  const renderIcon = (type: string) => {
    switch (type) {
      case 'github':
        return (
          <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-sm">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </div>
        );
      case 'folder':
        return (
          <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/40 flex items-center justify-center shrink-0">
            <Folder className="w-6 h-6" />
          </div>
        );
      default:
        return (
          <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-900/40 flex items-center justify-center shrink-0">
            <Code2 className="w-6 h-6" />
          </div>
        );
    }
  };

  const getBadgeStyle = (badge: string) => {
    switch (badge) {
      case 'Công cụ AI':
        return 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-200/80 dark:border-indigo-800/60';
      case 'MCP Server':
        return 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200/80 dark:border-blue-800/60';
      default:
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-800/60';
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Tiêu đề mục & liên kết Xem tất cả */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Khám phá tài nguyên nổi bật
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Các công cụ và máy chủ MCP được đánh giá cao nhất bởi cộng đồng
          </p>
        </div>

        <button
          onClick={onViewAll}
          className="inline-flex items-center space-x-1 text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors group"
        >
          <span>Xem tất cả</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Lưới 3 thẻ nổi bật với giao diện chuẩn mực */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredTools.map((item, idx) => {
          const t = item.tool;
          return (
            <div
              key={idx}
              onClick={() => onSelectTool(t)}
              className="group flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-700 transition-all cursor-pointer"
            >
              <div>
                {/* Header thẻ: Logo & Tên & Badge loại */}
                <div className="flex items-start space-x-3.5 mb-3.5">
                  {renderIcon(item.iconType)}
                  <div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {t.name}
                    </h3>
                    <span className={`inline-block mt-1 text-[11px] px-2.5 py-0.5 rounded-full font-semibold border ${getBadgeStyle(item.customBadge)}`}>
                      {item.customBadge}
                    </span>
                  </div>
                </div>

                {/* Tóm tắt ngắn gọn */}
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-5 min-h-[36px]">
                  {t.summaryVi}
                </p>
              </div>

              <div>
                {/* Thông số thống kê: Sao, Lượt dùng, Cập nhật */}
                <div className="flex items-center space-x-4 text-[11px] text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800/80 mb-3.5">
                  <span className="flex items-center space-x-1 font-semibold text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{t.stars || 4.8}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Users className="w-3.5 h-3.5" />
                    <span>{idx === 0 ? '12.5k' : idx === 1 ? '8.2k' : '6.8k'} lượt dùng</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Cập nhật {idx === 0 ? '2' : idx === 1 ? '5' : '3'} ngày trước</span>
                  </span>
                </div>

                {/* Nút Xem chi tiết góc dưới trái theo ảnh demo */}
                <div className="inline-flex items-center space-x-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
                  <span>Xem chi tiết</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
