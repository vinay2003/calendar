import React from 'react';

export type CalendarTheme = 'corporate' | 'minimalist';

interface ThemeControlsProps {
    currentTheme: CalendarTheme;
    onThemeChange: (theme: CalendarTheme) => void;
}

const ThemeControls: React.FC<ThemeControlsProps> = ({ currentTheme, onThemeChange }) => {
    return (
        <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
            <button
                onClick={() => onThemeChange('corporate')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${currentTheme === 'corporate' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
            >
                Corporate (Blue)
            </button>
            <button
                onClick={() => onThemeChange('minimalist')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${currentTheme === 'minimalist' ? 'bg-white text-black shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
            >
                Minimalist (Clean)
            </button>
        </div>
    );
};

export default ThemeControls;
