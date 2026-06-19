import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';
interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
  {
    className,
    variant = 'primary',
    size = 'md',
    isLoading,
    children,
    ...props
  },
  ref) =>
  {
    const variants = {
      primary:
      'bg-[#F59E0B] text-[#0A1628] hover:bg-[#D97706] shadow-lg shadow-orange-500/20',
      secondary:
      'bg-[#0A1628] text-white hover:bg-[#111827] shadow-lg shadow-blue-900/20',
      outline: 'border-2 border-[#0A1628] text-[#0A1628] hover:bg-gray-50',
      ghost: 'text-[#0A1628] hover:bg-gray-100'
    };
    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-6 py-2.5 text-base',
      lg: 'px-8 py-3.5 text-lg'
    };
    return (
      <motion.button
        ref={ref}
        whileHover={{
          scale: 1.02
        }}
        whileTap={{
          scale: 0.98
        }}
        className={cn(
          'inline-flex items-center justify-center rounded-xl font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F59E0B] disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
          className
        )}
        disabled={isLoading}
        {...props}>
        
        {isLoading ?
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" /> :
        null}
        {children}
      </motion.button>);

  }
);
Button.displayName = 'Button';