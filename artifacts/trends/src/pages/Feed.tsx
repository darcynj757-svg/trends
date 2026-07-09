import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Share2, Bookmark, Play, ChevronDown, Check } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';

export default function Feed() {
  const { videos } = useStore();
  const [activeTab, setActiveTab] = useState('Для вас');
  const [showCategories, setShowCategories] = useState(false);
  const categories = ['Авто и мото', 'Новости и СМИ', 'Блогинг', 'Крипто', 'Юмор', 'Игры'];

  return (
    <div className="relative w-full h-full bg-black snap-y snap-mandatory overflow-y-scroll hide-scrollbar pb-[80px]">
      {/* Top Nav */}
      <div className="absolute top-0 left-0 w-full z-30 pt-12 pb-4 px-4 flex flex-col items-center bg-gradient-to-b from-black/90 via-black/50 to-transparent pointer-events-none">
        <div className="pointer-events-auto flex items-center justify-center gap-6 mb-3">
          <button 
            className={cn("text-base transition-colors drop-shadow-md flex items-center gap-1.5", activeTab === 'Тренды' ? 'text-white font-bold' : 'text-white/70 font-medium')} 
            onClick={() => { setActiveTab('Тренды'); setShowCategories(!showCategories); }}
          >
            Тренды <ChevronDown className={cn("w-4 h-4 transition-transform", showCategories && "rotate-180")} />
          </button>
          <button 
            className={cn("text-base transition-colors drop-shadow-md", activeTab === 'Для вас' ? 'text-white font-bold' : 'text-white/70 font-medium')} 
            onClick={() => { setActiveTab('Для вас'); setShowCategories(false); }}
          >
            Для вас
          </button>
        </div>
        
        <AnimatePresence>
          {showCategories && activeTab === 'Тренды' && (
            <motion.div 
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              className="w-full pointer-events-auto overflow-hidden"
            >
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {categories.map(cat => (
                  <button key={cat} className="px-3 py-1.5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-xs font-medium text-white border border-white/10 transition-colors">
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {videos.map((video, idx) => (
        <VideoItem key={video.id} video={video} index={idx} />
      ))}
    </div>
  );
}

function VideoItem({ video, index }: { video: any, index: number }) {
  const [progress, setProgress] = useState(0);
  const duration = 15; // 15 seconds
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { addTokens } = useStore();

  const [following, setFollowing] = useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsPlaying(entry.isIntersecting);
      if (!entry.isIntersecting) {
        setProgress(0); // reset when out of view
      }
    }, { threshold: 0.6 });

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(p => {
          if (p >= duration) {
            if ((window as any).triggerTokenEarn) {
              (window as any).triggerTokenEarn(2);
            }
            addTokens(2, 'Просмотр видео');
            return 0; // Loop video
          }
          return p + 0.1;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, addTokens, duration]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div ref={containerRef} className="relative w-full h-[100dvh] snap-start flex-shrink-0 flex flex-col justify-end" style={{ background: video.gradient }}>
      {/* Mock Play Indicator */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/10">
        <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20">
          <Play className="w-8 h-8 text-white ml-1" fill="white" />
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

      {/* Right Action Rail */}
      <div className="absolute right-4 bottom-32 z-20 flex flex-col gap-6 items-center">
        <button onClick={() => setLiked(!liked)} className="flex flex-col items-center gap-1 group">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-sm group-active:scale-90 transition-transform">
            <Heart className={cn("w-7 h-7 transition-colors", liked ? "fill-destructive text-destructive" : "text-white")} />
          </div>
          <span className="text-white font-medium text-xs shadow-black drop-shadow-md">
            {liked ? (video.likes + 1).toLocaleString('ru-RU') : video.likes.toLocaleString('ru-RU')}
          </span>
        </button>

        <button className="flex flex-col items-center gap-1 group">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-sm group-active:scale-90 transition-transform">
            <MessageCircle className="w-7 h-7 text-white" />
          </div>
          <span className="text-white font-medium text-xs shadow-black drop-shadow-md">{video.comments}</span>
        </button>

        <button onClick={() => setSaved(!saved)} className="flex flex-col items-center gap-1 group">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-sm group-active:scale-90 transition-transform">
            <Bookmark className={cn("w-7 h-7 transition-colors", saved ? "fill-accent text-accent" : "text-white")} />
          </div>
          <span className="text-white font-medium text-xs shadow-black drop-shadow-md">{video.bookmarks}</span>
        </button>

        <button className="flex flex-col items-center gap-1 group">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-sm group-active:scale-90 transition-transform">
            <Share2 className="w-7 h-7 text-white" />
          </div>
          <span className="text-white font-medium text-xs shadow-black drop-shadow-md">{video.shares}</span>
        </button>
      </div>

      {/* Bottom Info */}
      <div className="relative z-10 px-4 pb-28 w-[calc(100%-4rem)] pointer-events-auto">
        <div className="flex items-center gap-3 mb-3">
          <img src={video.authorAvatar} alt="avatar" className="w-11 h-11 rounded-full border-2 border-white/20 object-cover shadow-lg" />
          <div className="flex-1 flex flex-col justify-center">
            <div className="flex items-center gap-2">
              <h3 className="text-white font-bold text-base drop-shadow-md">{video.author}</h3>
              <button 
                onClick={() => setFollowing(!following)}
                className={cn(
                  "text-[10px] font-bold px-3 py-1 rounded-full transition-colors border uppercase tracking-wide",
                  following ? "bg-white/10 text-white border-white/10" : "bg-primary text-white border-primary"
                )}
              >
                {following ? "В подписках" : "Подписаться"}
              </button>
            </div>
            <p className="text-white/60 text-xs drop-shadow-md">@{video.handle}</p>
          </div>
        </div>
        
        <p className="text-white/90 text-sm mb-2 drop-shadow-md line-clamp-2">
          {video.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {video.tags.map((tag: string) => (
            <span key={tag} className="text-xs font-bold text-primary drop-shadow-md">#{tag}</span>
          ))}
        </div>
      </div>

      {/* Progress Bar & Time */}
      <div className="absolute bottom-[92px] left-0 w-full px-4 flex items-center gap-3 z-20">
        <div className="flex-1 h-[3px] bg-white/20 relative rounded-full overflow-hidden">
          <div className="absolute top-0 left-0 h-full bg-white/90 rounded-full" style={{ width: `${(progress / duration) * 100}%` }} />
        </div>
        <div className="text-[10px] font-bold text-white/90 drop-shadow-md whitespace-nowrap tabular-nums">
          {formatTime(progress)} / {formatTime(duration)}
        </div>
      </div>
    </div>
  );
}