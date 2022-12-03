import Hyperbeam from "/hb.js";

async function main() {
  const resp = await fetch("http://localhost:8080/computer");
  const data = await resp.json();
  Hyperbeam(document.getElementById("hbContainer"), data.embed_url);
}

main();
