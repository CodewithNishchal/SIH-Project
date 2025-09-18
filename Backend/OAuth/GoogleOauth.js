import passport from "passport"
import GoogleStrategy from "passport-google-oauth2"
import dotenv from "dotenv"

dotenv.config();

passport.use("google", 
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/testing",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
  }, async (accessToken, refreshToken, profile, cb) => {
    try {
      const result = await db.query("select * from sphere where email = $1", [profile.email])

      if (result.rows.length === 0) {
        const newUser = await db.query("insert into users (email, password) values ($1, $2)  returning *", [profile.email, "goooglelele"])
        return cb(null, newUser.rows[0])
      } else {
        return cb(null, result.rows[0])
      }
    } catch (err) {
      return cb(err)
    }
  })
)

export default passport;
