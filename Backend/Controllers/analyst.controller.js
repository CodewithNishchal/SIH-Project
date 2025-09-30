// Import the shared database pool
import { pool } from './databaseConfig.js';

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

const formatCoordinatesToString = (lat, lon) => {
    if (lat === null || lon === null) {
        return 'Location not provided';
    }
    const latNum = parseFloat(lat);
    const lonNum = parseFloat(lon);
    const latDirection = latNum >= 0 ? 'N' : 'S';
    const lonDirection = lonNum >= 0 ? 'E' : 'W';
    return `${Math.abs(latNum)}° ${latDirection}, ${Math.abs(lonNum)}° ${lonDirection}`;
};

/**
 * Fetches and joins data from the 'reports' and 'users' tables,
 * then formats it into the new "dashboard" structure.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of formatted report objects.
 */
export async function getFormattedReportsForAnalyst() {
    let client;
    try {
        client = await pool.connect();
        console.log('✅ Successfully connected to the database!');

        // --- CORRECTED SQL QUERY ---
        // The query now uses the correct table names and JOIN logic.
        const query = `
            SELECT
               r.report_id,
               r.text,
               r.lat,
               r.lon,
               r.hazard_type,
               r.severity,
               r.veracity_score, -- Added veracity_score
               u.id AS user_id_numeric,
               u.username
           FROM
               hazard_report AS r
           INNER JOIN
               users AS u ON r.user_id = u.username
           WHERE
               r.status = 'Verified';
        `;

        const result = await client.query(query);
        console.log(`✅ Fetched ${result.rows.length} records for the analyst dashboard.`);

        // --- MODIFIED DATA MAPPING ---
        // Transforms the raw database data into the desired new format.
        const formattedData = result.rows.map(row => {
            // 1. Map severity to a priority level
            let priority = 'normal';
            if (row.severity === 'Critical' || row.severity === 'High') {
                priority = 'critical';
            } else if (row.severity === 'Medium') {
                priority = 'high';
            }

            // 2. Calculate a trust score
            const verifiedCount = parseInt(row.verified_reports_count, 10) || 0;
            const trustScore = Math.min(50 + (verifiedCount * 5), 99);

            // 3. Create a short summary from the main description text
            const summary = row.text ? row.text.substring(0, 70) + (row.text.length > 70 ? '...' : '') : 'No summary provided.';
            
            // 4. NOTE: 'time' is not in your schema. Using a placeholder.
            const reportTime = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

            // --- NEW RETURN OBJECT ---
            return {
                id: row.report_id,
                priority: priority,
                summary: summary,
                location: `${row.lat}, ${row.lon}`,
                time: reportTime,
                trustScore: trustScore,
                description: row.text || 'No description provided.',
                reporter: row.username,
                status: row.status || 'pending'
            };
        });

        return formattedData;

    } catch (err) {
        console.error('❌ Error executing query', err.stack);
        return []; // Return an empty array in case of an error
    } finally {
        if (client) {
            client.release();
            console.log('🔌 Database connection released.');
        }
    }
}

export async function getFormattedReportsForVerificationMap() {
    let client;
    try {
        // Connect to the database
        client = await pool.connect();
        console.log('✅ Successfully connected to the database!');

        // --- CORRECTED SQL QUERY ---
        // The join condition is now corrected to compare the text-based user_id from
        // the report table with the username from the users table.
        const query = `
            SELECT
                r.report_id,
                r.text,
                r.lat,
                r.lon,
                r.hazard_type,
                r.severity,
                r.veracity_score, -- Added veracity_score
                r.image_url, -- Added image_url
                u.id AS user_id_numeric,
                u.username
            FROM
                hazard_report AS r
            INNER JOIN
                users AS u ON r.user_id = u.username
            WHERE
                r.status = 'Verified';
        `;

        const result = await client.query(query);
        console.log(`✅ Fetched ${result.rows.length} records for the map.`);


        // Transform the raw database data into the required format.
        const formattedData = result.rows.map(row => {

            // 1. Calculate a trust score directly from the report's veracity score.
            // This is more accurate than counting a user's previous reports.
            // It converts a score like 0.82 into 82.
            const trustScore = Math.round((row.veracity_score || 0) * 100);

            // 2. Create a short summary from the report text.
            const summary = row.text ? row.text.substring(0, 70) + (row.text.length > 70 ? '...' : '') : 'No summary available.';

            // 3. Use a placeholder for time, as it's not in your schema.
            // For a real timestamp, you should add a `created_at` column.
            const reportTime = new Date().toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });

            // --- UPDATED RETURN OBJECT ---
            // This structure maps the database fields to your front-end needs.
            return {
                id: row.report_id,
                priority: row.severity ? row.severity.toLowerCase() : 'normal', // Use severity directly for priority
                summary: summary,
                location: `${row.lat}, ${row.lon}`, // Example helper function not shown
                time: reportTime,
                trustScore: trustScore,
                description: row.text || 'No description provided.',
                reporter: row.username || 'Anonymous',
                status: row.status || 'pending',
                coordinates: (row.lon && row.lat) ? [parseFloat(row.lon), parseFloat(row.lat)] : [],
                imageUrl: row.image_url || 'https://placehold.co/200x150/E2E8F0/4A5568?text=No+Image' // Added imageUrl
            };
        });

        return formattedData;

    } catch (err) {
        console.error('❌ Error executing query', err.stack);
        return []; // Return an empty array on error
    } finally {
        // Ensure the database client is released.
        if (client) {
            client.release();
            console.log('🔌 Database connection released.');
        }
    }
}


export const getToken = async (userId) => { // Pass a userId to get a specific token
  let client;
  try {
    // Connect to the database
    client = await pool.connect();
    console.log('✅ Successfully connected to the database!');

    // A more specific and safer query
    const query = {
      text: 'SELECT token FROM device_tokens',
    };

    const result = await client.query(query);
    
    // Check if a token was actually found
    if (result.rows.length > 0) {
      const token = result.rows[0].token;
      return token;
    } else {
      // Handle the case where no token is found for the user
      console.warn(`⚠️ No token found for user ${userId}`);
      return null; // Return null explicitly
    }

  } catch (err) {
    // Actually log the error so you know what went wrong
    console.error('❌ Error executing getToken query:', err);
    // You might want to throw the error to be handled by the calling function
    throw err;
  } finally {
    // ALWAYS release the client back to the pool in the finally block
    if (client) {
      client.release();
      console.log('✅ Database client released.');
    }
  }
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