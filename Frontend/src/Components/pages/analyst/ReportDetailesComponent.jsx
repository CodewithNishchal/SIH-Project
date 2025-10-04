import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Displays the detailed view of a single, selected incident report.
 * @param {object} props - Component props.
 * @param {object | null} props.selectedReport - The report object to display, or null.
 */
export default function ReportDetailsComponent({ selectedReport }) {

    if (!selectedReport) {
        return (
            <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 flex-grow flex flex-col justify-center items-center text-center">
                  <i className="ph-file-text text-5xl text-slate-300 mb-4"></i>
                <h3 className="text-lg font-semibold text-slate-700">Select a Report</h3>
                <p className="text-slate-500 text-sm">Choose a report from the triage queue or map to view its details.</p>
            </div>
        );
    }
    
    // Generate pseudo-random analytics data
    const idHash = selectedReport.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const analytics = {
        similarReports: (idHash % 15) + 1,
        alertsTriggered: (idHash % 5),
        vesselsNearby: (idHash % 20) + 5,
        dataSources: (idHash % 4) + 2,
    };

    return (
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 flex-grow overflow-y-auto">
            <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-800 mb-1">Report Details</h2>
                <p className="text-sm text-slate-500">Comprehensive overview of the selected incident.</p>
            </div>
            
            <div className="space-y-4">
                <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase">Report ID</label>
                    <p className="text-slate-800">{selectedReport.id}</p>
                </div>
                <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase">Location</label>
                    <p className="text-slate-800">{selectedReport.location}</p>
                </div>
                 <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase">Description</label>
                    <p className="text-slate-800 text-sm leading-relaxed">{selectedReport.description || 'No description available.'}</p>
                </div>
                <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase">Time Reported</label>
                    <p className="text-slate-800">{selectedReport.time}</p>
                </div>
                
                <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase mb-2 block">Related Analytics</label>
                    <div className="grid grid-cols-2 gap-3 text-center">
                        <div className="bg-blue-50 p-3 rounded-lg"><div className="text-xl font-bold text-blue-800">{analytics.similarReports}</div><div className="text-xs text-blue-600">Similar Reports</div></div>
                        <div className="bg-red-50 p-3 rounded-lg"><div className="text-xl font-bold text-red-800">{analytics.alertsTriggered}</div><div className="text-xs text-red-600">Alerts Triggered</div></div>
                        <div className="bg-amber-50 p-3 rounded-lg"><div className="text-xl font-bold text-amber-800">{analytics.vesselsNearby}</div><div className="text-xs text-amber-600">Vessels Nearby</div></div>
                        <div className="bg-green-50 p-3 rounded-lg"><div className="text-xl font-bold text-green-800">{analytics.dataSources}</div><div className="text-xs text-green-600">Data Sources</div></div>
                    </div>
                </div>

                <div className="pt-4 flex gap-3">
                    <Link 
                        to="/users/create-alert/" 
                        className="flex-1 bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors inline-flex justify-center items-center gap-2 text-center"
                    >
                        <i className="ph-bold ph-bell-ringing"></i>
                        Create Alert
                    </Link>
                    
                    <Link
                        to={`../detailed-report-review`}
                        className="flex-1 btn btn-secondary justify-center">
                        <i className="ph-eye"></i> Investigate
                    </Link>
                </div>
            </div>
        </div>
    );
}