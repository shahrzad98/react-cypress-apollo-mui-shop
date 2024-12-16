import * as React from 'react';
import { Box, Card, CircularProgress, Stack, Typography } from '@mui/material';
import { ReactComponent as ArrowLeft } from '../../svg/arrowLeft.svg';
import { styled } from '@mui/styles';
import { useMutation, useQuery } from '@apollo/client';
import { EDIT_PAYMENT } from '../../../../../constant/mutations/payment';
import {
  GET_PAYMENT_METHODS,
  GET_ZARRINPAL_STATUS
} from '../../../../../constant/queries/payment';
import { useNavigate } from 'react-router-dom';
import {
  paymentDictionary,
  statusDictionaryColor,
  statusDictionaryText
} from '../constant';
import { IOSSwitch } from '../../../../../components/shared/UI/IOS_Switch';
import { ReactComponent as RefreshSvg } from '../../../../../static/svg/refresh.svg';

const PaymentListItem = ({ gatewayType, paymentIfo }) => {
  const navigate = useNavigate();

  const StyledCard = styled(Card)({
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
    margin: '16px',
    padding: '20px'
  });

  const StyledBox = styled(Box)({});

  const [createBehPardakht, { loading }] = useMutation(EDIT_PAYMENT);

  const {
    data,
    refetch,
    loading: statusLoading
  } = useQuery(GET_ZARRINPAL_STATUS, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-only'
  });

  const zarrinpalStatus = paymentIfo || data?.payment?.getZarrinPalStatus;
  const isStatusInfo = !!(
    zarrinpalStatus?.is_basic_info_confirmed?.length &&
    !zarrinpalStatus?.is_identity_info_confirmed?.length
  );
  return (
    <StyledCard>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" alignItems="center">
          <Typography>{paymentDictionary[gatewayType]}</Typography>
        </Stack>
        {statusLoading && gatewayType === 5 && (
          <Stack direction="row" alignItems="flex-start" width="35%">
            <CircularProgress size={15} />
          </Stack>
        )}
        {!!(isStatusInfo && !paymentIfo?.is_confirmed) && !statusLoading && (
          <Stack direction="row" alignItems="center">
            {zarrinpalStatus?.is_basic_info_confirmed !== 'confirmed' && (
              <Box mr={1} onClick={() => refetch()} className="gear">
                <RefreshSvg />
              </Box>
            )}
            <Typography
              letterSpacing={-0.5}
              variant="body2"
              color={
                statusDictionaryColor[zarrinpalStatus?.is_basic_info_confirmed]
              }
            >
              {statusDictionaryText[zarrinpalStatus?.is_basic_info_confirmed]}
            </Typography>
          </Stack>
        )}
        {!!zarrinpalStatus?.is_identity_info_confirmed?.length &&
          zarrinpalStatus?.is_identity_info_confirmed !== 'confirmed' &&
          !statusLoading &&
          gatewayType === 5 && (
            <Stack direction="row" alignItems="center">
              {zarrinpalStatus?.is_identity_info_confirmed !== 'confirmed' && (
                <Box mr={1} onClick={() => refetch()}>
                  <RefreshSvg />
                </Box>
              )}
              <Typography
                letterSpacing={-0.5}
                variant="body2"
                color={
                  statusDictionaryColor[
                    zarrinpalStatus?.is_identity_info_confirmed
                  ]
                }
              >
                {
                  statusDictionaryText[
                    zarrinpalStatus?.is_identity_info_confirmed
                  ]
                }
              </Typography>
            </Stack>
          )}
        <Stack direction="row" alignItems="center">
          <StyledBox>
            <Box mr="15px">
              {loading ? (
                <CircularProgress style={{ width: '26px', height: '26px' }} />
              ) : (
                <IOSSwitch
                  disabled={!paymentIfo?.is_confirmed}
                  color="primary"
                  checked={paymentIfo?.is_active}
                  onChange={e => {
                    const checkValue = e.target.checked;
                    createBehPardakht({
                      variables: {
                        editPaymentMethodId: paymentIfo?.id,
                        content: {
                          is_active: checkValue
                        }
                      },
                      update: cache => {
                        const { payment } = cache.readQuery({
                          query: GET_PAYMENT_METHODS
                        });

                        let newProds = payment.getPaymentMethods.map(object => {
                          if (object.id == paymentIfo?.id) {
                            return {
                              ...object,
                              is_active: !e.target.checked
                            };
                          }
                          return object;
                        });

                        cache.writeQuery({
                          query: GET_PAYMENT_METHODS,
                          data: {
                            payment: {
                              ...payment,
                              getPaymentMethods: newProds
                            }
                          }
                        });
                      }
                    });
                  }}
                />
              )}
              {!paymentIfo?.is_confirmed && gatewayType === 4 && (
                <Typography fontSize={'12px'}> ... درحال بررسی </Typography>
              )}
            </Box>
          </StyledBox>
          <ArrowLeft
            onClick={() => {
              navigate(`/store/payment/detail/${paymentIfo?.id}`);
            }}
          />
        </Stack>
      </Stack>
    </StyledCard>
  );
};

export default PaymentListItem;
