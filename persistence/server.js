import { Level } from "level";
import express from "express";

import { baseConfig, fetchHb, launch, listen } from "../util.js";

const db = new Level("data", { valueEncoding: "json" });

const app = express();
app.use(express.json());

app.get("/sessions", async (req, res) => {
  const sessions = [];
  for await (const session of db.values()) {
    sessions.push(session);
  }
  res.json(sessions);
});

app.post("/sites", async (req, res) => {
  const { session_id, sites } = req.body;
  try {
    await db.get(session_id);
  } catch (e) {
    res.status(400).send();
    return;
  }
  await db.put(session_id, {
    session_id,
    sites,
  });
  res.status(200).send();
});

app.post("/hb/stop", async (req, res) => {
  let { session_id } = req.query;
  const headers = {
    authorization: process.env.HB_API_KEY,
  };
  try {
    const resp = await fetch(
      `https://engine.hyperbeam.com/v0/vm/${session_id}`,
      {
        method: "DELETE",
        headers,
      }
    );

    if (!resp.ok) {
      throw new Error(`HTTP error: bad status ${resp.status}`);
    }
  } catch (e) {
    console.error(e);
    res.status(501);
    res.send({ message: e.message });
    return;
  }
  res.status(200).send();
});

const hbConfig = {
  ...baseConfig,
  default_roles: [...baseConfig.default_roles, "chrome_apis"],
};

app.get("/hb", async (req, res) => {
  let { dark, session_id } = req.query;
  let profile = true;
  if (session_id) {
    try {
      await db.get(session_id);
      profile = session_id;
    } catch (e) {
      res.status(400);
      return;
    }
  }
  let hb;
  try {
    hb = await fetchHb({
      ...hbConfig,
      dark: dark === "1",
      profile,
    });
  } catch (e) {
    console.error(e);
    res.status(501);
    res.send({ message: e.message });
    return;
  }
  session_id = session_id ?? hb.session_id;
  await db.put(session_id, {
    session_id,
    sites: [],
  });
  res.send(hb);
});

app.get("", (_req, res) => {
  res.sendFile("index.html", { root: import.meta.dirname });
});

launch(await listen(app, 8080));
