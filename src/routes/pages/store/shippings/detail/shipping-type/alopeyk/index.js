import React, { useMemo, useState } from 'react';
import { Style } from './style';
import {
  Box,
  CircularProgress,
  Drawer,
  Grid,
  IconButton,
  Typography
} from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { GET_SHIPPING_METHOD_DETAIL } from '../../../../../../../constant/queries/shipping';
import { IOSSwitch } from '../../../../../../../components/shared/UI/IOS_Switch';
import { EDIT_SHIPPING } from '../../../../../../../constant/mutations/shipping';
import NeshanShowingMap from '../../../../../../../components/shared/mapNeshan/showingMap';
import { ReactComponent as EditShipping } from '../../../../svg/editShipping.svg';
import { ReactComponent as EditIcon } from '../../../../svg/editIcon.svg';
import { ReactComponent as DeleteIcon } from '../../../../svg/deleteIcon.svg';
import { SHIPPING_COSTS } from '../../../create/shipping-type/alopeyk/constants';

const Alopeyk = () => {
  const navigate = useNavigate();
  const params = useParams();

  const { data, refetch } = useQuery(GET_SHIPPING_METHOD_DETAIL, {
    variables: { param: { id: params.id } }
  });

  const shippingDetail = useMemo(() => {
    if (data) {
      const {
        shipping: { getShippingMethodDetail }
      } = data;
      return getShippingMethodDetail;
    }
  }, [data]);

  const [editShipping, { loading: loadingEditShippingAlopeyk }] =
    useMutation(EDIT_SHIPPING);

  const ShippingInformation = [
    {
      label: 'نوع پرداخت',
      type: !shippingDetail?.pay_at_dest ? 'پیش پرداخت' : 'پس پرداخت'
    },
    {
      label: 'نوع هزینه ارسال',
      type: SHIPPING_COSTS.find(
        item =>
          item.value ===
          (+shippingDetail?.cost > 0 ? '1' : String(shippingDetail?.cost))
      )?.label
    },
    {
      label: 'مبلغ',
      type:
        +shippingDetail?.cost > 0
          ? shippingDetail?.cost
          : shippingDetail?.cost == '-1'
          ? 'محاسبه بر اساس پست'
          : 'رایگان'
    }
  ];

  const UserAccountInformation = [
    {
      labelInfo: 'نام',
      userData: shippingDetail.address?.receiver_name || '-'
    },
    {
      labelInfo: 'نام خانوادگی',
      userData: shippingDetail.address?.receiver_lastname || '-'
    },
    {
      labelInfo: 'شماره موبایل',
      userData: shippingDetail.address?.receiver_number || '-'
    },
    {
      labelInfo: 'ایمیل',
      userData: '-'
    },
    {
      labelInfo: 'آدرس مبدا تحویل سفارش',
      userData: shippingDetail.address?.address,
      lat: shippingDetail.address?.latitude,
      lng: shippingDetail.address?.longitude,

      type: 'address'
    }
  ];

  const [drawer, setDrawer] = useState(false);

  const toggleDrawer = event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setDrawer(!drawer);
  };

  return (
    <>
      <Style mx={'16px'}>
        <Grid
          className="header"
          mt={'24px'}
          display={'flex'}
          justifyContent={'space-between'}
        >
          <Grid
            className="back-link"
            onClick={() => navigate('/store/shippings')}
          >
            <i className="df-arrow" />
            <h1>{shippingDetail?.name}</h1>
          </Grid>
          <IconButton onClick={() => setDrawer(true)}>
            <EditShipping />
          </IconButton>
        </Grid>
        <Grid className="header" display={'flex'}>
          <Typography variant="h3">اطلاعات ارسال</Typography>
        </Grid>
        <Box
          mt={'16px'}
          padding={'16px'}
          boxShadow={' 0px 4px 8px rgba(72, 52, 147, 0.08)'}
          borderRadius={'10px'}
          bgcolor={'#fff'}
        >
          <Grid display={'flex'} justifyContent={'space-between'} mb={'24px'}>
            <Typography
              fontSize={'18px'}
              variant="h3"
              lineHeight={'28px'}
              color={'#6A6F80'}
              fontWeight={'500'}
            >
              درون شهری
            </Typography>
            {loadingEditShippingAlopeyk ? (
              <Grid>
                <CircularProgress />
              </Grid>
            ) : (
              <IOSSwitch
                checked={shippingDetail?.my_province_is_active}
                value={shippingDetail?.my_province_is_active}
                onChange={e => {
                  editShipping({
                    variables: {
                      id: params.id,
                      content: {
                        my_province_is_active: e.target.checked
                      }
                    },

                    onCompleted: () => refetch()
                  });
                }}
              />
            )}
          </Grid>
          {ShippingInformation.map((item, index) => (
            <Box
              bgcolor={index % 2 == 0 ? '#F3F3F3' : '#fff'}
              borderRadius={'10px'}
              key={index}
            >
              <Grid
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Grid
                  width={'50%'}
                  ml={'18px'}
                  borderRight={'0.5px solid #fff'}
                >
                  <Typography
                    variant="body2"
                    color={'#ADAABA'}
                    p={'13px'}
                    fontSize={'14px'}
                  >
                    {item.label}
                  </Typography>
                </Grid>
                <Grid width={'50%'} ml={'16px'}>
                  <Typography
                    variant="body2"
                    color={'#6A6F80'}
                    p={'8px'}
                    fontSize={'14px'}
                    noWrap
                  >
                    {item.type}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          ))}
        </Box>
        <Grid className="header" display={'flex'}>
          <Typography variant="h3">اطلاعات حساب کاربری</Typography>
        </Grid>
        <Box
          mt={'16px'}
          padding={'16px'}
          boxShadow={' 0px 4px 8px rgba(72, 52, 147, 0.08)'}
          borderRadius={'10px'}
          bgcolor={'#fff'}
        >
          {UserAccountInformation.map((item, index) => {
            switch (item.type) {
              case 'address':
                return (
                  <React.Fragment key={index}>
                    <Grid
                      sx={{
                        borderLeft: '2px solid #F1F1F1',
                        paddingLeft: '13px'
                      }}
                    >
                      <Typography fontSize={'14px'} color={'#ADAABA'}>
                        {item.labelInfo}
                      </Typography>
                      <Typography
                        mt={'8px'}
                        fontSize={'14px'}
                        color={'#6A6F80'}
                      >
                        {item.userData}
                      </Typography>
                    </Grid>
                    <Grid height={'72px'} mt={'16px'}>
                      {item?.lat && (
                        <NeshanShowingMap latLng={[item.lat, item.lng]} />
                      )}
                    </Grid>
                  </React.Fragment>
                );
              default:
                return (
                  <Box
                    bgcolor={index % 2 == 0 ? '#F3F3F3' : '#fff'}
                    borderRadius={'10px'}
                    key={index}
                  >
                    <Grid
                      display={'flex'}
                      justifyContent={'space-between'}
                      alignItems={'center'}
                    >
                      <Grid
                        width={'50%'}
                        ml={'18px'}
                        borderRight={'0.5px solid #fff'}
                      >
                        <Typography
                          variant="body2"
                          color={'#ADAABA'}
                          p={'13px'}
                          fontSize={'14px'}
                        >
                          {item.labelInfo}
                        </Typography>
                      </Grid>
                      <Grid width={'50%'} ml={'16px'}>
                        <Typography
                          variant="body2"
                          color={'#6A6F80'}
                          p={'8px'}
                          fontSize={'14px'}
                          noWrap
                        >
                          {item.userData}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                );
            }
          })}
        </Box>
        <Drawer
          anchor="bottom"
          open={drawer}
          onClose={toggleDrawer}
          PaperProps={{
            style: { borderRadius: '16px 16px 0px 0px', padding: 20 }
          }}
        >
          <Link
            style={{ textDecoration: 'none' }}
            to={`/store/shippings/edit/${params.id}`}
          >
            <IconButton sx={{ display: 'flex', justifyContent: 'flex-start' }}>
              <EditIcon />
              <Typography ml={'16px'} fontSize={'16px'} color={'#101820'}>
                ویرایش
              </Typography>
            </IconButton>
          </Link>
          <IconButton
            disabled
            sx={{
              display: 'flex',
              marginTop: '14px',
              justifyContent: 'flex-start'
            }}
          >
            <DeleteIcon />
            <Typography ml={'16px'} fontSize={'16px'} color={'#9185BE'}>
              حذف
            </Typography>
          </IconButton>
        </Drawer>
      </Style>
    </>
  );
};

export default Alopeyk;
