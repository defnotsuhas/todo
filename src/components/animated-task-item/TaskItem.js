import React, { useCallback } from 'react';

import { Pressable } from 'react-native';
import {
  Box,
  HStack,
  useTheme,
  themeTools,
  useColorModeValue,
  Input,
} from 'native-base';

import Icon from 'react-native-vector-icons/Feather';

import AnimatedCheckBox from '../animated-checkbox/AnimatedCheckBox';
import AnimatedTaskLabel from './AnimatedTaskLabel';
import SwipableView from './SwipableView';

const TaskItem = ({
  simultaneousHandlers,
  isDone,
  subject,
  isEditing,
  onChangeSubject,
  onFinishEditing,
  onToggleCheckbox,
  onPressLabel,
  onRemove,
}) => {
  const theme = useTheme();

  // Colors
  const highlightColor = themeTools.getColor(
    theme,
    useColorModeValue('blue.500', 'blue.400'),
  );
  const boxStroke = themeTools.getColor(
    theme,
    useColorModeValue('muted.300', 'muted.500'),
  );
  const checkmarkColor = themeTools.getColor(
    theme,
    useColorModeValue('white', 'white'),
  );
  const activeTextColor = themeTools.getColor(
    theme,
    useColorModeValue('darkText', 'lightText'),
  );
  const doneTextColor = themeTools.getColor(
    theme,
    useColorModeValue('muted.400', 'muted.600'),
  );

  // Handle Subject Change using NativeEvent.Text and passing prop
  const handleChangeSubject = useCallback(
    e => {
      onChangeSubject(e.nativeEvent.text);
    },
    [onChangeSubject],
  );

  return (
    <SwipableView
      simultaneousHandlers={simultaneousHandlers}
      onSwipeLeft={onRemove}
      backView={
        <Box
          w="full"
          h="full"
          bg="red.500"
          alignItems="flex-end"
          justifyContent="center"
          pr={4}>
          <Icon name="trash-2" color="white" size={14} />
        </Box>
      }>
      <HStack
        alignItems="center"
        w="full"
        px={4}
        py={2}
        bg={useColorModeValue('warmGray.50', 'primary.900')}>
        <Box width={30} height={30} mr={2}>
          <Pressable onPress={onToggleCheckbox}>
            <AnimatedCheckBox
              highlightColor={highlightColor}
              checkmarkColor={checkmarkColor}
              boxOutlineColor={boxStroke}
              checked={isDone}
            />
          </Pressable>
        </Box>
        {isEditing ? (
          <Input
            placeholder="Task"
            value={subject}
            variant="unstyled"
            fontSize={19}
            px={1}
            py={0}
            autoFocus
            blurOnSubmit
            onChange={handleChangeSubject}
            onBlur={onFinishEditing}
          />
        ) : (
          <AnimatedTaskLabel
            textColor={activeTextColor}
            inactiveTextColor={doneTextColor}
            strikethrough={isDone}
            onPress={onPressLabel}>
            {subject}
          </AnimatedTaskLabel>
        )}
      </HStack>
    </SwipableView>
  );
};

export default TaskItem;
