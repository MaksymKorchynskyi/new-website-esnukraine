/**
 * Only site-relative paths may be used as redirect targets, otherwise
 * `?slug=https://evil.example` turns the endpoint into an open redirect.
 */
export function safeRedirectPath(raw: string | null | undefined): string {
  if (!raw) return '/';
  const value = raw.trim();
  if (
    !value.startsWith('/') ||
    value.startsWith('//') ||
    value.startsWith('/\\') ||
    value.includes('\\') ||
    /[\u0000-\u001f]/.test(value)
  ) {
    return '/';
  }
  return value;
}
