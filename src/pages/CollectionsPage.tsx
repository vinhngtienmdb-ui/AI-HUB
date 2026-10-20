import React, { useState } from 'react';
import { ChevronRight, FolderPlus, Folder, Trash2, ArrowRight, Lock, Globe, Plus, Sparkles, BookOpen } from 'lucide-react';
import { Collection, AITool } from '../types';

interface CollectionsPageProps {
  collections: Collection[];
  tools: AITool[];
  onNavigateHome: () => void;
  onSelectTool: (tool: AITool) => void;
  onCreateCollection: (name: string, description: string, isPublic: boolean) => void;
  onDeleteCollection: (collectionId: string) => void;
  isExpanded?: boolean;
}

export const CollectionsPage: React.FC<CollectionsPageProps> = ({
  collections,
  tools,
  onNavigateHome,
  onSelectTool,
  onCreateCollection,
  onDeleteCollection,
  isExpanded = true,
}) => {
  const [selectedCollectionId, setSelectedCollectionId] = useState<string>(collections[0]?.id || '');
  const [isCreating, setIsCreating] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [isPublic, setIsPublic] = useState(true);

  const activeCollection = collections.find((c) => c.id === selectedCollectionId) || collections[0];

  // Lấy danh sách các tool trong collection được chọn
  const collectionTools = React.useMemo(() => {
    if (!activeCollection) return [];
    return tools.filter((t) => activeCollection.toolIds.includes(t.id));
  }, [tools, activeCollection]);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim()) {
      onCreateCollection(newName.trim(), newDesc.trim(), isPublic);
      setNewName('');
      setNewDesc('');
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors pb-20">
      
      {/* BREADCRUMB */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 py-3.5 transition-colors">
        <div className={`w-full mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${isExpanded ? 'max-w-[98%]' : 'max-w-7xl'}`}>
          <nav className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <button onClick={onNavigateHome} className="hover:text-indigo-600 transition-colors">
              Trang chủ
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-900 dark:text-white font-semibold">
              Bộ sưu tập tài nguyên
            </span>
          </nav>
        </div>
      </div>

      <div className={`w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 transition-all duration-300 ${isExpanded ? 'max-w-[98%]' : 'max-w-7xl'}`}>
        
        {/* HEADER TRANG */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight mb-2">
              Bộ sưu tập tài nguyên AI
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Tuyển tập các công cụ, máy chủ MCP và kỹ năng được đóng gói theo chủ đề và mục tiêu công việc.
            </p>
          </div>

          <button
            onClick={() => setIsCreating(true)}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/20 transition-all shrink-0 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Tạo bộ sưu tập mới</span>
          </button>
        </div>

        {/* MODAL TẠO BỘ SƯU TẬP */}
        {isCreating && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
            <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
                Tạo bộ sưu tập mới
              </h3>
              <form onSubmit={handleCreateSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Tên bộ sưu tập *
                  </label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Ví dụ: Công cụ AI cho Marketing..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Mô tả ngắn
                  </label>
                  <textarea
                    rows={2}
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    placeholder="Mục đích sử dụng của bộ sưu tập này..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-850 text-sm focus:outline-none"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isPublicCheck"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="isPublicCheck" className="text-xs text-slate-700 dark:text-slate-300 font-medium cursor-pointer">
                    Chia sẻ công khai với cộng đồng AI HUB VN
                  </label>
                </div>
                <div className="flex items-center justify-end space-x-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsCreating(false)}
                    className="px-4 py-2 rounded-xl border text-xs font-bold text-slate-600 hover:bg-slate-100"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md"
                  >
                    Xác nhận tạo
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* BỐ CỤC 2 CỘT: DANH SÁCH BỘ SƯU TẬP (TRÁI) + TÀI NGUYÊN BÊN TRONG (PHẢI) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* CỘT TRÁI: DANH SÁCH BỘ SƯU TẬP */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-400 mb-2">
              Danh sách bộ sưu tập ({collections.length})
            </h3>
            {collections.map((col) => {
              const isSelected = col.id === activeCollection?.id;
              return (
                <div
                  key={col.id}
                  onClick={() => setSelectedCollectionId(col.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-white dark:bg-slate-900 border-indigo-500 ring-2 ring-indigo-500/10 shadow-md'
                      : 'bg-white/80 dark:bg-slate-900/80 border-slate-200/80 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2.5">
                      <div className={`p-2 rounded-xl ${isSelected ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950' : 'bg-slate-100 text-slate-500 dark:bg-slate-800'}`}>
                        <Folder className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">
                          {col.name}
                        </h4>
                        <span className="text-[11px] text-slate-400">
                          {col.toolIds.length} tài nguyên
                        </span>
                      </div>
                    </div>

                    <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-slate-100 dark:bg-slate-800 text-slate-500">
                      {col.isPublic ? 'Công khai' : 'Riêng tư'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CỘT PHẢI: CHI TIẾT VÀ TÀI NGUYÊN BÊN TRONG BỘ SƯU TẬP */}
          <div className="lg:col-span-2 space-y-6">
            {activeCollection ? (
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
                <div>
                  <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-1">
                    <Folder className="w-4 h-4" />
                    <span>Bộ sưu tập đang chọn</span>
                  </div>
                  <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    {activeCollection.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {activeCollection.description}
                  </p>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800 pt-6 space-y-4">
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    Tài nguyên trong bộ sưu tập ({collectionTools.length})
                  </h3>

                  {collectionTools.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {collectionTools.map((tool) => (
                        <div
                          key={tool.id}
                          onClick={() => onSelectTool(tool)}
                          className="group p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/60 dark:border-slate-800 hover:border-indigo-400 transition-all cursor-pointer flex flex-col justify-between"
                        >
                          <div>
                            <span className="text-[10px] font-bold text-indigo-600 block mb-1">
                              {tool.typeNameVi}
                            </span>
                            <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 line-clamp-1">
                              {tool.name}
                            </h4>
                            <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                              {tool.summaryVi}
                            </p>
                          </div>

                          <div className="pt-3 mt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-indigo-600">
                            <span>Xem chi tiết</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center bg-slate-50 dark:bg-slate-850 rounded-2xl text-xs text-slate-500">
                      Chưa có tài nguyên nào trong bộ sưu tập này. Hãy khám phá và nhấn "Lưu vào bộ sưu tập" trên các trang chi tiết.
                    </div>
                  )}
                </div>
              </div>
            ) : null}
          </div>

        </div>

      </div>
    </div>
  );
};
