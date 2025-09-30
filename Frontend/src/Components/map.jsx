// src/components/MapComponent.jsx
import React, { useRef, useEffect, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

// Import Mapbox GL CSS
import 'mapbox-gl/dist/mapbox-gl.css';

// Set your Mapbox access token
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY ;

// --- Default Incident Data for Preview/Testing ---
const DEFAULT_INCIDENT_COORDS = [79.0322, 21.0565]; // Borkhedi, Maharashtra [lng, lat]
const DEFAULT_ALERT_RADIUS_NM = 50; // Nautical Miles

function MapComponent({
  incidentCoords = DEFAULT_INCIDENT_COORDS, // [lng, lat]
  alertRadiusNm = DEFAULT_ALERT_RADIUS_NM,   // in Nautical Miles
  onMapClick = () => {},                      // Callback for map clicks
  height = '400px',                           // Customizable height
}) {
  const mapContainer = useRef(null); // Ref for the map div
  const map = useRef(null);          // Ref for the Mapbox map instance
  const incidentMarker = useRef(null); // Ref for the incident marker
  const alertCircleSourceId = 'alert-circle-source';
  const alertCircleLayerId = 'alert-circle-layer';

  // State to track if the map has been initialized
  const [mapInitialized, setMapInitialized] = useState(false);

  // --- Utility to convert Nautical Miles to Kilometers ---
  const nmToKm = (nm) => nm * 1.852;

  // --- Function to add or update the alert circle ---
  const updateAlertCircle = useCallback((lng, lat, radiusKm) => {
    if (!map.current || !mapInitialized) return;

    // Create a GeoJSON circle feature (approximated for display)
    const points = 64; // Number of points to approximate the circle
    const kmPerDegreeLat = 111.32; // Kilometers per degree latitude
    const radiusDegreesLat = radiusKm / kmPerDegreeLat;
    const radiusDegreesLng = radiusKm / (kmPerDegreeLat * Math.cos(lat * Math.PI / 180));

    const coordinates = [];
    for (let i = 0; i < points; i++) {
      const angle = (i / points) * (2 * Math.PI);
      const newLat = lat + radiusDegreesLat * Math.sin(angle);
      const newLng = lng + radiusDegreesLng * Math.cos(angle);
      coordinates.push([newLng, newLat]);
    }
    coordinates.push(coordinates[0]); // Close the circle

    const geojson = {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [coordinates],
      },
    };

    if (map.current.getSource(alertCircleSourceId)) {
      map.current.getSource(alertCircleSourceId).setData(geojson);
    } else {
      map.current.addSource(alertCircleSourceId, {
        type: 'geojson',
        data: geojson,
      });

      map.current.addLayer({
        id: alertCircleLayerId,
        type: 'fill',
        source: alertCircleSourceId,
        layout: {},
        paint: {
          'fill-color': '#007cbf', // Blue color for the alert zone
          'fill-opacity': 0.2,
        },
      });
      map.current.addLayer({
        id: alertCircleLayerId + '-border',
        type: 'line',
        source: alertCircleSourceId,
        layout: {},
        paint: {
          'line-color': '#007cbf',
          'line-width': 2,
          'line-opacity': 0.7,
        },
      });
    }
  }, [mapInitialized]);

  // --- Initialize Map on Component Mount ---
  useEffect(() => {
    if (map.current || !mapContainer.current) return; // Initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12', // You can choose other styles
      center: incidentCoords, // Initial center based on prop
      zoom: 9 // Adjusted zoom to see a wider area initially
    });

    map.current.on('load', () => {
      setMapInitialized(true); // Mark map as loaded
      
      // Add a custom marker for the incident location
      const el = document.createElement('div');
      el.className = 'incident-marker'; // Custom class for styling
      el.style.backgroundImage = 'url("https://docs.mapbox.com/mapbox-gl-js/assets/diving.png")'; // Example icon
      el.style.width = '30px';
      el.style.height = '30px';
      el.style.backgroundSize = '100%';

      incidentMarker.current = new mapboxgl.Marker(el)
        .setLngLat(incidentCoords)
        .addTo(map.current);

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      map.current.addControl(new mapboxgl.FullscreenControl(), 'bottom-right');

      // Add click event listener to update incident location
      map.current.on('click', (e) => {
        const { lng, lat } = e.lngLat;
        // Update the marker position
        incidentMarker.current.setLngLat([lng, lat]);
        // Call the parent's onMapClick callback
        onMapClick({ lng, lat });
      });
    });

    // Clean up map on component unmount
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []); // Empty dependency array ensures this runs once

  // --- Update Incident Marker and Alert Circle when props change ---
  useEffect(() => {
    if (!map.current || !mapInitialized) return;

    // Update incident marker position
    if (incidentMarker.current) {
      incidentMarker.current.setLngLat(incidentCoords);
    } else {
       // If marker wasn't initialized yet, try to create it
       const el = document.createElement('div');
       el.className = 'incident-marker';
       el.style.backgroundImage = 'url("https://docs.mapbox.com/mapbox-gl-js/assets/diving.png")';
       el.style.width = '30px';
       el.style.height = '30px';
       el.style.backgroundSize = '100%';
       incidentMarker.current = new mapboxgl.Marker(el)
         .setLngLat(incidentCoords)
         .addTo(map.current);
    }

    // Fly to the new coordinates
    map.current.flyTo({ center: incidentCoords, essential: true, zoom: map.current.getZoom() });

    // Update alert circle
    updateAlertCircle(incidentCoords[0], incidentCoords[1], nmToKm(alertRadiusNm));

  }, [incidentCoords, alertRadiusNm, mapInitialized, updateAlertCircle]);


  return (
    <div className="map-wrapper" style={{ position: 'relative', width: '100%', height: height }}>
      {/* The map container div */}
      <div ref={mapContainer} style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }} />
      <style jsx>{`
        /* Add some basic styling for the incident marker */
        .incident-marker {
          background-image: url('https://docs.mapbox.com/mapbox-gl-js/assets/diving.png'); /* Default icon */
          background-size: cover;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

export default MapComponent;