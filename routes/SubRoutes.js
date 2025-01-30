import express from "express";
const router = express.Router();

router.get("/hello", (req, res) => {
  console.log("sub", req.baseUrl)
  const baseUrl = req.baseUrl;
  const subdomain = baseUrl.split("/")[1]
  
  res.send(`Hello from ${subdomain}!`)
})
export default router