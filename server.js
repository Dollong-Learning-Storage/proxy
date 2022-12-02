const express = require("express");
const morgan = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      callback(null, true);
    },
  })
);

const HOST = "localhost";
const PORT = process.env.PORT;
const API_SERVICE_URL = process.env.API_URL;

app.use(morgan("dev"));

app.use(
  "/",
  createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    cookieDomainRewrite: HOST,
  })
);

app.listen(PORT, HOST, () => {
  console.log(`Starting Proxy at ${HOST}:${PORT}`);
});
