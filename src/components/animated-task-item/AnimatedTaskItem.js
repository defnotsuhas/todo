import React, { useCallback } from 'react';
import { View } from 'moti';

import { makeStyledComponent } from '../../utils/styled';

import TaskItem from './TaskItem';

const StyledView = makeStyledComponent(View);

export const AnimatedTaskItem = ({
  simultaneousHandlers,
  taskItem,
  isEditing,
  onToggleItem,
  onChangeSubject,
  onFinishEditing,
  onPressLabel,
  onRemove,
}) => {
  // Handle Functions to pass payload to the dispatch method
  const handleToggleCheckbox = useCallback(() => {
    onToggleItem(taskItem);
  }, [taskItem, onToggleItem]);

  const handleChangeSubject = useCallback(
    subject => {
      onChangeSubject({ task: taskItem, title: subject });
    },
    [taskItem, onChangeSubject],
  );

  const handleFinishEditing = useCallback(() => {
    onFinishEditing(taskItem);
  }, [taskItem, onFinishEditing]);

  const handlePressLabel = useCallback(() => {
    onPressLabel(taskItem);
  }, [taskItem, onPressLabel]);

  const handleRemove = useCallback(() => {
    onRemove(taskItem);
  }, [taskItem, onRemove]);

  return (
    <StyledView
      w="full"
      from={{
        opacity: 0,
        scale: 0.5,
        marginBottom: -46,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        marginBottom: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.5,
        marginBottom: -46,
      }}>
      <TaskItem
        simultaneousHandlers={simultaneousHandlers}
        subject={taskItem.title}
        isDone={taskItem.completed}
        isEditing={isEditing}
        onToggleCheckbox={handleToggleCheckbox}
        onChangeSubject={handleChangeSubject}
        onFinishEditing={handleFinishEditing}
        onPressLabel={handlePressLabel}
        onRemove={handleRemove}
      />
    </StyledView>
  );
};

export default AnimatedTaskItem;
