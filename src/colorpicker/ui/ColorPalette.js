import UIElement from '../UIElement';
import Event from '../../util/Event'
import Dom from '../../util/Dom';

const source = 'chromedevtool-palette';

export default class ColorPalette extends UIElement {

    template () {
        return /*html*/`
        <div class="color">
            <div ref="$saturation" class="saturation">
                <div ref="$value" class="value">
                    <div ref="$drag_pointer" class="drag-pointer" data-axis-value="all">
                        <div ref="$left_saturation" class="left-saturation" data-axis-value="saturation"></div>
                        <div ref="$right_saturation" class="right-saturation" data-axis-value="saturation"></div>
                        <div ref="$top_value" class="top-value" data-axis-value="value"></div>
                        <div ref="$bottom_value" class="bottom-value" data-axis-value="value"></div>
                    </div>
                </div>
            </div>        
        </div>        
        `
    }

    setBackgroundColor (color) {
        this.$el.css("background-color", color);
    }

    refresh () {
        this.cacheSize();              
        this.setColorUI();
    }
 
    calculateSV () {
        var pos = this.drag_pointer_pos || { x : 0, y : 0 };

        var width = this.state.get('$el.width');
        var height = this.state.get('$el.height');

        var s = (pos.x / width);
        var v = ((height - pos.y) / height);

        this.$store.dispatch('/changeColor', {
            type: 'hsv',
            s,
            v,
            source
        })        
    }

    setColorUI() {
        var  x = this.w * this.$store.hsv.s, 
        y = this.h * ( 1 - this.$store.hsv.v );
    
        this.refs.$drag_pointer.css({
            left : x + "px",
            top : y + "px"
        });
    
        this.drag_pointer_pos = { x , y };

        this.setBackgroundColor(this.$store.dispatch('/getHueColor'))
    }

    setSubColor(e) {
        const localX = e.pageX;
        const localY = e.pageY;
    
        const distX = localX - this.x;
        const distY = localY - this.y;
    
        var w = this.$el.contentWidth();
        var h = this.$el.contentHeight();
    
        var x = this.refs.$drag_pointer.cssFloat("left");
        var y = this.refs.$drag_pointer.cssFloat("top");
    
        if (this.axis === 'saturation') {
          x += distX;      
        } else if (this.axis === 'value') {
          y += distY;
        }
    
        if (x < 0) x = 0;
        else if (x > w) x = w;
    
        if (y < 0) y = 0;
        else if (y > h) y = h;
    
        this.refs.$drag_pointer.px("left", x);
        this.refs.$drag_pointer.px("top", y);
    
        this.drag_pointer_pos = { x, y };
    
        this.x = localX;    
        this.y = localY;
    
    
        this.calculateSV();
      }      

    setMainColor(e) {
        // e.preventDefault();
        var pos = this.$el.offset();         // position for screen
        var w = this.w;
        var h = this.h;

        var x = Event.pos(e).pageX - pos.left;
        var y = Event.pos(e).pageY - pos.top;

        if (x < 0) x = 0;
        else if (x > w) x = w;
    
        if (y < 0) y = 0;
        else if (y > h) y = h;
    
        this.refs.$drag_pointer.css({
            left: x  + 'px',
            top: y + 'px'
        });
    
        this.drag_pointer_pos = { x , y }

        this.calculateSV()
    }    

    '@changeColor' (sourceType) {
        if (source != sourceType) {
            this.refresh()
        }
    }

    '@initColor' () { this.refresh() }    

    'mouseup document' (e) {
        if (this.isDown) {
            this.isDown = false; 
            this.$store.emit('lastUpdateColor');            
        }
    }    

    'mousemove document' (e) {
        if (this.isDown) {
            this.cacheSize();
            if (this.axis === 'saturation' || this.axis === 'value') {
                this.setSubColor(e);
            } else {
                this.setMainColor(e);
            }  
        }
    }

    mousedown (e) {
        this.isDown = true; 
        this.cacheSize();        
        this.axis = new Dom(e.target).attr('data-axis-value');    
        this.x = e.pageX;
        this.y = e.pageY;
    
        if (this.axis === 'saturation' || this.axis === 'value') {
          this.setSubColor(e);
        } else {
          this.setMainColor(e);
        }
    }    

    'touchend document' (e) {
        if (this.isDown) {
            this.isDown = false; 
            this.$store.emit('lastUpdateColor');            
        }
    }    

    'touchmove document' (e) {
        if (this.isDown) {
            this.setMainColor(e);
        }
    }

    touchstart (e) {
        e.preventDefault()
        this.isDown = true; 
        this.cacheSize();        
        this.setMainColor(e);
    }

    cacheSize () {
        this.w = this.state.get('$el.contentWidth');
        this.h = this.state.get('$el.contentHeight');
    }
    
}
