import Hyperbeam from "/hb.js";

async function main() {
  const resp = await fetch(
    `/hb?dark=${+matchMedia("(prefers-color-scheme:dark)").matches}`
  );
  const data = await resp.json();
  const hbContainer = document.getElementById("hbContainer");
  Hyperbeam(hbContainer, data.embed_url);
}

main();
