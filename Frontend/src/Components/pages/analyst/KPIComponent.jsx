import React, { useEffect, useState } from 'react';
import '../../../Styles/analyst.css'; // <-- Import the new stylesheet

/**
 * A single KPI card component.
 */
function KpiCard({ icon, label, initialValue, trendDirection, trendText, type }) {
    const [value, setValue] = useState(initialValue);
    
    // Simulate live data updates
    useEffect(() => {
        const interval = setInterval(() => {
            const change = Math.floor(Math.random() * (initialValue * 0.05)) - (initialValue * 0.025);
            setValue(prev => Math.max(0, Math.floor(prev + change)));
        }, 5000 + Math.random() * 2000);

        return () => clearInterval(interval);
    }, [initialValue]);

    return (
        <div className={`kpi-card ${type} ${type === 'critical' ? 'pulse-critical' : ''}`}>
            <div className={`kpi-icon ${type}`}>
                <i className={icon}></i>
            </div>
            <div className="kpi-value">{value.toLocaleString()}</div>
            <div className="kpi-label">{label}</div>
            <div className={`kpi-trend ${trendDirection}`}>
                <i className={trendDirection === 'up' ? 'ph-trend-up' : 'ph-trend-down'}></i>
                <span>{trendText}</span>
            </div>
        </div>
    );
}

/**
 * Container for all KPI cards.
 */
export default function KpiComponent() {
    return (
        <div className="kpi-stack">
            <KpiCard
                icon="ph-warning-octagon"
                label="Critical Hazards"
                initialValue={8}
                trendDirection="up"
                trendText="12% increase"
                type="critical"
            />
            <KpiCard
                icon="ph-cloud-lightning"
                label="Active Storms"
                initialValue={3}
                trendDirection="up"
                trendText="2 new systems"
                type="warning"
            />
            <KpiCard
                icon="ph-anchor"
                label="Reports Tracked"
                initialValue={847}
                trendDirection="down"
                trendText="5% offshore"
                type="info"
            />
            <KpiCard
                icon="ph-lifebuoy"
                label="Rescue Ops"
                initialValue={12}
                trendDirection="down"
                trendText="3% this week"
                type="success"
            />
        </div>
    );
}