import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, CirclesThree, Prohibit } from 'phosphor-react';

// --- Sub-Components for a Cleaner Layout ---

const ImageGallery = ({ imageSrc }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Submitted Images</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <img 
                src={imageSrc || 'https://placehold.co/600x400/e2e8f0/475569?text=Image+Not+Found'} 
                alt="Primary evidence from report" 
                className="rounded-lg w-full h-auto object-cover border"
            />
            <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg w-full h-full bg-gray-100 flex items-center justify-center border text-sm text-gray-500">No more images</div>
            </div>
        </div>
    </div>
);

const SubmitterDetailsCard = ({ report }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Submitter Details</h3>
        <div className="flex items-center space-x-3 mb-4">
            <span className={`h-12 w-12 rounded-full flex items-center justify-center font-bold text-xl ${report.avatarClasses}`}>
                {report.initials}
            </span>
            <div>
                <p className="font-semibold text-slate-800">{report.name}</p>
                <p className="text-xs text-gray-500">Member since: Jan 2024</p>
            </div>
        </div>
        <div className="bg-cyan-50 border border-cyan-200 p-4 rounded-lg">
            <p className="text-sm font-medium text-cyan-800">User Veracity Score</p>
            <p className="text-3xl font-bold text-cyan-600">{report.veracityScore}%</p>
            <p className="text-xs text-cyan-700 mt-1">{report.veracityDescription}</p>
        </div>
    </div>
);

const ReportDataCard = ({ report }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Report Data</h3>
        <ul className="space-y-3 text-sm">
            <li className="flex justify-between"><span className="font-medium text-gray-600">Location:</span><span className="text-slate-800 text-right">{report.location}</span></li>
            <li className="flex justify-between items-center"><span className="font-medium text-gray-600">Status:</span><span className="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">Pending Verification</span></li>
            <li className="flex justify-between"><span className="font-medium text-gray-600">Observed At:</span><span className="text-slate-800 text-right">{report.timestamp}</span></li>
        </ul>
    </div>
);


// --- Main Page Component ---

const ReviewReportPage = () => {
    const { id } = useParams(); // Get the report ID from the URL
    const [report, setReport] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReportData = async () => {
            try {
                // Fetch data from your backend endpoint
                const response = await fetch(`/api/reports/${id}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                setReport(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchReportData();
    }, [id]); // Re-fetch if the ID in the URL changes

    if (isLoading) {
        return <div className="flex items-center justify-center h-screen">Loading report...</div>;
    }
    if (error) {
        return <div className="flex items-center justify-center h-screen text-red-600">Failed to load report: {error}</div>;
    }
    if (!report) {
        return <div className="flex items-center justify-center h-screen">Report not found.</div>;
    }

    return (
        <div className="bg-gradient-to-br from-cyan-50 to-blue-100 min-h-screen">
            {/* You would have your main layout here (Sidebar, Navbar) */}
            <main className="p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-6">
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Review Citizen Report</h1>
                        <p className="text-sm text-gray-500 mt-1">Report ID: <span className="font-mono">{report.id}</span></p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column */}
                        <div className="lg:col-span-2 space-y-6">
                            <ImageGallery imageSrc={report.image} />
                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <h3 className="text-lg font-semibold text-slate-800 mb-4">Citizen's Description</h3>
                                <div className="prose prose-sm max-w-none text-gray-700">
                                    <p>{report.text || "No description provided."}</p>
                                </div>
                                <h4 className="text-md font-semibold text-slate-700 mt-6 mb-3">User-Selected Tags</h4>
                                <div className="flex flex-wrap gap-2">
                                    {report.tags.map((tag, index) => (
                                        <span key={index} className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${tag.classes}`}>
                                            {tag.text}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="lg:col-span-1 space-y-6">
                            <SubmitterDetailsCard report={report} />
                            <ReportDataCard report={report} />
                        </div>
                    </div>

                    {/* Admin Actions Section */}
                    <div className="mt-8">
                        <div className="bg-white p-6 rounded-lg shadow-sm max-w-3xl mx-auto">
                            <h3 className="text-xl font-semibold text-slate-800 mb-6 text-center">Admin Actions</h3>
                            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                                <Link to={`/admin/action/verify/${report.id}`} className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-3 text-sm font-medium text-white bg-cyan-600 rounded-md hover:bg-cyan-700">
                                    <CheckCircle size={20} className="mr-2" /> Verify Report
                                </Link>
                                <Link to={`/admin/action/verify-cluster/${report.id}`} className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-3 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                                    <CirclesThree size={20} className="mr-2" /> Verify Cluster
                                </Link>
                                <Link to={`/admin/action/dismiss/${report.id}`} className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                                    <Prohibit size={20} className="mr-2" /> Dismiss Report
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ReviewReportPage;