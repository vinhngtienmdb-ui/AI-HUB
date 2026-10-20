import { AITool, CategoryInfo } from '../types';
import allToolsJson from './allTools.json';

export const CATEGORIES: CategoryInfo[] = [
  { id: 'all', nameVi: 'Tất cả lĩnh vực', descriptionVi: 'Toàn bộ kho công cụ và kỹ năng tác tử', icon: 'Layers' },
  { id: 'vietnam', nameVi: '🇻🇳 Thị Trường Việt Nam', descriptionVi: 'Công cụ, MCP và Kỹ năng chuyên biệt cho doanh nghiệp & nhà phát triển Việt Nam', icon: 'Sparkles' },
  { id: 'coding', nameVi: 'Lập trình & Kỹ thuật', descriptionVi: 'Công cụ viết mã nguồn, gỡ lỗi và quản lý kho lưu trữ', icon: 'Code2' },
  { id: 'database', nameVi: 'Cơ sở dữ liệu', descriptionVi: 'Kết nối và truy vấn CSDL SQLite, PostgreSQL, MongoDB, Redis', icon: 'Database' },
  { id: 'automation', nameVi: 'Tự động hóa & Web', descriptionVi: 'Tự động hóa trình duyệt web, điều phối tác tử và cào dữ liệu', icon: 'Globe' },
  { id: 'search', nameVi: 'Tìm kiếm & Tài liệu', descriptionVi: 'Tra cứu thông tin Internet, tài liệu kỹ thuật và chỉ số', icon: 'Search' },
  { id: 'cloud', nameVi: 'Hạ tầng & Đám mây', descriptionVi: 'Quản trị tệp tin, Docker, Kubernetes và giám sát', icon: 'Cloud' },
  { id: 'content', nameVi: 'Nội dung & Đa phương tiện', descriptionVi: 'Xử lý giọng nói, đồ thị tri thức và tài chính', icon: 'Brain' },
];

export const INITIAL_TOOLS: AITool[] = allToolsJson as AITool[];
