import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Your Mapbox access token
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY || 'pk.eyJ1IjoibWFqZXN0aWMxMDAiLCJhIjoiY21mczYyaWV1MGhiZTJpcG9reWZ5NWQ4diJ9.21rREeVNLvNnEqrGoSH-0Q';

export default function MapComponent() {
    const mapRef = useRef(null);    

    useEffect(() => {
        if (!mapRef.current) return;

        const map = new mapboxgl.Map({
            container: mapRef.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [78.9629, 20.5937],
            zoom: 3.8,
        });

        // The 'load' event now uses an async function to allow for fetching data
        map.on('load', async () => {
            try {
                // --- FETCHING DATA FROM BACKEND ---
                // This URL should point to your API endpoint that returns GeoJSON
                const response = await fetch('/api/map/locations');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const geojsonData = await response.json();

                // Add source and layer for the fetched report points
                map.addSource('report-locations', {
                    type: 'geojson',
                    data: geojsonData // Use the fetched data here
                });

                map.addLayer({
                    id: 'report-points-layer',
                    type: 'circle',
                    source: 'report-locations',
                    paint: {
                        'circle-radius': 7,
                        'circle-stroke-width': 2,
                        'circle-stroke-color': '#ffffff',
                        'circle-color': [
                            'match', ['get', 'status'],
                            'Verified', '#22c55e',
                            'Unverified', '#facc15',
                            'Pending', '#ef4444',
                            '#9ca3af'
                        ]
                    }
                });

                // --- POPUP ON HOVER ---
                const popup = new mapboxgl.Popup({
                    closeButton: false,
                    offset: 25
                });

                map.on('mouseenter', 'report-points-layer', (e) => {
                    map.getCanvas().style.cursor = 'pointer';

                    const coordinates = e.features[0].geometry.coordinates.slice();
                    const { title, status, imageUrl } = e.features[0].properties;

                    const popupHtml = `
                        <div style="width: 180px; font-family: sans-serif; overflow: hidden; border-radius: 8px;">
                            <img src="${imageUrl || 'https://placehold.co/200x150/E2E8F0/4A5568?text=No+Image'}" alt="${title}" style="width: 100%; height: 100px; object-fit: cover;">
                            <div style="padding: 8px;">
                                <strong style="font-size: 14px; display: block; margin-bottom: 2px;">${title}</strong>
                                <span style="text-transform: capitalize; font-size: 12px;">Status: ${status}</span>
                            </div>
                        </div>`;
                    
                    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                    }

                    popup.setLngLat(coordinates).setHTML(popupHtml).addTo(map);
                });

                map.on('mouseleave', 'report-points-layer', () => {
                    map.getCanvas().style.cursor = '';
                    popup.remove();
                });

                // --- NAVIGATION ON CLICK ---
                map.on('click', 'report-points-layer', (e) => {
                    window.location.href = '/users/admin/dashboard';
                });

            } catch (error) {
                console.error("Failed to fetch map data:", error);
                // Optionally, display an error message to the user on the UI
            }
        });

        return () => map.remove();
    }, []);

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Report Locations</h3>
            <div className="relative">
                <div 
                    ref={mapRef} 
                    className="rounded-lg"
                    style={{ 
                        width: '100%', 
                        height: '50vh',
                        overflow: 'hidden', 
                        boxShadow: '0px 8px 16px rgba(0,0,0,0.2), 0px -8px 16px rgba(0,0,0,0.1)' 
                    }} 
                />
                <div className="absolute top-4 right-4 bg-white bg-opacity-90 p-3 rounded-lg shadow-md z-10 border border-gray-200">
                    <h4 className="font-semibold mb-2 text-sm text-gray-700">Report Status</h4>
                    <div className="space-y-2">
                        <div className="flex items-center">
                            <span className="h-3 w-3 rounded-full bg-green-500 mr-2 border border-gray-400"></span>
                            <span className="text-xs text-gray-600">Verified</span>
                        </div>
                        <div className="flex items-center">
                            <span className="h-3 w-3 rounded-full bg-yellow-400 mr-2 border border-gray-400"></span>
                            <span className="text-xs text-gray-600">Unverified</span>
                        </div>
                        <div className="flex items-center">
                            <span className="h-3 w-3 rounded-full bg-red-500 mr-2 border border-gray-400"></span>
                            <span className="text-xs text-gray-600">Pending</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

