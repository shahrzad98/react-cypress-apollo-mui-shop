import React, { useEffect, useMemo } from 'react';
import { hotjar } from 'react-hotjar';
import { Route, Routes, useLocation } from 'react-router-dom';
import { getModalRoutes, getPrivateRoutes, getPublicRoutes } from '../routes';
import '../static/fonts/icons/style.scss';
import '../static/styles/components/_loadings.scss';
import PrivateRoute from './authentication/PrivateRoute';
import PublicRoute from './authentication/PublicRoute';
import Layout from './Layout';
import FallbackLoading from './shared/FallbackLoading';
import BigPictureModalPage from './modals/BigPictureModalPage';
import ExpirePackageModal from './modals/ExpirePackageModal';

const App = () => {
  const location = useLocation();
  const { state } = location;
  useEffect(() => {
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = 'fb18dcfc-9d65-4898-b956-6cf1e2134933';
    (() => {
      const d = document;
      const s = d.createElement('script');
      s.src = 'https://client.crisp.chat/l.js';
      s.async = 1;
      d.getElementsByTagName('body')[0].appendChild(s);
    })();
  }, []);
  useEffect(() => {
    hotjar.initialize(
      process.env.NODE_ENV === 'production' ? 3244613 : 3133052,
      6
    );
  }, []);

  const handleRenderRoutes = (routes, authRequired = false, isModal = false) =>
    routes.map(({ path, index, innerRoutes, element: Element }, key) => (
      <Route
        index={!!index}
        key={key}
        path={path}
        element={
          <React.Suspense fallback={<FallbackLoading />}>
            {isModal ? (
              <BigPictureModalPage>
                <Element />
              </BigPictureModalPage>
            ) : (
              <Element />
            )}
          </React.Suspense>
        }
      >
        {Array.isArray(innerRoutes)
          ? handleRenderRoutes(innerRoutes, authRequired)
          : null}
      </Route>
    ));

  const publicRoutes = useMemo(() => {
    return handleRenderRoutes(getPublicRoutes());
  }, []);

  const privateRoutes = useMemo(() => {
    return handleRenderRoutes(getPrivateRoutes(), true);
  }, []);

  const modalRoutes = useMemo(() => {
    return handleRenderRoutes(getModalRoutes(), true, true);
  }, []);

  return (
    <>
      <ExpirePackageModal />
      <Routes location={state?.backgroundLocation || location}>
        <Route element={<PublicRoute />}>{publicRoutes}</Route>
        <Route element={<Layout />}>
          <Route element={<PrivateRoute />}>{privateRoutes}</Route>
        </Route>
      </Routes>
      {state?.backgroundLocation && (
        <Routes>
          <Route element={<PrivateRoute />} path="/modal">
            {modalRoutes}
          </Route>
        </Routes>
      )}
    </>
  );
};

export default App;
