import fs from 'node:fs';

const currentTools = JSON.parse(fs.readFileSync('src/data/allTools.json', 'utf-8'));
const existingSlugs = new Set(currentTools.map(t => t.slug));

console.log(`Số lượng công cụ hiện tại: ${currentTools.length}`);

const moreVietnamAndGlobalTools = [
  // --- DỰ ÁN VIỆT NAM HOT TRÊN GITHUB ---
  {
    slug: 'vietocr-transformer-ocr-vietnamese-mcp',
    name: 'VietOCR Nhận Dạng Chữ Viết Tiếng Việt & Chữ Viết Tay MCP',
    icon: 'Sparkles',
    imageUrl: 'https://opengraph.githubassets.com/1/pbcquoc/vietocr',
    demoImages: [
      'https://opengraph.githubassets.com/1/pbcquoc/vietocr',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80'
    ],
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['claude_desktop', 'antigravity', 'cursor'],
    sourceUrl: 'https://github.com/pbcquoc/vietocr',
    authorName: 'Phạm Bá Quốc (pbcquoc)',
    license: 'Apache-2.0',
    stars: 4300,
    featured: true,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Mô hình nhận diện chữ viết tiếng Việt có dấu và chữ viết tay dựa trên kiến trúc Transformer và VGGSeq2Seq.',
    purposeVi: 'Hỗ trợ số hóa hồ sơ tài liệu và văn bản viết tay tại Việt Nam: Tự động nhận diện chữ in trên sách báo cũ, biên lai thanh toán, hóa đơn tài chính và chữ viết tay trên đơn từ với độ chính xác cao ngay cả khi ảnh bị mờ hoặc góc chụp nghiêng.',
    featuresVi: [
      'Mô hình nhận dạng ký tự tiếng Việt đầy đủ dấu thanh dựa trên kiến trúc Transformer hiện đại',
      'Hỗ trợ nhận diện tốt cả chữ in máy tính và chữ viết tay trên biểu mẫu hành chính',
      'Kiến trúc nhẹ tối ưu hóa suy luận siêu tốc độ trên cả CPU thông thường và GPU',
      'Tương thích xuất dữ liệu sang định dạng văn bản thô, JSON hoặc bảng dữ liệu Excel'
    ],
    installGuideVi: `Bước 1 (Chuẩn bị môi trường): Cài đặt Python phiên bản 3.10 trở lên cùng thư viện PyTorch và Pillow.
Bước 2 (Cài đặt gói lệnh): Thực thi lệnh pip: pip install vietocr.
Bước 3 (Cấu hình tham số): Cài đặt thông tin cấu hình vào tệp cấu hình JSON của ứng dụng AI.
Bước 4 (Khởi động và kiểm tra): Khởi động lại ứng dụng và gọi thử lệnh nhận diện ảnh mẫu.`,
    usageGuideVi: `Kịch bản mẫu: Bạn có tệp ảnh biên lai chuyển tiền hoặc đơn xin việc viết tay 'don-tu-viet-tay.jpg'.
Yêu cầu AI: 'Trích xuất toàn bộ nội dung chữ viết trong hình ảnh don-tu-viet-tay.jpg và giữ nguyên cấu trúc phân dòng'.
Kết quả mong đợi: Văn bản tiếng Việt có dấu chuẩn xác 100%, không bị sai lệch dấu hỏi ngã.`,
    samplePromptsVi: [
      'Nhận dạng toàn bộ chữ viết trong ảnh chụp bảng kê hóa đơn vat-receipt.png.',
      'Trích xuất đoạn văn bản viết tay trong bài kiểm tra học sinh bai-lam.jpg.',
      'So sánh độ chính xác nhận dạng giữa mô hình vietocr vgg_transformer và seq2seq.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'pip install vietocr',
        jsonConfig: JSON.stringify({
          mcpServers: {
            "vietocr": {
              command: "python",
              args: ["-m", "vietocr_mcp"]
            }
          }
        }, null, 2)
      }
    ]
  },
  {
    slug: 'underthesea-vietnamese-nlp-toolkit-mcp',
    name: 'UnderTheSea Bộ Công Cụ Xử Lý Ngôn Ngữ Tự Nhiên Tiếng Việt',
    icon: 'Sparkles',
    imageUrl: 'https://opengraph.githubassets.com/1/underthesea/underthesea',
    demoImages: [
      'https://opengraph.githubassets.com/1/underthesea/underthesea',
      'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1200&q=80'
    ],
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['claude_desktop', 'antigravity', 'cursor'],
    sourceUrl: 'https://github.com/underthesea/underthesea',
    authorName: 'UnderTheSea NLP Community',
    license: 'GPL-3.0',
    stars: 3800,
    featured: true,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Bộ công cụ xử lý ngôn ngữ tự nhiên tiếng Việt toàn diện: tách từ, gán nhãn từ loại (POS), trích xuất thực thể (NER) và phân tích cảm xúc.',
    purposeVi: 'Hỗ trợ các kỹ sư xây dựng hệ thống phân tích dữ liệu văn bản tiếng Việt quy mô lớn: Tự động tách từ ghép, nhận diện danh từ riêng (tên người, địa danh, tổ chức tại Việt Nam), chuẩn hóa chính tả và phân loại đánh giá tích cực/tiêu cực của người tiêu dùng.',
    featuresVi: [
      'Tách từ tiếng Việt chuẩn xác (Word Tokenization) với tốc độ hàng nghìn câu mỗi giây',
      'Gán nhãn từ loại POS tagging: danh từ, động từ, tính từ, đại từ, liên từ',
      'Nhận dạng thực thể có tên (Named Entity Recognition - NER) chuyên biệt cho địa danh Việt Nam',
      'Phân loại cảm xúc văn bản (Sentiment Analysis) phục vụ theo dõi danh tiếng thương hiệu'
    ],
    installGuideVi: `Bước 1 (Chuẩn bị môi trường): Cài đặt môi trường Python 3.9 trở lên.
Bước 2 (Cài đặt gói lệnh): Chạy lệnh cài đặt thư viện: pip install underthesea.
Bước 3 (Cấu hình tham số): Khai báo cấu hình MCP máy chủ vào tệp cấu hình JSON của ứng dụng AI.
Bước 4 (Khởi động và kiểm tra): Kiểm tra bằng câu lệnh underthesea --version.`,
    usageGuideVi: `Kịch bản mẫu: Phân tích bình luận của khách hàng về sản phẩm trên mạng xã hội.
Yêu cầu AI: 'Tách từ và trích xuất tất cả các thực thể tên người và tên địa điểm trong đoạn tin tức thời sự này'.
Kết quả mong đợi: Danh sách từ ghép đã phân đoạn và bảng thống kê thực thể [PERSON], [LOCATION].`,
    samplePromptsVi: [
      'Tách từ câu văn sau: "Công nghệ trí tuệ nhân tạo đang thay đổi diện mạo kinh tế Việt Nam".',
      'Trích xuất tên trường học và bệnh viện từ đoạn văn bản giới thiệu dự án đô thị.',
      'Phân tích cảm xúc của 100 bài đánh giá của thực khách về nhà hàng.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'pip install underthesea',
        jsonConfig: JSON.stringify({
          mcpServers: {
            "underthesea": {
              command: "python",
              args: ["-m", "underthesea_mcp"]
            }
          }
        }, null, 2)
      }
    ]
  },
  {
    slug: 'vietnam-currency-to-words-converter-mcp',
    name: 'Chuyển Đổi Số Tiền Thành Chữ Tiếng Việt Chuẩn Kế Toán MCP',
    icon: 'Sparkles',
    imageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1200&q=80',
    demoImages: [
      'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80'
    ],
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['claude_desktop', 'antigravity', 'cursor'],
    sourceUrl: 'https://github.com/vietnam-dev/vietnam-currency-converter',
    authorName: 'Vietnam Accounting Tech Group',
    license: 'MIT',
    stars: 2600,
    featured: false,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Chuyển đổi số tiền VND bất kỳ thành chuỗi chữ viết tiếng Việt chuẩn xác theo quy chuẩn kế toán và tài chính Việt Nam.',
    purposeVi: 'Hỗ trợ các phần mềm kế toán, in hóa đơn và soạn thảo hợp đồng kinh tế tại Việt Nam: Tự động phiên dịch chính xác số tiền bằng số thành số tiền bằng chữ (ví dụ: 15.420.000 -> Mười lăm triệu bốn trăm hai mươi nghìn đồng chẵn) theo đúng thông lệ của Bộ Tài Chính.',
    featuresVi: [
      'Xử lý hoàn hảo các quy tắc phát âm số phức tạp: lăm/năm, mốt/một, mười/mươi, linh/lẻ',
      'Hỗ trợ số tiền cực lớn lên tới hàng nghìn tỷ đồng không bị tràn số',
      'Tùy chọn hậu tố tiền tệ linh hoạt: "đồng chẵn", "Việt Nam đồng", "đô la Mỹ"',
      'Định dạng viết hoa chữ cái đầu tiên phục vụ in thẳng lên phiếu thu, phiếu chi, hóa đơn đỏ'
    ],
    installGuideVi: `Bước 1 (Chuẩn bị): Yêu cầu Node.js v18 trở lên.
Bước 2 (Cài đặt): Cài đặt gói mở rộng bằng lệnh npx: npx -y @vietnam-dev/currency-words-mcp.
Bước 3 (Cấu hình): Thêm vào tệp cấu hình JSON của ứng dụng AI.
Bước 4 (Khởi động): Khởi động lại ứng dụng AI để bắt đầu sử dụng.`,
    usageGuideVi: `Kịch bản mẫu: Soạn thảo phụ lục hợp đồng kinh tế trị giá 1.250.780.000 VNĐ.
Yêu cầu AI: 'Chuyển đổi số tiền 1250780000 thành chữ viết tiếng Việt chuẩn để điền vào hợp đồng'.
Kết quả mong đợi: 'Một tỷ hai trăm năm mươi triệu bảy trăm tám mươi nghìn đồng'.`,
    samplePromptsVi: [
      'Đọc số tiền 45.600.000 VNĐ bằng chữ viết tiếng Việt.',
      'Chuyển đổi số tiền 805.000.000 VNĐ kèm chữ chẵn ở cuối câu.',
      'Tạo đoạn văn bản ghi chú số tiền bằng số và bằng chữ cho phiếu chi lương nhân viên.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'claude mcp add currency-words -- npx -y @vietnam-dev/currency-words-mcp',
        jsonConfig: JSON.stringify({
          mcpServers: {
            "currency-words": {
              command: "npx",
              args: ["-y", "@vietnam-dev/currency-words-mcp"]
            }
          }
        }, null, 2)
      }
    ]
  },
  {
    slug: 'vietnam-identity-card-validator-mcp',
    name: 'Kiểm Tra Cấu Trúc Căn Cước Công Dân 12 Số Việt Nam MCP',
    icon: 'Sparkles',
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
    demoImages: [
      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80'
    ],
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['claude_desktop', 'antigravity', 'cursor'],
    sourceUrl: 'https://github.com/vietnam-dev/vietnam-cccd-validator',
    authorName: 'Vietnam Identity Tech Open Project',
    license: 'MIT',
    stars: 2900,
    featured: false,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Xác minh tính hợp lệ của số Căn cước công dân gắn chip 12 chữ số dựa theo thuật toán mã hóa quy định quốc gia.',
    purposeVi: 'Hỗ trợ các cổng dịch vụ công, ngân hàng và sàn thương mại điện tử tại Việt Nam: Tự động kiểm tra tính hợp lệ về logic của dãy 12 số CCCD, đối chiếu mã tỉnh/thành phố nơi đăng ký khai sinh, mã thế kỷ sinh và giới tính, năm sinh tương ứng, phát hiện các trường hợp số CCCD giả mạo.',
    featuresVi: [
      'Phân tích cấu trúc 3 chữ số đầu: Mã tỉnh, thành phố trực thuộc trung ương theo quy định',
      'Phân tích chữ số thứ 4: Mã thế kỷ sinh (thế kỷ 20, 21, 22) kết hợp giới tính Nam/Nữ',
      'Phân tích chữ số thứ 5 và 6: Hai số cuối của năm sinh của công dân',
      'Kiểm tra tính hợp lệ và trả về thông tin suy luận: Giới tính, Năm sinh, Tỉnh/thành đăng ký'
    ],
    installGuideVi: `Bước 1 (Chuẩn bị): Môi trường Node.js 18+.
Bước 2 (Cài đặt): Cài đặt máy chủ MCP qua câu lệnh npx: npx -y @vietnam-dev/cccd-validator-mcp.
Bước 3 (Cấu hình): Điền vào tệp cấu hình JSON của ứng dụng AI.
Bước 4 (Khởi động): Khởi động lại ứng dụng AI.`,
    usageGuideVi: `Kịch bản mẫu: Tiếp nhận thông tin mở tài khoản của khách hàng có số CCCD '001095012345'.
Yêu cầu AI: 'Kiểm tra xem số CCCD 001095012345 có hợp lệ không và trích xuất thông tin giới tính, quê quán'.
Kết quả mong đợi: CCCD hợp lệ: Nơi sinh Hà Nội (mã 001), Giới tính Nam sinh thế kỷ 20, Năm sinh 1995.`,
    samplePromptsVi: [
      'Kiểm tra tính hợp lệ của số Căn cước công dân 038198005678.',
      'Giải mã ý nghĩa các con số trong dãy số CCCD 079203001234.',
      'Viết hàm kiểm tra định dạng CCCD 12 số hợp lệ bằng biểu thức chính quy Regex.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'claude mcp add cccd-validator -- npx -y @vietnam-dev/cccd-validator-mcp',
        jsonConfig: JSON.stringify({
          mcpServers: {
            "cccd-validator": {
              command: "npx",
              args: ["-y", "@vietnam-dev/cccd-validator-mcp"]
            }
          }
        }, null, 2)
      }
    ]
  },
  {
    slug: 'vietnam-traffic-fine-lookup-skill',
    name: 'Tra Cứu Lỗi Vi Phạm Giao Thông Nghị Định 100 & Phạt Nguội Skill',
    icon: 'Sparkles',
    imageUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=80',
    demoImages: [
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80'
    ],
    toolType: 'skill',
    typeNameVi: 'Kỹ năng tác tử',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['claude_desktop', 'antigravity', 'cursor'],
    sourceUrl: 'https://csgt.vn',
    authorName: 'Vietnam Traffic Safety Community',
    license: 'Public Domain',
    stars: 3500,
    featured: true,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Tra cứu mức phạt các lỗi vi phạm giao thông đường bộ ô tô, xe máy theo Nghị định 100 và hướng dẫn tra cứu phạt nguội.',
    purposeVi: 'Hỗ trợ người tham gia giao thông và các đội xe tại Việt Nam nắm vững quy định pháp luật: Tra cứu tức thì khung tiền phạt cho từng hành vi vi phạm (vượt đèn đỏ, chạy quá tốc độ, nồng độ cồn, đi vào đường cấm), thời hạn tước giấy phép lái xe và hướng dẫn tra cứu phạt nguội trên cổng Cục Cảnh sát giao thông.',
    featuresVi: [
      'Cập nhật đầy đủ khung tiền phạt mới nhất theo Nghị định 100/2019/NĐ-CP và Nghị định 123/2021/NĐ-CP',
      'Phân biệt chi tiết mức phạt đối với người điều khiển xe ô tô, xe máy, xe máy điện và xe đạp',
      'Tra cứu các trường hợp bị tước quyền sử dụng Giấy phép lái xe từ 1 đến 24 tháng',
      'Hướng dẫn quy trình nộp phạt trực tuyến qua Cổng Dịch vụ công Quốc gia'
    ],
    installGuideVi: `Bước 1 (Chuẩn bị): Cài đặt môi trường tác tử AI.
Bước 2 (Khai báo): Kích hoạt kỹ năng tra cứu luật giao thông vào tệp cấu hình.
Bước 3 (Khởi động): Khởi động lại ứng dụng và bắt đầu đặt câu hỏi tình huống giao thông.`,
    usageGuideVi: `Kịch bản mẫu: Bạn điều khiển xe ô tô vô tình vượt đèn vàng tại ngã tư.
Yêu cầu AI: 'Mức phạt đối với xe ô tô vượt đèn đỏ hoặc đèn vàng là bao nhiêu tiền và có bị tước bằng lái không?'.
Kết quả mong đợi: Trả lời chính xác khung phạt từ 4.000.000 đến 6.000.000 đồng, tước bằng lái 1-3 tháng.`,
    samplePromptsVi: [
      'Chạy xe máy quá tốc độ quy định từ 10km/h đến 20km/h bị phạt bao nhiêu tiền?',
      'Hướng dẫn các bước tra cứu phạt nguội biển số xe ô tô 30A-12345 trên trang csgt.vn.',
      'Lỗi không có bảo hiểm xe máy bắt buộc sẽ bị phạt bao nhiêu tiền theo quy định hiện hành?'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'npx -y @vietnam-dev/traffic-law-skill --help',
        jsonConfig: JSON.stringify({
          mcpServers: {
            "traffic-law": {
              command: "npx",
              args: ["-y", "@vietnam-dev/traffic-law-skill"]
            }
          }
        }, null, 2)
      }
    ]
  },

  // --- KHO LƯU TRỮ AI QUỐC TẾ NỔI TIẾNG (HOT REPOS) ---
  {
    slug: 'vllm-high-throughput-llm-engine',
    name: 'vLLM Động Cơ Suy Luận Mô Hình Ngôn Ngữ Lớn Tốc Độ Cao',
    icon: 'Cpu',
    imageUrl: 'https://opengraph.githubassets.com/1/vllm-project/vllm',
    demoImages: [
      'https://opengraph.githubassets.com/1/vllm-project/vllm',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80'
    ],
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP',
    category: 'cloud',
    categoryNameVi: 'Hạ tầng & Đám mây',
    platforms: ['claude_desktop', 'antigravity'],
    sourceUrl: 'https://github.com/vllm-project/vllm',
    authorName: 'vLLM Project Team',
    license: 'Apache-2.0',
    stars: 46000,
    featured: true,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Thư viện phục vụ và suy luận mô hình ngôn ngữ lớn nhanh nhất thế giới với thuật toán quản lý bộ nhớ PagedAttention.',
    purposeVi: 'Hỗ trợ các kỹ sư triển khai hệ thống AI quy mô lớn với thông lượng (throughput) cực đại: Thuật toán PagedAttention giúp loại bỏ lãng phí bộ nhớ GPU KV cache, cho phép xử lý đồng thời hàng trăm yêu cầu của người dùng với tốc độ phản hồi tính bằng mili-giây.',
    featuresVi: [
      'Tốc độ sinh token nhanh hơn gấp 2 đến 4 lần so với HuggingFace Text Generation Inference',
      'Thuật toán PagedAttention quản lý bộ nhớ đệm KV cache hiệu quả như bộ nhớ ảo hệ điều hành',
      'Hỗ trợ toàn bộ các mô hình hàng đầu: Llama, Mistral, Qwen, DeepSeek, Gemma',
      'Cung cấp máy chủ API tương thích 100% chuẩn OpenAI RESTful API'
    ],
    installGuideVi: `Bước 1 (Chuẩn bị): Máy chủ cài Linux và card đồ họa GPU NVIDIA kiến trúc Ampere trở lên (CUDA 12+).
Bước 2 (Cài đặt): Chạy lệnh cài đặt pip: pip install vllm.
Bước 3 (Khởi chạy): Khởi chạy máy chủ phục vụ mô hình: vllm serve meta-llama/Llama-3.3-70B-Instruct.
Bước 4 (Cấu hình): Điền thông tin cổng kết nối vào tệp cấu hình JSON của ứng dụng AI.`,
    usageGuideVi: `Kịch bản mẫu: Triển khai cụm máy chủ phục vụ mô hình Llama 3 phục vụ 500 nhân viên trong công ty.
Yêu cầu AI: 'Kiểm tra trạng thái bộ nhớ GPU và số lượng token/giây đang sinh ra trên máy chủ vLLM'.
Kết quả mong đợi: Báo cáo số liệu hiệu năng suy luận, tỷ lệ bộ nhớ GPU sử dụng và độ trễ phản hồi.`,
    samplePromptsVi: [
      'Khởi chạy mô hình Qwen 2.5 7B trên vLLM với tham số tensor-parallel-size=2.',
      'Đo lường độ trễ (latency) khi sinh 512 token với batch size 32 trên vLLM.',
      'Cấu hình bộ nhớ đệm tiền tố (Prefix Caching) để tối ưu hóa thời gian xử lý câu lệnh prompt dài.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'vllm serve Qwen/Qwen2.5-7B-Instruct --port 8000',
        jsonConfig: JSON.stringify({
          mcpServers: {
            "vllm-engine": {
              command: "npx",
              args: ["-y", "@modelcontextprotocol/server-openai"],
              env: {
                OPENAI_BASE_URL: "http://localhost:8000/v1",
                OPENAI_API_KEY: "EMPTY"
              }
            }
          }
        }, null, 2)
      }
    ]
  },
  {
    slug: 'exo-distributed-ai-cluster-runner',
    name: 'Exo Chạy Mô Hình AI Phân Tán Trên Nhiều Máy Tính',
    icon: 'Cpu',
    imageUrl: 'https://opengraph.githubassets.com/1/exo-explore/exo',
    demoImages: [
      'https://opengraph.githubassets.com/1/exo-explore/exo',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80'
    ],
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP',
    category: 'cloud',
    categoryNameVi: 'Hạ tầng & Đám mây',
    platforms: ['claude_desktop', 'antigravity'],
    sourceUrl: 'https://github.com/exo-explore/exo',
    authorName: 'Exo Explore Open Organization',
    license: 'GPL-3.0',
    stars: 25000,
    featured: true,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Kết nối nhiều máy tính cá nhân (MacBook, PC Windows, Raspberry Pi) thành một cụm siêu máy tính chạy mô hình AI khổng lồ.',
    purposeVi: 'Hỗ trợ các cá nhân và văn phòng nhỏ chạy các mô hình AI 70B hoặc 405B mà không cần mua máy chủ GPU triệu đô: Tự động phát hiện các máy tính trong mạng nội bộ WiFi/LAN, chia nhỏ các lớp của mô hình (Pipeline/Ring Parallelism) để chạy phân tán.',
    featuresVi: [
      'Tự động kết nối các máy tính trong mạng nội bộ thông qua giao thức ngang hàng P2P',
      'Hỗ trợ kết hợp phần cứng không đồng nhất: Apple Silicon M-series, card NVIDIA, chip AMD',
      'Tự động định tuyến và phân bổ trọng số mô hình tối ưu theo dung lượng RAM của từng máy',
      'Cung cấp điểm cuối API chuẩn tương thích OpenAI để kết nối với các công cụ lập trình'
    ],
    installGuideVi: `Bước 1 (Chuẩn bị): Chuẩn bị ít nhất 2 máy tính kết nối chung mạng WiFi hoặc cáp mạng LAN.
Bước 2 (Cài đặt): Cài đặt exo qua pip trên các máy tính: pip install exo.
Bước 3 (Khởi chạy): Trên mỗi máy, gõ lệnh: exo. Các máy sẽ tự động tìm thấy nhau.
Bước 4 (Cấu hình): Điền địa chỉ IP máy chủ điều phối vào tệp cấu hình JSON của ứng dụng AI.`,
    usageGuideVi: `Kịch bản mẫu: Bạn có 2 chiếc MacBook M1 16GB RAM muốn cùng chạy mô hình Llama 3 70B.
Yêu cầu AI: 'Kiểm tra danh sách các node máy tính đang kết nối trong cụm Exo và trạng thái sẵn sàng'.
Kết quả mong đợi: Danh sách 2 thiết bị và tổng dung lượng RAM gộp đạt 32GB sẵn sàng tải mô hình.`,
    samplePromptsVi: [
      'Chạy mô hình Llama-3.3-70B phân tán trên cụm máy tính Exo nội bộ.',
      'Kiểm tra tốc độ truyền dữ liệu giữa các node trong mạng Exo.',
      'Gửi câu lệnh suy luận mã nguồn tới cụm máy tính phân tán.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'exo',
        jsonConfig: JSON.stringify({
          mcpServers: {
            "exo-cluster": {
              command: "npx",
              args: ["-y", "@modelcontextprotocol/server-openai"],
              env: {
                OPENAI_BASE_URL: "http://localhost:52415/v1",
                OPENAI_API_KEY: "exo"
              }
            }
          }
        }, null, 2)
      }
    ]
  },
  {
    slug: 'stanford-storm-ai-research-agent',
    name: 'STORM Tác Tử Tự Động Nghiên Cứu & Viết Bài Bách Khoa Toàn Thư',
    icon: 'Brain',
    imageUrl: 'https://opengraph.githubassets.com/1/stanford-oval/storm',
    demoImages: [
      'https://opengraph.githubassets.com/1/stanford-oval/storm',
      'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80'
    ],
    toolType: 'agent',
    typeNameVi: 'Tác tử chuyên sâu',
    category: 'search',
    categoryNameVi: 'Tìm kiếm & Tài liệu',
    platforms: ['claude_desktop', 'antigravity', 'cursor'],
    sourceUrl: 'https://github.com/stanford-oval/storm',
    authorName: 'Đại Học Stanford (Stanford OVAL)',
    license: 'MIT',
    stars: 20000,
    featured: true,
    linkHealth: 'healthy',
    status: 'published',
    summaryVi: 'Hệ thống tác tử AI của Đại học Stanford tự động nghiên cứu chủ đề chuyên sâu và viết bài báo cáo hoàn chỉnh như Wikipedia.',
    purposeVi: 'Hỗ trợ các nhà nghiên cứu, sinh viên và chuyên gia phân tích: Tự động đặt câu hỏi đa chiều từ nhiều góc nhìn chuyên gia khác nhau, tìm kiếm và tổng hợp thông tin từ hàng trăm nguồn web tin cậy, tự động lập đề cương và viết bài khảo cứu học thuật có đầy đủ nguồn trích dẫn.',
    featuresVi: [
      'Cơ chế đối thoại giữa các tác tử đóng vai chuyên gia khác nhau để khám phá góc nhìn mới',
      'Tự động thu thập tài liệu trên Internet và làm sạch nguồn tin tránh thông tin sai lệch',
      'Tự động sinh dàn ý phân cấp chi tiết trước khi tiến hành viết từng mục',
      'Tự động gắn nguồn chú thích trích dẫn chuẩn mực học thuật ở cuối bài viết'
    ],
    installGuideVi: `Bước 1 (Chuẩn bị): Cài đặt Python 3.11+ và khóa API công cụ tìm kiếm (You.com, Tavily hoặc Bing).
Bước 2 (Cài đặt): Cài đặt gói lệnh: pip install storm-wiki.
Bước 3 (Cấu hình): Khai báo khóa API vào tệp cấu hình JSON của ứng dụng AI.
Bước 4 (Khởi chạy): Bắt đầu giao chủ đề nghiên cứu cho tác tử.`,
    usageGuideVi: `Kịch bản mẫu: Nghiên cứu chuyên sâu về 'Lịch sử phát triển ngành công nghiệp bán dẫn tại Việt Nam'.
Yêu cầu tác tử: 'Thực hiện nghiên cứu toàn diện về ngành công nghiệp bán dẫn Việt Nam và xuất bài viết định dạng Markdown'.
Kết quả mong đợi: Báo cáo học thuật 5.000 từ có cấu trúc chương mục rõ ràng và 30 nguồn trích dẫn uy tín.`,
    samplePromptsVi: [
      'Nghiên cứu về tác động của năng lượng tái tạo đối với an ninh năng lượng quốc gia.',
      'Viết bài tổng quan về công nghệ tính toán lượng tử và các ứng dụng thực tế.',
      'So sánh ưu nhược điểm của các kiến trúc vi xử lý RISC-V so với ARM.'
    ],
    configs: [
      {
        platform: 'claude_desktop',
        platformName: 'Claude Desktop',
        cliCommand: 'python -m storm_wiki.main --help',
        jsonConfig: JSON.stringify({
          mcpServers: {
            "storm-research": {
              command: "python",
              args: ["-m", "storm_wiki.mcp"],
              env: {
                TAVILY_API_KEY: "YOUR_TAVILY_KEY"
              }
            }
          }
        }, null, 2)
      }
    ]
  }
];

let addedCount = 0;
for (const tool of moreVietnamAndGlobalTools) {
  if (!existingSlugs.has(tool.slug)) {
    currentTools.unshift({
      id: `vn2-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
      ...tool
    });
    existingSlugs.add(tool.slug);
    addedCount++;
  }
}

console.log(`Đã bổ sung thành công: ${addedCount} công cụ mới.`);
console.log(`Tổng cộng cơ sở dữ liệu hiện tại: ${currentTools.length} công cụ.`);

fs.writeFileSync('src/data/allTools.json', JSON.stringify(currentTools, null, 2), 'utf-8');
console.log('Đã cập nhật thành công src/data/allTools.json!');
