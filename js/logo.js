$(function() {

var CodeWrapper = (function() {
	var default_settings = {
		el: 'body',
		min_width: 375
	};

	function CodeWrapper(settings) {
		this.options = $.extend( {}, default_settings, settings );
		this.el = $( this.options.el );

		if ( this.isCanvasSupported() )
			this.getAppScript();
	}

	CodeWrapper.prototype.isCanvasSupported = function() {
		var testCanvas = [
			document.createElement('canvas'),
			document.createElement('canvas')
		];

		var canvas_supported = false;

		if ( $('body').width() >= this.options.min_width ) {
			try {
				canvas_supported = !! ( testCanvas[0].getContext('2d') );
				canvas_supported = canvas_supported && !!(
					testCanvas[1].getContext('webgl') ||
					testCanvas[1].getContext('experimental-webgl')
				);
			}
			catch(error) {
				console.log('error gettings canvas context',error);
				return false;
			}
		}

		return canvas_supported;
	}

	CodeWrapper.prototype.getAppScript = function() {
		var random_url = window.generative_logo_sketches[
			parseInt( Math.random() * (window.generative_logo_sketches.length) )
		];

		$.getScript(random_url)
			.done( (function(data, textStatus, jqxhr) {
				this.logoApp = new LogoApp();
				this.setUpCanvas();
			}).bind(this) );
	}

	CodeWrapper.prototype.setUpCanvas = function() {
		// create a wrapper to have better control over the canvas on responsive devices
		var $logo_image = $('#logo');

		this.$canvas_container = $('<div/>', {class: 'logo_canvas_container'});
		this.$canvas_container.hide();
		this.el.prepend( this.$canvas_container );

		window.windowResized = ( function() {
			resizeCanvas(
				this.$canvas_container.width(),
				this.$canvas_container.height()
			);
			if (this.logoApp.resizeCanvas)
				this.ogoApp.resizeCanvas();

		}).bind(this);

		window.setup = (function() {
			this.canvas = createCanvas( 
				this.$canvas_container.width(),
				this.$canvas_container.height()
			);
			this.canvas.parent(this.$canvas_container[0]);

			this.logoApp.setup();

		}).bind(this);

		// draw funct
		window.draw = (function() {
			this.logoApp.draw();
		}).bind(this);


		$( this.$canvas_container ).fadeIn( "slow", (function() {
	   }).bind(this) );

	}

	return CodeWrapper;
})();


var logo_settings = {
	el: '.logo-container',
	min_width: 300

};

new CodeWrapper(logo_settings);

});
