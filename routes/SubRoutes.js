import express from "express";
const router = express.Router();

router.get("/hello", (req, res) => {
  console.log("sub", req.baseUrl)
  const baseUrl = req.baseUrl;
  console.log(baseUrl)
  const subdomain = baseUrl.split("/")[0]
  
  res.send(`Hello from ${subdomain}!`)
})
export default router