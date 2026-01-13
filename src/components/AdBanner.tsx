export default function AdBanner({ className = "" }: { className?: string }) {
    return (
        <div className={`w-full p-4 bg-gray-100 flex items-center justify-center border border-gray-200 text-gray-400 text-sm print:hidden ${className}`}>
            <span>Ad Space (Auto-filled by AdSense)</span>
        </div>
    );
}
