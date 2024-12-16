import { useMutation, useQuery } from '@apollo/client';
import { Button, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { useNavigate } from 'react-router-dom';
import { IOSSwitch } from '../../../../../components/shared/UI/IOS_Switch';
import { EDIT_SMS_DATA } from '../../../../../constant/mutations/store';
import { GET_SMS_DATA } from '../../../../../constant/queries/settings';
import { ReactComponent as GemSVG } from '../../svg/mail.svg';
import LoadingModal from './loadingModal';
import { Style } from './style';

const index = () => {
  const navigate = useNavigate();
  const [percentage, setPercentage] = useState(1);
  const { data, loading, refetch } = useQuery(GET_SMS_DATA, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only'
  });

  useEffect(() => {
    if (
      data?.store?.getSmsData?.sms_count &&
      data?.store?.getSmsData?.initial_sms_count
    ) {
      let initial = data?.store?.getSmsData?.initial_sms_count;
      let current = data?.store?.getSmsData?.sms_count;
      let percent = (current / initial) * 100;
      setPercentage(percent);
    }
  }, [data]);

  const [editSmsData, { loading: editSmsLoading }] = useMutation(EDIT_SMS_DATA);

  window.onpopstate = function () {
    navigate('/store/settings');
  };
  history.pushState({}, '');
  return (
    <Style container>
      <Grid onClick={() => navigate('/store/settings')} className="header">
        <i className="df-arrow" />
        <h1>اطلاعات پیامک</h1>
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

        <Grid mt={3} alignItems="center" container className="text-progress">
          <Grid item className="line" xs={12}></Grid>
        </Grid>
        <Grid mt={3} container>
          <Grid container>
            <Grid item xs={6} className="right-odd-row">
              <h5>تعداد پیامک باقی مانده</h5>
            </Grid>
            <Grid item xs={6} className="left-odd-row">
              <h6>{data?.store?.getSmsData?.sms_count || '0'} پیامک</h6>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          mb={1}
          mt={3}
          alignItems="center"
          container
          className="text-progress"
        >
          <Grid item className="line" xs={12}></Grid>
        </Grid>
        <Grid mt={2} container className="switch_container">
          <Grid container>
            <h5>پنل پیامکی</h5>
          </Grid>
          <Grid mt={2} container justifyContent="space-between">
            <h6>
              {data?.store?.getSmsData?.customer_sms_send ? 'فعال' : 'غیرفعال'}
            </h6>
            <IOSSwitch
              data-cy="check_customer"
              checked={data?.store?.getSmsData?.customer_sms_send}
              value={data?.store?.getSmsData?.customer_sms_send}
              onChange={e => {
                editSmsData({
                  variables: {
                    content: {
                      customer_sms_send: e.target.checked
                    }
                  },
                  onCompleted: () => refetch()
                });
              }}
            />
          </Grid>
        </Grid>
        <Grid mt={2} container className="switch_container">
          <Grid container>
            <h5>پیامک گزارش روزانه</h5>
          </Grid>
          <Grid mt={2} container justifyContent="space-between">
            <h6>
              {data?.store?.getSmsData?.report_sms_send ? 'فعال' : 'غیرفعال'}
            </h6>
            <IOSSwitch
              data-cy="check_report"
              checked={data?.store?.getSmsData?.report_sms_send}
              value={data?.store?.getSmsData?.report_sms_send}
              onChange={e => {
                editSmsData({
                  variables: {
                    content: {
                      report_sms_send: e.target.checked
                    }
                  },
                  onCompleted: () => refetch()
                });
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid container className="footer">
        <Button
          data-cy="sms_cost"
          onClick={() =>
            navigate(
              `/store/settings/sms/charge?sms_cost=${data?.store?.getSmsData?.sms_cost}`
            )
          }
          fullWidth
          color="primary"
          variant="outlined"
        >
          افزایش اعتبار
        </Button>
      </Grid>
      {editSmsLoading || loading ? <LoadingModal /> : ''}
    </Style>
  );
};

export default index;
