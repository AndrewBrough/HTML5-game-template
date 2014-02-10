var Game = function(){
    var canvas = document.getElementById("canvas"),
        self = this;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.context = canvas.getContext('2d');
    
    //time
    this.startTime = 0;
    this.lastTime = 0;
    this.gameTime = 0;
    this.fps = 0;
    this.STARTING_FPS = 60;
    //trackers
    this.timeSinceLastFrame = 0;
    //stats
    this.showStats = false;
    
    //game objects
    this.p1 = new Player(this.context);
    this.coins = [];
    
    //helpers
    this.scoreItemEvent = new Event(5);
    this.generator = new generator();
    //Key helper for gameplay
    window.addEventListener('keydown', function(e){
        Key.onKeydown(e);
    }, false);
    window.addEventListener('keyup', function(e){
        Key.onKeyup(e);
    }, false);
    
    //non gameplay input
     window.addEventListener('keydown', function(e){
        if(e.keyCode == Key.TILDE)
            self.showStats = !self.showStats;
    });
    
    return this;
}
Game.prototype = {
    start: function(){
        var self = this;
        this.startTime = new Date();
        
        window.requestAnimationFrame(
            function(time){
                self.animate.call(self, time);
            }
        );
    },
    animate: function(time){
        var self = this;
        this.tick(time);
        //get input
        this.checkKeys();
        
        //clear screen
        this.context.fillStyle = "#FFF"
        this.context.fillRect(0,0,window.innerWidth, window.innerHeight);
        
        //UPDATE~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        this.p1.update();
        //coins
        if(this.scoreItemEvent.timeSinceLastEvent >= 1000*this.scoreItemEvent.timesPerSecond){
            var newCoins = this.generator.makeCoins(this.context, this.gameTime, 1);
            for(i=0;i<newCoins.length;i++)
                this.coins.push(newCoins[i]);
            this.scoreItemEvent.timeSinceLastEvent = 0;
        }
        
        for(i=this.coins.length-1; i>=0; i--){
            this.coins[i].update(this.gameTime);
//            if(i==0)
//                console.log(this.coins[i].position.y);
        }
        //remove coins that are offscreen
        for(i=this.coins.length-1; i>=0; i--){
            if(this.coins[i].position.y > window.innerHeight+50)
                this.coins.splice(i,1);
        }
        
        //DRAW~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        this.p1.draw("#000");
        for(i=this.coins.length-1; i>=0; i--){
            this.coins[i].draw("#000");
        }
        
        //END~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        if(this.showStats)
            this.printStats();
        this.frameNumber++;
        //call next frame
        window.requestAnimationFrame(
            function(time){
                self.animate.call(self, time);
            }
        );
    },
    checkKeys: function(){
        if(Key.isDown(Key.A)){
            this.p1.move(-10,0);
        }
        if(Key.isDown(Key.D)){
            this.p1.move(10,0);
        }
    },
    tick: function(time){
        this.updateFrameRate(time);
        this.gameTime = new Date() - this.startTime;
        this.lastTime = time;
        this.timeSinceLastFrame = time - this.gameTime;
        this.scoreItemEvent.timeSinceLastEvent += this.timeSinceLastFrame;
    },
    updateFrameRate: function (time) {
        if (this.lastTime === 0) this.fps = this.STARTING_FPS;
        else this.fps = 1000 / (time - this.lastTime);
    },
    printStats: function(){
        this.context.font = "20px Arial";
        this.context.filstyle = "#000";
        this.context.fillText("fps: "+Math.round(this.fps), 1, 20);
        this.context.fillText("timeSinceLastFrame: "+Math.round(this.timeSinceLastFrame), 1, 40);
        this.context.fillText("gameTime: "+Math.round(this.gameTime), 1, 60);
        
    }
}
