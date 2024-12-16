import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import useRoutesSettings from '../../routes/useRoutesSettings';

const Layout = () => {
  const settings = useRoutesSettings();

  return (
    <>
      <Outlet />
      {settings?.hideNav ? null : <Navigation />}
    </>
  );
};

export default Layout;
