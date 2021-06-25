import BaseColorPicker from '~/colorpicker/BaseColorPicker';
import PaletteWheel from '~/colorpicker/ui/PaletteWheel';
import Swatch from '~/colorpicker/ui/Swatch';
import Forms from '~/colorpicker/ui/ColorInformation';
import Control from './Control';
import './index.scss';

export default class CircleColorPicker extends BaseColorPicker {

  components() {
    return {
      PaletteWheel,
      Control,
      Forms,
      Swatch,
    }
  }

  template() {
    return `
      <div class="el-colorpicker__wrap">
        <template target="PaletteWheel"></template>
        <template target="Control"></template>
        <template target="Forms"></template>
        <template target="Swatch"></template>
      </div>
    `;
  }

}
