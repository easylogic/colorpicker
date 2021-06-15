import UIElement from '~/colorpicker/UIElement';
import Hue from '~/colorpicker/ui/control/Hue';
import Opacity from '~/colorpicker/ui/control/Opacity';
import ColorPreview from '~/colorpicker/ui/ColorPreview';

const source = 'chromedevtool-control';

export default class Control extends UIElement {

  components() {
    return {
      Hue,
      Opacity,
      ColorPreview,
    };
  }

  template() {
    return `
      <article class="el-cp-color-control">
        <div class="el-cp-color-control__body">
          <template target="Hue"></template>
          <template target="Opacity"></template>
        </div>
        <div class="el-cp-color-control__preview">
          <template target="ColorPreview"></template>
        </div>
      </article>
    `;
  }

  refresh() {
    this.Hue.setColorUI();
    this.Opacity.setColorUI();
  }

  '@changeColor'(sourceType) {
    if (source === sourceType) return;
    this.refresh();
  }
  '@initColor'() {
    this.refresh();
  }

}