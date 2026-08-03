import { TooltipProvider } from '@/components/ui/tooltip';
import { Router as WouterRouter } from 'wouter';
import { MobileFrame } from '@/components/layout/MobileFrame';
import { TokensOnboarding } from '@/components/modals/Modals';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';

function App() {
  const [key, setKey] = useState(0);

  return (
    <TooltipProvider>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <MobileFrame>
          <AnimatePresence>
            <TokensOnboarding key={key} onClose={() => setKey(k => k + 1)} />
          </AnimatePresence>
        </MobileFrame>
      </WouterRouter>
    </TooltipProvider>
  );
}

export default App;
