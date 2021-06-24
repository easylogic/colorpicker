import BaseColorPicker from '~/colorpicker/BaseColorPicker';
import ColorWheel from '~/colorpicker/ui/ColorWheel';
import ColorInformation from '~/colorpicker/ui/ColorInformation';
import Swatch from '~/colorpicker/ui/Swatch';
import Control from './Control';
import './index.scss';

export default class CircleColorPicker extends BaseColorPicker {

  components() {
    return {
      colorwheel: ColorWheel,
      control: Control,
      information: ColorInformation,
      Swatch,
    }
  }

  template() {
    return `
      <div class="el-colorpicker__wrap">
        <template target="colorwheel"></template>
        <template target="control"></template>
        <template target="information"></template>
        <template target="Swatch"></template>
      </div>
    `;
  }

}
