import BaseSlider from '~/colorpicker/BaseSlider';
import './ColorSlider.scss';

export default class Hue extends BaseSlider {

  constructor(opt) {
    super(opt)
    this.minValue = 0;
    this.maxValue = 360;
    this.source = 'hue-control';
  }

  template() {
    return /*html*/`
      <nav class="el-cp-slider el-cp-slider--hue">
        <p ref="$container" class="el-cp-slider__body">
          <i ref="$bar" class="el-cp-slider__pointer"></i>
        </p>
      </nav>
    `;
  }

  getDefaultValue() {
    return this.$store.hsv.h;
  }
  refreshColorUI(e) {
    const dist = this.getCaculatedDist(e);
    const isDifferent = this.setColorUI(dist / 100 * this.maxValue);
    if (!!isDifferent) return;
    this.changeColor({
      h: (dist / 100) * this.maxValue,
      type: 'hsv',
    });
  }

}
