import path from 'path';
import express from 'express';
import axios from 'axios';
import cors from 'cors';

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
const app = express()
app.use(cors(corsOptions));

// Get a cloud computer object. If no object exists, create it.
let computer
app.get('/computer', async (req, res) => {
  if (computer) {
    res.send(computer);
    return;
  }
  const resp = await axios.post('http://localhost:8084/v0/vm', {hide_cursor: true}, {
    headers: { 'Authorization': `Bearer zxY142PgZZmEjUwKr7WcfsqtzF26UtUPG_kaHlhTbNY` }
  });
  computer = resp.data;
  res.send(computer);
});

app.listen(8081, () => {
  console.log('Server start at http://localhost:8081');
});
