import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Download, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';
import { AITool } from '../types';
import { describeConfigFile } from '../lib/configFiles';

/**
 * Sơ đồ luồng hoàn chỉnh của một công cụ, sinh từ dữ liệu thật của chính công cụ đó:
 * người dùng → yêu cầu → các bước cài đặt → tệp cấu hình → công cụ → năng lực → các bước sử dụng.
 * Không có bước nào được thêm từ suy đoán: lớp nào không có dữ liệu thì không vẽ.
 */

type DiagramTool = Pick<AITool, 'name' | 'typeNameVi' | 'authorName' | 'configs' | 'installGuideVi' | 'usageGuideVi' | 'featuresVi'>;

interface Palette {
  bg: string;
  laneBg: string;
  laneBorder: string;
  laneLabel: string;
  text: string;
  muted: string;
  edge: string;
  lanes: Record<LaneKind, { fill: string; stroke: string; accent: string }>;
}

type LaneKind = 'user' | 'prepare' | 'install' | 'config' | 'tool' | 'feature' | 'usage';

const LIGHT: Palette = {
  bg: '#ffffff',
  laneBg: '#f6f8fa',
  laneBorder: '#d1d9e0',
  laneLabel: '#59636e',
  text: '#1f2328',
  muted: '#59636e',
  edge: '#818b98',
  lanes: {
    user: { fill: '#ffffff', stroke: '#818b98', accent: '#59636e' },
    prepare: { fill: '#fff8c5', stroke: '#d4a72c', accent: '#9a6700' },
    install: { fill: '#ddf4ff', stroke: '#54aeff', accent: '#0969da' },
    config: { fill: '#f1f8ff', stroke: '#80ccff', accent: '#0550ae' },
    tool: { fill: '#dafbe1', stroke: '#1a7f37', accent: '#1a7f37' },
    feature: { fill: '#fbefff', stroke: '#c297ff', accent: '#8250df' },
    usage: { fill: '#e7f7f5', stroke: '#4ac0b0', accent: '#0f766e' }
  }
};

const DARK: Palette = {
  bg: '#0d1117',
  laneBg: '#151b23',
  laneBorder: '#3d444d',
  laneLabel: '#9198a1',
  text: '#f0f6fc',
  muted: '#9198a1',
  edge: '#656c76',
  lanes: {
    user: { fill: '#0d1117', stroke: '#656c76', accent: '#9198a1' },
    prepare: { fill: '#2e2a14', stroke: '#9e6a03', accent: '#d29922' },
    install: { fill: '#121d2f', stroke: '#1f6feb', accent: '#4493f8' },
    config: { fill: '#0f1b2b', stroke: '#388bfd', accent: '#79c0ff' },
    tool: { fill: '#12261e', stroke: '#2ea043', accent: '#3fb950' },
    feature: { fill: '#221a33', stroke: '#8957e5', accent: '#ab7df8' },
    usage: { fill: '#0f2624', stroke: '#2a9d8f', accent: '#5eead4' }
  }
};

const LANE_TITLES: Record<LaneKind, string> = {
  user: 'Người dùng',
  prepare: 'Chuẩn bị',
  install: 'Cài đặt',
  config: 'Cấu hình',
  tool: 'Công cụ',
  feature: 'Năng lực',
  usage: 'Sử dụng'
};

const MAX_CHAIN = 5;
const MAX_FEATURES = 6;

// Bỏ ký hiệu Markdown để hiển thị trong sơ đồ
const plain = (text: string) => text
  .replace(/\*\*|__|`/g, '')
  .replace(/(^|\s)[*_]([^*_\n]+)[*_](?=\s|$|[.,;:)])/g, '$1$2')
  .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
  .trim();

/** Các bước "Bước N: ..." trong hướng dẫn; không có thì lấy các dòng có nội dung. */
function extractSteps(guide = ''): string[] {
  const lines = guide.split('\n').map((l) => l.trim()).filter(Boolean);
  const steps = lines
    .map((l) => l.match(/^Bước\s+\d+\s*(?:\(([^)]*)\))?\s*[:.]\s*(.*)$/))
    .filter((m): m is RegExpMatchArray => !!m)
    .map((m) => plain(m[1] ? `${m[1]}: ${m[2]}` : m[2]));
  if (steps.length) return steps;
  return lines
    .filter((l) => !/^(Yêu cầu|#)/.test(l))
    .map((l) => plain(l.replace(/^[-*]\s+|^\d+\.\s+/, '')))
    .filter((l) => l.length > 3);
}

function extractRequirement(guide = ''): string | null {
  const line = guide.split('\n').find((l) => /^\s*Yêu cầu\s*:/.test(l));
  return line ? plain(line.replace(/^\s*Yêu cầu\s*:\s*/, '')) : null;
}

/** Gộp các bước vượt quá giới hạn vào ô cuối để sơ đồ không quá dài, vẫn nói rõ số bước còn lại. */
function limitChain(steps: string[]): string[] {
  if (steps.length <= MAX_CHAIN) return steps;
  return [...steps.slice(0, MAX_CHAIN - 1), `${steps[MAX_CHAIN - 1]} (và ${steps.length - MAX_CHAIN} bước tiếp theo trong hướng dẫn)`];
}

function featureTitle(feature: string): string {
  const text = plain(feature);
  const colon = text.indexOf(':');
  return colon > 0 && colon < 70 ? text.slice(0, colon) : text;
}

// Ước lượng độ rộng ký tự (px) theo cỡ chữ để ngắt dòng trong ô
function wrapText(text: string, width: number, fontSize: number, maxLines: number): string[] {
  const maxChars = Math.max(8, Math.floor(width / (fontSize * 0.56)));
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= maxChars) {
      current = candidate;
      continue;
    }
    if (current) lines.push(current);
    current = word.length > maxChars ? `${word.slice(0, maxChars - 1)}…` : word;
    if (lines.length === maxLines) break;
  }
  if (current && lines.length < maxLines) lines.push(current);
  if (lines.length === maxLines && words.join(' ').length > lines.join(' ').length) {
    const last = lines[maxLines - 1];
    lines[maxLines - 1] = last.length > maxChars - 1 ? `${last.slice(0, maxChars - 1)}…` : `${last}…`;
  }
  return lines;
}

interface DiagramNode {
  id: string;
  lane: LaneKind;
  x: number;
  y: number;
  w: number;
  h: number;
  title?: string;
  lines: string[];
  step?: number;
}

interface Lane {
  kind: LaneKind;
  y: number;
  h: number;
  nodes: DiagramNode[];
  /** Các ô nối với nhau theo thứ tự (chuỗi bước) hay tỏa ra từ lớp trước. */
  chained: boolean;
}

const WIDTH = 1040;
const LABEL_W = 112;
const PAD = 20;
const GAP_X = 28;
const LANE_GAP = 34;
const LINE_H = 16;
const FONT = 12.5;

function useIsDark() {
  const [dark, setDark] = useState(() => typeof document !== 'undefined' && document.documentElement.classList.contains('dark'));
  useEffect(() => {
    const observer = new MutationObserver(() => setDark(document.documentElement.classList.contains('dark')));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);
  return dark;
}

function buildLayout(tool: DiagramTool) {
  const contentX = LABEL_W + PAD;
  const contentW = WIDTH - contentX - PAD;
  const lanes: Lane[] = [];
  let y = PAD;

  const addLane = (kind: LaneKind, items: { title?: string; text: string }[], opts: { chained: boolean; columns?: number; maxLines?: number; nodeW?: number }) => {
    if (!items.length) return;
    const columns = Math.min(opts.columns ?? items.length, items.length);
    const rows = Math.ceil(items.length / columns);
    // Ô của lớp tỏa không rộng quá 420px để sơ đồ cân đối khi lớp chỉ có 1-2 ô
    const nodeW = opts.nodeW ?? Math.min((contentW - GAP_X * (columns - 1)) / columns, opts.chained ? Infinity : 420);
    const wrapped = items.map((item) => wrapText(item.text, nodeW - 24, FONT, opts.maxLines ?? 4));
    const rowHeights = Array.from({ length: rows }, (_, r) =>
      Math.max(...wrapped.slice(r * columns, r * columns + columns).map((lines, i) => {
        const hasTitle = !!items[r * columns + i].title;
        return 20 + (hasTitle ? 18 : 0) + lines.length * LINE_H;
      }))
    );
    const laneTop = y;
    const nodes: DiagramNode[] = [];
    let rowY = laneTop + 14;
    rowHeights.forEach((rowH, r) => {
      const rowItems = items.slice(r * columns, r * columns + columns);
      const rowW = rowItems.length * nodeW + (rowItems.length - 1) * GAP_X;
      const startX = contentX + (contentW - rowW) / 2;
      rowItems.forEach((item, i) => {
        const index = r * columns + i;
        nodes.push({
          id: `${kind}-${index}`,
          lane: kind,
          x: startX + i * (nodeW + GAP_X),
          y: rowY,
          w: nodeW,
          h: rowH,
          title: item.title,
          lines: wrapped[index],
          step: opts.chained && items.length > 1 ? index + 1 : undefined
        });
      });
      rowY += rowH + 18;
    });
    const laneH = rowY - 18 + 14 - laneTop;
    lanes.push({ kind, y: laneTop, h: laneH, nodes, chained: opts.chained });
    y = laneTop + laneH + LANE_GAP;
  };

  addLane('user', [{ text: 'Bạn hoặc tác tử AI của bạn' }], { chained: false, nodeW: 260, maxLines: 1 });

  const requirement = extractRequirement(tool.installGuideVi);
  if (requirement) addLane('prepare', [{ title: 'Yêu cầu', text: requirement }], { chained: false, nodeW: 620, maxLines: 4 });

  const installSteps = limitChain(extractSteps(tool.installGuideVi));
  const fallbackCommand = (tool.configs || []).find((c) => c.cliCommand)?.cliCommand;
  const install = installSteps.length ? installSteps : fallbackCommand ? [`Chạy lệnh: ${fallbackCommand}`] : [];
  addLane('install', install.map((text) => ({ text })), { chained: true, columns: Math.min(install.length, 3), maxLines: 5 });

  const configFiles = new Map<string, { title: string; text: string }>();
  for (const config of tool.configs || []) {
    const file = describeConfigFile(config);
    if (file.fileName === 'cai-dat.json') continue; // bản tóm tắt của AI HUB, không phải tệp cấu hình thật
    configFiles.set(`${config.platformName}|${file.fileName}`, { title: config.platformName, text: file.fileName });
  }
  addLane('config', [...configFiles.values()], { chained: false, columns: Math.min(configFiles.size, 3), maxLines: 2 });

  addLane('tool', [{ title: tool.typeNameVi || 'Công cụ', text: `${tool.name}${tool.authorName ? ` · ${tool.authorName}` : ''}` }], { chained: false, nodeW: 560, maxLines: 3 });

  const features = (tool.featuresVi || []).slice(0, MAX_FEATURES).map((f) => ({ text: featureTitle(f) }));
  addLane('feature', features, { chained: false, columns: Math.min(features.length, 3), maxLines: 3 });

  const usage = limitChain(extractSteps(tool.usageGuideVi));
  addLane('usage', usage.map((text) => ({ text })), { chained: true, columns: Math.min(usage.length, 3), maxLines: 5 });

  return { lanes, height: y - LANE_GAP + PAD };
}

// Đường gấp khúc vuông góc từ đáy ô trên xuống đỉnh ô dưới
function elbow(x1: number, y1: number, x2: number, y2: number) {
  const midY = (y1 + y2) / 2;
  return `M ${x1} ${y1} L ${x1} ${midY} L ${x2} ${midY} L ${x2} ${y2 - 2}`;
}

export const ToolFlowDiagram: React.FC<{ tool: DiagramTool }> = ({ tool }) => {
  const dark = useIsDark();
  const palette = dark ? DARK : LIGHT;
  const svgRef = useRef<SVGSVGElement>(null);
  const [zoom, setZoom] = useState(1);
  const { lanes, height } = useMemo(() => buildLayout(tool), [tool]);

  const edges: string[] = [];
  lanes.forEach((lane, li) => {
    // Chuỗi bước: mũi tên nối ô trước với ô sau (cùng hàng: ngang; xuống hàng: gấp khúc)
    if (lane.chained) {
      for (let i = 0; i < lane.nodes.length - 1; i++) {
        const a = lane.nodes[i];
        const b = lane.nodes[i + 1];
        if (Math.abs(a.y - b.y) < 1) edges.push(`M ${a.x + a.w} ${a.y + a.h / 2} L ${b.x - 2} ${b.y + b.h / 2}`);
        else edges.push(`M ${a.x + a.w / 2} ${a.y + a.h} L ${a.x + a.w / 2} ${a.y + a.h + 9} L ${b.x + b.w / 2} ${a.y + a.h + 9} L ${b.x + b.w / 2} ${b.y - 2}`);
      }
    }
    // Lớp tỏa nhiều hàng: ô hàng dưới nối từ ô cùng cột ở hàng trên (dạng cây)
    if (!lane.chained) {
      const firstRowY = lane.nodes[0].y;
      lane.nodes.forEach((node) => {
        if (node.y === firstRowY) return;
        const above = lane.nodes
          .filter((n) => n.y < node.y)
          .sort((a, b) => Math.abs(a.x - node.x) - Math.abs(b.x - node.x) || b.y - a.y)[0];
        if (above) edges.push(`M ${node.x + node.w / 2} ${above.y + above.h} L ${node.x + node.w / 2} ${node.y - 2}`);
      });
    }
    const next = lanes[li + 1];
    if (!next) return;
    // Lớp này sang lớp sau: chuỗi đi từ ô cuối; lớp tỏa đi từ các ô hàng cuối, vào các ô hàng đầu của lớp sau
    const lastRowY = Math.max(...lane.nodes.map((n) => n.y));
    const sources = lane.chained ? [lane.nodes[lane.nodes.length - 1]] : lane.nodes.filter((n) => n.y === lastRowY);
    const targets = next.chained ? [next.nodes[0]] : next.nodes.filter((n) => n.y === next.nodes[0].y);
    if (sources.length > 1 && targets.length > 1) {
      // Nhiều sang nhiều: nối theo cột gần nhất để sơ đồ không rối
      targets.forEach((t, i) => {
        const s = sources[Math.min(i, sources.length - 1)];
        edges.push(elbow(s.x + s.w / 2, s.y + s.h, t.x + t.w / 2, t.y));
      });
      return;
    }
    for (const s of sources) {
      for (const t of targets) edges.push(elbow(s.x + s.w / 2, s.y + s.h, t.x + t.w / 2, t.y));
    }
  });

  const handleDownload = () => {
    if (!svgRef.current) return;
    const source = new XMLSerializer().serializeToString(svgRef.current);
    const blob = new Blob([`<?xml version="1.0" encoding="UTF-8"?>\n${source}`], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tool.name.split(/\s+[—-]\s+/)[0].replace(/[^\p{L}\p{N}]+/gu, '-').toLowerCase() || 'so-do'}-so-do.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs select-none">
        <span className="font-semibold text-slate-900 dark:text-white">Sơ đồ luồng cài đặt & sử dụng</span>
        <div className="flex items-center gap-1.5">
          <div className="flex items-center bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg p-0.5">
            <button type="button" onClick={() => setZoom((z) => Math.max(0.5, +(z - 0.2).toFixed(1)))} className="p-1 text-slate-600 dark:text-slate-300 hover:text-indigo-600" title="Thu nhỏ" aria-label="Thu nhỏ">
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 text-[11px] font-mono font-semibold text-slate-700 dark:text-slate-200 min-w-[42px] text-center">{Math.round(zoom * 100)}%</span>
            <button type="button" onClick={() => setZoom((z) => Math.min(2.4, +(z + 0.2).toFixed(1)))} className="p-1 text-slate-600 dark:text-slate-300 hover:text-indigo-600" title="Phóng to" aria-label="Phóng to">
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
          <button type="button" onClick={() => setZoom(1)} className="p-1.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:text-indigo-600" title="Về 100%" aria-label="Về 100%">
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button type="button" onClick={handleDownload} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-semibold hover:text-indigo-600">
            <Download className="w-3.5 h-3.5" />
            <span>Tải SVG</span>
          </button>
        </div>
      </div>

      <div className="overflow-auto rounded-xl border border-slate-200 dark:border-slate-700" style={{ background: palette.bg }}>
        <svg
          ref={svgRef}
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${WIDTH} ${height}`}
          style={{ width: zoom === 1 ? '100%' : WIDTH * zoom, maxWidth: zoom < 1 ? '100%' : 'none', minWidth: 640 * zoom, height: 'auto', display: 'block' }}
          role="img"
          aria-label={`Sơ đồ luồng cài đặt và sử dụng ${tool.name}`}
          fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif"
        >
          <defs>
            <marker id="tool-flow-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={palette.edge} />
            </marker>
          </defs>
          <rect width={WIDTH} height={height} fill={palette.bg} />

          {lanes.map((lane) => (
            <g key={lane.kind}>
              <rect x={PAD / 2} y={lane.y} width={WIDTH - PAD} height={lane.h} rx={10} fill={palette.laneBg} stroke={palette.laneBorder} />
              <rect x={PAD / 2} y={lane.y} width={6} height={lane.h} rx={3} fill={palette.lanes[lane.kind].accent} />
              <text x={PAD / 2 + 18} y={lane.y + lane.h / 2 + 4} fontSize={12} fontWeight={600} fill={palette.laneLabel}>
                {LANE_TITLES[lane.kind]}
              </text>
            </g>
          ))}

          {edges.map((d, i) => (
            <path key={i} d={d} fill="none" stroke={palette.edge} strokeWidth={1.5} markerEnd="url(#tool-flow-arrow)" />
          ))}

          {lanes.flatMap((lane) => lane.nodes).map((node) => {
            const colors = palette.lanes[node.lane];
            const isTool = node.lane === 'tool';
            // Căn giữa khối chữ theo chiều dọc trong ô
            const blockH = (node.title ? 18 : 0) + node.lines.length * LINE_H;
            const titleY = node.y + (node.h - blockH) / 2 + 12;
            const textTop = titleY + (node.title ? 18 : 0);
            return (
              <g key={node.id}>
                <rect x={node.x} y={node.y} width={node.w} height={node.h} rx={node.lane === 'user' ? node.h / 2 : 8} fill={colors.fill} stroke={colors.stroke} strokeWidth={isTool ? 2 : 1.2} />
                {node.step !== undefined && (
                  <g>
                    <circle cx={node.x} cy={node.y} r={11} fill={colors.accent} />
                    <text x={node.x} y={node.y + 4} fontSize={11} fontWeight={700} fill={palette.bg} textAnchor="middle">{node.step}</text>
                  </g>
                )}
                {node.title && (
                  <text x={node.x + node.w / 2} y={titleY} fontSize={11.5} fontWeight={700} fill={colors.accent} textAnchor="middle">
                    {node.title}
                  </text>
                )}
                {node.lines.map((line, i) => (
                  <text
                    key={i}
                    x={node.x + node.w / 2}
                    y={textTop + i * LINE_H}
                    fontSize={isTool ? 13.5 : FONT}
                    fontWeight={isTool ? 700 : 400}
                    fill={palette.text}
                    textAnchor="middle"
                  >
                    {line}
                  </text>
                ))}
              </g>
            );
          })}
        </svg>
      </div>
      <p className="text-[11px] text-slate-500 dark:text-slate-400">
        Sơ đồ sinh tự động từ hướng dẫn cài đặt, cấu hình mẫu, tính năng và hướng dẫn sử dụng của công cụ này; lớp nào không có dữ liệu thì không hiển thị.
      </p>
    </div>
  );
};
