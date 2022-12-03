import Hyperbeam from "/hb.js";

async function main() {
  const resp = await fetch("/computer");
  const data = await resp.json();
  Hyperbeam(document.getElementById("hbContainer"), data.embed_url);
}

main();
