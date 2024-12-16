import React, { useMemo } from 'react';
import { Style } from '../style';
import { Box, Grid, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Alopeyk } from '../../svg/alopeyk.svg';
import { ReactComponent as Digiexpress } from '../../svg/digiexpress.svg';
import { ReactComponent as Tipax } from '../../svg/tipax.svg';
import { ReactComponent as Post } from '../../svg/post.svg';
import { ReactComponent as SettingsSVG } from '../../svg/postex.svg';
import { useQuery } from '@apollo/client';
import { GET_SHIPPING_METHODS } from '../../../../../constant/queries/shipping';
import CenteredLoading from '../../../../../components/shared/UI/CenteredLoading';

const CreateShipping = () => {
  const navigate = useNavigate();

  const { data, loading } = useQuery(GET_SHIPPING_METHODS, {
    variables: {
      param: {
        limit: 60
      }
    }
  });

  const dataShipping = useMemo(() => {
    if (data) {
      const {
        shipping: { getShippingMethods: shippingContent }
      } = data;
      return [
        {
          name: 'post',
          title: 'پست',
          icon: Post,
          shippingType: 4
        },
        {
          name: 'alopeyk',
          title: 'الوپیک',
          icon: Alopeyk,
          shippingType: 5
        },
        {
          name: 'postex',
          title: 'پستکس',
          icon: SettingsSVG,
          shippingType: 2
        },
        {
          name: 'digiexpress',
          title: 'دیجی اکسپرس',
          icon: Digiexpress,
          shippingType: 6
        },
        {
          name: 'tipax',
          title: 'تیپاکس',
          icon: Tipax,
          shippingType: 7
        }
      ].map(shippingMethod => ({
        ...shippingMethod,
        disabled:
          shippingMethod.name == 'digiexpress' || shippingMethod.name == 'tipax'
            ? true
            : !!shippingContent.status_count.find(
                shippingStatus =>
                  // TODO ::: for post method .... if post method is ready delete this line :::
                  shippingMethod.name === 'post' ||
                  //
                  (shippingStatus.shipping_type ===
                    shippingMethod.shippingType &&
                    shippingStatus.total > 0)
              )
      }));
    } else {
      return [];
    }
  }, [data]);

  return (
    <>
      <Style mx={'16px'}>
        <Grid className="header" mt={'24px'} mb={'24px'}>
          <Grid
            className="back-link"
            onClick={() => navigate('/store/shippings')}
          >
            <i className="df-arrow" />
            <h1>تعریف روش ارسال</h1>
          </Grid>
        </Grid>
        <Grid className="header" display={'flex'}>
          <Typography
            borderLeft={'2px solid #DAD6E9'}
            paddingLeft={'12px'}
            variant="body1"
            color={'#101820'}
            fontSize={'14px'}
          >
            روش ارسال مورد نظر خود را برای ساخت و فعال سازی انتخاب کنید.
          </Typography>
        </Grid>
        {loading ? (
          <CenteredLoading />
        ) : (
          <Box height={'70vh'} overflow={'auto'}>
            <Grid
              flexWrap={'wrap'}
              mt={3}
              width={'100%'}
              justifyContent="center"
              display={'flex'}
            >
              {dataShipping.map((item, index) => (
                <Box
                  key={index}
                  xs={6}
                  mr={'8px'}
                  width={'163px'}
                  height={'148px'}
                  boxShadow={'0px 4px 8px rgba(72, 52, 147, 0.08)'}
                  borderRadius={'10px'}
                  bgcolor={item.disabled ? '#ccc' : '#fff'}
                  mt={'16px'}
                  display={'flex'}
                  flexDirection={'column'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  onClick={() =>
                    // !item.disabled &&
                    navigate(`/store/shippings/create/${item.name}`)
                  }
                >
                  <item.icon />
                  <h3 style={{ fontSize: '14px' }}>{item.title}</h3>
                </Box>
              ))}
              <Box
                xs={6}
                width={'163px'}
                height={'148px'}
                boxShadow={'0px 4px 8px rgba(72, 52, 147, 0.08)'}
                border={'0.5px dashed #6A6F80'}
                borderRadius={'10px'}
                bgcolor={'#fff'}
                mt={'16px'}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                onClick={() => navigate('/store/shippings/create/other')}
              >
                <AddIcon fontSize="large" />
                <h3 style={{ fontSize: '14px' }}>روش های دیگر</h3>
              </Box>
            </Grid>
          </Box>
        )}
      </Style>
    </>
  );
};

export default CreateShipping;
