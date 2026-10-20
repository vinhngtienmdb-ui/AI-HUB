import { initializeApp, getApps, FirebaseApp, deleteApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
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
          authDomain: (parsed.authDomain || '').trim(),
          projectId: (parsed.projectId || '').trim(),
          storageBucket: (parsed.storageBucket || '').trim(),
          messagingSenderId: (parsed.messagingSenderId || '').trim(),
          appId: (parsed.appId || '').trim(),
        };
      }
    }
  } catch (e) {
    console.warn('[Firebase] Lỗi khi đọc cấu hình tùy chỉnh từ localStorage:', e);
  }

  return {
    apiKey: (import.meta.env.VITE_FIREBASE_API_KEY || '').trim(),
    authDomain: (import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '').trim(),
    projectId: (import.meta.env.VITE_FIREBASE_PROJECT_ID || '').trim(),
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
      // Dọn dẹp instance cũ nếu có
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
  } catch (error) {
    console.warn('[Firebase] Lỗi khởi tạo Firebase SDK:', error);
  }
  return false;
};

// Khởi chạy lần đầu
initFirebase();

export { auth, googleProvider };

// Lưu cấu hình Firebase trực tiếp từ giao diện Admin
export const saveCustomFirebaseConfig = (config: FirebaseCustomConfig): boolean => {
  try {
    localStorage.setItem('aihub_firebase_config', JSON.stringify(config));
    // Reset và khởi tạo lại
    app = null;
    auth = null;
    googleProvider = null;
    return initFirebase();
  } catch (e) {
    console.error('[Firebase] Không thể lưu cấu hình tùy chỉnh:', e);
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

// Quản lý quyền Quản trị viên (Admin) cao nhất
export const getAdminEmail = (): string => {
  const customAdmin = localStorage.getItem('aihub_admin_email');
  if (customAdmin && customAdmin.trim()) return customAdmin.trim().toLowerCase();
  return (import.meta.env.VITE_ADMIN_EMAIL || 'vinhngtien@gmail.com').trim().toLowerCase();
};

export const setAdminEmail = (email: string) => {
  localStorage.setItem('aihub_admin_email', email.trim().toLowerCase());
};

export const checkIsAdmin = (email: string | null | undefined): boolean => {
  if (!email) return false;
  const currentAdmin = getAdminEmail().toLowerCase();
  const normalizedEmail = email.toLowerCase().trim();
  return normalizedEmail === currentAdmin || normalizedEmail === 'admin@aihub.vn';
};

// Kiểu dữ liệu người dùng xác thực
export interface AuthUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  isAdmin: boolean;
}

// Hàm đăng nhập bằng Google Auth thật qua Firebase
export const signInWithGoogle = async (): Promise<AuthUser> => {
  // Đảm bảo Firebase đã được khởi tạo
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
      console.error('[Firebase] Lỗi đăng nhập Google Popup:', error);
      let errorMsg = 'Không thể kết nối đến tài khoản Google.';
      if (error.code === 'auth/popup-closed-by-user') {
        errorMsg = 'Bạn đã đóng cửa sổ đăng nhập Google trước khi hoàn tất.';
      } else if (error.code === 'auth/unauthorized-domain') {
        errorMsg = 'Tên miền này chưa được thêm vào mục Authorized domains trên Firebase Console.';
      } else if (error.code === 'auth/operation-not-allowed') {
        errorMsg = 'Google Sign-in chưa được kích hoạt trong tab Sign-in method của Firebase Console.';
      } else if (error.message) {
        errorMsg = error.message;
      }
      throw new Error(errorMsg);
    }
  } else {
    throw new Error(
      'Hệ thống chưa có cấu hình Firebase thật. Vui lòng bấm "Cấu hình Firebase" bên dưới để nhập API Key và Project ID của dự án Google của bạn.'
    );
  }
};

// Hàm đăng xuất
export const signOutUser = async (): Promise<void> => {
  if (isFirebaseConfigured() && auth) {
    try {
      await signOut(auth);
    } catch (e) {
      console.warn('[Firebase] Lỗi đăng xuất:', e);
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
    // Theo dõi qua localStorage nếu chưa cấu hình Firebase
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
