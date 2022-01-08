import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import routes from 'routes';
import NotFoundPage from 'pages/NotFoundPage';
import Layout from 'components/Layout';

import { WeatherReport } from 'helpers/Store';
import WeatherProvider from 'context/WeatherProvider';

const App: React.FC<{ cached: WeatherReport[] }> = ({ cached }) => {
  return (
    <BrowserRouter>
      <WeatherProvider cached={cached}>
        <Layout>
          <Suspense fallback={<div>Please wait...</div>}>
            <Switch>
              {routes.map(({ path, component }, index) => (
                <Route component={component} path={path} key={index} exact />
              ))}
              <Route path="/" exact>
                <Redirect to="/cities" />
              </Route>
              <Route component={NotFoundPage} />
            </Switch>
          </Suspense>
        </Layout>
      </WeatherProvider>
    </BrowserRouter>
  );
};

export default App;
