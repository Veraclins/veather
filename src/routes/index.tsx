import { lazy } from 'react';

const Cities = lazy(
  () => import('pages/Cities' /* webpackChunkName: "home" */)
);

const City = lazy(
  () => import('pages/City' /* webpackChunkName: "single-city" */)
);
const Current = lazy(
  () => import('pages/Current' /* webpackChunkName: "current-city" */)
);

const routes = [
  {
    path: '/cities/current',
    component: Current,
  },
  {
    path: '/cities/:city_id',
    component: City,
  },
  {
    path: '/cities',
    component: Cities,
  },
];

export default routes;
