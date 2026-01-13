export interface CalendarDay {
  date: Date;
  day: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
  isToday: boolean;
}

export function getCalendarGrid(year: number, month: number): CalendarDay[] {
  // month is 1-indexed (1 = January, 12 = December)
  const days: CalendarDay[] = [];
  
  // Note: JS Date month is 0-indexed for Date constructor
  const firstDayOfMonth = new Date(year, month - 1, 1);
  const daysInMonth = new Date(year, month, 0).getDate();
  
  // Get day of week for the 1st (0 = Sunday, 6 = Saturday)
  const startDayOfWeek = firstDayOfMonth.getDay(); 
  
  // Padding from previous month
  const prevMonthDays = new Date(year, month - 1, 0).getDate();
  // We need 'startDayOfWeek' number of days from previous month
  // e.g. if start is Tuesday (2), we need Sunday (0) and Monday (1)
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const day = prevMonthDays - i;
    // year and month arguments to Date constructor handle wrapping correctly (e.g. month - 1 = -1 becomes Dec previous year)
    const date = new Date(year, month - 2, day); 
    days.push({
      date: date,
      day: day,
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      isCurrentMonth: false,
      isToday: isSameDate(date, new Date())
    });
  }
  
  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month - 1, i);
    days.push({
      date: date,
      day: i,
      month: month,
      year: year,
      isCurrentMonth: true,
      isToday: isSameDate(date, new Date())
    });
  }
  
  // Padding for next month to fill 42 cells (6 rows * 7 cols)
  const remainingCells = 42 - days.length;
  for (let i = 1; i <= remainingCells; i++) {
    const date = new Date(year, month, i); 
    days.push({
      date: date,
      day: i,
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      isCurrentMonth: false,
      isToday: isSameDate(date, new Date())
    });
  }
  
  return days;
}

function isSameDate(d1: Date, d2: Date): boolean {
  return d1.getFullYear() === d2.getFullYear() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getDate() === d2.getDate();
}
