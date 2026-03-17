import { NextResponse } from "next/server";
import type { Plan } from "@/lib/ai/usage";

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

export type RateLimitResult = {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
  retryAfter: number;
};

type RateLimitConfig = {
  key: string;
  limit: number;
  namespace: string;
  windowMs: number;
};

const rateLimitStore = getRateLimitStore();

const CONTACT_RATE_LIMIT = {
  limit: 5,
  namespace: "contact",
  windowMs: 60 * 60 * 1000,
} as const;

const WAITLIST_RATE_LIMIT = {
  limit: 5,
  namespace: "waitlist",
  windowMs: 60 * 60 * 1000,
} as const;

const PAYMENT_RATE_LIMIT = {
  limit: 5,
  namespace: "payments",
  windowMs: 15 * 60 * 1000,
} as const;

const AI_RATE_LIMITS: Record<Plan, Omit<RateLimitConfig, "key">> = {
  FREE: {
    limit: 10,
    namespace: "ai-free",
    windowMs: 5 * 60 * 1000,
  },
  BASIC: {
    limit: 20,
    namespace: "ai-basic",
    windowMs: 5 * 60 * 1000,
  },
  PRO: {
    limit: 40,
    namespace: "ai-pro",
    windowMs: 5 * 60 * 1000,
  },
  ULTIMATE: {
    limit: 80,
    namespace: "ai-ultimate",
    windowMs: 5 * 60 * 1000,
  },
};

declare global {
  var __kilatkodingRateLimitStore: Map<string, RateLimitBucket> | undefined;
}

function getRateLimitStore() {
  if (!globalThis.__kilatkodingRateLimitStore) {
    globalThis.__kilatkodingRateLimitStore = new Map<string, RateLimitBucket>();
  }

  return globalThis.__kilatkodingRateLimitStore;
}

function pruneExpiredBuckets(now: number) {
  if (rateLimitStore.size < 1_000) {
    return;
  }

  for (const [storeKey, bucket] of rateLimitStore.entries()) {
    if (bucket.resetAt <= now) {
      rateLimitStore.delete(storeKey);
    }
  }
}

function buildStoreKey(namespace: string, key: string) {
  return `${namespace}:${key}`;
}

export function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "anonymous";
  }

  return request.headers.get("x-real-ip")?.trim() || "anonymous";
}

export function getPublicRateLimitConfig(kind: "contact" | "waitlist", request: Request): RateLimitConfig {
  const key = getClientIp(request);
  const preset = kind === "contact" ? CONTACT_RATE_LIMIT : WAITLIST_RATE_LIMIT;

  return {
    key,
    ...preset,
  };
}

export function getPaymentRateLimitConfig(userId: string): RateLimitConfig {
  return {
    key: userId,
    ...PAYMENT_RATE_LIMIT,
  };
}

export function getAiRateLimitConfig(userId: string, plan: Plan): RateLimitConfig {
  return {
    key: userId,
    ...AI_RATE_LIMITS[plan],
  };
}

export function takeRateLimit(config: RateLimitConfig): RateLimitResult {
  const now = Date.now();
  pruneExpiredBuckets(now);

  const storeKey = buildStoreKey(config.namespace, config.key);
  const existing = rateLimitStore.get(storeKey);

  if (!existing || existing.resetAt <= now) {
    const resetAt = now + config.windowMs;
    rateLimitStore.set(storeKey, {
      count: 1,
      resetAt,
    });

    return {
      allowed: true,
      limit: config.limit,
      remaining: Math.max(0, config.limit - 1),
      resetAt,
      retryAfter: Math.max(1, Math.ceil(config.windowMs / 1000)),
    };
  }

  if (existing.count >= config.limit) {
    return {
      allowed: false,
      limit: config.limit,
      remaining: 0,
      resetAt: existing.resetAt,
      retryAfter: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;

  return {
    allowed: true,
    limit: config.limit,
    remaining: Math.max(0, config.limit - existing.count),
    resetAt: existing.resetAt,
    retryAfter: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
  };
}

export function applyRateLimitHeaders(response: Response, rateLimit?: RateLimitResult | null) {
  if (!rateLimit) {
    return response;
  }

  response.headers.set("X-RateLimit-Limit", String(rateLimit.limit));
  response.headers.set("X-RateLimit-Remaining", String(rateLimit.remaining));
  response.headers.set("X-RateLimit-Reset", String(Math.ceil(rateLimit.resetAt / 1000)));

  if (!rateLimit.allowed) {
    response.headers.set("Retry-After", String(rateLimit.retryAfter));
  }

  return response;
}

export function createRateLimitResponse(rateLimit: RateLimitResult, error: string) {
  return applyRateLimitHeaders(
    NextResponse.json(
      {
        error,
      },
      {
        status: 429,
      },
    ),
    rateLimit,
  );
}

export function resetRateLimitStore() {
  rateLimitStore.clear();
}
