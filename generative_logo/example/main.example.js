/*
 * Generative Logo Example
 * Author: <3
 * Description: Basic class template to inject a creative code sketch into
 * Lacuna Lab site header.
 *
 *
 *
 * ### Directory structure
 *
 * the Jekyll script search for all the paths that contain a main.js file
 * inside the generative_logo directory at root.
 *
 * |-_site
 * |-_layouts
 * |-_data
 * |-_includes
 * |
 * |-generative_logo
 * |  |-myArtLogo
 * |  |  |-main.js  <-- your art here
 *
 *
 *
 * ### Script Layout
 *
 * At the website, previusly loaded Logo script checks if canvas and gl
 * are supporter by the browser, then it chooses a random script from the
 * generative_logo folder and creates and initializes the canvas over the
 * header of the page.
 *
 *
 *
 * ### Tips and tricks
 *
 * - The canvas background is transparent and the logo is right behind.
 *   By default you can draw over the original site logo.
 * - The canvas occupies the full width of the site container and is
 *   responsive. (just the logo size is too small). So you can draw over
 *   the whole header.
 * - If you wanna draw exactly over the original logo, you can get the
 *   position and size information with jquery. $('#logo') and compare it
 *   respecto to the logo-container wrapper. $('.logo-container')
 *
 */

/*
 * Observe the script is wrapped by the LogoApp namespace
 */
var LogoApp = (function() {

/*
 * The constructor function is gonna be called immediately after being
 * download, before the p5 context exists.
 */
   function LogoApp() {
   }

/*
 * Here is where the magic happens.
 */
    LogoApp.prototype.preload = function() {
    /*
     * load assets here
     * setup() waits until preload() is done
     */
    }

	LogoApp.prototype.setup = function() {
		stroke(0);
		noFill();
   }

	LogoApp.prototype.draw = function() {
		var w = random(0, height), h = random(0, height);
		ellipse ( 60, 60, w, h );
		ellipse ( width - 60, height - 60, w, h );
   }

	// optional
/*
 * The resize canvas function is not mandatory. If the method exist, is
 * called after the site scales and adjusts the canvas.
 */
	LogoApp.prototype.resizeCanvas = function() {
	}

	return LogoApp;
})();
