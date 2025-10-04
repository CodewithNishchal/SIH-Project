import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/**
 * A sub-component to render a single report item.
 * It now receives all styling and data directly as props.
 */
const ReportFeedItem = ({ report }) => {
    // Destructure properties from the report object provided by your API
    const {
        id,
        name,
        initials,
        location,
        tags = [],
        avatarClasses = 'bg-gray-200 text-gray-800', // Default styles
        buttonClasses
    } = report;


    const getConsistentStyling = (userId) => {
    const colors = [
        { avatar: "bg-blue-100 text-blue-800", button: "bg-blue-500 hover:bg-indigo-700 focus:ring-indigo-500" },
        { avatar: "bg-green-100 text-green-800", button: "bg-green-500 hover:bg-green-700 focus:ring-green-500" },
        { avatar: "bg-purple-100 text-purple-800", button: "bg-purple-500 hover:bg-purple-700 focus:ring-purple-500" },
        { avatar: "bg-orange-100 text-orange-800", button: "bg-orange-500 hover:bg-orange-700 focus:ring-orange-500" },
    ];
    const hash = String(userId).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const index = Math.abs(hash % colors.length);
    return colors[index];
    };


    // The new backend function doesn't provide a timestamp, so we use a static one.
    const timestamp = 'Just now';

    return (
        <li className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                    {/* Use avatarClasses directly from the API */}
                    <span className={`h-10 w-10 rounded-full flex items-center justify-center font-semibold ${avatarClasses}`}>
                        {initials}
                    </span>
                </div>
                <div className="flex-grow">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-semibold text-gray-800">{name}</p>
                            <div className="flex items-center text-sm text-gray-600 mt-1">
                                <svg className="w-4 h-4 mr-1.5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                                {/* Display the pre-formatted location string from the API */}
                                {location}
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 flex-shrink-0">{timestamp}</p>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {/* The tags array from your API already has the text and classes */}
                        {tags.map((tag, index) => (
                            <span key={index} className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${tag.classes}`}>
                                {tag.text}
                            </span>
                        ))}
                    </div>
                    <div className="mt-4 flex justify-end">
                        {/* Use buttonClasses directly from the API */}
                        <Link to={`/users/admin/reports/${name}`} className={`inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${getConsistentStyling(String(report.id)).button}`}>
                            View Report
                            <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" /></svg>
                        </Link>
                    </div>
                </div>
            </div>
        </li>
    );
};

/**
 * The main component to fetch and display the list of reports.
 */
export default function RecentReports() {
    const [reports, setReports] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // You'll need an API endpoint that calls your getFormattedReports function
        fetch('/api/getreports') // Make sure this endpoint exists
            .then(res => {
                if (!res.ok) throw new Error(`Network response was not ok: ${res.statusText}`);
                return res.json();
            })
            .then(data => {
                // Since the data is perfectly formatted, we can set it directly
                setReports(data);
            })
            .catch(error => console.error("Failed to fetch reports:", error))
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">New Citizen Reports - Pending Verification</h3>
                <p className="mt-1 text-sm text-gray-600">Review and verify the following reports submitted by citizens.</p>
            </div>
            
            <div className="max-h-[34rem] overflow-y-auto">
                <ul className="divide-y divide-gray-200">
                    {isLoading ? (
                        <li className="p-6 text-center text-gray-500">Loading reports...</li>
                    ) : reports.length > 0 ? (
                        reports.map(report => (
                            <ReportFeedItem key={report.id} report={report} />
                        ))
                    ) : (
                        <li className="p-6 text-center text-gray-500">No new reports found.</li>
                    )}
                </ul>
            </div>
        </div>
    );
}