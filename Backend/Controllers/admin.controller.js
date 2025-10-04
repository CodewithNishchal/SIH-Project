// Import the shared database pool
import { pool } from './databaseConfig.js';

// --- THE FIX: The poller's "memory" now lives here permanently ---
let knownReports = new Map();


// In your controllers/adminController.js

// Make sure to import your database connection at the top of the file
// import db from '../db/index.js';

/**
 * Fetches aggregated statistics for the main dashboard.
 * This function runs multiple queries in parallel for maximum efficiency.
*/
export async function getKpiData() {
  try {
    const client = await pool.connect();

    const [
      reportTotal,
      reportToday,
      userTotal,
      userActive,
      sourceTotal,
      alertTotal
    ] = await Promise.all([
      client.query('SELECT COUNT(*) FROM reports'),
      client.query(`SELECT COUNT(*) FROM reports WHERE created_at >= CURRENT_DATE`),
      client.query('SELECT COUNT(*) FROM users'),
      client.query(`SELECT COUNT(*) FROM users WHERE last_active >= NOW() - INTERVAL '1 hour'`),
      client.query('SELECT COUNT(*) FROM sources'),
      client.query(`SELECT COUNT(*) FROM alerts WHERE type = 'report-failure'`)
    ]);

    client.release();

    return {
      reports: {
        total: reportTotal.rows[0].count,
        trend: `+${reportToday.rows[0].count} today`,
        trendColor: "green-500"
      },
      users: {
        total: userTotal.rows[0].count,
        description: `${userActive.rows[0].count} online in the last hour`
      },
      sources: {
        total: sourceTotal.rows[0].count,
        status: "All sources connected",
        statusColor: "green-500"
      },
      alerts: {
        total: alertTotal.rows[0].count,
        description: "Failed report generations",
        descriptionColor: "red-500"
      }
    };
  } catch (error) {
    console.error("Error fetching KPI data:", error);
    throw error;
  }
}

const getConsistentStyling = (userId) => {
    const colors = [
        { avatar: "bg-blue-100 text-blue-800", button: "bg-blue-500 hover:bg-indigo-700 focus:ring-indigo-500" },
        { avatar: "bg-green-100 text-green-800", button: "bg-green-500 hover:bg-green-700 focus:ring-green-500" },
        { avatar: "bg-purple-100 text-purple-800", button: "bg-purple-500 hover:bg-purple-700 focus:ring-purple-500" },
        { avatar: "bg-orange-100 text-orange-800", button: "bg-orange-500 hover:bg-orange-700 focus:ring-orange-500" },
    ];
    const hash = String(userId).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const index = Math.abs(hash % colors.length);
    return colors[index];
};

const getInitials = (name) => {
    if (!name) return '??';
    const nameParts = name.replace(/\./g, '').split(' ').filter(Boolean);
    if (nameParts.length > 1) {
        return nameParts[0][0].toUpperCase() + nameParts[nameParts.length - 1][0].toUpperCase();
    }
    return nameParts[0].substring(0, 2).toUpperCase();
};

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
 * then formats it into a structure similar to your dummy data.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of formatted report objects.
 */
export async function getFormattedReports() {
    let client;
    try {
        // Connect to the database
        client = await pool.connect();
        console.log('✅ Successfully connected to the database!');

        // --- CORRECTED SQL QUERY ---
        const query = `
               SELECT
               r.report_id,
               r.text,
               r.lat,
               r.lon,
               r.hazard_type,
               r.severity,
               r.veracity_score, -- Selects the direct score
               u.id AS user_id_numeric,
               u.username
           FROM
               hazard_report AS r
           INNER JOIN
               users AS u ON r.user_id = u.username
           WHERE
               r.status = 'Unverified' or r.status = 'pending';
        `;

        
        const result = await client.query(query);
        console.log(`✅ Fetched ${result.rows.length} records.`);

        // --- DATA MAPPING (largely the same, but now uses correct data) ---
        const formattedData = result.rows.map(row => {
            // Use the user's unique numeric ID for consistent styling
            const styling = getConsistentStyling(String(row.id));
            
            const location = (row.lat && row.lon) ? `Lat: ${row.lat}, Lon: ${row.lon}` : 'Location not provided';
            
            const tags = [];
            if (row.hazard_type) {
                tags.push({ text: `#${row.hazard_type.replace(/\s+/g, '')}`, classes: "bg-red-100 text-red-800" });
            }
            if (row.severity) {
                tags.push({ text: `#${row.severity}`, classes: "bg-yellow-100 text-yellow-800" });
            }

            return {
                id: row.report_id,
                initials: getInitials(row.username),
                name: row.username,
                location: location,
                avatarClasses: styling.avatar,
                veracityDescription: `Based on ${row.verified_reports_count} previous verified reports.`,
                tags: tags,
                buttonClasses: styling.button
            };
        });

        return formattedData;

    } catch (err) {
        console.error('❌ Error executing query', err.stack);
        return []; // Return an empty array in case of an error
    } finally {
        // Make sure to release the client connection
        if (client) {
            client.release();
            console.log('🔌 Database connection released.');
        }
    }
}


export async function getFormattedMapReports() {
    let client;
    try {
        // Connect to the database
        client = await pool.connect();
        console.log('✅ Successfully connected to the database!');

        // --- CORRECTED SQL QUERY ---
        // The query now also selects the 'image_url' from the report table.
        const query = `
            SELECT
                r.report_id,
                r.text,
                r.lat,
                r.lon,
                r.hazard_type,
                r.severity,
                r.veracity_score,
                r.image_url, 
                u.id AS user_id_numeric,
                u.username
            FROM
                hazard_report AS r
            INNER JOIN
                users AS u ON r.user_id = u.username
            WHERE
                r.status = 'Unverified' or r.status = 'pending';
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
            const reportTime = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

            // --- UPDATED RETURN OBJECT ---
            // This structure maps the database fields to your front-end needs, now including the imageUrl.
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
                imageUrl: row.image_url // Added the image URL to the object
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


// Helper function to determine image MIME type from buffer
function getImageMimeType(buffer) {
    if (!buffer || buffer.length < 4) {
        return 'application/octet-stream'; // Default or unknown
    }

    const firstFourBytes = buffer.toString('hex', 0, 4);

    switch (firstFourBytes) {
        case '89504e47':
            return 'image/png';
        case '47494638':
            return 'image/gif';
        case 'ffd8ffe0':
        case 'ffd8ffe1':
        case 'ffd8ffe2':
        case 'ffd8ffe3':
        case 'ffd8ffe8':
            return 'image/jpeg';
    }
    
    // Check for WebP
    if (buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP') {
        return 'image/webp';
    }

    return 'application/octet-stream'; // Fallback for unknown types
}

export async function getImage(username) {
    let client;
    try {
        // Connect to the database
        client = await pool.connect();
        console.log('✅ Successfully connected to the database!');

        // --- CORRECTED SQL QUERY ---
        // The join condition is now corrected to compare the text-based user_id from
        // the report table with the username from the users table.
        const query ={
        text: `SELECT image_url
            FROM image
            WHERE username = $1;
        `,values: [username],};

        const result = await client.query(query);
        console.log(`✅ Fetched ${result.rows.length} records for the map.`);
        
        return result.rows[0].image_url;

    } catch (err) {
        console.error('❌ Error executing query for user reports:', err.stack);
        return [];
    } finally {
        if (client) {
            client.release();
            console.log('🔌 Database connection released.');
        }
    }
}

export async function getFormattedReportsForVerification(username) {
    // Validate that username is a non-empty string.
    if (!username || typeof username !== 'string' || username.trim() === '') {
        console.error(`Error: Invalid username ('${username}') provided. Must be a non-empty string.`);
        return []; // Return early to prevent database query failure
    }

    let client;
    try {
        client = await pool.connect();
        console.log('✅ Successfully connected to the database!');

        const query = {
            text: `
                SELECT
                    r.report_id, r.text, r.lat, r.lon, r.severity,
                    r.image, -- This is the BYTEA column
                    r.image_url, -- This is the new URL column
                    r.hazard_type, r.status, u.id AS user_id_numeric, u.username,
                    (
                        SELECT COUNT(*)
                        FROM hazard_report
                        WHERE user_id = u.username AND status = 'Verified'
                    ) AS verified_reports_count
                FROM
                    hazard_report AS r
                INNER JOIN
                    users AS u ON r.user_id = u.username
                WHERE 
                    u.username = $1;
            `,
            values: [username],
        };

        const result = await client.query(query);
        console.log(`✅ Fetched ${result.rows.length} records for user ${username}.`);
        console.log(result.rows);

        const formattedData = result.rows.map(row => {
            const styling = getConsistentStyling(row.user_id_numeric);
            const verifiedCount = parseInt(row.verified_reports_count, 10) || 0;
            
            const timestamp = new Date().toLocaleString('en-US', {
                month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit'
            });

            const tags = [];
            if (row.hazard_type) {
                tags.push({ text: `#${row.hazard_type.replace(/\s+/g, '')}`, classes: "bg-blue-100 text-blue-800" });
            }
            if (row.severity) {
                tags.push({ text: `#${row.severity}`, classes: "bg-yellow-100 text-yellow-800" });
            }

            // --- IMAGE HANDLING LOGIC (UPDATED) ---
            let imageSrc = null;

            // 1. PRIORITIZE image_url if it exists and is a non-empty string.
            if (row.image_url && typeof row.image_url === 'string' && row.image_url.trim() !== '') {
                imageSrc = row.image_url;
            
            // 2. FALLBACK to processing the BYTEA buffer for older data.
            } else if (row.image && Buffer.isBuffer(row.image)) {
                const mimeType = getImageMimeType(row.image);

                if (mimeType !== 'application/octet-stream') {
                    const imageBase64 = row.image.toString('base64');
                    imageSrc = `data:${mimeType};base64,${imageBase64}`;
                } else {
                    console.warn(`Could not determine image type for report_id: ${row.report_id}.`);
                }
            }

            return {
                id: row.report_id,
                initials: getInitials(row.username),
                name: row.username,
                location: `${row.lat}, ${row.lon}`,
                timestamp: timestamp,
                avatarClasses: styling.avatar,
                veracityScore: Math.min(50 + (verifiedCount * 5), 99),
                veracityDescription: `Based on ${verifiedCount} previous verified reports.`,
                tags: tags,
                buttonClasses: styling.button,
                image: imageSrc, // This will be the URL or the Base64 Data URI
                image_url: row.image_url || null // Return the raw image_url as well
            };
        });

        return formattedData;

    } catch (err) {
        console.error('❌ Error executing query for user reports:', err.stack);
        return [];
    } finally {
        if (client) {
            client.release();
            console.log('🔌 Database connection released.');
        }
    }
}




/**
 * Verifies all 'Unverified' reports for a specific user.
 * This function updates the database but does not return any data.
 * @param {string} username - The username of the user whose reports should be verified.
 * @returns {Promise<boolean>} A promise that resolves to true if the operation was successful, false otherwise.
 */
export async function verifyUserReports(username) {
    // 1. Validate that the username is a valid, non-empty string.
    if (!username || typeof username !== 'string' || username.trim() === '') {
        console.error(`Invalid username provided for verification: '${username}'`);
        return false; // Indicate that the operation failed.
    }

    let client;
    try {
        // 2. Connect to the database pool.
        client = await pool.connect();
        console.log('✅ Database connection established for verification.');

        // 3. Define the SQL query to update the status.
        // It specifically targets 'Unverified' reports to be more efficient.
        const query = {
            text: `
                UPDATE hazard_report 
                SET status = 'Verified' 
                WHERE user_id = $1 AND status = 'Unverified' or status = 'pending';
            `,
            values: [username], // Use the provided username as the parameter.
        };

        // 4. Execute the update query.
        const result = await client.query(query);

        // 5. Log the result for confirmation. 
        // result.rowCount contains the number of rows that were updated.
        console.log(`✅ Verification complete for user '${username}'. Total reports updated: ${result.rowCount}.`);
        
        return true; // Indicate success.

    } catch (err) {
        // 6. If an error occurs, log it for debugging.
        console.error(`❌ Error executing verification query for user '${username}':`, err.stack);
        return false; // Indicate that the operation failed.
    } finally {
        // 7. ALWAYS release the database connection.
        if (client) {
            client.release();
            console.log('🔌 Database connection released after verification.');
        }
    }
}


export async function dismissReport(username) {
    // 1. Validate that the username is a valid, non-empty string.
    if (!username || typeof username !== 'string' || username.trim() === '') {
        console.error(`Invalid username provided for dismissal: '${username}'`);
        return false; // Indicate failure
    }

    let client;
    try {
        // 2. Connect to the database.
        client = await pool.connect();
        console.log('✅ Database connection established for report dismissal.');

        // 3. Define the SQL query to delete reports by username.
        // The WHERE clause now correctly targets the 'user_id' column.
        const query = {
            text: `
                DELETE FROM hazard_report
                WHERE user_id = $1;
            `,
            values: [username], // Use the provided username as the parameter.
        };

        // 4. Execute the delete query.
        const result = await client.query(query);

        // 5. Log a clear, accurate result.
        console.log(`✅ Dismissal complete for user '${username}'. Total reports deleted: ${result.rowCount}.`);
        
        return true; // Indicate success

    } catch (err) {
        // 6. Log any errors with the correct context.
        console.error(`❌ Error executing dismissal query for user '${username}':`, err.stack);
        return false; // Indicate failure
    } finally {
        // 7. ALWAYS release the database connection.
        if (client) {
            client.release();
            console.log('🔌 Database connection released after dismissal.');
        }
    }
}



// utils/dashboard.js
//ye abhi constant hai ise badme chhedeinge
export function getKpi() {
  return {
    reports: { total: "2,540", trend: "+32 today", trendColor: "green-500" },
    users: { total: "342", description: "Online in the last hour" },
    sources: { total: "14", status: "All sources connected", statusColor: "green-500" },
    alerts: { total: "3", description: "Failed report generations", descriptionColor: "red-500" }
  };
}


// --- 5. Polling Mechanism ---
const POLLING_INTERVAL = 10000;

async function pollForChanges(wss) {
    const broadcast = (data) => {
        wss.clients.forEach(client => {
            if (client.readyState === client.OPEN) {
                client.send(JSON.stringify(data));
            }
        });
    };

    console.log('Polling for new reports...');
    const allReports = await getFormattedReports();
    const newReports = allReports.filter(report => !knownReports.has(report.id));

    if (newReports.length > 0) {
        console.log(`✅ Found ${newReports.length} new report(s)!`);
        newReports.forEach(report => knownReports.set(report.id, report));
        broadcast({ type: 'new-reports', payload: newReports });
    } else {
        console.log('No new reports found.');
    }
}

export async function startPolling(wss) {
    const initialReports = await getFormattedReports();
    initialReports.forEach(report => knownReports.set(report.id, report));
    console.log(`Pre-loaded ${knownReports.size} existing reports.`);
    setInterval(() => pollForChanges(wss), POLLING_INTERVAL);
}

export function getCurrentReports() {
    return Array.from(knownReports.values());
}