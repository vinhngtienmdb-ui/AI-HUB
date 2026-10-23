const fs = require('fs');
const path = require('path');

const allToolsPath = path.join(__dirname, '../src/data/allTools.json');
const allTools = JSON.parse(fs.readFileSync(allToolsPath, 'utf8'));

// Xóa nếu đã tồn tại để đảm bảo đưa lên đầu
const existingIndex = allTools.findIndex(t => t.id === 'vectorize-io-hindsight');
if (existingIndex !== -1) {
  allTools.splice(existingIndex, 1);
}

const hindsightClaudeJson = JSON.stringify({
  mcpServers: {
    hindsight: {
      command: 'uvx',
      args: ['hindsight-embed', 'mcp'],
      env: {
        HINDSIGHT_API_KEY: 'your_api_key_here',
        HINDSIGHT_BANK_ID: 'default'
      }
    }
  }
}, null, 2);

const hindsightAntigravityJson = JSON.stringify({
  mcpServers: {
    hindsight: {
      command: 'uvx',
      args: ['hindsight-embed', 'mcp'],
      env: {
        HINDSIGHT_API_KEY: 'your_api_key_here',
        HINDSIGHT_BANK_ID: 'default'
      }
    }
  }
}, null, 2);

const hindsightCursorJson = JSON.stringify({
  mcpServers: {
    hindsight: {
      url: 'http://localhost:8080/mcp'
    }
  }
}, null, 2);

const hindsightTool = {
  id: 'vectorize-io-hindsight',
  slug: 'vectorize-io-hindsight',
  name: 'Hindsight — Hệ Thống Bộ Nhớ Dài Hạn Phỏng Sinh Học Cho Tác Tử AI (Agent Memory That Learns)',
  icon: 'Brain',
  imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60',
  demoImages: [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60'
  ],
  toolType: 'mcp',
  typeNameVi: 'Máy chủ giao thức MCP (MCP Server)',
  category: 'database',
  categoryNameVi: 'Cơ sở dữ liệu & Quản lý tri thức',
  categories: [
    'database',
    'agent-framework',
    'developer-tools',
    'vietnam'
  ],
  categoryNamesVi: [
    'Cơ sở dữ liệu & Quản trị tri thức',
    'Khung phát triển tác tử (Agent Framework)',
    'Công cụ lập trình & Kỹ thuật',
    '🇻🇳 Thị Trường Việt Nam'
  ],
  isVietnamMarket: true,
  platforms: ['claude_desktop', 'antigravity', 'cursor'],
  sourceUrl: 'https://github.com/vectorize-io/hindsight',
  websiteUrl: 'https://vectorize.io',
  authorName: 'Vectorize.io',
  license: 'Apache-2.0 / MIT',
  summaryVi: 'Hệ thống bộ nhớ dài hạn phỏng sinh học mã nguồn mở dành riêng cho các AI Agent, tự động trích xuất sự thật khách quan, định danh thực thể, xây dựng đồ thị nhân quả và tổng hợp mô hình nhận thức qua 3 tác vụ Retain, Recall và Reflect.',
  purposeVi: 'Cung cấp cơ chế ghi nhớ bền vững, truy hồi bối cảnh 4 chiều song song và suy ngẫm kinh nghiệm cho các tác tử trí tuệ nhân tạo qua các phiên làm việc độc lập.',
  featuresVi: [
    'Cơ chế ghi nhớ tự động (Retain): Tự động trích xuất các sự thật, thực thể và quan hệ nhân quả mà không cần người dùng tóm tắt thủ công',
    'Truy hồi 4 chiều song song (Recall): Kết hợp đồng thời tìm kiếm ngữ nghĩa vector, từ khóa BM25, đồ thị tri thức và bối cảnh thời gian',
    'Mô hình nhận thức (Mental Models): Tự động tổng hợp và đúc kết kiến thức tổng quát từ nhiều quan sát độc lập theo thời gian',
    'Cân chỉnh thiên hướng tính cách (Dispositions): Điều chỉnh mức độ hoài nghi (Skepticism), nghĩa đen (Literalism) và thấu cảm (Empathy) khi suy ngẫm',
    'Bảo vệ Context Window tối ưu: Chỉ cung cấp các sự thật cô đọng thay vì các đoạn văn bản thô khổng lồ như RAG truyền thống',
    'Hỗ trợ triển khai linh hoạt: Hoạt động cục bộ qua uvx hindsight-embed, tự lưu trữ qua Docker, hoặc đồng bộ hóa với đám mây'
  ],
  installGuideVi: `1. Cài đặt công cụ thực thi thông qua trình quản lý gói uv hoặc pip:
   uvx hindsight-embed daemon status

2. Cấu hình khóa API và nhà cung cấp mô hình trí tuệ nhân tạo (OpenAI, Anthropic, Gemini hoặc máy chủ LLM nội bộ):
   uvx hindsight-embed configure

3. Khởi tạo và ghi nhớ kiến thức vào ngân hàng bộ nhớ mặc định:
   uvx hindsight-embed memory retain default "Dự án sử dụng TypeScript nghiêm ngặt, tuân thủ quy chuẩn VibeCode 13 giai đoạn." --context learnings

4. Tích hợp trực tiếp vào môi trường Claude Code, Cursor hoặc Antigravity thông qua giao thức MCP Server:
   Thêm cấu hình JSON vào tệp thiết lập MCP của bạn để tác tử tự động truy hồi ngữ cảnh trước mỗi tác vụ.`,
  usageGuideVi: `### Hướng dẫn sử dụng bộ nhớ Hindsight trong quy trình làm việc cùng tác tử:

- **Bước 1 — Ghi nhớ kinh nghiệm (Retain):** Khi giải quyết xong một lỗi khó hoặc người dùng đưa ra quy chuẩn mới:
  \`uvx hindsight-embed memory retain default "Nội dung kinh nghiệm hoặc bối cảnh sự cố..." --context learnings\`

- **Bước 2 — Truy hồi bối cảnh (Recall):** Trước khi bắt đầu một nhiệm vụ kỹ thuật mới:
  \`uvx hindsight-embed memory recall default "Tìm kiếm kiến thức đã ghi nhớ liên quan đến tính năng..."\`

- **Bước 3 — Suy ngẫm nhận thức (Reflect):** Đúc kết các giải pháp và mô hình nhận thức:
  \`uvx hindsight-embed memory reflect default "Tổng hợp các mẫu lỗi thường gặp và phương án xử lý"\``,
  samplePromptsVi: [
    'Truy hồi các kinh nghiệm và quy chuẩn lập trình đã ghi nhớ trong các phiên làm việc trước',
    'Ghi nhớ giải pháp khắc phục sự cố này vào ngân hàng bộ nhớ Hindsight để tái sử dụng',
    'Suy ngẫm và tổng hợp mô hình nhận thức về cấu trúc kiến trúc dự án hiện tại',
    'Khởi tạo ngân hàng bộ nhớ mới dành riêng cho phân hệ bảo mật và kiểm thử'
  ],
  configs: [
    {
      platform: 'claude_desktop',
      platformName: 'Claude Desktop',
      fileName: 'claude_desktop_config.json',
      cliCommand: 'uvx hindsight-embed configure',
      content: hindsightClaudeJson,
      jsonConfig: hindsightClaudeJson
    },
    {
      platform: 'antigravity',
      platformName: 'Google Antigravity',
      fileName: 'mcp_config.json',
      cliCommand: 'uvx hindsight-embed mcp',
      content: hindsightAntigravityJson,
      jsonConfig: hindsightAntigravityJson
    },
    {
      platform: 'cursor',
      platformName: 'Cursor',
      fileName: '.cursor/mcp.json',
      cliCommand: 'docker run -d -p 8080:8080 vectorizeio/hindsight',
      content: hindsightCursorJson,
      jsonConfig: hindsightCursorJson
    }
  ],
  version: '1.0.0',
  status: 'published',
  linkHealth: 'good',
  stars: 12450,
  featured: true,
  pricingModel: 'open_source',
  pricingText: 'Mã nguồn mở miễn phí 100% (Apache-2.0 / MIT)',
  prosVi: [
    'Giải pháp bộ nhớ tác tử hoàn chỉnh nhất, vượt trội hơn RAG truyền thống nhờ trích xuất sự thật và thực thể',
    'Khả năng truy hồi 4 chiều song song (Semantic, BM25, Knowledge Graph, Temporal)',
    'Hỗ trợ giao thức MCP Server cắm chạy ngay lập tức cho Claude, Cursor và Antigravity',
    'Bảo mật dữ liệu tuyệt đối nhờ hỗ trợ tự lưu trữ (Self-Hosted qua Docker)'
  ],
  consVi: [
    'Cần cấu hình khóa API cho mô hình ngôn ngữ để thực hiện trích xuất sự thật khi ghi nhớ',
    'Yêu cầu môi trường Python/uv hoặc Docker để chạy daemon nền'
  ],
  languages: ['Python', 'TypeScript', 'Rust'],
  updatedAt: '2026-10-22',
  readmeVi: `# Hindsight: Bộ Nhớ Dài Hạn Phỏng Sinh Học Cho Tác Tử AI (Agent Memory That Learns)

> **Kho lưu trữ chính thức:** [https://github.com/vectorize-io/hindsight](https://github.com/vectorize-io/hindsight)  
> **Tác giả:** Vectorize.io  
> **Giấy phép:** Mã nguồn mở (Apache-2.0 / MIT)

---

## I. Tổng Quan Về Hindsight

Hindsight là hệ thống bộ nhớ phỏng sinh học (Biomimetic Memory System) đầu tiên được thiết kế chuyên biệt cho các tác tử trí tuệ nhân tạo (AI Agents). 

Không giống như các giải pháp tìm kiếm RAG truyền thống vốn chỉ lưu trữ các đoạn văn bản thô (raw chunks) và so khớp độ tương đồng hình học, Hindsight vận hành một **đường ống nhận thức tự động (Cognitive Pipeline)**:
1. **Trích xuất các sự thật khách quan (Facts):** Tự động bóc tách các quyết định, lỗi, sở thích và kinh nghiệm từ hội thoại.
2. **Liên kết thực thể (Entity Linking):** Nhận diện người dùng, công cụ, thư viện, hàm số và xây dựng mạng lưới quan hệ.
3. **Mô hình hóa nhân quả và thời gian (Temporal and Causal Graph):** Ghi nhận nguyên nhân dẫn đến giải pháp và trình tự diễn biến sự việc.
4. **Tổng hợp mô hình nhận thức (Mental Models):** Đúc kết các bài học cốt lõi để tác tử ngày càng hành xử thông minh hơn qua từng phiên làm việc độc lập.

---

## II. Sơ Đồ Kiến Trúc Hoạt Động Của Hindsight

\`\`\`mermaid
flowchart TD
    subgraph INPUT_STREAM["1. DÒNG DỮ LIỆU ĐẦU VÀO CỦA AGENT"]
        OBS["Quan sát và Hội thoại của Agent"]
        EXEC["Log thực thi mã nguồn và Lỗi phát sinh"]
        PREF["Quy chuẩn và Sở thích kỹ thuật của người dùng"]
    end

    subgraph RETENTION_ENGINE["2. CƠ CHẾ GHI NHỚ SÂU SẮC (RETAIN)"]
        FACTS["Trích xuất sự thật khách quan (Fact Extraction)"]
        ENTITIES["Định danh và Liên kết thực thể (Entity Linking)"]
        CAUSAL["Xây dựng quan hệ nhân quả và Dòng thời gian"]
        EMBED["Sinh Vector Embedding đa tầng"]
    end

    subgraph STORAGE_LAYER["3. TẦNG LƯU TRỮ PHỎNG SINH HỌC"]
        VEC_DB[("Cơ sở dữ liệu Vector (Semantic)")]
        GRAPH_DB[("Đồ thị tri thức (Knowledge Graph)")]
        BM25_IDX[("Chỉ mục từ khóa chính xác (BM25)")]
        TEMPORAL_LOG[("Nhật ký thời gian (Temporal Log)")]
    end

    subgraph RECALL_ENGINE["4. CƠ CHẾ TRUY HỒI 4 CHIỀU SONG SONG (RECALL)"]
        STRAT_SEM["Chiến lược Ngữ nghĩa (Semantic Search)"]
        STRAT_BM25["Chiến lược Từ khóa chính xác (BM25)"]
        STRAT_GRAPH["Chiến lược Duyệt đồ thị (Graph Traversal)"]
        STRAT_TEMP["Chiến lược Bối cảnh thời gian (Temporal Filtering)"]
        RERANK["Bộ tái xếp hạng và Tối ưu hóa Context Window"]
    end

    subgraph REFLECTION_ENGINE["5. CƠ CHẾ SUY NGẪM VÀ ĐIỀU CHỈNH (REFLECT)"]
        MENTAL_MODELS["Tổng hợp Mô Hình Nhận Thức (Mental Models)"]
        DISPOSITION["Cân chỉnh theo Thiên hướng tính cách (Dispositions)"]
        DECISION["Đưa ra giải pháp chính xác cho tác vụ mới"]
    end

    INPUT_STREAM --> RETENTION_ENGINE
    RETENTION_ENGINE --> STORAGE_LAYER
    STORAGE_LAYER --> RECALL_ENGINE
    RECALL_ENGINE --> REFLECTION_ENGINE
    REFLECTION_ENGINE --> AGENT_ACTION["Tác Tử Hoạt Động Thông Minh Hơn"]
\`\`\`

---

## III. Ba Trụ Cột Tác Vụ Cốt Lõi

### 1. Ghi nhớ (Retain)
Tác tử không cần tóm tắt dữ liệu thô. Chỉ cần truyền toàn bộ bối cảnh quan sát, đoạn trích hội thoại hoặc log lỗi thực tế. Hindsight sẽ tự động sử dụng LLM để trích xuất các sự thật có giá trị lâu dài:
\`\`\`bash
uvx hindsight-embed memory retain default "Dự án sử dụng React 19 và TypeScript nghiêm ngặt. Khi build gặp lỗi module not found thì phải kiểm tra export trong index.ts." --context learnings
\`\`\`

### 2. Truy hồi (Recall)
Trước khi bắt đầu thực hiện một tác vụ mới hoặc khi gặp sự cố, tác tử chủ động truy vấn bộ nhớ để tái sử dụng kiến thức:
\`\`\`bash
uvx hindsight-embed memory recall default "Lỗi build TypeScript và cách khắc phục"
\`\`\`
Hindsight kích hoạt đồng thời 4 chiến lược tìm kiếm và tổng hợp các sự thật quan trọng nhất vào Context Window.

### 3. Suy ngẫm (Reflect)
Đúc kết các mô hình nhận thức (Mental Models) từ hàng trăm quan sát tích lũy. Hỗ trợ các thiên hướng tính cách (Dispositions) như Hoài nghi (Skepticism), Tỉ mỉ theo nghĩa đen (Literalism) hay Thấu cảm (Empathy) để đưa ra câu trả lời phù hợp nhất.

---

## IV. Bảng So Sánh Giữa RAG Truyền Thống Và Hindsight

| Tiêu Chí Đánh Giá | RAG Truyền Thống (Vector DB) | Hindsight Biomimetic Memory |
| :--- | :--- | :--- |
| **Đơn vị lưu trữ** | Các đoạn văn bản thô (Chunks) | Sự thật, Thực thể và Mối quan hệ nhân quả |
| **Cơ chế tìm kiếm** | Chỉ dựa vào khoảng cách Cosine Vector | Kết hợp 4 chiều: Vector, BM25, Đồ thị và Thời gian |
| **Khả năng tự học** | Không tự học, dữ liệu tĩnh | Tự tổng hợp mô hình nhận thức (Mental Models) |
| **Bảo vệ Token** | Trả về các chunk lớn gây tốn token | Trích lọc cô đọng, tiết kiệm tối đa Context Window |
| **Bối cảnh thời gian** | Mù mờ về thứ tự thời gian | Quản lý dòng thời gian và mối quan hệ trước - sau |

---

## V. Hướng Dẫn Cài Đặt Và Sử Dụng

### 1. Sử dụng Cục bộ thông qua CLI (Embedded Mode)
\`\`\`bash
# Kiểm tra trạng thái dịch vụ nền
uvx hindsight-embed daemon status

# Cấu hình khóa API và mô hình ngôn ngữ
uvx hindsight-embed configure

# Ghi nhớ kinh nghiệm
uvx hindsight-embed memory retain default "Nội dung cần ghi nhớ..." --context learnings

# Truy hồi thông tin
uvx hindsight-embed memory recall default "Truy vấn ngữ cảnh..."
\`\`\`

### 2. Triển khai máy chủ tự lưu trữ (Self-Hosted qua Docker)
\`\`\`bash
docker run -d -p 8080:8080 \\
  -e HINDSIGHT_LLM_PROVIDER=openai \\
  -e OPENAI_API_KEY=your_key_here \\
  vectorizeio/hindsight:latest
\`\`\`

### 3. Tích hợp giao thức MCP Server
Cấu hình kết nối trực tiếp vào Claude Desktop, Cursor hoặc Antigravity:
\`\`\`json
{
  "mcpServers": {
    "hindsight": {
      "command": "uvx",
      "args": ["hindsight-embed", "mcp"],
      "env": {
        "HINDSIGHT_BANK_ID": "default"
      }
    }
  }
}
\`\`\`
`
};

// Đưa công cụ lên vị trí đầu tiên của mảng
allTools.unshift(hindsightTool);

fs.writeFileSync(allToolsPath, JSON.stringify(allTools, null, 2), 'utf8');
console.log('Successfully inserted fully qualified vectorize-io-hindsight at index 0!');
console.log('Total tools in system:', allTools.length);
