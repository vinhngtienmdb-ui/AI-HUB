/**
 * AI HUB VN — Client Adapter cho MCP Gateway & Router trên giao diện web
 * 
 * Cung cấp giải thuật đối soát ý định (Intent Matching) và điều phối công cụ (Dispatch)
 * hoạt động mượt mà trên trình duyệt web cả khi offline và khi kết nối máy chủ backend.
 */

import { INITIAL_TOOLS } from '../data/mockTools';
import { AITool } from '../types';

export function getAllToolsFrontend(): AITool[] {
  return INITIAL_TOOLS;
}

export interface RoutingFrontendResult {
  strategy: string;
  matchedTool: AITool | null;
  confidence: number;
  intentId: string;
  reasoningVi: string;
}

export function routeTaskFrontend(query: string): RoutingFrontendResult {
  if (!query || typeof query !== 'string') {
    return {
      strategy: 'FALLBACK',
      matchedTool: null,
      confidence: 0,
      intentId: 'empty_query',
      reasoningVi: 'Truy vấn rỗng hoặc không hợp lệ.'
    };
  }

  const normalized = query.toLowerCase().trim();
  // So khớp nguyên từ cho từ khóa ngắn, tránh nhầm "rea" trong "react" hay "ba" trong "database"
  const hasWord = (text: string, word: string) =>
    new RegExp(`(^|[^\\p{L}\\p{N}])${word}($|[^\\p{L}\\p{N}])`, 'u').test(text);
  const allTools = INITIAL_TOOLS;

  // 0. Ý định Quy trình phát triển phần mềm chuẩn VibeCode (dev-lifecycle)
  if (normalized.includes('vibecode') || normalized.includes('vibecoding') || normalized.includes('dev-lifecycle') || normalized.includes('13 giai đoạn') || normalized.includes('quy trình phần mềm')) {
    const vibeTool = allTools.find(t => t.id === 'vibecoding-skill-dev-lifecycle') || allTools[0];
    return {
      strategy: 'SPECIALIZED_INTENT_RULE',
      matchedTool: vibeTool,
      confidence: 0.99,
      intentId: 'vibecoding_dev_lifecycle',
      reasoningVi: 'Đã nhận diện ý định áp dụng quy trình phát triển phần mềm chuẩn VibeCode 13 giai đoạn (dev-lifecycle).'
    };
  }

  // 0.1. Ý định Tìm kiếm và cài đặt Agent Skills (Find Skills)
  if (normalized.includes('find skill') || normalized.includes('tìm skill') || normalized.includes('skills.sh') || normalized.includes('cài skill')) {
    const findSkillTool = allTools.find(t => t.id === 'vercel-labs-find-skills') || allTools[0];
    return {
      strategy: 'SPECIALIZED_INTENT_RULE',
      matchedTool: findSkillTool,
      confidence: 0.98,
      intentId: 'find_agent_skills',
      reasoningVi: 'Đã nhận diện ý định tìm kiếm, khám phá và cài đặt kỹ năng tác tử (Agent Skills) từ Vercel Labs qua kho skills.sh.'
    };
  }

  // 0.1. Ý định Quản trị & Điều phối lực lượng tác tử (Paperclip Control Plane)
  if (normalized.includes('paperclip') || normalized.includes('quản lý agent') || normalized.includes('quản trị agent') || normalized.includes('điều phối agent') || normalized.includes('control plane') || normalized.includes('agent workforce')) {
    const paperclipTool = allTools.find(t => t.id === 'paperclipai-paperclip') || allTools[0];
    return {
      strategy: 'SPECIALIZED_INTENT_RULE',
      matchedTool: paperclipTool,
      confidence: 0.98,
      intentId: 'agent_workforce_paperclip',
      reasoningVi: 'Đã nhận diện ý định quản trị tập trung và điều phối đội ngũ tác tử AI với nền tảng Paperclip Control Plane.'
    };
  }

  // 0.2. Ý định Tìm việc & Tự động hóa ứng tuyển (AI Job Search)
  if (normalized.includes('job search') || normalized.includes('tìm việc') || normalized.includes('săn việc') || normalized.includes('xin việc') || normalized.includes('viết cv') || normalized.includes('ats resume') || normalized.includes('cover letter')) {
    const jobTool = allTools.find(t => t.id === 'mads-lorentzen-ai-job-search') || allTools[0];
    return {
      strategy: 'SPECIALIZED_INTENT_RULE',
      matchedTool: jobTool,
      confidence: 0.98,
      intentId: 'ai_job_search_framework',
      reasoningVi: 'Đã nhận diện ý định tự động hóa tìm việc, viết CV may đo và luyện phỏng vấn với AI Job Search (Claude Code).'
    };
  }

  // 1. Phân tích ý định Fintech & Thanh toán Việt Nam
  if (normalized.includes('vietqr') || normalized.includes('napas') || normalized.includes('chuyển khoản')) {
    const vietqrTool = allTools.find(t => t.id === 'vietqr-generator-napas247-mcp') || allTools[0];
    return {
      strategy: 'SPECIALIZED_INTENT_RULE',
      matchedTool: vietqrTool,
      confidence: 0.98,
      intentId: 'fintech_vietnam_vietqr',
      reasoningVi: 'Đã nhận diện ý định thanh toán chuyển khoản ngân hàng qua chuẩn VietQR Napas 247 Việt Nam.'
    };
  }

  if (normalized.includes('momo') || normalized.includes('ví momo')) {
    const momoTool = allTools.find(t => t.id === 'vn-mcp-momo-payment') || allTools[0];
    return {
      strategy: 'SPECIALIZED_INTENT_RULE',
      matchedTool: momoTool,
      confidence: 0.96,
      intentId: 'fintech_vietnam_momo',
      reasoningVi: 'Đã nhận diện ý định tích hợp và tạo cổng thanh toán qua Ví điện tử MoMo.'
    };
  }

  // 2. Ý định Dịch ngược mã nguồn (Reverse Engineering)
  if (normalized.includes('dịch ngược') || normalized.includes('binary') || normalized.includes('ghidra') || hasWord(normalized, 'rea')) {
    const reaTool = allTools.find(t => t.id === 'morluto-rea-reverse-engineer-anything') || allTools[0];
    return {
      strategy: 'SPECIALIZED_INTENT_RULE',
      matchedTool: reaTool,
      confidence: 0.95,
      intentId: 'cybersecurity_reverse_engineering',
      reasoningVi: 'Đã nhận diện ý định dịch ngược mã nguồn, phân tích binary native với công cụ REA.'
    };
  }

  // 3. Ý định Phân tích nghiệp vụ BA (OpenBA-Kit)
  if (hasWord(normalized, 'ba') || normalized.includes('business analyst') || normalized.includes('srs') || normalized.includes('invest') || normalized.includes('user story')) {
    const baTool = allTools.find(t => t.id === 'spmtitsolution-openba-kit-57-ai-skills') || allTools[0];
    return {
      strategy: 'SPECIALIZED_INTENT_RULE',
      matchedTool: baTool,
      confidence: 0.95,
      intentId: 'it_business_analyst',
      reasoningVi: 'Đã nhận diện nghiệp vụ phân tích kỹ thuật BA và bóc tách yêu cầu phần mềm với OpenBA-Kit 57 AI Skills.'
    };
  }

  // 4. Ý định Cơ sở dữ liệu (SQLite / Postgres)
  if (normalized.includes('sqlite') || normalized.includes('dev.db')) {
    const sqliteTool = allTools.find(t => t.id === 'sqlite-mcp-database-server') || allTools[0];
    return {
      strategy: 'SPECIALIZED_INTENT_RULE',
      matchedTool: sqliteTool,
      confidence: 0.94,
      intentId: 'database_sqlite',
      reasoningVi: 'Đã nhận diện nghiệp vụ truy vấn CSDL SQLite cục bộ bằng ngôn ngữ tự nhiên.'
    };
  }

  // Đối soát ngữ nghĩa toàn diện
  const tokens = normalized.split(/\s+/).filter(t => t.length > 1);
  let bestTool: AITool | null = null;
  let bestScore = 0;

  for (const tool of allTools) {
    let score = 0;
    const nameLower = tool.name.toLowerCase();
    const descLower = (tool.summaryVi || tool.purposeVi || '').toLowerCase();

    for (const tok of tokens) {
      if (nameLower.includes(tok)) score += 3;
      if (descLower.includes(tok)) score += 1;
      if (tool.featuresVi && tool.featuresVi.some((feat: string) => feat.toLowerCase().includes(tok))) score += 2;
    }

    if (score > bestScore) {
      bestScore = score;
      bestTool = tool;
    }
  }

  if (bestTool && bestScore >= 2) {
    return {
      strategy: 'SEMANTIC_KEYWORD_MATCH',
      matchedTool: bestTool,
      confidence: Math.min(0.92, 0.5 + bestScore * 0.05),
      intentId: 'general_capability',
      reasoningVi: `Đã đối soát từ khóa và chọn công cụ ${bestTool.name} có độ tương đồng cao nhất.`
    };
  }

  return {
    strategy: 'FALLBACK',
    matchedTool: allTools[0],
    confidence: 0.5,
    intentId: 'general_fallback',
    reasoningVi: 'Đã chuyển giao bài toán đến trợ lý lập trình chuyên sâu.'
  };
}

export function dispatchTaskFrontend(
  routing: RoutingFrontendResult,
  taskDescription: string,
  parameters: Record<string, any> = {}
) {
  const tool = routing.matchedTool || INITIAL_TOOLS[0];
  const sampleCli = tool.configs && tool.configs.length > 0 && tool.configs[0].cliCommand
    ? tool.configs[0].cliCommand
    : `npx @aihub/${tool.id} run`;

  return {
    status: 'DISPATCH_SUCCESS',
    gateway: {
      name: 'AI HUB VN Smart MCP Gateway',
      version: '2.0.0',
      protocol: 'Model Context Protocol (JSON-RPC 2.0 / stdio & http)'
    },
    requestedTask: taskDescription,
    matchedIntent: routing.intentId,
    confidence: routing.confidence,
    routingReasoningVi: routing.reasoningVi,
    dispatchedTool: {
      id: tool.id,
      name: tool.name,
      toolType: tool.toolType,
      category: tool.category,
      categoryNameVi: tool.categoryNameVi,
      isVietnamMarket: Boolean(tool.isVietnamMarket),
      officialSource: tool.sourceUrl,
      descriptionVi: tool.summaryVi || tool.purposeVi
    },
    executionPlan: {
      quickCliCommand: sampleCli,
      recommendedParameters: parameters,
      contextTokenSavings: 'Đã nạp trễ (Lazy Loaded) chỉ 1 công cụ cần thiết, tiết kiệm ~95% token context window'
    }
  };
}
