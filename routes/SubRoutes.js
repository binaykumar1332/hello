import express from "express";
const router = express.Router();

router.get("/hello", (req, res) => {
  console.log(req.baseUrl)
  const subdomain= req.subdomain;
  res.send(`Hello from ${subdomain}!`)
})
export default router