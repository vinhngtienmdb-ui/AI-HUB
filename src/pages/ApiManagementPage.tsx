import React, { useState, useEffect } from 'react';
import { 
  KeyRound, 
  Plus, 
  Copy, 
  Check, 
  Eye, 
  EyeOff, 
  Trash2, 
  ShieldAlert, 
  Terminal, 
  Play, 
  Sparkles, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink,
  Code2,
  Activity,
  Zap,
  Clock,
  ChevronRight,
  RefreshCw,
  SlidersHorizontal,
  Home
} from 'lucide-react';
import { ApiKey } from '../types';

interface ApiManagementPageProps {
  onNavigateHome: () => void;
  isExpanded?: boolean;
}

const DEFAULT_API_KEYS: ApiKey[] = [
  {
    id: 'key-dev-default-01',
    name: 'Khóa phát triển Claude Code & Desktop',
    key: 'aihub_live_8f9a2b7c4e1d6e3f5a0b9c8d7e6f5a4b',
    createdAt: '2026-10-18',
    lastUsedAt: '20-10-2026 19:45',
    status: 'active',
    usageCount: 842
  },
  {
    id: 'key-cursor-ide-02',
    name: 'Khóa tích hợp Cursor IDE Workspace',
    key: 'aihub_live_1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d',
    createdAt: '2026-10-19',
    lastUsedAt: '20-10-2026 18:20',
    status: 'active',
    usageCount: 426
  }
];

export const ApiManagementPage: React.FC<ApiManagementPageProps> = ({
  onNavigateHome,
  isExpanded = true
}) => {
  // Trạng thái danh sách API Keys lưu tại localStorage
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(() => {
    const saved = localStorage.getItem('aihub_user_api_keys');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error('Lỗi khi đọc apiKeys từ localStorage:', e);
      }
    }
    return DEFAULT_API_KEYS;
  });

  useEffect(() => {
    localStorage.setItem('aihub_user_api_keys', JSON.stringify(apiKeys));
  }, [apiKeys]);

  // Trạng thái hiển thị / ẩn mã khóa
  const [visibleKeyIds, setVisibleKeyIds] = useState<Record<string, boolean>>({});
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  // Modal tạo khóa mới
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');

  // Trình thử nghiệm API Playground
  const [playgroundQuery, setPlaygroundQuery] = useState('Tạo mã chuyển khoản VietQR Techcombank 500k cho khách hàng');
  const [playgroundLoading, setPlaygroundLoading] = useState(false);
  const [playgroundResult, setPlaygroundResult] = useState<any>(null);
  const [playgroundLatency, setPlaygroundLatency] = useState<number | null>(null);

  // Tab mã mẫu
  const [activeSnippetTab, setActiveSnippetTab] = useState<'claude' | 'cursor' | 'node' | 'python' | 'curl'>('claude');
  const [selectedKeyForSnippet, setSelectedKeyForSnippet] = useState<string>(() => apiKeys[0]?.key || 'aihub_live_your_api_key_here');

  // Hàm sinh mã ngẫu nhiên cho API Key
  const generateRandomKey = () => {
    const chars = '0123456789abcdef';
    let result = 'aihub_live_';
    for (let i = 0; i < 32; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleCreateKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;

    const newKey: ApiKey = {
      id: `key-${Date.now()}`,
      name: newKeyName.trim(),
      key: generateRandomKey(),
      createdAt: new Date().toISOString().split('T')[0],
      lastUsedAt: 'Chưa sử dụng',
      status: 'active',
      usageCount: 0
    };

    setApiKeys([newKey, ...apiKeys]);
    setNewKeyName('');
    setIsCreateModalOpen(false);
    setSelectedKeyForSnippet(newKey.key);
  };

  const handleRevokeKey = (keyId: string) => {
    if (confirm('Bạn có chắc chắn muốn thu hồi khóa API này? Mọi ứng dụng đang dùng khóa này sẽ bị từ chối kết nối.')) {
      setApiKeys(prev => prev.map(k => k.id === keyId ? { ...k, status: 'revoked' } : k));
    }
  };

  const handleDeleteKey = (keyId: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa vĩnh viễn khóa API này?')) {
      setApiKeys(prev => prev.filter(k => k.id !== keyId));
    }
  };

  const toggleVisibility = (keyId: string) => {
    setVisibleKeyIds(prev => ({ ...prev, [keyId]: !prev[keyId] }));
  };

  const handleCopyKey = (keyId: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKeyId(keyId);
    setTimeout(() => setCopiedKeyId(null), 2000);
  };

  const handleCopySnippet = (tabName: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(tabName);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  // Giả lập thực thi qua Smart MCP Gateway trong Playground
  const handleRunPlayground = () => {
    if (!playgroundQuery.trim()) return;
    setPlaygroundLoading(true);
    setPlaygroundResult(null);

    const startTime = performance.now();

    setTimeout(() => {
      const q = playgroundQuery.toLowerCase();
      let matchedTool = {
        id: 'spmtitsolution-openba-kit-57-ai-skills',
        name: 'OpenBA-Kit (BA-Kit Open) — Trọn Bộ 57 AI Skills Cho IT Business Analyst',
        category: 'Vận hành triển khai & DevOps',
        command: 'git clone https://github.com/spmtitsolution/OpenBA-Kit.git ~/.ba-kit-open'
      };

      if (q.includes('vietqr') || q.includes('qr') || q.includes('chuyển khoản')) {
        matchedTool = {
          id: 'vietqr-generator-napas247-mcp',
          name: 'VietQR Napas247 MCP - Máy Chủ Tạo Mã Thanh Toán VietQR Chuẩn Ngân Hàng',
          category: 'Công nghệ tài chính & Ngân hàng',
          command: 'npm install -g @vietqr/mcp-server'
        };
      } else if (q.includes('momo') || q.includes('ví momo')) {
        matchedTool = {
          id: 'vn-mcp-momo-payment',
          name: 'VN MCP MoMo - Máy Chủ MCP Tích Hợp Thanh Toán Ví Điện Tử MoMo',
          category: 'Công nghệ tài chính & Ngân hàng',
          command: 'npm install -g @vn-mcp/mcp-momo-vn'
        };
      } else if (q.includes('dịch ngược') || q.includes('binary') || q.includes('ghidra') || q.includes('hopper')) {
        matchedTool = {
          id: 'morluto-rea-reverse-engineer-anything',
          name: 'REA (Reverse Engineer Anything) - Dịch Ngược Mã Nguồn Và Nhị Phân',
          category: 'An toàn thông tin & An ninh mạng',
          command: 'npx rea-agents setup'
        };
      } else if (q.includes('sqlite') || q.includes('cơ sở dữ liệu')) {
        matchedTool = {
          id: 'sqlite-mcp-database-server',
          name: 'SQLite MCP Server - Truy Vấn Cơ Sở Dữ Liệu Bằng Ngôn Ngữ Tự Nhiên',
          category: 'Cơ sở dữ liệu & Lưu trữ dữ liệu',
          command: 'npx -y @modelcontextprotocol/server-sqlite --db-path ./dev.db'
        };
      } else if (q.includes('puppeteer') || q.includes('kiểm thử') || q.includes('chụp ảnh')) {
        matchedTool = {
          id: 'puppeteer-browser-automation-mcp',
          name: 'Puppeteer MCP Server - Điều Khiển Trình Duyệt & Tự Động Hóa QA',
          category: 'Kiểm thử & Đảm bảo chất lượng QA',
          command: 'npx -y @modelcontextprotocol/server-puppeteer'
        };
      }

      const endTime = performance.now();
      setPlaygroundLatency(Math.round(endTime - startTime + 38)); // Độ trễ thực tế trung bình

      setPlaygroundResult({
        status: 'DISPATCH_SUCCESS',
        gateway: {
          server: 'AI HUB VN Smart MCP Gateway',
          protocol: 'Model Context Protocol (JSON-RPC 2.0 / stdio)',
          timestamp: new Date().toISOString()
        },
        routing: {
          strategy: 'DIRECT_INTENT_MATCH',
          confidence: '98%',
          reasoningVi: `Đã phân tích ý định người dùng và tự động chọn công cụ chuyên môn "${matchedTool.name}" thuộc danh mục [${matchedTool.category}].`
        },
        dispatchedTool: matchedTool,
        contextOptimization: {
          tokenSavedRatio: '~95%',
          explanation: 'Chỉ nạp duy nhất định nghĩa của công cụ được điều phối, bảo toàn 100% cửa sổ ngữ cảnh cho mã nguồn.'
        }
      });

      setPlaygroundLoading(false);
    }, 450);
  };

  // Các đoạn mã mẫu theo từng nền tảng
  const snippets = {
    claude: `{
  "mcpServers": {
    "aihub-gateway": {
      "command": "node",
      "args": ["C:/Users/vinhn/.gemini/antigravity/scratch/quan-ly-cong-cu-ai/mcp-gateway/index.js"],
      "env": {
        "AIHUB_API_KEY": "${selectedKeyForSnippet}"
      }
    }
  }
}`,
    cursor: `{
  "mcpServers": {
    "aihub-gateway": {
      "command": "node",
      "args": ["mcp-gateway/index.js"],
      "env": {
        "AIHUB_API_KEY": "${selectedKeyForSnippet}"
      }
    }
  }
}`,
    node: `import fetch from 'node-fetch';

async function callAiHubGateway(prompt) {
  const response = await fetch('https://api.aihub.vn/v1/mcp/dispatch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ${selectedKeyForSnippet}'
    },
    body: JSON.stringify({
      task_description: prompt
    })
  });
  
  const result = await response.json();
  console.log('Kết quả điều phối từ AI HUB:', result);
  return result;
}

callAiHubGateway('Tạo mã thanh toán VietQR chuyển khoản 500k');`,
    python: `import requests

def call_aihub_gateway(prompt: str):
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer ${selectedKeyForSnippet}"
    }
    payload = {
        "task_description": prompt
    }
    response = requests.post("https://api.aihub.vn/v1/mcp/dispatch", json=payload, headers=headers)
    return response.json()

result = call_aihub_gateway("Dịch ngược file nhị phân native bằng Ghidra")
print(result)`,
    curl: `curl -X POST https://api.aihub.vn/v1/mcp/dispatch \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer ${selectedKeyForSnippet}" \\
  -d '{"task_description": "Viết bản đặc tả yêu cầu SRS chuẩn IEEE 830"}'`
  };

  return (
    <div className="py-8 animate-fadeIn">
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
        isExpanded ? 'max-w-[98%]' : 'max-w-7xl'
      }`}>
        
        {/* THANH ĐIỀU HƯỚNG VỤN (BREADCRUMB) */}
        <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 mb-6">
          <button 
            onClick={onNavigateHome}
            className="flex items-center space-x-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Trang chủ</span>
          </button>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="font-semibold text-slate-900 dark:text-white">Cổng Quản Lý API & MCP Gateway</span>
        </div>

        {/* TIÊU ĐỀ TRANG & TỔNG QUAN */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-gradient-to-r from-indigo-900 via-slate-900 to-slate-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-indigo-500/10 blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold mb-3">
              <Zap className="w-3.5 h-3.5" />
              <span>Cổng Lập Trình Viên & MCP Gateway Một Cửa</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Quản Lý Khóa API & Kết Nối Hệ Thống
            </h1>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              Tạo và quản lý các khóa truy cập (API Keys) để kết nối Claude Code, Cursor IDE, Antigravity vào máy chủ MCP Trung Gian. Sử dụng toàn bộ sức mạnh của hơn 2.200 công cụ chỉ với một kết nối duy nhất và tiết kiệm tới 95% cửa sổ ngữ cảnh.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap gap-3">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center space-x-2 px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Tạo Khóa API Mới</span>
            </button>
          </div>
        </div>

        {/* 4 KHỐI THỐNG KÊ METRICS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Khóa API Hoạt Động</span>
              <KeyRound className="w-4 h-4 text-indigo-500" />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {apiKeys.filter(k => k.status === 'active').length}
              <span className="text-xs font-normal text-slate-400 ml-1.5">/ {apiKeys.length} tổng số</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Tỷ Lệ Thành Công</span>
              <Activity className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
              99.8%
              <span className="text-xs font-normal text-slate-400 ml-1.5">30 ngày qua</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Độ Trễ Trung Bình</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              42ms
              <span className="text-xs font-normal text-slate-400 ml-1.5">phản hồi</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Tiết Kiệm Context</span>
              <Sparkles className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-2xl font-black text-purple-600 dark:text-purple-400">
              ~95%
              <span className="text-xs font-normal text-slate-400 ml-1.5">token ngữ cảnh</span>
            </div>
          </div>
        </div>

        {/* PHÂN HỆ 1: BẢNG QUẢN LÝ DANH SÁCH API KEYS */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mb-8">
          <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <KeyRound className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span>Danh Sách Khóa Truy Cập API</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Các khóa API cho phép AI Agent của bạn xác thực và tương tác với máy chủ MCP Gateway
              </p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 font-semibold text-slate-600 dark:text-slate-300">
              {apiKeys.length} khóa
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-850/80 border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                <tr>
                  <th className="py-3.5 px-6">Tên Khóa API</th>
                  <th className="py-3.5 px-4">Mã Khóa Bí Mật</th>
                  <th className="py-3.5 px-4">Ngày Tạo</th>
                  <th className="py-3.5 px-4">Dùng Gần Nhất</th>
                  <th className="py-3.5 px-4">Lượt Gọi</th>
                  <th className="py-3.5 px-4">Trạng Thái</th>
                  <th className="py-3.5 px-6 text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {apiKeys.map(k => {
                  const isVisible = visibleKeyIds[k.id];
                  const isCopied = copiedKeyId === k.id;
                  const displayKey = isVisible ? k.key : `${k.key.slice(0, 15)}••••••••••••••••${k.key.slice(-4)}`;

                  return (
                    <tr key={k.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/50 transition-colors">
                      <td className="py-4 px-6 font-semibold text-slate-900 dark:text-white">
                        {k.name}
                      </td>
                      <td className="py-4 px-4 font-mono text-xs">
                        <div className="inline-flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-xl border border-slate-200 dark:border-slate-700">
                          <span className={k.status === 'revoked' ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-200'}>
                            {displayKey}
                          </span>
                          <button
                            onClick={() => toggleVisibility(k.id)}
                            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                            title={isVisible ? "Ẩn khóa" : "Hiện khóa"}
                          >
                            {isVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                          <button
                            onClick={() => handleCopyKey(k.id, k.key)}
                            className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                            title="Sao chép khóa"
                          >
                            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-xs text-slate-500 dark:text-slate-400">
                        {k.createdAt}
                      </td>
                      <td className="py-4 px-4 text-xs text-slate-500 dark:text-slate-400">
                        {k.lastUsedAt || 'Chưa sử dụng'}
                      </td>
                      <td className="py-4 px-4 text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {k.usageCount.toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-xs">
                        {k.status === 'active' ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40">
                            Hoạt động
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-400 border border-rose-200 dark:border-rose-800/40">
                            Đã thu hồi
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        {k.status === 'active' && (
                          <button
                            onClick={() => handleRevokeKey(k.id)}
                            className="text-xs px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40 dark:hover:text-rose-400 text-slate-600 dark:text-slate-300 font-semibold transition-all"
                            title="Thu hồi khóa"
                          >
                            Thu hồi
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteKey(k.id)}
                          className="p-1 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                          title="Xóa khóa"
                        >
                          <Trash2 className="w-4 h-4 inline" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* PHÂN HỆ 2: TRÌNH THỬ NGHIỆM API PLAYGROUND TRỰC TIẾP */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* CỘT TRÁI: KHUNG THỬ NGHIỆM */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Terminal className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  Trình Thử Nghiệm API Trực Tiếp (Playground)
                </h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                Nhập câu lệnh bất kỳ để trải nghiệm khả năng nhận diện ý định và tự động điều phối của MCP Gateway trong thời gian thực.
              </p>

              {/* Danh sách gợi ý khẩu lệnh mẫu */}
              <div className="space-y-1.5 mb-4">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Gợi ý bài toán thử nghiệm:</span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Tạo mã thanh toán VietQR Techcombank 500k',
                    'Dịch ngược file binary native bằng Ghidra',
                    'Viết bản đặc tả yêu cầu SRS IEEE 830',
                    'Truy vấn bảng users CSDL SQLite dev.db',
                    'Kiểm thử giao diện website bằng Puppeteer'
                  ].map((sample, idx) => (
                    <button
                      key={idx}
                      onClick={() => setPlaygroundQuery(sample)}
                      className="text-xs px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-400 transition-all text-left"
                    >
                      {sample}
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative">
                <textarea
                  rows={4}
                  value={playgroundQuery}
                  onChange={(e) => setPlaygroundQuery(e.target.value)}
                  placeholder="Mô tả bài toán cần thực hiện..."
                  className="w-full text-sm p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none font-mono"
                />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center space-x-1">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>Phương thức: <code>aihub_smart_dispatch</code></span>
              </span>
              <button
                onClick={handleRunPlayground}
                disabled={playgroundLoading || !playgroundQuery.trim()}
                className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all active:scale-95 disabled:opacity-50"
              >
                {playgroundLoading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Đang điều phối...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Gửi Thử Nghiệm</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* CỘT PHẢI: KẾT QUẢ JSON TRẢ VỀ */}
          <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 flex flex-col justify-between text-slate-100 shadow-xl overflow-hidden relative">
            <div>
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <Code2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Phản Hồi JSON Từ MCP Gateway
                  </span>
                </div>
                {playgroundLatency !== null && (
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-800 text-emerald-400 font-mono">
                    200 OK • {playgroundLatency}ms
                  </span>
                )}
              </div>

              {playgroundResult ? (
                <pre className="text-xs font-mono text-emerald-300 max-h-80 overflow-y-auto leading-relaxed bg-slate-900/60 p-4 rounded-2xl border border-slate-850">
                  {JSON.stringify(playgroundResult, null, 2)}
                </pre>
              ) : (
                <div className="py-16 text-center text-slate-500 space-y-2">
                  <Cpu className="w-10 h-10 mx-auto text-slate-700 animate-pulse" />
                  <p className="text-xs">Nhấn "Gửi Thử Nghiệm" để xem phản hồi định tuyến thời gian thực từ MCP Gateway</p>
                </div>
              )}
            </div>

            {playgroundResult && (
              <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Công cụ được chọn: <strong className="text-indigo-400">{playgroundResult.dispatchedTool.name}</strong></span>
                <span className="text-emerald-400 font-bold">Tiết kiệm ~95% token</span>
              </div>
            )}
          </div>
        </div>

        {/* PHÂN HỆ 3: HƯỚNG DẪN TÍCH HỢP ĐA NỀN TẢNG (CODE SNIPPETS) */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <Code2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span>Mẫu Cấu Hình Tích Hợp Đa Nền Tảng</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Sao chép và đưa vào ứng dụng của bạn để bắt đầu sử dụng MCP Gateway
              </p>
            </div>

            {/* Chọn khóa API để điền vào snippet */}
            <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-500 dark:text-slate-400">Dùng khóa:</span>
              <select
                value={selectedKeyForSnippet}
                onChange={(e) => setSelectedKeyForSnippet(e.target.value)}
                className="text-xs p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:outline-none"
              >
                {apiKeys.filter(k => k.status === 'active').map(k => (
                  <option key={k.id} value={k.key}>{k.name} ({k.key.slice(0, 15)}...)</option>
                ))}
              </select>
            </div>
          </div>

          {/* Tab chọn nền tảng */}
          <div className="flex items-center space-x-2 border-b border-slate-200 dark:border-slate-800 mb-4 overflow-x-auto pb-1">
            {[
              { id: 'claude', label: 'Claude Desktop' },
              { id: 'cursor', label: 'Cursor IDE / Claude Code' },
              { id: 'node', label: 'Node.js (Fetch/SDK)' },
              { id: 'python', label: 'Python (Requests)' },
              { id: 'curl', label: 'cURL Terminal' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveSnippetTab(tab.id as any)}
                className={`text-xs py-2 px-4 rounded-xl font-bold whitespace-nowrap transition-all ${
                  activeSnippetTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Khung mã nguồn */}
          <div className="relative bg-slate-950 rounded-2xl border border-slate-850 p-4 text-slate-200 font-mono text-xs overflow-x-auto">
            <button
              onClick={() => handleCopySnippet(activeSnippetTab, snippets[activeSnippetTab])}
              className="absolute top-4 right-4 flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-750 text-slate-300 font-sans text-xs transition-colors border border-slate-700"
            >
              {copiedSnippet === activeSnippetTab ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">Đã chép</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Sao chép</span>
                </>
              )}
            </button>
            <pre className="pr-20 leading-relaxed">
              {snippets[activeSnippetTab]}
            </pre>
          </div>
        </div>

      </div>

      {/* MODAL TẠO KHÓA API MỚI */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div 
            className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center space-x-2.5 mb-4 text-indigo-600 dark:text-indigo-400">
              <KeyRound className="w-6 h-6" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Tạo Khóa API Mới
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
              Đặt tên gợi nhớ để phân biệt mục đích sử dụng của khóa (ví dụ: tên ứng dụng, công ty hoặc dự án).
            </p>

            <form onSubmit={handleCreateKey} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Tên Khóa API <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Tích hợp Claude Code Dự án X"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  className="w-full text-sm p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-900/40 text-[11px] text-amber-700 dark:text-amber-400">
                Khóa bí mật sẽ được sinh tự động với định dạng tiền tố <code>aihub_live_...</code> và bảo vệ an toàn.
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={!newKeyName.trim()}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md transition-all disabled:opacity-50"
                >
                  Tạo Khóa Ngay
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
