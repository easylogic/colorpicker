import Default from '~/colorpicker/theme/default';
import MacOSColorPicker from '~/colorpicker/theme/macos';
import ChromeDevToolColorPicker from '~/colorpicker/theme/chromedevtool';
import MiniColorPicker from '~/colorpicker/theme/mini';
import MiniVerticalColorPicker from '~/colorpicker/theme/mini-vertical';
import RingColorPicker from '~/colorpicker/theme/ring';
import XDColorPicker from '~/colorpicker/theme/xd';
import VSCodePicker from '~/colorpicker/theme/vscode';

export default {
  create (opts) {
    switch(opts.type) {
      case 'ChromeDevTool':
      case 'sketch':
      case 'palette':
        return new ChromeDevToolColorPicker(opts);
      case 'macos':
        return new MacOSColorPicker(opts);
      case 'xd':
        return new XDColorPicker(opts);
      case 'ring':
        return new RingColorPicker(opts);
      case 'mini':
        return new MiniColorPicker(opts);
      case 'vscode':
        return new VSCodePicker(opts);
      case 'mini-vertical':
        return new MiniVerticalColorPicker(opts);
      default:
        return new Default(opts);
    }
  },
  ColorPicker: ChromeDevToolColorPicker,
  ChromeDevToolColorPicker,
  MacOSColorPicker,
  RingColorPicker,
  MiniColorPicker,
  VSCodePicker,
  MiniVerticalColorPicker,
}
