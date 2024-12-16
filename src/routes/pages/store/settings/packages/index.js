import { Button, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { useNavigate } from 'react-router-dom';
import { Style } from './style';
import { ReactComponent as GemSVG } from '../../svg/gem.svg';
import { useQuery } from '@apollo/client';
import { GET_CURRENT_PACKAGE } from '../../../../../constant/queries/settings';
import { formatDate, formatNumber } from '../../../../../utils/helpers';
import { InfoOutlined } from '@mui/icons-material';

const index = () => {
  const navigate = useNavigate();
  const [percentage, setPercentage] = useState(50);
  const { data } = useQuery(GET_CURRENT_PACKAGE, {
    fetchPolicy: 'network-only'
  });
  const [remainingDays, setRemainingDays] = useState(90);

  useEffect(() => {
    if (
      data?.packages?.getCurrentPackage?.start_date_time &&
      data?.packages?.getCurrentPackage?.end_date_time
    ) {
      let endDate = new Date(
        data?.packages?.getCurrentPackage?.end_date_time
      ).getTime();
      let startDate = new Date(
        data?.packages?.getCurrentPackage?.start_date_time
      ).getTime();
      let nowDate = new Date().getTime();
      let remainingDays = ((endDate - nowDate) / 86400000).toFixed();
      let allDays = ((endDate - startDate) / 86400000).toFixed();
      setPercentage(((remainingDays * 100) / allDays).toFixed());
      setRemainingDays(remainingDays);
    }
  }, [data]);

  const [expired, setExpired] = useState(false);
  useEffect(() => {
    if (data?.packages?.getCurrentPackage?.end_date_time) {
      if (
        new Date(data?.packages?.getCurrentPackage?.end_date_time).getTime() <
        new Date().getTime()
      ) {
        setExpired(true);
        setPercentage(0);
      }
    }
  }, [data]);

  window.onpopstate = function () {
    navigate('/store/settings');
  };
  history.pushState({}, '');

  return (
    <Style expired={expired} container>
      <Grid onClick={() => navigate('/store/settings')} className="header">
        <i className="df-arrow" />
        <h1>اطلاعات پکیج</h1>
      </Grid>
      <Grid alignContent="flex-start" mt={3} container className="content">
        <Grid justifyContent="center" container>
          <Grid className="progressCont">
            <CircularProgressbarWithChildren
              value={percentage}
              strokeWidth={4}
              counterClockwise
              styles={{
                path: {
                  stroke:
                    percentage > 74
                      ? '#02E061'
                      : percentage > 24
                      ? '#FFC72A'
                      : '#EA002A',
                  strokeLinecap: 'round',
                  transformOrigin: 'center center'
                },
                trail: {
                  stroke: '#d6d6d6',
                  strokeLinecap: 'round',
                  transformOrigin: 'center center',
                  width: '1px'
                },
                text: {
                  fill: '#f88',
                  fontSize: '16px'
                },
                background: {
                  fill: '#3e98c7'
                }
              }}
            >
              <div
                style={{
                  width: '80%',
                  height: '80%',
                  //   backgroundColor: '#DAD6E966',
                  borderRadius: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'hidden'
                }}
              >
                <GemSVG className="svg" />
              </div>
            </CircularProgressbarWithChildren>
          </Grid>
        </Grid>
        {expired ? (
          <Grid
            mt={3}
            container
            alignItems="center"
            className="error_container"
          >
            <InfoOutlined style={{ color: '#EE3B4F' }} />
            <h3>مدت اعتبار پکیج شما به پایان رسیده است.</h3>
          </Grid>
        ) : (
          <Grid mt={3} alignItems="center" container className="text-progress">
            <Grid item className="line" xs={4}></Grid>
            <Grid container justifyContent="center" item xs={4}>
              <h2>{remainingDays} روز مانده</h2>
            </Grid>
            <Grid item className="line" xs={4}></Grid>
          </Grid>
        )}
        <Grid mt={3} container>
          <Grid container>
            <Grid item xs={6} className="right-odd-row">
              <h5>نام پکیج</h5>
            </Grid>
            <Grid item xs={6} className="left-odd-row">
              <h6>
                {data?.packages?.getCurrentPackage?.package?.name ||
                  '----------'}
              </h6>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6} className="right-even-row">
              <h5>قیمت پکیج</h5>
            </Grid>
            <Grid item xs={6} className="left-even-row">
              <h6>
                {formatNumber(
                  data?.packages?.getCurrentPackage?.package?.cost
                ) || '----------'}{' '}
                تومان
              </h6>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6} className="right-odd-row">
              <h5>وضعیت</h5>
            </Grid>
            <Grid item xs={6} className="left-odd-row">
              <h6>
                {new Date(
                  data?.packages?.getCurrentPackage?.end_date_time
                ).getTime() > new Date().getTime()
                  ? 'فعال'
                  : 'غیرفعال'}
              </h6>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6} className="right-even-row">
              <h5>تاریخ ثبت</h5>
            </Grid>
            <Grid item xs={6} className="left-even-row">
              <h6>
                {data?.packages?.getCurrentPackage?.start_date_time
                  ? formatDate(
                      data?.packages?.getCurrentPackage?.start_date_time
                    )
                  : '----------'}
              </h6>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6} className="right-odd-row">
              <h5>تاریخ انقضا</h5>
            </Grid>
            <Grid item xs={6} className="left-odd-row">
              <h6>
                {data?.packages?.getCurrentPackage?.end_date_time
                  ? formatDate(data?.packages?.getCurrentPackage?.end_date_time)
                  : '----------'}
              </h6>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container className="footer">
        <Button
          onClick={() => navigate('/store/settings/package/renew')}
          fullWidth
          color="primary"
          variant="contained"
        >
          تمدید اعتبار
        </Button>
      </Grid>
    </Style>
  );
};

export default index;
