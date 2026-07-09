import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';

import Feed from '@/pages/Feed';
import Tokens from '@/pages/Tokens';
import Profit from '@/pages/Profit';
import Profile from '@/pages/Profile';
import Settings from '@/pages/Settings';
import Upload from '@/pages/Upload';
import { MobileFrame } from '@/components/layout/MobileFrame';
import { TokenEarnAnimation } from '@/components/shared/TokenEarnAnimation';
import { Onboarding, DailyCheckin } from '@/components/modals/Modals';

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
