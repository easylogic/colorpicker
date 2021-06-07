import UIElement from '~/colorpicker/UIElement';
import Event from '~/util/Event'
import Dom from '~/util/Dom';
import './ColorPalette.scss';

const source = 'chromedevtool-palette';

export default class ColorPalette extends UIElement {

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
    const width = this.state.get('$el.width');
    const height = this.state.get('$el.height');
    const s = (pos.x / width);
    const v = ((height - pos.y) / height);
    this.$store.dispatch('/changeColor', {
      type: 'hsv',
      s,
      v,
      source,
    })
  }

  setColorUI() {
    const x = this.w * this.$store.hsv.s;
    const y = this.h * ( 1 - this.$store.hsv.v );
    this.refs.$drag_pointer.css({
      top: `${y}px`,
      left: `${x}px`,
    });
    this.drag_pointer_pos = { x, y };
    this.setBackgroundColor(this.$store.dispatch('/getHueColor'))
  }

  setSubColor(e) {
    const localX = e.pageX;
    const localY = e.pageY;
    const distX = localX - this.x;
    const distY = localY - this.y;
    const w = this.$el.contentWidth();
    const h = this.$el.contentHeight();
    let x = this.refs.$drag_pointer.cssFloat("left");
    let y = this.refs.$drag_pointer.cssFloat("top");

    if (this.axis === 'saturation') {
      x += distX;
    } else if (this.axis === 'value') {
      y += distY;
    }

    if (x < 0) x = 0;
    else if (x > w) x = w;

    if (y < 0) y = 0;
    else if (y > h) y = h;

    this.refs.$drag_pointer.px('left', x);
    this.refs.$drag_pointer.px('top', y);

    this.drag_pointer_pos = { x, y };

    this.x = localX;
    this.y = localY;

    this.calculateSV();
  }

  setMainColor(e) {
    // position for screen
    const pos = this.$el.offset();
    const w = this.w;
    const h = this.h;
    let x = Event.pos(e).pageX - pos.left;
    let y = Event.pos(e).pageY - pos.top;

    if (x < 0) x = 0;
    else if (x > w) x = w;

    if (y < 0) y = 0;
    else if (y > h) y = h;

    this.refs.$drag_pointer.css({
      top: `${y}px`,
      left: `${x}px`,
    });
    this.drag_pointer_pos = { x, y };
    this.calculateSV();
  }

  '@changeColor'(sourceType) {
    if (source !== sourceType) {
      this.refresh();
    }
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
    if (this.axis === 'saturation' || this.axis === 'value') {
      this.setSubColor(e);
    } else {
      this.setMainColor(e);
    }
  }

  mousedown(e) {
    this.isDown = true;
    this.cacheSize();
    this.axis = new Dom(e.target).attr('data-axis-value');
    this.x = e.pageX;
    this.y = e.pageY;

    if (this.axis === 'saturation' || this.axis === 'value') {
      this.setSubColor(e);
    } else {
      this.setMainColor(e);
    }
  }

  'touchend document'() {
    this['mouseup document']();
  }

  'touchmove document'(e) {
    if (this.isDown) {
      this.setMainColor(e);
    }
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
    this.w = this.state.get('$el.contentWidth');
    this.h = this.state.get('$el.contentHeight');
  }

}
