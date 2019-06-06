/*
 * Lines
 * Author: action
 * Description: Just lines
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
        this.Liner = (function(){
            function Liner(size) {
                this.size = size;
                this.dots = [];
                this.generateLine();

                this.dline = 0;
                this.nlines = Math.floor(Math.random()*4+5);
                this.translate = {
                    x: floor(Math.random()*25+8),
                    y: floor(Math.random()*20+2)
                }
            }

            Liner.prototype.getPoint = function() {
                return {
                    x: Math.floor(Math.random()*(this.size/2+1)-this.size/4),
                    //x: Math.random() > 0.5 ?
                        //Math.floor(Math.random()*(this.size/2+1)+this.size/4) :
                        //Math.floor(Math.random()*(-this.size/2+1)+this.size/4),
                    y: Math.random() > 0.5 ?
                         Math.floor(Math.random()*(this.size/2-this.size/3+1)+this.size/3.5) :
                        -Math.floor(Math.random()*(this.size/2-this.size/3+1)+this.size/3.5)
                }
            };

            Liner.prototype.generateLine = function() {
                var npoints = floor(Math.random()*4+2);
                this.dots.push(this.getPoint());

                for (var i = 1; i < npoints; i++) {
                    var p;
                    do {
                        p = this.getPoint();
                    } while( dist(p.x, p.y,
                        this.dots[this.dots.length-1].x, this.dots[this.dots.length-1].y) < this.size/5)

                    this.dots.push(p);

                    for (var k = Math.floor(Math.random()*3+1); k > 0; k--) {
                        var p1 = this.dots[this.dots.length-1];
                        var p0 = this.dots[this.dots.length-2];
                        var dp = [(p0.x+p1.x)/2, (p0.y+p1.y)/2];
                        var r = dist(dp[0], dp[1], p1.x, p1.y) / 1.3;
                        var deg = Math.random()*180-90
                        var rad = deg * Math.PI / 180;
                        var pn = {
                            x: Math.cos(rad) * r + p1.x,
                            y: Math.sin(rad) * r + p1.y
                        }
                        this.dots.push(pn);
                    }
                }
            }

            Liner.prototype.draw = function(ctx) {
                var nx = Math.floor(this.nlines/3);
                //ctx.translate(this.translate.x * this.nlines * -0.5, this.translate.y * this.nlines * -0.5);
                ctx.translate(this.translate.x * this.nlines * -0.5, this.translate.y * this.nlines * -0.5);
                var l = this.dots;
                for (var k = 0; k < nx; k++) {
                    var sl = this.dline;
                    ctx.push();
                    ctx.translate(sl*this.translate.x, sl*this.translate.y);
                    for (var i = 0; i < this.dots.length-1; i++)
                        ctx.line(l[i].x, l[i].y, l[i+1].x, l[i+1].y);
                    ctx.line(
                        l[this.dots.length-1].x, l[this.dots.length-1].y,
                        l[0].x+this.translate.x, l[0].y+this.translate.y,
                    );
                    this.dline = ++this.dline%this.nlines;
                    ctx.pop();
                }
            };

            return Liner
        })();

        this.calculateLogo = function() {
            // get Logo size and possition
            this.logo = {
                x: $('#logo').offset().left - $('#logo').offsetParent().offset().left,
                y: $('#logo').offset().top - $('#logo').offsetParent().offset().top,
                w: $('#logo').outerWidth(),
                h: $('#logo').outerHeight()
            }
        }
    }

/*
 * Here is where the magic happens.
 */
    LogoApp.prototype.preload = function() {
    /*
     * load assets here
     * setup() waits until preload() is done
     */

        this.imageLogo = loadImage('/img/logo.svg');
    }

	LogoApp.prototype.setup = function() {
        this.calculateLogo();

        this.canvas = createGraphics(width, height);

        this.noiseFactor = 6;
        this.noiseSpeed = [0.4, 0.2];
        this.noiseValue = [random(1000), random(1000)];

        this.nextLine = random(30*2, 30*5);
        this.lineLifeCount = 0;

        this.canvas.noFill();
        this.canvas.stroke(255);
        this.lines = new this.Liner(height);
    }

	LogoApp.prototype.draw = function() {
        background(255);

        this.noiseValue[0]+=this.noiseSpeed[0];
        this.noiseValue[1]+=this.noiseSpeed[1];
        var nx = noise(this.noiseValue[0])*this.noiseFactor;
        var ny = noise(this.noiseValue[1])*this.noiseFactor;

        this.canvas.push();
        this.canvas.background(255,90);
        this.canvas.stroke(0);
        this.canvas.translate(width/2, height/2);
        this.canvas.translate(nx, ny);
        this.lines.draw(this.canvas);
        this.canvas.pop();

        this.lineLifeCount++;
        if (this.lineLifeCount >= this.nextLine) {
            this.nextBlack = random(30*3, 30*8);
            this.lineLifeCount = 0;
            this.lines = new this.Liner(height);

        }

        image(this.canvas, 0, 0);
        image(this.imageLogo, this.logo.x, this.logo.y, this.logo.w, this.logo.h);

   }

/*
 * The resize canvas function is not mandatory. If the method exist, is
 * called after the site scales and adjusts the canvas.
 */
	LogoApp.prototype.resizeCanvas = function() {
        background(0);
        this.calculateLogo();
	}

	return LogoApp;
})();
