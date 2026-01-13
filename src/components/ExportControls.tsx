import React from 'react';

type ViewMode = 'MONTH' | 'WEEK' | 'YEAR';

interface ExportControlsProps {
    currentView: ViewMode;
    onViewChange: (view: ViewMode) => void;
    onOpenExportModal: () => void;
}

export default function ExportControls({ currentView, onViewChange, onOpenExportModal }: ExportControlsProps) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6 print:hidden">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">

                {/* View Selection */}
                <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold text-gray-700">View:</span>
                    <div className="flex bg-gray-100 p-1 rounded-md">
                        {(['MONTH', 'WEEK', 'YEAR'] as ViewMode[]).map((view) => (
                            <button
                                key={view}
                                onClick={() => onViewChange(view)}
                                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${currentView === view ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                {view.charAt(0) + view.slice(1).toLowerCase()}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Export Action */}
                <div className="flex items-center space-x-3">
                    <button
                        onClick={onOpenExportModal}
                        className="bg-gray-900 text-white px-6 py-2 rounded-full font-bold hover:bg-black transition shadow-lg flex items-center"
                    >
                        <span>Export / Print</span>
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
