import Dom from '~/util/Dom';
import ColorSetsList from '~/colorpicker/module/ColorSetsList';
import UIElement from '~/colorpicker/UIElement';
import ColorManager from '~/colorpicker/module/ColorManager';
import BaseStore from '~/colorpicker/BaseStore';
import { isFunction } from '~/util/functions/func';

export default class BaseColorPicker extends UIElement {

  constructor (opt) {
    super(opt);
    this.isColorPickerShow = false;
    this.isShortCut = false;
    this.hideDelay = +(typeof this.opt.hideDeplay == 'undefined' ? 2000 : this.opt.hideDelay);
    this.timerCloseColorPicker = undefined;
    this.autoHide = this.opt.autoHide || true;
    this.outputFormat = this.opt.outputFormat;
    // this.$checkColorPickerClass = this.checkColorPickerClass.bind(this);
  }

  initialize() {
    this.$body = null;
    this.$root = null;

    this.$store = new BaseStore({
      modules: [
        ColorManager,
        ColorSetsList,
      ],
    });

    // set callbacks
    this.callbackChange = () => {
      this.callbackColorValue();
    }
    this.callbackLastUpdate = () => {
      this.callbackLastUpdateColorValue();
    }
    this.callbackAddCurrentColor = (color) => {
      this.callbackAddCurrentColorValue(color);
    }

    this.colorpickerShowCallback = function() {};
    this.colorpickerHideCallback = function() {};
    this.colorpickerLastUpdateCallback = function() {};
    this.colorpickerAddCurrentColorCallback = function() {};

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

    this.render();
    this.$root.append(this.$el);
    this.initColorWithoutChangeEvent(this.opt.color);

    // initial events
    this.initializeEvent();
  }

  initColorWithoutChangeEvent (color) {
    this.$store.dispatch('/initColor', color);
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
   * set to colors in current sets that you see
   * @param {Array} colors
   */
  setColorsInPalette (colors = []) {
    this.$store.dispatch('/setCurrentColorAll', colors);
  }

  /**
   * refresh all color palette
   *
   * @param {*} list
   */
  setUserPalette (list = []) {
    this.$store.dispatch('/setUserPalette', list);
  }

  /**
   * get color
   *
   * @param {string} type hex,rgb,hsl
   * @return {string}
   */
  getColor(type) {
    return this.$store.dispatch('/toColor', type);
  }

  // TODO: set color 메서드 추가

  /**
   * private methods
   */

  callbackColorValue(color) {
    color = color || this.getCurrentColor();
    if (typeof this.opt.onChange === 'function') {
      this.opt.onChange.call(this, color);
    }
    if (typeof this.colorpickerShowCallback === 'function') {
      this.colorpickerShowCallback(color);
    }
  }

  callbackLastUpdateColorValue(color) {
    color = color || this.getCurrentColor();
    if (typeof this.opt.onLastUpdate === 'function') {
      this.opt.onLastUpdate.call(this, color);
    }
    if (typeof this.colorpickerLastUpdateCallback === 'function') {
      this.colorpickerLastUpdateCallback(color);
    }
  }

  callbackAddCurrentColorValue(color) {
    if (typeof this.opt.onLastUpdate === 'function') {
      this.opt.onAddPreset.call(this, color);
    }
    if (typeof this.colorpickerAddCurrentColorCallback === 'function') {
      this.colorpickerAddCurrentColorCallback(color);
    }
  }

  getCurrentColor() {
    return this.$store.dispatch('/toColor', this.outputFormat);
  }

  initializeStoreEvent() {
    super.initializeStoreEvent();
    this.$store.on('changeColor', this.callbackChange);
    this.$store.on('lastUpdateColor', this.callbackLastUpdate);
    this.$store.on('changeFormat', this.callbackChange);
    this.$store.on('addCurrentColor', this.callbackAddCurrentColor);
  }

  destroy() {
    super.destroy();
    // off events
    this.$store.off('changeColor', this.callbackChange);
    this.$store.off('lastUpdateColor', this.callbackLastUpdate)
    this.$store.off('changeFormat', this.callbackChange);
    this.$store.off('addCurrentColor', this.callbackAddCurrentColor)
    // remove callbacks
    this.callbackChange = undefined;
    this.callbackLastUpdate = undefined;
    this.callbackAddCurrentColor = undefined;
    // remove color picker callback
    this.colorpickerShowCallback = undefined;
    this.colorpickerHideCallback = undefined;
  }

}
