/**
 * Minimal in-memory sliding-window rate limiter — zero dependencies.
 *
 * Note: state lives in the module scope of a single server instance. On
 * Vercel's serverless runtime that means it throttles bursts hitting a warm
 * instance but is NOT globally distributed. For strict, cross-instance limits
 * swap this for a shared store (e.g. Upstash Redis + @upstash/ratelimit).
 */

const store = new Map<string, number[]>();

export interface RateLimitResult {
  ok: boolean;
  /** Seconds until the caller may retry (0 when allowed). */
  retryAfter: number;
}

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  const recent = (store.get(key) ?? []).filter((t) => now - t < windowMs);

  if (recent.length >= limit) {
    store.set(key, recent);
    const retryAfter = Math.ceil((windowMs - (now - recent[0])) / 1000);
    return { ok: false, retryAfter };
  }

  recent.push(now);
  store.set(key, recent);

  // Opportunistic sweep to bound memory if many distinct keys accumulate.
  if (store.size > 5000) {
    for (const [k, times] of store) {
      const fresh = times.filter((t) => now - t < windowMs);
      if (fresh.length === 0) store.delete(k);
      else store.set(k, fresh);
    }
  }

  return { ok: true, retryAfter: 0 };
}
