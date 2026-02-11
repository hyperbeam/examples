import fs from "node:fs";

import express from "express";

import { baseConfig, fetchHb } from "../util.js";

const hbJs = "./extension/hb.js";
fs.rmSync(hbJs, { force: true });
fs.symlinkSync(
  import.meta
    .resolve("@hyperbeam/web/dist/index.js")
    .substring("file://".length),
  hbJs
);

const app = express();

app.get("/script.js", (_req, res) => {
  res.sendFile("script.js", { root: import.meta.dirname });
});

const hbConfig = baseConfig;

// Get a Hyperbeam virtual computer object. If no object exists, create it.
let hb;
app.get("/hb", async (req, res) => {
  res.header("access-control-allow-origin", "*"); // for chrome extension
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

app.listen(3080, (err) => {
  console.assert(!err, err);
  console.log("Server start at http://localhost:3080");
});
