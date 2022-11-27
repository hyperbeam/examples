const express = require("express");
const axios = require("axios");
const app = express();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

let computer;

// Get a virtual computer object. If no object exists, create it.
app.get("/computer", async (req, res) => {
  if (computer) {
    res.send(computer);
    return;
  }
  const resp = await axios.post(
    "https://engine.hyperbeam.com/v0/vm",
    {
      start_url: "https://youtu.be/0qanF-91aJo",
      timeout: {
        offline: 1,
      },
      ublock: true,
    },
    {
      headers: { Authorization: `Bearer ${process.env.HB_API_KEY}` },
    }
  );
  computer = resp.data;
  res.send(computer);
});

app.listen(8080, () => console.log("Server start at http://localhost:8080"));
