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


// utils/dashboard.js
export function getKpi() {
  return {
    reports: { total: "2,540", trend: "+32 today", trendColor: "green-500" },
    users: { total: "342", description: "Online in the last hour" },
    sources: { total: "14", status: "All sources connected", statusColor: "green-500" },
    alerts: { total: "3", description: "Failed report generations", descriptionColor: "red-500" }
  };
}