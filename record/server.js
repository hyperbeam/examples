const path = require("path");
const express = require("express");
const axios = require("axios");
const fs = require("fs/promises");
const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.post("/video", express.raw({type: "video/webm"}), async (req, res) => {
  const filename = `${Date.now().toString()}.webm`
  await fs.writeFile(`data/${filename}`, req.body);
  res.json({ filename })
});

// Get a cloud computer object. If no object exists, create it.
let computer;
app.get("/computer", async (req, res) => {
  if (computer) {
    res.send(computer);
    return;
  }
  const hbConfig = {
    timeout: {
      offline: 100,
    },
    ublock: true,
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

app.listen(8080, () => {
  console.log("Server start at http://localhost:8080");
});
