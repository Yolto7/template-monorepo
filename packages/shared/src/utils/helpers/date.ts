import { format as tempo, addHour } from '@formkit/tempo';

export function formatDate(date: string | Date, format = 'YYYY-MM-DD HH:mm:ss'): string {
  return tempo({
    date,
    format,
    tz: 'America/Lima',
  });
}

export function getToday(format = 'YYYY-MM-DD'): string {
  return formatDate(new Date(), format);
}

export function addBusinessDays(fecha: string | Date, days: number): string {
  const currentDate = new Date(fecha);
  let count = 0;

  while (count < days) {
    currentDate.setDate(currentDate.getDate() + 1);
    if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
      count++;
    }
  }

  if (currentDate.getDay() === 6) {
    currentDate.setDate(currentDate.getDate() + 2);
  }
  if (currentDate.getDay() === 0) {
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return formatDate(currentDate, 'YYYY-MM-DD');
}

export function addDays(date: string | Date, days: number): string {
  const currentDate = new Date(date);
  currentDate.setDate(currentDate.getDate() + days);
  return formatDate(currentDate, 'YYYY-MM-DD');
}

export function addHours(date: string | Date, hours: number): string {
  const newDate = addHour(date, hours);
  return newDate.toISOString();
}
