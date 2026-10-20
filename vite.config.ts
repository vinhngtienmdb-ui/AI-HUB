import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { handleExecuteCommand, handleKillCommand, handleSystemStatus } from './server/commandBridge.js';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'local-command-bridge',
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
    open: false,
  },
});
