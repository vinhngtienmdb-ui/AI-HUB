const fs = require('fs');
const path = require('path');

const allToolsPath = path.join(__dirname, '../src/data/allTools.json');
const tools = JSON.parse(fs.readFileSync(allToolsPath, 'utf8'));

console.log(`Bắt đầu phân loại lại toàn diện ${tools.length} công cụ...`);

const domainNamesVi = {
  software_development: 'Lập trình & Kỹ thuật phần mềm',
  devops_cloud: 'DevOps, Đám mây & Hạ tầng',
  database_storage: 'Cơ sở dữ liệu & Lưu trữ',
  ai_nlp_vision: 'Trí tuệ nhân tạo, Thị giác & Giọng nói',
  data_analytics_science: 'Dữ liệu lớn, RAG & Phân tích',
  automation_crawling: 'Tự động hóa & Thu thập dữ liệu',
  finance_payment: 'Tài chính, Ngân hàng & Thanh toán',
  accounting_tax: 'Kế toán, Thuế & Hóa đơn',
  crypto_blockchain: 'Tài sản số, Web3 & Blockchain',
  business_erp: 'Doanh nghiệp & Quản trị ERP',
  hr_recruitment: 'Nhân sự & Tuyển dụng',
  telecom_cskh: 'Viễn thông & Chăm sóc khách hàng',
  ecommerce_retail: 'Thương mại điện tử & Bán lẻ',
  logistics_warehouse: 'Vận tải, Giao vận & Kho bãi',
  tourism_hospitality: 'Du lịch, Khách sạn & Nghỉ dưỡng',
  healthcare_medical: 'Y tế, Bệnh viện & Sức khỏe',
  education_training: 'Giáo dục, Đào tạo & Đại học',
  legal_public_service: 'Pháp luật & Hành chính công'
};

const typeNamesVi = {
  mcp: 'MCP Server',
  skill: 'Skill',
  agent: 'Agent',
  api: 'API',
  sdk: 'SDK',
  software: 'Phần mềm',
  workflow: 'Workflow',
  model: 'Model',
  dataset: 'Dataset',
  command: 'Command',
  template: 'Template',
  hook: 'Hook',
  setting: 'Setting'
};

function classifyDomain(tool) {
  const text = (
    (tool.id || '') + ' ' + 
    (tool.name || '') + ' ' + 
    (tool.summaryVi || '') + ' ' + 
    (tool.purposeVi || '') + ' ' + 
    (Array.isArray(tool.tags) ? tool.tags.join(' ') : '')
  ).toLowerCase();

  // 1. Y tế, Bệnh viện, Dược & Sức khỏe
  if (/bệnh viện|bác sĩ|phòng khám|khám bệnh|dược|thuốc|toa thuốc|medpro|chợ rẫy|bạch mai|vinmec|long châu|pharmacity|an khang|ung bướu|y dược|tiêm chủng|vắc xin|sức khỏe|health|medical|doctor|hospital|clinical|dna|genomics|protein|ncbi|pubmed|pdb|chembl|biology|biomolecular|foldseek|alphafold|interpro|jaspar|blast|uniprot|ensembl|clinvar|gnomad|gtex|dbsnp/.test(text)) {
    return 'healthcare_medical';
  }

  // 2. Kế toán, Thuế & Hóa đơn
  if (/kế toán|thuế|tax|hóa đơn|hoá đơn|misa amis|fast accounting|misa sme|etax|quyết toán thuế|giảm trừ gia cảnh|thuế tncn|vat|e-invoice|xml hóa đơn|chuẩn mực kế toán|vas|vfrs|sổ cái|báo cáo tài chính|chứng từ/.test(text)) {
    return 'accounting_tax';
  }

  // 3. Tài sản số, Web3 & Tiền điện tử
  if (/crypto|web3|blockchain|tiền điện tử|tiền mã hóa|ví web3|defi|kyber|coin98|ronin|ethereum|bitcoin|solana|binance|smart contract|nft|token/.test(text)) {
    return 'crypto_blockchain';
  }

  // 4. Tài chính, Ngân hàng & Thanh toán
  if (/thanh toán|ngân hàng|payment|vietqr|vnpay|momo|zalopay|ví điện tử|wallet|lương|payroll|invest|chứng khoán|securities|cổ phiếu|bảo hiểm nhân thọ|bảo việt|pvi|pti|vndirect|ssi|tcbs|mbs|vps|megapay|foxpay|pos terminal|stripe|paypal|bill|banking|open banking|fintech/.test(text)) {
    return 'finance_payment';
  }

  // 5. Du lịch, Khách sạn & Nghỉ dưỡng
  if (/du lịch|khách sạn|resort|vinpearl|sun world|bà nà|fansipan|saigontourist|vietravel|mường thanh|hotel|tour|booking|traveloka|klook|gotadi|vntrip|vexere|vé xe|vé máy bay|vietnam airlines|vietjet|vé cáp treo|tham quan|lữ hành/.test(text)) {
    return 'tourism_hospitality';
  }

  // 6. Giáo dục, Đào tạo & Đại học
  if (/trường đại học|đại học|hust|bách khoa|đhqg|vnuhcm|ueh|fpt university|học trực tuyến|lms|vuihoc|hocmai|topica|monkey junior|prep\.vn|edtech|tuyển sinh|điểm thi|đồ án|sinh viên|giảng viên|khóa học|học tập|e-learning|education/.test(text)) {
    return 'education_training';
  }

  // 7. Pháp luật & Hành chính công
  if (/hành chính|dịch vụ công|chính phủ|bộ công an|bộ tư pháp|bộ tài chính|bộ công thương|vneid|cccd|hộ chiếu|visa|evisa|xuất nhập cảnh|đăng kiểm|hải quan|công an|csgt|phạt nguội|văn bản quy phạm|pháp luật|luật |tư pháp|sở hữu trí tuệ|khí tượng|thủy văn|bão|địa giới|34 tỉnh thành|quốc hội|chính quyền|quản lý nhà nước|đấu thầu|bảo hiểm xã hội|bhxh|bhyt|vssid/.test(text)) {
    return 'legal_public_service';
  }

  // 8. Nhân sự & Tuyển dụng
  if (/nhân sự|tuyển dụng|hồ sơ ứng viên|cv|tìm việc|phỏng vấn|chấm công|hợp đồng lao động|econtract|workforce|topcv|vietnamworks|navigos|base hrm|1office hrm|timeoff|bảng lương|recruitment|hiring|job|talent|interview|candidate|resume/.test(text)) {
    return 'hr_recruitment';
  }

  // 9. Viễn thông & Chăm sóc khách hàng
  if (/viễn thông|tổng đài|call center|contact center|pbx|voip|sip|sms|otp|brandname|tin nhắn thương hiệu|zalo oa|zns|stringee|oncall|vcc|3c|cskh|chăm sóc khách hàng|hotline|điện thoại viên|twilio|sendgrid|mailgun|customer support|intercom|zendesk/.test(text)) {
    return 'telecom_cskh';
  }

  // 10. Vận tải, Giao vận & Kho bãi
  if (/vận chuyển|giao hàng|chuyển phát|logistics|vận tải|kho bãi|warehouse|wms|fulfillment|boxme|ghn|ghtk|ninja van|j&t|viettel post|ahamove|be group|xanh sm|xe điện|taxi|grab|đặt xe|bưu chính|cross-docking|shipping|freight|delivery|fleet|courier/.test(text)) {
    return 'logistics_warehouse';
  }

  // 11. Thương mại điện tử & Bán lẻ
  if (/thương mại điện tử|bán lẻ|retail|shopee|lazada|tiki|tiktok shop|sapo|kiotviet|haravan|đơn hàng|giỏ hàng|pos|siêu thị|thế giới di động|fpt shop|điện máy xanh|cellphones|hoàng hà|yody|canifa|ivy moda|quần áo|thời trang|nhà hàng|buffet|kichi|gogi|golden gate|redsun|highlands coffee|the coffee house|trà sữa|cà phê|f&b|ecommerce|store|shop|merchant|checkout/.test(text)) {
    return 'ecommerce_retail';
  }

  // 12. Doanh nghiệp & Quản trị ERP
  if (/doanh nghiệp|quản trị|erp|crm|bravo|effect|fast business|odoo|erpnext|base\.vn|1office|notion|jira|slack|trello|asana|salesforce|hubspot|project management|spreadsheet|docs|drive|meeting|zoom|calendar|wesign|chữ ký số|văn phòng số/.test(text)) {
    return 'business_erp';
  }

  // 13. Cơ sở dữ liệu & Lưu trữ
  if (/cơ sở dữ liệu|database|postgres|mysql|sqlite|redis|mongodb|supabase|bigtable|dynamodb|firestore|nosql|schema|migration|bảng dữ liệu|truy vấn sql/.test(text)) {
    return 'database_storage';
  }

  // 14. Dữ liệu lớn & Phân tích
  if (/bigquery|dataform|dbt|spark|dataproc|hadoop|data warehouse|data lake|etl|elt|tableau|power bi|phân tích dữ liệu|data analytics|kho dữ liệu|data pipeline|vector database|qdrant|weaviate|chroma|pinecone|rag|embedding/.test(text)) {
    return 'data_analytics_science';
  }

  // 15. DevOps, Đám mây & Hạ tầng
  if (/devops|docker|container|kubernetes|k8s|ci\/cd|pipeline build|helm|terraform|ansible|cloud|aws|azure|gcp|google cloud|serverless|lambda|nginx|linux|ubuntu|deploy|monitoring|grafana|prometheus|cluster|vps|máy chủ/.test(text)) {
    return 'devops_cloud';
  }

  // 16. Trí tuệ nhân tạo, Thị giác & Giọng nói
  if (/trí tuệ nhân tạo|mô hình ngôn ngữ|llm|nlp|phobert|phogpt|vietocr|nhận diện|thị giác|computer vision|speech|voice|tts|stt|camera|ai view|vcam|fcam|hanet|cctv|giám sát|openai|claude|gemini|deepseek|ollama|vllm|whisper|dify|langflow|flowise|autogen|crewai|ai model|machine learning|deep learning|chatgpt|mistral/.test(text)) {
    return 'ai_nlp_vision';
  }

  // 17. Tự động hóa & Thu thập dữ liệu
  if (/thu thập dữ liệu|cào dữ liệu|cào web|crawl|scrape|scraper|crawler|browser-use|puppeteer|playwright|selenium|rpa|tự động hóa trình duyệt|headless browser|crawl4ai|firecrawl|jina/.test(text)) {
    return 'automation_crawling';
  }

  // 18. Mặc định: Phát triển phần mềm & Mã nguồn
  return 'software_development';
}

function classifyToolType(tool) {
  const text = (
    (tool.id || '') + ' ' + 
    (tool.name || '') + ' ' + 
    (tool.summaryVi || '')
  ).toLowerCase();

  // 1. MCP Server
  if (tool.toolType === 'mcp' || /mcp server|model context protocol/.test(text)) return 'mcp';

  // 2. Phần mềm doanh nghiệp / ERP / CRM / Kế toán / HIS (không phải API/SDK thuần túy)
  if (tool.toolType === 'software' || (/phần mềm kế toán|phần mềm quản lý|hệ thống quản trị|bravo|effect|fast business|fast accounting|1office|base\.vn|kiotviet pos|sapo pos|cổng thông tin một cửa|hệ thống tiêm chủng/.test(text) && !/\bsdk\b/.test(text) && !/\bapi\b/.test(tool.id))) {
    return 'software';
  }

  // 3. SDK (Bộ công cụ phát triển phần mềm)
  if (/\bsdk\b|software development kit|client sdk|zmp cli/.test(text)) {
    return 'sdk';
  }

  // 4. API (Cổng giao tiếp lập trình ứng dụng, REST API, GraphQL, Webhook, Connector API)
  if (/\bapi\b|cổng api|rest api|graphql api|endpoint|webhook|connector/.test(text)) {
    return 'api';
  }

  // 5. Model (Mô hình ngôn ngữ, nền tảng AI, checkpoint trọng số)
  if (/mô hình ngôn ngữ|phobert|phogpt|llm model|pre-trained model|foundation model|weights/.test(text)) {
    return 'model';
  }

  // 6. Dataset (Bộ dữ liệu, bản đồ GeoJSON, tập ngữ liệu)
  if (/bộ dữ liệu|tập dữ liệu|geojson|ngữ liệu|corpus/.test(text)) {
    return 'dataset';
  }

  // 7. Workflow (Quy trình tự động hóa)
  if (tool.toolType === 'workflow' || /quy trình tự động|workflow|pipeline/.test(text)) return 'workflow';

  // 8. Command, Template, Hook, Setting
  if (tool.toolType === 'command') return 'command';
  if (tool.toolType === 'template') return 'template';
  if (tool.toolType === 'hook') return 'hook';
  if (tool.toolType === 'setting') return 'setting';

  // 9. Agent
  if (tool.toolType === 'agent' || /\bagent\b|trợ lý tự chủ|autonomous agent|ai bot/.test(text)) return 'agent';

  // 10. Skill (mặc định)
  return 'skill';
}

const domainStats = {};
const typeStats = {};

for (const t of tools) {
  const d = classifyDomain(t);
  const typ = classifyToolType(t);
  
  t.domain = d;
  t.category = d;
  t.categoryNameVi = domainNamesVi[d] || 'Lĩnh vực công nghệ';
  
  t.toolType = typ;
  t.typeNameVi = typeNamesVi[typ] || typ;

  domainStats[d] = (domainStats[d] || 0) + 1;
  typeStats[typ] = (typeStats[typ] || 0) + 1;
}

fs.writeFileSync(allToolsPath, JSON.stringify(tools, null, 2), 'utf8');

console.log('Thống kê 10 Lĩnh vực chuyên môn:');
console.log(domainStats);

console.log('\nThống kê các loại hình thành phần:');
console.log(typeStats);

console.log('\nPhân loại hoàn tất và đã ghi vào src/data/allTools.json!');
