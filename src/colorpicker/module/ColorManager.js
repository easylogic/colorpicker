import Color from '@easylogic/color';
import BaseModule from '~/colorpicker/BaseModule';

export default class ColorManager extends BaseModule {

  initialize() {
    super.initialize();
    this.$store.rgb = {};
    this.$store.hsl = {};
    this.$store.hsv = {};
    this.$store.alpha = 1;
    this.$store.format = 'hex';
  }

  ['/changeFormat']($store, format) {
    $store.format = format;
    $store.emit('changeFormat');
  }

  ['/initColor']($store, obj) {
    $store.dispatch('/changeColor', obj, true);
    $store.emit('initColor');
  }

  ['/changeColor']($store, colorObj, isInit) {
    colorObj = colorObj || '#ffffff';
    if (typeof colorObj === 'string') colorObj = Color.parse(colorObj);

    $store.alpha = (typeof colorObj.a === 'undefined' || colorObj.a === null) ? $store.alpha : colorObj.a;
    if (!$store.format) {
      $store.format = colorObj.type !== 'hsv' ? (colorObj.type || 'hex') : 'hex';
    }

    switch (colorObj.type) {
      case 'hsl':
        $store.hsl = Object.assign($store.hsl, colorObj);
        $store.rgb = Color.HSLtoRGB($store.hsl);
        $store.hsv = Color.HSLtoHSV(colorObj);
        break;
      case 'hex':
        $store.rgb = Object.assign($store.rgb, colorObj);
        $store.hsl = Color.RGBtoHSL($store.rgb);
        $store.hsv = Color.RGBtoHSV(colorObj);
        break;
      case 'rgb':
        $store.rgb = Object.assign($store.rgb, colorObj);
        $store.hsl = Color.RGBtoHSL($store.rgb);
        $store.hsv = Color.RGBtoHSV(colorObj);
        break;
      case 'hsv':
        $store.hsv = Object.assign($store.hsv, colorObj);
        $store.rgb = Color.HSVtoRGB($store.hsv);
        $store.hsl = Color.HSVtoHSL($store.hsv);
        break;
    }

    if (!isInit) $store.emit('changeColor', colorObj);
  }

  ['/getHueColor']($store) {
    return Color.checkHueColor($store.hsv.h / 360);
  }

  ['/toString']($store, type) {
    type = type || $store.format
    const obj = $store[type] || $store.rgb
    return Color.format({
      ...obj,
      a: $store.alpha,
    }, type);
  }

  ['/toColor']($store, type) {
    type = type || $store.format;
    switch (type) {
      case 'rgb':
        return $store.dispatch('/toRGB');
      case 'hsl':
        return $store.dispatch('/toHSL');
      case 'hex':
        return $store.dispatch('/toHEX');
      default:
        return $store.dispatch('/toString', type);
    }
  }

  ['/toRGB']($store) {
    return $store.dispatch('/toString', 'rgb');
  }

  ['/toHSL']($store) {
    return $store.dispatch('/toString', 'hsl');
  }

  ['/toHEX']($store) {
    return $store.dispatch('/toString', 'hex').toUpperCase();
  }

}
