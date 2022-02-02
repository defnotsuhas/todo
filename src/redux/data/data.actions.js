import { DataActionTypes } from './data.types';

export const handleGetTasks = () => ({
  type: DataActionTypes.GET_TASKS,
});

export const handleSaveTasks = () => ({
  type: DataActionTypes.SAVE_TASKS,
});

export const handleSetTasks = tasks => ({
  type: DataActionTypes.SET_TASKS,
  payload: tasks,
});

export const handleToggleTaskItem = task => ({
  type: DataActionTypes.TOGGLE_TASK_ITEM,
  payload: task,
});

export const handleChangeTaskItemSubject = dataObject => ({
  type: DataActionTypes.CHANGE_TASK_ITEM_SUBJECT,
  payload: dataObject,
});

export const handleFinishEditingTaskItem = task => ({
  type: DataActionTypes.FINISH_EDITING_TASK_ITEM,
  payload: task,
});

export const handlePressTaskItemLabel = task => ({
  type: DataActionTypes.PRESS_TASK_ITEM_LABEL,
  payload: task,
});

export const handleRemoveTaskItem = task => ({
  type: DataActionTypes.REMOVE_TASK_ITEM,
  payload: task,
});

export const handleNewTaskItem = () => ({
  type: DataActionTypes.NEW_TASK_ITEM,
});
