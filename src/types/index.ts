export type ToolType = 
  | 'mcp' 
  | 'skill' 
  | 'agent' 
  | 'api' 
  | 'sdk' 
  | 'software' 
  | 'workflow' 
  | 'model' 
  | 'dataset' 
  | 'command' 
  | 'template' 
  | 'hook' 
  | 'setting' 
  | 'web_tool';

export type Platform = 'claude_desktop' | 'antigravity' | 'cursor' | 'windsurf' | 'web';

export type Category = 
  // 1. Lập trình & Kỹ thuật phần mềm (chi tiết hóa không gộp)
  | 'frontend_ui'
  | 'backend_api'
  | 'mobile_app'
  | 'qa_testing'
  // 2. Vận hành, Đám mây & Bảo mật
  | 'devops_cicd'
  | 'cloud_infrastructure'
  | 'cybersecurity_security'
  // 3. Cơ sở dữ liệu & Tri thức
  | 'database_sql_nosql'
  | 'vector_rag'
  // 4. Trí tuệ nhân tạo chuyên sâu
  | 'nlp_llm'
  | 'computer_vision'
  | 'speech_voice'
  | 'generative_ai_multimedia'
  // 5. Dữ liệu lớn & Phân tích
  | 'data_engineering'
  | 'data_science_analytics'
  // 6. Tự động hóa
  | 'web_scraping_crawling'
  | 'rpa_workflow_automation'
  // 7. Tài chính & Ngân hàng
  | 'banking_open_api'
  | 'payment_gateway'
  | 'investment_securities'
  // 8. Kế toán, Thuế & Hóa đơn
  | 'accounting_finance'
  | 'e_invoice_tax'
  // 9. Tài sản số & Web3
  | 'blockchain_web3'
  | 'crypto_defi'
  // 10. Doanh nghiệp & Quản trị
  | 'erp_enterprise'
  | 'crm_sales'
  | 'office_digital_docs'
  | 'hr_recruitment'
  // 11. Thương mại điện tử & Bán lẻ
  | 'ecommerce_marketplace'
  | 'pos_retail'
  // 12. Giao nhận & Kho bãi
  | 'warehouse_inventory'
  | 'logistics_shipping'
  // 13. Khách hàng & Dịch vụ số
  | 'telecom_cskh'
  | 'healthcare_medical'
  | 'pharmacy_wellness'
  | 'education_edtech'
  | 'legal_public_service'
  | 'tourism_hospitality'
  | 'vietnam'
  // Các phân loại cũ để tương thích ngược hoàn toàn
  | 'software_development'
  | 'devops_cloud'
  | 'database_storage'
  | 'ai_nlp_vision'
  | 'data_analytics_science'
  | 'automation_crawling'
  | 'finance_payment' 
  | 'accounting_tax'
  | 'crypto_blockchain'
  | 'business_erp'
  | 'ecommerce_retail' 
  | 'logistics_warehouse'
  | 'education_training'
  | 'business_admin' 
  | 'logistics_transport' 
  | 'ai_nlp_data' 
  | 'programming_devops' 
  | 'system_automation'
  | 'coding' | 'database' | 'cloud' | 'automation' | 'content' | 'search';

export type PricingModel = 'all' | 'free' | 'freemium' | 'paid' | 'contact';

export interface DemoImageItem {
  url: string;
  caption: string; // Ghi chú rõ ràng về ảnh demo (chức năng, giao diện, kịch bản)
}

export type DemoImage = string | DemoImageItem;

export interface PricingPlan {
  plan: string;
  price: string;
  actionText?: string;
  isPopular?: boolean;
}

export interface ConfigTemplate {
  platform: Platform;
  platformName: string;
  cliCommand?: string;
  jsonConfig: string;
}

export interface ToolVerification {
  checkedAt: string;
  sourceStatus: 'ok' | 'missing' | 'unknown';
  missingPackages: string[];
  guideIsTemplate: boolean;
  starsVerified: boolean;
}

export interface AITool {
  id: string;
  slug: string;
  name: string;
  icon: string;
  imageUrl?: string; // Ảnh đại diện / Banner demo chính thức (để trống nếu repo không có ảnh demo)
  demoImages?: DemoImage[]; // Danh sách tất cả ảnh demo có trong repo kèm ghi chú rõ ràng (để trống nếu repo không có)
  demoVideoUrl?: string; // Đường dẫn video demo nếu có
  toolType: ToolType;
  typeNameVi: string;
  category: Category;
  categoryNameVi: string;
  categories?: Category[]; // Danh sách 1 hoặc nhiều lĩnh vực chuyên môn mà tài nguyên thuộc về
  categoryNamesVi?: string[]; // Danh sách tên tiếng Việt của các lĩnh vực tương ứng
  isVietnamMarket?: boolean; // Đánh dấu tài nguyên dành riêng hoặc tối ưu cho thị trường Việt Nam
  platforms: Platform[];
  sourceUrl: string; // Nguồn dẫn chính thức (bắt buộc)
  authorName: string;
  license: string;
  summaryVi: string;
  purposeVi: string; // Công dụng chi tiết tiếng Việt (bắt buộc)
  featuresVi: string[];
  installGuideVi: string; // Hướng dẫn cài đặt tiếng Việt (bắt buộc)
  usageGuideVi: string; // Hướng dẫn sử dụng tiếng Việt (bắt buộc)
  samplePromptsVi: string[];
  readmeVi?: string; // Tài liệu README kỹ thuật tiếng Việt (dịch từ GitHub / tổng hợp chuẩn Markdown)
  configs: ConfigTemplate[];
  status: 'published' | 'pending' | 'draft' | 'rejected';
  contributedBy?: string; // Email người đóng góp
  contributedAt?: string; // Thời gian gửi đóng góp
  updatedAt?: string; // Thời gian cập nhật công cụ gần nhất
  reviewNote?: string; // Ghi chú xét duyệt của Quản trị viên
  stars?: number;
  featured?: boolean;
  linkHealth: 'healthy' | 'broken' | 'unchecked';
  verification?: ToolVerification; // Kết quả kiểm định dữ liệu (scripts/validate-data.cjs)

  // Các trường bổ sung hỗ trợ bộ giao diện chi tiết chuẩn mẫu
  pricingModel?: PricingModel;
  pricingText?: string; // Ví dụ: "Miễn phí", "Trả phí từ $20/tháng"
  pricingDetails?: PricingPlan[];
  prosVi?: string[]; // Ưu điểm nổi bật
  consVi?: string[]; // Nhược điểm & giới hạn
  usageCount?: string; // Lượt sử dụng (ví dụ: "12.5k")
  reviewCount?: string; // Lượt đánh giá (ví dụ: "12.5k")
  languages?: string[]; // Ngôn ngữ hỗ trợ (ví dụ: ["Tiếng Việt", "Tiếng Anh"])
  websiteUrl?: string; // Trang chủ chính thức
}

export interface CategoryInfo {
  id: Category | 'all';
  nameVi: string;
  descriptionVi: string;
  icon: string;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  toolIds: string[];
  isPublic: boolean;
  createdAt: string;
}

export interface GuideArticle {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  readTime: string;
  author: string;
  updatedAt: string;
  contentVi: string;
}

export interface UserProfile {
  email: string;
  displayName: string;
  photoURL?: string;
  title?: string; // Ví dụ: Kỹ sư AI, Chuyên gia giải pháp...
  bio?: string; // Tiểu sử ngắn / Giới thiệu bản thân
  phone?: string;
  githubUrl?: string;
  websiteUrl?: string;
  joinedAt?: string;
}

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  prefix?: string;
  createdAt: string;
  lastUsedAt?: string;
  expiresAt?: string;
  status: 'active' | 'revoked';
  usageCount: number;
  role?: 'developer' | 'admin' | 'read_only';
  rateLimitPerMin?: number;
  dailyQuota?: number;
  ipWhitelist?: string[];
}

export interface SecurityAuditLog {
  id: string;
  timestamp: string;
  keyId: string;
  ip: string;
  endpoint: string;
  method: string;
  statusCode: number;
  latencyMs: number;
  action: string;
  details: string;
}

export type PageRoute = 
  | { name: 'home' }
  | { name: 'category'; toolType: ToolType | 'all' }
  | { name: 'detail'; toolId: string }
  | { name: 'contribute' }
  | { name: 'collections' }
  | { name: 'guides' }
  | { name: 'guide_detail'; guideId: string }
  | { name: 'account' }
  | { name: 'api' }
  | { name: 'mcp' };

