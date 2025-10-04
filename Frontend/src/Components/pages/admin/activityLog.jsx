import React from 'react';

const statusStyles = {
    Success: 'bg-green-100 text-green-800',
    Pending: 'bg-yellow-100 text-yellow-800',
    Failed: 'bg-red-100 text-red-800',
};

const LogRow = ({ log }) => (
    <tr className="bg-white hover:bg-gray-50">
        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{log.user}</td>
        <td className="px-6 py-4">{log.action}</td>
        <td className="px-6 py-4">
            <span className={`text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full ${statusStyles[log.status] || ''}`}>
                {log.status}
            </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">{log.timestamp}</td>
        <td className="px-6 py-4">
            <a href={log.detailsUrl} className="font-medium text-cyan-600">
                View Log
            </a>
        </td>
    </tr>
);

export default function SystemActivityLog() {
    // Dummy data for example purposes
    const exampleLogs = [
        { id: 1, user: 'jane.doe@example.com', action: 'Generated Report: "Weekly KPIs"', status: 'Pending', timestamp: 'Oct 1, 2025, 1:45 PM', detailsUrl: '#' },
        { id: 2, user: 'Admin User', action: 'Updated settings: "API Keys"', status: 'Success', timestamp: 'Oct 1, 2025, 11:30 AM', detailsUrl: '#' },
        { id: 3, user: 'System', action: 'Data Source Sync: "Salesforce"', status: 'Failed', timestamp: 'Oct 1, 2025, 9:00 AM', detailsUrl: '#' },
    ];
    
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">System Activity Log</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-600">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">User</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3">Timestamp</th>
                            <th scope="col" className="px-6 py-3">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exampleLogs.map(log => <LogRow key={log.id} log={log} />)}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
