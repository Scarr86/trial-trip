import { strict } from "assert";
import { from, pairs, of, empty } from "rxjs";
import { map, switchMap, expand } from "rxjs/operators";

export function createTree(data: any): DocumentFragment {
  let el = document.createDocumentFragment();
  el.append(createTreeDom(data));
  return el;
}

function createTreeDom(data: any) {
  if (!data || !Object.keys(data).length) return;

  let ul = document.createElement("ul");
  if (typeof data === "object") {
    Object.keys(data).forEach(v => {
      let li = document.createElement("li");
      li.textContent = v;
      li.append(createTreeDom(data[v]) || "");
      ul.append(li);
    });
  } else {
    let li = document.createElement("li");
    li.textContent = data;
    ul.append(li);
  }

  return ul;
}
