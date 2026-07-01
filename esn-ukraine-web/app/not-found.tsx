import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center px-4 w-full min-h-screen py-20 font-sans bg-white">
      <div className="flex flex-col items-center text-center w-full max-w-2xl mx-auto animate-fade-in">
        <h1 className="text-5xl md:text-6xl font-black text-esn-dark tracking-tight mb-4">
          404
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Сторінку не знайдено
        </h2>
        
        <p className="text-gray-500 mb-10 text-lg">
          Ця сторінка була переміщена, видалена або ніколи не існувала.
        </p>

        <Link 
          href="/"
          className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-esn-dark hover:bg-[#202273] text-white text-lg font-medium rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-esn-dark/50 shadow-lg shadow-esn-dark/20"
        >
          <Home className="w-5 h-5" />
          <span>На головну</span>
        </Link>
      </div>
    </div>
  );
}
