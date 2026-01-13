export interface Holiday {
    date: string; // YYYY-MM-DD
    name: string;
    type: 'international' | 'custom';
}

export function getHolidays(year: number): Holiday[] {
    const holidays: Holiday[] = [
        { date: `${year}-01-01`, name: "New Year's Day", type: 'international' },
        { date: `${year}-02-14`, name: "Valentine's Day", type: 'international' },
        { date: `${year}-03-08`, name: "Int'l Women's Day", type: 'international' },
        { date: `${year}-03-17`, name: "St. Patrick's Day", type: 'international' },
        { date: `${year}-04-22`, name: "Earth Day", type: 'international' },
        { date: `${year}-05-01`, name: "Labor Day", type: 'international' },
        { date: `${year}-10-31`, name: "Halloween", type: 'international' },
        { date: `${year}-11-11`, name: "Veterans Day", type: 'international' },
        { date: `${year}-12-25`, name: "Christmas Day", type: 'international' },
        { date: `${year}-12-31`, name: "New Year's Eve", type: 'international' },
    ];

    // Dynamic holidays (simplification for common ones, mostly fixed date for this demo)
    // In a real app, Easter, Thanksgiving, etc. need complex calculation.
    // Adding placeholders for dynamic ones if strictly needed, but for now fixed list is good.

    return holidays;
}

export function getHolidayForDate(year: number, month: number, day: number): Holiday | undefined {
    // month is 1-indexed
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const holidays = getHolidays(year);
    return holidays.find(h => h.date === dateStr);
}
