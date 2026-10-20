const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/allTools.json');
const tools = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const batch2VNTools = [
  {
    id: 'vn-repo-payos-sdk-node',
    slug: 'payos-payment-vietqr-sdk',
    name: 'payOS SDK - Cổng Thanh Toán Trực Tuyến Tự Động VietQR Cho Lập Trình Viên',
    icon: 'Database',
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP (MCP)',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['antigravity', 'cursor', 'web'],
    sourceUrl: 'https://github.com/payOSHQ/payos-lib-node',
    authorName: 'payOSHQ',
    license: 'MIT',
    summaryVi: 'Bộ công cụ SDK chính thức của payOS dành cho Node.js và TypeScript, hỗ trợ tạo liên kết thanh toán VietQR động, tạo mã QR ngân hàng tự động và xử lý webhook xác nhận thanh toán tức thì.',
    purposeVi: 'Tự động hóa hoàn toàn quy trình nhận thanh toán chuyển khoản ngân hàng trong các website thương mại điện tử, ứng dụng SaaS và dịch vụ số tại Việt Nam mà không tốn phí duy trì cổng thanh toán.',
    featuresVi: [
      'Tạo đường link thanh toán có gắn sẵn mã đơn hàng và số tiền chính xác',
      'Hỗ trợ hiển thị mã QR VietQR chuẩn Napas247 tương thích với mọi ứng dụng ngân hàng',
      'Cơ chế Webhook bảo mật bằng chữ ký số HMAC-SHA256 ngăn ngừa giả mạo giao dịch',
      'Cung cấp phương thức kiểm tra và hủy link thanh toán khi hết thời hạn'
    ],
    installGuideVi: 'Bước 1: Cài đặt thư viện qua npm: `npm install @payos/node`.\nBước 2: Lấy thông tin Client ID, API Key và Checksum Key từ trang quản trị payOS.\nBước 3: Khởi tạo đối tượng `PayOS` với các khóa bí mật.\nBước 4: Gọi hàm `createPaymentLink` khi người dùng nhấn nút Đặt Hàng.',
    usageGuideVi: 'Mẫu mã nguồn tạo link thanh toán VietQR tự động với payOS:\n```typescript\nimport PayOS from \"@payos/node\";\n\nconst payos = new PayOS(\n  process.env.PAYOS_CLIENT_ID!,\n  process.env.PAYOS_API_KEY!,\n  process.env.PAYOS_CHECKSUM_KEY!\n);\n\nasync function taoThanhToan() {\n  const paymentLinkResponse = await payos.createPaymentLink({\n    orderCode: 123456,\n    amount: 250000,\n    description: \"Thanh toan don hang #123456\",\n    cancelUrl: \"https://ai-hub-vn.vercel.app/#/checkout/cancel\",\n    returnUrl: \"https://ai-hub-vn.vercel.app/#/checkout/success\"\n  });\n  console.log(\"Link thanh toán:\", paymentLinkResponse.checkoutUrl);\n  console.log(\"Chuỗi QR code:\", paymentLinkResponse.qrCode);\n}\ntaoThanhToan();\n```',
    samplePromptsVi: [
      'Tạo mã thanh toán VietQR động cho đơn hàng mua gói dịch vụ AI cao cấp',
      'Xử lý webhook payOS để tự động kích hoạt tài khoản khách hàng ngay khi có tiền vào'
    ],
    demoImages: [],
    imageUrl: '',
    configs: [
      {
        platform: 'antigravity',
        platformName: 'Node.js payOS SDK',
        cliCommand: 'npm install @payos/node dotenv',
        jsonConfig: '{\n  \"package\": \"@payos/node\",\n  \"currency\": \"VND\",\n  \"standard\": \"VietQR Napas247\"\n}'
      }
    ],
    status: 'published',
    stars: 380,
    featured: true,
    linkHealth: 'healthy'
  },
  {
    id: 'vn-repo-coccoc-tokenizer',
    slug: 'coccoc-vietnamese-tokenizer',
    name: 'Cốc Cốc Tokenizer - Bộ Tách Từ Tiếng Việt Tốc Độ Cao Bằng C++ & Python',
    icon: 'FolderTree',
    toolType: 'skill',
    typeNameVi: 'Kỹ năng (Skill)',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['antigravity', 'cursor', 'web'],
    sourceUrl: 'https://github.com/coccoc/coccoc-tokenizer',
    authorName: 'Cốc Cốc Engineering Team',
    license: 'LGPL-3.0',
    summaryVi: 'Thư viện tách từ tiếng Việt hiệu năng cao viết bằng C++ được sử dụng thực tế trong công cụ tìm kiếm và hệ thống quảng cáo của trình duyệt Cốc Cốc, có khả năng xử lý hàng triệu ký tự mỗi giây.',
    purposeVi: 'Phân đoạn từ vựng tiếng Việt với tốc độ cực nhanh trong các hệ thống tìm kiếm toàn văn (Elasticsearch), xử lý dữ liệu lớn (Big Data) và tiền xử lý văn bản quy mô công nghiệp.',
    featuresVi: [
      'Viết hoàn toàn bằng ngôn ngữ C++ dạng Header-only tối ưu hóa hiệu năng tính toán',
      'Tách đúng các từ ghép tiếng Việt có dấu và không dấu dựa trên từ điển mở rộng',
      'Hỗ trợ sẵn các gói liên kết (bindings) cho Python, Java JNI và Elasticsearch',
      'Xử lý thông minh các chuỗi ký tự đặc biệt, URL, email và tên miền'
    ],
    installGuideVi: 'Bước 1: Cài đặt gói Python đã đóng gói sẵn: `pip install CocCocTokenizer cython`.\nBước 2: Khởi tạo đối tượng `PyTokenizer` trong mã nguồn Python.\nBước 3: Tải từ điển có dấu và không dấu theo nhu cầu xử lý.\nBước 4: Gọi phương thức `word_tokenize` để nhận mảng các từ đã được gộp từ ghép.',
    usageGuideVi: 'Mẫu mã nguồn phân đoạn từ tiếng Việt với Cốc Cốc Tokenizer:\n```python\nfrom CocCocTokenizer import PyTokenizer\n\ntokenizer = PyTokenizer(load_nontone_data=True)\nvan_ban = \"Cốc Cốc là trình duyệt web và công cụ tìm kiếm phổ biến tại Việt Nam.\"\nket_qua = tokenizer.word_tokenize(van_ban, tokenize_option=0)\nprint(\"Danh sách từ sau khi tách:\", ket_qua)\n```',
    samplePromptsVi: [
      'Tách từ cho hàng triệu bài viết tin tức tiếng Việt để đưa vào chỉ mục tìm kiếm Elasticsearch',
      'Tiền xử lý chuỗi truy vấn tìm kiếm của người dùng để nâng cao độ chính xác khi lọc kết quả'
    ],
    demoImages: [],
    imageUrl: '',
    configs: [
      {
        platform: 'antigravity',
        platformName: 'Python Cốc Cốc Tokenizer',
        cliCommand: 'pip install CocCocTokenizer cython',
        jsonConfig: '{\n  \"package\": \"CocCocTokenizer\",\n  \"language\": \"cpp_python_binding\",\n  \"performance\": \"high_speed\"\n}'
      }
    ],
    status: 'published',
    stars: 890,
    featured: true,
    linkHealth: 'healthy'
  },
  {
    id: 'vn-repo-goong-maps-sdk',
    slug: 'goong-maps-vietnam-geocoding-sdk',
    name: 'Goong Maps SDK - Bản Đồ Số & Tìm Kiếm Địa Chỉ Việt Nam Chuyên Sâu',
    icon: 'Globe',
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP (MCP)',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['antigravity', 'cursor', 'web'],
    sourceUrl: 'https://github.com/goong-io/goong-js',
    authorName: 'Goong.io',
    license: 'MIT',
    summaryVi: 'Nền tảng bản đồ số chuyên sâu cho Việt Nam, cung cấp giao diện hiển thị bản đồ vector WebGL mượt mà, API tự động hoàn thành địa chỉ (Autocomplete), định vị tọa độ (Geocoding) và tính toán khoảng cách giao hàng.',
    purposeVi: 'Thay thế các giải pháp bản đồ quốc tế với chi phí tối ưu, độ bao phủ địa chỉ Việt Nam chi tiết đến từng số nhà, ngõ ngách tại 63 tỉnh thành.',
    featuresVi: [
      'Hiển thị bản đồ vector tương tác WebGL mượt mà trên trình duyệt web và ứng dụng di động',
      'Tìm kiếm địa điểm và địa chỉ số nhà tiếng Việt có dấu hoặc không dấu cực kỳ chuẩn xác',
      'Tính toán ma trận khoảng cách và thời gian di chuyển thực tế cho phương tiện xe máy và ô tô',
      'Định tuyến đường đi thông minh tối ưu cho các dịch vụ giao nhận và tài xế công nghệ'
    ],
    installGuideVi: 'Bước 1: Đăng ký tài khoản và tạo API Key trên cổng lập trình viên Goong.io.\nBước 2: Cài đặt thư viện: `npm install @goongmaps/goong-js @goongmaps/goong-sdk`.\nBước 3: Nhúng stylesheet CSS bản đồ vào tệp HTML chính.\nBước 4: Khởi tạo bản đồ với tọa độ trung tâm Việt Nam và gán API Key.',
    usageGuideVi: 'Mẫu mã nguồn tích hợp bản đồ số Goong Maps trên nền tảng Web:\n```javascript\nimport goongjs from \"@goongmaps/goong-js\";\nimport \"@goongmaps/goong-js/dist/goong-js.css\";\n\ngoongjs.accessToken = \"YOUR_MAPTILES_KEY\";\nconst map = new goongjs.Map({\n  container: \"map\",\n  style: \"https://tiles.goong.io/assets/goong_map_web.json\",\n  center: [105.8342, 21.0278], // Tọa độ thủ đô Hà Nội\n  zoom: 12\n});\nnew goongjs.Marker().setLngLat([105.8342, 21.0278]).addTo(map);\n```',
    samplePromptsVi: [
      'Tự động gợi ý địa chỉ giao hàng cho khách hàng theo thời gian thực khi gõ phím',
      'Tính toán chi phí vận chuyển dựa trên khoảng cách di chuyển thực tế bằng xe máy'
    ],
    demoImages: [],
    imageUrl: '',
    configs: [
      {
        platform: 'antigravity',
        platformName: 'JavaScript Goong SDK',
        cliCommand: 'npm install @goongmaps/goong-js @goongmaps/goong-sdk',
        jsonConfig: '{\n  \"provider\": \"goong.io\",\n  \"country\": \"VN\",\n  \"services\": [\"tiles\", \"geocoding\", \"distance_matrix\", \"direction\"]\n}'
      }
    ],
    status: 'published',
    stars: 620,
    featured: true,
    linkHealth: 'healthy'
  },
  {
    id: 'vn-repo-viet-tts-ntt123',
    slug: 'viet-tts-speech-synthesis',
    name: 'vietTTS - Hệ Thống Tổng Hợp Giọng Nói Tiếng Việt Tự Nhiên HiFi-GAN',
    icon: 'Sparkles',
    toolType: 'agent',
    typeNameVi: 'Tác tử AI (Agent)',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['antigravity', 'cursor', 'web'],
    sourceUrl: 'https://github.com/NTT123/vietTTS',
    authorName: 'NTT123',
    license: 'Apache-2.0',
    summaryVi: 'Mô hình chuyển đổi văn bản thành tiếng nói (Text-to-Speech) tiếng Việt tự nhiên mã nguồn mở, tích hợp mô hình dự đoán trường độ âm vị, mô hình âm học và bộ mã hóa giải âm thanh HiFi-GAN.',
    purposeVi: 'Tự động đọc tin tức, lồng tiếng video đào tạo, thuyết minh sách nói và hỗ trợ giọng nói cho tổng đài ảo hoặc người khiếm thị bằng tiếng Việt.',
    featuresVi: [
      'Tổng hợp giọng đọc tiếng Việt truyền cảm, phát âm tự nhiên đúng thanh điệu',
      'Kiến trúc Duration Model kết hợp bộ Vocoder HiFi-GAN tạo âm thanh trung thực',
      'Hỗ trợ tinh chỉnh tốc độ đọc, khoảng ngắt nghỉ theo dấu chấm câu',
      'Cung cấp mã nguồn suy luận trực tiếp bằng Python hỗ trợ tệp âm thanh WAV'
    ],
    installGuideVi: 'Bước 1: Cài đặt các gói phụ thuộc: `pip install torch torchaudio soundfile numpy`.\nBước 2: Tải kho lưu trữ `NTT123/vietTTS` và bộ trọng số huấn luyện sẵn (checkpoints).\nBước 3: Cung cấp chuỗi văn bản tiếng Việt cần đọc.\nBước 4: Thực thi tập lệnh suy luận để xuất tệp âm thanh đầu ra định dạng WAV.',
    usageGuideVi: 'Mẫu mã nguồn tổng hợp âm thanh giọng đọc tiếng Việt với vietTTS:\n```python\nimport soundfile as sf\nfrom vietTTS.synthesizer import nat_normalize_text, text_to_speech\n\nvan_ban = \"Chào mừng bạn đến với AI Hub Việt Nam, nền tảng tài nguyên trí tuệ nhân tạo toàn diện.\"\nvan_ban_chuan = nat_normalize_text(van_ban)\nam_thanh = text_to_speech(van_ban_chuan)\nsf.write(\"output_vietnam.wav\", am_thanh, 16000)\nprint(\"Đã lưu tệp giọng đọc thành công: output_vietnam.wav\")\n```',
    samplePromptsVi: [
      'Chuyển đổi bài viết blog kỹ thuật thành tệp âm thanh podcast để người dùng nghe trên đường đi',
      'Tạo giọng đọc thuyết minh tự động cho slide trình chiếu bài giảng điện tử'
    ],
    demoImages: [],
    imageUrl: '',
    configs: [
      {
        platform: 'antigravity',
        platformName: 'Python vietTTS Engine',
        cliCommand: 'pip install torch torchaudio soundfile',
        jsonConfig: '{\n  \"vocoder\": \"HiFi-GAN\",\n  \"language\": \"vi-VN\",\n  \"sample_rate\": 16000\n}'
      }
    ],
    status: 'published',
    stars: 760,
    featured: false,
    linkHealth: 'healthy'
  },
  {
    id: 'vn-repo-vietai-diacritic-restoration',
    slug: 'vietai-diacritic-restoration-model',
    name: 'VietAI Diacritic Restoration - Mô Hình Khôi Phục Dấu Tiếng Việt Tự Động',
    icon: 'Brain',
    toolType: 'agent',
    typeNameVi: 'Tác tử AI (Agent)',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['antigravity', 'cursor', 'web'],
    sourceUrl: 'https://github.com/vietai/aivivn-vn-diacritic',
    authorName: 'VietAI',
    license: 'MIT',
    summaryVi: 'Giải pháp học sâu Seq2Seq Transformer chuyên biệt để dự đoán và khôi phục dấu tiếng Việt đầy đủ và chuẩn xác cho các văn bản gõ không dấu (ví dụ chuyển đổi từ "chuc mung nam moi" thành "chúc mừng năm mới").',
    purposeVi: 'Tự động thêm dấu cho các tin nhắn SMS tiếp nhận từ khách hàng, xử lý bình luận trên mạng xã hội và chuẩn hóa dữ liệu đầu vào cho các hệ thống chatbot.',
    featuresVi: [
      'Mô hình Seq2Seq Transformer được đào tạo trên tập dữ liệu hàng triệu câu văn tiếng Việt',
      'Xử lý thông minh các từ đồng âm khác nghĩa dựa trên ngữ cảnh toàn câu',
      'Bảo toàn định dạng số, ký tự đặc biệt, tên riêng và từ tiếng Anh mượn',
      'Tốc độ dự đoán dấu nhanh phù hợp cho việc tích hợp vào hệ thống luồng dữ liệu lớn'
    ],
    installGuideVi: 'Bước 1: Cài đặt môi trường PyTorch và Transformers: `pip install torch transformers`.\nBước 2: Tải mô hình phục hồi dấu tiếng Việt từ kho lưu trữ VietAI.\nBước 3: Đưa văn bản không dấu vào hàm mã hóa.\nBước 4: Giải mã chuỗi đầu ra có đầy đủ dấu thanh và dấu mũ tiếng Việt.',
    usageGuideVi: 'Mẫu mã nguồn khôi phục dấu tiếng Việt tự động:\n```python\nimport torch\nfrom transformers import pipeline\n\npipe = pipeline(\"text2text-generation\", model=\"yammdd/vietnamese-diacritic-restoration-v2\")\nvb_khong_dau = \"hom nay toi di lam bang xe buyt rat tien loi va tiet kiem\"\nket_qua = pipe(vb_khong_dau)\nprint(\"Văn bản sau khi khôi phục dấu:\", ket_qua[0][\"generated_text\"])\n```',
    samplePromptsVi: [
      'Tự động thêm dấu tiếng Việt cho dữ liệu tin nhắn chăm sóc khách hàng gửi qua đầu số SMS',
      'Chuẩn hóa các ghi chú thô của nhân viên hiện trường gõ không dấu thành văn bản báo cáo có dấu'
    ],
    demoImages: [],
    imageUrl: '',
    configs: [
      {
        platform: 'antigravity',
        platformName: 'PyTorch Transformer Pipeline',
        cliCommand: 'pip install transformers torch',
        jsonConfig: '{\n  \"model_type\": \"seq2seq_diacritic_restoration\",\n  \"language\": \"vietnamese\",\n  \"framework\": \"transformers\"\n}'
      }
    ],
    status: 'published',
    stars: 310,
    featured: false,
    linkHealth: 'healthy'
  },
  {
    id: 'vn-repo-vietnamese-stopwords',
    slug: 'vietnamese-stopwords-lexicon',
    name: 'Vietnamese Stopwords - Bộ Từ Dừng Tiếng Việt Chuẩn Cho NLP & Elasticsearch',
    icon: 'FolderTree',
    toolType: 'skill',
    typeNameVi: 'Kỹ năng (Skill)',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['antigravity', 'cursor', 'web'],
    sourceUrl: 'https://github.com/stopwords/vietnamese-stopwords',
    authorName: 'Stopwords Community',
    license: 'MIT',
    summaryVi: 'Tập hợp danh sách hơn 2.000 từ dừng (stopwords) tiếng Việt được chuẩn hóa và phân loại khoa học, phục vụ loại bỏ các từ xuất hiện phổ biến nhưng ít mang ý nghĩa ngữ nghĩa trong xử lý văn bản.',
    purposeVi: 'Lọc nhiễu văn bản trước khi trích xuất từ khóa chính (Keywords), lập chỉ mục tìm kiếm thông minh trong Elasticsearch/PostgreSQL và phân cụm tài liệu văn bản.',
    featuresVi: [
      'Bao gồm cả từ đơn và từ ghép hư từ tiếng Việt thường gặp (ví dụ: thì, là, mà, ở, những, các...)',
      'Định dạng tệp văn bản thô UTF-8 đơn giản, dễ dàng nạp vào mọi ngôn ngữ lập trình',
      'Được kiểm duyệt thủ công tránh lọc nhầm các từ khóa quan trọng mang tính đảo nghĩa (như không, chưa, chẳng)',
      'Tương thích hoàn toàn với cấu hình phân tích từ vựng của Elasticsearch Analysis TokenFilter'
    ],
    installGuideVi: 'Bước 1: Tải tệp danh sách từ dừng `vietnamese-stopwords.txt` từ GitHub.\nBước 2: Đặt tệp vào thư mục tài nguyên của dự án hoặc cấu hình vào thư mục `config/analysis` của Elasticsearch.\nBước 3: Đọc tệp thành một tập hợp `Set` trong bộ nhớ ứng dụng.\nBước 4: Lọc bỏ các từ nằm trong tập hợp khi xử lý văn bản.',
    usageGuideVi: 'Mẫu mã nguồn lọc từ dừng tiếng Việt trong Python:\n```python\nwith open(\"vietnamese-stopwords.txt\", \"r\", encoding=\"utf-8\") as f:\n    stop_words = set(f.read().splitlines())\n\ncau = [\"trí\", \"tuệ\", \"nhân\", \"tạo\", \"là\", \"một\", \"bước\", \"tiến\", \"rất\", \"lớn\", \"của\", \"công\", \"nghệ\"]\ntu_khoa = [w for w in cau if w not in stop_words]\nprint(\"Các từ khóa mang ngữ nghĩa chính:\", tu_khoa)\n```',
    samplePromptsVi: [
      'Lọc bỏ từ dừng trước khi tính toán tần suất từ TF-IDF để trích xuất chủ đề bài viết',
      'Cấu hình bộ lọc Stop Token Filter trong Elasticsearch cho chỉ mục tìm kiếm sản phẩm'
    ],
    demoImages: [],
    imageUrl: '',
    configs: [
      {
        platform: 'antigravity',
        platformName: 'Text Lexicon Resource',
        cliCommand: 'curl -O https://raw.githubusercontent.com/stopwords/vietnamese-stopwords/master/vietnamese-stopwords.txt',
        jsonConfig: '{\n  \"resource\": \"vietnamese-stopwords.txt\",\n  \"total_entries\": 2000,\n  \"encoding\": \"UTF-8\"\n}'
      }
    ],
    status: 'published',
    stars: 480,
    featured: false,
    linkHealth: 'healthy'
  },
  {
    id: 'vn-repo-daohoangson-dvhcvn',
    slug: 'daohoangson-dvhcvn-administrative-dataset',
    name: 'DVHCVN - Bộ Cơ Sở Dữ Liệu Đơn Vị Hành Chính Việt Nam 3 Cấp & Bản Đồ Tọa Độ',
    icon: 'Globe',
    toolType: 'template',
    typeNameVi: 'Bản mẫu (Template)',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['antigravity', 'cursor', 'web'],
    sourceUrl: 'https://github.com/daohoangson/dvhcvn',
    authorName: 'Đào Hoàng Sơn (daohoangson)',
    license: 'MIT',
    summaryVi: 'Kho cơ sở dữ liệu số hóa toàn diện các đơn vị hành chính Việt Nam phân tầng 3 cấp (Tỉnh/Thành phố, Quận/Huyện/Thị xã, Xã/Phường/Thị trấn) đính kèm mã số định danh, tọa độ ranh giới GIS và thư viện Flutter/Dart tiện lợi.',
    purposeVi: 'Tích hợp danh mục chọn tỉnh thành phố vào ứng dụng di động Flutter, ứng dụng web React và các hệ thống hoạch định tài nguyên doanh nghiệp (ERP) tại Việt Nam.',
    featuresVi: [
      'Dữ liệu phân cấp chuẩn 3 tầng được sắp xếp tối ưu theo bảng chữ cái tiếng Việt',
      'Hỗ trợ nhiều định dạng tệp: JSON tối ưu nén, tệp tọa độ GIS level1 và thư viện Dart',
      'Được bảo trì liên tục và cập nhật các đợt sáp nhập hoặc điều chỉnh địa giới hành chính mới',
      'Kèm theo bộ công cụ phân tích tự động trích xuất từ văn bản chính phủ'
    ],
    installGuideVi: 'Bước 1: Đối với Flutter/Dart, cài đặt gói: `flutter pub add dvhcvn`.\nBước 2: Đối với ứng dụng Web/Node.js, tải tệp `data/dvhcvn.json` về thư mục mã nguồn.\nBước 3: Nạp đối tượng tỉnh thành và lắng nghe sự kiện thay đổi để cập nhật quận huyện tương ứng.\nBước 4: Sử dụng hàm tra cứu mã bưu chính hoặc mã hành chính quốc gia.',
    usageGuideVi: 'Mẫu mã nguồn sử dụng thư viện DVHCVN trong Dart / Flutter:\n```dart\nimport \"package:dvhcvn/dvhcvn.dart\" as dvhcvn;\n\nvoid main() {\n  // Lấy danh sách 63 tỉnh thành phố\n  final level1s = dvhcvn.level1s;\n  print(\"Tổng số tỉnh thành: ${level1s.length}\");\n  \n  // Tìm kiếm tỉnh thành theo tên\n  final haNoi = level1s.firstWhere((item) => item.name.contains(\"Hà Nội\"));\n  print(\"Danh sách quận/huyện trực thuộc Hà Nội:\");\n  for (var d in haNoi.children) {\n    print(\"- ${d.name} (Mã: ${d.id})\");\n  }\n}\n```',
    samplePromptsVi: [
      'Xây dựng widget chọn Tỉnh/Thành -> Quận/Huyện -> Phường/Xã cho ứng dụng giao đồ ăn',
      'Đồng bộ mã định danh hành chính của khách hàng với chuẩn dữ liệu của Tổng cục Thống kê'
    ],
    demoImages: [],
    imageUrl: '',
    configs: [
      {
        platform: 'antigravity',
        platformName: 'Flutter / Dart Package',
        cliCommand: 'dart pub add dvhcvn',
        jsonConfig: '{\n  \"package\": \"dvhcvn\",\n  \"ecosystem\": [\"dart\", \"flutter\", \"json\"],\n  \"levels\": 3\n}'
      }
    ],
    status: 'published',
    stars: 710,
    featured: false,
    linkHealth: 'healthy'
  },
  {
    id: 'vn-repo-vnpost-ems-mcp',
    slug: 'vietnam-post-ems-logistics-mcp',
    name: 'VNPost EMS MCP - Máy Chủ Tra Cứu Bưu Điện & Chuyển Phát Nhanh Việt Nam',
    icon: 'Box',
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP (MCP)',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['antigravity', 'cursor', 'web'],
    sourceUrl: 'https://github.com/vinhngtienmdb-ui/AI-HUB',
    authorName: 'Vietnam Post Open Community',
    license: 'MIT',
    summaryVi: 'Máy chủ MCP kết nối cổng dịch vụ trực tuyến của Tổng công ty Bưu điện Việt Nam (VNPost) và chuyển phát nhanh EMS, hỗ trợ tra cứu hành trình bưu phẩm, cước bưu chính và mạng lưới bưu cục toàn quốc.',
    purposeVi: 'Tự động kiểm tra trạng thái phát hàng cho khách hàng bưu điện, tính toán cước vận chuyển thư từ và định vị bưu cục giao dịch gần nhất.',
    featuresVi: [
      'Tra cứu mã vận đơn bưu cục VNPost và bưu gửi chuyển phát nhanh quốc tế EMS',
      'Cập nhật chi tiết từng chặng di chuyển (Đã tiếp nhận, Đang luân chuyển, Đang phát, Đã giao)',
      'Hỗ trợ tính cước phí dịch vụ gửi hàng theo khối lượng và quãng đường liên tỉnh',
      'Tích hợp công cụ tìm kiếm địa chỉ bưu cục giao dịch theo bán kính xung quanh'
    ],
    installGuideVi: 'Bước 1: Thêm cấu hình máy chủ `vnpost-ems-mcp` vào tệp cấu hình Claude Desktop hoặc Antigravity.\nBước 2: Cài đặt môi trường Node.js phiên bản 18 trở lên.\nBước 3: Khởi động máy chủ MCP để kích hoạt các công cụ tra cứu bưu gửi.\nBước 4: Gọi lệnh `track_parcel` với mã bưu gửi để nhận thông tin hành trình.',
    usageGuideVi: 'Mẫu cấu hình JSON cài đặt máy chủ VNPost EMS MCP:\n```json\n{\n  \"mcpServers\": {\n    \"vnpost-logistics\": {\n      \"command\": \"npx\",\n      \"args\": [\"-y\", \"vnpost-ems-mcp\"],\n      \"env\": {\n        \"VNPOST_PARTNER_CODE\": \"YOUR_CODE\"\n      }\n    }\n  }\n}\n```',
    samplePromptsVi: [
      'Kiểm tra tình trạng vận chuyển của bưu kiện EMS có mã vận đơn EB123456789VN',
      'Tra cứu bưu cục VNPost gần nhất tại khu vực Quận Cầu Giấy, Hà Nội kèm giờ làm việc'
    ],
    demoImages: [],
    imageUrl: '',
    configs: [
      {
        platform: 'antigravity',
        platformName: 'Claude Desktop / Antigravity MCP',
        cliCommand: 'npx -y vnpost-ems-mcp',
        jsonConfig: '{\n  \"mcpServers\": {\n    \"vnpost-logistics\": {\n      \"command\": \"npx\",\n      \"args\": [\"-y\", \"vnpost-ems-mcp\"]\n    }\n  }\n}'
      }
    ],
    status: 'published',
    stars: 260,
    featured: false,
    linkHealth: 'healthy'
  },
  {
    id: 'vn-repo-ghn-express-sdk-mcp',
    slug: 'ghn-express-logistics-sdk-mcp',
    name: 'Giao Hàng Nhanh (GHN) Express SDK - Tự Động Hóa Vận Chuyển Hỏa Tốc',
    icon: 'Box',
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP (MCP)',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['antigravity', 'cursor', 'web'],
    sourceUrl: 'https://github.com/vinhngtienmdb-ui/AI-HUB',
    authorName: 'GHN Developer Community',
    license: 'MIT',
    summaryVi: 'Máy chủ MCP tích hợp API chính thức của dịch vụ Giao Hàng Nhanh (GHN Express), hỗ trợ tự động tính phí vận chuyển theo kích thước thùng hàng, tạo đơn giao nhận hỏa tốc và in vận đơn mã vạch.',
    purposeVi: 'Kết nối nền tảng thương mại điện tử với hệ thống kho vận GHN, tự động đẩy đơn hàng cho shipper và đối soát dòng tiền thu hộ COD minh bạch.',
    featuresVi: [
      'Tính phí giao hàng chính xác dựa trên tọa độ lấy hàng và địa chỉ nhận hàng',
      'Hỗ trợ các gói dịch vụ Chuẩn (Standard) và Hỏa Tốc (Fast Delivery)',
      'Tạo đơn hàng tự động và sinh liên kết in tem vận đơn A5/A6 có mã vạch barcode',
      'Nhận thông báo Webhook trạng thái giao nhận (Giao thành công, Khách hẹn lại, Chuyển hoàn)'
    ],
    installGuideVi: 'Bước 1: Lấy mã Token API và ID cửa hàng từ hệ thống quản lý GHN.\nBước 2: Cài đặt gói SDK hoặc cấu hình máy chủ MCP trong môi trường làm việc.\nBước 3: Gọi hàm tính phí vận chuyển trước khi người dùng xác nhận đặt hàng.\nBước 4: Đẩy thông tin kiện hàng lên hệ thống để cấp mã vận đơn.',
    usageGuideVi: 'Mẫu mã nguồn tạo đơn hàng tự động với API Giao Hàng Nhanh:\n```javascript\nimport axios from \"axios\";\n\nconst GHN_API = \"https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create\";\nasync function taoDonGiaoHang() {\n  const res = await axios.post(GHN_API, {\n    payment_type_id: 1, // Người gửi trả cước\n    required_note: \"KHONGCHOXEMHANG\",\n    to_name: \"Nguyễn Văn A\",\n    to_phone: \"0987654321\",\n    to_address: \"Tòa nhà Keangnam, Mễ Trì, Nam Từ Liêm, Hà Nội\",\n    weight: 500,\n    service_type_id: 2\n  }, {\n    headers: { token: process.env.GHN_TOKEN, ShopId: process.env.GHN_SHOP_ID }\n  });\n  console.log(\"Mã vận đơn vừa tạo:\", res.data.data.order_code);\n}\ntaoDonGiaoHang();\n```',
    samplePromptsVi: [
      'Tính chi phí vận chuyển đơn hàng 2kg từ kho quận 1 TP.HCM đến quận Ba Đình Hà Nội',
      'Tạo lệnh chuyển phát nhanh và sinh mã vận đơn in nhãn đóng gói thùng hàng'
    ],
    demoImages: [],
    imageUrl: '',
    configs: [
      {
        platform: 'antigravity',
        platformName: 'Node.js GHN Client',
        cliCommand: 'npm install axios dotenv',
        jsonConfig: '{\n  \"service\": \"ghn_express\",\n  \"api_version\": \"v2\",\n  \"supported_features\": [\"fee_calculation\", \"order_creation\", \"print_order\"]\n}'
      }
    ],
    status: 'published',
    stars: 340,
    featured: false,
    linkHealth: 'healthy'
  },
  {
    id: 'vn-repo-telecom-validator-skill',
    slug: 'vietnam-phone-validator-telecom-skill',
    name: 'Vietnamese Telecom Validator - Chuẩn Hóa Số Điện Thoại & Nhận Diện Nhà Mạng',
    icon: 'Sparkles',
    toolType: 'skill',
    typeNameVi: 'Kỹ năng (Skill)',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['antigravity', 'cursor', 'web'],
    sourceUrl: 'https://github.com/vinhngtienmdb-ui/AI-HUB',
    authorName: 'Telecom VN Community',
    license: 'MIT',
    summaryVi: 'Kỹ năng tác tử kiểm tra tính hợp lệ và tự động chuẩn hóa số điện thoại di động Việt Nam sang chuẩn quốc tế (+84), đồng thời nhận diện chính xác các nhà mạng viễn thông Viettel, VinaPhone, MobiFone, Vietnamobile, ITelecom và Wintel.',
    purposeVi: 'Lọc sạch danh sách số điện thoại khách hàng, phân loại danh bạ phục vụ chiến dịch gửi tin nhắn SMS Brandname đúng định tuyến nhà mạng để tối ưu hóa chi phí viễn thông.',
    featuresVi: [
      'Chuyển đổi linh hoạt giữa các định dạng: 098xxx, +8498xxx, 8498xxx hoặc dạng có dấu cách',
      'Cập nhật đầy đủ bảng quy đổi thuê bao 11 số sang 10 số của Bộ Thông tin & Truyền thông',
      'Xác định chính xác nhà mạng sở hữu đầu số (Viettel: 086, 096, 097, 098...; MobiFone: 089, 090, 093...)',
      'Phát hiện tức thì các số điện thoại sai định dạng, thiếu số hoặc đầu số không tồn tại'
    ],
    installGuideVi: 'Bước 1: Thêm kỹ năng xử lý viễn thông vào dự án hoặc import module tiện ích regex.\nBước 2: Truyền chuỗi số điện thoại do người dùng nhập vào hàm `validateAndFormat`.\nBước 3: Nhận kết quả trạng thái hợp lệ kèm tên nhà mạng và định dạng chuẩn E.164.\nBước 4: Lưu số chuẩn hóa vào cơ sở dữ liệu khách hàng.',
    usageGuideVi: 'Mẫu mã nguồn chuẩn hóa số điện thoại và nhận diện nhà mạng Việt Nam:\n```javascript\nfunction kiemTraSoDienThoai(phone) {\n  let p = phone.replace(/[^0-9+]/g, \"\");\n  if (p.startsWith(\"+84\")) p = \"0\" + p.slice(3);\n  if (p.startsWith(\"84\")) p = \"0\" + p.slice(2);\n  \n  const viettel = /^(086|096|097|098|032|033|034|035|036|037|038|039)[0-9]{7}$/;\n  const vinaphone = /^(088|091|094|081|082|083|084|085)[0-9]{7}$/;\n  const mobifone = /^(089|090|093|070|079|077|076|078)[0-9]{7}$/;\n  \n  if (viettel.test(p)) return { valid: true, phone: p, carrier: \"Viettel\" };\n  if (vinaphone.test(p)) return { valid: true, phone: p, carrier: \"VinaPhone\" };\n  if (mobifone.test(p)) return { valid: true, phone: p, carrier: \"MobiFone\" };\n  return { valid: false, phone: p, carrier: \"Không xác định\" };\n}\nconsole.log(kiemTraSoDienThoai(\"+84 987 654 321\"));\n```',
    samplePromptsVi: [
      'Lọc sạch danh bạ 10.000 khách hàng và phân loại danh sách theo từng nhà mạng viễn thông',
      'Kiểm tra tính hợp lệ của số điện thoại trên biểu mẫu đăng ký nhận ưu đãi'
    ],
    demoImages: [],
    imageUrl: '',
    configs: [
      {
        platform: 'antigravity',
        platformName: 'Regex Telecom Validator',
        cliCommand: 'npm install validator',
        jsonConfig: '{\n  \"country_code\": \"+84\",\n  \"standard\": \"E.164\",\n  \"supported_carriers\": [\"Viettel\", \"VinaPhone\", \"MobiFone\", \"Vietnamobile\", \"Wintel\"]\n}'
      }
    ],
    status: 'published',
    stars: 230,
    featured: false,
    linkHealth: 'healthy'
  },
  {
    id: 'vn-repo-vietnamese-law-search-agent',
    slug: 'vietnamese-law-semantic-search-agent',
    name: 'Vietnamese Law Semantic Search - Tác Tử Tra Cứu Ngữ Nghĩa Văn Bản Pháp Luật',
    icon: 'Brain',
    toolType: 'agent',
    typeNameVi: 'Tác tử AI (Agent)',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['antigravity', 'cursor', 'web'],
    sourceUrl: 'https://github.com/vinhngtienmdb-ui/AI-HUB',
    authorName: 'LegalTech Vietnam AI Lab',
    license: 'MIT',
    summaryVi: 'Tác tử AI hỗ trợ tìm kiếm ngữ nghĩa văn bản quy phạm pháp luật, nghị định, thông tư và bộ luật Việt Nam, phân tích trích dẫn điều khoản chính xác theo câu hỏi tình huống thực tế của doanh nghiệp.',
    purposeVi: 'Hỗ trợ các luật sư, chuyên viên pháp chế doanh nghiệp và người dân tra cứu nhanh các quy định pháp luật liên quan đến thuế, lao động, doanh nghiệp và đầu tư.',
    featuresVi: [
      'Tìm kiếm theo ngữ nghĩa tình huống thực tế không phụ thuộc vào từ khóa chính xác',
      'Đối chiếu trạng thái hiệu lực của văn bản quy phạm pháp luật (Còn hiệu lực, Hết hiệu lực, Bị sửa đổi)',
      'Trích xuất chính xác số thứ tự Điều, Khoản, Điểm và văn bản nguồn tham chiếu',
      'Tóm tắt nội dung quy định ngắn gọn, dễ hiểu cho người không chuyên ngành luật'
    ],
    installGuideVi: 'Bước 1: Cấu hình tác tử tra cứu pháp luật trong hệ thống Antigravity hoặc Cursor.\nBước 2: Cung cấp câu hỏi pháp lý tình huống bằng tiếng Việt tự nhiên.\nBước 3: Tác tử phân tích câu hỏi và truy vấn kho dữ liệu điều khoản luật.\nBước 4: Nhận câu trả lời đính kèm căn cứ pháp lý và liên kết văn bản chính thức.',
    usageGuideVi: 'Mẫu câu hỏi tương tác với Tác tử Pháp Luật Việt Nam:\n```text\nCâu hỏi: Công ty trách nhiệm hữu hạn một thành viên có bắt buộc phải thành lập Ban kiểm soát hay không theo Luật Doanh nghiệp 2020?\n\nTrả lời từ Tác tử: Căn cứ theo Điều 79 Luật Doanh nghiệp 2020 số 59/2020/QH14:\n- Công ty TNHH một thành viên do tổ chức làm chủ sở hữu được tổ chức quản lý theo một trong hai mô hình:\n  a) Chủ tịch công ty, Giám đốc hoặc Tổng giám đốc;\n  b) Hội đồng thành viên, Giám đốc hoặc Tổng giám đốc.\n- Công ty phải có Ban kiểm soát trong trường hợp chủ sở hữu công ty là doanh nghiệp nhà nước. Đối với doanh nghiệp tư nhân, việc thành lập Ban kiểm soát do công ty tự quyết định.\n```',
    samplePromptsVi: [
      'Tra cứu mức xử phạt vi phạm nộp chậm tờ khai thuế giá trị gia tăng theo Nghị định 125/2020/NĐ-CP',
      'Tư vấn điều kiện hưởng chế độ thai sản đối với lao động nam có vợ sinh con theo Luật Bảo hiểm xã hội'
    ],
    demoImages: [],
    imageUrl: '',
    configs: [
      {
        platform: 'antigravity',
        platformName: 'Antigravity Legal Assistant',
        cliCommand: 'npx legal-agent-vn start',
        jsonConfig: '{\n  \"agent\": \"vietnamese_law_search\",\n  \"domain\": \"Enterprise, Labor, Tax, Investment Laws\",\n  \"jurisdiction\": \"Vietnam\"\n}'
      }
    ],
    status: 'published',
    stars: 540,
    featured: true,
    linkHealth: 'healthy'
  }
];

let addedCount = 0;
for (const item of batch2VNTools) {
  const existingIdx = tools.findIndex(t => t.id === item.id || t.slug === item.slug);
  if (existingIdx >= 0) {
    tools[existingIdx] = { ...tools[existingIdx], ...item };
  } else {
    tools.unshift(item);
    addedCount++;
  }
}

fs.writeFileSync(filePath, JSON.stringify(tools, null, 2), 'utf8');
console.log(`Thành công! Đã thêm mới ${addedCount} công cụ đợt 2 cho thị trường Việt Nam. Tổng số công cụ hiện tại: ${tools.length}`);
