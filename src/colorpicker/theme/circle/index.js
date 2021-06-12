import BaseColorPicker from '~/colorpicker/BaseColorPicker';
import ColorWheel from '~/colorpicker/ui/ColorWheel';
import ColorInformation from '~/colorpicker/ui/ColorInformation';
import CurrentColorSets from '~/colorpicker/ui/CurrentColorSets';
import Control from './Control';
import './index.scss';

export default class CircleColorPicker extends BaseColorPicker {

  components() {
    return {
      colorwheel: ColorWheel,
      control: Control,
      information: ColorInformation,
      currentColorSets: CurrentColorSets,
    }
  }

  template() {
    return `
      <div class="el-colorpicker__wrap">
        <template target="colorwheel"></template>
        <template target="control"></template>
        <template target="information"></template>
        <template target="currentColorSets"></template>
      </div>
    `;
  }

}
