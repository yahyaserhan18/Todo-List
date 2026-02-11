# Contributing to My Tasks

Thank you for your interest in contributing to My Tasks! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/todo-list.git`
3. Add upstream remote: `git remote add upstream https://github.com/ORIGINAL_OWNER/todo-list.git`
4. Create a feature branch: `git checkout -b feature/your-feature-name`

## Development Setup

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run linter
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/     # React components
├── hooks/          # Custom React hooks
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
├── constants/      # Application constants
├── App.tsx         # Main app component
└── main.tsx        # Entry point
```

### Component Guidelines

- Keep components small and focused (single responsibility)
- Use functional components with hooks
- Memoize components when appropriate (`React.memo`)
- Export components as named exports
- Add JSDoc comments for component props

### Hook Guidelines

- Prefix custom hooks with `use`
- Keep hooks focused on a single concern
- Add proper JSDoc documentation
- Handle errors gracefully
- Use TypeScript for type safety

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Enable strict mode
- Avoid `any` type - use `unknown` if needed
- Define interfaces for component props
- Use type inference where possible

### React

- Use functional components
- Use hooks (useState, useEffect, useMemo, useCallback)
- Memoize expensive computations with useMemo
- Memoize callbacks with useCallback
- Use React.memo for components that don't need frequent re-renders

### Tailwind CSS

- Use Tailwind utility classes
- Keep classes organized (layout → spacing → colors → typography)
- Use consistent spacing (gap-2, gap-3, gap-4, gap-6)
- Follow the existing dark theme color scheme
- Add responsive classes when needed

### Code Style

- Use 2 spaces for indentation
- Use semicolons
- Use single quotes for strings
- Use trailing commas in arrays and objects
- Max line length: 100 characters
- Use arrow functions for callbacks

### Example Component

```typescript
import { memo, useCallback } from 'react';

interface MyComponentProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * MyComponent description
 * @param props - Component props
 */
export const MyComponent = memo(function MyComponent({ 
  value, 
  onChange 
}: MyComponentProps) {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  }, [onChange]);

  return (
    <input
      value={value}
      onChange={handleChange}
      className="bg-gray-700 text-gray-100 py-2 px-4 rounded-lg"
      aria-label="My input"
    />
  );
});
```

## Commit Guidelines

### Commit Message Format

```
type(scope): subject

body (optional)

footer (optional)
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```
feat(tasks): add task editing functionality

fix(validation): handle empty task submissions correctly

docs(readme): update installation instructions

refactor(hooks): extract localStorage logic to custom hook
```

## Pull Request Process

1. **Update your fork**
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. **Create feature branch**
   ```bash
   git checkout -b feature/your-feature
   ```

3. **Make your changes**
   - Write clean, well-documented code
   - Follow coding standards
   - Add tests if applicable
   - Update documentation

4. **Verify your changes**
   ```bash
   npm run lint
   npm run build
   npm run dev  # Test manually in browser
   ```

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature
   ```

7. **Create Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Fill in the PR template
   - Wait for review

### PR Checklist

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings or errors
- [ ] Linter passes without errors
- [ ] Build succeeds
- [ ] Manually tested in browser
- [ ] Responsive design tested
- [ ] Accessibility checked

## Manual Testing

Before submitting your PR, please manually test:

- [ ] Add new tasks
- [ ] Toggle task completion
- [ ] Edit tasks (double-click or edit button)
- [ ] Delete tasks (with confirmation)
- [ ] Search functionality
- [ ] Filter tasks (All/Active/Completed)
- [ ] Clear completed tasks
- [ ] Export tasks
- [ ] Keyboard navigation
- [ ] Responsive design on different screen sizes

## Questions?

If you have questions, feel free to:
- Open an issue for discussion
- Reach out to maintainers
- Check existing documentation

Thank you for contributing! 🎉
