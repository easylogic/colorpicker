import HueColor from "../../../util/HueColor";
import BaseSlider from "../../BaseSlider";

export default class HueScale extends BaseSlider {

    initialize () {
        super.initialize()
        this.minValue = 0
        this.maxValue = 360
        this.hueScaleDist = 0.05;
    }

    template () {
        return /*html*/`
            <div class="hue-scale">
                <div ref="$container" class="hue-scale-container">
                    <div ref="$bar" class="drag-bar"></div>
                </div>
            </div>
        `
    }

    getDefaultValue () {
        return this.$store.hsv.h
    }


    /** get calculated dist for domain value   */
    getCalculatedDist (e) {
        var current = e ? this.getMousePosition(e) : this.getCurrent(this.getDefaultValue() / this.maxValue);
        var dist = this.getDist(current);
        
        return dist; 
    }    

    refreshColorUI(e) {

        var dist = this.getCalculatedDist(e);
     
        const isDifferent = this.setColorUI(dist/100);

        // hue 가 변경되지 않은 상태면 changeColor 를 하지 않는다. 
        if (isDifferent !== true) {
            this.changeColor({
                h: (this.minValue + this.fullDist * (dist/100)) * 360,
                type: 'hsv'
            })
        }

    }     

    setColorUI(v) {
        let p;

        if (v) {
            p =  this.minValue + v * this.fullDist; 

            if (this.lastP === p) return true;

            this.lastP = p; 
        } else {

            p = (this.getDefaultValue() / 360);

            if (this.lastP === p) return true;

            this.lastP = p;                     

            let maxP = p + 0.05;
            let minP = p - 0.05; 

            if (maxP > 1) {
                const dist = maxP - 1
                maxP = 1;
                minP = 1 - this.hueScaleDist * 2;
            } else if (minP < 0) {
                const dist = Math.abs(minP);
                minP = 0;
                maxP = maxP + dist;
            }

            const list = HueColor.getHueScale(p, minP, maxP);

            // console.log(list, p, minP, maxP);

            this.list = list;

            const minValue = list[0].start; 
            const maxValue = list[list.length-1].start;
    
            this.minValue = minValue;
            this.maxValue = maxValue;

            const fullDist = this.maxValue - this.minValue;
            this.fullDist = fullDist;  
            

            const colorsteps = list.map(it => {
                return {
                    color: it.rgb,
                    percent: (it.start - minValue)/fullDist*100,
                    unit: '%'
                }
            })
    
            // console.log(colorsteps);
    
            this.refs.$container.css('background-image', `linear-gradient(to right, ${colorsteps.map(it => `${it.color} ${it.percent}${it.unit}`).join(',')})`);
        }

        if (p <= this.minValue) {
            p = this.minValue;
            this.refs.$bar.addClass('first').removeClass('last')
        } else if (p >= this.maxValue) {
            p = this.maxValue;
            this.refs.$bar.addClass('last').removeClass('first')
        } else {
            this.refs.$bar.removeClass('last').removeClass('first')
        }

        this.setMousePosition(this.getMaxDist() * ( (p-this.minValue) / this.fullDist));        
    }
}