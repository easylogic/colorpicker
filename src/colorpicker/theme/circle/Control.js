import UIElement from '~/colorpicker/UIElement';
import Brightness from '~/colorpicker/ui/control/Brightness';
import Opacity from '~/colorpicker/ui/control/Opacity';
import ColorPreview from '~/colorpicker/ui/ColorPreview';

export default class Control extends UIElement {

  components() {
    return {
      Brightness,
      Opacity,
      ColorPreview,
    };
  }

  template() {
    return `
      <article class="el-cp-color-control">
        <div class="el-cp-color-control__body">
          <template target="Brightness"></template>
          <template target="Opacity"></template>
        </div>
        <div class="el-cp-color-control__preview">
          <template target="ColorPreview"></template>
        </div>
      </article>
    `;
  }

  refresh() {
    this.Brightness.setColorUI();
    this.Opacity.setColorUI();
  }

  '@changeColor'() {
    this.refresh();
  }
  '@initColor'() {
    this.refresh();
  }

}
