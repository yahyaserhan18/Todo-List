import { memo } from 'react';

export type FilterType = 'all' | 'active' | 'completed';

interface TaskFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

/**
 * TaskFilter component for filtering tasks by status
 */
export const TaskFilter = memo(function TaskFilter({ 
  currentFilter, 
  onFilterChange 
}: TaskFilterProps) {
  const filters: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
  ];

  return (
    <div className="flex gap-2 justify-center" role="group" aria-label="Task filters">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200
                     ${currentFilter === filter.value
                       ? 'bg-blue-600 text-white'
                       : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                     }`}
          aria-pressed={currentFilter === filter.value}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
});
