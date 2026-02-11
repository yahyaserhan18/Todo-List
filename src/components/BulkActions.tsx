import { memo } from 'react';

interface BulkActionsProps {
  hasCompletedTasks: boolean;
  onClearCompleted: () => void;
}

/**
 * BulkActions component for performing actions on multiple tasks
 */
export const BulkActions = memo(function BulkActions({ 
  hasCompletedTasks, 
  onClearCompleted 
}: BulkActionsProps) {
  if (!hasCompletedTasks) return null;

  return (
    <div className="flex justify-center">
      <button
        onClick={onClearCompleted}
        className="text-sm text-gray-400 hover:text-red-400 transition-all duration-200
                   underline decoration-dotted underline-offset-2"
        aria-label="Clear all completed tasks"
      >
        Clear completed
      </button>
    </div>
  );
});
