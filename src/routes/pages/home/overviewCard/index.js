import React, { useEffect, useState } from 'react';
import { Style } from './style';
import { ReactComponent as StoreBanner } from '../../../../static/image/storebanner.svg';
import { ReactComponent as StoreLogo } from '../../../../static/image/storelogo.svg';
import { ReactComponent as AddButton } from './svg/addButton.svg';
import { Grid } from '@mui/material';
import ProgressBar from './progressBar';
import { useNavigate } from 'react-router-dom';

const OverviewCard = ({ data }) => {
  const [smsWidth, setSmsWidth] = useState(100);
  const [packageWidth, setpackageWidth] = useState(100);
  const [packageDaysRemaining, setpackageDaysRemaining] = useState(100);
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.name) {
      let sms = 0;
      let packageW = 0;
      let packageDays = 0;
      if (data?.initial_sms_charge !== 0) {
        sms = ((data?.sms_charge / data?.initial_sms_charge) * 100).toFixed();
      } else {
        if (data?.sms_charge < 1000) {
          sms = ((data.sms_charge / 1000) * 100).toFixed();
        } else {
          sms = 100;
        }
      }
      if (data?.recharge_date) {
        let recharge = new Date(data.recharge_date).getTime();
        let expire = new Date(data.expire_date).getTime();
        let today = new Date();
        if (expire > today) {
          packageDays = ((expire - today) / 86400000).toFixed();
          packageW = (((expire - today) * 100) / (expire - recharge)).toFixed();
        } else {
          packageDays = 0;
          packageW = 0;
        }
      } else {
        let today = new Date();
        let recharge = today.getTime() - 5184000000;
        let expire = new Date(data.expire_date).getTime();

        if (expire > today) {
          packageDays = ((expire - today) / 86400000).toFixed();
          packageW = (((expire - today) * 100) / (expire - recharge)).toFixed();
        } else {
          packageDays = 0;
          packageW = 0;
        }
      }

      setSmsWidth(sms);
      setpackageDaysRemaining(packageDays);
      setpackageWidth(packageW);
    }
  }, [data]);

  return (
    <Style container>
      <Grid justifyContent="center" container className="banner">
        <StoreBanner
          style={{ marginTop: '-57px', height: '160px', position: 'absolute' }}
        />
        <div className="logo">
          {data?.logo?.image ? (
            <img style={{ width: '100%' }} src={data?.logo?.image} />
          ) : (
            <StoreLogo style={{ marginTop: '9px' }} />
          )}
        </div>
      </Grid>
      <Grid justifyContent="center" container className="name">
        <h3>{data?.name}</h3>
      </Grid>
      <Grid mt={2} container>
        <Grid item xs={4} className="brief-row">
          <h6>{data?.orders_count}</h6>
          <h5>سفارش</h5>
        </Grid>
        <Grid item xs={4} className="brief-row">
          <h6>{data?.products_count}</h6>
          <h5>محصول</h5>
        </Grid>
        <Grid style={{ border: 'none' }} item xs={4} className="brief-row">
          <h6>{data?.customers_count}</h6>
          <h5>مشتری</h5>
        </Grid>
      </Grid>
      <Grid mt={4} alignItems="center" container>
        <Grid
          mb={1}
          item
          xs={11}
          container
          justifyContent="space-between"
          alignItems="center"
        >
          <h4>اعتبار پکیج</h4>
          <p>{packageDaysRemaining} روز مانده</p>
        </Grid>
        <Grid item xs={11}>
          <ProgressBar width={packageWidth} />
        </Grid>
        <Grid onClick={() => navigate('/store/settings/package')} item xs={1}>
          <AddButton data-cy="package" style={{ marginRight: '8px' }} />
        </Grid>
      </Grid>
      <Grid mt={3} alignItems="center" container>
        <Grid
          mb={1}
          item
          xs={11}
          container
          justifyContent="space-between"
          alignItems="center"
        >
          <h4>اعتبار پیامکی</h4>
          <p>{data?.sms_charge} پیامک</p>
        </Grid>
        <Grid item xs={11}>
          <ProgressBar width={smsWidth} />
        </Grid>
        <Grid onClick={() => navigate('/store/settings/sms')} item xs={1}>
          <AddButton data-cy="sms" style={{ marginRight: '8px' }} />
        </Grid>
      </Grid>
    </Style>
  );
};

export default OverviewCard;
