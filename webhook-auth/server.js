const { promisify } = require("util");
const randomBytes = promisify(require("crypto").randomBytes);
const path = require("path");
const express = require("express");
const axios = require("axios");
const localtunnel = require("localtunnel");

const app = express();
const port = 8080;
let computer;
let hasPremium = false;

function updateComputerTimeout(comp, timeout) {
  const headers = {
    Authorization: `Bearer ${comp.admin_token}`,
  };
  const computerBaseUrl = comp.embed_url.split("?")[0];
  return axios.post(`${computerBaseUrl}/timeout`, timeout, { headers });
}

function listen(webhookUrl, bearer) {
  const tokens = new Set();

  app.use(express.json());

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/index.html"));
  });

  app.get("/computer", async (req, res) => {
    const webhookToken = await randomToken();
    tokens.add(webhookToken);
    if (computer) {
      computer["webhook_token"] = webhookToken;
      res.send(computer);
      return;
    }
    const settings = {
      ublock: true,
      auth: {
        type: "webhook",
        value: {
          url: webhookUrl,
          bearer,
        },
      },
    };
    const headers = {
      Authorization: `Bearer ${process.env.HB_API_KEY}`,
    };
    const resp = await axios.post(
      "https://engine.hyperbeam.com/v0/vm",
      settings,
      { headers }
    );
    computer = resp.data;
    computer["webhook_token"] = webhookToken;
    res.send({
      hasPremium,
      computer,
    });
  });

  app.post("/webhook", async (req, res) => {
    const { user_id, userdata } = req.body;
    const incomingBearer = req.get("Authorization").slice(7); // Slice off "Bearer " prefix
    if (bearer !== incomingBearer) {
      console.log(`Incorrect incoming bearer token, token=${incomingBearer}`);
      res.sendStatus(401);
      return;
    }
    console.log(
      `user_id=${user_id} attempting to connect with token ${userdata.token}`
    );
    console.log(
      `UA=${req.get("User-Agent")}, client IP=${req.get("X-Real-IP")}`
    );
    if (!tokens.has(userdata.token)) {
      console.log(`Unknown userdata token ${userdata.token}`);
      res.sendStatus(401);
    }
    console.log(`user_id=${user_id} connected`);
    tokens.delete(userdata.token);
    res.sendStatus(200);
  });

  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port.toString()}`);
  });
}

async function randomToken() {
  bearerBytes = await randomBytes(32);
  return Buffer.from(bearerBytes).toString("base64");
}

async function main() {
  try {
    const tunnel = await localtunnel({ port });
    console.log(`Receiving webhook messages from ${tunnel.url}`);
    listen(`${tunnel.url}/webhook`, await randomToken());
  } catch (e) {
    console.error(`localtunnel failed to expose port ${port.toString()}:`, e);
  }
}

main();
