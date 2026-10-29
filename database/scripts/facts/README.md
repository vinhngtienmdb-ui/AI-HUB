# Tệp dữ kiện tài nguyên

Mỗi tệp `*.json` là một mảng; mỗi phần tử mô tả một repo GitHub, dùng cho `scripts/add-tools-from-facts.cjs`.

Quy tắc: mọi thông tin (mô tả, lệnh, cổng, gói, giấy phép) phải lấy từ README/LICENSE của repo; câu lệnh chép nguyên văn;
`sourceEvidence` ghi `tệp:dòng` chứa từng câu lệnh. Không thêm repo không có tệp LICENSE, đã ngừng bảo trì,
hoặc tự động hóa tài khoản cá nhân trái điều khoản dịch vụ.

```jsonc
{
  "repo": "owner/name",
  "license": "giấy phép đầy đủ theo LICENSE",
  "authorName": "tổ chức / tác giả",
  "websiteUrl": "",
  "toolType": "mcp | agent | skill | software | sdk | model | dataset | cli | api | workflow",
  "taglineEn": "một câu trích nguyên văn README",
  "summaryVi": "2-3 câu", "purposeVi": "1-2 câu",
  "featuresVi": ["Tên ngắn: mô tả"],
  "requirementsVi": "", "installStepsVi": ["... `lệnh` ..."], "cliCommand": "lệnh chính",
  "usageStepsVi": ["..."], "samplePromptsVi": ["..."], "prosVi": ["..."], "consVi": ["..."],
  "sourceEvidence": { "lệnh": "README.md:123" },
  "meta": {
    "id": "owner-name", "nameVi": "Tên — Mô tả ngắn tiếng Việt",
    "icon": "Brain | Sparkles | Terminal | Workflow | Globe | Database | Search | Code2 | Layers | Box | FolderTree | GitPullRequest | CreditCard | Cpu | Wrench | MessageSquare",
    "categories": ["mã lĩnh vực có trong kho hoặc CATEGORIES của giao diện, ví dụ speech_voice, nlp_llm, payment_gateway, legal_public_service"],
    "platforms": ["web", "claude_code", "claude_desktop", "cursor"],
    "licenseShort": "Mã nguồn mở (MIT)", "pricingModel": "free", "pricingText": "...",
    "isVietnamMarket": true, "languages": ["Tiếng Việt", "Tiếng Anh"],
    "configs": [{ "platform": "web", "platformName": "Dòng lệnh (Terminal)", "cliCommand": "...", "jsonConfig": "(tùy chọn, JSON hợp lệ)" }]
  }
}
```
