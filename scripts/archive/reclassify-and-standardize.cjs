const fs = require('fs');
const path = require('path');

const toolsPath = path.join(__dirname, '../src/data/allTools.json');
const tools = JSON.parse(fs.readFileSync(toolsPath, 'utf8'));

console.log(`Bắt đầu phân loại lại lĩnh vực chuyên môn và chuẩn hóa nhãn cho ${tools.length} công cụ...`);

const categoryMap = {
  finance_payment: 'Tài chính, Ngân hàng & Thuế',
  business_admin: 'Doanh nghiệp & Quản trị',
  ecommerce_retail: 'Thương mại điện tử & Bán lẻ',
  logistics_transport: 'Vận tải & Giao vận',
  telecom_cskh: 'Viễn thông & Chăm sóc khách hàng',
  legal_public_service: 'Pháp luật & Hành chính công',
  hr_recruitment: 'Nhân sự & Tuyển dụng',
  ai_nlp_data: 'Trí tuệ nhân tạo & Dữ liệu',
  programming_devops: 'Lập trình & Kỹ thuật phần mềm',
  system_automation: 'Tự động hóa hệ thống & Web'
};

function xacDinhLinhVuc(t) {
  const text = `${t.id} ${t.name} ${t.tags ? t.tags.join(' ') : ''} ${t.purposeVi || ''} ${t.summaryVi || ''}`.toLowerCase();

  // 1. Tài chính, Ngân hàng & Thuế
  if (
    text.includes('vietcombank') || text.includes('mbbank') || text.includes('bidv') || 
    text.includes('vietinbank') || text.includes('vpbank') || text.includes('acb') || 
    text.includes('tpbank') || text.includes('vnpay') || text.includes('momo') || 
    text.includes('zalopay') || text.includes('onepay') || text.includes('smartpay') || 
    text.includes('payos') || text.includes('kredivo') || text.includes('fundiin') || 
    text.includes('vietqr') || text.includes('napas') || text.includes('thanh toán') || 
    text.includes('ngân hàng') || text.includes('thuế') || text.includes('thuedientu') || 
    text.includes('etax') || text.includes('einvoice') || text.includes('hóa đơn điện tử') || 
    text.includes('kế toán') || text.includes('vas') || text.includes('vfrs') || 
    text.includes('chứng khoán') || text.includes('vnstock') || text.includes('tiền tệ') || 
    text.includes('banking') || text.includes('payment') || text.includes('fintech') || 
    text.includes('cades') || text.includes('xades') || text.includes('ký số') || 
    text.includes('smartca') || text.includes('s-invoice') || text.includes('meinvoice')
  ) {
    return 'finance_payment';
  }

  // 2. Nhân sự & Tuyển dụng
  if (
    text.includes('topcv') || text.includes('vietnamworks') || text.includes('tuyển dụng') || 
    text.includes('ứng viên') || text.includes('sàng lọc cv') || text.includes('việc làm') || 
    text.includes('nhân sự') || text.includes('chấm công') || text.includes('bảng lương') || 
    text.includes('bhxh') || text.includes('bảo hiểm xã hội') || text.includes('vssid') || 
    text.includes('thai sản') || text.includes('thất nghiệp') || text.includes('timesheet') || 
    text.includes('recruitment')
  ) {
    return 'hr_recruitment';
  }

  // 3. Vận tải & Giao vận
  if (
    text.includes('ghtk') || text.includes('ghn') || text.includes('giao hàng tiết kiệm') || 
    text.includes('giao hàng nhanh') || text.includes('ahamove') || text.includes('lalamove') || 
    text.includes('viettelpost') || text.includes('vnpost') || text.includes('j&t') || 
    text.includes('ninja van') || text.includes('be group') || text.includes('xanh sm') || 
    text.includes('gsm') || text.includes('xe điện') || text.includes('taxi') || 
    text.includes('giao vận') || text.includes('chuyển phát') || text.includes('vận đơn') || 
    text.includes('logistics') || text.includes('bưu chính') || text.includes('xe tải') || 
    text.includes('hỏa tốc') || text.includes('vietnam airlines') || text.includes('vietjet') || 
    text.includes('vé máy bay') || text.includes('lịch bay') || text.includes('petrolimex') || 
    text.includes('xăng dầu')
  ) {
    return 'logistics_transport';
  }

  // 4. Thương mại điện tử & Bán lẻ
  if (
    text.includes('shopee') || text.includes('lazada') || text.includes('tiki') || 
    text.includes('tiktok shop') || text.includes('sapo') || text.includes('haravan') || 
    text.includes('kiotviet') || text.includes('pos') || text.includes('bán lẻ') || 
    text.includes('siêu thị') || text.includes('gian hàng') || text.includes('livestream') || 
    text.includes('cukcuk') || text.includes('ipos') || text.includes('f&b') || 
    text.includes('nhà hàng') || text.includes('quán ăn') || text.includes('quán cà phê') || 
    text.includes('gọi món') || text.includes('kds') || text.includes('shopeefood') || 
    text.includes('grabfood') || text.includes('baemin') || text.includes('mã vạch')
  ) {
    return 'ecommerce_retail';
  }

  // 5. Viễn thông & Chăm sóc khách hàng
  if (
    text.includes('zalo') || text.includes('zalo oa') || text.includes('zns') || 
    text.includes('stringee') || text.includes('tổng đài') || text.includes('voip') || 
    text.includes('video call') || text.includes('esms') || text.includes('speedsms') || 
    text.includes('sms') || text.includes('brandname') || text.includes('voice otp') || 
    text.includes('otp') || text.includes('cskh') || text.includes('hotline') || 
    text.includes('fpt telecom') || text.includes('hifpt') || text.includes('cáp quang') || 
    text.includes('viber') || text.includes('viễn thông') || text.includes('nhà mạng') || 
    text.includes('telecom')
  ) {
    return 'telecom_cskh';
  }

  // 6. Pháp luật & Hành chính công
  if (
    text.includes('34 tỉnh') || text.includes('địa chỉ hành chính') || text.includes('địa giới') || 
    text.includes('sáp nhập') || text.includes('cổng dịch vụ công') || text.includes('vneid') || 
    text.includes('cccd') || text.includes('căn cước') || text.includes('bộ tư pháp') || 
    text.includes('lý lịch tư pháp') || text.includes('đấu thầu') || text.includes('e-gp') || 
    text.includes('giao dịch bảo đảm') || text.includes('thư viện pháp luật') || text.includes('luật') || 
    text.includes('nghị định') || text.includes('thông tư') || text.includes('phạt nguội') || 
    text.includes('hành chính công') || text.includes('chính phủ') || text.includes('evn') || 
    text.includes('tiền điện') || text.includes('mã bưu chính')
  ) {
    return 'legal_public_service';
  }

  // 7. Doanh nghiệp & Quản trị
  if (
    text.includes('erp') || text.includes('crm') || text.includes('quản trị doanh nghiệp') || 
    text.includes('base.vn') || text.includes('base request') || text.includes('base wework') || 
    text.includes('base hrm') || text.includes('1office') || text.includes('fastwork') || 
    text.includes('odoo') || text.includes('erpnext') || text.includes('espocrm') || 
    text.includes('bizfly') || text.includes('getfly') || text.includes('amis') || 
    text.includes('phê duyệt') || text.includes('báo giá') || text.includes('hợp đồng')
  ) {
    return 'business_admin';
  }

  // 8. Trí tuệ nhân tạo & Dữ liệu
  if (
    text.includes('vinbigdata') || text.includes('vigpt') || text.includes('vinai') || 
    text.includes('phobert') || text.includes('phowhisper') || text.includes('bert') || 
    text.includes('llm') || text.includes('gpt') || text.includes('claude') || 
    text.includes('gemini') || text.includes('deepseek') || text.includes('ollama') || 
    text.includes('vllm') || text.includes('rag') || text.includes('ragflow') || 
    text.includes('mem0') || text.includes('dify') || text.includes('langflow') || 
    text.includes('flowise') || text.includes('tts') || text.includes('vbee') || 
    text.includes('giọng nói') || text.includes('whisper') || text.includes('ocr') || 
    text.includes('vietocr') || text.includes('underthesea') || text.includes('nlp') || 
    text.includes('tách từ') || text.includes('pyvi') || text.includes('vit5') || 
    text.includes('vncorenlp') || text.includes('vistral') || text.includes('bkai') || 
    text.includes('bigquery') || text.includes('database') || text.includes('sql') || 
    text.includes('cơ sở dữ liệu')
  ) {
    return 'ai_nlp_data';
  }

  // 9. Lập trình & Kỹ thuật phần mềm
  if (
    text.includes('code') || text.includes('coding') || text.includes('github') || 
    text.includes('gitlab') || text.includes('git') || text.includes('docker') || 
    text.includes('debug') || text.includes('test') || text.includes('devops') || 
    text.includes('react') || text.includes('vue') || text.includes('angular') || 
    text.includes('node') || text.includes('python') || text.includes('rust') || 
    text.includes('flutter') || text.includes('dart') || text.includes('terminal') || 
    text.includes('cli') || text.includes('lập trình')
  ) {
    return 'programming_devops';
  }

  // 10. Mặc định là Tự động hóa hệ thống & Web
  return 'system_automation';
}

const statsCategory = {};
const statsType = {};

for (const t of tools) {
  // 1. Phân loại lại Lĩnh vực chuyên môn
  const catKey = xacDinhLinhVuc(t);
  t.category = catKey;
  t.categoryNameVi = categoryMap[catKey];
  statsCategory[catKey] = (statsCategory[catKey] || 0) + 1;

  // 2. Không dịch nghĩa Agent, Skill sang tiếng Việt cho phần ghi chú (vẫn giữ nguyên)
  const rawType = (t.toolType || t.type || '').toLowerCase();
  if (rawType.includes('mcp')) {
    t.toolType = 'mcp';
    t.typeNameVi = 'MCP Server';
  } else if (rawType.includes('agent')) {
    t.toolType = 'agent';
    t.typeNameVi = 'Agent';
  } else if (rawType.includes('command')) {
    t.toolType = 'command';
    t.typeNameVi = 'Command';
  } else if (rawType.includes('template')) {
    t.toolType = 'template';
    t.typeNameVi = 'Template';
  } else if (rawType.includes('hook')) {
    t.toolType = 'hook';
    t.typeNameVi = 'Hook';
  } else if (rawType.includes('setting')) {
    t.toolType = 'setting';
    t.typeNameVi = 'Setting';
  } else if (rawType.includes('workflow')) {
    t.toolType = 'workflow';
    t.typeNameVi = 'Workflow';
  } else {
    t.toolType = 'skill';
    t.typeNameVi = 'Skill';
  }
  statsType[t.typeNameVi] = (statsType[t.typeNameVi] || 0) + 1;
}

fs.writeFileSync(toolsPath, JSON.stringify(tools, null, 2), 'utf8');

console.log('Thống kê theo Lĩnh vực chuyên môn:');
console.log(statsCategory);
console.log('Thống kê theo Nhãn loại hình (Giữ nguyên Agent, Skill, MCP Server...):');
console.log(statsType);
