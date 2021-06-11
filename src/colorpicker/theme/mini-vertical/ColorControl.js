import Hue from '~/colorpicker/ui/control/VerticalHue';
import Opacity from '~/colorpicker/ui/control/VerticalOpacity';
import UIElement from '~/colorpicker/UIElement';

const source = 'mini-control';

export default class ColorControl extends UIElement {

  components() {
    return {
      Hue,
      Opacity,
    };
  }

  template() {
    return `
      <div class="control">
        <div target="Hue"></div>
        <div target="Opacity"></div>
      </div>
    `;
  }

  refresh() {
    this.setColorUI();
  }

  setColorUI() {
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
