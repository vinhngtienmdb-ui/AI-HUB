import React from 'react';
import { Search, X, Code2, FlaskConical, PenTool, Cog, Palette, Briefcase } from 'lucide-react';
import { Category } from '../types';

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: Category | 'all';
  setSelectedCategory: (category: Category | 'all') => void;
  onSearchSubmit?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  onSearchSubmit,
}) => {
  // Danh sách các lối tắt theo nhu cầu công việc
  const shortcuts = [
    { id: 'software_development' as Category, label: 'Lập trình', icon: Code2 },
    { id: 'finance_payment' as Category, label: 'Tài chính & Ngân hàng', icon: Briefcase },
    { id: 'accounting_tax' as Category, label: 'Kế toán & Thuế', icon: Briefcase },
    { id: 'healthcare_medical' as Category, label: 'Y tế & Bệnh viện', icon: FlaskConical },
    { id: 'business_erp' as Category, label: 'Doanh nghiệp ERP', icon: Briefcase },
    { id: 'ecommerce_retail' as Category, label: 'Bán lẻ & TMĐT', icon: PenTool },
    { id: 'ai_nlp_vision' as Category, label: 'Trí tuệ nhân tạo', icon: FlaskConical },
    { id: 'legal_public_service' as Category, label: 'Hành chính công', icon: Cog },
  ];

  const handleShortcutClick = (cat: Category) => {
    setSelectedCategory(cat);
    const browseElement = document.getElementById('browse-section');
    if (browseElement) {
      browseElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchSubmit) onSearchSubmit();
    const browseElement = document.getElementById('browse-section');
    if (browseElement) {
      browseElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/40 via-white to-slate-50 dark:from-slate-900/60 dark:via-slate-950 dark:to-slate-950 pt-14 pb-12 transition-colors border-b border-slate-100 dark:border-slate-800">
      
      {/* Vòng sáng nền mờ trang trí tinh tế */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-purple-200/40 via-indigo-200/30 to-blue-200/30 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-blue-900/10 blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* HUY HIỆU GIỚI THIỆU: KHO TÀI NGUYÊN AI CHO NGƯỜI VIỆT */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/80 shadow-sm mb-6 animate-fadeIn">
          <span>KHO TÀI NGUYÊN AI CHO NGƯỜI VIỆT</span>
        </div>

        {/* TIÊU ĐỀ CHÍNH LỚN & ĐOẠN MÔ TẢ NỀN TẢNG */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.18] mb-5">
          Tìm đúng <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">công cụ AI.</span>
          <br />
          Làm việc hiệu quả hơn.
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-300 mb-8 font-normal leading-relaxed">
          Khám phá, đánh giá và kết nối công cụ AI, MCP Servers và Agent Skills trong một nơi.
        </p>

        {/* KHUNG TÌM KIẾM TRUNG TÂM LỚN (BO TRÒN MỀM MẠI, NÚT TÌM KIẾM TÍM NỔI BẬT) */}
        <form onSubmit={handleFormSubmit} className="max-w-2xl mx-auto mb-6 relative">
          <div className="relative flex items-center p-1.5 rounded-full sm:rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl shadow-indigo-500/5 focus-within:border-indigo-500 dark:focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all">
            <Search className="w-5 h-5 ml-4 text-slate-400 dark:text-slate-500 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Bạn muốn AI giúp gì hôm nay?"
              className="w-full px-3 py-3 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm sm:text-base focus:outline-none"
            />
            
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="mr-2 p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <button
              type="submit"
              className="px-6 py-2.5 rounded-full sm:rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-600/20 transition-all shrink-0 hover:scale-[1.02] active:scale-[0.98]"
            >
              Tìm kiếm
            </button>
          </div>
        </form>

        {/* CÁC LỐI TẮT THEO NHU CẦU CÔNG VIỆC (TAGS DƯỚI THANH TÌM KIẾM) */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          {shortcuts.map((item, idx) => {
            const Icon = item.icon;
            const isSelected = selectedCategory === item.id;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleShortcutClick(item.id)}
                className={`inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  isSelected
                    ? 'bg-indigo-50 dark:bg-indigo-950/70 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300 shadow-sm'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-indigo-300 dark:hover:border-indigo-700 hover:text-indigo-600 dark:hover:text-indigo-300'
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-indigo-500" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
