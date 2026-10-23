import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// Đọc trực tiếp từ file allTools.json
const allToolsPath = join(process.cwd(), 'src', 'data', 'allTools.json');
const toolsData = JSON.parse(readFileSync(allToolsPath, 'utf-8'));

test('Quy tắc QT-01: Mọi công cụ trong kho dữ liệu bắt buộc phải có đầy đủ 4 khối thông tin', () => {
  assert.ok(toolsData.length >= 1500, `Thư viện phải có toàn bộ công cụ từ 2 nguồn (hiện có: ${toolsData.length})`);

  let checkedCount = 0;
  for (const tool of toolsData) {
    checkedCount++;
    // 1. Nguồn dẫn chính thức
    assert.ok(
      typeof tool.sourceUrl === 'string' && tool.sourceUrl.startsWith('https://'),
      `Công cụ [${tool.name}] thiếu liên kết nguồn chính thức hợp lệ (https://)`
    );

    // 2. Công dụng tiếng Việt
    assert.ok(
      typeof tool.purposeVi === 'string' && tool.purposeVi.length >= 25,
      `Công cụ [${tool.name}] thiếu mô tả công dụng tiếng Việt chi tiết`
    );

    // 3. Hướng dẫn cài đặt tiếng Việt
    assert.ok(
      typeof tool.installGuideVi === 'string' && tool.installGuideVi.length >= 20,
      `Công cụ [${tool.name}] thiếu hướng dẫn cài đặt tiếng Việt`
    );

    // 4. Hướng dẫn sử dụng tiếng Việt
    assert.ok(
      typeof tool.usageGuideVi === 'string' && tool.usageGuideVi.length >= 20,
      `Công cụ [${tool.name}] thiếu hướng dẫn sử dụng tiếng Việt`
    );
  }
  console.log(`Đã kiểm tra thành công toàn bộ ${checkedCount} công cụ thỏa mãn 4 khối thông tin bắt buộc.`);
});

test('Quy tắc QT-03: Tất cả cấu hình JSON mẫu phải có cú pháp JSON hợp lệ', () => {
  let configCount = 0;
  for (const tool of toolsData) {
    assert.ok(Array.isArray(tool.configs) && tool.configs.length > 0, `Công cụ [${tool.name}] phải có cấu hình mẫu`);
    for (const cfg of tool.configs) {
      configCount++;
      assert.doesNotThrow(() => {
        JSON.parse(cfg.jsonConfig);
      }, `Cấu hình JSON của công cụ [${tool.name}] trên nền tảng [${cfg.platform}] bị lỗi cú pháp JSON`);
    }
  }
  console.log(`Đã kiểm tra thành công ${configCount} mẫu cấu hình JSON đều đúng cú pháp.`);
});

test('Quy tắc QT-04: Ngôn ngữ hướng dẫn sử dụng và công dụng phải bằng tiếng Việt', () => {
  const vietnameseKeywords = [
    'cho phép', 'giải quyết', 'hướng dẫn', 'cài đặt', 'truy vấn', 'cơ sở dữ liệu', 
    'tác tử', 'mã nguồn', 'công cụ', 'tìm kiếm', 'người dùng', 'hỗ trợ', 'dữ liệu', 
    'kỹ năng', 'phát triển', 'tự động', 'kiểm tra', 'hệ thống', 'doanh nghiệp'
  ];
  for (const tool of toolsData) {
    const combinedText = (tool.purposeVi + ' ' + tool.installGuideVi + ' ' + tool.usageGuideVi).toLowerCase();
    const hasViKeyword = vietnameseKeywords.some(kw => combinedText.includes(kw));
    assert.ok(hasViKeyword, `Nội dung của công cụ [${tool.name}] phải có các từ vựng tiếng Việt chuyên ngành`);
  }
});

test('Quy tắc QT-05: Mọi công cụ trong kho dữ liệu bắt buộc phải có tài liệu README tiếng Việt chuẩn (readmeVi)', () => {
  let countWithReadme = 0;
  for (const tool of toolsData) {
    assert.ok(
      typeof tool.readmeVi === 'string' && tool.readmeVi.trim().length >= 100,
      `Công cụ [${tool.name}] thiếu tài liệu README tiếng Việt chi tiết (readmeVi)`
    );
    assert.ok(
      tool.readmeVi.includes('# ') && tool.readmeVi.includes('## '),
      `Tài liệu README của công cụ [${tool.name}] phải theo định dạng Markdown phân cấp chuẩn`
    );
    countWithReadme++;
  }
  console.log(`Đã kiểm tra thành công toàn bộ ${countWithReadme} công cụ đều có README tiếng Việt chuẩn chỉ.`);
});

test('Kiểm định dữ liệu: Mọi công cụ mang kết quả kiểm định, nhãn khớp với nội dung thực tế', () => {
  const TEMPLATE_PREFIXES = [
    ['installGuideVi', 'Bước 1 (Chuẩn bị môi trường): Kiểm tra máy tính đã cài đặt sẵn Node.js'],
    ['usageGuideVi', 'Kịch bản mẫu: Áp dụng trong quy trình phát triển và vận hành hệ thống thông tin.']
  ];
  for (const tool of toolsData) {
    const v = tool.verification;
    assert.ok(v, `Công cụ ${tool.id} chưa được kiểm định (chạy: npm run data:validate -- --online --write)`);
    const isTemplate = TEMPLATE_PREFIXES.some(([field, prefix]) => String(tool[field] || '').startsWith(prefix));
    assert.equal(v.guideIsTemplate, isTemplate, `Nhãn hướng dẫn mẫu của ${tool.id} không khớp nội dung`);
    assert.ok(['ok', 'missing', 'unknown'].includes(v.sourceStatus), `sourceStatus của ${tool.id} không hợp lệ`);
    const expectedHealth = v.sourceStatus === 'ok' ? 'healthy' : v.sourceStatus === 'missing' ? 'broken' : 'unchecked';
    assert.equal(tool.linkHealth, expectedHealth, `linkHealth của ${tool.id} không khớp kết quả kiểm định`);
    assert.ok(Array.isArray(v.missingPackages));
  }
});
