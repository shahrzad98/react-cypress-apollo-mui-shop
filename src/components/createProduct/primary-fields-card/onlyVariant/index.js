import { Checkbox, Grid, TextField } from '@mui/material';
import React from 'react';
import { Style } from './style';

import { ReactComponent as PlusSvg } from '../../svg/plus.svg';
import { ReactComponent as MinusSvg } from '../../svg/minus.svg';
import { formatNumber } from '../../../../utils/helpers';
import persianJs from 'persianjs';

const PrimaryFields = ({ formik, errors, setErrors }) => {
  return (
    <Style container>
      <Grid alignItems="center" justifyContent="space-between" container>
        <h2>اطلاعات متغیر</h2>
      </Grid>

      <Grid mt={2} container>
        <h3>قیمت</h3>
      </Grid>
      <Grid mt={1} container>
        <TextField
          dir="ltr"
          name="cost"
          InputProps={{ startAdornment: <p>تومان</p> }}
          value={formik.values.cost}
          onChange={e => {
            formik.handleChange(e);
            if (!e.target.value) {
              formik.setFieldValue('voucher_cash', '');
              formik.setFieldValue('voucher_percent', '');
            }
          }}
          error={formik.touched.cost && formik.errors.cost}
          helperText={formik.touched.cost && formik.errors.cost}
          variant="outlined"
          fullWidth
        />
      </Grid>
      {formik.values.voucher_cash ? (
        <Grid mt={1} container>
          <p>
            قیمت با تخفیف:{' '}
            {formatNumber(formik.values.cost - formik.values.voucher_cash)}{' '}
            تومان
          </p>
        </Grid>
      ) : (
        ''
      )}

      <Grid mt={2} container>
        <h3>موجودی</h3>
      </Grid>
      <Grid justifyContent="space-between" mt={1} container>
        <Grid container className="stock">
          <Grid
            onClick={() => {
              if (formik.values.is_unlimited === false) {
                setErrors({});
                formik.setFieldValue('stock', +formik.values.stock + 1);
              }
            }}
            className="minus"
            item
            xs={3}
          >
            <PlusSvg />
          </Grid>
          <Grid item xs={6}>
            {!formik.values.is_unlimited ? (
              <input
                dir="ltr"
                name="stock"
                onChange={e => {
                  formik.handleChange(e);
                  setErrors({});
                }}
                className="stock-input"
                value={formik.values.stock}
              />
            ) : (
              <Grid container className="disabled-stock"></Grid>
            )}
          </Grid>
          <Grid
            onClick={() => {
              if (formik.values.is_unlimited === false) {
                if (formik.values.stock > 0) {
                  formik.setFieldValue('stock', +formik.values.stock - 1);
                  setErrors({});
                }
              }
            }}
            className="plus"
            item
            xs={3}
          >
            <MinusSvg />
          </Grid>
        </Grid>
        <Grid
          justifyContent="flex-end"
          alignItems="center"
          container
          className="unlimited"
        >
          <Checkbox
            onChange={e => {
              setErrors({});
              formik.setFieldValue('is_unlimited', e.target.checked);
            }}
            value={formik.values.is_unlimited}
            checked={formik.values.is_unlimited}
          />
          <h6>نامحدود</h6>
        </Grid>
      </Grid>
      {errors?.stock && (
        <Grid container>
          <p
            style={{
              color: '#ff3262',
              fontSize: '.75rem',
              fontWeight: 400,
              marginTop: '8px'
            }}
          >
            {errors.stock}
          </p>
        </Grid>
      )}
      <Grid mt={2} container>
        <h3>زمان آماده سازی</h3>
      </Grid>
      <Grid mt={1} container>
        <TextField
          dir="ltr"
          name="time_delay"
          value={formik.values.time_delay}
          onChange={formik.handleChange}
          InputProps={{ startAdornment: <p>روز</p> }}
          error={formik.touched.time_delay && formik.errors.time_delay}
          helperText={formik.touched.time_delay && formik.errors.time_delay}
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid mt={2} container>
        <h3>تخفیف</h3>
      </Grid>
      <Grid mt={1} item xs={6} pr={1} container>
        <TextField
          name="voucher_cash"
          value={formik.values.voucher_cash}
          onChange={e => {
            if (e.target.value) {
              const newValue = persianJs(e.target.value)
                .toEnglishNumber()
                .toString();

              let percent = (
                (1 - (+formik.values.cost - newValue) / +formik.values.cost) *
                100
              ).toFixed();
              formik.setFieldValue(
                'voucher_cash',
                +percent >= 100 ? formik.values.cost : newValue
              );
              formik.setFieldValue(
                'voucher_percent',
                percent >= 100 ? 100 : percent
              );
            } else {
              formik.setFieldValue('voucher_cash', '');
              formik.setFieldValue('voucher_percent', '');
            }
          }}
          error={formik.touched.voucher_cash && formik.errors.voucher_cash}
          helperText={formik.touched.voucher_cash && formik.errors.voucher_cash}
          variant="outlined"
          disabled={!formik.values.cost}
          InputProps={{
            endAdornment: <p>تومان</p>
          }}
          placeholder="مبلغ"
          fullWidth
        />
      </Grid>
      <Grid mt={1} item xs={6} pl={1} container>
        <TextField
          name="voucher_percent"
          value={formik.values.voucher_percent}
          disabled={!formik.values.cost}
          onChange={e => {
            if (e.target.value) {
              const newValue = persianJs(e.target.value)
                .toEnglishNumber()
                .toString();
              formik.setFieldValue('voucher_percent', newValue);
              let cost = (formik.values.cost * newValue) / 100;
              formik.setFieldValue('voucher_cash', cost);
            } else {
              formik.setFieldValue('voucher_percent', '');
              formik.setFieldValue('voucher_cash', '');
            }
          }}
          error={
            formik.touched.voucher_percent && formik.errors.voucher_percent
          }
          helperText={
            formik.touched.voucher_percent && formik.errors.voucher_percent
          }
          variant="outlined"
          InputProps={{
            endAdornment: <p>%</p>
          }}
          inputProps={{
            maxLength: 2
          }}
          placeholder="درصد"
          fullWidth
        />
      </Grid>
      <Grid mt={1} container>
        {!formik.values.cost ? (
          <p style={{ color: '#6A6F80', fontSize: '14px', fontWeight: 400 }}>
            برای تعریف تخفیف ابتدا قیمت را وارد کنید
          </p>
        ) : formik.values.voucher_cash ? (
          <p style={{ color: '#6A6F80', fontSize: '14px', fontWeight: 400 }}>
            مبلغ با تخفیف:{' '}
            {formatNumber(formik.values.cost - formik.values.voucher_cash)}{' '}
            تومان
          </p>
        ) : (
          ''
        )}
      </Grid>
    </Style>
  );
};

export default PrimaryFields;
