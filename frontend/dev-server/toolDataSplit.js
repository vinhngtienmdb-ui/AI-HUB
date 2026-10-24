import fs from 'node:fs';
import path from 'node:path';

// Các trường chỉ dùng ở trang/cửa sổ chi tiết, tách khỏi gói JavaScript chính và tải theo nhu cầu.
// Phải khớp với DETAIL_FIELDS trong src/lib/toolDetails.ts.
export const DETAIL_FIELDS = ['readmeVi', 'installGuideVi', 'usageGuideVi', 'samplePromptsVi'];

const VIRTUAL_ID = 'virtual:tool-index';
const RESOLVED_VIRTUAL_ID = '\0' + VIRTUAL_ID;
const DETAILS_PREFIX = '/tool-details/';

/**
 * Plugin Vite tách kho dữ liệu database/data/allTools.json thành:
 * - Module ảo `virtual:tool-index`: danh sách công cụ không chứa DETAIL_FIELDS (đóng gói vào ứng dụng).
 * - Tệp `tool-details/<id>.json`: các trường chi tiết của từng công cụ (máy chủ phát triển phục vụ trực tiếp,
 *   bản build sinh ra thành tệp tĩnh).
 * allTools.json vẫn là nguồn dữ liệu duy nhất; script dữ liệu và máy chủ MCP đọc trực tiếp tệp này.
 */
export function toolDataSplitPlugin({ dataFile }) {
  const absoluteDataFile = path.resolve(dataFile);
  let cache = null;

  const loadSplit = () => {
    if (cache) return cache;
    const tools = JSON.parse(fs.readFileSync(absoluteDataFile, 'utf-8'));
    const index = [];
    const details = new Map();
    for (const tool of tools) {
      const light = { ...tool };
      const detail = {};
      for (const field of DETAIL_FIELDS) {
        if (field in light) {
          detail[field] = light[field];
          delete light[field];
        }
      }
      index.push(light);
      details.set(tool.id, detail);
    }
    cache = { index, details };
    return cache;
  };

  return {
    name: 'tool-data-split',
    resolveId(id) {
      return id === VIRTUAL_ID ? RESOLVED_VIRTUAL_ID : null;
    },
    load(id) {
      if (id !== RESOLVED_VIRTUAL_ID) return null;
      this.addWatchFile(absoluteDataFile);
      return `export default ${JSON.stringify(loadSplit().index)};`;
    },
    configureServer(server) {
      server.watcher.add(absoluteDataFile);
      server.watcher.on('change', (file) => {
        if (path.resolve(file) === absoluteDataFile) {
          cache = null;
          const mod = server.moduleGraph.getModuleById(RESOLVED_VIRTUAL_ID);
          if (mod) server.moduleGraph.invalidateModule(mod);
        }
      });
      server.middlewares.use((req, res, next) => {
        if (req.method !== 'GET' || !req.url || !req.url.startsWith(DETAILS_PREFIX)) return next();
        const id = decodeURIComponent(req.url.slice(DETAILS_PREFIX.length).replace(/\.json(\?.*)?$/, ''));
        const detail = loadSplit().details.get(id);
        if (!detail) {
          res.statusCode = 404;
          res.end('{}');
          return;
        }
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(detail));
      });
    },
    generateBundle() {
      for (const [id, detail] of loadSplit().details) {
        this.emitFile({
          type: 'asset',
          fileName: `tool-details/${encodeURIComponent(id)}.json`,
          source: JSON.stringify(detail)
        });
      }
    }
  };
}
