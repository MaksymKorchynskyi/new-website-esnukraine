'use client';

import { Share2 } from "lucide-react";
import { useState } from "react";

export function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-gray-500 hover:text-esn-dark hover:border-esn-cyan/30 transition-all text-sm font-medium"
      title="Поширити"
    >
      <Share2 className="w-4 h-4" />
      {copied ? "Скопійовано!" : "Поширити"}
    </button>
  );
}
