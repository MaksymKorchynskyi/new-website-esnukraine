'use client';

import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  return (
    <div className="flex items-center gap-1 text-sm font-bold tracking-wider">
      <Globe className="w-4 h-4 text-esn-dark mr-0.5 hidden sm:block" />
      <span className="text-esn-dark cursor-default">EN</span>
      <span className="text-gray-300 select-none">/</span>
      <span
        className="text-gray-300 cursor-not-allowed select-none"
        title="Українська — coming soon"
      >
        UA
      </span>
    </div>
  );
}
