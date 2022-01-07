import BaseColorPicker from "../colorpicker/BaseColorPicker";
import EmbedColorPicker from "./EmbedColorPicker";
import { Gradient } from "./image-resource/Gradient";
import GradientEditor from "./GradientEditor";
import { ColorStep } from "./image-resource/ColorStep";
import { convertMatches, reverseMatches } from "../util/functions/parser";
import { RepeatingLinearGradient } from "./image-resource/RepeatingLinearGradient";
import { LinearGradient } from "./image-resource/LinearGradient";
import { RepeatingRadialGradient } from "./image-resource/RepeatingRadialGradient";
import { RadialGradient } from "./image-resource/RadialGradient";
import { RepeatingConicGradient } from "./image-resource/RepeatingConicGradient";
import { ConicGradient } from "./image-resource/ConicGradient";
import { Length } from "./Length";

const tabs = [
  { type: "linear-gradient", title: "Linear Gradient" },
  { type: "repeating-linear-gradient", title: "Repeating Linear Gradient" },
  { type: "radial-gradient", title: "Radial Gradient" },
  { type: "repeating-radial-gradient", title: "Repeating Radial Gradient" },
  { type: "conic-gradient", title: "Conic Gradient" },
  { type: "repeating-conic-gradient", title: "Repeating Conic Gradient" }
];
const reg = /((linear\-gradient|repeating\-linear\-gradient|radial\-gradient|repeating\-radial\-gradient|conic\-gradient|repeating\-conic\-gradient|url)\(([^\)]*)\))/gi;
 
export default class GradientPicker extends BaseColorPicker {
  components() {
    return {
      EmbedColorPicker,
      gradientEditor: GradientEditor
    }
  } 

  parseImage (str) {
    var results = convertMatches(str);
    let image = null;

    results.str.match(reg).forEach((value, index) => {

      value = reverseMatches(value, results.matches);
      if (value.includes("repeating-linear-gradient")) {
        image = RepeatingLinearGradient.parse(value);
      } else if (value.includes("linear-gradient")) {
        image = LinearGradient.parse(value);
      } else if (value.includes("repeating-radial-gradient")) {
        image = RepeatingRadialGradient.parse(value);
      } else if (value.includes("radial")) {
        image = RadialGradient.parse(value);
      } else if (value.includes("repeating-conic-gradient")) {
        image = RepeatingConicGradient.parse(value);
      } else if (value.includes("conic")) {
        image = ConicGradient.parse(value);
      }
    });

    return image
  }  

  /**
   * @override
   */
  callbackColorValue(color) {
    var gradientString = this.image.toString();
    if (typeof this.opt.onChange == 'function') {
        this.opt.onChange.call(this, gradientString, this.image);
    }

    if (typeof this.colorpickerShowCallback == 'function') {
        this.colorpickerShowCallback(gradientString, this.image);
    }        
  }

  /**
   * @override
   */
  callbackLastUpdateColorValue(color) {
    var gradientString = this.image.toString();
    if (typeof this.opt.onLastUpdate == 'function') {
        this.opt.onLastUpdate.call(this, gradientString, this.image);
    }
  }  

  callbackHideColorValue(color) {
    var gradientString = this.image.toString();
      if (typeof this.opt.onHide == 'function') {
          this.opt.onHide.call(this, gradientString, this.image);
      }

      if (typeof this.colorpickerHideCallback == 'function') {
          this.colorpickerHideCallback(gradientString, this.image);
      }        
  }    


  initialize() {
    super.initialize();


    this.$root.addClass('gradient-picker');
    this.selectedTab = "linear-gradient";

    this.setValue(this.opt.gradient || 'linear-gradient(to right, red 0%, yellow 100%)')

  }

  setValue (gradientString) {
    this.gradient = gradientString
    this.image = this.parseImage(this.gradient);
    this.selectTabContent(this.image.type);        
  }

  getValue () {
    return this.image.toString();
  }

  template() {
    return /*html*/`
      <div class="gradient-body">

        <div class='box'>
          <div class='gradient-preview'>
            <div class='gradient-view' ref='$gradientView'></div>
          </div>
          <div class="picker-tab">
            <div class="picker-tab-list" ref="$tab" data-value="static-gradient" data-is-image-hidden="false">
              ${tabs.map(it => {
                return `
                  <span 
                    class='picker-tab-item ${it.selected ? "selected" : ''}' 
                    data-selected-value='${it.type}'
                    title='${it.title}'
                  > 
                  <div class='icon'></div>
                  </span>`;
              }).join('')}
            </div>
          </div>
          <div target='gradientEditor'></div>

        </div>
        <div class='box'>
          <div target="EmbedColorPicker"></div>
        </div>
      </div>
     
    `;
  }

  getColorString() {

    if (!this.image) return '';

    var value = this.image.getColorString()

    return value; 
  }

  getCurrentStepColor() {
    var colorstep = this.image.colorsteps[this.selectColorStepIndex || 0] || {color: 'rgba(0, 0, 0, 1)'};
    return colorstep.color; 
  }

  '@changeGradientEditor' (data, isLastUpdate = false) {

    var colorsteps = data.colorsteps.map((it, index) => {
      return new ColorStep({
        color: it.color,
        percent: it.offset.value,
        cut: it.cut,
        index: (index + 1)  * 100 
      })
    })

    data = {
      ...data,
      type: this.selectedTab,
      colorsteps
    }

    this.image.reset(data);

    this.updateGradientPreview(isLastUpdate);
    // this.updateData(isLastUpdate);
  }


  "click $tab .picker-tab-item" (e) {
    const type = e.$delegateTarget.attr("data-selected-value");

    //TODO: picker 타입이 바뀌면 내부 속성도 같이 바뀌어야 한다.
    this.selectTabContent(type);
  }

  selectTabContent(type) {
    this.selectedTab = type;    
    this.refs.$tab.attr("data-value", type);

    // 설정된 이미지를 재생성한다. type 에 맞게 
    // 데이타 전송은 다 문자열로 하는게 나을까? 객체로 하는게 나을 까 ? 
    // json 형태로만 주고 받는게 좋을 듯 하다. 
    // 자체 객체가 있으니 다루기가 너무 힘들어지고 있다. 
    // 파싱 용도로만 쓰자. 

    this.image = this.createGradient({ type }, this.image);


    this.$store.emit('setGradientEditor',   this.getColorString(), this.selectColorStepIndex, this.image.type, this.image.angle, this.image.radialPosition, this.image.radialType)   

    var color = this.getCurrentStepColor();

    this['@selectColorStep'](color);


    this.updateGradientPreview(true);    

  }

  createGradient(data, gradient) {
    const colorsteps = data.colorsteps || gradient.colorsteps;

    // linear, conic 은 angle 도 같이 설정한다.
    const angle = data.angle || gradient.angle;

    // radial 은  radialType 도 같이 설정한다.
    const radialType = data.radialType || gradient.radialType || 'ellipse';
    const radialPosition = data.radialPosition || gradient.radialPosition || [Length.percent(50), Length.percent(50)];

    let json = gradient.clone().toJSON();
    delete json.itemType;
    delete json.type;

    switch (data.type) {
      case "linear-gradient":
        return new LinearGradient({ colorsteps, angle });
      case "repeating-linear-gradient":
        return new RepeatingLinearGradient({ colorsteps, angle });
      case "radial-gradient":
        return new RadialGradient({
          colorsteps,
          radialType,
          radialPosition
        });
      case "repeating-radial-gradient":
        return new RepeatingRadialGradient({
          colorsteps,
          radialType,
          radialPosition
        });
      case "conic-gradient":
        return new ConicGradient({
          colorsteps,
          angle,
          radialPosition
        });
      case "repeating-conic-gradient":
        return new RepeatingConicGradient({
          colorsteps,
          angle,
          radialPosition
        });
    }

    return new Gradient();
  }


  '@changeEmbedColorPicker' (color, isLastUpdate = false) { 
    this.$store.emit('setColorStepColor', color, isLastUpdate);
  }

  "@selectColorStep" (color) {
    this.EmbedColorPicker.setValue(color);
  }

  '@changeColorStep' (data = {}) {

    this.image.reset({
      ...data
    })

    this.updateGradientPreview();
    // this.updateData();
  }

  updateGradientPreview (isLastUpdate = false) {
    if (this.image) {
      this.refs.$gradientView.css('background-image', this.image.toString())
      this.updateData(isLastUpdate);      
    }

  }

  'mousedown $gradientView' (e) {
    this.mouseDown = true;
    this.mouseDownX = e.clientX;
    this.mouseDownY = e.clientY;
    this.rect = this.refs.$gradientView.rect();
  }

  'mousemove document' (e) {
    if (this.mouseDown) {
 

      var minX = this.rect.left;
      var maxX = this.rect.right;
      var minY = this.rect.top;
      var maxY = this.rect.bottom;

      var currentX = Math.min(Math.max(minX, e.clientX), maxX);
      var currentY = Math.min(Math.max(minY, e.clientY), maxY);

      var posX = Length.percent((currentX - minX) / (maxX - minX) * 100);
      var posY = Length.percent((currentY - minY) / (maxY - minY) * 100);

      this.$store.emit('changeRadialPosition', posX, posY);
    }
  }

  'mouseup document' (e) {
    if (this.mouseDown) {
      this.mouseDown = false;
      this.updateData(true);            
    }
  }

  updateData(isLastUpdate = false) {

    this.callbackChange();

    // on last update 
    if (isLastUpdate) {
      this.callbackLastUpdate();
    }
  }

}
