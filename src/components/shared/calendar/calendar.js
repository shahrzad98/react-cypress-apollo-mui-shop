import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterJalali from '@date-io/date-fns-jalali';
// import DatePicker from '@mui/lab/DatePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
export default function LocalizedDatePicker({
  value,
  setValue,
  helperText,
  error,
  minDate,
  label,
  data_cy,
  placeholder
}) {
  const datePickerRef = React.useRef();

  return (
    <LocalizationProvider dateAdapter={AdapterJalali}>
      <DatePicker
        ref={datePickerRef}
        mask="____/__/__"
        label={label}
        // desktopModeMediaQuery="@media (min-width:320px) "
        value={value ? new Date(value) : null}
        clearable
        clearText="پاک کردن"
        showClearButton
        okText="تایید"
        cancelText="لغو"
        minDate={minDate}
        onChange={newValue => setValue(newValue)}
        renderInput={params => (
          <TextField
            {...params}
            InputProps={{
              readOnly: 'readonly'
            }}
            data-cy={data_cy}
            fullWidth
            error={error}
            helperText={helperText}
            placeholder={placeholder}
          />
        )}
      />
    </LocalizationProvider>
  );
}
