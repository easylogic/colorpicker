import UIElement from '~/colorpicker/UIElement';
import HueVertical from '~/colorpicker/ui/control/HueVertical';
import OpacityVertical from '~/colorpicker/ui/control/OpacityVertical';

const source = 'mini-control';

export default class Control extends UIElement {

  components() {
    return {
      HueVertical,
      OpacityVertical,
    };
  }

  template() {
    return `
      <div class="el-cp-color-control">
        <template target="HueVertical"></template>
        <template target="OpacityVertical"></template>
      </div>
    `;
  }

  refresh() {
    this.HueVertical.setColorUI();
    this.OpacityVertical.setColorUI();
  }

  '@changeColor'(sourceType) {
    if(source === sourceType) return;
    this.refresh();
  }
  '@initColor'() {
    this.refresh();
  }

}
