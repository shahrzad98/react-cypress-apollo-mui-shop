import React from 'react';
import { Style } from './style';
import { ReactComponent as MailSVG } from '../../../svg/purpleMail.svg';
import { ReactComponent as GemSVG } from '../../../svg/purpleGem.svg';
import { Button, Grid } from '@mui/material';
import { formatDate, formatNumber } from '../../../../../../utils/helpers';

const FinanceCard = ({ finance, onClick }) => {
  return (
    <Style mt={2} container>
      <Grid container justifyContent="space-between">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {finance?.title?.includes('پیامک') ? <MailSVG /> : <GemSVG />}
          <p>{finance?.title}</p>
        </div>
        <Button
          onClick={onClick}
          endIcon={<i className="df-arrow" />}
          variant="text"
          color="primary">
          بیشتر
        </Button>
      </Grid>
      <Grid mt={2} mb={2} container className="divider"></Grid>
      <Grid container>
        <Grid
          justifyContent="center"
          alignItems="center"
          style={{ borderLeft: '1px solid #C9C3E0' }}
          container
          item
          xs={4}>
          <p style={{ margin: 0 }}>{formatNumber(finance?.main_amount)}</p>{' '}
          <span>تومان</span>
        </Grid>
        <Grid
          justifyContent="center"
          alignItems="center"
          style={{ borderLeft: '1px solid #C9C3E0' }}
          container
          item
          xs={4}>
          <p style={{ color: finance?.status === 3 ? '#00CE7D' : '#EA002A' }}>
            {finance?.status === 3 ? 'موفق' : 'ناموفق'}
          </p>
        </Grid>
        <Grid justifyContent="flex-end" container item xs={4}>
          {formatDate(finance?.created_at)}
        </Grid>
      </Grid>
    </Style>
  );
};

export default FinanceCard;
