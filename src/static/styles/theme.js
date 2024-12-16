import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  direction: 'rtl',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1400,
      xxl: 1920
    }
  },
  typography: {
    fontFamily: [
      'IRANSans',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'sans-serif'
    ].join(','),
    button: {
      fontSize: 16
    }
  },
  palette: {
    primary: {
      main: '#483493'
    },
    success: {
      main: '#00f673'
    },
    background: {
      default: '#f5f6fa'
    },
    warning: {
      main: '#ffbd06'
    },
    error: {
      main: '#EA002A'
    },
    shadow: {
      1: 'rgba(132, 50, 240, 0.4)',
      2: 'rgba(0, 0, 0, 0.12)',
      3: 'rgba(170, 105, 255, 0.08)',
      4: 'rgba(198, 203, 219, 0.4)'
    },
    grey: {
      300: '#f5f6fa',
      400: '#c0c0c0',
      500: '#787878',
      600: '#5a5a5a',
      700: '#494949'
    },
    blue: {
      100: '#f0f1f5',
      200: '#c6cbdb',
      300: '#9fa6b9',
      400: '#6A6F80',
      800: '#515664'
    },
    purple: {
      100: '#efddff',
      200: '#ab6bff',
      700: '#47089b'
    },
    green: {
      100: '#44ee9f',
      200: '#00f673',
      500: '#217346'
    },
    red: {
      700: '#ff0000'
    }
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          position: 'relative',
          borderRadius: '14px',
          ':hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#483493'
          },
          '&.Mui-disabled': {
            background: '#F3F3F3'
          }
        },
        notchedOutline: {
          borderColor: '#9185BE',
          borderRadius: '14px',
          ':hover': {
            borderColor: '#483493'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          height: '50px',
          borderRadius: '12px'
        },
        text: {
          color: '#9185BE',
          fontSize: '14px'
        }
      }
    },
    MuiAutocomplete: {
      styleOverrides: {
        option: {
          backgroundColor: 'transparent !important'
        }
      }
    },
    MuiMenu: {
      styleOverrides: {
        list: {
          maxHeight: '300px'
        }
      }
    }
  }
});

export default theme;
