import BaseColorPicker from '~/colorpicker/BaseColorPicker';
import CurrentColorSets from '~/colorpicker/ui/CurrentColorSets';
import './index.scss';

export default class MiniColorPicker extends BaseColorPicker {

  components() {
    return {
      currentColorSets: CurrentColorSets,
    };
  }

  template() {
    let colorSwatch = '';
    const colorSets = this.$store.dispatch('/list');
    if (colorSets.length > 0) {
      colorSwatch = `<template target="currentColorSets"></template>`;
    } else {
      colorSwatch = `<div class="el-colorpicker__empty">No colorSet</div>`;
    }

    return `
      <div class="el-colorpicker__wrap">
        ${colorSwatch}
      </div>
    `;
  }

}
