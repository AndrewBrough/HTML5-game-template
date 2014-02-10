//key helper
var Key = {
    pressedKeys: {},
    UP: 38,
    DOWN: 40,
    W: 87,
    S: 83,
    A: 65,
    D: 68,
    SPACE: 32,
    ESCAPE: 27,
    TILDE: 192,
    ONE: 49,
    
    isDown: function(keyCode) {
        return this.pressedKeys[keyCode];
    },
    onKeydown: function(event) {
        this.pressedKeys[event.keyCode] = true;
    },
    onKeyup: function(event) {
        delete this.pressedKeys[event.keyCode];
    }
}

var Event = function(timesPerSecond){
    this.timeSinceLastEvent = 0;
    this.timesPerSecond = timesPerSecond;
    
}
Event.prototype = {
    
}