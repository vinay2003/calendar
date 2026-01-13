"use client";
import React from 'react';
import { getCalendarGrid } from '@/utils/calendarUtils';
import { getHolidayForDate, getHolidays } from '@/utils/holidayUtils';
import { CalendarTheme } from '@/components/ThemeControls';

interface YearlyGridProps {
    year: number;
    isProMode?: boolean;
    showHolidays?: boolean;
    theme?: CalendarTheme;
}

export default function YearlyGrid({ year, isProMode = false, showHolidays = true, theme = 'corporate' }: YearlyGridProps) {
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    const holidays = getHolidays(year);

    // Theme Configuration
    const isCorp = theme === 'corporate';

    const colors = isCorp ? {
        headerBg: 'bg-[#4472C4]',
        headerText: 'text-white',
        monthTitle: 'text-gray-800',
        daysHeaderBg: 'bg-gray-200',
        weekendBg: 'bg-slate-100',
        holidayText: 'text-[#4472C4]',
        holidayHighlight: 'bg-[#e0efff]',
        sidebarHeaderBg: 'bg-[#4472C4]',
        sidebarText: 'text-[#4472C4]'
    } : {
        // Minimalist Theme
        headerBg: 'bg-black',
        headerText: 'text-white',
        monthTitle: 'text-black font-light tracking-wide',
        daysHeaderBg: 'bg-transparent border-b border-gray-200',
        weekendBg: 'bg-stone-50', // Softer
        holidayText: 'text-black font-bold underline decoration-dotted',
        holidayHighlight: 'bg-orange-100 rounded-full', // Pastel highlight
        sidebarHeaderBg: 'bg-black',
        sidebarText: 'text-black'
    };

    return (
        <div className={`bg-white p-4 max-w-[1400px] mx-auto min-h-screen font-sans ${!isCorp ? 'font-light' : ''}`}>
            {/* Main Header */}
            <div className={`${colors.headerBg} ${colors.headerText} text-center py-6 text-6xl font-bold mb-8 shadow-sm tracking-widest transition-colors duration-300`}>
                {year}
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Calendar Grid Section (75%) */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {months.map((month) => {
                        const days = getCalendarGrid(year, month);
                        return (
                            <div key={month} className="break-inside-avoid">
                                {/* Month Header */}
                                <h3 className={`text-center font-bold text-xl mb-2 ${colors.monthTitle}`}>
                                    {monthNames[month - 1]}
                                </h3>

                                {/* Days Grid */}
                                <div className="w-full">
                                    {/* Week Headers */}
                                    <div className={`grid grid-cols-7 mb-1 ${colors.daysHeaderBg} ${!isCorp ? 'rounded-md' : ''}`}>
                                        {weekDays.map((d, i) => {
                                            const isWeekend = i === 0 || i === 6;
                                            return (
                                                <div key={d} className={`text-center text-xs font-bold text-gray-600 py-1 ${isCorp && isWeekend ? colors.weekendBg : ''}`}>
                                                    {d}
                                                </div>
                                            )
                                        })}
                                    </div>

                                    {/* Days */}
                                    <div className="grid grid-cols-7 gap-y-1">
                                        {days.map((date, idx) => {
                                            const colIndex = idx % 7;
                                            const isWeekendColumn = colIndex === 0 || colIndex === 6;

                                            if (!date.isCurrentMonth) {
                                                // Keep weekend background if corporate, else clean
                                                return <div key={idx} className={`h-6 ${isCorp && isWeekendColumn ? colors.weekendBg : ''}`}></div>;
                                            }

                                            const holiday = getHolidayForDate(date.year, date.month, date.day);
                                            const isHoliday = showHolidays && !!holiday;

                                            // Conditional styling for cell
                                            let cellClass = `h-6 flex items-center justify-center text-sm `;

                                            if (isCorp) {
                                                if (isWeekendColumn) cellClass += colors.weekendBg + ' ';
                                                if (isHoliday) cellClass += colors.holidayText + ' font-bold';
                                                else cellClass += 'text-gray-700';
                                            } else {
                                                // Minimalist
                                                cellClass += 'rounded-full '; // Round shapes
                                                if (isHoliday) cellClass += colors.holidayHighlight + ' font-semibold text-black';
                                                else if (isWeekendColumn) cellClass += colors.weekendBg + ' text-gray-500';
                                                else cellClass += 'text-gray-800';
                                            }

                                            return (
                                                <div
                                                    key={idx}
                                                    className={cellClass}
                                                    title={isHoliday ? holiday?.name : undefined}
                                                >
                                                    {date.day}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Sidebar - Holidays (25%) */}
                {showHolidays && (
                    <div className="w-full lg:w-80 shrink-0">
                        {/* Sidebar Header */}
                        <div className={`${colors.sidebarHeaderBg} text-white text-center py-3 px-6 rounded-t-sm mb-4 transition-colors duration-300`}>
                            <h2 className="text-xl font-bold leading-tight">
                                Holidays &<br />Observances
                            </h2>
                        </div>

                        {/* Holiday List */}
                        <div className="space-y-1 text-sm">
                            {holidays.map((h, i) => {
                                const dateObj = new Date(h.date);
                                const monthStr = dateObj.toLocaleString('default', { month: 'short' });
                                const dayStr = String(dateObj.getDate()).padStart(2, '0');

                                return (
                                    <div key={i} className="flex gap-4 py-0.5 border-b border-transparent hover:border-gray-100 transition-colors">
                                        <div className={`font-bold w-12 shrink-0 text-right ${colors.sidebarText}`}>
                                            {monthStr} {dayStr}
                                        </div>
                                        <div className={`${colors.sidebarText} ${!isCorp ? 'text-gray-600' : ''}`}>
                                            {h.name}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="mt-8 text-[10px] text-gray-400 text-center">
                            © {year} Calendar App
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-12 pt-4 border-t border-gray-200 text-center text-xs text-gray-400 flex justify-between px-8">
                <span>{year} Calendar with Holidays</span>
                <span>My Calendar App</span>
            </div>
        </div>
    );
}
