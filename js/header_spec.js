var sketch = function( p ) {
///////////////////////////////////////////
// tweak these to change dimensions and placement of elements
var wvs = 202; //240; //   width of visible spectrum. 202 is width of logo, 240 gives it a border

var amplitude = 60.0;  // Height of wave
var pInitLong = 1000.0;  // starting period (left edge) for left wave - larger than 1000 does not change much, for waveAccLong of 5400
var pInitShort = 30.0;  // starting period (left edge) for right wave
var waveAccLong = 5400; //a factor divided into 2pi, giving how much the wave period changes for each x value, best value 5400 for left wave
var waveAccShort = 1800; //a factor divided into 2pi, giving how much the wave period changes for each x value. best value 1800 for right wave
var env = 1; // how much the envelope reduces at the edges. 1 means it reduces to a point.
var yoff = 80; //60; //  //y value to place y=0 for wave

var ygrad = 123; //y value the gradient extends to
var ygaptop = 20; // y value of placement of logo
var ygapbot = 0; // pixels of visible spectrum below logo
///////////////////////////////////////////

//from https://processing.org/examples/sinewave.html
var xspacing = 1;   // How far apart should each horizontal location be spaced
var w;              // Width of entire wave
var theta = 0.0;  // Start angle at 0
var dxLong = (p.TWO_PI/ pInitLong) * xspacing;  // Value for incrementing X, a function of period and xspacing
var dxShort = (p.TWO_PI/ pInitShort) * xspacing;  // Value for incrementing X, a function of period and xspacing
var yLong = [];
var yShort = [];  // Using an array to store height values for the wave

var Y_AXIS = 1;
var X_AXIS = 2;

var logo;

p.preload = function() {
  logo = p.loadImage("../images/LacunaLab_logo.jpg"); //202 x 204 px
}

p.setup = function() {
  canvas = p.createCanvas(1000,logo.height+ygaptop+ygapbot);
  canvas.parent("p5head");
  canvas.id("canvasHead");
  p.background(255);

  logo.loadPixels();
  logo.pixels
  logo.updatePixels();

  var cvs;
  for (var i=0; i<wvs; i++) {
    cvs = visSpec(i); 
    p.stroke(cvs);
    var x = (p.width-wvs)/2+i;
    p.line(x,0,x,p.height-1);
  }

  p.stroke(255);
  w = (p.width-wvs)/2;
}

p.draw = function() {
  clearWaves();
  calcWave();
  renderWave();  
  p.image(logo,(p.width-logo.width)/2,ygaptop);
}

function visSpec(i) {
  var ratio = i/wvs;
  var xred = 0.27;
  var xora = 0.32;
  var xyel = 0.4;
  var xgre = 0.55;
  var xblu = 0.75;
  var xvio = 0.8;
  var cred = p.color(255,0,0);
  var cora = p.color(255,128,0);
  var cyel = p.color(255,210,0);
  var cgre = p.color(0,210,0);
  var cblu = p.color(0,0,180);
  var cvio = p.color(100,0,180);
  
  if (ratio<0.27) {
    return p.lerpColor(p.color(0,0,0),cred,p.map(ratio, 0,xred, 0,1)); 
  } else if (ratio>=xred && ratio<xora) {
    return p.lerpColor(cred,cora,p.map(ratio, xred,xora, 0,1)); 
  } else if (ratio>=xora && ratio<xyel) {
    return p.lerpColor(cora,cyel,p.map(ratio, xora,xyel, 0,1)); 
  } else if (ratio>=xyel && ratio<xgre) {
    return p.lerpColor(cyel,cgre,p.map(ratio, xyel,xgre, 0,1)); 
  } else if (ratio>=xgre && ratio<xblu) {
    return p.lerpColor(cgre,cblu,p.map(ratio, xgre,xblu, 0,1)); 
  } else if (ratio>=xblu && ratio<xvio) {
    return p.lerpColor(cblu,cvio,p.map(ratio, xblu,xvio, 0,1)); 
  } else {
    return p.lerpColor(cvio,p.color(0,0,0),p.map(ratio, xvio,1, 0,1)); 
  }
}

function clearWaves() {
  setGradient(0,0,(p.width-wvs)/2-1,ygrad,p.color(0),p.color(255),Y_AXIS);
  setGradient((p.width+wvs)/2,0,(p.width-wvs)/2,ygrad,p.color(0),p.color(255),Y_AXIS);
//// or no gradient
//  p.fill(0);
//  p.stroke(0);
//  p.rect(0,0,(p.width-wvs)/2,p.height);
//  p.rect((p.width+wvs)/2,0,(p.width-wvs)/2,p.height);
}

function calcWave() {
  // Increment theta (try different values for 'angular velocity' here
  theta += 0.02;

  var x = theta;
  var length = w/xspacing;
  for (var i = 0; i < length; i++) {
    yLong[i] = p.sin(x)*(amplitude*(1-env*p.pow((length-i)/length,3) ));
    x+= dxLong + p.pow(i*p.TWO_PI/waveAccLong,3); //i*TWO_PI/48000; //
  }
  x = theta;
  for (var i = 0; i < length; i++) {
    yShort[i] = p.sin(x)*(amplitude*(1-env*p.pow(i/length,3) ));
    x-= dxShort + p.pow(i*p.TWO_PI/waveAccShort,3); //i*TWO_PI/4800; //
  }
}

function renderWave() {
  p.stroke(255);
  for (var x = 0; x < yLong.length-2; x++) {
    p.line(x*xspacing, yoff+yLong[x],(x+1)*xspacing, yoff+yLong[x+1]);
  }
  for (var x = 0; x < yShort.length-2; x++) {
    p.line(x*xspacing+(p.width+wvs)/2, yoff+yShort[x],(x+1)*xspacing+(p.width+wvs)/2, yoff+yShort[x+1]);
  }
//// or with dots
  //noStroke();
  //fill(255);
  //for (var x = 0; x < yLong.length; x++) {
  //  p.ellipse(x*xspacing, p.height/2+yLong[x], 2, 2);
  //}
  //for (var x = 0; x < yShort.length; x++) {
  //  p.ellipse(x*xspacing+(p.width+wvs)/2, p.height/2+yShort[x], 2, 2);
  //}
}


// from http://p5js.org/examples/examples/Color_Linear_Gradient.php
function setGradient(x, y, w, h, c1, c2, axis) {

  p.noFill();

  if (axis == Y_AXIS) {  // Top to bottom gradient
    for (var i = y; i <= y+h; i++) {
      var inter = p.map(i, y, y+h, 0, 1);
      var c = p.lerpColor(c1, c2, inter);
      p.stroke(c);
      p.line(x, i, x+w, i);
    }
  } else if (axis == X_AXIS) {  // Left to right gradient
    for (var i = x; i <= x+w; i++) {
      var inter = p.map(i, x, x+w, 0, 1);
      var c = p.lerpColor(c1, c2, inter);
      p.stroke(c);
      p.line(i, y, i, y+h);
    }
  }
}


}

var head = new p5(sketch);