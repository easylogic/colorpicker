import BaseColorPicker from '../BaseColorPicker'

import ColorControl from './ColorControl'
import _ColorPalette from '../ui/ColorPalette'

export default class MiniColorPicker extends BaseColorPicker {

    template () {
        return `
            <div class='colorpicker-body'>
                <div target="palette"></div><div target="control"></div>
            </div>
        `
    }

    components() {
        return {
            palette: _ColorPalette,
            control: ColorControl
        }
    }

}
