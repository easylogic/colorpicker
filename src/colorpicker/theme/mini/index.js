import BaseColorPicker from '~/colorpicker/BaseColorPicker';
import Palette from '~/colorpicker/ui/Palette';
import Swatch from '~/colorpicker/ui/Swatch';
import Control from './Control';
import './index.scss';

export default class MiniColorPicker extends BaseColorPicker {

  components() {
    return {
      Palette,
      Control,
      Swatch,
    }
  }

  template() {
    return `
      <div class="el-colorpicker__wrap">
        <div class="el-colorpicker__body">
          <div class="el-colorpicker__palette">
            <template target="Palette"></template>
          </div>
          <template target="Control"></template>
        </div>
        <template target="Swatch"></template>
      </div>
    `;
  }

}
