import { useMemo, useState, useCallback } from "react";
import useTasks from "./hooks/useTasks";
import { TaskInput } from "./components/TaskInput";
import { TaskList } from "./components/TaskList";
import { TaskStats } from "./components/TaskStats";
import { TaskFilter, type FilterType } from "./components/TaskFilter";
import { ConfirmDialog } from "./components/ConfirmDialog";
import { BulkActions } from "./components/BulkActions";
import { TaskSearch } from "./components/TaskSearch";
import { filterTasksBySearch, downloadTasksAsFile } from "./utils/taskHelpers";

/**
 * Main App component
 * Orchestrates all task management functionality
 */
function App() {
  const { tasks, addTask, toggleTask, deleteTask, editTask, clearCompleted } = useTasks();
  const [currentFilter, setCurrentFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; taskId: string | null; taskText: string }>({
    isOpen: false,
    taskId: null,
    taskText: '',
  });

  /**
   * Filter tasks based on current filter and search query
   */
  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    // Apply status filter
    switch (currentFilter) {
      case 'active':
        filtered = filtered.filter((task) => !task.completed);
        break;
      case 'completed':
        filtered = filtered.filter((task) => task.completed);
        break;
    }

    // Apply search filter
    filtered = filterTasksBySearch(filtered, searchQuery);

    return filtered;
  }, [tasks, currentFilter, searchQuery]);

  /**
   * Calculate task statistics
   */
  const stats = useMemo(() => {
    const activeTasks = tasks.filter((task) => !task.completed).length;
    return {
      total: tasks.length,
      active: activeTasks,
      completed: tasks.length - activeTasks,
    };
  }, [tasks]);

  /**
   * Handle filter change
   */
  const handleFilterChange = useCallback((filter: FilterType) => {
    setCurrentFilter(filter);
  }, []);

  /**
   * Handle search query change
   */
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  /**
   * Handle delete with confirmation
   */
  const handleDeleteClick = useCallback((id: string, taskText: string) => {
    setDeleteConfirm({ isOpen: true, taskId: id, taskText });
  }, []);

  /**
   * Confirm delete action
   */
  const handleConfirmDelete = useCallback(() => {
    if (deleteConfirm.taskId) {
      deleteTask(deleteConfirm.taskId);
      setDeleteConfirm({ isOpen: false, taskId: null, taskText: '' });
    }
  }, [deleteConfirm.taskId, deleteTask]);

  /**
   * Cancel delete action
   */
  const handleCancelDelete = useCallback(() => {
    setDeleteConfirm({ isOpen: false, taskId: null, taskText: '' });
  }, []);

  /**
   * Handle export tasks
   */
  const handleExport = useCallback(() => {
    downloadTasksAsFile(tasks);
  }, [tasks]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-2xl border border-gray-700 p-8 flex flex-col gap-6">
        {/* Header Section */}
        <header className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                My Tasks
              </h1>
              <p className="text-gray-400 text-sm mt-1">Stay organized and productive</p>
            </div>
            {tasks.length > 0 && (
              <button
                onClick={handleExport}
                className="text-gray-400 hover:text-blue-400 transition-all duration-200 text-sm
                           underline decoration-dotted underline-offset-2"
                aria-label="Export tasks"
                title="Export tasks to JSON"
              >
                Export
              </button>
            )}
          </div>
        </header>

        {/* Input Section */}
        <TaskInput onAddTask={addTask} />

        {/* Search Section */}
        {tasks.length > 0 && <TaskSearch onSearch={handleSearch} />}

        {/* Filter Section */}
        {tasks.length > 0 && (
          <TaskFilter 
            currentFilter={currentFilter} 
            onFilterChange={handleFilterChange} 
          />
        )}

        {/* Tasks List */}
        <TaskList
          tasks={filteredTasks}
          onToggleTask={toggleTask}
          onDeleteTask={(id) => {
            const task = tasks.find(t => t.id === id);
            if (task) handleDeleteClick(id, task.text);
          }}
          onEditTask={editTask}
        />

        {/* Bulk Actions */}
        {stats.completed > 0 && (
          <BulkActions 
            hasCompletedTasks={stats.completed > 0} 
            onClearCompleted={clearCompleted} 
          />
        )}

        {/* Footer Stats */}
        {tasks.length > 0 && (
          <TaskStats
            totalTasks={stats.total}
            activeTasks={stats.active}
            completedTasks={stats.completed}
          />
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        title="Delete Task"
        message={`Are you sure you want to delete "${deleteConfirm.taskText}"?`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}

export default App;
