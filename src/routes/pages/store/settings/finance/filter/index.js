import {
  Button,
  FormControl,
  Grid,
  MenuItem,
  Radio,
  Select,
  Slider,
  TextField
} from '@mui/material';
import React, { useEffect, useState } from 'react';
// import { formatDate, formatNumber } from '../../../../../../utils/helpers';
import { Style } from './style';
import LocalizedDatePicker from '../../../../../../components/shared/calendar/calendar';
import { useSearchParams } from 'react-router-dom';

const FinanceFilter = ({ open, onClose, onSubmtit }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [createdAtStart, setCreatedAtStart] = useState('');
  const [createdAtEnd, setCreatedAtEnd] = useState('');
  const [status, setStatus] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 10000000]);

  useEffect(() => {
    if (searchParams.get('cleared_filter')) {
      setCreatedAtStart('');
      setCreatedAtEnd('');
      setStatus('');
      setPriceRange([0, 10000000]);
    }
  }, [searchParams.get('cleared_filter')]);

  return (
    <Style anchor="bottom" open={open} onClose={onClose}>
      <Grid container justifyContent="space-between">
        <Grid onClick={onClose} className="header">
          <i className="df-arrow" />
          <h1>فیلتر</h1>
        </Grid>
        {searchParams.get('has_filter') && (
          <Button
            onClick={() => setSearchParams({ cleared_filter: true })}
            variant="text"
            style={{ color: '#ADAABA' }}
          >
            حذف همه فیلترها
          </Button>
        )}
      </Grid>

      <Grid
        alignContent="flex-start"
        alignItems={'center'}
        mt={3}
        container
        className="content"
      >
        <Grid container>
          <h3>تاریخ</h3>
        </Grid>
        <Grid mt={1} container fullWidth>
          <Grid container alignItems={'center'} item xs={1}>
            از
          </Grid>
          <Grid pr={1} item xs={5}>
            <LocalizedDatePicker
              value={createdAtStart}
              setValue={setCreatedAtStart}
            />
          </Grid>
          <Grid container alignItems={'center'} item xs={1}>
            تا
          </Grid>
          <Grid item xs={5}>
            {' '}
            <LocalizedDatePicker
              value={createdAtEnd}
              setValue={setCreatedAtEnd}
            />
          </Grid>
        </Grid>
        <Grid container>
          <h3>وضعیت</h3>
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
              onChange={e => setStatus(e.target.value)}
              name="voucher_type"
              displayEmpty
              value={status}
              renderValue={() => {
                if (status === 3) return 'موفق';
                if (status === 1) return 'ناموفق';
                return 'وضعیت را انتخاب کنید';
              }}
            >
              <MenuItem value={3}>
                {' '}
                <Radio
                  disabled
                  style={{ color: '#00CE7D' }}
                  checked={status === 3}
                />
                موفق
              </MenuItem>
              <MenuItem value={1}>
                {' '}
                <Radio
                  disabled
                  style={{ color: '#00CE7D' }}
                  checked={status === 1}
                />
                ناموفق
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid container mt={2}>
          <h3>قیمت پرداخت شده</h3>
        </Grid>
        <Grid className="slider" item xs={12}>
          <Slider
            min={0}
            max={10000000}
            value={priceRange}
            onChange={(e, value) => {
              setPriceRange(value);
            }}
            valueLabelDisplay="off"
            disableSwap
          />
        </Grid>
        <Grid justifyContent="space-between" alignItems="center" container>
          <p>از</p>
          <TextField
            className="price-range-input"
            type="number"
            InputProps={{ endAdornment: <p>تومان</p> }}
            onChange={e => setPriceRange([e.target.value, priceRange[1]])}
            variant="outlined"
            value={priceRange[0]}
          />
          <p>تا</p>
          <TextField
            className="price-range-input"
            type="number"
            InputProps={{ endAdornment: <p>تومان</p> }}
            onChange={e => setPriceRange([priceRange[0], e.target.value])}
            variant="outlined"
            value={priceRange[1]}
          />
        </Grid>
      </Grid>
      <Grid container alignItems="center" className="footer">
        <Button
          onClick={() =>
            onSubmtit({
              created_at_start: createdAtStart,
              created_at_end: createdAtEnd,
              minimum_amount: priceRange[0],
              maximum_amount: priceRange[1],
              status: status,
              is_filter: true
            })
          }
          fullWidth
          variant="contained"
          color="primary"
        >
          اعمال
        </Button>
      </Grid>
    </Style>
  );
};

export default FinanceFilter;
