import { Route, Routes, useLocation } from 'react-router-dom';
import { routesConfig } from './routes';
import type { RouteType } from './routes';
// import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './index.css';

import Permission from '@/components/Permission';
import { useLayoutEffect } from 'react';
import { useStore } from './store';

const App = () => {
  const { requestUserInfo } = useStore();
  const location = useLocation();

  useLayoutEffect(() => {
    requestUserInfo();
  }, []);

  const renderRoutes = (routes: RouteType[]) => {
    return routes.map((item, index) => {
      if (item.element) {
        return (
          <Route
            key={index}
            path={item.path}
            loader={item.loader}
            element={
              ['*', '/'].includes(item.path!) ? (
                item.element
              ) : (
                <Permission code={item.code}>{item.element}</Permission>
              )
            }
          >
            {item.children ? renderRoutes(item.children) : null}
          </Route>
        );
      }
    });
  };

  return (
    // <TransitionGroup component={null}>
    //   <CSSTransition key={location.key} classNames="fade" timeout={300}>
    <Routes location={location}>{renderRoutes(routesConfig)}</Routes>
    // </CSSTransition>
    // </TransitionGroup>
  );
};

export default App;
