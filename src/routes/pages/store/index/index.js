/* eslint-disable */

import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { Style } from './style';
import { ReactComponent as SettingsSVG } from '../svg/settings.svg';
import { ReactComponent as ShippingsSVG } from '../svg/shipping.svg';
import { ReactComponent as PaymentSVG } from '../svg/payment.svg';
import { useNavigate } from 'react-router-dom';
import { css, Global } from '@emotion/react';
import { useQuery } from '@apollo/client';
import { GET_HOME_DATA } from '../../../../constant/queries/home';

const settingsRoutes = [
  {
    title: 'تنظیمات فروشگاه',
    link: '/store/settings',
    dataCy: 'settingStore',
    icon: SettingsSVG
  },
  {
    title: 'روش پرداخت',
    link: '/store/payment',
    dataCy: 'paymentMethods',
    icon: PaymentSVG
  },
  {
    title: 'روش ارسال',
    link: '/store/shippings',
    dataCy: 'shippingSetting',
    icon: ShippingsSVG
  }
];

const Store = () => {
  const navigate = useNavigate();
  const { data } = useQuery(GET_HOME_DATA, {
    fetchPolicy: 'cache-first'
  });

  useEffect(() => {
    if (data?.user?.getUserRead?.my_store[0]) {
      $crisp.push([
        'set',
        'user:phone',
        data?.user?.getUserRead?.my_store[0]?.phone_number
      ]);
      $crisp.push([
        'set',
        'user:email',
        data?.user?.getUserRead?.my_store[0]?.email
      ]);
      $crisp.push([
        'set',
        'user:nickname',
        data?.user?.getUserRead?.my_store[0]?.name
      ]);
    }
  }, [data]);

  return (
    <Style>
      <Global
        styles={css`
          #crisp-chatbox {
            display: initial !important;
          }
        `}
      />
      <Grid container className="header">
        <h1>فروشگاه</h1>
      </Grid>
      {settingsRoutes.map(route => (
        <Grid
          key={route.title}
          onClick={() => navigate(route.link)}
          mt={3}
          justifyContent="space-between"
          alignItems="center"
          container
          className="card"
        >
          <h2 data-cy={route.dataCy}>{route.title}</h2>
          <route.icon />
        </Grid>
      ))}
    </Style>
  );
};

export default Store;
