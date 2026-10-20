const fs = require('fs');
const path = require('path');

const toolsPath = path.join(__dirname, '../src/data/allTools.json');
const tools = JSON.parse(fs.readFileSync(toolsPath, 'utf8'));

const batch6Ids = [
  "vn-repo-basevn-open-api",
  "vn-repo-stringee-communication-sdk",
  "vn-repo-esms-brandname-otp-api",
  "vn-repo-tiktok-shop-partner-api",
  "vn-repo-shopee-open-platform-sdk",
  "vn-repo-lazada-open-platform-sdk",
  "vn-repo-vbee-aivoice-tts-api",
  "vn-repo-smartpay-merchant-api",
  "vn-repo-speedsms-api-client",
  "vn-repo-etax-mobile-tra-cuu-mcp"
];

for (const tool of tools) {
  if (batch6Ids.includes(tool.id)) {
    if (!Array.isArray(tool.configs)) {
      const oldCfg = tool.configs || {};
      tool.configs = [
        {
          platform: "claude",
          platformName: "Claude Desktop",
          cliCommand: `npx -y @modelcontextprotocol/inspector`,
          jsonConfig: oldCfg.claude || JSON.stringify({ mcpServers: { [tool.id]: { command: "npx", args: ["-y", tool.id] } } }, null, 2)
        },
        {
          platform: "antigravity",
          platformName: "Google Antigravity",
          cliCommand: `agy skill add ${tool.id}`,
          jsonConfig: oldCfg.antigravity || JSON.stringify({ skills: [{ name: tool.id, endpoint: tool.sourceUrl }] }, null, 2)
        },
        {
          platform: "cursor",
          platformName: "Cursor IDE",
          cliCommand: `npm install ${tool.id}`,
          jsonConfig: oldCfg.cursor || JSON.stringify({ tools: [{ type: "api", name: tool.id, baseUrl: tool.sourceUrl }] }, null, 2)
        }
      ];
    }
  }
}

fs.writeFileSync(toolsPath, JSON.stringify(tools, null, 2), 'utf8');
console.log('Đã chuẩn hóa thành công cấu trúc mảng configs cho toàn bộ 10 công cụ đợt 6.');
