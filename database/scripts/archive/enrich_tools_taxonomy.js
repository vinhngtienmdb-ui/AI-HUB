import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const allToolsPath = path.resolve(__dirname, '../src/data/allTools.json');

const rawData = fs.readFileSync(allToolsPath, 'utf8');
const tools = JSON.parse(rawData);

console.log(`Đang xử lý phân loại chi tiết và đánh dấu thị trường VN cho ${tools.length} công cụ...`);

const CATEGORY_NAME_MAP = {
  'frontend_ui': 'Frontend & Giao diện người dùng',
  'backend_api': 'Backend & Kiến trúc API',
  'mobile_app': 'Ứng dụng di động (Mobile App)',
  'qa_testing': 'Kiểm thử phần mềm & QA/QC',
  'devops_cicd': 'DevOps & Tự động hóa CI/CD',
  'cloud_infrastructure': 'Điện toán đám mây & Hạ tầng số',
  'cybersecurity_security': 'An toàn thông tin & Bảo mật (Security)',
  'database_sql_nosql': 'Cơ sở dữ liệu SQL & NoSQL',
  'vector_rag': 'Dữ liệu Vector & Tìm kiếm tri thức (RAG)',
  'nlp_llm': 'Xử lý ngôn ngữ tự nhiên & Mô hình LLM',
  'computer_vision': 'Thị giác máy tính & Xử lý ảnh (Vision & OCR)',
  'speech_voice': 'Nhận dạng & Xử lý giọng nói (Speech & Audio)',
  'generative_ai_multimedia': 'Sinh nội dung & Đa phương tiện (Generative AI)',
  'data_engineering': 'Kỹ thuật dữ liệu & Đường ống ETL',
  'data_science_analytics': 'Khoa học dữ liệu & Phân tích kinh doanh',
  'web_scraping_crawling': 'Thu thập dữ liệu web & Cào dữ liệu (Scraping)',
  'rpa_workflow_automation': 'Tự động hóa quy trình & RPA (Automation)',
  'banking_open_api': 'Ngân hàng số & Ngân hàng mở (Digital Banking)',
  'payment_gateway': 'Cổng thanh toán & Ví điện tử (Payments)',
  'investment_securities': 'Đầu tư, Chứng khoán & FinTech',
  'accounting_finance': 'Kế toán doanh nghiệp & Báo cáo tài chính',
  'e_invoice_tax': 'Hóa đơn điện tử, Thuế & Chữ ký số (e-Tax)',
  'blockchain_web3': 'Công nghệ chuỗi khối & Web3 (Blockchain)',
  'crypto_defi': 'Tài sản số & Tài chính phi tập trung (DeFi)',
  'erp_enterprise': 'Quản trị tổng thể doanh nghiệp (ERP)',
  'crm_sales': 'Quản lý quan hệ khách hàng (CRM) & Bán hàng',
  'office_digital_docs': 'Văn phòng số & Quản lý văn bản điện tử',
  'hr_recruitment': 'Quản trị nhân sự & Tuyển dụng (HRM)',
  'ecommerce_marketplace': 'Sàn thương mại điện tử & Bán hàng đa kênh',
  'pos_retail': 'Quản lý bán lẻ (POS) & Chuỗi F&B',
  'warehouse_inventory': 'Quản lý kho bãi & Hàng tồn kho (WMS)',
  'logistics_shipping': 'Vận chuyển, Giao nhận & Chuỗi cung ứng',
  'telecom_cskh': 'Tổng đài, Tin nhắn & CSKH tự động (Telecom)',
  'healthcare_medical': 'Y tế số, Bệnh viện & Quản lý phòng khám',
  'pharmacy_wellness': 'Dược phẩm & Chăm sóc sức khỏe',
  'education_edtech': 'Giáo dục trực tuyến & Quản lý đào tạo (EdTech)',
  'legal_public_service': 'Pháp luật & Dịch vụ công số',
  'tourism_hospitality': 'Du lịch, Khách sạn & Nghỉ dưỡng',
  'vietnam': '🇻🇳 Thị Trường Việt Nam',
};

// Hàm xác định xem công cụ có thuộc thị trường Việt Nam hay không
function checkIsVietnamMarket(tool) {
  if (tool.id.startsWith('vn-')) return true;
  if (tool.category === 'vietnam') return true;
  if (tool.isVietnamMarket === true) return true;

  const textToCheck = `${tool.name} ${tool.slug} ${tool.summaryVi} ${tool.purposeVi} ${tool.authorName}`.toLowerCase();
  
  const vnKeywords = [
    'việt nam', 'vietnam', 'vietnamese', 'tiếng việt', 'misa', 'fast', 'vnpt', 'viettel', 'fpt',
    'momo', 'zalopay', 'zalo', 'vneid', 'vietocr', 'phobert', 'medpro', 'chợ rẫy', 'bạch mai',
    'vinmec', 'vinpearl', 'sun world', 'kiotviet', 'sapo', 'ghtk', 'ghn', 'viettel post',
    'vietcombank', 'techcombank', 'vietqr', 'hóa đơn điện tử', 'chữ ký số', 'phạt nguội', 'nghị định 100',
    'căn cước', 'cccd', '34 tỉnh thành', 'đại học bách khoa', 'topcv', '1office', 'bravo', 'base.vn',
    'thuế việt nam', 'etax', 'bảo hiểm xã hội', 'bhxh'
  ];

  return vnKeywords.some(kw => textToCheck.includes(kw));
}

// Hàm xác định danh sách các lĩnh vực chuyên môn phù hợp cho công cụ
function determineCategories(tool, isVn) {
  const catSet = new Set();
  const textToCheck = `${tool.name} ${tool.slug} ${tool.summaryVi} ${tool.purposeVi} ${(tool.featuresVi || []).join(' ')}`.toLowerCase();

  // 1. Kiểm tra Lập trình & Kỹ thuật
  if (textToCheck.includes('react') || textToCheck.includes('vue') || textToCheck.includes('frontend') || textToCheck.includes('ui') || textToCheck.includes('tailwind') || textToCheck.includes('css') || textToCheck.includes('giao diện')) {
    catSet.add('frontend_ui');
  }
  if (textToCheck.includes('api') || textToCheck.includes('backend') || textToCheck.includes('node') || textToCheck.includes('python') || textToCheck.includes('rest') || textToCheck.includes('graphql') || textToCheck.includes('server') || textToCheck.includes('endpoint')) {
    catSet.add('backend_api');
  }
  if (textToCheck.includes('flutter') || textToCheck.includes('react native') || textToCheck.includes('ios') || textToCheck.includes('android') || textToCheck.includes('mobile') || textToCheck.includes('di động')) {
    catSet.add('mobile_app');
  }
  if (textToCheck.includes('test') || textToCheck.includes('kiểm thử') || textToCheck.includes('qa') || textToCheck.includes('jest') || textToCheck.includes('mock') || textToCheck.includes('coverage') || textToCheck.includes('code review')) {
    catSet.add('qa_testing');
  }

  // 2. DevOps & Đám mây & Bảo mật
  if (textToCheck.includes('docker') || textToCheck.includes('kubernetes') || textToCheck.includes('ci/cd') || textToCheck.includes('devops') || textToCheck.includes('pipeline') || textToCheck.includes('git')) {
    catSet.add('devops_cicd');
  }
  if (textToCheck.includes('cloud') || textToCheck.includes('aws') || textToCheck.includes('gcp') || textToCheck.includes('azure') || textToCheck.includes('đám mây') || textToCheck.includes('linux') || textToCheck.includes('server') || textToCheck.includes('hạ tầng')) {
    catSet.add('cloud_infrastructure');
  }
  if (textToCheck.includes('security') || textToCheck.includes('bảo mật') || textToCheck.includes('auth') || textToCheck.includes('xác thực') || textToCheck.includes('mã hóa') || textToCheck.includes('token') || textToCheck.includes('lỗ hổng')) {
    catSet.add('cybersecurity_security');
  }

  // 3. Cơ sở dữ liệu & Vector
  if (textToCheck.includes('database') || textToCheck.includes('postgres') || textToCheck.includes('mysql') || textToCheck.includes('redis') || textToCheck.includes('mongo') || textToCheck.includes('cơ sở dữ liệu') || textToCheck.includes('sql') || textToCheck.includes('supabase')) {
    catSet.add('database_sql_nosql');
  }
  if (textToCheck.includes('vector') || textToCheck.includes('rag') || textToCheck.includes('pinecone') || textToCheck.includes('chroma') || textToCheck.includes('embedding') || textToCheck.includes('tri thức')) {
    catSet.add('vector_rag');
  }

  // 4. Trí tuệ nhân tạo chuyên sâu
  if (textToCheck.includes('nlp') || textToCheck.includes('llm') || textToCheck.includes('ngôn ngữ') || textToCheck.includes('prompt') || textToCheck.includes('dịch') || textToCheck.includes('phobert') || textToCheck.includes('chat') || textToCheck.includes('agent')) {
    catSet.add('nlp_llm');
  }
  if (textToCheck.includes('ocr') || textToCheck.includes('vision') || textToCheck.includes('thị giác') || textToCheck.includes('khuôn mặt') || textToCheck.includes('hình ảnh') || textToCheck.includes('camera') || textToCheck.includes('vietocr')) {
    catSet.add('computer_vision');
  }
  if (textToCheck.includes('voice') || textToCheck.includes('speech') || textToCheck.includes('giọng nói') || textToCheck.includes('âm thanh') || textToCheck.includes('tts') || textToCheck.includes('whisper')) {
    catSet.add('speech_voice');
  }
  if (textToCheck.includes('sinh') || textToCheck.includes('generative') || textToCheck.includes('diffusion') || textToCheck.includes('video') || textToCheck.includes('đa phương tiện') || textToCheck.includes('comfyui')) {
    catSet.add('generative_ai_multimedia');
  }

  // 5. Dữ liệu lớn & Phân tích
  if (textToCheck.includes('spark') || textToCheck.includes('dbt') || textToCheck.includes('airflow') || textToCheck.includes('etl') || textToCheck.includes('đường ống dữ liệu') || textToCheck.includes('data engineering')) {
    catSet.add('data_engineering');
  }
  if (textToCheck.includes('analytics') || textToCheck.includes('phân tích') || textToCheck.includes('bi') || textToCheck.includes('dashboard') || textToCheck.includes('báo cáo') || textToCheck.includes('khoa học dữ liệu')) {
    catSet.add('data_science_analytics');
  }

  // 6. Cào dữ liệu & Tự động hóa
  if (textToCheck.includes('crawl') || textToCheck.includes('cào') || textToCheck.includes('scrape') || textToCheck.includes('browser-use') || textToCheck.includes('thu thập dữ liệu')) {
    catSet.add('web_scraping_crawling');
  }
  if (textToCheck.includes('automation') || textToCheck.includes('tự động hóa') || textToCheck.includes('workflow') || textToCheck.includes('rpa') || textToCheck.includes('n8n') || textToCheck.includes('bot')) {
    catSet.add('rpa_workflow_automation');
  }

  // 7. Tài chính, Ngân hàng & Thanh toán
  if (textToCheck.includes('ngân hàng') || textToCheck.includes('banking') || textToCheck.includes('vietcombank') || textToCheck.includes('techcombank') || textToCheck.includes('b2b')) {
    catSet.add('banking_open_api');
  }
  if (textToCheck.includes('thanh toán') || textToCheck.includes('payment') || textToCheck.includes('vietqr') || textToCheck.includes('momo') || textToCheck.includes('zalopay') || textToCheck.includes('vnpay') || textToCheck.includes('ví điện tử') || textToCheck.includes('qr')) {
    catSet.add('payment_gateway');
  }
  if (textToCheck.includes('chứng khoán') || textToCheck.includes('đầu tư') || textToCheck.includes('cổ phiếu') || textToCheck.includes('securities') || textToCheck.includes('trading') || textToCheck.includes('fintech')) {
    catSet.add('investment_securities');
  }

  // 8. Kế toán, Thuế & Hóa đơn
  if (textToCheck.includes('kế toán') || textToCheck.includes('accounting') || textToCheck.includes('misa') || textToCheck.includes('fast') || textToCheck.includes('sổ sách') || textToCheck.includes('báo cáo tài chính')) {
    catSet.add('accounting_finance');
  }
  if (textToCheck.includes('hóa đơn') || textToCheck.includes('thuế') || textToCheck.includes('etax') || textToCheck.includes('chữ ký số') || textToCheck.includes('ký số') || textToCheck.includes('vnpt-ca') || textToCheck.includes('viettel-ca')) {
    catSet.add('e_invoice_tax');
  }

  // 9. Web3 & Crypto
  if (textToCheck.includes('blockchain') || textToCheck.includes('web3') || textToCheck.includes('chuỗi khối') || textToCheck.includes('smart contract') || textToCheck.includes('solana') || textToCheck.includes('ethereum')) {
    catSet.add('blockchain_web3');
  }
  if (textToCheck.includes('crypto') || textToCheck.includes('tiền mã hóa') || textToCheck.includes('defi') || textToCheck.includes('ví tiền số') || textToCheck.includes('token')) {
    catSet.add('crypto_defi');
  }

  // 10. ERP & Doanh nghiệp
  if (textToCheck.includes('erp') || textToCheck.includes('bravo') || textToCheck.includes('effect') || textToCheck.includes('1office') || textToCheck.includes('quản trị doanh nghiệp') || textToCheck.includes('odoo')) {
    catSet.add('erp_enterprise');
  }
  if (textToCheck.includes('crm') || textToCheck.includes('khách hàng') || textToCheck.includes('bán hàng') || textToCheck.includes('sales') || textToCheck.includes('chăm sóc khách hàng')) {
    catSet.add('crm_sales');
  }
  if (textToCheck.includes('văn phòng') || textToCheck.includes('văn bản') || textToCheck.includes('trình ký') || textToCheck.includes('công văn') || textToCheck.includes('hồ sơ số')) {
    catSet.add('office_digital_docs');
  }
  if (textToCheck.includes('nhân sự') || textToCheck.includes('tuyển dụng') || textToCheck.includes('chấm công') || textToCheck.includes('tính lương') || textToCheck.includes('topcv') || textToCheck.includes('bhxh')) {
    catSet.add('hr_recruitment');
  }

  // 11. Thương mại điện tử & Bán lẻ
  if (textToCheck.includes('shopee') || textToCheck.includes('lazada') || textToCheck.includes('tiki') || textToCheck.includes('tiktok shop') || textToCheck.includes('sàn thương mại') || textToCheck.includes('ecommerce') || textToCheck.includes('omnichannel')) {
    catSet.add('ecommerce_marketplace');
  }
  if (textToCheck.includes('pos') || textToCheck.includes('bán lẻ') || textToCheck.includes('kiotviet') || textToCheck.includes('sapo') || textToCheck.includes('f&b') || textToCheck.includes('nhà hàng') || textToCheck.includes('thu ngân')) {
    catSet.add('pos_retail');
  }

  // 12. Kho bãi & Vận tải
  if (textToCheck.includes('kho') || textToCheck.includes('warehouse') || textToCheck.includes('wms') || textToCheck.includes('tồn kho') || textToCheck.includes('kiểm kê')) {
    catSet.add('warehouse_inventory');
  }
  if (textToCheck.includes('vận chuyển') || textToCheck.includes('logistics') || textToCheck.includes('giao hàng') || textToCheck.includes('ghtk') || textToCheck.includes('ghn') || textToCheck.includes('viettel post') || textToCheck.includes('shipping')) {
    catSet.add('logistics_shipping');
  }

  // 13. Khách hàng & Dịch vụ số
  if (textToCheck.includes('tổng đài') || textToCheck.includes('voip') || textToCheck.includes('zalo oa') || textToCheck.includes('sms') || textToCheck.includes('otp') || textToCheck.includes('cskh') || textToCheck.includes('telecom')) {
    catSet.add('telecom_cskh');
  }
  if (textToCheck.includes('bệnh viện') || textToCheck.includes('y tế') || textToCheck.includes('khám') || textToCheck.includes('medpro') || textToCheck.includes('chợ rẫy') || textToCheck.includes('bạch mai') || textToCheck.includes('vinmec') || textToCheck.includes('emr') || textToCheck.includes('his')) {
    catSet.add('healthcare_medical');
  }
  if (textToCheck.includes('thuốc') || textToCheck.includes('dược') || textToCheck.includes('nhà thuốc') || textToCheck.includes('pharmacy') || textToCheck.includes('sức khỏe')) {
    catSet.add('pharmacy_wellness');
  }
  if (textToCheck.includes('giáo dục') || textToCheck.includes('đại học') || textToCheck.includes('đào tạo') || textToCheck.includes('edtech') || textToCheck.includes('bách khoa') || textToCheck.includes('lms') || textToCheck.includes('học tập')) {
    catSet.add('education_edtech');
  }
  if (textToCheck.includes('luật') || textToCheck.includes('pháp luật') || textToCheck.includes('dịch vụ công') || textToCheck.includes('vneid') || textToCheck.includes('nghị định') || textToCheck.includes('phạt nguội') || textToCheck.includes('cccd') || textToCheck.includes('hành chính')) {
    catSet.add('legal_public_service');
  }
  if (textToCheck.includes('du lịch') || textToCheck.includes('khách sạn') || textToCheck.includes('vinpearl') || textToCheck.includes('sun world') || textToCheck.includes('đặt phòng') || textToCheck.includes('vé máy bay') || textToCheck.includes('tour')) {
    catSet.add('tourism_hospitality');
  }

  // Nếu là công cụ thị trường VN, tự động gắn tag 'vietnam' vào danh sách
  if (isVn) {
    catSet.add('vietnam');
  }

  // Ánh xạ từ category cũ nếu tập hợp rỗng
  if (catSet.size === 0) {
    const oldCat = tool.category;
    if (oldCat === 'software_development') catSet.add('backend_api');
    else if (oldCat === 'devops_cloud') catSet.add('cloud_infrastructure');
    else if (oldCat === 'database_storage') catSet.add('database_sql_nosql');
    else if (oldCat === 'ai_nlp_vision') catSet.add('nlp_llm');
    else if (oldCat === 'data_analytics_science') catSet.add('data_science_analytics');
    else if (oldCat === 'automation_crawling') catSet.add('rpa_workflow_automation');
    else if (oldCat === 'finance_payment') catSet.add('payment_gateway');
    else if (oldCat === 'accounting_tax') catSet.add('accounting_finance');
    else if (oldCat === 'crypto_blockchain') catSet.add('blockchain_web3');
    else if (oldCat === 'business_erp') catSet.add('erp_enterprise');
    else if (oldCat === 'hr_recruitment') catSet.add('hr_recruitment');
    else if (oldCat === 'telecom_cskh') catSet.add('telecom_cskh');
    else if (oldCat === 'ecommerce_retail') catSet.add('ecommerce_marketplace');
    else if (oldCat === 'logistics_warehouse') catSet.add('logistics_shipping');
    else if (oldCat === 'tourism_hospitality') catSet.add('tourism_hospitality');
    else if (oldCat === 'healthcare_medical') catSet.add('healthcare_medical');
    else if (oldCat === 'education_training') catSet.add('education_edtech');
    else if (oldCat === 'legal_public_service') catSet.add('legal_public_service');
    else catSet.add('backend_api');
  }

  return Array.from(catSet);
}

let vnCount = 0;
let multiCatCount = 0;

const updatedTools = tools.map((tool) => {
  const isVn = checkIsVietnamMarket(tool);
  if (isVn) vnCount++;

  const categories = determineCategories(tool, isVn);
  if (categories.length > 1) multiCatCount++;

  const primaryCategory = categories[0] || tool.category;
  const primaryCategoryNameVi = CATEGORY_NAME_MAP[primaryCategory] || tool.categoryNameVi;
  const categoryNamesVi = categories.map(c => CATEGORY_NAME_MAP[c] || c);

  return {
    ...tool,
    isVietnamMarket: isVn,
    category: primaryCategory,
    categoryNameVi: primaryCategoryNameVi,
    categories: categories,
    categoryNamesVi: categoryNamesVi,
  };
});

fs.writeFileSync(allToolsPath, JSON.stringify(updatedTools, null, 2), 'utf8');

console.log(`Đã cập nhật thành công!`);
console.log(`- Tổng số công cụ: ${updatedTools.length}`);
console.log(`- Số công cụ thuộc thị trường Việt Nam (isVietnamMarket = true): ${vnCount}`);
console.log(`- Số công cụ thuộc nhiều hơn 1 lĩnh vực chuyên môn: ${multiCatCount}`);
