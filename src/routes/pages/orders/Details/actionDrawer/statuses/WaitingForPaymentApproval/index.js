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
import React, { useEffect, useState } from 'react';
import { formatDate } from '../../../../../../../utils/helpers';
import { Link, useLocation } from 'react-router-dom';

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
const Style = styled(Grid)({
  '& .action--header': {
    '& h3': {
      margin: '1rem 0'
    },
    '& p': {
      margin: '0'
    }
  },
  '& .action--time': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '1rem',
    '& p, & i': {
      color: '#9185BE',
      margin: '0'
    },
    '& > div': {
      display: 'flex',
      alignItems: 'center'
    },
    '& i': {
      marginRight: '5px'
    }
  },
  '& .back--button': {
    display: 'flex',
    alignItems: 'center',
    '& i': {
      marginRight: '10px',
      fontWeight: 'bold'
    }
  },
  '& a': {
    textDecoration: 'none',
    color: 'inherit'
  },
  '& .action--invoice': {
    marginTop: '1.5rem',
    borderLeft: '2px solid #F1F1F1',
    paddingLeft: '10px',
    display: 'flex',
    alignItems: 'stretch',
    '& img': {
      width: '50px',
      height: '50px',
      objectFit: 'cover',
      borderRadius: '10px',
      marginRight: '10px'
    },
    '& .action--invoice_info': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      '& p': {
        margin: '0',
        '&:last-child': {
          color: '#ADAABA'
        }
      }
    }
  },
  '& .action--button': {
    marginTop: '4rem',
    display: 'flex',
    flexDirection: 'column',
    '& .MuiButton-root': {
      height: '41px'
    }
  },
  '& .MuiFormControl-root': {
    marginTop: '1rem',
    '& input': {
      height: '11px'
    }
  }
});

const StyleC = styled(Grid)`
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
    maxheight: 300px;

    .MuiMenu-paper {
      padding: 0;
      minwidth: 100px;
      maxwidth: 220px;
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
  .df-time {
    margin-right: 5px;
  }
  .df-edit {
    margin-right: 5px;
  }
`;

const WaitingForApproval = ({
  order,
  changeStatus,
  step,
  setStep,
  refetchOrder,
  changeStatusloading,
  refetchDetail
}) => {
  const { preparing_days, payment } = order;
  const location = useLocation();

  const [preparingDays, setPreparingDays] = useState(0);

  const [
    {
      transactions: [
        {
          card_bills: [{ image, created_at }]
        }
      ]
    }
  ] = payment || [
    { transactions: [{ card_bills: [{ image: '', created_at: null }] }] }
  ];

  useEffect(() => {
    setPreparingDays(preparing_days);
  }, [preparing_days]);

  const [isEdit, setisEdit] = useState(false);
  const [reason, setReason] = useState('عدم امکان سرویس دهی به ادرس مشتری');

  const renderTitle = () => {
    switch (step) {
      case 1: {
        if (isEdit) {
          return (
            <Grid alignItems="center" container>
              <i onClick={() => setisEdit(false)} className="df-arrow" />
              <h3 onClick={() => setisEdit(false)}>بررسی سفارش</h3>
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
                <p>زمان آماده سازی جدید را وارد کنید.</p>
              </Grid>
              <Grid container>
                <Grid container item xs={12}>
                  <TextField
                    fullWidth
                    value={preparingDays}
                    onChange={ev => setPreparingDays(ev.target.valueAsNumber)}
                    type="number"
                    variant="outlined"
                    name="preparing_days"
                    placeholder="تعداد روز های آماده سازی"
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
                <p>در صورت نیاز می توانید زمان آماده سازی را ویرایش کنید.</p>
              </Grid>
              <Grid justifyContent="space-between" container>
                <Grid container item xs={6}>
                  <i className="df-time" />
                  <p>زمان آماده سازی: {preparingDays} روز</p>
                </Grid>
                <Grid
                  justifyContent="flex-end"
                  container
                  item
                  xs={6}
                  onClick={() => setisEdit(true)}
                >
                  <i className="df-edit" />
                  <p>ویرایش</p>
                </Grid>
              </Grid>
              <Link
                to="/modal/big-picture"
                state={{ backgroundLocation: location, data: { image } }}
              >
                <div className="action--invoice">
                  <div>
                    <img src={image} alt="" />
                  </div>
                  <div className="action--invoice_info">
                    <p>رسید کارت به کارت</p>
                    <p>
                      ارسال شده در{' '}
                      {formatDate(created_at, 'jYYYY/jMM/jDD ساعت HH:MM')}
                    </p>
                  </div>
                </div>
              </Link>
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
                data-cy="decline_order_select"
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
                      data-cy={`decline_order_select_${i}`}
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
                  data-cy="submit_edit"
                  onClick={() => {
                    setisEdit(false);
                  }}
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  {'ثبت'}
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  onClick={() => {
                    setisEdit(false);
                    setPreparingDays(preparing_days);
                  }}
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
                  data-cy="submit_order_btn"
                  onClick={() => {
                    changeStatus({
                      variables: {
                        updateOrderStatusId: order?.id,
                        content: {
                          status: 3
                        }
                      },
                      onCompleted: () => {
                        refetchOrder();
                        refetchDetail();
                      },
                      onError: () => {
                        refetchOrder();
                        refetchDetail();
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
                  data-cy="decline_order_btn"
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
                data-cy="decline_order_submit"
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
      default:
        return;
    }
  };

  return (
    <Style container>
      <StyleC container>
        {renderTitle()}
        {renderContent()}
        {renderFooter()}
      </StyleC>
    </Style>
  );
};

export default WaitingForApproval;
