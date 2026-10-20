# 14. Đặc Tả Giao Diện Lập Trình Ứng Dụng (API): Hệ Thống Quản Lý Và Tra Cứu Công Cụ Trí Tuệ Nhân Tạo

---

## 1. Mục Đích
Tài liệu này định nghĩa hợp đồng giao tiếp dữ liệu giữa máy khách (Frontend) và máy chủ (Backend), bao gồm danh sách các điểm cuối (Endpoints), phương thức HTTP, tham số gửi đi, định dạng phản hồi và quy chuẩn mã lỗi.

---

## 2. Quy Chuẩn Chung Của Hệ Thống API

- **Định dạng dữ liệu**: `application/json; charset=utf-8` cho tất cả các yêu cầu và phản hồi.
- **Tiền tố đường dẫn**: `/api/v1`
- **Cấu trúc phản hồi chuẩn mực**:
  - Khi thành công:
    ```json
    {
      "success": true,
      "data": { ... },
      "meta": { "total": 100, "page": 1, "limit": 12 }
    }
    ```
  - Khi phát sinh lỗi:
    ```json
    {
      "success": false,
      "error": {
        "code": "VALIDATION_ERROR",
        "message": "Thông báo lỗi chi tiết bằng tiếng Việt",
        "details": [ ... ]
      }
    }
    ```

---

## 3. Danh Sách Các Điểm Cuối (Endpoints)

### 3.1. Điểm cuối `GET /api/v1/tools`
- **Mục đích**: Lấy danh sách công cụ đã xuất bản kèm tính năng tìm kiếm và lọc.
- **Quyền hạn truy cập**: Công khai (Tất cả người dùng).
- **Tham số truy vấn (Query Parameters)**:
  - `q` (chuỗi, tùy chọn): Từ khóa tìm kiếm.
  - `category` (chuỗi, tùy chọn): Đường dẫn định danh danh mục.
  - `platform` (chuỗi, tùy chọn): Nền tảng (ví dụ: `claude_desktop`, `antigravity`).
  - `tool_type` (chuỗi, tùy chọn): Loại hình (`mcp`, `skill`, `template`).
  - `page` (số nguyên, mặc định 1): Số trang.
  - `limit` (số nguyên, mặc định 12): Số lượng bản ghi mỗi trang.
- **Mã phản hồi thành công**: `200 OK`.

### 3.2. Điểm cuối `GET /api/v1/tools/:slug`
- **Mục đích**: Lấy thông tin chi tiết đầy đủ của một công cụ (bao gồm 4 khối thông tin và cấu hình mẫu).
- **Quyền hạn truy cập**: Công khai đối với công cụ `published`; Yêu cầu quyền Quản trị viên đối với các trạng thái khác.
- **Tham số đường dẫn**: `slug` (chuỗi đường dẫn định danh).
- **Mã phản hồi thành công**: `200 OK`.
- **Dữ liệu phản hồi mẫu**:
  ```json
  {
    "success": true,
    "data": {
      "id": "uuid-001",
      "slug": "mcp-server-sqlite",
      "name": "SQLite MCP Server",
      "tool_type": "mcp",
      "source_url": "https://github.com/modelcontextprotocol/servers/tree/main/src/sqlite",
      "author_name": "Anthropic Community",
      "license": "MIT",
      "purpose_vi": "Cho phép các tác tử trí tuệ nhân tạo đọc, phân tích và thực thi truy vấn trực tiếp trên các tệp cơ sở dữ liệu SQLite cục bộ một cách an toàn.",
      "install_guide_vi": "Cài đặt thông qua lệnh chạy nhanh hoặc thêm vào tệp cấu hình JSON.",
      "usage_guide_vi": "Yêu cầu tác tử: 'Hãy liệt kê toàn bộ các bảng trong tệp cơ sở dữ liệu và đếm số lượng bản ghi của từng bảng.'",
      "configs": [
        {
          "platform": "claude_desktop",
          "cli_command": "npx -y @modelcontextprotocol/server-sqlite /duong-dan/csdl.db",
          "json_config": "{\n  \"mcpServers\": {\n    \"sqlite\": {\n      \"command\": \"npx\",\n      \"args\": [\"-y\", \"@modelcontextprotocol/server-sqlite\", \"/duong-dan/csdl.db\"]\n    }\n  }\n}"
        }
      ]
    }
  }
  ```

### 3.3. Điểm cuối `POST /api/v1/tools`
- **Mục đích**: Người dùng gửi đề xuất công cụ mới vào hàng đợi duyệt.
- **Quyền hạn truy cập**: Thành viên đã xác thực.
- **Dữ liệu gửi lên (Request Body)**:
  - Bắt buộc đủ 4 trường: `source_url`, `purpose_vi`, `install_guide_vi`, `usage_guide_vi`, cùng với `name`, `tool_type`, `category_id` và mảng cấu hình `configs`.
- **Mã phản hồi thành công**: `201 Created`.

### 3.4. Điểm cuối `PATCH /api/v1/admin/tools/:id/status`
- **Mục đích**: Quản trị viên cập nhật trạng thái xuất bản, phê duyệt hoặc từ chối.
- **Quyền hạn truy cập**: Quản trị viên (Admin).
- **Dữ liệu gửi lên**:
  - `status`: Giá trị mới (`published`, `rejected`, `archived`).
  - `rejection_reason`: Lý do nếu từ chối.
- **Mã phản hồi thành công**: `200 OK`.

### 3.5. Điểm cuối `POST /api/v1/admin/tools/:id/health-check`
- **Mục đích**: Kích hoạt kiểm tra kết nối trực tiếp đến liên kết nguồn của công cụ.
- **Quyền hạn truy cập**: Quản trị viên.
- **Mã phản hồi thành công**: `200 OK` (kèm trạng thái kết nối HTTP trả về: `healthy` hoặc `broken`).

### 3.6. Điểm cuối `POST /api/execute-command`
- **Mục đích**: Thực thi lệnh dòng lệnh (CLI) trên máy cục bộ với danh sách trắng an toàn và truyền luồng kết quả (Streaming output).
- **Quyền hạn truy cập**: Chỉ chấp nhận kết nối nội bộ từ máy cục bộ (`localhost` / `127.0.0.1`).
- **Dữ liệu gửi lên (Request Body)**:
  ```json
  {
    "command": "npx -y @modelcontextprotocol/server-sqlite --help"
  }
  ```
- **Phản hồi**: Luồng sự kiện truyền theo thời gian thực (`text/event-stream` hoặc chunked SSE) chứa các sự kiện `start`, `stdout`, `stderr`, `exit`, `error`.

### 3.7. Điểm cuối `POST /api/kill-command`
- **Mục đích**: Dừng tiến trình con đang chạy theo mã định danh tiến trình (`pid`).
- **Dữ liệu gửi lên**:
  ```json
  {
    "pid": 12345
  }
  ```
- **Mã phản hồi thành công**: `200 OK`.

### 3.8. Điểm cuối `GET /api/system-status`
- **Mục đích**: Kiểm tra tình trạng môi trường máy tính cục bộ (Phiên bản Node.js, trạng thái cài đặt của `claude`, `npx`, `npm`, `git`, `python`).
- **Mã phản hồi thành công**: `200 OK` kèm thông tin môi trường.

---

## 4. Bảng Quy Chuẩn Mã Lỗi Hệ Thống

| Mã HTTP | Mã Lỗi Hệ Thống | Ý Nghĩa / Diễn Giải Tiếng Việt |
| :--- | :--- | :--- |
| `400` | `INVALID_INPUT` | Dữ liệu đầu vào không đúng định dạng hoặc thiếu trường bắt buộc. |
| `400` | `INVALID_JSON_CONFIG` | Đoạn mã cấu hình JSON mẫu có lỗi cú pháp. |
| `401` | `UNAUTHORIZED` | Người dùng chưa đăng nhập hoặc phiên làm việc đã hết hạn. |
| `403` | `FORBIDDEN` | Tài khoản không có đủ thẩm quyền truy cập (yêu cầu quyền quản trị). |
| `404` | `TOOL_NOT_FOUND` | Không tìm thấy công cụ hoặc công cụ chưa được xuất bản. |
| `500` | `INTERNAL_SERVER_ERROR` | Lỗi phát sinh trong quá trình xử lý nội bộ của máy chủ. |
