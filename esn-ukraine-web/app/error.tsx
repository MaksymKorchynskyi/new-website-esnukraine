'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Логуємо помилку для аналітики або моніторингу
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center px-4 w-full min-h-screen py-20 font-sans bg-white">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center text-center w-full max-w-2xl mx-auto"
      >
        <motion.div 
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5, delay: 0.1 }}
          className="mb-6 text-esn-magenta"
        >
          <AlertTriangle className="w-16 h-16 opacity-90" />
        </motion.div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">
          Щось пішло не так
        </h2>
        
        <p className="text-gray-500 mb-10 text-lg">
          Сталася системна помилка. Ми вже працюємо над її вирішенням.
        </p>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => reset()}
          className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-esn-cyan hover:bg-[#0095cc] text-white text-lg font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-esn-cyan/50 shadow-lg shadow-esn-cyan/20"
        >
          <RefreshCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
          <span>Спробувати знову</span>
        </motion.button>
      </motion.div>
    </div>
  );
}
