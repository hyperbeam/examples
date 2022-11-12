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
  app.use(express.json());

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/index.html"));
  });

  app.post("/upgrade", async (req, res) => {
    hasPremium = true;
    if (computer) {
      try {
        await updateComputerTimeout(computer, {
          offline: 30,
          inactive: 60,
          absolute: 60 * 60 * 2, // null // set the value to "null" to eliminate the timeout
        });
      } catch (e) {
        console.error("updateComputerTimeout failed:", e);
      }
    }
    res.sendStatus(200);
  });

  app.post("/cancel", async (req, res) => {
    hasPremium = false;
    if (computer) {
      try {
        await updateComputerTimeout(computer, {
          offline: 10,
          inactive: 30,
          absolute: 60,
          reset: false,
        });
      } catch (e) {
        console.error("updateComputerTimeout failed:", e);
      }
    }
    res.sendStatus(200);
  });

  app.get("/computer", async (req, res) => {
    if (computer) {
      res.send(computer);
      return;
    }
    const settings = {
      timeout: {
        offline: 10,
        inactive: 30,
        absolute: 60,
        warning: 15,
        webhook: {
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
    res.send({
      hasPremium,
      computer,
    });
  });

  app.post("/webhook", async (req, res) => {
    const { session_id, type } = req.body;
    const incomingBearer = req.get("Authorization").slice(7); // Slice off "Bearer " prefix
    if (bearer !== incomingBearer) {
      console.log(`Incorrect incoming bearer token, token=${incomingBearer}`);
      res.sendStatus(401);
      return;
    }
    console.log(
      `Hyperbeam computer with session_id=${session_id} timed out, timeout type=${type}`
    );
    computer = undefined;
    res.sendStatus(200);
  });

  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port.toString()}`);
  });
}

async function main() {
  let bearerBytes;
  try {
    bearerBytes = await randomBytes(32);
  } catch (e) {
    console.error(
      "crypto failed to generate 32 random bytes for webhook token:",
      e
    );
    return;
  }
  try {
    const tunnel = await localtunnel({ port });
    const bearer = Buffer.from(bearerBytes).toString("base64");
    console.log(`Receiving webhook messages from ${tunnel.url}`);
    listen(`${tunnel.url}/webhook`, bearer);
  } catch (e) {
    console.error(`localtunnel failed to expose port ${port.toString()}:`, e);
  }
}

main();
