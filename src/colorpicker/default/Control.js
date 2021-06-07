import Hue from '~/colorpicker/ui/control/Hue';
import HueScale from '~/colorpicker/ui/control/HueScale';
import Opacity from '~/colorpicker/ui/control/Opacity';
import UIElement from '~/colorpicker/UIElement';
import './Control.scss';

const source = 'chromedevtool-control';

export default class Control extends UIElement {

  components () {
    return { Hue, Opacity, HueScale }
  }

  template () {
    return `
      <div class="control">
        <div target="Hue"></div>
        <div target="HueScale"></div>
        <div target="Opacity"></div>
        <div ref="$controlPattern" class="empty"></div>
        <div ref="$controlColor" class="color"></div>
        <div ref="$controlPattern2" class="empty2"></div>
        <div ref="$controlColor2" class="color2"></div>
      </div>
    `;
  }

  setBackgroundColor () {
    this.refs.$controlColor.css("background-color", this.$store.dispatch('/toRGB'));
  }

  setLastUpdateColor () {
    this.refs.$controlColor2.css("background-color", this.$store.dispatch('/toRGB'));
  }

  refresh () {
    this.setColorUI();
    this.setBackgroundColor();
  }

  setColorUI() {
    this.Hue.setColorUI();
    this.Opacity.setColorUI();
  }

  '@changeColor' (sourceType) {
    if (source !== sourceType) {
      this.refresh();
    }
  }

  '@lastUpdateColor'(sourceType) {
    if(source !== sourceType) {
      this.setLastUpdateColor();
    }
  }

  '@initColor'() {
    this.refresh();
  }

}
