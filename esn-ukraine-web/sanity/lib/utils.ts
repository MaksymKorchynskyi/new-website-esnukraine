/**
 * Утиліта для форматування дати у форматі DD/MM/YYYY (наприклад, 11/03/2022).
 * Забезпечує стабільний результат як при SSR (сервер), так і на клієнті без помилок гідрації.
 */
export function formatDate(dateString?: string | null): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';
  
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  
  return `${day}/${month}/${year}`;
}
