import Dom from '~/util/Dom';
import ColorSetsList from '~/colorpicker/module/ColorSetsList';
import UIElement from '~/colorpicker/UIElement';
import ColorManager from '~/colorpicker/module/ColorManager';
import BaseStore from '~/colorpicker/BaseStore';
import { isFunction } from '~/util/functions/func';

export default class BaseColorPicker extends UIElement {

  constructor (opt) {
    super(opt);
  }

  initialize() {
    // set store
    this.$store = new BaseStore({
      modules: [
        ColorManager,
        ColorSetsList,
      ],
    });

    // set elements
    this.$body = new Dom(this.opt.container || document.body);
    this.$root = new Dom('div', 'el-colorpicker', {});

    // append colorpicker to container
    this.$body.append(this.$root);

    // set theme
    let theme;
    switch (this.opt.type) {
      case 'circle':
      case 'ring':
      case 'mini':
      case 'none':
        theme = this.opt.type;
        break;
      default:
        theme = 'default';
        break;
    }
    this.$root.addClass(`el-colorpicker--${theme}`);

    // set colorSets
    if (this.opt.colorSets) {
      this.$store.dispatch('/setUserPalette', this.opt.colorSets);
    } else if (isFunction(this.opt.onRetrievePreset)) {
      this.$store.dispatch('/setUserPalette', this.opt.onRetrievePreset());
    } else {
      this.$store.dispatch('/setUserPalette', []);
    }

    // render component
    this.render();

    // set color
    this.$store.dispatch('/changeFormat', this.opt.format);
    this.$store.dispatch('/initColor', this.opt.color);

    // append element
    this.$root.append(this.$el);

    // initial events
    this.initializeEvent();

    // call onInit
    if (this.opt.onInit && typeof this.opt.onInit === 'function') {
      this.opt.onInit(this);
    }
  }

  /**
   * public methods
   */

  /**
   * initialize color for colorpicker
   * // TODO: 옵션을 변경하는것으로 대체할 수 있어 보입니다.
   *
   * @param {String|Object} newColor
   * @param {String} format  hex, rgb, hsl
   */
  initColor(newColor, format) {
    this.$store.dispatch('/changeColor', newColor, format);
  }

  /**
   * get color
   *
   * @param {string} format hex,rgb,hsl
   * @return {string}
   */
  getColor(format = undefined) {
    return this.$store.dispatch('/toColor', format || this.opt.outputFormat);
  }

  /**
   * set color
   *
   * @param {string} color
   * @param {string} format
   */
  changeColor(color, format = undefined) {
    this.$store.dispatch('/changeColor', color);
  }

  changeOptions() {}

  /**
   * private methods
   */

  initializeStoreEvent() {
    super.initializeStoreEvent();
    this.$store.on('changeColor', () => {
      if (!(this.opt.onChange && typeof this.opt.onChange === 'function')) return;
      this.opt.onChange(this.getColor());
    });
    this.$store.on('lastUpdateColor', () => {
      if (!(this.opt.onChanged && typeof this.opt.onChanged === 'function')) return;
      this.opt.onChanged(this.getColor());
    });
    this.$store.on('changeFormat', () => {
      if (!(this.opt.onChangeFormat && typeof this.opt.onChangeFormat === 'function')) return;
      this.opt.onChangeFormat(this.$store.format);
    });
  }

  destroy() {
    super.destroy();
    this.$store.off('changeColor');
    this.$store.off('lastUpdateColor');
    this.$store.off('changeFormat');
  }

}
