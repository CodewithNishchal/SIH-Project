import React from 'react';
import KpiCard from './KPIcardComponent';

// You can use a library like @heroicons/react or define SVGs as components
const ChartBarIcon = () => <svg className="w-6 h-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" /></svg>;
const UsersIcon = () => <svg className="w-6 h-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962A3 3 0 0115 9.185V18a3 3 0 01-4.682-2.72m-7.5-2.962V7.429a3 3 0 013-3h3.548a3 3 0 012.864 2.164m-6.028 9.805A9.094 9.094 0 013 18.72m15 0a9.094 9.094 0 01-3.741-.479M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const CircleStackIcon = () => <svg className="w-6 h-6 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 12.75v-2.5a9 9 0 00-9-9h-1.5a9 9 0 00-9 9v2.5m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-8.5 4.907a2.25 2.25 0 01-2.18 0l-8.5-4.907A2.25 2.25 0 013 13.003v-.255m16.5 0a2.25 2.25 0 00-2.25-2.25h-12a2.25 2.25 0 00-2.25 2.25m16.5 0v9.75A2.25 2.25 0 0118 22.5h-12a2.25 2.25 0 01-2.25-2.25v-9.75" /></svg>;
const ExclamationTriangleIcon = () => <svg className="w-6 h-6 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>;

/**
 * A component that arranges KPI cards in a responsive grid.
 */
export default function KpiGrid() {
    // This data would come from an API in a real application
    const kpiData = {
        reports: { total: 142, trend: '+15% from last week', trendColor: 'text-green-500' },
        users: { total: 89, trend: 'Users active this month' },
        sources: { total: 23, trend: 'All systems operational', trendColor: 'text-green-600' },
        alerts: { total: 3, trend: 'Action required immediately', trendColor: 'text-red-600' },
    };
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KpiCard
                title="Reports Generated"
                value={kpiData.reports.total}
                trend={kpiData.reports.trend}
                trendColor={kpiData.reports.trendColor}
                icon={<div className="p-2 bg-green-100 rounded-md"><ChartBarIcon /></div>}
            />
            <KpiCard
                title="Active Users"
                value={kpiData.users.total}
                trend={kpiData.users.trend}
                icon={<div className="p-2 bg-blue-100 rounded-md"><UsersIcon /></div>}
            />
            <KpiCard
                title="Data Sources"
                value={kpiData.sources.total}
                trend={kpiData.sources.trend}
                trendColor={kpiData.sources.trendColor}
                icon={<div className="p-2 bg-yellow-100 rounded-md"><CircleStackIcon /></div>}
            />
            <KpiCard
                title="Critical Alerts"
                value={kpiData.alerts.total}
                trend={kpiData.alerts.trend}
                trendColor={kpiData.alerts.trendColor}
                icon={<div className="p-2 bg-red-100 rounded-md"><ExclamationTriangleIcon /></div>}
            />
        </div>
    );
}
