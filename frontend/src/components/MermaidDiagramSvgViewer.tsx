import React, { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Download, ExternalLink } from 'lucide-react';

export interface MermaidDiagramSvgViewerProps {
  svgUrl?: string;
  title?: string;
  subtitle?: string;
  downloadFileName?: string;
  stageCountText?: string;
  maxWidth?: number;
}

export const MermaidDiagramSvgViewer: React.FC<MermaidDiagramSvgViewerProps> = ({
  svgUrl = '/mermaid-diagram.svg',
  title = 'Bản vẽ kỹ thuật Vector SVG chuẩn Mermaid',
  subtitle = 'Sơ đồ luồng dữ liệu & kiến trúc hệ thống chuẩn mực',
  downloadFileName = 'diagram.svg',
  stageCountText = 'Quy trình chuẩn hóa',
  maxWidth = 880,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.2, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.2, 0.4));
  const handleReset = () => setZoomLevel(1);

  return (
    <div className="space-y-3">
      {/* THANH ĐIỀU KHIỂN CÔNG CỤ SƠ ĐỒ VECTOR */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs select-none">
        <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-300 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-slate-900 dark:text-white">{title}</span>
          {stageCountText && (
            <span className="hidden sm:inline text-slate-500 dark:text-slate-400">• {stageCountText}</span>
          )}
        </div>

        {/* CÁC NÚT THAO TÁC ZOOM & TẢI VỀ */}
        <div className="flex items-center space-x-1 sm:space-x-1.5">
          <div className="flex items-center bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg p-0.5 shadow-xs">
            <button
              type="button"
              onClick={handleZoomOut}
              className="p-1 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              title="Thu nhỏ sơ đồ"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 text-[11px] font-mono font-semibold text-slate-700 dark:text-slate-200 min-w-[42px] text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              type="button"
              onClick={handleZoomIn}
              className="p-1 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              title="Phóng to sơ đồ"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="p-1 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 border-l border-slate-200 dark:border-slate-600 ml-0.5 transition-colors"
              title="Đặt lại kích thước chuẩn (100%)"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          <a
            href={svgUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-[11px] font-semibold shadow-xs transition-colors"
            title="Mở sơ đồ toàn màn hình trong tab mới"
          >
            <ExternalLink className="w-3 h-3" />
            <span className="hidden sm:inline">Toàn màn hình</span>
          </a>

          <a
            href={svgUrl}
            download={downloadFileName}
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-semibold shadow-xs transition-colors"
            title="Tải về tệp bản vẽ SVG độ nét cao"
          >
            <Download className="w-3 h-3" />
            <span className="hidden sm:inline">Tải SVG</span>
          </a>
        </div>
      </div>

      {/* KHUNG HIỂN THỊ CANVAS CHỨA SƠ ĐỒ VECTOR */}
      <div className="relative w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/60 overflow-hidden shadow-inner">
        {/* Lớp nền ô lưới kỹ thuật */}
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none opacity-60" />

        <div className="relative overflow-auto max-h-[820px] p-6 sm:p-10 flex justify-center items-start">
          <div
            className="transition-transform duration-200 ease-out origin-top shrink-0 bg-white dark:bg-slate-900 shadow-md border border-slate-200/90 dark:border-slate-800 rounded-xl p-4 sm:p-6"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <img
              src={svgUrl}
              alt={title || subtitle}
              className="w-full h-auto object-contain select-none"
              style={{ maxWidth: `${maxWidth}px` }}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
