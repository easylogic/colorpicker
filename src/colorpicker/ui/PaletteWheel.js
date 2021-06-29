import Color from '@easylogic/color';
import UIElement from '~/colorpicker/UIElement';
import Dom from '~/util/Dom';
import Event from '~/util/Event';
import { getXYInCircle, calculateAngle } from '~/util/functions/math';
import './PaletteWheel.scss';

export default class PaletteWheel extends UIElement {

  constructor(opt) {
    super(opt);
    this.width = this.opt.paletteWidth || 200;
    this.height = this.opt.paletteWidth || 200;
    this.thickness = 0;
  }

  template() {
    return `
      <div class="el-cp-palette-circle">
        <div ref="$wrap" class="el-cp-palette-circle__wrap">
          <canvas ref="$colorwheel" class="el-cp-palette-circle__canvas"></canvas>
          <span ref="$valuewheel" class="el-cp-palette-circle__brightness"></span>
          <i ref="$drag_pointer" class="el-cp-palette-circle__pointer"></i>
        </div>
      </div>
    `;
  }

  afterRender() {
    this.refresh();
  }

  refresh(isEvent) {
    this.setColorUI(isEvent);
  }

  setColorUI(isEvent) {
    this.renderCanvas();
    this.renderValue();
    this.setHueColor(null, isEvent);
  }

  renderValue() {
    const value = (1 - (this.$store.hsv.v));
    this.refs.$valuewheel.css({
      'background-color': `rgba(0, 0, 0, ${value})`,
    });
  }

  renderWheel(width, height) {
    const $canvas = new Dom('canvas');
    const context = $canvas.el.getContext('2d');
    $canvas.el.width = width;
    $canvas.el.height = height;

    const img = context.getImageData(0, 0, width, height);
    let pixels = img.data;
    const half_width = Math.floor(width / 2);
    const half_height = Math.floor(height / 2);
    const radius = (width > height) ? half_height : half_width;
    const cx = half_width;
    const cy = half_height;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const rx = x - cx + 1;
        const ry = y - cy + 1;
        const d = rx * rx + ry * ry;
        const hue = calculateAngle(rx, ry);
        const rgb = Color.HSVtoRGB(
          hue, // 0~360 hue
          Math.min(Math.sqrt(d) / radius, 1), // 0..1 Saturation
          1, // 0..1 Value
        );
        const index = (y * width + x) * 4;
        pixels[index] = rgb.r;
        pixels[index + 1] = rgb.g;
        pixels[index + 2] = rgb.b;
        pixels[index + 3] = 255;
      }
    }

    context.putImageData(img, 0, 0);

    if (this.thickness > 0) {
      // destination-out 은 그리는 영역이 지워진다.
      context.globalCompositeOperation = 'destination-out';
      context.fillStyle = 'black';
      context.beginPath();
      context.arc(cx, cy, radius - this.thickness, 0, Math.PI * 2);
      context.closePath();
      context.fill();
    }

    return $canvas;
  }

  renderCanvas() {
    if (this.$store.createdWheelCanvas) return;
    const $canvas = this.refs.$colorwheel;
    $canvas.el.width = this.width;
    $canvas.el.height = this.height;
    const context = $canvas.el.getContext('2d');
    const $wheelCanvas = this.renderWheel(this.width, this.height);
    context.drawImage($wheelCanvas.el, 0, 0);
    this.$store.createdWheelCanvas = true;
  }

  getDefaultValue() {
    return this.$store.hsv.h;
  }

  getDefaultSaturation() {
    return this.$store.hsv.s;
  }

  getCurrentXY(e, angle, radius, centerX, centerY) {
    return e ? Event.posXY(e) : getXYInCircle(angle, radius, centerX, centerY);
  }

  getRectangle() {
    const width = this.state.get('$wrap.width');
    const height = this.state.get('$wrap.height');
    const radius = this.state.get('$colorwheel.width') / 2;
    const minX = this.refs.$wrap.offset().left;
    const minY = this.refs.$wrap.offset().top;
    return {
      minX,
      minY,
      width,
      height,
      radius,
      centerX: minX + width / 2,
      centerY: minY + height / 2,
    };
  }

  setHueColor(e, isEvent) {
    if (!this.state.get('$wrap.width')) return;

    const { minX, minY, radius, centerX, centerY, width, height } = this.getRectangle();
    let { x , y } = this.getCurrentXY(
      e,
      this.getDefaultValue(),
      this.getDefaultSaturation() * radius,
      centerX,
      centerY
    );
    const rx = x - centerX;
    const ry = y - centerY;
    const d = rx * rx + ry * ry;
    const hue = calculateAngle(rx, ry);

    if (d > radius * radius) {
      const pos = this.getCurrentXY(null, hue, radius, centerX, centerY);
      x = pos.x;
      y = pos.y;
    }

    // saturation
    const saturation = Math.min(Math.sqrt(d) / radius, 1);

    // set drag pointer position
    const cssWidth = (x - minX) / width * 100;
    const cssHeight = (y - minY) / height * 100;
    this.refs.$drag_pointer.css({
      left: `${cssWidth}%`,
      top: `${cssHeight}%`,
    });

    if (!isEvent) {
      this.changeColor({ type: 'hsv', h: hue, s: saturation });
    }
  }

  changeColor(opt) {
    this.$store.dispatch('/changeColor', opt);
  }

  ['@changeColor']() {
    this.refresh(true);
  }

  ['@initColor']() {
    this.refresh(true);
  }

  ['mouseup document']() {
    if (!this.isDown) return;
    this.isDown = false;
    this.$store.emit('lastUpdateColor');
  }

  ['mousemove document'](e) {
    if (!this.isDown) return;
    this.setHueColor(e);
  }

  ['mousedown $drag_pointer'](e) {
    e.preventDefault();
    this.isDown = true;
  }

  ['mousedown $wrap'](e) {
    this.isDown = true;
    this.setHueColor(e);
  }

  ['touchend document']() {
    if (!this.isDown) return;
    this.isDown = false;
    this.$store.emit('lastUpdateColor');
  }

  ['touchmove document'](e) {
    if (!this.isDown) return;
    this.setHueColor(e);
  }

  ['touchstart $drag_pointer'](e) {
    e.preventDefault();
    this.isDown = true;
  }

  ['touchstart $wrap'](e) {
    e.preventDefault()
    this.isDown = true;
    this.setHueColor(e);
  }

  contextmenu() {
    this['mouseup document']();
  }

}
