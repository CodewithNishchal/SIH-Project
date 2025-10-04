import React, { useState, useEffect } from 'react';

/**
 * A reusable header component for the Analyst Dashboard.
 * It displays the title, a sidebar toggle button for mobile, and the current system status and date.
 * @param {object} props - The component props.
 * @param {Function} props.onToggleSidebar - A callback function to be executed when the sidebar toggle button is clicked.
 */
export default function AnalystHeader({ onToggleSidebar }) {
    // State to hold the formatted current date string.
    const [currentDate, setCurrentDate] = useState('');

    // useEffect hook to calculate the date once when the component mounts.
    useEffect(() => {
        const now = new Date();
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        // Format the date and update the state.
        setCurrentDate(new Intl.DateTimeFormat('en-US', options).format(now));
    }, []); // Empty dependency array means this effect runs only once.

    return (
        // The 'header' class styling should be in your global CSS file (e.g., index.css)
        <header className="header bg-white p-4 px-8 rounded-2xl shadow-md border border-slate-200">
            <div className="flex justify-between items-center">
                
                {/* Left side: Toggle button and Title */}
                <div className="flex items-center gap-4">
                    <button 
                        onClick={onToggleSidebar} // Fire the callback prop on click
                        className="text-slate-600 hover:text-slate-800 lg:hidden"
                        aria-label="Toggle sidebar"
                    >
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Analyst Dashboard</h1>
                        <p className="text-sm text-slate-500 hidden sm:block">Maritime Security Analytics Platform</p>
                    </div>
                </div>

                {/* Right side: Status and Date */}
                <div className="flex items-center gap-4">
                    {/* The 'status-badge' and 'status-dot' classes need to be in global CSS */}
                    <div className="status-badge">
                        <div className="status-dot"></div>
                        System Online
                    </div>
                    <p className="text-slate-500 text-sm hidden md:block">{currentDate}</p>
                </div>

            </div>
        </header>
    );
}