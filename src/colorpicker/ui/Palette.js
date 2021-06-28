import UIElement from '~/colorpicker/UIElement';
import Event from '~/util/Event'
import Dom from '~/util/Dom';
import './Palette.scss';

export default class Palette extends UIElement {

  template() {
    return /*html*/`
      <nav class="el-cp-palette">
        <span ref="$drag_pointer" data-axis-value="all" class="el-cp-palette__pointer"></span>
      </nav>
    `;
  }

  setBackgroundColor(color) {
    this.$el.el.style.setProperty('--palette-bg', color);
  }

  refresh() {
    this.cacheSize();
    this.setColorUI();
  }

  calculateSV() {
    const pos = this.drag_pointer_pos || { x : 0, y : 0 };
    const s = (pos.x / 100);
    const v = ((100 - pos.y) / 100);
    this.$store.dispatch('/changeColor', { type: 'hsv', s, v });
  }

  setColorUI() {
    const x = 100 * this.$store.hsv.s;
    const y = 100 * (1 - this.$store.hsv.v);
    this.refs.$drag_pointer.css({
      left: `${x}%`,
      top: `${y}%`,
    });
    this.drag_pointer_pos = { x, y };
    this.setBackgroundColor(this.$store.dispatch('/getHueColor'))
  }

  setMainColor(e) {
    const pos = this.$el.offset();
    let x = 100 * ((Event.pos(e).pageX - pos.left) / this.w);
    let y = 100 * ((Event.pos(e).pageY - pos.top) / this.h);
    x = Math.max(0, Math.min(100, x));
    y = Math.max(0, Math.min(100, y));
    this.refs.$drag_pointer.css({
      left: `${x}%`,
      top: `${y}%`,
    });
    this.drag_pointer_pos = { x, y };
    this.calculateSV();
  }

  '@changeColor'() {
    this.refresh();
  }

  '@initColor'() {
    this.refresh();
  }

  'mouseup document'() {
    if (!this.isDown) return;
    this.isDown = false;
    this.$store.emit('lastUpdateColor');
  }

  'mousemove document'(e) {
    if (!this.isDown) return;
    this.cacheSize();
    this.setMainColor(e);
  }

  mousedown(e) {
    this.isDown = true;
    this.cacheSize();
    this.axis = new Dom(e.target).attr('data-axis-value');
    this.x = e.pageX;
    this.y = e.pageY;
    this.setMainColor(e);
  }

  'touchend document'() {
    this['mouseup document']();
  }

  'touchmove document'(e) {
    if (!this.isDown) return;
    this.setMainColor(e);
  }

  touchstart(e) {
    e.preventDefault()
    this.isDown = true;
    this.cacheSize();
    this.setMainColor(e);
  }

  contextmenu() {
    this['mouseup document']();
  }

  cacheSize() {
    const [ width, height ] = this.$el.size();
    this.w = width;
    this.h = height;
  }

}
