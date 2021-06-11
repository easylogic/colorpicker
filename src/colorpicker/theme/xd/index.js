import BaseColorPicker from '~/colorpicker/BaseColorPicker';
import ColorInformation from '~/colorpicker/ui/ColorInformation';
import _ColorPalette from '~/colorpicker/ui/ColorPalette';
import ColorSetsChooser from '~/colorpicker/ui/ColorSetsChooser';
import CurrentColorSets from '~/colorpicker/ui/CurrentColorSets';
import CurrentColorSetsContextMenu from '~/colorpicker/ui/CurrentColorSetsContextMenu';
import ColorControl from './ColorControl';

export default class XDColorPicker extends BaseColorPicker {

  components() {
    return {
      palette: _ColorPalette,
      control: ColorControl,
      information: ColorInformation,
      currentColorSets: CurrentColorSets,
      colorSetsChooser: ColorSetsChooser,
      contextMenu: CurrentColorSetsContextMenu
    }
  }

  template () {
    return `
      <div class="colorpicker-body">
        <div target="palette"></div>
        <div target="control"></div>
        <div target="information"></div>
        <div target="currentColorSets"></div>
        <div target="colorSetsChooser"></div>
        <div target="contextMenu"></div>
      </div>
    `;
  }

}
