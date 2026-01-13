import React, { useState } from 'react';
import { exportAsImage, exportAsPDF } from '@/utils/exportUtils';
import ThemeControls, { CalendarTheme } from '@/components/ThemeControls';

interface ExportModalProps {
    isOpen: boolean;
    onClose: () => void;
    targetId: string;
    fileName: string;
    isProMode: boolean;
    onTogglePro: () => void;
    showHolidays: boolean;
    onToggleHolidays: () => void;
    showNotes: boolean;
    onToggleNotes: () => void;
    currentTheme: CalendarTheme;
    onThemeChange: (theme: CalendarTheme) => void;
}

export default function ExportModal({
    isOpen,
    onClose,
    targetId,
    fileName,
    isProMode,
    onTogglePro,
    showHolidays,
    onToggleHolidays,
    showNotes,
    onToggleNotes,
    currentTheme,
    onThemeChange
}: ExportModalProps) {
    const [format, setFormat] = useState<'PDF' | 'PNG'>('PDF');
    const [isProcessing, setIsProcessing] = useState(false);

    if (!isOpen) return null;

    const handleExport = async () => {
        setIsProcessing(true);
        setTimeout(async () => {
            if (format === 'PDF') {
                await exportAsPDF(targetId, fileName);
            } else {
                await exportAsImage(targetId, fileName);
            }
            setIsProcessing(false);
            onClose();
        }, 100);
    };

    const handlePrint = () => {
        window.print();
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 print:hidden">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden">
                {/* Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-800">Export & Print Options</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
                        ✕
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">

                    {/* Format Section */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Export Format</label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="format"
                                    value="PDF"
                                    checked={format === 'PDF'}
                                    onChange={() => setFormat('PDF')}
                                    className="w-4 h-4 text-blue-600"
                                />
                                <span className="text-gray-700">PDF Document</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="format"
                                    value="PNG"
                                    checked={format === 'PNG'}
                                    onChange={() => setFormat('PNG')}
                                    className="w-4 h-4 text-blue-600"
                                />
                                <span className="text-gray-700">PNG Image</span>
                            </label>
                        </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* Customization Options */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Customization</label>
                        <div className="space-y-3">
                            {/* Pro Mode Toggle */}
                            <div className="flex items-center justify-between">
                                <span className="text-gray-700">Pro Mode (weekend gray out)</span>
                                <div
                                    onClick={onTogglePro}
                                    className={`relative w-11 h-6 bg-gray-200 rounded-full cursor-pointer transition-colors duration-200 border border-gray-300 ${isProMode ? '!bg-yellow-400 !border-yellow-500' : ''}`}
                                >
                                    <div className={`absolute top-0.5 left-0.5 bg-white w-4.5 h-4.5 rounded-full shadow transform transition-transform duration-200 ${isProMode ? 'translate-x-5' : 'translate-x-0'}`}></div>
                                </div>
                            </div>

                            {/* Show Holidays Toggle */}
                            <div className="flex items-center justify-between">
                                <span className="text-gray-700">Show Holidays</span>
                                <div
                                    onClick={onToggleHolidays}
                                    className={`relative w-11 h-6 bg-gray-200 rounded-full cursor-pointer transition-colors duration-200 border border-gray-300 ${showHolidays ? '!bg-blue-500 !border-blue-600' : ''}`}
                                >
                                    <div className={`absolute top-0.5 left-0.5 bg-white w-4.5 h-4.5 rounded-full shadow transform transition-transform duration-200 ${showHolidays ? 'translate-x-5' : 'translate-x-0'}`}></div>
                                </div>
                            </div>

                            {/* Show Notes Toggle */}
                            <div className="flex items-center justify-between">
                                <span className="text-gray-700">Show My Notes</span>
                                <div
                                    onClick={onToggleNotes}
                                    className={`relative w-11 h-6 bg-gray-200 rounded-full cursor-pointer transition-colors duration-200 border border-gray-300 ${showNotes ? '!bg-green-500 !border-green-600' : ''}`}
                                >
                                    <div className={`absolute top-0.5 left-0.5 bg-white w-4.5 h-4.5 rounded-full shadow transform transition-transform duration-200 ${showNotes ? 'translate-x-5' : 'translate-x-0'}`}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* Theme Selection */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Calendar Theme</label>
                        <ThemeControls currentTheme={currentTheme} onThemeChange={onThemeChange} />
                    </div>

                </div>

                {/* Footer Actions */}
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
                    <button
                        onClick={handlePrint}
                        className="px-4 py-2 text-gray-700 font-bold hover:bg-gray-200 rounded transition border border-gray-300"
                    >
                        Print Now
                    </button>
                    <button
                        onClick={handleExport}
                        disabled={isProcessing}
                        className="px-6 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition disabled:opacity-50 flex items-center"
                    >
                        {isProcessing ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </>
                        ) : (
                            `Download ${format}`
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
