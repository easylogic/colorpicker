import BaseColorPicker from '~/colorpicker/BaseColorPicker';
import ColorRing from '~/colorpicker/ui/ColorRing';
import _ColorPalette from '~/colorpicker/ui/ColorPalette';
import ColorInformation from '~/colorpicker/ui/ColorInformation';
import Swatch from '~/colorpicker/ui/Swatch';
import Control from './Control';
import './index.scss';

export default class RingColorPicker extends BaseColorPicker {

  components() {
    return {
      colorring: ColorRing,
      palette: _ColorPalette,
      control: Control,
      information: ColorInformation,
      Swatch,
    }
  }

  template() {
    return `
      <div class="el-colorpicker__wrap">
        <div class="el-colorpicker__body">
          <template target="colorring"></template>
          <template target="palette"></template>
        </div>
        <template target="control"></template>
        <template target="information"></template>
        <template target="Swatch"></template>
      </div>
    `;
  }

}
