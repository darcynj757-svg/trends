import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';
import { Shield, UserPlus, Play, CheckCircle, ChevronRight, Gift, Copy, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export default function Tokens() {
  const { user, transactions } = useStore();
  const { toast } = useToast();

  const handleCopy = () => {
    toast({
      title: "Ссылка скопирована",
      description: "Отправьте её друзьям, чтобы получить бонус",
    });
  };

  return (
    <div className="w-full h-full bg-[#050505] overflow-y-auto hide-scrollbar pb-28 text-white">
      {/* Header Section */}
      <div className="relative px-4 pt-12 pb-8 bg-gradient-to-b from-primary/10 to-transparent">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-display font-bold">Ваш баланс</h1>
          <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 active:scale-95 transition-transform">
            <Bell className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex flex-col items-center justify-center">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-[4rem] font-display font-bold leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70"
          >
            {user.balance.toLocaleString('ru-RU')}
          </motion.div>
          <div className="text-accent font-medium mt-2 flex items-center gap-1.5 text-sm bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
            <span>🔥</span> +121 TRND за сегодня
          </div>
        </div>
      </div>

      <div className="px-4 space-y-4">
        {/* Invite Card */}
        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border border-white/5 rounded-3xl p-5 relative overflow-hidden group">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/20 blur-[50px] rounded-full pointer-events-none group-hover:bg-primary/30 transition-colors" />
          
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div>
              <h3 className="font-bold text-lg">Пригласить друга</h3>
              <p className="text-white/60 text-sm mt-0.5">+13 000 TRND за активного</p>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-2xl font-display font-bold text-white">0</div>
              <div className="text-[10px] text-white/50 uppercase tracking-wider font-semibold">Приглашено</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 relative z-10">
            <button 
              onClick={handleCopy}
              className="flex-1 bg-white text-black font-semibold py-3.5 rounded-2xl hover:bg-white/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              Поделиться ссылкой <UserPlus className="w-4 h-4" />
            </button>
            <button 
              onClick={handleCopy}
              className="w-14 h-[52px] bg-white/10 hover:bg-white/15 rounded-2xl flex items-center justify-center active:scale-[0.98] transition-all border border-white/5"
            >
              <Copy className="w-5 h-5 text-white/80" />
            </button>
          </div>
        </div>

        {/* Activity Section */}
        <h2 className="text-lg font-bold mt-8 mb-4 px-1">Активность</h2>
        <div className="grid grid-cols-1 gap-3">
          <ActivityCard 
            icon={<Play className="w-5 h-5" />} 
            title="Просмотр видео" 
            reward="1–20 TRND" 
            desc="Зависит от досмотра, до 500 видео/день"
            color="bg-blue-500/10 text-blue-500"
          />
          <ActivityCard 
            icon={<span className="text-xl">🔥</span>} 
            title="Ежедневный стрик" 
            reward="30–150 TRND" 
            desc="30-дневный цикл, растёт с серией"
            color="bg-accent/10 text-accent"
          />
          <ActivityCard 
            icon={<UserPlus className="w-5 h-5" />} 
            title="Приглашение друга" 
            reward="+13 000 TRND" 
            desc="10% сразу, 90% когда друг заполнит профиль"
            color="bg-purple-500/10 text-purple-500"
          />
          <ActivityCard 
            icon={<CheckCircle className="w-5 h-5" />} 
            title="Цифровизация профиля" 
            reward="+1 000 TRND" 
            desc="один раз за верификацию"
            color="bg-green-500/10 text-green-500"
            done
          />
        </div>

        {/* Streak Info */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-[#111] border border-white/5 rounded-3xl p-4">
            <div className="text-2xl font-bold font-display mb-1 text-accent">9 дней 🔥</div>
            <p className="text-white/60 text-xs mb-3">Текущий стрик</p>
            <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden relative">
              <div className="absolute top-0 left-0 bg-gradient-to-r from-accent/50 to-accent h-full rounded-full z-10 w-[30%]" />
              {[10, 20, 30].map(day => (
                <div key={day} className="absolute top-0 w-0.5 h-full bg-black/50 z-20" style={{ left: `${(day/30)*100}%` }} />
              ))}
            </div>
            <div className="flex justify-between text-[8px] text-white/40 mt-1 font-bold">
              <span>0</span>
              <span>10</span>
              <span>20</span>
              <span>30</span>
            </div>
          </div>
          
          <div className="bg-[#111] border border-white/5 rounded-3xl p-4 flex flex-col justify-between">
            <div>
              <div className="font-bold flex items-center gap-1.5"><Shield className="w-4 h-4 text-primary" /> Защита серии</div>
              <p className="text-white/60 text-xs mt-1">На 24 часа</p>
            </div>
            <button className="w-full mt-3 bg-white/10 hover:bg-white/20 active:bg-white/30 text-xs font-semibold py-2 rounded-xl transition-colors">
              500 TRND
            </button>
          </div>
        </div>

        {/* Friends Section */}
        <h2 className="text-lg font-bold mt-8 mb-4 px-1">Друзья</h2>
        <div className="bg-[#111] border border-white/5 rounded-3xl p-6 flex flex-col items-center text-center mb-4">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
            <UserPlus className="w-8 h-8 text-white/30" />
          </div>
          <p className="text-white/60 text-sm mb-4">Пригласите друзей по ссылке и получайте +13 000 TRND за каждого</p>
          <button 
            onClick={handleCopy}
            className="bg-white/10 hover:bg-white/15 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors"
          >
            Пригласить
          </button>
        </div>

        {/* History */}
        <h2 className="text-lg font-bold mt-8 mb-4 px-1 flex justify-between items-end">
          История
          <span className="text-xs font-medium text-white/50 mb-0.5">Все</span>
        </h2>
        <div className="bg-[#111] border border-white/5 rounded-3xl p-2 mb-8">
          {transactions.map((t, i) => (
            <div key={t.id} className={cn("flex items-center justify-between p-3", i !== transactions.length - 1 && "border-b border-white/5")}>
              <div className="flex items-center gap-3">
                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-lg bg-black border border-white/5", t.type === 'earn' ? 'text-green-500' : 'text-white/60')}>
                  {t.type === 'earn' ? '+' : '-'}
                </div>
                <div>
                  <p className="text-sm font-medium">{t.reason}</p>
                  <p className="text-xs text-white/40">{new Date(t.date).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              </div>
              <div className={cn("font-semibold font-display", t.type === 'earn' ? 'text-white' : 'text-white/50')}>
                {t.type === 'earn' ? '+' : '-'}{t.amount}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ActivityCard({ icon, title, reward, desc, color, done }: any) {
  return (
    <div className="bg-[#111] border border-white/5 rounded-2xl p-4 flex items-center gap-4 active:scale-[0.98] transition-transform cursor-pointer">
      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0", color)}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-sm truncate">{title}</h4>
        <p className="text-white/50 text-xs truncate mt-0.5">{desc}</p>
      </div>
      <div className="text-right shrink-0">
        <div className={cn("font-bold text-sm", done ? "text-white/40 line-through" : "text-white")}>{reward}</div>
        {done && <div className="text-xs text-green-500 font-medium mt-0.5 flex justify-end"><CheckCircle className="w-3 h-3" /></div>}
      </div>
    </div>
  );
}