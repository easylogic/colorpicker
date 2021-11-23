import Color from '@easylogic/color';
import BaseColorPicker from '~/colorpicker/BaseColorPicker';
import EmbedColorPicker from './EmbedColorPicker';
import GradientEditor from './GradientEditor';
import './index.scss';
import { RepeatingLinearGradient } from './image-resource/RepeatingLinearGradient';
import { LinearGradient } from './image-resource/LinearGradient';
import { RepeatingRadialGradient } from './image-resource/RepeatingRadialGradient';
import { RadialGradient } from './image-resource/RadialGradient';
import { RepeatingConicGradient } from './image-resource/RepeatingConicGradient';
import { ConicGradient } from './image-resource/ConicGradient';
import { Length } from './Length';
import { Gradient } from './image-resource/Gradient';
import { ColorStep } from './image-resource/ColorStep';


const tabs = [
  { type: "linear-gradient", title: "Linear Gradient" },
  { type: "repeating-linear-gradient", title: "Repeating Linear Gradient" },
  { type: "radial-gradient", title: "Radial Gradient" },
  { type: "repeating-radial-gradient", title: "Repeating Radial Gradient" },
  { type: "conic-gradient", title: "Conic Gradient" },
  { type: "repeating-conic-gradient", title: "Repeating Conic Gradient" }
];
const reg = /((linear\-gradient|repeating\-linear\-gradient|radial\-gradient|repeating\-radial\-gradient|conic\-gradient|repeating\-conic\-gradient|url)\(([^\)]*)\))/gi;

export default class DefaultGradientPicker extends BaseColorPicker {
  components() {
    return {
      EmbedColorPicker,
      GradientEditor
    }
  } 

  parseImage (str) {
    var results = Color.convertMatches(str);
    let image = null;

    results.str.match(reg).forEach((value, index) => {

      value = Color.reverseMatches(value, results.matches);
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


  callbackColorValue() {
    var gradientString = this.image.toString();
    if (typeof this.opt.onChange == 'function') {
        this.opt.onChange.call(this, gradientString, this.image);
    }

    if (typeof this.colorpickerShowCallback == 'function') {
        this.colorpickerShowCallback(gradientString, this.image);
    }        
  }

  callbackHideColorValue() {
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

    this.selectedTab = "linear-gradient";

    this.$root.el.classList = "";
    this.$root.el.classList.add('el-gradientpicker');

    this.setGradient(this.opt.gradient || 'linear-gradient(to right, red 0%, yellow 100%)')

  }

  setGradient (gradientString) {
    this.gradient = gradientString
    this.image = this.parseImage(this.gradient);
    this.selectTabContent(this.image.type);        
  }

  /**
   * get color
   *
   */
  getColor() {
    return this.getValue();
  }

  getValue () {
    return this.image.toString();
  }

  template() {
    return /*html*/`
      <div class="el-gradientpicker--default gradient-picker">
        <div class='box'>
          <div class='gradient-preview'>
            <div class='gradient-view' ref='$gradientView'>
            </div>
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
          <template target='GradientEditor'></template>

        </div>
        <div class='box'>
          <template target="EmbedColorPicker"></template>
        </div>
      </div>
     
    `;
  }

  getColorString() {

    if (!this.image) return '';

    var value = this.image.getColorString()

    return value; 
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

      var posX = Length.percent((currentX - minX) / (maxX - minX) * 100).round(100);
      var posY = Length.percent((currentY - minY) / (maxY - minY) * 100).round(100);

      this.$store.emit('changeRadialPosition', posX, posY);
    }
  }

  'mouseup document' (e) {
    if (this.mouseDown) {
      this.mouseDown = false;
    }
  }

  getCurrentStepColor() {
    var colorstep = this.image.colorsteps[this.selectColorStepIndex || 0] || {color: 'rgba(0, 0, 0, 1)'};
    return colorstep.color; 
  }

  '@changeGradientEditor' (data) {

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

    this.updateGradientPreview();
    this.updateData();
  }


  "click $tab .picker-tab-item" (e) {
    const type = e.$delegateTarget.attr("data-selected-value");

    this.selectTabContent(type);
  }

  selectTabContent(type) {
    this.selectedTab = type;    
    this.refs.$tab.attr("data-value", type);

    this.image = this.createGradient({ type }, this.image);


    this.$store.emit('setGradientEditor',   this.getColorString(), this.selectColorStepIndex, this.image.type, this.image.angle, this.image.radialPosition, this.image.radialType)   

    var color = this.getCurrentStepColor();

    this['@selectColorStep'](color);


    this.updateGradientPreview();    

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


  '@changeEmbedColorPicker' (color) { 
    this.$store.emit('setColorStepColor', color);
  }

  "@selectColorStep" (color) {
    this.EmbedColorPicker.setColor(color);
  }

  '@changeColorStep' (data = {}) {

    this.image.reset({
      ...data
    })

    this.updateGradientPreview();
    // this.updateData();
  }

  updateGradientPreview () {
    if (this.image) {
      this.refs.$gradientView.css('background-image', this.image.toString())
      this.updateData();      
    }

  }

  updateData() {
    this.callbackColorValue();
  }


}
