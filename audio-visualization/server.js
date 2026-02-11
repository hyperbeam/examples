import express from "express";

import { baseConfig, fetchHb, launch, listen } from "../util.js";

const app = express();

app.get("/", (_req, res) => {
  res.sendFile("index.html", { root: import.meta.dirname });
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
