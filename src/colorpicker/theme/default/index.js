import BaseColorPicker from '~/colorpicker/BaseColorPicker';
import Palette from '~/colorpicker/ui/Palette';
import Forms from '~/colorpicker/ui/ColorInformation';
import Swatch from '~/colorpicker/ui/Swatch';
import Control from './Control';
import './index.scss';

export default class DefaultColorPicker extends BaseColorPicker {

  components() {
    return {
      Palette,
      Control,
      Forms,
      Swatch,
    };
  }

  template() {
    return `
      <div class="el-colorpicker__wrap">
        <template target="Palette"></template>
        <template target="Control"></template>
        <template target="Forms"></template>
        <template target="Swatch"></template>
      </div>
    `;
  }

}
