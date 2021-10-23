import UIElement from '~/colorpicker/UIElement';
import HueVertical from '~/colorpicker/ui/control/HueVertical';
import OpacityVertical from '~/colorpicker/ui/control/OpacityVertical';

export default class Control extends UIElement {

  components() {
    return {
      HueVertical,
      OpacityVertical,
    };
  }

  template() {
    let $opacity = this.opt.useOpacity ? `<template target="OpacityVertical"></template>` : '';

    return `
      <div class="el-cp-color-control">
        <template target="HueVertical"></template>
        ${$opacity}
      </div>
    `;
  }

  refresh() {
    this.HueVertical.setColorUI();
    if (!!this.opt.useOpacity) this.OpacityVertical.setColorUI();
  }

  ['@changeColor']() {
    this.refresh();
  }

  ['@initColor']() {
    this.refresh();
  }

}
