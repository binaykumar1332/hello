const express = require("express");
const app = express();
const httpProxy = require("http-proxy");
const proxy = httpProxy.createProxy();

app.use((req, res) => {
  const name = req.hostname;
const sub = name.split(".")[0]
  console.log(sub)
return  proxy.web(req, res, {target: `https://the-gangsta.tech`, changeOrigin: true})
  
});

app.listen(3000, () => {
  console.log("Server running on port 4000");
});
