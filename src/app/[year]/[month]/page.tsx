import React from 'react';
import CalendarApp from '@/components/CalendarApp';
import AdBanner from '@/components/AdBanner';
import { notFound } from 'next/navigation';

// Validate year and month
function isValidDate(year: number, month: number) {
    return year >= 1900 && year <= 2100 && month >= 1 && month <= 12;
}

export async function generateMetadata({ params }: { params: Promise<{ year: string; month: string }> }) {
    const { year, month } = await params;
    const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
    return {
        title: `Printable ${capitalizedMonth} ${year} Calendar - Free PDF & Online Customization`,
        description: `Free printable calendar for ${capitalizedMonth} ${year}. Edit and print your own calendar with notes and holidays.`,
    };
}

export default async function CalendarPage({ params }: { params: Promise<{ year: string; month: string }> }) {
    const { year, month } = await params;

    // Parse params
    // Note: month param is likely a name (january) or number? 
    // User Prompt: "[year]/[month] routes (e.g., /2026/january)"
    // So month is a string name. I need to convert it to number.

    const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    const monthIndex = months.indexOf(month.toLowerCase());
    const yearNum = parseInt(year);

    if (monthIndex === -1 || isNaN(yearNum) || !isValidDate(yearNum, monthIndex + 1)) {
        notFound();
    }

    const monthNum = monthIndex + 1;

    return (
        <div className="min-h-screen bg-white">


            <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-6">
                {/* Main Content */}
                <main className="flex-1">


                    <div className="calendar-container">
                        <CalendarApp year={yearNum} month={monthNum} />
                    </div>

                    <div className="mt-8 prose max-w-none print:hidden">
                        <h2 className="text-2xl font-bold mb-4">Holidays & Observances in {month.charAt(0).toUpperCase() + month.slice(1)} {year}</h2>
                        <p>
                            Here are the major holidays and observances for this month.
                            (This is a placeholder for SEO text content. In a real app, you would fetch holidays for the specific country and month.)
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li><strong>Example Holiday 1:</strong> A day to celebrate...</li>
                            <li><strong>Example Holiday 2:</strong> Observance of...</li>
                        </ul>
                        <p className="mt-4">
                            This printable calendar is perfect for organizing your schedule.
                            You can add notes directly to the grid before printing.
                            Our calendar fits perfectly on standard letter-size paper.
                        </p>
                    </div>
                </main>

                {/* Sidebar - Hidden on Print */}
                <aside className="w-full lg:w-80 space-y-6 print:hidden">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h3 className="font-bold mb-2">Quick Navigation</h3>
                        <div className="grid grid-cols-2 gap-2 text-sm text-blue-600">
                            {/* Quick links to other months could go here */}
                            <a href={`/${yearNum}/january`}>Jan {yearNum}</a>
                            <a href={`/${yearNum}/february`}>Feb {yearNum}</a>
                            <a href={`/${yearNum}/march`}>Mar {yearNum}</a>
                            <a href={`/${yearNum}/april`}>Apr {yearNum}</a>
                            <a href={`/${yearNum}/may`}>May {yearNum}</a>
                            <a href={`/${yearNum}/june`}>Jun {yearNum}</a>
                        </div>
                    </div>
                    <AdBanner className="h-64" />
                </aside>
            </div>

            {/* Footer - Hidden on Print */}
            <footer className="bg-gray-800 text-white p-8 mt-12 print:hidden">
                <div className="container mx-auto text-center">
                    <p>&copy; {new Date().getFullYear()} Printable Calendar. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
