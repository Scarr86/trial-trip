import { fromEvent } from "rxjs";


export function popup( btn: HTMLButtonElement ){
    fromEvent(btn, 'click').subscribe(()=>{
        let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
        width=0,height=0,left=-1000,top=-1000`;  
        open('/','test', params);
        alert(window.location)
    })
}
