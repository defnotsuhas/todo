import { call, put, select } from 'redux-saga/effects';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { handleSetTasks } from './data.actions';

import shortid from 'shortid';
import axios from 'axios';

const INITIAL_TASKS = [
  {
    id: shortid.generate(),
    title: 'Add Your First Task!',
    completed: false,
  },
  {
    id: shortid.generate(),
    title: 'Just Swipe Left to Delete Task!',
    completed: false,
  },
  {
    id: shortid.generate(),
    title: 'And Rejoice Once Done!',
    completed: true,
  },
];

export function* handleGetTasks() {
  try {
    const tasks = yield call(AsyncStorage.getItem, 'todoList');

    if (tasks) {
      yield put(handleSetTasks(JSON.parse(tasks)));
    } else {
      yield put(handleSetTasks(INITIAL_TASKS));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* handleFetchTasks() {
  try {
    const { data } = yield call(
      axios.get,
      'https://jsonplaceholder.typicode.com/todos',
    );
    let tasks = data.sort(() => Math.random() - Math.random()).slice(0, 6);

    if (tasks) {
      yield put(handleSetTasks(tasks));
    } else {
      yield put(handleSetTasks(INITIAL_TASKS));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* handleSaveTasks() {
  try {
    const { data } = yield select();
    let newTasks = data.tasks;
    yield call(AsyncStorage.setItem, 'todoList', JSON.stringify(newTasks));
  } catch (error) {
    console.log(error);
  }
}
