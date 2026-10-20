import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Check, Sparkles, Tags, Layers, AlertCircle } from 'lucide-react';
import { AITool, ToolType, Category, CategoryInfo } from '../types';
import { DEFAULT_TOOL_TYPES, ToolTypeInfo, getToolTypeNameVi, getCategoryNameVi } from '../data/taxonomy';
import { CATEGORIES } from '../data/mockTools';

interface EditToolTaxonomyModalProps {
  isOpen: boolean;
  onClose: () => void;
  tool: AITool | null;
  onSave: (toolId: string, newType: ToolType, newCategory: Category) => void;
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
  const [selectedCategory, setSelectedCategory] = useState<Category>('software_development');
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    if (tool) {
      setSelectedType(tool.toolType);
      setSelectedCategory(tool.category);
      setSuccessMessage(false);
    }
  }, [tool]);

  if (!isOpen || !tool) return null;

  // Lọc bỏ mục 'all' hoặc 'vietnam' khỏi danh sách chọn lĩnh vực
  const validCategories = customCategories.filter((c) => c.id !== 'all');

  const handleSave = () => {
    onSave(tool.id, selectedType, selectedCategory);
    setSuccessMessage(true);
    setTimeout(() => {
      setSuccessMessage(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div 
        className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0 bg-slate-50/50 dark:bg-slate-850/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/60 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                  Điều Chỉnh Phân Loại Tài Nguyên
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 uppercase">
                  Quyền Admin
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate max-w-sm">
                Công cụ: <strong className="text-slate-800 dark:text-slate-200">{tool.name}</strong>
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
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          
          {/* Thông tin hiện tại */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850/70 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
            <span className="font-bold text-slate-700 dark:text-slate-300">Phân loại hiện tại của công cụ:</span>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-semibold border border-indigo-200 dark:border-indigo-800">
                Loại hình: {tool.typeNameVi}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold border border-slate-200 dark:border-slate-700">
                Lĩnh vực: {tool.categoryNameVi}
              </span>
            </div>
          </div>

          {/* 1. Chọn Loại hình thành phần mới */}
          <div className="space-y-2">
            <label className="flex items-center space-x-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
              <Tags className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>1. Chọn Loại hình thành phần mới (13 Loại hình chuẩn):</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-1 border border-slate-200 dark:border-slate-800 rounded-2xl">
              {customTypes.map((typeItem) => {
                const isSelected = selectedType === typeItem.id;
                return (
                  <button
                    key={typeItem.id}
                    type="button"
                    onClick={() => setSelectedType(typeItem.id)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-medium transition-all text-left ${
                      isSelected
                        ? 'bg-indigo-50 dark:bg-indigo-950/70 border-indigo-500 text-indigo-700 dark:text-indigo-300 shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-850'
                    }`}
                  >
                    <span className="font-bold">{typeItem.nameVi}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
              * Tuyệt đối giữ nguyên thuật ngữ kỹ thuật quốc tế (Agent, Skill, MCP Server, Workflow...), riêng phần mềm hiển thị là "Phần mềm".
            </p>
          </div>

          {/* 2. Chọn Lĩnh vực chuyên môn mới */}
          <div className="space-y-2">
            <label className="flex items-center space-x-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
              <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>2. Chọn Lĩnh vực chuyên môn mới (18 Lĩnh vực chuyên sâu):</span>
            </label>
            <div className="space-y-1.5 max-h-56 overflow-y-auto p-1 border border-slate-200 dark:border-slate-800 rounded-2xl">
              {validCategories.map((catItem) => {
                const isSelected = selectedCategory === catItem.id;
                return (
                  <button
                    key={catItem.id}
                    type="button"
                    onClick={() => setSelectedCategory(catItem.id as Category)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs font-medium transition-all text-left ${
                      isSelected
                        ? 'bg-indigo-50 dark:bg-indigo-950/70 border-indigo-500 text-indigo-700 dark:text-indigo-300 shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-850'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">{catItem.nameVi}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-sm">
                        {catItem.descriptionVi}
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 ml-2" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Xem trước thay đổi */}
          <div className="p-3.5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/40 text-xs flex items-center justify-between">
            <div>
              <span className="font-bold text-indigo-900 dark:text-indigo-200">Phân loại sau khi lưu:</span>
              <div className="text-[11px] text-indigo-700 dark:text-indigo-300 mt-0.5">
                {getToolTypeNameVi(selectedType, customTypes)} • {getCategoryNameVi(selectedCategory, customCategories)}
              </div>
            </div>
            {successMessage && (
              <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center space-x-1 animate-pulse">
                <Check className="w-4 h-4" />
                <span>Đã lưu thành công!</span>
              </span>
            )}
          </div>

        </div>

        {/* Footer Modal */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-850/50 shrink-0">
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
            <span>Lưu thay đổi phân loại</span>
          </button>
        </div>
      </div>
    </div>
  );
};
