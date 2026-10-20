import fs from 'node:fs';

// Từ điển dịch thuật và thay thế cụm từ kỹ thuật
const phraseReplacements = [
  [/Use this agent when conducting comprehensive accessibility audits, WCAG 2\.2/gi, 'Sử dụng tác tử này khi thực hiện kiểm toán toàn diện về khả năng tiếp cận, kiểm tra tuân thủ tiêu chuẩn WCAG 2.2'],
  [/Use this agent when/gi, 'Sử dụng tác tử này khi'],
  [/Use when you want to/gi, 'Sử dụng khi bạn muốn'],
  [/Use when the user asks to/gi, 'Sử dụng khi người dùng yêu cầu'],
  [/Use when/gi, 'Sử dụng khi'],
  [/A Model Context Protocol server that provides/gi, 'Máy chủ Model Context Protocol cung cấp'],
  [/A Model Context Protocol \(MCP\) server that/gi, 'Máy chủ Model Context Protocol (MCP) hỗ trợ'],
  [/An MCP server that enables/gi, 'Máy chủ MCP cho phép'],
  [/An MCP server that/gi, 'Máy chủ MCP hỗ trợ'],
  [/An MCP server for/gi, 'Máy chủ MCP chuyên trách'],
  [/Official ElevenLabs MCP for text-to-speech, voice cloning, audio processing/gi, 'Máy chủ MCP chính thức từ ElevenLabs hỗ trợ chuyển văn bản thành giọng nói, nhân bản giọng đọc và xử lý âm thanh'],
  [/Official MongoDB MCP Server by MongoDB\. Connect to MongoDB/gi, 'Máy chủ MCP chính thức từ MongoDB kết nối với cơ sở dữ liệu MongoDB'],
  [/Official Redis MCP Server providing natural language interface/gi, 'Máy chủ MCP chính thức từ Redis cung cấp giao diện ngôn ngữ tự nhiên'],
  [/Zero-dependency, token-efficient database MCP server/gi, 'Máy chủ MCP cơ sở dữ liệu không phụ thuộc thư viện ngoài, tối ưu hóa bộ nhớ token'],
  [/Connect your Claude Code to Supabase using MCP/gi, 'Kết nối Claude Code với cơ sở dữ liệu Supabase thông qua giao thức MCP'],
  [/Connect to PostgreSQL databases for advanced data operations/gi, 'Kết nối cơ sở dữ liệu PostgreSQL cho các thao tác dữ liệu nâng cao'],
  [/Connect to MySQL databases for direct data access, queries/gi, 'Kết nối cơ sở dữ liệu MySQL để truy xuất dữ liệu trực tiếp và thực thi truy vấn'],
  [/PostgreSQL documentation and skills for writing better/gi, 'Tài liệu hướng dẫn và kỹ năng lập trình tối ưu hóa'],
  [/MCP server for interacting with Neon Management API/gi, 'Máy chủ MCP tương tác với giao diện quản trị Neon API'],
  [/With Browser MCP, you can use MCP to automate your browser/gi, 'Tự động hóa trình duyệt web thông qua giao thức ngữ cảnh MCP'],
  [/This server provides cloud browser automation capabilities/gi, 'Cung cấp năng lực tự động hóa trình duyệt đám mây'],
  [/Create, manage, and orchestrate AI agents using/gi, 'Khởi tạo, quản lý và điều phối các tác tử AI bằng'],
  [/Send and receive cryptographically signed messages between/gi, 'Gửi và nhận các thông điệp có chữ ký mã hóa giữa'],
  [/Search auto-generated codebase documentation for/gi, 'Tìm kiếm trong kho tài liệu mã nguồn tự động sinh về'],
  [/Query the code graph database to understand component/gi, 'Truy vấn đồ thị mã nguồn để hiểu mối quan hệ giữa các thành phần'],
  [/Search conversation history and semantic memory to recall/gi, 'Tìm kiếm lịch sử hội thoại và bộ nhớ ngữ nghĩa để truy hồi'],
  [/Create and manage persistent markdown planning files for/gi, 'Tạo và quản lý các tệp kế hoạch Markdown dài hạn cho'],
  [/Testing and benchmarking LLM agents including behavioral/gi, 'Kiểm thử và đánh giá hiệu năng tác tử ngôn ngữ lớn bao gồm hành vi'],
  [/Manage multiple local CLI agents via tmux sessions/gi, 'Quản lý nhiều tác tử dòng lệnh cục bộ qua các phiên tmux'],
  [/A hybrid memory system that provides persistent, searchable/gi, 'Hệ thống bộ nhớ lai cung cấp khả năng tìm kiếm và lưu trữ dài hạn'],
  [/Memory is the cornerstone of intelligent agents/gi, 'Bộ nhớ là nền tảng cốt lõi của các tác tử thông minh'],
  [/Automatically loads AGENTS\.md configuration file content at session start/gi, 'Tự động nạp nội dung tệp cấu hình AGENTS.md khi bắt đầu phiên làm việc'],
  [/Configure Claude Code to use Amazon Bedrock for AI model access/gi, 'Cấu hình Claude Code kết nối với Amazon Bedrock để truy cập các mô hình trí tuệ nhân tạo'],
  [/Enables enterprise/gi, 'Hỗ trợ tính năng doanh nghiệp'],
  [/Enables LLMs with advanced web scraping capabilities/gi, 'Trang bị cho mô hình AI năng lực cào dữ liệu web nâng cao'],
  [/Enables interaction with/gi, 'Cho phép tương tác trực tiếp với'],
  [/Generate modern UI components instantly from natural language/gi, 'Sinh thành phần giao diện hiện đại tức thì từ mô tả ngôn ngữ tự nhiên'],
  [/Connects to Garmin Connect and exposes fitness and health data/gi, 'Kết nối với Garmin Connect và trích xuất dữ liệu sức khỏe thể thao'],
  [/Connects Claude to FL Studio, enabling AI-driven music creation/gi, 'Kết nối Claude với FL Studio, hỗ trợ sáng tác âm nhạc bằng trí tuệ nhân tạo'],
  [/Integrates a Model Context Protocol server into Blockbench/gi, 'Tích hợp máy chủ MCP vào phần mềm Blockbench để dựng mô hình 3D'],
  [/Enables AI agents to directly manipulate CapCut project files/gi, 'Cho phép tác tử AI chỉnh sửa trực tiếp các tệp dự án CapCut'],
  [/Provides access to Google Search Console data through/gi, 'Cung cấp quyền truy cập dữ liệu Google Search Console thông qua'],
  [/Fetches stock data, news, and financial information from/gi, 'Thu thập dữ liệu chứng khoán, tin tức và chỉ số tài chính từ'],
  [/Empower coding agents to deeply inspect and understand software/gi, 'Trang bị cho tác tử lập trình năng lực dịch ngược và phân tích sâu phần mềm'],
  [/Empowers AI coding agents with a comprehensive and structured/gi, 'Cung cấp cho tác tử AI quy trình phát triển phần mềm chuẩn mực'],
  [/Provides real-time global intelligence through AI-powered news/gi, 'Cung cấp thông tin tình báo toàn cầu thời gian thực qua tổng hợp tin tức AI'],
  [/Orchestrates intelligent multi-agent swarms for Claude/gi, 'Điều phối bầy đàn đa tác tử thông minh cho Claude'],
  [/Facilitates spec-driven development to ensure alignment/gi, 'Hỗ trợ phát triển phần mềm theo hướng đặc tả kỹ thuật'],
  [/Fetches up-to-date documentation and code examples/gi, 'Cung cấp tài liệu kỹ thuật và ví dụ mã nguồn mới nhất'],
  [/Query curated perfume knowledge, fragrance notes/gi, 'Tra cứu kiến thức nước hoa, nốt hương và hồ sơ mùi hương'],
  [/Search live ticket inventory and retrieve real-time event/gi, 'Tìm kiếm kho vé sự kiện và cập nhật giá vé thời gian thực'],
];

// Từ điển thay thế từ đơn
const wordDictionary = {
  'conduct': 'thực hiện',
  'conducting': 'thực hiện',
  'comprehensive': 'toàn diện',
  'accessibility': 'khả năng tiếp cận',
  'audits': 'kiểm toán',
  'audit': 'kiểm toán',
  'compliance': 'tuân thủ',
  'automated': 'tự động',
  'automation': 'tự động hóa',
  'browser': 'trình duyệt',
  'database': 'cơ sở dữ liệu',
  'databases': 'cơ sở dữ liệu',
  'developer': 'nhà phát triển',
  'development': 'phát triển phần mềm',
  'framework': 'khung phát triển',
  'frameworks': 'khung phát triển',
  'interface': 'giao diện',
  'interfaces': 'giao diện',
  'management': 'quản lý',
  'monitoring': 'giám sát',
  'orchestration': 'điều phối',
  'performance': 'hiệu năng',
  'protocol': 'giao thức',
  'protocols': 'giao thức',
  'server': 'máy chủ',
  'servers': 'máy chủ',
  'service': 'dịch vụ',
  'services': 'dịch vụ',
  'testing': 'kiểm thử',
  'workflow': 'quy trình làm việc',
  'workflows': 'quy trình làm việc',
  'knowledge': 'tri thức',
  'generation': 'tạo lập',
  'integration': 'tích hợp',
  'analysis': 'phân tích',
  'analytics': 'phân tích số liệu',
  'evaluation': 'đánh giá',
  'security': 'an toàn bảo mật',
  'system': 'hệ thống',
  'systems': 'hệ thống',
  'documentation': 'tài liệu kỹ thuật',
  'specification': 'đặc tả kỹ thuật',
  'configuration': 'cấu hình',
  'settings': 'thiết lập',
  'utility': 'tiện ích',
  'utilities': 'tiện ích',
  'assistant': 'trợ lý',
  'assistants': 'trợ lý',
  'execution': 'thực thi',
  'extraction': 'trích xuất',
  'processing': 'xử lý',
  'deployment': 'triển khai',
  'architecture': 'kiến trúc',
  'optimization': 'tối ưu hóa',
  'repository': 'kho lưu trữ',
  'repositories': 'kho lưu trữ'
};

function translateText(text) {
  if (!text) return '';
  let result = text;

  // 1. Thay thế các cụm câu dài trước
  for (const [pattern, replacement] of phraseReplacements) {
    result = result.replace(pattern, replacement);
  }

  // 2. Dọn dẹp các mẫu câu tiếng Anh thường gặp ở đầu
  result = result
    .replace(/^"use this agent when/gi, 'Sử dụng tác tử này khi')
    .replace(/^use this agent when/gi, 'Sử dụng tác tử này khi')
    .replace(/^use when/gi, 'Sử dụng khi')
    .replace(/^a model context protocol server/gi, 'Máy chủ giao thức ngữ cảnh mô hình')
    .replace(/^an mcp server/gi, 'Máy chủ MCP')
    .replace(/^provides/gi, 'Cung cấp năng lực')
    .replace(/^enables/gi, 'Cho phép')
    .replace(/^automates/gi, 'Tự động hóa')
    .replace(/^connects to/gi, 'Kết nối với')
    .replace(/^connect to/gi, 'Kết nối với')
    .replace(/^integrates/gi, 'Tích hợp')
    .replace(/^query/gi, 'Truy vấn')
    .replace(/^searches/gi, 'Tìm kiếm')
    .replace(/^search/gi, 'Tìm kiếm')
    .replace(/^creates/gi, 'Khởi tạo')
    .replace(/^create/gi, 'Khởi tạo')
    .replace(/^manages/gi, 'Quản lý')
    .replace(/^manage/gi, 'Quản lý');

  // Dọn dẹp dấu ngoặc kép thừa
  result = result.replace(/^"+|"+$/g, '').trim();

  return result;
}

console.log('Test translation 1:');
console.log(translateText('Use this agent when conducting comprehensive accessibility audits, WCAG 2.2 compliance...'));
console.log('\nTest translation 2:');
console.log(translateText('An MCP server that enables AI agents to control web browsers and extract data.'));
