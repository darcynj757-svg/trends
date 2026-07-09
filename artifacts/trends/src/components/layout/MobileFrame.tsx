import React from 'react';
import { BottomNav } from './BottomNav';
import { useLocation } from 'wouter';

export function MobileFrame({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const hideNav = location === '/upload'; // Hide nav on specific modals

  return (
    <div className="min-h-[100dvh] w-full bg-[#050505] flex items-center justify-center overflow-hidden">
      <div className="relative w-full h-[100dvh] sm:h-[844px] sm:w-[390px] sm:rounded-[3rem] sm:border-[8px] border-[#1a1a1a] overflow-hidden bg-black shadow-2xl">
        <main className="h-full w-full overflow-y-auto overflow-x-hidden hide-scrollbar relative">
          {children}
        </main>
        {!hideNav && <BottomNav />}
      </div>
    </div>
  );
}
