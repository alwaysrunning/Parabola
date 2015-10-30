(function(){

    function now(){
        return new Date().getTime()
    }

    function toInteger(text){
        var text = parseInt(text)
        return text ? text : 0
    }

    function Parabola(opts){
        this.init(opts)
    }

    Parabola.prototype.init = function(opts){
        this.option = opts
        this.defaults = {
            el : '#boll',
            offset : [100,200],
            curvature : 0.001,
            duration : 500,
            autostart : false,
            targetEl : null,
            callback : null
        }
        this.options = this.getOptions();
        this.$el = $(this.options.el);
        this.targetEl=this.options.targetEl
        this.autostart = this.options.autostart;
        this.elOriginLeft = this.$el.offset().left;
        this.elOriginTop = this.$el.offset().top;
        if(this.targetEl){
            this.driftx = this.targetEl.offset().left - this.elOriginLeft;
            this.drifty = this.targetEl.offset().top - this.elOriginTop;
        }else{
            this.driftx = this.options.offset[0];
            this.drifty = this.options.offset[1];
        }
        this.duration = this.options.duration;
        this.curvature = this.options.curvature;
        this.timerId = null;

        this.b = this.drifty/this.driftx - this.curvature*this.driftx;
        if(this.autostart){
            this.start();
        }
    }
    
    Parabola.prototype.getOptions = function(){
        var result = $.extend({},this.defaults,this.option)
        return result;
    }

    Parabola.prototype.start = function(){
        console.log(this.options)
        var self = this;
        this.begin = now();
        this.end = this.begin + this.duration;
        this.timerId && clearInterval(this.timerId)
        this.timerId = setInterval(function(){
            var t = now()
            self.step(t)
        },13)
    }

    Parabola.prototype.step = function(now){
        if(this.driftx==0 && this.drifty==0) return

        if(now<this.end){
            var x = this.driftx*((now - this.begin)/this.duration)
            //var y = this.drifty*((now - this.begin)/this.duration)
            var y = this.curvature * x * x + this.b * x
            this.domove(x,y)
        }else{
            this.stop();
            var x = this.driftx;
            var y = this.drifty;
            this.domove(x,y)
            if(this.options.callback){
                this.options.callback()
            }
        }
        
    }
    Parabola.prototype.reset = function(){
        this.stop();
        this.$el.css({
            left:this.elOriginLeft,
            top:this.elOriginTop
        })
    }
    Parabola.prototype.stop = function(){
        if(!!this.timerId)
            clearInterval(this.timerId)
    }
    Parabola.prototype.setOptions = function(opt){
        this.targetEl = opt.targetEl;
        this.curvature = opt.curvature
        this.init(opt)
    }
    Parabola.prototype.domove = function(x,y){
        this.$el.css({
            left:x+this.elOriginLeft,
            top:y+this.elOriginTop,
        })
    }

    window.Parabola = Parabola
})()