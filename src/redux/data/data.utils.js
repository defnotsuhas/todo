import shortid from 'shortid';

export const setTasks = (tasks, loadTasks) => {
  let newTasks = [...loadTasks];

  return newTasks;
};

export const toggleTaskItem = (tasks, taskToToggle) => {
  let index = tasks.indexOf(taskToToggle);
  let newTasks = [...tasks];

  newTasks[index] = {
    ...taskToToggle,
    completed: !taskToToggle.completed,
  };
  return newTasks;
};

export const changeTaskItemSubject = (tasks, taskItem, newSubject) => {
  const index = tasks.indexOf(taskItem);
  let newTasks = [...tasks];

  newTasks[index] = {
    ...taskItem,
    title: newSubject,
  };
  return newTasks;
};

export const finishEditingTaskItem = (data, taskItem) => {
  if (taskItem.subject === '') {
    let tasks = removeTask(data.tasks, taskItem);
    return {
      ...data,
      tasks,
      editingId: null,
    };
  }

  return {
    ...data,
    editingId: null,
  };
};

export const pressTaskItemLabel = (data, taskItem) => {
  return {
    ...data,
    editingId: taskItem.id,
  };
};

export const removeTask = (tasks, taskItem) => {
  const newTasks = tasks.filter(i => i !== taskItem);

  return newTasks;
};

export const newTaskItem = data => {
  let prevTasks = data.tasks;
  const id = shortid.generate();

  return {
    ...data,
    tasks: [
      {
        id: id,
        title: '',
        completed: false,
      },
      ...prevTasks,
    ],
    editingId: id,
  };
};
