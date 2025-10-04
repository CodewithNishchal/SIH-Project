import React from 'react';

/**
 * A reusable card for displaying a single Key Performance Indicator.
 * @param {{ title: string, value: string | number, trend?: string, trendColor?: string, icon: React.ReactNode }} props
 */
export default function KpiCard({ title, value, trend, trendColor = 'text-gray-500', icon }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm text-gray-500 uppercase">{title}</p>
                    <p className="text-3xl font-bold text-gray-800">{value}</p>
                </div>
                {icon}
            </div>
            {trend && (
                <p className={`text-xs ${trendColor} mt-2`}>
                    {trend}
                </p>
            )}
        </div>
    );
}
