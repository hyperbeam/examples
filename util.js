import http from "node:http";

import open from "open";

const ip = (await (await fetch("https://1.1.1.1/cdn-cgi/trace")).text())
  .split("\n")
  .find((l) => l.startsWith("ip="))
  .split("=")[1];

export const baseConfig = {
  start_url: "about:newtab",
  region: ip,
  timeout: {
    offline: 100,
  },
  default_roles: ["control", "clipboard_copy"],
  adblock: true,
  hide_cursor: true,
};

export function cryptoToken() {
  const randomBytes = crypto.getRandomValues(new Uint8Array(32));
  try {
    return randomBytes.toBase64({ omitPadding: true });
  } catch {
    // old node.js
    return Buffer.from(randomBytes).toString("base64").replaceAll("=", "");
  }
}

export async function fetchHb(hbConfig) {
  const resp = await fetch("https://engine.hyperbeam.com/v0/vm", {
    method: "POST",
    headers: {
      authorization: process.env.HB_API_KEY,
      "content-type": "application/json",
    },
    body: JSON.stringify(hbConfig),
  });

  if (!resp.ok) {
    throw new Error(`HTTP error: bad status ${resp.status}`);
  }

  return resp.json();
}

export async function listen(app, port) {
  return new Promise((resolve, reject) => {
    const server = http.createServer(app);

    const onError = (err) => {
      if (err.code === "EADDRINUSE") {
        console.warn(`Port ${port} in use, retrying with random port...`);
        server.removeListener("error", onError); // Clean up the old listener
        server.listen(0); // Retry with an ephemeral port
      } else {
        reject(err); // Fail for other error types
      }
    };

    server.once("error", onError);

    server.listen(port, () => {
      server.removeListener("error", onError); // Success, remove error handler
      console.log(`Server start at http://localhost:${server.address().port}`);
      resolve(server);
    });
  });
}

export async function launch(server) {
  open(`http://localhost:${server.address().port}`);
}
