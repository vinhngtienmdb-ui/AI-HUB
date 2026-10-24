import type { CoreIntent } from './intent-matcher.js';

export const GATEWAY_NAME: string;
export const GATEWAY_VERSION: string;
export const CLARIFIER_TOOL_ID: string;
export const MIN_KEYWORD_COVERAGE: number;

export interface ToolLike {
  id: string;
  name: string;
  [key: string]: any;
}

export interface ToolSuggestion {
  id: string;
  name: string;
  categoryNameVi?: string;
  officialUrl?: string;
}

export interface RoutingResult<T extends ToolLike = ToolLike> {
  success: boolean;
  strategy: 'EMPTY_QUERY' | 'DIRECT_INTENT_MATCH' | 'KEYWORD_MATCH' | 'NO_CONFIDENT_MATCH';
  confidence: number;
  intentId: string | null;
  matchedTool: T | null;
  suggestions: ToolSuggestion[];
  reasoningVi: string;
  error?: string;
}

export function tokenize(text: string): string[];
export function scoreTools<T extends ToolLike>(query: string, tools: T[]): Array<{
  tool: T; score: number; coverage: number; matchedWords: string[]; hitsNameOrTag: boolean;
}>;
export function routeQuery<T extends ToolLike>(query: string, tools: T[], intents: CoreIntent[]): RoutingResult<T>;
export function buildDispatchResult(routing: RoutingResult, toolCount: number): Record<string, any>;
export function buildCapabilityResult(query: string, routing: RoutingResult): Record<string, any>;
export function buildExplanationResult(query: string, routing: RoutingResult): Record<string, any>;
export function buildStatusResult(tools: ToolLike[], intents: CoreIntent[], protocol: string): Record<string, any>;
