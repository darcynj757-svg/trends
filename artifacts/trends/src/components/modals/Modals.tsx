import { useState, useEffect, useRef } from 'react';
import trendsLogoSrc from '@assets/logo_trends_1785780666251.png';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Sparkles, Wallet } from 'lucide-react';
import { useStore } from '@/store/useStore';

// ─── Legacy Onboarding (unused) ──────────────────────────────────────────────
export function Onboarding() {
  const { hasSeenOnboarding, setHasSeenOnboarding } = useStore();
  const [slide, setSlide] = useState(0);
  const slides = [
    { title: 'Смотри Reels в Telegram', desc: 'Открывай для себя лучшие короткие видео не выходя из мессенджера', icon: <Play className="w-12 h-12 text-primary" fill="currentColor" />, color: 'from-primary/20 to-transparent' },
    { title: 'Зарабатывай TRND за внимание', desc: 'Ваше время стоит денег. Получайте токены за просмотры и активность', icon: <Sparkles className="w-12 h-12 text-accent" fill="currentColor" />, color: 'from-accent/20 to-transparent' },
    { title: 'Обменяй на деньги и скидки', desc: 'Используйте токены для покупок у партнеров или выводите в крипту', icon: <Wallet className="w-12 h-12 text-green-400" />, color: 'from-green-500/20 to-transparent' },
  ];
  if (hasSeenOnboarding) return null;
  return (
    <AnimatePresence>
      <motion.div className="absolute inset-0 z-[100] bg-black flex flex-col items-center justify-center p-6" initial={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }}>
        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm">
          <motion.div key={slide} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className={`w-32 h-32 rounded-full mb-8 flex items-center justify-center bg-gradient-to-b ${slides[slide].color} border border-white/5 shadow-2xl`}>{slides[slide].icon}</motion.div>
          <motion.h2 key={`title-${slide}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-display font-bold text-center mb-3">{slides[slide].title}</motion.h2>
          <motion.p key={`desc-${slide}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-white/60 text-center text-sm px-4">{slides[slide].desc}</motion.p>
        </div>
        <div className="w-full flex flex-col items-center gap-6 pb-8">
          <div className="flex gap-2">{slides.map((_, i) => <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === slide ? 'w-6 bg-white' : 'w-1.5 bg-white/20'}`} />)}</div>
          <button onClick={() => { if (slide < slides.length - 1) setSlide(s => s + 1); else setHasSeenOnboarding(true); }} className="w-full max-w-sm bg-primary text-white font-bold py-4 rounded-2xl active:scale-[0.98] transition-transform">{slide < slides.length - 1 ? 'Далее' : 'Начать'}</button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Shared constants ─────────────────────────────────────────────────────────
const GRADIENT = 'linear-gradient(95deg, #4FC3F7 0%, #B39DDB 55%, #F48FB1 100%)';

const STARS = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  top: (i * 37 + 11) % 100,
  left: (i * 53 + 7) % 100,
  size: i % 6 === 0 ? 2.5 : i % 3 === 0 ? 1.5 : 1,
  twinkleDuration: 1.5 + (i % 5) * 0.7,
  twinkleDelay: (i % 9) * 0.4,
  baseOpacity: 0.1 + (i % 7) * 0.07,
}));

const ORBS = [
  { size: 260, x: ['10%', '25%', '15%'], y: ['15%', '35%', '20%'], color: 'rgba(41,121,255,0.22)', duration: 12 },
  { size: 200, x: ['65%', '55%', '70%'], y: ['10%', '30%', '15%'], color: 'rgba(124,58,237,0.18)', duration: 15 },
  { size: 180, x: ['20%', '40%', '25%'], y: ['60%', '75%', '65%'], color: 'rgba(79,195,247,0.15)', duration: 18 },
  { size: 220, x: ['60%', '75%', '65%'], y: ['55%', '70%', '60%'], color: 'rgba(244,143,177,0.12)', duration: 13 },
];

function TrendsLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <img src={trendsLogoSrc} alt="Trends" className="w-8 h-8 object-contain" style={{ mixBlendMode: 'screen' }} />
      <span className="text-white font-bold tracking-[0.2em] text-sm uppercase">Trends</span>
    </div>
  );
}

// ─── Onboarding screen config ─────────────────────────────────────────────────
interface TitleSegment { text: string; gradient: boolean }
interface OnboardingScreen {
  title: TitleSegment[];
  subtitle: string;
  pill: string;
  buttonLabel: string;
}

const onboardingScreens: OnboardingScreen[] = [
  {
    title: [
      { text: 'Твоё внимание = ', gradient: false },
      { text: 'твои деньги', gradient: true },
    ],
    subtitle: 'Смотри Reels прямо в Telegram и получай токены за каждый просмотр.',
    pill: 'Весь контент Telegram в одной ленте',
    buttonLabel: 'ДАЛЕЕ',
  },
  {
    title: [
      { text: 'Токены → ', gradient: false },
      { text: 'реальная выгода', gradient: true },
    ],
    subtitle: 'Обменивай в магазине на подписки, скидки и промокоды — или копи и жди листинга. Решаешь ты.',
    pill: 'Обменивай в один тап',
    buttonLabel: 'ДАЛЕЕ',
  },
  {
    title: [
      { text: 'Зови друзей — ', gradient: false },
      { text: 'зарабатывай больше', gradient: true },
    ],
    subtitle: 'Друг смотрит ленту — токены капают вам обоим. Чем больше друзей смотрят Trends, тем выше твой доход.',
    pill: 'Реферальная программа',
    buttonLabel: 'ДАЛЕЕ',
  },
  {
    title: [
      { text: 'Твои первые ', gradient: false },
      { text: '100 токенов', gradient: true },
    ],
    subtitle: 'Начислили авансом, чтобы ты сразу почувствовал, как это работает. Остальное заработаешь в ленте.',
    pill: 'Баланс уже пополнен',
    buttonLabel: 'ЗАБРАТЬ И НАЧАТЬ',
  },
];

// ─── Main component ───────────────────────────────────────────────────────────
export function TokensOnboarding({ onClose }: { onClose: () => void }) {
  const { setHasSeenTokensOnboarding, addTokens, hasClaimedWelcomeBonus, setHasClaimedWelcomeBonus } = useStore();
  const [slide, setSlide] = useState(0);
  const touchX = useRef<number>(0);

  const TOTAL = onboardingScreens.length;
  const isLast = slide === TOTAL - 1;
  const current = onboardingScreens[slide];

  const goTo = (next: number) => {
    if (next < 0 || next >= TOTAL) return;
    setSlide(next);
  };

  const handleNext = () => {
    if (!isLast) {
      goTo(slide + 1);
    } else {
      if (!hasClaimedWelcomeBonus) {
        addTokens(100, 'Первые токены 🎁');
        setHasClaimedWelcomeBonus(true);
      }
      setHasSeenTokensOnboarding(true);
      onClose();
    }
  };

  const handleSkip = () => {
    setHasSeenTokensOnboarding(true);
    onClose();
  };

  const handleTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 48) diff > 0 ? goTo(slide + 1) : goTo(slide - 1);
  };

  return (
    <motion.div
      className="absolute inset-0 z-[80] flex flex-col overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#050E24]" />
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-72 pointer-events-none"
        animate={{ opacity: [0.45, 0.75, 0.45] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ background: 'radial-gradient(ellipse 90% 60% at 50% 110%, rgba(41,121,255,0.32) 0%, transparent 70%)' }}
      />
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{ width: orb.size, height: orb.size, background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`, filter: 'blur(40px)' }}
          animate={{ x: orb.x, y: orb.y }}
          transition={{ duration: orb.duration, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
        />
      ))}
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
        <div className="flex items-center gap-1.5 mb-6">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <div
              key={i}
              className="h-[3px] rounded-full flex-1 overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.12)' }}
            >
              <motion.div
                className="h-full rounded-full bg-white"
                animate={{ width: i <= slide ? '100%' : '0%' }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
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
        <div className="flex justify-center mb-6">
          <TrendsLogo />
        </div>

        {/* Slide body — vertically centred, pure fade */}
        <div className="flex-1 flex flex-col items-center justify-center min-h-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center text-center w-full"
            >
              {/* Headline */}
              <h1 className="text-[40px] font-black leading-[1.1] mb-5 px-1">
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
              </h1>

              {/* Subtitle */}
              <p className="text-white/55 text-[15px] leading-relaxed mb-8 px-2">
                {current.subtitle}
              </p>

              {/* Pill */}
              <div
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <motion.span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                  style={{ background: '#4FC3F7' }}
                />
                <span className="text-white/60 text-[13px] font-medium">{current.pill}</span>
                <motion.span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                  style={{ background: '#F48FB1' }}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CTA button */}
        <motion.button
          onClick={handleNext}
          whileTap={{ scale: 0.97 }}
          className="w-full py-4 rounded-2xl font-bold text-sm tracking-widest text-white relative overflow-hidden mt-6"
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

// ─── Daily Check-in (unused but kept) ────────────────────────────────────────
export function DailyCheckin() {
  const { hasSeenDailyCheckin, setHasSeenDailyCheckin, user, addTokens } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const store = useStore.getState();
    if (store.hasSeenOnboarding && !store.hasSeenDailyCheckin) {
      setTimeout(() => setIsOpen(true), 1000);
    }
  }, []);

  const handleClaim = () => {
    if ((window as any).triggerTokenEarn) setTimeout(() => (window as any).triggerTokenEarn(45), 300);
    addTokens(45, 'Ежедневный стрик 🔥');
    setIsOpen(false);
    setHasSeenDailyCheckin(true);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div className="absolute inset-0 z-[90] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <motion.div className="bg-gradient-to-b from-[#1A1A1A] to-[#0A0A0A] border border-accent/20 rounded-[2rem] p-6 w-full max-w-sm relative overflow-hidden" initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-accent/20 blur-[50px] pointer-events-none" />
          <div className="flex flex-col items-center text-center relative z-10 pt-4">
            <div className="text-6xl mb-2 filter drop-shadow-[0_0_15px_rgba(255,165,0,0.5)]">🔥</div>
            <h2 className="text-2xl font-display font-bold mb-1">День {user.streak + 1}</h2>
            <p className="text-white/60 text-sm mb-6">Ваша серия продолжается!</p>
            <div className="bg-black/50 border border-white/10 rounded-2xl p-4 w-full mb-6">
              <div className="text-xs text-white/50 font-medium mb-1 uppercase tracking-wider">Награда</div>
              <div className="text-3xl font-display font-bold text-accent">+45 TRND</div>
            </div>
            <button onClick={handleClaim} className="w-full bg-accent text-black font-bold py-4 rounded-2xl hover:bg-accent/90 active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(255,165,0,0.3)]">Забрать</button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
