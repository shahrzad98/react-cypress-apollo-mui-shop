import React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { ColorlibConnector, StepperContainer } from './style';

export default function CustomizedStepper({ steps, activeStep }) {
  return (
    <StepperContainer>
      <Stepper
        alternativeLabel
        activeStep={activeStep - 1}
        connector={<ColorlibConnector />}
      >
        {steps.map(item => (
          <Step
            key={item.id}
            sx={{
              '.muirtl-11n2rvh-MuiStepLabel-label.MuiStepLabel-alternativeLabel':
                {
                  marginTop: `${item.id === activeStep ? '8px' : '22px'}`
                }
            }}
          >
            <StepLabel
              StepIconProps={{
                icon:
                  item.id === activeStep
                    ? item.activeIcon
                    : item.id < activeStep
                    ? item.passedIcon
                    : item.icon
              }}
            >
              {item.title}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </StepperContainer>
  );
}
