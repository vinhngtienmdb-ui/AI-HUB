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
  } catch (e) {
    console.warn('[Firebase] Lỗi khi đọc cấu hình tùy chỉnh từ localStorage:', e);
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

// Chuyển đổi mã lỗi Firebase thành thông điệp tiếng Việt hướng dẫn chi tiết
function parseFirebaseError(error: any): string {
  console.error('[Firebase] Chi tiết lỗi xác thực:', error);
  const code = error?.code || '';

  if (code === 'auth/network-request-failed') {
    return (
      'Lỗi kết nối mạng (auth/network-request-failed):\n' +
      '1. Trình duyệt của bạn có thể đang bật AdBlock (chặn quảng cáo), Brave Shields hoặc uBlock Origin chặn API Google. Hãy TẮT TẠM tiện ích chặn quảng cáo trên trang này.\n' +
      '2. Đảm bảo bạn đã thêm tên miền "ai-hub-vn.vercel.app" vào mục Authentication -> Settings -> Authorized domains trên Firebase Console.\n' +
      '3. Kiểm tra xem bạn đã bật "Google" trong tab Sign-in method trên Firebase Console hay chưa.'
    );
  }
  if (code === 'auth/unauthorized-domain') {
    return (
      'Tên miền chưa được cấp phép (auth/unauthorized-domain):\n' +
      'Vui lòng vào Firebase Console -> Authentication -> Settings -> Authorized domains -> Bấm "Add domain" và nhập: ai-hub-vn.vercel.app'
    );
  }
  if (code === 'auth/popup-closed-by-user') {
    return 'Bạn đã đóng cửa sổ đăng nhập Google trước khi hoàn tất.';
  }
  if (code === 'auth/popup-blocked') {
    return 'Trình duyệt đã chặn cửa sổ popup Google. Vui lòng cho phép popup trên thanh địa chỉ hoặc sử dụng chế độ Đăng nhập Chuyển hướng.';
  }
  if (code === 'auth/operation-not-allowed') {
    return 'Phương thức Google Sign-In chưa được kích hoạt. Vui lòng vào Firebase Console -> Authentication -> Sign-in method -> Bật Enable cho Google.';
  }
  if (code === 'auth/invalid-api-key') {
    return 'Khóa API Key không hợp lệ. Vui lòng kiểm tra lại apiKey đã sao chép từ Firebase Console.';
  }

  return error?.message || 'Không thể kết nối đến máy chủ xác thực của Google.';
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
    throw new Error(
      'Hệ thống chưa có cấu hình Firebase thật. Vui lòng bấm "Cấu hình Firebase" bên dưới để nhập API Key và Project ID của dự án Google của bạn.'
    );
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
    throw new Error('Chưa cấu hình Firebase Project.');
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
    } catch (e) {
      console.warn('[Firebase] Lỗi khi xử lý redirect result:', e);
    }
  }
  return null;
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
