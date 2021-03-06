import { takeLatest } from 'redux-saga/effects';
import { DataActionTypes } from './data/data.types';

import {
  handleGetTasks,
  handleSaveTasks,
  handleFetchTasks,
} from './data/data.saga';

export function* watcherSaga() {
  yield takeLatest(DataActionTypes.GET_TASKS, handleGetTasks);
  yield takeLatest(DataActionTypes.SAVE_TASKS, handleSaveTasks);
  yield takeLatest(DataActionTypes.FETCH_TASKS, handleFetchTasks);
}
