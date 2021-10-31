import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import routes from 'routes';
import NotFoundPage from 'pages/NotFoundPage';
import WeatherProvider from 'context/WeatherProvider';
import Layout from 'components/Layout';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <WeatherProvider>
        <Suspense fallback={<div>Please wait...</div>}>
          <Layout>
            <Switch>
              {routes.map(({ path, component }, index) => (
                <Route component={component} path={path} key={index} exact />
              ))}
              <Route component={NotFoundPage} />
            </Switch>
          </Layout>
        </Suspense>
      </WeatherProvider>
    </BrowserRouter>
  );
};

export default App;
