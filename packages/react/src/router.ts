import { renderRoutes, RouteConfig } from 'react-router-config';
import React from 'react';
const routes = [
  {
    path: '/',
    name: 'home',
    exact: true,
    component: React.lazy(() => import('./views/home'))
  },
  {
    path: '/test',
    name: 'home',
    exact: true,
    component: React.lazy(() => import('./views/test'))
  },
]

export default renderRoutes(routes)
