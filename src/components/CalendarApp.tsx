"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import CalendarGrid from './CalendarGrid';
import WeeklyGrid from './WeeklyGrid';
import YearlyGrid from './YearlyGrid';
import ExportControls from './ExportControls';
import ExportModal from './ExportModal';
import { CalendarTheme } from './ThemeControls';

interface CalendarAppProps {
    year: number;
    month: number;
}

type ViewMode = 'MONTH' | 'WEEK' | 'YEAR';

export default function CalendarApp({ year, month }: CalendarAppProps) {
    const [view, setView] = useState<ViewMode>('MONTH');

    // Customization State
    const [isProMode, setIsProMode] = useState(false);
    const [showHolidays, setShowHolidays] = useState(true);
    const [showNotes, setShowNotes] = useState(true);
    const [currentTheme, setCurrentTheme] = useState<CalendarTheme>('corporate');

    // Modal State
    const [isExportModalOpen, setIsExportModalOpen] = useState(false);

    const router = useRouter();

    const monthNames = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

    const handlePrevMonth = () => {
        let newYear = year;
        let newMonth = month - 1;
        if (newMonth < 1) {
            newMonth = 12;
            newYear--;
        }
        router.push(`/${newYear}/${monthNames[newMonth - 1]}`);
    };

    const handleNextMonth = () => {
        let newYear = year;
        let newMonth = month + 1;
        if (newMonth > 12) {
            newMonth = 1;
            newYear++;
        }
        router.push(`/${newYear}/${monthNames[newMonth - 1]}`);
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Navigation Header - Print Hidden */}
            <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-200 print:hidden">
                <button
                    onClick={handlePrevMonth}
                    className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded transition"
                >
                    <span className="mr-2">←</span> Prev
                </button>

                <h2 className="text-2xl font-bold text-gray-800 uppercase">
                    {monthNames[month - 1]} {year}
                </h2>

                <button
                    onClick={handleNextMonth}
                    className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded transition"
                >
                    Next <span className="ml-2">→</span>
                </button>
            </div>

            <div className="flex justify-end print:hidden">
                <a href={`/${year}/holidays`} className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline">
                    View All Holidays →
                </a>
            </div>

            <div id="calendar-export-target" className="bg-white p-4">
                {/* Render View Based on State */}
                {view === 'MONTH' && <CalendarGrid year={year} month={month} isProMode={isProMode} showHolidays={showHolidays} showNotes={showNotes} />}
                {view === 'WEEK' && <WeeklyGrid year={year} month={month} isProMode={isProMode} showHolidays={showHolidays} showNotes={showNotes} />}
                {view === 'YEAR' && <YearlyGrid year={year} isProMode={isProMode} showHolidays={showHolidays} theme={currentTheme} />}

                {/* Add Watermark hidden by default, visible on export? 
             Actually exportUtils handles watermark for PDF. 
             If we want it for PNG, we might need a visible element or force it.
             For now, let's rely on PDF watermark. 
         */}
            </div>

            <ExportControls
                currentView={view}
                onViewChange={setView}
                onOpenExportModal={() => setIsExportModalOpen(true)}
            />

            <ExportModal
                isOpen={isExportModalOpen}
                onClose={() => setIsExportModalOpen(false)}
                targetId="calendar-export-target"
                fileName={`calendar-${year}-${month}-${view.toLowerCase()}`}
                isProMode={isProMode}
                onTogglePro={() => setIsProMode(!isProMode)}
                showHolidays={showHolidays}
                onToggleHolidays={() => setShowHolidays(!showHolidays)}
                showNotes={showNotes}
                onToggleNotes={() => setShowNotes(!showNotes)}
                currentTheme={currentTheme}
                onThemeChange={setCurrentTheme}
            />
        </div >
    );
}
