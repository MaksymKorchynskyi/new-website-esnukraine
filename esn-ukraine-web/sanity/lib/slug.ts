/**
 * Slug rules shared by the news and event schemas: lower-case Latin letters,
 * digits and single dashes. Typographic apostrophes (’) and other punctuation are
 * dropped, so a title like "Let’s make it move" becomes "lets-make-it-move".
 */
export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/['’"`]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96)
}

export function validateSlug(value: { current?: string } | undefined): true | string {
  if (!value?.current) return true
  return SLUG_PATTERN.test(value.current) || 'Лише малі латинські літери, цифри та дефіси (без апострофів і пробілів)'
}
