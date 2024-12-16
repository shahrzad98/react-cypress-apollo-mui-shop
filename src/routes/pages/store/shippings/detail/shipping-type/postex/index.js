import React, { useMemo, useState } from 'react';
import { Style } from './style';
import { Box, Drawer, Grid, IconButton, Typography } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { GET_SHIPPING_METHOD_DETAIL } from '../../../../../../../constant/queries/shipping';
import { IOSSwitch } from '../../../../../../../components/shared/UI/IOS_Switch';
import { EDIT_SHIPPING } from '../../../../../../../constant/mutations/shipping';
import NeshanShowingMap from '../../../../../../../components/shared/mapNeshan/showingMap';
import { ReactComponent as EditShipping } from '../../../../svg/editShipping.svg';
import { ReactComponent as EditIcon } from '../../../../svg/editIcon.svg';
import { ReactComponent as DeleteIcon } from '../../../../svg/deleteIcon.svg';
import {
  SHIPPING_AREA,
  SHIPPING_COSTS,
  SHIPPING_INFO_DETAIL,
  toastSuccess,
  toastWarning
} from '../../../create/shipping-type/postex/constants';
import { toast, ToastContainer } from 'react-toastify';

const Postex = () => {
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

  const [editShipping] = useMutation(EDIT_SHIPPING);

  const values = {
    my_province: {
      time_sending: shippingDetail?.time_sending,
      payment_type: SHIPPING_COSTS.find(
        item =>
          item.value == (+shippingDetail?.cost > 0 ? '1' : shippingDetail?.cost)
      )?.label,
      cost:
        +shippingDetail?.cost > 0
          ? shippingDetail?.cost
          : +shippingDetail?.cost === 0
          ? 'رایگان'
          : 'بر اساس محاسبه پستکس'
    },
    other_provinces: {
      time_sending: shippingDetail?.other_provinces_time_sending,
      payment_type: SHIPPING_COSTS.find(
        item =>
          item.value ==
          (+shippingDetail?.other_provinces_cost > 0
            ? '1'
            : shippingDetail?.other_provinces_cost)
      )?.label,
      cost:
        +shippingDetail?.other_provinces_cost > 0
          ? shippingDetail?.other_provinces_cost
          : +shippingDetail?.other_provinces_cost === 0
          ? 'رایگان'
          : 'بر اساس محاسبه پستکس'
    }
  };

  const UserAccountInformation = [
    {
      labelInfo: 'شماره موبایل',
      userData: shippingDetail?.postex_username
    },
    // {
    //   labelInfo: 'کد ملی',
    //   userData: shippingDetail?.address?.getUserRead?.my_store[0]?.first_name
    // },
    {
      labelInfo: 'کد پستی',
      userData: shippingDetail?.address?.postal_code
    },
    {
      labelInfo: 'استان',
      userData: shippingDetail?.address?.province
    },
    {
      labelInfo: 'شهر یا محله',
      userData: shippingDetail?.address?.city
    },
    {
      labelInfo: 'آدرس مبدا تحویل سفارش',
      userData: shippingDetail?.address?.address,
      lat: shippingDetail?.address?.latitude,
      lng: shippingDetail?.address?.longitude,

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
    <Style mx={'16px'}>
      <ToastContainer />
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
      <Grid
        padding={'16px'}
        boxShadow={' 0px 4px 8px rgba(72, 52, 147, 0.08)'}
        borderRadius={'10px'}
        mt="16px"
        bgcolor={'#fff'}
      >
        {SHIPPING_AREA.map(area => (
          <Box key={area.name} mb={'25px'}>
            <Grid display={'flex'} justifyContent={'space-between'} mb={'24px'}>
              <Typography
                fontSize={'18px'}
                variant="h3"
                lineHeight={'28px'}
                color={'#6A6F80'}
                fontWeight={'500'}
              >
                {area.label}
              </Typography>
              <IOSSwitch
                checked={shippingDetail?.[area.activeName]}
                onChange={e => {
                  editShipping({
                    variables: {
                      id: params.id,
                      content: {
                        [area.activeName]: e.target.checked
                      }
                    },
                    onCompleted: data => {
                      refetch();
                      data.shipping.editShipping?.[area.activeName]
                        ? toast('روش ارسال پستکس فعال شد.', toastSuccess)
                        : toast('روش ارسال پستکس غیر فعال شد.', toastWarning);
                    }
                  });
                }}
              />
            </Grid>
            {SHIPPING_INFO_DETAIL.map((item, index) => (
              <Box
                bgcolor={index % 2 == 0 ? '#F3F3F3' : '#fff'}
                borderRadius={'10px'}
                key={item.label}
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
                      {values?.[area.name]?.[item.name]}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Box>
        ))}
      </Grid>

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
        {UserAccountInformation.map((item, index) =>
          item.type === 'address' ? (
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
                <Typography mt={'8px'} fontSize={'14px'} color={'#6A6F80'}>
                  {item.userData}
                </Typography>
              </Grid>
              <Grid height={'72px'} mt={'16px'}>
                {item?.lat && (
                  <NeshanShowingMap latLng={[item.lat, item.lng]} />
                )}
              </Grid>
            </React.Fragment>
          ) : (
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
          )
        )}
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
  );
};

export default Postex;
