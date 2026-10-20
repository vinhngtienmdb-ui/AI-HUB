import React from 'react';
import { Heart, BookOpen, ShieldCheck, Mail } from 'lucide-react';
import { ToolType, Category } from '../types';

interface FooterProps {
  onOpenDocs: () => void;
  onOpenContribute: () => void;
  onSelectType: (type: ToolType) => void;
  onSelectCategory: (category: Category) => void;
  isExpanded?: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenDocs,
  onOpenContribute,
  onSelectType,
  onSelectCategory,
  isExpanded = true,
}) => {
  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors mt-12 text-slate-600 dark:text-slate-400">
      <div className={`w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 transition-all duration-300 ${isExpanded ? 'max-w-[98%]' : 'max-w-7xl'}`}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Cột 1: Thông tin thương hiệu */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="relative flex items-center justify-center w-8 h-8">
                <span className="absolute w-3 h-3 rounded-full bg-indigo-600 top-0 left-0" />
                <span className="absolute w-3.5 h-3.5 rounded-full bg-purple-500 bottom-0 left-1" />
                <span className="absolute w-2.5 h-2.5 rounded-full bg-blue-500 top-1.5 right-0" />
              </div>
              <span className="font-extrabold text-lg text-slate-900 dark:text-white tracking-tight">
                AI HUB <span className="text-indigo-600">VN</span>
              </span>
            </div>
            
            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              Nền tảng tra cứu, đánh giá và kết nối công cụ Trí tuệ Nhân tạo, Máy chủ MCP và Kỹ năng tác tử số 1 dành cho người Việt.
            </p>

            <div className="pt-1">
              <span className="inline-flex items-center space-x-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Quy trình VibeCode 12 Giai Đoạn</span>
              </span>
            </div>
          </div>

          {/* Cột 2: Danh mục tài nguyên */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Tài Nguyên AI
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectType('agent')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Công cụ & Tác tử AI (Agents)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectType('mcp')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Máy chủ MCP Servers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectType('skill')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Kỹ năng tác nhân (Agent Skills)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectType('workflow')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Quy trình tự động hóa (Workflows)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('vietnam')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold text-rose-600 dark:text-rose-400 transition-colors"
                >
                  🇻🇳 Hệ sinh thái API Việt Nam
                </button>
              </li>
            </ul>
          </div>

          {/* Cột 3: Hướng dẫn & Tiêu chuẩn */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Tiêu Chuẩn Kỹ Thuật
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenDocs}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left"
                >
                  Quy chuẩn 4 khối thông tin bắt buộc
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenDocs}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left"
                >
                  Cấu hình Claude Desktop & Antigravity
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenDocs}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left"
                >
                  Bộ tài liệu thiết kế hệ thống (01 - 22)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenContribute}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold text-indigo-600 dark:text-indigo-400 transition-colors"
                >
                  + Đóng góp tài nguyên mới
                </button>
              </li>
            </ul>
          </div>

          {/* Cột 4: Cộng đồng & Mã nguồn */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Mã Nguồn Mở
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">
              Dự án mã nguồn mở phát hành theo giấy phép MIT. Toàn bộ mã nguồn và dữ liệu công khai trên GitHub.
            </p>
            <div className="flex items-center space-x-2">
              <a
                href="https://github.com/vinhngtienmdb-ui/AI-HUB.git"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>GitHub Repository</span>
              </a>
            </div>
          </div>
        </div>

        {/* Dòng bản quyền chân trang */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-3">
          <p>
            © 2026 AI HUB VN. Phát triển vì sự phát triển của cộng đồng trí tuệ nhân tạo Việt Nam.
          </p>
          <div className="flex items-center space-x-4">
            <span>Bản quyền mã nguồn mở MIT</span>
            <span>•</span>
            <span>Phiên bản v1.9.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
