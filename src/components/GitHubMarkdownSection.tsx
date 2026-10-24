import React, { useEffect, useMemo, useRef } from 'react';
import { renderGithubMarkdown, HEADING_ID_PREFIX } from '../lib/githubMarkdown';

const COPY_ICON = `<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>`;
const CHECK_ICON = `<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;

/**
 * Gắn nút sao chép giống GitHub vào mọi khối mã <pre> trong vùng nội dung Markdown.
 * Gọi lại mỗi khi HTML thay đổi.
 */
export function useGithubCodeCopy(containerRef: React.RefObject<HTMLElement | null>, deps: unknown[]) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.querySelectorAll('pre').forEach((pre) => {
      if (pre.querySelector('.github-code-copy-btn')) return;
      pre.classList.add('relative', 'group');
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'github-code-copy-btn';
      btn.title = 'Sao chép';
      btn.setAttribute('aria-label', 'Sao chép đoạn mã');
      btn.innerHTML = COPY_ICON;
      btn.addEventListener('click', (event) => {
        event.stopPropagation();
        const code = pre.querySelector('code');
        navigator.clipboard.writeText((code ? code.textContent : pre.textContent) || '');
        btn.innerHTML = CHECK_ICON;
        btn.classList.add('copied');
        setTimeout(() => {
          btn.innerHTML = COPY_ICON;
          btn.classList.remove('copied');
        }, 2000);
      });
      pre.appendChild(btn);
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
