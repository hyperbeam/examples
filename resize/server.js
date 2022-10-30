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
  if (computer) {
    res.send(computer);
    return;
  }
  const resp = await axios.post('https://enginetest.hyperbeam.com/v0/vm', {region: "EU", timeout: {offline: 10}}, {
    headers: { 'Authorization': `Bearer ${process.env.HB_API_KEY}` }
  });
  computer = resp.data;
  res.send(computer);
});

app.listen(8081, () => {
  console.log('Server start at http://localhost:8081');
});
