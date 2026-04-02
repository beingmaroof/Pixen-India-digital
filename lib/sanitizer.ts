import DOMPurify from 'isomorphic-dompurify';

export function sanitize(input: string | undefined | null): string {
  if (!input || typeof input !== 'string') return '';
  return DOMPurify.sanitize(input.trim());
}

export function normalizeEmail(email: string | undefined | null): string {
  if (!email || typeof email !== 'string') return '';
  return email.toLowerCase().trim();
}

/** 
 * Safe HTML escaping strictly for text nodes that might skip DOMPurify 
 * or log natively.
 */
export function escapeInput(input: string | undefined | null): string {
  if (!input || typeof input !== 'string') return '';
  return input.replace(/[&<>'"]/g, 
    tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
  );
}
