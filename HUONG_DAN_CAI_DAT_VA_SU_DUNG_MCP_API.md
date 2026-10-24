# Hướng Dẫn Cài Đặt Và Sử Dụng: Máy Chủ MCP Server & Cổng REST API AI HUB VN

Tài liệu hướng dẫn toàn diện dành cho lập trình viên và người dùng về quy trình cài đặt, cấu hình bảo mật và vận hành hệ thống **Máy Chủ MCP Server (Smart Gateway)** và **Cổng REST API** của nền tảng **AI HUB VN**.

---

## I. Tổng Quan Kiến Trúc Thực Tế (Production-Grade)

Máy chủ MCP và Cổng REST API là hai tiến trình Node.js chạy trên máy của bạn (hoặc máy chủ riêng). Bản giao diện web triển khai trên Vercel không kèm hai máy chủ này.

```
┌────────────────────────────────────────────────────────────────────────┐
│                   CÁC TÁC TỬ TRÍ TUỆ NHÂN TẠO (AI AGENTS)              │
│              Claude Desktop  •  Cursor IDE  •  Claude Code             │
└───────────────────┬────────────────────────────────┬───────────────────┘
                    │ (Stdio Transport)              │ (HTTP Bearer Auth)
                    ▼                                ▼
┌──────────────────────────────────────┐  ┌──────────────────────────────┐
│  MÁY CHỦ MCP (Stdio Server)          │  │  CỔNG REST API GATEWAY       │
│  - Giao thức MCP JSON-RPC 2.0        │  │  - Điểm cuối: /api/v1/...    │
│  - 4 Công cụ MCP chính thức          │  │  - Xác thực Bearer Token     │
│  - Chỉ trả về công cụ được chọn      │  │  - Giới hạn tần suất DoS     │
└───────────────────┬──────────────────┘  └──────────────┬───────────────┘
                    │                                    │
                    ▼                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│               BỘ ĐỊNH TUYẾN THÔNG MINH (SMART INTENT ROUTER)           │
│  Bảng ý định chuyên biệt -> Chấm điểm từ khóa -> Công cụ đã kiểm duyệt │
└────────────────────────────────────────────────────────────────────────┘
```

### Hai Phân Hệ Được Tách Biệt Hoàn Toàn:
1. **Trang Máy Chủ MCP (`#/mcp` hoặc `#/mcp-server`)**:
   - Quản lý và kiểm thử máy chủ Model Context Protocol (MCP).
   - Kiểm tra trực tiếp 4 công cụ MCP qua trình kiểm tra Stdio Inspector.
   - Cung cấp cấu hình kết nối 1 chạm cho Claude Desktop, Cursor, Claude Code.
2. **Trang Quản Lý API (`#/api` hoặc `#/api-keys`)**: điều khiển Cổng REST API đang chạy (mặc định `http://localhost:4000`) bằng khóa admin.
   - Tạo khóa (khóa thô do máy chủ sinh, chỉ hiển thị một lần) và thu hồi khóa trên máy chủ.
   - Xem số lượt dùng trong ngày so với hạn mức ngày, giới hạn tần suất, ngày hết hạn của từng khóa.
   - Xem số liệu và nhật ký kiểm toán đọc từ máy chủ.
   - Gửi yêu cầu thật tới máy chủ và xem mã trạng thái, thân phản hồi thật.
   - Trang không lưu khóa admin (mất khi tải lại trang) và không hiển thị dữ liệu mẫu; khi không gọi được máy chủ, trang báo lỗi và hướng dẫn khởi động.

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

Toàn bộ mã nguồn dịch vụ nằm tại thư mục `backend/` bên trong dự án. Máy chủ đọc kho dữ liệu `database/data/allTools.json`, nên cần tải toàn bộ kho mã và cài gói ở thư mục gốc:

```bash
git clone https://github.com/vinhngtienmdb-ui/AI-HUB.git
cd AI-HUB
npm install
```

### Cách Máy Chủ Chọn Công Cụ
Mã nguồn: `shared/gateway-core.js` (dùng chung cho máy chủ MCP, Cổng REST API và trang "Máy chủ MCP" trên web, nên cùng một câu hỏi cho cùng một kết quả).

1. **Bảng ý định chuyên biệt** (`shared/core-intents.json`): câu hỏi chứa từ khóa của một nhóm được chuyển thẳng tới công cụ gán cho nhóm đó (`DIRECT_INTENT_MATCH`).
2. **Chấm điểm từ khóa** trên tên, nhãn, mô tả của toàn bộ công cụ đã kiểm duyệt: khớp nguyên từ, cụm từ tiếng Việt ("thiết kế", "tài liệu") khớp nguyên cụm, từ càng hiếm càng nặng. Chỉ chọn khi các từ khớp chiếm ít nhất 50% "lượng thông tin" của câu hỏi và có từ khớp ở tên hoặc nhãn công cụ (`KEYWORD_MATCH`, độ tin cậy tối đa 85%).
3. **Không đủ tin cậy**: trả `NO_CONFIDENT_MATCH`, không tự chọn công cụ, kèm danh sách gợi ý gần nhất và trợ lý làm rõ yêu cầu (`agent-1013`).

Lệnh cài (`quickCliCommand`) và cấu hình mẫu chỉ lấy từ dữ liệu đã kiểm định; công cụ không có lệnh cài thì trả `null`, xem `installGuideVi`.

### 1. Khởi Chạy Máy Chủ MCP Ở Chế Độ Stdio (Dành cho Claude Desktop & Cursor)
Chế độ Stdio (Standard Input/Output) cho phép các ứng dụng tác tử giao tiếp trực tiếp qua tiến trình con mà không cần mở cổng mạng:

```bash
# Lệnh npm chính thức:
npm run mcp:stdio

# Hoặc thực thi trực tiếp bằng Node.js:
node backend/index.js
```

### 2. Khởi Chạy Cổng REST API Gateway Độc Lập (Cổng 4000)
Chế độ REST API phục vụ các ứng dụng backend, di động hoặc mã kịch bản Python/Node.js từ xa:

```bash
# Lệnh npm chính thức:
npm run mcp:api

# Hoặc thực thi trực tiếp với tùy chọn cổng:
node backend/api-server.js
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
node backend/index.js --test "Tạo mã thanh toán VietQR chuyển khoản ngân hàng Techcombank 500k"
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
        "<DUONG_DAN_TOI_AI-HUB>/backend/index.js"
      ],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```
*Lưu ý: Thay đổi đường dẫn tuyệt đối đến tệp `backend/index.js` phù hợp với máy của bạn.*

Khởi động lại Claude Desktop, biểu tượng công cụ (hình chiếc búa) sẽ xuất hiện 4 công cụ của AI HUB VN:
- `aihub_smart_dispatch`: Tự động phân tích yêu cầu và điều phối đến công cụ phù hợp nhất.
- `aihub_resolve_capability`: Tra cứu xem kho có công cụ cho một lĩnh vực, nghiệp vụ hay công nghệ không.
- `aihub_explain_routing`: Minh bạch hóa lý do và chiến lược định tuyến.
- `aihub_get_gateway_status`: Báo cáo số công cụ, số lĩnh vực và các nhóm ý định chuyên biệt (tính từ kho dữ liệu).

---

### 2. Tích Hợp Vào Cursor IDE
1. Mở **Cursor Settings** (phím tắt `Ctrl + ,` hoặc `Cmd + ,`).
2. Chọn mục **Features** > **MCP Servers** > nhấn nút **Add New MCP Server**.
3. Điền các trường thông tin:
   - **Name**: `aihub-smart-gateway`
   - **Type**: `command`
   - **Command**: `node <DUONG_DAN_TOI_AI-HUB>/backend/index.js` (đường dẫn tuyệt đối)
4. Lưu cấu hình. Cursor Composer và Agent gọi được 4 công cụ của máy chủ trung gian.

---

### 3. Tích Hợp Vào Claude Code (CLI)
Cấu hình máy chủ MCP `aihub-smart-gateway` vào tệp cấu hình toàn cục `~/.claude.json` (trên Windows: `%USERPROFILE%\.claude.json`) hoặc chạy lệnh qua CLI:
```bash
claude mcp add aihub-smart-gateway -- node <DUONG_DAN_TOI_AI-HUB>/backend/index.js
```
Hoặc cấu hình trực tiếp vào mục `"mcpServers"` trong tệp `~/.claude.json`:
```json
"aihub-smart-gateway": {
  "command": "node",
  "args": [
    "<DUONG_DAN_TOI_AI-HUB>/backend/index.js"
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

---

### 4. Tích Hợp Gọi REST API Qua Mã Nguồn Ứng Dụng

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

### 5. Tra Cứu Danh Mục Công Cụ Qua REST API (Công Khai, Không Cần Khóa)

Hai điểm cuối chỉ đọc, trả về công cụ đang hiển thị (bản ghi bị ẩn không xuất hiện). Mỗi địa chỉ IP được gọi tối đa 120 lần/phút; vượt ngưỡng trả HTTP `429`, mã `RATE_LIMITED`.

**Danh sách có lọc và phân trang** `GET /api/v1/tools`

| Tham số | Ý nghĩa | Mặc định |
|---|---|---|
| `q` | Từ khóa tìm trong tên, tóm tắt, nhãn | (không lọc) |
| `category` | Mã lĩnh vực, ví dụ `nlp_llm`, `payment_gateway` | (không lọc) |
| `tool_type` (hoặc `type`) | Loại công cụ: `mcp`, `skill`, `agent`, `sdk`, `cli`, `software`, `model`, `dataset`, `api`... | (không lọc) |
| `platform` | Nền tảng trong `platforms` hoặc cấu hình mẫu: `claude_code`, `claude_desktop`, `cursor`, `web`... | (không lọc) |
| `vietnam` | `1` hoặc `true`: chỉ công cụ cho thị trường Việt Nam | (không lọc) |
| `page` | Số trang, từ 1 | `1` |
| `limit` | Số bản ghi mỗi trang, 1–100 | `20` |

Tham số `page`/`limit` sai trả HTTP `400`, mã `INVALID_QUERY`.

```bash
curl "http://localhost:4000/api/v1/tools?tool_type=mcp&vietnam=1&page=1&limit=10"
```

Phản hồi gồm `success`, `total`, `meta` (`total`, `page`, `limit`, `totalPages`) và `tools` (mỗi phần tử có `id`, `name`, `toolType`, `category`, `categories`, `platforms`, `isVietnamMarket`, `descriptionVi`, `license`, `pricingModel`, `linkHealth`, `sourceUrl`, `detailUrl`).

**Chi tiết một công cụ** `GET /api/v1/tools/:id` (nhận mã `id` hoặc `slug`)

```bash
curl http://localhost:4000/api/v1/tools/apache-airflow
```

Trả về `{ "success": true, "data": { ...toàn bộ bản ghi... } }`, gồm hướng dẫn cài đặt, cách dùng, README tiếng Việt và cấu hình mẫu `configs`. Mã không tồn tại hoặc công cụ đã ẩn trả HTTP `404`, mã `TOOL_NOT_FOUND`.

---

## V. Tiêu Chuẩn An Toàn & Bảo Mật Hệ Thống

Hệ thống được thiết kế theo nguyên tắc "Bảo mật ngay từ thiết kế" (Security by Design):

1. **Mã hóa và Băm Mật Mã (HMAC-SHA256)**:
   - Khóa API thô (`rawKey`) chỉ hiển thị duy nhất một lần cho người dùng lúc khởi tạo.
   - Cơ sở dữ liệu và bộ nhớ máy chủ chỉ lưu trữ chuỗi băm HMAC-SHA256 kèm muối bảo mật nội bộ (`AIHUB_SECURITY_SALT`).
   - Hàm so sánh khóa sử dụng `crypto.timingSafeEqual` để triệt tiêu hoàn toàn nguy cơ tấn công phân tích thời gian (Timing Attacks).

2. **Giới Hạn Tần Suất Và Hạn Mức Ngày**:
   - Mỗi khóa có giới hạn tần suất riêng (mặc định 60 yêu cầu/phút, cho phép 1–1.000). Điểm cuối công khai `GET /api/v1/tools` và `GET /api/v1/tools/:id` giới hạn 120 yêu cầu/phút cho mỗi địa chỉ IP. Vượt ngưỡng: HTTP `429`, mã `RATE_LIMITED`, kèm `Retry-After`.
   - Mỗi khóa có hạn mức số lượt `/dispatch` mỗi ngày (mặc định 5.000, cho phép 1–1.000.000), tính theo ngày UTC. Hết hạn mức: HTTP `429`, mã `DAILY_QUOTA_EXCEEDED`.
   - Tham số tạo khóa sai kiểu hoặc ngoài giới hạn (kể cả vai trò khác `developer`/`admin`) bị từ chối với HTTP `400`, mã `INVALID_KEY_OPTIONS`.

3. **Làm Sạch Dữ Liệu & Phòng Vệ Tiêm Mã (Input Sanitization & Injection Defense)**:
   - Tự động lọc bỏ các ký tự điều khiển ASCII vô hình.
   - Phát hiện và chặn đứng mọi câu lệnh nguy hại (`rm -rf`, `curl | sh`, `system()`, `eval()`).
   - Giới hạn độ dài nội dung truy vấn tối đa 2.000 ký tự để chống tấn công tràn ngữ cảnh Prompt Injection.

4. **Phân Quyền Điểm Cuối Quản Trị Và Giới Hạn Mạng**:
   - Các điểm cuối `GET /api/v1/stats`, `GET /api/v1/keys`, `POST /api/v1/keys/generate`, `POST /api/v1/keys/revoke`, `GET /api/v1/audit-logs` bắt buộc tiêu đề `Authorization: Bearer <khóa có vai trò admin>`.
   - Lần đầu khởi chạy `npm run mcp:api` khi chưa có khóa quản trị, máy chủ tự tạo một khóa admin và in ra màn hình **một lần duy nhất**. Hãy lưu lại ngay.
   - Máy chủ mặc định chỉ lắng nghe trên `127.0.0.1`. Chỉ đặt `AIHUB_API_HOST=0.0.0.0` khi triển khai sau reverse proxy HTTPS.
   - Trình duyệt chỉ được gọi API từ trang chạy trên `localhost`; bổ sung nguồn khác qua `AIHUB_ALLOWED_ORIGINS` (phân tách bằng dấu phẩy). Ví dụ dùng trang Quản lý API trên bản triển khai Vercel với máy chủ cục bộ: `AIHUB_ALLOWED_ORIGINS=https://<tên-miền-vercel> npm run mcp:api`. Máy chủ trả lời yêu cầu "Private Network Access" của trình duyệt Chromium cho các nguồn được phép.
   - Tiêu đề `X-Forwarded-For` chỉ được tin cậy khi đặt `AIHUB_TRUST_PROXY=1`.
   - Muối HMAC lấy từ `AIHUB_SECURITY_SALT`; nếu không đặt, hệ thống tự sinh ngẫu nhiên và lưu tại `backend/data/.security-salt`. Thư mục `backend/data/` không được đưa lên kho mã.

5. **Nhật Ký Kiểm Toán An Ninh (Security Audit Logs)**:
   - Ghi lại: thời điểm, địa chỉ IP, mã định danh khóa, điểm cuối, mã trạng thái, độ trễ và kết quả định tuyến. Không ghi nội dung câu hỏi (có thể chứa dữ liệu cá nhân).
   - Lưu trong bộ nhớ, tối đa 500 bản ghi; mất khi khởi động lại máy chủ.
   - `GET /api/v1/stats` chỉ trả số liệu đo được: số khóa, tổng lượt yêu cầu, độ trễ điều phối trung bình kèm số mẫu, thời gian chạy, số công cụ và lĩnh vực.

---

## VI. Hướng Dẫn Sử Dụng Trên Giao Diện Web

- **Truy cập Trang Máy Chủ MCP**: Nhấn vào nút **"Máy chủ MCP"** trên thanh điều hướng đầu trang (hoặc truy cập đường dẫn `#/mcp`). Tại đây, bạn có thể thử 4 công cụ MCP (trang chạy cùng mã định tuyến với máy chủ, ngay trên trình duyệt) và sao chép cấu hình kết nối.
- **Truy cập Trang Quản Lý API**: Nhấn vào nút **"Quản lý API"** trên thanh điều hướng đầu trang (hoặc truy cập đường dẫn `#/api`). Khởi động máy chủ bằng `npm run mcp:api`, nhập địa chỉ máy chủ và khóa admin, bấm **Kết nối**; sau đó tạo, thu hồi khóa, xem số liệu, nhật ký và gửi thử yêu cầu tới máy chủ.
