import { motion } from 'framer-motion';
import colors from '../color';

const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 space-y-4">
      <motion.div
        className={`${sizeClasses[size]} border-2 border-t-transparent rounded-full`}
        style={{ borderColor: colors.accent }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      {text && (
        <p className="text-sm" style={{ color: colors.text }}>
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;