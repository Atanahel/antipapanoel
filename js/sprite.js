
function spriteMgr(options) {
    this.canvas = options.canvas;
    this.context = this.canvas.getContext("2d");
    this.camera_x = 0;
    this.camera_y = 0;
    this.spriteSet = {};
    this.spriteCount = 0;
    this.world_x = options.world_x;
    this.world_y = options.world_y;
    var id = 0;
    this.containsSprite = function(s)
    {
        return this.spriteSet.hasOwnProperty(s.toString());
    };
    this.addSprite = function(options) {
        var s = new sprite(options, id,this);
        if (this.containsSprite(s))
            console.log('sprite already existing ARGH!');
        this.spriteSet[s.toString()] = s;
        this.spriteCount++;
        id++;
        return s;
    };
    this.removeSprite = function(s) {
        if (this.containsSprite(s)) {
            delete this.spriteSet[s.toString()];
            this.spriteCount--;
        }
    };
    this.draw = function() {
        //clear canvas
        this.canvas.width = this.canvas.width;
        var view_x = this.canvas.width;
        var view_y = this.canvas.height;
        //
        //console.log("nb sprites :" + this.spriteCount)
        var t;
        var array = [];
        for (t in this.spriteSet) {
            var s = this.spriteSet[t];
            s.update();
            if (Math.abs(modulo(view_x / 2 - this.camera_x + s.x + s.width / 2, this.world_x) - view_x / 2) <= view_x * 0.75) {
                if (Math.abs(modulo(view_y / 2 - this.camera_y + s.y + s.height / 2, this.world_y) - view_y / 2) <= view_y * 0.75) {
                    array.push(s);
                }
            }
        }
        array.sort(function(a, b) {
            return a.z - b.z;
        });
        for (var i = 0; i < array.length; i++) {
            array[i].render(this.context, view_x / 2 - this.camera_x, view_y / 2 - this.camera_y, this.world_x, this.world_y);
        }
    };
}


function sprite(options, id, sprMgr) {

    var frameIndex = 0,
            tickCount = 0,
            ticksPerFrame = 5,
            numberOfFrames = options.numberOfFrames || 1,
            finished = false;
    this.width = options.width;
    this.height = options.height;
    this.image = options.image;
    this.duration = options.duration; //-1 for looping, 0 for one period animation, value in milliseconds otherwise (unsupported)
    this.x = options.x;
    this.y = options.y;
    this.z = options.z;
    this.tickPerTime = 1;
    var my_id = "" + options.z + "." + id;
    var my_sprMgr = sprMgr;
    this.render = function(context, offset_x, offset_y, world_x, world_y) {
        // Draw the animation
        context.drawImage(
                this.image,
                frameIndex * this.width,
                0,
                this.width,
                this.height,
                modulo(offset_x + this.x + this.width / 2, world_x) - this.width,
                modulo(offset_y + this.y + this.height / 2, world_y) - this.height,
                this.width,
                this.height);
    };
    this.update = function() {
        tickCount += this.tickPerTime;
        if (tickCount >= ticksPerFrame) {
            tickCount = 0;
            // If the current frame index is in range
            if (frameIndex < numberOfFrames - 1) {
                // Go to the next frame
                frameIndex += 1;
            } else if (this.duration === -1) {
                frameIndex = 0;
            } else {
                finished = true;
                my_sprMgr.removeSprite(this);
            }
        }
        if (tickCount < 0) {
            tickCount = ticksPerFrame - 1;
            // If the current frame index is in range
            if (frameIndex > 0) {
                // Go to the next frame
                frameIndex -= 1;
            } else if (this.duration === -1) {
                frameIndex = numberOfFrames - 1;
            } else {
                finished = true;
                my_sprMgr.removeSprite(this);
            }
        }
    };
    this.isFinished = function() {
        return finished;
    };
    this.toString = function() {
        return my_id;
    };
}