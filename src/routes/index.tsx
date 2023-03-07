import ErrorBoundary from '@/components/ErrorBoundary';
import { lazy, Suspense } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import Layout from '@/pages/layout';
import { requestData } from '@/store/globalStore';

const Home = lazy(() => import('@/pages/home'));
const List = lazy(() => import('@/pages/list'));
const NoFind = lazy(() => import('@/pages/noFind'));
const NoPermission = lazy(() => import('@/pages/noPermission'));

const lazyLoad = (Component: any) => {
  return (
    <Suspense fallback={<div>页面加载中...</div>}>
      <Component />
    </Suspense>
  );
};

export type RouteOther = {
  redirect?: string;
  // 用来判断权限
  code?: string;
  children?: RouteType[];
};

export type RouteType = RouteObject & RouteOther;

export const routesConfig: RouteType[] = [
  {
    path: '/',
    element: <Navigate to="/home" />,
  },
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    loader: () => {
      console.log('loader...');
      return requestData();
    },
    children: [
      {
        path: '/home',
        element: lazyLoad(Home),
        code: 'home',
        loader: () => {
          console.log('loader...');
          return requestData();
        },
      },
      {
        path: '/list',
        element: lazyLoad(List),
        code: 'list',
      },
      {
        path: '/403',
        element: lazyLoad(NoPermission),
      },
      {
        path: '/404',
        element: lazyLoad(NoFind),
      },
    ],
  },
  {
    path: '*',
    element: lazyLoad(NoFind),
  },
];

// export const routers = createBrowserRouter(routesConfig);
