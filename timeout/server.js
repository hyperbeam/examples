import express from "express";
import localtunnel from "localtunnel";

import { baseConfig, cryptoToken, fetchHb, launch, listen } from "../util.js";

let hb;
let hasPremium = false;

function updatehbTimeout(hb, timeout) {
  return fetch(`${hbBaseUrl}/timeout`, data, {
    method: "POST",
    headers: {
      authorization: hb.admin_token,
      "content-type": "application/json",
    },
    body: JSON.stringify(timeout),
  });
}

const bearer = cryptoToken();

const app = express();
app.use(express.json());

app.get("/", (_req, res) => {
  res.sendFile("index.html", { root: import.meta.dirname });
});

app.post("/upgrade", async (_req, res) => {
  hasPremium = true;
  if (hb) {
    try {
      await updatehbTimeout(hb, {
        offline: 30, // 30 seconds
        inactive: 60, // 60 seconds
        absolute: 60 * 60 * 2, // null // set the value to "null" to eliminate the timeout
      });
    } catch (e) {
      console.error("updatehbTimeout failed:", e);
    }
  }
  console.log("Upgraded to premium");
  res.status(200).send();
});

app.post("/cancel", async (_req, res) => {
  hasPremium = false;
  if (hb) {
    try {
      await updatehbTimeout(hb, {
        offline: 10, // 10 seconds
        inactive: 30, // 30 seconds
        absolute: 60, // 60 seconds
        reset: false,
      });
    } catch (e) {
      console.error("updatehbTimeout failed:", e);
    }
  }
  console.log("Cancelled premium");
  res.status(200).send();
});

app.get("/hb", async (req, res) => {
  try {
    if (!hb) {
      hb = await fetchHb({
        ...hbConfig,
        dark: req.query["dark"] === "1",
      });
    }
    res.json({ hasPremium, hb });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create Hyperbeam virtual computer" });
  }
});

app.post("/webhook", async (req, res) => {
  const { session_id, type } = req.body;
  const incomingBearer = req.get("Authorization").slice(7); // Slice off "Bearer " prefix
  if (bearer !== incomingBearer) {
    console.log(`Incorrect incoming bearer token, token=${incomingBearer}`);
    res.status(401).send();
    return;
  }
  console.log(
    `Hyperbeam hb with session_id=${session_id} timed out, timeout type=${type}`
  );
  hb = undefined;
  res.status(200).send();
});

const server = await listen(app, 8080);
const port = server.address().port;
const tunnel = await localtunnel({ port });
console.log(`Receiving webhook requests from ${tunnel.url}`);
launch(server);

const hbConfig = {
  ...baseConfig,
  // Timeout values are in seconds
  // In this example, we pick low values so you can quickly see the timeouts in action
  timeout: {
    offline: 10, // 10 seconds
    inactive: 30, // 30 seconds
    absolute: 60, // 60 seconds
    warning: 15, // 15 seconds
    webhook: {
      url: `${tunnel.url}/webhook`,
      bearer,
    },
  },
};
