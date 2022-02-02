import React from 'react';
import {
  ScrollView,
  Box,
  Text,
  VStack,
  Image,
  useColorModeValue,
  View,
} from 'native-base';

import AnimatedColorBox from '../components/AnimatedColorBox';
import NavBar from '../components/NavBar';
import Masthead from '../components/Masthead';

const AboutScreen = () => {
  return (
    <AnimatedColorBox
      flex={1}
      bg={useColorModeValue('warmGray.50', 'warmGray.900')}
      w="full">
      <Masthead
        title="About This App"
        image={require('../assets/about-masthead.png')}>
        <NavBar />
      </Masthead>
      <ScrollView
        borderTopLeftRadius="20px"
        borderTopRightRadius="20px"
        bg={useColorModeValue('warmGray.50', 'primary.900')}
        mt="-20px"
        pt="30px"
        p={4}>
        <VStack flex={1} space={4}>
          <Box alignItems="center">
            <Image
              source={require('../assets/notsuhas.webp')}
              borderRadius="full"
              resizeMode="cover"
              w={120}
              h={120}
              alt="Profile Image"
            />
          </Box>

          <Text fontSize="md">
            This is a React Native To-Do App, built with Redux & Redux Saga.
          </Text>

          <View>
            <Text fontSize="md" fontWeight="bold">
              Known Bugs:
            </Text>
            <Text fontSize="md">
              - Theme doesn't change until App is rendered.
            </Text>
            <Text fontSize="md">
              - The Animate Presence of the delete to-do can't be averted.
            </Text>
            <Text fontSize="md">
              - The TodoList isn't performant when large.
            </Text>
            <Text fontSize="md">
              - Content can get hidden behind Android NavBar if it exists.
            </Text>
            <Text fontSize="md">- Animations may look jerky.</Text>
            <Text fontSize="md">
              - On every App load, every TaskItem gets a new ID.
            </Text>
            <Text fontSize="md">
              - saveTasks is called on each keypress when updating Task Subject.
            </Text>
          </View>
        </VStack>
      </ScrollView>
    </AnimatedColorBox>
  );
};

export default AboutScreen;
