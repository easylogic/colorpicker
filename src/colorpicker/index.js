import Default from '~/colorpicker/default';
import MacOSColorPicker from '~/colorpicker/macos';
import ChromeDevToolColorPicker from '~/colorpicker/chromedevtool';
import MiniColorPicker from '~/colorpicker/mini';
import MiniVerticalColorPicker from '~/colorpicker/mini-vertical';
import RingColorPicker from '~/colorpicker/ring';
import XDColorPicker from '~/colorpicker/xd';
import VSCodePicker from '~/colorpicker/vscode';

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
