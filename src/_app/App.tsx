import { StrictMode } from 'react';
import { Providers } from './providers/Providers';
import { AppRouter } from './routers/appRouter';

const App = () => {
  return (
    <StrictMode>
      <Providers>
        <AppRouter />
      </Providers>
    </StrictMode>
  );
};

App.displayName = 'App';

export default App;
