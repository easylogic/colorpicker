import Default from '~/gradientpicker/default';
import defaults from './defaults';

/**
 * GradientPicker
 *
 * @param {object} options
 */
function GradientPicker(options) {
  let core;

  // merge options
  options = Object.assign({}, defaults, options);

  /**
   * switch type
   *
   * @param {string} type
   */
  function switchType(type) {
    core = new Default(options);
  }

  // set type
  switchType(options.type);

  return core;
}

export default GradientPicker;
