/**
 * AI HUB VN — Client Adapter cho MCP Gateway trên giao diện web.
 *
 * Dùng chung thuật toán định tuyến và cấu trúc kết quả với máy chủ MCP (mcp-gateway/gateway-core.js),
 * nên trang "Máy chủ MCP" chạy đúng logic của máy chủ ngay trên trình duyệt.
 */

import { INITIAL_TOOLS } from '../data/mockTools';
import { AITool } from '../types';
import { CoreIntent } from '../../mcp-gateway/intent-matcher.js';
import {
  routeQuery,
  buildDispatchResult,
  buildCapabilityResult,
  buildExplanationResult,
  buildStatusResult,
  RoutingResult
} from '../../mcp-gateway/gateway-core.js';
import coreIntents from '../../mcp-gateway/core-intents.json';

export const CORE_INTENTS = coreIntents as CoreIntent[];

// Chỉ định tuyến tới công cụ đang hiển thị (bỏ qua công cụ bị ẩn do không xác minh được hoặc trùng lặp)
const PUBLISHED_TOOLS = INITIAL_TOOLS.filter(t => t.status === 'published' || !t.status);

export function getAllToolsFrontend(): AITool[] {
  return PUBLISHED_TOOLS;
}

export function routeTaskFrontend(query: string): RoutingResult<AITool> {
  return routeQuery(query, PUBLISHED_TOOLS, CORE_INTENTS);
}

/** Chạy một công cụ MCP của gateway trên trình duyệt, trả cùng cấu trúc kết quả như máy chủ. */
export function runGatewayToolFrontend(toolName: string, input: string): Record<string, any> {
  if (toolName === 'aihub_get_gateway_status') {
    return buildStatusResult(PUBLISHED_TOOLS, CORE_INTENTS, 'Chạy trên trình duyệt (cùng thuật toán với máy chủ stdio)');
  }
  const routing = routeTaskFrontend(input);
  if (toolName === 'aihub_resolve_capability') return buildCapabilityResult(input, routing);
  if (toolName === 'aihub_explain_routing') return buildExplanationResult(input, routing);
  return buildDispatchResult(routing, PUBLISHED_TOOLS.length);
}
