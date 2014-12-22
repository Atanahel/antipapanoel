function papaNoelShadow(positions, type) {
    var xList = [], yList = [];
    for (var i = 0; i < positions.length; i++) {
        xList.push(positions[i].x);
        yList.push(positions[i].y);
    }
    this.sprite = sprMgr.addSprite({width: grid_size,
        height: grid_size,
        x: xList[0],
        y: yList[0],
        z: 0.9,
        image: papanoelImg,
        duration: -1,
        numberOfFrames: 1});
    var target_x, target_y;
    this.timeDirection = type;
    if (type < 0) {
        this.timePos = xList.length - 2;
        this.sprite.x = xList[xList.length - 1];
        this.sprite.y = yList[yList.length - 1];
        this.sprite.image = antipapanoelImg;
    } else {
        this.timePos = 1;
    }
    target_x = xList[this.timePos], target_y = yList[this.timePos];
    this.update = function() {
        this.sprite.x += 0.2 * (target_x - this.sprite.x);
        this.sprite.y += 0.2 * (target_y - this.sprite.y);
    };
    this.update_world = function() {
        if (this.timeDirection === -1 && this.timePos === 0) {
            this.timeDirection = 1;
            this.sprite.image = papanoelImg;
        } else if (this.timeDirection === 1 && this.timePos === xList.length - 1) {
            this.timeDirection = -1;
            this.sprite.image = antipapanoelImg;
            addExplosion(this.sprite.x,this.sprite.y);
        }
        this.timePos += this.timeDirection;
        target_x = xList[this.timePos], target_y = yList[this.timePos];
    };
}