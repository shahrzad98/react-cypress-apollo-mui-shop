import styled from '@emotion/styled';
import { Button, CircularProgress, Drawer, Grid } from '@mui/material';
import React from 'react';
import { formatNumber } from '../../../../../../../utils/helpers';

const Style = styled(Drawer)`
  .MuiPaper-root {
    height: 100vh;
    position: relative;
    padding: 24px 16px;
    background-color: #f5f6fa;
    .content {
      box-shadow: 0px 4px 8px rgba(72, 52, 147, 0.08);
      border-radius: 10px;
      background-color: #fff;
      height: calc(100vh - 180px);
      padding: 24px 16px;
      .factor {
        .content_factor {
          border: 0.5px solid #c9c3e0;
          border-top: none;
          padding: 16px;
          border-radius: 0 0 10px 10px;
          .title {
            margin: 0;
            color: #adaaba;
            font-size: 14px;
            font-weight: 400;
          }
          .value {
            margin: 0;
            font-size: 16px;
            font-weight: 400;
            color: #101820;
          }
          .little {
            font-size: 10px;
            margin-left: 2px;
          }
        }
        .header_factor {
          background-color: #f3f3f3;
          border-radius: 10px 10px 0 0;
          height: 50px;
          display: flex;
          align-items: center;
          padding: 0 16px;

          h6 {
            margin: 0;
            color: #6a6f80;
            font-size: 18px;
            font-weight: 500;
          }
        }
      }
    }
    .header {
      display: flex;
      align-items: center;
      h1 {
        font-size: 20px;
        font-weight: 500;
        color: #101820;
        margin: 0;
      }
      .df-arrow {
        font-size: 20px;
        font-weight: 700;
        margin-right: 12px;
      }
    }
    .footer {
      position: absolute;
      bottom: 0;
      right: 0;
      height: 78px;
      display: flex;
      align-items: center;
      padding: 0 16px;
      background-color: #f5f6fa;

      box-shadow: 0px 0px 20px rgba(72, 52, 147, 0.12);
    }
  }
`;

const BuyStaticModal = ({
  open,
  close,
  smsData,
  payHandler,
  loading,
  smsCost
}) => {
  return (
    <Style data-cy="buyStaticModal" anchor="bottom" open={open} onClose={close}>
      <Grid data-cy="closeModal" onClick={() => close()} className="header">
        <i className="df-arrow" />
        <h1>افزایش اعتبار پیامک</h1>
      </Grid>
      <Grid mt={3} container className="content">
        <Grid alignContent="flex-start" className="factor" container>
          <Grid container className="header_factor">
            <h6>فاکتور</h6>
          </Grid>
          <Grid container className="content_factor">
            <Grid mt={1} container justifyContent="space-between">
              <p className="title">نام بسته</p>
              <p className="value">بسته {smsData?.count} پیامکی</p>
            </Grid>
            <Grid mt={2} container justifyContent="space-between">
              <p className="title">قیمت بسته</p>
              <p className="value">
                {formatNumber(smsData?.count * smsCost)}
                <span className="little">تومان</span>
              </p>
            </Grid>
            <Grid mt={2} container justifyContent="space-between">
              <p className="title">قیمت هر پیامک</p>
              <p style={{ color: '#6D5DA9' }} className="value">
                {smsCost}
                <span className="little">تومان</span>
              </p>
            </Grid>

            <Grid
              container
              style={{
                borderTop: '0.5px dashed #C9C3E0',
                marginTop: '20px',
                marginBottom: '20px'
              }}
            ></Grid>
            <Grid container justifyContent="space-between">
              <p style={{ fontWeight: '500' }} className="title">
                مبلغ قابل پرداخت
              </p>
              <p style={{ fontWeight: '500' }} className="value">
                {formatNumber(smsData?.count * smsCost)}

                <span className="little">تومان</span>
              </p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container className="footer">
        <Button
          onClick={() => payHandler(smsData)}
          fullWidth
          variant="contained"
          color="primary"
        >
          {loading ? (
            <CircularProgress
              style={{ width: '24px', height: '24px', color: '#FFF' }}
            />
          ) : (
            'تایید و پرداخت'
          )}
        </Button>
      </Grid>
    </Style>
  );
};

export default BuyStaticModal;
