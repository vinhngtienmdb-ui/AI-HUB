import React from 'react';
import { Star, Users, Calendar, ArrowUpRight, ArrowRight, Folder, Code2, Bot, Server, Sparkles, Laptop } from 'lucide-react';
import { AITool } from '../types';

interface FeaturedResourcesProps {
  tools: AITool[];
  onSelectTool: (tool: AITool) => void;
  onViewAll: () => void;
  isExpanded?: boolean;
}

export const FeaturedResources: React.FC<FeaturedResourcesProps> = ({
  tools,
  onSelectTool,
  onViewAll,
  isExpanded = true,
}) => {
  // Lấy danh sách 4 tài nguyên tiêu biểu chuẩn xác đại diện cho 4 loại hình cốt lõi: Agent, MCP Server, Skill, Phần mềm
  const featuredTools = React.useMemo(() => {
    const list: { tool: AITool; customBadge: string; iconType: string }[] = [];

    // 1. Đại diện Agent (GitHub Copilot / OpenHands)
    const copilotOrDev = tools.find((t) => t.slug.includes('copilot') || t.slug.includes('openhands') || t.id.includes('openhands') || t.toolType === 'agent') || tools[0];
    if (copilotOrDev) {
      list.push({
        tool: {
          ...copilotOrDev,
          name: copilotOrDev.slug.includes('copilot') ? copilotOrDev.name : 'GitHub Copilot / AI Agent',
          summaryVi: 'Hỗ trợ lập trình, sinh mã nguồn tự động và giải quyết tác vụ phức tạp.',
          stars: 4.9,
        },
        customBadge: 'Agent',
        iconType: 'github',
      });
    }

    // 2. Đại diện MCP Server (Filesystem MCP / Brave Search MCP)
    const fsMcp = tools.find((t) => t.toolType === 'mcp' && (t.slug.includes('filesystem') || t.slug.includes('file') || t.slug.includes('search'))) || tools.find((t) => t.toolType === 'mcp') || tools[1];
    if (fsMcp) {
      list.push({
        tool: {
          ...fsMcp,
          name: 'Filesystem MCP Server',
          summaryVi: 'Giao thức chuẩn kết nối AI trực tiếp với tệp tin và dữ liệu hệ thống an toàn.',
          stars: 4.8,
        },
        customBadge: 'MCP Server',
        iconType: 'folder',
      });
    }

    // 3. Đại diện Skill (Code Review / Unit Test)
    const codeReviewSkill = tools.find((t) => t.toolType === 'skill' && (t.slug.includes('code-review') || t.slug.includes('test'))) || tools.find((t) => t.toolType === 'skill') || tools[2];
    if (codeReviewSkill) {
      list.push({
        tool: {
          ...codeReviewSkill,
          name: 'Code Review Skill',
          summaryVi: 'Chuẩn hóa quy trình kiểm tra chất lượng và rà soát mã nguồn tự động.',
          stars: 4.7,
        },
        customBadge: 'Skill',
        iconType: 'code',
      });
    }

    // 4. Đại diện Phần mềm (MISA AMIS / Quản trị số doanh nghiệp Việt Nam)
    const softwareTool = tools.find((t) => t.toolType === 'software') || tools.find((t) => t.id.startsWith('vn-repo-misa') || t.name.includes('MISA') || t.name.includes('Medpro'));
    if (softwareTool) {
      list.push({
        tool: {
          ...softwareTool,
          name: softwareTool.name.length > 40 ? softwareTool.name.slice(0, 38) + '...' : softwareTool.name,
          summaryVi: softwareTool.summaryVi || 'Phần mềm kế toán, ký số và quản trị doanh nghiệp chuẩn mực.',
          stars: 4.9,
        },
        customBadge: 'Phần mềm',
        iconType: 'laptop',
      });
    }

    return list;
  }, [tools]);

  const renderIcon = (type: string) => {
    switch (type) {
      case 'github':
        return (
          <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/40 flex items-center justify-center shrink-0">
            <Bot className="w-6 h-6" />
          </div>
        );
      case 'folder':
        return (
          <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/40 flex items-center justify-center shrink-0">
            <Server className="w-6 h-6" />
          </div>
        );
      case 'laptop':
        return (
          <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/40 flex items-center justify-center shrink-0">
            <Laptop className="w-6 h-6" />
          </div>
        );
      default:
        return (
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/40 flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
        );
    }
  };

  const getBadgeStyle = (badge: string) => {
    switch (badge) {
      case 'Công cụ AI':
      case 'Agent':
        return 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-200/80 dark:border-indigo-800/60';
      case 'MCP Server':
        return 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200/80 dark:border-blue-800/60';
      case 'Phần mềm':
        return 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200/80 dark:border-amber-800/60';
      default:
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-800/60';
    }
  };

  return (
    <section className={`w-full mx-auto px-4 sm:px-6 lg:px-8 py-7 transition-all duration-300 ${isExpanded ? 'max-w-[98%]' : 'max-w-7xl'}`}>
      {/* Tiêu đề mục & liên kết Xem tất cả */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Khám phá tài nguyên nổi bật
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Các công cụ AI, MCP Server, Skill và giải pháp phần mềm được ưa chuộng nhất
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

      {/* Lưới 4 thẻ nổi bật với giao diện chuẩn mực, cân bằng */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {featuredTools.map((item, idx) => {
          const t = item.tool;
          return (
            <div
              key={idx}
              onClick={() => onSelectTool(t)}
              className="group flex flex-col justify-between p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-700 transition-all cursor-pointer"
            >
              <div>
                {/* Header thẻ: Logo & Tên & Badge loại */}
                <div className="flex items-start space-x-3 mb-3">
                  {renderIcon(item.iconType)}
                  <div className="min-w-0">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                      {t.name}
                    </h3>
                    <span className={`inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full font-semibold border ${getBadgeStyle(item.customBadge)}`}>
                      {item.customBadge}
                    </span>
                  </div>
                </div>

                {/* Tóm tắt ngắn gọn */}
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4 min-h-[36px] line-clamp-2">
                  {t.summaryVi}
                </p>
              </div>

              <div>
                {/* Thông số thống kê: Sao, Lượt dùng, Cập nhật */}
                <div className="flex items-center space-x-3 text-[11px] text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800/80 mb-3">
                  <span className="flex items-center space-x-1 font-semibold text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{t.stars || 4.8}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Users className="w-3.5 h-3.5" />
                    <span>{idx === 0 ? '12.5k' : idx === 1 ? '8.2k' : idx === 2 ? '6.8k' : '15.1k'}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Cập nhật mới</span>
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
