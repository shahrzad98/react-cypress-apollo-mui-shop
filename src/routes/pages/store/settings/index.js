import { Grid } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Style } from './style';
import { ReactComponent as GemSVG } from '../svg/gem.svg';
import { ReactComponent as FinanceSVG } from '../svg/finance.svg';
import { ReactComponent as MailSVG } from '../svg/mail.svg';
import { ReactComponent as StoreSVG } from '../svg/store.svg';
import { ReactComponent as WalletSVG } from '../svg/wallet.svg';
import { ReactComponent as UserSVG } from '../svg/user.svg';
import { useQuery } from '@apollo/client';
import { GET_WALLET_DATA } from '../../../../constant/queries/settings';
import { formatNumber } from '../../../../utils/helpers';
const CARDS = [
  {
    title: 'اطلاعات فروشگاه',
    link: 'info',
    icon: 'store',
    dataCy: 'info'
  },
  {
    title: 'اطلاعات شخصی',
    link: 'user_info',
    icon: 'user',
    dataCy: 'user_info'
  },
  {
    title: 'اطلاعات پکیج',
    link: 'package',
    icon: 'gem',
    dataCy: 'package'
  },
  {
    title: 'اطلاعات پیامک',
    link: 'sms',
    icon: 'mail',
    dataCy: 'sms'
  },
  {
    title: 'سوابق مالی',
    link: 'finance',
    icon: 'finance',
    dataCy: 'finance'
  }
];

const StoreSettings = () => {
  const navigate = useNavigate();
  const renderIcon = icon => {
    switch (icon) {
      case 'store':
        return <StoreSVG />;
      case 'user':
        return <UserSVG />;
      case 'gem':
        return <GemSVG />;
      case 'mail':
        return <MailSVG />;
      case 'finance':
        return <FinanceSVG />;
      case 'wallet':
        return <WalletSVG />;

      default:
        return '';
    }
  };

  const { data } = useQuery(GET_WALLET_DATA);

  return (
    <Style container>
      <Grid onClick={() => navigate('/store')} className="header">
        <i className="df-arrow" />
        <h1>تنظیمات فروشگاه</h1>
      </Grid>
      <Grid container mt={3}>
        <Grid
          onClick={() => navigate('/store/settings/wallet')}
          justifyContent="space-between"
          alignItems="center"
          alignContent="center"
          container
          className="wallet-card"
        >
          <Grid container item xs={11}>
            <div className="circle">
              <WalletSVG />
            </div>
            <div className="title">
              <h2>کیف پول</h2>
              <h3>
                {formatNumber(data?.store?.getWalletData?.amount)}{' '}
                <span>تومان</span>
              </h3>
            </div>
          </Grid>
          <div>
            <i className="df-arrow" />
          </div>
        </Grid>
        {CARDS?.map((e, i) => (
          <Grid
            onClick={() => navigate(`/store/settings/${e.link}`)}
            alignItems="center"
            justifyContent="space-between"
            mt={2}
            key={i}
            container
            className="card"
          >
            <div className="title">
              {renderIcon(e.icon)}
              <h2 data-cy={e.dataCy}>{e.title}</h2>
            </div>
            <div>
              <i className="df-arrow" />
            </div>
          </Grid>
        ))}
      </Grid>
    </Style>
  );
};

export default StoreSettings;
