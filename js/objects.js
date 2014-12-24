function papaNoelShadow(positions, type,direction) {
	// var fly_offset = 60;
	
	var xList = [], yList = [];
	for (var i = 0; i < positions.length; i++) {
		xList.push(positions[i].x);
		yList.push(positions[i].y);
	}
	this.sprite = sprMgr.addSprite({
		width: 64,
		height: 96,
		x: xList[0],
		y: yList[0]-fly_offset,
		z: .9,
		image: papanoelImg,
		duration: -1,
		numberOfFrames: 7});
	// var target_x, target_y;
	var target_x, target_y;
	this.getTarget_x=function(){
		return target_x;
	}
	this.getTarget_y=function(){
		return target_y;
	}
	this.timeDirection = type;
	if (type < 0) {
		this.timePos = xList.length - 2;
		this.sprite.x = xList[xList.length - 1];
		this.sprite.y = yList[yList.length - 1]-fly_offset;
		if(direction==0){
			this.sprite.image = antipapanoelImg;
		}else{
			this.sprite.image = antipapanoelImgMirror;
		}
	} else {
		this.timePos = 1;
	}
	target_x = xList[this.timePos], target_y = yList[this.timePos];
	this.update = function() {
		this.sprite.x += 0.2 * (target_x - this.sprite.x);
		this.sprite.y +=fly_offset;
		this.sprite.y += 0.2 * (target_y - this.sprite.y);
		this.sprite.y -=fly_offset;
	};
	this.update_world = function() {
		if (this.timeDirection === -1 && this.timePos === 0) {
			this.timeDirection = 1;
			this.sprite.image = papanoelImg;
		} else if (this.timeDirection === 1 && this.timePos === xList.length - 1) {
			this.timeDirection = -1;
			this.sprite.image = antipapanoelImg;
		}
		if(this.timeDirection === 1 && this.timePos === xList.length - 2){
			addExplosion(xList[xList.length - 1],yList[yList.length - 1]-fly_offset);
		}

		//house sprite (cadeaux)
		var ii =Math.floor(modulo(target_x/grid_w,city_x)); 
		var jj =Math.floor(modulo(target_y/grid_h,city_y)); 
		if(city[ii][jj]==1){
			if(this.timeDirection==1){
				city_sprite_array[ii][jj].image=house_dance_cadeau;
			}else{
				city_sprite_array[ii][jj].image=house_dance;
			}
		}
		if(city[ii][jj]==3){
			if(this.timeDirection==1){
				city_sprite_array[ii][jj].image=antihouse_dance;
			}else{
				city_sprite_array[ii][jj].image=antihouse_dance_cadeau;
			}
		}


		var target_x_old = xList[this.timePos];
		this.timePos += this.timeDirection;
		target_x = xList[this.timePos], target_y = yList[this.timePos];
		//show the right sprite
		if(target_x_old>target_x){
			if(this.sprite.image==antipapanoelImgMirror){
				this.sprite.image = antipapanoelImg
			}else
			if(this.sprite.image==papanoelImg){
				this.sprite.image = papanoelImgMirror
			}
		}else{
			if(this.sprite.image==antipapanoelImg){
				this.sprite.image = antipapanoelImgMirror
			}else
			if(this.sprite.image==papanoelImgMirror){
				this.sprite.image = papanoelImg
			}
		}
	};
}
