# 02. Phạm Vi Phát Triển Dự Án: Hệ Thống Quản Lý Và Tra Cứu Công Cụ Trí Tuệ Nhân Tạo

---

## 1. Mục Đích
Tài liệu này xác định ranh giới phát triển rõ ràng của dự án: những tính năng và thành phần hệ thống bắt buộc phải xây dựng (phạm vi trong), cùng những tính năng và nghiệp vụ không triển khai trong phiên bản này (phạm vi ngoài).

---

## 2. Phạm Vi Trong (In-Scope - Hệ Thống Bắt Buộc Thực Hiện)

### 2.1. Quản lý danh mục và đối tượng dữ liệu
1. **Phân loại đối tượng công cụ**:
   - Máy chủ giao thức ngữ cảnh mô hình (Model Context Protocol - MCP Servers).
   - Kỹ năng tác tử (Agent Skills).
   - Mẫu cấu hình và kịch bản tác tử (Agent Templates).
   - Công cụ trí tuệ nhân tạo độc lập và ứng dụng web hữu ích.
2. **Cấu trúc 4 trường thông tin bắt buộc cho từng công cụ**:
   - **Liên kết nguồn chính thức**: Bắt buộc dẫn link gốc (Kho mã nguồn GitHub, Trang chủ của tác giả hoặc Cổng tài liệu chính thức).
   - **Công dụng và giải pháp**: Diễn giải bằng tiếng Việt về chức năng, giá trị giải quyết và ngữ cảnh ứng dụng.
   - **Hướng dẫn cài đặt chi tiết**: Các bước thiết lập môi trường, lệnh thực thi (`npx`, `uvx`, `pip`, `docker`) và đoạn mã cấu hình JSON mẫu cho từng nền tảng tương thích.
   - **Hướng dẫn sử dụng thực tế**: Hướng dẫn thao tác bằng tiếng Việt kèm câu lệnh mẫu (Prompts), tình huống thực hành cụ thể.

### 2.2. Phân hệ người dùng công cộng (Frontend)
1. **Trang chủ và Thư viện**:
   - Hiển thị danh sách công cụ dạng lưới (Card Grid) và bảng (List View).
   - Thanh tìm kiếm tức thì theo tên công cụ, từ khóa chức năng, tên tác giả.
   - Bộ lọc đa tiêu chí: Lọc theo nền tảng tương thích (Claude Code, Antigravity, Cursor, Windsurf), lọc theo lĩnh vực chuyên môn (Lập trình, Cơ sở dữ liệu, Đám mây, Văn phòng, Tự động hóa).
   - Thẻ gắn nhãn (Tags) nhận diện nhanh.
2. **Trang chi tiết công cụ**:
   - Hiển thị đầy đủ thông tin nguồn gốc, tác giả, giấy phép, xếp hạng.
   - Trình hiển thị nội dung công dụng, hướng dẫn cài đặt và kịch bản sử dụng bằng tiếng Việt.
   - Trình hiển thị mã cấu hình kèm nút "Sao chép cấu hình một chạm" (One-click Copy) cho từng môi trường (Claude Desktop, Antigravity, Cursor).
3. **Phân hệ đóng góp công cụ từ cộng đồng**:
   - Biểu mẫu trực tuyến cho phép người dùng đề xuất công cụ mới kèm đầy đủ 4 trường thông tin bắt buộc.

### 2.3. Phân hệ quản trị nội dung (Admin Portal)
1. **Quản lý danh sách công cụ**:
   - Thêm mới, chỉnh sửa, ẩn/hiện hoặc xóa công cụ.
   - Kiểm tra tính hợp lệ và sự tồn tại của liên kết nguồn (Link Health Status).
2. **Kiểm duyệt đóng góp**:
   - Tiếp nhận các đề xuất công cụ từ cộng đồng.
   - Thẩm định độ an toàn của liên kết mã nguồn và chất lượng bản dịch hướng dẫn tiếng Việt trước khi phê duyệt xuất bản.
3. **Quản lý danh mục và nhãn (Categories & Tags)**:
   - Thêm bớt và phân nhóm các loại hình công cụ, nền tảng tương thích.

---

## 3. Phạm Vi Ngoài (Out-of-Scope - Chưa Triển Khai Trong Phiên Bản Hiện Tại)

1. **Không tự động cài đặt từ xa lên máy tính người dùng**:
   - Hệ thống không gửi lệnh tự động can thiệp vào máy tính của người dùng nhằm đảm bảo an toàn tuyệt đối về bảo mật thông tin. Hệ thống chỉ cung cấp hướng dẫn và đoạn mã/lệnh để người dùng chủ động chạy trên máy của mình.
2. **Không lưu trữ tệp thực thi nhị phân đóng gói lại**:
   - Hệ thống không đóng vai trò kho lưu trữ tệp nhị phân (`.exe`, `.dmg`, `.zip`) mà luôn định hướng người dùng tải trực tiếp từ nguồn chính thức của tác giả.
3. **Không tích hợp thanh toán và bán công cụ**:
   - Phiên bản này tập trung vào tra cứu, tổng hợp và chia sẻ miễn phí, chưa hỗ trợ cổng thanh toán hoặc giao dịch mua bán bản quyền công cụ.
4. **Không xây dựng ứng dụng di động bản địa (Native App)**:
   - Hệ thống phát triển dưới dạng ứng dụng web đáp ứng (Responsive Web), hỗ trợ hiển thị tối ưu trên cả máy tính bàn, máy tính bảng và trình duyệt điện thoại, chưa phát triển ứng dụng riêng cho iOS hoặc Android.

---

## 4. Tiêu Chuẩn Nghiệm Thu Phạm Vi
- Mọi công cụ hiển thị công khai trên hệ thống đều bắt buộc phải có đầy đủ: Liên kết nguồn chính thức, mô tả công dụng bằng tiếng Việt, hướng dẫn cài đặt bằng tiếng Việt và hướng dẫn sử dụng bằng tiếng Việt.
- Bất kỳ công cụ nào thiếu một trong bốn yếu tố trên sẽ bị hệ thống chặn xuất bản tự động.
