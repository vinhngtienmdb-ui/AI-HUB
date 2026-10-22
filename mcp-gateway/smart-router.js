import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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

// Bảng ánh xạ ý định chuyên biệt (Core Intent Profiles)
const CORE_INTENTS = [
  {
    intentId: 'vibecoding_dev_lifecycle',
    targetToolId: 'vibecoding-skill-dev-lifecycle',
    keywords: [
      'vibecoding', 'vibecode', 'quy trình vibecode', 'quy trình vibecoding', 'dev-lifecycle', 
      '13 giai đoạn', 'chuẩn phát triển phần mềm', 'bộ tài liệu dự án', 'không suy đoán', 
      'không phá vỡ dự án', 'hướng dẫn vibecode', 'kỹ năng vibecoding'
    ],
    priority: 14
  },
  {
    intentId: 'agent_workforce_paperclip',
    targetToolId: 'paperclipai-paperclip',
    keywords: [
      'paperclip', 'quản lý agent', 'quản trị agent', 'điều phối agent', 'agent workforce', 
      'multi-agent management', 'control plane', 'org chart agent', 'quản lý tác tử', 
      'phê duyệt agent', 'human in the loop', 'quản lý đội ngũ agent'
    ],
    priority: 13
  },
  {
    intentId: 'ai_job_search_framework',
    targetToolId: 'mads-lorentzen-ai-job-search',
    keywords: [
      'ai job search', 'job search', 'tìm việc', 'săn việc', 'xin việc', 'viết cv', 'tạo cv', 'cover letter', 
      'thư xin việc', 'luyện phỏng vấn', 'phỏng vấn thử', 'ats resume', 'ats checker', 'mads lorentzen', 
      'job application', 'phỏng vấn tuyển dụng', 'nộp hồ sơ', 'hồ sơ ứng tuyển'
    ],
    priority: 12
  },
  {
    intentId: 'find_agent_skills',
    targetToolId: 'vercel-labs-find-skills',
    keywords: [
      'find skill', 'find-skill', 'find-skills', 'tìm skill', 'tìm giúp tôi skill', 
      'tìm kiếm skill', 'tìm kỹ năng', 'skills.sh', 'npx skills', 'cài đặt skill', 'khám phá skill', 
      'agent skills', 'agent skill', 'cài skill', 'skill', 'skills'
    ],
    priority: 15
  },
  {
    intentId: 'fintech_vietnam_momo',
    targetToolId: 'vn-mcp-momo-payment',
    keywords: ['momo', 'ví momo', 'thanh toán momo', 'hoàn tiền momo', 'ipn momo'],
    priority: 10
  },
  {
    intentId: 'fintech_vietnam_vietqr',
    targetToolId: 'vietqr-generator-napas247-mcp',
    keywords: ['vietqr', 'mã qr ngân hàng', 'chuyển khoản', 'napas247', 'napas', 'tài khoản ngân hàng', 'qr code thanh toán'],
    priority: 10
  },
  {
    intentId: 'messaging_vietnam_zalo_oa',
    targetToolId: 'vn-mcp-zalo-oa-messaging',
    keywords: ['zalo', 'zalo oa', 'official account', 'nhắn tin zalo', 'zalo api'],
    priority: 10
  },
  {
    intentId: 'fintech_vietnam_hub',
    targetToolId: 'vn-mcp-hub-fintech-messaging',
    keywords: ['thanh toán việt nam', 'cổng thanh toán vn', 'zalopay', 'vnpay', 'viettelpay', 'viettel money', 'ví điện tử việt nam'],
    priority: 9
  },
  {
    intentId: 'reverse_engineering_rea',
    targetToolId: 'morluto-rea-reverse-engineer-anything',
    keywords: [
      'dịch ngược', 'reverse engineer', 'reverse engineering', 'binary', 'mã máy', 'nhị phân', 
      'ghidra', 'hopper', 'ida pro', 'disassemble', 'decompilation', 'electron asar', 'native binary'
    ],
    priority: 10
  },
  {
    intentId: 'business_analysis_openba_kit',
    targetToolId: 'spmtitsolution-openba-kit-57-ai-skills',
    keywords: [
      'business analyst', 'ba', 'product owner', 'po', 'srs', 'ieee 830', 'user story', 
      'invest', 'wireframe', 'use case', 'cockburn', 'gherkin', 'acceptance criteria', 'ac', 
      'change request', 'render diagrams', 'đặc tả yêu cầu', 'phân tích nghiệp vụ'
    ],
    priority: 10
  },
  {
    intentId: 'database_sqlite',
    targetToolId: 'sqlite-mcp-database-server',
    keywords: ['sqlite', 'database sqlite', 'truy vấn sqlite', 'db local', 'csdl cục bộ'],
    priority: 9
  },
  {
    intentId: 'database_postgres',
    targetToolId: 'postgresql-database-mcp-server',
    keywords: ['postgres', 'postgresql', 'truy vấn postgres', 'pg database'],
    priority: 9
  },
  {
    intentId: 'browser_automation_puppeteer',
    targetToolId: 'puppeteer-browser-automation-mcp',
    keywords: ['puppeteer', 'kiểm thử web', 'qa automation', 'chụp ảnh màn hình', 'screenshot website', 'e2e testing'],
    priority: 9
  },
  {
    intentId: 'browser_automation_agent',
    targetToolId: 'browser-use-ai-agent',
    keywords: ['browser use', 'tự động hóa trình duyệt', 'điều khiển trình duyệt', 'web agent', 'tự động click web'],
    priority: 9
  },
  {
    intentId: 'web_crawler_rag',
    targetToolId: 'crawl4ai-web-crawler-llm',
    keywords: ['cào web', 'crawl web', 'trích xuất markdown', 'crawler rag', 'thu thập dữ liệu web'],
    priority: 9
  },
  {
    intentId: 'nlp_vietnamese',
    targetToolId: 'vietnamese-nlp-toolkit-ai-mcp',
    keywords: ['nlp tiếng việt', 'tách từ tiếng việt', 'pos tagging', 'nhận dạng thực thể', 'chính tả tiếng việt', 'underthesea'],
    priority: 9
  },
  {
    intentId: 'claude_cost_token',
    targetToolId: 'cc-usage-cost-analyzer-cli',
    keywords: ['chi phí api', 'tiêu thụ token', 'token usage', 'cc-usage', 'ccflare', 'kiểm tra chi phí claude'],
    priority: 9
  },
  {
    intentId: 'claude_slash_commands',
    targetToolId: 'claude-command-suite-119',
    keywords: ['lệnh tắt', 'slash command', 'command suite', '/security-audit', '/architecture-review'],
    priority: 9
  },
  {
    intentId: 'persistent_memory',
    targetToolId: 'anthropic-memory-knowledge-graph-mcp',
    keywords: ['bộ nhớ dài hạn', 'ghi nhớ', 'đồ thị tri thức', 'knowledge graph', 'persistent memory'],
    priority: 9
  },
  {
    intentId: 'semantic_code_search',
    targetToolId: 'claude-context-semantic-search-mcp',
    keywords: ['tìm kiếm ngữ nghĩa', 'semantic search', 'codebase lớn', 'ast search', 'tìm hàm trong dự án'],
    priority: 9
  },
  {
    intentId: 'web_privacy_search',
    targetToolId: 'brave-search-privacy-mcp-server',
    keywords: ['tìm kiếm web riêng tư', 'brave search', 'tra cứu internet', 'web search an toàn'],
    priority: 8
  },
  {
    intentId: 'cloud_storage_gdrive',
    targetToolId: 'google-drive-mcp-server',
    keywords: ['google drive', 'gdrive', 'google docs', 'google sheets', 'tài liệu drive'],
    priority: 8
  }
];

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
  let bestIntentMatch = null;
  let highestScore = 0;

  for (const intent of CORE_INTENTS) {
    let matchCount = 0;
    for (const kw of intent.keywords) {
      if (queryNormalized.includes(kw)) {
        matchCount++;
      }
    }

    if (matchCount > 0) {
      const score = matchCount * 10 + intent.priority;
      if (score > highestScore) {
        highestScore = score;
        bestIntentMatch = intent;
      }
    }
  }

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

  // 2. Tìm kiếm dự phòng theo độ tương đồng nội dung trong toàn bộ 2.216 tài nguyên
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
      reasoningVi: `Đã đối soát ngữ nghĩa trên toàn bộ kho 2.216 tài nguyên của AI HUB VN và chọn "${bestFallbackTool.name}" thuộc lĩnh vực [${bestFallbackTool.categoryNameVi}].`
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
