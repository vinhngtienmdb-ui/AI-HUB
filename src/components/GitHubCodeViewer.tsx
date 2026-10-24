import React, { useMemo, useState } from 'react';
import { Copy, Check, FileCode, Info } from 'lucide-react';
import { GitHubMarkdownSection } from './GitHubMarkdownSection';

interface GitHubCodeViewerProps {
  code: string;
  fileName?: string;
  platformName?: string;
  cliCommand?: string;
  /** Ghi chú ý nghĩa của tệp (tệp thật của công cụ hay bản tóm tắt). */
  noteVi?: string;
}

type Token = { text: string; kind: 'key' | 'string' | 'number' | 'literal' | 'punct' | 'plain' };

// Tô màu JSON theo bảng màu GitHub: khóa, chuỗi, số, true/false/null
const JSON_TOKEN = /("(?:[^"\\]|\\.)*")(\s*:)?|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)|\b(true|false|null)\b|([{}[\],:])/g;

function tokenizeJsonLine(line: string): Token[] {
  const tokens: Token[] = [];
  let lastIndex = 0;
  for (const match of line.matchAll(JSON_TOKEN)) {
    const index = match.index ?? 0;
    if (index > lastIndex) tokens.push({ text: line.slice(lastIndex, index), kind: 'plain' });
    if (match[1]) {
      tokens.push({ text: match[1], kind: match[2] ? 'key' : 'string' });
      if (match[2]) tokens.push({ text: match[2], kind: 'punct' });
    } else if (match[3]) tokens.push({ text: match[3], kind: 'number' });
    else if (match[4]) tokens.push({ text: match[4], kind: 'literal' });
    else tokens.push({ text: match[5], kind: 'punct' });
    lastIndex = index + match[0].length;
  }
  if (lastIndex < line.length) tokens.push({ text: line.slice(lastIndex), kind: 'plain' });
  return tokens;
}

/** Khung xem tệp giống trang xem tệp (blob) của GitHub: tên tệp, số dòng, kích thước, nút sao chép, cột số dòng. */
export const GitHubCodeViewer: React.FC<GitHubCodeViewerProps> = ({
  code,
  fileName = 'config.json',
  platformName,
  cliCommand,
  noteVi
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const lines = useMemo(() => (code ? code.replace(/\s+$/, '').split('\n') : []), [code]);
  const tokenized = useMemo(() => lines.map(tokenizeJsonLine), [lines]);
  const bytes = useMemo(() => new TextEncoder().encode(code || '').length, [code]);

  const handleCopyCode = () => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Lệnh cài đặt hiển thị như khối mã trong README GitHub */}
      {cliCommand && (
        <GitHubMarkdownSection markdown={`**Lệnh cài đặt${platformName ? ` — ${platformName}` : ''}:**\n\n\`\`\`bash\n${cliCommand}\n\`\`\``} />
      )}

      <div className="gh-blob">
        <div className="gh-blob-header">
          <div className="flex items-center gap-2 min-w-0">
            <FileCode className="w-4 h-4 shrink-0 gh-blob-muted" />
            <span className="font-semibold truncate font-mono">{fileName}</span>
            {platformName && <span className="gh-blob-label hidden sm:inline-block">{platformName}</span>}
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="hidden md:inline gh-blob-muted">
              {lines.length} dòng · {bytes.toLocaleString('vi-VN')} byte
            </span>
            <button type="button" onClick={handleCopyCode} className="gh-blob-button" title="Sao chép nội dung tệp" aria-label="Sao chép nội dung tệp">
              {copiedCode ? <Check className="w-3.5 h-3.5 gh-blob-success" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        <div className="gh-blob-body">
          <table>
            <tbody>
              {tokenized.map((tokens, idx) => (
                <tr key={idx}>
                  <td className="gh-blob-num" data-line={idx + 1} />
                  <td className="gh-blob-code">
                    {tokens.map((token, tIdx) => (
                      <span key={tIdx} className={`gh-tok-${token.kind}`}>{token.text}</span>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {noteVi && (
          <div className="gh-blob-footer">
            <Info className="w-3.5 h-3.5 shrink-0" />
            <span>{noteVi}</span>
          </div>
        )}
      </div>
    </div>
  );
};
