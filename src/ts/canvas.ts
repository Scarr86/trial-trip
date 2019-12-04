import { fromEvent, interval, merge, of, from } from "rxjs";
import {
  map,
  tap,
  switchMap,
  mergeMap,
  bufferTime,
  concatAll,
  concatMap,
  withLatestFrom,
  buffer,
  startWith,
  scan,
  publishReplay,
  refCount,
  mapTo,
  mergeScan,
  distinctUntilChanged,
  filter
} from "rxjs/operators";

export class Square {
  constructor(private ctx: CanvasRenderingContext2D) {}

  draw(x: number, y: number, z: number) {
    this.ctx.fillRect(z * x, z * y, z, z);
  }
}

export function canvas() {
  let canvas = document.querySelector("canvas");
  let btn = document.querySelector(".play_btn");
  if (!canvas) return;
  let ctx: CanvasRenderingContext2D = canvas.getContext("2d");
  ctx.fillStyle = "red";

  const square = new Square(ctx);

  let squares = fromEvent(btn, "click").pipe(
    mapTo(0),
    scan((q: number[], n) => [...q, 0], [])
  );

  let fps = interval(200).pipe(
    withLatestFrom(squares),
    tap(() => ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)),
    scan(
      (acc: number[], [, q]: [number, number[]]) =>
        q.map((v, i) => (acc[i] === undefined ? v : ++acc[i])),
      []
    ),
    switchMap(q => from(q)),
    filter(q => q < 30),
    distinctUntilChanged()
  );
  fps.subscribe(i => square.draw(i % 30, 0, 20));
}
