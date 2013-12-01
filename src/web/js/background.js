var currentMousePos = { x: -1, y: -1 };

$(document).mousemove(function(event) {
    currentMousePos.x = event.pageX;
    currentMousePos.y = event.pageY;
});

function isCanvasSupported(){
    var elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
}


var ctx;
(function() {

    // Check for browsers
    if (isCanvasSupported())
    {
        var Square;

        var currentColor = 0;

        Square = (function() {
            function Square(x, y, width, height) {
                this.bX = x;
                this.bY = y;
                this.bWidth = width;
                this.bHeight = height;
                this.color = Math.floor(Math.random() * 100);
                this.just_changed = 0;
                this.decay = 30;
            }

            Square.prototype.update = function(ctx, i) {
                this.x = this.bX;
                this.y = this.bY;
                this.width = this.bHeight;
                this.height = this.bWidth;
                
                if (currentMousePos.x > this.x && currentMousePos.x < this.x + this.width && 
                        (currentMousePos.y > this.y && currentMousePos.y < this.y + this.height) && this.just_changed == 0) {
                    this.color = Math.floor(Math.random() * 100);
                    this.just_changed = 1;
                    //console.log("changed");
                }
                if (this.just_changed == 1)
                {
                    //console.log("in loop");
                    this.decay -= 1;
                    if (this.decay < 0)
                    {
                        this.decay = 30;
                        this.just_changed = 0;
                    }
                }
                return true;
            };

            Square.prototype.draw = function(ctx, i) {

                //this.color += this.color_direction;
                //if (this.color < 0 || this.color > 100)
                //    this.color_direction *= -1;
                
                //var color = Math.floor(this.color / 20);
                //alert(color);
                
                switch (Math.floor(this.color / 20))
                {
                    
                    case 0:
                        var color = "#F8E3C9";
                        break;
                    case 1:
                        var color = "#8E6E4C";
                        break;
                    case 2:
                        var color = "#886030";
                        break;
                    case 3:
                        var color = "#4A2513";
                        break;
                    case 4:
                        var color = "#8B4243";
                        break;
                }
                
                //var color = 'hsl(0, 0%,' + (95 + (this.color / 20)) + '%)';
                ctx.fillStyle=color;
                ctx.fillRect(this.x,this.y,this.width,this.height);
                return true;
            };

            return Square;

        })();

        Sketch.create({
            fullscreen: true,
            interval: 1,
            setup: function() {
                // center vanvas
                this.canvas.style.marginLeft = -this.width / 2 + 'px';
                this.canvas.style.marginTop = -this.height / 2 + 'px';

                this.squares = [];
                this.size = 100;

                for (var x = 0; x <= (this.width / this.size); x++)
                {
                    for (var y = 0; y <= (this.width / this.size); y++)
                    {
                        var offset = 0; // Math.floor(Math.random() * 10);
                        this.squares.push(new Square((x * this.size) - (offset / 2),(y * this.size) - (offset / 2),this.size + offset,this.size + offset));
                    }
                }

                ctx = this;
                return true;
            },
            resize: function() {
                this.clear();
                this.setup();
                this.start();
            },
            clear: function() {
                return this.clearRect(0, 0, this.width, this.height);
            },
            update: function() {
                var i, _results;
                i = this.squares.length;
                _results = [];
                while (i--) {
                    _results.push(this.squares[i].update(this, i));
                }
                return _results;
            },
            draw: function() {
                var i, _results;
                i = this.squares.length;
                _results = [];
                while (i--) {
                    _results.push(this.squares[i].draw(this, i));
                }
                return _results;
            }
        });
    }
}).call(this);

