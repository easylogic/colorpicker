import UIElement from "../colorpicker/UIElement";
import ColorPickerUI from "../colorpicker/index";

export default class EmbedColorPicker extends UIElement {
  afterRender() {
    this.colorPicker = ColorPickerUI.create({
      type: "sketch",
      position: "inline",
      container: this.refs.$el.el,
      onChange: c => {
        this.changeColor(c);
      }
    });
  }

  template() {
    return `<div ref="$color"></div>`;
  }

  changeColor(color) {
    this.$store.emit ('changeEmbedColorPicker', color);
  }

  setValue (color) {
    this.colorPicker.initColorWithoutChangeEvent(color);
  }

}
