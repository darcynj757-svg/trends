import { ChevronLeft, Upload as UploadIcon, Send, Link as LinkIcon, Plus } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';

export default function Upload() {
  const [, setLocation] = useLocation();

  return (
    <div className="w-full h-full bg-[#050505] overflow-y-auto hide-scrollbar text-white flex flex-col relative z-50">
      <div className="sticky top-0 z-10 bg-[#050505]/90 backdrop-blur-xl border-b border-white/5 px-4 h-14 flex items-center gap-3">
        <button 
          onClick={() => setLocation('/')}
          className="w-8 h-8 flex items-center justify-center -ml-2 rounded-full hover:bg-white/10 active:scale-95 transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="font-bold text-lg">Как загрузить видео</h1>
      </div>

      <div className="p-4 space-y-4 pt-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-[#111] to-[#1a1a1a] border border-white/10 rounded-3xl p-5"
        >
          <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center mb-4">
            <UploadIcon className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-bold text-xl mb-1">Через Miniapp</h3>
          <p className="text-white/60 text-sm mb-4">Выберите файл из галереи и загрузите напрямую</p>
          <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-2xl active:scale-[0.98] transition-all">
            Загрузить
          </button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#111] border border-white/5 rounded-3xl p-5"
        >
          <div className="w-12 h-12 bg-[#2AABEE]/20 rounded-2xl flex items-center justify-center mb-4">
            <Send className="w-6 h-6 text-[#2AABEE] -ml-1 mt-0.5" />
          </div>
          <h3 className="font-bold text-xl mb-1">Через бота Trends</h3>
          <p className="text-white/60 text-sm mb-4">Отправьте видео нашему боту, и он опубликует его за вас</p>
          <button className="w-full bg-white/10 hover:bg-white/15 text-white font-semibold py-3.5 rounded-2xl active:scale-[0.98] transition-all">
            Перейти в бота
          </button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#111] border border-white/5 rounded-3xl p-5"
        >
          <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-4">
            <LinkIcon className="w-6 h-6 text-purple-500" />
          </div>
          <h3 className="font-bold text-xl mb-1">Автоматически из вашего канала</h3>
          <p className="text-white/60 text-sm mb-4">Привяжите канал, и мы будем публиковать видео из него</p>
          <button className="w-full bg-white/10 hover:bg-white/15 text-white font-semibold py-3.5 rounded-2xl active:scale-[0.98] transition-all flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" /> Добавить канал
          </button>
        </motion.div>
      </div>
    </div>
  );
}