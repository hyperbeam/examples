import { openAsBlob } from "node:fs";

import express from "express";

import { baseConfig, launch, listen } from "../util.js";

const hbConfig = {
  ...baseConfig,
  extension: {
    field: "ex",
  },
};

const app = express();

let hb;
app.get("/", async (req, res) => {
  try {
    if (!hb) {
      const formData = new FormData();
      const blob = await openAsBlob("./extension.zip", {
        type: "application/zip",
      });
      formData.append("ex", blob);
      formData.append(
        "body",
        JSON.stringify({
          ...hbConfig,
          dark: req.query["dark"] === "1",
        })
      );

      const resp = await fetch("https://engine.hyperbeam.com/v0/vm", {
        method: "POST",
        headers: {
          authorization: process.env.HB_API_KEY,
        },
        body: formData,
      });

      if (!resp.ok) {
        console.error(await resp.text());
        throw new Error(`HTTP error: bad status ${resp.status}`);
      }

      hb = await resp.json();
    }
    res.redirect(302, hb.embed_url);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create Hyperbeam virtual computer" });
  }
});

launch(await listen(app, 8080));
