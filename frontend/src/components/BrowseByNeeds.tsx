import React from 'react';
import { 
  Code2, 
  CreditCard, 
  Receipt, 
  Cloud, 
  Brain, 
  Briefcase, 
  Activity, 
  ShoppingBag, 
  Database, 
  BarChart3, 
  Truck, 
  Scale, 
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
      id: 'software_development' as Category,
      title: 'Lập trình & Kỹ thuật phần mềm',
      description: 'Mã nguồn, refactoring, code review & kiểm thử',
      icon: Code2,
      bgColor: 'bg-indigo-50 dark:bg-indigo-950/40',
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      borderColor: 'border-indigo-100 dark:border-indigo-900/40',
    },
    {
      id: 'finance_payment' as Category,
      title: 'Tài chính, Ngân hàng & Thanh toán',
      description: 'VietQR, ví điện tử MoMo, ZaloPay & ngân hàng mở',
      icon: CreditCard,
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/40',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      borderColor: 'border-emerald-100 dark:border-emerald-900/40',
    },
    {
      id: 'accounting_tax' as Category,
      title: 'Kế toán, Thuế & Hóa đơn',
      description: 'MISA, Fast, hóa đơn điện tử, eTax & quyết toán',
      icon: Receipt,
      bgColor: 'bg-amber-50 dark:bg-amber-950/40',
      iconColor: 'text-amber-600 dark:text-amber-400',
      borderColor: 'border-amber-100 dark:border-amber-900/40',
    },
    {
      id: 'devops_cloud' as Category,
      title: 'DevOps, Đám mây & Hạ tầng',
      description: 'Docker, Kubernetes, CI/CD, AWS, GCP & Linux',
      icon: Cloud,
      bgColor: 'bg-sky-50 dark:bg-sky-950/40',
      iconColor: 'text-sky-600 dark:text-sky-400',
      borderColor: 'border-sky-100 dark:border-sky-900/40',
    },
    {
      id: 'ai_nlp_vision' as Category,
      title: 'Trí tuệ nhân tạo & Thị giác máy tính',
      description: 'Mô hình ngôn ngữ, PhoBERT, Camera AI & OCR',
      icon: Brain,
      bgColor: 'bg-purple-50 dark:bg-purple-950/40',
      iconColor: 'text-purple-600 dark:text-purple-400',
      borderColor: 'border-purple-100 dark:border-purple-900/40',
    },
    {
      id: 'business_erp' as Category,
      title: 'Doanh nghiệp & Quản trị ERP',
      description: 'MISA, Bravo, 1Office, Base.vn, CRM văn phòng số',
      icon: Briefcase,
      bgColor: 'bg-orange-50 dark:bg-orange-950/40',
      iconColor: 'text-orange-600 dark:text-orange-400',
      borderColor: 'border-orange-100 dark:border-orange-900/40',
    },
    {
      id: 'healthcare_medical' as Category,
      title: 'Y tế, Bệnh viện & Sức khỏe',
      description: 'Bệnh viện Chợ Rẫy, Bạch Mai, Vinmec & Medpro',
      icon: Activity,
      bgColor: 'bg-rose-50 dark:bg-rose-950/40',
      iconColor: 'text-rose-600 dark:text-rose-400',
      borderColor: 'border-rose-100 dark:border-rose-900/40',
    },
    {
      id: 'ecommerce_retail' as Category,
      title: 'Thương mại điện tử & Bán lẻ',
      description: 'Shopee, Lazada, TikTok Shop, POS, F&B chuỗi',
      icon: ShoppingBag,
      bgColor: 'bg-pink-50 dark:bg-pink-950/40',
      iconColor: 'text-pink-600 dark:text-pink-400',
      borderColor: 'border-pink-100 dark:border-pink-900/40',
    },
    {
      id: 'database_storage' as Category,
      title: 'Cơ sở dữ liệu & Lưu trữ',
      description: 'PostgreSQL, MySQL, Redis, MongoDB & Supabase',
      icon: Database,
      bgColor: 'bg-blue-50 dark:bg-blue-950/40',
      iconColor: 'text-blue-600 dark:text-blue-400',
      borderColor: 'border-blue-100 dark:border-blue-900/40',
    },
    {
      id: 'data_analytics_science' as Category,
      title: 'Dữ liệu lớn, RAG & Phân tích',
      description: 'BigQuery, Spark, dbt, RAG & vector database',
      icon: BarChart3,
      bgColor: 'bg-teal-50 dark:bg-teal-950/40',
      iconColor: 'text-teal-600 dark:text-teal-400',
      borderColor: 'border-teal-100 dark:border-teal-900/40',
    },
    {
      id: 'logistics_warehouse' as Category,
      title: 'Vận tải & Giao vận Logistics',
      description: 'GHN, GHTK, Viettel Post, WMS kho bãi & vận tải',
      icon: Truck,
      bgColor: 'bg-cyan-50 dark:bg-cyan-950/40',
      iconColor: 'text-cyan-600 dark:text-cyan-400',
      borderColor: 'border-cyan-100 dark:border-cyan-900/40',
    },
    {
      id: 'legal_public_service' as Category,
      title: 'Hành chính công & Pháp luật',
      description: 'Địa giới 34 tỉnh thành, VNeID, BHXH, văn bản luật',
      icon: Scale,
      bgColor: 'bg-slate-100 dark:bg-slate-800',
      iconColor: 'text-slate-700 dark:text-slate-300',
      borderColor: 'border-slate-200 dark:border-slate-700',
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
          Khám phá các giải pháp AI, MCP, API và phần mềm được phân chia chuyên sâu theo từng bài toán thực tế
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
