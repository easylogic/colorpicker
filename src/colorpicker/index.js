import Default from '~/colorpicker/theme/default';
import CircleColorPicker from '~/colorpicker/theme/circle';
import RingColorPicker from '~/colorpicker/theme/ring';
import MiniColorPicker from '~/colorpicker/theme/mini';
import NoneColorPicker from '~/colorpicker/theme/none';

function ColorPicker(options) {
  let core;

  // merge options
  options = Object.assign({}, this.defaults, options);

  // switch theme
  switch (options.type) {
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

  return core;
}

// set default options
ColorPicker.prototype.defaults = {
  container: undefined,
  type: null, // default,circle,ring,mini,none
  color: '#ffffff',
  position: 'inline', // TODO: 나중에 조정예정
  colorSets: undefined,
};

export default ColorPicker;
