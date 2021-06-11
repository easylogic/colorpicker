import UIElement from '~/colorpicker/UIElement';
import './ColorSetsChooser.scss';

export default class ColorSetsChooser extends UIElement {

  template() {
    return `
      <article class="el-cp-color-theme">
        <div class="el-cp-color-theme__wrap">
          <header class="el-cp-color-theme__header">
            <h1>Color Palettes</h1>
            <button ref="$closeButton" type="button" title="Close">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </header>
          <div ref="$colorsetsList" class="el-cp-color-theme__body"></div>
        </div>
      </article>
    `;
  }

  refresh() {
    this.load();
  }

  '@changeCurrentColorSets'() {
    this.refresh();
  }
  '@closeColorChooser'() {
    this.hide();
  }
  '@openColorChooser'() {
    this.show();
  }

  // loadable
  'load $colorsetsList'() {
    const colorSets = this.$store.dispatch('/getColorSetsList');
    return `
      <ul class="el-cp-color-theme__index">
        ${colorSets.map( (element, index) => {
          return `
            <li class="el-cp-color-theme-item" role="button" data-key="${index}">
              <strong>${element.name}</strong>
              <ul>
                ${element.colors.filter((color, i) => i < 5).map(color => {
                  color = color || 'rgba(255,255,255,1)';
                  return `
                    <li class="color-item" title="${color}">
                      <i class="color-view" style="background-color: ${color}"></i>
                    </li>
                  `;
                }).join('')}
              </ul>
            </li>
          `;
        }).join('')}
      </ul>
    `;
  }

  show() {
    this.$el.addClass('el-cp-color-theme--on');
  }
  hide() {
    this.$el.removeClass('el-cp-color-theme--on');
  }

  'click $closeButton'() {
    this.hide();
  }
  'click $colorsetsList .el-cp-color-theme-item'(e) {
    const $item = e.$delegateTarget;
    if (!$item) return;
    this.$store.dispatch('/setCurrentColorSets', Number($item.el.dataset.key));
    this.hide();
  }

  destroy() {
    super.destroy();
    this.hide();
  }

}
