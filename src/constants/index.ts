/**
 * Application constants
 */

export const STORAGE_KEY = 'tasks';
export const MAX_TASK_LENGTH = 500;
export const TASK_FILTERS = ['all', 'active', 'completed'] as const;

export const ARIA_LABELS = {
  newTaskInput: 'New task input',
  addTaskButton: 'Add task',
  toggleTask: (taskText: string) => `Toggle ${taskText}`,
  deleteTask: (taskText: string) => `Delete ${taskText}`,
  editTask: (taskText: string) => `Edit ${taskText}`,
  taskStats: 'Task statistics',
} as const;
