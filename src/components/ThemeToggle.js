import React from 'react';

import { HStack, Switch, useColorMode, useColorModeValue } from 'native-base';
import Icon from 'react-native-vector-icons/Feather';

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <HStack space={2} alignItems="center" justifyContent="center">
      <Icon name="moon" size={24} color={useColorModeValue('gray', 'white')} />
      <Switch isChecked={colorMode === 'light'} onToggle={toggleColorMode} />
      <Icon name="sun" size={24} color={useColorModeValue('gray', 'white')} />
    </HStack>
  );
};

export default ThemeToggle;
