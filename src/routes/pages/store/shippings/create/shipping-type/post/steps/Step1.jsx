import * as React from 'react';
import { Box, Grid, TextField, Typography } from '@mui/material';
import LocalizedDatePicker from '../../../../../../../../components/shared/calendar/calendar';

const Step1 = ({ form, errors }) => {
  return (
    <Box sx={{ position: 'relative' }}>
      <Grid>
        <p>نام</p>
        <TextField
          name="first_name"
          value={form.values.first_name}
          onChange={form.handleChange}
          error={!!(form?.touched?.first_name && errors?.first_name)}
          helperText={errors?.first_name}
          fullWidth
        />
      </Grid>
      <Grid>
        <p>نام خانوادگی</p>
        <TextField
          name="last_name"
          value={form.values.last_name}
          onChange={form.handleChange}
          error={!!(form?.touched?.last_name && errors?.last_name)}
          helperText={errors?.last_name}
          fullWidth
        />
      </Grid>
      <Grid>
        <p>شماره موبایل</p>
        <TextField
          name="phone_number"
          value={form.values.phone_number?.replace(/\+98/, 0)}
          onChange={form.handleChange}
          error={!!(form?.touched?.phone_number && errors?.phone_number)}
          helperText={errors?.phone_number}
          fullWidth
        />
      </Grid>
      <Grid>
        <p>کد ملی</p>
        <TextField
          name="national_code"
          placeholder={
            !errors?.national_code ? 'کد ملی خود را وارد کنید.' : null
          }
          onChange={form.handleChange}
          error={!!(form?.touched?.national_code && errors?.national_code)}
          helperText={errors?.national_code}
          fullWidth
        />
      </Grid>
      <Grid>
        <p>سریال کارت ملی</p>
        <TextField
          name="national_code_serial"
          placeholder={
            !errors?.national_code_serial
              ? 'سریال کارت ملی خود را وارد کنید.'
              : null
          }
          onChange={form.handleChange}
          error={
            !!(
              form?.touched?.national_code_serial &&
              errors?.national_code_serial
            )
          }
          helperText={errors?.national_code_serial}
          fullWidth
        />
      </Grid>
      <Grid position="relative">
        <p>تاریخ تولد</p>
        <LocalizedDatePicker
          value={form.values.birthday}
          setValue={e => form.setFieldValue('birthday', e)}
          error={!!(form?.touched?.birthday && form?.errors?.birthday)}
          helperText={form?.touched?.birthday && form?.errors?.birthday}
          name="birthday"
          placeholder={
            !errors?.birthday ? 'تاریخ تولد خود را وارد کنید.' : null
          }
          onChange={form.handleChange}
          variant="outlined"
        />
        <Typography
          variant="caption"
          color="error"
          top={-12}
          position="relative"
        >
          {errors.birthday}
        </Typography>
      </Grid>
    </Box>
  );
};

export default Step1;
