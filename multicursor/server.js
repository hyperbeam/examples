const path = require("path");
const express = require("express");
const axios = require("axios");
const app = express();

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
  const roles = [
    "control",
    "clipboard_copy",
    "programmatic_navigation",
    "cursor_data",
  ];
  const hbConfig = {
    hide_cursor: true,
    default_roles: roles,
    timeout: {
      offline: 10,
    },
    quality: {
      mode: "sharp",
    },
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
