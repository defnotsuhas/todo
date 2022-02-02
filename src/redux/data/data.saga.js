import { call, put, select } from 'redux-saga/effects';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { handleSetTasks } from './data.actions';

import shortid from 'shortid';

const INITIAL_TASKS = [
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

export function* handleSaveTasks() {
  try {
    const { data } = yield select();
    let newTasks = data.tasks;
    yield call(AsyncStorage.setItem, 'todoList', JSON.stringify(newTasks));
  } catch (error) {
    console.log(error);
  }
}
