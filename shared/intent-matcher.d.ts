export interface CoreIntent {
  intentId: string;
  targetToolId: string;
  keywords: string[];
  priority: number;
}

export function matchesKeyword(text: string, keyword: string): boolean;
export function findBestIntent(query: string, intents: CoreIntent[]): { intent: CoreIntent; score: number } | null;
