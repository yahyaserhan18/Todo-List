import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Task } from '../types/Task';
import { TaskItem } from './TaskItem';
import { EmptyState } from './EmptyState';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onEditTask?: (id: string, text: string) => void;
}

/**
 * TaskList component displaying all tasks with animations
 * Memoized to prevent unnecessary re-renders
 */
export const TaskList = memo(function TaskList({ 
  tasks, 
  onToggleTask, 
  onDeleteTask,
  onEditTask 
}: TaskListProps) {
  if (tasks.length === 0) {
    return <EmptyState />;
  }

  return (
    <motion.div 
      className="flex flex-col gap-3" 
      role="list"
      layout
    >
      <AnimatePresence mode="popLayout">
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            layout
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.2 }}
          >
            <TaskItem
              task={task}
              onToggle={onToggleTask}
              onDelete={onDeleteTask}
              onEdit={onEditTask}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
});
