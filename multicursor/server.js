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
  const roles = ["control", "clipboard_copy", "programmatic_navigation", "cursor_data"]
  const computerConfig = {
    hide_cursor: true,
    default_roles: roles
  }
  const resp = await axios.post('http://localhost:8084/v0/vm', computerConfig, {
    headers: { 'Authorization': `Bearer zxY142PgZZmEjUwKr7WcfsqtzF26UtUPG_kaHlhTbNY` }
  });
  computer = resp.data;
  res.send(computer);
});

app.listen(8081, () => {
  console.log('Server start at http://localhost:8081');
});
