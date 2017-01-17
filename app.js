'use strict';

//--------------------------------global variables-------------------------------

var imgs = [['bag', 'img/bag.jpg'],
['banana', 'img/banana.jpg'],
['bathroom', 'img/bathroom.jpg'],
['boots', 'img/boots.jpg'],
['breakfast', 'img/breakfast.jpg'],
['bubblegum', 'img/bubblegum.jpg'],
['chair', 'img/chair.jpg'],
['cthulhu', 'img/cthulhu.jpg'],
['dog-duck', 'img/dog-duck.jpg'],
['dragon', 'img/dragon.jpg'],
['pen', 'img/pen.jpg'],
['pet-sweep', 'img/pet-sweep.jpg'],
['scissors', 'img/scissors.jpg'],
['shark', 'img/shark.jpg'],
['sweep', 'img/sweep.png'],
['tauntaun', 'img/tauntaun.jpg'],
['unicorn', 'img/unicorn.jpg'],
['usb', 'img/usb.gif'],
['water-can', 'img/water-can.jpg'],
['wine-glass', 'img/wine-glass.jpg']];

var dupChk = [];
// var shownCountSum = 0; NOT NECESSARY (yet) FOR SCOPE OF THIS PROJECT
//
// function shownSumr() {
//
//   if (shownCountSum === 20) {
//     shownCountSum = 0;
//   } else {
//     shownCountSum = 0;
//     for (var i = 0; i < imgs.length; i++){
//       shownCountSum += imgs[i].shownCount;
//     }
//   }
// }

//--------------------constructor & prototypes------------------------------------

function ImgObj(name, filePath) { //add html id?
  this.name = name;
  this.filePath = filePath;
  this.shownCount = 0;
  this.clickCount = 0; //number vs array? which should I use...
  //html id??
}

// ImgObj.prototype.imgShown = function() {  Won't counters be incremented by img render functions and event listener/handlers?
//
// }

//--------------------------functions-------------------------------------------

function initImgs() {//instantializes img objects in array: imgs
  for (var i = 0; i < imgs.length; i++) {
    imgs[i] = new ImgObj(imgs[i][0], imgs[i][1]);
  }
}

function randImgNum() { //returns a random number between 0 and 19 to function caller
  var rand = Math.round(Math.random() * 19);
  return rand;
}

function imgDupChk() {//checks img for duplicate in current set or previous set
  while (dupChk.length < 6) {
    var rand = randImgNum();
    if (dupChk.includes(imgs[rand])) {
    } else {
      dupChk.push(imgs[rand]);
    }
  }
}

// function imgRender(imgs[?]) { NOT WORRYING ABOUT RENDERING IMGS YET
//   var viewPort = document.getElementById('image-viewport');
//   for ()
//   var imgEl = document.createElement('img');
//   imgEl.setAttribute('src', imgs[?].filePath)
//
// }

//-----------------calls----------------------------------------------
initImgs();
