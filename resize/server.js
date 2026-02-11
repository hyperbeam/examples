import express from "express";

import { baseConfig, fetchHb, launch, listen } from "../util.js";

const app = express();

app.get("/", (_req, res) => {
  res.sendFile("index.html", { root: import.meta.dirname });
});

const hbConfig = {
  ...baseConfig,
  default_roles: [...baseConfig.default_roles, "resize"],
};

// Get a Hyperbeam virtual computer object. If no object exists, create it.
let hb;
app.get("/hb", async (req, res) => {
  const { dark, width, height } = req.query;
  try {
    if (!hb) {
      hb = await fetchHb({
        ...hbConfig,
        dark: dark === "1",
        width: width ? ~~width : 1280,
        height: height ? ~~height : 720,
        max_area: 1280 * 720,
      });
    }
    res.json(hb);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create Hyperbeam virtual computer" });
  }
});

launch(await listen(app, 8080));
