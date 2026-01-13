"use client";
import React, { useState, useEffect } from 'react';
import { getCalendarGrid, CalendarDay } from '@/utils/calendarUtils';
import { getHolidayForDate } from '@/utils/holidayUtils';

interface WeeklyGridProps {
    year: number;
    month: number;
    isProMode?: boolean;
    showHolidays?: boolean;
    showNotes?: boolean;
}

export default function WeeklyGrid({ year, month, isProMode = false, showHolidays = true, showNotes = true }: WeeklyGridProps) {
    const [weeks, setWeeks] = useState<CalendarDay[][]>([]);

    useEffect(() => {
        const days = getCalendarGrid(year, month);
        const chunkedWeeks: CalendarDay[][] = [];
        for (let i = 0; i < days.length; i += 7) {
            chunkedWeeks.push(days.slice(i, i + 7));
        }
        setWeeks(chunkedWeeks);
    }, [year, month]);

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div className="space-y-8">
            {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="border border-gray-300 rounded-lg overflow-hidden break-inside-avoid">
                    <div className="bg-gray-100 p-2 border-b border-gray-300 font-bold text-sm text-gray-700">
                        Week {weekIndex + 1}
                    </div>
                    <div className="grid grid-cols-7">
                        {weekDays.map(day => (
                            <div key={day} className="p-2 text-center text-xs font-semibold text-gray-500 border-b border-r last:border-r-0 border-gray-200">
                                {day}
                            </div>
                        ))}
                        {week.map((date, dayIndex) => {
                            const holiday = getHolidayForDate(date.year, date.month, date.day);
                            const dayOfWeek = date.date.getDay();
                            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
                            const isGrayedOut = isProMode && isWeekend;

                            return (
                                <div key={dayIndex} className={`p-2 min-h-[80px] border-r border-gray-200 last:border-r-0 relative ${!date.isCurrentMonth ? 'bg-gray-50/50' : isGrayedOut ? 'bg-gray-200' : 'bg-white'}`}>
                                    <div className="flex justify-between items-start">
                                        <span className={`text-xs font-bold block mb-1 ${date.isToday ? 'text-red-600' : 'text-gray-700'}`}>
                                            {date.day}
                                        </span>
                                        {showHolidays && holiday && (
                                            <span className="text-[9px] text-green-600 font-medium truncate max-w-[60px]">
                                                {holiday.name}
                                            </span>
                                        )}
                                    </div>
                                    {showNotes && (
                                        <div className="text-[10px] text-gray-400">
                                            {/* Notes content could go here in future */}
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}
