# Kho Lưu Trữ Script Dữ Liệu (Không Sử Dụng Cho Vận Hành)

Thư mục này lưu các script đã dùng một lần để thu thập, sinh và bổ sung dữ liệu cho `src/data/allTools.json` trong các phiên phát triển trước. Chúng được giữ lại làm tài liệu tham khảo, **không** thuộc quy trình bảo trì.

## Vì sao không được chạy lại

Đã kiểm tra ngày 2026-10-23:

| Nhóm | Tệp | Hậu quả khi chạy lại |
|---|---|---|
| Dựng lại toàn bộ kho dữ liệu | `build_comprehensive_dataset.js`, `rebuild_vietnam_dataset.js`, `expand_massive_dataset*.js` | Ghi đè `allTools.json` từ đầu, **xóa** mọi công cụ bổ sung sau đó. Có số sao sinh ngẫu nhiên (`Math.random()`). |
| Phân loại lại | `sanitize-all-tools.cjs`, `reclassify-and-standardize.cjs`, `reclassify-domains-and-types.cjs`, `enrich_tools_taxonomy.js` | Mỗi script dùng một bộ phân loại riêng; chạy lại thay đổi lĩnh vực của khoảng 2.200 công cụ, xóa các điều chỉnh phân loại hiện tại. |
| Sinh README | `generate-readme-vi.cjs` | Ghi đè README đã được chỉnh sửa sau đó (ví dụ Hindsight) bằng phiên bản cũ. |
| Bổ sung theo đợt | `add-*.cjs`, `add_*.js`, `add-vn-batch*.cjs`, `crawl_and_enrich_*.js`, `enrich_*.js`, `fix-*.cjs` | Dữ liệu viết cứng; nhiều mục trỏ tới repo hoặc gói npm không tồn tại (xem trường `verification` trong dữ liệu). |
| Ghi vào tệp không còn dùng | `build_full_database.js`, `fix_redis.js` | Ghi vào `src/data/mockTools.ts`, tệp này nay chỉ nạp dữ liệu. |
| Khảo sát, cào dữ liệu, gỡ lỗi | `explore.js`, `extract_rsc.js`, `fetch_*.js`, `find_*.js`, `inspect_*.js`, `parse.js`, `analyze_rsc.js`, `test_*.js`, `pdg_page_chunk.js` | Chỉ phục vụ khảo sát nguồn dữ liệu bên ngoài trong quá trình phát triển. |
| Dữ liệu trung gian | `pdg_components.json`, `pdg_vi_manifest.json`, `mcp_server_urls.json` | Đầu vào của các script trên. |
| Chụp ảnh giao diện | `capture_screenshot.cjs` | Cần gói `playwright` không có trong `package.json`. |

Các script dùng đường dẫn tương đối theo vị trí cũ (`scripts/`). Sau khi chuyển vào `scripts/archive/`, phần lớn sẽ báo lỗi không tìm thấy tệp thay vì ghi đè dữ liệu.

## Cách bổ sung hoặc sửa dữ liệu hiện nay

1. Sửa trực tiếp `src/data/allTools.json` (hoặc viết script mới đọc, sửa đúng bản ghi cần thiết, giữ nguyên các trường khác).
2. Chạy `npm run data:validate -- --online --write` để kiểm định và gắn nhãn `verification`.
3. Chạy `npm test` trước khi tạo pull request.
