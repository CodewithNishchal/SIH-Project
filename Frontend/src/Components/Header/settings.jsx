import React, { useState } from 'react';
import '../../Styles/settings.css';
import {
    Gear, Bell, MapPin, Shield, Plugs, UserCircle, Palette, Warning, Envelope, ArrowCounterClockwise, FloppyDisk
} from 'phosphor-react';

/**
 * A self-contained settings page component.
 * NOTE: This component requires the CSS from the original HTML file to be loaded globally.
 */
const SettingsPage = () => {
    // State to keep track of the currently active tab
    const [activeTab, setActiveTab] = useState('general');

    const tabs = [
        { id: 'general', label: 'General', icon: <Gear /> },
        { id: 'alerts', label: 'Alerts & Notifications', icon: <Bell /> },
        { id: 'map', label: 'Map & Display', icon: <MapPin /> },
        { id: 'security', label: 'Security', icon: <Shield /> },
        { id: 'integrations', label: 'Integrations', icon: <Plugs /> },
    ];

    return (
        // V V V V V  Wrapper div added here  V V V V V
        <div className="settings-page-wrapper">

            {/* Background Animations */}
            <div className="ocean-background">
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
            </div>

            <div className="settings-container">
                {/* Page Header */}
                <div className="settings-header">
                    <h1 className="settings-title">System Settings</h1>
                    <p className="settings-subtitle">Configure your Samudra Rakshak maritime security platform</p>
                </div>

                {/* Navigation Tabs */}
                <div className="nav-tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.icon}
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* General Settings Section */}
                {activeTab === 'general' && (
                    <div className="settings-section active">
                        <div className="settings-grid">
                            <div className="settings-card">
                                <div className="card-header"><div className="card-icon"><UserCircle /></div><h3 className="card-title">Profile Settings</h3></div>
                                <p className="card-description">Update your personal information and preferences</p>
                                <div className="form-group"><label className="form-label">Display Name</label><input type="text" className="form-input" placeholder="Enter your display name" defaultValue="Analyst Smith" /></div>
                                <div className="form-group"><label className="form-label">Role</label><select className="form-select"><option>Maritime Security Analyst</option><option>Senior Analyst</option></select></div>
                                <div className="form-group"><label className="form-label">Time Zone</label><select className="form-select"><option>UTC +05:30 (India Standard Time)</option></select></div>
                            </div>
                            <div className="settings-card">
                                <div className="card-header"><div className="card-icon"><Palette /></div><h3 className="card-title">Appearance</h3></div>
                                <p className="card-description">Customize the visual appearance of your dashboard</p>
                                <div className="toggle-group"><span className="toggle-label">Dark Mode</span><label className="toggle-switch"><input type="checkbox" className="toggle-input" /><span className="toggle-slider"></span></label></div>
                                <div className="toggle-group"><span className="toggle-label">High Contrast</span><label className="toggle-switch"><input type="checkbox" className="toggle-input" /><span className="toggle-slider"></span></label></div>
                                <div className="form-group"><label className="form-label">Primary Color</label><input type="color" className="color-picker" defaultValue="#3b82f6" /></div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Alerts & Notifications Section */}
                {activeTab === 'alerts' && (
                    <div className="settings-section active">
                         <div className="settings-grid">
                            <div className="settings-card">
                                <div className="card-header"><div className="card-icon"><Warning /></div><h3 className="card-title">Alert Preferences</h3></div>
                                <p className="card-description">Configure how and when you receive security alerts</p>
                                <div className="toggle-group"><span className="toggle-label">Critical Threat Alerts</span><label className="toggle-switch"><input type="checkbox" className="toggle-input" defaultChecked /><span className="toggle-slider"></span></label></div>
                                <div className="toggle-group"><span className="toggle-label">Weather Warnings</span><label className="toggle-switch"><input type="checkbox" className="toggle-input" defaultChecked /><span className="toggle-slider"></span></label></div>
                            </div>
                            <div className="settings-card">
                                <div className="card-header"><div className="card-icon"><Envelope /></div><h3 className="card-title">Notifications</h3></div>
                                <p className="card-description">Manage email and mobile notification settings</p>
                                <div className="form-group"><label className="form-label">Email Address</label><input type="email" className="form-input" defaultValue="analyst@samudra.gov.in" /></div>
                                <div className="toggle-group"><span className="toggle-label">Email Notifications</span><label className="toggle-switch"><input type="checkbox" className="toggle-input" defaultChecked /><span className="toggle-slider"></span></label></div>
                            </div>
                        </div>
                    </div>
                )}
                
                {/* Other sections can be added here following the same pattern */}
                {/* {activeTab === 'map' && ( ... )} */}
                {/* {activeTab === 'security' && ( ... )} */}
                {/* {activeTab === 'integrations' && ( ... )} */}


                {/* Sticky Action Bar */}
                <div className="action-bar">
                    <button className="btn btn-secondary">
                        <ArrowCounterClockwise /> Reset to Defaults
                    </button>
                    <button className="btn btn-primary">
                        <FloppyDisk /> Save Changes
                    </button>
                </div>
            </div>
        </div> // End of wrapper div
    );
};

export default SettingsPage;