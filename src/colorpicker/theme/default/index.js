import BaseColorPicker from '~/colorpicker/BaseColorPicker';
import ColorPalette from '~/colorpicker/ui/ColorPalette';
import ColorInformation from '~/colorpicker/ui/ColorInformation';
import Swatch from '~/colorpicker/ui/Swatch';
import Control from './Control';
import './index.scss';

export default class DefaultColorPicker extends BaseColorPicker {

  components() {
    return {
      palette: ColorPalette,
      control: Control,
      information: ColorInformation,
      Swatch,
    };
  }

  template() {
    return `
      <div class="el-colorpicker__wrap">
        <template target="palette"></template>
        <template target="control"></template>
        <template target="information"></template>
        <template target="Swatch"></template>
      </div>
    `;
  }

}
