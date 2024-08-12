const path = require("path");
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

// Get a cloud computer object. If no object exists, create it.
let computer;
app.get("/computer", async (req, res) => {
  if (computer) {
    res.send(computer);
    return;
  }
  const hbConfig = {
    region: "NA",
    timeout: {
      offline: 100,
    },
    quality: {
      mode: "sharp",
    },
    hide_cursor: true,
    start_url: "https://profile.w3schools.com/login",
    field_masking: [
      {
        matches: ["https://profile.w3schools.com/*"],
        selectors: [
          "input[name=\"email\"]",
          "input[name=\"password\"]"
        ]
      }
    ]
  };
  const resp = await axios.post(
    "https://engine.hyperbeam.com/v0/vm",
    hbConfig,
    {
      headers: { Authorization: `Bearer ${process.env.HB_API_KEY}` },
    }
  );
  computer = resp.data;
  res.send(computer);
});

function removeQueryParams(s) {
  return s.split("?")[0];
}

function toggleFieldMasking(userId, add) {
  const path = add ? "/addRoles" : "/removeRoles";
  const data = [[userId], ["field_masking"]];
  return axios.post(
    removeQueryParams(computer.embed_url) + path,
    data,
    {
      headers: { Authorization: `Bearer ${computer.admin_token}` }
    }
  );
}

app.post("/mask", async (req, res) => {
  if (!computer) {
    res.sendStatus(400);
    return;
  }
  await toggleFieldMasking(req.body.userId, true);
  res.sendStatus(200);
})

app.delete("/mask", async (req, res) => {
  if (!computer) {
    res.sendStatus(400);
    return;
  }
  await toggleFieldMasking(req.body.userId, false);
  res.sendStatus(200);
})

app.listen(8080, () => {
  console.log("Server start at http://localhost:8080");
});
