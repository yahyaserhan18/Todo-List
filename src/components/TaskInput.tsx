import { useState, useCallback, type KeyboardEvent } from 'react';
import { ARIA_LABELS, MAX_TASK_LENGTH } from '../constants';
import { validateTaskText } from '../utils/validators';

interface TaskInputProps {
  onAddTask: (text: string) => void;
}

/**
 * TaskInput component for adding new tasks
 */
export function TaskInput({ onAddTask }: TaskInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(() => {
    const validation = validateTaskText(inputValue);
    
    if (!validation.isValid) {
      setError(validation.error || 'Invalid input');
      return;
    }

    onAddTask(inputValue.trim());
    setInputValue('');
    setError(null);
  }, [inputValue, onAddTask]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  }, [handleSubmit]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-full gap-3">
        <input
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            if (error) setError(null);
          }}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-gray-700 text-gray-100 placeholder-gray-400 py-3 px-4 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-600
                     transition-all duration-200"
          type="text"
          placeholder="Type a new task..."
          aria-label={ARIA_LABELS.newTaskInput}
          maxLength={MAX_TASK_LENGTH}
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg
                     transition-all duration-200 hover:scale-105 active:scale-95
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={ARIA_LABELS.addTaskButton}
        >
          Add
        </button>
      </div>
      {error && (
        <p className="text-red-400 text-sm px-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
