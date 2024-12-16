import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApolloClient, useQuery } from '@apollo/client';
import { GET_MANAGER } from '../../../../constant/queries/orders';
import styled from '@emotion/styled';
import { Grid, Skeleton } from '@mui/material';
import Progress from './Progress';
import Time from './Time';
import Table from './Table';
import Box from '../../../../components/shared/Box';
import ToggleBox from '../../../../components/shared/ToggleBox';
import Items from './Items';
import Factor from './Factor';
import { formatDate } from '../../../../utils/helpers';
import ActionDrawer from './actionDrawer';
import ActionButton from './ActionButton';
import { UPDATE_ORDER } from '../../../../constant/mutations/orders';
import { ReactComponent as UserSVG } from './actionDrawer/statuses/InPreparing/alopeyk/svg/user.svg';
import { ReactComponent as PhoneSVG } from './actionDrawer/statuses/InPreparing/alopeyk/svg/phone.svg';
import { ReactComponent as SafirSVG } from './actionDrawer/statuses/InPreparing/alopeyk/svg/safir.svg';
import NeshanShowingMap from '../../../../components/shared/mapNeshan/showingMap';

const Style = styled(Grid)({
  '& .address-container': {
    borderLeft: '2px solid #f1f1f1',
    paddingLeft: '12px',
    '& h6': {
      marginTop: '8px'
    },
    '& h4': {
      color: '#000',
      fontSize: '14px',
      fontWeight: '300',
      margin: '0',
      display: 'flex',
      alignItems: 'center',
      '& i': {
        marginBottom: 0
      }
    },
    '& button': {
      height: '10px',
      padding: '0'
    }
  },
  '& .back--button': {
    display: 'flex',
    alignItems: 'center',
    padding: '20px',
    '& i': {
      fontWeight: 'bold'
    },
    '& h3': {
      margin: '0 0 0 1rem'
    }
  },
  '& .page--content': {
    padding: '68px 18px 100px 18px'
  },
  '& .border--right_text': {
    marginTop: '1.2rem',
    borderLeft: '2px solid #F1F1F1',
    paddingLeft: '10px',
    display: 'flex',
    width: '100%',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    '& p': {
      fontSize: '14px',
      margin: '0'
    },
    '& .key': {
      color: '#ADAABA',
      marginBottom: '.8rem',
      '&.black': {
        color: '#000'
      }
    },
    '& a': {
      color: '#483493',
      textDecoration: 'none'
    }
  },
  '& .customer--description': {
    marginTop: '1.5rem',
    '& .customer--description_title': {
      fontSize: '16px',
      fontWeight: 'bold',
      margin: '0'
    },
    '& .customer--description_text': {
      background: '#F3F3F3',
      padding: '1rem',
      color: '#6A6F80',
      borderRadius: '10px',
      margin: '1rem 0 0 0'
    },
    '& .empty--description': {
      marginTop: '1rem',
      background: '#F3F3F3',
      padding: '1rem',
      borderRadius: '10px',
      textAlign: 'center',
      '& p,& i': {
        color: '#6A6F80'
      },
      '& i': {
        fontSize: '20px'
      },
      '& p': {
        fontSize: '14px',
        margin: '10px 0 0 0'
      }
    }
  },
  '& .bigSkelet': {
    width: '90%',
    height: '450px',
    borderRadius: '16px',
    margin: 'auto'
  },
  '& .littleSkelet': {
    width: '90%',
    height: '150px',
    borderRadius: '16px',
    margin: 'auto'
  }
});

const Details = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { data, error, loading, refetch } = useQuery(GET_MANAGER, {
    errorPolicy: 'ignore',
    variables: {
      getManagerId: params.orderId
    },
    notifyOnNetworkStatusChange: true
  });
  const client = useApolloClient();

  useEffect(async () => {
    if (data?.order?.getManager?.is_seen === false) {
      await client.mutate({
        mutation: UPDATE_ORDER,
        variables: {
          content: {
            is_seen: true
          },
          partialUpdateManagerId: params.orderId
        }
      });
    }
  }, [data?.order]);
  if (error) return <h1>Error</h1>;
  if (loading)
    return (
      <Style>
        <div className="back--button" onClick={() => navigate('/orders')}>
          <i className="df-arrow" />
          <h3>سفارش </h3>
        </div>
        <Skeleton className="bigSkelet" />
        <Skeleton className="littleSkelet" />
        <Skeleton className="littleSkelet" />
        <Skeleton className="littleSkelet" />
        <Skeleton className="littleSkelet" />
      </Style>
    );
  const {
    getManager: {
      reference_code,
      created_at,
      order_description,
      fa_registration_type,
      cost,
      shipping_type,
      shipping_name,
      preparing_days,
      shipping_cost,
      deadline_date,
      prepare_deadline,
      pocket_name,
      order_weight,
      address: { province, city, address, lat, lng },
      customer: { name, phone_number }
    }
    // getOrderSend: { shipping_time_sending, approximate_post_cost, weight }
  } = data.order;

  // const shippingType = {
  //   post: 'پست',
  //   postex: 'پستکس',
  //   other: 'پیک فروشگاه',
  //   alopeyk: 'الوپیک',
  //   digiexpress: 'دیجی اکسپرس'
  // };

  return (
    <Style>
      <ActionDrawer
        shipping_type={data?.order?.getManager?.shipping_type}
        status={data?.order?.getManager?.status}
        refetchDetail={refetch}
        close={() => setIsOpen(false)}
        open={isOpen}
      />
      <Grid
        style={{
          position: 'fixed',
          zIndex: '999',
          background: '#f5f6fa'
        }}
        container
      >
        <div className="back--button" onClick={() => navigate('/orders')}>
          <i className="df-arrow" />
          <h3>سفارش {reference_code}</h3>
        </div>
      </Grid>

      <div className="page--content">
        <Box>
          <Grid item xs={12}>
            <Progress orderId={params.orderId} />
          </Grid>
          <Grid item xs={12}>
            <Time orderId={params.orderId} />
          </Grid>
          <Grid marginTop={2} item xs={12}>
            <Table
              data={[
                {
                  key: 'کد سفارش',
                  value: reference_code
                },
                {
                  key: 'مبلغ سفارش',
                  value: cost.toLocaleString() + ' تومان'
                },
                {
                  key: 'مشتری',
                  value: name
                }
              ]}
            />
          </Grid>
        </Box>
        <ToggleBox name="محصولات">
          <Items orderId={params.orderId} />
          <Factor orderId={params.orderId} />
        </ToggleBox>
        <ToggleBox name="اطلاعات سفارش">
          <Table
            data={[
              {
                key: 'کد سفارش',
                value: reference_code
              },
              {
                key: 'تاریخ ثبت سفارش',
                value: formatDate(created_at)
              },
              {
                key: 'روش پرداخت',
                value: fa_registration_type ?? ''
              },
              {
                key: 'مبلغ سفارش',
                value: cost.toLocaleString() + ' تومان'
              },
              {
                key: 'تاریخ تحویل سفارش',
                value: formatDate(deadline_date)
              },
              {
                key: 'زمان آماده سازی',
                value: formatDate(prepare_deadline)
              }
            ]}
          />
        </ToggleBox>
        <ToggleBox name="اطلاعات مشتری">
          <Table
            data={[
              {
                key: 'نام و نام خانوادگی',
                value: name
              },
              {
                key: 'شماره موبایل',
                value: phone_number
              },
              {
                key: 'استان و شهر',
                value: province + ' - ' + city
              }
            ]}
          />
          <div className="border--right_text">
            <p className="key">آدرس</p>
            <p className="value">{address}</p>
          </div>
          {lat && lng && (
            <Grid container style={{ height: '120px', marginTop: '24px' }}>
              <NeshanShowingMap latLng={[lat, lng]} />
            </Grid>
          )}
          <div className="customer--description">
            <p className="customer--description_title">توضیحات مشتری</p>
            {order_description ? (
              <p className="customer--description_text">{order_description}</p>
            ) : (
              <div className="empty--description">
                <i className="df-user" />
                <p>توضیحی ثبت نشده است.</p>
              </div>
            )}
          </div>
        </ToggleBox>
        <ToggleBox name="اطلاعات ارسال">
          <Table
            data={[
              {
                key: 'روش ارسال',
                value: shipping_name
              },
              {
                key: 'هزینه ارسال',
                value: shipping_cost.toLocaleString() + ' تومان'
              },
              {
                key: 'زمان ارسال',
                value: preparing_days + ' روز'
              },
              {
                key: 'وزن مرسوله',
                value: order_weight.toLocaleString() + ' گرم'
              },
              {
                key: 'روش بسته بندی',
                value: pocket_name // Todo : check "روش بسته بندی"
              }
            ]}
          />
          {shipping_type === 'alopeyk' && (
            <>
              <Grid mt={3} container>
                <h4 style={{ margin: 0, color: '#6A6F80' }}>اطلاعات سفیر</h4>
              </Grid>
              <Grid mt={1} container className="address-container">
                <Grid item xs={6}>
                  <div
                    style={{
                      width: '54px',
                      height: '54px',
                      backgroundColor: '#C4C4C4',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: '100%',
                      overflow: 'hidden'
                    }}
                  >
                    {data?.order?.getManager?.courier_info?.avatar?.url ? (
                      <img
                        style={{ width: '100%', height: '100%' }}
                        src={data?.order?.getManager?.courier_info?.avatar?.url}
                      />
                    ) : (
                      <UserSVG />
                    )}
                  </div>
                </Grid>
                <Grid style={{ textAlign: 'end' }} item xs={6}>
                  <h5
                    style={{
                      margin: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      marginBottom: '12px',
                      fontSize: '14px',
                      fontWeight: 400,
                      color: '#000'
                    }}
                  >
                    {data?.order?.getManager?.courier_info?.firstname
                      ? data?.order?.getManager?.courier_info?.firstname +
                        ' ' +
                        data?.order?.getManager?.courier_info?.lastname
                      : 'نامشخص'}
                    <SafirSVG style={{ marginRight: '12px' }} />
                  </h5>
                  <h5
                    style={{
                      margin: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      fontSize: '14px',
                      fontWeight: 400,
                      color: '#000'
                    }}
                  >
                    {data?.order?.getManager?.courier_info?.phone
                      ? data?.order?.getManager?.courier_info?.phone
                      : 'نامشخص'}
                    <PhoneSVG style={{ marginRight: '18px' }} />
                  </h5>
                </Grid>
              </Grid>
            </>
          )}
          {shipping_type === 'postex' ? (
            <div className="border--right_text">
              <Grid container>
                <p className="key black">
                  از طریق لینک زیر می توانید وضعیت سفارش خود را پیگیری کنید.
                </p>
              </Grid>
              <Grid container>
                <a
                  href="https://postex.ir/login"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  https://postex.ir/login
                </a>
              </Grid>
            </div>
          ) : null}
        </ToggleBox>
      </div>
      <ActionButton onClick={() => setIsOpen(true)} orderId={params.orderId} />
    </Style>
  );
};

export default Details;
