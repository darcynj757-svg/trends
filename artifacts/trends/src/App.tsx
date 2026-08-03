import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';

import Feed from '@/pages/Feed';
import Tokens from '@/pages/Tokens';
import Profit from '@/pages/Profit';
import Profile from '@/pages/Profile';
import Settings from '@/pages/Settings';
import Upload from '@/pages/Upload';
import { MobileFrame } from '@/components/layout/MobileFrame';
import { TokenEarnAnimation } from '@/components/shared/TokenEarnAnimation';
import { Onboarding, DailyCheckin, TokensOnboarding } from '@/components/modals/Modals';
import { AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

function TokensOnboardingGate() {
  const [, navigate] = useLocation();
  const { showTokensOnboarding, setShowTokensOnboarding, setHasSeenTokensOnboarding } = useStore();

  if (!showTokensOnboarding) return null;

  return (
    <AnimatePresence>
      <TokensOnboarding
        onClose={() => {
          setShowTokensOnboarding(false);
          setHasSeenTokensOnboarding(true);
          navigate('/tokens');
        }}
      />
    </AnimatePresence>
  );
}

function Router() {
  return (
    <MobileFrame>
      <Switch>
        <Route path="/" component={Feed} />
        <Route path="/tokens" component={Tokens} />
        <Route path="/profit" component={Profit} />
        <Route path="/profile" component={Profile} />
        <Route path="/u/:handle" component={Profile} />
        <Route path="/settings" component={Settings} />
        <Route path="/upload" component={Upload} />
        <Route component={NotFound} />
      </Switch>
      
      {/* Global Overlays */}
      <TokenEarnAnimation />
      <DailyCheckin />
      <Onboarding />
      <TokensOnboardingGate />
    </MobileFrame>
  );
}

function App() {
  return (
    <TooltipProvider>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <Router />
      </WouterRouter>
      <Toaster />
    </TooltipProvider>
  );
}

export default App;
