const express = require("express");
const axios = require("axios");
const app = express();

const pacIP = "<ip>"
const pacUsername = "<username>"
const pacPassword = "<password>"
const vmConfig = {
  offline_timeout: 300,
  http_proxy: {
    "pac": `function FindProxyForURL(url, host) {return {'PROXY ${pacIP}'}`,
    "username": pacUsername,
    "password": pacPassword
  },
}

let computer;
app.get("/", async (req, res) => {
  if (computer) {
    res.redirect(302, computer.embed_url);
    return;
  }

  const headers = {
    Authorization: `Bearer ${process.env.HB_API_KEY}`
  };
  const resp = await axios.post(
    "https://engine.hyperbeam.com/v0/vm",
    vmConfig,
    { headers }
  );
  computer = resp.data;
  res.redirect(302, computer.embed_url);
});

app.listen(8080, () => {
  console.log("Server start at http://localhost:8080");
});
