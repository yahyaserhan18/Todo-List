/**
 * Task interface representing a single todo item
 */
export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

/**
 * Array of Task objects
 */
export type TaskList = Task[];

/**
 * Task filter options
 */
export type TaskFilter = 'all' | 'active' | 'completed';

/**
 * Task actions interface
 */
export interface TaskActions {
  addTask: (text: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  editTask: (id: string, text: string) => void;
  clearCompleted: () => void;
}