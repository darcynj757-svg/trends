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
const TITLE_GRADIENT = 'linear-gradient(95deg, #00C6FF 0%, #8B2FFF 48%, #FF1E8C 100%)';

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
      { text: 'Экономика внимания.\n', accent: false },
      { text: 'Начни монетизировать своё время', accent: true },
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

// ─── Animated background ─────────────────────────────────────────────────────
const BG_ORBS = [
  { w: 340, h: 340, x: '-15%', y: '10%',  color: 'rgba(41,121,255,0.22)',  dur: 14, dx: ['0%','14%','5%'],    dy: ['0%','10%','3%']  },
  { w: 280, h: 280, x: '55%',  y: '-8%',  color: 'rgba(124,58,237,0.18)',  dur: 11, dx: ['0%','-12%','-4%'],  dy: ['0%','16%','7%'] },
  { w: 220, h: 220, x: '15%',  y: '58%',  color: 'rgba(79,195,247,0.16)',  dur: 17, dx: ['0%','10%','-5%'],   dy: ['0%','-12%','4%'] },
  { w: 240, h: 240, x: '62%',  y: '58%',  color: 'rgba(244,143,177,0.13)', dur: 13, dx: ['0%','-8%','3%'],    dy: ['0%','8%','-5%']  },
];

const STARS = Array.from({ length: 70 }, (_, i) => ({
  id: i,
  top:  (i * 37 + 11) % 100,
  left: (i * 53 + 7)  % 100,
  size: i % 6 === 0 ? 2.5 : i % 3 === 0 ? 1.5 : 1,
  dur:  1.5 + (i % 5) * 0.7,
  delay:(i % 9) * 0.4,
  baseOp: 0.08 + (i % 7) * 0.07,
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
    enter: (dir: number) => ({ opacity: 0, x: dir * 30 }),
    center: { opacity: 1, x: 0 },
    exit:  (dir: number) => ({ opacity: 0, x: dir * -30 }),
  };

  return (
    <motion.div
      className="absolute inset-0 z-[80] flex flex-col overflow-hidden"
      style={{ background: '#050E24' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ── Animated orbs ── */}
      {BG_ORBS.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: orb.w, height: orb.h,
            left: orb.x, top: orb.y,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: 'blur(50px)',
          }}
          animate={{ x: orb.dx, y: orb.dy }}
          transition={{ duration: orb.dur, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
        />
      ))}

      {/* Bottom radial glow */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-80 pointer-events-none"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ background: 'radial-gradient(ellipse 90% 60% at 50% 110%, rgba(41,121,255,0.35) 0%, transparent 70%)' }}
      />

      {/* Stars */}
      {STARS.map(s => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{ top: `${s.top}%`, left: `${s.left}%`, width: s.size, height: s.size }}
          animate={{ opacity: [s.baseOp, s.baseOp * 3.5, s.baseOp] }}
          transition={{ duration: s.dur, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
        />
      ))}

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col h-full px-6 pt-6 pb-8">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <TrendsLogo />
        </div>

        {/* Slide body — takes remaining space */}
        <div className="flex-1 flex flex-col justify-start pt-6 min-h-0">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={slide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col w-full"
            >
              {/* Pill — above title */}
              <div className="flex justify-center mb-4">
                <div
                  className="inline-flex items-center rounded-full px-4 py-1.5"
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <span className="text-white/60 text-[12px] font-medium tracking-wide">{current.pill}</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-[38px] leading-[1.12] mb-6 text-center" style={{ overflowWrap: 'normal', wordBreak: 'keep-all', fontWeight: 900, hyphens: 'none', textShadow: '0 0 1px rgba(255,255,255,0.6)' }}>
                {current.title.map((seg, i) => {
                  if (seg.accent) {
                    return (
                      <span key={i} className="gradient-text" style={{ display: 'block', marginTop: '0.5rem' }}>
                        {seg.text.replace(/\n/g, ' ')}
                      </span>
                    );
                  }
                  return seg.text.split('\n').map((part, pi, arr) => (
                    <span key={`${i}-${pi}`} className="text-white">
                      {part}
                      {pi < arr.length - 1 && <br />}
                    </span>
                  ));
                })}
              </h1>

              {/* Subtitle */}
              {current.subtitle && (
                <div
                  className="rounded-2xl px-4 py-3 text-center"
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <p className="text-white/70 text-[13px] leading-snug">{current.subtitle}</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress segments — above button */}
        <div className="flex items-center justify-center gap-1.5 mb-4">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <motion.div
              key={i}
              className="rounded-full overflow-hidden"
              animate={{ width: i === slide ? 20 : 6, opacity: i <= slide ? 1 : 0.3 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              style={{ height: 6, background: i <= slide ? '#ffffff' : 'rgba(255,255,255,0.25)' }}
            />
          ))}
        </div>

        {/* CTA button — blue gradient */}
        <motion.button
          onClick={handleNext}
          whileTap={{ scale: 0.97 }}
          className="w-full py-4 rounded-full font-bold text-[16px] tracking-widest text-white relative overflow-hidden mt-6"
          style={{
            background: 'linear-gradient(90deg, #2979FF 0%, #1565C0 100%)',
            boxShadow: '0 4px 32px rgba(41,121,255,0.5)',
          }}
        >
          <motion.span
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.18) 50%, transparent 65%)' }}
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
