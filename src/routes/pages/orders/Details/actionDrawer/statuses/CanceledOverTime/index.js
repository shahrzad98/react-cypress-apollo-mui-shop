import styled from '@emotion/styled';
import { InfoOutlined } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';
import React from 'react';
import { formatNumber } from '../../../../../../../utils/helpers';
import { ReactComponent as FailedSVG } from '../WaitingForApproval/svg/failed.svg';

const CanceledOverTime = ({ close, order, changeStatus }) => {
  const Style = styled(Grid)`
    p {
      margin-top: 24px;
    }

    button {
      margin-top: 50px;
    }
    .address-container {
      border-left: 2px solid #f1f1f1;
      padding-left: 12px;
      margin-top: 30px;
      h6 {
        color: #6a6f80;
        font-size: 14px;
        font-weight: 300;
        margin: 0;
        display: flex;
        align-items: center;
      }
      h4 {
        color: #9fa6b9;
        font-size: 14px;
        font-weight: 300;
        margin: 0;
      }
      i {
        color: #483493;
        font-size: 20px;
        margin-left: 7px;
      }
    }
    .warning-cont {
      background-color: #ffc72a18;
      border-radius: 10px;
      padding: 12px;
      margin-top: 24px;
      h5 {
        margin: 0;
        color: #ffc72a;
        font-size: 14px;
        font-weight: bold;
        margin-left: 10px;
      }
      svg {
        color: #ffc72a;
      }
    }
  `;

  return (
    <Style container>
      <Grid container>
        <h3>سفارش رد شده</h3>
      </Grid>
      <Grid justifyContent="center" container>
        <FailedSVG style={{ marginRight: '-50px' }} />
      </Grid>
      <Grid container>
        <p>
          سفارش مشتری بدلیل عدم تایید شما منقضی شده است.لطفا در سریع ترین زمان
          ممکن مبلغ پرداخت شده را، به حساب مشتری برگردانید.
        </p>
      </Grid>
      <Grid className="address-container" container>
        {order?.customer?.card_number ? (
          <Grid justifyContent="space-between" container>
            <h4>شماره کارت مشتری</h4>
            <h6>
              {order?.customer?.card_number} <i className="df-payment-card"></i>
            </h6>
          </Grid>
        ) : null}
        <Grid mt={2} justifyContent="space-between" container>
          <h4>مبلغ قابل برگشت</h4>
          <h6>
            {order?.cost ? formatNumber(order?.cost) : ''} تومان{' '}
            <i className="df-payment-card"></i>
          </h6>
        </Grid>
        <Grid mt={2} justifyContent="space-between" container>
          <h4>شماره تلفن مشتری</h4>
          <h6>
            {order?.customer?.phone_number?.replace('+98', '0')}{' '}
            <i className="df-payment-card"></i>
          </h6>
        </Grid>
      </Grid>
      {!order?.customer?.card_number ? (
        <Grid className="warning-cont" container>
          <InfoOutlined />
          <h5>مشتری هنوز شماره کارت خود را وارد نکرده است.</h5>
        </Grid>
      ) : null}
      <Button
        onClick={async () => {
          await changeStatus({
            variables: {
              updateOrderStatusId: order?.id,
              content: {
                status: 13
              }
            }
          });
          close();
        }}
        fullWidth
        color="primary"
        variant="contained"
      >
        برگرداندن مبلغ
      </Button>
    </Style>
  );
};

export default CanceledOverTime;
