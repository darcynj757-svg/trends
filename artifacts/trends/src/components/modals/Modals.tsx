import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Sparkles, Wallet, TrendingUp, Coins, ShoppingBag } from 'lucide-react';
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

export function TokensOnboarding({ onClose }: { onClose: () => void }) {
  const { setHasSeenTokensOnboarding } = useStore();
  const [slide, setSlide] = useState(0);

  const slides = [
    {
      icon: <TrendingUp className="w-12 h-12 text-primary" />,
      color: "from-primary/20 to-transparent",
      badge: "01",
      title: "Что такое Trends?",
      desc: "Trends — это Reels прямо в Telegram. Смотри короткие видео, подписывайся на авторов и открывай для себя лучший контент, не выходя из мессенджера.",
      bullets: ["Полноэкранная лента коротких видео", "Категории: Крипто, Авто, Юмор и ещё", "Встроено в Telegram как Mini App"],
    },
    {
      icon: <Coins className="w-12 h-12 text-amber-400" />,
      color: "from-amber-500/20 to-transparent",
      badge: "02",
      title: "Токены TRND",
      desc: "Твоё внимание — это ценность. Получай TRND-токены за каждый просмотр, ежедневный стрик и приглашение друзей.",
      bullets: ["1–20 TRND за досмотренное видео", "30–150 TRND за ежедневный стрик 🔥", "+13 000 TRND за каждого активного друга"],
    },
    {
      icon: <ShoppingBag className="w-12 h-12 text-green-400" />,
      color: "from-green-500/20 to-transparent",
      badge: "03",
      title: "Магазин и кэшбэк",
      desc: "Обменивай накопленные TRND на скидки у партнёров или выводи в крипту после листинга токена.",
      bullets: ["Кэшбэк от партнёров в TRND", "Скидки на товары и подписки", "Вывод в крипту после листинга"],
    },
  ];

  const current = slides[slide];
  const isLast = slide === slides.length - 1;

  const handleNext = () => {
    if (!isLast) {
      setSlide(s => s + 1);
    } else {
      setHasSeenTokensOnboarding(true);
      onClose();
    }
  };

  return (
    <motion.div
      className="absolute inset-0 z-[80] bg-black/85 backdrop-blur-md flex items-end justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => { if (e.target === e.currentTarget) { setHasSeenTokensOnboarding(true); onClose(); } }}
    >
      <motion.div
        className="w-full bg-gradient-to-b from-[#111111] to-[#090909] border border-white/10 rounded-t-[2rem] p-6 pb-10 overflow-hidden"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
      >
        {/* Progress dots */}
        <div className="flex gap-1.5 justify-center mb-6">
          {slides.map((_, i) => (
            <motion.div
              key={i}
              animate={{ width: i === slide ? 24 : 6, opacity: i <= slide ? 1 : 0.25 }}
              transition={{ duration: 0.3 }}
              className="h-1.5 rounded-full bg-primary"
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
          >
            {/* Icon */}
            <div className={`w-20 h-20 rounded-2xl mb-5 flex items-center justify-center bg-gradient-to-b ${current.color} border border-white/8 mx-auto`}>
              {current.icon}
            </div>

            {/* Badge + Title */}
            <div className="flex items-center gap-2 mb-2 justify-center">
              <span className="text-xs font-bold text-primary/80 tracking-widest">{current.badge}</span>
              <h2 className="text-xl font-bold text-white">{current.title}</h2>
            </div>

            <p className="text-white/55 text-sm text-center mb-5 leading-relaxed">{current.desc}</p>

            {/* Bullets */}
            <div className="flex flex-col gap-2 mb-6">
              {current.bullets.map((b, i) => (
                <div key={i} className="flex items-start gap-3 bg-white/4 border border-white/6 rounded-xl px-4 py-3">
                  <span className="text-primary mt-0.5">✓</span>
                  <span className="text-sm text-white/80">{b}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Buttons */}
        <div className="flex gap-3">
          {!isLast && (
            <button
              onClick={() => { setHasSeenTokensOnboarding(true); onClose(); }}
              className="flex-none px-4 py-3.5 rounded-2xl text-white/40 text-sm font-medium border border-white/8"
            >
              Пропустить
            </button>
          )}
          <button
            onClick={handleNext}
            className="flex-1 bg-primary text-white font-bold py-3.5 rounded-2xl active:scale-[0.98] transition-transform text-sm"
          >
            {isLast ? 'Перейти к токенам' : 'Далее'}
          </button>
        </div>
      </motion.div>
    </motion.div>
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