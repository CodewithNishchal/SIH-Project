import React from 'react';
import { Link, NavLink } from 'react-router-dom';

// --- Reusable Icon Components ---
const LogoIcon = () => (
    <svg className="w-8 h-8 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" opacity="0.4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25c-1.5 3-5.25 3-6.75 0s-5.25 0-6.75 0" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 9.75c-1.5 3-5.25 3-6.75 0s-5.25 0-6.75 0" />
    </svg>
);

const DashboardIcon = () => (
    <svg className="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
);

const ReportsIcon = () => (
    <svg className="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
);

const UserActivityIcon = () => (
    <svg className="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
);

const AlertsIcon = () => (
    <svg className="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
    </svg>
);

const DataSourcesIcon = () => (
    <svg className="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 12.75v-2.5a9 9 0 00-9-9h-1.5a9 9 0 00-9 9v2.5m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-8.5 4.907a2.25 2.25 0 01-2.18 0l-8.5-4.907A2.25 2.25 0 013 13.003v-.255m16.5 0a2.25 2.25 0 00-2.25-2.25h-12a2.25 2.25 0 00-2.25 2.25m16.5 0v9.75A2.25 2.25 0 0118 22.5h-12a2.25 2.25 0 01-2.25-2.25v-9.75" />
    </svg>
);

const SettingsIcon = () => (
    <svg className="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.242 1.417l-1.07 1.07a1.125 1.125 0 01-1.417.242l-1.217-.456c-.355-.133-.75-.072-1.075.124a6.57 6.57 0 01-.22.127c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.063-.374-.313-.686-.645-.87a6.52 6.52 0 01-.22-.127c-.324-.196-.72-.257-1.075-.124l-1.217.456a1.125 1.125 0 01-1.37-.49l-1.296-2.247a1.125 1.125 0 01.242-1.417l1.07-1.07a1.125 1.125 0 011.417-.242l1.217.456c.355.133.75.072 1.075-.124a6.57 6.57 0 01.22-.127c.331-.183-.581.495-.644.869l-.213-1.28c-.09-.543-.56-.94-1.11-.94h2.593z" />
    </svg>
);

// Add these to the other icon components you already have

const HistoricalDataIcon = () => (
    <svg className="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const SocialFeedsIcon = () => (
     <svg className="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m2.25 4.125c.621 0 1.125.504 1.125 1.125V21h-18v-4.125c0-.621.504-1.125 1.125-1.125h15.75c.621 0 1.125.504 1.125 1.125zM16.5 7.5h-9A1.5 1.5 0 006 9v2.25h12V9a1.5 1.5 0 00-1.5-1.5z" />
    </svg>
);

const AIPredictionIcon = () => (
    <svg className="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.003h5.25v-1.003h-5.25z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 17.25v-1.003c0-.828-.672-1.5-1.5-1.5h-3.75V11.25H21v-3c0-1.656-1.344-3-3-3H6c-1.656 0-3 1.344-3 3v3h5.25v3.504H4.5c-.828 0-1.5.672-1.5 1.5v1.003h18z" />
    </svg>
);


/**
 * A responsive sidebar navigation component.
 * @param {object} props - The component props.
 * @param {boolean} props.isOpen - Controls the visibility of the sidebar on mobile screens.
 */
export default function Sidebar({ isOpen }) {
    
    // Define class strings for NavLink to keep the JSX clean
    const navLinkClasses = "flex items-center py-2.5 px-4 rounded-lg border-l-4 transition-all duration-200";
    const activeClasses = "bg-sky-700 text-white font-semibold border-sky-400";
    const inactiveClasses = "text-gray-300 hover:bg-sky-700/60 hover:text-white border-transparent hover:border-sky-400";
    
    return (
        <aside
            className={`sidebar bg-gradient-to-b from-sky-800 to-slate-900 text-gray-200 w-64 fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 z-50 transition-transform duration-300 ease-in-out overflow-y-auto flex flex-col`}
        >
            <div>
                <div className="p-4 border-b border-sky-700/50">
                    <Link to="/users/admin/dashboard" className="flex items-center space-x-3">
                        <LogoIcon />
                        <h1 className="text-2xl font-bold text-white tracking-wider">Samudra Rakshak</h1>
                    </Link>
                </div>

                <nav className="mt-4 flex-grow px-2">
                    <NavLink
                        to="/users/admin/dashboard"
                        className={({ isActive }) => `${navLinkClasses} ${isActive ? activeClasses : inactiveClasses}`}
                    >
                        <DashboardIcon />
                        Dashboard
                    </NavLink>

                    <span className="text-xs text-sky-300 uppercase font-semibold px-4 mt-6 mb-2 block opacity-75">
                        Admin & Reports
                    </span>

                    <NavLink to="/users/reports" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeClasses : inactiveClasses}`}>
                        <ReportsIcon />
                        Reports
                    </NavLink>
                    <NavLink to="/users/activity" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeClasses : inactiveClasses}`}>
                        <UserActivityIcon />
                        User Activity
                    </NavLink>
                    <NavLink to="/users/alerts" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeClasses : inactiveClasses}`}>
                        <AlertsIcon />
                        Alerts
                    </NavLink>
                    
                    <span className="text-xs text-sky-300 uppercase font-semibold px-4 mt-6 mb-2 block opacity-75">
                        System
                    </span>

                    <NavLink to="/users/sources" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeClasses : inactiveClasses}`}>
                        <DataSourcesIcon />
                        Data Sources
                    </NavLink>
                    <NavLink to="/users/admin/settings" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeClasses : inactiveClasses}`}>
                        <SettingsIcon />
                        Settings
                    </NavLink>
                </nav>
            </div>

            {/* Logout is an action, so it's better as a button */}
            <div className="mt-auto p-2">
                <div className="border-t border-sky-700/50 pt-2">
                    <button
                        className="w-full flex items-center py-2.5 px-4 rounded-lg text-gray-300 hover:bg-red-800/80 hover:text-white transition-colors duration-200 group"
                    >
                        <svg className="w-5 h-5 mr-3 text-red-400 group-hover:text-white transition-colors" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                        </svg>
                        Logout
                    </button>
                </div>
            </div>
        </aside>
    );
}
