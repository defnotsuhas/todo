import React, { useCallback } from 'react';
import {
  HStack,
  VStack,
  Center,
  Avatar,
  Heading,
  IconButton,
  useColorModeValue,
} from 'native-base';

import AnimatedColorBox from './AnimatedColorBox';
import ThemeToggle from './ThemeToggle';
import Icon from 'react-native-vector-icons/Feather';
import MenuButton from './MenuButton';

const SideBar = ({ state, navigation }) => {
  const currentRoute = state.routeNames[state.index];

  const handlePressBackButton = useCallback(() => {
    navigation.closeDrawer();
  }, [navigation]);

  const handlePressMenuMain = useCallback(() => {
    navigation.navigate('Main');
  }, [navigation]);

  const handlePressMenuAbout = useCallback(() => {
    navigation.navigate('About');
  }, [navigation]);

  return (
    <AnimatedColorBox
      flex={1}
      safeArea
      bg={useColorModeValue('blue.50', 'darkBlue.800')}
      p={7}>
      <VStack flex={1} space={2}>
        <HStack justifyContent="flex-end">
          <IconButton
            onPress={handlePressBackButton}
            borderRadius={100}
            variant="outline"
            borderColor={useColorModeValue('blue.300', 'muted.300')}
            _icon={{
              as: <Icon name="chevron-left" />,
              size: 6,
              color: useColorModeValue('blue.800', 'white'),
            }}
          />
        </HStack>
        <Avatar
          source={require('../assets/profile-image.png')}
          size="xl"
          borderRadius={100}
          mb={6}
          borderColor="secondary.500"
          borderWidth={3}
        />
        <Heading mb={4} size="xl">
          John Snow
        </Heading>
        <MenuButton
          active={currentRoute === 'Main'}
          onPress={handlePressMenuMain}
          icon={<Icon name="inbox" />}>
          Tasks
        </MenuButton>
        <MenuButton
          active={currentRoute === 'About'}
          onPress={handlePressMenuAbout}
          icon={<Icon name="info" />}>
          About
        </MenuButton>
      </VStack>
      <Center>
        <ThemeToggle />
      </Center>
    </AnimatedColorBox>
  );
};

export default SideBar;
