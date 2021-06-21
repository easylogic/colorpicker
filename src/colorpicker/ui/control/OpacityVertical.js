import Color from '@easylogic/color';
import VerticalSlider from '~/colorpicker/VerticalSlider';

export default class Opacity extends VerticalSlider {

  constructor(opt) {
    super(opt);
    this.source = 'vertical-opacity-control';
  }

  template() {
    return `
      <div class="el-cp-slider el-cp-slider--vertical el-cp-slider--alpha">
        <p ref="$container" class="el-cp-slider__body">
          <span ref="$colorbar" class="el-cp-slider__bar"></span>
          <i ref="$bar" class="el-cp-slider__brick"></i>
        </p>
      </div>
    `;
  }

  refresh() {
    super.refresh();
    this.setOpacityColorBar();
  }

  setOpacityColorBar() {
    const start = Color.format({ ...this.$store.rgb, a: 0 }, 'rgb');
    const end = Color.format({ ...this.$store.rgb, a: 1 }, 'rgb');
    this.refs.$colorbar.css('background', `linear-gradient(to top, ${start}, ${end})`);
  }

  getDefaultValue() {
    return this.$store.alpha;
  }

  refreshColorUI(e) {
    const dist = this.getCaculatedDist(e);
    this.setColorUI((dist / 100 * this.maxValue));
    this.changeColor({
      a: Math.floor(dist) / 100 * this.maxValue,
    });
  }

}
