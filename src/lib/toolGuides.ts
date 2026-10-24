/**
 * Dựng nội dung Markdown cho tab "Cách sử dụng & Cài đặt" từ dữ liệu công cụ,
 * để hiển thị giống README trên GitHub (tiêu đề, danh sách đánh số, khối mã có nút sao chép).
 */
import { AITool } from '../types';

/**
 * Chuyển hướng dẫn dạng dòng "Bước N: ..." / "Yêu cầu: ..." thành Markdown có danh sách đánh số,
 * để hiển thị như README trên GitHub. Hướng dẫn đã là Markdown vẫn giữ nguyên.
 */
export function guideToMarkdown(text: string): string {
  if (!text) return '';
  const out: string[] = [];
  let previousWasStep = false;
  for (const rawLine of text.split('\n')) {
    const line = rawLine.trimEnd();
    const step = line.match(/^\s*Bước\s+(\d+)\s*(?:\(([^)]*)\))?\s*[:.]\s*(.*)$/);
    const last = out[out.length - 1];
    if (step) {
      // Danh sách Markdown cần một dòng trống phía trước
      if (!previousWasStep && last !== undefined && last !== '') out.push('');
      const [, number, label, body] = step;
      out.push(`${number}. ${label ? `**${label}:** ` : ''}${body}`);
      previousWasStep = true;
      continue;
    }
    if (previousWasStep && line.trim() !== '') out.push('');
    previousWasStep = false;
    const note = line.match(/^(Yêu cầu|Lưu ý|Ghi chú)\s*:\s*(.*)$/);
    out.push(note ? `**${note[1]}:** ${note[2]}` : line);
  }
  return out.join('\n');
}

const fence = (lang: string, body: string) => {
  // Dùng hàng rào dài hơn mọi chuỗi ``` trong nội dung
  const longest = Math.max(2, ...(body.match(/`+/g) || []).map((m) => m.length));
  const marks = '`'.repeat(longest + 1);
  return `${marks}${lang}\n${body}\n${marks}`;
};

/** Mục cài đặt: lệnh cài của từng nền tảng (khối mã) và hướng dẫn từng bước. */
export function buildInstallMarkdown(tool: Pick<AITool, 'configs' | 'installGuideVi'>): string {
  const parts = ['## Cài đặt'];
  const withCommand = (tool.configs || []).filter((c) => c.cliCommand);
  const seen = new Set<string>();
  for (const config of withCommand) {
    if (seen.has(config.cliCommand!)) continue;
    seen.add(config.cliCommand!);
    if (withCommand.length > 1) parts.push(`**${config.platformName}**`);
    parts.push(fence('bash', config.cliCommand!));
  }
  if (tool.installGuideVi) parts.push(guideToMarkdown(tool.installGuideVi));
  return parts.join('\n\n');
}

/** Mục sử dụng: hướng dẫn từng bước và câu lệnh mẫu (mỗi câu một khối có nút sao chép). */
export function buildUsageMarkdown(tool: Pick<AITool, 'usageGuideVi' | 'samplePromptsVi'>): string {
  const parts = ['## Cách sử dụng'];
  if (tool.usageGuideVi) parts.push(guideToMarkdown(tool.usageGuideVi));
  const prompts = tool.samplePromptsVi || [];
  if (prompts.length) {
    parts.push('### Câu lệnh mẫu');
    for (const prompt of prompts) parts.push(fence('text', prompt));
  }
  return parts.join('\n\n');
}
