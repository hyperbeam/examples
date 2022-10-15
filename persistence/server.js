const path = require("path")
const { Level } = require("level");
const express = require("express");
const axios = require("axios");

const app = express();
const db = new Level("data", { valueEncoding: "json" });

app.use(express.json());

app.get("/sessions", async (req, res) => {
  const sessions = []
  for await (const session of db.values()) {
    sessions.push(session);
  }
  res.json(sessions);
});

app.post("/sites", async (req, res) => {
  const {session_id, sites} = req.body;
  try {
    await db.get(session_id);
  } catch (e) {
    res.sendStatus(400);
    return;
  }
  await db.put(session_id, {
    session_id,
    sites
  });
  res.sendStatus(200);
});

app.post("/computer/stop", async (req, res) => {
  let {session_id} = req.query;
  const headers = {
    Authorization: `Bearer ${process.env.HB_API_KEY}`
  };
  try {
    resp = await axios.delete(`https://engine.hyperbeam.com/v0/vm/${session_id}`, {headers});
  } catch (e) {
    console.error(e)
    res.status(501)
    res.send({ message: e.message })
    return
  }
  res.sendStatus(200)
})

app.get("/computer", async (req, res) => {
  let {session_id} = req.query;
  let load;
  let save = true;
  if (session_id) {
    try {
      await db.get(session_id);
      load = session_id;
      save = session_id;
    } catch (e) {
      res.status(400);
      return;
    }
  };
  const settings = {
    profile: {
      load,
      save
    },
    timeout: {
      offline: 10
    }
  };
  const headers = {
    Authorization: `Bearer ${process.env.HB_API_KEY}`
  };
  let resp
  try {
    resp = await axios.post("https://engine.hyperbeam.com/v0/vm", settings, {headers});
  } catch (e) {
    console.error(e)
    res.status(501)
    res.send({ message: e.message })
    return
  }
  const computer = resp.data;
  session_id = session_id || computer.session_id;
  await db.put(session_id, {
    session_id,
    sites: []
  });
  res.send(computer);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.listen(8081, () => {
  console.log("Server start at http://localhost:8081");
});
