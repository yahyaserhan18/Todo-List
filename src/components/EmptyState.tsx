import { motion } from 'framer-motion';

/**
 * EmptyState component shown when no tasks exist
 */
export function EmptyState() {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center py-12 text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="text-6xl mb-4"
        animate={{ 
          rotate: [0, -10, 10, -10, 0],
        }}
        transition={{ 
          duration: 0.5,
          delay: 0.2,
        }}
      >
        📝
      </motion.div>
      <h3 className="text-xl font-semibold text-gray-300 mb-2">No tasks yet</h3>
      <p className="text-gray-500 text-sm">Add your first task to get started!</p>
    </motion.div>
  );
}
