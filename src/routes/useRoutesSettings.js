import { matchPath, useLocation } from 'react-router-dom';
import { getPrivateRoutes } from './index';

const useRoutesSettings = () => {
  const location = useLocation();

  const getRoutes = () => {
    let _routes = [];
    const createRoutes = (routes, parentRoute) => {
      for (let route of routes) {
        if (route.path) {
          const pattern = parentRoute
            ? parentRoute + '/' + route.path
            : route.path;
          if (matchPath(pattern, location.pathname)) {
            _routes.push(route.settings ?? {});
          }
        }
        if (Array.isArray(route.innerRoutes)) {
          createRoutes(route.innerRoutes, route.path);
        }
      }
    };
    createRoutes(getPrivateRoutes());
    if (_routes.length) {
      return _routes[0];
    }
    return {};
  };

  return getRoutes();
};

export default useRoutesSettings;
