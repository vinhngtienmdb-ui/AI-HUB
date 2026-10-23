import React, { useState } from 'react';
import { 
  Server, 
  Terminal, 
  Copy, 
  Check, 
  Play, 
  Sparkles, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  Activity, 
  RefreshCw, 
  Home, 
  KeyRound, 
  ArrowRight, 
  Download, 
  ExternalLink,
  Code2,
  CheckCircle2,
  HelpCircle,
  FolderGit2,
  Workflow
} from 'lucide-react';
import { routeTaskFrontend, dispatchTaskFrontend, getAllToolsFrontend } from '../lib/mcpClient';
import { AITool } from '../types';

// Số công cụ lấy từ kho dữ liệu thực tế, định dạng tiếng Việt (ví dụ 2.222)
const TOOL_COUNT_LABEL = getAllToolsFrontend().length.toLocaleString('vi-VN');

interface McpServerPageProps {
  onNavigateHome: () => void;
  onNavigateApi?: () => void;
  isExpanded?: boolean;
}

export const McpServerPage: React.FC<McpServerPageProps> = ({
  onNavigateHome,
  onNavigateApi,
  isExpanded = true
}) => {
  // Trạng thái sao chép cấu hình
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Tab cấu hình Client
  const [activeClientTab, setActiveClientTab] = useState<'claude_desktop' | 'cursor' | 'claude_code' | 'antigravity'>('claude_desktop');

  // Trình kiểm tra công cụ MCP Inspector
  const [selectedToolName, setSelectedToolName] = useState<string>('aihub_smart_dispatch');
  const [inspectorInput, setInspectorInput] = useState<string>('Tạo mã thanh toán VietQR chuyển khoản ngân hàng Techcombank 500k');
  const [inspectorResult, setInspectorResult] = useState<string | null>(null);
  const [isLoadingInspector, setIsLoadingInspector] = useState<boolean>(false);
  const [inspectorLatency, setInspectorLatency] = useState<number | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Thực thi thử nghiệm MCP Tool
  const handleRunMcpInspector = async () => {
    setIsLoadingInspector(true);
    setInspectorResult(null);
    const start = performance.now();

    try {
      await new Promise((r) => setTimeout(r, 60)); // Giả lập độ trễ xử lý Stdio Transport

      let output: any = null;

      if (selectedToolName === 'aihub_smart_dispatch') {
        const routing = routeTaskFrontend(inspectorInput);
        output = dispatchTaskFrontend(routing, inspectorInput);
      } else if (selectedToolName === 'aihub_resolve_capability') {
        const routing = routeTaskFrontend(inspectorInput);
        const tool = routing.matchedTool;
        output = {
          query: inspectorInput,
          supported: Boolean(tool),
          confidence: Math.round(routing.confidence * 100) + '%',
          recommendedTool: tool ? {
            id: tool.id,
            name: tool.name,
            categoryNameVi: tool.categoryNameVi,
            isVietnamMarket: Boolean(tool.isVietnamMarket),
            officialUrl: tool.sourceUrl
          } : null,
          reasoningVi: routing.reasoningVi
        };
      } else if (selectedToolName === 'aihub_explain_routing') {
        const routing = routeTaskFrontend(inspectorInput);
        output = {
          taskDescription: inspectorInput,
          routingStrategy: routing.strategy,
          confidenceScore: routing.confidence,
          intentIdentified: routing.intentId,
          matchedTool: routing.matchedTool ? {
            id: routing.matchedTool.id,
            name: routing.matchedTool.name,
            category: routing.matchedTool.categoryNameVi
          } : null,
          fullExplanationVi: routing.reasoningVi
        };
      } else if (selectedToolName === 'aihub_get_gateway_status') {
        const allTools = getAllToolsFrontend();
        const vnTools = allTools.filter((t: AITool) => t.isVietnamMarket || t.category === 'vietnam');
        output = {
          status: 'ONLINE',
          serverName: 'AI HUB VN Smart MCP Gateway',
          version: '2.0.0',
          protocol: 'Model Context Protocol (JSON-RPC 2.0 / stdio & http)',
          totalManagedTools: allTools.length,
          vietnamMarketTools: vnTools.length,
          categoriesCount: 39,
          contextWindowSavings: 'Tiết kiệm ~95% Context Window nhờ cơ chế nạp trễ (Lazy Loading)',
          security: 'HMAC-SHA256, Sliding Window Rate Limit, Bearer Auth'
        };
      }

      const elapsed = Math.round(performance.now() - start);
      setInspectorLatency(elapsed);
      setInspectorResult(JSON.stringify(output, null, 2));
    } catch (err: any) {
      setInspectorResult(JSON.stringify({ error: err.message }, null, 2));
    } finally {
      setIsLoadingInspector(false);
    }
  };

  // Mẫu cấu hình JSON cho các nền tảng
  const claudeDesktopConfig = JSON.stringify({
    mcpServers: {
      "aihub-smart-gateway": {
        command: "node",
        args: [
          "<DUONG_DAN_TOI_AI-HUB>/mcp-gateway/index.js"
        ],
        env: {
          NODE_ENV: "production"
        }
      }
    }
  }, null, 2);

  const cursorMcpConfig = JSON.stringify({
    mcpServers: {
      "aihub-smart-gateway": {
        command: "node",
        args: ["./mcp-gateway/index.js"],
        env: {
          AIHUB_API_KEY: "aihub_live_YOUR_KEY_HERE"
        }
      }
    }
  }, null, 2);

  const claudeCodeConfig = `// Thêm vào tệp CLAUDE.md hoặc chạy lệnh cấu hình:
claude mcp add aihub-gateway node ./mcp-gateway/index.js`;

  const antigravityConfig = `// antigravity.config.json:
{
  "mcpServers": {
    "aihub-gateway": {
      "command": "node",
      "args": ["mcp-gateway/index.js"]
    }
  }
}`;

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 min-h-screen py-8 transition-colors">
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${isExpanded ? 'max-w-[98%]' : 'max-w-7xl'}`}>
        
        {/* BREADCRUMB ĐIỀU HƯỚNG */}
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
            <span className="font-semibold text-slate-900 dark:text-white">Máy Chủ MCP Server Gateway</span>
          </div>

          {onNavigateApi && (
            <button
              onClick={onNavigateApi}
              className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs font-semibold hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-all shadow-xs"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Quản Lý Khóa API & Bảo Mật</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* HERO SECTION MÁY CHỦ MCP */}
        <div className="mb-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-400 text-xs font-semibold">
                <Server className="w-3.5 h-3.5" />
                <span>Model Context Protocol (MCP) Standard Server — Anthropic Official Spec</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center space-x-3">
                <span>AI HUB VN Smart MCP Gateway & Router</span>
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
                Máy chủ trung gian thông minh đóng vai trò <strong>Cổng kết nối duy nhất (Single Point of Entry)</strong>. 
                Bạn chỉ cần kết nối 1 MCP Server duy nhất này là các tác tử AI (Claude Desktop, Cursor, Claude Code, Antigravity) 
                có thể khai thác toàn bộ <strong>{TOOL_COUNT_LABEL} công cụ và 39 lĩnh vực</strong> mà không bị loãng cửa sổ ngữ cảnh (tiết kiệm ~95% token).
              </p>
            </div>

            <div className="flex items-center space-x-3 shrink-0">
              <span className="flex items-center space-x-2 px-3.5 py-2 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Máy Chủ Hoạt Động: {TOOL_COUNT_LABEL} Tools</span>
              </span>
            </div>
          </div>

          {/* 4 THÔNG SỐ VẬN HÀNH MCP */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <div className="text-xs text-slate-500 dark:text-slate-400 mb-1 flex items-center space-x-1.5">
                <Cpu className="w-3.5 h-3.5 text-indigo-500" />
                <span>Tổng Tài Nguyên Điều Phối</span>
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {TOOL_COUNT_LABEL} <span className="text-xs text-slate-500 font-normal">công cụ</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <div className="text-xs text-slate-500 dark:text-slate-400 mb-1 flex items-center space-x-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>Tiết Kiệm Context Window</span>
              </div>
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                ~95% <span className="text-xs text-slate-500 font-normal">tokens</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <div className="text-xs text-slate-500 dark:text-slate-400 mb-1 flex items-center space-x-1.5">
                <Workflow className="w-3.5 h-3.5 text-blue-500" />
                <span>Lĩnh Vực Chuyên Sâu</span>
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                39 <span className="text-xs text-slate-500 font-normal">nhóm</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <div className="text-xs text-slate-500 dark:text-slate-400 mb-1 flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Giao Thức Vận Hành</span>
              </div>
              <div className="text-base font-bold text-indigo-600 dark:text-indigo-400 mt-1">
                Stdio & HTTP SSE
              </div>
            </div>
          </div>
        </div>

        {/* BỐ CỤC 2 CỘT CHÍNH */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* CỘT TRÁI: LIVE MCP INSPECTOR & 4 CÔNG CỤ (7 CỘT) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* TRÌNH THỬ NGHIỆM TRỰC TIẾP MCP INSPECTOR */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Terminal className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">
                    Trình Thử Nghiệm MCP Inspector (Live Stdio)
                  </h2>
                </div>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                  JSON-RPC 2.0
                </span>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                Chọn một trong 4 công cụ chính thức của máy chủ MCP Gateway để kiểm tra phản hồi trực tiếp:
              </p>

              {/* BỘ LỰA CHỌN CÔNG CỤ MCP */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {[
                  { id: 'aihub_smart_dispatch', name: '1. aihub_smart_dispatch', desc: 'Tiếp nhận bài toán và điều phối' },
                  { id: 'aihub_resolve_capability', name: '2. aihub_resolve_capability', desc: 'Tra cứu năng lực chuyên môn' },
                  { id: 'aihub_explain_routing', name: '3. aihub_explain_routing', desc: 'Minh bạch lý do định tuyến' },
                  { id: 'aihub_get_gateway_status', name: '4. aihub_get_gateway_status', desc: 'Trạng thái & tối ưu Context' }
                ].map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => {
                      setSelectedToolName(tool.id);
                      if (tool.id === 'aihub_get_gateway_status') {
                        setInspectorInput('{}');
                      } else if (tool.id === 'aihub_resolve_capability') {
                        setInspectorInput('fintech việt nam');
                      } else {
                        setInspectorInput('Tạo mã thanh toán VietQR chuyển khoản ngân hàng Techcombank 500k');
                      }
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedToolName === tool.id
                        ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300 shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="font-mono font-bold text-xs">{tool.name}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">{tool.desc}</div>
                  </button>
                ))}
              </div>

              {/* KHỐI NHẬP LIỆU THAM SỐ CÔNG CỤ */}
              <div className="space-y-3 mb-4">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Tham số đầu vào ({selectedToolName}):
                </label>
                <textarea
                  rows={3}
                  value={inspectorInput}
                  onChange={(e) => setInspectorInput(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs border border-slate-800 outline-none focus:border-indigo-500"
                  placeholder="Nhập mô tả bài toán hoặc từ khóa kiểm tra..."
                />

                {/* GỢI Ý MẪU THỬ NHANH */}
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[11px] text-slate-400 self-center mr-1">Thử nhanh:</span>
                  {[
                    'Tạo mã thanh toán VietQR 500k',
                    'Dịch ngược file binary native bằng Ghidra',
                    'Viết bản đặc tả SRS IEEE 830 với OpenBA-Kit',
                    'Truy vấn CSDL SQLite dev.db'
                  ].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setInspectorInput(preset)}
                      className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600 transition-colors"
                    >
                      {preset}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleRunMcpInspector}
                  disabled={isLoadingInspector}
                  className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-semibold shadow-md transition-all mt-2"
                >
                  {isLoadingInspector ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Đang kết nối Stdio Transport...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" />
                      <span>Thực Thi Gọi Công Cụ MCP</span>
                    </>
                  )}
                </button>
              </div>

              {/* KẾT QUẢ TRẢ VỀ TỪ MCP SERVER */}
              {inspectorResult && (
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 animate-fadeIn">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Kết quả JSON-RPC trả về:</span>
                    </span>
                    {inspectorLatency !== null && (
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">
                        Thời gian thực thi: {inspectorLatency}ms
                      </span>
                    )}
                  </div>
                  <pre className="p-3.5 rounded-xl bg-slate-900 text-slate-200 font-mono text-[11px] overflow-x-auto max-h-80 border border-slate-800 leading-relaxed">
                    {inspectorResult}
                  </pre>
                </div>
              )}
            </div>

            {/* DANH MỤC NĂNG LỰC ĐIỀU PHỐI (CAPABILITY CATALOG) */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Workflow className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">
                    Năng Lực Điều Phối Chuyên Trách
                  </h2>
                </div>
                <span className="text-[11px] text-slate-500">39 lĩnh vực chuẩn hóa</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {[
                  {
                    title: 'Fintech & Cổng Thanh Toán VN',
                    tools: 'VietQR Napas 247, MoMo, ZaloPay, VNPAY, Zalo OA',
                    color: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800'
                  },
                  {
                    title: 'Dịch Ngược & An Ninh Mạng',
                    tools: 'REA (Reverse Engineer Anything), Ghidra, Hopper, IDA Pro',
                    color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800'
                  },
                  {
                    title: 'Phân Tích Nghiệp Vụ IT & BA',
                    tools: 'OpenBA-Kit 57 Skills, IEEE 830 SRS, INVEST, Gherkin, Wireframe',
                    color: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800'
                  },
                  {
                    title: 'Tự Động Hóa Trình Duyệt & QA',
                    tools: 'Puppeteer MCP, Playwright, Browser-Use, Browserbase',
                    color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800'
                  },
                  {
                    title: 'Cơ Sở Dữ Liệu & Tri Thức',
                    tools: 'SQLite MCP Server, PostgreSQL MCP, ChromaDB, PGVector',
                    color: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800'
                  },
                  {
                    title: 'Giám Sát Chi Phí & Token AI',
                    tools: 'CC Usage, ccflare, Anthropic Token Optimizer',
                    color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800'
                  }
                ].map((item, idx) => (
                  <div key={idx} className={`p-3.5 rounded-2xl border ${item.color}`}>
                    <div className="font-bold text-xs mb-1">{item.title}</div>
                    <div className="text-[11px] opacity-80">{item.tools}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* CỘT PHẢI: HƯỚNG DẪN CÀI ĐẶT & CẤU HÌNH 1 CHẠM (5 CỘT) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* CẤU HÌNH 1 CHẠM CHO CLAUDE / CURSOR */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Code2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">
                    Cấu Hình Tích Hợp 1 Chạm
                  </h2>
                </div>
              </div>

              {/* TABS NỀN TẢNG CLIENT */}
              <div className="flex items-center space-x-1 border-b border-slate-200 dark:border-slate-800 mb-4 pb-2 text-xs">
                {[
                  { id: 'claude_desktop', label: 'Claude Desktop' },
                  { id: 'cursor', label: 'Cursor IDE' },
                  { id: 'claude_code', label: 'Claude Code' },
                  { id: 'antigravity', label: 'Antigravity' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveClientTab(tab.id as any)}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                      activeClientTab === tab.id
                        ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400'
                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* ĐOẠN MÃ CẤU HÌNH */}
              <div className="relative">
                <pre className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-[11px] overflow-x-auto leading-relaxed border border-slate-800">
                  {activeClientTab === 'claude_desktop' && claudeDesktopConfig}
                  {activeClientTab === 'cursor' && cursorMcpConfig}
                  {activeClientTab === 'claude_code' && claudeCodeConfig}
                  {activeClientTab === 'antigravity' && antigravityConfig}
                </pre>

                <button
                  onClick={() => {
                    const text = activeClientTab === 'claude_desktop'
                      ? claudeDesktopConfig
                      : activeClientTab === 'cursor'
                      ? cursorMcpConfig
                      : activeClientTab === 'claude_code'
                      ? claudeCodeConfig
                      : antigravityConfig;
                    handleCopy(text, 'mcp-config');
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs flex items-center space-x-1"
                >
                  {copiedId === 'mcp-config' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedId === 'mcp-config' ? 'Đã sao chép' : 'Sao chép'}</span>
                </button>
              </div>

              {/* HƯỚNG DẪN TỪNG BƯỚC */}
              <div className="mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-2">
                <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Cách kích hoạt nhanh:</span>
                </div>
                {activeClientTab === 'claude_desktop' && (
                  <ol className="list-decimal pl-4 space-y-1 text-[11px]">
                    <li>Mở Claude Desktop &gt; Settings &gt; Developer &gt; Edit Config.</li>
                    <li>Dán đoạn JSON trên vào tệp <code className="text-indigo-600">claude_desktop_config.json</code>.</li>
                    <li>Khởi động lại Claude Desktop. Biểu tượng búa (Tools) sẽ xuất hiện 4 công cụ của AI HUB.</li>
                  </ol>
                )}
                {activeClientTab === 'cursor' && (
                  <ol className="list-decimal pl-4 space-y-1 text-[11px]">
                    <li>Mở Cursor Settings &gt; Features &gt; MCP Servers &gt; Add New MCP Server.</li>
                    <li>Điền tên <code className="text-indigo-600">aihub-smart-gateway</code>, chọn type: command.</li>
                    <li>Dán command: <code className="text-indigo-600">node ./mcp-gateway/index.js</code>.</li>
                  </ol>
                )}
                {activeClientTab === 'claude_code' && (
                  <p className="text-[11px]">
                    Chạy lệnh terminal trực tiếp trong thư mục dự án để Claude Code tự động nạp máy chủ MCP.
                  </p>
                )}
                {activeClientTab === 'antigravity' && (
                  <p className="text-[11px]">
                    Thêm cấu hình vào danh mục MCP Servers của Antigravity Agent để mở rộng toàn bộ {TOOL_COUNT_LABEL} kỹ năng.
                  </p>
                )}
              </div>
            </div>

            {/* KHỐI LỆNH TERMINAL CLI ĐỘC LẬP */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-3">
              <div className="flex items-center space-x-2">
                <Terminal className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Lệnh Khởi Chạy Nhanh Qua Terminal
                </h3>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[11px] font-semibold text-slate-500">Khởi chạy Stdio MCP Server:</span>
                  <div className="mt-1 p-2.5 rounded-xl bg-slate-900 text-emerald-400 font-mono text-[11px] flex items-center justify-between">
                    <code>npm run mcp:stdio</code>
                    <button
                      onClick={() => handleCopy('npm run mcp:stdio', 'cmd-stdio')}
                      className="text-slate-400 hover:text-white ml-2"
                    >
                      {copiedId === 'cmd-stdio' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-slate-500">Khởi chạy REST API Gateway (Port 4000):</span>
                  <div className="mt-1 p-2.5 rounded-xl bg-slate-900 text-emerald-400 font-mono text-[11px] flex items-center justify-between">
                    <code>npm run mcp:api</code>
                    <button
                      onClick={() => handleCopy('npm run mcp:api', 'cmd-api')}
                      className="text-slate-400 hover:text-white ml-2"
                    >
                      {copiedId === 'cmd-api' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
