import React from 'react';
import '../../../../Styles/detailedReportAnalysis.css'; // Import the CSS for this layout
// Import the components you'll create
import SocialFeedComponent from './SocialFeedComponent';
import IncidentMap from './IncidentMap';
import AiAnalysis from './AiAnalysis';
import SatelliteImagesComponent from './SatelliteImagesComponent';
import WeatherConditions from './WeatherConditions';

// NOTE: The EJS includes for sidebar and navbar would be handled here.
// For example, by importing and rendering actual React components:
// import AnalystSidebar from './AnalystSidebar';
// import Navbar from './partials/Navbar';

const DetailedDashboardLayout = () => {
    // In a real app, you would have state and functions to handle the sidebar toggle
    // For now, the button is just rendered.
    return (
        // The outer divs for sidebar and main content would likely live in a higher-level layout component
        <div id="main-content" className="relative min-h-screen  transition-all duration-300 ease-in-out">
            {/* <Navbar /> */}
            <main>
                <header className="header_detailed">
                    <div className="header-content">
                        <div className="header-left">
                            <button id="sidebar-toggle" className="text-cyan-800 hover:text-cyan-500 lg:hidden">
                                <i className="fas fa-bars text-xl"></i>
                            </button>
                            <div className="report-info">
                                <div className="info-chip stat-badge">
                                    <i className="fas fa-exclamation-triangle"></i>
                                    <span>CRITICAL</span>
                                </div>
                                <div className="info-chip">
                                    <i className="fas fa-hashtag"></i>
                                    <span>#MCR-2025-0927</span>
                                </div>
                                <div className="info-chip">
                                    <i className="fas fa-map-marker-alt"></i>
                                    <span>Arabian Sea, 18.9°N, 72.8°E</span>
                                </div>
                                <div className="info-chip">
                                    <i className="fas fa-clock"></i>
                                    <span>14:32 IST</span>
                                </div>
                            </div>
                        </div>
                        <div className="header-actions">
                            {/* In a React app, you would use Link from react-router-dom instead of <a> for internal navigation */}
                            <a href="/users/analyst/dismissReport" className="btn dismiss-btn">
                                <i className="fas fa-check-circle"></i> Dismiss
                            </a>
                            <a href="/users/analyst/generateAlert" className="btn alert-btn">
                                <i className="fas fa-bell"></i> Create Alert
                            </a>
                        </div>
                    </div>
                </header>

                <div className="container">
                    <div className="dashboard-grid">
                        
                        {/* Social Feed takes the full width */}
                        <SocialFeedComponent />

                        {/* Map and AI Analysis side-by-side */}
                        <IncidentMap />
                        <AiAnalysis />

                        {/* Last row container for Satellite and Weather */}
                        <div className="last-row-container">
                            <SatelliteImagesComponent />
                            <WeatherConditions />
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
};

export default DetailedDashboardLayout;