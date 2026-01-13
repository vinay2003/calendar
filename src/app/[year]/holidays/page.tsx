import React from 'react';
import { getHolidays } from '@/utils/holidayUtils';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ year: string }> }) {
    const { year } = await params;
    return {
        title: `Holidays in ${year} - Printable Calendar`,
        description: `List of international holidays and observances for the year ${year}.`,
    };
}

export default async function HolidaysPage({ params }: { params: Promise<{ year: string }> }) {
    const { year } = await params;
    const yearNum = parseInt(year);
    const holidays = getHolidays(yearNum);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // Group holidays by month for better display
    const holidaysByMonth: Record<number, typeof holidays> = {};
    holidays.forEach(holiday => {
        const month = parseInt(holiday.date.split('-')[1]);
        if (!holidaysByMonth[month]) {
            holidaysByMonth[month] = [];
        }
        holidaysByMonth[month].push(holiday);
    });

    return (
        <div className="min-h-screen bg-white p-8 max-w-[1400px] mx-auto font-sans">
            {/* Main Header */}
            <div className="bg-[#4472C4] text-white text-center py-4 text-4xl font-bold mb-8 shadow-sm relative">
                Holidays in {year}
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <Link
                        href={`/${year}/january`}
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded transition"
                    >
                        ← Back to Calendar
                    </Link>
                </div>
            </div>

            <div className="bg-white border border-[#4472C4]/20 rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-[#4472C4] text-white uppercase font-bold text-xs border-b border-[#4472C4]">
                            <tr>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Holiday Name</th>
                                <th className="px-6 py-3">Type</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {Object.keys(holidaysByMonth).map((monthStr) => {
                                const month = parseInt(monthStr);
                                const monthHolidays = holidaysByMonth[month];
                                return (
                                    <React.Fragment key={month}>
                                        <tr className="bg-gray-100 border-y border-gray-300">
                                            <td colSpan={3} className="px-6 py-2 font-bold text-[#4472C4]">
                                                {months[month - 1]}
                                            </td>
                                        </tr>
                                        {monthHolidays.map((holiday, index) => (
                                            <tr key={`${month}-${index}`} className="hover:bg-blue-50 transition">
                                                <td className="px-6 py-4 font-bold text-[#4472C4] whitespace-nowrap">
                                                    {new Date(holiday.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', weekday: 'short' })}
                                                </td>
                                                <td className="px-6 py-4 font-medium text-[#4472C4]">
                                                    {holiday.name}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-[#e0efff] text-[#4472C4] border border-[#4472C4]/10">
                                                        {holiday.type}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </React.Fragment>
                                );
                            })}
                            {holidays.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                                        No holidays found for this year.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-12 text-center text-xs text-gray-400">
                © {year} Calendar App
            </div>
        </div>
    );
}
