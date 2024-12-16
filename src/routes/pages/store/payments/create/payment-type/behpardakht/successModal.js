import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid } from '@mui/material';
import MemoSuccessBehpardakht from '../../../../svg/SuccessBehpardakht';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  borderRadius: '10px',
  transform: 'translate(-50%, -50%)',
  width: '343px',
  bgcolor: 'background.paper',
  boxShadow:
    '0px 8px 10px -5px rgb(0 0 0 / 20%), 0px 16px 24px 2px rgb(0 0 0 / 14%), 0px 6px 30px 5px rgb(0 0 0 / 12%);',
  p: 2,
  minHeight: '454px',
  height: '454px'
};
export default function SuccessModal({ show, close, submit }) {
  return (
    <div>
      <Modal
        open={show}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid
            container
            style={{ height: '100%' }}
            alignItems="center"
            justifyContent={'space-around'}
          >
            <Grid item xs={12} textAlign={'center'}>
              <MemoSuccessBehpardakht />
            </Grid>
            <Grid item xs={12} textAlign={'center'}>
              <Typography fontWeight={500} fontSize="18px" color="GrayText">
                اتصال موفق درگاه پرداخت
              </Typography>
            </Grid>
            <Grid item xs={12} textAlign={'center'}>
              <Typography fontWeight={400} fontSize="16px">
                درگاه اینترنتی به پرداخت ملت شما با موفقیت ثبت شد.
              </Typography>
            </Grid>
            <Grid item xs={12} textAlign={'center'}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={submit}
              >
                متوجه شدم
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
