export type ToolType = 'mcp' | 'skill' | 'agent' | 'command' | 'template' | 'hook' | 'setting' | 'web_tool' | 'workflow';

export type Platform = 'claude_desktop' | 'antigravity' | 'cursor' | 'windsurf' | 'web';

export type Category = 'coding' | 'database' | 'cloud' | 'automation' | 'content' | 'search' | 'vietnam';

export interface DemoImageItem {
  url: string;
  caption: string; // Ghi chú rõ ràng về ảnh demo (chức năng, giao diện, kịch bản)
}

export type DemoImage = string | DemoImageItem;

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
}

export interface CategoryInfo {
  id: Category | 'all';
  nameVi: string;
  descriptionVi: string;
  icon: string;
}
