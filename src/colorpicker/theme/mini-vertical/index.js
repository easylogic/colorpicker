import BaseColorPicker from '~/colorpicker/BaseColorPicker';
import _ColorPalette from '~/colorpicker/ui/ColorPalette';
import ColorControl from './ColorControl';

export default class MiniColorPicker extends BaseColorPicker {

  components() {
    return {
      palette: _ColorPalette,
      control: ColorControl
    }
  }

  template() {
    return `
      <div class="colorpicker-body">
        <div target="palette"></div>
        <div target="control"></div>
      </div>
    `;
  }

}
