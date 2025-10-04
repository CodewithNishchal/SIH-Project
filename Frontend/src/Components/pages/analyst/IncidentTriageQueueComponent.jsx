import React, { useEffect } from 'react';

/**
 * Displays a scrollable list of incident reports that need analyst attention.
 * @param {object} props - Component props.
 * @param {Array} props.reports - An array of report objects.
 * @param {Function} props.onReportSelect - Callback function when a report is clicked.
 * @param {string} props.selectedReportId - The ID of the currently selected report.
 */
export default function IncidentTriageQueueComponent({ reports, onReportSelect, selectedReportId }) {

    // Fallback data if reports prop is not provided
    const displayReports = reports && reports.length > 0 ? reports : [
        { id: 'HAZ-08-212', priority: 'pending', summary: 'Unidentified vessel spotted approaching restricted zone.', location: '18.92° N, 72.83° E', time: '25 min ago' },
        { id: 'ENV-08-451', priority: 'unverified', summary: 'Large oil slick reported by fishing vessel.', location: '15.49° N, 73.82° E', time: '45 min ago' },
        { id: 'SAR-08-337', priority: 'verified', summary: 'Distress flare sighted approx 10nm off the coast.', location: '13.08° N, 80.27° E', time: '1 hr ago' },
    ];
    
    // --- NEW: useEffect to handle auto-selection ---
    useEffect(() => {
        // This effect runs when the component mounts or when its dependencies change.
        // We check if NO report is currently selected AND if there are reports to display.
        if (!selectedReportId && displayReports.length > 0 && onReportSelect) {
            // If so, we call the parent's selection handler with the first report.
            onReportSelect(displayReports[0]);
        }
    }, [reports, selectedReportId, onReportSelect]); // Dependencies for the effect

    const getPriorityClasses = (priority) => {
        switch (priority) {
            case 'pending': return 'bg-red-100 text-red-700';
            case 'unverified': return 'bg-amber-100 text-amber-700';
            case 'verified': return 'bg-green-100 text-green-700';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 flex flex-col max-h-[310px]">
            <div className="p-4 border-b border-slate-200 bg-slate-50 sticky top-0 z-10 rounded-t-2xl">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-slate-800">Incident Triage Queue</h3>
                    <span className="text-xs text-slate-500 font-medium">
                        {displayReports.filter(r => r.priority === 'pending').length} pending review
                    </span>
                </div>
            </div>
            <div className="overflow-y-auto">
                {displayReports.map(report => (
                    <div
                        key={report.id}
                        onClick={() => onReportSelect(report)}
                        className={`p-4 border-b border-slate-100 cursor-pointer transition-all duration-200 ease-in-out hover:bg-slate-50 ${selectedReportId === report.id ? 'bg-blue-50 border-l-4 border-blue-500' : 'border-l-4 border-transparent'}`}
                    >
                        <div className="flex justify-between items-center mb-2">
                            <div className="font-bold text-slate-700 text-sm">{report.id}</div>
                            <div className={`text-xs font-bold uppercase px-2 py-1 rounded ${getPriorityClasses(report.priority)}`}>
                                {report.priority}
                            </div>
                        </div>
                        <p className="text-slate-600 text-sm mb-2">{report.summary}</p>
                        <div className="flex gap-4 text-xs text-slate-400">
                            {/* Assuming you have phosphor-icons available */}
                            <span className="flex items-center gap-1"><i className="ph-map-pin"></i> {report.location}</span>
                            <span className="flex items-center gap-1"><i className="ph-clock"></i> {report.time}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}