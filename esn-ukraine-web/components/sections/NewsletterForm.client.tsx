'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface SubscribeResponse {
  success: boolean;
  message?: string;
  error?: string;
  alreadySubscribed?: boolean;
}

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [message, setMessage] = useState('');
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (!email.trim()) {
      setStatus('error');
      setMessage('Please enter your email address.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    if (!consent) {
      setStatus('error');
      setMessage('Please accept the privacy policy to subscribe.');
      return;
    }

    setStatus('loading');
    setMessage('');
    setAlreadySubscribed(false);

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

      const data: SubscribeResponse = await res.json();

      if (data.success) {
        setStatus('success');
        setMessage(data.message || 'You\'ve been subscribed!');
        setAlreadySubscribed(data.alreadySubscribed || false);
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please check your connection and try again.');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setEmail('');
    setMessage('');
    setAlreadySubscribed(false);
  };

  return (
    <div className="relative" aria-live="polite">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="flex flex-col items-center gap-3 py-2"
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
                {alreadySubscribed ? 'You\'re already on the list!' : 'You\'re subscribed!'}
              </p>
              <p className="mt-1 text-sm text-gray-500 max-w-sm">
                {alreadySubscribed
                  ? 'This email is already subscribed to our newsletter.'
                  : 'Thank you for subscribing. You\'ll receive our latest news and updates.'}
              </p>
            </div>

            <button
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
              <label htmlFor="newsletter-email" className="sr-only">Your email address</label>

              {/* Honeypot — invisible to real users, attracts bots */}
              <input
                ref={honeypotRef}
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0 }}
              />

              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') {
                    setStatus('idle');
                    setMessage('');
                  }
                }}
                placeholder="Enter your email address"
                disabled={status === 'loading'}
                className="w-full sm:flex-1 rounded-full border border-gray-200 bg-white px-5 py-3 sm:px-6 sm:py-3.5 text-base sm:text-sm text-esn-dark focus:ring-4 focus:ring-esn-cyan/20 focus:border-esn-cyan outline-none placeholder:text-gray-400 font-medium shadow-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              />

              <button
                type="submit"
                disabled={status === 'loading'}
                className="group whitespace-nowrap px-8 py-3 sm:py-3.5 rounded-full bg-esn-dark text-xs sm:text-sm font-bold text-white transition-all hover:bg-esn-cyan hover:shadow-lg tracking-wider uppercase inline-flex items-center justify-center gap-2 shadow-md shrink-0 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-esn-dark disabled:hover:shadow-md disabled:active:scale-100"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Subscribing...</span>
                  </>
                ) : (
                  'Subscribe'
                )}
              </button>
            </form>

            {/* Error Message */}
            <AnimatePresence>
              {status === 'error' && message && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center gap-2 mt-3"
                >
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                  <p className="text-sm text-red-600 font-medium">{message}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Privacy Consent */}
            <div className="mt-4 sm:mt-5 flex justify-center">
              <div className="inline-flex items-start gap-2.5 text-left max-w-sm">
                <input
                  id="privacy-consent"
                  name="privacy-consent"
                  type="checkbox"
                  required
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  disabled={status === 'loading'}
                  className="mt-0.5 h-4 w-4 rounded border-gray-300 text-esn-dark focus:ring-esn-cyan cursor-pointer transition-colors accent-esn-dark shrink-0 disabled:opacity-60"
                />
                <label htmlFor="privacy-consent" className="text-xs text-gray-500 leading-normal cursor-pointer select-none">
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
  );
}
