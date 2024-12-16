import { Button, Grid } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Progressbar from '../../../../components/shared/UI/progressBar';
import { formatNumber } from '../../../../utils/helpers';
import { Style } from './style';
import { ReactComponent as EmptyOrdersSvg } from './svg/emptyOrders.svg';

const OrdersCard = ({ data }) => {
  const navigate = useNavigate();
  return (
    <Style container>
      <Grid className="header" container justifyContent="space-between">
        <h3>جدیدترین سفارش ها</h3>
        <Button
          data-cy="allOrdersBtn"
          onClick={() => navigate('/orders/all')}
          style={{ height: '24px', color: '#483493' }}
          endIcon={
            <i
              className="df-arrow"
              style={{
                transform: 'rotate(180deg)',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
            />
          }
        >
          همه
        </Button>
      </Grid>
      <Grid className="orders_cont" container>
        {data?.length < 1 ? (
          <Grid className="empty">
            <EmptyOrdersSvg />
            <p>هنوز سفارشی ثبت نشده است.</p>
          </Grid>
        ) : (
          data?.map((e, i) => (
            <Grid
              key={e.id}
              justifyContent="space-between"
              alignItems="center"
              style={{
                borderBottom:
                  i + 1 === data?.length ? 'none' : '0.5px solid #c9c3e0'
              }}
              className="order_card"
              container
            >
              <Grid item xs={8} container>
                <Link
                  style={{ textDecoration: 'none' }}
                  to={`/orders/detail/${e.id}`}
                >
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    className="icon_order_cont"
                  >
                    <i className="df-orders" />
                  </Grid>
                </Link>

                <Grid ml={1}>
                  <h6>
                    {e?.customer_first_name} {e?.customer_last_name}
                  </h6>
                  <h6 style={{ marginTop: '7px' }}>
                    {formatNumber(e?.cost)} تومان
                  </h6>
                </Grid>
              </Grid>
              <div style={{ width: '89px' }}>
                <Progressbar status={e?.status} />
              </div>
            </Grid>
          ))
        )}
      </Grid>
    </Style>
  );
};

export default OrdersCard;
