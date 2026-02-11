import { memo } from 'react';
import { ARIA_LABELS } from '../constants';

interface TaskStatsProps {
  totalTasks: number;
  activeTasks: number;
  completedTasks: number;
}

/**
 * TaskStats component displaying task statistics
 * Memoized to prevent unnecessary re-renders
 */
export const TaskStats = memo(function TaskStats({ 
  totalTasks, 
  activeTasks, 
  completedTasks 
}: TaskStatsProps) {
  return (
    <div className="pt-4 border-t border-gray-700" aria-label={ARIA_LABELS.taskStats}>
      <div className="flex items-center justify-between text-sm" aria-live="polite">
        <span className="text-gray-400">
          {totalTasks} {totalTasks === 1 ? 'task' : 'tasks'} total
        </span>
        <div className="flex gap-4">
          <span className="text-blue-400 font-medium">
            {activeTasks} active
          </span>
          <span className="text-gray-500">
            {completedTasks} completed
          </span>
        </div>
      </div>
    </div>
  );
});
