import { motion } from 'framer-motion';
import { ShoppingBag, ChevronRight, Tag, Utensils, Laptop, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Profit() {
  const categories = [
    { name: 'Все', active: true },
    { name: 'Еда', icon: <Utensils className="w-3 h-3" /> },
    { name: 'Мода', icon: <Tag className="w-3 h-3" /> },
    { name: 'Техника', icon: <Laptop className="w-3 h-3" /> },
  ];

  const offers = [
    { brand: 'Yandex Go', cashback: 'до 5%', desc: 'Кэшбэк на такси и доставку', color: 'from-yellow-500/20 to-yellow-600/5', icon: <Utensils className="w-8 h-8 text-yellow-500" /> },
    { brand: 'Ozon', cashback: 'до 7%', desc: 'Покупки в маркетплейсе', color: 'from-blue-500/20 to-blue-600/5', icon: <ShoppingBag className="w-8 h-8 text-blue-500" /> },
    { brand: 'Самокат', cashback: '10%', desc: 'Доставка продуктов', color: 'from-pink-500/20 to-pink-600/5', icon: <Utensils className="w-8 h-8 text-pink-500" /> },
    { brand: 'Lamoda', cashback: 'до 12%', desc: 'Одежда и обувь', color: 'from-purple-500/20 to-purple-600/5', icon: <Tag className="w-8 h-8 text-purple-500" /> },
  ];

  return (
    <div className="w-full h-full bg-[#050505] overflow-y-auto hide-scrollbar pb-28 text-white px-4">
      <div className="pt-12 pb-6">
        <h1 className="text-2xl font-display font-bold">Профит</h1>
        <p className="text-white/60 text-sm mt-1">Тратьте TRND с выгодой у партнеров</p>
      </div>

      {/* Featured Banner */}
      <div className="bg-gradient-to-r from-primary to-primary/60 rounded-3xl p-6 mb-6 relative overflow-hidden group">
        <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 blur-[30px] rounded-full pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold mb-3">
            <Sparkles className="w-3 h-3" /> Предложение недели
          </div>
          <h2 className="text-2xl font-display font-bold mb-1">Telegram Premium</h2>
          <p className="text-white/90 text-sm mb-4">Скидка 50% при оплате TRND</p>
          <button className="bg-white text-black font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-white/90 active:scale-95 transition-all">
            Использовать
          </button>
        </div>
        <div className="absolute -bottom-6 -right-6 text-[8rem] opacity-20 transform -rotate-12 pointer-events-none">
          ✈️
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 mb-6 overflow-x-auto hide-scrollbar -mx-4 px-4 pb-2">
        {categories.map((c) => (
          <button
            key={c.name}
            className={cn(
              "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
              c.active 
                ? "bg-white text-black" 
                : "bg-white/5 text-white/70 hover:bg-white/10 border border-white/5"
            )}
          >
            {c.icon} {c.name}
          </button>
        ))}
      </div>

      {/* Grid */}
      <h3 className="font-bold text-lg mb-4">Популярное</h3>
      {offers.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 mb-8">
          {offers.map((offer) => (
            <div key={offer.brand} className={cn("bg-gradient-to-b border border-white/5 rounded-3xl p-4 flex flex-col items-start relative overflow-hidden", offer.color)}>
              <div className="text-3xl mb-3 mt-1">{offer.icon}</div>
              <h4 className="font-bold mb-0.5">{offer.brand}</h4>
              <div className="text-primary font-bold text-lg mb-2">{offer.cashback}</div>
              <p className="text-white/50 text-xs mt-auto line-clamp-2">{offer.desc}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-[#111] border border-white/5 rounded-3xl p-8 flex flex-col items-center text-center mt-4">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
            <ShoppingBag className="w-8 h-8 text-white/30" />
          </div>
          <h4 className="font-bold text-lg mb-2">Скоро здесь появятся офферы...</h4>
          <p className="text-white/50 text-sm">Мы активно подключаем новые бренды, чтобы вы могли тратить токены с пользой.</p>
        </div>
      )}
    </div>
  );
}