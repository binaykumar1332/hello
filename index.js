import express from "express";
import httpProxy from "http-proxy";
import ConnectDb from "./middle/dbConnect.js";
import passport from "./passport.js";
import handleSubRoutes from "./routes/SubRoutes.js"; // Fixed typo

const app = express();
const proxy = httpProxy.createProxy();
ConnectDb();
app.set("trust proxy", true); 
// Middleware for subdomain handling
app.use((req, res, next) => {
  const name = req.hostname;
  const sub = name.split(".")[0];

  // Allow main domain routes
  if (sub === "worldtoday" || sub === "www") {
    return next();
  }

  // Prevent infinite loop: If the request is already going to "/sub/", let Express handle it
  if (req.path.startsWith("/sub/")) {
    return next();
  }

  console.log(`Subdomain detected: ${sub}`);
  req.subdomain = sub;  // Pass subdomain to the request object
  return proxy.web(req, res, {
    target: `https://worldtoday.me/sub/${sub}`,
    changeOrigin: true,
  });
});

// Subdomain routes
app.use("/sub/:domain", handleSubRoutes);

// Discord login route (works for both main & subdomains)
app.get("/discord/login", passport.authenticate("discord", {
  scope: ["identify", "email"]
}));

// Discord callback route
app.get("/discord/callback", passport.authenticate("discord", {
  failureRedirect: "https://the-gangsta.tech"
}), (req, res) => {
  res.cookie("token", req.user.token, {
    maxAge: 2 * 60 * 60 * 1000, // 2 hours
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
  });

  res.redirect("https://worldtoday.me");
});

app.listen(3000, () => {  // Fixed typo here
  console.log("Server running on port 3000");
});
