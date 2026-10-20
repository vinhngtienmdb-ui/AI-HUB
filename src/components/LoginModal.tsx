import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';
import { signInWithGoogle, isFirebaseConfigured, getAdminEmail } from '../lib/firebase';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: (email: string, displayName?: string, photoURL?: string) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const user = await signInWithGoogle();
      setUserEmail(user.email);
      setIsSuccess(true);
      setTimeout(() => {
        if (onLoginSuccess) {
          onLoginSuccess(user.email, user.displayName, user.photoURL);
        }
        setIsSuccess(false);
        setIsLoading(false);
        onClose();
      }, 1000);
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message || 'Đăng nhập Google thất bại. Vui lòng thử lại.');
    }
  };

  const hasFirebase = isFirebaseConfigured();
  const currentAdmin = getAdminEmail();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 mb-3 border border-indigo-100 dark:border-indigo-900/40 shadow-sm">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Đăng Nhập AI HUB VN
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto">
              Đăng nhập bằng tài khoản Google để đóng góp công cụ, quản lý bộ sưu tập và duyệt bài
            </p>
          </div>

          {isSuccess ? (
            <div className="py-8 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Đăng nhập thành công!
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                {userEmail}
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Nút Đăng nhập bằng Google Auth */}
              <button
                type="button"
                disabled={isLoading}
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center space-x-3 py-3 px-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-white font-semibold text-sm transition-all shadow-sm hover:shadow active:scale-[0.99] disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-indigo-600 dark:text-indigo-400" />
                    <span>Đang kết nối Google...</span>
                  </>
                ) : (
                  <>
                    {/* Logo Google đa màu chuẩn */}
                    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Tiếp tục với tài khoản Google</span>
                  </>
                )}
              </button>

              {error && (
                <div className="flex items-start space-x-2 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/40 text-rose-700 dark:text-rose-300 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {/* Thông tin phân quyền Admin & bảo mật */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850/60 border border-slate-200/80 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 space-y-1.5">
                <div className="flex items-center space-x-1.5 font-bold text-slate-700 dark:text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Chính sách phân quyền & duyệt bài:</span>
                </div>
                <p>
                  • <strong>Quản trị viên (Admin):</strong> Email <code>{currentAdmin}</code> có quyền cao nhất để phê duyệt công cụ do thành viên gửi.
                </p>
                <p>
                  • <strong>Thành viên (Member):</strong> Đóng góp công cụ sẽ ở trạng thái <em>Chờ Quản trị viên duyệt</em> trước khi lên hệ thống.
                </p>
                <div className="pt-1 flex items-center justify-between text-[10px] text-slate-400">
                  <span>Trạng thái Firebase:</span>
                  <span className={`font-semibold ${hasFirebase ? 'text-emerald-500' : 'text-amber-500'}`}>
                    {hasFirebase ? 'Đã kết nối Firebase' : 'Chế độ Google Auth tương thích'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
