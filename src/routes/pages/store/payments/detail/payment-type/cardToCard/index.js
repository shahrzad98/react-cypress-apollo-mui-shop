import React, { useMemo } from 'react';
import {
  Box,
  CircularProgress,
  Drawer,
  Grid,
  IconButton,
  Stack,
  Typography
} from '@mui/material';
import { styled } from '@mui/styles';
import { useState } from 'react';
import { ReactComponent as EditPayment } from '../../../svg/editPayment.svg';
import { ReactComponent as EditIconPayment } from '../../../svg/editIconPayment.svg';
import { ReactComponent as DeleteIconPayment } from '../../../svg/deleteIconPayment.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { DELETE_PAYMENT } from '../../../../../../../constant/mutations/payment';
import ConfirmModal from '../../../../../../../components/createProduct/modal/confirmModal/index';

const DetailsCardToCard = ({ data, loading }) => {
  const navigate = useNavigate();
  const [deleteCardtocard] = useMutation(DELETE_PAYMENT);
  const cardToCardData = useMemo(() => {
    if (data) {
      const {
        payment: { getPaymentMethod }
      } = data;
      return getPaymentMethod;
    }
  }, [data]);
  const paymentInformation = [
    {
      label: 'شماره حساب',
      type: cardToCardData?.card_number.split(/(?<=^(?:.{4})+)(?!$)/).join('-')
    },
    {
      label: 'صاحب حساب',
      type: cardToCardData?.first_name + ' ' + cardToCardData?.last_name
    }
  ];

  const timingInformation = [
    {
      label: 'مهلت بررسی درخواست',
      type: `${cardToCardData?.cancel_duration_for_approve_order} ساعت`
    },
    {
      label: 'مهلت پرداخت مشتری',
      type: `${cardToCardData?.card_to_card_customer_payment_duration} ساعت`
    },
    {
      label: 'زمان فعالیت',
      type: `${
        cardToCardData?.card_to_card_working_in_holidays
          ? 'نامحدود'
          : '9 صبح تا 9 شب'
      }`
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
  const StyledBox = styled(Box)({
    borderRight: ' 3px solid #DAD6E9',
    padding: '12px',
    margin: '16px'
  });
  const [deleteModal, setDeleteModal] = useState(false);

  return (
    <>
      {loading ? (
        <Grid container mt="200px" justifyContent="center">
          <CircularProgress />
        </Grid>
      ) : (
        <>
          <Grid display={'flex'} justifyContent={'space-between'}>
            {deleteModal && (
              <ConfirmModal
                submit={() => {
                  deleteCardtocard({
                    variables: {
                      id: cardToCardData.id
                    },
                    onCompleted: () => navigate('/store/payment')
                  });
                }}
                text={'آیا از حذف روش پرداخت کارت به کارت اطمینان دارید؟!'}
                close={() => {
                  setDeleteModal(false), setDrawer(false);
                }}
              />
            )}
            <Stack
              direction="row"
              alignItems="center"
              onClick={() => navigate('/store/payment')}
              my="24px"
              mx="16px"
            >
              <i className="df-arrow" />
              <Typography fontSize="20px" fontWeight={500} mx={1}>
                کارت به کارت
              </Typography>
            </Stack>
            <IconButton
              onClick={() => setDrawer(true)}
              sx={{ paddingRight: '24px' }}
            >
              <EditPayment />
            </IconButton>
          </Grid>

          <StyledBox>
            <Typography fontSize="18px" fontWeight={500} color={'#6A6F80'}>
              اطلاعات روش پرداخت
            </Typography>
          </StyledBox>
          <Box
            mx={'16px'}
            mt={'16px'}
            padding={'16px'}
            boxShadow={'0px 4px 8px rgba(72, 52, 147, 0.08)'}
            borderRadius={'10px'}
            bgcolor={'#fff'}
          >
            {paymentInformation.map((i, index) => (
              <Box
                key={i.label}
                bgcolor={index % 2 == 0 ? '#F3F3F3' : '#fff'}
                borderRadius={'10px'}
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
                      fontSize={'11px'}
                    >
                      {i.label}
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
                      {i.type}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Box>
          <StyledBox>
            <Typography fontSize="18px" fontWeight={500} color={'#6A6F80'}>
              اطلاعات زمان‌بندی{' '}
            </Typography>
          </StyledBox>
          <Box
            mx={'16px'}
            mt={'16px'}
            padding={'16px'}
            boxShadow={'0px 4px 8px rgba(72, 52, 147, 0.08)'}
            borderRadius={'10px'}
            bgcolor={'#fff'}
          >
            {timingInformation.map((i, index) => (
              <Box
                key={i.label}
                bgcolor={index % 2 == 0 ? '#F3F3F3' : '#fff'}
                borderRadius={'10px'}
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
                      fontSize={'11px'}
                    >
                      {i.label}
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
                      {i.type}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            ))}
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
              to={`/store/payment/edit/${cardToCardData.id}`}
            >
              <IconButton
                sx={{ display: 'flex', justifyContent: 'flex-start' }}
              >
                <EditIconPayment />
                <Typography ml={'16px'} fontSize={'16px'} color={'#101820'}>
                  ویرایش
                </Typography>
              </IconButton>
            </Link>
            <IconButton
              onClick={() => setDeleteModal(true)}
              sx={{
                display: 'flex',
                marginTop: '14px',
                justifyContent: 'flex-start'
              }}
            >
              <DeleteIconPayment />
              <Typography ml={'16px'} fontSize={'16px'} color={'#9185BE'}>
                حذف
              </Typography>
            </IconButton>
          </Drawer>
        </>
      )}
    </>
  );
};

export default DetailsCardToCard;
