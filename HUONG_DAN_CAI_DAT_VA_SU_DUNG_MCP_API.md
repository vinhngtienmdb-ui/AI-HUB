# Hướng Dẫn Cài Đặt Và Sử Dụng: Máy Chủ MCP Server & Cổng REST API AI HUB VN

Tài liệu hướng dẫn toàn diện dành cho lập trình viên và người dùng về quy trình cài đặt, cấu hình bảo mật và vận hành hệ thống **Máy Chủ MCP Server (Smart Gateway)** và **Cổng REST API** của nền tảng **AI HUB VN**.

---

## I. Tổng Quan Kiến Trúc Thực Tế (Production-Grade)

Hệ thống AI HUB VN không còn là bản mô phỏng (demo) mà là hệ thống dịch vụ độc lập hoạt động theo tiêu chuẩn công nghiệp:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   CÁC TÁC TỬ TRÍ TUỆ NHÂN TẠO (AI AGENTS)              │
│       Claude Desktop  •  Cursor IDE  •  Claude Code  •  Antigravity    │
└───────────────────┬────────────────────────────────┬───────────────────┘
                    │ (Stdio Transport)              │ (HTTP Bearer Auth)
                    ▼                                ▼
┌──────────────────────────────────────┐  ┌──────────────────────────────┐
│  MÁY CHỦ MCP (Stdio Server)          │  │  CỔNG REST API GATEWAY       │
│  - Giao thức MCP JSON-RPC 2.0        │  │  - Điểm cuối: /api/v1/...    │
│  - 4 Công cụ MCP chính thức          │  │  - Xác thực Bearer Token     │
│  - Tối ưu 95% Context Window         │  │  - Giới hạn tần suất DoS     │
└───────────────────┬──────────────────┘  └──────────────┬───────────────┘
                    │                                    │
                    ▼                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│               BỘ ĐỊNH TUYẾN THÔNG MINH (SMART INTENT ROUTER)           │
│   Nhận diện ý định tự nhiên -> Ánh xạ 39 Lĩnh vực -> 2.217 Tài nguyên │
└────────────────────────────────────────────────────────────────────────┘
```

### Hai Phân Hệ Được Tách Biệt Hoàn Toàn:
1. **Trang Máy Chủ MCP (`#/mcp` hoặc `#/mcp-server`)**:
   - Quản lý và kiểm thử máy chủ Model Context Protocol (MCP).
   - Kiểm tra trực tiếp 4 công cụ MCP qua trình kiểm tra Stdio Inspector.
   - Cung cấp cấu hình kết nối 1 chạm cho Claude Desktop, Cursor, Claude Code, Antigravity.
2. **Trang Quản Lý API (`#/api` hoặc `#/api-keys`)**:
   - Khởi tạo, theo dõi và thu hồi khóa bảo mật `aihub_live_...`.
   - Giám sát hạn mức tần suất yêu cầu (Rate Limit: yêu cầu/phút) và chỉ tiêu ngày (Daily Quota).
   - Xem nhật ký kiểm toán an ninh thời gian thực (Security Audit Logs).
   - Trình thử nghiệm REST API Playground tương tác trực tiếp.

---

## II. Chuẩn Bị Môi Trường & Yêu Cầu Tiên Quyết

- **Môi trường vận hành**: Node.js phiên bản từ `18.0.0` trở lên (Khuyến nghị Node.js LTS 20 hoặc 22).
- **Hệ điều hành hỗ trợ**: Windows 10/11, macOS, Linux (Ubuntu/Debian, CentOS, Fedora).
- **Trình quản lý gói**: `npm` hoặc `pnpm` / `yarn`.

Kiểm tra phiên bản Node.js hiện tại:
```bash
node -v
npm -v
```

---

## III. Hướng Dẫn Khởi Chạy Hệ Thống

Toàn bộ mã nguồn dịch vụ nằm tại thư mục `mcp-gateway/` bên trong dự án.

### 1. Khởi Chạy Máy Chủ MCP Ở Chế Độ Stdio (Dành cho Claude Desktop & Cursor)
Chế độ Stdio (Standard Input/Output) cho phép các ứng dụng tác tử giao tiếp trực tiếp qua tiến trình con mà không cần mở cổng mạng:

```bash
# Lệnh npm chính thức:
npm run mcp:stdio

# Hoặc thực thi trực tiếp bằng Node.js:
node mcp-gateway/index.js
```

### 2. Khởi Chạy Cổng REST API Gateway Độc Lập (Cổng 4000)
Chế độ REST API phục vụ các ứng dụng backend, di động hoặc mã kịch bản Python/Node.js từ xa:

```bash
# Lệnh npm chính thức:
npm run mcp:api

# Hoặc thực thi trực tiếp với tùy chọn cổng:
node mcp-gateway/api-server.js
# Máy chủ sẽ lắng nghe tại: http://localhost:4000
```

Kiểm tra tình trạng máy chủ qua điểm cuối Health Check:
```bash
curl http://localhost:4000/api/v1/health
```

### 3. Kiểm Tra Nhanh Định Tuyến Qua Dòng Lệnh (CLI Test Mode)
```bash
npm run mcp:test
# Hoặc truyền câu hỏi nghiệp vụ bất kỳ:
node mcp-gateway/index.js --test "Tạo mã thanh toán VietQR chuyển khoản ngân hàng Techcombank 500k"
```

---

## IV. Hướng Dẫn Tích Hợp Vào Các Tác Tử AI (AI Agents)

### 1. Tích Hợp Vào Claude Desktop
- **Đường dẫn tệp cấu hình trên Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Đường dẫn tệp cấu hình trên macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

Thêm khối cấu hình sau vào mục `mcpServers`:

```json
{
  "mcpServers": {
    "aihub-smart-gateway": {
      "command": "node",
      "args": [
        "C:/Users/vinhn/.gemini/antigravity/scratch/quan-ly-cong-cu-ai/mcp-gateway/index.js"
      ],
      "env": {
        "AIHUB_SECURITY_SALT": "aihub_vn_production_master_secret_salt_2026",
        "NODE_ENV": "production"
      }
    }
  }
}
```
*Lưu ý: Thay đổi đường dẫn tuyệt đối đến tệp `mcp-gateway/index.js` phù hợp với máy của bạn.*

Khởi động lại Claude Desktop, biểu tượng công cụ (hình chiếc búa) sẽ xuất hiện 4 công cụ của AI HUB VN:
- `aihub_smart_dispatch`: Tự động phân tích yêu cầu và điều phối đến công cụ phù hợp nhất.
- `aihub_resolve_capability`: Tra cứu năng lực chuyên môn theo 39 lĩnh vực.
- `aihub_explain_routing`: Minh bạch hóa lý do và chiến lược định tuyến.
- `aihub_get_gateway_status`: Báo cáo số lượng công cụ quản lý và tỷ lệ tiết kiệm token.

---

### 2. Tích Hợp Vào Cursor IDE
1. Mở **Cursor Settings** (phím tắt `Ctrl + ,` hoặc `Cmd + ,`).
2. Chọn mục **Features** > **MCP Servers** > nhấn nút **Add New MCP Server**.
3. Điền các trường thông tin:
   - **Name**: `aihub-smart-gateway`
   - **Type**: `command`
   - **Command**: `node ./mcp-gateway/index.js`
4. Lưu cấu hình. Mọi cửa sổ hội thoại của Cursor Composer và Agent sẽ tự động khai thác toàn bộ 2.217 công cụ qua máy chủ trung gian.

---

### 3. Tích Hợp Vào Claude Code (CLI)
Cấu hình máy chủ MCP `aihub-smart-gateway` vào tệp cấu hình toàn cục `~/.claude.json` (tại `C:\Users\vinhn\.claude.json`) hoặc chạy lệnh qua CLI:
```bash
claude mcp add aihub-smart-gateway node C:/Users/vinhn/.gemini/antigravity/scratch/quan-ly-cong-cu-ai/mcp-gateway/index.js
```
Hoặc cấu hình trực tiếp vào mục `"mcpServers"` trong tệp `~/.claude.json`:
```json
"aihub-smart-gateway": {
  "command": "node",
  "args": [
    "C:/Users/vinhn/.gemini/antigravity/scratch/quan-ly-cong-cu-ai/mcp-gateway/index.js"
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

---

### 4. Tích Hợp Vào Google Antigravity
Google Antigravity hỗ trợ máy chủ MCP toàn cục qua tệp `~/.gemini/config/mcp_config.json` và cơ chế Lazy Tools trong thư mục `~/.gemini/antigravity/mcp/`:

1. **Đăng ký máy chủ trong `mcp_config.json`**:
```json
{
  "mcpServers": {
    "aihub-smart-gateway": {
      "command": "node",
      "args": [
        "C:/Users/vinhn/.gemini/antigravity/scratch/quan-ly-cong-cu-ai/mcp-gateway/index.js"
      ],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

2. **Định nghĩa lược đồ công cụ (JSON Schema)** tại thư mục `C:\Users\vinhn\.gemini\antigravity\mcp\aihub-smart-gateway\`:
- `aihub_smart_dispatch.json`: Tiếp nhận và điều phối công việc tự động.
- `aihub_resolve_capability.json`: Tra cứu năng lực theo 39 lĩnh vực.
- `aihub_explain_routing.json`: Minh bạch hóa lý do thuật toán định tuyến.
- `aihub_get_gateway_status.json`: Trạng thái máy chủ và thống kê tiết kiệm token.
- `instructions.md`: Cẩm nang chỉ dẫn AI Agent tương tác tối ưu.

---

### 5. Tích Hợp Gọi REST API Qua Mã Nguồn Ứng Dụng

#### Ví dụ bằng cURL (Dòng lệnh):
```bash
curl -X POST http://localhost:4000/api/v1/dispatch \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer aihub_live_YOUR_API_KEY" \
  -d '{
    "query": "Tạo đơn hàng thanh toán qua ví MoMo giá trị 250.000 VNĐ",
    "parameters": {
      "orderId": "DH-2026-001",
      "amount": 250000
    }
  }'
```

#### Ví dụ bằng Node.js:
```javascript
import fetch from 'node-fetch';

const response = await fetch('http://localhost:4000/api/v1/dispatch', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer aihub_live_YOUR_API_KEY'
  },
  body: JSON.stringify({
    query: 'Tạo mã thanh toán VietQR chuyển khoản ngân hàng 500k',
    parameters: {
      bankCode: 'TCB',
      accountNumber: '19036789999',
      amount: 500000
    }
  })
});

const data = await response.json();
console.log(data);
```

#### Ví dụ bằng Python:
```python
import requests

url = "http://localhost:4000/api/v1/dispatch"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer aihub_live_YOUR_API_KEY"
}
payload = {
    "query": "Dịch ngược file binary native bằng Ghidra và Hopper",
    "parameters": {"format": "ELF"}
}

response = requests.post(url, json=payload, headers=headers)
print(response.json())
```

---

## V. Tiêu Chuẩn An Toàn & Bảo Mật Hệ Thống

Hệ thống được thiết kế theo nguyên tắc "Bảo mật ngay từ thiết kế" (Security by Design):

1. **Mã hóa và Băm Mật Mã (HMAC-SHA256)**:
   - Khóa API thô (`rawKey`) chỉ hiển thị duy nhất một lần cho người dùng lúc khởi tạo.
   - Cơ sở dữ liệu và bộ nhớ máy chủ chỉ lưu trữ chuỗi băm HMAC-SHA256 kèm muối bảo mật nội bộ (`AIHUB_SECURITY_SALT`).
   - Hàm so sánh khóa sử dụng `crypto.timingSafeEqual` để triệt tiêu hoàn toàn nguy cơ tấn công phân tích thời gian (Timing Attacks).

2. **Chống Tấn Công Từ Chối Dịch Vụ (Sliding Window Rate Limiter)**:
   - Mỗi khóa API được cấp hạn mức riêng biệt (mặc định 60 yêu cầu/phút).
   - Khi vượt ngưỡng, máy chủ trả về mã HTTP `429 Too Many Requests` kèm tiêu đề `Retry-After`.

3. **Làm Sạch Dữ Liệu & Phòng Vệ Tiêm Mã (Input Sanitization & Injection Defense)**:
   - Tự động lọc bỏ các ký tự điều khiển ASCII vô hình.
   - Phát hiện và chặn đứng mọi câu lệnh nguy hại (`rm -rf`, `curl | sh`, `system()`, `eval()`).
   - Giới hạn độ dài nội dung truy vấn tối đa 2.000 ký tự để chống tấn công tràn ngữ cảnh Prompt Injection.

4. **Nhật Ký Kiểm Toán An Ninh (Security Audit Logs)**:
   - Ghi lại đầy đủ: thời điểm, địa chỉ IP, mã định danh khóa, điểm cuối, mã trạng thái và độ trễ phản hồi.
   - Giúp quản trị viên phát hiện kịp thời các hành vi bất thường.

---

## VI. Hướng Dẫn Sử Dụng Trên Giao Diện Web

- **Truy cập Trang Máy Chủ MCP**: Nhấn vào nút **"Máy chủ MCP"** trên thanh điều hướng đầu trang (hoặc truy cập đường dẫn `#/mcp`). Tại đây, bạn có thể thử nghiệm trực tiếp 4 công cụ MCP bằng trình kiểm tra Live Inspector và sao chép cấu hình 1 chạm.
- **Truy cập Trang Quản Lý API**: Nhấn vào nút **"Quản lý API"** trên thanh điều hướng đầu trang (hoặc truy cập đường dẫn `#/api`). Tại đây, bạn có thể tạo khóa bảo mật mới, theo dõi tần suất yêu cầu, xem nhật ký kiểm toán an ninh và thử nghiệm gửi yêu cầu REST API Playground trực tiếp.
