import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-40%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
//   border: '2px solid #000',
  boxShadow: '0px 8px 10px -5px rgb(0 0 0 / 20%), 0px 16px 24px 2px rgb(0 0 0 / 14%), 0px 6px 30px 5px rgb(0 0 0 / 12%);',
  p: 4
};

export default function BasicModal({ show, close, submit }) {
  return (
    <div>
      <Modal
        open={show}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography>آیا مطمئن هستید؟</Typography>
          <Grid style={{ marginTop: '30px' }} container>
            <Grid item xs={1}></Grid>
            <Grid item xs={4}>
              <Button onClick={close} fullWidth color="primary" variant="text">
                خیر
              </Button>
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={4}>
              <Button
                onClick={submit}
                fullWidth
                color="primary"
                variant="contained">
                بله
              </Button>
            </Grid>
            <Grid item xs={1}></Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
