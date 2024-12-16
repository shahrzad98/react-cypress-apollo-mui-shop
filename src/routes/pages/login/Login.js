import React from 'react';
import { Formik } from 'formik';
import useAuth from '../../../components/authentication/useAuth';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { ReactComponent as Logo } from '../../../static/svg/Logo.svg';
import { Button, CircularProgress, Grid, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
const mobileRegex = /^(\+98|0)?9\d{9}$/g;
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
const useStyles = makeStyles(theme => ({
  root: {
    width: '100vw',
    height: '100vh',
    paddingTop: '8vh',
    textAlign: 'center',
    backgroundColor: theme.palette.common.white,
    borderRadius: '10px',
    margin: 'auto',
    padding: '30px',
    '& p': {
      marginBottom: '35px'
    },
    '& h1': {
      fontSize: '28px'
    },
    '& a': {
      textDecoration: 'none'
    },
    '& .MuiFormHelperText-root': {
      marginBottom: 0
    }
  },
  logoCont: {
    width: '100%',
    textAlign: 'center',
    paddingTop: '30px',
    paddingBottom: '30px'
  },
  btnCont: {
    width: '100%',
    marginTop: '40px'
  },
  loginError: {
    width: '100%',
    color: 'red',
    textAlign: 'center',
    marginTop: '20px'
  }
}));

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const classes = useStyles();
  const [showPass, setShowPass] = React.useState({
    password: false
  });

  const handleClickShowPassword = type => {
    setShowPass(prevState => ({
      ...prevState,
      [type]: !prevState[type]
    }));
  };
  return (
    <div>
      <Formik
        initialValues={{
          username: '',
          password: ''
        }}
        validate={values => {
          const errors = {};
          if (!values.username.match(mobileRegex)) {
            errors.username = 'شماره تلفن را به درستی وارد کنید';
          }
          if (!values.username) {
            errors.username = 'این فیلد الزامی است';
          }
          if (values.password?.length < 8) {
            errors.password = 'رمز عبور باید حداقل ۸ کاراکتر باشد';
          }
          if (!values.password) {
            errors.password = 'این فیلد الزامی است';
          }

          return errors;
        }}
        onSubmit={(values, actions) => {
          actions.setSubmitting(true);
          auth.login(values, () => {
            actions.setSubmitting(false);
          });
        }}
      >
        {({
          handleSubmit,
          handleBlur,
          isSubmitting,
          handleChange,
          errors,
          touched
        }) => (
          <Box
            // onRequestSubmit={handleSubmit}
            className={classes.root}
            component="form"
            onSubmit={handleSubmit}
          >
            <div className={classes.logoCont}>
              <Logo style={{ width: '170px' }} />
            </div>
            <h1>ورود به دیجی‌فای</h1>
            <p>اطلاعات کاربری خود را وارد کرده و وارید شوید.</p>
            <TextField
              fullWidth
              error={touched.username && !!errors.username}
              helperText={errors.username}
              onBlur={handleBlur}
              onChange={handleChange}
              variant="outlined"
              label="شماره تلفن"
              id="username"
              name="username"
            />
            <div style={{ marginBottom: '2rem' }} />
            <TextField
              fullWidth
              type={showPass.password ? 'text' : 'password'}
              error={!!errors.password}
              helperText={errors.password}
              variant="outlined"
              label="رمز عبور"
              onBlur={handleBlur}
              onChange={handleChange}
              id="password"
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => handleClickShowPassword('password')}
                  >
                    {showPass.password ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                )
              }}
            />
            {auth.errorLogin ? (
              <div className={classes.loginError} data-error="loginError">
                {auth.errorLogin}
              </div>
            ) : null}
            <div className={classes.btnCont}>
              <Button variant="contained" fullWidth type="submit" id="btnLogin">
                {isSubmitting ? (
                  <CircularProgress style={{ color: 'white' }} />
                ) : (
                  'ورود'
                )}
              </Button>
            </div>
            <Grid style={{ marginTop: '30px' }} container>
              <Grid item xs={6}>
                <a
                  target="_blank"
                  rel="noreferrer"
                  id="btnSingup"
                  href="https://register.digify.shop"
                >
                  <Button variant="text" color="primary">
                    هنوز ثبت نام نکردم
                  </Button>
                </a>
              </Grid>
              <Grid
                onClick={() => navigate('/forget-password')}
                style={{ borderRight: '1px solid #9185BE' }}
                id="btnForgotPassword"
                item
                xs={6}
              >
                <Button variant="text" color="primary">
                  رمز عبورم را فراموش کردم
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
      </Formik>
    </div>
  );
};
export default Login;
