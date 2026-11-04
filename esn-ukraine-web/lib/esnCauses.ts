/**
 * The six ESN Causes: the core areas every ESN event contributes to.
 * Shared by the Sanity schema (checkbox list) and the Upcoming Events filter.
 * `dot` is a Tailwind background class used for the colour marker on the site.
 */
export const ESN_CAUSES = [
  { value: 'culture', title: 'Culture', dot: 'bg-esn-magenta' },
  { value: 'education-youth', title: 'Education & Youth', dot: 'bg-esn-cyan' },
  { value: 'environmental-sustainability', title: 'Environmental Sustainability', dot: 'bg-esn-green' },
  { value: 'health-wellbeing', title: 'Health & Well-being', dot: 'bg-orange-500' },
  { value: 'skills-employability', title: 'Skills & Employability', dot: 'bg-esn-dark' },
  { value: 'social-inclusion', title: 'Social Inclusion', dot: 'bg-yellow-400' },
] as const;

export type EsnCause = (typeof ESN_CAUSES)[number]['value'];

export const ESN_CAUSE_BY_VALUE: Record<string, (typeof ESN_CAUSES)[number]> = Object.fromEntries(
  ESN_CAUSES.map((c) => [c.value, c]),
);
