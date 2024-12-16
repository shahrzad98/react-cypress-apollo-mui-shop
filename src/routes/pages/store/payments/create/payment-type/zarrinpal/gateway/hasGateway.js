import * as React from 'react';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Typography
} from '@mui/material';
import { StyledGrid } from '../style';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as GatewayInfo } from '../../../../../../../../static/svg/gatewayInfo.svg';
import { ReactComponent as Phone } from '../../../../../../../../static/svg/phone.svg';
import { styled } from '@mui/material/styles';
import { useMutation } from '@apollo/client';
import { CHOOSE_EX_ZARRINPAL } from '../../../../../../../../constant/mutations/payment';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { InfoOutlined } from '@mui/icons-material';

const HasGateway = ({ terminals, setHasInfo, level, phoneNumber }) => {
  const navigate = useNavigate();
  const [terminal, setTerminal] = useState();
  const [chooseExGateway, { loading }] = useMutation(CHOOSE_EX_ZARRINPAL);

  useEffect(() => terminals && setTerminal(terminals[0]?.id), [terminals]);

  const StyledFormControl = styled(props => <FormControl {...props} />)(
    data => {
      return {
        width: '100%',
        marginBottom: '100px',
        '.MuiFormControlLabel-root': {
          border: data?.checked ? '1px solid red' : '0.5px solid #9185BE',
          borderRadius: '10px'
        },
        '.muirtl-1jgcpwu-MuiFormControlLabel-root': {
          margin: '12px 0'
        }
      };
    }
  );

  const StyledFormControlLabel = styled(props => (
    <FormControlLabel {...props} />
  ))(({ theme }) => ({
    '.muirtl-125x06c-MuiButtonBase-root-MuiRadio-root.Mui-checked': {
      color: theme.palette.success.main
    }
  }));

  async function chooseTerminal() {
    await chooseExGateway({
      variables: { content: { terminal_id: parseInt(terminal) } },
      onCompleted: response => {
        if (level === 'BASIC') {
          setHasInfo(true);
        } else {
          navigate(
            `/store/payment/detail/${response?.payment?.chooseExTerminalZarrinpal?.id}`
          );
        }
      },
      onError: error => {
        const errorMessage =
          JSON.parse(JSON.stringify(error))?.graphQLErrors[0]?.extensions
            ?.response?.body?.detail || 'مشکلی پیش آمده دوباره تلاش کنید';
        toast(errorMessage, {
          position: 'bottom-center',
          autoClose: 2000,
          hideProgressBar: true,
          draggable: true,
          closeButton: false,
          icon: <InfoOutlined />,
          style: { backgroundColor: '#EA002A33', color: '#EA002A' }
        });
      }
    });
  }

  return (
    <StyledGrid container>
      <ToastContainer />
      <Grid className="header">
        <Grid
          className="back-link"
          onClick={() => navigate('/store/payment/create/zarrinpal/otp')}
        >
          <i className="df-arrow" />
          <h1>زرین پال</h1>
        </Grid>
        <Typography>حساب تکراری</Typography>
      </Grid>
      <Grid
        width={1}
        className="container"
        sx={{ height: 'calc(100vh - 215px)' }}
      >
        <Box sx={{ textAlign: 'center', mb: '40px' }}>
          <GatewayInfo />
        </Box>
        <Typography
          fontSize="14px"
          textAlign="justify"
          letterSpacing={-0.3}
          mb={2}
        >
          شما قبلا با این شماره،درگاه پرداخت ثبت کردید! میتوانید درگاه خود را
          انتخاب و ثبت کرده و یا درگاه جدید بسازید.
        </Typography>
        <Stack direction="row" justifyContent="flex-end" mb={2}>
          <Typography fontSize="14px" color="#6A6F80">
            {phoneNumber?.replace(/\+98/, 0)}
          </Typography>
          <Box ml={1}>
            <Phone />
          </Box>
        </Stack>
        <StyledFormControl w={1}>
          <RadioGroup
            defaultValue={terminals && terminals[0]?.id}
            value={terminal}
            onChange={e => setTerminal(e.target.value)}
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
          >
            {terminals?.map(item => (
              <StyledFormControlLabel
                key={item.id}
                value={item.id}
                control={<Radio />}
                label={item.domain}
              />
            ))}
          </RadioGroup>
        </StyledFormControl>
      </Grid>
      <Grid container className="submitButton" justifyContent="space-between">
        <Grid item xs={6} p="0 8px">
          <Button
            fullWidth
            onClick={() => setHasInfo(true)}
            data-cy="accept"
            variant="outlined"
          >
            ساخت درگاه جدید
          </Button>
        </Grid>
        <Grid item xs={6} p="0 8px">
          <Button
            fullWidth
            onClick={chooseTerminal}
            data-cy="accept"
            variant="contained"
          >
            تایید و ثبت
            {loading && (
              <CircularProgress size={20} sx={{ ml: 1 }} color="inherit" />
            )}
          </Button>
        </Grid>
      </Grid>
    </StyledGrid>
  );
};

export default HasGateway;
