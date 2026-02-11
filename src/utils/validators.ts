import { z } from 'zod';
import type { Task } from '../types/Task';

/**
 * Zod schema for validating Task objects
 */
export const TaskSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1).max(500),
  completed: z.boolean(),
});

/**
 * Zod schema for validating arrays of Tasks
 */
export const TaskListSchema = z.array(TaskSchema);

/**
 * Validates and parses task data from unknown source
 * @param data - Unknown data to validate
 * @returns Validated task array or empty array if validation fails
 */
export function validateTasks(data: unknown): Task[] {
  try {
    return TaskListSchema.parse(data);
  } catch (error) {
    console.error('Invalid task data:', error);
    return [];
  }
}

/**
 * Validates a single task text input
 * @param text - Task text to validate
 * @returns Object with isValid flag and optional error message
 */
export function validateTaskText(text: string): { isValid: boolean; error?: string } {
  if (!text.trim()) {
    return { isValid: false, error: 'Task cannot be empty' };
  }
  if (text.length > 500) {
    return { isValid: false, error: 'Task cannot exceed 500 characters' };
  }
  return { isValid: true };
}
