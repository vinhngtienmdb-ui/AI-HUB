import React, { useState, useEffect, useMemo } from 'react';
import { X, ShieldCheck, Check, Tags, Layers, Flag, Search } from 'lucide-react';
import { AITool, ToolType, Category, CategoryInfo } from '../types';
import { DEFAULT_TOOL_TYPES, ToolTypeInfo, getToolTypeNameVi, getCategoryNameVi } from '../data/taxonomy';
import { CATEGORIES } from '../data/mockTools';

interface EditToolTaxonomyModalProps {
  isOpen: boolean;
  onClose: () => void;
  tool: AITool | null;
  onSave: (
    toolId: string, 
    newType: ToolType, 
    newPrimaryCategory: Category, 
    newCategories: Category[],
    isVietnamMarket: boolean
  ) => void;
  customTypes?: ToolTypeInfo[];
  customCategories?: CategoryInfo[];
}

export const EditToolTaxonomyModal: React.FC<EditToolTaxonomyModalProps> = ({
  isOpen,
  onClose,
  tool,
  onSave,
  customTypes = DEFAULT_TOOL_TYPES,
  customCategories = CATEGORIES,
}) => {
  const [selectedType, setSelectedType] = useState<ToolType>('agent');
  const [selectedPrimaryCategory, setSelectedPrimaryCategory] = useState<Category>('backend_api');
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [isVnMarket, setIsVnMarket] = useState(false);
  const [categorySearch, setCategorySearch] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    if (tool) {
      setSelectedType(tool.toolType);
      setSelectedPrimaryCategory(tool.category);
      // Khởi tạo danh sách các lĩnh vực mà công cụ đã thuộc về
      const initialCats = Array.isArray(tool.categories) && tool.categories.length > 0 
        ? [...tool.categories] 
        : [tool.category];
      setSelectedCategories(initialCats);
      setIsVnMarket(Boolean(tool.isVietnamMarket || tool.category === 'vietnam' || initialCats.includes('vietnam')));
      setCategorySearch('');
      setSuccessMessage(false);
    }
  }, [tool]);

  if (!isOpen || !tool) return null;

  // Lọc danh sách lĩnh vực chuyên môn (bỏ 'all')
  const validCategories = customCategories.filter((c) => c.id !== 'all');

  const filteredCategories = validCategories.filter((c) => 
    !categorySearch || 
    c.nameVi.toLowerCase().includes(categorySearch.toLowerCase().trim()) ||
    c.descriptionVi.toLowerCase().includes(categorySearch.toLowerCase().trim())
  );

  const toggleCategory = (catId: Category) => {
    setSelectedCategories((prev) => {
      let updated: Category[];
      if (prev.includes(catId)) {
        updated = prev.filter((id) => id !== catId);
        // Nếu bỏ chọn lĩnh vực chính, gán lĩnh vực chính là mục đầu tiên còn lại
        if (selectedPrimaryCategory === catId && updated.length > 0) {
          setSelectedPrimaryCategory(updated[0]);
        }
      } else {
        updated = [...prev, catId];
      }
      return updated;
    });
  };

  const handleSave = () => {
    // Đảm bảo có ít nhất 1 lĩnh vực được chọn
    const finalCats = selectedCategories.length > 0 ? selectedCategories : [selectedPrimaryCategory];
    const finalPrimary = finalCats.includes(selectedPrimaryCategory) ? selectedPrimaryCategory : finalCats[0];

    onSave(tool.id, selectedType, finalPrimary, finalCats, isVnMarket);
    setSuccessMessage(true);
    setTimeout(() => {
      setSuccessMessage(false);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0 bg-slate-50/60 dark:bg-slate-850/60">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/60 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                  Điều Chỉnh Phân Loại Đa Lĩnh Vực
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 uppercase">
                  Quyền Admin
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate max-w-md">
                Tài nguyên: <strong className="text-slate-800 dark:text-slate-200">{tool.name}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nội dung form */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* CỜ ĐÁNH DẤU THỊ TRƯỜNG VIỆT NAM */}
          <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/40 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-rose-100 dark:bg-rose-900/60 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
                <Flag className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs font-bold text-slate-900 dark:text-white">
                  Đánh dấu tài nguyên dành cho Thị trường Việt Nam (🇻🇳)
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Tài nguyên sẽ được gắn huy hiệu Việt Nam nổi bật và hiển thị trong bộ lọc Thị trường VN
                </p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={isVnMarket} 
                onChange={(e) => {
                  const val = e.target.checked;
                  setIsVnMarket(val);
                  if (val && !selectedCategories.includes('vietnam')) {
                    setSelectedCategories([...selectedCategories, 'vietnam']);
                  } else if (!val && selectedCategories.includes('vietnam')) {
                    setSelectedCategories(selectedCategories.filter(c => c !== 'vietnam'));
                  }
                }}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
            </label>
          </div>

          {/* 1. Chọn Loại hình thành phần */}
          <div className="space-y-2">
            <label className="flex items-center space-x-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
              <Tags className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>1. Loại hình thành phần (13 Loại hình chuẩn):</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-h-40 overflow-y-auto p-1 border border-slate-200 dark:border-slate-800 rounded-2xl">
              {customTypes.map((typeItem) => {
                const isSelected = selectedType === typeItem.id;
                return (
                  <button
                    key={typeItem.id}
                    type="button"
                    onClick={() => setSelectedType(typeItem.id)}
                    className={`flex items-center justify-between p-2 rounded-xl border text-xs font-medium transition-all text-left ${
                      isSelected
                        ? 'bg-indigo-50 dark:bg-indigo-950/70 border-indigo-500 text-indigo-700 dark:text-indigo-300 shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-850'
                    }`}
                  >
                    <span className="font-bold truncate">{typeItem.nameVi}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0 ml-1" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Chọn 1 hoặc Nhiều Lĩnh vực chuyên môn */}
          <div className="space-y-2.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label className="flex items-center space-x-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
                <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>2. Lĩnh vực chuyên môn (Tài nguyên có thể thuộc nhiều lĩnh vực):</span>
              </label>
              <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                Đã chọn: {selectedCategories.length} lĩnh vực
              </span>
            </div>

            {/* Ô tìm kiếm nhanh lĩnh vực */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={categorySearch}
                onChange={(e) => setCategorySearch(e.target.value)}
                placeholder="Tìm kiếm nhanh lĩnh vực chuyên môn..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Danh sách checkbox nhiều lĩnh vực */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto p-1 border border-slate-200 dark:border-slate-800 rounded-2xl">
              {filteredCategories.map((catItem) => {
                const isChecked = selectedCategories.includes(catItem.id as Category);
                const isPrimary = selectedPrimaryCategory === catItem.id;
                return (
                  <div
                    key={catItem.id}
                    onClick={() => toggleCategory(catItem.id as Category)}
                    className={`flex items-start justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                      isChecked
                        ? 'bg-indigo-50/80 dark:bg-indigo-950/60 border-indigo-300 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200'
                        : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-850'
                    }`}
                  >
                    <div className="flex items-start space-x-2 min-w-0 pr-1">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}} // Đã xử lý ở onClick cấp div
                        className="mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="font-bold truncate flex items-center space-x-1">
                          <span>{catItem.nameVi}</span>
                          {isPrimary && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-200 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300 font-extrabold uppercase">
                              Chính
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                          {catItem.descriptionVi}
                        </div>
                      </div>
                    </div>

                    {isChecked && !isPrimary && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPrimaryCategory(catItem.id as Category);
                        }}
                        className="text-[10px] text-indigo-600 hover:underline shrink-0 font-semibold"
                        title="Đặt làm lĩnh vực chính"
                      >
                        Làm chính
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Xem trước tóm tắt sau khi lưu */}
          <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/40 text-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-indigo-900 dark:text-indigo-200">Xem trước kết quả phân loại:</span>
              {isVnMarket && (
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-rose-600 text-white">
                  🇻🇳 Thị trường Việt Nam
                </span>
              )}
            </div>
            <div className="text-[11px] text-indigo-800 dark:text-indigo-300 flex flex-wrap gap-1 pt-1">
              <span className="font-bold px-2 py-0.5 rounded bg-white dark:bg-slate-800 border">
                Loại: {getToolTypeNameVi(selectedType, customTypes)}
              </span>
              <span className="font-bold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900 border border-indigo-300 text-indigo-800 dark:text-indigo-200">
                Chính: {getCategoryNameVi(selectedPrimaryCategory, customCategories)}
              </span>
              {selectedCategories
                .filter(c => c !== selectedPrimaryCategory && c !== 'vietnam')
                .map((c, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-white dark:bg-slate-850 border text-slate-600 dark:text-slate-400">
                    +{getCategoryNameVi(c, customCategories)}
                  </span>
                ))}
            </div>
            {successMessage && (
              <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center space-x-1 pt-1 animate-pulse">
                <Check className="w-4 h-4" />
                <span>Đã lưu phân loại đa lĩnh vực thành công!</span>
              </span>
            )}
          </div>

        </div>

        {/* Footer Modal */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/60 dark:bg-slate-850/60 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold"
          >
            Hủy bỏ
          </button>

          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all flex items-center space-x-1.5"
          >
            <Check className="w-4 h-4" />
            <span>Lưu phân loại</span>
          </button>
        </div>
      </div>
    </div>
  );
};
