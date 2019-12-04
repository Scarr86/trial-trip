


// import { Observable, fromEvent, from, Subject, interval, of } from "rxjs";
// import {
//   map,
//   switchMap,
//   takeWhile,
//   tap,
//   mergeMap,
//   concatMap,
//   buffer,
//   bufferTime,
//   take,
//   delay,
//   scan,
//   count,
//   mapTo,
//   combineAll
// } from "rxjs/operators";
import { slider } from "./slider";
import { canvas } from "./canvas";
import { popup } from "./popup";
import { signIn, initClient, isSignedIn, signOut, clientLoad } from "./googleAuth";
import { createTree } from "./createTreeByObj";
import { fromEvent } from "rxjs";
import { getMeteoHistory } from "./meteostat";


//======================
canvas();
//=====================

//======================
slider();
//======================


//==============================================
popup(document.querySelector('.popup_btn'));
//=================================================


//=================================================================================
// let signInBtn = document.querySelector('.signin__btn') as HTMLButtonElement;
// let signOutBtn = document.querySelector('.signout__btn') as HTMLButtonElement;

// initClient(signInBtn, signOutBtn );

// signInBtn.onclick = signIn;

// signOutBtn.onclick = signOut;

//  Google Auth & Drive 
document.getElementById('gapiscript').onload = clientLoad;
//=====================================================================================


// =================================================
let data = {
    Животные: 'тигр',
    Рыбы: {
      форель: {},
      лосось: {}
    },
  
    Деревья: {
      Огромные: {
        секвойя: {},
        дуб: {}
      },
      Цветковые: {
        яблоня: {},
        магнолия: {}
      }
    }
  };

let tree = document.querySelector('.tree');
tree.append(createTree(data));
//=====================================================


//===========================
/*** Get Meteo ********** */
//==========================


getMeteoHistory();


/****************************/







