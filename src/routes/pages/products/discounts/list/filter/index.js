import {
  Button,
  FormControl,
  Grid,
  MenuItem,
  Radio,
  Select
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import LocalizedDatePicker from '../../../../../../components/shared/calendar/calendar';
import { formatEngDate } from '../../../../../../utils/helpers';
import { Style } from './style';

const DiscountFilterDrawer = ({ open, close, setSearchparams }) => {
  const [voucherType, setVoucherType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [expireDate, setExpireDate] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const submitFilterHandler = () => {
    let body = {
      ...(startDate && { start_date: formatEngDate(startDate) }),
      ...(expireDate && { expire_date: formatEngDate(expireDate) }),
      ...(voucherType && { voucher_type: +voucherType }),
      isFilter: true
    };

    setSearchparams(body);
  };

  return (
    <Style anchor="bottom" open={open} onClose={close}>
      <Grid onClick={close} className="header">
        <Box display={'flex'} alignItems="center">
          <i className="df-arrow" />
          <h1>فیلتر ها</h1>
        </Box>
        <Button
          onClick={() => {
            setStartDate('');
            setExpireDate('');
            setVoucherType('');
            setSearchparams({ clearedFilter: true });
          }}
        >
          حذف همه فیلترها
        </Button>
      </Grid>
      <Grid alignContent="start" mt={3} container className="content">
        <Grid container>
          <h2>نوع</h2>
        </Grid>
        <Grid mt={1} container>
          <FormControl fullWidth>
            <Select
              onOpen={() => setIsOpen(true)}
              onClose={() => setIsOpen(false)}
              className="select-cat"
              IconComponent={() => (
                <i
                  className={
                    isOpen ? 'df-arrow dropdown-opened' : 'df-arrow dropdown'
                  }
                />
              )}
              onChange={e => setVoucherType(e.target.value)}
              name="voucher_type"
              displayEmpty
              value={voucherType}
              renderValue={() => {
                if (voucherType === 2) return 'نقدی';
                if (voucherType === 1) return 'درصدی';
                return 'نوع تخفیف را انتخاب کنید';
              }}
            >
              <MenuItem value={2}>
                {' '}
                <Radio
                  disabled
                  style={{ color: '#00CE7D' }}
                  checked={voucherType === 2}
                />
                نقدی
              </MenuItem>
              <MenuItem value={1}>
                {' '}
                <Radio
                  disabled
                  style={{ color: '#00CE7D' }}
                  checked={voucherType === 1}
                />
                درصدی
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid container mt={2}>
          <h2>محدودیت زمانی</h2>
        </Grid>
        <Grid mt={1} container>
          <Grid item xs={1}>
            <p>از</p>
          </Grid>
          <Grid item xs={5}>
            {' '}
            <LocalizedDatePicker
              data_cy="start_date"
              label=" "
              value={startDate}
              setValue={setStartDate}
            />
          </Grid>
          <Grid style={{ textAlign: 'center' }} item xs={1}>
            <p>تا</p>
          </Grid>
          <Grid item xs={5}>
            {' '}
            <LocalizedDatePicker
              data_cy="end_date"
              label=" "
              value={expireDate}
              setValue={setExpireDate}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid container className="footer">
        <Button
          onClick={submitFilterHandler}
          variant="contained"
          color="primary"
          data-cy="submit_filter"
          fullWidth
        >
          اعمال
        </Button>
      </Grid>
    </Style>
  );
};

export default DiscountFilterDrawer;
