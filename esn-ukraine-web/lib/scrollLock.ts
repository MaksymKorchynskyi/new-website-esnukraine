/**
 * Page scroll lock that also works on iOS Safari, which ignores
 * `overflow: hidden` on <body>. The body is pinned in place and the scroll
 * position is restored on unlock. Nested locks (e.g. a modal opened from a
 * banner) are counted, so only the last unlock releases the page.
 */
let locks = 0;
let savedScrollY = 0;
let savedStyles: Partial<CSSStyleDeclaration> = {};

export function lockScroll(): () => void {
  if (typeof window === 'undefined') return () => {};

  if (locks === 0) {
    const { body } = document;
    savedScrollY = window.scrollY;
    savedStyles = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflow: body.style.overflow,
    };
    body.style.position = 'fixed';
    body.style.top = `-${savedScrollY}px`;
    body.style.width = '100%';
    body.style.overflow = 'hidden';
  }
  locks += 1;

  let released = false;
  return () => {
    if (released) return;
    released = true;
    locks -= 1;
    if (locks > 0) return;
    Object.assign(document.body.style, savedStyles);
    window.scrollTo({ top: savedScrollY, behavior: 'instant' });
  };
}
