import { AITool, CategoryInfo } from '../types';
// Danh sách công cụ không gồm README và hướng dẫn chi tiết; các trường đó được tải theo nhu cầu
// qua src/lib/toolDetails.ts (xem server/toolDataSplit.js)
import toolIndex from 'virtual:tool-index';

export const CATEGORIES: CategoryInfo[] = [
  { id: 'all', nameVi: 'Tất cả lĩnh vực', descriptionVi: 'Toàn bộ kho tài nguyên công nghệ và giải pháp số', icon: 'Layers' },
  
  // 1. Lập trình & Kỹ thuật phần mềm (chi tiết hóa không gộp)
  { id: 'frontend_ui', nameVi: 'Frontend & Giao diện người dùng', descriptionVi: 'React, Vue, Tailwind, UI/UX, CSS, giao diện web hiện đại và components', icon: 'Layout' },
  { id: 'backend_api', nameVi: 'Backend & Kiến trúc API', descriptionVi: 'Node.js, Python, Go, Java, REST API, GraphQL, Microservices và máy chủ web', icon: 'Server' },
  { id: 'mobile_app', nameVi: 'Ứng dụng di động (Mobile App)', descriptionVi: 'Flutter, React Native, iOS Swift, Android Kotlin và công nghệ đa nền tảng', icon: 'Smartphone' },
  { id: 'qa_testing', nameVi: 'Kiểm thử phần mềm & QA/QC', descriptionVi: 'Unit test, Integration test, E2E, rà soát mã nguồn tự động và theo dõi lỗi', icon: 'CheckSquare' },

  // 2. Vận hành, Đám mây & Bảo mật
  { id: 'devops_cicd', nameVi: 'DevOps & Tự động hóa CI/CD', descriptionVi: 'Docker, Kubernetes, GitHub Actions, GitLab CI, tự động hóa đóng gói phát hành', icon: 'GitBranch' },
  { id: 'cloud_infrastructure', nameVi: 'Điện toán đám mây & Hạ tầng số', descriptionVi: 'AWS, Google Cloud, Azure, Linux Server, Terraform và giám sát hệ thống', icon: 'Cloud' },
  { id: 'cybersecurity_security', nameVi: 'An toàn thông tin & Bảo mật (Security)', descriptionVi: 'Xác thực Auth, mã hóa dữ liệu, quét lỗ hổng bảo mật, WAF và chứng thực bảo vệ', icon: 'Shield' },

  // 3. Cơ sở dữ liệu & Tri thức
  { id: 'database_sql_nosql', nameVi: 'Cơ sở dữ liệu SQL & NoSQL', descriptionVi: 'PostgreSQL, MySQL, Redis, MongoDB, Supabase, tối ưu truy vấn SQL và sao lưu', icon: 'Database' },
  { id: 'vector_rag', nameVi: 'Dữ liệu Vector & Tìm kiếm tri thức (RAG)', descriptionVi: 'Pinecone, ChromaDB, Qdrant, Milvus, nhúng dữ liệu vector và bộ não tri thức AI', icon: 'Cpu' },

  // 4. Trí tuệ nhân tạo chuyên sâu
  { id: 'nlp_llm', nameVi: 'Xử lý ngôn ngữ tự nhiên & Mô hình LLM', descriptionVi: 'Mô hình ngôn ngữ lớn, PhoBERT, kỹ nghệ prompt, fine-tuning và hiểu ngữ nghĩa', icon: 'Brain' },
  { id: 'computer_vision', nameVi: 'Thị giác máy tính & Xử lý ảnh (Vision & OCR)', descriptionVi: 'VietOCR, nhận diện khuôn mặt, trích xuất văn bản ảnh, camera AI và phát hiện vật thể', icon: 'Eye' },
  { id: 'speech_voice', nameVi: 'Nhận dạng & Xử lý giọng nói (Speech & Audio)', descriptionVi: 'Chuyển văn bản thành giọng nói (TTS), nhận dạng âm thanh (STT) và trợ lý ảo đàm thoại', icon: 'Mic' },
  { id: 'generative_ai_multimedia', nameVi: 'Sinh nội dung & Đa phương tiện (Generative AI)', descriptionVi: 'Khuếch tán ảnh AI, tạo video, sáng tác âm nhạc, thiết kế đồ họa và sáng tạo tự động', icon: 'Sparkles' },

  // 5. Dữ liệu lớn & Phân tích
  { id: 'data_engineering', nameVi: 'Kỹ thuật dữ liệu & Đường ống ETL', descriptionVi: 'Apache Spark, Airflow, dbt, Kafka, thu thập và chuẩn hóa dữ liệu lớn thời gian thực', icon: 'Workflow' },
  { id: 'data_science_analytics', nameVi: 'Khoa học dữ liệu & Phân tích kinh doanh', descriptionVi: 'Báo cáo thông minh BI Dashboard, trực quan hóa biểu đồ, học máy và dự báo xu hướng', icon: 'BarChart3' },

  // 6. Tự động hóa & Cào dữ liệu
  { id: 'web_scraping_crawling', nameVi: 'Thu thập dữ liệu web & Cào dữ liệu (Scraping)', descriptionVi: 'Browser-use, Puppeteer, BeautifulSoup, cào dữ liệu web tự động và phân tích cú pháp', icon: 'Globe' },
  { id: 'rpa_workflow_automation', nameVi: 'Tự động hóa quy trình & RPA (Automation)', descriptionVi: 'N8n, Zapier, Dify, Langflow, tự động hóa tác vụ lặp lại và bot hỗ trợ công việc', icon: 'Settings2' },

  // 7. Tài chính, Ngân hàng & Thanh toán
  { id: 'banking_open_api', nameVi: 'Ngân hàng số & Ngân hàng mở (Digital Banking)', descriptionVi: 'Open API ngân hàng Vietcombank, Techcombank, BIDV, MB Bank và kết nối B2B', icon: 'Landmark' },
  { id: 'payment_gateway', nameVi: 'Cổng thanh toán & Ví điện tử (Payments)', descriptionVi: 'VietQR, MoMo, ZaloPay, VNPay, Stripe, thanh toán một chạm và mã QR động', icon: 'CreditCard' },
  { id: 'investment_securities', nameVi: 'Đầu tư, Chứng khoán & FinTech', descriptionVi: 'Bảng giá chứng khoán SSI, VNDirect, giao dịch thuật toán và tư vấn đầu tư tài chính', icon: 'TrendingUp' },

  // 8. Kế toán, Thuế & Hóa đơn
  { id: 'accounting_finance', nameVi: 'Kế toán doanh nghiệp & Báo cáo tài chính', descriptionVi: 'MISA AMIS, Fast Accounting, sổ sách kế toán, bảng cân đối kế toán và chuẩn mực VAS', icon: 'BookOpen' },
  { id: 'e_invoice_tax', nameVi: 'Hóa đơn điện tử, Thuế & Chữ ký số (e-Tax)', descriptionVi: 'Hóa đơn điện tử có mã CQT, khai thuế eTax, VNPT-CA, Viettel-CA, ký số token USB', icon: 'Receipt' },

  // 9. Tài sản số, Web3 & Blockchain
  { id: 'blockchain_web3', nameVi: 'Công nghệ chuỗi khối & Web3 (Blockchain)', descriptionVi: 'Hợp đồng thông minh Smart Contract, Ethereum, Solana, DApps và mạng phi tập trung', icon: 'Network' },
  { id: 'crypto_defi', nameVi: 'Tài sản số & Tài chính phi tập trung (DeFi)', descriptionVi: 'Ví tiền số, sàn giao dịch phi tập trung, staking và các giao thức tài sản kỹ thuật số', icon: 'Coins' },

  // 10. Doanh nghiệp & Quản trị tổng thể
  { id: 'erp_enterprise', nameVi: 'Quản trị tổng thể doanh nghiệp (ERP)', descriptionVi: 'Hệ thống Bravo, Effect, 1Office, Odoo, SAP và điều hành toàn diện doanh nghiệp', icon: 'Briefcase' },
  { id: 'crm_sales', nameVi: 'Quản lý quan hệ khách hàng (CRM) & Bán hàng', descriptionVi: 'Base CRM, quản lý cơ hội, chăm sóc khách hàng tiềm năng và tối ưu tỷ lệ chuyển đổi', icon: 'Target' },
  { id: 'office_digital_docs', nameVi: 'Văn phòng số & Quản lý văn bản điện tử', descriptionVi: 'Trình ký điện tử, quản lý công văn, lưu trữ hồ sơ số và văn phòng không giấy tờ', icon: 'FileText' },
  { id: 'hr_recruitment', nameVi: 'Quản trị nhân sự & Tuyển dụng (HRM)', descriptionVi: 'TopCV, chấm công nhận diện khuôn mặt, tính lương tự động, bảo hiểm xã hội BHXH', icon: 'Users' },

  // 11. Thương mại điện tử & Bán lẻ
  { id: 'ecommerce_marketplace', nameVi: 'Sàn thương mại điện tử & Bán hàng đa kênh', descriptionVi: 'Shopee, Lazada, TikTok Shop, Tiki, quản lý bán hàng đa kênh Omnichannel', icon: 'ShoppingBag' },
  { id: 'pos_retail', nameVi: 'Quản lý bán lẻ (POS) & Chuỗi F&B', descriptionVi: 'KiotViet, Sapo POS, iPOS, máy bán hàng thu ngân, in hóa đơn và chuỗi ẩm thực', icon: 'Store' },

  // 12. Giao nhận & Kho bãi
  { id: 'warehouse_inventory', nameVi: 'Quản lý kho bãi & Hàng tồn kho (WMS)', descriptionVi: 'Quản lý kho hàng WMS, quét mã vạch Barcode/QR, kiểm kê và kiểm soát hạn sử dụng', icon: 'Boxes' },
  { id: 'logistics_shipping', nameVi: 'Vận chuyển, Giao nhận & Chuỗi cung ứng', descriptionVi: 'GHTK, GHN, Viettel Post, định tuyến lộ trình xe tải và theo dõi đơn vận chuyển', icon: 'Truck' },

  // 13. Khách hàng & Dịch vụ xã hội
  { id: 'telecom_cskh', nameVi: 'Tổng đài, Tin nhắn & CSKH tự động (Telecom)', descriptionVi: 'Tổng đài ảo VoIP, Zalo OA, SMS Brandname OTP, tổng đài AI và chăm sóc đa kênh', icon: 'Headphones' },
  { id: 'healthcare_medical', nameVi: 'Y tế số, Bệnh viện & Quản lý phòng khám', descriptionVi: 'Medpro, đặt khám Chợ Rẫy, Bạch Mai, Vinmec, hồ sơ bệnh án điện tử EMR và HIS', icon: 'Activity' },
  { id: 'pharmacy_wellness', nameVi: 'Dược phẩm & Chăm sóc sức khỏe', descriptionVi: 'Quản lý nhà thuốc GPP, tra cứu danh mục thuốc quốc gia và chăm sóc sức khỏe', icon: 'HeartPulse' },
  { id: 'education_edtech', nameVi: 'Giáo dục trực tuyến & Quản lý đào tạo (EdTech)', descriptionVi: 'Cổng đại học Bách Khoa, ĐHQG, hệ thống thi trắc nghiệm trực tuyến và học tập số LMS', icon: 'GraduationCap' },
  { id: 'legal_public_service', nameVi: 'Pháp luật & Dịch vụ công số', descriptionVi: 'Cổng Dịch vụ công Quốc gia, định danh VNeID, tra cứu phạt nguội và văn bản luật', icon: 'Scale' },
  { id: 'tourism_hospitality', nameVi: 'Du lịch, Khách sạn & Nghỉ dưỡng', descriptionVi: 'Vinpearl, Sun World, Saigontourist, Vietravel, đặt vé máy bay và phòng khách sạn', icon: 'Compass' },
  
  // 14. Lĩnh vực chiến lược Thị trường Việt Nam
  { id: 'vietnam', nameVi: '🇻🇳 Thị Trường Việt Nam', descriptionVi: 'Các công cụ, phần mềm, API và giải pháp công nghệ chuyên biệt cho người Việt', icon: 'Flag' }
];

export const INITIAL_TOOLS: AITool[] = toolIndex as AITool[];
