import * as React from 'react';
import {
  Button,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  Typography
} from '@mui/material';
import { StyledGrid } from '../style';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { toast, ToastContainer } from 'react-toastify';
import { InfoOutlined } from '@mui/icons-material';
import { SUBMIT_ZARRINPAL_CREATION } from '../../../../../../../../constant/mutations/payment';
import FeedbackModal from './feedbackModal';
import CustomTooltip from './tooltip';

const HasInfo = ({ level }) => {
  const navigate = useNavigate();
  const [createZarrinpal, { loading }] = useMutation(SUBMIT_ZARRINPAL_CREATION);

  const [feedbackShow, setFeedbackShow] = useState(false);

  async function creatZarrinpalHandle() {
    await createZarrinpal({
      onCompleted: () => {
        setFeedbackShow(true);
      },
      onError: error => {
        const errorMessage =
          JSON.parse(JSON.stringify(error))?.graphQLErrors[0]?.extensions
            ?.response?.body?.detail || 'مشکلی پیش آمده دوباره تلاش کنید';
        toast(errorMessage, {
          position: 'bottom-center',
          // autoClose: 2000,
          hideProgressBar: true,
          draggable: true,
          closeButton: false,
          icon: <InfoOutlined />,
          style: {
            backgroundColor: '#EA002A33',
            color: '#EA002A'
          }
        });
      }
    });
  }

  function closeFeedback() {
    setFeedbackShow(false);
    navigate('/store/payment');
  }

  async function creatPaymentHandle() {
    await createZarrinpal({
      onCompleted: () => {
        setFeedbackShow(true);
      },
      onError: error => {
        const errorMessage =
          JSON.parse(JSON.stringify(error))?.graphQLErrors[0]?.extensions
            ?.response?.body?.detail || 'مشکلی پیش آمده دوباره تلاش کنید';
        toast(errorMessage, {
          position: 'bottom-center',
          autoClose: 2000,
          hideProgressBar: true,
          draggable: true,
          closeButton: false,
          icon: <InfoOutlined />,
          style: {
            backgroundColor: '#EA002A33',
            color: '#EA002A'
          }
        });
      }
    });
  }

  const isSilverOrGold = level === 'SILVER' || level === 'GOLD';
  return (
    <>
      <FeedbackModal
        modalType="success"
        onClose={closeFeedback}
        open={feedbackShow}
      />
      <ToastContainer />

      <StyledGrid container>
        <Grid className="header">
          <Grid
            className="back-link"
            onClick={() => navigate('/store/payment/create/zarrinpal/otp')}
          >
            <i className="df-arrow" />
            <h1>زرین پال</h1>
          </Grid>
        </Grid>
        <Grid w={1} className="container">
          {level === 'BASIC' && (
            <>
              <Stack direction="row" mb={3}>
                <Typography
                  fontSize="18px"
                  fontWeight={500}
                  color="#6A6F80"
                  mr={1}
                >
                  کاربر آبی
                </Typography>
                <CustomTooltip type="BASIC" />
              </Stack>
              <Typography mb="60px">
                درگاه پرداخت شما بعنوان “کاربر آبی” آماده ساخت است. می توانید با
                دکمه تایید ، درخواست خود را نهایی کنید.
              </Typography>
              <Stack direction="row" justifyContent="flex-end" mb={3}>
                <Button
                  onClick={creatZarrinpalHandle}
                  data-cy="accept"
                  variant="contained"
                  sx={{ minWidth: '133px', height: '46px', fontSize: 14 }}
                >
                  تایید
                  {loading && (
                    <CircularProgress
                      size={20}
                      sx={{ ml: 1 }}
                      color="inherit"
                    />
                  )}
                </Button>
              </Stack>
              <Divider orientation="horizontal" />
            </>
          )}

          <Stack direction="row" my={3}>
            <Typography fontSize="18px" fontWeight={500} color="#6A6F80" mr={1}>
              کاربر نقره ای
            </Typography>
            <CustomTooltip type="SILVER" />
          </Stack>
          <Typography mb="60px">
            هم چنین می توانید برای تبدیل شدن به کاربر نقره ای زرین پال ، مدارک
            احراز هویتی خود را از طریق زیر کامل تر کنید.
          </Typography>
          <Stack direction="row" justifyContent="flex-end" mb={20}>
            {isSilverOrGold ? (
              <Button
                onClick={creatPaymentHandle}
                data-cy="accept"
                variant="contained"
                sx={{ minWidth: '133px', height: '46px', fontSize: 14 }}
              >
                تایید
                {loading && (
                  <CircularProgress size={20} sx={{ ml: 1 }} color="inherit" />
                )}
              </Button>
            ) : (
              <Button
                onClick={() =>
                  navigate('/store/payment/create/zarrinpal/upload')
                }
                data-cy="accept"
                variant="outlined"
                sx={{ minWidth: '202px', height: '46px', fontSize: 14 }}
              >
                بارگزاری مدارک احراز هویتی
              </Button>
            )}
          </Stack>
        </Grid>
      </StyledGrid>
    </>
  );
};

export default HasInfo;
