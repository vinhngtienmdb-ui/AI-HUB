/**
 * Bộ so khớp ý định dùng chung cho máy chủ MCP (mcp-gateway/smart-router.js) và giao diện web
 * (src/lib/mcpClient.ts). Bảng ý định nằm tại mcp-gateway/core-intents.json.
 * Không phụ thuộc API Node.js để chạy được trên trình duyệt.
 */

/**
 * So khớp từ khóa với truy vấn đã chuyển chữ thường. Từ khóa ngắn (tối đa 3 ký tự như "ba", "po", "rea")
 * phải khớp nguyên từ để tránh nhầm với chuỗi con ("database", "report", "react").
 */
export function matchesKeyword(text, keyword) {
  if (keyword.length > 3) return text.includes(keyword);
  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`(^|[^\\p{L}\\p{N}])${escaped}($|[^\\p{L}\\p{N}])`, 'u').test(text);
}

/**
 * Chọn ý định có điểm cao nhất: mỗi từ khóa khớp được 10 điểm, cộng độ ưu tiên của ý định.
 * @param {string} query Truy vấn người dùng
 * @param {Array<{intentId: string, targetToolId: string, keywords: string[], priority: number}>} intents
 * @returns {{ intent: object, score: number } | null}
 */
export function findBestIntent(query, intents) {
  const normalized = String(query || '').toLowerCase().trim();
  if (!normalized) return null;

  let best = null;
  for (const intent of intents) {
    const matchCount = intent.keywords.filter(kw => matchesKeyword(normalized, kw)).length;
    if (matchCount === 0) continue;
    const score = matchCount * 10 + intent.priority;
    if (!best || score > best.score) best = { intent, score };
  }
  return best;
}
