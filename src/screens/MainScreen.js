import React, { useCallback, useState, useEffect } from 'react';

import { VStack, Fab, useColorModeValue } from 'native-base';

import Icon from 'react-native-vector-icons/AntDesign';
import shortid from 'shortid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorMode } from 'native-base';

import AnimatedColorBox from '../components/AnimatedColorBox';
import TaskList from '../components/TaskList';
import Masthead from '../components/Masthead';
import NavBar from '../components/NavBar';

const initialData = [
  {
    id: shortid.generate(),
    subject: 'Add Your First Task!',
    done: false,
  },
  {
    id: shortid.generate(),
    subject: 'Just Swipe Left to Delete Task!',
    done: false,
  },
  {
    id: shortid.generate(),
    subject: 'And Rejoice Once Done!',
    done: true,
  },
];

const MainScreen = () => {
  const [data, setData] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);
  const { colorMode, setColorMode } = useColorMode();

  const saveTheme = async () => {
    try {
      await AsyncStorage.setItem('theme', JSON.stringify(colorMode));
    } catch (e) {
      console.log(e);
    }
  };

  const loadTheme = async () => {
    try {
      const newTheme = await AsyncStorage.getItem('theme');

      if (newTheme && JSON.parse(newTheme).length) {
        setColorMode(JSON.parse(newTheme));
      } else {
        setColorMode('light');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const saveTodoList = async () => {
    try {
      await AsyncStorage.setItem('todoList', JSON.stringify(data));
    } catch (e) {
      console.log(e);
    }
  };

  const loadTodoList = async () => {
    try {
      const todos = await AsyncStorage.getItem('todoList');

      if (todos && JSON.parse(todos).length) {
        setData(JSON.parse(todos));
      } else {
        setData(initialData);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadTodoList();
    loadTheme();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    saveTodoList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    saveTheme();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorMode]);

  const handleToggleTaskItem = useCallback(item => {
    setData(prevData => {
      const newData = [...prevData];
      const index = prevData.indexOf(item);
      newData[index] = {
        ...item,
        done: !item.done,
      };
      return newData;
    });
  }, []);

  const handleChangeTaskItemSubject = useCallback((item, newSubject) => {
    setData(prevData => {
      const newData = [...prevData];
      const index = prevData.indexOf(item);
      newData[index] = {
        ...item,
        subject: newSubject,
      };
      return newData;
    });
  }, []);

  const handleFinishEditingTaskItem = useCallback(
    item => {
      if (item.subject === '') {
        handleRemoveItem(item);
      }
      setEditingItemId(null);
    },
    [handleRemoveItem],
  );

  const handlePressTaskItemLabel = useCallback(item => {
    setEditingItemId(item.id);
  }, []);

  const handleRemoveItem = useCallback(item => {
    setData(prevData => {
      const newData = prevData.filter(i => i !== item);
      return newData;
    });
  }, []);

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
        <TaskList
          data={data}
          onToggleItem={handleToggleTaskItem}
          onChangeSubject={handleChangeTaskItemSubject}
          onFinishEditing={handleFinishEditingTaskItem}
          onPressLabel={handlePressTaskItemLabel}
          onRemoveItem={handleRemoveItem}
          editingItemId={editingItemId}
        />
      </VStack>
      <Fab
        position="absolute"
        renderInPortal={false}
        size="sm"
        icon={<Icon color="white" name="plus" />}
        colorScheme={useColorModeValue('blue', 'darkBlue')}
        bg={useColorModeValue('blue.500', 'blue.400')}
        onPress={() => {
          const id = shortid.generate();
          setData([
            {
              id,
              subject: '',
              done: false,
            },
            ...data,
          ]);
          setEditingItemId(id);
        }}
      />
    </AnimatedColorBox>
  );
};

export default MainScreen;
