import { useStore } from '@/store/useStore';
import { Settings, CheckCircle2, ChevronDown, Copy, Edit2, LogOut, MoreVertical, Play, Share, Link as LinkIcon, Plus } from 'lucide-react';
import { useLocation, Link } from 'wouter';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { motion } from 'framer-motion';
import EditProfileModal from '@/components/modals/EditProfile';

export default function Profile({ params }: { params?: { handle?: string } }) {
  const { user, videos } = useStore();
  const [location, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<'published' | 'review'>('published');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const isOwnProfile = !params?.handle || params.handle === user.handle;

  // Mock checking if user exists for public profile
  const displayUser = isOwnProfile ? user : {
    ...user,
    name: 'Иван Крипто',
    handle: params.handle,
    avatar: `https://api.dicebear.com/9.x/avataaars/svg?seed=${params.handle}`,
    followers: 450,
    following: 12,
    likes: 3200,
    bio: 'Изучаю крипту и WEB3. Инвестор.',
  };

  const userVideos = isOwnProfile ? videos.filter(v => v.handle === user.handle) : [];

  return (
    <div className="w-full h-full bg-[#050505] overflow-y-auto hide-scrollbar pb-28 text-white relative">
      {/* Top action bar */}
      <div className="absolute top-0 left-0 w-full z-10 flex justify-between items-center px-4 pt-10 pb-2">
        <div className="bg-black/40 backdrop-blur-md rounded-full px-3 py-1.5 flex items-center gap-1.5 border border-white/10 shadow-sm">
          <span className="text-accent font-display font-bold text-sm">{user.balance}</span>
          <span className="text-xs font-semibold text-white/70">TRND</span>
        </div>
        {isOwnProfile ? (
          <Link href="/settings">
            <button className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 active:scale-95 transition-transform">
              <Settings className="w-5 h-5 text-white" />
            </button>
          </Link>
        ) : (
          <button className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 active:scale-95 transition-transform">
            <Share className="w-5 h-5 text-white" />
          </button>
        )}
      </div>

      {/* Hero */}
      <div className="pt-24 px-4 flex flex-col items-center">
        <div className="relative">
          <img 
            src={displayUser.avatar} 
            alt="Profile" 
            className="w-28 h-28 rounded-[2.5rem] bg-[#111] object-cover border-4 border-[#050505] shadow-xl"
          />
        </div>
        
        <h1 className="text-xl font-bold mt-4 flex items-center gap-2">
          {displayUser.name} 🏅
          {displayUser.verified && (
            <div className="bg-primary text-white rounded-full p-0.5">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          )}
        </h1>
        <p className="text-white/50 text-sm mt-0.5 mb-1 font-medium">@{displayUser.handle}</p>
        <button className="text-primary text-xs font-semibold mb-3 hover:underline">Открывается по умолчанию</button>
        
        <p className="text-center text-sm text-white/80 max-w-[260px] leading-relaxed mb-6">
          {displayUser.bio}
        </p>

        {/* Stats */}
        <div className="flex w-full max-w-[300px] justify-between border-y border-white/10 py-4 mb-6">
          <div className="flex flex-col items-center flex-1">
            <span className="font-display font-bold text-lg">{displayUser.followers.toLocaleString('ru-RU')}</span>
            <span className="text-xs text-white/50 font-medium mt-0.5">Смотрят</span>
          </div>
          <div className="w-[1px] bg-white/10"></div>
          <div className="flex flex-col items-center flex-1">
            <span className="font-display font-bold text-lg">{displayUser.following.toLocaleString('ru-RU')}</span>
            <span className="text-xs text-white/50 font-medium mt-0.5">Trends</span>
          </div>
          <div className="w-[1px] bg-white/10"></div>
          <div className="flex flex-col items-center flex-1">
            <span className="font-display font-bold text-lg">{displayUser.likes.toLocaleString('ru-RU')}</span>
            <span className="text-xs text-white/50 font-medium mt-0.5">Лайки</span>
          </div>
        </div>

        {/* Actions */}
        {isOwnProfile ? (
          <div className="w-full flex flex-col gap-2">
            <div className="flex gap-2">
              <button 
                onClick={() => setIsEditModalOpen(true)}
                className="flex-1 bg-[#1A1A1A] hover:bg-[#222] text-white font-semibold py-3 rounded-2xl transition-colors text-sm border border-white/5 flex items-center justify-center gap-1.5"
              >
                ✏️ Редактировать
              </button>
              <button className="flex-1 bg-[#1A1A1A] hover:bg-[#222] text-white font-semibold py-3 rounded-2xl transition-colors text-sm border border-white/5 flex items-center justify-center gap-2">
                <LinkIcon className="w-4 h-4 text-white/50" /> Страница Trends
              </button>
            </div>
            <button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-2xl transition-colors text-sm flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" /> Добавить канал
            </button>
          </div>
        ) : (
          <div className="w-full flex gap-2">
            <button className="flex-[2] bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-2xl transition-colors text-sm">
              Отслеживать
            </button>
            <button className="flex-[1] bg-[#1A1A1A] hover:bg-[#222] text-white font-semibold py-3 rounded-2xl transition-colors text-sm border border-white/5 flex items-center justify-center gap-2">
              ✈️ Написать
            </button>
          </div>
        )}

        {isOwnProfile && (
          <Link href="/upload">
            <button className="w-full mt-3 bg-white text-black hover:bg-white/90 font-bold py-3.5 rounded-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-2">
              <Play className="w-4 h-4 fill-black" /> Добавить видео в ленту
            </button>
          </Link>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 mt-6 px-4">
        <button 
          onClick={() => setActiveTab('published')}
          className={cn(
            "flex-1 pb-3 text-sm font-semibold relative transition-colors",
            activeTab === 'published' ? "text-white" : "text-white/50"
          )}
        >
          Опубликовано
          {activeTab === 'published' && (
            <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 w-full h-[2px] bg-white rounded-t-full" />
          )}
        </button>
        <button 
          onClick={() => setActiveTab('review')}
          className={cn(
            "flex-1 pb-3 text-sm font-semibold relative transition-colors flex items-center justify-center gap-2",
            activeTab === 'review' ? "text-white" : "text-white/50"
          )}
        >
          На проверке <span className="bg-white/10 text-white/70 px-1.5 py-0.5 rounded text-[10px]">1</span>
          {activeTab === 'review' && (
            <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 w-full h-[2px] bg-white rounded-t-full" />
          )}
        </button>
      </div>

      {/* Content Grid */}
      <div className="p-1">
        {activeTab === 'published' ? (
          userVideos.length > 0 ? (
            <div className="grid grid-cols-3 gap-1">
              {userVideos.map(v => (
                <div key={v.id} className="aspect-[9/16] bg-gradient-to-b from-[#222] to-[#111] relative overflow-hidden group">
                  <div className="absolute bottom-2 left-2 flex items-center gap-1.5 text-xs font-semibold z-10 drop-shadow-md">
                    <Play className="w-3 h-3 fill-white" /> {(v.likes * 2).toLocaleString('ru-RU')}
                  </div>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors pointer-events-none" />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 flex flex-col items-center justify-center text-center px-8">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                <Play className="w-8 h-8 text-white/30 ml-1" />
              </div>
              <h3 className="font-bold text-lg mb-2">Здесь пока пусто</h3>
              <p className="text-white/50 text-sm mb-6 max-w-[240px]">
                Загрузите первое видео — за него начислим бонус в TRND
              </p>
              {isOwnProfile && (
                <Link href="/upload">
                  <button className="bg-white/10 hover:bg-white/15 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors">
                    Загрузить
                  </button>
                </Link>
              )}
            </div>
          )
        ) : (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <p className="text-white/50 text-sm">Ваши видео проходят модерацию</p>
          </div>
        )}
      </div>

      <EditProfileModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
    </div>
  );
}