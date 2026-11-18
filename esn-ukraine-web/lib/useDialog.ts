'use client';

import { useEffect, useRef, type RefObject } from 'react';
import { lockScroll } from '@/lib/scrollLock';

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface UseDialogOptions {
  open: boolean;
  onClose: () => void;
  /** Element to focus on open; defaults to the first focusable control in the dialog */
  initialFocusRef?: RefObject<HTMLElement | null>;
}

/**
 * Accessible modal behaviour for a `role="dialog"` element:
 * - locks page scroll (iOS-safe, nested locks counted),
 * - moves focus into the dialog and restores it on close,
 * - traps Tab/Shift+Tab inside, closes on Escape.
 *
 * Put the returned ref on the dialog element.
 */
export function useDialog<T extends HTMLElement = HTMLDivElement>({ open, onClose, initialFocusRef }: UseDialogOptions) {
  const ref = useRef<T>(null);
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return;

    const previousFocus = document.activeElement as HTMLElement | null;
    const unlock = lockScroll();

    const target = initialFocusRef?.current ?? ref.current?.querySelector<HTMLElement>(FOCUSABLE) ?? ref.current;
    // preventScroll: don't let the browser jump the page on phones
    target?.focus({ preventScroll: true });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onCloseRef.current();
        return;
      }
      if (e.key !== 'Tab' || !ref.current) return;

      const focusable = Array.from(ref.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusable.length === 0) {
        e.preventDefault();
        ref.current.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || !ref.current.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !ref.current.contains(active))) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      unlock();
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, [open, initialFocusRef]);

  return ref;
}
