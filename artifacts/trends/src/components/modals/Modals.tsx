import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Sparkles, Wallet } from 'lucide-react';
import { useStore } from '@/store/useStore';

export function Onboarding() {
  const { hasSeenOnboarding, setHasSeenOnboarding } = useStore();
  const [slide, setSlide] = useState(0);

  const slides = [
    {
      title: "Смотри Reels в Telegram",
      desc: "Открывай для себя лучшие короткие видео не выходя из мессенджера",
      icon: <Play className="w-12 h-12 text-primary" fill="currentColor" />,
      color: "from-primary/20 to-transparent"
    },
    {
      title: "Зарабатывай TRND за внимание",
      desc: "Ваше время стоит денег. Получайте токены за просмотры и активность",
      icon: <Sparkles className="w-12 h-12 text-accent" fill="currentColor" />,
      color: "from-accent/20 to-transparent"
    },
    {
      title: "Обменяй на деньги и скидки",
      desc: "Используйте токены для покупок у партнеров или выводите в крипту",
      icon: <Wallet className="w-12 h-12 text-green-400" />,
      color: "from-green-500/20 to-transparent"
    }
  ];

  if (hasSeenOnboarding) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="absolute inset-0 z-[100] bg-black flex flex-col items-center justify-center p-6"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm">
          <motion.div 
            key={slide}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`w-32 h-32 rounded-full mb-8 flex items-center justify-center bg-gradient-to-b ${slides[slide].color} border border-white/5 shadow-2xl`}
          >
            {slides[slide].icon}
          </motion.div>
          
          <motion.h2 
            key={`title-${slide}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-display font-bold text-center mb-3"
          >
            {slides[slide].title}
          </motion.h2>
          
          <motion.p 
            key={`desc-${slide}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-center text-sm px-4"
          >
            {slides[slide].desc}
          </motion.p>
        </div>

        <div className="w-full flex flex-col items-center gap-6 pb-8">
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all duration-300 ${i === slide ? 'w-6 bg-white' : 'w-1.5 bg-white/20'}`}
              />
            ))}
          </div>

          <button 
            onClick={() => {
              if (slide < slides.length - 1) setSlide(s => s + 1);
              else setHasSeenOnboarding(true);
            }}
            className="w-full max-w-sm bg-primary text-white font-bold py-4 rounded-2xl active:scale-[0.98] transition-transform"
          >
            {slide < slides.length - 1 ? 'Далее' : 'Начать'}
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export function DailyCheckin() {
  const { hasSeenDailyCheckin, setHasSeenDailyCheckin, user, addTokens } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Only show if onboarding is done and we haven't seen checkin yet
    const store = useStore.getState();
    if (store.hasSeenOnboarding && !store.hasSeenDailyCheckin) {
      setTimeout(() => setIsOpen(true), 1000);
    }
  }, []);

  const handleClaim = () => {
    if ((window as any).triggerTokenEarn) {
      setTimeout(() => (window as any).triggerTokenEarn(45), 300);
    }
    addTokens(45, 'Ежедневный стрик 🔥');
    setIsOpen(false);
    setHasSeenDailyCheckin(true);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="absolute inset-0 z-[90] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="bg-gradient-to-b from-[#1A1A1A] to-[#0A0A0A] border border-accent/20 rounded-[2rem] p-6 w-full max-w-sm relative overflow-hidden"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-accent/20 blur-[50px] pointer-events-none" />
          
          <div className="flex flex-col items-center text-center relative z-10 pt-4">
            <div className="text-6xl mb-2 filter drop-shadow-[0_0_15px_rgba(255,165,0,0.5)]">🔥</div>
            <h2 className="text-2xl font-display font-bold mb-1">День {user.streak + 1}</h2>
            <p className="text-white/60 text-sm mb-6">Ваша серия продолжается!</p>
            
            <div className="bg-black/50 border border-white/10 rounded-2xl p-4 w-full mb-6">
              <div className="text-xs text-white/50 font-medium mb-1 uppercase tracking-wider">Награда</div>
              <div className="text-3xl font-display font-bold text-accent">+45 TRND</div>
            </div>

            <button 
              onClick={handleClaim}
              className="w-full bg-accent text-black font-bold py-4 rounded-2xl hover:bg-accent/90 active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(255,165,0,0.3)]"
            >
              Забрать
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}