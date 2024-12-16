import { Button, Checkbox, Grid, TextField } from '@mui/material';
import React, { useCallback } from 'react';
import { Style } from './style';

import { ReactComponent as PlusSvg } from '../svg/plus.svg';
import { ReactComponent as MinusSvg } from '../svg/minus.svg';
import { formatNumber } from '../../../utils/helpers';
// import NumberFormat from 'react-number-format';
import persianJs from 'persianjs';

const PrimaryFields = ({ formik, errors, setErrors, setSearchParams }) => {
  const addCommas = useCallback(
    num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    []
  );
  const removeNonNumeric = useCallback(
    num => num.toString().replace(/[^0-9]/g, ''),
    []
  );
  return (
    <Style container>
      <Grid alignItems="center" justifyContent="space-between" container>
        <h2>اطلاعات محصول</h2>
        <Button
          data-cy="more_data_btn"
          onClick={() => setSearchParams({ modal: 'secondary-fields' })}
          endIcon={<i className="df-arrow" />}
        >
          بیشتر
        </Button>
      </Grid>
      <Grid mt={2} container>
        <h3>نام</h3>
      </Grid>
      <Grid mt={1} container>
        <TextField
          name="name"
          value={formik.values.name}
          onChange={e => formik.setFieldValue('name', e.target.value)}
          error={formik.touched.name && formik.errors.name}
          helperText={formik.touched.name && formik.errors.name}
          variant="outlined"
          placeholder="نام محصول را وارد کنید"
          fullWidth
        />
      </Grid>
      <Grid mt={2} container>
        <h3>قیمت</h3>
      </Grid>
      <Grid mt={1} container>
        <TextField
          dir="ltr"
          type="text"
          name="cost"
          InputProps={{ startAdornment: <p>تومان</p> }}
          value={formik.values.cost}
          onChange={e => {
            if (e.target.value) {
              const newVal = persianJs(e.target.value)
                .toEnglishNumber()
                .toString();
              // formik.setFieldValue('cost', newVal);
              formik.setFieldValue('cost', addCommas(removeNonNumeric(newVal)));
            } else {
              formik.setFieldValue('cost', '');
            }

            if (!e.target.value) {
              formik.setFieldValue('voucher_cash', '');
              formik.setFieldValue('voucher_percent', '');
            }
          }}
          error={formik.touched.cost && formik.errors.cost}
          helperText={formik.touched.cost && formik.errors.cost}
          variant="outlined"
          fullWidth
          onFocus={() => {
            if (formik.values.cost == 0) {
              formik.setFieldValue('cost', '');
            }
          }}
        />
      </Grid>
      {formik.values.voucher_cash ? (
        <Grid mt={1} container>
          <p>
            قیمت با تخفیف:{' '}
            {formatNumber(
              formik.values.cost.replace(',', '') - formik.values.voucher_cash
            )}{' '}
            تومان
          </p>
        </Grid>
      ) : (
        ''
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
            data-cy="unlimited_stock"
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
    </Style>
  );
};

export default PrimaryFields;
