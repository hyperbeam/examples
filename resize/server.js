const path = require('path');
const express = require('express');
const axios = require('axios');
const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

// Get a cloud computer object. If no object exists, create it.
let computer;
app.get('/computer', async (req, res) => {
  const {width, height} = req.query
  if (computer) {
    res.send(computer);
    return;
  }
  const hbConfig = {
    region: "NA",
    timeout: {
      offline: 10
    },
    quality: {
      mode: "sharp"
    },
    hide_cursor: true
  };
  if (width && height) {
    hbConfig.width = {
      current: ~~width,
      initial: 1280
    };
    hbConfig.height = {
      current: ~~height,
      initial: 720
    };
  }
  const resp = await axios.post('https://engine.hyperbeam.com/v0/vm', hbConfig, {
    headers: { 'Authorization': `Bearer ${process.env.HB_API_KEY}` }
  });
  computer = resp.data;
  res.send(computer);
});

app.listen(8080, () => {
  console.log('Server start at http://localhost:8080');
});
