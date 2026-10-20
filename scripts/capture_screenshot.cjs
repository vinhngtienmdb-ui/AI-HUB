const { chromium } = require('playwright');
const path = require('path');

async function capture() {
  console.log('Đang khởi chạy Chromium để chụp ảnh giao diện...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 960 },
  });
  const page = await context.newPage();
  
  console.log('Đang truy cập http://localhost:3000/ ...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000); // Chờ render hoàn tất

  const outputPath = path.join(__dirname, '../public/screenshot_homepage.png');
  await page.screenshot({ path: outputPath, fullPage: false });
  console.log('Đã lưu ảnh chụp màn hình tại:', outputPath);

  const fullOutputPath = path.join(__dirname, '../public/screenshot_homepage_full.png');
  await page.screenshot({ path: fullOutputPath, fullPage: true });
  console.log('Đã lưu ảnh chụp toàn bộ trang tại:', fullOutputPath);

  await browser.close();
}

capture().catch((err) => {
  console.error('Lỗi khi chụp màn hình:', err);
  process.exit(1);
});
