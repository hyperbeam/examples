import express from "express";
import localtunnel from "localtunnel";

import { baseConfig, cryptoToken, fetchHb, launch, listen } from "../util.js";

const bearer = cryptoToken();
const tokens = new Set();

const app = express();
app.use(express.json());

app.get("/", (_req, res) => {
  res.sendFile("index.html", { root: import.meta.dirname });
});

let hb;
app.get("/hb", async (req, res) => {
  const webhookToken = cryptoToken();
  tokens.add(webhookToken);
  try {
    if (!hb) {
      const settings = {
        ...hbConfig,
        dark: req.query["dark"] === "1",
      };
      hb = await fetchHb(settings);
    }
    hb["webhook_token"] = webhookToken;
    res.json(hb);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create Hyperbeam virtual computer" });
  }
});

app.post("/webhook", async (req, res) => {
  const { user_id, userdata } = req.body;
  const incomingBearer = req.get("authorization").slice("Bearer ".length); // Slice off "Bearer " prefix
  if (bearer !== incomingBearer) {
    console.log(`Incorrect incoming bearer token, token=${incomingBearer}`);
    res.status(401).send();
    return;
  }
  console.log(
    `user_id=${user_id} attempting to connect with token ${userdata.token}`
  );
  console.log(
    `UA=${req.get("hb-user-agent")}, client IP=${req.get("hb-connecting-ip")}`
  );
  if (!tokens.has(userdata.token)) {
    console.log(`Unknown userdata token ${userdata.token}`);
    res.status(401).send();
  }
  console.log(`user_id=${user_id} connected`);
  tokens.delete(userdata.token);
  res.send({
    authorized: true,
  });
});

const server = await listen(app, 8080);
const port = server.address().port;
const tunnel = await localtunnel({ port });
console.log(`Receiving webhook requests from ${tunnel.url}`);

const hbConfig = {
  ...baseConfig,
  auth: {
    type: "webhook",
    value: {
      url: `${tunnel.url}/webhook`,
      bearer,
    },
  },
};
