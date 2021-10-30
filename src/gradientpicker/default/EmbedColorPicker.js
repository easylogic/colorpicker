import UIElement from "../../colorpicker/UIElement";
import ColorPickerUI from "../../colorpicker/index";

export default class EmbedColorPicker extends UIElement {
  afterRender() {
    var options = this.opt.colorpicker || {
      type: "sketch"
    };
    this.colorPicker = new ColorPickerUI({
      position: "inline",
      container: this.refs.$el.el,
      ...options,      
      onChange: c => {
        this.changeColor(c);
      },
    });
  }

  template() {
    return `<div ref="$color"></div>`;
  }

  changeColor(color) {
    this.$store.emit ('changeEmbedColorPicker', color);
  }

  setColor (color) {
    this.colorPicker.setColor(color);
  }

}
