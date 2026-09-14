'use client';

import { Settings } from 'lucide-react';
import { OPEN_SETTINGS_EVENT } from '@/lib/cookies';

export default function CookieSettingsButton() {
  return (
    <button
      onClick={() => window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))}
      className="inline-flex items-center gap-2.5 px-6 py-3 text-sm font-bold rounded-full bg-esn-dark text-white hover:bg-esn-cyan transition-colors duration-200 tracking-wide"
    >
      <Settings className="w-4 h-4" />
      Manage Cookie Settings
    </button>
  );
}
