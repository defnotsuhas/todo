import React, { useRef } from 'react';

import { AnimatePresence } from 'moti';
import { ScrollView } from 'react-native-gesture-handler';

import { makeStyledComponent } from '../utils/styled';

import AnimatedTaskItem from './animated-task-item/AnimatedTaskItem';

const StyledScrollView = makeStyledComponent(ScrollView);

export const TaskList = ({
  data,
  editingItemId,
  onToggleItem,
  onChangeSubject,
  onFinishEditing,
  onPressLabel,
  onRemoveItem,
}) => {
  const refScrollView = useRef(null);

  return (
    <StyledScrollView ref={refScrollView} w="full">
      <AnimatePresence>
        {data.map(item => (
          <AnimatedTaskItem
            simultaneousHandlers={refScrollView}
            key={item.id}
            taskItem={item}
            isEditing={item.id === editingItemId}
            onToggleItem={onToggleItem}
            onChangeSubject={onChangeSubject}
            onFinishEditing={onFinishEditing}
            onPressLabel={onPressLabel}
            onRemove={onRemoveItem}
          />
        ))}
      </AnimatePresence>
    </StyledScrollView>
  );
};

export default TaskList;
