import React from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';

interface BubbleButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
}

const BubbleButton: React.FC<BubbleButtonProps> = ({
  children,
  onClick,
  className,
  disabled = false,
  variant = 'primary'
}) => {
  const baseClasses = "p-2 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200";
  
  const variantClasses = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600",
    danger: "bg-red-500 text-white hover:bg-red-600"
  };

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={classNames(
        baseClasses,
        variantClasses[variant],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {children}
    </motion.button>
  );
};

export default BubbleButton;
