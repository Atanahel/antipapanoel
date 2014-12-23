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
		z: 0.9,
		image: papanoelImg,
		duration: -1,
		numberOfFrames: 7});
	var target_x, target_y;
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
		var target_x_old = xList[this.timePos];
		this.timePos += this.timeDirection;
		target_x = xList[this.timePos], target_y = yList[this.timePos];
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
