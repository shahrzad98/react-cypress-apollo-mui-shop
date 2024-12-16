import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './components/authentication/AuthProvider';
import './static/fonts/css/fontiran.css';
import App from './components/App';
import Apollo from './apollo/Apollo';
import { ThemeProvider } from '@mui/material/styles';
import theme from './static/styles/theme';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { CssBaseline } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import './static/styles/global.css';
// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin]
});

render(
  <React.StrictMode>
    <BrowserRouter>
      <Apollo>
        <AuthProvider>
          <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <App />
            </ThemeProvider>
          </CacheProvider>
        </AuthProvider>
      </Apollo>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  navigator.serviceWorker.register('sw-v1.js', { scope: '/' });
}

if (module.hot) module.hot.accept();
