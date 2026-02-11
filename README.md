# My Tasks - Professional Todo List Application

A modern, accessible, and feature-rich todo list application built with React 19, TypeScript, and Tailwind CSS.

![Todo List App](https://img.shields.io/badge/React-19.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.18-blue)

## Features

### Core Functionality
- ✅ **Add Tasks** - Create new tasks with validation
- ✅ **Edit Tasks** - Double-click or click edit button to modify tasks
- ✅ **Toggle Completion** - Mark tasks as complete/incomplete
- ✅ **Delete Tasks** - Remove tasks with confirmation dialog
- ✅ **Persistent Storage** - All tasks saved to localStorage
- ✅ **Task Statistics** - Track total, active, and completed tasks

### Advanced Features
- 🔍 **Search** - Filter tasks by text search
- 🎯 **Filtering** - View all, active, or completed tasks
- 🗑️ **Bulk Actions** - Clear all completed tasks at once
- 💾 **Export/Import** - Download tasks as JSON file
- ✨ **Animations** - Smooth transitions with Framer Motion
- 🎨 **Dark Mode** - Beautiful dark-first design

### Accessibility (WCAG 2.1 AA Compliant)
- ♿ **ARIA Labels** - Screen reader support
- ⌨️ **Keyboard Navigation** - Full keyboard accessibility
- 🎯 **Focus Management** - Proper focus handling
- 📱 **Responsive Design** - Works on all devices

### Code Quality
- 📦 **Component Architecture** - Modular, reusable components
- 🛡️ **Type Safety** - Full TypeScript coverage
- ✔️ **Validation** - Zod schema validation
- 🔒 **Error Handling** - Robust error handling throughout
- 🚀 **Performance** - Memoized components and callbacks

## Tech Stack

- **Framework:** React 19.2.0
- **Language:** TypeScript 5.9.3
- **Styling:** Tailwind CSS 4.1.18
- **Animations:** Framer Motion 11.x
- **Validation:** Zod 3.x
- **Build Tool:** Vite 7.3.1
- **Linting:** ESLint 9.39.1

## Project Structure

```
src/
├── components/          # React components
│   ├── BulkActions.tsx     # Clear completed tasks
│   ├── ConfirmDialog.tsx   # Delete confirmation modal
│   ├── EmptyState.tsx      # Empty state component
│   ├── TaskFilter.tsx      # Filter buttons (All/Active/Completed)
│   ├── TaskInput.tsx       # Add task input with validation
│   ├── TaskItem.tsx        # Individual task item
│   ├── TaskList.tsx        # Task list with animations
│   ├── TaskSearch.tsx      # Search input component
│   └── TaskStats.tsx       # Task statistics display
├── hooks/               # Custom React hooks
│   ├── useLocalStorage.ts  # Generic localStorage hook
│   └── useTasks.tsx        # Task management hook
├── types/               # TypeScript type definitions
│   └── Task.ts             # Task interfaces and types
├── utils/               # Utility functions
│   ├── taskHelpers.ts      # Task manipulation utilities
│   └── validators.ts       # Zod validation schemas
├── constants/           # Application constants
│   └── index.ts            # ARIA labels, storage keys, etc.
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── index.css            # Global styles (Tailwind import)
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/todo-list.git
cd todo-list
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Usage

### Adding Tasks
1. Type your task in the input field
2. Press Enter or click the "Add" button
3. Tasks are validated (max 500 characters, cannot be empty)

### Managing Tasks
- **Complete:** Click checkbox or task text
- **Edit:** Double-click task text or click "Edit" button
- **Delete:** Click ✕ button and confirm deletion
- **Filter:** Click All/Active/Completed buttons
- **Search:** Type in search box to filter tasks

### Keyboard Shortcuts
- `Enter` - Add task (in input) / Save edit (in edit mode)
- `Escape` - Cancel edit / Close dialog
- `Tab` - Navigate between elements
- `Space/Enter` - Activate buttons and checkboxes

### Exporting Data
Click "Export" button in the header to download all tasks as JSON.

## Architecture

### Component Hierarchy

```
App
├── TaskInput
├── TaskSearch
├── TaskFilter
├── TaskList
│   ├── EmptyState (when no tasks)
│   └── TaskItem (for each task)
├── BulkActions
├── TaskStats
└── ConfirmDialog
```

### Data Flow

1. **App** component orchestrates all state and logic
2. **useTasks** hook manages task state with localStorage persistence
3. **useLocalStorage** hook provides generic localStorage functionality
4. **Components** receive data and callbacks via props
5. **Validators** ensure data integrity with Zod schemas

### State Management

- **Tasks:** Stored in localStorage via `useTasks` hook
- **Filters:** Local state in App component
- **Search:** Local state in App component
- **UI State:** Local state in respective components

## Component API

### TaskInput
```typescript
interface TaskInputProps {
  onAddTask: (text: string) => void;
}
```

### TaskItem
```typescript
interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit?: (id: string, text: string) => void;
}
```

### TaskFilter
```typescript
interface TaskFilterProps {
  currentFilter: FilterType; // 'all' | 'active' | 'completed'
  onFilterChange: (filter: FilterType) => void;
}
```

See individual component files for complete API documentation.

## Performance Optimizations

- **React.memo** - Prevents unnecessary re-renders of TaskItem, TaskStats, etc.
- **useCallback** - Memoizes event handlers
- **useMemo** - Memoizes filtered tasks and statistics
- **Code Splitting** - Vite automatically splits bundles
- **Lazy Imports** - Components loaded on demand

## Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)

## Future Enhancements

Potential features for future versions:
- [ ] Task priorities and categories
- [ ] Due dates with reminders
- [ ] Drag-and-drop task reordering
- [ ] Multiple task lists
- [ ] Cloud sync
- [ ] Mobile app (React Native)
- [ ] Collaboration features
- [ ] Undo/Redo functionality
- [ ] Dark/Light theme toggle
- [ ] Internationalization (i18n)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- React Team for React 19
- Tailwind Labs for Tailwind CSS
- Framer for Framer Motion
- Colinhacks for Zod validation library

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
