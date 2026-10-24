import { ToolType, Category, CategoryInfo } from '../types';
import { CATEGORIES } from './mockTools';

export interface ToolTypeInfo {
  id: ToolType;
  nameVi: string;
  descriptionVi: string;
  badgeColor: string;
}

export const DEFAULT_TOOL_TYPES: ToolTypeInfo[] = [
  { id: 'skill', nameVi: 'Skill', descriptionVi: 'Bộ kỹ năng chuyên môn hướng dẫn tác nhân AI thực thi nghiệp vụ', badgeColor: 'emerald' },
  { id: 'agent', nameVi: 'Agent', descriptionVi: 'Tác nhân trí tuệ nhân tạo tự chủ giải quyết bài toán phức tạp', badgeColor: 'indigo' },
  { id: 'mcp', nameVi: 'MCP Server', descriptionVi: 'Máy chủ giao thức ngữ cảnh mô hình Model Context Protocol', badgeColor: 'blue' },
  { id: 'api', nameVi: 'API', descriptionVi: 'Cổng giao tiếp lập trình ứng dụng REST, GraphQL và Webhook', badgeColor: 'sky' },
  { id: 'sdk', nameVi: 'SDK', descriptionVi: 'Bộ công cụ phát triển phần mềm và thư viện lập trình chính thức', badgeColor: 'teal' },
  { id: 'software', nameVi: 'Phần mềm', descriptionVi: 'Hệ thống ERP, CRM, Kế toán và giải pháp phần mềm quản trị số', badgeColor: 'amber' },
  { id: 'workflow', nameVi: 'Workflow', descriptionVi: 'Quy trình và luồng làm việc tự động hóa nhiều bước', badgeColor: 'purple' },
  { id: 'model', nameVi: 'Model', descriptionVi: 'Mô hình ngôn ngữ lớn, mô hình thị giác và trọng số trí tuệ nhân tạo', badgeColor: 'fuchsia' },
  { id: 'dataset', nameVi: 'Dataset', descriptionVi: 'Bộ dữ liệu chuẩn mực, địa giới hành chính và ngữ liệu huấn luyện', badgeColor: 'cyan' },
  { id: 'command', nameVi: 'Command', descriptionVi: 'Lệnh điều khiển và công cụ thực thi dòng lệnh CLI', badgeColor: 'slate' },
  { id: 'template', nameVi: 'Template', descriptionVi: 'Mẫu cấu hình và khuôn mẫu dự án dựng sẵn', badgeColor: 'orange' },
  { id: 'hook', nameVi: 'Hook', descriptionVi: 'Điểm móc chặn và kiểm soát sự kiện hệ thống', badgeColor: 'rose' },
  { id: 'setting', nameVi: 'Setting', descriptionVi: 'Cấu hình tham số và môi trường vận hành', badgeColor: 'violet' }
];

export function getToolTypeNameVi(type: ToolType, customTypes?: ToolTypeInfo[]): string {
  const list = customTypes || DEFAULT_TOOL_TYPES;
  const found = list.find((t) => t.id === type);
  if (found) return found.nameVi;
  if (type === 'software') return 'Phần mềm';
  if (type === 'mcp') return 'MCP Server';
  if (type === 'skill') return 'Skill';
  if (type === 'agent') return 'Agent';
  if (type === 'workflow') return 'Workflow';
  if (type === 'api') return 'API';
  if (type === 'sdk') return 'SDK';
  if (type === 'model') return 'Model';
  if (type === 'dataset') return 'Dataset';
  return type.toUpperCase();
}

export function getCategoryNameVi(category: Category, customCategories?: CategoryInfo[]): string {
  const list = customCategories || CATEGORIES;
  const found = list.find((c) => c.id === category);
  return found ? found.nameVi : category;
}
