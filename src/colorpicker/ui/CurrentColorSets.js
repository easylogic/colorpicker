import UIElement from '~/colorpicker/UIElement';
import ColorSetsChooser from '~/colorpicker/ui/ColorSetsChooser';
import './CurrentColorSets.scss';

export default class CurrentColorSets extends UIElement {

  components() {
    return {
      colorSetsChooser: ColorSetsChooser,
    };
  }

  template() {
    const { name } = this.$store.dispatch('/getCurrentColorSets');
    if (!name) return null;
    return `
      <div class="el-cp-swatches">
        <header class="el-cp-swatches__header">
          <h2 ref="$colorSwatchTitle">${name}</h2>
          <button
            ref="$colorSetsChooseButton"
            type="button"
            title="Open color swatches">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </header>
        <div ref="$colorSetsColorList"></div>
        <template target="colorSetsChooser"></template>
      </div>
    `;
  }

  'load $colorSetsColorList'() {
    const { edit } = this.$store.dispatch('/getCurrentColorSets');
    const colors = this.$store.dispatch('/getCurrentColors');
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
        ${edit ? `
          <li>
            <button type="button" title="Add color" class="el-cp-colors__add">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </button>
          </li>
        ` : ''}
      </ul>
    `;
  }

  refresh() {
    this.load();
  }

  addColor(color) {
    this.$store.dispatch('/addCurrentColor', color);
  }

  '@changeCurrentColorSets'() {
    this.refresh();
    const { name } = this.$store.dispatch('/getCurrentColorSets');
    this.refs.$colorSwatchTitle.html(name);
  }

  'click $colorSetsChooseButton'() {
    this.$store.emit('openColorChooser');
  }
  'click $colorSetsColorList .el-cp-colors__add'() {
    this.addColor(this.$store.dispatch('/toColor'));
  }
  'click $colorSetsColorList .el-cp-colors__item'(e) {
    this.$store.dispatch('/changeColor', e.$delegateTarget.attr('data-color'));
    this.$store.emit('lastUpdateColor');
  }

}
