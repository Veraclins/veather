import { lazy } from 'react';

const Home = lazy(() => import('pages/Cities' /* webpackChunkName: "home" */));

const City = lazy(
  () => import('pages/City' /* webpackChunkName: "single-city" */)
);

const routes = [
  {
    path: '/cities/:city_id',
    component: City,
  },
  {
    path: '/',
    component: Home,
  },
];

export default routes;
