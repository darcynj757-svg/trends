import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface FloatingTokenEvent {
  id: string;
  amount: number;
}

export const TokenEarnAnimation = () => {
  const [events, setEvents] = useState<FloatingTokenEvent[]>([]);

  // We can expose a global window method to trigger this for simplicity in prototype
  useEffect(() => {
    (window as any).triggerTokenEarn = (amount: number) => {
      const id = Math.random().toString(36).substring(7);
      setEvents((prev) => [...prev, { id, amount }]);
      
      // Cleanup after animation
      setTimeout(() => {
        setEvents((prev) => prev.filter(e => e.id !== id));
      }, 2000);
    };

    return () => {
      delete (window as any).triggerTokenEarn;
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center">
      <AnimatePresence>
        {events.map((event) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 0, scale: 0.5 }}
            animate={{ 
              opacity: [0, 1, 1, 0], 
              y: -150,
              scale: [0.5, 1.2, 1, 0.8] 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute font-display font-bold text-3xl text-[#FFA500] drop-shadow-[0_0_15px_rgba(255,165,0,0.8)] flex items-center gap-2"
          >
            <span>+{event.amount} TRND</span>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, ease: "linear" }}
              className="text-2xl"
            >
              🔥
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
