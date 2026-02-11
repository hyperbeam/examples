import express from "express";

import { baseConfig, fetchHb, launch, listen } from "../util.js";

const app = express();

app.get("/", (_req, res) => {
  res.header(
    "content-security-policy",
    // The minimum csp policy needed for the functioning of Hyperbeam virtual computer
    "default-src 'self'; img-src 'self' blob: data:; script-src 'self' blob:; connect-src 'self' https://*.hyperbeam.com wss://*.hyperbeam.com"
  );
  res.sendFile("index.html", { root: import.meta.dirname });
});

app.get("/script.js", (_req, res) => {
  res.sendFile("script.js", { root: import.meta.dirname });
});

app.get("/style.css", (_req, res) => {
  res.sendFile("style.css", { root: import.meta.dirname });
});

app.get("/hb.js", (_req, res) => {
  res.sendFile(
    import.meta
      .resolve("@hyperbeam/web/dist/index.js")
      .substring("file://".length)
  );
});

const hbConfig = baseConfig;

// Get a Hyperbeam virtual computer object. If no object exists, create it.
let hb;
app.get("/hb", async (req, res) => {
  try {
    if (!hb) {
      hb = await fetchHb({
        ...hbConfig,
        dark: req.query["dark"] === "1",
      });
    }
    res.json(hb);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create Hyperbeam virtual computer" });
  }
});

launch(await listen(app, 8080));
