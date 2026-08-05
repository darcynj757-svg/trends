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
  subtitleBelow?: string;
  pills: string[];
  buttonLabel: string;
}

const onboardingScreens: OnboardingScreen[] = [
  {
    title: [
      { text: 'Смотри Reels\nв Telegram и ', accent: false },
      { text: 'зарабатывай токены', accent: true },
    ],
    subtitle: 'Весь видеоконтент Telegram в одной бесконечной ленте!',
    pills: ['Новый тренд · Экономика внимания'],
    buttonLabel: 'ДАЛЕЕ',
  },
  {
    title: [
      { text: 'Приглашай\nдрузей и получай', accent: false },
      { text: 'токены за их\nпросмотры', accent: true },
    ],
    subtitle: 'Чем больше друзей смотрят ленту Trends — тем больше токенов ты зарабатываешь.',
    pills: ['Реферальная программа'],
    buttonLabel: 'ДАЛЕЕ',
  },
  {
    title: [
      { text: 'Твои токены', accent: false },
      { text: 'работают\nна тебя', accent: true },
    ],
    subtitle: 'Обменивай токены в магазине уже сегодня — скидки, акции, промокоды или цифровые продукты от партнёров.',
    pills: ['Обменивай · Копи · Зарабатывай'],
    buttonLabel: 'ГОТОВО',
  },
];

// ─── Reels phone mockup (slide 0 visual) ─────────────────────────────────────
const CARD_COLORS = [
  'linear-gradient(160deg,#1a3a6e 0%,#2563eb 100%)',
  'linear-gradient(160deg,#4a1a6e 0%,#7c3aed 100%)',
  'linear-gradient(160deg,#1a4a3a 0%,#059669 100%)',
  'linear-gradient(160deg,#6e1a3a 0%,#db2777 100%)',
];

function ReelsMockup() {
  const phoneW = 100;
  const phoneH = 178;
  const cardH = phoneH - 8;

  const tokens = [
    { x: -38, delay: 0,   label: '+2 TRND' },
    { x:  38, delay: 0.9, label: '+1 TRND' },
    { x: -22, delay: 1.8, label: '+3 TRND' },
  ];

  return (
    <div className="flex justify-center items-center mt-6 mb-2" style={{ height: phoneH + 60 }}>
      <div className="relative" style={{ width: phoneW, height: phoneH }}>

        {/* Phone shell */}
        <div
          className="absolute inset-0 rounded-[22px] overflow-hidden"
          style={{
            background: '#0a0f1e',
            border: '2px solid rgba(255,255,255,0.18)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.12)',
          }}
        >
          {/* Scrolling cards */}
          <motion.div
            style={{ display: 'flex', flexDirection: 'column' }}
            animate={{ y: [0, -cardH, -cardH * 2, -cardH * 3, -cardH * 4] }}
            transition={{ duration: 10, repeat: Infinity, repeatType: 'loop', ease: [0.4, 0, 0.2, 1], times: [0, 0.22, 0.44, 0.66, 1] }}
          >
            {[...CARD_COLORS, CARD_COLORS[0]].map((bg, i) => (
              <div
                key={i}
                style={{ width: phoneW - 4, height: cardH, flexShrink: 0, background: bg, position: 'relative', margin: '0 auto' }}
              >
                {/* Play icon */}
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <motion.div
                    animate={{ scale: [1, 1.12, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                    style={{
                      width: 32, height: 32, borderRadius: '50%',
                      background: 'rgba(255,255,255,0.22)',
                      backdropFilter: 'blur(8px)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <svg width="12" height="14" viewBox="0 0 12 14" fill="white">
                      <path d="M1 1l10 6-10 6V1z" />
                    </svg>
                  </motion.div>
                </div>
                {/* Bottom bar */}
                <div style={{ position: 'absolute', bottom: 8, left: 8, right: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'rgba(255,255,255,0.35)' }} />
                  <div style={{ flex: 1, height: 4, borderRadius: 4, background: 'rgba(255,255,255,0.2)' }} />
                </div>
              </div>
            ))}
          </motion.div>

          {/* Glass overlay gradient at bottom */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 32,
            background: 'linear-gradient(to top, rgba(10,15,30,0.7) 0%, transparent 100%)' }} />
        </div>

        {/* Notch */}
        <div style={{ position: 'absolute', top: 6, left: '50%', transform: 'translateX(-50%)',
          width: 28, height: 5, borderRadius: 4, background: 'rgba(255,255,255,0.18)', zIndex: 10 }} />

        {/* Floating token badges */}
        {tokens.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 1, 1, 0], y: [10, -24, -56, -88] }}
            transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 4, delay: t.delay, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              bottom: 20,
              left: '50%',
              transform: `translateX(calc(-50% + ${t.x}px))`,
              borderRadius: 20,
              padding: '4px 10px',
              fontSize: 10,
              fontWeight: 700,
              color: 'rgba(255,255,255,0.95)',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              zIndex: 20,
              background: 'rgba(56,182,255,0.55)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.6)',
              boxShadow: '0 2px 16px rgba(56,182,255,0.45), inset 0 1px 0 rgba(255,255,255,0.3)',
            }}
          >
            {t.label}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Referral network mockup (slide 1 visual) ────────────────────────────────
const FRIENDS = [
  { angle: -90, delay: 0,   token: '+2 TRND', tokenDelay: 0.5 },
  { angle:  30, delay: 0.3, token: '+1 TRND', tokenDelay: 1.2 },
  { angle: 150, delay: 0.6, token: '+3 TRND', tokenDelay: 2.0 },
];

// tiny card colors for the mini-screen inside each friend node
const MINI_CARD_COLORS = [
  'linear-gradient(160deg,#1a3a6e 0%,#2563eb 100%)',
  'linear-gradient(160deg,#4a1a6e 0%,#7c3aed 100%)',
  'linear-gradient(160deg,#1a4a3a 0%,#059669 100%)',
  'linear-gradient(160deg,#6e1a3a 0%,#db2777 100%)',
];

/** A tiny phone screen that scrolls cards — shown next to each friend avatar */
function MiniPhone({ delay }: { delay: number }) {
  const w = 18, h = 30, cardH = h - 2;
  return (
    <div style={{
      width: w, height: h,
      borderRadius: 4,
      overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.14)',
      background: 'rgba(10,15,30,0.45)',
      boxShadow: '0 2px 10px rgba(0,0,0,0.4)',
      flexShrink: 0,
      opacity: 0.65,
    }}>
      <motion.div
        style={{ display: 'flex', flexDirection: 'column' }}
        animate={{ y: [0, -cardH, -cardH * 2, -cardH * 3, -cardH * 4] }}
        transition={{
          duration: 8, repeat: Infinity, repeatType: 'loop',
          ease: [0.4, 0, 0.2, 1], times: [0, 0.22, 0.44, 0.66, 1],
          delay,
        }}
      >
        {[...MINI_CARD_COLORS, MINI_CARD_COLORS[0]].map((bg, i) => (
          <div key={i} style={{
            width: w - 2, height: cardH, flexShrink: 0, background: bg,
            margin: '0 auto', position: 'relative',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {/* tiny play dot */}
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              background: 'rgba(255,255,255,0.35)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="4" height="5" viewBox="0 0 4 5" fill="white">
                <path d="M0 0l4 2.5L0 5z" />
              </svg>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function ReferralMockup() {
  const size = 200;
  const cx0 = size / 2;
  const r = 62;

  return (
    <div className="flex justify-center items-center mt-4 mb-1" style={{ height: size }}>
      <div style={{ position: 'relative', width: size, height: size }}>

        {/* Orbit ring */}
        <motion.div
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            width: r * 2, height: r * 2,
            marginLeft: -r, marginTop: -r,
            borderRadius: '50%',
            border: '1px dashed rgba(56,182,255,0.22)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        />

        {/* Friend avatars + mini phones + lines + tokens */}
        {FRIENDS.map((f, i) => {
          const rad = (f.angle * Math.PI) / 180;
          const fx = cx0 + r * Math.cos(rad);
          const fy = cx0 + r * Math.sin(rad);

          // position mini phone offset from the avatar, away from center
          const normX = Math.cos(rad);
          const normY = Math.sin(rad);
          const phoneOffX = normX * 16;
          const phoneOffY = normY * 16;

          return (
            <motion.div key={i}>
              {/* Connection line */}
              <svg style={{ position: 'absolute', inset: 0, width: size, height: size, pointerEvents: 'none', overflow: 'visible' }}>
                <motion.line
                  x1={cx0} y1={cx0} x2={fx} y2={fy}
                  stroke="rgba(56,182,255,0.28)"
                  strokeWidth={1}
                  strokeDasharray="3 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: f.delay + 0.15 }}
                />
              </svg>

              {/* Friend avatar */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18, delay: f.delay }}
                style={{
                  position: 'absolute',
                  left: fx - 14, top: fy - 14,
                  width: 28, height: 28,
                  borderRadius: '50%',
                  background: 'rgba(56,182,255,0.14)',
                  border: '1.5px solid rgba(120,210,255,0.45)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 0 10px rgba(56,182,255,0.2)',
                  zIndex: 2,
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="4" fill="rgba(180,230,255,0.85)" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="rgba(180,230,255,0.85)" />
                </svg>
              </motion.div>

              {/* Mini phone screen — appears after avatar, centered on offset point */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 240, damping: 20, delay: f.delay + 0.35 }}
                style={{
                  position: 'absolute',
                  left: fx + phoneOffX - 9,
                  top:  fy + phoneOffY - 15,
                  zIndex: 3,
                }}
              >
                <MiniPhone delay={i * 1.8} />
              </motion.div>

              {/* Token badge */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0], y: [0, -18, -36, -52] }}
                transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 4, delay: f.tokenDelay, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  left: fx - 22, top: fy - 28,
                  borderRadius: 20,
                  padding: '2px 7px',
                  fontSize: 9, fontWeight: 700,
                  color: 'rgba(255,255,255,0.95)',
                  whiteSpace: 'nowrap', pointerEvents: 'none',
                  background: 'rgba(56,182,255,0.45)',
                  backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.5)',
                  boxShadow: '0 2px 10px rgba(56,182,255,0.35), inset 0 1px 0 rgba(255,255,255,0.2)',
                  zIndex: 4,
                }}
              >
                {f.token}
              </motion.div>
            </motion.div>
          );
        })}

        {/* Center avatar */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.1 }}
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            marginLeft: -22, marginTop: -22,
            width: 44, height: 44,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(56,182,255,0.55) 0%, rgba(99,102,241,0.55) 100%)',
            border: '2px solid rgba(255,255,255,0.5)',
            backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 22px rgba(56,182,255,0.45), inset 0 1px 0 rgba(255,255,255,0.3)',
            zIndex: 2,
          }}
        >
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" fill="white" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="white" />
            </svg>
          </motion.div>
        </motion.div>

        {/* Pulse ring */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', width: 0, height: 0 }}>
          <motion.div
            style={{
              position: 'absolute',
              borderRadius: '50%',
              border: '1.5px solid rgba(56,182,255,0.55)',
              pointerEvents: 'none',
            }}
            animate={{ width: [44, 72, 44], height: [44, 72, 44], x: [-22, -36, -22], y: [-22, -36, -22], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Shop pills marquee (slide 2) ────────────────────────────────────────────
const SHOP_PILLS_ROW1 = ['Промокоды', 'Скидки до 30%', 'Кэшбэк', 'Telegram Premium', 'VIP-доступ', 'NFT-карточка', 'Буст ×2', 'Партнёры'];
const SHOP_PILLS_ROW2 = ['Акции', '200 TRND', '500 TRND', 'Цифровые товары', 'Подписки', 'Ozon', 'Yandex Go', 'Магазин'];

function ShopPillsMarquee() {
  const pill = (text: string, i: number) => (
    <div
      key={i}
      className="inline-flex items-center rounded-full px-2.5 py-[3px] shrink-0"
      style={{
        background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.18)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <span className="text-white/75 text-[10px] font-medium tracking-wide whitespace-nowrap">{text}</span>
    </div>
  );

  return (
    <div className="flex flex-col gap-1.5 -mx-6 overflow-hidden mb-6 -mt-4">
      {/* Row 1 — scrolls left */}
      <motion.div
        className="flex gap-1.5 w-max pl-6"
        animate={{ x: [0, -(SHOP_PILLS_ROW1.length * 88)] }}
        transition={{ duration: 14, ease: 'linear', repeat: Infinity, repeatType: 'loop' }}
      >
        {[...SHOP_PILLS_ROW1, ...SHOP_PILLS_ROW1].map((t, i) => pill(t, i))}
      </motion.div>

      {/* Row 2 — offset start, slightly different speed */}
      <motion.div
        className="flex gap-1.5 w-max pl-6"
        initial={{ x: -SHOP_PILLS_ROW2.length * 44 }}
        animate={{ x: [-SHOP_PILLS_ROW2.length * 44, -(SHOP_PILLS_ROW2.length * 44 + SHOP_PILLS_ROW2.length * 88)] }}
        transition={{ duration: 17, ease: 'linear', repeat: Infinity, repeatType: 'loop' }}
      >
        {[...SHOP_PILLS_ROW2, ...SHOP_PILLS_ROW2].map((t, i) => pill(t, i))}
      </motion.div>
    </div>
  );
}

// ─── Shop carousel (slide 2 visual) ──────────────────────────────────────────
const SHOP_ROW1 = [
  { emoji: '🎬', cat: 'Кино',     name: 'Кинопоиск',     price: '600 TRND',    badge: 'HD',    color: '#FF6B00' },
  { emoji: '🔒', cat: 'Безопасность', name: 'VPN доступ', price: '400 TRND',   badge: '1 мес', color: '#4B7BF5' },
  { emoji: '🍏', cat: 'Красота',  name: 'Золотое яблоко',price: '800 TRND',    badge: '-15%',  color: '#22C55E' },
  { emoji: '✈️', cat: 'Telegram', name: 'TG Premium',    price: '1 500 TRND',  badge: 'HOT',   color: '#2AABEE' },
];
const SHOP_ROW2 = [
  { emoji: '🛵', cat: 'Доставка', name: 'Самокат',       price: '350 TRND',    badge: '-25%',  color: '#059669' },
  { emoji: '⭐', cat: 'Яндекс',  name: 'Яндекс Плюс',   price: '900 TRND',    badge: '3 мес', color: '#FACC15' },
  { emoji: '₿',  cat: 'Крипто',  name: 'Крипто карта',  price: '5 000 TRND',  badge: 'NEW',   color: '#D97706' },
];

function ShopCard(item: { text: string } | { emoji: string; cat: string; name: string; price: string; badge: string; color: string }) {
  if ('text' in item) {
    return (
      <div style={{
        width: 200,
        height: 62,
        flexShrink: 0,
        background: 'linear-gradient(135deg, rgba(75,123,245,0.18) 0%, rgba(124,58,237,0.12) 100%)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(124,58,237,0.35)',
        borderRadius: 11,
        padding: '10px 13px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 10px rgba(124,58,237,0.15), inset 0 1px 0 rgba(255,255,255,0.10)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: -14, right: -14,
          width: 50, height: 50, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.4) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <p style={{
          color: 'rgba(255,255,255,0.85)', fontSize: 10, fontWeight: 500,
          lineHeight: 1.4, textAlign: 'center', margin: 0, position: 'relative', zIndex: 1,
        }}>{item.text}</p>
      </div>
    );
  }

  const { emoji, cat, name, price, badge, color } = item;
  return (
    <div style={{
      width: 148,
      height: 62,
      flexShrink: 0,
      background: `linear-gradient(135deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.04) 100%)`,
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: `1px solid ${color}48`,
      borderRadius: 11,
      padding: '7px 9px',
      position: 'relative',
      boxShadow: `0 2px 10px ${color}18, inset 0 1px 0 rgba(255,255,255,0.10)`,
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    }}>
      {/* Glow */}
      <div style={{
        position: 'absolute', top: -12, right: -12,
        width: 44, height: 44, borderRadius: '50%',
        background: `radial-gradient(circle, ${color}45 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />
      {/* Emoji icon */}
      <div style={{
        fontSize: 22, lineHeight: 1, flexShrink: 0,
        width: 34, height: 34, borderRadius: 9,
        background: `${color}18`,
        border: `1px solid ${color}30`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>{emoji}</div>
      {/* Text block */}
      <div style={{ flex: 1, minWidth: 0, position: 'relative', zIndex: 1 }}>
        {/* Category + badge row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
          <span style={{ color: `${color}cc`, fontSize: 8, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{cat}</span>
          <span style={{
            background: `${color}28`, border: `1px solid ${color}55`,
            borderRadius: 5, padding: '0px 4px',
            color, fontSize: 7, fontWeight: 800, letterSpacing: '0.03em',
          }}>{badge}</span>
        </div>
        {/* Name */}
        <div style={{
          color: 'rgba(255,255,255,0.92)', fontSize: 10, fontWeight: 700,
          lineHeight: 1.2, marginBottom: 4,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>{name}</div>
        {/* Price */}
        <div style={{ color, fontSize: 11, fontWeight: 900, lineHeight: 1 }}>{price}</div>
      </div>
    </div>
  );
}

function ShopMockup() {
  const CARD_W = 148 + 7; // card width + gap

  return (
    <div className="mt-7 mb-1 flex flex-col gap-[7px] overflow-hidden -mx-6">
      {/* Row 1 — scrolls left */}
      <motion.div
        className="flex gap-[7px] w-max pl-6"
        animate={{ x: [0, -(SHOP_ROW1.length * CARD_W)] }}
        transition={{ duration: 16, ease: 'linear', repeat: Infinity, repeatType: 'loop' }}
      >
        {[...SHOP_ROW1, ...SHOP_ROW1].map((item, i) => (
          <ShopCard key={i} {...item} />
        ))}
      </motion.div>

      {/* Row 2 — offset, slightly different speed */}
      <motion.div
        className="flex gap-[7px] w-max pl-6"
        initial={{ x: -(SHOP_ROW2.length * CARD_W * 0.4) }}
        animate={{ x: [
          -(SHOP_ROW2.length * CARD_W * 0.4),
          -(SHOP_ROW2.length * CARD_W * 0.4 + SHOP_ROW2.length * CARD_W),
        ]}}
        transition={{ duration: 19, ease: 'linear', repeat: Infinity, repeatType: 'loop' }}
      >
        {[...SHOP_ROW2, ...SHOP_ROW2].map((item, i) => (
          <ShopCard key={i} {...item} />
        ))}
      </motion.div>
    </div>
  );
}

// ─── Animated background ─────────────────────────────────────────────────────
const BG_ORBS = [
  { w: 500, h: 500, x: '-18%', y: '-5%',  color: 'rgba(41,100,255,0.28)',  dur: 12, dx: ['0%','12%','4%'], dy: ['0%','8%','2%']   },
  { w: 460, h: 460, x: '42%',  y: '30%',  color: 'rgba(150,20,255,0.26)',  dur: 10, dx: ['0%','-10%','-3%'], dy: ['0%','12%','5%'] },
  { w: 380, h: 380, x: '5%',   y: '55%',  color: 'rgba(0,180,255,0.20)',   dur: 14, dx: ['0%','8%','-4%'], dy: ['0%','-10%','3%'] },
];

const STARS = Array.from({ length: 55 }, (_, i) => ({
  id: i,
  top:  (i * 37 + 11) % 100,
  left: (i * 53 + 7)  % 100,
  size: i % 10 === 0 ? 2.5 : i % 4 === 0 ? 1.5 : 1,
  dur:  2 + (i % 5) * 0.8,
  delay:(i % 9) * 0.5,
  baseOp: 0.12 + (i % 5) * 0.08,
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
      {/* ── Orbs ── */}
      {BG_ORBS.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: orb.w, height: orb.h,
            left: orb.x, top: orb.y,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 68%)`,
            filter: 'blur(60px)',
          }}
          animate={{ x: orb.dx, y: orb.dy, scale: [1, 1.08, 0.95, 1] }}
          transition={{ duration: orb.dur, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
        />
      ))}

      {/* Bottom glow */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: '45%', background: 'radial-gradient(ellipse 80% 55% at 50% 115%, rgba(41,100,255,0.38) 0%, transparent 70%)' }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Stars */}
      {STARS.map(s => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{ top: `${s.top}%`, left: `${s.left}%`, width: s.size, height: s.size }}
          animate={{ opacity: [s.baseOp, s.baseOp * 4, s.baseOp] }}
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
        <div className="flex-1 flex flex-col justify-start pt-14 min-h-0">
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
              {/* Pills — above title */}
              <div className="flex flex-wrap justify-center gap-2 mb-8 -mt-6">
                {current.pills.map((pill, pi) => (
                  <div
                    key={pi}
                    className="inline-flex items-center rounded-full px-4 py-1.5"
                    style={{
                      background: 'rgba(255,255,255,0.10)',
                      border: '1px solid rgba(255,255,255,0.22)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      boxShadow: '0 4px 24px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.18)',
                    }}
                  >
                    <span className="text-white/80 text-[11px] font-semibold tracking-wide">{pill}</span>
                  </div>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-[42px] leading-[1.1] mb-5 text-center" style={{ overflowWrap: 'normal', wordBreak: 'keep-all', fontWeight: 900, hyphens: 'none', fontFamily: "'Unbounded', sans-serif", textShadow: '0 0 1px rgba(255,255,255,0.6)' }}>
                {current.title.map((seg, i) => {
                  if (seg.accent) {
                    return (
                      <span key={i} className="gradient-text" style={{ display: 'block', marginTop: '0.4rem' }}>
                        {seg.text.split('\n').map((part, pi, arr) => (
                          <span key={pi}>
                            {part}
                            {pi < arr.length - 1 && <br />}
                          </span>
                        ))}
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
                <p className="text-white/70 text-[19px] leading-snug text-center px-2" style={{ fontWeight: 300, letterSpacing: '0.01em', whiteSpace: 'pre-line' }}>{current.subtitle}</p>
              )}

              {/* Animated visual */}
              {slide === 0 && <ReelsMockup />}
              {slide === 1 && <ReferralMockup />}
              {slide === 2 && <ShopMockup />}

              {/* Text card below animation (slide 2) */}
              {slide === 2 && (
                <div
                  className="mx-1 mt-3"
                  style={{
                    borderRadius: 14,
                    padding: '11px 16px',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 2px 12px rgba(124,58,237,0.12), inset 0 1px 0 rgba(255,255,255,0.08)',
                  }}
                >
                  <div style={{
                    position: 'absolute', top: -16, right: -16,
                    width: 60, height: 60, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(124,58,237,0.35) 0%, transparent 70%)',
                    pointerEvents: 'none',
                  }} />
                  <p style={{
                    color: 'rgba(255,255,255,0.90)',
                    fontSize: 16,
                    fontWeight: 400,
                    lineHeight: 1.45,
                    textAlign: 'center',
                    margin: 0,
                    position: 'relative',
                    zIndex: 1,
                  }}>
                    Или держи токены до листинга, конвертируя их в реальные деньги.
                  </p>
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
            background: 'linear-gradient(90deg, #42A5F5 0%, #1E88E5 100%)',
            boxShadow: '0 4px 32px rgba(66,165,245,0.5)',
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
