import type { Task } from '../types/Task';

/**
 * Filter tasks by search query
 * @param tasks - Array of tasks to filter
 * @param query - Search query string
 * @returns Filtered tasks matching the query
 */
export function filterTasksBySearch(tasks: Task[], query: string): Task[] {
  if (!query.trim()) return tasks;
  
  const lowerQuery = query.toLowerCase();
  return tasks.filter((task) => 
    task.text.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Sort tasks by various criteria
 * @param tasks - Array of tasks to sort
 * @param sortBy - Sorting criteria
 * @returns Sorted tasks
 */
export function sortTasks(
  tasks: Task[], 
  sortBy: 'alphabetical' | 'completed' | 'active'
): Task[] {
  const sorted = [...tasks];
  
  switch (sortBy) {
    case 'alphabetical':
      return sorted.sort((a, b) => a.text.localeCompare(b.text));
    case 'completed':
      return sorted.sort((a, b) => Number(b.completed) - Number(a.completed));
    case 'active':
      return sorted.sort((a, b) => Number(a.completed) - Number(b.completed));
    default:
      return sorted;
  }
}

/**
 * Export tasks to JSON string
 * @param tasks - Tasks to export
 * @returns JSON string representation
 */
export function exportTasks(tasks: Task[]): string {
  return JSON.stringify(tasks, null, 2);
}

/**
 * Import tasks from JSON string
 * @param jsonString - JSON string to parse
 * @returns Parsed tasks or null if invalid
 */
export function importTasks(jsonString: string): Task[] | null {
  try {
    const parsed = JSON.parse(jsonString);
    if (!Array.isArray(parsed)) return null;
    
    // Basic validation
    const isValid = parsed.every(
      (task) =>
        typeof task.id === 'string' &&
        typeof task.text === 'string' &&
        typeof task.completed === 'boolean'
    );
    
    return isValid ? parsed : null;
  } catch {
    return null;
  }
}

/**
 * Download tasks as JSON file
 * @param tasks - Tasks to download
 * @param filename - Name of the file
 */
export function downloadTasksAsFile(tasks: Task[], filename = 'tasks.json'): void {
  const json = exportTasks(tasks);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
