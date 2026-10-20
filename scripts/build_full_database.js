import fs from 'node:fs';

const database = [
  // --- NHÓM 1: CƠ SỞ DỮ LIỆU (DATABASE) ---
  {
    id: 'tool-db-01',
    slug: 'mcp-server-sqlite',
    name: 'SQLite MCP Server',
    icon: 'Database',
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP',
    category: 'database',
    categoryNameVi: 'Cơ sở dữ liệu',
    platforms: ['claude_desktop', 'antigravity', 'cursor'],
    sourceUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/sqlite',
    authorName: 'Model Context Protocol Org',
    license: 'MIT',
    stars: 14200,
    featured: true,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Cho phép tác tử AI đọc, kiểm tra cấu trúc bảng và thực thi truy vấn an toàn trên cơ sở dữ liệu SQLite cục bộ.',
    purposeVi: 'Máy chủ SQLite MCP cung cấp cầu nối an toàn giữa trợ lý AI và tệp cơ sở dữ liệu SQLite trên máy tính của bạn. Công cụ giúp giải quyết bài toán: phân tích dữ liệu nhanh, kiểm tra lược đồ (Schema), tạo và chạy câu lệnh SQL để thống kê hoặc xuất báo cáo trực tiếp mà không cần công cụ quản trị CSDL riêng biệt.',
    featuresVi: [
      'Đọc danh sách bảng, cấu trúc cột, khóa chính và ràng buộc toàn vẹn.',
      'Thực thi truy vấn SELECT để phân tích và thống kê dữ liệu.',
      'Hỗ trợ chế độ chỉ đọc (Read-Only) để bảo vệ dữ liệu gốc an toàn.',
      'Tự động định dạng kết quả truy vấn dạng bảng rõ ràng cho AI đọc.'
    ],
    installGuideVi: `1. Cài đặt Node.js phiên bản 18 trở lên.
2. Chuẩn bị đường dẫn tệp cơ sở dữ liệu SQLite trên máy tính (ví dụ: D:/du-lieu/ban-hang.db).
3. Thêm đoạn mã cấu hình JSON vào tệp claude_desktop_config.json hoặc Antigravity.
4. Khởi động lại ứng dụng để kích hoạt máy chủ.`,
    usageGuideVi: `Sau khi tích hợp, bạn có thể trò chuyện trực tiếp với AI để phân tích dữ liệu mà không cần viết câu lệnh SQL thủ công. AI sẽ tự gọi công cụ đọc cấu trúc hoặc chạy truy vấn dữ liệu theo yêu cầu.`,
    samplePromptsVi: [
      'Hãy kiểm tra xem cơ sở dữ liệu này có những bảng nào và giải thích ý nghĩa các cột trong bảng orders.',
      'Thống kê tổng doanh thu theo từng tháng trong năm 2025 và cho tôi biết 3 sản phẩm bán chạy nhất.',
      'Viết câu lệnh truy vấn tìm ra các khách hàng đã không có đơn hàng nào trong 6 tháng qua.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'npx -y @modelcontextprotocol/server-sqlite D:/du-lieu/ban-hang.db',
        jsonConfig: JSON.stringify({
          mcpServers: {
            sqlite: {
              command: "npx",
              args: ["-y", "@modelcontextprotocol/server-sqlite", "D:/du-lieu/ban-hang.db"]
            }
          }
        }, null, 2)
      },
      {
        platform: 'antigravity',
        platformName: 'Google Antigravity',
        cliCommand: 'npx -y @modelcontextprotocol/server-sqlite D:/du-lieu/ban-hang.db',
        jsonConfig: JSON.stringify({
          mcpServers: {
            sqlite: {
              command: "npx",
              args: ["-y", "@modelcontextprotocol/server-sqlite", "D:/du-lieu/ban-hang.db"]
            }
          }
        }, null, 2)
      }
    ]
  },
  {
    id: 'tool-db-02',
    slug: 'mcp-server-postgres',
    name: 'PostgreSQL MCP Server',
    icon: 'Database',
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP',
    category: 'database',
    categoryNameVi: 'Cơ sở dữ liệu',
    platforms: ['claude_desktop', 'antigravity', 'cursor'],
    sourceUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/postgres',
    authorName: 'Model Context Protocol Org',
    license: 'MIT',
    stars: 16800,
    featured: true,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Kết nối trực tiếp trợ lý AI với cơ sở dữ liệu PostgreSQL để kiểm tra bảng, tối ưu hóa truy vấn và phân tích dữ liệu.',
    purposeVi: 'Cung cấp khả năng kiểm tra lược đồ dữ liệu, chạy các truy vấn SQL phân tích, phát hiện chỉ mục (Indexes) bị thiếu và tối ưu hóa hiệu năng cơ sở dữ liệu PostgreSQL doanh nghiệp trực tiếp từ cửa sổ chat của tác tử AI.',
    featuresVi: [
      'Kiểm tra toàn bộ cấu trúc Schema, quan hệ khóa ngoại (Foreign Keys) và View.',
      'Chạy câu lệnh EXPLAIN ANALYZE để phát hiện các truy vấn chậm.',
      'Hỗ trợ kết nối bảo mật qua chuỗi kết nối PostgreSQL tiêu chuẩn (SSL/TLS).',
      'Định dạng kết quả trả về dạng bảng dữ liệu có cấu trúc.'
    ],
    installGuideVi: `1. Cài đặt Node.js 18+.
2. Chuẩn bị chuỗi kết nối cơ sở dữ liệu PostgreSQL (ví dụ: postgresql://user:password@localhost:5432/my_db).
3. Đưa chuỗi kết nối vào tham số cấu hình JSON.
4. Khởi động lại công cụ AI để kiểm tra kết nối.`,
    usageGuideVi: `Yêu cầu tác tử AI kiểm tra cấu trúc cơ sở dữ liệu hoặc viết các câu lệnh tổng hợp dữ liệu phức tạp giữa nhiều bảng.`,
    samplePromptsVi: [
      'Hãy phân tích hiệu năng của bảng users và gợi ý các chỉ mục cần đánh thêm.',
      'Viết câu lệnh SQL kết hợp bảng orders, customers và products để tính giá trị đơn hàng trung bình theo từng vùng.',
      'Giải thích nguyên nhân tại sao truy vấn này chạy chậm và cách tối ưu lại.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'npx -y @modelcontextprotocol/server-postgres postgresql://user:pass@localhost:5432/dbname',
        jsonConfig: JSON.stringify({
          mcpServers: {
            postgres: {
              command: "npx",
              args: ["-y", "@modelcontextprotocol/server-postgres", "postgresql://user:pass@localhost:5432/dbname"]
            }
          }
        }, null, 2)
      },
      {
        platform: 'antigravity',
        platformName: 'Google Antigravity',
        cliCommand: 'npx -y @modelcontextprotocol/server-postgres postgresql://user:pass@localhost:5432/dbname',
        jsonConfig: JSON.stringify({
          mcpServers: {
            postgres: {
              command: "npx",
              args: ["-y", "@modelcontextprotocol/server-postgres", "postgresql://user:pass@localhost:5432/dbname"]
            }
          }
        }, null, 2)
      }
    ]
  },
  {
    id: 'tool-db-03',
    slug: 'mongodb-mcp-server',
    name: 'MongoDB Official MCP Server',
    icon: 'Database',
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP',
    category: 'database',
    categoryNameVi: 'Cơ sở dữ liệu',
    platforms: ['claude_desktop', 'antigravity', 'cursor'],
    sourceUrl: 'https://github.com/mongodb-labs/mongodb-mcp-server',
    authorName: 'MongoDB Labs',
    license: 'Apache-2.0',
    stars: 8900,
    featured: true,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Máy chủ MCP chính thức từ MongoDB, cho phép tương tác ngôn ngữ tự nhiên với MongoDB Atlas và cơ sở dữ liệu Document.',
    purposeVi: 'Giúp các nhà phát triển và kỹ sư dữ liệu truy vấn các tập hợp tài liệu (Collections), xây dựng chuỗi tổng hợp (Aggregation Pipelines) phức tạp và quản lý chỉ mục trên MongoDB mà không cần nhớ cú pháp query lồng nhau phức tạp.',
    featuresVi: [
      'Tìm kiếm và lọc các tài liệu Document bằng truy vấn ngôn ngữ tự nhiên.',
      'Xây dựng tự động chuỗi Aggregation Pipeline nhiều giai đoạn ($match, $group, $lookup).',
      'Kiểm tra thống kê kích thước bộ sưu tập và tình trạng phân mảnh chỉ mục.',
      'Tương thích hoàn toàn với MongoDB Atlas và MongoDB Community Edition.'
    ],
    installGuideVi: `1. Chuẩn bị chuỗi kết nối MongoDB Connection String (mongodb+srv://... hoặc mongodb://localhost:27017).
2. Thêm vào cấu hình JSON theo mẫu bên dưới.
3. Khởi động lại ứng dụng để bắt đầu truy vấn.`,
    usageGuideVi: `Bạn có thể yêu cầu AI: 'Tìm cho tôi 5 khách hàng có nhiều hơn 10 đơn hàng trong collection orders và tính tổng chi tiêu của họ'.`,
    samplePromptsVi: [
      'Tạo một chuỗi aggregation pipeline để nhóm các bài viết theo danh mục và đếm lượt thích.',
      'Kiểm tra cấu trúc mẫu của một document trong collection logs.',
      'Gợi ý chỉ mục compound index cho collection users để tối ưu hóa truy vấn tìm kiếm theo email và status.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'npx -y @mongodb-labs/mongodb-mcp-server --connection-string "mongodb://localhost:27017"',
        jsonConfig: JSON.stringify({
          mcpServers: {
            mongodb: {
              command: "npx",
              args: ["-y", "@mongodb-labs/mongodb-mcp-server", "--connection-string", "mongodb://localhost:27017/my_database"]
            }
          }
        }, null, 2)
      }
    ]
  },
  {
    id: 'tool-db-04',
    slug: 'supabase-mcp-server',
    name: 'Supabase MCP Server',
    icon: 'Database',
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP',
    category: 'database',
    categoryNameVi: 'Cơ sở dữ liệu',
    platforms: ['claude_desktop', 'antigravity', 'cursor'],
    sourceUrl: 'https://github.com/supabase-community/supabase-mcp',
    authorName: 'Supabase Community',
    license: 'MIT',
    stars: 7600,
    featured: false,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Tích hợp toàn diện nền tảng Supabase: quản lý cơ sở dữ liệu Postgres, xác thực người dùng Auth và Edge Functions.',
    purposeVi: 'Kết nối trợ lý AI trực tiếp vào dự án Supabase trên đám mây, hỗ trợ sinh mã nguồn di chuyển cơ sở dữ liệu (Database Migrations), kiểm tra chính sách bảo mật cấp hàng (Row Level Security - RLS) và quản trị bảng.',
    featuresVi: [
      'Đọc lược đồ cơ sở dữ liệu Postgres và trạng thái kích hoạt RLS.',
      'Viết và kiểm tra chính sách bảo mật Row Level Security an toàn.',
      'Truy cập dữ liệu trực tiếp qua Supabase Management API.',
      'Hỗ trợ quản trị các hàm Serverless Edge Functions.'
    ],
    installGuideVi: `1. Lấy Access Token cá nhân và Project Ref từ bảng điều khiển Supabase Dashboard.
2. Cấu hình biến môi trường SUPABASE_ACCESS_TOKEN và SUPABASE_PROJECT_ID trong JSON.
3. Khởi động lại ứng dụng AI.`,
    usageGuideVi: `Yêu cầu AI viết chính sách bảo mật RLS để chỉ cho phép tác giả chỉnh sửa bài viết của chính mình.`,
    samplePromptsVi: [
      'Viết chính sách RLS cho bảng profiles để người dùng chỉ được đọc và sửa hồ sơ cá nhân của mình.',
      'Kiểm tra danh sách các bảng trong dự án Supabase và cho biết những bảng nào chưa bật RLS.',
      'Tạo đoạn mã SQL di chuyển cơ sở dữ liệu để thêm trường avatar_url vào bảng users.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'npx -y supabase-mcp-server',
        jsonConfig: JSON.stringify({
          mcpServers: {
            supabase: {
              command: "npx",
              args: ["-y", "supabase-mcp-server"],
              env: {
                SUPABASE_ACCESS_TOKEN: "sbp_dien_token_cua_ban",
                SUPABASE_PROJECT_ID: "your-project-ref"
              }
            }
          }
        }, null, 2)
      }
    ]
  },
  {
    id: 'tool-db-05',
    slug: 'redis-mcp-server',
    name: 'Redis Official MCP Server',
    icon: 'Database',
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP',
    category: 'database',
    categoryNameVi: 'Cơ sở dữ liệu',
    platforms: ['claude_desktop', 'antigravity'],
    sourceUrl: 'https://github.com/redis/mcp-redis',
    authorName: 'Redis Inc.',
    license: 'BSD-3-Clause',
    stars: 6400,
    featured: false,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Máy chủ MCP chính thức từ Redis, cung cấp giao diện ngôn ngữ tự nhiên để thao tác khóa, bộ nhớ đệm (Cache) và hàng đợi.',
    purposeVi: 'Hỗ trợ kiểm tra các khóa bộ nhớ đệm, phân tích cấu trúc dữ liệu trong bộ nhớ (Strings, Hashes, Lists, Sets, Streams), giám sát thời gian sống (TTL) và chẩn đoán tắc nghẽn bộ nhớ đệm.',
    featuresVi: [
      'Kiểm tra giá trị và kiểu dữ liệu của các khóa (Keys) trong Redis.',
      'Xem thời gian sống còn lại (TTL) và dung lượng bộ nhớ sử dụng.',
      'Tìm kiếm khóa theo mẫu (Pattern Matching).',
      'Hỗ trợ thao tác trên Redis Cluster và Redis Cloud an toàn.'
    ],
    installGuideVi: `1. Chuẩn bị URL kết nối Redis (ví dụ: redis://localhost:6379).
2. Thêm vào cấu hình JSON của bạn theo mẫu bên dưới.
3. Khởi động lại ứng dụng AI.`,
    usageGuideVi: `Yêu cầu AI kiểm tra xem khóa phiên làm việc session:user:123 có tồn tại không và thời gian hết hạn còn bao lâu.`,
    samplePromptsVi: [
      'Liệt kê các khóa bắt đầu bằng tiền tố cache:products: và cho tôi biết kiểu dữ liệu của chúng.',
      'Kiểm tra xem khóa session:user_99 có thời gian TTL là bao nhiêu giây.',
      'Phân tích kích thước bộ nhớ của hash key user:profile:100.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'npx -y @redis/mcp-redis redis://localhost:6379',
        jsonConfig: JSON.stringify({
          mcpServers: {
            redis: {
              command: "npx",
              args: ["-y", "@redis/mcp-redis", "redis://localhost:6379"]
            }
          }
        }, null, 2)
      }
    ]
  },

  // --- NHÓM 2: LẬP TRÌNH & GIT (CODING) ---
  {
    id: 'tool-code-01',
    slug: 'mcp-server-github',
    name: 'GitHub MCP Server',
    icon: 'GitPullRequest',
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP',
    category: 'coding',
    categoryNameVi: 'Lập trình & Git',
    platforms: ['claude_desktop', 'antigravity', 'cursor'],
    sourceUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/github',
    authorName: 'Model Context Protocol Org',
    license: 'MIT',
    stars: 18900,
    featured: true,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Tích hợp sâu kho lưu trữ GitHub, hỗ trợ tìm kiếm mã nguồn, quản trị Issues, Pull Requests và theo dõi commit.',
    purposeVi: 'GitHub MCP Server giúp các trợ lý AI trực tiếp tương tác với các kho lưu trữ mã nguồn của bạn trên GitHub. Công cụ giải quyết nhu cầu: tự động rà soát Pull Request (Code Review), tóm tắt các phản hồi lỗi từ người dùng (Issues), tra cứu nhanh các đoạn mã nguồn và tạo commit mới mà không cần rời màn hình trò chuyện.',
    featuresVi: [
      'Tìm kiếm tệp tin, commit và lịch sử thay đổi trên mọi kho lưu trữ được cấp quyền.',
      'Đọc, tạo mới, bình luận và đóng các thẻ báo lỗi (Issues).',
      'Kiểm tra danh sách thay đổi (Diff) trong các yêu cầu nhập mã (Pull Requests).',
      'Đọc nội dung tệp tin mã nguồn trên các nhánh phát triển khác nhau.'
    ],
    installGuideVi: `1. Chuẩn bị mã khóa cá nhân GitHub (Personal Access Token - PAT) có quyền repo.
2. Lấy mã token tại: https://github.com/settings/tokens
3. Điền biến môi trường GITHUB_PERSONAL_ACCESS_TOKEN vào tệp cấu hình JSON.
4. Khởi động lại ứng dụng AI để hoàn tất kết nối.`,
    usageGuideVi: `Sau khi tích hợp, trợ lý AI có khả năng truy vấn mọi thông tin trên GitHub theo quyền hạn token bạn đã cấp. Bạn có thể yêu cầu AI kiểm tra tiến độ của dự án hoặc tóm tắt các sự cố mới phát sinh.`,
    samplePromptsVi: [
      'Hãy liệt kê 5 Pull Request đang chờ duyệt gần đây nhất trong kho lưu trữ của tôi.',
      'Tìm các Issues có nhãn bug liên quan đến xác thực người dùng.',
      'Đọc tệp README.md của nhánh main và tóm tắt những tính năng mới vừa được bổ sung.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'npx -y @modelcontextprotocol/server-github',
        jsonConfig: JSON.stringify({
          mcpServers: {
            github: {
              command: "npx",
              args: ["-y", "@modelcontextprotocol/server-github"],
              env: {
                GITHUB_PERSONAL_ACCESS_TOKEN: "ghp_dien_ma_token_cua_ban_vao_day"
              }
            }
          }
        }, null, 2)
      }
    ]
  },
  {
    id: 'tool-code-02',
    slug: 'superpowers-skill',
    name: 'Superpowers Skill Suite',
    icon: 'Sparkles',
    toolType: 'skill',
    typeNameVi: 'Kỹ Năng Tác Tử',
    category: 'coding',
    categoryNameVi: 'Lập trình & Git',
    platforms: ['claude_desktop', 'antigravity'],
    sourceUrl: 'https://github.com/obra/superpowers',
    authorName: 'Jesse Vincent (obra)',
    license: 'MIT',
    stars: 302000,
    featured: true,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Bộ kỹ năng phát triển phần mềm chuẩn mực: Lập trình hướng kiểm thử (TDD), lập kế hoạch từng bước và gỡ lỗi có hệ thống.',
    purposeVi: 'Giải quyết điểm yếu lớn nhất của các mô hình AI khi lập trình: vội vã viết mã nguồn khi chưa hiểu rõ bài toán hoặc sửa lỗi một cách mò mẫm làm phá vỡ hệ thống. Bộ kỹ năng Superpowers ép buộc AI phải tuân theo kỷ luật kỹ thuật phần mềm chuẩn mực: lập kế hoạch trước khi viết mã, viết kiểm thử trước khi triển khai và kiểm tra xác minh trước khi xác nhận hoàn thành.',
    featuresVi: [
      'Kỹ năng lập trình hướng kiểm thử (Test-Driven Development - TDD): Viết kiểm thử đỏ -> Viết mã xanh -> Tối ưu mã nguồn.',
      'Kỹ năng gỡ lỗi có hệ thống (Systematic Debugging): Tìm nguyên nhân gốc rễ trước khi sửa.',
      'Kỹ năng lập kế hoạch chi tiết (Writing Plans): Chia nhỏ bài toán thành các bước có tiêu chí nghiệm thu rõ ràng.',
      'Kỹ năng rà soát mã nguồn (Code Review Verification).'
    ],
    installGuideVi: `1. Clone kho lưu trữ https://github.com/obra/superpowers về máy tính.
2. Đặt thư mục kỹ năng vào thư mục cấu hình plugins hoặc skills của Claude Code hoặc Antigravity.
3. Kích hoạt kỹ năng trong tệp cấu hình môi trường tác tử.`,
    usageGuideVi: `Khi bắt đầu phát triển một tính năng mới hoặc sửa lỗi phức tạp, chỉ cần nhắc AI sử dụng quy trình test-driven-development hoặc systematic-debugging. AI sẽ tự động phân tích và chia việc theo quy chuẩn.`,
    samplePromptsVi: [
      'Áp dụng quy trình TDD để viết hàm xác thực cú pháp JSON và viết kiểm thử đầy đủ cho các trường hợp biên.',
      'Hệ thống đang phát sinh lỗi tràn bộ nhớ khi đọc tệp lớn, hãy áp dụng quy trình systematic-debugging để điều tra nguyên nhân.',
      'Lập kế hoạch triển khai chi tiết cho phân hệ thanh toán trước khi viết bất kỳ dòng mã nguồn nào.'
    ],
    configs: [
      {
        platform: 'antigravity',
        platformName: 'Google Antigravity',
        cliCommand: 'agy skill install superpowers',
        jsonConfig: JSON.stringify({
          plugins: ["superpowers"]
        }, null, 2)
      }
    ]
  },
  {
    id: 'tool-code-03',
    slug: 'reverse-engineer-anything',
    name: 'Reverse Engineer Anything',
    icon: 'Code2',
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP',
    category: 'coding',
    categoryNameVi: 'Lập trình & Git',
    platforms: ['claude_desktop', 'antigravity'],
    sourceUrl: 'https://github.com/morluto/reverse-engineer-anything',
    authorName: 'morluto',
    license: 'MIT',
    stars: 328000,
    featured: true,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Cung cấp năng lực dịch ngược mã nguồn, phân tích tệp nhị phân, kiểm tra lỗ hổng bảo mật và giải mã cấu trúc phần mềm.',
    purposeVi: 'Cho phép các kỹ sư phần mềm và chuyên gia an toàn thông tin tận dụng trí tuệ nhân tạo để phân tích mã máy, đọc cấu trúc tệp nhị phân (PE, ELF, Mach-O), khôi phục giao thức mạng ẩn và kiểm tra an ninh ứng dụng mà không có mã nguồn gốc.',
    featuresVi: [
      'Phân tích cấu trúc hàm và chuỗi lệnh hợp ngữ (Assembly) từ tệp thực thi.',
      'Nhận diện các mẫu thư viện và chữ ký hàm quen thuộc trong mã nhị phân.',
      'Phân tích luồng thực thi và kiểm tra các điểm có nguy cơ tràn bộ đệm (Buffer Overflow).',
      'Hỗ trợ trích xuất giao thức truyền thông mạng từ lưu lượng packet.'
    ],
    installGuideVi: `1. Cài đặt Python 3.10+ và các công cụ dịch ngược phụ trợ (Ghidra hoặc Radare2 nếu cần).
2. Tải mã nguồn máy chủ từ kho GitHub chính thức.
3. Thêm cấu hình khởi động vào tệp JSON của bạn.`,
    usageGuideVi: `Chỉ định đường dẫn tệp nhị phân cần phân tích và yêu cầu AI giải thích luồng xử lý chính của hàm main.`,
    samplePromptsVi: [
      'Hãy phân tích tệp thực thi app.exe và cho tôi biết nó sử dụng những API hệ thống nào để ghi tệp.',
      'Dịch ngược hàm sub_401000 và viết lại logic đó bằng ngôn ngữ C rõ ràng.',
      'Kiểm tra xem tệp tin này có chứa các chuỗi văn bản hoặc khóa mã hóa bị lưu cứng không.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'uvx reverse-engineer-anything-mcp',
        jsonConfig: JSON.stringify({
          mcpServers: {
            reverse_engineer: {
              command: "uvx",
              args: ["reverse-engineer-anything-mcp"]
            }
          }
        }, null, 2)
      }
    ]
  },
  {
    id: 'tool-code-04',
    slug: 'openspec-mcp',
    name: 'OpenSpec Spec-Driven Development',
    icon: 'Layers',
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP',
    category: 'coding',
    categoryNameVi: 'Lập trình & Git',
    platforms: ['claude_desktop', 'antigravity'],
    sourceUrl: 'https://github.com/Fission-AI/openspec',
    authorName: 'Fission-AI',
    license: 'Apache-2.0',
    stars: 72000,
    featured: false,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Quy trình phát triển phần mềm dựa trên đặc tả kỹ thuật chuẩn hóa, bảo đảm con người và AI thống nhất trước khi viết code.',
    purposeVi: 'Giúp lập trình viên kiểm soát tuyệt đối hành vi của AI, ngăn ngừa hiện tượng tự ý sáng tác mã nguồn thừa hoặc làm sai yêu cầu nghiệp vụ thông qua cơ chế duyệt hợp đồng đặc tả (Spec) trước khi triển khai.',
    featuresVi: [
      'Tạo khung tài liệu đặc tả yêu cầu chức năng tự động từ mô tả ban đầu.',
      'Kiểm tra tính nhất quán giữa mã nguồn đã viết và bản đặc tả gốc.',
      'Phát hiện sớm các trường hợp biên và ngoại lệ chưa được xử lý trong thiết kế.',
      'Xuất kịch bản kiểm thử tự động trực tiếp từ tài liệu đặc tả.'
    ],
    installGuideVi: `1. Cài đặt thông qua lệnh npx hoặc uvx.
2. Thiết lập đường dẫn thư mục lưu trữ tài liệu đặc tả specs trong dự án của bạn.
3. Khởi động lại ứng dụng AI.`,
    usageGuideVi: `Yêu cầu AI lập đặc tả cho một tính năng mới trước, sau khi bạn phê duyệt đặc tả thì mới cho phép AI sinh mã nguồn.`,
    samplePromptsVi: [
      'Hãy soạn bản đặc tả OpenSpec cho tính năng xác thực hai yếu tố (2FA) trước khi bắt đầu lập trình.',
      'Đối chiếu mã nguồn hiện tại trong thư mục src/auth với bản đặc tả specs/auth.spec.md xem có điểm nào chưa đạt không.',
      'Sinh kịch bản kiểm thử đơn vị từ bản đặc tả này.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'npx -y @fission-ai/openspec-mcp',
        jsonConfig: JSON.stringify({
          mcpServers: {
            openspec: {
              command: "npx",
              args: ["-y", "@fission-ai/openspec-mcp"]
            }
          }
        }, null, 2)
      }
    ]
  },
  {
    id: 'tool-code-05',
    slug: 'magic-ui-mcp',
    name: 'Magic UI Component Generator',
    icon: 'Sparkles',
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP',
    category: 'coding',
    categoryNameVi: 'Lập trình & Git',
    platforms: ['claude_desktop', 'antigravity', 'cursor'],
    sourceUrl: 'https://github.com/magic-ui/mcp-server',
    authorName: 'Magic UI Team',
    license: 'MIT',
    stars: 6100,
    featured: true,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Tự động sinh các thành phần giao diện hiện đại (React, Tailwind CSS, Framer Motion) từ mô tả ngôn ngữ tự nhiên.',
    purposeVi: 'Tăng tốc thiết kế Frontend: người dùng chỉ cần mô tả giao diện mong muốn bằng ngôn ngữ tự nhiên, công cụ sẽ tự động xuất mã nguồn React chuẩn mực, hỗ trợ tương tác mượt mà và chuẩn thiết kế đáp ứng (Responsive).',
    featuresVi: [
      'Sinh mã nguồn React Component sạch, tối ưu hóa kiểu dữ liệu TypeScript.',
      'Tích hợp sẵn phong cách thiết kế Tailwind CSS đẹp mắt.',
      'Hỗ trợ hiệu ứng chuyển động mượt mà bằng Framer Motion.',
      'Xem trước mã nguồn và tùy biến màu sắc linh hoạt.'
    ],
    installGuideVi: `1. Cài đặt Node.js 18+.
2. Thêm vào cấu hình JSON của Claude Desktop hoặc Cursor.
3. Khởi động lại ứng dụng.`,
    usageGuideVi: `Yêu cầu: 'Tạo cho tôi một thanh điều hướng Header gồm Logo bên trái, menu ở giữa và nút Đăng nhập bên phải với hiệu ứng kính mờ (Backdrop Blur)'.`,
    samplePromptsVi: [
      'Tạo một thẻ hiển thị sản phẩm thương mại điện tử với nút thêm vào giỏ hàng và nhãn giảm giá.',
      'Thiết kế giao diện bảng điều khiển Dashboard hiển thị 4 số liệu thống kê chính và biểu đồ doanh thu.',
      'Tạo một hộp thoại Modal xác nhận xóa dữ liệu có hiệu ứng hoạt họa tinh tế.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'npx -y @magic-ui/mcp-server',
        jsonConfig: JSON.stringify({
          mcpServers: {
            magic_ui: {
              command: "npx",
              args: ["-y", "@magic-ui/mcp-server"]
            }
          }
        }, null, 2)
      }
    ]
  },

  // --- NHÓM 3: TỰ ĐỘNG HÓA & TRÌNH DUYỆT (AUTOMATION) ---
  {
    id: 'tool-auto-01',
    slug: 'firecrawl-mcp',
    name: 'Firecrawl Web Scraping MCP',
    icon: 'Globe',
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP',
    category: 'automation',
    categoryNameVi: 'Tự động hóa & Web',
    platforms: ['claude_desktop', 'antigravity', 'cursor'],
    sourceUrl: 'https://github.com/mendableai/firecrawl-mcp-server',
    authorName: 'Mendable AI',
    license: 'MIT',
    stars: 4200,
    featured: true,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Chuyển đổi toàn bộ trang web phức tạp thành dữ liệu Markdown sạch và cấu trúc JSON chuẩn hóa cho các mô hình AI.',
    purposeVi: 'Giải quyết bài toán cào dữ liệu web bị chặn bởi các lớp bảo vệ (Cloudflare, CAPTCHA) hoặc trang web tải bằng JavaScript phức tạp. Firecrawl tự động vượt qua các rào cản và trả về nội dung Markdown tinh gọn, loại bỏ quảng cáo và mã rác.',
    featuresVi: [
      'Trích xuất toàn bộ nội dung bài viết thành Markdown sạch cho AI đọc.',
      'Cào dữ liệu đệ quy toàn bộ trang con trong một website (Deep Crawling).',
      'Hỗ trợ chế độ tìm kiếm và trích xuất dữ liệu có cấu trúc bằng Schema.',
      'Tự động xử lý JavaScript và các liên kết chuyển hướng động.'
    ],
    installGuideVi: `1. Đăng ký tài khoản miễn phí tại: https://firecrawl.dev và lấy API Key.
2. Điền biến môi trường FIRECRAWL_API_KEY vào cấu hình JSON.
3. Khởi động lại ứng dụng AI.`,
    usageGuideVi: `Nhập lệnh: 'Hãy cào toàn bộ tài liệu hướng dẫn trên trang web https://docs.example.com và tóm tắt những tính năng quan trọng nhất'.`,
    samplePromptsVi: [
      'Cào nội dung bài viết tại địa chỉ https://news.example.com/ai-update và tóm tắt các luận điểm chính.',
      'Trích xuất danh sách giá sản phẩm từ trang thương mại điện tử này thành bảng so sánh.',
      'Thu thập toàn bộ các liên kết trang con trong cổng tài liệu của Stripe.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'npx -y firecrawl-mcp',
        jsonConfig: JSON.stringify({
          mcpServers: {
            firecrawl: {
              command: "npx",
              args: ["-y", "firecrawl-mcp"],
              env: {
                FIRECRAWL_API_KEY: "fc-YOUR_API_KEY"
              }
            }
          }
        }, null, 2)
      }
    ]
  },
  {
    id: 'tool-auto-02',
    slug: 'browserbase-mcp',
    name: 'Browserbase Cloud Browser MCP',
    icon: 'Globe',
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP',
    category: 'automation',
    categoryNameVi: 'Tự động hóa & Web',
    platforms: ['claude_desktop', 'antigravity'],
    sourceUrl: 'https://github.com/browserbase/mcp-server-browserbase',
    authorName: 'Browserbase Inc.',
    license: 'MIT',
    stars: 3400,
    featured: true,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Điều khiển trình duyệt web không đầu trên nền tảng đám mây, tự động hóa quy trình phức tạp và giải mã CAPTCHA.',
    purposeVi: 'Cho phép trợ lý AI duyệt web trên hạ tầng máy chủ đám mây cách ly an toàn, giải quyết bài toán tự động đăng nhập, tải tệp tin và thực hiện các tác vụ trình duyệt nặng mà không làm tốn tài nguyên máy tính cá nhân của người dùng.',
    featuresVi: [
      'Khởi chạy phiên trình duyệt Chrome trên đám mây cách ly hoàn toàn.',
      'Tích hợp sẵn giải pháp tự động giải CAPTCHA và vượt tường lửa Bot.',
      'Ghi hình phiên làm việc và chụp ảnh màn hình ở độ phân giải cao.',
      'Tải về và phân tích các tệp tin từ trang web an toàn.'
    ],
    installGuideVi: `1. Đăng ký tài khoản tại https://browserbase.com để lấy API Key và Project ID.
2. Thêm vào cấu hình JSON các biến BROWSERBASE_API_KEY và BROWSERBASE_PROJECT_ID.
3. Khởi động lại ứng dụng.`,
    usageGuideVi: `Yêu cầu AI truy cập cổng thông tin, điền biểu mẫu khảo sát và gửi kết quả báo cáo về cho bạn.`,
    samplePromptsVi: [
      'Mở trình duyệt đám mây, đăng nhập vào trang quản trị và kiểm tra số lượng đơn hàng mới hôm nay.',
      'Truy cập trang web này và chụp lại ảnh toàn trang màn hình ở chế độ giao diện điện thoại.',
      'Tự động hóa quy trình kiểm tra vé máy bay giá rẻ cho chặng Hà Nội - Đà Nẵng.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'npx -y @browserbasehq/mcp-server-browserbase',
        jsonConfig: JSON.stringify({
          mcpServers: {
            browserbase: {
              command: "npx",
              args: ["-y", "@browserbasehq/mcp-server-browserbase"],
              env: {
                BROWSERBASE_API_KEY: "bb_api_key_cua_ban",
                BROWSERBASE_PROJECT_ID: "your_project_id"
              }
            }
          }
        }, null, 2)
      }
    ]
  },
  {
    id: 'tool-auto-03',
    slug: 'playwright-mcp-server',
    name: 'Playwright Browser Automation MCP',
    icon: 'Globe',
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP',
    category: 'automation',
    categoryNameVi: 'Tự động hóa & Web',
    platforms: ['claude_desktop', 'antigravity'],
    sourceUrl: 'https://github.com/executeautomation/mcp-playwright',
    authorName: 'ExecuteAutomation',
    license: 'MIT',
    stars: 5200,
    featured: false,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Kiểm thử ứng dụng web tự động bằng Playwright: nhấp chuột, gõ phím, cuộn trang và xác minh giao diện End-to-End.',
    purposeVi: 'Hỗ trợ các kỹ sư kiểm thử (QA/QC) và lập trình viên tự động hóa kiểm thử giao diện người dùng. AI có thể trực tiếp tương tác với ứng dụng đang phát triển để phát hiện lỗi giao diện, kiểm tra các trường hợp biên và chụp ảnh màn hình báo cáo.',
    featuresVi: [
      'Tương tác hoàn chỉnh với mọi phần tử DOM: nút bấm, ô nhập liệu, danh sách chọn.',
      'Chờ đợi sự kiện mạng và tải trang hoàn tất trước khi thao tác.',
      'Chụp ảnh giao diện và ghi vết thao tác (Trace Viewer) khi kiểm thử thất bại.',
      'Hỗ trợ nhiều trình duyệt: Chromium, Firefox và WebKit.'
    ],
    installGuideVi: `1. Cài đặt Node.js 18+.
2. Chạy lệnh cài đặt Playwright browsers: npx playwright install.
3. Thêm cấu hình vào tệp JSON của bạn.`,
    usageGuideVi: `Yêu cầu AI mở localhost:3000, nhấp vào nút Đóng góp công cụ và kiểm tra xem hộp thoại có hiển thị đúng không.`,
    samplePromptsVi: [
      'Hãy kiểm thử luồng đăng ký tài khoản trên localhost:3000 và báo cáo nếu có bất kỳ lỗi nào xuất hiện.',
      'Mở trang chủ, tìm kiếm từ khóa "sqlite" và xác minh rằng kết quả tìm kiếm hiển thị ít nhất một thẻ công cụ.',
      'Kiểm tra xem các nút bấm trên giao diện có hoạt động tốt khi thu nhỏ màn hình xuống kích thước điện thoại không.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'npx -y @executeautomation/playwright-mcp-server',
        jsonConfig: JSON.stringify({
          mcpServers: {
            playwright: {
              command: "npx",
              args: ["-y", "@executeautomation/playwright-mcp-server"]
            }
          }
        }, null, 2)
      }
    ]
  },

  // --- NHÓM 4: TÌM KIẾM & THÔNG TIN (SEARCH) ---
  {
    id: 'tool-search-01',
    slug: 'mcp-server-brave-search',
    name: 'Brave Search MCP Server',
    icon: 'Search',
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP',
    category: 'search',
    categoryNameVi: 'Tìm kiếm thông tin',
    platforms: ['claude_desktop', 'antigravity', 'cursor'],
    sourceUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/brave-search',
    authorName: 'Model Context Protocol Org',
    license: 'MIT',
    stars: 9800,
    featured: true,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Mở rộng khả năng tra cứu thông tin Internet thời gian thực bằng công cụ tìm kiếm độc lập Brave Search API.',
    purposeVi: 'Giúp mô hình AI vượt qua giới hạn về thời điểm ngừng học dữ liệu (Knowledge Cutoff). Khi tích hợp công cụ này, AI có thể tự động tra cứu tin tức thời sự, tài liệu kỹ thuật vừa phát hành hôm nay hoặc kiểm chứng các sự kiện thực tế mới nhất trên Internet.',
    featuresVi: [
      'Tìm kiếm trang web toàn cầu với chỉ mục độc lập của Brave Search.',
      'Tìm kiếm chuyên sâu tin tức thời sự cập nhật theo giờ.',
      'Trích xuất tóm tắt nội dung hữu ích của kết quả tìm kiếm.',
      'Tôn trọng quyền riêng tư, không lưu vết thông tin người dùng.'
    ],
    installGuideVi: `1. Đăng ký tài khoản miễn phí tại: https://brave.com/search/api/
2. Lấy mã khóa API Key (miễn phí 2,000 lượt gọi/tháng).
3. Điền vào biến môi trường BRAVE_API_KEY trong cấu hình JSON.`,
    usageGuideVi: `Hỏi AI về bất kỳ sự kiện, thông tin công nghệ hoặc tin tức mới diễn ra hôm nay. AI sẽ tự động kích hoạt tìm kiếm.`,
    samplePromptsVi: [
      'Tìm kiếm các tính năng mới nhất vừa được công bố trong phiên bản TypeScript 5.8.',
      'Tình hình thời tiết và các sự kiện đáng chú ý tại Thành phố Hồ Chí Minh hôm nay.',
      'Tìm tài liệu chính thức về Model Context Protocol do Anthropic phát hành.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'npx -y @modelcontextprotocol/server-brave-search',
        jsonConfig: JSON.stringify({
          mcpServers: {
            brave_search: {
              command: "npx",
              args: ["-y", "@modelcontextprotocol/server-brave-search"],
              env: {
                BRAVE_API_KEY: "BSA_dien_ma_key_cua_ban"
              }
            }
          }
        }, null, 2)
      }
    ]
  },
  {
    id: 'tool-search-02',
    slug: 'exa-ai-search-mcp',
    name: 'Exa AI Neural Search MCP',
    icon: 'Search',
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP',
    category: 'search',
    categoryNameVi: 'Tìm kiếm thông tin',
    platforms: ['claude_desktop', 'antigravity', 'cursor'],
    sourceUrl: 'https://github.com/exa-labs/exa-mcp-server',
    authorName: 'Exa Labs',
    license: 'MIT',
    stars: 5100,
    featured: true,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Tìm kiếm thông minh dựa trên mạng nơ-ron (Neural Search), tìm kiếm theo ý nghĩa và ngữ cảnh thay vì từ khóa thô.',
    purposeVi: 'Được thiết kế chuyên biệt cho các mô hình AI: Exa hiểu ngữ nghĩa của truy vấn và tìm kiếm các trang web có nội dung tương đồng về mặt khái niệm, tài liệu nghiên cứu học thuật hoặc kho mã nguồn GitHub có chất lượng cao nhất.',
    featuresVi: [
      'Tìm kiếm theo ngữ nghĩa (Semantic Search) vượt trội so với tìm kiếm từ khóa truyền thống.',
      'Lọc kết quả theo tên miền học thuật (.edu, arxiv.org, github.com).',
      'Trích xuất trực tiếp toàn bộ văn bản hoặc tóm tắt của trang web.',
      'Tìm kiếm các trang web tương tự (Similar Links) với một đường dẫn cho trước.'
    ],
    installGuideVi: `1. Đăng ký tài khoản và lấy API Key tại: https://exa.ai
2. Điền biến môi trường EXA_API_KEY vào tệp cấu hình JSON.
3. Khởi động lại ứng dụng.`,
    usageGuideVi: `Yêu cầu AI: 'Tìm các bài báo nghiên cứu khoa học xuất sắc nhất về tối ưu hóa mô hình ngôn ngữ lớn được công bố trong 3 tháng qua'.`,
    samplePromptsVi: [
      'Tìm các kho lưu trữ mã nguồn nguồn mở tốt nhất về xây dựng tác tử AI bằng TypeScript.',
      'Tìm kiếm các bài phân tích chuyên sâu về kiến trúc Model Context Protocol.',
      'Tìm những trang web có phong cách thiết kế tương tự trang stripe.com.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'npx -y exa-mcp-server',
        jsonConfig: JSON.stringify({
          mcpServers: {
            exa: {
              command: "npx",
              args: ["-y", "exa-mcp-server"],
              env: {
                EXA_API_KEY: "your_exa_api_key_here"
              }
            }
          }
        }, null, 2)
      }
    ]
  },
  {
    id: 'tool-search-03',
    slug: 'context7-mcp',
    name: 'Context7 Documentation Fetcher',
    icon: 'BookOpen',
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP',
    category: 'search',
    categoryNameVi: 'Tìm kiếm thông tin',
    platforms: ['claude_desktop', 'antigravity', 'cursor'],
    sourceUrl: 'https://github.com/upstash/context7',
    authorName: 'Upstash',
    license: 'MIT',
    stars: 63000,
    featured: true,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Cung cấp tài liệu kỹ thuật, thư viện và ví dụ mã nguồn phiên bản mới nhất trực tiếp cho các trợ lý lập trình AI.',
    purposeVi: 'Ngăn chặn tình trạng AI sinh mã nguồn theo các phiên bản cũ đã bị loại bỏ (Deprecated). Context7 liên tục đồng bộ tài liệu chính thức của hàng nghìn thư viện mã nguồn mở và cung cấp ngay lập tức vào ngữ cảnh của AI.',
    featuresVi: [
      'Tra cứu tài liệu API chính xác cho các thư viện phổ biến (Next.js, React, Tailwind, Prisma...).',
      'Trích xuất ví dụ mã nguồn thực tế đã được kiểm chứng hoạt động tốt.',
      'Tiết kiệm tối đa dung lượng bộ nhớ ngữ cảnh (Token) bằng thuật ngữ tinh gọn.',
      'Tự động phát hiện phiên bản mới nhất của thư viện.'
    ],
    installGuideVi: `1. Cài đặt nhanh qua npx không cần cấu hình phức tạp.
2. Thêm vào tệp cấu hình JSON theo mẫu bên dưới.
3. Khởi động lại ứng dụng AI.`,
    usageGuideVi: `Khi hỏi về cách sử dụng một thư viện mới, AI sẽ tự động gọi Context7 để đọc tài liệu chính thức trước khi sinh mã nguồn.`,
    samplePromptsVi: [
      'Tra cứu tài liệu mới nhất về Server Actions trong Next.js 15 và cho tôi ví dụ chuẩn.',
      'Cách cấu hình Tailwind CSS phiên bản 4 mới nhất với Vite thế nào?',
      'Lấy tài liệu hướng dẫn tạo schema trong Drizzle ORM.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'npx -y @upstash/context7-mcp',
        jsonConfig: JSON.stringify({
          mcpServers: {
            context7: {
              command: "npx",
              args: ["-y", "@upstash/context7-mcp"]
            }
          }
        }, null, 2)
      }
    ]
  },

  // --- NHÓM 5: ĐÁM MÂY & HỆ THỐNG (CLOUD) ---
  {
    id: 'tool-cloud-01',
    slug: 'mcp-server-filesystem',
    name: 'Filesystem MCP Server',
    icon: 'FolderTree',
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP',
    category: 'cloud',
    categoryNameVi: 'Đám mây & Hệ thống',
    platforms: ['claude_desktop', 'antigravity', 'cursor'],
    sourceUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem',
    authorName: 'Model Context Protocol Org',
    license: 'MIT',
    stars: 15300,
    featured: true,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Cho phép tác tử AI thao tác an toàn với các thư mục và tệp tin cục bộ theo danh sách đường dẫn được phê duyệt trước.',
    purposeVi: 'Filesystem MCP Server là công cụ nền tảng giúp AI đọc, ghi, chỉnh sửa và quản lý các tệp tin trực tiếp trên ổ cứng người dùng. Điểm ưu việt là cơ chế bảo vệ danh sách trắng (White-listing): AI chỉ được phép truy cập đúng các thư mục bạn đã chỉ định rõ trong cấu hình, ngăn chặn việc đọc trái phép các tệp nhạy cảm trong hệ thống.',
    featuresVi: [
      'Đọc nội dung và thuộc tính siêu dữ liệu của tệp tin văn bản, mã nguồn.',
      'Ghi mới hoặc sửa đổi nội dung tệp tin theo chỉ định của người dùng.',
      'Duyệt cấu trúc cây thư mục và tìm kiếm tệp tin theo mẫu tên.',
      'Giới hạn vùng an toàn nghiêm ngặt theo các thư mục được cấp quyền.'
    ],
    installGuideVi: `1. Cài đặt Node.js 18+.
2. Xác định các thư mục bạn muốn cấp quyền cho AI (ví dụ: C:/Users/TenBan/Documents/DuAn).
3. Đưa danh sách các đường dẫn thư mục đó vào mảng tham số args trong tệp cấu hình JSON.
4. Lưu cấu hình và khởi động lại ứng dụng.`,
    usageGuideVi: `Bạn có thể yêu cầu AI đọc tài liệu trong thư mục để tóm tắt, hoặc yêu cầu AI tạo cấu trúc thư mục và sinh mã nguồn hoàn chỉnh vào dự án.`,
    samplePromptsVi: [
      'Liệt kê toàn bộ các tệp tin markdown trong thư mục tài liệu của tôi.',
      'Đọc tệp package.json và cho tôi biết các thư viện đang sử dụng phiên bản nào.',
      'Tạo một tệp tailwind.config.js mới với cấu hình màu sắc tương phản cao.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'npx -y @modelcontextprotocol/server-filesystem C:/duong-dan/thu-muc-du-an',
        jsonConfig: JSON.stringify({
          mcpServers: {
            filesystem: {
              command: "npx",
              args: ["-y", "@modelcontextprotocol/server-filesystem", "C:/duong-dan/thu-muc-du-an"]
            }
          }
        }, null, 2)
      }
    ]
  },
  {
    id: 'tool-cloud-02',
    slug: 'google-search-console-mcp',
    name: 'Google Search Console MCP',
    icon: 'Cloud',
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP',
    category: 'cloud',
    categoryNameVi: 'Đám mây & Hệ thống',
    platforms: ['claude_desktop', 'antigravity'],
    sourceUrl: 'https://github.com/mcp-servers/google-search-console',
    authorName: 'MCP Community',
    license: 'MIT',
    stars: 279,
    featured: false,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Truy vấn trực tiếp số liệu SEO, lượt nhấp chuột, thứ hạng từ khóa và tình trạng lập chỉ mục từ Google Search Console.',
    purposeVi: 'Hỗ trợ các chuyên gia tiếp thị số (Marketers) và quản trị viên website theo dõi thứ hạng từ khóa, tìm kiếm cơ hội tăng trưởng lưu lượng truy cập và chẩn đoán các trang web bị tụt hạng mà không cần mở nhiều bảng biểu phức tạp.',
    featuresVi: [
      'Truy xuất số liệu lượt nhấp (Clicks), hiển thị (Impressions) và tỷ lệ nhấp (CTR).',
      'Xác định các từ khóa tiềm năng đang nằm ở vị trí top 4 đến top 10 Google.',
      'Kiểm tra tình trạng lập chỉ mục URL của các trang mới xuất bản.',
      'Tự động tạo báo cáo phân tích hiệu năng SEO định kỳ.'
    ],
    installGuideVi: `1. Chuẩn bị tệp chứng chỉ Service Account JSON từ Google Cloud Console có quyền truy cập Search Console.
2. Cấu hình đường dẫn tệp chứng chỉ vào biến GOOGLE_APPLICATION_CREDENTIALS.
3. Khởi động lại ứng dụng AI.`,
    usageGuideVi: `Yêu cầu AI: 'Cho tôi biết 10 từ khóa mang lại nhiều lượt truy cập nhất cho trang web trong 28 ngày qua'.`,
    samplePromptsVi: [
      'Phân tích 5 trang web có tỷ lệ nhấp chuột (CTR) thấp nhất và gợi ý cách tối ưu tiêu đề SEO.',
      'So sánh lượt tìm kiếm của website giữa tháng này và tháng trước.',
      'Kiểm tra xem trang web mới đã được Google lập chỉ mục thành công chưa.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'npx -y @mcp-servers/google-search-console',
        jsonConfig: JSON.stringify({
          mcpServers: {
            gsc: {
              command: "npx",
              args: ["-y", "@mcp-servers/google-search-console"],
              env: {
                GOOGLE_APPLICATION_CREDENTIALS: "C:/duong-dan/credentials.json"
              }
            }
          }
        }, null, 2)
      }
    ]
  },

  // --- NHÓM 6: VIẾT LÁCH, ÂM THANH & TRUYỀN THÔNG (CONTENT) ---
  {
    id: 'tool-content-01',
    slug: 'elevenlabs-mcp',
    name: 'ElevenLabs Voice & Audio MCP',
    icon: 'Sparkles',
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP',
    category: 'content',
    categoryNameVi: 'Viết lách & Bộ nhớ',
    platforms: ['claude_desktop', 'antigravity'],
    sourceUrl: 'https://github.com/elevenlabs/elevenlabs-mcp',
    authorName: 'ElevenLabs Official',
    license: 'MIT',
    stars: 1500,
    featured: true,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Chuyển đổi văn bản thành giọng nói (Text-to-Speech) chân thực, nhân bản giọng nói và xử lý âm thanh AI chuyên nghiệp.',
    purposeVi: 'Tích hợp năng lực tạo giọng đọc truyền cảm cho trợ lý AI. Người dùng có thể yêu cầu AI đọc to nội dung phản hồi, tạo tệp âm thanh thuyết minh cho video hoặc tạo các bản tin tóm tắt bằng giọng đọc tự nhiên.',
    featuresVi: [
      'Chuyển đổi văn bản thành giọng đọc tự nhiên bằng công nghệ Text-to-Speech hàng đầu.',
      'Hỗ trợ nhiều ngôn ngữ và ngữ điệu biểu cảm khác nhau.',
      'Lựa chọn hàng trăm giọng đọc mẫu có sẵn từ thư viện ElevenLabs Voice Library.',
      'Xuất tệp âm thanh chất lượng cao định dạng MP3 trực tiếp ra ổ cứng.'
    ],
    installGuideVi: `1. Đăng ký tài khoản và lấy API Key tại: https://elevenlabs.io
2. Điền biến môi trường ELEVENLABS_API_KEY vào cấu hình JSON.
3. Khởi động lại ứng dụng AI.`,
    usageGuideVi: `Yêu cầu AI: 'Hãy chuyển đổi đoạn văn bản tóm tắt tin tức sau đây thành tệp âm thanh giọng đọc tiếng Việt truyền cảm'.`,
    samplePromptsVi: [
      'Đọc đoạn văn bản sau bằng giọng nói tự nhiên và lưu thành tệp thuyet-minh.mp3.',
      'Liệt kê danh sách các giọng đọc có sẵn trong tài khoản ElevenLabs của tôi.',
      'Tạo đoạn âm thanh chào mừng khách hàng bằng giọng nữ nhẹ nhàng.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'npx -y @elevenlabs/mcp',
        jsonConfig: JSON.stringify({
          mcpServers: {
            elevenlabs: {
              command: "npx",
              args: ["-y", "@elevenlabs/mcp"],
              env: {
                ELEVENLABS_API_KEY: "your_elevenlabs_api_key_here"
              }
            }
          }
        }, null, 2)
      }
    ]
  },
  {
    id: 'tool-content-02',
    slug: 'mcp-server-memory',
    name: 'Memory Knowledge Graph MCP',
    icon: 'Brain',
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP',
    category: 'content',
    categoryNameVi: 'Viết lách & Bộ nhớ',
    platforms: ['claude_desktop', 'antigravity', 'cursor'],
    sourceUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/memory',
    authorName: 'Model Context Protocol Org',
    license: 'MIT',
    stars: 11200,
    featured: true,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Xây dựng bộ nhớ dài hạn dựa trên đồ thị tri thức (Knowledge Graph), ghi nhớ sở thích và ngữ cảnh qua nhiều phiên làm việc.',
    purposeVi: 'Thông thường mỗi khi kết thúc một cuộc hội thoại, AI sẽ quên sạch ngữ cảnh của phiên làm việc trước. Máy chủ Memory giải quyết triệt để vấn đề này bằng cách tự động lưu trữ các thực thể, mối quan hệ và sự kiện vào đồ thị tri thức cục bộ, giúp AI tích lũy trí nhớ dài hạn theo thời gian.',
    featuresVi: [
      'Tạo và cập nhật thực thể (Entities), thuộc tính và mối quan hệ (Relations).',
      'Truy hồi tri thức liên quan khi người dùng nhắc đến các chủ đề cũ.',
      'Lưu trữ dữ liệu cục bộ an toàn dưới định dạng JSON trên máy tính cá nhân.',
      'Xây dựng hồ sơ người dùng cá nhân hóa theo thời gian.'
    ],
    installGuideVi: `1. Cài đặt Node.js 18 trở lên.
2. Thêm cấu hình bên dưới vào tệp claude_desktop_config.json.
3. Bộ nhớ đồ thị sẽ được tự động tạo và lưu trữ an toàn trong thư mục ứng dụng của bạn.`,
    usageGuideVi: `Trong khi nói chuyện, bạn có thể nói 'Hãy nhớ rằng tôi luôn lập trình bằng TypeScript và thích dùng Tailwind CSS'. AI sẽ tự động trích xuất thông tin này và lưu vào bộ nhớ đồ thị để sử dụng cho mọi phiên làm việc tiếp theo.`,
    samplePromptsVi: [
      'Hãy ghi nhớ rằng tôi là kỹ sư phần mềm, dự án hiện tại của tôi tên là AI Hub.',
      'Bạn còn nhớ những công nghệ và quy chuẩn giao diện mà tôi đã chọn cho dự án trước không?',
      'Hãy tóm tắt lại toàn bộ những gì bạn đã ghi nhớ về phong cách viết mã nguồn của tôi.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'npx -y @modelcontextprotocol/server-memory',
        jsonConfig: JSON.stringify({
          mcpServers: {
            memory: {
              command: "npx",
              args: ["-y", "@modelcontextprotocol/server-memory"]
            }
          }
        }, null, 2)
      }
    ]
  },
  {
    id: 'tool-content-03',
    slug: 'yahoo-finance-mcp',
    name: 'Yahoo Finance Market Data MCP',
    icon: 'Layers',
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP',
    category: 'content',
    categoryNameVi: 'Viết lách & Bộ nhớ',
    platforms: ['claude_desktop', 'antigravity'],
    sourceUrl: 'https://github.com/mcp-servers/yahoo-finance',
    authorName: 'MCP Community',
    license: 'MIT',
    stars: 202,
    featured: false,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Tra cứu giá cổ phiếu, chỉ số tài chính, lịch sử giao dịch và tin tức thị trường chứng khoán từ Yahoo Finance.',
    purposeVi: 'Hỗ trợ các nhà đầu tư cá nhân và chuyên viên phân tích tài chính truy xuất tức thời dữ liệu thị trường, phân tích báo cáo tài chính doanh nghiệp và theo dõi biến động danh mục đầu tư.',
    featuresVi: [
      'Tra cứu giá thị trường thời gian thực cho cổ phiếu, quỹ ETF và tiền điện tử.',
      'Lấy dữ liệu lịch sử giá (Historical Price Data) để vẽ biểu đồ kỹ thuật.',
      'Trích xuất các chỉ số định giá tài chính cốt lõi: P/E, P/B, ROE, EPS.',
      'Cập nhật tin tức tài chính mới nhất liên quan đến mã chứng khoán chỉ định.'
    ],
    installGuideVi: `1. Cài đặt nhanh qua uvx hoặc npx.
2. Thêm vào cấu hình JSON của bạn.
3. Không yêu cầu mã API Key trả phí.`,
    usageGuideVi: `Yêu cầu AI: 'Lấy giá cổ phiếu của Apple (AAPL) hôm nay và tóm tắt tình hình tài chính quý gần nhất'.`,
    samplePromptsVi: [
      'So sánh chỉ số P/E giữa Microsoft (MSFT) và Alphabet (GOOGL) hiện tại.',
      'Lấy lịch sử giá đóng cửa của quỹ S&P 500 (SPY) trong 30 ngày qua.',
      'Tóm tắt các tin tức tài chính mới nhất ảnh hưởng đến giá cổ phiếu của Tesla.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'uvx yahoo-finance-mcp',
        jsonConfig: JSON.stringify({
          mcpServers: {
            yahoo_finance: {
              command: "uvx",
              args: ["yahoo-finance-mcp"]
            }
          }
        }, null, 2)
      }
    ]
  }
];

// Write to src/data/mockTools.ts
const fileContent = `import { AITool, CategoryInfo } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  { id: 'all', nameVi: 'Tất cả lĩnh vực', descriptionVi: 'Toàn bộ kho công cụ và kỹ năng tác tử', icon: 'Layers' },
  { id: 'coding', nameVi: 'Lập trình & Git', descriptionVi: 'Công cụ hỗ trợ viết mã nguồn, gỡ lỗi và quản lý kho lưu trữ', icon: 'Code2' },
  { id: 'database', nameVi: 'Cơ sở dữ liệu', descriptionVi: 'Kết nối và truy vấn CSDL SQLite, PostgreSQL, MongoDB, Redis', icon: 'Database' },
  { id: 'automation', nameVi: 'Tự động hóa & Web', descriptionVi: 'Tự động hóa trình duyệt web, kiểm thử Playwright và cào dữ liệu Firecrawl', icon: 'Workflow' },
  { id: 'search', nameVi: 'Tìm kiếm thông tin', descriptionVi: 'Tra cứu web thời gian thực Brave Search, Exa AI và Context7', icon: 'Search' },
  { id: 'cloud', nameVi: 'Đám mây & Hệ thống', descriptionVi: 'Quản trị tệp tin Filesystem và tài nguyên máy chủ', icon: 'Cloud' },
  { id: 'content', nameVi: 'Viết lách, Âm thanh & Tài chính', descriptionVi: 'Ghi nhớ tri thức Memory, âm thanh ElevenLabs và thị trường', icon: 'Brain' },
];

export const INITIAL_TOOLS: AITool[] = ${JSON.stringify(database, null, 2)};
`;

fs.writeFileSync('src/data/mockTools.ts', fileContent, 'utf-8');
console.log('Successfully updated src/data/mockTools.ts with', database.length, 'rich tools!');
