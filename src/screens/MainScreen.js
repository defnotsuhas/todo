import React, { useEffect, useRef } from 'react';

import RNAsyncStorageFlipper from 'rn-async-storage-flipper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { VStack, Fab, useColorModeValue, useColorMode } from 'native-base';

import Icon from 'react-native-vector-icons/AntDesign';

import AnimatedColorBox from '../components/AnimatedColorBox';
import TaskList from '../components/TaskList';
import Masthead from '../components/Masthead';
import NavBar from '../components/NavBar';

import { connect } from 'react-redux';
import {
  handleChangeTaskItemSubject,
  handleFinishEditingTaskItem,
  handleNewTaskItem,
  handlePressTaskItemLabel,
  handleRemoveTaskItem,
  handleToggleTaskItem,
  handleGetTasks,
  handleSaveTasks,
} from '../redux/data/data.actions';

const MainScreen = ({
  tasks,
  editingId,
  getTasks,
  saveTasks,
  toggleTaskItem,
  changeTaskItemSubject,
  finishEditingTaskItem,
  newTaskItem,
  pressTaskItemLabel,
  removeTaskItem,
}) => {
  // For Debugging AsyncStorage in Flipper
  RNAsyncStorageFlipper(AsyncStorage);

  const { colorMode, setColorMode } = useColorMode();
  const didMount = useRef(false);

  // Save Theme into AsyncStorage
  const saveTheme = async () => {
    try {
      await AsyncStorage.setItem('theme', JSON.stringify(colorMode));
    } catch (e) {
      console.log(e);
    }
  };

  // Load Theme from AsyncStorage
  const loadTheme = async () => {
    try {
      const newTheme = await AsyncStorage.getItem('theme');

      if (newTheme && JSON.parse(newTheme).length) {
        setColorMode(JSON.parse(newTheme));
      }
    } catch (e) {
      console.log(e);
    }
  };

  // Call loadTheme & getTasks on Initial Render
  useEffect(() => {
    loadTheme();
    getTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Call saveTasks when tasks changes except on Initial Render
  // This could be done better by using a Debounce Function to avoid excessive saving.
  useEffect(() => {
    if (didMount.current) {
      saveTasks();
    } else {
      didMount.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks]);

  // Call saveTheme when Theme is changed
  useEffect(() => {
    saveTheme();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorMode]);

  return (
    <AnimatedColorBox
      bg={useColorModeValue('warmGray.50', 'primary.900')}
      w="full"
      flex={1}>
      <Masthead
        title="What's up, John!"
        image={require('../assets/masthead.png')}>
        <NavBar />
      </Masthead>
      <VStack
        space={1}
        flex={1}
        bg={useColorModeValue('warmGray.50', 'primary.900')}
        mt="-20px"
        borderTopLeftRadius="20px"
        borderTopRightRadius="20px"
        pt="20px">
        {tasks && (
          <TaskList
            data={tasks}
            onToggleItem={toggleTaskItem}
            onChangeSubject={changeTaskItemSubject}
            onFinishEditing={finishEditingTaskItem}
            onPressLabel={pressTaskItemLabel}
            onRemoveItem={removeTaskItem}
            editingItemId={editingId}
          />
        )}
      </VStack>
      <Fab
        position="absolute"
        renderInPortal={false}
        size="sm"
        icon={<Icon color="white" name="plus" />}
        colorScheme={useColorModeValue('blue', 'darkBlue')}
        bg={useColorModeValue('blue.500', 'blue.400')}
        onPress={newTaskItem}
      />
    </AnimatedColorBox>
  );
};

// Maps the States to the Props of the Component
const mapStateToProps = state => ({
  tasks: state.data.tasks,
  editingId: state.data.editingId,
});

// Maps the Dispatch Methods to the Props of the Component
const mapDispatchToProps = dispatch => ({
  toggleTaskItem: task => dispatch(handleToggleTaskItem(task)),
  changeTaskItemSubject: data => dispatch(handleChangeTaskItemSubject(data)),
  finishEditingTaskItem: task => dispatch(handleFinishEditingTaskItem(task)),
  newTaskItem: () => dispatch(handleNewTaskItem()),
  pressTaskItemLabel: task => dispatch(handlePressTaskItemLabel(task)),
  removeTaskItem: task => dispatch(handleRemoveTaskItem(task)),
  getTasks: () => dispatch(handleGetTasks()),
  saveTasks: () => dispatch(handleSaveTasks()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
