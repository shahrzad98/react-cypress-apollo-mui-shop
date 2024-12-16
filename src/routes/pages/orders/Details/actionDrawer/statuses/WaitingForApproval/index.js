import styled from '@emotion/styled';
import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  MenuItem,
  Radio,
  TextField,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import persianJs from 'persianjs';
import { useMutation } from '@apollo/client';
import { UPDATE_ORDER } from '../../../../../../../constant/mutations/orders';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { ReactComponent as SuccessSvg } from './svg/success.svg';

const DECLINE_REASONS = [
  {
    name: 'عدم امکان سرویس دهی به ادرس مشتری',
    value: 'عدم امکان سرویس دهی به ادرس مشتری'
  },
  {
    name: 'عدم امکان آماده سازی محصولات سفارش',
    value: 'عدم امکان آماده سازی محصولات سفارش'
  },
  {
    name: 'سایر',
    value: 'سایر'
  }
];
const Style = styled(Grid)`
  .placeholderY {
    margin: 0;
  }

  .card-number {
    color: #9185be;
    font-size: 14px;
    margin-left: 7px;
    margin-top: 0;
    margin-bottom: 16px;
  }

  i {
    color: #9185be;
    margin-top: 0;
    margin-bottom: 16px;
  }

  .edit-btn {
    padding: 0;
    height: 20px;
    font-size: 14px;
    color: #483493;

    i {
      font-size: 14px;
      color: #483493;
    }

    span {
      display: inline;
    }
  }

  .df-arrow {
    margin-top: 16px;
    font-size: 19px;
    color: #000;
    margin-right: 12px;
  }

  .input {
    margin: 10px 0;
  }

  .footer {
    margin-top: 40px;
  }

  .menu {
    max-height: 300px;

    .MuiMenu-paper {
      padding: 0;
      min-width: 100px;
      max-width: 220px;
    }
  }

  .dropdown {
    transform: rotate(90deg);
    margin-left: 10px;
    font-size: 15px;
    margin-right: 18px;
    color: #483493;
    margin-top: 20px;
  }
`;

const validationSchema = yup.object().shape({
  cardname: yup.string().required('این فیلد اجباری است'),
  cardNumber: yup
    .string()
    .typeError('شماره کارت را به درستی وارد کنید')
    .required('این فیلد اجباری است')
    .length(16)
    .typeError('شماره کارت را به درستی وارد کنید')
});

const WaitingForApproval = ({
  order,
  refetchOrder,
  changeStatus,
  changeStatusloading,
  step,
  setStep,
  close
}) => {
  const [isEdit, setisEdit] = useState(false);
  const [partialUpdateManager, { loading }] = useMutation(UPDATE_ORDER);
  const [reason, setReason] = useState('عدم امکان سرویس دهی به ادرس مشتری');

  const formik = useFormik({
    initialValues: {
      cardNumber: order?.owner_card_number,
      cardname: order?.owner_card_name
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      partialUpdateManager({
        variables: {
          partialUpdateManagerId: order?.id + '',
          content: {
            owner_card_number: values.cardNumber,
            owner_card_name: values.cardname
          }
        },
        onCompleted: () => {
          refetchOrder();
          setisEdit(false);
        }
      });
    }
  });

  const renderTitle = () => {
    switch (step) {
      case 1: {
        if (isEdit) {
          return (
            <Grid alignItems="center" container>
              <i onClick={() => setisEdit(false)} className="df-arrow" />
              <h3 onClick={() => setisEdit(false)}>بررسی درخواست</h3>
            </Grid>
          );
        } else {
          return (
            <Grid container>
              <h3>بررسی درخواست</h3>
            </Grid>
          );
        }
      }
      case 2: {
        return (
          <Grid alignItems="center" container>
            <i onClick={() => setStep(1)} className="df-arrow" />
            <h3 onClick={() => setStep(1)}>علت عدم تایید</h3>
          </Grid>
        );
      }
      case 3: {
        return (
          <Grid alignItems="center" container>
            <h3>تایید درخواست</h3>
          </Grid>
        );
      }
      default:
        return;
    }
  };

  const renderContent = () => {
    switch (step) {
      case 1: {
        if (isEdit) {
          return (
            <>
              {' '}
              <Grid container>
                <p>شماره کارت جدید و نام دارنده آن را وارد کنید.</p>
              </Grid>
              <Grid container>
                <Grid container item xs={12}>
                  <TextField
                    className="input"
                    value={formik.values.cardNumber}
                    onChange={e => {
                      if (e.target.value) {
                        const engCardNumber = persianJs(e?.target.value)
                          .toEnglishNumber()
                          .toString();
                        formik.setFieldValue('cardNumber', engCardNumber);
                      } else {
                        formik.setFieldValue('cardNumber', e.target.value);
                      }
                    }}
                    helperText={
                      formik.touched.cardname && formik.errors.cardNumber
                    }
                    error={formik.touched.cardname && formik.errors.cardNumber}
                    name="card_number"
                    fullWidth
                    variant="outlined"
                    label="شماره کارت"
                  />
                </Grid>
                <Grid container item xs={12}>
                  <TextField
                    className="input"
                    value={formik.values.cardname}
                    error={formik.touched.cardname && formik.errors.cardname}
                    helperText={
                      formik.touched.cardname && formik.errors.cardname
                    }
                    name="card_name"
                    onChange={e =>
                      formik.setFieldValue('cardname', e.target.value)
                    }
                    fullWidth
                    variant="outlined"
                    label="نام و نام خانوادگی دارنده کارت"
                  />
                </Grid>
              </Grid>
            </>
          );
        } else
          return (
            <>
              {' '}
              <Grid container>
                <p>در صورت نیاز می توانید شماره کارت را ویرایش کنید.</p>
              </Grid>
              <Grid container>
                <Grid container item xs={8}>
                  {order?.owner_card_number && (
                    <>
                      <i className="df-payment-card" />
                      <p dir="ltr" className="card-number">
                        {`${persianJs(order?.owner_card_number)
                          .toEnglishNumber()
                          .toString()}`.replace(/(\d{4})(?=\d)/g, ' $1 - ')}
                      </p>
                    </>
                  )}
                </Grid>
                <Grid justifyContent="flex-end" container item xs={4}>
                  <Button
                    onClick={() => setisEdit(2)}
                    className="edit-btn"
                    startIcon={<i className="df-edit" />}
                    variant="text"
                    color="primary"
                  >
                    ویرایش
                  </Button>
                </Grid>
              </Grid>
              {order?.owner_card_name && (
                <Grid container>
                  <Grid container>
                    <i className="df-user" />
                    <p dir="ltr" className="card-number">
                      {order?.owner_card_name}
                    </p>
                  </Grid>
                </Grid>
              )}
            </>
          );
      }
      case 2: {
        return (
          <>
            <Grid container>
              <p>
                لطفا علت عدم تایید سفارش را به منظور مطلع شدن مشتری، مشخص کنید.
              </p>
            </Grid>
            <Grid style={{ margin: '30px 0 50px' }} container>
              <FormControl
                data-cy="decline_reason_select"
                variant="outlined"
                style={{ width: '100%' }}
              >
                <TextField
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  select
                  variant="outlined"
                  label="علت عدم تایید"
                  style={{ minHeight: '60px' }}
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                  SelectProps={{
                    IconComponent: () => <i className="df-arrow dropdown" />,
                    MenuProps: { className: 'menu' },
                    renderValue: value =>
                      value ? (
                        <Typography className="placeholderY">
                          {
                            DECLINE_REASONS.find(item => item.value === value)
                              ?.name
                          }
                        </Typography>
                      ) : (
                        <Typography className="placeholder">
                          علت عدم تایید
                        </Typography>
                      )
                  }}
                >
                  {DECLINE_REASONS.map((item, i) => (
                    <MenuItem
                      data-cy={`cancel_reason_${i}`}
                      key={i}
                      value={item.value}
                    >
                      <Radio
                        checked={reason === item.value}
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': 'C' }}
                      />
                      <Typography variant="inherit" noWrap>
                        {item.name}
                      </Typography>
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </Grid>
          </>
        );
      }
      case 3:
        return (
          <Grid container>
            <Grid
              mb="16px"
              container
              justifyContent="center"
              alignItems="center"
            >
              <SuccessSvg />
            </Grid>
            <Grid container>
              <p>
                بررسی درخواست با موفقیت انجام شد. درخواست مشتری تایید شده و تا 4
                ساعت در انتظار پرداخت مشتری قرار می گیرد.
              </p>
            </Grid>
          </Grid>
        );
      default:
        return;
    }
  };

  const renderFooter = () => {
    switch (step) {
      case 1: {
        if (isEdit) {
          return (
            <Grid className="footer" container>
              <Grid item xs={12}>
                <Button
                  data-cy="submit_edit_btn"
                  onClick={() => {
                    formik.handleSubmit();
                  }}
                  disabled={loading}
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  {loading ? <CircularProgress /> : 'ثبت'}
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  onClick={() => setisEdit(false)}
                  fullWidth
                  variant="text"
                  color="secondary"
                >
                  انصراف{' '}
                </Button>
              </Grid>
            </Grid>
          );
        } else {
          return (
            <Grid className="footer" container>
              <Grid item xs={12}>
                <Button
                  data-cy="submit_btn"
                  onClick={() => {
                    changeStatus({
                      variables: {
                        updateOrderStatusId: order?.id,
                        content: {
                          status: 15
                        }
                      },
                      onCompleted: () => {
                        setStep(3);
                      },
                      onError: () => {
                        setStep(3);
                      }
                    });
                  }}
                  disabled={changeStatusloading}
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  {changeStatusloading ? <CircularProgress /> : 'تایید'}
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  data-cy="decline_btn"
                  onClick={() => setStep(2)}
                  fullWidth
                  variant="text"
                  color="secondary"
                >
                  عدم تایید
                </Button>
              </Grid>
            </Grid>
          );
        }
      }
      case 2:
        return (
          <Grid className="footer" container>
            <Grid item xs={12}>
              <Button
                data-cy="submit_decline_btn"
                onClick={() => {
                  changeStatus({
                    variables: {
                      updateOrderStatusId: order?.id,
                      content: {
                        cancellation_reason: reason,
                        status: 12
                      }
                    },
                    onCompleted: () => {
                      refetchOrder();
                    },
                    onError: () => {
                      refetchOrder();
                    }
                  });
                }}
                disabled={changeStatusloading}
                fullWidth
                variant="contained"
                color="primary"
              >
                {changeStatusloading ? <CircularProgress /> : 'ثبت'}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                data-cy="cancel_decline_btn"
                onClick={() => setStep(1)}
                fullWidth
                variant="text"
                color="secondary"
              >
                انصراف{' '}
              </Button>
            </Grid>
          </Grid>
        );
      case 3:
        return (
          <Grid container className="footer">
            <Button
              onClick={() => {
                close();
                refetchOrder();
              }}
              fullWidth
              variant="contained"
              color="primary"
            >
              متوجه شدم
            </Button>
          </Grid>
        );

      default:
        return;
    }
  };

  return (
    <Style container>
      {renderTitle()}
      {renderContent()}
      {renderFooter()}
    </Style>
  );
};

export default WaitingForApproval;
