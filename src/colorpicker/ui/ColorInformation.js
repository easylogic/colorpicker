import UIElement from '../UIElement';
import './ColorInformation.scss';

const source = 'chromedevtool-information';

export default class ColorInformation extends UIElement {

  template() {
    if (!this.opt.useInformation) return null;
    return `
      <fieldset class="el-cp-color-form">
        <legend>change color code</legend>
        <div class="el-cp-color-form__wrap">
          <div class="el-cp-color-field">
            <label>
              <input ref="$hexCode" type="text"/>
              <span>HEX</span>
            </label>
          </div>
          <div class="el-cp-color-field">
            <label>
              <input ref="$rgb_r" type="number" step="1" min="0" max="255"/>
              <span>R</span>
            </label>
            <label>
              <input ref="$rgb_g" type="number" step="1" min="0" max="255"/>
              <span>G</span>
            </label>
            <label>
              <input ref="$rgb_b" type="number" step="1" min="0" max="255"/>
              <span>B</span>
            </label>
            <label>
              <input ref="$rgb_a" type="number" step="0.01" min="0" max="1"/>
              <span>A</span>
            </label>
          </div>
          <div class="el-cp-color-field">
            <label>
              <input ref="$hsl_h" type="number" step="1" min="0" max="360"/>
              <span>H</span>
            </label>
            <label>
              <input ref="$hsl_s" type="number" step="1" min="0" max="100"/>
              <span>S</span>
            </label>
            <label>
              <input ref="$hsl_l" type="number" step="1" min="0" max="100"/>
              <span>L</span>
            </label>
            <label>
              <input ref="$hsl_a" type="number" step="0.01" min="0" max="1"/>
              <span>A</span>
            </label>
          </div>
          <nav ref="$informationChange" class="el-cp-color-nav">
            <label title="Change color model" class="el-cp-color-nav__label">
              <select ref="$changeColorModel">
                <option value="hex">HEX</option>
                <option value="rgb">RGB</option>
                <option value="hsl">HSL</option>
              </select>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </label>
          </nav>
        </div>
      </fieldset>
    `;
  }

  setCurrentFormat(format) {
    this.format = format;
    this.initFormat();
  }
  initFormat() {
    const current_format = this.format || 'hex';
    ['hex', 'rgb', 'hsl'].filter(it => it !== current_format).forEach(formatString => {
      this.$el.removeClass(formatString);
    });
    this.$el.addClass(current_format);
  }
  goToFormat(to_format) {
    this.format = to_format;
    if (to_format === 'rgb' || to_format === 'hsl') {
      this.initFormat();
    }
    this.$store.dispatch('/changeFormat', this.format);
  }
  getFormat() {
    return this.format || 'hex';
  }
  checkNumberKey(e) {
    const code = e.which;
    let isExcept = false;
    if (code === 37 || code === 39 || code === 8 || code === 46 || code === 9) isExcept = true;
    return !(!isExcept && (code < 48 || code > 57));
  }
  checkNotNumberKey(e) {
    return !this.checkNumberKey(e);
  }
  changeRgbColor () {
    this.$store.dispatch('/changeColor', {
      type: 'rgb',
      r : this.refs.$rgb_r.int(),
      g : this.refs.$rgb_g.int(),
      b : this.refs.$rgb_b.int(),
      a : this.refs.$rgb_a.float(),
      source,
    })
    this.$store.emit('lastUpdateColor');
  }
  changeHslColor() {
    this.$store.dispatch('/changeColor', {
      type: 'hsl',
      h : this.refs.$hsl_h.int(),
      s : this.refs.$hsl_s.int(),
      l : this.refs.$hsl_l.int(),
      a : this.refs.$hsl_a.float(),
      source,
    });
    this.$store.emit('lastUpdateColor');
  }

  '@changeColor' (sourceType) {
    if (source !== sourceType) {
      this.refresh()
    }
  }
  '@initColor'() {
    this.refresh();
  }

  'input $rgb_r'() { this.changeRgbColor(); }
  'input $rgb_g'() { this.changeRgbColor(); }
  'input $rgb_b'() { this.changeRgbColor(); }
  'input $rgb_a'() { this.changeRgbColor(); }
  'input $hsl_h'() { this.changeHslColor(); }
  'input $hsl_s'() { this.changeHslColor(); }
  'input $hsl_l'() { this.changeHslColor(); }
  'input $hsl_a'() { this.changeHslColor(); }
  'keyup $hexCode'() {
    const code = this.refs.$hexCode.val();
    if(code.charAt(0) === '#' && (code.length === 7 || code.length === 9)) {
      this.$store.dispatch('/changeColor', code, source)
      this.$store.emit('lastUpdateColor')
    }
  }
  'change $changeColorModel'(e) {
    switch (e.target.value) {
      case 'hex':
      case 'rgb':
      case 'hsl':
        this.format = e.target.value;
        break;
      default:
        this.format = 'hex';
        break;
    }
    this.initFormat();
    this.$store.dispatch('/changeFormat', this.format);
    this.$store.emit('lastUpdateColor');
  }

  setRGBInput() {
    this.refs.$rgb_r.val(this.$store.rgb.r);
    this.refs.$rgb_g.val(this.$store.rgb.g);
    this.refs.$rgb_b.val(this.$store.rgb.b);
    this.refs.$rgb_a.val(this.$store.alpha);
  }
  setHSLInput() {
    this.refs.$hsl_h.val(this.$store.hsl.h);
    this.refs.$hsl_s.val(this.$store.hsl.s);
    this.refs.$hsl_l.val(this.$store.hsl.l);
    this.refs.$hsl_a.val(this.$store.alpha);
  }
  setHexInput() {
    this.refs.$hexCode.val(this.$store.dispatch('/toHEX'));
  }

  refresh() {
    if (!this.opt.useInformation) return;
    this.setCurrentFormat(this.$store.format);
    this.setRGBInput();
    this.setHSLInput();
    this.setHexInput();
  }

}
