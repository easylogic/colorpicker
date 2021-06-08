import BaseColorPicker from '~/colorpicker/BaseColorPicker';
import ColorInformation from '~/colorpicker/ui/ColorInformation';
import ColorPalette from '~/colorpicker/ui/ColorPalette';
import ColorSetsChooser from '~/colorpicker/ui/ColorSetsChooser';
import CurrentColorSets from '~/colorpicker/ui/CurrentColorSets';
import CurrentColorSetsContextMenu from '~/colorpicker/ui/CurrentColorSetsContextMenu';
import Control from './Control';
import './index.scss';

export default class DefaultColorPicker extends BaseColorPicker {

  template() {
    return `
      <div class="el-colorpicker__wrap">
        <div class="el-colorpicker__body">
          <template target="palette"></template>
          <template target="control"></template>
          <template target="information"></template>
        </div>
<!--        <div target="currentColorSets"></div>-->
<!--        <div target="colorSetsChooser"></div>-->
<!--        <div target="contextMenu"></div>-->
      </div>
    `;
  }

  components() {
    return {
      palette: ColorPalette,
      control: Control,
      information: ColorInformation,
      currentColorSets: CurrentColorSets,
      colorSetsChooser: ColorSetsChooser,
      contextMenu: CurrentColorSetsContextMenu,
    };
  }

}
