import { useState } from 'react';
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MapComponent from './map.jsx';
import './createAlert.css';


const defaultIncidentData = {
  caseId: '#MCR-2025-0930',
  coordinates: '21.05°N, 79.03°E', // Updated to Borkhedi
  impactTime: '18 Hours to Landfall (Alibaug)',
};

function CreateAlertPage({ incidentData = defaultIncidentData }) {
  // --- STATE MANAGEMENT ---
  // We use useState to track the form's data
  const [radius, setRadius] = useState(50);
  const [alertType, setAlertType] = useState('Oil Spill');
  const [priority, setPriority] = useState('Urgent');
  const [agencies, setAgencies] = useState({
    coastGuard: true,
    environmental: true,
    portAuthority: false,
    fisheries: true,
  });
  const [message, setMessage] = useState(
    `CRITICAL ALERT: Coastal Flooding Risk at ${incidentData.coordinates}...` // Message can be dynamic
  );
  const [socialPost, setSocialPost] = useState(
    `🚨 MARINE ALERT: Urgent oil spill response initiated at ${incidentData.coordinates}. #MarineCrisis #OilSpill`
  );

  // --- EVENT HANDLERS ---
  const handleAgencyChange = (event) => {
    const { name, checked } = event.target;
    setAgencies(prevAgencies => ({ ...prevAgencies, [name]: checked }));
  };

  const handleSendAlert = (event) => {
    event.preventDefault(); // Prevents the form from reloading the page
    const alertData = {
      ...incidentData,
      alertType,
      radius,
      priority,
      agencies,
      message
    };
    console.log('SENDING ALERT:', alertData);
    alert('Alert Sent Successfully!');
    // In a real app, you would send this data to an API
  };

  const handlePostToSocial = (platform) => {
    console.log(`Posting to ${platform}:`, socialPost);
    alert(`Posted to ${platform}!`);
  };

    return (
      <>
        <div className="container mx-auto p-4 md:p-8 max-w-7xl">
      {/* --- Header --- */}
      <header className="mb-8">
        <a href="#" className="text-sm text-cyan-700 hover:text-cyan-500 transition-colors">
          <i className="fas fa-arrow-left mr-2"></i>Back to Report Analysis
        </a>
        <h1 className="text-4xl font-bold text-cyan-900 mt-2">Create New Alert</h1>
        <p className="text-cyan-700">Dispatch critical information to relevant agencies.</p>
      </header>

      {/* --- Main Content Grid --- */}
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* --- Left Column: Form --- */}
        <form className="lg:col-span-1 card" onSubmit={handleSendAlert}>
          <div className="space-y-6">
            
            {/* Case ID and Coords (from props) */}
            <div>
              <label className="form-label">Case ID</label>
              <input type="text" value={incidentData.caseId} disabled className="form-input" />
            </div>
            <div>
              <label htmlFor="coordinates" className="form-label">Incident Coordinates</label>
              <input id="coordinates" type="text" value={incidentData.coordinates} disabled className="form-input" />
            </div>

            {/* Alert Type (Controlled Component) */}
            <div>
              <label htmlFor="alert-type" className="form-label">Alert Type</label>
              <select id="alert-type" className="form-select" value={alertType} onChange={(e) => setAlertType(e.target.value)}>
                <option>Oil Spill</option>
                <option>Vessel Distress</option>
                <option>Security Threat</option>
                <option>Weather Hazard</option>
              </select>
            </div>
            
            {/* Impact Time (from props) */}
            <div>
              <label htmlFor="impact-time" className="form-label">Estimated Impact Time</label>
              <input id="impact-time" type="text" value={incidentData.impactTime} disabled className="form-input" />
            </div>

            {/* Radius Slider (Controlled Component) */}
            <div>
              <label htmlFor="radius" className="form-label">Alert Radius (Nautical Miles)</label>
              <div className="flex items-center gap-4">
                <input id="radius" type="range" min="5" max="100" value={radius} onChange={(e) => setRadius(e.target.value)} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                <span className="font-bold text-cyan-800 bg-cyan-50 py-1 px-3 rounded-md">
                  {radius} NM
                </span>
              </div>
            </div>

            {/* Target Agencies (Controlled Component) */}
            <div>
              <label className="form-label">Target Agencies</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="checkbox-label">
                  <input type="checkbox" className="sr-only" name="coastGuard" checked={agencies.coastGuard} onChange={handleAgencyChange} />
                  <span className="checkbox-icon"><i className="fas fa-check text-xs"></i></span>
                  <span>Indian Coast Guard</span>
                </label>
                {/* ... other checkboxes structured similarly ... */}
              </div>
            </div>

            {/* Message Textarea (Controlled Component) */}
            <div>
              <label htmlFor="message" className="form-label">Message / Instructions</label>
              <textarea id="message" rows="6" className="form-textarea" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end gap-4">
            <button type="button" className="btn btn-secondary">Cancel</button>
            <button type="submit" className="btn btn-critical">
              <i className="fas fa-paper-plane"></i> Send Alert
            </button>
          </div>
        </form>

        {/* --- Right Column: Map and Socials --- */}
        <div className="lg:col-span-1 grid grid-rows-[3fr,2fr] gap-8">
          
          {/* Map Visualization (Component Composition) */}
          <div className="card">
            <h2 className="text-xl font-bold text-cyan-800 mb-4">Alert Visualization</h2>
            <MapComponent />
            <p className="text-sm text-cyan-600 mt-4 text-center">Map shows incident location and selected alert radius.</p>
          </div>
          
          {/* Social Media */}
          <div className="card">
            <h2 className="text-xl font-bold text-cyan-800 mb-4">Post to Social Media</h2>
            <div className="space-y-4">
              <textarea rows="4" className="form-textarea" maxLength="280" value={socialPost} onChange={(e) => setSocialPost(e.target.value)}></textarea>
              <button type="button" className="btn btn-meta w-full" onClick={() => handlePostToSocial('Meta')}>
                <i className="fab fa-facebook-f"></i> Post to Meta
              </button>
              <button type="button" className="btn btn-social w-full" onClick={() => handlePostToSocial('X')}>
                <i className="fab fa-twitter"></i> Post to X (Twitter)
              </button>
            </div>
          </div>
        </div>
      </main>
        </div>
      </>
    )
  
}

export default CreateAlertPage
