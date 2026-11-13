/**
 * Dates are formatted in the Kyiv time zone on both the server (UTC) and the
 * client, so the output is identical and never causes a hydration mismatch.
 * Example: "14 Oct 2025".
 */
const KYIV_DATE = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/Kyiv',
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

export function formatDate(dateString?: string | null): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';
  return KYIV_DATE.format(date);
}

/** Slugs are lower-case Latin letters, digits and single dashes (see the Sanity schemas). */
export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isValidSlug(slug: string): boolean {
  return slug.length <= 120 && SLUG_PATTERN.test(slug);
}
