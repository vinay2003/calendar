"use client";
import React, { useState, useEffect } from 'react';
import { getCalendarGrid, CalendarDay } from '@/utils/calendarUtils';
import { getHolidayForDate } from '@/utils/holidayUtils';

interface CalendarGridProps {
    year: number;
    month: number;
    isProMode?: boolean;
    showHolidays?: boolean;
    showNotes?: boolean;
}

const CalendarGrid = ({ year, month, isProMode = false, showHolidays = true, showNotes = true }: CalendarGridProps) => {
    const [days, setDays] = useState<CalendarDay[]>([]);
    const [notes, setNotes] = useState<Record<string, string>>({});

    useEffect(() => {
        // Generate calendar days
        setDays(getCalendarGrid(year, month));

        // Load notes from local storage
        const loadedNotes: Record<string, string> = {};
        // We only need to load notes for the currently displayed days (including padding)
        // But since keys are unique, we can maybe just load all relevant ones or do lazy loading.
        // For simplicity, let's load notes on day render or load all notes for the month view.
        // Actually, localStorage is sync. Let's just create a helper to read.

        // Better approach: Load notes when days are generated.
        // Since we need to render inputs, we can fetch their values from localStorage directly during render or init.
        // Only 'useState' for notes map is better for React reactivity.
    }, [year, month]);

    // Handle note change
    const handleNoteChange = (dayKey: string, value: string) => {
        setNotes(prev => ({
            ...prev,
            [dayKey]: value
        }));
        localStorage.setItem(dayKey, value);
    };

    // Hydrate notes on mount/change
    useEffect(() => {
        const grid = getCalendarGrid(year, month);
        const newNotes: Record<string, string> = {};
        grid.forEach(day => {
            const key = `calendar-note-${day.year}-${day.month}-${day.day}`;
            const saved = localStorage.getItem(key);
            if (saved) newNotes[key] = saved;
        });
        setDays(grid);
        setNotes(newNotes);
    }, [year, month]);

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div className="w-full max-w-5xl mx-auto p-4 print:p-0 print:max-w-none">


            {/* Print Header - Visible only on Print */}
            <div className="hidden print:block text-center mb-4">
                <h1 className="text-3xl font-bold uppercase">{new Date(year, month - 1).toLocaleString('default', { month: 'long' })} {year}</h1>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 border-t border-l border-gray-300">
                {weekDays.map(day => (
                    <div key={day} className="border-r border-b border-gray-300 p-2 bg-gray-50 print:bg-white text-center font-bold text-sm uppercase">
                        {day}
                    </div>
                ))}

                {days.map((date, index) => {
                    const dateKey = `calendar-note-${date.year}-${date.month}-${date.day}`;
                    const holiday = getHolidayForDate(date.year, date.month, date.day);
                    const dayOfWeek = date.date.getDay(); // 0 = Sun, 6 = Sat
                    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
                    const isGrayedOut = isProMode && isWeekend;

                    return (
                        <div key={index} className={`border-r border-b border-gray-300 min-h-[120px] p-1 relative group ${!date.isCurrentMonth ? 'bg-gray-50/50 print:bg-transparent' : isGrayedOut ? 'bg-gray-200 print:bg-gray-200' : 'bg-white'}`}>
                            <div className="flex justify-between items-start">
                                <span className={`text-sm font-semibold p-1 block ${date.isToday ? 'bg-red-100 text-red-600 rounded-full w-7 h-7 flex items-center justify-center' : 'text-gray-700'}`}>
                                    {date.day}
                                </span>
                                {showHolidays && holiday && (
                                    <span className="text-[10px] bg-green-100 text-green-700 px-1 rounded mx-1 mt-1 text-right leading-tight max-w-[60%] truncate">
                                        {holiday.name}
                                    </span>
                                )}
                            </div>
                            {
                                showNotes && (
                                    <textarea
                                        className="w-full h-[calc(100%-28px)] resize-none bg-transparent outline-none text-xs p-1 text-gray-900 placeholder-gray-400 focus:bg-yellow-50/50 rounded transition-colors print:placeholder-transparent"
                                        placeholder=""
                                        value={notes[dateKey] || ""}
                                        onChange={(e) => handleNoteChange(dateKey, e.target.value)}
                                    />
                                )
                            }
                        </div>
                    );
                })}
            </div>
        </div >
    );
};

export default CalendarGrid;
