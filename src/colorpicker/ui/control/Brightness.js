import BaseSlider from '~/colorpicker/BaseSlider';
import './ColorSlider.scss';

export default class Brightness extends BaseSlider {

  constructor(opt) {
    super(opt);
    this.minValue = 0;
    this.maxValue = 1;
  }

  template() {
    return `
      <nav class="el-cp-slider el-cp-slider--brightness">
        <p ref="$container" class="el-cp-slider__body">
          <i ref="$bar" class="el-cp-slider__circle"></i>
        </p>
      </nav>
    `;
  }

  getDefaultValue() {
    return this.$store.hsv.v;
  }

  refreshColorUI(e) {
    const dist = this.getCalculatedDist(e);
    this.setColorUI(dist / 100 * this.maxValue);
    this.changeColor({
      type: 'hsv',
      v: dist / 100 * this.maxValue,
    });
  }

}
