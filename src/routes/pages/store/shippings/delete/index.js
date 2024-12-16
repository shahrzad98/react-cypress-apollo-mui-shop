import { Close } from '@mui/icons-material';
import { Button, Grid, IconButton, Modal } from '@mui/material';
import React from 'react';
import { Style } from '../style';
import { useMutation } from '@apollo/client';
import { DELETE_SHIPPING } from '../../../../../constant/mutations/shipping';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteModal = ({ showDeleteModal, onClose, label }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [deleteShipping, { loading }] = useMutation(DELETE_SHIPPING);

  function deleteHandle() {
    return deleteShipping({
      variables: { content: { id: parseInt(params.id) } }
    }).then(() => {
      !loading && onClose();
      navigate('/store/shippings');
    });
  }

  return (
    <>
      <Modal open={Boolean(showDeleteModal)} onClose={onClose}>
        <Style
          width="100vw"
          height="100vh"
          container
          alignItems="center"
          justifyContent="center"
        >
          <Grid
            width="90%"
            height="30%"
            bgcolor="#fff"
            borderRadius="10px"
            p="15px 14px"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid
              m={0}
              width={'100%'}
              display={'flex'}
              justifyContent={'flex-end'}
            >
              <IconButton sx={{ padding: 0 }} onClick={onClose}>
                <Close />
              </IconButton>
            </Grid>
            <Grid flexDirection="column">
              <p className="descDelete">
                {` آیا از حذف روش ارسال ${label} اطمینان دارید؟`}
              </p>
            </Grid>
            <Grid
              mt={'45px'}
              display={'flex'}
              justifyContent={'flex-end'}
              width={'100%'}
            >
              <Button
                onClick={onClose}
                color="primary"
                variant="text"
                sx={{
                  paddingLeft: '27px',
                  paddingRight: '27px'
                }}
              >
                انصراف
              </Button>
              <Button
                onClick={deleteHandle}
                color="primary"
                variant="outlined"
                sx={{
                  paddingLeft: '40px',
                  paddingRight: '40px'
                }}
              >
                حذف
              </Button>
            </Grid>
          </Grid>
        </Style>
      </Modal>
    </>
  );
};

export default DeleteModal;
