import React from 'react';
import styled from '@emotion/styled';
import { Grid } from '@mui/material';
import { useTheme } from '@mui/styles';

const Style = styled(Grid)(props => ({
  display: 'flex',
  alignItems: 'center',
  scrollSnapAlign: 'start',
  '& .status': {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    '& .status--icon': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      '& .circle': {
        width: '24px',
        height: '24px',
        borderRadius: '50px',
        border: '2px solid #DAD6E9'
      },
      '& p': {
        color: '#ADAABA',
        fontSize: '12px',
        fontWeight: 'normal',
        margin: '7px 0 0 0',
        whiteSpace: 'nowrap',
        marginTop: '6px'
      }
    },
    '& .border--divider': {
      width: '70px',
      height: '1px',
      background: '#DAD6E9',
      marginBottom: '24px'
    },
    '& .df-close': {
      position: 'absolute',
      top: '29%',
      right: '35px',
      transform: 'translate(50%,-50%)',
      fontSize: '12px',
      fontWeight: 'bold',
      zIndex: '1',
      background: '#fff',
      padding: '7px',
      borderRadius: '100px',
      color: '#FFC72A'
    },
    '&.active': {
      '& .circle': {
        width: '32px',
        height: '32px',
        border: `3px solid ${props.theme.palette.primary.light}`
      },
      '& p': {
        marginTop: '5px',
        color: props.theme.palette.primary.light,
        fontWeight: 'bold'
      }
    },
    '&.done': {
      opacity: '.8',
      '& .circle': {
        border: 'none',
        background: props.theme.palette.primary.light
      },
      '& p': {
        color: props.theme.palette.primary.light,
        fontWeight: 'bold'
      }
    },
    '&.warning': {
      '& .border--divider': {
        background: '#FFC72A'
      }
    },
    '&.error': {
      '& .circle': {
        border: '3px solid #EA002A'
      },
      '& .border--divider': {
        background: '#EA002A'
      },
      '& p': {
        color: '#EA002A'
      },
      '& .df-close': {
        color: '#EA002A'
      }
    }
  }
}));

const Status = ({ name, step, currentStep, warning, error }) => {
  const theme = useTheme();

  return (
    <Style id={step === currentStep ? 'active' : ''} theme={theme}>
      <div
        className={`status${
          step === currentStep ? ' active' : step < currentStep ? ' done' : ''
        }${
          step === currentStep && warning
            ? ' warning'
            : step === currentStep && error
            ? ' error'
            : ''
        }`}
      >
        <div className="status--icon">
          <div className="circle" />
          <p>{name}</p>
        </div>
        <div className="border--divider" />
        {step === currentStep && (warning || error) ? (
          <i className="df-close" />
        ) : null}
      </div>
    </Style>
  );
};

export default Status;
