import UIElement from '~/colorpicker/UIElement';
import './Swatch.scss';

export default class Swatch extends UIElement {

  template() {
    const colors = this.$store.dispatch('/swatch.index');
    if (!(colors.length > 0)) return null;
    return `
      <div class="el-cp-swatches">
        ${this.opt.swatchTitle ? `
          <header class="el-cp-swatches__header">
            <h2 ref="$colorSwatchTitle">${this.opt.swatchTitle}</h2>
          </header>
        ` : ''}
        <div ref="$index"></div>
      </div>
    `;
  }

  ['load $index']() {
    const colors = this.$store.dispatch('/swatch.index');
    return `
      <ul class="el-cp-colors">
        ${colors.map(color => (`
          <li>
            <button
              type="button"
              data-color="${color}"
              class="el-cp-colors__item"
              style="--color: ${color}">
              ${color}
            </button>
          </li>
        `)).join('')}
      </ul>
    `;
  }

  refresh() {
    this.load();
  }

  addColor(color) {
    this.$store.dispatch('/addCurrentColor', color);
  }

  ['click $index button'](e) {
    this.$store.dispatch('/changeColor', e.$delegateTarget.attr('data-color'));
    this.$store.emit('lastUpdateColor');
  }

}
