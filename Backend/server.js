import express from "express"
import bodyParser from "body-parser"
import pg from "pg"
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

const app = express()
const port = 3000
const saltRounds = 10
dotenv.config();

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

app.use(passport.initialize());
app.use(passport.session())
app.use(cookieParser())

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
})
db.connect()

app.get("/", (req, res) => {
  res.render("layout.ejs", { currentPage: 'dashboard' });
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

passport.serializeUser((user, cb) => {
  cb(null, user)
})

passport.deserializeUser((user, cb) => {
  cb(null, user)
})

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
