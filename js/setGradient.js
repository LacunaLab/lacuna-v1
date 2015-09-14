
var moz = "-moz-linear-gradient(top,XXX 0%, rgba(255,0,255,0.95) 60%, rgba(255,255,255,0.95) 100%);" 
var clear = "linear-gradient(to bottom, XXX 0%,rgba(255,0,255,0.95) 60%,rgba(255,255,255,0.95) 100%);" 

// magic:
var rndColor = '#'+Math.floor(Math.random()*16777215).toString(16);

moz = moz.replace("XXX", rndColor);
clear = clear.replace("XXX", rndColor);
console.log(clear);
$('#header').css('background', moz );
//.css('background', clear);


/*
After test, append the rest as well...
  background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(255,0,255,1)), color-stop(60%,rgba(255,0,255,0.95)), color-stop(100%,rgba(255,255,255,0.95)));
  background: -webkit-linear-gradient(top, rgba(255,0,255,1) 0%,rgba(255,0,255,0.95) 60%,rgba(255,255,255,0.95) 100%); 
  background: -o-linear-gradient(top, rgba(255,0,255,1) 0%,rgba(255,0,255,0.95) 60%,rgba(255,255,255,0.95) 100%); 
  background: -ms-linear-gradient(top, rgba(255,0,255,1) 0%,rgba(255,0,255,0.95) 60%,rgba(255,255,255,0.95) 100%); 
*/

