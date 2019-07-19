/*
 * Vertical Garden | LacunaLab version
 * Author: action-io
 * Description: ¯\_(ツ)_/¯
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
        this.VGImage = (function() {
            function VGImage(path) {
                this.image =  undefined;
                this.loaded = false;
                this.path = path;
            }

            VGImage.prototype.load = function() {
                this.loaded = false;
                this.image = this.loadFromUrl(this.path);
            };

            VGImage.prototype.loadFromUrl = function(path) {
                var timeout;

                var src = path;
                loadImage( src.replace( /.*?:[\/]{2}/g , '//' ),
                    (function(img) {
                        clearTimeout(timeout);
                        this.image = img;
                        this.loaded = true;
                        //image(app_image.image, 0, 0, width, height);
                        //console.log('Success loading image', img);
                    }).bind(this),
                    (function(e) {
                        if (e != undefined) {
                            this.loaded = false;
                            console.log('error loading image', e);
                        }
                    }).bind(this)
                );

                timeout = setTimeout( function(){
                    this.loaded = false;
                    console.log('loading time has expired')
                }, 3000);
            };

            VGImage.prototype.getPixels = function(i) {
                // call load and pixels only one time.
                if ( this.pixels == undefined ) {
                    this.image.loadPixels();
                    this.pixels = this.image.pixels;
                }

                return this.pixels.slice(i*4, i*4+4);
            };

            return VGImage;

        })();

        this.Plant = (function() {
            function Plant(pixel) {
                this.pixel = pixel;

                this.angle_offset = 13; // 13 / 257 / 77
                this.angle_increment = 0.5; // angle change for a new line
                this.size_offset = 0.7; // size modifier
            }

            Plant.prototype.draw = function(ctx) {
                var p = this.pixel;

                ctx.stroke(p.color);
                ctx.fill(p.color);

                this.drawLines( p.brightness, p.saturation, p.x, p.y, ctx );
                this.drawCircles( p.brightness, p.saturation, p.x, p.y, ctx );
            };

            Plant.prototype.drawLines = function(pixel_brightness, pixel_saturation, x, y, ctx) {
                if ( pixel_brightness <= 245 || pixel_brightness >= 10 ){
                    ctx.strokeWeight(pixel_saturation / 15);
                    var a = (360.0 / 255.0) * pixel_saturation + this.angle_offset;
                    var x2 = x + pixel_brightness/4 * random(0.7,1) * this.size_offset * cos(radians(a));
                    var y2 = y + pixel_brightness/4 * random(0.7,1) * this.size_offset * sin(radians(a));
                    ctx.line(x, y, x2, y2);
                }
                else {
                    if ( pixel_brightness > 230 )
                        var im = parseInt( (pixel_brightness - 245) / 5 );
                    else if ( pixel_brightness < 10 )
                        var im = parseInt( pixel_brightness / 2 );
                    for (var i = 0; i < im; i++) {
                        var b = random(this.angle_offset, this.angle_offset+90);
                        var l = im * random(10 * this.size_offset, 40 * this.size_offset);
                        var x2 = x + l * cos(radians(b));
                        var y2 = y + l * sin(radians(b));
                        ctx.strokeWeight(( 1 - (0.5 * im)) * this.size_offset);
                        ctx.line(x, y, x2, y2);
                    }
                }
            };

            Plant.prototype.drawCircles = function(pixel_brightness, pixel_saturation, x, y, ctx) {
                //if ( pixel_saturation > 120 && pixel_brightness > 100 ) {
                if ( pixel_saturation > 90 && pixel_brightness > 70 ) {
                    var dia = random(pixel_brightness / 50) * this.size_offset;
                    var ll = random(pixel_brightness / 3.0) * this.size_offset;
                    var ang = random(360);
                    var x2 = x + ll * cos(radians(ang));
                    var y2 = y + ll * sin(radians(ang));
                    ctx.strokeWeight(1);
                    ctx.ellipse(x2, y2, dia, dia);
                }
            };



            return Plant;
        })();

        this.scaleToSize = function(image, x, y, w, h) {
            var _x = Math.floor(x*(image.width / w));
            var _y = Math.floor(y*(image.height / h));
            return { 'x':_x, 'y':_y };
        };

        this.pixelAnalisis = function(image, x, y) {
            var coords = this.scaleToSize(image.image, x, y, width, height);
            var i = coords.y * image.image.width + coords.x;
            var pixel_array = image.getPixels(i);

            var pixel_color = color.apply( null, pixel_array );
            var pixel_brightness = brightness(pixel_color);
            var pixel_saturation = map( saturation(pixel_color), 0, 100, 0, 255 );

            return {
                'x': x, 'y': y,
                'coords': coords,
                'color': pixel_color,
                'brightness': pixel_brightness,
                'saturation': pixel_saturation
            };
        };

        this.isDrawable = function(image, x, y) {
            x -= this.logo.x;
            y -= this.logo.y;

            if (x < 0 || y < 0 || x > this.logo.w || y > this.logo.h) return false

            var coords = this.scaleToSize(image.image, x, y, this.logo.w, this.logo.h);

            var i = coords.y * image.image.width + coords.x;
            var pixel_array = image.getPixels(i);
            if ( pixel_array[0] == pixel_array[1]
                && pixel_array[1] == pixel_array[2]
                && pixel_array[2] == 0
                && pixel_array[3] == 255 )
                return true;
            else
                return false;
        }

        this.proximityDrawable = function(image, x, y, size) {
            if (x < this.imageLogo.x - size/2
            || x > this.imageLogo.x + this.imageLogo.w + size/2
            || y < this.imageLogo.y - size/2
            || y > this.imageLogo.y + this.imageLogo.h + size/2 ) return false

            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                    var nbx = floor(x-(size-1)/2+i);
                    var nby = floor(y-(size-1)/2+j) - size/2;
                    if ( this.isDrawable(image, nbx, nby) ) return true;
                }
            }

            return false;
        }

        this.calculateLogo = function() {
            // get Logo size and possition
            this.logo = {
                x: $('#logo').offset().left - $('#logo').offsetParent().offset().left,
                y: $('#logo').offset().top - $('#logo').offsetParent().offset().top,
                w: $('#logo').outerWidth(),
                h: $('#logo').outerHeight()
            }
        }

        var randomImageId = parseInt(Math.random()*5+1);
        console.log('Image:', randomImageId)
        this.imageColorSource = new this.VGImage(
            '/generative_logo/vertical_garden/assets/'+'source_0' +randomImageId+ '.jpg'
        );
        this.imageLogo = new this.VGImage('/img/logo.svg');

    }

/*
 * Here is where the magic happens.
 */
    LogoApp.prototype.preload = function() {
        this.imageColorSource.load();
        this.imageLogo.load(); 
    }

    LogoApp.prototype.setup = function() {
        this.row = height;
        this.graphics = [
            createGraphics(width, height),
            createGraphics(width, height)
        ];
        colorMode(RGB, 255);

        this.calculateLogo();

    }

    LogoApp.prototype.draw = function() {
        this.row -= 1;
        if (this.row > 0) {
            var y = this.row;
            var layer_number = y%2;

            for (var x = 0; x < width; x+=1) {

                var pixel = this.pixelAnalisis(this.imageColorSource, x, y);
                if (this.row > height/1.8) {
                    //if ( this.proximityDrawable(this.imageLogo, x, y, 20) ) {
                        //pixel.color.levels[0] -= 100;
                        //pixel.color.levels[1] -= 150;
                        //pixel.color.levels[2] -= 120;
                        //pixel.brightness -= 50;
                    //}
                    new this.Plant(pixel).draw( this.graphics[layer_number] );
                }
                //else if ( this.proximityDrawable(this.imageLogo, x, y, 10) ) {
                else if ( this.isDrawable(this.imageLogo, x, y) ) {
                    pixel.brightness += 50;
                    pixel.saturation -= 50;
                    new this.Plant(pixel).draw( this.graphics[layer_number] );
                }

            }

            this.graphics[layer_number].image( this.graphics[(layer_number+1)%2], 0 ,0 );

            this.graphics[layer_number].noStroke();
            this.graphics[layer_number].fill(255);
            for (var i = 0; i < width; i++)
                if ( this.isDrawable(this.imageLogo, i, y-20) ) {
                    //var pixel = {
                        //'x': i, 'y': y-20,
                        //'color': color(255),
                        //'brightness': 160,
                        //'saturation': 100
                    //};
                    //new this.Plant(pixel).draw( this.graphics[layer_number] );
                    this.graphics[layer_number].rect(i-1,y-21,2,2);
                }

            image(this.graphics[layer_number], 0, 0);
        }

        //image(this.imageLogo.image, this.logo.x, this.logo.y, this.logo.w, this.logo.h);
    }

	// optional
/*
 * The resize canvas function is not mandatory. If the method exist, is
 * called after the site scales and adjusts the canvas.
 */
	LogoApp.prototype.resizeCanvas = function() {
        this.calculateLogo();
	}

	return LogoApp;
})();
