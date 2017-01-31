var LogoApp = (function() {

   function LogoApp() {
		console.log('triniti im in B');
   }

	LogoApp.prototype.setup = function() {
   }

	LogoApp.prototype.draw = function() {
		stroke(250, 0, 0);
		noFill();
		rect(0, 0, random(0, width), random(0, height));
   }

	return LogoApp;
})();
