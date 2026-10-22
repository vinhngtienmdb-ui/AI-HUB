import React, { useState } from 'react';
import { Copy, Check, FileCode, Terminal } from 'lucide-react';

interface GitHubCodeViewerProps {
  code: string;
  fileName?: string;
  platformName?: string;
  cliCommand?: string;
}

export const GitHubCodeViewer: React.FC<GitHubCodeViewerProps> = ({
  code,
  fileName = 'config.json',
  platformName,
  cliCommand
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedCli, setCopiedCli] = useState(false);

  const lines = code ? code.trim().split('\n') : [];
  const charCount = code ? code.length : 0;

  const handleCopyCode = () => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyCli = () => {
    if (!cliCommand) return;
    navigator.clipboard.writeText(cliCommand);
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  return (
    <div className="space-y-4">
      
      {/* KHỐI LỆNH TERMINAL CLI (NẾU CÓ) THEO CHUẨN GITHUB */}
      {cliCommand && (
        <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-950 shadow-xs">
          <div className="flex items-center justify-between px-3.5 py-2 bg-slate-900/90 border-b border-slate-800 select-none text-xs">
            <div className="flex items-center space-x-2 text-slate-300 font-mono">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-semibold text-slate-300">Terminal (Cài đặt tự động)</span>
            </div>
            <button
              type="button"
              onClick={handleCopyCli}
              className="flex items-center space-x-1 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold transition-all border border-slate-700"
              title="Sao chép câu lệnh dòng lệnh"
            >
              {copiedCli ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">Đã chép lệnh!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Sao chép lệnh</span>
                </>
              )}
            </button>
          </div>
          <div className="p-3.5 font-mono text-xs text-emerald-400 overflow-x-auto leading-relaxed">
            <span className="text-slate-500 select-none mr-2 font-bold">$</span>
            <span>{cliCommand}</span>
          </div>
        </div>
      )}

      {/* KHỐI MÃ NGUỒN JSON CHUẨN PHONG CÁCH GITHUB (CODE BLOB VIEWER) */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-[#ffffff] dark:bg-[#0d1117] shadow-xs">
        
        {/* THANH TIÊU ĐỀ HỘP FILE CODE CHUẨN GITHUB */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#f6f8fa] dark:bg-[#161b22] border-b border-slate-200 dark:border-slate-800 select-none text-xs">
          <div className="flex items-center space-x-2.5 overflow-hidden">
            <FileCode className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
            <span className="font-bold text-slate-800 dark:text-slate-200 font-mono truncate">
              {fileName}
            </span>
            {platformName && (
              <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                {platformName}
              </span>
            )}
            <span className="hidden md:inline-block text-[11px] text-slate-400 dark:text-slate-500">
              {lines.length} dòng ({lines.length} sloc) • {charCount} Bytes
            </span>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              type="button"
              onClick={handleCopyCode}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-semibold shadow-xs transition-colors"
              title="Sao chép toàn bộ mã nguồn JSON"
            >
              {copiedCode ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">Đã sao chép!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Sao chép JSON</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* NỘI DUNG MÃ CODE CÓ CỘT SỐ DÒNG CHUẨN GITHUB */}
        <div className="overflow-x-auto text-xs font-mono leading-relaxed bg-[#fbfcfd] dark:bg-[#0d1117]">
          <table className="w-full border-collapse">
            <tbody>
              {lines.map((line, idx) => (
                <tr key={idx} className="hover:bg-blue-50/50 dark:hover:bg-slate-800/40 transition-colors">
                  {/* Cột số thứ tự dòng */}
                  <td className="w-12 py-0.5 px-3 text-right select-none text-slate-400 dark:text-slate-600 border-r border-slate-100 dark:border-slate-800/80 text-[11px]">
                    {idx + 1}
                  </td>
                  {/* Cột mã nguồn */}
                  <td className="py-0.5 px-4 text-slate-850 dark:text-slate-200 whitespace-pre">
                    <code>{line}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CHÂN KHUNG THÔNG TIN BẢN QUYỀN MÃ */}
        <div className="px-4 py-2 bg-[#f6f8fa] dark:bg-[#161b22] border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <span>Định dạng theo chuẩn JSON Schema của {platformName || 'Nền tảng'}</span>
          <span className="font-mono text-[10px]">UTF-8 • JSON</span>
        </div>

      </div>

    </div>
  );
};
