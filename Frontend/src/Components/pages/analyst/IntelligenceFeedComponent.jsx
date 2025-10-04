import React from 'react';

/**
 * Renders the real-time intelligence feed with a timeline design.
 * It displays updates from various sources in a scrollable list.
 */
export default function IntelligenceFeedComponent() {
    // In a real app, this data would come from props or a state management solution.
    const feedItems = [
        {
            source: 'Indian Navy',
            time: '5m ago',
            content: 'Advisory issued for all vessels in the Arabian Sea. Exercise caution due to adverse weather conditions expected in the next 48 hours.',
            tags: ['Weather', 'Advisory'],
            icon: 'ph-x-logo', // Phosphor icon class
            color: 'bg-black'
        },
        {
            source: 'Coast Guard',
            time: '22m ago',
            content: 'Successful anti-smuggling operation conducted off the coast of Gujarat. Contraband seized. All coastal stations on high alert.',
            tags: ['Security', 'Alert'],
            icon: 'ph-facebook-logo',
            color: 'bg-[#1877F2]' // Facebook blue
        },
        {
            source: 'DG Shipping',
            time: '1h ago',
            content: 'Notice to mariners: Piracy threat level increased for the Gulf of Aden. Recommended to follow BMP5 guidelines strictly.',
            tags: ['Security', 'Advisory'],
            icon: 'ph-radio-tower',
            color: 'bg-amber-500'
        },
        {
            source: 'IMD',
            time: '2h ago',
            content: 'Cyclone Watch: A low-pressure area has formed over the Bay of Bengal and is likely to intensify. Fishermen are advised not to venture into the sea.',
            tags: ['Weather', 'Alert'],
            icon: 'ph-cloud-lightning',
            color: 'bg-blue-500'
        }
    ];

    const getTagClasses = (tag) => {
        switch (tag.toLowerCase()) {
            case 'weather': return 'bg-cyan-100 text-cyan-700';
            case 'advisory': return 'bg-blue-100 text-blue-700';
            case 'security': return 'bg-red-100 text-red-800';
            case 'alert': return 'bg-amber-100 text-amber-800';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    return (
        <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-200 flex flex-col h-[44vh]">
            <div className="flex items-center gap-3 text-slate-800 mb-4 flex-shrink-0">
                <i className="ph-broadcast text-xl text-blue-500"></i>
                <h2 className="font-semibold text-lg">Real-time Intelligence Feed</h2>
            </div>
            
            {/* Custom scrollbar is handled by AnalystDashboard.css */}
            <div className="overflow-y-auto flex-grow pr-2 feed-list">
                <div className="relative">
                    {/* The vertical timeline line */}
                    <div className="absolute left-[17px] top-0 h-full w-0.5 bg-slate-200"></div>

                    {feedItems.map((item, index) => (
                        <div key={index} className="relative flex items-start gap-4 mb-4 pl-12 group">
                            {/* Timeline Icon */}
                            <div className={`absolute left-0 top-0 z-10 flex items-center justify-center w-9 h-9 rounded-full text-white text-lg ${item.color} border-4 border-white group-hover:scale-110 transition-transform duration-200`}>
                                <i className={item.icon}></i>
                            </div>

                            {/* Content */}
                            <div className="bg-white border border-slate-200 rounded-xl p-4 flex-1 group-hover:border-blue-500 transition-colors duration-200 transform group-hover:-translate-y-1 shadow-sm">
                                <div className="flex items-center mb-1">
                                    <span className="font-semibold text-slate-800 text-sm">{item.source}</span>
                                    <span className="text-slate-400 text-xs ml-3">{item.time}</span>
                                </div>
                                <p className="text-slate-600 text-sm leading-relaxed mb-3">{item.content}</p>
                                <div className="flex flex-wrap gap-2">
                                    {item.tags.map(tag => (
                                        <span key={tag} className={`text-xs font-semibold px-2 py-1 rounded-full ${getTagClasses(tag)}`}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
