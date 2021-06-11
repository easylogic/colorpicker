import BaseColorPicker from '~/colorpicker/BaseColorPicker';
import ColorInformation from '~/colorpicker/ui/ColorInformation';
import ColorSetsChooser from '~/colorpicker/ui/ColorSetsChooser';
import CurrentColorSets from '~/colorpicker/ui/CurrentColorSets';
import CurrentColorSetsContextMenu from '~/colorpicker/ui/CurrentColorSetsContextMenu';
import ColorRing from '~/colorpicker/ui/ColorRing';
import _ColorPalette from '~/colorpicker/ui/ColorPalette';
import ColorControl from './ColorControl';

export default class RingColorPicker extends BaseColorPicker {

  components() {
    return {
      colorring: ColorRing,
      palette: _ColorPalette,
      control: ColorControl,
      information: ColorInformation,
      currentColorSets: CurrentColorSets,
      colorSetsChooser: ColorSetsChooser,
      contextMenu: CurrentColorSetsContextMenu
    }
  }

  template() {
    return `
      <div class='colorpicker-body'>
        <div target="colorring"></div>
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
