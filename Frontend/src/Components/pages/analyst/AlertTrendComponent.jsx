import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

/**
 * Displays a trend chart for alerts related to a selected incident.
 * @param {object} props - Component props.
 * @param {object} props.selectedReport - The report object currently selected.
 */
export default function AlertTrendComponent({ selectedReport }) {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const ctx = chartRef.current.getContext('2d');
        
        // Generate pseudo-random data based on report ID for visual variety
        const idHash = selectedReport ? selectedReport.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : 1;
        const data = Array(7).fill(0).map((_, i) => (idHash * (i + 1)) % 10 + (i * Math.random() * 3));

        chartInstance.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['-6h', '-5h', '-4h', '-3h', '-2h', '-1h', 'Now'],
                datasets: [{
                    label: 'Alerts in Area',
                    data: data,
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { ticks: { font: { size: 10 } }, grid: { display: false } },
                    y: { beginAtZero: true, ticks: { font: { size: 10 } } }
                }
            }
        });
        
        // Cleanup function
        return () => {
            if(chartInstance.current) {
                chartInstance.current.destroy();
            }
        };

    }, [selectedReport]); // Re-render chart when selectedReport changes

    return (
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 h-[220px] flex flex-col">
            <div className="p-4 border-b border-slate-200 bg-slate-50 rounded-t-2xl">
                <h3 className="font-semibold text-slate-800">Alerts Trend</h3>
            </div>
            <div className="p-2 flex-grow">
                <canvas ref={chartRef}></canvas>
            </div>
        </div>
    );
}
