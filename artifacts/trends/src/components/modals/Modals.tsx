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

// Star field helper — static positions so they don't re-render
const STARS = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  top: `${(i * 37 + 11) % 100}%`,
  left: `${(i * 53 + 7) % 100}%`,
  size: i % 5 === 0 ? 2.5 : i % 3 === 0 ? 1.5 : 1,
  opacity: 0.15 + (i % 7) * 0.06,
}));

function TrendsLogo() {
  return (
    <div className="flex items-center gap-2">
      {/* T-shield icon */}
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 2L4 7v7c0 5.5 4.3 10.6 10 12 5.7-1.4 10-6.5 10-12V7L14 2z" fill="url(#shield-grad)" />
        <text x="14" y="19" textAnchor="middle" fill="white" fontWeight="bold" fontSize="12" fontFamily="system-ui">T</text>
        <defs>
          <linearGradient id="shield-grad" x1="4" y1="2" x2="24" y2="26" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4FC3F7" />
            <stop offset="1" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
      </svg>
      <span className="text-white font-bold tracking-[0.18em] text-sm uppercase">Trends</span>
    </div>
  );
}

export function TokensOnboarding({ onClose }: { onClose: () => void }) {
  const { setHasSeenTokensOnboarding } = useStore();
  const [slide, setSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  const slides = [
    {
      chip: "Монетизируй своё время",
      lines: [
        { text: "Новый", gradient: false },
        { text: "тренд", gradient: false },
        { text: "Смотри", gradient: true },
        { text: "Reels", gradient: true },
        { text: "получай", gradient: false },
        { text: "токены!", gradient: false },
      ],
    },
    {
      chip: "Твоё внимание = деньги",
      lines: [
        { text: "Зарабатывай", gradient: false },
        { text: "TRND", gradient: true },
        { text: "за каждый", gradient: false },
        { text: "просмотр", gradient: true },
        { text: "и стрик!", gradient: false },
      ],
    },
    {
      chip: "Партнёры и скидки",
      lines: [
        { text: "Обменяй", gradient: false },
        { text: "токены", gradient: true },
        { text: "на кэшбэк", gradient: false },
        { text: "и вывод", gradient: true },
        { text: "в крипту!", gradient: false },
      ],
    },
  ];

  const TOTAL = slides.length;
  const isLast = slide === TOTAL - 1;

  const handleNext = () => {
    setDirection(1);
    if (!isLast) {
      setSlide(s => s + 1);
    } else {
      setHasSeenTokensOnboarding(true);
      onClose();
    }
  };

  const handleSkip = () => {
    setHasSeenTokensOnboarding(true);
    onClose();
  };

  return (
    <motion.div
      className="absolute inset-0 z-[80] flex flex-col overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#07102A]" />
      {/* Radial blue glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(30,80,200,0.45)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_65%,rgba(20,60,160,0.3)_0%,transparent_70%)]" />

      {/* Stars */}
      {STARS.map(s => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{ top: s.top, left: s.left, width: s.size, height: s.size, opacity: s.opacity }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-6 pt-5 pb-8">

        {/* Top bar: progress + skip */}
        <div className="flex items-center gap-3 mb-6">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <motion.div
              key={i}
              className="h-[3px] rounded-full flex-1 overflow-hidden bg-white/15"
            >
              <motion.div
                className="h-full rounded-full bg-white"
                initial={{ width: i < slide ? '100%' : '0%' }}
                animate={{ width: i < slide ? '100%' : i === slide ? '100%' : '0%' }}
                transition={i === slide ? { duration: 6, ease: 'linear' } : { duration: 0.3 }}
              />
            </motion.div>
          ))}
          <button onClick={handleSkip} className="text-white/40 text-xs font-medium shrink-0 ml-1">
            Пропустить
          </button>
        </div>

        {/* Logo */}
        <div className="flex justify-center mb-auto">
          <TrendsLogo />
        </div>

        {/* Slide content */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col items-center text-center"
            >
              {/* Headline */}
              <div className="mb-8">
                {slides[slide].lines.map((line, i) => (
                  <div key={i} className="leading-none mb-1">
                    {line.gradient ? (
                      <span
                        className="text-5xl font-black"
                        style={{
                          background: 'linear-gradient(90deg, #4FC3F7 0%, #B39DDB 50%, #F48FB1 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        {line.text}
                      </span>
                    ) : (
                      <span className="text-5xl font-black text-white">{line.text}</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Chip */}
              <div className="inline-flex items-center gap-2 bg-white/8 border border-white/12 rounded-full px-5 py-2.5 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
                <span className="text-white/70 text-sm font-medium">{slides[slide].chip}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CTA button */}
        <button
          onClick={handleNext}
          className="w-full py-4 rounded-2xl font-bold text-base tracking-wider text-white active:scale-[0.97] transition-transform"
          style={{
            background: 'linear-gradient(90deg, #2979FF 0%, #1565C0 100%)',
            boxShadow: '0 4px 32px rgba(41,121,255,0.45)',
          }}
        >
          {isLast ? 'НАЧАТЬ' : 'ДАЛЕЕ'}
        </button>
      </div>
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