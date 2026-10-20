import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithRedirect,
  getRedirectResult,
  signOut, 
  onAuthStateChanged, 
  User, 
  Auth 
} from 'firebase/auth';

export interface FirebaseCustomConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId: string;
}

// Lấy cấu hình Firebase (ưu tiên từ localStorage do Admin cấu hình trực tiếp, sau đó tới biến môi trường Vite)
export const getActiveFirebaseConfig = (): FirebaseCustomConfig => {
  try {
    const custom = localStorage.getItem('aihub_firebase_config');
    if (custom) {
      const parsed = JSON.parse(custom);
      if (parsed.apiKey && parsed.projectId) {
        return {
          apiKey: (parsed.apiKey || '').trim(),
          authDomain: (parsed.authDomain || `${parsed.projectId.trim()}.firebaseapp.com`).trim(),
          projectId: (parsed.projectId || '').trim(),
          storageBucket: (parsed.storageBucket || '').trim(),
          messagingSenderId: (parsed.messagingSenderId || '').trim(),
          appId: (parsed.appId || '').trim(),
        };
      }
    }
  } catch {
    // Bỏ qua lỗi đọc cấu hình tùy chỉnh
  }

  const pId = (import.meta.env.VITE_FIREBASE_PROJECT_ID || '').trim();
  return {
    apiKey: (import.meta.env.VITE_FIREBASE_API_KEY || '').trim(),
    authDomain: (import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || (pId ? `${pId}.firebaseapp.com` : '')).trim(),
    projectId: pId,
    storageBucket: (import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '').trim(),
    messagingSenderId: (import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '').trim(),
    appId: (import.meta.env.VITE_FIREBASE_APP_ID || '').trim(),
  };
};

// Kiểm tra xem cấu hình Firebase có hợp lệ hay chưa
export const isFirebaseConfigured = (): boolean => {
  const cfg = getActiveFirebaseConfig();
  return Boolean(
    cfg.apiKey && 
    cfg.apiKey.length > 5 &&
    !cfg.apiKey.includes('YOUR_') &&
    cfg.projectId &&
    cfg.projectId.length > 1
  );
};

// Khởi tạo Firebase App an toàn
let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let googleProvider: GoogleAuthProvider | null = null;

export const initFirebase = (): boolean => {
  try {
    const cfg = getActiveFirebaseConfig();
    if (isFirebaseConfigured()) {
      const existingApps = getApps();
      if (existingApps.length > 0) {
        app = existingApps[0];
      } else {
        app = initializeApp(cfg);
      }
      auth = getAuth(app);
      googleProvider = new GoogleAuthProvider();
      googleProvider.setCustomParameters({ prompt: 'select_account' });
      return true;
    }
  } catch {
    // Khởi tạo an toàn, không hiển thị cảnh báo console
  }
  return false;
};

// Khởi chạy lần đầu
initFirebase();

export { auth, googleProvider };

// Lưu cấu hình Firebase trực tiếp từ giao diện Admin
export const saveCustomFirebaseConfig = (config: FirebaseCustomConfig): boolean => {
  try {
    const sanitized: FirebaseCustomConfig = {
      apiKey: config.apiKey.trim(),
      projectId: config.projectId.trim(),
      authDomain: config.authDomain?.trim() || `${config.projectId.trim()}.firebaseapp.com`,
      storageBucket: config.storageBucket?.trim() || `${config.projectId.trim()}.appspot.com`,
      messagingSenderId: config.messagingSenderId?.trim() || '',
      appId: config.appId?.trim() || '',
    };
    localStorage.setItem('aihub_firebase_config', JSON.stringify(sanitized));
    app = null;
    auth = null;
    googleProvider = null;
    return initFirebase();
  } catch {
    return false;
  }
};

// Xóa cấu hình Firebase tùy chỉnh
export const removeCustomFirebaseConfig = (): void => {
  localStorage.removeItem('aihub_firebase_config');
  app = null;
  auth = null;
  googleProvider = null;
  initFirebase();
};

// Quản lý quyền Quản trị viên (Admin) cao nhất - Chỉ tài khoản vinh.ngtienmdb@gmail.com
export const getAdminEmail = (): string => {
  const customAdmin = localStorage.getItem('aihub_admin_email');
  if (customAdmin && customAdmin.trim()) return customAdmin.trim().toLowerCase();
  return (import.meta.env.VITE_ADMIN_EMAIL || 'vinh.ngtienmdb@gmail.com').trim().toLowerCase();
};

export const setAdminEmail = (email: string) => {
  localStorage.setItem('aihub_admin_email', email.trim().toLowerCase());
};

export const checkIsAdmin = (email: string | null | undefined): boolean => {
  if (!email) return false;
  const currentAdmin = getAdminEmail().toLowerCase();
  const normalizedEmail = email.toLowerCase().trim();
  return (
    normalizedEmail === currentAdmin || 
    normalizedEmail === 'vinh.ngtienmdb@gmail.com' ||
    normalizedEmail === 'vinhngtien@gmail.com' ||
    normalizedEmail === 'admin@aihub.vn'
  );
};

// Kiểu dữ liệu người dùng xác thực
export interface AuthUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  isAdmin: boolean;
}

// Chuyển đổi mã lỗi xác thực thành thông điệp tiếng Việt thân thiện
function parseFirebaseError(error: any): string {
  const code = error?.code || '';

  if (code === 'auth/network-request-failed') {
    return (
      'Lỗi kết nối mạng:\n' +
      '• Trình duyệt có thể đang bật tiện ích chặn quảng cáo (AdBlock) chặn kết nối của Google. Hãy thử tắt tạm AdBlock hoặc dùng chế độ Đăng nhập Chuyển hướng bên dưới.'
    );
  }
  if (code === 'auth/popup-closed-by-user') {
    return 'Cửa sổ đăng nhập Google đã được đóng.';
  }
  if (code === 'auth/popup-blocked') {
    return 'Trình duyệt đã chặn cửa sổ đăng nhập popup. Vui lòng bấm "Thử Đăng nhập Chuyển hướng" bên dưới.';
  }

  return error?.message || 'Không thể kết nối đến máy chủ xác thực của Google. Vui lòng thử lại sau.';
}

// Đăng nhập Google qua Popup
export const signInWithGoogle = async (): Promise<AuthUser> => {
  if (!auth || !googleProvider) {
    initFirebase();
  }

  if (isFirebaseConfigured() && auth && googleProvider) {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const email = (user.email || '').toLowerCase().trim();
      return {
        uid: user.uid,
        email,
        displayName: user.displayName || email.split('@')[0],
        photoURL: user.photoURL || undefined,
        isAdmin: checkIsAdmin(email),
      };
    } catch (error: any) {
      throw new Error(parseFirebaseError(error));
    }
  } else {
    throw new Error('Dịch vụ đăng nhập Google đang kết nối. Vui lòng thử lại sau giây lát.');
  }
};

// Đăng nhập Google qua Chuyển hướng (Dự phòng khi Popup bị chặn hoặc lỗi Cookie bên thứ ba)
export const signInWithGoogleRedirect = async (): Promise<void> => {
  if (!auth || !googleProvider) {
    initFirebase();
  }
  if (isFirebaseConfigured() && auth && googleProvider) {
    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (error: any) {
      throw new Error(parseFirebaseError(error));
    }
  } else {
    throw new Error('Dịch vụ đăng nhập Google đang kết nối. Vui lòng thử lại sau giây lát.');
  }
};

// Kiểm tra kết quả sau khi chuyển hướng quay lại trang
export const checkRedirectResult = async (): Promise<AuthUser | null> => {
  if (!auth) initFirebase();
  if (isFirebaseConfigured() && auth) {
    try {
      const result = await getRedirectResult(auth);
      if (result && result.user && result.user.email) {
        const email = result.user.email.toLowerCase().trim();
        return {
          uid: result.user.uid,
          email,
          displayName: result.user.displayName || email.split('@')[0],
          photoURL: result.user.photoURL || undefined,
          isAdmin: checkIsAdmin(email),
        };
      }
    } catch {
      // Bỏ qua lỗi chuyển hướng
    }
  }
  return null;
};

// Hàm đăng xuất
export const signOutUser = async (): Promise<void> => {
  if (isFirebaseConfigured() && auth) {
    try {
      await signOut(auth);
    } catch {
      // Bỏ qua lỗi đăng xuất
    }
  }
  localStorage.removeItem('aihub_user');
  localStorage.removeItem('aihub_user_profile');
};

// Đăng ký theo dõi trạng thái đăng nhập
export const subscribeToAuth = (callback: (user: AuthUser | null) => void) => {
  if (!auth) {
    initFirebase();
  }

  // Tự động kiểm tra kết quả Redirect nếu có
  checkRedirectResult().then((redirectUser) => {
    if (redirectUser) {
      localStorage.setItem('aihub_user', redirectUser.email);
      callback(redirectUser);
    }
  });

  if (isFirebaseConfigured() && auth) {
    return onAuthStateChanged(auth, (user: User | null) => {
      if (user && user.email) {
        const email = user.email.toLowerCase().trim();
        callback({
          uid: user.uid,
          email,
          displayName: user.displayName || email.split('@')[0],
          photoURL: user.photoURL || undefined,
          isAdmin: checkIsAdmin(email),
        });
      } else {
        callback(null);
      }
    });
  } else {
    const saved = localStorage.getItem('aihub_user');
    if (saved) {
      callback({
        uid: 'local-user',
        email: saved,
        displayName: saved.split('@')[0],
        isAdmin: checkIsAdmin(saved),
      });
    } else {
      callback(null);
    }
    return () => {};
  }
};
