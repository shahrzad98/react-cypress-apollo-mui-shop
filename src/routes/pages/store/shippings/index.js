import { useQuery } from '@apollo/client';
import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as EmptyShippingSvg } from '../svg/emptyShipping.svg';
import { GET_SHIPPING_METHODS } from '../../../../constant/queries/shipping';
import { Style } from './style';
import { useMemo } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CenteredLoading from '../../../../components/shared/UI/CenteredLoading';
import React from 'react';

const Shippings = () => {
  const navigate = useNavigate();
  const { data, loading } = useQuery(GET_SHIPPING_METHODS, {
    variables: {
      param: {
        limit: 60
      }
    }
  });
  const shippingContent = useMemo(() => {
    if (data) {
      const {
        shipping: { getShippingMethods }
      } = data;
      return getShippingMethods;
    }
  }, [data]);
  const postShipping = shippingContent?.results?.find(
    S => S.shipping_type === 4
  );
  console.log(postShipping, 'postShipping');
  const isPostRejected =
    !postShipping?.is_national_post_active && postShipping?.is_rejected;
  const isPostWaiting =
    !postShipping?.is_national_post_active && !postShipping?.is_rejected;
  const chips = (chip, activeProvince, activeOtherProvinces) => {
    return (
      <>
        <Grid display={'flex'}>
          {chip.map((item, index) => (
            <Box
              key={index}
              bgcolor={'#F3F3F3'}
              borderRadius={'30px'}
              mx={'6px'}
            >
              <Typography
                variant="body1"
                fontSize={'12px'}
                color={
                  item === 'inner_province' ||
                  ('inner_city' && activeProvince) ||
                  item === 'outer_province' ||
                  ('outer_city' && activeOtherProvinces)
                    ? '#6D5DA9'
                    : '#CBCCCD'
                }
                p={'6px'}
              >
                {item === 'inner_province'
                  ? 'درون استانی'
                  : item === 'outer_province'
                  ? 'برون استانی'
                  : item === 'inner_city'
                  ? 'درون شهری'
                  : 'برون شهری'}
              </Typography>
            </Box>
          ))}
        </Grid>
      </>
    );
  };

  return (
    <Style container>
      <Grid className="header" mx={'16px'} mt={'24px'} mb={'24px'}>
        <Grid className="back-link" onClick={() => navigate('/store')}>
          <i className="df-arrow" />
          <h1>روش ارسال</h1>
        </Grid>
        <Grid
          className="create-shipping"
          onClick={() => navigate('/store/shippings/create')}
        >
          <AddIcon className="plus" />
          <span>تعریف</span>
        </Grid>
      </Grid>
      {loading && <CenteredLoading />}
      {shippingContent?.count == 0 ? (
        <>
          <Grid container className="header">
            <h3> روش ارسال های شما</h3>
          </Grid>
          <Grid className="empty" container>
            <EmptyShippingSvg />
            <Button
              onClick={() => navigate('/store/shippings/create')}
              fullWidth
              style={{ border: '1px solid #483493' }}
              className="btn"
              variant="outlined"
              color="primary"
            >
              تعریف روش ارسال
            </Button>
          </Grid>
        </>
      ) : (
        <Grid width={'100%'} mx={'16px'}>
          {shippingContent?.results?.map(item => {
            return (
              <>
                {item?.shipping_type === 4 &&
                (isPostRejected || isPostWaiting) ? (
                  <Box className="postContainer">
                    <Box className="postTitle bottomDashed">
                      <Typography>پست</Typography>
                      {isPostRejected && (
                        <Box className="postStatus error">
                          <Typography color="error">
                            عدم تایید اطلاعات
                          </Typography>
                        </Box>
                      )}
                      {isPostWaiting && (
                        <Box className="postStatus waiting">
                          <Typography color="#F7941D">
                            در انتظار تایید پست
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    <Box p={2}>
                      <Typography variant="body2" color="#101820" mb={2}>
                        درخواست ساخت حساب کاربری پست برای شما ثبت شد. پس از
                        بررسی اطلاعات توسط پست، نتیجه درخواست شما اعلام می‌شود.
                      </Typography>
                      <Stack direction="row" justifyContent="flex-end">
                        <Button
                          variant="contained"
                          onClick={() => {
                            isPostRejected
                              ? navigate('/store/shippings/create/post')
                              : navigate(`/store/shippings/edit/${item.id}`);
                          }}
                        >
                          {isPostRejected
                            ? ' ویرایش اطلاعات'
                            : 'تنظیمات روش ارسال'}
                        </Button>
                      </Stack>
                    </Box>
                  </Box>
                ) : (
                  <Link
                    style={{ textDecoration: 'none' }}
                    to={`/store/shippings/detail/${item.id}`}
                    key={item.id}
                  >
                    <Box
                      mb={2}
                      bgcolor={'#fff'}
                      borderRadius="10px"
                      sx={{ boxShadow: '0px 4px 8px rgba(72, 52, 147, 0.08)' }}
                    >
                      <Grid
                        display={'flex'}
                        width={'100%'}
                        alignItems={'center'}
                        px={'16px'}
                        justifyContent={'space-between'}
                      >
                        <Grid
                          width={'100%'}
                          sx={{ borderRight: '0.5px solid #DAD6E9' }}
                          display={'flex'}
                          justifyContent={'space-between'}
                        >
                          <Typography
                            // width={'100%'}
                            color={'#101820'}
                            fontSize={'16px'}
                            variant="body1"
                          >
                            {item.name}
                          </Typography>
                          {chips(
                            item.chips_values,
                            item.my_province_is_active,
                            item.other_provinces_is_active
                          )}
                        </Grid>
                        <IconButton sx={{ paddingRight: 0 }}>
                          <ChevronLeftIcon />
                        </IconButton>
                      </Grid>
                    </Box>
                  </Link>
                )}
              </>
            );
          })}
        </Grid>
      )}
    </Style>
  );
};

export default Shippings;
