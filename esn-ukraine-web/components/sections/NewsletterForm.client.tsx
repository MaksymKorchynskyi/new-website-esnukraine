'use client';

import { useState, useRef, useId, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';
type ErrorField = 'email' | 'consent' | 'form';

interface SubscribeResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export default function NewsletterForm({
  autoFocus = false,
  fullWidthButton = false,
}: { autoFocus?: boolean; fullWidthButton?: boolean } = {}) {
  // Unique ids so the form can appear twice on a page (e.g. inline + popup)
  const uid = useId();
  const emailId = `newsletter-email-${uid}`;
  const consentId = `privacy-consent-${uid}`;
  const errorId = `newsletter-error-${uid}`;
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorField, setErrorField] = useState<ErrorField>('form');
  const [message, setMessage] = useState('');
  const honeypotRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // The form unmounts on success: move focus to the confirmation so it is not lost
  useEffect(() => {
    if (status === 'success') successRef.current?.focus({ preventScroll: true });
  }, [status]);

  const fail = (field: ErrorField, text: string) => {
    setStatus('error');
    setErrorField(field);
    setMessage(text);
  };

  const clearError = () => {
    if (status === 'error') {
      setStatus('idle');
      setMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (!email.trim()) {
      fail('email', 'Please enter your email address.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      fail('email', 'Please enter a valid email address.');
      return;
    }

    if (!consent) {
      fail('consent', 'Please accept the privacy policy to subscribe.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          consent,
          honeypot: honeypotRef.current?.value || '',
        }),
      });

      const data: SubscribeResponse = await res.json().catch(() => ({
        success: false,
        error: res.status === 429 ? 'You are sending too many requests. Please wait a minute before trying again.' : 'Invalid response from server.',
      }));

      if (data.success) {
        setStatus('success');
        setMessage(data.message || "You've been subscribed!");
      } else {
        fail(res.status === 400 ? 'email' : 'form', data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      fail('form', 'Network error. Please check your connection and try again.');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setEmail('');
    setMessage('');
  };

  const hasError = status === 'error' && Boolean(message);

  return (
    <MotionConfig reducedMotion="user">
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            ref={successRef}
            tabIndex={-1}
            role="status"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="flex flex-col items-center gap-3 py-2 outline-none"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
            >
              <div className="flex items-center justify-center w-12 h-12 bg-esn-green/10 rounded-full">
                <CheckCircle className="w-6 h-6 text-esn-green" />
              </div>
            </motion.div>

            <div className="text-center">
              <p className="text-base sm:text-lg font-bold text-esn-dark">
                You&apos;re subscribed!
              </p>
              <p className="mt-1 text-sm text-gray-500 max-w-sm">
                Thank you for subscribing. You&apos;ll receive our latest news and updates.
              </p>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="mt-1 text-xs font-bold text-esn-cyan hover:text-esn-dark transition-colors uppercase tracking-wider"
            >
              Subscribe another email
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto" noValidate>
              <label htmlFor={emailId} className="sr-only">Your email address</label>

              {/* Honeypot — invisible to real users, attracts bots */}
              <input
                ref={honeypotRef}
                type="url"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0 }}
              />

              <input
                id={emailId}
                name="email"
                autoFocus={autoFocus}
                type="email"
                autoComplete="email"
                inputMode="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  clearError();
                }}
                placeholder="Enter your email address"
                disabled={status === 'loading'}
                aria-invalid={hasError && errorField === 'email' ? 'true' : undefined}
                aria-describedby={hasError ? errorId : undefined}
                className="w-full sm:flex-1 rounded-full border border-gray-200 bg-white px-5 py-3 sm:px-6 sm:py-3.5 text-base sm:text-sm [@media(pointer:coarse)]:text-base text-esn-dark focus:ring-4 focus:ring-esn-cyan/20 focus:border-esn-cyan outline-none placeholder:text-gray-400 font-medium shadow-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              />

              <button
                type="submit"
                disabled={status === 'loading'}
                className={`${fullWidthButton ? 'w-full sm:w-auto ' : ''}group whitespace-nowrap px-8 py-3 sm:py-3.5 rounded-full bg-esn-dark text-xs sm:text-sm font-bold text-white transition-all hover:bg-esn-cyan hover:shadow-lg tracking-wider uppercase inline-flex items-center justify-center gap-2 shadow-md shrink-0 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-esn-dark disabled:hover:shadow-md disabled:active:scale-100`}
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                    <span>Subscribing...</span>
                  </>
                ) : (
                  'Subscribe'
                )}
              </button>
            </form>

            {/* Error Message */}
            <AnimatePresence>
              {hasError && (
                <motion.div
                  id={errorId}
                  role="alert"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center gap-2 mt-3"
                >
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0" aria-hidden="true" />
                  <p className="text-sm text-red-600 font-medium">{message}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Privacy Consent */}
            <div className="mt-4 sm:mt-5 flex justify-center">
              <div className="inline-flex items-start gap-2.5 text-left max-w-sm">
                <input
                  id={consentId}
                  name="privacy-consent"
                  type="checkbox"
                  required
                  checked={consent}
                  onChange={(e) => {
                    setConsent(e.target.checked);
                    clearError();
                  }}
                  disabled={status === 'loading'}
                  aria-invalid={hasError && errorField === 'consent' ? 'true' : undefined}
                  aria-describedby={hasError && errorField === 'consent' ? errorId : undefined}
                  className="mt-0.5 h-4 w-4 rounded border-gray-300 text-esn-dark focus:ring-esn-cyan cursor-pointer transition-colors accent-esn-dark shrink-0 disabled:opacity-60"
                />
                <label htmlFor={consentId} className="text-xs text-gray-500 leading-normal cursor-pointer select-none">
                  I agree to the processing of personal data per ESN Ukraine&apos;s{' '}
                  <Link href="/privacy" className="font-semibold text-esn-dark underline decoration-esn-dark/30 hover:decoration-esn-dark hover:text-esn-cyan transition-colors">
                    Privacy Policy
                  </Link>
                  .
                </label>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </MotionConfig>
  );
}
