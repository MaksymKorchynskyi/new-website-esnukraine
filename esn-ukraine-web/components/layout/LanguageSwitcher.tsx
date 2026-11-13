'use client';

import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  return (
    <div className="flex items-center gap-1 text-sm font-bold tracking-wider">
      <span className="sr-only">Language: English</span>
      <Globe className="w-4 h-4 text-esn-dark mr-0.5 hidden sm:block" aria-hidden="true" />
      <span className="text-esn-dark cursor-default" aria-hidden="true">EN</span>
      <span className="text-gray-300 select-none" aria-hidden="true">/</span>
      {/* Ukrainian version is not available yet: hidden from assistive tech so it does not read as a working switch */}
      <span
        className="text-gray-300 cursor-not-allowed select-none"
        title="Українська — coming soon"
        aria-hidden="true"
      >
        UA
      </span>
    </div>
  );
}
