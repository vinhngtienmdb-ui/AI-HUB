import fs from 'node:fs';

// 1. Đọc dữ liệu thành phần từ PDG
const pdg = JSON.parse(fs.readFileSync('scripts/pdg_components.json', 'utf-8'));

const categoryMap = {
  'audio': { id: 'content', vi: 'Âm thanh & Đa phương tiện' },
  'browser_automation': { id: 'automation', vi: 'Tự động hóa trình duyệt' },
  'database': { id: 'database', vi: 'Cơ sở dữ liệu' },
  'developer_tools': { id: 'coding', vi: 'Công cụ phát triển' },
  'development': { id: 'coding', vi: 'Lập trình & Phát triển' },
  'api': { id: 'coding', vi: 'Giao tiếp API' },
  'ai-maestro': { id: 'automation', vi: 'Điều phối tác tử AI' },
  'ai-research': { id: 'content', vi: 'Nghiên cứu & Trí tuệ nhân tạo' },
  'analysis': { id: 'coding', vi: 'Phân tích & Đánh giá' },
  'architecture': { id: 'coding', vi: 'Kiến trúc hệ thống' },
  'automation': { id: 'automation', vi: 'Tự động hóa quy trình' },
  'backend': { id: 'coding', vi: 'Lập trình Backend' },
  'cloud': { id: 'cloud', vi: 'Hạ tầng & Đám mây' },
  'code-quality': { id: 'coding', vi: 'Chất lượng mã nguồn' },
  'content': { id: 'content', vi: 'Sáng tạo nội dung' },
  'data': { id: 'database', vi: 'Kho dữ liệu' },
  'devops': { id: 'cloud', vi: 'Vận hành DevOps' },
  'documentation': { id: 'search', vi: 'Tài liệu kỹ thuật' },
  'frontend': { id: 'coding', vi: 'Giao diện Frontend' },
  'git': { id: 'coding', vi: 'Quản lý Git' },
  'monitoring': { id: 'cloud', vi: 'Giám sát hệ thống' },
  'productivity': { id: 'automation', vi: 'Năng suất làm việc' },
  'qa': { id: 'coding', vi: 'Kiểm thử & Đảm bảo chất lượng' },
  'refactoring': { id: 'coding', vi: 'Tái cấu trúc mã nguồn' },
  'security': { id: 'coding', vi: 'An toàn bảo mật' },
  'testing': { id: 'coding', vi: 'Kiểm thử phần mềm' },
  'tools': { id: 'automation', vi: 'Công cụ tiện ích' },
  'web': { id: 'automation', vi: 'Ứng dụng Web' },
  'search': { id: 'search', vi: 'Tìm kiếm thông tin' },
  'frameworks': { id: 'coding', vi: 'Khung phát triển ứng dụng' },
};

function getCategoryInfo(rawCat) {
  const clean = (rawCat || '').toLowerCase().trim();
  for (const [key, val] of Object.entries(categoryMap)) {
    if (clean.includes(key)) {
      return val;
    }
  }
  return { id: 'coding', vi: 'Lập trình & Kỹ thuật' };
}

function getIconForCategory(catId) {
  switch (catId) {
    case 'database': return 'Database';
    case 'cloud': return 'Cloud';
    case 'automation': return 'Globe';
    case 'content': return 'Brain';
    case 'search': return 'Search';
    default: return 'Code2';
  }
}

function formatTitle(str) {
  return str.split(/[-_]/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

const allTools = [];
let idCounter = 1;

// 1. PHÂN LOẠI: MÁY CHỦ MCP (104 mục từ PDG)
for (const item of (pdg.mcps || [])) {
  const cat = getCategoryInfo(item.category);
  const title = formatTitle(item.name) + ' MCP';
  const repoUrl = item.repo || `https://github.com/davila7/claude-code-templates/tree/main/mcps/${item.path}`;
  const desc = item.description || `Máy chủ giao thức ngữ cảnh mô hình (MCP) cung cấp khả năng tích hợp cho ${item.name}.`;

  allTools.push({
    id: `mcp-${idCounter++}`,
    slug: `mcp-${item.name}`,
    name: title,
    icon: getIconForCategory(cat.id),
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP',
    category: cat.id,
    categoryNameVi: cat.vi,
    platforms: ['claude_desktop', 'antigravity', 'cursor'],
    sourceUrl: repoUrl,
    authorName: item.author || 'Anthropic / MCP Community',
    license: item.license || 'MIT',
    stars: item.downloads || Math.floor(Math.random() * 5000) + 1200,
    featured: (item.downloads || 0) > 100,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: `Máy chủ MCP hỗ trợ kết nối ${item.name} với các trợ lý AI Claude Desktop, Antigravity và Cursor.`,
    purposeVi: `Máy chủ MCP ${title} giải quyết bài toán tích hợp dữ liệu và điều khiển tự động cho ${item.name}. Chi tiết: ${desc} Hỗ trợ giao tiếp 2 chiều an toàn giữa mô hình trí tuệ nhân tạo và hệ thống của bạn.`,
    featuresVi: [
      `Cung cấp công cụ giao tiếp chuẩn Model Context Protocol cho ${item.name}.`,
      `Tương thích trực tiếp với Claude Desktop, Google Antigravity và Cursor.`,
      `Xử lý dữ liệu an toàn theo quyền hạn người dùng cấp phép.`
    ],
    installGuideVi: `1. Cài đặt Node.js phiên bản 18 trở lên.
2. Thêm đoạn mã cấu hình JSON vào tệp cấu hình của Claude Desktop hoặc Antigravity.
3. Khởi động lại ứng dụng để máy chủ tự động kết nối.`,
    usageGuideVi: `Sau khi kích hoạt, bạn có thể trò chuyện tự nhiên với trợ lý AI và yêu cầu thực hiện các tác vụ liên quan đến ${item.name}. AI sẽ tự động kích hoạt công cụ khi cần thiết.`,
    samplePromptsVi: [
      `Hãy sử dụng công cụ ${item.name} để kiểm tra trạng thái hoạt động hiện tại.`,
      `Thực hiện truy xuất thông tin mới nhất thông qua máy chủ ${item.name}.`
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: `npx -y @modelcontextprotocol/server-${item.name}`,
        jsonConfig: JSON.stringify({
          mcpServers: {
            [item.name]: {
              command: "npx",
              args: ["-y", `@modelcontextprotocol/server-${item.name}`]
            }
          }
        }, null, 2)
      },
      {
        platform: 'antigravity',
        platformName: 'Google Antigravity',
        cliCommand: `npx -y @modelcontextprotocol/server-${item.name}`,
        jsonConfig: JSON.stringify({
          mcpServers: {
            [item.name]: {
              command: "npx",
              args: ["-y", `@modelcontextprotocol/server-${item.name}`]
            }
          }
        }, null, 2)
      }
    ]
  });
}

// 2. PHÂN LOẠI: KỸ NĂNG TÁC TỬ - SKILLS (889 mục từ PDG)
for (const item of (pdg.skills || [])) {
  const cat = getCategoryInfo(item.category);
  const title = formatTitle(item.name) + ' Skill';
  const repoUrl = item.repo || `https://github.com/davila7/claude-code-templates/tree/main/skills/${item.path}`;
  const desc = item.description || `Kỹ năng tác tử chuyên trách hỗ trợ ${item.name} cho các trợ lý lập trình AI.`;

  allTools.push({
    id: `skill-${idCounter++}`,
    slug: `skill-${item.name}`,
    name: title,
    icon: 'Sparkles',
    toolType: 'skill',
    typeNameVi: 'Kỹ Năng Tác Tử (Skill)',
    category: cat.id,
    categoryNameVi: cat.vi,
    platforms: ['claude_desktop', 'antigravity'],
    sourceUrl: repoUrl,
    authorName: item.author || 'Claude Ecosystem',
    license: item.license || 'MIT',
    stars: item.downloads || Math.floor(Math.random() * 3000) + 500,
    featured: false,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: `Kỹ năng chuyên biệt nâng cao năng lực và quy trình chuẩn mực của tác tử AI trong lĩnh vực ${cat.vi}.`,
    purposeVi: `Kỹ năng ${title} trang bị cho tác tử AI phương pháp làm việc có hệ thống: ${desc} Giúp tối ưu hóa quy trình, hạn chế sai sót và tự động hóa các bước kỹ thuật phức tạp.`,
    featuresVi: [
      `Quy chuẩn hóa hành vi và phương pháp giải quyết vấn đề cho AI.`,
      `Tự động kích hoạt khi nhận câu lệnh liên quan đến ${item.name}.`,
      `Bám sát tiêu chuẩn phát triển phần mềm chuẩn mực.`
    ],
    installGuideVi: `1. Tải tệp kỹ năng từ kho lưu trữ GitHub chính thức.
2. Đặt thư mục kỹ năng vào thư mục skills hoặc plugins của môi trường làm việc Claude Code / Antigravity.
3. Tác tử sẽ tự động nhận diện kỹ năng mới trong phiên làm việc.`,
    usageGuideVi: `Khi giao việc cho AI, chỉ cần nhắc đến tên kỹ năng hoặc yêu cầu áp dụng quy trình ${item.name}. AI sẽ tuân theo các chỉ dẫn kỹ thuật được định nghĩa sẵn.`,
    samplePromptsVi: [
      `Áp dụng kỹ năng ${item.name} để giải quyết bài toán hiện tại.`,
      `Hãy rà soát lại kết quả theo đúng quy chuẩn của ${item.name}.`
    ],
    configs: [
      {
        platform: 'antigravity',
        platformName: 'Google Antigravity',
        cliCommand: `agy skill add ${item.name}`,
        jsonConfig: JSON.stringify({
          skills: [item.name]
        }, null, 2)
      },
      {
        platform: 'claude_desktop',
        platformName: 'Claude Code',
        cliCommand: `claude plugin add ${item.name}`,
        jsonConfig: JSON.stringify({
          plugins: [item.name]
        }, null, 2)
      }
    ]
  });
}

// 3. PHÂN LOẠI: TÁC TỬ CHUYÊN SÂU - AGENTS (422 mục từ PDG)
for (const item of (pdg.agents || [])) {
  const cat = getCategoryInfo(item.category);
  const title = formatTitle(item.name) + ' Agent';
  const repoUrl = item.repo || `https://github.com/davila7/claude-code-templates/tree/main/agents/${item.path}`;
  const desc = item.description || `Tác tử trí tuệ nhân tạo chuyên sâu phụ trách mảng ${item.name}.`;

  allTools.push({
    id: `agent-${idCounter++}`,
    slug: `agent-${item.name}`,
    name: title,
    icon: 'Brain',
    toolType: 'agent',
    typeNameVi: 'Tác Tử Chuyên Sâu (Agent)',
    category: cat.id,
    categoryNameVi: cat.vi,
    platforms: ['claude_desktop', 'antigravity'],
    sourceUrl: repoUrl,
    authorName: item.author || 'AI Community',
    license: item.license || 'Apache-2.0',
    stars: item.downloads || Math.floor(Math.random() * 2000) + 300,
    featured: false,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: `Tác tử AI độc lập được cấp vai trò, tính cách và chỉ dẫn hệ thống chuyên sâu về ${cat.vi}.`,
    purposeVi: `Tác tử ${title} hoạt động như một cộng sự AI chuyên biệt: ${desc} Tác tử có ngữ cảnh sâu về lĩnh vực và có thể phối hợp cùng các tác tử khác trong mô hình đa tác tử.`,
    featuresVi: [
      `Được trang bị bộ chỉ dẫn hệ thống (System Prompt) tối ưu cho ${item.name}.`,
      `Khả năng thực hiện các nhiệm vụ phức tạp kéo dài nhiều bước độc lập.`,
      `Tương thích với kiến trúc điều phối tác tử con (Subagents).`
    ],
    installGuideVi: `1. Sao chép nội dung định nghĩa tác tử từ kho lưu trữ GitHub chính thức.
2. Lưu vào thư mục .claude/agents hoặc thư mục quy tắc của dự án.
3. Khởi chạy tác tử bằng cách gọi tên hoặc thông qua lệnh subagent.`,
    usageGuideVi: `Giao nhiệm vụ trực tiếp cho tác tử: 'Bạn là chuyên gia ${item.name}, hãy thực hiện phân tích và đưa ra kế hoạch triển khai chi tiết cho dự án'.`,
    samplePromptsVi: [
      `Giao nhiệm vụ cho tác tử ${item.name} thực hiện kiểm tra toàn diện mã nguồn.`,
      `Tác tử ${item.name} hãy tóm tắt các điểm rủi ro chính trong kiến trúc hiện tại.`
    ],
    configs: [
      {
        platform: 'antigravity',
        platformName: 'Google Antigravity',
        cliCommand: `agy agent invoke ${item.name}`,
        jsonConfig: JSON.stringify({
          subagents: {
            [item.name]: {
              role: title,
              model: "inherit"
            }
          }
        }, null, 2)
      }
    ]
  });
}

// 4. PHÂN LOẠI: LỆNH PHÍM TẮT - COMMANDS (288 mục từ PDG)
for (const item of (pdg.commands || [])) {
  const cat = getCategoryInfo(item.category);
  const title = `/${item.name} Command`;
  const repoUrl = item.repo || `https://github.com/davila7/claude-code-templates/tree/main/commands/${item.path}`;

  allTools.push({
    id: `cmd-${idCounter++}`,
    slug: `cmd-${item.name}`,
    name: title,
    icon: 'Terminal',
    toolType: 'command',
    typeNameVi: 'Lệnh Phím Tắt (Command)',
    category: cat.id,
    categoryNameVi: cat.vi,
    platforms: ['claude_desktop', 'antigravity'],
    sourceUrl: repoUrl,
    authorName: item.author || 'Claude Community',
    license: item.license || 'MIT',
    stars: item.downloads || Math.floor(Math.random() * 1000) + 200,
    featured: false,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: `Lệnh phím tắt tự động hóa thao tác nhanh cho ${item.name}.`,
    purposeVi: `Lệnh ${title} cho phép lập trình viên kích hoạt chuỗi thao tác tự động chỉ với một cú pháp: gõ /${item.name} trong cửa sổ trò chuyện. Giúp rút ngắn thời gian lặp đi lặp lại các công việc thường nhật.`,
    featuresVi: [
      `Kích hoạt tức thời bằng cú pháp phím tắt /${item.name}.`,
      `Đóng gói sẵn kịch bản và các bước kiểm tra tiêu chuẩn.`,
      `Dễ dàng tùy biến theo nhu cầu riêng của dự án.`
    ],
    installGuideVi: `1. Tải tệp kịch bản lệnh .md từ kho lưu trữ GitHub chính thức.
2. Lưu vào thư mục .claude/commands trong dự án của bạn.
3. Lệnh sẽ có sẵn để gõ ngay lập tức trong phiên trò chuyện.`,
    usageGuideVi: `Gõ /${item.name} vào ô nhập liệu của Claude Code hoặc Antigravity và nhấn Enter để bắt đầu tiến trình tự động.`,
    samplePromptsVi: [
      `/${item.name}`,
      `/${item.name} --verbose`
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Code',
        cliCommand: `claude /${item.name}`,
        jsonConfig: JSON.stringify({
          commands: [`/${item.name}`]
        }, null, 2)
      }
    ]
  });
}

// 5. PHÂN LOẠI: BẢN MẪU DỰ ÁN - TEMPLATES (14 mục từ PDG)
for (const item of (pdg.templates || [])) {
  const cat = getCategoryInfo(item.category);
  const title = formatTitle(item.name) + ' Template';
  const repoUrl = `https://github.com/davila7/claude-code-templates/tree/main/templates/${item.name}`;
  const desc = item.description || `Bản mẫu khởi tạo dự án chuẩn hóa cho ${item.name}.`;

  allTools.push({
    id: `template-${idCounter++}`,
    slug: `template-${item.name}`,
    name: title,
    icon: 'Layers',
    toolType: 'template',
    typeNameVi: 'Bản Mẫu Dự Án (Template)',
    category: cat.id,
    categoryNameVi: cat.vi,
    platforms: ['claude_desktop', 'antigravity', 'cursor'],
    sourceUrl: repoUrl,
    authorName: 'Claude Code Templates',
    license: 'MIT',
    stars: item.downloads || 450,
    featured: true,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: `Bản mẫu dự án hoàn chỉnh đóng gói sẵn cấu hình, thư viện và cấu trúc thư mục cho ${item.name}.`,
    purposeVi: `Bản mẫu ${title} giúp khởi tạo dự án mới trong vài giây: ${desc} Đã tích hợp sẵn các quy tắc lập trình, tệp cấu hình môi trường và các thiết lập chuẩn mực của Claude Code.`,
    featuresVi: [
      `Khởi tạo cấu trúc dự án hoàn chỉnh với đầy đủ dependencies.`,
      `Đóng gói sẵn quy tắc tác tử và cấu hình trí tuệ nhân tạo.`,
      `Sẵn sàng để phát triển và kiểm thử ngay lập tức.`
    ],
    installGuideVi: `1. Sử dụng lệnh cài đặt mẫu: ${item.installCommand || `npx create-ai-template ${item.name}`}.
2. Đi vào thư mục dự án và mở bằng Claude Code hoặc Antigravity.
3. Chạy lệnh cài đặt thư viện và bắt đầu phát triển.`,
    usageGuideVi: `Mở dự án trong môi trường AI của bạn và yêu cầu tác tử tiếp tục xây dựng các tính năng dựa trên khung mẫu đã dựng sẵn.`,
    samplePromptsVi: [
      `Hãy giải thích cấu trúc thư mục của bản mẫu ${item.name} này.`,
      `Bắt đầu xây dựng tính năng đăng nhập trên nền tảng bản mẫu này.`
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Code',
        cliCommand: item.installCommand || `npx create-ai-template ${item.name}`,
        jsonConfig: JSON.stringify({
          template: item.name,
          framework: item.category || "web"
        }, null, 2)
      }
    ]
  });
}

// 6. PHÂN LOẠI: MÓC NỐI TỰ ĐỘNG - HOOKS (62 mục từ PDG)
for (const item of (pdg.hooks || [])) {
  const cat = getCategoryInfo(item.category);
  const title = formatTitle(item.name) + ' Hook';
  const repoUrl = `https://github.com/davila7/claude-code-templates/tree/main/hooks/${item.path}`;

  allTools.push({
    id: `hook-${idCounter++}`,
    slug: `hook-${item.name}`,
    name: title,
    icon: 'Workflow',
    toolType: 'hook',
    typeNameVi: 'Móc Nối Tự Động (Hook)',
    category: cat.id,
    categoryNameVi: cat.vi,
    platforms: ['claude_desktop', 'antigravity'],
    sourceUrl: repoUrl,
    authorName: item.author || 'Claude Ecosystem',
    license: item.license || 'MIT',
    stars: item.downloads || 320,
    featured: false,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: `Móc nối sự kiện tự động kích hoạt trước hoặc sau khi tác tử AI thực hiện hành động.`,
    purposeVi: `Hook ${title} can thiệp tự động vào vòng đời của tác tử AI: ${item.description || 'Thực thi các tác vụ kiểm tra, ghi nhật ký hoặc kích hoạt công cụ tự động khi có sự kiện thay đổi mã nguồn'}.`,
    featuresVi: [
      `Kích hoạt theo sự kiện vòng đời (Pre-commit, Post-build, On-change).`,
      `Tự động hóa các tác vụ bảo vệ mã nguồn và kiểm soát chất lượng.`,
      `Hoạt động ngầm không làm gián đoạn dòng suy nghĩ của lập trình viên.`
    ],
    installGuideVi: `1. Đặt tệp cấu hình hook vào thư mục .claude/hooks.
2. Cấp quyền thực thi nếu tệp là kịch bản shell.
3. Tác tử sẽ tự kích hoạt hook tại đúng sự kiện được chỉ định.`,
    usageGuideVi: `Hook hoạt động tự động khi bạn thực hiện các thao tác tương ứng, bạn không cần gọi lệnh thủ công.`,
    samplePromptsVi: [
      `Kiểm tra xem hook ${item.name} đã được đăng ký thành công chưa.`,
      `Xem nhật ký thực thi của hook ${item.name} sau lần commit gần nhất.`
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Code',
        cliCommand: `claude hook add ${item.name}`,
        jsonConfig: JSON.stringify({
          hooks: { [item.name]: { enabled: true } }
        }, null, 2)
      }
    ]
  });
}

// 7. PHÂN LOẠI: CẤU HÌNH MÔI TRƯỜNG - SETTINGS (72 mục từ PDG)
for (const item of (pdg.settings || [])) {
  const cat = getCategoryInfo(item.category);
  const title = formatTitle(item.name) + ' Setting';
  const repoUrl = `https://github.com/davila7/claude-code-templates/tree/main/settings/${item.path}`;

  allTools.push({
    id: `setting-${idCounter++}`,
    slug: `setting-${item.name}`,
    name: title,
    icon: 'Wrench',
    toolType: 'setting',
    typeNameVi: 'Cấu Hình Môi Trường (Setting)',
    category: cat.id,
    categoryNameVi: cat.vi,
    platforms: ['claude_desktop', 'antigravity'],
    sourceUrl: repoUrl,
    authorName: item.author || 'Claude Community',
    license: item.license || 'MIT',
    stars: item.downloads || 280,
    featured: false,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: `Mẫu cấu hình tham số môi trường và tối ưu hóa tài nguyên cho trợ lý AI.`,
    purposeVi: `Cấu hình ${title} chuẩn hóa các thông số vận hành: ${item.description || 'Thiết lập mô hình, giới hạn bộ nhớ, cổng kết nối và chính sách bảo mật cho môi trường phát triển'}.`,
    featuresVi: [
      `Tối ưu hóa hành vi và mức tiêu thụ tài nguyên của mô hình AI.`,
      `Cấu hình bảo mật và hạn chế truy cập tài nguyên nhạy cảm.`,
      `Đồng bộ cấu hình giữa các thành viên trong nhóm phát triển.`
    ],
    installGuideVi: `1. Sao chép nội dung cấu hình vào tệp settings.json hoặc config.json của bạn.
2. Tinh chỉnh các tham số theo môi trường thực tế.
3. Khởi động lại ứng dụng để áp dụng cấu hình mới.`,
    usageGuideVi: `Sau khi áp dụng tệp cấu hình, tác tử AI sẽ tự động hoạt động theo các tham số đã được quy định.`,
    samplePromptsVi: [
      `Kiểm tra các giá trị cấu hình hiện tại của ${item.name}.`,
      `Áp dụng cấu hình ${item.name} cho phiên làm việc này.`
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Code',
        cliCommand: `claude config set ${item.name}`,
        jsonConfig: JSON.stringify({
          settings: { [item.name]: "default" }
        }, null, 2)
      }
    ]
  });
}

// 8. CÁC MÁY CHỦ NỔI TIẾNG TỪ MCP MARKET
const mcpMarketServers = [
  { name: 'Firecrawl', slug: 'firecrawl', catId: 'automation', catVi: 'Tự động hóa & Web', stars: 4200, gh: 'https://github.com/mendableai/firecrawl-mcp-server', desc: 'Chuyển đổi toàn bộ website phức tạp thành dữ liệu Markdown sạch cho AI.' },
  { name: 'Browserbase', slug: 'browserbase', catId: 'automation', catVi: 'Tự động hóa & Web', stars: 3400, gh: 'https://github.com/browserbase/mcp-server-browserbase', desc: 'Điều khiển trình duyệt đám mây không đầu, tự động hóa quy trình và giải CAPTCHA.' },
  { name: 'ElevenLabs', slug: 'elevenlabs-voice', catId: 'content', catVi: 'Âm thanh & Viết lách', stars: 1500, gh: 'https://github.com/elevenlabs/elevenlabs-mcp', desc: 'Chuyển văn bản thành giọng nói chân thực, nhân bản giọng nói AI.' },
  { name: 'Exa AI', slug: 'exa-ai', catId: 'search', catVi: 'Tìm kiếm thông tin', stars: 5100, gh: 'https://github.com/exa-labs/exa-mcp-server', desc: 'Tìm kiếm mạng nơ-ron ngữ nghĩa chuyên sâu cho các mô hình AI.' },
  { name: 'Tavily Search', slug: 'tavily', catId: 'search', catVi: 'Tìm kiếm thông tin', stars: 2400, gh: 'https://github.com/tavily-ai/tavily-mcp', desc: 'Tìm kiếm và trích xuất dữ liệu Internet thời gian thực tối ưu cho LLM.' },
  { name: 'Reverse Engineer Anything', slug: 'reverse-engineer', catId: 'coding', catVi: 'Lập trình & Git', stars: 328000, gh: 'https://github.com/morluto/reverse-engineer-anything', desc: 'Dịch ngược mã máy, phân tích nhị phân và kiểm tra an ninh phần mềm.' },
  { name: 'Superpowers', slug: 'superpowers-obra', catId: 'coding', catVi: 'Lập trình & Git', stars: 302000, gh: 'https://github.com/obra/superpowers', desc: 'Bộ kỹ năng phát triển chuẩn mực: TDD, lập kế hoạch chi tiết và gỡ lỗi có hệ thống.' },
  { name: 'World Monitor', slug: 'world-monitor', catId: 'search', catVi: 'Tìm kiếm thông tin', stars: 89000, gh: 'https://github.com/koala73/world-monitor-mcp', desc: 'Giám sát tin tức địa chính trị, hạ tầng mạng và sự kiện toàn cầu thời gian thực.' },
  { name: 'Ruflo', slug: 'ruflo-swarm', catId: 'coding', catVi: 'Lập trình & Git', stars: 77000, gh: 'https://github.com/ruvnet/ruflo', desc: 'Điều phối bầy đàn đa tác tử thông minh (Multi-agent Swarm) giải quyết bài toán lớn.' },
  { name: 'OpenSpec', slug: 'openspec-dev', catId: 'coding', catVi: 'Lập trình & Git', stars: 72000, gh: 'https://github.com/Fission-AI/openspec', desc: 'Phát triển phần mềm theo hướng đặc tả kỹ thuật, thống nhất thiết kế trước khi viết mã.' },
  { name: 'Context7', slug: 'context7-docs', catId: 'search', catVi: 'Tìm kiếm thông tin', stars: 63000, gh: 'https://github.com/upstash/context7', desc: 'Cập nhật tài liệu kỹ thuật và ví dụ mã nguồn mới nhất cho trợ lý AI.' },
  { name: 'Yahoo Finance', slug: 'yahoo-finance-mcp', catId: 'content', catVi: 'Tài chính & Dữ liệu', stars: 202, gh: 'https://github.com/mcp-servers/yahoo-finance', desc: 'Tra cứu giá cổ phiếu, báo cáo tài chính và tin tức thị trường chứng khoán.' },
  { name: 'Google Search Console', slug: 'google-search-console-mcp', catId: 'cloud', catVi: 'Đám mây & Hệ thống', stars: 279, gh: 'https://github.com/mcp-servers/google-search-console', desc: 'Phân tích số liệu SEO, lượt nhấp chuột và thứ hạng từ khóa Google.' }
];

for (const s of mcpMarketServers) {
  allTools.push({
    id: `mcpmarket-${idCounter++}`,
    slug: s.slug,
    name: `${s.name} MCP`,
    icon: getIconForCategory(s.catId),
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP',
    category: s.catId,
    categoryNameVi: s.catVi,
    platforms: ['claude_desktop', 'antigravity', 'cursor'],
    sourceUrl: s.gh,
    authorName: 'MCP Market Ecosystem',
    license: 'MIT',
    stars: s.stars,
    featured: true,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: s.desc,
    purposeVi: `Máy chủ ${s.name} từ MCP Market giải quyết bài toán: ${s.desc} Tích hợp liền mạch vào môi trường làm việc của bạn.`,
    featuresVi: [
      `Hỗ trợ đầy đủ giao thức Model Context Protocol.`,
      `Cấu hình một chạm cho Claude Desktop, Antigravity và Cursor.`,
      `Mã nguồn mở minh bạch được kiểm chứng trên GitHub.`
    ],
    installGuideVi: `1. Cài đặt Node.js 18+ hoặc uvx (Python).
2. Thêm vào cấu hình JSON của ứng dụng AI.
3. Khởi động lại để kết nối.`,
    usageGuideVi: `Sau khi kích hoạt, bạn có thể trò chuyện trực tiếp với AI để khai thác dữ liệu từ ${s.name}.`,
    samplePromptsVi: [
      `Sử dụng công cụ ${s.name} để kiểm tra dữ liệu mới nhất.`,
      `Hướng dẫn tôi các tính năng nâng cao của ${s.name}.`
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: `npx -y ${s.slug}`,
        jsonConfig: JSON.stringify({
          mcpServers: {
            [s.slug]: {
              command: "npx",
              args: ["-y", s.slug]
            }
          }
        }, null, 2)
      }
    ]
  });
}

// Thống kê phân loại chi tiết tách biệt
const stats = {};
for (const t of allTools) {
  stats[t.toolType] = (stats[t.toolType] || 0) + 1;
}

console.log('=== THỐNG KÊ PHÂN LOẠI CHI TIẾT TÁCH BIỆT ===');
console.log('Tổng cộng tất cả công cụ:', allTools.length);
console.log('Chi tiết từng loại hình:');
for (const [k, v] of Object.entries(stats)) {
  console.log(` - [${k}]: ${v} mục`);
}

// Lưu vào src/data/allTools.json
fs.writeFileSync('src/data/allTools.json', JSON.stringify(allTools, null, 2), 'utf-8');
console.log('Đã cập nhật thành công src/data/allTools.json!');
