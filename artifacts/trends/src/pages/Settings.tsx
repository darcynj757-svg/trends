import { ChevronLeft, Info, ExternalLink, Trash2 } from 'lucide-react';
import { Link } from 'wouter';

export default function Settings() {
  return (
    <div className="w-full h-full bg-[#050505] overflow-y-auto hide-scrollbar text-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 px-4 h-14 flex items-center gap-3">
        <Link href="/profile">
          <button className="w-8 h-8 flex items-center justify-center -ml-2 rounded-full hover:bg-white/10 active:scale-95 transition-all">
            <ChevronLeft className="w-6 h-6" />
          </button>
        </Link>
        <h1 className="font-bold text-lg">Настройки</h1>
      </div>

      <div className="p-4 space-y-6 pb-12">
        {/* Account Info */}
        <div className="bg-[#111] rounded-2xl p-4 border border-white/5">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-xl">🇷🇺</div>
            <div>
              <h2 className="font-bold">Мой профиль</h2>
              <p className="text-white/50 text-sm">Россия, Москва</p>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div>
          <h3 className="text-sm font-bold text-white/50 px-2 mb-2 uppercase tracking-wider">Поддержка</h3>
          <div className="bg-[#111] rounded-2xl border border-white/5 overflow-hidden">
            <SettingRow icon={<Info className="w-5 h-5 text-white/70" />} label="Для сотрудничества" />
            <div className="h-[1px] bg-white/5 ml-12" />
            <SettingRow icon={<ExternalLink className="w-5 h-5 text-white/70" />} label="Сообщить о проблеме" />
          </div>
        </div>

        {/* Legal Section */}
        <div>
          <h3 className="text-sm font-bold text-white/50 px-2 mb-2 uppercase tracking-wider">Правовая информация</h3>
          <div className="bg-[#111] rounded-2xl border border-white/5 overflow-hidden">
            <SettingRow label="Политика конфиденциальности" />
            <div className="h-[1px] bg-white/5 ml-4" />
            <SettingRow label="Условия использования" />
            <div className="h-[1px] bg-white/5 ml-4" />
            <SettingRow label="Защита авторских прав (DMCA)" />
          </div>
        </div>

        {/* Footer info */}
        <div className="px-2 pt-4 flex flex-col items-center text-center">
          <p className="text-white/30 text-xs mb-1">ID аккаунта: 288113313</p>
          <p className="text-white/30 text-xs mb-6">Версия: 1.0.0</p>
          
          <button className="flex items-center gap-2 text-destructive font-semibold hover:text-destructive/80 transition-colors bg-destructive/10 px-6 py-3 rounded-2xl active:scale-95">
            <Trash2 className="w-5 h-5" /> Удалить аккаунт
          </button>
        </div>
      </div>
    </div>
  );
}

function SettingRow({ icon, label }: { icon?: React.ReactNode, label: string }) {
  return (
    <button className="w-full flex items-center gap-3 p-4 hover:bg-white/5 transition-colors text-left active:bg-white/10">
      {icon && <div className="shrink-0">{icon}</div>}
      <span className="font-medium flex-1">{label}</span>
      <ChevronLeft className="w-5 h-5 text-white/30 rotate-180 shrink-0" />
    </button>
  );
}