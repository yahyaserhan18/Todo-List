import { useEffect, useCallback, type KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

/**
 * ConfirmDialog component for confirming destructive actions with animations
 */
export function ConfirmDialog({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Delete',
  cancelText = 'Cancel',
}: ConfirmDialogProps) {
  // Handle escape key to close dialog
  useEffect(() => {
    const handleEscape = (e: KeyboardEventInit) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape as EventListener);
      return () => window.removeEventListener('keydown', handleEscape as EventListener);
    }
  }, [isOpen, onCancel]);

  const handleConfirmKeyDown = useCallback((e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter') {
      onConfirm();
    }
  }, [onConfirm]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onCancel}
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div 
            className="bg-gray-800 rounded-xl border border-gray-700 p-6 max-w-sm w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <h2 id="dialog-title" className="text-xl font-bold text-gray-100 mb-2">
              {title}
            </h2>
            <p className="text-gray-400 mb-6">{message}</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={onCancel}
                className="px-4 py-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600
                           transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                autoFocus
              >
                {cancelText}
              </button>
              <button
                onClick={onConfirm}
                onKeyDown={handleConfirmKeyDown}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700
                           transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
