import React from 'react';
import styled from '@emotion/styled';
import { Grid } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_MANAGER } from '../../../../constant/queries/orders';

const Style = styled(Grid)({
  '& .factor--title': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    '& p': {
      margin: '0',
      fontSize: '16px',
      fontWeight: 'bold'
    },
    '& i': {
      fontSize: '20px',
      color: '#483493'
    }
  },
  '& .factor--content, & .factor--content_total': {
    marginTop: '1.5rem',
    borderBottom: '1px solid #C9C3E0',
    paddingBottom: '1rem',
    '& div': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem',
      '& p': {
        margin: '0',
        fontSize: '14px',
        '&:first-of-type': {
          color: '#ADAABA'
        }
      }
    }
  },
  '& .factor--content_total': {
    borderBottom: 'none',
    paddingBottom: '0',
    '& p': {
      '&:first-of-type': {
        fontSize: '16px',
        fontWeight: 'bold'
      }
    }
  }
});

const Factor = ({ orderId }) => {
  const { data } = useQuery(GET_MANAGER, {
    variables: {
      getManagerId: orderId
    }
  });

  const {
    cost,
    total_primary_cost,
    total_profit,
    shipping_cost,
    pocket_cost,
    tax,
    loyalty_amount,
    total_discount_cost
  } = data.order.getManager;

  return (
    <Style item xs={12}>
      <div className="factor--title">
        <div>
          <p>فاکتور</p>
        </div>
        <div>
          <i className="df-factor" />
        </div>
      </div>
      <div className="factor--content">
        <div>
          <p>مبلغ کل</p>
          <p>{total_primary_cost.toLocaleString()} تومان</p>
        </div>
        <div>
          <p>هزینه بسته بندی</p>
          <p>{(pocket_cost || 0).toLocaleString()} تومان</p>
        </div>
        <div>
          <p>هزینه ارسال </p>
          <p>{(shipping_cost || 0).toLocaleString()} تومان</p>
        </div>
        <div>
          <p>مالیات</p>
          <p>{tax.toLocaleString()} تومان</p>
        </div>
        <div>
          <p>وفاداری</p>
          <p>{loyalty_amount.toLocaleString()} تومان</p>
        </div>
        <div>
          <p>مجموع تخفیف</p>
          <p>{total_profit.toLocaleString()} تومان</p>
        </div>
        <div>
          <p>کد تخفیف</p>
          <p>{total_discount_cost.toLocaleString()} تومان</p>
        </div>
      </div>
      <div className="factor--content_total">
        <div>
          <p>مبلغ پرداخت شده</p>
          <p>{cost.toLocaleString()} تومان</p>
        </div>
      </div>
    </Style>
  );
};

export default Factor;
