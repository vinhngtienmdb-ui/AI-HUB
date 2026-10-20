import React, { useState } from 'react';
import { 
  ChevronRight, User, Bookmark, Folder, LogOut, ArrowRight, Star, Plus, 
  Edit3, Phone, Globe, Briefcase, Mail, Check, X, ShieldCheck, Code2
} from 'lucide-react';
import { AITool, Collection, UserProfile } from '../types';

interface AccountPageProps {
  currentUser: string | null;
  userProfile: UserProfile | null;
  onUpdateProfile: (profile: UserProfile) => void;
  savedTools: AITool[];
  userCollections: Collection[];
  onNavigateHome: () => void;
  onSelectTool: (tool: AITool) => void;
  onToggleSaveTool: (toolId: string) => void;
  onOpenContribute: () => void;
  onLogout: () => void;
  isExpanded?: boolean;
}

export const AccountPage: React.FC<AccountPageProps> = ({
  currentUser,
  userProfile,
  onUpdateProfile,
  savedTools,
  userCollections,
  onNavigateHome,
  onSelectTool,
  onToggleSaveTool,
  onOpenContribute,
  onLogout,
  isExpanded = true,
}) => {
  const [activeTab, setActiveTab] = useState<'saved' | 'collections'>('saved');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);

  // Trạng thái form chỉnh sửa hồ sơ cá nhân
  const [formData, setFormData] = useState<UserProfile>({
    email: currentUser || '',
    displayName: userProfile?.displayName || (currentUser ? currentUser.split('@')[0] : 'Thành viên'),
    photoURL: userProfile?.photoURL || '',
    title: userProfile?.title || 'Chuyên gia AI & Phần mềm',
    bio: userProfile?.bio || 'Thành viên đam mê khám phá và xây dựng ứng dụng trí tuệ nhân tạo.',
    phone: userProfile?.phone || '',
    githubUrl: userProfile?.githubUrl || '',
    websiteUrl: userProfile?.websiteUrl || '',
  });

  const handleOpenEdit = () => {
    setFormData({
      email: currentUser || '',
      displayName: userProfile?.displayName || (currentUser ? currentUser.split('@')[0] : 'Thành viên'),
      photoURL: userProfile?.photoURL || '',
      title: userProfile?.title || 'Chuyên gia AI & Phần mềm',
      bio: userProfile?.bio || 'Thành viên đam mê khám phá và xây dựng ứng dụng trí tuệ nhân tạo.',
      phone: userProfile?.phone || '',
      githubUrl: userProfile?.githubUrl || '',
      websiteUrl: userProfile?.websiteUrl || '',
    });
    setIsEditingProfile(true);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    
    const updated: UserProfile = {
      ...formData,
      email: currentUser,
      displayName: formData.displayName.trim() || currentUser.split('@')[0],
    };

    onUpdateProfile(updated);
    setIsEditingProfile(false);
    setSaveSuccessMsg(true);
    setTimeout(() => setSaveSuccessMsg(false), 3000);
  };

  const currentDisplayName = userProfile?.displayName || (currentUser ? currentUser.split('@')[0] : 'Khách vãng lai');
  const currentTitle = userProfile?.title || 'Chuyên gia AI & Phần mềm';
  const currentBio = userProfile?.bio || 'Thành viên đam mê khám phá và xây dựng ứng dụng trí tuệ nhân tạo.';

  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors pb-20">
      
      {/* BREADCRUMB */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 py-3.5 transition-colors">
        <div className={`w-full mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${isExpanded ? 'max-w-[98%]' : 'max-w-6xl'}`}>
          <nav className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <button onClick={onNavigateHome} className="hover:text-indigo-600 transition-colors">
              Trang chủ
            </button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-900 dark:text-white font-semibold">
              Hồ sơ tài khoản & Quản lý công cụ
            </span>
          </nav>
        </div>
      </div>

      <div className={`w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8 transition-all duration-300 ${isExpanded ? 'max-w-[98%]' : 'max-w-6xl'}`}>
        
        {/* THÔNG BÁO LƯU HỒ SƠ THÀNH CÔNG */}
        {saveSuccessMsg && (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 flex items-center space-x-3 text-sm font-semibold animate-fadeIn">
            <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
              <Check className="w-4 h-4" />
            </div>
            <span>Thông tin hồ sơ cá nhân của bạn đã được cập nhật thành công!</span>
          </div>
        )}

        {/* THẺ HỒ SƠ NGƯỜI DÙNG */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            
            {/* THÔNG TIN CHÍNH: AVATAR + TÊN + CHỨC DANH + LIÊN KẾT */}
            <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-5 flex-1 min-w-0">
              
              {/* AVATAR */}
              <div className="relative shrink-0">
                {userProfile?.photoURL ? (
                  <img
                    src={userProfile.photoURL}
                    alt={currentDisplayName}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-indigo-500 shadow-md"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center font-extrabold text-3xl shadow-md">
                    {currentDisplayName.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 flex items-center justify-center" title="Đang hoạt động">
                  <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                </div>
              </div>

              {/* THÔNG TIN CHI TIẾT */}
              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                    {currentDisplayName}
                  </h1>
                  {currentUser === 'vinhngtien@gmail.com' && (
                    <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-bold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Quản trị viên tối cao</span>
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 dark:text-slate-400">
                  <span className="flex items-center space-x-1 font-medium text-indigo-600 dark:text-indigo-400">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>{currentTitle}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Mail className="w-3.5 h-3.5" />
                    <span>{currentUser || 'Chưa đăng nhập'}</span>
                  </span>
                  {userProfile?.phone && (
                    <span className="flex items-center space-x-1">
                      <Phone className="w-3.5 h-3.5" />
                      <span>{userProfile.phone}</span>
                    </span>
                  )}
                </div>

                {/* TIỂU SỬ */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                  {currentBio}
                </p>

                {/* LIÊN KẾT MẠNG XÃ HỘI */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  {userProfile?.githubUrl && (
                    <a
                      href={userProfile.githubUrl.startsWith('http') ? userProfile.githubUrl : `https://${userProfile.githubUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                      <span>GitHub</span>
                    </a>
                  )}
                  {userProfile?.websiteUrl && (
                    <a
                      href={userProfile.websiteUrl.startsWith('http') ? userProfile.websiteUrl : `https://${userProfile.websiteUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>Website</span>
                    </a>
                  )}

                  <span className="text-xs text-slate-400 ml-2">
                    • {savedTools.length} công cụ đã gắn sao ⭐
                  </span>
                  <span className="text-xs text-slate-400">
                    • {userCollections.length} bộ sưu tập
                  </span>
                </div>
              </div>
            </div>

            {/* CÁC NÚT HÀNH ĐỘNG HỒ SƠ */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0 pt-2 lg:pt-0">
              <button
                onClick={handleOpenEdit}
                className="px-4 py-2.5 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50/80 dark:bg-indigo-950/60 hover:bg-indigo-100 text-indigo-700 dark:text-indigo-300 font-bold text-xs shadow-xs transition-all flex items-center space-x-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Chỉnh sửa thông tin cá nhân</span>
              </button>

              <button
                onClick={onOpenContribute}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all flex items-center space-x-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Đóng góp mới</span>
              </button>

              <button
                onClick={onLogout}
                className="px-3.5 py-2.5 rounded-xl border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold transition-all flex items-center space-x-1.5"
                title="Đăng xuất khỏi hệ thống"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Đăng xuất</span>
              </button>
            </div>

          </div>
        </div>

        {/* MODAL CHỈNH SỬA THÔNG TIN CÁ NHÂN */}
        {isEditingProfile && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-xl w-full p-6 sm:p-7 space-y-5 max-h-[90vh] overflow-y-auto">
              
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                      Chỉnh sửa thông tin cá nhân
                    </h3>
                    <p className="text-xs text-slate-500">Cập nhật hồ sơ hiển thị công khai trên AI HUB VN</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsEditingProfile(false)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Tên hiển thị <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.displayName}
                    onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                    placeholder="Ví dụ: Nguyễn Tiến Vinh"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Đường dẫn ảnh đại diện (URL ảnh đại diện)
                  </label>
                  <input
                    type="url"
                    value={formData.photoURL || ''}
                    onChange={(e) => setFormData({ ...formData, photoURL: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium font-mono text-[11px]"
                    placeholder="https://example.com/avatar.jpg"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Dán liên kết ảnh từ GitHub, Google Drive hoặc kho ảnh công khai.</p>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Chức danh chuyên môn
                  </label>
                  <input
                    type="text"
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                    placeholder="Ví dụ: Kỹ sư AI, Chuyên gia MCP & Agent"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Tiểu sử ngắn / Giới thiệu bản thân
                  </label>
                  <textarea
                    rows={3}
                    value={formData.bio || ''}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium leading-relaxed"
                    placeholder="Mô tả ngắn gọn về chuyên môn, sở thích và định hướng phát triển AI của bạn..."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Số điện thoại liên hệ
                    </label>
                    <input
                      type="tel"
                      value={formData.phone || ''}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                      placeholder="0988xxxxxx"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Liên kết GitHub
                    </label>
                    <input
                      type="text"
                      value={formData.githubUrl || ''}
                      onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium font-mono text-[11px]"
                      placeholder="https://github.com/username"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Website / Portfolio cá nhân
                  </label>
                  <input
                    type="text"
                    value={formData.websiteUrl || ''}
                    onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium font-mono text-[11px]"
                    placeholder="https://vinhnguyen.dev"
                  />
                </div>

                <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsEditingProfile(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md shadow-indigo-600/20 transition-all"
                  >
                    Lưu thông tin cá nhân
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

        {/* TABS HỒ SƠ */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 space-x-8 text-sm font-bold">
          <button
            onClick={() => setActiveTab('saved')}
            className={`pb-3 border-b-2 transition-colors flex items-center space-x-2 ${
              activeTab === 'saved'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Star className={`w-4 h-4 ${activeTab === 'saved' ? 'fill-amber-400 text-amber-500' : ''}`} />
            <span>Công cụ đã gắn sao ⭐ ({savedTools.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('collections')}
            className={`pb-3 border-b-2 transition-colors flex items-center space-x-2 ${
              activeTab === 'collections'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Folder className="w-4 h-4" />
            <span>Bộ sưu tập ({userCollections.length})</span>
          </button>
        </div>

        {/* NỘI DUNG TABS */}
        {activeTab === 'saved' && (
          <div>
            {savedTools.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {savedTools.map((tool) => (
                  <div
                    key={tool.id}
                    onClick={() => onSelectTool(tool)}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-400 transition-all cursor-pointer flex flex-col justify-between shadow-sm group relative"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/80">
                          {tool.typeNameVi}
                        </span>

                        {/* NÚT BỎ GẮN SAO TRỰC TIẾP TẠI TRANG CÁ NHÂN */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleSaveTool(tool.id);
                          }}
                          className="p-1.5 rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/80 text-amber-500 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-300 transition-all"
                          title="Bỏ gắn sao công cụ này"
                        >
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500 group-hover:text-amber-600" />
                        </button>
                      </div>

                      <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 line-clamp-1">
                        {tool.name}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                        {tool.summaryVi}
                      </p>
                    </div>

                    <div className="pt-3 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-indigo-600">
                      <span className="text-amber-500 flex items-center space-x-1">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{tool.stars || 4.8}</span>
                      </span>
                      <span className="flex items-center space-x-1 text-indigo-600 dark:text-indigo-400">
                        <span>Chi tiết</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-12 text-center space-y-3">
                <Star className="w-12 h-12 text-amber-400/80 fill-amber-400/30 mx-auto" />
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                  Chưa có công cụ nào được gắn sao ⭐
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Khi khám phá kho tài nguyên AI HUB VN, hãy nhấp vào biểu tượng ngôi sao ⭐ trên bất kỳ công cụ nào để lưu trữ vào danh sách tiện tra cứu sau này.
                </p>
                <button
                  onClick={onNavigateHome}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all"
                >
                  Khám phá kho công cụ ngay
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'collections' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {userCollections.map((col) => (
              <div key={col.id} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
                <h4 className="font-bold text-base text-slate-900 dark:text-white">
                  {col.name}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-2">
                  {col.description}
                </p>
                <span className="text-[11px] font-bold text-indigo-600 block pt-2">
                  {col.toolIds.length} tài nguyên
                </span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
