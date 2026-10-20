import fs from 'node:fs';

const mockToolsPath = 'src/data/mockTools.ts';
let content = fs.readFileSync(mockToolsPath, 'utf-8');

// Ensure Redis includes 'cơ sở dữ liệu' in purpose
content = content.replace(
  'Hỗ trợ kiểm tra các khóa bộ nhớ đệm, phân tích cấu trúc dữ liệu trong bộ nhớ',
  'Hỗ trợ kết nối cơ sở dữ liệu bộ nhớ đệm Redis, kiểm tra các khóa phân tích cấu trúc dữ liệu trong bộ nhớ'
);

fs.writeFileSync(mockToolsPath, content, 'utf-8');
console.log('Updated mockTools.ts');
