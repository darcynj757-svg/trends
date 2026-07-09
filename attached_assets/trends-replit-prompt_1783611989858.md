# Replit Agent Prompt — "Trends" (Telegram Mini App: Reels + Attention Economy)

Copy everything below into Replit Agent.

---

Build a **mobile-first web app prototype** of "Trends" — a Telegram Mini App that works like Reels/TikTok inside Telegram, with an **attention economy**: users earn TRND tokens for watching videos, daily streaks, and inviting friends. Tokens will later be exchangeable for money (after listing) or for discounts/promo codes inside the app.

This is a **redesign/improvement** of an existing v1.0 app. Keep the overall structure and dark aesthetic, but raise the design quality: better hierarchy, micro-animations, clearer token feedback, polished empty states.

## Tech stack

- React + Vite, Tailwind CSS, framer-motion for animations
- Mobile-only viewport (max-width 430px, centered on desktop with a phone-frame feel)
- All data mocked in a local store (Zustand or React context) — no backend needed yet
- Structure components so screens can later be wired to a real API and Telegram WebApp SDK (`window.Telegram.WebApp`)
- **All UI copy must be in Russian** (this is a Russian-language product). Use the exact strings provided below.

## Design system

- Theme: deep black background (#0A0A0A), cards #161616–#1C1C1C with a subtle 1px gradient border (top-lit look), 20–24px corner radius
- Accent: Telegram-blue (#4B7BF5) for primary actions; white pill buttons for secondary CTAs; fire 🔥 and TRND-token motifs for the economy
- Typography: bold geometric sans for headings/numbers (big token balances are a key visual), regular for body; token amounts always formatted like "+13 000 TRND"
- Signature element: the **TRND token counter** — whenever tokens are earned, the balance animates (count-up + small coin/fire particle burst). This should feel like the soul of the app.
- Bottom navigation bar (floating pill, blur background), 5 items: Лента, Токены, [+] (center, elevated), Профит, Профиль

## Screens to build (8 total)

### 1. Лента (Feed) — default screen
- Full-screen vertical video feed (mock with looping muted videos or gradient placeholders + play button)
- Top tabs: "Тренды" / "Для вас" (active tab underlined); pull-down chevron reveals category chips: Авто и мото, Новости и СМИ, Блогинг, Крипто, Юмор…
- Right action rail: like ♥, comments 💬, share ✈, bookmark 🔖 — each with counter
- Bottom overlay: author avatar + name + "Подписаться" button, category tags, caption, progress bar with current/total time (e.g. 0:47 / 0:56)
- **Improvement:** a small floating "+2 TRND" toast that pops when a video is watched to the end (reward-per-view feedback), and a thin "earning" ring around the [+] nav button while watching

### 2. Токены (Tokens / Earnings hub)
- Hero: user photo background, name "Миша Зевс", @misha_zeus, big TRND balance "9K", "+121 🔥 за сегодня"
- Invite card: "Пригласить друга — +13 000 TRND за активного друга", counter of invited friends, white button "Поделиться ссылкой"
- Section "АКТИВНОСТЬ" — earning methods as cards with icon, title, subtitle, reward:
  - Просмотр видео — "зависит от досмотра, до 500 видео/день" — 1–20 TRND
  - Ежедневный стрик — "30-дневный цикл, растёт с серией" — 30–150 TRND
  - Приглашение друга — "10% сразу, 90% когда друг заполнит профиль" — +13 000 TRND
  - Цифровизация профиля — "один раз за верификацию" — +1 000 TRND
- Streak card: "Стрик 9 дней 🔥 — Продолжай — завтра больше токенов" → **improvement: add a 30-day progress bar with milestone markers**
- Streak protection: "Защита серии 🛡 — Пропустишь день — серия не сбросится. 500 TRND, 24ч." with a "500 TRND" buy pill
- Section "ДРУЗЬЯ": empty state → "Пригласите друзей по ссылке и получайте +13 000 TRND за каждого" + button
- **Improvement:** add a compact "История начислений" (last 5 transactions) list at the bottom

### 3. Профит (Cashback offers)
- Header on profile hero: "Кэшбэк-офферы — Покупай у партнёров через Trends и получай TRND"
- Current state is an empty screen ("Скоро здесь появятся офферы 🛍 — Мы подключаем партнёров — кэшбэк за покупки будет начисляться в TRND")
- **Improvement:** design the full version with 4–6 mock partner cards (logo, brand, "до 7% кэшбэка в TRND", category chips: Еда, Мода, Техника, Подписки) plus a featured offer banner — and keep a nice empty state as a fallback component

### 4. Профиль (own profile)
- Hero photo, name + 🥇 medal + blue verified badge, @handle, link "Открывается по умолчанию"
- Stats row: Trends (videos) / Смотрят / Лайки
- Buttons: ✏️ edit, "Страница Trends" (external), blue "Добавить канал"
- White CTA: "▶ Добавить видео в ленту"
- Segmented tabs: "Опубликовано" / "На проверке · 1", then 3-column video grid (empty placeholders ok)
- **Improvement:** show TRND balance chip at top; better empty grid state ("Загрузите первое видео — за него начислим бонус")

### 5. Публичный профиль (other user's view)
- Same hero + stats, but buttons: "👁 Отслеживать" and blue "✈ Написать" (opens Telegram chat), share icon top-right, video grid below

### 6. Редактирование профиля (bottom sheet)
- Title "Описание и фото профиля", hint "Видно на твоей Странице Trends и при шеринге профиля"
- Avatar + "Изменить фото профиля" button, textarea "Описание профиля" with 0/500 counter, white "Сохранить" button

### 7. Загрузка видео — modal "Как загрузить видео" (opens from [+])
Three option cards:
1. **Через Miniapp** (blue upload icon) — "Выбирайте, если хотите загрузить видео в высоком качестве длительностью от 2,5 минут" → blue button "Загрузить"
2. **Через бота Trends** (Telegram icon) — "Самый быстрый способ. Подходит для: записи кружочков (видеосообщений); пересылки постов с медиа из телеграм-каналов; моментальной загрузки без лишних шагов" → button "Перейти в бота"
3. **Автоматически из вашего канала** (+ icon) — "Подключите канал и добавьте бота Trends в администраторы — и все новые видео из канала будут автоматически появляться в ленте Trends" → button "Добавить канал"

### 8. Настройки
- "Мой профиль — Россия, Москва" (green check), groups: "Для сотрудничества", "Сообщить о проблеме"; "Политика конфиденциальности", "Условия использования", "Защита авторских прав (DMCA)"
- Footer: "ID аккаунта: 288113313", "Версия: 1.0.0", link "Удалить аккаунт"

## Extra improvements to include (new vs. v1)

1. **Onboarding (3 slides)** on first launch: "Смотри Reels в Telegram" → "Зарабатывай TRND за внимание" → "Обменяй на деньги и скидки" with a "Начать" button
2. **Token earn animation**: reusable component — coin flies to the balance, count-up number
3. **Daily check-in moment**: when opening the app, a small sheet "День 10 🔥 +45 TRND" celebrating the streak
4. Haptic-style micro-interactions (scale on press), skeleton loaders, and dark-theme-safe contrast throughout

## Deliverable

A running SPA with client-side routing between all screens, mock user "Миша Зевс" (balance 9 000 TRND, streak 9 days), and clean component structure: `/components/ui`, `/screens`, `/store`. Start with the Feed screen as the entry point.
