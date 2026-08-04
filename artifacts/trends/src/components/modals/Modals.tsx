import { useState, useEffect, useRef } from 'react';
import trendsLogoSrc from '@assets/logo_trends_1785780666251.png';
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

// Pre-computed star data
const STARS = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  top: (i * 37 + 11) % 100,
  left: (i * 53 + 7) % 100,
  size: i % 6 === 0 ? 2.5 : i % 3 === 0 ? 1.5 : 1,
  twinkleDuration: 1.5 + (i % 5) * 0.7,
  twinkleDelay: (i % 9) * 0.4,
  baseOpacity: 0.1 + (i % 7) * 0.07,
}));

// Floating orbs config
const ORBS = [
  { size: 260, x: ['10%', '25%', '15%'], y: ['15%', '35%', '20%'], color: 'rgba(41,121,255,0.22)', duration: 12 },
  { size: 200, x: ['65%', '55%', '70%'], y: ['10%', '30%', '15%'], color: 'rgba(124,58,237,0.18)', duration: 15 },
  { size: 180, x: ['20%', '40%', '25%'], y: ['60%', '75%', '65%'], color: 'rgba(79,195,247,0.15)', duration: 18 },
  { size: 220, x: ['60%', '75%', '65%'], y: ['55%', '70%', '60%'], color: 'rgba(244,143,177,0.12)', duration: 13 },
];

function TrendsLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <img
        src={trendsLogoSrc}
        alt="Trends"
        className="w-8 h-8 object-contain"
        style={{ mixBlendMode: 'screen' }}
      />
      <span className="text-white font-bold tracking-[0.2em] text-sm uppercase">Trends</span>
    </div>
  );
}

// ─── Onboarding screen config ────────────────────────────────────────────────
// title: array of {text, gradient} segments rendered inline as large heading
// subtitle: body copy shown below title, or null for screens without it
// pill: label inside the frosted pill
// buttonLabel: CTA button text
const GRADIENT = 'linear-gradient(95deg, #4FC3F7 0%, #B39DDB 55%, #F48FB1 100%)';

interface TitleSegment { text: string; gradient: boolean }
interface OnboardingScreen {
  title: TitleSegment[];
  subtitle: string | null;
  pill: string;
  buttonLabel: string;
}

const onboardingScreens: OnboardingScreen[] = [
  {
    title: [
      { text: 'Экономика внимания', gradient: true },
      { text: ' — новый тренд. Начни монетизировать своё время', gradient: false },
    ],
    subtitle: null,
    pill: 'Новый тренд',
    buttonLabel: 'ДАЛЕЕ',
  },
  {
    title: [
      { text: 'Смотри ', gradient: false },
      { text: 'Reels', gradient: true },
      { text: ' в ', gradient: false },
      { text: 'Telegram', gradient: true },
      { text: ' и зарабатывай токены', gradient: false },
    ],
    subtitle: null,
    pill: 'Весь контент Telegram в одной бесконечной ленте',
    buttonLabel: 'ДАЛЕЕ',
  },
  {
    title: [
      { text: 'Приглашай друзей — получай токены ', gradient: false },
      { text: 'за их просмотры', gradient: true },
    ],
    subtitle: 'Друг смотрит ленту, токены капают вам обоим. Чем больше друзей смотрят Trends, тем выше твой доход.',
    pill: 'Реферальная программа',
    buttonLabel: 'ДАЛЕЕ',
  },
  {
    title: [
      { text: 'Трать ', gradient: false },
      { text: 'здесь и сейчас', gradient: true },
      { text: ' или держи до листинга', gradient: false },
    ],
    subtitle: 'Заработанные токены можно сразу обменять на выгоду в магазине — или накопить и дождаться выхода на биржу.',
    pill: 'Решаешь только ты',
    buttonLabel: 'ДАЛЕЕ',
  },
  {
    title: [
      { text: 'Магазин', gradient: true },
      { text: ' — место, где токены становятся выгодой', gradient: false },
    ],
    subtitle: 'Подписки, скидки, промокоды и другие награды. Выбирай, что нужно именно тебе.',
    pill: 'Обменивай в один тап',
    buttonLabel: 'ДАЛЕЕ',
  },
  {
    title: [
      { text: 'Вкладка ', gradient: false },
      { text: '«Токены»', gradient: true },
      { text: ' — вся твоя прибыль в одном месте', gradient: false },
    ],
    subtitle: 'Общий пул, история начислений и управление токенами. Начни монетизировать своё время уже сейчас.',
    pill: 'Твоё внимание — твой доход',
    buttonLabel: 'НАЧАТЬ',
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export function TokensOnboarding({ onClose }: { onClose: () => void }) {
  const { setHasSeenTokensOnboarding } = useStore();
  const [slide, setSlide] = useState(0);
  const [dir, setDir] = useState(1); // 1 = forward, -1 = backward
  const touchX = useRef<number>(0);

  const TOTAL = onboardingScreens.length;
  const isLast = slide === TOTAL - 1;
  const current = onboardingScreens[slide];

  const goTo = (next: number, direction: number) => {
    if (next < 0 || next >= TOTAL) return;
    setDir(direction);
    setSlide(next);
  };

  const handleNext = () => {
    if (!isLast) goTo(slide + 1, 1);
    else { setHasSeenTokensOnboarding(true); onClose(); }
  };

  const handleSkip = () => { setHasSeenTokensOnboarding(true); onClose(); };

  const handleTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 48) diff > 0 ? goTo(slide + 1, 1) : goTo(slide - 1, -1);
  };

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d * 40 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d * -40 }),
  };

  return (
    <motion.div
      className="absolute inset-0 z-[80] flex flex-col overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Base */}
      <div className="absolute inset-0 bg-[#050E24]" />

      {/* Aurora */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-72 pointer-events-none"
        animate={{ opacity: [0.45, 0.75, 0.45] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ background: 'radial-gradient(ellipse 90% 60% at 50% 110%, rgba(41,121,255,0.32) 0%, transparent 70%)' }}
      />

      {/* Floating orbs */}
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{ width: orb.size, height: orb.size, background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`, filter: 'blur(40px)' }}
          animate={{ x: orb.x, y: orb.y }}
          transition={{ duration: orb.duration, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
        />
      ))}

      {/* Twinkling stars */}
      {STARS.map(s => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{ top: `${s.top}%`, left: `${s.left}%`, width: s.size, height: s.size }}
          animate={{ opacity: [s.baseOpacity, s.baseOpacity * 3.5, s.baseOpacity] }}
          transition={{ duration: s.twinkleDuration, repeat: Infinity, delay: s.twinkleDelay, ease: 'easeInOut' }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-6 pt-5 pb-8">

        {/* Progress bar + skip */}
        <div className="flex items-center gap-1.5 mb-5">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <div
              key={i}
              className="h-[3px] rounded-full flex-1 overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.12)' }}
            >
              <motion.div
                className="h-full rounded-full bg-white"
                animate={{ width: i <= slide ? '100%' : '0%' }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              />
            </div>
          ))}
          {!isLast && (
            <button
              onClick={handleSkip}
              className="text-white/35 text-xs font-medium shrink-0 ml-2 hover:text-white/60 transition-colors"
            >
              Пропустить
            </button>
          )}
        </div>

        {/* Logo */}
        <div className="flex justify-center mb-2">
          <TrendsLogo />
        </div>

        {/* Slide body */}
        <div className="flex-1 flex flex-col items-center justify-center min-h-0">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={slide}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center w-full"
            >
              {/* Headline — inline segments */}
              <motion.h1
                className="text-[40px] font-black leading-[1.1] mb-5 px-1"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.35 }}
              >
                {current.title.map((seg, i) =>
                  seg.gradient ? (
                    <span
                      key={i}
                      style={{
                        background: GRADIENT,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {seg.text}
                    </span>
                  ) : (
                    <span key={i} className="text-white">{seg.text}</span>
                  )
                )}
              </motion.h1>

              {/* Subtitle — only when not null */}
              {current.subtitle && (
                <motion.p
                  className="text-white/55 text-[15px] leading-relaxed mb-6 px-2"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12, duration: 0.35 }}
                >
                  {current.subtitle}
                </motion.p>
              )}

              {/* Pill */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="inline-flex items-center gap-2.5 rounded-full px-5 py-2.5"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <motion.span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                  style={{ background: '#4FC3F7' }}
                />
                <span className="text-white/65 text-sm font-medium">{current.pill}</span>
                <motion.span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                  style={{ background: '#F48FB1' }}
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CTA button */}
        <motion.button
          onClick={handleNext}
          whileTap={{ scale: 0.97 }}
          className="w-full py-4 rounded-2xl font-bold text-base tracking-widest text-white relative overflow-hidden mt-6"
          style={{
            background: 'linear-gradient(90deg, #2563EB 0%, #1D4ED8 100%)',
            boxShadow: '0 0 36px rgba(37,99,235,0.5)',
          }}
        >
          <motion.span
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.14) 50%, transparent 65%)' }}
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1.8, ease: 'easeInOut' }}
          />
          {current.buttonLabel}
        </motion.button>
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