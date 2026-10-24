/**
 * Lõi định tuyến và dựng kết quả của AI HUB VN MCP Gateway, dùng chung cho máy chủ MCP
 * (backend/index.js, api-server.js) và giao diện web (frontend/src/lib/mcpClient.ts).
 * Không phụ thuộc API Node.js để chạy được trên trình duyệt, nên cùng một câu hỏi cho cùng một kết quả ở cả hai nơi.
 */

import { findBestIntent } from './intent-matcher.js';

export const GATEWAY_NAME = 'AI HUB VN Smart MCP Gateway';
export const GATEWAY_VERSION = '2.1.0';

// Công cụ hỗ trợ làm rõ yêu cầu khi không định tuyến được với độ tin cậy đủ cao
export const CLARIFIER_TOOL_ID = 'agent-1013';

// Ngưỡng định tuyến theo từ khóa: các từ khớp phải chiếm ít nhất một nửa "lượng thông tin" của câu hỏi
// (từ hiếm như "kubernetes", "logo" nặng hơn từ phổ biến như "thiết", "kế"),
// và ít nhất một từ khớp nằm ở tên hoặc nhãn của công cụ.
export const MIN_KEYWORD_COVERAGE = 0.5;

// Từ chức năng và động từ chung chung, không mang thông tin để chọn công cụ
const STOPWORDS = new Set([
  'và', 'của', 'cho', 'các', 'những', 'một', 'là', 'có', 'được', 'với', 'trong', 'để', 'về', 'theo',
  'khi', 'từ', 'này', 'đó', 'thì', 'mà', 'như', 'bằng', 'tại', 'trên', 'dưới', 'ra', 'vào', 'lên',
  'đến', 'tới', 'hay', 'hoặc', 'nhưng', 'rất', 'cũng', 'đã', 'đang', 'sẽ', 'không', 'chưa', 'tôi',
  'bạn', 'mình', 'chúng', 'ta', 'giúp', 'hãy', 'cần', 'muốn', 'làm', 'tạo', 'viết', 'cách', 'bài',
  'nào', 'gì', 'sao', 'xin', 'nhé', 'ạ', 'thế', 'vậy', 'nên', 'việc', 'cái', 'con',
  'the', 'an', 'of', 'to', 'for', 'and', 'or', 'in', 'on', 'with', 'by', 'is', 'are', 'be', 'how',
  'what', 'me', 'my', 'you', 'please', 'help', 'create', 'make', 'write', 'use', 'using', 'need', 'want'
]);

const WORD_SPLIT = /[^\p{L}\p{N}]+/u;

/** Tách câu thành các từ có nghĩa (chữ thường, bỏ từ chức năng). */
export function tokenize(text) {
  return String(text || '')
    .toLowerCase()
    .split(WORD_SPLIT)
    .filter(w => w.length >= 2 && !STOPWORDS.has(w));
}

const toolIndexCache = new WeakMap();

// Chỉ mục từ của một công cụ: tên (trọng số 3), nhãn (2), mô tả và tính năng (1)
function indexTool(tool) {
  let index = toolIndexCache.get(tool);
  if (index) return index;
  const fields = [
    [tool.name, 3],
    [(tool.tags || []).join(' '), 2],
    [`${tool.summaryVi || ''} ${tool.purposeVi || ''} ${(tool.featuresVi || []).join(' ')}`, 1]
  ];
  const weights = new Map();
  const phrases = [];
  for (const [text, weight] of fields) {
    const words = String(text || '').toLowerCase().split(WORD_SPLIT).filter(Boolean);
    phrases.push({ text: ` ${words.join(' ')} `, weight });
    for (const word of words) {
      if ((weights.get(word) || 0) < weight) weights.set(word, weight);
    }
  }
  index = { weights, phrases };
  toolIndexCache.set(tool, index);
  return index;
}

// Trọng số trường cao nhất chứa từ (hoặc cụm hai từ) trong công cụ, 0 nếu không chứa
function termWeight(index, term) {
  if (!term.includes(' ')) return index.weights.get(term) || 0;
  let best = 0;
  for (const { text, weight } of index.phrases) {
    if (weight > best && text.includes(` ${term} `)) best = weight;
  }
  return best;
}

const documentFrequencyCache = new WeakMap();

// Số công cụ chứa mỗi từ đơn, tính một lần cho mỗi danh sách công cụ
function documentFrequency(tools) {
  let df = documentFrequencyCache.get(tools);
  if (df) return df;
  df = new Map();
  for (const tool of tools) {
    for (const word of indexTool(tool).weights.keys()) df.set(word, (df.get(word) || 0) + 1);
  }
  documentFrequencyCache.set(tools, df);
  return df;
}

/**
 * Tách câu hỏi thành các đơn vị so khớp. Tiếng Việt ghép từ bằng nhiều âm tiết ("thiết kế", "tài liệu"),
 * nên hai từ liền nhau xuất hiện thành cụm trong ít nhất 2 công cụ được coi là một đơn vị:
 * công cụ chỉ chứa riêng "kế" (trong "kế toán") không được tính là khớp "thiết kế".
 */
function buildTerms(query, tools) {
  const tokens = tokenize(query);
  const df = documentFrequency(tools);
  const terms = [];
  for (let i = 0; i < tokens.length; i++) {
    if (i < tokens.length - 1) {
      const pair = `${tokens[i]} ${tokens[i + 1]}`;
      let pairDf = 0;
      for (const tool of tools) {
        if (indexTool(tool).phrases.some(p => p.text.includes(` ${pair} `))) pairDf++;
      }
      if (pairDf >= 2) {
        terms.push({ term: pair, df: pairDf });
        i++;
        continue;
      }
    }
    terms.push({ term: tokens[i], df: df.get(tokens[i]) || 0 });
  }
  const unique = new Map(terms.map(t => [t.term, t]));
  return [...unique.values()].map(t => ({ ...t, idf: Math.log(1 + tools.length / (1 + t.df)) }));
}

/**
 * Chấm điểm toàn bộ công cụ theo từ khóa, khớp nguyên từ hoặc nguyên cụm.
 * Mỗi đơn vị khớp được cộng (trọng số trường chứa nó × độ hiếm). Độ phủ (coverage) là tỉ lệ độ hiếm
 * của các đơn vị khớp trên tổng độ hiếm của câu hỏi; từ không có trong kho được tính là hiếm nhất.
 * @returns {Array<{tool: object, score: number, coverage: number, matchedWords: string[], hitsNameOrTag: boolean}>}
 *   xếp giảm dần theo điểm
 */
export function scoreTools(query, tools) {
  const terms = buildTerms(query, tools);
  if (terms.length === 0) return [];
  const totalIdf = terms.reduce((sum, t) => sum + t.idf, 0);

  const candidates = [];
  for (const tool of tools) {
    const index = indexTool(tool);
    let score = 0;
    let matchedIdf = 0;
    let hitsNameOrTag = false;
    const matchedWords = [];
    for (const { term, idf } of terms) {
      const weight = termWeight(index, term);
      if (!weight) continue;
      score += weight * idf;
      matchedIdf += idf;
      if (weight >= 2) hitsNameOrTag = true;
      matchedWords.push(term);
    }
    if (score === 0) continue;
    candidates.push({ tool, score, coverage: matchedIdf / totalIdf, matchedWords, hitsNameOrTag });
  }
  return candidates.sort((a, b) => b.score - a.score || b.coverage - a.coverage);
}

const summarizeTool = (tool) => ({
  id: tool.id,
  name: tool.name,
  categoryNameVi: tool.categoryNameVi,
  officialUrl: tool.sourceUrl
});

/**
 * Định tuyến câu hỏi: ưu tiên bảng ý định chuyên biệt, sau đó khớp từ khóa có ngưỡng.
 * Không đủ tin cậy thì trả NO_CONFIDENT_MATCH kèm gợi ý, không tự chọn một công cụ.
 */
export function routeQuery(query, tools, intents) {
  if (!query || typeof query !== 'string' || !query.trim()) {
    return {
      success: false,
      strategy: 'EMPTY_QUERY',
      error: 'Vui lòng cung cấp mô tả bài toán cần thực thi.',
      matchedTool: null,
      confidence: 0,
      intentId: null,
      suggestions: [],
      reasoningVi: 'Truy vấn rỗng hoặc không hợp lệ.'
    };
  }

  const toolMap = new Map(tools.map(t => [t.id, t]));

  const bestIntent = findBestIntent(query, intents);
  const intentTool = bestIntent ? toolMap.get(bestIntent.intent.targetToolId) : undefined;
  if (bestIntent && intentTool) {
    return {
      success: true,
      strategy: 'DIRECT_INTENT_MATCH',
      confidence: Math.min(0.99, 0.75 + bestIntent.score / 100),
      intentId: bestIntent.intent.intentId,
      matchedTool: intentTool,
      suggestions: [],
      reasoningVi: `Câu hỏi khớp nhóm ý định "${bestIntent.intent.intentId}" trong bảng ý định chuyên biệt, công cụ được gán là "${intentTool.name}" [${intentTool.categoryNameVi}].`
    };
  }

  const candidates = scoreTools(query, tools);
  const best = candidates[0];
  if (best && best.hitsNameOrTag && best.coverage >= MIN_KEYWORD_COVERAGE) {
    return {
      success: true,
      strategy: 'KEYWORD_MATCH',
      confidence: Math.round(Math.min(0.85, 0.4 + 0.45 * best.coverage) * 100) / 100,
      intentId: 'keyword_match',
      matchedTool: best.tool,
      suggestions: candidates.slice(1, 4).map(c => summarizeTool(c.tool)),
      reasoningVi: `Không có nhóm ý định chuyên biệt phù hợp. Chọn "${best.tool.name}" vì khớp các từ khóa ${best.matchedWords.join(', ')} (độ phủ ${Math.round(best.coverage * 100)}% theo độ hiếm của từ).`
    };
  }

  const clarifier = toolMap.get(CLARIFIER_TOOL_ID);
  const suggestions = candidates.slice(0, 3).map(c => summarizeTool(c.tool));
  if (clarifier && !suggestions.some(s => s.id === clarifier.id)) suggestions.push(summarizeTool(clarifier));
  return {
    success: false,
    strategy: 'NO_CONFIDENT_MATCH',
    confidence: 0,
    intentId: null,
    matchedTool: null,
    suggestions,
    reasoningVi: candidates.length === 0
      ? 'Không công cụ nào trong kho khớp từ khóa của câu hỏi. Hãy mô tả cụ thể hơn (công nghệ, nghiệp vụ, tên công cụ).'
      : `Không đủ tin cậy để chọn một công cụ: công cụ gần nhất chỉ có độ phủ ${Math.round(candidates[0].coverage * 100)}% theo độ hiếm của từ. Các gợi ý bên dưới cần người dùng tự đánh giá.`
  };
}

/** Kết quả công cụ aihub_smart_dispatch. */
export function buildDispatchResult(routing, toolCount) {
  const routingInfo = {
    strategy: routing.strategy,
    confidence: Math.round(routing.confidence * 100) + '%',
    intentId: routing.intentId,
    reasoningVi: routing.reasoningVi
  };
  const tool = routing.matchedTool;
  if (!tool) {
    return {
      status: routing.strategy === 'EMPTY_QUERY' ? 'ROUTING_FAILED' : 'NO_CONFIDENT_MATCH',
      gateway: { name: GATEWAY_NAME, version: GATEWAY_VERSION },
      routing: routingInfo,
      message: routing.error || 'Không định tuyến được với độ tin cậy đủ cao.',
      suggestions: routing.suggestions || []
    };
  }

  const config = Array.isArray(tool.configs) && tool.configs.length > 0 ? tool.configs[0] : null;
  return {
    status: 'DISPATCH_SUCCESS',
    gateway: { name: GATEWAY_NAME, version: GATEWAY_VERSION },
    routing: routingInfo,
    dispatchedTool: {
      id: tool.id,
      name: tool.name,
      toolType: tool.toolType,
      typeNameVi: tool.typeNameVi,
      category: tool.category,
      categoryNameVi: tool.categoryNameVi,
      categories: tool.categories || [tool.category],
      isVietnamMarket: Boolean(tool.isVietnamMarket),
      authorName: tool.authorName,
      officialUrl: tool.sourceUrl
    },
    executionPlan: {
      summaryVi: tool.summaryVi,
      purposeVi: tool.purposeVi,
      // Chỉ trả lệnh có trong dữ liệu đã kiểm định; không có thì để null, xem installGuideVi
      quickCliCommand: config?.cliCommand || null,
      installGuideVi: tool.installGuideVi,
      usageGuideVi: tool.usageGuideVi,
      sampleJsonConfig: config?.jsonConfig || null
    },
    alternatives: routing.suggestions || [],
    contextNote: `Gateway chỉ trả về định nghĩa của công cụ được chọn thay vì toàn bộ ${toolCount.toLocaleString('vi-VN')} công cụ trong kho.`
  };
}

/** Kết quả công cụ aihub_resolve_capability. */
export function buildCapabilityResult(query, routing) {
  const tool = routing.matchedTool;
  return {
    query,
    supported: Boolean(tool),
    confidence: Math.round(routing.confidence * 100) + '%',
    recommendedTool: tool ? {
      id: tool.id,
      name: tool.name,
      categoryNameVi: tool.categoryNameVi,
      isVietnamMarket: Boolean(tool.isVietnamMarket),
      officialUrl: tool.sourceUrl
    } : null,
    suggestions: routing.suggestions || [],
    reasoningVi: routing.reasoningVi
  };
}

/** Kết quả công cụ aihub_explain_routing. */
export function buildExplanationResult(query, routing) {
  return {
    taskDescription: query,
    routingStrategy: routing.strategy,
    confidenceScore: routing.confidence,
    intentIdentified: routing.intentId,
    matchedTool: routing.matchedTool ? {
      id: routing.matchedTool.id,
      name: routing.matchedTool.name,
      category: routing.matchedTool.categoryNameVi
    } : null,
    suggestions: routing.suggestions || [],
    algorithmVi: `1) So khớp bảng ý định chuyên biệt (shared/core-intents.json). 2) Nếu không khớp: chấm điểm từ khóa nguyên từ trên tên, nhãn, mô tả công cụ, từ càng hiếm càng nặng; chỉ chọn khi độ phủ tối thiểu ${MIN_KEYWORD_COVERAGE * 100}% và có từ khớp ở tên hoặc nhãn. 3) Còn lại trả NO_CONFIDENT_MATCH kèm gợi ý.`,
    fullExplanationVi: routing.reasoningVi
  };
}

/** Kết quả công cụ aihub_get_gateway_status; mọi số liệu tính từ kho dữ liệu. */
export function buildStatusResult(tools, intents, protocol) {
  const toolMap = new Map(tools.map(t => [t.id, t]));
  return {
    status: 'ONLINE',
    serverName: GATEWAY_NAME,
    version: GATEWAY_VERSION,
    protocol,
    totalManagedTools: tools.length,
    vietnamMarketTools: tools.filter(t => t.isVietnamMarket || t.category === 'vietnam').length,
    categoriesCount: new Set(tools.map(t => t.category).filter(Boolean)).size,
    intentProfiles: intents.length,
    routingCapabilities: intents
      .filter(i => toolMap.has(i.targetToolId))
      .map(i => ({ intentId: i.intentId, toolId: i.targetToolId, toolName: toolMap.get(i.targetToolId).name }))
  };
}
