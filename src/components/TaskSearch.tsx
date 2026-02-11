import { memo, useState, useCallback } from 'react';

interface TaskSearchProps {
  onSearch: (query: string) => void;
}

/**
 * TaskSearch component for searching through tasks
 */
export const TaskSearch = memo(function TaskSearch({ onSearch }: TaskSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = useCallback((value: string) => {
    setSearchQuery(value);
    onSearch(value);
  }, [onSearch]);

  const handleClear = useCallback(() => {
    setSearchQuery('');
    onSearch('');
  }, [onSearch]);

  return (
    <div className="relative">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Search tasks..."
        className="w-full bg-gray-700 text-gray-100 placeholder-gray-400 py-2 px-4 pr-10 rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        aria-label="Search tasks"
      />
      {searchQuery && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200
                     transition-all duration-200"
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
});
