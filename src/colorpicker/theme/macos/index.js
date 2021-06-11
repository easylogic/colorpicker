import BaseColorPicker from '~/colorpicker/BaseColorPicker';
import ColorControl from './ColorControl';
import ColorWheel from '~/colorpicker/ui/ColorWheel';
import ColorInformation from '~/colorpicker/ui/ColorInformation';
import ColorSetsChooser from '~/colorpicker/ui/ColorSetsChooser';
import CurrentColorSets from '~/colorpicker/ui/CurrentColorSets';
import CurrentColorSetsContextMenu from '~/colorpicker/ui/CurrentColorSetsContextMenu';

export default class MacOSColorPicker extends BaseColorPicker {

  template () {
    return `
      <div class='colorpicker-body'>
        <div target="colorwheel"></div>
        <div target="control"></div>
        <div target="information"></div>
        <div target="currentColorSets"></div>
        <div target="colorSetsChooser"></div>
        <div target="contextMenu"></div>
      </div>
    `;
  }

  components() {
    return {
      colorwheel: ColorWheel,
      control: ColorControl,
      information: ColorInformation,
      currentColorSets: CurrentColorSets,
      colorSetsChooser: ColorSetsChooser,
      contextMenu: CurrentColorSetsContextMenu
    }
  }

}
