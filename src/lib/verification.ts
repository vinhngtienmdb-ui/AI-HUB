import { AITool } from '../types';

// Số sao chỉ được hiển thị khi đã xác minh từ GitHub (scripts/validate-data.cjs với GITHUB_TOKEN).
// Số sao chưa xác minh trong dữ liệu cũ được sinh ngẫu nhiên nên không hiển thị.
export const getVerifiedStars = (tool: Pick<AITool, 'stars' | 'verification'>): number | null =>
  tool.verification?.starsVerified && typeof tool.stars === 'number' ? tool.stars : null;

export const formatStars = (stars: number): string =>
  stars >= 1000 ? `${(stars / 1000).toFixed(1)}k` : String(stars);

// Cảnh báo chất lượng dữ liệu hiển thị cho người dùng ở trang chi tiết
export const getVerificationWarnings = (tool: Pick<AITool, 'verification' | 'linkHealth'>): string[] => {
  const v = tool.verification;
  const warnings: string[] = [];
  if (tool.linkHealth === 'broken' || v?.sourceStatus === 'missing') {
    warnings.push('Liên kết nguồn không tồn tại tại lần kiểm tra gần nhất. Hãy tự xác minh trước khi sử dụng.');
  }
  if (v?.missingPackages?.length) {
    warnings.push(`Gói npm trong câu lệnh cài đặt không tồn tại trên npm: ${v.missingPackages.join(', ')}. Không chạy câu lệnh này.`);
  }
  if (v?.guideIsTemplate) {
    warnings.push('Hướng dẫn cài đặt và sử dụng là nội dung mẫu chung, chưa được viết riêng cho công cụ này. Hãy làm theo tài liệu tại liên kết nguồn.');
  }
  return warnings;
};
