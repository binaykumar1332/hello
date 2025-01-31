import express from "express";
const router = express.Router();

router.get("/hello", (req, res) => {
  console.log("sub", req.baseUrl)
  const baseUrl = req.baseUrl;
  console.log(baseUrl)
  const subdomain = baseUrl.split("/")[2]
  
  res.send(`Hello from ${subdomain}!`)
})

router.get("/*", (req, res) => {
  console.log("sub", req.baseUrl)
  const baseUrl = req.baseUrl;
  console.log(baseUrl)
  const subdomain = baseUrl.split("/")[2]
  
  res.send("404 NOT FOUND")
})
export default router