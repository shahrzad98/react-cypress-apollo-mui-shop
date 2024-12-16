import * as React from 'react';
import { Button, Grid, Modal, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { zarrinpalFeedbackTypes } from '../../../../constant';

const FeedbackModal = ({ open, onClose, modalType }) => {
  const Style = styled(Grid)`
    h4 {
      font-weight: 500;
      font-size: 18px;
      color: #6a6f80;
      margin: 30px 0 15px;
    }
    p {
      font-weight: 400;
      font-size: 16px;
      color: #2f2f2f;
      margin: 24px 0 80px;
    }
  `;

  return (
    <Modal open={open} data-cy="shipping-modal">
      <Style
        width="100vw"
        height="100vh"
        container
        alignItems="center"
        justifyContent="center"
      >
        <Grid
          width="90%"
          bgcolor="#fff"
          borderRadius="10px"
          p="30px 16px"
          container
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid
            container
            flexDirection="column"
            alignItems="center"
            textAlign="center"
          >
            {zarrinpalFeedbackTypes[modalType].icon}
            <Typography variant="h4" color="#6A6F80">
              {zarrinpalFeedbackTypes[modalType].title}
            </Typography>
            <Typography variant="body2">
              {zarrinpalFeedbackTypes[modalType].desc}
            </Typography>
          </Grid>
          <Button
            onClick={onClose}
            fullWidth
            color="primary"
            variant="contained"
          >
            متوجه شدم
          </Button>
        </Grid>
      </Style>
    </Modal>
  );
};

export default FeedbackModal;
