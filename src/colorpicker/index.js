import Default from '~/colorpicker/theme/default';
import CircleColorPicker from '~/colorpicker/theme/circle';
import RingColorPicker from '~/colorpicker/theme/ring';
import MiniColorPicker from '~/colorpicker/theme/mini';
import NoneColorPicker from '~/colorpicker/theme/none';
import defaults from './defaults';

/**
 * ColorPicker
 *
 * @param {object} options
 */
function ColorPicker(options) {
  let core;

  // merge options
  options = Object.assign({}, defaults, options);

  /**
   * switch type
   *
   * @param {string} type
   */
  function switchType(type) {
    switch (type) {
      case 'circle':
        core = new CircleColorPicker(options);
        break;
      case 'ring':
        core = new RingColorPicker(options);
        break;
      case 'mini':
        core = new MiniColorPicker(options);
        break;
      case 'none':
        core = new NoneColorPicker(options);
        break;
      default:
        core = new Default(options);
        break;
    }
  }

  // set type
  switchType(options.type);

  /**
   * set type
   *
   * @param {string} type
   */
  core.setType = function(type) {
    options = Object.assign({}, core.opt, {
      type,
      color: core.getColor(),
    });
    core.destroy();
    switchType(type);
  }

  return core;
}

export default ColorPicker;
