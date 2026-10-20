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
  | 'finance_payment' 
  | 'business_admin' 
  | 'ecommerce_retail' 
  | 'logistics_transport' 
  | 'telecom_cskh' 
  | 'legal_public_service' 
  | 'hr_recruitment' 
  | 'ai_nlp_data' 
  | 'programming_devops' 
  | 'system_automation'
  | 'coding' | 'database' | 'cloud' | 'automation' | 'content' | 'search' | 'vietnam';

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
  configs: ConfigTemplate[];
  status: 'published' | 'pending' | 'draft';
  stars?: number;
  featured?: boolean;
  linkHealth: 'healthy' | 'broken' | 'unchecked';

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

export type PageRoute = 
  | { name: 'home' }
  | { name: 'category'; toolType: ToolType | 'all' }
  | { name: 'detail'; toolId: string }
  | { name: 'contribute' }
  | { name: 'collections' }
  | { name: 'guides' }
  | { name: 'guide_detail'; guideId: string }
  | { name: 'account' };

