import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  AlertCircle, 
  Loader2, 
  Settings, 
  Key, 
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import { 
  signInWithGoogle, 
  signInWithGoogleRedirect,
  isFirebaseConfigured, 
  getAdminEmail, 
  getActiveFirebaseConfig,
  saveCustomFirebaseConfig,
  removeCustomFirebaseConfig,
  FirebaseCustomConfig
} from '../lib/firebase';

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
  
  // Trạng thái cấu hình Firebase
  const [showConfigPanel, setShowConfigPanel] = useState(false);
  const initialCfg = getActiveFirebaseConfig();
  const [apiKey, setApiKey] = useState(initialCfg.apiKey || '');
  const [authDomain, setAuthDomain] = useState(initialCfg.authDomain || '');
  const [projectId, setProjectId] = useState(initialCfg.projectId || '');
  const [appId, setAppId] = useState(initialCfg.appId || '');
  const [rawConfigInput, setRawConfigInput] = useState('');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);

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
      // Nếu chưa có Firebase, mở ngay panel cấu hình để người dùng nhập
      if (!isFirebaseConfigured()) {
        setShowConfigPanel(true);
      }
    }
  };

  const handleGoogleRedirectLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await signInWithGoogleRedirect();
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message || 'Đăng nhập chuyển hướng thất bại.');
    }
  };

  // Tự động phân tích đoạn mã dán từ Firebase Console
  const handleParseRawConfig = (text: string) => {
    setRawConfigInput(text);
    try {
      // Regex trích xuất các trường từ chuỗi code Javascript/JSON của Firebase Console
      const apiKeyMatch = text.match(/apiKey:\s*["']([^"']+)["']/);
      const authDomainMatch = text.match(/authDomain:\s*["']([^"']+)["']/);
      const projectIdMatch = text.match(/projectId:\s*["']([^"']+)["']/);
      const appIdMatch = text.match(/appId:\s*["']([^"']+)["']/);

      if (apiKeyMatch) setApiKey(apiKeyMatch[1]);
      if (authDomainMatch) setAuthDomain(authDomainMatch[1]);
      if (projectIdMatch) setProjectId(projectIdMatch[1]);
      if (appIdMatch) setAppId(appIdMatch[1]);
    } catch (e) {
      // Bỏ qua lỗi parse
    }
  };

  const handleSaveConfig = () => {
    if (!apiKey.trim() || !projectId.trim()) {
      setError('Vui lòng nhập ít nhất API Key và Project ID của dự án Firebase.');
      return;
    }

    const newCfg: FirebaseCustomConfig = {
      apiKey: apiKey.trim(),
      authDomain: authDomain.trim() || `${projectId.trim()}.firebaseapp.com`,
      projectId: projectId.trim(),
      appId: appId.trim(),
    };

    const ok = saveCustomFirebaseConfig(newCfg);
    if (ok) {
      setError(null);
      setSaveSuccessMsg(true);
      setTimeout(() => {
        setSaveSuccessMsg(false);
        setShowConfigPanel(false);
      }, 1200);
    } else {
      setError('Không thể lưu cấu hình Firebase. Vui lòng kiểm tra lại thông số.');
    }
  };

  const hasFirebase = isFirebaseConfigured();
  const currentAdmin = getAdminEmail();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div 
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
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
                Đăng nhập Google thành công!
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                {userEmail}
              </p>
            </div>
          ) : showConfigPanel ? (
            /* BẢNG CẤU HÌNH FIREBASE GOOGLE AUTH THẬT */
            <div className="space-y-4 animate-fadeIn">
              <div className="p-3.5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/40 text-xs space-y-2">
                <div className="flex items-center space-x-1.5 font-bold text-indigo-900 dark:text-indigo-200">
                  <Key className="w-4 h-4 text-indigo-600" />
                  <span>Kết nối Firebase Project Google Auth Thật:</span>
                </div>
                <p className="text-indigo-800 dark:text-indigo-300 text-[11px] leading-relaxed">
                  Để mở cửa sổ popup Google Auth thật (<code className="font-mono">accounts.google.com</code>), bạn chỉ cần dán cấu hình Firebase Project của bạn vào đây (hoặc cài đặt Environment Variables trên Vercel).
                </p>
              </div>

              {/* Dán mã config nhanh */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Cách 1: Dán trực tiếp đoạn mã firebaseConfig từ Firebase Console:
                </label>
                <textarea
                  rows={3}
                  value={rawConfigInput}
                  onChange={(e) => handleParseRawConfig(e.target.value)}
                  placeholder={`const firebaseConfig = {\n  apiKey: "AIzaSy...",\n  authDomain: "my-app.firebaseapp.com",\n  projectId: "my-app",\n  appId: "1:..."\n};`}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 font-mono text-[11px] text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Nhập từng trường */}
              <div className="space-y-2 pt-1">
                <span className="block text-[11px] font-bold text-slate-700 dark:text-slate-300">
                  Cách 2: Nhập thông số từng trường:
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="block text-[10px] text-slate-500 mb-0.5">apiKey *</label>
                    <input
                      type="text"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="AIzaSy..."
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 text-xs font-mono text-slate-900 dark:text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500 mb-0.5">projectId *</label>
                    <input
                      type="text"
                      value={projectId}
                      onChange={(e) => setProjectId(e.target.value)}
                      placeholder="ai-hub-vn"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 text-xs font-mono text-slate-900 dark:text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500 mb-0.5">authDomain</label>
                    <input
                      type="text"
                      value={authDomain}
                      onChange={(e) => setAuthDomain(e.target.value)}
                      placeholder="ai-hub-vn.firebaseapp.com"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 text-xs font-mono text-slate-900 dark:text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500 mb-0.5">appId</label>
                    <input
                      type="text"
                      value={appId}
                      onChange={(e) => setAppId(e.target.value)}
                      placeholder="1:123456789:web:..."
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 text-xs font-mono text-slate-900 dark:text-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Hướng dẫn 3 bước ngắn gọn */}
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-300 space-y-1">
                <span className="font-bold text-slate-800 dark:text-slate-200 block">
                  Hướng dẫn lấy cấu hình trên Firebase Console (1 phút):
                </span>
                <p>1. Vào <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-bold hover:underline inline-flex items-center">console.firebase.google.com <ExternalLink className="w-3 h-3 ml-0.5" /></a> tạo dự án.</p>
                <p>2. Vào mục <strong>Authentication &rarr; Sign-in method</strong>, bật <strong>Google</strong>.</p>
                <p>3. Vào <strong>Settings &rarr; Authorized domains</strong>, thêm tên miền: <code className="bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded font-mono text-[10px]">ai-hub-vn.vercel.app</code></p>
                <p>4. Vào <strong>Project Settings &rarr; Your apps (&lt;/&gt;)</strong> để lấy đoạn mã <code className="font-mono">firebaseConfig</code> dán vào đây.</p>
              </div>

              {error && (
                <div className="flex items-start space-x-2 p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/40 text-rose-700 dark:text-rose-300 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {saveSuccessMsg && (
                <div className="flex items-center space-x-2 p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                  <Check className="w-4 h-4" />
                  <span>Đã kích hoạt cấu hình Firebase thật thành công!</span>
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setShowConfigPanel(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Quay lại
                </button>
                <div className="flex items-center space-x-2">
                  {hasFirebase && (
                    <button
                      type="button"
                      onClick={() => {
                        removeCustomFirebaseConfig();
                        setApiKey('');
                        setProjectId('');
                        setAuthDomain('');
                        setAppId('');
                        setRawConfigInput('');
                      }}
                      className="px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                    >
                      Xóa cấu hình
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleSaveConfig}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20"
                  >
                    Lưu & Kích hoạt Firebase Thật
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* MÀN HÌNH ĐĂNG NHẬP CHÍNH */
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
                    <span>Đang mở cửa sổ Google...</span>
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
                <div className="space-y-2 p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/40 text-rose-700 dark:text-rose-300 text-xs">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                    <span className="whitespace-pre-line leading-relaxed">{error}</span>
                  </div>

                  {/* Nút dự phòng: Đăng nhập chuyển hướng nếu popup bị chặn */}
                  {hasFirebase && (
                    <div className="pt-1 border-t border-rose-200/60 dark:border-rose-900/40 flex items-center justify-between">
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        Nếu popup tiếp tục bị lỗi mạng hoặc bị chặn:
                      </span>
                      <button
                        type="button"
                        onClick={handleGoogleRedirectLogin}
                        className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        Thử Đăng nhập Chuyển hướng &rarr;
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Thông tin phân quyền Admin & Trạng thái kết nối Firebase */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850/60 border border-slate-200/80 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 space-y-2">
                <div className="flex items-center space-x-1.5 font-bold text-slate-700 dark:text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Chính sách phân quyền & duyệt bài:</span>
                </div>
                <p>
                  • <strong>Quản trị viên (Admin):</strong> Email <code>{currentAdmin}</code> có quyền cao nhất để phê duyệt và điều chỉnh công cụ.
                </p>
                <p>
                  • <strong>Thành viên (Member):</strong> Đóng góp công cụ sẽ ở trạng thái <em>Chờ Quản trị viên duyệt</em> trước khi lên hệ thống.
                </p>
                
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px]">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-slate-400">Trạng thái Firebase:</span>
                    <span className={`font-bold ${hasFirebase ? 'text-emerald-500' : 'text-amber-500'}`}>
                      {hasFirebase ? 'Đã kết nối Firebase thật' : 'Chưa cấu hình Firebase Project'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowConfigPanel(true)}
                    className="inline-flex items-center space-x-1 text-indigo-600 dark:text-indigo-400 hover:underline font-bold"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span>{hasFirebase ? 'Xem cấu hình' : 'Cấu hình Firebase'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
