// Laurent Rohrbasser 2014 poulenque@gmail.com

"use strict";
var canvas = document.querySelector('#canvas');
// canvas.on('click', function(e) {
// 	e.preventDefault();
// }

var KEY_MAP = {'A':65,'B':66,'C':67,'D':68,'E':69,'F':70,'G':71,'H':72,'I':73,'J':74,'K':75,'L':76,'M':77,'N':78,'O':79,'P':80,'Q':81,'R':82,'S':83,'T':84,'U':85,'V':86,'W':87,'X':88,'Y':89,'Z':90,'ENTER':13,'ESC':27,'SPACE':32,'LEFT':37,'UP':38,'RIGHT':39,'DOWN':40,',':188,'.':190,'/':191,';':186,'1':49,'2':50,'3':51,'4':52,'5':53,'6':54,'7':55,'8':56,'9':57,'0':48,'[':219,']':221,'=':187,'Shift':16,'\\':220,'left':37,'right':39,'up':38,'down':40};
// var TRANSPOSED_KEY_MAP = {65:'A',66:'B',67:'C',68:'D',69:'E',70:'F',71:'G',72:'H',73:'I',74:'J',75:'K',76:'L',77:'M',78:'N',79:'O',80:'P',81:'Q',82:'R',83:'S',84:'T',85:'U',86:'V',87:'W',88:'X',89:'Y',90:'Z',13:'ENTER',27:'ESC',32:'SPACE',37:'LEFT',38:'UP',39:'RIGHT',40:'DOWN'};


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !! THIS WILL INIT THE WHOLE THING !!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

if (!canvas) {
    console.log("add this line to your html :")
    console.log("add this line to your html :")
} else {
    var context = canvas.getContext('2d');

    var clear_canvas = function() {
        canvas.width = canvas.width;
    }

    var modulo = function(m, n) {
        return ((m % n) + n) % n;
    };

    // goal = direction aimed
    // can be null, right, left, up, down.
    var goal = "null"

    var grid_w = 32 * 2
    var grid_h = 32 * 2

    // !!!!!!!!!!!!!!!!!!
    // !! LOADING SHIT !!
    // !!!!!!!!!!!!!!!!!!

    var papanoel = new Image();
    papanoel.src = 'img/papanoel_big_test.png';

    var house = new Image();
    house.src = 'img/house_big.png';


    var road_vh = new Image();
    road_vh.src = 'img/road_vh_big.png';


    var road_h = new Image();
    road_h.src = 'img/road_h_big.png';

    var road_v = new Image();
    road_v.src = 'img/road_v_big.png';


    var road_vh_up = new Image();
    road_vh_up.src = 'img/road_vh_up_big.png';

    var road_vh_down = new Image();
    road_vh_down.src = 'img/road_vh_down_big.png';

    var road_vh_left = new Image();
    road_vh_left.src = 'img/road_vh_left_big.png';

    var road_vh_right = new Image();
    road_vh_right.src = 'img/road_vh_right_big.png';


    var road_vh_right_up = new Image();
    road_vh_right_up.src = 'img/road_vh_right_up_big.png';

    var road_vh_right_down = new Image();
    road_vh_right_down.src = 'img/road_vh_right_down_big.png';

    var road_vh_left_up = new Image();
    road_vh_left_up.src = 'img/road_vh_left_up_big.png';

    var road_vh_left_down = new Image();
    road_vh_left_down.src = 'img/road_vh_left_down_big.png';


    var road_alone_left = new Image();
    road_alone_left.src = 'img/road_alone_left_big.png';

    var road_alone_right = new Image();
    road_alone_right.src = 'img/road_alone_right_big.png';

    var road_alone_up = new Image();
    road_alone_up.src = 'img/road_alone_up_big.png';

    var road_alone_down = new Image();
    road_alone_down.src = 'img/road_alone_down_big.png';

    var road_alone = new Image();
    road_alone.src = 'img/road_alone_big.png';



    // 0 = road
    // 1 = house1
    // 2 = house2
    // 3 = house3
    // 4 = house4
    var city_x = 30;
    var city_y = 30;
    var city = new Array(city_x);

    //first fill
    for (var i = 0; i < city_x; i++) {
        city[i] = new Array(city_y);
        for (var j = 0; j < city_y; j++) {

            //higher probability to fit the grid
            if (i % 2 && j % 2) {
                if (.13 < Math.random()) {
                    city[i][j] = 1;
                } else {
                    city[i][j] = 0;
                }
            } else {
                //lower probaility to build randomly
                if (.8 < Math.random()) {
                    city[i][j] = 1;
                } else {
                    city[i][j] = 0;
                }
            }
        }
    }
    // second pass : eliminate weird roads
    for (var i = 0; i < city_x; i++) {
        for (var j = 0; j < city_y; j++) {

            var right = city[modulo((i + 1), city_x)][j];
            var left = city[modulo((i - 1), city_x)][j];
            var up = city[i][modulo((j - 1), city_y)];
            var down = city[i][modulo((j + 1), city_y)];

            var right_up = city[modulo((i + 1), city_x)][modulo((j - 1), city_y)];
            var left_up = city[modulo((i - 1), city_x)][modulo((j - 1), city_y)];
            var right_down = city[modulo((i + 1), city_x)][modulo((j + 1), city_y)];
            var left_down = city[modulo((i - 1), city_x)][modulo((j + 1), city_y)];

            // if(right==0 && left==0 && up==0 && down==0 && right_up==0 && left_up==0 && right_down==0 && left_down==0){
            // 	city[i][j]=1;
            // }
            if (right == 0 && up == 0 && right_up == 0) {
                city[i][j] = 1;
            }
            if (right == 0 && down == 0 && right_down == 0) {
                city[i][j] = 1;
            }
            if (left == 0 && up == 0 && left_up == 0) {
                city[i][j] = 1;
            }
            if (left == 0 && down == 0 && left_down == 0) {
                city[i][j] = 1;
            }

        }
    }



    var camera_x = 0;
    var camera_y = 0;
    var camera_x_goal = 0;
    var camera_y_goal = 0;

    var draw_image = function(img, x, y) {
        context.drawImage(img, x + camera_x, y + camera_y);
    }

    var draw_house = function(housetype, groudtype, posx, posy) {
        if (housetype == 1) {
            draw_image(house, posx, posy - 8 * 2);
        }
    }



    var draw_city = function(city) {
        // for(var ii=0;ii<city_x;ii++){
        // 	for(var jj=0;jj<city_y;jj++){
        for (var ii = 0; ii < 11; ii++) {
            for (var jj = 0; jj < 6; jj++) {


                var i = modulo(Math.floor(-camera_x / 64 + ii), city_x);
                var j = modulo(Math.floor(-camera_y / 64 + jj), city_y);

                var xpos = Math.floor(-camera_x / 64 + ii) * grid_w;
                var ypos = Math.floor(-camera_y / 64 + jj) * grid_h;

                if (city[i][j]) {
                    draw_house(city[i][j], 0, xpos, ypos);

                    //this draws the road with the correct sprite
                } else {
                    var right = city[modulo((i + 1), city_x)][j];
                    var left = city[modulo((i - 1), city_x)][j];
                    var up = city[i][modulo((j - 1), city_y)];
                    var down = city[i][modulo((j + 1), city_y)];
                    // console.log(right+' '+left+' '+up+' '+down)

                    if (up == 0 && down == 0 && left == 0 && right == 0) {
                        draw_image(road_vh, xpos, ypos);

                    } else if (up != 0 && down != 0 && left == 0 && right == 0) {
                        draw_image(road_h, xpos, ypos);
                    } else if (up == 0 && down == 0 && left != 0 && right != 0) {
                        draw_image(road_v, xpos, ypos);

                    } else if (up != 0 && down == 0 && left == 0 && right == 0) {
                        draw_image(road_vh_up, xpos, ypos);
                    } else if (up == 0 && down != 0 && left == 0 && right == 0) {
                        draw_image(road_vh_down, xpos, ypos);
                    } else if (up == 0 && down == 0 && left != 0 && right == 0) {
                        draw_image(road_vh_left, xpos, ypos);
                    } else if (up == 0 && down == 0 && left == 0 && right != 0) {
                        draw_image(road_vh_right, xpos, ypos);

                    } else if (up != 0 && down == 0 && left == 0 && right != 0) {
                        draw_image(road_vh_right_up, xpos, ypos);
                    } else if (up == 0 && down != 0 && left == 0 && right != 0) {
                        draw_image(road_vh_right_down, xpos, ypos);
                    } else if (up != 0 && down == 0 && left != 0 && right == 0) {
                        draw_image(road_vh_left_up, xpos, ypos);
                    } else if (up == 0 && down != 0 && left != 0 && right == 0) {
                        draw_image(road_vh_left_down, xpos, ypos);

                    } else if (up == 0 && down != 0 && left != 0 && right != 0) {
                        draw_image(road_alone_up, xpos, ypos);
                    } else if (up != 0 && down == 0 && left != 0 && right != 0) {
                        draw_image(road_alone_down, xpos, ypos);
                    } else if (up != 0 && down != 0 && left == 0 && right != 0) {
                        draw_image(road_alone_left, xpos, ypos);
                    } else if (up != 0 && down != 0 && left != 0 && right == 0) {
                        draw_image(road_alone_right, xpos, ypos);
                    } else {
                        draw_image(road_alone, xpos, ypos);
                    }
                }
            }
        }
        // context.drawImage(papanoel, 0,0 );
        context.drawImage(papanoel, 5 * grid_w, 2 * grid_h);





    }


    var update_screen = function() {
        clear_canvas();
        draw_city(city);

        camera_x = camera_x + .1 * (camera_x_goal - camera_x);
        camera_y = camera_y + .1 * (camera_y_goal - camera_y);

        window.setTimeout(update_screen, 0);
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
            camera_x_goal -= 64;
        }
        else if (goal == "left") {
            camera_x_goal += 64;
        }
        else if (goal == "up") {
            camera_y_goal += 64;
        }
        else if (goal == "down") {
            camera_y_goal -= 64;
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