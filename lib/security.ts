import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

// In-memory rate limiter for serverless (per-instance)
// Structure: Map<IP, { count: number, resetTime: number }>
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

/**
 * Validates the request Origin/Referer against allowed domains
 * Prevents CSRF by ensuring POST/PUT requests only come from our frontend
 */
export function validateOrigin(req: Request): boolean {
  if (process.env.NODE_ENV === 'development') return true; // Bypass in strictly local dev

  const origin = req.headers.get('origin');
  const referer = req.headers.get('referer');
  const host = req.headers.get('host') || '';
  const forwardedHost = req.headers.get('x-forwarded-host') || '';

  // Allowed dynamic origins (handles Vercel previews dynamically via host headers)
  const allowedHosts = [
    process.env.NEXT_PUBLIC_APP_URL?.replace(/^https?:\/\//, ''),
    host,
    forwardedHost,
  ].filter(Boolean) as string[];

  // If we have an origin, it MUST match one of our allowed hosts
  if (origin) {
    const originHost = origin.replace(/^https?:\/\//, '');
    if (allowedHosts.includes(originHost)) return true;
    
    // Check for localhost/127.0.0.1 explicitly just in case NODE_ENV is wonky
    if (originHost.startsWith('localhost:') || originHost.startsWith('127.0.0.1:')) return true;
    
    return false;
  }

  // Fallback to referer if origin is missing
  if (referer) {
    try {
      const refererHost = new URL(referer).host;
      if (allowedHosts.includes(refererHost)) return true;
      if (refererHost.startsWith('localhost:') || refererHost.startsWith('127.0.0.1:')) return true;
    } catch {
      // Invalid URL in referer
    }
  }

  // If no origin and no referer are present on a mutating POST request, reject it
  return false;
}

/**
 * Basic In-Memory Rate Limiting
 * @param req Request object
 * @param limit Max requests allowed
 * @param windowMs Time window in milliseconds
 */
export function isRateLimited(req: Request, endpoint: string, limit = 5, windowMs = 60000): { success: boolean; retryAfter: number } {
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
  if (ip === 'unknown') return { success: true, retryAfter: 0 };

  const key = `${ip}:${endpoint}`;
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
    return { success: true, retryAfter: 0 };
  }

  if (now > record.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
    return { success: true, retryAfter: 0 };
  }

  if (record.count >= limit) {
    return { success: false, retryAfter: Math.ceil((record.resetTime - now) / 1000) };
  }

  record.count += 1;
  return { success: true, retryAfter: 0 };
}

/**
 * Checks for honeypot field. If true, it's a bot.
 */
export function isBotHoneypot(bodyData: any): boolean {
  // 'website_url' is our invisible honeypot field name. Real users won't see it to fill it.
  return !!bodyData.website_url;
}
