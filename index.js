const express = require("express")
const app = express()

app.use((req, res, next) => {
  const subdomain = req.subdomains[0];
  console.log(subdomain)// Extract subdomain
  req.userSubdomain = subdomain;
  next();
});

app.get("/", (req, res) =>{
  res.send("hello")
})
app.listen(4000)