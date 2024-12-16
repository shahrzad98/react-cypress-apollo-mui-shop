import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_MANAGER } from '../../../../constant/queries/orders';
import { diffDays, formatDate } from '../../../../utils/helpers';
import MyTimer from '../../../../components/shared/MyTimer';
import styled from '@emotion/styled';

const Style = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginTop: '1rem',
  '& i': {
    display: 'flex',
    color: '#9185BE',
    fontSize: '13px',
    marginRight: '3px'
  },
  '& p': {
    margin: '0',
    color: '#9185BE',
    fontSize: '13px'
  }
});

const Time = ({ orderId }) => {
  const { data } = useQuery(GET_MANAGER, {
    variables: {
      getManagerId: orderId
    }
  });

  const {
    status,
    sent_at,
    deadline_date,
    prepare_deadline,
    confirmed_at,
    expired_at
  } = data.order.getManager;
  const remainigDays = Math.ceil(
    (new Date(prepare_deadline).getTime() - new Date().getTime()) / 86400000
  );
  const time = new Proxy(
    {
      14: (
        <>
          <i className="df-order-time" />
          <p>
            <MyTimer time={expired_at} /> تا انقضا درخواست
          </p>
        </>
      ),
      15: (
        <>
          <i className="df-time" />
          <p>زمان تایید درخواست: {formatDate(confirmed_at)}</p>
        </>
      ),
      16: (
        <>
          <i className="df-order-time" />
          <p>
            <MyTimer time={expired_at} /> تا انقضا سفارش
          </p>
        </>
      ),
      3: (
        <>
          <i className="df-order-time" />
          {new Date(deadline_date).getTime() - new Date().getTime() < 0 ? (
            <p>زمان آماده سازی : {diffDays(prepare_deadline)}</p>
          ) : (
            <p>
              <MyTimer time={remainigDays} /> روز تا پایان زمان آماده سازی باقی
              مانده
            </p>
          )}
        </>
      ),
      4: (
        <>
          <i className="df-order-time" />
          <p>زمان ارسال سفارش: {formatDate(sent_at)}</p>
        </>
      ),
      5: <></>,
      // {
      //   other: null,
      //   post: null,
      //   postex: null
      // }
      13: (
        <>
          <i className="df-order-time" />
          <p>
            <MyTimer time={deadline_date} /> تا انقضا درخواست
          </p>
        </>
      ),
      11: (
        <>
          <i className="df-order-time" />
          <p>زمان پرداخت توسط مشتری: 1400/5/25</p>
        </>
      ),
      12: (
        <>
          <i className="df-order-time" />
          <p>زمان پرداخت توسط مشتری: 1400/5/25</p>
        </>
      ),
      10: (
        <>
          <i className="df-order-time" />
          <p>زمان پرداخت توسط مشتری: 1400/5/25</p>
        </>
      ),
      17: (
        <>
          <i className="df-order-time" />
          <p>زمان ارسال سفارش: {formatDate(sent_at)}</p>
        </>
      )
    },
    {
      get(target, p) {
        if (target[p]) {
          return target[p];
        }
        return null;
      }
    }
  );

  return <Style>{time[status]}</Style>;
};

export default Time;
