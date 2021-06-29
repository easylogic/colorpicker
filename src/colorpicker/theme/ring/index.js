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
    const { paletteWidth, paletteThickness } = this.opt;
    const styles = [
      paletteWidth && `--width: ${paletteWidth}px;`,
      paletteWidth && `--height: ${paletteWidth}px;`,
      `--thickness: ${paletteThickness || 16}px;`,
    ].filter(Boolean).join('');

    return `
      <div class="el-colorpicker__wrap">
        <div class="el-colorpicker__body" style="${styles}">
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
