import * as React from 'react';
import Box from '@mui/material/Box';
import { ReactComponent as PackageWarning } from '../../static/svg/packageWarning.svg';
import { Button, Modal, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ExpirePackageModal = () => {
  const [showPackageModal, setShowPackageModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const packageExpired = () => setShowPackageModal(true);
    window.addEventListener('packageExpired', packageExpired);
    return () => {
      window.removeEventListener('packageExpired', packageExpired);
    };
  }, []);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    backgroundColor: 'background.paper',
    padding: 3,
    borderRadius: '10px',
    textAlign: 'center',
    '.buyPackage': {
      backgroundColor: '#483493',
      color: '#fff',
      mb: 2
    },
    '.remindLater': {
      fontSize: '14px',
      fontWeight: 400
    },
    button: {
      width: '48%'
    }
  };

  return (
    <Modal
      da-cy="newPackage-modal"
      open={showPackageModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box my={6}>
          <PackageWarning />
        </Box>
        <Typography fontWeight={500} mt={6}>
          مدت اعتبار پکیج شما به پایان رسیده است!
        </Typography>

        <Typography fontSize="14px" fontWeight={400} mt={2}>
          برای ادامه فعالیت ، نیاز است پکیج خود را تمدید کنید.
        </Typography>

        <Stack direction="row" justifyContent="space-between" my={7}>
          <Button
            color="primary"
            variant="outlined"
            className="remindLater"
            onClick={() => setShowPackageModal(false)}
          >
            بعدا یادآوری کن
          </Button>
          <Button
            className="buyPackage"
            onClick={() => {
              setShowPackageModal(false);
              navigate('/store/settings/package/renew');
            }}
          >
            خرید پکیج
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ExpirePackageModal;
