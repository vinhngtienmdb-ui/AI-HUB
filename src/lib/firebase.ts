import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  User, 
  Auth 
} from 'firebase/auth';

// Cấu hình Firebase từ biến môi trường Vite
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
};

// Kiểm tra xem cấu hình Firebase có hợp lệ hay chưa
export const isFirebaseConfigured = (): boolean => {
  return Boolean(
    firebaseConfig.apiKey && 
    firebaseConfig.apiKey.length > 5 &&
    !firebaseConfig.apiKey.includes('YOUR_') &&
    firebaseConfig.projectId
  );
};

// Khởi tạo Firebase App an toàn (không gây crash ứng dụng nếu thiếu biến môi trường)
let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let googleProvider: GoogleAuthProvider | null = null;

try {
  if (isFirebaseConfigured()) {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({ prompt: 'select_account' });
  }
} catch (error) {
  console.warn('Firebase chưa được cấu hình đầy đủ. Hệ thống đang chạy chế độ mô phỏng an toàn:', error);
}

export { auth, googleProvider };

// Quản lý quyền Quản trị viên (Admin) cao nhất
// Mặc định Admin là email cấu hình trong VITE_ADMIN_EMAIL hoặc được lưu trong localStorage
export const getAdminEmail = (): string => {
  const customAdmin = localStorage.getItem('aihub_admin_email');
  if (customAdmin && customAdmin.trim()) return customAdmin.trim();
  return import.meta.env.VITE_ADMIN_EMAIL || 'vinhngtien@gmail.com';
};

export const setAdminEmail = (email: string) => {
  localStorage.setItem('aihub_admin_email', email.trim().toLowerCase());
};

export const checkIsAdmin = (email: string | null | undefined): boolean => {
  if (!email) return false;
  const currentAdmin = getAdminEmail().toLowerCase();
  const normalizedEmail = email.toLowerCase().trim();
  // Khớp với email admin chính hoặc các bí danh quản trị viên
  return normalizedEmail === currentAdmin || normalizedEmail === 'admin@aihub.vn';
};

// Hàm đăng nhập Google
export interface AuthUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  isAdmin: boolean;
}

export const signInWithGoogle = async (): Promise<AuthUser> => {
  if (isFirebaseConfigured() && auth && googleProvider) {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const email = user.email || '';
      return {
        uid: user.uid,
        email,
        displayName: user.displayName || email.split('@')[0],
        photoURL: user.photoURL || undefined,
        isAdmin: checkIsAdmin(email),
      };
    } catch (error: any) {
      console.error('Lỗi đăng nhập Google Firebase:', error);
      throw new Error(error.message || 'Không thể đăng nhập bằng Google.');
    }
  } else {
    // Chế độ mô phỏng an toàn khi chưa điền API Key Firebase
    // Cho phép người dùng nhập hoặc xác nhận email Google để kiểm thử ngay lập tức
    const adminEmail = getAdminEmail();
    const promptEmail = window.prompt(
      'Hệ thống đang chạy chế độ kết nối Google Auth dự phòng (chưa gắn VITE_FIREBASE_API_KEY).\nVui lòng nhập email Google của bạn (Nhập đúng email admin của bạn để có quyền Admin):',
      adminEmail
    );
    const email = (promptEmail && promptEmail.trim()) ? promptEmail.trim() : adminEmail;
    const isUserAdmin = checkIsAdmin(email);
    
    return {
      uid: `google-${Date.now()}`,
      email,
      displayName: email.split('@')[0],
      isAdmin: isUserAdmin,
    };
  }
};

// Hàm đăng xuất
export const signOutUser = async (): Promise<void> => {
  if (isFirebaseConfigured() && auth) {
    await signOut(auth);
  }
  localStorage.removeItem('aihub_user');
  localStorage.removeItem('aihub_user_profile');
};

// Đăng ký theo dõi trạng thái đăng nhập
export const subscribeToAuth = (callback: (user: AuthUser | null) => void) => {
  if (isFirebaseConfigured() && auth) {
    return onAuthStateChanged(auth, (user: User | null) => {
      if (user && user.email) {
        callback({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || user.email.split('@')[0],
          photoURL: user.photoURL || undefined,
          isAdmin: checkIsAdmin(user.email),
        });
      } else {
        callback(null);
      }
    });
  } else {
    // Theo dõi qua localStorage trong chế độ dự phòng
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
