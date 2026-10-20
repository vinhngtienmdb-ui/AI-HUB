const fs = require('fs');
const path = require('path');

const allToolsPath = path.join(__dirname, '../src/data/allTools.json');
const tools = JSON.parse(fs.readFileSync(allToolsPath, 'utf8'));

console.log(`Bắt đầu phân loại lại toàn diện ${tools.length} công cụ...`);

const domainNamesVi = {
  finance_payment: 'Tài chính, Ngân hàng & Thuế',
  legal_public_service: 'Pháp luật & Hành chính công',
  business_admin: 'Doanh nghiệp & Quản trị',
  ecommerce_retail: 'Thương mại điện tử & Bán lẻ',
  logistics_transport: 'Vận tải & Logistics',
  telecom_cskh: 'Viễn thông & Chăm sóc khách hàng',
  hr_recruitment: 'Nhân sự & Tuyển dụng',
  ai_nlp_data: 'Trí tuệ nhân tạo & Dữ liệu',
  programming_devops: 'Lập trình & Kỹ thuật phần mềm',
  system_automation: 'Tự động hóa hệ thống & Web'
};

const typeNamesVi = {
  mcp: 'MCP Server',
  skill: 'Skill',
  agent: 'Agent',
  software: 'Phần mềm',
  workflow: 'Workflow',
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
  
  // 1. Finance & Payment & Tax & Accounting & Crypto & Web3
  if (/thanh toán|ngân hàng|payment|vietqr|vnpay|momo|zalopay|thuế|tax|kế toán|accounting|hoá đơn|hóa đơn|tiền tệ|crypto|web3|blockchain|ví điện tử|wallet|lương|payroll|invest|chứng khoán|securities|cổ phiếu|bảo hiểm nhân thọ|bảo việt|pvi|pti|vndirect|ssi|tcbs|mbs|vps|megapay|foxpay|pos terminal|kyber|coin98|ronin|defi|stripe|paypal|bill|invoice/.test(text)) {
    return 'finance_payment';
  }
  
  // 2. Legal & Public Service & Gov & Hospital & Medical & Healthcare & BHXH
  if (/hành chính|dịch vụ công|chính phủ|bộ y tế|bệnh viện|bác sĩ|phòng khám|khám bệnh|dược|thuốc|toa thuốc|bảo hiểm xã hội|bhxh|bhyt|vssid|vneid|cccd|hộ chiếu|visa|evisa|xuất nhập cảnh|đăng kiểm|hải quan|công an|csgt|phạt nguội|văn bản quy phạm|pháp luật|luật |tư pháp|sở hữu trí tuệ|khí tượng|thủy văn|bão|ung bướu|chợ rẫy|bạch mai|vinmec|long châu|pharmacity|an khang|dna|genomics|ncbi|pubmed|pdb|chembl|protein|biology|health|medical|doctor|clinical|hospital|gdpr|compliance/.test(text)) {
    return 'legal_public_service';
  }
  
  // 3. HR & Recruitment
  if (/nhân sự|tuyển dụng|hồ sơ ứng viên|cv|tìm việc|phỏng vấn|chấm công|hợp đồng lao động|econtract|workforce|topcv|vietnamworks|navigos|base hrm|1office hrm|timeoff|bảng lương|thời khóa biểu|recruitment|hiring|job|talent|interview|candidate|resume/.test(text)) {
    return 'hr_recruitment';
  }
  
  // 4. Telecom & Customer Care & Call Center
  if (/viễn thông|tổng đài|call center|contact center|pbx|voip|sip|sms|otp|brandname|tin nhắn thương hiệu|zalo oa|zns|stringee|oncall|vcc|3c|cskh|chăm sóc khách hàng|hotline|điện thoại viên|twilio|sendgrid|mailgun|customer support|intercom|zendesk/.test(text)) {
    return 'telecom_cskh';
  }
  
  // 5. Logistics, Transport, Fulfillment, Warehouse
  if (/vận chuyển|giao hàng|chuyển phát|logistics|vận tải|kho bãi|warehouse|wms|fulfillment|boxme|ghn|ghtk|ninja van|j&t|viettel post|ahamove|be group|xanh sm|xe điện|taxi|grab|đặt xe|vé xe|vexere|bưu chính|cross-docking|shipping|freight|delivery|fleet|courier/.test(text)) {
    return 'logistics_transport';
  }
  
  // 6. E-Commerce & Retail & F&B & Hospitality & Travel
  if (/thương mại điện tử|bán lẻ|retail|shopee|lazada|tiki|tiktok shop|sapo|kiotviet|haravan|đơn hàng|giỏ hàng|pos|siêu thị|thế giới di động|fpt shop|điện máy xanh|cellphones|hoàng hà|yody|canifa|ivy moda|quần áo|thời trang|nhà hàng|buffet|kichi|gogi|golden gate|redsun|highlands coffee|the coffee house|trà sữa|cà phê|du lịch|resort|vinpearl|sun world|bà nà|fansipan|saigontourist|vietravel|mường thanh|khách sạn|hotel|tour|booking|traveloka|klook|gotadi|vntrip|ecommerce|store|shop|merchant|checkout|restaurant/.test(text)) {
    return 'ecommerce_retail';
  }
  
  // 7. Business & Administration & ERP & CRM & University
  if (/doanh nghiệp|quản trị|erp|crm|bravo|effect|fast business|odoo|erpnext|base\.vn|1office|notion|jira|slack|trello|asana|trường đại học|đại học|hust|bách khoa|đhqg|vnuhcm|ueh|fpt university|học trực tuyến|lms|vuihoc|hocmai|topica|monkey junior|prep\.vn|edtech|tuyển sinh|đồ án|salesforce|hubspot|project management|spreadsheet|docs|drive|meeting|zoom|calendar/.test(text)) {
    return 'business_admin';
  }
  
  // 8. AI, NLP, Vision, Speech, Camera AI & Data
  if (/trí tuệ nhân tạo|mô hình ngôn ngữ|llm|nlp|phobert|phogpt|vietocr|nhận diện|thị giác|computer vision|speech|voice|tts|stt|camera|ai view|vcam|fcam|hanet|cctv|giám sát|openai|claude|gemini|deepseek|ollama|vllm|vector|embedding|rag|weaviate|qdrant|chroma|huggingface|whisper|dify|langflow|flowise|autogen|crewai|ai model|machine learning|deep learning|chatgpt|mistral/.test(text)) {
    return 'ai_nlp_data';
  }

  // 9. Programming & DevOps (Git, Code, Debug, Test, Docker, Database, Cloud)
  if (/lập trình|mã nguồn|code|coding|devops|git|github|gitlab|docker|container|kubernetes|k8s|ci\/cd|testing|test|unit test|debug|debugging|refactor|typescript|javascript|python|golang|rust|java|c\+\+|flutter|dart|react|vue|angular|svelte|next\.js|node|sql|database|postgres|mysql|sqlite|redis|mongodb|graphql|api|rest|endpoint|build|compiler|lint|eslint|package|npm|cargo|pip|cloud|aws|azure|gcp|serverless/.test(text)) {
    return 'programming_devops';
  }
  
  // 10. Default: Tự động hóa hệ thống & Web
  return 'system_automation';
}

function classifyToolType(tool) {
  const text = (
    (tool.id || '') + ' ' + 
    (tool.name || '') + ' ' + 
    (tool.summaryVi || '')
  ).toLowerCase();

  // 1. Nếu là phần mềm doanh nghiệp, kế toán, ERP, CRM, portal công... và không phải mcp
  if (tool.toolType !== 'mcp' && /phần mềm kế toán|phần mềm quản lý|hệ thống quản trị|bravo|effect|misa|fast accounting|1office|base\.vn|kiotviet|sapo|bệnh viện|his|emr|cổng dịch vụ công|cổng thông tin|hệ thống tiêm chủng|cổng tuyển sinh|lms đại học/.test(text)) {
    return 'software';
  }

  // 2. Nếu đã có toolType rõ ràng
  if (tool.toolType === 'mcp' || /mcp server|model context protocol/.test(text)) return 'mcp';
  if (tool.toolType === 'workflow' || /quy trình tự động|pipeline/.test(text)) return 'workflow';
  if (tool.toolType === 'command') return 'command';
  if (tool.toolType === 'template') return 'template';
  if (tool.toolType === 'hook') return 'hook';
  if (tool.toolType === 'setting') return 'setting';
  if (tool.toolType === 'agent') return 'agent';
  if (tool.toolType === 'skill') return 'skill';
  
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
