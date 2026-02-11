import { useCallback } from "react";
import type { TaskList } from "../types/Task";
import { useLocalStorage } from "./useLocalStorage";
import { validateTasks } from "../utils/validators";
import { STORAGE_KEY } from "../constants";

/**
 * Custom hook for managing tasks with localStorage persistence
 * Includes validation and error handling
 * @param initialTasks - Initial tasks if no stored tasks exist
 * @returns Object with tasks array and task management functions
 */
const useTasks = (initialTasks: TaskList = []) => {
  const [tasks, setTasks] = useLocalStorage<TaskList>(STORAGE_KEY, initialTasks);

  // Validate tasks on mount
  const validatedTasks = validateTasks(tasks);
  if (validatedTasks.length !== tasks.length) {
    setTasks(validatedTasks);
  }

  /**
   * Add a new task
   */
  const addTask = useCallback((text: string) => {
    const newTask = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
  }, [setTasks]);

  /**
   * Toggle task completion status
   */
  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, [setTasks]);

  /**
   * Delete a task by ID
   */
  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, [setTasks]);

  /**
   * Edit task text
   */
  const editTask = useCallback((id: string, text: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, text: text.trim() } : task
      )
    );
  }, [setTasks]);

  /**
   * Clear all completed tasks
   */
  const clearCompleted = useCallback(() => {
    setTasks((prev) => prev.filter((task) => !task.completed));
  }, [setTasks]);

  return {
    tasks: validatedTasks,
    addTask,
    toggleTask,
    deleteTask,
    editTask,
    clearCompleted,
  };
};

export default useTasks;