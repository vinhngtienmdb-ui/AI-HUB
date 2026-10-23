import React, { useMemo, useState } from 'react';
import {
  KeyRound,
  Plus,
  Copy,
  Check,
  ShieldAlert,
  Play,
  Code2,
  Activity,
  Zap,
  RefreshCw,
  Home,
  ShieldCheck,
  AlertTriangle,
  Server,
  ArrowRight,
  PlugZap,
  Wrench
} from 'lucide-react';
import {
  callGateway,
  describeError,
  GatewayAuditLog,
  GatewayKey,
  GatewayStats,
  GatewayUnreachableError,
  loadApiBaseUrl,
  normalizeBaseUrl,
  saveApiBaseUrl
} from '../lib/apiGatewayClient';

interface ApiManagementPageProps {
  onNavigateHome: () => void;
  onNavigateMcp?: () => void;
  isExpanded?: boolean;
}

type ConnectionState =
  | { kind: 'idle' }
  | { kind: 'connecting' }
  | { kind: 'connected'; version: string; toolCount: number }
  | { kind: 'error'; message: string; unreachable: boolean };

// Điểm cuối có thể thử trong Playground; điểm cuối quản trị dùng các khối quản lý ở trên
const PLAYGROUND_ENDPOINTS = [
  { id: 'dispatch', method: 'POST' as const, path: '/api/v1/dispatch', needsKey: true },
  { id: 'tools', method: 'GET' as const, path: '/api/v1/tools?q=playwright', needsKey: false },
  { id: 'health', method: 'GET' as const, path: '/api/v1/health', needsKey: false }
];

const DEFAULT_DISPATCH_BODY = JSON.stringify({ query: 'Tạo mã thanh toán VietQR chuyển khoản 500k' }, null, 2);

const formatDateTime = (value?: string | null) => (value ? new Date(value).toLocaleString('vi-VN') : '—');

const card = 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm';
const input = 'w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500';

export const ApiManagementPage: React.FC<ApiManagementPageProps> = ({
  onNavigateHome,
  onNavigateMcp,
  isExpanded = true
}) => {
  // Kết nối tới Cổng REST API chạy trên máy người dùng
  const [baseUrl, setBaseUrl] = useState<string>(loadApiBaseUrl);
  // Khóa admin chỉ giữ trong bộ nhớ, không lưu vào trình duyệt
  const [adminKey, setAdminKey] = useState('');
  const [connection, setConnection] = useState<ConnectionState>({ kind: 'idle' });

  const [keys, setKeys] = useState<GatewayKey[]>([]);
  const [stats, setStats] = useState<GatewayStats | null>(null);
  const [auditLogs, setAuditLogs] = useState<GatewayAuditLog[]>([]);
  const [adminError, setAdminError] = useState<string | null>(null);

  // Tạo khóa mới
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyRole, setNewKeyRole] = useState<'developer' | 'admin'>('developer');
  const [newKeyRateLimit, setNewKeyRateLimit] = useState(60);
  const [newKeyDailyQuota, setNewKeyDailyQuota] = useState(5000);
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  // Khóa thô do máy chủ trả về, chỉ hiển thị một lần
  const [newlyCreatedRawKey, setNewlyCreatedRawKey] = useState<string | null>(null);

  // Playground
  const [playgroundKey, setPlaygroundKey] = useState('');
  const [endpointId, setEndpointId] = useState('dispatch');
  const [payload, setPayload] = useState(DEFAULT_DISPATCH_BODY);
  const [testResponse, setTestResponse] = useState<{ status: number | null; body: string; latencyMs: number | null } | null>(null);
  const [isLoadingTest, setIsLoadingTest] = useState(false);

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeCodeTab, setActiveCodeTab] = useState<'curl' | 'node' | 'python'>('curl');

  const isConnected = connection.kind === 'connected';
  const endpoint = PLAYGROUND_ENDPOINTS.find((e) => e.id === endpointId) || PLAYGROUND_ENDPOINTS[0];
  const pageOrigin = typeof window !== 'undefined' ? window.location.origin : '';
  const isRemotePage = !/^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/.test(pageOrigin);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Tải danh sách khóa, số liệu và nhật ký bằng khóa admin
  const refreshAdminData = async (url = baseUrl, key = adminKey) => {
    if (!key) {
      setAdminError('Nhập khóa admin để xem và quản lý khóa.');
      return;
    }
    setAdminError(null);
    try {
      const [keysRes, statsRes, logsRes] = await Promise.all([
        callGateway<{ keys: GatewayKey[] }>(url, 'GET', '/api/v1/keys', { apiKey: key }),
        callGateway<GatewayStats>(url, 'GET', '/api/v1/stats', { apiKey: key }),
        callGateway<{ logs: GatewayAuditLog[] }>(url, 'GET', '/api/v1/audit-logs', { apiKey: key })
      ]);
      const failed = [keysRes, statsRes, logsRes].find((r) => !r.ok);
      if (failed) {
        setAdminError(describeError(failed));
        return;
      }
      setKeys(keysRes.data.keys);
      setStats(statsRes.data);
      setAuditLogs(logsRes.data.logs);
    } catch (error: any) {
      setAdminError(error.message);
    }
  };

  const handleConnect = async () => {
    const url = normalizeBaseUrl(baseUrl);
    setBaseUrl(url);
    saveApiBaseUrl(url);
    setConnection({ kind: 'connecting' });
    try {
      const health = await callGateway(url, 'GET', '/api/v1/health');
      if (!health.ok) {
        setConnection({ kind: 'error', message: describeError(health), unreachable: false });
        return;
      }
      setConnection({ kind: 'connected', version: health.data.version, toolCount: health.data.totalToolsAvailable });
      if (!playgroundKey && adminKey) setPlaygroundKey(adminKey);
      if (adminKey) await refreshAdminData(url, adminKey);
    } catch (error: any) {
      setConnection({ kind: 'error', message: error.message, unreachable: error instanceof GatewayUnreachableError });
    }
  };

  const handleCreateKey = async () => {
    setIsCreating(true);
    setCreateError(null);
    setNewlyCreatedRawKey(null);
    try {
      const res = await callGateway<{ rawKey: string }>(baseUrl, 'POST', '/api/v1/keys/generate', {
        apiKey: adminKey,
        body: { name: newKeyName.trim(), role: newKeyRole, rateLimitPerMin: newKeyRateLimit, dailyQuota: newKeyDailyQuota }
      });
      if (!res.ok) {
        setCreateError(describeError(res));
        return;
      }
      setNewlyCreatedRawKey(res.data.rawKey);
      setPlaygroundKey(res.data.rawKey);
      setNewKeyName('');
      await refreshAdminData();
    } catch (error: any) {
      setCreateError(error.message);
    } finally {
      setIsCreating(false);
    }
  };

  const handleRevokeKey = async (keyItem: GatewayKey) => {
    if (!confirm(`Thu hồi khóa "${keyItem.name}"? Mọi ứng dụng dùng khóa này sẽ bị từ chối ngay lập tức.`)) return;
    try {
      const res = await callGateway(baseUrl, 'POST', '/api/v1/keys/revoke', { apiKey: adminKey, body: { keyId: keyItem.id } });
      if (!res.ok) {
        setAdminError(describeError(res));
        return;
      }
      await refreshAdminData();
    } catch (error: any) {
      setAdminError(error.message);
    }
  };

  // Gửi yêu cầu thật tới máy chủ; không có kết quả dựng sẵn khi lỗi
  const handleExecuteApiTest = async () => {
    setIsLoadingTest(true);
    setTestResponse(null);
    try {
      let body: unknown;
      if (endpoint.method === 'POST') {
        try {
          body = JSON.parse(payload);
        } catch {
          setTestResponse({ status: null, body: 'Thân yêu cầu không phải JSON hợp lệ.', latencyMs: null });
          return;
        }
      }
      const res = await callGateway(baseUrl, endpoint.method, endpoint.path, {
        apiKey: endpoint.needsKey ? playgroundKey.trim() : undefined,
        body
      });
      setTestResponse({ status: res.status, body: JSON.stringify(res.data, null, 2), latencyMs: res.latencyMs });
      if (adminKey && isConnected) refreshAdminData();
    } catch (error: any) {
      setTestResponse({ status: null, body: error.message, latencyMs: null });
    } finally {
      setIsLoadingTest(false);
    }
  };

  const codeSamples = useMemo(() => {
    const url = `${normalizeBaseUrl(baseUrl)}/api/v1/dispatch`;
    return {
      curl: `curl -X POST ${url} \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer aihub_live_KHOA_CUA_BAN" \\
  -d '{"query": "Tạo mã thanh toán VietQR chuyển khoản 500k"}'`,
      node: `const response = await fetch('${url}', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + process.env.AIHUB_API_KEY
  },
  body: JSON.stringify({ query: 'Tạo mã thanh toán VietQR chuyển khoản 500k' })
});
const data = await response.json();
console.log(response.status, data.result?.status, data.result?.dispatchedTool?.name);`,
      python: `import os, requests

response = requests.post(
    "${url}",
    headers={"Authorization": f"Bearer {os.environ['AIHUB_API_KEY']}"},
    json={"query": "Tạo mã thanh toán VietQR chuyển khoản 500k"},
)
data = response.json()
print(response.status_code, data.get("result", {}).get("status"))`
    };
  }, [baseUrl]);

  const statCards = [
    {
      icon: <KeyRound className="w-4 h-4 text-indigo-500" />,
      label: 'Khóa Đang Hoạt Động',
      value: stats ? `${stats.totalActiveKeys}` : '—',
      note: stats ? `${stats.totalRevokedKeys} đã thu hồi` : 'Cần khóa admin'
    },
    {
      icon: <Activity className="w-4 h-4 text-emerald-500" />,
      label: 'Tổng Lượt Yêu Cầu',
      value: stats ? stats.totalRequestsHandled.toLocaleString('vi-VN') : '—',
      note: 'Cộng dồn của mọi khóa'
    },
    {
      icon: <Zap className="w-4 h-4 text-amber-500" />,
      label: 'Độ Trễ Điều Phối Trung Bình',
      value: stats?.averageLatencyMs != null ? `${stats.averageLatencyMs}ms` : '—',
      note: stats ? `${stats.latencySampleSize} lượt kể từ khi máy chủ khởi động` : 'Đo từ nhật ký máy chủ'
    },
    {
      icon: <Server className="w-4 h-4 text-blue-500" />,
      label: 'Công Cụ Điều Phối',
      value: stats ? stats.toolsManaged.toLocaleString('vi-VN') : connection.kind === 'connected' ? connection.toolCount.toLocaleString('vi-VN') : '—',
      note: stats ? `${stats.categoriesSupported} lĩnh vực` : ''
    }
  ];

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 min-h-screen py-8 transition-colors">
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${isExpanded ? 'max-w-[98%]' : 'max-w-7xl'}`}>

        {/* ĐIỀU HƯỚNG BREADCRUMB */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
            <button
              onClick={onNavigateHome}
              className="flex items-center space-x-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Trang chủ</span>
            </button>
            <span>/</span>
            <span className="font-semibold text-slate-900 dark:text-white">Cổng Quản Lý API & Bảo Mật</span>
          </div>

          {onNavigateMcp && (
            <button
              onClick={onNavigateMcp}
              className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs font-semibold hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-all shadow-xs"
            >
              <Server className="w-3.5 h-3.5" />
              <span>Chuyển sang Trang Máy Chủ MCP Server</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* TIÊU ĐỀ, KẾT NỐI VÀ SỐ LIỆU */}
        <div className={`mb-10 ${card} sm:p-8`}>
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Khóa băm HMAC-SHA256 • Giới hạn tần suất & hạn mức ngày • Nhật ký kiểm toán</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Quản Lý Khóa API & Bảo Mật Hệ Thống
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Trang này điều khiển Cổng REST API chạy trên máy của bạn (<code>npm run mcp:api</code>). Mọi khóa, số liệu và nhật ký
                đều đọc trực tiếp từ máy chủ; trang không lưu khóa và không hiển thị dữ liệu mẫu.
              </p>
            </div>

            {/* KẾT NỐI MÁY CHỦ */}
            <div className="w-full lg:w-[420px] shrink-0 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center space-x-1.5">
                  <PlugZap className="w-4 h-4 text-indigo-500" />
                  <span>Kết nối máy chủ API</span>
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    connection.kind === 'connected'
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300'
                      : connection.kind === 'error'
                      ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300'
                      : 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                  }`}
                >
                  {connection.kind === 'connected'
                    ? `Đã kết nối • v${connection.version}`
                    : connection.kind === 'connecting'
                    ? 'Đang kết nối...'
                    : connection.kind === 'error'
                    ? 'Không kết nối được'
                    : 'Chưa kết nối'}
                </span>
              </div>
              <label className="block text-[11px] text-slate-500">
                Địa chỉ máy chủ
                <input className={`${input} mt-1 font-mono`} value={baseUrl} onChange={(e) => setBaseUrl(e.target.value)} />
              </label>
              <label className="block text-[11px] text-slate-500">
                Khóa admin (in ra màn hình khi máy chủ khởi động lần đầu; chỉ giữ trong trang đến khi tải lại)
                <input
                  className={`${input} mt-1 font-mono`}
                  type="password"
                  autoComplete="off"
                  placeholder="aihub_live_..."
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                />
              </label>
              <button
                onClick={handleConnect}
                disabled={connection.kind === 'connecting'}
                className="w-full flex items-center justify-center space-x-2 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-semibold"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${connection.kind === 'connecting' ? 'animate-spin' : ''}`} />
                <span>{isConnected ? 'Kết nối lại & tải dữ liệu' : 'Kết nối'}</span>
              </button>
            </div>
          </div>

          {/* HƯỚNG DẪN KHI CHƯA KẾT NỐI ĐƯỢC */}
          {connection.kind === 'error' && (
            <div className="mt-6 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 space-y-2">
              <div className="font-bold flex items-center space-x-1.5">
                <AlertTriangle className="w-4 h-4" />
                <span>{connection.message}</span>
              </div>
              {connection.unreachable && (
                <ol className="list-decimal pl-5 space-y-1">
                  <li>Trong thư mục AI-HUB đã <code>npm install</code>, chạy <code>npm run mcp:api</code> (mặc định cổng 4000).</li>
                  <li>Lần chạy đầu tiên, máy chủ in khóa admin ra màn hình; dán khóa đó vào ô "Khóa admin".</li>
                  {isRemotePage && (
                    <li>
                      Trang đang mở từ <code>{pageOrigin}</code>, không phải localhost: khởi động máy chủ với{' '}
                      <code>AIHUB_ALLOWED_ORIGINS={pageOrigin}</code> để máy chủ chấp nhận yêu cầu từ trang này.
                    </li>
                  )}
                </ol>
              )}
            </div>
          )}

          {/* SỐ LIỆU TỪ MÁY CHỦ */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
            {statCards.map((item) => (
              <div key={item.label} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400 text-xs mb-1">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">{item.value}</div>
                {item.note && <div className="text-[10px] text-slate-500 mt-0.5">{item.note}</div>}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* CỘT TRÁI: KHÓA & NHẬT KÝ */}
          <div className="lg:col-span-7 space-y-8">

            {/* DANH SÁCH KHÓA API */}
            <div className={card}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                    <KeyRound className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    <span>Danh Sách Khóa Trên Máy Chủ</span>
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Máy chủ chỉ lưu chuỗi băm, nên chỉ hiển thị tiền tố của khóa. Khóa thô chỉ xuất hiện một lần khi tạo.
                  </p>
                </div>
              </div>

              {adminError && (
                <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-300">
                  {adminError}
                </div>
              )}

              {keys.length === 0 ? (
                <div className="text-center py-10 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-xs text-slate-500">
                  {isConnected && adminKey ? 'Máy chủ chưa có khóa nào khác.' : 'Kết nối máy chủ bằng khóa admin để xem danh sách khóa.'}
                </div>
              ) : (
                <div className="space-y-3">
                  {keys.map((keyItem) => (
                    <div
                      key={keyItem.id}
                      className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-bold text-sm text-slate-900 dark:text-white">{keyItem.name}</span>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                keyItem.status === 'active'
                                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300'
                                  : 'bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300'
                              }`}
                            >
                              {keyItem.status === 'active' ? 'Đang hoạt động' : 'Đã thu hồi'}
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 uppercase">
                              {keyItem.role}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            <code className="font-mono">{keyItem.prefix}</code> • {keyItem.rateLimitPerMin} yêu cầu/phút •
                            hôm nay {keyItem.usageToday ?? 0}/{keyItem.dailyQuota.toLocaleString('vi-VN')} lượt •
                            tổng {keyItem.requestsCount ?? 0} yêu cầu
                          </p>
                          <p className="text-[11px] text-slate-400">
                            Tạo {formatDateTime(keyItem.createdAt)} • Hết hạn {formatDateTime(keyItem.expiresAt)} • Dùng lần cuối {formatDateTime(keyItem.lastUsedAt)}
                          </p>
                        </div>
                        {keyItem.status === 'active' && (
                          <button
                            onClick={() => handleRevokeKey(keyItem)}
                            className="shrink-0 inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/50 text-[11px] font-semibold"
                            title="Thu hồi quyền truy cập của khóa này"
                          >
                            <ShieldAlert className="w-3.5 h-3.5" />
                            <span>Thu hồi</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* NHẬT KÝ KIỂM TOÁN */}
            <div className={card}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">Nhật Ký Kiểm Toán (Audit Logs)</h2>
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  {auditLogs.length} bản ghi • lưu trong bộ nhớ máy chủ, mất khi khởi động lại
                </span>
              </div>

              {auditLogs.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-500">Chưa có bản ghi (hoặc chưa kết nối bằng khóa admin).</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400">
                        <th className="py-2.5 px-3 font-semibold">Thời gian</th>
                        <th className="py-2.5 px-3 font-semibold">Khóa</th>
                        <th className="py-2.5 px-3 font-semibold">Điểm cuối</th>
                        <th className="py-2.5 px-3 font-semibold">Kết quả</th>
                        <th className="py-2.5 px-3 font-semibold">Độ trễ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                      {auditLogs.map((log) => (
                        <tr key={log.id} title={log.details}>
                          <td className="py-2.5 px-3 text-slate-500 dark:text-slate-400 whitespace-nowrap">{formatDateTime(log.timestamp)}</td>
                          <td className="py-2.5 px-3 text-indigo-600 dark:text-indigo-400 font-semibold truncate max-w-[140px]">{log.keyId}</td>
                          <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300">
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 mr-1">{log.method}</span>
                            {log.endpoint}
                          </td>
                          <td className="py-2.5 px-3">
                            <span
                              className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                log.statusCode < 400
                                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300'
                                  : 'bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300'
                              }`}
                            >
                              {log.statusCode} {log.action}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-slate-500 dark:text-slate-400">{log.latencyMs}ms</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* CỘT PHẢI: TẠO KHÓA, PLAYGROUND, MÃ MẪU */}
          <div className="lg:col-span-5 space-y-8">

            {/* TẠO KHÓA MỚI */}
            <div className={card}>
              <div className="flex items-center space-x-2 mb-4">
                <Plus className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h2 className="text-base font-bold text-slate-900 dark:text-white">Tạo Khóa API Mới</h2>
              </div>
              <div className="space-y-3">
                <label className="block text-[11px] text-slate-500">
                  Tên khóa (tối đa 100 ký tự)
                  <input className={`${input} mt-1`} maxLength={100} value={newKeyName} onChange={(e) => setNewKeyName(e.target.value)} placeholder="Ví dụ: Ứng dụng nội bộ" />
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <label className="block text-[11px] text-slate-500">
                    Vai trò
                    <select className={`${input} mt-1`} value={newKeyRole} onChange={(e) => setNewKeyRole(e.target.value as 'developer' | 'admin')}>
                      <option value="developer">developer</option>
                      <option value="admin">admin</option>
                    </select>
                  </label>
                  <label className="block text-[11px] text-slate-500">
                    Yêu cầu/phút (1–1000)
                    <input className={`${input} mt-1`} type="number" min={1} max={1000} value={newKeyRateLimit} onChange={(e) => setNewKeyRateLimit(Number(e.target.value))} />
                  </label>
                  <label className="block text-[11px] text-slate-500">
                    Lượt/ngày (1–1.000.000)
                    <input className={`${input} mt-1`} type="number" min={1} max={1000000} value={newKeyDailyQuota} onChange={(e) => setNewKeyDailyQuota(Number(e.target.value))} />
                  </label>
                </div>
                <button
                  onClick={handleCreateKey}
                  disabled={!isConnected || !adminKey || !newKeyName.trim() || isCreating}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-semibold"
                >
                  {isCreating ? 'Đang tạo...' : 'Tạo khóa trên máy chủ'}
                </button>
                {(!isConnected || !adminKey) && (
                  <p className="text-[11px] text-slate-500">Cần kết nối máy chủ bằng khóa admin.</p>
                )}
                {createError && <p className="text-[11px] text-rose-600">{createError}</p>}
                {newlyCreatedRawKey && (
                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-2">
                    <p className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-200">
                      Lưu khóa này ngay. Máy chủ chỉ trả khóa thô một lần; tải lại trang là mất.
                    </p>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 text-slate-100 font-mono text-[11px]">
                      <span className="truncate mr-2">{newlyCreatedRawKey}</span>
                      <button onClick={() => handleCopy(newlyCreatedRawKey, 'raw-key')} className="text-slate-300 hover:text-white">
                        {copiedId === 'raw-key' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* PLAYGROUND */}
            <div className={card}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Play className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">Thử Gọi API</h2>
                </div>
                <span className="text-[11px] text-slate-500">Gửi yêu cầu thật tới {normalizeBaseUrl(baseUrl)}</span>
              </div>

              <div className="space-y-3">
                <select className={`${input} font-mono`} value={endpointId} onChange={(e) => setEndpointId(e.target.value)} aria-label="Chọn điểm cuối">
                  {PLAYGROUND_ENDPOINTS.map((e) => (
                    <option key={e.id} value={e.id}>{e.method} {e.path}</option>
                  ))}
                </select>
                {endpoint.needsKey && (
                  <label className="block text-[11px] text-slate-500">
                    Khóa dùng để gọi (khóa vừa tạo hoặc khóa bạn đã lưu)
                    <input
                      className={`${input} mt-1 font-mono`}
                      type="password"
                      autoComplete="off"
                      placeholder="aihub_live_..."
                      value={playgroundKey}
                      onChange={(e) => setPlaygroundKey(e.target.value)}
                    />
                  </label>
                )}
                {endpoint.method === 'POST' && (
                  <textarea
                    className={`${input} font-mono h-28`}
                    value={payload}
                    onChange={(e) => setPayload(e.target.value)}
                    aria-label="Thân yêu cầu JSON"
                  />
                )}
                <button
                  onClick={handleExecuteApiTest}
                  disabled={isLoadingTest}
                  className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-semibold"
                >
                  {isLoadingTest ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
                  <span>Gửi yêu cầu</span>
                </button>

                {testResponse && (
                  <div>
                    <div className="flex items-center justify-between mb-1.5 text-[11px]">
                      <span
                        className={`font-bold ${
                          testResponse.status !== null && testResponse.status < 400 ? 'text-emerald-600' : 'text-rose-600'
                        }`}
                      >
                        {testResponse.status !== null ? `HTTP ${testResponse.status}` : 'Không gửi được yêu cầu'}
                      </span>
                      {testResponse.latencyMs !== null && <span className="text-slate-500 font-mono">{testResponse.latencyMs}ms</span>}
                    </div>
                    <pre className="p-3.5 rounded-xl bg-slate-900 text-slate-200 font-mono text-[11px] overflow-x-auto max-h-80 border border-slate-800 whitespace-pre-wrap">
                      {testResponse.body}
                    </pre>
                  </div>
                )}
              </div>
            </div>

            {/* MÃ MẪU TÍCH HỢP */}
            <div className={card}>
              <div className="flex items-center space-x-2 mb-4">
                <Code2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h2 className="text-base font-bold text-slate-900 dark:text-white">Mã Mẫu Tích Hợp</h2>
              </div>
              <div className="flex items-center space-x-1 border-b border-slate-200 dark:border-slate-800 mb-3 pb-2 text-xs">
                {(['curl', 'node', 'python'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveCodeTab(tab)}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                      activeCodeTab === tab
                        ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400'
                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                  >
                    {tab.toUpperCase()}
                  </button>
                ))}
              </div>
              <div className="relative">
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-[11px] overflow-x-auto leading-relaxed border border-slate-800">
                  {codeSamples[activeCodeTab]}
                </pre>
                <button
                  onClick={() => handleCopy(codeSamples[activeCodeTab], 'code')}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs"
                >
                  {copiedId === 'code' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
              <p className="mt-3 text-[11px] text-slate-500 flex items-start space-x-1.5">
                <Wrench className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>
                  Địa chỉ trong mã mẫu là địa chỉ máy chủ bạn nhập ở trên. Khi đưa máy chủ ra mạng, đặt <code>AIHUB_API_HOST</code> và dùng
                  reverse proxy HTTPS (xem <code>HUONG_DAN_CAI_DAT_VA_SU_DUNG_MCP_API.md</code>).
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
