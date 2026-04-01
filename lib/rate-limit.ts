const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

/**
 * Very simple in-memory rate limiter for demo purposes
 * In production, use Redis or a similar store.
 */
export function isRateLimited(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const userData = rateLimitMap.get(key) || { count: 0, lastReset: now };

  if (now - userData.lastReset > windowMs) {
    userData.count = 1;
    userData.lastReset = now;
    rateLimitMap.set(key, userData);
    return false;
  }

  userData.count++;
  rateLimitMap.set(key, userData);

  return userData.count > limit;
}
