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
	alert("You can't play this game without a canvas !\n\nGo ask a nerd to add this line to your html :\n\n<canvas id=\"canvas\" width=\"640\" height=\"448\" style=\"display:block;margin:auto;\"></canvas>")
	alert("Or maybe stop using internet explorer 2 and consider really use your computer !")
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

	var papanoelImg = new Image();
	papanoelImg.src = 'img/papanoel_anim.png';
	var papanoelImgMirror = new Image();
	papanoelImgMirror.src = 'img/papanoel_mirror.png';

	var antipapanoelImg = new Image();
	antipapanoelImg.src = 'img/antipapanoel_anim3.png';
	var antipapanoelImgMirror = new Image();
	antipapanoelImgMirror.src = 'img/antipapanoel_anim3Mirror.png';
	var explosionImg = new Image();
	explosionImg.src = 'img/explosion-sprite.png';

	var explosionNoelImg = new Image();
	// explosionNoelImg.src = 'img/explosion-sprite.png';
	// explosionNoelImg.src = 'img/explosion_noel_color.png';
	explosionNoelImg.src = 'img/explosion_noel2.png';
	// explosionNoelImg.src = 'img/papanoel_fusion2.png';


	// 0 = road
	// 1 = house1
	// 2 = house2
	// 3 = house3
	// 4 = house4
	var city_x = 15;
	var city_y = 10;
	var city = generateCityMap(city_x, city_y);
	var sprMgr = new spriteMgr({canvas: canvas, world_x: city_x * grid_w, world_y: city_y * grid_h});
	var sprMgrBackground = new spriteMgr({canvas: canvas, world_x: city_x * grid_w, world_y: city_y * grid_h});
	
	sprMgrBackground.draw= function(){
		//clear canvas
		// this.canvas.width = this.canvas.width;
		var view_x = this.canvas.width;
		var view_y = this.canvas.height;
		//
		//console.log("nb sprites :" + this.spriteCount)
		var t;
		var array = [];
		for (t in this.spriteSet) {
			var s = this.spriteSet[t];
			// s.update();
			if (Math.abs(modulo(view_x / 2 - this.camera_x + s.x + s.width / 2, this.world_x) - view_x / 2) <= view_x * 0.75) {
				if (Math.abs(modulo(view_y / 2 - this.camera_y + s.y + s.height / 2, this.world_y) - view_y / 2) <= view_y * 0.75) {
					array.push(s);
				}
			}
		}
		array.sort(function(a, b) {
			// console.log(a.z==city_y*64-64 +1)
			// console.log(a.z + " and " + b.z + " and " + city_y*64)
			// if(a.z==city_y*64 -64 + 1|| b.z==city_y*64){
			// if( (a.z==city_y*64 -64 + 1 && b.z==1)  || (b.z==city_y*64 -64 + 1 && a.z==1) ){
				// return b.z-a.z;
			// }
			//FUCKING STUPID HACK BECAUSE THERE IS NO TIME !
			if(a.image==house_dance||a.image==antihouse_dance||a.image==house_dance_cadeau||a.image==antihouse_dance_cadeau){
				if(b.image==house_bg||b.image==wall){
					return 100;
				}
			}else if(b.image==house_dance||b.image==antihouse_dance||b.image==house_dance_cadeau||b.image==antihouse_dance_cadeau){
				if(a.image==house_bg||a.image==wall){
					return -100;
				}
			}
			return a.z - b.z;
		});
		for (var i = 0; i < array.length; i++) {
			array[i].render(this.context, view_x / 2 - this.camera_x, view_y / 2 - this.camera_y, this.world_x, this.world_y);
		}
	}


	generateCitySprites(sprMgrBackground, city);

// var house = new Image();
// house.src = 'img/house_dance.png';
	var papaSprite = sprMgr.addSprite({
		width: 64,
		height: 96,
		x: 0,
		y: 0,
		z: 1,
		image: papanoelImg,
		// image: house,
		duration: -1,
		numberOfFrames: 7
	});

	var addExplosion = function(daX, daY) {
		sprMgr.addSprite({
			// width: 64,
			// height: 96,
			width: 130,
			height: 130,
			// width: 128,
			// height: 128,
			x: daX,
			y: daY,
			z: 2,
			image: explosionImg,
			duration: 0,
			// period:2,
			// numberOfFrames: 13});
			numberOfFrames: 17});
	};
	var addExplosionNoel = function(daX, daY) {
		sprMgr.addSprite({
			width: 128,
			height: 128,
			x: daX,
			y: daY-fly_offset,
			z: 2,
			image: explosionNoelImg,
			duration: 0,
			period:1,
			// numberOfFrames: 13});
			numberOfFrames: 17});
	};
	

	var camera_x_goal = 0;
	var camera_y_goal = 0;


	var timeBeginPeriod = new Date().getTime();
	var timeSinceLastUpdate = new Date().getTime();

	//max fps
	var fps = 30;
	var timePosition = 0;
	// var timePeriod = 2;
	var loop_count = 0;
	var timePeriod = 4;
	var timeDirection = 1;
	var papaNoelShadowList = [];
	var tempPositions = [{x:0,y:0}];
	var fly_offset = 30;
	var update_world_frequency = 500;
	var house_filled=0;
	var game_end=0;
	var update_screen = function() {
		//update
		sprMgrBackground.camera_x += .3 * (camera_x_goal - sprMgrBackground.camera_x);
		sprMgrBackground.camera_y += .3 * (camera_y_goal - sprMgrBackground.camera_y);
		sprMgr.camera_x += .3 * (camera_x_goal - sprMgr.camera_x);
		sprMgr.camera_y += .3 * (camera_y_goal - sprMgr.camera_y);
		papaSprite.x = sprMgr.camera_x;
		papaSprite.y = sprMgr.camera_y-fly_offset;
		for(var i=0;i<papaNoelShadowList.length;i++)
			papaNoelShadowList[i].update();

		//draw
		var time_in_loop = (new Date().getTime() - timeBeginPeriod);
		var percentage = time_in_loop/update_world_frequency;

		sprMgrBackground.draw();
		sprMgr.draw();
		sprMgrBackground.update(percentage,loop_count);
		sprMgr.update(percentage,loop_count);

		//GUI
		if(house_filled>=house_count){
			context.fillStyle = "red";
		}else{
			context.fillStyle = "black";
		}
		context.font = "bolder 100px sans-serif";
		if(house_filled<10){
			context.fillText('0'+house_filled, 470, 400);				
		}else{
			context.fillText(house_filled, 470, 400);				
		}
		context.fillStyle = "black";
		context.font = "bolder 60px sans-serif";
		context.fillText(house_count, 530, 430);

		context.fillStyle = "red";
		context.font = "60px sans-serif";
		context.fillText(house_count, 530, 430);


		//END MESSAGE
		if(game_end){
			context.fillStyle = "red";
			context.font = "bolder 60px sans-serif";
			context.fillText('GAME OVER', 130, 100);
			context.fillStyle = "black";
			context.font = "60px sans-serif";
			context.fillText('GAME OVER', 131, 100);
			
			// context.fillStyle = "rgba(255,255,255,.5)";
			context.fillStyle = "black";
			context.font = "bolder 40px sans-serif";
			context.fillText('PRESS F5 to reload !', 50, 420);
			context.strokeStyle = "white";
			context.strokeText('PRESS F5 to reload !', 50, 420);

			//
			var message ='';
			var p = house_filled/house_count;
			if(p<.1){
				message='Try harder !';
			}else if (p<.2){
				message='You can do it !';
			}else if (p<.3){
				message='You are doing OK !';
			}else if (p<.4){
				message='You are getting it !';
			}else if (p<.5){
				message='Almost half !';
			}else if (p<.6){
				message='Not bad !';
			}else if (p<.7){
				message='Try even harder !';
			}else if (p<.8){
				message='A little more !';
			}else if (p<.9){
				message='Getting close !';
			}else if (p<1){
				message='Almost !';
			}else{
				message='Congratulation !\nYou win !';
			}

			context.fillStyle = "black";
			context.font = "bolder 40px sans-serif";
			context.fillText(message, 100, 270);
			context.strokeStyle = "white";
			context.strokeText(message, 100, 270);
		}

		//DEBUG
		// if(game_status){
			// if(house_filled>=house_count){
		// }
		// if (timeDirection > 0)
		// 	context.fillText(timePosition + " Forward time", 20, 40);
		// else
		// 	context.fillText(timePosition + " Reverse time", 20, 40);

		//call next
		var time_next=1000. / fps - (new Date().getTime() - timeSinceLastUpdate);
		timeSinceLastUpdate = new Date().getTime();
		//must be positive
		time_next=time_next>0?time_next:0;
		// var time_next=1000. / fps - timeSinceLastUpdate;
		window.setTimeout(update_screen, time_next);
	};

	var goal_set_to_null = function() {
		goal = "null";
	};

	var music = new Audio("8bp030-13-rugar-march_of_infinite_pride.mp3");
	var music_end1 = new Audio("wind.mp3");
	var music_end2 = new Audio("antipapanoel_song.mp3");

	var collision = function(x,y,papaNoelShadowList){

		for(var i=0;i<papaNoelShadowList.length;i++){
			if(
				  modulo(papaNoelShadowList[i].getTarget_x(),grid_w*city_x)
				==modulo(x                                  ,grid_w*city_x)
				&&
				  modulo(papaNoelShadowList[i].getTarget_y(),grid_h*city_y)
				==modulo(y                                  ,grid_h*city_y)
			){
				return papaNoelShadowList[i];
			}
		}

		return undefined;
	}

	var update_world = function() {
		timeBeginPeriod = new Date().getTime();
		loop_count++;

		if(game_status){
			music.play();
			//LE JEU ACCELERE !
			// update_world_frequency-=1;
			// if(update_world_frequency<200){
			// 	update_world_frequency=200;
			// }

			timePosition += timeDirection;
			tempPositions.push({x:camera_x_goal,y:camera_y_goal});
			for(var i=0;i<papaNoelShadowList.length;i++)
				papaNoelShadowList[i].update_world();
			if (timePosition === 0 || timePosition === timePeriod) {
				//TIME DIRECTION CHANGE
				timeDirection *= -1;
				// addExplosionNoel(papaSprite.x,papaSprite.y);
				addExplosion(papaSprite.x,papaSprite.y);
				var direction=0;
				if(papaSprite.image==papanoelImgMirror){
					direction=1;
				}
				papaNoelShadowList.push(new papaNoelShadow(tempPositions,-1,direction));
				tempPositions = [{x:camera_x_goal,y:camera_y_goal}];


				//invert houses!!			
				// for (var ii = 0; ii < city_x; ii++) {
				// 	for (var jj = 0; jj < city_y; jj++) {
				// 		if (city[ii][jj]==1) {
				// 			city[ii][jj]=3;
				// 			// console.log(city_sprite_array[ii][jj])
				// 			if(city_sprite_array[ii][jj].image == house_dance_cadeau){
				// 				city_sprite_array[ii][jj].image = antihouse_dance_cadeau;
				// 			}else {
				// 				city_sprite_array[ii][jj].image = antihouse_dance;
				// 			}
				// 		}else if (city[ii][jj]==3) {
				// 			city[ii][jj]=1;
				// 			if(city_sprite_array[ii][jj].image == antihouse_dance_cadeau){
				// 				city_sprite_array[ii][jj].image = house_dance_cadeau
				// 			}else {
				// 				city_sprite_array[ii][jj].image = house_dance
				// 			}						
				// 		}
				// 	}
				// }

			}
			// if((timePosition === 1&&timeDirection<0) || (timePosition === timePeriod - 1 && timeDirection>0)){
			// 	addExplosion(papaSprite.x,papaSprite.y);
			// }
			// console.log("update_world");




			var ii =Math.floor(modulo(camera_x_goal/grid_w,city_x)); 
			var jj =Math.floor(modulo(camera_y_goal/grid_h,city_y)); 
			if(city[ii][jj]==1){
				house_filled++;
				city_sprite_array[ii][jj].image=house_dance_cadeau;
			}
			if(city[ii][jj]==3){
				city_sprite_array[ii][jj].image=antihouse_dance;
			}








			if (goal === "right") {
				papaSprite.image=papanoelImg;
				var ii =Math.floor(modulo(camera_x_goal/grid_w+1,city_x)); 
				var jj =Math.floor(modulo(camera_y_goal/grid_h,city_y)); 
				if(city[ii][jj]!=2){
					camera_x_goal += grid_w;
				}
			}
			else if (goal === "left") {
				papaSprite.image=papanoelImgMirror;
				var ii =Math.floor(modulo(camera_x_goal/grid_w-1,city_x)); 
				var jj =Math.floor(modulo(camera_y_goal/grid_h,city_y)); 
				if(city[ii][jj]!=2){
					camera_x_goal -= grid_w;
				}
			}
			else if (goal === "up") {
				var ii =Math.floor(modulo(camera_x_goal/grid_w,city_x)); 
				var jj =Math.floor(modulo(camera_y_goal/grid_h-1,city_y)); 
				if(city[ii][jj]!=2){
					camera_y_goal -= grid_h;
				}
			}
			else if (goal === "down") {
				var ii =Math.floor(modulo(camera_x_goal/grid_w,city_x)); 
				var jj =Math.floor(modulo(camera_y_goal/grid_h+1,city_y)); 
				if(city[ii][jj]!=2){
					camera_y_goal += grid_h;
				}
			}
			var col = collision(camera_x_goal,camera_y_goal,papaNoelShadowList)
			if(col != undefined){
				update_world_frequency=1500;
				addExplosionNoel(camera_x_goal,camera_y_goal);
				game_end=1;
				music.pause();
				if(house_filled>=house_count){
					music_end2.play();
				}else{
					music_end1.play();
				}

				sprMgr.removeSprite(papaSprite);
				sprMgr.removeSprite(col);

				update_world=function(){
					update_world_frequency-=100;
					if(update_world_frequency<500){
						update_world_frequency=500;
					}

					timeBeginPeriod = new Date().getTime();
					loop_count++;
					window.setTimeout(update_world, update_world_frequency);
				}
			}
			//eviter les mouvements pas controlles
			// genre aller deux fois a droite aulieu d'une fois
			window.setTimeout(goal_set_to_null, 50);
		}
		window.setTimeout(update_world, update_world_frequency);
	};
	update_world();


	// 0 = not playing
	// 1 = playing
	var game_status=0;

	document.addEventListener('keydown', function(evt) {
		if(key_event_fx(evt, true) && game_status==0){
			// LET THE GAME BEGIN !
			game_status=1;
		}
	});
	// init the screen update sequence ! :¬D
	update_screen();


	// document.addEventListener('keyup', function (evt) {
	// 	piano_key_event_fx(evt,false);
	// 	draw_piano();
	// });

}

////////////////////////////////////////////////////////////////////
function key_event_fx(evt, mybool) {
	if (evt.keyCode === KEY_MAP['right']) {
		goal = "right"
		return 1;
		// camera_x-=8;
	}
	else if (evt.keyCode === KEY_MAP['left']) {
		goal = "left"
		return 1;
		// camera_x+=8;
	}
	if (evt.keyCode === KEY_MAP['up']) {
		goal = "up"
		return 1;
		// camera_y+=8;
	}
	else if (evt.keyCode === KEY_MAP['down']) {
		goal = "down"
		return 1;
		// camera_y-=8;
	}
	return 0;
}