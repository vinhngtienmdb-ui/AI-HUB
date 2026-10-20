import { AITool, CategoryInfo } from '../types';
import allToolsJson from './allTools.json';

export const CATEGORIES: CategoryInfo[] = [
  { id: 'all', nameVi: 'Tất cả lĩnh vực', descriptionVi: 'Toàn bộ kho tài nguyên công nghệ và giải pháp số', icon: 'Layers' },
  { id: 'software_development', nameVi: 'Lập trình & Kỹ thuật phần mềm', descriptionVi: 'Mã nguồn, thuật toán, ngôn ngữ, refactoring, code review và kiểm thử', icon: 'Code2' },
  { id: 'devops_cloud', nameVi: 'DevOps, Đám mây & Hạ tầng', descriptionVi: 'Docker, Kubernetes, CI/CD, AWS, GCP, Azure, Linux và giám sát hệ thống', icon: 'Cloud' },
  { id: 'database_storage', nameVi: 'Cơ sở dữ liệu & Lưu trữ', descriptionVi: 'PostgreSQL, MySQL, Redis, MongoDB, Supabase, sao lưu và truy vấn SQL', icon: 'Database' },
  { id: 'ai_nlp_vision', nameVi: 'Trí tuệ nhân tạo, Thị giác & Giọng nói', descriptionVi: 'Mô hình ngôn ngữ, PhoBERT, Camera AI, OCR, Text-to-Speech và xử lý ảnh', icon: 'Brain' },
  { id: 'data_analytics_science', nameVi: 'Dữ liệu lớn, RAG & Phân tích', descriptionVi: 'BigQuery, Spark, dbt, RAG, vector search, ETL và đường ống dữ liệu', icon: 'BarChart3' },
  { id: 'automation_crawling', nameVi: 'Tự động hóa & Thu thập dữ liệu', descriptionVi: 'Browser-use, RPA, crawl, cào dữ liệu web và bot tự động hóa', icon: 'Settings2' },
  { id: 'finance_payment', nameVi: 'Tài chính, Ngân hàng & Thanh toán', descriptionVi: 'VietQR, ví MoMo, ZaloPay, ngân hàng mở B2B và thanh toán trực tuyến', icon: 'CreditCard' },
  { id: 'accounting_tax', nameVi: 'Kế toán, Thuế & Hóa đơn', descriptionVi: 'MISA, Fast, hóa đơn điện tử, eTax, quyết toán thuế và chuẩn mực kế toán', icon: 'Receipt' },
  { id: 'crypto_blockchain', nameVi: 'Tài sản số, Web3 & Blockchain', descriptionVi: 'Blockchain, Web3, ví tiền mã hóa, smart contract và tài chính phi tập trung DeFi', icon: 'Coins' },
  { id: 'business_erp', nameVi: 'Doanh nghiệp & Quản trị ERP', descriptionVi: 'Hệ thống ERP, CRM bán hàng, văn phòng số, Bravo, Effect, 1Office, Base.vn', icon: 'Briefcase' },
  { id: 'hr_recruitment', nameVi: 'Nhân sự & Tuyển dụng', descriptionVi: 'TopCV, tuyển dụng ứng viên, chấm công nhận diện, tính lương và hồ sơ nhân sự', icon: 'Users' },
  { id: 'telecom_cskh', nameVi: 'Viễn thông & Chăm sóc khách hàng', descriptionVi: 'Zalo OA, tổng đài ảo VoIP, SMS Brandname OTP và trung tâm liên lạc CSKH', icon: 'Headphones' },
  { id: 'ecommerce_retail', nameVi: 'Thương mại điện tử & Bán lẻ', descriptionVi: 'Shopee, Lazada, Tiki, TikTok Shop, quản lý bán lẻ POS và chuỗi F&B ẩm thực', icon: 'ShoppingBag' },
  { id: 'logistics_warehouse', nameVi: 'Vận tải, Giao vận & Kho bãi', descriptionVi: 'GHN, GHTK, Viettel Post, WMS quản lý kho bãi và vận chuyển hàng hóa', icon: 'Truck' },
  { id: 'tourism_hospitality', nameVi: 'Du lịch, Khách sạn & Nghỉ dưỡng', descriptionVi: 'Vinpearl, Sun World, Vietravel, Saigontourist, Mường Thanh và đặt vé du lịch', icon: 'Compass' },
  { id: 'healthcare_medical', nameVi: 'Y tế, Bệnh viện & Sức khỏe', descriptionVi: 'Medpro, Bệnh viện Chợ Rẫy, Bạch Mai, Vinmec, hồ sơ EMR/HIS và dược phẩm', icon: 'Activity' },
  { id: 'education_training', nameVi: 'Giáo dục, Đào tạo & Đại học', descriptionVi: 'Đại học Bách Khoa, ĐHQG, UEH, FPT, EdTech, cổng tuyển sinh và hệ thống LMS', icon: 'GraduationCap' },
  { id: 'legal_public_service', nameVi: 'Pháp luật & Hành chính công', descriptionVi: 'Cổng dịch vụ công VNeID, địa giới 34 tỉnh thành, thủ tục xuất nhập cảnh và luật', icon: 'Scale' },
  { id: 'vietnam', nameVi: '🇻🇳 Thị Trường Việt Nam', descriptionVi: 'Các giải pháp công nghệ và dịch vụ số thiết kế riêng cho người Việt', icon: 'Sparkles' }
];

export const INITIAL_TOOLS: AITool[] = allToolsJson as AITool[];
