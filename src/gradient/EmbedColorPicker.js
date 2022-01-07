import UIElement from "../colorpicker/UIElement";
import ColorPickerUI from "../colorpicker/index";

export default class EmbedColorPicker extends UIElement {
  afterRender() {
    var parent = this.opt;

    var options = parent.opt.colorpickerOptions || {
      type: "sketch"
    };
    this.colorPicker = ColorPickerUI.create({
      position: "inline",
      container: this.refs.$el.el,
      onChange: c => {
        this.changeColor(c);
      },
      onLastUpdate: c => {
        this.changeColor(c, true);
      },
      ...options
    });
  }

  template() {
    return `<div ref="$color"></div>`;
  }

  changeColor(color, isLastUpdate = false) {
    this.$store.emit ('changeEmbedColorPicker', color, isLastUpdate);
  }

  setValue (color) {
    this.colorPicker.initColorWithoutChangeEvent(color);
  }

}
