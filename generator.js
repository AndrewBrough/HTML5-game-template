var generator = function(){
}

generator.prototype = {
    makeCoins: function(context, gameTime, numCoins){
        var coins = [];
        for(i = 0; i<numCoins; i++)
            coins.push(new Coin(context, (Math.sin(gameTime/1000)*window.innerWidth/2) +window.innerWidth/2, 0));
        
        return coins;
    }
}