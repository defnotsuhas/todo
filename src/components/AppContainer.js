import React from 'react';

import { NativeBaseProvider } from 'native-base';
import theme from '../theme';

const AppContainer = ({ children }) => {
  return <NativeBaseProvider theme={theme}>{children}</NativeBaseProvider>;
};

export default AppContainer;
