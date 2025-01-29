const express = require("express");
const app = express();
const httpProxy = require("http-proxy");
const proxy = httpProxy.createProxy();

app.use((req, res) => {
  const name = req.hostname;
const sub = name.split(".")[0]
  console.log(sub)
return  proxy.web(req, res, {target: `https://worldtoday.me/sub`, changeOrigin: true})
});

app.get("/:sub", (req, res)=>{
  const sub = req.params.sub
  res.send(`hello ${sub}`)
})
app.listen(3000, () => {
  console.log("Server running on port 4000");
});
