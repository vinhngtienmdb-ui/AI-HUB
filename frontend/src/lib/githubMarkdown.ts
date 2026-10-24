/**
 * Hiển thị Markdown giống trang README trên GitHub.
 *
 * - Chuyển Markdown sang HTML bằng marked (GitHub Flavored Markdown), làm sạch bằng DOMPurify
 *   (README là nội dung bên thứ ba: bỏ <script>, thuộc tính on*, liên kết javascript:).
 * - Sau khi làm sạch: gắn id cho tiêu đề theo cách GitHub tạo neo, đổi đường dẫn tương đối của ảnh/liên kết
 *   sang địa chỉ tuyệt đối trên GitHub, chuyển khối "> [!NOTE]" thành hộp cảnh báo như GitHub,
 *   mở liên kết ngoài ở tab mới.
 * - Đọc README gốc của repo qua GitHub API (có CORS), không cần khóa.
 */
import { marked } from 'marked';
import DOMPurify from 'dompurify';

/** Tiền tố id của tiêu đề README, tránh trùng id với phần còn lại của trang. */
export const HEADING_ID_PREFIX = 'readme-';

export interface GithubSource {
  owner: string;
  repo: string;
  ref: string;
  /** Đường dẫn trong repo: thư mục (kind = 'dir') hoặc tệp (kind = 'file'); rỗng với kind = 'repo'. */
  path: string;
  kind: 'repo' | 'dir' | 'file';
}

export interface MarkdownBase {
  owner: string;
  repo: string;
  ref: string;
  /** Thư mục chứa tệp Markdown, dùng để giải đường dẫn tương đối. */
  dir: string;
}

/** Phân tích liên kết nguồn GitHub (gốc repo, thư mục tree/..., hoặc tệp blob/...). */
export function parseGithubSource(sourceUrl?: string): GithubSource | null {
  if (!sourceUrl) return null;
  const match = sourceUrl.match(/^https:\/\/github\.com\/([^/?#]+)\/([^/?#]+)(?:\/(tree|blob)\/([^/?#]+)(?:\/([^?#]*))?)?\/?(?:[?#].*)?$/);
  if (!match) return null;
  const [, owner, rawRepo, type, ref, path = ''] = match;
  const repo = rawRepo.replace(/\.git$/, '');
  if (!type) return { owner, repo, ref: 'HEAD', path: '', kind: 'repo' };
  const cleanPath = path.replace(/\/+$/, '');
  if (type === 'blob') return { owner, repo, ref, path: cleanPath, kind: 'file' };
  return { owner, repo, ref, path: cleanPath, kind: cleanPath ? 'dir' : 'repo' };
}

const dirname = (path: string) => (path.includes('/') ? path.slice(0, path.lastIndexOf('/')) : '');

const readmeCache = new Map<string, Promise<{ markdown: string; base: MarkdownBase; fileUrl: string }>>();

/** Lấy README gốc (hoặc tệp Markdown) từ GitHub cho một liên kết nguồn. */
export function fetchOriginalReadme(source: GithubSource) {
  const key = `${source.owner}/${source.repo}@${source.ref}:${source.kind}:${source.path}`;
  const cached = readmeCache.get(key);
  if (cached) return cached;

  const promise = (async () => {
    const { owner, repo, ref, path, kind } = source;
    if (kind === 'file') {
      const res = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${path}`);
      if (!res.ok) throw new Error(`GitHub trả về HTTP ${res.status} khi đọc ${path}.`);
      return {
        markdown: await res.text(),
        base: { owner, repo, ref, dir: dirname(path) },
        fileUrl: `https://github.com/${owner}/${repo}/blob/${ref}/${path}`
      };
    }

    // API tự tìm tên tệp README (README.md, readme.md, README.rst...) của repo hoặc thư mục
    const apiPath = kind === 'dir' ? `/readme/${path}` : '/readme';
    const query = ref !== 'HEAD' ? `?ref=${encodeURIComponent(ref)}` : '';
    const meta = await fetch(`https://api.github.com/repos/${owner}/${repo}${apiPath}${query}`, {
      headers: { Accept: 'application/vnd.github+json' }
    });
    if (meta.ok) {
      const info = await meta.json();
      const raw = await fetch(info.download_url);
      if (!raw.ok) throw new Error(`GitHub trả về HTTP ${raw.status} khi tải ${info.path}.`);
      return {
        markdown: await raw.text(),
        base: { owner, repo, ref, dir: dirname(info.path) },
        fileUrl: info.html_url as string
      };
    }

    // Hết lượt gọi API (60 lần/giờ khi không đăng nhập): thử trực tiếp README.md
    const fallbackPath = kind === 'dir' ? `${path}/README.md` : 'README.md';
    const raw = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${fallbackPath}`);
    if (!raw.ok) {
      throw new Error(meta.status === 403
        ? 'Đã hết lượt đọc GitHub API trong giờ này và không tìm thấy README.md. Hãy thử lại sau hoặc mở trên GitHub.'
        : `Không tìm thấy README trên GitHub (HTTP ${meta.status}).`);
    }
    return {
      markdown: await raw.text(),
      base: { owner, repo, ref, dir: dirname(fallbackPath) },
      fileUrl: `https://github.com/${owner}/${repo}/blob/${ref}/${fallbackPath}`
    };
  })();

  readmeCache.set(key, promise);
  promise.catch(() => readmeCache.delete(key));
  return promise;
}

/** Tạo neo tiêu đề giống GitHub: chữ thường, bỏ dấu câu, khoảng trắng thành "-". */
export function githubSlug(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{M}\p{N}\s_-]/gu, '')
    .replace(/\s/g, '-');
}

const isRelative = (url: string) => !!url && !/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(url);

function resolveRepoPath(base: MarkdownBase, url: string): string {
  const [pathPart, suffix = ''] = url.split(/(?=[?#])/);
  const segments = (pathPart.startsWith('/') ? pathPart.slice(1) : [base.dir, pathPart].filter(Boolean).join('/')).split('/');
  const resolved: string[] = [];
  for (const segment of segments) {
    if (segment === '..') resolved.pop();
    else if (segment && segment !== '.') resolved.push(segment);
  }
  return resolved.join('/') + suffix;
}

const rawUrl = (base: MarkdownBase, url: string) =>
  `https://raw.githubusercontent.com/${base.owner}/${base.repo}/${base.ref}/${resolveRepoPath(base, url)}`;
const blobUrl = (base: MarkdownBase, url: string) =>
  `https://github.com/${base.owner}/${base.repo}/blob/${base.ref}/${resolveRepoPath(base, url)}`;

const ALERTS: Record<string, string> = {
  NOTE: 'Ghi chú',
  TIP: 'Mẹo',
  IMPORTANT: 'Quan trọng',
  WARNING: 'Cảnh báo',
  CAUTION: 'Thận trọng'
};

/**
 * Markdown → HTML đã làm sạch, hiển thị như GitHub.
 * @param breaks true: xuống dòng đơn thành <br> (README tiếng Việt sinh tự động);
 *               false: như GitHub (README gốc).
 */
export function renderGithubMarkdown(markdown: string, { base, breaks }: { base?: MarkdownBase; breaks: boolean }): string {
  if (!markdown) return '';
  let rawHtml: string;
  try {
    rawHtml = marked.parse(markdown, { gfm: true, breaks }) as string;
  } catch (error) {
    console.error('Lỗi phân tích cú pháp Markdown:', error);
    rawHtml = `<pre>${markdown.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c] as string))}</pre>`;
  }

  const fragment = DOMPurify.sanitize(rawHtml, { RETURN_DOM_FRAGMENT: true }) as DocumentFragment;
  const container = document.createElement('div');
  container.appendChild(fragment);

  // Neo tiêu đề, đánh số khi trùng như GitHub ("cai-dat", "cai-dat-1")
  const used = new Map<string, number>();
  container.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((heading) => {
    const slug = githubSlug(heading.textContent || '');
    if (!slug) return;
    const count = used.get(slug) || 0;
    used.set(slug, count + 1);
    heading.id = HEADING_ID_PREFIX + (count ? `${slug}-${count}` : slug);
  });

  if (base) {
    container.querySelectorAll('img[src]').forEach((img) => {
      const src = img.getAttribute('src') || '';
      if (isRelative(src)) img.setAttribute('src', rawUrl(base, src));
    });
    container.querySelectorAll('source[srcset]').forEach((source) => {
      const srcset = source.getAttribute('srcset') || '';
      source.setAttribute('srcset', srcset.split(',').map((part) => {
        const [url, ...rest] = part.trim().split(/\s+/);
        return [isRelative(url) ? rawUrl(base, url) : url, ...rest].join(' ');
      }).join(', '));
    });
    container.querySelectorAll('a[href]').forEach((link) => {
      const href = link.getAttribute('href') || '';
      if (isRelative(href)) link.setAttribute('href', blobUrl(base, href));
    });
  }

  // Liên kết ngoài mở tab mới; neo trong trang (#...) do trình xem xử lý cuộn
  container.querySelectorAll('a[href]').forEach((link) => {
    if (!(link.getAttribute('href') || '').startsWith('#')) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });

  // Hộp cảnh báo GitHub: > [!NOTE], > [!TIP], > [!IMPORTANT], > [!WARNING], > [!CAUTION]
  container.querySelectorAll('blockquote').forEach((quote) => {
    const first = quote.querySelector('p');
    const match = first?.innerHTML.match(/^\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*(?:<br>)?\s*/i);
    if (!first || !match) return;
    const type = match[1].toUpperCase();
    first.innerHTML = first.innerHTML.slice(match[0].length);
    if (!first.innerHTML.trim()) first.remove();
    const title = document.createElement('p');
    title.className = 'markdown-alert-title';
    title.textContent = ALERTS[type];
    const alert = document.createElement('div');
    alert.className = `markdown-alert markdown-alert-${type.toLowerCase()}`;
    alert.append(title, ...Array.from(quote.childNodes));
    quote.replaceWith(alert);
  });

  return container.innerHTML;
}
