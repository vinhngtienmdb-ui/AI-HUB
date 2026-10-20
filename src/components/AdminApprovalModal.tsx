import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertCircle, 
  ExternalLink, 
  Eye, 
  User, 
  Sparkles,
  Inbox
} from 'lucide-react';
import { AITool } from '../types';
import { getAdminEmail, setAdminEmail } from '../lib/firebase';

interface AdminApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  pendingTools: AITool[];
  onApproveTool: (toolId: string) => void;
  onRejectTool: (toolId: string, reason?: string) => void;
  onPreviewTool: (tool: AITool) => void;
}

export const AdminApprovalModal: React.FC<AdminApprovalModalProps> = ({
  isOpen,
  onClose,
  pendingTools,
  onApproveTool,
  onRejectTool,
  onPreviewTool,
}) => {
  const [rejectReason, setRejectReason] = useState<Record<string, string>>({});
  const [activeRejectId, setActiveRejectId] = useState<string | null>(null);
  const [adminEmailInput, setAdminEmailInput] = useState(getAdminEmail());
  const [savedAdminMsg, setSavedAdminMsg] = useState(false);

  if (!isOpen) return null;

  const handleSaveAdminEmail = () => {
    if (adminEmailInput.trim()) {
      setAdminEmail(adminEmailInput.trim());
      setSavedAdminMsg(true);
      setTimeout(() => setSavedAdminMsg(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0 bg-slate-50/50 dark:bg-slate-850/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
                  Khu Vực Quản Trị Viên: Phê Duyệt Tài Nguyên
                </h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300">
                  {pendingTools.length} chờ duyệt
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Chỉ Quản trị viên tối cao có quyền phê duyệt công cụ do thành viên cộng đồng đóng góp
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nội dung danh sách chờ duyệt */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          
          {/* Cấu hình Email Admin */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-bold text-slate-800 dark:text-slate-200">Email Quản trị viên tối cao:</span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Tài khoản Google đăng nhập bằng email này sẽ sở hữu quyền duyệt bài cao nhất
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="email"
                value={adminEmailInput}
                onChange={(e) => setAdminEmailInput(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono text-slate-900 dark:text-white focus:outline-none"
              />
              <button
                onClick={handleSaveAdminEmail}
                className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors shrink-0"
              >
                Lưu
              </button>
              {savedAdminMsg && (
                <span className="text-[11px] text-emerald-500 font-bold shrink-0">Đã lưu!</span>
              )}
            </div>
          </div>

          {pendingTools.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <Inbox className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto" />
              <h3 className="font-bold text-base text-slate-700 dark:text-slate-300">
                Hàng đợi phê duyệt đang trống
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Hiện tại không có tài nguyên nào đang chờ duyệt. Mọi đóng góp mới từ thành viên sẽ xuất hiện tại đây.
              </p>
            </div>
          ) : (
            pendingTools.map((tool) => (
              <div 
                key={tool.id}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-700 transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900">
                        Chờ duyệt
                      </span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {tool.typeNameVi}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        • {tool.categoryNameVi}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {tool.name}
                    </h3>
                  </div>

                  <div className="flex items-center space-x-2 text-xs shrink-0">
                    <button
                      onClick={() => onPreviewTool(tool)}
                      className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Xem chi tiết</span>
                    </button>

                    <button
                      onClick={() => onApproveTool(tool.id)}
                      className="inline-flex items-center space-x-1 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-sm"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Phê duyệt</span>
                    </button>

                    <button
                      onClick={() => setActiveRejectId(activeRejectId === tool.id ? null : tool.id)}
                      className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 font-semibold"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Từ chối</span>
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {tool.summaryVi || tool.purposeVi}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="flex items-center space-x-1">
                    <User className="w-3.5 h-3.5" />
                    <span>Người đóng góp: <strong>{tool.contributedBy || tool.authorName}</strong></span>
                  </span>
                  <span>Ngày gửi: {tool.contributedAt || 'Hôm nay'}</span>
                  <a
                    href={tool.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    <span>Nguồn dẫn gốc</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Form nhập lý do từ chối nếu có */}
                {activeRejectId === tool.id && (
                  <div className="pt-2 flex items-center space-x-2 animate-fadeIn">
                    <input
                      type="text"
                      placeholder="Lý do từ chối (thiếu thông tin, link lỗi...)"
                      value={rejectReason[tool.id] || ''}
                      onChange={(e) => setRejectReason({ ...rejectReason, [tool.id]: e.target.value })}
                      className="flex-1 px-3 py-1.5 rounded-xl border border-rose-300 dark:border-rose-900 bg-rose-50/40 dark:bg-rose-950/20 text-xs text-slate-900 dark:text-white focus:outline-none"
                    />
                    <button
                      onClick={() => {
                        onRejectTool(tool.id, rejectReason[tool.id]);
                        setActiveRejectId(null);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs"
                    >
                      Xác nhận từ chối
                    </button>
                  </div>
                )}
              </div>
            ))
          )}

        </div>

        {/* Footer Modal */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-850/50">
          <span>Quy trình VibeCode: Kiểm soát chất lượng dữ liệu trước khi xuất bản</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
