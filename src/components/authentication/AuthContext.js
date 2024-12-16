import React from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  loading: true,
  errorLogin: '',
  login: () => {},
  logout: () => {},
  hasActivePackage: false,
  packageExpireDate: ''
});
AuthContext.displayName = 'AuthContext';
export default AuthContext;
