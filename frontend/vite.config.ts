import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { BRIDGE_TOKEN, handleExecuteCommand, handleKillCommand, handleSystemStatus } from './dev-server/commandBridge.js';
import { toolDataSplitPlugin } from './dev-server/toolDataSplit.js';
import { TOOLS_FILE } from '@aihub/database';

export default defineConfig({
  plugins: [
    react(),
    toolDataSplitPlugin({ dataFile: TOOLS_FILE }),
    {
      name: 'local-command-bridge',
      apply: 'serve',
      // Nhúng mã phiên cầu nối vào trang; trang web khác nguồn không đọc được giá trị này
      transformIndexHtml() {
        return [{ tag: 'meta', attrs: { name: 'aihub-bridge-token', content: BRIDGE_TOKEN }, injectTo: 'head' }];
      },
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/api/execute-command' && req.method === 'POST') {
            return handleExecuteCommand(req, res);
          }
          if (req.url === '/api/kill-command' && req.method === 'POST') {
            return handleKillCommand(req, res);
          }
          if (req.url === '/api/system-status' && req.method === 'GET') {
            return handleSystemStatus(req, res);
          }
          next();
        });
      }
    }
  ],
  server: {
    port: 3000,
    host: '127.0.0.1',
    open: false,
  },
});
