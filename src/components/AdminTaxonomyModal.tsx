import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Layers, 
  Tags, 
  Plus, 
  Trash2, 
  Edit3, 
  RotateCcw, 
  Check, 
  Sparkles,
  Info
} from 'lucide-react';
import { CategoryInfo, ToolType, Category } from '../types';
import { ToolTypeInfo, DEFAULT_TOOL_TYPES } from '../data/taxonomy';
import { CATEGORIES } from '../data/mockTools';

interface AdminTaxonomyModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: CategoryInfo[];
  toolTypes: ToolTypeInfo[];
  onSaveCategories: (newCategories: CategoryInfo[]) => void;
  onSaveToolTypes: (newToolTypes: ToolTypeInfo[]) => void;
  onResetToDefault: () => void;
}

export const AdminTaxonomyModal: React.FC<AdminTaxonomyModalProps> = ({
  isOpen,
  onClose,
  categories,
  toolTypes,
  onSaveCategories,
  onSaveToolTypes,
  onResetToDefault,
}) => {
  const [activeTab, setActiveTab] = useState<'categories' | 'toolTypes'>('categories');
  const [localCategories, setLocalCategories] = useState<CategoryInfo[]>(categories);
  const [localToolTypes, setLocalToolTypes] = useState<ToolTypeInfo[]>(toolTypes);

  // Trạng thái thêm mới
  const [newCatId, setNewCatId] = useState('');
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');

  const [newTypeId, setNewTypeId] = useState('');
  const [newTypeName, setNewTypeName] = useState('');
  const [newTypeDesc, setNewTypeDesc] = useState('');

  const [savedMsg, setSavedMsg] = useState(false);

  if (!isOpen) return null;

  // Xử lý chỉnh sửa Lĩnh vực
  const handleUpdateCategory = (id: string, field: 'nameVi' | 'descriptionVi', val: string) => {
    setLocalCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: val } : c))
    );
  };

  // Thêm Lĩnh vực mới
  const handleAddCategory = () => {
    if (!newCatId.trim() || !newCatName.trim()) return;
    const cleanId = newCatId.trim().toLowerCase().replace(/[^a-z0-9_]/g, '_') as Category;
    const item: CategoryInfo = {
      id: cleanId,
      nameVi: newCatName.trim(),
      descriptionVi: newCatDesc.trim() || 'Lĩnh vực chuyên môn bổ sung',
      icon: 'Layers',
    };
    const updated = [...localCategories, item];
    setLocalCategories(updated);
    onSaveCategories(updated);
    setNewCatId('');
    setNewCatName('');
    setNewCatDesc('');
    showSavedNotification();
  };

  // Xử lý chỉnh sửa Loại hình
  const handleUpdateToolType = (id: ToolType, field: 'nameVi' | 'descriptionVi', val: string) => {
    setLocalToolTypes((prev) =>
      prev.map((t) => (t.id === id ? { ...t, [field]: val } : t))
    );
  };

  // Thêm Loại hình mới
  const handleAddToolType = () => {
    if (!newTypeId.trim() || !newTypeName.trim()) return;
    const cleanId = newTypeId.trim().toLowerCase().replace(/[^a-z0-9_]/g, '_') as ToolType;
    const item: ToolTypeInfo = {
      id: cleanId,
      nameVi: newTypeName.trim(),
      descriptionVi: newTypeDesc.trim() || 'Loại hình thành phần bổ sung',
      badgeColor: 'indigo',
    };
    const updated = [...localToolTypes, item];
    setLocalToolTypes(updated);
    onSaveToolTypes(updated);
    setNewTypeId('');
    setNewTypeName('');
    setNewTypeDesc('');
    showSavedNotification();
  };

  const showSavedNotification = () => {
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  };

  const handleSaveAll = () => {
    onSaveCategories(localCategories);
    onSaveToolTypes(localToolTypes);
    showSavedNotification();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0 bg-slate-50/50 dark:bg-slate-850/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
                  Quản Trị Phân Loại Hệ Thống (Taxonomy)
                </h2>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 uppercase">
                  Admin
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Tùy chỉnh, bổ sung và chuẩn hóa Loại hình thành phần và Lĩnh vực chuyên môn của AI HUB VN
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

        {/* Tab Navigation */}
        <div className="px-6 pt-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900 shrink-0">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('categories')}
              className={`flex items-center space-x-2 px-4 py-2.5 border-b-2 font-bold text-xs transition-colors ${
                activeTab === 'categories'
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>1. Lĩnh vực chuyên môn ({localCategories.length - 1})</span>
            </button>

            <button
              onClick={() => setActiveTab('toolTypes')}
              className={`flex items-center space-x-2 px-4 py-2.5 border-b-2 font-bold text-xs transition-colors ${
                activeTab === 'toolTypes'
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <Tags className="w-4 h-4" />
              <span>2. Loại hình thành phần ({localToolTypes.length})</span>
            </button>
          </div>

          {savedMsg && (
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center space-x-1 animate-fadeIn">
              <Check className="w-4 h-4" />
              <span>Đã lưu thành công!</span>
            </span>
          )}
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: LĨNH VỰC CHUYÊN MÔN */}
          {activeTab === 'categories' && (
            <div className="space-y-6">
              
              {/* Form thêm mới Lĩnh vực */}
              <div className="p-4 rounded-2xl bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/40 space-y-3">
                <span className="font-bold text-xs text-indigo-900 dark:text-indigo-200 flex items-center space-x-1.5">
                  <Plus className="w-4 h-4 text-indigo-600" />
                  <span>Thêm Lĩnh vực chuyên môn mới</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <input
                    type="text"
                    placeholder="Mã định danh (ví dụ: real_estate)"
                    value={newCatId}
                    onChange={(e) => setNewCatId(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Tên tiếng Việt (ví dụ: Bất động sản & Nhà đất)"
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none"
                  />
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Mô tả ngắn gọn"
                      value={newCatDesc}
                      onChange={(e) => setNewCatDesc(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none"
                    />
                    <button
                      onClick={handleAddCategory}
                      className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shrink-0"
                    >
                      Thêm
                    </button>
                  </div>
                </div>
              </div>

              {/* Danh sách các Lĩnh vực hiện hành */}
              <div className="space-y-3">
                <span className="font-bold text-xs text-slate-800 dark:text-slate-200">
                  Danh sách Lĩnh vực chuyên môn hiện hành (chỉnh sửa trực tiếp):
                </span>
                <div className="space-y-2">
                  {localCategories.filter((c) => c.id !== 'all').map((cat) => (
                    <div
                      key={cat.id}
                      className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="sm:w-1/4">
                        <span className="font-mono text-[11px] text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-md">
                          {cat.id}
                        </span>
                      </div>
                      <div className="sm:w-1/3">
                        <input
                          type="text"
                          value={cat.nameVi}
                          onChange={(e) => handleUpdateCategory(cat.id as string, 'nameVi', e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 font-bold text-slate-900 dark:text-white"
                        />
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          value={cat.descriptionVi}
                          onChange={(e) => handleUpdateCategory(cat.id as string, 'descriptionVi', e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 text-slate-600 dark:text-slate-300 text-[11px]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: LOẠI HÌNH THÀNH PHẦN */}
          {activeTab === 'toolTypes' && (
            <div className="space-y-6">
              
              {/* Form thêm mới Loại hình */}
              <div className="p-4 rounded-2xl bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/40 space-y-3">
                <span className="font-bold text-xs text-indigo-900 dark:text-indigo-200 flex items-center space-x-1.5">
                  <Plus className="w-4 h-4 text-indigo-600" />
                  <span>Thêm Loại hình thành phần mới</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <input
                    type="text"
                    placeholder="Mã định danh (ví dụ: benchmark)"
                    value={newTypeId}
                    onChange={(e) => setNewTypeId(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Tên hiển thị (ví dụ: Benchmark Tool)"
                    value={newTypeName}
                    onChange={(e) => setNewTypeName(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none"
                  />
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Mô tả chức năng"
                      value={newTypeDesc}
                      onChange={(e) => setNewTypeDesc(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none"
                    />
                    <button
                      onClick={handleAddToolType}
                      className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shrink-0"
                    >
                      Thêm
                    </button>
                  </div>
                </div>
              </div>

              {/* Danh sách các Loại hình hiện hành */}
              <div className="space-y-3">
                <span className="font-bold text-xs text-slate-800 dark:text-slate-200">
                  Danh sách 13 Loại hình thành phần hiện hành:
                </span>
                <div className="space-y-2">
                  {localToolTypes.map((typeItem) => (
                    <div
                      key={typeItem.id}
                      className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="sm:w-1/4">
                        <span className="font-mono text-[11px] text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded-md">
                          {typeItem.id}
                        </span>
                      </div>
                      <div className="sm:w-1/3">
                        <input
                          type="text"
                          value={typeItem.nameVi}
                          onChange={(e) => handleUpdateToolType(typeItem.id, 'nameVi', e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 font-bold text-slate-900 dark:text-white"
                        />
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          value={typeItem.descriptionVi}
                          onChange={(e) => handleUpdateToolType(typeItem.id, 'descriptionVi', e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 text-slate-600 dark:text-slate-300 text-[11px]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Footer Modal */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-850/50 shrink-0 text-xs">
          <button
            onClick={() => {
              if (window.confirm('Bạn có chắc chắn muốn khôi phục danh mục phân loại về mặc định ban đầu không?')) {
                onResetToDefault();
                setLocalCategories(CATEGORIES);
                setLocalToolTypes(DEFAULT_TOOL_TYPES);
                showSavedNotification();
              }
            }}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Khôi phục mặc định</span>
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 font-semibold"
            >
              Đóng
            </button>
            <button
              onClick={handleSaveAll}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md shadow-indigo-600/20"
            >
              Lưu thay đổi
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
