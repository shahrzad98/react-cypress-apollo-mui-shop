import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { Grid } from '@mui/material';
import Status from './Status';
import { formatDate } from '../../../../../utils/helpers';
import { useQuery } from '@apollo/client';
import { GET_MANAGER } from '../../../../../constant/queries/orders';

const Style = styled(Grid)({
  '& .statuses--container': {
    scrollSnapType: 'x mandatory',
    display: 'flex',
    overflow: 'hidden',
    overflowX: 'scroll',
    '& > div': {
      '&:last-child': {
        '& .border--divider': {
          display: 'none'
        }
      }
    }
  },
  '& .description': {
    margin: '2rem 0 0 0',
    padding: '1rem 0',
    borderRadius: '10px',
    '& p': {
      margin: '0',
      fontSize: '14px'
    },
    '&.warning': {
      background: '#ffc72a1c',
      padding: '1rem',
      '& p': {
        color: '#FFC72A'
      }
    },
    '&.error': {
      background: '#EA002A1c',
      padding: '1rem',
      '& p': {
        color: '#EA002A'
      }
    }
  }
});

const Progress = ({ orderId }) => {
  const container = useRef(null);

  const { data } = useQuery(GET_MANAGER, {
    variables: {
      getManagerId: orderId
    }
  });

  const {
    status,
    deadline_date,
    previous_status,
    shipping_type,
    registration_type
  } = data.order.getManager;

  const isTimeOver =
    deadline_date &&
    new Date(deadline_date).getTime() - new Date().getTime() < 0;

  const cardToCardDescription = new Proxy(
    {
      14: 'پس از تایید درخواست سفارش ، مشتری میتواند مبلغ سفارش را به صورت کارت به کارت پرداخت کند.',
      15: 'سفارش در انتظار پرداخت مشتری است. محصولات آن تا 4 ساعت برای مشتری رزرو می شود.',
      16: 'سفارش کارت به کارت توسط مشتری پرداخت شده و تصویر رسید ارسال شده است.',
      3: isTimeOver
        ? 'زمان آماده سازی سفارش به پایان رسیده. لطفا در سریع ترین زمان، سفارش را برای مشتری را ارسال کنید.'
        : 'لطفا پس از آماده سازی محصولات، سفارش را ارسال کنید.',
      4: {
        other:
          'لطفا در صورت اطمینان از تحویل مرسوله به مشتری، وضعیت سفارش را "تحویل شده" تعیین کنید.',
        post: 'سفارش تا تاریخ %time% به مشتری تحویل داده  میشود.',
        alopeyk: 'سفارش تا تاریخ %time% به مشتری تحویل داده  میشود.',
        postex: 'سفارش تا تاریخ %time% به مشتری تحویل داده  میشود.'
      },
      5: {
        other: 'طبق زمان ارسال تعیین شده ، مرسوله به مشتری تحویل داده شده است.',
        post: 'طبق گزارش پستکس ، مرسوله به مشتری تحویل داده شده است.',
        alopeyk: 'طبق گزارش الوپیک ، مرسوله به مشتری تحویل داده شده است.',
        postex: 'طبق گزارش پستکس ، مرسوله به مشتری تحویل داده شده است.'
      },
      13: {
        14: 'متاسفانه مهلت بررسی درخواست سفارش به پایان رسیده و سفارش منقضی شده است.',
        15: 'متاسفانه بدلیل عدم پرداخت مبلغ توسط مشتری سفارش منقضی شده است.'
      },
      11: 'سفارش مشتری بدلیل عدم تایید شما رد شده است.',
      12: 'سفارش مشتری بدلیل عدم تایید شما رد شده است.',
      10: 'متاسفانه مهلت بررسی سفارش به پایان رسیده و سفارش منقضی شده است.',
      17: 'طبق گزارش مشتری ، سفارش به او تحویل داده نشده است. لطفا مشکل پیش آمده در ارسال را پیگیری کنید.'
    },
    {
      get(target, p) {
        const errors = ['17', isTimeOver && 3].filter(Boolean);
        const warning = ['10', '13', '11', '12'];

        const step = {
          14: 1,
          10: 1,
          13: {
            14: 2,
            15: 3
          },
          15: 2,
          16: 3,
          11: 3,
          12: 3,
          3: 4,
          17: 5,
          4: 5,
          5: 6
        };

        return {
          text: target[p]
            ? p === '4' || p === '5'
              ? target[p][shipping_type].replace(
                  '%time%',
                  formatDate(deadline_date)
                )
              : p === '13'
              ? target[p][previous_status]
              : target[p]
            : '',
          step: p === '13' ? step[p][previous_status] : step[p],
          error: errors.indexOf(p) !== -1,
          warning: warning.indexOf(p) !== -1
        };
      }
    }
  );

  const onlineDescription = new Proxy(
    {
      16: 'سفارش جدیدی ثبت شده و تا 24 ساعت رزرو می شود و در انتظار تایید شما است.',
      10: 'متاسفانه مهلت بررسی درخواست سفارش به پایان رسیده و سفارش منقضی شده است.',
      11: 'سفارش مشتری بدلیل عدم تایید شما رد شده است.',
      3: isTimeOver
        ? 'زمان آماده سازی سفارش به پایان رسیده . لطفا در سریع ترین زمان ، سفارش را برای مشتری را ارسال کنید.'
        : 'لطفا پس از آماده سازی محصولات ، سفارش را ارسال کنید.',
      17: 'طبق گزارش مشتری ، سفارش به او تحویل داده نشده است. لطفا مشکل پیش آمده در ارسال را پیگیری کنید.',
      4: {
        other:
          'لطفا در صورت اطمینان از تحویل مرسوله به مشتری، وضعیت سفارش را "تحویل شده" تعیین کنید.',
        post: 'سفارش تا تاریخ %time% به مشتری تحویل داده  میشود.',
        alopeyk: 'سفارش تا تاریخ %time% به مشتری تحویل داده  میشود.',
        postex: 'سفارش تا تاریخ %time% به مشتری تحویل داده  میشود.'
      }
    },
    {
      get(target, p) {
        const errors = ['17', isTimeOver && '3'].filter(Boolean);
        const warning = ['10', '11'];
        const step = {
          16: 1,
          10: 1,
          11: 1,
          3: 2,
          4: 3,
          17: 3,
          5: 4
        };

        return {
          text: target[p]
            ? p === '4'
              ? target[p][shipping_type].replace(
                  '%time%',
                  formatDate(deadline_date)
                )
              : target[p]
            : '',
          step: step[p] ?? 1,
          error: errors.indexOf(p) !== -1,
          warning: warning.indexOf(p) !== -1
        };
      }
    }
  );

  const { text, step, error, warning } =
    registration_type === 1
      ? onlineDescription[status]
      : cardToCardDescription[status];

  useEffect(() => {
    if (container) {
      container.current.querySelector('#active')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start'
      });
    }
  }, [container, status, shipping_type, deadline_date, previous_status]);

  return (
    <Style>
      <div className="statuses--container" ref={container}>
        {registration_type === 1 ? (
          <>
            <Status
              error={error}
              warning={warning}
              currentStep={step}
              step={1}
              name="در انتظار تایید"
            />
            <Status
              error={error}
              warning={warning}
              currentStep={step}
              step={2}
              name="در حال آماده سازی"
            />
            <Status
              error={error}
              warning={warning}
              currentStep={step}
              step={3}
              name="در حال ارسال"
            />
            <Status
              error={error}
              warning={warning}
              currentStep={step}
              step={4}
              name="تحویل شده"
            />
          </>
        ) : (
          <>
            <Status
              error={error}
              warning={warning}
              currentStep={step}
              step={1}
              name="درخواست شده"
            />
            <Status
              error={error}
              warning={warning}
              currentStep={step}
              step={2}
              name="در انتظار پرداخت"
            />
            <Status
              error={error}
              warning={warning}
              currentStep={step}
              step={3}
              name="در انتظار تایید"
            />
            <Status
              error={error}
              warning={warning}
              currentStep={step}
              step={4}
              name="در حال آماده سازی"
            />
            <Status
              error={error}
              warning={warning}
              currentStep={step}
              step={5}
              name="در حال ارسال"
            />
            <Status
              error={error}
              warning={warning}
              currentStep={step}
              step={6}
              name="تحویل شده"
            />
          </>
        )}
      </div>
      <div
        className={`description${
          warning ? ' warning' : error ? ' error' : ''
        }`}>
        <p>{text}</p>
      </div>
    </Style>
  );
};

export default Progress;
