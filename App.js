/* eslint-disable react-native/no-inline-styles */

import React from 'react';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import AppContainer from './src/components/AppContainer';
import Navigator from './src/Navigator';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppContainer>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </AppContainer>
    </GestureHandlerRootView>
  );
};

export default App;
