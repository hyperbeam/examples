import Hyperbeam from "/hb.js";

const resp = await fetch(
  `http://localhost:3080/hb?dark=${+matchMedia("(prefers-color-scheme:dark)")
    .matches}`
);
const data = await resp.json();
Hyperbeam(document.getElementById("hbContainer"), data.embed_url);
