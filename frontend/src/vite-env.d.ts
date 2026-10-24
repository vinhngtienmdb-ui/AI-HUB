/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FIREBASE_API_KEY?: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN?: string;
  readonly VITE_FIREBASE_PROJECT_ID?: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET?: string;
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID?: string;
  readonly VITE_FIREBASE_APP_ID?: string;
  readonly VITE_ADMIN_EMAIL?: string;
  readonly VITE_FIRESTORE_ENABLED?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Danh sách công cụ không chứa các trường chi tiết (sinh bởi dev-server/toolDataSplit.js)
declare module 'virtual:tool-index' {
  const tools: unknown[];
  export default tools;
}
