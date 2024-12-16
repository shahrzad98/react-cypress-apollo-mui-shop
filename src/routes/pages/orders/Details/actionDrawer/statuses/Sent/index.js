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
import { ReactComponent as SuccessSvg } from '../Paid/svg/success.svg';

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

const WaitingForApproval = ({
  order,
  refetchOrder,
  changeStatus,
  changeStatusloading,
  step,
  setStep,
  close
}) => {
  const [reason, setReason] = useState('عدم امکان سرویس دهی به ادرس مشتری');

  const renderTitle = () => {
    switch (step) {
      case 1: {
        return (
          <Grid container>
            <h3>بررسی سفارش</h3>
          </Grid>
        );
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
        return (
          <>
            {' '}
            <Grid container>
              <p>
                در صورت اطمینان از تحویل سفارش به مشتری، دکمه تحویل شده را
                بزنید.
              </p>
            </Grid>
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
              <FormControl variant="outlined" style={{ width: '100%' }}>
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
                    <MenuItem key={i} value={item.value}>
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
            <Grid justifyContent="center" container>
              <p>مرسوله با موفقیت به مشتری تحویل داده شده است.</p>
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
        return (
          <Grid className="footer" container>
            <Grid item xs={12}>
              <Button
                data-cy="submit_send_btn"
                onClick={() => {
                  changeStatus({
                    variables: {
                      updateOrderStatusId: order?.id,
                      content: {
                        status: 5
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
                {changeStatusloading ? <CircularProgress /> : 'تحویل شده'}
              </Button>
            </Grid>
          </Grid>
        );
      }
      case 2:
        return (
          <Grid className="footer" container>
            <Grid item xs={12}>
              <Button
                onClick={() => {
                  changeStatus({
                    variables: {
                      updateOrderStatusId: order?.id,
                      content: {
                        cancellation_reason: reason,
                        status: 11
                      }
                    },
                    onCompleted: () => {
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
