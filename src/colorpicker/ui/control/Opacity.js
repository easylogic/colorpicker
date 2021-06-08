import BaseSlider from '~/colorpicker/BaseSlider';
import Color from '~/util/Color';
import './ColorSlider.scss';

export default class Opacity extends BaseSlider {

  constructor (opt) {
    super(opt);
    this.minValue = 0;
    this.maxValue = 1;
    this.source = 'opacity-control';
  }

  template () {
    return `
      <nav class="el-cp-slider el-cp-slider--alpha">
        <p ref="$container" class="el-cp-slider__body">
          <span ref="$colorbar" class="el-cp-slider__bar"></span>
          <i ref="$bar" class="el-cp-slider__pointer"></i>
        </p>
      </nav>
    `;
  }

  refresh() {
    super.refresh();
    this.setOpacityColorBar();
  }
  setOpacityColorBar() {
    const start = Color.format({ ...this.$store.rgb, a: 0 }, 'rgb');
    const end = Color.format({ ...this.$store.rgb, a: 1 }, 'rgb');
    this.setOpacityColorBarBackground(start, end);
  }
  setOpacityColorBarBackground(start, end) {
    this.refs.$colorbar.css('background', `linear-gradient(to right, ${start}, ${end})`);
  }
  getDefaultValue() {
    return this.$store.alpha;
  }
  refreshColorUI(e) {
    const dist = this.getCaculatedDist(e);
    this.setColorUI((dist / 100) * this.maxValue);
    this.changeColor({
      a: (Math.floor(dist) / 100) * this.maxValue,
    });
  }

}
