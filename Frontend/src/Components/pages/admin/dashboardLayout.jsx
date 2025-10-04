import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../Header/sidebar';
import Navbar from '../../Header/navbar';

/**
 * The main layout for the dashboard.
 * It includes the Sidebar, Navbar, and a content area for pages.
 * It also manages the state for the mobile sidebar visibility.
 */
export default function DashboardLayout() {
    // State to control the sidebar's visibility on mobile
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="bg-blue-100">
            <div className="flex min-h-screen">
                <Sidebar isOpen={isSidebarOpen} />

                {/* Overlay for mobile, appears when sidebar is open */}
                {isSidebarOpen && (
                    <div
                        id="sidebar-overlay"
                        onClick={toggleSidebar}
                        className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
                    ></div>
                )}

                {/* Main content area */}
                <div className="flex-1 flex flex-col lg:ml-64"> {/* Adjust margin-left to match sidebar width */}
                    <Navbar onMenuClick={toggleSidebar} />
                    
                    {/* The Outlet component from react-router-dom renders the current route's page */}
                
                        <Outlet />
                    
                </div>
            </div>
        </div>
    );
}
