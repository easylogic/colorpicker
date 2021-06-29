import Event from '~/util/Event';
import BaseBox from './BaseBox';

export default class BaseSlider extends BaseBox {

  constructor(opt) {
    super(opt)
    this.minValue = 0; // min domain value
    this.maxValue = 1; // max domain value
  }

  // slider container's min and max position
  getMinMaxPosition() {
    const min = this.getMinPosition();
    const width = this.getMaxDist();
    const max = min + width;
    return { min, max, width };
  }

  /** get current position on page  */
  getCurrent(value) {
    return this.getMaxDist() * value;
  }

  /** get min position on slider container  */
  getMinPosition() {
    return this.refs.$container.offset().left;
  }

  getMaxDist() {
    return this.refs.$container.size()[0];
  }

  /** get dist for position value */
  getDist(current) {
    const { min, max } = this.getMinMaxPosition();
    let dist;
    if (current < min) {
      dist = 0;
    } else if (current > max) {
      dist = 100;
    } else {
      dist = (current - min) / (max - min) * 100;
    }
    return dist;
  }

  /** get calculated dist for domain value */
  getCalculatedDist(e) {
    const current = e ? this.getMousePosition(e) : this.getCurrent(this.getDefaultValue() / this.maxValue);
    return this.getDist(current);
  }

  /** get default value used in slider container */
  getDefaultValue() {
    return 0;
  }

  /** set mouse position */
  setMousePosition(x) {
    this.refs.$bar.css({ left: `${x}%` });
  }

  /** set mouse position in page */
  getMousePosition(e) {
    return Event.pos(e).pageX;
  }

  /** set drag bar position  */
  setColorUI(v = null) {
    v = v || this.getDefaultValue();
    if (this.lastV === v) return;
    this.lastV = v;
    this.setMousePosition(100 * ((v || 0) / this.maxValue));
  }

  refresh() {
    this.setColorUI();
  }

}
