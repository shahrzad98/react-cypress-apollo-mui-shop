import * as React from 'react';
import { Box, Stack, Tooltip, Typography } from '@mui/material';
import { ReactComponent as CloseSvg } from '../../../../../../../../static/svg/clsoe.svg';
import { ReactComponent as TooltipSvg } from '../../../../../../../../static/svg/tooltip.svg';
import { withStyles } from '@mui/styles';
import { useState } from 'react';

const CustomTooltip = ({
  type,
  top,
  right = '16px',
  arrowStyle = '14px!important'
}) => {
  const [open, setOpen] = useState(false);

  const StyledTooltip = withStyles({
    tooltip: {
      backgroundColor: 'rgba(0,0,0,0.76)',
      minWidth: '340px',
      height: '158px',
      padding: '16px 12px',
      margin: '0!important',
      borderRadius: '10px',
      top: top,
      right: right,
      '& .MuiTooltip-arrow': {
        left: arrowStyle
      }
    }
  })(Tooltip);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const tooltipOptions = {
    SILVER: {
      open: open,
      handleOpen: handleOpen,
      handleClose: handleClose,
      title: ' ویژگی کاربر نقره ای',
      body: (
        <>
          <Typography fontSize="14px" fontWeight={500} mb={1}>
            تسویه در لحظه انجام میگیرد.
          </Typography>
          <Typography fontSize="14px" mb={1}>
            برای انجام تسویه ، محدودیت مبلغ وجود ندارد.
          </Typography>
          <Typography fontSize="14px" mb={2}>
            محدودیتی برای تراکنش وجود ندارد.
          </Typography>
        </>
      )
    },
    BASIC: {
      open: open,
      handleOpen: handleOpen,
      handleClose: handleClose,
      title: ' ویژگی کاربر آبی',
      body: (
        <>
          <Typography fontSize="14px" fontWeight={500} mb={1}>
            تسویه 3 روز یکبار انجام میگیرد.
          </Typography>
          <Typography fontSize="14px" mb={1}>
            برای انجام تسویه،مبلغ آن حداقل 10,000 تومان باید باشد.
          </Typography>
          <Typography fontSize="14px" mb={2}>
            محدودیت تراکنش برای پرداخت ، 2,000,000 تومان است.
          </Typography>
        </>
      )
    }
  };
  return (
    <StyledTooltip
      open={tooltipOptions[type]?.open}
      arrow
      onOpen={tooltipOptions[type]?.handleOpen}
      onClose={tooltipOptions[type]?.handleClose}
      title={
        <Box>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography fontSize="16px" fontWeight={700}>
              {tooltipOptions[type]?.title}
            </Typography>
            <CloseSvg onClick={tooltipOptions[type]?.handleClose} />
          </Stack>
          {tooltipOptions[type]?.body}
        </Box>
      }
    >
      <Box onClick={tooltipOptions[type]?.handleOpen}>
        <TooltipSvg />
      </Box>
    </StyledTooltip>
  );
};

export default CustomTooltip;
