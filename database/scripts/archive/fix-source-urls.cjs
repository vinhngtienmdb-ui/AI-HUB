const fs = require('fs');
const path = require('path');

const toolsPath = path.join(__dirname, '../src/data/allTools.json');
const tools = JSON.parse(fs.readFileSync(toolsPath, 'utf8'));

const urlMappings = {
  "vn-repo-petrolimex-fuel-price-api": "https://www.petrolimex.com.vn/",
  "vn-repo-vietcombank-openbanking-api": "https://openbanking.vietcombank.com.vn/",
  "vn-repo-xanh-sm-corporate-api": "https://www.xanhsm.com/doanh-nghiep/",
  "vn-repo-be-delivery-api": "https://developer.be.com.vn/",
  "vn-repo-vnpt-invoice-smartca": "https://smartca.vnpt.vn/",
  "vn-repo-viettel-sinvoice-api": "https://sinvoice.viettel.vn/",
  "vn-repo-misa-meinvoice-open-api": "https://api.meinvoice.vn/",
  "vn-repo-haravan-app-sdk": "https://developers.haravan.com/",
  "vn-repo-bhxh-vssid-calculator": "https://dichvucong.baohiemxahoi.gov.vn/",
  "vn-repo-chu-ky-so-token-validator": "https://neac.gov.vn/",
  "vn-repo-onepay-payment-gateway": "https://github.com/naustudio/vn-payments",
  "vn-repo-telegram-banking-alert-bot": "https://github.com/vietqr/telegram-alert-bot",
  "vn-repo-vneid-cccd-validator": "https://dichvucong.dancudan.gov.vn/",
  "vn-repo-ma-buu-chinh-5-so-34-tinh": "https://mabuuchinh.vn/",
  "vn-repo-sapo-omnichannel-api": "https://support.sapo.vn/open-api",
  "vn-repo-tra-cuu-mst-doanh-nghiep-api": "https://dangkykinhdoanh.gov.vn/",
  "vn-repo-tinh-thue-tncn-bhxh-vn": "https://thuedientu.gdt.gov.vn/",
  "vn-repo-xml-einvoice-tt78-parser": "https://hoadondientu.gdt.gov.vn/",
  "vn-repo-espocrm-vietnam-crm": "https://github.com/espocrm/espocrm",
  "vn-repo-zalo-oa-zns-cskh-mcp": "https://developers.zalo.me/docs/official-account",
  "vn-repo-erpnext-vietnam-frappe": "https://github.com/frappe/erpnext",
  "vn-repo-34-tinh-thanh-hanh-chinh-moi": "https://data.gov.vn/",
  "vn-repo-vietnamese-law-search-agent": "https://vbpl.vn/",
  "vn-repo-telecom-validator-skill": "https://github.com/google/libphonenumber",
  "vn-repo-ghn-express-sdk-mcp": "https://developer.ghn.vn/",
  "vn-repo-vnpost-ems-mcp": "https://vietnampost.vn/"
};

let updatedCount = 0;
for (const tool of tools) {
  if (urlMappings[tool.id]) {
    tool.sourceUrl = urlMappings[tool.id];
    updatedCount++;
  }
}

fs.writeFileSync(toolsPath, JSON.stringify(tools, null, 2), 'utf8');
console.log(`Đã cập nhật thành công ${updatedCount} công cụ về đúng nguồn kho lưu trữ và cổng phát triển chính thức.`);
