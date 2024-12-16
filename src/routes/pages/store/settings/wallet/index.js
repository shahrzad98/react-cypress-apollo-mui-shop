import { useMutation, useQuery } from '@apollo/client';
import { Button, CircularProgress, Grid } from '@mui/material';
import persianJs from 'persianjs';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GET_WALLET_DATA } from '../../../../../constant/queries/settings';
import { Style } from './style';
import {
  formatNumber,
  redirectToAP,
  redirectToSEP
} from '../../../../../utils/helpers';
import { ReactComponent as BannerSVG } from './svg/banner.svg';
import { ReactComponent as WalletSVG } from './svg/wallet.svg';
import { Add, Info, Remove } from '@mui/icons-material';
import NumberFormat from 'react-number-format';
import { CHARGE_WALLET } from '../../../../../constant/mutations/store';
import { toast, ToastContainer } from 'react-toastify';

const Finance = () => {
  const navigate = useNavigate();
  const { data } = useQuery(GET_WALLET_DATA);

  const [value, setValue] = useState(0);
  const [chargeWallet, { data: chargeData, loading: chargeLoading }] =
    useMutation(CHARGE_WALLET);

  useEffect(() => {
    if (chargeData?.store.chargeWallet.charge_result === false) {
      if (chargeData?.store.chargeWallet.gateway_type === 'AsanPardakht') {
        redirectToAP(chargeData?.store.chargeWallet.token);
      } else if (chargeData?.store.chargeWallet.gateway_type === 'SEP') {
        redirectToSEP(chargeData?.store.chargeWallet.token);
      }
    }
  }, [chargeData?.store]);

  return (
    <Style alignContent="flex-start" container>
      <Grid alignItems="center" container justifyContent="space-between">
        <Grid onClick={() => navigate('/store/settings')} className="header">
          <i className="df-arrow" />
          <h1>کیف پول</h1>
        </Grid>
        {/* <Button onClick={()=>navigate('/store/settings/wallet/logs')} className="logBtn" variant="text" color="primary">
          سوابق
        </Button> */}
      </Grid>
      <Grid mt={3} container className="amount_cont">
        <Grid container className="banner_cont">
          <BannerSVG />
        </Grid>
        <Grid justifyContent="center" container alignItems="center">
          <div className="circle">
            <WalletSVG />
          </div>
          <h1>
            {formatNumber(data?.store?.getWalletData?.amount)}{' '}
            <span>تومان</span>
          </h1>
        </Grid>
      </Grid>
      <Grid alignContent="flex-start" className="content" container mt={2}>
        <Grid container>
          <h2>افزایش اعتبار</h2>
        </Grid>
        <Grid mt={3} container>
          <Grid style={{ paddingLeft: 6 }} item xs={4}>
            <div
              onClick={() => setValue(20000)}
              className={value === 20000 ? 'box_amount active' : 'box_amount'}
            >
              {formatNumber(20000)} تومان
            </div>
          </Grid>
          <Grid style={{ paddingLeft: 6, paddingRight: 6 }} item xs={4}>
            <div
              onClick={() => setValue(50000)}
              className={value === 50000 ? 'box_amount active' : 'box_amount'}
            >
              {formatNumber(50000)} تومان
            </div>
          </Grid>
          <Grid style={{ paddingRight: 6 }} item xs={4}>
            <div
              onClick={() => setValue(100000)}
              className={value === 100000 ? 'box_amount active' : 'box_amount'}
            >
              {formatNumber(100000)} تومان
            </div>
          </Grid>
        </Grid>
        <Grid mt={3} className="input_box" container>
          <Grid
            onClick={() => {
              setValue(+`${value}`?.replaceAll(',', '') + 10000);
            }}
            className="add_btn"
            item
          >
            <Add />
          </Grid>
          <Grid className="input_cont" item>
            {+`${value}`?.replaceAll(',', '') > 0 && <span>تومان</span>}
            <NumberFormat
              style={{ direction: 'ltr' }}
              thousandSeparator
              onChange={e => {
                if (e.target.value) {
                  const newVal = persianJs(e.target.value)
                    .toEnglishNumber()
                    .toString();
                  setValue(newVal);
                } else {
                  setValue('');
                }
              }}
              className="input_real"
              value={value}
            />
          </Grid>
          <Grid
            onClick={() => {
              (typeof value === 'number' && value > 10000) ||
              (typeof value === 'string' &&
                +`${value}`?.replaceAll(',', '') > 10000)
                ? setValue(+`${value}`?.replaceAll(',', '') - 10000)
                : setValue(0);
            }}
            className="Remove_btn"
            item
          >
            <Remove />
          </Grid>
        </Grid>
        <Grid container mt={3} mb={3} className="divider"></Grid>
        {(typeof value === 'number' && value > 0) ||
        (typeof value === 'string' && +`${value}`?.replaceAll(',', '') > 0) ? (
          <Grid className="factor" container>
            <Grid container className="header_factor">
              <h6>فاکتور</h6>
            </Grid>
            <Grid container className="content_factor">
              <Grid container justifyContent="space-between">
                <p style={{ fontWeight: '500' }} className="title">
                  مبلغ قابل پرداخت
                </p>
                <p style={{ fontWeight: '500' }} className="value">
                  {typeof value === 'number' ? formatNumber(value) : value}{' '}
                  <span className="little">تومان</span>
                </p>
              </Grid>
            </Grid>
          </Grid>
        ) : null}
      </Grid>
      <Grid container className="footer">
        <Button
          onClick={() => {
            if (
              (typeof value === 'number' && value >= 1000) ||
              (typeof value === 'string' &&
                +`${value}`?.replaceAll(',', '') >= 1000)
            ) {
              chargeWallet({
                variables: {
                  content: {
                    amount:
                      typeof value === 'string'
                        ? +`${value}`?.replaceAll(',', '')
                        : value
                  }
                }
              });
            } else {
              toast('حداقل مبلغ شارژ، ۱۰۰۰ تومان می باشد', {
                position: 'bottom-center',
                autoClose: 2000,
                hideProgressBar: true,
                // closeOnClick: true,
                draggable: true,
                style: { backgroundColor: '#EA002A22', color: '#EA002A' },
                closeButton: false,
                icon: <Info />
              });
            }
          }}
          fullWidth
          variant="contained"
          color="primary"
        >
          {chargeLoading ? <CircularProgress /> : 'پرداخت و تایید'}
        </Button>
      </Grid>

      <ToastContainer />
    </Style>
  );
};

export default Finance;
