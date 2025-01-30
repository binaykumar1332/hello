import passport from "passport";
import { Strategy as DiscordStrategy } from "passport-discord";
import User from "./models/User.js";
import Createtoken from "./middle/jwt.js";

passport.use(new DiscordStrategy({
  clientID: "YOUR_DISCORD_CLIENT_ID",
  clientSecret: "YOUR_DISCORD_CLIENT_SECRET",
  callbackURL: "https://yourdomain.com/api/auth/discord/callback",
  scope: ["identify", "email", "guilds"]
}, async function(accessToken, refreshToken, profile, done) {

  const user = await User.findOne({ email: profile.email });

  if (user) {
    const token = await Createtoken(user);
    user.token = token;
    return done(null, user);
  }

  const newUser = await User.create({
    id: profile.id,
    username: profile.username,
    email: profile.email,
  });

  const token = await Createtoken(newUser);
  newUser.token = token;
  
  return done(null, newUser);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;