import { fromEvent } from "rxjs";

export function slider() {
  let prev = document.querySelector(".slider__bnt--prev");
  let next = document.querySelector(".slider__bnt--next");
  let track: HTMLElement = document.querySelector(".slider__track");
  let list: HTMLElement = document.querySelector(".slider__list");

  let pos = 0;
  let cnt = 3;
  let w = 130;
  list.style.width = w * cnt + "px";

  fromEvent(next, "click").subscribe(() => {
    pos += w * cnt;
    pos = Math.min(pos, 0);
    track.style.marginLeft = pos + "px";
  });

  fromEvent(prev, "click").subscribe(() => {
    pos -= w * cnt;
    pos = Math.max(pos, -w * (track.children.length - cnt));
    track.style.marginLeft = pos + "px";
  });
}
