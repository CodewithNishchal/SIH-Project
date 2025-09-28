import express from "express"
import bodyParser from "body-parser"
import axios from "axios";
import pg from "pg"
import { Pool } from 'pg';
import bcrypt from "bcrypt"
import session from "express-session"
import passport from "passport"
import { Strategy } from "passport-local"
import GoogleStrategy from "passport-google-oauth2"
import GitHubStrategy from "passport-github2"
import FacebookStrategy from "passport-facebook"
import dotenv from "dotenv"
import jwt from 'jsonwebtoken';
import cookieParser from "cookie-parser"
import './OAuth/GoogleOauth.js'
import { getKpi, getKpiData, getFormattedReports, getFormattedMapReports, verifyUserReports, dismissReport, getImage } from "./Controllers/admin.controller.js"
import { getKPI, reports, getTriageQueueData, getFormattedReportsForAnalyst, getFormattedReportsForVerificationMap, getToken } from "./Controllers/analyst.controller.js"
// --- 1. Imports and Setup ---
import http, { get } from 'http';
import { WebSocketServer } from 'ws';
// Import the new poller module
import { startPolling, getCurrentReports, getFormattedReportsForVerification } from "./Controllers/admin.controller.js" 
import { title } from "process";

const app = express()
const PORT = 3001
const saltRounds = 10
dotenv.config();

// --- FIX #1: Create the http server FROM your Express app ---
// This ensures one server handles both API routes and WebSockets.
const server = http.createServer(app);
const wss = new WebSocketServer({ server });


app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000,
  }
}))

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session())
app.use(cookieParser())

// const db = new pg.Client({
//   user: process.env.PG_USER,
//   host: process.env.PG_HOST,
//   database: process.env.PG_DATABASE,
//   password: process.env.PG_PASSWORD,
//   port: process.env.PG_PORT,
// })
// db.connect()

//PG complete
const connectionString = process.env.PG_CONNECTION_STRING;

const pool = new Pool({
  connectionString: connectionString,
});

// An example async function to fetch data
async function fetchData() {
  let client;
  try {
    // Get a client from the pool
    client = await pool.connect();
    console.log('✅ Successfully connected to the database!');

    // Execute a query
  } catch (error) {
    console.error('❌ Error executing query:', error.stack);
  } finally {
    // Make sure to release the client back to the pool
    if (client) {
      client.release();
    }
  }
}


//dummy dataset for testing
let reportsData = [
    {
        id: 1,
        initials: "RK",
        name: "R. Kulkarni",
        location: "Marine Drive, Mumbai, Maharashtra",
        timestamp: "Sep 20, 2025 at 7:20 PM",
        avatarClasses: "bg-blue-100 text-blue-800",
        veracityScore: 82,
        veracityDescription: "Based on 14 previous verified reports.",
        tags: [
            { text: "#CoastalFlooding", classes: "bg-blue-100 text-blue-800" },
            { text: "#HighTide", classes: "bg-yellow-100 text-yellow-800" }
        ],
        buttonClasses: "bg-blue-500 hover:bg-indigo-700 focus:ring-indigo-500"
    },
    {
        id: 2,
        initials: "SP",
        name: "S. Patel",
        location: "Alibag Beach, Raigad, Maharashtra",
        timestamp: "Sep 20, 2025 at 6:50 PM",
        avatarClasses: "bg-green-100 text-green-800",
        veracityScore: 95,
        veracityDescription: "Based on 21 previous verified reports.",
        tags: [
            { text: "#OceanDebris", classes: "bg-gray-100 text-gray-800" },
            { text: "#NavigationalHazard", classes: "bg-red-100 text-red-800" }
        ],
        buttonClasses: "bg-blue-500 hover:bg-indigo-700 focus:ring-indigo-500"
    },
    {
        id: 3,
        initials: "AD",
        name: "A. Deshpande",
        location: "Juhu Beach, Mumbai, Maharashtra",
        timestamp: "Sep 20, 2025 at 5:15 PM",
        avatarClasses: "bg-purple-100 text-purple-800",
        veracityScore: 78,
        veracityDescription: "Based on 8 previous verified reports.",
        tags: [
            { text: "#AlgalBloom", classes: "bg-teal-100 text-teal-800" },
            { text: "#UnusualColor", classes: "bg-pink-100 text-pink-800" }
        ],
        buttonClasses: "bg-blue-500 hover:bg-indigo-700 focus:ring-indigo-500"
    },
    {
        id: 4,
        initials: "VJ",
        name: "V. Joshi",
        location: "Ganpatipule, Ratnagiri, Maharashtra",
        timestamp: "Sep 20, 2025 at 3:40 PM",
        avatarClasses: "bg-orange-100 text-orange-800",
        veracityScore: 88,
        veracityDescription: "Based on 17 previous verified reports.",
        tags: [
            { text: "#RipCurrent", classes: "bg-orange-100 text-orange-800" }
        ],
        buttonClasses: "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
    },
    {
        id: 5,
        initials: "AG",
        name: "A. Gaikwad",
        location: "Near Versova, Mumbai, Maharashtra",
        timestamp: "Sep 20, 2025 at 1:05 PM",
        avatarClasses: "bg-gray-100 text-gray-800",
        veracityScore: 71,
        veracityDescription: "Based on 5 previous verified reports.",
        tags: [
            { text: "#NavigationalHazard", classes: "bg-red-100 text-red-800" },
            { text: "#GroundedVessel", classes: "bg-gray-100 text-gray-800" }
        ],
        buttonClasses: "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
    }
];

app.get("/", async (req, res) => {

  const activityLog = [
      {
          id: 'log-001',
          actionType: 'REPORT_GENERATED',
          description: 'generated the "Monthly User Engagement" report.',
          timestamp: '2025-09-20T19:02:00+05:30', // A few minutes ago
          user: {
              name: 'Priya Sharma',
              avatarUrl: 'https://placehold.co/40x40/9333ea/FFFFFF?text=PS'
          }
      },
      {
          id: 'log-002',
          actionType: 'SETTINGS_UPDATED',
          description: 'changed the system timezone to "Asia/Kolkata".',
          timestamp: '2025-09-20T18:45:15+05:30', // About 20 minutes ago
          user: {
              name: 'Admin',
              avatarUrl: 'https://placehold.co/40x40/4f46e5/FFFFFF?text=A'
          }
      },
      {
          id: 'log-003',
          actionType: 'DATASOURCE_CONNECTED',
          description: 'successfully connected to the "Borkhedi Sales DB".',
          timestamp: '2025-09-20T17:59:00+05:30', // About 1 hour ago
          user: {
              name: 'Admin',
              avatarUrl: 'https://placehold.co/40x40/4f46e5/FFFFFF?text=A'
          }
      },
      {
          id: 'log-004',
          actionType: 'USER_LOGIN',
          description: 'logged in from a new device.',
          timestamp: '2025-09-20T16:00:00+05:30', // About 3 hours ago
          user: {
              name: 'jane.doe@example.com',
              avatarUrl: 'https://placehold.co/40x40/f97316/FFFFFF?text=JD'
          }
      },
      {
          id: 'log-005',
          actionType: 'USER_ADDED',
          description: 'added a new user "rohit.patel@example.com".',
          timestamp: '2025-09-19T14:30:00+05:30', // Yesterday
          user: {
              name: 'Admin',
              avatarUrl: 'https://placehold.co/40x40/4f46e5/FFFFFF?text=A'
          }
      }
  ];
  // const object = {
  //   // --- General Settings ---
  //   title: 'StarFills - Sign In',
  //   appName: 'StarFills',
  //   baseUrl: '/auth',
  //   csrfToken: 'aBcDeFgHiJkLmNoPqRsTuVwXyZ123456',

  //   // --- Feature Flags ---
  //   socialLogin: true, // Set to false to hide social login buttons
  //   showRememberMe: true, // Set to false to hide the "Remember me" checkbox
  //   showTerms: true, // For the sign-up form

  //   // --- Dynamic Content & State ---
  //   currentView: 'signin', // This ensures the sign-in form is visible
  //   errorMessage: null, // No error on initial load
  //   successMessage: null, // No success message on initial load
  //   formData: {}, // No pre-filled data

  //   // --- Sign-In Specific Text & URLs ---
  //   welcomeMessage: 'Welcome Back!',
  //   welcomeSubtitle: 'To keep connected with us please login with your personal info.',
  //   signInAction: '/auth/login',
  //   forgotPasswordUrl: '/auth/forgot-password',

  //   // --- Sign-Up Specific Text & URLs (needed for the hidden panel) ---
  //   signupWelcomeMessage: 'Hello, Friend!',
  //   signupSubtitle: 'Enter your personal details and start your journey with us.',
  //   signUpAction: '/auth/register',
  //   termsUrl: '/legal/terms-of-service'
  // }
  res.render("pages/analyst/aggregatedReports.ejs", {reportsData: reportsData, activityLog: activityLog}) 
})

app.get('/users/reports', async (req, res) => {
  const data = await getFormattedReportsForAnalyst();
  console.log(data)
  res.send(data)
})

//admin related queries
app.get("/users/admin/dashboard", async (req, res) => {
  const kpiData = getKpi();
  reportsData = await getFormattedReports();
  console.log(reportsData)
  res.render("pages/admin/adminLayout.ejs", {reportsData: reportsData, kpiData: kpiData});
})

app.get("/users/dismiss/:id", (req, res) => {
  let userId = req.params.id;

  dismissReport(userId);
  
  res.redirect("/users/admin/dashboard");
})

app.get("/users/verify/:id", (req, res) => {
  const mainId = req.params.id;
  
  verifyUserReports(mainId);

  res.redirect("/users/admin/dashboard");
})

app.get("/users/reports/:id", async (req, res) => {
  // Get the specific ID from the URL (e.g., "RPT-7201")
  let { id } = req.params;
  
  const specific_data = await getFormattedReportsForVerification(id);
  const value = specific_data[0];
  
  console.log(value);
  
 let getImageUrl = null;
  getImageUrl = await getImage(id);
  const fallbackImage = 'https://placehold.co/600x400/a5b4fc/4338ca?text=No+Image';
  let primaryImageSrc = fallbackImage;
  let secondaryImageSrc = fallbackImage;


  if (getImageUrl) {
    primaryImageSrc = getImageUrl;;
  }  

  if (value)
    res.render("reports.ejs", { report: value, primaryImageSrc: primaryImageSrc, secondaryImageSrc: secondaryImageSrc });
  else
    res.send("Report not found");
})



//analyst related
app.get("/users/analyst/dashboard", (req, res) => {
  const dashboard = getKPI();
  res.render("pages/analyst/analystLayout.ejs", {kpiData: dashboard});
})

const mapboxApiKey = process.env.MAPBOX_API_KEY;
app.get("/users/analyst/analytics-dashboard", (req, res) => {
  res.render("pages/analyst/analytics-dashboard.ejs", { mapboxApiKey: mapboxApiKey});
})


app.get("/register", (req, res) => {
  res.render("Register.ejs", {userTaken: false})
})

app.get("/login", (req, res) => {
  res.render("Login.ejs")
})

app.get(
  "/auth/google",
  passport.authenticate("google", { // here we previously had local 
    scope: ["profile", "email"],
  })
)

app.get('/users/getKey', (req, res) => {

  const mapboxApiKey = process.env.MAPBOX_API_KEY;
  res.json({ token: mapboxApiKey });
  });


app.get('/users/analyst/generateAlert', (req, res) => {
  res.render("pages/analyst/createAlert.ejs");
});

app.get('/users/analyst/R&A', (req, res) => {
  res.render("pages/analyst/aggregatedReportSummary.ejs");
})

app.get('/users/analyst/allAlerts', async (req, res) => {
  
  res.render("pages/analyst/allAlerts.ejs");
})

app.get('/users/analyst/social_feeds', async (req, res) => {
  
  res.render("pages/analyst/socialFeeds.ejs");
})





// Change app.get to app.post
app.get('/users/analyst/create-alert', async (req, res) => {
  
  // Get alert details from the request body sent by the client
  const title = 'cyclone alert';
  const body = 'there is a cyclone approaching';
  const severity = 'high';
  const lat = 19.1190;
  const lon = 72.8479;

  // Construct the payload dynamically
  const tokenValue = 'dkqnMKafQrWDL95tRihagG:APA91bEdxvlRPDJRQKqtgw6sBwaQxs_dZEvvMGQXUk60hQ-P58soR7ulcjLfFV7dYQ9RFTCxWn9GcPkc6yJemp9XtNSucFxkk0dPVR24ETG4-rikW_8njxc'; // Assuming getToken() is defined elsewhere
  console.log(tokenValue);
  const payload = JSON.stringify({
    token: tokenValue,
    title: title,       // Use data from req.body
    body: body,         // Use data from req.body
    severity: severity, // Use data from req.body
    lat: lat,           // Use data from req.body
    lon: lon            // Use data from req.body
  });


  try {
    const response = await axios.post(
      'https://paronymic-noncontumaciously-clarence.ngrok-free.dev/notifications/send-to-token',
      payload,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    res.redirect("/users/analyst/dashboard");
    // res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    // It's helpful to log the full error for better debugging
    console.error('Error posting to FastAPI:', error);
    res.redirect("/users/analyst/dashboard");
    // res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(3000, () => {
  console.log('🚀 Express server running on port 3000');

});



app.get("/auth/google/testing", passport.authenticate("google", {
  successRedirect: "/",
  failureRedirect: "/login",
}))

app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err)
      return next(err)
    res.clearCookie("token") //remove JWT Token
    req.session.destroy(() => {
      res.redirect("/login");
    })
  })
})

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
      if (err) {
          return next(err); // Handle server errors
      }
      if (!user) {
          return res.redirect("/login"); // Redirect on failure
      }
      
      req.logIn(user, (err) => {
          if (err) {
              return next(err);
          }
        console.log(req.user);
        const token = jwt.sign({ id: req.user.id }, process.env.SESSION_SECRET)
        res.cookie("token", token)
        return res.redirect("/"); // Redirect on success
      });
  })(req, res, next);
})

passport.use(new Strategy(async function verify(username, password, cb) {
  try {
    const result = await db.query("select * from sphere where email = $1", [username])
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const pass = user.password

      bcrypt.compare(password, pass, (err, result) => {
        if (err) {
          return cb(err)
        } else {
          if (result) {
            return cb(null, user)
          } else {
            return cb(null, false)
          }
        }
      })
    } else 
        return cb("User not found")
  } catch (err) {
    return cb(err)
  }
}))

app.post("/register", async (req, res) => {
  const email = req.body.username
  const password = req.body.password

  const resultCheck = await db.query("select * from sphere where email = $1", [email])

  try {
    if (resultCheck.rows.length > 0) {
      return res.render("Register.ejs", {userTaken: true})
      // return res.status(409).json({ message: "Username already taken" }); // 409 Conflict
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error Hashing pass: ",err)
        } else {
          console.log("Hashed Password: ", hash)
          const result = await db.query("insert into sphere (email, password) values($1, $2) returning *"
            , [email, hash]
          )
          const user = result.rows[0]
          req.login(user, (err) => {
            console.log(err)
            console.log(user);
            const token = jwt.sign({ id: user.id }, process.env.SESSION_SECRET)
            res.cookie("token", token)
            res.redirect("/")
          })
        }
      })
    }
  } catch (err) {
    console.log(err)
  }
})

// API endpoint to get report locations as GeoJSON
app.get('/api/reports/locations', async (req, res) => {
    try {
        // 1. Fetch your reports from the database. 
        //    Ensure they have location data (e.g., latitude, longitude).
        //    This is a simulation of a database call.
      

      const reportsFromDB = await getFormattedMapReports()  
      console.log(reportsFromDB);
      

        // 2. Convert your data into GeoJSON format. This is required by Mapbox.
        const geoJsonFeatures = reportsFromDB
            .filter(report => report.location) // Filter out reports with no location
          .map(report => {
            console.log(report)
                return {
                  type: 'Feature',
                  
                    geometry: {
                        type: 'Point',
                        // IMPORTANT: GeoJSON format is [longitude, latitude]
                        coordinates: report.coordinates
                    },
                    properties: {
                        // This data will be available for popups
                        id: report.reporter,
                        title: report.summary,
                        color: "#2ecc71",
                    }
                };
            });

        // 3. Send the final GeoJSON object to the client
        res.json({
            type: 'FeatureCollection',
            features: geoJsonFeatures
        });

    } catch (error) {
        console.error('Failed to get report locations:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/reports', async (req, res) => {
  try {
        // 1. Fetch your reports from the database. 
        //    Ensure they have location data (e.g., latitude, longitude).
        //    This is a simulation of a database call.
      

      const reportsFromDB = await getFormattedReportsForVerificationMap()  
      

        // 2. Convert your data into GeoJSON format. This is required by Mapbox.
        const geoJsonFeatures = reportsFromDB
            .filter(report => report.location) // Filter out reports with no location
          .map(report => {
            console.log(report)
                return {
                  type: 'Feature',
                  
                    geometry: {
                        type: 'Point',
                        // IMPORTANT: GeoJSON format is [longitude, latitude]
                        coordinates: report.coordinates
                    },
                    properties: {
                        // This data will be available for popups
                        id: report.reporter,
                        title: report.summary,
                        color: "#2ecc71",
                    }
                };
            });

        // 3. Send the final GeoJSON object to the client
        res.json({
            type: 'FeatureCollection',
            features: geoJsonFeatures
        });

    } catch (error) {
        console.error('Failed to get report locations:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

wss.on('connection', async (ws) => {
    console.log('🚀 Client connected');

    // When a new client connects, get the current list of reports from the poller
    const allReports = getCurrentReports();
    ws.send(JSON.stringify({ type: 'initial-load', payload: allReports }));
    console.log(`Sent initial load of ${allReports.length} reports to new client.`);

    ws.on('close', () => {
        console.log('🔌 Client disconnected');
    });
});


passport.serializeUser((user, cb) => {
  cb(null, user)
})

passport.deserializeUser((user, cb) => {
  cb(null, user)
})

// app.listen(port, () => {
  //   console.log(`Server running on port: ${port}`);
  // });
  

// --- 3. Start the Server and Polling ---
  server.listen(PORT, () => {
      console.log(`🚀 WebSocket server is running on ws://localhost:${PORT}`);
      
      // Start the polling mechanism and pass it the WebSocket server instance
      // so it can broadcast updates.
      startPolling(wss);
  });
