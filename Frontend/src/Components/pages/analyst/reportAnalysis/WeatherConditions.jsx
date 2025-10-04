import React from 'react';

const WeatherConditions = () => {
    // Dummy weather data
    const weatherMetrics = [
        { value: "28°C", label: "Sea Temp" },
        { value: "2.1m", label: "Wave Height" },
        { value: "15 kn", label: "Wind Speed" },
        { value: "SW", label: "Direction" },
        { value: "8km", label: "Visibility" },
        { value: "1012mb", label: "Pressure" }
    ];

    return (
        <div className="widget weather-widget">
            <div className="widget-header">
                <div className="widget-title">
                    <i className="fas fa-cloud-sun widget-icon"></i>
                    Marine Weather Conditions
                </div>
            </div>
            <div className="weather-info">
                {weatherMetrics.map((metric, index) => (
                    <div className="weather-metric" key={index}>
                        <span className="weather-value">{metric.value}</span>
                        <div className="weather-label">{metric.label}</div>
                    </div>
                ))}
            </div>
            <div className="info-banner" style={{ background: 'rgba(16, 185, 129, 0.1)', borderLeftColor: 'var(--status-positive)' }}>
                <i className="fas fa-water info-banner-icon" style={{ color: 'var(--status-positive)' }}></i>
                <div className="info-banner-text">
                    Moderate sea conditions. Wind may affect spill dispersion.
                </div>
            </div>
        </div>
    );
};

export default WeatherConditions;