import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'motion/react';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export default function ThemeToggle({ className = '', showLabel = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.button
      whileTap={{ scale: 0.92 }}
      onClick={toggleTheme}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      className={`relative inline-flex items-center gap-1.5 p-2 rounded-2xl transition-all duration-200 ${
        isDark 
          ? 'bg-gray-800 hover:bg-gray-700 text-amber-300 border border-gray-700 shadow-sm' 
          : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200/80 shadow-xs'
      } ${className}`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {isDark ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            exit={{ rotate: 90, scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="w-4 h-4 fill-amber-300 stroke-amber-400" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            exit={{ rotate: -90, scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className="w-4 h-4 fill-gray-700 stroke-gray-700" />
          </motion.div>
        )}
      </div>

      {showLabel && (
        <span className="text-xs font-bold mr-1">
          {isDark ? 'Modo Claro' : 'Modo Oscuro'}
        </span>
      )}
    </motion.button>
  );
}
