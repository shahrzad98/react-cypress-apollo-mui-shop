import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { GET_HOME_DATA } from '../../../constant/queries/home';
import OverviewCard from './overviewCard';
import { Style } from './style';
import { ReactComponent as UserSetting } from './svg/userSettings.svg';
import { ReactComponent as Bell } from './svg/bell.svg';
import { ReactComponent as StoreSVG } from './svg/store.svg';
import OrdersCard from './ordersCard';
import ProductsCard from './productsCard';
import UserDrawer from './userDrawer';
import LogoutModal from './logoutModal';
import useAuth from '../../../components/authentication/useAuth';
import NewPackageModal from './newPackageModal';
import { Grid, Skeleton } from '@mui/material';

const Overview = () => {
  const { data, loading } = useQuery(GET_HOME_DATA);
  const auth = useAuth();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const [showNewPackageModal, setShowNewPackageModal] = useState(
    !auth.hasActivePackage
  );

  const logouthandler = () => {
    auth.logout(() => window.location.replace('/login'));
  };

  const remainingPackageDays = parseInt(
    (new Date(auth.packageExpireDate).getTime() - new Date().getTime()) /
      (1000 * 3600 * 24)
  );

  if (loading)
    return (
      <Style container>
        <Grid alignItems="center" container justifyContent="space-between">
          <h1>خانه</h1>
          <div item>
            <a
              target="_blank"
              rel="noreferrer"
              href={
                data?.user?.getUserRead?.my_store[0]?.ecommerce
                  ?.is_domain_confirmed
                  ? data?.user?.getUserRead?.my_store[0]?.ecommerce?.domain
                  : data?.user?.getUserRead?.my_store[0]?.ecommerce
                      ?.full_sub_domain_path
              }
            >
              <StoreSVG className="df-arrow icon-header" />
            </a>
            <Bell className="df-arrow icon-header" />
            <UserSetting className="df-arrow icon-header" />
          </div>
        </Grid>
        <Grid container>
          <Skeleton animation="wave" variant="text" className="skelet-text" />
        </Grid>
        <Grid container>
          <Skeleton animation="wave" variant="rectangular" className="skelet" />
        </Grid>
        <Grid container>
          <Skeleton animation="wave" variant="rectangular" className="skelet" />
        </Grid>
        <Grid container>
          <Skeleton animation="wave" variant="rectangular" className="skelet" />
        </Grid>
      </Style>
    );

  return (
    <>
      {remainingPackageDays < 15 && (
        <NewPackageModal
          open={showNewPackageModal}
          onClose={() => setShowNewPackageModal(false)}
          remainingDays={remainingPackageDays}
        />
      )}
      <Style container>
        <Grid alignItems="center" container justifyContent="space-between">
          <h1>خانه</h1>
          <div item>
            <a
              target="_blank"
              rel="noreferrer"
              href={
                data?.user?.getUserRead?.my_store[0]?.ecommerce
                  ?.is_domain_confirmed
                  ? data?.user?.getUserRead?.my_store[0]?.ecommerce?.domain
                  : data?.user?.getUserRead?.my_store[0]?.ecommerce
                      ?.full_sub_domain_path
              }
            >
              <StoreSVG className="df-arrow icon-header" />
            </a>{' '}
            <Bell className="df-arrow icon-header" />
            <UserSetting
              data-cy="settingStoreDrawer"
              onClick={() => setOpenDrawer(true)}
              className="df-arrow icon-header"
            />
          </div>
        </Grid>
        <Grid container>
          <h2>
            {data?.user?.getUserRead?.my_store[0]?.first_name} عزیز خوش امدی!
          </h2>
        </Grid>
        <OverviewCard data={data?.store?.getHomeData} />
        <OrdersCard data={data?.order?.getOrdersBrief?.results} />
        <ProductsCard data={data?.item?.getItemsBrief?.results} />
        <UserDrawer
          logout={() => setLogoutModal(true)}
          close={() => setOpenDrawer(false)}
          open={openDrawer}
        />
        {logoutModal ? (
          <LogoutModal
            logout={logouthandler}
            close={() => setLogoutModal(false)}
          />
        ) : (
          ''
        )}
      </Style>
    </>
  );
};

export default Overview;
