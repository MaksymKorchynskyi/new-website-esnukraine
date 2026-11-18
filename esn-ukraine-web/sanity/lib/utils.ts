/**
 * Утиліта для форматування дати у форматі DD/MM/YYYY (наприклад, 11/03/2022).
 * Дата рахується за київським часом і на сервері (UTC), і в браузері, тому
 * результат однаковий і не спричиняє помилок гідрації.
 */
const KYIV_DATE = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/Kyiv',
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

export function formatDate(dateString?: string | null): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';
  return KYIV_DATE.format(date);
}
