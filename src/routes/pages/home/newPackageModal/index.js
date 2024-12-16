import * as React from 'react';
import { Box, Button, Modal, Stack, Typography } from '@mui/material';
import { ReactComponent as Diamond } from '../svg/diamond.svg';
import { ReactComponent as PurpleArrow } from '../svg/purpleArrow.svg';
import { style } from './style';
import { useNavigate } from 'react-router-dom';

const NewPackageModal = ({ open, onClose, remainingDays }) => {
  const navigate = useNavigate();

  return (
    <Modal
      da-cy="newPackage-modal"
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Diamond />
        {remainingDays > 0 ? (
          <Typography fontWeight={500} mt={6}>
            {remainingDays} روز تا پایان مدت اعتبار پکیج شما باقی مانده است !
          </Typography>
        ) : (
          <Typography fontWeight={500} mt={6}>
            مدت اعتبار پکیج شما به پایان رسیده است !
          </Typography>
        )}

        <Typography fontSize="14px" fontWeight={400} mt={2}>
          همین حالا خرید پکیج خود را نهایی کنید تا از خدمات راه‌اندازی سایت به
          صورت اختصاصی و رایگان بهره‌مند شوید.
        </Typography>

        <Stack
          direction="row"
          alignItems="center"
          mt={2}
          mb={8}
          mx="auto"
          justifyContent="center"
        >
          <Typography fontSize="10px" color="#483493" fontWeight={500} mr="5px">
            بیشتر بدانید
          </Typography>
          <PurpleArrow />
        </Stack>
        <Button
          fullWidth
          className="buyPackage"
          onClick={() => navigate('/store/settings/package/renew')}
        >
          خرید پکیج
        </Button>
        <Button
          fullWidth
          color="primary"
          variant="outlined"
          className="remindLater"
          onClick={onClose}
        >
          بعدا یادآوری کن
        </Button>
      </Box>
    </Modal>
  );
};

export default NewPackageModal;
