const path = require("path");
const fs = require("fs");
const FormData = require("form-data");
const express = require("express");
const axios = require("axios");
const app = express();

const zipPath = path.resolve(__dirname, "./extension.zip");
const vmConfig = {
  offline_timeout: 300,
  extension: {
    field: "ex",
  },
};

let computer;
app.get("/", async (req, res) => {
  if (computer) {
    res.redirect(302, computer.embed_url);
    return;
  }

  const formData = new FormData();
  formData.append("ex", fs.createReadStream(zipPath));
  formData.append("body", JSON.stringify(vmConfig));

  const headers = formData.getHeaders();
  headers["Authorization"] = `Bearer ${process.env.HB_API_KEY}`;

  const resp = await axios.post(
    "https://engine.hyperbeam.com/v0/vm",
    formData,
    { headers }
  );
  computer = resp.data;
  res.redirect(302, computer.embed_url);
});

app.listen(8080, () => {
  console.log("Server start at http://localhost:8080");
});
