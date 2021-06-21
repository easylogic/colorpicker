import * as Color from '@easylogic/color';
import BaseModule from '~/colorpicker/BaseModule';

function isUndefined (v) {
    return typeof v == 'undefined' || v == null;
}

export default class ColorManager extends BaseModule {
  initialize () {
    super.initialize();
    this.$store.rgb = {};
    this.$store.hsl = {};
    this.$store.hsv = {};
    this.$store.alpha = 1;
    this.$store.format = 'hex';
    // this.$store.dispatch('/changeColor'); // TODO: 쓸모가 있는지 검증하기
  }

  '/changeFormat' ($store, format) {
    $store.format = format;
    $store.emit('changeFormat');
  }

  '/initColor' ($store, colorObj, source) {
    $store.dispatch('/changeColor', colorObj, source, true);
    $store.emit('initColor');
  }

  '/changeColor'($store, colorObj, source, isNotEmit) {
    colorObj = colorObj || '#ffffff';
    if (typeof colorObj == 'string') colorObj = Color.parse(colorObj);

    colorObj.source = colorObj.source || source;

    $store.alpha = isUndefined(colorObj.a) ? $store.alpha : colorObj.a;
    $store.format = colorObj.type !== 'hsv' ? (colorObj.type || $store.format) : $store.format;

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

    if (!isNotEmit) $store.emit('changeColor', colorObj.source);
  }

  '/getHueColor'($store) {
    return Color.checkHueColor($store.hsv.h / 360);
  }

  '/toString'($store, type) {
    type = type || $store.format
    var colorObj = $store[type] || $store.rgb
    return Color.format({
      ...colorObj,
      a: $store.alpha
    }, type);
  }

  '/toColor'($store, type) {
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

  '/toRGB'($store) {
    return $store.dispatch('/toString', 'rgb');
  }

  '/toHSL'($store) {
    return $store.dispatch('/toString', 'hsl');
  }

  '/toHEX'($store) {
    return $store.dispatch('/toString', 'hex').toUpperCase();
  }

}
