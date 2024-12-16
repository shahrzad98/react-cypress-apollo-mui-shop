import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { ReactComponent as Logo } from '../../static/svg/Logo.svg';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'rgba(255,255,255)',
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

const InitialLoading = ({ show: s }) => {
  const [show, setShow] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    const t = setTimeout(() => {
      setShow(false);
    }, 2000);
    return () => clearTimeout(t);
  }, [s]);
  if (!show) return null;
  return (
    <div className={classes.root}>
      <Logo style={{ width: '250px' }} />
    </div>
  );
};

export default InitialLoading;
