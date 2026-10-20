import React from 'react';
import { 
  CreditCard, 
  Scale, 
  Briefcase, 
  ShoppingBag, 
  Truck, 
  Headphones, 
  Brain, 
  Code2, 
  ChevronRight 
} from 'lucide-react';
import { Category } from '../types';

interface BrowseByNeedsProps {
  onSelectCategory: (category: Category) => void;
  isExpanded?: boolean;
}

export const BrowseByNeeds: React.FC<BrowseByNeedsProps> = ({ onSelectCategory, isExpanded = true }) => {
  const needs = [
    {
      id: 'finance_payment' as Category,
      title: 'Tài chính, Ngân hàng & Thuế',
      description: 'VietQR, ví điện tử, kế toán thuế & hóa đơn',
      icon: CreditCard,
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/40',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      borderColor: 'border-emerald-100 dark:border-emerald-900/40',
    },
    {
      id: 'legal_public_service' as Category,
      title: 'Hành chính công & Pháp luật',
      description: 'Địa giới 34 tỉnh thành, VNeID, BHXH, văn bản luật',
      icon: Scale,
      bgColor: 'bg-blue-50 dark:bg-blue-950/40',
      iconColor: 'text-blue-600 dark:text-blue-400',
      borderColor: 'border-blue-100 dark:border-blue-900/40',
    },
    {
      id: 'business_admin' as Category,
      title: 'Doanh nghiệp & Quản trị ERP',
      description: 'MISA, Fast, Bravo, Base.vn, CRM văn phòng số',
      icon: Briefcase,
      bgColor: 'bg-amber-50 dark:bg-amber-950/40',
      iconColor: 'text-amber-600 dark:text-amber-400',
      borderColor: 'border-amber-100 dark:border-amber-900/40',
    },
    {
      id: 'ecommerce_retail' as Category,
      title: 'Thương mại điện tử & Bán lẻ',
      description: 'Shopee, Lazada, TikTok Shop, POS, F&B chuỗi',
      icon: ShoppingBag,
      bgColor: 'bg-rose-50 dark:bg-rose-950/40',
      iconColor: 'text-rose-600 dark:text-rose-400',
      borderColor: 'border-rose-100 dark:border-rose-900/40',
    },
    {
      id: 'logistics_transport' as Category,
      title: 'Vận tải & Giao vận Logistics',
      description: 'GHN, GHTK, Viettel Post, WMS kho bãi & vận tải',
      icon: Truck,
      bgColor: 'bg-cyan-50 dark:bg-cyan-950/40',
      iconColor: 'text-cyan-600 dark:text-cyan-400',
      borderColor: 'border-cyan-100 dark:border-cyan-900/40',
    },
    {
      id: 'telecom_cskh' as Category,
      title: 'Viễn thông & CSKH Tổng đài',
      description: 'Zalo OA, tổng đài ảo VoIP, SMS Brandname OTP',
      icon: Headphones,
      bgColor: 'bg-indigo-50 dark:bg-indigo-950/40',
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      borderColor: 'border-indigo-100 dark:border-indigo-900/40',
    },
    {
      id: 'ai_nlp_data' as Category,
      title: 'Trí tuệ nhân tạo & Dữ liệu',
      description: 'LLM Tiếng Việt, PhoBERT, Camera AI, giọng nói',
      icon: Brain,
      bgColor: 'bg-purple-50 dark:bg-purple-950/40',
      iconColor: 'text-purple-600 dark:text-purple-400',
      borderColor: 'border-purple-100 dark:border-purple-900/40',
    },
    {
      id: 'programming_devops' as Category,
      title: 'Lập trình & Kỹ thuật phần mềm',
      description: 'Mã nguồn, Docker, CI/CD, kiểm thử & đám mây',
      icon: Code2,
      bgColor: 'bg-violet-50 dark:bg-violet-950/40',
      iconColor: 'text-violet-600 dark:text-violet-400',
      borderColor: 'border-violet-100 dark:border-violet-900/40',
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
    <section className={`w-full mx-auto px-4 sm:px-6 lg:px-8 py-7 transition-all duration-300 ${isExpanded ? 'max-w-[98%]' : 'max-w-7xl'}`}>
      <div className="mb-5">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Chọn theo lĩnh vực chuyên môn
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Khám phá các giải pháp AI, MCP và phần mềm chuẩn hóa theo từng bài toán nghiệp vụ
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
              <div className="flex items-center space-x-3.5 min-w-0">
                <div className={`w-11 h-11 rounded-xl ${item.bgColor} border ${item.borderColor} flex items-center justify-center shrink-0`}>
                  <Icon className={`w-5 h-5 ${item.iconColor}`} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="p-1 rounded-full text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-1 transition-all shrink-0 ml-1">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
