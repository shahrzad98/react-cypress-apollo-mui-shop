import { Grid, Radio } from '@mui/material';
import React from 'react';
import { formatNumber } from '../../../../../../../utils/helpers';
import { Style } from './style';
import { ReactComponent as SmsSVG } from './svg/sms.svg';

const CategoryProductCard = ({ smsData, setIsActive, isActive, smsCost }) => {
  return (
    <Style
      data-cy="evryCard"
      onClick={() => {
        setIsActive(smsData);
      }}
      mt={2}
      container
    >
      <Grid
        className={
          isActive.count === smsData.count ? 'inner1 inner1_active' : 'inner1'
        }
        container
      ></Grid>
      <Grid
        className={
          isActive.count === smsData.count ? 'inner2 inner2_active' : 'inner2'
        }
        container
      >
        <div className="empty_prod_cont">
          <SmsSVG />
        </div>

        <Grid
          style={{ width: '76%' }}
          container
          alignItems="space-between"
          ml={1}
        >
          <Grid container>
            <h4>بسته {smsData?.count} پیامکی</h4>
          </Grid>
          <Grid alignItems="flex-end" justifyContent="flex-start" container>
            <h5>{formatNumber(smsData?.count * smsCost)} تومان</h5>
          </Grid>
        </Grid>
      </Grid>
      <Grid className="inner3" container>
        <Radio
          onChange={() => setIsActive(smsData)}
          checked={isActive.count === smsData.count}
          className="radio-btn"
        />
      </Grid>
    </Style>
  );
};

export default CategoryProductCard;
