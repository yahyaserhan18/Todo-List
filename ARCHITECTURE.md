# Architecture Documentation

## Overview

My Tasks is a modern single-page application (SPA) built with React 19, TypeScript, and Tailwind CSS. The application follows a component-based architecture with clear separation of concerns.

## Technology Stack

### Core
- **React 19.2.0** - UI framework with latest features
- **TypeScript 5.9.3** - Type safety and developer experience
- **Vite 7.3.1** - Fast build tool and dev server

### Styling & Animation
- **Tailwind CSS 4.1.18** - Utility-first CSS framework
- **Framer Motion 12.x** - Animation library for smooth transitions

### Validation
- **Zod 4.x** - Runtime schema validation

## Architecture Principles

### 1. Component-Based Design
- Small, focused components with single responsibility
- Reusable UI components
- Composition over inheritance
- Props-driven component API

### 2. Type Safety
- Full TypeScript coverage
- Strict mode enabled
- Runtime validation with Zod
- No `any` types

### 3. Performance Optimization
- React.memo for expensive components
- useCallback for stable function references
- useMemo for expensive computations
- Lazy loading where applicable

### 4. Accessibility First
- WCAG 2.1 AA compliance
- Semantic HTML
- ARIA labels and roles
- Keyboard navigation support
- Focus management

## System Architecture

```
┌─────────────────────────────────────────────┐
│              Browser (Client)               │
└─────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────┐
│           React Application (SPA)           │
│                                             │
│  ┌───────────────────────────────────────┐ │
│  │        App Component (Root)           │ │
│  │  - Orchestrates all functionality     │ │
│  │  - Manages global state               │ │
│  └───────────────────────────────────────┘ │
│                     │                       │
│      ┌──────────────┼──────────────┐       │
│      ▼              ▼              ▼       │
│  ┌────────┐    ┌────────┐    ┌─────────┐  │
│  │  UI    │    │ Hooks  │    │ Utils   │  │
│  │  Layer │    │ Layer  │    │ Layer   │  │
│  └────────┘    └────────┘    └─────────┘  │
└─────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────┐
│         Browser localStorage API            │
└─────────────────────────────────────────────┘
```

## Directory Structure

```
src/
├── components/          # Presentational components
│   ├── BulkActions.tsx     # Bulk task operations
│   ├── ConfirmDialog.tsx   # Confirmation modal
│   ├── EmptyState.tsx      # Empty state UI
│   ├── TaskFilter.tsx      # Filter buttons
│   ├── TaskInput.tsx       # Task input form
│   ├── TaskItem.tsx        # Single task component
│   ├── TaskList.tsx        # Task list container
│   ├── TaskSearch.tsx      # Search input
│   └── TaskStats.tsx       # Statistics display
│
├── hooks/               # Custom React hooks
│   ├── useLocalStorage.ts  # Generic localStorage hook
│   └── useTasks.tsx        # Task state management
│
├── types/               # TypeScript definitions
│   └── Task.ts             # Task types and interfaces
│
├── utils/               # Utility functions
│   ├── taskHelpers.ts      # Task manipulation utilities
│   └── validators.ts       # Zod validation schemas
│
├── constants/           # Application constants
│   └── index.ts            # ARIA labels, config values
│
├── App.tsx              # Root component
├── main.tsx             # Application entry point
└── index.css            # Global styles
```

## Component Hierarchy

```
App
├── TaskInput
├── TaskSearch
├── TaskFilter
├── TaskList
│   ├── EmptyState (conditional)
│   └── TaskItem[] (mapped)
├── BulkActions (conditional)
├── TaskStats (conditional)
└── ConfirmDialog (conditional)
```

## Data Flow

### State Management

The application uses React's built-in state management with hooks:

1. **useTasks Hook** - Central task state management
   - Wraps useLocalStorage for persistence
   - Provides task CRUD operations
   - Validates data on load

2. **Local Component State** - UI-specific state
   - Filter selection (all/active/completed)
   - Search query
   - Delete confirmation dialog state

### Data Flow Diagram

```
User Action
    │
    ▼
Component Event Handler
    │
    ▼
App Component Callback
    │
    ▼
useTasks Hook Function
    │
    ├──▶ Update React State
    │        │
    │        ▼
    │    Re-render Components
    │
    └──▶ useLocalStorage Effect
             │
             ▼
         localStorage.setItem()
```

## Key Design Patterns

### 1. Custom Hooks Pattern

```typescript
// Encapsulates complex logic
function useTasks() {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  
  const addTask = useCallback((text: string) => {
    // Logic here
  }, [setTasks]);
  
  return { tasks, addTask, ... };
}
```

### 2. Compound Component Pattern

```typescript
// App.tsx orchestrates multiple components
<TaskList tasks={filteredTasks}>
  <TaskItem />
  <TaskItem />
</TaskList>
```

### 3. Render Props / Callback Pattern

```typescript
// Components receive behavior via props
<TaskInput onAddTask={handleAddTask} />
<TaskItem onToggle={handleToggle} onDelete={handleDelete} />
```

### 4. Memoization Pattern

```typescript
// Prevent unnecessary re-renders
export const TaskItem = memo(function TaskItem({ ... }) {
  // Component logic
});

// Memoize expensive computations
const filteredTasks = useMemo(() => {
  return applyFilters(tasks);
}, [tasks, filters]);
```

## State Structure

### Task State

```typescript
interface Task {
  id: string;        // UUID
  text: string;      // Task description (1-500 chars)
  completed: boolean; // Completion status
}

type TaskList = Task[];
```

### Filter State

```typescript
type FilterType = 'all' | 'active' | 'completed';
```

### UI State

```typescript
interface DialogState {
  isOpen: boolean;
  taskId: string | null;
  taskText: string;
}
```

## Data Persistence

### localStorage Strategy

```typescript
// Write
useEffect(() => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}, [tasks]);

// Read
const [tasks, setTasks] = useState(() => {
  const stored = localStorage.getItem('tasks');
  return stored ? JSON.parse(stored) : [];
});
```

### Error Handling

- Try-catch blocks for all localStorage operations
- Fallback to empty array on parse errors
- Console logging for debugging
- QuotaExceededError handling

### Data Validation

```typescript
// Validate on load
const validatedTasks = validateTasks(tasks);

// Zod schema validation
const TaskSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1).max(500),
  completed: z.boolean(),
});
```

## Performance Optimizations

### 1. Component Memoization

```typescript
// Prevent re-renders when props haven't changed
export const TaskItem = memo(function TaskItem({ task, ...handlers }) {
  // Only re-renders if task or handlers change
});
```

### 2. Callback Memoization

```typescript
// Stable function references
const handleToggle = useCallback((id: string) => {
  setTasks(prev => /* ... */);
}, [setTasks]);
```

### 3. Computed Value Memoization

```typescript
// Expensive filtering only runs when dependencies change
const filteredTasks = useMemo(() => {
  return tasks.filter(/* ... */);
}, [tasks, filter, searchQuery]);
```

### 4. Animation Performance

```typescript
// Framer Motion with layout animations
<motion.div layout layoutId={task.id}>
  // Efficient DOM updates
</motion.div>
```

## Error Handling Strategy

### 1. Input Validation

```typescript
// Validate before processing
const validation = validateTaskText(input);
if (!validation.isValid) {
  setError(validation.error);
  return;
}
```

### 2. localStorage Errors

```typescript
try {
  localStorage.setItem(key, value);
} catch (error) {
  console.error('Storage error:', error);
  // Handle quota exceeded, privacy mode, etc.
}
```

### 3. Runtime Validation

```typescript
// Zod parsing with fallback
try {
  return TaskListSchema.parse(data);
} catch {
  return [];
}
```

## Accessibility Features

### ARIA Implementation

```typescript
// Semantic roles
<div role="list">
  <div role="listitem">
    
// Labels for screen readers
<input aria-label="New task input" />
<button aria-label="Add task" />

// Live regions for dynamic content
<div aria-live="polite">
  {stats.active} active tasks
</div>

// Button states
<button aria-pressed={isActive}>
```

### Keyboard Navigation

- Tab: Navigate between interactive elements
- Enter: Activate buttons, submit forms
- Escape: Close dialogs, cancel operations
- Space: Toggle checkboxes

### Focus Management

```typescript
// Auto-focus on dialog open
<button autoFocus>Cancel</button>

// Return focus after delete
// (handled by React's natural flow)
```

## Quality Assurance

### Manual Testing

The application should be manually tested for:
- All user interactions (add, edit, delete, toggle tasks)
- Search and filter functionality
- Keyboard navigation
- Responsive design across devices
- Accessibility with screen readers
- Error handling and validation

## Build & Deployment

### Development

```bash
npm run dev        # Start dev server with HMR
npm run lint       # Run ESLint
```

### Production

```bash
npm run build      # TypeScript check + Vite build
npm run preview    # Preview production build
```

### Build Output

```
dist/
├── assets/
│   ├── index-[hash].js      # Bundled JavaScript
│   └── index-[hash].css     # Bundled styles
├── index.html               # Entry HTML
└── vite.svg                 # Assets
```

## Future Scalability

### Potential Enhancements

1. **State Management**
   - Consider Zustand/Redux for complex state
   - Context API for theme/settings

2. **Backend Integration**
   - REST API for cloud sync
   - WebSocket for real-time updates
   - Authentication layer

3. **Advanced Features**
   - Offline support with Service Workers
   - Data export to multiple formats
   - Collaborative editing

4. **Performance**
   - Virtual scrolling for large lists
   - Code splitting by route
   - Progressive Web App (PWA)

## Security Considerations

### Client-Side Security

- XSS prevention via React's JSX escaping
- Input validation and sanitization
- No inline scripts (CSP compatible)
- localStorage encryption (future consideration)

### Data Privacy

- All data stored locally
- No external API calls
- No tracking or analytics (by default)
- User has full control over data

## Maintenance Guidelines

### Adding New Features

1. Create feature branch
2. Add TypeScript types
3. Implement component/hook
4. Update documentation
5. Test manually in browser
6. Create pull request

### Code Review Checklist

- [ ] TypeScript types defined
- [ ] ARIA labels added
- [ ] Keyboard navigation works
- [ ] Manually tested all functionality
- [ ] Performance optimized (memo/callback)
- [ ] Documentation updated
- [ ] No console errors or linter warnings
- [ ] Responsive on mobile
- [ ] Build succeeds

---

**Last Updated:** February 2026
**Architecture Version:** 1.0
