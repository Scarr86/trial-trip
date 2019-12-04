import { sync } from "glob";
import { async } from "rxjs/internal/scheduler/async";

let API_KEY = "rc6m4m9c";

//==== Meteo neaby ==========
// let VERSION = "v1";
// // let PACKAGE = "history";
//  let PACKAGE = "stations";
// // let METHOD = "daily";
//  let METHOD = "nearby";
//  let lat  = "55.0415000";
// let lon = "82.9346000";
// let limit = "5";
// let PARAMETERS = `lat=${lat}&lon=${lon}&limit=${limit}`;
//=======================

// //====== Meteo station info=====
// let API_KEY = "rc6m4m9c";
// let VERSION = "v1";
// // let PACKAGE = "history";
//  let PACKAGE = "stations";
// // let METHOD = "daily";
//  let METHOD = "meta";
//  let station  = "29634";
// let inventory = "1";
// let PARAMETERS = `station=${station}&inventory=${inventory}`;
// //===============================

//====== Meteo History=====
let VERSION = "v1";
let PACKAGE = "history";
let METHOD = "daily";
let station = "29634"; // | "29638" | "29631" | "29626" | "29632"
let start = "2019-11-01";
let end = "2019-11-31";
let PARAMETERS = `station=${station}&start=${start}&end=${end}`;
//===============================

let URL = `https://api.meteostat.net/${VERSION}/${PACKAGE}/${METHOD}?${PARAMETERS}&key=${API_KEY}`;

export function getMeteoHistory() {
  let btn = document.querySelector(".meteostat-btn");
  let clear = document.querySelector(
    ".clear-meteostat-btn"
  ) as HTMLButtonElement;

  let a = "foo",
    b = 42,
    c = {};
  let obj = { a, b, c };
  btn.addEventListener("click", () => {
    fetch(URL)
      .then(res => res.json())
      .then(stat => preMSG(stat));
  });

  clear.onclick = () => {
    preMSG("");
  };
}

function preMSG(obj: any) {
  let pre = document.querySelector(".meteostat");
  pre.innerHTML = JSON.stringify(obj, null, 2);
}
