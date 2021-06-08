import UIElement from '~/colorpicker/UIElement';
import './ColorPreview.scss';

export default class ColorPreview extends UIElement {

  template() {
    return /*html*/`
      <i class="el-cp-color-preview">
        <em ref="$color"></em>
      </i>
    `;
  }
  refresh() {
    this.refs.$color.css('background-color', this.$store.dispatch('/toRGB'));
  }

  '@changeColor'() {
    this.refresh();
  }
  '@initColor'() {
    this.refresh();
  }

}
