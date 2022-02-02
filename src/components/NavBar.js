import React, { useCallback } from 'react';

import { HStack, IconButton } from 'native-base';
import Icon from 'react-native-vector-icons/Feather';

import { useNavigation } from '@react-navigation/native';

const NavBar = () => {
  const navigation = useNavigation();

  const handlePressMenuButton = useCallback(() => {
    navigation.openDrawer();
  }, [navigation]);

  return (
    <HStack
      w="full"
      safeArea
      alignItems="center"
      alignContent="center"
      px={4}
      py={7}>
      <IconButton
        onPress={handlePressMenuButton}
        borderRadius={100}
        _icon={{ as: <Icon name="menu" />, size: 6, color: 'white' }}
      />
    </HStack>
  );
};

export default NavBar;
