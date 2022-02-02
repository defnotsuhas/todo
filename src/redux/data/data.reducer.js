import { DataActionTypes } from './data.types';

import {
  setTasks,
  toggleTaskItem,
  changeTaskItemSubject,
  finishEditingTaskItem,
  pressTaskItemLabel,
  removeTask,
  newTaskItem,
} from './data.utils';

const INITIAL_STATE = {
  tasks: [],
  editingId: null,
};

const dataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DataActionTypes.SET_TASKS: {
      let tasks = setTasks(state.tasks, action.payload);

      return {
        ...state,
        tasks,
      };
    }
    case DataActionTypes.TOGGLE_TASK_ITEM: {
      let tasks = toggleTaskItem(state.tasks, action.payload);

      return {
        ...state,
        tasks,
      };
    }

    case DataActionTypes.CHANGE_TASK_ITEM_SUBJECT: {
      let tasks = changeTaskItemSubject(
        state.tasks,
        action.payload.task,
        action.payload.subject,
      );

      return {
        ...state,
        tasks,
      };
    }

    case DataActionTypes.FINISH_EDITING_TASK_ITEM: {
      return finishEditingTaskItem(state, action.payload);
    }

    case DataActionTypes.PRESS_TASK_ITEM_LABEL: {
      return pressTaskItemLabel(state, action.payload);
    }

    case DataActionTypes.REMOVE_TASK_ITEM: {
      let tasks = removeTask(state.tasks, action.payload);

      return {
        ...state,
        tasks,
      };
    }

    case DataActionTypes.NEW_TASK_ITEM: {
      return newTaskItem(state);
    }

    default:
      return state;
  }
};

export default dataReducer;
