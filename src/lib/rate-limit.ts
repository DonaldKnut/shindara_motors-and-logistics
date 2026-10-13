type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

export function isRateLimited(
  key: string,
  options: { windowMs?: number; max?: number } = {},
) {
  const windowMs = options.windowMs ?? 15 * 60 * 1000;
  const max = options.max ?? 8;
  const now = Date.now();
  const current = buckets.get(key);

  if (!current || current.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  if (current.count >= max) return true;
  current.count += 1;
  buckets.set(key, current);
  return false;
}
