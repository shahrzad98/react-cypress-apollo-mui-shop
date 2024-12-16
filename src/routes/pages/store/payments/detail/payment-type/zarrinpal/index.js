import * as React from 'react';
import DetailTable from '../../../../../../../components/shared/UI/detailTable';
import { Alert, Box, Grid, Stack, Typography } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import { StyledGrid } from '../../../create/payment-type/zarrinpal/style';
import { useNavigate, useParams } from 'react-router-dom';
import {
  withLevelZarrinpalDetailTableRows,
  zarrinpalDetailTableRows
} from '../../../constant';
import { statusDictionaryColor, statusDictionaryText } from '../../../constant';
import StatusAlert from './StatusAlert';
import { ReactComponent as InfoSVG } from '../../../../../../../static/svg/info.svg';

const ZarrinpalDetail = ({ data }) => {
  const params = useParams();

  const paymentInfo = data?.payment?.getPaymentMethod;
  const navigate = useNavigate();

  const isIdentityStatus = !!paymentInfo?.is_identity_info_confirmed?.length;
  const isNotConfirmed =
    paymentInfo?.is_basic_info_confirmed === 'not confirmed' ||
    paymentInfo?.is_identity_info_confirmed === 'not confirmed';

  const hasLevel =
    paymentInfo?.level === 'BASIC' || paymentInfo?.level === 'SILVER';

  return (
    <StyledGrid container>
      <ToastContainer />
      <Grid className="header" width={1}>
        <Grid className="back-link">
          <Stack
            width={1}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack
              direction="row"
              alignItems="center"
              onClick={() => navigate('/store/payment')}
            >
              <i className="df-arrow" />
              <h1>زرین پال</h1>
            </Stack>

            {paymentInfo?.is_identity_info_confirmed === 'in processing' && (
              <Typography
                variant="caption"
                fontSize={14}
                color={
                  statusDictionaryColor[paymentInfo?.is_identity_info_confirmed]
                }
              >
                {statusDictionaryText[paymentInfo?.is_identity_info_confirmed]}
              </Typography>
            )}
            {!isIdentityStatus &&
              paymentInfo?.is_basic_info_confirmed === 'in processing' && (
                <Typography
                  variant="caption"
                  fontSize={14}
                  color={
                    statusDictionaryColor[paymentInfo?.is_basic_info_confirmed]
                  }
                >
                  {statusDictionaryText[paymentInfo?.is_basic_info_confirmed]}
                </Typography>
              )}
          </Stack>
        </Grid>
      </Grid>
      {paymentInfo?.is_basic_info_confirmed === 'confirmed' &&
        paymentInfo?.level === 'BASIC' && (
          <>
            <Grid className="header">
              <Typography variant="h6" mt={1}>
                تایید اطلاعات
              </Typography>
            </Grid>
            <Grid className="tableContainer">
              <StatusAlert type="info" />
            </Grid>
          </>
        )}
      {isNotConfirmed && (
        <>
          <Grid className="header">
            <Typography variant="h6" mt={1}>
              عدم تایید اطلاعات
            </Typography>
          </Grid>
          <Grid className="tableContainer">
            <StatusAlert type="error" />
          </Grid>
        </>
      )}
      <Grid className="header">
        <Typography variant="h6">اطلاعات روش پرداخت</Typography>
      </Grid>
      <Grid className="tableContainer">
        <Box>
          <DetailTable
            tooltip={[{ name: 'سطح' }]}
            rows={
              hasLevel
                ? withLevelZarrinpalDetailTableRows(paymentInfo)
                : zarrinpalDetailTableRows(paymentInfo)
            }
          />
          <Box p={2}>
            <Typography color="#ADAABA" fontSize={14} mb={1}>
              آدرس
            </Typography>
            <Typography color="#6A6F80" fontSize={14} mb={3}>
              {paymentInfo?.address}
            </Typography>
          </Box>
          {paymentInfo?.level === 'SILVER' && (
            <Alert
              severity="info"
              icon={false}
              sx={{ borderLeft: '4px solid #0F62FE', padding: '10px' }}
            >
              <Stack direction="row" alignItems="center">
                <Box width={40} mr={2}>
                  <InfoSVG fill="#0F62FE" />
                </Box>
                <Typography fontSize={14} letterSpacing={-0.5}>
                  می توانید برای ویرایش حساب کاربری زرین پال به پنل کاربری خود
                  در سایت مراجعه کنید.
                </Typography>
              </Stack>
            </Alert>
          )}
          {paymentInfo?.level === 'BASIC' && (
            <Alert
              severity="info"
              icon={false}
              sx={{ borderLeft: '4px solid #0F62FE', padding: '10px' }}
            >
              <Stack direction="row" alignItems="center">
                <Box width={40} mr={2}>
                  <InfoSVG fill="#0F62FE" />
                </Box>
                <Typography
                  fontSize={14}
                  textAlign="justify"
                  letterSpacing={-0.5}
                >
                  می توانید برای تبدیل شدن به “کاربر نقره ای” زرین پال ، مدارک
                  احراز هویتی خود را از طریق زیر کامل تر کنید.
                </Typography>
              </Stack>

              <Stack direction="row" justifyContent="flex-end" mt={2}>
                <Typography
                  color="#0F62FE"
                  fontWeight={500}
                  onClick={() =>
                    navigate(
                      `/store/payment/create/zarrinpal/upload/${params.id}`,
                      {
                        state: { from: `/store/payment/detail/${params.id}` }
                      }
                    )
                  }
                >
                  بارگزاری مدارک احراز هویتی
                </Typography>
              </Stack>
            </Alert>
          )}
        </Box>
      </Grid>
    </StyledGrid>
  );
};

export default ZarrinpalDetail;
