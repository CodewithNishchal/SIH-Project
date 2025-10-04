import React, { useState, useEffect } from 'react';
import '../../../Styles/analyst.css'; // <-- Import the new stylesheet
// Import your new header component
import AnalystHeader from './DashboardHeader';
// Import your other pre-built components
import IntelligenceFeedComponent from './IntelligenceFeedComponent';
import KpiComponent from './KPIComponent';
import MapComponent from './MapComponent';
import IncidentTriageQueueComponent from './IncidentTriageQueueComponent';
import AlertTrendComponent from './AlertTrendComponent';
import ReportDetailsComponent from './ReportDetailesComponent';

/**
 * The main layout for the Analyst Dashboard.
 * It arranges all the specialized components into a responsive grid.
 */
export default function AnalystLayout() {
    const [reports, setReports] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);

    useEffect(() => {
        const fetchReports = async () => {
            console.log("Fetching report data...");
        };
        fetchReports();
    }, []);

    const handleReportSelect = (report) => {
        setSelectedReport(report);
    };

    // Callback function to pass to the header for the toggle button
    const handleToggleSidebar = () => {
        // Here you would add the logic to show/hide your sidebar
        console.log("Sidebar toggle button clicked!");
    };

    return (
        // This main div acts as the `.dashboard` container from your EJS file.
        <div className="p-4 flex flex-col gap-4">
            
            {/* Render the new Header component at the top */}
            <AnalystHeader onToggleSidebar={handleToggleSidebar} />

            {/* Top Section: Intelligence Feed and KPIs */}
            <section className="grid grid-cols-1 lg:grid-cols-[1.7fr_1fr] gap-4">
                <IntelligenceFeedComponent />
                <KpiComponent />
            </section>

            {/* Main Content Section: Map, Triage, Alerts, and Details */}
            <section className="grid grid-cols-1 lg:grid-cols-[1.7fr_1fr] gap-4">
                
                {/* Left Panel: Map and Triage Queue */}
                <div className="flex flex-col gap-4">
                    <MapComponent 
                        reports={reports} 
                        selectedReport={selectedReport} 
                        onReportSelect={handleReportSelect} 
                    />
                    <IncidentTriageQueueComponent 
                        reports={reports} 
                        onReportSelect={handleReportSelect} 
                        selectedReportId={selectedReport?.id}
                    />
                </div>

                {/* Right Panel: Alert Trends and Report Details */}
                <div className="flex flex-col gap-4">
                    <AlertTrendComponent selectedReport={selectedReport} />
                    <ReportDetailsComponent selectedReport={selectedReport} />
                </div>

            </section>
        </div>
    );
}