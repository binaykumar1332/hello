const express = require("express");
const httpProxy = require("http-proxy");

const app = express();
const proxy = httpProxy.createProxy();

app.use((req, res, next) => {
  const name = req.hostname;
  const sub = name.split(".")[0];

  if (sub === "worldtoday" || sub === "www") {
    return next(); // Let normal routes handle this
  }

  console.log(`Subdomain detected: ${sub}`);
  return proxy.web(req, res, {
    target: `https://worldtoday.me/${sub}`,
    changeOrigin: true,
  });
});

app.get("/:sub", (req, res) => {
  const sub = req.params.sub;
  res.send(`Hello, ${sub}`);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
