import { memo, useState, useCallback, type KeyboardEvent } from 'react';
import type { Task } from '../types/Task';
import { ARIA_LABELS } from '../constants';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit?: (id: string, text: string) => void;
}

/**
 * TaskItem component representing a single task
 * Memoized to prevent unnecessary re-renders
 */
export const TaskItem = memo(function TaskItem({ 
  task, 
  onToggle, 
  onDelete, 
  onEdit 
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleEdit = useCallback(() => {
    if (onEdit && editText.trim() && editText !== task.text) {
      onEdit(task.id, editText.trim());
    }
    setIsEditing(false);
  }, [editText, onEdit, task.id, task.text]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      setEditText(task.text);
      setIsEditing(false);
    }
  }, [handleEdit, task.text]);

  const handleDeleteKeyDown = useCallback((e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onDelete(task.id);
    }
  }, [onDelete, task.id]);

  return (
    <div
      className="bg-gray-700 border border-gray-600 rounded-lg p-4 flex justify-between items-center
                 hover:bg-gray-650 hover:border-gray-500 transition-all duration-200 group"
      role="listitem"
    >
      <div className="flex items-center gap-3 flex-1">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          aria-label={ARIA_LABELS.toggleTask(task.text)}
          className="w-5 h-5 rounded accent-blue-600 cursor-pointer
                     transition-transform duration-200 hover:scale-110"
        />
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-gray-600 text-gray-100 py-1 px-2 rounded
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
            aria-label={ARIA_LABELS.editTask(task.text)}
          />
        ) : (
          <span
            className={`${task.completed ? 'line-through text-gray-500' : 'text-gray-100'} 
                       transition-all duration-200 select-none flex-1 cursor-pointer`}
            onClick={() => onToggle(task.id)}
            onDoubleClick={() => onEdit && setIsEditing(true)}
          >
            {task.text}
          </span>
        )}
      </div>
      <div className="flex gap-2 items-center">
        {onEdit && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-gray-400 hover:text-blue-400 transition-all duration-200
                       opacity-0 group-hover:opacity-100 hover:scale-110 text-sm px-2"
            aria-label={ARIA_LABELS.editTask(task.text)}
          >
            Edit
          </button>
        )}
        <button
          onClick={() => onDelete(task.id)}
          onKeyDown={handleDeleteKeyDown}
          className="text-gray-400 hover:text-red-400 transition-all duration-200
                     hover:scale-110 text-xl"
          aria-label={ARIA_LABELS.deleteTask(task.text)}
          tabIndex={0}
        >
          ✕
        </button>
      </div>
    </div>
  );
});
