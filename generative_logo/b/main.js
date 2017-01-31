var LogoApp = (function() {

   function LogoApp() {
		console.log('triniti im in A');
   }

	LogoApp.prototype.setup = function() {
   }

	LogoApp.prototype.draw = function() {
		line(random(0, width), random(0, height), 0, 0);
   }

	return LogoApp;
})();
