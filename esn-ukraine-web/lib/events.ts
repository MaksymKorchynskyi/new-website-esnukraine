/**
 * An event counts as upcoming until the end of the day it takes place,
 * so it does not disappear from "Upcoming Events" while it is still running.
 */
export function isUpcomingEvent(date?: string | null, now: Date = new Date()): boolean {
  if (!date) return false;
  const time = new Date(date).getTime();
  if (isNaN(time)) return false;
  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);
  return time >= startOfToday.getTime();
}
