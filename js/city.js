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
function generateCityMap(city_x, city_y) {
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
            if (right === 0 && up === 0 && right_up === 0) {
                city[i][j] = 1;
            }
            if (right === 0 && down === 0 && right_down === 0) {
                city[i][j] = 1;
            }
            if (left === 0 && up === 0 && left_up === 0) {
                city[i][j] = 1;
            }
            if (left === 0 && down === 0 && left_down === 0) {
                city[i][j] = 1;
            }

        }
    }
    return city;
}

function generateCitySprites(sprMgr, cityMap) {
    var grid_size = 64;
    for (var ii = 0; ii < cityMap.length; ii++) {
        for (var jj = 0; jj < cityMap[0].length; jj++) {

            if (city[ii][jj]) {
                sprMgr.addSprite({
                    width: grid_size,
                    height: grid_size,
                    x: ii * grid_size,
                    y: jj * grid_size,
                    z: 0,
                    image: house,
                    duration: -1,
                    numberOfFrames: 1
                });
                //this draws the road with the correct sprite
            } else {
                var right = city[modulo((ii + 1), city_x)][jj];
                var left = city[modulo((ii - 1), city_x)][jj];
                var up = city[ii][modulo((jj - 1), city_y)];
                var down = city[ii][modulo((jj + 1), city_y)];
                // console.log(right+' '+left+' '+up+' '+down)

                if (up == 0 && down == 0 && left == 0 && right == 0) {
                    sprMgr.addSprite({width: grid_size, height: grid_size, x: ii * grid_size, y: jj * grid_size, z: 0,
                        image: road_vh, duration: -1, numberOfFrames: 1});

                } else if (up != 0 && down != 0 && left == 0 && right == 0) {
                    sprMgr.addSprite({width: grid_size, height: grid_size, x: ii * grid_size, y: jj * grid_size, z: 0,
                        image: road_h, duration: -1, numberOfFrames: 1});
                } else if (up == 0 && down == 0 && left != 0 && right != 0) {
                    sprMgr.addSprite({width: grid_size, height: grid_size, x: ii * grid_size, y: jj * grid_size, z: 0,
                        image: road_v, duration: -1, numberOfFrames: 1});

                } else if (up != 0 && down == 0 && left == 0 && right == 0) {
                    sprMgr.addSprite({width: grid_size, height: grid_size, x: ii * grid_size, y: jj * grid_size, z: 0,
                        image: road_vh_up, duration: -1, numberOfFrames: 1});
                } else if (up == 0 && down != 0 && left == 0 && right == 0) {
                    sprMgr.addSprite({width: grid_size, height: grid_size, x: ii * grid_size, y: jj * grid_size, z: 0,
                        image: road_vh_down, duration: -1, numberOfFrames: 1});
                } else if (up == 0 && down == 0 && left != 0 && right == 0) {
                    sprMgr.addSprite({width: grid_size, height: grid_size, x: ii * grid_size, y: jj * grid_size, z: 0,
                        image: road_vh_left, duration: -1, numberOfFrames: 1});
                } else if (up == 0 && down == 0 && left == 0 && right != 0) {
                    sprMgr.addSprite({width: grid_size, height: grid_size, x: ii * grid_size, y: jj * grid_size, z: 0,
                        image: road_vh_right, duration: -1, numberOfFrames: 1});

                } else if (up != 0 && down == 0 && left == 0 && right != 0) {
                    sprMgr.addSprite({width: grid_size, height: grid_size, x: ii * grid_size, y: jj * grid_size, z: 0,
                        image: road_vh_right_up, duration: -1, numberOfFrames: 1});
                } else if (up == 0 && down != 0 && left == 0 && right != 0) {
                    sprMgr.addSprite({width: grid_size, height: grid_size, x: ii * grid_size, y: jj * grid_size, z: 0,
                        image: road_vh_right_down, duration: -1, numberOfFrames: 1});
                } else if (up != 0 && down == 0 && left != 0 && right == 0) {
                    sprMgr.addSprite({width: grid_size, height: grid_size, x: ii * grid_size, y: jj * grid_size, z: 0,
                        image: road_vh_left_up, duration: -1, numberOfFrames: 1});
                } else if (up == 0 && down != 0 && left != 0 && right == 0) {
                    sprMgr.addSprite({width: grid_size, height: grid_size, x: ii * grid_size, y: jj * grid_size, z: 0,
                        image: road_vh_left_down, duration: -1, numberOfFrames: 1});

                } else if (up == 0 && down != 0 && left != 0 && right != 0) {
                    sprMgr.addSprite({width: grid_size, height: grid_size, x: ii * grid_size, y: jj * grid_size, z: 0,
                        image: road_alone_up, duration: -1, numberOfFrames: 1});
                } else if (up != 0 && down == 0 && left != 0 && right != 0) {
                    sprMgr.addSprite({width: grid_size, height: grid_size, x: ii * grid_size, y: jj * grid_size, z: 0,
                        image: road_alone_down, duration: -1, numberOfFrames: 1});
                } else if (up != 0 && down != 0 && left == 0 && right != 0) {
                    sprMgr.addSprite({width: grid_size, height: grid_size, x: ii * grid_size, y: jj * grid_size, z: 0,
                        image: road_alone_left, duration: -1, numberOfFrames: 1});
                } else if (up != 0 && down != 0 && left != 0 && right == 0) {
                    sprMgr.addSprite({width: grid_size, height: grid_size, x: ii * grid_size, y: jj * grid_size, z: 0,
                        image: road_alone_right, duration: -1, numberOfFrames: 1});
                } else {
                    sprMgr.addSprite({width: grid_size, height: grid_size, x: ii * grid_size, y: jj * grid_size, z: 0,
                        image: road_alone, duration: -1, numberOfFrames: 1});
                }
            }
        }
    }
}

