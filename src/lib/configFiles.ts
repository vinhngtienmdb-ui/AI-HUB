import { ConfigTemplate } from '../types';

export interface ConfigFileInfo {
  /** Tên tệp hiển thị trên đầu khung mã. */
  fileName: string;
  /** Ghi chú về nội dung: đây là tệp thật của công cụ hay bản tóm tắt do AI HUB tổng hợp. */
  noteVi: string;
}

const MCP_FILES: Record<string, string> = {
  claude_code: '.mcp.json',
  claude_desktop: 'claude_desktop_config.json',
  claude: 'claude_desktop_config.json',
  cursor: '.cursor/mcp.json',
  antigravity: 'mcp_config.json',
  windsurf: 'mcp_config.json'
};

/** Xác định tên tệp và ý nghĩa của một cấu hình mẫu dựa trên nội dung JSON thật. */
export function describeConfigFile(config: ConfigTemplate): ConfigFileInfo {
  let parsed: Record<string, unknown> = {};
  try {
    parsed = JSON.parse(config.jsonConfig) || {};
  } catch {
    // Nội dung không phải JSON: hiển thị nguyên văn
  }

  if ('mcpServers' in parsed) {
    const fileName = MCP_FILES[config.platform as string] || 'mcp.json';
    return { fileName, noteVi: `Khai báo máy chủ MCP, đặt trong mục "mcpServers" của tệp ${fileName}.` };
  }
  if ('caiDat' in parsed) {
    const target = typeof parsed.tepDich === 'string' ? ` Lệnh cài sẽ tạo tệp ${parsed.tepDich}.` : '';
    return {
      fileName: 'cai-dat.json',
      noteVi: `Tóm tắt do AI HUB tổng hợp (lệnh cài, nguồn), không phải tệp cấu hình của công cụ.${target}`
    };
  }
  if (config.platform === 'claude_code' && ('hooks' in parsed || 'statusLine' in parsed || 'permissions' in parsed || 'env' in parsed || 'description' in parsed)) {
    return {
      fileName: '.claude/settings.json',
      noteVi: 'Tệp mẫu từ claude-code-templates; lệnh cài gộp các khóa này vào .claude/settings.json (trường "description" chỉ để mô tả).'
    };
  }
  return { fileName: 'config.json', noteVi: `Cấu hình mẫu cho ${config.platformName}.` };
}
