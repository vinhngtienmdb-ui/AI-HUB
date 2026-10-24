import React, { useEffect, useMemo, useRef } from 'react';
import { renderGithubMarkdown, HEADING_ID_PREFIX } from '../lib/githubMarkdown';
import { copyText } from '../lib/clipboard';

const COPY_ICON = `<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>`;
const CHECK_ICON = `<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;

// Đoạn mã nội dòng được coi là câu lệnh (có nút sao chép riêng): bắt đầu bằng chương trình dòng lệnh phổ biến
// kèm tham số, đường dẫn thực thi (./, scripts/), hoặc lệnh gạch chéo của Claude Code (/mcp, /hooks)
const INLINE_COMMAND = /^(?:\$\s*)?(?:(?:npx|npm|pnpm|pnpx|yarn|bunx|bun|git|docker|docker-compose|pip3?|pipx|uvx?|python3?|node|deno|go|cargo|brew|curl|wget|make|claude|codex|cd|chmod|sudo|apt(?:-get)?|kubectl|helm|terraform|ollama|office|gh|cp|mkdir)\s+\S|\.\/\S|scripts[\/\\]\S|\/[a-z][\w-]*(?:\s|$))/i;

export function isInlineCommand(text: string): boolean {
  return text.length >= 3 && text.length <= 400 && INLINE_COMMAND.test(text.trim());
}

function createCopyButton(className: string, label: string, getText: () => string) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = className;
  btn.title = label;
  btn.setAttribute('aria-label', label);
  btn.innerHTML = COPY_ICON;
  btn.addEventListener('click', async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const ok = await copyText(getText());
    btn.innerHTML = ok ? CHECK_ICON : COPY_ICON;
    btn.title = ok ? 'Đã sao chép' : 'Không sao chép được';
    btn.classList.toggle('copied', ok);
    setTimeout(() => {
      btn.innerHTML = COPY_ICON;
      btn.title = label;
      btn.classList.remove('copied');
    }, 2000);
  });
  return btn;
}

/**
 * Gắn nút sao chép giống GitHub vào mọi khối mã <pre>, và vào các đoạn mã nội dòng là câu lệnh
 * (ví dụ `npx claude-code-templates@latest ...` trong một bước cài đặt). Gọi lại mỗi khi HTML thay đổi.
 */
export function useGithubCodeCopy(containerRef: React.RefObject<HTMLElement | null>, deps: unknown[]) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.querySelectorAll('pre').forEach((pre) => {
      if (pre.querySelector('.github-code-copy-btn')) return;
      const code = pre.querySelector('code');
      const text = ((code ? code.textContent : pre.textContent) || '').replace(/\n$/, '');
      pre.appendChild(createCopyButton('github-code-copy-btn', 'Sao chép', () => text));
    });
    container.querySelectorAll('code').forEach((code) => {
      if (code.closest('pre') || code.nextElementSibling?.classList.contains('github-inline-copy-btn')) return;
      const text = (code.textContent || '').replace(/^\$\s*/, '');
      if (!isInlineCommand(text)) return;
      code.after(createCopyButton('github-inline-copy-btn', 'Sao chép lệnh', () => text));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/** Neo trong Markdown (#muc) cuộn tới tiêu đề thay vì đổi đường dẫn hash của ứng dụng. */
export function handleMarkdownAnchorClick(event: React.MouseEvent<HTMLElement>, container: HTMLElement | null) {
  const link = (event.target as HTMLElement).closest('a');
  const href = link?.getAttribute('href');
  if (!href || !href.startsWith('#')) return;
  event.preventDefault();
  const target = container?.querySelector(`[id="${HEADING_ID_PREFIX}${CSS.escape(decodeURIComponent(href.slice(1)).toLowerCase())}"]`);
  target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

interface GitHubMarkdownSectionProps {
  markdown: string;
  /** Xuống dòng đơn thành <br> (mặc định true cho nội dung tiếng Việt sinh tự động). */
  breaks?: boolean;
  className?: string;
}

/** Vùng Markdown hiển thị giống GitHub, có nút sao chép cho khối mã. */
export const GitHubMarkdownSection: React.FC<GitHubMarkdownSectionProps> = ({ markdown, breaks = true, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const html = useMemo(() => renderGithubMarkdown(markdown, { breaks }), [markdown, breaks]);
  useGithubCodeCopy(ref, [html]);
  return (
    <div
      ref={ref}
      onClick={(event) => handleMarkdownAnchorClick(event, ref.current)}
      className={`github-markdown-body ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
