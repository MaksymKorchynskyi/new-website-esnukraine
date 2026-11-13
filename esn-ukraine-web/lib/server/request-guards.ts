import 'server-only';
import { createHash } from 'node:crypto';
import type { NextRequest } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { ipAddress } from '@vercel/functions';

/** True only for the production deployment (Vercel Preview behaves like development). */
export const isProduction =
  process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV !== 'preview';

const ALLOWED_HOST = 'esnukraine.org';

function isAllowedHost(hostname: string) {
  return hostname === ALLOWED_HOST || hostname.endsWith(`.${ALLOWED_HOST}`);
}

/**
 * Basic CSRF protection for JSON endpoints: in production the request must come
 * from the site itself (Origin or Referer header).
 */
export function isAllowedOrigin(req: NextRequest): boolean {
  if (!isProduction) return true;
  const origin = req.headers.get('origin') || '';
  const referer = req.headers.get('referer') || '';
  try {
    if (origin && isAllowedHost(new URL(origin).hostname)) return true;
    if (referer && isAllowedHost(new URL(referer).hostname)) return true;
  } catch {
    // malformed header
  }
  return false;
}

/**
 * Pseudonymous rate-limit key: the IP is hashed with a server-side salt so the
 * raw address is never stored in Redis.
 */
export function clientKey(req: NextRequest): string {
  const ip = ipAddress(req) ?? '127.0.0.1';
  const salt = process.env.RATE_LIMIT_SALT || process.env.SANITY_REVALIDATE_SECRET || 'esn-ukraine';
  return createHash('sha256').update(`${salt}:${ip}`).digest('hex').slice(0, 32);
}

let redis: Redis | null | undefined;

function getRedis(): Redis | null {
  if (redis !== undefined) return redis;
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  redis = url && token ? new Redis({ url, token }) : null;
  return redis;
}

const limiters = new Map<string, Ratelimit>();

/**
 * Sliding-window limiter backed by Upstash. Returns `null` when Redis is not
 * configured (local development / preview), so callers can degrade gracefully.
 */
export function getRatelimit(prefix: string, tokens: number, window: `${number} ${'s' | 'm' | 'h'}`): Ratelimit | null {
  const r = getRedis();
  if (!r) return null;
  const key = `${prefix}:${tokens}:${window}`;
  let limiter = limiters.get(key);
  if (!limiter) {
    limiter = new Ratelimit({
      redis: r,
      limiter: Ratelimit.slidingWindow(tokens, window),
      prefix: `ratelimit:${prefix}`,
      analytics: false,
    });
    limiters.set(key, limiter);
  }
  return limiter;
}
