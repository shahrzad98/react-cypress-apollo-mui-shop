import { Button, Grid } from '@mui/material';
import React from 'react';
import { Style } from './style';

const ZeroStockModal = ({ close, submit, name }) => {
  return (
    <Style onClick={close}>
      <Grid onClick={e => e.stopPropagation()} className="content" container>
        <i onClick={close} className="df-close close" />
        <Grid mt={2} container>
          <h4>آیا از ثبت محصول {name} با موجودی صفر اطمینان دارید؟</h4>
        </Grid>
        <Grid container justifyContent="flex-end">
          <Button
            onClick={close}
            className="btn"
            variant="text"
            color="primary"
          >
            انصراف
          </Button>
          <Button
            data-cy="zero_stock_btn"
            onClick={submit}
            style={{ border: '1px solid #483493' }}
            className="btn"
            variant="outlined"
            color="primary"
          >
            ثبت
          </Button>
        </Grid>
      </Grid>
    </Style>
  );
};

export default ZeroStockModal;
