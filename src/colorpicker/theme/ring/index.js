import BaseColorPicker from '~/colorpicker/BaseColorPicker';
import PaletteRing from '~/colorpicker/ui/PaletteRing';
import Palette from '~/colorpicker/ui/Palette';
import Forms from '~/colorpicker/ui/ColorInformation';
import Swatch from '~/colorpicker/ui/Swatch';
import Control from './Control';
import './index.scss';

export default class RingColorPicker extends BaseColorPicker {

  components() {
    return {
      PaletteRing,
      Palette,
      Control,
      Forms,
      Swatch,
    }
  }

  template() {
    const { paletteWidth, paletteHeight, paletteThickness } = this.opt;
    return `
      <div class="el-colorpicker__wrap">
        <div class="el-colorpicker__body" style="${`--width: ${paletteWidth}px; --height: ${paletteHeight}px; --thickness: ${paletteThickness}px;`}">
          <template target="PaletteRing"></template>
          <template target="Palette"></template>
        </div>
        <template target="Control"></template>
        <template target="Forms"></template>
        <template target="Swatch"></template>
      </div>
    `;
  }

}
