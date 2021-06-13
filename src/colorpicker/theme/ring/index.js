import BaseColorPicker from '~/colorpicker/BaseColorPicker';
import ColorRing from '~/colorpicker/ui/ColorRing';
import _ColorPalette from '~/colorpicker/ui/ColorPalette';
import ColorInformation from '~/colorpicker/ui/ColorInformation';
import CurrentColorSets from '~/colorpicker/ui/CurrentColorSets';
import Control from './Control';
import './index.scss';

export default class RingColorPicker extends BaseColorPicker {

  components() {
    return {
      colorring: ColorRing,
      palette: _ColorPalette,
      control: Control,
      information: ColorInformation,
      currentColorSets: CurrentColorSets,
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
        <template target="currentColorSets"></template>
      </div>
    `;
  }

}
