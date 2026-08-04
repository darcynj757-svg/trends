import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch } from 'wouter';
import { Router as WouterRouter, useLocation } from 'wouter';
import { MobileFrame } from '@/components/layout/MobileFrame';
import { BottomNav } from '@/components/layout/BottomNav';
import { TokensOnboarding } from '@/components/modals/Modals';
import { AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import Feed from '@/pages/Feed';
import Tokens from '@/pages/Tokens';
import Profit from '@/pages/Profit';
import Upload from '@/pages/Upload';
import Profile from '@/pages/Profile';
import NotFound from '@/pages/not-found';

function AppRoutes() {
  const { hasSeenTokensOnboarding, setShowBalanceHighlight } = useStore();
  const [, navigate] = useLocation();

  const handleOnboardingClose = () => {
    navigate('/');
    setShowBalanceHighlight(true);
    setTimeout(() => setShowBalanceHighlight(false), 3500);
  };

  return (
    <>
      <Switch>
        <Route path="/" component={Feed} />
        <Route path="/tokens" component={Tokens} />
        <Route path="/profit" component={Profit} />
        <Route path="/upload" component={Upload} />
        <Route path="/profile" component={Profile} />
        <Route component={NotFound} />
      </Switch>
      <BottomNav />
      <AnimatePresence>
        {!hasSeenTokensOnboarding && (
          <TokensOnboarding key="onboarding" onClose={handleOnboardingClose} />
        )}
      </AnimatePresence>
    </>
  );
}

function App() {
  return (
    <TooltipProvider>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <MobileFrame>
          <AppRoutes />
        </MobileFrame>
      </WouterRouter>
    </TooltipProvider>
  );
}

export default App;
