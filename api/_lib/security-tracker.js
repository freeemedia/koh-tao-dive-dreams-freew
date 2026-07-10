const getStore = () => {
  if (!globalThis.__ktdSecurityTracker) {
    globalThis.__ktdSecurityTracker = {
      failures: new Map(),
      blockedUntil: new Map(),
      events: [],
    };
  }
  return globalThis.__ktdSecurityTracker;
};

const nowMs = () => Date.now();

export function getClientIp(req) {
  const forwarded = req?.headers?.['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.trim()) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = req?.headers?.['x-real-ip'];
  if (typeof realIp === 'string' && realIp.trim()) {
    return realIp.trim();
  }
  return 'unknown';
}

export function getClientFingerprint(req, extra = '') {
  const ip = getClientIp(req);
  const ua = String(req?.headers?.['user-agent'] || 'unknown').slice(0, 120);
  return `${ip}|${ua}|${extra}`;
}

function pruneFailures(map, cutoff) {
  for (const [key, timestamps] of map.entries()) {
    const fresh = timestamps.filter((ts) => ts >= cutoff);
    if (fresh.length === 0) {
      map.delete(key);
    } else {
      map.set(key, fresh);
    }
  }
}

export function checkAndTrackFailure({
  scope,
  key,
  maxAttempts = 10,
  windowMs = 10 * 60 * 1000,
  blockMs = 15 * 60 * 1000,
}) {
  const store = getStore();
  const fullKey = `${scope}:${key}`;
  const now = nowMs();

  const blockedUntil = store.blockedUntil.get(fullKey) || 0;
  if (blockedUntil > now) {
    return {
      blocked: true,
      retryAfterMs: blockedUntil - now,
      attempts: (store.failures.get(fullKey) || []).length,
    };
  }

  const windowStart = now - windowMs;
  pruneFailures(store.failures, windowStart);

  const attempts = store.failures.get(fullKey) || [];
  attempts.push(now);
  store.failures.set(fullKey, attempts);

  if (attempts.length >= maxAttempts) {
    const until = now + blockMs;
    store.blockedUntil.set(fullKey, until);
    return {
      blocked: true,
      retryAfterMs: blockMs,
      attempts: attempts.length,
    };
  }

  return {
    blocked: false,
    retryAfterMs: 0,
    attempts: attempts.length,
  };
}

export function clearFailureTracking(scope, key) {
  const store = getStore();
  const fullKey = `${scope}:${key}`;
  store.failures.delete(fullKey);
  store.blockedUntil.delete(fullKey);
}

export function recordSecurityEvent({ type, req, details }) {
  const store = getStore();
  const event = {
    ts: new Date().toISOString(),
    type,
    ip: getClientIp(req),
    path: req?.url || 'unknown',
    method: req?.method || 'unknown',
    details: details || null,
  };

  store.events.push(event);
  if (store.events.length > 300) {
    store.events.splice(0, store.events.length - 300);
  }

  return event;
}
