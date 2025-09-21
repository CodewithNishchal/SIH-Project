const analystKPIS = {
  "kpis": {
    "criticalReports": {
      "value": 7,
      "trend": "+2 from yesterday",
      "trendDirection": "up"
    },
    "newReports": {
      "value": 23,
      "trend": "+5 last hour",
      "trendDirection": "up"
    },
    "activeAdvisories": {
      "value": 12,
      "trend": "-3 resolved",
      "trendDirection": "down"
    },
    "onlineReporters": {
      "value": 156,
      "trend": "+12 active now",
      "trendDirection": "up"
    }
  },
  "triageQueue": [
    {
      "id": "RPT-2024-0891",
      "priority": "critical",
      "summary": "Suspicious vessel approaching restricted zone near Kandla Port",
      "location": "22.8046° N, 70.2017° E",
      "time": "3:15 PM",
      "trustScore": 92,
      "description": "Large cargo vessel observed moving at unusual speed toward restricted naval area. No transponder signal detected. Multiple witnesses reported unusual activity.",
      "reporter": "Coast Guard Station Alpha",
      "status": "pending",
      "coordinates": [70.2017, 22.8046]
    },
    {
      "id": "RPT-2024-0892",
      "priority": "high",
      "summary": "Oil spill reported 15km off Mumbai coast",
      "location": "19.0760° N, 72.8777° E",
      "time": "2:45 PM",
      "trustScore": 78,
      "description": "Visible oil slick approximately 2km in length spotted by fishing vessel. Environmental impact assessment required.",
      "reporter": "Fishing Vessel Maharashtra-MH-1234",
      "status": "pending",
      "coordinates": [72.8777, 19.0760]
    },
    {
      "id": "RPT-2024-0893",
      "priority": "medium",
      "summary": "Vessel breakdown - requesting assistance",
      "location": "21.1458° N, 72.7717° E",
      "time": "1:30 PM",
      "trustScore": 95,
      "description": "Engine failure reported by merchant vessel carrying 200 passengers. Weather conditions favorable, no immediate danger.",
      "reporter": "MV Sagar Princess",
      "status": "pending",
      "coordinates": [72.7717, 21.1458]
    },
    {
      "id": "RPT-2024-0894",
      "priority": "high",
      "summary": "Unauthorized fishing in protected marine area",
      "location": "20.2961° N, 70.8936° E",
      "time": "12:15 PM",
      "trustScore": 85,
      "description": "Multiple small boats observed using prohibited fishing methods in coral reef protection zone. Immediate intervention required.",
      "reporter": "Marine Patrol Unit 7",
      "status": "pending",
      "coordinates": [70.8936, 20.2961]
    },
    {
      "id": "RPT-2024-0895",
      "priority": "low",
      "summary": "Weather update - Storm system approaching",
      "location": "18.5204° N, 73.8567° E",
      "time": "11:00 AM",
      "trustScore": 88,
      "description": "Cyclonic weather system detected moving northeast. All vessels advised to seek shelter within 6 hours.",
      "reporter": "Meteorological Station West",
      "status": "pending",
      "coordinates": [73.8567, 18.5204]
    }
  ],
  "realTimeAlerts": [
    {
      "title": "Vessel in distress - Arabian Sea",
      "timeAgo": "2 minutes ago",
      "icon": "ph-warning",
      "color": "#dc2626"
    },
    {
      "title": "Unauthorized vessel detected",
      "timeAgo": "8 minutes ago",
      "icon": "ph-anchor",
      "color": "#f59e0b"
    },
    {
      "title": "Weather advisory updated",
      "timeAgo": "12 minutes ago",
      "icon": "ph-info",
      "color": "#3b82f6"
    }
  ],
  "geoJson": {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [70.2017, 22.8046]
        },
        "properties": {
          "title": "Suspicious vessel",
          "reportId": "RPT-2024-0891",
          "color": "#b91c1c"
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [72.8777, 19.0760]
        },
        "properties": {
          "title": "Oil spill reported",
          "reportId": "RPT-2024-0892",
          "color": "#d97706"
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [72.7717, 21.1458]
        },
        "properties": {
          "title": "Vessel breakdown",
          "reportId": "RPT-2024-0893",
          "color": "#2563eb"
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [70.8936, 20.2961]
        },
        "properties": {
          "title": "Unauthorized fishing",
          "reportId": "RPT-2024-0894",
          "color": "#d97706"
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [73.8567, 18.5204]
        },
        "properties": {
          "title": "Weather update",
          "reportId": "RPT-2024-0895",
          "color": "#059669"
        }
      }
    ]
  }
}

export const getKPI = () => {
    return ({
    criticalReports: {
        value: 7,
        trend: "+2 from yesterday",
        trendDirection: "up" // Can be "up" or "down"
    },
    newReports: {
        value: 23,
        trend: "+5 last hour",
        trendDirection: "up"
    },
    activeAdvisories: {
        value: 12,
        trend: "-3 resolved",
        trendDirection: "down"
    },
    onlineReporters: {
        value: 156,
        trend: "+12 active now",
        trendDirection: "up"
    }
    }
    )
}

export const reports = () => {
    return (
        [{
                id: 'RPT-2024-0891',
                priority: 'critical',
                summary: 'Suspicious vessel approaching restricted zone near Kandla Port',
                location: '22.8046° N, 70.2017° E',
                time: '3:15 PM',
                trustScore: 92,
                description: 'Large cargo vessel observed moving at unusual speed toward restricted naval area. No transponder signal detected. Multiple witnesses reported unusual activity.',
                reporter: 'Coast Guard Station Alpha',
                status: 'pending'
            },
            {
                id: 'RPT-2024-0892',
                priority: 'high',
                summary: 'Oil spill reported 15km off Mumbai coast',
                location: '19.0760° N, 72.8777° E',
                time: '2:45 PM',
                trustScore: 78,
                description: 'Visible oil slick approximately 2km in length spotted by fishing vessel. Environmental impact assessment required.',
                reporter: 'Fishing Vessel Maharashtra-MH-1234',
                status: 'pending'
            },
            {
                id: 'RPT-2024-0893',
                priority: 'medium',
                summary: 'Vessel breakdown - requesting assistance',
                location: '21.1458° N, 72.7717° E',
                time: '1:30 PM',
                trustScore: 95,
                description: 'Engine failure reported by merchant vessel carrying 200 passengers. Weather conditions favorable, no immediate danger.',
                reporter: 'MV Sagar Princess',
                status: 'pending'
            },
            {
                id: 'RPT-2024-0894',
                priority: 'high',
                summary: 'Unauthorized fishing in protected marine area',
                location: '20.2961° N, 70.8936° E',
                time: '12:15 PM',
                trustScore: 85,
                description: 'Multiple small boats observed using prohibited fishing methods in coral reef protection zone. Immediate intervention required.',
                reporter: 'Marine Patrol Unit 7',
                status: 'pending'
            },
            {
                id: 'RPT-2024-0895',
                priority: 'low',
                summary: 'Weather update - Storm system approaching',
                location: '18.5204° N, 73.8567° E',
                time: '11:00 AM',
                trustScore: 88,
                description: 'Cyclonic weather system detected moving northeast. All vessels advised to seek shelter within 6 hours.',
                reporter: 'Meteorological Station West',
                status: 'pending'
            }
        ]         
    )
}

// This function can live in your controller or directly in your server.js for the prototype.

/**
 * Fetches and formats the latest reports for the Incident Triage Queue.
 * This simulates a database call.
 */
export function getTriageQueueData() {
    // In a real application, you would fetch this from your database.
    // For example: const reportsFromDB = await Report.find({ status: 'pending' }).sort({ createdAt: -1 }).limit(5);
    const data = [{
            id: "RPT-2024-0891",
            priority: "critical",
            summary: "Suspicious vessel approaching restricted zone near Kandla Port",
            location: "22.8046° N, 70.2017° E",
            time: "3:15 PM",
            trustScore: 92,
            description: "Large cargo vessel observed moving at unusual speed toward restricted naval area. No transponder signal detected.",
            reporter: "Coast Guard Station Alpha",
            status: "pending",
            coordinates: [70.2017, 22.8046]
        },
        {
            id: "RPT-2024-0892",
            priority: "high",
            summary: "Oil spill reported 15km off Mumbai coast",
            location: "19.0760° N, 72.8777° E",
            time: "2:45 PM",
            trustScore: 78,
            description: "Visible oil slick approximately 2km in length spotted by fishing vessel.",
            reporter: "Fishing Vessel Maharashtra-MH-1234",
            status: "pending",
            coordinates: [72.8777, 19.0760]
        },
        {
            id: 'RPT-2024-0893',
            priority: 'medium',
            summary: 'Vessel breakdown - requesting assistance',
            location: '21.1458° N, 72.7717° E',
            time: '1:30 PM',
            trustScore: 95,
            description: 'Engine failure reported by merchant vessel carrying 200 passengers. Weather conditions favorable, no immediate danger.',
            reporter: 'MV Sagar Princess',
            status: 'pending',
            coordinates: [72.7717, 21.1458]
        },
        {
            id: 'RPT-2024-0894',
            priority: 'high',
            summary: 'Unauthorized fishing in protected marine area',
            location: '20.2961° N, 70.8936° E',
            time: '12:15 PM',
            trustScore: 85,
            description: 'Multiple small boats observed using prohibited fishing methods in coral reef protection zone. Immediate intervention required.',
            reporter: 'Marine Patrol Unit 7',
            status: 'pending',
            coordinates: [70.8936, 20.2961]
        },
        {
            id: 'RPT-2024-0895',
            priority: 'low',
            summary: 'Weather update - Storm system approaching',
            location: '18.5204° N, 73.8567° E',
            time: '11:00 AM',
            trustScore: 88,
            description: 'Cyclonic weather system detected moving northeast. All vessels advised to seek shelter within 6 hours.',
            reporter: 'Meteorological Station West',
            status: 'pending',
            coordinates: [73.8567, 18.5204]
        }]
    // Using the same structure as your previous dummy data for consistency.
    return data;
}