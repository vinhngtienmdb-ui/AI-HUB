/**
 * Bộ điều phối thực thi trung gian (AI HUB Dynamic Dispatcher)
 * Chịu trách nhiệm tạo gói phản hồi hoàn chỉnh, sinh chỉ dẫn cấu hình và lệnh chạy cho AI Agent
 */

export function dispatchTask(routingResult, taskDescription, userParameters = {}) {
  if (!routingResult || !routingResult.matchedTool) {
    return {
      status: 'ROUTING_FAILED',
      message: 'Không thể định tuyến bài toán đến công cụ phù hợp.'
    };
  }

  const tool = routingResult.matchedTool;

  // Trích xuất cấu hình mẫu JSON đầu tiên của công cụ (nếu có)
  let sampleJsonConfig = null;
  let cliCommand = null;
  if (Array.isArray(tool.configs) && tool.configs.length > 0) {
    sampleJsonConfig = tool.configs[0].jsonConfig;
    cliCommand = tool.configs[0].cliCommand;
  }

  return {
    status: 'DISPATCH_SUCCESS',
    gateway: {
      name: 'AI HUB VN Smart MCP Gateway',
      version: '2.0.0',
      role: 'MCP Trung Gian Điều Phối Tự Động'
    },
    routing: {
      strategy: routingResult.strategy,
      confidence: Math.round(routingResult.confidence * 100) + '%',
      intentId: routingResult.intentId,
      reasoningVi: routingResult.reasoningVi
    },
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
      quickCliCommand: cliCommand || `npx -y ${tool.id}`,
      installGuideVi: tool.installGuideVi,
      usageGuideVi: tool.usageGuideVi,
      sampleJsonConfig: sampleJsonConfig
    },
    contextOptimization: {
      status: 'ACTIVE',
      tokenSavedRatio: '~95%',
      explanation: 'Người dùng không cần nạp toàn bộ 2.216 công cụ vào cửa sổ ngữ cảnh. MCP Gateway chỉ nạp duy nhất định nghĩa của công cụ được điều phối.'
    }
  };
}
