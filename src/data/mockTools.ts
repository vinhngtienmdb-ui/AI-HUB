import { AITool, CategoryInfo } from '../types';
import allToolsJson from './allTools.json';

export const CATEGORIES: CategoryInfo[] = [
  { id: 'all', nameVi: 'Tất cả lĩnh vực', descriptionVi: 'Toàn bộ kho tài nguyên công nghệ và giải pháp số', icon: 'Layers' },
  { id: 'finance_payment', nameVi: 'Tài chính, Ngân hàng & Thuế', descriptionVi: 'Thanh toán trực tuyến, VietQR, ví điện tử, ngân hàng mở B2B và kê khai thuế', icon: 'CreditCard' },
  { id: 'business_admin', nameVi: 'Doanh nghiệp & Quản trị', descriptionVi: 'Hệ thống ERP, CRM bán hàng, văn phòng số và tự động hóa quy trình nghiệp vụ', icon: 'Briefcase' },
  { id: 'ecommerce_retail', nameVi: 'Thương mại điện tử & Bán lẻ', descriptionVi: 'Sàn thương mại điện tử, livestream, quản lý kho bán lẻ POS và chuỗi F&B', icon: 'ShoppingBag' },
  { id: 'logistics_transport', nameVi: 'Vận tải & Giao vận', descriptionVi: 'Chuyển phát nhanh chặng cuối, giao hàng hỏa tốc và dịch vụ di chuyển thông minh', icon: 'Truck' },
  { id: 'telecom_cskh', nameVi: 'Viễn thông & Chăm sóc khách hàng', descriptionVi: 'Zalo OA, tổng đài ảo VoIP, SMS Brandname OTP và trợ lý hội thoại CSKH', icon: 'Headphones' },
  { id: 'legal_public_service', nameVi: 'Pháp luật & Hành chính công', descriptionVi: 'Quy hoạch địa giới 34 tỉnh thành, Cổng dịch vụ công VNeID và tra cứu luật', icon: 'Scale' },
  { id: 'hr_recruitment', nameVi: 'Nhân sự & Tuyển dụng', descriptionVi: 'Tuyển dụng ứng viên, sàng lọc CV thông minh, chấm công và tính lương BHXH', icon: 'Users' },
  { id: 'ai_nlp_data', nameVi: 'Trí tuệ nhân tạo & Dữ liệu', descriptionVi: 'Mô hình ngôn ngữ lớn tiếng Việt, PhoBERT, thị giác máy tính và giọng nói AI', icon: 'Brain' },
  { id: 'programming_devops', nameVi: 'Lập trình & Kỹ thuật phần mềm', descriptionVi: 'Công cụ phát triển mã nguồn, kiểm thử, kho lưu trữ và tối ưu hóa hệ thống', icon: 'Code2' },
  { id: 'system_automation', nameVi: 'Tự động hóa hệ thống & Web', descriptionVi: 'Tự động hóa trình duyệt web, điều phối luồng công việc và thu thập dữ liệu', icon: 'Globe' },
  { id: 'vietnam', nameVi: '🇻🇳 Thị Trường Việt Nam', descriptionVi: 'Các giải pháp công nghệ và dịch vụ số thiết kế riêng cho người Việt', icon: 'Sparkles' }
];

export const INITIAL_TOOLS: AITool[] = allToolsJson as AITool[];
