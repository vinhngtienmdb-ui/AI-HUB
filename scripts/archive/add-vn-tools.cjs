const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/allTools.json');
const tools = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const newVNTools = [
  {
    id: 'vn-repo-bartpho-vinai',
    slug: 'bartpho-seq2seq-vietnamese',
    name: 'BARTpho - Mô Hình Transformer Sinh Văn Bản Tiếng Việt (Seq2Seq)',
    icon: 'Brain',
    toolType: 'agent',
    typeNameVi: 'Tác tử AI (Agent)',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['antigravity', 'cursor', 'web'],
    sourceUrl: 'https://github.com/VinAIResearch/BARTpho',
    authorName: 'VinAI Research',
    license: 'MIT',
    summaryVi: 'Mô hình Transformer chuỗi-sang-chuỗi (seq2seq) quy mô lớn đầu tiên được đào tạo chuyên biệt cho tiếng Việt theo kiến trúc BART Large, hỗ trợ cả cấp độ âm tiết (syllable) và từ ngữ (word).',
    purposeVi: 'Phục vụ các tác vụ sinh ngôn ngữ tự nhiên tiếng Việt phức tạp như tóm tắt văn bản tin tức tự động, dịch máy, sửa lỗi và chuẩn hóa văn bản hành chính.',
    featuresVi: [
      'Kiến trúc BART Large với hai phiên bản BARTpho-syllable và BARTpho-word',
      'Đào tạo trước trên kho ngữ liệu tiếng Việt đơn ngữ 20GB chất lượng cao',
      'Hiệu quả vượt trội trong tác vụ tóm tắt bài báo và dịch văn bản tự động',
      'Tích hợp nguyên bản qua thư viện Hugging Face Transformers'
    ],
    installGuideVi: 'Bước 1: Cài đặt thư viện Transformers và PyTorch: `pip install transformers torch fastbpe`.\nBước 2: Cài đặt thư viện tách từ tiếng Việt: `pip install pyvi`.\nBước 3: Tải cấu hình và trọng số mô hình `vinai/bartpho-syllable` từ Hugging Face.\nBước 4: Sử dụng pipeline hoặc AutoModelForSeq2SeqLM để thực thi tác vụ.',
    usageGuideVi: 'Mẫu mã nguồn sinh văn bản và tóm tắt với BARTpho:\n```python\nimport torch\nfrom transformers import AutoModelForSeq2SeqLM, AutoTokenizer\n\ntokenizer = AutoTokenizer.from_pretrained(\"vinai/bartpho-syllable\")\nbartpho = AutoModelForSeq2SeqLM.from_pretrained(\"vinai/bartpho-syllable\")\n\nvan_ban = \"Thủ tướng Chính phủ vừa ban hành chiến lược quốc gia về phát triển trí tuệ nhân tạo đến năm 2030, đưa Việt Nam vào top các nước dẫn đầu ASEAN trong lĩnh vực này.\"\ninputs = tokenizer(van_ban, max_length=1024, return_tensors=\"pt\", truncation=True)\nsummary_ids = bartpho.generate(inputs[\"input_ids\"], num_beams=4, max_length=100, early_stopping=True)\nprint(tokenizer.decode(summary_ids[0], skip_special_tokens=True))\n```',
    samplePromptsVi: [
      'Tóm tắt nội dung bản tin kinh tế dài 1500 từ thành đoạn tóm lược 3 ý chính súc tích',
      'Chuẩn hóa cấu trúc câu và phong cách diễn đạt cho văn bản báo cáo nội bộ'
    ],
    demoImages: [],
    imageUrl: '',
    configs: [
      {
        platform: 'antigravity',
        platformName: 'Hugging Face Transformers',
        cliCommand: 'pip install transformers torch pyvi',
        jsonConfig: '{\n  \"model_name\": \"vinai/bartpho-syllable\",\n  \"task\": \"summarization\",\n  \"framework\": \"pytorch\"\n}'
      }
    ],
    status: 'published',
    stars: 420,
    featured: true,
    linkHealth: 'healthy'
  },
  {
    id: 'vn-repo-phowhisper-vinai',
    slug: 'phowhisper-speech-recognition-vietnam',
    name: 'PhoWhisper - Mô Hình Nhận Dạng Giọng Nói Tiếng Việt Độ Chính Xác Cao',
    icon: 'Sparkles',
    toolType: 'agent',
    typeNameVi: 'Tác tử AI (Agent)',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['antigravity', 'cursor', 'web'],
    sourceUrl: 'https://github.com/VinAIResearch/PhoWhisper',
    authorName: 'VinAI Research',
    license: 'MIT',
    summaryVi: 'Hệ thống tự động nhận dạng tiếng nói (ASR) tiếng Việt đạt độ chính xác hàng đầu, tinh chỉnh từ OpenAI Whisper trên 844 giờ dữ liệu giọng đọc 3 miền Bắc - Trung - Nam.',
    purposeVi: 'Chuyển đổi giọng nói và ghi âm cuộc họp tiếng Việt thành văn bản với độ trễ thấp, hỗ trợ lọc tạp âm và nhận diện chuẩn xác các từ ngữ chuyên ngành.',
    featuresVi: [
      'Cung cấp đầy đủ các kích thước mô hình từ Tiny, Base, Small, Medium đến Large',
      'Được huấn luyện trên 844 giờ ngữ liệu giọng nói chuẩn đa dạng vùng miền Việt Nam',
      'Khả năng tự động chấm câu và viết hoa chính xác trong văn bản đầu ra',
      'Hỗ trợ chạy suy luận nhanh trên cả GPU và CPU với Hugging Face pipeline'
    ],
    installGuideVi: 'Bước 1: Cài đặt thư viện xử lý âm thanh và mô hình: `pip install transformers torch torchaudio soundfile`.\nBước 2: Chuẩn bị tệp âm thanh ghi âm định dạng WAV hoặc MP3 lấy mẫu 16kHz.\nBước 3: Khởi tạo pipeline nhận diện giọng nói `vinai/PhoWhisper-small`.\nBước 4: Đưa tệp âm thanh vào hàm xử lý để lấy chuỗi văn bản hoàn chỉnh.',
    usageGuideVi: 'Mẫu mã nguồn nhận dạng giọng nói tự động với PhoWhisper:\n```python\nimport torch\nfrom transformers import pipeline\n\ntranscriber = pipeline(\n    task=\"automatic-speech-recognition\",\n    model=\"vinai/PhoWhisper-small\",\n    device=0 if torch.cuda.is_available() else -1\n)\n\nket_qua = transcriber(\"ghi_am_cuoc_hop.wav\")\nprint(\"Nội dung nhận dạng được:\", ket_qua[\"text\"])\n```',
    samplePromptsVi: [
      'Chuyển đổi tệp ghi âm cuộc phỏng vấn tuyển dụng 30 phút thành biên bản chữ viết',
      'Tạo phụ đề tự động đồng bộ theo thời gian cho video hướng dẫn sử dụng sản phẩm'
    ],
    demoImages: [],
    imageUrl: '',
    configs: [
      {
        platform: 'antigravity',
        platformName: 'Python ASR Pipeline',
        cliCommand: 'pip install transformers torch torchaudio soundfile',
        jsonConfig: '{\n  \"model_name\": \"vinai/PhoWhisper-small\",\n  \"task\": \"automatic-speech-recognition\",\n  \"sampling_rate\": 16000\n}'
      }
    ],
    status: 'published',
    stars: 680,
    featured: true,
    linkHealth: 'healthy'
  },
  {
    id: 'vn-repo-pyvi-nlp',
    slug: 'pyvi-vietnamese-tokenizer-pos-tagger',
    name: 'pyvi - Thư Viện Tách Từ Và Gán Nhãn Từ Loại Tiếng Việt',
    icon: 'FolderTree',
    toolType: 'skill',
    typeNameVi: 'Kỹ năng (Skill)',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['antigravity', 'cursor', 'web'],
    sourceUrl: 'https://github.com/trungtv/pyvi',
    authorName: 'Trần Việt Trung (trungtv)',
    license: 'MIT',
    summaryVi: 'Thư viện xử lý ngôn ngữ tự nhiên tiếng Việt siêu nhẹ bằng Python, sử dụng mô hình Conditional Random Field (CRF) để phân đoạn từ vựng và gán nhãn từ loại chính xác cao.',
    purposeVi: 'Tiền xử lý văn bản tiếng Việt cho các hệ thống tìm kiếm thông tin, phân loại văn bản, trích xuất thực thể và chuẩn bị dữ liệu huấn luyện mô hình ngôn ngữ lớn.',
    featuresVi: [
      'Thuật toán tách từ tiếng Việt dựa trên mô hình CRF với tốc độ xử lý nhanh',
      'Gán nhãn từ loại (Danh từ, Động từ, Tính từ, Đại từ) chuẩn xác',
      'Hỗ trợ các hàm tiện ích thêm dấu và xóa bỏ dấu tiếng Việt tiện lợi',
      'Dung lượng gọn nhẹ, không yêu cầu GPU hoặc cấu hình máy chủ cao'
    ],
    installGuideVi: 'Bước 1: Cài đặt thư viện qua công cụ quản lý gói pip: `pip install pyvi`.\nBước 2: Khai báo import hai module `ViTokenizer` và `ViPosTagger` trong tập lệnh Python.\nBước 3: Gọi hàm `tokenize` để phân đoạn từ (ghép từ ghép bằng dấu gạch dưới).\nBước 4: Gọi hàm `postagging` để trích xuất danh sách nhãn ngữ pháp.',
    usageGuideVi: 'Mẫu mã nguồn tách từ và phân tích từ loại với pyvi:\n```python\nfrom pyvi.pyvi import ViTokenizer, ViPosTagger\n\ncau = \"Trường Đại học Bách khoa Hà Nội đào tạo các kỹ sư trí tuệ nhân tạo chất lượng cao.\"\ntu_da_tach = ViTokenizer.tokenize(cau)\nprint(\"Kết quả tách từ:\", tu_da_tach)\n\ntu_loai = ViPosTagger.postagging(tu_da_tach)\nfor word, tag in zip(tu_loai[0], tu_loai[1]):\n    print(f\"{word}: {tag}\")\n```',
    samplePromptsVi: [
      'Tách từ và chuẩn hóa ngữ liệu tiếng Việt trước khi đưa vào mô hình nhúng vectơ',
      'Trích xuất danh sách danh từ riêng và động từ hành động trong phản hồi của khách hàng'
    ],
    demoImages: [],
    imageUrl: '',
    configs: [
      {
        platform: 'antigravity',
        platformName: 'Python NLP',
        cliCommand: 'pip install pyvi',
        jsonConfig: '{\n  \"package\": \"pyvi\",\n  \"features\": [\"tokenization\", \"pos_tagging\"]\n}'
      }
    ],
    status: 'published',
    stars: 1150,
    featured: false,
    linkHealth: 'healthy'
  },
  {
    id: 'vn-repo-vit5-vietai',
    slug: 'vit5-vietnamese-text-to-text-model',
    name: 'ViT5 - Mô Hình Text-to-Text Tiếng Việt Đa Tác Vụ',
    icon: 'Brain',
    toolType: 'agent',
    typeNameVi: 'Tác tử AI (Agent)',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['antigravity', 'cursor', 'web'],
    sourceUrl: 'https://github.com/vietai/ViT5',
    authorName: 'VietAI Research',
    license: 'Apache-2.0',
    summaryVi: 'Mô hình Transformer Text-to-Text cho tiếng Việt dựa trên kiến trúc T5 của Google, được đào tạo trước trên kho ngữ liệu tiếng Việt lớn bởi tổ chức VietAI.',
    purposeVi: 'Giải quyết toàn diện các tác vụ xử lý ngôn ngữ tự nhiên từ tóm tắt bài báo, trả lời câu hỏi đọc hiểu (Question Answering) đến dịch song ngữ Anh - Việt.',
    featuresVi: [
      'Kế thừa kiến trúc Encoder-Decoder linh hoạt của T5 cho tiếng Việt',
      'Được tinh chỉnh trên các bộ dữ liệu Wikilingua và Vietnews tiêu chuẩn',
      'Cung cấp hai kích thước chuẩn: vit5-base và vit5-large',
      'Được tối ưu hóa cho bài toán sinh tóm tắt văn bản trừu tượng (abstractive summarization)'
    ],
    installGuideVi: 'Bước 1: Cài đặt thư viện Transformers và PyTorch: `pip install transformers torch sentencepiece`.\nBước 2: Tải mô hình `VietAI/vit5-base` hoặc `VietAI/vit5-large`.\nBước 3: Thiết lập tiền tố nhiệm vụ (ví dụ: `summarize:` hoặc `vietnews:`).\nBước 4: Thực thi hàm generate để nhận kết quả sinh ngôn ngữ.',
    usageGuideVi: 'Mẫu mã nguồn sử dụng ViT5 cho bài toán tóm tắt tin tức:\n```python\nimport torch\nfrom transformers import AutoTokenizer, AutoModelForSeq2SeqLM\n\ntokenizer = AutoTokenizer.from_pretrained(\"VietAI/vit5-base\")\nmodel = AutoModelForSeq2SeqLM.from_pretrained(\"VietAI/vit5-base\")\n\nvb = \"vietnews: Bộ Y tế khuyến cáo người dân chủ động tiêm phòng cúm mùa và giữ ấm cơ thể trong giai đoạn thời tiết giao mùa chuyển lạnh.\"\ninput_ids = tokenizer(vb, return_tensors=\"pt\", max_length=512, truncation=True).input_ids\noutputs = model.generate(input_ids, max_length=128, num_beams=4, early_stopping=True)\nprint(tokenizer.decode(outputs[0], skip_special_tokens=True))\n```',
    samplePromptsVi: [
      'Tóm tắt báo cáo thường niên của doanh nghiệp thành các chỉ tiêu trọng tâm',
      'Chuyển đổi câu hỏi của khách hàng thành truy vấn tìm kiếm cơ sở dữ liệu tri thức'
    ],
    demoImages: [],
    imageUrl: '',
    configs: [
      {
        platform: 'antigravity',
        platformName: 'Hugging Face ViT5',
        cliCommand: 'pip install transformers sentencepiece torch',
        jsonConfig: '{\n  \"model_name\": \"VietAI/vit5-base\",\n  \"architecture\": \"t5\",\n  \"task\": \"text2text-generation\"\n}'
      }
    ],
    status: 'published',
    stars: 390,
    featured: false,
    linkHealth: 'healthy'
  },
  {
    id: 'vn-repo-vncorenlp-pipeline',
    slug: 'vncorenlp-pipeline-vietnamese',
    name: 'VnCoreNLP - Bộ Công Cụ Xử Lý Tiếng Việt Chuyên Sâu Đa Tầng',
    icon: 'GitPullRequest',
    toolType: 'skill',
    typeNameVi: 'Kỹ năng (Skill)',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['antigravity', 'cursor', 'web'],
    sourceUrl: 'https://github.com/vncorenlp/VnCoreNLP',
    authorName: 'Nhóm Nghiên Cứu VnCoreNLP',
    license: 'GPL-3.0',
    summaryVi: 'Hệ thống xử lý ngôn ngữ tự nhiên tiếng Việt chuyên sâu được công bố tại NAACL 2018, tích hợp đường ống 4 bước: tách từ, gán nhãn từ loại, nhận dạng thực thể (NER) và phân tích phụ thuộc cú pháp.',
    purposeVi: 'Phân tích ngữ pháp chuyên sâu, xây dựng đồ thị tri thức (Knowledge Graph) và trích xuất quan hệ ngữ nghĩa trong các tài liệu học thuật và hợp đồng pháp lý Việt Nam.',
    featuresVi: [
      'Hỗ trợ 4 thành phần cốt lõi: Tách từ (RDRsegmenter), Gán nhãn (RDRPOSTagger), Thực thể (VnNER) và Phân tích cú pháp (VnParser)',
      'Tốc độ xử lý siêu nhanh đạt hàng ngàn câu mỗi giây nhờ viết trên nền tảng Java tối ưu',
      'Có thư viện bọc ngoài Python (Python wrapper) tiện lợi cho việc tích hợp vào hệ thống AI',
      'Độ tin cậy khoa học cao được khẳng định qua hàng trăm công bố quốc tế'
    ],
    installGuideVi: 'Bước 1: Cài đặt gói Python: `pip install vncorenlp`.\nBước 2: Tải tệp thực thi JAR và thư mục mô hình theo hướng dẫn trên kho GitHub chính thức.\nBước 3: Khởi tạo tiến trình server Java cục bộ qua lớp `VnCoreNLP`.\nBước 4: Gọi phương thức `annotate` để nhận cấu trúc dữ liệu đa tầng.',
    usageGuideVi: 'Mẫu mã nguồn phân tích văn bản chuyên sâu với VnCoreNLP:\n```python\nfrom vncorenlp import VnCoreNLP\n\nannotator = VnCoreNLP(\"VnCoreNLP-1.1.1.jar\", annotators=\"wseg,pos,ner,parse\", max_heap_size=\"-Xmx2g\")\nvan_ban = \"Ông Nguyễn Văn An hiện đang công tác tại Tập đoàn Viettel Hà Nội.\"\nket_qua = annotator.annotate(van_ban)\nprint(\"Phân tích thành phần câu:\", ket_qua)\nannotator.close()\n```',
    samplePromptsVi: [
      'Trích xuất tên người, tên tổ chức và địa danh trong hồ sơ lý lịch tư pháp',
      'Phân tích quan hệ phụ thuộc cú pháp để phát hiện mâu thuẫn trong điều khoản hợp đồng'
    ],
    demoImages: [],
    imageUrl: '',
    configs: [
      {
        platform: 'antigravity',
        platformName: 'Python VnCoreNLP Wrapper',
        cliCommand: 'pip install vncorenlp',
        jsonConfig: '{\n  \"annotators\": [\"wseg\", \"pos\", \"ner\", \"parse\"],\n  \"max_heap_size\": \"-Xmx2g\"\n}'
      }
    ],
    status: 'published',
    stars: 1320,
    featured: true,
    linkHealth: 'healthy'
  },
  {
    id: 'vn-repo-vistral-llm',
    slug: 'vistral-7b-chat-vietnamese',
    name: 'Vistral - Mô Hình Ngôn Ngữ Lớn Tiếng Việt 7B Chuyên Sâu',
    icon: 'Brain',
    toolType: 'agent',
    typeNameVi: 'Tác tử AI (Agent)',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['antigravity', 'cursor', 'web'],
    sourceUrl: 'https://huggingface.co/Viet-Mistral/Vistral-7B-Chat',
    authorName: 'Viet-Mistral & AIVM',
    license: 'Apache-2.0',
    summaryVi: 'Mô hình ngôn ngữ lớn nguồn mở 7 tỷ tham số chuyên biệt cho tiếng Việt, kế thừa kiến trúc Mistral 7B và được mở rộng tri thức về lịch sử, văn hóa, đời sống xã hội và pháp luật Việt Nam.',
    purposeVi: 'Đóng vai trò trợ lý ảo đàm thoại thông minh, hỗ trợ soạn thảo văn bản, lập trình và tư vấn thông tin bản địa hóa chuẩn tiếng Việt tự nhiên.',
    featuresVi: [
      'Xây dựng trên nền tảng Mistral 7B với bộ từ vựng mở rộng cho tiếng Việt',
      'Hiểu sâu văn hóa, tục ngữ, thành ngữ và bối cảnh hành chính của người Việt',
      'Được huấn luyện theo phương pháp căn chỉnh DPO (Direct Preference Optimization)',
      'Hỗ trợ định dạng lượng tử hóa GGUF chạy mượt mà trên máy tính cá nhân bằng Ollama'
    ],
    installGuideVi: 'Bước 1: Cài đặt công cụ chạy mô hình cục bộ Ollama: `curl -fsSL https://ollama.com/install.sh | sh`.\nBước 2: Tải phiên bản mô hình Vistral lượng tử: `ollama run vistral:7b-chat`.\nBước 3: Kết nối API với máy chủ Ollama chạy ở cổng 11434.\nBước 4: Gửi kịch bản đối thoại bằng tiếng Việt có chỉ dẫn hệ thống rõ ràng.',
    usageGuideVi: 'Mẫu mã nguồn gọi mô hình Vistral 7B qua giao thức OpenAI tương thích:\n```python\nfrom openai import OpenAI\n\nclient = OpenAI(base_url=\"http://localhost:11434/v1\", api_key=\"ollama\")\nresponse = client.chat.completions.create(\n    model=\"vistral:7b-chat\",\n    messages=[\n        {\"role\": \"system\", \"content\": \"Bạn là trợ lý AI am hiểu văn hóa và pháp luật doanh nghiệp Việt Nam.\"},\n        {\"role\": \"user\", \"content\": \"Hãy giải thích quyền lợi của người lao động trong thời gian thử việc theo Bộ luật Lao động 2019.\"}\n    ]\n)\nprint(response.choices[0].message.content)\n```',
    samplePromptsVi: [
      'Tư vấn thủ tục đăng ký hộ kinh doanh cá thể theo quy định pháp luật hiện hành',
      'Soạn thảo thư chúc Tết gửi đối tác khách hàng mang đậm bản sắc văn hóa Việt Nam'
    ],
    demoImages: [],
    imageUrl: '',
    configs: [
      {
        platform: 'antigravity',
        platformName: 'Ollama Model Runner',
        cliCommand: 'ollama run vistral:7b-chat',
        jsonConfig: '{\n  \"model\": \"vistral:7b-chat\",\n  \"api_endpoint\": \"http://localhost:11434/v1\",\n  \"context_window\": 8192\n}'
      }
    ],
    status: 'published',
    stars: 850,
    featured: true,
    linkHealth: 'healthy'
  },
  {
    id: 'vn-repo-vnstock-thinhvu',
    slug: 'vnstock-market-data-toolkit',
    name: 'vnstock - Hệ Sinh Thái Dữ Liệu Thị Trường Tài Chính Chứng Khoán Việt Nam',
    icon: 'Database',
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP (MCP)',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['antigravity', 'cursor', 'web'],
    sourceUrl: 'https://github.com/thinh-vu/vnstock',
    authorName: 'Thịnh Vũ (thinh-vu)',
    license: 'MIT',
    summaryVi: 'Bộ công cụ mã nguồn mở bằng Python hàng đầu tại Việt Nam để truy vấn dữ liệu giá cổ phiếu thời gian thực, bảng cân đối kế toán, lưu chuyển tiền tệ và định giá doanh nghiệp trên các sàn HOSE, HNX, UPCoM.',
    purposeVi: 'Cung cấp nguồn cấp dữ liệu tài chính sạch cho các tác tử phân tích định lượng, thuật toán giao dịch tự động và báo cáo khuyến nghị đầu tư chứng khoán.',
    featuresVi: [
      'Truy xuất lịch sử giá nến (OHLCV) theo ngày, giờ, phút cho toàn bộ mã chứng khoán',
      'Đọc đầy đủ các chỉ số tài chính P/E, P/B, ROE, ROA và cơ cấu cổ đông doanh nghiệp',
      'Theo dõi biến động dòng tiền của khối ngoại, tự doanh và các ngành nghề trọng điểm',
      'Tích hợp sẵn bộ lọc cổ phiếu theo tiêu chí cơ bản và phân tích kỹ thuật'
    ],
    installGuideVi: 'Bước 1: Cài đặt thư viện qua pip: `pip install vnstock`.\nBước 2: Import module `Vnstock` trong chương trình Python.\nBước 3: Chỉ định mã cổ phiếu cần phân tích (ví dụ: VNM, FPT, HPG, VCB).\nBước 4: Gọi các hàm trích xuất dữ liệu tài chính hoặc bảng giá khớp lệnh.',
    usageGuideVi: 'Mẫu mã nguồn truy vấn dữ liệu tài chính chứng khoán với vnstock:\n```python\nfrom vnstock import Vnstock\n\nstock = Vnstock().stock(symbol=\"FPT\", source=\"VCI\")\ndu_lieu_gia = stock.quote.history(start=\"2026-01-01\", end=\"2026-10-20\")\nprint(\"Lịch sử giá giao dịch:\")\nprint(du_lieu_gia.tail())\n\nchi_so_tc = stock.finance.ratio(period=\"year\")\nprint(\"Chỉ số tài chính cơ bản:\")\nprint(chi_so_tc.head())\n```',
    samplePromptsVi: [
      'Phân tích định giá P/E và tiềm năng tăng trưởng doanh thu của nhóm cổ phiếu công nghệ',
      'Tự động tổng hợp danh sách các mã cổ phiếu có tỷ suất cổ tức tiền mặt trên 8% năm'
    ],
    demoImages: [],
    imageUrl: '',
    configs: [
      {
        platform: 'antigravity',
        platformName: 'Python Finance SDK',
        cliCommand: 'pip install vnstock',
        jsonConfig: '{\n  \"package\": \"vnstock\",\n  \"markets\": [\"HOSE\", \"HNX\", \"UPCOM\"],\n  \"data_source\": \"VCI\"\n}'
      }
    ],
    status: 'published',
    stars: 2150,
    featured: true,
    linkHealth: 'healthy'
  },
  {
    id: 'vn-repo-diagioihanhchinh-vn',
    slug: 'diagioi-hanhchinh-vietnam-database',
    name: 'DiaGioiHanhChinhVN - Cơ Sở Dữ Liệu 63 Tỉnh Thành & Xã Phường Chuẩn Tổng Cục Thống Kê',
    icon: 'Globe',
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP (MCP)',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['antigravity', 'cursor', 'web'],
    sourceUrl: 'https://github.com/kenzouno1/DiaGioiHanhChinhVN',
    authorName: 'Kenzouno1',
    license: 'MIT',
    summaryVi: 'Kho dữ liệu JSON và API tra cứu cấu trúc địa giới hành chính Việt Nam gồm 63 tỉnh/thành phố, toàn bộ quận/huyện/thị xã và xã/phường/thị trấn theo chuẩn mã số Tổng cục Thống kê.',
    purposeVi: 'Chuẩn hóa địa chỉ giao hàng thương mại điện tử, tự động hóa gợi ý biểu mẫu đăng ký thông tin khách hàng và phân vùng vận chuyển logistics tại Việt Nam.',
    featuresVi: [
      'Phân cấp 3 tầng dữ liệu chặt chẽ: Tỉnh/Thành phố -> Quận/Huyện/Thị xã -> Xã/Phường/Thị trấn',
      'Đính kèm mã số định danh hành chính chính thức theo quy định nhà nước',
      'Dữ liệu JSON tĩnh đóng gói sẵn, có thể sử dụng offline không cần kết nối mạng',
      'Dễ dàng tích hợp vào biểu mẫu chọn địa chỉ đa cấp (Cascading Dropdown)'
    ],
    installGuideVi: 'Bước 1: Sao chép tệp `data.json` từ kho lưu trữ hoặc gọi qua CDN raw git.\nBước 2: Nạp dữ liệu vào bộ nhớ ứng dụng hoặc nạp vào bảng cơ sở dữ liệu SQL/NoSQL.\nBước 3: Lọc danh sách quận huyện theo ID tỉnh thành được người dùng lựa chọn.\nBước 4: Hoàn thiện chuỗi địa chỉ giao hàng theo cấu trúc chuẩn hoá quốc gia.',
    usageGuideVi: 'Mẫu mã nguồn tra cứu địa giới hành chính bằng JavaScript / TypeScript:\n```typescript\nimport rawData from \"./DiaGioiHanhChinhVN.json\";\n\ninterface Province {\n  Id: string;\n  Name: string;\n  Districts: { Id: string; Name: string; Wards: { Id: string; Name: string }[] }[];\n}\n\nconst provinces: Province[] = rawData;\nfunction getDistrictsByProvinceName(provinceName: string) {\n  const p = provinces.find(item => item.Name.toLowerCase().includes(provinceName.toLowerCase()));\n  return p ? p.Districts.map(d => d.Name) : [];\n}\nconsole.log(getDistrictsByProvinceName(\"Hà Nội\"));\n```',
    samplePromptsVi: [
      'Tự động phân tách chuỗi địa chỉ tự do của khách hàng thành Tỉnh, Huyện, Xã chuẩn',
      'Xây dựng biểu mẫu chọn địa chỉ giao nhận hàng hóa chuẩn cho sàn thương mại điện tử'
    ],
    demoImages: [],
    imageUrl: '',
    configs: [
      {
        platform: 'antigravity',
        platformName: 'Node.js / Browser JSON',
        cliCommand: 'npm install axios',
        jsonConfig: '{\n  \"data_source\": \"https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json\",\n  \"levels\": [\"province\", \"district\", \"ward\"]\n}'
      }
    ],
    status: 'published',
    stars: 1450,
    featured: false,
    linkHealth: 'healthy'
  },
  {
    id: 'vn-repo-sepay-webhook-mcp',
    slug: 'sepay-webhook-banking-automation-mcp',
    name: 'SePay Webhook MCP - Đối Soát Tự Động Biến Động Số Dư & Thanh Toán VietQR',
    icon: 'Database',
    toolType: 'mcp',
    typeNameVi: 'Máy chủ MCP (MCP)',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['antigravity', 'cursor', 'web'],
    sourceUrl: 'https://github.com/sepayvn/laravel-sepay',
    authorName: 'SePay Vietnam',
    license: 'MIT',
    summaryVi: 'Máy chủ MCP tích hợp cổng thông báo Webhook SePay, tự động lắng nghe và phân tích biến động số dư chuyển khoản ngân hàng Việt Nam (MBBank, VCB, Techcombank, ACB...).',
    purposeVi: 'Khớp lệnh đơn hàng thương mại điện tử và nạp tiền tự động trong vòng 2 giây không qua trung gian thẻ quốc tế, tiết kiệm chi phí giao dịch cho doanh nghiệp.',
    featuresVi: [
      'Nhận dữ liệu giao dịch biến động số dư chuyển khoản theo thời gian thực (Real-time Webhook)',
      'Tự động phân tích nội dung chuyển khoản để trích xuất mã đơn hàng (Order Code)',
      'Cơ chế bảo mật xác thực Token Header ngăn ngừa tấn công giả mạo giao dịch',
      'Hỗ trợ tích hợp hầu hết các ngân hàng lớn tại Việt Nam qua chuẩn VietQR'
    ],
    installGuideVi: 'Bước 1: Đăng ký tài khoản trên nền tảng SePay và thiết lập mã Token API an toàn.\nBước 2: Cài đặt thư viện hoặc dựng máy chủ Node.js / Laravel nhận webhook.\nBước 3: Cấu hình địa chỉ URL webhook trong trang quản trị SePay.\nBước 4: Bắt sự kiện webhook và tự động cập nhật trạng thái đơn hàng sang Đã Thanh Toán.',
    usageGuideVi: 'Mẫu mã nguồn máy chủ tiếp nhận Webhook ngân hàng SePay:\n```javascript\nimport express from \"express\";\nconst app = express();\napp.use(express.json());\n\nconst SEPAY_API_KEY = process.env.SEPAY_API_KEY;\napp.post(\"/webhook/sepay\", (req, res) => {\n  const token = req.headers[\"authorization\"];\n  if (token !== `Apikey ${SEPAY_API_KEY}`) {\n    return res.status(401).json({ error: \"Mã xác thực không hợp lệ\" });\n  }\n  const { gateway, transactionDate, transferType, transferAmount, content } = req.body;\n  if (transferType === \"in\") {\n    console.log(`Đã nhận ${transferAmount} VNĐ qua ${gateway}. Nội dung: ${content}`);\n  }\n  res.json({ success: true });\n});\napp.listen(3001);\n```',
    samplePromptsVi: [
      'Xây dựng webhook tự động kích hoạt tài khoản VIP khi khách hàng chuyển khoản đúng cú pháp',
      'Tự động gửi tin nhắn cảm ơn và xuất hóa đơn điện tử ngay khi nhận được tiền thanh toán'
    ],
    demoImages: [],
    imageUrl: '',
    configs: [
      {
        platform: 'antigravity',
        platformName: 'Express Webhook Server',
        cliCommand: 'npm install express dotenv',
        jsonConfig: '{\n  \"service\": \"sepay\",\n  \"webhook_endpoint\": \"/webhook/sepay\",\n  \"supported_banks\": [\"MBBank\", \"Vietcombank\", \"Techcombank\", \"ACB\"]\n}'
      }
    ],
    status: 'published',
    stars: 520,
    featured: true,
    linkHealth: 'healthy'
  },
  {
    id: 'vn-repo-pyvnlunar-calendar',
    slug: 'pyvnlunar-astronomical-calendar',
    name: 'pyvnlunar - Thuật Toán Chuyển Đổi Âm Lịch Thiên Văn Việt Nam Hồ Ngọc Đức',
    icon: 'Sparkles',
    toolType: 'skill',
    typeNameVi: 'Kỹ năng (Skill)',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['antigravity', 'cursor', 'web'],
    sourceUrl: 'https://github.com/Min9802/pyvnlunar',
    authorName: 'Min9802 & Hồ Ngọc Đức',
    license: 'MIT',
    summaryVi: 'Thư viện tính Âm lịch Việt Nam chuẩn xác dựa trên các thuật toán cơ học thiên văn của Jean Meeus và công thức tính lịch tiết khí của Tiến sĩ Hồ Ngọc Đức.',
    purposeVi: 'Chuyển đổi qua lại giữa ngày dương lịch và âm lịch Việt Nam, tính toán tháng nhuận, giờ hoàng đạo, can chi ngày tháng năm cho các ứng dụng phong tục và lên lịch sự kiện.',
    featuresVi: [
      'Tính toán chính xác theo múi giờ chuẩn của Việt Nam (+7 UTC)',
      'Xác định chính xác tháng nhuận âm lịch theo quy luật thiên văn thực tế',
      'Trích xuất đầy đủ Can Chi của Giờ, Ngày, Tháng, Năm (ví dụ: Giáp Thìn, Ất Tỵ)',
      'Hỗ trợ tra cứu 24 tiết khí trong năm (Lập xuân, Hạ chí, Thu phân, Đông chí)'
    ],
    installGuideVi: 'Bước 1: Cài đặt thư viện qua pip: `pip install pyvnlunar`.\nBước 2: Khai báo import module chuyển đổi lịch trong chương trình Python.\nBước 3: Truyền ngày, tháng, năm dương lịch để nhận cấu trúc ngày âm lịch tương ứng.\nBước 4: Đọc các trường thông tin can chi và tiết khí phục vụ hiển thị.',
    usageGuideVi: 'Mẫu mã nguồn tra cứu âm lịch và can chi với pyvnlunar:\n```python\nfrom pyvnlunar import LunarDate\n\nngay_duong = LunarDate.from_solar(2026, 10, 20)\nprint(\"Ngày âm lịch:\", ngay_duong.lunar_day, ngay_duong.lunar_month, ngay_duong.lunar_year)\nprint(\"Năm can chi:\", ngay_duong.can_chi_year)\nprint(\"Tháng can chi:\", ngay_duong.can_chi_month)\nprint(\"Ngày can chi:\", ngay_duong.can_chi_day)\nprint(\"Tiết khí hiện tại:\", ngay_duong.solar_term)\n```',
    samplePromptsVi: [
      'Tìm ngày tốt giờ hoàng đạo cho lễ khai trương văn phòng công ty trong tháng 11',
      'Tự động gửi thông báo nhắc lịch cúng rằm và ngày lễ tết truyền thống Việt Nam'
    ],
    demoImages: [],
    imageUrl: '',
    configs: [
      {
        platform: 'antigravity',
        platformName: 'Python Lunar Calendar',
        cliCommand: 'pip install pyvnlunar',
        jsonConfig: '{\n  \"package\": \"pyvnlunar\",\n  \"timezone\": \"Asia/Ho_Chi_Minh\",\n  \"calendar_standard\": \"HoNgocDuc\"\n}'
      }
    ],
    status: 'published',
    stars: 180,
    featured: false,
    linkHealth: 'healthy'
  },
  {
    id: 'vn-repo-vietnamese-spellchecker',
    slug: 'vietnamese-spellcheck-tone-normalizer',
    name: 'Vietnamese Tone Normalization & Spell Checker - Chuẩn Hóa Dấu Và Sửa Lỗi Chính Tả Tiếng Việt',
    icon: 'FolderTree',
    toolType: 'skill',
    typeNameVi: 'Kỹ năng (Skill)',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['antigravity', 'cursor', 'web'],
    sourceUrl: 'https://github.com/vunb/vietnamese-tone-normalizer',
    authorName: 'Vũ Nguyên Bình (vunb)',
    license: 'MIT',
    summaryVi: 'Kỹ năng tác tử kiểm tra và sửa lỗi chính tả tiếng Việt tự động, bao gồm chuẩn hóa đặt dấu kiểu mới (òa, úy) hoặc kiểu cũ (oà, uý), sửa nhầm lẫn phụ âm d/gi/r, tr/ch, s/x và dấu hỏi/ngã.',
    purposeVi: 'Nâng cao chất lượng văn bản trước khi xuất bản, rà soát lỗi chính tả trong bài viết marketing và làm sạch dữ liệu văn bản người dùng nhập liệu.',
    featuresVi: [
      'Quy chuẩn vị trí đặt dấu thanh theo chuẩn chính tả hiện đại của Bộ Giáo dục',
      'Thuật toán phát hiện từ sai chính tả dựa trên từ điển tiếng Việt hơn 100.000 từ',
      'Đề xuất từ thay thế phù hợp với ngữ cảnh của câu',
      'Tự động xử lý bảng mã lỗi font tiếng Việt (TCVN3, VNI sang Unicode chuẩn)'
    ],
    installGuideVi: 'Bước 1: Cài đặt thư viện qua pip: `pip install vietnamese-tone-normalizer`.\nBước 2: Import module chuẩn hóa thanh điệu `normalize_tone`.\nBước 3: Chỉ định phong cách đặt dấu (chuẩn mới hoặc chuẩn truyền thống).\nBước 4: Thực thi hàm chuẩn hóa trên toàn bộ chuỗi văn bản đầu vào.',
    usageGuideVi: 'Mẫu mã nguồn chuẩn hóa dấu tiếng Việt:\n```python\nfrom vietnamese_tone_normalizer import normalize_tone\n\nvan_ban_goc = \"Hôm nay thoi tiet rat dep, chúng ta cùng bàn về viec đổi mới công nghe.\"\nvan_ban_chuan = normalize_tone(van_ban_goc, tone_style=\"modern\")\nprint(\"Văn bản sau chuẩn hóa:\", van_ban_chuan)\n```',
    samplePromptsVi: [
      'Rà soát và sửa lỗi chính tả toàn bộ nội dung hợp đồng thương mại trước khi ký kết',
      'Chuẩn hóa các bài viết tin tức sang chuẩn dấu thanh thanh điệu thống nhất toàn tòa soạn'
    ],
    demoImages: [],
    imageUrl: '',
    configs: [
      {
        platform: 'antigravity',
        platformName: 'Python Text Normalizer',
        cliCommand: 'pip install vietnamese-tone-normalizer',
        jsonConfig: '{\n  \"package\": \"vietnamese-tone-normalizer\",\n  \"tone_style\": \"modern\",\n  \"encoding\": \"UTF-8\"\n}'
      }
    ],
    status: 'published',
    stars: 290,
    featured: false,
    linkHealth: 'healthy'
  },
  {
    id: 'vn-repo-bkai-foundation-models',
    slug: 'bkai-nlp-foundation-models',
    name: 'BKAI Foundation Models - Bộ Mô Hình Nền Tảng AI Đại Học Bách Khoa Hà Nội',
    icon: 'Brain',
    toolType: 'agent',
    typeNameVi: 'Tác tử AI (Agent)',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['antigravity', 'cursor', 'web'],
    sourceUrl: 'https://github.com/bkai-foundation-models',
    authorName: 'Bách Khoa AI Lab (HUST)',
    license: 'MIT',
    summaryVi: 'Tập hợp các mô hình ngôn ngữ và thị giác máy tính do Phòng Thí Nghiệm Trí Tuệ Nhân Tạo Đại Học Bách Khoa Hà Nội nghiên cứu và công bố cho cộng đồng học thuật Việt Nam.',
    purposeVi: 'Ứng dụng trong các bài toán đọc hiểu tài liệu tiếng Việt, hệ thống hỏi đáp y tế pháp luật và phân tích hình ảnh chuyên biệt cho người Việt.',
    featuresVi: [
      'Mô hình trả lời câu hỏi đọc hiểu BKAI-QA đạt kết quả xuất sắc trên bộ dữ liệu ViQuAD',
      'Mô hình biểu diễn ngữ nghĩa tiếng Việt ViDeBERTa phục vụ tìm kiếm ngữ nghĩa nâng cao',
      'Mã nguồn mở hoàn toàn, có hướng dẫn tái tạo kết quả huấn luyện chi tiết',
      'Tối ưu hóa đặc thù cho các bài toán phân loại thông tin trong doanh nghiệp Việt'
    ],
    installGuideVi: 'Bước 1: Cài đặt thư viện Transformers và PyTorch: `pip install transformers torch`.\nBước 2: Tải mô hình từ kho Hugging Face của tổ chức BKAI.\nBước 3: Cung cấp đoạn văn bản ngữ cảnh (Context) và câu hỏi (Question).\nBước 4: Nhận câu trả lời trích xuất chính xác theo vị trí ký tự.',
    usageGuideVi: 'Mẫu mã nguồn hỏi đáp tự động với mô hình BKAI:\n```python\nimport torch\nfrom transformers import pipeline\n\nqa_pipeline = pipeline(\n    task=\"question-answering\",\n    model=\"bkai-foundation-models/vietnamese-bi-encoder\",\n    tokenizer=\"bkai-foundation-models/vietnamese-bi-encoder\"\n)\n\nngu_canh = \"Đại học Bách khoa Hà Nội được thành lập năm 1956, là trường đại học kỹ thuật đầu tiên của Việt Nam.\"\ncau_hoi = \"Trường Bách khoa Hà Nội được thành lập vào năm nào?\"\nket_qua = qa_pipeline(question=cau_hoi, context=ngu_canh)\nprint(\"Câu trả lời:\", ket_qua[\"answer\"])\n```',
    samplePromptsVi: [
      'Xây dựng trợ lý ảo trả lời chính sách bảo hành nội bộ công ty dựa trên sổ tay nhân viên',
      'Tìm kiếm đoạn văn bản trả lời phù hợp nhất trong tài liệu kỹ thuật dài hàng trăm trang'
    ],
    demoImages: [],
    imageUrl: '',
    configs: [
      {
        platform: 'antigravity',
        platformName: 'BKAI Hugging Face',
        cliCommand: 'pip install transformers torch',
        jsonConfig: '{\n  \"organization\": \"bkai-foundation-models\",\n  \"framework\": \"transformers\",\n  \"task\": \"question-answering\"\n}'
      }
    ],
    status: 'published',
    stars: 460,
    featured: false,
    linkHealth: 'healthy'
  },
  {
    id: 'vn-repo-vivos-speech-corpus',
    slug: 'vivos-speech-corpus-vietnamese',
    name: 'VIVOS - Bộ Ngữ Liệu Và Bản Mẫu Huấn Luyện Giọng Nói Tiếng Việt AIVIVN',
    icon: 'Box',
    toolType: 'template',
    typeNameVi: 'Bản mẫu (Template)',
    category: 'vietnam',
    categoryNameVi: '🇻🇳 Thị Trường Việt Nam',
    platforms: ['antigravity', 'cursor', 'web'],
    sourceUrl: 'https://github.com/aivivn/vivos',
    authorName: 'AIVIVN Group',
    license: 'CC-BY-SA-4.0',
    summaryVi: 'Bộ ngữ liệu âm thanh tiếng Việt nguồn mở gồm 15 giờ ghi âm giọng đọc chuẩn từ 65 người nói, đi kèm mã nguồn mẫu để huấn luyện các hệ thống nhận dạng tiếng nói tự động ASR.',
    purposeVi: 'Làm dữ liệu đo chuẩn (benchmark) và mẫu khởi tạo dự án cho các nhà nghiên cứu và lập trình viên phát triển giải pháp giọng nói AI tiếng Việt.',
    featuresVi: [
      'Bộ ngữ liệu 15 giờ ghi âm với độ phân giải cao 16-bit 44.1kHz',
      'Được ghi âm bởi 65 người bản xứ đại diện cho các vùng miền khác nhau',
      'Đính kèm văn bản nhãn chuẩn xác 100% không chứa lỗi ngữ pháp',
      'Cấu trúc thư mục chia sẵn tập train/test theo đúng chuẩn các cuộc thi quốc tế'
    ],
    installGuideVi: 'Bước 1: Tải bộ dữ liệu VIVOS từ trang chủ AIVIVN hoặc kho GitHub.\nBước 2: Giải nén tệp lưu trữ và kiểm tra thư mục `train` và `test`.\nBước 3: Chạy tập lệnh chuẩn bị dữ liệu (data preparation) để sinh danh sách tệp âm thanh.\nBước 4: Nạp vào pipeline huấn luyện mô hình Kaldi, ESPnet hoặc Hugging Face Wav2Vec2.',
    usageGuideVi: 'Mẫu mã nguồn nạp dữ liệu VIVOS bằng thư viện Datasets của Hugging Face:\n```python\nfrom datasets import load_dataset\n\nvivos_dataset = load_dataset(\"vivos\")\nprint(\"Tập dữ liệu huấn luyện:\", vivos_dataset[\"train\"])\nprint(\"Mẫu âm thanh đầu tiên:\", vivos_dataset[\"train\"][0])\n```',
    samplePromptsVi: [
      'Huấn luyện mô hình nhận dạng giọng nói thích ứng cho môi trường tổng đài chăm sóc khách hàng',
      'Đo lường độ chính xác (Word Error Rate - WER) của mô hình ASR trên tập kiểm thử VIVOS'
    ],
    demoImages: [],
    imageUrl: '',
    configs: [
      {
        platform: 'antigravity',
        platformName: 'Hugging Face Datasets',
        cliCommand: 'pip install datasets soundfile librosa',
        jsonConfig: '{\n  \"dataset_name\": \"vivos\",\n  \"duration_hours\": 15,\n  \"speakers_count\": 65\n}'
      }
    ],
    status: 'published',
    stars: 740,
    featured: false,
    linkHealth: 'healthy'
  }
];

let addedCount = 0;
for (const item of newVNTools) {
  const existingIdx = tools.findIndex(t => t.id === item.id || t.slug === item.slug);
  if (existingIdx >= 0) {
    tools[existingIdx] = { ...tools[existingIdx], ...item };
  } else {
    tools.unshift(item);
    addedCount++;
  }
}

fs.writeFileSync(filePath, JSON.stringify(tools, null, 2), 'utf8');
console.log(`Thành công! Đã thêm mới ${addedCount} công cụ thị trường Việt Nam. Tổng số công cụ hiện tại: ${tools.length}`);
