import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EditProfileModal({ isOpen, onClose }: EditProfileModalProps) {
  const { user, updateProfile } = useStore();
  const [bio, setBio] = useState(user.bio);
  
  const handleSave = () => {
    updateProfile({ bio });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 z-40 bg-black/80 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute bottom-0 left-0 w-full z-50 bg-[#111] border-t border-white/10 rounded-t-3xl flex flex-col"
            style={{ maxHeight: '90%' }}
          >
            {/* Handle area */}
            <div className="w-full pt-4 pb-2 flex justify-center">
              <div className="w-12 h-1.5 bg-white/20 rounded-full" />
            </div>
            
            <div className="px-4 pb-4 flex items-center justify-between border-b border-white/5">
              <h2 className="text-lg font-bold">Описание и фото профиля</h2>
              <button onClick={onClose} className="p-2 -mr-2 bg-white/5 rounded-full hover:bg-white/10 active:scale-95 transition-transform">
                <X className="w-5 h-5 text-white/70" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto">
              <div className="flex flex-col items-center mb-8 pt-4">
                <div className="relative group cursor-pointer">
                  <img src={user.avatar} alt="Avatar" className="w-24 h-24 rounded-full border-2 border-white/10 object-cover" />
                  <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                </div>
                <button className="text-primary text-sm font-semibold mt-3 hover:text-primary/80 transition-colors">
                  Изменить фото профиля
                </button>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-white/70 mb-2">Описание профиля</label>
                <div className="relative">
                  <textarea 
                    value={bio}
                    onChange={(e) => setBio(e.target.value.slice(0, 500))}
                    className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none h-32"
                    placeholder="Расскажите о себе..."
                  />
                  <div className={cn(
                    "absolute bottom-3 right-4 text-xs font-medium",
                    bio.length >= 500 ? "text-destructive" : "text-white/40"
                  )}>
                    {bio.length}/500
                  </div>
                </div>
              </div>

              <button 
                onClick={handleSave}
                className="w-full bg-white text-black hover:bg-white/90 font-bold py-4 rounded-2xl active:scale-[0.98] transition-all"
              >
                Сохранить
              </button>
              <div className="h-safe-bottom" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}