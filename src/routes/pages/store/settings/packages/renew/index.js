import { Button, CircularProgress, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Style } from './style';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import {
  GET_BUYABLE_PACKAGE,
  GET_CURRENT_PACKAGE
} from '../../../../../../constant/queries/settings';
import {
  formatDate,
  formatNumber,
  redirectToAP,
  redirectToSEP
} from '../../../../../../utils/helpers';
import { ReactComponent as GiftSVG } from '../../../svg/gift.svg';
import { ReactComponent as SuccessGiftSVG } from '../../../svg/successGift.svg';
import {
  BUY_PACKAGE,
  CHECK_PACKAGE_VOUCHER
} from '../../../../../../constant/mutations/store';
import FillDataModal from './fillDataModal';

const PackageRenew = () => {
  const { data, loading } = useQuery(GET_BUYABLE_PACKAGE);
  // eslint-disable-next-line no-unused-vars
  const { data: currentPackageData } = useQuery(GET_CURRENT_PACKAGE);
  const navigate = useNavigate();

  const translateDuration = duration => {
    return `${duration} روزه`;
  };

  const [voucherInput, setVoucherInput] = useState(false);
  const [voucherCode, setVoucherCode] = useState('');
  const [voucherError, setVoucherError] = useState(false);
  const [voucherMessage, setVoucherMessage] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [checkVoucher, { loading: checkVoucherLoading }] = useMutation(
    CHECK_PACKAGE_VOUCHER
  );
  const [buyPackage, { data: buyPackageData, loading: buyPackageLoading }] =
    useMutation(BUY_PACKAGE);

  const buyHandler = async () => {
    await buyPackage({
      variables: {
        content: {
          package: data && data?.packages?.getPackages?.results[0]?.id,
          ...(!voucherError && voucherMessage && { voucher: voucherCode }),
          is_reserved: false
        }
      }
    });
  };

  useEffect(() => {
    if (buyPackageData?.packages.buyPackage.charge_result === false) {
      if (buyPackageData?.packages.buyPackage.gateway_type === 'AsanPardakht') {
        redirectToAP(buyPackageData?.packages.buyPackage.token);
      } else if (buyPackageData?.packages.buyPackage.gateway_type === 'SEP') {
        redirectToSEP(buyPackageData?.packages.buyPackage.token);
      }
    }
    if (buyPackageData?.packages.buyPackage.charge_result === true) {
      navigate('/store/settings/package');
    }
  }, [buyPackageData?.packages]);

  const totalPrice = () => {
    const cost = data?.packages?.getPackages?.results[0]?.cost || 0;
    let finalCost;

    if (
      data?.packages?.getPackages?.results[0]?.renew_voucher &&
      currentPackageData?.packages?.getCurrentPackage?.can_use_renew_voucher
    ) {
      if (data?.packages?.getPackages?.results[0]?.renew_voucher_type === 1) {
        finalCost =
          cost -
          cost *
            (data?.packages?.getPackages?.results[0]?.renew_voucher_amount /
              100);
      } else {
        finalCost =
          cost - data?.packages?.getPackages?.results[0]?.renew_voucher_amount;
      }
    } else {
      finalCost = cost;
    }
    // finalCost -= voucherAmount;
    if (finalCost < 0) return 0;
    return finalCost;
  };

  return (
    <Style>
      <Grid
        onClick={() => navigate('/store/settings/package')}
        container
        className="header"
      >
        <i className="df-arrow" />
        <h1>تمدید اعتبار پکیج</h1>
      </Grid>
      <Grid alignContent="flex-start" className="content" container mt={3}>
        <Grid container>
          <h4>اطلاعات پکیج</h4>
        </Grid>
        <Grid mt={2} container>
          <Grid item xs={6} className="right-odd-row">
            <h5>نام پکیج</h5>
          </Grid>
          <Grid item xs={6} className="left-odd-row">
            <h6>
              {(data && data?.packages?.getPackages?.results[0]?.name) ||
                '----------'}
            </h6>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6} className="right-even-row">
            <h5>مدت اعتبار</h5>
          </Grid>
          <Grid item xs={6} className="left-even-row">
            <h6>
              {(data &&
                translateDuration(
                  data?.packages?.getPackages?.results[0]?.duration
                )) ||
                '----------'}
            </h6>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6} className="right-odd-row">
            <h5>تاریخ انقضا</h5>
          </Grid>
          <Grid item xs={6} className="left-odd-row">
            <h6>
              {(data &&
                formatDate(
                  new Date(
                    new Date().getTime() +
                      data?.packages?.getPackages?.results[0]?.duration *
                        86400000
                  )
                )) ||
                '----------'}
            </h6>
          </Grid>
        </Grid>
        <Grid mt={3} mb={3} container className="divider"></Grid>
        <Grid className="factor" container>
          <Grid container className="header_factor">
            <h6>فاکتور</h6>
          </Grid>
          <Grid container className="content_factor">
            <Grid mt={1} container justifyContent="space-between">
              <p className="title">قیمت پکیج</p>
              <p className="value">
                {data &&
                  formatNumber(data?.packages?.getPackages?.results[0]?.cost)}
                <span className="little">تومان</span>
              </p>
            </Grid>
            <Grid mt={2} container justifyContent="space-between">
              <p className="title">تخفیف تمدید پکیج</p>
              <p style={{ color: '#6D5DA9' }} className="value">
                {data?.packages?.getPackages?.results[0]?.renew_voucher &&
                currentPackageData?.packages?.getCurrentPackage
                  ?.can_use_renew_voucher
                  ? data?.packages?.getPackages?.results[0]
                      ?.renew_voucher_type === 1
                    ? '%' +
                      data?.packages?.getPackages?.results[0]
                        ?.renew_voucher_amount
                    : data?.packages?.getPackages?.results[0]?.renew_voucher_amount.toLocaleString() +
                      ' تومان'
                  : '-'}
                {/* <span className="little">تومان</span> */}
              </p>
            </Grid>
            <Grid mt={2} container justifyContent="space-between">
              <p className="title">مالیات</p>
              <p className="value">
                {!voucherError && voucherMessage
                  ? formatNumber(0.09 * (totalPrice() - voucherMessage))
                  : data
                  ? formatNumber(0.09 * totalPrice())
                  : ''}
                <span className="little">تومان</span>
              </p>
            </Grid>
            {!voucherError && voucherMessage && (
              <Grid mt={2} container justifyContent="space-between">
                <p className="title">کد تخفیف</p>
                <p style={{ color: '#6D5DA9' }} className="value">
                  {formatNumber(voucherMessage)}
                  <span className="little">تومان</span>
                </p>
              </Grid>
            )}
            <Grid
              container
              style={{
                borderTop: '0.5px dashed #C9C3E0',
                marginTop: '20px',
                marginBottom: '20px'
              }}
            ></Grid>
            <Grid container justifyContent="space-between">
              <p style={{ fontWeight: '500' }} className="title">
                مبلغ قابل پرداخت
              </p>
              <p style={{ fontWeight: '500' }} className="value">
                {!voucherError && voucherMessage
                  ? formatNumber(
                      totalPrice() -
                        voucherMessage +
                        0.09 * (totalPrice() - voucherMessage)
                    )
                  : data
                  ? formatNumber(totalPrice() + 0.09 * totalPrice())
                  : ''}
                {/* {totalPrice()} */}
                <span className="little">تومان</span>
              </p>
            </Grid>
          </Grid>
        </Grid>
        {voucherInput ? (
          <Grid mt={3} container>
            <Grid container>
              <h4>کد تخفیف</h4>
            </Grid>
            <Grid container mt={1}>
              <TextField
                error={voucherError && voucherMessage}
                helperText={voucherError && voucherMessage}
                value={voucherCode}
                onChange={e => {
                  setVoucherCode(e.target.value);
                  setVoucherError(false);
                  setVoucherMessage('');
                }}
                className="voucher_input"
                InputProps={{
                  endAdornment: (
                    <Button
                      disabled={checkVoucherLoading}
                      onClick={() => {
                        checkVoucher({
                          variables: {
                            params: {
                              package:
                                data &&
                                data?.packages?.getPackages?.results[0]?.id,
                              code: voucherCode
                            }
                          },
                          onError: () => {
                            setVoucherError(true);
                            setVoucherMessage('کد تخفیف وارد شده معتبر نیست.');
                          },
                          onCompleted: dataN => {
                            setVoucherError(false);
                            setVoucherMessage(
                              `${dataN?.packages?.checkPackageVoucher?.discount}`
                            );
                            setVoucherInput(false);
                          }
                        });
                      }}
                    >
                      {checkVoucherLoading ? (
                        <CircularProgress
                          style={{ width: '25px', height: '25px' }}
                        />
                      ) : (
                        'ثبت'
                      )}
                    </Button>
                  )
                }}
                fullWidth
              />
            </Grid>
          </Grid>
        ) : (
          <Grid
            alignItems="center"
            justifyContent="space-between"
            mt={3}
            container
            className="voucher_ticket"
          >
            {!voucherError && voucherMessage ? (
              <p style={{ color: '#00CE7D' }}>
                <SuccessGiftSVG />
                {formatNumber(voucherMessage)} تومان تخفیف
              </p>
            ) : (
              <p>
                <GiftSVG />
                کد تخفیف
              </p>
            )}
            <Button
              onClick={() => {
                if (!voucherError && voucherMessage) {
                  setVoucherInput(false);
                  setVoucherError(false);
                  setVoucherMessage('');
                  setVoucherCode('');
                } else {
                  setVoucherInput(true);
                }
              }}
            >
              {!voucherError && voucherMessage ? 'انصراف' : 'افزودن'}
            </Button>
          </Grid>
        )}
      </Grid>
      <Grid container className="footer">
        <Button
          disabled={loading}
          onClick={() => {
            if (
              !data?.user?.getUserRead?.my_store[0]?.national_code ||
              !data?.user?.getUserRead?.my_store[0]?.sheba_number
            ) {
              setShowModal(true);
            } else {
              buyHandler();
            }
          }}
          variant="contained"
          fullWidth
          color="primary"
        >
          {buyPackageLoading ? (
            <CircularProgress
              style={{ width: '24px', height: '24px', color: '#FFF' }}
            />
          ) : (
            'تایید و پرداخت'
          )}
        </Button>
      </Grid>
      {showModal && (
        <FillDataModal
          onSubmit={buyHandler}
          initialNC={data?.user?.getUserRead?.my_store[0]?.national_code}
          initialSHN={data?.user?.getUserRead?.my_store[0]?.sheba_number}
          close={() => setShowModal(false)}
        />
      )}
    </Style>
  );
};

export default PackageRenew;
