import { Providers } from './providers/Providers';
import { AppRouter } from './routers/appRouter';

export const App = () => {
  return (
    <Providers>
      <AppRouter />
    </Providers>
  );
};

App.displayName = 'App';
