import React from 'react';
import { X, CheckCircle2, FileText, Compass, Shield, Database, Layout, Code2, TestTube2, Rocket } from 'lucide-react';

interface DevLifecycleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DevLifecycleModal: React.FC<DevLifecycleModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const stages = [
    { num: '01', title: 'Xác định ý tưởng', file: '01_TONG_QUAN_DU_AN.md', desc: 'Làm rõ bối cảnh, vấn đề phân mảnh, mục tiêu và giá trị cốt lõi.', icon: Compass },
    { num: '02', title: 'Xác định phạm vi', file: '02_PHAM_VI_DU_AN.md', desc: 'Phân định rõ phạm vi thực hiện và phạm vi ngoài.', icon: Shield },
    { num: '03', title: 'Phân tích nghiệp vụ', file: '03_YEU_CAU_NGHIEP_VU.md', desc: 'Đặc tả 4 khối thông tin bắt buộc, ma trận phân quyền và luồng nghiệp vụ.', icon: FileText },
    { num: '04', title: 'Đặc tả yêu cầu', file: '07_YEU_CAU_CHUC_NANG.md', desc: 'Chức năng chi tiết CN-01 đến CN-07 và tiêu chí nghiệm thu.', icon: CheckCircle2 },
    { num: '05', title: 'Thiết kế hệ thống', file: '09_KIEN_TRUC_HE_THONG.md', desc: 'Kiến trúc phân tầng và danh mục công nghệ TypeScript/React.', icon: Code2 },
    { num: '06', title: 'Thiết kế giao diện', file: '11_DAC_TA_GIAO_DIEN.md', desc: 'Đặc tả 4 màn hình chính, hệ thống màu sắc và quy chuẩn.', icon: Layout },
    { num: '07', title: 'Thiết kế dữ liệu & API', file: '13_CO_SO_DU_LIEU.md', desc: 'Mô hình thực thể quan hệ ERD và đặc tả điểm cuối RESTful API.', icon: Database },
    { num: '08', title: 'Chuẩn bị môi trường AI', file: '15_QUY_TAC_PHAT_TRIEN_AI.md', desc: 'Quy tắc kỷ luật kỹ thuật và chỉ dẫn hệ thống cho tác tử AI.', icon: Shield },
    { num: '09', title: 'Xây dựng theo module', file: '22_DANH_MUC_KIEM_TRA.md', desc: 'Triển khai mã nguồn sạch, chia nhỏ theo từng nhiệm vụ.', icon: Code2 },
    { num: '10', title: 'Kiểm thử & Chất lượng', file: '17_KE_HOACH_KIEM_THU.md', desc: 'Kế hoạch kiểm thử, kịch bản thử nghiệm và an toàn bảo mật.', icon: TestTube2 },
    { num: '11', title: 'Nghiệm thu & Phát hành', file: '20_LICH_SU_THAY_DOI.md', desc: 'Lịch sử thay đổi và rà soát tiêu chí nghiệm thu.', icon: Rocket },
    { num: '12', title: 'Vận hành & Cải tiến', file: '21_NHAT_KY_DU_AN.md', desc: 'Ghi chép nhật ký hàng ngày và tiếp nhận cải tiến.', icon: Compass },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div 
        className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Quy Trình VibeCode Chuẩn 12 Giai Đoạn (dev-lifecycle)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Toàn bộ 22 tệp tài liệu đặc tả và thiết kế kỹ thuật bằng tiếng Việt đã được khởi tạo
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto space-y-4">
          <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 text-xs sm:text-sm text-blue-900 dark:text-blue-200 leading-relaxed">
            Hệ thống tuân thủ nghiêm ngặt nguyên tắc: <strong>"Con người quyết định mục tiêu và phạm vi — Trí tuệ nhân tạo hỗ trợ thiết kế và thực thi"</strong>. Mọi tài liệu kỹ thuật được lưu trữ tại thư mục gốc của dự án.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {stages.map((stg) => {
              const IconComp = stg.icon;
              return (
                <div
                  key={stg.num}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-start space-x-3"
                >
                  <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-700 dark:text-blue-300 font-bold text-xs shrink-0 mt-0.5">
                    {stg.num}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center space-x-1.5">
                      <span>{stg.title}</span>
                    </h4>
                    <span className="text-[11px] font-mono text-blue-600 dark:text-blue-400 block mb-1">
                      {stg.file}
                    </span>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {stg.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="px-6 py-3.5 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold"
          >
            Đã hiểu
          </button>
        </div>
      </div>
    </div>
  );
};
