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

// ─── Screen visuals ───────────────────────────────────────────────────────────

function ReelsMockVisual() {
  const [tokens, setTokens] = useState(0);
  const [floaters, setFloaters] = useState<Array<{ id: number; val: number; x: number }>>([]);

  useEffect(() => {
    const id = setInterval(() => {
      const val = Math.floor(Math.random() * 3) + 1;
      setTokens(t => t + val);
      const x = 28 + Math.random() * 44;
      setFloaters(f => [...f.slice(-5), { id: Date.now(), val, x }]);
    }, 750);
    return () => clearInterval(id);
  }, []);

  const videoBgs = [
    'linear-gradient(160deg, #2b5876 0%, #4e4376 100%)',
    'linear-gradient(160deg, #141e30 0%, #243b55 100%)',
  ];

  return (
    <div className="relative w-48 h-[220px] mx-auto">
      {/* Phone body */}
      <div className="absolute inset-0 rounded-[2rem] border border-white/15 overflow-hidden shadow-2xl" style={{ background: '#0a0a0a' }}>
        {/* Status bar */}
        <div className="h-5 bg-black/50 flex items-center justify-center shrink-0">
          <div className="w-10 h-[3px] bg-white/15 rounded-full" />
        </div>
        {/* Two video cards */}
        {videoBgs.map((bg, i) => (
          <div key={i} className="relative flex flex-col justify-end p-2.5" style={{ height: 'calc(50% - 2.5px)', background: bg }}>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-2 items-center">
              <div className="w-6 h-6 rounded-full bg-white/10 border border-white/10" />
              <div className="w-6 h-6 rounded-full bg-white/10 border border-white/10" />
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-white/25 border border-white/20" />
              <div className="flex flex-col gap-0.5">
                <div className="h-[5px] w-14 bg-white/35 rounded-full" />
                <div className="h-[4px] w-10 bg-white/20 rounded-full" />
              </div>
            </div>
          </div>
        ))}
        <div className="h-[5px]" />
      </div>

      {/* Token balance chip */}
      <motion.div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full px-3 py-1.5 flex items-center gap-1.5"
        style={{
          background: 'rgba(10,20,50,0.95)',
          border: '1px solid rgba(79,195,247,0.35)',
          boxShadow: '0 0 18px rgba(37,99,235,0.45)',
        }}
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span
          className="font-black text-xs tabular-nums"
          style={{ background: GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
        >
          {tokens}
        </span>
        <span className="text-white/50 text-[10px] font-medium">TRND</span>
      </motion.div>

      {/* Floating +N labels */}
      <AnimatePresence>
        {floaters.map(f => (
          <motion.span
            key={f.id}
            className="absolute pointer-events-none text-sm font-black"
            style={{
              left: `${f.x}%`,
              bottom: '38%',
              background: GRADIENT,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 5px rgba(79,195,247,0.7))',
            }}
            initial={{ opacity: 1, y: 0, scale: 1 }}
            animate={{ opacity: 0, y: -44, scale: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
          >
            +{f.val}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}

const SHOP_ITEMS = [
  { emoji: '⭐', name: 'Telegram Premium', price: '500 TRND', accent: '#4FC3F7' },
  { emoji: '🛡️', name: 'VPN на месяц', price: '300 TRND', accent: '#B39DDB' },
  { emoji: '🏷️', name: 'Промокод −30%', price: '150 TRND', accent: '#F48FB1' },
];

function ShopCardsFan() {
  const configs = [
    { rotate: -10, x: -30, y: 8, z: 1, scale: 0.9 },
    { rotate: 0, x: 0, y: 0, z: 3, scale: 1 },
    { rotate: 10, x: 30, y: 8, z: 1, scale: 0.9 },
  ];

  return (
    <div className="relative w-48 h-44 mx-auto flex items-center justify-center">
      {SHOP_ITEMS.map((item, i) => {
        const cfg = configs[i];
        return (
          <motion.div
            key={i}
            className="absolute w-36 rounded-2xl p-3.5"
            style={{
              zIndex: cfg.z,
              background: 'rgba(12,14,30,0.95)',
              border: `1px solid ${item.accent}22`,
              boxShadow: i === 1 ? `0 8px 32px rgba(0,0,0,0.6), 0 0 20px ${item.accent}18` : '0 4px 16px rgba(0,0,0,0.4)',
            }}
            initial={{ opacity: 0, y: 24, rotate: cfg.rotate, x: cfg.x, scale: cfg.scale * 0.85 }}
            animate={{ opacity: 1, y: cfg.y, rotate: cfg.rotate, x: cfg.x, scale: cfg.scale }}
            transition={{ delay: i * 0.13, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="text-2xl mb-1.5">{item.emoji}</div>
            <div className="text-white text-[11px] font-semibold leading-snug mb-2">{item.name}</div>
            <div
              className="text-[10px] font-bold px-2.5 py-1 rounded-full inline-block"
              style={{ background: `${item.accent}14`, color: item.accent }}
            >
              {item.price}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

const FRIENDS = [
  { angle: -70, label: 'Рома', seed: 'roma' },
  { angle: 50, label: 'Катя', seed: 'katya' },
  { angle: 175, label: 'Влад', seed: 'vlad' },
];

function ReferralNetworkVisual() {
  const SIZE = 200;
  const CX = SIZE / 2;
  const CY = SIZE / 2;
  const R = 70;

  const friendPts = FRIENDS.map(f => {
    const rad = (f.angle * Math.PI) / 180;
    return { ...f, x: CX + R * Math.cos(rad), y: CY + R * Math.sin(rad) };
  });

  return (
    <div className="relative mx-auto" style={{ width: SIZE, height: SIZE }}>
      <svg className="absolute inset-0" width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        <defs>
          <filter id="coin-glow">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Connector lines */}
        {friendPts.map((fp, i) => (
          <line
            key={i}
            x1={fp.x} y1={fp.y} x2={CX} y2={CY}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1.5"
            strokeDasharray="5 4"
          />
        ))}

        {/* Animated coins along each line */}
        {friendPts.map((fp, i) => (
          <motion.circle
            key={i}
            r={4.5}
            fill={i === 0 ? '#4FC3F7' : i === 1 ? '#B39DDB' : '#F48FB1'}
            filter="url(#coin-glow)"
            animate={{
              cx: [fp.x, CX],
              cy: [fp.y, CY],
              opacity: [0, 1, 1, 0],
              r: [4.5, 4.5, 3],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              delay: i * 0.55,
              ease: 'easeInOut',
            }}
          />
        ))}
      </svg>

      {/* Friend avatars */}
      {friendPts.map((fp, i) => (
        <div
          key={i}
          className="absolute flex flex-col items-center gap-0.5"
          style={{ left: fp.x, top: fp.y, transform: 'translate(-50%, -50%)' }}
        >
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold text-white border border-white/15"
            style={{ background: `rgba(255,255,255,0.07)` }}
          >
            {fp.label[0]}
          </div>
          <span className="text-[9px] text-white/40 font-medium">{fp.label}</span>
        </div>
      ))}

      {/* Center — You */}
      <div
        className="absolute flex flex-col items-center justify-center rounded-full font-bold text-white text-[11px]"
        style={{
          width: 46,
          height: 46,
          left: CX,
          top: CY,
          transform: 'translate(-50%, -50%)',
          background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
          boxShadow: '0 0 22px rgba(37,99,235,0.55)',
        }}
      >
        Вы
      </div>
    </div>
  );
}

function BonusCounterVisual({ onDone }: { onDone?: () => void }) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const ranRef = useRef(false);

  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;

    const delay = setTimeout(() => {
      const start = performance.now();
      const duration = 850;

      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        setCount(Math.round(eased * 100));
        if (t < 1) {
          requestAnimationFrame(tick);
        } else {
          setDone(true);
          try { (navigator as any).vibrate?.([80, 40, 80]); } catch { /* noop */ }
          onDone?.();
        }
      };
      requestAnimationFrame(tick);
    }, 450);

    return () => clearTimeout(delay);
  }, []);

  return (
    <div className="relative flex items-center justify-center h-44 mx-auto select-none">
      {/* Glow ring */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 160,
          height: 160,
          background: 'radial-gradient(circle, rgba(37,99,235,0.28) 0%, transparent 70%)',
        }}
        animate={done ? { scale: [1, 1.5, 1.2], opacity: [0.6, 1, 0.5] } : { scale: 1, opacity: 0.4 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      />

      {/* Counter */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        animate={done ? { scale: [1, 1.12, 1] } : {}}
        transition={{ duration: 0.4 }}
      >
        <motion.span
          className="text-[80px] font-black leading-none tabular-nums"
          style={{
            background: GRADIENT,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: done ? 'drop-shadow(0 0 24px rgba(79,195,247,0.75))' : 'none',
            transition: 'filter 0.35s',
          }}
        >
          {count}
        </motion.span>
        <span className="text-white/55 text-sm font-bold tracking-[0.25em] mt-1">TRND</span>
      </motion.div>

      {/* Particle burst on completion */}
      <AnimatePresence>
        {done && Array.from({ length: 10 }).map((_, i) => {
          const angle = (i / 10) * 360;
          const rad = (angle * Math.PI) / 180;
          const colors = ['#4FC3F7', '#B39DDB', '#F48FB1', '#FFD700'];
          return (
            <motion.div
              key={i}
              className="absolute w-2.5 h-2.5 rounded-full pointer-events-none"
              style={{ background: colors[i % colors.length] }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{ x: Math.cos(rad) * 80, y: Math.sin(rad) * 80, opacity: 0, scale: 0 }}
              transition={{ duration: 0.75, ease: 'easeOut', delay: i * 0.02 }}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
}

// ─── Onboarding screen config ─────────────────────────────────────────────────
interface TitleSegment { text: string; gradient: boolean }
interface OnboardingScreen {
  title: TitleSegment[];
  subtitle: string | null;
  pill: string | null;
  buttonLabel: string;
  visual: 'reels' | 'shop' | 'referral' | 'bonus';
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
    visual: 'reels',
  },
  {
    title: [
      { text: 'Токены → ', gradient: false },
      { text: 'реальная выгода', gradient: true },
    ],
    subtitle: 'Обменивай в магазине на подписки, скидки и промокоды — или копи и жди листинга. Решаешь ты.',
    pill: 'Обменивай в один тап',
    buttonLabel: 'ДАЛЕЕ',
    visual: 'shop',
  },
  {
    title: [
      { text: 'Зови друзей — ', gradient: false },
      { text: 'зарабатывай больше', gradient: true },
    ],
    subtitle: 'Друг смотрит ленту — токены капают вам обоим. Чем больше друзей смотрят Trends, тем выше твой доход.',
    pill: 'Реферальная программа',
    buttonLabel: 'ДАЛЕЕ',
    visual: 'referral',
  },
  {
    title: [
      { text: 'Твои первые ', gradient: false },
      { text: '100 токенов', gradient: true },
    ],
    subtitle: 'Начислили авансом, чтобы ты сразу почувствовал, как это работает. Остальное заработаешь в ленте.',
    pill: null,
    buttonLabel: 'ЗАБРАТЬ И НАЧАТЬ',
    visual: 'bonus',
  },
];

function renderVisual(type: OnboardingScreen['visual'], onBonusDone?: () => void) {
  switch (type) {
    case 'reels':    return <ReelsMockVisual />;
    case 'shop':     return <ShopCardsFan />;
    case 'referral': return <ReferralNetworkVisual />;
    case 'bonus':    return <BonusCounterVisual onDone={onBonusDone} />;
  }
}

// ─── Main component ───────────────────────────────────────────────────────────
export function TokensOnboarding({ onClose }: { onClose: () => void }) {
  const { setHasSeenTokensOnboarding, addTokens, hasClaimedWelcomeBonus, setHasClaimedWelcomeBonus } = useStore();
  const [slide, setSlide] = useState(0);
  const [dir, setDir] = useState(1);
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
    if (!isLast) {
      goTo(slide + 1, 1);
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
    if (Math.abs(diff) > 48) diff > 0 ? goTo(slide + 1, 1) : goTo(slide - 1, -1);
  };

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d * 36 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d * -36 }),
  };

  return (
    <motion.div
      className="absolute inset-0 z-[80] flex flex-col overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
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
        <div className="flex items-center gap-1.5 mb-4">
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
        <div className="flex justify-center mb-3">
          <TrendsLogo />
        </div>

        {/* Slide body */}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={slide}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col h-full"
            >
              {/* Headline */}
              <motion.h1
                className="text-[36px] font-black leading-[1.1] mb-3 px-1 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04, duration: 0.3 }}
              >
                {current.title.map((seg, i) =>
                  seg.gradient ? (
                    <span key={i} style={{ background: GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                      {seg.text}
                    </span>
                  ) : (
                    <span key={i} className="text-white">{seg.text}</span>
                  )
                )}
              </motion.h1>

              {/* Subtitle */}
              {current.subtitle && (
                <motion.p
                  className="text-white/55 text-[14px] leading-relaxed mb-4 px-1 text-center"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  {current.subtitle}
                </motion.p>
              )}

              {/* Visual — appears slightly after text */}
              <motion.div
                className="flex-1 flex items-center justify-center py-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.35 }}
              >
                {renderVisual(current.visual)}
              </motion.div>

              {/* Pill */}
              {current.pill && (
                <motion.div
                  className="flex justify-center mb-2"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.22, duration: 0.3 }}
                >
                  <div
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2"
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
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CTA button */}
        <motion.button
          onClick={handleNext}
          whileTap={{ scale: 0.97 }}
          className="w-full py-4 rounded-2xl font-bold text-sm tracking-widest text-white relative overflow-hidden mt-4"
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
