import BaseModule from '~/colorpicker/BaseModule';

export default class ColorSwatch extends BaseModule {

  initialize() {
    super.initialize();
    this.$store.swatch = [];
  }

  /**
   * get colors
   *
   * @param {BaseStore} $store
   * @return {array}
   */
  ['/swatch.index']($store) {
    return ($store.swatch && Array.isArray($store.swatch) && $store.swatch.length > 0) ? $store.swatch : [];
  }

  /**
   * set colors
   *
   * @param {BaseStore} $store
   * @param {array} colors
   */
  ['/swatch.set']($store, colors = []) {
    $store.swatch = (colors && Array.isArray(colors)) ? colors : [];
  }

}
