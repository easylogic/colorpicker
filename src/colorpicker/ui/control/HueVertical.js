import VerticalSlider from '~/colorpicker/VerticalSlider';
import './ColorSlider.scss';

export default class HueVertical extends VerticalSlider {

  constructor(opt) {
    super(opt);
    this.minValue = 0;
    this.maxValue = 360;
  }

  template() {
    return `
      <nav class="el-cp-slider el-cp-slider--vertical el-cp-slider--hue">
        <p ref="$container" class="el-cp-slider__body">
          <i ref="$bar" class="el-cp-slider__brick"></i>
        </p>
      </nav>
    `;
  }

  getDefaultValue() {
    return this.$store.hsv.h;
  }

  refreshColorUI(e) {
    const dist = this.getCalculatedDist(e);
    this.changeColor({
      h: (dist / 100) * this.maxValue,
      type: 'hsv',
    });
  }

}
