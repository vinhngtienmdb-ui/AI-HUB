import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { AITool } from '../types';
import { getVerificationWarnings } from '../lib/verification';

// Khung cảnh báo chất lượng dữ liệu (liên kết hỏng, gói npm không tồn tại, hướng dẫn dạng mẫu)
export const VerificationNotice: React.FC<{ tool: AITool; className?: string }> = ({ tool, className = '' }) => {
  const warnings = getVerificationWarnings(tool);
  if (warnings.length === 0) return null;

  return (
    <div
      role="note"
      className={`rounded-2xl border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 p-4 text-amber-900 dark:text-amber-200 ${className}`}
    >
      <div className="flex items-center space-x-2 font-semibold text-sm mb-1.5">
        <AlertTriangle className="w-4 h-4 shrink-0" />
        <span>Dữ liệu chưa được xác minh đầy đủ</span>
      </div>
      <ul className="list-disc pl-6 space-y-1 text-xs sm:text-[13px] leading-relaxed">
        {warnings.map((w) => (
          <li key={w}>{w}</li>
        ))}
      </ul>
      {tool.verification?.checkedAt && (
        <p className="mt-1.5 pl-6 text-[11px] opacity-75">
          Kiểm tra lần cuối: {new Date(tool.verification.checkedAt).toLocaleDateString('vi-VN')}
        </p>
      )}
    </div>
  );
};
