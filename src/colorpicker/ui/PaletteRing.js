import PaletteWheel from './PaletteWheel';
import { caculateAngle } from '~/util/functions/math';
import './PaletteRing.scss';

export default class PaletteRing extends PaletteWheel {

  constructor (opt) {
    super(opt);
    this.width = this.opt.paletteWidth || 200;
    this.height = this.opt.paletteWidth || 200;
    this.thickness = this.opt.paletteThickness || 16;
  }

  template() {
    return `
      <div data-type="ring" class="el-cp-palette-ring">
        <div ref="$wrap" class="el-cp-palette-ring__wrap">
          <canvas ref="$colorwheel" class="el-cp-palette-ring__canvas"></canvas>
          <i ref="$drag_pointer" class="el-cp-palette-ring__pointer"></i>
        </div>
      </div>
    `;
  }

  setColorUI(isEvent) {
    this.renderCanvas();
    this.setHueColor(null, isEvent);
  }

  getDefaultValue() {
    return this.$store.hsv.h;
  }

  setHueColor(e, isEvent) {
    if (!this.state.get('$el.width')) return;
    const { minX, minY, width, height, radius, centerX, centerY } = this.getRectangle();
    const position = this.getCurrentXY(e, this.getDefaultValue(), radius, centerX, centerY);
    const hue = caculateAngle(position.x - centerX, position.y - centerY);
    const positionForHalf = this.getCurrentXY(null, hue, radius - (this.thickness * .5), centerX, centerY);
    // set drag pointer position
    this.refs.$drag_pointer.css({
      left: `${(positionForHalf.x - minX) / width * 100}%`,
      top: `${(positionForHalf.y - minY) / height * 100}%`,
    });
    if (!isEvent) {
      this.changeColor({
        type: 'hsv',
        h: hue,
      });
    }
  }

}
