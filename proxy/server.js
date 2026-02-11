import express from "express";

import { baseConfig, fetchHb, launch, listen } from "../util.js";

const app = express();

const proxyHost = "<ip/hostname:port>";
const username = "<username>";
const password = "<password>";
const hbConfig = {
  ...baseConfig,
  http_proxy: {
    start_url: "https://whatismyipaddress.com/",
    pac: `function FindProxyForURL(url, host) {return 'PROXY ${proxyHost}'}`,
    username,
    password,
  },
};

let hb;
app.get("/", async (req, res) => {
  try {
    if (!hb) {
      hb = await fetchHb({
        ...hbConfig,
        dark: req.query["dark"] === "1",
      });
    }
    res.redirect(302, hb.embed_url);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create Hyperbeam virtual computer" });
  }
});

launch(await listen(app, 8080));
