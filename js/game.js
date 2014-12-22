// Laurent Rohrbasser 2014 poulenque@gmail.com

"use strict";
var canvas = document.querySelector('#canvas');
// canvas.on('click', function(e) {
// 	e.preventDefault();
// }

var KEY_MAP = {'A': 65, 'B': 66, 'C': 67, 'D': 68, 'E': 69, 'F': 70, 'G': 71, 'H': 72, 'I': 73, 'J': 74, 'K': 75, 'L': 76, 'M': 77, 'N': 78, 'O': 79, 'P': 80, 'Q': 81, 'R': 82, 'S': 83, 'T': 84, 'U': 85, 'V': 86, 'W': 87, 'X': 88, 'Y': 89, 'Z': 90, 'ENTER': 13, 'ESC': 27, 'SPACE': 32, 'LEFT': 37, 'UP': 38, 'RIGHT': 39, 'DOWN': 40, ',': 188, '.': 190, '/': 191, ';': 186, '1': 49, '2': 50, '3': 51, '4': 52, '5': 53, '6': 54, '7': 55, '8': 56, '9': 57, '0': 48, '[': 219, ']': 221, '=': 187, 'Shift': 16, '\\': 220, 'left': 37, 'right': 39, 'up': 38, 'down': 40};
// var TRANSPOSED_KEY_MAP = {65:'A',66:'B',67:'C',68:'D',69:'E',70:'F',71:'G',72:'H',73:'I',74:'J',75:'K',76:'L',77:'M',78:'N',79:'O',80:'P',81:'Q',82:'R',83:'S',84:'T',85:'U',86:'V',87:'W',88:'X',89:'Y',90:'Z',13:'ENTER',27:'ESC',32:'SPACE',37:'LEFT',38:'UP',39:'RIGHT',40:'DOWN'};

var modulo = function(m, n) {
    return ((m % n) + n) % n;
};

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !! THIS WILL INIT THE WHOLE THING !!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

if (!canvas) {
    console.log("add this line to your html :")
    console.log("add this line to your html :")
} else {
    var context = canvas.getContext('2d');

    // goal = direction aimed
    // can be null, right, left, up, down.
    var goal = "null"

    var grid_w = 32 * 2;
    var grid_h = 32 * 2;
    var grid_size = 64;

    // !!!!!!!!!!!!!!!!!!
    // !! LOADING SHIT !!
    // !!!!!!!!!!!!!!!!!!

    var papanoel = new Image();
    papanoel.src = 'img/papanoel_big_test.png';

    // 0 = road
    // 1 = house1
    // 2 = house2
    // 3 = house3
    // 4 = house4
    var city_x = 30;
    var city_y = 30;
    var city = generateCityMap(city_x, city_y);
    var sprMgr = new spriteMgr({canvas: canvas, world_x: city_x*grid_w, world_y: city_y*grid_h});
    generateCitySprites(sprMgr, city);
    var papaSprite = sprMgr.addSprite({width: grid_size,
                    height: grid_size,
                    x: 0,
                    y: 0,
                    z: 1,
                    image: papanoel,
                    duration: -1,
                    numberOfFrames: 1});

    var camera_x_goal = 0;
    var camera_y_goal = 0;


    var update_screen = function() {
        
        sprMgr.camera_x = sprMgr.camera_x + .1 * (camera_x_goal - sprMgr.camera_x);
        sprMgr.camera_y = sprMgr.camera_y + .1 * (camera_y_goal - sprMgr.camera_y);
        papaSprite.x = sprMgr.camera_x;
        papaSprite.y = sprMgr.camera_y;
        sprMgr.draw();

        window.setTimeout(update_screen, 1000./60);
        // window.setTimeout(update_screen, 1000./20);
    }
    // init the screen update sequence ! :Â¬D
    update_screen();

    var goal_set_to_null = function() {
        goal = "null";
    }

    var update_world = function() {
        // console.log("update_world");
        if (goal == "right") {
            camera_x_goal += 64;
        }
        else if (goal == "left") {
            camera_x_goal -= 64;
        }
        else if (goal == "up") {
            camera_y_goal -= 64;
        }
        else if (goal == "down") {
            camera_y_goal += 64;
        }
        window.setTimeout(goal_set_to_null, 100);
        // console.log("prout");
        window.setTimeout(update_world, 700);

    }
    window.setTimeout(update_world, 700);


    document.addEventListener('keydown', function(evt) {
        key_event_fx(evt, true);
    });

    // document.addEventListener('keyup', function (evt) {
    // 	piano_key_event_fx(evt,false);
    // 	draw_piano();
    // });

}

////////////////////////////////////////////////////////////////////
function key_event_fx(evt, mybool) {
    if (evt.keyCode === KEY_MAP['right']) {
        goal = "right"
        // camera_x-=8;
    }
    else if (evt.keyCode === KEY_MAP['left']) {
        goal = "left"
        // camera_x+=8;
    }
    if (evt.keyCode === KEY_MAP['up']) {
        goal = "up"
        // camera_y+=8;
    }
    else if (evt.keyCode === KEY_MAP['down']) {
        goal = "down"
        // camera_y-=8;
    }
}