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
const ACCENT_BLUE = '#4B7BF5';

function TrendsLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <img src={trendsLogoSrc} alt="Trends" className="w-8 h-8 object-contain" style={{ mixBlendMode: 'screen' }} />
      <span className="text-white font-bold tracking-[0.2em] text-sm uppercase">Trends</span>
    </div>
  );
}

// ─── Onboarding screen config ─────────────────────────────────────────────────
interface TitleSegment { text: string; accent: boolean }
interface OnboardingScreen {
  title: TitleSegment[];
  subtitle: string | null;
  pill: string;
  buttonLabel: string;
}

const onboardingScreens: OnboardingScreen[] = [
  {
    title: [
      { text: 'Экономика внимания — новый тренд. Начни ', accent: false },
      { text: 'монетизировать своё время', accent: true },
    ],
    subtitle: null,
    pill: 'Новый тренд',
    buttonLabel: 'ДАЛЕЕ',
  },
  {
    title: [
      { text: 'Смотри Reels в Telegram и ', accent: false },
      { text: 'зарабатывай токены', accent: true },
    ],
    subtitle: null,
    pill: 'Весь контент Telegram в одной бесконечной ленте',
    buttonLabel: 'ДАЛЕЕ',
  },
  {
    title: [
      { text: 'Приглашай друзей — получай ', accent: false },
      { text: 'токены', accent: true },
      { text: ' за их просмотры', accent: false },
    ],
    subtitle: 'Друг смотрит ленту, токены капают вам обоим. Чем больше друзей смотрят Trends, тем выше твой доход.',
    pill: 'Реферальная программа',
    buttonLabel: 'ДАЛЕЕ',
  },
  {
    title: [
      { text: 'Трать здесь и сейчас или держи до ', accent: false },
      { text: 'листинга', accent: true },
    ],
    subtitle: 'Заработанные токены можно сразу обменять на выгоду в магазине — или накопить и дождаться выхода на биржу.',
    pill: 'Решаешь только ты',
    buttonLabel: 'ДАЛЕЕ',
  },
  {
    title: [
      { text: 'Магазин — место, где токены становятся ', accent: false },
      { text: 'выгодой', accent: true },
    ],
    subtitle: 'Подписки, скидки, промокоды и другие награды. Выбирай, что нужно именно тебе.',
    pill: 'Обменивай в один тап',
    buttonLabel: 'ДАЛЕЕ',
  },
  {
    title: [
      { text: 'Вкладка «Токены» — вся твоя ', accent: false },
      { text: 'прибыль', accent: true },
      { text: ' в одном месте', accent: false },
    ],
    subtitle: 'Общий пул, история начислений и управление токенами. Начни монетизировать своё время уже сейчас.',
    pill: 'Твоё внимание — твой доход',
    buttonLabel: 'НАЧАТЬ',
  },
];

// ─── Animated background orbs ────────────────────────────────────────────────
const BG_ORBS = [
  { w: 320, h: 320, x: '-10%', y: '5%',  color: 'rgba(75,123,245,0.28)',  dur: 14, dx: ['0%','12%','4%'],   dy: ['0%','8%','2%']  },
  { w: 260, h: 260, x: '55%',  y: '-5%', color: 'rgba(56,189,248,0.22)',  dur: 11, dx: ['0%','-10%','-3%'], dy: ['0%','14%','6%'] },
  { w: 200, h: 200, x: '20%',  y: '55%', color: 'rgba(99,102,241,0.20)',  dur: 17, dx: ['0%','8%','-4%'],   dy: ['0%','-10%','3%']},
  { w: 180, h: 180, x: '65%',  y: '60%', color: 'rgba(14,165,233,0.18)',  dur: 13, dx: ['0%','-6%','2%'],   dy: ['0%','6%','-4%'] },
  { w: 140, h: 140, x: '10%',  y: '35%', color: 'rgba(139,92,246,0.15)',  dur: 19, dx: ['0%','10%','5%'],   dy: ['0%','-8%','4%'] },
];

const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  top:  (i * 41 + 7)  % 95,
  left: (i * 67 + 13) % 95,
  size: i % 5 === 0 ? 2.5 : i % 3 === 0 ? 1.8 : 1.2,
  dur:  2.2 + (i % 6) * 0.6,
  delay:(i % 8) * 0.35,
  baseOp: 0.08 + (i % 5) * 0.07,
}));

// ─── Main component ───────────────────────────────────────────────────────────
export function TokensOnboarding({ onClose }: { onClose: () => void }) {
  const { setHasSeenTokensOnboarding, addTokens, hasClaimedWelcomeBonus, setHasClaimedWelcomeBonus } = useStore();
  const [slide, setSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const touchX = useRef<number>(0);

  const TOTAL = onboardingScreens.length;
  const isLast = slide === TOTAL - 1;
  const current = onboardingScreens[slide];

  const goTo = (next: number) => {
    if (next < 0 || next >= TOTAL) return;
    setDirection(next > slide ? 1 : -1);
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

  const handleTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 48) diff > 0 ? goTo(slide + 1) : goTo(slide - 1);
  };

  const slideVariants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 28, scale: 0.97 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit:  (dir: number) => ({ opacity: 0, x: dir * -28, scale: 0.97 }),
  };

  return (
    <motion.div
      className="absolute inset-0 z-[80] flex flex-col overflow-hidden"
      style={{ background: '#05080F' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ── Animated background ── */}
      {BG_ORBS.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: orb.w, height: orb.h,
            left: orb.x, top: orb.y,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: 'blur(48px)',
          }}
          animate={{ x: orb.dx, y: orb.dy }}
          transition={{ duration: orb.dur, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
        />
      ))}

      {/* Subtle grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: 'linear-gradient(rgba(75,123,245,1) 1px, transparent 1px), linear-gradient(90deg, rgba(75,123,245,1) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Floating particles */}
      {PARTICLES.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            top: `${p.top}%`, left: `${p.left}%`,
            width: p.size, height: p.size,
            background: 'rgba(147,197,253,1)',
          }}
          animate={{ opacity: [p.baseOp, p.baseOp * 4, p.baseOp] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}

      {/* Bottom glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 100% 60% at 50% 120%, rgba(75,123,245,0.25) 0%, transparent 70%)' }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col h-full px-5 pt-8 pb-8">

        {/* Logo only — clean header */}
        <div className="flex justify-center mb-10">
          <TrendsLogo />
        </div>

        {/* Slide body */}
        <div className="flex-1 flex flex-col items-center justify-center min-h-0">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={slide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col items-center w-full"
            >
              {/* Liquid-glass card */}
              <div
                className="w-full rounded-[28px] p-6 mb-5 relative overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.055)',
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                  border: '1px solid rgba(255,255,255,0.13)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.12)',
                }}
              >
                {/* Inner highlight shimmer */}
                <div
                  className="absolute top-0 left-0 right-0 h-px rounded-full pointer-events-none"
                  style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.28) 50%, transparent 100%)' }}
                />
                {/* Blue accent glow behind text */}
                <div
                  className="absolute -top-8 left-1/2 -translate-x-1/2 w-40 h-24 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse, rgba(75,123,245,0.22) 0%, transparent 70%)', filter: 'blur(12px)' }}
                />

                <h1 className="relative text-[26px] font-black leading-[1.2] text-center">
                  {current.title.map((seg, i) =>
                    seg.accent ? (
                      <span key={i} style={{ color: ACCENT_BLUE }}>{seg.text}</span>
                    ) : (
                      <span key={i} className="text-white">{seg.text}</span>
                    )
                  )}
                </h1>
                {current.subtitle && (
                  <p className="relative text-[14px] leading-relaxed text-center mt-3" style={{ color: '#8E8E93' }}>
                    {current.subtitle}
                  </p>
                )}
              </div>

              {/* Pill badge */}
              <div
                className="inline-flex items-center rounded-full px-4 py-2"
                style={{
                  background: 'rgba(75,123,245,0.12)',
                  border: '1px solid rgba(75,123,245,0.3)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <span className="text-[13px] font-medium" style={{ color: 'rgba(147,197,253,0.9)' }}>{current.pill}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress dots — above button */}
        <div className="flex justify-center items-center gap-2 mb-4">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <motion.div
              key={i}
              animate={{
                width: i === slide ? 22 : 7,
                backgroundColor: i === slide
                  ? '#FFFFFF'
                  : i < slide
                    ? 'rgba(75,123,245,0.6)'
                    : 'rgba(255,255,255,0.18)',
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="h-[7px] rounded-full"
            />
          ))}
        </div>

        {/* CTA button — liquid glass style */}
        <motion.button
          onClick={handleNext}
          whileTap={{ scale: 0.97 }}
          className="w-full py-4 rounded-full font-bold text-[15px] tracking-wide text-black bg-white relative overflow-hidden"
          style={{ boxShadow: '0 0 24px rgba(75,123,245,0.35)' }}
        >
          <motion.span
            className="absolute inset-0 pointer-events-none rounded-full"
            style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)' }}
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
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
