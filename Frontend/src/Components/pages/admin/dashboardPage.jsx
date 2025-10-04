import React, { useState, useEffect } from 'react';
import KpiGrid from './KPIgridComponent';
import ReportMap from './reportMapComponent';
import RecentReports from './recentReportComponent';
import SystemActivityLog from './activityLog';

/**
 * The main header for the dashboard page.
 */
const DashboardHeader = () => {
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const today = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        setCurrentDate(today.toLocaleDateString('en-IN', options)); // Changed to en-IN locale
    }, []);

    return (
        <div className="flex flex-wrap justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
            <p className="text-gray-500 mt-2 sm:mt-0" id="current-date">{currentDate}</p>
        </div>
    );
};

/**
 * The main page component for the dashboard.
 * It assembles all the dashboard-specific components.
 */
export default function DashboardPage() {
    // In a real app, initial data would likely be fetched here and passed down.
    return (
        <>
            <main className="flex-1 p-6 bg-blend-hue">
                <DashboardHeader />
                <KpiGrid />
                
                {/* Grid for Map and Recent Reports */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
                    <div className="xl:col-span-2">
                        <ReportMap />
                    </div>
                    {/* This div now has a fixed height to match the map. */}
                    <div className="xl:col-span-1 h-[75vh] flex flex-col">
                        <RecentReports />
                    </div>
                </div>

                {/* Full-width container for System Activity Log */}
                <div className="mt-6">
                    <SystemActivityLog />
                    </div>
            </main>
        </>
    );
}

