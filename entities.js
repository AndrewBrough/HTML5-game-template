//PLAYER~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var Player = function(context){
    this.context = context;
    this.size = {
        x:100,
        y:100
    };
    this.position = {
        x:window.innerWidth/2,
        y:window.innerHeight/2,
        targetX:0,
        targetY:0
    };
    this.scale = {
        x:1,
        y:1
    };
}
Player.prototype = {
    move: function(targetX, targetY){
        this.position.targetX += targetX;
        this.position.targetY += targetY;
    },
    update: function(){
        this.position.x += this.position.targetX;
        this.position.y += this.position.targetY;
        this.position.targetX *= 0.7;
        this.position.targetY *= 0.7;
    },
    draw: function(fill){
        this.context.save();//push
        this.context.beginPath();
        this.context.translate(this.position.x-this.size.x/2, this.position.y - this.size.y/2);
        this.context.rect(0,0, this.size.x, this.size.y);
        this.context.clip();
        this.context.restore();//pop
        //draw gradient into mask
        this.context.fillStyle = fill;
        this.context.fill();
    }
}




//COINS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var Coin = function(context, posx, posy){
    this.context = context;
    this.position = {
        x:posx,
        y:posy
    }
    this.scale = {
        x:1,
        y:1
    }
    this.cycle = 0;
}
Coin.prototype = {
    update: function(gameTime){
        this.position.y+=5;
//        console.log(this.position.y);
        //this.scale.x = Math.abs(Math.sin(gameTime/100));
    },
    draw: function(bgGrad){
        this.context.save();
        this.context.beginPath();
        this.context.translate(this.position.x, this.position.y);
        this.context.scale(this.scale.x,this.scale.y);
        this.context.arc(0, 0, 10,0,Math.PI*2,0);
        this.context.clip();
        this.context.restore();
        //draw gradient into clip
        this.context.fillStyle = bgGrad;
        this.context.fill();
    }
}