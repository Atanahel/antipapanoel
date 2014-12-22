"use strict";

var coinImages = [ new Image(), new Image()];
var coinImageSrcs = ["img/coin-sprite-animation.png", "img/coin-sprite-animation-reverse.png"];
coinImages[0].src = coinImageSrcs[0];
coinImages[1].src = coinImageSrcs[1];

var canvas = document.getElementById("coinAnimation");
canvas.width = 100;
canvas.height = 100;

function sprite(options) {

    var that = {},
            frameIndex = 0,
            tickCount = 0,
            ticksPerFrame = 5,
            numberOfFrames = options.numberOfFrames || 1;

    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;
    that.loop = options.loop;
    that.tickPerTime = 1;

    that.render = function() {
        that.context.clearRect(0, 0, that.width, that.height);
        // Draw the animation
        that.context.drawImage(
                that.image,
                frameIndex * that.width / numberOfFrames,
                0,
                that.width / numberOfFrames,
                that.height,
                0,
                0,
                that.width / numberOfFrames,
                that.height);
    };

    that.update = function() {

        tickCount += that.tickPerTime;

        if (tickCount >= ticksPerFrame) {

            tickCount = 0;

            // If the current frame index is in range
            if (frameIndex < numberOfFrames - 1) {
                // Go to the next frame
                frameIndex += 1;
            } else if (that.loop) {
                frameIndex = 0;
            }
        }
        if (tickCount < 0) {

            tickCount = ticksPerFrame-1;

            // If the current frame index is in range
            if (frameIndex > 0) {
                // Go to the next frame
                frameIndex -= 1;
            } else if (that.loop) {
                frameIndex = numberOfFrames - 1;
            }
        }
    };
    return that;
}


var coin = sprite({
    context: canvas.getContext("2d"),
    width: 440,
    height: 40,
    image: coinImages[0],
    loop: true,
    numberOfFrames: 10
});
coin.render();

var timeTick = 1;
function switchTime() {
    timeTick = -timeTick;
    coin.tickPerTime = timeTick;
    if (timeTick === 1)
        coin.image = coinImages[0];
    else
        coin.image = coinImages[1];
    document.getElementById("textSpace").innerHTML=coin.tickPerTime;
}

function gameLoop() {

    window.requestAnimationFrame(gameLoop);

    coin.update();
    coin.render();
}

// Start the game loop as soon as the sprite sheet is loaded
coinImages[1].addEventListener("load", gameLoop);