function Scroller() {
    
}
Scroller.prototype = {
    // el: document.getElementById("inner"),
    // parent: document.getElementById("parent"),
    cancelled: true,
    throttle: function(callback, timeout) {
        if (this.timekeeper) {
            window.clearTimeout(this.timekeeper);
        }
        this.timekeeper = window.setTimeout(function(){
            callback();
            window.clearTimeout(this.timekeeper);
        }, timeout || 300);
    },
    debounce: function(callback, timeout) {
        if (this.timekeeper) {
            window.clearInterval(this.timekeeper);
        }
        this.timekeeper = window.setInterval(function(){
            callback();
            window.clearInterval(this.timekeeper);
        }, timeout || 300);
    },
    handleEvent: function(event) {
        // console.log('handling events');
        switch(event.type) {
        
            case 'touchstart':
            case 'mousedown':
            // console.log('touchstart / mousedown registered');
            this.start(event);
            break;
            
            case 'touchmove':
            case 'mousemove':
            // console.log('touchmove / mousedown registered');
            this.move(event);
            break;
            
            case 'mouseup':
            case 'touchend':
            case 'touchcancel':
            // console.log('touchend / touchcancel / mouseup registered');
            this.end(event);
            break;
            
            default:
            // console.log('default registered');
            break;
            
        }
    },
    
    attachEventListeners: function() {
        document.addEventListener("touchstart", this, false);
        document.addEventListener("mousedown", this, false);

        document.addEventListener("touchmove", this, false);
        document.addEventListener("mousemove", this, false);

        document.addEventListener("touchend", this, false);
        document.addEventListener("touchcancel", this, false);
        document.addEventListener("mouseup", this, false);
        return this;
    },
    
    animate: function(){
        if (this.cancelled) {
            console.log('animating: end');
            return this;
        }
        console.log('animating');
    },
    move: function(event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.cancelled) {
            return this;
        }
        var THIS = this;
        var point = event.touches ? event.touches[0] : event;
        this.currentX = point.x;
        this.currentY = point.y;
        this.currentTime = Date.now () || (new Date()).getTime();
        this.throttle(function(){
            console.log('moving');
            this.animate(); // alternatively, THIS.animate();
        }.bind(this), 100);
    },
    


    end: function(event) {
        event.preventDefault();
        event.stopPropagation();
        this.cancelled = true;
        
        var point = event.touches ? event.touches[0] : event;
        this.endX = point.x;
        this.endY = point.y;
        this.endTime = Date.now () || (new Date()).getTime();
        this.animate();
        console.log('end');
    },
    
    start: function(event) {
        var point = event.touches ? event.touches[0] : event;
        event.preventDefault();
        event.stopPropagation();
        this.startTime = Date.now () || (new Date()).getTime();
        this.cancelled = false;
        this.startX = point.x;
        this.startY = point.y;
        console.log('touchstart');
    },
    init: function() {
        this.attachEventListeners();
        return this;
    }
    
}


var scrollerInstance1
document.onreadystatechange = onready;
//document.addEventListener('readystatechange', onready);
//document.addEventListener('DOMContentLoaded', onready);
function onready(){
    console.log('ready now');
    scrollerInstance1 = new Scroller().init();
}

