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
var imgIndex = [];
var roundCount = 0;

var leftViewPort = document.getElementById('left-viewport');
var centerViewPort = document.getElementById('center-viewport');
var rightViewPort = document.getElementById('right-viewport');
var rsltViewPort = document.getElementById('result-viewport');

var ctx = document.getElementById('study-results');

var imgNames = [];
var imgPaths = [];
var imgClicks = [];
var imgViews = [];
var imgData = [];

var chartOpts = {
  responsive: false,
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }]
  }
};

var chartData = {
  labels: imgNames,
  datasets: [{
    label: 'Product received:' + imgClicks + ' clicks/ ' + imgViews + 'views. Desirability',
    data: imgData,
    backgroundColor: 'gray'
  }]
};

//--------------------constructor & prototypes------------------------------------

function ImgObj(name, filePath) {
  this.name = name;
  this.filePath = filePath;
  this.shownCount = 0;
  this.clickCount = 0; //number vs array? which should I use...
  //html id??
}

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
      imgIndex.push(rand);
    }
  }
  imgRender();
}

function imgRender() {//renders 3 images from dupChk Array to viewport

  var leftImg = imgs[imgIndex[0]];
  var centerImg = imgs[imgIndex[1]];
  var rightImg = imgs[imgIndex[2]];

  leftImg.shownCount += 1;
  var lImgEl = document.createElement('img');
  lImgEl.setAttribute('src', leftImg.filePath);
  lImgEl.setAttribute('id', leftImg.name);
  leftViewPort.appendChild(lImgEl);

  centerImg.shownCount += 1;
  var cImgEl = document.createElement('img');
  cImgEl.setAttribute('src', centerImg.filePath);
  cImgEl.setAttribute('id', centerImg.name);
  centerViewPort.appendChild(cImgEl);

  rightImg.shownCount += 1;
  var rImgEl = document.createElement('img');
  rImgEl.setAttribute('src', rightImg.filePath);
  rImgEl.setAttribute('id', rightImg.name);
  rightViewPort.appendChild(rImgEl);
}

function resultsGen(){
  for (var i = 0; i < imgs.length; i++){
    imgNames.push(imgs[i].name);
    imgPaths.push(imgs[i].filePath);
    imgClicks.push(imgs[i].clickCount);
    imgViews.push(imgs[i].shownCount);
    var imgPct = imgs[i].clickCount / imgs[i].shownCount;
    imgData.push(imgPct);
  }

}

function rmAndGenerate() {//fired by eventlisteners
  var currentLeftImg = document.getElementById(imgs[imgIndex[0]].name);
  var currentCenterImg = document.getElementById(imgs[imgIndex[1]].name);
  var currentRightImg = document.getElementById(imgs[imgIndex[2]].name);

  leftViewPort.removeChild(currentLeftImg);
  centerViewPort.removeChild(currentCenterImg);
  rightViewPort.removeChild(currentRightImg);

  roundCount += 1;

  if (roundCount === 25) {
    resultsGen();
    var resultChart = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: chartOpts
    });
  } else {
    dupChk.splice(0,3);
    imgIndex.splice(0,3);
    imgDupChk();
  }
}

//----------------------Event Listeners and Handlers---------------------------------------
// var leftImgEl = document.getElementById(leftImg.name);
// var centerImgEl = document.getElementById(centerImg.name);
// var rightImgEl = document.getElementById(rightImg.name);
leftViewPort.addEventListener('click', function(event){
  event.preventDefault();
  event.stopPropagation();

  imgs[imgIndex[0]].clickCount += 1;
  rmAndGenerate();
},false);

centerViewPort.addEventListener('click', function(event){
  event.preventDefault();
  event.stopPropagation();

  imgs[imgIndex[1]].clickCount += 1;
  rmAndGenerate();
},false);

rightViewPort.addEventListener('click', function(event){
  event.preventDefault();
  event.stopPropagation();

  imgs[imgIndex[2]].clickCount += 1;
  rmAndGenerate();
},false);

//-----------------calls----------------------------------------------
initImgs();
imgDupChk();
