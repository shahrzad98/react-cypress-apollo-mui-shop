import { Grid } from '@mui/material';
import React from 'react';
import { formatDate, formatNumber } from '../../../../../../utils/helpers';
import { Style } from './style';

const FinanceDetail = ({ open, onClose, selectedFinance }) => {
  return (
    <Style anchor="bottom" open={open} onClose={onClose}>
      <Grid onClick={onClose} className="header">
        <i className="df-arrow" />
        <h1>اطلاعات بیشتر</h1>
      </Grid>
      <Grid mt={3} container className="content">
        <Grid alignContent="flex-start" className="factor" container>
          <Grid container className="header_factor">
            <h6>{selectedFinance?.title}</h6>
          </Grid>
          {selectedFinance?.title?.includes('پیامک') ? (
            <Grid container className="content_factor">
              <Grid mt={1} container justifyContent="space-between">
                <p className="title">تعداد</p>
                <p className="value">{selectedFinance?.validity_rate} پیامک</p>
              </Grid>
              <Grid mt={2} container justifyContent="space-between">
                <p className="title">تاریخ ثبت</p>
                <p className="value">
                  {formatDate(selectedFinance?.created_at)}
                </p>
              </Grid>
              <Grid mt={2} container justifyContent="space-between">
                <p className="title">قیمت پرداخت شده</p>
                <p className="value">
                  {formatNumber(selectedFinance?.amount)}
                  <span className="little">تومان</span>
                </p>
              </Grid>
              <Grid mt={2} container justifyContent="space-between">
                <p className="title">وضعیت</p>
                <p
                  style={{
                    color: selectedFinance?.status === 3 ? '#00CE7D' : '#EA002A'
                  }}
                  className="value">
                  {selectedFinance?.status === 3 ? 'موفق' : 'ناموفق'}
                </p>
              </Grid>
              <Grid mt={2} container justifyContent="space-between">
                <p className="title">کد پیگیری</p>
                <p className="value">{selectedFinance?.reference_code}</p>
              </Grid>
            </Grid>
          ) : (
            <Grid container className="content_factor">
              <Grid mt={1} container justifyContent="space-between">
                <p className="title">مدت اعتبار</p>
                <p className="value">{selectedFinance?.validity_rate} روز</p>
              </Grid>
              <Grid mt={2} container justifyContent="space-between">
                <p className="title">تاریخ ثبت</p>
                <p className="value">
                  {formatDate(selectedFinance?.created_at)}
                </p>
              </Grid>
              <Grid mt={2} container justifyContent="space-between">
                <p className="title">قیمت اصلی</p>
                <p className="value">
                  {formatNumber(selectedFinance?.main_amount)}
                  <span className="little">تومان</span>
                </p>
              </Grid>
              <Grid mt={2} container justifyContent="space-between">
                <p className="title">قیمت پرداخت شده</p>
                <p className="value">
                  {formatNumber(selectedFinance?.amount)}
                  <span className="little">تومان</span>
                </p>
              </Grid>
              <Grid mt={2} container justifyContent="space-between">
                <p className="title">وضعیت</p>
                <p
                  style={{
                    color: selectedFinance?.status === 3 ? '#00CE7D' : '#EA002A'
                  }}
                  className="value">
                  {selectedFinance?.status === 3 ? 'موفق' : 'ناموفق'}
                </p>
              </Grid>
              <Grid mt={2} container justifyContent="space-between">
                <p className="title">کد پیگیری</p>
                <p className="value">{selectedFinance?.reference_code}</p>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Style>
  );
};

export default FinanceDetail;
