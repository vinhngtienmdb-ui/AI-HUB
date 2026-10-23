import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { findBestIntent } from './intent-matcher.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Đọc toàn bộ kho dữ liệu công cụ AI HUB VN
const allToolsPath = path.resolve(__dirname, '../src/data/allTools.json');
let cachedTools = null;

export function getAllTools() {
  if (!cachedTools) {
    try {
      const data = fs.readFileSync(allToolsPath, 'utf-8');
      cachedTools = JSON.parse(data);
    } catch (e) {
      console.error('Lỗi khi đọc allTools.json trong smart-router:', e);
      cachedTools = [];
    }
  }
  return cachedTools;
}

// Bảng ánh xạ ý định chuyên biệt (Core Intent Profiles), dùng chung với giao diện web
const CORE_INTENTS = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'core-intents.json'), 'utf-8'));

/**
 * Phân tích ý định người dùng và định tuyến đến công cụ phù hợp nhất
 * @param {string} taskDescription Câu lệnh / bài toán nghiệp vụ người dùng yêu cầu
 * @returns {object} Kết quả định tuyến
 */
export function routeTask(taskDescription) {
  if (!taskDescription || typeof taskDescription !== 'string') {
    return {
      success: false,
      error: 'Vui lòng cung cấp mô tả bài toán cần thực thi.',
      matchedTool: null,
      confidence: 0
    };
  }

  const queryNormalized = taskDescription.toLowerCase().trim();
  const allTools = getAllTools();
  const toolMap = new Map(allTools.map(t => [t.id, t]));

  // 1. Kiểm tra đối sánh với bảng ý định chuyên biệt (Core Intent Profiles)
  const bestMatch = findBestIntent(queryNormalized, CORE_INTENTS);
  const bestIntentMatch = bestMatch ? bestMatch.intent : null;
  const highestScore = bestMatch ? bestMatch.score : 0;

  if (bestIntentMatch && toolMap.has(bestIntentMatch.targetToolId)) {
    const targetTool = toolMap.get(bestIntentMatch.targetToolId);
    return {
      success: true,
      strategy: 'DIRECT_INTENT_MATCH',
      confidence: Math.min(0.99, 0.75 + (highestScore / 100)),
      intentId: bestIntentMatch.intentId,
      matchedTool: targetTool,
      reasoningVi: `Hệ thống nhận diện ý định thuộc nhóm chuyên môn [${targetTool.categoryNameVi}]. Công cụ được chọn là "${targetTool.name}" do đáp ứng sát nhất các từ khóa và nghiệp vụ yêu cầu.`
    };
  }

  // 2. Tìm kiếm dự phòng theo độ tương đồng nội dung trong toàn bộ kho tài nguyên
  const tokens = queryNormalized.split(/\s+/).filter(w => w.length > 2);
  let bestFallbackTool = null;
  let maxTokenHits = 0;

  for (const tool of allTools) {
    let hits = 0;
    const searchableText = `${tool.name} ${tool.summaryVi} ${tool.purposeVi} ${(tool.tags || []).join(' ')}`.toLowerCase();

    for (const token of tokens) {
      if (searchableText.includes(token)) {
        hits++;
      }
    }

    if (hits > maxTokenHits) {
      maxTokenHits = hits;
      bestFallbackTool = tool;
    }
  }

  if (bestFallbackTool && maxTokenHits > 0) {
    return {
      success: true,
      strategy: 'SEMANTIC_KEYWORD_MATCH',
      confidence: Math.min(0.85, 0.5 + (maxTokenHits * 0.1)),
      intentId: 'general_domain_match',
      matchedTool: bestFallbackTool,
      reasoningVi: `Đã đối soát ngữ nghĩa trên toàn bộ kho ${allTools.length.toLocaleString('vi-VN')} tài nguyên của AI HUB VN và chọn "${bestFallbackTool.name}" thuộc lĩnh vực [${bestFallbackTool.categoryNameVi}].`
    };
  }

  // 3. Nếu không có kết quả khớp, chọn OpenBA-Kit làm trợ lý phân tích nghiệp vụ mặc định
  const defaultTool = toolMap.get('spmtitsolution-openba-kit-57-ai-skills') || allTools[0];
  return {
    success: true,
    strategy: 'DEFAULT_ANALYST_FALLBACK',
    confidence: 0.5,
    intentId: 'default_business_analyst',
    matchedTool: defaultTool,
    reasoningVi: `Yêu cầu mở rộng được chuyển tiếp đến trợ lý phân tích nghiệp vụ "${defaultTool.name}" để phỏng vấn làm rõ bài toán và bóc tách yêu cầu chi tiết.`
  };
}
