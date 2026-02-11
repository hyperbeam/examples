import express from "express";

import { baseConfig, fetchHb, launch, listen } from "../util.js";

const app = express();
app.use(express.json());

app.get("/", (_req, res) => {
  res.sendFile("index.html", { root: import.meta.dirname });
});

const hbConfig = {
  ...baseConfig,
  start_url: "https://profile.w3schools.com/login",
  field_masking: [
    {
      matches: ["https://profile.w3schools.com/*"],
      selectors: ['input[name="email"]', 'input[name="password"]'],
    },
  ],
};

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

function removeQueryParams(s) {
  return s.split("?")[0];
}

async function toggleFieldMasking(userId, add) {
  const path = add ? "/addRoles" : "/removeRoles";
  const data = [[userId], ["field_masking"]];
  const resp = await fetch(removeQueryParams(hb.embed_url) + path, {
    method: "POST",
    headers: {
      authorization: hb.admin_token,
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!resp.ok) {
    throw new Error(`HTTP error: bad status ${resp.status}`);
  }
}

app.post("/mask", async (req, res) => {
  if (!hb) {
    res.status(400).send();
    return;
  }
  await toggleFieldMasking(req.body.userId, true);
  res.status(200).send();
});

app.delete("/mask", async (req, res) => {
  if (!hb) {
    res.status(400).send();
    return;
  }
  await toggleFieldMasking(req.body.userId, false);
  res.status(200).send();
});

launch(await listen(app, 8080));
