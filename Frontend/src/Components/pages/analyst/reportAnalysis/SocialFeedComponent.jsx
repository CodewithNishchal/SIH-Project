import React from 'react';

const SocialFeedComponent = () => {
    // Dummy data can be managed with state (useState) in a real application
    const platformData = [
        { name: 'Twitter/X', icon: 'fab fa-twitter', color: '#0c4a6e', count: 1247, label: 'Mentions', link: "/users/analyst/social_feeds" },
        { name: 'Meta', icon: 'fab fa-meta', color: '#0ea5e9', count: 892, label: 'Posts', link: "#" },
        { name: 'Reddit', icon: 'fab fa-reddit', color: '#ff4500', count: 334, label: 'Discussions', link: "#" },
        { name: 'News APIs', icon: 'fas fa-newspaper', color: '#38bdf8', count: 56, label: 'Articles', link: "#" },
        { name: 'INCOIS Alerts', icon: 'fas fa-bullhorn', color: '#14b8a6', count: 2, label: 'Alerts', link: "#" }
    ];

    return (
        <div className="widget full-width-widget">
            <div className="widget-header">
                <div className="widget-title">
                    <i className="fas fa-rss widget-icon"></i>
                    Live Social Media Intelligence Feed
                </div>
                <div className="live-tag">LIVE</div>
            </div>

            <div className="feed-content">
                <div className="summary-panel">
                    <h4 className="summary-title">API Intelligence Summary</h4>
                    <ul className="summary-list">
                        <li><b>Twitter/X API:</b> High volume of eyewitness reports and images of a potential oil slick are trending under #MumbaiOilSpill.</li>
                        <li><b>Meta API:</b> Local fishing community groups on Facebook are posting actively, expressing concern over livelihood impact.</li>
                        <li><b>Reddit API:</b> Discussions on r/mumbai and r/india point to vessel 'V-78B' based on public ship-tracking data.</li>
                        <li><b>News APIs:</b> Major outlets have picked up the story, citing coast guard sources confirming response team mobilization.</li>
                        <li><b>INCOIS API:</b> Hazard alert confirms a potential chemical spill and issues a warning for the affected coastal coordinates.</li>
                    </ul>
                </div>
                <div className="sentiment-panel">
                    <h4 className="summary-title">Sentiment Trend</h4>
                    <div className="sentiment-chart">
                        <svg viewBox="0 0 100 100">
                            <circle className="chart-circle chart-track" cx="50" cy="50" r="40"></circle>
                            <circle className="chart-circle chart-segment-critical" cx="50" cy="50" r="40" strokeDasharray="201, 252" strokeDashoffset="0"></circle>
                            <circle className="chart-circle chart-segment-moderate" cx="50" cy="50" r="40" strokeDasharray="38, 252" strokeDashoffset="-201"></circle>
                            <circle className="chart-circle chart-segment-positive" cx="50" cy="50" r="40" strokeDasharray="13, 252" strokeDashoffset="-239"></circle>
                        </svg>
                        <div className="chart-text">
                            <div className="chart-percentage">80%</div>
                            <div className="chart-label">Critical</div>
                        </div>
                    </div>
                    <ul className="sentiment-legend">
                        <li>
                            <div className="legend-color-box" style={{ backgroundColor: 'var(--status-critical)' }}></div>
                            <span className="legend-label">Critical (80%)</span>
                        </li>
                        <li>
                            <div className="legend-color-box" style={{ backgroundColor: 'var(--status-moderate)' }}></div>
                            <span className="legend-label">Moderate (15%)</span>
                        </li>
                        <li>
                            <div className="legend-color-box" style={{ backgroundColor: 'var(--status-positive)' }}></div>
                            <span className="legend-label">Positive (5%)</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="social-platforms">
                {platformData.map((platform) => (
                    <a href={platform.link} className="platform-card" key={platform.name}>
                        <div>
                            <div className="platform-header">
                                <i className={`${platform.icon} platform-icon`} style={{ color: platform.color }}></i>
                                <div className="platform-name">{platform.name}</div>
                            </div>
                        </div>
                        <div>
                            <div className="platform-count">{platform.count.toLocaleString()}</div>
                            <div className="platform-label">{platform.label}</div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default SocialFeedComponent;