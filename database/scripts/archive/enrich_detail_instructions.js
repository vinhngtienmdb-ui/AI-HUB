import fs from 'node:fs';

const tools = JSON.parse(fs.readFileSync('src/data/allTools.json', 'utf-8'));
let updatedCount = 0;

for (const tool of tools) {
  let changed = false;

  // 1. Nâng cấp hướng dẫn cài đặt (installGuideVi)
  if (!tool.installGuideVi || tool.installGuideVi.length < 120 || !tool.installGuideVi.includes('Bước 1')) {
    const pkgName = tool.slug.replace(/-mcp$/, '');
    const cliCmd = tool.configs?.[0]?.cliCommand || `npx -y @modelcontextprotocol/server-${pkgName}`;
    
    let envNote = 'Không yêu cầu khóa API bảo mật bổ sung.';
    if (tool.configs?.[0]?.jsonConfig?.includes('"env"')) {
      envNote = 'Yêu cầu điền đầy đủ các mã khóa API (API Key) và cấu hình trong mục "env".';
    }

    tool.installGuideVi = `Bước 1 (Chuẩn bị môi trường): Kiểm tra máy tính đã cài đặt sẵn Node.js (phiên bản 18 trở lên) hoặc Python và Git.
Bước 2 (Cài đặt gói lệnh CLI): Khởi chạy hoặc cài đặt gói mở rộng qua câu lệnh: ${cliCmd}.
Bước 3 (Cấu hình tệp tham số JSON): Sao chép đoạn mã JSON cấu hình bên dưới và dán vào tệp cấu hình của Claude Desktop (claude_desktop_config.json) hoặc Antigravity. ${envNote}
Bước 4 (Khởi động và xác nhận): Tắt hoàn toàn ứng dụng AI và khởi động lại. Kiểm tra biểu tượng công cụ xuất hiện trong danh sách tính năng sẵn sàng.`;
    changed = true;
  }

  // 2. Nâng cấp hướng dẫn sử dụng (usageGuideVi)
  if (!tool.usageGuideVi || tool.usageGuideVi.length < 100 || !tool.usageGuideVi.includes('Kịch bản')) {
    const samplePrompt = tool.samplePromptsVi?.[0] || `Sử dụng ${tool.name} để giải quyết bài toán nghiệp vụ hiện tại.`;
    
    tool.usageGuideVi = `Kịch bản mẫu: Áp dụng trong quy trình phát triển và vận hành hệ thống thông tin.
Yêu cầu AI: '${samplePrompt}'
Kết quả mong đợi: Tác tử AI tự động phân tích ngữ cảnh, kích hoạt các hàm công cụ tương ứng của ${tool.name} và trả về kết quả xử lý chi tiết, chính xác.`;
    changed = true;
  }

  // 3. Đảm bảo demoImages luôn có ít nhất 2 ảnh
  if (!tool.demoImages || tool.demoImages.length < 2) {
    const defaultImg = tool.imageUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80';
    const fallbackImg = 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80';
    tool.demoImages = [defaultImg, fallbackImg];
    changed = true;
  }

  if (changed) {
    updatedCount++;
  }
}

console.log(`Đã nâng cấp hướng dẫn chi tiết và ảnh demo cho ${updatedCount} công cụ.`);
fs.writeFileSync('src/data/allTools.json', JSON.stringify(tools, null, 2), 'utf-8');
console.log('Đã cập nhật thành công src/data/allTools.json với dữ liệu siêu chi tiết!');
