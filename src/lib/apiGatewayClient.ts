/**
 * Gọi Cổng REST API của AI HUB VN (mcp-gateway/api-server.js) từ trang Quản lý API.
 *
 * Máy chủ chạy trên máy người dùng (`npm run mcp:api`, mặc định http://localhost:4000).
 * Khóa admin chỉ giữ trong bộ nhớ của trang (mất khi tải lại trang); địa chỉ máy chủ được nhớ trong localStorage.
 * Không có dữ liệu mô phỏng: khi không gọi được máy chủ, hàm ném lỗi để trang hiển thị đúng tình trạng.
 */

export const DEFAULT_API_BASE_URL = 'http://localhost:4000';
const BASE_URL_STORAGE_KEY = 'aihub_api_base_url';

export interface GatewayKey {
  id: string;
  name: string;
  prefix: string;
  role: 'developer' | 'admin';
  status: 'active' | 'revoked';
  rateLimitPerMin: number;
  dailyQuota: number;
  usageToday?: number;
  createdAt: string;
  expiresAt?: string;
  revokedAt?: string;
  requestsCount?: number;
  lastUsedAt?: string | null;
}

export interface GatewayStats {
  totalActiveKeys: number;
  totalRevokedKeys: number;
  totalRequestsHandled: number;
  averageLatencyMs: number | null;
  latencySampleSize: number;
  uptimeSeconds: number;
  categoriesSupported: number;
  toolsManaged: number;
}

export interface GatewayAuditLog {
  id: string;
  timestamp: string;
  keyId: string;
  ip: string;
  endpoint: string;
  method: string;
  statusCode: number;
  latencyMs: number;
  action: string;
  details: string;
}

export interface GatewayResponse<T = any> {
  status: number;
  ok: boolean;
  data: T;
  latencyMs: number;
}

/** Lỗi khi không gọi được máy chủ (chưa chạy, sai địa chỉ, bị CORS chặn). */
export class GatewayUnreachableError extends Error {}

export function loadApiBaseUrl(): string {
  try {
    return localStorage.getItem(BASE_URL_STORAGE_KEY) || DEFAULT_API_BASE_URL;
  } catch {
    return DEFAULT_API_BASE_URL;
  }
}

export function saveApiBaseUrl(url: string): void {
  try {
    localStorage.setItem(BASE_URL_STORAGE_KEY, url);
  } catch {
    // Trình duyệt chặn localStorage: chỉ dùng trong phiên hiện tại
  }
}

export function normalizeBaseUrl(url: string): string {
  return url.trim().replace(/\/+$/, '');
}

/** Gọi một điểm cuối và trả về mã trạng thái thật cùng thân JSON. */
export async function callGateway<T = any>(
  baseUrl: string,
  method: 'GET' | 'POST',
  path: string,
  { apiKey, body }: { apiKey?: string; body?: unknown } = {}
): Promise<GatewayResponse<T>> {
  const start = performance.now();
  let res: Response;
  try {
    res = await fetch(`${normalizeBaseUrl(baseUrl)}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {})
      },
      body: method === 'POST' ? JSON.stringify(body ?? {}) : undefined
    });
  } catch (error) {
    throw new GatewayUnreachableError(
      `Không kết nối được tới ${normalizeBaseUrl(baseUrl)}. Máy chủ chưa chạy, sai địa chỉ, hoặc trình duyệt chặn do CORS.`
    );
  }
  let data: any = null;
  try {
    data = await res.json();
  } catch {
    data = { error: `Máy chủ trả về nội dung không phải JSON (HTTP ${res.status}).` };
  }
  return { status: res.status, ok: res.ok, data, latencyMs: Math.round(performance.now() - start) };
}

/** Thông báo lỗi dễ hiểu từ phản hồi không thành công. */
export function describeError(response: GatewayResponse): string {
  const { data, status } = response;
  return [data?.error, data?.message].filter(Boolean).join(' ') || `Yêu cầu thất bại (HTTP ${status}).`;
}
