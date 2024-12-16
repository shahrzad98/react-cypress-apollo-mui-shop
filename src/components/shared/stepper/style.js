import { styled } from '@mui/material/styles';
import StepConnector, {
  stepConnectorClasses
} from '@mui/material/StepConnector';
import Stack from '@mui/material/Stack';

export const ColorlibConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: '#483493'
    }
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient( 90deg, #483493 20%, #483493 100%)'
    }
  },
  [`& .${stepConnectorClasses.line}`]: {
    border: 0,
    backgroundImage:
      'linear-gradient(90deg, #483493, #483493 50%, transparent 40%)',
    backgroundSize: '11px',
    height: '2px',
    borderRadius: 1,
    width: '90%',
    margin: 'auto'
  }
}));

export const StepperContainer = styled(Stack)`
  width: 100%;
  .MuiStepLabel-label {
    font-size: 12px;
    width: max-content;
  }
`;
