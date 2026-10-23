/**
 * AI HUB VN — Client Adapter cho MCP Gateway & Router trên giao diện web
 * 
 * Cung cấp giải thuật đối soát ý định (Intent Matching) và điều phối công cụ (Dispatch)
 * hoạt động mượt mà trên trình duyệt web cả khi offline và khi kết nối máy chủ backend.
 */

import { INITIAL_TOOLS } from '../data/mockTools';
import { AITool } from '../types';
import { findBestIntent, CoreIntent } from '../../mcp-gateway/intent-matcher.js';
import coreIntents from '../../mcp-gateway/core-intents.json';

const CORE_INTENTS = coreIntents as CoreIntent[];

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
  const allTools = INITIAL_TOOLS;

  // Ý định chuyên biệt: dùng chung bảng và bộ so khớp với máy chủ MCP (mcp-gateway/core-intents.json)
  const bestIntent = findBestIntent(normalized, CORE_INTENTS);
  const intentTool = bestIntent ? allTools.find(t => t.id === bestIntent.intent.targetToolId) : undefined;
  if (bestIntent && intentTool) {
    return {
      strategy: 'SPECIALIZED_INTENT_RULE',
      matchedTool: intentTool,
      confidence: Math.min(0.99, 0.75 + bestIntent.score / 100),
      intentId: bestIntent.intent.intentId,
      reasoningVi: `Đã nhận diện ý định thuộc nhóm [${intentTool.categoryNameVi}] và chọn "${intentTool.name}" do khớp sát nhất các từ khóa nghiệp vụ.`
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
